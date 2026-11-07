import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { SlideDeck } from '../../../types/slide';

// Base storage directory requested by user:
// ~/Downloads/deck-gen/projects/<project-slug>/
const DECK_GEN_ROOT = path.join(os.homedir(), 'Downloads', 'deck-gen', 'projects');

/**
 * Helper to ensure safe project slug (alphanumeric and dashes only)
 */
function sanitizeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled-deck';
}

/**
 * Generate a standalone HTML file string for a single slide (1-slide = 1 HTML file standard)
 */
function generateStandaloneSlideHtml(slide: any, deck: SlideDeck, index: number): string {
  const isHtml = slide.layout === 'html' || slide.layout === 'bespoke' || Boolean(slide.rawHtml || slide.elements?.rawHtml);
  const rawHtml = slide.rawHtml || slide.elements?.rawHtml || '';

  if (isHtml && (rawHtml.includes('<html') || rawHtml.includes('<!DOCTYPE'))) {
    return rawHtml;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${deck.title} — Slide ${index + 1}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #09090b;
      color: #ffffff;
    }
    .slide-canvas {
      position: relative;
      width: 1920px;
      height: 1080px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 80px 100px;
      box-sizing: border-box;
    }
    .kicker {
      font-family: monospace;
      font-size: 13px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #a1a1aa;
    }
    .headline {
      font-size: 64px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-top: 24px;
    }
    .subtitle {
      font-size: 24px;
      line-height: 1.4;
      color: #a1a1aa;
      margin-top: 16px;
      max-width: 1200px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: monospace;
      font-size: 12px;
      color: #71717a;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
    }
    ${slide.customCss || ''}
  </style>
</head>
<body>
  <div class="slide-canvas">
    <div>
      <div class="kicker">${slide.kicker || 'EXECUTIVE PRESENTATION'}</div>
      <h1 class="headline">${slide.title || ''}</h1>
      <p class="subtitle">${slide.subtitle || ''}</p>
    </div>
    ${
      isHtml && rawHtml
        ? `<div class="custom-content">${rawHtml}</div>`
        : ''
    }
    <div class="footer">
      <div>${slide.elements?.footnote || deck.brandLabel || 'CONFIDENTIAL'}</div>
      <div>PAGE ${String(index + 1).padStart(2, '0')} / ${String(deck.slides.length).padStart(2, '0')}</div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * GET: List all projects OR load specific project deck.json
 */
export async function GET(req: NextRequest) {
  try {
    await fs.mkdir(DECK_GEN_ROOT, { recursive: true });
    const searchParams = req.nextUrl.searchParams;
    const requestedProject = searchParams.get('project');

    if (requestedProject) {
      const slug = sanitizeSlug(requestedProject);
      const projectDir = path.join(DECK_GEN_ROOT, slug);
      const deckFile = path.join(projectDir, 'deck.json');

      try {
        const raw = await fs.readFile(deckFile, 'utf-8');
        const deck = JSON.parse(raw);
        return NextResponse.json({ success: true, projectSlug: slug, projectDir, deck });
      } catch (err) {
        return NextResponse.json(
          { error: `Project '${slug}' not found on disk`, details: String(err) },
          { status: 404 }
        );
      }
    }

    // List all existing project directories
    const entries = await fs.readdir(DECK_GEN_ROOT, { withFileTypes: true });
    const projects = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        const projectDir = path.join(DECK_GEN_ROOT, slug);
        const deckFile = path.join(projectDir, 'deck.json');
        try {
          const stat = await fs.stat(deckFile);
          const raw = await fs.readFile(deckFile, 'utf-8');
          const parsed = JSON.parse(raw);
          projects.push({
            slug,
            title: parsed.title || slug,
            slideCount: Array.isArray(parsed.slides) ? parsed.slides.length : 0,
            themeId: parsed.themeId || 'obsidian-pure',
            updatedAt: stat.mtime.toISOString(),
            dir: projectDir,
          });
        } catch {
          // Folder exists without valid deck.json
          projects.push({
            slug,
            title: slug,
            slideCount: 0,
            themeId: 'unknown',
            updatedAt: new Date().toISOString(),
            dir: projectDir,
          });
        }
      }
    }

    // Sort newest first
    projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({
      success: true,
      root: DECK_GEN_ROOT,
      projects,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to access projects directory', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST: Save project to ~/Downloads/deck-gen/projects/<project-slug>/
 * Structure:
 * - deck.json
 * - slides/slide-01.html, slide-02.html, ...
 * - export/
 * - README.md
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectSlug, deck, exportFile } = body;

    if (!deck && !exportFile) {
      return NextResponse.json({ error: 'Missing deck or export payload' }, { status: 400 });
    }

    const slug = sanitizeSlug(projectSlug || deck?.title || 'deck-presentation');
    const projectDir = path.join(DECK_GEN_ROOT, slug);
    const slidesDir = path.join(projectDir, 'slides');
    const exportDir = path.join(projectDir, 'export');

    await fs.mkdir(projectDir, { recursive: true });
    await fs.mkdir(slidesDir, { recursive: true });
    await fs.mkdir(exportDir, { recursive: true });

    // Handle saving export file directly into ~/Downloads/deck-gen/projects/<slug>/export/
    if (exportFile) {
      const { filename, contentBase64, contentText } = exportFile;
      const safeFilename = path.basename(filename || 'export.dat');
      const targetPath = path.join(exportDir, safeFilename);

      if (contentBase64) {
        const buffer = Buffer.from(contentBase64, 'base64');
        await fs.writeFile(targetPath, buffer);
      } else if (contentText) {
        await fs.writeFile(targetPath, contentText, 'utf-8');
      }

      return NextResponse.json({
        success: true,
        message: 'Export file saved successfully',
        filePath: targetPath,
        projectSlug: slug,
      });
    }

    // Save full deck.json
    const deckFilePath = path.join(projectDir, 'deck.json');
    await fs.writeFile(deckFilePath, JSON.stringify(deck, null, 2), 'utf-8');

    // Save individual standalone HTML slides
    if (Array.isArray(deck.slides)) {
      for (let i = 0; i < deck.slides.length; i++) {
        const slide = deck.slides[i];
        const slideFilename = `slide-${String(i + 1).padStart(2, '0')}.html`;
        const slideFilePath = path.join(slidesDir, slideFilename);
        const htmlContent = generateStandaloneSlideHtml(slide, deck, i);
        await fs.writeFile(slideFilePath, htmlContent, 'utf-8');
      }
    }

    // Write context README.md for AI agents to maintain continuity
    const readmeContent = `# ${deck.title} — SlideDeck Project

- **Project Slug:** \`${slug}\`
- **Location:** \`${projectDir}\`
- **Last Updated:** ${new Date().toISOString()}
- **Theme ID:** \`${deck.themeId}\`
- **Chrome Style:** \`${deck.chromeStyle || 'minimal'}\`
- **Total Slides:** ${deck.slides?.length || 0}

---

## Folder Architecture

\`\`\`
${slug}/
├── deck.json                 # Master slide deck JSON state & metadata
├── slides/                   # 1-Slide = 1 HTML File standard
${(deck.slides || [])
  .map((s: any, idx: number) => `│   ├── slide-${String(idx + 1).padStart(2, '0')}.html (${s.layout} — "${s.title}")`)
  .join('\n')}
├── export/                   # Export artifacts (.pdf, .pptx, .svg, .png)
└── README.md                 # Project context & documentation for AI Agent
\`\`\`

---

## AI Agent Continuity Notes
When continuing or editing this slide deck:
1. Read \`deck.json\` to inspect the full deck configuration.
2. Edit specific slides directly or generate new standalone slides in \`slides/\`.
3. To view or export in the live Next.js engine:
   - Run: \`curl -X POST http://localhost:5200/api/projects -H "Content-Type: application/json" -d @deck.json\`
   - Open: \`http://localhost:5200/?project=${slug}\`
`;

    await fs.writeFile(path.join(projectDir, 'README.md'), readmeContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Project saved successfully to deck-gen/projects',
      projectSlug: slug,
      projectDir,
      deckFile: deckFilePath,
      slidesCount: deck.slides?.length || 0,
      exportDir,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save project', details: String(error) },
      { status: 500 }
    );
  }
}
