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
