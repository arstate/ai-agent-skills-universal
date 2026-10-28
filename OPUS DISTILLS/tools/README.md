# Chrome Browser Control & Visual CDP Engine (Universal Cross-Platform)

Zero-dependency, sub-millisecond Chrome DevTools Protocol (CDP) browser automation suite with live visible AI visual cursor, lime vignette glow, top-center frosted glass capsule HUD, deep research inspection, and agentic loop orchestration.

Works natively across **Linux**, **Windows**, and **macOS**.

---

## 🗂️ OS Foldering & Directory Map

To allow any AI agent or developer to immediately know which launcher and guide to execute:

```text
tools/ (or skills/chrome-browser-control/scripts/)
├── README.md               <-- Master Universal Guide & Architecture (Read this first)
├── README_LINUX.md         <-- Linux specific guide (X11/Wayland, systemd, display)
├── README_WINDOWS.md       <-- Windows specific guide (PowerShell, CMD, Edge/Brave)
├── README_MACOS.md         <-- macOS specific guide (Terminal, .command, permissions)
├── cdp_visual_agent.py     <-- Cross-platform Python CDP CLI (Windows, macOS, Linux)
├── ai-cursor-hud.js        <-- Universal Live Visual HUD & Click Ripple Overlay
├── launch-visible-chrome.sh<-- Universal OS Auto-Detecting Launcher
├── linux/
│   └── launch-visible-chrome.sh     <-- Dedicated Linux launcher (DISPLAY=:0 / Wayland)
├── windows/
│   ├── launch-visible-chrome.bat    <-- Dedicated Windows CMD / Batch launcher
│   └── launch-visible-chrome.ps1    <-- Dedicated Windows PowerShell launcher
└── macos/
    ├── launch-visible-chrome.sh     <-- Dedicated macOS Shell launcher
    └── launch-visible-chrome.command<-- Double-clickable macOS Finder launcher
```

---

## ⚡ Quick Start by Operating System

### 🐧 1. Linux
```bash
# A. Launch visible Chrome GUI with CDP on port 9223:
bash tools/linux/launch-visible-chrome.sh 9223 "http://localhost:3000"

# B. Control and interact via Python:
python3 tools/cdp_visual_agent.py open "https://news.ycombinator.com"
python3 tools/cdp_visual_agent.py research --format json
```

### 🪟 2. Windows
```powershell
# A. PowerShell:
powershell -ExecutionPolicy Bypass -File .\tools\windows\launch-visible-chrome.ps1 -Port 9223 -Url "http://localhost:3000"

# B. Command Prompt (cmd.exe):
.\tools\windows\launch-visible-chrome.bat 9223 "http://localhost:3000"

# C. Control and interact:
python tools\cdp_visual_agent.py open "https://news.ycombinator.com"
python tools\cdp_visual_agent.py research --format json
```

### 🍏 3. macOS
```bash
# A. Terminal:
bash tools/macos/launch-visible-chrome.sh 9223 "http://localhost:3000"

# Or double-click tools/macos/launch-visible-chrome.command in Finder.

# B. Control and interact:
python3 tools/cdp_visual_agent.py open "https://news.ycombinator.com"
python3 tools/cdp_visual_agent.py research --format json
```

---

## 🤖 Agentic Loop Architecture (High-Speed & Autonomous)

Designed for multi-turn autonomous loops with **zero-slop structured JSON outputs** and deterministic exit codes:

```bash
# 1. Inspect all active tabs in JSON:
python3 cdp_visual_agent.py tabs --json

# 2. Extract actionable interactive buttons with coordinates:
python3 cdp_visual_agent.py buttons --json

# 3. Snapshot accessibility tree (<30ms) for LLM decision making:
python3 cdp_visual_agent.py snapshot

# 4. Extract links matching query for deep research crawling:
python3 cdp_visual_agent.py links "pricing" --json

# 5. Evaluate arbitrary JavaScript state without roundtrips:
python3 cdp_visual_agent.py eval "document.readyState" --json
```

