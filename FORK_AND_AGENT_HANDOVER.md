# Forking & Multi-Agent Development Guide (`ai-agent-skills-universal`)

Panduan ringkas untuk melakukan **fork** dan mengembangkan repository `ai-agent-skills-universal` menggunakan AI Agent lain (**Claude Code**, **Cursor**, **Windsurf**, **Cline / Roo Code**, **Codex**, atau **Google Antigravity CLI**).

---

## 1. Quick Fork & Local Setup

```bash
# 1. Fork via GitHub UI atau gh CLI, lalu clone fork Anda
git clone https://github.com/<USERNAME>/ai-agent-skills-universal.git
cd ai-agent-skills-universal
git remote add upstream https://github.com/arstate/ai-agent-skills-universal.git

# 2. Pasang seluruh 34 skills, tools, & rules ke lokal
bash "OPUS DISTILLS/install-default-opus.sh"

# 3. Daftarkan MCP servers (context-mode + mindmap-engine)
bash "$HOME/.gemini/config/skills/opus-distills/scripts/setup_context_mode.sh"
```

---

## 2. Arsitektur Repository

```text
ai-agent-skills-universal/
├── AGENTS.md                        # Entry point rules untuk semua AI Agent
├── FORK_AND_AGENT_HANDOVER.md       # Panduan fork & handover antar-agent (file ini)
├── README.md                        # Dokumentasi utama ekosistem
├── install-universal.sh             # Installer wrapper lintas OS
├── readme-ai-agent/                 # 12-File Project Brain (wajib dibaca agent baru!)
│   ├── AGENTS.md                    # Live state (<150 token)
│   └── PRD.md, TECHSTACK.md, ...    # Spesifikasi, arsitektur, task, & restore points
└── OPUS DISTILLS/
    ├── install-default-opus.sh      # Sync skills ke ~/.agents, ~/.gemini, ~/.claude, ~/.cursor, HDD-2
    ├── init-readme-ai-agent.sh      # Generator 12-file readme-ai-agent/ untuk project web/app
    ├── auto-boot-configs/           # Template AGENTS.md, GEMINI.md, & rules/opus-distills.md
    ├── tools/
    │   ├── mindmap-engine/          # Stdlib Python MCP server + template.html (Ide -> Mindmap)
    │   ├── launch-visible-chrome.sh # Chrome CDP port 9223 (Linux/macOS/Windows)
    │   └── cdp_visual_agent.py      # Live AI Cursor HUD controller
    └── skills/                      # 34 consolidated skills (1 folder = 1 SKILL.md + refs/scripts)
```

---

## 3. Prompt Handover untuk AI Agent Lain

Copy-paste prompt berikut saat membuka repo hasil fork di **Claude Code / Cursor / Windsurf / Cline / Codex**:

```markdown
Baca `AGENTS.md`, `readme-ai-agent/AGENTS.md`, `readme-ai-agent/TECHSTACK.md`, dan `readme-ai-agent/TASK.md` terlebih dahulu.
Project ini adalah ekosistem 34 AI Agent Skills + MCP tools (`OPUS DISTILLS/skills/` & `OPUS DISTILLS/tools/`).

Aturan Wajib Kontribusi:
1. Edit source of truth hanya di `OPUS DISTILLS/skills/<skill>/` atau `OPUS DISTILLS/tools/<tool>/` (jangan edit langsung di `~/.agents/` tanpa sync dari repo).
2. Setelah mengubah skill/tool, jalankan:
   - `bash "OPUS DISTILLS/install-default-opus.sh"` (untuk sync ke target lokal)
   - `python3 "OPUS DISTILLS/skills/opus-distills/scripts/verify_opus_standards.py" --all-targets` (harus `Total verification errors: 0`)
3. Update `readme-ai-agent/AGENTS.md`, `readme-ai-agent/TASK.md`, dan `readme-ai-agent/GIT-RESTORE-POINTS.md` sebelum commit.
```

---

## 4. Konvensi & Guardrails Inti

| Aturan | Detail |
|---|---|
| **Format Skill** | Wajib YAML frontmatter (`name`, `description`) di `SKILL.md` + `references/` / `scripts/` bila perlu. |
| **34 Consolidated Skills** | Jangan membuat folder duplikat untuk skill yang sudah digabung (`slidedeck-gen` -> `pdf-deck`, `optimasi-nextjs-bandwidth` -> `web-optimization`). |
| **Zero Secret / Zero Hardcode** | Jangan simpan API key/token di repo. Gunakan env var atau path relatif (`Path.home()`). |
| **Verifikasi Wajib** | Semua target harus lolos `verify_opus_standards.py --all-targets` (`Total verification errors: 0`) sebelum `git push`. |
| **Sync Upstream** | `git fetch upstream && git rebase upstream/main` untuk menarik update terbaru dari repo asli. |
