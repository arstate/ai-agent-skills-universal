---
name: opus-distills
description: DEFAULT MASTER BRAIN & UNIVERSAL AUTO-SKILL DISPATCHER — Use ALWAYS by default on ANY prompt or when the user ONLY tags /opus-distills or @opus-distills. Automatically detects user intent and finds/loads the exact specialist skills (web-master-agent, web-planning, web-design, web-builder, web-animation, web-debugging, web-optimization, taste-design, visual-breakdown, image-gen, prompt-generator, brainstorming, social-media-research, generate-fresh-ideas, pdf-deck, slide-design, chrome-browser-control, figma-design, figcraft-use, figma-create-ui, design-lint, design-review, design-creator, design-guardian, iconography, ui-ux-fundamentals, svg-gen, upscale-img, tts-gen, humanizer) without the user needing to tag individual sub-skills!
---

# `opus-distills` — Master Skill Orchestrator, Sub-Skill Auto-Loader & Zero-Quality-Loss Brain

`opus-distills` acts as the primary routing brain. Whenever the user tags `@opus-distills` or `/opus-distills` (or sends a general task prompt), `opus-distills` automatically matches the user's intent to the appropriate specialist sub-skills, loads their full `SKILL.md` instructions first, and executes the workflow step by step.

> **On-Demand Deep Reference:** Read `references/token-efficiency-and-cod-playbook.md` via `get_skill_resources` for `mksglu/context-mode`, Chain-of-Draft (CoD), and token-efficiency patterns.

---

## 1. Sub-Skill Auto-Loading Protocol (Always Read Target Sub-Skills Before Executing)

`opus-distills` is a dispatcher, not a replacement for the detailed instructions inside specialist skills. Relying only on this router file without reading the target sub-skill's `SKILL.md` leads to generic output.

### Step-by-Step Dispatch Sequence (Turn 1):
1. **Match Intent:** Identify the user's goal using the **Auto-Chaining Matrix** in Section 2 below.
2. **Load Specialist `SKILL.md` Files First:** Call `lookup_skills` (or `view_file` on the local skill directory) to read the complete `SKILL.md` and relevant `references/*.md` of the matched sub-skills *before* generating any design preview, plan, or code.
3. **Print Active Skill Receipt:** At the top of your response, display a single status line listing the sub-skills loaded for the current turn:
   `[Skills Auto-Loaded: opus-distills -> web-design + taste-design + Hallmark 58 Gates + 300-Ref Vault]`

---

## 2. Universal Intent-to-Skill Auto-Chaining Matrix

