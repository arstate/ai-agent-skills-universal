# Master Presentation Combo Guide: Dashi, SlideSpeak & Zara Zhang on Next-Slidedeck-Engine

This architecture guide documents how to combine and leverage the three foundational slide design lineages into the high-performance **`next-slidedeck-engine`**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NEXT-SLIDEDECK-ENGINE                                 │
│       Next.js 16 + React 19 + Tailwind CSS + Framer Motion + Lucide        │
│          Fixed 16:9 Canvas (1920x1080) + On-Canvas PowerPoint Edit Mode     │
└───────────────▲─────────────────────────────▲─────────────────────────▲─────┘
                │                             │                         │
     ┌──────────┴──────────┐       ┌──────────┴──────────┐   ┌──────────┴──────────┐
     │     DASHI PPT       │       │     SLIDESPEAK      │   │     ZARA ZHANG      │
     │  12 Design Themes   │       │ 8 Strategy Archetypes│  │  34 Bold Archetypes │
     │  Multi-Variant 3+1  │       │  McKinsey Pyramid   │   │  High-Density Bento │
     │  Quantitative KPIs  │       │  Editorial Cream    │   │  Bold Signal & Tech │
     └─────────────────────┘       └─────────────────────┘   └─────────────────────┘
```

---

## 1. Lineage Comparison & Unique Strengths

| Aspect | Dashi PPT Lineage | SlideSpeak Lineage | Zara Zhang `frontend-slides` Lineage | `next-slidedeck-engine` Unified Engine |
|---|---|---|---|---|
| **Primary Focus** | Metric dashboards, financial indices, systems telemetry, code | McKinsey/BCG consulting briefs, executive boards, cream editorial | High-taste creative branding, bold typography, bento grids, visual punch | **All four styles natively supported with 38 curated palettes** |
| **Color Dominance** | Dark tech & luminous neon + crisp whitepaper | Warm cream (`#F7F5F2`), academic slate, washed linen, royal navy | Vivid duotones, high-energy signal, retro zine, neo-grid Swiss | **Light / Dark / Vibrant / Editorial** toggleable in 1 click |
| **Layout Archetypes** | 3+1 variant allocation per logical slide role | Pyramid principle, horizontal 3-pillar density, structured callouts | Asymmetric bento blocks, quote broadsheet, bold metric spotlight | **9 responsive 16:9 layout primitives** + dynamic item inserters |
| **Editing Paradigm** | In-place HTML text editing | Prompt-to-deck markdown compilation | Static Markdown / HTML template stitching | **WYSIWYG on-canvas PowerPoint edit mode (`[E]`)** + live state sync |
| **Export Fidelity** | Puppeteer screenshot PDF + basic PPTX | Browser print PDF | Chrome CDP raster PDF | **Multi-target:** Vector SVG, Vector PDF (`@page`), 4K Raster PDF, Editable PPTX (`pptxgenjs`), SVG ZIP |

---

## 2. Recipe Book: 5 High-Impact Combo Formulations

### Recipe 1: "The Tier-1 Strategic Boardroom" (SlideSpeak Cream + Dashi Financial Index)
- **Theme Palette:** `consulting-cream` or `dashi-crisp-whitepaper`
- **Slide 1 (Cover):** SlideSpeak clean Roman serif title, top kicker tag `CONFIDENTIAL // BOARD OF DIRECTORS`, warm cream background (`#F7F5F2`).
- **Slide 2 (Context):** Asymmetric split (`split`) with bold strategic statement on left, 4 structured action bullets on right.
- **Slide 3 (Execution KPIs):** Dashi financial metric grid (`metrics`) with 4 tabular KPI cards showing YoY changes (`+142% ARR`, `<12ms P99`, `99.999% SLA`).
- **Slide 4 (Pillars):** 3 strategic growth horizons (`pillars`) with numbered Roman headers and milestone tags.
- **Why this works:** Eliminates dark-mode tech bias for senior executive boards while retaining Dashi's quantitative rigor.

### Recipe 2: "The High-Velocity VC Pitch" (Zara Zhang Bold Signal + Dashi High Growth)
- **Theme Palette:** `bold-signal` (Coral `#FF5722`) or `dashi-high-growth` (Cobalt `#3B82F6`)
- **Slide 1 (Cover):** Bold Signal display typography with high-contrast colored hero badge.
- **Slide 2 (Traction Spotlight):** Dashi 4-metric grid (`metrics`) displaying explosive month-over-month traction with upward delta indicators.
- **Slide 3 (Product Moat):** Zara Zhang asymmetric bento matrix (`bento`) with 1 dominant 2x2 capability card and 3 surrounding feature cards.
- **Slide 4 (Strategic Vision):** Full-bleed quote spotlight (`quote`) citing customer testimonial or founder thesis.
- **Why this works:** High emotional resonance, rapid scroll-stopping pacing, zero generic SaaS template feel.

