"use client";

import { useState, useEffect, useCallback } from "react";

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
  whatsappSessionId: string | null;
  calendarConnected: boolean;
  aiGreeting: string | null;
  aiInstructions: string | null;
  aiTone: string;
  reminder24h: boolean;
  reminder1h: boolean;
}

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "whatsapp" | "calendar" | "ai"
  >("general");

  // WhatsApp state
  const [waStatus, setWaStatus] = useState<string>("disconnected");
  const [waQr, setWaQr] = useState<string | null>(null);
  const [waConnecting, setWaConnecting] = useState(false);

  useEffect(() => {
    fetch("/api/business")
      .then((r) => r.json())
      .then((data) => {
        setBusiness(data);
        setLoading(false);
      });
  }, []);

  // Poll WhatsApp status when on the whatsapp tab
  const pollWhatsApp = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp/qr");
      const data = await res.json();
      setWaStatus(data.status);
      setWaQr(data.qr || null);

      if (data.status === "connected") {
        setWaConnecting(false);
        // Refresh business data
        const bizRes = await fetch("/api/business");
        setBusiness(await bizRes.json());
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "whatsapp" || !waConnecting) return;

    // Poll every 2 seconds while connecting
    const interval = setInterval(pollWhatsApp, 2000);
    return () => clearInterval(interval);
  }, [activeTab, waConnecting, pollWhatsApp]);

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

  const startWhatsApp = async () => {
    setWaConnecting(true);
    setWaStatus("connecting");
    await fetch("/api/whatsapp/connect", { method: "POST" });
    // Start polling for QR
    setTimeout(pollWhatsApp, 1500);
  };

  const disconnectWhatsApp = async () => {
    if (!confirm("¿Desconectar WhatsApp? Tu asistente dejará de responder."))
      return;
    await fetch("/api/whatsapp/disconnect", { method: "POST" });
    setWaStatus("disconnected");
    setWaQr(null);
    setWaConnecting(false);
    const bizRes = await fetch("/api/business");
    setBusiness(await bizRes.json());
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
        {activeTab !== "whatsapp" && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#25D366] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#20bd5a] transition text-sm disabled:opacity-50"
          >
            {saving
              ? "Guardando..."
              : saved
                ? "✓ Guardado"
                : "Guardar Cambios"}
          </button>
        )}
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
          {business.whatsappConnected && waStatus !== "qr" ? (
            /* Connected State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                WhatsApp Conectado
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Conectado como{" "}
                <strong>+{business.whatsappSessionId}</strong>
              </p>
              <p className="text-[#25D366] text-sm mt-1 font-medium">
                🤖 Tu asistente está respondiendo mensajes automáticamente
              </p>

              <div className="mt-8 bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-left">
                <h4 className="text-sm font-medium text-slate-900 mb-2">
                  Cómo funciona
                </h4>
                <ul className="text-xs text-slate-500 space-y-1.5">
                  <li>
                    • Cada mensaje que llega a tu WhatsApp es procesado por
                    Servy AI
                  </li>
                  <li>
                    • Las citas se agendan automáticamente según tu
                    disponibilidad
                  </li>
                  <li>
                    • Las conversaciones se guardan en tu panel
                  </li>
                  <li>
                    • Puedes revisar todo en la sección de Conversaciones
                  </li>
                </ul>
              </div>

              <button
                onClick={disconnectWhatsApp}
                className="mt-6 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
              >
                Desconectar WhatsApp
              </button>
            </div>
          ) : waStatus === "qr" && waQr ? (
            /* QR Code State */
            <div className="text-center py-6">
              <div className="mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Escanea el código QR
              </h3>
              <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                Abre WhatsApp en tu teléfono → Menú (⋮) → Dispositivos
                vinculados → Vincular dispositivo
              </p>

              <div className="mt-6 inline-block bg-white p-4 rounded-2xl border-2 border-[#25D366]/20 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={waQr}
                  alt="WhatsApp QR Code"
                  className="w-64 h-64"
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#25D366]">
                <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
                Esperando que escanees...
              </div>

              <button
                onClick={() => {
                  setWaConnecting(false);
                  setWaQr(null);
                  setWaStatus("disconnected");
                }}
                className="mt-4 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
            </div>
          ) : waStatus === "connecting" ? (
            /* Connecting State */
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-[#25D366]/20 border-t-[#25D366] rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">
                Conectando...
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Preparando la conexión con WhatsApp
              </p>
            </div>
          ) : (
            /* Disconnected State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Conecta tu WhatsApp
              </h3>
              <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                Conecta tu WhatsApp para que Servy pueda responder a tus
                pacientes automáticamente, 24/7.
              </p>

              <button
                onClick={startWhatsApp}
                className="mt-6 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#20bd5a] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/25 text-sm inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Conectar WhatsApp
              </button>

              <div className="mt-8 bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-left">
                <h4 className="text-sm font-medium text-slate-900 mb-2">
                  ¿Cómo funciona?
                </h4>
                <ol className="text-xs text-slate-500 space-y-1.5 list-decimal list-inside">
                  <li>Haz clic en &quot;Conectar WhatsApp&quot;</li>
                  <li>Aparecerá un código QR</li>
                  <li>
                    Abre WhatsApp en tu teléfono → Menú → Dispositivos
                    vinculados
                  </li>
                  <li>Escanea el código QR</li>
                  <li>
                    ¡Listo! Servy empezará a responder automáticamente
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-center py-8">
            {business.calendarConnected ? (
              <div>
                <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Google Calendar Conectado
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  Las citas se sincronizan automáticamente con tu calendario.
                </p>

                <div className="mt-6 bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-left">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">
                    Sincronización activa
                  </h4>
                  <ul className="text-xs text-slate-500 space-y-1.5">
                    <li>
                      ✅ Nuevas citas se agregan a tu Google Calendar
                    </li>
                    <li>
                      ✅ Citas canceladas se eliminan del calendario
                    </li>
                    <li>
                      ✅ Eventos existentes en tu calendario bloquean
                      horarios automáticamente
                    </li>
                  </ul>
                </div>

                <button
                  onClick={async () => {
                    if (!confirm("¿Desconectar Google Calendar?")) return;
                    await fetch("/api/google/disconnect", { method: "POST" });
                    const bizRes = await fetch("/api/business");
                    setBusiness(await bizRes.json());
                  }}
                  className="mt-6 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
                >
                  Desconectar Calendar
                </button>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Conecta tu Google Calendar
                </h3>
                <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                  Conecta tu Google Calendar para sincronizar citas
                  automáticamente y respetar tu agenda existente.
                </p>
                <a
                  href="/api/google/connect"
                  className="mt-6 inline-flex bg-white border-2 border-slate-200 text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition text-sm items-center gap-3"
                >
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
                  Conectar con Google Calendar
                </a>

                <div className="mt-8 bg-slate-50 rounded-xl p-4 max-w-md mx-auto text-left">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">
                    ¿Qué se sincroniza?
                  </h4>
                  <ul className="text-xs text-slate-500 space-y-1.5">
                    <li>
                      📅 Las citas agendadas por Servy aparecen en tu calendario
                    </li>
                    <li>
                      🚫 Tus eventos existentes bloquean horarios (reuniones,
                      almuerzos, etc.)
                    </li>
                    <li>
                      ❌ Al cancelar una cita, se borra del calendario
                    </li>
                  </ul>
                </div>
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

          {/* Reminders */}
          <div className="border-t border-slate-200 pt-4 mt-2">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              ⏰ Recordatorios Automáticos
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Envía recordatorios por WhatsApp a tus pacientes antes de su cita.
            </p>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Recordatorio 24 horas antes
                  </p>
                  <p className="text-xs text-slate-500">
                    Se envía el día anterior a la cita
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={business.reminder24h}
                  onChange={(e) => {
                    setBusiness({ ...business, reminder24h: e.target.checked });
                    setSaved(false);
                  }}
                  className="w-5 h-5 rounded border-slate-300 text-[#25D366] focus:ring-[#25D366]"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Recordatorio 1 hora antes
                  </p>
                  <p className="text-xs text-slate-500">
                    Se envía poco antes de la cita con la dirección
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={business.reminder1h}
                  onChange={(e) => {
                    setBusiness({ ...business, reminder1h: e.target.checked });
                    setSaved(false);
                  }}
                  className="w-5 h-5 rounded border-slate-300 text-[#25D366] focus:ring-[#25D366]"
                />
              </label>
            </div>
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