| # | User Prompt Intent | Specialist Sub-Skills to Load First (`lookup_skills` / `view_file`) | Core Execution Standard |
|---|---|---|---|
| **1** | **Design Style Examples / Visual Web Preview / Front-End Aesthetics** *(e.g. "contoh desain style webnya bro", "bikin tampilan web memukau")* | 1. `user:web-design`<br>2. `user:taste-design`<br>3. `web-design/references/the-4-pillars-of-web-design.md`<br>4. `web-design/references/14-pass-critique-rubric.md` (**48 `Nutlope/hallmark` Material Themes & 58 `sloplint` Gates**)<br>5. One category file `web-design/references/cat-01..10-*.md` (**300-Ref Vault**) | Enforce **The 4 Iron Pillars of Web Design**: (1) Tailwind CSS + OKLCH colors, (2) shadcn/ui (Radix primitives), (3) Lucide React single-icon standard, (4) Hallmark 48 Themes + 14-Pass Rubric. Curate **5–10 distinct styles** combining Hallmark Material Themes (*Nordic Precision, Blueprint CAD, Formwork Cast, Werkstatt, Atelier, Cobalt, Studio*) + Corporate Bento Grid with real industry photography, upright roman display typography, and an interactive style switcher (`design-style-preview.html`). |
| **2** | **Next Steps / User Flow / Step-by-Step Web Planning / New Web Project** *(e.g. "next steps alur web page user flow md trus planning step by step")* | 1. `user:web-planning`<br>2. `user:web-master-agent`<br>3. `user:web-design` | **Do not jump straight to building a raw `index.html` website during the planning phase!**<br>1. Check and initialize `./AGENTS.md` + all 12 files in `readme-ai-agent/`.<br>2. Author `USER_FLOW_AND_PAGE_ARCHITECTURE.md` (with visual Mermaid conversion flow & section anatomy).<br>3. Present the **#1 Co-Founder Stack Recommendation (Next.js 15 App Router Static Export or Fullstack Hybrid)** + 4-Stack Comparison Table + Step-by-Step Milestones, then ask the user to confirm before scaffolding production code. |
| **3** | **Production Website Coding / Component Build** | 1. `user:web-builder`<br>2. `user:web-design`<br>3. `user:web-animation`<br>4. `user:web-optimization` | Build using **The 4 Iron Pillars**: Next.js 15 + Tailwind CSS + OKLCH + shadcn/ui + Lucide React. Apply **Cold-Hero-First** review (`1280x800` fold fit, `padding-block-end >= 1.3x padding-block-start`), stamp line 1 of CSS with `/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 ... */`, enforce `html, body { overflow-x: clip }` and `minmax(0, 1fr)`, and keep footers 100% free of framework/theme meta-leaks. |
| **4** | **Self-Debugging / UI-UX Audit / Vision QA Check** *(e.g. "cek detail self debuging cek ui ux pake vision")* | 1. `user:web-debugging`<br>2. `web-design/references/14-pass-critique-rubric.md` (**58 `sloplint` Gates**)<br>3. `user:chrome-browser-control` | Run the **4-Phase `systematic-debugging` protocol**, **7-Layer Security Audit** (`SECURITY.md`), and **58-Gate Hallmark `sloplint` verification** across all 7 viewports (`360x800` to `1440x900`) using Vision inspection (`view_file`). |
| **5** | **Web Animations / GSAP / ScrollTrigger / SplitText / Flip** | 1. `user:web-animation`<br>2. `web-animation/references/gsap-and-real-case-animations.md` | Use `useGSAP`, `x/y/autoAlpha`, `gsap.quickTo()`, and `prefers-reduced-motion` fallbacks. |
| **6** | **Visual Breakdown / Image Prompt Generation (`@visual-breakdown`, `@image-gen`, `@prompt-generator`)** | 1. `user:visual-breakdown`<br>2. `user:prompt-generator`<br>3. `user:image-gen` | • **If user sends an image + `@visual-breakdown` without specifying the target part:** Ask back concisely with an **Adaptive Contextual Menu (1–8)** matching the real objects in the photo to save tokens.<br>• **If target is specified / number selected:** Immediately send the **8-Layer Super-Detailed Prompt for Nano Banana 2.1 & ChatGPT** complete with **`Seed`** and **`Negative Prompt`**. |
| **7** | **Viral Content FYP TikTok & IG / Video Audit / Hooks & Captions** | 1. `user:social-media-research`<br>2. `user:generate-fresh-ideas`<br>3. `user:brainstorming` | Apply the **6-Step Falco Pattern Analyst** (`Save/Share/Retention`), **5-Emotion Hook Lab + Persona Scroll Simulation (`Score X/10`)**, 3-Part Forensic Content Audit, and Beat-by-Beat FYP Recipes (`0–18s`). |
| **8** | **Slide Deck / Presentation / Pitch Deck / PPTX / PDF Generation (`@pdf-deck`, `/pdf-deck`, `@slide-design`)** *(e.g. "bikin slide presentation", "pitch deck startup", "generate slides", "export pptx / pdf")* | 1. `user:pdf-deck`<br>2. `user:slide-design`<br>3. `user:taste-design`<br>4. `pdf-deck/SKILL.md`<br>5. `pdf-deck/references/slide-design-and-export-guide.md`<br>6. `pdf-deck/references/theme-and-layout-catalog.md` | • **Phase 0 (Clarification & Creative Freedom):** Do not lock to dark mode only! Derive bespoke visual style matching the brief: Light Modes (McKinsey Consulting Cream, Academic Slate, Washi Ivory, Munich Neue Klasse), Vibrant Modes (Venture Pitch Cobalt, Bold Signal Coral, Creative Voltage Neon), or Minimalist Dark Modes (Obsidian Pure, Titanium Precision, Swiss Dark).<br>• **Phase 1 (Next.js Studio Auto-Open):** Auto-launch `pdf-deck dev <dir>` or `pdf-deck studio` in background. Visible Chrome GUI opens immediately on port 9223 displaying the 3-Panel Studio (left filmstrip, center fixed 16:9 canvas with ZERO overlay buttons, right inspector for 39 styles/text/elements/morph smooth transitions/multi-format export).<br>• **Phase 2 (Handover & Universal Vector Export):** Fullscreen F5 presentation, Topbar Light/Dark toggle with zero hydration mismatch, and instant export to Vector PDF (SVG Print), 4K Raster PDF, Editable PPTX (`python-pptx`), or pure SVG ZIP bundle. |
| **9** | **2D Flat Vector Graphics / Microstock Icons (`@svg-gen`, `/svg-gen`)** *(e.g. "buat vektor design yg bagus", "bikin icon set svg", "export adobe stock vector")* | 1. `user:svg-gen`<br>2. `svg-gen/SKILL.md`<br>3. `svg-gen/references/10-iron-laws-and-quality-gates.md`<br>4. `svg-gen/references/vector-math-and-compound-paths.md` | Enforce **The 10 Iron Laws**: 15+ MP artboard (`4000x4000` / `5000x3000`), 100% closed compound paths (`Z`), 0 live strokes (`stroke-to-path`), 0 opacity/raster filters (`cairo_image = 0`), zero-text rule, transparent icon sheet background, and automated Sensei SEO Dublin Core RDF metadata embedding. |
| **10** | **4K/8K AI Image Upscaling / Resolution Enhancement / Adobe Stock Sizing (`@upscale-img`, `/upscale-img`, `/boost`)** *(e.g. "upscale gambar ini bro", "boost resolusi ke 4k", "bikin 8k", "perbesar gambar buat stock")* | 1. `user:upscale-img`<br>2. `upscale-img/SKILL.md`<br>3. `upscale-img/references/hardware-and-models-guide.md`<br>4. `upscale-img/references/seamless-tiling-and-blend-math.md` | Execute hardware-accelerated CUDA upscaling on GTX 1660 SUPER using `4xNomos8kSCHAT-S.pth` via `spandrel`. Never use broken ONNX FP16 model (anti-NaN trap). Apply 256x256 cosine feather tiling (24px pad) for zero-seam 4X upscaling (16:9 `4096x2304`, 1:1 `4096x4096`, 3:4 `3072x4096`, JPEG Q98 subsampling=0) and preserve IPTC/XMP metadata via `exiv2`. |
| **11** | **AI Voiceover / Text-to-Speech / Gemini Flash TTS / Video Narration (`@tts-gen`, `/tts-gen`, `notif-tts`, `gemini-tts`)** *(e.g. "bikin voiceover reels", "generate suara narasi", "text to speech gemini", "baca teks ini")* | 1. `user:tts-gen`<br>2. `tts-gen/SKILL.md`<br>3. `tts-gen/references/voices-and-styles-guide.md`<br>4. `tts-gen/references/broadcast-loudness-and-remotion-guide.md` | Execute broadcast-grade TTS using **Gemini 3.8 Flash TTS** via multi-key router with auto-failover and Microsoft Edge-TTS fallback. Support 7 curated voices (`Koda` default, `Ludo`, `Aoede`, `Kore`, `Puck`, `Charon`, `Fenrir`), style tags (`<Friendly>`, `<Professional>`, `<Enthusiastic>`, `<Calm>`, `<Dramatic>`), and EBU R128 loudness mastering (`loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000`) for direct Remotion and video timeline integration. |
| **12** | **Anti-AI-Slop Prose Humanizer / Writing Style De-Roboting / Authentic Cadence (`@humanizer`, `/humanizer`, `anti-ai-slop`)** *(e.g. "kalimatnya masih ai slop", "humanize teks ini", "bikin tulisan lebih manusiawi", "hapus gaya ai")* | 1. `user:humanizer`<br>2. `humanizer/SKILL.md`<br>3. `humanizer/references/the-26-ai-patterns.md`<br>4. `humanizer/references/indonesian-ai-slop-guide.md`<br>5. `humanizer/references/voice-matching-and-cadence.md` | Eliminate **26 Wikipedia AI structural tells** (§1 not-X-but-Y, §2 one-line closers, §3 throat-clearing, §6 forced triads, §8 em-dash overuse, §12 stock buzzwords, §19 bold bullets) and **Indonesian bureaucratic clichés** (*"dalam era digital yang serba cepat", "tidak dapat dipungkiri", "merajut benang merah", "menyelami"*). Restore burstiness, varied sentence lengths, and natural human cadence without dropping facts or adding unconfirmed claims. |
| **13** | **Figma Design / Meta Ads Poster / Carousel 3:4 / FigCraft & Dual-MCP (`@figma-design`, `/figma-design`, `figcraft-use`, `figma-create-ui`, `design-lint`)** *(e.g. "bikin desain poster figma", "buat UI screen figma", "audit figma", "figma auto layout", "figcraft", "design-lint")* | 1. `user:figma-design`<br>2. `figma-design/SKILL.md`<br>3. `figma-design/references/high-impact-poster-and-ad-blueprints.md`<br>4. `figma-design/references/core-design-libraries-and-frameworks.md`<br>5. `figma-design/references/four-design-agent-applications.md`<br>6. `figma-design/references/40-rule-figma-quality-and-collision-gate.md`<br>7. `user:figcraft-use`<br>8. `user:figma-create-ui`<br>9. `user:design-lint` | Enforce **Master One-Shot Figma Design v6.0 (Minimal High-Impact Edition)** + **FigCraft Opinion Engine**: 58%-65% open warm cream negative space, max 3-4 containers, 88px safe margins (x=88..992, w=904px), editorial numbered typography with 1.5px hairline dividers, single #FFD60A yellow highlight pill, dedicated `02_HERO_IMAGE_DROP_ZONE` + AI photo brief, sleek 160px single-row conversion bar, 6 core libraries, 4 design agent applications, and 40-Rule quality gate (`overlaps === 0`) with closed-loop Vision verification (`read_file`). |

