import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentBusiness } from "@/lib/session";
import { analyzeConversation } from "@/lib/conversation-analysis";

export async function POST(
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

  try {
    const analysis = await analyzeConversation(id);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing conversation:", error);
    return NextResponse.json({ error: "Error al analizar conversación" }, { status: 500 });
  }
}