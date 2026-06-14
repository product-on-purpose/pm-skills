// scripts/check-output-eval-assets.test.mjs - unit tests for the B-7 output-eval asset gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, scenarioBody, scenarioFindings } from './check-output-eval-assets.mjs';

const GOOD = `---
scenario: file-upload
skill: deliver-edge-cases
family: specification
created: 2026-06-14
---

# Scenario: profile-photo upload

A brief with more than one hundred characters of body so the thin-body check passes comfortably here.
`;

const ctx = (skillDir, families = ['specification']) => ({
  skillDir,
  rubricExists: (f) => families.includes(f),
});

test('parseFrontmatter reads flat key/value, returns null when absent', () => {
  assert.deepEqual(parseFrontmatter(GOOD), {
    scenario: 'file-upload', skill: 'deliver-edge-cases', family: 'specification', created: '2026-06-14',
  });
  assert.equal(parseFrontmatter('no frontmatter here'), null);
});

test('scenarioBody strips the frontmatter block', () => {
  assert.ok(scenarioBody(GOOD).startsWith('# Scenario'));
});

test('a well-formed scenario with a real rubric yields no findings', () => {
  assert.deepEqual(scenarioFindings('p.md', GOOD, ctx('deliver-edge-cases')), []);
});

test('flags a skill/directory mismatch', () => {
  const f = scenarioFindings('p.md', GOOD, ctx('deliver-prd'));
  assert.equal(f.length, 1);
  assert.match(f[0], /does not match its directory/);
});

test('flags a family with no rubric', () => {
  const f = scenarioFindings('p.md', GOOD, ctx('deliver-edge-cases', [])); // no families exist
  assert.equal(f.length, 1);
  assert.match(f[0], /has no rubric/);
});

test('flags missing required frontmatter keys', () => {
  const md = `---\nscenario: x\n---\n\n` + 'body '.repeat(40);
  const f = scenarioFindings('p.md', md, ctx('whatever'));
  assert.ok(f.some((x) => /missing 'skill'/.test(x)));
  assert.ok(f.some((x) => /missing 'family'/.test(x)));
});

test('flags malformed frontmatter and a thin body', () => {
  assert.deepEqual(scenarioFindings('p.md', 'just text, no frontmatter', ctx('x')),
    ['p.md: missing or malformed frontmatter']);
  const thin = `---\nscenario: a\nskill: deliver-edge-cases\nfamily: specification\n---\n\nshort`;
  const f = scenarioFindings('p.md', thin, ctx('deliver-edge-cases'));
  assert.ok(f.some((x) => /too thin/.test(x)));
});
