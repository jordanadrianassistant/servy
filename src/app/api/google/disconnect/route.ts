import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function POST() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await db.business.update({
    where: { id: business.id },
    data: {
      calendarConnected: false,
      calendarAccessToken: null,
      calendarRefreshToken: null,
      calendarId: null,
    },
  });

  return NextResponse.json({ success: true });
}
