# IMPLEMENTATION_PLAN_UPGRADE.md

> **Project:** Conversion landing page for an independent Dutch mortgage advisor (hypotheekadviseur)
> **Goal of this upgrade:** Fix the reviewer feedback — the current build looks *too "techy"* and shows *"AI slop"* tells. Move it to a **calm-premium**, trust-first aesthetic that matches how the financial-advisory niche actually looks (HB Wealth, Northwestern Mutual, Hoxton, GoldRepublic), while **keeping** the calculator and the free-resource (lead magnet) components.
> **Stack it targets:** Next.js + React + Tailwind + shadcn/ui, edited in Antigravity, deployed on Vercel.
> **Language:** This file is the executable spec — instructions are in English (for the coding agent). All **on-page copy is Dutch (NL)** because the site serves the Dutch market.

---

## 0. How to use this file in Antigravity

1. Open the project in Antigravity → start a **new chat** → drag this file in.
2. First message to the agent:
   > "Read IMPLEMENTATION_PLAN_UPGRADE.md fully. Do NOT change any code yet. Confirm you understand the global rules and the stack, then list the files you will touch. Wait for my approval before editing."
3. Approve, then have it implement **section by section** (Part 5), reviewing each before moving on.
4. After each section, check it against the **Definition of Done** (Part 8).

This staged flow is deliberate: it keeps the agent from regenerating the whole site (which is how "AI slop" creeps back in).

---

## 1. What stays, what changes

**KEEP (reviewer explicitly liked these — only restyle, do not rebuild logic):**
- The **mortgage calculator** component.
- The **free-resource / lead-magnet** component.

**CHANGE:**
- Overall **color & theme** → from techy to calm-premium (Part 4).
- **Typography** → distinctive serif display + clean sans body (Part 4). No Inter/Roboto/system fonts.
- **Hero** → remove the pill/badge (Part 5.1).
- **Card overuse** → replace most card grids with varied sections: image+text rows, a stat strip, a numbered process, a logo bar (Part 5).
- **Empty placeholders** → fill with real Dutch copy + real photography (Part 5, Part 7).

---

## 2. Global rules / guardrails (enforce in every section)

These encode the reviewer feedback + the design-quality bar. The agent must respect all of them.

1. **No hero pill/badge.** Do not place a rounded "pill" label above or around the H1 (e.g. a `rounded-full` "Gratis intake in 15 min" chip). Express trust with real signals instead (lender logos, rating, stats).
2. **Do not default to card grids.** A grid of identical `icon + title + text` cards is the #1 AI-slop tell. Use cards only where genuinely the best fit (max one section), and even then style them quietly. Prefer: alternating image+text rows, a numbered timeline, a stat strip, a logo row.
3. **No "techy" visual effects.** No glassmorphism, no neon/aurora/gradient-mesh glows, no spotlight/beam backgrounds, no animated 3D cards. These are exactly what made it read as techy. Depth comes from: warm off-white surfaces, hairline borders, soft low shadows, and generous whitespace — nothing more.
4. **Real images everywhere. No empty placeholders.** Every image slot must contain a real, contextually appropriate photo (people, a Dutch home, keys, a family at a kitchen table) with meaningful `alt` text. No grey boxes, no `lorem`, no empty `src`.
5. **One primary CTA, repeated.** The single action is *"Plan een gratis kennismaking"* (book a free intro). Secondary actions (phone, calculator) are visually subordinate.
6. **Restraint over flash.** This is refined minimalism. Elegance comes from spacing, type, and precision — not from adding effects. When in doubt, remove.
7. **Buttons are softly-rounded rectangles, never full pills.** `--radius: 0.5rem`. No `rounded-full` buttons.
8. **Accessibility & compliance kept.** Keep semantic HTML and shadcn's a11y. Calculator output must show an indicative-only disclaimer (AFM/Wft context — see 5.7).

---

## 3. Tech stack decision (final)

Chosen for a financial niche where **trust beats spectacle**. Discipline = pick a narrow, coherent set.

### Use (install / keep)
| Layer | Choice | Why |
|---|---|---|
| Component foundation | **shadcn/ui** | What the reviewer asked for. You own the components and style them to brand. Accessible, neutral, professional. |
| Theme generation | **Tweakcn** (tweakcn.com) | Visual theme editor that exports shadcn CSS variables. This is how we kill the "techy default" — we program the calm-premium palette here. |
| Ready clean sections | **21st.dev** (shadcn-native blocks) + **Tailwind Plus** (if licensed) | Restrained, non-generic hero/pricing/testimonial blocks that match shadcn. |
| Motion | **Motion** (`motion`, ex-Framer Motion) | Subtle only: one orchestrated load with staggered reveals + gentle scroll fades. A tool, not a look. |
| One tasteful accent | **Magic UI** (shadcn-compatible) | At most ONE element: a slow logo marquee OR a number counter on the stat strip. Nothing else. |

