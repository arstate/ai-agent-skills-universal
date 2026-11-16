#!/usr/bin/env python3
"""
gen-img: Dual-Engine Image Generation CLI & Python API.
Primary: AIStudio2API (Nano Banana 2.1, 4K native, High Thinking, Web & Image Search).
Fallback: 9Router Antigravity (otomatis aktif jika AIStudio2API limit/error/unreachable).
"""

import argparse
import base64
import json
import mimetypes
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib import error, request

# Primary: AIStudio2API
AISTUDIO_URL = os.environ.get("AISTUDIO_URL", "http://127.0.0.1:2048")
AISTUDIO_API_KEY = os.environ.get("AISTUDIO_API_KEY", "sk-aistudio-local")
AISTUDIO_MODEL = os.environ.get("AISTUDIO_MODEL", "gemini-nano-banana-2.1")

# Fallback: 9Router
ROUTER_URL = os.environ.get("ROUTER_URL", "http://127.0.0.1:20128")
ROUTER_API_KEY = os.environ.get("ROUTER_API_KEY", "sk-47024d86a10c3a4b-2att59-c53bbf8a")
FALLBACK_MODEL = os.environ.get("FALLBACK_MODEL", "ag/gemini-3.1-flash-image")

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
    "21:9": (1344, 576),
    "21x9": (1344, 576),
}


def load_reference_image(ref_image: str) -> tuple[str, str, str]:
    """Return (mime_type, raw_base64, data_uri) untuk file lokal atau data URI."""
    if ref_image.startswith("data:image/"):
        header, _, b64 = ref_image.partition(",")
        mime = header.split(";")[0].replace("data:", "") or "image/jpeg"
        return mime, b64, ref_image

    path = Path(ref_image).expanduser().resolve()
    if not path.is_file():
        raise FileNotFoundError(f"Reference image not found: {ref_image}")

    mime, _ = mimetypes.guess_type(str(path))
    if not mime:
        mime = "image/jpeg"

    b64 = base64.b64encode(path.read_bytes()).decode("utf-8")
    return mime, b64, f"data:{mime};base64,{b64}"


def crop_to_ratio(image_path: Path, ratio_str: str) -> None:
    key = ratio_str.strip().lower()
    if key in ("auto", "1:1", "1x1") or key not in RATIO_MAP:
        return
    target_w, target_h = RATIO_MAP[key]
    try:
        subprocess.run(
            [
                "magick",
                str(image_path),
                "-gravity",
                "center",
                "-crop",
                f"{target_w}x{target_h}+0+0",
                "+repage",
                str(image_path),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except Exception:
        pass


def mime_to_ext(mime: str) -> str:
    return {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
    }.get((mime or "").lower(), ".jpg")


def generate_via_aistudio(
    prompt: str,
    ratio: str = "auto",
    size: str = "4K",
    thinking: str = "high",
    use_search: bool = True,
    ref_image: str | None = None,
    model: str = AISTUDIO_MODEL,
    api_key: str = AISTUDIO_API_KEY,
    base_url: str = AISTUDIO_URL,
) -> tuple[str, str]:
    """Return (b64_image, mime_type) via AIStudio2API native /v1beta endpoint."""
    parts = []
    if ref_image:
        if ref_image.startswith("http"):
            raise RuntimeError("AIStudio inline reference requires local file or data URI")
        mime, raw_b64, _ = load_reference_image(ref_image)
        parts.append({"inlineData": {"mimeType": mime, "data": raw_b64}})
    parts.append({"text": prompt})

    image_config = {"imageSize": size.upper()}
    if ratio and ratio.lower() != "auto":
        image_config["aspectRatio"] = ratio.replace("x", ":")

    payload = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {
            "maxOutputTokens": 65536,
            "thinkingConfig": {
                "includeThoughts": True,
                "thinkingLevel": thinking.upper(),
            },
            "responseModalities": ["IMAGE", "TEXT"],
            "imageConfig": image_config,
        },
    }
    if use_search:
        payload["tools"] = [
            {"googleSearch": {"searchTypes": {"webSearch": {}, "imageSearch": {}}}}
        ]

    url = f"{base_url.rstrip('/')}/v1beta/models/{model}:generateContent"
    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=180) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")[:300]
        raise RuntimeError(f"AIStudio HTTP {e.code}: {body}") from e
    except Exception as e:
        raise RuntimeError(f"AIStudio request failed: {e}") from e

    if isinstance(res_json, dict) and res_json.get("error"):
        err_msg = res_json["error"]
        if isinstance(err_msg, dict):
            err_msg = err_msg.get("message") or json.dumps(err_msg)
        raise RuntimeError(f"AIStudio JSON error: {str(err_msg)[:300]}")

    for cand in res_json.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            if part.get("thought"):
                continue
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and inline.get("data"):
                return inline["data"], inline.get("mimeType") or inline.get("mime_type") or "image/jpeg"

    raise RuntimeError("AIStudio returned no image data")


