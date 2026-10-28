#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

export function compileDeck(inputPath, options = {}) {
  const content = readFileSync(inputPath, 'utf8');
  if (inputPath.endsWith('.json')) {
    const data = JSON.parse(content);
    return compileJsonDeck(data, options);
  } else {
    return compileMarkdownDeck(content, options);
  }
}

export function compileMarkdownDeck(markdownText, options = {}) {
  const lines = markdownText.split('\n');
  let globalTheme = options.theme || 'modern-clean';
  let globalTransition = 'slide';
  let documentTitle = options.title || 'Presentation Slide Deck';

  const rawSlides = [];
  let currentSlideLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') {
      if (currentSlideLines.length > 0) {
        rawSlides.push(currentSlideLines);
        currentSlideLines = [];
      }
    } else {
      currentSlideLines.push(line);
    }
  }
  if (currentSlideLines.length > 0) {
    rawSlides.push(currentSlideLines);
  }

  // Parse each slide
  const parsedSlides = rawSlides.map((slideLines, index) => {
    let layout = 'standard';
    let kicker = '';
    let theme = globalTheme;
    let transition = globalTransition;
    let metadata = '';
    const bodyLines = [];

    for (const rawLine of slideLines) {
      const trimmed = rawLine.trim();
      const themeMatch = trimmed.match(/^<!--\s*theme:\s*([a-zA-Z0-9_-]+)\s*-->$/i);
      const layoutMatch = trimmed.match(/^<!--\s*layout:\s*([a-zA-Z0-9_-]+)\s*-->$/i);
      const kickerMatch = trimmed.match(/^<!--\s*kicker:\s*(.*?)\s*-->$/i);
      const transMatch = trimmed.match(/^<!--\s*transition:\s*([a-zA-Z0-9_-]+)\s*-->$/i);
      const metaMatch = trimmed.match(/^<!--\s*metadata:\s*(.*?)\s*-->$/i);

      if (themeMatch) {
        if (index === 0 && !options.theme) globalTheme = themeMatch[1].toLowerCase();
        theme = options.theme || themeMatch[1].toLowerCase();
      } else if (layoutMatch) {
        layout = layoutMatch[1].toLowerCase();
      } else if (kickerMatch) {
        kicker = kickerMatch[1].trim();
      } else if (transMatch) {
        if (index === 0) globalTransition = transMatch[1].toLowerCase();
        transition = transMatch[1].toLowerCase();
      } else if (metaMatch) {
        metadata = metaMatch[1].trim();
      } else {
        bodyLines.push(rawLine);
      }
    }

    if (layout === 'standard' && index === 0) {
      layout = 'cover';
    }

    const htmlContent = renderSlideBody(bodyLines, layout, kicker, metadata);
    return {
      index: index + 1,
      layout,
      theme,
      kicker,
      metadata,
      htmlContent,
    };
  });

  return generateFullDeckHtml(parsedSlides, documentTitle, globalTheme);
}

