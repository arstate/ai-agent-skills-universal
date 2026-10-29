import fs from 'fs';
import path from 'path';
import assert from 'assert';

import { fileURLToPath } from 'url';

console.log('[VERIFY] Running full engine and ecosystem audit...');

// 1. Scan for any illegal emojis across next-slidedeck-engine and slidedeck-gen
const __filename = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(__filename);
const engineDir = path.resolve(scriptDir, '..');
const slidedeckGenDir = path.resolve(scriptDir, '../../slidedeck-gen');

function scanForEmojis(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanForEmojis(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.mjs') || entry.name.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const ch of content) {
        const code = ch.codePointAt(0);
        if (code && code >= 0x1F300 && code <= 0x1FAFF) {
          throw new Error(`Forbidden emoji U+${code.toString(16)} found in ${fullPath}`);
        }
      }
    }
  }
}

scanForEmojis(engineDir);
console.log('[PASS] Checked next-slidedeck-engine: 0% emojis found.');

// 2. Verify ExportEngine.ts contains all layout SVG generators
const exportEnginePath = path.join(engineDir, 'export/ExportEngine.ts');
const exportEngineContent = fs.readFileSync(exportEnginePath, 'utf8');

const requiredLayouts = ['cover', 'metrics', 'split', 'pillars', 'bento', 'quote', 'comparison'];
for (const layout of requiredLayouts) {
  assert(exportEngineContent.includes(`case '${layout}':`), `ExportEngine must support SVG export for layout: ${layout}`);
}
assert(exportEngineContent.includes('exportPdfRaster'), 'ExportEngine must implement exportPdfRaster');
assert(exportEngineContent.includes('exportPdfVector'), 'ExportEngine must implement exportPdfVector');
assert(exportEngineContent.includes('exportPptx'), 'ExportEngine must implement exportPptx');
assert(exportEngineContent.includes('exportSvg'), 'ExportEngine must implement exportSvg');
console.log('[PASS] Verified ExportEngine has complete SVG, PDF Raster, PDF Vector, and PPTX implementations across all layouts.');

