# 🔬 MASTER FORMULA: KECANTIKAN NATURAL TANPA EFEK "AI SLOP"

## 🎯 TITIK TEMU EMAS: CANTIK MEMIKAT x REALISME KAMERA FISIK

Ketika prompt terlalu banyak menambahkan cacat (mata panda, kerutan, pori-pori kasar), wajah model terlihat kusam atau kurang menarik. Sebaliknya, jika terlalu banyak kata pujian generik (*flawless, gorgeous*), model menjadi boneka plastik lilin (*uncanny valley*).

Formula di bawah ini adalah rasio seimbang (*sweet spot*) yang digunakan oleh fotografer kampanye komersial papan atas:

---

## 💎 5 PILAR KECANTIKAN ALAMI ASLI (ZERO AI SLOP):

### 1. Struktur Wajah Ayu & Proporsional (Bukan Filter Plastik)
- `classic West Javanese Sundanese beauty / Central Javanese ethnic beauty`
- `naturally pretty feminine oval face with sweet gentle smile`
- `subtle cheek dimple, clear radiant dark brown almond eyes with crisp iris catchlights`
- `delicate slender nose bridge, softly tinted natural rosy lips with subtle moisture`
- `healthy voluminous silky dark brown hair with soft face-framing waves`

### 2. Kulit Sehat Alami dengan Sub-Surface Scattering (SSS)
Kulit manusia asli tidak memantulkan cahaya seperti plastik. Kulit asli memiliki pendaran halus saat terkena cahaya (*sub-surface scattering*):
- `naturally clear healthy Indonesian warm golden undertone skin`
- `authentic micro-pore definition, soft sub-surface scattering skin glow`
- `zero waxy plastic smoothing, authentic skin translucency`

### 3. Pencahayaan Beauty Studio Komersial Terarah
Pencahayaan CGI AI biasanya flat tanpa arah yang jelas. Kunci dengan peralatan studio nyata:
- `Profoto 85cm white beauty dish key light with soft honeycomb grid`
- `gentle white reflector fill, calibrated balanced studio exposure`
- `1:2 key-to-fill ratio, subtle hair rim light, zero highlight blowout`

### 4. Diafragma Kamera Tajam (Hindari f/1.2 Blur Murahan)
Lensa f/1.2 di AI sering menghasilkan blur digital yang tampak palsu di tepi wajah/pakaian. Gunakan diafragma komersial:
- `Hasselblad H6D-100c / Sony A7R V with 85mm-100mm portrait lens`
- `stopped down to f/4.5 - f/5.6 for crisp optical edge-to-edge clarity`
- Wajah, bulu mata, dan tekstur pakaian tajam 100%, hanya latar belakang yang jatuh lembut secara optik.

### 5. Kalibrasi Parameter Anti-AI (The Golden Ratio)
```text
--style raw --c 1 --s 65
```
- `--style raw`: Mematikan polesan kartun/lukisan default Midjourney.
- `--s 65`: Angka emas yang menjaga kecantikan estetika wajah model tetap tinggi dan memikat, namun TIDAK menyentuh batas plastik 3D (di atas 80).
- `--c 1`: Menjaga stabilitas simetri wajah cantik tanpa distorsi liar.

---

## 🚫 NEGATIVE PROMPT PEMBERSIH EFEK SLOP:
```text
ugly, tired face, heavy dark circles, acne, uneven blotchy skin, dirty skin, plastic skin, waxy face, porcelain doll, beauty filter, facetune, airbrushed, cartoon, anime, 3d render, cgi, digital illustration, uncanny valley, crossed eyes, asymmetrical eyes, weird teeth, bad anatomy, over-processed, oversaturated, muddy background blur, excessive flash glare
```


---

# 📖 PANDUAN MASTER: KONSISTENSI WAJAH 100% & RESTORASI HD (MIDJOURNEY & FLUX.1)

Panduan ini adalah standar operasional untuk memastikan wajah orang asli dari foto referensi terkunci 100% identik tanpa distorsi, serta cara mengeksekusi restorasi HD murni pada Midjourney v6.1 dan FLUX.1.

---

