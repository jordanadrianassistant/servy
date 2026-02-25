import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center font-bold text-slate-900">
            S
          </div>
          <span className="text-xl font-bold">Servy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-[#25D366] text-slate-900 font-semibold px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition"
          >
            Empezar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="inline-block bg-[#25D366]/10 text-[#25D366] text-sm font-medium px-3 py-1 rounded-full mb-6">
            🤖 Asistente IA para WhatsApp
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Tu asistente que{" "}
            <span className="text-[#25D366]">nunca duerme</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl">
            Servy responde a tus pacientes por WhatsApp 24/7. Agenda citas,
            reprograma, responde preguntas frecuentes y más — mientras tú te
            enfocas en lo que importa.
          </p>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="bg-[#25D366] text-slate-900 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-[#20bd5a] transition"
            >
              Comenzar Ahora →
            </Link>
            <a
              href="#como-funciona"
              className="border border-slate-600 text-slate-300 font-medium px-8 py-3 rounded-lg text-lg hover:border-slate-400 hover:text-white transition"
            >
              ¿Cómo funciona?
            </a>
          </div>
        </div>

        {/* Features */}
        <section id="como-funciona" className="mt-32">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💬"
              title="WhatsApp Automático"
              description="Conecta tu WhatsApp Business y Servy responde a tus pacientes al instante, a cualquier hora."
            />
            <FeatureCard
              icon="📅"
              title="Agenda Inteligente"
              description="Se conecta con tu Google Calendar. Verifica disponibilidad y agenda citas sin conflictos."
            />
            <FeatureCard
              icon="🧠"
              title="IA Personalizada"
              description="Configura el tono, los servicios y las respuestas. Tu asistente habla como tú quieres."
            />
            <FeatureCard
              icon="🔄"
              title="Reprogramaciones"
              description="Los pacientes pueden reprogramar o cancelar sin llamarte. Todo se actualiza automáticamente."
            />
            <FeatureCard
              icon="📊"
              title="Panel de Control"
              description="Ve todas las conversaciones, citas y métricas en un solo lugar."
            />
            <FeatureCard
              icon="🌎"
              title="Hecho para LATAM"
              description="Pensado para doctores, dentistas y profesionales en Centroamérica, México y Colombia."
            />
          </div>
        </section>

        {/* How it Works */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold mb-12 text-center">
            3 pasos para empezar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Crea tu cuenta"
              description="Registra tu consultorio y configura tus servicios, horarios y precios."
            />
            <StepCard
              number="2"
              title="Conecta WhatsApp"
              description="Escanea un código QR y tu asistente empieza a responder."
            />
            <StepCard
              number="3"
              title="Relájate"
              description="Servy se encarga del resto. Tú recibes pacientes confirmados."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para dejar de perder pacientes?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Empieza gratis. Sin tarjeta de crédito.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-[#25D366] text-slate-900 font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#20bd5a] transition"
          >
            Crear Mi Asistente →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © 2026 Servy. Hecho con 💚 para profesionales de la salud.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-[#25D366]/50 transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-[#25D366] text-slate-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
