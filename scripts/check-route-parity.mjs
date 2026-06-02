#!/usr/bin/env node
// check-route-parity.mjs - guard against silently removing a published route.
//
// Compares the current built route set (every *.html under site/dist/) against a
// committed baseline (scripts/route-manifest.txt). FAILS if any baseline route is
// missing from the current build: a removed or renamed URL is a "Site not found"
// for any existing external link or bookmark. ADDED routes are allowed (new pages
// are expected), so the baseline only needs updating when a route is intentionally
// removed.
//
// When you intentionally remove a route: add a redirect for it (Astro renders the
// redirect source as a page, so the route stays present and this check still
// passes), OR update scripts/route-manifest.txt in the same commit with a reason.
//
// SCOPE (deliberate): this guard checks route PRESENCE, not page CONTENT. A route
// that keeps its path but silently regresses in content - e.g. an unintended
// redirect added to astro.config.mjs over a path that previously had real content,
// or a page that builds empty - still passes here (the path is present). That is
// the same mechanism that lets an intentional redirect pass. Content-regression is
// out of scope by design; the loud failure this guard exists to prevent is a
// removed/renamed URL ("Site not found"), which it does catch (a rename is one
// removed + one added, and removed-detection fires).
//
// This is the durable, build-aware successor to the one-off manual parity diff used
// during the Pattern S migration. It runs in CI after the build, alongside
// check-rendered-links.mjs and verify-edit-links.mjs.
//
// Usage:  node scripts/check-route-parity.mjs [distDir] [baselineFile]
//   distDir       default: site/dist
//   baselineFile  default: scripts/route-manifest.txt
// Exit:   0 = every baseline route still present; 1 = one or more removed.
//
// Regenerate the baseline after an intentional route change:
//   node scripts/check-route-parity.mjs --update   (writes the current routes)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2).filter((a) => a !== '--update');
const UPDATE = process.argv.includes('--update');
const DIST = path.resolve(argv[0] || path.join(ROOT, 'site', 'dist'));
const BASELINE = path.resolve(argv[1] || path.join(ROOT, 'scripts', 'route-manifest.txt'));

function routesIn(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) {
        out.push('/' + path.relative(dir, full).split(path.sep).join('/'));
      }
    }
  };
  walk(dir);
  return out.sort();
}

if (!fs.existsSync(DIST)) {
  console.error(`route-parity: dist not found at ${DIST}; build the site first (cd site && npm run build).`);
  process.exit(1);
}

const current = routesIn(DIST);

if (UPDATE) {
  fs.writeFileSync(BASELINE, current.join('\n') + '\n', 'utf8');
  console.log(`route-parity: wrote ${current.length} routes to ${path.relative(ROOT, BASELINE)}`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error(`route-parity: baseline not found at ${BASELINE}. Generate it with: node scripts/check-route-parity.mjs --update`);
  process.exit(1);
}

const baseline = fs.readFileSync(BASELINE, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const currentSet = new Set(current);
const baselineSet = new Set(baseline);
const removed = baseline.filter((r) => !currentSet.has(r));
const added = current.filter((r) => !baselineSet.has(r));

console.log('=== Route Parity Check ===');
console.log(`baseline routes: ${baseline.length}   current routes: ${current.length}`);
if (added.length) {
  console.log(`\n${added.length} new route(s) (allowed; update the baseline when convenient):`);
  for (const r of added.slice(0, 20)) console.log(`  + ${r}`);
  if (added.length > 20) console.log(`  ... and ${added.length - 20} more`);
}

if (removed.length === 0) {
  console.log('\nPASS: every baseline route is still present in the build.');
  process.exit(0);
}

console.log(`\nFAIL: ${removed.length} baseline route(s) removed (these would 404 for existing links/bookmarks):`);
for (const r of removed) console.log(`  - ${r}`);
console.log('\nIf intentional: add a redirect (keeps the route present as a redirect page),');
console.log('or run `node scripts/check-route-parity.mjs --update` and commit the new baseline with a reason.');
process.exit(1);
