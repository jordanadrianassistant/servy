import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { disconnectWhatsApp } from "@/lib/whatsapp/manager";

export async function POST() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await disconnectWhatsApp(business.id);
  return NextResponse.json({ success: true });
}
