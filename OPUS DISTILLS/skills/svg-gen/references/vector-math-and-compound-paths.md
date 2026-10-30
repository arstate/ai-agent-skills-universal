# Mathematical Vector Construction & Compound Path Engineering

Panduan teknis perancangan path SVG matematis murni beresolusi 15+ Megapixels tanpa menggunakan stroke mentah atau efek raster.

---

## 📐 1. Sistem Koordinat Kanvas 16.0 MP (`4000 × 4000 px`)

Pada kanvas `4000 x 4000`, skala ukuran elemen dihitung dengan proporsi mikrostock:
- **Pusat Kanvas Tunggal:** `(2000, 2000)`
- **Grid 2x2 (4-Icon Sheet):**
  - Ikon 1 (Kiri Atas): Pusat di `(1050, 1050)`, area kotak kerja `1500 x 1500`
  - Ikon 2 (Kanan Atas): Pusat di `(2950, 1050)`, area kotak kerja `1500 x 1500`
  - Ikon 3 (Kiri Bawah): Pusat di `(1050, 2950)`, area kotak kerja `1500 x 1500`
  - Ikon 4 (Kanan Bawah): Pusat di `(2950, 2950)`, area kotak kerja `1500 x 1500`
- **Grid 3x3 (9-Icon Sheet):** Jarak antar pusat ikon `1150 px`, radius ikon `350 px`.
- **Grid 4x4 (16-Icon Sheet):** Jarak antar pusat ikon `880 px`, radius ikon `260 px`.

---

## ⚙️ 2. Anatomi Perintah Path SVG Standar W3C

Setiap kurva dibangun menggunakan instruksi geometris standar:
- `M x,y` : *Move To* — Memulai sub-path baru pada titik `(x, y)`.
- `L x,y` : *Line To* — Menarik garis lurus ke titik `(x, y)`.
- `H x` : Garis horizontal ke koordinat `x`.
- `V y` : Garis vertikal ke koordinat `y`.
- `C x1,y1 x2,y2 x,y` : *Cubic Bézier* — Kurva halus dengan dua titik kontrol.
- `A rx,ry x-axis-rotation large-arc-flag sweep-flag x,y` : *Elliptical Arc* — Busur lingkaran/elips.
- `Z` : *Close Path* — Menutup kurva kembali ke titik awal sub-path. **Wajib ada di setiap path!**

---

## 🕳️ 3. Rekayasa Compound Path (`fill-rule="evenodd"`)

Untuk membuat bentuk yang memiliki lubang (seperti koin berlubang, cincin radar, atau celah garis chip EMV) **tanpa memakai garis stroke**:
1. Gunakan atribut `fill-rule="evenodd"`.
2. Gabungkan sub-path luar dan sub-path dalam dalam satu string `d="..."`.
3. Pastikan **setiap sub-path ditutup dengan huruf `Z`**.

### Contoh Formula Cincin Donut Murni (Compound Ring):
```xml
<!-- Lingkaran Luar R=500, Lingkaran Dalam R=380 -->
<path id="donut-ring" fill="#1D4ED8" fill-rule="evenodd"
  d="M 1500,2000 A 500,500 0 1 0 2500,2000 A 500,500 0 1 0 1500,2000 Z
     M 1620,2000 A 380,380 0 1 0 2380,2000 A 380,380 0 1 0 1620,2000 Z" />
```

### Contoh Celah Garis Chip EMV Kartu Kredit (Compound Grooves):
```xml
<!-- Seluruh garis celah dikonstruksi sebagai persegi panjang tertutup berakhiran Z -->
<path id="emv-chip-grooves" fill="#B45309" fill-rule="evenodd" 
  d="M -810,-340 H -786 V 80 H -810 Z 
     M -694,-340 H -670 V 80 H -694 Z 
     M -990,-210 H -810 V -186 H -990 Z 
     M -990,-90 H -810 V -66 H -990 Z 
     M -670,-210 H -490 V -186 H -670 Z 
     M -670,-90 H -490 V -66 H -670 Z" />
```

---

## 💊 4. Mengonversi Live Stroke Menjadi Pita Poligon Tertutup (Capsules & Ribbons)

### ❌ Cara Lama (Ditolak Microstock):
```xml
<!-- Memicu Rejection Code #4 (UNEXPANDED STROKE) -->
<line x1="1000" y1="2000" x2="3000" y2="2000" stroke="#1D4ED8" stroke-width="120" stroke-linecap="round" />
```

### ✅ Cara Benar `/svg-gen` (100% Lolos Audit):
Gunakan kapsul tertutup dengan ujung busur setengah lingkaran:
```xml
<!-- Panjang 2000, Tebal 120 (Radius r=60) -->
<path id="expanded-capsule" fill="#1D4ED8" 
  d="M 1060,1940 H 2940 A 60,60 0 0 1 2940,2060 H 1060 A 60,60 0 0 1 1060,1940 Z" />
```

---

## 🛡️ 5. Rekayasa Siluet Perisai Simetris (Dual-Tone Shading)

Untuk menghasilkan pencahayaan dua sisi (*light & dark dual tone*) pada ikon perisai keamanan tanpa memakai gradien atau transparansi:
1. Bagi perisai menjadi 2 bagian: Sisi Kiri (`#1D4ED8`) dan Sisi Kanan (`#1E40AF`).
2. Titik puncak berada di `(0, -1280)`, titik bahu di `(±1020, -920)`, dan titik bawah di `(0, 1340)`.

```xml
<!-- Sisi Kiri (Terang) -->
<path id="shield-left" fill="#1D4ED8" 
  d="M 0.00,-1280.00 L -1020.00,-920.00 V -120.00 C -1020.00,620.00 -580.00,1120.00 0.00,1340.00 V -1280.00 Z" />

<!-- Sisi Kanan (Gelap/Shadow) -->
<path id="shield-right" fill="#1E40AF" 
  d="M 0.00,-1280.00 L 1020.00,-920.00 V -120.00 C 1020.00,620.00 580.00,1120.00 0.00,1340.00 V -1280.00 Z" />
```

---

## 🪙 6. Formula Simbol Mata Uang ($ Dollar) Vektor Murni Tanpa `<text>`

Menggambar simbol `$` sebagai kurva tertutup murni sehingga bebas dari isu font yang hilang atau tidak di-outline:

```xml
<path id="dollar-sign-glyph" fill="#FDE047" 
  d="M -32,-280 H 32 V -210 C 110,-200 165,-150 165,-80 H 85 C 85,-115 50,-140 0,-140 C -50,-140 -85,-118 -85,-85 C -85,-50 -45,-38 25,-20 C 115,2 175,35 175,105 C 175,165 120,205 32,215 V 280 H -32 V 215 C -115,205 -175,155 -175,80 H -95 C -95,120 -55,145 0,145 C 55,145 95,122 95,90 C 95,55 55,40 -20,22 C -105,0 -165,-32 -165,-95 C -165,-155 -110,-198 -32,-210 V -280 Z" />
```
