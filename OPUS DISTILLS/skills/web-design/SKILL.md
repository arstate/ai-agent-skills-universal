---
name: web-design
description: "S-Rank web UI design engine: Tailwind + OKLCH, shadcn/ui, Lucide, 48 Hallmark themes, Cold-Hero-First, 300-ref niche vault, and 14-Pass rubric."
---
# Web Design: S-Rank Frontend Taste & Design Engineering (`web-design`)

Opinionated, accessibility-aware, AI-slop-resistant Web & Frontend Design Collaborator. Load detailed manuals in `references/` on demand:
- `references/the-4-pillars-of-web-design.md` — Tailwind + OKLCH, `shadcn/ui`, Lucide/Phosphor single-set lock, Hallmark 48 themes.
- `references/bad-vs-good-examples.md` — Side-by-side AI slop vs S-Rank craft comparisons & Emil Kowalski polish table.
- `references/niche-ui-blueprints.md` — Industry art direction, tokens, and *"One Live Thing"* widget specs.
- `references/14-pass-critique-rubric.md` — 14-Pass Visual & UX Jury Rubric (`DESIGN-CRITIQUE.md`) + `Nutlope/hallmark` v2.8.0 spec.
- `references/hallmark-58-sloplint-gates-and-48-themes.md` — Full 58-gate `sloplint` checklist & 48 Material Themes.
- `references/cat-01-*.md` .. `references/cat-10-*.md` — 300-Reference Design Vault (load **ONLY 1** matching category).

## 1. M2 Pre-Code Gates (`DESIGN_SYSTEM.md` + `design-style-preview.html`)
1. **Lock `DESIGN_SYSTEM.md` & `design-style-preview.html` BEFORE Coding:** Before writing production UI code, generate `design-style-preview.html` (5–10 Hallmark + industry Bento options with real photos, upright roman headings, interactive switcher) and lock tokens in `DESIGN_SYSTEM.md` / `readme-ai-agent/STYLE-GUIDE.md`.
2. **Passive Quality Gate (`no-ai-design-slop`):** Preserve existing art direction on edits/redesigns without forcing a neutral rewrite, while strictly banning:
   - **Zero** purple-on-white gradients (`#6366f1` Tailwind Indigo-500 is banned).
   - **Zero** 3-card uniform grids across consecutive sections.
   - **Zero** emoji in UI (`lucide-react` or `@phosphor-icons/react` single-set lock only).
   - **Zero** generic buttons (*"Get Started"*, *"Learn More"*, *"Buy Now"*).
3. **Decision-Traceable Rule (`no-slop-design`):** Every color, font, card, photo, and interaction must trace back to `DESIGN_SYSTEM.md` or the user brief (*"chosen, not happened"*).

## 2. The 4 Iron Pillars & Dual-Engine Motion
1. **Tailwind CSS v3.4/v4 + OKLCH:** Use `oklch(L C H)` with `|L_text - L_bg| >= 50%` (WCAG 4.5:1 / APCA Lc >= 60). No Bootstrap/Bulma.
2. **`shadcn/ui` (Radix Primitives):** Copy-paste unstyled components (`components/ui/*`) with full ARIA & keyboard support. No Ant/MUI/Mantine.
3. **Single Icon Set:** `lucide-react` default (1.5px–2px stroke) or `@phosphor-icons/react` exclusively—never mix icon libraries.
4. **Dual-Engine Motion (`GSAP + motion/react`):**
   - **GSAP (`useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`):** Scroll choreography, pinned timelines, and text splits.
   - **`motion/react`:** Tactile spring micro-interactions (`active:scale-[0.97]`, GPU-only `transform`/`opacity`, `prefers-reduced-motion: reduce`, 7-state coverage). Never mutate the same DOM node with both engines.

## 3. Empirical UI Laws & Cold-Hero-First
- **Surface Mode:** Classify into `Persuade`, `Operate`, `Read`, or `Experience` in `STYLE-GUIDE.md`.
- **Typography:** Max 2 font families, `4.3x` H1-to-body ratio, `<= 2 lines` per headline, upright roman headings (`0` italic `<em>` in headings), `tabular-nums` on all numbers, `letter-spacing: 0.06em–0.10em` on uppercase labels.
- **Layout & Footers:** `overflow-x: clip` on `html, body`; `minmax(0, 1fr)` on image grids; `white-space: nowrap` on buttons; `>= 44px` tap targets; Cold-Hero-First fit at `1280x800` and `375x812`.
- **Zero Meta-Leak & Peak-End Footers:** Never leak `"Bento"`, `"Hallmark"`, `"Hero Section"`, `"CTA"`, `"brutalist"` (use `"desain modern tegas"`), or tech-stack bragging in public UI. Use Editorial Colophon, Architectural Grid, Local Trust/NAP, or Swiss Micro-Bar footers.

## 4. Verification Loop
1. Run `node skills/hallmark/scripts/sloplint.mjs <output> --render` (`0 FAIL, 0 REFLEX`).
2. Render across all 7 viewports (`360x800`–`1440x900`), inspect via Vision Agent (`read_file`), and log `| Before | After | Why |` in `readme-ai-agent/DESIGN-CRITIQUE.md`.
