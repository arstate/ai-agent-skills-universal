---
name: web-design
description: S-Rank Frontend & Web UI Design Specialist distilled from Impeccable (Paul Bakaus), Taste Skill v2 (Leonxlnx 247-site study), Emil Design Engineering (Emil Kowalski), Jakub Krehel's Interface Skills, UI/UX Pro Max, Build Awwwards-Quality Sites (Meng To), and Anthropic's frontend-design. Includes bundled reference guides for Bad vs Good UI examples, Niche Blueprints, and the 14-Pass Critique Rubric.
---
# Web Design: S-Rank Frontend Taste & Design Engineering (`web-design`)

Opinionated, accessibility-aware, AI-slop-resistant Web & Frontend Design Collaborator distilled from the top S-Rank design skills on `agenticskills.io`: **Impeccable** (Paul Bakaus), **Taste Skill v2** (Leonxlnx), **Emil Design Engineering** (Emil Kowalski), **Jakub Krehel's Interface Skills**, **UI/UX Pro Max**, **Build Awwwards-Quality Sites** (Meng To), and **Anthropic's `frontend-design`**.

## Bundled Reference Guides (Read via `get_skill_resources`)

This skill includes 3 detailed reference manuals in `references/`. Load them when designing, coding, or critiquing interfaces:

1. `references/bad-vs-good-examples.md` - Side-by-side **❌ Desain Jelek (AI Slop)** vs **✅ Desain Bagus (S-Rank Craft)** code & layout comparisons, plus Emil Kowalski's `| Before | After | Why |` UI polish table.
2. `references/niche-ui-blueprints.md` - Ready-to-use art direction, color tokens, typography pairings, and *"One Live Thing"* interactive widget specs by industry (Property/Real Estate, Bridal/Fashion, B2B Agency/SaaS, Aesthetic Clinic/Skincare).
3. `references/14-pass-critique-rubric.md` - The 14-Pass Visual & UX Jury Rubric (`DESIGN-CRITIQUE.md`) used to inspect 7-viewport Vision Agent screenshots and trigger automatic revisions.

## 1. Step 1: Lock the Surface Mode (`Impeccable` Framework)

Before choosing colors or layouts, classify the surface into 1 of 4 modes and record it in `readme-ai-agent/STYLE-GUIDE.md`:

- **`Persuade` (Landing Pages, Campaigns, Pricing, Product Launches):** Visitor decides and acts; design IS the product. Requires a 5-second clarity hook, a 4.3x scale headline (`<= 2 lines`), **1 Live Interactive Proof Widget**, and a single unmistakable conversion action.
- **`Operate` (Dashboards, Admin Panels, Calculators, Settings, Portals):** Visitor completes a task repeatedly; scannability, compact density, keyboard/thumb speed, and `tabular-nums` alignment outrank decorative flourishes.
- **`Read` (Documentation, Proposals, Case Studies, Articles):** Visitor absorbs complex information; prioritize `60ch-70ch` measure, `1.65` line-height, high-contrast ink, and clear semantic landmarks.
- **`Experience` (Lookbooks, Architectural Showcases, Portfolios):** Visitor is immersed in visual craft; let real `aspect-[3/4]` or `16:10` photography/media lead >= 50% of the first viewport while UI chrome recedes.

## 2. Step 2: Empirical Laws of High-Scoring UI (`taste-skill v2` + `jakub-krehel`)

1. **The Subject Inventory & "One Live Thing":**
   - List 8-12 concrete facts unique to this client (location, materials, exact SLA, real numbers).
   - Build **1 Interactive Widget ("One Live Thing")** in the Hero or core offer section using real logic (such as a live KPR monthly installment calculator, package estimator, or date/size availability checker) that works smoothly with a thumb on mobile.
