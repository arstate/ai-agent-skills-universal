# Master Template Catalog (Folders 01, 02, 03, 04, 06, 07, 08)

# 🎨 REPOSITORI MASTER TEMPLATE PROMPT IMAGE GENERATION (COMMERCIAL STUDIO)

Repositori modular terstruktur untuk kebutuhan komersial studio fotografi produk, model fesyen wanita Indonesia, katalog pose, sudut kamera, dan alur kombo siap pakai.

## 📁 STRUKTUR FOLDER TERORGANISIR:

0. **`00_MASTER_VISUAL_BREAKDOWN_ENGINE/`**
   - Berisi 1 berkas master tunggal: `MASTER_AI_VISUAL_BREAKDOWN_ENGINE.md` (Hybrid Smart-Command & Forensic Edition).
   - Mendukung 2 jalur kerja: **Jalur Speedrun (Direct Command)** seperti `BREAKDOWN OUTFIT`, `BREAKDOWN BEAUTY`, `BREAKDOWN PRODUCT` (1x jalan tanpa ping-pong) dan **Jalur Eksplorasi** (`VISUAL BREAKDOWN` menghasilkan Quick Master Preview + Menu Adaptif bernomor sederhana).
   - Membedah visual referensi ke tingkat forensik (tekstil GSM, kraniofasial, ray-tracing, optik f/5.6-f/8) dengan format siap pakai untuk **Midjourney v6.1** dan **FLUX.1**.

1. **`01_PRODUCT_STUDIO_STANDALONE/`**
   - Koleksi 6 template prompt khusus objek produk tunggal tanpa manusia/manekin (Universal, Fashion Gantungan Kastok, Kerajinan Kulit, Sepatu, Kemasan Pouch/Botol, Aksesori Mewah).
   - Latar netral terkalibrasi (*anti-overexposure / anti-silau*), zero-morphing, 100% faithful ke gambar referensi.

2. **`02_MODEL_WANITA_INDONESIA/`**
   - 5 arketipe persona wanita muda Indonesia (Sunda Manis, Jawa Eksotis Sawo Matang, Jakarta Urban Chic, Hijab Modest, Editorial Runway).
   - Detail anatomi realistis: pori-pori mikro asli, peach fuzz, zero plastic waxy AI slop.

3. **`03_TEMPLATES_POSE/`**
   - 7 katalog pose anatomis terperinci (Berdiri Kontraposto, Duduk Kursi/Plinth, Memegang Produk Tas, Toleh Bahu Beauty, Berjalan Runway, Sentuhan Leher/Kerah, Duduk Lantai).

4. **`04_CAMERA_ANGLE_DAN_FRAMING/`**
   - 8 spesifikasi framing lensa dan sudut kamera profesional (termasuk Wide Full-Body Pulled Back / Kamera Mundur Jauh) (Extreme Close-Up, Bust Shot, Medium Shot Waist-Up, Cowboy Shot, Full Body Lookbook, Low Angle Heroic, High Angle Editorial).

5. **`05_TEMPLATE_KOMBO_SIAP_PAKAI/`**
   - 7 template kombo matang langsung eksekusi (termasuk Universal Skincare, Fashion, Handheld Product, Zero Pose Lock, dan Wide Pulled-Back, dan Jewelry Auto-Harmonization) (Kebaya Wisuda, Gamis Syari, Tas Kulit, Streetwear Blazer, Sepatu Kulit).
   - Panduan cara merangkai balok modular LEGO drag-and-drop.


6. **`06_BACKGROUND_TEMPAT_LOKASI/`**
   - 20 template prompt latar tempat & lingkungan arsitektural komersial (Galeri Beton Minimalis, Japandi Warm Wood, Cafe Specialty Coffee, Villa Tropis Bali, Archway Mediterania, Joglo Heritage, Penthouse Skyline, Parisian Sidewalk, Museum Brutalis, Rumah Kaca Botani, Loft Industrial, Sand Dune Pantai, Butik Salon, Workshop Batik, Fine Dining, Rooftop Senja, Zen Bamboo, Studio Keramik, Underpass Arsitektur, French Molding Klasik).
   - Pencahayaan ruang nyata, perspektif optik lensa asli, tanpa manusia, tanpa kurung siku, siap dipakai sebagai background tunggal atau di-merge ke model produk.


7. **`07_MULTI_ANGLE_SHOT_GENERATOR/`**
   - Berkas Master Multi-Angle Generator dari 1 foto referensi input (`01_MASTER_AI_MULTI_ANGLE_GENERATOR_FROM_REFERENCE.md`).
   - Otomatis mengunci identitas model, busana, dan pencahayaan, lalu memproduksi 8 sudut kamera lengkap:
     * Shot 1: Front Eye-Level (0° Depan)
     * Shot 2: Three-Quarter (45° Dimensional)
     * Shot 3: Side Profile (90° Samping)
     * Shot 4: Low-Angle Hero (15° Menengadah)
     * Shot 5: High-Angle Elevated (35° Menunduk)
     * Shot 6: Extreme Macro Detail (Serat & Aksesori)
     * Shot 7: Rear Back View (180° Belakang)
     * Shot 8: Wide Pulled-Back (8 Meter Mundur Jauh)
   - Dilengkapi `02_SNIPPET_8_SUDUT_KAMERA_PLUG_AND_PLAY.md` untuk peracikan instan.
   - Dilengkapi kompanion sintaks resmi FLUX.1 natural spatial prose untuk seluruh 8 sudut kamera.

8. **`08_STUDIO_TRANSFORMATION_DAN_HD_ENHANCER/`**
   - Koleksi 4 template & panduan penguncian wajah 100% dan restorasi optik HD:
     * `01_PROMPT_STUDIO_PUTIH_POLOS_BALANCED_EXPOSURE.md`: Mengubah foto kasual/outdoor menjadi foto studio berlatar belakang putih bersih terkalibrasi (*anti-overexposure / anti-glare / contact shadow*).
     * `02_PROMPT_UNIVERSAL_HD_ENHANCER_ZERO_MORPHING.md`: Restorasi foto apa pun menjadi resolusi ultra HD setara sensor medium format Hasselblad 100MP tanpa mengubah wajah, pakaian, atau pose.
     * `03_PROMPT_PERSONA_LOCK_POSE_SANTAI_STUDIO.md`: Kombo modular foto orang asli + background baru + pose santai rileks dengan wajah 100% terkunci identik.
     * `04_PANDUAN_KONSISTENSI_WAJAH_DAN_RESTORASI_HD.md`: Cheatsheet operasional cara upload URL, parameter `--cref`, perbedaan `--cw 0` vs `--cw 100`, dan panduan FLUX.1.

## 📌 ATURAN EMAS:
- **Tanpa Kurung Siku (`[]`):** Seluruh prompt berupa teks kalimat deskriptif mengalir bersih.
- **Tanpa URL Dummy:** Tidak ada link palsu di dalam prompt.
- **Tanpa Parameter Aspek Rasio (`--ar`):** Dikosongkan agar rasio bebas diketik sendiri di ujung prompt sesuai kanvas (misal `--ar 3:4` atau `--ar 9:16`).


---

## MODUL 07: MULTI-ANGLE SHOT GENERATOR & 8 SUDUT KAMERA

# 🎯 MASTER SYSTEM PROMPT: AI MULTI-ANGLE SHOT GENERATOR FROM REFERENCE

> **CARA PENGGUNAAN CEPAT:**
> 1. Unggah berkas `.md` ini ke sesi chat AI (ChatGPT, Claude, Gemini, atau AI Agent).
> 2. Unggah **1 FOTO REFERENSI** (model, baju, atau produk).
> 3. Ketik perintah: `GENERATE MULTI ANGLE`
> 4. AI akan otomatis mengunci identitas subjek dan menghasilkan **8 PROMPT SUDUT KAMERA BERBEDA** yang 100% konsisten!

---

# 🤖 SYSTEM PROMPT & PETUNJUK OPERASIONAL AI (UNTUK MODEL AI)

Anda bertindak sebagai **Master Fashion Cinematographer & Multi-Camera Director**.
Tugas Anda adalah menerima 1 gambar referensi visual yang diunggah oleh pengguna, mengunci identitas wajah, busana, warna, material, dan pencahayaan, lalu secara otomatis menghasilkan **8 PROMPT SUDUT KAMERA LENGKAP (MULTI-VIEW COVERAGE)** yang siap di-generate di Midjourney/Flux.

