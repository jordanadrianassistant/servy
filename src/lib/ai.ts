import OpenAI from "openai";
import { db } from "./db";
import { createCalendarEvent, deleteCalendarEvent } from "./google-calendar";
import type { Business, Service, Availability } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface BusinessWithRelations extends Business {
  services: Service[];
  availability: Availability[];
}

const DAYS_ES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function buildSystemPrompt(business: BusinessWithRelations): string {
  const servicesText = business.services
    .filter((s) => s.active)
    .map(
      (s) =>
        `- ${s.name}: ${s.description || "Sin descripción"} (${s.duration} min${s.price ? `, $${s.price} ${business.currency}` : ""})`
    )
    .join("\n");

  const scheduleText = business.availability
    .filter((a) => a.active)
    .map((a) => `- ${DAYS_ES[a.dayOfWeek]}: ${a.startTime} - ${a.endTime}`)
    .join("\n");

  const toneMap: Record<string, string> = {
    professional:
      "Sé profesional, claro y eficiente. Usa un lenguaje respetuoso.",
    friendly:
      "Sé amigable y cálido, como hablar con un amigo. Usa emojis ocasionalmente.",
    casual:
      "Sé casual y relajado, pero siempre respetuoso. Usa emojis y lenguaje informal.",
    formal:
      "Sé muy formal y respetuoso. Use usted en lugar de tú. Sin emojis.",
  };

  return `Eres el asistente virtual de "${business.name}". Tu trabajo es atender a los pacientes por WhatsApp.

## Tu Personalidad
${toneMap[business.aiTone] || toneMap.professional}

## Instrucciones Específicas del Doctor
${business.aiInstructions || "Ayuda a los pacientes a agendar citas y responde sus preguntas."}

## Información del Consultorio
- Nombre: ${business.name}
${business.description ? `- Descripción: ${business.description}` : ""}
${business.phone ? `- Teléfono: ${business.phone}` : ""}
${business.address ? `- Dirección: ${business.address}` : ""}
- Zona horaria: ${business.timezone}

## Servicios Disponibles
${servicesText || "No hay servicios configurados aún."}

## Horario de Atención
${scheduleText || "No hay horario configurado aún."}

## Funciones Disponibles
Puedes llamar estas funciones cuando sea necesario:
1. **check_availability** — Para verificar horarios disponibles en una fecha
2. **book_appointment** — Para agendar una cita
3. **reschedule_appointment** — Para reprogramar una cita existente
4. **cancel_appointment** — Para cancelar una cita

## Reglas
- SIEMPRE responde en español
- Si el paciente quiere una cita, primero pregunta qué servicio necesita y para qué fecha
- Verifica disponibilidad antes de confirmar
- Pide el nombre completo del paciente antes de agendar
- Si no puedes resolver algo, ofrece contactar directamente al doctor
- NO inventes información que no tengas
- Sé conciso — es WhatsApp, no un email
- La fecha de hoy es: ${new Date().toLocaleDateString("es", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`;
}

const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Verifica los horarios disponibles para una fecha específica",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description: "Fecha en formato YYYY-MM-DD",
          },
          serviceName: {
            type: "string",
            description: "Nombre del servicio solicitado (opcional, tal como aparece en la lista de servicios)",
          },
        },
        required: ["date"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_appointment",
      description: "Agenda una nueva cita para el paciente",
      parameters: {
        type: "object",
        properties: {
          customerName: {
            type: "string",
            description: "Nombre completo del paciente",
          },
          customerPhone: {
            type: "string",
            description: "Número de teléfono del paciente",
          },
          serviceName: {
            type: "string",
            description: "Nombre del servicio (tal como aparece en la lista de servicios)",
          },
          date: {
            type: "string",
            description: "Fecha en formato YYYY-MM-DD",
          },
          time: {
            type: "string",
            description: "Hora en formato HH:MM",
          },
        },
        required: ["customerName", "customerPhone", "date", "time"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "cancel_appointment",
      description: "Cancela una cita existente del paciente",
      parameters: {
        type: "object",
        properties: {
          customerPhone: {
            type: "string",
            description: "Número de teléfono del paciente",
          },
        },
        required: ["customerPhone"],
      },
    },
  },
];

