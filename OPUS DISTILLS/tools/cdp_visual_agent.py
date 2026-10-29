#!/usr/bin/env python3
"""
cdp_visual_agent.py — Ultra-Fast Zero-Dependency Chrome Automation CLI over raw WebSocket CDP.
Engineered with sub-millisecond execution patterns from arstate/browser-agent:
- Native Tab Management: list open tabs (`tabs`), switch active tab (`switch`), create tab (`new`), close tab (`close`)
- Rich Data Extraction:
  * Table extraction (`table`, `extract_table`) with virtual grid auto-scrolling
  * Clean content/article extraction (`extract`, `content`, `markdown`)
  * Deep research dossier extraction (`research`, `deep_research`)
  * Fast Button & Clickable scanner (`buttons`, `btn`)
- Multi-Pass Anti-Miss Resolution for clicks and inputs.
- Hybrid Background & Foreground Control:
  * Foreground (--switch): auto-switch tab to front, display live Lime Vignette & Top Capsule HUD.
  * Background (--no-switch / --bg): execute clicks, typing, snapshots, and screenshots silently in background without disrupting user's active tab.
- Zero Residual HUD: Auto-dismisses overlay on 4s idle OR explicit dismissal via `done`/`finish`/`clear`.
- Strict Window Protection: Blocks accidental closure of the last tab in user's browser, protects daily Chrome.
"""

import sys
import os
import json
import asyncio
import urllib.request
import urllib.parse
import urllib.error
import base64
import csv
import io
import tempfile
import time

try:
    import websockets
except ImportError:
    print("❌ Error: 'websockets' Python library is required for CDP WebSocket communication.", file=sys.stderr)
    print("👉 Install it with: pip install websockets (or python3 -m pip install websockets)", file=sys.stderr)
    sys.exit(1)

DEFAULT_PORT = 9223

