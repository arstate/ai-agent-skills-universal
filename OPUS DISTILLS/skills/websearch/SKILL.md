---
name: websearch
description: "Live web search & clean Markdown fetch (/websearch) via local 9router Google Grounding API (localhost:20128) and Jina Reader fallback."
---

# 🌐 WEBSEARCH & WEB FETCH SKILL

Skill untuk penelusuran web real-time berkecepatan tinggi dan ekstraksi konten web ke Markdown menggunakan integrasi lokal **9router Google Grounding Search API** (port `20128`) dan **Jina Reader / Native Fetch**.

---

## ⚡ 1. CARA PENGGUNAAN CEPAT (CLI)

Perintah CLI `websearch` sudah terpasang global di `$PATH` (`/home/arya/.local/bin/websearch`).

### A. Penelusuran Web (Google Grounding AI Search):
```bash
# Pencarian cepat
websearch "Tren visual media sosial 2026"

# Atur batas jumlah hasil (default: 5)
websearch "Harga rumah subsidi Sidoarjo" -n 3

# Format raw JSON untuk pemrosesan script / pipeline
websearch "Next.js 15 App Router" --json
```

### B. Ekstraksi Konten URL (Web Fetch ke Markdown):
```bash
# Fetch artikel / halaman web langsung ke Markdown bersih
websearch -f "https://example.com"

# Atau cukup masukkan URL langsung sebagai argumen
websearch "https://example.com"
```

---

## 🔌 2. INTEGRASI LANGSUNG VIA CURL / HTTP

Jika dipanggil via curl atau agent HTTP client:

### Search Endpoint:
```bash
curl -X POST http://localhost:20128/v1/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-47024d86a10c3a4b-2att59-c53bbf8a" \
  -d '{
    "model": "ag",
    "query": "Kata kunci pencarian",
    "search_type": "web",
    "max_results": 5
  }'
```

---

## 🐍 3. INTEGRASI PYTHON SCRIPT / AGENT

```python
from websearch import search_web, fetch_url

# Pencarian web
data = search_web("Update algoritma Meta Ads 2026", max_results=3)
print(data["answer"]["text"])  # Sintesis jawaban AI
for res in data["results"]:
    print(res["title"], res["url"])

# Fetch halaman web
markdown_content = fetch_url("https://example.com/artikel")
```

---

## 🛡️ 4. KONFIGURASI SISTEM
- **Endpoint:** `http://localhost:20128/v1/search`
- **Default Auth Token:** `Bearer sk-47024d86a10c3a4b-2att59-c53bbf8a`
- **Script Executable:** `/home/arya/.gemini/config/skills/websearch/scripts/websearch.py`
- **Symlink Bin:** `/home/arya/.local/bin/websearch`
- **Dependencies:** Python 3 Standard Library (Zero third-party pip dependencies required).

---

## 🔍 5. MULTI-PLATFORM SOCIAL & PLATFORM EXTRACTION FALLBACK (`Agent-Reach` PATTERN)

Saat melakukan riset media sosial, video pendek, atau forum lintas platform (TikTok, Instagram, YouTube, X, Reddit, GitHub):
1. **Urutan Fallback Native (Tanpa Install Paksa CLI Eksternal):**
   - Cek opsional: `command -v agent-reach >/dev/null` jika sudah terpasang di mesin user.
   - **Jalur Default Native (Zero Bloat):**
     * **Web & Artikel Panjang:** `websearch -f "<url>"` (Jina Reader Markdown extraction) atau Google Grounding `websearch "<query>"`.
     * **Metadata Video TikTok / Reels / YouTube:** `yt-dlp --skip-download --dump-json "<url>"` (atau `--write-auto-subs`).
     * **Halaman Dinamis / Butuh Render JS:** `python3 ~/.agents/tools/cdp_visual_agent.py research --json`.
2. **Aturan Keamanan Kredensial:** Jangan pernah mengekspor atau memasukkan cookie sesi akun bisnis/pribadi utama ke scraper pihak ketiga yang tidak terverifikasi. Gunakan endpoint publik atau profil terisolasi.
