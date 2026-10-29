#!/usr/bin/env bash
# launch-visible-chrome.sh — Universal Cross-Platform Visible GUI Chrome CDP Launcher
# Detects host OS (Linux, macOS, Windows/Git Bash) and launches with CDP on port 9223
set -e

PORT="${1:-9223}"
URL="${2:-about:blank}"
DIR="$(cd "$(dirname "$0")" && pwd)"
OS="$(uname -s 2>/dev/null || echo "Unknown")"

# 1. OS-specific delegation if specialized scripts exist
case "$OS" in
  Darwin*)
    if [ -f "$DIR/macos/launch-visible-chrome.sh" ]; then
      exec "$DIR/macos/launch-visible-chrome.sh" "$PORT" "$URL"
    fi
    ;;
  CYGWIN*|MINGW*|MSYS*)
    BAT_PATH="$DIR/windows/launch-visible-chrome.bat"
    if [ -f "$BAT_PATH" ]; then
      if command -v cygpath >/dev/null 2>&1; then
        BAT_PATH="$(cygpath -w "$BAT_PATH")"
      fi
      cmd.exe /c "$BAT_PATH" "$PORT" "$URL"
      exit $?
    fi
    ;;
esac

# 2. Linux / Default execution flow
export DISPLAY="${DISPLAY:-:0}"

find_cdp_agent() {
  for candidate in \
    "$DIR/cdp_visual_agent.py" \
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

# Check if already running on $PORT
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

# Locate Chrome binary
CHROME_BIN=""
for candidate in \
  "$HOME/.local/bin/google-chrome" \
  "/usr/bin/google-chrome-stable" \
  "/usr/bin/google-chrome" \
  "/usr/bin/chromium" \
  "/usr/bin/chromium-browser" \
  "/opt/google/chrome/chrome" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  if [ -x "$candidate" ]; then
    CHROME_BIN="$candidate"
    break
  fi
done

if [ -z "$CHROME_BIN" ]; then
  echo "❌ Error: Google Chrome / Chromium executable not found."
  echo "👉 For Linux: sudo apt install -y google-chrome-stable"
  echo "👉 For macOS: brew install --cask google-chrome"
  echo "👉 For Windows: Install Chrome and run tools/windows/launch-visible-chrome.bat"
  exit 1
fi

USER_DATA_DIR="/tmp/chrome-cdp-$PORT"
mkdir -p "$USER_DATA_DIR"

EXTRA_FLAGS=()
if [ -n "$WAYLAND_DISPLAY" ]; then
  EXTRA_FLAGS+=("--ozone-platform-hint=auto")
fi

echo "🚀 Launching Visible GUI Chrome on port $PORT..."
"$CHROME_BIN" \
  --remote-debugging-port="$PORT" \
  --remote-debugging-address=127.0.0.1 \
  --user-data-dir="$USER_DATA_DIR" \
  "${EXTRA_FLAGS[@]}" \
  --window-size=1366,840 \
  --window-position=60,40 \
  --disable-blink-features=AutomationControlled \
  --disable-background-timer-throttling \
  --disable-backgrounding-occluded-windows \
  --disable-renderer-backgrounding \
  --no-first-run \
  --no-default-browser-check \
  --password-store=basic \
  "$URL" >/dev/null 2>&1 &

CHROME_PID=$!

# Wait up to 5s for CDP endpoint to respond
for i in {1..25}; do
  if curl -s "http://127.0.0.1:$PORT/json/version" >/dev/null 2>&1; then
    echo "✅ Chrome GUI successfully running on port $PORT (PID: $CHROME_PID)!"
    exit 0
  fi
  sleep 0.2
done

echo "⚠️ Warning: Chrome launched (PID $CHROME_PID), but CDP port $PORT did not respond within 5s."
