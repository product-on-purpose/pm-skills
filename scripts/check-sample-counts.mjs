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

/**
 * Count samples per product thread by reading each sample's `thread:` frontmatter field.
 * Samples with no thread (legacy and orbit) are counted as `outside`. Pure (fs injected).
 *
 * Added at G1 round 3 (D16): the headline total was gated here while the published per-thread
 * distribution on the site said 64 for Brainshelf against 65 on disk, so the page contradicted
 * its own headline and CI stayed green. A derived count cannot drift the way a typed one does.
 */
export function countThreads(dir, rd = readdirSync, read = readFileSync) {
  const counts = { storevine: 0, brainshelf: 0, workbench: 0, outside: 0 };
  for (const e of rd(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    for (const f of rd(join(dir, e.name))) {
      if (!f.startsWith('sample_') || !f.endsWith('.md')) continue;
      const m = read(join(dir, e.name, f), 'utf8').match(/^thread:\s*(\S+)\s*$/m);
      const t = m && m[1];
      if (t === 'storevine' || t === 'brainshelf' || t === 'workbench') counts[t] += 1;
      else counts.outside += 1;
    }
  }
  return counts;
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

  const th = countThreads(SAMPLES_DIR);
  findings.push(...checkClaims('samples/index.md', idx, [
    { re: /Per-thread sample distribution: Storevine (\d+)/, name: 'thread: storevine', expect: th.storevine },
    { re: /Per-thread sample distribution: Storevine \d+, Brainshelf (\d+)/, name: 'thread: brainshelf', expect: th.brainshelf },
    { re: /Per-thread sample distribution: Storevine \d+, Brainshelf \d+, Workbench (\d+)/, name: 'thread: workbench', expect: th.workbench },
    { re: /plus (\d+) legacy and orbit samples/, name: 'thread: outside the trio', expect: th.outside },
  ]));
  // The distribution must also reconcile to the headline, or the page can be internally
  // consistent per-line and still contradict its own total, which is how this defect shipped.
  const spread = th.storevine + th.brainshelf + th.workbench + th.outside;
  if (spread !== actual.total) {
    findings.push(`samples/index.md: per-thread distribution sums to ${spread}, headline total is ${actual.total}`);
  }

  if (findings.length) {
    for (const x of findings) console.log(`SAMPLE-COUNT  ${x}`);
    console.log(`\n${findings.length} sample-count finding(s). (actual: ${actual.total} samples across ${actual.sampledSkills} skills)`);
    process.exit(1);
  }
  console.log(`sample counts OK (${actual.total} sample files across ${actual.sampledSkills} sampled skills).`);
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
