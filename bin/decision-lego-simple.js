#!/usr/bin/env node

import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '..', 'simple');

const MIME_TYPES = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
]);

function printHelp() {
  console.log(`Decision Lego Simple

Usage:
  decision-lego-simple [--port 4173] [--host 127.0.0.1] [--api-key KEY]

Environment:
  GEMINI_API_KEY   Gemini API key used by the browser app
  PORT             Port to listen on
  HOST             Host interface to bind
`);
}

function readOption(argv, name) {
  const flag = `--${name}`;
  const index = argv.indexOf(flag);
  if (index === -1) {
    return null;
  }
  return argv[index + 1] ?? null;
}

function normalizePort(rawValue) {
  const port = Number(rawValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port: ${rawValue}`);
  }
  return port;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  printHelp();
  process.exit(0);
}

const host = readOption(argv, 'host') || process.env.HOST || '127.0.0.1';
const port = normalizePort(readOption(argv, 'port') || process.env.PORT || '4173');
const apiKey = readOption(argv, 'api-key') || process.env.GEMINI_API_KEY || '';

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/config.js') {
    const body = `window.DECISION_LEGO_CONFIG = Object.freeze({ GEMINI_API_KEY: ${JSON.stringify(apiKey)} });\n`;
    res.writeHead(200, {
      'Content-Type': 'text/javascript; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(body);
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(appRoot, relativePath));

  if (!filePath.startsWith(appRoot)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (!(await fileExists(filePath))) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME_TYPES.get(ext) || 'application/octet-stream'
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Decision Lego Simple running at http://${host}:${port}`);
  if (!apiKey) {
    console.log('No GEMINI_API_KEY configured; the app will use placeholder artwork.');
  }
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
