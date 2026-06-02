#!/usr/bin/env node
/*
 * verify-edit-links.mjs
 *
 * Walks a built Astro Starlight dist/ tree, extracts every editLink href
 * (matching the configured editLink.baseUrl), normalizes each URL to a
 * repo-relative path, and asserts the target file exists in the repo
 * source tree.
 *
 * Why this script exists (Codex S5.M1, W10.4):
 *   Starlight constructs editLink URLs from each entry's filePath. Under Pattern S
 *   (stock docsLoader over site/src/content/docs/), the editLink.baseUrl carries
 *   the /site/ segment so baseUrl + filePath reaches the real repo path
 *   (site/src/content/docs/...). This validator ships as a CI guard so that any
 *   future loader / filePath / baseUrl drift surfaces as a build failure rather
 *   than as 404s on GitHub when users click "Edit page".
 *
 * Usage:
 *   node scripts/verify-edit-links.mjs [distDir] [repoRoot]
 *
 * Defaults:
 *   distDir  = site/dist
 *   repoRoot = .
 *
 * Exit codes:
 *   0  PASS. All editLink targets resolve to existing repo files AND
 *           the total occurrence count meets the minimum threshold.
 *   1  FAIL. One or more editLink targets do not exist in the repo,
 *           OR the total occurrence count fell below the minimum
 *           threshold (silent regression where editLink emission broke).
 *   2  ERROR. dist/ does not exist (run npm run build first).
 *
 * Minimum-count threshold (Codex P2.2):
 *   We have 238 editLink occurrences across 238 unique targets as of
 *   v2.14.0. A regression where editLink emission silently broke (e.g.,
 *   Starlight config drift, baseUrl typo, custom-glob-loader change)
 *   would result in 0 occurrences. Without a minimum threshold the
 *   script would pass on 0/0, hiding the regression. The threshold is
 *   configurable via MIN_EDIT_LINKS env var; default 100 (allows ~50%
 *   content shrinkage before failing, while catching the all-or-nothing
 *   regression mode).
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const EDIT_BASE_URL = 'https://github.com/product-on-purpose/pm-skills/edit/main/';
const MIN_EDIT_LINKS = Number.parseInt(process.env.MIN_EDIT_LINKS ?? '100', 10);

const distDir = resolve(process.argv[2] ?? 'site/dist');
const repoRoot = resolve(process.argv[3] ?? '.');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      yield* walk(full);
    } else if (stat.isFile()) {
      yield full;
    }
  }
}

function escapeForRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (!existsSync(distDir)) {
  console.error(`ERROR: dist directory does not exist: ${distDir}`);
  console.error(`       Run 'npm run build' first.`);
  process.exit(2);
}

const HREF_RE = new RegExp(
  `href=["']${escapeForRegex(EDIT_BASE_URL)}([^"'#?]+)`,
  'g',
);

let totalLinks = 0;
const failures = [];
const checkedTargets = new Set();

for (const file of walk(distDir)) {
  if (!file.endsWith('.html')) continue;
  const html = readFileSync(file, 'utf-8');
  for (const match of html.matchAll(HREF_RE)) {
    totalLinks++;
    const repoRelPath = decodeURIComponent(match[1]);
    if (checkedTargets.has(repoRelPath)) continue;
    checkedTargets.add(repoRelPath);
    const targetPath = join(repoRoot, repoRelPath);
    if (!existsSync(targetPath)) {
      failures.push({
        firstSeenIn: relative(repoRoot, file),
        target: repoRelPath,
      });
    }
  }
}

if (failures.length > 0) {
  console.error(
    `FAIL: ${failures.length} unique editLink target(s) do not exist in repo (across ${totalLinks} link occurrences in ${checkedTargets.size} unique targets)`,
  );
  for (const f of failures.slice(0, 20)) {
    console.error(`  first seen in: ${f.firstSeenIn}`);
    console.error(`  target:        ${f.target}`);
  }
  if (failures.length > 20) {
    console.error(`  ... and ${failures.length - 20} more`);
  }
  process.exit(1);
}

if (totalLinks < MIN_EDIT_LINKS) {
  console.error(
    `FAIL: editLink occurrence count (${totalLinks}) is below the minimum threshold (${MIN_EDIT_LINKS}). This usually signals that editLink emission silently broke (Starlight config drift, baseUrl typo, or custom-glob-loader change). Investigate astro.config.mjs editLink config and src/content.config.ts loader.`,
  );
  console.error(
    `  Tip: tune MIN_EDIT_LINKS env var if intentional content shrinkage caused this.`,
  );
  process.exit(1);
}

console.log(
  `PASS: ${totalLinks} editLink occurrences across ${checkedTargets.size} unique targets all resolve to existing repo paths (above minimum threshold ${MIN_EDIT_LINKS})`,
);
