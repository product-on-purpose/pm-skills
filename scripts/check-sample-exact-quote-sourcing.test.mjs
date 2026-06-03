// scripts/check-sample-exact-quote-sourcing.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unsourcedQuotes } from './check-sample-exact-quote-sourcing.mjs';

const input = 'User said: "the checkout is too slow" during the call.';

test('exact substring quote passes', () => {
  assert.deepEqual(unsourcedQuotes('Source: "the checkout is too slow"', input), []);
});

test('non-substring quote is flagged', () => {
  assert.deepEqual(unsourcedQuotes('Source: "checkout was painfully slow"', input), ['checkout was painfully slow']);
});
