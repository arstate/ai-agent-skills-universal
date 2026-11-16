---
name: opus-distills
description: "Default Master Brain (/opus-distills): direct in-brain 6-category routing across 45 core skills + Tier-2 find-skills fallback for plugins/remote."
---

# `opus-distills` — Direct Master Brain & Zero-Overhead Dispatcher

Primary router for `@opus-distills`, `/opus-distills`, and general prompts. **Route all 45 core skills directly in-brain from the map below (ZERO `find_skills.py` tool roundtrip)**; invoke `find-skills` CLI ONLY for external/plugin skills or remote `skills.sh`.

> Deep token playbook (`context-mode`, CoD `<=8 words/step`, observation masking): read `references/token-efficiency-and-cod-playbook.md` on demand.

---

## 1. Turn-1 Execution Protocol

1. **Match Intent In-Brain** via Section 2 (6 Categories) & Section 3 (Exact Sub-Skill Map).
2. **Load Specialist `SKILL.md` + Critical `references/*.md` FIRST** via `read_file` before writing any plan, preview, or code. Never guess rules from memory alone.
3. **Line-1 Receipt:** Print `🔧 [Skills Auto-Loaded: opus-distills -> <loaded files>]` listing only files genuinely read in the current turn.

---

## 2. Direct 45-Skill Core Map (`../<skill>/SKILL.md`)

- **`01-web-engineering`:** `web-master-agent` (orchestrator), `web-planning` (architecture/flow/PRD/stack), `web-builder` (Next.js/Astro builds), `web-debugging` (4-phase debug/7-layer security/7-vp Vision QA), `web-optimization` (Vercel zero-overage/CWV/Cloudflare/Spark), `optimasi-nextjs-bandwidth`
- **`02-ui-design-taste`:** `web-design` (4 Pillars/48 Hallmark themes/300-Ref Vault), `taste-design` (non-web Art Director/14-Pass), `hallmark`, `ui-ux-fundamentals`, `iconography`, `design-creator`, `design-guardian`, `design-lint`, `design-review`
- **`03-figma-visual-media`:** `figma-design`, `figma-create-ui`, `figcraft-use`, `figcraft-generate-design`, `figcraft-generate-library`, `svg-gen`, `image-gen`, `prompt-generator`, `visual-breakdown`, `upscale-img`, `gen-img`
- **`04-video-motion-audio`:** `remotion`, `web-animation`, `tts-gen`, `pdf-deck`, `slide-design`
- **`05-growth-copy-research`:** `social-media-research`, `generate-fresh-ideas`, `brainstorming`, `humanizer`, `websearch`
- **`06-core-agent-browser`:** `opus-distills`, `find-skills`, `anti-yes-man`, `ponytail`, `terse-respon`, `indo-genz-ponytail`, `chrome-browser-control`, `gui-automation`, `free-ram`

---

## 3. Core Intent Routing Table (Read Listed Files Before Executing)

