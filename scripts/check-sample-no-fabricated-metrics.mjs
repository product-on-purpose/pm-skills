// scripts/check-sample-no-fabricated-metrics.mjs - advisory heuristic: a number/percent
// in the output not present in the input and not marked [fictional] is flagged.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename, resolve } from 'node:path';
import { inputRegion } from './check-sample-exact-quote-sourcing.mjs';

// Phase 1 flags only PERCENTAGES - the single highest-signal fabrication
// indicator. A percentage in the output not traceable to the input is a strong
// "made-up stat" signal. Bare integers (dates, counts, ordinals -> ~4030 noise)
// and bare decimals (version numbers, ratios -> ~1061 noise) are deliberately
// NOT flagged in Phase 1; richer metric detection is deferred to a later tier.
const NUM = /\d+(?:\.\d+)?%/g;

/** Numbers in `output` not in `input` and not within a [fictional] marker window. */
export function fabricatedMetrics(output, input) {
  const out = [];
  for (const m of output.matchAll(NUM)) {
    const n = m[0];
    if (input.includes(n)) continue;
    const window = output.slice(Math.max(0, m.index - 40), m.index + n.length + 40);
    if (/\[fictional\]/i.test(window)) continue;
    out.push(n);
  }
  return out;
}

// The two tranches the [fictional] convention in
// library/skill-output-samples/README_SAMPLES.md covers. A library sample's
// input is its Scenario and Prompt region. A skill's EXAMPLE.md has no input
// section, so its input is empty by rule, even when the artifact itself
// happens to contain a "## Scenario" or "## Output" heading.
export const TRANCHES = {
  samples: { glob: 'library/skill-output-samples/**/sample_*.md', input: (text) => inputRegion(text) },
  examples: { glob: 'skills/*/references/EXAMPLE.md', input: () => '' },
};

/** The tranche a file belongs to, judged from its path. */
export function trancheFor(path) {
  return /(^|[\\/])references[\\/]EXAMPLE\.md$/.test(path) ? 'examples' : 'samples';
}

function filesFor(repo, name) {
  return globSync(TRANCHES[name].glob, { cwd: repo })
    .map((f) => join(repo, f))
    // case-sensitive: excludes guides (samples) and lowercase variants (examples) on Windows
    .filter((f) => (name === 'samples' ? basename(f).startsWith('sample_') : basename(f) === 'EXAMPLE.md'));
}

// Usage: node scripts/check-sample-no-fabricated-metrics.mjs [--tranche samples|examples] [file ...]
// With no arguments, both tranches are scanned. Named files are checked alone,
// each under the tranche its path implies.
function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const named = [];
  let only = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tranche') only = args[++i];
    else named.push(args[i]);
  }
  if (only !== null && !TRANCHES[only]) {
    console.error(`unknown tranche "${only}"; expected one of: ${Object.keys(TRANCHES).join(', ')}`);
    process.exit(2);
  }
  const files = named.length
    ? named.map((f) => resolve(f))
    : (only ? [only] : Object.keys(TRANCHES)).flatMap((name) => filesFor(repo, name));
  const totals = {};
  for (const f of files) {
    const tranche = trancheFor(f);
    totals[tranche] ??= 0;
    const text = readFileSync(f, 'utf8');
    if (/eval-exempt:\s*fabricated-metric/i.test(text)) continue; // per-file exempt marker
    const bad = fabricatedMetrics(text, TRANCHES[tranche].input(text));
    if (bad.length) {
      totals[tranche] += bad.length;
      console.log(`METRIC?  ${f}: ${[...new Set(bad)].join(', ')}`);
    }
  }
  const findings = Object.values(totals).reduce((a, b) => a + b, 0);
  const split = Object.entries(totals).map(([k, v]) => `${k} ${v}`).join(', ');
  console.log(findings
    ? `\n${findings} possible-unsourced-metric finding(s) (advisory, heuristic): ${split}.`
    : `no metric findings (${split}).`);
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
