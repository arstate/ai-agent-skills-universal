# Theme & Layout Catalog Reference

`slidedeck-gen` provides 12 built-in design themes and 1,020 layout configurations across 20 functional presentation roles.

---

## 1. Complete Theme Catalog (12 Themes)

### `theme01`: Soft Neumorphism / Clean Modern
- **Visual Feel:** Tactile clean surfaces, soft recessed cards, elegant subtle drop shadows.
- **Color Palette:** Alabaster background (`#f3f4f6`), slate borders (`#e5e7eb`), crisp deep charcoal ink (`#111827`), soft royal blue accent (`#2563eb`).
- **Typography:** Space Grotesk (Titles), Inter (Body).
- **Target Audience:** Product managers, startup pitch decks, enterprise proposals, software documentation.

### `theme02`: Cyber Glow
- **Visual Feel:** High-contrast dark tech aesthetic with luminous neon rim lights and telemetry brackets.
- **Color Palette:** Pitch slate (`#0b0f19`), border tint (`#1e293b`), body text (`#cbd5e1`), vivid emerald (`#10b981`) and cyber cyan (`#06b6d4`) accents.
- **Typography:** Archivo / Space Grotesk, JetBrains Mono for telemetry tags.
- **Target Audience:** AI startups, robotics, hardware launches, developer keynotes.

### `theme03`: Tech Code
- **Visual Feel:** Developer-native terminal aesthetic, dark syntax highlights, line numbers, monospace labels.
- **Color Palette:** Monokai dark background (`#1e1e24`), muted charcoal cards (`#282a36`), terminal green (`#50fa7b`), warm amber (`#f1fa8c`).
- **Typography:** JetBrains Mono & IBM Plex Mono.
- **Target Audience:** Engineering managers, cloud infrastructure teams, developer relations, system architects.

### `theme04`: Glassmorphism
- **Visual Feel:** Frosted glass aesthetic with translucent backdrop blur, vibrant gradient accents, clean modern minimalism.
- **Color Palette:** Translucent white surfaces over subtle organic gradients (`rgba(255,255,255,0.7)`), soft violet (`#8b5cf6`), rose pink (`#ec4899`).
- **Typography:** Inter (Headings & Body).
- **Target Audience:** Consumer mobile apps, design systems, creative agencies, D2C brand presentations.

### `theme05`: Data Spectrum
- **Visual Feel:** Clean, white, structured analytics layout built for dense data visualizations and financial metrics.
- **Color Palette:** Pure white (`#ffffff`), border grey (`#e2e8f0`), deep ink (`#0f172a`), categorical chart palette (Cobalt, Coral, Emerald, Amber, Violet).
- **Typography:** IBM Plex Sans & Archivo.
- **Target Audience:** Data analysts, management consultants, BI teams, research firms.

### `theme06`: Dark Graph
- **Visual Feel:** Connected network nodes, structural grid lines, low-saturation deep slate, technical precision.
- **Color Palette:** Deep navy obsidian (`#070d18`), cyan connection lines (`#00e5ff`), cool grey cards (`#0e1726`).
- **Typography:** Space Grotesk, IBM Plex Sans.
- **Target Audience:** System architecture, supply chain optimization, strategic investment matrices.

### `theme07`: Crisp Whitepaper
- **Visual Feel:** Scholarly, credible, refined editorial aesthetic. Generous white space, razor-sharp black dividers.
- **Color Palette:** Warm alabaster (`#fafaf9`), deep carbon ink (`#1c1917`), subtle sage accent (`#15803d`).
- **Typography:** Newsreader / Georgia (Headings), Inter (Body).
- **Target Audience:** Policy whitepapers, academic research, clinical trials, legal & compliance briefs.

### `theme08`: Noir Luxe
- **Visual Feel:** Ultra-luxury minimalist aesthetic. Deep black background, subtle champagne gold foil accents.
- **Color Palette:** Rich black (`#050505`), brushed champagne gold (`#d4af37`), warm pearl white (`#f5f5f5`).
- **Typography:** Anton / Archivo bold upright, Inter.
- **Target Audience:** Luxury real estate, private equity, high-end automotive, executive proposals.

