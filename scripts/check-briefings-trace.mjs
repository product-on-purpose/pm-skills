// scripts/check-briefings-trace.mjs - advisory structural validator for
// foundation-stakeholder-briefings (v2.28.0).
//
// Enforces the STRUCTURAL half of the master-projection contract: in a briefings
// artifact, every briefing block must (1) declare a `Draws on:` line whose master
// claim IDs all resolve to real master claims, and (2) carry exactly one
// `Primary ask:`. This guarantees no briefing references a non-existent master
// claim and every briefing carries exactly one decision.
//
// It does NOT (and cannot, deterministically) verify that the briefing BODY
// introduces no claim absent from the master - that semantic "no untraced claim"
// rule is the skill's own self-check step plus human/LLM review, not automation.
// Do not describe this checker as proving full projection fidelity.
//
// Advisory: exits 0 by default (reports issues). Pass --strict to exit non-zero
// on any failure OR when the requested inputs yield zero parseable artifacts.
// Not wired into validation.yml or the pre-tag bundle (no validator-parity entry).
//
// Usage:
//   node scripts/check-briefings-trace.mjs                 # scans the skill's samples
//   node scripts/check-briefings-trace.mjs --strict        # fail on any violation
//   node scripts/check-briefings-trace.mjs path/to/file.md # check specific files
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ID_RE = /\bM\d+\b/g;
const norm = (t) => t.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

/** Master claim IDs declared in the master region (text before the first briefing block). Pure. */
export function masterIds(text) {
  const begin = text.indexOf('--- BEGIN:');
  const region = begin === -1 ? text : text.slice(0, begin);
  return new Set(region.match(ID_RE) || []);
}

/** Briefing blocks as {lens, body}. Tolerant of CRLF and trailing whitespace on delimiters. Pure. */
export function blocks(text) {
  const out = [];
  const re = /---[ \t]*BEGIN:[ \t]*([^\n]*?)[ \t]*---[ \t]*\n([\s\S]*?)\n[ \t]*---[ \t]*END[ \t]*---/g;
  let m;
  while ((m = re.exec(text)) !== null) out.push({ lens: m[1].trim(), body: m[2] });
  return out;
}

/** Validate one artifact's text. Returns {isArtifact, failures[]}. Pure. */
export function checkText(raw) {
  const text = norm(raw);
  const bs = blocks(text);
  if (!bs.length) return { isArtifact: false, failures: [] };
  const ids = masterIds(text);
  const failures = [];
  for (const b of bs) {
    const drawsLine = (b.body.match(/Draws on:[ \t]*([^\n]*)/i) || [])[1];
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
    if (!isArtifact) { lines.push(`skip ${f}: no briefing blocks parsed`); continue; }
    checked++;
    if (failures.length) { failed++; lines.push(`FAIL ${f}`); for (const x of failures) lines.push(`     - ${x}`); }
    else lines.push(`ok   ${f}`);
  }

  for (const l of lines) console.log(l);
  if (!checked) {
    const msg = 'check-briefings-trace: no parseable briefings artifacts found.';
    // Fail closed under --strict when inputs were expected but nothing parsed (a
    // broken/CRLF-mangled corpus must not pass as "checked").
    if (strict && files.length) { console.error(msg + ' (--strict: expected at least one parseable artifact)'); process.exit(1); }
    console.log(msg);
    return;
  }
  console.log(`\ncheck-briefings-trace: ${checked - failed}/${checked} artifacts structurally clean (Draws-on IDs resolve; one Primary ask each).`);
  if (failed && strict) process.exit(1);
  if (failed) console.log('(advisory: run with --strict to fail the build on these.)');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
