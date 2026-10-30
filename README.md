# Universal AI Agent Skills Ecosystem (`opus-distills` Edition)

[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-blue.svg)](#)
[![Skills](https://img.shields.io/badge/skills-23%2B%20Universal%20Packs-emerald.svg)](#)
[![Standard](https://img.shields.io/badge/standards-Frontend%20Slides%20%2B%20Hallmark%20v2.8.0-orange.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](#)

A high-performance, production-ready ecosystem of **23+ universal skills**, browser automation tools, and rules engineered for autonomous AI coding agents (**Google Antigravity CLI**, **Claude Desktop / Code**, **Cursor**, **Windsurf**, **Copilot**, **Roo Code**, and **Cline**).

---

## ⚡ Prompt Sekali Paste untuk AI Agent (One-Shot Boot Prompt)

> **Cukup copy-paste prompt di bawah ini ke AI Agent baru (Google Antigravity CLI, Claude, Cursor, Windsurf, Copilot, Roo Code, atau Cline) untuk langsung menginstal, memverifikasi, dan mengaktifkan seluruh 23+ skills, browser tools, dan rules secara otomatis dari awal:**

```markdown
Install dan inisialisasi ekosistem AI Agent Skills Universal (Opus Distills, Next.js Presentation Studio, SVG Gen, Hallmark v2.8.0, Web Builder, dll.) di mesin ini sekarang. Jalankan perintah instalasi berikut:

```bash
if [ -d "$HOME/ai-agent-skills-universal" ]; then
  cd "$HOME/ai-agent-skills-universal" && git pull origin main
else
  git clone --depth 1 https://github.com/arstate/ai-agent-skills-universal.git "$HOME/ai-agent-skills-universal" && cd "$HOME/ai-agent-skills-universal"
fi && bash "OPUS DISTILLS/install-default-opus.sh"
```

Pastikan semua skills terpasang di:
- `~/.agents/skills/`
- `~/.gemini/antigravity-cli/skills/`
- `~/.gemini/config/skills/`
- `~/.gemini/antigravity/skills/`
- `~/.cursor/skills/` dan `~/.claude/skills/` (jika ada)

Terapkan standar kerja:
1. Split-channel communication: respon chat ultra-terse (padat, efisien, zero filler) & deliverable kode 100% utuh tanpa potongan.
2. Presentation Studio Engine (`next-slidedeck-engine`): 39 curated palettes, mode AI GEN otonom (1 opsi fleksibel tanpa rigid template lock), kontras WCAG AAA, dan nol stroke perimeter hijau artifisial.
3. Microstock Vector Standard (`svg-gen`): 10 Iron Laws, resolusi >= 15.0 MP, 100% closed compound paths (Z), zero live strokes, zero alpha raster (cairo_image = 0), dan auto metadata Dublin Core & XMP.
```

---

## 💻 Manual CLI One-Liner Installation

Jika ingin menginstal langsung via terminal host tanpa melalui prompt AI:

```bash
if [ -d "$HOME/ai-agent-skills-universal" ]; then
  cd "$HOME/ai-agent-skills-universal" && git pull origin main
else
  git clone --depth 1 https://github.com/arstate/ai-agent-skills-universal.git "$HOME/ai-agent-skills-universal" && cd "$HOME/ai-agent-skills-universal"
fi && bash "OPUS DISTILLS/install-default-opus.sh"
```

---

## 🚀 Key Highlights & Capabilities

### 1. Presentation Studio Engine: `next-slidedeck-engine`, `slide-design`, & `slidedeck-gen`
Autonomous presentation studio engine built on Next.js, featuring full multi-aesthetic creative freedom:
- **Next.js Multi-Aesthetic Presentation Studio (`next-slidedeck-engine`)**:
  * Built from scratch on Next.js App Router, React 19, Tailwind CSS, Lucide icons, and Framer Motion.
  * **Autonomous AI GEN Mode (Single Flexible Option):** Eliminates rigid template pickers in favor of 1 single `AI GEN (Autonomous Creative Layout)` option. The AI agent retains complete creative freedom to tailor visual geometry, kinetic accents, brand typography, and adaptive layouts per slide.
  * **Full Creative Design Freedom (Never Locked to Dark Mode):** 39 curated palettes from SlideSpeak (`slide-design-skill`) and Zara Zhang (`frontend-slides`):
    - Light & Cream Editorial: Consulting Cream (`#F7F5F2`), Academic Slate (`#F5F1E8`), Kanagi Washi (`#EFEAE2`), Neue Klasse (`#FFFFFF`), OpEx Navy, Notebook Tabs, Pastel Geometry, Vintage Editorial, Swiss Modern, Paper & Ink, Pin & Paper, Vellum, Neo Grid Bold.
    - Vibrant & Bold Accents: Bold Signal Coral (`#FF5722`), Electric Studio Royal Split (`#4361EE`), Creative Voltage Neon Lime (`#D4FF00`), Venture Pitch Cobalt (`#2563EB`), Neon Cyber (`#00FFCC`), Sakura Chroma, Creative Mode.
    - Minimalist Dark: Obsidian Pure (`#000000`), Titanium Precision, Swiss Dark, Editorial Noir, Graphite Telemetry, Velvet Charcoal, Editorial Forest, Cobalt Grid, Emerald Editorial.
    - **0% emoji/cartoon clutter:** Disciplined typography, mathematical grid alignment, WCAG AAA contrast enforcement, and zero outer perimeter border strokes.
  * **Topbar Instant Light/Dark Toggle:** Seamlessly toggle between Light Mode and Dark Mode palettes with zero SSR hydration mismatch.
  * **3-Panel Studio Layout:**
    - Left Sidebar: Interactive slide filmstrip, add slide (Cover, Metrics, Split 60/40, Pillars, Bento, Quote, Comparison, Timeline, Image, AI GEN Autonomous, Standalone HTML), reorder, duplicate, delete.
    - Center Canvas: Pristine 16:9 presentation stage (`1920x1080`) with mathematical fixed-ratio scaling (anti-squish). **ZERO overlay buttons or UI clutter inside the slide canvas itself** — 100% focus on presentation design!
    - Right Sidebar: Inspector tabs for Style (39 curated palettes categorized by All/Light/Dark/Vibrant), Text (kicker, title, subtitle, footnote), Elements (metrics, pillars, bento cards, bullets, quote), Animation (Morph Smooth shared-layout transitions, Crossfade, Slide, Zoom, Clip, Flip 3D, Stagger Blur), and Universal Export.
  * **Universal Multi-Target Export:**
    1) Vector PDF (lossless SVG print via `@page { size: 16in 9in; margin: 0; }`)
    2) Raster 4K PDF (high-density canvas snapshot)
    3) Editable PowerPoint (`.pptx` via native PPTX builder)
    4) Pure SVG Vector (single slide or all slides in a ZIP bundle)
  * **Fullscreen Presentation Mode (`F5`):** Complete distraction-free presentation with full keyboard controls (`Arrow`, `Space`, `Enter`, `Home`, `End`, `Esc`).
- **Master Presentation Design Engine (`slide-design`)**:
  * Automated style derivation derived from the brief (never picked from rigid templates).
  * 8 Distinct layout grammars, tokens, and component sets from SlideSpeak (`academic`, `consulting`, `kanagi`, `neue-klasse`, `opex`, `pitch`, `product-marketing`, `training`).
- **Zara Zhang Editorial & Live Preview Engine (`slidedeck-gen`)**:
  * Live Preview Daemon: `slidedeck-gen dev <dir> --daemon` or `slidedeck-gen studio` immediately opens Chrome GUI on CDP port 9223.
  * In-place text editing auto-saved to disk with real-time sync.
  * 34 Zara Zhang Bold Production Archetypes (`signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`, etc.).

### 2. Universal Master Agent & Autonomous Router (`opus-distills`)
- Automatically dispatches user tasks to specialist skills based on intent.
- Guarantees zero "blind-guessing" by enforcing real file inspections before writing code.
- Implements Split-Channel Terse communication: ultra-compressed chat commentary while producing 100% complete, unclipped deliverables.

### 3. Fullstack Web Architecture & Engineering Suite
- **`web-planning`**: Pre-flight user flow architecture, Mermaid diagrams, Next.js 15 App Router static export recommendations (`output: 'export'`), and PRD generation.
- **`web-design`**: High-taste frontend UI engineering integrating `Nutlope/hallmark` v2.8.0 (58 `sloplint` quality gates and 48 physical material themes).
- **`web-builder`**: Autonomous parallel swarm implementation with cold-hero-first layouts, responsive mobile portrait + desktop views, and zero guessing.
- **`web-animation`**: Production GSAP, ScrollTrigger, Flip, and interactive micro-interactions.
- **`web-debugging`**: Forensic 7-viewport responsive testing (`360x800` to `1440x900`), horizontal scroll overflow detection, and security auditing.
- **`web-optimization`**: Next.js zero-usage Vercel shield (1,000,000+ clicks on hobby tier), Cloudflare edge caching, and Core Web Vitals optimization.

### 4. Visual Chrome Browser Control & Live AI Cursor HUD (`chrome-browser-control`)
- Controls headed Google Chrome GUI across Linux, macOS, and Windows via CDP on port `9223`.
- Injects Live AI Cursor HUD (`ai-cursor-hud.js`) featuring animated cursor glide, golden highlight outlines, click ripple waves, and real-time status badges.

### 5. Master Microstock 2D Flat Vector Engine (`svg-gen`)
- **10 Iron Laws of Vector Construction**: Strict 2D flat vector standards guaranteeing 100% curation pass rate on Adobe Stock, Shutterstock, and Freepik.
- **Microstock Engineering Standards**:
  * Canvas resolution $\ge 15.0\text{ Megapixels}$ (`4000x4000`, `5000x5000`, or `5000x3000`).
  * 100% closed compound paths ending in `Z` (`fill-rule="evenodd"`).
  * Zero live strokes (`stroke-width = 0`), zero open polylines.
  * Zero alpha raster effects (`opacity = 0`, `<filter> = 0`, `cairo_image = 0`).
  * Zero text labels (`<text> = 0`) for universal international localization.
  * 100% transparent background on icon sheets (transparent PNG badge).
  * Automated Dublin Core RDF & XMP metadata embedding via Adobe Sensei SEO engine.

---

## 📁 Repository Structure

```
├── OPUS DISTILLS/
│   ├── skills/                       # 23+ Specialized Agent Skills
│   │   ├── slidedeck-gen/            # Presentation Studio & Frontend Slides Engine
│   │   │   ├── bin/slidedeck-gen.mjs # Universal CLI Binary
│   │   │   ├── scripts/              # Compiler, Preview Server, PDF & PPTX Exporters
│   │   │   ├── templates/            # Markdown & JSON Presentation Templates
│   │   │   └── references/           # Design Systems & Layout Catalogues
│   │   ├── opus-distills/            # Master Router & Intent Classifier
│   │   ├── web-master-agent/         # Supreme Web Swarm Orchestrator
│   │   ├── web-planning/             # User Flow & Next.js 15 App Architecture
│   │   ├── web-design/               # Hallmark v2.8.0 58-Gate Design Engine
│   │   ├── web-builder/              # Production Frontend Builder Swarm
│   │   ├── web-animation/            # GSAP Motion Choreography
│   │   ├── web-debugging/            # Forensic 7-Viewport QA & Anti-Hack Auditor
│   │   ├── web-optimization/         # Zero-Usage Vercel & CWV Optimizer
│   │   ├── chrome-browser-control/   # Visual Browser Automation & AI Cursor HUD
│   │   ├── taste-design/             # Non-Web Visual Design & Art Direction
│   │   └── ...                       # Brainstorming, Image Gen, Websearch, etc.
│   ├── auto-boot-configs/            # Global Rules (~/.gemini/AGENTS.md, etc.)
│   ├── tools/                        # Chrome Launchers & CDP Visual Agents
│   ├── install-default-opus.sh       # Multi-Directory Installer
│   └── init-readme-ai-agent.sh       # Project Memory Scaffolder
├── opus_distills_universal_pack.zip  # Re-bundled Universal Distribution Package
├── PROMPT_INSTALL_AI_AGENT.md        # Extended AI Agent Boot Prompt
└── README.md                         # This Documentation
```

---

## 🛠️ CLI Quick Reference (`slidedeck-gen`)

```bash
# Verify runtime dependencies & install engines:
slidedeck-gen install-engine

# Start live presentation dev server with visible Chrome auto-open:
slidedeck-gen dev my-deck --theme bold-signal

# Scaffold a new presentation template:
slidedeck-gen init my-deck --template frontend-slides-editorial

# Compile Markdown to standalone HTML presentation:
slidedeck-gen compile my-deck/deck.md --out dist/my-deck

# Export vector-crisp 16:9 PDF:
slidedeck-gen export-pdf dist/my-deck --out dist/my-deck/presentation.pdf

# Export editable PowerPoint (.pptx):
slidedeck-gen export-pptx dist/my-deck --out dist/my-deck/presentation.pptx
```

---

## 📜 License & Acknowledgments

- Licensed under the **MIT License**.
- Inspired by and building upon:
  * [zarazhangrui/beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) (34 production-grade HTML presentation templates)
  * [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) (Frontend Slides aesthetic design patterns)
  * [Nutlope/hallmark](https://github.com/Nutlope/hallmark) (58 `sloplint` gates and material themes)