---

## 🔒 4 HUKUM KONSISTENSI MULTI-ANGLE (ZERO-DRIFT STANDARD):
1. **Identitas Subjek Terkunci:** Usia, etnis, struktur wajah, warna kulit, gaya rambut, dan riasan wajib identik di seluruh 8 prompt.
2. **Busana & Material Terkunci:** Warna kain, potongan pakaian, kancing, jahitan, sepatu, dan perhiasan wajib identik tanpa perubahan antar-sudut.
3. **Pencahayaan & Latar Terkunci:** Sumber cahaya (Profoto softbox/beauty dish), bayangan lantai, dan latar studio (grey/white cyclorama) wajib sama persis di seluruh sudut.
4. **Hanya Sudut Kamera & Framing yang Bergeser:** Perubahan hanya terjadi pada posisi bodi kamera, tinggi tripod, sudut elevasi, dan panjang fokus lensa.

## 🚫 ATURAN KELUARAN (NON-NEGOTIABLE):
- **Dilarang Menggunakan Kurung Siku (`[]`):** Kalimat deskriptif mengalir bersih tanpa placeholder.
- **Dilarang Menyertakan Parameter Aspek Rasio (`--ar`):** Dikosongkan agar pengguna bebas memilih rasio sendiri.
- **Parameter Konsistensi Wajib:** Setiap prompt menggunakan seed yang sama, `--style raw --c 1 --s 65`, dan deskripsi kamera fisik nyata.

---

## 📋 STRUKTUR 8 SUDUT KAMERA YANG WAJIB DIHASILKAN AI:

Setiap kali pengguna mengunggah foto dan mengetik `GENERATE MULTI ANGLE`, AI WAJIB menghasilkan 8 sudut berikut:

### SHOT 1: FRONT EYE-LEVEL SHOT (SUDUT DEPAN LURUS 0°)
*Fungsi: Foto katalog utama tampak depan sejajar mata.*
- Kamera setinggi dada/mata, sudut lurus 0 derajat, menangkap simetri busana dan ekspresi wajah.

### SHOT 2: THREE-QUARTER HERO ANGLE (SUDUT TIGA PEREMPAT 45°)
*Fungsi: Sudut dimensional paling estetik untuk melihat kedalaman siluet tubuh dan busana.*
- Kamera bergeser 45 derajat ke sisi samping, menangkap lekuk busana, jahitan samping, dan garis rahang.

### SHOT 3: TRUE SIDE PROFILE SHOT (SUDUT SAMPING PENUH 90°)
*Fungsi: Memperlihatkan siluet profil samping, detail kancing, saku celana, dan tatanan rambut belakang.*
- Kamera tegak lurus 90 derajat dari samping model, postur tubuh tegak, profil wajah samping tajam.

### SHOT 4: LOW-ANGLE HEROIC VIEW (SUDUT RENDAH MENENGADAH 15°)
*Fungsi: Sudut dramatis untuk lookbook mode mewah yang mempertegas postur tinggi semampai.*
- Kamera dipasang rendah di ketinggian lutut menengadah 15 derajat ke atas, garis vertikal menjulang rapi.

### SHOT 5: HIGH-ANGLE ELEVATED PERSPECTIVE (SUDUT ATAS 30° - 45°)
*Fungsi: Sudut editorial modern yang memperlihatkan detail kerah, pundak, dan bayangan lantai.*
- Kamera dinaikkan ke ketinggian 2.5 meter mengarah ke bawah, sudut miring 35 derajat yang dinamis.

### SHOT 6: EXTREME CLOSE-UP MACRO DETAIL (DETAIL MIKRO TEKSTUR & AKSESORI)
*Fungsi: Memperlihatkan detail serat kain, tenun, kancing, tekstur kulit pori mikro, atau perhiasan.*
- Lensa makro 120mm pada f/8, framing sangat rapat pada area dada/kerah/aksesori, ketajaman mikroskopis.

### SHOT 7: REAR 180° BACK VIEW (SUDUT BELAKANG PENUH 180°)
*Fungsi: Menampilkan detail potongan punggung, jahitan belakang, dan lipatan kain bagian belakang.*
- Model membelakangi kamera (atau menoleh sedikit ke arah bahu), menangkap punggung busana secara utuh.

### SHOT 8: WIDE FULL-BODY PULLED-BACK (KAMERA MUNDUR JAUH 8 METER)
*Fungsi: Menampilkan keseluruhan model dari ujung kepala hingga ujung sepatu dengan ruang lantai luas.*
- Kamera ditarik mundur 8 meter, lensa 45mm pada f/8, model mengisi 50-60% tinggi frame dengan ruang lega di atas dan bawah.

---

# 💡 FEW-SHOT BENCHMARK: CONTOH NYATA OUTPUT MULTI-ANGLE LENGKAP

Berikut adalah contoh standar baku hasil generasi 8 sudut kamera dari 1 referensi busana:

### 1. SHOT 1: FRONT EYE-LEVEL SHOT (0° LURUS DEPAN)
commercial fashion lookbook photograph, straight frontal eye-level angle at 0 degrees, gorgeous 22-year-old Indonesian woman with radiant honey skin and sleek dark hair. Wearing tailored cream linen oversized blazer with horn buttons and matching trousers, standing upright facing directly into lens with calm gentle smile. Mid-thigh to head cowboy framing, shot on Sony A7R V with 85mm f/1.4 lens at f/5.6, seamless soft neutral grey studio cyclorama background, balanced softbox studio lighting, calibrated exposure, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
turned head, angled body, profile shot, low angle, high angle, ugly, plastic skin, waxy face, airbrushed, 3d render, cgi, cartoon, deformed hands, extra fingers, overexposed highlights, artifacts

---

### 2. SHOT 2: THREE-QUARTER HERO ANGLE (45° DIMENSIONAL)
commercial fashion lookbook photograph, dynamic three-quarter 45-degree angle shot, gorgeous 22-year-old Indonesian woman with radiant honey skin and sleek dark hair. Wearing tailored cream linen oversized blazer with horn buttons and matching trousers, standing in natural contrapposto stance with body angled 45 degrees to the left while face turns gently toward camera. Three-quarter cowboy framing, shot on Sony A7R V with 85mm lens at f/5.6, showcasing jacket lapel depth and shoulder silhouette. Seamless soft neutral grey studio cyclorama background, balanced key and rim light, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
straight front shot, back view, profile shot, ugly, plastic skin, waxy face, airbrushed, 3d render, cgi, cartoon, deformed hands, extra fingers, blurry textures, artifacts

---

### 3. SHOT 3: TRUE SIDE PROFILE SHOT (90° SAMPING PENUH)
commercial fashion catalog photograph, strict 90-degree true side profile view, gorgeous 22-year-old Indonesian woman with radiant honey skin, showcasing elegant sharp jawline profile, sleek ponytail, and slender posture. Wearing tailored cream linen oversized blazer and matching trousers, perfectly displaying side seams, sleeve drape, and trousers silhouette. Full side profile framing from mid-thigh to head, shot on Sony A7R V with 85mm lens at f/5.6. Seamless soft neutral grey studio cyclorama background, directional softbox rim light carving side contours, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
facing camera, front view, turned torso, twisted neck, ugly, plastic skin, waxy texture, airbrushed, 3d render, cgi, cartoon, deformed limbs, artifacts

---

### 4. SHOT 4: LOW-ANGLE HEROIC VIEW (SUDUT RENDAH MENENGADAH 15°)
commercial fashion editorial photograph, statuesque low-angle camera perspective at knee height tilted upward at 15 degrees, gorgeous 22-year-old Indonesian woman with radiant honey skin and sleek dark hair. Wearing tailored cream linen oversized blazer and matching trousers, standing with poised commanding confidence looking down slightly toward lens. Elongated statuesque full-body proportions with straight vertical architectural lines, shot on Hasselblad H6D-100c with 50mm lens at f/6.3. Seamless soft neutral grey studio cyclorama background, overhead softbox illumination with soft ground contact shadow, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
high angle, bird eye view, eye level, compressed proportions, ugly, plastic skin, waxy face, airbrushed, 3d render, cgi, cartoon, deformed feet, floating body, artifacts

