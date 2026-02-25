export default function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Buenos días, Doctor 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Aquí tienes un resumen de hoy.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Citas Hoy" value="8" change="+2 vs ayer" positive />
        <StatCard
          label="Mensajes Hoy"
          value="24"
          change="+12 vs ayer"
          positive
        />
        <StatCard
          label="Tasa de Respuesta"
          value="98%"
          change="< 30 seg promedio"
          positive
        />
        <StatCard
          label="Citas Pendientes"
          value="3"
          change="por confirmar"
          positive={false}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            📅 Próximas Citas
          </h2>
          <div className="space-y-3">
            <AppointmentRow
              time="09:00"
              name="María López"
              service="Consulta General"
              status="confirmed"
            />
            <AppointmentRow
              time="10:00"
              name="Carlos Pérez"
              service="Control"
              status="confirmed"
            />
            <AppointmentRow
              time="11:30"
              name="Ana Rodríguez"
              service="Primera Consulta"
              status="pending"
            />
            <AppointmentRow
              time="14:00"
              name="José García"
              service="Consulta General"
              status="confirmed"
            />
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            💬 Conversaciones Recientes
          </h2>
          <div className="space-y-3">
            <ConversationRow
              name="María López"
              message="¡Perfecto, ahí estaré a las 9!"
              time="Hace 5 min"
              unread={false}
            />
            <ConversationRow
              name="+506 8845-1234"
              message="Hola, ¿tienen disponibilidad para mañana?"
              time="Hace 12 min"
              unread={true}
            />
            <ConversationRow
              name="Carlos Pérez"
              message="Gracias por confirmar mi cita"
              time="Hace 1 hora"
              unread={false}
            />
            <ConversationRow
              name="+57 312-456-7890"
              message="¿Cuánto cuesta la consulta?"
              time="Hace 2 horas"
              unread={true}
            />
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <ConnectionCard
          service="WhatsApp"
          icon="💬"
          connected={true}
          detail="Conectado · +506 8888-0000"
        />
        <ConnectionCard
          service="Google Calendar"
          icon="📅"
          connected={false}
          detail="No conectado"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      <p
        className={`text-xs mt-2 ${positive ? "text-green-600" : "text-amber-600"}`}
      >
        {change}
      </p>
    </div>
  );
}

function AppointmentRow({
  time,
  name,
  service,
  status,
}: {
  time: string;
  name: string;
  service: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition">
      <span className="text-sm font-mono text-slate-500 w-12">{time}</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{service}</p>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          status === "confirmed"
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {status === "confirmed" ? "Confirmada" : "Pendiente"}
      </span>
    </div>
  );
}

function ConversationRow({
  name,
  message,
  time,
  unread,
}: {
  name: string;
  message: string;
  time: string;
  unread: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition cursor-pointer">
      <div className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center text-sm flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className={`text-sm ${unread ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
          >
            {name}
          </p>
          <span className="text-xs text-slate-400">{time}</span>
        </div>
        <p className="text-xs text-slate-500 truncate">{message}</p>
      </div>
      {unread && (
        <div className="w-2 h-2 bg-[#25D366] rounded-full mt-2 flex-shrink-0" />
      )}
    </div>
  );
}

function ConnectionCard({
  service,
  icon,
  connected,
  detail,
}: {
  service: string;
  icon: string;
  connected: boolean;
  detail: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
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
        {connected ? "✓ Conectado" : "Conectar"}
      </div>
    </div>
  );
}
