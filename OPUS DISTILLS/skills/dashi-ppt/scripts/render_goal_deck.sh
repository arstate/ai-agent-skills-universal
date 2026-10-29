#!/usr/bin/env bash
# Dashi PPT runtime migration redirector
echo "================================================================================"
echo "[NOTICE] Dashi PPT runtime executable has been migrated to next-slidedeck-engine."
echo "         All layout blueprints, examples, and theme catalogs are preserved."
echo "         Please use 'next-slidedeck' or 'slidedeck-gen' for 16:9 presentations."
echo "================================================================================"

if command -v next-slidedeck >/dev/null 2>&1; then
  echo "[*] Forwarding to next-slidedeck..."
  exec next-slidedeck "$@"
elif [ -f "$HOME/.agents/skills/next-slidedeck-engine/bin/next-slidedeck.mjs" ]; then
  exec node "$HOME/.agents/skills/next-slidedeck-engine/bin/next-slidedeck.mjs" "$@"
else
  echo "[!] next-slidedeck not found. Please install next-slidedeck-engine." >&2
  exit 1
fi
