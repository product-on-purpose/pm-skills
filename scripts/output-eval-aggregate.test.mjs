// scripts/output-eval-aggregate.test.mjs - executes the M-33 output-eval aggregation + verdict
// control flow that the Workflow-tool harnesses cannot test by import (codex finding 3). The
// workflow scripts mirror these functions verbatim; this test is the reference that locks the
// un-blinding, criterion-mean aggregation, and the absolute-failure-first verdict (codex finding 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mean, stdev, unblindAndAggregate, gateVerdict, unblindAndAggregate3, gateVerdict3 } from './output-eval-aggregate.mjs';

test('mean and population stdev', () => {
  assert.equal(mean([5, 4]), 4.5);
  assert.equal(stdev([5, 4]), 0.5); // population: sqrt(mean([0.25,0.25])) = 0.5
});

// Two judges with OPPOSITE A/B assignment - the case that breaks a naive (no un-blind) aggregator.
const CRITERIA = ['c1', 'c2'];
const JUDGED = [
  { skillIsA: true, v: { artifact_a: { c1: 5, c2: 5 }, artifact_b: { c1: 2, c2: 2 }, which_is_stronger: 'A' } },
  { skillIsA: false, v: { artifact_a: { c1: 3, c2: 3 }, artifact_b: { c1: 4, c2: 4 }, which_is_stronger: 'B' } },
];

test('un-blinds A/B per judge and aggregates the criterion mean', () => {
  const agg = unblindAndAggregate(JUDGED, CRITERIA);
  // skill rows: J1.artifact_a {5,5}, J2.artifact_b {4,4}; control rows: J1.artifact_b {2,2}, J2.artifact_a {3,3}
  assert.equal(agg.skill_per_criterion.c1, 4.5);
  assert.equal(agg.skill_per_criterion.c2, 4.5);
  assert.equal(agg.control_per_criterion.c1, 2.5);
  assert.equal(agg.skill_overall, 4.5);
  assert.equal(agg.control_overall, 2.5);
  assert.equal(agg.discrimination_gap, 2.0);
  assert.equal(agg.agreement_stdev, 0.5); // stdev of per-judge skill overalls [5,4]
  // Both judges preferred the skill after un-blinding (J1 picked A=skill, J2 picked B=skill).
  assert.equal(agg.blind_preference_skill, '2/2');
});

test('PASS: skill clears the absolute bar, the gap, and agreement', () => {
  const agg = unblindAndAggregate(JUDGED, CRITERIA);
  const { verdict } = gateVerdict(agg);
  assert.equal(verdict, 'pass');
});

test('FAIL beats a huge gap: a low absolute skill score is a FAIL regardless of discrimination (finding 1)', () => {
  // Skill overall 3.0 (< 3.5 bar) but a giant gap over a terrible control. Must FAIL, not pass/void.
  const agg = {
    skill_overall: 3.0, control_overall: 0.5, discrimination_gap: 2.5, agreement_stdev: 0.1,
    skill_per_criterion: { c1: 3, c2: 3 },
  };
  const v = gateVerdict(agg);
  assert.equal(v.verdict, 'fail');
  assert.equal(v.absolute_pass, false);
});

test('FAIL on a criterion floor even when overall clears the bar (finding 1)', () => {
  const agg = {
    skill_overall: 4.0, control_overall: 2.0, discrimination_gap: 2.0, agreement_stdev: 0.1,
    skill_per_criterion: { c1: 4.5, c2: 2.0 }, // c2 below the 2.5 floor
  };
  const v = gateVerdict(agg);
  assert.equal(v.verdict, 'fail');
  assert.deepEqual(v.floored_criteria, ['c2']);
});

test('VOID (not pass, not fail): skill clears the absolute bar but the gap is sub-threshold', () => {
  // This is exactly the 3 sub-1.0-gap skills from the 2026-06-14 batch.
  const agg = {
    skill_overall: 4.5, control_overall: 3.8, discrimination_gap: 0.7, agreement_stdev: 0.2,
    skill_per_criterion: { c1: 4.5, c2: 4.5 },
  };
  const v = gateVerdict(agg);
  assert.equal(v.verdict, 'void-inconclusive');
  assert.equal(v.absolute_pass, true);
  assert.equal(v.discrimination_pass, false);
});

