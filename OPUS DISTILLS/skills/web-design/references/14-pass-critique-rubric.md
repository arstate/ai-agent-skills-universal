# The 14-Pass Visual & UX Jury Rubric (`DESIGN-CRITIQUE.md`)

Distilled from Leonxlnx `taste-skill v2`, Paul Bakaus `Impeccable`, Emil Kowalski `emil-design-eng`, and Jakub Krehel `interface-review`. Run this 14-pass audit on the rendered screenshots (`view_file`) across Mobile (`360px`/`390px`), Tablet (`768px`), and Desktop (`1280px+`).

---

## Scoring & Auto-Revision Rule
- Setiap Pass dinilai `PASS` atau `FAIL`.
- **Jika ada >= 1 `FAIL`:** Agen **DILARANG** menyerahkan hasil ke user. Wajib tulis temuan di `readme-ai-agent/DESIGN-CRITIQUE.md`, perbaiki kodenya dalam 1 *batch*, dan render ulang!

| Pass # | Nama Pemeriksaan | Standar Lulus (`PASS` Criteria) | Ciri Gagal (`FAIL` -> Wajib Revisi) |
| :--- | :--- | :--- | :--- |
| **Pass 1** | **5-Second Stranger Test** | Orang asing yang melihat layar pertama selama 5 detik langsung tahu: (1) Ini web/dokumen apa, (2) Untuk siapa, dan (3) Tombol apa yang harus diklik. | Judul terlalu puitis/abstrak tanpa penjelasan konkret di bawahnya. |
| **Pass 2** | **2-Line Headline Law** | Seluruh `H1` sampai `H3` muat dalam **<= 2 baris** (`~32 karakter`) di lebar `360px`, `768px`, dan `1280px` dengan `text-balance`. | Judul meluber jadi 3-5 baris atau menyisakan 1 kata yatim di baris terakhir. |
| **Pass 3** | **4.3x Scale Contrast** | Ukuran teks judul utama minimal **3x - 4.3x** lebih besar dari teks body (`16px`), menciptakan fokus visual instan. | Ukuran judul dan subjudul hampir sama besar (datar/monoton). |
| **Pass 4** | **Equal Outer Frame & No Void** | Margin kiri dan kanan halaman sama persis; tidak ada seksi yang berat sebelah dengan separuh layar kosong melompong. | Teks menumpuk di kiri sementara sisi kanan kosong tanpa gambar/tabel/widget. |
| **Pass 5** | **Zero Adjacent Layout Clones** | Tidak ada dua seksi bersebelahan yang memakai struktur grid/layout yang sama persis. | Tiga seksi berturut-turut semuanya memakai grid 3-kolom kartu yang sama. |
| **Pass 6** | **14-Point Anti-Slop Sweep** | **0 emoji**, 0 gradien ungu-biru AI, 0 kartu *thick-left-border*, 0 ikon dalam lingkaran klise, 0 istilah terlarang. | Masih ditemukan emoji (🚀, ✨, 🔥) atau kotak-kotak fitur generik. |
| **Pass 7** | **"One Live Thing" Check** | Ada minimal 1 komponen interaktif fungsional yang relevan dengan bisnis klien (kalkulator, filter instan, simulasi). | Halaman 100% pasif/statis seperti brosur teks biasa. |
| **Pass 8** | **Mobile 1-Line Ergonomics (`360px`)** | Di layar `360x800` & `390x844`, item daftar/katalog tampil ringkas **1 baris** (`min-w-0 flex-1 truncate`) dengan akordion mulus. | Kartu katalog di HP terlalu panjang ke bawah atau memicu *horizontal scrollbar*. |
| **Pass 9** | **7 Interactive States Pass** | Semua tombol/input memiliki *state* `default`, `hover` (dikunci `@media (hover: hover)`), `active:scale-[0.97]`, `focus-visible`, `disabled`, `loading`, dan `error`. | Tombol tidak bereaksi saat ditekan atau input tidak punya *focus ring*. |
| **Pass 10** | **Motion & Physics Discipline** | Animasi hanya memakai `transform` & `opacity`, durasi UI `< 250ms` dengan kurva `ease-out` tegas, 0 `scale(0)`, dan patuh `prefers-reduced-motion`. | Memakai `transition: all`, `ease-in` yang lambat, atau animasi yang menghalangi bacaan. |
| **Pass 11** | **Optical Details & Tabular Nums** | Semua foto di latar terang memiliki `ring-1 ring-inset ring-black/10`; semua angka harga/statistik memakai `tabular-nums`. | Foto putih bocor menyatu ke background putih; deretan angka tidak rata vertikal. |
| **Pass 12** | **Honest Imagery & Aspect Ratio** | Foto produk/tim memakai rasio konsisten (`aspect-[3/4]` atau `aspect-[4/3]`) tanpa gepeng (`object-cover`) dan 0 testimoni/logo palsu. | Gambar tertarik (*stretched*) atau memakai foto stok palsu untuk testimoni. |
| **Pass 13** | **35-40% Breathing Room** | Jarak antar seksi (`120px-200px` di desktop; `56px-80px` di HP) jauh lebih lega daripada jarak di dalam kartu (`16px-24px`). | Elemen saling menempel sempit atau teks menyentuh garis border. |
| **Pass 14** | **Zero-Leak Conversion Funnel** | Tombol utama dan Sticky WhatsApp Bar (`scrollY > 160px`) langsung mengarah ke aksi konversi dengan pesan *pre-filled* ter-encode rapi. | Ada link luar yang membuat prospek kabur dari halaman sebelum konversi. |