### Do NOT install (and why)
- **Aceternity UI, React Bits, Eldora UI, Animate UI** — these are the source of the "too techy / startup-SaaS" aesthetic. Wrong register for mortgage advice.
- **Hero UI, Chakra UI, Mantine, Ant Design** — alternative *foundations*; you pick **one** foundation (shadcn). Mixing = inconsistency. Ant Design also reads like an admin dashboard, not a premium landing page.
- **Svelte Animations, InspiraUI** — wrong framework (Svelte/Vue); project is React/Next.

### Install commands
```bash
# shadcn (if not already initialised)
npx shadcn@latest init

# components used by this plan
npx shadcn@latest add button input label textarea select accordion tabs dialog card form sonner slider separator badge

# motion + (optional) one magic-ui accent
npm i motion
# magic-ui components are added via their CLI/copy per their docs, only if you use the marquee/counter
```

---

## 4. Design system (calm premium)

### 4.1 Aesthetic direction
**Refined / luxury-restrained, editorial-trust.** Think private-bank brochure, not fintech app. Warm paper-white canvas, deep navy ink, a single muted-gold accent used sparingly, a characterful serif for headlines, a clean grotesque for body, and a mono for numbers (calculator/stats feel precise and premium).

### 4.2 Color tokens
Source of truth = hex below. **Generate the theme in Tweakcn** (input these values, export `globals.css` for your Tailwind version, replace the existing theme). This avoids HSL/oklch format mistakes across Tailwind v3/v4.

**Recommended — GOLD accent (default):**

| shadcn variable | Hex | Role |
|---|---|---|
| `--background` | `#FBFAF7` | warm paper off-white (the calm base — NOT stark white) |
| `--foreground` | `#14233A` | deep navy ink (body text) |
| `--card` | `#FFFFFF` | clean white cards on the off-white bg = subtle depth |
| `--card-foreground` | `#14233A` | |
| `--popover` / `--popover-foreground` | `#FFFFFF` / `#14233A` | |
| `--primary` | `#0B2545` | deep navy (primary buttons, header, footer) |
| `--primary-foreground` | `#FBFAF7` | off-white text on navy |
| `--secondary` | `#EEEAE0` | warm light surface |
| `--secondary-foreground` | `#0B2545` | |
| `--muted` | `#F2EFE8` | section tints |
| `--muted-foreground` | `#5A6B7B` | slate (sub-text) |
| `--accent` | `#B08A46` | muted antique gold — used sparingly (links, underlines, small icons, the word "gratis", focus ring) |
| `--accent-foreground` | `#14233A` | dark navy text on gold (white fails contrast on this gold) |
| `--border` | `#E5E0D4` | warm hairline |
| `--input` | `#E5E0D4` | |
| `--ring` | `#B08A46` | gold focus ring (subtle) |
| `--radius` | `0.5rem` | softly rounded, never pill |

**Alternative — MUTED GREEN accent (one-line swap):**
- `--accent: #4A6552` (muted forest/sage), `--accent-foreground: #FBFAF7` (white reads fine on this green), `--ring: #4A6552`.

**Usage discipline:** navy is the workhorse (buttons, structure). Gold/green is a *highlight only* — never large gold buttons, never gold backgrounds behind big areas. ~5% of the page, max.

### 4.3 Typography
Override shadcn's default sans. Load via `next/font` so it's fast and self-hosted.

```ts
// app/fonts.ts
import { Fraunces, Geist, IBM_Plex_Mono } from "next/font/google";

export const fontDisplay = Fraunces({          // headlines, hero
  subsets: ["latin"], variable: "--font-display", display: "swap",
});
export const fontSans = Geist({                 // body + UI  (Geist npm pkg also fine)
  subsets: ["latin"], variable: "--font-sans", display: "swap",
});
export const fontMono = IBM_Plex_Mono({         // numbers: calculator, stats
  subsets: ["latin"], weight: ["400","500"], variable: "--font-mono", display: "swap",
});
```
Apply the three `variable` classes on `<html>`/`<body>`, then in Tailwind map `fontFamily.display → var(--font-display)`, `sans → var(--font-sans)`, `mono → var(--font-mono)`. Headings use `font-display`; body uses `font-sans`; all monetary/numeric figures use `font-mono` with `tabular-nums`.

