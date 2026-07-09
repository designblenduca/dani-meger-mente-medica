# Dani Meger — DNA Financeiro Design System

## What this is

Dani Meger is a Brazilian financial mentor and planner (CEO of **Fidem**) with 22 years of experience, specializing in the behavioral/neuroscience side of money for high-earning healthcare professionals (doctors, dentists, clinic owners). "DNA Financeiro" ("Financial DNA") is her lead-generation campaign: a free "Financial Personality Diagnostic" that blends Big Five personality science with Enneagram archetypes to explain why high revenue isn't turning into wealth for people whose whole day is spent caring for others.

The single artifact behind this design system is the campaign's landing page — a one-page, dark, gold-accented "wealth management editorial" site built by the agency **Blenduca** using their own reusable **Hero Template** (documented in the repo as `hero-template-blenduca.md`), which is itself a pattern Blenduca reuses across multiple experts' funnels (not exclusive to Dani Meger).

**Source repo:** [designblenduca/dani-meger-dna-financeiro](https://github.com/designblenduca/dani-meger-dna-financeiro) (branch `main`)
Files read: `index.html`, `styles.css`, `script.js`, `hero-template-blenduca.md`, `hero-desktop.png`, `hero-mobile.png`, `mentor-about.png`.

If you have access to this repo, go read it directly — this system distills it, but the source is ground truth and will have any updates made since this was built. The `hero-template-blenduca.md` file in particular is worth reading in full: it's Blenduca's own spec for how this hero pattern should flex across breakpoints, written as instructions for design agents.

## Product surface

There is **one surface**: the DNA Financeiro landing page (single scrolling page, no app, no multi-page site). It funnels a visitor through: hero hook → "paradox" problem framing (timeline of 4 pain points) → methodology explainer (with a glassmorphic mock "personality report" card) → 4-point value/benefit grid → mentor bio + credibility stats → urgency-framed lead capture form → footer.

No logo file exists anywhere in the source. **The wordmark "Dani Meger", set in plain type, IS the official logo** — use it everywhere a mark would otherwise go (headers, decks, exports). Do not draw or invent a separate mark.

## What's inside

- `styles.css` — root stylesheet (import manifest only)
- `tokens/` — colors (one Tailwind-style gold scale + neutrals, themed for light/dark), typography, spacing/radius/shadow, fonts (all consumed by `styles.css`)
- `assets/icons/` — the 4 real Lucide SVGs used in the source
- `components/core/` — the reusable primitives extracted from the landing page's own repeated CSS patterns: `Button`, `Icon`, `EyebrowLabel`, `Badge`
- `guidelines/` — foundation specimen cards (Colors, Typography, Brand, UI Kit) shown in the Design System tab
- `SKILL.md` — portable skill definition for use in Claude Code

---

## CONTENT FUNDAMENTALS

- **Language:** Brazilian Portuguese (pt-BR), throughout — no bilingual content.
- **Voice: direct address, second person.** Copy speaks straight to "você" (you) constantly: <em>"Cuidar de vidas é a sua vocação. Mas quem cuida do seu dinheiro?"</em>, <em>"Você estudou incansavelmente..."</em>. It never talks about the reader in third person. First person only shows up as the brand's institutional "we" implicitly (never "eu" self-referential from Dani) — the page speaks as the program, not as a person narrating.
- **Tone: warm authority, not hype.** Confident, credential-driven ("22 anos de experiência", "CEO da Fidem"), but emotionally literate — it names shame and exhaustion directly ("ansiedade pura só de pensar em abrir o extrato", "o peso do padrão... sobrecarregando a sua saúde mental") rather than only selling upside. It reads like a therapist-adjacent financial expert, not a hustle-culture funnel.
- **Empathize-then-reframe structure.** Nearly every section follows: name the specific pain → reframe it as a *behavioral/psychological* pattern, not a math problem → position the diagnostic as the precise, tailored fix. E.g. "O problema não é o quanto você ganha. É como a sua mente se relaciona com o dinheiro."
- **Specificity over generic claims.** Copy names the exact audience (médicos e profissionais da saúde), the exact time cost ("menos de 10 minutos"), and exact methodology inputs (Big Five, Eneagrama) rather than vague "transform your finances" language.
- **Urgency is time-boxed, not fear-based.** The CTA section frames scarcity around the free campaign window ("por tempo limitado"), not around the reader's failure. Checklist-style reassurance (sigiloso, gratuito, rápido) softens the urgency.
- **Headline casing:** sentence case, not title case. Eyebrows/labels are the one ALL-CAPS treatment (via `text-transform: uppercase`), always short and wide-tracked (e.g. "O Paradoxo", "Metodologia Exclusiva").
- **No emoji as decoration** — the only emoji in the whole source is a single ⚠️ used functionally as an urgency/attention flag directly inside one eyebrow line ("⚠️ Atenção: O acesso gratuito é por tempo limitado"). Do not scatter emoji elsewhere.
- **CTAs are full sentences, first-person-benefit framed:** "Quero Fazer o Diagnóstico Gratuito Agora", "Descobrir Minha Personalidade Financeira Gratuitamente" — written as if the visitor is saying it ("Quero...", "I want to...").
- **Numbers as proof, not decoration:** every stat used (22 anos, 400+ famílias, 85%/72%/64% metric bars) ties to a specific credibility or diagnostic claim — never a filler stat.

## LIGHT & DARK MODE

The source landing page is dark-only, but every semantic token in `tokens/colors.css` is theme-aware so the system now supports **both a black-background and a white-background application** with guaranteed contrast in each:

- **Dark is the default** (`:root`) — black page (`--bg-page`), white primary text, light gold (`--gold-200`/`--gold-400`) for accents.
- **Light mode** activates by adding `data-theme="light"` to any ancestor element (`<html>`, `<body>`, or even a single card/section) — white page, black primary text, and the accent automatically drops to the darker bronze end of the same scale (`--gold-700`/`--gold-800`) instead of the light gold, because light gold on white fails contrast.
- **Never hand-pick a raw `--gold-*` stop for text or borders** — always use the semantic layer (`--text-accent`, `--text-accent-soft`, `--border-subtle`, `--surface-subtle`) so components stay legible when the theme flips. The gold CTA button is the one exception: `--gradient-gold` is a fixed brand-colored surface (with black label text) that looks correct in both themes without changing.
- See `guidelines/modes-dark.html` and `guidelines/modes-light.html` for full hierarchy+button+card demonstrations of each mode side by side in the Design System tab, and the light-mode variants of the UI Kit cards for hover/glow contrast proof on white.

## VISUAL FOUNDATIONS

- **Palette:** one gold hue carrying the whole brand accent, expressed as a single Tailwind-style 50–950 scale — the source's two hexes sit on it as named stops (`--gold-400` = `#E8C96D`, `--gold-800` = `#8B6914`) rather than being treated as separate scales. Plus a warm-tinted neutral scale and true black/white for page backgrounds and primary text in each theme. This is a **one-hue accent system** — no secondary/tertiary brand color family. Gold is used at very low opacity (6–15%) as tinted surfaces/borders (`--surface-subtle`, `--border-subtle`), and at full strength only for text accents, icons, numerals, and buttons.
- **Type:** a single family, Inter (variable, weights 300–900, roman + italic), carrying the entire system through weight/size/tracking contrast alone — no serif, no secondary display face, no monospace. Headings run 800–900 weight with tight/negative letter-spacing (`-0.02em` to `-0.03em`); labels/eyebrows run 700 weight with very wide positive tracking (`0.1em`–`0.22em`) and uppercase — that contrast (tight heavy headline vs. wide light label) is the system's main typographic signature.
- **Backgrounds:** flat near-black, occasionally warmed by very low-opacity radial gold glows behind the CTA section (`radial-gradient(... rgba(201,168,76,0.06), transparent)`). No patterns, no textures, no photographic full-bleed sections except the hero itself. One full-bleed editorial photo in the hero (right-aligned portrait, dark gradient overlay so text reads on the left); a second contained (rounded-corner, not full-bleed) portrait in the about section.
- **Imagery color vibe:** warm-lit, editorial-corporate portraiture — subject in white/ivory tailoring against a pure black backdrop (hero) or a softly blurred stage-teal/black backdrop (about photo). No grain, no B&W, no desaturation — imagery reads warm and polished, matching the gold palette.
- **Glassmorphism, used sparingly and only for two "premium object" cards** (the mock personality-report card, and the lead-capture form card): translucent gold-tinted gradient fill, `backdrop-filter: blur(16–20px)`, a hairline gold border, and a soft blurred gold "glow orb" (`filter: blur(70–90px)`, ~12–18% opacity) floating behind the card — never applied to plain content blocks.
- **Cards, generally:** 1px hairline border in translucent gold (`--border-subtle`), radius 12–20px depending on size (small chips ~12px, hero-level object cards 20px), background is a flat low-opacity gold wash (`--surface-subtle`/`--surface-hover`) for lightweight list cards, or the richer gradient+blur treatment above for premium object cards. Only one card in the whole source page uses a left-border accent (a pull-quote-style callout, 3px solid gold) — that treatment is reserved for editorial callouts, not used generically on regular cards (avoid overusing it).
- **Corner radii:** small chips/badges use a full pill (`50px`/`50%`); interactive controls (buttons, inputs) sit at 10–14px; cards scale from 12px (list items) to 20–24px (hero object cards, mobile form card). No sharp (0px) corners anywhere.
- **Shadows:** a warm gold glow under CTA buttons (`--shadow-gold-btn`, intensifying on hover to `--shadow-gold-btn-hover`), plus (in the source's premium object cards) a deep, very soft black drop shadow for depth against the black canvas. No hard/sharp shadows, no inner shadows.
- **Hover states:** buttons lift (`translateY(-2px/-3px)`) and their gold glow shadow grows; list-style cards (discover cards) lighten their background wash and their border goes from 12%→30% opacity gold; timeline dots scale up 1.5× and brighten; numerals nudge 4px sideways. Nothing changes hue on hover — only opacity, elevation, and scale shift.
- **Press/active states:** not explicitly defined in source (no `:active` rules) — treat as a slightly reduced hover lift (~1px, ~80% of hover shadow) by convention when building new interactive states.
- **Borders:** consistently a single hairline translucent gold (`--border-subtle`, brightening to `--border-hover` on hover/focus) — never a solid opaque border, never multi-color.
- **Focus states:** inputs get a gold ring plus a solid gold border — no browser default outline.
- **Transparency & blur:** blur is used exactly twice — as `backdrop-filter` on the two premium glass cards, and as `filter: blur()` on the decorative "glow orb" behind those same cards. It's never used for scrims/overlays elsewhere except the hero's dark gradient overlay (a plain rgba gradient, no blur) that guarantees text contrast over the photo.
- **Animation:** entrance-only, no looping/decorative animation. Elements carry `.reveal` / `.reveal-left` / `.reveal-right` classes (opacity 0 + translate 40px), animated in via `IntersectionObserver` with an `ease` timing (0.8s) and a 120ms stagger between siblings — one direction per section (whole blocks fade up, hero content slides in from the left, visuals slide in from the right). Metric progress bars animate their `width` from 0 on scroll-into-view (1.2s, `cubic-bezier(.4,0,.2,1)`). A subtle parallax (`translateY(scrollY * 0.12)`) drifts the hero photo. A handful of floating gold particles drift upward behind the hero (decorative, low-opacity, `linear infinite`) — the one looping animation in the system, confined to the hero only.
- **Layout rules:** centered container, `max-width: 1180px`, generous section padding (120px vertical rhythm desktop, stepping down to 80px on mobile). Two-column split layouts (methodology, about, CTA) collapse to single-column under 900px. The hero is the only section allowed to break the container/overlay rules per Blenduca's template spec — text always left, portrait always right, and the template explicitly forbids ever flipping that order or removing the dark overlay.

## ICONOGRAPHY

- **Icon type:** outline/stroke-only (no fills), `stroke-width: 1.5`, rounded caps — matching the **Lucide** icon set (open-source, MIT-licensed fork of Feather Icons). Always colored via `currentColor` so it inherits gold from its parent context. No icon font, no PNG icon set.
- **Examples in the `guidelines/brand-iconography.html` card:** `bar-chart-3`, `lock`, `graduation-cap`, `book-open` — the 4 glyphs the source page actually uses. Treat these as examples of the *style*, not an exhaustive set: pull any additional glyph you need from Lucide (https://lucide.dev) at the same stroke-width to stay consistent.
- **Emoji:** used exactly once in the whole source, functionally, inline in copy (⚠️ as an attention flag) — not as a UI icon substitute. Don't scatter emoji elsewhere.

## Intentional additions

The source defines its component inventory through repeated CSS class patterns on a single page (not a formal component library), so the components below are lifted directly from those patterns — nothing invented beyond an `Icon` wrapper to standardize how the 4 existing SVGs (and any future Lucide glyphs) are mounted:
- **Icon** — thin wrapper around the inline-SVG pattern above (props: `name`, `size`) so components reference icons consistently instead of re-pasting raw `<svg>` markup.

No other primitives were added beyond what the source page's own CSS defines.

## Components

Extracted from the landing page's own repeated CSS patterns — kept deliberately small (this is a single-page source, not a full app):

- **core/** — `Button` (the one gold-gradient CTA, hero/compact sizes), `Icon` (Lucide-style glyph wrapper), `EyebrowLabel` (uppercase kicker), `Badge` (small solid-gold pill)

## UI Kit basics

Rather than a full screen-by-screen product UI kit (the source is a single landing page, not a multi-screen app), `guidelines/` carries a compact "UI Kit" card group covering the fundamentals in context: buttons + icon usage, spacing/padding, corner radius, and hover/glow states.

---

## Index / manifest

```
readme.md                         — this file
SKILL.md                          — portable skill definition (Claude Code compatible)
styles.css                        — root stylesheet (import manifest only)
tokens/
  fonts.css                       — Inter, via Google Fonts @import
  colors.css                      — one gold scale + neutrals; light/dark theme via [data-theme="light"]
  typography.css                  — sizes, weights, tracking, line-heights
  spacing.css                     — spacing/radius/shadow scale
  base.css                        — reset + .container/.gold-text/.reveal utilities
assets/
  icons/                          — bar-chart-3, lock, graduation-cap, book-open (Lucide SVGs)
components/
  core/        Button, Icon, EyebrowLabel, Badge   (+ core.card.html)
guidelines/
  colors-primary-scale.html (Gold Scale), colors-neutral-scale.html
  type-font-hierarchy.html, type-weights-tracking.html
  brand-logo.html (both themes), brand-iconography.html
  modes-dark.html, modes-light.html
  ui-kit-buttons-icons.html (+ -light.html), ui-kit-spacing-padding.html, ui-kit-radius.html, ui-kit-hover-glow.html (+ -light.html)
```
