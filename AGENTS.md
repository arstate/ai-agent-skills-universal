# Project Agent Rules & Live Brain (`AGENTS.md`)

@[Project Brain State](readme-ai-agent/AGENTS.md)
@[Fork & Multi-Agent Guide](FORK_AND_AGENT_HANDOVER.md)

## Mandatory Rules (All AI Agents: Antigravity, Claude Code, Cursor, Windsurf, Cline, Codex)
- **Source of Truth:** Always edit skills/tools inside `OPUS DISTILLS/skills/` and `OPUS DISTILLS/tools/`, never only in `~/.agents/` or `~/.gemini/`.
- **State Continuity:** Read `readme-ai-agent/AGENTS.md` (<150 tokens) at the start of every session and update it + `TASK.md` / `GIT-RESTORE-POINTS.md` at the end of every milestone.
- **Verification Gate:** After any skill/tool change, sync via `bash "OPUS DISTILLS/install-default-opus.sh"` and verify with `python3 "OPUS DISTILLS/skills/opus-distills/scripts/verify_opus_standards.py" --all-targets` (`Total verification errors: 0`).
- **No Unverified Claims / No Secret Leaks:** Never commit API keys, tokens, or untested scripts.
