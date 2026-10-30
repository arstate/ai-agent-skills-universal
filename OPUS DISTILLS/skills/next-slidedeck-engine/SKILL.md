---
name: next-slidedeck-engine
description: Autonomous Multi-Aesthetic 16:9 Presentation Studio Engine built on Next.js. Features full creative design freedom (Light Mode, Cream Editorial, Bold Accent, Minimalist Monochrome Dark), 39 curated themes from SlideSpeak and Zara Zhang beautiful-html-templates, zero emoji clutter, decoupled Studio UI shell vs unrestricted slide canvas, arbitrary standalone HTML slide rendering (1-slide = 1 HTML file standard), 3-panel studio layout, and multi-format vector PDF, raster 4K PDF, editable PPTX, and pure SVG output.
---

# `next-slidedeck-engine` — Autonomous Multi-Aesthetic Presentation Studio

`next-slidedeck-engine` is a custom, high-performance presentation studio engine built from scratch on Next.js (App Router, React 19, Tailwind CSS, Lucide icons, Framer Motion). It empowers AI agents and creators with an uncompromising editorial, engineering-grade 16:9 presentation studio across **all design styles — not locked to dark mode or rigid template cards**.

---

## 1. Core Visual & UX Principles

1. **Decoupled Studio Chrome vs Slide Deck Design (Anti-Template Freedom):**
   - **Studio UI Shell:** The TopBar Light/Dark toggle **ONLY** toggles the UI shell of the studio engine (topbar, left sidebar, right sidebar, outer canvas stage background).
     - **Light Mode UI:** Background `#fafafa` / `#f4f4f5`, dark text, clean `#e4e4e7` borders, outer stage `#e4e4e7`.
     - **Dark Mode UI:** Background `#09090b` / `#121214`, light text, hairline `#27272a` borders, outer stage `#000000`.
   - **Slide Canvas Freedom:** The slide canvas inside remains **100% faithful** to the design authored by the AI agent! Toggling Studio UI mode **NEVER** forces color changes or mutates the slide deck canvas.
   - **Full Support for Standalone HTML Slides:** The engine supports rendering arbitrary, rich, standalone HTML slides (`rawHtml`, `layout: 'html'` or `layout: 'bespoke'`) following the pure 1-slide = 1 HTML file standard with zero style collisions.
   - **Rich Curated Themes (39 Palettes):**
     - **Light & Cream Editorial:** McKinsey/BCG Consulting Cream (`#F7F5F2`), Academic Slate (`#F5F1E8`), Japanese Kanagi Washi (`#EFEAE2`), Munich Bauhaus Neue Klasse (`#FFFFFF`), OpEx Executive Navy (`#FFFFFF`), Broadsheet Paper & Ink (`#FAF9F7`), Zara Zhang Soft Editorial (`#F2EEDF`), Zara Zhang Pin & Paper (`#EBE5D8`), Zara Zhang Vellum (`#FAF7F0`), Zara Zhang Editorial Tri-Tone (`#F4EFEA`), and Zara Zhang Neo Grid Bold (`#FFFFFF`).
     - **Vibrant & Bold Modern:** Venture Pitch Cobalt (`#2563EB`), Bold Signal Coral (`#FF5722`), Electric Studio Royal Split (`#4361EE`), Creative Voltage Neon Lime (`#D4FF00`), Neon Cyber (`#00FFCC`), Zara Zhang Sakura Chroma (`#121016`), and Zara Zhang Creative Mode (`#0A0A12`).
     - **Minimalist Monochrome Dark & Tech:** Obsidian Pure (`#000000`), Titanium Precision (`#090A0C`), Swiss Modernist Dark (`#09090B`), Editorial Noir (`#080809`), Graphite Telemetry (`#070809`), SlideSpeak Hypergradient (`#0B0420`), Zara Zhang Editorial Forest (`#0D1F17`), Zara Zhang Cobalt Grid (`#061325`), Zara Zhang Emerald Editorial (`#062A1F`), and Zara Zhang Pure Monochrome (`#000000`).
   - **Zero decorative emojis, cartoon badges, or chaotic AI slop.** Pure mathematical, typography-led elegance.
   - **Strict Ban on Double Slash (`//`) AI Slop Clichés:** Dilarang keras menggunakan karakter `//` (double slash) sebagai pemisah teks judul, kicker, badge, tagar, maupun footnote (misal: `SYSTEM // ARCHITECTURE` atau `CONFIDENTIAL // 2026`). Ini adalah ciri paling mencolok dari AI slop amatir. Gunakan interpunct (`·`), em-dash (`—`), bullet point, tanda pipa (`|`), atau susun frasa bersih tanpa pemisah artifisial.

2. **Fixed 16:9 Canvas Ratio (Anti-Responsive Distortion):**
   - Base canvas coordinate space: `1920 × 1080 px` (Full HD presentation standard).
   - Canvas is scaled mathematically using `transform: scale(min(stageWidth/1920, stageHeight/1080))` inside a centered stage container.
   - **Strictly NOT fluidly squished or reflowed:** The layout maintains exact coordinates, margins, and typography sizes across all viewport dimensions and print boundaries.

