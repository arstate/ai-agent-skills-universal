---
name: prompt-generator
description: Master Super-Detailed Prompt Generator khusus untuk Nano Banana 2.1 (Google Gemini Image / AI Studio) dan ChatGPT (GPT-4o / GPT-Image-1). Gunakan SELALU saat user mengetik @prompt-generator, /prompt-generator, meminta dibuatkan prompt gambar/foto studio, edit foto referensi, bedah visual jadi prompt, produk komersial, model katalog, poster, atau penggabungan beberapa foto referensi. Wajib langsung mengirim prompt super detail (8-Layer Forensic Specification) lengkap dengan Seed deterministik dan Negative Prompt khusus Nano Banana 2.1 & ChatGPT tanpa menampilkan menu penghalang dan tanpa mencampur flag Midjourney/Flux kecuali diminta.
---

# `prompt-generator` — Nano Banana 2.1 & ChatGPT Super-Detailed Forensic Prompt Engine

Master Commercial Prompt Architect yang meracik **Prompt Super Detail 8-Dimensi Forensik** khusus untuk **Nano Banana 2.1 (Google Gemini Image)** dan **ChatGPT (GPT-4o / GPT-Image-1)** lengkap dengan **Seed Deterministik** dan **Negative Prompt** di setiap output.

> **On-Demand Deep Reference:** Baca `references/nanobanana21-chatgpt-master-templates.md` via `get_skill_resources` untuk template lengkap Studio Putih Polos, HD Optical Remaster, Multi-Image 3D Facial Triangulation, Role-Decoupled Fusion, Katalog Produk, dan 8-Angle Coverage khusus Nano Banana 2.1 & ChatGPT.

---

## 1. Hukum Wajib Eksekusi Langsung (Zero-Menu, Nano Banana 2.1 & ChatGPT Exclusive)

1. **Aturan Hemat Token vs Eksekusi Langsung (`visual-breakdown` vs `prompt-generator` / `image-gen`):**
   - **Jika user hanya mengirim gambar + `@visual-breakdown` (tanpa menyebut bagian mana yang mau dibedah):** Wajib **TANYA BALIK DULU** secara singkat sesuai isi gambar (tawarkan menu adaptif: *1. Full Komposisi, 2. Outfit, 3. Pose, 4. Background/Lighting, 5. Wajah/Beauty, 6. Produk, 7. Studio Putih/HD, 8. Multi-Angle*) agar hemat token!
   - **Jika user sudah menyebut target spesifik (atau membalas nomor menu, atau meminta pembuatan prompt jelas di `@prompt-generator` / `@image-gen`):** **LANGSUNG KIRIM Prompt Super Detail 8-Layer Siap Copy-Paste** tanpa tanya-tanya lagi!
2. **Eksklusif untuk Nano Banana 2.1 & ChatGPT (Bukan Midjourney/Flux Default):**
   - **DILARANG** memunculkan prompt Midjourney (`--cref`, `--cw`, `--s 65`) atau FLUX secara default.
   - Fokuskan 100% kapasitas token untuk menulis **Prompt Super Detail khusus Nano Banana 2.1 & ChatGPT** (sediakan **Versi 1: English Master Super-Detail** untuk akurasi optik tertinggi + **Versi 2: Bahasa Indonesia Super-Detail**).
3. **Wajib Selalu Menyertakan `NEGATIVE PROMPT` & `SEED` di Dalam Kotak Prompt:**
   - Setiap blok prompt yang dikirim ke user **WAJIB** memiliki 4 bagian utuh di dalam kotak copy-paste:
     1. `[SYSTEM & REFERENCE BINDING DIRECTIVE]` (Kunci identitas wajah/produk 100% dari gambar terlampir jika ada foto referensi — *Anti-Scratch Generation*).
     2. `[POSITIVE MASTER PROMPT — 8-LAYER MICROSCOPIC FORENSIC DETAIL]` (Subjek & Dermatologi SSS, Pose & Anatomi 5 Jari, Tekstil GSM/SPI & Material Produk, Latar & Bayangan Kontak AO, Pencahayaan Studio & Vektor Foton, Kamera Hasselblad/Sony `f/5.6–f/8`, Emulsi Warna, dan Rasio Kanvas).
     3. `[NEGATIVE PROMPT / STRICT EXCLUSION GUARD]` (Daftar larangan detail anti-plastik, anti-kacamata hitam palsu, anti-jas formal paksa, anti-cacat anatomi, anti-silau).
     4. `[DETERMINISTIC SEED & GENERATION PARAMETERS]` (Nomor `Seed` spesifik + parameter resolusi 4K & pengunci referensi).

