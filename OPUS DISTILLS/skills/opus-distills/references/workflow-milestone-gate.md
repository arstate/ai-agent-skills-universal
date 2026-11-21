# Mandatory 5-Step Milestone Workflow & Critical Ask-First Gate

Setiap task kompleks (build fitur, web, redesign, sistem, atau arsitektur) **WAJIB** mengikuti 5 milestone berurut (**Ide -> Mindmap -> PRD -> Task -> Build -> QA**). Dilarang keras loncat langsung ke coding sebelum M1 & M2 beres.

---

## M1 — Critical Discovery & Ask-First Gate (`Ide`: `ask_question` Minimal 5 Opsi)
1. **Audit Brief & Asumsi:** Identifikasi celah, ambiguitas, atau keputusan berisiko dari prompt user.
2. **Wajib Tanya Dulu (panggil `ask_question`, minimal 5 opsi pilihan per pertanyaan):**
   - **Q1 — User & Kebiasaan Saat Ini:** Siapa target user utama & cara mereka mencari/menyelesaikan masalah ini sekarang?
   - **Q2 — 1 Aksi Utama (Core Anchor):** Satu hal wajib berhasil dilakukan user sebelum menutup web/app?
   - **Q3 — Top 3 Fitur Wajib (`is_multi_select: true`):** Pilih 3 fitur prioritas Fase 1 (min 5 opsi fitur sesuai niche).
   - **Q4 — Keunggulan & Alasan Kembali (Retensi):** Apa pembeda utama dari solusi yang ada & apa yang bikin user balik lagi?
   - **Q5 — Arah Visual (`R1–R4`) & Tech Stack:** 5 opsi rekomendasi stack/visual (e.g., Next.js 15 Export, Hybrid BaaS, Astro 5, Vite SPA, Compose + register `R1–R4`).
3. **Rule:** Dilarang menebak data/tujuan bisnis diam-diam — kunci via `ask_question` dulu.

---

## M2 — Mindmap Engine, `PRD`, `DESIGN_SYSTEM.md` & `Task`
1. **Visual Mindmap Struktur Fitur (`mindmap-engine` MCP):**
   - Panggil MCP `mindmap-engine` -> `render_mindmap(project_dir, title, phases)` untuk membuat `readme-ai-agent/mindmap.json` + `readme-ai-agent/mindmap.html` (tree **Fase 1–4** lengkap dengan **Sub Fitur** tiap fitur).
   - Panggil `open_mindmap_preview(project_dir)` untuk auto-preview langsung di browser Chrome visible (port `9223`).
2. **Generate `PRD` & `Task` (`readme-ai-agent/`):**
   - Setelah Mindmap di-review/ACC, tulis `readme-ai-agent/` (12 file, termasuk `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, `TASK.md` terstruktur per Fase 1–4), `DESIGN_SYSTEM.md`, & `USER_FLOW_AND_PAGE_ARCHITECTURE.md` (plus `design-style-preview.html` untuk web).
3. **Confirm Gate:** Minta ACC user sebelum masuk M3.

---

## M3 — Surgical Milestone Execution
1. Kerjakan **satu milestone per iterasi** sesuai urutan M2.
2. Terapkan **Ponytail YAGNI Ultra:** stdlib/native dulu, 0 abstraksi spekulatif, 100% uncut di disk.
3. Terapkan **Decision-Traceable Rule:** setiap warna, font, layout, atau interaksi wajib punya alasan dari brief (*"was this chosen, or did it happen?"*).

---

## M4 — Adversarial Critique & Anti-Slop Gate
Nilai hasil kerja sebagai **kritikus**, bukan penulisnya:
1. **Passive Quality Gate:** Pertahankan art direction brand; buang default generik tanpa memaksa desain netral.
2. **Explicit Audit Modes:**
   - `--scan`: cek cepat skor & temuan slop.
   - `--fix`: perbaikan bedah pada permukaan bermasalah.
   - `--judge`: audit ketat 6-axis + `sloplint --render` di Chrome visible (port 9223).
3. **7-Viewport Vision QA:** Capture & inspeksi visual nyata (`360x800` s/d `1440x900`), pastikan 0 overlap & 0 horizontal overflow.

---

## M5 — Handover & Sync
1. Update `TASK.md` / `readme-ai-agent/` dengan status selesai.
2. Kirim ringkasan hasil sesuai format `Indo-Caveman Ultra` (`[Status/Hasil]. [Detail/File]. [Next?]`).
