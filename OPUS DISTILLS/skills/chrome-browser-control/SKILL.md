---
name: chrome-browser-control
description: Ultra-fast, zero-dependency cross-platform (Linux, Windows, macOS) Chrome DevTools Protocol (CDP) browser automation, visible GUI window launcher, live AI visual cursor/click HUD specialist, deep table extractor, clean content reader, link & SERP scraper, and deep research agentic loop inspection engine. Use when controlling Google Chrome via WebSocket/CDP (port 9223/9222), showing live AI cursor movement and click ripples on the user's monitor, previewing or debugging websites, extracting tables and structured data without pagination bias, reading articles in clean markdown, or conducting comprehensive web research and autonomous agentic loops.
---

# Chrome Browser Control: Cross-Platform Sub-Millisecond CDP Engine & Live AI Visual HUD (Port 9223 / 9222)

Specialist SOP for ultra-fast, transparent, and safe browser automation natively supported on **Linux**, **Windows**, and **macOS** using raw Chrome DevTools Protocol (CDP) over WebSockets, with the **Lime Vignette + Top-Center Frosted Glass Capsule + AI OS Cursor HUD (`scripts/ai-cursor-hud.js` + `scripts/cdp_visual_agent.py` + OS Launchers)**.

---

## 🗂️ OS Directory & Foldering Architecture

Setiap agent yang beroperasi pada sistem operasi host dapat langsung membaca dan mengeksekusi dokumen serta launcher yang tepat tanpa kebingungan:

```text
skills/chrome-browser-control/
├── SKILL.md                 <-- Master Specialist SOP & Command Reference
├── README.md                <-- Universal Cross-Platform Architecture Guide
├── README_LINUX.md          <-- Panduan khusus Linux (X11/Wayland, headless xvfb, display)
├── README_WINDOWS.md        <-- Panduan khusus Windows (PowerShell, CMD, Edge fallback)
├── README_MACOS.md          <-- Panduan khusus macOS (AppleScript window focus, .command)
└── scripts/ (atau tools/)
    ├── cdp_visual_agent.py  <-- Cross-platform Python CDP CLI (Windows, macOS, Linux)
    ├── ai-cursor-hud.js     <-- Universal DOM overlay (Lime Vignette + Top Capsule)
    ├── launch-visible-chrome.sh <-- Universal auto-detect launcher
    ├── linux/
    │   └── launch-visible-chrome.sh     <-- Launcher Linux (X11 / Wayland)
    ├── windows/
    │   ├── launch-visible-chrome.bat    <-- Launcher Windows CMD / Batch
    │   └── launch-visible-chrome.ps1    <-- Launcher Windows PowerShell
    └── macos/
        ├── launch-visible-chrome.sh     <-- Launcher macOS Shell
        └── launch-visible-chrome.command<-- Launcher macOS Double-Clickable
```

---

## ⚡ 0. Golden Rules: Always Show Visible Chrome Window & Live AI Visual Capsule

1. **Always Launch a Visible GUI Chrome Window (Default = Headed GUI, Not Headless):**
   - Never use `--headless=new` or `--ozone-platform=headless` when the user is working on a desktop session (`DISPLAY=:0`, macOS Aqua, Windows Desktop).
   - Launch Chrome via host-appropriate launcher and call CDP `Page.bringToFront` so the Chrome window immediately appears on the user's monitor.
2. **Visual Transparency & Live HUD (Clean Elegant SaaS Style `#CEF128`):**
   - **Lime Vignette Glow Border (`#ba-vignette-overlay`)**: Border aktif `2.5px solid rgba(206, 241, 40, 0.85)` beranimasi pulse di sekeliling tab saat AI sedang mengontrol.
   - **Top-Center Frosted Glass Capsule (`#ba-control-capsule`)**: Kapsul melayang di bagian atas tengah (`top: 14px`) bergaya liquid glass macOS dengan teks aksi real-time.
   - **OS-Style Symmetrical Lime Pointer (`#ba-ai-cursor-indicator`)**: Panah SVG `#CEF128` ber-stroke hitam dengan animasi standby bernapas (*standby breathe*) dan expanding ripple wave.
   - **Target Glow Highlight (`#__ba_target_box`)**: Kotak sorot rounded berefek neon lime menyala di sekitar elemen yang sedang disentuh AI.