## 🔑 1. CARA MENGAMBIL DIRECT URL GAMBAR DI DISCORD / MIDJOURNEY
Untuk menggunakan fitur penguncian wajah atau image reference, Anda membutuhkan tautan langsung (*direct image URL*) yang berakhiran `.jpg` atau `.png`:
1. Seret (*drag and drop*) foto referensi Anda ke chat Discord Midjourney Bot (atau channel Anda).
2. Tekan Enter untuk mengirim gambar tersebut.
3. Klik gambar yang sudah terkirim hingga terbuka penuh di layar.
4. Klik kanan pada gambar, lalu pilih **Copy Link** (atau **Buka di Browser** lalu salin URL di address bar).
5. Pastikan URL tersebut berakhiran `.png`, `.jpg`, atau `.webp`.

---

## 🧬 2. RAHASIA PARAMETER `--cref` DAN KALIBRASI `--cw` (CHARACTER WEIGHT)

Fitur Character Reference (`--cref`) pada Midjourney v6 dirancang untuk mentransfer identitas karakter dari 1 foto ke generasi baru.

### Sintaks Dasar:
```text
/imagine prompt: [Teks Prompt Komersial] --cref [URL_GAMBAR] --cw [NILAI] --style raw --c 1 --s 65
```

### ⚠️ PERBEDAAN KRUSIAL ANTARA `--cw 100` DAN `--cw 0`:

| Nilai Parameter | Fungsi Kerja | Kapan Harus Digunakan? |
| :--- | :--- | :--- |
| **`--cw 100`** *(Default)* | Mengunci **Wajah + Bentuk Rambut + Pakaian/Busana** dari foto referensi. | Gunakan pada **Template 02 (HD Enhancer)** saat Anda ingin merestorasi foto yang sama persis tanpa mengubah bajunya. |
| **`--cw 0`** *(Face Only)* | **HANYA Mengunci Wajah**. Pakaian, badan, dan latar belakang dibebaskan untuk diganti. | Gunakan pada **Template 01 (Studio Putih)** dan **Template 03 (Pose Santai)** agar baju kasual/kaos di foto asli bisa diganti jadi busana studio baru. |

---

## 🔍 3. FORMULA RESTORASI HD MURNI (ZERO-MORPHING OPTICAL REMASTERING)

Jika Anda ingin membuat foto HP biasa menjadi kualitas tajam setara kamera Hasselblad tanpa merubah wajah atau pose:
1. Pasang URL foto di awal prompt (*Image Prompt*).
2. Salin teks dari `02_PROMPT_UNIVERSAL_HD_ENHANCER_ZERO_MORPHING.md`.
3. Pasang parameter kunci:
```text
--iw 2.0 --style raw --c 0 --s 25 --cref [URL_GAMBAR] --cw 100
```
- `--iw 2.0`: Memberi bobot gambar input maksimal (100% patuh ke foto asli).
- `--c 0`: Mematikan keacakan (zero chaos) agar tidak ada elemen aneh yang muncul.
- `--s 25`: Menurunkan stylize agar AI tidak mendesain ulang subjek, melainkan hanya membersihkan noise dan menajamkan optik.

---

## ⚡ 4. PANDUAN KONSISTENSI WAJAH UNTUK PENGGUNA FLUX.1

Generator **FLUX.1 (Schnell / Dev / Pro)** memiliki arsitektur yang berbeda dengan Midjourney:
1. **Penggunaan PuLID / InstantID (ComfyUI):**
   - FLUX.1 di ComfyUI mendukung node **PuLID for FLUX** untuk mengunci embedding wajah 100% tanpa distorsi gaya.
2. **Penggunaan Natural Language Phrasing (Text-to-Image / Multi-modal):**
   - Sertakan kalimat pengunci identitas:
     `The subject's facial identity, distinctive eye shape, nose bridge, jawline, and natural skin tone are 100 percent identical to the reference image, rendered with natural skin micro-pores and realistic sub-surface scattering.`
   - Masukkan gambar referensi ke slot Image Input pada platform web FLUX.

---

## 🍌 5. PANDUAN GOOGLE GEMINI (NANO BANANA 2 / GEMINI 3.1 FLASH IMAGE)

Berbeda dengan Midjourney yang menggunakan CLI flags (`--cref`), Gemini Nano Banana 2 adalah **Multimodal LLM Image Editor**. 