### Recipe 3: "The Deep-Tech Systems Keynote" (Dashi Tech Code + Zara Zhang Terminal)
- **Theme Palette:** `dashi-tech-code` or `obsidian-pure` or `graphite-telemetry`
- **Slide 1 (Cover):** Monospaced kicker, CAD telemetry crosshairs (`+`), and Obsidian dark canvas (`#000000`).
- **Slide 2 (Architecture Pillars):** 3-Pillar decoupled topology breakdown (`pillars`) with monospace status badges (`CORE RUNTIME`, `MORPH MATRIX`, `PIPELINE`).
- **Slide 3 (Performance Telemetry):** Quantitative benchmarking metrics (`metrics`) with P99 latency and cluster throughput.
- **Slide 4 (Source Contract):** Code block layout (`code`) displaying verifiable TypeScript domain definitions or API contracts.
- **Why this works:** Publication-grade engineering authority, 100% vector clarity, zero decorative fluff or emojis.

### Recipe 4: "The Modern Creative Agency Portfolio" (Zara Zhang Studio + Dashi Glassmorphism)
- **Theme Palette:** `electric-studio` (Royal Split `#4361EE`) or `dashi-glassmorphism`
- **Slide 1 (Cover):** Minimalist headline with subtle luminous surface accents.
- **Slide 2 (Capabilities Bento):** Multi-span bento grid (`bento`) highlighting creative disciplines, client badges, and project metrics.
- **Slide 3 (Comparison Matrix):** Side-by-side comparison (`comparison`) of Traditional Agency vs Autonomous High-Velocity Studio.
- **Why this works:** Proves taste and craft while preserving engineering discipline.

### Recipe 5: "The Executive Whitepaper & Research Brief" (Dashi Whitepaper + SlideSpeak Academic)
- **Theme Palette:** `academic-slate` or `dashi-crisp-whitepaper` or `editorial-noir`
- **Slide 1 (Cover):** Classic broadsheet serif typography with formal citation metadata.
- **Slide 2 (Executive Summary):** 60/40 Asymmetric split with analytical commentary.
- **Slide 3 (Methodology & Roadmap):** Timeline milestone progression (`timeline`) tracking empirical phases.
- **Why this works:** Reads like a Harvard Business Review or Nature executive whitepaper.

---

## 3. Preserved File Directory Mapping

All blueprints, archetypes, and raw templates from the three lineages are permanently indexed under:

```
next-slidedeck-engine/
├── references/
│   ├── COMBO_DESIGN_SYSTEM_GUIDE.md          # This unified synthesis manual
│   ├── dashi/
│   │   ├── blueprints/                       # layout-roles.md, options.md, goal-spec.schema.json, layout-manifest.json
│   │   ├── components/                       # theme01-theme12 JSX components, BespokeSlide.jsx, theme-profiles.mjs
│   │   ├── examples/                         # annual-review.json, portfolio.json, workflow-telemetry.json, minimal-executive.json
│   │   └── themes/                           # dashi-themes-catalog.md (All 12 Dashi themes)
│   ├── slidespeak/
│   │   ├── archetypes/                       # 8 Consulting archetypes (academic, consulting, kanagi, neue-klasse, etc.)
│   │   ├── engine/                           # 26 Design engine architecture files (brand-guard, renderer, occupancy, etc.)
│   │   ├── examples/                         # 6 Full HTML slide decks (ai-trust-layer-pitch, balance-sheet-explainer, etc.)
│   │   ├── rules/                            # slide-design-rules.md, slide-design-and-export-guide.md
│   │   └── specs/                            # mckinsey-anatomy.md, design-variance-brief.md, anti-slop-adoption.md
│   └── zara-zhang-frontend-slides/
│       ├── archetypes/                       # All 34 Zara Zhang bold archetypes
│       ├── manifests/                        # bold-template-catalog.md, bold-templates-manifest.json, selection-index.json
│       ├── patterns/                         # frontend-slides-design-patterns.md, style-presets-reference.md
│       └── templates/                        # 11 Markdown templates (bento-grid, bold-signal, cobalt-cad, etc.)
└── presets/
    ├── sampleDecks.ts                        # 8 Complete sample decks (monochrome, consulting, slidespeak, dashi, zara-zhang)
    └── themes.ts                             # 39 Curated themes (Monochrome, Consulting, Dashi 12, Zara Zhang, SlideSpeak)
```

