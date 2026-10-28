# Chrome Browser Control — macOS Setup & Operational Guide

Panduan lengkap instalasi, eksekusi, otomasi agentic loop, dan troubleshooting Chrome DevTools Protocol (CDP) pada sistem operasi macOS (Apple Silicon M1/M2/M3/M4 & Intel Mac).

---

## 📦 1. Persyaratan Sistem & Dependensi

1. **Google Chrome**:
   - Google Chrome resmi terpasang di `/Applications/Google Chrome.app`.
   - Pasang via Homebrew (jika belum ada):
     ```bash
     brew install --cask google-chrome
     ```
   - *Fallback Otomatis*: Launcher juga mendeteksi Chromium, Brave Browser, atau Microsoft Edge jika Chrome tidak ditemukan.

2. **Python 3 & websockets**:
   ```bash
   python3 --version
   python3 -m pip install --upgrade websockets
   ```

---

## 🚀 2. Cara Menjalankan (macOS Launchers)

### Opsi A: Terminal (zsh / bash)
Buka aplikasi **Terminal** atau iTerm2, lalu jalankan:
```bash
# Luncurkan Chrome GUI dengan CDP di port 9223:
bash tools/macos/launch-visible-chrome.sh 9223 "http://localhost:3000"

# Kontrol browser dengan cdp_visual_agent.py:
python3 tools/cdp_visual_agent.py open "https://news.ycombinator.com"
python3 tools/cdp_visual_agent.py tabs --json
```

### Opsi B: Double-Click Finder (`.command`)
Anda juga dapat langsung mengklik dua kali file `launch-visible-chrome.command` di Finder. Jendela terminal akan terbuka otomatis dan meluncurkan Chrome GUI dengan CDP aktif.

---

## 🛡️ 3. Konfigurasi Khusus macOS & Keamanan

1. **Aktivasi Jendela Otomatis (`Page.bringToFront` + AppleScript)**:
   Pada macOS, aplikasi yang diluncurkan dari background terminal terkadang tetap berada di belakang jendela terminal aktif. Launcher macOS menyertakan bridge AppleScript:
   ```bash
   osascript -e 'tell application "Google Chrome" to activate'
   ```
   sehingga jendela Chrome langsung meluncur tampil di depan mata pengguna.
2. **Isolasi Cache Native macOS (`~/Library/Caches/chrome-cdp-9223`)**:
   Profile temporary disimpan di folder cache user macOS, sehingga aman dari pembersihan tak sengaja saat reboot namun tidak membebani ruang disk utama.

---

## 🧪 4. Verifikasi & Pengujian Status (macOS)

```bash
# 1. Cek ketersediaan endpoint CDP:
curl -s http://127.0.0.1:9223/json/version

# 2. Cek daftar tab terbuka dalam format JSON:
python3 tools/cdp_visual_agent.py tabs --json

# 3. Ekstrak data riset halaman:
python3 tools/cdp_visual_agent.py research --json

# 4. Selesai dan bersihkan overlay:
python3 tools/cdp_visual_agent.py done
```

---

## 🔧 5. Panduan Troubleshooting & Error Fixes (macOS)

### Masalah 1: `launch-visible-chrome.command cannot be opened because it is from an unidentified developer`
- **Penyebab**: Fitur keamanan macOS Gatekeeper memblokir file script yang diunduh dari internet.
- **Solusi**:
  Jalankan perintah ini di Terminal untuk menghapus atribut karantina:
  ```bash
  xattr -d com.apple.quarantine tools/macos/*
  chmod +x tools/macos/*
  ```

### Masalah 2: `Port 9223 connection refused / Chrome not starting`
- **Penyebab**: Proses Chrome lama dengan remote debugging masih berjalan di background macOS.
- **Solusi**:
  ```bash
  # Cek proses Chrome CDP:
  ps aux | grep "remote-debugging-port=9223"

  # Matikan proses yang menahan port:
  pkill -f "remote-debugging-port=9223" || true

  # Luncurkan kembali:
  bash tools/macos/launch-visible-chrome.sh 9223
  ```

### Masalah 3: `zsh: command not found: python`
- **Penyebab**: macOS versi modern (Monterey ke atas) telah menghapus Python 2 bawaan (`python`).
- **Solusi**:
  Gunakan `python3` atau buat alias di `~/.zshrc`:
  ```bash
  echo 'alias python=python3' >> ~/.zshrc
  source ~/.zshrc
  ```
