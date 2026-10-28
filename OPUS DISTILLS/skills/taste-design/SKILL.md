---
name: taste-design
description: Universal Art Director, Visual Critic, and High-Taste Design Engine for all non-web creative deliverables (3:4 Instagram/TikTok carousels, 16:9 pitch decks/slides, PDF reports/brochures, brand identity systems, posters, data visualizations/charts, and commercial studio imagery) plus holistic cross-medium UI review. Includes bundled reference guides for Bad vs Good examples, Niche Blueprints, and the 14-Pass Critique Rubric.
---
# Taste Design: Universal Art Director & Closed-Loop Visual Critic (`taste-design`)

Senior Art Director, Publication Designer, and Visual Critic distilled from **Claude Design System Prompt**, **Impeccable** (Paul Bakaus), **Taste Skill v2** (Leonxlnx), **UI/UX Pro Max**, and Avant Studio's Art Direction standards. Enforces elite visual taste across **16:9 slide decks, 3:4 social carousels, multi-page PDFs, brand identity systems, data charts, studio imagery, and UI reviews**.

## Bundled Reference Guides (Read via `get_skill_resources`)

Load these bundled reference files in `references/` whenever creating or critiquing designs:

1. `references/bad-vs-good-examples.md` - Concrete **❌ Desain Jelek (Amateur Slop)** vs **✅ Desain Bagus (Agency Craft)** comparisons across slides, 3:4 carousels, charts, and UI components.
2. `references/niche-ui-blueprints.md` - Industry-specific color palettes, font pairings, and art direction blueprints (Property, Bridal/Fashion, B2B/SaaS, Skincare/Clinic).
3. `references/14-pass-critique-rubric.md` - The 14-Pass Visual Jury Rubric for auditing rendered previews (`view_file`) and forcing automatic revision of messy layouts.

## 1. Mandatory Pre-Design Internet Reference & Mode Lock

1. **Benchmark Top 1% Visual Outliers (`google:search`):** Before designing any slide deck, PDF, carousel, or poster, search the web for top agency references in that exact category (Pentagram brand systems, Swiss editorial grids, McKinsey/Stripe slide layouts, or high-converting 3:4 carousels).
2. **Separate Internal Brand GSM vs Client Brand Identity:**
   - **Internal Avant Studio Assets ONLY:** Use GSM v2.5 tokens (`#F5F2EB` Warm Alabaster, `#012969` Deep Navy, `#FF3E1D` Signal Vermillion, `#F59E0B` Gold, and the 6 Master Styles of Avant Studio).
   - **Client Deliverables:** Never force Avant Studio's internal palette onto a client brand. Select a custom 60-30-10 palette and 2-font system from `references/niche-ui-blueprints.md`.
3. **Sub-Command Refinement Modes (`Impeccable` Vocabulary):**
   - **Bolder Mode:** When a draft looks timid or flat -> increase headline-to-body ratio to `4.3x`, use full-bleed color fields on key section divider slides/pages, and enlarge the hero visual to cover `>= 45%` of the canvas.
   - **Quieter Mode:** When a draft looks noisy or cluttered -> strip decorative borders/lines, mute secondary labels to neutral slate, and increase open negative space to `>= 40%`.
   - **Distill Mode:** Cut word count by 40% so every headline fits in `<= 2 lines` and every slide/card carries exactly **1 core claim**.

## 2. The 6 Universal Laws of Elite Visual Taste (Slides, PDFs, Carousels, & Charts)

### Law 1: The 0.5-Second Focal Point & 3.5:1 Scale Contrast

- Every slide (16:9), carousel frame (3:4 `1080x1440`), poster, or PDF page must have **exactly ONE dominant focal point** (a giant `tabular-nums` metric, a 2-line declarative headline, or a single hero visual).
- Enforce at least a **3.5:1 size contrast** between Display Headlines and Body Copy (`44pt` vs `13pt` on slides; `28pt` vs `10.5pt` on A4 PDFs).