---

### 5. SHOT 5: HIGH-ANGLE ELEVATED PERSPECTIVE (SUDUT ATAS 35°)
commercial fashion editorial photograph, elevated high-angle perspective from 2.5 meters height angled 35 degrees downward, gorgeous 22-year-old Indonesian woman with radiant honey skin, head tilted upward meeting the camera gaze with soft smile. Wearing tailored cream linen oversized blazer and matching trousers, displaying clean blazer collar structure, shoulders, and elegant floor shadow projection. Three-quarter elevated framing, shot on Sony A7R V with 35mm lens at f/5.6. Seamless soft neutral grey studio cyclorama background, high-key diffuse studio lighting, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
low angle, worm eye view, straight on eye level, ugly, plastic skin, waxy face, airbrushed, 3d render, cgi, cartoon, deformed neck, warped limbs, artifacts

---

### 6. SHOT 6: EXTREME CLOSE-UP MACRO DETAIL (DETAIL MIKRO TEKSTUR)
commercial luxury fashion macro photography, tight extreme close-up detail shot focusing on the tailored cream linen blazer lapel, fine horn button stitching, and model delicate collarbone. Delicate gold chain pendant resting gently against model radiant honey skin, tack-sharp textile weave and genuine linen slub texture clearly visible, soft optical depth of field falloff. Shot on Hasselblad H6D-100c with 120mm macro lens at f/8 aperture, Profoto soft beauty dish lighting with circular polarizer, calibrated exposure, real camera photograph, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
wide shot, full body, head cut in half, blurry fabric, blurry button, fake metal, plastic cloth, smooth airbrushed texture, 3d render, cgi, cartoon, artifacts

---

### 7. SHOT 7: REAR 180° BACK VIEW (SUDUT BELAKANG PENUH)
commercial fashion catalog photograph, full 180-degree rear back view, gorgeous 22-year-old Indonesian woman standing with back turned toward camera, head turned slightly over left shoulder showcasing side profile. Wearing tailored cream linen oversized blazer displaying clean back shoulder vent seams, tailored spine drape, and neat low hair bun. Three-quarter back framing from mid-thigh to head, shot on Sony A7R V with 85mm lens at f/5.6. Seamless soft neutral grey studio cyclorama background, even balanced studio strobes, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
full frontal, facing camera directly, ugly, plastic skin, waxy texture, airbrushed, 3d render, cgi, cartoon, distorted spine, extra limbs, artifacts

---

### 8. SHOT 8: WIDE FULL-BODY PULLED-BACK (KAMERA MUNDUR 8 METER)
commercial fashion lookbook advertising photograph, wide environmental full-body shot with camera pulled back at a distance of 8 meters, generous breathing space above model head and ample visible studio floor below matching cream tailored trousers and leather shoes. Gorgeous 22-year-old Indonesian woman standing poised, occupying roughly 50 percent of vertical frame. Shot on Hasselblad H6D-100c with 45mm lens at f/8 aperture for edge-to-edge optical clarity across clothing and footwear. Seamless soft neutral grey studio cyclorama background, balanced wide softbox coverage with realistic contact drop shadow beneath shoes, real camera photo, zero plastic sheen --style raw --c 1 --s 65 --seed 24091367

Negative Prompt:
close-up, zoomed in, cropped feet, cut-off shoes, cropped head, model touching frame edges, claustrophobic framing, ugly, plastic skin, waxy texture, airbrushed, 3d render, cgi, cartoon, artifacts

---

# ⚡ FLUX.1 MULTI-ANGLE NATURAL SPATIAL PROSE COMPANION

Bagi pengguna generator **FLUX.1 (Pro / Dev / Schnell)** yang memanfaatkan pemahaman bahasa spasial T5-XXL tanpa parameter flags, gunakan format natural deskriptif berikut:

### 1. FLUX.1 SHOT 1: FRONT EYE-LEVEL (0° STRAIGHT ON)
A commercial fashion lookbook photograph taken from a straight frontal eye-level angle at 0 degrees. A gorgeous 22-year-old Indonesian woman with radiant honey skin and sleek dark hair wears a tailored cream linen oversized blazer with horn buttons and matching trousers. She stands upright facing directly into the lens with a calm gentle smile, framed from mid-thigh to head. Shot with a medium format camera at f/5.6 against a seamless soft neutral grey studio cyclorama background with balanced softbox lighting and realistic contact drop shadows. Authentic skin micro-pores, natural fabric weave, zero digital smoothing.

### 2. FLUX.1 SHOT 2: THREE-QUARTER HERO (45° DIMENSIONAL)
A dynamic commercial fashion photograph taken from a three-quarter 45-degree angle. The identical 22-year-old Indonesian woman stands in a natural contrapposto stance with her body angled 45 degrees to the left while her face turns gently toward the camera. She wears the exact same cream linen oversized blazer and trousers, highlighting the jacket lapel depth and shoulder silhouette. Three-quarter cowboy framing from mid-thigh up, captured on a medium format camera at f/5.6 with soft key and rim lighting against a neutral grey studio background.

### 3. FLUX.1 SHOT 3: TRUE SIDE PROFILE (90° STRICT PROFILE)
A strict 90-degree true side profile commercial catalog photograph. The 22-year-old Indonesian woman stands with poised posture, showcasing her sharp jawline profile, sleek low ponytail, and the side seams and fluid drape of her tailored cream linen blazer and trousers. The camera is positioned perpendicular to the model at f/5.6, with directional softbox rim light carving side contours against a clean neutral grey backdrop.

### 4. FLUX.1 SHOT 4: LOW-ANGLE HEROIC (15° UPWARD TILT)
A statuesque commercial fashion editorial photograph from a low-angle camera perspective at knee height, tilted upward at 15 degrees. The 22-year-old Indonesian woman stands with commanding confidence in her tailored cream linen suit, looking slightly down toward the lens. The perspective elongates her full-body proportions with straight vertical lines. Captured with a medium format wide lens at f/6.3 on a neutral grey studio floor with grounded soft shadows.

### 5. FLUX.1 SHOT 5: HIGH-ANGLE ELEVATED (35° DOWNWARD ANGLE)
An editorial fashion photograph captured from an elevated high-angle perspective from 2.5 meters height, angled 35 degrees downward. The 22-year-old Indonesian woman tilts her head upward to meet the camera with a subtle smile, displaying the structured cream blazer collar, shoulders, and floor shadow projection. Three-quarter elevated framing shot at f/5.6 against a seamless neutral grey studio cyclorama.

### 6. FLUX.1 SHOT 6: EXTREME CLOSE-UP MACRO (TEXTILE DETAIL)
An extreme close-up commercial macro photograph tightly focusing on the cream linen blazer lapel, fine horn button cross-stitching, and the model's delicate collarbone. A delicate gold chain pendant rests gently against her radiant honey skin with visible natural micro-pores and genuine linen slub weave texture. Captured with a 120mm macro lens at f/8 for tack-sharp tactile clarity and realistic material depth.

### 7. FLUX.1 SHOT 7: REAR 180° BACK VIEW (SPINE & SEAMS)
A commercial fashion catalog photograph from a full 180-degree rear back view. The 22-year-old Indonesian woman has her back turned toward the camera, head turned slightly over her left shoulder to show her side profile. The cream linen blazer showcases its tailored back vent seams, spine drape, and neat low bun. Three-quarter back framing shot at f/5.6 with even studio lighting and zero face distortion.

### 8. FLUX.1 SHOT 8: WIDE FULL-BODY PULLED-BACK (8 METERS DISTANCE)
A wide environmental commercial fashion photograph with the camera pulled back to an 8-meter distance. The 22-year-old Indonesian woman stands gracefully centered, occupying approximately 50 percent of the vertical frame with generous breathing room above her head and extensive studio floor space below her cream trousers and leather shoes. Shot on a medium format camera at f/8 for edge-to-edge sharpness from head to toe with soft realistic ground shadows.


---

# 📋 CHEATSHEET SNIPPET 8 SUDUT KAMERA SIAP PAKAI

Gunakan potongan kalimat kamera di bawah ini untuk disisipkan ke dalam prompt Anda jika ingin mengganti sudut kamera secara instan:

