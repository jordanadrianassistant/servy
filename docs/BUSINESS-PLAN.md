# 🏥 Servy — Business Plan

## Executive Summary

**Servy** is an AI-powered WhatsApp assistant for healthcare professionals in Latin America. It automates patient communication — booking, rescheduling, cancellations, and FAQ responses — 24/7, while syncing with Google Calendar.

**Target Market:** Doctors, dentists, dermatologists, psychologists, and aesthetic clinics in Costa Rica, Mexico, Colombia, Guatemala, Honduras, and Panama.

**Problem:** Medical professionals in LATAM rely heavily on WhatsApp for patient communication. They lose patients when they can't respond quickly (during consultations, after hours, weekends). Hiring a receptionist costs $400-800/month. Most solo practitioners can't afford one.

**Solution:** An AI assistant that lives on their WhatsApp, responds instantly, books appointments, and costs a fraction of a human receptionist.

**Business Model:** SaaS subscription — Free tier for adoption, Pro at $29/month, Clínica at $79/month.

---

## Market Analysis

### TAM (Total Addressable Market)
- **Costa Rica:** ~6,500 dentists + ~15,000 doctors = ~21,500 professionals
- **Mexico:** ~130,000 dentists + ~300,000 doctors
- **Colombia:** ~60,000 dentists + ~100,000 doctors
- **Central America (GT, HN, SV, PA, NI):** ~50,000+ professionals
- **Total LATAM target:** ~660,000+ healthcare professionals

### SAM (Serviceable Addressable Market)
- Solo practitioners and small clinics (1-5 doctors) who use WhatsApp
- Estimated 40% of total = ~264,000 professionals
- At $29/month = **$91M ARR potential**

### SOM (Serviceable Obtainable Market — Year 1)
- Focus: Costa Rica + early Mexico/Colombia adopters
- Target: 500 paying users by end of Year 1
- Revenue: 500 × $29 = **$14,500/month = $174,000 ARR**

### Why Now?
1. WhatsApp penetration in LATAM is 95%+ among professionals
2. AI capabilities (GPT-4.1, Claude) are now good enough for natural Spanish conversations
3. No dominant player in this niche in LATAM
4. Post-COVID: patients expect digital booking, not phone calls
5. Cost of AI API calls has dropped 90% in the last 2 years

### Competition
| Competitor | Region | Weakness vs Servy |
|-----------|--------|-------------------|
| Doctoralia | Global | Expensive ($100+/mo), not WhatsApp-native |
| SimplyBook.me | Global | No WhatsApp, English-first |
| Calendly | Global | No WhatsApp, no AI, not healthcare-focused |
| Various chatbots | LATAM | Generic, not healthcare-specific, complex setup |

**Our moat:** WhatsApp-native + healthcare-specific AI + built for LATAM (Spanish, timezones, currencies, culture).

---

## Product

### MVP (Current — Built)
- ✅ Landing page (Spanish, professional)
- ✅ User registration + auth
- ✅ Business dashboard (stats, appointments, conversations)
- ✅ Service management (CRUD with pricing in local currency)
- ✅ Availability/schedule management
- ✅ WhatsApp integration (QR pairing, auto-reply)
- ✅ AI brain (books, cancels, checks availability, answers FAQs)
- ✅ Google Calendar sync (two-way: create events + block existing)
- ✅ Automated reminders (24h + 1h before appointment)
- ✅ Chat simulator for testing

### V2 (Next 3 months)
- Multi-doctor support per clinic
- Payment collection (Sinpe Móvil in CR, OXXO in MX, Nequi in CO)
- Patient profiles and history
- Analytics dashboard (no-show rates, busiest hours, revenue tracking)
- WhatsApp Cloud API (official, for scaling)
- Email/SMS fallback reminders
- Waiting list for full slots

### V3 (6-12 months)
- Multi-language support (Portuguese for Brazil)
- Telehealth integration
- Prescription reminders
- Insurance verification
- Mobile app for doctors
- API for third-party integrations

---

## Pricing Strategy

### Free (Starter)
- 50 AI messages/month
- 1 service
- Basic scheduling
- Dashboard
- **Purpose:** Get doctors to try it with zero risk

### Pro — $29/month
- Unlimited messages
- Unlimited services
- Google Calendar sync
- AI personality customization
- Automated reminders
- Priority support
- **Purpose:** Main revenue driver, solo practitioners

### Clínica — $79/month
- Everything in Pro
- Multiple doctors/schedules
- Multiple WhatsApp lines
- Advanced analytics
- API access
- Dedicated onboarding
- **Purpose:** Small clinics (2-5 doctors)

### Why $29?
- A receptionist in CR costs ₡250,000-400,000/month ($450-720 USD)
- Servy at $29 = **6% of hiring a person**
- It's a no-brainer ROI
- Low enough that a solo doctor doesn't need approval
- Competitive with global tools but priced for LATAM purchasing power

---

## Unit Economics & API Cost Analysis

### Cost Per Conversation (Patient ↔ AI)

Average conversation: ~10 messages, ~2,000 tokens input, ~1,500 tokens output per exchange

