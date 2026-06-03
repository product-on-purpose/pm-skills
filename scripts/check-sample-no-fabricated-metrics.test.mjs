// scripts/check-sample-no-fabricated-metrics.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fabricatedMetrics } from './check-sample-no-fabricated-metrics.mjs';

test('number absent from input and not [fictional] is flagged', () => {
  assert.ok(fabricatedMetrics('Revenue grew 47% last quarter.', 'Revenue grew last quarter.').includes('47%'));
});

test('number present in input passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% last quarter.', 'Prompt: we saw 47% growth'), []);
});

test('[fictional]-marked number passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% [fictional].', 'no number here'), []);
});