**Why these:** a warm serif display (Fraunces) signals establishment/trust; a clean grotesque body (Geist) is modern but not the overused Inter; mono figures make the calculator and stats feel precise and premium. This pairing alone removes most of the "generated" feeling.
*Conservative alternatives if Fraunces feels too characterful:* display → `Newsreader` or `Source Serif 4`. Do **not** fall back to Inter/Roboto.

### 4.4 Spacing, shadows, scale
- Generous vertical rhythm: section padding `py-20 md:py-28`. Whitespace is the premium signal.
- Shadows: soft and low only (`shadow-sm`, occasionally `shadow-md`). No hard or glowy shadows.
- Borders: 1px hairline using `--border`. Use hairlines to separate, not heavy boxes.
- Type scale (suggested): H1 `text-5xl md:text-6xl` (Fraunces, tight leading), H2 `text-3xl md:text-4xl`, body `text-base md:text-lg leading-relaxed`, small `text-sm`.
- Max content width ~`max-w-6xl`, centered, with comfortable gutters.

---

## 5. Section-by-section build plan

Order top-to-bottom. Each section lists **Goal · Source · DO · DON'T · Antigravity prompt**.
On-page copy is Dutch; swap to the client's real numbers/photos before delivery.

### 5.1 Header (sticky)
- **Goal:** quiet, trustworthy nav + persistent CTA.
- **Source:** shadcn (button); plain nav.
- **DO:** logo left; 4 nav links max (Diensten, Werkwijze, Reviews, Contact); a phone `tel:` link; one primary button "Plan een kennismaking". Slight background blur/solid on scroll is fine (subtle), but keep it opaque-ish and clean.
- **DON'T:** no pill-style active states as the hero badge; no glassy translucent nav.
- **Prompt:**
  > "Build a sticky header: logo left; nav (Diensten, Werkwijze, Reviews, Contact) with smooth-scroll to sections; a `tel:` phone link; one primary shadcn Button 'Plan een kennismaking'. Solid `--background` with a 1px bottom `--border` on scroll. Keep it minimal and calm. No pills."

### 5.2 Hero  *(remove the pill)*
- **Goal:** state the value in seconds, one CTA, real image, instant trust.
- **Source:** 21st.dev or Tailwind Plus hero block, restyled to tokens; Motion for a single staggered load.
- **DO:** left = H1 (Fraunces) + one-line subhead + primary CTA + a quiet secondary ("Bereken uw hypotheek" linking to the calculator). Right = a real photo (a couple/family in front of a Dutch home, or at a kitchen table with an advisor). One subtle staggered fade-in on load.
- **DON'T:** **no badge/pill above the H1.** No gradient/glow background. No 3D/spotlight.
- **Copy (NL):**
  - H1: *"Onafhankelijk hypotheekadvies dat bij u past"*
  - Sub: *"Persoonlijk advies van uw eigen hypotheekadviseur — helder, eerlijk en afgestemd op uw situatie."*
  - CTA: *"Plan een gratis kennismaking"* · secondary: *"Bereken uw maximale hypotheek →"*
- **Prompt:**
  > "Build a two-column hero. Left: H1 (font-display) 'Onafhankelijk hypotheekadvies dat bij u past', a one-line sub, a primary Button 'Plan een gratis kennismaking', and a quiet text link 'Bereken uw maximale hypotheek →' scrolling to the calculator. Right: a real photo (use Part 7 source) with meaningful alt text. Background = `--background`, no gradients/glows. Add ONE Motion staggered fade-in on load. **Do not add any pill/badge above the heading.**"

### 5.3 Trust bar (replaces the pill as the trust signal)
- **Goal:** immediate credibility right under the hero.
- **Source:** static logo row, or a slow Magic UI marquee (the one allowed accent).
- **DO:** a row of lender/partner logos the advisor works with ("Samenwerkende geldverstrekkers"), greyscale, low contrast. Optional: a small rating line ("4,9/5 · 120+ reviews").
- **DON'T:** don't invent real bank logos for the live site — use the advisor's actual partner lenders; in the prototype use neutral placeholder lender marks and flag them as TODO.
- **Prompt:**
  > "Add a trust bar under the hero: greyscale row of partner-lender logos labelled 'Samenwerkende geldverstrekkers'. Optionally a slow, subtle Magic UI marquee. Add a small rating line '4,9/5 · 120+ reviews'. Mark logos as TODO:CLIENT_LENDERS placeholders to be replaced with the advisor's real partners."

