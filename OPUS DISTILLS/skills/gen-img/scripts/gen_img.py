#!/usr/bin/env python3
"""
gen-img: Ultra-fast Image Generation CLI & Python API via 9Router Antigravity (Gemini Nano Banana / Imagen 3).
Supports custom aspect ratios (1:1, 3:4, 4:3, 9:16, 16:9, etc.), local reference image input, and automatic file saving.
"""

import sys
import os
import argparse
import base64
import json
import re
import subprocess
import mimetypes
from pathlib import Path
from urllib import request, error

ROUTER_URL = os.environ.get("ROUTER_URL", "http://127.0.0.1:20128")
ROUTER_API_KEY = os.environ.get("ROUTER_API_KEY", "sk-47024d86a10c3a4b-2att59-c53bbf8a")
DEFAULT_MODEL = "ag/gemini-3.1-flash-image"

RATIO_MAP = {
    "1:1": (1024, 1024),
    "1x1": (1024, 1024),
    "3:4": (768, 1024),
    "3x4": (768, 1024),
    "4:3": (1024, 768),
    "4x3": (1024, 768),
    "9:16": (576, 1024),
    "9x16": (576, 1024),
    "16:9": (1024, 576),
    "16x9": (1024, 576),
    "2:3": (682, 1024),
    "2x3": (682, 1024),
    "3:2": (1024, 682),
    "3x2": (1024, 682),
    "4:5": (819, 1024),
    "4x5": (819, 1024),
}

def encode_image(file_path: str) -> str:
    path = Path(file_path).expanduser().resolve()
    if not path.is_file():
        raise FileNotFoundError(f"Reference image not found: {file_path}")
    
    mime, _ = mimetypes.guess_type(str(path))
    if not mime:
        mime = "image/jpeg"
        
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
        
    return f"data:{mime};base64,{b64}"

def crop_to_ratio(image_path: Path, ratio_str: str):
    key = ratio_str.strip().lower()
    if key not in RATIO_MAP or key in ("1:1", "1x1"):
        return
    target_w, target_h = RATIO_MAP[key]
    try:
        subprocess.run(
            ["magick", str(image_path), "-gravity", "center", "-crop", f"{target_w}x{target_h}+0+0", "+repage", str(image_path)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
    except Exception:
        pass

def generate_image(
    prompt: str,
    ratio: str = "1:1",
    ref_image: str = None,
    output_path: str = None,
    model: str = DEFAULT_MODEL,
    api_key: str = ROUTER_API_KEY,
    router_url: str = ROUTER_URL
) -> dict:
    ratio_clean = ratio.replace(":", "x").strip().lower()
    target_model = model
    
    b64_img = None
    
    # 1. Primary Strategy: /v1/chat/completions (handles multimodal vision + image generation returning base64)
    content_parts = [{"type": "text", "text": prompt}]
    if ref_image:
        if ref_image.startswith("data:image/") or ref_image.startswith("http"):
            data_uri = ref_image
        else:
            data_uri = encode_image(ref_image)
        content_parts.append({"type": "image_url", "image_url": {"url": data_uri}})
        
    chat_payload = {
        "model": target_model,
        "stream": False,
        "messages": [{"role": "user", "content": content_parts}]
    }
    
    try:
        req = request.Request(
            f"{router_url.rstrip('/')}/v1/chat/completions",
            data=json.dumps(chat_payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}"
            },
            method="POST"
        )
        with request.urlopen(req, timeout=120) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            content = res_json["choices"][0]["message"].get("content", "")
            match = re.search(r"data:image/[^;]+;base64,([A-Za-z0-9+/=]+)", content)
            if match:
                b64_img = match.group(1)
    except Exception:
        pass

    # 2. Fallback Strategy: /v1/images/generations
    if not b64_img:
        gen_payload = {
            "model": target_model,
            "prompt": prompt,
            "n": 1,
            "output_format": "png"
        }
        if ref_image:
            if ref_image.startswith("data:image/") or ref_image.startswith("http"):
                gen_payload["image"] = ref_image
            else:
                gen_payload["image"] = encode_image(ref_image)
        try:
            req = request.Request(
                f"{router_url.rstrip('/')}/v1/images/generations",
                data=json.dumps(gen_payload).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                method="POST"
            )
            with request.urlopen(req, timeout=120) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                if "data" in res_json and len(res_json["data"]) > 0:
                    b64_img = res_json["data"][0].get("b64_json")
        except Exception as e:
            if not b64_img:
                raise RuntimeError(f"Image generation failed: {e}")

    if not b64_img:
        raise RuntimeError("No image data returned from provider.")
        
    img_bytes = base64.b64decode(b64_img)
    
    if not output_path:
        from time import time
        output_path = f"generated_{int(time())}_{ratio_clean}.jpg"
        
    save_path = Path(output_path).expanduser().resolve()
    save_path.parent.mkdir(parents=True, exist_ok=True)
    with open(save_path, "wb") as f:
        f.write(img_bytes)
        
    # Crop to requested ratio if not 1:1
    crop_to_ratio(save_path, ratio)
        
    return {
        "success": True,
        "output_path": str(save_path),
        "file_size_bytes": save_path.stat().st_size,
        "model_used": target_model,
        "ratio": ratio_clean,
        "prompt": prompt
    }

def main():
    parser = argparse.ArgumentParser(description="Generate AI images via 9Router Antigravity (Gemini Nano Banana / Imagen 3)")
    parser.add_argument("prompt", help="Text prompt for image generation")
    parser.add_argument("-r", "--ratio", default="1:1", choices=["1:1", "3:4", "4:3", "9:16", "16:9", "2:3", "3:2", "4:5"], help="Aspect ratio (default: 1:1)")
    parser.add_argument("-i", "--image", dest="ref_image", default=None, help="Path to reference image (Image-to-Image)")
    parser.add_argument("-o", "--output", default=None, help="Output file path (default: generated_<timestamp>_<ratio>.jpg)")
    parser.add_argument("-m", "--model", default=DEFAULT_MODEL, help=f"Base model (default: {DEFAULT_MODEL})")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    
    args = parser.parse_args()
    
    try:
        res = generate_image(
            prompt=args.prompt,
            ratio=args.ratio,
            ref_image=args.ref_image,
            output_path=args.output,
            model=args.model
        )
        if args.json:
            print(json.dumps(res, indent=2))
        else:
            print(f"✅ Gambar berhasil dibuat: {res['output_path']}")
            print(f"📐 Aspek Rasio: {res['ratio']} | Model: {res['model_used']} | Ukuran: {res['file_size_bytes'] / 1024:.1f} KB")
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
