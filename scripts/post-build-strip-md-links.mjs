// Post-build HTML link fixer. Two passes, run on dist/ after `astro build`.
//
// PASS 1 (Codex P0 fix, Phase 2): strip .md/.mdx extensions from intra-doc
// link hrefs so navigation resolves to Starlight slug URLs. Repo-root meta
// files (README, CHANGELOG, CONTRIBUTING, LICENSE, AGENTS) are preserved
// (intentional GitHub source references). Astro's markdown.remarkPlugins
// config did not pick up a custom plugin in the Starlight + custom-glob-loader
// setup, so this post-processor rewrites dist HTML directly.
//
// PASS 2 (trailing-slash relative-link fix): our pages build to `slug/index.html`,
// so a page authored at docs/A/B.md is served at /pm-skills/A/B/ - one URL
// level deeper than its source file. A body link written `../section/x.md` is
// filesystem-correct (and the check-internal-link-validity CI validates it
// that way), but the browser resolves it against the deeper URL and lands one
// level short, producing a 404. Astro does not rewrite these relative hrefs to
// base-absolute slugs in this loader setup, so we correct them here.
//
// The correction is self-correcting and conservative: for each relative href,
// if it already resolves to a real page we leave it untouched; only if it 404s
// AND resolving it against the SOURCE-FILE directory (the page URL minus its
// own leaf segment) hits a real page do we rewrite it to that base-absolute
// URL. Links whose target does not exist either way (e.g. references to
// non-published source paths like _workflows/, raw SKILL.md, .github/) are
// left exactly as authored. Source markdown is never touched, so the
// filesystem-based link validator stays green.

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const BASE = '/pm-skills';
const PRESERVE_RE = /(?:^|\/)(?:README|CHANGELOG|CONTRIBUTING|LICENSE|AGENTS)\.md(?:#|$)/;

let totalStripped = 0;
let filesStripped = 0;
let totalCorrected = 0;
let filesCorrected = 0;

function walk(dir, fn) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, fn);
    else if (entry.name.endsWith('.html')) fn(full);
  }
}

// dist file path -> the URL path the browser sees (trailing slash for dir pages)
function urlOf(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel === 'index.html') rel = '';
  else rel = rel.replace(/\.html$/, '/');
  return BASE + '/' + rel;
}

// Does a (base-absolute) URL path resolve to something in dist?
function existsInDist(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return false;
  const rel = urlPath.slice((BASE + '/').length).replace(/\/$/, '');
  if (rel === '') return fs.existsSync(path.join(DIST, 'index.html'));
  const asDir = path.join(DIST, rel, 'index.html');
  const asFile = path.join(DIST, rel);
  const asHtml = path.join(DIST, rel + '.html');
  if (fs.existsSync(asDir)) return true;
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  if (fs.existsSync(asHtml)) return true;
  return false;
}

function resolvePath(baseUrlPath, href) {
  return new URL(href, 'https://x' + baseUrlPath).pathname;
}

// PASS 1: strip .md/.mdx
function stripMdLinks(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let count = 0;
  content = content.replace(/href="([^"]*\.(?:md|mdx))(#[^"]*)?"/g, (match, url, frag) => {
    if (/^https?:|^mailto:|^tel:/.test(url)) return match;
    if (PRESERVE_RE.test(url)) return match;
    count++;
    const stripped = url.replace(/\.(md|mdx)$/, '');
    const newUrl = stripped.endsWith('/') ? stripped : stripped + '/';
    return `href="${newUrl}${frag || ''}"`;
  });
  if (count > 0) {
    fs.writeFileSync(filepath, content);
    totalStripped += count;
    filesStripped++;
  }
}

// PASS 2: fix trailing-slash relative links
function fixRelativeLinks(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const pageUrl = urlOf(filepath);
  const parentBase = pageUrl.replace(/[^/]+\/$/, ''); // page URL minus its own leaf segment
  let count = 0;
  content = content.replace(/href="((?:\.\.?\/)[^"]*)"/g, (match, href) => {
    const hashIdx = href.indexOf('#');
    const clean = hashIdx === -1 ? href : href.slice(0, hashIdx);
    const frag = hashIdx === -1 ? '' : href.slice(hashIdx);
    if (!clean) return match;
    let direct, alt;
    try { direct = resolvePath(pageUrl, clean); } catch { return match; }
    if (existsInDist(direct)) return match;            // already correct, leave it
    try { alt = resolvePath(parentBase, clean); } catch { return match; }
    if (alt === direct) return match;                  // no off-by-one to exploit
    if (!existsInDist(alt)) return match;              // not fixable here (class 2)
    count++;
    return `href="${alt}${frag}"`;
  });
  if (count > 0) {
    fs.writeFileSync(filepath, content);
    totalCorrected += count;
    filesCorrected++;
  }
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found; run `npm run build` first');
  process.exit(1);
}

walk(DIST, stripMdLinks);
walk(DIST, fixRelativeLinks);
console.log(`[strip-md-links] stripped ${totalStripped} .md link(s) across ${filesStripped} file(s)`);
console.log(`[strip-md-links] corrected ${totalCorrected} trailing-slash relative link(s) across ${filesCorrected} file(s)`);
