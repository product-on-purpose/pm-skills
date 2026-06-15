# Output-eval rubric: the `framing` family

Status: v1 (2026-06-14). Family rubric for M-33 output-quality evals (see
`release-plans/v2.27.0/spec_output-quality-evals.md`). Sibling of
`specification.md`; it reuses that rubric's anchor scale, universal criteria, negative
control, judge protocol, and validity gates verbatim, and differs only in the per-skill
criteria (section 4).

This family covers the strategy-framing skills, those that decide *what problem to solve*
and *what outcomes to chase* before any building: `define-problem-statement`,
`define-hypothesis`, `define-jtbd-canvas`, `define-opportunity-tree`,
`define-prioritization-framework`, `foundation-okr-writer`, `foundation-persona`,
`foundation-lean-canvas`.

> A framing artifact's defining trait is **grounded, falsifiable intent**: it names a
> specific user/segment, a real reason-now, and success measured by baselines and targets
> rather than vibes, and it does NOT smuggle in a solution. The freehand control tends to
> stay generic ("improve engagement for our users") and to invent numbers; the skill should
> win on specificity, measurability, and discipline about what-not-how.

Per the sample-then-regression-trigger scope (spec section 8), this rubric ships with
per-skill criteria for the sampled skills first. The other family skills' criteria are
appended when each is first evaled (a skill is evaled when its body changes).

---

## 1. How this rubric is used

The harness (`scripts/output-eval.workflow.mjs`) runs, per skill per scenario: a **skill
arm** (the skill executed on the scenario, run G times to damp generation noise), a
**control arm** (a competent-but-thin freehand artifact, section 5), and an **N-judge blind
panel** (section 6) scoring both arms verbatim on every criterion. See `specification.md`
section 1 for the full description; the mechanics are identical across the family.

---

## 2. The anchor scale (apply to every criterion)

Identical to `specification.md` section 2. **5 is reserved for work a senior PM would not
touch.** Solid, shippable-with-a-nitpick work is a **4**. Score conservatively: when torn
between two levels, pick the lower.

| Score | Anchor | Test |
|---|---|---|
| **5 - Exceptional** | Nothing a senior PM would add or change on this criterion. Fully satisfied with notable rigor. Rare by design. | "I cannot improve this." |
| **4 - Solid** | Meets the criterion well. A reviewer might suggest one minor improvement but would ship it as-is. | "Ship it; I have one small nit." |
| **3 - Adequate** | Meets the baseline, but has a real gap a reviewer would ask to close before shipping. | "Fix one thing first." |
| **2 - Thin** | Partially addresses the criterion. Generic, or missing substance. Needs rework. | "This needs another pass." |
| **1 - Absent or wrong** | The criterion is unaddressed, or what is present is incorrect or misleading. | "Not there, or wrong." |

---

## 3. Universal criteria (scored for every skill in the family)

Identical to `specification.md` section 3.

- **specificity** (anti-mush): concrete to THIS scenario, not generic boilerplate that
  could be pasted onto any initiative. A 5 names the actual entities, constraints, and
  numbers from the input; a 2 is reskinnable filler.
- **completeness**: fills every section the skill's Output Format / Quality Checklist
  requires, with no required area left as a stub.

---

## 4. Per-skill criteria

Each list is transcribed from that skill's own Quality Checklist (its stated contract). The
judge scores each criterion 1-5 on the section 2 scale, plus the two universals. The `key`
is the machine name used by the harness schema (section 6).

### define-problem-statement
| key | criterion | what "5" requires |
|---|---|---|
| user_segment | Problem is specific to a defined user segment | names a concrete persona / role / segment, not "all users" |
| impact_quantified | Impact quantified with data or reasonable estimates | user and business impact carry numbers or clearly-labeled estimates, not vague severity |
| success_metrics | Success metrics have baselines and targets | each metric has a current baseline and a target, traceable to the scenario (no invented numbers) |
| what_not_how | Describes the "what" without prescribing the "how" | frames the problem; no solution smuggled in |
| why_now | Business context explains why this matters now | a concrete timing / urgency trigger, not generic importance |
| open_questions | Open questions captured for follow-up | names the real unknowns and assumptions to validate |

