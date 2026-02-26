import Link from "next/link";
import { useState } from "react";

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
                Recupera tu tiempo.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#2EE676] glow-text">
                  Aumenta tus ingresos.
                </span>
              </h1>
              <p className="fade-in-up-delayed-2 text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                ¿Cuántas horas al día pierdes respondiendo chats y agendando citas? 
                Servy es tu asistente de IA que maneja todo por WhatsApp 24/7 — 
                mientras tú atiendes más pacientes y ganas más dinero.
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
                  30 USD/mes
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Setup 5 min
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancela gratis
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

        {/* Pain Points */}
        <section id="problema" className="py-20 bg-white/5 border-y border-slate-700/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                El problema que nadie quiere admitir
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Eres dentista, doctor, veterinario. No contrataste a un recepcionista para gastar dinero 
                — lo necesitabas porque estabas ahogado. Pero ahora el recepcionista cuesta más de lo que ganas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">2-3 horas/día en chats</h3>
                    <p className="text-slate-400">
                      Respondiendo "Hola", confirmando disponibilidad, preguntando datos del paciente. 
                      Tiempo que podrías estar atendiendo más gente.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Recepcionista = 300-600 USD/mes</h3>
                    <p className="text-slate-400">
                      Salary + impuestos + beneficios. Eso sale de tu bolsillo, aunque atiendas pocas citas.
                      ¿Realmente vale la pena?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📉</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">30% de no-shows</h3>
                    <p className="text-slate-400">
                      Sin recordatorio automático, los pacientes se olvidan. Pierdes 50-100 USD por cita no asistida.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🤯</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Errores de disponibilidad</h3>
                    <p className="text-slate-400">
                      El recepcionista confirma una cita que no hay espacio. O se olvida de actualizar el calendario.
                      Caos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="como-funciona" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                La solución
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Tu recepcionista de IA,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#2EE676]">
                  30 USD/mes
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon="⏰"
                title="Libérate de los chats"
                description="Servy responde instantáneamente 24/7. Tú nunca más tienes que estar pegado al teléfono. 2-3 horas/día de vuelta en tu bolsillo."
                gradient="from-[#25D366]/20 to-[#128C7E]/5"
              />
              <FeatureCard
                icon="📅"
                title="Calendario perfecto (sin errores)"
                description="Se sincroniza con Google Calendar. Nunca más doble booking. La IA verifica disponibilidad en tiempo real."
                gradient="from-blue-500/20 to-blue-600/5"
              />
              <FeatureCard
                icon="🎯"
                title="Reducción de no-shows"
                description="Recordatorios automáticos 24h y 1h antes. Los pacientes no se olvidan. Recupera 30% de citas perdidas."
                gradient="from-purple-500/20 to-purple-600/5"
              />
              <FeatureCard
                icon="💬"
                title="Responde como tú"
                description="Configura tu tono, servicios, precios. Tu voz. No suena como robot — es tu asistente personal."
                gradient="from-amber-500/20 to-amber-600/5"
              />
              <FeatureCard
                icon="💰"
                title="Costos bajo control"
                description="30 USD/mes vs 300-600 USD de recepcionista. Sin empleados, sin impuestos, sin sorpresas. Solo pura ganancia."
                gradient="from-cyan-500/20 to-cyan-600/5"
              />
              <FeatureCard
                icon="📊"
                title="Siempre sabes qué pasa"
                description="Dashboard en tiempo real. Todas las citas, conversaciones y métricas en un lugar. Control total."
                gradient="from-rose-500/20 to-rose-600/5"
              />
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-900/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Ver en vivo
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Así es una conversación real con Servy
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                No es magia. Es IA entrenada para tu negocio. Mira cómo responde, agenda y confirma citas.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#0b141a] rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {/* Chat header */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Clínica Dental</p>
                    <p className="text-[#25D366] text-xs">Escribiendo...</p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-3 min-h-[400px] bg-[#0b141a]">
                  {/* Patient */}
                  <div className="flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2 rounded-xl rounded-tr-sm max-w-xs">
                      <p className="text-sm">Hola! Necesito una cita para limpieza</p>
                      <p className="text-xs text-white/50 mt-1">10:15 AM</p>
                    </div>
                  </div>

                  {/* Bot */}
                  <div className="flex justify-start">
                    <div className="bg-[#1f2c34] text-white px-3.5 py-2 rounded-xl rounded-tl-sm max-w-xs border border-slate-700/30">
                      <p className="text-sm mb-2">¡Hola! Claro que sí. Te tengo disponibilidad:</p>
                      <div className="bg-[#0b141a]/50 rounded px-2 py-1.5 space-y-1 text-xs">
                        <p className="text-[#25D366]">📅 Mañana 09:00 AM</p>
                        <p className="text-[#25D366]">📅 Mañana 02:00 PM</p>
                        <p className="text-[#25D366]">📅 Pasado 11:00 AM</p>
                      </div>
                      <p className="text-sm mt-2">¿Cuál te queda?</p>
                      <p className="text-xs text-white/50 mt-1">10:16 AM</p>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2 rounded-xl rounded-tr-sm max-w-xs">
                      <p className="text-sm">Mañana a las 2pm!</p>
                      <p className="text-xs text-white/50 mt-1">10:17 AM</p>
                    </div>
                  </div>

                  {/* Bot - Confirmation */}
                  <div className="flex justify-start">
                    <div className="bg-[#1f2c34] text-white px-3.5 py-2 rounded-xl rounded-tl-sm max-w-xs border border-slate-700/30">
                      <p className="text-sm mb-2">✅ Perfecto! Tu cita está confirmada:</p>
                      <div className="bg-[#0b141a]/50 rounded px-2 py-1.5 space-y-0.5 text-xs mb-2">
                        <p>📅 Mañana, 26 de Febrero</p>
                        <p>🕐 02:00 PM</p>
                        <p>🦷 Limpieza Dental</p>
                        <p>💰 $75 USD</p>
                      </div>
                      <p className="text-sm">Te enviaré un recordatorio mañana. ¡Nos vemos! 😊</p>
                      <p className="text-xs text-white/50 mt-1">10:17 AM</p>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="flex justify-end">
                    <div className="bg-[#005c4b] text-white px-3.5 py-2 rounded-xl rounded-tr-sm max-w-xs">
                      <p className="text-sm">Perfecto! Gracias! 🙌</p>
                      <p className="text-xs text-white/50 mt-1">10:18 AM</p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="bg-[#1f2c34] px-3 py-2.5 flex items-center gap-2">
                  <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
                    <p className="text-slate-500 text-sm">Mensaje</p>
                  </div>
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#20bd5a] transition">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Call to action below demo */}
              <div className="text-center mt-10">
                <p className="text-slate-400 mb-4">¿Ves? Sin esperas. Sin confusión. Sin necesidad de un recepcionista.</p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Prueba gratis ahora
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Empieza hoy
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                3 pasos. 5 minutos. Fin de los chats.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Crea tu cuenta"
                description="Tu nombre, teléfono, servicios y horarios. Servy aprende cómo eres y qué ofreces."
              />
              <StepCard
                number="2"
                title="Conecta WhatsApp"
                description="Escanea un QR. Tu número queda vinculado. Listo — tu IA empieza a trabajar."
              />
              <StepCard
                number="3"
                title="Observa cómo funciona"
                description="Los pacientes escriben. Servy responde. Citas se confirman. Recordatorios se envían. Tú descansas."
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

        {/* FAQ */}
        <section id="faq" className="py-20 bg-white/[0.03] border-y border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#25D366] text-sm font-semibold uppercase tracking-widest mb-3">
                Preguntas Frecuentes
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Todo lo que necesitas saber
              </h2>
            </div>
            <div className="space-y-4">
              <FAQItem
                question="¿Cómo conecta Servy con mi WhatsApp?"
                answer="Es muy simple. Escaneas un código QR en el dashboard y Servy se vincula a tu número de WhatsApp. No necesitas compartir contraseña. La conexión es segura y directa."
              />
              <FAQItem
                question="¿Es seguro compartir mi WhatsApp con Servy?"
                answer="100% seguro. Usamos Baileys, una librería de código abierto. Nunca almacenamos tu contraseña. Tu número de WhatsApp está protegido y solo Servy lo usa para responder mensajes de pacientes."
              />
              <FAQItem
                question="¿Puedo personalizar las respuestas de Servy?"
                answer="Sí, totalmente. En el dashboard configuras: tus servicios, precios, horarios, ubicación, y el tono de respuesta. Servy aprende tu estilo y responde como si fueras tú."
              />
              <FAQItem
                question="¿Cuánto cuesta? ¿Hay prueba gratis?"
                answer="Sí, 30 días completamente gratis sin tarjeta de crédito. Luego: $29/mes para consultorio pequeño, $79/mes para clínicas con múltiples doctores. Cancela cuando quieras."
              />
              <FAQItem
                question="¿Qué idiomas soporta Servy?"
                answer="Actualmente español (perfecto para Latinoamérica). Estamos trabajando en inglés y portugués próximamente."
              />
              <FAQItem
                question="¿Se sincroniza realmente con Google Calendar?"
                answer="Sí, perfectamente. Servy verifica tu disponibilidad en Google Calendar en tiempo real. Nunca confirma una cita que no hay espacio. También bloquea automáticamente los horarios que marcas como 'no disponible'."
              />
              <FAQItem
                question="¿Qué pasa si se cae Servy o pierdo la conexión?"
                answer="Si Servy se desconecta, vuelves a ver el código QR en el dashboard. Escaneas de nuevo y está conectado. Tu historial de citas y conversaciones siempre está guardado."
              />
              <FAQItem
                question="¿Puedo tener múltiples números de WhatsApp?"
                answer="En el plan Clínica ($79/mes) sí. Perfecto si tienes una clínica grande con recepción principal + especialistas con sus propios números."
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

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-left font-semibold text-white text-lg">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#25D366] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
      {open && (
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <p className="text-slate-400 leading-relaxed">{answer}</p>
        </div>
      )}
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
