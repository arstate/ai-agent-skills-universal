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
      if (slide.layout !== 'split') {
        pptSlide.addText(slide.title, {
          x: 0.8,
          y: 1.15,
          w: 11.73,
          h: slide.layout === 'cover' ? 1.4 : 0.9,
          fontSize: slide.layout === 'cover' ? 40 : 28,
          fontFace: 'Arial',
          color: (slide.elements.titleColor || theme.textPrimary).replace('#', ''),
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
            color: (slide.elements.subtitleColor || theme.textSecondary).replace('#', ''),
          });
        }
      }

      // Layout Specific Elements
      if (slide.layout === 'metrics' && slide.elements.metrics) {
        slide.elements.metrics.forEach((metric, mIdx) => {
          const cardX = 0.8 + mIdx * 2.95;
          const metricColor = metric.color ? metric.color.replace('#', '') : null;
          // Metric card background
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.1,
            w: 2.75,
            h: 3.2,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: metricColor || theme.border.replace('#', ''), width: 1 },
          });

          if (metricColor) {
            pptSlide.addShape(pres.ShapeType.rect, {
              x: cardX,
              y: 3.1,
              w: 2.75,
              h: 0.05,
              fill: { color: metricColor },
            });
          }

          // Metric Label
          pptSlide.addText(metric.label, {
            x: cardX + 0.2,
            y: 3.3,
            w: 2.35,
            h: 0.3,
            fontSize: 9,
            color: metricColor || theme.textMuted.replace('#', ''),
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
            color: metricColor || theme.textPrimary.replace('#', ''),
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
      } else if (slide.layout === 'split') {
        // Split layout: Left column (Title + Subtitle + Callout), Right column (Bullets)
        // Left Column Title & Subtitle
        pptSlide.addText(slide.title, {
          x: 0.8,
          y: 1.3,
          w: 4.8,
          h: 1.1,
          fontSize: 26,
          fontFace: 'Arial',
          bold: true,
          color: (slide.elements.titleColor || theme.textPrimary).replace('#', ''),
        });

        if (slide.subtitle) {
          pptSlide.addText(slide.subtitle, {
            x: 0.8,
            y: 2.45,
            w: 4.8,
            h: 0.65,
            fontSize: 12,
            fontFace: 'Arial',
            color: (slide.elements.subtitleColor || theme.textSecondary).replace('#', ''),
          });
        }

        // Left Column Callout Box
        const callout = slide.elements.callout || {
          kicker: 'CORE THESIS',
          title: 'Autonomous System Coherence',
          text: 'Structured layout boundaries preserve typographic rhythm and visual equilibrium without responsive slippage.',
          color: theme.accent,
        };
        const calloutColor = (callout.color || theme.accent).replace('#', '');

        pptSlide.addShape(pres.ShapeType.rect, {
          x: 0.8,
          y: 3.3,
          w: 4.8,
          h: 3.0,
          fill: { color: theme.surface.replace('#', '') },
          line: { color: calloutColor || theme.border.replace('#', ''), width: 1 },
        });

        pptSlide.addShape(pres.ShapeType.rect, {
          x: 0.8,
          y: 3.3,
          w: 4.8,
          h: 0.05,
          fill: { color: calloutColor },
        });

        pptSlide.addText(callout.kicker || 'CORE THESIS', {
          x: 1.0,
          y: 3.5,
          w: 4.4,
          h: 0.25,
          fontSize: 9,
          bold: true,
          color: calloutColor,
        });

        if (callout.title) {
          pptSlide.addText(callout.title, {
            x: 1.0,
            y: 3.85,
            w: 4.4,
            h: 0.4,
            fontSize: 13,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });
        }

        pptSlide.addText(callout.text, {
          x: 1.0,
          y: callout.title ? 4.35 : 3.85,
          w: 4.4,
          h: 1.7,
          fontSize: 10.5,
          color: theme.textSecondary.replace('#', ''),
        });

        // Right Column Bullets
        slide.elements.bullets?.forEach((bullet, bIdx) => {
          const cardY = 1.3 + bIdx * 1.25;
          pptSlide.addShape(pres.ShapeType.rect, {
            x: 5.9,
            y: cardY,
            w: 6.6,
            h: 1.05,
            fill: { color: theme.surfaceRaised.replace('#', '') },
            line: { color: theme.border.replace('#', ''), width: 1 },
          });

          pptSlide.addText(`—  ${bullet}`, {
            x: 6.1,
            y: cardY + 0.12,
            w: 6.2,
            h: 0.8,
            fontSize: 10.5,
            color: theme.textPrimary.replace('#', ''),
          });
        });
      } else if (slide.layout === 'image') {
        // Image Hero Layout: Left column (Headline, Subtitle, optional Callout), Right column (Zero-stretch image)
        pptSlide.addText(slide.title, {
          x: 0.8,
          y: 1.3,
          w: 5.2,
          h: 1.1,
          fontSize: 26,
          fontFace: 'Arial',
          bold: true,
          color: (slide.elements.titleColor || theme.textPrimary).replace('#', ''),
        });

        if (slide.subtitle) {
          pptSlide.addText(slide.subtitle, {
            x: 0.8,
            y: 2.45,
            w: 5.2,
            h: 0.8,
            fontSize: 12,
            fontFace: 'Arial',
            color: (slide.elements.subtitleColor || theme.textSecondary).replace('#', ''),
          });
        }

        const callout = slide.elements.callout;
        if (callout) {
          const calloutColor = (callout.color || theme.accent).replace('#', '');
          pptSlide.addShape(pres.ShapeType.rect, {
            x: 0.8,
            y: 3.4,
            w: 5.2,
            h: 2.8,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: calloutColor || theme.border.replace('#', ''), width: 1 },
          });

          pptSlide.addText(callout.kicker || 'EDITORIAL SPECIFICATION', {
            x: 1.0,
            y: 3.6,
            w: 4.8,
            h: 0.25,
            fontSize: 9,
            bold: true,
            color: calloutColor,
          });

          if (callout.title) {
            pptSlide.addText(callout.title, {
              x: 1.0,
              y: 3.95,
              w: 4.8,
              h: 0.4,
              fontSize: 13,
              bold: true,
              color: theme.textPrimary.replace('#', ''),
            });
          }

          pptSlide.addText(callout.text, {
            x: 1.0,
            y: callout.title ? 4.45 : 3.95,
            w: 4.8,
            h: 1.6,
            fontSize: 10.5,
            color: theme.textSecondary.replace('#', ''),
          });
        }

        const img = slide.elements.image;
        if (img?.url) {
          try {
            pptSlide.addImage({
              path: img.url,
              x: 6.3,
              y: 1.3,
              w: 6.2,
              h: 5.1,
            });
          } catch {
            pptSlide.addShape(pres.ShapeType.rect, {
              x: 6.3,
              y: 1.3,
              w: 6.2,
              h: 5.1,
              fill: { color: theme.surfaceRaised.replace('#', '') },
              line: { color: theme.border.replace('#', ''), width: 1 },
            });
            pptSlide.addText(img.caption || 'IMAGE ASSET', {
              x: 6.5,
              y: 3.5,
              w: 5.8,
              h: 0.5,
              fontSize: 12,
              align: 'center',
              color: theme.textSecondary.replace('#', ''),
            });
          }
        }
      } else if ((slide.layout === 'pillars' || slide.layout === 'timeline') && slide.elements.pillars) {
        slide.elements.pillars.forEach((pillar, pIdx) => {
          const cardX = 0.8 + pIdx * 4.0;
          const pillarColor = pillar.color ? pillar.color.replace('#', '') : null;
          pptSlide.addShape(pres.ShapeType.rect, {
            x: cardX,
            y: 3.1,
            w: 3.7,
            h: 3.2,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: pillarColor || theme.border.replace('#', ''), width: 1 },
          });

          if (pillarColor) {
            pptSlide.addShape(pres.ShapeType.rect, {
              x: cardX,
              y: 3.1,
              w: 3.7,
              h: 0.05,
              fill: { color: pillarColor },
            });
          }

          pptSlide.addText(pillar.tag || `PILLAR 0${pIdx + 1}`, {
            x: cardX + 0.2,
            y: 3.3,
            w: 3.3,
            h: 0.3,
            fontSize: 9,
            color: pillarColor || theme.textMuted.replace('#', ''),
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
        const cards = slide.elements.bentoCards;
        const layoutItems: { card: typeof cards[0]; col: number; row: number; span: number }[] = [];
        let curCol = 0;
        let curRow = 0;
        for (const card of cards) {
          const span = card.spanCol === 2 ? 2 : 1;
          if (curCol + span > 3) {
            curRow++;
            curCol = 0;
          }
          layoutItems.push({ card, col: curCol, row: curRow, span });
          curCol += span;
        }
        const maxRow = layoutItems.length > 0 ? Math.max(...layoutItems.map((item) => item.row)) : 0;
        const isMultiRow = maxRow >= 1;

        layoutItems.forEach(({ card, col, row, span }) => {
          const colW = 3.64;
          const colGap = 0.4;
          const colX = 0.8 + col * (colW + colGap);
          const cardW = span === 2 ? (2 * colW + colGap) : colW;
          const cardH = isMultiRow ? 1.65 : 3.2;
          const cardY = isMultiRow ? (3.1 + row * 1.85) : 3.1;
          const cardColor = card.color ? card.color.replace('#', '') : null;

          pptSlide.addShape(pres.ShapeType.rect, {
            x: colX,
            y: cardY,
            w: cardW,
            h: cardH,
            fill: { color: theme.surface.replace('#', '') },
            line: { color: cardColor || theme.border.replace('#', ''), width: 1 },
          });

          if (cardColor) {
            pptSlide.addShape(pres.ShapeType.rect, {
              x: colX,
              y: cardY,
              w: cardW,
              h: 0.05,
              fill: { color: cardColor },
            });
          }

          pptSlide.addText(card.subtitle || 'MODULE', {
            x: colX + 0.2,
            y: cardY + 0.15,
            w: cardW - 0.4,
            h: 0.25,
            fontSize: 8.5,
            color: cardColor || theme.textMuted.replace('#', ''),
            bold: true,
          });

          pptSlide.addText(card.title, {
            x: colX + 0.2,
            y: cardY + (isMultiRow ? 0.42 : 0.6),
            w: cardW - 0.4,
            h: isMultiRow ? 0.35 : 0.5,
            fontSize: isMultiRow ? 12 : 14,
            bold: true,
            color: theme.textPrimary.replace('#', ''),
          });

          pptSlide.addText(card.description, {
            x: colX + 0.2,
            y: cardY + (isMultiRow ? 0.8 : 1.2),
            w: cardW - 0.4,
            h: isMultiRow ? 0.45 : 1.2,
            fontSize: isMultiRow ? 9.5 : 11,
            color: theme.textSecondary.replace('#', ''),
          });

          if (card.stat) {
            pptSlide.addText(`TELEMETRY: ${card.stat}`, {
              x: colX + 0.2,
              y: cardY + (isMultiRow ? 1.3 : 2.5),
              w: cardW - 0.4,
              h: 0.3,
              fontSize: isMultiRow ? 10 : 12,
              bold: true,
              color: cardColor || theme.textPrimary.replace('#', ''),
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
      } else if (slide.layout === 'html' || slide.layout === 'bespoke' || slide.rawHtml || slide.elements?.rawHtml) {
        const raw = slide.rawHtml || slide.elements?.rawHtml || '';
        const cleanSnippet = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
        pptSlide.addText(slide.title || 'HTML Bespoke Slide', {
          x: 1.0,
          y: 2.0,
          w: 11.3,
          h: 0.8,
          fontSize: 24,
          bold: true,
          color: theme.textPrimary.replace('#', ''),
        });
        if (slide.subtitle) {
          pptSlide.addText(slide.subtitle, {
            x: 1.0,
            y: 2.9,
            w: 11.3,
            h: 0.6,
            fontSize: 14,
            color: theme.textSecondary.replace('#', ''),
          });
        }
        if (cleanSnippet) {
          pptSlide.addText(cleanSnippet, {
            x: 1.0,
            y: 3.7,
            w: 11.3,
            h: 2.8,
            fontSize: 11,
            color: theme.textSecondary.replace('#', ''),
          });
        }
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
      pptSlide.addText(slide.elements.footnote || 'CONFIDENTIAL · AUTONOMOUS SLIDE ENGINE', {
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
    const isHtml = slide.layout === 'html' || slide.layout === 'bespoke' || Boolean(slide.rawHtml || slide.elements?.rawHtml);
    if (isHtml) {
      const raw = slide.rawHtml || slide.elements?.rawHtml || '';
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <foreignObject x="0" y="0" width="1920" height="1080">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 1920px; height: 1080px; margin: 0; padding: 0; overflow: hidden;">
      ${raw}
    </div>
  </foreignObject>
</svg>`;
    }

    const titleEscaped = this.escapeXml(slide.title);
    const subtitleEscaped = this.escapeXml(slide.subtitle);
    const kickerEscaped = this.escapeXml(slide.kicker);
    const footnoteEscaped = this.escapeXml(slide.elements.footnote || 'CONFIDENTIAL · VECTOR SPECIFICATION');

    let bodySvg = '';

    switch (slide.layout) {
      case 'html':
      case 'bespoke': {
        const raw = slide.rawHtml || slide.elements.rawHtml || '';
        bodySvg = `
  <foreignObject x="96" y="160" width="1728" height="760">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; color: ${theme.textPrimary}; overflow: hidden;">
      ${raw}
    </div>
  </foreignObject>`;
        break;
      }

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
    <rect width="${cardWidth}" height="${cardHeight}" fill="${theme.surface}" stroke="${m.color ? m.color + '55' : theme.border}" stroke-width="1" />
    ${m.color ? `<rect width="${cardWidth}" height="3" fill="${m.color}" />` : ''}
    <text x="32" y="52" font-family="monospace" font-size="14" font-weight="600" letter-spacing="2" fill="${m.color || theme.textMuted}">${this.escapeXml(m.label)}</text>
    ${m.change ? `<rect x="260" y="32" width="108" height="28" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    <text x="314" y="51" text-anchor="middle" font-family="monospace" font-size="12" fill="${theme.textPrimary}">${this.escapeXml(m.change)}</text>` : ''}
    <text x="32" y="160" font-family="-apple-system, sans-serif" font-size="64" font-weight="700" fill="${m.color || theme.textPrimary}">${this.escapeXml(m.value)}</text>
    ${m.subtext ? `<text x="32" y="240" font-family="-apple-system, sans-serif" font-size="16" fill="${theme.textSecondary}">${this.escapeXml(m.subtext)}</text>` : ''}
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${slide.elements.titleColor || theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${slide.elements.subtitleColor || theme.textSecondary}">${subtitleEscaped}</text>
  ${cardsSvg}`;
        break;
      }

      case 'split': {
        const bullets = slide.elements.bullets || [];
        let bulletsSvg = '';
        bullets.forEach((b, i) => {
          const y = 260 + i * 115;
          bulletsSvg += `
  <rect x="860" y="${y}" width="964" height="96" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
  <rect x="884" y="${y + 38}" width="16" height="16" fill="${theme.surface}" stroke="${theme.accent}" stroke-width="2" />
  <text x="920" y="${y + 55}" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textPrimary}">${this.escapeXml(b)}</text>`;
        });

        const callout = slide.elements.callout || {
          kicker: 'CORE THESIS',
          title: 'Autonomous System Coherence',
          text: 'Structured mathematical layout boundaries preserve typographic rhythm and visual equilibrium without responsive slippage.',
          color: theme.accent,
        };
        const calloutColor = callout.color || theme.accent;

        bodySvg = `
  <g transform="translate(96, 240)">
    <text x="0" y="50" font-family="-apple-system, sans-serif" font-size="48" font-weight="700" fill="${slide.elements.titleColor || theme.textPrimary}">${titleEscaped}</text>
    <text x="0" y="100" font-family="-apple-system, sans-serif" font-size="20" fill="${slide.elements.subtitleColor || theme.textSecondary}">${subtitleEscaped}</text>
    
    <g transform="translate(0, 160)">
      <rect x="0" y="0" width="700" height="280" fill="${theme.surface}" stroke="${calloutColor ? calloutColor + '55' : theme.border}" stroke-width="1" />
      ${calloutColor ? `<rect x="0" y="0" width="700" height="3" fill="${calloutColor}" />` : ''}
      <text x="32" y="44" font-family="monospace" font-size="13" letter-spacing="2" font-weight="700" fill="${calloutColor}">${this.escapeXml(callout.kicker || 'CORE THESIS')}</text>
      ${callout.title ? `<text x="32" y="84" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(callout.title)}</text>` : ''}
      <text x="32" y="${callout.title ? 130 : 90}" font-family="-apple-system, sans-serif" font-size="17" fill="${theme.textSecondary}">${this.escapeXml(callout.text)}</text>
    </g>
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
    <rect width="${cardWidth}" height="${cardHeight}" fill="${theme.surface}" stroke="${p.color ? p.color + '55' : theme.border}" stroke-width="1" />
    ${p.color ? `<rect width="${cardWidth}" height="3" fill="${p.color}" />` : ''}
    <line x1="32" y1="64" x2="${cardWidth - 32}" y2="64" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="44" font-family="monospace" font-size="13" letter-spacing="2" fill="${p.color || theme.textMuted}">${this.escapeXml(p.tag || `PILLAR 0${i + 1}`)}</text>
    <text x="${cardWidth - 32}" y="44" text-anchor="end" font-family="monospace" font-size="14" fill="${p.color || theme.textSecondary}">0${i + 1}</text>
    
    <text x="32" y="120" font-family="-apple-system, sans-serif" font-size="26" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(p.title)}</text>
    <text x="32" y="170" font-family="-apple-system, sans-serif" font-size="18" fill="${theme.textSecondary}">${this.escapeXml(p.description)}</text>
    
    <line x1="32" y1="${cardHeight - 60}" x2="${cardWidth - 32}" y2="${cardHeight - 60}" stroke="${theme.border}" stroke-width="1" />
    <text x="32" y="${cardHeight - 30}" font-family="monospace" font-size="12" fill="${theme.textMuted}">SYSTEM STANDARD APPROVED</text>
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${slide.elements.titleColor || theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${slide.elements.subtitleColor || theme.textSecondary}">${subtitleEscaped}</text>
  ${cardsSvg}`;
        break;
      }

      case 'bento': {
        const cards = slide.elements.bentoCards || [];
        const layoutItems: { card: typeof cards[0]; col: number; row: number; span: number }[] = [];
        let curCol = 0;
        let curRow = 0;
        for (const card of cards) {
          const span = card.spanCol === 2 ? 2 : 1;
          if (curCol + span > 3) {
            curRow++;
            curCol = 0;
          }
          layoutItems.push({ card, col: curCol, row: curRow, span });
          curCol += span;
        }
        const maxRow = layoutItems.length > 0 ? Math.max(...layoutItems.map((item) => item.row)) : 0;
        const isMultiRow = maxRow >= 1;

        const marginX = 96;
        const gapX = 32;
        const colW = (1728 - 2 * gapX) / 3;
        const span2W = 2 * colW + gapX;

        let bentoSvg = '';
        layoutItems.forEach(({ card, col, row, span }) => {
          const cardX = marginX + col * (colW + gapX);
          const cardW = span === 2 ? span2W : colW;
          const cardH = isMultiRow ? 240 : 440;
          const cardY = isMultiRow ? (360 + row * 264) : 380;
          const cardColor = card.color || null;

          bentoSvg += `
  <g transform="translate(${cardX}, ${cardY})">
    <rect width="${cardW}" height="${cardH}" fill="${theme.surface}" stroke="${cardColor ? cardColor + '55' : theme.border}" stroke-width="1" />
    ${cardColor ? `<rect width="${cardW}" height="3" fill="${cardColor}" />` : ''}
    <text x="24" y="${isMultiRow ? 36 : 48}" font-family="monospace" font-size="${isMultiRow ? 11 : 13}" letter-spacing="2" fill="${cardColor || theme.textMuted}">${this.escapeXml(card.subtitle || 'MODULE')}</text>
    ${card.badge ? `<rect x="${cardW - 110}" y="${isMultiRow ? 18 : 28}" width="86" height="22" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    <text x="${cardW - 67}" y="${isMultiRow ? 33 : 44}" text-anchor="middle" font-family="monospace" font-size="10" fill="${theme.textPrimary}">${this.escapeXml(card.badge)}</text>` : ''}
    <text x="24" y="${isMultiRow ? 76 : 110}" font-family="-apple-system, sans-serif" font-size="${isMultiRow ? 22 : 28}" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(card.title)}</text>
    <text x="24" y="${isMultiRow ? 115 : 160}" font-family="-apple-system, sans-serif" font-size="${isMultiRow ? 14 : 18}" fill="${theme.textSecondary}">${this.escapeXml(card.description)}</text>
    ${card.stat ? `
    <line x1="24" y1="${cardH - 45}" x2="${cardW - 24}" y2="${cardH - 45}" stroke="${theme.border}" stroke-width="1" />
    <text x="24" y="${cardH - 18}" font-family="monospace" font-size="11" fill="${theme.textMuted}">TELEMETRY</text>
    <text x="${cardW - 24}" y="${cardH - 18}" text-anchor="end" font-family="monospace" font-size="${isMultiRow ? 18 : 24}" font-weight="700" fill="${cardColor || theme.textPrimary}">${this.escapeXml(card.stat)}</text>` : ''}
  </g>`;
        });

        bodySvg = `
  <text x="96" y="240" font-family="-apple-system, sans-serif" font-size="52" font-weight="700" fill="${slide.elements.titleColor || theme.textPrimary}">${titleEscaped}</text>
  <text x="96" y="290" font-family="-apple-system, sans-serif" font-size="22" fill="${slide.elements.subtitleColor || theme.textSecondary}">${subtitleEscaped}</text>
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

      case 'image': {
        const img = slide.elements.image;
        const imgUrl = this.escapeXml(img?.url || '');
        const captionEscaped = this.escapeXml(img?.caption || '');
        const callout = slide.elements.callout;
        const calloutColor = callout?.color || theme.accent;
        const scaleVal = (img?.scale || 100) / 100;
        const posX = img?.positionX ?? 50;
        const posY = img?.positionY ?? 50;

        bodySvg = `
  <!-- Left Column Text -->
  <g transform="translate(96, 220)">
    <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="44" font-weight="700" fill="${theme.textPrimary}">${titleEscaped}</text>
    <text x="0" y="94" font-family="-apple-system, sans-serif" font-size="20" fill="${theme.textSecondary}">${subtitleEscaped}</text>

    ${callout ? `
    <g transform="translate(0, 160)">
      <rect width="760" height="340" fill="${theme.surface}" stroke="${theme.border}" stroke-width="1" />
      <line x1="0" y1="0" x2="760" y2="0" stroke="${calloutColor}" stroke-width="4" />
      <text x="32" y="44" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2" fill="${calloutColor}">${this.escapeXml(callout.kicker || 'EDITORIAL SPECIFICATION')}</text>
      ${callout.title ? `<text x="32" y="88" font-family="-apple-system, sans-serif" font-size="20" font-weight="700" fill="${theme.textPrimary}">${this.escapeXml(callout.title)}</text>` : ''}
      <text x="32" y="${callout.title ? 130 : 88}" font-family="-apple-system, sans-serif" font-size="16" fill="${theme.textSecondary}">${this.escapeXml(callout.text)}</text>
    </g>` : ''}
  </g>

  <!-- Right Column Image Frame (Zero-Stretch Optical Enclosure) -->
  <g transform="translate(920, 200)">
    <clipPath id="slide-img-clip-${index}">
      <rect x="0" y="0" width="904" height="720" rx="4" />
    </clipPath>
    <rect width="904" height="720" rx="4" fill="${theme.surfaceRaised}" stroke="${theme.border}" stroke-width="1" />
    ${imgUrl ? `
    <g clip-path="url(#slide-img-clip-${index})">
      <image href="${imgUrl}" x="0" y="0" width="904" height="720" preserveAspectRatio="xMidYMid slice" transform-origin="${posX}% ${posY}%" transform="scale(${scaleVal})" />
    </g>
    ` : ''}
    <rect width="904" height="720" rx="4" fill="none" stroke="${theme.border}" stroke-width="1" />
    ${captionEscaped ? `
    <rect x="20" y="668" width="864" height="32" fill="${theme.bg}" opacity="0.85" rx="2" />
    <text x="36" y="689" font-family="monospace" font-size="12" fill="${theme.textSecondary}">${captionEscaped}</text>
    ` : ''}
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
  <text x="1824" y="1016" text-anchor="end" class="footnote">NEXT-SLIDEDECK-ENGINE · VECTOR</text>
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
