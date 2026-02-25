import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { processMessage } from "@/lib/ai";

// WhatsApp Cloud API webhook verification
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Handle incoming WhatsApp messages
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // WhatsApp Cloud API format
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      // Not a message event (could be status update, etc.)
      return NextResponse.json({ status: "ok" });
    }

    const message = value.messages[0];
    const phoneNumberId = value.metadata?.phone_number_id;
    const from = message.from; // Customer's phone number
    const text = message.text?.body;

    if (!text || !phoneNumberId) {
      return NextResponse.json({ status: "ok" });
    }

    // Find the business by their WhatsApp session ID
    const business = await db.business.findFirst({
      where: { whatsappSessionId: phoneNumberId, whatsappConnected: true },
    });

    if (!business) {
      console.log(`No business found for phone_number_id: ${phoneNumberId}`);
      return NextResponse.json({ status: "ok" });
    }

    // Process with AI
    const reply = await processMessage(business.id, from, text);

    // Send reply via WhatsApp Cloud API
    await sendWhatsAppMessage(phoneNumberId, from, reply);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

async function sendWhatsAppMessage(
  phoneNumberId: string,
  to: string,
  text: string
) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("Missing WHATSAPP_ACCESS_TOKEN");
    return;
  }

  await fetch(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    }
  );
}
