---
name: find-skills
description: "Fast categorized local & remote skill discovery (<5ms index, 6 virtual libraries, bilingual ID/EN ranking) via find_skills.py and npx skills find."
---

# Find Skills: Virtual 6-Category Skill Library & Fast Ranker

Meta-skill untuk mencari, mengategorikan, dan memuat skill spesialis secara presisi dalam hitungan **< 5 ms** dari indeks lokal terkompilasi (`data/skills-index.json`) maupun ekosistem open-agent (`skills.sh`).

> **Arsitektur Flat-Safe (Zero Discovery Break):** Secara fisik di disk, folder `skills/<nama-skill>/` tetap datar 1-level agar CLI Antigravity (`agy`), Gemini CLI, Cursor, dan Claude selalu mendeteksi seluruh skill secara otomatis. Kategorisasi ke dalam **6 Library Spesialis** dijalankan secara virtual lewat `SKILL-CATALOG.md` dan `data/skills-index.json`.

---

## 1. 6 Kategori Library Virtual Utama

Lihat daftar ringkas seluruh skill beserta trigger-nya di `SKILL-CATALOG.md`:

| ID Kategori | Fokus Domain | Skill Utama |
|---|---|---|
| `01-web-engineering` | Arsitektur web, coding Next.js, QA debugging, speed & Vercel shield | `web-master-agent`, `web-planning`, `web-builder`, `web-debugging`, `web-optimization` |
| `02-ui-design-taste` | Sistem UI web, taste audit, 48 tema Hallmark, ikonografi | `web-design`, `taste-design`, `hallmark`, `iconography` |
| `03-figma-visual-media` | Otomasi kanvas Figma/FigCraft, vektor SVG, prompt foto 8-layer, upscale 4K/8K | `figma-design`, `figma-create-ui`, `figcraft-use`, `figcraft-generate-design`, `figcraft-generate-library`, `svg-gen`, `image-gen`, `prompt-generator`, `visual-breakdown`, `upscale-img`, `gen-img` |
| `04-video-motion-audio` | Video Remotion 9:16, motion GSAP, voiceover TTS, slide deck PPTX/PDF | `remotion`, `web-animation`, `tts-gen`, `pdf-deck` |
| `05-growth-copy-research` | Riset konten viral FYP, hook lab, brainstorming, humanizer, live web search | `social-media-research`, `brainstorming`, `humanizer`, `websearch` |
| `06-core-agent-browser` | Master orchestrator, YAGNI minimalism, Chrome CDP HUD, GUI QA, RAM cleaner | `opus-distills`, `find-skills`, `anti-yes-man`, `chrome-browser-control`, `gui-automation`, `free-ram` |

*(Plugin terpasang di `~/.gemini/config/plugins/` dan skill eksternal di `~/.agents/skills/` juga otomatis terindeks dengan tag kategori `plugin:<nama>` atau kategorisasi heuristik.)*

---

## 2. Pencarian Cepat Lokal (< 5 ms) & Bilingual (ID + EN)

```bash
# 1. Lihat daftar kategori & jumlah skill per kategori
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --categories

# 2. Cari skill berdasarkan intent Bahasa Indonesia / Inggris (default top 5 hasil paling relevan)
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "bikin video reels talking head"
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "web vercel lemot kuota jebol"
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "tulisan masih kaku"

# 3. Browse seluruh skill dalam 1 kategori tertentu
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --category 04-video-motion-audio

# 4. Rebuild indeks JSON & SKILL-CATALOG.md setelah edit / tambah skill baru
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --rebuild
```

*(Jika sudah menjalankan `install-default-opus.sh`, shortcut CLI `find-skills` juga tersedia langsung di `~/.local/bin/find-skills`.)*

---

## 3. Pencarian & Instalasi Ekosistem Remote (`skills.sh`)

Gunakan hanya jika pencarian lokal tidak menemukan kapabilitas yang dicari:

```bash
# Cari skill remote
npx -y skills find "<query>" --owner vercel-labs

# Filter kualitas sebelum pasang: prioritaskan >1.000 install & repo resmi kredibel
npx -y skills add <owner/repo@skill> -g -y

# On-demand Tier-2 Web Platform Guidance (262 fitur modern, hemat token):
npx modern-web-guidance@latest search "<query>"
```

Setelah instalasi remote via `find_skills.py --add <pkg>`, indeks lokal dan `SKILL-CATALOG.md` otomatis diperbarui.

---

## 4. Strict Guardrails

1. **Hemat Konteks Mutlak:** Default query `--top 5` agar hanya skill paling relevan yang masuk ke context; baca penuh `SKILL.md` skill terpilih dengan `read_file` saat akan dieksekusi.
2. **Flat Disk Structure:** Jangan pernah memindahkan folder `skills/<nama>/` ke subfolder kategori bersarang karena akan memecah auto-discovery CLI agent.
3. **Anti-Yes-Man & Brand Terminology:** Audit setiap skill pihak ketiga sebelum dipakai; pastikan desain eksternal diselaraskan dengan standar GSM v2.5 ("Desain Modern Tegas", minimalis berkelas, bebas jargon asing kaku).
