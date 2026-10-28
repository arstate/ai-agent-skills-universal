# `slidedeck-gen` CLI Tool Reference

The `slidedeck-gen` command-line interface provides end-to-end tooling to author, compile, preview, live-edit, and export high-aesthetic 16:9 presentation slide decks.

---

## 1. Installation & Binary Path

When installed via the Universal Opus pack:
- Binary: `~/.local/bin/slidedeck-gen` (or executed directly via `node <skill-root>/bin/slidedeck-gen.mjs`)
- Skill root: `~/.gemini/antigravity-cli/skills/slidedeck-gen/`

Verify installation:
```bash
slidedeck-gen --version
slidedeck-gen --help
```

---

## 2. Command Index

### `slidedeck-gen dev [deck-path]`
Starts the live presentation development server with instantaneous re-compilation, SSE hot-reload, and automatic visible Chrome CDP launch with Live AI Cursor HUD.

**Arguments:**
- `[deck-path]`: Path to directory, `deck.md`, or `goal.json`. If missing, creates a live starter deck.

**Options:**
- `--theme <theme>`: Visual theme preset (e.g. `cyber-glow`, `tech-code`, `noir-luxe`, `high-growth`).
- `--port <port>`: HTTP preview server port. Default: `5200`.
- `--no-cdp`: Disables automatic visible Chrome GUI launch via CDP.

**Live Sync & Editor Behavior:**
- Launches visible headed Chrome on CDP port 9223.
- Injects Live AI Cursor HUD showing `"Building Slide Deck Live..."`.
- As slides are written or appended to `deck.md` or `goal.json`, the server recompiles within 25ms and triggers hot-reload.
- User watches slides materialize live in real-time.

**Example:**
```bash
slidedeck-gen dev my-pitch-deck --theme cyber-glow
```

---

### `slidedeck-gen done`
Finalizes an autonomous AI slide generation session and transitions the interface to the in-browser live editor.

**Options:**
- `--port <cdp-port>`: CDP port (default: `9223`).

**Example:**
```bash
slidedeck-gen done
```

---

### `slidedeck-gen init <deck-name>`
Scaffolds a new presentation project with ready-to-edit templates.

**Options:**
- `--template <type>`: Template to scaffold (`pitch-deck`, `technical-architecture`, `quarterly-business-review`, `minimal-executive`). Default: `pitch-deck`.
- `--format <format>`: Initial source format (`md` for Markdown or `json` for structured Goal spec). Default: `md`.
- `--theme <theme>`: Theme preset (e.g. `cyber-glow`, `theme01`, `theme02`). Default: `theme01`.

**Example:**
```bash
slidedeck-gen init my-series-a-deck --template pitch-deck --theme theme11
```

---

### `slidedeck-gen compile <input>`
Compiles Markdown (`.md`) or Goal specification (`.json`) into self-contained 16:9 presentation HTML.

**Arguments:**
- `<input>`: Path to input Markdown (`deck.md`) or Goal JSON (`goal.json`).

**Options:**
- `--out <dir>`: Output directory for compiled deck. Default: `output/<deck-name>`.
- `--theme <theme>`: Override theme style (`theme01`–`theme12` or `modern-clean`, `cyber-glow`, `tech-code`, etc.).
- `--title <title>`: Override presentation document title.
- `--format <format>`: Compilation target (`html`, `pdf`, `pptx`). Default: `html`.

**Example:**
```bash
slidedeck-gen compile presentations/architecture.md --out dist/architecture --theme tech-code
```

---

### `slidedeck-gen serve <deck-dir>`
Launches the local presentation preview server with real-time live-edit persistence and hot-reload.

**Arguments:**
- `<deck-dir>`: Directory containing compiled `index.html`.

**Options:**
- `--port <port>`: Local port to bind. Default: `5200` (auto-scans upward if busy).
- `--host <host>`: Network host interface. Default: `127.0.0.1` (use `0.0.0.0` for LAN sharing).
- `--open`: Automatically opens visible Chrome window on launch.
- `--no-watch`: Disables hot-reload watcher.

**Persistence Features:**
- Edits made via in-browser contenteditable or slider adjustments send updates to `/api/deck/persist`.
- Server automatically updates the local `index.html` and `goal.json` on disk.

**Example:**
```bash
slidedeck-gen serve dist/architecture --port 5200 --open
```

---

### `slidedeck-gen export-pdf <deck-dir-or-url>`
Exports vector-crisp, zero-margin, landscape 16:9 PDF using Chrome DevTools Protocol (`Page.printToPDF`).

**Arguments:**
- `<deck-dir-or-url>`: Local deck directory (containing `index.html`) or live HTTP preview URL.

**Options:**
- `--out <file>`: Target output PDF file path. Default: `<deck-dir>/presentation.pdf`.
- `--width <inches>`: Paper width. Default: `16.0`.
- `--height <inches>`: Paper height. Default: `9.0`.
- `--timeout <ms>`: Page load timeout in milliseconds. Default: `30000`.

**Example:**
```bash
slidedeck-gen export-pdf dist/architecture --out dist/architecture/architecture-final.pdf
```

---

### `slidedeck-gen export-pptx <deck-dir-or-url>`
Exports an editable PowerPoint presentation (`.pptx`) with reconstructed shapes, editable text frames, and table nodes.

**Arguments:**
- `<deck-dir-or-url>`: Local deck directory or live HTTP preview URL.

**Options:**
- `--out <file>`: Target output PPTX file path. Default: `<deck-dir>/presentation.pptx`.
- `--title <title>`: Presentation title metadata.

**Example:**
```bash
slidedeck-gen export-pptx dist/architecture --out dist/architecture/architecture-editable.pptx
```

---

### `slidedeck-gen review <deck-dir-or-url>`
Autonomous visual audit using visible Chrome GUI and the AI Cursor HUD (`cdp_visual_agent.py`).

**Arguments:**
- `<deck-dir-or-url>`: Local deck directory or live HTTP preview URL.

**Options:**
- `--port <cdp-port>`: Chrome DevTools Protocol remote debugging port. Default: `9223`.
- `--screenshots <dir>`: Directory to save slide screenshots. Default: `<deck-dir>/screenshots`.
- `--delay <ms>`: Delay between slide transitions for visual inspection. Default: `1200`.

**Inspection Flow:**
1. Spawns headed Chrome GUI on port 9223 (never hidden headless mode).
2. Brings browser window to front.
3. Injects live AI Cursor HUD with status capsule.
4. Glides AI cursor to navigation buttons, cycles through each slide, and captures 1920×1080 snapshots.
5. Audits for horizontal text overflow or card clipping.
6. Auto-dismisses the HUD when finished.

**Example:**
```bash
slidedeck-gen review dist/architecture --port 9223 --screenshots dist/architecture/qa-shots
```
