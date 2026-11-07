# `pdf-deck` CLI Tool Reference

The `pdf-deck` command-line interface provides end-to-end tooling to author, compile, preview, live-edit, and export high-aesthetic 16:9 presentation slide decks. It combines the Next.js 16 Presentation Studio with autonomous live preview, in-browser editor, zero-margin vector PDF, and native PowerPoint (.pptx) exporters.

---

## 1. Installation & Binary Path

When installed via the Universal Opus pack:
- Primary Binary: `~/.local/bin/pdf-deck` (or executed directly via `node <skill-root>/bin/pdf-deck.mjs`)
- Compatibility Aliases: `~/.local/bin/next-slidedeck` and `~/.local/bin/slidedeck-gen`
- Skill root: `~/.gemini/antigravity-cli/skills/pdf-deck/` (and mirrors)

Verify installation:
```bash
pdf-deck --version
pdf-deck --help
```

---

## 2. Command Index

### `pdf-deck studio [port]`
Launches the Next.js 16 multi-aesthetic presentation studio workstation.

**Options:**
- `[port]`: HTTP studio server port. Default: `5200` (or `PORT` environment variable).

**Studio Features:**
- 3-Panel Workstation (left filmstrip, center 16:9 fixed scale canvas, right 5-tab inspector).
- On-Canvas PowerPoint Edit Mode (`[E]` key) for live WYSIWYG text and card editing.
- 39 curated palettes across Light, Cream Editorial, Bold Accent, and Minimalist Monochrome Dark.
- Decoupled Studio UI shell (Light/Dark chrome toggle does NOT change slide canvas theme).

---

### `pdf-deck dev [deck-path]`
Starts the live presentation development server with instantaneous re-compilation, SSE hot-reload, and automatic visible Chrome CDP launch with Live AI Cursor HUD.

**Arguments:**
- `[deck-path]`: Path to directory, `deck.md`, or `goal.json`. If missing, creates a live starter deck.

**Options:**
- `--theme <theme>`: Visual theme preset (e.g. `signal`, `obsidian-pure`, `consulting-cream`).
- `--port <port>`: HTTP preview server port. Default: `5200`.
- `--no-cdp`: Disables automatic visible Chrome GUI launch via CDP.
- `--daemon`: Runs preview server in background.

**Live Sync & Editor Behavior:**
- Launches visible headed Chrome on CDP port 9223.
- Injects Live AI Cursor HUD showing `"Building Slide Deck Live..."`.
- As slides are written or appended to `deck.md` or `goal.json`, the server recompiles within 25ms and triggers hot-reload.
- User watches slides materialize live in real-time.

**Example:**
```bash
pdf-deck dev my-pitch-deck --theme signal
```

---

### `pdf-deck done`
Finalizes an autonomous AI slide generation session and transitions the interface to the in-browser live editor.

**Options:**
- `--port <port>`: Chrome CDP port. Default: `9223`.
- `--server-port <port>`: Preview server port. Default: `5200`.

**Behavior:**
- Updates live status badge to `Slide Deck Ready — In-Browser Live Editor Active`.
- Keeps visible Chrome open on screen so the user can immediately present fullscreen (`F5`) or continue editing text directly on canvas.

---

### `pdf-deck init <deck-name>`
Scaffolds a new presentation directory from any of the 34 Zara Zhang bold archetypes or starter markdown templates.

**Options:**
- `--template <slug>`: Archetype slug (e.g. `signal`, `studio`, `capsule`, `editorial-forest`, `neo-grid-bold`). Default: `signal`.
- `--title "<title>"`: Presentation title embedded directly into the cover slide.

**Example:**
```bash
pdf-deck init q3-review --template signal --title "Q3 Strategic Growth Review"
```

---

### `pdf-deck list-templates`
Lists all 34 available Zara Zhang presentation archetypes with their slug, color scheme, name, and design tagline.

---

### `pdf-deck compile <input>`
Compiles Markdown (`.md`) or Goal specification (`.json`) into self-contained 16:9 presentation HTML.

**Options:**
- `--out <dir>`: Target output directory. Default: `./dist/`.
- `--theme <theme>`: Theme preset to inject during compilation.
- `--title <title>`: Presentation title override.

**Example:**
```bash
pdf-deck compile deck.md --out dist --theme signal
```

---

### `pdf-deck serve <deck-dir>`
Launches the standalone live preview web server with real-time file watcher, SSE reload, and in-place editor auto-save persistence.

**Options:**
- `--port <port>`: HTTP port. Default: `5200`.
- `--open`: Opens default browser automatically.

---

### `pdf-deck export-pdf <target>`
Exports the presentation to a publication-grade vector PDF via Chrome CDP or headless print-to-PDF.

**Target:** Path to directory containing `index.html` or direct URL (`http://localhost:5200`).

**Options:**
- `--out <file>`: Output PDF file path. Default: `<target>/presentation.pdf`.

**Technical Specifications:**
- Exact 16:9 landscape dimensions (`16in × 9in`).
- Zero margins (`margin: 0`).
- Background graphics enabled (`printBackground: true`).
- Lossless vector text, SVG charts, and sharp hairline geometry.

**Example:**
```bash
pdf-deck export-pdf dist/my-deck --out dist/my-deck/presentation.pdf
```

---

### `pdf-deck export-pptx <target>`
Exports the presentation to an editable Microsoft PowerPoint (`.pptx`) file via `python-pptx`.

**Options:**
- `--out <file>`: Output PPTX file path. Default: `<target>/presentation.pptx`.

**Technical Specifications:**
- Generates native 16:9 widescreen PowerPoint (`13.333in × 7.5in`).
- Converts HTML cards, stat numerals, and columns into editable PowerPoint shapes.
- Selectable, editable text frames with preserved typography colors and font sizing.

**Example:**
```bash
pdf-deck export-pptx dist/my-deck --out dist/my-deck/presentation.pptx
```

---

### `pdf-deck review <target>`
Launches the forensic visual review suite with visible Chrome CDP, full slide sequence navigation, screenshot capture, and layout checks.

**Options:**
- `--port <port>`: Chrome CDP port. Default: `9223`.
- `--screenshots <dir>`: Directory to write captured slide PNGs.

---

### `pdf-deck install-engine`
Verifies and installs required environment dependencies:
- Python packages: `python-pptx`, `websockets`
- Node.js dependencies
- Symlinks CLI binaries (`pdf-deck`, `next-slidedeck`, `slidedeck-gen`) to `~/.local/bin/`