### 5.4 How it works — 3 steps  *(numbered timeline, NOT cards)*
- **Goal:** reduce friction by showing the process.
- **Source:** custom numbered layout (Separator/typography); no card grid.
- **DO:** 3 steps as a horizontal numbered sequence (mono numerals 01–03), each with a short title + one line. Connect with a hairline, not boxes.
- **Copy (NL):** 01 *Kennismaking* — "We bespreken vrijblijvend uw wensen." · 02 *Persoonlijk advies* — "U krijgt een helder, onafhankelijk hypotheekadvies." · 03 *Aanvraag & afronding* — "Wij regelen de aanvraag en begeleiden u tot de sleutel."
- **Prompt:**
  > "Build a 'Werkwijze' section: 3 numbered steps (mono 01–03) in a horizontal sequence joined by a thin `--border` line. Each step: short title (font-display) + one sentence. NO cards, no icon grid. Generous whitespace."

### 5.5 Services  *(max one card section, quiet — or image+text rows)*
- **Goal:** show core offerings without an AI-slop card grid.
- **Source:** prefer two alternating image+text rows; if cards, use 3 quiet shadcn Cards (this is the ONE allowed card section).
- **Copy (NL):** *Eerste woning* · *Oversluiten / verbouwen* · *Hypotheek voor ondernemers (zzp)*. Each: 1–2 sentences.
- **DON'T:** no identical icon-topped card triplet as the page's visual motif.
- **Prompt:**
  > "Build a 'Diensten' section. Preferred: two alternating image+text rows (real photos) for the main services. If cards are clearer, use exactly three restrained shadcn Cards (no big icons, hairline border, lots of padding) for: Eerste woning, Oversluiten/verbouwen, Hypotheek voor ondernemers (zzp). One short sentence each."

### 5.6 Stats + testimonials  *(social proof)*
- **Goal:** proof via numbers and real client voices.
- **Source:** a stat strip (Magic UI counter allowed) + a 21st.dev testimonial block.
- **DO:** 3–4 stats in mono with `tabular-nums` (e.g. *€85 mln bemiddeld* · *450+ gezinnen geholpen* · *20+ geldverstrekkers* · *4,9/5 reviews*). Then 2–3 short Dutch testimonials with name + town. Optionally a real review-platform mark.
- **DON'T:** no fake-looking 5-star card grid with stock avatars stacked identically.
- **Prompt:**
  > "Add a stat strip: 3–4 figures in font-mono with tabular-nums (use TODO:CLIENT_STATS placeholders). Optional Magic UI count-up on scroll. Below it, a restrained testimonial block (21st.dev) with 2–3 short Dutch quotes + name + town. Mark testimonials TODO:CLIENT_REVIEWS."

### 5.7 The calculator  *(KEEP — restyle only)*
- **Goal:** the lead magnet's twin — the strongest conversion tool in this niche.
- **Source:** existing component; reskin with shadcn Input/Slider/Label/Button + tokens + mono figures.
- **DO:** inputs: *bruto jaarinkomen*, *inkomen partner* (optional), *eventuele schulden*; output: *indicatie maximale hypotheek* + *indicatie maandlasten*, figures in mono. Keep the logic. Add a clear disclaimer.
- **Compliance (NL):** show *"Dit is een indicatieve berekening en geen persoonlijk advies."* (AFM/Wft context — indicative only).
- **DON'T:** don't change calculation logic; don't make it flashy.
- **Prompt:**
  > "Restyle the existing mortgage calculator only (keep its logic). Use shadcn Input/Slider/Label/Button and the calm-premium tokens. Inputs: bruto jaarinkomen, inkomen partner (optional), schulden. Outputs in font-mono tabular-nums: indicatie maximale hypotheek + indicatie maandlasten. Add the disclaimer line 'Dit is een indicatieve berekening en geen persoonlijk advies.' No new effects."

### 5.8 Free resource / lead magnet  *(KEEP — restyle only)*
- **Goal:** capture email from not-yet-ready visitors.
- **Source:** existing component; reskin + shadcn Input/Button.
- **Copy (NL):** *"Gratis gids: De 7 stappen naar uw eerste hypotheek"* — email field + Button *"Stuur mij de gids"*.
- **Prompt:**
  > "Restyle the existing free-resource component (keep logic). Calm-premium tokens, shadcn Input + Button. Title 'Gratis gids: De 7 stappen naar uw eerste hypotheek', email capture, Button 'Stuur mij de gids'. A real cover image of the guide, not an empty box."

