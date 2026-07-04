// Tests for scripts/run-router-evals.mjs - pure functions + injected-dep network logic.
// No API calls: route() is exercised with a fake fetchImpl, majority() with a fake routeFn.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePick, scorePass, aggregateSkill, diffBaseline, missingBaselineRows, majority, route, CALIBRATION, ROSTER } from './run-router-evals.mjs';

const NAMES = ['deliver-prd', 'deliver-edge-cases', 'deliver-acceptance-criteria', 'develop-spike-summary'];

test('parsePick: exact, contained, none, junk, longest-match', () => {
  assert.equal(parsePick('deliver-prd', NAMES), 'deliver-prd');
  assert.equal(parsePick('  Deliver-PRD.', NAMES), 'deliver-prd');
  assert.equal(parsePick('none', NAMES), 'none');
  assert.equal(parsePick('NONE', NAMES), 'none');
  assert.equal(parsePick('I think this is deliver-edge-cases for sure', NAMES), 'deliver-edge-cases');
  assert.equal(parsePick('totally unrelated text', NAMES), 'none');
  assert.equal(parsePick('', NAMES), 'none');
  // longest-match wins when names are substrings of each other
  assert.equal(parsePick('deliver-acceptance-criteria', ['deliver', 'deliver-acceptance-criteria']), 'deliver-acceptance-criteria');
});

test('scorePass: trigger vs no-trigger semantics', () => {
  assert.equal(scorePass('deliver-prd', 'deliver-prd', 'trigger'), true);
  assert.equal(scorePass('none', 'deliver-prd', 'trigger'), false);
  assert.equal(scorePass('deliver-edge-cases', 'deliver-prd', 'no-trigger'), true); // did not pick the skill
  assert.equal(scorePass('deliver-prd', 'deliver-prd', 'no-trigger'), false); // false-fire
});

test('aggregateSkill: recall/precision split math + misses/falseFires', () => {
  const results = [
    { expect: 'trigger', split: 'validation', pass: true, pick: 'x' },
    { expect: 'trigger', split: 'validation', pass: false, pick: 'utility-pm-critic', q: 'm' },
    { expect: 'trigger', split: 'train', pass: true, pick: 'x' },
    { expect: 'no-trigger', split: 'validation', pass: true, pick: 'none' },
    { expect: 'no-trigger', split: 'train', pass: false, pick: 'x', q: 'f' },
  ];
  const a = aggregateSkill('x', results);
  assert.equal(a.valRecall, 50); // 1 of 2 validation triggers passed
  assert.equal(a.valPrec, 100); // 1 of 1 validation no-trigger passed
  assert.equal(a.allRecall, 67); // 2 of 3 triggers
  assert.equal(a.allPrec, 50); // 1 of 2 no-trigger
  assert.equal(a.misses.length, 1);
  assert.equal(a.falseFires.length, 1);
});

test('aggregateSkill: null rates when a split is empty', () => {
  const a = aggregateSkill('y', [{ expect: 'trigger', split: 'train', pass: true }]);
  assert.equal(a.valRecall, null);
  assert.equal(a.allRecall, 100);
});

test('diffBaseline: flags recall and precision drops only', () => {
  const base = [{ skill: 'a', valRecall: 100, valPrec: 100 }, { skill: 'b', valRecall: 75, valPrec: 100 }];
  const now = [{ skill: 'a', valRecall: 75, valPrec: 100 }, { skill: 'b', valRecall: 75, valPrec: 75 }];
  const regs = diffBaseline(now, base);
  assert.equal(regs.length, 2);
  assert.ok(regs.some((r) => r.skill === 'a' && r.kind === 'recall' && r.was === 100 && r.now === 75));
  assert.ok(regs.some((r) => r.skill === 'b' && r.kind === 'precision'));
});

test('diffBaseline: no regression when equal or improved', () => {
  const base = [{ skill: 'a', valRecall: 75, valPrec: 100 }];
  const now = [{ skill: 'a', valRecall: 100, valPrec: 100 }];
  assert.equal(diffBaseline(now, base).length, 0);
});