### Python Agentic Loop Example:
```python
import subprocess, json

def agent_exec(cmd):
    res = subprocess.run(["python3", "tools/cdp_visual_agent.py", *cmd], capture_output=True, text=True)
    return json.loads(res.stdout) if "--json" in cmd else res.stdout

# Discover tabs
tabs = agent_exec(["tabs", "--json"])
print(f"Active tabs count: {len(tabs)}")

# Extract research dossier
dossier = agent_exec(["research", "--json"])
print(f"Extracted {dossier['document']['wordCount']} words and {len(dossier['headings'])} headings.")
```

---

## 🔬 Deep Research Suite (`research`, `extract`, `table`, `links`)

| Command | Purpose | Output Formats |
| :--- | :--- | :--- |
| `research` / `deep_research` | Full dossier: Metadata, OpenGraph, Schema.org JSON-LD, Headings outline, Article Markdown, Outbound references | Markdown / JSON (`--json` or `--output file.json`) |
| `extract` / `content` | Clean article body without ads, cookie notices, or navigation menus | Markdown / JSON / Plain Text (`--format json\|text\|markdown`) |
| `table` / `extract_table` | Extracts tabular data and virtual grids with auto-scrolling | Markdown Table / JSON / CSV (`--format json\|csv`) |
| `links` / `urls` | Extracts all links or query-filtered URLs with anchor text, title, external flag | Formatted List / JSON (`--json`) |
| `eval` / `js` | Evaluates arbitrary JavaScript in browser context | Raw value / JSON (`--json`) |

---

## 🛠️ Complete CLI Command Reference (`cdp_visual_agent.py`)

- `tabs [--port PORT] [--json]`: Lists all open tabs.
- `switch <index_or_id_or_title>`: Switches to a specific tab.
- `new <url> [--no-switch]`: Opens a new tab (in background if `--no-switch`).
- `close <index_or_id>`: Closes a tab (protected against closing the last remaining tab).
- `open <url> [--no-switch]`: Navigates target tab to URL.
- `click <selector_or_text_or_nodeId> [label] [--no-switch]`: Anti-miss click with visual ripple & cursor movement.
- `type <selector_or_text> <input_text> [label] [--enter] [--no-switch]`: Instant text injection into inputs/textareas.
- `form '<json_or_filepath>' [--no-switch]`: Fills multi-field form in one command.
- `scroll <delta_y> [label]`: Smooth scroll page vertically.
- `wait <seconds_or_selector> [--timeout MS]`: Sleeps or waits for an element to appear in DOM.
- `buttons [filter_text] [--json]`: Scans all interactive buttons and clickables with coordinates.
- `snapshot [--json]`: Sub-30ms accessibility tree snapshot of interactive elements.
- `screenshot [path.webp|png] [--no-switch]`: Captures lightweight WebP/PNG screenshot.
- `status <text>`: Displays matrix cyber-scramble status in top-center frosted glass capsule.
- `done` / `clear`: Immediately dismisses the visual HUD overlay. Auto-dismisses on 4s idle.

---

## 🛡️ Strict Safety Invariants

1. **Daily Browser Protection (Port 9222 / 9223)**: `close` command unconditionally prevents closing the last tab in the browser to prevent crashing the user's active session.
2. **Session Isolation**: CDP instance uses isolated `--user-data-dir` (`/tmp/chrome-cdp-$PORT` or `%TEMP%\chrome-cdp-%PORT%`) so your main Chrome profile, bookmarks, and passwords remain untouched.
3. **Local Binding Only**: CDP binds strictly to `127.0.0.1` (`--remote-debugging-address=127.0.0.1`), preventing any exposure on local LAN or public networks.
4. **Zero Residual HUD**: The visual overlay self-destructs after 4 seconds of idle activity or immediately upon `cdp_visual_agent.py done`.
