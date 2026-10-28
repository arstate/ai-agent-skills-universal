#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import net from 'node:net';
import { spawn } from 'node:child_process';
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
  dev [deck-path]          Start live dev server + auto-open visible Chrome CDP with Live AI Cursor HUD
  init <deck-name>         Scaffold a new presentation project
  compile <input>          Compile Markdown or Goal JSON to 16:9 presentation HTML
  serve <deck-dir>         Launch live preview server with real-time persistence
  done [options]           Finalize AI generation session and keep in-browser editor active
  export-pdf <target>      Export high-fidelity zero-margin 16:9 PDF via Chrome CDP
  export-pptx <target>     Export editable PowerPoint (.pptx) file
  review <target>          Launch visible Chrome CDP reviewer with AI cursor HUD

Options:
  -h, --help               Display help information
  -v, --version            Display version information
  --theme <theme>          Theme to apply (e.g. cyber-glow, tech-code, noir-luxe, minimal-executive)
  --port <port>            HTTP server port (default: 5200)
  --no-cdp                 Disable auto-launch of visible Chrome CDP in dev mode

Examples:
  slidedeck-gen dev my-deck --theme cyber-glow
  slidedeck-gen init my-deck --template pitch-deck
  slidedeck-gen compile my-deck/deck.md --out dist/my-deck --theme cyber-glow
  slidedeck-gen serve dist/my-deck --port 5200 --open
  slidedeck-gen done
  slidedeck-gen export-pdf dist/my-deck --out dist/my-deck/presentation.pdf
  slidedeck-gen export-pptx dist/my-deck --out dist/my-deck/presentation.pptx
  slidedeck-gen review dist/my-deck --port 9223
`);
}

async function handleInit(args) {
  const deckName = args.find(a => !a.startsWith('--')) || 'my-presentation';
  const templateIdx = args.indexOf('--template');
  const templateName = templateIdx !== -1 ? args[templateIdx + 1] : 'pitch-deck';
  const outDir = path.resolve(process.cwd(), deckName);

  mkdirSync(outDir, { recursive: true });

  const templateMap = {
    'pitch-deck': 'pitch-deck.md',
    'technical-architecture': 'technical-architecture.md',
    'quarterly-business-review': 'quarterly-business-review.md',
    'minimal-executive': 'minimal-executive.json',
    'frontend-slides-editorial': 'frontend-slides-editorial.md',
    'frontend-slides-bento-grid': 'frontend-slides-bento-grid.md',
    'frontend-slides-bold-signal': 'frontend-slides-bold-signal.md',
    'frontend-slides-metric-spotlight': 'frontend-slides-metric-spotlight.md',
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
    process.exit(1);
  }
}

async function handleDev(args) {
  const target = args.find(a => !a.startsWith('--')) || '.';
  const serveScript = path.join(SKILL_ROOT, 'scripts/serve-preview.mjs');

  const childArgs = [serveScript, target, '--dev'];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a !== target && a !== '--dev') {
      childArgs.push(a);
    }
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

  if (inputFile.endsWith('.md') || inputFile.endsWith('.json')) {
    const { compileDeck } = await import('../scripts/compile-markdown.mjs');
    const html = compileDeck(fullInput, { theme, title });
    const targetHtml = path.join(path.resolve(process.cwd(), outDir), 'index.html');
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

main().catch(err => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