test('missingBaselineRows: a baseline skill absent from a partial run is flagged (fail closed)', () => {
  // The codex finding: a mid-roster hard stop drops skill b; diffBaseline alone would say "no regression".
  const base = [{ skill: 'a', valRecall: 100, valPrec: 100 }, { skill: 'b', valRecall: 90, valPrec: 100 }];
  const partial = [{ skill: 'a', valRecall: 100, valPrec: 100 }]; // b never evaluated
  assert.deepEqual(missingBaselineRows(partial, base), ['b']);
  assert.equal(diffBaseline(partial, base).length, 0); // proves diffBaseline alone misses it
});

test('missingBaselineRows: a deliberate --skills filter narrows the expected set', () => {
  const base = [{ skill: 'a' }, { skill: 'b' }];
  const rows = [{ skill: 'a' }];
  assert.deepEqual(missingBaselineRows(rows, base, ['a']), []); // b is out of scope, not missing
  assert.deepEqual(missingBaselineRows(rows, base, []), ['b']); // no filter: b is missing
});

test('missingBaselineRows: full coverage flags nothing', () => {
  const base = [{ skill: 'a' }, { skill: 'b' }];
  const rows = [{ skill: 'a' }, { skill: 'b' }];
  assert.deepEqual(missingBaselineRows(rows, base), []);
});

test('majority: returns the most frequent pick', async () => {
  const seq = ['deliver-prd', 'deliver-prd', 'none'];
  let i = 0;
  const fakeRoute = async () => ({ pick: seq[i++] });
  const r = await majority('q', 3, fakeRoute);
  assert.equal(r.pick, 'deliver-prd');
});

test('majority: propagates a hard error', async () => {
  const fakeRoute = async () => ({ pick: 'none', hard: 'Credit balance is too low' });
  const r = await majority('q', 3, fakeRoute);
  assert.equal(r.hard, 'Credit balance is too low');
});

test('route: retries a 429 then succeeds', async () => {
  let n = 0;
  const fetchImpl = async () => {
    n++;
    if (n === 1) return { status: 429, json: async () => ({}) };
    return { status: 200, json: async () => ({ content: [{ text: 'deliver-prd' }], usage: { input_tokens: 1 } }) };
  };
  const usage = { in: 0, out: 0, cw: 0, cr: 0, calls: 0, fails: 0 };
  const r = await route('sys', NAMES, 'q', { key: 'k', model: 'm', fetchImpl, sleep: async () => {}, usage });
  assert.equal(r.pick, 'deliver-prd');
  assert.equal(n, 2);
  assert.equal(usage.calls, 1);
});

test('route: hard-stops on a credit error (no retry storm)', async () => {
  let n = 0;
  const fetchImpl = async () => { n++; return { status: 200, json: async () => ({ error: { message: 'Credit balance is too low' } }) }; };
  const r = await route('sys', NAMES, 'q', { key: 'k', model: 'm', fetchImpl, sleep: async () => {}, usage: null });
  assert.ok(r.hard && /credit/i.test(r.hard));
  assert.equal(n, 1); // did not retry a hard error
});

test('CALIBRATION set is well-formed (has none-cases and known answers)', () => {
  assert.ok(CALIBRATION.length >= 4);
  assert.ok(CALIBRATION.some((c) => c.expect === 'none'));
  assert.ok(CALIBRATION.every((c) => typeof c.q === 'string' && typeof c.expect === 'string'));
});

test('the eval scope is the trigger-eval roster data file (WS-T10)', () => {
  // run-router-evals scopes its fixtures to ROSTER, re-exported from
  // trigger-eval-roster.yaml. 31 = every registered fixture set on disk.
  assert.equal(ROSTER.length, 31);
  assert.equal(new Set(ROSTER).size, 31);
  assert.ok(ROSTER.every((s) => typeof s === 'string' && /^[a-z0-9-]+$/.test(s)));
});
