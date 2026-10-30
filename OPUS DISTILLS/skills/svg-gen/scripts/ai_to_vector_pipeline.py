#!/usr/bin/env python3
"""
AI-to-Vector Production Pipeline v2.0 (Adobe Stock & Commercial Microstock Contributor)
Implements:
1. Deep Ungroup + object-to-path + stroke-to-path via Inkscape CLI (Zero Live Strokes)
2. Strict 10-Gate Forensic XML Audit (0 open paths, 0 opacity, 0 filter, >= 15.0 MP)
3. High-Res Multi-Format Staging:
   - Pure Scalable Vector (.SVG) with Dublin Core RDF
   - PostScript DSC 3.0 Encapsulated PostScript (.EPS) with zero cairo_image
   - 15+ MP PNG (Transparent) via rsvg-convert
   - 15+ MP JPG (White Flattened with Embedded XMP) via ImageMagick
   - 360h Web Preview Thumbnail
4. Deduplicated Master Metadata CSV Writer
"""

import csv
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

# Local imports
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from auto_embed_metadata import embed_svg_metadata, embed_jpeg_metadata
from audit_svg_gates import audit_svg


def get_inkscape_command() -> list[str]:
    """Determine whether to use flatpak Inkscape or native inkscape CLI."""
    if shutil.which("inkscape"):
        return ["inkscape"]
    # Check flatpak
    res = subprocess.run(["flatpak", "list"], capture_output=True, text=True)
    if "org.inkscape.Inkscape" in res.stdout:
        return ["flatpak", "run", "org.inkscape.Inkscape"]
    raise RuntimeError("Neither native inkscape nor flatpak org.inkscape.Inkscape was found on PATH.")


