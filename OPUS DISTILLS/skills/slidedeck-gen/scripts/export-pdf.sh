#!/usr/bin/env bash
# export-pdf.sh — Autonomous Zero-Margin 16:9 PDF Exporter for Slide Deck Presentations
# Inspired by zarazhangrui/frontend-slides & chuspeeism/dashi-ppt-skill
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

if [[ $# -lt 1 ]]; then
  echo ""
  echo -e "${BOLD}slidedeck-gen PDF Exporter (Zero-Margin 16:9)${NC}"
  echo "Usage: bash scripts/export-pdf.sh <path-to-deck-or-html> [output.pdf]"
  echo ""
  echo "Examples:"
  echo "  bash scripts/export-pdf.sh ./presentation.html ./presentation.pdf"
  echo "  bash scripts/export-pdf.sh ./deck.md ./deck.pdf"
  echo "  bash scripts/export-pdf.sh ./my-deck-folder ./my-deck.pdf"
  echo ""
  exit 1
fi

INPUT_TARGET="$1"
OUTPUT_PDF="${2:-}"

if [[ -z "$OUTPUT_PDF" ]]; then
  if [[ -d "$INPUT_TARGET" ]]; then
    OUTPUT_PDF="${INPUT_TARGET%/}/presentation.pdf"
  else
    OUTPUT_PDF="${INPUT_TARGET%.*}.pdf"
  fi
fi

# Locate script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

info "Starting zero-margin 16:9 PDF deck export..."
info "Input target: $INPUT_TARGET"
info "Output PDF:   $OUTPUT_PDF"

# Execute export-cdp.mjs
node "$SCRIPT_DIR/export-cdp.mjs" "$INPUT_TARGET" "$OUTPUT_PDF"

if [[ -f "$OUTPUT_PDF" ]]; then
  FILE_SIZE=$(du -h "$OUTPUT_PDF" | cut -f1)
  ok "Successfully generated PDF: $OUTPUT_PDF (${FILE_SIZE})"
else
  err "PDF export completed but output file not found: $OUTPUT_PDF"
  exit 1
fi