### Law 2: The 40% Negative Space Mandate & Strict Safe Margins

- Keep **35% to 40% of every canvas** as open breathing room.
- **Outer Safe Margin:** Enforce `8%-10%` clear margin around the canvas (`>= 86px` on 1080px carousels; `>= 0.75 in` on PDFs/slides). Zero text may ever touch or crowd a border.

### Law 3: Single-Axis Grid Alignment & Zero Orphaned Words

- Snap every title, card, table, and caption to a shared vertical left alignment axis (never mix centered headings above left-aligned sibling cards in the same horizontal band).
- Balance all headings so **zero headlines end with 1 isolated orphan word** on the last line.

### Law 4: Declarative Action Titles (Assertion-Evidence Model)

- Ban passive topic labels (*"Overview Penjualan"*, *"Tentang Kami"*).
- Write complete declarative assertions that prove the takeaway upfront: *"Funnel 1-Klik Meningkatkan Konversi Chat WhatsApp hingga 3.4x"*.

### Law 5: Edward Tufte High-Taste Data Visualization

- **Ban Chart Junk:** Zero 3D charts, zero pie charts with >4 slices, zero heavy gridlines, zero rainbow legends.
- **Signal vs Noise Coloring:** Color ONLY the **1 winning bar or trend line** in the sharp brand accent color, and mute all comparison bars in neutral grey (`#CBD5E1`).
- **Direct Data Labels:** Print exact formatted values (`Rp 145 Jt`, `+42%`) directly at the end of each bar/line and despine top/right axes.

### Law 6: Anti-Slop & Optical Realism in Imagery

- **Zero Emojis in Professional Layouts:** Use crisp vector icons or typographic numbers (`01`, `02`).
- **Zero Forbidden Jargon:** Never use the word "brutalist"; use *Desain Modern Tegas* or *Minimalis Berkelas*.
- **Optical Inner Border:** Add a subtle `1px` inner border (`rgba(0,0,0,0.08)`) around light screenshots/photos so they stay crisp against light paper backgrounds.

## 3. Closed-Loop Visual Critique & Mandatory Revision (`view_file` Gate)

Never deliver a visual artifact without inspecting its rendered PNG preview via **Vision Agent (`view_file`)**:

1. Render every slide, PDF page, chart, or layout preview to PNG.
2. Call `view_file` and evaluate every page against `references/14-pass-critique-rubric.md`.
3. Output a concise `| Before (Temuan Draft 1) | After (Perbaikan) | Why |` table (Emil Kowalski format) if any flaw was caught, fix the generation script in one batch, and re-render before delivering to the user!


---

## 9. OpenDesign (`nexu-io/open-design`) Multi-Mode Brief & Craft Engine (NEW DISTILLATION)

Distilled from **OpenDesign** (`nexu-io/open-design`: `skills-protocol.md`, `design-brief`, `od-design-refine`, and `craft/` modules):

