#!/usr/bin/env python3
"""
find_skills.py - Hybrid Local & Remote Agent Skills Discovery Tool
Part of find-skills meta-skill for Antigravity & Opus 5.5 Swarm Engine.
"""

import sys
import os
import re
import json
import argparse
import subprocess

LOCAL_SKILL_PATHS = [
    os.path.expanduser("~/.gemini/antigravity-cli/skills"),
    os.path.expanduser("~/.gemini/config/skills"),
    os.path.expanduser("~/.agents/skills"),
    os.path.expanduser("~/.gemini/config/plugins"),
]

def parse_frontmatter(file_path):
    """Safely extracts name and description from a SKILL.md file."""
    name = os.path.basename(os.path.dirname(file_path))
    description = ""
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read(4096)
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                yaml_block = parts[1]
                name_match = re.search(r"^name:\s*(.+)$", yaml_block, re.MULTILINE)
                if name_match:
                    name = name_match.group(1).strip().strip("\"'")
                desc_match = re.search(r"^description:\s*(.+)$", yaml_block, re.MULTILINE)
                if desc_match:
                    description = desc_match.group(1).strip().strip("\"'")
    except Exception:
        pass
    return name, description

def scan_local_skills(query=""):
    """Scans local directories for matching skills."""
    matches = []
    seen_names = set()
    terms = [q.lower().strip() for q in query.split()] if query else []

    for base_dir in LOCAL_SKILL_PATHS:
        if not os.path.isdir(base_dir):
            continue
        for root, dirs, files in os.walk(base_dir):
            if "SKILL.md" in files:
                skill_file = os.path.join(root, "SKILL.md")
                name, desc = parse_frontmatter(skill_file)
                if name in seen_names:
                    continue

                full_text = f"{name} {desc} {root}".lower()
                is_match = True
                if terms:
                    is_match = any(term in full_text for term in terms)

                if is_match:
                    seen_names.add(name)
                    matches.append({
                        "name": name,
                        "description": desc or "No description provided",
                        "path": root,
                        "skill_file": skill_file,
                        "source": "local"
                    })
    return sorted(matches, key=lambda x: x["name"])

def search_remote_skills(query, owner=None, timeout=12):
    """Executes npx skills find via CLI safely."""
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
            check=False
        )
        return {
            "status": "success",
            "returncode": proc.returncode,
            "stdout": proc.stdout.strip(),
            "stderr": proc.stderr.strip()
        }
    except subprocess.TimeoutExpired:
        return {"status": "timeout", "error": f"Search timed out after {timeout}s"}
    except Exception as e:
        return {"status": "error", "error": str(e)}

def install_skill(package_name, timeout=30):
    """Executes npx skills add <package> -g -y safely."""
    cmd = ["npx", "-y", "skills", "add", package_name, "-g", "-y"]
    try:
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
            check=False
        )
        return {
            "status": "success" if proc.returncode == 0 else "failed",
            "returncode": proc.returncode,
            "stdout": proc.stdout.strip(),
            "stderr": proc.stderr.strip()
        }
    except Exception as e:
        return {"status": "error", "error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="Find & Manage Agent Skills")
    parser.add_argument("keyword", nargs="?", default="", help="Keyword to search")
    parser.add_argument("--local", action="store_true", help="Search only locally installed skills")
    parser.add_argument("--remote", action="store_true", help="Search only remote ecosystem skills")
    parser.add_argument("--owner", help="Filter remote search by GitHub owner")
    parser.add_argument("--add", help="Install a package via npx skills add -g -y")
    parser.add_argument("--list-all", action="store_true", help="List all local skills")
    parser.add_argument("--json", action="store_true", help="Output results as JSON")

    args = parser.parse_args()

    # 1. Install package command
    if args.add:
        print(f"Installing {args.add} globally...")
        res = install_skill(args.add)
        if args.json:
            print(json.dumps(res, indent=2))
        else:
            if res["status"] == "success":
                print(f"[OK] Successfully installed {args.add}")
                if res["stdout"]:
                    print(res["stdout"])
            else:
                print(f"[FAILED] Could not install {args.add}: {res.get('error') or res.get('stderr')}")
        sys.exit(0 if res.get("status") == "success" else 1)

    # 2. List all local skills
    if args.list_all:
        skills = scan_local_skills("")
        if args.json:
            print(json.dumps(skills, indent=2))
        else:
            print(f"Found {len(skills)} locally installed skills:")
            for s in skills:
                print(f" - {s['name']}: {s['path']}")
        sys.exit(0)

    query = args.keyword.strip()

    # 3. Local Search Only
    if args.local or (not args.remote and query):
        local_matches = scan_local_skills(query)
        if args.local or local_matches:
            if args.json:
                print(json.dumps(local_matches, indent=2))
            else:
                print(f"=== Local Skills Found ({len(local_matches)}) for '{query}' ===")
                for m in local_matches:
                    desc = (m['description'][:90] + "...") if len(m['description']) > 90 else m['description']
                    print(f"• \033[1m{m['name']}\033[0m: {desc}")
                    print(f"  Path: {m['path']}\n")
            if args.local or local_matches:
                sys.exit(0)

    # 4. Remote Search (when requested or fallback if local has 0 matches)
    if args.remote or query:
        print(f"Searching remote ecosystem for '{query}' via npx skills...")
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
