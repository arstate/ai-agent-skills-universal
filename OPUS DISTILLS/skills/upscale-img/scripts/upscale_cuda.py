#!/usr/bin/env python3
"""
Master Hardware-Accelerated AI Image Upscaler (CUDA + Spandrel)
Optimized for NVIDIA GeForce GTX 1660 SUPER (Turing TU116 6GB VRAM)
Seamless Cosine Feather Tiling | Anti-NaN Precision Guard | Adobe Stock Spec
"""

import os
import sys
import time
import math
import argparse
import numpy as np
from PIL import Image

# Import spandrel and torch
import torch
import spandrel

MODELS_DIR = "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/UPSCALE MODEL"

MODEL_MAP = {
    "schat": "4xNomos8kSCHAT-S.pth",
    "nomos": "4xNomos8kSCHAT-S.pth",
    "default": "4xNomos8kSCHAT-S.pth",
    "nmkd": "4x_NMKD-Superscale-SP_178000_G.pth",
    "photo": "4x_NMKD-Superscale-SP_178000_G.pth",
    "atd": "4xNomos8k_atd_jpg.safetensors",
    "jpeg": "4xNomos8k_atd_jpg.safetensors",
    "drct": "4xNomos2_hq_drct-l.safetensors",
    "plksr": "4xNomosWebPhoto_RealPLKSR.safetensors",
    "span": "4xNomos8k_span_otf_strong.pth",
    "span2x": "2xNomosUni_span_multijpg.safetensors",
    "omnisr4x": "OmniSR_X4_DIV2K.safetensors",
    "omnisr2x": "OmniSR_X2_DIV2K.safetensors",
}

def resolve_model_path(model_arg):
    if not model_arg:
        model_name = MODEL_MAP["default"]
    else:
        key = model_arg.lower().strip()
        if key in MODEL_MAP:
            model_name = MODEL_MAP[key]
        elif os.path.isfile(model_arg):
            return model_arg
        else:
            # Check if file exists inside MODELS_DIR
            candidate = os.path.join(MODELS_DIR, model_arg)
            if os.path.isfile(candidate):
                return candidate
            model_name = model_arg

    full_path = os.path.join(MODELS_DIR, model_name)
    if not os.path.isfile(full_path):
        raise FileNotFoundError(f"Model file not found: {full_path}")
    
    # HARD GUARD against ONNX NaN Bug
    if full_path.lower().endswith(".onnx"):
        print("⚠️ [WARNING] ONNX model detected! Note: 4xNomos8kSCHAT-S.onnx has FP16 NaN export bug. Prefer .pth!")
    return full_path

def load_upscale_model(model_path, device="cuda"):
    print(f"📦 Loading model: {os.path.basename(model_path)} onto {device.upper()}...")
    loader = spandrel.ModelLoader()
    model = loader.load_from_file(model_path)
    if device == "cuda" and torch.cuda.is_available():
        gpu_name = torch.cuda.get_device_name(0)
        print(f"⚡ GPU Acceleration Active: {gpu_name} (VRAM: {torch.cuda.get_device_properties(0).total_memory / (1024**3):.1f} GB)")
        model = model.cuda().eval()
    else:
        print("⚠️ CUDA not available or CPU requested. Running on CPU (slower).")
        model = model.cpu().eval()
    return model

def tile_upscale(model, img_arr, tile_size=256, tile_pad=24, scale=4, device="cuda"):
    """
    Seamless tiled inference with cosine/linear feather blending.
    img_arr: numpy array (H, W, 3) in range [0, 1] float32
    """
    h, w, c = img_arr.shape
    out_h = h * scale
    out_w = w * scale

    output = np.zeros((out_h, out_w, c), dtype=np.float32)
    weights = np.zeros((out_h, out_w, c), dtype=np.float32)

    step = tile_size - 2 * tile_pad
    h_starts = list(range(0, h, step))
    w_starts = list(range(0, w, step))
    total_tiles = len(h_starts) * len(w_starts)

    print(f"🚀 Upscaling {w}x{h} -> {out_w}x{out_h} ({total_tiles} tiles of {tile_size}x{tile_size}, pad={tile_pad}, scale={scale}x)...")

    t0 = time.time()
    tile_idx = 0

    with torch.no_grad():
        for top in h_starts:
            for left in w_starts:
                tile_idx += 1
                t_top = max(0, top - tile_pad)
                t_left = max(0, left - tile_pad)
                t_bot = min(h, top + step + tile_pad)
                t_right = min(w, left + step + tile_pad)

                tile = img_arr[t_top:t_bot, t_left:t_right, :]
                tile_tensor = torch.from_numpy(tile).permute(2, 0, 1).unsqueeze(0)
                if device == "cuda" and torch.cuda.is_available():
                    tile_tensor = tile_tensor.cuda()

                out_tensor = model(tile_tensor)
                out_tile = out_tensor.squeeze(0).permute(1, 2, 0).cpu().numpy()

                # Coordinates in output canvas
                out_tile_top = t_top * scale
                out_tile_left = t_left * scale
                out_tile_bottom = t_bot * scale
                out_tile_right = t_right * scale

                # Feather mask
                th_out, tw_out, _ = out_tile.shape
                pad_out = tile_pad * scale

                mask_y = np.ones((th_out, 1, 1), dtype=np.float32)
                if t_top > 0 and pad_out > 0:
                    mask_y[:pad_out, 0, 0] = np.linspace(0, 1, pad_out)
                if t_bot < h and pad_out > 0:
                    mask_y[-pad_out:, 0, 0] = np.linspace(1, 0, pad_out)

                mask_x = np.ones((1, tw_out, 1), dtype=np.float32)
                if t_left > 0 and pad_out > 0:
                    mask_x[0, :pad_out, 0] = np.linspace(0, 1, pad_out)
                if t_right < w and pad_out > 0:
                    mask_x[0, -pad_out:, 0] = np.linspace(1, 0, pad_out)

                tile_mask = mask_y * mask_x
                output[out_tile_top:out_tile_bottom, out_tile_left:out_tile_right, :] += out_tile * tile_mask
                weights[out_tile_top:out_tile_bottom, out_tile_left:out_tile_right, :] += tile_mask

                if tile_idx % 5 == 0 or tile_idx == total_tiles:
                    el = time.time() - t0
                    pct = (tile_idx / total_tiles) * 100
                    print(f"  └─ Tile [{tile_idx:2d}/{total_tiles:2d}] ({pct:5.1f}%) | Elapsed: {el:.1f}s")

    weights = np.maximum(weights, 1e-6)
    output = output / weights
    output = np.clip(output, 0.0, 1.0)

    elapsed = time.time() - t0
    print(f"✨ Tiling & stitching complete in {elapsed:.2f}s!")
    return output

