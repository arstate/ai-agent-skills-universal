# Master Prompt: Install & Auto-Boot Universal AI Agent Skills Ecosystem

> **Copy and paste this prompt directly into your AI Agent (Antigravity CLI, Claude, Cursor, Windsurf, Copilot, Roo Code, or Cline) to automatically download, install, verify, and activate all 27+ universal skills, browser automation tools, and rules.**

```markdown
# MISSION: INSTALL, CONFIGURE & ACTIVATE THE UNIVERSAL AI AGENT SKILLS ECOSYSTEM (OPUS DISTILLS EDITION)

You are tasked with installing and configuring the Universal AI Agent Skills Ecosystem on this machine.
Execute the following instructions step-by-step:

## Step 1: Detect Host Environment & Run Auto-Installer
Run this one-liner in your terminal to download/pull, install, and configure all universal skills, Next.js Slide Deck Engine dependencies, browser control tools, and global rules:

```bash
if [ -d "$HOME/ai-agent-skills-universal" ]; then
  cd "$HOME/ai-agent-skills-universal" && git pull origin main
else
  git clone --depth 1 https://github.com/arstate/ai-agent-skills-universal.git "$HOME/ai-agent-skills-universal" && cd "$HOME/ai-agent-skills-universal"
fi && bash "OPUS DISTILLS/install-default-opus.sh"
```

*(Offline / Zip Fallback alternative):*
```bash
curl -sSL "https://raw.githubusercontent.com/arstate/ai-agent-skills-universal/main/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip 2>/dev/null && \
mkdir -p /tmp/opus_pack && \
unzip -q -o /tmp/opus_pack.zip -d /tmp/opus_pack && \
bash /tmp/opus_pack/"OPUS DISTILLS"/install-default-opus.sh && \
rm -rf /tmp/opus_pack.zip /tmp/opus_pack
```

## Step 2: Verify Target Directory Installations
Ensure skills are installed into the following agent directories:
- `~/.gemini/antigravity-cli/skills/`
- `~/.gemini/config/skills/`
- `~/.gemini/antigravity/skills/`
- `~/.agents/skills/`
- `~/.cursor/skills/` (if Cursor IDE is present)
- `~/.claude/skills/` (if Claude Desktop is present)

And verify global auto-boot rules:
- `~/.gemini/AGENTS.md`
- `~/.gemini/GEMINI.md`
- `~/.agents/rules/opus-distills.md`

## Step 3: Verified Capabilities Overview

### 1. Presentation Studio & High-Fidelity PDF/PPTX Engine: `pdf-deck` & `slide-design`
- **Multi-Aesthetic Next.js Presentation Studio (`pdf-deck`):**
  * Custom lightweight studio built from scratch on Next.js App Router, React 19, Tailwind CSS, Lucide icons, and Framer Motion.
  * **Autonomous AI GEN Mode (Single Flexible Option):** Eliminates rigid template pickers in favor of 1 single `AI GEN (Autonomous Creative Layout)` option. The AI agent retains complete creative freedom to tailor visual geometry, kinetic accents, brand typography, and adaptive layouts per slide.
  * **Full Creative Design Freedom (Never Locked to Dark Mode):** 39 curated palettes from SlideSpeak (`slide-design-skill`) and Zara Zhang (`frontend-slides`):
    - Light & Cream Editorial: Consulting Cream (`#F7F5F2`), Academic Slate (`#F5F1E8`), Kanagi Washi (`#EFEAE2`), Neue Klasse (`#FFFFFF`), OpEx Navy, Notebook Tabs, Pastel Geometry, Vintage Editorial, Swiss Modern, Paper & Ink, Pin & Paper, Vellum, Neo Grid Bold.
    - Vibrant & Bold Accents: Bold Signal Coral (`#FF5722`), Electric Studio Royal Split (`#4361EE`), Creative Voltage Neon Lime (`#D4FF00`), Venture Pitch Cobalt (`#2563EB`), Neon Cyber (`#00FFCC`), Sakura Chroma, Creative Mode.
    - Minimalist Dark: Obsidian Pure (`#000000`), Titanium Precision, Swiss Dark, Editorial Noir, Graphite Telemetry, Velvet Charcoal, Editorial Forest, Cobalt Grid, Emerald Editorial.
    - **0% emoji/cartoon clutter:** Disciplined typography, mathematical grid alignment, WCAG AAA contrast enforcement, and zero outer perimeter border strokes.
  * **Topbar Instant Light/Dark Toggle:** Seamlessly toggle between Light Mode and Dark Mode palettes with zero SSR hydration mismatch.
  * **3-Panel Studio Layout:**
    - Left Sidebar: Interactive slide filmstrip, add slide (8 layout templates: Cover, Key Metrics, Asymmetric Split 60/40, 3-Pillars, Bento Matrix, Quote Spotlight, Comparison Table, Milestone Timeline), reorder up/down, duplicate, delete.
    - Center Canvas: Pristine 16:9 presentation stage (`1920x1080`) with mathematical fixed-ratio scaling (anti-squish). **ZERO overlay buttons or UI clutter inside the slide canvas itself** — 100% focus on presentation design!
    - Right Sidebar: Inspector tabs for Style (26 curated palettes categorized by All/Light/Dark/Vibrant), Text (kicker, title, subtitle, footnote), Elements (metrics, pillars, bento cards, bullets, quote), Animation (Morph Smooth shared-layout transitions, Crossfade, Slide, Zoom, Clip, Flip 3D, Stagger Blur), and Export.
  * **Universal Multi-Target Export:**
    1) Vector PDF (lossless SVG print via `@page { size: 16in 9in; margin: 0; }`)
    2) Raster 4K PDF (high-density canvas snapshot)
    3) Editable PowerPoint (`.pptx` via native PPTX builder)
    4) Pure SVG Vector (single slide or all slides in a ZIP bundle)
  * **Fullscreen Presentation Mode (`F5`):** Complete distraction-free presentation with full keyboard controls (`Arrow`, `Space`, `Enter`, `Home`, `End`, `Esc`).
