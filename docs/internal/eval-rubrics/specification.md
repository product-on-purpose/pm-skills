# Output-eval rubric: the `specification` family

Status: v1 (2026-06-14). Family rubric for M-33 output-quality evals (see
`release-plans/v2.27.0/spec_output-quality-evals.md`). Covers the five specification skills:
`deliver-prd`, `deliver-acceptance-criteria`, `deliver-user-stories`, `deliver-edge-cases`,
`deliver-launch-checklist`.

> A specification artifact's defining trait is **verifiable outcomes**: every line should be
> something an engineer or QA can act on and check. Each skill in this family expresses that trait
> in its own surface form (a PRD, Given/When/Then criteria, a failure-mode catalog, a launch
> checklist), but the underlying standard is shared, so the family shares one rubric. Only the
> per-skill criteria rows differ; the anchor scale, the two universal criteria, the negative
> control, the judge protocol, and the validity gates are identical across the family.

---

## 1. How this rubric is used

The harness (`spec_output-quality-evals.md` section 1) runs, per skill per scenario:

1. **Skill arm** - a subagent executes the skill on a scenario and produces the artifact (run 2-3x
   and average to damp generation noise).
2. **Control arm** - a subagent produces a "competent but thin" freehand artifact for the same
   scenario, with no access to the skill (section 5 below).
3. **Judge panel** - N independent judges (N=3) score BOTH artifacts blind, on every criterion and
   on a holistic overall, using the anchor scale in section 2 and the structured-output schema in
   section 6.

Judges never see which arm is which, and never see each other's scores.

---

## 2. The anchor scale (apply to every criterion and to overall)

This is the hardened scale that fixes the PoC ceiling effect (the PoC skill arm hit a perfect 5.0,
leaving no headroom to detect a regression). **5 is reserved for work a senior PM would not touch.**
Solid, shippable-with-a-nitpick work is a **4**, not a 5. Score conservatively: when torn between two
levels, pick the lower.

| Score | Anchor | Test |
|---|---|---|
| **5 - Exceptional** | Nothing a senior PM would add or change on this criterion. Fully satisfied with notable rigor. Rare by design. | "I cannot improve this." |
| **4 - Solid** | Meets the criterion well. A reviewer might suggest one minor improvement but would ship it as-is. | "Ship it; I have one small nit." |
| **3 - Adequate** | Meets the baseline, but has a real gap a reviewer would ask to close before shipping. | "Fix one thing first." |
| **2 - Thin** | Partially addresses the criterion. Generic, or missing substance. Needs rework. | "This needs another pass." |
| **1 - Absent or wrong** | The criterion is unaddressed, or what is present is incorrect or misleading. | "Not there, or wrong." |

Calibration note: under this scale, the PoC's straight-5 skill PRD should land mostly at **4** with
at most one or two 5s. If a panel still returns straight 5s for solid-but-improvable work, the scale
is not being applied; re-anchor against section 8 before trusting the numbers.

---

## 3. Universal criteria (scored for every skill in the family)

These two are the family spine; they are scored for every skill in addition to its per-skill
criteria.

- **specificity** (anti-mush): concrete to THIS scenario, not generic boilerplate that could be
  pasted onto any feature. A 5 names the actual entities, constraints, and numbers from the input;
  a 2 is reskinnable filler.
- **completeness**: fills every section the skill's Output Format / Quality Checklist requires, with
  no required area left as a stub. A 5 has no missing section and no thin section; a 3 covers the
  skeleton but leaves a required area underdeveloped.

A third family trait, **verifiability** (every item has a checkable pass/fail outcome), is scored
inside each skill's per-skill criteria below (where each checklist expresses it concretely) rather
than as a separate universal, to keep deliver-prd's criteria identical to the PoC calibration run.

---

## 4. Per-skill criteria

Each list is transcribed from that skill's own Quality Checklist (its stated contract). The judge
scores each criterion 1-5 on the section 2 scale, plus the two universals, plus a holistic overall.
The `key` is the machine name used by the harness schema (section 6).

### deliver-prd (matches the Phase 0 PoC exactly)
| key | criterion | what "5" requires |
|---|---|---|
| problem | Problem and "why now" clearly articulated | the specific pain and the timing trigger, grounded in the scenario |
| metrics | Success metrics specific and measurable | named metrics with baseline + target, traceable to the input (no invented numbers) |
| scope | Scope boundaries explicit (in / out / future) | all three buckets populated and non-trivial |
| requirements | Requirements testable and unambiguous | each requirement is verifiable; no "should be fast"-style mush |
| technical | Technical considerations surfaced, not over-specified | the real constraints named without prescribing the implementation |
| risks | Dependencies and risks documented with owners | a risk table where each row has an owner and a mitigation |

### deliver-acceptance-criteria
| key | criterion | what "5" requires |
|---|---|---|
| mapping | Criteria map to a specific story or feature slice | every criterion clearly belongs to the named slice |
| happy_path | Happy path covered first | the primary success path is explicit and leads |
| edge_error | Edge cases explicit and error states include user-visible recovery | not implied; each error names the recovery behavior |
| non_functional | Non-functional criteria included when relevant | perf / security / accessibility addressed where the scenario calls for it |
| testability | Each criterion testable with one clear outcome | a tester can mark each pass/fail unambiguously |
| no_impl_leak | No implementation details leak in | criteria describe behavior, not mechanism |

