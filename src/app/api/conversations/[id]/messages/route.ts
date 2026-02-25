import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  // Verify the conversation belongs to this business
  const conversation = await db.conversation.findFirst({
    where: { id, businessId: business.id },
  });

  if (!conversation) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const messages = await db.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}
