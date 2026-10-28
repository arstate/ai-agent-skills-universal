#!/usr/bin/env node
/**
 * export-cdp.mjs — Autonomous Zero-Margin 16:9 PDF Exporter for slidedeck-gen
 * Exports byte-exact, vector-sharp 16:9 PDF presentations using system Chrome / Chromium.
 * Zero external npm dependencies required.
 */

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, statSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';

function findSystemBrowserExecutable() {
  const candidates = [
    process.env.CHROME_BIN,
    process.env.CHROME_PATH,
    '/home/arya/.local/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/opt/google/chrome/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }

  // Lookup in PATH
  const binary = process.platform === 'win32' ? 'where' : 'which';
  for (const cmd of ['google-chrome-stable', 'google-chrome', 'chromium-browser', 'chromium']) {
    try {
      const out = execFileSync(binary, [cmd], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      const firstLine = out.split('\n')[0].trim();
      if (firstLine && existsSync(firstLine)) return firstLine;
    } catch {}
  }
  return '';
}

export async function exportDeckToPdf(inputTarget, outFile, options = {}) {
  const browserPath = findSystemBrowserExecutable();
  if (!browserPath) {
    throw new Error('System Chrome or Chromium executable not found on host.');
  }

  const outPath = path.resolve(process.cwd(), outFile);
  mkdirSync(path.dirname(outPath), { recursive: true });

  let server = null;
  let targetUrl = inputTarget;

  // If local directory or file, determine HTML path
  if (!inputTarget.startsWith('http://') && !inputTarget.startsWith('https://')) {
    let statPath = path.resolve(process.cwd(), inputTarget);
    let htmlFile = statPath;
    if (!statPath.endsWith('.html')) {
      if (statPath.endsWith('.md') || statPath.endsWith('.json')) {
        const { compileDeck } = await import('./compile-markdown.mjs');
        const compiledHtml = compileDeck(statPath);
        htmlFile = path.join(path.dirname(statPath), 'index.html');
        writeFileSync(htmlFile, compiledHtml, 'utf8');
      } else {
        htmlFile = path.join(statPath, 'index.html');
        if (!existsSync(htmlFile)) {
          const candidateMd = path.join(statPath, 'deck.md');
          const candidateJson = path.join(statPath, 'goal.json');
          if (existsSync(candidateMd) || existsSync(candidateJson)) {
            const src = existsSync(candidateMd) ? candidateMd : candidateJson;
            const { compileDeck } = await import('./compile-markdown.mjs');
            const compiledHtml = compileDeck(src);
            writeFileSync(htmlFile, compiledHtml, 'utf8');
          }
        }
      }
    }
    if (!existsSync(htmlFile)) {
      throw new Error(`index.html not found at: ${htmlFile}`);
    }

    const port = await getFreePort();
    const serveDir = path.dirname(htmlFile);
    server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/' || reqPath === '') reqPath = `/${path.basename(htmlFile)}`;
      let filePath = path.join(serveDir, reqPath);
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        const candidate = path.join(filePath, 'index.html');
        if (existsSync(candidate)) filePath = candidate;
      }
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeMap = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
          '.ttf': 'font/ttf'
        };
        res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
        res.end(readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
    targetUrl = `http://127.0.0.1:${port}/`;
  }

  try {
    // Execute headless Chrome directly with native print-to-pdf
    const chromeArgs = [
      '--headless=new',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outPath}`,
      '--virtual-time-budget=5000',
      '--run-all-compositor-stages-before-draw',
      targetUrl
    ];

    await new Promise((resolve, reject) => {
      const proc = spawn(browserPath, chromeArgs, {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let stderr = '';
      proc.stderr.on('data', chunk => { stderr += chunk.toString(); });

      proc.on('close', code => {
        if (code === 0 && existsSync(outPath) && readFileSync(outPath).length > 0) {
          resolve();
        } else {
          reject(new Error(`Chrome print-to-pdf failed (code ${code}): ${stderr}`));
        }
      });
      proc.on('error', reject);
    });

    const sizeBytes = readFileSync(outPath).length;
    return {
      success: true,
      outFile: outPath,
      sizeBytes
    };
  } finally {
    if (server) server.close();
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

// CLI direct run
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const [input, out] = process.argv.slice(2);
  if (!input || !out) {
    console.error('Usage: node export-cdp.mjs <deck-dir-or-html> <out.pdf>');
    process.exit(1);
  }
  exportDeckToPdf(input, out)
    .then(res => console.log(`PDF exported: ${res.outFile} (${(res.sizeBytes / 1024 / 1024).toFixed(2)} MB)`))
    .catch(err => {
      console.error('Export failed:', err.message);
      process.exit(1);
    });
}
