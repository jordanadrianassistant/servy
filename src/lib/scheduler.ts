import { processReminders } from "./reminders";

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startReminderScheduler() {
  if (intervalId) return; // Already running

  console.log("[Scheduler] Starting reminder scheduler (every 10 minutes)");

  // Run immediately on start
  processReminders()
    .then((r) => console.log(`[Scheduler] Initial check: ${r.sent} reminders sent`))
    .catch((err) => console.error("[Scheduler] Initial check failed:", err));

  // Then every 10 minutes
  intervalId = setInterval(async () => {
    try {
      const result = await processReminders();
      if (result.sent > 0) {
        console.log(`[Scheduler] Sent ${result.sent} reminders`);
      }
    } catch (err) {
      console.error("[Scheduler] Reminder check failed:", err);
    }
  }, 10 * 60 * 1000); // 10 minutes
}

export function stopReminderScheduler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[Scheduler] Reminder scheduler stopped");
  }
}