### `theme09`: Editorial Magazine
- **Visual Feel:** Classic magazine broadsheet format. Asymmetrical balance, large pull quotes, deep navy accents.
- **Color Palette:** Rich midnight navy (`#0a192f`), parchment white (`#f8fafc`), coral crimson (`#ef4444`).
- **Typography:** Newsreader (Serif Display), Inter (Sans-serif Body).
- **Target Audience:** Founder stories, leadership retrospectives, annual corporate magazines.

### `theme10`: Financial Index
- **Visual Feel:** High-density Bloomberg terminal look. Tabular figures, delta indicators, gold metric banners.
- **Color Palette:** Terminal charcoal (`#121316`), financial gold (`#e5a93c`), positive green (`#22c55e`), negative red (`#ef4444`).
- **Typography:** Space Mono & JetBrains Mono.
- **Target Audience:** Hedge funds, private banking, quarterly financial disclosures.

### `theme11`: High Growth
- **Visual Feel:** High-energy venture pitch deck. Bold statistics, stark contrast, forward momentum.
- **Color Palette:** Bright off-white (`#fcfcfd`), cobalt blue (`#1d4ed8`), electric amber (`#f59e0b`), dark carbon (`#09090b`).
- **Typography:** Anton (Numbers), Space Grotesk (Titles), Inter (Body).
- **Target Audience:** Seed & Series A/B fundraising decks, business expansion plans.

### `theme12`: Sonic Neon
- **Visual Feel:** Vibrant, rhythmic, youth-forward aesthetic with neon gradients and soundwave wave forms.
- **Color Palette:** Nightclub black (`#090014`), hot magenta (`#ff007f`), cyan laser (`#00f0ff`).
- **Typography:** Space Grotesk & Anton.
- **Target Audience:** Music entertainment, festival proposals, lifestyle products, media pitches.

---

## 2. Functional Layout Roles (20 Roles)

| Role ID | Purpose | Essential Fields |
|---|---|---|
| `cover` | Presentation title slide | `titleTop`, `titleBottom`, `kicker`, `subtitle`, `date`, `author` |
| `toc` | Agenda & table of contents | `agendaItems[]`, `sectionNumbers[]` |
| `section` | Milestone or chapter transition | `sectionNumber`, `sectionTitle`, `tagline` |
| `metric` | Single giant KPI or North Star stat | `bigNumber`, `unit`, `label`, `trend`, `explanation` |
| `metrics-grid` | 3 to 4 key operational indicators | `stats[].value`, `stats[].unit`, `stats[].label`, `stats[].desc` |
| `trend` | Trajectory, growth curve, quarterly progression | `chartData[]`, `timeframe`, `takeawayHeadline` |
| `comparison` | Competitive matrix or Before vs After | `columns[]`, `features[]`, `verdict` |
| `flow` | Process pipeline or sequential lifecycle | `steps[].number`, `steps[].title`, `steps[].desc` |
| `timeline` | Roadmap, milestones, historical progress | `milestones[].date`, `milestones[].title`, `milestones[].status` |
| `feature-grid` | 3 to 6 capability pillars or cards | `cards[].icon`, `cards[].title`, `cards[].detail` |
| `split-media` | 50/50 text description & hero visual | `headline`, `bulletPoints[]`, `media.src`, `media.alt` |
| `quote` | Customer testimonial or leadership statement | `quoteText`, `speakerName`, `speakerRole`, `avatar` |
| `architecture` | Technical system topology or layered stack | `layers[].name`, `layers[].components[]`, `dataFlow` |
| `swot` | Strategic 2x2 assessment | `strengths[]`, `weaknesses[]`, `opportunities[]`, `threats[]` |
| `radar` | Multi-dimensional skill or capability radar | `axes[]`, `currentScores[]`, `targetScores[]` |
| `funnel` | Conversion funnel or customer acquisition | `stages[].name`, `stages[].count`, `stages[].pct` |
| `heatmap` | Risk matrix or performance density | `matrixData[][]`, `xLabels[]`, `yLabels[]` |
| `gantt` | Project schedule and delivery sprints | `tasks[].name`, `tasks[].startWeek`, `tasks[].duration` |
| `team` | Leadership team profiles | `members[].name`, `members[].role`, `members[].bio`, `members[].photo` |
| `ending` | Conclusion, next steps, contact CTA | `closingStatement`, `actionItems[]`, `contactInfo` |
