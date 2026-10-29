# Master Prompt & Panduan Upgrade Skills Agent — Google Antigravity CLI Edition (`AGENTS.md` + Mandatory Sub-Skill Read Gate + `Nutlope/hallmark` 58 Gates)

Dokumen ini berisi **2 bagian lengkap siap pakai** khusus buat pengguna **Google Antigravity CLI (`agy`)**, Antigravity IDE, & Workspace Agent:

1. **Cara Instalasi Cepat (Otomatis ke `~/.gemini/antigravity-cli/skills/` & Global `AGENTS.md`)** dari file `opus_distills_skills_pack.zip` (total **140 file dari 22 skill**).

2. **Master Prompt Copy-Paste Lengkap (Anti-Plenger / Anti-Skip Sub-Skill Edition)** untuk diberikan langsung ke Antigravity CLI lu agar otomatis:

   * **MEMAKSA Agent Membaca File `SKILL.md` Sub-Skill Secara Nyata (`view_file` / `read_file` Gate):** Mencegah penyakit agent "plenger/malas" yang cuma baca tabel ringkasan di `opus-distills` tanpa membuka file `web-planning/SKILL.md`, `web-design/SKILL.md`, `taste-design/SKILL.md`, atau `web-debugging/SKILL.md`!

   * **Mewajibkan Bukti Baca (`🔧 [Skills Auto-Loaded: ...]`) di Baris Pertama Chat:** Agent dilarang menulis kode/HTML sebelum mencetak daftar file `SKILL.md` yang benar-benar baru saja dia baca via `view_file` di turn tersebut.

   * **Melarang Loncat Fase ke `index.html` Mentah Saat Diminta Planning:** Saat user meminta *user flow / next steps / planning step-by-step*, agent wajib menjalankan `web-planning` (menyusun User Flow Mermaid + merekomendasikan **Next.js 15 App Router** dan menunggu konfirmasi), bukan diam-diam membuat `index.html` vanilla mentah.

   * **Mengintegrasikan `Nutlope/hallmark` (v2.8.0 — 58 `sloplint` Gates & 48 Material Themes)** + **300-Ref Vault** saat user meminta contoh desain/style web (wajib 5–10 style dengan foto industri nyata & Bento/Editorial non-AI-slop, haram 3 warna generik).

## BAGIAN 1: Cara Ekstrak & Pasang File ZIP ke Google Antigravity CLI (`agy`)

Jalankan perintah berikut di terminal lu:

```
# 1. Buat folder sementara & ekstrak ZIP (140 file dari 22 skill)
mkdir -p /tmp/opus-skills-upgrade
unzip -o opus_distills_skills_pack.zip -d /tmp/opus-skills-upgrade

# 2. Jalankan Installer Otomatis Antigravity CLI (Pasang 22 Skill + Global AGENTS.md & GEMINI.md Anti-Plenger):
bash /tmp/opus-skills-upgrade/install-default-opus.sh

# 3. (Opsional) Pasang juga ke folder project aktif (.agents/skills/) + buat/migrasi readme-ai-agent/:
mkdir -p .agents/skills
cp -r /tmp/opus-skills-upgrade/skills/* .agents/skills/
bash /tmp/opus-skills-upgrade/init-readme-ai-agent.sh .

# 4. Di dalam sesi interaktif Antigravity CLI (agy), ketik perintah ini untuk me-reload skill:
# /skills reload



```

## BAGIAN 2: Master Prompt Copy-Paste untuk Instruksi Upgrade ke Antigravity CLI Lu

Copy seluruh blok di bawah ini dan kirimkan ke Antigravity CLI (`agy`) lu:

```
# INSTRUKSI MANDATORI ANTI-PLENGER: PAKSA AUTO-READ SUB-SKILLS (`view_file`), LOCK `readme-ai-agent/AGENTS.md`, & `Nutlope/hallmark` 58-GATE

Tolong baca dan patuhi aturan keras berikut di setiap turn tanpa alasan:

## 1. HUKUM BESI #1: DILARANG "JALAN PINTAS" HANYA BACA `opus-distills` TANPA `view_file` SUB-SKILL SPESIALIS!
Masalah fatal yang sering terjadi: saat user mengetik `opus-distills`, kamu hanya membaca ringkasan di `opus-distills/SKILL.md` lalu langsung menebak sendiri isi `web-design`, `taste-design`, `web-planning`, atau `web-debugging` tanpa benar-benar membuka file `SKILL.md` milik sub-skill tersebut!
Mulai detik ini:
1. **`opus-distills` HANYA ROUTER PEMICU, BUKAN PENGGANTI SUB-SKILL!**
2. **WAJIB PANGGIL TOOL `view_file` / `read_file` DI TURN YANG SAMA SEBELUM MENULIS KODE ATAU MENJAWAB:**
   Saat user mengirim prompt (baik hanya tag `opus-distills` maupun tanpa tag), tindakan pertamamu adalah memanggil `view_file` untuk membaca file `SKILL.md` dari sub-skill yang relevan di `~/.gemini/antigravity/skills/<nama>/SKILL.md`, `~/.gemini/antigravity-cli/skills/<nama>/SKILL.md`, atau `.agents/skills/<nama>/SKILL.md`:
   - **User minta contoh desain style / visual preview / UI front-end memukau:**
     WAJIB `view_file` ke:
     1) `web-design/SKILL.md`
     2) `taste-design/SKILL.md`
     3) `web-design/references/14-pass-critique-rubric.md` (berisi **48 Tema Material `Nutlope/hallmark` & 58 Gate `sloplint`**)
     4) `web-design/references/cat-XX-*.md` (1 file kategori dari **300-Ref Vault** yang sesuai industri klien)
   - **User minta next steps / user flow / planning step-by-step / arsitektur web:**
     WAJIB `view_file` ke:
     1) `web-planning/SKILL.md`
     2) `web-master-agent/SKILL.md`
     3) `web-design/SKILL.md`
   - **User minta coding / build website:**
     WAJIB `view_file` ke:
     1) `web-builder/SKILL.md`
     2) `web-design/SKILL.md`
     3) `web-animation/SKILL.md`
     4) `web-optimization/SKILL.md`
   - **User minta cek detail / self-debugging / audit UI-UX pake vision:**
     WAJIB `view_file` ke:
     1) `web-debugging/SKILL.md`
     2) `web-design/references/14-pass-critique-rubric.md` (58 Gate `sloplint` + 14-Pass Rubric)
     3) `chrome-browser-control/SKILL.md`
   - **User kirim gambar + `@visual-breakdown` / `@image-gen` / `@prompt-generator`:**
     WAJIB `view_file` ke:
     1) `visual-breakdown/SKILL.md`
     2) `prompt-generator/SKILL.md`
     3) `image-gen/SKILL.md`
3. **WAJIB CETAK BUKTI BACA (`🔧 [Skills Auto-Loaded]`) DI BARIS PERTAMA CHAT:**
   Di baris paling atas setiap balasanmu ke user, kamu **WAJIB** mencantumkan file `SKILL.md` dan `references/*.md` apa saja yang baru saja kamu baca lewat `view_file` pada turn tersebut:
   `🔧 [Skills Auto-Loaded: opus-distills -> web-design/SKILL.md, taste-design/SKILL.md, references/14-pass-critique-rubric.md, references/cat-08-luxury-automotive-hardware.md]`
   *(Dilarang keras menulis bukti baca palsu jika belum benar-benar memanggil `view_file` pada file tersebut!)*

## 2. HUKUM BESI #2: PROTOKOL 4 TAHAP PEMBUATAN WEB (DILARANG LONCAT BIKIN `index.html` MENTAH SAAT DIMINTA PLANNING!)
1. **Tahap 1 — Visual Style Showcase (`design-style-preview.html`):**
   - Saat user minta melihat contoh desain/style web, **HARAM** hanya membuat 3 tema warna generik (*Dark Steel / Swiss Clean / Pitch Black* polos tanpa foto)!
   - Setelah membaca `web-design/SKILL.md`, `taste-design/SKILL.md`, `14-pass-critique-rubric.md` (`Nutlope/hallmark`), dan 1 file `cat-XX-*.md`, racik **5–10 Design Style Berkelas** (gabungan Material Theme Hallmark seperti *Nordic Precision, Blueprint CAD, Formwork Cast, Werkstatt, Atelier, Cobalt, Studio* + Corporate Bento Grid) lengkap dengan **foto industri nyata di bagian awal**, tipografi karakter (*upright roman*, 0 judul *italic*), dan switcher interaktif.
2. **Tahap 2 — User Flow, 12-File `readme-ai-agent/AGENTS.md` & Tech Stack Planning (`web-planning`):**
   - Saat user memilih salah satu style (misal *"nordic nice bro, next steps alur web page user flow md trus planning step by step"*), **DILARANG KERAS langsung loncat men-generate website ke dalam `index.html` vanilla mentah!**
   - Kamu wajib membaca `web-planning/SKILL.md` dan mengerjakan 4 hal ini secara berurutan:
     1) Cek & buat `./AGENTS.md` + 12 file di `./readme-ai-agent/` (berpusat di `readme-ai-agent/AGENTS.md`, **tanpa `CLAUDE.md`**).
     2) Buat dokumen `USER_FLOW_AND_PAGE_ARCHITECTURE.md` (lengkap dengan diagram Mermaid visual alur konversi & anatomi tiap seksi).
     3) Tampilkan **Rekomendasi #1 Co-Founder (Next.js 15 App Router Static Export `output: 'export'` atau Fullstack Hybrid `force-static`)** beserta tabel perbandingan 4 opsi stack dan tahapan milestone pengerjaan step-by-step.
     4) **Tunggu konfirmasi user** (*"Blueprint & User Flow Next.js 15 udah siap Bro, langsung kita gas scaffold Next.js 15-nya sekarang?"*) sebelum menulis kode produksi!
3. **Tahap 3 — Production Next.js Build & Cold-Hero-First (`web-builder` + `web-design`):**
   - Bangun di atas stack yang sudah dikonfirmasi (misal Next.js 15 App Router + TypeScript + Tailwind + Lucide).
   - Terapkan **Cold-Hero-First** (pastikan Hero muat di lipatan `1280x800`, `padding-block-end >= 1.3x padding-block-start`, tidak menumpuk semua elemen rata tengah), tulis stamp `/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 ... */` di baris 1 CSS, pasang `html, body { overflow-x: clip }`, `minmax(0, 1fr)` pada grid gambar, 0 judul *italic*, 0 bingkai browser palsu, dan 0 bocoran tech stack di Footer.
4. **Tahap 4 — Forensic Self-Debugging, 58-Gate `sloplint` & 7-Viewport Vision QA (`web-debugging`):**
   - Saat mengaudit UI/UX, jangan cuma cek `hasOverflow: false`! Jalankan **58 Gate `Nutlope/hallmark` `sloplint`** (kontras OKLCH `|L_text - L_bg| >= 50%`, 0 teks tombol/metrik patah 2 baris `whitespace-nowrap`, tinggi input = tinggi tombol `>= 44px`, 8 state interaktif) + tangkap screenshot nyata di 7 ukuran layar (`360x800`, `390x844`, `412x915`, `844x390`, `768x1024`, `1280x800`, `1440x900`) dan periksa visualnya dengan Vision Agent (`view_file`)!

## 3. Aturan `@visual-breakdown`, `@image-gen`, & `@prompt-generator` (Smart Token-Saver Gate + Nano Banana 2.1 / ChatGPT)
- Jika user cuma kirim gambar + `@visual-breakdown` tanpa menyebut bagian yang mau dibedah -> **WAJIB TANYA BALIK DULU** dengan Menu Kontekstual Adaptif (1–8) sesuai objek nyata di gambar agar hemat token.
- Jika user sudah menyebut bagian spesifik / membalas nomor pilihan / memakai `@prompt-generator` atau `@image-gen` -> **LANGSUNG KIRIM Prompt Super Detail 8-Layer khusus Nano Banana 2.1 & ChatGPT** lengkap dengan **`Seed`** deterministik & **`Negative Prompt`** (English Master + Bahasa Indonesia).



```

