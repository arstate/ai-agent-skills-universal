# `readme-ai-agent/STYLE-GUIDE.md` — Authoring & Output Standards

## 1. Standar File `SKILL.md`
- **Frontmatter wajib:**
  ```yaml
  ---
  name: <kebab-case-skill-name>
  description: "<1-2 kalimat padat kapan skill dipakai>"
  ---
  ```
- **Modular & Hemat Token:** Simpan instruksi inti yang padat di `SKILL.md`; pindahkan tabel panjang, katalog tema, atau contoh skrip ke `references/*.md` atau `scripts/`.
- **Anti-Stale Alias:** Jangan buat folder skill baru untuk alias yang sudah digabung.

## 2. Standar Visual Tools (`mindmap-engine` / `pdf-deck` / `web-design`)
- **Mindmap Canvas:** Dark dot-grid canvas (`template.html`), pan/zoom halus, bezier SVG edges, badge Fase 1–4, dan Sub Fitur cards.
- **Terminologi Terlarang:** Dilarang menggunakan kata `"brutalist"` secara positif; gunakan `"desain modern tegas"` atau `"minimalis berkelas"`.
- **Anti-`//` Slop:** Hindari `//` sebagai divider/kicker di UI; gunakan `·`, `—`, atau `|`.
