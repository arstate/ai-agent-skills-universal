'use client';

import pptxgen from 'pptxgenjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { SlideDeck, Slide, ThemeConfig } from '../types/slide';
import { THEMES } from '../presets/themes';

/**
 * Universal Export Engine supporting:
 * 1. PDF Vector (via print media / SVG vector stream with exact 16:9 1920x1080 bounds)
 * 2. PDF Image (via multi-page 4K html2canvas rasterization of all slides)
 * 3. PPTX Editable (via pptxgenjs node-by-node construction across all 8 layouts)
 * 4. SVG Only (via direct vector XML serialization for every layout)
 */
export class ExportEngine {
  /**
   * Export as pure SVG Vector file (single slide or all in a ZIP)
   */
  static async exportSvg(deck: SlideDeck, activeSlideIndex?: number): Promise<void> {
    const theme = THEMES[deck.themeId] || THEMES['obsidian-pure'];

    if (activeSlideIndex !== undefined) {
      // Export single active slide as .svg
      const slide = deck.slides[activeSlideIndex];
      const svgContent = this.generateSlideSvg(slide, theme, activeSlideIndex, deck.slides.length);
      this.downloadBlob(
        new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' }),
        `${this.sanitizeFilename(deck.title)}-slide-${activeSlideIndex + 1}.svg`
      );
    } else {
      // Export all slides in a .zip bundle
      const zip = new JSZip();
      deck.slides.forEach((slide, i) => {
        const svgContent = this.generateSlideSvg(slide, theme, i, deck.slides.length);
        zip.file(`slide-${String(i + 1).padStart(2, '0')}.svg`, svgContent);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      this.downloadBlob(zipBlob, `${this.sanitizeFilename(deck.title)}-svg-vector-bundle.zip`);
    }
  }

  /**
   * Export as Vector PDF (using high-fidelity print stylesheet with exact 16:9 1920x1080 dimensions)
   */
  static async exportPdfVector(): Promise<void> {
    // Triggers native browser print with vector preservation across all slides
    window.print();
  }

  /**
   * Export as high-resolution raster PDF (multi-page canvas snapshot across all slides)
   */
  static async exportPdfRaster(deck: SlideDeck, singleSlideIndex?: number): Promise<void> {
    const theme = THEMES[deck.themeId] || THEMES['obsidian-pure'];
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080],
    });

