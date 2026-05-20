#!/usr/bin/env node
// v2.17.0 W1 migration: move proprietary top-level frontmatter fields
// (phase | classification, version, updated) under the metadata: block, to
// comply with the agentskills.io specification (only name/description/license/
// compatibility/metadata/allowed-tools are spec-recognized top-level fields).
//
// - Idempotent: re-running on an already-migrated file is a no-op.
// - Deterministic: mechanical transforms only; no per-file LLM edits.
// - Preserves: CRLF/LF line endings, existing metadata sub-structure verbatim,
//   exact field values (including quotes).
// - Reversible: pass --reverse to move the fields back to top-level.
//
// Order under metadata: classification|phase, version, updated, then the
// existing metadata children unchanged.
//
// Usage:
//   node scripts/migrate-skills-frontmatter.mjs [--reverse] [--dry-run] [path ...]
// With no path args, processes all skills/<name>/SKILL.md.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MOVED_KEYS = ['classification', 'phase', 'version', 'updated'];
const MOVED_ORDER = ['classification', 'phase', 'version', 'updated'];

function detectEol(content) {
  return content.includes('\r\n') ? '\r\n' : '\n';
}

function splitFrontmatter(lines) {
  if (lines[0] === undefined || lines[0].trim() !== '---') return null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return { start: 0, end: i }; // fences at 0 and i
    }
  }
  return null;
}

// Returns { topLevel: [lines], metaIdx: int|-1, fmLines: [lines] }
function parseFm(fmLines) {
  let metaIdx = -1;
  for (let i = 0; i < fmLines.length; i++) {
    if (/^metadata:\s*$/.test(fmLines[i])) { metaIdx = i; break; }
  }
  return { metaIdx };
}

function isTopLevelKey(line, key) {
  return new RegExp(`^${key}:\\s`).test(line) || new RegExp(`^${key}:\\s*$`).test(line);
}

function migrateForward(fmLines) {
  const { metaIdx } = parseFm(fmLines);
  if (metaIdx === -1) return { changed: false, reason: 'no metadata: block' };

  // Idempotency: if no top-level moved key exists, already migrated.
  const hasTopMoved = fmLines.some(
    (l, i) => i < metaIdx && MOVED_KEYS.some((k) => isTopLevelKey(l, k)),
  );
  if (!hasTopMoved) return { changed: false, reason: 'already migrated' };

  const topRegion = fmLines.slice(0, metaIdx);
  const metaHeader = fmLines[metaIdx];
  const metaChildren = fmLines.slice(metaIdx + 1);

  // Extract moved lines (value preserved) and keep the rest of top-level.
  const movedByKey = {};
  const keptTop = [];
  for (const line of topRegion) {
    const k = MOVED_KEYS.find((key) => isTopLevelKey(line, key));
    if (k) {
      movedByKey[k] = line; // preserve full "key: value"
    } else {
      keptTop.push(line);
    }
  }

  // Build moved lines indented by 2 spaces, in canonical order.
  const movedIndented = [];
  for (const k of MOVED_ORDER) {
    if (movedByKey[k] !== undefined) movedIndented.push('  ' + movedByKey[k]);
  }

  const newFm = [...keptTop, metaHeader, ...movedIndented, ...metaChildren];
  return { changed: true, newFm };
}

function migrateReverse(fmLines) {
  const { metaIdx } = parseFm(fmLines);
  if (metaIdx === -1) return { changed: false, reason: 'no metadata: block' };

  const topRegion = fmLines.slice(0, metaIdx);
  const metaChildren = fmLines.slice(metaIdx + 1);

  // Pull moved keys back out of metadata (only first-indent-level matches).
  const pulled = {};
  const remainingMeta = [];
  for (const line of metaChildren) {
    // first indent level = exactly 2 spaces (our migration uses 2)
    const m = line.match(/^ {2}([A-Za-z][\w-]*):/);
    if (m && MOVED_KEYS.includes(m[1]) && pulled[m[1]] === undefined) {
      pulled[m[1]] = line.replace(/^ {2}/, '');
    } else {
      remainingMeta.push(line);
    }
  }
  if (Object.keys(pulled).length === 0) return { changed: false, reason: 'nothing to reverse' };

  const reorderedTop = [];
  for (const k of MOVED_ORDER) {
    if (pulled[k] !== undefined) reorderedTop.push(pulled[k]);
  }
  const newFm = [...topRegion, ...reorderedTop, 'metadata:', ...remainingMeta];
  return { changed: true, newFm };
}

function processFile(path, { reverse, dryRun }) {
  const content = readFileSync(path, 'utf8');
  const eol = detectEol(content);
  const lines = content.split(/\r?\n/);
  const fences = splitFrontmatter(lines);
  if (!fences) return { skipped: true, reason: 'no frontmatter', path };

  const fmLines = lines.slice(fences.start + 1, fences.end);
  const body = lines.slice(fences.end + 1);

  const result = reverse ? migrateReverse(fmLines) : migrateForward(fmLines);
  if (!result.changed) return { skipped: true, reason: result.reason, path };

  const out = ['---', ...result.newFm, '---', ...body].join(eol);
  if (!dryRun) writeFileSync(path, out, 'utf8');
  return { changed: true, path };
}

function findSkillFiles() {
  const out = [];
  const skillsDir = 'skills';
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const p = join(skillsDir, entry.name, 'SKILL.md');
    try { statSync(p); out.push(p); } catch { /* no SKILL.md */ }
  }
  return out.sort();
}

function main() {
  const args = process.argv.slice(2);
  const reverse = args.includes('--reverse');
  const dryRun = args.includes('--dry-run');
  const paths = args.filter((a) => !a.startsWith('--'));
  const files = paths.length ? paths : findSkillFiles();

  let changed = 0, skipped = 0;
  const log = [];
  for (const f of files) {
    const r = processFile(f, { reverse, dryRun });
    if (r.changed) { changed++; log.push(`  ${dryRun ? 'WOULD ' : ''}${reverse ? 'REVERSE' : 'MIGRATE'} ${r.path}`); }
    else { skipped++; log.push(`  SKIP ${r.path}: ${r.reason}`); }
  }
  console.log(`Frontmatter migration (${reverse ? 'reverse' : 'forward'}${dryRun ? ', dry-run' : ''})`);
  console.log(log.join('\n'));
  console.log(`\nResults: ${changed} changed, ${skipped} skipped, ${files.length} total`);
}

main();