3. **Aturan Mutlak Chrome Utama (Daily Browser) vs Instance CDP Terpisah:**
   - **Di Chrome Utama (Daily Browser / Port 9222 / Active User Window): DILARANG BUKA / TUTUP WINDOW!**
     * **DILARANG KERAS** menutup seluruh jendela Chrome harian user (`Browser.close`, `pkill chrome`, `killall chrome`, atau menutup window utama).
     * **Buka & Tutup TAB DIIZINKAN (Tab Management):** Agent DIPERBOLEHKAN membuka tab baru (`new` tab) atau menutup tab yang dikontrol agent (`close <tab_id>`). Tab terakhir otomatis diproteksi agar window tidak tertutup.
   - **Di Instance CDP Khusus (Port 9223 / Isolated Window):**
     * Buka/tutup window diperbolehkan karena berjalan di profile/instance terisolasi (`/tmp/chrome-cdp-9223` atau `%TEMP%\chrome-cdp-9223`).
4. **Pembersihan UI Otomatis Saat Selesai (Zero Residual HUD):**
   - Ketika tugas browsing selesai, agent **WAJIB** membersihkan tampilan overlay dengan perintah:
     ```bash
     python3 scripts/cdp_visual_agent.py done [--tab <id>]
     ```
   - Skrip HUD juga dilengkapi **Auto-Dismiss Idle Timer (4 detik)**: jika agent berhenti melakukan aksi selama 4 detik, seluruh Kapsul, Vignette Glow, dan Kursor AI otomatis memudar dan menghilang tanpa sisa residu.

---

## 🛠️ 1. Bundled Cross-Platform Tools

| Tool File | Operating System | Purpose | Example Command |
| :--- | :--- | :--- | :--- |
| **`scripts/linux/launch-visible-chrome.sh`** | Linux (Ubuntu/Debian/Arch) | Launches visible Chrome with CDP on port 9223 | `bash scripts/linux/launch-visible-chrome.sh 9223 "http://localhost:3000"` |
| **`scripts/windows/launch-visible-chrome.ps1`** | Windows (PowerShell) | Launches Chrome/Edge with CDP on port 9223 | `powershell -ExecutionPolicy Bypass -File .\scripts\windows\launch-visible-chrome.ps1 -Port 9223` |
| **`scripts/windows/launch-visible-chrome.bat`** | Windows (CMD/Batch) | Windows batch launcher for cmd.exe | `.\scripts\windows\launch-visible-chrome.bat 9223 "http://localhost:3000"` |
| **`scripts/macos/launch-visible-chrome.sh`** | macOS (Terminal) | Launches Chrome on macOS with AppleScript focus | `bash scripts/macos/launch-visible-chrome.sh 9223 "http://localhost:3000"` |
| **`scripts/cdp_visual_agent.py`** | Linux / Windows / macOS | Zero-dependency high-speed CLI driving Chrome over WebSocket CDP | `python3 scripts/cdp_visual_agent.py click 142 "Tombol RFQ"` |
| **`scripts/ai-cursor-hud.js`** | All Platforms | Persistent DOM overlay (Vignette, Capsule, SVG Cursor, Ripple) | Auto-injected via `Page.addScriptToEvaluateOnNewDocument` |

---

## ⚡ 2. High-Speed Sub-Millisecond Commands (`cdp_visual_agent.py`)

### 1. Manajemen Tab & Mode Hybrid (Foreground vs Background)
```bash
# A. List semua tab aktif di Chrome (mendukung format JSON untuk agentic loop):
python3 scripts/cdp_visual_agent.py tabs
python3 scripts/cdp_visual_agent.py tabs --json

# B. Pindah / Switch langsung ke tab pilihan:
python3 scripts/cdp_visual_agent.py switch 2
python3 scripts/cdp_visual_agent.py switch "instagram"

# C. Mode Background (Senyap) — Kontrol tab lain TANPA ganggu layar lu:
python3 scripts/cdp_visual_agent.py click "button" "Submit" --tab 2 --no-switch
python3 scripts/cdp_visual_agent.py type "input" "Baja WF" --tab "katalog" --no-switch
python3 scripts/cdp_visual_agent.py snapshot --tab 3 --no-switch

# D. Mode Foreground (Visual) — Otomatis switch ke depan mata + tampilkan HUD:
python3 scripts/cdp_visual_agent.py click "button" "Submit" --tab 2 --switch

# E. Buka tab baru di jendela yang sama (bisa foreground atau background):
python3 scripts/cdp_visual_agent.py new "https://news.ycombinator.com"
python3 scripts/cdp_visual_agent.py new "https://example.com" --no-switch

# F. Tutup tab yang dikontrol agent (Tab terakhir diproteksi agar window tidak tertutup):
python3 scripts/cdp_visual_agent.py close 3

# G. Bersihkan / Hilangkan UI Kontrol Pasca-Tugas Selesai (Zero HUD Residue):
python3 scripts/cdp_visual_agent.py done
```

