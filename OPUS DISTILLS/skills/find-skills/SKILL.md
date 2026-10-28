---
name: find-skills
description: Discover and install agent skills from the open ecosystem (skills.sh) and local workspace registry. Provides dynamic on-demand skill routing to minimize input token usage and avoid context bloat. Use when looking for specialized skills, tools, templates, or workflows to extend agent capabilities mid-task.
---

# 🔍 Find Skills: Dynamic On-Demand Skill Discovery & Token Optimizer

Skill meta untuk menemukan, memfilter, dan memasang skill agen baru secara dinamis dari ekosistem open-agent (`skills.sh` / Vercel Labs) maupun direktori lokal (`~/.gemini/config/skills` dan `~/.agents/skills`).

Dirancang khusus untuk **menghemat token input (context conservation)**: daripada menyuntikkan seluruh dokumentasi puluhan skill sekaligus ke dalam context prompt, agen cukup memanggil `find-skills` untuk memuat atau menginstal skill spesialis hanya saat dibutuhkan (*lazy loading*).

---

## ⚡ 1. KAPAN MENGGUNAKAN SKILL INI

Gunakan `find-skills` saat:
- Pengguna meminta tugas spesifik di luar skill inti yang sudah aktif (misal: testing khusus, library backend tertentu, integrasi tool eksternal).
- Ingin mengecek apakah ada skill yang sudah terpasang di sistem lokal untuk menyelesaikan masalah tertentu.
- Ingin menghemat token input dengan hanya memuat skill yang benar-benar relevan dengan task.
- Pengguna bertanya *"ada skill buat X gak?"*, *"bisa cariin skill untuk X"*, atau *"install skill X"*.

---

## 🛠️ 2. DUAL-TIER DISCOVERY ARCHITECTURE

Sistem bekerja dalam 2 tingkat untuk efisiensi maksimal:

```text
                                  [Task / Query Pengguna]
                                             │
                                             ▼
                             ┌───────────────────────────────┐
                             │ TIER 1: Local Registry Scan   │ (0 ms, 0 Network, 0 Token Tambahan)
                             │ (~/.gemini & ~/.agents/skills)│
                             └───────────────┬───────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
               [Skill Ditemukan]                             [Belum Tersedia]
                      │                                             │
                      ▼                                             ▼
          [Load On-Demand ke Prompt]                 ┌───────────────────────────────┐
                                                     │ TIER 2: Remote Ecosystem Search│ (skills.sh / npx skills)
                                                     │ npx -y skills find <query>    │
                                                     └───────────────┬───────────────┘
                                                                     │
                                                                     ▼
                                                          [Filter Kualitas & Reputasi]
                                                                     │
                                                                     ▼
                                                          [Install: npx skills add]
```

### Tier 1: Pencarian Cepat di Sistem Lokal (0 Token & 0ms)
Gunakan helper script bawaan untuk memeriksa apakah kapabilitas sudah ada di disk host:
```bash
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "<kata kunci>"
```
*Contoh:*
```bash
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "meta ads"
python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local "web optimization"
```

### Tier 2: Pencarian di Ekosistem Global (`skills.sh` / Vercel Labs)
Jika skill belum terpasang di lokal, cari di indeks 190+ skill global menggunakan CLI:
```bash
# Pencarian interaktif / keyword
npx -y skills find [query]

# Pencarian terfokus berdasarkan organisasi GitHub
npx -y skills find [query] --owner vercel-labs
npx -y skills find [query] --owner anthropics
```

---

## 🛡️ 3. STANDAR FILTER KUALITAS SKILL (SEBELUM MEREKOMENDASIKAN)

Sebelum memasang atau merekomendasikan skill baru dari remote:
1. **Jumlah Instalasi:** Prioritaskan skill dengan minimal 1.000+ instalasi. Waspada terhadap skill < 100 instalasi.
2. **Reputasi Pembuat:** Utamakan repositori kredibel (`vercel-labs`, `anthropics`, `microsoft`, `ComposioHQ`).
3. **Audit Keamanan & Guardrails:** Pastikan skill tidak melanggar aturan tata kelola (bebas kata terlarang, tidak membocorkan kredensial, dan tidak merusak arsitektur lokal).

---

## 📦 4. PROTOKOL INSTALASI SATU PERINTAH

Untuk memasang skill yang sudah divalidasi ke lingkungan agen:

```bash
# Pemasangan global tanpa konfirmasi interaktif
npx -y skills add <owner/repo@skill> -g -y
```

*Contoh instalasi:*
```bash
# Memasang guideline performa Next.js / React dari Vercel
npx -y skills add vercel-labs/agent-skills@react-best-practices -g -y

# Memasang skill review kode
npx -y skills add anthropics/skills@code-review -g -y
```

---

## 🔄 5. UPDATE & PEMELIHARAAN SKILL TERPASANG

Periksa dan perbarui skill terpasang ke versi terbaru:
```bash
# Menampilkan seluruh skill global
npx -y skills ls -g

# Memperbarui seluruh skill global
npx -y skills update -g -y
```

---

## ⛔ 6. STRICT GUARDRAILS

1. **Efisiensi Token Mutlak:** Jangan memuat seluruh isi file skill ke obrolan jika hanya butuh menjalankan satu perintah CLI atau membaca satu fungsi spesifik.
2. **Anti-Yes-Man:** Jika pengguna meminta menginstal skill antah-berantah yang mencurigakan atau kualitasnya rendah (< 10 star), agen wajib mengingatkan risiko dan menyarankan alternatif resmi.
3. **Penyelarasan Bahasa Desain:** Setiap skill desain yang diinstal dari luar wajib disesuaikan dengan GSM v2.5 / standar agensi ("Desain Modern Tegas", minimalis berkelas, tanpa jargon asing yang kaku).