- **Master Presentation Design Engine (`slide-design`):**
  * Automated style derivation derived from the brief (never picked from rigid templates).
  * 8 Distinct layout grammars, tokens, and component sets from SlideSpeak (`academic`, `consulting`, `kanagi`, `neue-klasse`, `opex`, `pitch`, `product-marketing`, `training`).
- **Zara Zhang Editorial & Live Preview Engine (`pdf-deck`):**
  * Live Preview Daemon: `pdf-deck dev <dir> --daemon` or `pdf-deck studio` immediately opens Chrome GUI on CDP port 9223.
  * In-place text editing auto-saved to disk with real-time sync.
  * 34 Zara Zhang Bold Archetypes (`frontend-slides`): `signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`, etc.

### 2. Autonomous Master Agent & Router (`opus-distills` + `web-master-agent`)
- Universal skill router that detects intent and loads specialized sub-skills on demand.
- Split-channel terse communication: ultra-compressed chat responses while guaranteeing 100% uncut, production-complete deliverables.

### 3. Web Architecture & Frontend Engineering Suite
- `web-planning`: Pre-flight user flow architecture, Mermaid diagrams, Next.js 15 App Router static export recommendations, and PRD generation.
- `web-design`: High-taste frontend UI engineering integrating `Nutlope/hallmark` v2.8.0 (58 `sloplint` quality gates and 48 physical material themes).
- `web-builder`: Autonomous parallel swarm implementation with cold-hero-first layouts, responsive mobile portrait + desktop views, and zero guessing.
- `web-animation`: Production GSAP, ScrollTrigger, Flip, and interactive micro-interactions.
- `web-debugging`: Forensic 7-viewport responsive testing (`360x800` to `1440x900`), horizontal scroll overflow detection, and security auditing.
- `web-optimization`: Next.js zero-usage Vercel shield (1,000,000+ clicks on hobby tier), Cloudflare edge caching, and Core Web Vitals optimization.

