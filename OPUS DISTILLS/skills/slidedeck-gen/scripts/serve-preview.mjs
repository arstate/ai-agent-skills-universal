#!/usr/bin/env node
import http from 'node:http';
import { existsSync, readFileSync, writeFileSync, mkdirSync, watch } from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALLER_CWD = process.env.INIT_CWD || process.cwd();
const rawArgs = process.argv.slice(2);

// Parse flags and arguments
const targetArg = rawArgs.find(a => !a.startsWith('--')) || '.';
const portIdx = rawArgs.indexOf('--port');
const requestedPort = Number(portIdx !== -1 ? rawArgs[portIdx + 1] : (process.env.PORT || 5200));
const host = process.env.HOST || '127.0.0.1';

const themeIdx = rawArgs.indexOf('--theme');
const requestedTheme = themeIdx !== -1 ? rawArgs[themeIdx + 1] : undefined;

const titleIdx = rawArgs.indexOf('--title');
const requestedTitle = titleIdx !== -1 ? rawArgs[titleIdx + 1] : undefined;

const statusIdx = rawArgs.indexOf('--status');
let currentStatus = statusIdx !== -1 ? rawArgs[statusIdx + 1] : 'Building Slide Deck Live...';

const isDev = rawArgs.includes('--dev') || rawArgs.includes('--watch');
const enableCdp = rawArgs.includes('--cdp') || (!rawArgs.includes('--no-cdp') && isDev);
const autoOpen = rawArgs.includes('--open') || enableCdp;

// Resolve target paths
let resolvedTarget = path.resolve(CALLER_CWD, targetArg);
let sourceFile = null;
let serveDir = resolvedTarget;

if (resolvedTarget.endsWith('.md') || resolvedTarget.endsWith('.json')) {
  sourceFile = resolvedTarget;
  const parentDir = path.dirname(resolvedTarget);
  serveDir = path.join(parentDir, 'dist');
} else {
  // Check if target is a directory containing deck.md or goal.json
  const candidateMd = path.join(resolvedTarget, 'deck.md');
  const candidateJson = path.join(resolvedTarget, 'goal.json');
  const candidateIndex = path.join(resolvedTarget, 'index.html');

  if (existsSync(candidateMd)) {
    sourceFile = candidateMd;
    serveDir = resolvedTarget;
  } else if (existsSync(candidateJson)) {
    sourceFile = candidateJson;
    serveDir = resolvedTarget;
  } else if (!existsSync(candidateIndex)) {
    // Scaffold default initial starter deck so live preview opens immediately
    mkdirSync(resolvedTarget, { recursive: true });
    sourceFile = candidateMd;
    const starterContent = `<!-- theme: ${requestedTheme || 'cyber-glow'} -->
<!-- transition: slide -->

# Building Slide Deck Live...
### Autonomous AI Presentation Engine
<!-- layout: cover -->
`;
    writeFileSync(sourceFile, starterContent, 'utf8');
    serveDir = resolvedTarget;
  }
}

mkdirSync(serveDir, { recursive: true });

// Compile sourceFile to index.html if source exists
async function triggerCompilation(silent = false) {
  if (!sourceFile || !existsSync(sourceFile)) return;
  try {
    const { compileDeck } = await import('./compile-markdown.mjs');
    const html = compileDeck(sourceFile, { theme: requestedTheme, title: requestedTitle });
    const targetHtml = path.join(serveDir, 'index.html');
    writeFileSync(targetHtml, html, 'utf8');
    if (!silent) {
      console.log(`[slidedeck-gen] Auto-compiled ${path.basename(sourceFile)} -> index.html (${(html.length / 1024).toFixed(1)} KB)`);
    }
  } catch (err) {
    console.error(`[slidedeck-gen] Compilation error: ${err.message}`);
  }
}

// Initial compilation before starting server
await triggerCompilation(false);

const indexPath = path.join(serveDir, 'index.html');
if (!existsSync(indexPath)) {
  console.error(`Error: index.html not found in directory: ${serveDir}`);
  process.exit(1);
}

const sseClients = new Set();

function broadcastSse(data) {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try { client.write(msg); } catch {}
  }
}

