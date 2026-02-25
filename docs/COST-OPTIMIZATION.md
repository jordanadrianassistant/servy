# 💰 Cost Optimization — OpenClaw + Servy

## The Problem

Adrian is running **Claude Opus 4.6** via OpenRouter as his default model.
This is the most expensive model available:

| Model | Input $/M tokens | Output $/M tokens | Relative Cost |
|-------|------------------|--------------------|---------------|
| **Claude Opus 4.6** (current) | $5.00 | $25.00 | 🔴 1x (baseline) |
| Claude Sonnet 4.6 | $3.00 | $15.00 | 🟡 0.6x |
| GPT-4.1 | $2.00 | $8.00 | 🟢 0.32x |
| Gemini 3 Pro | $2.00 | $12.00 | 🟡 0.48x |
| GPT-4.1 Mini | $0.40 | $1.60 | 🟢 0.064x |
| Gemini 3 Flash | $0.50 | $3.00 | 🟢 0.12x |
| DeepSeek V3 | $0.19 | $0.87 | 🟢 0.035x |
| GPT-4.1 Nano | $0.10 | $0.40 | 🟢 0.016x |

## Recommendation: Switch OpenClaw to Sonnet 4.6

**Claude Sonnet 4.6** is the sweet spot for an AI assistant:
- Nearly as capable as Opus for coding, conversations, and tool use
- **40% cheaper** on input, **40% cheaper** on output
- Same 1M context window
- Still Anthropic quality

### How to switch:

```bash
openclaw models set openrouter/anthropic/claude-sonnet-4.6
```

Or edit `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-sonnet-4.6"
      }
    }
  }
}
```

### Estimated savings for Adrian:
- Tonight's session used ~360K input tokens + heavy output
- At Opus: ~$1.80 input + ~$4.00 output = **~$5.80**
- At Sonnet: ~$1.08 input + ~$2.40 output = **~$3.48** (40% saved)
- At GPT-4.1: ~$0.72 input + ~$1.28 output = **~$2.00** (65% saved)

## For Servy's AI Brain (patient-facing)

The patient WhatsApp conversations should use the **cheapest capable model**, not Opus.

Current: `gpt-4o-mini` in ai.ts — this is already good! But we can go cheaper:

| Model | Cost per avg conversation (10 msgs) | Quality |
|-------|-------------------------------------|---------|
| GPT-4o-mini | ~$0.003 | ✅ Great |
| GPT-4.1 Mini | ~$0.002 | ✅ Great |
| GPT-4.1 Nano | ~$0.0005 | ✅ Good for simple booking |
| DeepSeek V3 | ~$0.001 | ✅ Good |
| Gemini 3 Flash | ~$0.003 | ✅ Great |

**Recommendation:** Switch to `gpt-4.1-mini` — newer, cheaper, better than 4o-mini.

## Summary

| What | Current | Recommended | Savings |
|------|---------|-------------|---------|
| OpenClaw (Jordan) | Claude Opus 4.6 | Claude Sonnet 4.6 | ~40% |
| Servy AI (patients) | GPT-4o-mini | GPT-4.1-mini | ~30% |
| Combined monthly est. | ~$50-80/mo active use | ~$25-40/mo | **~50%** |
