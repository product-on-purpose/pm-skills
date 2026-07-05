// scripts/check-pr-title.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintTitle, TYPES } from './check-pr-title.mjs';

test('accepts a plain fix with scope', () => {
  const r = lintTitle("fix(scripts): correct the off-by-one in check-count-consistency's phase tally");
  assert.equal(r.ok, true);
});

test('accepts a plain feat with scope', () => {
  assert.equal(lintTitle('feat(skills): add foundation-org-overlay-pack skill').ok, true);
});

test('accepts a breaking-change feat with the ! marker', () => {
  assert.equal(lintTitle('feat(release)!: drop the legacy in-repo marketplace path').ok, true);
});

test('accepts docs and chore titles that carry no version bump', () => {
  assert.equal(lintTitle('docs(readme): slim the front door under 400 lines').ok, true);
  assert.equal(lintTitle('chore(deps): bump astro to 6.5.0').ok, true);
});

test('accepts the house record type used for eval-run logging', () => {
  const r = lintTitle('record(M-31): pause - sustained server throttling; remaining 13 skills deferred');
  assert.equal(r.ok, true);
});

test('accepts real repo scope shapes: version scopes and a dotted range token', () => {
  assert.equal(lintTitle('feat(C-1..C-6): creator integration').ok, true);
  assert.equal(lintTitle('fix(v2.27.1): patch').ok, true);
  assert.equal(lintTitle('docs(v2.28.0): stakeholder-briefings release plan + spec').ok, true);
});

test('accepts a type with no scope at all', () => {
  assert.equal(lintTitle('chore: process issue drafts - create issues and archive files').ok, true);
});

test('rejects a real historical title with no recognized type prefix', () => {
  // The exact commit that shipped foundation-build-risk-review, named in this
  // script's own header as the primer's real "silently ignored" example.
  const r = lintTitle(
    'v2.29.0: foundation-build-risk-review (pre-build gate) + pm-skill-router (key-free probe) (#212)'
  );
  assert.equal(r.ok, false);
});

test('rejects an unknown type', () => {
  assert.equal(lintTitle('feature(x): something new').ok, false);
});

test('rejects wrong case on an otherwise-valid type', () => {
  assert.equal(lintTitle('Fix: bug').ok, false);
});

test('rejects a missing colon', () => {
  assert.equal(lintTitle('fix scripts something').ok, false);
});

test('rejects an empty description after the colon', () => {
  assert.equal(lintTitle('feat:').ok, false);
  assert.equal(lintTitle('feat: ').ok, false);
  assert.equal(lintTitle('feat:   ').ok, false);
});

test('rejects an empty or whitespace-only title', () => {
  assert.equal(lintTitle('').ok, false);
  assert.equal(lintTitle('   ').ok, false);
  assert.equal(lintTitle(undefined).ok, false);
});

test('rejects a malformed scope (disallowed characters)', () => {
  assert.equal(lintTitle('feat(a, b): something with a bad scope').ok, false);
});

test('TYPES stays in sync with the allowed-type list surfaced in error messages', () => {
  assert.ok(TYPES.includes('feat') && TYPES.includes('fix') && TYPES.includes('record'));
});
