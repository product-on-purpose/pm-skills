// scripts/check-sample-no-fabricated-metrics.mjs - advisory heuristic: a number/percent
// in the output not present in the input and not marked [fictional] is flagged.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';
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

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = globSync('library/skill-output-samples/**/sample_*.md', { cwd: repo })
    .map((f) => join(repo, f))
    .filter((f) => basename(f).startsWith('sample_')); // case-sensitive: excludes guides on Windows
  let findings = 0;
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    if (/eval-exempt:\s*fabricated-metric/i.test(text)) continue; // per-sample exempt marker
    const bad = fabricatedMetrics(text, inputRegion(text));
    if (bad.length) {
      findings += bad.length;
      console.log(`METRIC?  ${f}: ${[...new Set(bad)].join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} possible-unsourced-metric finding(s) (advisory, heuristic).` : 'no metric findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
