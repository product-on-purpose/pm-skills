// scripts/check-reciprocal-boundary-pointers.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { whenNotToUseSection, pointersIn, reciprocityFindings } from './check-reciprocal-boundary-pointers.mjs';

test('whenNotToUseSection extracts the section body up to the next heading', () => {
  const md = '# Skill\n\n## When NOT to Use\n\n- Use `deliver-prd` instead\n\n## Instructions\n\nbody';
  const s = whenNotToUseSection(md);
  assert.ok(s.includes('deliver-prd'));
  assert.ok(!s.includes('Instructions'));
});

test('whenNotToUseSection returns empty when the section is absent', () => {
  assert.equal(whenNotToUseSection('# Skill\n\n## Instructions\n\nbody'), '');
});

test('whenNotToUseSection reads a section that runs to end of file', () => {
  const s = whenNotToUseSection('## When NOT to Use\n\n- Use `measure-okr-grader`');
  assert.ok(s.includes('measure-okr-grader'));
});

test('pointersIn finds prefixed backtick skill names, deduped, ignoring non-skill backticks', () => {
  const s = '- Use `deliver-prd` not `deliver-prd`\n- or `measure-okr-grader`\n- code `someVar` and `npm install`';
  assert.deepEqual([...pointersIn(s)].sort(), ['deliver-prd', 'measure-okr-grader']);
});

test('reciprocityFindings flags a one-directional pointer', () => {
  const ptrs = { 'a-one': new Set(['b-two']), 'b-two': new Set() }; // b does not point back
  const f = reciprocityFindings([['a-one', 'b-two']], ptrs);
  assert.equal(f.length, 1);
  assert.ok(f[0].includes('b-two') && f[0].includes('a-one'));
});

test('reciprocityFindings passes when both directions point', () => {
  const ptrs = { 'a-one': new Set(['b-two']), 'b-two': new Set(['a-one']) };
  assert.deepEqual(reciprocityFindings([['a-one', 'b-two']], ptrs), []);
});

test('reciprocityFindings flags both directions when neither points', () => {
  const ptrs = { 'a-one': new Set(), 'b-two': new Set() };
  assert.equal(reciprocityFindings([['a-one', 'b-two']], ptrs).length, 2);
});

test('reciprocityFindings treats a skill missing from the map as pointing to nothing', () => {
  const f = reciprocityFindings([['a-one', 'b-two']], {});
  assert.equal(f.length, 2);
});
