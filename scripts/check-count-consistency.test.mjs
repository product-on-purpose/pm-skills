// Unit + integration tests for check-count-consistency.mjs - the single-source Node
// port of the retired bash/pwsh count-consistency pair (v2.31.0 WS-Z4). The pure
// helpers (exemptRanges, lineFindings, countResources) are unit-tested directly; the
// end-to-end verdict is locked against the committed shell-parity fixture mini-repo,
// which was proven byte-identical to the retired shells before they were deleted.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { exemptRanges, lineFindings, countResources, runCheck } from './check-count-consistency.mjs';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(SCRIPTS, 'fixtures', 'shell-parity', 'repo');

// A counts object shaped like countResources() output.
const counts = (over = {}) => ({
  skills: 68, commands: 11, workflows: 12,
  sub: { phase: 30, foundation: 11, utility: 12, tool: 15 },
  ...over,
});
const finds = (line, c = counts()) => lineFindings('f.md', 1, line, c);

// --- exemptRanges ---

test('exemptRanges captures a start/end pair as an inclusive 1-based range', () => {
  const lines = ['a', '<!-- count-exempt:start -->', '99 skills', '<!-- count-exempt:end -->', 'b'];
  assert.deepEqual(exemptRanges(lines), [[2, 4]]);
});

test('exemptRanges handles multiple pairs and ignores an unclosed start', () => {
  const lines = ['{/* count-exempt:start */}', 'x', '{/* count-exempt:end */}', 'count-exempt:start'];
  assert.deepEqual(exemptRanges(lines), [[1, 3]]);
});

// --- lineFindings: prose number-before + subset exclusion + threshold ---

test('prose "N skills" flags a stale total but respects the >=10 threshold', () => {
  assert.deepEqual(finds('we ship 40 skills today'), ["  f.md:1: found '40 skills' (actual: 68)"]);
  assert.deepEqual(finds('we ship 9 skills today'), []); // below MIN_THRESHOLD
  assert.deepEqual(finds('we ship 68 skills today'), []); // matches actual
});

test('prose subset descriptor ("30 phase skills") is not flagged as a stale total', () => {
  // 30 is a subset number (phase), excluded from the skills total check; and the
  // phase sub-count IS 30 here so the sub-count check is also clean.
  assert.deepEqual(finds('the suite has 30 phase skills'), []);
});

test('per-occurrence subset exclusion: a bare "N skills" after a subset phrase on the same line still flags', () => {
  // "26 phase skills" is a subset (phase) and excluded, but the SECOND occurrence, the bare
  // "26 skills", is a stale total claim and must still flag. A global per-line number-VALUE
  // set wrongly suppressed it because it shares the value 26 with the subset phrase. Use
  // sub.phase = 26 so the sub-count check stays clean and isolates the prose total finding.
  assert.deepEqual(
    finds('26 phase skills; the old 26 skills page', counts({ sub: { phase: 26, foundation: 11, utility: 12, tool: 15 } })),
    ["  f.md:1: found '26 skills' (actual: 68)"],
  );
});

test('per-occurrence prefix match: "12 testing skills" is a subset descriptor (test-prefix), not flagged', () => {
  // The retired shell prefix-matched the descriptor, so "testing" counts as "test" and the
  // phrase is skipped. A word-boundary (\b) on the descriptor would wrongly flag it.
  assert.deepEqual(finds('12 testing skills'), []);
});

test('prose commands/workflows totals flag independently', () => {
  assert.deepEqual(finds('there are 40 commands'), ["  f.md:1: found '40 commands' (actual: 11)"]);
  assert.deepEqual(finds('there are 40 workflows'), ["  f.md:1: found '40 workflows' (actual: 12)"]);
});

// --- badge ---

test('badge/skills-N is flagged when stale, ignoring the threshold', () => {
  assert.deepEqual(finds('![](badge/skills-40-blue)'), ["  f.md:1: found badge 'skills-40' (actual: 68)"]);
  assert.deepEqual(finds('![](badge/skills-68-blue)'), []);
});

// --- table + parenthetical (number-after) ---

