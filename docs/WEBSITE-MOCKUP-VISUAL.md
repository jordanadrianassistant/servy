# Servy Website Redesign - Visual Mockup

> This is a detailed text-based mockup. Review, approve, or request changes before we code.

---

## 🎨 COLOR PALETTE

### Primary Colors
- **Background:** `#FFFFF5` (Warm beige)
- **Card/White:** `#FFFFFF` (Pure white)
- **Text:** `#111115` (Near-black)
- **Accent:** `#F1C1F3` (Pastel pink) — PRIMARY HIGHLIGHT
- **Muted:** `#6E6E73` (Medium grey for secondary text)

### Brand Colors
- **Sage:** `#ACCDB5` (Green) — Success, checkmarks
- **Lavender:** `#BBCAF0` (Blue) — Info, features
- **Pink:** `#F1C1F3` (Pink) — Accent, highlights
- **Amber:** `#F2B457` (Orange/Gold) — Warnings, CTAs

---

## 📱 NAVIGATION BAR

```
┌─────────────────────────────────────────────────────────────┐
│  [S] Servy           [How It Works] [Features] [Pricing]     │
│                                    [Sign In] [Start Free →]  │
└─────────────────────────────────────────────────────────────┘

Colors:
- Background: #FFFFFF (white card)
- Logo: Black + Pink accent on "S"
- Links: Grey (#6E6E73) hover → Black
- "Start Free" button: Pink background (#F1C1F3), black text, bold
```

---

## 🎯 HERO SECTION

