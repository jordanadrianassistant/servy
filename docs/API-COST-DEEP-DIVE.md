# 💸 Servy — API Cost Deep Dive & Revenue Viability

## The Key Question
"Can Servy make money at $29/month when it needs to pay for AI API calls?"

**TL;DR: YES. Massive margins. Even a heavy user costs us less than $5/month in API calls.**

---

## How a Typical Conversation Works (Token Breakdown)

### System Prompt (sent once per conversation start)
- Business info, services, schedule, instructions: ~800 tokens
- This is cached after the first call (cache read = 90% cheaper)

### Per-Message Exchange
| Component | Input Tokens | Output Tokens |
|-----------|-------------|---------------|
| System prompt (cached) | 800 | — |
| Conversation history (grows) | 200-2,000 | — |
| User message | 20-50 | — |
| AI response | — | 50-150 |
| Tool call (if needed) | — | 50-100 |
| Tool result | 100-300 | — |
| Final response after tool | — | 80-200 |

### Average Full Booking Conversation (5-7 exchanges)

```
Patient: "Hola quiero una cita"                    → 15 tokens
AI: "¡Hola! ¿Qué servicio necesita?"               → 30 tokens out
Patient: "Limpieza dental, para mañana"             → 20 tokens
AI: [calls check_availability] → responds with slots → 120 tokens out
Patient: "A las 11:30, soy María López"             → 25 tokens
AI: [calls book_appointment] → confirms             → 150 tokens out
Patient: "Gracias!"                                 → 5 tokens
AI: "¡Con gusto! Te esperamos"                      → 20 tokens out
```

**Total for this conversation:**
- Input: ~3,500 tokens (system prompt + history + messages)
- Output: ~350 tokens (AI responses + tool calls)
- Tool calls: 2 (check_availability + book_appointment)

### Cost at GPT-4.1-mini ($0.40/M input, $1.60/M output)
- Input: 3,500 × $0.0000004 = $0.0014
- Output: 350 × $0.0000016 = $0.00056
- **Total: $0.002 per booking conversation** (less than a fifth of a cent!)

### Cost at GPT-4.1 ($2.00/M input, $8.00/M output)
- Input: 3,500 × $0.000002 = $0.007
- Output: 350 × $0.000008 = $0.0028
- **Total: $0.01 per booking conversation** (one cent!)

---

## Monthly Cost Scenarios (GPT-4.1-mini)

### Scenario 1: Small Dental Clinic
- 8 patients/day × 22 working days = 176 conversations/month
- Some are just "¿cuánto cuesta?" (shorter) = avg $0.0015/conversation
- **Monthly API cost: $0.26**
- **Revenue: $29.00**
- **Margin: 99.1%** 🟢

### Scenario 2: Busy Dermatologist
- 15 patients/day × 22 days = 330 conversations
- + 100 FAQ-only conversations
- 430 total × $0.002 average
- **Monthly API cost: $0.86**
- **Revenue: $29.00**
- **Margin: 97.0%** 🟢

### Scenario 3: Popular Multi-Doctor Clinic ($79 plan)
- 3 doctors × 20 patients/day × 22 days = 1,320 conversations
- + 300 FAQ conversations
- 1,620 total × $0.002 average
- **Monthly API cost: $3.24**
- **Revenue: $79.00**
- **Margin: 95.9%** 🟢

### Scenario 4: Extreme Edge Case
- 50 conversations/day × 30 days = 1,500 conversations
- Longer conversations (avg 15 messages) = $0.004 each
- **Monthly API cost: $6.00**
- **Revenue: $29.00**
- **Margin: 79.3%** 🟢 (still great!)

---

## Model Comparison for Servy AI Brain

| Model | Cost/conversation | Quality | Recommendation |
|-------|------------------:|---------|----------------|
| GPT-4.1-mini | $0.002 | ✅ Excellent | **Best choice for production** |
| GPT-4.1-nano | $0.0005 | ✅ Good | Use for simple FAQ responses |
| DeepSeek V3 | $0.001 | ✅ Good | Backup option, China-hosted |
| Gemini 3 Flash | $0.003 | ✅ Great | Google alternative |
| GPT-4.1 | $0.010 | ✅ Premium | Overkill for patient chat |
| Claude Sonnet 4.6 | $0.015 | ✅ Premium | Too expensive for this use case |

### Smart Routing Strategy (V2)
- **Simple questions** (price, hours, address) → GPT-4.1-nano ($0.0005)
- **Booking flow** (availability check, scheduling) → GPT-4.1-mini ($0.002)
- **Complex situations** (complaints, escalation) → GPT-4.1 ($0.01)
- **Average blended cost:** ~$0.0015/conversation

---

## Reminder Costs

Each reminder is a one-way message (no AI needed):
- Sent via WhatsApp (Baileys) = **$0.00** (free)
- Sent via WhatsApp Cloud API = **~$0.005** per message
- 2 reminders × 200 appointments/month = 400 reminders
- **Cost with Cloud API: $2.00/month per business**
- **Cost with Baileys: $0.00**

---

## Infrastructure Costs at Scale

### 100 Paying Users
| Item | Monthly Cost |
|------|------------:|
| Vercel Pro | $20 |
| Database (PlanetScale) | $29 |
| OpenAI API | $150 |
| Domain + misc | $10 |
| **Total** | **$209** |
| **Revenue (100 × $29)** | **$2,900** |
| **Net margin** | **92.8%** |

### 500 Paying Users
| Item | Monthly Cost |
|------|------------:|
| Vercel Pro | $20 |
| Database | $50 |
| OpenAI API | $750 |
| WhatsApp Cloud API | $500 |
| Support tools | $50 |
| **Total** | **$1,370** |
| **Revenue (500 × $32 avg)** | **$16,000** |
| **Net margin** | **91.4%** |

### 1,000 Paying Users
| Item | Monthly Cost |
|------|------------:|
| Infrastructure | $200 |
| Database | $100 |
| OpenAI API | $1,500 |
| WhatsApp Cloud API | $1,000 |
| Support/tools | $100 |
| **Total** | **$2,900** |
| **Revenue** | **$32,000** |
| **Net margin** | **90.9%** |

---

## Revenue Viability: VERDICT

### ✅ This is a highly viable business.

**Why:**
1. **API costs are negligible** — less than $1/user/month for most doctors
2. **Margins are 90%+** even at scale
3. **Break-even is 3 users** — achievable in Week 1
4. **No inventory, no physical product, no staff needed initially**
5. **Recurring revenue** — once a doctor relies on Servy, they don't switch
6. **The more conversations, the more value** — positive unit economics

### Key Insight
The real cost isn't AI APIs — it's **customer acquisition**. Focus budget on marketing and sales, not infrastructure. The product practically runs for free.

### Conservative Year 1 P&L

| | Monthly (Month 12) | Annual |
|-|-------------------:|-------:|
| Revenue (500 users) | $14,500 | $87,000* |
| COGS (API + infra) | $1,500 | $9,000 |
| **Gross Profit** | **$13,000** | **$78,000** |
| Marketing/Ads | $2,000 | $12,000 |
| Tools/subscriptions | $200 | $2,400 |
| **Net Profit** | **$10,800** | **$63,600** |

*Revenue ramps through the year, so annual is not 12 × month 12.

**Real estimate Year 1 total revenue: $52,000-65,000**
**Real estimate Year 1 net profit: $30,000-45,000**
