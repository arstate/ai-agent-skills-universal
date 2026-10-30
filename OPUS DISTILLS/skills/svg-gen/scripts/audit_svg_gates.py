#!/usr/bin/env python3
"""
Forensic 10-Gate SVG Quality Auditor (Adobe Stock / Microstock Anti-Reject Engine)
Usage:
    python3 audit_svg_gates.py <file.svg> [--title "..."] [--tags "tag1, tag2"]
"""

import sys
import re
import argparse
import xml.etree.ElementTree as ET
from pathlib import Path

FORBIDDEN_WORDS = {"ai", "artificial intelligence", "generative ai", "midjourney", "dall-e"}


class GateAuditError(Exception):
    pass


def audit_svg(svg_path: Path, title: str = "", tags: list[str] = None, require_zero_stroke: bool = True) -> dict:
    if tags is None:
        tags = []

    results = {}
    errors = []

    filename = svg_path.name

    # Gate 01: Forbidden Words Check
    gate_01_pass = True
    found_forbidden = []
    for word in FORBIDDEN_WORDS:
        pattern = r"\b" + re.escape(word) + r"\b"
        if re.search(pattern, filename.lower()):
            found_forbidden.append(f"Filename '{filename}' contains '{word}'")
            gate_01_pass = False
        if title and re.search(pattern, title.lower()):
            found_forbidden.append(f"Title '{title}' contains '{word}'")
            gate_01_pass = False
        for t in tags:
            if re.search(pattern, t.lower().strip()):
                found_forbidden.append(f"Tag '{t}' contains '{word}'")
                gate_01_pass = False

    results["Gate 01 - Forbidden Words"] = "PASS" if gate_01_pass else f"FAIL ({', '.join(found_forbidden)})"
    if not gate_01_pass:
        errors.append(results["Gate 01 - Forbidden Words"])

    # Gate 02: Filename Length Check (<= 30 chars)
    if len(filename) <= 30:
        results["Gate 02 - Filename <= 30 chars"] = f"PASS ({len(filename)} chars)"
    else:
        err = f"FAIL (Filename '{filename}' has {len(filename)} chars > 30 chars limit)"
        results["Gate 02 - Filename <= 30 chars"] = err
        errors.append(err)

    # Gate 03: Title Length Check (<= 70 chars)
    if not title or len(title) <= 70:
        results["Gate 03 - Title <= 70 chars"] = f"PASS ({len(title)} chars)" if title else "PASS (Skipped/Empty)"
    else:
        err = f"FAIL (Title '{title}' has {len(title)} chars > 70 chars limit)"
        results["Gate 03 - Title <= 70 chars"] = err
        errors.append(err)

    # Parse XML
    try:
        raw_xml = svg_path.read_text(encoding="utf-8")
        root = ET.fromstring(raw_xml)
    except Exception as e:
        results["XML Parsing"] = f"FAIL ({e})"
        return results

    # Gate 04: Canvas Resolution Check (>= 15.0 MP)
    w_str = root.attrib.get("width", "0").replace("px", "").strip()
    h_str = root.attrib.get("height", "0").replace("px", "").strip()
    try:
        w = float(w_str)
        h = float(h_str)
        mp = (w * h) / 1_000_000.0
        if mp >= 15.0:
            results["Gate 04 - Canvas >= 15.0 MP"] = f"PASS ({w:.0f}x{h:.0f} = {mp:.2f} MP)"
        else:
            err = f"FAIL ({w:.0f}x{h:.0f} = {mp:.2f} MP is under 15.0 MP threshold)"
            results["Gate 04 - Canvas >= 15.0 MP"] = err
            errors.append(err)
    except ValueError:
        err = f"FAIL (Invalid width '{w_str}' or height '{h_str}')"
        results["Gate 04 - Canvas >= 15.0 MP"] = err
        errors.append(err)

    # Gate 05: Closed Path Verification (Every <path> must end with Z or z)
    open_paths = []
    unexpanded_strokes = []
    alpha_attributes = []
    text_elements = []
    full_bg_rects = []

    for el in root.iter():
        tag = el.tag.split("}")[-1]

        # Gate 08: Zero Text Tags
        if tag in {"text", "tspan"}:
            text_elements.append(f"<{tag} id='{el.attrib.get('id', '')}'>")

        # Gate 07: Zero Opacity / Filter attributes
        for alpha_attr in ("opacity", "fill-opacity", "stroke-opacity", "stop-opacity", "filter"):
            if alpha_attr in el.attrib:
                alpha_attributes.append(f"<{tag} id='{el.attrib.get('id', '')}' {alpha_attr}='{el.attrib[alpha_attr]}'>")

        if tag in {"image", "filter", "feGaussianBlur", "feDropShadow"}:
            alpha_attributes.append(f"Forbidden tag <{tag}>")

        # Gate 06: Zero Live Strokes
        if tag in {"line", "polyline"}:
            unexpanded_strokes.append(f"Forbidden raw stroke tag <{tag}>")
        if require_zero_stroke:
            stroke_val = el.attrib.get("stroke", "none").strip()
            if stroke_val.lower() not in {"none", ""}:
                unexpanded_strokes.append(f"<{tag} id='{el.attrib.get('id', '')}' stroke='{stroke_val}'>")

        # Gate 05: Path inspection
        if tag == "path":
            d = el.attrib.get("d", "").strip()
            if not d.endswith(("Z", "z")):
                open_paths.append(f"<path id='{el.attrib.get('id', '')}'>")

        # Gate 09: Background check
        if tag == "rect":
            rw = el.attrib.get("width", "").replace("px", "").strip()
            rh = el.attrib.get("height", "").replace("px", "").strip()
            fill = el.attrib.get("fill", "").strip().lower()
            if rw in {"100%", w_str} and rh in {"100%", h_str} and fill in {"#ffffff", "white", "#fff"}:
                full_bg_rects.append(f"White background <rect fill='{fill}'>")

    results["Gate 05 - Closed Paths (Z)"] = "PASS" if not open_paths else f"FAIL ({len(open_paths)} open paths: {', '.join(open_paths[:3])})"
    if open_paths:
        errors.append(results["Gate 05 - Closed Paths (Z)"])

    results["Gate 06 - Zero Live Strokes"] = "PASS" if not unexpanded_strokes else f"FAIL ({len(unexpanded_strokes)} live strokes: {', '.join(unexpanded_strokes[:3])})"
    if unexpanded_strokes:
        errors.append(results["Gate 06 - Zero Live Strokes"])

    results["Gate 07 - Zero Alpha / Filters"] = "PASS" if not alpha_attributes else f"FAIL ({len(alpha_attributes)} raster risk attrs: {', '.join(alpha_attributes[:3])})"
    if alpha_attributes:
        errors.append(results["Gate 07 - Zero Alpha / Filters"])

    results["Gate 08 - Zero Text Tags"] = "PASS" if not text_elements else f"FAIL ({len(text_elements)} text tags: {', '.join(text_elements[:3])})"
    if text_elements:
        errors.append(results["Gate 08 - Zero Text Tags"])

    results["Gate 09 - Transparent Background"] = "PASS" if not full_bg_rects else f"FAIL ({len(full_bg_rects)} white backgrounds found)"
    if full_bg_rects:
        errors.append(results["Gate 09 - Transparent Background"])

    # Gate 10 - Semantic Grouping
    groups = [el for el in root.iter() if el.tag.split("}")[-1] == "g" and el.attrib.get("id")]
    results["Gate 10 - Semantic Grouping"] = f"PASS ({len(groups)} named groups)" if groups else "FAIL (No named <g id='...'> found)"
    if not groups:
        errors.append(results["Gate 10 - Semantic Grouping"])

    results["_errors"] = errors
    return results


