// scripts/check-sample-no-placeholders.mjs - advisory invariant over recorded samples.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';

// Only unambiguous BRACKET/ANGLE-delimited placeholder tokens, so the invariant is
// false-positive-free and enforcing-ready. Three broader patterns were tried and
// rejected against the real corpus:
// (1) "[Two Title Words]" matched legitimate matrix-quadrant labels ([Low Price]);
// (2) bare \bTODO\b matched the English noun ("a rolling TODO");
// (3) "TODO:" still matched prose ("a rolling TODO: Klaviyo corroborates").
// A genuine leftover marker is delimited; prose is not.
const PATTERNS = [/\[Placeholder\]/gi, /\[Feature Name\]/gi, /\[TODO\]/gi, /<\.\.\.>/g];

export function findPlaceholders(text) {
  const hits = [];
  for (const re of PATTERNS) {
    for (const m of text.matchAll(re)) hits.push(m[0]);
  }
  return hits;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  // Only actual sample_*.md outputs, not the authoring guides (SAMPLE_CREATION.md,
  // README_SAMPLES.md, THREAD_PROFILES.md) which legitimately document placeholders.
  // basename().startsWith is case-SENSITIVE in JS, so it excludes SAMPLE_CREATION.md
  // even on case-insensitive (Windows) filesystems where the glob would match it.
  const files = globSync('library/skill-output-samples/**/sample_*.md', { cwd: repo })
    .map((f) => join(repo, f))
    .filter((f) => basename(f).startsWith('sample_'));
  let findings = 0;
  for (const f of files) {
    const hits = findPlaceholders(readFileSync(f, 'utf8'));
    if (hits.length) {
      findings += hits.length;
      console.log(`PLACEHOLDER  ${f}: ${[...new Set(hits)].join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} placeholder finding(s) across samples (advisory).` : 'no placeholder findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
