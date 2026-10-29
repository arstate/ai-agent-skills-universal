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
│   ├── api/slides/route.ts      # Local disk JSON synchronization
│   ├── globals.css              # Dark/light theme styling & 16:9 @page print CSS
│   ├── layout.tsx               # Root HTML shell
│   └── page.tsx                 # Main studio entrypoint
├── bin/
│   └── next-slidedeck.mjs       # Executable CLI launcher
├── components/
│   ├── slides/
│   │   ├── SlideRenderer.tsx    # Slide renderer with Framer Motion transitions & arbitrary HTML support
│   │   └── SvgIcon.tsx          # 22 Mathematical SVG vector icons & graphic accents (0% emojis)
│   └── studio/
│       ├── CenterCanvas.tsx     # Pristine 16:9 canvas with decoupled outer stage background
│       ├── ExportModal.tsx      # Vector PDF, PPTX, and SVG export dialog
│       ├── FullscreenPresenter.tsx # Fullscreen F5 keyboard presenter
│       ├── LeftSidebar.tsx      # Slide filmstrip and page management
│       ├── RightSidebar.tsx     # Style, Text, Elements, Animation, Export tabs
│       ├── SlideStudio.tsx      # Orchestrator workstation with decoupled studioMode
│       └── TopBar.tsx           # Brand header, slide status, studio light/dark toggle, present/export
├── export/
│   └── ExportEngine.ts          # Vector PDF, 4K PDF, PPTX, and SVG export algorithms
├── presets/
│   ├── sampleDecks.ts           # 8 Curated sample decks (Monochrome, Consulting, SlideSpeak, Zara Zhang)
│   └── themes.ts                # 39 Curated palettes (SlideSpeak, Zara Zhang, Monochrome)
├── references/
│   ├── COMBO_DESIGN_SYSTEM_GUIDE.md # Master guide for SlideSpeak & Zara Zhang synthesis
│   ├── beautiful-html-templates/ # 34 Complete production templates (HTML, CSS, JSON, tokens)
│   ├── zara-zhang/              # Zara Zhang templates reference vault
│   ├── zara-zhang-frontend-slides/ # 34 Bold archetypes, manifests, patterns & 11 markdown templates
│   └── slidespeak/              # 8 Consulting archetypes, McKinsey specs, 26 engine files & 6 HTML slide decks
├── types/
│   └── slide.ts                 # TypeScript domain contracts (supports rawHtml & bespoke layout)
└── package.json                 # Next.js, Framer Motion, pptxgenjs, jspdf dependencies
```
