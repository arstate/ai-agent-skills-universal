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

FORBIDDEN_WORDS = {
    "ai", "artificial intelligence", "generative ai", "midjourney",
    "dall-e", "chatgpt", "stable diffusion", "flux", "gemini"
}


class GateAuditError(Exception):
    pass


def parse_style(style_str: str) -> dict:
    """Parse CSS inline style attribute string into a lowercase key-value dictionary."""
    styles = {}
    if not style_str:
        return styles
    for item in style_str.split(";"):
        if ":" in item:
            k, v = item.split(":", 1)
            styles[k.strip().lower()] = v.strip().lower()
    return styles


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
        errors.append(f"Gate 01 - Forbidden Words: {results['Gate 01 - Forbidden Words']}")

    # Gate 02: Filename Length & snake_case Check (<= 30 chars)
    if len(filename) <= 30:
        if re.match(r"^[a-z0-9_]+(?:\.svg|\.eps|\.png|\.jpg)$", filename):
            results["Gate 02 - Filename <= 30 chars"] = f"PASS ({len(filename)} chars, snake_case)"
        else:
            results["Gate 02 - Filename <= 30 chars"] = f"PASS ({len(filename)} chars)"
    else:
        err = f"FAIL (Filename '{filename}' has {len(filename)} chars > 30 chars limit)"
        results["Gate 02 - Filename <= 30 chars"] = err
        errors.append(f"Gate 02 - Filename: {err}")

    # Gate 03: Title Length Check (<= 70 chars)
    if not title or len(title) <= 70:
        results["Gate 03 - Title <= 70 chars"] = f"PASS ({len(title)} chars)" if title else "PASS (Skipped/Empty)"
    else:
        err = f"FAIL (Title '{title}' has {len(title)} chars > 70 chars limit)"
        results["Gate 03 - Title <= 70 chars"] = err
        errors.append(f"Gate 03 - Title: {err}")

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
    w, h = 0.0, 0.0
    try:
        w = float(w_str)
        h = float(h_str)
    except ValueError:
        pass

    if (w <= 0 or h <= 0) and "viewBox" in root.attrib:
        vb_parts = root.attrib["viewBox"].strip().replace(",", " ").split()
        if len(vb_parts) == 4:
            try:
                w = float(vb_parts[2])
                h = float(vb_parts[3])
            except ValueError:
                pass

    mp = (w * h) / 1_000_000.0 if (w > 0 and h > 0) else 0.0
    if mp >= 15.0:
        results["Gate 04 - Canvas >= 15.0 MP"] = f"PASS ({w:.0f}x{h:.0f} = {mp:.2f} MP)"
    else:
        err = f"FAIL ({w:.0f}x{h:.0f} = {mp:.2f} MP is under 15.0 MP threshold)"
        results["Gate 04 - Canvas >= 15.0 MP"] = err
        errors.append(f"Gate 04 - Canvas: {err}")

    # Gate 05 - Gate 09 inspection
    open_paths = []
    unexpanded_strokes = []
    alpha_attributes = []
    text_elements = []
    full_bg_rects = []

    for el in root.iter():
        tag = el.tag.split("}")[-1]
        style_dict = parse_style(el.attrib.get("style", ""))

        # Gate 08: Zero Text Tags
        if tag in {"text", "tspan"}:
            text_elements.append(f"<{tag} id='{el.attrib.get('id', '')}'>")

        # Gate 07: Zero Opacity / Filter attributes (allow 100% opaque: opacity=1 or 1.0)
        for alpha_attr in ("opacity", "fill-opacity", "stroke-opacity", "stop-opacity"):
            val = el.attrib.get(alpha_attr, style_dict.get(alpha_attr, None))
            if val is not None:
                val_clean = str(val).strip().lower().replace("%", "")
                try:
                    num_val = float(val_clean)
                    if num_val < 0.999:
                        alpha_attributes.append(f"<{tag} id='{el.attrib.get('id', '')}' {alpha_attr}='{val}'>")
                except ValueError:
                    alpha_attributes.append(f"<{tag} id='{el.attrib.get('id', '')}' {alpha_attr}='{val}'>")

        if "filter" in el.attrib or "filter" in style_dict:
            filt_val = el.attrib.get("filter", style_dict.get("filter", ""))
            if filt_val and filt_val.lower() != "none":
                alpha_attributes.append(f"<{tag} filter='{filt_val}'>")

        if tag in {"image", "filter", "feGaussianBlur", "feDropShadow"}:
            alpha_attributes.append(f"Forbidden tag <{tag}>")

        # Gate 06: Zero Live Strokes (checking both direct XML attribute and inline style)
        if tag in {"line", "polyline"}:
            unexpanded_strokes.append(f"Forbidden raw stroke tag <{tag}>")
        if require_zero_stroke:
            stroke_val = el.attrib.get("stroke", style_dict.get("stroke", "none")).strip()
            if stroke_val.lower() not in {"none", ""}:
                unexpanded_strokes.append(f"<{tag} id='{el.attrib.get('id', '')}' stroke='{stroke_val}'>")

        # Gate 05: Path inspection (ensuring all subpaths end with Z/z)
        if tag == "path":
            d = el.attrib.get("d", "").strip()
            subpaths = [sp.strip() for sp in re.split(r"(?=[Mm])", d) if sp.strip()]
            for sp in subpaths:
                if not sp.endswith(("Z", "z")):
                    open_paths.append(f"<path id='{el.attrib.get('id', '')}'>")
                    break

        # Gate 09: Background check (checking both fill attribute and style)
        if tag == "rect":
            rw = el.attrib.get("width", "").replace("px", "").strip()
            rh = el.attrib.get("height", "").replace("px", "").strip()
            fill = el.attrib.get("fill", style_dict.get("fill", "")).strip().lower()
            w_matches = rw in {"100%", str(int(w)) if w else "", w_str}
            h_matches = rh in {"100%", str(int(h)) if h else "", h_str}
            if w_matches and h_matches and fill in {"#ffffff", "white", "#fff"}:
                full_bg_rects.append(f"White background <rect fill='{fill}'>")

    results["Gate 05 - Closed Paths (Z)"] = "PASS" if not open_paths else f"FAIL ({len(open_paths)} open paths: {', '.join(open_paths[:3])})"
    if open_paths:
        errors.append(f"Gate 05 - Closed Paths (Z): {results['Gate 05 - Closed Paths (Z)']}")

    results["Gate 06 - Zero Live Strokes"] = "PASS" if not unexpanded_strokes else f"FAIL ({len(unexpanded_strokes)} live strokes: {', '.join(unexpanded_strokes[:3])})"
    if unexpanded_strokes:
        errors.append(f"Gate 06 - Zero Live Strokes: {results['Gate 06 - Zero Live Strokes']}")

    results["Gate 07 - Zero Alpha / Filters"] = "PASS" if not alpha_attributes else f"FAIL ({len(alpha_attributes)} raster risk attrs: {', '.join(alpha_attributes[:3])})"
    if alpha_attributes:
        errors.append(f"Gate 07 - Zero Alpha / Filters: {results['Gate 07 - Zero Alpha / Filters']}")

    results["Gate 08 - Zero Text Tags"] = "PASS" if not text_elements else f"FAIL ({len(text_elements)} text tags: {', '.join(text_elements[:3])})"
    if text_elements:
        errors.append(f"Gate 08 - Zero Text Tags: {results['Gate 08 - Zero Text Tags']}")

    results["Gate 09 - Transparent Background"] = "PASS" if not full_bg_rects else f"FAIL ({len(full_bg_rects)} white backgrounds found)"
    if full_bg_rects:
        errors.append(f"Gate 09 - Transparent Background: {results['Gate 09 - Transparent Background']}")

    # Gate 10 - Semantic Grouping
    groups = [el for el in root.iter() if el.tag.split("}")[-1] == "g" and el.attrib.get("id")]
    results["Gate 10 - Semantic Grouping"] = f"PASS ({len(groups)} named groups)" if groups else "FAIL (No named <g id='...'> found)"
    if not groups:
        errors.append(f"Gate 10 - Semantic Grouping: {results['Gate 10 - Semantic Grouping']}")

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