---

## Pass 15: Footer Craft & Zero Meta-Prompt / Tech-Stack Bleed Gate (CRITICAL ANTI-SLOP CHECK)

- **FAIL (`0/10` Instant Reject):** The footer or UI contains self-referential AI meta-text or tech-stack bragging such as *"Dibuat dengan Next.js App Router & Tailwind CSS"*, *"Built with React & GSAP"*, *"Tema Krem Hangat & Tipografi Book Serif"*, *"Crafted with ❤️"*, or uses a lazy 2-line centered text dump.
- **PASS (`10/10` Studio Grade):** Zero mention of frameworks or prompt theme names anywhere in the customer-facing UI; footer uses an intentional domain archetype (**Editorial Colophon**, **Architectural Multi-Column + Cropped Wordmark**, **Local NAP Trust Matrix**, or **Swiss `1px` Hairline `justify-between` Bar**).
- **Automated Grep Check (Run before shipping):**
  ```bash
  grep -riE "Dibuat dengan|Built with Next|Tailwind CSS|App Router|Tema Krem|Tipografi Book|Powered by Vercel|Crafted with" src/
  ```
  *(Must return 0 matches in customer-facing components!)*

---

# PART 2: `Nutlope/hallmark` (v2.8.0) — 58 `sloplint` Anti-Slop Gates, 48 Material Themes, 21 Macrostructures & 6 Universal Disciplines

Distilled from **`https://github.com/Nutlope/hallmark`** (Together AI / Hassan El Mghari — 35.6k+ GitHub Stars). Makes AI-generated UIs look **intentionally made by a human studio, never machine-generated**.

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
2. **Microinteractions & Motion Discipline (Gates 10–19):**
   - `0` `transition: all` / `transition-all` (always specify exact properties: `transform, opacity, background-color`).
   - `0` uniform `hover:scale-105` spammed across cards; `0` bouncy overshoot easings on UI buttons/modals/tooltips.
   - Focus rings (`:focus-visible`) appear **instantly (`0ms`)** at `>= 3:1` contrast—never fade in a focus ring!
   - Tooltip hover delay `800ms`, focus delay `0ms`.
3. **Token, Chroma & Scale Discipline (Gates 22–27, 48):**
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

---

# PART 3: `Nutlope/hallmark` v2.8.0 COMPLETE RETRAINING — 48 Material Themes Token Table, 83-Gate Floor/Reflex/Finish System, Page Invariants (`F15`), Signature (`Gate 82`), & Direct GitHub Repo Protocol

> **Required DIRECT REPO & THEME READ RULE:**
> Whenever designing a website, building `design-style-preview.html`, or running a UI redesign/audit:
> 1. **Read Local / Cloned Hallmark Repo (`skills/hallmark/` or `skills/hallmark/`):**
>    - Read `references/themes/<slug>.md`, `references/macrostructures/<NN-slug>.md`, `references/craft.md`, `references/layout.md`, `references/direction.md`, and `references/gates.md` (or fetch from `https://github.com/Nutlope/hallmark/tree/main/skills/hallmark/references` when online).
>    - If Node.js is available locally, run `node skills/hallmark/scripts/theme.mjs deal` and lint every build with `node skills/hallmark/scripts/sloplint.mjs <output> --render`.
> 2. **Apply the Complete 48 Material Themes & 83-Gate v2.8.0 Specification Below:**

