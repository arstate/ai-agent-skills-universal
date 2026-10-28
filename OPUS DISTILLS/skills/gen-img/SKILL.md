---
name: gen-img
description: Generate high-fidelity AI images via 9Router Antigravity (Gemini Nano Banana / Imagen 3). Supports any custom aspect ratio (1:1, 3:4, 4:3, 9:16, 16:9, 4:5, 2:3, 3:2), native HD/1K resolutions, and multimodal image-to-image with local reference image input. Trigger when user types /gen-img, gen-img, asks to generate images, create graphics, or transform reference images.
---

# 🎨 GEN-IMG: AI Image Generation & Reference Skill

Skill untuk pembuatan gambar AI resolusi tinggi melalui **9Router Antigravity** menggunakan arsitektur generative Google **Gemini Nano Banana / Imagen 3**. Mendukung rasio aspek fleksibel, resolusi native HD/1K tajam, dan input gambar referensi (*image-to-image / character preservation*).

---

## ⚡ 1. CARA PENGGUNAAN CEPAT (CLI)

Perintah CLI `gen-img` sudah terpasang global di `$PATH` (`/home/arya/.local/bin/gen-img`).

### A. Generate Gambar Standar (1:1 Square, 1024x1024):
```bash
gen-img "A minimalist modern coffee cup on wooden table, warm sunlight"
```

### B. Generate Gambar Berbagai Aspek Rasio:
```bash
# Rasio 3:4 (Feed Instagram / Carousel, 896x1200 px)
gen-img "Luxury modern house exterior in Surabaya, dusk lighting" -r 3:4

# Rasio 9:16 (Reels / TikTok / Stories, 768x1344 px)
gen-img "Cinematic vertical portrait of futuristic model, cyberpunk neon" -r 9:16

# Rasio 16:9 (Landscape / YouTube Thumbnail, 1344x768 px)
gen-img "Scenic mountain landscape at sunrise, ultra-realistic" -r 16:9

# Rasio 4:3 (Classic Landscape, 1200x896 px)
gen-img "Cozy living room interior, modern elegant styling" -r 4:3

# Rasio 4:5 (Classic IG Portrait, 896x1120 px)
gen-img "Commercial studio product photography of perfume bottle" -r 4:5
```

### C. Image-to-Image / Input Reference Image:
Masukkan path file gambar lokal untuk modifikasi, ganti elemen, atau referensi gaya:
```bash
# Modifikasi objek dari gambar yang sudah ada
gen-img "Keep the exact same cat but change the hat to a glowing blue cyberpunk helmet" \
  -i "/path/to/reference.jpg" \
  -r 3:4 \
  -o "output_cyber_cat.jpg"
```

### D. Simpan ke File Custom & Format JSON:
```bash
# Tentukan path output spesifik
gen-img "Modern property facade with garden" -r 3:4 -o "/tmp/properti_surabaya.png"

# Output format JSON untuk parsing agent
gen-img "Abstract gradient background" --json
```

---

## 📐 2. MATRIKS ASPEK RASIO & RESOLUSI

Semua gambar di-render secara native oleh Gemini Image Engine pada grid ~1.0 Megapixels (Native 1K/HD):

| Rasio | Dimensi Pixel | Kebutuhan Utama | Flag CLI | Model 9Router |
| :--- | :--- | :--- | :--- | :--- |
| **1:1** | `1024 x 1024` | Profil, Square Post | `-r 1:1` | `ag/gemini-3.1-flash-image` |
| **3:4** | `896 x 1200` | Instagram Carousel, Feed Vertikal | `-r 3:4` | `ag/gemini-3.1-flash-image-3x4` |
| **4:3** | `1200 x 896` | Presentasi, Web Banner | `-r 4:3` | `ag/gemini-3.1-flash-image-4x3` |
| **9:16**| `768 x 1344` | Reels, TikTok, IG Stories | `-r 9:16` | `ag/gemini-3.1-flash-image-9x16` |
| **16:9**| `1344 x 768` | YouTube Thumbnail, Landscape | `-r 16:9` | `ag/gemini-3.1-flash-image-16x9` |
| **4:5** | `896 x 1120` | Instagram Feed Classic | `-r 4:5` | `ag/gemini-3.1-flash-image-4x5` |
| **2:3** | `896 x 1344` | Poster, Editorial Portrait | `-r 2:3` | `ag/gemini-3.1-flash-image-2x3` |
| **3:2** | `1344 x 896` | Fotografi Klasik | `-r 3:2` | `ag/gemini-3.1-flash-image-3x2` |

---

## 🖼️ 3. DUKUNGAN REFERENCE IMAGE (IMAGE-TO-IMAGE)

* **Apakah bisa input reference?** **BISA (100% didukung).**
* **Mekanisme Kerja:** Script secara otomatis mengonversi file gambar lokal (`.png`, `.jpg`, `.webp`) menjadi format Data URI base64 (`data:image/jpeg;base64,...`).
* 9Router menyuntikkan data inline gambar ke dalam array `parts` multimodal sebelum prompt teks, memungkinkan model mengenali wajah, pose, layout, atau warna dari gambar sumber.

---

## 🔌 4. INTEGRASI API LANGSUNG (CURL & PYTHON)

### Perintah cURL:
```bash
curl -X POST http://localhost:20128/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-47024d86a10c3a4b-2att59-c53bbf8a" \
  -d '{
    "model": "ag/gemini-3.1-flash-image-3x4",
    "prompt": "Luxury modern villa with swimming pool at sunset",
    "n": 1,
    "output_format": "png"
  }'
```

### Script Python:
```python
import sys
sys.path.append("/home/arya/.gemini/config/skills/gen-img/scripts")
from gen_img import generate_image

res = generate_image(
    prompt="A cute cat wearing a sunglasses",
    ratio="3:4",
    output_path="cat_sunglasses.jpg"
)
print("Saved to:", res["output_path"])
```

---

## 🛡️ 5. SPESIFIKASI SISTEM
- **Engine Provider:** 9Router Antigravity (`http://127.0.0.1:20128`)
- **Default Auth Token:** `Bearer sk-47024d86a10c3a4b-2att59-c53bbf8a`
- **Model Dasar:** `ag/gemini-3.1-flash-image` (Google Gemini Nano Banana 2.1 / Imagen 3)
- **Executable Bin:** `/home/arya/.local/bin/gen-img`
- **Python Source:** `/home/arya/.gemini/config/skills/gen-img/scripts/gen_img.py`
- **Dependencies:** Python 3 Standard Library (Tanpa dependensi pip eksternal).
