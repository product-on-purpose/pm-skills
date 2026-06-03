// scripts/check-sample-exact-quote-sourcing.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unsourcedQuotes, inputRegion } from './check-sample-exact-quote-sourcing.mjs';

const input = '## Scenario\nUser said: "the checkout is too slow" during the call.\n## Output\n';

test('exact ledger quote (S1: "...") passes', () => {
  assert.deepEqual(unsourcedQuotes('S1: "the checkout is too slow" (origin: pasted prompt)', input), []);
});

test('non-substring ledger quote is flagged', () => {
  assert.deepEqual(unsourcedQuotes('S1: "checkout was painfully slow" (origin: pasted prompt)', input), ['checkout was painfully slow']);
});

test('a quote with nested double-quotes is captured whole', () => {
  const led = 'S3: "buyer asked about "sequences" which we lack" (origin: pasted prompt)';
  assert.deepEqual(unsourcedQuotes(led, 'buyer asked about "sequences" which we lack'), []);
});

test('**Source:** S-id references are NOT treated as quotes', () => {
  assert.deepEqual(unsourcedQuotes('**Source:** S2, S3.', input), []);
});

test('inputRegion returns "" when the Output section is absent (malformed -> reported)', () => {
  assert.equal(inputRegion('## Scenario\nstuff with no output section'), '');
});

test('inputRegion captures Scenario..Output and excludes Output', () => {
  const r = inputRegion('## Scenario\nABC prompt\n## Output\nXYZ ledger');
  assert.match(r, /ABC prompt/);
  assert.doesNotMatch(r, /XYZ ledger/);
});