### 2. Fast Button & Clickable Scanner (`buttons` / `btn`)
Memindai seluruh tombol, link interaktif, dan kontrol klik pada halaman secara instan, lengkap dengan koordinat pusat dan selector unik:
```bash
# Pindai semua tombol interaktif pada halaman aktif:
python3 scripts/cdp_visual_agent.py buttons

# Filter tombol berdasarkan kata kunci:
python3 scripts/cdp_visual_agent.py buttons "kalkulator" --tab 1 --no-switch

# Output format JSON terstruktur untuk agen:
python3 scripts/cdp_visual_agent.py buttons --json
```

### 3. Deep Table Extraction (`table` / `extract_table`)
Mengekstrak seluruh baris data dari tabel, quota tracker, grid analitik, atau Meta Ads Manager tanpa terpotong pagination atau virtual scrolling:
```bash
# A. Ekstrak tabel ke format Markdown Table:
python3 scripts/cdp_visual_agent.py table --tab 4 --no-switch

# B. Ekstrak tabel dengan auto-scroll untuk virtualized grid (misal 100+ baris):
python3 scripts/cdp_visual_agent.py table --scroll --max-rows 300 --tab 4 --no-switch

# C. Ekstrak langsung ke format JSON terstruktur untuk analisis kuantitatif:
python3 scripts/cdp_visual_agent.py table --json --tab 4 --no-switch

# D. Ekstrak ke format CSV standar:
python3 scripts/cdp_visual_agent.py table --format csv --tab 4 --no-switch
```

### 4. Ekstraksi Konten Bersih & Markdown Reader (`extract` / `content` / `markdown`)
Mengekstrak artikel atau teks utama dari halaman web bebas iklan, banner cookie, dan menu navigasi ke dalam format Clean Markdown yang siap dibaca:
```bash
# Ekstrak konten artikel utama ke Markdown:
python3 scripts/cdp_visual_agent.py extract --tab 3 --no-switch

# Ekstrak sebagai format JSON (termasuk metadata, word count, plain text):
python3 scripts/cdp_visual_agent.py extract --json --tab 3 --no-switch

# Ekstrak teks murni saja:
python3 scripts/cdp_visual_agent.py extract --format text --tab 3 --no-switch
```

### 5. Deep Research Dossier Inspection (`research` / `deep_research`)
Menghasilkan dossier riset komprehensif dari sebuah halaman web (Metadata, Schema.org JSON-LD, OpenGraph, Hierarki Heading H1-H4, Artikel Inti Markdown, Tabel, dan Daftar Referensi Link Eksternal):
```bash
# Tampilkan dossier riset lengkap ke terminal:
python3 scripts/cdp_visual_agent.py research --tab 3 --no-switch

# Ekstrak langsung ke format JSON di stdout:
python3 scripts/cdp_visual_agent.py research --json --tab 3 --no-switch

# Simpan hasil riset langsung ke file Markdown atau JSON:
python3 scripts/cdp_visual_agent.py research --output /tmp/hasil-riset.md --tab 3 --no-switch
python3 scripts/cdp_visual_agent.py research --output /tmp/hasil-riset.json --tab 3 --no-switch
```

### 6. Link & SERP Extractor (`links` / `urls` / `serp`)
Mengekstrak seluruh link eksternal & internal atau hasil pencarian Google/Bing/DuckDuckGo untuk deep research agentic loops:
```bash
# Ekstrak semua link pada halaman aktif:
python3 scripts/cdp_visual_agent.py links

# Filter link berdasarkan kata kunci atau domain:
python3 scripts/cdp_visual_agent.py links "github" --json

# Ekstrak dalam format JSON murni untuk agen:
python3 scripts/cdp_visual_agent.py links --json --tab 2 --no-switch
```

### 7. Evaluasi JavaScript Langsung (`eval` / `js`)
Mengeksekusi ekspresi JavaScript sembarang di context tab aktif dan mengambil hasilnya seketika:
```bash
# Cek judul dokumen atau properti window:
python3 scripts/cdp_visual_agent.py eval "document.title"
python3 scripts/cdp_visual_agent.py eval "location.href"

# Ambil objek state kompleks dalam format JSON:
python3 scripts/cdp_visual_agent.py eval "window.__INITIAL_STATE__" --json
```

### 8. Pengisian Formulir Otomatis Cerdas (`form` / `fill`)
```bash
# Isi formulir via data JSON string langsung:
python3 scripts/cdp_visual_agent.py form '{"nama": "Budi Santoso", "email": "budi@perusahaan.com", "telepon": "08123456789"}' --tab 1

# Isi formulir via file JSON:
python3 scripts/cdp_visual_agent.py form /path/to/data-pelanggan.json --tab 1
```

