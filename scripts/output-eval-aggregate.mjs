// scripts/output-eval-aggregate.mjs - the CANONICAL, tested aggregation + verdict logic for
// the M-33 output-quality eval (spec_output-quality-evals.md).
//
// Why this module exists (codex adversarial review, 2026-06-14, finding 3): the output-eval
// harnesses are Workflow-tool scripts (`output-eval.workflow.mjs`, `output-eval-batch.workflow.mjs`)
// whose generate/judge/un-blind/aggregate flow is NOT executed by any importable test - a bug in
// un-blinding, criterion mapping, or aggregation could produce a recorded result that no reviewer or
// CI path would catch. This module factors the PURE post-judging math out so it can be unit-tested,
// and the workflow scripts MIRROR it verbatim (they cannot `import` - the Workflow JS sandbox has no
// module resolution). Keep the three copies in sync; the test here is the reference.
//
// It also encodes the absolute-failure-first verdict (codex finding 1): a low discrimination gap must
// NOT define away a genuinely bad skill. A skill whose absolute score is below the family bar, or whose
// any criterion floors, is a FAIL regardless of the gap; only a skill that independently clears the
// absolute gates earns the "inconclusive / instrument finding" label when the gap is sub-threshold.

export const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
// Population standard deviation (matches the harnesses).
export const stdev = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) ** 2))); };

/**
 * Un-blind and aggregate a judge panel.
 * @param judged array of { skillIsA:boolean, v:{ artifact_a:{<crit>:1-5,...}, artifact_b:{...}, which_is_stronger:'A'|'B' } }
 * @param criteria array of criterion keys (the per-skill keys plus 'specificity','completeness')
 * Returns per-arm per-criterion means, per-arm overall (the criterion mean), the discrimination gap,
 * the inter-judge agreement (stdev of the skill arm's per-judge overall), and the blind preference.
 */
export function unblindAndAggregate(judged, criteria) {
  const skillRows = [];
  const controlRows = [];
  for (const { skillIsA, v } of judged) {
    skillRows.push(skillIsA ? v.artifact_a : v.artifact_b);
    controlRows.push(skillIsA ? v.artifact_b : v.artifact_a);
  }
  const perCriterion = (rows, k) => mean(rows.map((r) => r[k]));
  const overallOf = (rows) => mean(rows.map((r) => mean(criteria.map((k) => r[k])))); // derived: criterion mean
  const skillOveralls = skillRows.map((r) => mean(criteria.map((k) => r[k])));

  const skill_per_criterion = {};
  const control_per_criterion = {};
  for (const k of criteria) {
    skill_per_criterion[k] = perCriterion(skillRows, k);
    control_per_criterion[k] = perCriterion(controlRows, k);
  }
  const skill_overall = overallOf(skillRows);
  const control_overall = overallOf(controlRows);
  const discrimination_gap = skill_overall - control_overall;
  const agreement_stdev = stdev(skillOveralls);
  const skillWins = judged.filter(({ skillIsA, v }) => (v.which_is_stronger === 'A') === skillIsA).length;

  return {
    skill_overall,
    control_overall,
    discrimination_gap,
    agreement_stdev,
    skill_per_criterion,
    control_per_criterion,
    blind_preference_skill: `${skillWins}/${judged.length}`,
  };
}

/**
 * Decide a skill's output-eval verdict, absolute-failure-first (codex finding 1).
 * Ordering matters: an absolute failure is reported BEFORE discrimination can void the result, so a
 * low-gap run can never launder a genuinely bad skill into "instrument noise".
 *   1. FAIL  - skill_overall < bar OR any criterion mean < floor (regardless of gap/agreement).
 *   2. VOID  - skill clears the absolute gates, but the gap is sub-threshold or agreement is too high
 *              (the eval cannot prove marginal value; a finding about the INSTRUMENT, not the skill).
 *   3. PASS  - skill clears the absolute gates AND the gap AND agreement.
 * @param agg the object returned by unblindAndAggregate
 * @param opts { bar=3.5, floor=2.5, gapTarget=1.0, agreeTarget=0.7 }
 */
export function gateVerdict(agg, opts = {}) {
  const bar = opts.bar ?? 3.5;
  const floor = opts.floor ?? 2.5;
  const gapTarget = opts.gapTarget ?? 1.0;
  const agreeTarget = opts.agreeTarget ?? 0.7;

  const flooredCriteria = Object.entries(agg.skill_per_criterion)
    .filter(([, m]) => m < floor)
    .map(([k]) => k);
  const absolute_pass = agg.skill_overall >= bar && flooredCriteria.length === 0;
  const discrimination_pass = agg.discrimination_gap >= gapTarget;
  const agreement_pass = agg.agreement_stdev <= agreeTarget;

  let verdict;
  if (!absolute_pass) verdict = 'fail'; // absolute-failure-first: bad skill, regardless of gap
  else if (!discrimination_pass || !agreement_pass) verdict = 'void-inconclusive'; // instrument finding
  else verdict = 'pass';

  return { verdict, absolute_pass, discrimination_pass, agreement_pass, floored_criteria: flooredCriteria };
}