export function compileJsonDeck(jsonObj, options = {}) {
  const documentTitle = options.title || jsonObj.title || 'Presentation Slide Deck';
  const globalTheme = options.theme || jsonObj.themePack || 'modern-clean';
  const slides = jsonObj.slides || [];

  const parsedSlides = slides.map((slide, idx) => {
    const content = slide.content || {};
    const kicker = content.kicker || content.eyebrow || '';
    const title = content.title || content.bespokeTitle || '';
    const subtitle = content.subtitle || content.summary || '';
    const metadata = content.metadata || '';

    let layout = 'standard';
    if (idx === 0) layout = 'cover';
    else if (content.stats && content.stats.length > 0) layout = 'metrics';
    else if (content.cards && content.cards.length > 0) layout = 'grid';
    else if (content.steps && content.steps.length > 0) layout = 'flow';
    else if (content.quote) layout = 'quote';
    else if (content.comparison || content.columns) layout = 'split';

    if (slide.variants && slide.variants.length > 0) {
      const v = slide.variants.find(item => item.id === slide.selectedVariant) || slide.variants[0];
      if (v && v.layout) {
        const lName = v.layout.toLowerCase();
        if (lName.includes('cover') || lName.endsWith('001') || lName.endsWith('002')) layout = 'cover';
        else if (lName.includes('metric') || lName.endsWith('008')) layout = 'metrics';
        else if (lName.includes('grid') || lName.includes('card')) layout = 'grid';
        else if (lName.includes('flow') || lName.includes('step')) layout = 'flow';
        else if (lName.includes('quote')) layout = 'quote';
      }
    }

    let htmlContent = '';
    if (layout === 'cover') {
      htmlContent = `
        <h1 contenteditable="true">${escapeHtml(title)}</h1>
        ${subtitle ? `<h3 contenteditable="true">${escapeHtml(subtitle)}</h3>` : ''}
        ${content.bespokePoints ? `<ul>${content.bespokePoints.map(p => `<li contenteditable="true">${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
        ${metadata ? `<div class="slide-footer-meta" contenteditable="true">${escapeHtml(metadata)}</div>` : ''}
      `;
    } else if (layout === 'metrics') {
      htmlContent = `
        <h2 contenteditable="true">${escapeHtml(title)}</h2>
        ${subtitle ? `<p contenteditable="true">${escapeHtml(subtitle)}</p>` : ''}
        <div class="metrics-grid">
          ${(content.stats || []).map(st => `
            <div class="metric-card">
              <div class="metric-value" contenteditable="true">${escapeHtml(st.value)}${escapeHtml(st.unit || '')}</div>
              <div class="metric-label" contenteditable="true">${escapeHtml(st.label)}</div>
              ${st.desc ? `<div class="metric-desc" contenteditable="true">${escapeHtml(st.desc)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'grid') {
      htmlContent = `
        <h2 contenteditable="true">${escapeHtml(title)}</h2>
        ${subtitle ? `<p contenteditable="true">${escapeHtml(subtitle)}</p>` : ''}
        <div class="cards-container">
          ${(content.cards || []).map(c => `
            <div class="grid-card">
              <h4 contenteditable="true">${escapeHtml(c.title)}</h4>
              <p contenteditable="true">${escapeHtml(c.desc || c.detail || '')}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'flow') {
      htmlContent = `
        <h2 contenteditable="true">${escapeHtml(title)}</h2>
        ${subtitle ? `<p contenteditable="true">${escapeHtml(subtitle)}</p>` : ''}
        <div class="flow-container">
          ${(content.steps || []).map((st, sidx) => `
            <div class="flow-step">
              <div class="step-num">${escapeHtml(st.num || sidx + 1)}</div>
              <h4 contenteditable="true">${escapeHtml(st.title)}</h4>
              <p contenteditable="true">${escapeHtml(st.desc || '')}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'quote') {
      htmlContent = `
        <div class="quote-spotlight">
          <div class="quote-mark" aria-hidden="true">“</div>
          <blockquote contenteditable="true">${escapeHtml(content.quote || title)}</blockquote>
          ${subtitle ? `<div class="quote-attribution" contenteditable="true">— ${escapeHtml(subtitle)}</div>` : ''}
        </div>
      `;
    } else {
      htmlContent = `
        <h2 contenteditable="true">${escapeHtml(title)}</h2>
        ${subtitle ? `<p contenteditable="true">${escapeHtml(subtitle)}</p>` : ''}
        ${content.points || content.bullets ? `<ul>${(content.points || content.bullets).map(p => `<li contenteditable="true">${escapeHtml(p)}</li>`).join('')}</ul>` : ''}
      `;
    }

    return {
      index: idx + 1,
      layout,
      theme: globalTheme,
      kicker,
      metadata,
      htmlContent
    };
  });

  return generateFullDeckHtml(parsedSlides, documentTitle, globalTheme);
}

function generateFullDeckHtml(parsedSlides, documentTitle, globalTheme) {
  const themeTokens = getThemeStyles(globalTheme);

  return `<!DOCTYPE html>
<html lang="en" data-theme="${escapeHtml(globalTheme)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(documentTitle)}</title>
<!-- Modern typography pairings (Display + Body) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">

<style>
  :root {
    --deck-scale: 1;
    --slide-width: 1920px;
    --slide-height: 1080px;
    --topbar-height: 54px;
    --rail-width: 240px;
    --font-heading: 'Plus Jakarta Sans', 'Archivo', 'Manrope', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', 'Space Grotesk', system-ui, -apple-system, sans-serif;
    --font-mono: 'IBM Plex Mono', 'Space Mono', ui-monospace, monospace;
    ${themeTokens.cssVariables}
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg-canvas);
    color: var(--text-main);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Presentation Deck Top Navigation Bar */
  .deck-topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--topbar-height);
    background: var(--topbar-bg, rgba(15, 23, 42, 0.88));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--topbar-border, rgba(255, 255, 255, 0.1));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    z-index: 1000;
    user-select: none;
  }

  .deck-topbar-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .deck-brand-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-title);
  }

  .deck-brand-icon {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--accent-color);
    color: var(--accent-contrast);
    font-size: 12px;
    font-weight: 800;
  }

  .deck-title-display {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    max-width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .slide-count-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-main);
  }

  .deck-topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .topbar-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 7px;
    border: 1px solid var(--hud-border, rgba(255, 255, 255, 0.14));
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-main);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .topbar-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--accent-color);
    color: var(--text-title);
  }

  .topbar-btn-primary {
    background: var(--accent-color);
    color: var(--accent-contrast);
    border-color: var(--accent-color);
  }

  .topbar-btn-primary:hover {
    filter: brightness(1.1);
    color: var(--accent-contrast);
  }

  .topbar-select {
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 7px;
    border: 1px solid var(--hud-border, rgba(255, 255, 255, 0.14));
    background: var(--topbar-bg, #18191e);
    color: var(--text-main);
    cursor: pointer;
    outline: none;
  }

  /* Dropdown Menu */
  .dropdown-wrap {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    min-width: 190px;
    background: var(--hud-bg, #18191e);
    border: 1px solid var(--hud-border, rgba(255, 255, 255, 0.16));
    border-radius: 9px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
    padding: 6px;
    z-index: 1050;
  }

  .dropdown-content.show {
    display: block;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-main);
    background: transparent;
    border: 0;
    border-radius: 6px;
    text-align: left;
    cursor: pointer;
    transition: background 0.12s ease;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-title);
  }

  /* Left Sidebar: Filmstrip / Slide Rail */
  .slide-rail {
    position: fixed;
    top: var(--topbar-height);
    left: 0;
    bottom: 0;
    width: var(--rail-width);
    background: var(--rail-bg, rgba(15, 23, 42, 0.7));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-right: 1px solid var(--rail-border, rgba(255, 255, 255, 0.1));
    display: flex;
    flex-direction: column;
    z-index: 900;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide-rail.collapsed {
    transform: translateX(calc(-1 * var(--rail-width)));
  }

  .slide-rail-head {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .slide-rail-title {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .slide-rail-list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .slide-rail-list::-webkit-scrollbar {
    width: 6px;
  }
  .slide-rail-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 999px;
  }

  .rail-card {
    position: relative;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .rail-card:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }

  .rail-card.active {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color);
    background: rgba(255, 255, 255, 0.08);
  }

  .rail-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
  }

  .rail-card-num {
    font-weight: 700;
  }

  .rail-card-layout {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 9px;
    opacity: 0.8;
  }

  .rail-card-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bg-slide);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    font-size: 8px;
    line-height: 1.2;
    color: var(--text-main);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .rail-thumb-text {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 8.5px;
    font-weight: 600;
  }

  .rail-card-actions {
    position: absolute;
    top: 4px;
    right: 4px;
    display: none;
    gap: 3px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    padding: 2px 4px;
    border-radius: 5px;
  }

  .rail-card:hover .rail-card-actions {
    display: flex;
  }

  .rail-action-btn {
    background: transparent;
    border: 0;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 3px;
  }

  .rail-action-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .rail-add-slide-btn {
    width: 100%;
    padding: 8px;
    border-radius: 7px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    background: transparent;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.15s ease;
  }

  .rail-add-slide-btn:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    background: rgba(255, 255, 255, 0.04);
  }

  /* Rail Toggle Button */
  .rail-toggle-btn {
    position: fixed;
    top: calc(var(--topbar-height) + 12px);
    left: var(--rail-width);
    z-index: 950;
    width: 24px;
    height: 32px;
    background: var(--topbar-bg, #18191e);
    border: 1px solid var(--rail-border, rgba(255, 255, 255, 0.15));
    border-left: 0;
    border-radius: 0 6px 6px 0;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    transition: left 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease;
  }

  .rail-toggle-btn:hover {
    color: var(--accent-color);
  }

  .slide-rail.collapsed + .rail-toggle-btn {
    left: 0;
  }

  /* Presentation Stage Viewport */
  .deck-viewport {
    position: fixed;
    top: var(--topbar-height);
    left: var(--rail-width);
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide-rail.collapsed ~ .deck-viewport {
    left: 0;
  }

  /* Present Mode (F5 Fullscreen Clean View) */
  body[data-mode="present"] .deck-topbar,
  body[data-mode="present"] .slide-rail,
  body[data-mode="present"] .rail-toggle-btn,
  body[data-mode="present"] .deck-hud {
    display: none !important;
  }

  body[data-mode="present"] .deck-viewport {
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: #000000 !important;
  }

  .slide-stage {
    position: relative;
    width: var(--slide-width);
    height: var(--slide-height);
    transform-origin: center center;
    transform: scale(var(--deck-scale, 1));
    aspect-ratio: 16 / 9;
    flex-shrink: 0;
    box-shadow: var(--stage-shadow);
    background: var(--bg-slide);
    border-radius: var(--stage-radius);
    overflow: hidden;
  }

  .slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 80px 100px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    transform: translateX(50px);
    overflow: hidden;
  }

  .slide.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    z-index: 2;
  }

  .slide.prev {
    transform: translateX(-50px);
  }

  /* Kicker / Overline Badge */
  .kicker {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-color);
    margin-bottom: 22px;
  }

  /* Slide Footer Metadata */
  .slide-footer-meta {
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Typography Hierarchies */
  h1 {
    font-family: var(--font-heading);
    font-size: clamp(56px, 4.8vw, 92px);
    font-weight: 850;
    line-height: 1.06;
    letter-spacing: -0.028em;
    color: var(--text-title);
    margin-bottom: 24px;
    text-wrap: balance;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(40px, 3.4vw, 58px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.022em;
    color: var(--text-title);
    margin-bottom: 18px;
    text-wrap: balance;
  }

  h3 {
    font-family: var(--font-body);
    font-size: clamp(24px, 2.1vw, 34px);
    font-weight: 500;
    line-height: 1.35;
    color: var(--text-muted);
    margin-bottom: 36px;
    max-width: 72ch;
  }

  p {
    font-size: 22px;
    line-height: 1.55;
    color: var(--text-body);
    margin-bottom: 24px;
    max-width: 68ch;
  }

  ul, ol {
    margin: 16px 0 32px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  li {
    font-size: 22px;
    line-height: 1.5;
    color: var(--text-body);
  }

  li strong {
    color: var(--text-title);
    font-weight: 700;
  }

  /* Layout Archetypes */
  .layout-cover {
    justify-content: center;
    align-items: flex-start;
    padding-left: 130px;
    padding-right: 130px;
  }

  .layout-cover h1 {
    font-size: 96px;
    margin-bottom: 24px;
  }

  .layout-cover h3 {
    font-size: 34px;
    margin-bottom: 44px;
  }

  .layout-metrics {
    justify-content: flex-start;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 30px;
    margin-top: 28px;
    width: 100%;
  }

  .metric-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 38px 34px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: var(--card-shadow);
  }

  .metric-value {
    font-family: var(--font-heading);
    font-size: 68px;
    font-weight: 850;
    letter-spacing: -0.025em;
    color: var(--accent-color);
    line-height: 1;
  }

  .metric-label {
    font-size: 19px;
    font-weight: 650;
    color: var(--text-title);
  }

  .metric-desc {
    font-size: 16px;
    line-height: 1.45;
    color: var(--text-muted);
  }

  .layout-split {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 68px;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .split-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 100%;
  }

  .split-col-primary h1, .split-col-primary h2 {
    margin-bottom: 0;
  }

  .comparison-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 28px;
    width: 100%;
  }

  .comparison-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 36px 32px;
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .comparison-card.card-accent {
    border-color: var(--accent-color);
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.4);
  }

  .comparison-card h4 {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
    color: var(--text-title);
    margin: 0;
  }

  .cards-container, .bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 26px;
    margin-top: 28px;
    width: 100%;
  }

  .grid-card.card-wide {
    grid-column: span 2;
  }

  .grid-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 15px;
    padding: 32px;
    box-shadow: var(--card-shadow);
  }

  .grid-card h4 {
    font-family: var(--font-heading);
    font-size: 23px;
    font-weight: 750;
    color: var(--text-title);
    margin-bottom: 12px;
  }

  .grid-card p {
    font-size: 17px;
    line-height: 1.55;
    color: var(--text-muted);
    margin: 0;
  }

  .flow-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 22px;
    margin-top: 36px;
    width: 100%;
  }

  .flow-step {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 15px;
    padding: 30px 24px;
    position: relative;
    box-shadow: var(--card-shadow);
  }

  .step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--accent-color);
    color: var(--accent-contrast);
    font-family: var(--font-mono);
    font-weight: 750;
    font-size: 16px;
    margin-bottom: 18px;
  }

  /* Quote Spotlight */
  .layout-quote {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 160px;
  }

  .quote-spotlight {
    position: relative;
    max-width: 1200px;
  }

  .quote-mark {
    font-family: var(--font-heading);
    font-size: 140px;
    line-height: 0.8;
    color: var(--accent-color);
    opacity: 0.4;
    margin-bottom: 10px;
  }

  blockquote {
    font-family: var(--font-heading);
    font-size: clamp(34px, 2.8vw, 48px);
    font-weight: 600;
    line-height: 1.32;
    color: var(--text-title);
    margin-bottom: 28px;
    font-style: italic;
  }

  .quote-attribution {
    font-family: var(--font-body);
    font-size: 20px;
    font-weight: 600;
    color: var(--accent-color);
    letter-spacing: 0.04em;
  }

  /* Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 28px 0;
    font-size: 18px;
  }

  th {
    background: var(--table-header-bg);
    color: var(--text-title);
    font-weight: 700;
    text-align: left;
    padding: 16px 20px;
    border-bottom: 2px solid var(--card-border);
    font-family: var(--font-mono);
    font-size: 15px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  td {
    padding: 16px 20px;
    border-bottom: 1px solid var(--card-border);
    color: var(--text-body);
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.03);
  }

  /* Bottom HUD Toolbar */
  .deck-hud {
    position: fixed;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--hud-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--hud-border);
    padding: 8px 18px;
    border-radius: 999px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
    color: var(--text-main);
    font-size: 13px;
    font-weight: 500;
    user-select: none;
  }

  .deck-hud button {
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    padding: 5px 9px;
    border-radius: 6px;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: background 0.15s ease;
  }

  .deck-hud button:hover {
    background: var(--hud-hover);
  }

  .save-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--accent-color);
    font-family: var(--font-mono);
  }

  .live-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-family: var(--font-mono);
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.35);
    letter-spacing: 0.04em;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
    animation: pulse-dot-anim 2s infinite ease-in-out;
  }

  @keyframes pulse-dot-anim {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.8); }
  }

  /* Contenteditable focus outlines */
  [contenteditable="true"] {
    outline: 2px dashed transparent;
    transition: outline 0.15s ease;
    border-radius: 4px;
  }

  body.edit-mode [contenteditable="true"]:hover {
    outline-color: var(--accent-color);
    cursor: text;
  }

  body.edit-mode [contenteditable="true"]:focus {
    outline: 2px solid var(--accent-color);
    background: rgba(125, 125, 125, 0.08);
  }

  /* Print Stylesheet (Zero-Margin Vector PDF) */
  @page {
    size: 16in 9in;
    margin: 0;
  }

  @media print {
    *, *::before, *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-shadow: none !important;
    }

    html, body {
      width: 1920px !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: transparent !important;
    }

    .deck-viewport {
      display: block !important;
      position: static !important;
      width: 1920px !important;
      height: auto !important;
      overflow: visible !important;
      background: transparent !important;
    }

    .slide-stage {
      transform: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      width: 1920px !important;
      height: auto !important;
      display: block !important;
      overflow: visible !important;
      background: transparent !important;
    }

    .slide {
      background: var(--bg-slide) !important;
      color: var(--text-body) !important;
      position: relative !important;
      width: 1920px !important;
      height: 1080px !important;
      min-height: 1080px !important;
      max-height: 1080px !important;
      page-break-after: always !important;
      break-after: page !important;
      opacity: 1 !important;
      transform: none !important;
      display: flex !important;
      overflow: hidden !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .grid-card, .metric-card, .flow-step, .quote-spotlight, .layout-split > div {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: var(--card-bg) !important;
      border: 1px solid var(--card-border) !important;
    }

    .deck-topbar, .slide-rail, .rail-toggle-btn, .deck-hud, .no-print {
      display: none !important;
    }
  }
</style>
</head>
<body>