---

## A. New in Hallmark v2.8.0: Page Invariants (`F15`), The Signature (`Gate 82`), Mirror Test, & Copy-as-Design (`craft.md § 6`)

1. **Page Invariants (`Gate F15` — Hard Consistency Law):**
   Every page must hold these 5 invariants from top to bottom:
   - **One primary button style** across the entire page.
   - **One container max-width** (`--container-max`) aligning left edges down the page.
   - **One column gap** (`--grid-gap`) below the hero.
   - **One border-radius per nesting level** (outer container radius > inner card radius > button/input radius; never mix random radii at the same level).
   - **Never more centered heading groups than left-aligned ones!** (Left-flush or asymmetric alignment must dominate; centering every section header is an instant `REFLEX` fail).
2. **The Signature (`Gate 82` — One Unforgettable Thing on Screen 1):**
   - Every build must feature **1 Signature** on the first screen: the prompt's strongest real fact or mechanism shown at its best in the theme's physical material (e.g., an interactive tolerance/RFQ calculator, a live CAD blueprint table, a real workshop photograph at full bleed, or the actual price set huge because price is the offer).
   - *Gate 82 Rule:* A decorative number drawn as marks (`01 / 04`) is a device, **not** a Signature! Name the Signature explicitly in the CSS stamp (`signature: <description>`).
3. **The Mirror Test & Competitor Name Swap Test (`direction.md`):**
   - **Mirror Test:** *"Would a neighbouring prompt in the same industry get this exact combination of shape, hero posture, nav, and footer? If yes, change at least one structural decision and state which."*
   - **Competitor Swap Test:** *"Put the nearest competitor's name on the page; if the headlines and layout still work unchanged, the page is still a generic template—rewrite using the client's exact nouns, machines, locations, and real numbers!"*
   - **Anti-Two-Fragment Headline Rule (`craft.md § 6`):** Never write the AI-cliché headline made of two clipped fragments with a period (*"Built for speed. Designed for scale."* / *"Presisi Tinggi. Harga Terjangkau."*). Write a single complete, fact-bearing sentence (`<= 7 words / <= 50 chars`) using the owner's real nouns!
4. **The Picture Deletion Test (`Gate 83` & `imagery.md`):**
   - *"Every picture must pass the deletion test: take it away and the page loses a concrete fact. A picture for mood alone goes."*
   - Never ship a wall of tiny stock photos; use fewer, larger, high-impact photographs (`aspect-[3/4]`, `16:10`, or `4:3`) with real captions naming the machine, material, or location!

---

## B. Master Specification of Key Hallmark Material Themes (From the 48-Theme Catalog)

Each theme is a **physical material** (Paper OKLCH/Hex, Ink, Accent, Display + Body Fonts, Surface Rule, and Signature Component Voice):

