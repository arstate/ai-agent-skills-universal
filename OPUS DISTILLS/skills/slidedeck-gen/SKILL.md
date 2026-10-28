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

### ⛔ HUKUM BESI #1: DILARANG MEMBUAT KARTU DASHBOARD DASHI (`goal.json`) YANG MEMBOSANKAN!
**Kesalahan Fatal Output Jelek:** Dashi PPT (`goal.json`) menghasilkan tata letak kartu pengembang yang seragam, kaku, berbingkai cyan rounded (`border-radius: 12px`), dark navy, dan progress bar di setiap kartu. Hasilnya terlihat seperti dashboard monitoring server amatir, BUKAN presentasi berkelas!
**ATURAN MUTLAK AGEN:**
1. **DILARANG** meng-generate `goal.json` dengan komponen kartu seragam Dashi untuk presentasi eksekutif/klien.
2. **WAJIB OTOMATIS** memilih salah satu dari **34 Zara Zhang Bold Archetypes (`frontend-slides`)** di `templates/archetypes/<slug>/`:
   - **AI / Deep Tech / Frontier:** `signal` (Obsidian gold, serif 80pt, hairline rules), `cobalt-grid` (Engineering systems), `8-bit-orbit`.
   - **Executive / Strategy / Pitch:** `capsule` (Pill badges, clean slate), `broadside` (Monochrome broadsheet), `blue-professional`.
   - **Keynote / Product Launch:** `studio` (Sculptural serif, high contrast), `creative-mode` (Vibrant gradient), `sakura-chroma`.
   - **Desain Modern Tegas / Bento:** `neo-grid-bold` (High-contrast bento grid), `cartesian`, `block-frame`.
   - **Editorial / Advisory / Luxury:** `editorial-forest` (Deep emerald & cream), `soft-editorial`, `vellum`.
3. **Anatomi Desain Agency-Grade (Zara Zhang Standard):**
   - **Cover (`slide--cover`):** Display font berbobot (`Source Serif 4`, `Archivo`, atau `Syne`), italic accent warna emas/aksen halus, hairline divider 1px, 0 kartu rounded tebal.
   - **Asymmetric Split (`slide--split`):** Rasio 60/40, judul deklaratif tegas di kiri + poin bukti komparatif di kanan.
   - **Hero Stats (`slide--stats`):** Angka metrik raksasa (64pt–96pt `tabular-nums`) dengan micro-label di bawahnya, BUKAN progress bar dashboard!
   - **Pillars / Architecture (`slide--pillars`):** 3–4 kolom vertikal dipisahkan garis rambut (*hairline rules*), ruang napas (*negative space*) minimal 40%.
   - **Quote / Takeaway (`slide--quote`):** Perubahan latar belakang kontras (*full-bleed*), tanda kutip raksasa, atribusi tajam.

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
# Browse all 34 available Zara Zhang presentation archetypes:
slidedeck-gen list-templates

# Scaffold directly from any of the 34 bold archetypes (e.g. signal, studio, neo-grid-bold, capsule):
slidedeck-gen init my-pitch-deck --template signal --title "Executive Strategic Intelligence"

# Or scaffold standard starter template:
slidedeck-gen init my-pitch-deck --template pitch-deck
# Available templates: signal, studio, neo-grid-bold, capsule, editorial-forest, cobalt-cad, pitch-deck, technical-architecture, quarterly-business-review, minimal-executive
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

