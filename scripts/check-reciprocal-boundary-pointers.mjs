// scripts/check-reciprocal-boundary-pointers.mjs - assert that declared collision pairs
// carry RECIPROCAL "When NOT to Use" pointers (M-31 / C-5).
//
// Reciprocal boundary pointers are what kept the v2.26.0 description rewrites
// collision-clean (proven by the M-31 router re-baseline): if skill A's description and
// "When NOT to Use" disclaim A's domain toward neighbor B, B must point back at A so the
// router has a symmetric boundary to route on. This check enforces that for every curated
// COLLISION_PAIR: A's "When NOT to Use" must name B, and B's must name A.
//
// Distinct from check-skill-cross-references.sh, which only verifies a pointer RESOLVES to
// a real directory; this verifies the pointer is RECIPROCAL for known collision pairs.
//
// CI-only Node check (out of the shell parity remit). Pure functions are exported and
// unit-tested; main() reads skills/<name>/SKILL.md.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { COLLISION_PAIRS } from './check-trigger-fixtures.mjs';

const PREFIX = 'discover|define|develop|deliver|measure|iterate|foundation|utility|tool';

/** The body of the "## When NOT to Use" h2 section (up to the next h2 heading or EOF).
 *  Parsed line-by-line and anchored to a real h2: `^##[ \t]` requires whitespace after
 *  exactly two `#`, so a `### When NOT to Use` (h3) neither starts nor ends the section
 *  (avoids the unanchored-regex trap where `##` matches the tail of `###`). Pure. */
export function whenNotToUseSection(md) {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => /^##[ \t]+When NOT to Use\b/.test(l));
  if (start === -1) return '';
  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##[ \t]/.test(lines[i])) break; // next h2 ends the section; h3 (###) does not match
    body.push(lines[i]);
  }
  return body.join('\n');
}

/** Backtick-wrapped, classification-prefixed skill names referenced in a section. Pure. */
export function pointersIn(sectionText) {
  const out = new Set();
  const re = new RegExp('`((?:' + PREFIX + ')-[a-z0-9-]+)`', 'g');
  let m;
  while ((m = re.exec(sectionText))) out.add(m[1]);
  return out;
}

/** For each pair [A,B], require A's pointer set to include B and B's to include A.
 *  pointersBySkill maps skill -> Set of names it points to. Pure. Returns finding strings. */
export function reciprocityFindings(pairs, pointersBySkill) {
  const findings = [];
  for (const [a, b] of pairs) {
    const pa = pointersBySkill[a] || new Set();
    const pb = pointersBySkill[b] || new Set();
    if (!pa.has(b)) findings.push(`${a} "When NOT to Use" does not point to its collision partner ${b}`);
    if (!pb.has(a)) findings.push(`${b} "When NOT to Use" does not point to its collision partner ${a}`);
  }
  return findings;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const skills = [...new Set(COLLISION_PAIRS.flat())];
  const pointersBySkill = {};
  let missing = 0;
  for (const s of skills) {
    const p = join(repo, 'skills', s, 'SKILL.md');
    if (!existsSync(p)) { console.log(`MISSING  skills/${s}/SKILL.md (named in a collision pair)`); missing += 1; continue; }
    pointersBySkill[s] = pointersIn(whenNotToUseSection(readFileSync(p, 'utf8')));
  }
  const findings = reciprocityFindings(COLLISION_PAIRS, pointersBySkill);
  for (const f of findings) console.log(`RECIPROCITY  ${f}`);
  const total = findings.length + missing;
  console.log(total ? `\n${total} reciprocity finding(s) across ${COLLISION_PAIRS.length} collision pairs.` : `no reciprocity findings (${COLLISION_PAIRS.length} collision pairs checked).`);
  process.exit(total ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