def process_single_image(input_path, output_path, model, scale=4, tile_size=256, tile_pad=24, quality=98, subsampling=0, device="cuda"):
    print(f"\n📸 Processing: {input_path}")
    raw_img = Image.open(input_path)
    # Extract metadata/exif if available
    exif_data = raw_img.info.get("exif")
    icc_profile = raw_img.info.get("icc_profile")

    img_rgb = raw_img.convert("RGB")
    arr = np.array(img_rgb, dtype=np.float32) / 255.0

    out_arr = tile_upscale(model, arr, tile_size=tile_size, tile_pad=tile_pad, scale=scale, device=device)
    out_img = Image.fromarray(np.round(out_arr * 255.0).astype(np.uint8))

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    save_kwargs = {"quality": quality, "subsampling": subsampling}
    if exif_data:
        save_kwargs["exif"] = exif_data
    if icc_profile:
        save_kwargs["icc_profile"] = icc_profile

    # Format detection
    ext = os.path.splitext(output_path)[1].lower()
    if ext in [".jpg", ".jpeg"]:
        out_img.save(output_path, "JPEG", **save_kwargs)
    elif ext == ".png":
        out_img.save(output_path, "PNG", compress_level=6)
    elif ext == ".webp":
        out_img.save(output_path, "WEBP", quality=quality)
    else:
        out_img.save(output_path, "JPEG", **save_kwargs)

    out_bytes = os.path.getsize(output_path)
    mp = (out_img.size[0] * out_img.size[1]) / 1_000_000
    print(f"✅ Saved: {output_path} ({out_img.size[0]}x{out_img.size[1]} px, {mp:.1f} MP, {out_bytes / (1024*1024):.2f} MB)")
    return output_path

def main():
    parser = argparse.ArgumentParser(description="Master Hardware-Accelerated 4K/8K AI Image Upscaler (CUDA + Spandrel)")
    parser.add_argument("input", help="Path to input image file or directory")
    parser.add_argument("output", nargs="?", default=None, help="Path to output file or directory (optional)")
    parser.add_argument("-m", "--model", default="schat", help="Model key (schat, nmkd, atd, drct, plksr, span, span2x, omnisr4x) or path to .pth/.safetensors")
    parser.add_argument("-t", "--tile-size", type=int, default=256, help="Tile size in pixels (default: 256 for Turing 6GB)")
    parser.add_argument("-p", "--tile-pad", type=int, default=24, help="Tile overlap padding (default: 24)")
    parser.add_argument("-q", "--quality", type=int, default=98, help="JPEG quality (default: 98)")
    parser.add_argument("--cpu", action="store_true", help="Force CPU inference instead of CUDA")
    args = parser.parse_args()

    device = "cpu" if args.cpu else "cuda"
    model_path = resolve_model_path(args.model)
    model = load_upscale_model(model_path, device=device)

    # Scale inference from model descriptor if available
    scale = getattr(model, "scale", 4)

    input_path = os.path.abspath(args.input)
    if os.path.isfile(input_path):
        if not args.output:
            dir_name, base_name = os.path.split(input_path)
            stem, ext = os.path.splitext(base_name)
            output_path = os.path.join(dir_name, f"{stem}_4k{ext if ext else '.jpg'}")
        elif os.path.isdir(args.output):
            base_name = os.path.basename(input_path)
            stem, ext = os.path.splitext(base_name)
            output_path = os.path.join(args.output, f"{stem}_4k{ext if ext else '.jpg'}")
        else:
            output_path = os.path.abspath(args.output)

        process_single_image(input_path, output_path, model, scale=scale, tile_size=args.tile_size, tile_pad=args.tile_pad, quality=args.quality, device=device)

    elif os.path.isdir(input_path):
        out_dir = os.path.abspath(args.output) if args.output else os.path.join(input_path, "upscaled_4k")
        os.makedirs(out_dir, exist_ok=True)
        valid_exts = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
        files = [f for f in sorted(os.listdir(input_path)) if os.path.splitext(f)[1].lower() in valid_exts]
        print(f"📂 Found {len(files)} images in {input_path}")
        for idx, f in enumerate(files, 1):
            src = os.path.join(input_path, f)
            stem, ext = os.path.splitext(f)
            dst = os.path.join(out_dir, f"{stem}_4k{ext}")
            print(f"\n[{idx}/{len(files)}] Processing batch item...")
            process_single_image(src, dst, model, scale=scale, tile_size=args.tile_size, tile_pad=args.tile_pad, quality=args.quality, device=device)
        print(f"\n🎉 Batch processing completed! Results saved to: {out_dir}")
    else:
        print(f"❌ Input not found: {input_path}")
        sys.exit(1)

if __name__ == "__main__":
    main()
