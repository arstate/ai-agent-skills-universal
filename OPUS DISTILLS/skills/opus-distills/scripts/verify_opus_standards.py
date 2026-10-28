#!/usr/bin/env python3
"""
Opus 5.5 Distillation Standards & Guardrails Verification Script
Validates:
1. Presence of all 23 required skills
2. YAML frontmatter parsing for skills
3. Active guardrails compliance (zero positive promotion of forbidden design jargon or confidential marketing commissions)
4. Multi-file skill references integrity (checks existence and readability of required references and tests them against guardrails)
5. 12-file starter templates permissions (0644 readable) in templates-dir and web-planning/resources/templates
6. 12-file readme-ai-agent project continuity (when --repo is provided, handles both project root and readme-ai-agent/ dir)
7. Global always-on rules files presence, readability, and guardrail compliance
"""

import sys
import os
import re
import argparse
import stat

BANNED_PATTERNS = [
    (re.compile(r'brutalist', re.IGNORECASE), "Forbidden design jargon (must use 'Desain Modern Tegas' or 'Minimalis Berkelas')"),
    (re.compile(r'\bBLT\b'), "Forbidden internal marketing commission acronym (strictly confidential)"),
]

NEGATION_PATTERNS = re.compile(
    r'\b(dilarang|haram|forbid|forbidden|never\s+use|jangan|0\s+kata|zero\s+forbidden|banned|eliminasi|penggantian|anti[- ]|tidak\s+ada|hapus|zero|kerahasiaan|confidential|bebas|no\s+|tanpa\s+)\b',
    re.IGNORECASE
)

REQUIRED_23_SKILLS = [
    "anti-yes-man",
    "brainstorming",
    "chrome-browser-control",
    "generate-fresh-ideas",
    "hallmark",
    "image-gen",
    "indo-genz-ponytail",
    "opus-distills",
    "ponytail",
    "prompt-generator",
    "slidedeck-gen",
    "social-media-research",
    "taste-design",
    "terse-respon",
    "visual-breakdown",
    "web-animation",
    "web-builder",
    "web-debugging",
    "web-design",
    "web-master-agent",
    "web-optimization",
    "web-planning",
    "websearch",
]
REQUIRED_22_SKILLS = REQUIRED_23_SKILLS
REQUIRED_SKILLS = REQUIRED_23_SKILLS

REQUIRED_MULTI_SKILLS = {
    "opus-distills": ["token-efficiency-and-cod-playbook.md"],
    "slidedeck-gen": [
        "slide-design-and-export-guide.md",
        "theme-and-layout-catalog.md",
        "cli-tool-reference.md",
    ],
    "brainstorming": ["real-case-studies-and-frameworks.md"],
    "web-animation": ["gsap-and-real-case-animations.md"],
    "web-optimization": ["fullstack-nextjs-zero-usage-blueprint.md"],
    "social-media-research": ["viral-pattern-teardown-and-recipes.md"],
    "generate-fresh-ideas": ["viral-pattern-teardown-and-recipes.md"],
    "prompt-generator": ["nanobanana21-chatgpt-master-templates.md"],
    "visual-breakdown": [
        "anti-ai-slop.md",
        "master-engine.md",
        "multi-angle-shots.md",
    ],
    "image-gen": [
        "expansion-recipes.md",
        "template-catalog.md",
    ],
    "web-design": [
        "14-pass-critique-rubric.md",
        "bad-vs-good-examples.md",
        "niche-ui-blueprints.md",
        "cat-01-ai-and-llm.md",
        "cat-02-saas-and-devtools.md",
        "cat-03-fintech-crypto-banking.md",
        "cat-04-realestate-hospitality-architecture.md",
        "cat-05-agency-creative-portfolio.md",
        "cat-06-ecommerce-fashion-d2c.md",
        "cat-07-media-editorial-books.md",
        "cat-08-luxury-automotive-hardware.md",
        "cat-09-healthcare-edtech-wellness.md",
        "cat-10-web3-gaming-and-retro.md",
    ],
    "taste-design": [
        "14-pass-critique-rubric.md",
        "bad-vs-good-examples.md",
        "niche-ui-blueprints.md",
        "cat-01-ai-and-llm.md",
        "cat-02-saas-and-devtools.md",
        "cat-03-fintech-crypto-banking.md",
        "cat-04-realestate-hospitality-architecture.md",
        "cat-05-agency-creative-portfolio.md",
        "cat-06-ecommerce-fashion-d2c.md",
        "cat-07-media-editorial-books.md",
        "cat-08-luxury-automotive-hardware.md",
        "cat-09-healthcare-edtech-wellness.md",
        "cat-10-web3-gaming-and-retro.md",
    ],
}

