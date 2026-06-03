// scripts/check-sample-exact-quote-sourcing.mjs - every Source: "quote" must be an
// exact substring of the sample's Prompt/input block. Scoped to evidence-citing
// skills (start: foundation-prioritized-action-plan). Promotes the v2.23.0 hand-check.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';

const SCOPE = ['foundation-prioritized-action-plan'];

/** Return the list of source-ledger quotes not found verbatim in `input`.
 *  The real ledger format is `S1: "quote" (origin: ...)`, one per line; the quote
 *  may contain nested double-quotes, so capture greedily up to the closing
 *  `" (origin:`. (`**Source:** S2, S3` references S-ids, not quotes - not checked.) */
export function unsourcedQuotes(sampleText, input) {
  const out = [];
  for (const m of sampleText.matchAll(/^S\d+:\s*"(.+)"\s*\(origin:/gm)) {
    if (!input.includes(m[1])) out.push(m[1]);
  }
  return out;
}

/** The text the model was given: from the first Scenario/Prompt/Input heading up
 *  to the Output section. Returns '' when that structure is absent, so a malformed
 *  sample's quotes are REPORTED as unsourced rather than self-validated against the
 *  whole file (including the Output and the ledger itself). */
export function inputRegion(sampleText) {
  const start = /##\s*(Scenario|Prompt|Input)\b/i.exec(sampleText);
  if (!start) return '';
  const rest = sampleText.slice(start.index);
  const end = /\n##\s*Output\b/i.exec(rest);
  return end ? rest.slice(0, end.index) : '';
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = SCOPE.flatMap((s) => globSync(`library/skill-output-samples/${s}/**/sample_*.md`, { cwd: repo }))
    .map((f) => join(repo, f))
    .filter((f) => basename(f).startsWith('sample_')); // case-sensitive: excludes guides on Windows
  let findings = 0;
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    const bad = unsourcedQuotes(text, inputRegion(text));
    if (bad.length) {
      findings += bad.length;
      console.log(`UNSOURCED  ${f}: ${bad.map((q) => `"${q}"`).join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} unsourced-quote finding(s) (advisory).` : 'no unsourced-quote findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