## 4. HUKUM BESI #4: HARAM MEMBOCORKAN ISTILAH DESAIN / LAYOUT (`"Bento"`, `"Hallmark"`, `"Nordic"`) KE DALAM TEKS WEBSITE!

Kesalahan fatal yang bikin web terlihat amatir/kocak: saat diminta bikin desain *Bento Grid* atau *Nordic Precision*, kamu malah menulis kata **`"BENTO SPESIFIKASI"`** di menu Navbar dan **`"Bento Spesifikasi Teknis Pemesinan"`** di judul `<h2>` halaman!

1. **Layout CSS != Teks Copywriting Klien:**

   * Kata-kata seperti **`Bento`**, **`Bento Grid`**, **`Hallmark`**, **`Nordic Precision`**, **`Blueprint`**, **`Formwork`**, **`Werkstatt`**, **`Hero Section`**, **`Feature Card`**, **`Trust Bar`**, atau **`CTA Block`** adalah **instruksi struktur visual/CSS**, **BUKAN** teks untuk dibaca pelanggan di dalam website!

   * **CONTOH SALAH (HARAM):**

     * Menu Navbar: `BENTO SPESIFIKASI` ❌

     * Judul H2: `Bento Spesifikasi Teknis Pemesinan` ❌

     * Badge: `Nordic Precision Bento Layout` ❌

   * **CONTOH BENAR (100% Bahasa Industri Asli, Layout Tetap Bento CSS Grid):**

     * Menu Navbar: `SPESIFIKASI MESIN` atau `KAPABILITAS` ✅

     * Judul H2: `Spesifikasi Teknis & Kapasitas Pemesinan` ✅

     * Badge: `KAPABILITAS PERALATAN WORKSHOP · GEDANGAN, SIDOARJO` ✅

