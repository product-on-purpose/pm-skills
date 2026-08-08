// Unit tests for check-memory-contracts.mjs extractContract() + validateContract().
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractContract, validateContract, PROVENANCE_TAGS } from './check-memory-contracts.mjs';

const VALID = [
  '## Project Memory Contract',
  '',
  'Active only when `.claude/pm-skills.local.md` exists; with no file, ignore this section.',
  '',
  '- **Reads:** `phase`, `active_initiative`',
  '- **Writes:** the synthesis as an `interpretation` artifact',
  '- **Posture:** propose the entry and wait for confirmation, unless `memory_auto_append: true`.',
  '',
].join('\n');

test('a well-formed contract passes with no problems', () => {
  const body = extractContract(VALID);
  assert.notEqual(body, null);
  assert.deepEqual(validateContract(body), []);
});

test('extractContract returns null when the section is absent', () => {
  assert.equal(extractContract('## When to Use\n\nSomething else.\n'), null);
});

test('extractContract stops at the next H2 and does not swallow it', () => {
  const doc = VALID + '\n## Examples\n\n- **Writes:** this belongs to Examples, not the contract\n';
  const body = extractContract(doc);
  assert.ok(body.includes('**Posture:**'));
  assert.ok(!body.includes('belongs to Examples'));
});

test('a missing Reads bullet is reported', () => {
  const body = extractContract(VALID.replace('- **Reads:** `phase`, `active_initiative`\n', ''));
  assert.ok(validateContract(body).some((p) => /Reads/.test(p)));
});

test('a missing Writes bullet is reported', () => {
  const body = extractContract(VALID.replace(/- \*\*Writes:\*\*.*\n/, ''));
  assert.ok(validateContract(body).some((p) => /Writes/.test(p)));
});

test('a Writes bullet naming no provenance tag is reported', () => {
  const body = extractContract(VALID.replace('an `interpretation` artifact', 'a thing'));
  assert.ok(validateContract(body).some((p) => /names no provenance tag/.test(p)));
});

test('every documented provenance tag is accepted', () => {
  for (const tag of PROVENANCE_TAGS) {
    const body = extractContract(VALID.replace('`interpretation`', '`' + tag + '`'));
    assert.deepEqual(validateContract(body), [], 'tag: ' + tag);
  }
});

test('naming two provenance tags on one write is reported, not tolerated', () => {
  // Two tags means the skill has not decided whether it records evidence or a
  // conclusion. That is a design defect, so it fails rather than passing on the first match.
  const body = extractContract(VALID.replace('an `interpretation` artifact', 'an `observation` and `decision` artifact'));
  assert.ok(validateContract(body).some((p) => /more than one provenance tag/.test(p)));
});

test('a missing Posture bullet is reported', () => {
  const body = extractContract(VALID.replace(/- \*\*Posture:\*\*.*\n/, ''));
  assert.ok(validateContract(body).some((p) => /Posture/.test(p)));
});

test('a Posture bullet that omits the auto-append opt-in is reported', () => {
  const body = extractContract(VALID.replace('unless `memory_auto_append: true`.', 'always.'));
  assert.ok(validateContract(body).some((p) => /memory_auto_append/.test(p)));
});

test('a contract that never names the state file is reported', () => {
  // The opt-in posture is only real if it is visible where the agent reads it.
  const body = extractContract(VALID.replace('`.claude/pm-skills.local.md`', 'the local config'));
  assert.ok(validateContract(body).some((p) => /point of use/.test(p)));
});

test('a contract can legitimately read nothing and still pass', () => {
  // A pure writer (produces context for later skills, needs none itself) is valid.
  const body = extractContract(VALID.replace('`phase`, `active_initiative`', 'nothing'));
  assert.deepEqual(validateContract(body), []);
});

test('a pure reader that writes nothing passes without naming a tag', () => {
  // Two meeting-family skills consume durable context and produce nothing durable,
  // because that family already chains its own artifacts by filename. Requiring a
  // write would manufacture a fake provenance tag.
  const body = extractContract(VALID.replace('the synthesis as an `interpretation` artifact', 'nothing'));
  assert.deepEqual(validateContract(body), []);
});

test('a write that is not `nothing` still must name a tag', () => {
  // The escape hatch is the literal word, not a way to skip the tag rule.
  const body = extractContract(VALID.replace('the synthesis as an `interpretation` artifact', 'the recap document'));
  assert.ok(validateContract(body).some((p) => /names no provenance tag/.test(p)));
});