def generate_via_9router(
    prompt: str,
    ref_image: str | None = None,
    model: str = FALLBACK_MODEL,
    api_key: str = ROUTER_API_KEY,
    router_url: str = ROUTER_URL,
) -> tuple[str, str]:
    """Return (b64_image, mime_type) via 9Router (/v1/chat/completions lalu /v1/images/generations)."""
    data_uri = None
    if ref_image:
        if ref_image.startswith("http"):
            data_uri = ref_image
        else:
            _, _, data_uri = load_reference_image(ref_image)

    # 1. /v1/chat/completions
    content_parts = [{"type": "text", "text": prompt}]
    if data_uri:
        content_parts.append({"type": "image_url", "image_url": {"url": data_uri}})

    chat_payload = {
        "model": model,
        "stream": False,
        "messages": [{"role": "user", "content": content_parts}],
    }
    try:
        req = request.Request(
            f"{router_url.rstrip('/')}/v1/chat/completions",
            data=json.dumps(chat_payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
            method="POST",
        )
        with request.urlopen(req, timeout=120) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            content = res_json["choices"][0]["message"].get("content", "")
            match = re.search(r"data:(image/[^;]+);base64,([A-Za-z0-9+/=]+)", content)
            if match:
                return match.group(2), match.group(1)
    except Exception:
        pass

    # 2. /v1/images/generations
    gen_payload = {
        "model": model,
        "prompt": prompt,
        "n": 1,
        "output_format": "png",
    }
    if data_uri:
        gen_payload["image"] = data_uri

    try:
        req = request.Request(
            f"{router_url.rstrip('/')}/v1/images/generations",
            data=json.dumps(gen_payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
            method="POST",
        )
        with request.urlopen(req, timeout=120) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            data = res_json.get("data", [])
            if data and data[0].get("b64_json"):
                return data[0]["b64_json"], "image/png"
    except Exception as e:
        raise RuntimeError(f"9Router fallback failed: {e}") from e

    raise RuntimeError("9Router returned no image data")


def generate_image(
    prompt: str,
    ratio: str = "auto",
    ref_image: str | None = None,
    output_path: str | None = None,
    model: str | None = None,
    size: str = "4K",
    thinking: str = "high",
    provider: str = "auto",
    use_search: bool = True,
    api_key: str | None = None,
    router_url: str | None = None,
) -> dict:
    # Auto-detect explicit 9Router prefixed model (ag/... or ais/...)
    if model and (model.startswith(("ag/", "ais/")) or "/" in model) and provider == "auto":
        provider = "9router"

    b64_img = None
    mime_type = "image/jpeg"
    provider_used = None
    model_used = None
    fallback_reason = None

    if provider in ("auto", "aistudio"):
        target_ai_model = model or AISTUDIO_MODEL
        try:
            b64_img, mime_type = generate_via_aistudio(
                prompt=prompt,
                ratio=ratio,
                size=size,
                thinking=thinking,
                use_search=use_search,
                ref_image=ref_image,
                model=target_ai_model,
                api_key=api_key or AISTUDIO_API_KEY,
                base_url=AISTUDIO_URL,
            )
            provider_used = "aistudio2api"
            model_used = target_ai_model
        except Exception as e:
            if provider == "aistudio":
                raise
            fallback_reason = str(e)

    if b64_img is None:
        target_router_model = model if (model and "/" in model) else FALLBACK_MODEL
        b64_img, mime_type = generate_via_9router(
            prompt=prompt,
            ref_image=ref_image,
            model=target_router_model,
            api_key=api_key or ROUTER_API_KEY,
            router_url=router_url or ROUTER_URL,
        )
        provider_used = "9router-fallback" if fallback_reason else "9router"
        model_used = target_router_model

    ratio_clean = ratio.replace(":", "x").strip().lower()
    if not output_path:
        ext = mime_to_ext(mime_type)
        output_path = f"generated_{int(time.time())}_{ratio_clean}{ext}"

    save_path = Path(output_path).expanduser().resolve()
    save_path.parent.mkdir(parents=True, exist_ok=True)
    save_path.write_bytes(base64.b64decode(b64_img))

    # Anti-Downscale 4K: crop_to_ratio() HANYA saat provider_used == "9router-fallback" (atau 9router)
    if provider_used == "9router-fallback" or provider_used == "9router":
        crop_to_ratio(save_path, ratio)

    return {
        "success": True,
        "output_path": str(save_path),
        "file_size_bytes": save_path.stat().st_size,
        "provider_used": provider_used,
        "model_used": model_used,
        "fallback_reason": fallback_reason,
        "ratio": ratio_clean,
        "size": size.upper() if provider_used == "aistudio2api" else "1K",
        "thinking": thinking if provider_used == "aistudio2api" else "default",
        "prompt": prompt,
    }


def main():
    parser = argparse.ArgumentParser(description="Generate AI images: Primary AIStudio2API 4K -> Fallback 9Router")
    parser.add_argument("prompt", help="Text prompt for image generation")
    parser.add_argument(
        "-r",
        "--ratio",
        default="auto",
        choices=["auto", "1:1", "3:4", "4:3", "9:16", "16:9", "2:3", "3:2", "4:5", "21:9"],
        help="Aspect ratio (default: auto)",
    )
    parser.add_argument("-s", "--size", default="4K", choices=["1K", "2K", "4K"], help="Resolution for AIStudio2API (default: 4K)")
    parser.add_argument("--thinking", default="high", choices=["minimal", "medium", "high"], help="Thinking level for AIStudio2API (default: high)")
    parser.add_argument("--provider", default="auto", choices=["auto", "aistudio", "9router"], help="Provider routing mode (default: auto)")
    parser.add_argument("--no-search", action="store_true", help="Disable Google Web & Image Search grounding on AIStudio2API")
    parser.add_argument("-i", "--image", dest="ref_image", default=None, help="Path to reference image (Image-to-Image)")
    parser.add_argument("-o", "--output", default=None, help="Output file path")
    parser.add_argument(
        "-m",
        "--model",
        default=None,
        help="Override model (default: gemini-nano-banana-2.1 on AIStudio, ag/gemini-3.1-flash-image on 9Router)",
    )
    parser.add_argument("--json", action="store_true", help="Output result as JSON")

    args = parser.parse_args()
    try:
        res = generate_image(
            prompt=args.prompt,
            ratio=args.ratio,
            ref_image=args.ref_image,
            output_path=args.output,
            model=args.model,
            size=args.size,
            thinking=args.thinking,
            provider=args.provider,
            use_search=not args.no_search,
        )
        if args.json:
            print(json.dumps(res, indent=2))
        else:
            if res["fallback_reason"]:
                print(f"⚠️ AIStudio2API limit/error ({res['fallback_reason']}), switched to 9Router fallback.")
            print(f"✅ Gambar berhasil dibuat: {res['output_path']}")
            print(
                f"⚙️ Provider: {res['provider_used']} | Model: {res['model_used']} | Size: {res['size']} | Rasio: {res['ratio']} | File: {res['file_size_bytes'] / 1024:.1f} KB"
            )
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
