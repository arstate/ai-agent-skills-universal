#!/usr/bin/env python3
"""
find_skills.py - Categorized Virtual Skill Library & <5ms Discovery Engine
Part of find-skills meta-skill for Antigravity & Opus Distills Swarm Engine.
Pure Python stdlib (zero external pip dependencies).
"""

import argparse
import difflib
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
SKILL_ROOT = os.path.dirname(SCRIPT_DIR)
PARENT_SKILLS_DIR = os.path.dirname(SKILL_ROOT)
DATA_DIR = os.path.join(SKILL_ROOT, "data")
INDEX_FILE = os.path.join(DATA_DIR, "skills-index.json")
CATALOG_FILE = os.path.join(SKILL_ROOT, "SKILL-CATALOG.md")

PRUNE_DIRS = {
    "node_modules",
    ".git",
    ".next",
    ".turbo",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    "templates",
    "design-repositories",
    ".cache",
}

CATEGORIES = {
    "01-web-engineering": {
        "label": "Web Architecture, Coding, QA & Speed",
        "skills": {
            "web-master-agent",
            "web-planning",
            "web-builder",
            "web-debugging",
            "web-optimization",
        },
        "keywords": {
            "web", "website", "landing", "nextjs", "next", "astro", "react", "vite",
            "fullstack", "architecture", "planning", "userflow", "mermaid", "prd",
            "seo", "geo", "vercel", "cloudflare", "cache", "pwa", "cwv", "lcp",
            "bandwidth", "debug", "debugging", "security", "audit", "responsive",
            "overflow", "sloplint", "readme-ai-agent", "firebase", "cloudinary",
        },
    },
    "02-ui-design-taste": {
        "label": "Web UI Systems, Design Taste & Audits",
        "skills": {
            "web-design",
            "taste-design",
            "hallmark",
            "iconography",
        },
        "keywords": {
            "ui", "ux", "design", "desain", "taste", "tailwind", "oklch", "shadcn",
            "lucide", "hallmark", "typography", "color", "contrast", "spacing",
            "icon", "icons", "ikon", "layout", "carousel", "deck", "lint", "review",
            "critique", "cold-hero", "rubric", "theme", "tema", "estetik", "rapi",
        },
    },
    "03-figma-visual-media": {
        "label": "Figma, Vectors, AI Photo Prompts & 4K Upscale",
        "skills": {
            "figma-design",
            "figma-create-ui",
            "figcraft-use",
            "figcraft-generate-design",
            "figcraft-generate-library",
            "svg-gen",
            "image-gen",
            "prompt-generator",
            "visual-breakdown",
            "upscale-img",
            "gen-img",
        },
        "keywords": {
            "figma", "figcraft", "use_figma", "poster", "ads", "gsm", "svg",
            "vector", "vektor", "eps", "adobe", "stock", "image", "foto", "gambar",
            "prompt", "breakdown", "nanobanana", "nano", "banana", "chatgpt",
            "cyclorama", "upscale", "boost", "4k", "8k", "cuda", "resolusi",
            "tajam", "buram", "blur", "perbesar", "seed", "fusion",
        },
    },
    "04-video-motion-audio": {
        "label": "Programmatic Video, GSAP Motion, TTS & Slide Decks",
        "skills": {
            "remotion",
            "web-animation",
            "tts-gen",
            "pdf-deck",
        },
        "keywords": {
            "remotion", "video", "reels", "tiktok", "shorts", "talking-head",
            "facecam", "facecammaxxing", "whisper", "cutout", "mp4", "render",
            "gsap", "scrolltrigger", "splittext", "motion", "animasi", "animation",
            "spring", "parallax", "tts", "voice", "voiceover", "vo", "suara",
            "dubbing", "narasi", "audio", "loudness", "slide", "slides", "deck",
            "pitch", "presentasi", "presentation", "pdf", "pptx", "powerpoint",
        },
    },
    "05-growth-copy-research": {
        "label": "Viral Content, Hooks, Strategy, Humanizer & Web Search",
        "skills": {
            "social-media-research",
            "brainstorming",
            "humanizer",
            "websearch",
        },
        "keywords": {
            "viral", "fyp", "hook", "hooks", "caption", "konten", "content",
            "outlier", "retention", "save", "share", "instagram", "ig", "threads",
            "brainstorming", "ide", "ideas", "marketing", "strategy", "strategi",
            "humanizer", "humanize", "slop", "kaku", "robot", "manusiawi",
            "tulisan", "copywriting", "websearch", "search", "riset", "scrape",
            "fetch", "markdown", "jina",
        },
    },
    "06-core-agent-browser": {
        "label": "Master Brain, YAGNI Style, Chrome CDP & System Ops",
        "skills": {
            "opus-distills",
            "find-skills",
            "anti-yes-man",
            "chrome-browser-control",
            "gui-automation",
            "free-ram",
        },
        "keywords": {
            "opus", "orchestrator", "router", "find", "skill", "catalog",
            "anti-yes-man", "kritik", "yagni", "simple", "minimal",
            "terse", "ringkas", "singkat", "indo", "genz", "chrome", "cdp",
            "browser", "kursor", "cursor", "hud", "gui", "cua", "screenshot",
            "click", "ram", "memory", "memori", "zram", "swap", "linux",
        },
    },
}

