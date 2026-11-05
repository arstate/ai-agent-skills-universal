# 🏛️ CORE FIGMA REPOSITORIES, LIBRARIES & DESIGN AGENT FRAMEWORKS

Panduan komprehensif 6 repositori inti industri, library arsitektur, dan standar agentic workflow untuk merancang, mengaudit, dan mengotomasi kanvas Figma.

---

## 1. `figma/mcp-server-guide` (Foundational Core Schemas & MCP Handoff)

Repositori resmi panduan Model Context Protocol (MCP) dari Figma yang mendefinisikan skema inti untuk menjembatani LLM langsung ke Figma Plugin API dan Figma REST API.

### A. Core MCP Parameters & Capabilities
- **High-Fidelity Handoff Protocol:** Menyediakan parameter terstruktur untuk mengekstrak geometri layer (`absoluteBoundingBox`), model hierarki Auto Layout (`layoutMode`, `primaryAxisSizingMode`, `counterAxisSizingMode`), gaya visual (`fills`, `strokes`, `effects`), dan metadata komponen (`componentId`, `variantProperties`).
- **Standardized AST Traversal:** Menghindari eksekusi brute-force dengan menyediakan skema filter terkurasi:
  * `get_file_nodes`: Mengambil subset node berdasarkan node ID tanpa membebani context window dengan seluruh canvas.
  * `get_node`: Mengambil detail spesifik satu node lengkap dengan properti computed styling.
  * `execute`: Menjalankan skrip Plugin API secara transaksional di dalam runtime Figma desktop.
- **Image & Asset Extraction:** Mendukung ekstraksi representasi raster (`node.exportAsync({ format: "PNG" })`) dan vektor murni (`node.exportAsync({ format: "SVG" })`) untuk validasi visual closed-loop.

---

## 2. `warpdotdev/figma-skills` (Structural Execution & Incremental Edit Workflows)

Dikembangkan oleh tim Warp terminal untuk memfasilitasi workflow "Edit Figma Design" berbasis teks pemicu (*text triggers*) dan eksekusi bertahap (*incremental mutations*).

### A. 4-Phase Transaction Workflow ("Edit Figma Design")
```text
Phase 1: Dynamic Read  ──>  Phase 2: Plan Edit  ──>  Phase 3: Batch Execute  ──>  Phase 4: Visual Diff QA
(Query Canvas AST)          (Isolate Mutations)     (Idempotent Plugin API)      (PNG Export & Vision Audit)
```

1. **Dynamic Read (Query Canvas State):**
   - Agen membaca seleksi pengguna aktif (`figma.currentPage.selection`) atau mencari node sasaran menggunakan predikat nama/tipe (`figma.currentPage.findOne(n => n.name.includes("Hero"))`).
   - Jangan pernah mengedit kanvas secara membabi-buta tanpa memvalidasi node ID dan layout mode induk terlebih dahulu.
2. **Plan Incremental Edits:**
   - Pisahkan perubahan menjadi mutasi terkecil: perubahan teks, penyesuaian padding/gap Auto Layout, atau penggantian warna fill.
   - Hindari membuat ulang seluruh frame jika hanya perlu memodifikasi 1 badge atau tombol.
3. **Batch Execute via Text/Code Triggers:**
   - Bungkus seluruh mutasi dalam 1 panggilan transaksional (`callPlugin("execute", { code })`) untuk mencegah UI flicker di monitor pengguna.
   - Terapkan *idempotency*: jika script dijalankan ulang, hasilnya harus identik dan tidak menduplikasi layer.
4. **Visual Diff Audit:**
   - Ekspor snapshot frame yang diperbarui dan bandingkan secara visual dengan state sebelumnya untuk mendeteksi layout breaking.

---

## 3. `nexu-io/open-design` (Engineering Transition & Design System Rules)

Framework jembatan engineering dari Nexu.io yang memuat standar eksplisit untuk transisi 1:1 dari kanvas desain ke kode frontend produksi.

### A. "Figma Implement Design Skill" (1:1 Layout Fidelity)
- **Constraint Translation:** Setiap frame Auto Layout dipetakan langsung ke Flexbox/CSS Grid tanpa hardcoded pixel coordinates (`x`, `y` absolut dihilangkan untuk komponen konten).
- **Subpixel Precision:** Mengunci koordinat dan dimensi pada angka bulat (*whole integers*). Dilarang menyisakan nilai desimal (misal `width: 240.33px`) yang memicu rendering blur pada layar non-Retina.

