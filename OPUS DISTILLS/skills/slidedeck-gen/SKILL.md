---
name: slidedeck-gen
description: Autonomous AI Slide Deck & Presentation Engine. Generates high-aesthetic 16:9 web decks, interactive in-browser consoles, live Chrome CDP preview/editor with AI Cursor HUD, real-time hot-reload, and high-fidelity PDF/PPTX exporters.
---

# `slidedeck-gen` — Autonomous 16:9 Presentation, Live CDP Editor & PDF Slide Deck Engine

`slidedeck-gen` generates publication-grade, responsive 16:9 widescreen presentation decks. It supports both rapid Markdown slide authoring and structured multi-variant JSON specifications across 12 built-in design themes and 1,020 layout systems. Every generated presentation features live Chrome CDP auto-open with a real-time AI Cursor HUD, instantaneous hot-reload as slides are written, an in-browser live editor with auto-save persistence to disk, and export to vector-crisp PDF or fully editable PowerPoint (`.pptx`) files.

---

## 0. Mandatory Pre-Flight Clarification Gate (Anti-Guessing Protocol)

When a user requests a presentation, slide deck, pitch deck, or PDF report:
**DILARANG KERAS MENEBAK DATA ATAU LANGSUNG MEMBUAT SLIDE TANPA DETAIL JELAS!**
If the user's prompt is underspecified (lacking theme, slide count, audience, or content substance), the AI Agent **WAJIB** directly halt execution and send the **Structured Briefing & Clarification Menu**:

### 📋 Interactive Briefing & Clarification Menu:
```markdown
Halo Bro! Biar hasil slide deck-nya maksimal, berkelas, dan langsung tepat sasaran ke audiens lu, tolong konfirmasi beberapa poin ini dulu ya:

1. 🎨 **Pilihan Visual Theme (12 Curated Themes):**
   - [ ] `Cyber Glow` (Dark slate, emerald/cyan neon glow, tech/AI keynote)
   - [ ] `Tech Code` (Terminal IDE dark, monospace accents, engineering architecture)
   - [ ] `Soft Neumorphism` (Clean modern light, subtle recessed cards, SaaS/product)
   - [ ] `Glassmorphism` (Translucent frosted blur, modern gradient accents, consumer apps)
   - [ ] `Data Spectrum` (High-contrast analytics, white background, structured KPI data)
   - [ ] `Dark Graph` (Connected network nodes, systems precision, dark deep tech)
   - [ ] `Crisp Whitepaper` (Scholarly editorial, alabaster background, consulting/academic)
   - [ ] `Noir Luxe` (Obsidian black, metallic champagne gold, executive luxury pitch)
   - [ ] `Editorial Magazine` (Midnight navy, asymmetric broadsheet balance, brand narrative)
   - [ ] `Financial Index` (Monospace numerals, ticker tape, hedge fund/quarterly earnings)
   - [ ] `High Growth` (Cobalt & amber energy, bold metric cards, VC pitch deck)
   - [ ] `Sonic Neon` (Vibrant pink/purple contrast, creative agency, entertainment)
   *(Atau sebutkan warna hex brand / referensi custom lu)*

2. 📁 **Referensi Desain / Aset Brand:**
   - Apakah ada file referensi PDF, contoh desain gambar (.png/.jpg), website acuan, atau panduan logo/warna brand yang mau lu lampirkan? (Kirim path file atau link-nya)

3. 📑 **Jumlah Slide & Ritme Pembahasan (Pacing):**
   - [ ] 5–8 Slide (Concise Lightning Pitch / Executive Briefing)
   - [ ] 10–14 Slide (Standard Investor Pitch Deck / Business Proposal)
   - [ ] 15–20+ Slide (Deep Technical Architecture / Comprehensive Masterclass)

4. 🎯 **Target Audiens & Tujuan Utama:**
   - Siapa yang akan membaca slide ini? (VC/Investor, Direksi/Executive Board, Klien B2B, Tim Engineering Internal, atau Peserta Seminar/Webinar?)
   - Apa pesan utama (1 single core takeaway) yang wajib diingat audiens setelah melihat slide ini?

5. 📦 **Format Deliverable Akhir yang Diinginkan:**
   - [ ] Interactive In-Browser Live Deck (bisa dipresentasikan full-screen di browser + diedit live)
   - [ ] Vector Crisp PDF (resolusi cetak 16:9 ultra-tajam, zero-margin)
   - [ ] Editable PowerPoint (.pptx)
   - [ ] Ketiganya (All-In-One Deliverable)
```

---

## 1. Live Chrome CDP Auto-Open & Real-Time Sync Engine

