// scripts/check-sample-no-fabricated-metrics.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fabricatedMetrics, TRANCHES, trancheFor } from './check-sample-no-fabricated-metrics.mjs';

test('number absent from input and not [fictional] is flagged', () => {
  assert.ok(fabricatedMetrics('Revenue grew 47% last quarter.', 'Revenue grew last quarter.').includes('47%'));
});

test('number present in input passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% last quarter.', 'Prompt: we saw 47% growth'), []);
});

test('[fictional]-marked number passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% [fictional].', 'no number here'), []);
});

test('a skill EXAMPLE.md is in the examples tranche, on either path separator', () => {
  assert.equal(trancheFor('skills/deliver-prd/references/EXAMPLE.md'), 'examples');
  assert.equal(trancheFor('E:\\repo\\skills\\deliver-prd\\references\\EXAMPLE.md'), 'examples');
});

test('a library sample and a skill TEMPLATE.md are not in the examples tranche', () => {
  assert.equal(trancheFor('library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_x.md'), 'samples');
  assert.notEqual(trancheFor('skills/deliver-prd/references/TEMPLATE.md'), 'examples');
});

test('an EXAMPLE.md has no input, even when it contains Scenario and Output headings', () => {
  const text = '## Scenario\nChurn is 12%.\n\n## Output\nChurn is 12%.\n';
  assert.equal(TRANCHES.examples.input(text), '');
  assert.ok(fabricatedMetrics(text, TRANCHES.examples.input(text)).includes('12%'));
});

test('a library sample takes its input from the region before ## Output', () => {
  const text = '## Scenario\nChurn is 12%.\n\n## Output\nChurn is 12%.\n';
  assert.deepEqual(fabricatedMetrics(text, TRANCHES.samples.input(text)), []);
});
