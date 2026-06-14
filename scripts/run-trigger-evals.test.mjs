// scripts/run-trigger-evals.test.mjs - detection + aggregation + report on canned
// transcripts only (no API calls; see the harness --probe mode for live shape checks).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseEvents, skillFired, aggregate, renderReport, extractUsage, BATCHES, rateLimitBlocked, mapPool, apiError, classifyRun } from './run-trigger-evals.mjs';
import { ROSTER } from './check-trigger-fixtures.mjs';

test('parseEvents reads stream-json lines and ignores noise', () => {
  const out = 'starting up\n{"type":"system","subtype":"init"}\n{"type":"assistant","message":{"content":[{"type":"tool_use","name":"Skill","input":{"skill":"deliver-prd"}}]}}\nnot json\n';
  const events = parseEvents(out);
  assert.equal(events.length, 2);
});

test('skillFired detects a nested Skill tool_use for the target skill only', () => {
  const events = parseEvents('{"type":"assistant","message":{"content":[{"type":"tool_use","name":"Skill","input":{"skill":"deliver-prd","args":"checkout flow"}}]}}');
  assert.equal(skillFired(events, 'deliver-prd'), true);
  assert.equal(skillFired(events, 'deliver-user-stories'), false);
});

test('skillFired tolerates casing variants of the tool name and other tools', () => {
  const events = parseEvents('{"content":[{"type":"tool_use","name":"skill","input":{"command":"deliver-prd"}},{"type":"tool_use","name":"Read","input":{"file_path":"deliver-user-stories"}}]}');
  assert.equal(skillFired(events, 'deliver-prd'), true);
  // a non-Skill tool mentioning the name must NOT count
  assert.equal(skillFired(events, 'deliver-user-stories'), false);
});

test('aggregate computes split pass rates', () => {
  const agg = aggregate([
    { split: 'train', pass: true }, { split: 'train', pass: false },
    { split: 'validation', pass: true }, { split: 'validation', pass: true },
  ]);
  assert.equal(agg.trainRate, 0.5);
  assert.equal(agg.validationRate, 1);
});

test('renderReport lists failures and collision false-fires', () => {
  const report = renderReport([{
    skill: 'deliver-prd',
    results: [
      { q: 'good', expect: 'trigger', split: 'train', fired: 3, pass: true },
      { q: 'missed ask', expect: 'trigger', split: 'validation', fired: 0, pass: false },
    ],
    agg: aggregate([{ split: 'train', pass: true }, { split: 'validation', pass: false }]),
    falseFires: [{ q: 'story ask', partner: 'deliver-user-stories' }],
  }]);
  assert.ok(report.includes('| deliver-prd | 100% | 0% | 1 |'));
  assert.ok(report.includes('expected trigger, fired 0x: "missed ask"'));
  assert.ok(report.includes('COLLISION false-fire on deliver-user-stories'));
});

test('extractUsage reads the result event usage + cost', () => {
  const out = '{"type":"assistant","message":{"content":[{"type":"text","text":"hi"}]}}\n{"type":"result","subtype":"success","usage":{"input_tokens":120,"output_tokens":40,"cache_read_input_tokens":24000},"total_cost_usd":0.012}';
  const u = extractUsage(parseEvents(out));
  assert.equal(u.input_tokens, 120);
  assert.equal(u.cache_read_input_tokens, 24000);
  assert.equal(u.total_cost_usd, 0.012);
});

test('extractUsage returns null when no usage block is present', () => {
  assert.equal(extractUsage(parseEvents('{"type":"system","subtype":"init"}')), null);
});

test('apiError catches a failed result event (e.g. credit exhausted), passes a success', () => {
  const bad = parseEvents('{"type":"result","subtype":"success","is_error":true,"api_error_status":400,"result":"Credit balance is too low"}');
  assert.equal(apiError(bad), 'Credit balance is too low');
  const ok = parseEvents('{"type":"result","subtype":"success","is_error":false,"result":"done"}');
  assert.equal(apiError(ok), null);
});

test('classifyRun: success / transient-retry / hard-abort', () => {
  assert.equal(classifyRun(parseEvents('{"type":"result","is_error":false,"result":"ok"}')), null);
  // transient server throttle -> retry
  assert.deepEqual(
    classifyRun(parseEvents('{"type":"result","is_error":true,"result":"Server is temporarily limiting requests · Rate limited"}')),
    { retry: 'Server is temporarily limiting requests · Rate limited' },
  );
  // credit / usage cap -> hard abort
  assert.ok(classifyRun(parseEvents('{"type":"result","is_error":true,"result":"Credit balance is too low"}')).hard);
  assert.ok(classifyRun(parseEvents('{"type":"rate_limit_event","rate_limit_info":{"status":"rejected"}}')).hard);
});

test('apiError surfaces error_max_turns from subtype/errors when result is absent', () => {
  const e = apiError(parseEvents('{"type":"result","subtype":"error_max_turns","is_error":true,"errors":["Reached maximum number of turns (1)"]}'));
  assert.ok(/maximum number of turns/i.test(e), `got: ${e}`);
});

test('classifyRun: error_max_turns is a HARD stop, not a retry (the M-31 misdiagnosis)', () => {
  const c = classifyRun(parseEvents('{"type":"result","subtype":"error_max_turns","is_error":true,"errors":["Reached maximum number of turns (1)"]}'));
  assert.ok(c.hard, 'must be hard, not retry');
  assert.ok(!('retry' in c), 'must not be classified retry');
  assert.ok(/max.?turns/i.test(c.hard));
});

test('mapPool preserves order and bounds concurrency', async () => {
  let active = 0; let maxActive = 0;
  const out = await mapPool([1, 2, 3, 4, 5, 6, 7], 3, async (x) => {
    active += 1; maxActive = Math.max(maxActive, active);
    await new Promise((r) => setTimeout(r, 5));
    active -= 1;
    return x * 10;
  });
  assert.deepEqual(out, [10, 20, 30, 40, 50, 60, 70]);
  assert.ok(maxActive <= 3, `concurrency capped (saw ${maxActive})`);
});

test('rateLimitBlocked flags a non-allowed window, ignores allowed', () => {
  const allowed = parseEvents('{"type":"rate_limit_event","rate_limit_info":{"status":"allowed","rateLimitType":"five_hour"}}');
  assert.equal(rateLimitBlocked(allowed), null);
  const blocked = parseEvents('{"type":"rate_limit_event","rate_limit_info":{"status":"rejected","rateLimitType":"five_hour"}}');
  assert.equal(rateLimitBlocked(blocked), 'rejected');
  assert.equal(rateLimitBlocked(parseEvents('{"type":"system"}')), null);
});

test('BATCHES partition the full 29-skill roster exactly once', () => {
  const flat = Object.values(BATCHES).flat();
  assert.equal(flat.length, ROSTER.length, 'batch skill count == roster size');
  assert.equal(new Set(flat).size, flat.length, 'no skill appears in two batches');
  assert.deepEqual([...flat].sort(), [...ROSTER].sort(), 'batches cover exactly the roster');
});

test('renderReport shows none when everything passes', () => {
  const report = renderReport([{
    skill: 'x', results: [{ q: 'a', expect: 'trigger', split: 'train', fired: 3, pass: true }],
    agg: aggregate([{ split: 'train', pass: true }]), falseFires: [],
  }]);
  assert.ok(report.includes('- none'));
});
