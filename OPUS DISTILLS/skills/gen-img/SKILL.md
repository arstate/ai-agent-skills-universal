---
name: gen-img
description: "Dual-engine AI image CLI (/gen-img): Primary AIStudio2API 4K native (High Thinking + Web/Image Search) with auto-fallback to 9Router Antigravity."
---

# GEN-IMG: Dual-Engine 4K AI Image Generator & Auto-Fallback

Skill CLI & Python API untuk generate maupun transform gambar AI (`image-to-image`) dengan arsitektur **Dual-Engine**:
1. **Primary (`aistudio2api`):** `http://127.0.0.1:2048/v1beta/models/gemini-nano-banana-2.1:generateContent` — **Native 4K**, **High Thinking**, `responseModalities: ["IMAGE", "TEXT"]`, serta grounding `googleSearch` (`webSearch` + `imageSearch`).
2. **Auto-Fallback (`9router-fallback`):** `http://127.0.0.1:20128` (`ag/gemini-3.1-flash-image` via `/v1/chat/completions` lalu `/v1/images/generations`) — aktif otomatis saat AIStudio2API kena rate-limit (`429`), error (`4xx`/`5xx`), timeout, unreachable, JSON error, atau tidak mengembalikan gambar.
3. **Anti-Downscale 4K:** Hasil native 4K dari AIStudio2API **dilarang** di-crop (`crop_to_ratio()` hanya berjalan untuk hasil `9router` / `9router-fallback`).
4. **Wajib Tanya Balik (Pre-Flight Gate):** Jika prompt user **belum menyebut aspek rasio (`-r`) ATAU resolusi (`-s`: `1K`/`2K`/`4K`)**, **STOP & wajib tanya balik singkat** sebelum generate (pakai `ask_question` atau 2 baris: pilih **Rasio** `1:1 / 3:4 / 4:5 / 9:16 / 16:9` & **Resolusi** `1K` cepat / `2K` tajam / `4K` master). Langsung eksekusi hanya jika keduanya sudah disebut atau user eksplisit bilang *"bebas/auto"*.

---

## 1. Penggunaan Cepat (CLI Global `/home/arya/.local/bin/gen-img`)

```bash
# Default: AIStudio2API 4K Native + High Thinking + Web/Image Search (rasio auto)
gen-img "Minimalist Indonesian specialty coffee bottle on travertine plinth, morning window light" --json

# Custom rasio, resolusi 2K/4K, dan thinking level
gen-img "Luxury modern tropical house facade in Surabaya at dusk" -r 3:4 -s 4K --thinking high -o "/tmp/facade_4k.jpg"

# Image-to-Image dengan gambar referensi lokal
gen-img "Keep the exact person identity, place in clean alabaster studio cyclorama" \
  -i "/path/to/reference.jpg" -r 3:4 -s 4K -o "/tmp/studio_4k.jpg"

# Nonaktifkan Google Web & Image Search grounding
gen-img "Minimalist geometric poster typography, warm cream paper" --no-search -r 3:4

# Paksa provider tertentu (aistudio / 9router) atau bypass langsung via prefix ag/... / ais/...
gen-img "Clean espresso cup product shot" --provider 9router -r 1:1
gen-img "Clean espresso cup product shot" -m "ag/gemini-3.1-flash-image" -r 3:4
```

### Daftar Flag CLI
| Flag | Default | Pilihan | Fungsi |
|---|---|---|---|
| `-r`, `--ratio` | `auto` | `auto`, `1:1`, `3:4`, `4:3`, `9:16`, `16:9`, `2:3`, `3:2`, `4:5`, `21:9` | Rasio aspek gambar |
| `-s`, `--size` | `4K` | `1K`, `2K`, `4K` | Resolusi native AIStudio2API |
| `--thinking` | `high` | `minimal`, `medium`, `high` | Level thinking AIStudio2API |
| `--provider` | `auto` | `auto`, `aistudio`, `9router` | Mode routing provider |
| `--no-search` | `False` | flag | Matikan `webSearch` + `imageSearch` grounding |
| `-i`, `--image` | `None` | path / URL / data URI | Gambar referensi (Image-to-Image) |
| `-o`, `--output` | auto `.jpg`/`.png` | path file | Lokasi simpan output |
| `-m`, `--model` | auto per provider | `gemini-nano-banana-2.1`, `ag/...`, `ais/...` | Override model (`ag/` & `ais/` otomatis bypass ke 9Router) |
| `--json` | `False` | flag | Output metadata JSON terstruktur |

---

## 2. Integrasi Python (`generate_image`) — Backward Compatible

```python
import sys
sys.path.append("/home/arya/.gemini/config/skills/gen-img/scripts")
from gen_img import generate_image

res = generate_image(
    prompt="Editorial minimalist product photo of ceramic tumbler on stone surface",
    ratio="3:4",
    size="4K",
    thinking="high",
    provider="auto",
    use_search=True,
    output_path="tumbler_4k.jpg",
)
print(res["provider_used"], res["size"], res["output_path"])
```

---

## 3. Spesifikasi Endpoint & Env Vars

- **Primary AIStudio2API (`AISTUDIO_URL`):** `http://127.0.0.1:2048` · Header `x-goog-api-key: $AISTUDIO_API_KEY` (`sk-aistudio-local`) · Model `AISTUDIO_MODEL` (`gemini-nano-banana-2.1`).
- **Fallback 9Router (`ROUTER_URL`):** `http://127.0.0.1:20128` · Auth `Bearer $ROUTER_API_KEY` · Model `FALLBACK_MODEL` (`ag/gemini-3.1-flash-image`).
- **Dependencies:** Python 3 Standard Library only (opsional ImageMagick `magick` untuk crop rasio fallback `9router`).