<!-- Top Navigation Bar -->
<header class="deck-topbar no-print" id="deck-topbar">
  <div class="deck-topbar-left">
    <div class="deck-brand-badge">
      <span class="deck-brand-icon">⚏</span>
      <span>Slide Deck Studio</span>
    </div>
    <span style="opacity:0.25;">|</span>
    <span class="deck-title-display" id="deck-title-display">${escapeHtml(documentTitle)}</span>
    <span class="slide-count-badge" id="topbar-slide-counter">1 / ${parsedSlides.length}</span>
    <span class="live-status-badge" id="topbar-live-status"><span class="pulse-dot"></span><span>Live Sync</span></span>
  </div>

  <div class="deck-topbar-right">
    <div class="dropdown-wrap">
      <button class="topbar-btn" id="btn-add-slide-menu" title="Add a new slide to deck">
        <span>+ Add Slide ▾</span>
      </button>
      <div class="dropdown-content" id="add-slide-dropdown">
        <button class="dropdown-item" data-layout="cover">Cover / Hero</button>
        <button class="dropdown-item" data-layout="grid">Bento Grid Matrix</button>
        <button class="dropdown-item" data-layout="metrics">Metric Hero Cards</button>
        <button class="dropdown-item" data-layout="split">Asymmetric Split</button>
        <button class="dropdown-item" data-layout="flow">Progression Flow</button>
        <button class="dropdown-item" data-layout="quote">Quote Spotlight</button>
        <button class="dropdown-item" data-layout="standard">Standard Content</button>
      </div>
    </div>

    <select class="topbar-select" id="theme-selector" title="Switch Theme in Real Time">
      <optgroup label="Minimal & Clean">
        <option value="modern-clean" ${globalTheme === 'modern-clean' ? 'selected' : ''}>Modern Clean</option>
        <option value="crisp-whitepaper" ${globalTheme === 'crisp-whitepaper' ? 'selected' : ''}>Crisp Whitepaper</option>
        <option value="soft-editorial" ${globalTheme === 'soft-editorial' ? 'selected' : ''}>Soft Editorial</option>
        <option value="monochrome-minimal" ${globalTheme === 'monochrome-minimal' ? 'selected' : ''}>Monochrome Minimal</option>
      </optgroup>
      <optgroup label="Frontend Slides Presets">
        <option value="bold-signal" ${globalTheme === 'bold-signal' ? 'selected' : ''}>Bold Signal (Orange)</option>
        <option value="electric-studio" ${globalTheme === 'electric-studio' ? 'selected' : ''}>Electric Studio (Cobalt)</option>
        <option value="creative-voltage" ${globalTheme === 'creative-voltage' ? 'selected' : ''}>Creative Voltage (Neon)</option>
        <option value="editorial-forest" ${globalTheme === 'editorial-forest' ? 'selected' : ''}>Editorial Forest (Racing Green)</option>
        <option value="emerald-editorial" ${globalTheme === 'emerald-editorial' ? 'selected' : ''}>Emerald Editorial</option>
        <option value="neo-grid-bold" ${globalTheme === 'neo-grid-bold' ? 'selected' : ''}>Neo Grid Bold (Swiss Bento)</option>
        <option value="cobalt-cad" ${globalTheme === 'cobalt-cad' ? 'selected' : ''}>Cobalt CAD Blueprint</option>
        <option value="capsule-modern" ${globalTheme === 'capsule-modern' ? 'selected' : ''}>Capsule Modern</option>
        <option value="broadside-poster" ${globalTheme === 'broadside-poster' ? 'selected' : ''}>Broadside Poster</option>
      </optgroup>
      <optgroup label="Dark & Cyber">
        <option value="cyber-glow" ${globalTheme === 'cyber-glow' ? 'selected' : ''}>Cyber Glow</option>
        <option value="tech-code" ${globalTheme === 'tech-code' ? 'selected' : ''}>Tech Code</option>
        <option value="noir-luxe" ${globalTheme === 'noir-luxe' ? 'selected' : ''}>Noir Luxe Gold</option>
        <option value="dark-graph" ${globalTheme === 'dark-graph' ? 'selected' : ''}>Dark Graph</option>
        <option value="sonic-neon" ${globalTheme === 'sonic-neon' ? 'selected' : ''}>Sonic Neon</option>
      </optgroup>
      <optgroup label="Enterprise & Financial">
        <option value="financial-index" ${globalTheme === 'financial-index' ? 'selected' : ''}>Financial Index</option>
        <option value="high-growth" ${globalTheme === 'high-growth' ? 'selected' : ''}>High Growth Blue</option>
        <option value="spectrum-data" ${globalTheme === 'spectrum-data' ? 'selected' : ''}>Spectrum Data</option>
        <option value="editorial-magazine" ${globalTheme === 'editorial-magazine' ? 'selected' : ''}>Editorial Magazine</option>
      </optgroup>
    </select>

    <div class="dropdown-wrap">
      <button class="topbar-btn" id="btn-export-menu" title="Export Presentation">
        <span>⬇ Export ▾</span>
      </button>
      <div class="dropdown-content" id="export-dropdown">
        <button class="dropdown-item" id="opt-export-pdf">📄 Download PDF (Zero-Margin Engine)</button>
        <button class="dropdown-item" id="opt-print-pdf">🖨 Print / System PDF (Browser Dialog)</button>
        <button class="dropdown-item" id="opt-export-pptx">📊 Export PPTX (PowerPoint)</button>
        <button class="dropdown-item" id="opt-export-html">🌐 Export Standalone HTML</button>
      </div>
    </div>

    <button class="topbar-btn" id="btn-topbar-edit" title="Toggle Live In-Place Editing (E)">
      <span>✎ In-Place Edit</span>
    </button>

    <button class="topbar-btn topbar-btn-primary" id="btn-topbar-present" title="Start Fullscreen Presentation (F5)">
      <span>▶ Present</span>
    </button>
  </div>
</header>

<!-- Left Sidebar: Filmstrip / Slide Rail -->
<aside class="slide-rail no-print" id="slide-rail">
  <div class="slide-rail-head">
    <span class="slide-rail-title">Slides</span>
    <button class="rail-action-btn" id="btn-rail-add" title="Add Slide">+</button>
  </div>
  <div class="slide-rail-list" id="slide-rail-list">
    <!-- Thumbnails dynamically injected by JS -->
  </div>
  <div style="padding: 10px 12px; border-top: 1px solid rgba(255,255,255,0.08);">
    <button class="rail-add-slide-btn" id="btn-rail-add-bottom">+ Add Slide</button>
  </div>
</aside>

<!-- Collapse / Expand Toggle Button -->
<button class="rail-toggle-btn no-print" id="rail-toggle-btn" title="Toggle Slide Filmstrip (T)">◀</button>

<!-- Presentation Stage Viewport -->
<main class="deck-viewport">
  <div class="slide-stage" id="slide-stage">
    ${parsedSlides.map((s, idx) => `
    <section class="slide layout-${s.layout} ${idx === 0 ? 'active' : ''}" id="slide-${s.index}" data-slide-index="${s.index}" data-layout="${s.layout}">
      ${s.kicker ? `<div class="kicker" contenteditable="true">${escapeHtml(s.kicker)}</div>` : ''}
      ${s.htmlContent}
    </section>
    `).join('\n')}
  </div>
</main>

<!-- Bottom HUD Navigation -->
<footer class="deck-hud no-print" id="deck-hud">
  <button id="btn-prev" title="Previous Slide (Left Arrow / K)">◀</button>
  <span id="slide-counter">1 / ${parsedSlides.length}</span>
  <button id="btn-next" title="Next Slide (Right Arrow / J)">▶</button>
  <span style="opacity: 0.3;">|</span>
  <button id="btn-edit" title="Toggle Live In-Place Editing (E)">✎ Edit</button>
  <button id="btn-fullscreen" title="Toggle Fullscreen (F)">⛶ Fullscreen</button>
  <button id="btn-pdf" title="Print to PDF (P)">🖨 Print / PDF</button>
  <span class="save-indicator" id="save-indicator" style="display:none;">Saved ✓</span>
</footer>

