# Panduan Karakter Suara & Style Tagging (`voices-and-styles-guide.md`)

Dokumen referensi resmi kurasi suara dan ekspresi emosi untuk engine Text-to-Speech **Google Gemini 3.8 Flash TTS** di ekosistem AI Agent.

---

## 🎙️ 1. Matriks Karakter Suara Resmi (7 Prebuilt Voices)

| Voice Name | Gender | Karakter Akustik | Niche & Penggunaan Terbaik |
| :--- | :--- | :--- | :--- |
| **`Koda`** *(Default)* | Pria | Modern, natural, confident, luwes, artikulasi segar | Voiceover video Reels, TikTok, YouTube Shorts, iklan B2C, properti milenial |
| **`Ludo`** | Pria | Tenang, jelas, low-pitch hangat, terpercaya | Video edukasi finansial, konsultasi KPR, narasi explainer, tutorial teknis |
| **`Aoede`** | Wanita | Elegan, lembut, artikulatif, wibawa berkelas | Properti mewah (Dark Luxury), skincare premium, corporate profile, agensi B2B |
| **`Kore`** | Wanita | Santai, ramah, bersahabat, conversational | Gaya obrolan kasual, video POV, testimoni konsumen, konten UGC medsos |
| **`Puck`** | Pria | Energik, antusias, punchy, tempo cepat | Hook kinetik 3 detik pertama, flash sale promo, diskon event, teaser produk |
| **`Charon`** | Pria | Berat, dalam (*deep baritone*), wibawa tinggi, formal | Pengumuman resmi otoritas, legal disclaimer, video narasi dokumenter |
| **`Fenrir`** | Pria | Tegas, dramatis, tajam, penekanan emosional kuat | Hook paradoks kognitif, peringatan risiko boncos, perbandingan tajam |

---

## 🎭 2. Style Tagging (Ekspresi Emosi Naskah)

Engine Gemini 3.8 Flash TTS mendukung ekspresi emosional melalui sintaks tag XML di awal kalimat naskah:

```markdown
<Friendly> Teks yang diucapkan dengan senyuman dan kehangatan.
<Professional> Teks yang diucapkan dengan artikulasi formal, tenang, dan objektif.
<Enthusiastic> Teks yang diucapkan dengan semangat tinggi dan energi kinetik.
<Calm> Teks yang diucapkan perlahan, mendalam, dan menenangkan.
<Dramatic> Teks yang diucapkan dengan tensi tegang dan penekanan intonasi serius.
```

### Rekomendasi Pemilihan Style per Sekuen Video:
1. **Detik 0–3 (Hook Penahan Scroll):** Gunakan suara `Puck` atau `Fenrir` dengan style `<Enthusiastic>` atau `<Dramatic>`.
2. **Detik 4–15 (Friction & Problem Statement):** Gunakan suara `Koda` atau `Ludo` dengan style `<Calm>` atau `<Professional>`.
3. **Detik 16–25 (Solution & Value Offer):** Gunakan suara `Koda` atau `Aoede` dengan style `<Friendly>`.
4. **Detik 26–30 (Micro-CTA):** Gunakan suara `Koda` dengan style `<Enthusiastic>`.

---

## 🎚️ 3. Pengaturan Suhu (Temperature)

- **`temperature: 1.0 – 1.1` (Default / Paling Natural):** Menghasilkan intonasi variatif alami percakapan manusia Indonesia tanpa terdengar monoton atau robotik.
- **`temperature: 0.7 – 0.9` (Konservatif / Formal):** Cocok untuk teks disclaimer perbankan, instruksi langkah-demi-langkah, atau angka-angka nominal agar pembacaan sangat stabil dan presisi.
- **`temperature: 1.2 – 1.3` (Dinamis / Teatrikal):** Cocok untuk sandiwara pendek, hook kejutan, atau ekspresi heboh.