def upsert_master_csv(master_csv: Path, row_data: list):
    """Insert or update a row in master CSV by Filename to prevent duplicate submissions."""
    header = ["Filename", "Title", "Keywords", "Category", "Releases"]
    existing_rows = []
    if master_csv.exists():
        with open(master_csv, "r", newline="", encoding="utf-8") as f:
            reader = csv.reader(f)
            for idx, r in enumerate(reader):
                if idx == 0 and r == header:
                    continue
                if r and r[0] != row_data[0]:
                    existing_rows.append(r)

    master_csv.parent.mkdir(parents=True, exist_ok=True)
    with open(master_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(existing_rows)
        writer.writerow(row_data)


def finalize_production_package(
    asset_dir: Path,
    base_name: str,
    raw_svg_path: Path,
    title: str,
    tags: list[str],
    category_id: int,
    canvas_w: int = 4000,
    canvas_h: int = 4000,
    master_csv: Path = None
):
    """
    Produce the full production asset bundle:
    - Outlined SVG (0 live strokes, 0 open paths)
    - Pure PostScript DSC 3.0 EPS (0 cairo_image)
    - 15+ MP Transparent PNG
    - 15+ MP White Flattened JPG with XMP
    - 360h Web Preview Thumbnail
    - Asset-level metadata.csv + Master CSV Upsert
    """
    print(f"\n[Stage 4-7: Production Finalization for {base_name} ({canvas_w}x{canvas_h})]")
    asset_dir.mkdir(parents=True, exist_ok=True)

    final_svg = asset_dir / f"{base_name}.svg"
    final_eps = asset_dir / f"{base_name}.eps"
    final_png = asset_dir / f"{base_name}.png"
    final_jpg = asset_dir / f"{base_name}.jpg"
    thumb_w = int(round(360 * (canvas_w / canvas_h)))
    final_thumb = asset_dir / f"{base_name}_thumb_360h.png"

    # Use user home directory for flatpak compatibility
    home_user = Path.home()
    temp_raw = home_user / f"temp_{base_name}_raw.svg"
    temp_outlined = home_user / f"temp_{base_name}_outlined.svg"
    temp_eps = home_user / f"temp_{base_name}.eps"

    shutil.copyfile(raw_svg_path, temp_raw)
    inkscape_cmd = get_inkscape_command()

    # 1. Convert Shapes & Strokes to Closed Paths via Inkscape (Preserving Semantic Groups)
    print("-> Expanding all objects and strokes to closed paths via Inkscape...")
    cmd_outline = inkscape_cmd + [
        str(temp_raw),
        (
            "--actions=select-all:all;object-to-path;object-stroke-to-path;"
            f"export-filename:{temp_outlined};export-do"
        ),
    ]
    res_outline = subprocess.run(cmd_outline, capture_output=True, text=True)
    if res_outline.returncode != 0 or not temp_outlined.exists():
        raise RuntimeError(f"Inkscape outline failed: {res_outline.stderr}")

    shutil.copyfile(temp_outlined, final_svg)

    # 2. Export pure PostScript EPS Level 3.0
    print("-> Exporting pure PostScript DSC 3.0 EPS...")
    cmd_eps = inkscape_cmd + [
        str(temp_outlined),
        "--export-type=eps",
        f"--export-filename={temp_eps}",
    ]
    res_eps = subprocess.run(cmd_eps, capture_output=True, text=True)
    if res_eps.returncode != 0 or not temp_eps.exists():
        raise RuntimeError(f"Inkscape EPS export failed: {res_eps.stderr}")
    shutil.copy2(temp_eps, final_eps)

    temp_raw.unlink(missing_ok=True)
    temp_outlined.unlink(missing_ok=True)
    temp_eps.unlink(missing_ok=True)

    # 3. Render >= 15 MP PNG, JPG (white flattened for preview), and 360h Thumbnail
    print("-> Rendering 15+ MP PNG & JPG previews...")
    subprocess.run(["rsvg-convert", "-w", str(canvas_w), "-h", str(canvas_h), str(final_svg), "-o", str(final_png)], check=True)
    subprocess.run(["magick", str(final_png), "-background", "white", "-flatten", "-quality", "95", str(final_jpg)], check=True)
    subprocess.run(["rsvg-convert", "-w", str(thumb_w), "-h", "360", str(final_svg), "-o", str(final_thumb)], check=True)

    # 4. Run 10-Gate Forensic Verification
    print("-> Running 10-Gate Forensic Verification...")
    audit_res = audit_svg(final_svg, title=title, tags=tags, require_zero_stroke=True)
    if audit_res.get("_errors"):
        raise AssertionError(f"10-Gate Audit Failed for {final_svg.name}: {audit_res['_errors']}")

    eps_text = final_eps.read_text(encoding="latin-1")
    cairo_count = len(re.findall(r"^cairo_image\b", eps_text, re.MULTILINE))
    assert cairo_count == 0, f"FATAL: {final_eps.name} contains {cairo_count} cairo_image raster bitmaps!"

    # 5. Embed Dublin Core and XMP Metadata
    print("-> Embedding Dublin Core RDF and XMP metadata...")
    embed_svg_metadata(str(final_svg), title, tags)
    embed_jpeg_metadata(str(final_jpg), title, tags)

    # 6. Write per-asset metadata.csv & upsert Master CSV
    tags_str = ", ".join(tags)
    with open(asset_dir / "metadata.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Filename", "Title", "Keywords", "Category", "Releases"])
        writer.writerow([final_svg.name, title, tags_str, category_id, ""])
        writer.writerow([final_eps.name, title, tags_str, category_id, ""])

    if master_csv is not None:
        upsert_master_csv(master_csv, [final_svg.name, title, tags_str, category_id, ""])

    # 7. Auto-purge temporary raw directory if present
    raw_dir = asset_dir / "raw"
    if raw_dir.exists():
        shutil.rmtree(raw_dir)

    print(f"✅ [10/10 GATES PASSED] {final_svg.name} ({canvas_w}x{canvas_h}, 0 open paths, 0 live strokes, 0 cairo_image)")
    return {
        "svg": final_svg,
        "eps": final_eps,
        "png": final_png,
        "jpg": final_jpg,
        "thumb": final_thumb
    }
