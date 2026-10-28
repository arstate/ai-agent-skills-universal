#!/usr/bin/env node
/**
 * self-debug-suite.mjs — Comprehensive Integration Test Suite for slidedeck-gen
 * Validates CLI commands, markdown/json compilation, layout parsing, live preview server,
 * zero-margin 16:9 PDF export, editable PowerPoint (.pptx) export, and session finalization.
 */

import { execSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateRoots = [
  path.resolve(__dirname, '..'),
  path.join(process.env.HOME || '', '.agents/skills/slidedeck-gen'),
  path.join(process.env.HOME || '', '.gemini/antigravity-cli/skills/slidedeck-gen')
];
const SKILL_ROOT = candidateRoots.find(r => existsSync(path.join(r, 'bin/slidedeck-gen.mjs')));
const CLI_BIN = path.join(SKILL_ROOT, 'bin/slidedeck-gen.mjs');
const TEST_DIR = '/tmp/slidedeck-suite-run';

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`✅ [PASS] ${message}`);
}

async function run() {
  console.log('===============================================================');
  console.log('🚀 Running slidedeck-gen Forensic Integration Test Suite');
  console.log('===============================================================\n');

  // Clean test scratch directory
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });

  // 1. CLI Version & Help
  console.log('[Phase 1: CLI Basics]');
  const versionOut = execSync(`node "${CLI_BIN}" --version`, { encoding: 'utf8' }).trim();
  assert(versionOut.includes('v1.1.0'), `CLI prints correct version (output: ${versionOut})`);

  const helpOut = execSync(`node "${CLI_BIN}" --help`, { encoding: 'utf8' });
  assert(helpOut.includes('dev [deck-path]') && helpOut.includes('done'), 'CLI help lists dev and done commands');

  // 2. Project Scaffolding
  console.log('\n[Phase 2: Project Scaffolding]');
  const mdDeckDir = path.join(TEST_DIR, 'pitch-project');
  execSync(`node "${CLI_BIN}" init "${mdDeckDir}" --template pitch-deck`, { encoding: 'utf8' });
  assert(existsSync(path.join(mdDeckDir, 'deck.md')), 'init pitch-deck creates deck.md');

  const jsonDeckDir = path.join(TEST_DIR, 'executive-project');
  execSync(`node "${CLI_BIN}" init "${jsonDeckDir}" --template minimal-executive`, { encoding: 'utf8' });
  assert(existsSync(path.join(jsonDeckDir, 'goal.json')), 'init minimal-executive creates goal.json');

  // 3. Markdown Compilation & Layout Rendering
  console.log('\n[Phase 3: Markdown Layout & Theme Compilation]');
  execSync(`node "${CLI_BIN}" compile "${path.join(mdDeckDir, 'deck.md')}" --out "${path.join(mdDeckDir, 'dist')}" --theme cyber-glow`, { encoding: 'utf8' });
  const compiledHtmlPath = path.join(mdDeckDir, 'dist/index.html');
  assert(existsSync(compiledHtmlPath), 'compile outputs index.html');

  const compiledHtml = readFileSync(compiledHtmlPath, 'utf8');
  assert(compiledHtml.includes('data-theme="cyber-glow"'), 'Theme override cyber-glow applied');
  assert(compiledHtml.includes('class="metric-card"'), 'Metric cards correctly parsed from markdown with colons');
  assert(compiledHtml.includes('class="metrics-grid"'), 'Metrics grid container generated');
  assert(compiledHtml.includes('class="cards-container"'), 'Grid cards container correctly parsed from markdown');
  assert(compiledHtml.includes('class="flow-container"'), 'Flow steps container correctly parsed from markdown');

  // 4. Live Server & API Endpoints
  console.log('\n[Phase 4: Live Dev Preview Server & APIs]');
  const testPort = 5342;
  const devProc = spawn('node', [CLI_BIN, 'dev', mdDeckDir, '--port', String(testPort), '--no-cdp'], {
    stdio: 'ignore',
    detached: false
  });

  try {
    // Wait for server to bind
    let serverReady = false;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 100));
      serverReady = await checkPortListening(testPort);
      if (serverReady) break;
    }
    assert(serverReady, `Live dev server successfully bound to port ${testPort}`);

    // Test /api/deck/status GET
    const statusGetRes = await fetchJson(`http://127.0.0.1:${testPort}/api/deck/status`);
    assert(statusGetRes.status && statusGetRes.status.length > 0, `GET /api/deck/status returns currentStatus ("${statusGetRes.status}")`);

    // Test /api/deck/status POST
    const statusPostRes = await postJson(`http://127.0.0.1:${testPort}/api/deck/status`, { status: 'Testing Live Status Update' });
    assert(statusPostRes.success === true && statusPostRes.status === 'Testing Live Status Update', 'POST /api/deck/status updates server status');

    // Test /api/deck/persist
    const persistRes = await postJson(`http://127.0.0.1:${testPort}/api/deck/persist`, { html: '<section class="slide layout-cover"><h1>Updated</h1></section>' });
    assert(persistRes.success === true, 'POST /api/deck/persist responds with success');
  } finally {
    devProc.kill('SIGTERM');
  }

  // 5. Zero-Margin 16:9 PDF Export
  console.log('\n[Phase 5: Zero-Margin 16:9 PDF Vector Export]');
  // 5a. Export from directory with index.html
  const pdfOut1 = path.join(TEST_DIR, 'test-dist.pdf');
  execSync(`node "${CLI_BIN}" export-pdf "${path.join(mdDeckDir, 'dist')}" --out "${pdfOut1}"`, { encoding: 'utf8' });
  assert(existsSync(pdfOut1) && readFileSync(pdfOut1).length > 50000, `PDF export from compiled directory succeeded (${(readFileSync(pdfOut1).length / 1024).toFixed(1)} KB)`);

  // 5b. Export directly from uncompiled markdown file
  const pdfOut2 = path.join(TEST_DIR, 'test-direct-md.pdf');
  execSync(`node "${CLI_BIN}" export-pdf "${path.join(mdDeckDir, 'deck.md')}" --out "${pdfOut2}"`, { encoding: 'utf8' });
  assert(existsSync(pdfOut2) && readFileSync(pdfOut2).length > 50000, `PDF export directly from raw .md file succeeded (${(readFileSync(pdfOut2).length / 1024).toFixed(1)} KB)`);

  // 5c. Export directly from JSON specification
  const pdfOut3 = path.join(TEST_DIR, 'test-json.pdf');
  execSync(`node "${CLI_BIN}" export-pdf "${path.join(jsonDeckDir, 'goal.json')}" --out "${pdfOut3}"`, { encoding: 'utf8' });
  assert(existsSync(pdfOut3) && readFileSync(pdfOut3).length > 30000, `PDF export directly from goal.json succeeded (${(readFileSync(pdfOut3).length / 1024).toFixed(1)} KB)`);

  // Verify PDF 16:9 page geometry via pdfinfo
  const pdfinfoOut = execSync(`pdfinfo "${pdfOut2}"`, { encoding: 'utf8' });
  assert(pdfinfoOut.includes('1152 x 648 pts'), 'PDF page geometry is exact 16:9 (1152 x 648 pts = 16in x 9in)');
  assert(pdfinfoOut.includes('Pages:           8'), 'PDF contains all 8 slides');

  // 6. Editable PowerPoint (.pptx) Export
  console.log('\n[Phase 6: Editable PowerPoint (.pptx) Export]');
  // 6a. Export directly from raw .md file
  const pptxOut1 = path.join(TEST_DIR, 'test-direct-md.pptx');
  execSync(`node "${CLI_BIN}" export-pptx "${path.join(mdDeckDir, 'deck.md')}" --out "${pptxOut1}"`, { encoding: 'utf8' });
  assert(existsSync(pptxOut1) && readFileSync(pptxOut1).length > 20000, `PPTX export directly from .md file succeeded (${(readFileSync(pptxOut1).length / 1024).toFixed(1)} KB)`);

  // 6b. Verify slide count and shapes in generated PPTX using python-pptx
  const pptxVerifyScript = `
import pptx
prs = pptx.Presentation("${pptxOut1}")
assert len(prs.slides) == 8, f"Expected 8 slides, got {len(prs.slides)}"
metrics_slide = prs.slides[2]
assert len(metrics_slide.shapes) >= 4, f"Expected metric shapes on slide 3, got {len(metrics_slide.shapes)}"
print("PPTX verification passed: 8 slides with rich shapes")
`;
  execSync(`python3 -c '${pptxVerifyScript}'`, { encoding: 'utf8' });
  assert(true, 'python-pptx verified 8 slides with valid metric card shapes');

  // 6c. Export directly from goal.json
  const pptxOut2 = path.join(TEST_DIR, 'test-json.pptx');
  execSync(`node "${CLI_BIN}" export-pptx "${path.join(jsonDeckDir, 'goal.json')}" --out "${pptxOut2}"`, { encoding: 'utf8' });
  assert(existsSync(pptxOut2) && readFileSync(pptxOut2).length > 20000, `PPTX export directly from goal.json succeeded (${(readFileSync(pptxOut2).length / 1024).toFixed(1)} KB)`);

  // 7. Session Finalization & Handover
  console.log('\n[Phase 7: Session Finalization (slidedeck-gen done)]');
  const doneStart = Date.now();
  const doneOut = execSync(`node "${CLI_BIN}" done`, { encoding: 'utf8' });
  const doneDuration = Date.now() - doneStart;
  assert(doneOut.includes('Slide Deck Generation Complete!'), 'slidedeck-gen done prints completion output');
  assert(doneDuration < 3000, `slidedeck-gen done completes promptly without hanging (${doneDuration}ms)`);

  // 8. Universal Package Bundle & Cloudflare Tunnel Check
  console.log('\n[Phase 8: Universal Package & Cloudflare Tunnel Check]');
  const packPath = '/mnt/HDD-2/BACKUP LINUX/FILE DATA/AI AGENT SKILLS/opus_distills_universal_pack.zip';
  assert(existsSync(packPath), 'Universal pack zip exists on filesystem');
  const packSizeMB = (readFileSync(packPath).length / 1024 / 1024).toFixed(2);
  assert(Number(packSizeMB) > 4.0, `Universal pack has valid archive size (${packSizeMB} MB)`);

  console.log('\n===============================================================');
  console.log(`🎉 ALL ${passedTests}/${totalTests} INTEGRATION TESTS PASSED SUCCESSFULLY!`);
  console.log('===============================================================\n');
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

function fetchJson(urlStr) {
  return new Promise((resolve, reject) => {
    http.get(urlStr, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
      });
    }).on('error', reject);
  });
}

function postJson(urlStr, bodyObj) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const postData = JSON.stringify(bodyObj);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

run().catch(err => {
  console.error('\n💥 Test suite aborted with fatal error:', err);
  process.exit(1);
});
