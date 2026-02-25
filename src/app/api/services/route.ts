import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const services = await db.service.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { name, description, duration, price } = await req.json();

  if (!name || !duration) {
    return NextResponse.json({ error: "Nombre y duración son requeridos" }, { status: 400 });
  }

  const service = await db.service.create({
    data: {
      businessId: business.id,
      name,
      description: description || null,
      duration: parseInt(duration),
      price: price ? parseFloat(price) : null,
    },
  });

  return NextResponse.json(service, { status: 201 });
}

export async function PUT(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id, name, description, duration, price, active } = await req.json();

  const service = await db.service.updateMany({
    where: { id, businessId: business.id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(duration !== undefined && { duration: parseInt(duration) }),
      ...(price !== undefined && { price: price ? parseFloat(price) : null }),
      ...(active !== undefined && { active }),
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await req.json();

  await db.service.deleteMany({
    where: { id, businessId: business.id },
  });

  return NextResponse.json({ success: true });
}