### Aturan Emas Gemini Nano Banana 2:
1. **Dilarang Gunakan Perintah Pendek Kasual**: Prompt seperti `/image-gen buat jadi hd...` membuat model mengabaikan identitas asli dan beralih ke generasi bebas.
2. **Gunakan Two-Phase Chain-of-Thought (CoT)**:
   - **Phase 1 (Forensic Scan)**: Paksa Gemini memindai geometri wajah, kacamata (wajib tegaskan lensa bening transparan agar tidak berubah jadi kacamata hitam/sunglasses), layer pakaian asli, dan rambut.
   - **Phase 2 (Delta Transformation)**: Kunci seluruh atribut Phase 1 dan hanya transformasikan background (studio cyclorama putih) dan pose (sendakep santai).
3. **Template Siap Pakai**: Gunakan langsung prompt dari file `05_DYNAMIC_MULTIMODAL_STUDIO_TRANSFORMER.md`.

---

## 🚫 6. TROUBLESHOOTING: JIKA HASIL WAJAH MASIH KURANG MIRIP
1. **Wajah Terlalu Halus / Seperti Plastik (Semua Platform):** Pastikan prompt memuat klausa `natural skin micro-pores, uncompressed realistic skin texture, no airbrushed plastic AI smoothing`. Di Midjourney turunkan `--s 25` dan aktifkan `--style raw`.
2. **Kacamata Berubah Jadi Kacamata Hitam (Gemini/Nano Banana 2):** Pantulan cahaya lensa sering disalahartikan sebagai kacamata hitam. Selalu sertakan: `100% CLEAR TRANSPARENT prescription glass with pupils clearly visible behind lenses, no dark sunglass tint`.
3. **Baju Berubah Jadi Jas Formal Padahal Mau Baju Asli:** Kata "profesional" memicu bias formal. Tegaskan: `Keep the exact clothing outfit detected in the reference photo, do not replace with a formal business suit or blazer`.
4. **Wajah Kurang Mirip 100%:** Pastikan foto referensi input memiliki resolusi cukup di area mata dan wajah (tidak blur gerakan, tidak backlight gelap, dan tidak memakai filter kecantikan berlebihan).



---

## 🔒 7. MANDATORY IMAGE REFERENCE BINDING & MULTI-IMAGE REFERENCE FUSION (COMMIT `5b9fa1a` & `62dc486`)

### A. Aturan Wajib Anti-Scratch Text Generation (`5b9fa1a`)
- **Dilarang Membuat dari Nol:** Seluruh template edit foto, studio photoshoot (`01`), universal product studio (`02`), persona transformation (`03`), dan multimodal studio transformer (`05`) dilarang keras menghasilkan subjek atau produk baru dari teks kosong (*scratch text generation*).
- **Binding Subjek & Produk Wajib:**
  - Subjek manusia wajib diekstrak 100% dari `Gambar 1 / Attached Subject Image` dan menyertakan `--cref [URL_WAJAH]` secara default di Midjourney.
  - Produk komersial wajib diekstrak 100% dari `Attached Product Reference Image` (`--iw 2.0`), termasuk bentuk kemasan, tipografi label, dan logo asli tanpa digambar ulang dari nol.

### B. Integrasi Multi-Image Reference Fusion & 3D Facial Triangulation (`62dc486`)
1. **Mode A — 3D Facial Triangulation (2 Foto Subjek Sama):**
   - Menggabungkan 2 foto wajah orang yang sama (Gambar 1 tampak depan + Gambar 2 tampak samping 3/4) untuk merekonstruksi topologi kraniofasial 3D bebas distorsi lensa dengan kemiripan 98–100%.
   - Midjourney: `--cref [URL_FOTO_1] [URL_FOTO_2] --cw 100 --v 6.1`.
2. **Mode B — Role-Decoupled Partition Fusion (2 atau 3 Foto Berbeda - Zero Feature Bleeding):**
   - Memisahkan peran secara ketat: `Gambar 1 = Subject Identity Donor` (wajah, mata, kacamata bening transparan 100%, rambut), `Gambar 2 = Pose Donor` (sikap badan & posisi tangan, buang wajah Gambar 2), dan `Gambar 3 = Environment & Lighting Donor` (background studio & tata cahaya, buang manusia di Gambar 3).
   - Midjourney (2 Gambar): `--cref [URL_WAJAH] --cw 0 --v 6.1`.
   - Midjourney (3 Gambar): `--cref [URL_WAJAH] --cw 0 --sref [URL_LATAR] --v 6.1`.