---

### 1. Tampak Depan Lurus 0° (Front Eye-Level):
`straight frontal eye-level angle at 0 degrees, standing upright facing directly into lens with calm gentle smile, camera mounted at chest level with zero tilt,`

### 2. Tiga Perempat 45° (Three-Quarter Dimensional):
`dynamic three-quarter 45-degree angle shot, body angled 45 degrees to the side while face turns gently toward camera, showcasing garment silhouette depth,`

### 3. Samping Penuh 90° (True Side Profile):
`strict 90-degree true side profile view, showcasing sharp jawline profile, neat hair silhouette, and garment side drape, camera perpendicular to model,`

### 4. Sudut Rendah Menengadah 15° (Low-Angle Hero View):
`statuesque low-angle camera perspective at knee height tilted upward at 15 degrees, elongated poised proportions, model looking down slightly toward lens,`

### 5. Sudut Atas Menunduk 35° (High-Angle Elevated Perspective):
`elevated high-angle perspective from 2.5 meters height angled 35 degrees downward, model head tilted upward meeting the lens gaze, displaying collar and shoulder drape,`

### 6. Macro Detail Sangat Dekat (Extreme Close-Up Macro):
`tight extreme close-up macro photography focusing on fabric weave, seam stitching, button details, and jewelry contact on skin, shot on 120mm macro lens at f/8,`

### 7. Tampak Belakang Penuh 180° (Rear Back View):
`full 180-degree rear back view, model back turned toward camera with head turned slightly over shoulder, displaying back seams and fabric drape,`

### 8. Kamera Mundur Jauh 8 Meter (Wide Full-Body Pulled-Back):
`wide environmental full-body shot with camera pulled back at a distance of 8 meters, generous breathing room above head and ample floor space below shoes,`


---

## MODUL 06: 20 LATAR TEMPAT & LOKASI ARSITEKTURAL (ZERO HUMAN BLEED)


### FILE: 01_BG_MINIMALIS_BETON_ARSITEKTURAL.md
# BACKGROUND: MINIMALIS BETON ARSITEKTURAL & KACA (GALLERY STUDIO)  
  
## POSITIVE PROMPT  
commercial architectural background photography of minimalist modern art gallery interior, empty unoccupied space with zero people, smooth polished micro-cement concrete floors, raw board-formed concrete accent walls with subtle geometric panel seams, soaring high ceiling, floor-to-ceiling clean steel-framed glass windows filtering soft diffused natural overcast daylight, subtle clean shadow gradients, uncluttered open negative space, shot on Fujifilm GFX 100 II with 32-64mm f/4 lens at f/8, straight architectural perspective lines, tack-sharp material fidelity, realistic concrete texture without digital noise, authentic spatial depth, no CGI slop --style raw --c 1 --s 60 --seed 10293841  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, crowds, clutter, messy furniture, plastic materials, 3d render, video game background, cartoon, overcooked HDR, warped perspective, blown-out window light, harsh glare  
  
## SEED & PARAMETERS  
Seed: 10293841  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 03_BG_CAFE_SPECIALTY_COFFEE_MALANG.md
# BACKGROUND: SPECIALTY COFFEE SHOP AESTHETIC (WARM EARTHY CAFE)  
  
## POSITIVE PROMPT  
commercial lifestyle background photography of trendy specialty coffee shop interior, empty unoccupied space with zero people, textured terracotta clay plastered accent walls, polished terrazzo floor with subtle aggregate flecks, warm natural teak wood table corner in soft foreground blur, matte black steel espresso bar counter in soft background bokeh, warm 2700K pendant track lighting combined with soft ambient window daylight, cozy inviting Indonesian urban aesthetic, captured with Canon EOS R5 and RF 50mm f/1.2L lens at f/4, authentic cafe atmosphere, natural color balance, zero artificial bloom --style raw --c 1 --s 60 --seed 30495863  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, crowded customers, messy trash, dirty cups, plastic chairs, neon signs, CGI render, cartoon, digital painting, oversaturated orange, blown-out highlights  
  
## SEED & PARAMETERS  
Seed: 30495863  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 04_BG_TROPICAL_VILLA_BALI_POOL.md
# BACKGROUND: TROPICAL LUXURY VILLA & POOL SHADOWS (BALI VIBES)  
  
## POSITIVE PROMPT  
luxury resort architectural photography of modern Balinese tropical villa terrace, empty unoccupied space with zero people, clean white honed Palimanan stone pool deck, crystal-clear turquoise private plunge pool edge with subtle soft water ripples, lush green monstera and traveler palm foliage casting organic dappled sun shadows across the stone patio, warm golden hour afternoon sunlight, shot on Hasselblad H6D-100c with 45mm lens at f/8, natural tropical warmth, authentic stone porosity and water refraction, high-end travel editorial standard --style raw --c 1 --s 60 --seed 40596874  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, tourists, swimmers, pool toys, inflatable floats, plastic sunbeds, messy debris, CGI, 3d render, cartoon, oversaturated green, fake reflections  
  
## SEED & PARAMETERS  
Seed: 40596874  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 07_BG_LUXURY_PENTHOUSE_SKYLINE.md
# BACKGROUND: LUXURY PENTHOUSE WITH CITY SKYLINE WINDOW  
  
## POSITIVE PROMPT  
ultra-luxury interior architectural photography of high-floor modern penthouse, empty unoccupied space with zero people, floor-to-ceiling panoramic glass facade overlooking modern city skyscrapers at twilight blue hour, polished dark Nero Marquina marble flooring with faint city light reflections, minimalist modern brass linear floor lamp in soft corner, interior ambient warm architectural cove lighting balancing the exterior blue sky, shot on Sony A7R V with 24-70mm f/2.8 GM II at 35mm f/6.3, breathtaking metropolitan atmosphere, zero glare on glass, magazine architectural spread grade --style raw --c 1 --s 60 --seed 70899907  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, furniture clutter, fingerprints on glass, distorted reflections, lens flare, CGI render, cartoon, 3d video game graphics, oversaturated colors  
  
## SEED & PARAMETERS  
Seed: 70899907  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 09_BG_MODERN_TEGAS_ART_MUSEUM.md
# BACKGROUND: DESAIN MODERN TEGAS ART MUSEUM & SCULPTURAL WALLS  
  
## POSITIVE PROMPT  
monumental architectural background photography of modern art museum interior, empty unoccupied space with zero people, soaring geometric board-marked raw concrete monolithic walls, wide polished grey terrazzo walkway, distant minimalist bronze abstract modern sculpture in soft blur, sharp overhead skylight casting clean angular daylight beams across the concrete texture, shot on Hasselblad H6D-100c with 28mm wide lens at f/8, dramatic spatial volume, pristine architectural lines, high-fashion editorial runway atmosphere --style raw --c 1 --s 60 --seed 91021929  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, museum visitors, guards, ropes, stanchions, clutter, plastic signs, CGI, 3d render, cartoon, video game environment, muddy shadows  
  
## SEED & PARAMETERS  
Seed: 91021929  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 10_BG_BOTANICAL_GREENHOUSE.md
# BACKGROUND: BOTANICAL GREENHOUSE & SUNLIT GLASSHOUSE  
  
## POSITIVE PROMPT  
editorial botanical interior photography of vintage iron-framed glasshouse conservatory, empty unoccupied space with zero people, soaring curved steel and glass ceiling, soft golden sunlight streaming through fogged glass panes creating ethereal sun rays, lush hanging ferns, fiddle leaf figs, and tropical monstera leaves framing the peripheral background, weathered stone slab floor with gentle moisture sheen, captured on Canon EOS R5 with 35mm f/1.4 lens at f/4.5, natural organic botanical elegance, airy luminous atmosphere --style raw --c 1 --s 60 --seed 11132930  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, gardeners, hoses, plastic pots, tools, dirt piles, dead leaves, overexposed white ceiling, CGI, 3d render, cartoon, fake plants  
  
## SEED & PARAMETERS  
Seed: 11132930  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 11_BG_DARK_LUXURY_INDUSTRIAL_LOFT.md
# BACKGROUND: DARK LUXURY INDUSTRIAL LOFT (EXPOSED BRICK & WARM LIGHT)  
  
