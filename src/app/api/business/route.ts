import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  return NextResponse.json(business);
}

export async function PUT(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const data = await req.json();

  // Only allow updating specific fields
  const allowedFields = [
    "name",
    "description",
    "phone",
    "address",
    "timezone",
    "currency",
    "locale",
    "aiGreeting",
    "aiInstructions",
    "aiTone",
    "reminder24h",
    "reminder1h",
  ];

  const updateData: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  const updated = await db.business.update({
    where: { id: business.id },
    data: updateData,
  });

  return NextResponse.json(updated);
}