// Tool implementations
async function resolveService(businessId: string, serviceName?: string) {
  if (!serviceName) return null;
  // Fuzzy match: find service whose name contains the search term (case-insensitive)
  const services = await db.service.findMany({
    where: { businessId, active: true },
  });
  const lower = serviceName.toLowerCase();
  return (
    services.find((s) => s.name.toLowerCase() === lower) ||
    services.find((s) => s.name.toLowerCase().includes(lower)) ||
    services.find((s) => lower.includes(s.name.toLowerCase())) ||
    null
  );
}

async function checkAvailability(
  businessId: string,
  date: string,
  serviceName?: string
) {
  const dayOfWeek = new Date(date + "T12:00:00").getDay();

  const availability = await db.availability.findFirst({
    where: { businessId, dayOfWeek, active: true },
  });

  if (!availability) {
    return { available: false, message: "No hay atención ese día." };
  }

  // Get existing appointments for that date
  const dayStart = new Date(date + "T00:00:00");
  const dayEnd = new Date(date + "T23:59:59");

  const existingAppointments = await db.appointment.findMany({
    where: {
      businessId,
      startTime: { gte: dayStart, lte: dayEnd },
      status: { not: "cancelled" },
    },
    include: { service: true },
    orderBy: { startTime: "asc" },
  });

  // Get service duration
  let duration = 30; // default
  const service = await resolveService(businessId, serviceName);
  if (service) duration = service.duration;

  // Calculate available slots
  const [startH, startM] = availability.startTime.split(":").map(Number);
  const [endH, endM] = availability.endTime.split(":").map(Number);
  const slots: string[] = [];

  let current = startH * 60 + startM;
  const end = endH * 60 + endM;

  while (current + duration <= end) {
    const slotStart = `${String(Math.floor(current / 60)).padStart(2, "0")}:${String(current % 60).padStart(2, "0")}`;
    const slotEnd = current + duration;

    // Check if slot conflicts with existing appointments
    const slotStartDate = new Date(`${date}T${slotStart}:00`);
    const slotEndDate = new Date(
      `${date}T${String(Math.floor(slotEnd / 60)).padStart(2, "0")}:${String(slotEnd % 60).padStart(2, "0")}:00`
    );

    const hasConflict = existingAppointments.some((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      return slotStartDate < aptEnd && slotEndDate > aptStart;
    });

    if (!hasConflict) {
      slots.push(slotStart);
    }

    current += 30; // 30-min increments
  }

  return {
    available: slots.length > 0,
    date,
    day: DAYS_ES[dayOfWeek],
    hours: `${availability.startTime} - ${availability.endTime}`,
    availableSlots: slots,
    message:
      slots.length > 0
        ? `Hay ${slots.length} horarios disponibles el ${DAYS_ES[dayOfWeek]} ${date}.`
        : `No hay horarios disponibles para esa fecha.`,
  };
}

