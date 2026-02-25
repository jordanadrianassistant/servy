import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
  const business = await getCurrentBusiness();
  if (!business) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const conversations = await db.conversation.findMany({
    where: { businessId: business.id },
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(conversations);
}
