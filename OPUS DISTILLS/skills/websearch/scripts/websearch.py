#!/usr/bin/env python3
"""
Web Search & URL Fetch CLI & Module for Antigravity Ecosystem.
Integrates with local 9router Google Grounding Search API (port 20128) and Jina Reader / Direct Fetch.
"""

import sys
import json
import argparse
import urllib.request
import urllib.error

SEARCH_ENDPOINT = "http://localhost:20128/v1/search"
DEFAULT_API_KEY = "sk-47024d86a10c3a4b-2att59-c53bbf8a"

def search_web(query, max_results=5, model="ag", api_key=DEFAULT_API_KEY, timeout=30):
    payload = json.dumps({
        "model": model,
        "query": query,
        "search_type": "web",
        "max_results": max_results
    }).encode("utf-8")
    
    req = urllib.request.Request(
        SEARCH_ENDPOINT,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.URLError as e:
        return {
            "error": f"Failed to connect to search service on {SEARCH_ENDPOINT}: {e}",
            "results": [],
            "answer": None
        }

def fetch_url(url, timeout=20):
    import subprocess
    jina_url = f"https://r.jina.ai/{url}"
    try:
        proc = subprocess.run(
            ["curl", "-sL", "--max-time", str(timeout), jina_url],
            capture_output=True,
            text=True,
            check=True
        )
        if proc.stdout and not proc.stdout.strip().startswith("403 Forbidden"):
            return proc.stdout
    except Exception:
        pass

    # Fallback to direct fetch via curl
    try:
        proc = subprocess.run(
            ["curl", "-sL", "--max-time", str(timeout), url],
            capture_output=True,
            text=True,
            check=True
        )
        return proc.stdout
    except Exception as e:
        return f"Error fetching URL: {e}"

def format_search_results(data):
    lines = []
    answer = data.get("answer", {})
    if answer and answer.get("text"):
        lines.append("## 💡 Ringkasan Jawaban:")
        lines.append(answer["text"].strip())
        lines.append("")
    
    results = data.get("results", [])
    if results:
        lines.append(f"## 🌐 Hasil Penelusuran ({len(results)} sumber):")
        for i, item in enumerate(results, 1):
            title = item.get("title") or "Tanpa Judul"
            url = item.get("url") or "#"
            snippet = item.get("snippet") or ""
            lines.append(f"{i}. [{title}]({url})")
            if snippet:
                lines.append(f"   _{snippet.strip()}_")
            lines.append("")
    else:
        lines.append("Tidak ada hasil penelusuran yang ditemukan.")
    
    return "\n".join(lines)

def main():
    parser = argparse.ArgumentParser(
        description="CLI Websearch & URL Fetch via Antigravity Grounding Router (port 20128)"
    )
    parser.add_argument("query", nargs="*", help="Kata kunci pencarian atau URL")
    parser.add_argument("-n", "--max-results", type=int, default=5, help="Jumlah hasil pencarian maksimal (default: 5)")
    parser.add_argument("-m", "--model", default="ag", help="Model provider di 9router (default: ag)")
    parser.add_argument("-f", "--fetch", help="Ambil dan parse konten web dari URL tertentu ke Markdown")
    parser.add_argument("--json", action="store_true", help="Output format raw JSON")
    
    args = parser.parse_args()
    
    if args.fetch:
        content = fetch_url(args.fetch)
        if args.json:
            print(json.dumps({"url": args.fetch, "content": content}, indent=2, ensure_ascii=False))
        else:
            print(content)
        return

    query_str = " ".join(args.query).strip()
    if not query_str:
        parser.print_help()
        sys.exit(1)
    
    # Auto-detect if query is just a URL
    if query_str.startswith("http://") or query_str.startswith("https://"):
        content = fetch_url(query_str)
        if args.json:
            print(json.dumps({"url": query_str, "content": content}, indent=2, ensure_ascii=False))
        else:
            print(content)
        return

    data = search_web(query_str, max_results=args.max_results, model=args.model)
    
    if args.json:
        print(json.dumps(data, indent=2, ensure_ascii=False))
    else:
        print(format_search_results(data))

if __name__ == "__main__":
    main()
