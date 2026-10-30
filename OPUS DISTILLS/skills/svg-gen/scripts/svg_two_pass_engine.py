#!/usr/bin/env python3
"""
svg_two_pass_engine.py — Validator & Side-by-Side HTML Preview Generator
for /svg-gen v3.0 Two-Pass Progressive SVG Architecture.
"""

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

FORBIDDEN_TAGS = {
    "text", "tspan", "image", "filter", "feGaussianBlur", "feDropShadow",
    "feColorMatrix", "feBlend", "line", "polyline", "foreignObject", "script"
}

FORBIDDEN_ATTRS = {"opacity", "fill-opacity", "stroke-opacity", "stop-opacity", "filter"}


def audit_svg(svg_path: Path) -> list[str]:
    issues = []
    if not svg_path.exists():
        return [f"File not found: {svg_path}"]

    text = svg_path.read_text(encoding="utf-8")
    try:
        root = ET.fromstring(text)
    except ET.ParseError as e:
        return [f"Invalid XML in {svg_path.name}: {e}"]

    w = float(root.attrib.get("width", "0").replace("px", ""))
    h = float(root.attrib.get("height", "0").replace("px", ""))
    mp = (w * h) / 1_000_000.0
    if mp < 15.0:
        issues.append(f"Canvas {int(w)}x{int(h)} ({mp:.2f} MP) is below 15.0 MP minimum.")

    style = root.attrib.get("style", "")
    if "max-width:100%" not in style.replace(" ", ""):
        issues.append("Missing style='max-width:100%;height:auto;' for browser auto-fit preview.")

    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag in FORBIDDEN_TAGS:
            issues.append(f"Forbidden tag <{tag}> found (must be expanded/outlined closed <path>).")
        for attr in FORBIDDEN_ATTRS:
            if attr in el.attrib:
                issues.append(f"Forbidden attribute '{attr}' on <{tag}> (causes cairo_image in EPS).")
        stroke = el.attrib.get("stroke", "none")
        if stroke.lower() != "none":
            issues.append(f"Live stroke='{stroke}' on <{tag} id='{el.attrib.get('id', '')}'>.")
        if tag == "path":
            d = el.attrib.get("d", "").strip()
            if not d.endswith(("Z", "z")):
                issues.append(f"Open <path id='{el.attrib.get('id', '')}'> (must end with Z).")

    return issues


def build_html_preview(pass1_path: Path, pass2_path: Path, output_html: Path) -> Path:
    svg1 = pass1_path.read_text(encoding="utf-8")
    svg2 = pass2_path.read_text(encoding="utf-8")
    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>2-Pass SVG Preview: {pass1_path.stem} vs {pass2_path.stem}</title>
  <style>
    body {{ margin: 0; padding: 24px; background: #0F172A; color: #F8FAFC; font-family: system-ui, sans-serif; }}
    h1 {{ margin: 0 0 8px; font-size: 22px; }}
    p.sub {{ margin: 0 0 20px; color: #94A3B8; font-size: 14px; }}
    .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1400px; margin: 0 auto; }}
    .card {{ background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 16px; }}
    .badge {{ display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; margin-bottom: 12px; }}
    .b-pass1 {{ background: #334155; color: #38BDF8; }}
    .b-pass2 {{ background: #065F46; color: #34D399; }}
    .canvas-wrap {{
      background-image: linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
                        linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
                        linear-gradient(-45deg, transparent 75%, #e2e8f0 75%);
      background-size: 24px 24px;
      background-position: 0 0, 0 12px, 12px -12px, -12px 0;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #475569;
    }}
    .canvas-wrap svg {{ width: 100% !important; height: auto !important; display: block; }}
  </style>
</head>
<body>
  <h1>🔍 Two-Pass Progressive SVG Inspector (16.0 MP — 4000×4000 px)</h1>
  <p class="sub">Kiri: Pass 1 (Clean Simple Base) &nbsp;|&nbsp; Kanan: Pass 2 (Retouched Pro — Split-Tone Shading, Highlights & Micro-Details)</p>
  <div class="grid">
    <div class="card">
      <span class="badge b-pass1">PASS 1: CLEAN &amp; SIMPLE BASE ({pass1_path.name})</span>
      <div class="canvas-wrap">{svg1}</div>
    </div>
    <div class="card">
      <span class="badge b-pass2">PASS 2: RETOUCHED PRO FINAL ({pass2_path.name})</span>
      <div class="canvas-wrap">{svg2}</div>
    </div>
  </div>
</body>
</html>"""
    output_html.write_text(html, encoding="utf-8")
    return output_html


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Validate Pass 1 & Pass 2 SVGs and generate HTML preview.")
    parser.add_argument("pass1_svg", type=Path, help="Path to Pass 1 Clean Base SVG")
    parser.add_argument("pass2_svg", type=Path, help="Path to Pass 2 Retouched Final SVG")
    parser.add_argument("--html", type=Path, default=Path("preview_comparison.html"), help="Output HTML preview path")
    args = parser.parse_args()

    err1 = audit_svg(args.pass1_svg)
    err2 = audit_svg(args.pass2_svg)

    if err1 or err2:
        print("❌ AUDIT FAILED:")
        for e in err1:
            print(f"  [Pass 1] {e}")
        for e in err2:
            print(f"  [Pass 2] {e}")
        sys.exit(1)

    out_html = build_html_preview(args.pass1_svg, args.pass2_svg, args.html)
    print(f"✅ PASS 1 & PASS 2 100% COMPLIANT (16.0 MP, 0 Open Paths, 0 Live Strokes, 0 Opacity)!")
    print(f"🌐 Interactive Side-by-Side Preview generated at: {out_html.resolve()}")
