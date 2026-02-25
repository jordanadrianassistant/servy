import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-animated text-white overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-[#25D366]/20">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">Servy</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#como-funciona" className="text-sm text-slate-400 hover:text-white transition hidden md:block">
            Cómo Funciona
          </a>
          <a href="#precios" className="text-sm text-slate-400 hover:text-white transition hidden md:block">
            Precios
          </a>
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="text-sm bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            Empezar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <div className="fade-in-up inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
                <span className="w-2 h-2 bg-[#25D366] rounded-full pulse-dot" />
                Asistente IA para WhatsApp
              </div>
              <h1 className="fade-in-up-delayed text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                Tu recepcionista
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#2EE676] glow-text">
                  que nunca duerme
                </span>
              </h1>
              <p className="fade-in-up-delayed-2 text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                Servy responde a tus pacientes por WhatsApp 24/7. Agenda citas,
                reprograma, responde preguntas — mientras tú te enfocas en lo
                que importa.
              </p>
              <div className="fade-in-up-delayed-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white font-semibold px-8 py-4 rounded-xl text-lg hover:shadow-xl hover:shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  Comenzar Gratis
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href="#demo"
                  className="border border-slate-700 text-slate-300 font-medium px-8 py-4 rounded-xl text-lg hover:border-slate-500 hover:text-white hover:bg-white/5 transition-all duration-300 text-center"
                >
                  Ver Demo
                </a>
              </div>
              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin tarjeta
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Setup en 5 min
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancela cuando quieras
                </span>
              </div>
            </div>

            {/* Right: WhatsApp Chat Mockup */}
            <div className="relative float">
              <div className="glow-green rounded-3xl overflow-hidden bg-[#0b141a] border border-slate-700/50 shadow-2xl max-w-sm mx-auto">
                {/* Chat header */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                  <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      Clínica Dental Sonrisa
                    </p>
                    <p className="text-[#25D366] text-xs">en línea</p>
                  </div>
                  <div className="flex gap-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                    </svg>
                  </div>
                </div>

                {/* Chat background */}
                <div className="p-4 space-y-3 min-h-[380px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] relative">
                  {/* Patient message */}
                  <div className="chat-bubble chat-bubble-1 flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2 rounded-xl rounded-tr-sm max-w-[75%] shadow-sm">
                      <p className="text-[13px] leading-relaxed">
                        Hola! Quisiera agendar una cita para limpieza dental 🦷
                      </p>
                      <p className="text-[10px] text-white/50 text-right mt-1">
                        10:23 AM
                      </p>
                    </div>
                  </div>

                  {/* Bot response */}
                  <div className="chat-bubble chat-bubble-2 flex justify-start">
                    <div className="bg-[#1f2c34] text-white px-3.5 py-2 rounded-xl rounded-tl-sm max-w-[80%] shadow-sm border border-slate-700/30">
                      <p className="text-[13px] leading-relaxed">
                        ¡Hola! 👋 Con gusto te ayudo. Tenemos disponibilidad
                        mañana miércoles:
                      </p>
                      <div className="mt-2 bg-[#0b141a]/50 rounded-lg px-3 py-2">
                        <p className="text-[12px] text-[#25D366]">
                          🕐 09:00 AM
                          <br />
                          🕐 11:30 AM
                          <br />
                          🕐 02:00 PM
                        </p>
                      </div>
                      <p className="text-[13px] mt-2 leading-relaxed">
                        ¿Cuál horario te queda mejor?
                      </p>
                      <p className="text-[10px] text-white/50 text-right mt-1">
                        10:23 AM
                      </p>
                    </div>
                  </div>

                  {/* Patient reply */}
                  <div className="chat-bubble chat-bubble-3 flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2 rounded-xl rounded-tr-sm max-w-[75%] shadow-sm">
                      <p className="text-[13px] leading-relaxed">
                        A las 11:30! Mi nombre es María López
                      </p>
                      <p className="text-[10px] text-white/50 text-right mt-1">
                        10:24 AM
                      </p>
                    </div>
                  </div>

                  {/* Bot confirms */}
                  <div className="chat-bubble chat-bubble-4 flex justify-start">
                    <div className="bg-[#1f2c34] text-white px-3.5 py-2 rounded-xl rounded-tl-sm max-w-[80%] shadow-sm border border-slate-700/30">
                      <p className="text-[13px] leading-relaxed">
                        ¡Perfecto María! Tu cita queda confirmada ✅
                      </p>
                      <div className="mt-2 bg-[#0b141a]/50 rounded-lg px-3 py-2 space-y-0.5">
                        <p className="text-[12px]">
                          📅 Miércoles 26 de febrero
                        </p>
                        <p className="text-[12px]">🕐 11:30 AM</p>
                        <p className="text-[12px]">🦷 Limpieza Dental</p>
                      </div>
                      <p className="text-[13px] mt-2 leading-relaxed">
                        Te enviaré un recordatorio mañana. ¡Te esperamos! 😊
                      </p>
                      <p className="text-[10px] text-white/50 text-right mt-1">
                        10:24 AM
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="chat-bubble chat-bubble-5 flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2.5 rounded-xl rounded-tr-sm shadow-sm">
                      <p className="text-[13px]">Muchas gracias!! 😊🙏</p>
                      <p className="text-[10px] text-white/50 text-right mt-1">
                        10:24 AM ✓✓
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="bg-[#1f2c34] px-3 py-2.5 flex items-center gap-2">
                  <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
                    <p className="text-slate-500 text-sm">Mensaje</p>
                  </div>
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 float-delayed shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-xs font-medium text-white">
                      Respuesta en
                    </p>
                    <p className="text-sm font-bold text-[#25D366]">
                      &lt; 3 segundos
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 float shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <div>
                    <p className="text-xs font-medium text-white">
                      Cita agendada
                    </p>
                    <p className="text-sm font-bold text-[#25D366]">
                      Automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos / Social Proof */}
        <section className="border-y border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-widest">
              Diseñado para profesionales de la salud en
            </p>
            <div className="flex justify-center items-center gap-12 flex-wrap text-slate-500">
              <span className="text-lg font-medium flex items-center gap-2">
                🇨🇷 Costa Rica
              </span>
              <span className="text-lg font-medium flex items-center gap-2">
                🇲🇽 México
              </span>
              <span className="text-lg font-medium flex items-center gap-2">
                🇨🇴 Colombia
              </span>
              <span className="text-lg font-medium flex items-center gap-2">
                🇬🇹 Guatemala
              </span>
              <span className="text-lg font-medium flex items-center gap-2">
                🇭🇳 Honduras
              </span>
              <span className="text-lg font-medium flex items-center gap-2">
                🇵🇦 Panamá
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="counter-glow rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                24/7
              </p>
              <p className="text-sm text-slate-400">Disponibilidad</p>
            </div>
            <div className="counter-glow rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                &lt;3s
              </p>
              <p className="text-sm text-slate-400">Tiempo de respuesta</p>
            </div>
            <div className="counter-glow rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                98%
              </p>
              <p className="text-sm text-slate-400">Tasa de resolución</p>
            </div>
            <div className="counter-glow rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                0
              </p>
              <p className="text-sm text-slate-400">Pacientes perdidos</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="como-funciona" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Funcionalidades
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Todo lo que necesitas,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#2EE676]">
                  nada que no
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon="💬"
                title="WhatsApp Automático"
                description="Conecta tu WhatsApp Business y Servy responde a tus pacientes al instante. A cualquier hora, cualquier día."
                gradient="from-[#25D366]/20 to-[#128C7E]/5"
              />
              <FeatureCard
                icon="📅"
                title="Agenda Inteligente"
                description="Se sincroniza con Google Calendar. Verifica disponibilidad en tiempo real y agenda sin conflictos."
                gradient="from-blue-500/20 to-blue-600/5"
              />
              <FeatureCard
                icon="🧠"
                title="IA Personalizada"
                description="Configura el tono, servicios y respuestas. Tu asistente habla como tú quieres — profesional, amigable, o formal."
                gradient="from-purple-500/20 to-purple-600/5"
              />
              <FeatureCard
                icon="🔄"
                title="Reprogramaciones"
                description="Los pacientes reprograman o cancelan sin llamarte. Todo se actualiza automáticamente en tu calendario."
                gradient="from-amber-500/20 to-amber-600/5"
              />
              <FeatureCard
                icon="📊"
                title="Panel de Control"
                description="Ve todas las conversaciones, citas y métricas en un dashboard elegante. Siempre sabes qué está pasando."
                gradient="from-cyan-500/20 to-cyan-600/5"
              />
              <FeatureCard
                icon="🌎"
                title="Hecho para LATAM"
                description="Español nativo. Zonas horarias, monedas y formatos de tu país. No es una traducción — es local."
                gradient="from-rose-500/20 to-rose-600/5"
              />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="demo" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Rápido y Simple
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                3 pasos para empezar
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Crea tu cuenta"
                description="Registra tu consultorio, agrega tus servicios, define horarios y precios. Toma menos de 5 minutos."
              />
              <StepCard
                number="2"
                title="Conecta WhatsApp"
                description="Escanea un código QR con tu teléfono. Listo — tu asistente empieza a responder al instante."
              />
              <StepCard
                number="3"
                title="Relájate"
                description="Servy se encarga del resto. Tú recibes pacientes con citas confirmadas. Sin estrés."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Testimonios
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Lo que dicen nuestros usuarios
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="Antes perdía pacientes porque no contestaba a tiempo. Ahora Servy responde en segundos y mi agenda está llena."
                name="Dra. Ana Rodríguez"
                role="Dermatóloga · San José, CR"
                avatar="A"
              />
              <TestimonialCard
                quote="Mis pacientes me dicen que es increíble lo rápido que les contestan. No saben que es una IA 😂"
                name="Dr. Carlos Méndez"
                role="Dentista · CDMX, MX"
                avatar="C"
              />
              <TestimonialCard
                quote="Me ahorra fácil 3 horas al día que antes gastaba respondiendo WhatsApp. Ahora me enfoco en mis pacientes."
                name="Dra. Valentina Torres"
                role="Psicóloga · Bogotá, CO"
                avatar="V"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="precios" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Precios
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Simple y transparente
              </h2>
              <p className="text-slate-400 mt-4 text-lg">
                Empieza gratis. Escala cuando estés listo.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                name="Starter"
                price="Gratis"
                period=""
                description="Para probar Servy"
                features={[
                  "50 mensajes/mes",
                  "1 servicio",
                  "Agenda básica",
                  "Dashboard",
                ]}
                cta="Empezar Gratis"
                highlighted={false}
              />
              <PricingCard
                name="Pro"
                price="$29"
                period="/mes"
                description="Para consultorios activos"
                features={[
                  "Mensajes ilimitados",
                  "Servicios ilimitados",
                  "Google Calendar sync",
                  "Personalización IA",
                  "Soporte prioritario",
                ]}
                cta="Comenzar Ahora"
                highlighted={true}
              />
              <PricingCard
                name="Clínica"
                price="$79"
                period="/mes"
                description="Para clínicas con varios doctores"
                features={[
                  "Todo en Pro",
                  "Múltiples doctores",
                  "Múltiples líneas WhatsApp",
                  "Analytics avanzados",
                  "API access",
                  "Onboarding dedicado",
                ]}
                cta="Contactar Ventas"
                highlighted={false}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-12 md:p-16 backdrop-blur-sm">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  ¿Listo para dejar de
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#2EE676]">
                    perder pacientes?
                  </span>
                </h2>
                <p className="text-slate-400 mb-10 text-lg max-w-lg mx-auto">
                  Únete a los profesionales de salud que ya automatizan su
                  atención con Servy.
                </p>
                <Link
                  href="/register"
                  className="inline-block bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white font-semibold px-10 py-4 rounded-xl text-lg hover:shadow-xl hover:shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-1"
                >
                  Crear Mi Asistente Gratis →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-lg flex items-center justify-center font-bold text-white text-sm">
                S
              </div>
              <span className="text-lg font-bold text-white">Servy</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Servy. Hecho con 💚 para profesionales de la salud en
              Latinoamérica.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition">
                Privacidad
              </a>
              <a href="#" className="hover:text-white transition">
                Términos
              </a>
              <a href="#" className="hover:text-white transition">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#25D366]/30 transition-all duration-500 hover:-translate-y-1">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
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
    <div className="text-center group">
      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20bd5a] text-white font-bold text-2xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#25D366]/20 group-hover:-translate-y-2 transition-transform duration-300">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            className="w-4 h-4 text-[#25D366]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-gradient-to-b from-[#25D366]/10 to-transparent border-2 border-[#25D366]/30 shadow-xl shadow-[#25D366]/10"
          : "bg-white/[0.03] border border-white/10 hover:border-white/20"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white text-xs font-bold px-4 py-1 rounded-full">
          Más Popular
        </div>
      )}
      <p className="text-sm font-medium text-slate-400 mb-1">{name}</p>
      <div className="mb-2">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-slate-500 text-sm">{period}</span>
      </div>
      <p className="text-slate-500 text-sm mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
            <svg
              className="w-4 h-4 text-[#25D366] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          highlighted
            ? "bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
            : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-white/5"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
