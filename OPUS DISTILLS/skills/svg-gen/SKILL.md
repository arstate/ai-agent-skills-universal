---
name: svg-gen
description: Two-Pass Progressive 2D Flat Vector & Icon Set Engineering Skill for Adobe Stock Contributor (Pass 1 Clean Simple Base -> Pass 2 Aesthetic Retouch, 15+ MP, Auto-Fit Preview, Zero Live Strokes, Zero Cairo Raster EPS).
---

# /svg-gen (v3.0) — Two-Pass Progressive Vector & Adobe Stock Skill

Skill spesialis rekayasa grafis vektor 2D murni berstandar industri komersial global (**Adobe Stock**, **Shutterstock**, dan **Freepik**). Menggunakan **Two-Pass Progressive Vector Engineering** agar vektor tidak mengalami distorsi bentuk, visual berantakan, atau kurva kaku:
1. **Pass 1 (`*_pass1_base.svg` — Clean Simple Base):** Siluet geometris murni, proporsi keyline seimbang, 2–3 warna dasar datar (flat).
2. **Pass 2 (`*_pass2_final.svg` — Aesthetic Retouch & Commercial Polish):** Split-tone planar shading, specular highlights, pastel backdrops, micro-ornaments, dan 100% closed compound paths (`Z`).

---

## 📚 Bundled Reference Manuals (Akses via `read_file`)

Skill ini dilengkapi manual referensi teknis mendalam di folder `references/`:
1. `references/two-pass-retouch-rules.md` — ★ PANDUAN UTAMA: Transformasi Pass 1 (Skeleton) ➔ Pass 2 (Retouch Pro: Split-Tone, Highlights, Micro-Details).
2. `references/adobe-stock-guidelines.md` — Standar 10-Gate Adobe Stock ($\ge 15.0\text{ MP}$, 0 Cairo Image, 0 Live Strokes, SEO Sensei).
3. `references/core-rules.md` — Deklarasi root `<svg>`, viewBox, koordinat grid, dan aturan auto-fit preview.
4. `references/vector-math-and-compound-paths.md` — Rumus matematika konstruksi path, compound path (`fill-rule="evenodd"`), dan pita poligon tanpa stroke.
5. `references/metadata-and-seo-guide.md` — Algoritma pencarian Adobe Sensei, aturan 10 kata kunci pertama (bobot 80%), batas title $\le 70$ karakter, batas filename $\le 30$ karakter, dan daftar ID Kategori 1–21.
6. `references/commercial-niches-and-prompts.md` — 7 Ceruk B2B terlaris (Fintech, Cyber, Cloud, Telehealth, Logistics, Green Energy, Infographics) dan bank prompt konsep `/gen-img`.

---

## 🛑 1. The 10 Iron Laws of Vector Construction

Setiap file vektor produksi yang dihasilkan oleh `/svg-gen` wajib mematuhi 10 hukum mutlak berikut:

1. **100% 2D Flat Vector Murni (Zero 3D):**
   - Dilarang membuat ekstrusi 3D tebal, bevel/emboss metalik, bayangan blur sintetis, atau gradient mesh rumit.
   - Gunakan bidang warna solid murni (*flat fills*), bayangan datar (*solid flat cast shadows*), atau proyeksi aksonometrik 30° (*true isometric*).
2. **Kanvas Wajib $\ge 15.0\text{ Megapixels}$ & Auto-Fit Preview:**
   - **Square (1:1)**: `width="4000" height="4000" viewBox="0 0 4000 4000"` (**16.0 MP**) atau `5000 x 5000` (**25.0 MP**).
   - **Landscape (5:3 / 16:9)**: `width="5000" height="3000" viewBox="0 0 5000 3000"` (**15.0 MP**) atau `6000 x 3375` (**20.25 MP**).
   - **Wajib Deklarasi Root Auto-Fit (Anti-Jebol Monitor):**
     ```xml
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 4000" width="4000" height="4000" style="max-width:100%;height:auto;display:block;background:#FFFFFF;">
     ```
   - Hilangkan prolog `<?xml ...?>` agar live preview di VS Code dan browser web langsung render tanpa error.
3. **100% Closed Compound Paths (`Z`) & Zero Live Strokes:**
   - Semua elemen bentuk wajib berupa kurva tertutup berakhiran `Z` (`<path d="... Z" />`).
   - Dilarang meninggalkan atribut `stroke="..." stroke-width="..."` hidup, `<line>`, atau `<polyline>`.
   - Bentuk berlubang atau memiliki celah wajib menggunakan compound path (`fill-rule="evenodd"`).
4. **Zero Alpha Opacity & Zero Filter Raster (`cairo_image = 0`):**
   - Dilarang keras memakai `opacity`, `fill-opacity`, `stroke-opacity`, `stop-opacity`, `<filter>`, `<feGaussianBlur>`, `<feDropShadow>`, atau `<image>`.
   - Efek transparansi memicu ekspor EPS merender bitmap raster beresolusi rendah (`cairo_image`).
   - Simulasikan bayangan dan highlight menggunakan swatch warna heksadesimal 100% solid (Split-Tone Planar Shading).
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
9. **Two-Pass Generation Discipline:**
   - Pass 1: Bangun siluet dasar simpel (`*_pass1_base.svg`).
   - Pass 2: Retouch dengan split-tone planar shading, specular highlights, dan micro-details (`*_pass2_final.svg`).
10. **Multi-Format Staging & Deduplicated Master Catalog:**
    - Setiap aset diproduksi dalam 5 file: `.svg` (Dublin Core RDF), `.eps` (DSC 3.0), `.png` ($\ge 15\text{ MP}$ transparan), `.jpg` ($\ge 15\text{ MP}$ white-flattened + XMP), dan thumbnail 360h.
    - Baris metadata di-upsert ke `metadata_batch_active.csv` tanpa membuat duplikasi baris.

---

## ⚡ 2. Two-Pass Execution Protocol

```text
[PASS 1: Clean & Simple Base]
  ├─ 3–5 <path> per icon
  ├─ 2–3 warna flat solid murni
  └─ Fokus 100% siluet, proporsi simetris, keyline grid
         │
         ▼
[PASS 2: Aesthetic Retouch & Polish]
  ├─ Layer 1: Soft contrast backdrop circle/squircle + ground shadow pill
  ├─ Layer 2: Split-Tone Planar Shading (kiri sunlit / kanan shaded via solid Hex)
  ├─ Layer 3: Specular crescent highlights & compound cutouts (evenodd)
  ├─ Layer 4: Commercial micro-details (sparkles 4-point, satin ribbons, Nordic diamonds)
  └─ Layer 5: Blank customizable copy-space (Gate 08)
         │
         ▼
[Audit & Auto-Preview HTML]
  └─ python3 scripts/svg_two_pass_engine.py <pass1.svg> <pass2.svg> --html preview_comparison.html
```

---

## 🛠️ 3. Inkscape CLI Action Pipeline

Jika menggunakan Inkscape CLI untuk konversi dan flattening:
```bash
inkscape input.svg \
  --actions="select-all:all;selection-ungroup;select-all:all;selection-ungroup;select-all:all;object-to-path;object-stroke-to-path;export-filename:output.eps;export-do"
```

---

## 🎄 4. Gold Standard Example Assets
- Pass 1 Clean Base: `assets/examples/xmas_pack_pass1_base.svg`
- Pass 2 Retouched Pro: `assets/examples/xmas_pack_pass2_retouched.svg`
- Interactive Inspector: `assets/examples/preview_comparison.html`
