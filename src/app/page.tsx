"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFFFF5] text-[#111115] overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D7D7DA]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#111115] to-[#111115] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-xl font-bold text-[#111115]">Servy</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#6E6E73] hover:text-[#111115]">Características</a>
            <a href="#pricing" className="text-sm text-[#6E6E73] hover:text-[#111115]">Precios</a>
            <a href="#faq" className="text-sm text-[#6E6E73] hover:text-[#111115]">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-[#6E6E73] hover:text-[#111115]">Iniciar Sesión</Link>
            <Link href="/register" className="text-sm font-bold bg-[#F1C1F3] text-[#111115] px-4 py-2 rounded-lg hover:bg-[#F1C1F3]/90">
              Empezar Gratis
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 pb-20">
          {/* Brand gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F2B457] via-[#F1C1F3] via-[#BBCAF0] to-[#ACCDB5]" />

          {/* Confetti squares */}
          <div className="absolute top-1/4 right-20 w-3 h-3 bg-[#F2B457] rounded opacity-40 rotate-12" />
          <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-[#F1C1F3] rounded opacity-40 -rotate-6" />
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#BBCAF0] rounded opacity-40 rotate-[15deg]" />
          <div className="absolute top-20 right-1/4 w-2 h-2 bg-[#ACCDB5] rounded opacity-50 -rotate-12" />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-[#F1C1F3]/20 border border-[#F1C1F3]/50 text-[#111115] text-sm font-medium px-4 py-2 rounded-full mb-8">
                  <span className="w-2 h-2 bg-[#ACCDB5] rounded-full" />
                  Asistente IA para WhatsApp
                </div>

                <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 text-[#111115]">
                  Recupera tu tiempo.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1C1F3] to-[#ACCDB5]">
                    Aumenta tus ingresos.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-[#6E6E73] mb-10 max-w-lg leading-relaxed">
                  ¿Cuántas horas al día pierdes respondiendo chats y agendando citas? 
                  Servy es tu asistente de IA que maneja todo por WhatsApp 24/7 — 
                  mientras tú atiendes más pacientes y ganas más dinero.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center bg-[#F1C1F3] text-[#111115] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#F1C1F3]/90 transition-all h-12"
                  >
                    Comenzar Gratis →
                  </Link>
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center border-2 border-[#D7D7DA] text-[#111115] font-bold px-8 py-3 rounded-lg text-lg hover:border-[#F1C1F3] hover:bg-[#F1C1F3]/5 transition-all"
                  >
                    Ver Demo
                  </a>
                </div>

                <div className="flex items-center gap-6 text-sm text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#ACCDB5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    30 USD/mes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#ACCDB5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Setup 5 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#ACCDB5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Cancela gratis
                  </span>
                </div>
              </div>

              {/* Right: WhatsApp Animation (KEPT FROM ORIGINAL) */}
              <div className="relative animate-float">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D7D7DA]">
                  {/* Chat header */}
                  <div className="bg-[#F1C1F3]/10 px-4 py-3 flex items-center gap-3 border-b border-[#D7D7DA]">
                    <div className="w-2 h-2 bg-[#ACCDB5] rounded-full" />
                    <div className="w-10 h-10 bg-gradient-to-br from-[#BBCAF0] to-[#F1C1F3] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <div className="flex-1">
                      <p className="text-[#111115] text-sm font-medium">Clínica Dental Sonrisa</p>
                      <p className="text-[#ACCDB5] text-xs">en línea</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[380px] bg-[#FFFFF5]">
                    {/* Patient message */}
                    <div className="chat-bubble flex justify-end">
                      <div className="bg-[#ACCDB5] text-white px-4 py-2 rounded-xl rounded-tr-sm max-w-[75%]">
                        <p className="text-sm leading-relaxed">
                          Hola! Quisiera agendar una cita para limpieza dental 🦷
                        </p>
                        <p className="text-xs text-white/60 text-right mt-1">10:23 AM</p>
                      </div>
                    </div>

                    {/* Bot response */}
                    <div className="chat-bubble flex justify-start">
                      <div className="bg-white text-[#111115] px-4 py-2 rounded-xl rounded-tl-sm max-w-[80%] border border-[#D7D7DA]">
                        <p className="text-sm leading-relaxed mb-2">
                          ¡Hola! 👋 Con gusto te ayudo. Tenemos disponibilidad mañana miércoles:
                        </p>
                        <div className="bg-[#F1C1F3]/10 rounded-lg px-3 py-2 space-y-1">
                          <p className="text-xs text-[#ACCDB5] font-medium">🕐 09:00 AM</p>
                          <p className="text-xs text-[#ACCDB5] font-medium">🕐 11:30 AM</p>
                          <p className="text-xs text-[#ACCDB5] font-medium">🕐 02:00 PM</p>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed">¿Cuál horario te queda mejor?</p>
                        <p className="text-xs text-[#6E6E73] text-right mt-1">10:23 AM</p>
                      </div>
                    </div>

                    {/* Patient reply */}
                    <div className="chat-bubble flex justify-end">
                      <div className="bg-[#ACCDB5] text-white px-4 py-2 rounded-xl rounded-tr-sm max-w-[75%]">
                        <p className="text-sm leading-relaxed">A las 11:30! Mi nombre es María López</p>
                        <p className="text-xs text-white/60 text-right mt-1">10:24 AM</p>
                      </div>
                    </div>

                    {/* Bot confirms */}
                    <div className="chat-bubble flex justify-start">
                      <div className="bg-white text-[#111115] px-4 py-2 rounded-xl rounded-tl-sm max-w-[80%] border border-[#D7D7DA]">
                        <p className="text-sm leading-relaxed mb-2">
                          ¡Perfecto María! Tu cita queda confirmada ✅
                        </p>
                        <div className="bg-[#ACCDB5]/10 rounded-lg px-3 py-2 space-y-0.5 text-xs">
                          <p>📅 Miércoles 26 de febrero</p>
                          <p>🕐 11:30 AM</p>
                          <p>🦷 Limpieza Dental</p>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed">
                          Te enviaré un recordatorio mañana. ¡Te esperamos! 😊
                        </p>
                        <p className="text-xs text-[#6E6E73] text-right mt-1">10:24 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#F1C1F3]/5 px-3 py-3 flex items-center gap-2 border-t border-[#D7D7DA]">
                    <div className="flex-1 bg-[#F5F4EE] rounded-full px-4 py-2">
                      <p className="text-[#6E6E73] text-sm">Mensaje</p>
                    </div>
                    <div className="w-10 h-10 bg-[#ACCDB5] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ACCDB5]/90">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 bg-white shadow-xl rounded-2xl px-4 py-3 border border-[#D7D7DA] float-delayed">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <div>
                      <p className="text-xs font-medium text-[#6E6E73]">Respuesta en</p>
                      <p className="text-sm font-bold text-[#ACCDB5]">&lt; 3 segundos</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white shadow-xl rounded-2xl px-4 py-3 border border-[#D7D7DA] float">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="text-xs font-medium text-[#6E6E73]">Cita agendada</p>
                      <p className="text-sm font-bold text-[#ACCDB5]">Automáticamente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#ACCDB5] text-sm font-semibold uppercase tracking-widest mb-3">Características</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111115] mb-4">
                Todo lo que necesitas para atender mejor
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon="⏰"
                title="24/7 WhatsApp"
                description="Responde mensajes automáticamente sin parar"
              />
              <FeatureCard
                icon="📅"
                title="Agenda Automática"
                description="Se sincroniza con Google Calendar, sin dobles"
              />
              <FeatureCard
                icon="🔔"
                title="Recordatorios"
                description="24h y 1h antes de cada cita. Reduce no-shows"
              />
              <FeatureCard
                icon="📊"
                title="Dashboard"
                description="Panel limpio para ver citas y conversaciones"
              />
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-20 bg-[#FFFFF5]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#ACCDB5] text-sm font-semibold uppercase tracking-widest mb-3">Precios</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#111115] mb-4">
                Simple y transparente
              </h2>
              <p className="text-lg text-[#6E6E73]">Empieza gratis. Escala cuando estés listo.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                name="Starter"
                price="Gratis"
                features={["50 mensajes/mes", "1 servicio", "Dashboard básico"]}
                highlighted={false}
              />
              <PricingCard
                name="Pro"
                price="$29/mes"
                features={["Mensajes ilimitados", "Servicios ilimitados", "Google Calendar sync", "Soporte prioritario"]}
                highlighted={true}
              />
              <PricingCard
                name="Clínica"
                price="$79/mes"
                features={["Todo en Pro", "Múltiples doctores", "Analytics avanzados", "API access"]}
                highlighted={false}
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#111115] mb-6">
              ¿Listo para dejar de perder pacientes?
            </h2>
            <p className="text-lg text-[#6E6E73] mb-10 max-w-lg mx-auto">
              Únete a los profesionales de salud que ya automatizan su atención con Servy.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[#F1C1F3] text-[#111115] font-bold px-10 py-4 rounded-lg text-lg hover:bg-[#F1C1F3]/90 transition-all h-12"
            >
              Crear Mi Asistente Gratis →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFF5] border-t border-[#D7D7DA] py-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-[#6E6E73] text-sm">© 2026 Servy. Hecho con 💚 para profesionales de la salud.</p>
          <div className="flex gap-6 text-sm text-[#6E6E73]">
            <a href="#" className="hover:text-[#111115]">Privacidad</a>
            <a href="#" className="hover:text-[#111115]">Términos</a>
            <a href="#" className="hover:text-[#111115]">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-[#F1C1F3]/10 border border-[#F1C1F3]/50 rounded-lg p-6 hover:border-[#F1C1F3] hover:bg-[#F1C1F3]/20 transition-all">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-[#111115] mb-2">{title}</h3>
      <p className="text-[#6E6E73] text-sm">{description}</p>
    </div>
  );
}

function PricingCard({ name, price, features, highlighted }: any) {
  return (
    <div className={`rounded-lg p-8 border-2 transition-all ${
      highlighted
        ? "bg-[#F1C1F3]/10 border-[#F1C1F3] shadow-lg"
        : "bg-white border-[#D7D7DA] hover:border-[#F1C1F3]"
    }`}>
      <p className="text-sm font-medium text-[#6E6E73] mb-2">{name}</p>
      <p className="text-4xl font-bold text-[#111115] mb-6">{price}</p>
      <ul className="space-y-3 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[#111115]">
            <svg className="w-4 h-4 text-[#ACCDB5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`block text-center py-3 rounded-lg font-bold text-sm transition-all ${
          highlighted
            ? "bg-[#F1C1F3] text-[#111115] hover:bg-[#F1C1F3]/90"
            : "border border-[#D7D7DA] text-[#111115] hover:border-[#F1C1F3] hover:bg-[#F1C1F3]/5"
        }`}
      >
        Empezar Gratis
      </Link>
    </div>
  );
}
