#!/usr/bin/env node
// check-root-doc-links.mjs - guard against broken links in repo-root markdown.
//
// The repo's other link guards (check-rendered-links.mjs, check-route-parity.mjs)
// validate the BUILT Astro site under site/dist. They do NOT see repo-root prose
// like README.md and CHANGELOG.md, which GitHub renders with its own relative-link
// resolver. That blind spot is how the Pattern S docs relocation (docs/ ->
// site/src/content/docs/) left ~90 dead links in README.md that nothing caught.
//
// This guard closes that gap. For each root doc it checks:
//   - relative links ([..](path)) resolve to a real file/dir in the repo, and
//   - our own deployed-site URLs (https://<pages-host>/pm-skills/...) map to a real
//     route in scripts/route-manifest.txt (the same baseline check-route-parity uses).
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

const DOCS = ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'AGENTS.md', 'QUICKSTART.md'];
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

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error(`check-root-doc-links: route manifest not found at ${MANIFEST}`);
    process.exit(1);
  }
  const routes = new Set(
    fs.readFileSync(MANIFEST, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  );
  const exists = (rel) => fs.existsSync(path.resolve(ROOT, decodeURIComponent(rel)));

  let problems = [];
  const checked = [];
  for (const file of DOCS) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) continue;
    checked.push(file);
    const found = findBrokenLinks(fs.readFileSync(full, 'utf8'), { routes, sitePrefix: SITE_PREFIX, exists });
    problems = problems.concat(found.map((p) => ({ file, ...p })));
  }

  console.log('=== Root Doc Link Check ===');
  console.log(`checked: ${checked.join(', ')}`);
  if (problems.length === 0) {
    console.log('\nPASS: all relative links resolve and all deployed-site URLs map to a real route.');
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