When the user confirms the brief and the AI agent begins crafting the slide deck:

1. **Immediate Live Preview Startup & Visible Chrome Auto-Open:**
   - The AI agent immediately starts the live dev server in the background:
     ```bash
     slidedeck-gen dev my-deck --theme cyber-glow
     ```
   - This automatically creates the project directory, compiles an initial cover slide, spins up the preview server (default `http://127.0.0.1:5200`), and launches **visible headed Chrome** via CDP on port `9223`.
   - The Live AI Cursor HUD (`ai-cursor-hud.js`) is automatically injected into the browser window with the live badge:
     `"Building Slide Deck Live..."`
2. **Progressive Live Slide Crafting:**
   - As the agent writes each slide into `my-deck/deck.md` or `goal.json`, the dev server automatically recompiles `index.html` within `< 25ms` and triggers instant hot-reload via Server-Sent Events (SSE).
   - The user watches their presentation materialize slide by slide in real-time directly on their monitor!
3. **Session Handover to In-Browser Live Editor:**
   - Once all slides are generated, the agent runs:
     ```bash
     slidedeck-gen done
     ```
   - The HUD transitions to `"✅ Slide Deck Ready — In-Browser Live Editor Active"` and fades out, leaving the headed Chrome window open.
   - The user can immediately click any headline, paragraph, metric card, or bullet point directly on screen to edit text in place.
   - Every edit is automatically persisted to disk via the server's `/api/deck/persist` endpoint.

---

## 2. Core Architecture & Visual Standards

All slide decks generated by `slidedeck-gen` adhere to strict presentation engineering rules:

1. **Standard 16:9 Aspect Ratio Canvas:**
   - Base resolution: `1920 × 1080 px` (Full HD presentation standard).
   - Responsive scaling: Slides adapt fluidly to any viewport using CSS container queries or `transform: scale()` while maintaining an exact 16:9 frame.
   - Print CSS specification:
     ```css
     @page {
       size: 16in 9in;
       margin: 0;
     }
     @media print {
       html, body {
         width: 1920px;
         height: auto;
         margin: 0;
         padding: 0;
         background: transparent;
       }
       .slide {
         position: relative;
         width: 1920px;
         height: 1080px;
         page-break-after: always;
         break-after: page;
         overflow: hidden;
       }
     }
     ```
2. **Typography & Optical Contrast:**
   - Upright Roman display fonts for primary slide headers; zero unrequested italic headings.
   - High legibility font pairings: Space Grotesk / Inter, Archivo / IBM Plex Sans, Anton / Space Mono.
   - Strict contrast ratio: Lightness difference between text and background satisfies `|L_text - L_bg| >= 0.50` in OKLCH color space.
3. **Data Density & Clean Layout Rules:**
   - Single core message per slide: One dominant headline, supporting contextual telemetry or metrics, clean card grid.
   - Zero text truncation or awkward single-word wrapping (`text-wrap: balance` on headings, `whitespace-nowrap` on key metrics and labels).
   - Structural deviation: Avoid monotonous repeating card layouts; combine key numbers with telemetry bands, timeline flows, or comparison matrices.

---

## 3. Multi-Format Authoring Modes

`slidedeck-gen` accepts three complementary authoring workflows:

### Mode A: Rapid Markdown Slides (`.md`)
Fastest method for technical briefs, pitch decks, and architectural proposals. Slides are delimited by standard horizontal rules (`---`):

```markdown
<!-- theme: cyber-glow -->
<!-- transition: slide -->

# Distributed Consensus Architecture
### Engineering Deep Dive & Fault Tolerance Analysis
<!-- layout: cover -->

---

<!-- layout: metrics -->
## Core Performance Benchmarks
Key metrics across 128 validation nodes in the cluster.

- **Throughput:** 45,000 TPS (Sub-second finality)
- **P99 Latency:** 12 ms (Global mesh network)
- **Uptime:** 99.999% (Zero planned downtime)
- **Packet Loss:** < 0.001% (BGP multi-homed)

---

<!-- layout: split -->
## Storage Layer Partitioning
Left column explains storage orchestration; right column displays layout diagram or telemetry cards.

- Append-only write-ahead log (WAL) on NVMe
- Segmented LSM-tree compaction strategy
- Multi-region cross-datacenter replication
```

### Mode B: Structured 12-Theme Presentation Engine (`goal.json`)
For high-density executive presentations, strategic consulting decks, and investor roadshows:
- Uses Schema v2 JSON specifications.
- Supports 12 curated visual themes and 1,020 pre-built layout variants across 20 layout roles (cover, table of contents, metrics, trends, comparison, flow, risks, architecture, SWOT, radar, funnel, ending).
- Provides 3 template variants + 1 bespoke variant per logical slide.
- Generated via `slidedeck-gen compile <goal.json> --out output/deck/ppt`.