### B. "Figma Create Design System Rules"
- **Strict 4px/8px Spatial Grid:**
  * Jarak dan padding hanya boleh bernilai kelipatan: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`.
  * Nilai ganjil atau acak (`7px`, `11px`, `19px`) wajib ditolak dan diarahkan ke token terdekat.
- **Variable Binding Protocol:**
  * Setiap warna fill, stroke, dan radius wajib diikat ke *Figma Variables* (`node.setBoundVariable('fills', variable)`), bukan hex mentah lepas.

---

## 4. `mengto/skills` (Agent Skills for Designers & Builders)

Koleksi kurasi standar dari Meng To (Design+Code) yang dioptimasi khusus untuk workflow AI Agent (Claude, Cursor, Codex, Antigravity) dalam membangun antarmuka web dan mobile multi-screen.

### A. Multi-Screen Component Architecture
- Setiap komponen utama wajib memiliki varian responsif:
  * **Desktop:** Lebar kanvas `1440px` (atau artboard poster 1080x1440).
  * **Tablet:** Lebar `768px` (2 kolom bento grid).
  * **Mobile:** Lebar `390px` (1 kolom vertikal stack, tombol full-width `self-stretch`).
- **Component Sets & Nested Variants:**
  * Menggunakan nama properti standar: `State` (`Default`, `Hover`, `Pressed`, `Disabled`), `Size` (`SM`, `MD`, `LG`), dan `Theme` (`Light`, `Dark`).

---

## 5. `jakubkrehel/skills` (Interface System & Accessibility Guidelines)

Sistem antarmuka berfokus mikro-detail dari Jakub Krehel yang memetakan aturan tipografi modular, parameter aksesibilitas WCAG, dan copywriting antarmuka (*microcopy*).

### A. Modular Typography Scales & Line Heights
- **Scale Ratio:** Menggunakan skala modular `1.25` (Major Third) atau `1.333` (Perfect Fourth).
- **Optical Line-Height Calibration:**
  * Display & Headline (`>= 32px`): Line-height ketat `1.1x s/d 1.2x` (`110%–120%`) agar judul tampil padat, berwibawa, dan tidak renggang.
  * Body Copy (`12px – 16px`): Line-height lega `1.4x s/d 1.6x` (`140%–160%`) untuk keterbacaan optimal.

### B. Accessibility & Contrast Gates (WCAG AA/AAA)
- **Contrast Ratios:**
  * Teks normal (< 18px): Wajib rasio kontras minimal **`4.5:1`** terhadap latar belakang.
  * Teks besar (>= 18px bold atau >= 24px regular): Minimal **`3.0:1`**.
  * Elemen grafis interaktif & border input: Minimal **`3.0:1`**.
- **Minimum Touch Targets:**
  * Seluruh tombol, pill, dan ikon interaktif wajib memiliki area sentuh minimal **`44 x 44 px`** (atau `min-h-[44px]` pada mobile).
- **Focus Rings:**
  * State fokus interaktif wajib menyertakan cincin kontras `2px solid` dengan offset `2px`.

### C. Unambiguous Microcopy Writing
- **Verb-First Action Labels:** Gunakan verba aksi langsung pada tombol (*"Hitung Estimasi KPR"*, *"Jadwalkan Survei"*, *"Unduh Brosur PDF"*). Dilarang tombol ambigu satu kata seperti *"Kirim"* atau *"Klik Disini"*.
- **Terse & Actionable:** Hindari kalimat pembuka basa-basi di kartu formulir. Langsung sebut instruksi dan benefit.

---

## 6. `benjitaylor/skills` (Product UI Craft & Micro-Interactions)

Pedoman dari Head of Design di X (Benji Taylor) untuk memprogram AI agent dalam merancang antarmuka produk modern yang taktil, berkarakter, dan presisi tinggi.

### A. Tactile Feedback & Multi-State Transitions
Setiap komponen interaktif wajib didefinisikan ke dalam 8 status keadaan (*interactive states*):
1. **Default:** Warna dasar stabil, border kontras bersih.
2. **Hover:** Peningkatan pencahayaan fill `+5%` atau kemunculan inset highlight.
3. **Active / Pressed:** Penurunan posisi `translateY(+1px)` atau kompresi shadow fisik (`6px -> 2px`) untuk simulasi tombol mekanis nyata.
4. **Focused:** Cincin fokus kontras tinggi untuk navigasi keyboard.
5. **Disabled:** Opasitas `40%`, `cursor: not-allowed`, netralisasi warna aksen.
6. **Loading:** Spinner mikro terkalibrasi dengan teks transisi (*"Memproses..."*).
7. **Success:** Aksen hijau sinyal dengan ikon ceklis konfirmasi.
8. **Error:** Aksen merah krisan dengan pesan pemulihan kesalahan yang jelas.

### B. Micro-Details: Borders, Highlights & Solid Dimensional Shadows
- **Hairline 1px Borders:** Gunakan border fisik `1px solid` dengan warna kontras terkalibrasi untuk memisahkan bidang tanpa mengaburkan teks.
- **Physical Solid Dimensional Drop Shadows:**
  * Dilarang menggunakan bayangan blur kabur generik (*fuzzy shadows*) yang membuat desain tampak melayang tanpa bobot.
  * Gunakan **Hard Solid Cast Shadow** berjarak `+6px s/d +10px` dengan sudut tegas `45°` (atau balok fisik persegi panjang solid di layer belakang) untuk memberikan kesan taktil arsitektural yang kuat.
- **Upright Roman Display Typography:** Seluruh display text, judul section, dan angka metrik wajib berformat tegak (*upright roman*), tegas, dan berwibawa (0 kata miring / 0 italic headers).
