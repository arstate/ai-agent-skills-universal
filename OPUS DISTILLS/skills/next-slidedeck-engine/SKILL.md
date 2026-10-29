---
name: next-slidedeck-engine
description: Autonomous Minimalist Monochrome 16:9 Presentation Studio Engine built on Next.js. Features strict dark mode monochrome UX, zero emoji clutter, 3-panel studio layout (left slide filmstrip, center fixed 16:9 canvas with zero UI overlay buttons, right inspector for style/text/elements/morph animations/universal export), and multi-format vector PDF, raster 4K PDF, editable PPTX, and pure SVG output.
---

# `next-slidedeck-engine` — Autonomous Minimalist Monochrome Presentation Studio

`next-slidedeck-engine` is a custom, high-performance presentation studio engine built from scratch on Next.js (App Router, React 19, Tailwind CSS, Lucide icons, Framer Motion). It replaces legacy dashboard tools with an uncompromising editorial, engineering-grade 16:9 presentation studio.

---

## 1. Core Visual & UX Principles

1. **Strict Dark Mode Monochrome Aesthetic:**
   - Deep obsidian and zinc surfaces (`#000000`, `#09090b`, `#121214`, `#18181b`, `#27272a`).
   - High-contrast optical white typography (`#fafafa`, `#ffffff`) with subtle muted secondary tones (`#a1a1aa`, `#71717a`).
   - **ZERO decorative emojis, cartoon badges, or chaotic multi-colored gradients.** Pure mathematical and engineering elegance.
   - Razor-sharp 1px hairline borders (`#27272a`) and disciplined typographic hierarchy.

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
     - `STYLE`: 6 Curated monochrome dark palettes + slide layout template switcher.
     - `TEXT`: Kicker / context tag, headline title, subtitle summary, footnote telemetry.
     - `ELEMENTS`: Dynamic item controls for metric cards, 3-pillar columns, bento grid cards, comparison points, and quotes.
     - `ANIMATION`: Smooth Morph transitions (shared layout interpolation), Crossfade, Directional Slides, Zoom, Clip, Flip 3D, and Stagger Blur with duration and easing controls.
     - `EXPORT`: Multi-target pipeline (Vector PDF, 4K Raster PDF, Editable PPTX, SVG single, and SVG ZIP bundle).

---

## 2. Multi-Target Export Pipeline

| Export Target | Engine Mechanism | Output Characteristics |
|---|---|---|
| **PDF Vector (SVG Print)** | Native Print Stylesheet (`@page { size: 16in 9in; margin: 0; }`) | Lossless mathematical vectors, selectable text, crisp lines at any zoom |
| **PDF Raster (4K)** | `html2canvas` (scale 2.0) + `jspdf` | High-density 3840×2160 pixel-perfect rasterized presentation PDF |
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
│   ├── globals.css              # Dark mode styling & 16:9 @page print CSS
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
│       ├── SlideStudio.tsx      # Orchestrator workstation
│       └── TopBar.tsx           # Brand header, slide status, present/export buttons
├── export/
│   └── ExportEngine.ts          # Vector PDF, 4K PDF, PPTX, and SVG export algorithms
├── presets/
│   ├── sampleDecks.ts           # Initial executive slides
│   └── themes.ts                # 6 Curated monochrome dark mode palettes
├── types/
│   └── slide.ts                 # TypeScript domain contracts
└── package.json                 # Next.js, Framer Motion, pptxgenjs, jspdf dependencies
```