```
┌──────────────────────────────────────────────────────────────┐
│ Background: #FFFFF5 (warm beige)                             │
│                                                              │
│ [Brand Gradient Strip at top: Amber → Pink → Lavender →     │
│  Sage green, 6px tall]                                       │
│                                                              │
│ LAYOUT: 2-column on desktop                                  │
│ LEFT COLUMN:                                                 │
│                                                              │
│ Badge: ┌─────────────────────────────┐                      │
│        │ ✓ Asistente IA para WhatsApp│                      │
│        └─────────────────────────────┘                      │
│        (Light pink bg, pink text, small)                    │
│                                                              │
│ HEADLINE:                                                    │
│ "Recupera tu tiempo."                                       │
│ "Aumenta tus ingresos."                                     │
│ (First line: black, second line: PINK gradient)             │
│ (Large: 48px → 64px on desktop)                             │
│                                                              │
│ SUBHEADING:                                                  │
│ "¿Cuántas horas al día pierdes respondiendo chats?"         │
│ "Servy es tu asistente de IA que maneja todo por           │
│ WhatsApp 24/7 — mientras tú atiendes más pacientes y       │
│ ganas más dinero."                                          │
│ (Grey text, ~18px, max-width: 500px)                        │
│                                                              │
│ CTA BUTTONS:                                                │
│ [Comenzar Gratis →] [Ver Demo]                              │
│ (Primary: Pink bg, bold, h-12 tall)                         │
│ (Secondary: White bg with border, black text)              │
│                                                              │
│ TRUST BADGES:                                                │
│ ✓ 30 USD/mes  |  ✓ Setup 5 min  |  ✓ Cancela gratis       │
│ (Small green checkmarks, grey text)                         │
│                                                              │
│ RIGHT COLUMN (Desktop only):                                │
│ ┌────────────────────────────────────┐                      │
│ │                                    │                      │
│ │  [WHATSAPP CONVERSATION ANIMATION] │                      │
│ │                                    │                      │
│ │  (Keep current typing animation)   │                      │
│ │  Messages appearing one by one     │                      │
│ │  with realistic WhatsApp styling   │                      │
│ │  Green bubbles (Servy) + Grey      │                      │
│ │  bubbles (patient)                 │                      │
│ │                                    │                      │
│ │  Example flow:                     │                      │
│ │  Patient: "¿Tienes cita libre mañana 14:00?" │
│ │  Servy: "Sí, disponible ✓"        │                      │
│ │  Servy: "¿A nombre de quién?"      │                      │
│ │  Patient: "María García"           │                      │
│ │  Servy: "¡Cita agendada! ✓✓"       │                      │
│ │                                    │                      │
│ │  (Loop animation - restart after   │                      │
│ │   3 seconds, smooth typewriter     │                      │
│ │   effect on each message)          │                      │
│ │                                    │                      │
│ └────────────────────────────────────┘                      │
│                                                              │
│ ✦ Subtle confetti squares in background (30-40% opacity)   │
│   - Orange square (top-right, rotated 12°)                 │
│   - Pink square (middle-right, rotated -6°)                │
│   - Lavender square (bottom-left, rotated 15°)             │
│   - Sage square (top-middle, rotated -12°)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**IMPORTANT:** WhatsApp conversation animation stays as-is. We'll:
- Move it to the right column on desktop (2-column layout)
- Stack it below text on mobile
- Keep the typing animation and message flow
- Update styling to match warm beige + pink design system
- Loops continuously with smooth transitions

---

## ⭐ FEATURES SECTION (4 Feature Cards)

```
┌──────────────────────────────────────────────────────────────┐
│ Section Title: "¿Cómo funciona Servy?"                       │
│ Subtitle: "Todo lo que necesitas para atender mejor"         │
│ (Grey subtitle text)                                         │
│                                                              │
│ [Card 1] ┌────────────────┐  [Card 2] ┌────────────────┐  │
│          │ [PixelIcon]    │           │ [PixelIcon]    │  │
│          │ 24/7 WhatsApp  │           │ Agenda Citas   │  │
│          │ Responde       │           │ Automático     │  │
│          │ mensajes       │           │ Google         │  │
│          │ automáticamente│           │ Calendar       │  │
│          │ sin parar.     │           │ integrado.     │  │
│          └────────────────┘           └────────────────┘  │
│ [Card 3] ┌────────────────┐  [Card 4] ┌────────────────┐  │
│          │ [PixelIcon]    │           │ [PixelIcon]    │  │
│          │ Dashboard      │           │ Recordatorios  │  │
│          │ Limpio y       │           │ Automáticos    │  │
│          │ simple para    │           │ 24h y 1h       │  │
│          │ monitorear.    │           │ antes de cita. │  │
│          └────────────────┘           └────────────────┘  │
│                                                              │
│ Cards layout: 2x2 on desktop, 1x4 on mobile               │
│ Card style: Pink tint background, pink border              │
│             (bg-brand-pink-lightest border-brand-pink)     │
│ PixelIcon: 5x5 grid pixel art (pink dots)                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎬 HOW IT WORKS SECTION (3 Steps)

```
┌──────────────────────────────────────────────────────────────┐
│ Section Title: "3 Pasos Simples"                             │
│ Subtitle: "Empieza en 5 minutos"                             │
│                                                              │
│ STEP 1:                    STEP 2:              STEP 3:     │
│ ┌──────────────┐          ┌──────────────┐     ┌──────────────┐
│ │ [Number: 1]  │    →     │ [Number: 2]  │  →  │ [Number: 3]  │
│ │ (Circle)     │          │ (Circle)     │     │ (Circle)     │
│ │              │          │              │     │              │
│ │ Conecta tu   │          │ Configura    │     │ ¡Listo!      │
│ │ WhatsApp     │          │ disponibilid.│     │ Empieza a    │
│ │ y Google     │          │ y servicios  │     │ ganar        │
│ │ Calendar     │          │              │     │              │
│ └──────────────┘          └──────────────┘     └──────────────┘
│                                                              │
│ Step circles: Lavender (#BBCAF0) or Pink (#F1C1F3)         │
│ Arrows: Pink, thick lines                                    │
│ Text: Dark grey, centered below each step                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 DASHBOARD PREVIEW SECTION

```
┌──────────────────────────────────────────────────────────────┐
│ Section Title: "Tu Panel de Control"                         │
│ Subtitle: "Dashboard limpio y poderoso"                      │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Mockup of dashboard screenshot]                        │ │
│ │                                                          │ │
│ │  [Sidebar - dark]  [Main content - white]              │ │
│ │  - Dashboard       ┌──────────────────────────────┐    │ │
│ │  - Citas           │ Citas de hoy                 │    │ │
│ │  - Conversaciones  │ ┌────────────────────────────┤    │ │
│ │  - Configuración   │ │ María García - 2:00 PM    │    │ │
│ │                    │ │ Juan López - 3:30 PM      │    │ │
│ │                    │ │ ...                       │    │ │
│ │                    │ └────────────────────────────┤    │ │
│ │                    │ Conversaciones recientes    │    │ │
│ │                    │ [Chat bubbles preview]      │    │ │
│ │                    └──────────────────────────────┘    │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ (Screenshot or high-fidelity mockup showing actual app)     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ❓ FAQ SECTION (5-7 Questions)