<script>
(() => {
  let slides = Array.from(document.querySelectorAll('.slide'));
  let totalSlides = slides.length;
  let currentIndex = 0;
  let isEditMode = false;
  let isRailCollapsed = false;

  const counterEl = document.getElementById('slide-counter');
  const topbarCounterEl = document.getElementById('topbar-slide-counter');
  const stageEl = document.getElementById('slide-stage');
  const saveIndicator = document.getElementById('save-indicator');
  const railEl = document.getElementById('slide-rail');
  const railListEl = document.getElementById('slide-rail-list');
  const railToggleBtn = document.getElementById('rail-toggle-btn');
  const themeSelector = document.getElementById('theme-selector');

  // Compute fluid scale for 16:9 stage
  function updateScale() {
    const isPresent = document.body.getAttribute('data-mode') === 'present';
    const topbarHeight = isPresent ? 0 : 54;
    const railWidth = (isPresent || isRailCollapsed) ? 0 : 240;

    const availW = window.innerWidth - railWidth;
    const availH = window.innerHeight - topbarHeight;

    const scaleX = availW / 1920;
    const scaleY = availH / 1080;
    const scale = Math.min(scaleX, scaleY) * (isPresent ? 1.0 : 0.94);

    document.documentElement.style.setProperty('--deck-scale', String(scale));
  }

  window.addEventListener('resize', updateScale);

  // Render Slide Rail Filmstrip Thumbnails
  function renderSlideRail() {
    if (!railListEl) return;
    railListEl.innerHTML = '';
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;

    slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'rail-card' + (idx === currentIndex ? ' active' : '');
      card.dataset.index = idx;

      const layout = slide.dataset.layout || 'slide';
      const headingEl = slide.querySelector('h1, h2, h3, blockquote');
      const previewText = headingEl ? headingEl.textContent.trim() : ('Slide ' + (idx + 1));

      card.innerHTML = \`
        <div class="rail-card-meta">
          <span class="rail-card-num">\${String(idx + 1).padStart(2, '0')}</span>
          <span class="rail-card-layout">\${layout}</span>
        </div>
        <div class="rail-card-thumb">
          <div class="rail-thumb-text">\${escapeHtmlText(previewText)}</div>
        </div>
        <div class="rail-card-actions">
          <button class="rail-action-btn" title="Duplicate Slide" data-action="duplicate">❐</button>
          <button class="rail-action-btn" title="Move Up" data-action="up">▲</button>
          <button class="rail-action-btn" title="Move Down" data-action="down">▼</button>
          <button class="rail-action-btn" title="Delete Slide" data-action="delete">✕</button>
        </div>
      \`;

      card.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('[data-action]');
        if (actionBtn) {
          const action = actionBtn.dataset.action;
          e.stopPropagation();
          handleRailAction(action, idx);
          return;
        }
        goToSlide(idx);
      });

      railListEl.appendChild(card);
    });

    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    if (topbarCounterEl) topbarCounterEl.textContent = (currentIndex + 1) + ' / ' + totalSlides;
  }

  function escapeHtmlText(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      }
    });
    currentIndex = index;

    // Update rail card active state
    document.querySelectorAll('.rail-card').forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
      if (i === currentIndex) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    if (topbarCounterEl) topbarCounterEl.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    location.hash = 'slide-' + (currentIndex + 1);
  }

  // Slide CRUD Actions
  function handleRailAction(action, slideIdx) {
    if (action === 'duplicate') {
      duplicateSlide(slideIdx);
    } else if (action === 'up') {
      moveSlide(slideIdx, -1);
    } else if (action === 'down') {
      moveSlide(slideIdx, 1);
    } else if (action === 'delete') {
      deleteSlide(slideIdx);
    }
  }

  function duplicateSlide(idx) {
    const sourceSlide = slides[idx];
    if (!sourceSlide) return;
    const clone = sourceSlide.cloneNode(true);
    clone.classList.remove('active', 'prev');
    sourceSlide.after(clone);
    reindexSlides();
    renderSlideRail();
    goToSlide(idx + 1);
    triggerSave();
  }

  function moveSlide(idx, dir) {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    const currentSlide = slides[idx];
    const targetSlide = slides[targetIdx];
    if (dir > 0) {
      targetSlide.after(currentSlide);
    } else {
      targetSlide.before(currentSlide);
    }
    reindexSlides();
    renderSlideRail();
    goToSlide(targetIdx);
    triggerSave();
  }

  function deleteSlide(idx) {
    if (slides.length <= 1) {
      alert('Cannot delete the only slide in the presentation.');
      return;
    }
    if (!confirm('Delete slide ' + (idx + 1) + '?')) return;
    const slideToDelete = slides[idx];
    slideToDelete.remove();
    reindexSlides();
    const nextIdx = Math.min(idx, slides.length - 1);
    renderSlideRail();
    goToSlide(nextIdx);
    triggerSave();
  }

  function reindexSlides() {
    slides = Array.from(document.querySelectorAll('.slide'));
    totalSlides = slides.length;
    slides.forEach((s, i) => {
      s.id = 'slide-' + (i + 1);
      s.dataset.slideIndex = String(i + 1);
    });
  }

  function addNewSlide(layout = 'standard') {
    const newSlide = document.createElement('section');
    newSlide.className = 'slide layout-' + layout;
    newSlide.dataset.layout = layout;

    let innerContent = '';
    if (layout === 'cover') {
      innerContent = \`
        <div class="kicker" contenteditable="true">COMPANY OVERVIEW // 2026</div>
        <h1 contenteditable="true">New Presentation Title</h1>
        <h3 contenteditable="true">Subtitle explaining the strategic vision</h3>
        <div class="slide-footer-meta" contenteditable="true">Author Name · Date · Confidential</div>
      \`;
    } else if (layout === 'metrics') {
      innerContent = \`
        <div class="kicker" contenteditable="true">TRACTION & BENCHMARKS</div>
        <h2 contenteditable="true">Key Performance Indicators</h2>
        <p contenteditable="true">Core metrics demonstrating growth across the portfolio.</p>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value" contenteditable="true">$24M+</div>
            <div class="metric-label" contenteditable="true">Annual Recurring Revenue</div>
            <div class="metric-desc" contenteditable="true">+185% year-over-year expansion</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" contenteditable="true">99.8%</div>
            <div class="metric-label" contenteditable="true">SLA Reliability</div>
            <div class="metric-desc" contenteditable="true">High-availability architecture</div>
          </div>
          <div class="metric-card">
            <div class="metric-value" contenteditable="true">4.8x</div>
            <div class="metric-label" contenteditable="true">Customer ROI</div>
            <div class="metric-desc" contenteditable="true">Verified payback in under 90 days</div>
          </div>
        </div>
      \`;
    } else if (layout === 'grid') {
      innerContent = \`
        <div class="kicker" contenteditable="true">SYSTEM ARCHITECTURE</div>
        <h2 contenteditable="true">Bento Grid Modular Capabilities</h2>
        <p contenteditable="true">Scalable architecture engineered for resilience.</p>
        <div class="cards-container">
          <div class="grid-card">
            <h4 contenteditable="true">Real-time Telemetry</h4>
            <p contenteditable="true">High-throughput event streaming with zero data loss.</p>
          </div>
          <div class="grid-card">
            <h4 contenteditable="true">Autonomous Agent Swarms</h4>
            <p contenteditable="true">Self-healing tasks operating concurrently in parallel.</p>
          </div>
          <div class="grid-card">
            <h4 contenteditable="true">Enterprise Cryptography</h4>
            <p contenteditable="true">End-to-end attestation with automated security audits.</p>
          </div>
        </div>
      \`;
    } else if (layout === 'flow') {
      innerContent = \`
        <div class="kicker" contenteditable="true">EXECUTION TIMELINE</div>
        <h2 contenteditable="true">Strategic Implementation Roadmap</h2>
        <p contenteditable="true">Phased roll-out ensuring zero operational downtime.</p>
        <div class="flow-container">
          <div class="flow-step">
            <div class="step-num">01</div>
            <h4 contenteditable="true">Foundation & Setup</h4>
            <p contenteditable="true">Configure security baseline and environments.</p>
          </div>
          <div class="flow-step">
            <div class="step-num">02</div>
            <h4 contenteditable="true">Integration & Migration</h4>
            <p contenteditable="true">Connect enterprise data pipes and verify endpoints.</p>
          </div>
          <div class="flow-step">
            <div class="step-num">03</div>
            <h4 contenteditable="true">Production Scale</h4>
            <p contenteditable="true">Roll out to global teams with 24/7 observability.</p>
          </div>
        </div>
      \`;
    } else if (layout === 'quote') {
      innerContent = \`
        <div class="kicker" contenteditable="true">VISIONARY PERSPECTIVE</div>
        <div class="quote-spotlight">
          <div class="quote-mark" aria-hidden="true">“</div>
          <blockquote contenteditable="true">Simplicity is the prerequisite for reliability, speed, and lasting architectural elegance.</blockquote>
          <div class="quote-attribution" contenteditable="true">— Chief Executive Officer</div>
        </div>
      \`;
    } else if (layout === 'split') {
      innerContent = \`
        <div class="kicker" contenteditable="true">COMPARATIVE ANALYSIS</div>
        <div class="layout-split">
          <div>
            <h2 contenteditable="true">Strategic Paradigm Shift</h2>
            <p contenteditable="true">Replacing fragile manual workflows with autonomous verified agents.</p>
            <ul>
              <li contenteditable="true"><strong>100% Deterministic:</strong> Eliminates human oversight fatigue.</li>
              <li contenteditable="true"><strong>Parallel Velocity:</strong> 5x faster cycle times on deliverables.</li>
            </ul>
          </div>
          <div class="grid-card">
            <h4 contenteditable="true">Operational Advantage</h4>
            <p contenteditable="true">Deliver presentations, websites, and code with zero friction.</p>
          </div>
        </div>
      \`;
    } else {
      innerContent = \`
        <div class="kicker" contenteditable="true">CORE TOPIC</div>
        <h2 contenteditable="true">Slide Heading Title</h2>
        <p contenteditable="true">Descriptive paragraph detailing the topic and strategic importance.</p>
        <ul>
          <li contenteditable="true"><strong>First Key Point:</strong> Clear context and explanation.</li>
          <li contenteditable="true"><strong>Second Key Point:</strong> Supporting operational detail.</li>
          <li contenteditable="true"><strong>Third Key Point:</strong> Actionable next step or takeaway.</li>
        </ul>
      \`;
    }

    newSlide.innerHTML = innerContent;
    stageEl.appendChild(newSlide);
    reindexSlides();
    renderSlideRail();
    goToSlide(slides.length - 1);
    triggerSave();
  }

  // Toggle Slide Rail Filmstrip
  if (railToggleBtn) {
    railToggleBtn.addEventListener('click', () => {
      isRailCollapsed = !isRailCollapsed;
      railEl.classList.toggle('collapsed', isRailCollapsed);
      railToggleBtn.textContent = isRailCollapsed ? '▶' : '◀';
      updateScale();
    });
  }

  // Add Slide Menu Handlers
  const addSlideBtn = document.getElementById('btn-add-slide-menu');
  const addSlideDropdown = document.getElementById('add-slide-dropdown');
  if (addSlideBtn && addSlideDropdown) {
    addSlideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addSlideDropdown.classList.toggle('show');
    });
    addSlideDropdown.querySelectorAll('[data-layout]').forEach(item => {
      item.addEventListener('click', () => {
        addNewSlide(item.dataset.layout);
        addSlideDropdown.classList.remove('show');
      });
    });
  }

  const btnRailAdd = document.getElementById('btn-rail-add');
  const btnRailAddBottom = document.getElementById('btn-rail-add-bottom');
  if (btnRailAdd) btnRailAdd.addEventListener('click', () => addNewSlide('standard'));
  if (btnRailAddBottom) btnRailAddBottom.addEventListener('click', () => addNewSlide('standard'));

  // Export Menu Handlers
  const exportBtn = document.getElementById('btn-export-menu');
  const exportDropdown = document.getElementById('export-dropdown');
  if (exportBtn && exportDropdown) {
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportDropdown.classList.toggle('show');
    });
  }

  document.addEventListener('click', () => {
    if (addSlideDropdown) addSlideDropdown.classList.remove('show');
    if (exportDropdown) exportDropdown.classList.remove('show');
  });

  const optPdf = document.getElementById('opt-export-pdf');
  if (optPdf) {
    optPdf.addEventListener('click', () => {
      optPdf.textContent = '⏳ Exporting PDF...';
      fetch('/api/export/pdf', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          optPdf.textContent = '📄 Download PDF (Zero-Margin Engine)';
          if (data.downloadUrl) {
            window.location.href = data.downloadUrl;
          } else {
            window.print();
          }
        })
        .catch(() => {
          optPdf.textContent = '📄 Download PDF (Zero-Margin Engine)';
          window.print();
        });
    });
  }

  const optPrintPdf = document.getElementById('opt-print-pdf');
  if (optPrintPdf) {
    optPrintPdf.addEventListener('click', () => {
      window.print();
    });
  }

  const optPptx = document.getElementById('opt-export-pptx');
  if (optPptx) {
    optPptx.addEventListener('click', () => {
      // Trigger PowerPoint export endpoint
      fetch('/api/export/pptx', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.downloadUrl) {
            window.location.href = data.downloadUrl;
          } else {
            alert('PPTX export triggered. Check terminal or output folder.');
          }
        })
        .catch(() => {
          alert('PPTX export: Run "slidedeck-gen export:pptx" in terminal.');
        });
    });
  }

  const optHtml = document.getElementById('opt-export-html');
  if (optHtml) {
    optHtml.addEventListener('click', () => {
      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (document.title || 'presentation').toLowerCase().replace(/[^a-z0-9_-]/g, '-') + '.html';
      a.click();
    });
  }

  // Present Mode (F5 Fullscreen presentation)
  const btnPresent = document.getElementById('btn-topbar-present');
  function togglePresentMode() {
    const isPresent = document.body.getAttribute('data-mode') === 'present';
    if (!isPresent) {
      document.body.setAttribute('data-mode', 'present');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.body.removeAttribute('data-mode');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    updateScale();
  }

  if (btnPresent) btnPresent.addEventListener('click', togglePresentMode);

  // Theme Selector Handler
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', newTheme);
      // Fetch new theme styles or apply token overrides
      applyThemeTokensClient(newTheme);
      triggerSave();
    });
  }

  function applyThemeTokensClient(theme) {
    // Basic dynamic palette map for instant feedback
    const themePalettes = {
      'bold-signal': { canvas: '#121214', slide: '#18181b', accent: '#ff5722', text: '#ffffff', contrast: '#18181b' },
      'electric-studio': { canvas: '#090a0f', slide: '#0e1118', accent: '#3b82f6', text: '#ffffff', contrast: '#ffffff' },
      'creative-voltage': { canvas: '#08051a', slide: '#0e092b', accent: '#a855f7', text: '#ffffff', contrast: '#ffffff' },
      'editorial-forest': { canvas: '#091a13', slide: '#0e241b', accent: '#d4af37', text: '#ffffff', contrast: '#0e241b' },
      'emerald-editorial': { canvas: '#06281e', slide: '#0a3629', accent: '#10b981', text: '#ffffff', contrast: '#06281e' },
      'neo-grid-bold': { canvas: '#f0f0f2', slide: '#ffffff', accent: '#000000', text: '#09090b', contrast: '#ffffff' },
      'cobalt-cad': { canvas: '#001233', slide: '#001845', accent: '#00d4ff', text: '#ffffff', contrast: '#001233' },
      'capsule-modern': { canvas: '#0f172a', slide: '#1e293b', accent: '#38bdf8', text: '#f8fafc', contrast: '#0f172a' },
      'soft-editorial': { canvas: '#f4ede2', slide: '#faf7f2', accent: '#8b5e3c', text: '#2a2723', contrast: '#ffffff' },
      'monochrome-minimal': { canvas: '#000000', slide: '#0a0a0a', accent: '#ffffff', text: '#ffffff', contrast: '#000000' },
      'broadside-poster': { canvas: '#18181b', slide: '#27272a', accent: '#e11d48', text: '#ffffff', contrast: '#ffffff' },
      'cyber-glow': { canvas: '#060911', slide: '#0b0f19', accent: '#10b981', text: '#f8fafc', contrast: '#022c22' },
      'tech-code': { canvas: '#121316', slide: '#18191e', accent: '#38bdf8', text: '#ffffff', contrast: '#082f49' },
      'noir-luxe': { canvas: '#000000', slide: '#070707', accent: '#d4af37', text: '#ffffff', contrast: '#000000' },
      'modern-clean': { canvas: '#f4f4f5', slide: '#ffffff', accent: '#0284c7', text: '#18181b', contrast: '#ffffff' },
    };

    const p = themePalettes[theme] || themePalettes['modern-clean'];
    document.documentElement.style.setProperty('--bg-canvas', p.canvas);
    document.documentElement.style.setProperty('--bg-slide', p.slide);
    document.documentElement.style.setProperty('--accent-color', p.accent);
    document.documentElement.style.setProperty('--text-title', p.text);
    document.documentElement.style.setProperty('--accent-contrast', p.contrast);
  }

  // Navigation Handlers
  document.getElementById('btn-prev').addEventListener('click', () => goToSlide(currentIndex - 1));
  document.getElementById('btn-next').addEventListener('click', () => goToSlide(currentIndex + 1));

  document.getElementById('btn-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  document.getElementById('btn-pdf').addEventListener('click', () => {
    window.print();
  });

  // Edit Mode Toggle
  const btnEdit = document.getElementById('btn-edit');
  const btnTopbarEdit = document.getElementById('btn-topbar-edit');

  function toggleEditMode() {
    isEditMode = !isEditMode;
    document.body.classList.toggle('edit-mode', isEditMode);
    document.querySelectorAll('.slide h1, .slide h2, .slide h3, .slide p, .slide li, .slide .kicker, .slide .metric-value, .slide .metric-label, .slide .metric-desc, .slide th, .slide td, .slide blockquote, .slide .quote-attribution, .slide .slide-footer-meta').forEach(el => {
      el.setAttribute('contenteditable', isEditMode ? 'true' : 'false');
    });

    const activeBg = isEditMode ? 'var(--accent-color)' : '';
    const activeColor = isEditMode ? 'var(--accent-contrast)' : '';
    if (btnEdit) {
      btnEdit.style.background = activeBg;
      btnEdit.style.color = activeColor;
    }
    if (btnTopbarEdit) {
      btnTopbarEdit.style.background = activeBg;
      btnTopbarEdit.style.color = activeColor;
    }
  }

  if (btnEdit) btnEdit.addEventListener('click', toggleEditMode);
  if (btnTopbarEdit) btnTopbarEdit.addEventListener('click', toggleEditMode);

  // Auto-save logic
  let autoSaveTimeout = null;
  function triggerSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const payload = {
        html: stageEl.innerHTML,
        theme: document.documentElement.getAttribute('data-theme') || 'modern-clean',
        timestamp: Date.now()
      };
      try {
        localStorage.setItem('slidedeck_saved_content', JSON.stringify(payload));
      } catch (e) {}

      fetch('/api/deck/persist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      if (saveIndicator) {
        saveIndicator.style.display = 'inline-flex';
        setTimeout(() => { saveIndicator.style.display = 'none'; }, 1800);
      }
    }, 500);
  }

  document.addEventListener('input', (e) => {
    if (e.target.isContentEditable) {
      triggerSave();
      // Update rail preview title if editing active slide heading
      const activeCard = document.querySelector('.rail-card.active .rail-thumb-text');
      if (activeCard && e.target.matches('h1, h2, h3, blockquote')) {
        activeCard.textContent = e.target.textContent.trim();
      }
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.isContentEditable) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'j') {
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'k') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      goToSlide(0);
    } else if (e.key === 'End') {
      goToSlide(totalSlides - 1);
    } else if (e.key === 'F5') {
      e.preventDefault();
      togglePresentMode();
    } else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } else if (e.key === 'e' || e.key === 'E') {
      toggleEditMode();
    } else if (e.key === 'p' || e.key === 'P') {
      window.print();
    } else if (e.key === 't' || e.key === 'T') {
      if (railToggleBtn) railToggleBtn.click();
    } else if (e.key === 'Escape') {
      if (document.body.getAttribute('data-mode') === 'present') {
        togglePresentMode();
      }
    }
  });

  // Deep-link to slide on page load
  if (location.hash && location.hash.startsWith('#slide-')) {
    const targetIdx = parseInt(location.hash.replace('#slide-', ''), 10) - 1;
    if (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < totalSlides) {
      currentIndex = targetIdx;
    }
  }

  // Live SSE listener for real-time hot-reload & status updates
  try {
    const es = new EventSource('/events');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'reload') {
          location.reload();
        } else if (data.type === 'status' && data.message) {
          const textEl = document.querySelector('#topbar-live-status span:last-child');
          if (textEl) textEl.textContent = data.message;
        }
      } catch {}
    };
  } catch {}

  // Initial startup
  renderSlideRail();
  goToSlide(currentIndex);
  updateScale();
})();
</script>
</body>
</html>`;
}

function renderSlideBody(lines, layout, kicker, metadata) {
  let html = '';
  let inList = false;
  let inTable = false;
  let tableRows = [];

  function closeOpenBlocks() {
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }
    if (inTable) {
      html += renderTable(tableRows);
      inTable = false;
      tableRows = [];
    }
  }

  // Pre-scan for quote layout
  if (layout === 'quote') {
    let quoteText = '';
    let authorText = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('> ')) {
        quoteText = trimmed.slice(2).trim();
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        authorText = trimmed.slice(2, -2).trim();
      } else if (trimmed && !trimmed.startsWith('#')) {
        if (!quoteText) quoteText = trimmed;
        else authorText = trimmed;
      }
    }
    return `
      <div class="quote-spotlight">
        <div class="quote-mark" aria-hidden="true">“</div>
        <blockquote contenteditable="true">${escapeHtml(quoteText || 'Insert memorable keynote quote here.')}</blockquote>
        ${authorText ? `<div class="quote-attribution" contenteditable="true">— ${escapeHtml(authorText)}</div>` : ''}
      </div>
    `;
  }

  // Pre-scan for split / two-column layout
  if (layout === 'split' || layout === 'columns' || layout === 'two-column') {
    let leftLines = [];
    let rightLines = [];
    let foundDivider = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '|||' || trimmed === '===' || /^<!--\s*col\s*-->$/i.test(trimmed)) {
        foundDivider = true;
        continue;
      }
      if (!foundDivider) {
        leftLines.push(line);
      } else {
        rightLines.push(line);
      }
    }

    if (!foundDivider) {
      leftLines = [];
      rightLines = [];
      let pastIntro = false;
      for (const line of lines) {
        const trimmed = line.trim();
        if (pastIntro) {
          rightLines.push(line);
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('### ') || trimmed.startsWith('|')) {
          pastIntro = true;
          rightLines.push(line);
        } else {
          leftLines.push(line);
        }
      }
    }

    function renderColumnLines(colLines) {
      let colHtml = '';
      let inColList = false;
      for (const raw of colLines) {
        const t = raw.trim();
        if (!t) {
          if (inColList) { colHtml += '</ul>\n'; inColList = false; }
          continue;
        }
        if (t.startsWith('# ')) {
          if (inColList) { colHtml += '</ul>\n'; inColList = false; }
          colHtml += `<h1 contenteditable="true">${escapeHtml(t.slice(2))}</h1>\n`;
        } else if (t.startsWith('## ')) {
          if (inColList) { colHtml += '</ul>\n'; inColList = false; }
          colHtml += `<h2 contenteditable="true">${escapeHtml(t.slice(3))}</h2>\n`;
        } else if (t.startsWith('### ')) {
          if (inColList) { colHtml += '</ul>\n'; inColList = false; }
          colHtml += `<div class="grid-card"><h4 contenteditable="true">${escapeHtml(t.slice(4))}</h4></div>\n`;
        } else if (t.startsWith('- ') || t.startsWith('* ')) {
          if (!inColList) { colHtml += '<ul>\n'; inColList = true; }
          colHtml += `<li contenteditable="true">${formatInlineMarkdown(t.slice(2))}</li>\n`;
        } else {
          if (inColList) { colHtml += '</ul>\n'; inColList = false; }
          colHtml += `<p contenteditable="true">${formatInlineMarkdown(t)}</p>\n`;
        }
      }
      if (inColList) colHtml += '</ul>\n';
      return colHtml;
    }

    return `
      <div class="layout-split">
        <div class="split-col split-col-primary">
          ${renderColumnLines(leftLines)}
        </div>
        <div class="split-col split-col-secondary">
          ${renderColumnLines(rightLines)}
        </div>
      </div>
      ${metadata ? `<div class="slide-footer-meta" contenteditable="true">${escapeHtml(metadata)}</div>\n` : ''}
    `;
  }

  // Pre-scan for comparison / vs layout
  if (layout === 'comparison' || layout === 'vs') {
    let titleLines = [];
    let leftLines = [];
    let rightLines = [];
    let section = 'title';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed === '|||' || trimmed === '===' || /^<!--\s*col\s*-->$/i.test(trimmed) || /^##?\s*VS/i.test(trimmed)) {
        section = 'right';
        continue;
      }
      if (section === 'title') {
        if (trimmed.startsWith('# ') || trimmed.startsWith('## ')) {
          titleLines.push(line);
          continue;
        } else {
          section = 'left';
        }
      }
      if (section === 'left') {
        leftLines.push(line);
      } else {
        rightLines.push(line);
      }
    }

    let compHtml = '';
    for (const t of titleLines) {
      const trimmed = t.trim();
      if (trimmed.startsWith('# ')) compHtml += `<h1 contenteditable="true">${escapeHtml(trimmed.slice(2))}</h1>\n`;
      else if (trimmed.startsWith('## ')) compHtml += `<h2 contenteditable="true">${escapeHtml(trimmed.slice(3))}</h2>\n`;
      else if (trimmed.startsWith('### ')) compHtml += `<h3 contenteditable="true">${escapeHtml(trimmed.slice(4))}</h3>\n`;
    }

    function renderCompBlock(blockLines, isAccent) {
      let bHtml = `<div class="comparison-card ${isAccent ? 'card-accent' : 'card-challenge'}">\n`;
      let inBList = false;
      for (const raw of blockLines) {
        const t = raw.trim();
        if (!t) continue;
        if (t.startsWith('### ')) {
          if (inBList) { bHtml += '</ul>\n'; inBList = false; }
          bHtml += `<h4 contenteditable="true">${escapeHtml(t.slice(4))}</h4>\n`;
        } else if (t.startsWith('- ') || t.startsWith('* ')) {
          if (!inBList) { bHtml += '<ul>\n'; inBList = true; }
          bHtml += `<li contenteditable="true">${formatInlineMarkdown(t.slice(2))}</li>\n`;
        } else {
          if (inBList) { bHtml += '</ul>\n'; inBList = false; }
          bHtml += `<p contenteditable="true">${formatInlineMarkdown(t)}</p>\n`;
        }
      }
      if (inBList) bHtml += '</ul>\n';
      bHtml += '</div>\n';
      return bHtml;
    }

    compHtml += `
      <div class="comparison-container">
        ${renderCompBlock(leftLines, false)}
        ${renderCompBlock(rightLines, true)}
      </div>
      ${metadata ? `<div class="slide-footer-meta" contenteditable="true">${escapeHtml(metadata)}</div>\n` : ''}
    `;
    return compHtml;
  }

  // Pre-scan for metrics layout
  if (layout === 'metrics' || layout === 'stat' || layout === 'stats') {
    const metrics = [];
    const nonMetricLines = [];
    for (const line of lines) {
      const metricMatch = line.match(/^-\s*\*\*(.*?)(?::\*\*|\*\*:|\*\*)\s*(?:[-:]\s*)?(.*)$/);
      if (metricMatch && metricMatch[1].trim()) {
        metrics.push({ value: metricMatch[1].trim(), label: metricMatch[2].trim() });
      } else {
        nonMetricLines.push(line);
      }
    }

    for (const line of nonMetricLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        html += `<h1 contenteditable="true">${escapeHtml(trimmed.slice(2))}</h1>\n`;
      } else if (trimmed.startsWith('## ')) {
        html += `<h2 contenteditable="true">${escapeHtml(trimmed.slice(3))}</h2>\n`;
      } else if (trimmed.startsWith('### ')) {
        html += `<h3 contenteditable="true">${escapeHtml(trimmed.slice(4))}</h3>\n`;
      } else if (trimmed) {
        html += `<p contenteditable="true">${formatInlineMarkdown(trimmed)}</p>\n`;
      }
    }

    if (metrics.length > 0) {
      html += '<div class="metrics-grid">\n';
      for (const m of metrics) {
        html += `  <div class="metric-card">\n`;
        html += `    <div class="metric-value" contenteditable="true">${escapeHtml(m.value)}</div>\n`;
        html += `    <div class="metric-label" contenteditable="true">${escapeHtml(m.label)}</div>\n`;
        html += `  </div>\n`;
      }
      html += '</div>\n';
    }
    return html;
  }

  // Pre-scan for flow / steps layout
  if (layout === 'flow' || layout === 'timeline' || layout === 'roadmap' || layout === 'steps') {
    const steps = [];
    const nonStepLines = [];
    for (const line of lines) {
      const stepMatch = line.match(/^(\d+)\.\s*\*\*(.*?)(?::\*\*|\*\*:|\*\*)\s*(?:[-:]\s*)?(.*)$/);
      if (stepMatch && stepMatch[2].trim()) {
        steps.push({ num: stepMatch[1], title: stepMatch[2].trim(), desc: stepMatch[3].trim() });
      } else {
        nonStepLines.push(line);
      }
    }

    for (const line of nonStepLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        html += `<h1 contenteditable="true">${escapeHtml(trimmed.slice(2))}</h1>\n`;
      } else if (trimmed.startsWith('## ')) {
        html += `<h2 contenteditable="true">${escapeHtml(trimmed.slice(3))}</h2>\n`;
      } else if (trimmed.startsWith('### ')) {
        html += `<h3 contenteditable="true">${escapeHtml(trimmed.slice(4))}</h3>\n`;
      } else if (trimmed) {
        html += `<p contenteditable="true">${formatInlineMarkdown(trimmed)}</p>\n`;
      }
    }

    if (steps.length > 0) {
      html += '<div class="flow-container">\n';
      for (const st of steps) {
        html += `  <div class="flow-step">\n`;
        html += `    <div class="step-num">${escapeHtml(st.num)}</div>\n`;
        html += `    <h4 contenteditable="true">${escapeHtml(st.title)}</h4>\n`;
        html += `    <p contenteditable="true">${escapeHtml(st.desc)}</p>\n`;
        html += `  </div>\n`;
      }
      html += '</div>\n';
    }
    return html;
  }

  // Pre-scan for cards grid / bento
  if (layout === 'grid' || layout === 'bento' || layout === 'cards') {
    const cards = [];
    const nonCardLines = [];
    let currentCard = null;

    for (const line of lines) {
      const trimmed = line.trim();
      const bulletCardMatch = trimmed.match(/^-\s*\*\*(.*?)(?::\*\*|\*\*:|\*\*)\s*(?:[-:]\s*)?(.*)$/);
      const headingCardMatch = trimmed.match(/^###\s+(.*)$/);

      if (bulletCardMatch && bulletCardMatch[1].trim()) {
        if (currentCard) { cards.push(currentCard); currentCard = null; }
        const title = bulletCardMatch[1].trim();
        const desc = bulletCardMatch[2].trim();
        const isWide = /\[(?:wide|hero|full)\]/i.test(title);
        cards.push({ title: title.replace(/\[(?:wide|hero|full)\]/i, '').trim(), desc, isWide });
      } else if (headingCardMatch) {
        if (currentCard) { cards.push(currentCard); }
        const title = headingCardMatch[1].trim();
        const isWide = /\[(?:wide|hero|full)\]/i.test(title);
        currentCard = { title: title.replace(/\[(?:wide|hero|full)\]/i, '').trim(), desc: '', isWide };
      } else if (currentCard) {
        if (trimmed) {
          currentCard.desc = currentCard.desc ? `${currentCard.desc} ${trimmed}` : trimmed;
        }
      } else {
        nonCardLines.push(line);
      }
    }
    if (currentCard) { cards.push(currentCard); }

    for (const line of nonCardLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        html += `<h1 contenteditable="true">${escapeHtml(trimmed.slice(2))}</h1>\n`;
      } else if (trimmed.startsWith('## ')) {
        html += `<h2 contenteditable="true">${escapeHtml(trimmed.slice(3))}</h2>\n`;
      } else if (trimmed.startsWith('### ')) {
        html += `<h3 contenteditable="true">${escapeHtml(trimmed.slice(4))}</h3>\n`;
      } else if (trimmed) {
        html += `<p contenteditable="true">${formatInlineMarkdown(trimmed)}</p>\n`;
      }
    }

    if (cards.length > 0) {
      html += '<div class="cards-container bento-grid">\n';
      for (const c of cards) {
        html += `  <div class="grid-card ${c.isWide ? 'card-wide' : ''}">\n`;
        html += `    <h4 contenteditable="true">${escapeHtml(c.title)}</h4>\n`;
        html += `    <p contenteditable="true">${formatInlineMarkdown(c.desc)}</p>\n`;
        html += `  </div>\n`;
      }
      html += '</div>\n';
    }
    return html;
  }

  // Standard line-by-line renderer
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      closeOpenBlocks();
      continue;
    }

    // Markdown Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      closeOpenBlocks();
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      closeOpenBlocks();
      html += `<h1 contenteditable="true">${escapeHtml(trimmed.slice(2))}</h1>\n`;
    } else if (trimmed.startsWith('## ')) {
      closeOpenBlocks();
      html += `<h2 contenteditable="true">${escapeHtml(trimmed.slice(3))}</h2>\n`;
    } else if (trimmed.startsWith('### ')) {
      closeOpenBlocks();
      html += `<h3 contenteditable="true">${escapeHtml(trimmed.slice(4))}</h3>\n`;
    } else if (trimmed.startsWith('> ')) {
      closeOpenBlocks();
      html += `<blockquote contenteditable="true">${formatInlineMarkdown(trimmed.slice(2))}</blockquote>\n`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `  <li contenteditable="true">${formatInlineMarkdown(trimmed.slice(2))}</li>\n`;
    } else {
      closeOpenBlocks();
      html += `<p contenteditable="true">${formatInlineMarkdown(trimmed)}</p>\n`;
    }
  }

  closeOpenBlocks();

  if (metadata) {
    html += `<div class="slide-footer-meta" contenteditable="true">${escapeHtml(metadata)}</div>\n`;
  }

  return html;
}

