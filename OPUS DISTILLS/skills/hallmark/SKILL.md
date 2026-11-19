---
name: hallmark
description: "Website design skill (48 material themes, Cold-Hero-First, sloplint gates) for new sites or /hallmark redesign|audit when explicitly invoked."
argument-hint: "<prompt> | redesign <path> | audit <path>"
version: 2.0.0
metadata:
  opencode/slash: "true"
---

# Hallmark

Makes generated UIs look made, not generated: a hard floor against model defaults, a dealt direction so consecutive builds do not converge, and one idea per screen.

## The Floor (Non-Waivable)

1. **Tokens & OKLCH (`shadcn/ui` + Tailwind):** Every color and font goes through `:root` / `DESIGN_SYSTEM.md` tokens (`oklch(L C H)` with `|L_text - L_bg| >= 50%`). No literal color or `font-family` past the token block. (48)
2. **Dual-Engine Motion (`GSAP + motion/react`):** Use GSAP (`useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`) for scroll choreography and `motion/react` for micro-interactions (`transform`/`opacity` only, `prefers-reduced-motion: reduce`, `:focus-visible`). Never `transition: all`, never animate `width`/`height`/`top`/`left`, never mutate the same DOM node with both engines. (10a, 15, 26a, 27, 62)
3. **Typography & Layout:** Never one italic word inside a roman heading (38i). `overflow-x: clip` on `html, body` (never `hidden`/`100vw`) (34). Image-bearing grid tracks use `minmax(0, 1fr)`; display heads carry `overflow-wrap: break-word; min-width: 0` (50).
4. **Passive Quality Gate (`no-ai-design-slop`):** Preserve existing art direction on edits/redesigns without forcing a neutral rewrite. Strictly **zero** purple-on-white gradients (`#6366f1`), **zero** 3-card uniform grids, **zero** emoji in UI, **zero** generic buttons (*"Get Started"*, *"Learn More"*, *"Buy Now"*), **zero** card-inside-card, **zero** fake browser/OS chrome, and **zero** invented metrics. (2a, 4, 30a, 46a, 47a)
5. **Cold-Hero-First & Container:** Hero headline (`<= 7 words`), one sentence (`<= 12 words`), and primary action all visible at `1280x800` without scrolling (44b). About 80 words per screen (58). Container capped and centered (44d).
6. **Stamp & `sloplint`:** Line 1 of CSS is the Hallmark stamp, then critique line, then waivers (20). Run `node <skill-dir>/scripts/sloplint.mjs <output> --render` before handoff; fix every `FAIL`, fix or waive every `REFLEX`.

## Flow (M2 Gate -> Build -> Sweep)

0. **Pre-flight:** Read the project, `DESIGN_SYSTEM.md`, and existing tokens before asking anything. Cache in `.hallmark/preflight.json`.
1. **Ask once (`ask_question`):** Material (real photos/screenshots/numbers), Audience, Use (1 action), Tone (extreme—never *"clean and modern"*; use *"desain modern tegas"* or *"minimalis berkelas"*), and expression register (`R1–R4`).
2. **M2 Gate (`DESIGN_SYSTEM.md` + `design-style-preview.html`):** Before production coding, generate `design-style-preview.html` (interactive style options with real photos & upright roman headings) and lock `DESIGN_SYSTEM.md`. Apply **`no-slop-design` Decision-Traceable Rule**: every color, font, card, and interaction must trace back to `DESIGN_SYSTEM.md` or the brief (*"chosen, not happened"*).
3. **Direction:** Deal a theme (`node <skill-dir>/scripts/theme.mjs deal --genre <genre> --prompt "<prompt>"`) or preserve existing art direction when editing/redesigning. Custom runs load `references/direction.md`.
4. **Load:** `references/layout.md`, `references/anatomy.md` (job part), `references/imagery.md`, `references/craft.md`, `references/genres/<genre>.md`, `references/themes/<slug>.md`, and `references/gates.md` § 1–4.
5. **The Picks block (once):** State Shape, Theme, Chrome, Hero, Signature, Sections, Material, and Sweep.
6. **Build:** `node <skill-dir>/scripts/theme.mjs scaffold <slug>` -> `tokens.css` & `base.css`. Build Hero first, run `sloplint.mjs <file> --render --stage hero`, then build remaining 5–8 sections (`<= 450` visible words, Page Invariants `F15`). Log via `theme.mjs log --entry '<json>'`.
7. **Sweep:**
   - Run `node <skill-dir>/scripts/sloplint.mjs <files> --genre <genre> --render` until `0 FAIL`.
   - Walk `references/gates.md` § 5–6 (J, R/J, Finish review in fresh context).
   - Update Picks block with verified outcome (`Floor 0 FAIL · Reflex X · finish-review`).

**Verbs (only when user names Hallmark):** `redesign <target>` and `audit <target>` (read `references/redesign.md` first). Any other edit runs in the project's own system.