---

## 3. Four-Stage Web Delivery Pipeline (Zero Phase-Jumping)

```text
Stage 1 (Visual Style Showcase) -> Read web-design + taste-design + Hallmark 48 Themes + 300-Ref Vault -> Build interactive 5-10 style preview (`design-style-preview.html`) -> User picks style.
Stage 2 (User Flow & Stack Plan) -> Read web-planning + web-master-agent -> Initialize 12-file `readme-ai-agent/AGENTS.md` + `USER_FLOW_AND_PAGE_ARCHITECTURE.md` + Recommend Next.js 15 App Router (4-Stack Matrix) -> Confirm with user.
Stage 3 (Production Code Build)  -> Read web-builder + web-animation + web-optimization -> Build Cold-Hero-First + Full Next.js components + Git Restore Point.
Stage 4 (Forensic Vision & Lint) -> Read web-debugging + 58-Gate Hallmark `sloplint` -> Verify 7 viewports via Vision (`view_file`) + Log to `DESIGN-CRITIQUE.md` & `SECURITY.md`.
```


---

## 5. Golden Web Architecture Rules: Pre-Build Planning Gate & Zero Design-Jargon Leakage

Whenever the user requests a website, landing page, redesign, or web style preview, `opus-distills` enforces two strict engineering & copywriting safeguards across all dispatched sub-skills (`web-planning`, `web-design`, `taste-design`, `web-builder`, `web-debugging`, `web-master-agent`):

