# `readme-ai-agent/SECURITY.md` — Guardrails & Constraints

## Constraints (`CONSTRAINTS`)
1. **No Secrets in Git:** Dilarang keras menyimpan API key, token OAuth, cookie browser, atau `.env` berisi kredensial di repository.
2. **No Destructive Chrome Kill:** Jangan pernah `pkill chrome` secara global (port `9222` milik user); tools hanya boleh menggunakan port terisolasi (`9223`).
3. **No Broken Symlinks / Unverified Edits:** Dilarang commit sebelum `verify_opus_standards.py --all-targets` mencetak `Total verification errors: 0`.
4. **Cross-Agent Safety:** Saat mengembangkan dengan AI agent baru (Claude Code/Cursor/Windsurf/Cline), hindari `rm -rf` di luar `/tmp` atau directory build sementara, dan jangan modifikasi `~/.gemini/antigravity-cli/settings.json` secara manual tanpa backup/script idempotent (`setup_context_mode.sh`).