## POSITIVE PROMPT  
moody commercial interior photography of luxury industrial loft apartment, empty unoccupied space with zero people, weathered dark red exposed brick wall, polished charcoal concrete floor, black steel factory-pane grid windows in background, warm 2200K Edison filament globe lamps suspended by black braided cords casting warm amber glow, rich dark shadows with clean tonal transitions, shot on Sony A7R V with 50mm f/1.2 GM at f/4, refined masculine luxury ambiance, tactile brick and steel texture, zero noise artifacts --style raw --c 1 --s 60 --seed 12143941  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, messy clutter, trash, open wires, plastic items, modern junk, CGI, 3d render, cartoon, digital art, muddy dark areas without detail  
  
## SEED & PARAMETERS  
Seed: 12143941  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 12_BG_COASTAL_SAND_DUNE_GOLDEN_HOUR.md
# BACKGROUND: COASTAL SAND DUNE & SEASIDE CLIFF AT GOLDEN HOUR  
  
## POSITIVE PROMPT  
cinematic outdoor fashion landscape background photography of sweeping coastal sand dune overlooking distant calm ocean horizon, empty unoccupied space with zero people, fine wind-rippled warm golden sand textures in foreground, soft wild coastal dune grass swaying in gentle breeze, warm radiant golden hour sun setting low casting long soft amber shadows across the dunes, shot on Fujifilm GFX 100 II with 45-100mm lens at 50mm f/8, natural coastal majesty, authentic earth textures, editorial travel lookbook caliber --style raw --c 1 --s 60 --seed 13154952  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, beachgoers, umbrellas, footprints everywhere, garbage, boats, plastic, cartoon, 3d render, oversaturated sky, fake lens flare  
  
## SEED & PARAMETERS  
Seed: 13154952  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 13_BG_BOUTIQUE_FITTING_SALON.md
# BACKGROUND: LUXURY BOUTIQUE FITTING SALON (MINIMALIST CHIC)  
  
## POSITIVE PROMPT  
high-end luxury fashion boutique interior background, empty unoccupied space with zero people, plush soft grey cashmere velvet drapery curtains lining curved dressing suite wall, polished French chevron oak parquet wood flooring, warm brass minimalist floor-length mirror frame in soft background blur, soft diffused cove ceiling illumination providing flattering even 3000K light, shot on Hasselblad 907X with 45mm lens at f/5.6, refined haute-couture atmosphere, tactile velvet and wood finishes, ultra-clean commercial asset --style raw --c 1 --s 60 --seed 14165963  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, clothes strewn on floor, sales tags, racks, plastic hangers, clutter, bright glare, CGI, 3d render, cartoon, digital illustration  
  
## SEED & PARAMETERS  
Seed: 14165963  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 14_BG_BATIK_ATELIER_WORKSHOP.md
# BACKGROUND: TRADITIONAL BATIK TEXTILE WORKSHOP & ARTISAN ATELIER  
  
## POSITIVE PROMPT  
authentic cultural interior background photography of traditional Indonesian batik artisan workshop, empty unoccupied space with zero people, rustic whitewashed brick walls, vintage teak wood drying racks holding hand-drawn batik canting textiles with intricate classic kawung and parang patterns in soft background blur, warm natural afternoon light pouring through rustic wooden window, smooth natural clay floor, shot on Nikon Z8 with 50mm f/1.8 lens at f/4, rich cultural heritage authenticity, honest craftsmanship atmosphere --style raw --c 1 --s 60 --seed 15176974  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, tourists, plastic buckets, modern trash, electric clutter, CGI, 3d render, cartoon, digital art, distorted batik patterns, muddy shadows  
  
## SEED & PARAMETERS  
Seed: 15176974  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 15_BG_FINE_DINING_RESTAURANT.md
# BACKGROUND: ELEGANT FINE DINING RESTAURANT & WARM CANDLELIGHT  
  
## POSITIVE PROMPT  
luxury commercial hospitality photography of exclusive fine dining restaurant interior, empty unoccupied space with zero people, deep emerald green velvet banquette seating booths in distant soft blur, dark polished walnut wood wall paneling with brushed brass trim, small round marble dining table with single warm flickering candlelight in soft corner, moody sophisticated ambient lighting at 2400K, shot on Sony A7 IV with 85mm f/1.4 lens at f/3.5, intimate high-society luxury ambiance, rich textured depth, zero noise --style raw --c 1 --s 60 --seed 16187985  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, diners, waiters, dirty plates, food scraps, messy silverware, loud neon signs, CGI, 3d render, cartoon, muddy blacks, blown-out flame  
  
## SEED & PARAMETERS  
Seed: 16187985  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 16_BG_ROOFTOP_TERRACE_DUSK.md
# BACKGROUND: MODERN ROOFTOP TERRACE AT DUSK WITH BISTRO LIGHTS  
  
## POSITIVE PROMPT  
commercial lifestyle background photography of urban open-air rooftop lounge terrace at twilight, empty unoccupied space with zero people, clean dark grey composite wood decking, low glass perimeter safety railing overlooking twinkling distant cityscape bokeh lights, string of warm delicate micro-bistro fairy lights overhead glowing softly against deep indigo evening sky, shot on Canon EOS R5 with 35mm f/1.4 lens at f/2.8, atmospheric modern evening vibe, authentic city dusk illumination, balanced dynamic range --style raw --c 1 --s 60 --seed 17198996  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, crowds of partygoers, spilled drinks, plastic cups, messy wires, harsh flashing party lights, CGI, 3d render, cartoon, digital illustration  
  
## SEED & PARAMETERS  
Seed: 17198996  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 18_BG_CERAMIC_POTTERY_STUDIO.md
# BACKGROUND: ARTISAN CERAMIC & POTTERY STUDIO (EARTHY CLAY)  
  
## POSITIVE PROMPT  
warm artisanal craft background photography of pottery maker studio, empty unoccupied space with zero people, rustic lime-plastered warm terracotta walls, sturdy reclaimed solid wood workbenches with handcrafted unglazed ceramic vases and clay vessels displayed on minimalist wooden wall shelves in soft blur, clean natural polished concrete floor, soft northern window light flooding the studio workspace, shot on Sony A7R V with 50mm f/1.4 at f/4.5, honest earthy craftsmanship atmosphere, tactile raw clay and wood textures --style raw --c 1 --s 60 --seed 19210018  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, messy clutter, broken pottery, plastic tools, messy buckets, CGI, 3d render, cartoon, digital art, oversaturated colors  
  
## SEED & PARAMETERS  
Seed: 19210018  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 19_BG_CYBER_MINIMALIST_UNDERPASS.md
# BACKGROUND: SLEEK MINIMALIST URBAN UNDERPASS (COOL ARCHITECTURAL)  
  
## POSITIVE PROMPT  
contemporary architectural street fashion background of clean modern urban pedestrian underpass, empty unoccupied space with zero people, smooth matte off-white architectural acoustic wall panels with clean geometric linear recessed LED strip lighting in ceiling, polished grey epoxy floor with faint clean linear light reflections, cool neutral color temperature at 4500K with balanced shadows, shot on Leica SL2 with 28mm f/2 lens at f/5.6, futuristic clean streetwear aesthetic, crisp architectural perspective lines --style raw --c 1 --s 60 --seed 20221029  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, graffiti, trash, pedestrians, wet puddles, dirt, dark grunge, harsh colorful neon, CGI, 3d render, cartoon, video game graphics  
  
## SEED & PARAMETERS  
Seed: 20221029  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

### FILE: 20_BG_CLASSIC_HERRINGBONE_MOULDING.md
# BACKGROUND: CLASSIC FRENCH MOLDING WALL & HERRINGBONE WOOD FLOOR  
  
## POSITIVE PROMPT  
haute-couture Parisian apartment background photography, empty unoccupied space with zero people, tall elegant wall with classic French wainscoting boiserie decorative plaster moldings painted in soft matte warm alabaster white, pristine natural European oak herringbone parquet wood floor with satin finish, tall French casement windows with sheer white drapery diffusing soft daylight, shot on Hasselblad H6D-100c with 50mm lens at f/7.1, timeless high-fashion luxury pedigree, crisp plaster molding shadows, zero glare --style raw --c 1 --s 60 --seed 21232030  
  
