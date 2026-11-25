# `readme-ai-agent/TECHSTACK.md` — Tech Stack & ADR

## 1. Stack Komponen
- **Skill Definitions:** Markdown (`SKILL.md`) + YAML frontmatter + `references/*.md` + `scripts/`
- **Installer & Automation:** Bash (`install-default-opus.sh`, `init-readme-ai-agent.sh`, `install-universal.sh`, `setup_context_mode.sh`)
- **MCP Server (`mindmap-engine`):** Python 3 stdlib-only JSON-RPC 2.0 (`OPUS DISTILLS/tools/mindmap-engine/mindmap_mcp.py`) + self-contained HTML/CSS/SVG canvas (`template.html`)
- **Browser Automation:** Chrome DevTools Protocol (CDP port `9223`) via `launch-visible-chrome.sh` + Python `websockets` (`cdp_visual_agent.py`) + `ai-cursor-hud.js`
- **Specialized Runtimes:**
  - `pdf-deck`: Next.js 16 + React 19 + Tailwind CSS + Framer Motion + `python-pptx`
  - `upscale-img`: PyTorch CUDA + `spandrel` (`4xNomos8kSCHAT-S.pth`)
  - `svg-gen`: Python SVG + `exiv2` / XMP metadata
  - `tts-gen`: Gemini TTS / Edge-TTS + FFmpeg (`-16 LUFS`)

## 2. Architecture Decision Records (ADR)
- **ADR-001 (Stdlib-Only MCP for `mindmap-engine`):** Dipilih Python stdlib tanpa `node_modules` agar startup `<50ms`, portable lintas mesin, dan zero dependency conflict.
- **ADR-002 (34 Consolidated Skills):** Menggabungkan skill duplikat (`slidedeck-gen`/`next-slidedeck-engine`/`slide-design` -> `pdf-deck`, `optimasi-nextjs-bandwidth` -> `web-optimization`) untuk memangkas token overhead saat routing.
- **ADR-003 (Single Source of Truth in Repo):** Semua edit wajib di `OPUS DISTILLS/`, lalu disebarkan ke 6–7 target lokal lewat `install-default-opus.sh`.
