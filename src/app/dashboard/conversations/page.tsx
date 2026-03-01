"use client";

import { useState, useEffect } from "react";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface ConversationAnalysis {
  id: string;
  score: number;
  summary: string;
  botRecommendations: string[];
  doctorRecommendations: string[];
  analyzedAt: string;
}

interface Conversation {
  id: string;
  customerPhone: string;
  customerName: string | null;
  status: string;
  updatedAt: string;
  messages: Message[];
  _count: { messages: number };
  analysis?: ConversationAnalysis | null;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score <= 2
      ? "bg-red-100 text-red-700"
      : score === 3
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${color}`}>
      {score}/5
    </span>
  );
}

function ScoreDisplay({ score }: { score: number }) {
  const color =
    score <= 2
      ? "text-red-600"
      : score === 3
        ? "text-yellow-600"
        : "text-green-600";
  const label =
    score === 5
      ? "Excelente"
      : score === 4
        ? "Buena"
        : score === 3
          ? "Regular"
          : score === 2
            ? "Deficiente"
            : "Fallida";
  return (
    <div className="flex items-center gap-2">
      <span className={`text-4xl font-bold ${color}`}>{score}</span>
      <div>
        <p className={`text-sm font-semibold ${color}`}>{label}</p>
        <p className="text-xs text-slate-400">de 5 puntos</p>
      </div>
    </div>
  );
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analysis, setAnalysis] = useState<ConversationAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((data) => {
        setConversations(data);
        setLoading(false);
      });
  }, []);

  const selectConversation = async (conv: Conversation) => {
    setSelected(conv);
    setAnalysis(conv.analysis || null);
    setShowAnalysis(false);
    const res = await fetch(`/api/conversations/${conv.id}/messages`);
    const data = await res.json();
    setMessages(data.messages || data);
    if (data.analysis) setAnalysis(data.analysis);
  };

  const handleAnalyze = async () => {
    if (!selected) return;
    setAnalyzing(true);
    try {
      const res = await fetch(`/api/conversations/${selected.id}/analyze`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data);
        setShowAnalysis(true);
        // Update score in list
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selected.id ? { ...c, analysis: data } : c
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleResolve = async () => {
    if (!selected) return;
    await fetch(`/api/conversations/${selected.id}`, { method: "PATCH" });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, status: "resolved" } : c
      )
    );
    setSelected((prev) => (prev ? { ...prev, status: "resolved" } : prev));
    // Auto-trigger analysis
    handleAnalyze();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">💬 Conversaciones</h1>
        <p className="text-slate-500 mt-1">
          Revisa las conversaciones de WhatsApp
        </p>
      </div>

      {conversations.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-4xl mb-4">💬</p>
          <p className="text-slate-900 font-medium">Aún no hay conversaciones</p>
          <p className="text-slate-500 text-sm mt-1">
            Cuando conectes WhatsApp, las conversaciones aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="flex gap-6 h-[calc(100vh-220px)]">
          {/* Conversation List */}
          <div className="w-80 bg-white rounded-xl border border-slate-200 overflow-y-auto flex-shrink-0">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition ${
                  selected?.id === conv.id ? "bg-[#25D366]/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {(conv.customerName || conv.customerPhone).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {conv.customerName || conv.customerPhone}
                      </p>
                      {conv.analysis && <ScoreBadge score={conv.analysis.score} />}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {conv.messages[0]?.content || "Sin mensajes"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px] text-slate-400">
                      {new Date(conv.updatedAt).toLocaleDateString("es", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        conv.status === "active"
                          ? "bg-[#25D366]"
                          : conv.status === "escalated"
                            ? "bg-amber-500"
                            : "bg-slate-300"
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chat + Analysis */}
          <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
            {/* Chat View */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col min-h-0">
              {selected ? (
                <>
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {selected.customerName || selected.customerPhone}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selected.customerPhone} ·{" "}
                        <span
                          className={`font-medium ${
                            selected.status === "active"
                              ? "text-green-600"
                              : selected.status === "escalated"
                                ? "text-amber-600"
                                : "text-slate-400"
                          }`}
                        >
                          {selected.status === "active"
                            ? "Activa"
                            : selected.status === "resolved"
                              ? "Resuelta"
                              : "Escalada"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selected.status === "active" && (
                        <button
                          onClick={handleResolve}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                        >
                          ✓ Marcar resuelta
                        </button>
                      )}
                      <button
                        onClick={() => setShowAnalysis((v) => !v)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition ${
                          showAnalysis
                            ? "bg-[#25D366] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        🧠 Análisis
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.role === "customer" ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                            msg.role === "customer"
                              ? "bg-slate-100 text-slate-900"
                              : msg.role === "assistant"
                                ? "bg-[#25D366] text-white"
                                : "bg-amber-50 text-amber-800 text-xs italic"
                          }`}
                        >
                          {msg.content}
                          <p
                            className={`text-[10px] mt-1 ${
                              msg.role === "customer"
                                ? "text-slate-400"
                                : msg.role === "assistant"
                                  ? "text-white/70"
                                  : "text-amber-400"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString("es", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 text-center flex-shrink-0">
                    <p className="text-xs text-slate-400">
                      💡 Las respuestas son manejadas automáticamente por Servy AI
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl mb-3">💬</p>
                    <p className="text-slate-500 text-sm">
                      Selecciona una conversación
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Panel */}
            {selected && showAnalysis && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">🧠 Análisis de Conversación</h3>
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20b858] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? "Analizando..." : "↻ Analizar"}
                  </button>
                </div>

                {analyzing && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                    <span className="animate-spin">⏳</span>
                    Analizando conversación con IA...
                  </div>
                )}

                {!analyzing && analysis && (
                  <div className="space-y-4">
                    {/* Score */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <ScoreDisplay score={analysis.score} />
                      <div className="flex-1">
                        <p className="text-sm text-slate-600">{analysis.summary}</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Analizado{" "}
                          {new Date(analysis.analyzedAt).toLocaleString("es", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Bot recs */}
                      <div>
                        <p className="text-xs font-semibold text-slate-700 mb-2">
                          🤖 Mejoras para el bot
                        </p>
                        <ul className="space-y-1.5">
                          {analysis.botRecommendations.map((rec, i) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-2">
                              <span className="text-[#25D366] flex-shrink-0">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Doctor recs */}
                      <div>
                        <p className="text-xs font-semibold text-slate-700 mb-2">
                          👨‍⚕️ Recomendaciones para ti
                        </p>
                        <ul className="space-y-1.5">
                          {analysis.doctorRecommendations.map((rec, i) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-2">
                              <span className="text-blue-500 flex-shrink-0">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {!analyzing && !analysis && (
                  <div className="text-center py-6 text-slate-400">
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="text-sm">No hay análisis aún</p>
                    <p className="text-xs mt-1">
                      Haz clic en &quot;Analizar&quot; para generar un análisis con IA
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
