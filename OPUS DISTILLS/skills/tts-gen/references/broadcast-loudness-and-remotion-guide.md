# Standar Broadcast Loudness & Integrasi Remotion (`broadcast-loudness-and-remotion-guide.md`)

Standar teknis pemrosesan audio Text-to-Speech agar siap siar (*broadcast-ready*) pada platform YouTube Shorts, Instagram Reels, TikTok, Meta Ads, serta integrasi langsung ke programmatic video engine **Remotion**.

---

## 🎛️ 1. Standar Broadcast Loudness (EBU R128 & ITU-R BS.1770-4)

Platform media sosial (Instagram, TikTok, YouTube) menerapkan algoritma normalisasi audio otomatis (*Loudness Penalty*). Jika audio terlalu pelan, suara akan tenggelam oleh backsound. Jika terlalu keras (melebihi True Peak), audio akan terdistorsi dan dikompresi paksa secara kasar oleh platform.

Filter FFmpeg standar yang diotomasi dalam `gemini_tts.py`:
```bash
ffmpeg -y -i input_raw.wav -af "loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000" -c:a pcm_s16le output_master.wav
```

### Parameter Kunci:
1. **Integrated Loudness (`I = -16 LUFS`):** Standar emas platform mobile video vertikal. Suara vokal terdengar bertenaga, renyah, dan tidak kalah saing di feed pengguna.
2. **True Peak (`TP = -1.5 dBTP`):** Mencegah distorsi inter-sample saat platform melakukan konversi lossy AAC/Opus pada server Instagram/TikTok.
3. **Loudness Range (`LRA = 9 LU`):** Menjaga konsistensi volume antara kalimat hook dan kalimat penutup tanpa fluktuasi drastis.
4. **Sample Rate (`48000 Hz / 48 kHz`):** Standar industri video sinkron 30fps/60fps untuk mencegah audio-video desync di timeline Remotion.

---

## 🎬 2. Integrasi ke Remotion (Programmatic Video)

Dalam proyek video Remotion (misal `REMOTION/public/audio/`), simpan hasil voiceover ke folder `public/audio/` agar dapat langsung diimpor oleh komponen `<Audio />`:

```tsx
import { Audio, staticFile } from "remotion";

export const MyVideo = () => {
  return (
    <>
      {/* Voiceover Master dari tts-gen */}
      <Audio
        src={staticFile("audio/voiceover_ide1.mp3")}
        volume={1.0}
      />

      {/* Background Music dengan Ducking Otomatis (-18dB saat VO bicara) */}
      <Audio
        src={staticFile("audio/bgm_chill.mp3")}
        volume={0.15}
      />
    </>
  );
};
```

---

## 🔁 3. Alur Otomasi Eksekusi Batch Naskah

Jika ingin men-generate beberapa naskah video sekaligus dari file JSON/CSV:

```bash
# Simpan langsung ke folder public Remotion:
tts-gen "Masih mau bakar 25 juta setahun buat sewa kontrakan?" -v Koda -s Enthusiastic -o /path/to/remotion/public/audio/hook_01.mp3 --no-play
tts-gen "Mending cicil rumah sendiri 1,8 jutaan dekat Juanda Sidoarjo." -v Koda -s Friendly -o /path/to/remotion/public/audio/body_01.mp3 --no-play
```