// Watch serve directory & source directory for changes
let compileDebounceTimer = null;
const watchDirs = new Set([serveDir]);
if (sourceFile) watchDirs.add(path.dirname(sourceFile));

let lastPersistTimestamp = 0;

for (const dirToWatch of watchDirs) {
  try {
    watch(dirToWatch, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      const lower = filename.toLowerCase();
      if (lower.endsWith('.md') || lower.endsWith('.json')) {
        clearTimeout(compileDebounceTimer);
        compileDebounceTimer = setTimeout(async () => {
          await triggerCompilation(false);
          broadcastSse({ type: 'reload', filename, time: Date.now() });
        }, 50);
      } else if (lower.endsWith('.html') || lower.endsWith('.css') || lower.endsWith('.js')) {
        // Prevent auto-save persistence from looping and reloading the editing browser
        if (lower.endsWith('index.html') && Date.now() - lastPersistTimestamp < 2500) {
          return;
        }
        clearTimeout(compileDebounceTimer);
        compileDebounceTimer = setTimeout(() => {
          broadcastSse({ type: 'reload', filename, time: Date.now() });
        }, 50);
      }
    });
  } catch {}
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  const pathname = url.pathname;

  // SSE Hot-Reload endpoint
  if (pathname === '/events' || pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`data: ${JSON.stringify({ type: 'connected', status: currentStatus })}\n\n`);
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  // Live Status API endpoint
  if (pathname === '/api/deck/status') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          if (payload.status) {
            currentStatus = payload.status;
            broadcastSse({ type: 'status', message: currentStatus });
            if (enableCdp) {
              updateCdpStatus(currentStatus);
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, status: currentStatus }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ status: currentStatus, clients: sseClients.size, time: Date.now() }));
      return;
    }
  }

  // Real-time deck persistence endpoint
  if (pathname === '/api/deck/persist' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const targetHtml = path.join(serveDir, 'index.html');
        if (payload.html && existsSync(targetHtml)) {
          lastPersistTimestamp = Date.now();
          let currentContent = readFileSync(targetHtml, 'utf8');
          const stageRegex = /(<div class="slide-stage"[^>]*>)([\s\S]*?)(<\/div>\s*<\/main>|<div class="deck-hud"|<footer class="deck-hud")/i;
          if (stageRegex.test(currentContent)) {
            currentContent = currentContent.replace(stageRegex, (match, p1, p2, p3) => `${p1}\n${payload.html}\n${p3}`);
          }
          if (payload.theme) {
            currentContent = currentContent.replace(/data-theme="[^"]*"/i, `data-theme="${payload.theme}"`);
          }
          writeFileSync(targetHtml, currentContent, 'utf8');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, savedAt: Date.now() }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Export PPTX endpoint
  if (pathname === '/api/export/pptx' && req.method === 'POST') {
    const targetHtml = path.join(serveDir, 'index.html');
    const outPptx = path.join(serveDir, 'presentation.pptx');
    const exportScript = path.join(__dirname, 'export-pptx.py');
    try {
      const { execFileSync } = await import('node:child_process');
      execFileSync('python3', [exportScript, targetHtml, outPptx], { stdio: 'inherit' });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, downloadUrl: '/presentation.pptx' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Export PDF endpoint
  if (pathname === '/api/export/pdf' && req.method === 'POST') {
    const targetHtml = path.join(serveDir, 'index.html');
    const outPdf = path.join(serveDir, 'presentation.pdf');
    try {
      const { exportDeckToPdf } = await import('./export-cdp.mjs');
      await exportDeckToPdf(targetHtml, outPdf);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, downloadUrl: '/presentation.pdf' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Static file serving
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(serveDir, reqPath);

  if (existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.mjs': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
      '.pdf': 'application/pdf',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    const content = readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': mimeMap[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

async function startServer() {
  const port = await reserveAvailablePort(requestedPort, host);
  server.listen(port, host, () => {
    const url = `http://${host === '0.0.0.0' ? '127.0.0.1' : host}:${port}/`;
    console.log(`[slidedeck-gen] Live preview server running at: ${url}`);
    console.log(`[slidedeck-gen] Serving directory: ${serveDir}`);
    if (sourceFile) {
      console.log(`[slidedeck-gen] Watching source file: ${sourceFile} (Auto-Recompile Active)`);
    }
    console.log(`[slidedeck-gen] Hot-reload and live-persistence active.`);

    if (autoOpen) {
      launchVisibleBrowser(url, enableCdp);
    }
  });
}

function launchVisibleBrowser(url, cdpMode) {
  const homeDir = process.env.HOME || '';
  const cdpPort = '9223';

  if (process.platform === 'win32') {
    const winPs1 = path.join(homeDir, '.agents/tools/windows/launch-visible-chrome.ps1');
    const winBat = path.join(homeDir, '.agents/tools/windows/launch-visible-chrome.bat');
    if (existsSync(winPs1)) {
      console.log(`[slidedeck-gen] Launching visible Chrome on CDP port ${cdpPort} (PowerShell)...`);
      spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-File', winPs1, '-Port', cdpPort, '-Url', url], { detached: true, stdio: 'ignore' }).unref();
      if (cdpMode) scheduleAttachCdp(url, cdpPort);
      return;
    } else if (existsSync(winBat)) {
      console.log(`[slidedeck-gen] Launching visible Chrome on CDP port ${cdpPort} (Batch)...`);
      spawn('cmd.exe', ['/c', winBat, cdpPort, url], { detached: true, stdio: 'ignore' }).unref();
      if (cdpMode) scheduleAttachCdp(url, cdpPort);
      return;
    }
  }

  const launcherCandidates = [
    path.join(homeDir, '.agents/tools/linux/launch-visible-chrome.sh'),
    path.join(homeDir, '.agents/tools/macos/launch-visible-chrome.sh'),
    path.join(homeDir, '.agents/tools/launch-visible-chrome.sh'),
    path.join(homeDir, 'browser-tools/launch-visible-chrome.sh')
  ];

  const launcherPath = launcherCandidates.find(p => existsSync(p));

  if (launcherPath) {
    console.log(`[slidedeck-gen] Launching visible Chrome on CDP port ${cdpPort}...`);
    const proc = spawn('bash', [launcherPath, cdpPort, url], { detached: true, stdio: 'ignore' });
    proc.unref();

    if (cdpMode) {
      scheduleAttachCdp(url, cdpPort);
    }
  } else {
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    spawn(openCmd, [url], { detached: true, stdio: 'ignore' }).unref();
  }
}

function scheduleAttachCdp(url, port) {
  let attempts = 0;
  const maxAttempts = 25;
  const interval = setInterval(async () => {
    attempts++;
    const isReady = await checkPortListening(Number(port), '127.0.0.1');
    if (isReady || attempts >= maxAttempts) {
      clearInterval(interval);
      if (isReady) {
        attachCdpVisualAgent(url, port);
      }
    }
  }, 200);
}

function checkPortListening(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(200);
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

function attachCdpVisualAgent(url, port) {
  const homeDir = process.env.HOME || '';
  const cdpAgentPath = path.join(homeDir, '.agents/tools/cdp_visual_agent.py');
  if (existsSync(cdpAgentPath)) {
    try {
      // Bring tab to front and attach Live AI Cursor HUD
      const openProc = spawn('python3', [cdpAgentPath, 'open', url, '--port', port], { stdio: 'ignore' });
      openProc.on('close', () => {
        // Set initial HUD status text
        updateCdpStatus(currentStatus, port);
      });
    } catch {}
  }
}

function updateCdpStatus(statusText, port = '9223') {
  const homeDir = process.env.HOME || '';
  const cdpAgentPath = path.join(homeDir, '.agents/tools/cdp_visual_agent.py');
  if (existsSync(cdpAgentPath)) {
    try {
      spawn('python3', [cdpAgentPath, 'status', statusText, '--port', port], { stdio: 'ignore' }).unref();
    } catch {}
  }
}

async function reserveAvailablePort(startPort, bindHost) {
  for (let p = startPort; p < startPort + 50; p++) {
    const isAvail = await checkPortAvailable(p, bindHost);
    if (isAvail) return p;
  }
  return startPort;
}

function checkPortAvailable(port, bindHost) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once('error', () => resolve(false));
    tester.once('listening', () => {
      tester.close(() => resolve(true));
    });
    tester.listen(port, bindHost);
  });
}

startServer();
