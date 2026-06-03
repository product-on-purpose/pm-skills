// scripts/check-sample-no-placeholders.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPlaceholders } from './check-sample-no-placeholders.mjs';

test('flags bracket/angle placeholders', () => {
  const hits = findPlaceholders('Body with [TODO] and [Placeholder] and <...> here');
  assert.ok(hits.length >= 3);
});

test('does NOT flag the English word TODO in prose (even with a colon)', () => {
  assert.deepEqual(findPlaceholders('Merchants treat setup as a rolling TODO: a recurring pattern.'), []);
});

test('clean text yields no hits', () => {
  assert.deepEqual(findPlaceholders('A complete sentence with no placeholders.'), []);
});