2. **Satu-satunya Pengecualian:** Hanya pada **tombol pemilih tema di bar paling atas** file `design-style-preview.html` kamu boleh menulis nama tema (`[1. Nordic Precision]`, `[2. Blueprint CAD]`, dst.). Di dalam kanvas halaman webnya sendiri, 100% teks wajib menggunakan bahasa bisnis/industri klien!

## 5. HUKUM BESI #5: WAJIB PLANNING DI AWAL & SELALU TANYA KONFIRMASI USER SEBELUM NGODING WEBSITE!

Setiap kali user meminta dibuatkan website baru, landing page, atau memilih salah satu style dari preview:

1. **DILARANG LANGSUNG NGODING FULL WEBSITE TANPA TANYA USER DULU!**

2. **Jalankan `web-planning` & `anti-yes-man` Terlebih Dahulu:**

   * Susun **Rencana Arsitektur & User Flow (`USER_FLOW_AND_PAGE_ARCHITECTURE.md`)** lengkap dengan diagram Mermaid alur psikologi konversi pengunjung.

   * Rincikan struktur section & copywriting judul asli (tanpa embel-embel kata *"Bento"*).

   * Berikan **Rekomendasi #1 Tech Stack Co-Founder** (misal: **Next.js 15 App Router Static Export `output: 'export'`**) beserta tabel perbandingan opsi stack.

   * **WAJIB TANYA KE USER DI AKHIR PESAN:** Tanyakan apakah user setuju dengan alur halaman, daftar section, tech stack, dan apakah ada data bisnis yang mau ditambahkan sebelum kamu mengeksekusi `web-builder`!


## 6. HUKUM BESI #6: WAJIB BUKA JENDELA CHROME TAMPIL DI LAYAR (NON-HEADLESS) + TAMPILKAN KURSOR AI, KOTAK HIGHLIGHT, EFEK KLIK, & HUD AKTIVITAS LIVE (`chrome-browser-control`)!

