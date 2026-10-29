---
name: dashi-ppt
description: Production 16:9 Presentation & Slide Deck Engine. Generates interactive multi-variant HTML slide decks (3 template options + 1 bespoke variant per slide) across 12 curated themes, with live in-browser editing and instant vector PDF / editable PPTX export.
---

# Dashi PPT — Publication-Grade 16:9 Slide Deck & Presentation Engine

> [!NOTE] **Preferred Autonomous Engine:**
> Ekosistem telah di-upgrade ke **`next-slidedeck-engine`** (`skills/next-slidedeck-engine`) dan **`slidedeck-gen`** — Engine Next.js murni dengan desain Minimalist Monochrome Dark Mode, zero emoji clutter, kanvas 16:9 fixed scale (zero tombol di area deck), Morph Smooth spring transitions, dan ekspor instan ke Vector PDF, Raster 4K PDF, Editable PPTX, dan pure SVG. Gunakan `@next-slidedeck-engine` untuk semua pengerjaan slide deck baru.

Dashi PPT generates publication-grade, interactive 16:9 widescreen presentation decks. It organizes presentation requirements into a structured Schema v2 JSON goal plan, executes multi-variant layout allocation, and outputs a self-hosted `index.html` with an embedded presentation studio and real-time Chrome GUI preview.

## Key Capabilities & Architecture

- **Multi-Variant 3+1 Layout Architecture:** For every logical slide, Dashi PPT allocates 3 distinct visual template layouts plus 1 bespoke agent variant across 12 curated themes (`theme01` to `theme12`).
- **Interactive In-Browser Presentation Studio:** Complete with an interactive filmstrip on the left sidebar (`#slide-rail`), real-time variant switcher on the right panel (v1, v2, v3, v4), fullscreen present mode (`F5`), and in-place inline text editing auto-saved to disk.
- **Auto-Open Chrome GUI:** As soon as rendering completes, the preview server starts and Google Chrome GUI automatically pops up on screen displaying the live deck.
- **Clean International Standard:** All UI controls, toolbars, labels, and export buttons are in English, with zero Chinese social media branding or watermarks.
- **Full-Fidelity Exporters:** Instant one-click vector PDF and fully editable PowerPoint (`.pptx`) export directly from the studio topbar or via CLI commands.

## Directory Structure

- Built-in generator runtime: `<skill-root>/project`
- Execution scripts:
  - macOS / Linux: `<skill-root>/scripts/render_goal_deck.sh` (symlinked to `~/.local/bin/dashi-ppt`)
  - Windows: `<skill-root>/scripts/render_goal_deck.ps1`

## Available Themes (12 Curated Styles)

- `theme01`: **Soft Neumorphism** | Clean modern surfaces, subtle recessed cards | Ideal for: Product intros, corporate briefings, SaaS proposals
- `theme02`: **Cyber Glow** | Deep dark canvas, emerald/cyan neon glow, telemetry tags | Ideal for: AI keynotes, autonomous systems, tech launches
- `theme03`: **Tech Code** | Terminal IDE dark, monospace accents, syntax containers | Ideal for: Developer conferences, cloud infrastructure
- `theme04`: **Glassmorphism** | Translucent frosted blur, pastel gradients | Ideal for: Consumer apps, modern creative portfolios
- `theme05`: **Data Spectrum** | High-contrast multi-color analytics, white background | Ideal for: Data reports, KPI reviews, BI analysis
- `theme06`: **Dark Graph** | Connected network nodes, systems precision, deep slate | Ideal for: System architecture, strategic matrices
- `theme07`: **Crisp Whitepaper** | Refined scholarly editorial, alabaster background | Ideal for: Whitepapers, academic research, policy briefs
- `theme08`: **Noir Luxe** | Deep obsidian black, brushed champagne gold accents | Ideal for: Luxury real estate, executive pitches, keynotes
- `theme09`: **Editorial Magazine** | Midnight navy, asymmetric broadsheet balance | Ideal for: Brand stories, leadership essays, annual reports
- `theme10`: **Financial Index** | High-density terminal, tabular numbers, gold accents | Ideal for: Hedge funds, quarterly earnings, investor updates
- `theme11`: **High Growth** | Cobalt & electric amber, bold stat callouts | Ideal for: Startup pitch decks, VC fundraising, growth roadmaps
- `theme12`: **Sonic Neon** | High-contrast dark canvas, hot magenta/cyan lasers | Ideal for: Entertainment, event keynotes, creative media

## End-to-End Workflow

1. **Structured Content Plan (`page-content-pack.json`):**
   Write a structured `page-content-pack.json` file defining each slide's role, title, summary, key metrics, and items:
   ```json
   {
     "pages": [
       {
         "id": "page-1",
         "presentation": {
           "pageIntent": "cover",
           "coreMessage": "Core takeaway of the presentation",
           "title": {"full": "Full Presentation Title", "short": "Short Title"},
           "summary": {"full": "Executive summary paragraph", "short": "Kicker tag"},
           "items": [
             {"id": "fact-1", "label": "Key Metric", "detail": {"full": "Detail explanation", "short": "Short"}, "value": 95, "displayValue": "95%", "unit": "%", "required": true}
           ]
         }
       }
     ]
   }
   ```

2. **Scaffold Schema v2 Goal Plan:**
   Generate `goal.json` with multi-variant 3+1 allocation:
   ```bash
   node <skill-root>/project/scripts/goal-scaffold.mjs \
     --title "Presentation Title" \
     --goal "Core strategic objective" \
     --theme "theme02" \
     --pages 4 \
     --layout-variants 3 \
     --content-plan output/<deck-name>/page-content-pack.json \
     --seed "deck-seed-2026" \
     --out output/<deck-name>/goal.json
   ```

3. **Render Deck & Auto-Open Live Studio:**
   Render the presentation HTML and launch the live Chrome GUI:
   ```bash
   dashi-ppt output/<deck-name>/goal.json output/<deck-name>/ppt/index.html
   ```
   *(Or run `<skill-root>/scripts/render_goal_deck.sh output/<deck-name>/goal.json output/<deck-name>/ppt/index.html`)*

4. **Export Formats:**
   - **Vector PDF:** Click `[Export PDF]` in the topbar or run:
     ```bash
     npm --prefix <skill-root>/project run export:pdf -- output/<deck-name>/ppt output/<deck-name>/presentation.pdf
     ```
   - **Editable PowerPoint (.pptx):** Click `[Export PPTX]` in the topbar or run:
     ```bash
     npm --prefix <skill-root>/project run export:pptx -- output/<deck-name>/ppt output/<deck-name>/presentation.pptx
     ```
