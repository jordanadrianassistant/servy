import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const availability = await db.availability.findMany({
    where: { businessId: business.id },
    orderBy: { dayOfWeek: "asc" },
  });

  return NextResponse.json(availability);
}

export async function PUT(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { schedule } = await req.json();

  // schedule is an array of { dayOfWeek, startTime, endTime, active }
  for (const day of schedule) {
    await db.availability.upsert({
      where: {
        businessId_dayOfWeek: {
          businessId: business.id,
          dayOfWeek: day.dayOfWeek,
        },
      },
      update: {
        startTime: day.startTime,
        endTime: day.endTime,
        active: day.active,
      },
      create: {
        businessId: business.id,
        dayOfWeek: day.dayOfWeek,
        startTime: day.startTime,
        endTime: day.endTime,
        active: day.active,
      },
    });
  }

  return NextResponse.json({ success: true });
}
