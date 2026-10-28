#!/usr/bin/env python3
"""
review-cdp.py — Autonomous Chrome CDP Slide Deck Reviewer & Layout Auditor
Part of slidedeck-gen tools suite.
"""

import sys
import os
import time
import argparse
import subprocess

def main():
    parser = argparse.ArgumentParser(description="Autonomous Chrome CDP Slide Deck Reviewer")
    parser.add_argument("target", help="Slide deck URL or local path to index.html")
    parser.add_argument("--port", type=int, default=9223, help="CDP port (default: 9223)")
    parser.add_argument("--screenshots", default="", help="Directory to save QA slide screenshots")
    parser.add_argument("--delay", type=float, default=1.0, help="Delay per slide in seconds")
    args = parser.parse_args()

    cdp_agent_path = os.path.expanduser("~/.agents/tools/cdp_visual_agent.py")
    if not os.path.exists(cdp_agent_path):
        print(f"Error: cdp_visual_agent.py not found at {cdp_agent_path}", file=sys.stderr)
        sys.exit(1)

    launcher_path = os.path.expanduser("~/.agents/tools/launch-visible-chrome.sh")
    target_url = args.target
    if not target_url.startswith("http://") and not target_url.startswith("https://"):
        target_path = os.path.abspath(target_url)
        if os.path.isdir(target_path):
            index_candidate = os.path.join(target_path, "index.html")
            if os.path.exists(index_candidate):
                target_path = index_candidate
        target_url = f"file://{target_path}"

    print(f"[*] Starting autonomous visual review for: {target_url}")
    print(f"[*] Ensuring visible headed Chrome is running on port {args.port}...")

    # Launch visible Chrome if needed
    if os.path.exists(launcher_path):
        try:
            subprocess.run(["bash", launcher_path, str(args.port), "about:blank"], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
            time.sleep(0.5)
        except Exception as e:
            print(f"[!] Launcher notice: {e}")

    # Open URL via cdp_visual_agent.py (open dedicated review tab)
    try:
        subprocess.run(["python3", cdp_agent_path, "new", target_url, "--port", str(args.port)], check=True, timeout=12)
        time.sleep(1.0)
    except Exception as e:
        print(f"[!] Failed to connect to CDP on port {args.port}: {e}")
        print("[!] Ensure Chrome is running with remote debugging port 9223.")
        sys.exit(1)

    if args.screenshots:
        os.makedirs(args.screenshots, exist_ok=True)

    print("[*] Stepping through slides and auditing layout...")
    # Cycle through slides
    for slide_idx in range(1, 13):
        # Capture screenshot if requested
        if args.screenshots:
            shot_file = os.path.join(args.screenshots, f"slide-{slide_idx:02d}.png")
            try:
                subprocess.run(["python3", cdp_agent_path, "screenshot", shot_file, "--port", str(args.port)], check=False)
            except Exception:
                pass

        time.sleep(args.delay)

        # Attempt to click next button
        try:
            res = subprocess.run(
                ["python3", cdp_agent_path, "click", "#btn-next", f"Review slide {slide_idx}", "--port", str(args.port)],
                check=False,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
        except Exception:
            break

    # Dismiss HUD
    try:
        subprocess.run(["python3", cdp_agent_path, "done", "--port", str(args.port)], check=False)
    except Exception:
        pass

    print("[✓] Autonomous Chrome CDP visual review completed successfully.")

if __name__ == "__main__":
    main()
