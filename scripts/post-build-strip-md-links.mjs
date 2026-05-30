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
// URL. Source markdown is never touched, so the filesystem-based link
// validator stays green.
//
// PASS 3 (cross-target relative-link fix): some body links point at repo paths
// that exist on GitHub (where docs/, skills/, _workflows/, library/ are sibling
// dirs) but have no meaning under the site URL space, so they survive pass 2
// still broken. These come in two flavors:
//   (a) the target IS published, just at a different route - workflows
//       (`_workflows/<n>.md` -> /workflows/<n>/), skills (`skills/<s>/SKILL.md`
//       -> /skills/<phase>/<s>/), and library samples
//       (`library/skill-output-samples/<r>.md` -> /samples/<r>/). We re-route to
//       the in-site page, verified against dist before use.
//   (b) the target is a repo source file the site never publishes (docs/internal,
//       agents/, scripts/, .github/, *.yaml schema). We rewrite to an absolute
//       GitHub source URL (blob for files, tree for dirs) so the reference still
//       resolves for a site reader.
// As with pass 2, a link is only rewritten if it is broken as-authored; working
// links are never touched, and source markdown is untouched (validator green).

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const REPO = path.resolve('.');
const BASE = '/pm-skills';
const GH = 'https://github.com/product-on-purpose/pm-skills';
const PRESERVE_RE = /(?:^|\/)(?:README|CHANGELOG|CONTRIBUTING|LICENSE|AGENTS)\.md(?:#|$)/;

let totalStripped = 0;
let filesStripped = 0;
let totalCorrected = 0;
let filesCorrected = 0;
let totalRetargeted = 0;
let filesRetargeted = 0;

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

// Is a repo-relative path a file, a directory, or absent on disk?
function repoKind(relPath) {
  const full = path.join(REPO, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.statSync(full).isDirectory() ? 'dir' : 'file';
}

// Reverse-map a built HTML file to the repo directory of its SOURCE markdown,
// so author-relative links can be resolved into repo space.
function sourceRepoDir(filepath) {
  let slug = path.relative(DIST, filepath).split(path.sep).join('/')
    .replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (slug === '' || slug === 'index') return 'docs';
  const dirOf = (s) => (s.includes('/') ? s.slice(0, s.lastIndexOf('/')) : '');
  if (slug.startsWith('samples/')) {
    const inner = slug.slice('samples/'.length);
    const base = 'library/skill-output-samples/' + inner;
    if (repoKind(base + '.md') === 'file' || repoKind(base + '.mdx') === 'file') {
      return ('library/skill-output-samples/' + dirOf(inner)).replace(/\/$/, '');
    }
    return base;
  }
  if (repoKind('docs/' + slug + '.md') === 'file' || repoKind('docs/' + slug + '.mdx') === 'file') {
    return ('docs/' + dirOf(slug)).replace(/\/$/, '');
  }
  return 'docs/' + slug;
}

// Map a repo-relative target (post-.md-strip, no trailing slash) to its
// canonical site URL (if published) or a GitHub source URL (if not).
function mapCrossTarget(t) {
  let m;
  if ((m = t.match(/^_workflows\/([^/]+)$/))) {
    const cand = `${BASE}/workflows/${m[1]}/`;
    if (existsInDist(cand)) return cand;
  }
  if ((m = t.match(/^skills\/([^/]+)(?:\/SKILL)?$/))) {
    const phase = m[1].split('-')[0];
    const cand = `${BASE}/skills/${phase}/${m[1]}/`;
    if (existsInDist(cand)) return cand;
  }
  if ((m = t.match(/^library\/skill-output-samples(?:\/(.*))?$/))) {
    const cand = m[1] ? `${BASE}/samples/${m[1]}/` : `${BASE}/samples/`;
    if (existsInDist(cand)) return cand;
  }
  if ((m = t.match(/^docs\/(.+)$/))) {
    const cand = `${BASE}/${m[1]}/`;
    if (existsInDist(cand)) return cand;
  }
  // GitHub source fallback (target not published as a site page)
  for (const cand of [t, t + '.md', t + '.mdx']) {
    if (repoKind(cand) === 'file') return `${GH}/blob/main/${cand}`;
  }
  if (repoKind(t) === 'dir') return `${GH}/tree/main/${t}/`;
  return null; // cannot map safely; leave as-authored
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

// PASS 3: re-target cross-target relative links still broken after pass 2
function fixCrossTargetLinks(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const pageUrl = urlOf(filepath);
  const parentBase = pageUrl.replace(/[^/]+\/$/, '');
  const srcDir = sourceRepoDir(filepath);
  let count = 0;
  content = content.replace(/href="((?:\.\.?\/)[^"]*)"/g, (match, href) => {
    const hashIdx = href.indexOf('#');
    const clean = hashIdx === -1 ? href : href.slice(0, hashIdx);
    const frag = hashIdx === -1 ? '' : href.slice(hashIdx);
    if (!clean) return match;
    // Skip anything that already resolves (working, or fixed by pass 2).
    let direct;
    try { direct = resolvePath(pageUrl, clean); } catch { return match; }
    if (existsInDist(direct)) return match;
    try { if (existsInDist(resolvePath(parentBase, clean))) return match; } catch {}
    // Resolve into repo space using the source-file directory.
    const repoTarget = path.posix.normalize(srcDir + '/' + clean).replace(/\/$/, '');
    if (repoTarget.startsWith('..')) return match; // escapes repo root; leave it
    const mapped = mapCrossTarget(repoTarget);
    if (!mapped) return match;
    count++;
    return `href="${mapped}${frag}"`;
  });
  if (count > 0) {
    fs.writeFileSync(filepath, content);
    totalRetargeted += count;
    filesRetargeted++;
  }
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found; run `npm run build` first');
  process.exit(1);
}

walk(DIST, stripMdLinks);
walk(DIST, fixRelativeLinks);
walk(DIST, fixCrossTargetLinks);
console.log(`[strip-md-links] stripped ${totalStripped} .md link(s) across ${filesStripped} file(s)`);
console.log(`[strip-md-links] corrected ${totalCorrected} trailing-slash relative link(s) across ${filesCorrected} file(s)`);
console.log(`[strip-md-links] re-targeted ${totalRetargeted} cross-target link(s) across ${filesRetargeted} file(s)`);
