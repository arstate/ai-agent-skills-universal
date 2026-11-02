---
name: tts-gen
description: Gemini 3.8 Flash TTS Voiceover Engine & Key Router with Edge-TTS Fallback, EBU R128 Broadcast Loudness Mastering, Multi-Key Failover, and Support for 7 Expressive Voices (Koda, Ludo, Aoede, Kore, Puck, Charon, Fenrir). Trigger when user types /tts-gen, @tts-gen, tts-gen, notif-tts, or asks for voiceover, text-to-speech, audio narration for reels, TikTok, or Remotion.
---

# `tts-gen` — Gemini 3.8 Flash TTS Voiceover Engine & Key Router

Engine Text-to-Speech (TTS) berstandar siar (*broadcast-ready*) berbasis **Google Gemini 3.8 Flash TTS** dengan auto-failover multi-API key, normalisasi loudness EBU R128 (-16 LUFS, 48 kHz), fallback otomatis ke Microsoft Edge-TTS, serta kurasi 7 karakter suara ekspresif untuk konten video Reels, TikTok, YouTube Shorts, dan video programmatic Remotion.

> **Triggers & Aliases:** `/tts-gen`, `@tts-gen`, `tts-gen`, `notif-tts`, `gemini-tts`.

---

## 📚 Mandatory References to Read (Akses via `read_file`)
1. Read `references/voices-and-styles-guide.md` untuk panduan karakter 7 suara dan style tags ekspresi emosional.
2. Read `references/broadcast-loudness-and-remotion-guide.md` untuk integrasi video timeline Remotion dan standar EBU R128.

---

## 🎙️ 1. Matriks 7 Karakter Suara Resmi

| Voice | Gender | Karakter Akustik | Penggunaan Ideal |
| :--- | :--- | :--- | :--- |
| **`Koda`** *(Default)* | Pria | Modern, natural, confident, luwes | Voiceover Reels, TikTok, properti, gaya milenial |
| **`Ludo`** | Pria | Tenang, artikulatif, low pitch, ramah | Edukasi finansial, konsultasi KPR, narasi explainer |
| **`Aoede`** | Wanita | Elegan, berwibawa, artikulasi jernih | Properti mewah (Dark Luxury), skincare, corporate |
| **`Kore`** | Wanita | Santai, bersahabat, kasual | Video POV, gaya obrolan natural, review produk |
| **`Puck`** | Pria | Energik, antusias, punchy | Hook kinetik 3 detik awal, promo diskon, flash sale |
| **`Charon`** | Pria | Berat, wibawa formal (*deep baritone*) | Pengumuman resmi, dokumenter, otoritas brand |
| **`Fenrir`** | Pria | Tegas, tajam, dramatis | Hook paradoks kognitif, peringatan risiko boncos |

---

## ⚡ 2. Eksekusi Cepat via Terminal (`tts-gen` / `notif-tts`)

CLI global tersedia langsung di `$PATH` (`~/.local/bin/tts-gen` dan `~/.local/bin/notif-tts`):

### A. Ucapkan Kalimat & Putar Otomatis (Default: Koda, Friendly):
```bash
tts-gen "Halo mas, naskah reels sudah siap dirender sekarang!"
```

### B. Pilih Karakter Suara & Style Ekspresi:
```bash
# Menggunakan suara Aoede (wanita elegan) dengan style Professional:
tts-gen "Cluster modern 5 menit dari MERR Surabaya siap huni." -v Aoede -s Professional

# Menggunakan suara Puck (pria energik) untuk hook video:
tts-gen "Masih mau buang 25 juta setahun cuma buat ngontrak?" -v Puck -s Enthusiastic
```

### C. Simpan ke File Audio Siap Pakai (Tanpa Diputar):
```bash
# Simpan format MP3 192k (otomatis dinormalisasi -16 LUFS):
tts-gen "Naskah narasi video properti." -o /path/to/reels_vo.mp3 --no-play

# Simpan format WAV broadcast 48kHz:
tts-gen "Naskah narasi video properti." -o /path/to/reels_vo.wav --no-play
```

### D. Lihat Daftar Suara Lengkap:
```bash
tts-gen --list-voices
```

---

## 💻 3. Penggunaan Langsung di Script Python Agen

```python
import sys
import os

# Import generator function
from gemini_tts import generate_speech

# Generate audio untuk video Remotion
audio_path = generate_speech(
    text="DP nol persen dan free semua biaya sampai terima kunci.",
    voice_name="Koda",
    style_name="Friendly",
    temperature=1.1,
    output_path="public/audio/vo_promo.mp3",
    play=False
)
print("File tersimpan:", audio_path)
```

---

## 🛡️ 4. Ketahanan Sistem (Zero Downtime)
1. **Multi-Key Failover:** Jika key utama terkena limit `HTTP 429`, router otomatis beralih ke key cadangan berikutnya secara instan tanpa crash.
2. **Edge-TTS Graceful Fallback:** Jika seluruh kuota Gemini habis atau koneksi terganggu, sistem otomatis berpindah ke Microsoft Edge-TTS (`id-ID-ArdiNeural` / `id-ID-GadisNeural`) sehingga alur produksi video tidak pernah terhenti.
3. **EBU R128 Loudness:** Seluruh audio otomatis diproses FFmpeg `-af loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000` agar vokal langsung siap tayang di medsos tanpa distorsi.
