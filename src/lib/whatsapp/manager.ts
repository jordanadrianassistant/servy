import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  WASocket,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import path from "path";
import fs from "fs";
import { db } from "../db";
import { processMessage } from "../ai";
import QRCode from "qrcode";

// Store active connections and QR codes per business
const connections = new Map<
  string,
  {
    socket: WASocket | null;
    qr: string | null;
    status: "disconnected" | "connecting" | "qr" | "connected";
  }
>();

const AUTH_DIR = path.join(process.cwd(), ".whatsapp-sessions");

function getSessionDir(businessId: string) {
  const dir = path.join(AUTH_DIR, businessId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function getConnectionStatus(businessId: string) {
  const conn = connections.get(businessId);
  return {
    status: conn?.status || "disconnected",
    qr: conn?.qr || null,
  };
}

export async function getQRDataUrl(businessId: string): Promise<string | null> {
  const conn = connections.get(businessId);
  if (!conn?.qr) return null;
  try {
    return await QRCode.toDataURL(conn.qr, { width: 280, margin: 2 });
  } catch {
    return null;
  }
}

export async function disconnectWhatsApp(businessId: string) {
  const conn = connections.get(businessId);
  if (conn?.socket) {
    conn.socket.logout();
    conn.socket.end(undefined);
  }
  connections.delete(businessId);

  // Clean up session files
  const sessionDir = getSessionDir(businessId);
  if (fs.existsSync(sessionDir)) {
    fs.rmSync(sessionDir, { recursive: true, force: true });
  }

  await db.business.update({
    where: { id: businessId },
    data: {
      whatsappConnected: false,
      whatsappSessionId: null,
    },
  });
}

export async function connectWhatsApp(businessId: string) {
  // If already connecting or connected, return current status
  const existing = connections.get(businessId);
  if (existing && (existing.status === "connected" || existing.status === "connecting")) {
    return getConnectionStatus(businessId);
  }

  // Initialize connection state
  connections.set(businessId, {
    socket: null,
    qr: null,
    status: "connecting",
  });

  const sessionDir = getSessionDir(businessId);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    browser: ["Servy", "Chrome", "1.0.0"],
    syncFullHistory: false,
  });

  const conn = connections.get(businessId)!;
  conn.socket = socket;

  // Handle connection updates
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      conn.qr = qr;
      conn.status = "qr";
      console.log(`[WhatsApp] QR code ready for business ${businessId}`);
    }

    if (connection === "close") {
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log(
        `[WhatsApp] Connection closed for ${businessId}. Status: ${statusCode}. Reconnect: ${shouldReconnect}`
      );

      conn.status = "disconnected";
      conn.qr = null;

      if (statusCode === DisconnectReason.loggedOut) {
        // User logged out — clean up
        await db.business.update({
          where: { id: businessId },
          data: { whatsappConnected: false, whatsappSessionId: null },
        });
        connections.delete(businessId);
      } else if (shouldReconnect) {
        // Reconnect after a short delay
        setTimeout(() => connectWhatsApp(businessId), 3000);
      }
    }

    if (connection === "open") {
      conn.status = "connected";
      conn.qr = null;

      const phoneNumber = socket.user?.id?.split(":")[0] || null;
      console.log(
        `[WhatsApp] Connected for business ${businessId} as ${phoneNumber}`
      );

      await db.business.update({
        where: { id: businessId },
        data: {
          whatsappConnected: true,
          whatsappSessionId: phoneNumber,
        },
      });
    }
  });

  // Save credentials on update
  socket.ev.on("creds.update", saveCreds);

  // Handle incoming messages
  socket.ev.on("messages.upsert", async ({ messages: msgs, type }) => {
    if (type !== "notify") return;

    for (const msg of msgs) {
      // Skip messages from us, status broadcasts, and non-text messages
      if (msg.key.fromMe) continue;
      if (msg.key.remoteJid === "status@broadcast") continue;

      const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text;

      if (!text) continue;

      const from = msg.key.remoteJid!;
      // Strip @s.whatsapp.net to get phone number
      const phone = from.replace("@s.whatsapp.net", "");

      console.log(`[WhatsApp] Message from ${phone}: ${text}`);

      try {
        // Get customer name from push name
        const customerName = msg.pushName || null;

        // Update conversation with customer name if available
        if (customerName) {
          const conversation = await db.conversation.findFirst({
            where: { businessId, customerPhone: phone },
          });
          if (conversation && !conversation.customerName) {
            await db.conversation.update({
              where: { id: conversation.id },
              data: { customerName },
            });
          }
        }

        // Process with AI
        const reply = await processMessage(businessId, phone, text);

        // Send reply
        await socket.sendMessage(from, { text: reply });
        console.log(`[WhatsApp] Replied to ${phone}: ${reply.substring(0, 50)}...`);
      } catch (err) {
        console.error(`[WhatsApp] Error processing message from ${phone}:`, err);
        // Send a fallback message
        await socket.sendMessage(from, {
          text: "Disculpa, hubo un error procesando tu mensaje. Por favor intenta de nuevo en un momento.",
        });
      }
    }
  });

  return getConnectionStatus(businessId);
}

// Reconnect businesses that were previously connected (on server restart)
export async function reconnectAll() {
  const businesses = await db.business.findMany({
    where: { whatsappConnected: true },
  });

  for (const business of businesses) {
    console.log(`[WhatsApp] Reconnecting business: ${business.name} (${business.id})`);
    try {
      await connectWhatsApp(business.id);
    } catch (err) {
      console.error(`[WhatsApp] Failed to reconnect ${business.id}:`, err);
    }
  }
}
