// scripts/check-trigger-fixtures.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { validateFixture, missingRosterFixtures, partnersOf, ROSTER, COLLISION_PAIRS } from './check-trigger-fixtures.mjs';

const KNOWN = new Set(['deliver-prd', 'deliver-user-stories', 'deliver-acceptance-criteria', 'deliver-edge-cases']);
const opts = (over = {}) => ({ dirName: 'deliver-prd', skillExists: (n) => KNOWN.has(n), collisionPartners: [], ...over });

/** A valid 20-query fixture: 10 trigger (6 train / 4 validation), 10 no-trigger
 *  (6/4), with `nearMisses` of the no-trigger queries aimed at `target`. */
function goodFixture(skill = 'deliver-prd', nearMisses = 0, target = 'deliver-user-stories') {
  const queries = [];
  for (let i = 0; i < 10; i++) {
    queries.push({ q: `should trigger ${i}`, expect: 'trigger', split: i < 6 ? 'train' : 'validation' });
  }
  for (let i = 0; i < 10; i++) {
    const q = { q: `should not trigger ${i}`, expect: 'no-trigger', split: i < 6 ? 'train' : 'validation' };
    if (i < nearMisses) q.near_miss_of = target;
    queries.push(q);
  }
  return { schema: 1, skill, runs_per_query: 3, trigger_threshold: 0.5, queries };
}

test('a well-formed fixture passes', () => {
  assert.deepEqual(validateFixture(goodFixture(), opts()), []);
});

test('schema, constants, and directory mismatch are each flagged', () => {
  const fx = { ...goodFixture(), schema: 2, runs_per_query: 5, trigger_threshold: 0.9, skill: 'other-skill' };
  const f = validateFixture(fx, opts());
  assert.equal(f.length, 4);
});

test('duplicate and empty queries are flagged', () => {
  const fx = goodFixture();
  fx.queries[1].q = fx.queries[0].q;
  fx.queries[2].q = '  ';
  const f = validateFixture(fx, opts());
  assert.ok(f.some((m) => m.includes('duplicate query')));
  assert.ok(f.some((m) => m.includes('non-empty string')));
});

test('bad enums are flagged', () => {
  const fx = goodFixture();
  fx.queries[0].expect = 'maybe';
  fx.queries[1].split = 'test';
  const f = validateFixture(fx, opts());
  assert.ok(f.some((m) => m.includes('expect must be')));
  assert.ok(f.some((m) => m.includes('split must be')));
});

test('composition minimums: under 16 total and under 8 per class', () => {
  const fx = goodFixture();
  fx.queries = fx.queries.slice(0, 12); // 10 trigger, 2 no-trigger
  const f = validateFixture(fx, opts());
  assert.ok(f.some((m) => m.includes('at least 16 queries')));
  assert.ok(f.some((m) => m.includes('at least 8 "no-trigger"')));
});

test('a 60/40 split outside tolerance is flagged', () => {
  const fx = goodFixture();
  for (const q of fx.queries) if (q.expect === 'trigger') q.split = 'train'; // 10/0
  const f = validateFixture(fx, opts());
  assert.ok(f.some((m) => m.includes('"trigger" split is 10 train / 0 validation')));
});

test('near_miss_of must name an existing skill and sit on a no-trigger query', () => {
  const fx = goodFixture('deliver-prd', 1);
  fx.queries.find((q) => q.expect === 'trigger').near_miss_of = 'deliver-user-stories';
  fx.queries.find((q) => q.near_miss_of && q.expect === 'no-trigger').near_miss_of = 'ghost-skill';
  const f = validateFixture(fx, opts());
  assert.ok(f.some((m) => m.includes('only valid on a no-trigger query')));
  assert.ok(f.some((m) => m.includes('"ghost-skill" is not an existing skill')));
});

test('collision-pair skills need 2+ near-misses including a declared partner', () => {
  const partners = ['deliver-acceptance-criteria'];
  // No near-misses at all:
  let f = validateFixture(goodFixture('deliver-user-stories'), opts({ dirName: 'deliver-user-stories', collisionPartners: partners }));
  assert.ok(f.some((m) => m.includes('at least 2 near-miss negatives')));
  // Two near-misses, but aimed at a non-partner:
  f = validateFixture(goodFixture('deliver-user-stories', 2, 'deliver-edge-cases'), opts({ dirName: 'deliver-user-stories', collisionPartners: partners }));
  assert.ok(f.some((m) => m.includes('include no declared collision partner')));
  // Two near-misses at the partner: clean.
  f = validateFixture(goodFixture('deliver-user-stories', 2, 'deliver-acceptance-criteria'), opts({ dirName: 'deliver-user-stories', collisionPartners: partners }));
  assert.deepEqual(f, []);
});

test('roster completeness reports exactly the missing names', () => {
  const have = new Set(ROSTER.slice(1));
  assert.deepEqual(missingRosterFixtures(have), [ROSTER[0]]);
  assert.deepEqual(missingRosterFixtures(new Set(ROSTER)), []);
  assert.deepEqual(missingRosterFixtures(new Set()), ROSTER); // none present -> every roster skill missing
});

test('roster and pairs are internally consistent', () => {
  assert.equal(ROSTER.length, 29);
  assert.equal(new Set(ROSTER).size, 29);
  for (const [a, b] of COLLISION_PAIRS) {
    assert.ok(ROSTER.includes(a), `${a} in roster`);
    assert.ok(ROSTER.includes(b), `${b} in roster`);
  }
  assert.deepEqual(partnersOf('deliver-acceptance-criteria').sort(), ['deliver-edge-cases', 'deliver-user-stories']);
  assert.deepEqual(partnersOf('deliver-prd'), []);
});

// B-4 asset-presence guard. The trigger-fixture step is ENFORCING in validation.yml,
// so the on-disk corpus must satisfy roster completeness at all times. This test runs
// in the enforcing `node --test` step (ahead of the live validator) and fails the
// moment a roster skill loses its fixture - an earlier, clearer signal than the
// script's own scan. Reads only committed repo content: hermetic, and cross-OS via the
// same backslash normalization the main script uses.
test('every roster skill has a trigger-fixtures.json on disk (enforcing-gate guard)', () => {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const present = new Set(
    globSync('skills/*/evals/trigger-fixtures.json', { cwd: repo })
      .map((f) => f.replace(/\\/g, '/').match(/skills\/([^/]+)\/evals\//)[1]),
  );
  assert.deepEqual(missingRosterFixtures(present), []);
});
