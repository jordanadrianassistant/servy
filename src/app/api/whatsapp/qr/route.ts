import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { getQRDataUrl, getConnectionStatus } from "@/lib/whatsapp/manager";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const status = getConnectionStatus(business.id);
  
  if (status.status === "connected") {
    return NextResponse.json({ status: "connected", qr: null });
  }

  const qrDataUrl = await getQRDataUrl(business.id);
  return NextResponse.json({
    status: status.status,
    qr: qrDataUrl,
  });
}
