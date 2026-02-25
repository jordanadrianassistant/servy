import { db } from "./db";
import { getConnectionStatus } from "./whatsapp/manager";

// Get the active WhatsApp socket for a business
function getSocket(businessId: string) {
  const conn = getConnectionStatus(businessId);
  if (conn.status !== "connected") return null;

  // Access the socket from the connections map via the manager
  // We need to export a helper for this
  return null; // Will be replaced by sendWhatsAppReminder
}

export async function sendWhatsAppReminder(
  businessId: string,
  phone: string,
  message: string
) {
  // Dynamic import to avoid circular dependencies
  const { sendMessage } = await import("./whatsapp/manager");
  return sendMessage(businessId, phone, message);
}

export async function processReminders() {
  const now = new Date();

  // 24-hour reminders: appointments between 23-25 hours from now
  const reminder24hStart = new Date(now.getTime() + 23 * 60 * 60 * 1000);
  const reminder24hEnd = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  // 1-hour reminders: appointments between 50-70 minutes from now
  const reminder1hStart = new Date(now.getTime() + 50 * 60 * 1000);
  const reminder1hEnd = new Date(now.getTime() + 70 * 60 * 1000);

  // Find appointments needing 24h reminder
  const appointments24h = await db.appointment.findMany({
    where: {
      status: "confirmed",
      startTime: { gte: reminder24hStart, lte: reminder24hEnd },
      notes: { not: { contains: "[reminder-24h]" } },
    },
    include: {
      service: true,
      business: true,
    },
  });

  // Find appointments needing 1h reminder
  const appointments1h = await db.appointment.findMany({
    where: {
      status: "confirmed",
      startTime: { gte: reminder1hStart, lte: reminder1hEnd },
      notes: { not: { contains: "[reminder-1h]" } },
    },
    include: {
      service: true,
      business: true,
    },
  });

  let sent = 0;

  // Send 24h reminders
  for (const apt of appointments24h) {
    if (!apt.business.whatsappConnected) continue;
    if (!apt.business.reminder24h) continue;

    const date = new Date(apt.startTime).toLocaleDateString("es", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const time = new Date(apt.startTime).toLocaleTimeString("es", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message =
      `📅 *Recordatorio de Cita*\n\n` +
      `Hola ${apt.customerName}, te recordamos que tienes una cita mañana:\n\n` +
      `🏥 ${apt.business.name}\n` +
      `📋 ${apt.service?.name || "Cita"}\n` +
      `📅 ${date}\n` +
      `🕐 ${time}\n\n` +
      `Si necesitas reprogramar o cancelar, responde a este mensaje.\n\n` +
      `¡Te esperamos! 😊`;

    try {
      await sendWhatsAppReminder(apt.businessId, apt.customerPhone, message);

      // Mark as reminded
      const currentNotes = apt.notes || "";
      await db.appointment.update({
        where: { id: apt.id },
        data: { notes: `${currentNotes} [reminder-24h]`.trim() },
      });

      sent++;
      console.log(`[Reminders] 24h reminder sent to ${apt.customerPhone} for ${apt.business.name}`);
    } catch (err) {
      console.error(`[Reminders] Failed to send 24h reminder:`, err);
    }
  }

  // Send 1h reminders
  for (const apt of appointments1h) {
    if (!apt.business.whatsappConnected) continue;
    if (!apt.business.reminder1h) continue;

    const time = new Date(apt.startTime).toLocaleTimeString("es", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message =
      `⏰ *Tu cita es en 1 hora*\n\n` +
      `Hola ${apt.customerName}, te recordamos:\n\n` +
      `🏥 ${apt.business.name}\n` +
      `🕐 ${time}\n` +
      (apt.business.address ? `📍 ${apt.business.address}\n` : "") +
      `\n¡Te esperamos!`;

    try {
      await sendWhatsAppReminder(apt.businessId, apt.customerPhone, message);

      const currentNotes = apt.notes || "";
      await db.appointment.update({
        where: { id: apt.id },
        data: { notes: `${currentNotes} [reminder-1h]`.trim() },
      });

      sent++;
      console.log(`[Reminders] 1h reminder sent to ${apt.customerPhone} for ${apt.business.name}`);
    } catch (err) {
      console.error(`[Reminders] Failed to send 1h reminder:`, err);
    }
  }

  return {
    checked: appointments24h.length + appointments1h.length,
    sent,
    timestamp: now.toISOString(),
  };
}
