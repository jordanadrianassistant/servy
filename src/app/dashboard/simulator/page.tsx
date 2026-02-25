"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "customer" | "assistant";
  content: string;
  time: string;
}

export default function SimulatorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "customer",
      content: input.trim(),
      time: new Date().toLocaleTimeString("es", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          phone: "+506-test-0000",
        }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || data.error || "Error al procesar",
        time: new Date().toLocaleTimeString("es", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Error de conexión. Verifica que OPENAI_API_KEY esté configurada en .env",
          time: new Date().toLocaleTimeString("es", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  const clearChat = async () => {
    setMessages([]);
    // Clear the test conversation from DB
    try {
      await fetch("/api/chat/test/clear", { method: "POST" });
    } catch {
      // ignore
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            🧪 Simulador de Chat
          </h1>
          <p className="text-slate-500 mt-1">
            Prueba cómo tu asistente IA responde a los pacientes
          </p>
        </div>
        <button
          onClick={clearChat}
          className="text-sm text-slate-500 hover:text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg"
        >
          Limpiar Chat
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Phone Mockup */}
        <div className="flex-1 max-w-md mx-auto flex flex-col">
          <div className="flex-1 bg-[#0b141a] rounded-t-2xl border border-slate-700/50 border-b-0 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  Tu Asistente Servy
                </p>
                <p className="text-[#25D366] text-xs">
                  {loading ? "escribiendo..." : "en línea"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-3xl mb-3">💬</p>
                  <p className="text-slate-500 text-sm">
                    Escribe un mensaje como si fueras un paciente
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      "Hola, quisiera agendar una cita",
                      "¿Cuánto cuesta la consulta?",
                      "¿Tienen disponibilidad mañana?",
                      "Necesito cancelar mi cita",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInput(suggestion);
                        }}
                        className="block mx-auto text-xs text-[#25D366] bg-[#25D366]/10 px-3 py-1.5 rounded-full hover:bg-[#25D366]/20 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "customer" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-xl shadow-sm ${
                      msg.role === "customer"
                        ? "bg-[#005c4b] text-white rounded-tr-sm"
                        : "bg-[#1f2c34] text-white rounded-tl-sm border border-slate-700/30"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <p
                      className={`text-[10px] text-right mt-1 ${
                        msg.role === "customer"
                          ? "text-white/50"
                          : "text-white/50"
                      }`}
                    >
                      {msg.time}
                      {msg.role === "customer" && " ✓✓"}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1f2c34] text-white px-4 py-3 rounded-xl rounded-tl-sm border border-slate-700/30">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={sendMessage}
            className="bg-[#1f2c34] rounded-b-2xl px-3 py-2.5 flex items-center gap-2 border border-slate-700/50 border-t-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-[#2a3942] rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#20bd5a] transition disabled:opacity-50 flex-shrink-0"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="hidden lg:block w-72 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              💡 Tips
            </h3>
            <ul className="text-xs text-slate-500 space-y-2">
              <li>• Habla como si fueras un paciente real</li>
              <li>• Intenta agendar una cita para probar el flujo completo</li>
              <li>• Pregunta por precios, horarios o servicios</li>
              <li>• Intenta reprogramar o cancelar</li>
              <li>• La IA usa tus servicios y horarios configurados</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              ⚠️ Requisitos
            </h3>
            <ul className="text-xs text-slate-500 space-y-2">
              <li>
                • Configura <strong>OPENAI_API_KEY</strong> en tu archivo .env
              </li>
              <li>• Agrega al menos un servicio</li>
              <li>• Configura tu horario de atención</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              🧪 Modo Prueba
            </h3>
            <p className="text-xs text-amber-700">
              Las citas creadas aquí son reales y aparecerán en tu panel. Úsalo
              para probar antes de conectar WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
