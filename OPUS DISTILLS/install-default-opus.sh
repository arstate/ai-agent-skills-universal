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
HDD_SKILLS="/mnt/HDD-2/BACKUP LINUX/FILE DATA/AI AGENT SKILLS/OPUS DISTILLS/skills"
[ -d "$HDD_SKILLS" ] && DEST_DIRS+=("$HDD_SKILLS")
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
        if [ "$dirname" = "slidedeck-gen" ] || [ "$dirname" = "next-slidedeck-engine" ]; then
          continue
        fi
        for dest in "${DEST_DIRS[@]}"; do
          [ -L "$dest/$dirname" ] && rm -f "$dest/$dirname"
          mkdir -p "$dest/$dirname"
          rsync -a --delete --exclude="node_modules" --exclude=".next" --exclude=".git" "$dir/" "$dest/$dirname/"
        done
        echo "  -> Skill installed: $dirname"
      fi
    done
    # Consolidate legacy slidedeck-gen & next-slidedeck-engine into pdf-deck
    for dest in "${DEST_DIRS[@]}"; do
      [ -d "$dest/slidedeck-gen" ] && [ ! -L "$dest/slidedeck-gen" ] && rm -rf "$dest/slidedeck-gen"
      [ -d "$dest/next-slidedeck-engine" ] && [ ! -L "$dest/next-slidedeck-engine" ] && rm -rf "$dest/next-slidedeck-engine"
      ln -sfn "pdf-deck" "$dest/slidedeck-gen"
      ln -sfn "pdf-deck" "$dest/next-slidedeck-engine"
    done
    echo "  -> Consolidated slidedeck-gen & next-slidedeck-engine -> pdf-deck"
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
chmod +x "$HOME/.agents/skills/pdf-deck/bin"/*.mjs "$HOME/.agents/skills/pdf-deck/scripts"/*.mjs "$HOME/.agents/skills/pdf-deck/scripts"/*.py "$HOME/.agents/skills/pdf-deck/scripts"/*.sh 2>/dev/null || true
chmod +x "$HOME/.agents/skills/upscale-img/bin/upscale-img" "$HOME/.agents/skills/upscale-img/bin/boost" "$HOME/.agents/skills/upscale-img/scripts/upscale_cuda.py" 2>/dev/null || true
chmod +x "$HOME/.agents/skills/tts-gen/scripts/gemini_tts.py" 2>/dev/null || true
chmod +x "$HOME/.agents/skills/humanizer/scripts/humanize_cli.py" 2>/dev/null || true
chmod +x "$HOME/.agents/skills/figma-design/scripts"/*.ts 2>/dev/null || true
ln -sf "$HOME/.agents/tools/launch-visible-chrome.sh" "$HOME/.local/bin/launch-visible-chrome" 2>/dev/null || true
ln -sf "$HOME/.agents/tools/cdp_visual_agent.py" "$HOME/.local/bin/cdp-agent" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/pdf-deck/bin/pdf-deck.mjs" "$HOME/.local/bin/pdf-deck" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/pdf-deck/bin/pdf-deck.mjs" "$HOME/.local/bin/next-slidedeck" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/pdf-deck/bin/pdf-deck.mjs" "$HOME/.local/bin/slidedeck-gen" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/upscale-img/bin/upscale-img" "$HOME/.local/bin/upscale-img" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/upscale-img/bin/boost" "$HOME/.local/bin/boost" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/tts-gen/scripts/gemini_tts.py" "$HOME/.local/bin/tts-gen" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/tts-gen/scripts/gemini_tts.py" "$HOME/.local/bin/notif-tts" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/humanizer/scripts/humanize_cli.py" "$HOME/.local/bin/humanizer" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/figma-design/scripts/figma-exec.ts" "$HOME/.local/bin/figma-exec" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/figma-design/scripts/design_system_auditor.ts" "$HOME/.local/bin/figma-audit" 2>/dev/null || true
ln -sf "$HOME/.agents/skills/figma-design/scripts/figma_handoff.ts" "$HOME/.local/bin/figma-handoff" 2>/dev/null || true

# Ensure and install Next.js Slide Deck Studio runtime dependencies in pdf-deck
if [ -d "$HOME/.agents/skills/pdf-deck" ]; then
  echo "📦 Menyiapkan Next.js Slide Deck Studio Engine di ~/.agents/skills/pdf-deck..."
  (
    cd "$HOME/.agents/skills/pdf-deck"
    if [ ! -d "node_modules" ]; then
      npm install --no-audit 2>/dev/null || npm install
    fi
    npm run build 2>/dev/null || true
  ) || true
  if [ -d "$HOME/.agents/skills/pdf-deck/node_modules" ]; then
    for other in "$HOME/.gemini/antigravity-cli/skills/pdf-deck" "$HOME/.gemini/config/skills/pdf-deck" "$HOME/.gemini/antigravity/skills/pdf-deck"; do
      if [ -d "$other" ] && [ ! -d "$other/node_modules" ]; then
        ln -s "$HOME/.agents/skills/pdf-deck/node_modules" "$other/node_modules" 2>/dev/null || true
      fi
    done
  fi
fi

# Run pdf-deck engine installer & diagnostics
if [ -f "$HOME/.agents/skills/pdf-deck/scripts/install-engine.sh" ]; then
  bash "$HOME/.agents/skills/pdf-deck/scripts/install-engine.sh" || true
fi
echo "✅ Tools & pdf-deck Engine berhasil dipasang dan dioptimasi!"

echo ""
echo "=========================================================================="
echo "🎉 INSTALASI SELESAI DENGAN SUKSES!"
echo "Semua 37+ skill universal, browser tools, dan rules anti-plenger sudah aktif."
echo "Untuk me-reload di sesi aktif Antigravity CLI, ketik: /skills reload"
echo "=========================================================================="
