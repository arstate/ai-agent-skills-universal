---
name: pdf-deck
description: Autonomous Multi-Aesthetic 16:9 Presentation Studio & High-Fidelity PDF/PPTX Deck Engine. Built on Next.js 16/Turbopack with 39 curated palettes across Light Mode, Cream Editorial, Bold Accent, and Minimalist Monochrome Dark. Supports 34 Zara Zhang bold archetypes, live Chrome CDP auto-open with real-time AI Cursor HUD, interactive in-browser live editor with auto-save persistence to disk, decoupled Studio UI shell vs unrestricted slide canvas, arbitrary standalone HTML slide rendering (1-slide = 1 HTML file standard), and multi-format vector PDF (SVG print zero-margin), raster 4K PDF, editable PPTX (python-pptx), and pure SVG output.
---

# `pdf-deck` — Autonomous Multi-Aesthetic Presentation Studio & High-Fidelity 16:9 PDF/PPTX Deck Engine

`pdf-deck` is the supreme, unified presentation studio and slide deck engine combining the modern Next.js 16/Turbopack interactive presentation workstation with the autonomous zero-margin 16:9 vector PDF and PowerPoint (`.pptx`) generation pipeline. It empowers AI agents and human creators with uncompromising editorial design freedom across all aesthetic lineages: Light Mode, Cream Editorial, Bold Accent, and Minimalist Monochrome Dark.

---

## 0. Mandatory Pre-Flight Clarification Gate (Anti-Guessing Protocol)

When a user requests a presentation, slide deck, pitch deck, or PDF report:
**DILARANG KERAS MENEBAK DATA ATAU LANGSUNG MEMBUAT SLIDE TANPA DETAIL JELAS!**
If the user's prompt is underspecified (lacking theme, slide count, audience, or content substance), the AI Agent **WAJIB** directly halt execution and send the **Structured Briefing & Clarification Menu**:

### Structured Briefing & Clarification Menu:
```markdown
Halo Bro! Biar hasil slide deck-nya maksimal, berkelas, dan langsung tepat sasaran ke audiens lu, tolong konfirmasi beberapa poin ini dulu ya:

1. Pilihan Visual Theme (39 Curated Themes):
   - [ ] Light & Cream Editorial: McKinsey/BCG Consulting Cream (#F7F5F2), Academic Slate, Zara Zhang Soft Editorial, Zara Zhang Vellum, Munich Bauhaus
   - [ ] Bold & Vibrant Modern: Venture Pitch Cobalt (#2563EB), Bold Signal Coral (#FF5722), Electric Studio Royal Split, Creative Voltage Neon Lime
   - [ ] Minimalist Monochrome Dark & Tech: Obsidian Pure (#000000), Titanium Precision, Swiss Modernist Dark, Editorial Noir, Graphite Telemetry, Signal Gold
   *(Atau sebutkan warna hex brand / referensi custom lu)*

2. Referensi Desain / Aset Brand:
   - Apakah ada file referensi PDF, contoh desain gambar (.png/.jpg), website acuan, atau panduan logo/warna brand yang mau lu lampirkan? (Kirim path file atau link-nya)

3. Jumlah Slide & Ritme Pembahasan (Pacing):
   - [ ] 5–8 Slide (Concise Lightning Pitch / Executive Briefing)
   - [ ] 10–14 Slide (Standard Investor Pitch Deck / Business Proposal)
   - [ ] 15–20+ Slide (Deep Technical Architecture / Comprehensive Masterclass)

4. Target Audiens & Tujuan Utama:
   - Siapa yang akan membaca slide ini? (VC/Investor, Direksi/Executive Board, Klien B2B, Tim Engineering Internal, atau Peserta Seminar/Webinar?)
   - Apa pesan utama (1 single core takeaway) yang wajib diingat audiens setelah melihat slide ini?

5. Format Deliverable Akhir yang Diinginkan:
   - [ ] Interactive In-Browser Live Studio (Next.js 16 presentation studio + WYSIWYG editor)
   - [ ] Vector Crisp PDF (resolusi cetak 16:9 ultra-tajam, zero-margin SVG print)
   - [ ] Editable PowerPoint (.pptx via python-pptx)
   - [ ] Ketiganya (All-In-One Deliverable)
```