3. **Pristine Deck Stage & On-Canvas PowerPoint Edit Mode:**
   - **Preview/Presenter Mode:** Zero buttons, floating controls, or UI widgets overlaid inside the presentation deck itself.
   - **On-Canvas PowerPoint Edit Mode (`[E]` toggle):**
     - Single click on Topbar `EDIT MODE` or press `E` to enter live PowerPoint-style WYSIWYG editing.
     - Direct on-canvas inline text editing (`contentEditable`) across all elements (headlines, subtitles, kickers, metric values, pillar descriptions, bento cards, badges, quotes) with real-time state and `localStorage` synchronization.
     - Floating quick-format toolbar with instant palette tuning (Obsidian, Titanium, Cream, Bauhaus, Cobalt, Neon Lime), `+ ITEM` inserter, and SVG Icon Picker.
   - **Vector SVG Icons & Graphic Design Elements (Strict 0% Emojis):**
     - Mathematical vector icons (`cpu`, `sparkles`, `activity`, `zap`, `shield`, `layers`, `database`, `server`, `terminal`, `bar-chart`, `target`, `network`, `box`, `git-branch`, `check-circle`, `lock`, `globe`).
     - Technical graphic design accents: CAD corner telemetry crosshairs (`+`), engineering status pills, and hairline telemetry dividers.

4. **3-Panel Studio Layout:**
   - **Left Sidebar:** Slide page thumbnails list (filmstrip), add slide menu (9 layout archetypes including standalone HTML), reorder up/down, duplicate slide, delete slide.
   - **Center Canvas:** The pristine 16:9 presentation frame with fixed scaling and studio surround.
   - **Right Sidebar:** 5-tab inspector workstation:
     - `STYLE`: 39 Curated palettes categorized into `All`, `Light`, `Dark`, and `Vibrant` + active slide layout switcher.
     - `TEXT`: Kicker / context tag, headline title, subtitle summary, footnote telemetry.
     - `ELEMENTS`: Dynamic item controls for metric cards, 3-pillar columns, bento grid cards, comparison points, and quotes.
     - `ANIMATION`: Smooth Morph transitions (shared layout interpolation), Crossfade, Directional Slides, Zoom, Clip, Flip 3D, and Stagger Blur with duration and easing controls.
     - `EXPORT`: Multi-target pipeline (Vector PDF, 4K Raster PDF, Editable PPTX, SVG single, and SVG ZIP bundle).

---

## 2. Multi-Target Export Pipeline

| Export Target | Engine Mechanism | Output Characteristics |
|---|---|---|
| **PDF Vector (SVG Print)** | Native Print Stylesheet (`@page { size: 16in 9in; margin: 0; }`) | Lossless mathematical vectors, selectable text, crisp lines at any zoom |
| **PDF Raster (4K)** | `html2canvas` (scale 1.5) + `jspdf` | High-density pixel-perfect rasterized presentation PDF across all slides |
| **PowerPoint (.pptx)** | `pptxgenjs` Node/Browser Builder | Real native Microsoft PowerPoint shapes, editable text frames, and tabular metrics |
| **SVG Vector (Single)** | Direct Mathematical XML Generator | Standalone 1920×1080 `.svg` file for the active slide |
| **SVG Bundle (ZIP)** | Direct XML Generator + `jszip` | Compressed `.zip` containing pure `.svg` files for all slides in the deck |

---

## 3. Keyboard Shortcuts & Presenter Mode

- `E`: Toggle On-Canvas PowerPoint Edit Mode (live inline editing, quick color swatches, SVG icons).
- `F5` / `F`: Toggle Fullscreen Presentation Mode (hides all studio chrome, centers 16:9 deck with pure black backdrop).
- `ArrowRight` / `Space` / `PageDown` / `Enter` / `J`: Next slide.
- `ArrowLeft` / `Backspace` / `PageUp` / `K`: Previous slide.
- `Home`: Jump to first slide.
- `End`: Jump to last slide.
- `Escape`: Exit fullscreen presenter mode or close modals.

---

## 4. CLI Commands & Quick Start

```bash
# 1. Start live studio dev server (default port 5200):
npm --prefix "<engine-dir>" run dev

# Or using the direct CLI launcher:
node "<engine-dir>/bin/next-slidedeck.mjs" dev 5200

# 2. Production build and check:
npm --prefix "<engine-dir>" run build

# 3. Start production server:
npm --prefix "<engine-dir>" run start
```

---

## 5. Directory Structure

