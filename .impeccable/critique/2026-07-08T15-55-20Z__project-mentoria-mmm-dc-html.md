---
target: Mentoria MMM.dc.html (main landing page)
total_score: 25
p0_count: 2
p1_count: 2
timestamp: 2026-07-08T15-55-20Z
slug: project-mentoria-mmm-dc-html
---
Method: dual-agent (A: general-purpose · B: general-purpose)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Binary submit/submitted swap only; no loading state despite "leva menos de 2 minutos" promise |
| 2 | Match System / Real World | 4/4 | Fluent physician-finance vocabulary ("PF/PJ," "plantões," "glosas de planos," "jaleco") |
| 3 | User Control and Freedom | 2/4 | No edit-after-submit, no back-from-confirmation path |
| 4 | Consistency and Standards | 4/4 | CTA copy repeated verbatim across header/hero/form; tokens used consistently |
| 5 | Error Prevention | 2/4 | `required`/`type=email` present but no visible custom validation styling or inline messaging |
| 6 | Recognition Rather Than Recall | 4/4 | Persistent labels above every input; icon+text pairing throughout |
| 7 | Flexibility and Efficiency | 2/4 | Single static page; n/a-leaning, nothing egregious |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained palette and whitespace, docked for repeated glass-card/glow/gradient-text decorative layer |
| 9 | Error Recovery | 1/4 | No error states defined anywhere for the form at the highest-stakes moment on the page |
| 10 | Help and Documentation | 1/4 | No FAQ, no "what happens next," no visible support channel |
| **Total** | | **25/40** | **Acceptable — significant improvements needed before this converts skeptical buyers** |

## Anti-Patterns Verdict

**Start here.** Does this look AI-generated? **Borderline, leaning toward "yes, with tells."** The copy itself is genuinely well-targeted and domain-specific — this isn't a lazy AI dump. But the decorative layer is templated, and one finding is a hard, explicit rule-break in this project's own design system.

**LLM assessment**: Real damage is concentrated in a handful of specific, nameable patterns rather than a diffuse "everything feels generic" problem:
- `.gold-text` (`base.css:32-37`) uses `background-clip:text` on a gradient — the exact **gradient-text absolute ban** — applied on the hero's two most important words ("Milionária" ×2) and a pull-quote line. This is the single most damaging finding: a hard-banned pattern shipped three times on the page's most load-bearing copy.
- **6 of 7 sections** open with the identical tracked-uppercase eyebrow span — crosses from "wayfinding" into reflexive scaffolding.
- **Numbered diagnostic cards (01–04)** are decorative, not a real sequence (nothing in the copy orders "first fix 01, then 02") — contrast with the método section's "Etapa 01–05," which IS a genuine, legitimately-numbered sequence. Useful internal proof the diagnostic numbering is the weak, reflexive use.
- **Hero-metric template** (24 / R$ Bi / CEO stat row) is the textbook AI credibility-grid shape, and "R$ Bi" is vague — a number dressed as a stat without an actual figure.
- **Glassmorphism-as-decoration** recipe (blur + gold diagonal gradient) repeated identically 3 times (hero caption, portrait credential card, CTA form panel).
- Side-stripe border accent on the pull-quote (`border-left:3px solid var(--text-accent)`, line 81).

**Deterministic scan**: `detect.mjs` ran clean (exit 2, 2 findings):
- `em-dash-overuse` (warning): 5 em-dashes in body copy — an AI cadence tell worth a copy pass.
- `numbered-section-markers` (advisory): flagged the 01–05 sequence generically. Reconciling with the LLM read: the detector can't distinguish the diagnostic cards' *decorative* 01–04 from método's *legitimate* Etapa 01–05 sequence — that nuance came from the manual review, not the scan. Net: one of the two numbered sequences on this page earns its numbers, the other doesn't.