```
┌──────────────────────────────────────────────────────────────┐
│ Section Title: "Preguntas Frecuentes"                        │
│                                                              │
│ [Accordion 1] ┌────────────────────────────────────────────┐│
│               │ ¿Cómo conecta Servy con mi WhatsApp?    [+]││
│               └────────────────────────────────────────────┘│
│ [Accordion 2] ┌────────────────────────────────────────────┐│
│               │ ¿Es seguro compartir datos con Servy?   [+]││
│               └────────────────────────────────────────────┘│
│ [Accordion 3] ┌────────────────────────────────────────────┐│
│               │ ¿Puedo personalizar las respuestas?     [+]││
│               └────────────────────────────────────────────┘│
│ [Accordion 4] ┌────────────────────────────────────────────┐│
│               │ ¿Cuánto cuesta? ¿Hay prueba gratis?     [+]││
│               ├────────────────────────────────────────────┤│
│               │ Sí, 30 días gratis sin tarjeta de crédito││
│               └────────────────────────────────────────────┘│
│ [Accordion 5] ┌────────────────────────────────────────────┐│
│               │ ¿Qué idiomas soporta?                  [+]││
│               └────────────────────────────────────────────┘│
│                                                              │
│ Accordion style: White bg, border, pink accent on active   │
│ Plus/Minus icons instead of chevrons                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 💰 PRICING SECTION

```
┌──────────────────────────────────────────────────────────────┐
│ Section Title: "Planes Simples"                              │
│ Subtitle: "Sin sorpresas, cancela cuando quieras"            │
│                                                              │
│ [Plan 1: STARTER]      [Plan 2: PROFESSIONAL] [Plan 3: PRO]│
│ ┌──────────────────┐   ┌──────────────────┐   ┌────────────┐│
│ │ $29/mes          │   │ $79/mes ★★★      │   │ $199/mes   ││
│ │                  │   │ (RECOMMENDED)    │   │            ││
│ │ ✓ 1 clínica      │   │ ✓ Hasta 5 clín.  │   │ ✓ Ilimitadas
│ │ ✓ WhatsApp 24/7  │   │ ✓ WhatsApp 24/7  │   │ ✓ All +    │
│ │ ✓ Calendarios    │   │ ✓ Calendarios    │   │ ✓ Soporte  │
│ │ ✓ 100 citas/mes  │   │ ✓ 500 citas/mes  │   │ ✓ API      │
│ │                  │   │ ✓ Priority       │   │            │
│ │                  │   │                  │   │            │
│ │ [Empezar]        │   │ [Empezar] ←PINK  │   │ [Contactar]│
│ │ (outlined)       │   │ (pink bg)        │   │ (outlined) │
│ └──────────────────┘   └──────────────────┘   └────────────┘│
│                                                              │
│ Plan 2 highlighted: Pink bg, slight scale, "Recommended"   │
│ Checkmarks: Green (sage) color                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 FINAL CTA SECTION

