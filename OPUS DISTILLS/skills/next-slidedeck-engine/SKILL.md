---
name: next-slidedeck-engine
description: Autonomous Multi-Aesthetic 16:9 Presentation Studio Engine built on Next.js. Features full creative design freedom (Light Mode, Cream Editorial, Bold Accent, Minimalist Monochrome Dark), 26 curated themes from SlideSpeak and Zara Zhang frontend-slides, zero emoji clutter, 3-panel studio layout (left slide filmstrip, center fixed 16:9 canvas with zero UI overlay buttons, right inspector for style/text/elements/morph animations/universal export), and multi-format vector PDF, raster 4K PDF, editable PPTX, and pure SVG output.
---

# `next-slidedeck-engine` — Autonomous Multi-Aesthetic Presentation Studio

`next-slidedeck-engine` is a custom, high-performance presentation studio engine built from scratch on Next.js (App Router, React 19, Tailwind CSS, Lucide icons, Framer Motion). It empowers AI agents and creators with an uncompromising editorial, engineering-grade 16:9 presentation studio across **all design styles — not locked to dark mode**.

---

## 1. Core Visual & UX Principles

1. **Full Creative Design Freedom (Never Locked to Dark Mode Only):**
   - **Light & Cream Editorial Modes:** McKinsey/BCG Consulting Cream (`#F7F5F2`), Academic Slate (`#F5F1E8`), Japanese Kanagi Washi (`#EFEAE2`), Munich Bauhaus Neue Klasse (`#FFFFFF`), OpEx Executive Navy (`#FFFFFF`), and Broadsheet Paper & Ink (`#FAF9F7`).
   - **Vibrant & Bold Modern Modes:** Venture Pitch Cobalt (`#2563EB`), Bold Signal Coral (`#FF5722`), Electric Studio Royal Split (`#4361EE`), Creative Voltage Neon Lime (`#D4FF00`), and Neon Cyber (`#00FFCC`).
   - **Minimalist Monochrome Dark Modes:** Obsidian Pure (`#000000`), Titanium Precision (`#090A0C`), Swiss Modernist Dark (`#09090B`), Editorial Noir (`#080809`), and Graphite Telemetry (`#070809`).
   - **One-Click Light/Dark Mode Palette Toggle** in the Topbar with zero SSR hydration mismatch.
   - **Zero decorative emojis, cartoon badges, or chaotic AI slop.** Pure mathematical, typography-led elegance.

2. **Fixed 16:9 Canvas Ratio (Anti-Responsive Distortion):**
   - Base canvas coordinate space: `1920 × 1080 px` (Full HD presentation standard).
   - Canvas is scaled mathematically using `transform: scale(min(stageWidth/1920, stageHeight/1080))` inside a centered stage container.
   - **Strictly NOT fluidly squished or reflowed:** The layout maintains exact coordinates, margins, and typography sizes across all viewport dimensions and print boundaries.

3. **Pristine Deck Stage (Zero Overlay Buttons):**
   - **ZERO buttons, floating controls, or UI widgets overlaid inside the presentation deck itself.**
   - All management controls stay strictly in the Topbar, Left Sidebar, or Right Sidebar, keeping the slide canvas 100% focused on presentation design.

4. **3-Panel Studio Layout:**
   - **Left Sidebar:** Slide page thumbnails list (filmstrip), add slide menu (8 layout archetypes), reorder up/down, duplicate slide, delete slide.
   - **Center Canvas:** The pristine 16:9 presentation frame with fixed scaling and dark surround.
   - **Right Sidebar:** 5-tab inspector workstation:
     - `STYLE`: 26 Curated palettes categorized into `All`, `Light`, `Dark`, and `Vibrant` + active slide layout switcher.
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
│   │   └── SlideRenderer.tsx    # Slide renderer with Framer Motion transitions
│   └── studio/
│       ├── CenterCanvas.tsx     # Pristine 16:9 canvas with zero UI clutter
│       ├── ExportModal.tsx      # Vector PDF, PPTX, and SVG export dialog
│       ├── FullscreenPresenter.tsx # Fullscreen F5 keyboard presenter
│       ├── LeftSidebar.tsx      # Slide filmstrip and page management
│       ├── RightSidebar.tsx     # Style, Text, Elements, Animation, Export tabs
│       ├── SlideStudio.tsx      # Orchestrator workstation with hydration-safe storage
│       └── TopBar.tsx           # Brand header, slide status, light/dark toggle, present/export
├── export/
│   └── ExportEngine.ts          # Vector PDF, 4K PDF, PPTX, and SVG export algorithms
├── presets/
│   ├── sampleDecks.ts           # Initial executive and consulting slides
│   └── themes.ts                # 26 Curated palettes (SlideSpeak, Zara Zhang, Monochrome)
├── types/
│   └── slide.ts                 # TypeScript domain contracts
└── package.json                 # Next.js, Framer Motion, pptxgenjs, jspdf dependencies
```
