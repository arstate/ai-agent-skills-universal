---
name: upscale-img
description: Master Hardware-Accelerated 4K/8K AI Image Upscaler using PyTorch, Spandrel, and CUDA on NVIDIA GeForce GTX 1660 SUPER. Features seamless 256x256 cosine feather tiling, 4xNomos8kSCHAT-S Transformer Attention, zero-NaN precision guard, Adobe Stock aspect ratio scaling (16:9, 1:1, 3:4), and exiv2 metadata preservation. Trigger when user types /upscale-img, @upscale-img, /boost, upscale-img, boost, or asks to upscale images, enhance resolution to 4K/8K, or run batch upscaling.
---

# `upscale-img` — Master Hardware-Accelerated AI Image Upscaler & Resolution Booster

Engine standar industri untuk upscaling resolusi tinggi (4K/8K) bebas artefak dan bebas sambungan (*zero seam lines*) untuk aset komersial Adobe Stock, Freepik, dan Shutterstock. Memanfaatkan akselerasi GPU NVIDIA CUDA (GeForce GTX 1660 SUPER 6GB GDDR6) + CPU RAM melalui pustaka `spandrel` dan PyTorch native tanpa GUI.

> **Triggers & Aliases:** `@upscale-img`, `/upscale-img`, `/boost`, `upscale-img`, `boost`, `@image-upscale-cuda`.

---

## ⚡ 1. Cara Cepat Eksekusi CLI (`upscale-img` / `boost`)

CLI launcher global tersedia di `$PATH`:
- `/home/arya/.local/bin/upscale-img`
- `/home/arya/.local/bin/boost`

### A. Upscale Satu Gambar (Otomatis 4X ke Output `_4k.jpg`):
```bash
upscale-img "/path/to/input.jpg"
# atau via trigger /boost:
boost "/path/to/input.jpg"
```

### B. Upscale dengan Menentukan File Output Spesifik:
```bash
upscale-img "/path/to/input.jpg" "/path/to/output_4k.jpg"
```

### C. Pilih Arsitektur Model Sesuai Jenis Konten:
```bash
# Model Transformer Attention (Default - Tajam, 3D Fluid, Liquid Gold, Partikel):
upscale-img input.jpg output_4k.jpg -m schat

# Model ESRGAN (Fotografi realistis, Flatlay makanan, Daun/Pohon, Kayu):
upscale-img input.jpg output_4k.jpg -m nmkd

# Model ATD (Restorasi kompresi JPEG berat pada gambar stock lama):
upscale-img input.jpg output_4k.jpg -m atd

# Model DRCT-L (Ultra High Quality Photorealistic Transformer):
upscale-img input.jpg output_4k.jpg -m drct

# Model SPAN (Super Cepat & Ringan):
upscale-img input.jpg output_4k.jpg -m span
```

### D. Upscale Batch Satu Folder Sekaligus:
```bash
upscale-img "/path/to/folder_1k" "/path/to/folder_4k"
```

---

## 🖥️ 2. Profil Hardware & Lingkungan Eksekusi

| Parameter | Spesifikasi Lingkungan Produksi |
|---|---|
| **GPU Primer** | NVIDIA GeForce GTX 1660 SUPER (Turing TU116, 6GB VRAM GDDR6) |
| **CUDA Capability** | Compute 7.5, CUDA 12.x |
| **Python Runtime** | `/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/chaiNNer-linux-x64/python/python/bin/python3.11` |
| **Pustaka Inti** | `torch` (CUDA 12.4), `spandrel` (0.4.1), `spandrel_extra_arches`, `Pillow`, `numpy` |
| **Tool Metadata** | `exiv2` (Preservasi & Injeksi IPTC/XMP Lossless) |

---

## 📦 3. Katalog Model & HUKUM BESI "ONNX FP16 NaN Trap"

Direktori Model:
`/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/UPSCALE MODEL/`

### ⚠️ PERINGATAN KERAS: The ONNX FP16 NaN Trap
- **Model Rusak:** `4xNomos8kSCHAT-S.onnx` memiliki bug ekspor FP16 dari arsitektur attention SCHAT. Saat dieksekusi di CUDA maupun CPU, bobot layer attention menghasilkan output NaN (menghasilkan gambar hitam kosong atau artefak abu-abu).
- **HUKUM BESI:** **SELALU GUNAKAN** bobot PyTorch asli:  
  `4xNomos8kSCHAT-S.pth` melalui library `spandrel`!

### Matriks Rekomendasi Model Berdasarkan Niche Visual:
1. **`4xNomos8kSCHAT-S.pth` (DAT/HAT Transformer Attention, 81 MB) — [PILIHAN UTAMA / DEFAULT]:**
   - **Terbaik untuk:** 3D Fluid, Liquid Gold, Ribbon Velvet, Paper Fold Origami, Podium Mewah, Tekstur Kain GSM, Partikel Glitter, Geometri Presisi, dan Elemen Visual Vektor/Render.
   - **Karakter Visual:** Sangat tajam, tidak menghasilkan tampilan plastik/waxy, mempertahankan gradasi mikro, bebas noise kuantisasi.
   - **Performa:** ~0.99s per tile 256x256 pada GTX 1660 SUPER (~9–28 detik per gambar 4K).
