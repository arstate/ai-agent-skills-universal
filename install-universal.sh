#!/usr/bin/env bash
set -e

echo "🚀 Installing Universal AI Agent Skills Ecosystem (opus-distills)..."

# If run directly inside cloned repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/OPUS DISTILLS/install-default-opus.sh" ]; then
  bash "$SCRIPT_DIR/OPUS DISTILLS/install-default-opus.sh"
  exit 0
fi

# If run via curl | bash
TMP_ZIP="/tmp/opus_pack_$$.zip"
TMP_DIR="/tmp/opus_pack_$$"

cleanup() {
  rm -rf "$TMP_ZIP" "$TMP_DIR"
}
trap cleanup EXIT

curl -sSL "https://raw.githubusercontent.com/arstate/ai-agent-skills-universal/main/opus_distills_universal_pack.zip" -o "$TMP_ZIP" 2>/dev/null || \
curl -sSL "https://github.com/arstate/ai-agent-skills-universal/raw/main/opus_distills_universal_pack.zip" -o "$TMP_ZIP"

mkdir -p "$TMP_DIR"
unzip -q -o "$TMP_ZIP" -d "$TMP_DIR"

if [ -f "$TMP_DIR/OPUS DISTILLS/install-default-opus.sh" ]; then
  bash "$TMP_DIR/OPUS DISTILLS/install-default-opus.sh"
elif [ -f "$TMP_DIR/install-default-opus.sh" ]; then
  bash "$TMP_DIR/install-default-opus.sh"
else
  echo "❌ Error: install-default-opus.sh not found inside zip."
  exit 1
fi

echo "✅ Master Universal AI Agent Skills Ecosystem successfully installed!"
