#!/usr/bin/env python3
"""
Gemini 3.8 Flash TTS Router & Audio Player
Universal Multi-Agent Voiceover & Speech Synthesis Engine
Default Speaker: Koda | Expression Style: Friendly | Temperature: 1.1
Mastering: EBU R128 (-16 LUFS, TP -1.5 dB, 48 kHz broadcast audio)
"""

import os
import sys
import json
import base64
import argparse
import subprocess
import requests

SEARCH_CONFIG_PATHS = [
    os.path.join(os.path.dirname(os.path.realpath(__file__)), "config.json"),
    os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "config.json"),
    os.path.expanduser("~/.gemini/config/skills/tts-gen/config.json"),
    os.path.expanduser("~/.agents/skills/tts-gen/config.json"),
    os.path.expanduser("~/.gemini/antigravity-cli/skills/tts-gen/config.json"),
    os.path.expanduser("~/.gemini/antigravity/skills/tts-gen/config.json"),
    "/mnt/HDD-2/BACKUP LINUX/FILE DATA/TIAR.PROPERTY/BAHAN POSTINGAN/AI AGENT EDITOR/GEMINI_TTS_ROUTER/config.json",
    "/mnt/HDD-2/BACKUP LINUX/FILE DATA/AI AGENT SKILLS/OPUS DISTILLS/skills/tts-gen/config.json",
]

VOICE_PROFILES = {
    "Koda": "Pria, modern, natural, confident, sangat luwes untuk voiceover reels & TikTok (Default).",
    "Ludo": "Pria, tenang, jelas, low pitch, ramah, cocok untuk narasi edukasi & konsultatif.",
    "Aoede": "Wanita, hangat, artikulatif, elegan, cocok untuk properti mewah & corporate voiceover.",
    "Kore": "Wanita, santai, natural, bersahabat, cocok untuk gaya bicara kasual & UGC.",
    "Puck": "Pria, energik, bersemangat, punchy, cocok untuk hook cepat & video promo dinamis.",
    "Charon": "Pria, berat, wibawa tinggi, formal, cocok untuk pengumuman resmi & otoritas.",
    "Fenrir": "Pria, tegas, dalam, dramatis, cocok untuk hook paradoks & penekanan fakta penting."
}

