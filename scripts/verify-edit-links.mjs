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
 *   Starlight constructs editLink URLs from each entry's filePath. With
 *   our D2 Option B custom glob loader (src/content.config.ts, base: '.'),
 *   filePaths retain the docs/ or library/ prefix and should match real
 *   repo paths. This validator ships as a CI guard so that any future
 *   loader / filePath drift surfaces as a build failure rather than as
 *   404s on GitHub when users click "Edit page".
 *
 * Usage:
 *   node scripts/verify-edit-links.mjs [distDir] [repoRoot]
 *
 * Defaults:
 *   distDir  = dist
 *   repoRoot = .
 *
 * Exit codes:
 *   0  PASS. All editLink targets resolve to existing repo files.
 *   1  FAIL. One or more editLink targets do not exist in the repo.
 *   2  ERROR. dist/ does not exist (run npm run build first).
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const EDIT_BASE_URL = 'https://github.com/product-on-purpose/pm-skills/edit/main/';

const distDir = resolve(process.argv[2] ?? 'dist');
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

console.log(
  `PASS: ${totalLinks} editLink occurrences across ${checkedTargets.size} unique targets all resolve to existing repo paths`,
);
