// scripts/output-eval-batch.workflow.test.mjs - regression guard for the M-33 output-eval BATCH
// runner (scripts/output-eval-batch.workflow.mjs).
//
// Why a SOURCE-CONTRACT test and not an import test: like the single-skill harness, the batch runner
// is a Workflow-tool script whose top-level body references runtime-only globals (`args`, `agent`,
// `parallel`, `log`) and uses top-level statements outside any function, so `await import()` throws
// before any helper is reachable. So this test reads the source text and:
//   (a) asserts the genModel/judgeModel plumbing reaches the generation arms and the judges,
//   (b) asserts the run emits the verbatim artifact TEXT (the human-anchor enabler, P1-5), and
//   (c) CROSS-CHECKS the runner's inline absolute-failure-first verdict against the canonical,
//       unit-tested gateVerdict in output-eval-aggregate.mjs - the runner MIRRORS that module
//       (Workflow scripts cannot import), and this proves the two agree on fail/void/pass.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gateVerdict } from './output-eval-aggregate.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = readFileSync(join(HERE, 'output-eval-batch.workflow.mjs'), 'utf8');

/** Extract the RHS of `const <name> = <expr>` (single line) and compile it into f(a). */
function optsResolver(name) {
  const m = SRC.match(new RegExp('const ' + name + ' = ([^\\n]+)'));
  assert.ok(m, `${name} assignment not found in the batch runner source`);
  // eslint-disable-next-line no-new-func
  return new Function('a', `return (${m[1]});`);
}

/** Extract the RHS of a single-line `const <name> = <expr>` as a raw expression string. */
function rhs(name) {
  const m = SRC.match(new RegExp('const ' + name + ' = ([^\\n]+)'));
  assert.ok(m, `${name} assignment not found in the batch runner source`);
  return m[1].replace(/\s*$/, '');
}

test('the batch runner parses args defensively (string or object)', () => {
  // The Workflow runtime can deliver args as a JSON string; the runner must handle both.
  const resolveArgs = new Function('args', `return (${rhs('a')});`);
  assert.deepEqual(resolveArgs('{"skills":[1]}'), { skills: [1] });
  assert.deepEqual(resolveArgs({ skills: [1] }), { skills: [1] });
  assert.deepEqual(resolveArgs(undefined), {});
});

test('GEN_OPTS / JUDGE_OPTS default to inherit and pin independently', () => {
  assert.deepEqual(optsResolver('GEN_OPTS')({}), {});
  assert.deepEqual(optsResolver('JUDGE_OPTS')({}), {});
  assert.deepEqual(optsResolver('GEN_OPTS')({ genModel: 'sonnet' }), { model: 'sonnet' });
  assert.deepEqual(optsResolver('JUDGE_OPTS')({ judgeModel: 'sonnet' }), { model: 'sonnet' });
  assert.deepEqual(optsResolver('JUDGE_OPTS')({ genModel: 'sonnet' }), {});
});

test('genModel reaches BOTH generation arms (skill + control); judgeModel reaches the judges', () => {
  assert.match(SRC, /label: `skill:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'skill arm missing GEN_OPTS');
  assert.match(SRC, /label: `control:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'control arm missing GEN_OPTS');
  assert.match(SRC, /label: `judge#[^`]*`[^}]*\.\.\.JUDGE_OPTS/, 'judge missing JUDGE_OPTS');
  assert.doesNotMatch(SRC, /label: `judge#[^`]*`[^}]*\.\.\.GEN_OPTS/, 'judge wrongly carries GEN_OPTS');
});

test('the per-skill result surfaces the verbatim artifact text (enables the human anchor, P1-5)', () => {
  assert.match(SRC, /artifacts:\s*\{\s*skill_drafts:\s*skillDrafts\s*,\s*control\s*\}/, 'result missing artifacts emission');
  // raw per-judge rows must survive too (codex finding 3, re-derivable raw.json).
  assert.match(SRC, /raw_judges:\s*judged\.map/, 'result missing raw_judges emission');
});

test("the runner's inline verdict MIRRORS the canonical gateVerdict (fail/void/pass agree)", () => {
  // Reconstruct the runner's inline verdict from its source expressions, then run both the mirror
  // and the canonical module on the same synthetic panels. They must agree, or the mirror has drifted.
  const flooredRhs = rhs('floored');           // Object.entries(skillCrit).filter(...).map(...)
  const absoluteRhs = rhs('absolutePass');      // skillOverall >= 3.5 && floored.length === 0
  const verdictRhs = rhs('verdict');            // !absolutePass ? 'fail' : (...) ? 'void-inconclusive' : 'pass'
  // eslint-disable-next-line no-new-func
  const mirror = new Function('skillCrit', 'skillOverall', 'gates', `
    const floored = ${flooredRhs};
    const absolutePass = ${absoluteRhs};
    const verdict = ${verdictRhs};
    return verdict;
  `);

  const cases = [
    // [label, skillCrit, skillOverall, gap, agreement]
    ['fail: sub-bar overall', { a: 4, b: 4 }, 3.0, 2.0, 0.0],
    ['fail: a criterion floors', { a: 2.0, b: 5 }, 4.0, 2.0, 0.0],
    ['void: clears absolute, gap sub-threshold', { a: 4, b: 4 }, 4.0, 0.5, 0.1],
    ['void: clears absolute, agreement too high', { a: 4, b: 4 }, 4.0, 2.0, 0.9],
    ['pass: clears everything', { a: 4, b: 5 }, 4.5, 2.0, 0.1],
  ];

  for (const [label, skillCrit, skillOverall, gap, agreement] of cases) {
    const gates = {
      discrimination: { value: gap, target: 1.0, pass: gap >= 1.0 },
      agreement: { value: agreement, target: 0.7, pass: agreement <= 0.7 },
    };
    const mirrorVerdict = mirror(skillCrit, skillOverall, gates);
    const canonical = gateVerdict({
      skill_per_criterion: skillCrit,
      skill_overall: skillOverall,
      discrimination_gap: gap,
      agreement_stdev: agreement,
    }).verdict;
    assert.equal(mirrorVerdict, canonical, `mirror disagrees with gateVerdict on "${label}": ${mirrorVerdict} vs ${canonical}`);
  }
});
