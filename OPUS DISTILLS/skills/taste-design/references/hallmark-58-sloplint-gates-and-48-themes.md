# `Nutlope/hallmark` (v2.8.0) — 58 `sloplint` Anti-Slop Gates, 48 Material Themes, 21 Macrostructures & 6 Universal Disciplines

Distilled from **`https://github.com/Nutlope/hallmark`** (Together AI / Hassan El Mghari — 35.6k+ GitHub Stars). Makes AI-generated UIs look **intentionally made by a human studio, never machine-generated**.

---

## 1. The 6 Universal Hallmark Disciplines (Hold Across `build`, `audit`, `redesign`, `study`, & `component-scope`)

| # | Discipline | Non-Negotiable Rule | `sloplint` Gate |
|---|---|---|---|
| **1** | **Pre-Emit 6-Axis Self-Critique (`P-H-E-S-R-V`)** | Before emitting code, score `1–5` on **P**hilosophy (clear why), **H**ierarchy (2-second scan), **E**xecution (rules/contrast/wrap), **S**pecificity (looks like *this* brief), **R**estraint (zero unmotivated decoration), **V**ariety (structural distance from prior builds). Any score `< 3` forces a revision pass before shipping! Stamp at line 1 of CSS: `/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */`. | Pre-Emit Gate |
| **2** | **Honest Copy (Zero Fabricated Metrics)** | Never invent `+47% conversion`, `trusted by 50,000+ teams`, `10x faster`, `99.9% uptime`, or fake quotes. Use `[stated]` user numbers, a labelled placeholder (`—` + `"metric to confirm"` / `TODO_ASK_USER`), or switch to a non-stat macrostructure. Never use a bare giant number with no words as the sole hero headline. | Gate 46 |
| **3** | **Locked Tokens (Zero Mid-Render Improvisation)** | Once tokens are locked in `:root` / `tokens.css`, every color and `font-family` in components MUST use named CSS variables (`var(--color-accent)`, `var(--font-display)`). Inline raw `#hex` / `oklch()` mid-render is forbidden. Always emit a portable `tokens.css`. | Gate 48 |
| **4** | **Re-Drawn UI Chrome Forbidden** | Never hand-build fake browser bars (URL pill + red/yellow/green traffic-light dots), fake phone frames/notches, fake terminal headers, or fake IDE chrome around `<pre>`. Use a real screenshot inside `<figure>` (max `1px` hairline border) or let the content stand alone! | Gate 47 |
| **5** | **Typography Purity (Roman Headings Only & Vertical Eyebrow Stack)** | • **No Italic Headers:** Headings (`h1–h6`, `.hero__title`, `.section__title`) are ALWAYS upright roman (`font-style: normal`). Never put an italicised `<em>` word inside an upright headline (`Built to <em>think</em>` is a top AI tell)—use weight, accent color, or a `1–2px` underline.<br>• **Eyebrows Default OFF:** Cap section eyebrows/numbers at `1–2` per page max, and ALWAYS stack vertically (`grid-template-columns: 1fr`). Two-column `tag-left, heading-right` hanging headers are banned! | Gates 38a, 54, 55 |
| **6** | **Mobile Hard Floor (`320 / 375 / 414 / 768 / 1280 px`) & 8-State Interactivity** | • `overflow-x: clip` on both `html` and `body` (NEVER `hidden`, which breaks `position: sticky`).<br>• Zero 2-line clickable text on buttons, nav links, tabs, or CTAs (`white-space: nowrap`).<br>• Image-bearing grid tracks MUST use `minmax(0, 1fr)`, never bare `1fr`.<br>• Display headers MUST set `overflow-wrap: anywhere; min-width: 0`.<br>• Interactive elements MUST style all **8 states**: `default · hover · :focus-visible · :active · disabled · loading · error · success`. | Gates 34, 39, 49–56 |

---

## 2. Catalog of 48 Hallmark Material Themes (Grouped by 4 Genres)

> **Hallmark Law — "A Theme is a Material, Not a Plan":** A theme defines paper lightness (`--color-paper`), typography (`2+1` font rule), OKLCH palette, surface texture, and photo treatment—never section order. Two builds in the same theme must have different page structures!

