---
name: svg-gen
description: Master 2D Flat Vector & Commercial Icon Set Engineering Skill for Adobe Stock, Shutterstock & Freepik Contributor Portfolios. Enforces 15+ MP artboards, 100% closed compound paths (Z), zero live strokes, zero alpha/raster filters (cairo_image = 0), and automated Sensei SEO metadata embedding.
---

# /svg-gen — Master 2D Flat Vector & Commercial Icon Engineering Skill

Skill spesialis rekayasa grafis vektor 2D murni berstandar industri komersial global (**Adobe Stock**, **Shutterstock**, dan **Freepik**). Menjamin tingkat kelolosan 100% dari kurasi AI Inspector maupun kurator manusia dengan menegakkan **The 10 Iron Laws of Vector Construction**, resolusi minimum $\ge 15.0\text{ Megapixels}$, 100% kurva tertutup (*closed compound paths*), 0 live strokes mentah, dan injeksi metadata otomatis Dublin Core RDF & XMP.

---

## 📚 Bundled Reference Manuals (Akses via `view_file`)

Skill ini dilengkapi 4 manual referensi teknis mendalam di folder `references/`:
1. `references/10-iron-laws-and-quality-gates.md` — Rincian 10 Hukum Besi, kode penolakan microstock (#1 s/d #8), dan protokol pencegahan auto-reject.
2. `references/vector-math-and-compound-paths.md` — Rumus matematika konstruksi path, koordinat kanvas 16 MP, compound path (`fill-rule="evenodd"`), dan pita poligon tanpa stroke.
3. `references/metadata-and-seo-guide.md` — Algoritma pencarian Adobe Sensei, aturan 10 kata kunci pertama (bobot 80%), batas title $\le 70$ karakter, batas filename $\le 30$ karakter, dan daftar ID Kategori 1–21.
4. `references/commercial-niches-and-prompts.md` — 7 Ceruk B2B terlaris (Fintech, Cyber, Cloud, Telehealth, Logistics, Green Energy, Infographics) dan bank prompt konsep `/gen-img`.

---

## 🛑 1. The 10 Iron Laws of Vector Construction

Setiap file vektor produksi yang dihasilkan oleh `/svg-gen` wajib mematuhi 10 hukum mutlak berikut:

1. **100% 2D Flat Vector Murni (Zero 3D):**
   - Dilarang membuat ekstrusi 3D tebal, bevel/emboss metalik, bayangan blur sintetis, atau gradient mesh rumit.
   - Gunakan bidang warna solid murni (*flat fills*), bayangan datar (*solid flat cast shadows*), atau proyeksi aksonometrik 30° (*true isometric*).
2. **Kanvas Wajib $\ge 15.0\text{ Megapixels}$:**
   - **Square (1:1)** untuk Icon Sheets, Single Hero Icons, Badges:
     `width="4000" height="4000" viewBox="0 0 4000 4000"` (**16.0 MP**) atau `5000 x 5000` (**25.0 MP**).
   - **Landscape (5:3 / 16:9)** untuk Infographics, Flowcharts, B2B Diagrams:
     `width="5000" height="3000" viewBox="0 0 5000 3000"` (**15.0 MP**) atau `6000 x 3375` (**20.25 MP**).
3. **100% Closed Compound Paths (`Z`) & Zero Live Strokes:**
   - Semua elemen bentuk wajib berupa kurva tertutup berakhiran `Z` (`<path d="... Z" />`).
   - Dilarang meninggalkan atribut `stroke="..." stroke-width="..."` hidup, `<line>`, atau `<polyline>`.
   - Bentuk berlubang atau memiliki celah wajib menggunakan compound path (`fill-rule="evenodd"`).
4. **Zero Alpha Opacity & Zero Filter Raster (`cairo_image = 0`):**
   - Dilarang keras memakai `opacity`, `fill-opacity`, `stroke-opacity`, `stop-opacity`, `<filter>`, `<feGaussianBlur>`, `<feDropShadow>`, atau `<image>`.
   - Efek transparansi memicu ekspor EPS merender bitmap raster beresolusi rendah (`cairo_image`).
   - Simulasikan bayangan dan highlight menggunakan swatch warna heksadesimal 100% solid (misalnya `#DBEAFE`, `#0284C7`, `#0F172A`).
5. **Zero-Text Rule untuk Ikon & Karakter (`<text> = 0`):**
   - Jangan menaruh label teks di bawah ikon atau di dalam layar gadget karakter.
   - Gambar simbol mata uang (`$`, `€`, `₿`), panah, dan centang sebagai kurva kontur vektor tertutup murni (`<path d="... Z" />`).
6. **Background Transparan untuk Koleksi Ikon:**
   - Jangan meletakkan `<rect width="100%" height="100%" fill="#FFFFFF" />` atau garis bantu tabel putus-putus (`stroke-dasharray`) di dalam file `.svg` ikon agar server Adobe Stock otomatis memberikan lencana hijau **"Transparent PNG available"**.
   - Background putih hanya ditambahkan saat merender file preview `.jpg`.
7. **Semantic Grouping untuk Kemudahan Edit Pembeli (1-Click Editing):**
   - Bungkus setiap ikon ke dalam `<g id="icon-XX-descriptive-name">`.
   - Pisahkan layer warna ke dalam `<path>` tersendiri agar pembeli dapat melakukan recoloring dalam 1 kali klik di Adobe Illustrator.
8. **Batas Metadata Ketat & Larangan Kata "AI":**
   - `Filename`: format `snake_case`, **$\le 30$ karakter** (termasuk ekstensi `.svg`).
   - `Title`: Kalimat deskriptif bahasa Inggris alami, **$\le 70$ karakter**.
   - **Kata Terlarang Mutlak:** Haram mencantumkan `"AI"`, `"Artificial Intelligence"`, `"Generative AI"`, atau `"Midjourney"` di Judul maupun Keywords.
   - `Keywords`: 25–35 tags, dengan **10 kata kunci pertama** membawa 80% bobot ranking pencarian Sensei.
9. **Presisi Geometris & Grid Snapping:**
   - Koordinat titik kurva dibulatkan rapi 2 desimal (`.2f`).
   - Radius sudut seragam, simetri terjaga, dan bebas dari titik kurva liar (*stray anchor points*).
10. **Multi-Format Staging & Deduplicated Master Catalog:**
    - Setiap aset diproduksi dalam 5 file: `.svg` (Dublin Core RDF), `.eps` (DSC 3.0), `.png` ($\ge 15\text{ MP}$ transparan), `.jpg` ($\ge 15\text{ MP}$ white-flattened + XMP), dan thumbnail 360h.
    - Baris metadata di-upsert ke `metadata_batch_active.csv` tanpa membuat duplikasi baris.

---

## ⚡ 2. Alur Kerja Produksi 4 Tahap (The 4-Stage Protocol)

```text
[Stage 1: Riset & Konsep AI]
  └─ Pilih micro-niche B2B -> (Opsional) Generate konsep raster via `/gen-img` -> Simpan di raw/
[Stage 2: Vision Inspection & Feature Extraction]
  └─ Buka via Vision -> Ekstrak layout & warna -> Eliminasi teks halusinasi & efek 3D
[Stage 3: Precision Mathematical 2D Vector Construction]
  └─ Tulis kode SVG matematis 16 MP -> Closed paths (Z) -> Compound paths (evenodd)
[Stage 4: Inkscape CLI Outlining & Multi-Format Finalization]
  └─ object-to-path + object-stroke-to-path -> 10-Gate Audit -> Render PNG/JPG/EPS -> Injeksi Metadata RDF/XMP
```

### Tahap 1: Riset & Konsep AI (Opsional)
Jika memerlukan eksplorasi bentuk awal, jalankan tool `/gen-img`:
```bash
/gen-img "flat 2d vector icon set, fintech digital banking, clean minimalist, isolated white background, zero 3d, zero text, wide spacing" -r 1:1 -o "raw/fintech_concept.jpg"
```

### Tahap 2: Vision Inspection & Feature Extraction
Buka file konsep menggunakan Vision Agent (`view_file`), identifikasi elemen kunci (kartu, koin, chip, perisai), dan buang seluruh artefak kompresi, bayangan blur, atau teks gibberish.

### Tahap 3: Konstruksi Vektor Matematis Murni
Tulis file SVG menggunakan bantuan geometri di `scripts/svg_geometry_helpers.py` atau koordinat terhitung presisi:
- Seluruh bentuk ditutup dengan `Z`.
- Gunakan warna solid heksadesimal kontras tinggi (60-30-10 palette).

### Tahap 4: Finalisasi Produksi & Validasi 10-Gate
Jalankan skrip pipeline produksi untuk meng-expand stroke dan menghasilkan seluruh artefak siap submit:
```python
from pathlib import Path
from scripts.ai_to_vector_pipeline import finalize_production_package

finalize_production_package(
    asset_dir=Path("07-PRODUKSI-ASET-SIAP-SUBMIT/fintech_card_coin_flat_01"),
    base_name="fintech_card_coin_flat_01",
    raw_svg_path=Path("raw/fintech_card_coin_raw.svg"),
    title="Flat 2D Credit Card and Gold Dollar Coin Digital Payment Vector Icon",
    tags=[
        "fintech", "credit card", "payment", "digital banking", "gold coin",
        "money", "finance", "debit card", "cashless", "transaction",
        "online shopping", "ecommerce", "smart chip", "banking", "wealth"
    ],
    category_id=3,
    canvas_w=4000,
    canvas_h=4000
)
```

---

## 🔍 3. Matriks 10-Gate Quality Assurance Table

| Gate | Kriteria Pengujian | Batas Toleransi | Tindakan Jika Gagal |
|:---:|---|---|---|
| **Gate 01** | Larangan Kata Terlarang ("AI", "Midjourney") | 0 toleransi | Regex scanner membatalkan build seketika. |
| **Gate 02** | Panjang Filename | $\le 30$ karakter | Pangkas nama file menjadi snake_case ringkas. |
| **Gate 03** | Panjang Document Title | $\le 70$ karakter | Ringkas judul tanpa mengurangi kata kunci utama. |
| **Gate 04** | Resolusi Kanvas | $\ge 15.0$ Megapixels | Ubah ke `4000x4000` (16 MP) atau `5000x3000` (15 MP). |
| **Gate 05** | Kurva Tertutup (*Closed Paths*) | Setiap `<path>` berakhiran `Z`/`z` | Tambahkan perintah `Z` di akhir sub-path. |
| **Gate 06** | Zero Live Strokes | `stroke == 'none'`, 0 `<line>` | Jalankan `object-to-path` + `object-stroke-to-path` via Inkscape. |
| **Gate 07** | Zero Opacity & Filter Raster | 0 atribut alpha/filter | Ganti dengan swatch warna heksadesimal murni solid. |
| **Gate 08** | Zero Text Tags | 0 `<text>` dan `<tspan>` | Konversi seluruh teks menjadi kurva (*object-to-path*). |
| **Gate 09** | Background Transparan (Khusus Ikon) | 0 `<rect fill="#fff">` | Hapus background putih pada file `.svg` master. |
| **Gate 10** | Semantic Grouping & Deduplikasi CSV | ID grup deskriptif, 0 baris duplikat | Bungkus dalam `<g id="...">` dan jalankan upsert CSV. |

---

## 🛠️ 4. Tooling & Script CLI Bawaan

Semua script pembantu siap pakai terletak di subdirektori `scripts/`:

### 1. Standalone 10-Gate Auditor (`audit_svg_gates.py`)
Gunakan untuk mengaudit kepatuhan file SVG apa pun sebelum dimasukkan ke pipeline produksi:
```bash
python3 scripts/audit_svg_gates.py "asset.svg" \
  --title "Flat 2D Credit Card and Gold Dollar Coin Digital Payment Vector Icon" \
  --tags "fintech, credit card, payment, digital banking, gold coin"
```

### 2. Standalone Metadata Embedder (`auto_embed_metadata.py`)
Gunakan untuk menginjeksi Dublin Core RDF ke SVG atau XMP ke JPEG secara langsung:
```bash
# Per-file
python3 scripts/auto_embed_metadata.py --file "asset.svg" --title "..." --tags "tag1, tag2"

# Inspeksi metadata file
python3 scripts/auto_embed_metadata.py --inspect "asset.svg"
```

### 3. Generator Bentuk Geometri Matematis (`svg_geometry_helpers.py`)
Modul Python untuk menghasilkan string path SVG kurva tertutup:
```python
from scripts.svg_geometry_helpers import rect_path, circle_path, ring_compound_path, capsule_path

# Membuat kartu kredit dengan sudut tumpul
card_body = rect_path(x=-1160, y=-800, w=2320, h=880, rx=140, ry=140)

# Membuat cincin berlubang compound path
donut = ring_compound_path(cx=0, cy=0, r_outer=520, r_inner=410)
```

---

## 📦 5. Contoh Aset Produksi 16.0 MP Terverifikasi

Lihat folder `examples/` untuk referensi kode SVG murni 16.0 MP yang 100% lolos 10-Gate:
- `examples/fintech_card_coin_flat_01.svg` — Kartu kredit flat 2D + koin dollar emas.
- `examples/cyber_shield_check_flat_01.svg` — Perisai dual-tone + centang zamrud + lubang kunci lingkaran penuh (memperbaiki cacat clipping).
- `examples/fintech_banking_icons_01.svg` — Lembar 4 ikon perbankan (Dompet, Bank, Pembayaran Mobile, Analitik).
- `examples/metadata_examples.csv` — Template baris CSV siap impor Adobe Stock.