| Component | Tokens per conversation | Cost (GPT-4.1-mini) |
|-----------|------------------------|---------------------|
| System prompt | ~800 tokens | $0.00032 |
| Message history (10 msgs) | ~2,000 tokens | $0.00080 |
| AI responses (10) | ~1,500 tokens output | $0.00240 |
| Tool calls (availability check, booking) | ~500 tokens | $0.00100 |
| **Total per conversation** | ~4,800 tokens | **$0.0045** |

### Cost Per Doctor Per Month

| Scenario | Conversations/month | API Cost | Revenue | Gross Margin |
|----------|-------------------:|----------:|--------:|-------------:|
| Light user | 50 | $0.23 | $29.00 | **99.2%** |
| Normal user | 200 | $0.90 | $29.00 | **96.9%** |
| Heavy user | 500 | $2.25 | $29.00 | **92.2%** |
| Very heavy | 1,000 | $4.50 | $29.00 | **84.5%** |

### Other Costs Per User

| Cost | Monthly |
|------|--------:|
| AI API (avg 200 convos) | $0.90 |
| Hosting (Vercel Pro, amortized) | $0.40 |
| Database (PlanetScale/Supabase, amortized) | $0.20 |
| WhatsApp (Baileys = free / Cloud API ~$5) | $0-5.00 |
| **Total COGS per user** | **$1.50 - $6.50** |
| **Gross margin** | **77% - 95%** |

### Break-Even Analysis

| Expense | Monthly |
|---------|--------:|
| Hosting (Vercel Pro) | $20 |
| Database | $25 |
| Domain + Email | $5 |
| OpenAI API (base) | $20 |
| **Total fixed costs** | **$70** |
| **Break-even at $29/user** | **3 paying users** |

### Revenue Projections

| Month | Free Users | Paid Users | MRR | Cumulative |
|------:|----------:|-----------:|------:|-----------:|
| 1 | 10 | 2 | $58 | $58 |
| 2 | 25 | 5 | $145 | $203 |
| 3 | 50 | 15 | $435 | $638 |
| 4 | 80 | 30 | $870 | $1,508 |
| 5 | 120 | 50 | $1,450 | $2,958 |
| 6 | 180 | 80 | $2,320 | $5,278 |
| 9 | 400 | 180 | $5,220 | $16,938 |
| 12 | 800 | 500 | $14,500 | $52,000+ |

---

## Go-To-Market Strategy

### Phase 1: Costa Rica (Month 1-3)
1. **Direct outreach via WhatsApp** — message dentists/doctors with WhatsApp visible
2. **Instagram DMs** — target clinics with "WhatsApp ↓" in bio
3. **Free demos** — 5-minute video calls showing the product
4. **Dental association** — present at Colegio de Dentistas events
5. **Referral program** — 1 free month for every referral that converts

### Phase 2: Mexico + Colombia (Month 3-6)
1. **Facebook/Instagram ads** targeting medical professionals
2. **Content marketing** — "Cómo automatizar tu WhatsApp médico" blog posts
3. **Doctoralia integration** — appear in their marketplace
4. **Local partnerships** — medical supply companies, dental suppliers

### Phase 3: Scale (Month 6-12)
1. **Paid advertising** (Google, Meta) with proven CAC
2. **SEO** — rank for "asistente WhatsApp médico" etc.
3. **Conference presence** — medical tech events in LATAM
4. **Channel partners** — EHR/EMR integrations

### Customer Acquisition Cost (CAC) Target
- Phase 1 (direct outreach): **$0** (just time)
- Phase 2 (ads): Target **$50-80 CAC** (2-3 month payback)
- LTV at $29/mo with 12-month avg retention: **$348**
- LTV/CAC ratio target: **>4x**

---

## Team (Current)

- **Adrian Gomez** — Founder, Product, Business Development
- **Jordan (AI)** — Engineering, Product Development

### Hiring Plan
- Month 3: Part-time customer success (Spanish-speaking)
- Month 6: Full-time developer
- Month 9: Sales/growth hire for Mexico

---

## Key Metrics to Track

1. **MRR** (Monthly Recurring Revenue)
2. **Churn rate** (target < 5% monthly)
3. **Conversations per user** (engagement)
4. **Response accuracy** (AI quality)
5. **Time to first appointment** (onboarding speed)
6. **No-show rate** (validates reminder value)
7. **NPS** (Net Promoter Score)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| WhatsApp bans (Baileys) | High | Migrate to official Cloud API for production |
| AI hallucinations | Medium | Strict tool-calling, no free-form booking |
| LATAM payment friction | Medium | Support local methods (Sinpe, OXXO, Nequi) |
| Competition enters | Medium | Move fast, build relationships, niche down |
| Regulatory (health data) | Low-Medium | No medical data stored, just appointments |
| OpenAI price increase | Low | Multi-provider support, can switch models |

---

## 12-Month Financial Summary

| Metric | Month 1 | Month 6 | Month 12 |
|--------|--------:|--------:|---------:|
| Paying Users | 2 | 80 | 500 |
| MRR | $58 | $2,320 | $14,500 |
| ARR | $696 | $27,840 | $174,000 |
| Gross Margin | 95% | 92% | 90% |
| Monthly Costs | $70 | $250 | $1,500 |
| Monthly Profit | -$12 | $2,070 | $13,000 |

**Break-even: Month 1 (3 users)**
**Ramen profitability: Month 3 (15 users)**
**Real profitability: Month 6 (80 users)**
