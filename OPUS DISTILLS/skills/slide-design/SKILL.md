---
name: slide-design
description: Master Slide Deck & Presentation Design Engine distilled from SlideSpeak (slide-design-skill) and Zara Zhang (frontend-slides). Derives bespoke visual styles and tokens from user briefs (never locked to dark mode or rigid templates). Supports 26+ curated light, cream editorial, bold vibrant, and minimalist dark aesthetics, strict typography pairing, layout grammar, and deterministic 1920×1080 export across Next.js Slide Studio, Vector PDF, editable PPTX, and pure SVG.
---

# `slide-design` — Master Presentation Design & Visual Architecture Engine

`slide-design` provides autonomous presentation intelligence. It synthesizes the dynamic style derivation of **SlideSpeak** (`slide-design-skill`) and the high-contrast editorial craft of **Zara Zhang** (`frontend-slides`) with the **`next-slidedeck-engine`** runtime.

---

## 1. Core Philosophy: Style is Discovered, Not Hard-Locked

1. **Anti-Template Freedom:**
   - **Never lock to dark mode only.** Slide decks must match the client's industry, brand, and communication context.
   - A healthcare or management consulting deck demands warm editorial cream paper (`#F7F5F2`) and serif authority.
   - An industrial robotics keynote demands Munich Bauhaus white (`#FFFFFF`) with cobalt telemetry.
   - A cybersecurity executive brief shines in obsidian pure (`#000000`) or graphite telemetry.
   - A venture capital pitch thrives on electric high-contrast accents (`#2563EB` or `#FF5722`).

2. **Zero AI Slop & Real Design Rigor:**
   - **0% Decorative Emojis or Cartoon Badges:** Emojis degrade enterprise credibility. Use geometric glyphs, unicode telemetry markers, or clean Lucide vector icons.
   - **No Generic Centered Heroes:** Use asymmetric editorial divisions, 60/40 splits, or modular bento hierarchies.
   - **Strict Fixed 16:9 Canvas:** Base coordinate grid `1920 × 1080 px` scaled mathematically. Anti-squish, anti-responsive line-wrap jumps.

---

## 2. Curated Style Archetypes

### A. Light & Warm Editorial Palettes (SlideSpeak)
| Archetype | Ground / Surface | Signal Accent | Typography Pairing | Recommended Context |
|---|---|---|---|---|
| **`consulting-cream`** | `#F7F5F2` / `#FFFFFF` | `#C8102E` (Crimson) | Source Serif Pro + Inter | McKinsey/BCG Board Briefings, PE/M&A |
| **`academic-slate`** | `#F5F1E8` / `#FFFFFF` | `#0F4C5C` (Teal) | Source Serif Pro + JetBrains Mono | Research Papers, University Lectures |
| **`kanagi-washi`** | `#EFEAE2` / `#F8F5EE` | `#B5402A` (Vermilion) | Clean Sans + Micro Serif | Architecture, Editorial Publishing |
| **`neue-klasse-blue`**| `#FFFFFF` / `#F2F4F6` | `#0066B1` (Munich Blue)| Archivo Display + Plus Jakarta | Industrial Engineering, Automotive |
| **`opex-corporate`** | `#FFFFFF` / `#F1F4F7` | `#1F4E79` (Navy) | System Modern + Monospace | Quarterly Operations, SaaS Metrics |
| **`pitch-vibrant`** | `#FAFAF8` / `#FFFFFF` | `#2563EB` (Cobalt) | Bold Display + Inter | Tech Startup Pitch Decks, Demos |
| **`training-teal`** | `#FFFCF7` / `#FFFFFF` | `#0F766E` (Spruce Teal)| Friendly Sans + Medium Weights | Workshops, Customer Enablement |