STOPWORDS = {
    # Indonesian conversational fillers
    "bikin", "buat", "buatkan", "cara", "mau", "ingin", "butuh", "tolong",
    "bantu", "gimana", "bagaimana", "apa", "ada", "gak", "ga", "nggak",
    "tidak", "ngga", "ini", "itu", "yang", "yg", "bro", "dong", "deh", "nih",
    "ya", "yah", "lah", "kan", "biar", "supaya", "agar", "kalo", "kalau",
    "misal", "misalnya", "jika", "pake", "pakai", "sama", "dan", "atau",
    "untuk", "utk", "ke", "di", "dari", "pada", "dengan", "dgn", "nya",
    "lagi", "masih", "udah", "udh", "sudah", "sangat", "banget", "bgt",
    "jadi", "biarin", "coba", "cek", "cari", "cariin", "skill", "skills",
    # English conversational fillers
    "the", "a", "an", "to", "for", "of", "in", "on", "with", "how", "can",
    "could", "would", "should", "i", "me", "my", "we", "you", "your", "please",
    "help", "make", "create", "build", "use", "using", "need", "want", "find",
    "get", "show", "about", "into", "this", "that", "it", "is", "are",
}

# Bilingual ID + EN intent concepts -> weighted target skills
INTENT_BOOSTS = [
    ({"video", "reels", "tiktok", "shorts", "talking", "facecam", "facecammaxxing", "remotion", "whisper", "cutout", "mp4"}, {"remotion": 70, "web-animation": 18, "tts-gen": 15}),
    ({"suara", "voice", "voiceover", "vo", "dubbing", "narasi", "audio", "tts", "speech", "baca"}, {"tts-gen": 75, "remotion": 22}),
    ({"slide", "slides", "presentasi", "presentation", "pitch", "deck", "pptx", "keynote", "powerpoint"}, {"pdf-deck": 75, "taste-design": 20}),
    ({"pdf"}, {"pdf-deck": 60, "taste-design": 20}),
    ({"figma", "figcraft", "use_figma"}, {"figma-design": 65, "figma-create-ui": 55, "figcraft-use": 50, "figcraft-generate-design": 48, "figcraft-generate-library": 45}),
    ({"poster", "iklan", "ads", "meta-ads", "banner", "feed", "carousel"}, {"figma-design": 60, "taste-design": 50, "social-media-research": 25}),
    ({"vektor", "vector", "svg", "eps", "adobe", "stock", "microstock"}, {"svg-gen": 75, "upscale-img": 20}),
    ({"ikon", "icon", "icons", "lucide"}, {"iconography": 70, "svg-gen": 45, "web-design": 15}),
    ({"upscale", "perbesar", "resolusi", "tajam", "hd", "4k", "8k", "buram", "blur", "pecah", "boost"}, {"upscale-img": 80}),
    ({"bedah", "breakdown", "reverse"}, {"visual-breakdown": 80, "prompt-generator": 45, "image-gen": 35}),
    ({"prompt", "foto", "photo", "gambar", "image", "studio", "cyclorama", "nanobanana", "nano", "banana", "chatgpt", "imagen", "fusion"}, {"prompt-generator": 60, "image-gen": 58, "gen-img": 55, "visual-breakdown": 50}),
    ({"kaku", "robot", "slop", "manusiawi", "natural", "humanize", "humanizer", "tulisan", "prose", "baku"}, {"humanizer": 85}),
    ({"animasi", "animation", "gsap", "scroll", "scrolltrigger", "splittext", "parallax", "motion", "interaktif", "spring", "3d"}, {"web-animation": 75, "remotion": 25}),
    ({"vercel", "kuota", "jebol", "bandwidth", "cloudflare", "cache", "pwa", "cwv", "lcp", "speed", "optimasi", "optimize", "lemot"}, {"web-optimization": 80}),
    ({"bug", "error", "debug", "debugging", "security", "hack", "aman", "responsif", "responsive", "mobile", "viewport", "overflow", "sloplint", "inspect"}, {"web-debugging": 80, "chrome-browser-control": 30}),
    ({"rencana", "plan", "planning", "arsitektur", "architecture", "stack", "alur", "flow", "prd", "seo", "geo", "roadmap", "readme"}, {"web-planning": 75, "web-master-agent": 55}),
    ({"website", "landing", "nextjs", "astro", "tailwind", "coding", "toko", "portal"}, {"web-builder": 55, "web-design": 52, "web-planning": 45, "web-master-agent": 42}),
    ({"web", "page"}, {"web-builder": 18, "web-design": 15, "web-planning": 15}),
    ({"desain", "design", "ui", "ux", "tema", "theme", "warna", "color", "oklch", "tipografi", "typography", "layout", "taste", "estetik", "rapi", "bagus", "shadcn", "hallmark"}, {"web-design": 60, "taste-design": 55, "hallmark": 45}),
    ({"viral", "fyp", "hook", "hooks", "konten", "content", "outlier", "retention", "caption", "instagram", "ig", "ide", "ideas", "angle", "strategi", "marketing", "brainstorming"}, {"social-media-research": 60, "brainstorming": 55}),
    ({"browser", "chrome", "cdp", "klik", "click", "scrape", "scraping", "preview", "tab", "kursor", "cursor", "hud", "gui", "cua"}, {"chrome-browser-control": 70, "gui-automation": 55}),
    ({"ram", "memori", "memory", "swap", "zram", "linux", "bersihkan", "clean", "komputer", "pc"}, {"free-ram": 85}),
    ({"cari", "search", "google", "riset", "research", "berita", "artikel", "markdown", "fetch", "url", "websearch"}, {"websearch": 70, "social-media-research": 25}),
    ({"kritik", "jujur", "yagni", "ringkas", "singkat", "singel", "malay", "terse", "style", "gaya"}, {"anti-yes-man": 55}),
]