| # | Theme Name | Genre | Paper (`--color-paper`) | Ink (`--color-ink`) | Accent (`--color-accent`) | Display + Body Font Pairing | Materiality, Surface & Signature Voice |
|---|---|---|---|---|---|---|---|
| 1 | **`Blueprint`** | Modern-Minimal | `#0A2540` (Prussian Blueprint `oklch(24% 0.07 250)`) | `#F0F6FF` (Drafting White) | `#38BDF8` / `#F59E0B` (CAD Cyan / Amber) | `Space Grotesk` / `Chakra Petch` + `JetBrains Mono` | Exposed `1px` CAD dimension lines (`rgba(240,246,255,0.18)`), `+` crosshair corner ticks, `45°` leader callouts, tabular tolerance tables. |
| 2 | **`Formwork`** | Modern-Minimal | `#E6E4DF` (Poured Concrete `oklch(91% 0.01 85)`) | `#141413` (Rebar Carbon) | `#FF4F00` (Safety International Orange) | `Oswald` / `Barlow Condensed` 700 + `Plus Jakarta Sans` | Architectural board-formed concrete surfaces, hard `6px 6px 0 #141413` structural offset shadows, `2px` solid ink rules, heavy industrial spec plates. |
| 3 | **`Werkstatt`** | Modern-Minimal | `#D8D3C8` (Bauhaus Putty `oklch(86% 0.018 80)`) | `#111110` (Printer's Ink) | `#C83E2B` (Vermilion Workshop Stamp) | `Jost` 700 / `Syne` + `IBM Plex Sans` | Thick `3px` horizontal ledger bars separating sections, exposed `1px` cell borders, DIN-standard technical spec sheets, zero rounded corners (`0px`). |
| 4 | **`Cobalt`** | Modern-Minimal | `#F8FAFC` (Cool Technical Paper `oklch(98% 0.006 245)`) | `#0F172A` (Deep Slate) | `#1D4ED8` (Signal Cobalt `oklch(52% 0.20 260)`) | `Space Grotesk` 700 + `Inter` + `JetBrains Mono` | Precision telemetry console, `1px` cool slate hairlines (`#E2E8F0`), live interactive status/command widgets, crisp `4px` technical radius. |
| 5 | **`Dusk`** | Modern-Minimal | `#13161C` (Twilight Slate `oklch(20% 0.015 255)`) | `#F1F5F9` (Alabaster Mist) | `#E2A04A` (Warm Brass Ledger) | `Instrument Serif` (upright) + `Plus Jakarta Sans` | Financial/B2B reconciliation ledger, elevated slate panels (`#1C2029`), hairline top-lit borders (`rgba(255,255,255,0.08)`), tabular balance sheets. |
| 6 | **`Studio`** | Editorial | `#F6F5F0` (Warm Cotton Paper `oklch(96% 0.012 90)`) | `#161816` (Charcoal Ink) | `#1E4D2B` (Forest Studio Green `~3%`) | `Instrument Serif` / `Playfair Display` (roman) + `Plus Jakarta Sans` | Identity studio & architectural monograph, oversized construction marks, asymmetric `60/40` diptych splits, generous `35%+` warm paper breathing room. |
| 7 | **`Atelier`** | Editorial | `#FAF6F0` (Cream Vellum `oklch(97% 0.015 75)`) | `#1F1A17` (Espresso Ink) | `#8C3B2B` (Terracotta Wax) | `Cormorant Garamond` 600 (roman) + `DM Sans` | Haute-couture & luxury craft atelier, `0.5px` warm rule dividers, portrait `aspect-[3/4]` editorial frames, numbered blotter/specimen cards. |
| 8 | **`Furrow`** | Editorial | `#F4EFE6` (Field Parchment `oklch(95% 0.02 80)`) | `#1C241E` (Deep Loam) | `#4A6B49` (Field Sage) / `#B85D19` | `Fraunces` (roman) + `Plus Jakarta Sans` | Grounded real-estate, land, & agricultural/industrial supply records, survey map pins, honest tabular logs, warm tactile card surfaces (`#EBE4D8`). |
| 9 | **`Kiln`** | Editorial | `#F2EFE9` (Raw Stoneware `oklch(95% 0.01 70)`) | `#181715` (Charcoal Oxide) | `#57534E` (Warm Iron Monochrome) | `Newsreader` (roman) + `Geist` | Tactile craft & manufacturing school, high-contrast black-and-white/duotone workshop photography paired with warm stoneware typography. |
| 10 | **`Midnight`** | Atmospheric | `#0B0C10` (Obsidian Nocturnal `oklch(15% 0.012 265)`) | `#F3F4F6` (Silver Ink) | `#60A5FA` / `#F59E0B` (Stage Amber) | `Cabinet Grotesk` / `Syne` + `Plus Jakarta Sans` | Deep nocturnal showcase, silhouette lighting, dark elevated surfaces (`#14161D`), crisp `1px` rim highlights, zero muddy drop shadows. |
| 11 | **`Terminal`** | Atmospheric | `#090D0A` (CRT Phosphor Dark `oklch(14% 0.015 150)`) | `#D1FAE5` (Mint Phosphor) | `#10B981` (Signal Emerald `oklch(70% 0.17 155)`) | `JetBrains Mono` / `Geist Mono` (Single-Family Allowed) | Pure command-line & engineering telemetry aesthetic, ASCII/box-drawing borders, live interactive CLI/calculator inputs, `0px` square corners. |
| 12 | **`Hum`** | Playful | `#FDFBF7` (Warm Oat `oklch(98% 0.01 85)`) | `#1E1B18` (Warm Ink) | `#E05A47` (Coral Clay) | `Plus Jakarta Sans` 800 + `Plus Jakarta Sans` 400 | Friendly consumer/D2C/family interface, tactile `16px–20px` card radius, warm pill controls, approachable interactive step cards. |
| 13 | **`Dose`** | Playful | `#F7F9FB` (Clinical Air `oklch(98% 0.008 230)`) | `#0F172A` (Deep Navy) | `#0D9488` (Medical Teal) | `Outfit` / `Plus Jakarta Sans` + `DM Sans` | High-trust healthcare, clinic, & pharmacy schedule interface, translucent organizer cards, crystal-clear dosage/pricing tables, `>= 48px` tap targets. |
| 14 | **`Ribbon`** | Playful | `#11131A` (Calm Night `oklch(18% 0.02 265)`) | `#F8FAFC` (Soft White) | `#F472B6` / `#38BDF8` | `Instrument Sans` (upright) + `Inter` | Calm acoustic/wellness/hospitality portal, smooth fader/slider interactive controls, tranquil horizontal rhythm. |
| 15 | **`Nordic Precision`** *(Custom)* | Editorial / Minimal | `#F4EFEA` (Warm Nordic Sand `oklch(95% 0.014 75)`) | `#1C2826` (Forest Steel `oklch(25% 0.02 180)`) | `#B45309` / `#1E4D2B` (Nordic Amber / Pine) | `Plus Jakarta Sans` 700 + `Inter` + `JetBrains Mono` | Scandinavian industrial & corporate Bento precision: warm anti-glare sand canvas, deep forest-steel typography, `1px` `#DED8CE` hairlines, real workshop photography + 6-tile asymmetric Bento + live WhatsApp RFQ calculator. |

*(Full 48-theme catalog also includes: `Specimen, Newsprint, Manifesto, Almanac, Garden, Riso, Sport, Editorial, Carnival, Grid, Broadside, Hedgerow, Ink, Loom, Overprint, Vellum, Coral, Piste, Rim, Solstice, Wayfind, Paste-up, Bloom, Aurora, Lumen, Console, Darkroom, Ultraviolet, Arcade, Halftone, Spore, Squeeze, Sticker, Terrazzo`.)*

---

## C. SaaS & B2B Section Deck ("Every Deal Deviates Twice" — `macrostructures.md`)

When building a B2B, Corporate, Industrial, or SaaS page using `Bento Grid`, `Stat-Led`, `Workbench`, or `Marquee Hero`, build from the **Honest Section Deck** (never invent fake logos or fake stats):
1. **Base Cards (Always Honest):**
   - **Spec Sheet:** Real machine/product capacities, tolerances (`±0.005mm`), dimensions (`6 meter`), materials (`VCN150, SS316, SKD11`), SLA (`24–48 Jam`) in a crisp Table or Rows (`tabular-nums`).
   - **Worked Example / Live Calculator:** The product or service doing 1 real job (e.g., an interactive RFQ / KPR / Package Estimator that computes real output and routes to WhatsApp).
   - **Comparison Anatomy:** Side-by-side table comparing the client's standard vs conventional workshops/competitors (real operational facts, no fake star ratings).
   - **Pricing / Tier / Process Anatomy:** Clear transparent packages or 4-Stage QC/Production workflow.
   - **Conversational FAQ:** Real buyer objections answered in plain, direct human language.
   - **CTA Strip & Studio Footer:** Single unmistakable action + studio-grade footer (`Ft1, Ft2, Ft5, Ft6, Ft8`).
2. **Mandatory "Deviate Twice" Rule:**
   - Never output the same section sequence twice! On every build: (a) drop at least 1 cliché section, and (b) promote a high-proof section (such as the **Spec Sheet** or **Interactive Calculator**) directly into the Hero or Section #2, and log `deck: -cta +spec-in-hero` in the CSS stamp!


### Gate C-Copy: Zero Meta-Design / Layout Jargon Leakage (Critical Copywriting Gate)
- **Rule:** Never print internal design-system, layout-pattern, or theme names inside customer-facing website HTML/JSX text (navbars, `<h1>`–`<h4>` headings, eyebrow badges, buttons, or body copy).
- **Banned Words in Webpage Text:** `Bento`, `Bento Spesifikasi`, `Bento Grid`, `Hallmark`, `Nordic Precision`, `Blueprint Bento`, `Formwork`, `Werkstatt`, `Hero Section`, `Feature Card`, `CTA Block`, `Macrostructure`.
- **Verification Regex (`sloplint` Check):** Scan all visible DOM text nodes (`nav a`, `h1`, `h2`, `h3`, `.eyebrow`, `button`) for `/\b(bento|hallmark|macrostructure|hero section|cta block|feature grid)\b/i`. Any match inside the website canvas is an automatic fail that must be rewritten to authentic industry terminology (e.g., `Spesifikasi Teknis Pemesinan`, `Kapabilitas Mesin`, `Fasilitas Workshop`).

