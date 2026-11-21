#!/usr/bin/env bash
set -euo pipefail

# Idempotent setup for mksglu/context-mode MCP (NO read_file-blocking BeforeTool hooks)
if ! command -v context-mode >/dev/null 2>&1; then
  echo "[context-mode] Installing globally via npm..."
  npm install -g context-mode
fi

CONTEXT_BIN="$(command -v context-mode)"
echo "[context-mode] Binary: $CONTEXT_BIN"

python3 - "$CONTEXT_BIN" << 'PY'
import json, sys
from pathlib import Path

bin_path = sys.argv[1]
candidates = [
    Path.home() / ".gemini/antigravity-cli/settings.json",
    Path.home() / ".gemini/settings.json",
]

for cfg_path in candidates:
    if not cfg_path.exists():
        continue
    data = json.loads(cfg_path.read_text(encoding="utf-8"))
    mcp = data.setdefault("mcpServers", {})
    mcp["context-mode"] = {"command": bin_path}
    mcp["mindmap-engine"] = {
        "command": "python3",
        "args": [str(Path.home() / ".agents/tools/mindmap-engine/mindmap_mcp.py")],
    }
    cfg_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"[context-mode + mindmap-engine] Registered in {cfg_path}")
PY
