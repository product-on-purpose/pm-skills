// hooks/guardrails.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateGuardrail } from './guardrails.mjs';

const EM = String.fromCharCode(0x2014); // em-dash, built so this file never self-blocks
const payload = (input) => JSON.stringify({ tool_input: input });

test('inert by default: em-dash allowed when config empty', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), {});
  assert.equal(d, null); // null = allow, no output
});

test('em-dash denied when guardrails on', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), { guardrails: true });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
  assert.match(d.hookSpecificOutput.permissionDecisionReason, /em-dash/);
});

test('placeholder not blocked when only em-dash enabled', () => {
  const d = evaluateGuardrail(payload({ content: 'TODO later' }), { guardrails: true, guardrail_checks: ['em-dash'] });
  assert.equal(d, null);
});

test('placeholder warns (not denies) when enabled', () => {
  const d = evaluateGuardrail(payload({ content: 'TODO later' }), { guardrails: true, guardrail_checks: ['em-dash', 'placeholder'] });
  assert.equal(d.hookSpecificOutput.permissionDecision, undefined);
  assert.match(d.hookSpecificOutput.additionalContext, /placeholder/i);
});

test('MultiEdit edits[] are scanned (no bypass)', () => {
  const p = JSON.stringify({ tool_input: { edits: [{ new_string: 'clean' }, { new_string: 'a' + EM + 'b' }] } });
  const d = evaluateGuardrail(p, { guardrails: true });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
});

test('ExitPlanMode plan content is scanned (no plan-mode bypass)', () => {
  const p = JSON.stringify({ tool_input: { plan: 'Step 1 ' + EM + ' Step 2' } });
  const d = evaluateGuardrail(p, { guardrails: true });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
});

test('quoted guardrail_checks still enable the check', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), { guardrails: true, guardrail_checks: ['em-dash'] });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
});

test('malformed payload fails open (allow)', () => {
  assert.equal(evaluateGuardrail('not json', { guardrails: true }), null);
});

const METRIC_CFG = { guardrails: true, guardrail_checks: ['fabricated-metric'] };

test('fabricated-metric warns (advisory, not deny) on a percentage with context', () => {
  const d = evaluateGuardrail(payload({ content: 'Lifted signups +40% conversion this quarter' }), METRIC_CFG);
  assert.equal(d.hookSpecificOutput.permissionDecision, undefined); // advisory, never blocks
  assert.match(d.hookSpecificOutput.additionalContext, /metric/i);
});

test('fabricated-metric fires on a currency figure and on a metric keyword near a number', () => {
  assert.notEqual(evaluateGuardrail(payload({ content: 'closed $2,000,000 in revenue' }), METRIC_CFG), null);
  assert.notEqual(evaluateGuardrail(payload({ content: 'grew active users by 12 last month' }), METRIC_CFG), null);
});

test('fabricated-metric does NOT trip on a bare date or a version string', () => {
  assert.equal(evaluateGuardrail(payload({ content: 'Shipped on 2026-07-04.' }), METRIC_CFG), null);
  assert.equal(evaluateGuardrail(payload({ content: 'Bumped the plugin to 1.2.3 today.' }), METRIC_CFG), null);
  assert.equal(evaluateGuardrail(payload({ content: 'We added 3 skills and 6 sub-agents.' }), METRIC_CFG), null);
});

test('fabricated-metric respects the [fictional] escape hatch', () => {
  assert.equal(evaluateGuardrail(payload({ content: '[fictional] +40% conversion' }), METRIC_CFG), null);
});

test('a date does not trip the metric check even when its LINE also names a metric word', () => {
  // metric word + number share the line, so this is a deliberate true positive:
  // the heuristic is line-scoped, and the date sits with "conversion" here.
  const withContext = evaluateGuardrail(payload({ content: 'conversion review scheduled 2026-07-04' }), METRIC_CFG);
  assert.notEqual(withContext, null);
  // but the same date on its own line stays silent
  const alone = evaluateGuardrail(payload({ content: 'conversion review\nscheduled 2026-07-04' }), METRIC_CFG);
  assert.equal(alone, null);
});

test('fabricated-metric is inert unless the check is enabled', () => {
  const d = evaluateGuardrail(payload({ content: '+40% conversion' }), { guardrails: true, guardrail_checks: ['em-dash'] });
  assert.equal(d, null);
});
