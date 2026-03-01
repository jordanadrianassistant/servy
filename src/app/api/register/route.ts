import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, businessName } = await req.json();

    if (!name || !email || !password || !businessName) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este email" },
        { status: 400 }
      );
    }

    // Create user + business in a transaction
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        business: {
          create: {
            name: businessName,
            aiGreeting: `¡Hola! 👋 Bienvenido a ${businessName}. Soy el asistente virtual. ¿En qué puedo ayudarte?`,
            aiInstructions: `Eres el asistente virtual de ${businessName}. Ayudas a los pacientes a agendar citas, responder preguntas sobre los servicios y reprogramar citas existentes. Sé amable, profesional y conciso.`,
          },
        },
      },
      include: { business: true },
    });

    // Create default availability (Mon-Fri 9:00-17:00)
    const defaultDays = [1, 2, 3, 4, 5]; // Mon to Fri
    await db.availability.createMany({
      data: defaultDays.map((day) => ({
        businessId: user.business!.id,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
      })),
    });

    return NextResponse.json(
      { message: "Cuenta creada exitosamente", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    // Surface specific known errors
    if (message.includes("password") && message.includes("short")) {
      return NextResponse.json(
        { error: "La contraseña es muy corta, mínimo 8 caracteres" },
        { status: 400 }
      );
    }
    if (message.includes("Unique constraint") || message.includes("unique")) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese email" },
        { status: 400 }
      );
    }
    if (message.includes("connect") || message.includes("ECONNREFUSED") || message.includes("P1001")) {
      return NextResponse.json(
        { error: "No se pudo conectar a la base de datos. Intenta de nuevo." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: `Error al crear la cuenta: ${message}` },
      { status: 500 }
    );
  }
}
