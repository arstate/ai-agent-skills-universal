# `readme-ai-agent/DESIGN-CRITIQUE.md` — Quality & Verification Standards

Audit kualitas repository ini tidak memakai opini subjektif, melainkan wajib lolos check otomatis berikut setelah setiap perubahan:

1. **Skill & Reference Integrity:**
   ```bash
   python3 "OPUS DISTILLS/skills/opus-distills/scripts/verify_opus_standards.py" --all-targets
   ```
   - Harus menghasilkan `Total verification errors: 0`.
   - Memverifikasi frontmatter YAML, guardrails, kelengkapan `references/*.md`, 12-file `readme-ai-agent-starter-template`, dan global rules.
2. **Mindmap Engine Smoke Test:**
   - Jalankan JSON-RPC `initialize` -> `tools/list` -> `tools/call` (`render_mindmap`) ke `OPUS DISTILLS/tools/mindmap-engine/mindmap_mcp.py` dan pastikan `mindmap.json` + `mindmap.html` tergenerate tanpa placeholder `__TITLE__` / `__DATA_JSON__`.
