#!/usr/bin/env bash
set -e

echo "🚀 Installing Universal AI Agent Skills Ecosystem (opus-distills)..."

# Run directly inside cloned repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/OPUS DISTILLS/install-default-opus.sh" ]; then
  bash "$SCRIPT_DIR/OPUS DISTILLS/install-default-opus.sh"
  exit 0
fi

# Run via curl | bash
TMP_DIR="/tmp/opus_pack_$$"
TMP_ZIP="/tmp/opus_pack_$$.zip"

cleanup() {
  rm -rf "$TMP_ZIP" "$TMP_DIR"
}
trap cleanup EXIT

if command -v git >/dev/null 2>&1; then
  git clone --depth 1 https://github.com/arstate/ai-agent-skills-universal.git "$TMP_DIR"
else
  curl -fsSL "https://github.com/arstate/ai-agent-skills-universal/archive/refs/heads/main.zip" -o "$TMP_ZIP"
  mkdir -p "$TMP_DIR"
  unzip -q -o "$TMP_ZIP" -d "$TMP_DIR"
fi

if [ -f "$TMP_DIR/OPUS DISTILLS/install-default-opus.sh" ]; then
  bash "$TMP_DIR/OPUS DISTILLS/install-default-opus.sh"
elif [ -f "$TMP_DIR/ai-agent-skills-universal-main/OPUS DISTILLS/install-default-opus.sh" ]; then
  bash "$TMP_DIR/ai-agent-skills-universal-main/OPUS DISTILLS/install-default-opus.sh"
elif [ -f "$TMP_DIR/install-default-opus.sh" ]; then
  bash "$TMP_DIR/install-default-opus.sh"
else
  echo "❌ install-default-opus.sh not found in downloaded package."
  exit 1
fi
