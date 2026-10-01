#!/usr/bin/env node
/**
 * 이력서 PDF 빌드 (로컬 전용 — Netlify에서는 돌리지 않는다. 결과 PDF를 커밋한다)
 *
 *   npm run pdf
 *
 * 1. astro build
 * 2. 빈 포트에서 astro preview 시작
 * 3. 로컬 Chrome(없으면 Edge) headless로 /resume/, /en/resume/을 인쇄
 *    → public/resume-ko.pdf, public/resume-en.pdf
 * 4. preview 종료
 *
 * 브라우저 경로를 바꾸려면 CHROME_PATH 환경 변수를 쓴다.
 * 인쇄 스타일(A4, 헤더·푸터·버튼 숨김)은 src/styles/global.css의 @media print에 있다.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const astroBin = join(root, 'node_modules', 'astro', 'astro.js');

const TARGETS = [
  { path: '/resume/', out: join(root, 'public', 'resume-ko.pdf') },
  { path: '/en/resume/', out: join(root, 'public', 'resume-en.pdf') },
];

const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function log(msg) {
  console.log(`[pdf] ${msg}`);
}

function findBrowser() {
  const found = BROWSERS.find((p) => existsSync(p));
  if (!found) {
    throw new Error(`Chrome/Edge를 찾지 못했습니다. CHROME_PATH를 지정하세요. 확인한 경로:\n  ${BROWSERS.join('\n  ')}`);
  }
  return found;
}

function freePort() {
  return new Promise((res, rej) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', rej);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => res(port));
    });
  });
}

async function waitFor(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`preview 서버가 ${timeoutMs}ms 안에 뜨지 않았습니다: ${url}`);
}

function printToPdf(browser, url, out) {
  // 사용자의 브라우저 프로필과 섞이지 않도록 임시 프로필을 쓴다
  const profile = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
  rmSync(out, { force: true }); // 이전 PDF가 남아 성공처럼 보이지 않게
  try {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      `--user-data-dir=${profile}`,
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=15000',
      `--print-to-pdf=${out}`,
      url,
    ];
    const r = spawnSync(browser, args, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 120000 });
    if (r.error) throw r.error;
    if (!existsSync(out) || statSync(out).size === 0) {
      throw new Error(`PDF가 만들어지지 않았습니다 (${url}).\n${r.stderr?.toString() ?? ''}`);
    }
  } finally {
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      /* Chrome이 잠깐 잡고 있을 수 있다 */
    }
  }
}

async function main() {
  const browser = findBrowser();
  log(`browser: ${browser}`);

  log('astro build');
  const build = spawnSync(process.execPath, [astroBin, 'build'], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) throw new Error('astro build 실패');

  const port = await freePort();
  const base = `http://127.0.0.1:${port}`;
  log(`astro preview on ${base}`);
  const preview = spawn(process.execPath, [astroBin, 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  preview.stderr.on('data', (d) => process.stderr.write(d));

  const stop = () => {
    if (!preview.killed) preview.kill();
  };
  process.on('exit', stop);
  process.on('SIGINT', () => {
    stop();
    process.exit(130);
  });

  try {
    await waitFor(`${base}${TARGETS[0].path}`);
    for (const t of TARGETS) {
      const url = `${base}${t.path}`;
      log(`print ${url} → ${t.out}`);
      printToPdf(browser, url, t.out);
      log(`  ${(statSync(t.out).size / 1024).toFixed(0)} KB`);
    }
  } finally {
    stop();
  }
  log('done. public/resume-ko.pdf, public/resume-en.pdf를 커밋하세요 (다음 빌드부터 dist에 포함).');
}

main().catch((e) => {
  console.error(`[pdf] ${e.message ?? e}`);
  process.exit(1);
});
