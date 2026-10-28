# Chrome Browser Control — Windows Setup & Operational Guide

Panduan lengkap instalasi, eksekusi, otomasi agentic loop, dan troubleshooting Chrome DevTools Protocol (CDP) pada sistem operasi Windows 10 & Windows 11 (PowerShell & Command Prompt).

---

## 📦 1. Persyaratan Sistem & Dependensi

1. **Google Chrome / Microsoft Edge**:
   - Google Chrome resmi (disarankan) terinstal di:
     * `%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe` (instalasi per-user)
     * `C:\Program Files\Google\Chrome\Application\chrome.exe` (instalasi sistem 64-bit)
   - *Fallback Otomatis*: Jika Chrome belum terpasang, launcher otomatis mendeteksi Microsoft Edge (`msedge.exe`) atau Brave Browser yang kompatibel penuh dengan CDP.

2. **Python 3.8+ & websockets**:
   Pastikan Python sudah terpasang dan dicentang opsi *"Add python.exe to PATH"*:
   ```powershell
   python --version
   python -m pip install --upgrade websockets
   ```

---

## 🚀 2. Cara Menjalankan (Windows Launchers)

### Opsi A: PowerShell (Disarankan)
Buka PowerShell (Terminal Windows) dan jalankan:
```powershell
# Jalankan launcher PowerShell dengan port default 9223:
powershell -ExecutionPolicy Bypass -File .\tools\windows\launch-visible-chrome.ps1 -Port 9223 -Url "http://localhost:3000"

# Kontrol browser dengan Python:
python tools\cdp_visual_agent.py open "https://news.ycombinator.com"
python tools\cdp_visual_agent.py tabs --json
```

### Opsi B: Command Prompt (`cmd.exe`)
Buka CMD dan jalankan:
```cmd
rem Jalankan launcher Batch:
.\tools\windows\launch-visible-chrome.bat 9223 "http://localhost:3000"

rem Kontrol browser:
python tools\cdp_visual_agent.py research --format json
```

### Opsi C: Git Bash / MSYS2
Jika menggunakan Git Bash di Windows:
```bash
bash tools/launch-visible-chrome.sh 9223 "http://localhost:3000"
```

---

## 🛡️ 3. Konfigurasi Keamanan Windows & Profile Isolation

1. **Anti-Firewall Popup (`--remote-debugging-address=127.0.0.1`)**:
   Launcher Windows mengunci alamat debugging hanya ke `127.0.0.1` (localhost). Ini mencegah Windows Defender Firewall memunculkan dialog peringatan pop-up jaringan publik.
2. **Isolasi Profil Pengguna Tanpa Cache Bloat (`%TEMP%\chrome-cdp-9223`)**:
   Launcher membuat folder profil terisolasi di folder temporary Windows. Ini mencegah konflik file lock (*"Chrome already open"*) dan tidak mengutak-atik bookmark, login, atau data Chrome harian Anda.

---

## 🧪 4. Verifikasi & Pengujian Status (Windows)

```powershell
# 1. Cek ketersediaan endpoint CDP Chrome:
curl.exe -s http://127.0.0.1:9223/json/version

# 2. Cek daftar tab terbuka dalam format JSON:
python tools\cdp_visual_agent.py tabs --json

# 3. Ekstrak data riset halaman aktif:
python tools\cdp_visual_agent.py research --json

# 4. Selesai dan bersihkan overlay:
python tools\cdp_visual_agent.py done
```

---

## 🔧 5. Panduan Troubleshooting & Error Fixes (Windows)

### Masalah 1: `File ...ps1 cannot be loaded because running scripts is disabled`
- **Penyebab**: Kebijakan eksekusi skrip PowerShell bawaan Windows bernilai `Restricted`.
- **Solusi**:
  Jalankan perintah ini sekali di PowerShell:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
  ```
  Atau selalu panggil dengan flag `-ExecutionPolicy Bypass`:
  ```powershell
  powershell -ExecutionPolicy Bypass -File .\tools\windows\launch-visible-chrome.ps1
  ```

### Masalah 2: `Port 9223 already in use / Connection refused`
- **Penyebab**: Ada proses browser lama yang masih menahan port 9223 di background.
- **Solusi**:
  ```powershell
  # Cari PID proses yang memakai port 9223:
  netstat -ano | findstr :9223

  # Hentikan semua proses Chrome yang terkait dengan CDP port:
  Get-Process chrome | Where-Object { $_.CommandLine -like "*remote-debugging-port=9223*" } | Stop-Process -Force

  # Atau di CMD:
  taskkill /F /IM chrome.exe /FI "WINDOWTITLE eq *cdp*" 2>nul
  ```

### Masalah 3: `'python' is not recognized as an internal or external command`
- **Penyebab**: Python belum ditambahkan ke System Environment Variable `PATH`.
- **Solusi**:
  Buka Start Menu -> ketik `Environment Variables` -> tambahkan `C:\Users\<Username>\AppData\Local\Programs\Python\Python3xx\` dan folder `Scripts` ke variabel `PATH`, lalu buka terminal baru.
