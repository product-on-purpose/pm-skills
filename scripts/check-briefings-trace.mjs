// scripts/check-briefings-trace.mjs - advisory trace/CTA validator for
// foundation-stakeholder-briefings (v2.28.0).
//
// Mechanizes the deterministic half of the master-projection invariant (spec
// rules 1-2): in a briefings artifact, every briefing block must (1) cite master
// claim IDs in a `Draws on:` line that all resolve to real master claims, and
// (2) carry exactly one `Primary ask:` field. Rule 3 (neutral master) is a human
// review check and is intentionally NOT automated here.
//
// Advisory: exits 0 by default (reports issues). Pass --strict to exit non-zero
// on any failure. Not wired into validation.yml or the pre-tag bundle, so it does
// not participate in the validator-parity manifest.
//
// Usage:
//   node scripts/check-briefings-trace.mjs                 # scans the skill's samples
//   node scripts/check-briefings-trace.mjs --strict        # fail on any violation
//   node scripts/check-briefings-trace.mjs path/to/file.md # check specific files
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ID_RE = /\bM\d+\b/g;

/** Master claim IDs declared in the master region (text before the first briefing block). Pure. */
export function masterIds(text) {
  const begin = text.indexOf('--- BEGIN:');
  const region = begin === -1 ? text : text.slice(0, begin);
  return new Set(region.match(ID_RE) || []);
}

/** Briefing blocks as {lens, body}. Pure. */
export function blocks(text) {
  const out = [];
  const re = /--- BEGIN:\s*([^\n]*?)\s*---\n([\s\S]*?)\n--- END ---/g;
  let m;
  while ((m = re.exec(text)) !== null) out.push({ lens: m[1].trim(), body: m[2] });
  return out;
}

/** Validate one artifact's text. Returns {isArtifact, failures[]}. Pure. */
export function checkText(text) {
  const bs = blocks(text);
  if (!bs.length) return { isArtifact: false, failures: [] };
  const ids = masterIds(text);
  const failures = [];
  for (const b of bs) {
    const drawsLine = (b.body.match(/Draws on:\s*([^\n]*)/i) || [])[1];
    if (drawsLine === undefined) {
      failures.push(`block "${b.lens}": missing "Draws on:" line`);
    } else {
      const refs = drawsLine.match(ID_RE) || [];
      if (!refs.length) failures.push(`block "${b.lens}": "Draws on:" lists no master claim IDs`);
      for (const r of refs) if (!ids.has(r)) failures.push(`block "${b.lens}": Draws-on ID ${r} does not resolve to a master claim`);
    }
    const askCount = (b.body.match(/Primary ask:/gi) || []).length;
    if (askCount !== 1) failures.push(`block "${b.lens}": expected exactly one "Primary ask:", found ${askCount}`);
  }
  return { isArtifact: true, failures };
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const argv = process.argv.slice(2);
  const strict = argv.includes('--strict');
  const fileArgs = argv.filter((a) => !a.startsWith('--'));
  const files = fileArgs.length
    ? fileArgs
    : globSync('library/skill-output-samples/foundation-stakeholder-briefings/sample_*.md', { cwd: repo }).map((f) => join(repo, f));

  let checked = 0;
  let failed = 0;
  const lines = [];
  for (const f of files) {
    let text;
    try { text = readFileSync(f, 'utf8'); } catch { lines.push(`? ${f}: unreadable`); continue; }
    const { isArtifact, failures } = checkText(text);
    if (!isArtifact) continue;
    checked++;
    if (failures.length) { failed++; lines.push(`FAIL ${f}`); for (const x of failures) lines.push(`     - ${x}`); }
    else lines.push(`ok   ${f}`);
  }

  for (const l of lines) console.log(l);
  if (!checked) { console.log('check-briefings-trace: no briefings artifacts found to check.'); return; }
  console.log(`\ncheck-briefings-trace: ${checked - failed}/${checked} artifacts clean.`);
  if (failed && strict) process.exit(1);
  if (failed) console.log('(advisory: run with --strict to fail the build on these.)');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
