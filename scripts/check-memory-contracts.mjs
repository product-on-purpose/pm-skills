#!/usr/bin/env node
// check-memory-contracts.mjs - structural validator for the B2 project-memory
// declaration (F-54 / WS-3).
//
// WHAT THIS IS. A memory-aware skill declares, in its SKILL.md, what it reads from
// and appends to `.claude/pm-skills.local.md`. There is no runtime behind that: the
// skill is instructions, and the AGENT performs the file I/O by following them. So
// the enforceable half is the DECLARATION, not the behavior. This checks that any
// skill carrying the section declares it in the one agreed shape, which is what
// makes eight skills a cohort rather than eight improvisations.
//
// It does NOT check that a skill reads or writes memory correctly at runtime, and it
// cannot. It also does not require any skill to HAVE the section: membership in the
// cohort is a plan decision, not a validator's business.
//
// THE SHAPE, as declared by the WS-3 cohort:
//
//   ## Project Memory Contract
//
//   Active only when `.claude/pm-skills.local.md` exists; ...
//
//   - **Reads:** <fields, or `nothing`>
//   - **Writes:** <what> as a(n) `<provenance tag>` artifact
//   - **Posture:** propose ... unless `memory_auto_append: true` ...
//
// Rules, all structural:
//   1. a Reads bullet exists
//   2. a Writes bullet exists and names exactly one of the four provenance tags
//   3. a Posture bullet exists and names the `memory_auto_append` opt-in
//   4. the section names `.claude/pm-skills.local.md`, so the opt-in condition is
//      stated in the skill the agent is actually reading, not only in the docs
//
// Rule 4 is the one that matters most for trust. The opt-in posture is load-bearing
// and it is only real if it is visible at the point of use.
//
// Usage:  node scripts/check-memory-contracts.mjs [--root <dir>]
// Exit:   0 = every declared contract is well-formed (or none exist)
//         1 = one or more malformed declarations

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HEADING = '## Project Memory Contract';
const STATE_FILE = '.claude/pm-skills.local.md';
const AUTO_KEY = 'memory_auto_append';
export const PROVENANCE_TAGS = ['observation', 'interpretation', 'hypothesis', 'decision'];

/** Extract the Project Memory Contract section body, or null when absent.
 *  Pure and exported so the rules can be unit-tested without a repo. */
export function extractContract(skillMd) {
  const idx = skillMd.indexOf(HEADING);
  if (idx === -1) return null;
  const after = skillMd.slice(idx + HEADING.length);
  // The section ends at the next H2 (or the end of file).
  const next = after.search(/\r?\n## /);
  return next === -1 ? after : after.slice(0, next);
}

/** Validate one contract body. Returns an array of problem strings (empty = valid). */
export function validateContract(body) {
  const problems = [];

  if (!/\*\*Reads:\*\*/.test(body)) {
    problems.push('missing a `- **Reads:**` bullet');
  }

  const writes = /\*\*Writes:\*\*(.*)/.exec(body);
  if (!writes) {
    problems.push('missing a `- **Writes:**` bullet');
  } else if (/\bnothing\b/i.test(writes[1])) {
    // A pure reader is a legitimate contract. Two of the meeting-family skills consume
    // durable context and produce nothing durable themselves, because that family
    // already chains its own artifacts by filename. Demanding a write from them would
    // manufacture a fake provenance tag, which is worse than declaring none.
  } else {
    const named = PROVENANCE_TAGS.filter((t) => new RegExp('`' + t + '`').test(writes[1]));
    if (named.length === 0) {
      problems.push(
        'the Writes bullet names no provenance tag; it must name exactly one of: ' +
          PROVENANCE_TAGS.map((t) => '`' + t + '`').join(', ')
      );
    } else if (named.length > 1) {
      // Two tags on one write is a design smell, not a typo: it means the skill has
      // not decided whether it is recording evidence or a conclusion.
      problems.push('the Writes bullet names more than one provenance tag (' + named.join(', ') + '); pick one');
    }
  }

  if (!/\*\*Posture:\*\*/.test(body)) {
    problems.push('missing a `- **Posture:**` bullet');
  } else if (!body.includes(AUTO_KEY)) {
    problems.push('the Posture bullet does not name the `' + AUTO_KEY + '` opt-in');
  }

  if (!body.includes(STATE_FILE)) {
    problems.push('the section does not name `' + STATE_FILE + '`, so the opt-in condition is not stated at the point of use');
  }

  return problems;
}

function skillDirs(root) {
  const base = path.join(root, 'skills');
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function main() {
  const argv = process.argv.slice(2);
  const rootFlag = argv.indexOf('--root');
  const root =
    rootFlag !== -1 && argv[rootFlag + 1]
      ? path.resolve(argv[rootFlag + 1])
      : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

  const declared = [];
  const failures = [];

  for (const name of skillDirs(root)) {
    const file = path.join(root, 'skills', name, 'SKILL.md');
    if (!existsSync(file) || !statSync(file).isFile()) continue;
    const body = extractContract(readFileSync(file, 'utf8'));
    if (body === null) continue; // no contract declared: not this validator's business
    declared.push(name);
    const problems = validateContract(body);
    if (problems.length) failures.push({ name, problems });
  }

  console.log('=== Project Memory Contract Check ===');
  console.log(`skills declaring a contract: ${declared.length}`);
  if (declared.length) console.log('  ' + declared.join(', '));

  if (!failures.length) {
    console.log('\nPASS: every declared contract is well-formed.');
    process.exit(0);
  }

  console.log(`\nFAIL: ${failures.length} malformed declaration(s):`);
  for (const f of failures) {
    console.log(`  ${f.name}:`);
    for (const p of f.problems) console.log(`    - ${p}`);
  }
  process.exit(1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