### 9. Verify & Install PDF & PPTX Deck Engines:
```bash
# Automated environment diagnostic and engine dependency installer:
slidedeck-gen install-engine
# Or run direct shell script:
bash scripts/install-engine.sh

# Direct shell script PDF exporter:
bash scripts/export-pdf.sh output/deck/presentation.html output/deck/presentation.pdf
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
| [references/slide-design-rules.md](references/slide-design-rules.md) | **Master Slide Design Rules:** Strict 16:9 canvas limits, 40% breathing room, single focal point, asymmetric split 60/40 rule, bento matrix limits, and zero-clutter guarantee |
| [templates/archetypes/](templates/archetypes/) | **Full 34 Zara Zhang Production Archetypes:** Complete HTML (`template.html`), spec (`design.md`), tokens (`template.json`), and stage runner (`deck-stage.js`) for all 34 presentation archetypes from `zarazhangrui/beautiful-html-templates` & `frontend-slides` |
| [references/bold-archetypes/](references/bold-archetypes/) | **Full 34 Design Archetype Directory:** Each contains `design.md` (exact CSS tokens, typography scales, colors) and `preview.md` (sample slide layout) |
| [references/bold-template-catalog.md](references/bold-template-catalog.md) | Comprehensive catalog of all 34 design archetypes from `frontend-slides/bold-template-pack` |
| [references/bold-templates-manifest.json](references/bold-templates-manifest.json) | Structured metadata manifest of 34 template styles for automated AI agent selection |
| [references/style-presets-reference.md](references/style-presets-reference.md) | Typography and color palette presets across corporate, editorial, technical, and consumer decks |
| [references/dashi-layout-roles.md](references/dashi-layout-roles.md) | The 20 presentation layout roles (cover, agenda, problem, solution, metrics, comparison, timeline, architecture, etc.) |
| [references/dashi-options-reference.md](references/dashi-options-reference.md) | Multi-variant JSON goal spec options and layout configuration |
| [references/animation-patterns-reference.md](references/animation-patterns-reference.md) | Slide transition and micro-interaction patterns |
| [references/standalone-html-reference.md](references/standalone-html-reference.md) | Standalone single-file HTML slide deck reference architecture |
| [references/frontend-slides-design-patterns.md](references/frontend-slides-design-patterns.md) | Full design system: 12 visual themes, typography pairings, and 7 core layout archetypes inspired by Zara Zhang's `frontend-slides` |
| [references/theme-and-layout-catalog.md](references/theme-and-layout-catalog.md) | Catalog of 12 themes and 1,020 layout systems |
| [references/slide-design-and-export-guide.md](references/slide-design-and-export-guide.md) | Vector PDF export, print CSS guidelines, and PPTX mapping rules |
| [templates/frontend-slides-editorial.md](templates/frontend-slides-editorial.md) | High-fashion / tech editorial pitch deck template |
| [templates/frontend-slides-bento-grid.md](templates/frontend-slides-bento-grid.md) | Bento grid showcase & product launch template |
| [templates/frontend-slides-bold-signal.md](templates/frontend-slides-bold-signal.md) | High-impact startup memorandum template |
| [templates/frontend-slides-metric-spotlight.md](templates/frontend-slides-metric-spotlight.md) | Metric-driven investor update & data presentation template |
| [templates/frontend-slides-creative-mode.md](templates/frontend-slides-creative-mode.md) | Cyber neon & high-voltage product launch keynote template |
| [templates/frontend-slides-cobalt-cad.md](templates/frontend-slides-cobalt-cad.md) | Engineering systems architecture & telemetry spec sheet template |
| [templates/frontend-slides-neo-grid-swiss.md](templates/frontend-slides-neo-grid-swiss.md) | Swiss clean Bento grid corporate strategy template |
| [templates/frontend-slides-soft-editorial.md](templates/frontend-slides-soft-editorial.md) | Warm cream paper literary advisory briefing template |

---

## 8. End-to-End Autonomous Agent Execution Protocol

When a user asks for a presentation, slide deck, pitch deck, or PDF report:
1. **Phase 0: Clarification Gate:** Check if prompt has theme, slide count, audience, and content. If missing, send the **Interactive Briefing & Clarification Menu** and wait for user response.
2. **Phase 1: Automated Archetype Selection & Scaffold:**
   - Automatically match the topic to the best Zara Zhang archetype (`signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`, etc.).
   - Scaffold the presentation project:
     ```bash
     slidedeck-gen init <deck-dir> --template <archetype-slug> --title "<Presentation Title>"
     ```
3. **Phase 2: Spin Up Live Dev & Chrome CDP:** Launch `slidedeck-gen dev <deck-dir>` in background. Chrome opens immediately on screen with the Live AI Cursor HUD showing `"Building Slide Deck Live..."`.
4. **Phase 3: High-End Editorial Slide Authoring:**
   - Customize `<deck-dir>/index.html` with the user's content using the native Zara Zhang slide components (`slide--cover`, `slide--chapter`, `slide--split`, `slide--stats`, `slide--pillars`, `slide--quote`).
   - Strictly follow the 40% breathing room rule, high-contrast serif typography, hairline dividers, and zero repetitive dashboard boxes.
   - Hot-reload updates the browser in real time.
5. **Phase 4: Handover to Live Editor:** Call `slidedeck-gen done`. HUD displays `"✅ Slide Deck Ready — In-Browser Live Editor Active"`.
6. **Phase 5: High-Fidelity PDF Export:**
   - Run `slidedeck-gen export-pdf <deck-dir> --out <deck-dir>/presentation.pdf`.
   - Chrome CDP executes `@media print` 16:9 page breaking, exporting vector-crisp multi-page PDF.
   - Deliver the local URL, vector PDF path, and presentation overview to the user.