### 5.9 Advisor (face + story)  *(closes the trust gap)*
- **Goal:** the human element clients need before sharing finances.
- **Source:** image+text row (shadcn typography).
- **DO:** a real professional portrait + 2–3 sentences in first person + credentials line (e.g. *erkend hypotheekadviseur, Wft-gediplomeerd*). Optionally a short intro-video embed.
- **Prompt:**
  > "Build an 'Over uw adviseur' image+text row: real portrait (TODO:CLIENT_PHOTO) + a 2–3 sentence first-person intro + a credentials line 'Erkend hypotheekadviseur · Wft-gediplomeerd'. Calm, editorial, no card."

### 5.10 FAQ
- **Source:** shadcn **Accordion**.
- **Copy (NL):** 5 Qs — kosten/vergoeding, onafhankelijkheid, benodigde documenten, doorlooptijd, eerste afspraak.
- **Prompt:**
  > "Add a FAQ using shadcn Accordion with 5 Dutch questions (kosten, onafhankelijkheid, documenten, doorlooptijd, eerste afspraak), one concise answer each."

### 5.11 Contact / final CTA
- **Source:** shadcn **Form** (Input/Textarea/Button) + Sonner toast.
- **DO:** fields *naam, e-mail, telefoon, bericht*; one Button *"Plan een gratis kennismaking"*; success via Sonner toast. Show phone + service area alongside.
- **Compliance footer note:** advisor registration line (e.g. *AFM-/Wft-registratienummer*) — TODO:CLIENT.
- **Prompt:**
  > "Build a contact section with a shadcn Form (naam, e-mail, telefoon, bericht), primary Button 'Plan een gratis kennismaking', success Sonner toast. Show phone (tel:) and 'Werkgebied'. Add a footer line for AFM/Wft registration (TODO:CLIENT)."

### 5.12 Footer
- **Source:** plain, navy (`--primary`) background.
- **DO:** logo, nav repeat, contact, registration/disclaimer line, privacy link. Quiet.

---

## 6. Component installation checklist
```
button input label textarea select accordion tabs dialog card form sonner slider separator badge
```
Plus `motion`. Magic UI marquee/counter only if used (5.3 / 5.6).

---

## 7. Image sourcing (no empty placeholders)
- **Style:** real, warm, human — Dutch context. A couple/family in front of a row house, keys handover, kitchen-table advice, a professional portrait. Aspirational-but-real, like HB Wealth / Hoxton.
- **Avoid:** abstract tech imagery, glowing graphics, generic corporate handshakes, obvious stock with fake smiles.
- **Sources:** licensed stock (Unsplash/Pexels for the prototype; client's own photos for production). Always set descriptive `alt`.
- **Rule:** every `src` is filled. If a client asset is pending, use a real representative stock photo + a `TODO:CLIENT_PHOTO` comment — never a grey box.

---

## 8. Definition of Done (acceptance checklist)
Verify each — these map 1:1 to the reviewer's feedback:
- [ ] **No pill/badge in the hero.**
- [ ] **No card-grid as the page's main motif** (≤1 quiet card section; rest are rows/timeline/stat strip/logo bar).
- [ ] **Calm-premium palette applied** via tokens (navy + off-white + single muted accent). No glassmorphism, no gradient/neon glows.
- [ ] **Distinctive typography** (serif display + clean sans + mono figures). No Inter/Roboto/system fonts.
- [ ] **Real images in every slot**, meaningful alt text, zero empty placeholders.
- [ ] **Calculator + free-resource kept** (logic unchanged), only restyled.
- [ ] **One primary CTA** ("Plan een gratis kennismaking") repeated; secondary actions subordinate.
- [ ] Calculator shows the **indicative-only disclaimer**; footer has AFM/Wft registration line.
- [ ] Buttons are softly-rounded (`--radius: 0.5rem`), **no full pills**.
- [ ] Motion is subtle (one staggered load + gentle scroll fades), nothing flashy.
- [ ] All on-page copy is **Dutch**; client-specific values marked `TODO:CLIENT_*`.

---

## 9. Execution order for the agent
1. Confirm understanding; list files to touch; **wait for approval**.
2. Apply design system: install shadcn components, set up `next/font` (Fraunces/Geist/IBM Plex Mono), paste the Tweakcn-generated `globals.css`, wire Tailwind font families.
3. Build/restyle sections in order 5.1 → 5.12, pausing for review after each.
4. Replace placeholders with real images + Dutch copy.
5. Run the Definition of Done checklist.
6. `npm run dev`, verify locally, then commit for Vercel deploy.

> Reminder to the agent: when unsure, **remove rather than add**. In this niche, restraint is the premium signal.
