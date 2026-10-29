#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENGINE_ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'dev';

switch (command) {
  case 'dev': {
    const port = args[1] || '5200';
    console.log(`\n🚀 Starting Next.js Minimalist Slide Studio on port ${port}...`);
    console.log(`📍 Engine directory: ${ENGINE_ROOT}`);
    console.log(`🌐 Live Studio URL: http://localhost:${port}\n`);

    const child = spawn('npm', ['run', 'dev', '--', '-p', port], {
      cwd: ENGINE_ROOT,
      stdio: 'inherit',
      env: { ...process.env, PORT: port },
    });

    child.on('exit', (code) => {
      process.exit(code || 0);
    });
    break;
  }

  case 'build': {
    console.log(`\n📦 Building Next.js Slide Studio for production...`);
    const child = spawn('npm', ['run', 'build'], {
      cwd: ENGINE_ROOT,
      stdio: 'inherit',
    });
    child.on('exit', (code) => process.exit(code || 0));
    break;
  }

  case 'start': {
    const port = args[1] || '5200';
    const child = spawn('npm', ['run', 'start', '--', '-p', port], {
      cwd: ENGINE_ROOT,
      stdio: 'inherit',
    });
    child.on('exit', (code) => process.exit(code || 0));
    break;
  }

  case 'help':
  default:
    console.log(`
Next Slide Deck Engine CLI

Usage:
  next-slidedeck dev [port]       Start live studio development server (default port 5200)
  next-slidedeck build            Build production bundle
  next-slidedeck start [port]     Start production server
    `);
    break;
}
