#!/usr/bin/env bash
# launch-visible-chrome.sh (Linux Edition)
# Fast, visible GUI Chrome launcher with CDP remote debugging enabled (Default port: 9223)
set -e

PORT="${1:-9223}"
URL="${2:-about:blank}"
export DISPLAY="${DISPLAY:-:0}"

# Helper to find cdp_visual_agent.py across environments
find_cdp_agent() {
  for candidate in \
    "$(dirname "$0")/../cdp_visual_agent.py" \
    "$(dirname "$0")/cdp_visual_agent.py" \
    "$HOME/.agents/tools/cdp_visual_agent.py" \
    "$HOME/browser-tools/cdp_visual_agent.py" \
    "$HOME/.gemini/antigravity-cli/skills/chrome-browser-control/scripts/cdp_visual_agent.py" \
    "$HOME/.gemini/config/skills/chrome-browser-control/scripts/cdp_visual_agent.py" \
    "$HOME/.agents/skills/chrome-browser-control/scripts/cdp_visual_agent.py"; do
    if [ -f "$candidate" ]; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

# 1. Check if Chrome CDP is already running on $PORT
if curl -s "http://127.0.0.1:$PORT/json/version" >/dev/null 2>&1; then
  echo "⚡ Chrome already running on port $PORT."
  if [ "$URL" != "about:blank" ]; then
    AGENT_PY=$(find_cdp_agent || true)
    if [ -n "$AGENT_PY" ]; then
      python3 "$AGENT_PY" open "$URL" --port "$PORT" 2>/dev/null || true
    fi
  fi
  exit 0
fi

# 2. Locate Chrome / Chromium binary on Linux
CHROME_BIN=""
for candidate in \
  "$HOME/.local/bin/google-chrome" \
  "/usr/bin/google-chrome-stable" \
  "/usr/bin/google-chrome" \
  "/usr/bin/chromium" \
  "/usr/bin/chromium-browser" \
  "/opt/google/chrome/chrome" \
  "/usr/bin/brave-browser" \
  "/usr/bin/microsoft-edge-stable"; do
  if [ -x "$candidate" ]; then
    CHROME_BIN="$candidate"
    break
  fi
done

if [ -z "$CHROME_BIN" ]; then
  echo "❌ Error: Google Chrome / Chromium executable not found on Linux."
  echo "👉 Install with: sudo apt update && sudo apt install -y google-chrome-stable"
  exit 1
fi

# 3. Isolated user profile directory
USER_DATA_DIR="/tmp/chrome-cdp-$PORT"
mkdir -p "$USER_DATA_DIR"

EXTRA_FLAGS=()
if [ -n "$WAYLAND_DISPLAY" ]; then
  EXTRA_FLAGS+=("--ozone-platform-hint=auto")
fi

echo "🚀 Launching Visible GUI Chrome on Linux (Port: $PORT, Display: $DISPLAY)..."
"$CHROME_BIN" \
  --remote-debugging-port="$PORT" \
  --remote-debugging-address=127.0.0.1 \
  --user-data-dir="$USER_DATA_DIR" \
  "${EXTRA_FLAGS[@]}" \
  --window-size=1366,840 \
  --window-position=60,40 \
  --disable-blink-features=AutomationControlled \
  --no-first-run \
  --no-default-browser-check \
  --password-store=basic \
  "$URL" >/dev/null 2>&1 &

CHROME_PID=$!

# 4. Wait up to 5s for CDP endpoint to respond
for i in {1..25}; do
  if curl -s "http://127.0.0.1:$PORT/json/version" >/dev/null 2>&1; then
    echo "✅ Chrome GUI successfully running on port $PORT (PID: $CHROME_PID)!"
    exit 0
  fi
  sleep 0.2
done

echo "⚠️ Warning: Chrome launched (PID $CHROME_PID), but CDP port $PORT did not respond within 5s."
