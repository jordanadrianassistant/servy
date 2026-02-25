import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date"); // YYYY-MM-DD

  const where: Record<string, unknown> = { businessId: business.id };
  if (status) where.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    where.startTime = { gte: start, lt: end };
  }

  const appointments = await db.appointment.findMany({
    where,
    include: { service: true },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(appointments);
}

export async function PUT(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id, status, notes } = await req.json();

  await db.appointment.updateMany({
    where: { id, businessId: business.id },
    data: {
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
    },
  });

  return NextResponse.json({ success: true });
}
