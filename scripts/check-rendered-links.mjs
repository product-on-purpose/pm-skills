// check-rendered-links.mjs - assert the built site has zero browser-broken
// internal links.
//
// Why this exists: check-internal-link-validity.{sh,ps1} validates links against
// the FILESYSTEM (it resolves `../section/x.md` relative to the source file and
// checks the file exists). That misses a whole class of breakage, because pages
// build to `slug/index.html` and are served one URL level deeper than their
// source file - so a filesystem-correct relative link can still 404 in the
// browser (the trailing-slash bug), and links to repo paths the site never
// publishes (raw SKILL.md, _workflows/, docs/internal/) resolve on GitHub but
// not on the site. scripts/remark-resolve-links.mjs resolves these at build time
// (an mdast transform); this check is the regression guard that keeps them fixed.
//
// It resolves every intra-site href (relative or /pm-skills-absolute) against
// the page's REAL URL and asserts the target exists in dist. External links
// (http/https/mailto/...) and pure #anchors are skipped - they are out of scope
// here (the site links to GitHub source on purpose). Run after `npm run build`.
//
// Usage:  node scripts/check-rendered-links.mjs [distDir]   (default: site/dist)
// Exit:   0 = all internal links resolve; 1 = one or more 404 in the browser.

import fs from 'node:fs';
import path from 'node:path';

// Published base path, mirrors site/astro.config.mjs (the single source). A CI
// link checker needs the literal to resolve base-absolute hrefs; keep it in sync.
const BASE = '/pm-skills';

const DIST = path.resolve(process.argv[2] || 'site/dist');

if (!fs.existsSync(DIST)) {
  console.error(`check-rendered-links: dist dir not found at ${DIST}; run \`npm run build\` first`);
  process.exit(1);
}

const SKIP = /^(https?:|mailto:|tel:|ftp:|ws:|wss:|data:|javascript:|#)/i;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function urlOf(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel === 'index.html') rel = '';
  else rel = rel.replace(/\.html$/, '/');
  return BASE + '/' + rel;
}

function existsInDist(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return false;
  const rel = urlPath.slice((BASE + '/').length).replace(/\/$/, '');
  if (rel === '') return fs.existsSync(path.join(DIST, 'index.html'));
  if (fs.existsSync(path.join(DIST, rel, 'index.html'))) return true;
  const asFile = path.join(DIST, rel);
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  if (fs.existsSync(path.join(DIST, rel + '.html'))) return true;
  return false;
}

const broken = [];
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const pageUrl = urlOf(file);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const raw = m[1];
    if (SKIP.test(raw)) continue;
    const isRel = raw.startsWith('./') || raw.startsWith('../');
    const isBaseAbs = raw.startsWith(BASE + '/') || raw === BASE || raw === BASE + '/';
    if (!isRel && !isBaseAbs) continue;
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    let resolved;
    try { resolved = new URL(clean, 'https://x' + pageUrl).pathname; } catch { continue; }
    if (!existsInDist(resolved)) broken.push({ page: pageUrl, href: raw, resolved });
  }
}

console.log('=== Rendered Link Resolution Check ===');
console.log(`Pages scanned: ${walk(DIST).length}`);
console.log(`Browser-broken internal links: ${broken.length}`);
if (broken.length === 0) {
  console.log('\nPASS: all internal links resolve in the browser.');
  process.exit(0);
}
console.log('\nBroken internal links (resolved against the page URL):');
const byPage = {};
for (const b of broken) (byPage[b.page] ||= []).push(b);
for (const pg of Object.keys(byPage).sort()) {
  console.log(`  ${pg}`);
  for (const b of byPage[pg]) console.log(`     ${b.href}  ->  ${b.resolved}`);
}
console.log('\nFAIL: browser-broken internal links found.');
console.log('Fix by routing to a published page or a GitHub source URL; the');
console.log('scripts/remark-resolve-links.mjs resolver handles the common cases.');
process.exit(1);