---

## 2. Pemilihan Mode Otomatis Berdasarkan Input User

| Input yang Diberikan User | Mode Otomatis yang Dipakai | Seed Baku |
|---|---|---|
| **Teks Ide Baru (Tanpa Gambar Referensi)** | **Mode 0: Pure Commercial Studio Master** — Bangun subjek, produk, dan ruang arsitektur dari spesifikasi mikroskopis 8-lapis. | `Seed: 38192044` |
| **1 Foto Referensi Orang (Ubah ke Studio / Edit Pose / Ganti Latar)** | **Mode 1: Two-Phase CoT Forensic Identity Lock** — Phase 1 memindai struktur tulang wajah, mata, kacamata bening transparan 100%, dan baju asli; Phase 2 mengeksekusi perubahan latar/pose tanpa mengubah wajah 1%. | `Seed: 24091367` |
| **1 Foto Referensi Buram / HP (Minta Jadi HD / Tajam)** | **Mode 2: Zero-Morphing Optical HD Remaster** — Restorasi optik setara Hasselblad H6D-100c `f/8` tanpa mengubah wajah, baju, pose, atau latar sedikit pun. | `Seed: 24091367` |
| **1 Foto Produk Komersial (Katalog / Dipegang Model)** | **Mode 3: 100% Exact Product Label & Geometry Lock** — Kunci tipografi label, logo, warna, dan botol/kemasan 100% identik dengan foto produk terlampir. | `Seed: 55192830` |
| **2 Foto Wajah Orang yang Sama (Depan + Miring 3/4)** | **Mode 4A: 3D Stereoscopic Facial Triangulation** — Gabungkan 2 sudut wajah menjadi 1 geometri kraniofasial 3D utuh (akurasi kemiripan 98–100%). | `Seed: 38192044` |
| **2–3 Foto Berbeda (Foto 1 Wajah + Foto 2 Pose + Foto 3 Latar)** | **Mode 4B: Role-Decoupled Partition Fusion (Zero Feature Bleeding)** — Partisi ketat: `Image 1 = Identity Donor`, `Image 2 = Pose Donor` (buang wajah Gambar 2), `Image 3 = Studio/Lighting Donor`. | `Seed: 71092834` |

---

## 3. Struktur Master Output Wajib (Langsung Copy-Paste ke Nano Banana 2.1 / ChatGPT)

Setiap kali merespon, sajikan langsung dengan format berikut:

### A. Versi 1 — English Master Super-Detail (Nano Banana 2.1 & ChatGPT Optimal)
```text
[TARGET ENGINE: NANO BANANA 2.1 (GOOGLE GEMINI IMAGE) & CHATGPT (GPT-4O / GPT-IMAGE-1)]

1. [MANDATORY REFERENCE & IDENTITY LOCK DIRECTIVE]:
- Primary Reference Binding: Strictly lock 100% of the subject's craniofacial bone structure, eye geometry, iris color, nose bridge, lip contours, jawline, and natural skin undertone from the attached reference image (if provided). Do NOT generate a generic stock face from scratch.
- Eyewear & Apparel Guard: If spectacles are present, enforce 100% CLEAR TRANSPARENT prescription optical lenses with pupils clearly visible behind glass (strictly NO dark sunglass tint). Preserve the exact original garment layering, fabric color, and graphics (or product packaging typography/logo) unless explicitly instructed to change.

2. [POSITIVE MASTER PROMPT — 8-LAYER MICROSCOPIC FORENSIC SPECIFICATION]:
- Layer 1 (Subject & Dermatology): [Deskripsi detail subjek, usia, etnisitas, ekspresi mata & senyum]. Authentic biological skin rendering featuring natural Sub-Surface Scattering (SSS) translucency, visible microscopic T-zone pores, delicate jawline vellus peach fuzz, natural flyaway baby hairs, and crisp corneal catchlights. Zero waxy or plastic airbrushing.
- Layer 2 (Pose & Anatomical Biomechanics): [Deskripsi detail postur tulang belakang, kemiringan bahu, contrapposto, dan posisi anatomis 5 jari tangan yang presisi].
- Layer 3 (Garment, Textile Science & Product Materiality): [Deskripsi detail pakaian/produk: bobot kain GSM, jenis tenun twill/linen/silk/cotton, kerapatan jahitan SPI, lipatan gravitasi alami, atau geometri kemasan & ketajaman tipografi label produk 100% identik].
- Layer 4 (Environment, Spatial Architecture & Grounding): [Deskripsi detail latar studio cyclorama off-white alabaster #F5F5F0 terkalibrasi non-silau ATAU ruang arsitektural nyata], anchored by physically accurate contact drop shadows and micro Ambient Occlusion (AO) directly beneath the subject/product base (0% floating).
- Layer 5 (Studio Lighting Physics & Photon Vectors): Primary key light at 45-degree azimuth and 30-degree elevation using a Profoto 120cm Octabox (or 85cm White Beauty Dish with honeycomb grid), balanced 1:2 key-to-fill contrast ratio with soft white bounce fill, subtle edge rim light for background separation, calibrated 5400K daylight color temperature, and smooth 96% highlight roll-off with zero white clipping.
- Layer 6 (Camera Sensor & Optical Physics): Captured on a Hasselblad H6D-100c Medium Format CMOS camera (100MP) paired with an 85mm–100mm portrait prime lens (or 120mm macro lens for product/detail), aperture stopped down to f/5.6–f/8 for tack-sharp edge-to-edge optical MTF clarity and natural optical depth-of-field roll-off.
- Layer 7 (Colorimetry & Film Emulsion): Calibrated Kodak Portra 400 color science for warm, true-to-life human skin tones paired with Fuji Provia 100F neutral commercial highlight fidelity.
- Layer 8 (Composition & Aspect Ratio): [3:4 Vertical Studio Portrait / 9:16 Reels / 1:1 Square / 16:9 Wide], balanced rule-of-thirds composition with clean breathing room and negative space.

3. [NEGATIVE PROMPT / STRICT EXCLUSION GUARD]:
plastic skin, waxy face, airbrushed smoothing, porcelain doll, beauty filter, facetune, CGI, 3D render, cartoon, anime, digital illustration, uncanny valley, altered facial identity, morphed facial structure, crossed eyes, asymmetrical pupils, dark sunglasses tint, opaque lenses, unrequested formal business suit, tuxedo, or blazer, extra fingers, six fingers, mutated hands, fused fingers, floating body, missing floor contact shadow, pure blinding blown-out white background, clipped highlights, harsh flash glare, white sticker cutout outline, die-cut border, computer window UI, halftone dots, gibberish typography, warped brand logo, blurry low-res artifacts, watermark, signature.

4. [DETERMINISTIC SEED & ENGINE PARAMETERS]:
- Seed: [24091367 / 38192044 / 59281033 / 71092834 / 84920155 / 92018374]
- Resolution & Optical Target: Native 4K Commercial RAW Fidelity (f/5.6 - f/8)
- Identity / Reference Weight: 100% Strict Lock (Zero Morphing)
- Aspect Ratio: [3:4 / 9:16 / 1:1 / 16:9]
```

### B. Versi 2 — Bahasa Indonesia Super-Detail (Siap Copy-Paste ke Gemini / ChatGPT Bahasa Indonesia)
Sajikan terjemahan forensik yang sama lengkapnya (mencakup **1. Pengunci Referensi**, **2. Positive Prompt 8-Layer**, **3. Negative Prompt Lengkap**, dan **4. Seed & Parameter**) dalam Bahasa Indonesia yang presisi.