2. **Typography Scale & The 2-Line Headline Rule (`better-typography`):**
   - **Maximum 2 Font Families:** Pair 1 characterful Display font (`Cormorant Garamond`, `Instrument Serif`, `Plus Jakarta Sans`, `Syne`, `Fraunces`, `Schibsted Grotesk`) with 1 clean Body font (`Plus Jakarta Sans`, `Geist`, `DM Sans`, `Inter`).
   - **4.3x Headline-to-Body Ratio:** Use dramatic scale contrast (`clamp(2.25rem, 5vw, 4.5rem)` display vs `16px-18px` body). Maximum 5 font sizes on the entire page.
   - **<= 2 Lines Per Headline (`~32 chars`):** Every `H1-H3` must fit in **2 lines or fewer** at every viewport width with `text-balance` (`tracking: -0.02em` to `-0.04em`).
   - **Numeric Discipline:** Apply `tabular-nums` on every price, counter, phone number, and table cell.
3. **Frame, Equal Outer Margins, & Zero Adjacent Clones (`better-layout`):**
   - Keep equal outer margins on left and right. Never leave a section huddled on one side with the other half empty—close every horizontal band with a photograph, interactive widget, or data table.
   - **Neighbouring sections must NEVER share the same layout structure.**
   - Section vertical rhythm (`120px-200px` desktop; `64px-88px` mobile) must be >= 3x larger than internal card padding (`16px-24px`).
