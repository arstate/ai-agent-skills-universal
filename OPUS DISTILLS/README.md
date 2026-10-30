# 🧠 Universal Opus Distills 5.5 Skills Pack — Google Antigravity CLI & IDE Edition

Paket lengkap **27 Specialist AI Agent Skills + Nutlope/hallmark v2.8.0 + High-Speed Browser Control + Rules Anti-Plenger + 12-File `readme-ai-agent/` Architecture** yang dirancang universal untuk Google Antigravity CLI (`agy`), Antigravity IDE, Cursor, dan VS Code.

---

## ⚡ Fitur Utama & Keunggulan

1. **Master Universal Dispatcher (`@opus-distills`):**
   Cukup tag `@opus-distills`, agen otomatis mendeteksi kebutuhan prompt pengguna dan me-load skill spesialis yang tepat tanpa perlu tag manual satu per satu.
2. **Hukum Besi Anti-Plenger (`view_file` Gate):**
   Memaksa AI untuk benar-benar membuka dan membaca file `SKILL.md` serta dokumen referensi sebelum menulis kode/jawaban, dan mencetak bukti baca `🔧 [Skills Auto-Loaded: ...]` di baris pertama.
3. **Nutlope/hallmark v2.8.0 Integration:**
   Dilengkapi engine `sloplint.mjs` (58 Gate anti-slop), 48 Material Themes (Nordic, Blueprint, Formwork, Werkstatt, dll.), dan 300+ Referensi Desain Dunia nyata.
4. **Sub-Millisecond Browser Control (`chrome-browser-control`):**
   Kontrol Chrome super cepat berbasis WebSocket CDP dengan Accessibility Tree tree-shaking (`backendDOMNodeId`), instant `Input.insertText`, serta **Mode Hybrid (Foreground Visual dengan Kapsul & Vignette vs Background Senyap)**.
5. **Mandatory 12-File `readme-ai-agent/AGENTS.md` Gate:**
   Standar arsitektur dokumentasi project web modern tanpa `CLAUDE.md`.

---

## 🚀 Cara Instalasi Cepat (1-Klik)

### Di Linux / macOS:
Cukup jalankan script installer otomatis di terminal:
```bash
bash install-default-opus.sh
```

### Untuk Project Web Tertentu:
Jika ingin memasang skills ke folder project aktif (`.agents/skills/`) dan membuat arsitektur 12-file `readme-ai-agent/`:
```bash
# 1. Pasang skill ke folder project
mkdir -p .agents/skills
cp -r skills/* .agents/skills/

# 2. Inisialisasi 12 file readme-ai-agent/
bash init-readme-ai-agent.sh .
```

