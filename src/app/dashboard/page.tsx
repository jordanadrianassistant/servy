import { getCurrentBusiness } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardHome() {
  const business = await getCurrentBusiness();
  if (!business) redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [todayAppointments, totalConversations, recentConversations] =
    await Promise.all([
      db.appointment.findMany({
        where: {
          businessId: business.id,
          startTime: { gte: today, lt: tomorrow },
        },
        include: { service: true },
        orderBy: { startTime: "asc" },
      }),
      db.conversation.count({ where: { businessId: business.id } }),
      db.conversation.findMany({
        where: { businessId: business.id },
        include: {
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  const confirmedToday = todayAppointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const pendingToday = todayAppointments.filter(
    (a) => a.status !== "confirmed" && a.status !== "cancelled"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Buenos días 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Panel de control de <strong>{business.name}</strong>
        </p>
      </div>

      {/* Setup Checklist */}
      {(!business.whatsappConnected || business.services.length === 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-900 mb-3">
            ⚡ Completa tu configuración
          </h2>
          <div className="space-y-2">
            {business.services.length === 0 && (
              <ChecklistItem
                done={false}
                label="Agrega tus servicios"
                href="/dashboard/services"
              />
            )}
            {!business.whatsappConnected && (
              <ChecklistItem
                done={false}
                label="Conecta WhatsApp"
                href="/dashboard/settings"
              />
            )}
            {!business.calendarConnected && (
              <ChecklistItem
                done={false}
                label="Conecta Google Calendar"
                href="/dashboard/settings"
              />
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Citas Hoy" value={String(todayAppointments.length)} />
        <StatCard label="Confirmadas" value={String(confirmedToday)} />
        <StatCard label="Pendientes" value={String(pendingToday)} />
        <StatCard label="Conversaciones" value={String(totalConversations)} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              📅 Citas de Hoy
            </h2>
            <Link
              href="/dashboard/appointments"
              className="text-sm text-[#25D366] hover:underline"
            >
              Ver todas
            </Link>
          </div>
          {todayAppointments.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              No hay citas para hoy
            </p>
          ) : (
            <div className="space-y-2">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50"
                >
                  <span className="text-sm font-mono text-slate-500 w-12">
                    {new Date(apt.startTime).toLocaleTimeString("es", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {apt.customerName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {apt.service?.name || "Sin servicio"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      apt.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : apt.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {apt.status === "confirmed"
                      ? "Confirmada"
                      : apt.status === "cancelled"
                        ? "Cancelada"
                        : "Pendiente"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Conversations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              💬 Conversaciones Recientes
            </h2>
            <Link
              href="/dashboard/conversations"
              className="text-sm text-[#25D366] hover:underline"
            >
              Ver todas
            </Link>
          </div>
          {recentConversations.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              Aún no hay conversaciones
            </p>
          ) : (
            <div className="space-y-2">
              {recentConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50"
                >
                  <div className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    {(conv.customerName || conv.customerPhone).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {conv.customerName || conv.customerPhone}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {conv.messages[0]?.content || "Sin mensajes"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <ConnectionCard
          service="WhatsApp"
          icon="💬"
          connected={business.whatsappConnected}
          detail={
            business.whatsappConnected
              ? "Conectado y respondiendo"
              : "No conectado"
          }
          href="/dashboard/settings"
        />
        <ConnectionCard
          service="Google Calendar"
          icon="📅"
          connected={business.calendarConnected}
          detail={
            business.calendarConnected
              ? `Sincronizado · ${business.calendarId}`
              : "No conectado"
          }
          href="/dashboard/settings"
        />
      </div>
    </div>
  );
}

function ChecklistItem({
  done,
  label,
  href,
}: {
  done: boolean;
  label: string;
  href: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-2 group">
      <span className={done ? "text-green-600" : "text-amber-500"}>
        {done ? "✓" : "○"}
      </span>
      <span className="text-sm text-amber-900 group-hover:underline">
        {label}
      </span>
      <span className="text-xs text-amber-500">→</span>
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function ConnectionCard({
  service,
  icon,
  connected,
  detail,
  href,
}: {
  service: string;
  icon: string;
  connected: boolean;
  detail: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between hover:border-slate-300 transition"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm font-medium text-slate-900">{service}</p>
          <p className="text-xs text-slate-500">{detail}</p>
        </div>
      </div>
      <div
        className={`text-xs px-3 py-1 rounded-full font-medium ${
          connected
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {connected ? "✓ Conectado" : "Conectar →"}
      </div>
    </Link>
  );
}