### Mode C: Bespoke HTML/CSS Slides
For custom interactive presentations with GSAP micro-interactions, canvas diagrams, or dynamic data widgets.

---

## 4. The 12 Built-in Visual Themes

| Theme ID | Style Name | Recommended Scenarios | Visual Characteristics |
|---|---|---|---|
| `theme01` | **Soft Neumorphism** | Product intros, corporate briefings, SaaS proposals | Clean modern surfaces, subtle inner shadows, refined grey/blue palette |
| `theme02` | **Cyber Glow** | AI keynotes, autonomous systems, tech launches | Deep slate background, vivid emerald/cyan glow accents, bold telemetry |
| `theme03` | **Tech Code** | Engineering architecture, developer conferences, docs | Dark terminal aesthetic, monospace accents, syntax badge containers |
| `theme04` | **Glassmorphism** | Consumer apps, creative portfolios, modern design | Frosted glass backdrop blur, pastel gradients, vibrant card borders |
| `theme05` | **Data Spectrum** | Analytics reports, market research, KPI teardowns | High-contrast multi-color chart palettes, structured data cards |
| `theme06` | **Dark Graph** | Network architecture, systems analysis, deep tech | Dark blue-grey background, connected nodes, structural grid lines |
| `theme07` | **Crisp Whitepaper** | Consulting whitepapers, academic research, policy | Alabaster background, editorial serif accents, razor-sharp rules |
| `theme08` | **Noir Luxe** | Executive proposals, luxury brand pitches, keynote | Deep obsidian black, subtle metallic gold accents, generous negative space |
| `theme09` | **Editorial Magazine** | Founder profiles, brand stories, strategic essays | Classic editorial typography, deep navy background, rich typographic hierarchy |
| `theme10` | **Financial Index** | Hedge fund reviews, financial earnings, quarterly reports | Monospace numerals, ticker tapes, gold and slate financial badges |
| `theme11` | **High Growth** | Startup pitch decks, VC fundraising, growth roadmaps | High-energy cobalt/amber palette, bold stat callouts, dynamic cards |
| `theme12` | **Sonic Neon** | Event keynotes, entertainment, creative media | High-contrast dark canvas, neon pink/purple accents, soundwave motifs |

---

## 5. CLI Tools Suite & Command Reference

The `slidedeck-gen` CLI is located in `bin/slidedeck-gen.mjs`.

### 1. Start Live Dev Server & Auto-Open Visible Chrome CDP:
```bash
# Starts live dev server + auto-opens visible headed Chrome on port 9223 with AI Cursor HUD:
slidedeck-gen dev my-pitch-deck --theme cyber-glow

# Or specify custom port:
slidedeck-gen dev my-pitch-deck --port 5200 --theme noir-luxe
```

### 2. Finalize Session & Handover Editor:
```bash
slidedeck-gen done
```

### 3. Scaffold a New Presentation:
```bash
slidedeck-gen init my-pitch-deck --template pitch-deck
# Available templates: pitch-deck, technical-architecture, quarterly-business-review, minimal-executive
```

### 4. Compile Markdown or JSON to 16:9 Presentation HTML:
```bash
# Compile Markdown to standalone HTML presentation:
slidedeck-gen compile my-pitch-deck/deck.md --out output/deck --theme cyber-glow

# Compile structured JSON specification:
slidedeck-gen compile my-pitch-deck/goal.json --out output/deck/ppt
```

### 5. Launch Live Preview Server with Real-Time Persistence:
```bash
slidedeck-gen serve output/deck --port 5200 --open
```

### 6. Export High-Fidelity PDF via Chrome CDP:
```bash
slidedeck-gen export-pdf output/deck --out output/deck/presentation.pdf
```
- Uses headless Chrome CDP `Page.printToPDF` with `@media print`, zero margin, `printBackground: true`, and exact 16:9 landscape dimensions.
- Yields crisp, vector-rendered text, charts, and diagrams.

### 7. Export Editable PowerPoint (`.pptx`):
```bash
slidedeck-gen export-pptx output/deck --out output/deck/presentation.pptx
```
- Reconstructs shapes, layout cards, and editable text boxes node by node via `python-pptx`.

### 8. Interactive Visual Review via Visible Chrome CDP:
```bash
slidedeck-gen review output/deck --port 9223
```

---

## 6. Presentation Deck Studio UI & Filmstrip Editor (Dashi & Frontend-Slides Standard)

