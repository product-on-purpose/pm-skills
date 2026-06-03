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

test('quoted guardrail_checks still enable the check', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), { guardrails: true, guardrail_checks: ['em-dash'] });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
});

test('malformed payload fails open (allow)', () => {
  assert.equal(evaluateGuardrail('not json', { guardrails: true }), null);
});
