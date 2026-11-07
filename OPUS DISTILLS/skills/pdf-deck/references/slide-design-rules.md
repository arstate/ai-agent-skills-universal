# Master Slide Design Rules: High-Taste, Zero-Clutter Architecture (`slidedeck-gen`)

This guide establishes the mandatory typographic, layout, and visual principles for generating publication-grade 16:9 presentation slides. Every AI agent generating slides MUST follow these rules to guarantee that outputs are never messy, cluttered, or overflowing.

---

## 1. The Core 16:9 Canvas Disciplines (`1920x1080`)

1. **Strict 16:9 Fixed Stage:**
   - Base dimensions are always exactly `1920px` wide by `1080px` high.
   - All elements use fluid viewport or percentage scaling with safe inner bounds.
   - **Outer Safe Zone:** `padding: 80px 100px`. Zero text, buttons, or card borders may touch or crowd within `80px` of any canvas edge.
   - **Max Content Height:** Content must never exceed `920px` total vertical span. This prevents any slide from spilling or creating scrollbars.

2. **The 40% Negative Space Mandate:**
   - At least 35% to 40% of every slide canvas must remain empty breathing room.
   - When a slide feels crowded, **distill content by 30%** rather than shrinking font sizes into illegible fine print.
   - Every card has internal breathing room: `padding: 28px 32px; gap: 24px`.

---

## 2. Layout Archetypes & Structural Rules

### Archetype A: Cover / Hero Slide (`<!-- layout: cover -->`)
- **Visual Weight:** Highest typographic drama.
- **Title Sizing:** `font-size: 88px - 104px; line-height: 1.05; letter-spacing: -0.03em`.
- **Kicker:** Mono uppercase pill (`12px - 14px`, letter-spacing `0.15em`, accent color).
- **Subtitle:** Crisp lead sentence (`24px - 28px`, muted body color, max 2 lines).
- **Metadata Badge:** Bottom status pill or author/date tag.

### Archetype B: Asymmetric Split Layout (`<!-- layout: split -->`)
- **Structure:** 2 distinct columns (Ratio `1.15fr : 0.85fr` or `60% : 40%`).
- **Left Column (Primary Thesis):**
  * Kicker + H2 Heading (`44px - 52px`).
  * Narrative paragraph (`20px`, max 3-4 sentences).
  * Key takeaway pill or action button.
- **Right Column (Supporting Evidence):**
  * Stack of 2-3 structured cards, OR
  * A 2-cell metric column, OR
  * A featured quote or code callout.
- **Rule:** Left and right columns must be separate DOM containers (`.split-col-left` and `.split-col-right`) to prevent items from scattering into random grid cells.

### Archetype C: Bento Grid Matrix (`<!-- layout: bento -->` or `<!-- layout: grid -->`)
- **Card Ceiling:** Maximum 3 to 4 cards per slide. NEVER pack 6+ cards onto a single slide!
- **Grid Layout:**
  * 3 Cards: 3 equal vertical columns (`grid-template-columns: repeat(3, 1fr)`), OR 1 hero card (span 2) + 2 standard cards.
  * 4 Cards: 2x2 symmetrical grid (`grid-template-columns: repeat(2, 1fr); gap: 24px;`).
- **Card Anatomy:**
  * Top: Category label or icon.
  * Title: Bold H4 (`22px - 26px`, font-weight `700`, max 2 lines).
  * Description: Explanatory copy (`16px - 18px`, color `var(--text-body)`, max 3 lines).

### Archetype D: Metric Hero Cards (`<!-- layout: metrics -->`)
- **Structure:** 2 to 4 oversized metric callout cards.
- **Number Styling:**
  * `font-size: 76px - 88px; font-weight: 800; line-height: 1; letter-spacing: -0.04em`.
  * Always use `font-variant-numeric: tabular-nums` for precise alignment.
  * Accent color on the numeric glyphs.
- **Label Styling:**
  * Primary metric title: `18px - 20px`, bold, uppercase, letter-spacing `0.05em`.
  * Contextual description: `14px - 16px`, muted text explaining the metric.

### Archetype E: Progression Flow / Timeline (`<!-- layout: flow -->` or `<!-- layout: timeline -->`)
- **Structure:** 3 to 4 horizontal milestone steps.
- **Connector:** Subtle horizontal progress line connecting the step nodes.
- **Step Badge:** Circle or pill containing the phase number (`1`, `2`, `3`, `4`).
- **Content:** Title (`20px bold`) + short execution bullet points (`15px`).

### Archetype F: Comparison / Versus (`<!-- layout: comparison -->`)
- **Structure:** 2 parallel vertical cards side by side (`grid-template-columns: 1fr 1fr; gap: 36px;`).
- **Left Card (Before / Challenge):** Muted slate border, subdued background, neutral/red warning markers.
- **Right Card (After / Solution):** Glowing accent border, elevated surface, checkmark markers.

### Archetype G: Keynote Quote Spotlight (`<!-- layout: quote -->`)
- **Structure:** Centered single statement with giant decorative quote mark.
- **Typography:** `font-size: 44px - 56px; font-weight: 500; line-height: 1.25; max-width: 1300px;`.
- **Attribution:** `— Name, Title / Organization` in accent color below.

---

## 3. Typographic Hierarchy & Contrast Ratios

| Element | Font Size | Font Weight | Line Height | Tracking | Max Lines |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cover Title** | `88px - 104px` | `800 / 900` | `1.05` | `-0.03em` | 2 lines |
| **Section Title (H2)** | `44px - 52px` | `700` | `1.15` | `-0.02em` | 2 lines |
| **Card Title (H4)** | `22px - 26px` | `600 / 700` | `1.25` | `-0.01em` | 2 lines |
| **Lead Paragraph** | `22px - 26px` | `400` | `1.45` | `normal` | 3 lines |
| **Body Text** | `17px - 19px` | `400` | `1.55` | `normal` | 4 lines |
| **Mono Kicker** | `12px - 14px` | `600` | `1` | `+0.15em` | 1 line |
| **Hero Metric Number**| `76px - 88px` | `800` | `1` | `-0.04em` | 1 line |

---

## 4. Physical Materiality & Color Balance (60-30-10 Rule)

1. **60% Canvas Ground:** Deep obsidian (`#0A0B10`), rich navy (`#001845`), dark slate (`#121214`), or warm alabaster (`#FAF7F2`).
2. **30% Card & Section Surfaces:**
   - On dark themes: `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.07)` with 1px border `rgba(255, 255, 255, 0.1)`.
   - On light themes: `#FFFFFF` with 1px border `#E4E4E7` and subtle drop shadow.
3. **10% Laser Accent:** Electric orange (`#FF5722`), cyan (`#00D4FF`), neon violet (`#A855F7`), antique gold (`#D4AF37`), or cobalt blue (`#3B82F6`).

---

## 5. Anti-Slop & Quality Assurance Checklist

- [ ] **No Text Overflow:** Does all text fit comfortably inside the slide without hitting the 1080px bottom edge?
- [ ] **Zero Orphaned Words:** Does every heading have a balanced last line (at least 2 words, no lonely word)?
- [ ] **Single Focal Point:** Does the eye immediately know what to read first within 0.5 seconds?
- [ ] **Strict Contrast:** Is all body copy readable with at least `4.5:1` contrast ratio against the background?
- [ ] **Clean Alignment:** Are all left-aligned elements aligned to a single crisp vertical axis?
- [ ] **Vector PDF Print Ready:** Does `-webkit-print-color-adjust: exact !important` apply to all dark backgrounds?