def get_search_roots():
    """Return prioritized search roots; sibling parent skills dir goes first."""
    candidates = [
        PARENT_SKILLS_DIR,
        os.path.expanduser("~/.gemini/antigravity-cli/skills"),
        os.path.expanduser("~/.gemini/config/skills"),
        os.path.expanduser("~/.gemini/antigravity/skills"),
        os.path.expanduser("~/.agents/skills"),
        os.path.expanduser("~/.gemini/config/plugins"),
    ]
    seen = set()
    roots = []
    for c in candidates:
        rc = os.path.realpath(c)
        if os.path.isdir(c) and rc not in seen:
            seen.add(rc)
            roots.append(c)
    return roots


def parse_frontmatter(file_path):
    """Pure-stdlib YAML frontmatter extractor handling inline, quoted, |, and >- blocks."""
    name = os.path.basename(os.path.dirname(file_path))
    description = ""
    category = ""
    tags = []

    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read(8192)
    except OSError:
        return name, description, category, tags

    if not content.startswith("---"):
        return name, description, category, tags

    parts = content.split("---", 2)
    if len(parts) < 3:
        return name, description, category, tags

    lines = parts[1].splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue

        m = re.match(r"^([A-Za-z0-9_-]+)\s*:\s*(.*)$", line)
        if not m:
            i += 1
            continue

        key = m.group(1).lower()
        val = m.group(2).strip()

        # Multiline block scalar (|, |-, >, >-)
        if val in ("|", "|-", ">", ">-"):
            block_lines = []
            i += 1
            while i < len(lines):
                nxt = lines[i]
                if nxt.strip() == "" or nxt.startswith((" ", "\t")):
                    if nxt.strip():
                        block_lines.append(nxt.strip())
                    i += 1
                else:
                    break
            joined = " ".join(block_lines).strip()
            if key == "description":
                description = joined
            continue

        # Normal single-line value
        val_clean = val.strip().strip("\"'").replace('\\"', '"')
        if key == "name" and val_clean:
            name = val_clean
        elif key == "description":
            description = val_clean
        elif key == "category":
            category = val_clean
        elif key in ("tags", "triggers") and val_clean:
            cleaned = val_clean.strip("[]")
            tags.extend([t.strip().strip("\"'") for t in cleaned.split(",") if t.strip()])
        i += 1

    return name, description, category, tags