### Di Windows (PowerShell):
Salin folder `skills/` ke `%USERPROFILE%\.gemini\antigravity-cli\skills\` dan file `auto-boot-configs/AGENTS.md` ke `%USERPROFILE%\.gemini\AGENTS.md`.

---

## 📂 Struktur Direktori Paket

```
OPUS DISTILLS/
├── auto-boot-configs/                  # Global Rules (AGENTS.md, GEMINI.md, .agents/rules, .cursor/rules)
├── readme-ai-agent-starter-template/   # 12 Template File Arsitektur Web (AGENTS, PRD, TECHSTACK, dll.)
├── skills/                             # 27 Specialist Skills
│   ├── anti-yes-man/                   # Co-Founder critical thinking
│   ├── brainstorming/                  # 139 marketing plays & psychology models
│   ├── chrome-browser-control/         # High-speed CDP browser automation + Visual HUD
│   ├── find-skills/                    # Dynamic on-demand skill discovery
│   ├── free-ram/                       # Linux kernel cache cleaning & RAM defrag
│   ├── generate-fresh-ideas/           # Viral outlier content research & 5-lens ATM
│   ├── gen-img/                        # Multi-ratio AI image generator
│   ├── gui-automation/                 # Multi-platform GUI tester
│   ├── hallmark/                       # Nutlope/hallmark v2.8.0 + 58-gate sloplint.mjs
│   ├── image-gen/                      # 8-layer photorealistic studio image prompt engine
│   ├── indo-genz-ponytail/             # Concise Indonesian tone
│   ├── optimasi-nextjs-bandwidth/      # Zero-usage Vercel bandwidth shield
│   ├── opus-distills/                  # Universal Master Auto-Skill Dispatcher
│   ├── ponytail/                       # Extreme YAGNI lazy senior developer
│   ├── prompt-generator/               # Commercial photography & interior prompt builder
│   ├── slidedeck-gen/                  # Autonomous 16:9 Slide Engine (Live CDP Dev, In-Browser Editor, PDF/PPTX)
│   ├── social-media-research/          # Viral content pattern recognition
│   ├── svg-gen/                        # 16 MP Flat 2D Vector & Microstock Icon Set Engine (0 Strokes, Dublin Core RDF)
│   ├── taste-design/                   # Non-web art director (3:4 feed, pitch decks, PDF)
│   ├── terse-respon/                   # Split-channel terse chat vs uncut code deliverables
│   ├── visual-breakdown/               # Smart 2-path image decomposition
│   ├── web-animation/                  # Official GreenSock GSAP Suite & ScrollTrigger
│   ├── web-builder/                    # Autonomous production web builder
│   ├── web-debugging/                  # 7-viewport responsive vision QA & security auditor
│   ├── web-design/                     # S-rank UI/UX + 300-Ref vault
│   ├── web-master-agent/               # Master web orchestrator
│   ├── web-optimization/               # Next.js CWV (LCP < 1.2s, INP < 200ms)
│   ├── web-planning/                   # User flow & interactive tech stack recommender
│   └── websearch/                      # Real-time web search engine
├── tools/                              # Cross-Platform Browser CLI & HUD Tools
│   ├── README.md                       # Master Universal Architecture Guide
│   ├── README_LINUX.md                 # Linux Operational Guide (X11/Wayland/Xvfb)
│   ├── README_WINDOWS.md               # Windows Operational Guide (PowerShell/CMD)
│   ├── README_MACOS.md                 # macOS Operational Guide (AppleScript/Gatekeeper)
│   ├── ai-cursor-hud.js                # Top Frosted Capsule, Lime Vignette & OS SVG pointer
│   ├── cdp_visual_agent.py             # Sub-millisecond CDP CLI with deep research, SERP & agentic loop
│   ├── launch-visible-chrome.sh        # Universal OS auto-detecting launcher
│   ├── linux/
│   │   └── launch-visible-chrome.sh    # Dedicated Linux launcher
│   ├── windows/
│   │   ├── launch-visible-chrome.bat   # Dedicated Windows CMD launcher
│   │   └── launch-visible-chrome.ps1   # Dedicated Windows PowerShell launcher
│   └── macos/
│       ├── launch-visible-chrome.sh    # Dedicated macOS Shell launcher
│       └── launch-visible-chrome.command # Double-clickable macOS Finder launcher
├── init-readme-ai-agent.sh             # Script migrasi & inisialisasi 12-file readme-ai-agent/
├── install-default-opus.sh             # Universal 1-click installer
├── PROMPT-UPGRADE-SKILLS-AGENT.md      # Master prompt copy-paste untuk agen baru
└── README.md                           # Dokumentasi panduan ini
```

---

## 🎯 Cara Memanggil Agen di Chat

1. **Cukup tag `@opus-distills`:**
   Agen otomatis me-load skill yang tepat sesuai kebutuhan tugas.
2. **Perintah Langsung Browser:**
   - `python3 tools/cdp_visual_agent.py tabs` (lihat semua tab Chrome)
   - `python3 tools/cdp_visual_agent.py switch 1` (pindah ke tab 1)
   - `python3 tools/cdp_visual_agent.py click "button" --no-switch` (klik di background tanpa ganggu layar)
