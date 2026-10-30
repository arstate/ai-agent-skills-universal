# The 4-Pass Progressive Vector Engineering Plan (`four-pass-retouch-plan.md`)
## Standard Mutu Vektor Komersial S-Rank (Adobe Stock, Shutterstock & Freepik)

Dokumentasi arsitektur progresif 4 tahap (/svg-gen v4.0) untuk menghasilkan set ikon dan ilustrasi vektor komersial 2D flat berkualitas tinggi (S-Rank). Mengeliminasi cacat visual clipart murahan, pembagian warna mekanis 50/50 yang kaku, dan geometri canggung.

---

## 🔄 1. The 4-Pass Progressive Pipeline

```text
[PASS 1: Clean & Simple Base Skeleton (*_pass1_skeleton.svg)]
  ├─ 3–5 <path> per ikon, 2–3 warna datar primer
  ├─ Kunci siluet 100% akurat & optical mass seimbang (Picture Deletion Test)
  └─ Pusat koordinat terkunci di: <g transform="translate(cx, cy)">
         │
         ▼
[PASS 2: Volumetric 2D Planar Shading & Unified Backdrops (*_pass2_shading.svg)]
  ├─ Palet backdrop harmonis terkalibrasi (Luminance > 96%) + ground shadow pills
  ├─ Shading planar volumetrik (bukan belah tengah 50/50 mekanis!)
  └─ Solid Hex swatches murni (Zero Opacity, Zero Filter -> 0 cairo_image)
         │
         ▼
[PASS 3: Commercial Micro-Details & Niche Intelligence (*_pass3_details.svg)]
  ├─ Arsitektur nyata: pilar berkapitel & berplint, pintu berpanel & transom fanlight
  ├─ Objek dinamis: kartu fanned -15°/+10°, chip EMV ber-grid, gelombang NFC, jahitan dompet
  ├─ Data visual: ascending bars proporsional (25/50/75/100%), spline trend arrow, node data
  └─ UI gadget: Dynamic island, status bar, badge verifikasi aura, transaction pills
         │
         ▼
[PASS 4: Adversarial Artifact Purge & Final Retouch (*_pass4_final.svg)]
  ├─ Arc-clipping math bebas secant overhang (A rx,ry 0 0 1 dengan Δx = √(R² - Δy²))
  ├─ Tangent clearance guard: jarak aman >= 50px dari tepi eave/roof/backdrop
  ├─ Micro-specular glints (crescents pada koin, pantulan kaca gadget, sparkle emas)
  └─ 10-Gate Adobe Stock Final Lock: 100% Z, 0 live stroke, 0 text, 0 opacity, >= 15 MP
```

---

## 📐 2. The 7 Iron Laws of Commercial Craft (Anti-Clipart Standard)

### Hukum 1: Law of Architectural Columns (Pilar Arsitektur Berkelas)
* **Larangan Keras:** Dilarang menggambar pilar bangunan sebagai balok vertikal polos yang terbagi dua warna biru tua/muda di tengah. Itu terlihat seperti teralis penjara!
* **Standar Mutu:**
  1. **Kapitel (Head):** Setiap pilar WAJIB memiliki kepala kapitel (*capital/abacus*) yang melebar di bagian atas (`rx = 6`).
  2. **Plint (Base):** Setiap pilar WAJIB memiliki alas kaki plint (*stepped base*) yang berpijak kokoh di atas lantai tangga (*stylobate*).
  3. **Fluting & Lighting:** Batang pilar (*shaft*) memiliki pencahayaan 3-tone: sisi kiri sunlit (`#3B82F6`), pinstripe highlight fluting di tengah (`#60A5FA`), dan sisi kanan berbayang (`#1D4ED8`).
  4. **Pintu Masuk & Portal:** Bangunan klasik wajib memiliki portal pintu lengkung (*arched portal*), transom fanlight, pintu ganda berpanel, dan gagang kuningan (*brass handles*).

### Hukum 2: Law of Fanned Payment Cards & Leather Wallets
* **Larangan Keras:** Dilarang menggambar dompet sebagai balok persegi kaku dengan garis miring sembarangan dan kartu tegak lurus kaku.
* **Standar Mutu:**
  1. **Dynamic Card Fanning:** Tampilkan 2 kartu dan/atau uang kertas dengan sudut berlawanan (misal: Uang kertas tilted -15°, kartu kredit belakang tilted -5°, kartu kredit depan tilted +12°).
  2. **Curved Pocket Rim:** Saku depan dompet memiliki bibir lengkung alami (`M -480,160 C -200,260 100,250 360,140 ...`).
  3. **Running Stitch Seam:** Sematkan jahitan tepi berupa deretan kapsul kecil (`#38BDF8`) di sepanjang perimeter saku.
  4. **Smart EMV Chip:** Kartu kredit dilengkapi chip emas (`#F59E0B`) dengan saluran mikro-grid (`#B45309`), 3 lengkungan gelombang nirsentuh (NFC), dan titik emboss nomor kartu.

