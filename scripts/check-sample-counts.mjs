// scripts/check-sample-counts.mjs - D8 (v2.29.0): reconcile library sample counts against
// the hand-authored count claims. check-count-consistency excludes library/, so nothing
// reconciled the sample headline numbers against the files on disk - which is exactly how
// the showcase rotted (~15 skills stale) and how README_SAMPLES + samples/index.md drifted
// (210 on disk vs a stale 207/62). The showcase was fixed by deriving it; these hand-authored
// count claims are gated here. Checks the load-bearing headline numbers (total sample files +
// sampled-skill count) on README_SAMPLES.md and the site samples landing page.
//
// Usage: node scripts/check-sample-counts.mjs
// Enforcing in CI: a deterministic count gate (like check-count-consistency), not a fuzzy
// eval, so it ships enforcing rather than on the M-30 advisory ladder.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const SAMPLES_DIR = join(repo, 'library/skill-output-samples');

/** Count sample_*.md files and the directories that hold at least one. Pure (fs injected). */
export function countSamples(dir, rd = readdirSync) {
  let total = 0;
  let sampledSkills = 0;
  for (const e of rd(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const n = rd(join(dir, e.name)).filter((f) => f.startsWith('sample_') && f.endsWith('.md')).length;
    if (n > 0) {
      sampledSkills += 1;
      total += n;
    }
  }
  return { total, sampledSkills };
}

/** Findings for one (label, text) against the expected number for each named pattern. Pure. */
export function checkClaims(label, text, claims) {
  const f = [];
  for (const { re, name, expect } of claims) {
    const m = text.match(re);
    if (!m) {
      f.push(`${label}: claim "${name}" not found (the surface may have been reworded; update ${re})`);
      continue;
    }
    if (Number(m[1]) !== expect) f.push(`${label}: "${name}" says ${m[1]}, actual ${expect}`);
  }
  return f;
}

function main() {
  const actual = countSamples(SAMPLES_DIR);
  const findings = [];

  const readme = readFileSync(join(SAMPLES_DIR, 'README_SAMPLES.md'), 'utf8');
  findings.push(...checkClaims('README_SAMPLES.md', readme, [
    { re: /(\d+) sample outputs across \d+ PM skills/, name: 'total samples', expect: actual.total },
    { re: /\d+ sample outputs across (\d+) PM skills/, name: 'sampled skills', expect: actual.sampledSkills },
  ]));

  const idx = readFileSync(join(repo, 'site/src/content/docs/samples/index.md'), 'utf8');
  findings.push(...checkClaims('samples/index.md', idx, [
    { re: /Total samples \| (\d+)/, name: 'total samples', expect: actual.total },
    { re: /Skills with samples \| (\d+)/, name: 'sampled skills', expect: actual.sampledSkills },
  ]));

  if (findings.length) {
    for (const x of findings) console.log(`SAMPLE-COUNT  ${x}`);
    console.log(`\n${findings.length} sample-count finding(s). (actual: ${actual.total} samples across ${actual.sampledSkills} skills)`);
    process.exit(1);
  }
  console.log(`sample counts OK (${actual.total} sample files across ${actual.sampledSkills} sampled skills).`);
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