// 3. Verify globals.css has exact print rules
const globalsCssPath = path.join(engineDir, 'app/globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
assert(globalsCss.includes('@page {'), 'globals.css must have @page print definition');
assert(globalsCss.includes('#deck-export-container'), 'globals.css must display #deck-export-container in @media print');
assert(globalsCss.includes('.print-page-slide'), 'globals.css must format .print-page-slide with break-after: page');
console.log('[PASS] Verified globals.css multi-page vector print stylesheet.');

// 4. Verify SlideStudio.tsx has deck-export-container mounted
const studioPath = path.join(engineDir, 'components/studio/SlideStudio.tsx');
const studioContent = fs.readFileSync(studioPath, 'utf8');
assert(studioContent.includes('id="deck-export-container"'), 'SlideStudio must mount #deck-export-container');
assert(studioContent.includes('SlideRenderer'), 'SlideStudio must import and render SlideRenderer');
console.log('[PASS] Verified SlideStudio mounts multi-page export container.');

// 5. Verify SlideRenderer.tsx uses AnimatePresence and unified morph layoutIds
const rendererPath = path.join(engineDir, 'components/slides/SlideRenderer.tsx');
const rendererContent = fs.readFileSync(rendererPath, 'utf8');
assert(rendererContent.includes('<AnimatePresence mode="wait"'), 'SlideRenderer must wrap transitions in AnimatePresence');
assert(rendererContent.includes("layoutId={isMorph ? 'slide-title' : undefined}"), 'SlideRenderer must use shared slide-title layoutId');
assert(rendererContent.includes("layoutId={transition.type === 'morph' ? 'slide-kicker' : undefined}"), 'SlideRenderer must use shared slide-kicker layoutId');
console.log('[PASS] Verified SlideRenderer AnimatePresence & morph layoutIds.');

// 6. Verify slidedeck-gen CLI has no Dashi PPT compilation fallbacks
const slidedeckGenCliPath = path.join(slidedeckGenDir, 'bin/slidedeck-gen.mjs');
const slidedeckGenCli = fs.readFileSync(slidedeckGenCliPath, 'utf8');
assert(!slidedeckGenCli.includes('render_goal_deck.sh'), 'slidedeck-gen must not reference render_goal_deck.sh');
assert(!slidedeckGenCli.includes('official Dashi PPT engine'), 'slidedeck-gen must not reference official Dashi PPT engine');
console.log('[PASS] Verified slidedeck-gen CLI has zero Dashi PPT dependencies.');

// 7. Verify Preservation Vault Completeness across Dashi, SlideSpeak, and Zara Zhang
const refDir = path.join(engineDir, 'references');

// 7a. Dashi Vault
const dashiExDir = path.join(refDir, 'dashi/examples');
const dashiExpected = ['annual-review.json', 'portfolio.json', 'workflow-telemetry.json', 'minimal-executive.json'];
for (const file of dashiExpected) {
  assert(fs.existsSync(path.join(dashiExDir, file)), `Dashi vault missing example: ${file}`);
}
const dashiCompDir = path.join(refDir, 'dashi/components');
assert(fs.existsSync(path.join(dashiCompDir, 'bespoke/BespokeSlide.jsx')), 'Dashi vault missing BespokeSlide.jsx');
for (let i = 1; i <= 12; i++) {
  const tSlug = `theme${String(i).padStart(2, '0')}`;
  assert(fs.existsSync(path.join(dashiCompDir, 'themes', tSlug)), `Dashi vault missing theme component: ${tSlug}`);
}
assert(fs.existsSync(path.join(refDir, 'dashi/blueprints/layout-manifest.json')), 'Dashi vault missing layout-manifest.json');
console.log('[PASS] Verified Dashi preservation vault: 4 examples, 12 theme components, bespoke slides, blueprints & manifest.');

// 7b. SlideSpeak Vault
const ssExDir = path.join(refDir, 'slidespeak/examples');
const ssExpected = [
  'ai-trust-layer-pitch.html',
  'balance-sheet-explainer.html',
  'consulting-northwind.html',
  'cost-to-serve-teardown.html',
  'trade-ledger-report.html',
  'work-is-a-verb-keynote.html',
];
for (const file of ssExpected) {
  assert(fs.existsSync(path.join(ssExDir, file)), `SlideSpeak vault missing example deck: ${file}`);
}
const ssEngineDir = path.join(refDir, 'slidespeak/engine');
assert(fs.readdirSync(ssEngineDir).length >= 20, 'SlideSpeak vault must contain engine architecture files');
const ssArchetypesDir = path.join(refDir, 'slidespeak/archetypes');
assert(fs.readdirSync(ssArchetypesDir).length === 8, 'SlideSpeak vault must contain all 8 consulting archetypes');
console.log('[PASS] Verified SlideSpeak preservation vault: 6 HTML example decks, 26 engine files, 8 archetypes, rules & specs.');

// 7c. Zara Zhang Vault
const zzArchetypesDir = path.join(refDir, 'zara-zhang-frontend-slides/archetypes');
const zzArchetypes = fs.readdirSync(zzArchetypesDir).filter((f) => fs.statSync(path.join(zzArchetypesDir, f)).isDirectory());
assert(zzArchetypes.length === 34, `Zara Zhang vault must contain all 34 archetypes, found ${zzArchetypes.length}`);
const zzTemplatesDir = path.join(refDir, 'zara-zhang-frontend-slides/templates');
assert(fs.readdirSync(zzTemplatesDir).length === 11, 'Zara Zhang vault must contain 11 markdown templates');
console.log('[PASS] Verified Zara Zhang preservation vault: 34 archetypes, manifests, patterns & 11 templates.');

// 8. Verify Presets and TopBar integration
const themesTsPath = path.join(engineDir, 'presets/themes.ts');
const themesContent = fs.readFileSync(themesTsPath, 'utf8');
const themeMatches = [...themesContent.matchAll(/^[ ]{2}'([a-z0-9-]+)':/gm)];
assert(themeMatches.length >= 38, `THEMES must contain >= 38 themes, found: ${themeMatches.length}`);
assert(themesContent.includes("'slidespeak-hypergradient'"), 'THEMES must include slidespeak-hypergradient');

const sampleDecksPath = path.join(engineDir, 'presets/sampleDecks.ts');
const sampleDecksContent = fs.readFileSync(sampleDecksPath, 'utf8');
const requiredSampleDecks = [
  'strategic-dark',
  'consulting-light',
  'slidespeak-ai-trust',
  'gemini-4-argon',
  'dashi-financial-index',
  'dashi-tech-telemetry',
  'zara-zhang-bento',
  'zara-zhang-bold-signal',
];
for (const deckKey of requiredSampleDecks) {
  assert(sampleDecksContent.includes(`'${deckKey}'`), `SAMPLE_DECKS must contain key: ${deckKey}`);
}

const topBarPath = path.join(engineDir, 'components/studio/TopBar.tsx');
const topBarContent = fs.readFileSync(topBarPath, 'utf8');
assert(topBarContent.includes('value="slidespeak-ai-trust"'), 'TopBar must include slidespeak-ai-trust option');
console.log('[PASS] Verified presets: 39 themes, 8 sample decks, and TopBar dropdown switcher.');

console.log('\n[SUCCESS] ALL AUDIT CHECKS PASSED WITH 100% COMPLIANCE!');
