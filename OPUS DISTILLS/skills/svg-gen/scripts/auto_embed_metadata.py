#!/usr/bin/env python3
"""
Adobe Stock & Microstock Batch Metadata Embedder (Dublin Core RDF & XMP Engine)
Usage:
    python3 auto_embed_metadata.py --file "path/to/asset.svg" --title "..." --tags "tag1, tag2"
    python3 auto_embed_metadata.py --csv "metadata.csv"
    python3 auto_embed_metadata.py --inspect "path/to/asset.svg"
"""

import sys
import os
import argparse
import csv
import re
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False


def embed_svg_metadata(svg_path: str, title: str, tags: list[str]) -> bool:
    """Inject standard Dublin Core RDF metadata into SVG XML without corrupting root SVG tags."""
    try:
        ET.register_namespace('', 'http://www.w3.org/2000/svg')
        ET.register_namespace('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#')
        ET.register_namespace('cc', 'http://creativecommons.org/ns#')
        ET.register_namespace('dc', 'http://purl.org/dc/elements/1.1/')

        tree = ET.parse(svg_path)
        root = tree.getroot()

        metadata_elem = root.find('{http://www.w3.org/2000/svg}metadata')
        if metadata_elem is None:
            metadata_elem = root.find('metadata')
            if metadata_elem is None:
                metadata_elem = ET.SubElement(root, '{http://www.w3.org/2000/svg}metadata')

        metadata_elem.clear()

        rdf = ET.SubElement(metadata_elem, '{http://www.w3.org/1999/02/22-rdf-syntax-ns#}RDF')
        work = ET.SubElement(rdf, '{http://creativecommons.org/ns#}Work')
        work.set('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}about', '')

        dc_format = ET.SubElement(work, '{http://purl.org/dc/elements/1.1/}format')
        dc_format.text = 'image/svg+xml'

        dc_type = ET.SubElement(work, '{http://purl.org/dc/elements/1.1/}type')
        dc_type.set('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource', 'http://purl.org/dc/dcmitype/StillImage')

        dc_title = ET.SubElement(work, '{http://purl.org/dc/elements/1.1/}title')
        dc_title.text = title

        dc_desc = ET.SubElement(work, '{http://purl.org/dc/elements/1.1/}description')
        dc_desc.text = title

        dc_subject = ET.SubElement(work, '{http://purl.org/dc/elements/1.1/}subject')
        bag = ET.SubElement(dc_subject, '{http://www.w3.org/1999/02/22-rdf-syntax-ns#}Bag')
        for tag in tags:
            tag_clean = tag.strip()
            if tag_clean:
                li = ET.SubElement(bag, '{http://www.w3.org/1999/02/22-rdf-syntax-ns#}li')
                li.text = tag_clean

        tree.write(svg_path, encoding='utf-8', xml_declaration=True)
        return True
    except Exception as e:
        print(f"Error embedding SVG metadata in {svg_path}: {e}", file=sys.stderr)
        return False


def embed_jpeg_metadata(jpeg_path: str, title: str, tags: list[str]) -> bool:
    """Inject XMP packet into JPEG file using Pillow."""
    if not PILLOW_AVAILABLE:
        print(f"Warning: Pillow not available. Cannot embed XMP into {jpeg_path}", file=sys.stderr)
        return False

    try:
        img = Image.open(jpeg_path)
        bag_items = "".join([f"<rdf:li>{t.strip()}</rdf:li>" for t in tags if t.strip()])
        xmp_data = f"""<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/">
   <dc:title>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">{title}</rdf:li>
    </rdf:Alt>
   </dc:title>
   <dc:description>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">{title}</rdf:li>
    </rdf:Alt>
   </dc:description>
   <dc:subject>
    <rdf:Bag>
     {bag_items}
    </rdf:Bag>
   </dc:subject>
   <photoshop:Headline>{title}</photoshop:Headline>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>""".encode('utf-8')

        img.save(jpeg_path, "JPEG", quality=95, xmp=xmp_data)
        return True
    except Exception as e:
        print(f"Error embedding JPEG metadata in {jpeg_path}: {e}", file=sys.stderr)
        return False


def inspect_metadata(file_path: str):
    p = Path(file_path)
    if not p.exists():
        print(f"File not found: {file_path}")
        return

    ext = p.suffix.lower()
    print(f"\n--- Metadata Inspection: {p.name} ---")
    if ext == ".svg":
        try:
            tree = ET.parse(file_path)
            root = tree.getroot()
            for title_node in root.findall(".//{http://purl.org/dc/elements/1.1/}title"):
                print(f"DC Title: {title_node.text}")
            tags = [li.text for li in root.findall(".//{http://purl.org/dc/elements/1.1/}subject//{http://www.w3.org/1999/02/22-rdf-syntax-ns#}li")]
            print(f"DC Keywords ({len(tags)}): {', '.join(tags)}")
        except Exception as e:
            print(f"Failed to inspect SVG: {e}")
    elif ext in [".jpg", ".jpeg"] and PILLOW_AVAILABLE:
        try:
            img = Image.open(file_path)
            xmp = img.info.get("xmp")
            if xmp:
                print(f"XMP data present ({len(xmp)} bytes)")
            else:
                print("No XMP data found.")
        except Exception as e:
            print(f"Failed to inspect JPEG: {e}")


def main():
    parser = argparse.ArgumentParser(description="Embed Dublin Core / XMP metadata into SVG and JPEG")
    parser.add_argument("--file", help="Path to single asset")
    parser.add_argument("--title", default="", help="Document Title")
    parser.add_argument("--tags", default="", help="Comma-separated keywords")
    parser.add_argument("--csv", help="Path to batch CSV file")
    parser.add_argument("--inspect", help="Inspect metadata of file")

    args = parser.parse_args()

    if args.inspect:
        inspect_metadata(args.inspect)
        return

    if args.file:
        p = Path(args.file)
        tags = [t.strip() for t in args.tags.split(",") if t.strip()]
        if p.suffix.lower() == ".svg":
            success = embed_svg_metadata(str(p), args.title, tags)
        elif p.suffix.lower() in [".jpg", ".jpeg"]:
            success = embed_jpeg_metadata(str(p), args.title, tags)
        else:
            print(f"Unsupported format: {p.suffix}")
            sys.exit(1)
        if success:
            print(f"✅ Metadata embedded successfully: {p.name}")
        else:
            sys.exit(1)

    elif args.csv:
        csv_path = Path(args.csv)
        if not csv_path.exists():
            print(f"CSV not found: {csv_path}")
            sys.exit(1)
        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.reader(f)
            header = next(reader, None)
            for row in reader:
                if len(row) < 3:
                    continue
                fn, title, tags_str = row[0], row[1], row[2]
                asset_file = csv_path.parent / fn
                if not asset_file.exists():
                    print(f"Skipping missing file: {fn}")
                    continue
                tags = [t.strip() for t in tags_str.split(",") if t.strip()]
                if asset_file.suffix.lower() == ".svg":
                    embed_svg_metadata(str(asset_file), title, tags)
                elif asset_file.suffix.lower() in [".jpg", ".jpeg"]:
                    embed_jpeg_metadata(str(asset_file), title, tags)
                print(f"Embedded: {fn}")


if __name__ == "__main__":
    main()
