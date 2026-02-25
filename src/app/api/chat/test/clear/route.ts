import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function POST() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // Delete test conversation
  const conversation = await db.conversation.findFirst({
    where: { businessId: business.id, customerPhone: "+506-test-0000" },
  });

  if (conversation) {
    await db.message.deleteMany({ where: { conversationId: conversation.id } });
    await db.conversation.delete({ where: { id: conversation.id } });
  }

  return NextResponse.json({ success: true });
}
