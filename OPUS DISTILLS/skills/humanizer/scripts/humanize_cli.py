#!/usr/bin/env python3
"""
Humanizer CLI: Fast Linter and Tell-Detector for AI Writing Slop.
Detects English and Indonesian AI structural patterns, overused vocabulary,
triads, em-dashes, and robotic formatting.
"""

import sys
import os
import re
import argparse
import json

EN_BUZZWORDS = [
    "delve", "tapestry", "testament", "pivotal", "beacon", "crucial",
    "multifaceted", "holistic", "revolutionize", "game-changer", "seamless",
    "bespoke", "unleash", "embark", "navigating", "fostering", "bolster",
    "underscore", "synergy", "dynamic landscape", "at its core", "make no mistake"
]

ID_BUZZWORDS = [
    "menyelami", "merajut", "bukti nyata", "lanskap dinamis", "peran krusial",
    "mercusuar harapan", "perlu digarisbawahi", "sebagai penutup", "era digital",
    "tidak dapat dipungkiri", "di penghujung hari", "mengambil langkah mundur",
    "bukan sekadar", "bukan hanya sekadar", "harmoni antara", "solusi mutakhir"
]

FORBIDDEN_TERMS = [
    (re.compile(r'\bbrutalist\b', re.IGNORECASE), "Use 'Desain Modern Tegas' or 'Minimalis Berkelas' instead of 'brutalist'"),
    (re.compile(r'\bBLT\b'), "Forbidden confidential commission acronym (BLT)")
]

TRIAD_REGEX = re.compile(r'\b([a-zA-Z0-9_-]+),\s+([a-zA-Z0-9_-]+),\s+(?:and|dan|serta)\s+([a-zA-Z0-9_-]+)\b', re.IGNORECASE)
NOT_X_BUT_Y_REGEX = re.compile(r'\b(?:not\s+only|bukan\s+hanya)\b.*?\b(?:but\s+also|melainkan\s+juga)\b', re.IGNORECASE)
BOLD_BULLET_REGEX = re.compile(r'^\s*[-*]\s+\*\*[^*]+\*\*:', re.MULTILINE)
BULLET_REGEX = re.compile(r'^\s*[-*]\s+', re.MULTILINE)

def scan_text(text):
    issues = []
    lines = text.splitlines()

    # 1. Line-by-line checks
    for idx, line in enumerate(lines, 1):
        # Buzzwords English
        for word in EN_BUZZWORDS:
            if re.search(r'\b' + re.escape(word) + r'\b', line, re.IGNORECASE):
                issues.append({
                    "line": idx,
                    "type": "EN_AI_BUZZWORD",
                    "match": word,
                    "snippet": line.strip()[:80],
                    "recommendation": f"Replace generic AI buzzword '{word}' with concrete, plain verbs or nouns."
                })
        # Buzzwords Indonesian
        for phrase in ID_BUZZWORDS:
            if re.search(r'\b' + re.escape(phrase) + r'\b', line, re.IGNORECASE):
                issues.append({
                    "line": idx,
                    "type": "ID_AI_CLICHE",
                    "match": phrase,
                    "snippet": line.strip()[:80],
                    "recommendation": f"Remove Indonesian AI trope '{phrase}'; state the action directly."
                })
        # Forbidden Guardrail terms
        for pattern, warning in FORBIDDEN_TERMS:
            if pattern.search(line):
                issues.append({
                    "line": idx,
                    "type": "GUARDRAIL_VIOLATION",
                    "match": pattern.pattern,
                    "snippet": line.strip()[:80],
                    "recommendation": warning
                })
        # Em-dashes count per line
        em_dash_count = line.count("—")
        if em_dash_count >= 2:
            issues.append({
                "line": idx,
                "type": "EM_DASH_OVERUSE",
                "match": f"{em_dash_count} em-dashes",
                "snippet": line.strip()[:80],
                "recommendation": "Break into separate sentences or use commas/periods."
            })
        # Triads
        for match in TRIAD_REGEX.finditer(line):
            issues.append({
                "line": idx,
                "type": "FORCED_TRIAD",
                "match": match.group(0),
                "snippet": line.strip()[:80],
                "recommendation": "Break the 3-part list; use concrete metrics or asymmetric phrasing."
            })
        # Not X but Y
        for match in NOT_X_BUT_Y_REGEX.finditer(line):
            issues.append({
                "line": idx,
                "type": "STAGED_CONTRAST",
                "match": match.group(0),
                "snippet": line.strip()[:80],
                "recommendation": "State what the subject is directly without the negative prelude."
            })

    # 2. Structural checks across document
    total_bullets = len(BULLET_REGEX.findall(text))
    bold_bullets = len(BOLD_BULLET_REGEX.findall(text))
    if total_bullets >= 3 and (bold_bullets / total_bullets) >= 0.8:
        issues.append({
            "line": 0,
            "type": "REPETITIVE_BOLD_BULLETS",
            "match": f"{bold_bullets}/{total_bullets} bullets start with bold label",
            "snippet": "Bulleted list formatting",
            "recommendation": "Remove bold labels on every bullet unless writing a reference glossary."
        })

    return issues

def main():
    parser = argparse.ArgumentParser(description="Humanizer AI Writing Linter")
    parser.add_argument("file", nargs="?", help="Path to text or markdown file")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 if any AI tells are detected")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")
    args = parser.parse_args()

    if args.file:
        if not os.path.exists(args.file):
            print(f"Error: File not found: {args.file}", file=sys.stderr)
            sys.exit(2)
        with open(args.file, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        if sys.stdin.isatty():
            parser.print_help()
            sys.exit(0)
        content = sys.stdin.read()

    issues = scan_text(content)

    if args.json:
        print(json.dumps({
            "total_issues": len(issues),
            "issues": issues
        }, indent=2))
    else:
        if not issues:
            print("✅ 0 AI Writing Tells detected. Prose sounds human and direct!")
        else:
            print(f"⚠️  Found {len(issues)} potential AI writing tells:")
            for issue in issues:
                loc = f"Line {issue['line']}" if issue['line'] > 0 else "Document"
                print(f"  • [{issue['type']}] {loc}: {issue['match']}")
                print(f"    Snippet: \"{issue['snippet']}\"")
                print(f"    Fix: {issue['recommendation']}")
                print()

    if args.check and issues:
        sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    main()
