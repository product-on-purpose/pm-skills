// scripts/output-eval.workflow.test.mjs - regression guard for the model-arg plumbing in
// the M-33 output-eval harness (scripts/output-eval.workflow.mjs).
//
// Why a SOURCE-CONTRACT test and not an import test: output-eval.workflow.mjs is a
// Workflow-tool script, not a standalone node module. Its top-level body references
// runtime-only globals (`args`, `agent`, `parallel`, `phase`, `log`) and uses top-level
// `await`, so `await import()` throws a ReferenceError at the first `const a = args || {}`
// line before any helper is reachable, and the Workflow JS sandbox has no filesystem access
// to share a lib module. So this test instead:
//   (a) asserts the genModel/judgeModel plumbing is present at EVERY agent() call site
//       (skill arm + control arm carry GEN_OPTS; the judges carry JUDGE_OPTS), and
//   (b) EXECUTES the real GEN_OPTS / JUDGE_OPTS resolver expressions, extracted verbatim
//       from the source, to prove default-inherit (unset -> no model) vs. pin (set -> model).
// It does NOT exercise the generate/judge control flow (that is validated by live runs).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SRC = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'output-eval.workflow.mjs'),
  'utf8',
);

/** Extract the RHS of `const <name> = <expr>` and compile it into a callable f(a). */
function optsResolver(name) {
  const m = SRC.match(new RegExp('const ' + name + ' = ([^\\n]+)'));
  assert.ok(m, `${name} assignment not found in the harness source`);
  // eslint-disable-next-line no-new-func
  return new Function('a', `return (${m[1]});`);
}

test('the harness reads genModel and judgeModel from args', () => {
  assert.match(SRC, /a\.genModel/, 'genModel arg not read');
  assert.match(SRC, /a\.judgeModel/, 'judgeModel arg not read');
});

test('GEN_OPTS / JUDGE_OPTS default to inherit (empty opts) when the model arg is unset', () => {
  assert.deepEqual(optsResolver('GEN_OPTS')({}), {});
  assert.deepEqual(optsResolver('JUDGE_OPTS')({}), {});
});

test('GEN_OPTS / JUDGE_OPTS pin {model} when the model arg is set', () => {
  assert.deepEqual(optsResolver('GEN_OPTS')({ genModel: 'sonnet' }), { model: 'sonnet' });
  assert.deepEqual(optsResolver('JUDGE_OPTS')({ judgeModel: 'sonnet' }), { model: 'sonnet' });
  // The two arms resolve independently: a gen pin does not leak into the judge opts.
  assert.deepEqual(optsResolver('JUDGE_OPTS')({ genModel: 'sonnet' }), {});
});

test('genModel reaches BOTH generation arms (skill + control)', () => {
  // The spread must sit inside each arm's own agent() opts object, tied to its label.
  assert.match(SRC, /label: `skill-arm:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'skill arm missing GEN_OPTS');
  assert.match(SRC, /label: `control-arm:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'control arm missing GEN_OPTS');
});

test('judgeModel reaches the judge panel', () => {
  assert.match(SRC, /label: `judge#[^`]*`[^}]*\.\.\.JUDGE_OPTS/, 'judge missing JUDGE_OPTS');
});

test('the generation pin does not bleed into the judge panel (no GEN_OPTS on a judge)', () => {
  assert.doesNotMatch(SRC, /label: `judge#[^`]*`[^}]*\.\.\.GEN_OPTS/, 'judge wrongly carries GEN_OPTS');
});