---

## 1. Live Chrome CDP Auto-Open & Real-Time Sync Engine

### HUKUM BESI: WAJIB BUKA PREVIEW ENGINE LIVE DI DETIK PERTAMA SEBELUM NGODING SLIDE!
Ketika user meminta dibuatkan slide deck, presentasi, atau PDF:
**DILARANG KERAS ngoding slide diam-diam di background baru menunjukkan hasilnya di akhir!**
Agen **WAJIB** mengeksekusi perintah ini di Detik 0 sebelum menulis konten slide:

```bash
pdf-deck dev <deck-dir> --template <archetype-slug> --title "<Presentation Title>" --daemon
```

Tindakan otomatis yang langsung terjadi:
1. **Auto-Scaffold Template:** Jika folder belum ada, otomatis scaffold template pilihan dari 34 Zara Zhang Archetypes (default: `signal`).
2. **Background Daemon Preview Server:** Server live preview aktif di `http://127.0.0.1:5200` tanpa memblokir terminal agen.
3. **Chrome GUI Non-Headless Terbuka:** Jendela Google Chrome langsung muncul di layar monitor user via CDP port `9223` (bukan sembunyi-sembunyi).
4. **Live Studio HUD & In-Place Editor Aktif:**
   - Topbar: `[LIVE PREVIEW]` + Status aktivitas AI live.
   - In-place inline edit: User bisa klik teks judul, angka, atau paragraf mana pun di layar untuk mengetik langsung.
   - Real-time auto-save: Setiap ketikan user langsung otomatis tersimpan ke disk via `/api/deck/persist`.
   - Tombol instan: `[⬇ Export PDF]`, `[⬇ Export PPTX]`, dan `[▶ F5 Fullscreen]`.
5. **Real-Time Live Authoring:**
   - Sambil jendela browser terbuka di layar user, agen menulis/mengupdate `<deck-dir>/index.html`.
   - Browser otomatis reload dalam < 50ms via Server-Sent Events (SSE).
   - User melihat slide demi slide terisi dan bergerak secara real-time di depan matanya!

---

## 2. Core Visual & UX Principles

### 1. Decoupled Studio Chrome vs Slide Deck Design (Anti-Template Freedom)
- **Studio UI Shell:** The TopBar Light/Dark toggle **ONLY** toggles the UI shell of the studio engine (topbar, left sidebar, right sidebar, outer canvas stage background).
  - **Light Mode UI:** Background `#fafafa` / `#f4f4f5`, dark text, clean `#e4e4e7` borders, outer stage `#e4e4e7`.
  - **Dark Mode UI:** Background `#09090b` / `#121214`, light text, hairline `#27272a` borders, outer stage `#000000`.
- **Slide Canvas Freedom:** The slide canvas inside remains **100% faithful** to the design authored by the AI agent! Toggling Studio UI mode **NEVER** forces color changes or mutates the slide deck canvas.
- **Full Support for Standalone HTML Slides:** The engine supports rendering arbitrary, rich, standalone HTML slides (`rawHtml`, `layout: 'html'` or `layout: 'bespoke'`) following the pure 1-slide = 1 HTML file standard with zero style collisions.
- **Zero Decorative Emojis or Cartoon Badges:** Pure mathematical, typography-led elegance.
- **Strict Ban on Double Slash (`//`) Clichés:** Dilarang keras menggunakan karakter `//` (double slash) sebagai pemisah teks judul, kicker, badge, tagar, maupun footnote (misal: `SYSTEM · ARCHITECTURE` bukan double slash). Gunakan interpunct (`·`), em-dash (`—`), bullet point, tanda pipa (`|`), atau susun frasa bersih tanpa pemisah artifisial.
- **Desain Modern Tegas (Anti-Meta-Desain Jargon):** Gunakan istilah "desain modern tegas" atau "minimalis berkelas" untuk gaya tata letak grid solid, offset shadows, dan border tegas.

