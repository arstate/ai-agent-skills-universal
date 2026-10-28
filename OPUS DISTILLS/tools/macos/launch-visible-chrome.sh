#!/usr/bin/env bash
# launch-visible-chrome.sh (macOS Edition)
# Fast, visible GUI Chrome launcher with CDP remote debugging enabled (Default port: 9223)
set -e

PORT="${1:-9223}"
URL="${2:-about:blank}"

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

# 2. Locate Chrome / Chromium / Brave / Edge binary on macOS
CHROME_BIN=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$HOME/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"; do
  if [ -x "$candidate" ]; then
    CHROME_BIN="$candidate"
    break
  fi
done

if [ -z "$CHROME_BIN" ]; then
  echo "❌ Error: Google Chrome / Chromium executable not found on macOS."
  echo "👉 Install Chrome via: brew install --cask google-chrome"
  exit 1
fi

# 3. Isolated user profile directory to prevent profile lock conflicts
USER_DATA_DIR="$HOME/Library/Caches/chrome-cdp-$PORT"
mkdir -p "$USER_DATA_DIR"

echo "🚀 Launching Visible GUI Chrome on macOS (Port: $PORT)..."
nohup "$CHROME_BIN" \
  --remote-debugging-port="$PORT" \
  --remote-debugging-address=127.0.0.1 \
  --user-data-dir="$USER_DATA_DIR" \
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
    echo "✅ Chrome GUI successfully running on macOS port $PORT (PID: $CHROME_PID)!"
    APP_BUNDLE=$(echo "$CHROME_BIN" | sed -E 's|.*/([^/]+)\.app/.*|\1|')
    if [ -n "$APP_BUNDLE" ]; then
      osascript -e "tell application \"$APP_BUNDLE\" to activate" 2>/dev/null || osascript -e 'tell application "Google Chrome" to activate' 2>/dev/null || true
    else
      osascript -e 'tell application "Google Chrome" to activate' 2>/dev/null || true
    fi
    exit 0
  fi
  sleep 0.2
done

echo "⚠️ Warning: Chrome launched (PID $CHROME_PID), but CDP port $PORT did not respond within 5s."