4. **Surface, Color, & Optical Polish (`better-colors` & `better-ui`):**
   - **60-30-10 Tonal Hierarchy:** 60% anti-fatigue ground (`#F8F7F4` warm alabaster or `#090A0F` carbon), 30% deep structural ink (`#141413` / `#0F172A`), 10% sharp conversion accent. (Reserve Avant Studio's `#012969` Navy & `#FF3E1D` Vermillion strictly for internal Brand assets).
   - **Button Geometry Lock:** Choose either crisp architectural square corners (`0px-2px`) OR full pill (`rounded-full`)—ban the weak `9px-16px` soft-rounded default.
   - **Optical Image Border:** Always add `ring-1 ring-inset ring-black/10 dark:ring-white/10` on image containers so light edges never bleed into the background.

## 3. Step 3: Physics-Based Motion & Interaction Polish (`emil-design-eng`)

- **Tactile Press Feedback:** Add `active:scale-[0.97]` (`transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1)`) on all buttons and pressable cards.
- **Never Animate From `scale(0)`:** Enter modals/popovers from `scale(0.95)` and `opacity: 0` using `cubic-bezier(0.23, 1, 0.32, 1)` (`ease-out`), never `ease-in`.
- **GPU-Only Properties:** Animate ONLY `transform` and `opacity` (`< 250ms` for UI controls; `60-90ms` stagger for section reveals).
- **Touch Hover Guard:** Wrap hover transforms inside `@media (hover: hover) and (pointer: fine)` (or Tailwind `hover:`) and always provide a `prefers-reduced-motion: reduce` fallback.
- **Complete 7-State Coverage:** Every interactive control must implement `default`, `hover`, `active`, `focus-visible`, `disabled`, `loading`, and `error` states.

## 4. Step 4: Bounded 2-Round Vision Agent Critique Loop (`DESIGN-CRITIQUE.md`)

1. Render the live page across **all 7 viewports** (`360x800`, `390x844`, `412x915`, `844x390` Landscape, `768x1024`, `1024x768`, `1280x800`).
2. Inspect every screenshot using **Vision Agent (`view_file`)** against the 14 passes in `references/14-pass-critique-rubric.md`.
3. Log the `| Before | After | Why |` critique table in `readme-ai-agent/DESIGN-CRITIQUE.md`, fix all visual defects in a single batch, and re-verify before handoff.


---

## 9. OpenDesign (`nexu-io/open-design`) Anti-Monotony & Brief Engine (NEW DISTILLATION)

Distilled directly from **OpenDesign** (`nexu-io/open-design/tree/main/skills`: `design-brief`, `od-design-refine`, and `skills-protocol.md` / `craft/` modules):

### A. Why AI Web Designs Look Monotonous (And How to Break It)
AI agents default to the same safe template (Inter font + Tailwind Indigo `#6366f1` + centered hero + 3-column bento cards) whenever a user prompt is vague ("buatkan web yang clean dan modern").
To guarantee **zero monotony** and high creative fidelity to the brief, you MUST resolve the **8 Orthogonal Brief Dimensions** before writing a single line of UI code:

| # | Orthogonal Dimension | Description | Anti-Monotony Rule |
|---|---|---|---|
| 1 | **`palette`** (Color Mode & Polarity) | `light` (warm paper / daylight), `dark` (carbon / obsidian), or `high-contrast-editorial` | Never use pure `#000000` on `#FFFFFF`. Pick warm alabaster (`#FAF8F5`), cool stone (`#F4F4F6`), or deep carbon (`#0B0C0E`). |
| 2 | **`accent`** (Primary Brand Accent) | Exact hex/OKLCH token (`var(--accent)`) | **HARD BAN on `#6366f1` (Tailwind Indigo-500)** — it is the #1 AI-generated design tell. **Accent Budget Rule:** `var(--accent)` may appear at most **2–3 times per viewport** (e.g., 1 primary CTA button + 1 active badge/eyebrow). |
| 3 | **`typography`** (Body Font) | Humanist sans, Neo-grotesque, or Editorial serif | Pair characterful body copy (`Plus Jakarta Sans`, `DM Sans`, `Instrument Sans`, `Newsreader`) with `1.6–1.75` line-height and `60ch–70ch` measure. |
| 4 | **`display`** (Headline Font) | High-character display face (`Fraunces`, `Clash Display`, `Cabinet Grotesk`, `Syne`, `Instrument Serif`, `Space Grotesk`) | Never use the same font weight/style for Display and Body without dramatic scale contrast (`3.5x–5x` ratio between H1 and Body). |
| 5 | **`layout`** (Structural Model) | Choose 1 of 6 non-repetitive layout models (see Rotation Matrix below) | Never repeat the centered-text + 3-equal-card layout across consecutive sections. |
| 6 | **`mood`** (Aesthetic Direction) | e.g., `Warm Editorial`, `Kinetic Swiss Grid`, `Tactile Studio`, `Dark Precision`, `Organic Botanical`, `High-Trust Institutional` | Every micro-interaction, border radius (`0px` sharp vs `12px` tactile vs `999px` pill), and shadow must reinforce the chosen mood. |
| 7 | **`density`** (Information & Whitespace Ratio) | `spacious` (luxury/editorial, `>35%` open canvas), `balanced` (SaaS/B2B), or `compact` (data cockpit/trading/directory, `1px` cell hairlines) | Match padding and gap tokens (`--space-section`, `--space-card`) strictly to density. |
| 8 | **`exclude`** (Explicit Constraints & Anti-Patterns) | Niche-specific bans + universal AI-slop bans | Log what is explicitly forbidden for this project (e.g., no glassmorphism on clinical/property sites, no neon cyberpunk on B2B). |

> **Transparency Rule (OpenDesign Protocol):** If the user's brief leaves any of the 8 dimensions unspecified, resolve them intentionally using the niche blueprint and **explicitly list which dimensions were inferred vs user-specified** in `readme-ai-agent/STYLE-GUIDE.md`.

### B. Anti-Monotony Creative Rotation Matrix (6 Distinct Layout Archetypes)
When designing a website, pick the archetype that best fits the brief—never fall back to generic SaaS boilerplate:
1. **Archetype 1 — Editorial Asymmetric Split (`55/45` or `60/40`):** Left column anchored by oversized serif/grotesque headline + single high-contrast CTA; right column features an interactive live product specimen or layered architectural photography with subtle caption index (`01 / 04`).
2. **Archetype 2 — Swiss Hairline Precision Grid (`1px solid var(--border)`):** Exposed structural grid lines dividing the viewport into asymmetric cells (inspired by teenage.engineering / Stripe Press). Zero drop shadows; hierarchy achieved via scale, tabular numerals, and cell padding.
3. **Archetype 3 — Interactive Product-as-Hero (Zero Marketing Fluff):** Above the fold immediately embeds a working calculator, KPR simulator, interactive before/after slider, or live prompt sandbox with a compact top header.
4. **Archetype 4 — Scrollytelling Narrative Spine:** Sticky left or top progress index with full-height narrative chapters that reveal transformation steps, forensic teardowns, or case-study proof points one by one.
5. **Archetype 5 — Tactile Lookbook & Curated Index:** Magazine-style horizontal/vertical rhythm with varied aspect ratios (`4:5` portrait paired with `16:9` widescreen), hover-reveal metadata drawers, and generous warm paper whitespace.
6. **Archetype 6 — High-Density Command Cockpit:** Built for dashboards, analytics, and multi-filter property/catalog search—compact `13px–14px` body, sticky filter rail, keyboard shortcut badges (`⌘K`), and instant skeleton-free state transitions.

### C. OpenDesign `brief-preview.html` Live Specimen Protocol
Whenever starting a major new design system or when the user asks to preview the visual direction before full-page coding, generate a standalone **`brief-preview.html`** (or interactive Style Guide section) containing **4 mandatory visual blocks in exact order**:
1. **Color Palette Swatches:** Visual cards showing each surface, text, border, and accent token with its CSS variable name, hex/OKLCH value, and strict usage percentage (`60%` primary surface, `30%` secondary/text, `10%` accent).
2. **Typography Specimens:** Live rendered H1 Display, H2 Section Header, Body paragraph (`65ch`), and Monospace/Tabular numeral sample (`Rp 4.850.000 / bln`) with computed pixel sizes and tracking values.
3. **Spacing Ruler:** Visual horizontal bars illustrating the spacing scale (`4px`, `8px`, `16px`, `24px`, `48px`, `96px`) and comparing **Card Padding** vs **Section Gap**.
4. **Live Component Triad:** 3 interactive HTML/CSS components rendered side-by-side in their Default, Hover, and Focus/Loading states: (a) Primary & Ghost CTA Buttons, (b) Domain-Specific Feature/Product Card, and (c) Validated Input Field.

### D. Universal Craft Rules (`craft/` Modules) & `od-design-refine` Surgical Patch Loop
1. **Uppercase Tracking Law (`craft/typography.md`):** ALL CAPS text (eyebrows, badges, table headers) MUST always include `letter-spacing: 0.06em` to `0.10em`. Unspaced uppercase is a visual bug.
2. **Accent Scarcity Law (`craft/color.md`):** If everything is highlighted with `var(--accent)`, nothing is highlighted. Keep `var(--accent)` to 2–3 elements per viewport; use contrast and weight for secondary emphasis.
3. **State Coverage Law (`craft/state-coverage.md`):** Every interactive view must account for 5 states: **Ideal, Empty, Loading, Error, and Partial/Overflow** (long Indonesian names/addresses must truncate or wrap cleanly without breaking card heights).
4. **`od-design-refine` Surgical Refinement Loop:** When refining an existing UI that feels "off" or monotonous, do NOT rewrite random components blindly:
   - **Step 1 (Inspect):** Score the current viewport against the 8 Orthogonal Dimensions and 14-Pass Rubric.
   - **Step 2 (Single Highest-Impact Target):** Identify the #1 bottleneck causing monotony (e.g., flat typography scale, overused accent color, equal-height generic cards, cramped section padding).
   - **Step 3 (Minimal High-Impact Patch):** Apply a surgical token/layout patch and verify that contrast, rhythm, and focal point immediately improve.


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

## 11. Anti-AI-Slop Footer Architecture & Zero Meta-Prompt Leak Law (Required HARD BAN)

### A. Dosa Fatal AI Slop: Membocorkan Tech Stack & Prompt Tema di UI Publik ("Homework-Submission Syndrome")
AI agents often treat a website like a homework assignment and echo the prompt instructions or tech stack into the footer or hero subtitle.
- **100% HARD BAN (NEVER WRITE THESE IN PUBLIC UI):**
  - ❌ **Tech-Stack Bragging in Footer:** *"Dibuat dengan Next.js App Router & Tailwind CSS"*, *"Built with React, TypeScript & Framer Motion"*, *"Powered by Vercel"*, *"Crafted with ❤️ and AI"*.
  - ❌ **Prompt / Theme Token Leaks in Footer:** *"Tema Krem Hangat & Tipografi Book Serif"*, *"Desain Minimalis Modern"*, *"Dark Mode Obsidian Theme"*, *"Interactive Bento Section"*.
  - ❌ **Lazy 2-Line Centered Dump:** Never close a webpage with a lazy 2-line centered `<footer class="text-center py-6">` that just dumps copyright + meta-description!

### B. The 4 Studio-Grade Footer Archetypes (Match to Project Niche)

Every website footer MUST follow the **Peak-End Rule** (the final element visitors see must reinforce authority and craft). Pick 1 of these 4 architectures:

| Footer Archetype | Best For | Mandatory Structural Elements |
|---|---|---|
| **1. Editorial / Literary Colophon Footer** | Books, novels, essays, author portfolios, long-form publications (e.g., *Tiket Pulang Paling Sunyi*) | • Top `1px` hairline divider (`border-stone-300/60`)<br>• Asymmetric `flex justify-between` or 3-column book colophon layout<br>• **Left:** Work Title, Author Name (`© 2026 Arya Putra`), Edition/Imprint note (*"Edisi Digital Pertama — Surabaya"*).<br>• **Center/Right:** Chapter index / reading progress reset / `Kembali ke Atas ↑` link.<br>• **ZERO mention of Next.js, Tailwind, or "Tema Krem Hangat"!** |
| **2. Architectural Grid + Oversized Cropped Wordmark** | Creative Agencies, SaaS, Tech Products (*Avant Studio*) | • Upper row: Final conversion CTA + 4-column asymmetric navigation (Identity/NAP, Services, Case Studies, Direct WA Contact).<br>• Bottom edge: Giant cropped brand wordmark (`clamp(4rem, 12vw, 10rem)`, `line-height: 0.85`, low-contrast ink) + crisp left/right legal bar. |
| **3. Local Trust, NAP & Partner Matrix Footer** | Property Developers, Clinics, Local High-Ticket Services (*Apex Property*) | • Verified physical office address / survey meeting point, operating hours, KPR Bank partner badges (BTN, BSI, BRI, Mandiri, BNI), direct WhatsApp CS button, and official company copyright. |
| **4. Swiss Hairline Micro-Bar (`justify-between`)** | Minimalist Single-Page Tools, Calculators, Reading Modes | • Single `1px` top border, `max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-8 text-xs tracking-wide`.<br>• Left: Copyright & real author/entity. Right: Real chapter/utility links + `Back to Top ↑`. |


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

## 13. `Dembrandt` & `Awards MCP` Automated Live Website Design-Token Extractor

Distilled from **`dembrandt/dembrandt`** (`https://github.com/dembrandt/dembrandt`) & **`dembrandt/dembrandt-skills`**:
Whenever the user gives you a live award-winning website URL (Awwwards, Framer, Godly, or competitor URL) and says *"Pelajari desain/animasi web ini dan tiru gayanya"*:
1. **One-Command / Script Token Extraction (`Dembrandt` Protocol):**
   - If running on a local machine with Node.js/network, run `npx dembrandt <url>` (or use the Dembrandt MCP / Chrome CDP script) to extract the live DOM's computed styles into structured W3C Design Tokens (`DESIGN.md` + `DESIGN-DNA.json`):
     - **Computed Color Palette:** Background surfaces, text hierarchy, border hairlines, and exact accent hexes.
     - **Typography Scale:** Computed `fontFamily`, `fontSize` scale (`H1` to `caption`), `lineHeight`, and `letterSpacing`.
     - **Spacing, Radius & Elevation:** Section padding, grid gaps, `borderRadius` tokens, and `boxShadow` layers.
     - **Motion & Scroll Choreography:** Inspect `<canvas>`, GSAP `ScrollTrigger` pins, CSS `transition-timing-function` cubic-beziers, and keyframe animations.
2. **Document to `readme-ai-agent/STYLE-GUIDE.md` & `DESIGN-DNA.json` First:**
   - Save the extracted tokens into `readme-ai-agent/STYLE-GUIDE.md` before generating any component so the entire swarm builds from verified real-world tokens rather than guessing!

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

## 14. Protokol Wajib Saat User Minta "Contoh Desain Style Web / Visual Preview" (Anti-Generic Showcase Law)

Ketika user meminta *"contoh desain style webnya bro visual mau saya lihat"* atau meminta opsi gaya desain sebelum membangun web:
1. **DILARANG KERAS menyodorkan 3 gaya generik klise** (seperti *Dark Steel #0B0F17*, *Swiss Clean #FFFFFF*, *Pitch Black #050505* tanpa foto dan tanpa materialitas fisik)!
2. **Wajib Baca Referensi Dulu Sebelum Membuat File Preview (`design-style-preview.html`):**
   - Baca `references/14-pass-critique-rubric.md` (**48 Tema Material `Nutlope/hallmark` & 58 Gate `sloplint`**) DAN **1 file kategori dari 300-Ref Vault** (`references/cat-01..10-*.md` yang sesuai industri klien).
3. **Standar Wajib File Interaktif `design-style-preview.html` (Minimal 5–10 Style Berbeda):**
   - **Wajib Pakai Foto Industri Nyata di Bagian Awal (Hero & Bento):** Gunakan foto fotografi nyata yang relevan dengan bisnis klien (dilengkapi overlay kontras terukur atau framing editorial, `ring-1 ring-inset ring-black/10`).
   - **Wajib Padukan Material Theme `Nutlope/hallmark` + Corporate Bento / Editorial Archetypes:**
     Contoh kurasi untuk B2B / Industri / Korporat:
     1. *Nordic Precision Bento* (Warm sand `#F4EFEA`, forest steel `#1C2826`, Plus Jakarta Sans + JetBrains Mono, 6-tile asymmetric Bento + foto nyata)
     2. *Blueprint CAD Bento* (Prussian blue `#0A2540`, garis ukuran teknis `1px`, Chakra Petch / Space Grotesk + Mono)
     3. *Formwork Cast Industrial* (Concrete stone `#E6E4E0`, hard offset shadow `6px`, Oswald 700 + Safety Orange `#FF4F00`)
     4. *Executive Swiss ISO* (Alabaster `#FAF8F5`, Cobalt `#1D4ED8`, grid hairline `1px` presisi metrologi)
     5. *Titanium Bento Cockpit* (Carbon slate `#0B0F17`, Safety Amber `#F59E0B`, telemetri mesin & kalkulator RFQ)
     6. *Werkstatt Bauhaus Ledger* (Warm putty `#D8D3C8`, garis tinta `3px` pembagi data, Jost 700)
     7. *Black Foundry* (Cast iron `#111215`, milled brass accent `#C5A059`, Space Grotesk)
     8. *Editorial Broadsheet* (Warm paper `#FBF9F5`, Playfair / Instrument Serif upright roman, gaya laporan tahunan Eropa)
   - **Wajib Bebas AI Slop (`58/58 sloplint` Pass):** `0` kata miring (`<em>`) di dalam heading, `0` bingkai browser palsu, `0` dot animasi ngambang tanpa fungsi, dan wajib ada tombol switcher interaktif (`1 s/d N` + mode `"Bandingkan Semua"`).


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