STANDARD_12_FILES = [
    "AGENTS.md",
    "README.md",
    "PRD.md",
    "TECHSTACK.md",
    "STYLE-GUIDE.md",
    "SEO-GEO.md",
    "SECURITY.md",
    "SKILLS.md",
    "TASK.md",
    "BUG-AND-FIX.md",
    "GIT-RESTORE-POINTS.md",
    "DESIGN-CRITIQUE.md",
]

GLOBAL_RULES_FILES = [
    os.path.expanduser("~/.gemini/AGENTS.md"),
    os.path.expanduser("~/.gemini/GEMINI.md"),
    os.path.expanduser("~/.gemini/antigravity-cli/rules/opus-distills.md"),
    os.path.expanduser("~/.gemini/config/rules/opus-distills.md"),
    os.path.expanduser("~/.claude/CLAUDE.md"),
    os.path.expanduser("~/.cursorrules"),
]

TARGET_SKILL_DIRS = [
    os.path.expanduser("~/.gemini/antigravity-cli/skills"),
    os.path.expanduser("~/.gemini/config/skills"),
    os.path.expanduser("~/.gemini/antigravity/skills"),
    os.path.expanduser("~/.agents/skills"),
    os.path.expanduser("~/.claude/skills"),
    os.path.expanduser("~/.cursor/skills"),
]
_hdd_skills = "/mnt/HDD-2/BACKUP LINUX/FILE DATA/AI AGENT SKILLS/OPUS DISTILLS/skills"
if os.path.isdir(_hdd_skills):
    TARGET_SKILL_DIRS.append(_hdd_skills)
TARGET_6_SKILL_DIRS = TARGET_SKILL_DIRS

def check_file_guardrails(filepath):
    """
    Scans file for prohibited words, distinguishing between negative guardrail rules and active violations.
    """
    issues = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            for idx, line in enumerate(f, 1):
                if NEGATION_PATTERNS.search(line):
                    continue
                for pattern, desc in BANNED_PATTERNS:
                    if pattern.search(line):
                        issues.append((idx, line.strip(), desc))
    except Exception as e:
        issues.append((0, str(e), "Error reading file"))
    return issues