### 2. Fixed 16:9 Canvas Ratio (Anti-Responsive Distortion)
- Base canvas coordinate space: `1920 × 1080 px` (Full HD presentation standard).
- Canvas is scaled mathematically using `transform: scale(min(stageWidth/1920, stageHeight/1080))` inside a centered stage container.
- **Strictly NOT fluidly squished or reflowed:** The layout maintains exact coordinates, margins, and typography sizes across all viewport dimensions and print boundaries.

### 3. Pristine Deck Stage & On-Canvas PowerPoint Edit Mode
- **Preview/Presenter Mode:** Zero buttons, floating controls, or UI widgets overlaid inside the presentation deck itself.
- **On-Canvas PowerPoint Edit Mode (`[E]` toggle):**
  - Single click on Topbar `EDIT MODE` or press `E` to enter live PowerPoint-style WYSIWYG editing.
  - Direct on-canvas inline text editing (`contentEditable`) across all elements (headlines, subtitles, kickers, metric values, pillar descriptions, bento cards, badges, quotes) with real-time state and disk persistence.
  - Floating quick-format toolbar with instant palette tuning (Obsidian, Titanium, Cream, Bauhaus, Cobalt, Neon Lime), `+ ITEM` inserter, and SVG Icon Picker.
- **Vector SVG Icons & Graphic Design Elements (Strict 0% Emojis):**
  - Mathematical vector icons (`cpu`, `sparkles`, `activity`, `zap`, `shield`, `layers`, `database`, `server`, `terminal`, `bar-chart`, `target`, `network`, `box`, `git-branch`, `check-circle`, `lock`, `globe`).
  - Technical graphic design accents: CAD corner telemetry crosshairs (`+`), engineering status pills, and hairline telemetry dividers.

### 4. 3-Panel Studio Layout
- **Left Sidebar:** Slide page thumbnails list (filmstrip), add slide menu (9 layout archetypes including standalone HTML), reorder up/down, duplicate slide, delete slide.
- **Center Canvas:** The pristine 16:9 presentation frame with fixed scaling and studio surround.
- **Right Sidebar:** 5-tab inspector workstation:
  - `STYLE`: 39 Curated palettes categorized into `All`, `Light`, `Dark`, and `Vibrant` + active slide layout switcher.
  - `TEXT`: Kicker / context tag, headline title, subtitle summary, footnote telemetry.
  - `ELEMENTS`: Dynamic item controls for metric cards, 3-pillar columns, bento grid cards, comparison points, and quotes.
  - `ANIMATION`: Smooth Morph transitions (shared layout interpolation), Crossfade, Directional Slides, Zoom, Clip, Flip 3D, and Stagger Blur with duration and easing controls.
  - `EXPORT`: Multi-target pipeline (Vector PDF, 4K Raster PDF, Editable PPTX, SVG single, and SVG ZIP bundle).

---

## 3. Multi-Target Export Pipeline

| Export Target | Engine Mechanism | Output Characteristics |
|---|---|---|
| **PDF Vector (Zero-Margin)** | Native Print Stylesheet (`@page { size: 16in 9in; margin: 0; }`) via Chrome CDP | Lossless mathematical vectors, selectable text, crisp lines at any zoom |
| **PDF Raster (4K)** | `html2canvas` (scale 1.5) + `jspdf` | High-density pixel-perfect rasterized presentation PDF across all slides |
| **PowerPoint (.pptx)** | `python-pptx` + `pptxgenjs` Builder | Real native Microsoft PowerPoint shapes, editable text frames, and tabular metrics |
| **SVG Vector (Single)** | Direct Mathematical XML Generator | Standalone 1920×1080 `.svg` file for the active slide |
| **SVG Bundle (ZIP)** | Direct XML Generator + `jszip` | Compressed `.zip` containing pure `.svg` files for all slides in the deck |

Print CSS standard for zero-margin 16:9 PDF:
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

---