```
┌──────────────────────────────────────────────────────────────┐
│ Background: Pink (#F1C1F3) gradient or tinted               │
│                                                              │
│ Headline: "¿Listo para transformar tu clínica?"             │
│ Subheading: "Empieza tu prueba gratis hoy — sin tarjeta"    │
│                                                              │
│ [Comenzar Ahora →]                                           │
│ (White button on pink background, bold, h-12)              │
│                                                              │
│ Small text below: "30 días gratis. Cancela cuando quieras"  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🦶 FOOTER

```
┌──────────────────────────────────────────────────────────────┐
│ Background: #FFFFFF (white card on warm beige)              │
│ Text: Grey (#6E6E73)                                        │
│                                                              │
│ [Servy Logo] | © 2025 Servy. All rights reserved.           │
│                                                              │
│ [Links: Privacy | Terms | Support | Blog]                  │
│                                                              │
│ [Social icons: Instagram, LinkedIn, Twitter]               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📐 LAYOUT SPECIFICATIONS

### Desktop (1024px+)
- Features: 2x2 grid (4 cards)
- Steps: 3 horizontal (with arrows)
- Pricing: 3 columns side-by-side
- Dashboard: Full width with padding
- Hero: 2-column (left text, right accent area with confetti)

### Tablet (768px - 1023px)
- Features: 1x4 grid (stacked vertically)
- Steps: Still 3 horizontal but more compact
- Pricing: 1 main card + 2 side cards (carousel-friendly)
- Dashboard: Full width, slightly reduced height
- Hero: Single column, centered text

### Mobile (< 768px)
- Features: Stack vertically (1x4)
- Steps: Stack vertically with chevrons (not horizontal arrows)
- Pricing: Carousel or stacked cards
- Dashboard: Full width, vertical mockup
- Hero: Text-focused, smaller confetti

---

## 🎨 DESIGN TOKENS SUMMARY

| Element | Color | Style |
|---------|-------|-------|
| Background | #FFFFF5 | Warm beige |
| Cards | #FFFFFF | White, border #D7D7DA |
| Text (primary) | #111115 | Dark near-black |
| Text (secondary) | #6E6E73 | Medium grey |
| Accent (CTA) | #F1C1F3 | Pastel pink |
| Feature cards bg | #F1C1F3 @ 10% | Light pink |
| Feature cards border | #F1C1F3 @ 20% | Pink border |
| Success/checkmarks | #ACCDB5 | Sage green |
| Buttons | Bold 700 weight | h-12 (48px tall) |
| Border radius | 8-12px | Slightly rounded |

---

## 🎬 ANIMATIONS

- **Hero entrance:** Fade in + slide up (0s)
- **Feature cards:** Stagger fade up (0s delay, then +0.1s each)
- **Dashboard:** Fade in + slight scale (0.3s delay)
- **Steps:** Slide in from left/right alternating (0.4s delay)
- **Confetti squares:** Static (no animation, just decorative)
- **Button hover:** Slight scale (1.05x), shadow increase
- **CTA section fade:** Fade in (0.5s delay)

---

## ✅ REVIEW CHECKLIST

Before we build, please confirm:

- [ ] Color palette approved? (Warm beige bg + pink accents)
- [ ] Hero section layout & copy okay?
- [ ] Feature cards arrangement correct?
- [ ] "How It Works" steps clear?
- [ ] Dashboard mockup approach good?
- [ ] Pricing tiers look right?
- [ ] FAQ structure okay?
- [ ] Final CTA section strong?
- [ ] Mobile layout makes sense?
- [ ] Any sections to add/remove?
- [ ] Any copy changes before we build?

---

## Next Steps

Once you approve this mockup:
1. ✅ I'll code Phase 1 (CSS with design system)
2. ✅ Build Phase 2 (Landing page HTML/JSX)
3. ✅ Add Phase 3 (Mockup images/icons)
4. ✅ Finalize Phase 4 (Copy polish)
5. ✅ Deploy Phase 5 (GitHub push → Vercel live)

**Questions or changes needed before we build?**

