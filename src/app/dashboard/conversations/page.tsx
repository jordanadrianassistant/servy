"use client";

import { useState, useEffect } from "react";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  customerPhone: string;
  customerName: string | null;
  status: string;
  updatedAt: string;
  messages: Message[];
  _count: { messages: number };
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

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
    const res = await fetch(`/api/conversations/${conv.id}/messages`);
    const data = await res.json();
    setMessages(data);
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
          <p className="text-slate-900 font-medium">
            Aún no hay conversaciones
          </p>
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
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {(conv.customerName || conv.customerPhone).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {conv.customerName || conv.customerPhone}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {conv.messages[0]?.content || "Sin mensajes"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
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

          {/* Chat View */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col">
            {selected ? (
              <>
                <div className="px-6 py-4 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-900">
                    {selected.customerName || selected.customerPhone}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selected.customerPhone}
                  </p>
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
                <div className="px-6 py-4 border-t border-slate-200 text-center">
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
        </div>
      )}
    </div>
  );
}
