// scripts/output-eval-informed.workflow.test.mjs - regression guard for the M-33 THREE-ARM
// (informed-control) runner (scripts/output-eval-informed.workflow.mjs).
//
// Like the other Workflow-tool scripts it cannot be import-tested (runtime globals + top-level
// statements). So this reads the source and:
//   (a) asserts the genModel/judgeModel plumbing reaches all THREE generation arms + the judges,
//   (b) asserts the run emits all three arms' artifact text + raw judge rows,
//   (c) asserts the 3-artifact judge schema and the position rotations are present, and
//   (d) CROSS-CHECKS the runner's inline two-gap verdict against the canonical gateVerdict3 in
//       output-eval-aggregate.mjs (the runner mirrors it; this proves they agree).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gateVerdict3 } from './output-eval-aggregate.mjs';

const SRC = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'output-eval-informed.workflow.mjs'), 'utf8');

function rhs(name) {
  const m = SRC.match(new RegExp('const ' + name + ' = ([^\\n]+)'));
  assert.ok(m, `${name} assignment not found in the informed runner source`);
  return m[1].replace(/\s*$/, '');
}
function optsResolver(name) {
  // eslint-disable-next-line no-new-func
  return new Function('a', `return (${rhs(name)});`);
}

test('args parsed defensively; GEN/JUDGE opts default-inherit and pin independently', () => {
  const resolveArgs = new Function('args', `return (${rhs('a')});`);
  assert.deepEqual(resolveArgs('{"skills":[1]}'), { skills: [1] });
  assert.deepEqual(optsResolver('GEN_OPTS')({}), {});
  assert.deepEqual(optsResolver('JUDGE_OPTS')({ judgeModel: 'sonnet' }), { model: 'sonnet' });
  assert.deepEqual(optsResolver('GEN_OPTS')({ judgeModel: 'sonnet' }), {});
});

test('genModel reaches all THREE generation arms (skill + informed + freehand); judgeModel reaches judges', () => {
  assert.match(SRC, /label: `skill:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'skill arm missing GEN_OPTS');
  assert.match(SRC, /label: `informed:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'informed arm missing GEN_OPTS');
  assert.match(SRC, /label: `freehand:[^`]*`[^}]*\.\.\.GEN_OPTS/, 'freehand arm missing GEN_OPTS');
  assert.match(SRC, /label: `judge#[^`]*`[^}]*\.\.\.JUDGE_OPTS/, 'judge missing JUDGE_OPTS');
  assert.doesNotMatch(SRC, /label: `judge#[^`]*`[^}]*\.\.\.GEN_OPTS/, 'judge wrongly carries GEN_OPTS');
});

test('informed arm does NOT read SKILL.md (template + scenario only)', () => {
  // The whole point of the informed control: structure (template) without rigor (instructions).
  const informedBlock = SRC.slice(SRC.indexOf('informedThunk'), SRC.indexOf('freehandThunk'));
  assert.match(informedBlock, /TEMPLATE_PATH/, 'informed arm should read the template');
  assert.match(informedBlock, /Do NOT read .*SKILL_PATH|Do NOT read \\`\$\{SKILL_PATH\}/, 'informed arm must be told not to read SKILL.md');
});

test('three-artifact judge schema + three position rotations are present', () => {
  assert.match(SRC, /artifact_a: art, artifact_b: art, artifact_c: art/, 'judge schema missing the third artifact');
  assert.match(SRC, /which_is_strongest: \{ type: 'string', enum: \['A', 'B', 'C'\] \}/, 'strongest enum must be A/B/C');
  assert.match(SRC, /const ROTATIONS = \[[\s\S]*skillPos: 'a'[\s\S]*skillPos: 'b'[\s\S]*skillPos: 'c'[\s\S]*\]/, 'three position rotations expected');
});

test('the result surfaces all three arms\' artifact text + raw judge rows', () => {
  assert.match(SRC, /artifacts: \{ skill_drafts: skillDrafts, informed, freehand \}/, 'result missing 3-arm artifacts emission');
  assert.match(SRC, /raw_judges: judged\.map/, 'result missing raw_judges emission');
});

test("the runner's inline two-gap verdict MIRRORS the canonical gateVerdict3", () => {
  const mirror = new Function('skillCrit', 'skillOverall', 'gapFreehand', 'gapInformed', 'agreement', `
    const floored = Object.entries(skillCrit).filter(([, m]) => m < 2.5).map(([k]) => k);
    const absolutePass = ${rhs('absolutePass')};
    const freehandPass = ${rhs('freehandPass')};
    const informedPass = ${rhs('informedPass')};
    const agreementPass = ${rhs('agreementPass')};
    const verdict = ${rhs('verdict')};
    return verdict;
  `);
  const cases = [
    ['fail: floored', { a: 4, b: 2.0 }, 4.0, 3.0, 2.5, 0.1],
    ['void: freehand gap sub-threshold', { a: 4, b: 4 }, 4.5, 0.7, 0.6, 0.2],
    ['pass-structural: thin informed premium', { a: 4, b: 4 }, 4.5, 1.5, 0.3, 0.2],
    ['pass: beats both', { a: 4, b: 5 }, 4.5, 2.5, 1.0, 0.2],
    ['void: agreement too high', { a: 4, b: 4 }, 4.5, 2.0, 1.0, 0.9],
  ];
  for (const [label, skillCrit, skillOverall, gapFreehand, gapInformed, agreement] of cases) {
    const mirrorVerdict = mirror(skillCrit, skillOverall, gapFreehand, gapInformed, agreement);
    const canonical = gateVerdict3({
      skill_per_criterion: skillCrit, skill_overall: skillOverall,
      gap_vs_freehand: gapFreehand, gap_vs_informed: gapInformed, agreement_stdev: agreement,
    }).verdict;
    assert.equal(mirrorVerdict, canonical, `mirror disagrees on "${label}": ${mirrorVerdict} vs ${canonical}`);
  }
});
