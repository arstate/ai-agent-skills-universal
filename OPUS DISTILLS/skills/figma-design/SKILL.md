---
name: figma-design
description: |
  Master One-Shot Figma Design v4.5 (Djadi Creative GSM v2.5 Clean Agency Edition), High-Impact Ad Poster & Carousel Art Direction, Invisible Drop-Zone Engine, Dual-MCP Automation (figma-bridge + FigCraft + Official Figma MCP), 6 Core GitHub Libraries (mcp-server-guide, figma-skills, open-design, mengto, jakubkrehel, benjitaylor), and 4 Design Agent Applications (Design System Enforcement, Heuristic Usability Evaluation, Language Localization & Auto-Reflow, and Structural Code Handoff). Use ALWAYS when creating, designing, remastering, or automating 3:4 Meta Ads posters (1080x1440), 9:16 Reels covers, social carousels, or UI screens in Figma.
---

# `figma-design` (v4.5) — Master Figma Design, Clean Agency Layout & Automation Engine

`figma-design` v4.5 is the unified master engine combining:
1. **100% Authentic Djadi Creative GSM v2.5 Identity** (`#F7F4EC` Warm Cream Grid, `#012969` Deep Navy, `#FFD60A` Yellow-Gold Highlight Blocks, `#B3001B` Crimson Red Hard Shadows, Official Djadi Header & WA Consult Footer).
2. **5 Clean Global Agency Layouts (Styles 1–5)** with colossal typography (`74px–132px` H1, max 18–26 words), compact non-overlapping callout pills, and clean open center stage (`Invisible 02_HERO_IMAGE_DROP_ZONE` Frame — zero ugly dashed wireframes or grey dummy silhouettes on canvas!).
3. **6 Industry Design Libraries & Frameworks** (`figma/mcp-server-guide`, `warpdotdev/figma-skills`, `nexu-io/open-design`, `mengto/skills`, `jakubkrehel/skills`, `benjitaylor/skills`).
4. **4 Core Design Agent Applications** (Design System Enforcement, Heuristic Usability Evaluation, Language Localization, and Structural Code Handoff).
5. **Dual-MCP & WebSocket Relay Infrastructure** (`figma-bridge` ws://127.0.0.1:4395 + `FigCraft` Opinion Engine + Official Figma MCP).

---

## 📚 Bundled References & Deep Technical Handbooks

1. `references/high-impact-poster-and-ad-blueprints.md` — Exact coordinate blueprints for the 5 Clean Djadi Creative Agency Layouts + Invisible `02_HERO_IMAGE_DROP_ZONE` specification.
2. `references/figma-mcp-and-plugin-api-bible.md` — Technical handbook for `figma-bridge` (`execute`, `get_layout`, `get_screenshot`, `export_node`) and `FigCraft` (`Opinion Engine`, 28 gotchas, `FILL`/`HUG` ordering, font loading).
3. `references/40-rule-figma-quality-and-collision-gate.md` — Pre-delivery audit protocol (`get_layout` `overlaps === 0`, typography scale floor `>= 18px`, concise word count, and Vision Agent verification).
4. `references/core-design-libraries-and-frameworks.md` — Detailed analysis and integration guidelines for 6 industry repositories (`mcp-server-guide`, `figma-skills`, `open-design`, `mengto`, `jakubkrehel`, `benjitaylor`).
5. `references/four-design-agent-applications.md` — Implementation blueprints and runnable scripts for 4 design agent applications.
6. `references/auto-layout-engine-guide.md` — 7 Iron Laws of Native Figma Auto Layout (`layoutMode`, hug vs fill, nested grids, and Master Artboard Law).
7. `references/figma-bridge-and-relay-api.md` — WebSocket relay daemon architecture, typography preloading, physical solid shadows, and Closed-Loop Vision QA.
8. `references/design-tokens-and-gsm.md` — Token definitions for GSM v2.5, canvas 3:4 (1080x1440), safe-zone 1080x1080, and spatial guardrails.

---

## 🏛️ 1. The 6 Iron Laws of Clean Agency Layout

### Law 1: NEVER Draw Ugly Dashed Cages, Grey Dummy Silhouettes, or Debug Labels on Canvas!
- When leaving space for manual photos (`02_HERO_IMAGE_DROP_ZONE`), the canvas itself MUST remain **100% clean, open, and visually finished**.
- In Figma's layer tree, create `02_HERO_IMAGE_DROP_ZONE` with **`fills = []` and `strokes = []`** (100% transparent on canvas) sandwiched between `01_BG_STAGE` and `03_FG_CALLOUT_PILLS`. The user drags their cutout PNG directly into this frame in the Figma Layers panel.

### Law 2: Never Cram Giant Browser Windows on Top of Hero Stage — Use Compact Side Pills (`290×96px`)!
- Avoid massive overlapping windows. Around a hero cutout stage (Styles 1, 2, 3), use **2 to 3 Compact Tilted Callout Pills (`width: 280px–308px, height: 92px–98px`)** strictly in the **left margin (`x: 56..360`) and right margin (`x: 716..1020`)**, leaving a **`356px+` wide open vertical channel in the center** so zero cards ever collide with the subject.

### Law 3: True Perpendicular-Normal S-Curve Connector Ribbon (Never Draw a Straight Diagonal Slash!)
- In Style 1 (`S-Curve Flow`), the connector ribbon (`#FFD60A` Yellow fill + `4px` `#012969` Navy borders) follows a smooth **2-Segment Cubic Bezier Flow**:
  * Segment 1: Starts at Pill 1 bottom (Left, `x: 130, y: 600`), dips smoothly `(160, 780) -> (480, 560)`, and rises into Pill 2 (Right-Upper, `x: 740, y: 620`).
  * Segment 2: Leaves Pill 2 bottom-right (`x: 850, y: 660`), curves outward `(960, 710) -> (960, 790)`, and enters Pill 3 top (Right-Lower, `x: 900, y: 860`).

### Law 4: 100% Pure SVG Vector Icons (Zero Missing-Glyph Tofu Rectangles `▯`!)
- Never put raw Unicode emoji (`💬`, `🛡️`, `🌐`, `🚀`) inside text strings—they render as broken tofu boxes `▯` if fonts lack emoji glyphs.
- Always inject crisp geometric SVG vector nodes (`figma.createNodeFromSvg(...)`) for Globe, Lightning, WhatsApp Bubble, Shield Check, Brackets `<>`, and Shopping Bag.

### Law 5: Giant Display Typography (`74px–132px`) & Strict 26-Word Ceiling
- Keep total word count between **16 and 28 words** across the entire poster.
- Use `Plus Jakarta Sans ExtraBold/Black` or `InterDisplay-Black` at **`74px–132px`** for headlines, with key words framed inside **Djadi `#FFD60A` Yellow or `#B3001B` Crimson Hard-Shadow Highlight Boxes** (`stroke: 3px #012969, shadow: 6px #012969`).

### Law 6: Exact Measured Highlight Alignment on Official Djadi Footer
- In the bottom-left footer (`"Urusan Iklan & Konten, Semua Beres di Djadi!"`), measure the pixel width of `"Urusan Iklan & Konten, Semua Beres di "` first and place the `#FFD60A` yellow highlight rectangle **exclusively behind `"Djadi!"`** (`x = 80 + prefixWidth - 4`, `width = djadiWidth + 10`).

---

## 🎨 2. The 5 Clean Djadi Creative GSM v2.5 Agency Layouts

| Style | Layout Concept & Geometry | Visual Composition & Structure |
|---|---|---|
| **Style 1: `Djadi S-Curve Funnel Flow`** | Flow ribbon connector connecting 3 compact pills around a clean open stage. | • **Top:** Official Djadi Header + `── OFFICIAL WEB STORE ──` + Centered `86px` Headline (`Dari Klik Pertama` / `Langsung Jadi [Orderan.]`) + 1-line subhead.<br>• **Stage:** 2-Segment Yellow/Navy Bezier S-Curve connecting **3 Compact Tilted Pills** (`Web Resmi .com`, `5 Hari Tayang`, `Mulai 1.5 Juta`) around **100% clean open center stage** + subtle floor shadow ellipse.<br>• **Bottom:** Official Djadi Footer + WA Consult Box. |
| **Style 2: `Djadi 94px Left Stack + 5-Icon Dock + Navy Dome`** | Left-aligned colossal stack over a service dock with curved base dome. | • **Top:** Official Djadi Header + Left-Aligned `94px` 3-Line Stack (`Website` / `Toko [Resmi.]` / `Siap Cuan`) + Tilted Crimson Badge (`5 HARI JADI PALING CEPAT`) + 3-part tagline.<br>• **Middle:** White Hard-Shadow **5-Icon Service Dock** (`Next.js Murni` · `Speed 0.8s` · `1-Klik WA` · `Komisi 0%` · `Domain .com`) with custom vector icons.<br>• **Bottom:** **Giant Curved Deep Navy `#012969` + Gold `#FFD60A` + Crimson `#B3001B` Dome** + 4 floating 3D icon tiles + clean open center space above the dome + left/right corner badges (`5 Hari Jadi` & `1.5 Jt`). |
| **Style 3: `Djadi 50/50 Asymmetric Split + Yellow Circle Halo`** | Two-column split with left typography hook and right graphic spotlight. | • **Left Column (`x: 80..500`):** `SOLUSI KONVERSI IKLAN` + `74px` 5-Line Question Hook (`Ramai Klik` / `Iklan?` / `Tapi Kok` / `Sepi Yang` / `[Order WA?]`) + 3-line lead + Arrow CTA (`───> MULAI RP 1.500.000`) + 3 circular vector icons.<br>• **Right Column (`x: 530..1010`):** **Giant `#FFD60A` Yellow Circle Halo (`472×472px`)** with `4px` `#012969` border & `10px` hard shadow + 3 small tilted square icon tiles (`🛒`, `✓`, `⚡`) + clean open vertical cutout space. |
| **Style 4: `Djadi Editorial Highlight Quote (Zero Photo)`** | Pure typographic statement for high-trust authority without requiring photo. | • **Canvas:** Tilted `-5°` architectural grid on `#F7F4EC` cream + Official Djadi Header & Footer.<br>• **Center:** Giant `88px` Quote (`“ Brand Besar` / `[punya web,] bukan` / `cuma [numpang.]”`) with `#FFD60A` Yellow & `#B3001B` Crimson hard-shadow highlight blocks + `Insight:` block + Deep Navy `#012969` bottom offer bar (`MULAI RP 1.5 JUTA · Website Resmi .com · 5 Hari Jadi`). |
| **Style 5: `Djadi 132px Kinetic Sticker Stack (Zero Photo)`** | Bold typographic punch with overlapping die-cut tilted stickers. | • **Canvas:** Fine `24px / 96px` engineering graph grid on `#F7F4EC` cream + Official Djadi Header & Footer + 8-spoke asterisk `*` & corner arrow `↘`.<br>• **Center:** Colossal `132px` 3-Line Stack (`Website` / `Resmi` / `Tokomu`) overlapped by **3 Tilted Die-Cut Djadi Hard-Shadow Stickers** (`Mulai 1.5 Juta` in `#B3001B` Crimson, `0% KOMISI` in `#10B981` Emerald, `5 Hari Beres` in `#FFD60A` Yellow). |

---

## ⚡ 3. The 4 Typical Design Agent Applications

1. **Design System Enforcement & Token Auditor (`audit_tokens.ts`):**
   - Recursively audits text frames, shapes, and components for unbound variables, unlinked color hexes, out-of-spec spacing (snaps to 4px/8px scale), and non-modular typography.
   - Run via CLI: `bun scripts/design_system_auditor.ts`.
2. **Heuristic Usability Evaluation & Canvas Annotation (`heuristic_audit.ts`):**
   - Scans canvas frames against Nielsen Norman Group (NN/g) 10 Usability Heuristics and WCAG accessibility standards.
   - Automatically generates a visual card container with color-coded pass/warn pins adjacent to the evaluated frame on canvas.
3. **Language Localization & Dynamic Copy Reflow (`localize_canvas.ts`):**
   - Automatically translates canvas copy fields across multiple languages (ID $\leftrightarrow$ EN $\leftrightarrow$ JP).
   - Verifies Auto Layout resilience: ensures frames set to "Hug" expand proportionally and frames set to "Fill" wrap cleanly without truncation.
4. **Structural Code Handoff (`figma_handoff.ts`):**
   - Compiles Figma AST layer hierarchies 1:1 into production-ready **Next.js 15 App Router / Tailwind CSS** components.
   - Run via CLI: `bun scripts/figma_handoff.ts`.

---

## 🛠️ 4. CLI Commands & Automation Tools

```bash
# 1. Execute custom script via figma-bridge relay:
bun scripts/figma-exec.ts "return figma.currentPage.name;"
bun scripts/figma-exec.ts -f ./task_script.ts

# 2. Automated token and variable binding audit:
bun scripts/design_system_auditor.ts

# 3. Export selection directly to Next.js 15 Tailwind JSX:
bun scripts/figma_handoff.ts
```
