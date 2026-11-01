# Panduan Hardware & Katalog Model AI Upscaler (NVIDIA CUDA + Spandrel)

Dokumen ini adalah referensi teknis resmi mengenai hardware target, lingkungan runtime Python, dan spesifikasi arsitektur neural network upscaling yang tersimpan di sistem.

---

## 1. Spesifikasi Hardware Host

| Komponen | Spesifikasi Teknis | Keterangan Operasional |
|---|---|---|
| **GPU** | NVIDIA GeForce GTX 1660 SUPER | Arsitektur Turing TU116, 1408 CUDA cores |
| **VRAM** | 6 GB GDDR6 (14 Gbps) | Batas alokasi aman ~4.8 GB untuk inference |
| **Compute Capability** | SM 7.5 (Turing) | Mendukung FP32, FP16, Tensor Ops |
| **CUDA Toolkit / Driver** | CUDA 12.x | Driver NVIDIA 550+ |
| **Host Python** | Python 3.11 x86_64 | Disertakan di chaiNNer runtime environment |
| **Model Loader** | `spandrel` v0.4.1 + `spandrel_extra_arches` | Universal architecture parser |

---

## 2. Path Runtime Python & Dependency Inti

Executable Python yang memiliki dependensi lengkap (`spandrel`, `spandrel_extra_arches`, `torch` CUDA, `torchvision`, `PIL`, `numpy`) berada di:
```bash
/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/chaiNNer-linux-x64/python/python/bin/python3.11
```

Script launcher `upscale-img` dan `boost` otomatis mendeteksi path ini sebelum fallback ke sistem `python3`.

---

## 3. Direktori Model & Daftar Bobot Neural Network

Lokasi penyimpanan model upscale:
```bash
/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/UPSCALE MODEL/
```

### Rincian Arsitektur & Rekomendasi Penggunaan:

### A. `4xNomos8kSCHAT-S.pth` (DAT/HAT Transformer Attention — 81.096.929 bytes)
- **Arsitektur:** SCHAT (Shifted Window & Channel Attention Transformer).
- **Skala:** 4X.
- **Rekomendasi Utama:** Asset 3D fluid, liquid gold chrome, ribbon velvet, origami kertas, partikel glitter, tekstur logam, dan ornamen mewah.
- **Karakteristik:** Menghasilkan batas tepi yang tajam tanpa artefak halo, mempertahankan mikro-tekstur tanpa efek plastik (plasticky/waxy).
- **Benchmarking Waktu:** ~0.99 detik per tile 256x256 pada GTX 1660 SUPER.

### B. `4x_NMKD-Superscale-SP_178000_G.pth` (ESRGAN / Residual-in-Residual Dense — 66.958.607 bytes)
- **Arsitektur:** ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks).
- **Skala:** 4X.
- **Rekomendasi:** Fotografi alami, culinary flatlay, dedaunan pinus, kulit buah, potret manusia, dan tekstur kayu.
- **Karakteristik:** Sangat natural untuk tekstur organik dan noise fotografi nyata.

### C. `4xNomos8k_atd_jpg.safetensors` (ATD Architecture — 81.689.540 bytes)
- **Arsitektur:** ATD (Adaptive Transformer De-artifacting).
- **Skala:** 4X.
- **Rekomendasi:** Input gambar stock lama dengan artefak blok kompresi JPEG berat.
- **Karakteristik:** Menghaluskan compression blocking artifacts sambil merekonstruksi detail frekuensi tinggi.

### D. `4xNomos2_hq_drct-l.safetensors` (DRCT-L Architecture — 242.543.780 bytes)
- **Arsitektur:** Dense Residual Connected Transformer (Large).
- **Skala:** 4X.
- **Rekomendasi:** Hasil ultra photorealistic komersial tingkat tinggi.
- **Karakteristik:** Kapasitas parameter terbesar (242 MB) dengan rekonstruksi tekstur paling padat.

### E. `4xNomosWebPhoto_RealPLKSR.safetensors` (RealPLKSR Architecture — 29.590.440 bytes)
- **Arsitektur:** Real Partial Large Kernel Super-Resolution.
- **Skala:** 4X.
- **Rekomendasi:** Foto web, media sosial, dan potret umum.
- **Karakteristik:** Cepat dan efisien dengan bobot ringkas 29 MB.

### F. `4xNomos8k_span_otf_strong.pth` (SPAN Architecture — 9.015.866 bytes)
- **Arsitektur:** Swift Parameter-free Attention Network (SPAN).
- **Skala:** 4X.
- **Rekomendasi:** Batch inference berkecepatan tinggi pada ratusan aset visual.
- **Karakteristik:** Bobot sangat kecil (9 MB) dengan kecepatan eksekusi 2x lebih cepat dibanding Transformer.

### G. `2xNomosUni_span_multijpg.safetensors` (SPAN 2X — 8.903.384 bytes)
- **Arsitektur:** SPAN.
- **Skala:** 2X.
- **Rekomendasi:** Kebutuhan pembesaran 2X (misal: dari 2K ke 4K atau 1K ke 2K).

### H. `OmniSR_X4_DIV2K.safetensors` & `OmniSR_X2_DIV2K.safetensors` (Omnidirectional SR — ~1.7 MB)
- **Arsitektur:** Omni-Super-Resolution.
- **Skala:** 4X dan 2X.
- **Rekomendasi:** Model ultra-kompak untuk uji cepat dan beban memori minimal.

---

## 4. Analisis Kegagalan Model ONNX FP16 (`4xNomos8kSCHAT-S.onnx`)

File `4xNomos8kSCHAT-S.onnx` di direktori model adalah hasil ekspor ONNX dengan kuantisasi FP16 yang cacat pada lapisan softmax attention:
1. Normalisasi bobot attention pada lapisan tertentu menghasilkan nilai pembagi 0 (division by zero), yang menghasilkan nilai `NaN` (*Not a Number*).
2. Nilai `NaN` merambat ke seluruh layer output tensor, menghasilkan gambar kosong hitam pekat (`#000000`) atau artefak abu-abu monoton.
3. Oleh karena itu, runtime sistem memblokir penggunaan file `.onnx` tersebut dan secara absolut mengunci penggunaan file bobot PyTorch asli `.pth` melalui engine `spandrel`.