### Rule A — Mandatory Pre-Build Planning & User Confirmation Gate (Always Plan & Ask First!)
1. **Never Jump Straight into Coding a Full Website Without Planning & Asking First:**
   - If the user asks to create or build a website (e.g. *"bikin web untuk PT X"*, *"buatkan landing page"*, *"lanjut bikin web ini"*), do not immediately generate production code or dump a full `index.html`.
   - **Step 1 (Check & Ask for Missing Data / Preferences):** Load `web-planning/SKILL.md` and `anti-yes-man/SKILL.md`. If business data, target audience, conversion flow, design style, or tech stack (`Next.js 15 App Router Static Export` vs `Fullstack Hybrid` vs `Astro 5`) is not yet confirmed, present a concise **Co-Founder Pre-Flight Plan** (User Flow, Section Architecture, Tech Stack Recommendation, & Design Direction) and **ask the user to confirm** before coding.
   - **Step 2 (Lock `readme-ai-agent/AGENTS.md` + `USER_FLOW_AND_PAGE_ARCHITECTURE.md`):** Once the direction is clear, initialize `./AGENTS.md` + the 12 files in `./readme-ai-agent/` and `USER_FLOW_AND_PAGE_ARCHITECTURE.md`, then wait for the user's explicit confirmation before running `web-builder`.

