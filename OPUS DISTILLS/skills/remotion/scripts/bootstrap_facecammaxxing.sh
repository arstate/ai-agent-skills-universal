#!/usr/bin/env bash
set -euo pipefail

RUNTIME_DIR="${HOME}/.agents/tools/facecammaxxing"
REPO_URL="https://github.com/aaksa/facecammaxxing.git"

echo "🎬 Remotion Mode A Runtime Check: ${RUNTIME_DIR}"

if [ -d "${RUNTIME_DIR}/.git" ]; then
  echo "✓ Runtime sudah ada di ${RUNTIME_DIR}. Menarik update terbaru (fast-forward)..."
  git -C "${RUNTIME_DIR}" pull --ff-only || true
else
  mkdir -p "$(dirname "${RUNTIME_DIR}")"
  echo "⬇️ Cloning ${REPO_URL} ke ${RUNTIME_DIR}..."
  git clone --depth 1 "${REPO_URL}" "${RUNTIME_DIR}"
fi

echo "🔎 Cek dependency lokal:"
command -v remotion >/dev/null 2>&1 && echo "  ✓ remotion: $(remotion --version 2>/dev/null || echo installed)" || echo "  ⚠ remotion CLI belum global (pakai npx remotion di project)"
command -v ffmpeg >/dev/null 2>&1 && echo "  ✓ ffmpeg: $(ffmpeg -version | head -n 1)" || echo "  ⚠ ffmpeg belum ditemukan di PATH"
command -v blender >/dev/null 2>&1 && echo "  ✓ blender: terpasang (modul 3D .glb siap)" || echo "  ℹ blender tidak terpasang (opsional; prop-3d tetap jalan dengan mesh built-in)"

echo "✅ Runtime facecammaxxing siap. Untuk install Node & Python venv di dalamnya:"
echo "   cd \"${RUNTIME_DIR}\" && npm install && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt"
