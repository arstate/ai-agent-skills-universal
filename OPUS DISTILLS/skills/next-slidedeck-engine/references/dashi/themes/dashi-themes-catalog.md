# Dashi 12 Curated Themes & Layout Blueprints Catalog

This document preserves the complete design taxonomy, color tokens, typography pairings, and layout allocation formulas from the **Dashi Presentation Engine** for use as reference and combo presets inside `next-slidedeck-engine`.

---

## 1. The 12 Dashi Design Themes

| Theme ID | Theme Name | Tone & Atmosphere | Primary Colors (Hex) | Best Use Case |
|---|---|---|---|---|
| `theme01` | **Soft Neumorphism** | Clean modern surfaces, subtle recessed cards | BG: `#f0f4f8`<br>Surface: `#e2e8f0`<br>Accent: `#3b82f6` | Product intros, corporate briefings, SaaS proposals |
| `theme02` | **Cyber Glow** | Deep dark canvas, emerald/cyan neon telemetry | BG: `#06090e`<br>Surface: `#0d131d`<br>Accent: `#00ffaa` | AI keynotes, autonomous systems, tech launches |
| `theme03` | **Tech Code** | Terminal IDE dark, monospace accents | BG: `#0c1017`<br>Surface: `#161b22`<br>Accent: `#58a6ff` | Developer conferences, cloud infrastructure |
| `theme04` | **Glassmorphism** | Translucent frosted blur, pastel gradients | BG: `#0f172a`<br>Surface: `#1e293b`<br>Accent: `#38bdf8` | Consumer apps, modern creative portfolios |
| `theme05` | **Data Spectrum** | High-contrast multi-color analytics on crisp white | BG: `#ffffff`<br>Surface: `#f8fafc`<br>Accent: `#2563eb` | Data reports, KPI reviews, BI analysis |
| `theme06` | **Dark Graph** | Connected network nodes, systems precision | BG: `#0b0f19`<br>Surface: `#131b2e`<br>Accent: `#6366f1` | System architecture, strategic matrices |
| `theme07` | **Crisp Whitepaper** | Refined scholarly editorial, alabaster background | BG: `#fafafa`<br>Surface: `#f4f4f5`<br>Accent: `#2563eb` | Whitepapers, academic research, policy briefs |
| `theme08` | **Noir Luxe** | Deep obsidian black, champagne gold accents | BG: `#080808`<br>Surface: `#121212`<br>Accent: `#d4af37` | Luxury real estate, executive pitches, keynotes |
| `theme09` | **Editorial Magazine** | Midnight navy, asymmetric broadsheet balance | BG: `#0a1128`<br>Surface: `#111d40`<br>Accent: `#f43f5e` | Brand stories, leadership essays, annual reports |
| `theme10` | **Financial Index** | High-density terminal, tabular numbers, emerald tickers | BG: `#070d18`<br>Surface: `#0f192c`<br>Accent: `#10b981` | Hedge funds, quarterly earnings, investor updates |
| `theme11` | **High Growth** | Cobalt & electric amber, bold stat callouts | BG: `#090e1a`<br>Surface: `#101930`<br>Accent: `#3b82f6` | Startup pitch decks, VC fundraising, roadmaps |
| `theme12` | **Sonic Neon** | High-contrast dark canvas, hot magenta/cyan lasers | BG: `#090610`<br>Surface: `#150f24`<br>Accent: `#ec4899` | Entertainment, event keynotes, creative media |

---

## 2. Layout Allocation & Role Blueprints

Dashi uses a **Multi-Variant 3+1 Layout Architecture** allocating distinct visual patterns according to semantic slide roles:

### A. Cover & Section Divider (`cover`, `section-header`)
- **Intent:** Establish spatial hierarchy, deliver primary message anchor, and set theme atmosphere.
- **Formulas:**
  - *Variant 1 (Minimal Hero):* Huge headline (`text-7xl font-bold`) centered with micro-kicker tag and hairline divider.
  - *Variant 2 (Asymmetric Left-Align):* Heavy headline on left 60%, metadata footnote and telemetry badge on right 40%.
  - *Variant 3 (Bespoke Frame):* Bordered hero card with accent glow or tactile corner brackets (`+`).

### B. High-Density Metrics (`metrics`, `kpi-grid`)
- **Intent:** Quantitative proof, quarterly growth targets, latency/throughput telemetry.
- **Formulas:**
  - *Variant 1 (4-Column Bento):* 4 equal modular cards, each with large numeric display (`value`), delta badge (`change`), and label tag.
  - *Variant 2 (Hero Stat + 3 Satellites):* 1 dominant 50% width stat card + 3 stacked sub-metrics on the right.
  - *Variant 3 (Telemetry Ticker Ledger):* Monospaced financial table layout with emerald/amber delta tags.

### C. 3-Pillars & Architecture Blocks (`pillars`, `architecture`)
- **Intent:** Modular taxonomy, system components, strategic horizons (Horizon 1, 2, 3).
- **Formulas:**
  - *Variant 1 (Vertical Modular Columns):* 3 vertical cards with Roman numerals (`I.`, `II.`, `III.`), status pill badge, and concise body paragraph.
  - *Variant 2 (Connected Node Pipeline):* Horizontal progressive flow with chevron or hairline directional arrows.
  - *Variant 3 (Elevated Floating Cards):* Distinct surface depth with accent top hairline border.

### D. Asymmetric Split & Comparison (`split`, `comparison`)
- **Intent:** Trade-off analysis, Before vs After, Migration Strategy, Problem vs Solution.
- **Formulas:**
  - *Variant 1 (Dual Contrast Cards):* Left card muted surface (Legacy/Current State), Right card accent surface (Future/Proposed Solution).
  - *Variant 2 (60/40 Asymmetric):* 60% Left column with bold headline and contextual statement, 40% Right column with structured bullet matrix.

### E. Bento Grid Matrix (`bento`)
- **Intent:** Multi-faceted system capabilities, feature showcase, dense operational dashboard.
- **Formulas:**
  - 1 Hero 2x2 card + 2-3 satellite 1x1 cards.
  - Integrated stat indicators, icon tags, and sub-headings per card.

---

## 3. How to Combo Dashi with `next-slidedeck-engine`

In `next-slidedeck-engine`:
1. **Palette Combo:** Select any of the 12 Dashi theme tokens directly in the right sidebar `STYLE` tab (e.g. `dashi-financial-index`, `dashi-tech-code`, `dashi-noir-luxe`, `dashi-soft-neumorphism`).
2. **Layout Combo:** Combine Dashi's quantitative metrics and telemetry with Framer Motion spring physics.
3. **Editable State:** Use `[E]` PowerPoint on-canvas edit mode to update any metric value, kicker tag, or description live.
4. **Vector Export:** Export pure mathematical SVG or lossless 16:9 PDF directly.
