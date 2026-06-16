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
import { gateVerdict } from './output-eval-aggregate.mjs';

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

test('the result surfaces the verbatim artifact text (enables the human anchor, P1-5)', () => {
  // A human anchor needs the exact artifact the panel scored; the score-only return cannot supply it.
  // The harness must emit both arms' generated text - skill_drafts (the array) and the control.
  assert.match(SRC, /artifacts:\s*\{\s*skill_drafts:\s*skillDrafts\s*,\s*control\s*\}/, 'result missing artifacts emission');
});

/** Extract the RHS of a single-line `const <name> = <expr>` as a raw expression string. */
function rhs(name) {
  const m = SRC.match(new RegExp('const ' + name + ' = ([^\\n]+)'));
  assert.ok(m, `${name} assignment not found in the harness source`);
  return m[1].replace(/\s*$/, '');
}

test('the harness emits the absolute-failure-first verdict and MIRRORS gateVerdict (codex finding 2)', () => {
  // Finding 2: the single-skill harness previously returned only gates (no verdict), so a sub-bar or
  // floored skill could read as a pass. It must now mirror gateVerdict like the batch + informed runners.
  assert.match(SRC, /\n\s*verdict,/, 'result must include a verdict field');
  assert.match(SRC, /absolute_pass: absolutePass/, 'result must include absolute_pass');
  const mirror = new Function('skillCrit', 'skillOverall', 'gap', 'agreement', `
    const gates = { discrimination: { pass: gap >= 1.0 }, agreement: { pass: agreement <= 0.7 } };
    const floored = ${rhs('floored')};
    const absolutePass = ${rhs('absolutePass')};
    const verdict = ${rhs('verdict')};
    return verdict;
  `);
  const cases = [
    ['fail: sub-bar overall', { a: 4, b: 4 }, 3.0, 2.0, 0.0],
    ['fail: a criterion floors', { a: 2.0, b: 5 }, 4.0, 2.0, 0.0],
    ['void: gap sub-threshold', { a: 4, b: 4 }, 4.0, 0.5, 0.1],
    ['void: agreement too high', { a: 4, b: 4 }, 4.0, 2.0, 0.9],
    ['pass: clears everything', { a: 4, b: 5 }, 4.5, 2.0, 0.1],
  ];
  for (const [label, skillCrit, skillOverall, gap, agreement] of cases) {
    const mine = mirror(skillCrit, skillOverall, gap, agreement);
    const canonical = gateVerdict({ skill_per_criterion: skillCrit, skill_overall: skillOverall, discrimination_gap: gap, agreement_stdev: agreement }).verdict;
    assert.equal(mine, canonical, `mirror disagrees with gateVerdict on "${label}": ${mine} vs ${canonical}`);
  }
});
