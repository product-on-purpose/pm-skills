# Output-eval rubric: the `measurement` family

Status: v1 (2026-06-14). Family rubric for M-33 output-quality evals (see
`release-plans/v2.27.0/spec_output-quality-evals.md`). Sibling of `specification.md`; it
reuses that rubric's anchor scale, universal criteria, negative control, judge protocol, and
validity gates verbatim, and differs only in the per-skill criteria (section 4).

This family covers the measure-phase rigor artifacts: `measure-experiment-design`,
`measure-experiment-results`, `measure-okr-grader`, `measure-dashboard-requirements`,
`measure-instrumentation-spec`, `measure-survey-analysis`.

> A measurement artifact's defining trait is **statistical and evidentiary discipline**:
> falsifiable claims, one decision metric, pre-registered success criteria, guardrails
> against harm, and honesty about evidence confidence and what is not yet observable. The
> freehand control tends to skip sample-size math, define success after the fact, and force
> scores on incomplete data; the skill should win on pre-registration and evidence honesty.

Per the sample-then-regression-trigger scope (spec section 8), this rubric ships with
per-skill criteria for the sampled skills first; the others are appended when first evaled.

---

## 1. How this rubric is used

The harness (`scripts/output-eval.workflow.mjs`) runs, per skill per scenario: a **skill
arm** (G generations), a **control arm** (a competent-but-thin freehand artifact, section
5), and an **N-judge blind panel** (section 6) scoring both arms verbatim. See
`specification.md` section 1 for the full description; the mechanics are identical across the
family.

---

## 2. The anchor scale (apply to every criterion)

Identical to `specification.md` section 2. **5 is reserved for work a senior PM/analyst would
not touch.** Solid, shippable-with-a-nitpick work is a **4**. Score conservatively: when torn
between two levels, pick the lower.

| Score | Anchor | Test |
|---|---|---|
| **5 - Exceptional** | Nothing a senior reviewer would add or change on this criterion. Fully satisfied with notable rigor. Rare by design. | "I cannot improve this." |
| **4 - Solid** | Meets the criterion well. A reviewer might suggest one minor improvement but would ship it as-is. | "Ship it; I have one small nit." |
| **3 - Adequate** | Meets the baseline, but has a real gap a reviewer would ask to close before shipping. | "Fix one thing first." |
| **2 - Thin** | Partially addresses the criterion. Generic, or missing substance. Needs rework. | "This needs another pass." |
| **1 - Absent or wrong** | The criterion is unaddressed, or what is present is incorrect or misleading. | "Not there, or wrong." |

---

## 3. Universal criteria (scored for every skill in the family)

Identical to `specification.md` section 3.

- **specificity** (anti-mush): concrete to THIS scenario, not generic boilerplate. A 5 names
  the actual metrics, baselines, and numbers from the input; a 2 is reskinnable filler.
- **completeness**: fills every section the skill's Output Format / Quality Checklist
  requires, with no required area left as a stub.

---

## 4. Per-skill criteria

Each list is transcribed from that skill's own Quality Checklist. The judge scores each
criterion 1-5 on the section 2 scale, plus the two universals. The `key` is the machine name
used by the harness schema (section 6).

### measure-experiment-design
| key | criterion | what "5" requires |
|---|---|---|
| hypothesis | Hypothesis falsifiable and specific | one testable hypothesis in the believe / for / will / as-measured-by form |
| primary_metric | Exactly one primary metric | a single decision metric, with 2-3 labeled secondaries |
| sample_size | Sample size documented with assumptions | MDE, significance, and power stated; the calculation shown, not asserted |
| duration | Duration accounts for traffic and statistics | derived from sample size and available traffic; respects weekly patterns |
| success_criteria | Win / loss / inconclusive defined upfront | a pre-registered decision rule, no movable goalposts |
| guardrails | Guardrail metrics protect against harm | named counter-metrics with a monitoring / rollback plan |

### measure-okr-grader
| key | criterion | what "5" requires |
|---|---|---|
| type_aware_scoring | Each KR scored by the convention for its OKR type | committed = pass/fail, aspirational = 0-1 sweet spot, compliance = binary, learning = validated/invalidated; no committed-as-aspirational softening |
| evidence_quality | Every KR carries evidence confidence and caveats | high / medium / low / unknown per KR; instrumentation, window, and cohort caveats named |
| guardrail_separation | Guardrail KRs reported separately, never averaged in | a failed guardrail is its own signal, not diluted into the primary score |
| no_retro_adjust | No retroactive target change or scope shrinkage | partial coverage marked not-yet-fully-observable, not "pass on in-scope" |
| learning_synthesis | Learning named honestly and routed | validated / invalidated assumptions and surprises, handed to the right downstream skill |
| next_cycle | Next-cycle recommendations per objective | continue / revise / retire / escalate, with candidate next-cycle OKRs |

> Append-on-first-eval (not yet authored): measure-experiment-results,
> measure-dashboard-requirements, measure-instrumentation-spec, measure-survey-analysis.

---

## 5. The negative control

Identical design to `specification.md` section 5: a **competent but thin freehand
artifact**, NOT a strawman. The control subagent produces the same artifact type for the
same scenario using only general PM knowledge, no skill, "in a few minutes." A control that
scores below ~2 on most criteria signals strawman drift; re-run it.

---

## 6. Judge protocol and structured output

Each judge is an independent subagent that receives both artifacts (labeled only "Artifact
A" / "Artifact B", order alternated per judge index), the scenario, this rubric, and returns
ONLY structured output: one integer 1-5 per criterion key (the section 4 keys plus
`specificity` and `completeness`) for each artifact, a short `notes` justification, a
`which_is_stronger` (A / B), and a `one_line_rationale`. **Overall is NOT scored by the
judge; the harness derives it as the criterion mean** (decision recorded 2026-06-14). Judges
apply the section 2 anchor scale literally, score conservatively, and never see how either
artifact was produced.

---

## 7. Aggregation, validity gates, and the pass bar

Identical to `specification.md` section 7. After un-blinding: per-criterion mean per arm;
overall mean per arm (the criterion mean); **discrimination gap** = skill overall - control
overall; **agreement** = stdev of the skill arm's overall across judges.

| Gate | Target | If it fails |
|---|---|---|
| Discrimination | gap >= ~1.0 | the rubric or judges do not discriminate; the result is VOID |
| Agreement | overall stdev <= ~0.7 | the rubric is ambiguous; tighten it before trusting scores |
| Human anchor (per family, once) | panel lands near the section 8 anchor | re-anchor the panel; suspect grade inflation |

**Skill pass bar** (only meaningful once the validity gates pass): overall mean >=
**3.5/5**, discrimination gap >= 1.0, agreement stdev <= 0.7, and no single criterion mean
below **2.5** without a logged reason.

---

## 8. Human anchor (maintainer to confirm)

A maintainer hand-scores 1-2 measurement artifacts to confirm the panel lands near a human
judgment. This slot is set up but needs human sign-off.

> Maintainer: replace this paragraph with your hand-scored anchor (artifact link +
> per-criterion scores + one line on why) once you have scored a `measure-experiment-design`
> or `measure-okr-grader` artifact. Until then, treat panel numbers as provisional.
