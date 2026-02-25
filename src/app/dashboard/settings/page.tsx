"use client";

import { useState, useEffect } from "react";

interface Business {
  id: string;
  name: string;
  description: string | null;
  phone: string | null;
  address: string | null;
  timezone: string;
  currency: string;
  locale: string;
  whatsappConnected: boolean;
  calendarConnected: boolean;
  aiGreeting: string | null;
  aiInstructions: string | null;
  aiTone: string;
}

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "whatsapp" | "calendar" | "ai"
  >("general");

  useEffect(() => {
    fetch("/api/business")
      .then((r) => r.json())
      .then((data) => {
        setBusiness(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!business) return;
    setSaving(true);
    await fetch("/api/business", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(business),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: keyof Business, value: string) => {
    if (!business) return;
    setBusiness({ ...business, [field]: value });
    setSaved(false);
  };

  if (loading || !business) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Cargando...</p>
      </div>
    );
  }

  const tabs = [
    { key: "general" as const, label: "General", icon: "🏥" },
    { key: "whatsapp" as const, label: "WhatsApp", icon: "💬" },
    { key: "calendar" as const, label: "Calendario", icon: "📅" },
    { key: "ai" as const, label: "Asistente IA", icon: "🧠" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            ⚙️ Configuración
          </h1>
          <p className="text-slate-500 mt-1">
            Configura tu consultorio y conexiones
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#25D366] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#20bd5a] transition text-sm disabled:opacity-50"
        >
          {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar Cambios"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre del consultorio
              </label>
              <input
                type="text"
                value={business.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={business.phone || ""}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                placeholder="+506 8888-0000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción
              </label>
              <textarea
                value={business.description || ""}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                placeholder="Describe tu consultorio y servicios..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={business.address || ""}
                onChange={(e) => update("address", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                placeholder="San José, Costa Rica"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Zona Horaria
              </label>
              <select
                value={business.timezone}
                onChange={(e) => update("timezone", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <option value="America/Costa_Rica">Costa Rica (CST)</option>
                <option value="America/Mexico_City">
                  Ciudad de México (CST)
                </option>
                <option value="America/Guatemala">Guatemala (CST)</option>
                <option value="America/Tegucigalpa">Honduras (CST)</option>
                <option value="America/El_Salvador">El Salvador (CST)</option>
                <option value="America/Managua">Nicaragua (CST)</option>
                <option value="America/Panama">Panamá (EST)</option>
                <option value="America/Bogota">Colombia (COT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Moneda
              </label>
              <select
                value={business.currency}
                onChange={(e) => update("currency", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <option value="USD">USD — Dólar</option>
                <option value="CRC">CRC — Colón</option>
                <option value="MXN">MXN — Peso Mexicano</option>
                <option value="COP">COP — Peso Colombiano</option>
                <option value="GTQ">GTQ — Quetzal</option>
                <option value="HNL">HNL — Lempira</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Tab */}
      {activeTab === "whatsapp" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-center py-8">
            {business.whatsappConnected ? (
              <div>
                <p className="text-4xl mb-4">✅</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  WhatsApp Conectado
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Tu asistente está respondiendo mensajes automáticamente.
                </p>
                <button className="mt-4 text-sm text-red-500 hover:text-red-700">
                  Desconectar WhatsApp
                </button>
              </div>
            ) : (
              <div>
                <p className="text-4xl mb-4">💬</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Conecta tu WhatsApp
                </h3>
                <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                  Escanea el código QR con tu WhatsApp Business para que Servy
                  pueda responder a tus pacientes automáticamente.
                </p>
                <div className="mt-6 w-48 h-48 bg-slate-100 rounded-xl mx-auto flex items-center justify-center">
                  <p className="text-slate-400 text-sm">
                    QR Code
                    <br />
                    (próximamente)
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Abre WhatsApp → Menú → Dispositivos vinculados → Vincular
                  dispositivo
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-center py-8">
            {business.calendarConnected ? (
              <div>
                <p className="text-4xl mb-4">✅</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Google Calendar Conectado
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Las citas se sincronizan automáticamente.
                </p>
                <button className="mt-4 text-sm text-red-500 hover:text-red-700">
                  Desconectar Calendar
                </button>
              </div>
            ) : (
              <div>
                <p className="text-4xl mb-4">📅</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Conecta tu Google Calendar
                </h3>
                <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                  Conecta tu Google Calendar para que Servy pueda verificar tu
                  disponibilidad y agendar citas directamente.
                </p>
                <button className="mt-6 bg-white border border-slate-300 text-slate-900 font-medium px-6 py-2.5 rounded-lg hover:bg-slate-50 transition text-sm inline-flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Conectar con Google
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Tab */}
      {activeTab === "ai" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Saludo Inicial
            </label>
            <textarea
              value={business.aiGreeting || ""}
              onChange={(e) => update("aiGreeting", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              placeholder="¡Hola! 👋 Bienvenido a nuestra clínica..."
            />
            <p className="text-xs text-slate-400 mt-1">
              Este mensaje se envía cuando un paciente nuevo escribe por primera
              vez.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Instrucciones para el Asistente
            </label>
            <textarea
              value={business.aiInstructions || ""}
              onChange={(e) => update("aiInstructions", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              placeholder="Describe cómo quieres que tu asistente se comporte, qué información debe dar, qué no debe hacer..."
            />
            <p className="text-xs text-slate-400 mt-1">
              Estas instrucciones definen la personalidad y conocimiento de tu
              asistente.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tono de la conversación
            </label>
            <select
              value={business.aiTone}
              onChange={(e) => update("aiTone", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <option value="professional">Profesional</option>
              <option value="friendly">Amigable</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              💡 Vista previa
            </h4>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  S
                </div>
                <p className="text-sm text-slate-700">
                  {business.aiGreeting ||
                    "¡Hola! 👋 Bienvenido. ¿En qué puedo ayudarte?"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