### A. OpenDesign Mode Routing (`od.mode`) & 8 Orthogonal Brief Dimensions
Before creating or critiquing ANY visual deliverable (`deck` 16:9 slides, `image` 3:4 carousel / poster / studio photo, `document` PDF report, `video` 9:16 motion/Reels, or `design-system`), resolve the **8 Orthogonal Brief Dimensions** so your output never looks repetitive or generic:
1. **`palette` (Surface & Ink Polarity):** Warm editorial paper (`#FAF7F2`), crisp gallery white (`#F8F9FA`), or obsidian luxury (`#0C0D10`). Never pure `#000000` on `#FFFFFF`.
2. **`accent` (Focal Signal Token):** 1 primary brand accent color (`--accent`), used **maximum 2–3 times per canvas/slide/frame**. **Strict Ban on `#6366f1` (Tailwind Indigo-500)** unless explicitly mandated by a client's existing logo.
3. **`typography` (Body & Caption Voice):** Clear, high-legibility body font with strict character-per-line discipline (`45–65ch` on docs, max 35 words per carousel slide, max 40 words per pitch deck slide).
4. **`display` (Hero Headline Voice):** High-contrast display face with `3x–5x` scale ratio over body text and tight negative tracking (`-0.02em` to `-0.04em`).
5. **`layout` (Spatial Composition Model):** Choose deliberately from **Asymmetric Editorial Split, Swiss Hairline Grid, Dominant Visual + Micro-Index, Single-Stat Callout, Comparison Matrix, or Diagonal Z-Flow**—never repeat the exact same slide/frame layout twice in a row.
6. **`mood` (Sensory & Brand Vibe):** Define the tactile texture, corner radius (`0px` architectural sharp vs `8px–16px` modern friendly), and lighting temperature (`3200K` golden warm vs `5500K` daylight neutral).
7. **`density` (Canvas Breathing Room):** Enforce minimum whitespace floor (`>= 35%` open background on carousels/posters/slides; `>= 25%` on dense financial/data tables).
8. **`exclude` (Explicit Anti-Slop Exclusions):** List banned clichés for the brief (e.g., no 3D floating crypto coins, no random decorative blobs, no center-aligned body paragraphs, no unspaced ALL CAPS).

### B. Universal OpenDesign Craft Laws (`craft/` Modules)
- **ALL CAPS Tracking Law (`craft/typography-hierarchy-editorial.md`):** Every uppercase eyebrow, category tag, slide kicker, or table header MUST have `letter-spacing: 0.06em–0.10em`.
- **Single Focal Point Law (`craft/laws-of-ux.md`):** On any 3:4 carousel slide, 16:9 presentation slide, or poster, the viewer's eye must know what to read #1, #2, and #3 within **500 milliseconds** (The Squint Test).
- **`od-design-refine` Surgical Critique Protocol:** When reviewing a visual asset or deck, identify the **single highest-impact flaw** first (e.g., competing focal points, weak headline-to-body ratio, overused accent color, or muddy background contrast) and prescribe the exact numeric fix (`px`, `rem`, hex code, or word-count cut) rather than vague adjectives.


---

## 10. `zanwei/design-dna` & `harness-design` 3-Dimension Reference Extraction Engine (NEW DISTILLATION)

Distilled from **`zanwei/design-dna`** (`https://github.com/zanwei/design-dna`) and **`zanwei/harness-design`** (Phase 3 Browser Visual Verification):
Whenever a user uploads a reference UI screenshot/image, shares a reference URL, or asks to extract/clone/adapt a design style ("bikin tampilannya punya vibe kayak referensi ini", "extract design DNA"), execute the **3-Phase Design DNA Pipeline (`Structure -> Analyze -> Generate & Verify`)** across **3 Mandatory Dimensions**:

### A. The 3 Dimensions of Machine-Readable `design-dna.json`

| Dimension | Role | Mandatory Quantified Fields |
|---|---|---|
| **1. `design_system`** *(What you can measure)* | Exact tokens — zero eye-guessing | `color` (`surface.background`, `surface.elevated`, `neutral.scale` ordered lightest-to-darkest, `accent.hex`, `measured_palette` coverage `0..1`), `typography` (font family class, H1/body scale ratio, weight contrast, tracking), `spacing` (density, section gap rhythm), `layout` (max-width, grid columns, asymmetry ratio), `shape` (`border-radius` relative to element height, `1px` hairlines), `elevation` (shadow softness/spread vs flat border), `motion` (easing curve & duration). |
| **2. `design_style`** *(What you can feel)* | Qualitative perception & art direction | `mood` (e.g., *Warm Editorial*, *Dark Precision*, *Organic Sage Studio*), `visual_language`, `composition_strategy`, `imagery_style`, `interaction_feel`, `brand_voice`, `ornamentation_level` (`minimal`, `restrained`, `expressive`), and `whitespace_philosophy`. |
| **3. `visual_effects`** *(Beyond plain CSS)* | Special rendering & motion tiering | Scans for & specifies: `scroll_driven_motion` (GSAP ScrollTrigger / SplitText), `inline_typography_pills` (inline icon/image badges inside H1), `canvas_2d` / `webgl_shaders`, `noise_grain_overlay`, `spotlight_borders`, `cursor_effects` (`gsap.quickTo`), plus `overview.effect_intensity` (`subtle` / `moderate` / `immersive`) and `overview.performance_tier`:<br>• **Lightweight:** CSS animations, SVG strokes, vanilla JS<br>• **Medium:** GSAP (`useGSAP`, `ScrollTrigger`, `SplitText`, `Flip`), Canvas 2D, Lottie<br>• **Heavy:** Three.js, custom GLSL shaders, Pixi.js |