function renderTable(rows) {
  if (rows.length < 2) return '';
  const parsed = rows.map(r => r.split('|').slice(1, -1).map(c => c.trim()));
  const header = parsed[0];
  const body = parsed.filter((r, idx) => {
    if (idx === 0) return false;
    if (r.every(cell => /^:?-+:?$/.test(cell))) return false;
    return true;
  });

  let out = '<table>\n<thead>\n<tr>\n';
  for (const h of header) {
    out += `  <th contenteditable="true">${escapeHtml(h)}</th>\n`;
  }
  out += '</tr>\n</thead>\n<tbody>\n';
  for (const row of body) {
    out += '<tr>\n';
    for (const cell of row) {
      out += `  <td contenteditable="true">${formatInlineMarkdown(cell)}</td>\n`;
    }
    out += '</tr>\n';
  }
  out += '</tbody>\n</table>\n';
  return out;
}

function formatInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="font-family:var(--font-mono);font-size:0.9em;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.08);">$1</code>');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getThemeStyles(theme) {
  const t = (theme || 'modern-clean').toLowerCase();
  switch (t) {
    case 'bold-signal':
      return {
        cssVariables: `
          --bg-canvas: #121214;
          --bg-slide: #18181b;
          --text-main: #f4f4f5;
          --text-title: #ffffff;
          --text-body: #a1a1aa;
          --text-muted: #71717a;
          --accent-color: #ff5722;
          --accent-contrast: #18181b;
          --card-bg: rgba(255, 255, 255, 0.04);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6);
          --table-header-bg: #222226;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.85);
          --stage-radius: 14px;
          --hud-bg: rgba(24, 24, 27, 0.92);
          --hud-border: #2e2e33;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #141416;
          --topbar-border: #27272a;
          --rail-bg: #161619;
          --rail-border: #27272a;
        `
      };
    case 'electric-studio':
      return {
        cssVariables: `
          --bg-canvas: #090a0f;
          --bg-slide: #0e1118;
          --text-main: #e2e8f0;
          --text-title: #ffffff;
          --text-body: #94a3b8;
          --text-muted: #64748b;
          --accent-color: #3b82f6;
          --accent-contrast: #ffffff;
          --card-bg: #141824;
          --card-border: #1e2638;
          --card-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.7);
          --table-header-bg: #192032;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 12px;
          --hud-bg: rgba(14, 17, 24, 0.92);
          --hud-border: #1e2638;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #0b0d13;
          --topbar-border: #1e2638;
          --rail-bg: #0c0f16;
          --rail-border: #1e2638;
        `
      };
    case 'creative-voltage':
      return {
        cssVariables: `
          --bg-canvas: #08051a;
          --bg-slide: #0e092b;
          --text-main: #f1f0fb;
          --text-title: #ffffff;
          --text-body: #c4c1e0;
          --text-muted: #8b85b8;
          --accent-color: #a855f7;
          --accent-contrast: #ffffff;
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-border: rgba(168, 85, 247, 0.25);
          --card-shadow: 0 20px 48px -15px rgba(168, 85, 247, 0.25);
          --table-header-bg: #160f42;
          --stage-shadow: 0 30px 100px -20px rgba(8, 5, 26, 0.95);
          --stage-radius: 16px;
          --hud-bg: rgba(14, 9, 43, 0.92);
          --hud-border: rgba(168, 85, 247, 0.3);
          --hud-hover: rgba(255, 255, 255, 0.12);
          --topbar-bg: #0b0722;
          --topbar-border: rgba(168, 85, 247, 0.25);
          --rail-bg: #0d0827;
          --rail-border: rgba(168, 85, 247, 0.2);
        `
      };
    case 'editorial-forest':
      return {
        cssVariables: `
          --bg-canvas: #091a13;
          --bg-slide: #0e241b;
          --text-main: #f4ede2;
          --text-title: #ffffff;
          --text-body: #c5d6cc;
          --text-muted: #8da498;
          --accent-color: #d4af37;
          --accent-contrast: #0e241b;
          --card-bg: rgba(255, 255, 255, 0.04);
          --card-border: rgba(212, 175, 55, 0.2);
          --card-shadow: 0 18px 45px -12px rgba(0, 0, 0, 0.75);
          --table-header-bg: #133024;
          --stage-shadow: 0 30px 95px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 12px;
          --hud-bg: rgba(14, 36, 27, 0.94);
          --hud-border: rgba(212, 175, 55, 0.25);
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #0a1f17;
          --topbar-border: rgba(212, 175, 55, 0.2);
          --rail-bg: #0b2118;
          --rail-border: rgba(212, 175, 55, 0.15);
        `
      };
    case 'emerald-editorial':
      return {
        cssVariables: `
          --bg-canvas: #06281e;
          --bg-slide: #0a3629;
          --text-main: #e8f5f1;
          --text-title: #ffffff;
          --text-body: #b8e0d4;
          --text-muted: #7cb8a5;
          --accent-color: #10b981;
          --accent-contrast: #06281e;
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-border: rgba(16, 185, 129, 0.25);
          --card-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.7);
          --table-header-bg: #0e4434;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.85);
          --stage-radius: 14px;
          --hud-bg: rgba(10, 54, 41, 0.92);
          --hud-border: rgba(16, 185, 129, 0.3);
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #072f23;
          --topbar-border: rgba(16, 185, 129, 0.2);
          --rail-bg: #083226;
          --rail-border: rgba(16, 185, 129, 0.15);
        `
      };
    case 'neo-grid-bold':
      return {
        cssVariables: `
          --bg-canvas: #f0f0f2;
          --bg-slide: #ffffff;
          --text-main: #18181b;
          --text-title: #09090b;
          --text-body: #3f3f46;
          --text-muted: #71717a;
          --accent-color: #000000;
          --accent-contrast: #ffffff;
          --card-bg: #fafafa;
          --card-border: #18181b;
          --card-shadow: 6px 6px 0px #18181b;
          --table-header-bg: #f4f4f5;
          --stage-shadow: 0 25px 70px -15px rgba(0, 0, 0, 0.2);
          --stage-radius: 0px;
          --hud-bg: rgba(255, 255, 255, 0.96);
          --hud-border: #18181b;
          --hud-hover: rgba(0, 0, 0, 0.08);
          --topbar-bg: #ffffff;
          --topbar-border: #18181b;
          --rail-bg: #fafafa;
          --rail-border: #18181b;
        `
      };
    case 'cobalt-cad':
      return {
        cssVariables: `
          --bg-canvas: #001233;
          --bg-slide: #001845;
          --text-main: #979dac;
          --text-title: #ffffff;
          --text-body: #c0c7d6;
          --text-muted: #7d8597;
          --accent-color: #00d4ff;
          --accent-contrast: #001233;
          --card-bg: rgba(2, 62, 138, 0.18);
          --card-border: rgba(0, 212, 255, 0.35);
          --card-shadow: 0 16px 36px -10px rgba(0, 18, 51, 0.85);
          --table-header-bg: #02235b;
          --stage-shadow: 0 30px 95px -20px rgba(0, 18, 51, 0.95);
          --stage-radius: 8px;
          --hud-bg: rgba(0, 24, 69, 0.92);
          --hud-border: rgba(0, 212, 255, 0.3);
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #001438;
          --topbar-border: rgba(0, 212, 255, 0.25);
          --rail-bg: #001640;
          --rail-border: rgba(0, 212, 255, 0.2);
        `
      };
    case 'capsule-modern':
      return {
        cssVariables: `
          --bg-canvas: #0f172a;
          --bg-slide: #1e293b;
          --text-main: #f8fafc;
          --text-title: #ffffff;
          --text-body: #cbd5e1;
          --text-muted: #94a3b8;
          --accent-color: #38bdf8;
          --accent-contrast: #0f172a;
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-border: rgba(255, 255, 255, 0.12);
          --card-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.5);
          --table-header-bg: #27354f;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.8);
          --stage-radius: 20px;
          --hud-bg: rgba(30, 41, 59, 0.92);
          --hud-border: rgba(255, 255, 255, 0.15);
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #141e30;
          --topbar-border: rgba(255, 255, 255, 0.12);
          --rail-bg: #182236;
          --rail-border: rgba(255, 255, 255, 0.1);
        `
      };
    case 'soft-editorial':
      return {
        cssVariables: `
          --bg-canvas: #f4ede2;
          --bg-slide: #faf7f2;
          --text-main: #2a2723;
          --text-title: #1a1816;
          --text-body: #4a453e;
          --text-muted: #7a7368;
          --accent-color: #8b5e3c;
          --accent-contrast: #ffffff;
          --card-bg: #ffffff;
          --card-border: #e6dfd3;
          --card-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.06);
          --table-header-bg: #f2ebe0;
          --stage-shadow: 0 25px 70px -15px rgba(42, 39, 35, 0.12);
          --stage-radius: 10px;
          --hud-bg: rgba(250, 247, 242, 0.94);
          --hud-border: #dcd4c6;
          --hud-hover: rgba(0, 0, 0, 0.05);
          --topbar-bg: #f0e8dc;
          --topbar-border: #dcd4c6;
          --rail-bg: #f4ede2;
          --rail-border: #dcd4c6;
        `
      };
    case 'monochrome-minimal':
      return {
        cssVariables: `
          --bg-canvas: #000000;
          --bg-slide: #0a0a0a;
          --text-main: #ffffff;
          --text-title: #ffffff;
          --text-body: #cccccc;
          --text-muted: #888888;
          --accent-color: #ffffff;
          --accent-contrast: #000000;
          --card-bg: #121212;
          --card-border: #242424;
          --card-shadow: 0 16px 40px -15px rgba(0, 0, 0, 0.9);
          --table-header-bg: #181818;
          --stage-shadow: 0 30px 100px -20px rgba(0, 0, 0, 0.95);
          --stage-radius: 4px;
          --hud-bg: rgba(18, 18, 18, 0.95);
          --hud-border: #2e2e2e;
          --hud-hover: rgba(255, 255, 255, 0.15);
          --topbar-bg: #0d0d0d;
          --topbar-border: #222222;
          --rail-bg: #0f0f0f;
          --rail-border: #222222;
        `
      };
    case 'broadside-poster':
      return {
        cssVariables: `
          --bg-canvas: #18181b;
          --bg-slide: #27272a;
          --text-main: #f4f4f5;
          --text-title: #ffffff;
          --text-body: #d4d4d8;
          --text-muted: #a1a1aa;
          --accent-color: #e11d48;
          --accent-contrast: #ffffff;
          --card-bg: #3f3f46;
          --card-border: #52525b;
          --card-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.6);
          --table-header-bg: #323238;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 8px;
          --hud-bg: rgba(39, 39, 42, 0.94);
          --hud-border: #52525b;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #202024;
          --topbar-border: #3f3f46;
          --rail-bg: #232327;
          --rail-border: #3f3f46;
        `
      };
    case 'cyber-glow':
    case 'theme02':
      return {
        cssVariables: `
          --bg-canvas: #060911;
          --bg-slide: #0b0f19;
          --text-main: #cbd5e1;
          --text-title: #f8fafc;
          --text-body: #94a3b8;
          --text-muted: #64748b;
          --accent-color: #10b981;
          --accent-contrast: #022c22;
          --card-bg: rgba(30, 41, 59, 0.45);
          --card-border: rgba(51, 65, 85, 0.7);
          --card-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.5);
          --table-header-bg: rgba(30, 41, 59, 0.7);
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.8);
          --stage-radius: 16px;
          --hud-bg: rgba(15, 23, 42, 0.88);
          --hud-border: rgba(51, 65, 85, 0.8);
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #0d1320;
          --topbar-border: #1e293b;
          --rail-bg: #0f1626;
          --rail-border: #1e293b;
        `
      };
    case 'tech-code':
    case 'theme03':
      return {
        cssVariables: `
          --bg-canvas: #121316;
          --bg-slide: #18191e;
          --text-main: #d1d5db;
          --text-title: #ffffff;
          --text-body: #9ca3af;
          --text-muted: #6b7280;
          --accent-color: #38bdf8;
          --accent-contrast: #082f49;
          --card-bg: #20222a;
          --card-border: #2e323d;
          --card-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.6);
          --table-header-bg: #252832;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 12px;
          --hud-bg: rgba(24, 25, 30, 0.9);
          --hud-border: #2e323d;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #15161b;
          --topbar-border: #282a32;
          --rail-bg: #16171d;
          --rail-border: #282a32;
        `
      };
    case 'glassmorphism':
    case 'theme04':
      return {
        cssVariables: `
          --bg-canvas: #1e1b4b;
          --bg-slide: #2e1065;
          --text-main: #f5f3ff;
          --text-title: #ffffff;
          --text-body: #ddd6fe;
          --text-muted: #a78bfa;
          --accent-color: #c084fc;
          --accent-contrast: #3b0764;
          --card-bg: rgba(255, 255, 255, 0.08);
          --card-border: rgba(255, 255, 255, 0.18);
          --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
          --table-header-bg: rgba(255, 255, 255, 0.12);
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.7);
          --stage-radius: 20px;
          --hud-bg: rgba(46, 16, 101, 0.85);
          --hud-border: rgba(255, 255, 255, 0.2);
          --hud-hover: rgba(255, 255, 255, 0.15);
          --topbar-bg: #260d54;
          --topbar-border: rgba(255, 255, 255, 0.15);
          --rail-bg: #2a0f5c;
          --rail-border: rgba(255, 255, 255, 0.12);
        `
      };
    case 'spectrum-data':
    case 'data-spectrum':
    case 'theme05':
      return {
        cssVariables: `
          --bg-canvas: #eef2f6;
          --bg-slide: #ffffff;
          --text-main: #334155;
          --text-title: #0f172a;
          --text-body: #475569;
          --text-muted: #64748b;
          --accent-color: #2563eb;
          --accent-contrast: #ffffff;
          --card-bg: #f8fafc;
          --card-border: #e2e8f0;
          --card-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.08);
          --table-header-bg: #f1f5f9;
          --stage-shadow: 0 25px 70px -15px rgba(15, 23, 42, 0.15);
          --stage-radius: 16px;
          --hud-bg: rgba(255, 255, 255, 0.9);
          --hud-border: #cbd5e1;
          --hud-hover: rgba(0, 0, 0, 0.06);
          --topbar-bg: #ffffff;
          --topbar-border: #e2e8f0;
          --rail-bg: #f8fafc;
          --rail-border: #e2e8f0;
        `
      };
    case 'dark-graph':
    case 'theme06':
      return {
        cssVariables: `
          --bg-canvas: #050b14;
          --bg-slide: #070d18;
          --text-main: #94a3b8;
          --text-title: #f1f5f9;
          --text-body: #cbd5e1;
          --text-muted: #64748b;
          --accent-color: #00e5ff;
          --accent-contrast: #00363a;
          --card-bg: #0e1726;
          --card-border: #1e293b;
          --card-shadow: 0 14px 32px -10px rgba(0, 0, 0, 0.7);
          --table-header-bg: #111e33;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 14px;
          --hud-bg: rgba(14, 23, 38, 0.9);
          --hud-border: #1e293b;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #091220;
          --topbar-border: #192538;
          --rail-bg: #0b1424;
          --rail-border: #192538;
        `
      };
    case 'crisp-whitepaper':
    case 'theme07':
      return {
        cssVariables: `
          --bg-canvas: #f5f5f4;
          --bg-slide: #fafaf9;
          --text-main: #292524;
          --text-title: #1c1917;
          --text-body: #44403c;
          --text-muted: #78716c;
          --accent-color: #15803d;
          --accent-contrast: #ffffff;
          --card-bg: #ffffff;
          --card-border: #e7e5e4;
          --card-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.06);
          --table-header-bg: #f5f5f4;
          --stage-shadow: 0 20px 60px -15px rgba(28, 25, 23, 0.12);
          --stage-radius: 8px;
          --hud-bg: rgba(250, 250, 249, 0.92);
          --hud-border: #d6d3d1;
          --hud-hover: rgba(0, 0, 0, 0.05);
          --topbar-bg: #ffffff;
          --topbar-border: #e7e5e4;
          --rail-bg: #f8f8f7;
          --rail-border: #e7e5e4;
        `
      };
    case 'noir-luxe':
    case 'theme08':
      return {
        cssVariables: `
          --bg-canvas: #000000;
          --bg-slide: #070707;
          --text-main: #e5e5e5;
          --text-title: #ffffff;
          --text-body: #a3a3a3;
          --text-muted: #737373;
          --accent-color: #d4af37;
          --accent-contrast: #000000;
          --card-bg: #111111;
          --card-border: #222222;
          --card-shadow: 0 16px 40px -15px rgba(0, 0, 0, 0.9);
          --table-header-bg: #161616;
          --stage-shadow: 0 30px 100px -25px rgba(0, 0, 0, 0.95);
          --stage-radius: 8px;
          --hud-bg: rgba(17, 17, 17, 0.92);
          --hud-border: #262626;
          --hud-hover: rgba(255, 255, 255, 0.12);
          --topbar-bg: #0b0b0b;
          --topbar-border: #222222;
          --rail-bg: #0d0d0d;
          --rail-border: #222222;
        `
      };
    case 'editorial-magazine':
    case 'theme09':
      return {
        cssVariables: `
          --bg-canvas: #050d18;
          --bg-slide: #0a192f;
          --text-main: #e2e8f0;
          --text-title: #f8fafc;
          --text-body: #cbd5e1;
          --text-muted: #94a3b8;
          --accent-color: #ef4444;
          --accent-contrast: #ffffff;
          --card-bg: #112240;
          --card-border: #233554;
          --card-shadow: 0 16px 36px -12px rgba(2, 12, 27, 0.7);
          --table-header-bg: #1d2d50;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.85);
          --stage-radius: 12px;
          --hud-bg: rgba(10, 25, 47, 0.9);
          --hud-border: #233554;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #081426;
          --topbar-border: #1d2d50;
          --rail-bg: #09172c;
          --rail-border: #1d2d50;
        `
      };
    case 'financial-index':
    case 'theme10':
      return {
        cssVariables: `
          --bg-canvas: #0c0d0f;
          --bg-slide: #121316;
          --text-main: #d4d4d8;
          --text-title: #ffffff;
          --text-body: #a1a1aa;
          --text-muted: #71717a;
          --accent-color: #e5a93c;
          --accent-contrast: #18181b;
          --card-bg: #18191d;
          --card-border: #27272a;
          --card-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.7);
          --table-header-bg: #202126;
          --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.9);
          --stage-radius: 6px;
          --hud-bg: rgba(18, 19, 22, 0.92);
          --hud-border: #27272a;
          --hud-hover: rgba(255, 255, 255, 0.1);
          --topbar-bg: #101114;
          --topbar-border: #222328;
          --rail-bg: #111216;
          --rail-border: #222328;
        `
      };
    case 'high-growth':
    case 'theme11':
      return {
        cssVariables: `
          --bg-canvas: #f1f3f8;
          --bg-slide: #ffffff;
          --text-main: #18181b;
          --text-title: #09090b;
          --text-body: #3f3f46;
          --text-muted: #71717a;
          --accent-color: #1d4ed8;
          --accent-contrast: #ffffff;
          --card-bg: #fafafa;
          --card-border: #e4e4e7;
          --card-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.1);
          --table-header-bg: #f4f4f5;
          --stage-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.18);
          --stage-radius: 16px;
          --hud-bg: rgba(255, 255, 255, 0.92);
          --hud-border: #d4d4d8;
          --hud-hover: rgba(0, 0, 0, 0.06);
          --topbar-bg: #ffffff;
          --topbar-border: #e4e4e7;
          --rail-bg: #f8fafc;
          --rail-border: #e4e4e7;
        `
      };
    case 'sonic-neon':
    case 'theme12':
      return {
        cssVariables: `
          --bg-canvas: #05000a;
          --bg-slide: #090014;
          --text-main: #e2e8f0;
          --text-title: #ffffff;
          --text-body: #cbd5e1;
          --text-muted: #94a3b8;
          --accent-color: #ff007f;
          --accent-contrast: #ffffff;
          --card-bg: #140526;
          --card-border: #2b0b4e;
          --card-shadow: 0 16px 40px -12px rgba(255, 0, 127, 0.2);
          --table-header-bg: #1c0836;
          --stage-shadow: 0 30px 100px -20px rgba(0, 0, 0, 0.95);
          --stage-radius: 16px;
          --hud-bg: rgba(9, 0, 20, 0.9);
          --hud-border: #2b0b4e;
          --hud-hover: rgba(255, 255, 255, 0.12);
          --topbar-bg: #0c011b;
          --topbar-border: #260a45;
          --rail-bg: #0e021f;
          --rail-border: #260a45;
        `
      };
    default: {
      // Dynamic lookup from 34 Zara Zhang bold archetypes if template.json exists
      try {
        const archetypeJsonPath = path.join(path.dirname(import.meta.filename), '../templates/archetypes', t, 'template.json');
        if (existsSync(archetypeJsonPath)) {
          const arch = JSON.parse(readFileSync(archetypeJsonPath, 'utf8'));
          const pal = arch.palette || {};
          const isLight = arch.scheme === 'light';
          return {
            cssVariables: `
              --bg-canvas: ${pal.bg_alt || pal.bg || (isLight ? '#f4f4f5' : '#0e1118')};
              --bg-slide: ${pal.bg || (isLight ? '#ffffff' : '#141824')};
              --text-main: ${pal.fg || (isLight ? '#18181b' : '#e2dcd0')};
              --text-title: ${pal.fg || (isLight ? '#09090b' : '#ffffff')};
              --text-body: ${isLight ? '#3f3f46' : '#94a3b8'};
              --text-muted: ${isLight ? '#71717a' : '#64748b'};
              --accent-color: ${pal.accent || (isLight ? '#000000' : '#c8a870')};
              --accent-contrast: ${isLight ? '#ffffff' : '#0e1118'};
              --card-bg: ${pal.bg_alt ? pal.bg_alt : (isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)')};
              --card-border: ${pal.accent ? pal.accent + '33' : (isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')};
              --card-shadow: 0 16px 36px -10px rgba(0, 0, 0, ${isLight ? '0.1' : '0.6'});
              --table-header-bg: ${pal.bg_alt || (isLight ? '#f4f4f5' : '#1a2234')};
              --stage-shadow: 0 30px 90px -20px rgba(0, 0, 0, ${isLight ? '0.2' : '0.85'});
              --stage-radius: 12px;
              --hud-bg: ${isLight ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'};
              --hud-border: ${isLight ? '#e4e4e7' : '#1e293b'};
              --hud-hover: ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'};
              --topbar-bg: ${pal.bg_alt || (isLight ? '#ffffff' : '#0b0f19')};
              --topbar-border: ${isLight ? '#e4e4e7' : '#1e293b'};
              --rail-bg: ${pal.bg || (isLight ? '#fafafa' : '#0d1320')};
              --rail-border: ${isLight ? '#e4e4e7' : '#1e293b'};
            `
          };
        }
      } catch {}

      // modern-clean / theme01
      return {
        cssVariables: `
          --bg-canvas: #f4f4f5;
          --bg-slide: #ffffff;
          --text-main: #27272a;
          --text-title: #18181b;
          --text-body: #3f3f46;
          --text-muted: #71717a;
          --accent-color: #0284c7;
          --accent-contrast: #ffffff;
          --card-bg: #fafafa;
          --card-border: #e4e4e7;
          --card-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.08);
          --table-header-bg: #f4f4f5;
          --stage-shadow: 0 25px 70px -15px rgba(0, 0, 0, 0.14);
          --stage-radius: 16px;
          --hud-bg: rgba(255, 255, 255, 0.9);
          --hud-border: #e4e4e7;
          --hud-hover: rgba(0, 0, 0, 0.06);
          --topbar-bg: #ffffff;
          --topbar-border: #e4e4e7;
          --rail-bg: #fafafa;
          --rail-border: #e4e4e7;
        `
      };
    }
  }
}

// CLI Direct Invocation
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const [inputFile, outDir] = process.argv.slice(2);
  if (!inputFile || !outDir) {
    console.error('Usage: node compile-markdown.mjs <input.md|input.json> <out-dir>');
    process.exit(1);
  }
  const html = compileDeck(inputFile);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`[✓] Compiled deck to: ${path.join(outDir, 'index.html')}`);
}
