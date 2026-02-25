export async function register() {
  // Only run on the server (not edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startReminderScheduler } = await import("./lib/scheduler");
    const { reconnectAll } = await import("./lib/whatsapp/manager");

    // Start reminder scheduler
    startReminderScheduler();

    // Reconnect previously connected WhatsApp sessions
    reconnectAll().catch((err) =>
      console.error("[Boot] Failed to reconnect WhatsApp sessions:", err)
    );
  }
}