### B. Deterministic Color Measurement & Anti-Drift Law (`ΔE` Verification)
- **Why Eye-Guessing Fails (`zanwei/design-dna` Finding):** When AI agents estimate hex colors from screenshots by eye, perceived colors drift toward familiar default palettes by **`ΔE > 10`** (turning a unique warm olive `#5B6E46` into generic Tailwind green `#22c55e`).
- **Deterministic Sampling Rule:** When given a reference image in the VM, sample actual pixel clusters (via Python PIL/numpy k-means or canvas sampling) to extract exact hex codes and surface coverage ratios (`0.0` to `1.0`):
  - Map the largest coverage cluster (`0.55–0.70`) to `surface.background`.
  - Map the highest-contrast text cluster to `neutral.scale` foreground.
  - Map the high-saturation focal cluster (`0.03–0.10` coverage) to `accent.hex`.
- **Phase 3 Visual Polish Loop (`zanwei/harness-design`):** If the first generated draft feels visually thin compared to the reference, run a deliberate **Reference Delta Pass**:
  > *"Against the reference, audit hierarchy, ornamentation, typographic rhythm (including inline pills/italic contrast), motion choreography, materiality, and ΔE color fidelity—then merge the fixes directly into the implementation."*

### C. Canonical `design-dna.json` Template (Save in `readme-ai-agent/DESIGN-DNA.json` when cloning references)
```json
{
  "meta": { "source": "reference-ui", "archetype": "Editorial Kinetic SaaS" },
  "design_system": {
    "color": {
      "surface": { "background": "#4F6239", "elevated": "#181A16", "glass": "rgba(255,255,255,0.10)" },
      "text": { "primary": "#F7F8F5", "secondary": "rgba(247,248,245,0.74)" },
      "accent": { "hex": "#6C8C47", "contrast_text": "#FFFFFF", "max_per_viewport": 2 },
      "measured_palette": [
        { "hex": "#4F6239", "coverage": 0.62, "role": "background" },
        { "hex": "#F7F8F5", "coverage": 0.24, "role": "foreground-text" },
        { "hex": "#E88D67", "coverage": 0.06, "role": "inline-badge-accent" }
      ]
    },
    "typography": {
      "display_font": "Plus Jakarta Sans / Instrument Serif (mixed italic)",
      "body_font": "Plus Jakarta Sans",
      "h1_scale_ratio": 4.2,
      "mixed_typography_pattern": "Sans-serif regular + Serif/Italic emphasis word + Inline pill icon badges"
    },
    "layout": { "model": "Centered Atmospheric Hero + Floating Bottom UI Preview", "max_width": "1200px", "grid_columns": 12 },
    "shape": { "button_radius": "9999px", "card_radius": "20px", "badge_tilt_deg": -6 }
  },
  "design_style": {
    "mood": "Organic Atmospheric Modern",
    "ornamentation_level": "restrained-craft",
    "whitespace_philosophy": "Generous atmospheric radial gradient framing a single focal typography block"
  },
  "visual_effects": {
    "overview": { "effect_intensity": "moderate", "performance_tier": "Medium (GSAP + CSS)" },
    "hero_choreography": "GSAP SplitText masked word reveal + spring-popping inline icon pills + subtle floating UI window"
  }
}
```