### B. Bold & Modern Split Themes (Zara Zhang Frontend-Slides)
| Archetype | Background / Surface | Accent Glow | Signature Elements |
|---|---|---|---|
| **`bold-signal`** | `#1A1A1A` / `#242424` | `#FF5722` (Coral) | High-contrast colored hero card on dark gradient, large section numbers |
| **`electric-studio`**| `#0A0A0A` / `#141414` | `#4361EE` (Royal Blue) | Asymmetric 50/50 split panel, accent bar on panel edge |
| **`creative-voltage`**| `#1A1A2E` / `#16213E` | `#D4FF00` (Neon Lime) | High-energy dual-tone, technical tags |
| **`dark-botanical`** | `#0F0F0F` / `#181818` | `#D4A574` (Terracotta) | Warm editorial dark, Cormorant serif headlines |
| **`notebook-tabs`** | `#F8F6F1` / `#FFFFFF` | `#98D4BB` (Mint/Pastel)| Physical binder tabs on right edge, paper container |
| **`pastel-geometry`**| `#FAF9F7` / `#FFFFFF` | `#5A7C6A` (Sage Forest) | Friendly pills, rounded cards with soft elevation |
| **`swiss-modern`** | `#FFFFFF` / `#F5F5F5` | `#FF3300` (Bauhaus Red)| Pure grid alignment, International Typographic Style |
| **`paper-and-ink`** | `#FAF9F7` / `#FFFFFF` | `#C41E3A` (Crimson) | Broadsheet columns, elegant rules, pull quotes |

### C. Minimalist Monochrome Dark Palettes
| Archetype | Surface Hex | Hairline Border | Focus Area |
|---|---|---|---|
| **`obsidian-pure`** | `#000000` / `#09090B` | `#27272A` | Deep executive focus, zero distraction |
| **`titanium-precision`**| `#090A0C` / `#111317` | `#2A2F38` | Hardtech telemetry, aerospace systems |
| **`editorial-noir`** | `#080809` / `#121215` | `#2B2B33` | Broadsheet journalism, investigative reports |
| **`graphite-telemetry`**| `#070809` / `#0F1114` | `#242933` | Distributed systems, developer platforms |

---

## 3. Four Quality Gates (Mandatory Verification)

1. **Gate 1 — Readability & Type Contrast:**
   - Dark Mode: text-to-background contrast ratio `>= 7:1`.
   - Light Mode: text ink (`#1A1A1A` or `#0A0A0A`) against light ground (`#FFFFFF` to `#F5F1E8`) contrast `>= 10:1`.
   - Title sizes: Headline `44–64px`, Subtitle `20–28px`, Body `14–18px`, Telemetry/Footnote `10–12px`.

2. **Gate 2 — No Empty Bands & Layout Density:**
   - Every slide must feel deliberate: balance white space with intentional metric cards, 3-pillar vertical structures, or asymmetric editorial splits.
   - Content should occupy `60%–75%` of the optical canvas safe zone (`padding: 96px`).

3. **Gate 3 — Data Grounding (Zero Hallucinated Numbers):**
   - Never invent arbitrary percentages or metrics unless provided by the user. If sample metrics are needed, label them clearly as `[BENCHMARK PROJECTION]` or `[SAMPLE]`.

4. **Gate 4 — Multi-Format Export Verification:**
   - Decks must export cleanly without layout shifts to:
     * Vector PDF (`window.print()` / SVG Print CSS)
     * High-res Raster 4K PDF (`html2canvas`)
     * Editable Microsoft PowerPoint (`.pptx` via `pptxgenjs`)
     * Pure mathematical SVG Vector bundle

---

## 4. Integration with `next-slidedeck-engine`

Launch the live studio to compose and present slides interactively:

```bash
# Start Next.js presentation studio:
node "$HOME/.agents/skills/next-slidedeck-engine/bin/next-slidedeck.mjs" dev 5200

# Open visible Chrome GUI on port 9223:
bash "$HOME/.agents/tools/launch-visible-chrome.sh" 9223 "http://127.0.0.1:5200/"
```

Use Topbar toggle to switch between Light and Dark mode instantly with zero hydration errors.
