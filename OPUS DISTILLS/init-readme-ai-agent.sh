#!/usr/bin/env bash
set -e

TARGET_DIR="${1:-.}"
cd "$TARGET_DIR"

echo "🔍 Checking readme-ai-agent/ and AGENTS.md in $(pwd)..."
mkdir -p readme-ai-agent

# Migrate legacy CLAUDE.md or AGENT.md inside readme-ai-agent/ to AGENTS.md
if [ -f "readme-ai-agent/CLAUDE.md" ] && [ ! -f "readme-ai-agent/AGENTS.md" ]; then
  mv "readme-ai-agent/CLAUDE.md" "readme-ai-agent/AGENTS.md"
  echo "♻️ Migrated readme-ai-agent/CLAUDE.md -> readme-ai-agent/AGENTS.md"
fi
if [ -f "readme-ai-agent/AGENT.md" ] && [ ! -f "readme-ai-agent/AGENTS.md" ]; then
  mv "readme-ai-agent/AGENT.md" "readme-ai-agent/AGENTS.md"
  echo "♻️ Migrated readme-ai-agent/AGENT.md -> readme-ai-agent/AGENTS.md"
fi
if [ -f "readme-ai-agent/SECURITY-AUDIT.md" ] && [ ! -f "readme-ai-agent/SECURITY.md" ]; then
  mv "readme-ai-agent/SECURITY-AUDIT.md" "readme-ai-agent/SECURITY.md"
  echo "♻️ Migrated readme-ai-agent/SECURITY-AUDIT.md -> readme-ai-agent/SECURITY.md"
fi

# 1. Root AGENTS.md (Antigravity CLI Always-On Entry Point)
if [ ! -f "AGENTS.md" ]; then
cat << 'EOT' > AGENTS.md
# Project Agent Rules & Live Brain (`AGENTS.md` — Google Antigravity CLI)

@[Project Brain State](readme-ai-agent/AGENTS.md)

## Mandatory Rules
- **Master Brain:** Always apply `opus-distills` + `web-master-agent` + `terse-respon`.
- **State Continuity:** Read `readme-ai-agent/AGENTS.md` (<150 tokens) at the start of every turn and update it at the end of every milestone.
- **Anti-Footer-Slop:** Never output framework names ("Built with Next.js/Tailwind") or theme prompt labels in UI footers.
EOT
fi

# 2. 12 Files inside readme-ai-agent/
[ ! -f "readme-ai-agent/AGENTS.md" ] && cat << 'EOT' > readme-ai-agent/AGENTS.md
# Live Project State Checkpoint (`readme-ai-agent/AGENTS.md` — Max 150 Tokens)
- **Active Phase:** Phase 1 (Audit & Planning)
- **Chosen Tech Stack:** Pending Verification / Backfill from `package.json`
- **Locked Design Tokens:** Pending `STYLE-GUIDE.md` lock (OpenDesign 8-Dim + 300-Ref Vault)
- **Latest Git Restore Tag:** `restore-init`
- **Next Action:** Scan codebase & populate `PRD.md`, `TECHSTACK.md`, `STYLE-GUIDE.md`, and `TASK.md`.
EOT

for f in README.md PRD.md TECHSTACK.md STYLE-GUIDE.md SEO-GEO.md SECURITY.md SKILLS.md TASK.md BUG-AND-FIX.md GIT-RESTORE-POINTS.md DESIGN-CRITIQUE.md; do
  if [ ! -f "readme-ai-agent/$f" ]; then
    echo "# $f — Project Brain (\`readme-ai-agent/$f\`)" > "readme-ai-agent/$f"
    echo "" >> "readme-ai-agent/$f"
    echo "> Auto-initialized by Antigravity CLI \`readme-ai-agent\` guard. Agent must populate this file from codebase/user specs before shipping." >> "readme-ai-agent/$f"
  fi
done

echo "✅ 12-File readme-ai-agent/ (centered on AGENTS.md) + root ./AGENTS.md ready!"