## 4. Curated Visual Themes Spectrum (39 Palettes)

| Category | Theme Names & Aesthetic Profile | Best Use Case |
|---|---|---|
| **Light & Cream Editorial** | `consulting-cream` (#F7F5F2), `academic-slate` (#F5F1E8), `kanagi-washi` (#EFEAE2), `munich-bauhaus` (#FFFFFF), `soft-editorial`, `pin-and-paper`, `vellum`, `editorial-tri-tone` | Boardroom advisory, McKinsey-style decks, academic papers, literary essays |
| **Vibrant & Bold Modern** | `venture-pitch-cobalt` (#2563EB), `bold-signal-coral` (#FF5722), `electric-studio` (#4361EE), `creative-voltage-neon-lime` (#D4FF00), `neon-cyber`, `sakura-chroma`, `creative-mode` | Seed & Series A pitch decks, product launches, keynotes, high-conviction presentations |
| **Minimalist Monochrome Dark** | `obsidian-pure` (#000000), `titanium-precision` (#090A0C), `swiss-modernist-dark` (#09090B), `editorial-noir`, `graphite-telemetry`, `editorial-forest`, `cobalt-grid`, `emerald-editorial`, `signal` | Engineering briefs, AI architecture, system specifications, luxury executive pitch |
| **Desain Modern Tegas & Bento** | `neo-grid-bold`, `cartesian`, `block-frame`, `raw-grid`, `biennale-yellow` | Technical capability matrix, multi-card system architecture, quarterly benchmarks |

---

## 5. Multi-Format Authoring Modes

### Mode A: Rapid Markdown Slides (`.md`)
Fastest method for technical briefs, pitch decks, and architectural proposals. Slides are delimited by standard horizontal rules (`---`):

```markdown
<!-- theme: signal -->
<!-- title: Distributed Consensus Architecture -->

# Distributed Consensus Architecture
Executive Engineering Deep Dive & Fault Tolerance Analysis

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
Left column explains storage orchestration; right column displays telemetry cards.

- Append-only write-ahead log (WAL) on NVMe
- Segmented LSM-tree compaction strategy
- Multi-region cross-datacenter replication
```

### Mode B: Pure 1-Slide = 1 Standalone HTML Standard
For complete artistic and layout freedom authored by AI agents:
- Supports rendering arbitrary, rich, standalone HTML slides within the 16:9 canvas.
- Renders full-bleed 1920x1080 with zero forced engine chrome, padding, or theme restrictions.
- Supports Zara Zhang 34 bold archetypes (`signal`, `studio`, `capsule`, `editorial-forest`, `soft-editorial`, `pin-and-paper`, etc.).

### Mode C: Full Next.js 16 Presentation Studio
For interactive presentation authoring with full 3-panel studio, inline editing, live Framer Motion transitions, and multi-format exports.

---

## 6. CLI Tools Suite & Command Reference

The unified `pdf-deck` CLI binary is located at `bin/pdf-deck.mjs`.

### 1. Launch Next.js Presentation Studio:
```bash
# Starts Next.js multi-aesthetic studio on port 5200:
pdf-deck studio 5200
```

### 2. Start Live Dev Server & Auto-Open Visible Chrome CDP:
```bash
# Starts live dev server + auto-opens visible headed Chrome on port 9223 with AI Cursor HUD:
pdf-deck dev my-pitch-deck --theme signal --title "Executive Strategic Intelligence"

# Run in background daemon mode:
pdf-deck dev my-pitch-deck --daemon
```

### 3. Finalize Session & Handover Editor:
```bash
# Updates live status badge to editor-active and leaves Chrome open for presentation:
pdf-deck done
```

### 4. Scaffold a New Presentation:
```bash
# Browse all 34 available Zara Zhang presentation archetypes:
pdf-deck list-templates

# Scaffold directly from any of the 34 bold archetypes (e.g. signal, studio, neo-grid-bold, capsule):
pdf-deck init my-pitch-deck --template signal --title "Executive Strategic Intelligence"
```

### 5. Compile Markdown or JSON to 16:9 Presentation HTML:
```bash
# Compile Markdown to standalone HTML presentation:
pdf-deck compile my-pitch-deck/deck.md --out output/deck --theme signal

# Compile structured JSON specification:
pdf-deck compile my-pitch-deck/goal.json --out output/deck
```

### 6. Export High-Fidelity Zero-Margin 16:9 PDF:
```bash
pdf-deck export-pdf output/deck --out output/deck/presentation.pdf
```
- Uses Chrome CDP `Page.printToPDF` with `@media print`, zero margin, `printBackground: true`, and exact 16:9 landscape dimensions (`16in × 9in`).
- Yields crisp, vector-rendered text, charts, and diagrams.

### 7. Export Editable PowerPoint (`.pptx`):
```bash
pdf-deck export-pptx output/deck --out output/deck/presentation.pptx
```
- Reconstructs shapes, layout cards, and editable text boxes node by node via `python-pptx`.

### 8. Interactive Visual Review via Visible Chrome CDP:
```bash
pdf-deck review output/deck --port 9223
```

### 9. Verify & Install Dependencies:
```bash
pdf-deck install-engine
```

---

## 7. Keyboard Shortcuts & Presenter Mode

- `E`: Toggle On-Canvas PowerPoint Edit Mode (live inline editing, quick color swatches, SVG icons).
- `F5` / `F`: Toggle Fullscreen Presentation Mode (hides all studio chrome, centers 16:9 deck with pure black backdrop).
- `ArrowRight` / `Space` / `PageDown` / `Enter` / `J`: Next slide.
- `ArrowLeft` / `Backspace` / `PageUp` / `K`: Previous slide.
- `Home`: Jump to first slide.
- `End`: Jump to last slide.
- `Escape`: Exit fullscreen presenter mode or close modals.

---

## 8. Directory Structure

```
skills/pdf-deck/
├── app/
│   ├── api/projects/route.ts    # Auto-sync project & export manager (~/Downloads/deck-gen/projects/<slug>/)
│   ├── api/slides/route.ts      # Local disk JSON synchronization
│   ├── globals.css              # Dark/light theme styling & 16:9 @page print CSS
│   ├── layout.tsx               # Root HTML shell
│   └── page.tsx                 # Main studio entrypoint
├── bin/
│   ├── pdf-deck.mjs             # Unified primary CLI launcher
│   ├── next-slidedeck.mjs       # Compatibility shim
│   └── slidedeck-gen.mjs        # Compatibility shim
├── components/
│   ├── slides/
│   │   ├── AiGenCreativeLayouts.tsx # Creative layouts (Klyro, Chuckle, Borcelle, Fintech)
│   │   ├── SlideImageFrame.tsx  # Aspect ratio, crop, zoom, and objectFit frame
│   │   ├── SlideRenderer.tsx    # Slide renderer with Framer Motion transitions & arbitrary HTML support
│   │   └── SvgIcon.tsx          # 22 Mathematical SVG vector icons & graphic accents (0% emojis)
│   └── studio/
│       ├── CenterCanvas.tsx     # Pristine 16:9 canvas with decoupled outer stage background
│       ├── ExportModal.tsx      # Vector PDF, PPTX, and SVG export dialog
│       ├── FullscreenPresenter.tsx # Fullscreen F5 keyboard presenter
│       ├── ImageEditorModal.tsx # Inline image cropper, scale, position, and border modal
│       ├── LeftSidebar.tsx      # Slide filmstrip and page management
│       ├── RightSidebar.tsx     # Style, Text, Elements, Animation, Export tabs
│       ├── SlideStudio.tsx      # Orchestrator workstation with auto-save & disk persistence
│       └── TopBar.tsx           # Brand header, slide status, save to disk button, studio toggle
├── export/
│   └── ExportEngine.ts          # Vector PDF, 4K PDF, PPTX, and SVG export algorithms
├── presets/
│   ├── layoutCatalog.ts         # 108 Curated layouts across 11 groups
│   ├── sampleDecks.ts           # Curated sample decks
│   └── themes.ts                # 44 Curated palettes (Desain Modern Tegas & Minimalis Berkelas)
├── references/
│   ├── slide-design-and-export-guide.md # Vector PDF export, print CSS guidelines, and PPTX mapping rules
│   ├── theme-and-layout-catalog.md     # Catalog of 39 themes and layout systems
│   ├── cli-tool-reference.md           # CLI reference guide
│   ├── slide-design-rules.md           # High-taste, zero-clutter slide architecture rules
│   ├── bold-archetypes/                # Full 34 Zara Zhang production archetypes spec & preview
│   ├── beautiful-html-templates/       # Full 34 standalone HTML template implementations
│   ├── zara-zhang/                     # Zara Zhang reference systems
│   └── slidespeak/                     # SlideSpeak consulting preservation vault
├── scripts/
│   ├── compile-markdown.mjs     # Markdown to 16:9 HTML compiler
│   ├── export-cdp.mjs           # Chrome CDP vector PDF exporter
│   ├── export-headless.mjs      # Headless export orchestrator
│   ├── export-pdf.sh            # Direct shell PDF export
│   ├── export-pptx.py           # python-pptx presentation builder
│   ├── install-engine.sh        # Dependency installer and link script
│   ├── review-cdp.py            # Chrome CDP visual reviewer
│   ├── self-debug-suite.mjs     # Integration test suite
│   ├── serve-preview.mjs        # Live preview server with SSE hot-reload
│   └── verify-all.mjs           # Full ecosystem audit script
├── templates/
│   ├── archetypes/              # 34 Zara Zhang production archetype templates
│   ├── frontend-slides-*.md     # Ready-to-use markdown templates
│   └── pitch-deck.md            # Standard pitch deck template
├── types/
│   └── slide.ts                 # TypeScript domain contracts
└── package.json                 # Next.js 16, Framer Motion, pptxgenjs, jspdf dependencies
```

---

## 9. End-to-End Autonomous Agent Execution Protocol

When a user asks for a presentation, slide deck, pitch deck, or PDF report:
1. **Phase 0: Clarification Gate:** Check if prompt has theme, slide count, audience, and content. If missing, send the **Structured Briefing & Clarification Menu** and wait for user response.
2. **Phase 1: Instant Live Dev & Chrome GUI Auto-Open (Detik 0):**
   - Automatically match the topic to the best archetype (`signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`, etc.).
   - Jalankan single command auto-scaffold + daemon server + visible Chrome GUI:
     ```bash
     pdf-deck dev <deck-dir> --template <archetype-slug> --title "<Presentation Title>" --daemon
     ```
   - Monitor user langsung membuka Chrome pada port `9223` dengan Live Studio HUD dan in-place editor.
3. **Phase 2: High-End Editorial Slide Authoring (Real-Time Live Reload):**
   - Customize `<deck-dir>/index.html` dengan konten nyata menggunakan komponen visual berkelas.
   - Setiap kali file disimpan, preview server otomatis me-reload tampilan Chrome user dalam <50ms.
   - User menyaksikan setiap slide bertambah secara real-time dan bisa mengklik teks apa pun di layar untuk edit langsung (auto-saved).
4. **Phase 3: High-Fidelity Vector PDF / PPTX Export:**
   - Jalankan ekspor PDF 16:9 vektor via Chrome CDP:
     ```bash
     pdf-deck export-pdf <deck-dir> --out <deck-dir>/presentation.pdf
     ```
   - Atau ekspor editable PowerPoint:
     ```bash
     pdf-deck export-pptx <deck-dir> --out <deck-dir>/presentation.pptx
     ```
5. **Phase 4: Handover to In-Browser Live Editor:**
   - Jalankan `pdf-deck done`. Status HUD berganti ke `"Slide Deck Ready — In-Browser Live Editor Active"`.
   - Jendela Chrome tetap terbuka di layar user agar user bisa presentasi fullscreen (`F5`) atau lanjut mengedit teks sesuka hati.
   - Berikan path PDF lokal dan URL preview live ke user.