def classify_skill(name, skill_path, explicit_cat="", desc=""):
    """Assign each skill to 1 of 6 Core Categories or plugin:<name> / external."""
    if explicit_cat and explicit_cat in CATEGORIES:
        return explicit_cat, CATEGORIES[explicit_cat]["label"], True

    for cat_id, cat_meta in CATEGORIES.items():
        if name in cat_meta["skills"]:
            return cat_id, cat_meta["label"], True

    norm_path = skill_path.replace("\\", "/")
    if "/plugins/" in norm_path:
        after = norm_path.split("/plugins/", 1)[1]
        plugin_name = after.split("/", 1)[0].replace("-plugin", "")
        return f"plugin:{plugin_name}", f"Installed Plugin ({plugin_name})", False

    # Keyword heuristic for third-party skills in ~/.agents/skills
    text_tokens = set(re.findall(r"[a-z0-9]+", f"{name} {desc}".lower()))
    best_cat = "external-skills"
    best_overlap = 0
    for cat_id, cat_meta in CATEGORIES.items():
        overlap = len(text_tokens & cat_meta["keywords"])
        if overlap > best_overlap:
            best_overlap = overlap
            best_cat = cat_id

    if best_overlap >= 2:
        return best_cat, CATEGORIES[best_cat]["label"], False
    return "external-skills", "External / Workspace Skills", False


def contract_home(path):
    home = os.path.expanduser("~")
    if path == home or path.startswith(home + os.sep):
        return "~" + path[len(home):]
    return path


def resolve_entry_paths(entry):
    """Resolve portable paths dynamically for whichever skill copy runs this script."""
    if entry.get("rel_to_skills"):
        full_dir = os.path.join(PARENT_SKILLS_DIR, entry["rel_to_skills"])
        if os.path.isdir(full_dir):
            return full_dir, os.path.join(full_dir, "SKILL.md")
    abs_dir = os.path.expanduser(entry.get("abs_path", ""))
    return abs_dir, os.path.join(abs_dir, "SKILL.md")


def scan_filesystem():
    """Walk search roots with strict pruning and realpath symlink deduplication."""
    entries = []
    seen_names = set()
    seen_realdirs = set()
    parent_real = os.path.realpath(PARENT_SKILLS_DIR)

    for root_dir in get_search_roots():
        for cur_root, dirs, files in os.walk(root_dir, followlinks=False):
            # Prune heavy or non-skill directories + symlinks pointing to duplicate dirs
            pruned = []
            for d in sorted(dirs):
                if d in PRUNE_DIRS or d.startswith("."):
                    continue
                full_d = os.path.join(cur_root, d)
                if os.path.islink(full_d):
                    # Skip legacy symlinks inside skills directories to avoid duplicates
                    continue
                pruned.append(d)
            dirs[:] = pruned

            if "SKILL.md" in files:
                real_d = os.path.realpath(cur_root)
                if real_d in seen_realdirs:
                    dirs[:] = []
                    continue

                skill_md = os.path.join(cur_root, "SKILL.md")
                name, desc, explicit_cat, explicit_tags = parse_frontmatter(skill_md)
                if name in seen_names:
                    dirs[:] = []
                    continue

                seen_names.add(name)
                seen_realdirs.add(real_d)
                cat_id, cat_label, is_core = classify_skill(name, cur_root, explicit_cat, desc)

                # Determine portable path
                rel_to_skills = ""
                try:
                    if real_d.startswith(parent_real + os.sep):
                        rel_to_skills = os.path.relpath(real_d, parent_real)
                except ValueError:
                    rel_to_skills = ""

                cat_kw = sorted(CATEGORIES.get(cat_id, {}).get("keywords", set())) if is_core else []
                try:
                    mtime = os.path.getmtime(skill_md)
                except OSError:
                    mtime = 0.0

                entries.append({
                    "name": name,
                    "category": cat_id,
                    "category_label": cat_label,
                    "is_core": is_core,
                    "description": desc or "No description provided",
                    "tags": sorted(set(explicit_tags + cat_kw[:10])),
                    "rel_to_skills": rel_to_skills,
                    "abs_path": contract_home(cur_root),
                    "mtime": mtime,
                })
                # Do not recurse inside a skill's subdirectories for other SKILL.md files
                dirs[:] = []

    entries.sort(key=lambda x: (0 if x["is_core"] else 1, x["category"], x["name"]))
    return entries