def main():
    parser = argparse.ArgumentParser(description="Audit SVG for Adobe Stock 10 Quality Gates")
    parser.add_argument("svg_file", help="Path to SVG file")
    parser.add_argument("--title", default="", help="Document Title")
    parser.add_argument("--tags", default="", help="Comma-separated keywords")
    parser.add_argument("--allow-strokes", action="store_true", help="Allow stroke attributes (draft mode)")
    args = parser.parse_args()

    p = Path(args.svg_file)
    if not p.exists():
        print(f"Error: File not found: {p}")
        sys.exit(1)

    tags = [t.strip() for t in args.tags.split(",") if t.strip()]
    res = audit_svg(p, title=args.title, tags=tags, require_zero_stroke=not args.allow_strokes)

    print(f"\n=======================================================")
    print(f" 10-GATE FORENSIC AUDIT: {p.name}")
    print(f"=======================================================")
    passed = 0
    total = 10
    for k, v in res.items():
        if k.startswith("_"):
            continue
        status_icon = "✅" if v.startswith("PASS") else "❌"
        if v.startswith("PASS"):
            passed += 1
        print(f"{status_icon} {k:<34} : {v}")

    print(f"-------------------------------------------------------")
    print(f"Score: {passed}/{total} Gates Passed")
    if res["_errors"]:
        print(f"❌ REJECTED: {len(res['_errors'])} violations detected!")
        sys.exit(1)
    else:
        print(f"✅ APPROVED: 100% Ready for Adobe Stock Production!")
        sys.exit(0)


if __name__ == "__main__":
    main()
