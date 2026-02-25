import { google } from "googleapis";
import { db } from "./db";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/google/callback`
);

export function getAuthUrl(businessId: string) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    state: businessId,
  });
}

export async function handleCallback(code: string, businessId: string) {
  const { tokens } = await oauth2Client.getToken(code);

  await db.business.update({
    where: { id: businessId },
    data: {
      calendarConnected: true,
      calendarAccessToken: tokens.access_token,
      calendarRefreshToken: tokens.refresh_token,
      calendarId: "primary",
    },
  });

  return tokens;
}

function getCalendarClient(accessToken: string, refreshToken: string | null) {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return google.calendar({ version: "v3", auth: client });
}

export async function createCalendarEvent(
  businessId: string,
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendeePhone?: string
) {
  const business = await db.business.findUnique({
    where: { id: businessId },
  });

  if (
    !business?.calendarConnected ||
    !business.calendarAccessToken
  ) {
    return null;
  }

  const calendar = getCalendarClient(
    business.calendarAccessToken,
    business.calendarRefreshToken
  );

  const event = await calendar.events.insert({
    calendarId: business.calendarId || "primary",
    requestBody: {
      summary,
      description: `${description}\n\nAgendado por Servy AI${attendeePhone ? `\nTeléfono: ${attendeePhone}` : ""}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: business.timezone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: business.timezone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    },
  });

  return event.data.id;
}

export async function deleteCalendarEvent(
  businessId: string,
  eventId: string
) {
  const business = await db.business.findUnique({
    where: { id: businessId },
  });

  if (
    !business?.calendarConnected ||
    !business.calendarAccessToken
  ) {
    return;
  }

  const calendar = getCalendarClient(
    business.calendarAccessToken,
    business.calendarRefreshToken
  );

  try {
    await calendar.events.delete({
      calendarId: business.calendarId || "primary",
      eventId,
    });
  } catch (err) {
    console.error("Failed to delete calendar event:", err);
  }
}

export async function getCalendarEvents(
  businessId: string,
  timeMin: Date,
  timeMax: Date
) {
  const business = await db.business.findUnique({
    where: { id: businessId },
  });

  if (
    !business?.calendarConnected ||
    !business.calendarAccessToken
  ) {
    return [];
  }

  const calendar = getCalendarClient(
    business.calendarAccessToken,
    business.calendarRefreshToken
  );

  try {
    const res = await calendar.events.list({
      calendarId: business.calendarId || "primary",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Failed to fetch calendar events:", err);
    return [];
  }
}
