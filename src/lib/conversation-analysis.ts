import OpenAI from "openai";
import { db } from "@/lib/db";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function analyzeConversation(conversationId: string) {
  // Fetch conversation with messages
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      business: {
        select: {
          name: true,
          aiInstructions: true,
          services: {
            where: { active: true },
            select: { name: true, description: true, price: true, duration: true },
          },
        },
      },
    },
  });

  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }

  // Build conversation transcript
  const transcript = conversation.messages
    .map((m) => {
      const role =
        m.role === "customer"
          ? "Paciente"
          : m.role === "assistant"
          ? "Bot"
          : "Sistema";
      return `[${role}]: ${m.content}`;
    })
    .join("\n");

  // Build business context
  const businessContext = [
    `Nombre del negocio: ${conversation.business.name}`,
    conversation.business.aiInstructions
      ? `Instrucciones AI: ${conversation.business.aiInstructions}`
      : null,
    conversation.business.services.length > 0
      ? `Servicios: ${conversation.business.services
          .map(
            (s) =>
              `${s.name}${s.description ? ` (${s.description})` : ""}${
                s.price ? ` - $${s.price}` : ""
              } - ${s.duration} min`
          )
          .join(", ")}`
      : "Servicios: No configurados",
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = `Eres un analizador de conversaciones de atención al cliente médico. Analiza la siguiente conversación de WhatsApp y devuelve un JSON con el análisis.

**Contexto del negocio:**
${businessContext}

**Conversación:**
${transcript}

**Criterios de puntuación:**
- 5: Paciente completamente atendido, cita agendada o pregunta respondida exitosamente
- 4: Mayormente resuelto, pequeños puntos pendientes
- 3: Parcialmente resuelto, el paciente quedó con dudas
- 2: Bot confundido o paciente frustrado, experiencia pobre
- 1: Fallo completo, escalado o conversación abandonada

Devuelve ÚNICAMENTE un JSON válido con esta estructura exacta:
{
  "score": <número del 1 al 5>,
  "summary": "<resumen breve de lo que ocurrió en la conversación>",
  "botRecommendations": ["<recomendación concreta 1>", "<recomendación concreta 2>"],
  "doctorRecommendations": ["<información que el doctor debería configurar 1>", "<información 2>"]
}

Las recomendaciones del bot deben ser mejoras concretas de comportamiento o prompting.
Las recomendaciones del doctor deben ser información faltante (servicios, precios, horarios, FAQs) que hubiera mejorado la respuesta.
Responde solo con el JSON, sin texto adicional.`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-4.1-nano",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI model");
  }

  let parsed: {
    score: number;
    summary: string;
    botRecommendations: string[];
    doctorRecommendations: string[];
  };

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`Invalid JSON from AI: ${content}`);
  }

  // Validate and clamp score
  const score = Math.min(5, Math.max(1, Math.round(parsed.score)));

  // Upsert analysis
  const analysis = await db.conversationAnalysis.upsert({
    where: { conversationId },
    create: {
      conversationId,
      score,
      summary: parsed.summary,
      botRecommendations: JSON.stringify(parsed.botRecommendations ?? []),
      doctorRecommendations: JSON.stringify(parsed.doctorRecommendations ?? []),
    },
    update: {
      score,
      summary: parsed.summary,
      botRecommendations: JSON.stringify(parsed.botRecommendations ?? []),
      doctorRecommendations: JSON.stringify(parsed.doctorRecommendations ?? []),
      analyzedAt: new Date(),
    },
  });

  return analysis;
}