async function bookAppointment(
  businessId: string,
  customerName: string,
  customerPhone: string,
  date: string,
  time: string,
  serviceName?: string
) {
  // Resolve service by name
  let duration = 30;
  const service = await resolveService(businessId, serviceName);
  if (service) duration = service.duration;

  const startTime = new Date(`${date}T${time}:00`);
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

  // Check for conflicts
  const conflicts = await db.appointment.findMany({
    where: {
      businessId,
      status: { not: "cancelled" },
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
  });

  if (conflicts.length > 0) {
    return {
      success: false,
      message: "Ese horario ya está ocupado. ¿Quieres intentar otro horario?",
    };
  }

  // Get service name for calendar
  const calendarServiceName = service?.name || "Cita";

  // Create calendar event if connected
  let calendarEventId: string | null = null;
  try {
    const eventId = await createCalendarEvent(
      businessId,
      `${calendarServiceName} — ${customerName}`,
      `Paciente: ${customerName}\nTeléfono: ${customerPhone}`,
      startTime,
      endTime,
      customerPhone
    );
    calendarEventId = eventId || null;
  } catch (err) {
    console.error("Failed to create calendar event:", err);
  }

  const appointment = await db.appointment.create({
    data: {
      businessId,
      customerName,
      customerPhone,
      startTime,
      endTime,
      serviceId: service?.id || null,
      status: "confirmed",
      calendarEventId,
    },
  });

  return {
    success: true,
    appointmentId: appointment.id,
    message: `¡Cita agendada! ✅\n📅 ${date}\n🕐 ${time}\n👤 ${customerName}\nTe esperamos.`,
  };
}

async function cancelAppointment(businessId: string, customerPhone: string) {
  const appointment = await db.appointment.findFirst({
    where: {
      businessId,
      customerPhone,
      status: "confirmed",
      startTime: { gte: new Date() },
    },
    orderBy: { startTime: "asc" },
  });

  if (!appointment) {
    return {
      success: false,
      message: "No encontré una cita próxima con ese número.",
    };
  }

  await db.appointment.update({
    where: { id: appointment.id },
    data: { status: "cancelled" },
  });

  // Delete from Google Calendar if exists
  if (appointment.calendarEventId) {
    try {
      await deleteCalendarEvent(businessId, appointment.calendarEventId);
    } catch (err) {
      console.error("Failed to delete calendar event:", err);
    }
  }

  return {
    success: true,
    message: `Tu cita del ${new Date(appointment.startTime).toLocaleDateString("es")} a las ${new Date(appointment.startTime).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })} ha sido cancelada.`,
  };
}

export async function processMessage(
  businessId: string,
  customerPhone: string,
  messageContent: string
): Promise<string> {
  // Get business with relations
  const business = await db.business.findUnique({
    where: { id: businessId },
    include: {
      services: { where: { active: true } },
      availability: { where: { active: true } },
    },
  });

  if (!business) return "Error: negocio no encontrado.";

  // Get or create conversation
  let conversation = await db.conversation.findFirst({
    where: { businessId, customerPhone },
  });

  if (!conversation) {
    conversation = await db.conversation.create({
      data: { businessId, customerPhone },
    });
  }

  // Save incoming message
  await db.message.create({
    data: {
      conversationId: conversation.id,
      role: "customer",
      content: messageContent,
    },
  });

  // Get conversation history (last 20 messages)
  const history = await db.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt(business as BusinessWithRelations) },
    ...history.map((m) => ({
      role: (m.role === "customer" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    })),
  ];

  // Call OpenAI
  let response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    tools,
    temperature: 0.7,
    max_tokens: 500,
  });

  let assistantMessage = response.choices[0].message;

  // Handle tool calls (function calling loop)
  while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
    const toolResults: OpenAI.ChatCompletionMessageParam[] = [
      assistantMessage as OpenAI.ChatCompletionMessageParam,
    ];

    for (const toolCall of assistantMessage.tool_calls) {
      const fn = toolCall as unknown as { function: { name: string; arguments: string }; id: string };
      const args = JSON.parse(fn.function.arguments);
      let result: unknown;

      switch (fn.function.name) {
        case "check_availability":
          result = await checkAvailability(
            businessId,
            args.date,
            args.serviceName
          );
          break;
        case "book_appointment":
          result = await bookAppointment(
            businessId,
            args.customerName,
            args.customerPhone || customerPhone,
            args.date,
            args.time,
            args.serviceName
          );
          break;
        case "cancel_appointment":
          result = await cancelAppointment(
            businessId,
            args.customerPhone || customerPhone
          );
          break;
        default:
          result = { error: "Función no reconocida" };
      }

      toolResults.push({
        role: "tool",
        tool_call_id: fn.id,
        content: JSON.stringify(result),
      });
    }

    response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [...messages, ...toolResults],
      tools,
      temperature: 0.7,
      max_tokens: 500,
    });

    assistantMessage = response.choices[0].message;
  }

  const reply = assistantMessage.content || "Lo siento, no pude procesar tu mensaje.";

  // Save assistant reply
  await db.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      content: reply,
    },
  });

  // Update conversation
  await db.conversation.update({
    where: { id: conversation.id },
    data: { updatedAt: new Date() },
  });

  return reply;
}
