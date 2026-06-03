// scripts/check-sample-exact-quote-sourcing.mjs - every Source: "quote" must be an
// exact substring of the sample's Prompt/input block. Scoped to evidence-citing
// skills (start: foundation-prioritized-action-plan). Promotes the v2.23.0 hand-check.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';

const SCOPE = ['foundation-prioritized-action-plan'];

/** Return the list of Source: quotes not found verbatim in `input`. */
export function unsourcedQuotes(sampleText, input) {
  const out = [];
  for (const m of sampleText.matchAll(/Source:\s*"([^"]+)"/g)) {
    if (!input.includes(m[1])) out.push(m[1]);
  }
  return out;
}

/** Split a sample into its Prompt/input region (everything the model was given). */
export function inputRegion(sampleText) {
  // Heuristic: text under a "## Prompt" / "## Input" / "Scenario" heading up to "## Output".
  const m = /(##\s*(Prompt|Input|Scenario)[\s\S]*?)(?:\n##\s*Output|\n#\s|$)/i.exec(sampleText);
  return m ? m[1] : sampleText;
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