---

## 12. 300-Reference Design Vault Router (10 Category Files — Load ONLY 1 Category on Demand!)

To guarantee **zero monotony** while keeping token consumption ultra-low (`~650 tokens` per category instead of loading all 300 references at once), the **300 Curated Design References** (distilled from [`VoltAgent/awesome-design-md`](https://github.com/voltagent/awesome-design-md), [`nexu-io/open-design/design-systems`](https://github.com/nexu-io/open-design/blob/main/design-systems/README.md), [`bergside/awesome-design-skills`](https://github.com/bergside/awesome-design-skills), and [`klaufel/awesome-design-systems`](https://github.com/klaufel/awesome-design-systems)) are split into **10 Category Files** inside `references/`:

| Niche / Project Industry Requested by User | Load ONLY This Category File (`get_skill_resources`) | Refs Included | Top Exemplars Inside |
|---|---|---|---|
| **1. AI, LLM, Autonomous Agents & Prompt Tools** | `references/cat-01-ai-and-llm.md` | `#001–#030` (30 Refs) | Claude, Runway, ElevenLabs, Mistral, Replicate, VoltAgent, Chilbot |
| **2. B2B SaaS, DevTools, Cloud & Databases** | `references/cat-02-saas-and-devtools.md` | `#031–#060` (30 Refs) | Linear, Vercel, Raycast, Cursor, Supabase, Notion, Cal.com, Resend |
| **3. Fintech, Banking, Payments & KPR Simulators** | `references/cat-03-fintech-crypto-banking.md` | `#061–#090` (30 Refs) | Stripe, Wise, Mercury, NerdWallet, Revolut, Ramp, Midtrans/Bibit/BSI |
| **4. Real Estate, Property, Hospitality & Architecture** | `references/cat-04-realestate-hospitality-architecture.md` | `#091–#120` (30 Refs) | Airbnb, Apex Property Blueprint, Aman Resorts, Compass, Foster+Partners, Aesop |
| **5. Creative Agencies, Studios & Portfolios** | `references/cat-05-agency-creative-portfolio.md` | `#121–#150` (30 Refs) | Clay, Framer, Webflow, Avant Studio Blueprint, Pentagram, Locomotive |
| **6. E-Commerce, Fashion Lookbooks, D2C & F&B** | `references/cat-06-ecommerce-fashion-d2c.md` | `#151–#180` (30 Refs) | Shopify, Nike, Starbucks, Apple Store, SSENSE, Teenage Engineering, HMNS |
| **7. Digital Media, Literary Books, Essays & News** | `references/cat-07-media-editorial-books.md` | `#181–#210` (30 Refs) | WIRED, The Verge, Stripe Press, *Tiket Pulang Paling Sunyi*, Craig Mod, Monocle |
| **8. Luxury, Supercars, EV Mobility & Hardware** | `references/cat-08-luxury-automotive-hardware.md` | `#211–#240` (30 Refs) | Ferrari, Bugatti, Porsche, Polestar, Tesla, SpaceX, DJI, Leica, Bang & Olufsen |
| **9. Healthcare, Aesthetic Clinics, EdTech & Wellness** | `references/cat-09-healthcare-edtech-wellness.md` | `#241–#270` (30 Refs) | Oura Ring, Whoop, One Medical, Seed, Duolingo, Brilliant, MasterClass, Halodoc |
| **10. Gaming, Streaming, Web3 & Retro Y2K/90s** | `references/cat-10-web3-gaming-and-retro.md` | `#271–#300` (30 Refs) | Spotify, PlayStation, Poolsuite FM, Panic Playdate, Dell 1996, Nintendo 2001 |

### Execution Workflow for Using the 300-Reference Vault
1. **Match Category:** Identify which of the 10 categories fits the user's request.
2. **Load 1 Category File Only:** Read `references/cat-XX-...md` (never load all 10 files at once!).
3. **Select & Fuse 1–2 References:** Pick 1 primary aesthetic reference + 1 interactive component reference (e.g., *Ref #092 Apex Property + Ref #064 NerdWallet KPR Table*). If online, you can also fetch the linked `DESIGN.md` directly from GitHub; if offline, apply the exact **Offline Mini-DNA Hex & Font Tokens** from the table and record the chosen Reference ID (`#XXX`) in `readme-ai-agent/STYLE-GUIDE.md`.

---

## 9. `Nutlope/hallmark` (v2.8.0) Complete Anti-AI-Slop Architecture, Direct GitHub Repo Read & 83-Gate System

> **Required DIRECT HALLMARK REPO & RUBRIC READ:**
> Before designing any webpage, generating `design-style-preview.html`, or running a redesign:
> 1. **Read `references/14-pass-critique-rubric.md` (Parts 2 & 3)** for the complete `Nutlope/hallmark` v2.8.0 specification (48 Material Themes with exact OKLCH/Hex & font tokens, 21 Macrostructures, Page Invariants `F15`, Signature `Gate 82`, Picture Deletion Test `Gate 83`, and the 58–83 `sloplint` gates).
> 2. **Read Local Cloned Hallmark Repo (`skills/hallmark/` or `skills/hallmark/` or `https://github.com/Nutlope/hallmark`):**
>    - Read `references/themes/<slug>.md`, `references/craft.md`, `references/layout.md`, `references/direction.md`, and `references/gates.md`.
>    - If Node.js is available locally, run `node skills/hallmark/scripts/sloplint.mjs <output> --render` to verify `0 FAIL, 0 REFLEX` across 8 browser widths!, 48 Material Themes & 58 `sloplint` Gates

> **On-Demand Deep Reference:** Read `references/hallmark-58-sloplint-gates-and-48-themes.md` via `get_skill_resources` for the full 58-gate `sloplint` checklist, 48 Material Themes across 4 Genres (`Editorial`, `Modern-Minimal`, `Atmospheric`, `Playful`), 21 Macrostructures, and Nav/Footer rotation tables.

### A. Pre-Flight Scan & 6 Universal Hallmark Disciplines
1. **6-Signal Pre-Flight Scan:** Before designing on an existing repo, scan in order: (1) `design.md` / `readme-ai-agent/STYLE-GUIDE.md`, (2) Font stack (`package.json`, `next/font`), (3) Palette (`:root`, `tailwind.config.*`), (4) Motion library (`gsap`, `framer-motion`), (5) Spacing scale (`4pt/8pt`), and (6) Framework. Preserve existing locked tokens unless asked to redesign!
2. **Pre-Emit 6-Axis Self-Critique (`P-H-E-S-R-V`):** Score `1–5` on **P**hilosophy, **H**ierarchy, **E**xecution, **S**pecificity, **R**estraint, and **V**ariety before emitting code (any score `< 3` triggers an immediate revision). Stamp line 1 of CSS:
   `/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 · macrostructure: <name> · nav: <N#> · footer: <Ft#> · theme: <name> · contrast: pass (40–41) · slop: pass (58/58) */`
3. **Built From the Job & Cold-Hero-First Review:**
   - Place the category's core interactive action (booking, calculator, WA checkout) where the job demands it, and end the page on that action.
   - Build and review the **Hero section cold** at `1280x800` (13" laptop fold) and `375x812` before building the rest of the page: enforce `padding-block-end >= 1.3x padding-block-start`, keep headline + lede + CTA above the `800px` fold, and never stack all 4 hero elements (`eyebrow + title + lede + CTA`) on the center axis!
4. **Top `sloplint` Hard Floor Gates (Zero Tolerance):**
   - **Gate 34 (`overflow-x: clip`):** Always set `html, body { overflow-x: clip; }` (never `hidden`, which breaks `position: sticky`).
   - **Gate 38a (No Italic Headings):** All headings (`h1–h6`, display classes) MUST be upright roman (`font-style: normal`). Never put an italic `<em>` word inside an upright headline!
   - **Gate 39 (Input Field 5-Rule Gate):** Keep `border-width: 1px` across all states, use `outline: 2px solid var(--color-focus); outline-offset: 1px`, match input height to adjacent button height (`>= 44px`), reserve `min-height: 1lh` for helper/error slots, and use 3-channel `disabled` styling.
   - **Gates 40–41 (Contrast Math & Dark-Section Flip):** Verify `|L_text - L_bg| >= 50%` in OKLCH (WCAG 4.5:1 / APCA Lc >= 60). Always define `--color-accent-ink` on accent fills and swap text color to light (`--color-paper`) on any dark surface (`L < 50%`).
   - **Gates 42–43 (Nav `N1a–N13` & Footer `Ft1–Ft8` Diversification):** Default away from `N1a` (generic top bar) and `Ft3` (generic 4-column link footer); rotate across `N1b, N2, N3, N5, N6, N9, N11, N13` and `Ft1, Ft2, Ft4, Ft5, Ft6, Ft7, Ft8`.
   - **Gate 46 (Honest Copy):** Zero invented metrics (`+47%`, `50,000+ users`); use real client numbers or `TODO_ASK_USER`.
   - **Gate 47 (No Re-Drawn UI Chrome):** Never hand-code fake browser bars (traffic-light dots + URL pill), fake phone bezels, or fake IDE frames.
   - **Gate 48 (Locked Tokens & `tokens.css`):** Reference named CSS variables (`var(--color-*)`, `var(--font-*)`) everywhere—no mid-render inline hex/OKLCH improvisation.
   - **Gates 49–56 (Mobile Floor):** Zero 2-line clickable text (`white-space: nowrap` on buttons/CTAs/nav), `minmax(0, 1fr)` on all image-bearing grid tracks (never bare `1fr`), `overflow-wrap: anywhere; min-width: 0` on display headings, vertical-only section eyebrows (`tag-left, heading-right` 2-column eyebrow headers are banned!), `line-height >= 1.02` on uppercase display headings, and `top: var(--banner-height)` offset on secondary sticky elements.


---

## Zero Meta-Design & Layout Terminology Leakage in UI Copy (Gate C-Copy)

A critical mistake is leaking the name of the CSS layout pattern, macrostructure, or Hallmark theme into the actual text of the website.
1. **CSS Layout != Website Copy:**
   - If the user asks for a *"Bento style"* or *"Nordic Precision Bento"* website, build the **visual layout** using an asymmetric CSS Grid (`display: grid; grid-template-columns: repeat(12, minmax(0, 1fr))`), **not** by typing the word `"Bento"` into the navbar or H2 heading.
   - **Forbidden in Live Webpage Text (Navbar, Headings, Badges, Paragraphs, Footer):**
     - `"Bento"` / `"Bento Spesifikasi"` / `"Bento Grid"` / `"Bento Showcase"`
     - `"Hallmark"` / `"Nordic Precision"` / `"Blueprint Bento"` / `"Formwork Cast"` / `"Werkstatt"` / `"Cobalt Telemetry"`
     - `"Hero Section"` / `"Feature Grid"` / `"Bento Card"` / `"Trust Bar"` / `"CTA Block"`
   - **Required Replacement (100% Real-World Domain Copy):**
     - Instead of `BENTO SPESIFIKASI` in the navbar -> write `SPESIFIKASI MESIN` or `KAPABILITAS TEKNIS`.
     - Instead of `Bento Spesifikasi Teknis Pemesinan` in the `<h2>` -> write `Spesifikasi Teknis & Kapasitas Pemesinan`.
   - **The Only Exception:** In a multi-style preview file (`design-style-preview.html`), only the floating top style-switcher bar may contain the theme names (`[1. Nordic Precision]`, `[2. Blueprint]`, etc.) so the user knows which button to click. Inside the rendered page canvas itself, every single heading, nav link, and badge must read like a real, live company website.

