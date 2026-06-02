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
// (http/https/mailto/...) are skipped. #anchors are validated against the target
// page's element ids (advisory by default; set STRICT_ANCHORS=1 to enforce).
// Run after `npm run build`.
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

// Scheme / protocol-relative links are out of scope. Pure #anchors are NOT skipped
// here (handled below as same-page anchor checks).
const SKIP = /^(https?:|mailto:|tel:|ftp:|ws:|wss:|data:|javascript:|\/\/)/i;

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

// --- #anchor validation ----------------------------------------------------
// Extract element ids from a built page so links with a #fragment can be checked
// against real heading/element ids (the retired check-internal-link-validity did
// this filesystem-style; here it is build-aware). Cached per file.
const idCache = new Map();
function idsOfFile(distFile) {
  if (idCache.has(distFile)) return idCache.get(distFile);
  const set = new Set();
  try {
    // Accept both quote styles. Starlight emits double-quoted ids today, but a
    // future rehype/markdown plugin could emit single-quoted ids; matching both
    // keeps a real (browser-honored) anchor from being flagged broken under
    // STRICT_ANCHORS. (name="..." is deliberately NOT matched: <meta name=...>
    // would flood the id set and mask genuinely broken anchors.)
    for (const m of fs.readFileSync(distFile, 'utf8').matchAll(/\sid=(?:"([^"]+)"|'([^']+)')/g)) set.add(m[1] ?? m[2]);
  } catch { /* unreadable: leave empty */ }
  idCache.set(distFile, set);
  return set;
}
// Reverse of urlOf: map a base-absolute URL path to its dist file.
function distFileFor(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return null;
  const rel = urlPath.slice((BASE + '/').length).replace(/\/$/, '');
  const cands = rel === ''
    ? [path.join(DIST, 'index.html')]
    : [path.join(DIST, rel, 'index.html'), path.join(DIST, rel), path.join(DIST, rel + '.html')];
  for (const c of cands) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
}

const broken = [];
const brokenAnchors = [];
// Anchor checks are advisory by default (a broken anchor scrolls to top, it does
// not 404). Set STRICT_ANCHORS=1 to make them fail the build.
const STRICT_ANCHORS = process.env.STRICT_ANCHORS === '1';
// A built site is never empty. An existing-but-empty dist is the state Astro leaves
// when a build crashes after emptying outDir; scanning zero pages would otherwise
// PASS silently and show a misleading green next to a red build. Fail loudly, the
// same way check-route-parity.mjs does on the identical state (keep them symmetric).
const pages = walk(DIST);
if (pages.length === 0) {
  console.error(`check-rendered-links: ${DIST} exists but has no .html pages - the build likely failed and emptied outDir. Failing (a built site is never empty).`);
  process.exit(1);
}
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const pageUrl = urlOf(file);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const raw = m[1];
    if (SKIP.test(raw)) continue;
    const hashIdx = raw.indexOf('#');
    let frag = '';
    if (hashIdx !== -1) {
      const rawFrag = raw.slice(hashIdx + 1).split('?')[0];
      // A literal '%' that is not a valid percent-escape (e.g. #50%-off) makes
      // decodeURIComponent throw URIError; fall back to the undecoded fragment so a
      // single hand-authored anchor cannot crash the whole link check (the throw
      // would also kill the non-anchor browser-broken-link pass in this same loop).
      try { frag = decodeURIComponent(rawFrag); } catch { frag = rawFrag; }
    }
    // Same-page anchor (#frag): validate against this page's element ids.
    if (raw.startsWith('#')) {
      if (frag && !idsOfFile(file).has(frag)) brokenAnchors.push({ page: pageUrl, href: raw });
      continue;
    }
    const isRel = raw.startsWith('./') || raw.startsWith('../');
    const isBaseAbs = raw.startsWith(BASE + '/') || raw === BASE || raw === BASE + '/';
    // Host-root in-site links (start with / but not the base, not protocol-relative
    // //) are missing the base path. Flag them: they resolve outside BASE and fail
    // existsInDist. This is the "Site not found" class the base path guards against.
    const isHostRoot = raw.startsWith('/') && !raw.startsWith('//') && !isBaseAbs;
    if (!isRel && !isBaseAbs && !isHostRoot) continue;
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean) continue;
    let resolved;
    try { resolved = new URL(clean, 'https://x' + pageUrl).pathname; } catch { continue; }
    if (!existsInDist(resolved)) { broken.push({ page: pageUrl, href: raw, resolved }); continue; }
    // Page exists: if the link targets a #anchor, validate it against the target page.
    if (frag) {
      const tf = distFileFor(resolved);
      if (tf && !idsOfFile(tf).has(frag)) brokenAnchors.push({ page: pageUrl, href: raw });
    }
  }
}

console.log('=== Rendered Link Resolution Check ===');
console.log(`Pages scanned: ${pages.length}`);
console.log(`Browser-broken internal links: ${broken.length}`);
console.log(`Broken #anchors (${STRICT_ANCHORS ? 'enforcing' : 'advisory'}): ${brokenAnchors.length}`);

if (broken.length) {
  console.log('\nBroken internal links (resolved against the page URL):');
  const byPage = {};
  for (const b of broken) (byPage[b.page] ||= []).push(b);
  for (const pg of Object.keys(byPage).sort()) {
    console.log(`  ${pg}`);
    for (const b of byPage[pg]) console.log(`     ${b.href}  ->  ${b.resolved}`);
  }
}

if (brokenAnchors.length) {
  console.log(`\n${STRICT_ANCHORS ? 'Broken' : 'Advisory: broken'} #anchor link(s) (target page exists, fragment id does not):`);
  const byPage = {};
  for (const b of brokenAnchors) (byPage[b.page] ||= []).push(b);
  const pages = Object.keys(byPage).sort();
  for (const pg of pages.slice(0, 40)) {
    console.log(`  ${pg}`);
    for (const b of byPage[pg]) console.log(`     ${b.href}`);
  }
  if (pages.length > 40) console.log(`  ... and ${pages.length - 40} more page(s)`);
}

const fail = broken.length > 0 || (STRICT_ANCHORS && brokenAnchors.length > 0);
if (!fail) {
  const note = brokenAnchors.length ? ` (${brokenAnchors.length} advisory #anchor warning(s); set STRICT_ANCHORS=1 to enforce)` : '';
  console.log(`\nPASS: all internal links resolve in the browser${note}.`);
  process.exit(0);
}
const parts = [];
if (broken.length) parts.push(`${broken.length} browser-broken link(s)`);
if (STRICT_ANCHORS && brokenAnchors.length) parts.push(`${brokenAnchors.length} broken #anchor(s)`);
console.log(`\nFAIL: ${parts.join(' + ')}.`);
if (broken.length) {
  console.log('Fix broken links by routing to a published page or a GitHub source URL;');
  console.log('scripts/remark-resolve-links.mjs resolves the common cases.');
}
if (STRICT_ANCHORS && brokenAnchors.length) {
  console.log('Fix broken #anchors: a heading id was renamed/removed, or the fragment is stale.');
}
process.exit(1);
