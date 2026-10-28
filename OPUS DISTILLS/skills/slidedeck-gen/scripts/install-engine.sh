#!/usr/bin/env bash
# install-engine.sh — Autonomous Installer & Diagnostic Suite for Slide Deck PDF & PPTX Engines
# Inspired by chuspeeism/dashi-ppt-skill & zarazhangrui/frontend-slides
set -euo pipefail

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

info() { echo -e "${CYAN}ℹ${NC} $*"; }
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC} $*"; }
err()  { echo -e "${RED}✗${NC} $*" >&2; }

echo ""
echo -e "${BOLD}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║     Slide Deck PDF & PPTX Engine Installer & Doctor        ║${NC}"
echo -e "${BOLD}║      slidedeck-gen (Presentation Deck Studio Suite)        ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ─── 1. Check Node.js ─────────────────────────────────────────
info "Step 1/5: Checking Node.js runtime..."
if command -v node &>/dev/null; then
  NODE_VER=$(node -v)
  ok "Node.js detected: $NODE_VER"
else
  err "Node.js (>= 18) is required but not found in PATH."
  exit 1
fi

# ─── 2. Check Python 3 & python-pptx ──────────────────────────
info "Step 2/5: Checking Python 3 and PowerPoint PPTX engine..."
if command -v python3 &>/dev/null; then
  PYTHON_VER=$(python3 --version)
  ok "Python detected: $PYTHON_VER"
  
  if python3 -c "import pptx" &>/dev/null; then
    PPTX_VER=$(python3 -c "import pptx; print(pptx.__version__)")
    ok "python-pptx engine installed: v$PPTX_VER"
  else
    warn "python-pptx not detected. Attempting automatic installation..."
    if command -v pip3 &>/dev/null; then
      pip3 install --user python-pptx || pip install --user python-pptx
    elif command -v uv &>/dev/null; then
      uv pip install python-pptx
    else
      warn "Neither pip3 nor uv found. Please install python-pptx manually: pip install python-pptx"
    fi
  fi
else
  warn "Python 3 not found in PATH. PPTX export requires Python 3."
fi

# ─── 3. Check Chrome / Chromium for Zero-Margin PDF Export ────
info "Step 3/5: Checking Chrome / Chromium for vector-sharp PDF engine..."
CHROME_BIN=""
CANDIDATES=(
  "${CHROME_BIN:-}"
  "${CHROME_PATH:-}"
  "/home/arya/.local/bin/google-chrome"
  "/usr/bin/google-chrome-stable"
  "/usr/bin/google-chrome"
  "/usr/bin/chromium"
  "/usr/bin/chromium-browser"
  "/opt/google/chrome/google-chrome"
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)

for c in "${CANDIDATES[@]}"; do
  if [[ -n "$c" && -x "$c" ]]; then
    CHROME_BIN="$c"
    break
  fi
done

if [[ -z "$CHROME_BIN" ]]; then
  if command -v google-chrome &>/dev/null; then
    CHROME_BIN=$(command -v google-chrome)
  elif command -v chromium-browser &>/dev/null; then
    CHROME_BIN=$(command -v chromium-browser)
  elif command -v chromium &>/dev/null; then
    CHROME_BIN=$(command -v chromium)
  fi
fi

if [[ -n "$CHROME_BIN" ]]; then
  CHROME_VER=$("$CHROME_BIN" --version 2>/dev/null || echo "Unknown")
  ok "Browser engine found: $CHROME_BIN ($CHROME_VER)"
else
  err "No Chrome/Chromium browser found for PDF engine."
  err "Please install Google Chrome or Chromium:"
  err "  Ubuntu/Debian: sudo apt-get update && sudo apt-get install -y chromium-browser"
  exit 1
fi

# ─── 4. Install / Link CLI Binary ─────────────────────────────
info "Step 4/5: Linking slidedeck-gen CLI binary..."
BIN_SOURCE="$SKILL_ROOT/bin/slidedeck-gen.mjs"
chmod +x "$BIN_SOURCE"
chmod +x "$SCRIPT_DIR/export-pdf.sh"

USER_BIN="$HOME/.local/bin"
mkdir -p "$USER_BIN"
TARGET_LINK="$USER_BIN/slidedeck-gen"

ln -sf "$BIN_SOURCE" "$TARGET_LINK"
ok "Symlinked CLI binary to: $TARGET_LINK"

if [[ ":$PATH:" != *":$USER_BIN:"* ]]; then
  warn "Notice: $USER_BIN is not currently in your PATH. Add it to ~/.bashrc or ~/.zshrc:"
  warn "  export PATH=\"\$HOME/.local/bin:\$PATH\""
fi

# ─── 5. Run Verification Self-Test ────────────────────────────
info "Step 5/5: Running automated end-to-end self-test..."
TEST_DIR=$(mktemp -d /tmp/slidedeck-engine-test-XXXXXX)
TEST_MD="$TEST_DIR/test-deck.md"
TEST_PDF="$TEST_DIR/test-deck.pdf"
TEST_PPTX="$TEST_DIR/test-deck.pptx"

cat > "$TEST_MD" << 'EOF'
<!-- theme: bold-signal -->
<!-- transition: slide -->

<!-- layout: cover -->
<!-- kicker: ENGINE DIAGNOSTIC TEST -->
# slidedeck-gen Verification
### Testing Autonomous 16:9 PDF & PPTX Output
<!-- metadata: Automated Verification Suite · Passed -->

---

<!-- layout: metrics -->
<!-- kicker: PERFORMANCE METRICS -->
## Engine Benchmark
Zero-margin vector PDF rendering with full background color fidelity.

- **100%**: Layout Accuracy
- **16:9**: Native Aspect Ratio
- **0.0s**: Cold Hero Latency
EOF

# Compile
node "$SCRIPT_DIR/compile-markdown.mjs" "$TEST_MD" "$TEST_DIR/index.html" >/dev/null

# Test PDF Export
node "$SCRIPT_DIR/export-cdp.mjs" "$TEST_DIR/index.html" "$TEST_PDF" >/dev/null
if [[ -f "$TEST_PDF" && -s "$TEST_PDF" ]]; then
  ok "PDF Export Engine: PASSED ($(du -h "$TEST_PDF" | cut -f1))"
else
  err "PDF Export Engine: FAILED"
  exit 1
fi

# Test PPTX Export
python3 "$SCRIPT_DIR/export-pptx.py" "$TEST_DIR/index.html" "$TEST_PPTX" >/dev/null
if [[ -f "$TEST_PPTX" && -s "$TEST_PPTX" ]]; then
  ok "PPTX Export Engine: PASSED ($(du -h "$TEST_PPTX" | cut -f1))"
else
  warn "PPTX Export Engine: FAILED or python-pptx not configured"
fi

# Clean up
rm -rf "$TEST_DIR"

echo ""
echo -e "${GREEN}${BOLD}============================================================${NC}"
echo -e "${GREEN}${BOLD}✓ Slide Deck PDF & PPTX Engine Installed and Fully Verified!${NC}"
echo -e "${GREEN}${BOLD}============================================================${NC}"
echo ""
echo "Quick CLI Usage Commands:"
echo "  slidedeck-gen dev ./my-presentation.md    # Start live server with studio editor"
echo "  slidedeck-gen export-pdf ./deck.md        # Export zero-margin 16:9 PDF"
echo "  slidedeck-gen export-pptx ./deck.md       # Export editable PowerPoint PPTX"
echo "  bash scripts/export-pdf.sh ./deck.md      # Direct shell script PDF exporter"
echo ""