Saat kamu membuka preview desain (`design-style-preview.html`), mengetes web (`localhost:3000`), melakukan debugging UI/UX, deep research, atau menjalankan otomasi browser:
1. **HARAM MENJALANKAN CHROME SECARA SEMBUNYI-SEMBUNYI (`--headless=new` DILARANG DI DESKTOP USER!):**
   - Kamu **WAJIB** membuka jendela Google Chrome GUI yang tampil langsung di monitor user tanpa flag `--headless`, plus panggil CDP `Page.bringToFront` menggunakan launcher sesuai host OS:
     * **Linux (X11 / Wayland):**
       ```bash
       bash ~/.agents/tools/linux/launch-visible-chrome.sh 9223 "http://localhost:3000"
       # Dokumentasi detail: ~/.agents/tools/README_LINUX.md
       ```
     * **Windows (PowerShell / CMD):**
       ```powershell
       # PowerShell:
       powershell -ExecutionPolicy Bypass -File ~/.agents/tools/windows/launch-visible-chrome.ps1 -Port 9223 -Url "http://localhost:3000"
       # Atau CMD Batch:
       ~/.agents/tools/windows/launch-visible-chrome.bat 9223 "http://localhost:3000"
       # Dokumentasi detail: ~/.agents/tools/README_WINDOWS.md
       ```
     * **macOS (Terminal / Double-Click):**
       ```bash
       bash ~/.agents/tools/macos/launch-visible-chrome.sh 9223 "http://localhost:3000"
       # Atau double-click: ~/.agents/tools/macos/launch-visible-chrome.command
       # Dokumentasi detail: ~/.agents/tools/README_MACOS.md
       ```
     * **Universal Auto-Detect Launcher:**
       ```bash
       bash ~/.agents/tools/launch-visible-chrome.sh 9223 "http://localhost:3000"
       ```
2. **WAJIB TAMPILKAN KURSOR AI, ANIMASI GERAKAN MOUSE, EFEK RIPPLE KLIK, KOTAK HIGHLIGHT ELEMEN, & STATUS HUD LIVE (`ai-cursor-hud.js` + `cdp_visual_agent.py`):**
   - Karena klik bawaan CDP tidak menggerakkan kursor OS, kamu **WAJIB** menginjeksi `~/.agents/tools/ai-cursor-hud.js` lewat `Page.addScriptToEvaluateOnNewDocument` & `Runtime.evaluate`, serta menjalankan aksi klik/ketik/scroll lewat `~/.agents/tools/cdp_visual_agent.py` atau `window.__aiCursor`:
     ```bash
     # Buka URL & pasang Live AI Cursor HUD:
     python3 ~/.agents/tools/cdp_visual_agent.py open "http://localhost:3000"

     # Gerakkan kursor AI meluncur halus ke tombol, nyalakan kotak highlight kuning-emas, munculkan efek gelombang klik (ripple), lalu klik:
     python3 ~/.agents/tools/cdp_visual_agent.py click "button[type='submit']" "Klik Tombol Hitung Estimasi RFQ"

     # Fokus ke input & ketik teks secara visual di depan mata user:
     python3 ~/.agents/tools/cdp_visual_agent.py type "input[name='panjang']" "6000" "Isi Panjang Benda Kerja 6000 mm"

     # Scroll halaman sambil mengupdate teks aktivitas AI di pojok kanan bawah:
     python3 ~/.agents/tools/cdp_visual_agent.py scroll 600 "Scroll ke Bagian Spesifikasi Mesin"

     # Bersihkan overlay ketika selesai:
     python3 ~/.agents/tools/cdp_visual_agent.py done
     ```