| Genre Cluster | When to Route Here | Curated Material Themes (48 Total) |
|---|---|---|
| **1. Editorial (20 Themes)**<br>*(Default Anti-Slop Voice)* | Agencies, architecture, property, luxury, food/hospitality, studios, publications, heritage brands | `Specimen`, `Atelier` (luxury fragrance/fashion), `Studio` (identity agency, forest-green accent), `Newsprint`, `Manifesto`, `Almanac`, `Garden`, `Riso`, `Sport`, `Editorial`, `Carnival`, `Grid`, `Broadside`, `Furrow` (warm agricultural/earth), `Hedgerow` (botanical craft), `Ink`, `Kiln` (monochrome tactile craft), `Loom`, `Overprint`, `Vellum` |
| **2. Modern-Minimal (11 Themes)**<br>*(Stripe / Linear / ElevenLabs School)* | B2B SaaS, fintech, APIs, developer platforms, enterprise workflows, data tools | `Cobalt` (Space Grotesk + Mono, crisp blue), `Dusk` (warm slate financial reconciliation), `Coral`, `Blueprint`, `Formwork`, `Piste`, `Rim`, `Solstice`, `Wayfind`, `Werkstatt`, `Paste-up` |
| **3. Atmospheric (8 Themes)**<br>*(Suno / Runway / Dark-AI School)* | AI tools, generative media, music/audio, video editors, cybersecurity, late-night venues, CLI tools | `Bloom` (warm atmospheric glow), `Midnight` (deep nocturnal editorial/AI video), `Terminal` (phosphor mono CLI), `Aurora`, `Lumen` (Instrument Serif upright + dark canvas), `Console`, `Darkroom`, `Ultraviolet` |
| **4. Playful (9 Themes)**<br>*(Post-Linear Warm Consumer School)* | Consumer apps, EdTech, healthcare/family, wellness, D2C lifestyle, community products | `Hum` (Plus Jakarta Sans warm humanist), `Dose` (clean family health/medication), `Ribbon` (Instrument Sans upright, calm audio/wellness), `Arcade`, `Halftone`, `Spore`, `Squeeze`, `Sticker`, `Terrazzo` |

### Mandatory 3-Axis Theme Diversification Rule
Across consecutive builds or pages, never repeat the same structural fingerprint. Consecutive themes must differ on **at least 1 of 3 axes**:
1. **Paper Band:** `dark (L < 30%)` vs `mid (30–85%)` vs `light (> 85%)`
2. **Display Style:** `high-contrast-serif` (`Specimen, Studio, Atelier`) / `roman-serif` (`Newsprint`) / `classical-serif` (`Lumen`) / `geometric-sans` (`Manifesto`) / `grotesk-sans` (`Cobalt`) / `rounded-sans` (`Hum`) / `mono` (`Terminal`) / `display-condensed` (`Sport`) / `display-heavy` (`Brutal, Carnival`) / `risograph-bold` (`Riso`)
3. **Accent Hue:** `warm (10–60°)` vs `cool (200–300°)` vs `neutral` vs `chromatic-other (green/phosphor)`

---

## 3. Structural Variety: 21 Macrostructures, 14 Navs (`N1a–N13`) & 8 Footers (`Ft1–Ft8`)

- **Ban Generic Rhythm:** Never default to `Hero -> 3 Equal Icon Cards -> Testimonial -> CTA Banner -> 4-Column Footer`.
- **Ban Default Nav (`N1a`) & Default Footer (`Ft3`):**
  - Avoid `N1a` (logo left + 4 links + button right + 1px bottom border) unless the site genuinely has only 2 destinations. Rotate across:
    - `N1b` (Canonical 3-section product nav), `N2` (Floating chip), `N3` (Architectural side-rail), `N4` (Hidden `⌘K` trigger), `N5` (Floating pill), `N6` (Editorial masthead), `N7` (Monolithic slab), `N8` (Terminal bar), `N9` (Edge-aligned asymmetric), `N10` (Scroll-morph), `N11` (Structured mega-menu), `N12` (Retracting top banner + nav), `N13` (Inline `⌘K` pill).
  - Avoid `Ft3` (4 link columns + social row + tiny copyright). Rotate across:
    - `Ft1` (Editorial Colophon), `Ft2` (Architectural Multi-Column + Cropped Bleed Wordmark), `Ft4` (Minimalist Action-End Footer), `Ft5` (Bold Typographic Statement Footer), `Ft6` (Local NAP + Map/Hours Trust Footer), `Ft7` (Index/Sitemap Ledger), `Ft8` (Swiss Hairline `justify-between` Bar).

---

## 4. Cold-Hero-First Build & Redesign Regression Guard (`sloplint --before` / `--kept`)

1. **Built From the Job (Category Action Placement):**
   - A booking page books, a shop sells, a KPR page calculates & locks a survey: place the primary interactive mechanism where the category expects it (often right in the first screen), and end the page on the action—never tack a generic newsletter signup onto the bottom of every page!
