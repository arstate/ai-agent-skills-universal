#!/usr/bin/env bash
set -euo pipefail

# Idempotent setup for mksglu/context-mode + mindmap-engine MCP
# Supports:
#   - Antigravity CLI (~/.gemini/antigravity-cli/settings.json, ~/.gemini/settings.json)
#   - Antigravity Desktop / Unified MCP (~/.gemini/config/mcp_config.json)
#   - OpenCode v2.4.1+ (~/.config/opencode/opencode.json)
# Non-destructive: creates .bak backup, strips JSONC comments safely, preserves existing keys/secrets.

if ! command -v context-mode >/dev/null 2>&1; then
  echo "[context-mode] Installing globally via npm..."
  npm install -g context-mode
fi

CONTEXT_BIN="$(command -v context-mode)"
echo "[context-mode] Binary: $CONTEXT_BIN"

python3 - "$CONTEXT_BIN" << 'PY'
import json
import re
import shutil
import sys
from pathlib import Path

bin_path = sys.argv[1]
mindmap_py = str(Path.home() / ".agents/tools/mindmap-engine/mindmap_mcp.py")


def strip_jsonc(text: str) -> str:
    # Remove // line comments (outside strings) and /* ... */ block comments + trailing commas
    pattern = re.compile(r'("(?:\\.|[^"\\])*")|//[^\n]*|/\*.*?\*/', re.DOTALL)
    cleaned = pattern.sub(lambda m: m.group(1) if m.group(1) else "", text)
    cleaned = re.sub(r",(\s*[}\]])", r"\1", cleaned)
    return cleaned


def load_json_safe(path: Path) -> dict | None:
    try:
        raw = path.read_text(encoding="utf-8")
        return json.loads(strip_jsonc(raw))
    except Exception as exc:
        print(f"[WARN] Skipping {path}: invalid JSON/JSONC ({exc})")
        return None


def save_with_backup(path: Path, data: dict) -> None:
    bak = path.with_suffix(path.suffix + ".bak")
    if path.exists() and not bak.exists():
        shutil.copy2(path, bak)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


# 1. Antigravity CLI / Gemini settings.json (mcpServers schema)
for cfg_path in [
    Path.home() / ".gemini/antigravity-cli/settings.json",
    Path.home() / ".gemini/settings.json",
]:
    if not cfg_path.exists():
        continue
    data = load_json_safe(cfg_path)
    if data is None:
        continue
    mcp = data.setdefault("mcpServers", {})
    mcp["context-mode"] = {"command": bin_path}
    mcp["mindmap-engine"] = {"command": "python3", "args": [mindmap_py]}
    save_with_backup(cfg_path, data)
    print(f"[context-mode + mindmap-engine] Registered in {cfg_path}")

# 2. Antigravity Desktop / Unified mcp_config.json (mcpServers schema with disabled: false)
mcp_cfg = Path.home() / ".gemini/config/mcp_config.json"
if mcp_cfg.exists():
    data = load_json_safe(mcp_cfg)
    if data is not None:
        mcp = data.setdefault("mcpServers", {})
        mcp["context-mode"] = {"command": bin_path, "disabled": False}
        mcp["mindmap-engine"] = {"command": "python3", "args": [mindmap_py], "disabled": False}
        save_with_backup(mcp_cfg, data)
        print(f"[context-mode + mindmap-engine] Registered in {mcp_cfg}")

# 3. OpenCode v2.4.1+ (~/.config/opencode/opencode.json)
opencode_cfg = Path.home() / ".config/opencode/opencode.json"
if opencode_cfg.exists():
    data = load_json_safe(opencode_cfg)
    if data is not None:
        mcp_root = data.setdefault("mcp", {})
        servers = mcp_root.setdefault("servers", {})
        servers["context-mode"] = {
            "type": "local",
            "command": [bin_path],
            "disabled": False,
        }
        servers["mindmap-engine"] = {
            "type": "local",
            "command": [sys.executable, mindmap_py],
            "disabled": False,
        }

        instr = data.setdefault("instructions", [])
        opus_skill = "~/.agents/skills/opus-distills/SKILL.md"
        if isinstance(instr, list) and opus_skill not in instr:
            instr.append(opus_skill)

        perms = data.setdefault("permissions", [])
        if isinstance(perms, list) and not any(
            isinstance(p, dict) and p.get("action") == "skill" for p in perms
        ):
            perms.append({"action": "skill", "resource": "*", "effect": "allow"})

        save_with_backup(opencode_cfg, data)
        print(f"[OpenCode] Registered context-mode + mindmap-engine + opus-distills in {opencode_cfg}")
PY
