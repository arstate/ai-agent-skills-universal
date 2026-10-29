# SlideDeck Design Styles & Layout Catalog Reference

`slidedeck-gen` and `next-slidedeck-engine` provide 39 curated design styles distilled from **SlideSpeak** and **Zara Zhang (`frontend-slides` & `beautiful-html-templates`)**, supporting arbitrary standalone HTML slides (1-slide = 1 HTML file standard) and structured 16:9 presentation layouts.

---

## 1. Curated Visual Themes Spectrum (39 Themes)

### A. Minimalist Monochrome & Architectural Dark
- **`obsidian-pure` (Obsidian Pure)**: High-contrast deep slate canvas (`#000000`), crisp white display typography, subtle hairline grid.
- **`titanium-precision` (Titanium Precision)**: Architectural titanium grey (`#090A0C`), cold zinc borders, emerald accent telemetry.
- **`monochrome` (Monochrome Minimal)**: Pure black and white editorial layout, zero color distraction.
- **`8-bit-orbit` (8-Bit Orbit)**: Retro technical dark palette, monospace tabular accents.
- **`cobalt-grid` (Cobalt CAD Grid)**: Engineering systems blueprint, technical crosshairs.

### B. Cream Editorial & Swiss Light
- **`consulting-cream` (McKinsey Consulting)**: Warm vellum cream background (`#F7F5F2`), deep charcoal ink (`#1A1A1A`), classic serif headlines.
- **`soft-editorial` (Zara Zhang Soft Editorial)**: Cormorant Garamond paper aesthetic (`#F2EEDF`), dusty pink & chartreuse accents.
- **`editorial-forest` (Canopy Forest)**: Deep emerald green (`#1B382B`) paired with soft cream parchment and golden amber.
- **`munich-bauhaus` (Munich Bauhaus)**: Pure gallery white canvas (`#FFFFFF`), primary red & yellow accents, asymmetric Swiss typography.
- **`pin-and-paper` (Pin & Paper)**: Warm craft paper tactile feel, editorial serif hierarchy.
- **`vellum` (Vellum Manuscript)**: Alabaster vellum with dark bronze and sage accents.

### C. Bold Venture & Keynote High-Impact
- **`venture-pitch-cobalt` (Venture Cobalt)**: High-energy electric royal blue (`#2563EB`), high contrast, investor pitch deck ready.
- **`creative-voltage-neon-lime` (Neon Voltage)**: Acid neon lime (`#D4FF00`) on obsidian black, cyber keynote aesthetic.
- **`signal` (Bold Signal)**: High-conviction venture presentation style with prominent status badges.
- **`creative-mode` (Creative Mode)**: Multi-color gradient accents, modern agency feel.
- **`sakura-chroma` (Sakura Chroma)**: Japanese editorial minimalism with blossom pink accents.

---

## 2. Core Functional Layout Roles (16:9 Presentation Canvas)

| Role ID | Purpose | Anatomy & Visual Structure |
|---|---|---|
| `cover` | Hero title slide | Display serif/grotesk title, section kicker badge, subtitle summary, confidential footnote |
| `metrics` | Key operational stats | 4-column large numeric telemetry (64pt–96pt `tabular-nums`), delta indicators, subtext labels |
| `split` | Asymmetric narrative | 60/40 ratio: bold declarative thesis headline on left, structured bullet points on right |
| `pillars` | Strategic architecture | 3 vertical modular capability cards separated by hairline rules with 40%+ negative space |
| `bento` | Modern card matrix | High-density asymmetrical grid (2x2 / 3-card) balancing quantitative stats with descriptions |
| `quote` | Doctrine / Takeaway | Full-bleed contrasting spotlight with oversized typographic quotation marks and speaker attribution |
| `comparison` | Before vs After | Side-by-side comparative matrix (Legacy Systems vs Autonomous Architecture) |
| `timeline` | Milestone roadmap | Sequential milestone progression with phase badges and delivery dates |
| `html` | Standalone HTML | Pure 1-slide = 1 HTML file standard. Full creative freedom with zero forced templates |

---

## 3. Pure 1-Slide = 1 HTML File Standard

When authoring slides with bespoke animations, custom SVG graphics, or unique layouts:
- Use the `html` layout type.
- Supply raw HTML in `slide.rawHtml` or `slide.elements.rawHtml`.
- Full HTML documents (`<!doctype html><html>...</html>`) render in an isolated, sandboxed 1920x1080 iframe.
- HTML snippets render directly full-bleed into the slide canvas.
- Zero forced engine padding, watermarks, or studio theme colors.