### Rule B — Zero Meta-Design / Layout Jargon in Customer-Facing Website Copy (No "Bento" in Headings or Nav!)
1. **Never Leak Design-System or Layout Terms into Live Website Text:**
   - Words like **"Bento"**, **"Bento Grid"**, **"Hallmark"**, **"Nordic Precision"**, **"Blueprint Style"**, **"Formwork"**, **"Werkstatt"**, **"Hero Section"**, **"CTA Block"**, **"Macrostructure"**, **"Glassmorphism"**, or **"Editorial Card"** are **internal design-architecture instructions** for how CSS/HTML is structured—they are **never** customer-facing copy.
   - **Bad (Amateur Meta-Leakage):**
     - Navbar link: `BENTO SPESIFIKASI` (Forbidden!)
     - Section Heading: `Bento Spesifikasi Teknis Pemesinan` (Forbidden!)
     - Subtitle / Badge: `Nordic Precision Bento Layout` (Forbidden!)
   - **Good (Authentic Domain Copy while using a Bento CSS Grid visually):**
     - Navbar link: `SPESIFIKASI MESIN` or `KAPABILITAS`
     - Section Heading: `Spesifikasi Teknis & Kapasitas Pemesinan`
     - Subtitle / Badge: `KAPABILITAS PERALATAN WORKSHOP · GEDANGAN, SIDOARJO`
   - *Exception:* Only inside a temporary **style-selector toolbar** (`design-style-preview.html` switcher bar at the top of the screen) may you label the buttons with style names (`1. Nordic Precision`, `2. Blueprint CAD`, etc.) so the user can pick a style. Even inside that preview's actual simulated webpage content, all headings, navbars, and paragraphs must use 100% real industry copy.


### Rule C — Visible Chrome GUI Window & Live AI Visual Cursor HUD (`chrome-browser-control`)
1. **Always Show the Browser Window & AI Cursor When Controlling Chrome:**
   - Whenever opening a preview (`design-style-preview.html`), testing a web app (`localhost:3000`), or automating browser actions via `chrome-browser-control`, **always launch a visible GUI Chrome window** (`bash skills/chrome-browser-control/scripts/launch-visible-chrome.sh 9223 "<url>"` — never hidden headless mode on a user desktop).
   - Always inject `skills/chrome-browser-control/scripts/ai-cursor-hud.js` (or run `python3 skills/chrome-browser-control/scripts/cdp_visual_agent.py`) so the user sees the **Live AI Neon Cursor gliding**, **Amber Target Highlight Box**, **Click Ripple Animation**, and **Bottom-Right Live Activity HUD** for every click, type, and scroll action.

