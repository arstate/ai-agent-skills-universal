# Mandatory 5-Step Milestone Workflow & Critical Ask-First Gate

Setiap task kompleks (build fitur, web, redesign, sistem, atau arsitektur) **WAJIB** mengikuti 5 milestone berurut. Dilarang keras loncat langsung ke coding sebelum M1 & M2 beres.

---

## M1 — Critical Discovery & Ask-First Gate (`ask_question`)
1. **Audit Brief & Asumsi:** Identifikasi celah, ambiguitas, atau keputusan berisiko dari prompt user.
2. **Wajib Tanya Dulu (1 pesan padat, maks 4 pertanyaan tajam):**
   - **(a) Market & Bahasa:** Target audiens, negara, dan bahasa utama UI/copy.
   - **(b) Existing System vs New:** Ada design system/Figma/tokens/repo existing, atau bangun dari nol?
   - **(c) Core Anchor / 1 Hal Utama:** 1 hal paling berkesan atau fungsi utama yang wajib langsung terlihat di viewport pertama.
   - **(d) Expression Register (`R1–R4`):** `R1 Utility` / `R2 Composed` / `R3 Expressive` / `R4 Experimental` + rekomendasi agent & trade-off-nya.
3. **Rule:** Jika ada yang tidak jelas, **panggil `ask_question`**. Dilarang menebak diam-diam.

---

## M2 — Architecture, `DESIGN_SYSTEM.md` & Milestone Plan
1. **Binary Anti-Slop Checks:** Konversi brief jadi aturan biner (warna 60/30/10, tipografi, grid, larangan AI slop).
2. **Artifact Wajib (untuk web/UI):**
   - `DESIGN_SYSTEM.md` (single source of truth token, font, spacing, komponen).
   - `readme-ai-agent/` (12 file) + `USER_FLOW_AND_PAGE_ARCHITECTURE.md` (Mermaid) jika proyek repo baru.
3. **Pecah Milestone:** Tulis daftar milestone berurut (M3.1, M3.2, dst.) dengan kriteria selesai yang terukur.
4. **Confirm Gate:** Minta ACC user sebelum masuk M3.

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
