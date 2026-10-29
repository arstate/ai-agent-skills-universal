'use client';

import pptxgen from 'pptxgenjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { SlideDeck, Slide, ThemeConfig } from '../types/slide';
import { THEMES } from '../presets/themes';

/**
 * Universal Export Engine supporting:
 * 1. PDF Vector (via print media / SVG vector stream)
 * 2. PDF Image (via high-res 4K html2canvas rasterization)
 * 3. PPTX Editable (via pptxgenjs node-by-node construction)
 * 4. SVG Only (via direct vector XML serialization)
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
    // Triggers native browser print with vector preservation
    window.print();
  }

  /**
   * Export as high-resolution raster PDF (4K canvas snapshot)
   */
  static async exportPdfRaster(deck: SlideDeck): Promise<void> {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080],
    });

    const slideElements = document.querySelectorAll<HTMLElement>('[id^="slide-canvas-"]');
    if (!slideElements || slideElements.length === 0) {
      // Fallback: grab the currently visible stage
      const stage = document.getElementById('deck-stage-canvas');
      if (stage) {
        const canvas = await html2canvas(stage, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#000000',
        });
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
        pdf.save(`${this.sanitizeFilename(deck.title)}.pdf`);
      }
      return;
    }

    for (let i = 0; i < slideElements.length; i++) {
      if (i > 0) pdf.addPage([1920, 1080], 'landscape');
      const el = slideElements[i];
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
      });
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
    }

    pdf.save(`${this.sanitizeFilename(deck.title)}-raster-4k.pdf`);
  }

  /**
   * Export as fully editable PowerPoint presentation (.pptx)
   */
  static async exportPptx(deck: SlideDeck): Promise<void> {
    const theme = THEMES[deck.themeId] || THEMES['obsidian-pure'];
    const pres = new pptxgen();

    // Standard 16:9 widescreen
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
        y: 0.5,
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
        y: 0.5,
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
        y: 0.85,
        w: 11.7,
        h: 0,
        line: { color: theme.border.replace('#', ''), width: 1 },
      });

      // Main Headline Title
      pptSlide.addText(slide.title, {
        x: 0.8,
        y: 1.3,
        w: 11.7,
        h: 1.2,
        fontSize: slide.layout === 'cover' ? 44 : 32,
        fontFace: 'Arial',
        color: theme.textPrimary.replace('#', ''),
        bold: true,
      });

      // Subtitle
      if (slide.subtitle) {
        pptSlide.addText(slide.subtitle, {
          x: 0.8,
          y: slide.layout === 'cover' ? 2.6 : 2.5,
          w: 10.5,
          h: 0.8,
          fontSize: 14,
          fontFace: 'Arial',
          color: theme.textSecondary.replace('#', ''),
        });
      }

      // Layout specific content
      if (slide.layout === 'metrics' && slide.elements.metrics) {
        slide.elements.metrics.forEach((metric, mIdx) => {
          const cardX = 0.8 + mIdx * 2.95;
          // Metric card background
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.6,
            w: 2.75,
            h: 2.8,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          // Metric Label
          pptSlide.addText(metric.label, {
            x: cardX + 0.2,
            y: 3.8,
            w: 2.35,
            h: 0.3,
            fontSize: 9,
            color: theme.textMuted.replace('#', ''),
            bold: true,
          });

          // Metric Big Value
          pptSlide.addText(metric.value, {
            x: cardX + 0.2,
            y: 4.2,
            w: 2.35,
            h: 0.9,
            fontSize: 34,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          // Metric Subtext
          if (metric.subtext) {
            pptSlide.addText(metric.subtext, {
              x: cardX + 0.2,
              y: 5.2,
              w: 2.35,
              h: 0.8,
              fontSize: 10,
              color: theme.textSecondary.replace('#', ''),
            });
          }
        });
      } else if (slide.layout === 'pillars' && slide.elements.pillars) {
        slide.elements.pillars.forEach((pillar, pIdx) => {
          const cardX = 0.8 + pIdx * 4.0;
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.6,
            w: 3.7,
            h: 2.8,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          pptSlide.addText(pillar.tag || `PILLAR 0${pIdx + 1}`, {
            x: cardX + 0.2,
            y: 3.8,
            w: 3.3,
            h: 0.3,
            fontSize: 9,
            color: theme.textMuted.replace('#', ''),
            bold: true,
          });

          pptSlide.addText(pillar.title, {
            x: cardX + 0.2,
            y: 4.2,
            w: 3.3,
            h: 0.6,
            fontSize: 14,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          pptSlide.addText(pillar.description, {
            x: cardX + 0.2,
            y: 4.9,
            w: 3.3,
            h: 1.2,
            fontSize: 11,
            color: theme.textSecondary.replace('#', ''),
          });
        });
      } else if (slide.layout === 'quote' && slide.elements.quote) {
        pptSlide.addText(`"${slide.elements.quote.text}"`, {
          x: 1.5,
          y: 3.2,
          w: 10.3,
          h: 2.0,
          fontSize: 24,
          fontFace: 'Georgia',
          align: 'center',
          color: theme.textPrimary.replace('#', ''),
        });
        pptSlide.addText(slide.elements.quote.author.toUpperCase(), {
          x: 1.5,
          y: 5.3,
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
            y: 3.6 + bIdx * 0.7,
            w: 10.5,
            h: 0.6,
            fontSize: 13,
            color: theme.textPrimary.replace('#', ''),
          });
        });
      }

      // Bottom Divider Line
      pptSlide.addShape(pres.ShapeType.line, {
        x: 0.8,
        y: 6.7,
        w: 11.7,
        h: 0,
        line: { color: theme.border.replace('#', ''), width: 1 },
      });

      // Footnote
      pptSlide.addText(slide.elements.footnote || 'CONFIDENTIAL // AUTONOMOUS SLIDE ENGINE', {
        x: 0.8,
        y: 6.8,
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
   * Generate mathematically pure SVG XML string for a slide
   */
  private static generateSlideSvg(
    slide: Slide,
    theme: ThemeConfig,
    index: number,
    totalSlides: number
  ): string {
    const titleEscaped = this.escapeXml(slide.title);
    const subtitleEscaped = this.escapeXml(slide.subtitle);
    const kickerEscaped = this.escapeXml(slide.kicker);
    const footnoteEscaped = this.escapeXml(slide.elements.footnote || 'CONFIDENTIAL // VECTOR SPECIFICATION');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <style>
      .bg { fill: ${theme.bg}; }
      .border-line { stroke: ${theme.border}; stroke-width: 1px; }
      .kicker { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; font-size: 14px; font-weight: 600; letter-spacing: 0.2em; fill: ${theme.textMuted}; }
      .counter { font-family: -apple-system, BlinkMacSystemFont, monospace; font-size: 14px; fill: ${theme.textSecondary}; font-weight: 600; }
      .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 64px; font-weight: 700; fill: ${theme.textPrimary}; }
      .subtitle { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 24px; fill: ${theme.textSecondary}; }
      .card-bg { fill: ${theme.surface}; }
      .card-border { stroke: ${theme.border}; stroke-width: 1px; }
      .metric-val { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 54px; font-weight: 700; fill: ${theme.textPrimary}; }
      .metric-label { font-family: monospace; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; fill: ${theme.textMuted}; }
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

  <!-- Slide Title & Subtitle -->
  <text x="96" y="240" class="title">${titleEscaped}</text>
  <text x="96" y="300" class="subtitle">${subtitleEscaped}</text>

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