## NEGATIVE PROMPT  
people, human, person, model, man, woman, crowd, pedestrian, modern furniture, TV screens, clutter, damaged floor, peeling paint, plastic items, overexposed blown-out white wall, CGI, 3d render  
  
## SEED & PARAMETERS  
Seed: 21232030  
Style: --style raw  
Stylize: --s 60  
Chaos: --c 1  

---

## MODUL 01: PRODUCT STUDIO STANDALONE (6 TEMPLATES)

### 01_PROMPT_UNIVERSAL_PRODUCT_STUDIO.md
- **Positive Prompt:** commercial studio product photography of standalone retail product, centered hero placement, isolated on solid surface without humans, hands, or mannequins. The physical design, geometry, edges, textures, labels, colors, and material finishes are 100 percent identical and faithful to the input image reference with zero alteration or morphing. Product resting on clean cylindrical honed stone podium over seamless matte soft neutral light grey cyclorama background with gentle ambient gradient falloff. Balanced studio lighting setup featuring dual 120cm softboxes at 45 degree angles, subtle rim light separating product edges from backdrop, perfectly calibrated exposure preventing blown-out highlights or blinding glare, realistic diffused contact drop shadow and micro ambient occlusion anchored to the surface. Captured with Hasselblad H6D-100c medium format camera, 90mm macro lens, f/8 aperture for edge-to-edge tack-sharp focus, natural tangible surface micro-textures, zero plastic sheen, zero CGI oversaturation, authentic color grading, commercial editorial lookbook grade --iw 2.0 --style raw --c 0 --s 50 --seed 24091367
- **Negative Prompt:** human, person, hand, fingers, model, mannequin, altered design, deformed silhouette, morphed geometry, modified text, fake logo, pure blown-out white, overexposed background, clipped highlights, blinding glare, washed-out exposure, plastic sheen, 3d render, cartoon, anime, illustration, cgi, excessive bloom, oversaturated colors, floating object, missing shadows, artificial glow, blurry details, depth of field blur on product, chromatic aberration, artifacts, watermark, signature

### 02_PROMPT_FASHION_APPAREL_STUDIO.md
- **Positive Prompt:** commercial fashion product photography of apparel garment neatly hanging on sleek minimalist natural wooden hanger with matte silver hook, centered front-facing hero presentation, isolated clean product asset shot, strictly zero human, zero model, zero mannequin body. The cut, tailoring, fabric weave, embroidery patterns, stitching lines, buttons, collar contours, and textile colors remain 100 percent identical and true to the reference image with zero morphing. Garment hanging completely isolated against seamless matte soft neutral light grey studio cyclorama background with subtle organic gradient, zero props, zero furniture, zero room clutter. Balanced studio lighting setup with large diffused scrim softboxes, carefully controlled exposure to prevent overexposure, zero blown-out white glare, natural fabric contrast, gentle soft ambient shadow behind the garment, crisp clean silhouette edges ready for e-commerce asset use. Shot on medium format camera with 90mm prime lens, f/8 aperture, razor-sharp edge-to-edge textile texture, authentic thread count fidelity, zero airbrushed look, zero cgi smoothing, ultra-clean commercial lookbook asset grade --iw 2.0 --style raw --c 0 --s 45 --seed 41082955
- **Negative Prompt:** human, woman, man, model, face, body, skin, hands, fingers, legs, mannequin, mannequin stand, torso, pure blinding white, overexposed background, blown-out highlights, harsh glare, washed-out colors, background props, furniture, rack, wardrobe, closet, room interior, floor, window, clutter, deformed hanger, warped fabric, distorted cut, altered patterns, wrinkled mess, plastic sheen, 3d render, cartoon, illustration, oversaturation, harsh shadows, artifacts, watermark

### 03_PROMPT_LEATHER_GOODS_BAGS_STUDIO.md
- **Positive Prompt:** luxury commercial studio product photography of genuine cowhide leather bag, standalone hero placement, centered on raw textured natural slate slab plinth. Bag silhouette, flap curvature, brass metal buckles, zipper pullers, edge creasing, strap thickness, and authentic leather pebble grain texture are 100 percent identical and faithful to the reference image with zero shape deformation. Rich authentic leather patina with natural micro-pore surface reflection. Clean architectural muted neutral grey studio backdrop with balanced exposure, zero harsh glare or blinding bounce. Directional key light with subtle fill bounce, authentic brass hardware specular highlights, physically accurate contact drop shadow and micro ambient occlusion under the leather base. Shot with Sony A7R V camera, FE 90mm f/2.8 Macro lens, f/9 aperture, pinpoint sharpness across every stitch, tangible leather authenticity, zero plastic fake gloss, zero cgi render look, editorial craftsmanship grade --iw 2.0 --style raw --c 0 --s 40 --seed 88201940
- **Negative Prompt:** human, hand, fingers, model, carrying bag, distorted strap, warped buckle, altered leather texture, fake logo, overexposed background, blown-out highlights, blinding white glare, plastic sheen, vinyl look, airbrushed, 3d render, cartoon, digital drawing, oversaturated, floating bag, no shadow, blurry stitches, artifacts, watermark

### 04_PROMPT_FOOTWEAR_SHOES_STUDIO.md
- **Positive Prompt:** commercial footwear studio product photography of pair of handmade leather shoes, angled at dynamic 30 degree side-by-side presentation, standalone hero product composition. Shoe lasts, toe cap contours, welted stitching, eyelets, lace arrangement, heel height, and leather finish are 100 percent identical to the reference image with zero structural deformation. Resting on honed dark travertine stone platform against clean muted soft off-white alabaster studio wall with gentle vignette falloff, calibrated exposure preventing overexposed hotspots. Overhead diffused striplight combined with subtle 45 degree bounce fill, crisp natural contact shadow and micro ambient occlusion beneath the rubber outsoles. Shot on medium format camera, 100mm macro lens, f/11 aperture for front-to-back sharpness, authentic leather grain and rubber traction detail, natural material specular highlights, zero plastic look, footwear lookbook editorial grade --iw 2.0 --style raw --c 0 --s 40 --seed 73910245
- **Negative Prompt:** human, feet, legs, socks, ankles, hands, person, walking, modified sole, distorted toe box, altered stitches, uneven pair, overexposed background, blown-out white glare, clipped highlights, floating shoes, missing ground shadow, plastic look, 3d render, cartoon, illustration, excessive bloom, blurry outsole, artifacts, watermark, text

### 05_PROMPT_PACKAGING_BOTTLES_POUCH_STUDIO.md
- **Positive Prompt:** commercial studio product photography of standalone packaged product, upright dead-center hero position, completely isolated. Packaging dimensions, corner seal borders, pouch texture, cap details, and label typography layout remain 100 percent identical and faithful to the reference image with zero alteration or morphed text. Placed on flat polished concrete surface with soft neutral warm grey minimalist studio background with gentle light roll-off, perfectly balanced exposure preventing overexposure or blinding reflection. Even dual softbox studio illumination across front face, smooth gradient falloff on package sides, zero blinding flare, natural physical contact drop shadow anchored under the package base. Shot with 90mm macro lens, f/8 aperture, razor-sharp label typography edges, authentic packaging paper texture, zero fake 3d render look, commercial retail catalog grade --iw 2.0 --style raw --c 0 --s 50 --seed 55192830
- **Negative Prompt:** human, hands, fingers, holding product, crumpled package, distorted text, garbled typography, warped label, overexposed background, blown-out white, blinding glare, washed-out colors, plastic reflections, fake logo, 3d render, cgi, cartoon, digital art, oversaturated, floating packaging, no ground shadow, blurry label, artifacts, watermark

### 06_PROMPT_LUXURY_ACCESSORIES_STUDIO.md
- **Positive Prompt:** high-end luxury macro studio product photography of standalone small leather accessory, standing three-quarter hero view on polished solid dark walnut wood plinth. Exact stitch count, edge coat paint, card compartment geometry, and smooth vegetable-tanned leather surface strictly 100 percent faithful to reference image with zero deformation. Soft neutral beige studio background with subtle soft gradient, calibrated studio exposure preventing overexposure or harsh glare. Focused snoot key spotlight combined with soft ambient bounce fill, delicate specular highlights along edges without clipping, crisp grounded contact drop shadow. Shot on Phase One medium format camera with 120mm macro lens, f/11 aperture, microscopic thread and leather pore fidelity, zero digital smoothing, zero plastic sheen, luxury editorial print campaign grade --iw 2.0 --style raw --c 0 --s 40 --seed 19283740
- **Negative Prompt:** human, hands, fingers, holding, deformed stitches, warped edges, fake logo, overexposed background, blown-out white, blinding glare, washed-out highlights, plastic appearance, airbrushed, 3d render, illustration, cartoon, video game graphic, oversaturated, floating item, missing shadow, blurry edges, noise, artifacts, watermark

