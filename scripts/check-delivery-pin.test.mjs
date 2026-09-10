// scripts/check-delivery-pin.test.mjs - fixtures for C1, the delivery check.
//
// Every branch is proved without a network or a git repo, per the doc-currency program's
// meta-rule: "No check ships without a fixture proving it fires." The case that matters
// most is REGISTRY_STALE below, which reproduces the actual v2.33.0 delivery miss.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareDelivery, findEntry, resolveExpected } from './check-delivery-pin.mjs';

const TAG_SHA = '7a42570e6601b22e8492fb0f4c8d112eb2883d40';
const OLD_SHA = 'e8a641c3aa0b3c1d9e4f5a6b7c8d9e0f1a2b3c4d';

/** The registry as it should look once a re-pin has landed. */
const REGISTRY_CURRENT = {
  plugins: [
    { name: 'other-plugin', version: '1.0.0', source: { sha: 'deadbeef' } },
    { name: 'pm-skills', version: '2.33.0', source: { source: 'url', url: 'https://github.com/product-on-purpose/pm-skills.git', sha: TAG_SHA } },
  ],
};

/** The registry as it ACTUALLY looked for ~8 hours after v2.33.0 was tagged. */
const REGISTRY_STALE = {
  plugins: [
    { name: 'pm-skills', version: '2.32.0', source: { source: 'url', url: 'https://github.com/product-on-purpose/pm-skills.git', sha: OLD_SHA } },
  ],
};

test('FIRES on the real v2.33.0 delivery miss: registry still pinning the previous release', () => {
  const got = compareDelivery({ entry: findEntry(REGISTRY_STALE), expectedVersion: '2.33.0', expectedSha: TAG_SHA });
  assert.equal(got.status, 'mismatch');
  assert.equal(got.findings.length, 2, 'both the version label and the sha pin are wrong');
  assert.match(got.findings[0], /serves version 2\.32\.0, tag is v2\.33\.0/);
  assert.match(got.findings[1], /pins e8a641c3/);
});

test('passes once the registry serves the tagged version at the tagged commit', () => {
  const got = compareDelivery({ entry: findEntry(REGISTRY_CURRENT), expectedVersion: '2.33.0', expectedSha: TAG_SHA });
  assert.deepEqual(got, { status: 'match', findings: [] });
});

test('FIRES when the version label moved but the sha pin did not', () => {
  // The failure a version-only check would wave through: the registry advertises the new
  // release while still serving the old tree, so users get old code under a new number.
  const half = { plugins: [{ name: 'pm-skills', version: '2.33.0', source: { sha: OLD_SHA } }] };
  const got = compareDelivery({ entry: findEntry(half), expectedVersion: '2.33.0', expectedSha: TAG_SHA });
  assert.equal(got.status, 'mismatch');
  assert.equal(got.findings.length, 1);
  assert.match(got.findings[0], /registry pins e8a641c3/);
});

test('FIRES when the sha moved but the version label did not', () => {
  const half = { plugins: [{ name: 'pm-skills', version: '2.32.0', source: { sha: TAG_SHA } }] };
  const got = compareDelivery({ entry: findEntry(half), expectedVersion: '2.33.0', expectedSha: TAG_SHA });
  assert.equal(got.status, 'mismatch');
  assert.match(got.findings[0], /serves version 2\.32\.0/);
});

test('sha comparison is case-insensitive, so hex casing is not a false positive', () => {
  const upper = { plugins: [{ name: 'pm-skills', version: '2.33.0', source: { sha: TAG_SHA.toUpperCase() } }] };
  assert.equal(compareDelivery({ entry: findEntry(upper), expectedVersion: '2.33.0', expectedSha: TAG_SHA }).status, 'match');
});

test('an absent pm-skills entry is UNVERIFIED, never a pass', () => {
  const got = compareDelivery({ entry: findEntry({ plugins: [{ name: 'other', version: '1.0.0' }] }), expectedVersion: '2.33.0', expectedSha: TAG_SHA });
  assert.equal(got.status, 'unverified');
  assert.match(got.findings[0], /not found/);
});

test('findEntry tolerates a malformed or empty registry without throwing', () => {
  assert.equal(findEntry(null), null);
  assert.equal(findEntry({}), null);
  assert.equal(findEntry({ plugins: 'not-an-array' }), null);
  assert.equal(findEntry({ plugins: [null] }), null);
});

test('resolveExpected dereferences the tag for the version in plugin.json', () => {
  const got = resolveExpected({}, (args) => {
    assert.deepEqual(args, ['rev-parse', 'refs/tags/v2.33.0^{commit}']);
    return TAG_SHA;
  }, () => ({ version: '2.33.0' }));
  assert.deepEqual(got, { version: '2.33.0', sha: TAG_SHA });
});

test('resolveExpected reports an error rather than a sha when the tag is missing', () => {
  const got = resolveExpected({}, () => { throw new Error('fatal: bad revision'); }, () => ({ version: '9.9.9' }));
  assert.equal(got.sha, null);
  assert.match(got.error, /no local tag v9\.9\.9/);
});

test('an explicit --sha short-circuits git entirely', () => {
  const got = resolveExpected({ version: '1.2.3', sha: 'abc' }, () => { throw new Error('git must not run'); }, () => { throw new Error('plugin.json must not be read'); });
  assert.deepEqual(got, { version: '1.2.3', sha: 'abc' });
});