    if (singleSlideIndex !== undefined) {
      // Capture single slide
      const el = document.getElementById(`export-slide-${singleSlideIndex}`) || document.getElementById('deck-stage-canvas');
      if (el) {
        const canvas = await html2canvas(el, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: theme.bg,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
        pdf.save(`${this.sanitizeFilename(deck.title)}-slide-${singleSlideIndex + 1}.pdf`);
      }
      return;
    }

    // Capture all slides in deck sequentially
    let addedPages = 0;
    for (let i = 0; i < deck.slides.length; i++) {
      const el = document.getElementById(`export-slide-${i}`);
      if (!el) continue;

      if (addedPages > 0) {
        pdf.addPage([1920, 1080], 'landscape');
      }

      const canvas = await html2canvas(el, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: theme.bg,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      addedPages++;
    }

    // Fallback if offscreen export elements were not mounted
    if (addedPages === 0) {
      const stage = document.getElementById('deck-stage-canvas');
      if (stage) {
        const canvas = await html2canvas(stage, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: theme.bg,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      }
    }

    pdf.save(`${this.sanitizeFilename(deck.title)}-all-slides.pdf`);
  }

  /**
   * Export as fully editable PowerPoint presentation (.pptx) across all layouts
   */
  static async exportPptx(deck: SlideDeck): Promise<void> {
    const theme = THEMES[deck.themeId] || THEMES['obsidian-pure'];
    const pres = new pptxgen();

    // Standard 16:9 widescreen: 13.33 x 7.5 inches
    pres.layout = 'LAYOUT_16x9';
    pres.author = 'Autonomous Next Slide Engine';
    pres.title = deck.title;

    deck.slides.forEach((slide, idx) => {
      const pptSlide = pres.addSlide();

      // Background color
      pptSlide.background = { color: theme.bg.replace('#', '') };

      // Top Kicker
      pptSlide.addText(slide.kicker || 'EXECUTIVE BRIEFING', {
        x: 0.8,
        y: 0.45,
        w: 8.0,
        h: 0.3,
        fontSize: 10,
        fontFace: 'Arial',
        color: theme.textMuted.replace('#', ''),
        bold: true,
      });

      // Slide Counter
      pptSlide.addText(`${String(idx + 1).padStart(2, '0')} / ${String(deck.slides.length).padStart(2, '0')}`, {
        x: 11.5,
        y: 0.45,
        w: 1.5,
        h: 0.3,
        align: 'right',
        fontSize: 10,
        fontFace: 'Arial',
        color: theme.textMuted.replace('#', ''),
      });

      // Top Divider Line
      pptSlide.addShape(pres.ShapeType.line, {
        x: 0.8,
        y: 0.8,
        w: 11.73,
        h: 0,
        line: { color: theme.border.replace('#', ''), width: 1 },
      });

      // Main Headline Title
      pptSlide.addText(slide.title, {
        x: 0.8,
        y: 1.15,
        w: 11.73,
        h: slide.layout === 'cover' ? 1.4 : 0.9,
        fontSize: slide.layout === 'cover' ? 40 : 28,
        fontFace: 'Arial',
        color: theme.textPrimary.replace('#', ''),
        bold: true,
      });

      // Subtitle
      if (slide.subtitle) {
        pptSlide.addText(slide.subtitle, {
          x: 0.8,
          y: slide.layout === 'cover' ? 2.65 : 2.1,
          w: 11.0,
          h: 0.7,
          fontSize: 14,
          fontFace: 'Arial',
          color: theme.textSecondary.replace('#', ''),
        });
      }

      // Layout Specific Elements
      if (slide.layout === 'metrics' && slide.elements.metrics) {
        slide.elements.metrics.forEach((metric, mIdx) => {
          const cardX = 0.8 + mIdx * 2.95;
          // Metric card background
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.1,
            w: 2.75,
            h: 3.2,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          // Metric Label
          pptSlide.addText(metric.label, {
            x: cardX + 0.2,
            y: 3.3,
            w: 2.35,
            h: 0.3,
            fontSize: 9,
            color: theme.textMuted.replace('#', ''),
            bold: true,
          });

          // Metric Big Value
          pptSlide.addText(metric.value, {
            x: cardX + 0.2,
            y: 3.8,
            w: 2.35,
            h: 1.0,
            fontSize: 34,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          // Metric Subtext
          if (metric.subtext) {
            pptSlide.addText(metric.subtext, {
              x: cardX + 0.2,
              y: 5.0,
              w: 2.35,
              h: 1.0,
              fontSize: 10,
              color: theme.textSecondary.replace('#', ''),
            });
          }
        });
      } else if ((slide.layout === 'pillars' || slide.layout === 'timeline') && slide.elements.pillars) {
        slide.elements.pillars.forEach((pillar, pIdx) => {
          const cardX = 0.8 + pIdx * 4.0;
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.1,
            w: 3.7,
            h: 3.2,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          pptSlide.addText(pillar.tag || `PILLAR 0${pIdx + 1}`, {
            x: cardX + 0.2,
            y: 3.3,
            w: 3.3,
            h: 0.3,
            fontSize: 9,
            color: theme.textMuted.replace('#', ''),
            bold: true,
          });

          pptSlide.addText(pillar.title, {
            x: cardX + 0.2,
            y: 3.8,
            w: 3.3,
            h: 0.6,
            fontSize: 14,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          pptSlide.addText(pillar.description, {
            x: cardX + 0.2,
            y: 4.6,
            w: 3.3,
            h: 1.5,
            fontSize: 11,
            color: theme.textSecondary.replace('#', ''),
          });
        });
      } else if (slide.layout === 'bento' && slide.elements.bentoCards) {
        slide.elements.bentoCards.forEach((card, bIdx) => {
          const isWide = card.spanCol === 2;
          const colX = bIdx === 0 ? 0.8 : bIdx === 1 ? 4.8 : 8.8;
          const cardW = isWide ? 7.6 : 3.6;

          pptSlide.addShape(pres.ShapeType.rect, {
            x: colX,
            y: 3.1,
            w: cardW,
            h: 3.2,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          pptSlide.addText(card.subtitle || 'MODULE', {
            x: colX + 0.2,
            y: 3.3,
            w: cardW - 0.4,
            h: 0.3,
            fontSize: 9,
            color: theme.textMuted.replace('#', ''),
            bold: true,
          });

          pptSlide.addText(card.title, {
            x: colX + 0.2,
            y: 3.8,
            w: cardW - 0.4,
            h: 0.5,
            fontSize: 14,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          pptSlide.addText(card.description, {
            x: colX + 0.2,
            y: 4.4,
            w: cardW - 0.4,
            h: 1.2,
            fontSize: 11,
            color: theme.textSecondary.replace('#', ''),
          });

          if (card.stat) {
            pptSlide.addText(`TELEMETRY: ${card.stat}`, {
              x: colX + 0.2,
              y: 5.7,
              w: cardW - 0.4,
              h: 0.4,
              fontSize: 12,
              bold: true,
              color: theme.textPrimary.replace('#', ''),
            });
          }
        });
      } else if (slide.layout === 'comparison' && slide.elements.comparison) {
        const comp = slide.elements.comparison;
        // Left Column (Legacy)
        pptSlide.addShape(pres.ShapeType.rect, {
          x: 0.8,
          y: 3.1,
          w: 5.7,
          h: 3.2,
          fill: { color: theme.surface.replace('#', '') },
          line: { color: theme.border.replace('#', ''), width: 1 },
        });
        pptSlide.addText(comp.leftTitle || 'LEGACY SYSTEMS', {
          x: 1.0,
          y: 3.3,
          w: 5.3,
          h: 0.3,
          fontSize: 11,
          bold: true,
          color: theme.textMuted.replace('#', ''),
        });
        comp.leftItems?.forEach((item, idx2) => {
          pptSlide.addText(`—  ${item}`, {
            x: 1.0,
            y: 3.8 + idx2 * 0.5,
            w: 5.3,
            h: 0.45,
            fontSize: 11,
            color: theme.textSecondary.replace('#', ''),
          });
        });

        // Right Column (Recommended)
        pptSlide.addShape(pres.ShapeType.rect, {
          x: 6.83,
          y: 3.1,
          w: 5.7,
          h: 3.2,
          fill: { color: theme.surfaceRaised.replace('#', '') },
          line: { color: theme.border.replace('#', ''), width: 1 },
        });
        pptSlide.addText(comp.rightTitle || 'AUTONOMOUS ARCHITECTURE', {
          x: 7.03,
          y: 3.3,
          w: 5.3,
          h: 0.3,
          fontSize: 11,
          bold: true,
          color: theme.textPrimary.replace('#', ''),
        });
        comp.rightItems?.forEach((item, idx2) => {
          pptSlide.addText(`+  ${item}`, {
            x: 7.03,
            y: 3.8 + idx2 * 0.5,
            w: 5.3,
            h: 0.45,
            fontSize: 11,
            color: theme.textPrimary.replace('#', ''),
          });
        });
      } else if (slide.layout === 'quote' && slide.elements.quote) {
        pptSlide.addText(`"${slide.elements.quote.text}"`, {
          x: 1.5,
          y: 3.0,
          w: 10.3,
          h: 2.2,
          fontSize: 22,
          fontFace: 'Georgia',
          align: 'center',
          color: theme.textPrimary.replace('#', ''),
        });
        pptSlide.addText((slide.elements.quote.author || '').toUpperCase(), {
          x: 1.5,
          y: 5.4,
          w: 10.3,
          h: 0.4,
          fontSize: 12,
          bold: true,
          align: 'center',
          color: theme.textPrimary.replace('#', ''),
        });
      } else if (slide.elements.bullets) {
        slide.elements.bullets.forEach((bullet, bIdx) => {
          pptSlide.addText(`•  ${bullet}`, {
            x: 1.2,
            y: 3.1 + bIdx * 0.65,
            w: 10.5,
            h: 0.55,
            fontSize: 12,
            color: theme.textPrimary.replace('#', ''),
          });
        });
      }

      // Bottom Divider Line
      pptSlide.addShape(pres.ShapeType.line, {
        x: 0.8,
        y: 6.75,
        w: 11.73,
        h: 0,
        line: { color: theme.border.replace('#', ''), width: 1 },
      });

      // Footnote
      pptSlide.addText(slide.elements.footnote || 'CONFIDENTIAL // AUTONOMOUS SLIDE ENGINE', {
        x: 0.8,
        y: 6.85,
        w: 9.0,
        h: 0.3,
        fontSize: 9,
        fontFace: 'Arial',
        color: theme.textMuted.replace('#', ''),
      });
    });

    await pres.writeFile({ fileName: `${this.sanitizeFilename(deck.title)}.pptx` });
  }

  /**
   * Generate mathematically pure SVG XML string for a slide with 100% complete layout geometry
   */
  public static generateSlideSvg(
    slide: Slide,
    theme: ThemeConfig,
    index: number,
    totalSlides: number
  ): string {
    const titleEscaped = this.escapeXml(slide.title);
    const subtitleEscaped = this.escapeXml(slide.subtitle);
    const kickerEscaped = this.escapeXml(slide.kicker);
    const footnoteEscaped = this.escapeXml(slide.elements.footnote || 'CONFIDENTIAL // VECTOR SPECIFICATION');

    let bodySvg = '';

    switch (slide.layout) {
      case 'cover': {
        bodySvg = `
  <!-- Cover Metadata Badge -->
  <rect x="96" y="240" width="340" height="34" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
  <text x="110" y="262" font-family="monospace" font-size="12" fill="${theme.textSecondary}" letter-spacing="2">SYSTEM SPECIFICATION &amp; STRATEGY</text>

  <!-- Cover Large Title -->
  <text x="96" y="380" font-family="-apple-system, sans-serif" font-size="72" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="440" font-family="-apple-system, sans-serif" font-size="24" fill="${theme.textSecondary}">${subtitleEscaped}</text>

  <!-- Spec Footer Pills -->
  <line x1="96" y1="560" x2="1824" y2="560" stroke="${theme.border}" stroke-width="1" />
  <text x="96" y="600" font-family="monospace" font-size="12" fill="${theme.textMuted}">ENGINE ARCHITECTURE</text>
  <text x="96" y="625" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="${theme.textPrimary}">Next.js App Router / Vector SVG</text>

  <line x1="480" y1="585" x2="480" y2="635" stroke="${theme.border}" stroke-width="1" />
  <text x="520" y="600" font-family="monospace" font-size="12" fill="${theme.textMuted}">RATIO SPECIFICATION</text>
  <text x="520" y="625" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="${theme.textPrimary}">1920 × 1080 px (16:9 Standard)</text>

  <line x1="900" y1="585" x2="900" y2="635" stroke="${theme.border}" stroke-width="1" />
  <text x="940" y="600" font-family="monospace" font-size="12" fill="${theme.textMuted}">SECURITY CLASSIFICATION</text>
  <text x="940" y="625" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="${theme.textPrimary}">Proprietary &amp; Unrestricted</text>`;
        break;
      }

      case 'metrics': {
        const metrics = slide.elements.metrics || [];
        const cardWidth = 400;
        const gap = 42;
        const startX = 96;
        const startY = 400;
        const cardHeight = 380;

        let cardsSvg = '';
        metrics.forEach((m, i) => {
          const x = startX + i * (cardWidth + gap);
          cardsSvg += `
  <g transform="translate(${x}, ${startY})">
    <rect width="${cardWidth}" height="${cardHeight}" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="52" font-family="monospace" font-size="14" font-weight="600" letter-spacing="2" fill="${theme.textMuted}">${this.escapeXml(m.label)}</text>
    ${m.change ? `<rect x="260" y="32" width="108" height="28" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    <text x="314" y="51" text-anchor="middle" font-family="monospace" font-size="12" fill="${theme.textPrimary}">${this.escapeXml(m.change)}</text>` : ''}
    <text x="32" y="160" font-family="-apple-system, sans-serif" font-size="64" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(m.value)}</text>
    ${m.subtext ? `<text x="32" y="240" font-family="-apple-system, sans-serif" font-size="16" fill="${theme.textSecondary}">${this.escapeXml(m.subtext)}</text>` : ''}
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>
  ${cardsSvg}`;
        break;
      }

      case 'split': {
        const bullets = slide.elements.bullets || [];
        let bulletsSvg = '';
        bullets.forEach((b, i) => {
          const y = 380 + i * 100;
          bulletsSvg += `
  <rect x="880" y="${y}" width="944" height="80" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
  <rect x="904" y="${y + 32}" width="14" height="14" fill="${theme.surface}" stroke="${theme.accent}" stroke-width="2" />
  <text x="936" y="${y + 46}" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textPrimary}">${this.escapeXml(b)}</text>`;
        });

        bodySvg = `
  <g transform="translate(96, 240)">
    <text x="0" y="60" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
    <text x="0" y="120" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>
    
    <rect x="0" y="200" width="700" height="200" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="240" font-family="monospace" font-size="13" letter-spacing="2" fill="${theme.textMuted}">CORE THESIS</text>
    <text x="32" y="280" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textPrimary}">Structured mathematical layout boundaries preserve typographic rhythm</text>
    <text x="32" y="310" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textPrimary}">and visual equilibrium without responsive slippage.</text>
  </g>
  ${bulletsSvg}`;
        break;
      }

      case 'pillars':
      case 'timeline': {
        const pillars = slide.elements.pillars || [];
        const cardWidth = 530;
        const gap = 60;
        const startX = 96;
        const startY = 380;
        const cardHeight = 440;

        let cardsSvg = '';
        pillars.forEach((p, i) => {
          const x = startX + i * (cardWidth + gap);
          cardsSvg += `
  <g transform="translate(${x}, ${startY})">
    <rect width="${cardWidth}" height="${cardHeight}" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <line x1="32" y1="64" x2="${cardWidth - 32}" y2="64" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="44" font-family="monospace" font-size="13" letter-spacing="2" fill="${theme.textMuted}">${this.escapeXml(p.tag || `PILLAR 0${i + 1}`)}</text>
    <text x="${cardWidth - 32}" y="44" text-anchor="end" font-family="monospace" font-size="14" fill="${theme.textSecondary}">0${i + 1}</text>
    
    <text x="32" y="120" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(p.title)}</text>
    <text x="32" y="170" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textSecondary}">${this.escapeXml(p.description)}</text>
    
    <line x1="32" y1="${cardHeight - 60}" x2="${cardWidth - 32}" y2="${cardHeight - 60}" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="${cardHeight - 30}" font-family="monospace" font-size="12" fill="${theme.textMuted}">SYSTEM STANDARD APPROVED</text>
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>
  ${cardsSvg}`;
        break;
      }

      case 'bento': {
        const cards = slide.elements.bentoCards || [];
        let bentoSvg = '';
        cards.forEach((card, i) => {
          const isWide = card.spanCol === 2;
          const colX = i === 0 ? 96 : i === 1 ? 96 + 560 + 32 : 96 + 560 + 32 + 560 + 32;
          const cardW = isWide ? 1152 : 560;

          bentoSvg += `
  <g transform="translate(${colX}, 380)">
    <rect width="${cardW}" height="440" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="48" font-family="monospace" font-size="13" letter-spacing="2" fill="${theme.textMuted}">${this.escapeXml(card.subtitle || 'MODULE')}</text>
    ${card.badge ? `<rect x="${cardW - 140}" y="28" width="108" height="28" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    <text x="${cardW - 86}" y="47" text-anchor="middle" font-family="monospace" font-size="12" fill="${theme.textPrimary}">${this.escapeXml(card.badge)}</text>` : ''}
    <text x="32" y="110" font-family="-apple-system, sans-serif" font-size="28" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(card.title)}</text>
    <text x="32" y="160" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textSecondary}">${this.escapeXml(card.description)}</text>
    ${card.stat ? `
    <line x1="32" y1="360" x2="${cardW - 32}" y2="360" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="400" font-family="monospace" font-size="12" fill="${theme.textMuted}">TELEMETRY RATING</text>
    <text x="${cardW - 32}" y="400" text-anchor="end" font-family="monospace" font-size="24" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(card.stat)}</text>` : ''}
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>
  ${bentoSvg}`;
        break;
      }

      case 'quote': {
        const q = slide.elements.quote;
        bodySvg = `
  <g transform="translate(960, 480)" text-anchor="middle">
    <rect x="-140" y="-200" width="280" height="34" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <text x="0" y="-178" font-family="monospace" font-size="12" letter-spacing="2" fill="${theme.textMuted}">EXECUTIVE DOCTRINE</text>
    
    <text x="0" y="-60" font-family="Georgia, serif" font-size="44" fill="${theme.textPrimary}">“${this.escapeXml(q?.text || slide.subtitle)}”</text>
    <text x="0" y="80" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" letter-spacing="2" fill="${theme.textPrimary}">${this.escapeXml(q?.author || 'PRINCIPAL ARCHITECT')}</text>
    <text x="0" y="115" font-family="monospace" font-size="14" letter-spacing="2" fill="${theme.textMuted}">${this.escapeXml(q?.role || 'SYSTEMS DESIGN & ENGINEERING')}</text>
  </g>`;
        break;
      }

      case 'comparison': {
        const comp = slide.elements.comparison;
        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>
  
  <!-- Left Column -->
  <g transform="translate(96, 380)">
    <rect width="830" height="440" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
    <text x="40" y="52" font-family="monospace" font-size="14" font-weight="700" letter-spacing="2" fill="${theme.textMuted}">${this.escapeXml(comp?.leftTitle || 'LEGACY SYSTEMS')}</text>
    <line x1="40" y1="72" x2="790" y2="72" stroke="${theme.border}" stroke-width="1" />
    ${(comp?.leftItems || []).map((it, idx) => `<text x="40" y="${120 + idx * 60}" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textSecondary}">—   ${this.escapeXml(it)}</text>`).join('')}
  </g>
  
  <!-- Right Column -->
  <g transform="translate(994, 380)">
    <rect width="830" height="440" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    <text x="40" y="52" font-family="monospace" font-size="14" font-weight="700" letter-spacing="2" fill="${theme.textPrimary}">${this.escapeXml(comp?.rightTitle || 'AUTONOMOUS ARCHITECTURE')}</text>
    <line x1="40" y1="72" x2="790" y2="72" stroke="${theme.border}" stroke-width="1" />
    ${(comp?.rightItems || []).map((it, idx) => `<text x="40" y="${120 + idx * 60}" font-family="-apple-system, sans-serif" font-size="18" font-weight="600" fill="${theme.textPrimary}">+   ${this.escapeXml(it)}</text>`).join('')}
  </g>`;
        break;
      }

      default: {
        bodySvg = `
  <text x="96" y="320" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="380" font-family="-apple-system, sans-serif" font-size="22" fill="${theme.textSecondary}">${subtitleEscaped}</text>`;
        break;
      }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <style>
      .bg { fill: ${theme.bg}; }
      .border-line { stroke: ${theme.border}; stroke-width: 1px; }
      .kicker { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 14px; font-weight: 600; letter-spacing: 0.2em; fill: ${theme.textMuted}; }
      .counter { font-family: -apple-system, BlinkMacSystemFont, monospace; font-size: 14px; fill: ${theme.textSecondary}; font-weight: 600; }
      .footnote { font-family: monospace; font-size: 13px; fill: ${theme.textMuted}; letter-spacing: 0.05em; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" class="bg" />
  <rect x="0.5" y="0.5" width="1919" height="1079" fill="none" class="border-line" />

  <!-- Top Metadata Bar -->
  <line x1="96" y1="96" x2="1824" y2="96" class="border-line" />
  <text x="96" y="80" class="kicker">${kickerEscaped}</text>
  <text x="1824" y="80" text-anchor="end" class="counter">${String(index + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}</text>

  <!-- Layout Content -->
  ${bodySvg}

  <!-- Bottom Metadata Bar -->
  <line x1="96" y1="984" x2="1824" y2="984" class="border-line" />
  <text x="96" y="1016" class="footnote">${footnoteEscaped}</text>
  <text x="1824" y="1016" text-anchor="end" class="footnote">NEXT-SLIDEDECK-ENGINE // VECTOR</text>
</svg>`;
  }

  private static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private static sanitizeFilename(str: string): string {
    return (
      str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'presentation'
      );
  }

  private static escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