| Intent / Slash Command | Required Skills & Key References | Critical Standard |
|---|---|---|
| **Design Preview / Web Style** | `web-design`, `taste-design`, `web-design/references/{the-4-pillars-of-web-design.md,14-pass-critique-rubric.md,cat-XX-*.md}` | Tailwind+OKLCH, shadcn/ui, Lucide, upright roman headlines, real photos, 5–10 styles in `design-style-preview.html`. |
| **Next Steps / User Flow / Web Plan** | `web-planning`, `web-master-agent`, `anti-yes-man`, `web-design` | **Never skip to raw `index.html`.** Init `./AGENTS.md` + 12-file `readme-ai-agent/`, `USER_FLOW_AND_PAGE_ARCHITECTURE.md`, 4-stack table (Next.js 15 #1), wait for user confirmation. |
| **Production Web Build** | `web-builder`, `web-design`, `web-animation`, `web-optimization` | Cold-Hero-First (`1280x800`), CSS pre-emit stamp, `overflow-x: clip`, `minmax(0,1fr)`, clean footer. |
| **Self-Debug / Audit / Vision QA** | `web-debugging`, `web-design/references/14-pass-critique-rubric.md`, `chrome-browser-control` | 58 `sloplint` gates, 7-layer security check, visible Chrome 7-viewport capture inspected via `read_file`. |
| **Web Animation (GSAP / Spring)** | `web-animation`, `web-animation/references/gsap-and-real-case-animations.md` | Dual-engine zero DOM mixing: `useGSAP`+`SplitText`+`quickTo` / `motion/react` spring + `prefers-reduced-motion`. |
| **Visual Breakdown / Image Prompt** | `visual-breakdown`, `prompt-generator`, `image-gen` (`@gen-img` -> `gen-img`) | Image-only `@visual-breakdown` -> smart 1–8 token-saver menu first; specific target -> 8-Layer Nano Banana 2.1 / ChatGPT prompt + `Seed` + `Negative Prompt`. |
| **Viral Content / Hooks / Ideation** | `social-media-research`, `generate-fresh-ideas`, `brainstorming` | 6-step Falco (`Save/Share/Retention`), 5-emotion hooks (`Score X/10`), beat-by-beat FYP recipes. |
| **Slide Deck (`/pdf-deck`, `/slide-design`)** | `pdf-deck` (+3 refs), `slide-design`, `taste-design` | Bespoke light/cream/bold/dark theme (`39` palettes), live 3-panel Studio (port 9223), zero-margin Vector PDF / PPTX / SVG. |
| **Flat Vector / Icons (`/svg-gen`)** | `svg-gen` (+`10-iron-laws`, `vector-math` refs) | 10 Iron Laws: 15+ MP, closed paths `Z`, 0 live strokes, `cairo_image=0`, RDF SEO metadata. |
| **CUDA 4K/8K Upscale (`/upscale-img`, `/boost`)** | `upscale-img` (+3 refs) | `4xNomos8kSCHAT-S.pth` + `spandrel`, 256px cosine feathering, Stock ratios (`16:9`/`1:1`/`3:4`), `exiv2`. |
| **TTS Voiceover (`/tts-gen`, `notif-tts`)** | `tts-gen` (+2 refs) | Gemini 3.8 Flash TTS + Edge fallback, 7 voices (`Koda` default), EBU R128 `-16 LUFS` mastering. |
| **Humanizer (`/humanizer`)** | `humanizer` (+3 refs) | Purge 26 Wikipedia AI patterns & Indo bureaucratic clichés; restore natural burstiness without inventing facts. |
| **Figma Design (`/figma-design`, FigCraft)** | `figma-design` (+refs), `figcraft-use`, `figma-create-ui`, `design-lint` | GSM v2.5 (58–65% warm cream space, `#FFD60A` pill, 88px margin), Dual-MCP + 40-rule `overlaps === 0` + Vision QA. |
| **Remotion Video (`/remotion`)** | `remotion` (+3 refs), `tts-gen` | 4-Stage Director, `@remotion/cli` `spring()`/`interpolate()`, `-14/-16 LUFS`, multi-frame still `read_file` check before MP4 render. |

---

## 4. Non-Negotiable Safeguards & Tier-2 Fallback

1. **4-Stage Web Discipline + Ask Gate:** `1. Style Preview -> 2. Plan + 12-File readme-ai-agent/ + Ask Confirm -> 3. Build -> 4. 7-Viewport Vision QA`.
2. **Zero Meta-Jargon Leak:** Never put internal terms (*Bento, Bento Grid, Hallmark, Nordic Precision, Hero Section*) in live customer website copy or headings; use authentic domain copy. Never output banned terminology.
3. **Visible Chrome GUI & AI Cursor HUD:** Launch Chrome non-headless via `skills/chrome-browser-control/scripts/launch-visible-chrome.sh 9223` + `cdp_visual_agent.py` (clean up with `done` when finished).
4. **Tier-2 Fallback (`find-skills`):** Only run `python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "<query ID/EN>"` (or `--remote`) when tasks need plugins (`djadi`, `tiar`, `firebase`, `science`) or external `skills.sh` tools outside the 45 core skills above.