### Hukum 3: Law of Device & Screen UI Intelligence
* **Larangan Keras:** Dilarang meninggalkan layar ponsel/tablet sebagai ruang kosong putih yang hampa dengan 1 centang mengambang.
* **Standar Mutu:**
  1. **Realistic Gadget Chassis:** Bezel tipis modern (`rx = 56`), dynamic island kamera pil (`#0F172A`), dan speaker slit.
  2. **Card Preview Header:** Menampilkan pratinjau kartu transaksi di bagian atas layar dengan aksen cyan.
  3. **Radiating NFC Waves:** 3 lengkungan gelombang konsentris yang memancar ke atas.
  4. **Verified Success Badge:** Lingkaran centang dengan cincin aura mint (`#D1FAE5`), ring emerald (`#10B981`), dan centang tebal putih bersudut halus.
  5. **Transaction Details:** Menampilkan wadah data nominal transaksi (simbol mata uang `$`, siluet bar nominal tebal `#0F172A`, dan bar status verifikasi).
  6. **CTA Action Button:** Tombol aksi royal blue dengan label putih di bagian bawah.

### Hukum 4: Law of Data & Growth Analytics Visualization
* **Larangan Keras:** Dilarang membuat bar chart dengan tinggi acak yang tidak masuk akal (misal bar 3 lebih pendek dari bar 2 saat menggambarkan pertumbuhan modal) atau panah poligonal bergerigi kasar.
* **Standar Mutu:**
  1. **Proportional Ascending Progression:** 4 bar wajib menampilkan progres kenaikan yang memuaskan (25% -> 50% -> 75% -> 100% Target). Bar ke-4 menggunakan warna aksen hijau zamrud (*emerald growth* `#10B981`).
  2. **Rounded Volumetric Caps:** Ujung atas bar dibulatkan (`rx = 16..18`) dengan pencahayaan planar dua sisi (muka kiri sunlit, muka kanan shaded).
  3. **Aerodynamic Trend Ribbon & Chevron Arrow:** Garis tren berupa pita kontinu bersudut bersih dengan kepala panah tegas (`#38BDF8` atas, `#0284C7` bawah).
  4. **Concentric Metric Data Pucks:** Simpul data di setiap koordinat bar berupa lingkaran 3 lapis: ring luar gelap, ring tengah glow cyan, dan inti putih bersih.
  5. **Floating Metric Tag:** Lencana pil hijau (+38.5% Growth) dengan panah mini chevron `▲` yang mengambang di atas chart.

### Hukum 5: Unified Harmonized Backdrop System (Anti-Circus Colors)
* **Larangan Keras:** Dilarang memberikan warna latar belakang acak-acakan (satu kuning mencolok, satu hijau, satu merah muda, satu biru) yang membuat icon pack terlihat seperti sirkus anak-anak.
* **Standar Mutu:**
  - Seluruh ikon dalam 1 paket wajib menggunakan sistem piringan latar (*backdrop medallions*) yang serasi dengan tingkat kecerahan tinggi (*high-key pastel tints*, Luminance > 96%):
    - FinTech / B2B: Ice Blue (`#F0F9FF`), Slate Platinum (`#F8FAFC`), Mint Aura (`#ECFDF5`), Indigo Sky (`#EEF2FF`).
  - Setiap piringan dilengkapi aksen busur sabit lembut di pojok kiri atas dan kapsul bayangan tanah (*ground shadow pill*) di bagian bawah (`y = 640..710`).

### Hukum 6: Tangent & Clearance Guard (>= 50px Rule)
* Seluruh elemen melayang (koin emas, sparkle bintang, badge tag) WAJIB memiliki jarak bebas minimal **50px** dari batas tepi bangunan, atap, dompet, atau piringan latar belakang.
* Dilarang menempelkan koin emas secara tumpang-tindih canggung di atas lereng atap pediment! Berikan ruang bernapas yang elegan.

### Hukum 7: Specular Micro-Accents & 10-Gate Adobe Stock Compliance
* **Specular Highlights:** Tambahkan aksen pantulan sabit emas (`#FEF08A`) pada koin dolar, kilau garis putih pada tepi kaca ponsel, dan sparkle 4 titik emas (`#F59E0B`).
* **10-Gate Absolute Audit:**
  - 100% path ditutup dengan `Z`.
  - 0 live stroke (seluruh outline wajib berupa bidang isi / filled ribbons).
  - 0 tag `<text>` (simbol mata uang digambar sebagai kurva tertutup murni).
  - 0 atribut alpha opacity (0 `cairo_image` saat diekspor ke EPS Level 3.0).
  - Resolusi kanvas >= 15.0 Megapixels (`4000x4000` = 16.0 MP).