### 4. Visual Chrome Browser Control & Live AI Cursor HUD (`chrome-browser-control`)
- Opens visible, headed Chrome GUI across Linux, macOS, and Windows on CDP port `9223`.
- Injects Live AI Cursor HUD (`ai-cursor-hud.js`) with animated cursor motion, golden highlight outlines, click ripple waves, and real-time status badges.

### 5. Master Microstock 2D Flat Vector Engine (`svg-gen`)
- 10 Iron Laws of Vector Construction for Adobe Stock, Shutterstock, and Freepik.
- Enforces 15+ MP resolution, 100% closed compound paths (Z), zero live strokes, zero raster alpha filters (cairo_image = 0), zero text, and automated Dublin Core RDF & XMP metadata embedding.

### 6. Hardware-Accelerated 4K/8K AI Image Upscaler (`upscale-img`)
- Hardware-accelerated neural upscaling on NVIDIA CUDA via PyTorch & Spandrel using `4xNomos8kSCHAT-S.pth` (DAT/HAT Transformer Attention).
- Seamless 256x256 raised-cosine Hann window feather tiling with C1 continuity, zero boundary artifacts, and full RGBA transparency support.
- Global CLI commands: `upscale-img` and `boost`.

### 7. Broadcast-Grade AI Voiceover & TTS Engine (`tts-gen`)
- Multi-key router for **Google Gemini 3.8 Flash TTS** with automatic HTTP 429 failover and Microsoft Edge-TTS graceful fallback.
- 7 Expressive prebuilt voices (`Koda` default, `Ludo`, `Aoede`, `Kore`, `Puck`, `Charon`, `Fenrir`) and style tags (`<Friendly>`, `<Professional>`, `<Enthusiastic>`, `<Calm>`, `<Dramatic>`).
- EBU R128 loudness normalization (`-16 LUFS, TP -1.5 dB, 48 kHz`) via FFmpeg for direct integration with Instagram Reels, TikTok, and Remotion video timelines.
- Global CLI commands: `tts-gen` and `notif-tts`.

### 8. Anti-AI-Slop & Authentic Human Cadence Engine (`humanizer`)
- Rewrites robotic, AI-sounding prose in English and Indonesian so it reads like an authentic human writer without changing meaning.
- Eliminates all **26 Wikipedia AI writing signs** (§1 negative-positive contrasts, §2 dramatic one-line closers, §3 throat-clearing, §6 forced triads, §8 em-dash overuse, §12 stock buzzwords, §19 bold bullets).
- Eliminates **Indonesian bureaucratic AI tropes** (*"dalam era digital yang serba cepat", "tidak dapat dipungkiri", "merajut benang merah", "menyelami", "bukti nyata"*).
- Enforces natural burstiness and sentence length variation.
- Global CLI command: `humanizer`.

### 9. Master Figma Design & Canvas Automation Engine (`figma-design`)
- Bidirectional Figma Plugin API control via **Figma Bridge WebSocket Relay** (`ws://127.0.0.1:4395`) and **Native Auto Layout Architecture**.
- Integrates 6 industry design frameworks (`figma/mcp-server-guide`, `warpdotdev/figma-skills`, `nexu-io/open-design`, `mengto/skills`, `jakubkrehel/skills`, `benjitaylor/skills`).
- Supports 4 core design agent applications: **Design System Enforcement** (token & variable auditor), **Heuristic Usability Evaluation** (Nielsen Norman 10 heuristics on-canvas pin annotations), **Language Localization** with dynamic copy reflow, and **Structural Code Handoff** (1:1 Next.js 15 Tailwind conversion).
- Global CLI commands: `figma-exec`, `figma-audit`, and `figma-handoff`.

## Step 4: Confirm Setup
After running the installation, type `/skills reload` (or restart your agent session) and reply:
"All 27+ universal skills, browser automation tools, and rules successfully installed and verified!"
```