### deliver-user-stories
| key | criterion | what "5" requires |
|---|---|---|
| story_form | "As a / I want / so that" form | every story complete, with a real role and a real want |
| independent | Stories independent (INVEST) | buildable in any order; no hidden coupling |
| gwt | Acceptance criteria in Given/When/Then | each story carries G/W/T that actually fits the story |
| testability | Each criterion testable (verifiable pass/fail) | someone can confirm pass/fail without guessing |
| sprint_sized | Small enough for one sprint | no epic masquerading as a story |
| benefit | Benefit clause explains user value | the "so that" is a real user outcome, not a restatement |

### deliver-edge-cases
| key | criterion | what "5" requires |
|---|---|---|
| input_validation | All user inputs have validation edge cases | each input's invalid/boundary forms are listed |
| boundaries | Boundary conditions explicitly listed | the actual limits (min/max/empty/overflow) named |
| failures | Network / system failure scenarios covered | timeouts, partial failures, unavailability addressed |
| messages | Each error state has a defined user-facing message | the message text or intent is specified, not "show error" |
| recovery | Recovery paths specified, not just detection | what the system/user does next is defined |
| prioritized | Edge cases prioritized by likelihood and impact | a ranking or tiering, not a flat dump |

### deliver-launch-checklist
| key | criterion | what "5" requires |
|---|---|---|
| coverage | All functional areas represented | eng, design, marketing, support, legal, ops as the scenario warrants |
| ownership | Every item has an owner and target date | no orphan items |
| blockers | Blockers distinguished from nice-to-haves | a clear gating set |
| go_nogo | Go/No-Go criteria specific and measurable | objective thresholds, not vibes |
| rollback | Rollback plan documented (and tested) | concrete revert steps, not "roll back if needed" |
| cadence | Check-in cadence scheduled | named checkpoints with timing |

---

## 5. The negative control

The control arm is a **competent but thin freehand artifact**, NOT a strawman. The control subagent
is asked to produce the same artifact type for the same scenario using only general PM knowledge, no
skill, "in a few minutes." This isolates the skill's marginal value: a control that is obviously
broken would inflate the discrimination gap and prove nothing. The PoC validated this design (the
control scored 4 on surface criteria like problem framing and specificity, and the gap concentrated
on the rigor criteria: metrics, requirements, risks, completeness). A control that scores below ~2
on most criteria is a sign the control prompt has drifted toward a strawman; re-run it.

---

## 6. Judge protocol and structured output

Each judge is an independent subagent that receives both artifacts (labeled only "Artifact A" /
"Artifact B", order randomized per judge), the scenario, this rubric, and returns ONLY structured
output:

```
{
  "artifact_a": { "<criterion_key>": 1-5, ..., "specificity": 1-5, "completeness": 1-5, "overall": 1-5, "notes": "..." },
  "artifact_b": { ... same shape ... },
  "which_is_stronger": "A" | "B",
  "one_line_rationale": "..."
}
```

- Criterion keys are the per-skill keys from section 4 plus `specificity`, `completeness`, `overall`.
- `notes` is a short free-text justification (used to check construct validity: do independent
  judges cite the same reasons?).
- Judges must apply the section 2 anchor scale literally and score conservatively.

---

## 7. Aggregation, validity gates, and the pass bar

After un-blinding (map A/B back to skill/control per judge):

- **Per-criterion mean** across judges, for each arm.
- **Overall mean** across judges, for each arm.
- **Discrimination gap** = skill overall mean - control overall mean.
- **Agreement** = stdev of the skill arm's overall across judges.

**Validity gates (the eval must pass these before its skill score counts):**

| Gate | Target | If it fails |
|---|---|---|
| Discrimination | gap >= ~1.0 | the rubric or judges do not discriminate; the result is VOID (a finding about the instrument, not the skill) |
| Agreement | overall stdev <= ~0.7 | the rubric is ambiguous; tighten it before trusting scores |
| Human anchor (per family, once) | panel lands near the section 8 anchor | re-anchor the panel; suspect grade inflation |

**Skill pass bar** (only meaningful once the validity gates pass): overall mean >= **3.5/5** (family
bar), discrimination gap >= 1.0, agreement stdev <= 0.7, and no single criterion mean below **2.5**
without a logged reason. A criterion that fails the bar is the queue for a targeted skill-body
improvement (the F-12 mechanism, now for body quality).

---

## 8. Human anchor (maintainer to confirm)

Per the spec, a maintainer hand-scores 1-2 artifacts so we can confirm the panel lands near a human
judgment and is not inflating grades. This slot is set up but needs human sign-off; it is the one
step the harness cannot self-certify.

**Proposed anchor (deliver-prd, from the PoC scenario):** the PoC skill PRD was judged a straight
5.0 under the un-hardened scale. Under the section 2 hardened scale it should anchor at roughly
**4.3-4.6 overall**: solid, shippable, with minor improvable gaps (for example, the PoC noted
`requirements` at 4.33, already below ceiling). A maintainer should hand-score that artifact and
record the number here; if the panel returns >= 4.8 for the same artifact under the hardened scale,
the anchors are not being applied and the rubric wording in section 2 needs sharpening.

> Maintainer: replace this paragraph with your hand-scored anchor (artifact link + per-criterion
> scores + one line on why) once you have scored it. Until then, treat panel numbers as provisional.
