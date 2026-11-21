#!/usr/bin/env python3
"""Mindmap Engine MCP Server (stdlib only).
Generates readme-ai-agent/mindmap.json + readme-ai-agent/mindmap.html
and opens preview in visible Chrome (CDP port 9223) or default browser.
"""

import json
import os
import subprocess
import sys
from pathlib import Path

TEMPLATE_PATH = Path(__file__).resolve().parent / "template.html"
CHROME_SCRIPT = Path.home() / ".gemini/config/skills/chrome-browser-control/scripts/launch-visible-chrome.sh"


def render_mindmap(project_dir: str, title: str, phases: list) -> dict:
    proj = Path(project_dir).expanduser().resolve()
    out_dir = proj / "readme-ai-agent"
    out_dir.mkdir(parents=True, exist_ok=True)

    payload = {"title": title, "phases": phases}
    json_path = out_dir / "mindmap.json"
    html_path = out_dir / "mindmap.html"

    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    tpl = TEMPLATE_PATH.read_text(encoding="utf-8")
    html = tpl.replace("__TITLE__", title).replace("__DATA_JSON__", json.dumps(payload, ensure_ascii=False))
    html_path.write_text(html, encoding="utf-8")

    return {
        "status": "ok",
        "mindmap_json": str(json_path),
        "mindmap_html": str(html_path),
        "phases_count": len(phases),
    }


def open_mindmap_preview(project_dir: str) -> dict:
    html_path = Path(project_dir).expanduser().resolve() / "readme-ai-agent" / "mindmap.html"
    if not html_path.is_file():
        return {"status": "error", "message": f"Not found: {html_path}"}

    url = f"file://{html_path}"
    if CHROME_SCRIPT.is_file():
        subprocess.Popen(["bash", str(CHROME_SCRIPT), "9223", url], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return {"status": "opened", "via": "launch-visible-chrome.sh (9223)", "url": url}

    subprocess.Popen(["xdg-open", url], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return {"status": "opened", "via": "xdg-open", "url": url}


TOOLS = [
    {
        "name": "render_mindmap",
        "description": "Generate readme-ai-agent/mindmap.json and interactive readme-ai-agent/mindmap.html (Fase 1-4 + Sub Fitur).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project_dir": {"type": "string", "description": "Absolute path to project root"},
                "title": {"type": "string", "description": "Project title"},
                "phases": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "phase": {"type": "integer", "minimum": 1, "maximum": 4},
                            "name": {"type": "string"},
                            "status": {"type": "string"},
                            "sub_features": {"type": "array", "items": {"type": "string"}},
                        },
                        "required": ["phase", "name", "sub_features"],
                    },
                },
            },
            "required": ["project_dir", "title", "phases"],
        },
    },
    {
        "name": "open_mindmap_preview",
        "description": "Open readme-ai-agent/mindmap.html in visible Chrome (port 9223).",
        "inputSchema": {
            "type": "object",
            "properties": {"project_dir": {"type": "string"}},
            "required": ["project_dir"],
        },
    },
]


def handle_request(req: dict) -> dict | None:
    method = req.get("method")
    req_id = req.get("id")
    params = req.get("params") or {}

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "mindmap-engine", "version": "1.0.0"},
            },
        }
    if method == "notifications/initialized":
        return None
    if method == "tools/list":
        return {"jsonrpc": "2.0", "id": req_id, "result": {"tools": TOOLS}}
    if method == "tools/call":
        name = params.get("name")
        args = params.get("arguments") or {}
        try:
            if name == "render_mindmap":
                res = render_mindmap(args["project_dir"], args["title"], args["phases"])
            elif name == "open_mindmap_preview":
                res = open_mindmap_preview(args["project_dir"])
            else:
                res = {"status": "error", "message": f"Unknown tool: {name}"}
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {"content": [{"type": "text", "text": json.dumps(res, ensure_ascii=False)}]},
            }
        except Exception as exc:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {"isError": True, "content": [{"type": "text", "text": str(exc)}]},
            }
    if req_id is not None:
        return {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32601, "message": f"Method not found: {method}"}}
    return None


def main() -> None:
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError:
            continue
        resp = handle_request(req)
        if resp is not None:
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