3. **Pola Deep Research & Agentic Loop (Structured JSON Output):**
   - Untuk scraping dan multi-turn agentic loops, gunakan parameter `--json` dan `--no-switch`:
     ```bash
     # Dapatkan seluruh tab terbuka:
     python3 ~/.agents/tools/cdp_visual_agent.py tabs --json

     # Ambil snapshot accessibility tree dalam <30ms:
     python3 ~/.agents/tools/cdp_visual_agent.py snapshot --json --no-switch

     # Ekstrak data tabel & grid analitik:
     python3 ~/.agents/tools/cdp_visual_agent.py table --json --no-switch

     # Ekstrak dossier riset lengkap (Metadata, Headings, Markdown, Links, JSON-LD):
     python3 ~/.agents/tools/cdp_visual_agent.py research --json --no-switch

     # Ekstrak link SERP / halaman web:
     python3 ~/.agents/tools/cdp_visual_agent.py links "harga" --json --no-switch

     # Evaluasi state JavaScript langsung:
     python3 ~/.agents/tools/cdp_visual_agent.py eval "document.title" --json
     ```
4. **Cara Testing & Verifikasi Cepat:**
   ```bash
   # 1. Pastikan CDP port merespons:
   curl -s http://127.0.0.1:9223/json/version

   # 2. Pastikan tabs dapat dibaca:
   python3 ~/.agents/tools/cdp_visual_agent.py tabs --json
   ```
