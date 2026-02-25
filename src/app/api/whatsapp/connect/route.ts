import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { connectWhatsApp, getConnectionStatus } from "@/lib/whatsapp/manager";

export async function POST() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const status = await connectWhatsApp(business.id);
  return NextResponse.json(status);
}

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const status = getConnectionStatus(business.id);
  return NextResponse.json(status);
}
