#!/usr/bin/env node
// check-root-doc-links.mjs - guard against broken links in repo-root markdown AND
// in the raw source surfaces (skills/, agents/, _workflows/, commands/) that agents
// and GitHub readers consume directly.
//
// The repo's other link guards (check-rendered-links.mjs, check-route-parity.mjs)
// validate the BUILT Astro site under site/dist. They do NOT see repo-root prose
// like README.md and CHANGELOG.md, nor raw SKILL.md / agent / workflow markdown,
// which GitHub renders with its own relative-link resolver. That blind spot is how
// the Pattern S docs relocation (docs/ -> site/src/content/docs/) left ~90 dead
// links in README.md, and dead docs/reference links across skills and agents, that
// nothing caught (Codex audit P1-01).
//
// For each scanned doc it checks:
//   - relative links resolve to a real file/dir (resolved from the FILE's own
//     directory), and
//   - our own deployed-site URLs (https://<pages-host>/pm-skills/...) map to a real
//     route in scripts/route-manifest.txt (the same baseline check-route-parity uses).
//
// Pattern S relocation alias: a relative link that resolves into the retired
//   docs/(reference|guides|concepts)/... tree is accepted when the same tail exists
//   under site/src/content/docs/... (where gen-site.mjs rewrites it at build time).
//   This is an explicit, documented exception, not a silent pass: any OTHER
//   non-resolving relative link fails. (Removing the exception is the deeper fix,
//   but it is coupled to gen-site's rewrite contract; this guard at least stops the
//   next Pattern-S-class regression in source files.)
//
// External URLs (other hosts), in-page #anchors, and mailto:/tel: are skipped.
// Anchor fragments on internal links are not resolved (presence-only, by design).
//
// Usage:  node scripts/check-root-doc-links.mjs
// Exit:   0 = all links resolve; 1 = one or more broken.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from './site-base.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// GitHub Pages user host for the org; combined with BASE (single-sourced) it forms
// the canonical public origin the docs site is served from.
const SITE_PREFIX = 'https://product-on-purpose.github.io' + BASE;

// Root-level prose docs (resolved from the repo root).
const ROOT_DOCS = ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'AGENTS.md', 'QUICKSTART.md'];
// Raw source surfaces consumed directly by agents and GitHub readers (Codex audit P1-01).
const SOURCE_DIRS = ['skills', 'agents', '_workflows', 'commands'];
const MANIFEST = path.join(ROOT, 'scripts', 'route-manifest.txt');

// Find broken links in a markdown string. Pure (filesystem + routes injected) so it
// is unit-testable without touching the real repo.
export function findBrokenLinks(text, { routes, sitePrefix, exists }) {
  const clean = text
    .replace(/```[\s\S]*?```/g, '') // fenced code blocks
    .replace(/(`+)[^\n]*?\1/g, ''); // inline code spans: literal markdown examples are not links
  const out = [];
  const re = /\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(clean)) !== null) {
    let target = m[1].trim().split(/\s+/)[0]; // drop optional "title"
    if (!target || target.startsWith('#')) continue;
    if (/[{}]/.test(target)) continue; // template placeholder (e.g. {{path}}, {release-url}), not a real link
    if (/^(mailto:|tel:)/i.test(target)) continue;
    if (/^https?:\/\//i.test(target)) {
      if (target.startsWith(sitePrefix)) {
        let rest = target.slice(sitePrefix.length).split('#')[0].split('?')[0];
        if (!rest.startsWith('/')) rest = '/' + rest;
        const route = (rest.endsWith('/') ? rest : rest + '/') + 'index.html';
        if (!routes.has(route)) out.push({ target, reason: `deployed-site route not in manifest (${route})` });
      }
      continue; // external host: out of scope
    }
    const rel = target.split('#')[0].split('?')[0];
    if (!rel) continue;
    if (!exists(rel)) out.push({ target, reason: 'relative path does not exist' });
  }
  return out;
}

// Resolve a relative link target from a source file's directory, honoring the
// Pattern S relocation alias (docs/(reference|guides|concepts)/... source links
// point at the old root path but the content now lives under site/src/content/docs/).
// Exported for unit testing; fileExists(absPath) is injected.
export function relativeTargetResolves(rel, { fileDir, root, fileExists }) {
  const decoded = decodeURIComponent(rel);
  const abs = path.resolve(fileDir, decoded);
  if (fileExists(abs)) return true;
  // Pattern S moved the whole published docs/ tree under site/src/content/docs/.
  // (docs/internal, docs/templates, docs/RESOURCES.md, docs/README.md stayed at root
  // and are caught by the fileExists(abs) check above, so they never reach here.)
  const relToRoot = path.relative(root, abs).split(path.sep).join('/');
  const m = relToRoot.match(/^docs\/(.+)$/);
  if (m && fileExists(path.resolve(root, 'site', 'src', 'content', 'docs', m[1]))) return true;
  return false;
}

// Recursively collect *.md files under a directory (empty if the dir is absent).
function collectMarkdown(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error(`check-root-doc-links: route manifest not found at ${MANIFEST}`);
    process.exit(1);
  }
  const routes = new Set(
    fs.readFileSync(MANIFEST, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  );
  const fileExists = (abs) => fs.existsSync(abs);

  const files = [
    ...ROOT_DOCS.map((d) => path.join(ROOT, d)).filter((f) => fs.existsSync(f)),
    ...SOURCE_DIRS.flatMap((d) => collectMarkdown(path.join(ROOT, d))),
  ];

  let problems = [];
  for (const full of files) {
    const fileDir = path.dirname(full);
    const exists = (rel) => relativeTargetResolves(rel, { fileDir, root: ROOT, fileExists });
    const found = findBrokenLinks(fs.readFileSync(full, 'utf8'), { routes, sitePrefix: SITE_PREFIX, exists });
    const relFile = path.relative(ROOT, full).split(path.sep).join('/');
    problems = problems.concat(found.map((p) => ({ file: relFile, ...p })));
  }

  console.log('=== Root + Source Doc Link Check ===');
  console.log(`scanned: ${files.length} markdown files (root prose + ${SOURCE_DIRS.join('/')})`);
  if (problems.length === 0) {
    console.log('\nPASS: all relative links resolve (Pattern S alias honored) and all deployed-site URLs map to a real route.');
    process.exit(0);
  }
  console.log(`\nFAIL: ${problems.length} broken link(s):`);
  for (const p of problems) console.log(`  ${p.file}: ${p.target}  [${p.reason}]`);
  process.exit(1);
}

// run only when invoked directly, not when imported by the test
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
