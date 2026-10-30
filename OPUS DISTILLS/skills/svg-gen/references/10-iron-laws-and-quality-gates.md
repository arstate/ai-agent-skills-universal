# The 10 Iron Laws of Commercial Vector Construction & Anti-Reject Quality Gates

Dokumentasi standar mutu industri grafis vektor komersial untuk kontributor **Adobe Stock**, **Shutterstock**, dan **Freepik**. Menjamin tingkat kelolosan 100% pada sistem kurasi otomatis (AI Inspector) maupun kurator manusia (*Inspector Reviewers*).

---

## 🛑 1. The 10 Iron Laws (Hukum Besi Konstruksi Vektor)

### Hukum 1: 100% 2D Flat Vector Murni (Zero 3D)
* **Larangan:** Dilarang menghasilkan bentuk 3D ekstrusi tebal, bevel/emboss metalik, perspective rendering ruangan, atau gradient mesh rumit.
* **Standar:** Gunakan bidang warna solid murni (*flat fills*), bayangan datar (*solid flat cast shadows*), atau proyeksi aksonometrik 30° murni (*true isometric*) tanpa vanishing point kamera sintetis.

### Hukum 2: Kanvas Wajib >= 15.0 Megapixels
* **Standar Ukuran Kanvas:**
  - **Square (1:1)** — Icon Sheets, Single Hero Icons, Badges, Badges:
    - `width="4000" height="4000" viewBox="0 0 4000 4000"` (**16.0 MP** — Pilihan Utama)
    - `width="5000" height="5000" viewBox="0 0 5000 5000"` (**25.0 MP**)
  - **Landscape (5:3 / 16:9)** — Infographics, Flowcharts, B2B Diagrams:
    - `width="5000" height="3000" viewBox="0 0 5000 3000"` (**15.0 MP**)
    - `width="6000" height="3375" viewBox="0 0 6000 3375"` (**20.25 MP**)
* **Mengapa Wajib:** Syarat teknis mutlak Adobe Stock mengharuskan resolusi minimal 15.0 MP agar pembeli dapat mencetak aset pada resolusi billboard/cetak besar tanpa kehilangan ketajaman.

### Hukum 3: 100% Closed Compound Paths (`Z`) & Zero Live Strokes
* **Larangan:** Dilarang meninggalkan elemen garis mentah `<line>`, `<polyline>`, atau atribut `stroke="..." stroke-width="..."` hidup.
* **Standar:** Seluruh garis tebal, bingkai kartu, tanda centang, panah, dan ring lingkaran berlubang wajib dikonstruksi sebagai kurva tertutup berakhiran `Z` (`<path d="... Z" />`) atau compound path berlubang (`fill-rule="evenodd"`).

### Hukum 4: Zero Alpha Opacity & Zero Filter Raster (`cairo_image = 0`)
* **Larangan Mutlak:**
  - `opacity="..."`, `fill-opacity="..."`, `stroke-opacity="..."`, `stop-opacity="..."`
  - `<filter>`, `<feGaussianBlur>`, `<feDropShadow>`, `<image>`
* **Dampak:** Saat diekspor ke PostScript DSC 3.0 EPS via Cairo/Inkscape, setiap elemen yang memiliki transparansi alpha atau filter blur otomatis dirender menjadi bitmap raster beresolusi rendah (`cairo_image`). Ini memicu penolakan seketika dengan kode **`TECHNICAL ISSUES: RASTERIZED BITMAP IN VECTOR`**.
* **Solusi:** Simulasikan bayangan dan highlight menggunakan swatch warna heksadesimal 100% solid (misalnya `#DBEAFE` untuk bayangan biru, `#F1F5F9` untuk bayangan abu-abu).

### Hukum 5: Zero-Text Rule untuk Ikon & Karakter (`<text> = 0`)
* **Larangan:** Jangan menaruh label teks di bawah ikon, di layar gadget, atau di baju karakter.
* **Standar:** Simbol mata uang (`$`, `€`, `₿`), tanda panah, dan centang wajib digambar sebagai kurva kontur vektor tertutup (`<path d="... Z" />`). Jika ada infografis yang memerlukan teks penjelasan, teks wajib dikonversi menjadi kurva (*object-to-path*) sebelum diekspor.

### Hukum 6: Background Transparan untuk Koleksi Ikon
* **Standar:** Jangan meletakkan `<rect width="100%" height="100%" fill="#FFFFFF" />` atau garis bantu tabel putus-putus (`stroke-dasharray`) di dalam file `.svg` paket ikon.
* **Keuntungan Pasar:** Server Adobe Stock secara otomatis mendeteksi latar transparan dan memberikan lencana hijau **"Transparent PNG available"**, meningkatkan angka konversi download hingga 340%. (Latar belakang putih hanya ditambahkan saat merender preview `.jpg` untuk catalog browser!).

