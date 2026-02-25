import { NextResponse } from "next/server";
import { getCurrentBusiness } from "@/lib/session";
import { processMessage } from "@/lib/ai";

// Test endpoint — lets you simulate a patient conversation from the dashboard
export async function POST(req: Request) {
  const business = await getCurrentBusiness();
  if (!business) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { message, phone } = await req.json();

  if (!message) {
    return NextResponse.json(
      { error: "Mensaje requerido" },
      { status: 400 }
    );
  }

  const customerPhone = phone || "+0000000000"; // test number

  try {
    const reply = await processMessage(business.id, customerPhone, message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat test error:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