def write_catalog_markdown(entries):
    """Generate clean, concise SKILL-CATALOG.md grouped by the 6 Core Categories."""
    by_cat = {}
    for e in entries:
        by_cat.setdefault(e["category"], []).append(e)

    core_count = sum(1 for e in entries if e["is_core"])
    total_count = len(entries)

    lines = [
        "# Categorized Agent Skill Library (`SKILL-CATALOG.md`)",
        "",
        f"> Auto-generated by `find_skills.py --rebuild` · Core Opus Skills: **{core_count}** · Total Indexed Local Skills: **{total_count}**",
        "",
        "## Quick Search Commands (< 5ms Instant Index)",
        "```bash",
        "python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --categories",
        "python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --local \"<kata kunci ID/EN>\"",
        "python3 ~/.gemini/config/skills/find-skills/scripts/find_skills.py --category 04-video-motion-audio",
        "```",
        "",
        "---",
        "",
    ]

    ordered_cats = list(CATEGORIES.keys()) + sorted(
        k for k in by_cat.keys() if k not in CATEGORIES
    )

    for cat_id in ordered_cats:
        items = by_cat.get(cat_id, [])
        if not items:
            continue
        label = CATEGORIES[cat_id]["label"] if cat_id in CATEGORIES else items[0]["category_label"]
        lines.append(f"## {cat_id} — {label} ({len(items)})")
        lines.append("")
        lines.append("| Skill | Summary | Path |")
        lines.append("|---|---|---|")
        for it in sorted(items, key=lambda x: x["name"]):
            desc = it["description"].replace("|", "/").strip()
            if len(desc) > 155:
                desc = desc[:152] + "..."
            loc = f"../{it['rel_to_skills']}/SKILL.md" if it.get("rel_to_skills") else f"{it['abs_path']}/SKILL.md"
            lines.append(f"| `{it['name']}` | {desc} | `{loc}` |")
        lines.append("")

    with open(CATALOG_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")


def build_and_save_index(quiet=False):
    """Scan local skills cleanly, build JSON index, and refresh SKILL-CATALOG.md."""
    t0 = time.perf_counter()
    os.makedirs(DATA_DIR, exist_ok=True)
    entries = scan_filesystem()

    index_payload = {
        "schema_version": 2,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_skills": len(entries),
        "core_skills": sum(1 for e in entries if e["is_core"]),
        "categories": {
            cid: {"label": cdata["label"], "count": sum(1 for e in entries if e["category"] == cid)}
            for cid, cdata in CATEGORIES.items()
        },
        "skills": entries,
    }

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(index_payload, f, indent=2, ensure_ascii=False)

    write_catalog_markdown(entries)
    elapsed_ms = (time.perf_counter() - t0) * 1000.0
    if not quiet:
        print(f"[REBUILT] {len(entries)} skills ({index_payload['core_skills']} core) indexed in {elapsed_ms:.1f} ms")
        print(f"  Index  : {INDEX_FILE}")
        print(f"  Catalog: {CATALOG_FILE}")
    return index_payload


def is_index_stale(index_payload):
    """Fast O(N) mtime check on sibling core SKILL.md files (skip slow walks)."""
    if not index_payload or index_payload.get("schema_version") != 2:
        return True
    try:
        idx_mtime = os.path.getmtime(INDEX_FILE)
    except OSError:
        return True

    if os.path.isdir(PARENT_SKILLS_DIR):
        try:
            for d in os.listdir(PARENT_SKILLS_DIR):
                sfile = os.path.join(PARENT_SKILLS_DIR, d, "SKILL.md")
                if os.path.isfile(sfile) and os.path.getmtime(sfile) > idx_mtime:
                    return True
        except OSError:
            return False
    return False


def load_index(force_rebuild=False):
    """Load pre-compiled skills index in <5ms, auto-rebuilding only when missing or stale."""
    if not force_rebuild and os.path.isfile(INDEX_FILE):
        try:
            with open(INDEX_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            if not is_index_stale(data):
                return data
        except Exception:
            pass
    return build_and_save_index(quiet=True)


def tokenize(text):
    return re.findall(r"[a-z0-9_-]+", text.lower())


def extract_query_terms(query):
    raw = tokenize(query)
    filtered = [t for t in raw if t not in STOPWORDS]
    # Also add split hyphen parts for better partial matches
    expanded = list(filtered if filtered else raw)
    for tok in list(expanded):
        if "-" in tok:
            for sub in tok.split("-"):
                if sub and sub not in STOPWORDS and sub not in expanded:
                    expanded.append(sub)
    return expanded


def normalize_category_filter(cat_arg):
    if not cat_arg:
        return None
    q = cat_arg.lower().strip()
    for cid in CATEGORIES:
        if q == cid.lower() or cid.lower().startswith(q) or q in cid.lower():
            return cid
    return q


def score_skills(entries, query="", category_filter=None):
    """Score and rank matching skills using weighted multi-signal + ID/EN intent boosts."""
    q_clean = query.strip().lower()
    terms = extract_query_terms(query) if q_clean else []
    cat_target = normalize_category_filter(category_filter)

    # Compute intent boosts once from query terms
    skill_intent_bonus = {}
    if terms:
        term_set = set(terms)
        for trigger_words, boost_map in INTENT_BOOSTS:
            # Exact word hit OR meaningful 4+ char prefix hit
            hits = len(term_set & trigger_words)
            if hits == 0:
                for t in term_set:
                    if len(t) >= 4 and any(tw.startswith(t) or t.startswith(tw) for tw in trigger_words if len(tw) >= 4):
                        hits += 1
            if hits > 0:
                for sk_name, pts in boost_map.items():
                    skill_intent_bonus[sk_name] = max(skill_intent_bonus.get(sk_name, 0), pts) + (hits - 1) * 10

    results = []
    for entry in entries:
        cat_id = entry["category"]
        if cat_target:
            if cat_target != cat_id.lower() and cat_target not in cat_id.lower():
                continue

        name = entry["name"]
        name_l = name.lower()
        name_parts = set(re.split(r"[-_]", name_l))
        desc_l = entry["description"].lower()
        cat_tokens = set(re.findall(r"[a-z0-9]+", f"{cat_id} {entry.get('category_label', '')}".lower()))
        tags_tokens = set(re.findall(r"[a-z0-9]+", " ".join(entry.get("tags", [])).lower()))

        if not q_clean:
            full_dir, skill_file = resolve_entry_paths(entry)
            item = dict(entry)
            item["score"] = 100 if entry.get("is_core") else 50
            item["path"] = full_dir
            item["skill_file"] = skill_file
            results.append(item)
            continue

        score = 0
        # 1. Exact / substring name match
        if q_clean == name_l or q_clean.replace(" ", "-") == name_l:
            score += 150
        elif q_clean in name_l and len(q_clean) >= 3:
            score += 75

        # 2. Bilingual intent synonym boost
        intent_pts = skill_intent_bonus.get(name, 0)
        score += intent_pts

        # 3. Term-level weighted scoring
        matched_terms = 0
        for t in terms:
            if len(t) <= 1 and len(terms) > 1:
                continue
            weight_mult = 0.5 if len(t) <= 2 else 1.0
            t_hit = False
            if t == name_l or t in name_parts:
                score += int(55 * weight_mult)
                t_hit = True
            elif len(t) >= 3 and any(p.startswith(t) for p in name_parts):
                score += 35
                t_hit = True
            if t in tags_tokens:
                score += int(24 * weight_mult)
                t_hit = True
            if t in cat_tokens:
                score += int(18 * weight_mult)
                t_hit = True
            if re.search(rf"\b{re.escape(t)}\b" if len(t) <= 2 else rf"\b{re.escape(t)}", desc_l):
                score += int(16 * weight_mult)
                t_hit = True
            elif len(t) >= 4 and t in desc_l:
                score += 8
                t_hit = True

            # Fuzzy match against name segments for mild typos
            if not t_hit and len(t) >= 4:
                close = difflib.get_close_matches(t, list(name_parts), n=1, cutoff=0.8)
                if close:
                    score += 30
                    t_hit = True

            if t_hit:
                matched_terms += 1

        if score <= 0:
            continue

        # Multi-term coverage bonus
        if len(terms) > 1 and matched_terms >= len(terms):
            score += 25
        # Keep core Opus skills prioritized over external clutter on ties
        if entry.get("is_core"):
            score += 12

        full_dir, skill_file = resolve_entry_paths(entry)
        item = dict(entry)
        item["score"] = score
        item["path"] = full_dir
        item["skill_file"] = skill_file
        results.append(item)

    results.sort(key=lambda x: (-x["score"], 0 if x.get("is_core") else 1, x["name"]))
    return results


def search_remote_skills(query, owner=None, timeout=12):
    """Execute npx skills find via CLI safely."""
    cmd = ["npx", "-y", "skills", "find", query]
    if owner:
        cmd.extend(["--owner", owner])
    try:
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
            check=False,
        )
        return {
            "status": "success",
            "returncode": proc.returncode,
            "stdout": proc.stdout.strip(),
            "stderr": proc.stderr.strip(),
        }
    except subprocess.TimeoutExpired:
        return {"status": "timeout", "error": f"Search timed out after {timeout}s"}
    except Exception as e:
        return {"status": "error", "error": str(e)}


def install_skill(package_name, timeout=30):
    """Execute npx skills add <package> -g -y safely and refresh index."""
    cmd = ["npx", "-y", "skills", "add", package_name, "-g", "-y"]
    try:
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
            check=False,
        )
        if proc.returncode == 0:
            build_and_save_index(quiet=True)
        return {
            "status": "success" if proc.returncode == 0 else "failed",
            "returncode": proc.returncode,
            "stdout": proc.stdout.strip(),
            "stderr": proc.stderr.strip(),
        }
    except Exception as e:
        return {"status": "error", "error": str(e)}