---

## MODUL 02: MODEL WANITA INDONESIA (5 PERSONA SSS SKIN GLOW)

### 01_MODEL_NATURAL_SUNDA_MANIS.md
- **Positive Prompt:** authentic commercial lookbook portrait of gorgeous young 21-year-old Indonesian woman, classic West Javanese Sundanese beauty, naturally pretty feminine oval face with sweet gentle smile, subtle cheek dimple, clear radiant dark brown almond eyes with crisp iris detail and catchlights, delicate slender nose bridge, softly tinted natural rosy lips with subtle moisture, healthy voluminous silky dark brown hair with soft face-framing waves. Naturally clear healthy Indonesian warm golden undertone skin, authentic micro-pore definition, soft sub-surface scattering skin glow, zero waxy plastic smoothing. Shot on Hasselblad H6D-100c medium format camera, HC 100mm f/2.2 lens stopped down to f/5.6 for edge-to-edge optical sharpness, Profoto 85cm white beauty dish key light with soft honeycomb grid, gentle white reflector fill, calibrated balanced studio exposure, natural skin luminosity, professional fashion lookbook print quality, real camera photo, no CGI, no AI slop --style raw --c 1 --s 65 --seed 38192044

### 02_MODEL_JAWA_EKSOTIS_SAWO_MATANG.md
- **Positive Prompt:** commercial fashion magazine portrait of stunningly attractive 22-year-old Javanese Indonesian woman, authentic Central Javanese ethnic beauty, refined graceful facial bone structure with elegant high cheekbones, enchanting deep brown almond eyes with sharp clarity, gentle charming smile revealing straight natural teeth, neatly groomed arched eyebrows, soft glossy jet black hair styled in sleek low ponytail. Radiant warm golden caramel sawo matang skin tone, authentic micro-pore definition, soft sub-surface scattering skin glow, realistic skin light diffusion, zero waxy plastic smoothing. Photographed with Sony A7R V and FE 85mm f/1.4 GM lens at f/4.5 aperture, tack-sharp focal tracking across eyelashes and lips, soft natural depth of field roll-off, balanced 45-degree large octabox studio strobe with subtle warm rim light, calibrated exposure with zero highlight clipping, authentic commercial billboard beauty standard --style raw --c 1 --s 65 --seed 59281033

### 03_MODEL_JAKARTA_METROPOLITAN_CLEAN_CHIC.md
- **Positive Prompt:** high-end commercial campaign portrait of very attractive 23-year-old Indonesian woman in Jakarta, modern chic Southeast Asian aesthetic, slender symmetrical jawline, charismatic bright dark brown eyes, refined nose, naturally tinted satin lips, sophisticated minimal clean beauty makeup, sleek glossy dark brown lob haircut with natural hair movement and healthy shine. Clean luminous beige-undertone Indonesian skin with authentic micro-pore definition, soft sub-surface scattering skin glow, healthy skin bounce, authentic skin translucency, zero waxy plastic smoothing. Captured on Canon EOS R5 with RF 85mm f/1.2L lens at f/4 aperture, crystal-clear optical sharpness, dual diffused softbox lighting setup with subtle edge hair light, controlled calibrated exposure preventing blown-out highlights, poised warm confident gaze, premium urban commercial lookbook quality, authentic camera photograph --style raw --c 1 --s 65 --seed 71092834

### 04_MODEL_HIJAB_MODEST_ELEGANT.md
- **Positive Prompt:** luxury modest fashion lookbook portrait of lovely 22-year-old Indonesian Muslim woman, exceptionally pretty facial features with serene warm expression, captivating dark brown eyes with soft catchlights, graceful feminine jawline, natural peach-pink lips with soft natural smile. Neatly wearing a premium matte silk chiffon hijab styled elegantly framing her face with graceful fluid drape, zero stray hair showing. Beautiful glowing honey-toned Indonesian skin, authentic micro-pore definition, soft sub-surface scattering skin glow, realistic healthy skin illumination, zero waxy plastic smoothing. Shot on Hasselblad H6D-100c medium format camera with 100mm portrait lens, f/5 aperture, razor-sharp focus on eyes and hijab fabric weave, soft balanced octabox key light with diffused ambient fill, calibrated studio exposure with soft shadow gradation, dignified feminine elegance, high-end modest boutique catalog standard --style raw --c 1 --s 65 --seed 84920155

### 05_MODEL_EDITORIAL_HIGH_FASHION_INDONESIA.md
- **Positive Prompt:** strikingly beautiful high-fashion commercial portrait of 23-year-old Indonesian runway model, captivating sculptural Indonesian bone structure, defined elegant jawline, high cheekbones, magnetic dark almond eyes with confident alluring gaze, naturally plump hydrated lips, sleek middle-part low bun hair with clean polished finish. Glowing golden tan sawo matang skin, authentic micro-pore definition, soft sub-surface scattering skin glow, realistic skin texture with soft satin finish, zero waxy plastic smoothing. Captured on Phase One IQ4 150MP with 110mm lens, f/5.6 aperture, microscopic focal clarity across facial features, directional silver beauty dish key light with grid fill, sculpted cheekbone shadows, calibrated exposure maintaining deep contrast without clipping, Harper's Bazaar Indonesia editorial caliber, authentic medium format photograph --style raw --c 1 --s 65 --seed 92018374

---

## MODUL 03: TEMPLATES POSE (7 POSE ANATOMIS)

1. **01_POSE_BERDIRI_LOOKBOOK_FULL_BODY.md:** `full-body standing fashion model pose, natural contrapposto weight distribution shifted elegantly onto left leg, right foot positioned slightly forward and relaxed, upright elongated spine with relaxed dropped shoulders, right hand resting casually along the thigh with natural relaxed fingers, left arm curved gently with hand grazing the hip, torso turned at subtle three-quarter angle toward the camera while head faces front with quiet poise, grounded natural contact shadows beneath footwear on studio floor`
2. **02_POSE_DUDUK_ELEGAN_STUDIO_CHAIR.md:** `elegant seated editorial fashion pose, resting gracefully on minimalist cylindrical concrete studio plinth, upright elongated torso with poised posture, legs angled diagonally with ankles crossed neatly, right arm resting gently on upper thigh with delicate relaxed fingers, left hand resting softly beside hip on the plinth surface, gentle head tilt toward the lens with serene confident expression, natural contact shadows grounding plinth and shoes to the floor`
3. **03_POSE_MEMEGANG_PRODUK_TAS_TOTE.md:** `commercial product showcase model pose, standing three-quarter stance holding structured leather handbag, right hand gripping the top leather handle with graceful anatomically accurate fingers, the bag presented clearly beside hip level without blocking garment details, left arm relaxed along the side, torso angled to highlight both the apparel cut and the leather bag craftsmanship simultaneously, relaxed shoulder alignment, direct captivating eye contact with camera`
4. **04_POSE_CLOSEUP_BEAUTY_SHOULDER_TURN.md:** `intimate beauty portrait pose, body turned in profile with shoulders angled at 45 degrees, head turned smoothly back toward the camera over the right shoulder, elongated neck posture creating graceful jawline definition, right shoulder slightly dropped, chin lifted softly, direct engaging gaze straight down the lens barrel with gentle closed-lip parted smile, collarbone highlighted cleanly by soft directional key light`
5. **05_POSE_BERJALAN_DINAMIS_MID_STRIDE.md:** `dynamic runway walking pose captured mid-stride, moving forward toward camera, right foot stepping forward with heel planting, left foot trailing with natural toe flex, natural momentum in garment fabric with subtle fluid drape motion, arms swinging naturally in gentle opposing rhythm with relaxed soft hands, upright confident athletic poise, steady eye-level gaze radiating effortless elegance`
6. **06_POSE_TANGAN_MENYENTUH_KERAH_DAGU.md:** `sophisticated fashion detail pose, standing upright facing camera, left hand raised delicately toward upper chest with fingertips lightly brushing the neckline collar of the garment, perfectly rendered natural five fingers with neat manicured natural nails, relaxed wrist curve, right arm hanging naturally along the side, head tilted slightly to the right with contemplative subtle smile, soft ambient contact shadows under the fingers`
7. **07_POSE_DUDUK_LANTAI_MINIMALIS_RELAXED.md:** `contemporary relaxed floor-seated pose, sitting casually on matte studio floor, legs bent softly and swept gracefully to the right side, torso supported by left arm planted firmly on the floor beside the hip with relaxed natural palm contact, right arm resting casually across bent knee, relaxed shoulder line, head turned toward the camera with candid genuine smile, grounded authentic contact shadows beneath the body`

