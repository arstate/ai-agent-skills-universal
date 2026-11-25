# `readme-ai-agent/PRD.md` — Product Requirements & Architecture

## 1. Visi Produk
Menyediakan **ekosistem skill universal lintas AI Agent** (Antigravity CLI, Claude Code, Cursor, Windsurf, Cline, Roo Code, Codex) yang mencakup:
- **34 Consolidated Skills** di `OPUS DISTILLS/skills/` (web engineering, UI/UX design, Figma/media, video/audio, copy/research, agent/browser control).
- **MCP & Browser Tools** di `OPUS DISTILLS/tools/` (`mindmap-engine` stdlib MCP server, `launch-visible-chrome.sh`, `cdp_visual_agent.py` + `ai-cursor-hud.js`).
- **Automated Multi-Target Installer & Verifier** (`install-default-opus.sh`, `setup_context_mode.sh`, `verify_opus_standards.py`).

## 2. Alur Kerja Standar (`M1–M5`)
1. **`M1` Ide / Discovery:** Pertanyaan terstruktur (`ask_question` min 5 opsi) untuk user, kebiasaan, fitur inti, retensi, & stack.
2. **`M2` Mindmap + PRD + Task:** `mindmap-engine` MCP (`render_mindmap` + `open_mindmap_preview`) -> `readme-ai-agent/` (12 files) -> `DESIGN.md` / `design-style-preview.html` -> konfirmasi user.
3. **`M3` Surgical Build:** Implementasi bersih, zero placeholder, Context7 live docs check.
4. **`M4` Auto QA & Self-Debugging:** Build check, `sloplint`, `contrast.py`, 7-viewport Vision QA.
5. **`M5` Handover:** Update docs, restore points, dan laporan ringkas.

## 3. Glossary
- **Consolidated Skill:** Skill inti di `OPUS DISTILLS/skills/<name>/` yang punya `SKILL.md` ber-frontmatter valid.
- **Target Dirs:** `~/.gemini/antigravity-cli/skills`, `~/.gemini/config/skills`, `~/.gemini/antigravity/skills`, `~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, dan optional backup HDD.