test('VOID on high inter-judge disagreement even with a healthy gap', () => {
  const agg = {
    skill_overall: 4.5, control_overall: 2.5, discrimination_gap: 2.0, agreement_stdev: 0.9,
    skill_per_criterion: { c1: 4.5, c2: 4.5 },
  };
  const v = gateVerdict(agg);
  assert.equal(v.verdict, 'void-inconclusive');
  assert.equal(v.agreement_pass, false);
});

// ---- Three-arm (informed control, codex finding 2) ----

// Two judges with ROTATED positions: each arm sits in a different slot per judge, the case that breaks
// a naive aggregator that assumes a fixed position. J1 skill=a/freehand=b/informed=c; J2 skill=c/freehand=a/informed=b.
const JUDGED3 = [
  { skillPos: 'a', freehandPos: 'b', informedPos: 'c', v: { artifact_a: { c1: 5, c2: 5 }, artifact_b: { c1: 2, c2: 2 }, artifact_c: { c1: 4, c2: 4 }, which_is_strongest: 'A' } },
  { skillPos: 'c', freehandPos: 'a', informedPos: 'b', v: { artifact_a: { c1: 2, c2: 2 }, artifact_b: { c1: 3, c2: 3 }, artifact_c: { c1: 4, c2: 4 }, which_is_strongest: 'C' } },
];

test('three-arm: un-blinds rotated positions and computes both gaps', () => {
  const agg = unblindAndAggregate3(JUDGED3, CRITERIA);
  assert.equal(agg.skill_overall, 4.5);     // [5,4]
  assert.equal(agg.freehand_overall, 2.0);  // [2,2]
  assert.equal(agg.informed_overall, 3.5);  // [4,3]
  assert.equal(agg.gap_vs_freehand, 2.5);
  assert.equal(agg.gap_vs_informed, 1.0);
  assert.equal(agg.agreement_stdev, 0.5);   // stdev of skill overalls [5,4]
  assert.equal(agg.blind_preference_skill, '2/2'); // J1 picked A=skill, J2 picked C=skill
});

test('three-arm PASS: skill beats BOTH controls (rigor adds value beyond the template)', () => {
  const v = gateVerdict3(unblindAndAggregate3(JUDGED3, CRITERIA));
  assert.equal(v.verdict, 'pass');
  assert.equal(v.informed_pass, true);
});

test('three-arm PASS-STRUCTURAL: beats freehand but the rigor premium over template-only is thin', () => {
  const agg = {
    skill_overall: 4.5, freehand_overall: 3.0, informed_overall: 4.2,
    gap_vs_freehand: 1.5, gap_vs_informed: 0.3, agreement_stdev: 0.2,
    skill_per_criterion: { c1: 4.5, c2: 4.5 },
  };
  const v = gateVerdict3(agg);
  assert.equal(v.verdict, 'pass-structural');
  assert.equal(v.freehand_pass, true);
  assert.equal(v.informed_pass, false);
});

test('three-arm VOID: sub-threshold freehand gap voids regardless of the informed gap', () => {
  const agg = {
    skill_overall: 4.5, freehand_overall: 3.8, informed_overall: 3.9,
    gap_vs_freehand: 0.7, gap_vs_informed: 0.6, agreement_stdev: 0.2,
    skill_per_criterion: { c1: 4.5, c2: 4.5 },
  };
  assert.equal(gateVerdict3(agg).verdict, 'void-inconclusive');
});

test('three-arm FAIL: a floored criterion fails regardless of either gap (absolute-failure-first)', () => {
  const agg = {
    skill_overall: 4.0, freehand_overall: 1.0, informed_overall: 1.5,
    gap_vs_freehand: 3.0, gap_vs_informed: 2.5, agreement_stdev: 0.1,
    skill_per_criterion: { c1: 4.5, c2: 2.0 }, // c2 below the 2.5 floor
  };
  const v = gateVerdict3(agg);
  assert.equal(v.verdict, 'fail');
  assert.deepEqual(v.floored_criteria, ['c2']);
});