def main():
    t_start = time.perf_counter()
    parser = argparse.ArgumentParser(
        description="Categorized Fast Agent Skills Discovery Engine (<5ms Local Index + Remote Search)"
    )
    parser.add_argument("keyword", nargs="?", default="", help="Keyword or intent query (ID/EN supported)")
    parser.add_argument("--local", action="store_true", help="Search only locally installed skills")
    parser.add_argument("--remote", action="store_true", help="Search only remote skills.sh ecosystem")
    parser.add_argument("--category", "-c", help="Filter by category (e.g. 04-video-motion-audio or 'video')")
    parser.add_argument("--categories", action="store_true", help="List all virtual skill categories & counts")
    parser.add_argument("--top", type=int, default=None, help="Limit results (default: 5 for queries, all for listings)")
    parser.add_argument("--all", dest="show_all", action="store_true", help="Show all matching skills without limit")
    parser.add_argument("--rebuild", action="store_true", help="Force rebuild skills-index.json & SKILL-CATALOG.md")
    parser.add_argument("--owner", help="Filter remote search by GitHub owner")
    parser.add_argument("--add", help="Install a remote skill via npx skills add -g -y")
    parser.add_argument("--list-all", action="store_true", help="List all indexed local skills")
    parser.add_argument("--json", action="store_true", help="Output structured JSON")

    args = parser.parse_args()

    # 1. Force rebuild only
    if args.rebuild and not args.keyword and not args.list_all and not args.categories and not args.category:
        payload = build_and_save_index(quiet=args.json)
        if args.json:
            print(json.dumps(payload, indent=2))
        sys.exit(0)

    # 2. Install remote package
    if args.add:
        print(f"Installing {args.add} globally...")
        res = install_skill(args.add)
        if args.json:
            print(json.dumps(res, indent=2))
        else:
            if res["status"] == "success":
                print(f"[OK] Successfully installed {args.add} & refreshed index.")
                if res["stdout"]:
                    print(res["stdout"])
            else:
                print(f"[FAILED] Could not install {args.add}: {res.get('error') or res.get('stderr')}")
        sys.exit(0 if res.get("status") == "success" else 1)

    # 3. Remote-only explicit query
    query = args.keyword.strip()
    if args.remote and query:
        print(f"Searching remote ecosystem for '{query}' via npx skills...")
        remote_res = search_remote_skills(query, owner=args.owner)
        if args.json:
            print(json.dumps(remote_res, indent=2))
        else:
            if remote_res["status"] == "success":
                print(remote_res["stdout"])
            else:
                print(f"Remote search error: {remote_res.get('error') or remote_res.get('stderr')}")
        sys.exit(0 if remote_res.get("status") == "success" else 1)

    # Load instant <5ms index (rebuilding only if stale or --rebuild)
    idx_data = load_index(force_rebuild=args.rebuild)
    entries = idx_data.get("skills", [])

    # 4. List Categories
    if args.categories:
        cat_counts = {}
        cat_labels = {}
        for e in entries:
            cid = e["category"]
            cat_counts[cid] = cat_counts.get(cid, 0) + 1
            cat_labels[cid] = e.get("category_label", cid)
        ordered = list(CATEGORIES.keys()) + sorted(k for k in cat_counts if k not in CATEGORIES)
        if args.json:
            out = [
                {"id": cid, "label": cat_labels.get(cid, cid), "count": cat_counts.get(cid, 0)}
                for cid in ordered if cat_counts.get(cid, 0) > 0
            ]
            print(json.dumps(out, indent=2))
        else:
            elapsed_ms = (time.perf_counter() - t_start) * 1000.0
            print(f"=== Virtual Skill Categories ({len(entries)} total indexed in {elapsed_ms:.1f}ms) ===")
            for cid in ordered:
                cnt = cat_counts.get(cid, 0)
                if cnt > 0:
                    print(f"  [{cid}] ({cnt:2d}) - {cat_labels.get(cid)}")
        sys.exit(0)

    # 5. Local Search / Category Filter / List All
    matches = score_skills(entries, query=query, category_filter=args.category)

    # Apply top N limit cleanly
    if not args.show_all and not args.list_all:
        limit = args.top if args.top is not None else (5 if query else None)
        if limit and limit > 0:
            total_found = len(matches)
            matches_shown = matches[:limit]
        else:
            total_found = len(matches)
            matches_shown = matches
    else:
        total_found = len(matches)
        matches_shown = matches

    if matches_shown or args.local or args.list_all or args.category or not query:
        if args.json:
            print(json.dumps(matches_shown, indent=2))
        else:
            elapsed_ms = (time.perf_counter() - t_start) * 1000.0
            header_parts = []
            if query:
                header_parts.append(f"query='{query}'")
            if args.category:
                header_parts.append(f"category='{args.category}'")
            label = ", ".join(header_parts) if header_parts else "all indexed skills"
            print(
                f"=== Local Skills ({len(matches_shown)}/{total_found}) for {label} [{elapsed_ms:.1f}ms] ==="
            )
            for m in matches_shown:
                desc = (m["description"][:115] + "...") if len(m["description"]) > 115 else m["description"]
                print(f"• [{m['category']}] {m['name']} (score:{m['score']}) -> {m['skill_file']}")
                print(f"  {desc}")
        sys.exit(0)

    # 6. Fallback Remote Search when local has 0 matches for a non-empty query
    if query:
        print(f"No local match for '{query}'. Searching remote ecosystem via npx skills...")
        remote_res = search_remote_skills(query, owner=args.owner)
        if args.json:
            print(json.dumps(remote_res, indent=2))
        else:
            if remote_res["status"] == "success":
                print(remote_res["stdout"])
            else:
                print(f"Remote search error: {remote_res.get('error') or remote_res.get('stderr')}")


if __name__ == "__main__":
    main()
