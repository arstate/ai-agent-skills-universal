#!/usr/bin/env python3
"""Jev Strategic Decision & Anti-Yes-Man Evaluator CLI.
Runs quantitative System-One evaluation against user requests using Jev (port 8765) or local in-process engine.
"""
import os
import sys
import json
import urllib.request
import urllib.error
import time

SCRUTINY_QUESTIONS = {
    "scrutiny_evaluation": {
        "type": "choice",
        "instructions": "Evaluate the user proposal from an aggressive Co-Founder & Lead Architect perspective:",
        "criteria": {
            "ACCEPT": "The proposal is safe, profitable, margin > 75%, highly convertible, and data is complete.",
            "CHALLENGE_AND_COUNTER": "The proposal is wasteful, risks server quota overage, ad budget burn, poor UX, or team burnout. Reject openly and propose a sharper alternative.",
            "HALT_AND_ASK": "Critical business data (WA number, pricing, credentials, address) is missing. Stop guessing immediately."
        }
    },
    "primary_risk": {
        "type": "choice",
        "instructions": "What is the primary risk if this proposal is executed blindly?",
        "criteria": {
            "financial_bleed": "High ad cost, low margin (< 75%), or wasteful architecture",
            "server_overage": "Risk of exceeding Vercel/Firebase/Cloudinary free tier quotas",
            "team_burnout": "Unrealistic workload or workflow bottleneck",
            "conversion_drop": "Cluttered design, confusing UX, or meta-jargon leak",
            "missing_data": "Unstated contact numbers, prices, or API credentials",
            "none": "Proposal is solid and ready to build"
        }
    },
    "risk_score": {
        "type": "score",
        "instructions": "Rate the overall business/technical risk from 1.0 (minimal) to 5.0 (catastrophic):",
        "criteria": [
            "Extremely safe, proven, and cost-efficient",
            "Low risk, minor tweaks recommended",
            "Moderate risk, requires careful planning",
            "High risk, likely to cause budget waste or user frustration",
            "Catastrophic failure, guaranteed money loss or severe bug"
        ]
    }
}

def query_jev_http(prompt: str, host: str = "127.0.0.1", port: int = 8765) -> dict:
    url = f"http://{host}:{port}/v1/systemone"
    payload = {
        "state": prompt,
        "model": "nli-deberta-large",
        "questions": SCRUTINY_QUESTIONS
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))

def evaluate_proposal(prompt: str) -> dict:
    t0 = time.time()
    try:
        raw_res = query_jev_http(prompt)
        mode = "http_service"
    except Exception as e:
        # Fallback to direct CLI or mock evaluation if server offline
        mode = "heuristic_fallback"
        raw_res = {
            "answers": {
                "scrutiny_evaluation": {"choice": "CHALLENGE_AND_COUNTER" if "langsung" in prompt.lower() or "karang" in prompt.lower() else "ACCEPT", "confidence": 0.8},
                "primary_risk": {"choice": "missing_data" if "karang" in prompt.lower() else ("server_overage" if "fullstack" in prompt.lower() else "none"), "confidence": 0.8},
                "complexity": {"score": 3.0}
            }
        }
    latency_ms = (time.time() - t0) * 1000.0

    answers = raw_res.get("answers", {})
    eval_choice = answers.get("scrutiny_evaluation", {}).get("choice", "ACCEPT")
    eval_conf = answers.get("scrutiny_evaluation", {}).get("confidence", 0.7)
    risk_choice = answers.get("primary_risk", {}).get("choice", "none")
    risk_score = round(answers.get("risk_score", {}).get("score", 1.5), 2)

    return {
        "prompt": prompt,
        "action": eval_choice,
        "confidence": eval_conf,
        "primary_risk": risk_choice,
        "risk_score": risk_score,
        "mode": mode,
        "latency_ms": round(latency_ms, 1)
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 jev_decision_evaluator.py \"prompt to evaluate\" [--json]")
        sys.exit(1)

    json_mode = "--json" in sys.argv
    prompt = " ".join([arg for arg in sys.argv[1:] if arg != "--json"])

    res = evaluate_proposal(prompt)

    if json_mode:
        print(json.dumps(res, indent=2))
        return

    print("=== 🛡️ Anti-Yes-Man & Jev Decision Evaluation ===")
    print(f"🎯 Action:      {res['action']}")
    print(f"⚠️  Risk Type:   {res['primary_risk']} (Score: {res['risk_score']}/5.0)")
    print(f"🔒 Confidence:  {round(res['confidence'] * 100, 1)}% | Latency: {res['latency_ms']} ms ({res['mode']})")
    if res['action'] == "CHALLENGE_AND_COUNTER":
        print("💡 Directive:   Tolak ide ini secara terbuka dan berikan 1 alternatif lebih tajam!")
    elif res['action'] == "HALT_AND_ASK":
        print("💡 Directive:   Stop ngoding/generate! Tanyakan data spesifik yang hilang ke user.")
    else:
        print("💡 Directive:   Usulan aman dan efisien. Lanjutkan eksekusi.")

if __name__ == "__main__":
    main()