2. **Cold-Hero-First Protocol:**
   - Build and visually verify the **Hero section alone** at `1280x800` (13" laptop fold) and `375x812` (mobile) *before* coding the rest of the page:
     - Check `padding-block-end >= 1.3x padding-block-start` (so the hero sits into the page rather than floating).
     - Verify headline (`<= 7 words / <= 50 chars` ideal), lede (`<= 2 lines / <= 60ch`), and primary CTA all fit above the `800px` laptop fold without slicing the headline or focal visual!
     - Never center all 4 hero elements (`eyebrow + title + lede + CTA`) on the same vertical axis—pick at most 2 centered elements and set the eyebrow or CTA off-axis!
3. **Redesign Regression Guard (`sloplint --before` & `--kept`):**
   - When redesigning an existing project (`/redesign`), first inventory every existing route, `<a href>`, `<form>`, `<input>`, event handler, and heading in `readme-ai-agent/PRD.md`.
   - After rebuilding the visual layer, verify that **100% of links, inputs, handlers, and headings are preserved** (zero dropped wiring!).

---

## 5. Condensed 58-Gate `sloplint` Pre-Ship Audit Checklist

Before handing off any web UI, verify **0 failures** across these 8 gate groups:

1. **Visual Anti-Slop (Gates 1–7):**
   - `0` banned display fonts (`Inter, Roboto, Open Sans, Poppins, Lato, Arial`).
   - `0` purple-to-blue / cyan-to-magenta gradients or `background-clip: text` gradient headlines.
   - `0` 3-equal-column icon-above-heading card grids, `0` cards nested inside cards, `0` thick colored left-stripe borders on cards.
   - Hero is NOT `100vh` with `eyebrow + H1 + lede + CTA` all stacked on the center axis.
2. **Microinteraction & Motion Discipline (Gates 10–19):**
   - `0` `transition: all` / `transition-all` (always specify exact properties: `transform, opacity, background-color`).
   - `0` uniform `hover:scale-105` spammed across cards; `0` bouncy overshoot easings on UI buttons/modals/tooltips.
   - Focus rings (`:focus-visible`) appear **instantly (`0ms`)** at `>= 3:1` contrast—never fade in a focus ring!
   - Tooltip hover delay `800ms`, focus delay `0ms`.
3. **Token, Choma & Scale Discipline (Gates 22–27, 48):**
   - Tint neutrals toward the anchor hue (`>= 0.005` OKLCH chroma) unless `modern-minimal`.
   - Accent color footprint `<= 5%` of any single viewport (`<= 20%` radial bloom only in `atmospheric`).
   - All spacing uses multiples of `4px` (`--space-*`); prose measure strictly `45ch–75ch`.
4. **Hero Enrichment & Icon Discipline (Gates 28–31, 45):**
   - **Enrichment Hierarchy:** `Typography-Only -> Tier A Pure CSS Art -> Tier B Hand-Built SVG -> Tier C Studio Still / Real Photo -> Tier D Curated Single-Library Icon -> Tier E Lottie (Last Resort)`.
   - `0` emoji glyphs (`✨ 🚀 ⚡ 🔥 🎯 ✅`) used as UI/feature icons; never mix two icon libraries on the same page.
   - `0` unmotivated decorative numbers/cursors/blobs with no semantic meaning in the content.
5. **Layout Safety & Baseline Rhythm (Gates 33–36):**
   - `html, body { overflow-x: clip; }` mandatory on every build (`0` horizontal scroll from `320px` to `1920px`).
   - Highlighter `<mark>` bands sit behind the x-height (`38%–92%`), underlines `1–2px` offset `1–2px`.
   - Every flex row mixing buttons + text + icons declares `align-items: center` and `line-height: 1` on intrinsic items.
6. **Typography `2+1` Ceiling & Roman Purity (Gates 37–38a, 54–55):**
   - Max **3 font families** total (`--font-display`, `--font-body`, and at most 1 `--font-outlier` used in max 2 slots).
   - **0 italic headings** (`font-style: normal` on all `h1–h6` and display classes; no `<em>` inside headings).
   - Uppercase display headings enforce `line-height >= 1.02` (zero cap-collision on wrap).
   - Section eyebrows (when used, max 1–2/page) stack **vertically** above the heading (`1fr`), never side-by-side (`tag-left, heading-right` banned!).
7. **Input Field 5-Rule Gate & Contrast Math (Gates 39–41):**
   - Inputs keep `border-width: 1px` across all states, use `outline: 2px solid var(--color-focus)` for focus, match adjacent button height (`>= 44px`), reserve `min-height: 1lh` for error text, and use 3-channel `disabled` styling.
   - Every text/background pair clears **WCAG 4.5:1 / APCA Lc >= 60** (`|L_text - L_bg| >= 50%` in OKLCH). Always define `--color-accent-ink` on accent fills and swap text color on dark sections (`L < 50%`).
8. **Mobile Non-Negotiables (Gates 49–53, 56):**
   - `0` two-line clickable text (`white-space: nowrap` on buttons/CTAs/nav links).
   - Image-bearing grid tracks use `minmax(0, 1fr)`, never bare `1fr`.
   - Display headings include `overflow-wrap: anywhere; min-width: 0`.
   - Secondary sticky elements offset by `top: var(--banner-height)` with split z-index (`--z-sticky-nav: 300` vs `--z-sticky: 200`) so they never bleed into the top navbar.