No false positives from the detector; both findings held up under manual reconciliation. Structural grep evidence independently confirmed the `.gold-text` gradient-clip declaration, the 6/7 eyebrow ratio, and the two distinct 01–04 number sequences (diagnostic-card corner numerals + "Etapa 0X" labels).

**Visual overlays**: Not applicable — this is a static HTML prototype with no dev server, and the project's own README explicitly instructs not to render it in a browser ("Everything you need... is spelled out in the source"). Both assessments worked from source, per that instruction.

## Overall Impression

The bones are good: the diagnostic copy is precise and audience-specific, the color system is genuinely restrained (gold as signal, not decoration, with strong contrast throughout), and the emotional arc (pain → agitation → credential → mechanism → self-qualification → urgency+reassurance) is well-sequenced. But the page leans on a decorative layer — gradient text, eyebrow-everywhere, decorative numbering, a vague stat-grid, repeated glass cards — that is templated rather than composed, and one of those patterns (gradient text) breaks this project's own hard rule. The single biggest opportunity: every trust claim on the page is self-reported by the seller, which is the weakest possible proof for a financially literate, skeptical physician being asked to hand over revenue data before enrolling.

## What's Working

- **The diagnostic section's copy is excellent and audience-specific.** "Médico rico em faturamento e pobre em gestão," "emprego auto-outorgado," "confusão crônica entre Pessoa Física e Pessoa Jurídica" are precise pain points a real physician will recognize instantly. This is show-don't-theorize done right, and it's the page's strongest asset.
- **Color restraint and contrast are genuinely solid.** Gold (`--text-accent`, `--gradient-gold`) is used almost exclusively as accent on CTAs, not as background decoration. Contrast checks out: `--text-dim` (rgba(255,255,255,0.6)) on `--bg-page` (black) computes to ~7.4:1 (AAA); `--text-muted` (#afada6) on black is ~9.4:1. The palette matches the "gold as signal, not decoration" principle without a readability tax.
- **The Sim/Não qualification section** is a legitimately good self-selection device — it lets the skeptical prospect pre-qualify themselves without the page having to make hard sales claims.

## Priority Issues

**[P0] Gradient-text ban violation on the hero headline.**
Why it matters: `.gold-text` breaks this project's own explicit, non-negotiable design rule (gradient text is never allowed), and it's applied to the two most important words on the page ("Milionária," repeated) plus a pull-quote line. For a brand whose entire value proposition is precision and expertise ("Surgical, Expert, Protective"), the load-bearing headline itself violates the system meant to enforce that discipline.
Fix: Replace `.gold-text` with solid `color:var(--text-accent)` (or `--text-accent-soft`). The existing gold-on-black contrast (13:1+) means nothing is lost visually, and the class itself should be fixed at the source in `base.css` so it can't recur on future pages built from this design system.
Suggested command: `/impeccable quieter` (strip the decorative gradient/glass layer) or `/impeccable polish`

**[P0] Zero third-party trust signals for a financially skeptical audience.**
Why it matters: Every credibility claim ("24 anos," "R$ Bi," "CEO da Fidem") is self-reported by the seller. The target persona — a 45-year-old physician deciding whether to trust this program with finances and reputation — is trained in evidence-based reasoning and will register the absence of testimonials, named outcomes, media mentions, or verifiable regulatory/compliance credentials before handing over contact info and revenue data.
Fix: Add at least one third-party proof element before the CTA — a named doctor testimonial with photo, a verifiable outcome number, or a regulatory/compliance credential line (e.g., CVM registration if applicable).
Suggested command: `/impeccable harden` (trust/credibility gaps) or `/impeccable shape` (design the proof section)

**[P1] "MMD" vs "MMM" naming inconsistency.**
Why it matters: Line 199 reads "Diagnóstico MMD Inicial" while the program is "MMM" (Mente Médica Milionária) everywhere else. For a brand whose personality is "Surgical, Expert, Protective," a typo in its own acronym directly undercuts the promise of precision to a detail-oriented physician audience — exactly the audience most likely to notice.
Fix: Correct to "Diagnóstico MMM Inicial," or if MMD is intentionally a distinct named deliverable, define it once explicitly.
Suggested command: `/impeccable clarify`

**[P1] Vague, recycled stat and repeated phrase.**
Why it matters: "R$ Bi" as a standalone credential doesn't say how many billions — a precise, skeptical reader will notice the vagueness. Compounding this, "Faturamento é ego, lucro é saúde [financeira]" appears near-verbatim at both line 67 and as the section headline at line 81 — a skeptical reader will notice the repetition within one scroll.
Fix: Quantify the AUM figure concretely if available; vary or intentionally callback the repeated line rather than duplicating it unintentionally.
Suggested command: `/impeccable clarify`

**[P2] Responsive overflow risk in three grid layouts.**
Why it matters: Hero, solução, and método grids use `minmax(320–340px,1fr)` floors that exceed the ~311px net width available on a 375px phone after padding. Combined with `overflow-x:hidden` on the root wrapper, this risks silently clipped content on the smallest common phone width rather than a visible, graceful reflow.
Fix: Lower the minmax floor to ~280px, or add an explicit single-column breakpoint below 400px.
Suggested command: `/impeccable adapt`

## Persona Red Flags

**Jordan (Confused First-Timer)**: Trips on the MMD/MMM inconsistency — will wonder if it's a typo or an undefined second product tier. "Processo seletivo · Vagas limitadas por turma" assumes the reader already understands cohort-based enrollment; a cold visitor from an ad click gets no explicit definition of "turma" before being asked to apply.

**Casey (Distracted Mobile User)**: Hits the grid-overflow risk on small phones. Also faces a 7-section, single-path scroll with no in-page navigation — if she leaves and returns, there's no way to jump back to "the form" or "the method" without re-scrolling the whole page; the header has only one CTA link, no section anchors.

**Physician-skeptic (project-specific persona)**: Reassured by the specific, correct financial/medical vocabulary and by the confidentiality bullets next to the form ("100% sigiloso," "análise criteriosa," lock/shield icons). Alarmed by the complete absence of named third-party evidence — being asked for WhatsApp, email, and revenue bracket with zero proof that trust has been earned by others before them.

## Minor Observations

- The eyebrow pattern is genuinely useful for scanning in moderation — worth keeping on 2–3 sections (hero, aplicação) rather than all 6.
- Diagnostic card numbers (01–04) could be removed entirely with zero information loss; nothing in the copy references "point one" vs "point three."
- The `image-slot` placeholders (hero-portrait, dani-portrait) are the only visual assets on a page whose credibility argument rests on Daniele's authority — shipping without at least her real portrait is a meaningful content gap, not just a prototype nicety.
- Scarcity language ("vagas extremamente limitadas," "turmas limitadas") is never backed by a concrete number (cohort size, next start date, seats remaining) — reads as assumed scarcity rather than evidenced scarcity.
- The footer compliance disclaimer ("não constitui recomendação individual de investimento") is appropriately restrained — keep it in any redesign.
- `style-hover` is a custom, non-standard attribute (7 occurrences) with zero handling found in `support.js` or `_ds_bundle.js` — hover states declared this way won't do anything without a runtime that implements it; worth confirming before treating hover states as shipped.

## Questions to Consider

- If every credibility signal on this page is self-reported, what would it take to include even one number, name, or outcome the reader didn't have to take on faith — and would that single change move conversion more than any visual polish?
- The diagnostic cards are numbered 01–04 but aren't actually sequential — what happens if severity or frequency (which bleed affects the most doctors?) determines visual weight instead of a decorative number?
- The design system itself bans gradient text, yet `.gold-text` exists as a shipped, invocable class — does that mean this violation will keep recurring on every future page built from this system until the class is fixed at the source?