Every slide deck generated by `slidedeck-gen` provides a professional in-browser presentation studio interface:
1. **Top Navigation Bar (`#deck-topbar`):**
   - Brand logo and live deck title.
   - Dynamic slide counter badge (`1 / 8`) and `🟢 Live Sync` pulse indicator.
   - **`+ Add Slide` Menu:** Quick-add Cover, Bento Grid, Metric Cards, Asymmetric Split, Progression Flow, Quote Spotlight, or Standard Slide.
   - **Live Theme Switcher:** Instant runtime switching between 18+ visual themes with zero reload.
   - **`▶ Present` Button:** Fullscreen F5 presentation mode (hides editor chrome, expands 16:9 stage).
   - **`⬇ Export` Dropdown:** Instant one-click export to Vector PDF (`window.print` / CDP), PowerPoint (`.pptx`), or Standalone HTML bundle.
   - **`✎ In-Place Edit` Toggle:** Enables inline editing across all headings, body texts, cards, and metrics with auto-save.
2. **Left Sidebar Filmstrip Rail (`#slide-rail`):**
   - Live interactive 16:9 thumbnail previews for every slide.
   - Active slide highlighting and smooth scroll-into-view.
   - Hover action buttons: Duplicate (`❐`), Move Up (`▲`), Move Down (`▼`), and Delete (`✕`).
   - Collapsible via `◀` toggle button or keyboard shortcut `T`.
3. **Fluid Responsive 16:9 Stage (`.slide-stage`):**
   - Dynamically scales based on remaining viewport space between topbar and filmstrip.
   - High-fidelity typography, crisp vector rendering, zero blur, zero text overflow.
4. **Keyboard Shortcuts:**
   - `Right Arrow` / `Space` / `PageDown` / `J`: Next slide.
   - `Left Arrow` / `PageUp` / `K`: Previous slide.
   - `F5` / `F`: Toggle Fullscreen Presentation Mode.
   - `E`: Toggle In-Place Edit Mode.
   - `P`: Print / Export to PDF.
   - `T`: Toggle Slide Rail Filmstrip.
   - `Home` / `End`: First / last slide.
   - `Esc`: Exit Present mode or close active dropdowns.

---

## 7. Supporting Design References & Templates

| File | Purpose |
|---|---|
| [references/frontend-slides-design-patterns.md](references/frontend-slides-design-patterns.md) | Full design system: 12 visual themes, typography pairings, and 7 core layout archetypes inspired by Zara Zhang's `frontend-slides` |
| [references/theme-and-layout-catalog.md](references/theme-and-layout-catalog.md) | Catalog of 12 themes and 1,020 layout systems |
| [references/slide-design-and-export-guide.md](references/slide-design-and-export-guide.md) | Vector PDF export, print CSS guidelines, and PPTX mapping rules |
| [templates/frontend-slides-editorial.md](templates/frontend-slides-editorial.md) | High-fashion / tech editorial pitch deck template |
| [templates/frontend-slides-bento-grid.md](templates/frontend-slides-bento-grid.md) | Bento grid showcase & product launch template |
| [templates/frontend-slides-bold-signal.md](templates/frontend-slides-bold-signal.md) | High-impact startup memorandum template |
| [templates/frontend-slides-metric-spotlight.md](templates/frontend-slides-metric-spotlight.md) | Metric-driven investor update & data presentation template |

---

## 8. End-to-End Autonomous Agent Execution Protocol

When a user asks for a presentation, slide deck, pitch deck, or PDF report:
1. **Phase 0: Clarification Gate:** Check if prompt has theme, slide count, audience, and content. If missing, send the **Interactive Briefing & Clarification Menu** and wait for user response.
2. **Phase 1: Spin Up Live Dev & Chrome CDP:** Launch `slidedeck-gen dev <deck-dir> --theme <theme>` in background. Chrome opens immediately on screen with the Live AI Cursor HUD showing `"Building Slide Deck Live..."`.
3. **Phase 2: Progressive Slide Authoring:** Write slides progressively into `deck.md` or `goal.json` using the layouts in `references/frontend-slides-design-patterns.md`. With each write, the server automatically recompiles within 25ms and hot-reloads the browser view.
4. **Phase 3: Handover to Live Editor:** Call `slidedeck-gen done`. HUD displays `"✅ Slide Deck Ready — In-Browser Live Editor Active"`.
5. **Phase 4: Export Deliverables:** Run `slidedeck-gen export-pdf` and `slidedeck-gen export-pptx`. Deliver local URL, vector PDF path, and PPTX path to user.