def verify_yaml_frontmatter(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if not content.startswith('---'):
            return False, "Missing opening frontmatter delimiter (---)"
        parts = content.split('---', 2)
        if len(parts) < 3:
            return False, "Missing closing frontmatter delimiter (---)"
        yaml_text = parts[1]
        has_name = any(line.strip().startswith('name:') for line in yaml_text.splitlines())
        has_desc = any(line.strip().startswith('description:') for line in yaml_text.splitlines())
        if not has_name:
            return False, "Missing 'name:' in frontmatter"
        if not has_desc:
            return False, "Missing 'description:' in frontmatter"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def verify_project_structure(repo_dir, check_full=False):
    required = STANDARD_12_FILES
    missing = []
    target_dir = repo_dir
    if os.path.isdir(os.path.join(repo_dir, "readme-ai-agent")):
        target_dir = os.path.join(repo_dir, "readme-ai-agent")
        root_agents = os.path.join(repo_dir, "AGENTS.md")
        if not os.path.exists(root_agents):
            missing.append(f"Root AGENTS.md missing in {repo_dir}")
        else:
            mode = os.stat(root_agents).st_mode
            if not (mode & stat.S_IROTH or mode & stat.S_IRGRP):
                missing.append(f"Root AGENTS.md in {repo_dir} has restricted permissions: {oct(mode)}")

    for f in required:
        fp = os.path.join(target_dir, f)
        if not os.path.exists(fp):
            missing.append(f"{f} missing in {target_dir}")
        else:
            mode = os.stat(fp).st_mode
            if not (mode & stat.S_IROTH or mode & stat.S_IRGRP):
                missing.append(f"{f} in {target_dir} has restricted permissions: {oct(mode)}")
    return missing

def verify_single_skills_dir(skills_dir):
    errors = 0
    print(f"\n[1] Checking 23 Skills Presence & Frontmatter in {skills_dir}...")
    for skill in REQUIRED_22_SKILLS:
        skill_path = os.path.join(skills_dir, skill)
        skill_md = os.path.join(skill_path, "SKILL.md")
        if not os.path.exists(skill_md):
            print(f"  [FAIL MISSING SKILL] {skill}/SKILL.md does not exist!")
            errors += 1
            continue
        valid, msg = verify_yaml_frontmatter(skill_md)
        if not valid:
            print(f"  [FAIL FRONTMATTER] {skill}/SKILL.md: {msg}")
            errors += 1
        else:
            print(f"  [PASS FRONTMATTER] {skill}/SKILL.md")

        issues = check_file_guardrails(skill_md)
        if issues:
            for line_num, line_txt, desc in issues:
                print(f"  [FAIL GUARDRAIL] {skill}/SKILL.md:{line_num} -> {desc}: {line_txt[:80]}")
                errors += 1
        else:
            print(f"  [PASS GUARDRAILS] {skill}/SKILL.md")

    print(f"\n[2] Checking Multi-File Skill References in {skills_dir}...")
    for skill_name, req_files in REQUIRED_MULTI_SKILLS.items():
        skill_dir = os.path.join(skills_dir, skill_name)
        if not os.path.isdir(skill_dir):
            print(f"  [FAIL SKILL DIR] {skill_name}: Directory not found")
            errors += 1
            continue
        ref_dir = os.path.join(skill_dir, "references")
        if not os.path.isdir(ref_dir):
            print(f"  [FAIL REFERENCE DIR] {skill_name}: Missing references/ directory")
            errors += 1
            continue
        skill_ref_errors = 0
        for rf in req_files:
            rf_path = os.path.join(ref_dir, rf)
            if not os.path.isfile(rf_path):
                print(f"  [FAIL REFERENCE FILE] {skill_name}/references/{rf}: File not found")
                errors += 1
                skill_ref_errors += 1
            else:
                mode = os.stat(rf_path).st_mode
                if not (mode & stat.S_IROTH or mode & stat.S_IRGRP):
                    print(f"  [FAIL PERMISSION] {skill_name}/references/{rf}: Permission restricted")
                    errors += 1
                    skill_ref_errors += 1
                else:
                    ref_issues = check_file_guardrails(rf_path)
                    if ref_issues:
                        for line_num, line_txt, desc in ref_issues:
                            print(f"  [FAIL GUARDRAIL] {skill_name}/references/{rf}:{line_num} -> {desc}: {line_txt[:80]}")
                            errors += 1
                            skill_ref_errors += 1
        if skill_ref_errors == 0:
            print(f"  [PASS REFERENCES] {skill_name} ({len(req_files)} files verified)")

    # Language Guardrail: Strictly 0 Chinese/Mandarin characters in slidedeck-gen
    sdg_dir = os.path.join(skills_dir, "slidedeck-gen")
    if os.path.isdir(sdg_dir):
        chinese_re = re.compile(r'[\u4e00-\u9fff]')
        chinese_errors = 0
        for root, _, files in os.walk(sdg_dir):
            for f in files:
                fpath = os.path.join(root, f)
                try:
                    with open(fpath, 'r', encoding='utf-8', errors='ignore') as fl:
                        for lno, line in enumerate(fl, 1):
                            if chinese_re.search(line):
                                print(f"  [FAIL CHINESE GUARDRAIL] slidedeck-gen/{os.path.relpath(fpath, sdg_dir)}:{lno} -> Mandarin detected: {line.strip()[:60]}")
                                errors += 1
                                chinese_errors += 1
                                if chinese_errors >= 5:
                                    break
                except Exception:
                    pass
        if chinese_errors == 0:
            print(f"  [PASS LANGUAGE GUARDRAIL] slidedeck-gen (100% English, 0 Mandarin characters)")

    wp_tpl = os.path.join(skills_dir, "web-planning", "resources", "templates")
    if os.path.isdir(wp_tpl):
        print(f"\n[2b] Checking web-planning/resources/templates in {skills_dir}...")
        wp_missing = verify_project_structure(wp_tpl, check_full=True)
        if wp_missing:
            for m in wp_missing:
                print(f"  [FAIL TEMPLATE] {m}")
                errors += 1
        else:
            print(f"  [PASS TEMPLATE] All 12 files verified in web-planning/resources/templates.")
    return errors

def verify_global_rules():
    errors = 0
    print("\n[Global Rules] Checking Global Always-On Rule Files...")
    for rpath in GLOBAL_RULES_FILES:
        if not os.path.exists(rpath):
            print(f"  [FAIL RULE FILE] {rpath} does not exist!")
            errors += 1
            continue
        mode = os.stat(rpath).st_mode
        if not (mode & stat.S_IROTH or mode & stat.S_IRGRP):
            print(f"  [FAIL PERMISSION] {rpath} has restricted permissions: {oct(mode)}")
            errors += 1
        issues = check_file_guardrails(rpath)
        if issues:
            for line_num, line_txt, desc in issues:
                print(f"  [FAIL GUARDRAIL] {rpath}:{line_num} -> {desc}: {line_txt[:80]}")
                errors += 1
        else:
            print(f"  [PASS RULE] {rpath} (permissions & guardrails verified)")
    return errors

def main():
    default_skills = (
        os.path.expanduser("~/.gemini/antigravity-cli/skills")
        if os.path.isdir(os.path.expanduser("~/.gemini/antigravity-cli/skills"))
        else os.path.expanduser("~/.gemini/config/skills")
    )
    parser = argparse.ArgumentParser(description="Verify Opus 5.5 Distillation Standards")
    parser.add_argument("--repo", help="Path to project repository to check for readme-ai-agent continuity")
    parser.add_argument("--full", action="store_true", help="Check for full 12-file standard suite")
    parser.add_argument("--skills-dir", default=default_skills, help="Path to skills directory")
    parser.add_argument("--all-targets", action="store_true", help="Verify all 6 target skills directories")
    parser.add_argument("--templates-dir", default=os.path.expanduser("~/.gemini/config/templates/readme-ai-agent-starter-template"), help="Path to starter templates")
    args = parser.parse_args()

    total_errors = 0
    print("=== Opus 5.5 Distillation Verification ===")

    # 1. Check skills directory/directories
    if args.all_targets:
        for tdir in TARGET_6_SKILL_DIRS:
            if os.path.isdir(tdir):
                total_errors += verify_single_skills_dir(tdir)
            else:
                print(f"  [FAIL DIR] Target directory missing: {tdir}")
                total_errors += 1
    elif os.path.isdir(args.skills_dir):
        total_errors += verify_single_skills_dir(args.skills_dir)
    else:
        print(f"  [FAIL DIR] Skills directory not found: {args.skills_dir}")
        total_errors += 1

    # 2. Check global rules
    total_errors += verify_global_rules()

    # 3. Check templates repository if present
    if os.path.isdir(args.templates_dir):
        print(f"\n[3] Checking 12-File Starter Templates in {args.templates_dir}...")
        missing_templates = verify_project_structure(args.templates_dir, check_full=True)
        if missing_templates:
            for m in missing_templates:
                print(f"  [FAIL TEMPLATE] {m}")
                total_errors += 1
        else:
            print("  [PASS TEMPLATE] All 12 starter template files verified with valid permissions.")

    # 4. Check repo if given
    if args.repo:
        tier_label = "12-file standard"
        print(f"\n[4] Checking Project Repo Continuity ({tier_label}) at {args.repo}...")
        missing = verify_project_structure(args.repo, check_full=args.full)
        if missing:
            for m in missing:
                print(f"  [FAIL HANDOVER] {m}")
                total_errors += 1
        else:
            print(f"  [PASS HANDOVER] All {tier_label} readme-ai-agent files verified.")

    print(f"\nTotal verification errors: {total_errors}")
    sys.exit(0 if total_errors == 0 else 1)

if __name__ == "__main__":
    main()
