# Chrome Browser Control — Linux Setup & Operational Guide

Panduan lengkap instalasi, eksekusi, otomasi agentic loop, dan troubleshooting Chrome DevTools Protocol (CDP) pada Linux (Ubuntu, Debian, Fedora, Arch, Alpine, WSL2).

---

## 📦 1. Persyaratan Sistem & Dependensi

1. **Google Chrome / Chromium**:
   ```bash
   # Ubuntu / Debian:
   sudo apt update
   sudo apt install -y curl wget
   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
   sudo apt install -y ./google-chrome-stable_current_amd64.deb
   rm -f google-chrome-stable_current_amd64.deb

   # Arch Linux:
   sudo pacman -S google-chrome --noconfirm # via AUR or chromium

   # Fedora:
   sudo dnf install -y fedora-workstation-repositories
   sudo dnf config-manager --set-enabled google-chrome
   sudo dnf install -y google-chrome-stable
   ```

2. **Python 3.8+ & websockets**:
   ```bash
   python3 -m pip install --upgrade websockets
   ```

---

## 🚀 2. Cara Menjalankan (Linux Launcher)

### A. Sesi Desktop GUI (X11 / Wayland)
Pastikan environment variable `$DISPLAY` sudah terpasang (biasanya `:0`):
```bash
# Menggunakan dedicated Linux launcher:
bash tools/linux/launch-visible-chrome.sh 9223 "http://localhost:3000"

# Atau menggunakan root universal launcher:
bash tools/launch-visible-chrome.sh 9223 "http://localhost:3000"
```

### B. Lingkungan Server Headless (Tanpa Monitor Fisik / CI/CD)
Jika berjalan di VPS atau server tanpa GUI fisik, gunakan `Xvfb` (Virtual Framebuffer) agar browser tetap berjalan dalam mode GUI penuh tanpa merusak render DOM atau layout CSS:
```bash
sudo apt install -y xvfb
xvfb-run --server-args="-screen 0 1366x840x24" bash tools/linux/launch-visible-chrome.sh 9223 "http://localhost:3000"
```

---

## 🧪 3. Verifikasi & Pengujian Status

Jalankan perintah pengujian berikut di terminal:

```bash
# 1. Tes endpoint CDP Chrome:
curl -s http://127.0.0.1:9223/json/version

# Output yang diharapkan:
# {
#    "Browser": "Chrome/...",
#    "Protocol-Version": "1.3",
#    "webSocketDebuggerUrl": "ws://127.0.0.1:9223/devtools/browser/..."
# }

# 2. Tes tab aktif via Python CLI:
python3 tools/cdp_visual_agent.py tabs --json

# 3. Tes navigasi halaman & Live HUD:
python3 tools/cdp_visual_agent.py open "https://example.com"
python3 tools/cdp_visual_agent.py snapshot
python3 tools/cdp_visual_agent.py done
```

---

## 🔧 4. Panduan Troubleshooting & Error Fixes (Linux)

### Masalah 1: `Connection refused on port 9223`
- **Penyebab**: Chrome belum berjalan atau proses Chrome lama menggantung (zombie process).
- **Solusi**:
  ```bash
  # Cek proses yang mendengarkan port 9223:
  ss -tulpn | grep 9223 || netstat -tulpn | grep 9223

  # Matikan proses Chrome yang macet pada port tersebut:
  pkill -f "remote-debugging-port=9223" || true

  # Luncurkan kembali Chrome:
  bash tools/linux/launch-visible-chrome.sh 9223
  ```

### Masalah 2: `Cannot open display: :0`
- **Penyebab**: Script dijalankan di sesi terminal SSH tanpa export X11 display yang benar.
- **Solusi**:
  ```bash
  export DISPLAY=:0
  # Atau cek display aktif dengan:
  who | grep -o '(:[0-9]*)'
  ```

### Masalah 3: Crash `No space left on device` atau `/dev/shm` terlalu kecil di Docker
- **Penyebab**: Chromium membutuhkan shared memory yang cukup untuk rendering grafis.
- **Solusi**: Jalankan container Docker dengan flag `--shm-size=2gb` atau tambahkan flag `--disable-dev-shm-usage` pada launcher jika berada di container terisolasi.

### Masalah 4: ModuleNotFoundError: No module named 'websockets'
- **Penyebab**: Modul Python `websockets` belum terinstal di environment aktif.
- **Solusi**:
  ```bash
  python3 -m pip install websockets --break-system-packages 2>/dev/null || pip install websockets
  ```
