#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Installing Universal Opus 5.5 Skills & Auto-Boot Rules for Google Antigravity CLI..."

# 1. Target Directories
DEST_DIRS=(
  "$HOME/.gemini/antigravity-cli/skills"
  "$HOME/.gemini/config/skills"
  "$HOME/.gemini/antigravity/skills"
  "$HOME/.agents/skills"
)
[ -d "$HOME/.cursor/skills" ] && DEST_DIRS+=("$HOME/.cursor/skills")
[ -d "$HOME/.claude/skills" ] && DEST_DIRS+=("$HOME/.claude/skills")

for dest in "${DEST_DIRS[@]}"; do
  mkdir -p "$dest"
done

# Copy universal skills
for src_base in "$SCRIPT_DIR/skills" "$SCRIPT_DIR"; do
  if [ -d "$src_base" ]; then
    for dir in "$src_base"/*/; do
      [ -d "$dir" ] || continue
      dirname=$(basename "$dir")
      if [ "$dirname" != "auto-boot-configs" ] && [ "$dirname" != "skills" ] && [ "$dirname" != "tools" ] && [ "$dirname" != "readme-ai-agent-starter-template" ] && [ -f "$dir/SKILL.md" ]; then
        for dest in "${DEST_DIRS[@]}"; do
          [ -L "$dest/$dirname" ] && rm -f "$dest/$dirname"
          cp -rf "$dir" "$dest/"
        done
        echo "  -> Skill installed: $dirname"
      fi
    done
    break
  fi
done

# 2. Antigravity CLI Global Always-On Rules (~/.gemini/AGENTS.md, ~/.gemini/GEMINI.md, ~/.gemini/antigravity-cli/rules/)
mkdir -p "$HOME/.gemini/antigravity-cli/rules"
mkdir -p "$HOME/.gemini/config/rules"
mkdir -p "$HOME/.agents/rules"
cp -f "$SCRIPT_DIR/auto-boot-configs/AGENTS.md" "$HOME/.gemini/AGENTS.md"
cp -f "$SCRIPT_DIR/auto-boot-configs/GEMINI.md" "$HOME/.gemini/GEMINI.md"
cp -f "$SCRIPT_DIR/auto-boot-configs/.agents/rules/opus-distills.md" "$HOME/.gemini/antigravity-cli/rules/opus-distills.md"
cp -f "$SCRIPT_DIR/auto-boot-configs/.agents/rules/opus-distills.md" "$HOME/.gemini/config/rules/opus-distills.md"
cp -f "$SCRIPT_DIR/auto-boot-configs/.agents/rules/opus-distills.md" "$HOME/.agents/rules/opus-distills.md"
echo "✅ Global AGENTS.md, GEMINI.md, & rules/opus-distills.md berhasil disinkronkan!"

# 3. Install init-readme-ai-agent helper to ~/.local/bin if available
mkdir -p "$HOME/.local/bin"
cp -f "$SCRIPT_DIR/init-readme-ai-agent.sh" "$HOME/.local/bin/init-readme-ai-agent"
chmod +x "$HOME/.local/bin/init-readme-ai-agent"
echo "✅ Helper init-readme-ai-agent terpasang di ~/.local/bin/"

# 4. Install Visual Chrome Browser Control Tools (Visible Window + Live AI Cursor HUD)
echo "🖱️ Memasang Visual Chrome Control & Live AI Cursor HUD ke ~/.agents/tools/ dan ~/browser-tools/..."
mkdir -p "$HOME/.agents/tools"
mkdir -p "$HOME/browser-tools"
cp -rf "$SCRIPT_DIR/tools"/* "$HOME/.agents/tools/"
cp -rf "$SCRIPT_DIR/tools"/* "$HOME/browser-tools/"
chmod +x "$HOME/.agents/tools"/*.sh "$HOME/.agents/tools"/*/*.sh "$HOME/.agents/tools"/*/*.command "$HOME/.agents/tools"/*.py 2>/dev/null || true
chmod +x "$HOME/browser-tools"/*.sh "$HOME/browser-tools"/*/*.sh "$HOME/browser-tools"/*/*.command "$HOME/browser-tools"/*.py 2>/dev/null || true

# Ensure Python websockets and python-pptx dependencies are present
python3 -c "import websockets" 2>/dev/null || pip install --quiet websockets 2>/dev/null || pip3 install --quiet websockets 2>/dev/null || true
python3 -c "import pptx" 2>/dev/null || pip install --quiet python-pptx 2>/dev/null || pip3 install --quiet python-pptx 2>/dev/null || true

# Symlink convenience binaries to ~/.local/bin
chmod +x "$HOME/.agents/skills/slidedeck-gen/bin/slidedeck-gen.mjs" "$HOME/.agents/skills/slidedeck-gen/scripts"/*.mjs "$HOME/.agents/skills/slidedeck-gen/scripts"/*.py "$HOME/.agents/skills/slidedeck-gen/scripts"/*.sh 2>/dev/null || true
chmod +x "$HOME/.agents/skills/dashi-ppt/scripts"/*.sh "$HOME/.agents/skills/dashi-ppt/scripts"/*.mjs 2>/dev/null || true
ln -sf "$HOME/.agents/tools/launch-visible-chrome.sh" "$HOME/.local/bin/launch-visible-chrome" 2>/dev/null || true
ln -sf "$HOME/.agents/tools/cdp_visual_agent.py" "$HOME/.local/bin/cdp-agent" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/slidedeck-gen/bin/slidedeck-gen.mjs" "$HOME/.local/bin/slidedeck-gen" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/dashi-ppt/scripts/render_goal_deck.sh" "$HOME/.local/bin/dashi-ppt" 2>/dev/null || true

# Ensure and install Dashi PPT runtime dependencies
if [ -d "$HOME/.agents/skills/dashi-ppt/project" ]; then
  echo "📦 Menyiapkan runtime Dashi PPT & Playwright di ~/.agents/skills/dashi-ppt/project..."
  (
    cd "$HOME/.agents/skills/dashi-ppt/project"
    npm install --no-audit 2>/dev/null || npm install
    npx --no-install playwright-core install chromium-headless-shell 2>/dev/null || true
  ) || true
  if [ -d "$HOME/.agents/skills/dashi-ppt/project/node_modules" ]; then
    for other in "$HOME/.gemini/antigravity-cli/skills/dashi-ppt/project" "$HOME/.gemini/config/skills/dashi-ppt/project" "$HOME/.gemini/antigravity/skills/dashi-ppt/project"; do
      if [ -d "$other" ] && [ ! -d "$other/node_modules" ]; then
        ln -s "$HOME/.agents/skills/dashi-ppt/project/node_modules" "$other/node_modules" 2>/dev/null || true
      fi
    done
  fi
fi

# Run slidedeck-gen engine installer & diagnostics
if [ -f "$HOME/.agents/skills/slidedeck-gen/scripts/install-engine.sh" ]; then
  bash "$HOME/.agents/skills/slidedeck-gen/scripts/install-engine.sh" || true
fi
echo "✅ Tools & Slide Deck Engines berhasil dipasang dan dioptimasi!"

echo ""
echo "=========================================================================="
echo "🎉 INSTALASI SELESAI DENGAN SUKSES!"
echo "Semua 23 skill universal, browser tools, dan rules anti-plenger sudah aktif."
echo "Untuk me-reload di sesi aktif Antigravity CLI, ketik: /skills reload"
echo "=========================================================================="