def load_config():
    for p in SEARCH_CONFIG_PATHS:
        if os.path.exists(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                continue

    env_key = os.environ.get("GEMINI_API_KEY")
    if env_key:
        return {
            "model": "gemini-3.8-flash-tts",
            "default_voice": "Koda",
            "default_style": "Friendly",
            "temperature": 1.1,
            "api_keys": [env_key],
            "available_voices": list(VOICE_PROFILES.keys())
        }

    raise FileNotFoundError("Configuration file not found. Place config.json in tts-gen folder or set GEMINI_API_KEY.")

def generate_speech(text, voice_name=None, style_name=None, temperature=None, output_path=None, play=True, volume=105):
    config = load_config()
    models = [
        config.get("model", "gemini-3.8-flash-tts"),
        "gemini-3.8-flash-lite-tts"
    ]
    voice = voice_name or config.get("default_voice", "Koda")
    style = style_name if style_name is not None else config.get("default_style", "Friendly")
    temp = float(temperature if temperature is not None else config.get("temperature", 1.1))
    api_keys = config.get("api_keys", [])

    if not api_keys:
        raise ValueError("No API keys found in config.json or environment")

    # Format text with style tag if specified (e.g. <Friendly> text)
    formatted_text = text.strip()
    if style and not formatted_text.startswith("<"):
        formatted_text = f"<{style}> {formatted_text}"

    last_error = None
    audio_bytes = None

    for m in models:
        for idx, key in enumerate(api_keys):
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
            payload = {
                "contents": [{"parts": [{"text": formatted_text}]}],
                "generationConfig": {
                    "temperature": temp,
                    "response_modalities": ["AUDIO"],
                    "speech_config": {
                        "voice_config": {
                            "prebuilt_voice_config": {
                                "voice_name": voice
                            }
                        }
                    }
                }
            }

            try:
                resp = requests.post(url, json=payload, timeout=20)
                if resp.status_code == 200:
                    data = resp.json()
                    cand = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
                    audio_bytes = base64.b64decode(cand)
                    break
                elif resp.status_code == 429:
                    continue
                else:
                    last_error = f"HTTP {resp.status_code}: {resp.text[:120]}"
                    continue
            except Exception as e:
                last_error = str(e)
                continue
        if audio_bytes:
            break

    target_file = output_path or f"/tmp/tts_gen_{voice.lower()}_{os.getpid()}.wav"
    is_mp3 = target_file.lower().endswith(".mp3")

    if audio_bytes:
        raw_file = f"/tmp/tts_raw_{os.getpid()}.wav"
        with open(raw_file, "wb") as f:
            f.write(audio_bytes)

        # Standard comfortable broadcast loudness (EBU R128 loudnorm: -16 LUFS, True Peak -1.5 dB, 48kHz)
        boost_cmd = [
            "ffmpeg", "-y", "-i", raw_file,
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000"
        ]
        if is_mp3:
            boost_cmd.extend(["-c:a", "libmp3lame", "-b:a", "192k"])
        else:
            boost_cmd.extend(["-c:a", "pcm_s16le"])
        boost_cmd.append(target_file)

        subprocess.run(boost_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if not os.path.exists(target_file):
            with open(target_file, "wb") as f:
                f.write(audio_bytes)

        if os.path.exists(raw_file):
            try:
                os.remove(raw_file)
            except OSError:
                pass
    else:
        # Graceful fallback: Edge-TTS
        edge_voice = "id-ID-ArdiNeural" if voice in ["Koda", "Ludo", "Puck", "Charon", "Fenrir"] else "id-ID-GadisNeural"
        edge_cmd = [
            "uvx", "edge-tts", "--voice", edge_voice,
            "--text", text, "--write-media", target_file
        ]
        res = subprocess.run(edge_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if res.returncode != 0 or not os.path.exists(target_file):
            raise RuntimeError(f"All Gemini models and Edge-TTS fallback failed. Last error: {last_error}")

    if play:
        if subprocess.run(["which", "mpv"], capture_output=True).returncode == 0:
            subprocess.run(["mpv", "--no-video", f"--volume={volume}", target_file], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        elif subprocess.run(["which", "ffplay"], capture_output=True).returncode == 0:
            subprocess.run(["ffplay", "-nodisp", "-autoexit", "-volume", str(int(volume * 0.7)), target_file], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return target_file

def main():
    parser = argparse.ArgumentParser(description="Gemini 3.8 Flash TTS Voiceover & Speech Synthesis Engine")
    parser.add_argument("text", nargs="?", default=None, help="Text to speak")
    parser.add_argument("-v", "--voice", default=None, help="Voice name (default: Koda)")
    parser.add_argument("-s", "--style", default=None, help="Expression style: Friendly, Professional, Enthusiastic, Calm, Dramatic")
    parser.add_argument("-t", "--temperature", type=float, default=None, help="Temperature (default: 1.1)")
    parser.add_argument("-o", "--output", default=None, help="Save audio to file path (.wav or .mp3)")
    parser.add_argument("--volume", type=int, default=105, help="Playback volume (default: 105)")
    parser.add_argument("--no-play", action="store_true", help="Do not play audio automatically")
    parser.add_argument("--list-voices", action="store_true", help="List available voice personas and descriptions")

    args = parser.parse_args()

    if args.list_voices:
        print("🎙️ Available Gemini Flash TTS Voices:")
        for name, desc in VOICE_PROFILES.items():
            print(f"  • {name:<8} : {desc}")
        sys.exit(0)

    if not args.text:
        parser.print_help()
        sys.exit(1)

    try:
        saved_path = generate_speech(
            args.text,
            voice_name=args.voice,
            style_name=args.style,
            temperature=args.temperature,
            output_path=args.output,
            play=not args.no_play,
            volume=args.volume
        )
        print(f"SUCCESS: {saved_path}")
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
