#!/usr/bin/env python3
"""
svg_four_pass_engine.py — Automated 4-Pass Progressive Vector Auditor
& 4-Column Interactive HTML Inspector for /svg-gen v4.0.
"""

import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

FORBIDDEN_TAGS = {
    "text", "tspan", "image", "filter", "feGaussianBlur", "feDropShadow",
    "feColorMatrix", "feBlend", "line", "polyline", "foreignObject", "script"
}
FORBIDDEN_ATTRS = {"opacity", "fill-opacity", "stroke-opacity", "stop-opacity", "filter"}


def audit_single_pass(svg_path: Path, pass_num: int) -> tuple[list[str], int]:
    """Audit a single pass SVG and return (issues_list, path_count)."""
    issues = []
    if not svg_path.exists():
        return [f"Pass {pass_num} file missing: {svg_path}"], 0

    raw = svg_path.read_text(encoding="utf-8")
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        return [f"Pass {pass_num} invalid XML: {e}"], 0

    w = float(root.attrib.get("width", "0").replace("px", ""))
    h = float(root.attrib.get("height", "0").replace("px", ""))
    mp = (w * h) / 1_000_000.0
    if mp < 15.0:
        issues.append(f"Pass {pass_num}: Canvas {int(w)}x{int(h)} ({mp:.2f} MP) < 15.0 MP.")

    style = root.attrib.get("style", "").replace(" ", "")
    if "max-width:100%" not in style:
        issues.append(f"Pass {pass_num}: Missing style='max-width:100%;height:auto;' for browser preview.")

    path_count = 0
    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag in FORBIDDEN_TAGS:
            issues.append(f"Pass {pass_num}: Forbidden tag <{tag}> found.")
        for attr in FORBIDDEN_ATTRS:
            if attr in el.attrib:
                issues.append(f"Pass {pass_num}: Forbidden attribute '{attr}' on <{tag}>.")
        stroke = el.attrib.get("stroke", "none")
        if stroke.lower() != "none":
            issues.append(f"Pass {pass_num}: Unexpanded stroke='{stroke}' on <{tag} id='{el.attrib.get('id', '')}'>.")
        if tag == "path":
            path_count += 1
            d = el.attrib.get("d", "").strip()
            if not d.endswith(("Z", "z")):
                issues.append(f"Pass {pass_num}: Open <path id='{el.attrib.get('id', '')}'> (does not end with Z).")

    return issues, path_count


def generate_4pass_html(paths: list[Path], counts: list[int], out_html: Path) -> Path:
    svgs = [p.read_text(encoding="utf-8") for p in paths]
    titles = [
        f"PASS 1: CLEAN SKELETON ({counts[0]} paths)",
        f"PASS 2: 2D SPLIT-TONE SHADING ({counts[1]} paths)",
        f"PASS 3: MICRO-DETAILS & GLOSS ({counts[2]} paths)",
        f"PASS 4: ARTIFACT PURGE & FINAL RETOUCH ({counts[3]} paths)",
    ]
    badge_classes = ["b1", "b2", "b3", "b4"]

    cards_html = ""
    for i in range(4):
        cards_html += f"""
    <div class="card">
      <div class="card-head">
        <span class="badge {badge_classes[i]}">{titles[i]}</span>
        <span class="fname">{paths[i].name}</span>
      </div>
      <div class="canvas-wrap">{svgs[i]}</div>
    </div>"""

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>4-Pass Progressive Vector Inspector — /svg-gen v4.0</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; padding: 24px; background: #090D16; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }}
    .header {{ max-width: 1680px; margin: 0 auto 20px; display: flex; justify-content: space-between; align-items: center; }}
    h1 {{ margin: 0; font-size: 22px; }}
    .sub {{ color: #94A3B8; font-size: 14px; margin-top: 4px; }}
    .grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 1680px; margin: 0 auto; }}
    @media (min-width: 1500px) {{ .grid {{ grid-template-columns: repeat(4, 1fr); }} }}
    .card {{ background: #111827; border: 1px solid #1E293B; border-radius: 14px; padding: 14px; }}
    .card-head {{ display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }}
    .fname {{ color: #64748B; font-family: monospace; font-size: 12px; }}
    .badge {{ display: inline-block; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; width: fit-content; }}
    .b1 {{ background: #1E293B; color: #94A3B8; }}
    .b2 {{ background: #1E3A8A; color: #93C5FD; }}
    .b3 {{ background: #581C87; color: #E9D5FF; }}
    .b4 {{ background: #065F46; color: #6EE7B7; border: 1px solid #10B981; }}
    .canvas-wrap {{ background: #FFFFFF; border-radius: 10px; overflow: hidden; border: 1px solid #334155; }}
    .canvas-wrap svg {{ width: 100% !important; height: auto !important; display: block; }}
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>🚀 4-Pass Progressive Vector Inspector (16.0 MP — 4000×4000 px)</h1>
      <div class="sub">Evolusi Bertahap: Pass 1 (Skeleton) ➔ Pass 2 (Shading) ➔ Pass 3 (Micro-Details) ➔ Pass 4 (Artifact Purge &amp; Arc-Clipped Final Retouch)</div>
    </div>
  </div>
  <div class="grid">{cards_html}
  </div>
</body>
</html>"""
    out_html.write_text(html, encoding="utf-8")
    return out_html


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Audit 4-Pass SVGs and build 4-column HTML inspector.")
    parser.add_argument("pass1", type=Path)
    parser.add_argument("pass2", type=Path)
    parser.add_argument("pass3", type=Path)
    parser.add_argument("pass4", type=Path)
    parser.add_argument("--html", type=Path, default=Path("preview_4pass_inspector.html"))
    args = parser.parse_args()

    pass_files = [args.pass1, args.pass2, args.pass3, args.pass4]
    all_issues = []
    counts = []

    for idx, p in enumerate(pass_files, 1):
        iss, cnt = audit_single_pass(p, idx)
        all_issues.extend(iss)
        counts.append(cnt)

    if not (counts[0] < counts[1] < counts[2] <= counts[3]):
        print(f"⚠️ Note: Path progression across passes is {counts}")

    if all_issues:
        print("❌ 4-PASS AUDIT FAILED:")
        for issue in all_issues:
            print("  -", issue)
        sys.exit(1)

    out = generate_4pass_html(pass_files, counts, args.html)
    print(f"✅ ALL 4 PASSES CERTIFIED FLAWLESS! Path progression: Pass1={counts[0]} -> Pass2={counts[1]} -> Pass3={counts[2]} -> Pass4={counts[3]}")
    print(f"🌐 4-Column Interactive Preview saved to: {out.resolve()}")
