// Unit + integration tests for validate-skill-family-registration.mjs - the single-source
// Node port of the retired bash/pwsh family-registration pair (v2.31.0 WS-Z4). The pure
// helpers (parseRegistry, validateFamilies) are unit-tested directly; the end-to-end
// verdict is locked against the committed family-registration fixture mini-repo, which was
// proven identical to both retired shells before they were deleted.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseRegistry, validateFamilies, runCheck } from './validate-skill-family-registration.mjs';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(SCRIPTS, 'fixtures', 'family-registration', 'repo');
const NO_REGISTRY = join(SCRIPTS, 'fixtures', 'shell-parity', 'repo'); // has no _registry.yaml
const CONTRACT = 'docs/reference/skill-families/demo-family-contract.md';
const fam = (members, contract = CONTRACT) => [{ name: 'demo-family', contract, members }];

// --- parseRegistry ---

test('parseRegistry extracts families in declaration order with contract + members', () => {
  const text = 'families:\n  a:\n    contract: c/a.md\n    members:\n      - m1\n      - m2\n  b:\n    contract: c/b.md\n    members:\n      - m3\n';
  const fams = parseRegistry(text);
  assert.deepEqual(fams.map((f) => f.name), ['a', 'b']);
  assert.equal(fams[0].contract, 'c/a.md');
  assert.deepEqual(fams[0].members, ['m1', 'm2']);
  assert.deepEqual(fams[1].members, ['m3']);
});

test('parseRegistry returns [] for an empty or families-less document', () => {
  assert.deepEqual(parseRegistry(''), []);
  assert.deepEqual(parseRegistry('other: value\n'), []);
});

// --- validateFamilies against the fixture tree (pure over fs) ---

test('validateFamilies passes a present member that references the contract', () => {
  assert.equal(validateFamilies(FIXTURE, fam(['demo-present'])).code, 0);
});

test('validateFamilies fails a member with no directory', () => {
  const { code, lines } = validateFamilies(FIXTURE, fam(['demo-missing']));
  assert.equal(code, 1);
  assert.ok(lines.some((l) => /member 'demo-missing' has no directory/.test(l)));
});

test('validateFamilies fails a member whose SKILL.md does not reference the contract', () => {
  const { code, lines } = validateFamilies(FIXTURE, fam(['demo-noref']));
  assert.equal(code, 1);
  assert.ok(lines.some((l) => /demo-noref' SKILL.md does not reference/.test(l)));
});

test('validateFamilies fails a family whose contract file is absent', () => {
  const { code, lines } = validateFamilies(FIXTURE, fam(['demo-present'], 'docs/reference/skill-families/nope.md'));
  assert.equal(code, 1);
  assert.ok(lines.some((l) => /contract file does not exist/.test(l)));
});

test('validateFamilies fails a family with no contract declared and one with no members', () => {
  assert.equal(validateFamilies(FIXTURE, fam(['demo-present'], '')).code, 1);
  assert.equal(validateFamilies(FIXTURE, fam([])).code, 1);
});

// --- runCheck end-to-end (the retired-shell parity contract) ---

test('runCheck on the fixture reports the contract + one PASS + two FAIL members, exit 1', () => {
  const { code, lines } = runCheck(FIXTURE);
  assert.equal(code, 1);
  assert.ok(lines.some((l) => /PASS: contract present at docs\/reference\/skill-families\/demo-family-contract\.md/.test(l)));
  assert.ok(lines.some((l) => /PASS: member 'demo-present' references contract/.test(l)));
  assert.ok(lines.some((l) => /FAIL: member 'demo-noref' SKILL\.md does not reference/.test(l)));
  assert.ok(lines.some((l) => /FAIL: member 'demo-missing' has no directory/.test(l)));
});

test('runCheck exits 1 with "registry not found" when the registry is absent', () => {
  const { code, lines } = runCheck(NO_REGISTRY);
  assert.equal(code, 1);
  assert.ok(lines.some((l) => /registry not found/.test(l)));
});