### foundation-okr-writer
| key | criterion | what "5" requires |
|---|---|---|
| objective_quality | Objective is qualitative, specific, tradeoff-guiding | a directional state-change objective, not a slogan, task, metric-bundle, or project name |
| outcome_krs | KRs measure outcomes / behavior change, not features or tasks | every KR is an outcome; features and tasks are moved to Initiatives (Castro's litmus) |
| kr_measurability | Every KR has metric, baseline (or marked placeholder), target, deadline, evidence source | no KR missing a measurement field; missing values are explicitly marked, never blank |
| guardrails | A guardrail / counter-metric KR exists for any optimization KR | growth / speed / volume KRs are paired with a guardrail |
| no_fabrication | No fabricated baselines or targets | missing values labeled assumption / placeholder / recommended-to-measure, not invented |
| integrity_audit | Quality Audit applied; no compensation coupling | explicit pass / risk / fail ratings; scores not coupled to performance or pay |

> Append-on-first-eval (not yet authored): define-hypothesis, define-jtbd-canvas,
> define-opportunity-tree, define-prioritization-framework, foundation-persona,
> foundation-lean-canvas.

---

## 5. The negative control

Identical design to `specification.md` section 5: a **competent but thin freehand
artifact**, NOT a strawman. The control subagent produces the same artifact type for the
same scenario using only general PM knowledge, no skill, "in a few minutes." This isolates
the skill's marginal value. A control that scores below ~2 on most criteria signals the
control prompt has drifted toward a strawman; re-run it.

---

## 6. Judge protocol and structured output

Each judge is an independent subagent that receives both artifacts (labeled only "Artifact
A" / "Artifact B", order alternated per judge index), the scenario, this rubric, and
returns ONLY structured output: one integer 1-5 per criterion key (the section 4 keys plus
`specificity` and `completeness`) for each artifact, a short `notes` justification, a
`which_is_stronger` (A / B), and a `one_line_rationale`. **Overall is NOT scored by the
judge; the harness derives it as the criterion mean** (the holistic-overall ceiling fix,
decision recorded 2026-06-14). Judges apply the section 2 anchor scale literally and score
conservatively. Judges never see how either artifact was produced.

---

## 7. Aggregation, validity gates, and the pass bar

Identical to `specification.md` section 7. After un-blinding (map A/B back to skill/control
per judge): per-criterion mean per arm; overall mean per arm (the criterion mean);
**discrimination gap** = skill overall - control overall; **agreement** = stdev of the
skill arm's overall across judges.

| Gate | Target | If it fails |
|---|---|---|
| Discrimination | gap >= ~1.0 | the rubric or judges do not discriminate; the result is VOID (a finding about the instrument, not the skill) |
| Agreement | overall stdev <= ~0.7 | the rubric is ambiguous; tighten it before trusting scores |
| Human anchor (per family, once) | panel lands near the section 8 anchor | re-anchor the panel; suspect grade inflation |

**Skill pass bar** (only meaningful once the validity gates pass): overall mean >=
**3.5/5**, discrimination gap >= 1.0, agreement stdev <= 0.7, and no single criterion mean
below **2.5** without a logged reason. A failing criterion is the queue for a targeted
skill-body improvement.

---

## 8. Human anchor (maintainer to confirm)

Per the spec, a maintainer hand-scores 1-2 framing artifacts so we can confirm the panel
lands near a human judgment and is not inflating grades. This slot is set up but needs human
sign-off; it is the one step the harness cannot self-certify.

**Recorded anchor (2026-06-15, foundation-okr-writer):** maintainer hand-scored the
`anchor-artifacts-20260615/foundation-okr-writer.md` artifact at **overall 4.0**; the blind panel scored
it a straight **5.00** (Δ **+1.00**). The maintainer's note: strong OKR hygiene (outcomes vs initiatives
separated, assumptions labeled, guardrails, feature-team constraint disclosed), but it lacks an operating
rhythm (weekly review cadence, check-in dates, scoring checkpoints, decision owners for the open
questions), so it is a good planning artifact, not yet operating-ready. The panel's straight 5.0
over-credits by a full point. Treat panel absolutes on this family as ~0.5-1.0 hot (see specification.md
section 2 calibration); the discrimination gap remains the primary signal.
