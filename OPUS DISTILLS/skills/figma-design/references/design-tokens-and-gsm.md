# 🎨 DESIGN TOKENS, GSM v2.5 & SPATIAL GUARDRAILS

Standar token visual, palet warna, tipografi, dan safe-zone kanvas untuk seluruh aset desain Figma di ekosistem Djadi Creative dan brand klien.

---

## 🎨 1. PALET WARNA RESMI (GSM v2.5)

| Nama Token | Hex Code | RGB (Figma 0..1) | Peran & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Warm Cream** | `#F6DEBB` / `#F6F4EC` | `{ r: 0.965, g: 0.957, b: 0.925 }` | Kanvas latar belakang utama (60%), kartu bacaan kontras lembut, anti-silau. |
| **Deep Navy** | `#012969` | `{ r: 0.004, g: 0.161, b: 0.412 }` | Fondasi struktur arsitektural (30%), tipografi judul, hard drop shadow solid. |
| **Oren Vermillion** | `#FF3E1D` | `{ r: 1.0, g: 0.243, b: 0.114 }` | Hero Action Accent (10%), tombol CTA, fatal hook 3 detik, monogram ikon 'D'. |
| **Kuning Gold** | `#F59E0B` / `#FFD60A` | `{ r: 1.0, g: 0.839, b: 0.039 }` | Highlighter angka cuan, pita ribbon section divider, badge best value. |
| **Crimson Red** | `#B3001B` | `{ r: 0.702, g: 0.0, b: 0.106 }` | Zona friksi/masalah kompetitor, badge urgensi, shadow kartu navy gelap. |
| **Pitch Dark** | `#0F172A` | `{ r: 0.059, g: 0.090, b: 0.165 }` | Tipografi teknis, kartu terminal dark mode, grid garis arsitektural. |
| **Pure White** | `#FFFFFF` | `{ r: 1.0, g: 1.0, b: 1.0 }` | Kartu kontras tinggi di atas latar krem, kontainer teks isi. |

---

## 📐 2. SPESIFIKASI KANVAS 3:4 FEED & SAFE-ZONE

- **Dimensi Kanvas:** **1080 px (Lebar) x 1440 px (Tinggi)** — Rasio 3:4 Potret Vertikal.
- **Tujuan Rasio 3:4:** Menguasai lebih banyak area layar smartphone audiens dibandingkan feed kotak 1:1 tradisional (+33% screen real-estate).
- **Core Safe-Zone Wajib:**
  * Area Tengah **1080 x 1080 px** (dari `Y: 180 px` sampai `Y: 1260 px`).
  * Seluruh judul utama, logo, teks penjelas inti, dan kartu penawaran WAJIB berada di area tengah ini agar tidak terpotong saat tampil di profil Instagram grid 1:1.
- **Header Top Zone (`Y: 0 .. 180`):** Logo brand, nomor kategori, status live pill.
- **Footer Bottom Zone (`Y: 1260 .. 1440`):** Tagline agensi, dock WhatsApp dengan nomor resmi `0851-9659-8881`.

---

## 🔤 3. HIERARKI TIPOGRAFI DUA-FONT

1. **Display & Headline Font:** `Plus Jakarta Sans`
   - Judul Utama Kanvas: `36px – 38px` (ExtraBold)
   - Judul Kartu / Section: `17px – 20px` (ExtraBold)
   - Body Copy: `11.5px – 13px` (Medium / Bold)
2. **Technical Telemetry & Numbers Font:** `Space Mono`
   - Kategori Pills / Badges: `9px – 10px` (Bold)
   - Angka Harga / Metrik Cuan: `24px – 28px` (Bold)
   - Label Footer & WA Number: `14px – 15px` (Bold)

---

## ⛔ 4. STRICT GUARDRAILS (ATURAN MUTLAK)

1. **BANNED KATA "BRUTALIST":**
   - Dilarang keras memakai kata *"brutalist"*, *"neo-brutalist"*, atau *"swiss brutalist"* di kanvas atau teks penawaran.
   - Ganti dengan: **"Desain Modern Tegas"** atau **"Minimalis Berkelas"**.
2. **0 JUDUL ITALIC (UPRIGHT ROMAN ONLY):**
   - Seluruh judul, subjudul, dan teks display WAJIB berformat tegak (*upright roman*). Dilarang menyisipkan kata miring (*italic*) pada headline display.
3. **ZERO EMOJIS / EMOTICONS:**
   - Dilarang menaruh emoji kartun warna-warni di kanvas Figma profesional.
   - Gunakan tanda centang geometris (`✓`), tanda silang (`✕`), dot lingkaran solid, atau ikon SVG teknis.
4. **ANTI-LEAK JARGON INTERNAL:**
   - Dilarang menuliskan kata *"Bento"*, *"GSM v2.5"*, *"Hero Section"*, atau *"Feature Card"* ke dalam copywriting yang dibaca calon klien. Gunakan bahasa bisnis riil klien (*"Spesifikasi Layanan"*, *"Kapabilitas Mesin"*).