```
skills/next-slidedeck-engine/
├── app/
│   ├── api/projects/route.ts    # Auto-sync project & export manager (~/Downloads/deck-gen/projects/<slug>/)
│   ├── api/slides/route.ts      # Local disk JSON synchronization
│   ├── globals.css              # Dark/light theme styling & 16:9 @page print CSS
│   ├── layout.tsx               # Root HTML shell
│   └── page.tsx                 # Main studio entrypoint
├── bin/
│   └── next-slidedeck.mjs       # Executable CLI launcher
├── components/
│   ├── slides/
│   │   ├── AiGenCreativeLayouts.tsx # Dedicated Group 11 AI GEN creative layouts (Klyro, Chuckle, Borcelle, Fintech)
│   │   ├── SlideImageFrame.tsx  # Aspect ratio, crop, zoom, and objectFit frame
│   │   ├── SlideRenderer.tsx    # Slide renderer with Framer Motion transitions & arbitrary HTML support
│   │   └── SvgIcon.tsx          # 22 Mathematical SVG vector icons & graphic accents (0% emojis)
│   └── studio/
│       ├── CenterCanvas.tsx     # Pristine 16:9 canvas with decoupled outer stage background
│       ├── ExportModal.tsx      # Vector PDF, PPTX, and SVG export dialog with deck-gen export folder banner
│       ├── FullscreenPresenter.tsx # Fullscreen F5 keyboard presenter
│       ├── ImageEditorModal.tsx # Inline image cropper, scale, position, and border modal
│       ├── LeftSidebar.tsx      # Slide filmstrip and page management (sleek minimal w-48)
│       ├── RightSidebar.tsx     # Style (with ✨ AI GEN filter), Text, Elements, Animation, Export tabs
│       ├── SlideStudio.tsx      # Orchestrator workstation with auto-save & disk persistence
│       └── TopBar.tsx           # Brand header, slide status, save to disk button, studio toggle
├── export/
│   └── ExportEngine.ts          # Vector PDF, 4K PDF, PPTX, and SVG export algorithms
├── presets/
│   ├── layoutCatalog.ts         # 108 Curated layouts across 11 groups (including Group 11 AI GEN layouts)
│   ├── sampleDecks.ts           # Curated sample decks (including Klyro Creative Agency Deck)
│   └── themes.ts                # 44 Curated palettes (including 5 AI GEN themes)
├── types/
│   └── slide.ts                 # TypeScript domain contracts (supports rawHtml & bespoke layout)
└── package.json                 # Next.js, Framer Motion, pptxgenjs, jspdf dependencies
```

---

## 6. AI GEN Mode & Automated Project Architecture (`~/Downloads/deck-gen/projects/`)

### A. Automatic Project Persistence for AI Agents
Every presentation deck is structured and stored per project on disk:
```
~/Downloads/deck-gen/projects/<project-slug>/
├── deck.json                 # Master slide deck JSON state & metadata
├── slides/                   # 1-Slide = 1 HTML File standard
│   ├── slide-01.html
│   ├── slide-02.html
│   └── ...
├── export/                   # Export artifacts (.pdf, .pptx, .svg, .png)
└── README.md                 # Complete AI context log (prompt, themes, tokens, layouts)
```

1. **Context Continuity:** The AI agent can read `deck.json` and `slides/` to maintain 100% continuous context across multiple chat turns.
2. **Export Isolation:** All exported files (PDF, PPTX, SVG, ZIP) are automatically placed in the project's dedicated `export/` folder.
3. **Live API Integration:**
   - Save project: `POST /api/projects` with `{ projectSlug, deck }`
   - Load project: `GET /api/projects?project=<slug>` or `http://localhost:5200/?project=<slug>`
   - List projects: `GET /api/projects`

### B. ✨ AI GEN Creative Engine (Zero Template Constraints)
1. **5 Curated AI GEN Themes:**
   - `ai-gen-klyro`: Electric lime (`#88EE00`), vivid vermillion orange (`#FF5722`), deep forest teal (`#0A3431`).
   - `ai-gen-chuckle`: Vivid violet (`#6C2BD9`), pop tangerine (`#FF521B`), neon lime (`#C6FF00`).
   - `ai-gen-borcelle`: Obsidian charcoal (`#16161A`), acid chartreuse (`#E2FD52`), tangerine orange (`#FF6422`).
   - `ai-gen-fintech`: Crisp ice grey (`#F0F3FA`), royal cobalt blue (`#2B4CDE`), acid lime wave (`#A3E635`).
   - `ai-gen-custom`: Live arbitrary hex color inputs with zero template locks.
2. **Group 11 AI GEN Creative Layouts:**
   - `ai-klyro-hero`: Asymmetric bold grotesque headline, kinetic rotating flower icon (`✻`), dual pill badges, and lime-bordered photo card.
   - `ai-klyro-split-stats`: Split container with massive 346 & 74 client stat blocks and spinning floral motif.
   - `ai-klyro-ticket-principles`: 4 vertical cards shaped like price/luggage tags with punched circle hole and colored heads.
   - `ai-chuckle-retro-hero`: Bold chunky title overlaying rounded white photo frame and retro device.
   - `ai-borcelle-donut-data`: Center-left donut chart data visualization with 3 colored stat bars.
   - `ai-borcelle-venn-diagram`: Overlapping 3-circle Venn diagram with strategic pillar labels.
   - `ai-fintech-ribbon-wave`: Flowing SVG wavy liquid ribbon traveling across modern cards with floating stat pills.
   - `ai-bespoke-html`: Pure 1-slide = 1 HTML file mode with 100% arbitrary HTML/CSS freedom.