### Hukum 7: Semantic Grouping untuk Kemudahan Edit Pembeli (1-Click Editing)
* **Standar:** Kelompokkan setiap ikon atau komponen utama ke dalam grup bernama deskriptif:
  `<g id="icon-01-digital-wallet">`, `<g id="credit-card-group">`, `<g id="gold-dollar-coin">`.
* Pisahkan bidang warna yang berbeda ke dalam `<path>` tersendiri agar pembeli dapat mengubah warna merek hanya dengan 1 kali klik di Adobe Illustrator.

### Hukum 8: Batas Metadata Ketat & Larangan Kata "AI"
* **Filename:** Format `snake_case`, maksimal **30 karakter** (termasuk ekstensi `.svg`).
* **Title:** Kalimat deskriptif bahasa Inggris alami, maksimal **70 karakter**.
* **Kata Terlarang Mutlak:** Haram menggunakan kata `"AI"`, `"Artificial Intelligence"`, `"Generative AI"`, atau `"Midjourney"` di Judul maupun Keywords.
* **Keywords:** 25–35 tags relevan, di mana **10 kata kunci pertama** memiliki bobot ranking 80% pada algoritma Adobe Sensei.

### Hukum 9: Presisi Geometris & Grid Snapping
* Koordinat titik path dibulatkan hingga 2 angka di belakang koma (`.2f`).
* Hindari titik kurva liar (*stray anchor points*) yang tidak memiliki bidang atau luas.
* Radius sudut (*corner radius*) pada elemen rounded harus seragam (misal 140px untuk kartu kredit, 70px untuk chip EMV).

### Hukum 10: Multi-Format Staging & Deduplicated Master Catalog
* Setiap aset komersial diproduksi dalam paket lengkap:
  1. `asset.svg` (Vektor murni standar W3C + Dublin Core RDF)
  2. `asset.eps` (PostScript DSC 3.0 EPS murni, `cairo_image = 0`)
  3. `asset.png` (High-resolution transparent PNG >= 15 MP)
  4. `asset.jpg` (High-resolution preview JPG white-flattened dengan XMP packet)
  5. `asset_thumb_360h.png` (Thumbnail web preview tinggi 360px)
  6. Baris metadata unik tanpa duplikasi di `metadata_batch_active.csv`.

---

## 🔍 2. Matriks Kode Penolakan Microstock & Solusinya

| Rejection Code | Nama Cacat Teknis | Akar Masalah | Solusi Otomatis `/svg-gen` |
|---|---|---|---|
| **#1** | **RASTER ARTIFACTS / BITMAPS** | Penggunaan `opacity`, `<filter>`, atau `<feDropShadow>` yang memicu panggilan `cairo_image` di file EPS. | **Gate 07:** Larang seluruh atribut alpha. Gunakan warna solid heksadesimal murni. |
| **#2** | **OPEN PATHS / STRAY POINTS** | Path memiliki warna isi (`fill`) tetapi tidak ditutup dengan huruf `Z` di akhir atribut `d`. | **Gate 05:** Script memverifikasi setiap `<path>` wajib berakhiran `Z`/`z`. |
| **#3** | **UNRESOLVED FONTS / TEXT TAGS** | Masih ada tag `<text>` yang belum di-outline menjadi kurva poligon tertutup. | **Gate 08:** Script menggagalkan build jika menemukan `<text>` atau `<tspan>`. |
| **#4** | **UNEXPANDED STROKES** | Garis tepi masih berupa atribut `stroke="..."` mentah, bukan kurva ter-expand. | **Gate 06:** Inkscape CLI `object-to-path` + `object-stroke-to-path`. |
| **#5** | **UNDER MINIMUM RESOLUTION** | Dimensi artboard di bawah 15.0 Megapixels. | **Gate 04:** Kanvas dikunci di `4000x4000` (16.0 MP) atau `5000x3000` (15.0 MP). |
| **#6** | **TRADEMARK / COPYRIGHT** | Logo merek nyata (Visa, Apple, Mastercard) atau teks merek komersial. | Gambar simbol mata uang atau generic wireframe pills tanpa teks merek asli. |
| **#7** | **KEYWORD SPAM / AI PENALTY** | Memasukkan kata "AI", "Midjourney", atau keyword repetitif di metadata. | **Gate 01:** Regex scanner memvalidasi title dan tags sebelum injeksi Dublin Core. |
| **#8** | **DUPLICATE BATCH ROW** | Mengunggah file dengan nama yang sama lebih dari 1 kali di CSV. | **Upsert CSV:** Script otomatis meng-update baris tanpa membuat duplikasi baris. |
