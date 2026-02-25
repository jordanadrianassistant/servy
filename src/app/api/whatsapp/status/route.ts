import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { getConnectionStatus } from "@/lib/whatsapp/manager";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const connStatus = getConnectionStatus(business.id);

  return NextResponse.json({
    ...connStatus,
    whatsappConnected: business.whatsappConnected,
    whatsappPhone: business.whatsappSessionId,
  });
}
