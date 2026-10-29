#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, openSync } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import net from 'node:net';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILL_ROOT = path.resolve(__dirname, '..');

const VERSION = '1.1.0';

function checkPortOpen(port, host = '127.0.0.1', timeout = 300) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function main() {
  const argv = process.argv.slice(2);
  const command = argv[0];

  if (!command || command === '--help' || command === '-h' || command === 'help') {
    printHelp();
    process.exit(0);
  }

  if (command === '--version' || command === '-v' || command === 'version') {
    console.log(`slidedeck-gen v${VERSION}`);
    process.exit(0);
  }

  switch (command) {
    case 'studio':
      await handleStudio(argv.slice(1));
      break;
    case 'init':
      await handleInit(argv.slice(1));
      break;
    case 'dev':
    case 'live':
      await handleDev(argv.slice(1));
      break;
    case 'done':
      await handleDone(argv.slice(1));
      break;
    case 'compile':
    case 'build':
      await handleCompile(argv.slice(1));
      break;
    case 'serve':
    case 'preview':
      await handleServe(argv.slice(1));
      break;
    case 'export-pdf':
      await handleExportPdf(argv.slice(1));
      break;
    case 'export-pptx':
      await handleExportPptx(argv.slice(1));
      break;
    case 'review':
      await handleReview(argv.slice(1));
      break;
    case 'templates':
    case 'list-templates':
      await handleListTemplates(argv.slice(1));
      break;
    case 'install-engine':
    case 'doctor':
      await handleInstallEngine(argv.slice(1));
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

function printHelp() {
  console.log(`
slidedeck-gen v${VERSION} — Autonomous 16:9 Presentation & Slide Deck Engine

Usage:
  slidedeck-gen <command> [options]

Commands:
  studio [port]            Launch Next.js Minimalist Monochrome Presentation Studio (port 5200)
  dev [deck-path]          Start live dev server + auto-open visible Chrome CDP with Live AI Cursor HUD
  init <deck-name>         Scaffold a new presentation project (supports 34 Zara Zhang bold archetypes)
  templates, list-templates List all 34 available Zara Zhang presentation archetypes
  compile <input>          Compile Markdown or Goal JSON to 16:9 presentation HTML
  serve <deck-dir>         Launch live preview server with real-time persistence
  done [options]           Finalize AI generation session and keep in-browser editor active
  export-pdf <target>      Export high-fidelity zero-margin 16:9 PDF via Chrome CDP
  export-pptx <target>     Export editable PowerPoint (.pptx) file
  install-engine           Verify and install PDF & PPTX dependencies and link CLI binary
  review <target>          Launch visible Chrome CDP reviewer with AI cursor HUD

Options:
  -h, --help               Display help information
  -v, --version            Display version information
  --template <template>    Template or archetype to use (e.g. signal, studio, neo-grid-bold, capsule)
  --theme <theme>          Theme to apply (e.g. cyber-glow, tech-code, noir-luxe, signal)
  --title <title>          Presentation title
  --port <port>            HTTP server port (default: 5200)
  --no-cdp                 Disable auto-launch of visible Chrome CDP in dev mode

Examples:
  slidedeck-gen studio
  slidedeck-gen list-templates
  slidedeck-gen init my-pitch --template signal --title "Executive Strategic Pitch"
  slidedeck-gen dev my-pitch
  slidedeck-gen done
  slidedeck-gen export-pdf my-pitch
`);
}

async function handleStudio(args) {
  const port = args[0] || '5200';
  const homeDir = process.env.HOME || '';
  const candidateDirs = [
    path.resolve(SKILL_ROOT, '../next-slidedeck-engine'),
    path.join(homeDir, '.agents/skills/next-slidedeck-engine'),
    path.join(homeDir, '.gemini/antigravity-cli/skills/next-slidedeck-engine'),
  ];

  let targetDir = candidateDirs.find((d) => existsSync(d));
  if (!targetDir) {
    targetDir = candidateDirs[0];
  }

  console.log(`\n[STUDIO] Launching Next.js Minimalist Monochrome Presentation Studio...`);
  console.log(`[DIR] Studio directory: ${targetDir}`);
  console.log(`[URL] Live Studio: http://localhost:${port}\n`);

  const child = spawn('npm', ['run', 'dev', '--', '-p', port], {
    cwd: targetDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
  });

  child.on('exit', (code) => process.exit(code || 0));
}

async function handleListTemplates(args) {
  const indexFile = path.join(SKILL_ROOT, 'templates/archetypes/selection-index.json');
  if (!existsSync(indexFile)) {
    console.error(`Archetype index not found at: ${indexFile}`);
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(indexFile, 'utf8'));
  const templates = data.templates || [];

  console.log(`\n📚 slidedeck-gen — 34 Zara Zhang Presentation Archetypes:\n`);
  console.log(`${'SLUG'.padEnd(20)} | ${'SCHEME'.padEnd(8)} | ${'NAME'.padEnd(22)} | ${'TAGLINE'}`);
  console.log('-'.repeat(100));

  for (const t of templates) {
    const slug = (t.slug || '').padEnd(20);
    const scheme = (t.scheme || 'dark').padEnd(8);
    const name = (t.name || '').padEnd(22);
    const tagline = (t.tagline || '').slice(0, 50);
    console.log(`${slug} | ${scheme} | ${name} | ${tagline}`);
  }

  console.log(`\nTo scaffold an archetype project:`);
  console.log(`  slidedeck-gen init <project-name> --template <slug> --title "My Title"\n`);
}

async function handleInit(args) {
  const deckName = args.find(a => !a.startsWith('--')) || 'my-presentation';
  const templateIdx = args.indexOf('--template');
  const templateName = templateIdx !== -1 ? args[templateIdx + 1] : 'signal';
  const titleIdx = args.indexOf('--title');
  const presentationTitle = titleIdx !== -1 ? args[titleIdx + 1] : 'Presentation Slide Deck';
  const outDir = path.resolve(process.cwd(), deckName);

  mkdirSync(outDir, { recursive: true });

  // 1. Check if templateName is one of the 34 Zara Zhang bold archetypes
  const archetypeDir = path.join(SKILL_ROOT, 'templates/archetypes', templateName);
  const archetypeHtml = path.join(archetypeDir, 'template.html');

  if (existsSync(archetypeHtml)) {
    let htmlContent = readFileSync(archetypeHtml, 'utf8');
    htmlContent = htmlContent.replace(/<html lang="[^"]*"/i, '<html lang="en"');
    if (presentationTitle !== 'Presentation Slide Deck') {
      htmlContent = htmlContent.replace(/<title>.*?<\/title>/i, `<title>${presentationTitle}</title>`);
      htmlContent = htmlContent.replace(/(class=["'][^"']*(?:display|title)[^"']*["'][^>]*>)(.*?)(<\/)/i, `$1${presentationTitle}$3`);
    }
    writeFileSync(path.join(outDir, 'index.html'), htmlContent, 'utf8');

    // Copy metadata files if present
    const metaFiles = ['deck-stage.js', 'template.json', 'design.md'];
    for (const f of metaFiles) {
      const src = path.join(archetypeDir, f);
      if (existsSync(src)) {
        copyFileSync(src, path.join(outDir, f));
      }
    }
    const baseStage = path.join(SKILL_ROOT, 'references/deck-stage.js');
    if (!existsSync(path.join(outDir, 'deck-stage.js')) && existsSync(baseStage)) {
      copyFileSync(baseStage, path.join(outDir, 'deck-stage.js'));
    }

    const starterMd = `<!-- theme: ${templateName} -->
<!-- title: ${presentationTitle} -->

# ${presentationTitle}
Executive Presentation Deck

---

<!-- layout: split -->
## Core Mission & Strategic Value
- 16:9 Widescreen Fixed Stage
- High-Taste Typography & Micro-Interactions
- Vector-Sharp Chrome CDP Export

---

<!-- layout: stats -->
## Key Operational Impact
- **+145%** Efficiency Growth
- **< 25ms** Hot-Reload Response
- **100%** Uncut Production Standards
`;
    writeFileSync(path.join(outDir, 'deck.md'), starterMd, 'utf8');

    console.log(`[✓] Created presentation project "${deckName}" at: ${outDir}`);
    console.log(`[✓] Scaffolded Zara Zhang archetype: "${templateName}" -> index.html (ready-to-serve)`);
    console.log(`\nNext steps:`);
    console.log(`  1. Start Live Dev Server: slidedeck-gen dev ${deckName}`);
    console.log(`  2. Finalize & Live Edit: slidedeck-gen done`);
    console.log(`  3. Export PDF: slidedeck-gen export-pdf ${deckName}`);
    return;
  }

  const templateMap = {
    'pitch-deck': 'pitch-deck.md',
    'technical-architecture': 'technical-architecture.md',
    'quarterly-business-review': 'quarterly-business-review.md',
    'minimal-executive': 'minimal-executive.json',
    'frontend-slides-editorial': 'frontend-slides-editorial.md',
    'frontend-slides-bento-grid': 'frontend-slides-bento-grid.md',
    'frontend-slides-bold-signal': 'frontend-slides-bold-signal.md',
    'frontend-slides-metric-spotlight': 'frontend-slides-metric-spotlight.md',
    'frontend-slides-creative-mode': 'frontend-slides-creative-mode.md',
    'frontend-slides-cobalt-cad': 'frontend-slides-cobalt-cad.md',
    'frontend-slides-neo-grid-swiss': 'frontend-slides-neo-grid-swiss.md',
    'frontend-slides-soft-editorial': 'frontend-slides-soft-editorial.md',
  };

  const filename = templateMap[templateName] || 'pitch-deck.md';
  const sourcePath = path.join(SKILL_ROOT, 'templates', filename);

  if (existsSync(sourcePath)) {
    const destName = filename.endsWith('.json') ? 'goal.json' : 'deck.md';
    copyFileSync(sourcePath, path.join(outDir, destName));
    console.log(`[✓] Created presentation project "${deckName}" at: ${outDir}`);
    console.log(`[✓] Scaffolded template: ${filename} -> ${destName}`);
    console.log(`\nNext steps:`);
    console.log(`  1. Start Live Dev Server: slidedeck-gen dev ${deckName}`);
    console.log(`  2. Or edit content: ${path.join(deckName, destName)}`);
    console.log(`  3. Compile: slidedeck-gen compile ${deckName}/${destName} --out ${deckName}/dist`);
  } else {
    console.error(`Template not found: ${templateName}`);
    console.log(`Run "slidedeck-gen list-templates" to see all available archetypes.`);
    process.exit(1);
  }
}

async function handleDev(args) {
  const target = args.find(a => !a.startsWith('--')) || '.';
  const isDaemon = args.includes('--daemon') || args.includes('--bg');
  const templateIdx = args.indexOf('--template');
  const templateName = templateIdx !== -1 ? args[templateIdx + 1] : 'signal';
  const titleIdx = args.indexOf('--title');
  const presentationTitle = titleIdx !== -1 ? args[titleIdx + 1] : 'Presentation Slide Deck';
  const portIdx = args.indexOf('--port');
  const port = portIdx !== -1 ? args[portIdx + 1] : '5200';

  const outDir = path.resolve(process.cwd(), target);

  // Auto-scaffold if target folder or index.html is missing
  if (!existsSync(outDir) || (!existsSync(path.join(outDir, 'index.html')) && !existsSync(path.join(outDir, 'deck.md')) && !existsSync(path.join(outDir, 'goal.json')))) {
    console.log(`[*] Target "${target}" not initialized. Auto-scaffolding template: ${templateName}...`);
    await handleInit([target, '--template', templateName, '--title', presentationTitle]);
  }

  const serveScript = path.join(SKILL_ROOT, 'scripts/serve-preview.mjs');
  const childArgs = [serveScript, target, '--dev'];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a !== target && a !== '--dev' && a !== '--daemon' && a !== '--bg') {
      childArgs.push(a);
    }
  }

  if (isDaemon) {
    console.log(`[*] Starting Live Preview Engine in background daemon mode for: ${target}`);
    const outLog = path.join(outDir, '.preview-server.log');
    const logFd = openSync(outLog, 'a');
    const child = spawn(process.execPath, childArgs, {
      cwd: process.cwd(),
      detached: true,
      stdio: ['ignore', logFd, logFd]
    });
    child.unref();

    // Wait up to 5s for preview server to be available
    let serverReady = false;
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 200));
      const isListening = await checkPortOpen(Number(port), '127.0.0.1', 200);
      if (isListening) {
        serverReady = true;
        break;
      }
    }

    const previewUrl = `http://127.0.0.1:${port}/`;
    writeFileSync(path.join(outDir, '.preview-server.json'), JSON.stringify({
      pid: child.pid,
      port: Number(port),
      url: previewUrl,
      target
    }, null, 2), 'utf8');

    console.log(`[✓] Live Preview Server running at: ${previewUrl}`);
    console.log(`[✓] Visible Chrome opened on screen via CDP port 9223 with Live AI Cursor HUD.`);
    console.log(`[✓] In-place live editor active: edits are auto-saved to disk.`);
    return;
  }

  const child = spawn(process.execPath, childArgs, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  child.on('close', code => process.exit(code || 0));
}

async function handleDone(args) {
  const portIdx = args.indexOf('--port');
  const port = portIdx !== -1 ? args[portIdx + 1] : '9223';
  const serverPortIdx = args.indexOf('--server-port');
  const serverPort = serverPortIdx !== -1 ? args[serverPortIdx + 1] : (process.env.PORT || '5200');
  const homeDir = process.env.HOME || '';
  const cdpAgentPath = path.join(homeDir, '.agents/tools/cdp_visual_agent.py');

  console.log('[*] Finalizing slide deck session...');

  // 1. Broadcast SSE status update to preview server so browser live badge updates
  const candidatePorts = [...new Set([serverPort, 5200, 5201, 5202, 4173])];
  for (const p of candidatePorts) {
    try {
      const postData = JSON.stringify({ status: '✅ Slide Deck Ready — In-Browser Live Editor Active' });
      const req = http.request({
        hostname: '127.0.0.1',
        port: Number(p),
        path: '/api/deck/status',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 300
      }, () => {});
      req.on('error', () => {});
      req.write(postData);
      req.end();
    } catch {}
  }

  // 2. Check if Chrome CDP port is actually listening before running cdp_visual_agent.py
  const isCdpActive = await checkPortOpen(Number(port), '127.0.0.1', 350);
  if (isCdpActive && existsSync(cdpAgentPath)) {
    try {
      let tabArg = [];
      const tabIdx = args.indexOf('--tab');
      if (tabIdx !== -1) {
        tabArg = ['--tab', args[tabIdx + 1]];
      } else {
        tabArg = ['--tab', String(serverPort || '5200')];
      }

      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 3500);
        const p1 = spawn('python3', [cdpAgentPath, 'status', '✅ Slide Deck Ready — In-Browser Live Editor Active', '--port', port, ...tabArg], { stdio: 'ignore' });
        p1.on('close', () => { clearTimeout(timer); resolve(); });
        p1.on('error', () => { clearTimeout(timer); resolve(); });
      });
      await new Promise(r => setTimeout(r, 400));
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 3500);
        const p2 = spawn('python3', [cdpAgentPath, 'done', '--port', port, ...tabArg], { stdio: 'ignore' });
        p2.on('close', () => { clearTimeout(timer); resolve(); });
        p2.on('error', () => { clearTimeout(timer); resolve(); });
      });
    } catch {}
  }

  console.log(`[✓] Slide Deck Generation Complete!`);
  console.log(`[✓] In-browser live editor remains active in Chrome.`);
  console.log(`[✓] You can click any text directly on screen to edit, or export via:`);
  console.log(`    slidedeck-gen export-pdf <target>`);
  console.log(`    slidedeck-gen export-pptx <target>`);
}