test('facts-table row "| Skills | N |" is flagged when stale', () => {
  assert.deepEqual(finds('| Skills | 40 |'), ["  f.md:1: found table 'skills = 40' (actual: 68)"]);
  assert.deepEqual(finds('| Slash commands | 40 |'), ["  f.md:1: found table 'commands = 40' (actual: 11)"]);
});

test('parenthetical "Skills (N)" is flagged; a subset parenthetical is not', () => {
  assert.deepEqual(finds('Skills (40) shipped'), ["  f.md:1: found 'skills (40)' (actual: 68)"]);
  assert.deepEqual(finds('phase skills (40) shipped'), [
    // subset for the TOTAL check, but the sub-count check DOES flag it (phase != 40)
    "  f.md:1: found 'phase skills (40)' (actual: 30)",
  ]);
});

test('two parentheticals on one line both flag (loop advances, no rescan)', () => {
  assert.deepEqual(finds('Skills (40) and Commands (20)'), [
    "  f.md:1: found 'skills (40)' (actual: 68)",
    "  f.md:1: found 'commands (20)' (actual: 11)",
  ]);
});

// --- singular-noun ---

test('singular resource + count-noun ("N skill directories") is flagged', () => {
  assert.deepEqual(finds('40 skill directories exist'), ["  f.md:1: found '40 skill directories' (actual: 68)"]);
  assert.deepEqual(finds('47 command docs exist'), ["  f.md:1: found '47 command docs' (actual: 11)"]);
  assert.deepEqual(finds('40 skill levels'), []); // not a count-noun
});

// --- sub-counts (no threshold) ---

test('sub-count forms are policed with no minimum threshold', () => {
  assert.deepEqual(finds('9 foundation skills'), ["  f.md:1: found '9 foundation skills' (actual: 11)"]);
  assert.deepEqual(finds('15 tool-classification entries', counts({ sub: { phase: 30, foundation: 11, utility: 12, tool: 14 } })),
    ["  f.md:1: found '15 tool (classification)' (actual: 14)"]);
  assert.deepEqual(finds('Utility Skills (13)'), ["  f.md:1: found 'utility skills (13)' (actual: 12)"]);
  assert.deepEqual(finds('Foundation Skills (11)'), []); // matches actual foundation
});

// --- countResources against the committed fixture mini-repo ---

test('countResources reads the fixture tree (3 skills / 1 command / 1 workflow, no sub)', () => {
  const c = countResources(FIXTURE);
  assert.equal(c.skills, 3);
  assert.equal(c.commands, 1);
  assert.equal(c.workflows, 1); // README.md excluded
  assert.deepEqual(c.sub, { phase: 0, foundation: 0, utility: 0, tool: 0 });
});

// --- end-to-end verdict against the fixture (the retired-shell parity contract) ---

function insideWorkTree() {
  try {
    return execFileSync('git', ['-C', FIXTURE, 'rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' }).trim() === 'true';
  } catch { return false; }
}

test('runCheck flags exactly the fixture\'s stale counts and exits 1', { skip: insideWorkTree() ? false : 'not a git work tree' }, () => {
  const { code, findings } = runCheck(FIXTURE);
  assert.equal(code, 1);
  assert.deepEqual([...findings].sort(), [
    "  counts.md:10: found '15 workflows' (actual: 1)",
    "  counts.md:8: found '12 skills' (actual: 3)",
    "  counts.md:9: found '20 commands' (actual: 1)",
    "  hazards.md:10: found '47 command docs' (actual: 1)",
    "  hazards.md:11: found '12 phase skills' (actual: 0)",
    "  hazards.md:12: found '9 tool (classification)' (actual: 0)",
    "  hazards.md:13: found 'foundation skills (7)' (actual: 0)",
    "  hazards.md:13: found 'utility skills (13)' (actual: 0)",
    "  hazards.md:8: found 'commands (20)' (actual: 1)",
    "  hazards.md:8: found 'skills (40)' (actual: 3)",
    "  hazards.md:9: found '40 skill directories' (actual: 3)",
  ]);
});

test('runCheck honors the count-exempt marker (no 99-skills finding from counts.md)', { skip: insideWorkTree() ? false : 'not a git work tree' }, () => {
  const { findings } = runCheck(FIXTURE);
  assert.ok(!findings.some((f) => /99 skills/.test(f)), 'the exempt "99 skills" line must not be flagged');
});
