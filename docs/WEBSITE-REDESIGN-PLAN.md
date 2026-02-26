# Servy Website Redesign Plan

## Overview
Adrian wants to improve the Servy landing page and website using:
1. **Design System** from Talkpush (~/Downloads/DESIGN_SYSTEM.md) — warm beige backgrounds, multi-chromatic palette, pink accents
2. **More product visuals** — dashboard screenshots, WhatsApp integration mockups, real feature flows
3. **Professional + warm tone** — not generic tech landing page
4. **Deploy to GitHub** so Vercel picks up latest version

## Current State
- **Current landing page:** `/Users/adriangomez/.openclaw/workspace/servy/src/app/page.tsx`
- **Design:** Green/white gradient theme (WhatsApp inspired)
- **Missing:** Product screenshots, real feature descriptions, visual hierarchy

## Design System Key Elements for Servy

### Colors (Apply to Servy)
- **Background:** Warm beige `#FFFFF5` (instead of current white)
- **Cards:** Pure white `#FFFFFF`
- **Primary:** Near-black `#111115` (instead of green)
- **Accent:** Pink `#F1C1F3` (key visual differentiator)
- **Brand palette:** Sage green, Lavender blue, Pink, Amber
- **Success/status:** Sage green `#ACCDB5`

### Components
- **Hero banner:** Warm beige + confetti squares + brand gradient strip
- **Stat cards:** Pink-tinted (`bg-brand-pink-lightest border-brand-pink-lighter`)
- **Buttons:** Bold font-weight (700), tall (`h-12`), pink accent for CTA
- **PixelIcon system:** 5x5 grid pixel art for feature icons
- **Sidebar:** Dark charcoal (for dashboard preview only)

### Typography
- **Body:** Polymath Text (medium 500 weight)
- **Nav/headings:** Space Grotesk
- **Headings:** Bold (700), -0.02em letter-spacing
- **Stat numbers:** `text-2xl font-extrabold`

## Implementation Phases

### Phase 1: Design System CSS Update ⏱️ ~30 min
**What:** Apply design system colors to `globals.css`
- Replace green theme with black/pink/pastel palette
- Add CSS variables for brand colors
- Add animation classes from design system

**Files to update:**
- `src/app/globals.css` — replace color variables

**Output:** Color system ready to use

---

### Phase 2: Landing Page Redesign ⏱️ ~2 hours
**What:** Rewrite `/src/app/page.tsx` with new design

**Sections to include:**
1. **Navigation** — Black logo, Links, Sign in / Start free
2. **Hero Banner** — Warm beige background, confetti squares, brand gradient strip
3. **Hero Copy** — Better headline, subheading, CTAs
4. **Feature Cards** — 3-4 key features with PixelIcons (appointment booking, 24/7 WhatsApp, calendar sync, customer dashboard)
5. **How It Works** — Step-by-step visual (3-4 steps)
6. **Dashboard Preview** — Mockup/screenshot of actual product dashboard
7. **FAQ Section** — Common questions (5-7 Q&A)
8. **Pricing** — Simple 2-3 tier pricing table
9. **CTA Section** — Final call-to-action before footer
10. **Footer** — Links, copyright, contact

**Key patterns from design system:**
- Warm beige background `#FFFFF5`
- Stat cards use pink tint `bg-brand-pink-lightest border-brand-pink-lighter`
- Buttons: bold, tall (`h-12`), pink accent
- Hero banner: confetti squares, brand gradient strip
- Animation: stagger effects for cards

**Output:** Modern, warm, professional landing page

---

### Phase 3: Product Visuals & Screenshots ⏱️ ~1 hour
**What:** Create or add product mockups

**Options:**
1. **Dashboard screenshot** — Take actual Servy dashboard screenshot (if deployed)
2. **Mockup design** — Create simple figma-style mockup showing:
   - WhatsApp chat preview
   - Dashboard with appointments
   - Calendar integration
3. **Feature icons** — Use PixelIcon system or simple SVG icons

**For now:** Use placeholder descriptions with icon placeholders. Can update later with real screenshots.

**Output:** Visuals added to landing page HTML

---

### Phase 4: Content Updates ⏱️ ~1 hour
**What:** Rewrite all copy to be warmer, more personal

**Sections to improve:**
- Hero headline — More emotional, benefit-focused
- Feature descriptions — Real user problems + solutions
- Social proof — Customer testimonials or "companies using Servy"
- FAQ — Real customer questions (dental, dermatology, psychology clinics)

**Output:** Warmer, more professional copy

---

### Phase 5: GitHub Commit & Deploy ⏱️ ~15 min
**What:** Push all changes to GitHub so Vercel auto-deploys

**Steps:**
```bash
cd /Users/adriangomez/.openclaw/workspace/servy
git add .
git commit -m "🎨 Redesign: Apply design system, improve landing page visuals and copy"
git push origin main
```

**Output:** Live on Vercel within 1-2 minutes

---

## Detailed Task List

### PART 1: Design System CSS
- [ ] Add CSS variables for all brand colors to `globals.css`
- [ ] Update Tailwind configuration if needed
- [ ] Test colors render correctly

### PART 2: Landing Page Rewrite
- [ ] Update hero section (warm beige, confetti, gradient strip)
- [ ] Add 4-5 feature cards with icons
- [ ] Add "How It Works" section (3-4 steps with visuals)
- [ ] Add Dashboard preview mockup
- [ ] Add FAQ section
- [ ] Add Pricing section
- [ ] Add final CTA section
- [ ] Update footer

### PART 3: Content & Copy
- [ ] Rewrite hero headline
- [ ] Write feature descriptions
- [ ] Write FAQ answers
- [ ] Add social proof section (placeholder for testimonials)

### PART 4: Testing
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test animations/transitions
- [ ] Verify all links work
- [ ] Check forms/CTAs

### PART 5: Deploy
- [ ] Commit to GitHub
- [ ] Verify Vercel deployment
- [ ] Check live site

---

## Estimated Timeline
- **Phase 1 (CSS):** 30 min
- **Phase 2 (Redesign):** 2 hours
- **Phase 3 (Visuals):** 1 hour (or skip for now, add mockups later)
- **Phase 4 (Copy):** 1 hour
- **Phase 5 (Deploy):** 15 min

**Total: ~4.5-5 hours** (can be done today if focused)

---

## Next Steps

Adrian, do you want me to:

**Option A: Start now**
- I'll work on Phase 1-2 (CSS + landing page redesign)
- You can review and give feedback
- Then Phase 3-5 (content, deploy)

**Option B: Create mockups first**
- I'll create a Figma-style mockup of the new design
- You review and approve
- Then build the HTML/CSS

**Option C: Focus on specific sections first**
- What's the priority? (e.g., hero + features, or full page?)

**My recommendation:** Option A — start building now while we iterate. It's faster than mockup cycles.

Ready?