### 9. Network & Element Settle Waiting (`wait` / `sleep`)
```bash
# Tunggu durasi detik:
python3 scripts/cdp_visual_agent.py wait 2.5 --tab 1

# Tunggu sampai selector tombol / elemen target muncul (timeout default 10s):
python3 scripts/cdp_visual_agent.py wait "button[type='submit']" --timeout 5000 --tab 1
```

### 10. Snapshot Cepat via Accessibility Tree (< 30ms)
```bash
python3 scripts/cdp_visual_agent.py snapshot
python3 scripts/cdp_visual_agent.py snapshot --json --tab 2 --no-switch
```

### 11. Klik Presisi Zero-Miss (Dual-Dispatch Anti-Miss)
```bash
# Opsi A: Via backendNodeId (kecepatan maksimal < 20ms)
python3 scripts/cdp_visual_agent.py click 124 "Klik Tombol Ajukan Penawaran"

# Opsi B: Via CSS selector atau teks tombol asli
python3 scripts/cdp_visual_agent.py click "button[type='submit']" "Kirim Form RFQ"
python3 scripts/cdp_visual_agent.py click "BAJA WF & H-BEAM" --tab 4 --no-switch
```

### 12. Input Teks Instan
```bash
python3 scripts/cdp_visual_agent.py type "input[name='panjang']" "6000" "Ketik Panjang 6000 mm"
python3 scripts/cdp_visual_agent.py type "Email" "budi@perusahaan.com" "Isi Email Kantor" --enter
```

### 13. Screenshot Cepat (Format WebP Ringan)
```bash
python3 scripts/cdp_visual_agent.py screenshot "/tmp/hasil-audit.webp"
```

---

## 🔄 3. Agentic Loop Pattern (Multi-Turn Swarm Engine)

Dalam pola agen otonom (*autonomous loop*), gunakan parameter `--json` dan `--no-switch` agar eksekusi berlangsung senyap, cepat, dan terstruktur:

```python
import subprocess
import json

def cdp(cmd_args):
    """Jalankan perintah CDP CLI dan parse output JSON jika tersedia."""
    full_cmd = ["python3", "scripts/cdp_visual_agent.py"] + cmd_args
    res = subprocess.run(full_cmd, capture_output=True, text=True, check=True)
    if "--json" in cmd_args:
        return json.loads(res.stdout)
    return res.stdout

# 1. Langkah Pertama: Ambil Snapshot Elemen Interaktif
snapshot = cdp(["snapshot", "--tab", "1", "--no-switch"])
print("Elemen interaktif ditemukan:", snapshot["interactiveElementsCount"])

# 2. Langkah Kedua: Cari Tombol Sasaran
buttons = cdp(["buttons", "kirim", "--json", "--tab", "1", "--no-switch"])
if buttons:
    target_sel = buttons[0]["selector"]
    # 3. Langkah Ketiga: Klik Tombol
    cdp(["click", target_sel, "Klik Submit", "--tab", "1", "--no-switch"])

# 4. Langkah Keempat: Ambil Hasil / Konfirmasi
cdp(["wait", "2", "--tab", "1", "--no-switch"])
article = cdp(["extract", "--json", "--tab", "1", "--no-switch"])
print("Hasil Halaman:", article["title"])

# 5. Selesai
cdp(["done"])
```

---

## 🛡️ 4. Keunggulan Arsitektur Dibandingkan Library Eksternal

1. **Zero-Latency In-Memory Execution**: Tembak langsung ke Chromium Blink engine via raw WebSocket CDP tanpa wrapper Playwright/Puppeteer yang berat.
2. **True Cross-Platform (Linux, Windows, macOS)**: Dilengkapi dengan native launchers untuk PowerShell, CMD batch, macOS shell/.command, dan Linux X11/Wayland.
3. **Dual-Dispatch Anti-Miss Klik**: Memadukan CDP native mouse click (`mousePressed` + `mouseReleased`) dengan in-DOM synthetic event dispatch (`target.click()`), menggaransi 0 miss klik pada React, Vue, Svelte, maupun native HTML.
4. **Deep Virtual Table Extractor**: Menangani dashboard dinamis (Meta Ads Manager, CRM, Quota grids) dengan auto-scrolling virtual list dan deduplikasi composite key.
5. **Clean Readability & Deep Research**: Menyaring noise DOM (script, style, iframe, ads) dan mengekstrak dokumen terstruktur lengkap dengan JSON-LD, OpenGraph, link eksternal, dan artikel Markdown.
6. **Visual Estetika Clean Elegant SaaS**: Tampilan interaktif yang bersih dengan warna Lime Chartreuse `#CEF128`, Top Capsule semi-transparan, zero-emoji, dan auto-idle dismiss (4 detik).
7. **Strict Window Protection**: Melindungi jendela browser utama user dari penutupan tab terakhir secara tak sengaja.