5. **Cara Fix Jika Mengalami Error:**
   - **Error `Connection refused on port 9223`:** Matikan proses Chrome lama yang menggantung:
     * Linux/macOS: `pkill -f "remote-debugging-port=9223" || true`
     * Windows: `taskkill /F /IM chrome.exe /FI "WINDOWTITLE eq *cdp*" 2>nul`
     Lalu jalankan kembali launcher OS yang sesuai.
   - **Error `ModuleNotFoundError: No module named 'websockets'`:**
     * Jalankan: `pip install websockets` (atau `python3 -m pip install websockets`).
   - **Error Windows PowerShell `running scripts is disabled`:**
     * Jalankan: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force`.
   - **Error macOS `unidentified developer / quarantine`:**
     * Jalankan: `xattr -d com.apple.quarantine ~/.agents/tools/macos/*`.

## 7. HUKUM BESI #7: PROTOKOL SLIDE DECK (`@slidedeck-gen`) — WAJIB BRIEFING MENU JIKA MINIM DETAIL + AUTO-OPEN CHROME CDP LIVE DEV EDITOR!

Setiap kali user meminta dibuatkan slide presentation, pitch deck, atau laporan presentasi PDF:
1. **Interactive Briefing & Clarification Gate (Anti-Guessing):**
   - Jika request user minim detail (belum menentukan tema dari 12 themes, jumlah slide, ada/tidaknya contoh referensi PDF/gambar/URL, target audiens, dan format akhir PDF/PPTX/Web), **AGENT DILARANG KERAS MENEBAK!**
   - Agen **WAJIB** langsung menyajikan **Menu Briefing Interaktif 5 Poin** (Pilihan Theme, Referensi Desain/Aset Brand, Jumlah Slide & Pacing, Target Audiens & Tujuan Utama, Format Deliverable Akhir) dan menunggu respon user.
2. **Auto-Open Chrome CDP Live Dev Editor Saat Mulai Bekerja:**
   - Begitu user mengonfirmasi atau saat mulai mengerjakan slide deck, jalankan background dev server:
     `slidedeck-gen dev <dir> --theme <theme>`
   - Browser Google Chrome GUI **langsung terbuka di layar monitor** via CDP port 9223 menampilkan engine editor slide deck dengan badge Live AI Cursor HUD: `"Building Slide Deck Live..."`.
   - Setiap kali agen menulis atau menambahkan slide ke dalam file `deck.md` / `goal.json`, server dev otomatis mengompilasi ulang dalam `< 25ms` dan melakukan hot-reload instan via SSE.
   - User dapat melihat secara langsung slide deck bertambah dan ter-render rapi detik demi detik di monitornya.
3. **Session Handover ke In-Browser Live Editor:**
   - Ketika seluruh slide selesai dibuat, jalankan:
     `slidedeck-gen done`
   - HUD AI akan beralih ke `"✅ Slide Deck Ready — In-Browser Live Editor Active"` lalu memudar, membiarkan jendela Chrome tetap terbuka.
   - User dapat langsung mengklik teks apa saja (judul, paragraf, kartu metrik, list) langsung di layar Chrome untuk melakukan live in-place editing yang otomatis tersimpan ke file `index.html` (auto-save persistence).
   - Ekspor final dilakukan dengan `slidedeck-gen export-pdf` dan `slidedeck-gen export-pptx`.

## 8. Deep Retraining `Nutlope/hallmark` v2.8.0 (Direct Repo Read + 48 Themes + 21 Macrostructures + 58 Gates)

Seluruh skill desain (`web-design`, `taste-design`, dan `opus-distills`) telah di-retrain penuh menggunakan arsitektur terbaru **`https://github.com/Nutlope/hallmark` (v2.8.0)**:

1. **Direct Repo & Reference Read Gate**:

   * Skrip `install-default-opus.sh` di dalam paket ZIP otomatis melakukan `git clone https://github.com/Nutlope/hallmark.git` ke dalam `~/.gemini/antigravity-cli/skills/hallmark/` dan `~/.gemini/antigravity/skills/hallmark/`.

   * Saat merancang UI atau membuat preview pilihan desain (`design-style-preview.html`), agen **wajib membaca langsung** file referensi Hallmark (`references/themes/<slug>.md`, `references/craft.md`, `references/layout.md`, `references/direction.md`, `references/gates.md`) serta `web-design/references/14-pass-critique-rubric.md` (Part 2 & Part 3).

2. **4 Invarian Wajib di Setiap Halaman (`Gate F15` & `Gate 82–83`)**:

   * **Signature (`Gate 82`)**: Wajib ada 1 elemen visual ikonik yang mengikat memori pengunjung (misal: *CAD 45° dimension strings*, *crosshair telemetry `+`*, *corrugated cast shadow 6px*, atau *Nordic warm sand editorial ledger*) dan muncul kembali sebagai motif di minimal 1 section bawah.

   * **Picture Deletion Test (`Gate 83`)**: Jika seluruh teks dihapus, layout & materialitas halaman harus tetap langsung dikenali sebagai milik industri/brand tersebut (bukan template SaaS generik).

   * **Competitor Name Swap Test**: Jika nama brand diganti dengan nama kompetitor dan masih terasa cocok, berarti copy & komponen terlalu generik (wajib gunakan metrik teknis riil seperti *meja bubut 6 meter*, *toleransi ±0.005mm Mitutoyo*, *baja VCN/SS316*).

   * **Mirror Test**: Minimal 2 keputusan komposisi yang menonjol namun 100% tepat guna bagi industri klien.

3. **SaaS / B2B Section Deck (`"Every deal deviates twice"`)**:

   * Dilarang memakai urutan blok klasik monoton (`Hero -> 3 Feature Cards -> Testimonial -> Pricing -> CTA`).

   * Wajib melakukan minimal **2 deviasi struktural** per halaman: menggabungkan 2 section jadi 1 artefak interaktif (misal: *Interactive Spec Ledger + Live WhatsApp RFQ Calculator*), memotong section tengah jadi pita horizontal 1 baris (*single-line trust band*), atau menukar urutan bukti teknis ke atas sebelum klaim pemasaran.

4. **15 Resep Materialitas Fisik & Bento Corporate Siap Pakai**:

   * Tersedia spesifikasi warna (Hex/OKLCH), tipografi, border, dan signature motif lengkap di `14-pass-critique-rubric.md` untuk: **Blueprint Bento**, **Formwork Cast**, **Werkstatt Ledger**, **Cobalt Telemetry**, **Nordic Precision**, **Executive Swiss**, **Titanium Bento**, **Black Foundry**, **Editorial Broadsheet**, **Cyber Factory**, **Studio**, **Atelier**, **Furrow**, **Kiln**, dan **Terminal**.