---

## MODUL 04: CAMERA ANGLE & FRAMING (8 SPESIFIKASI OPTIK)

1. **01_FRAMING_EXTREME_CLOSEUP_BEAUTY.md:** `extreme close-up beauty macro portrait framing focused tightly from chin to forehead, camera placed at direct eye level, shot on Hasselblad H6D-100c medium format camera with 120mm macro lens, f/4 aperture, microscopic focal plane centered on iris and eyelash catchlights with soft natural depth of field falloff across earlobes, razor-sharp skin pores, authentic peach fuzz, individual lash separation, balanced beauty dish key lighting with 60cm silver reflector fill from below, calibrated soft exposure preventing blown-out forehead or cheek highlights, zero wide-angle facial distortion`
2. **02_FRAMING_MEDIUM_CLOSEUP_BUST_SHOT.md:** `medium close-up bust shot framing tightly composed from mid-chest to just above the crown of the head, camera positioned at natural eye level, shot with Sony A7R V digital camera paired with 85mm f/1.4 prime lens, f/2.8 aperture, tack-sharp edge-to-edge resolution across facial features and garment neckline collar details, creamy optical bokeh roll-off behind, dual diffused octabox studio strobes at 45 degree angles with soft hair rim light, perfectly balanced neutral exposure without clipped whites or dark shadows`
3. **03_FRAMING_MEDIUM_SHOT_WAIST_UP.md:** `classic commercial medium shot framing captured cleanly from just below the waistline to above the head, camera mounted at chest height for flat undistorted perspective, shot on Canon EOS R5 with RF 70-200mm f/2.8L lens at 100mm, f/4 aperture, razor-sharp focus encompassing both hands, garment waistline, and facial expression simultaneously, balanced large softbox key light with white bounce fill, calibrated studio exposure maintaining deep textile shadow detail and soft ambient studio glow`
4. **04_FRAMING_THREE_QUARTER_COWBOY_SHOT.md:** `editorial three-quarter cowboy shot framing composed from mid-thigh to top of head, camera positioned at lower ribcage level for tall graceful proportions, shot with medium format digital back and 110mm portrait lens, f/5.6 aperture providing crisp front-to-back clarity from hand accessories to garment hem, soft overhead strip box lighting paired with 45 degree key diffusion scrim, calibrated balanced studio exposure preserving full dynamic range across all midtones, zero wide-angle leg stretching`
5. **05_FRAMING_FULL_BODY_LOOKBOOK_SHOT.md:** `pristine commercial catalog full-body fashion framing from head to toe with comfortable balanced breathing room above head and below shoes, camera positioned at hip height with zero tilt to maintain completely vertical architectural lines and true garment proportions, shot on Hasselblad H6D-100c with 50mm medium format lens (equivalent to 40mm full frame), f/8 aperture for infinite front-to-back tack-sharp focus, tall dual diffused softbox columns providing even head-to-toe illumination, physically anchored subtle contact drop shadows beneath the footwear, calibrated exposure preventing any white blowout on background or clothing`
6. **06_ANGLE_LOW_ANGLE_HERO_FASHION.md:** `dynamic low-angle fashion camera perspective positioned at knee height looking upward at 15 degree incline toward the model, creating elongated statuesque runway presence and heroic silhouette, shot with 50mm prime lens on full frame camera, f/4 aperture, tack-sharp focal tracking from shoes to eyes, powerful directional overhead key light combined with upward fill reflector, subtle dramatic edge separation rim light, calibrated exposure maintaining deep textile folds without clipping highlights, high-fashion runway magazine cover impact`
7. **07_ANGLE_HIGH_ANGLE_EDITORIAL.md:** `artistic high-angle editorial camera perspective positioned at 30 degree downward angle looking down at the seated model, camera held at 2 meters height, shot with 35mm prime lens, f/5.6 aperture, crisp geometric framing incorporating the model, garment folds, and the clean studio floor surface in harmonious composition, soft diffused overhead ambient bank lighting creating gentle downward directional shadows, perfectly calibrated exposure with zero blinding glare on the studio floor`
8. **08_FRAMING_WIDE_FULL_BODY_PULLED_BACK.md:** `wide environmental full-body fashion shot with camera pulled back significantly at a distance of 7 to 8 meters, wide expansive composition with generous breathing room above the head and substantial floor space below the shoes, model occupies roughly 50 to 60 percent of vertical frame height centered without touching any edges. Camera mounted on studio tripod at lower chest height with zero vertical tilt for straight parallel architectural perspective lines. Shot on Hasselblad H6D-100c with 45mm medium format wide lens (equivalent to 35mm full frame), f/8 aperture for edge-to-edge tack-sharp focal depth from model footwear to distant background wall. Broad studio cyclorama illumination with dual tall softbox towers positioned wide off-axis, soft grounded natural contact drop shadows anchored beneath both shoes on the floor, calibrated balanced exposure with zero highlight clipping, pristine high-fashion catalog spatial scale`


---

## PEMBARUAN MODUL 08 & ATURAN GLOBAL ANTI-SCRATCH BINDING (COMMIT `5b9fa1a` & `62dc486`)

### 1. Mandatory Image Reference Binding (Anti-Scratch Text Generation)
- **DILARANG MEMBUAT DARI NOL (ANTI-SCRATCH TEXT GENERATION):** Pada seluruh modul edit foto, studio transformation (`08`), dan katalog produk referensi (`01`), AI dilarang menghasilkan orang atau produk fiktif dari teks kosong.
- **Binding Produk (`01_PRODUCT_STUDIO_STANDALONE` & `02`):** Geometri produk, kemasan, teks label, tipografi, dan logo brand **wajib 100% diekstrak dari `Attached Product Reference Image`** (`--iw 2.0`).
- **Binding Wajah (`01`, `03`, `04`, `05`, `06` di Modul 08):** Struktur kraniofasial, mata, ras kulit, dan proporsi tubuh wajib diekstrak langsung dari `Gambar 1 / Attached Subject Image` dengan parameter `--cref [URL_WAJAH]` default.

### 2. Daftar Lengkap 6 Berkas di `08_STUDIO_TRANSFORMATION_DAN_HD_ENHANCER/`:
1. `01_PROMPT_STUDIO_PUTIH_POLOS_BALANCED_EXPOSURE.md` (`01_PROMPT_STUDIO_PHOTOSHOOT.md`)
2. `02_PROMPT_UNIVERSAL_HD_ENHANCER_ZERO_MORPHING.md` (`02_PROMPT_UNIVERSAL_PRODUCT_STUDIO.md`)
3. `03_PROMPT_PERSONA_LOCK_POSE_SANTAI_STUDIO.md` (`03_PROMPT_PERSONA_TRANSFORMATION.md`)
4. `04_PANDUAN_KONSISTENSI_WAJAH_DAN_RESTORASI_HD.md` (`04_PANDUAN_KONSISTENSI_WAJAH_DAN_MULTI_ANGLE.md` / `EXACT_IDENTITY`)
5. `05_DYNAMIC_MULTIMODAL_STUDIO_TRANSFORMER.md` (Gemini Nano Banana 2 Two-Phase CoT Engine)
6. `06_MULTI_IMAGE_REFERENCE_FUSION_ENGINE.md` (Mode A 3D Facial Triangulation & Mode B Role-Decoupled Partition Fusion — Lihat detail lengkap di `references/expansion-recipes.md`)