2. **`4x_NMKD-Superscale-SP_178000_G.pth` (ESRGAN, 66 MB):**
   - **Terbaik untuk:** Fotografi realistik, culinary flatlay, dedaunan pinus alami, tekstur kayu pedesaan, dan kulit buah.
3. **`4xNomos8k_atd_jpg.safetensors` (ATD Architecture, 81 MB):**
   - **Terbaik untuk:** Menghilangkan artefak kompresi JPEG berat pada gambar stock lama atau input berkualitas rendah.
4. **`4xNomos2_hq_drct-l.safetensors` (DRCT-L Architecture, 242 MB):**
   - **Terbaik untuk:** Output photorealistic premium dengan arsitektur Dense Residual Connected Transformer.
5. **`4xNomosWebPhoto_RealPLKSR.safetensors` (RealPLKSR, 29 MB):**
   - **Terbaik untuk:** Foto web, wajah, dan subjek umum dengan proses inferensi cepat.
6. **`4xNomos8k_span_otf_strong.pth` (SPAN, 9 MB):**
   - **Terbaik untuk:** Batch cepat aset grafis ringan dan kebutuhan waktu eksekusi super kilat.
7. **`2xNomosUni_span_multijpg.safetensors` (SPAN 2X, 8.9 MB):**
   - **Terbaik untuk:** Upscaling 2X lipat cepat.

---

## 📐 4. Algoritma Seamless Tiling (Cosine Feather Mask 256x256)

Untuk mencegah **CUDA Out-of-Memory (OOM)** pada GPU 6GB VRAM saat memproses gambar resolusi besar (4K/8K), sistem memotong kanvas menjadi tile bertahap dengan overlap dan masker peredam gradasi kosinus/linear:

```python
tile_size = 256    # Ukuran tile optimal untuk Turing TU116 6GB VRAM
tile_pad  = 24     # Padding overlap perbatasan (96px pada skala 4x)
scale     = 4      # Faktor pembesaran 4X
```

### Rumus Penggabungan (Stitching Math):
- Setiap tile diekstrak dengan overlap selebar `tile_pad` (24 piksel).
- Pada fase penjahitan (*stitching*), bobot piksel di area overlap diberi masker gradasi dari 0.0 ke 1.0 (`np.linspace`).
- Akumulasi piksel dinormalisasi dengan membagi array bobot total:
  $$\text{Output} = \frac{\sum (\text{Tile} \times \text{Mask})}{\sum \text{Mask}}$$
- **Hasil:** 0% garis sambungan (*zero seams*), gradasi warna 100% mulus dari ujung ke ujung tanpa kotak-kotak terpotong.

---

## 📊 5. Standar Aspek Rasio & Resolusi Adobe Stock

Setiap gambar hasil generate awal (1K) di-upscale tepat 4X lipat sesuai rasio aspek aslinya:

| Aspek Rasio | Ukuran Awal (1K) | Target Output (4K) | Total Megapiksel | Status Stock |
|---|---|---|---|---|
| **16:9 Landscape** | `1024 x 576` px | **`4096 x 2304` px** | 9.4 MP | ✅ Lolos Syarat Stock (Min 4 MP) |
| **1:1 Square** | `1024 x 1024` px | **`4096 x 4096` px** | 16.7 MP | ✅ Pristine High-Resolution |
| **3:4 Portrait** | `768 x 1024` px | **`3072 x 4096` px** | 12.5 MP | ✅ Optimal Feed & Poster |
| **4:3 Standard** | `1024 x 768` px | **`4096 x 3072` px** | 12.5 MP | ✅ Standar Galeri Komersial |

*Parameter Kompresi JPEG:* Format JPEG, `quality=98`, `subsampling=0` (4:4:4 tanpa subsampling krominans).

---

## 🏷️ 6. Standar Preservasi & Injeksi Metadata IPTC/XMP via `exiv2`

Upscale gambar secara teknis dapat menghapus header metadata bawaan. Karena itu, setiap proses upscale wajib diikuti dengan preservasi/injeksi metadata komersial:

```bash
# Injeksi IPTC Core Tags via exiv2
exiv2 -M"set Iptc.Envelope.CharacterSet String \x1b%G" \
      -M"set Iptc.Application2.ObjectName String <Judul Deskriptif Komersial>" \
      -M"set Iptc.Application2.Caption String <Deskripsi Detail 100-150 Karakter>" \
      -M"set Iptc.Application2.Byline String Aryansyah" \
      -M"set Iptc.Application2.Copyright String © Aryansyah. All rights reserved." \
      /path/to/output_4k.jpg
```

---

## ✅ 7. QA Checklist Sebelum Upload ke Adobe Stock / Microstock

1. **Resolusi:** Pastikan dimensi sisi terpanjang minimal `4096px` dan ukuran file > 4 MB.
2. **Bebas Artefak:** Periksa pembesaran 100% pada area detail tajam (0 noise cacing, 0 blur, 0 seam lines).
3. **Bebas NaN:** Pastikan tidak ada pixel hitam solid atau kotak abu-abu (garansi via bobot `.pth`).
4. **Metadata Check:** Jalankan `exiv2 -pa output_4k.jpg` dan pastikan `Byline = Aryansyah`, `Keywords >= 25`, dan `0% tag kata AI`.
5. **Kesesuaian CSV:** Pastikan nama file cocok 100% dengan manifes CSV sebelum submit.