# Candidate search paths for ai-cursor-hud.js across multiple environments (Linux, macOS, Windows)
HUD_CANDIDATE_PATHS = [
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "ai-cursor-hud.js"),
    os.path.expanduser("~/.agents/tools/ai-cursor-hud.js"),
    os.path.expanduser("~/browser-tools/ai-cursor-hud.js"),
    os.path.expanduser("~/.gemini/antigravity-cli/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
    os.path.expanduser("~/.gemini/config/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
    os.path.expanduser("~/.gemini/antigravity/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
    os.path.expanduser("~/.agents/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
    os.path.expanduser("~/.cursor/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
    os.path.expanduser("~/.claude/skills/chrome-browser-control/scripts/ai-cursor-hud.js"),
]

# Windows AppData / LocalAppData path fallbacks
if os.name == "nt":
    _local_app = os.environ.get("LOCALAPPDATA")
    _roam_app = os.environ.get("APPDATA")
    if _local_app:
        HUD_CANDIDATE_PATHS.extend([
            os.path.join(_local_app, "browser-tools", "ai-cursor-hud.js"),
            os.path.join(_local_app, "agents", "tools", "ai-cursor-hud.js"),
        ])
    if _roam_app:
        HUD_CANDIDATE_PATHS.extend([
            os.path.join(_roam_app, "agents", "tools", "ai-cursor-hud.js"),
        ])

# Embedded fallback HUD JS (v2.3-ultra) ensuring HUD works on ANY machine with 4s idle auto-dismiss
EMBEDDED_HUD_JS = r"""
// ai-cursor-hud.js — High-Speed Live AI Visual Cursor, Lime Vignette, Top Capsule HUD & Zero-Miss Detection
// Sesuai dengan standar arsitektur arstate/browser-agent & Clean Elegant SaaS
(() => {
  if (window.__aiCursor && window.__aiCursor.__version === "2.5-ultra") return;

  let overlayContainer = null;
  let vignetteEl = null;
  let capsuleEl = null;
  let badgeEl = null;
  let pauseBtn = null;
  let cursorContainer = null;
  let cursorPointer = null;
  let cursorRippleContainer = null;
  let targetBox = null;

  let currentCursorX = null;
  let currentCursorY = null;
  let isCursorStandby = false;
  let idleDismissTimer = null;
  const IDLE_DISMISS_DELAY_MS = 4000; // 4 seconds idle auto-dismiss

  function resetIdleDismiss() {
    if (idleDismissTimer) {
      clearTimeout(idleDismissTimer);
      idleDismissTimer = null;
    }
    idleDismissTimer = setTimeout(() => {
      if (window.__aiCursor) {
        window.__aiCursor.hideControlling();
      }
    }, IDLE_DISMISS_DELAY_MS);
  }

  function ensureStyles() {
    if (document.getElementById("ba-hud-core-styles")) return;
    const parent = document.head || document.documentElement;
    if (!parent) return;

    const style = document.createElement("style");
    style.id = "ba-hud-core-styles";
    style.textContent = `
      @keyframes baVignettePulse {
        0% {
          box-shadow: inset 0 0 25px 6px rgba(206, 241, 40, 0.35), inset 0 0 70px 15px rgba(206, 241, 40, 0.12) !important;
          border-color: rgba(206, 241, 40, 0.75) !important;
        }
        100% {
          box-shadow: inset 0 0 45px 14px rgba(206, 241, 40, 0.6), inset 0 0 110px 30px rgba(206, 241, 40, 0.22) !important;
          border-color: rgba(206, 241, 40, 0.95) !important;
        }
      }
      @keyframes ba-ripple-anim {
        0% { transform: scale(0.2); opacity: 1; border-width: 3px; }
        50% { opacity: 0.9; }
        100% { transform: scale(2.8); opacity: 0; border-width: 1px; }
      }
      @keyframes ba-pointer-click {
        0% { transform: scale(1); }
        30% { transform: scale(0.82) translate(2px, 2px); }
        65% { transform: scale(1.15) translate(-1px, -1px); }
        100% { transform: scale(1); }
      }
      @keyframes ba-standby-breathe {
        0% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0); }
      }
      @keyframes ba-badge-pop {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      #__ba_target_box {
        position: fixed !important;
        pointer-events: none !important;
        z-index: 2147483645 !important;
        border: 2px solid #CEF128 !important;
        background: rgba(206, 241, 40, 0.12) !important;
        border-radius: 6px !important;
        transition: all 0.12s cubic-bezier(0.16, 1, 0.3, 1) !important;
        opacity: 0;
        box-shadow: 0 0 16px rgba(206, 241, 40, 0.65), inset 0 0 8px rgba(206, 241, 40, 0.2) !important;
      }
      #__ba_action_label {
        position: absolute !important;
        top: 22px !important;
        left: 20px !important;
        background: rgba(15, 23, 42, 0.92) !important;
        color: #CEF128 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace !important;
        font-size: 11.5px !important;
        font-weight: 600 !important;
        padding: 3px 9px !important;
        border-radius: 9999px !important;
        border: 1px solid rgba(206, 241, 40, 0.4) !important;
        white-space: nowrap !important;
        pointer-events: none !important;
        opacity: 0;
        transition: opacity 0.15s ease !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45) !important;
        backdrop-filter: blur(8px) !important;
      }
    `;
    parent.appendChild(style);
  }

  function mountDOM() {
    ensureStyles();
    const target = document.body || document.documentElement;
    if (!target) return;

    if (!overlayContainer || !document.getElementById("browser-agent-hud-root")) {
      const staleRoots = document.querySelectorAll("#browser-agent-hud-root, #ba-control-capsule, #ba-vignette-overlay, #__ai_hud_bar");
      staleRoots.forEach(el => el.remove());

      overlayContainer = document.createElement("div");
      overlayContainer.id = "browser-agent-hud-root";
      overlayContainer.setAttribute("aria-hidden", "true");
      overlayContainer.style.cssText = "all: initial; position: static; z-index: 2147483647;";

      vignetteEl = document.createElement("div");
      vignetteEl.id = "ba-vignette-overlay";
      vignetteEl.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 2147483640 !important;
        border: 2.5px solid rgba(206, 241, 40, 0.85) !important;
        box-shadow: inset 0 0 35px 8px rgba(206, 241, 40, 0.4), inset 0 0 90px 25px rgba(206, 241, 40, 0.15) !important;
        animation: baVignettePulse 2s ease-in-out infinite alternate !important;
        transition: opacity 0.35s ease-in-out !important;
        opacity: 0;
      `;

      capsuleEl = document.createElement("div");
      capsuleEl.id = "ba-control-capsule";
      capsuleEl.style.cssText = `
        position: fixed !important;
        top: 14px !important;
        left: 50% !important;
        transform: translateX(-50%) translateY(-35px) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        background: rgba(15, 23, 42, 0.78) !important;
        color: #FFFFFF !important;
        padding: 4px 6px 4px 10px !important;
        border-radius: 9999px !important;
        border: 1px solid rgba(255, 255, 255, 0.16) !important;
        box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 18px rgba(206, 241, 40, 0.3) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        pointer-events: auto !important;
        user-select: none !important;
        backdrop-filter: blur(18px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(180%) !important;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        opacity: 0;
      `;

      capsuleEl.innerHTML = `
        <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#CEF128;box-shadow:0 0 8px #CEF128;"></span>
        <span id="ba-capsule-badge" style="font-size: 11.5px; color: #F1F5F9; background: rgba(255,255,255,0.08); padding: 3px 11px; border-radius: 9999px; font-weight: 500; letter-spacing: -0.01em; border: 1px solid rgba(255, 255, 255, 0.1);">AI Controlling...</span>
        <button id="ba-pause-action-btn" title="Pause / Stop AI Control" style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #CEF128;
          color: #0F172A;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(206, 241, 40, 0.45);
          transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        ">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1.5"/>
            <rect x="14" y="5" width="4" height="14" rx="1.5"/>
          </svg>
        </button>
      `;

      overlayContainer.appendChild(vignetteEl);
      overlayContainer.appendChild(capsuleEl);
      target.appendChild(overlayContainer);

      pauseBtn = capsuleEl.querySelector("#ba-pause-action-btn");
      if (pauseBtn) {
        pauseBtn.addEventListener("mouseenter", () => {
          pauseBtn.style.transform = "scale(1.1)";
          pauseBtn.style.background = "#d9f938";
        });
        pauseBtn.addEventListener("mouseleave", () => {
          pauseBtn.style.transform = "scale(1)";
          pauseBtn.style.background = "#CEF128";
        });
        pauseBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.__aiCursor.hideControlling();
        });
      }

      badgeEl = capsuleEl.querySelector("#ba-capsule-badge");
    }

    if (!targetBox || !document.getElementById("__ba_target_box")) {
      targetBox = document.getElementById("__ba_target_box");
      if (!targetBox) {
        targetBox = document.createElement("div");
        targetBox.id = "__ba_target_box";
        target.appendChild(targetBox);
      }
    }

    if (!cursorContainer || !document.getElementById("ba-ai-cursor-indicator")) {
      cursorContainer = document.getElementById("ba-ai-cursor-indicator");
      if (!cursorContainer) {
        cursorContainer = document.createElement("div");
        cursorContainer.id = "ba-ai-cursor-indicator";
        cursorContainer.style.cssText = `
          position: fixed !important;
          z-index: 2147483647 !important;
          pointer-events: none !important;
          transition: left 0.14s cubic-bezier(0.22, 1, 0.36, 1), top 0.14s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease !important;
          left: -100px;
          top: -100px;
          display: none;
          opacity: 0;
        `;

        cursorContainer.innerHTML = `
          <div style="position:relative;width:0;height:0;">
            <div id="ba-cursor-ripple-box" style="position:absolute;top:-25px;left:-25px;width:50px;height:50px;pointer-events:none;"></div>
            <div id="ba-cursor-pointer" style="position:absolute;top:-2.5px;left:-4.5px;transition:transform 0.12s ease;">
              <svg width="25" height="25" viewBox="0 0 24 24" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,0.65));display:block;">
                <path d="M4.5 2.5 L4.5 18.5 L9 14.5 L13.5 22 L16.2 20.4 L11.7 13 L18 13 Z" fill="#CEF128" stroke="#000000" stroke-width="1.75" stroke-linejoin="round" stroke-linecap="round"/>
              </svg>
              <div id="__ba_action_label"></div>
            </div>
          </div>
        `;
        target.appendChild(cursorContainer);
      }
      cursorPointer = cursorContainer.querySelector("#ba-cursor-pointer");
      cursorRippleContainer = cursorContainer.querySelector("#ba-cursor-ripple-box");
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountDOM, { once: true });
    } else {
      mountDOM();
    }
  }

  function isElementVisible(el) {
    if (!el || !(el instanceof Element)) return false;
    try {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
      return (rect.width > 0 || rect.height > 0 || el.getClientRects().length > 0);
    } catch (e) {
      return false;
    }
  }

  function findDOMElement(query) {
    if (!query) return null;
    const q = String(query).trim();
    const qLower = q.toLowerCase();

    // 1. Direct CSS Selector
    try {
      const el = document.querySelector(q);
      if (el && isElementVisible(el)) return el;
      if (el) return el;
    } catch (e) {}

    // 2. Direct ID fallback without hash
    if (!q.includes(" ") && !q.includes("[") && !q.includes(":")) {
      const byId = document.getElementById(q);
      if (byId && isElementVisible(byId)) return byId;
    }

    // 3. Direct XPath if prefix looks like XPath
    if (q.startsWith("//") || q.startsWith("xpath:") || q.startsWith("(/")) {
      try {
        const cleanXpath = q.startsWith("xpath:") ? q.slice(6).trim() : q;
        const res = document.evaluate(cleanXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (res && res.singleNodeValue && isElementVisible(res.singleNodeValue)) return res.singleNodeValue;
      } catch (e) {}
    }

    // 4. Fast Button & Primary Action Selector
    const buttonSel = 'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], a.btn, [class*="btn"], [class*="button"], [role="tab"], [role="menuitem"], [role="option"], summary';
    const buttons = Array.from(document.querySelectorAll(buttonSel));

    // 4a. Exact text match on visible buttons
    for (const el of buttons) {
      if (!isElementVisible(el)) continue;
      const txt = (el.innerText || el.value || el.getAttribute("aria-label") || el.title || "").replace(/\s+/g, ' ').trim();
      if (txt.toLowerCase() === qLower) return el;
    }

    // 4b. StartsWith or Contains match on visible buttons
    for (const el of buttons) {
      if (!isElementVisible(el)) continue;
      const txt = (el.innerText || el.value || el.getAttribute("aria-label") || el.title || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt && (txt.includes(qLower) || qLower.includes(txt)) && Math.abs(txt.length - qLower.length) <= 50) {
        return el;
      }
    }

    // 4c. Attributes match on buttons (id, name, data-testid, data-qa)
    for (const el of buttons) {
      if (!isElementVisible(el)) continue;
      const testId = (el.getAttribute("data-testid") || el.getAttribute("data-qa") || el.id || el.name || "").toLowerCase();
      if (testId === qLower || testId.includes(qLower)) return el;
    }

    // 5. General Interactive Elements (Links, Clickables)
    const interactiveSel = 'a[href], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [onclick], [tabindex]:not([tabindex="-1"])';
    const interactives = Array.from(document.querySelectorAll(interactiveSel));

    for (const el of interactives) {
      if (!isElementVisible(el)) continue;
      const txt = (el.innerText || el.getAttribute("aria-label") || el.title || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt === qLower) return el;
    }
    for (const el of interactives) {
      if (!isElementVisible(el)) continue;
      const txt = (el.innerText || el.getAttribute("aria-label") || el.title || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt.includes(qLower) && txt.length <= qLower.length + 60) return el;
    }

    // 6. Form Inputs (by placeholder, name, id, aria-label)
    const inputs = Array.from(document.querySelectorAll('input, textarea, select, [contenteditable="true"]'));
    for (const el of inputs) {
      if (!isElementVisible(el)) continue;
      const ph = (el.placeholder || "").toLowerCase();
      const name = (el.name || "").toLowerCase();
      const id = (el.id || "").toLowerCase();
      const aria = (el.getAttribute("aria-label") || "").toLowerCase();
      if (ph === qLower || name === qLower || id === qLower || aria === qLower) return el;
    }
    for (const el of inputs) {
      if (!isElementVisible(el)) continue;
      const ph = (el.placeholder || "").toLowerCase();
      const name = (el.name || "").toLowerCase();
      const id = (el.id || "").toLowerCase();
      const aria = (el.getAttribute("aria-label") || "").toLowerCase();
      if ((ph && ph.includes(qLower)) || (name && name.includes(qLower)) || (id && id.includes(qLower)) || (aria && aria.includes(qLower))) {
        return el;
      }
    }

    // 7. Labels
    const labels = Array.from(document.querySelectorAll('label'));
    for (const lbl of labels) {
      if (!isElementVisible(lbl)) continue;
      const txt = (lbl.innerText || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt === qLower || (txt.includes(qLower) && txt.length <= qLower.length + 40)) {
        if (lbl.control && isElementVisible(lbl.control)) return lbl.control;
        if (lbl.htmlFor) {
          const ctrl = document.getElementById(lbl.htmlFor);
          if (ctrl && isElementVisible(ctrl)) return ctrl;
        }
        const inner = lbl.querySelector('input, textarea, select, button');
        if (inner && isElementVisible(inner)) return inner;
        return lbl;
      }
    }

    // 8. Text Leaf Nodes
    const leafNodes = Array.from(document.querySelectorAll('span, p, h1, h2, h3, h4, h5, h6, b, strong, em, td, th, li, div'));
    for (const leaf of leafNodes) {
      if (!isElementVisible(leaf)) continue;
      const txt = (leaf.innerText || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt === qLower) {
        const parentBtn = leaf.closest('button, a, [role="button"], label, tr, li');
        return (parentBtn && isElementVisible(parentBtn)) ? parentBtn : leaf;
      }
    }
    for (const leaf of leafNodes) {
      if (!isElementVisible(leaf)) continue;
      const txt = (leaf.innerText || "").replace(/\s+/g, ' ').trim().toLowerCase();
      if (txt.includes(qLower) && txt.length <= qLower.length + 40) {
        const parentBtn = leaf.closest('button, a, [role="button"], label, tr, li');
        return (parentBtn && isElementVisible(parentBtn)) ? parentBtn : leaf;
      }
    }

    return null;
  }

  function findButtons(filterText = "") {
    const qLower = (filterText || "").trim().toLowerCase();
    const selector = 'button, [role="button"], input[type="button"], input[type="submit"], a, [role="tab"], [role="menuitem"], summary, [onclick], [class*="btn"], [class*="button"]';
    const all = Array.from(document.querySelectorAll(selector));
    const results = [];
    let idx = 1;

    for (const el of all) {
      if (!isElementVisible(el)) continue;
      if (el.closest('#browser-agent-hud-root, #ba-vignette-overlay, #ba-control-capsule, #__ba_target_box')) continue;
      if (el.id && (el.id.startsWith('ba-') || el.id.startsWith('__ba_'))) continue;
      const text = (el.innerText || el.value || el.getAttribute("aria-label") || el.title || "").replace(/\s+/g, ' ').trim();
      if (!text && el.tagName !== 'BUTTON' && el.tagName !== 'INPUT') continue;

      if (qLower) {
        const match = text.toLowerCase().includes(qLower)
          || (el.id && el.id.toLowerCase().includes(qLower))
          || (el.getAttribute("data-testid") && el.getAttribute("data-testid").toLowerCase().includes(qLower));
        if (!match) continue;
      }

      const rect = el.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);

      let cleanSelector = "";
      if (el.id) {
        cleanSelector = `#${el.id}`;
      } else if (el.getAttribute("data-testid")) {
        cleanSelector = `[data-testid="${el.getAttribute("data-testid")}"]`;
      } else if (el.name) {
        cleanSelector = `${el.tagName.toLowerCase()}[name="${el.name}"]`;
      } else if (text && text.length <= 30) {
        cleanSelector = text;
      } else {
        cleanSelector = `${el.tagName.toLowerCase()}`;
      }

      results.push({
        index: idx++,
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role") || el.tagName.toLowerCase(),
        text: text.slice(0, 70),
        selector: cleanSelector,
        center: { x: cx, y: cy },
        rect: {
          left: Math.round(rect.left),
          top: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      });
      if (results.length >= 60) break;
    }
    return results;
  }

  async function extractTable(options = {}) {
    const maxRows = Math.min(1000, Math.max(5, Number(options.maxRows || options.max_rows) || 200));
    const autoScroll = options.autoScroll !== false && options.auto_scroll !== false;
    const containerSelector = options.containerSelector || options.container_selector || null;

    function getHeaders() {
      const headerEls = Array.from(document.querySelectorAll('th, [role="columnheader"], .x-grid3-hd-inner'));
      const headers = headerEls.map(el => (el.innerText || '').replace(/\s+/g, ' ').trim()).filter(Boolean);
      return headers.length > 0 ? headers : [];
    }

    const rowDataMap = new Map();

    function scrapeVisibleRows() {
      const selector = 'tr, [role="row"], .x-grid3-row, [data-testid*="row"], .grid-row, .table-row, [class*="table"] [class*="row"]';
      const rowEls = Array.from(document.querySelectorAll(selector));
      rowEls.forEach(row => {
        const text = (row.innerText || '').replace(/\s+/g, ' ').trim();
        if (!text || text.length < 3) return;
        if (row.querySelector('th, [role="columnheader"]')) return;

        const cells = Array.from(row.querySelectorAll('td, [role="gridcell"], [role="cell"], .x-grid3-cell-inner, .cell, div[class*="cell"]'))
          .map(c => (c.innerText || '').replace(/\s+/g, ' ').trim())
          .filter(c => c.length > 0);

        const key = cells.length > 0 ? cells.slice(0, 3).join(" | ") : text.slice(0, 100);
        if (!rowDataMap.has(key)) {
          rowDataMap.set(key, {
            cells: cells.length > 0 ? cells : [text],
            rawText: text
          });
        }
      });
    }

    scrapeVisibleRows();

    if (autoScroll && rowDataMap.size < maxRows) {
      let scrollContainers = [];
      if (containerSelector) {
        const c = document.querySelector(containerSelector);
        if (c) scrollContainers.push(c);
      }
      if (scrollContainers.length === 0) {
        scrollContainers = [
          ...Array.from(document.querySelectorAll('[role="grid"], .x-grid3-scroller, [data-testid*="table"], .table-container, [class*="table-container"], [class*="scroll"], main')),
          document.documentElement,
          document.body
        ];
      }

      for (let i = 0; i < 8 && rowDataMap.size < maxRows; i++) {
        scrollContainers.forEach(c => {
          if (c && typeof c.scrollBy === 'function') {
            try { c.scrollBy(0, 650); } catch (e) {}
          }
        });
        window.scrollBy(0, 650);
        await new Promise(r => setTimeout(r, 220));
        scrapeVisibleRows();
      }
      window.scrollTo(0, 0);
    }

    let headers = getHeaders();
    const rowsList = Array.from(rowDataMap.values()).slice(0, maxRows);

    if (headers.length === 0 && rowsList.length > 0) {
      const maxColCount = Math.max(...rowsList.map(r => r.cells.length), 1);
      headers = Array.from({ length: maxColCount }, (_, i) => `Kolom ${i + 1}`);
    }

    // Markdown table
    let markdownTable = "";
    if (headers.length > 0 && rowsList.length > 0) {
      markdownTable += "| " + headers.join(" | ") + " |\n";
      markdownTable += "| " + headers.map(() => "---").join(" | ") + " |\n";
      rowsList.forEach(r => {
        const paddedCells = headers.map((_, idx) => (r.cells[idx] || "").replace(/\|/g, "\\|"));
        markdownTable += "| " + paddedCells.join(" | ") + " |\n";
      });
    }

    // JSON structured data
    const jsonData = rowsList.map(r => {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = r.cells[idx] || "";
      });
      return obj;
    });

    return {
      status: "success",
      total_rows: rowsList.length,
      headers: headers,
      rows: rowsList.map(r => r.cells),
      markdown: markdownTable,
      data: jsonData
    };
  }

  function extractContent(options = {}) {
    const title = document.title || "";
    const url = location.href;
    const metaDesc = document.querySelector('meta[name="description"]')?.content || "";
    const metaAuthor = document.querySelector('meta[name="author"]')?.content || "";

    const container = document.querySelector('article, main, [role="main"], #content, .content, .post-content') || document.body;
    if (!container) {
      return { title, url, description: metaDesc, author: metaAuthor, markdown: "", text: "", wordCount: 0 };
    }

    const clone = container.cloneNode(true);

    const removeSelectors = 'script, style, noscript, svg, nav, footer, aside, header, iframe, form, [role="banner"], [role="navigation"], [class*="cookie"], [class*="popup"], [class*="modal"], [id*="cookie"], [class*="ad-"], [class*="advertisement"]';
    clone.querySelectorAll(removeSelectors).forEach(el => el.remove());

    function domToMarkdown(node) {
      if (!node) return "";
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.replace(/\s+/g, ' ');
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return "";

      const tag = node.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map(domToMarkdown).join("");

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        const level = parseInt(tag[1], 10);
        return `\n\n${'#'.repeat(level)} ${children.trim()}\n\n`;
      }
      if (tag === 'p') {
        const trimmed = children.trim();
        return trimmed ? `\n\n${trimmed}\n\n` : "";
      }
      if (tag === 'br') return "\n";
      if (tag === 'hr') return "\n\n---\n\n";
      if (['strong', 'b'].includes(tag)) {
        const trimmed = children.trim();
        return trimmed ? ` **${trimmed}** ` : "";
      }
      if (['em', 'i'].includes(tag)) {
        const trimmed = children.trim();
        return trimmed ? ` *${trimmed}* ` : "";
      }
      if (tag === 'code') {
        return ` \`${children.trim()}\` `;
      }
      if (tag === 'pre') {
        return `\n\n\`\`\`\n${node.innerText.trim()}\n\`\`\`\n\n`;
      }
      if (tag === 'blockquote') {
        return `\n\n> ${children.trim().replace(/\n/g, '\n> ')}\n\n`;
      }
      if (tag === 'ul') {
        return `\n\n${children.trim()}\n\n`;
      }
      if (tag === 'ol') {
        return `\n\n${children.trim()}\n\n`;
      }
      if (tag === 'li') {
        const parentTag = node.parentElement?.tagName.toLowerCase();
        const prefix = parentTag === 'ol' ? "1. " : "- ";
        return `${prefix}${children.trim()}\n`;
      }
      if (tag === 'a') {
        const href = node.getAttribute('href');
        const txt = children.trim();
        if (href && txt) return `[${txt}](${href})`;
        return txt;
      }
      if (tag === 'table') {
        const rows = Array.from(node.querySelectorAll('tr'));
        if (rows.length === 0) return children;
        let tableMd = "\n\n";
        rows.forEach((r, rIdx) => {
          const cells = Array.from(r.querySelectorAll('th, td')).map(c => (c.innerText || '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim());
          tableMd += "| " + cells.join(" | ") + " |\n";
          if (rIdx === 0) {
            tableMd += "| " + cells.map(() => "---").join(" | ") + " |\n";
          }
        });
        return tableMd + "\n\n";
      }

      return children;
    }

    let markdown = domToMarkdown(clone)
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const plainText = (clone.innerText || clone.textContent || "").replace(/\s+/g, ' ').trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;

    return {
      title,
      url,
      description: metaDesc,
      author: metaAuthor,
      markdown,
      text: plainText.slice(0, 15000),
      wordCount
    };
  }

  function extractResearchData(options = {}) {
    const maxLinks = Number(options.maxLinks || options.max_links) || 40;
    const contentData = extractContent({ format: "markdown" });

    // Meta tags & OpenGraph
    const metas = {};
    document.querySelectorAll('meta').forEach(m => {
      const name = m.getAttribute('name') || m.getAttribute('property');
      const val = m.getAttribute('content');
      if (name && val) metas[name] = val;
    });

    const openGraph = {};
    const twitterCard = {};
    for (const [k, v] of Object.entries(metas)) {
      if (k.startsWith('og:')) openGraph[k.slice(3)] = v;
      if (k.startsWith('twitter:')) twitterCard[k.slice(8)] = v;
    }

    const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;

    // Structured Data JSON-LD
    const jsonLd = [];
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      try {
        const parsed = JSON.parse(s.textContent);
        jsonLd.push(parsed);
      } catch (e) {}
    });

    // Headings Outline
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
      const text = (h.innerText || '').replace(/\s+/g, ' ').trim();
      if (text) {
        headings.push({
          level: parseInt(h.tagName[1], 10),
          tag: h.tagName.toLowerCase(),
          text,
          id: h.id || null
        });
      }
    });

    // Links
    const currentHost = location.hostname;
    const links = [];
    const seenUrls = new Set();

    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.href;
      if (!href || href.startsWith('javascript:') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (seenUrls.has(href)) return;
      seenUrls.add(href);

      const anchorText = (a.innerText || a.getAttribute('aria-label') || a.title || '').replace(/\s+/g, ' ').trim();
      let isExternal = false;
      try {
        const u = new URL(href);
        isExternal = u.hostname !== currentHost;
      } catch (e) {}

      links.push({
        text: anchorText.slice(0, 80),
        url: href,
        isExternal
      });
    });

    return {
      status: "success",
      document: {
        title: document.title || "",
        url: location.href,
        canonical,
        description: metas['description'] || openGraph['description'] || "",
        author: metas['author'] || openGraph['author'] || "",
        keywords: metas['keywords'] || "",
        publishedTime: metas['article:published_time'] || metas['datePublished'] || null,
        wordCount: contentData.wordCount,
        readingTimeMinutes: Math.max(1, Math.ceil(contentData.wordCount / 200))
      },
      openGraph,
      twitterCard,
      jsonLd,
      headings,
      contentMarkdown: contentData.markdown,
      links: links.slice(0, maxLinks)
    };
  }


  // High-Speed Matrix / Cyber Character Scramble Animation (browser-agent style)
  let scrambleInterval = null;
  const SCRAMBLE_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!<>_[]*#";
  function scrambleText(targetEl, targetText) {
    if (!targetEl) return;
    if (!targetText) {
      targetEl.textContent = "";
      return;
    }
    let iteration = 0;
    if (scrambleInterval) clearInterval(scrambleInterval);
    scrambleInterval = setInterval(() => {
      targetEl.innerText = targetText
        .split("")
        .map((char, index) => {
          if (index < iteration) return targetText[index];
          if (char === " ") return " ";
          return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        })
        .join("");
      if (iteration >= targetText.length) {
        clearInterval(scrambleInterval);
        scrambleInterval = null;
        targetEl.textContent = targetText;
      }
      iteration += 1;
    }, 20);
  }

  window.__aiCursor = {
    __version: "2.5-ultra",

    ensureDOM() {
      mountDOM();
    },

    showControlling(label) {
      this.ensureDOM();
      resetIdleDismiss();
      if (vignetteEl) vignetteEl.style.opacity = "1";
      if (capsuleEl) {
        capsuleEl.style.opacity = "1";
        capsuleEl.style.transform = "translateX(-50%) translateY(0)";
      }
      if (badgeEl && label) scrambleText(badgeEl, label);
      this.showStandbyCursor();
    },

    hideControlling() {
      if (idleDismissTimer) {
        clearTimeout(idleDismissTimer);
        idleDismissTimer = null;
      }
      if (vignetteEl) vignetteEl.style.opacity = "0";
      if (capsuleEl) {
        capsuleEl.style.opacity = "0";
        capsuleEl.style.transform = "translateX(-50%) translateY(-35px)";
      }
      this.clearHighlight();
      this.hideCursor();
    },

    done() {
      this.hideControlling();
    },

    finish() {
      this.hideControlling();
    },

    clear() {
      this.hideControlling();
    },

    hide() {
      this.hideControlling();
    },

    status(text) {
      this.showControlling(text);
      resetIdleDismiss();
    },

    showStandbyCursor() {
      this.ensureDOM();
      if (!cursorContainer) return;
      isCursorStandby = true;
      if (currentCursorX === null || currentCursorY === null) {
        currentCursorX = Math.max(50, window.innerWidth - 120);
        currentCursorY = Math.max(50, window.innerHeight - 150);
      }
      cursorContainer.style.left = `${currentCursorX}px`;
      cursorContainer.style.top = `${currentCursorY}px`;
      cursorContainer.style.display = "block";
      cursorContainer.style.opacity = "1";
      if (cursorPointer) cursorPointer.style.animation = "ba-standby-breathe 2.5s infinite ease-in-out";
      resetIdleDismiss();
    },

    hideCursor() {
      isCursorStandby = false;
      if (cursorContainer) {
        cursorContainer.style.opacity = "0";
        setTimeout(() => {
          if (!isCursorStandby && cursorContainer) cursorContainer.style.display = "none";
        }, 250);
      }
    },

    moveTo(x, y, label = "") {
      this.showControlling(label || undefined);
      resetIdleDismiss();
      currentCursorX = x;
      currentCursorY = y;
      if (cursorContainer) {
        cursorContainer.style.display = "block";
        cursorContainer.style.opacity = "1";
        cursorContainer.style.left = `${x}px`;
        cursorContainer.style.top = `${y}px`;
      }
      const badge = cursorContainer ? cursorContainer.querySelector("#__ba_action_label") : null;
      if (badge) {
        if (label) {
          badge.textContent = label;
          badge.style.opacity = "1";
        } else {
          badge.style.opacity = "0";
        }
      }
      if (badgeEl && label) scrambleText(badgeEl, label);
    },

    highlightRect(rect, label = "") {
      this.ensureDOM();
      resetIdleDismiss();
      if (!targetBox || !rect) return;
      targetBox.style.top = `${rect.top}px`;
      targetBox.style.left = `${rect.left}px`;
      targetBox.style.width = `${rect.width}px`;
      targetBox.style.height = `${rect.height}px`;
      targetBox.style.opacity = "1";

      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);
      this.moveTo(cx, cy, label);
    },

    highlightElement(el, label = "") {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      this.highlightRect(rect, label);
    },

    clearHighlight() {
      if (targetBox) targetBox.style.opacity = "0";
      const badge = cursorContainer ? cursorContainer.querySelector("#__ba_action_label") : null;
      if (badge) badge.style.opacity = "0";
    },

    click(x, y, label = "") {
      this.moveTo(x, y, label);
      resetIdleDismiss();
      if (cursorPointer) {
        cursorPointer.style.animation = "ba-pointer-click 0.3s ease-out";
      }
      if (cursorRippleContainer) {
        cursorRippleContainer.innerHTML = `
          <div style="width:50px;height:50px;border-radius:50%;background:rgba(206,241,40,0.35);border:2.5px solid #CEF128;box-shadow:0 0 20px rgba(206,241,40,0.85);animation:ba-ripple-anim 0.65s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;"></div>
        `;
      }
      setTimeout(() => {
        if (isCursorStandby && cursorPointer) {
          cursorPointer.style.animation = "ba-standby-breathe 2.5s infinite ease-in-out";
        }
      }, 650);
    },

    async clickSelector(sel, label = "") {
      this.ensureDOM();
      resetIdleDismiss();
      const el = findDOMElement(sel);
      if (!el) {
        this.status(`Elemen tidak ditemukan: ${sel}`);
        return { success: false, reason: "Element not found" };
      }

      el.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
      const rect = el.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);

      this.highlightRect(rect, label || `Klik: ${sel}`);
      this.click(cx, cy, label || `Klik: ${sel}`);

      try {
        if (typeof el.click === "function") el.click();
        el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
      } catch (e) {}

      setTimeout(() => this.clearHighlight(), 400);
      resetIdleDismiss();
      return { success: true, text: (el.innerText || el.value || "").trim(), x: cx, y: cy };
    },

    async typeSelector(sel, text, label = "") {
      this.ensureDOM();
      resetIdleDismiss();
      const el = findDOMElement(sel);
      if (!el) {
        this.status(`Field input tidak ditemukan: ${sel}`);
        return { success: false, reason: "Field not found" };
      }

      el.scrollIntoView({ behavior: "instant", block: "center" });
      const rect = el.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);

      this.highlightRect(rect, label || `Ketik: ${sel}`);
      this.moveTo(cx, cy, label || `Ketik: ${sel}`);
      if (typeof el.focus === "function") el.focus();

      if ("value" in el) el.value = "";
      else if (el.isContentEditable) el.innerText = "";

      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
        || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

      if (nativeSetter) {
        nativeSetter.call(el, text);
      } else {
        el.value = text;
      }
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));

      this.status(`Terisi: "${text}"`);
      setTimeout(() => this.clearHighlight(), 400);
      resetIdleDismiss();
      return { success: true, text, value: el.value, x: cx, y: cy };
    },

    scroll(deltaY, label = "") {
      this.ensureDOM();
      resetIdleDismiss();
      window.scrollBy({ top: deltaY, behavior: "instant" });
      this.status(label || `Scroll ${deltaY}px`);
      resetIdleDismiss();
    },

    findDOMElement(query) {
      return findDOMElement(query);
    },

    findButtons(filterText = "") {
      return findButtons(filterText);
    },

    extractTable(options = {}) {
      return extractTable(options);
    },

    extractContent(options = {}) {
      return extractContent(options);
    },


    async fillForm(fields = {}) {
      this.ensureDOM();
      resetIdleDismiss();
      const results = {};
      const entries = Object.entries(fields);
      this.status(`Mengisi Formulir (${entries.length} field)...`);

      for (const [key, val] of entries) {
        const el = findDOMElement(key);
        if (!el) {
          results[key] = { success: false, reason: "Element not found" };
          continue;
        }

        try {
          el.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
        } catch (e) {}

        const rect = el.getBoundingClientRect();
        const cx = Math.round(rect.left + rect.width / 2);
        const cy = Math.round(rect.top + rect.height / 2);
        this.highlightRect(rect, `Isi: ${key}`);

        const tag = el.tagName.toLowerCase();
        const type = (el.type || "").toLowerCase();

        if (tag === "select") {
          let matched = false;
          const targetValStr = String(val).toLowerCase();
          for (const opt of Array.from(el.options)) {
            if (opt.value.toLowerCase() === targetValStr || opt.text.toLowerCase().includes(targetValStr)) {
              el.value = opt.value;
              matched = true;
              break;
            }
          }
          el.dispatchEvent(new Event("change", { bubbles: true }));
          results[key] = { success: matched, value: el.value, type: "select" };
        } else if (type === "checkbox" || type === "radio") {
          const shouldCheck = val === true || val === "true" || val === 1 || val === "1" || String(val).toLowerCase() === "yes";
          if (el.checked !== shouldCheck) {
            el.click();
          }
          results[key] = { success: true, checked: el.checked, type };
        } else {
          if (typeof el.focus === "function") el.focus();
          if ("value" in el) el.value = "";
          else if (el.isContentEditable) el.innerText = "";

          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
            || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

          const textVal = String(val);
          if (nativeSetter) {
            nativeSetter.call(el, textVal);
          } else {
            el.value = textVal;
          }
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
          results[key] = { success: true, value: el.value, type: tag };
        }

        await new Promise(r => setTimeout(r, 200));
      }

      this.status(`Formulir Selesai Terisi (${entries.length} field)`);
      setTimeout(() => this.clearHighlight(), 500);
      resetIdleDismiss();
      return results;
    },

    async waitForSelector(sel, timeoutMs = 10000) {
      this.ensureDOM();
      resetIdleDismiss();
      this.status(`Menunggu Elemen: ${sel}...`);
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        const el = findDOMElement(sel);
        if (el && isElementVisible(el)) {
          this.highlightElement(el, `Ditemukan: ${sel}`);
          setTimeout(() => this.clearHighlight(), 600);
          return { success: true, elapsedMs: Date.now() - start, text: (el.innerText || el.value || "").trim() };
        }
        await new Promise(r => setTimeout(r, 250));
      }
      return { success: false, reason: `Timeout ${timeoutMs}ms waiting for ${sel}` };
    },

    extractResearchData(options = {}) {
      return extractResearchData(options);
    }
  };
})();

"""

def get_hud_script():
    for p in HUD_CANDIDATE_PATHS:
        try:
            if os.path.isfile(p):
                with open(p, "r", encoding="utf-8") as f:
                    content = f.read().strip()
                    if content:
                        return content
        except Exception:
            pass
    return EMBEDDED_HUD_JS.strip()

def get_all_targets(port=DEFAULT_PORT, retries=3, delay=0.3):
    url = f"http://127.0.0.1:{port}/json/list"
    last_err = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "BrowserAgentFast/2.4"})
            with urllib.request.urlopen(req, timeout=3) as resp:
                data = json.loads(resp.read().decode())
                return [t for t in data if t.get("type") == "page"]
        except Exception as e:
            last_err = e
            if attempt < retries - 1:
                time.sleep(delay)
    print(f"❌ Error connecting to Chrome CDP on port {port}: {last_err}", file=sys.stderr)
    print(f"👉 Ensure Chrome is running with: --remote-debugging-port={port}", file=sys.stderr)
    sys.exit(1)

def resolve_target(tab_selector=None, port=DEFAULT_PORT):
    targets = get_all_targets(port)
    if not targets:
        print(f"❌ Error: No page targets found on port {port}.", file=sys.stderr)
        sys.exit(1)
    if not tab_selector:
        return targets[0]

    target_str = str(tab_selector).strip()
    if target_str.isdigit():
        idx = int(target_str) - 1
        if 0 <= idx < len(targets):
            return targets[idx]
        else:
            print(f"❌ Error: Tab index {target_str} out of range (1-{len(targets)}).", file=sys.stderr)
            sys.exit(1)

    for t in targets:
        if t.get("id") == target_str:
            return t
        if target_str.lower() in (t.get("title", "") + t.get("url", "")).lower():
            return t

    print(f"❌ Error: No tab matching '{tab_selector}' found.", file=sys.stderr)
    sys.exit(1)

def activate_target(target_id, port=DEFAULT_PORT):
    act_url = f"http://127.0.0.1:{port}/json/activate/{target_id}"
    try:
        req = urllib.request.Request(act_url, headers={"User-Agent": "BrowserAgentFast/2.4"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            pass
    except Exception:
        pass

class CDPClient:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.ws = None
        self._msg_id = 0

    async def connect(self, retries=3, delay=0.3):
        if not self.ws_url:
            raise ValueError("Target WebSocket URL is null or empty.")
        last_err = None
        for attempt in range(retries):
            try:
                self.ws = await websockets.connect(self.ws_url, max_size=35 * 1024 * 1024)
                return
            except Exception as e:
                last_err = e
                if attempt < retries - 1:
                    await asyncio.sleep(delay)
        raise last_err

    async def close(self):
        if self.ws:
            await self.ws.close()

    async def send(self, method, params=None, timeout=4.0):
        self._msg_id += 1
        msg_id = self._msg_id
        payload = {"id": msg_id, "method": method, "params": params or {}}
        await self.ws.send(json.dumps(payload))
        while True:
            try:
                resp = await asyncio.wait_for(self.ws.recv(), timeout=timeout)
            except asyncio.TimeoutError:
                print(f"⚠️ CDP {method} timed out after {timeout}s", file=sys.stderr)
                return {}
            data = json.loads(resp)
            if data.get("id") == msg_id:
                if "error" in data:
                    print(f"⚠️ CDP {method} warning: {data['error']}", file=sys.stderr)
                return data.get("result", {})

    async def evaluate(self, expression, await_promise=True):
        return await self.send("Runtime.evaluate", {
            "expression": expression,
            "awaitPromise": await_promise,
            "returnByValue": True
        })

    async def inject_hud(self):
        script = get_hud_script()
        if script:
            await self.send("Page.enable")
            await self.send("Runtime.enable")
            await self.send("Page.addScriptToEvaluateOnNewDocument", {"source": script})
            await self.evaluate(script, await_promise=False)

def cmd_tabs(port=DEFAULT_PORT, fmt="text"):
    """List all open tabs in Chrome with optional JSON format."""
    targets = get_all_targets(port)
    if fmt == "json":
        clean_tabs = []
        for idx, t in enumerate(targets, 1):
            clean_tabs.append({
                "index": idx,
                "id": t.get("id"),
                "title": t.get("title", ""),
                "url": t.get("url", ""),
                "webSocketDebuggerUrl": t.get("webSocketDebuggerUrl")
            })
        print(json.dumps(clean_tabs, indent=2, ensure_ascii=False))
        return clean_tabs
    print(f"\n📑 Daftar Tab Aktif di Chrome (Port {port}) — Total {len(targets)} Tab:")
    print("=" * 75)
    for idx, t in enumerate(targets, 1):
        title = (t.get("title") or "Untitled").strip()
        if len(title) > 42:
            title = title[:39] + "..."
        url = t.get("url") or ""
        if len(url) > 55:
            url = url[:52] + "..."
        active_mark = "👉 " if idx == 1 else "   "
        print(f"{active_mark}[{idx:>2}] {title:<42} | {url}")
    print("=" * 75)
    print("💡 Gunakan opsi --tab <nomor/id> pada perintah click/type/snapshot.")
    print("💡 Tambahkan --no-switch untuk eksekusi di background tanpa ganggu layar.\n")
    return targets

async def cmd_eval(expression, fmt="text", tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Evaluate arbitrary JavaScript in the page context and return the result."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
        res = await client.evaluate(expression, await_promise=True)
        if "exceptionDetails" in res:
            exc = res["exceptionDetails"]
            err_desc = res.get("result", {}).get("description") or exc.get("text") or "JavaScript evaluation exception"
            if fmt == "json":
                print(json.dumps({"error": err_desc, "exceptionDetails": exc}, indent=2, ensure_ascii=False))
            else:
                print(f"❌ JavaScript Error: {err_desc}", file=sys.stderr)
            sys.exit(1)

        result_obj = res.get("result", {})
        val = result_obj.get("value")
        if val is None and "description" in result_obj and result_obj.get("type") != "undefined":
            val = result_obj["description"]

        if fmt == "json":
            print(json.dumps(val, indent=2, ensure_ascii=False))
        else:
            if isinstance(val, (dict, list)):
                print(json.dumps(val, indent=2, ensure_ascii=False))
            else:
                print(val if val is not None else "")
        return val
    finally:
        await client.close()

async def cmd_links(query=None, fmt="text", tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Extract all links or search result URLs matching query from page."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()

        q_json = json.dumps(query or "")
        js = f"""(() => {{
            const filter = {q_json}.toLowerCase();
            const anchors = Array.from(document.querySelectorAll('a[href]'));
            const results = [];
            const seen = new Set();
            for (const a of anchors) {{
                const href = a.href;
                const text = (a.innerText || a.textContent || '').trim();
                const title = a.title || '';
                if (!href || href.startsWith('javascript:') || href.startsWith('#')) continue;
                if (filter && !text.toLowerCase().includes(filter) && !href.toLowerCase().includes(filter)) continue;
                if (seen.has(href)) continue;
                seen.add(href);
                results.push({{
                    text: text.slice(0, 120),
                    url: href,
                    title: title.slice(0, 120),
                    isExternal: a.hostname !== window.location.hostname
                }});
            }}
            return results;
        }})()"""
        res = await client.evaluate(js)
        links = res.get("result", {}).get("value") or []
        if fmt == "json":
            print(json.dumps(links, indent=2, ensure_ascii=False))
        else:
            print(f"\n🔗 Ekstraksi Link dari '{target.get('title', '')}' (Total: {len(links)} link):\n" + "=" * 80)
            for idx, l in enumerate(links[:60], 1):
                ext = "[Ext]" if l.get("isExternal") else "[Int]"
                txt = l.get("text") or "No Text"
                if len(txt) > 35: txt = txt[:32] + "..."
                url = l.get("url")
                if len(url) > 40: url = url[:37] + "..."
                print(f"[{idx:>2}] {ext} {txt:<35} | {url}")
            print("=" * 80 + "\n")
        return links
    finally:
        await client.close()

async def cmd_switch(target_arg, port=DEFAULT_PORT):
    """Switch to a specific tab by index, text match, or target ID."""
    target = resolve_target(target_arg, port)
    tid = target["id"]
    activate_target(tid, port)

    ws_url = target.get("webSocketDebuggerUrl")
    if ws_url:
        client = CDPClient(ws_url)
        await client.connect()
        try:
            await client.send("Page.bringToFront")
            await client.inject_hud()
            title = target.get("title", "Tab")
            js = f"window.__aiCursor ? window.__aiCursor.status('Aktif di Tab: {title[:30]}') : false"
            await client.evaluate(js)
        finally:
            await client.close()

    print(f"✅ Berhasil beralih ke Tab: {target.get('title', '')} ({target.get('url', '')})")

async def cmd_new(url, auto_switch=True, port=DEFAULT_PORT):
    """Create a new tab. In background mode (--no-switch), keeps current active tab focused."""
    enc_url = urllib.parse.quote(url, safe=":/#?=&%")
    new_tab_url = f"http://127.0.0.1:{port}/json/new?{enc_url}"
    try:
        req = urllib.request.Request(new_tab_url, method="PUT", headers={"User-Agent": "BrowserAgentFast/2.3"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            target = json.loads(resp.read().decode())
    except Exception as e:
        print(f"❌ Error creating new tab: {e}", file=sys.stderr)
        sys.exit(1)

    tid = target.get("id")
    if auto_switch and tid:
        activate_target(tid, port)

    ws_url = target.get("webSocketDebuggerUrl")
    if ws_url:
        client = CDPClient(ws_url)
        await client.connect()
        try:
            if auto_switch:
                await client.send("Page.bringToFront")
                await client.inject_hud()
                js = f"window.__aiCursor ? window.__aiCursor.status('Tab Baru: {url}') : false"
                await client.evaluate(js)
        finally:
            await client.close()

    mode_str = "Foreground (Aktif)" if auto_switch else "Background (Senyap)"
    print(f"✅ Tab baru dibuat [{mode_str}]: {url} (ID: {tid})")

def cmd_close(target_arg=None, port=DEFAULT_PORT):
    """
    Close a specific tab.
    Strict Window Protection: Blocks closing if only 1 tab remains, preventing accidental closure of user's browser window.
    """
    targets = get_all_targets(port)
    if len(targets) <= 1:
        print(f"⚠️ Safety Guard: Dilarang menutup tab terakhir di Chrome (Port {port}) agar jendela browser utama user tidak tertutup!", file=sys.stderr)
        return False

    target = resolve_target(target_arg, port)
    tid = target["id"]

    # In primary Chrome (port 9222), never close without explicit target
    if port == 9222 and not target_arg:
        print("⚠️ Safety Guard: Di Chrome utama (Port 9222), dilarang menutup tab tanpa menentukan target ID spesifik!", file=sys.stderr)
        return False

    close_url = f"http://127.0.0.1:{port}/json/close/{tid}"
    try:
        req = urllib.request.Request(close_url, headers={"User-Agent": "BrowserAgentFast/2.3"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            pass
        print(f"🗑️ Tab berhasil ditutup: {target.get('title', '')} (ID: {tid})")
        return True
    except Exception as e:
        print(f"❌ Error closing tab: {e}", file=sys.stderr)
        return False

async def cmd_done(tab=None, port=DEFAULT_PORT):
    """Explicitly dismiss the Live AI Cursor HUD and Lime Vignette (Zero Residual HUD)."""
    target = resolve_target(tab, port)
    ws_url = target.get("webSocketDebuggerUrl")
    if not ws_url:
        return
    client = CDPClient(ws_url)
    await client.connect()
    try:
        js = "window.__aiCursor ? window.__aiCursor.done() : false"
        await client.evaluate(js, await_promise=False)
        print(f"🧹 AI Cursor HUD & Lime Vignette telah dibersihkan dari layar ({target.get('title', 'Tab')}).")
    finally:
        await client.close()

async def cmd_open(url, auto_switch=True, port=DEFAULT_PORT):
    """Open/navigate URL on the target or first tab."""
    target = resolve_target(None, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        await client.send("Page.navigate", {"url": url})
        print(f"🌐 Navigating to {url} (CDP Port {port})")
        if auto_switch:
            await asyncio.sleep(0.35)
            await client.evaluate(get_hud_script(), await_promise=False)
            js = f"window.__aiCursor ? window.__aiCursor.status('Membuka: {url}') : false"
            await client.evaluate(js)
    finally:
        await client.close()

async def cmd_snapshot(tab=None, auto_switch=False, port=DEFAULT_PORT):
    """
    Sub-millisecond Accessibility Tree snapshot.
    Supports targeting any tab. Default in background mode (--no-switch).
    """
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)

    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        await client.send("Accessibility.enable")
        await client.send("DOM.enable")

        tree_res = await client.send("Accessibility.getFullAXTree")
        nodes = tree_res.get("nodes", [])

        interactive_roles = {
            "button", "link", "textbox", "searchbox", "checkbox", "radio", "combobox",
            "menuitem", "tab", "heading", "switch", "gridcell", "row", "columnheader"
        }

        interactive_nodes = []
        for n in nodes:
            if n.get("ignored"):
                continue
            role = n.get("role", {}).get("value")
            name = n.get("name", {}).get("value")
            if name and "Pause / Stop AI Control" in name:
                continue
            is_interactive = role in interactive_roles or (name and len(name.strip()) > 0)
            if is_interactive and "backendDOMNodeId" in n:
                interactive_nodes.append({
                    "backendNodeId": n["backendDOMNodeId"],
                    "role": role,
                    "name": name,
                    "value": n.get("value", {}).get("value"),
                    "description": n.get("description", {}).get("value")
                })

        dom_script = """
        (() => {
          const title = document.title || "";
          const url = location.href;
          const bodyClone = document.body ? document.body.cloneNode(true) : null;
          if (bodyClone) {
            bodyClone.querySelectorAll('#browser-agent-hud-root, #ba-vignette-overlay, #ba-control-capsule, #__ba_target_box').forEach(el => el.remove());
          }
          const text = bodyClone ? (bodyClone.innerText || '').slice(0, 10000) : '';
          const rows = [];
          document.querySelectorAll('tr, .quota-item, [role="row"], .card, .grid > div, [class*="quota"], [class*="row"]').forEach(el => {
            if (el.closest('#browser-agent-hud-root, #ba-vignette-overlay, #ba-control-capsule')) return;
            const t = (el.innerText || '').replace(/\\s+/g, ' ').trim();
            if (t && t.length > 4 && t.length < 250 && !rows.includes(t)) rows.push(t);
          });
          return { title, url, text, rows: rows.slice(0, 40) };
        })()
        """
        dom_res = await client.evaluate(dom_script)
        dom_val = dom_res.get("result", {}).get("value", {})

        output = {
            "status": "success",
            "targetTab": {"id": target.get("id"), "title": dom_val.get("title", ""), "url": dom_val.get("url", "")},
            "interactiveElementsCount": len(interactive_nodes),
            "interactiveElements": interactive_nodes[:60],
            "tableRows": dom_val.get("rows", []),
            "visibleTextPreview": dom_val.get("text", "")[:2000]
        }
        print(json.dumps(output, indent=2, ensure_ascii=False))
        return output
    finally:
        await client.close()

async def cmd_buttons(filter_text=None, fmt="table", tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Scan and list all actionable buttons and clickables on the page with coordinates."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()

        q_json = json.dumps(filter_text or "")
        js = f"window.__aiCursor ? window.__aiCursor.findButtons({q_json}) : []"
        res = await client.evaluate(js)
        buttons = res.get("result", {}).get("value") or []

        if fmt == "json":
            print(json.dumps(buttons, indent=2, ensure_ascii=False))
            return buttons

        print(f"\n🎯 Tombol & Elemen Interaktif di '{target.get('title', 'Page')}' (Total: {len(buttons)}):\n" + "=" * 85)
        for b in buttons:
            idx = b.get("index", 0)
            tag = b.get("tag", "")
            role = b.get("role", "")
            txt = b.get("text", "")
            if len(txt) > 35:
                txt = txt[:32] + "..."
            sel = b.get("selector", "")
            if len(sel) > 28:
                sel = sel[:25] + "..."
            center = b.get("center", {})
            cx, cy = center.get("x", 0), center.get("y", 0)
            print(f"[{idx:>2}] <{tag}> ({role:<6}) {txt:<35} | {sel:<28} | ({cx}, {cy})")
        print("=" * 85)
        print('💡 Klik instan via: python3 cdp_visual_agent.py click "<selector atau text>"\n')
        return buttons
    finally:
        await client.close()

async def cmd_table(fmt="markdown", auto_scroll=True, max_rows=200, tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Deep structured table extraction with optional virtual scroll auto-scrolling."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()

        opts = json.dumps({"maxRows": max_rows, "autoScroll": auto_scroll})
        js = f"window.__aiCursor ? await window.__aiCursor.extractTable({opts}) : {{}}"
        res = await client.evaluate(js)
        data = res.get("result", {}).get("value") or {}

        total = data.get("total_rows", 0)
        headers = data.get("headers", [])
        rows = data.get("rows", [])
        md = data.get("markdown", "")
        json_rows = data.get("data", [])

        if fmt == "json":
            output = {
                "status": "success",
                "sourceUrl": target.get("url", ""),
                "pageTitle": target.get("title", ""),
                "totalRows": total,
                "headers": headers,
                "data": json_rows
            }
            print(json.dumps(output, indent=2, ensure_ascii=False))
            return output
        elif fmt == "csv":
            buf = io.StringIO()
            writer = csv.writer(buf)
            if headers:
                writer.writerow(headers)
            for r in rows:
                writer.writerow(r)
            print(buf.getvalue())
            return buf.getvalue()
        else:
            if total == 0:
                print(f"⚠️ Tidak ditemukan tabel atau data grid pada tab '{target.get('title', '')}'.")
            else:
                print(f"\n📊 Hasil Ekstraksi Tabel ({total} baris, {len(headers)} kolom) dari '{target.get('title', '')}':\n")
                print(md)
            return data
    finally:
        await client.close()

async def cmd_extract(fmt="markdown", tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Extract clean readable article/content without ads, nav, or scripts."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()

        opts = json.dumps({"format": fmt})
        js = f"window.__aiCursor ? window.__aiCursor.extractContent({opts}) : {{}}"
        res = await client.evaluate(js)
        data = res.get("result", {}).get("value") or {}

        if fmt == "json":
            print(json.dumps(data, indent=2, ensure_ascii=False))
            return data
        elif fmt == "text":
            print(data.get("text", ""))
            return data.get("text", "")
        else:
            title = data.get("title", "")
            desc = data.get("description", "")
            wc = data.get("wordCount", 0)
            md = data.get("markdown", "")
            print(f"# {title}\n")
            if desc:
                print(f"> {desc}\n")
            print(f"**URL:** {target.get('url', '')} | **Words:** {wc}\n")
            print("---\n")
            print(md)
            return data
    finally:
        await client.close()

async def cmd_research(output_file=None, fmt="markdown", tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Comprehensive deep research dossier: metadata, JSON-LD, OpenGraph, outline, markdown, tables, links."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()

        js = "window.__aiCursor ? window.__aiCursor.extractResearchData() : {}"
        res = await client.evaluate(js)
        data = res.get("result", {}).get("value") or {}

        doc = data.get("document", {})
        headings = data.get("headings", [])
        links = data.get("links", [])
        og = data.get("openGraph", {})
        json_ld = data.get("jsonLd", [])
        md = data.get("contentMarkdown", "")

        synthesis = []
        synthesis.append(f"# Deep Research Dossier: {doc.get('title', 'Document')}\n")
        synthesis.append(f"- **Source URL:** {doc.get('url', '')}")
        synthesis.append(f"- **Canonical URL:** {doc.get('canonical', '')}")
        if doc.get("description"):
            synthesis.append(f"- **Summary/Description:** {doc.get('description')}")
        if doc.get("author"):
            synthesis.append(f"- **Author:** {doc.get('author')}")
        synthesis.append(f"- **Word Count:** {doc.get('wordCount', 0)} words (~{doc.get('readingTimeMinutes', 1)} min read)")
        synthesis.append("\n---\n")

        if headings:
            synthesis.append("## 📑 Headings Hierarchy / Table of Contents\n")
            for h in headings:
                indent = "  " * (h.get("level", 1) - 1)
                synthesis.append(f"{indent}- {h.get('text')}")
            synthesis.append("\n---\n")

        if og:
            synthesis.append("## 🌐 OpenGraph / Social Metadata\n")
            for k, v in og.items():
                synthesis.append(f"- **og:{k}**: {v}")
            synthesis.append("\n---\n")

        if json_ld:
            synthesis.append(f"## 🧩 Schema.org Structured Data ({len(json_ld)} Schemas Found)\n")
            for idx, item in enumerate(json_ld, 1):
                s_type = item.get("@type", "Schema")
                synthesis.append(f"- `Schema #{idx} ({s_type})`")
            synthesis.append("\n---\n")

        synthesis.append("## 📄 Core Article Content (Clean Markdown)\n")
        synthesis.append(md if md else "_Tidak ada konten artikel panjang yang terdeteksi._")
        synthesis.append("\n\n---\n")

        if links:
            synthesis.append(f"## 🔗 Key Outbound & Inbound References ({len(links)} Links)\n")
            for l in links[:30]:
                tag = "[External]" if l.get("isExternal") else "[Internal]"
                synthesis.append(f"- {tag} [{l.get('text') or 'Link'}]({l.get('url')})")
            synthesis.append("\n")

        formatted_report = "\n".join(synthesis)

        if output_file:
            if output_file.endswith(".json"):
                with open(output_file, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
            else:
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(formatted_report)
            print(f"💾 Deep research dossier saved to: {output_file}")
            print(f"📊 Extracted: {doc.get('wordCount', 0)} words, {len(headings)} headings, {len(links)} links, {len(json_ld)} schemas.")
        else:
            if fmt == "json":
                print(json.dumps(data, indent=2, ensure_ascii=False))
            else:
                print(formatted_report)

        return data
    finally:
        await client.close()

async def cmd_click(target_arg, label="", tab=None, auto_switch=True, port=DEFAULT_PORT):
    """Sub-millisecond click engine with Multi-Pass Anti-Miss Resolution & Hybrid Execution."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)

    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()
        await client.send("DOM.enable")

        lbl = label or f"Klik {target_arg}"
        is_node_id = str(target_arg).isdigit()

        if is_node_id:
            backend_node_id = int(target_arg)
            try:
                await client.send("DOM.scrollIntoViewIfNeeded", {"backendNodeId": backend_node_id})
                resolve_res = await client.send("DOM.resolveNode", {"backendNodeId": backend_node_id})
                obj = resolve_res.get("object", {})
                object_id = obj.get("objectId")

                if object_id:
                    calc_fn = """
                    function() {
                      const target = this.closest('button, [role="button"], a, input, select, textarea, [role="radio"], [role="checkbox"], [role="tab"], [role="menuitem"], label') || this;
                      if (typeof target.scrollIntoView === 'function') {
                        target.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
                      }
                      const rect = target.getBoundingClientRect ? target.getBoundingClientRect() : this.getBoundingClientRect();
                      try {
                        if (typeof target.click === 'function') target.click();
                        target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                      } catch (e) {}
                      return {
                        left: Math.round(rect.left),
                        top: Math.round(rect.top),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        x: Math.round(rect.left + rect.width / 2),
                        y: Math.round(rect.top + rect.height / 2),
                        text: (target.innerText || target.value || target.getAttribute('aria-label') || '').trim()
                      };
                    }
                    """
                    fn_res = await client.send("Runtime.callFunctionOn", {
                        "objectId": object_id,
                        "functionDeclaration": calc_fn,
                        "returnByValue": True
                    })
                    coords = fn_res.get("result", {}).get("value")

                    if coords and coords.get("x", 0) > 0 and coords.get("y", 0) > 0:
                        cx = coords["x"]
                        cy = coords["y"]
                        if auto_switch:
                            hud_trigger = f"""
                            if (window.__aiCursor) {{
                              window.__aiCursor.highlightRect({{
                                top: {coords['top']},
                                left: {coords['left']},
                                width: {coords['width']},
                                height: {coords['height']}
                              }}, {json.dumps(lbl)});
                              window.__aiCursor.click({cx}, {cy}, {json.dumps(lbl)});
                            }}
                            """
                            await client.evaluate(hud_trigger, await_promise=False)

                        await client.send("Input.dispatchMouseEvent", {"type": "mousePressed", "x": cx, "y": cy, "button": "left", "clickCount": 1})
                        await client.send("Input.dispatchMouseEvent", {"type": "mouseReleased", "x": cx, "y": cy, "button": "left", "clickCount": 1})
                        mode_tag = "Foreground" if auto_switch else "Background"
                        print(f"✅ Click dispatched [{mode_tag}] on backendNodeId {backend_node_id} at ({cx}, {cy}) [{coords.get('text', lbl)}]")
                        return True
            except Exception as e:
                print(f"⚠️ backendNodeId {backend_node_id} resolution notice: {e}", file=sys.stderr)

        js = f"""
        (async () => {{
          if (window.__aiCursor) {{
            return await window.__aiCursor.clickSelector({json.dumps(str(target_arg))}, {json.dumps(lbl)});
          }}
          let el = null;
          try {{ el = document.querySelector({json.dumps(str(target_arg))}); }} catch (e) {{}}
          if (!el) {{
            const q = {json.dumps(str(target_arg).lower())};
            const all = Array.from(document.querySelectorAll('button, [role="button"], a, input, [role="link"], label, span, p'));
            el = all.find(e => (e.innerText || e.value || '').trim().toLowerCase() === q)
              || all.find(e => (e.innerText || e.value || '').trim().toLowerCase().includes(q) && (e.innerText || '').trim().length <= q.length + 50);
          }}
          if (el) {{
            el.scrollIntoView({{ behavior: 'instant', block: 'center' }});
            const rect = el.getBoundingClientRect();
            const cx = Math.round(rect.left + rect.width / 2);
            const cy = Math.round(rect.top + rect.height / 2);
            try {{ el.click(); }} catch(e) {{}}
            return {{ success: true, text: (el.innerText || el.value || '').trim(), x: cx, y: cy }};
          }}
          return {{ success: false }};
        }})()
        """
        res = await client.evaluate(js)
        val = res.get("result", {}).get("value")
        if val and isinstance(val, dict) and val.get("success"):
            cx = val.get("x", 0)
            cy = val.get("y", 0)
            if cx > 0 and cy > 0:
                await client.send("Input.dispatchMouseEvent", {"type": "mousePressed", "x": cx, "y": cy, "button": "left", "clickCount": 1})
                await client.send("Input.dispatchMouseEvent", {"type": "mouseReleased", "x": cx, "y": cy, "button": "left", "clickCount": 1})
            mode_tag = "Foreground" if auto_switch else "Background"
            print(f"✅ Click succeeded [{mode_tag}] on '{target_arg}': {val.get('text', '')}")
            return True
        else:
            print(f"⚠️ Element '{target_arg}' not found or click failed.", file=sys.stderr)
            return False
    finally:
        await client.close()

async def cmd_type(target_arg, text, label="", press_enter=False, tab=None, auto_switch=True, port=DEFAULT_PORT):
    """Sub-millisecond typing engine with Multi-Pass Input Resolution & Hybrid Execution."""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)

    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        else:
            await client.inject_hud()
        await client.send("DOM.enable")

        lbl = label or f"Ketik '{text}' ke {target_arg}"
        is_node_id = str(target_arg).isdigit()

        if is_node_id:
            backend_node_id = int(target_arg)
            try:
                await client.send("DOM.scrollIntoViewIfNeeded", {"backendNodeId": backend_node_id})
                await client.send("DOM.focus", {"backendNodeId": backend_node_id})

                resolve_res = await client.send("DOM.resolveNode", {"backendNodeId": backend_node_id})
                obj = resolve_res.get("object", {})
                object_id = obj.get("objectId")

                if object_id:
                    clear_fn = """
                    function(lblText, shouldHud) {
                      const target = this.closest('input, textarea, [contenteditable="true"]') || this;
                      if (typeof target.focus === 'function') target.focus();
                      if ('value' in target) target.value = '';
                      else if (target.isContentEditable) target.innerText = '';
                      if (shouldHud && window.__aiCursor) window.__aiCursor.highlightElement(target, lblText);
                    }
                    """
                    await client.send("Runtime.callFunctionOn", {
                        "objectId": object_id,
                        "functionDeclaration": clear_fn,
                        "arguments": [{"value": lbl}, {"value": auto_switch}],
                        "userGesture": True
                    })

                await client.send("Input.insertText", {"text": text})

                react_sync_fn = """
                function(val) {
                  const target = this.closest('input, textarea, [contenteditable="true"]') || this;
                  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
                    || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                  if (setter) setter.call(target, val);
                  target.dispatchEvent(new Event('input', { bubbles: true }));
                  target.dispatchEvent(new Event('change', { bubbles: true }));
                }
                """
                if object_id:
                    await client.send("Runtime.callFunctionOn", {
                        "objectId": object_id,
                        "functionDeclaration": react_sync_fn,
                        "arguments": [{"value": text}],
                        "userGesture": True
                    })

                if press_enter:
                    await client.send("Input.dispatchKeyEvent", {"type": "keyDown", "text": "\\r", "unmodifiedText": "\\r", "windowsVirtualKeyCode": 13, "nativeVirtualKeyCode": 13, "key": "Enter", "code": "Enter"})
                    await client.send("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Enter", "code": "Enter", "windowsVirtualKeyCode": 13, "nativeVirtualKeyCode": 13})

                mode_tag = "Foreground" if auto_switch else "Background"
                print(f"✅ Instant text typed [{mode_tag}] via backendNodeId {backend_node_id}: '{text}' [{lbl}]")
                return True
            except Exception as e:
                print(f"⚠️ backendNodeId {backend_node_id} type notice: {e}", file=sys.stderr)

        js = f"""
        (async () => {{
          if (window.__aiCursor) {{
            return await window.__aiCursor.typeSelector({json.dumps(str(target_arg))}, {json.dumps(text)}, {json.dumps(lbl)});
          }}
          let el = null;
          try {{ el = document.querySelector({json.dumps(str(target_arg))}); }} catch (e) {{}}
          if (!el) {{
            const q = {json.dumps(str(target_arg).lower())};
            const inputs = Array.from(document.querySelectorAll('input, textarea, [contenteditable="true"]'));
            el = inputs.find(i => (i.placeholder || '').toLowerCase().includes(q) || (i.name || '').toLowerCase().includes(q) || (i.id || '').toLowerCase().includes(q));
          }}
          if (el) {{
            el.focus();
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (setter) setter.call(el, {json.dumps(text)});
            else el.value = {json.dumps(text)};
            el.dispatchEvent(new Event('input', {{ bubbles: true }}));
            el.dispatchEvent(new Event('change', {{ bubbles: true }}));
            return {{ success: true }};
          }}
          return {{ success: false }};
        }})()
        """
        res = await client.evaluate(js)
        val = res.get("result", {}).get("value")
        if val and isinstance(val, dict) and val.get("success"):
            if press_enter:
                await client.send("Input.dispatchKeyEvent", {"type": "keyDown", "text": "\\r", "unmodifiedText": "\\r", "windowsVirtualKeyCode": 13, "nativeVirtualKeyCode": 13, "key": "Enter", "code": "Enter"})
                await client.send("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Enter", "code": "Enter", "windowsVirtualKeyCode": 13, "nativeVirtualKeyCode": 13})
            mode_tag = "Foreground" if auto_switch else "Background"
            print(f"✅ Text typed [{mode_tag}] into '{target_arg}': '{text}'")
            return True
        else:
            print(f"⚠️ Field '{target_arg}' not found for typing.", file=sys.stderr)
            return False
    finally:
        await client.close()

async def cmd_scroll(delta_y, label="", tab=None, auto_switch=True, port=DEFAULT_PORT):
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        if auto_switch:
            await client.send("Page.bringToFront")
            await client.inject_hud()
        lbl = label or f"Scroll {delta_y}px"
        js = f"window.__aiCursor ? window.__aiCursor.scroll({int(delta_y)}, {json.dumps(lbl)}) : window.scrollBy(0, {int(delta_y)})"
        await client.evaluate(js)
        print(f"✅ Scrolled {delta_y}px ({lbl})")
    finally:
        await client.close()

async def cmd_status(text, tab=None, port=DEFAULT_PORT):
    target = resolve_target(tab, port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        await client.send("Page.bringToFront")
        await client.inject_hud()
        js = f"window.__aiCursor ? window.__aiCursor.status({json.dumps(text)}) : false"
        await client.evaluate(js)
        print(f"✅ Status updated: {text}")
    finally:
        await client.close()

async def cmd_screenshot(output_path, tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Capture screenshot. Works in background on any tab without bringing it to front!"""
    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        fmt = "webp" if output_path.endswith(".webp") else "png"
        params = {"format": fmt}
        if fmt == "webp":
            params["quality"] = 85
        res = await client.send("Page.captureScreenshot", params)
        data = base64.b64decode(res.get("data", ""))
        with open(output_path, "wb") as f:
            f.write(data)
        mode_str = "Foreground" if auto_switch else "Background"
        print(f"📸 Screenshot saved [{mode_str}] to {output_path} ({len(data)} bytes, {fmt})")
    finally:
        await client.close()


async def cmd_wait(target_arg=None, timeout_ms=10000, tab=None, auto_switch=False, port=DEFAULT_PORT):
    """Wait for network/DOM animations to settle (sleep) OR wait for selector/element to appear."""
    is_numeric = False
    duration_s = 2.0
    if target_arg:
        try:
            duration_s = float(target_arg)
            is_numeric = True
        except ValueError:
            is_numeric = False

    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        await client.inject_hud()
        if is_numeric or not target_arg:
            if auto_switch:
                await client.evaluate(f'window.__aiCursor && window.__aiCursor.status("Menunggu {duration_s} detik...")')
            await asyncio.sleep(duration_s)
            print(f"⏱️ Jeda tunggu {duration_s}s selesai di '{target.get('title', '')}'.")
            return {"status": "success", "waitedSeconds": duration_s}
        else:
            selector = str(target_arg)
            print(f"⏳ Menunggu elemen '{selector}' (timeout {timeout_ms}ms)...")
            script = f"""
            (async () => {{
                if (window.__aiCursor && typeof window.__aiCursor.waitForSelector === 'function') {{
                    return await window.__aiCursor.waitForSelector({json.dumps(selector)}, {timeout_ms});
                }}
                const start = Date.now();
                while (Date.now() - start < {timeout_ms}) {{
                    let el = document.querySelector({json.dumps(selector)});
                    if (el) return {{ success: true, elapsedMs: Date.now() - start, text: (el.innerText || el.value || '').trim() }};
                    await new Promise(r => setTimeout(r, 250));
                }}
                return {{ success: false, reason: "Timeout waiting for element" }};
            }})()
            """
            res = await client.evaluate(script)
            val = res.get("result", {}).get("value", {})
            if val.get("success"):
                print(f"✅ Elemen ditemukan dalam {val.get('elapsedMs', 0)}ms: '{selector}' (Text: {val.get('text', '')})")
            else:
                print(f"⚠️ {val.get('reason', 'Elemen tidak muncul')} ({selector})", file=sys.stderr)
            return val
    finally:
        await client.close()

async def cmd_form(form_input, tab=None, auto_switch=True, port=DEFAULT_PORT):
    """Fill multiple form fields intelligently in one shot (matching labels, inputs, selects, checkboxes)."""
    if not form_input:
        print("Usage: python3 cdp_visual_agent.py form '<json_string_or_filepath>' [--tab TAB]", file=sys.stderr)
        return

    data = {}
    if os.path.exists(form_input):
        with open(form_input, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        try:
            data = json.loads(form_input)
        except Exception as e:
            pairs = form_input.split()
            for p in pairs:
                if "=" in p:
                    k, v = p.split("=", 1)
                    data[k.strip()] = v.strip()
            if not data:
                print(f"❌ Error: Format JSON formulir tidak valid: {e}", file=sys.stderr)
                return

    target = resolve_target(tab, port)
    if auto_switch:
        activate_target(target["id"], port)
    ws_url = target.get("webSocketDebuggerUrl")
    client = CDPClient(ws_url)
    await client.connect()
    try:
        await client.inject_hud()
        if auto_switch:
            await client.send("Page.bringToFront")

        script = f"""
        (async () => {{
            if (window.__aiCursor && typeof window.__aiCursor.fillForm === 'function') {{
                return await window.__aiCursor.fillForm({json.dumps(data)});
            }}
            return {{ error: "fillForm not available" }};
        }})()
        """
        res = await client.evaluate(script)
        results = res.get("result", {}).get("value", {})

        print(f"\n📝 Hasil Pengisian Formulir di '{target.get('title', '')}':")
        print("=" * 60)
        success_count = 0
        for field, detail in results.items():
            if detail.get("success"):
                success_count += 1
                val_display = detail.get("value") or detail.get("checked") or "OK"
                print(f"  ✅ [{field}] -> {val_display}")
            else:
                print(f"  ❌ [{field}] -> Gagal ({detail.get('reason', 'Not found')})")
        print("=" * 60)
        print(f"📊 Berhasil terisi: {success_count}/{len(data)} fields.\n")
        return results
    finally:
        await client.close()

def cmd_organize(close_duplicates=False, port=DEFAULT_PORT):
    """Analyze open tabs, group by host/domain, identify duplicates, and optionally close duplicates."""
    targets = get_all_targets(port)
    if not targets:
        print(f"❌ Tidak ada tab aktif di Chrome port {port}.")
        return

    from collections import defaultdict
    by_host = defaultdict(list)
    by_url = defaultdict(list)

    for idx, t in enumerate(targets, 1):
        url = t.get("url", "")
        parsed = urllib.parse.urlparse(url)
        host = parsed.netloc or "Local / Internal"
        t_info = {
            "index": idx,
            "id": t.get("id"),
            "title": t.get("title", ""),
            "url": url,
            "host": host
        }
        by_host[host].append(t_info)
        by_url[url].append(t_info)

    duplicates = {url: tabs for url, tabs in by_url.items() if len(tabs) > 1 and url not in ("about:blank", "chrome://newtab/")}

    print(f"\n📑 Analisis Tab Aktif Chrome (Total: {len(targets)} tab):")
    print("=" * 70)
    for host, tabs in by_host.items():
        print(f"\n🌐 Domain: {host} ({len(tabs)} tab)")
        for t in tabs:
            dup_tag = " ⚠️ [DUPLIKAT]" if t["url"] in duplicates else ""
            print(f"   [{t['index']:2d}] {t['title'][:45]:<45} | {t['url'][:40]}{dup_tag}")

    print("\n" + "=" * 70)
    if duplicates:
        print(f"⚠️ Terdeteksi {len(duplicates)} URL duplikat:")
        closed_count = 0
        for url, dup_tabs in duplicates.items():
            print(f"   - URL: {url} ({len(dup_tabs)} duplikat)")
            if close_duplicates:
                to_close = dup_tabs[1:]
                for dt in to_close:
                    current_targets = get_all_targets(port)
                    if len(current_targets) <= 1:
                        print("     🛑 Dihentikan: Tab terakhir diproteksi.")
                        break
                    try:
                        req = urllib.request.Request(f"http://localhost:{port}/json/close/{dt['id']}")
                        with urllib.request.urlopen(req, timeout=3) as resp:
                            closed_count += 1
                            print(f"     🗑️ Menutup duplikat tab #{dt['index']}: {dt['title'][:30]}")
                    except Exception as e:
                        print(f"     ❌ Gagal menutup tab #{dt['index']}: {e}")
        if close_duplicates:
            print(f"✅ Selesai membersihkan {closed_count} tab duplikat!")
        else:
            print("💡 Jalankan dengan flag '--close-duplicates' untuk menutup tab duplikat secara otomatis.")
    else:
        print("✅ Semua tab rapi! Tidak ada tab duplikat yang terdeteksi.")
    print()

def parse_hybrid_args(raw_args):
    clean_positionals = []
    tab = None
    auto_switch = True
    port = DEFAULT_PORT
    press_enter = False
    fmt = "markdown"
    auto_scroll = True
    max_rows = 200
    output_path = None
    timeout_ms = 10000
    close_duplicates = False

    i = 0
    while i < len(raw_args):
        arg = raw_args[i]
        if arg == "--tab" and i + 1 < len(raw_args):
            tab = raw_args[i + 1]
            i += 2
        elif arg in ("--no-switch", "--bg", "--background"):
            auto_switch = False
            i += 1
        elif arg in ("--switch", "--foreground", "--fg"):
            auto_switch = True
            i += 1
        elif arg == "--port" and i + 1 < len(raw_args):
            port = int(raw_args[i + 1])
            i += 2
        elif arg in ("--enter", "--press-enter"):
            press_enter = True
            i += 1
        elif arg in ("--format", "--fmt") and i + 1 < len(raw_args):
            fmt = raw_args[i + 1].lower()
            i += 2
        elif arg in ("--json", "-j"):
            fmt = "json"
            i += 1
        elif arg in ("--no-scroll", "--noscroll"):
            auto_scroll = False
            i += 1
        elif arg in ("--scroll", "--auto-scroll"):
            auto_scroll = True
            i += 1
        elif arg in ("--max-rows", "--rows", "-n") and i + 1 < len(raw_args):
            max_rows = int(raw_args[i + 1])
            i += 2
        elif arg in ("--output", "-o", "--file") and i + 1 < len(raw_args):
            output_path = raw_args[i + 1]
            i += 2
        elif arg in ("--timeout", "-t") and i + 1 < len(raw_args):
            timeout_ms = int(raw_args[i + 1])
            i += 2
        elif arg in ("--close-duplicates", "--close-dups", "--dedup", "--clean-dups"):
            close_duplicates = True
            i += 1
        else:
            clean_positionals.append(arg)
            i += 1

    return clean_positionals, tab, auto_switch, port, press_enter, fmt, auto_scroll, max_rows, output_path, timeout_ms, close_duplicates

def main():
    if len(sys.argv) < 2 or sys.argv[1].lower() in ("--help", "-h", "help"):
        print("Usage: python3 cdp_visual_agent.py <command> [args...] [--tab <idx/name>] [--switch|--no-switch] [--port <port>] [--json]")
        print("Commands: tabs, switch, new, close, done, open, snapshot, buttons, table, extract, research, links, eval, click, type, form, wait, organize, scroll, status, screenshot")
        sys.exit(0 if len(sys.argv) >= 2 and sys.argv[1].lower() in ("--help", "-h", "help") else 1)

    cmd = sys.argv[1].lower()
    pos_args, tab, auto_switch, port, press_enter, fmt, auto_scroll, max_rows, output_path, timeout_ms, close_duplicates = parse_hybrid_args(sys.argv[2:])

    if cmd == "tabs":
        p = int(pos_args[0]) if pos_args and pos_args[0].isdigit() else port
        cmd_tabs(p, fmt=fmt)
    elif cmd == "switch":
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py switch <index_or_id_or_title> [--port PORT]", file=sys.stderr)
            sys.exit(1)
        asyncio.run(cmd_switch(pos_args[0], port))
    elif cmd in ("new", "new_tab"):
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py new <url> [--no-switch] [--port PORT]", file=sys.stderr)
            sys.exit(1)
        asyncio.run(cmd_new(pos_args[0], auto_switch=auto_switch, port=port))
    elif cmd in ("close", "close_tab"):
        target = pos_args[0] if pos_args else tab
        cmd_close(target, port)
    elif cmd in ("done", "finish", "clear", "hide", "dismiss"):
        target = pos_args[0] if pos_args else tab
        asyncio.run(cmd_done(tab=target, port=port))
    elif cmd == "open":
        url = pos_args[0] if pos_args else "http://localhost:3000"
        asyncio.run(cmd_open(url, auto_switch=auto_switch, port=port))
    elif cmd == "snapshot":
        target_tab = tab or (pos_args[0] if pos_args and (pos_args[0].isdigit() or len(pos_args[0]) > 4) else None)
        asyncio.run(cmd_snapshot(tab=target_tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("buttons", "btn", "find_buttons"):
        query = pos_args[0] if pos_args else None
        asyncio.run(cmd_buttons(filter_text=query, fmt=fmt, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("table", "extract_table", "grid"):
        table_fmt = fmt if fmt in ("json", "csv", "markdown") else "markdown"
        asyncio.run(cmd_table(fmt=table_fmt, auto_scroll=auto_scroll, max_rows=max_rows, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("extract", "content", "markdown", "read"):
        ext_fmt = fmt if fmt in ("json", "text", "markdown") else "markdown"
        asyncio.run(cmd_extract(fmt=ext_fmt, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("research", "deep_research", "inspect_research"):
        out_f = output_path or (pos_args[0] if pos_args else None)
        asyncio.run(cmd_research(output_file=out_f, fmt=fmt, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("links", "urls", "serp"):
        query = pos_args[0] if pos_args else None
        asyncio.run(cmd_links(query=query, fmt=fmt, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("eval", "js", "evaluate"):
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py eval <javascript_expression> [--tab TAB] [--format json] [--port PORT]", file=sys.stderr)
            sys.exit(1)
        expr = " ".join(pos_args)
        asyncio.run(cmd_eval(expr, fmt=fmt, tab=tab, auto_switch=auto_switch, port=port))
    elif cmd in ("wait", "sleep"):
        target_arg = pos_args[0] if pos_args else None
        asyncio.run(cmd_wait(target_arg, timeout_ms=timeout_ms, tab=tab, auto_switch=(auto_switch if "--switch" in sys.argv else False), port=port))
    elif cmd in ("form", "fill", "fill_form"):
        form_data = pos_args[0] if pos_args else None
        asyncio.run(cmd_form(form_data, tab=tab, auto_switch=auto_switch, port=port))
    elif cmd in ("organize", "organize_tabs", "tabs_organize", "dedup"):
        cmd_organize(close_duplicates=close_duplicates, port=port)
    elif cmd == "click":
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py click <target_or_node_id> [label] [--tab TAB] [--no-switch]", file=sys.stderr)
            sys.exit(1)
        target = pos_args[0]
        lbl = pos_args[1] if len(pos_args) > 1 else ""
        asyncio.run(cmd_click(target, lbl, tab=tab, auto_switch=auto_switch, port=port))
    elif cmd == "type":
        if len(pos_args) < 2:
            print("Usage: python3 cdp_visual_agent.py type <target_or_node_id> <text> [label] [--tab TAB] [--no-switch]", file=sys.stderr)
            sys.exit(1)
        target = pos_args[0]
        text = pos_args[1]
        lbl = pos_args[2] if len(pos_args) > 2 else ""
        asyncio.run(cmd_type(target, text, lbl, press_enter=press_enter, tab=tab, auto_switch=auto_switch, port=port))
    elif cmd == "scroll":
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py scroll <delta_y> [label] [--tab TAB] [--no-switch]", file=sys.stderr)
            sys.exit(1)
        delta = int(pos_args[0])
        lbl = pos_args[1] if len(pos_args) > 1 else ""
        asyncio.run(cmd_scroll(delta, lbl, tab=tab, auto_switch=auto_switch, port=port))
    elif cmd == "status":
        if not pos_args:
            print("Usage: python3 cdp_visual_agent.py status <text>", file=sys.stderr)
            sys.exit(1)
        asyncio.run(cmd_status(pos_args[0], tab=tab, port=port))
    elif cmd == "screenshot":
        path = pos_args[0] if pos_args else os.path.join(tempfile.gettempdir(), f"screenshot-{int(time.time())}.webp")
        asyncio.run(cmd_screenshot(path, tab=tab, auto_switch=auto_switch, port=port))
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)

if __name__ == "__main__":
    main()