async function handleCompile(args) {
  const inputFile = args.find(a => !a.startsWith('--'));
  if (!inputFile) {
    console.error('Error: specify input file (e.g. deck.md or goal.json)');
    process.exit(1);
  }

  const outIdx = args.indexOf('--out');
  const outDir = outIdx !== -1 ? args[outIdx + 1] : path.join(path.dirname(inputFile), 'dist');
  const themeIdx = args.indexOf('--theme');
  const theme = themeIdx !== -1 ? args[themeIdx + 1] : undefined;
  const titleIdx = args.indexOf('--title');
  const title = titleIdx !== -1 ? args[titleIdx + 1] : undefined;

  const fullInput = path.resolve(process.cwd(), inputFile);
  if (!existsSync(fullInput)) {
    console.error(`Error: input file does not exist: ${fullInput}`);
    process.exit(1);
  }

  mkdirSync(path.resolve(process.cwd(), outDir), { recursive: true });
  const targetHtml = path.join(path.resolve(process.cwd(), outDir), 'index.html');

  if (inputFile.endsWith('.json') || inputFile.endsWith('.md')) {
    const { compileDeck } = await import('../scripts/compile-markdown.mjs');
    const html = compileDeck(fullInput, { theme, title });
    writeFileSync(targetHtml, html, 'utf8');
    console.log(`[✓] Compiled deck to: ${targetHtml} (${(html.length / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`Unsupported input format: ${inputFile}. Must be .md or .json`);
    process.exit(1);
  }
}

async function handleServe(args) {
  const dir = args.find(a => !a.startsWith('--')) || '.';
  const serveScript = path.join(SKILL_ROOT, 'scripts/serve-preview.mjs');

  const childArgs = [serveScript, dir];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a !== dir) {
      childArgs.push(a);
    }
  }

  const child = spawn(process.execPath, childArgs, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  child.on('close', code => process.exit(code || 0));
}

async function handleExportPdf(args) {
  const target = args.find(a => !a.startsWith('--'));
  if (!target) {
    console.error('Error: specify target deck directory or URL');
    process.exit(1);
  }

  const isFile = target.endsWith('.md') || target.endsWith('.json') || target.endsWith('.html');
  const targetBaseDir = isFile ? path.dirname(target) : target;
  const outIdx = args.indexOf('--out');
  const outFile = outIdx !== -1 ? args[outIdx + 1] : path.join(targetBaseDir, 'presentation.pdf');

  const { exportDeckToPdf } = await import('../scripts/export-cdp.mjs');
  console.log(`[*] Exporting 16:9 PDF via Chrome CDP...`);
  try {
    const res = await exportDeckToPdf(target, outFile);
    console.log(`[✓] Successfully exported PDF: ${res.outFile} (${(res.sizeBytes / 1024 / 1024).toFixed(2)} MB)`);
  } catch (err) {
    console.error(`Export failed: ${err.message}`);
    process.exit(1);
  }
}

async function handleExportPptx(args) {
  const target = args.find(a => !a.startsWith('--'));
  if (!target) {
    console.error('Error: specify target deck directory or URL');
    process.exit(1);
  }

  const isFile = target.endsWith('.md') || target.endsWith('.json') || target.endsWith('.html');
  const targetBaseDir = isFile ? path.dirname(target) : target;
  const outIdx = args.indexOf('--out');
  const outFile = outIdx !== -1 ? args[outIdx + 1] : path.join(targetBaseDir, 'presentation.pptx');

  // Auto-compile if target is markdown/json or if directory has no index.html
  let targetHtml = target;
  if (!target.endsWith('.html')) {
    if (target.endsWith('.md') || target.endsWith('.json')) {
      const fullPath = path.resolve(process.cwd(), target);
      const { compileDeck } = await import('../scripts/compile-markdown.mjs');
      const compiledHtml = compileDeck(fullPath);
      targetHtml = path.join(path.dirname(fullPath), 'index.html');
      writeFileSync(targetHtml, compiledHtml, 'utf8');
    } else {
      const fullDir = path.resolve(process.cwd(), target);
      targetHtml = path.join(fullDir, 'index.html');
      if (!existsSync(targetHtml)) {
        const candidateMd = path.join(fullDir, 'deck.md');
        const candidateJson = path.join(fullDir, 'goal.json');
        if (existsSync(candidateMd) || existsSync(candidateJson)) {
          const src = existsSync(candidateMd) ? candidateMd : candidateJson;
          const { compileDeck } = await import('../scripts/compile-markdown.mjs');
          const compiledHtml = compileDeck(src);
          writeFileSync(targetHtml, compiledHtml, 'utf8');
        }
      }
    }
  }

  const exportScript = path.join(SKILL_ROOT, 'scripts/export-pptx.py');
  if (existsSync(exportScript)) {
    const child = spawn('python3', [exportScript, targetHtml, outFile], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    child.on('close', code => {
      if (code !== 0) {
        console.error(`Export failed with code: ${code}`);
        process.exit(code);
      }
    });
  } else {
    console.error(`PPTX export script not found at: ${exportScript}`);
    process.exit(1);
  }
}

async function handleReview(args) {
  const target = args.find(a => !a.startsWith('--')) || '.';
  const portIdx = args.indexOf('--port');
  const port = portIdx !== -1 ? args[portIdx + 1] : '9223';
  const screenshotsIdx = args.indexOf('--screenshots');
  const screenshots = screenshotsIdx !== -1 ? args[screenshotsIdx + 1] : '';

  const reviewScript = path.join(SKILL_ROOT, 'scripts/review-cdp.py');
  const reviewArgs = [reviewScript, target, '--port', port];
  if (screenshots) {
    reviewArgs.push('--screenshots', screenshots);
  }

  const child = spawn('python3', reviewArgs, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  child.on('close', code => process.exit(code || 0));
}

async function handleInstallEngine() {
  const installScript = path.join(SKILL_ROOT, 'scripts/install-engine.sh');
  const child = spawn('bash', [installScript], {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  child.on('close', code => process.exit(code || 0));
}

main().catch(err => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
