# Output-eval rubric: the `discovery` family

Status: v1 (2026-06-14). Family rubric for M-33 output-quality evals (see
`release-plans/v2.27.0/spec_output-quality-evals.md`). Sibling of `specification.md`; it
reuses that rubric's anchor scale, universal criteria, negative control, judge protocol, and
validity gates verbatim, and differs only in the per-skill criteria (section 4).

This family covers the discovery skills, those that turn raw evidence about users and the
market into structured findings: `discover-interview-synthesis`,
`discover-competitive-analysis`, `discover-market-sizing`, `discover-journey-map`,
`discover-stakeholder-summary`.

> A discovery artifact's defining trait is **evidence discipline**: every claim is traced to
> its source (a participant, a competitor page, a data point), patterns are distinguished
> from one-offs, and confidence/limitations are stated honestly rather than papered over. The
> freehand control tends to assert findings without attribution and to skip the limitations;
> the skill should win on traceability and honest confidence.

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

- **specificity** (anti-mush): concrete to THIS scenario, not generic boilerplate. A 5 names
  the actual participants, competitors, segments, and numbers from the input; a 2 is
  reskinnable filler.
- **completeness**: fills every section the skill's Output Format / Quality Checklist
  requires, with no required area left as a stub.

---

## 4. Per-skill criteria

Each list is transcribed from that skill's own Quality Checklist. The judge scores each
criterion 1-5 on the section 2 scale, plus the two universals. The `key` is the machine name
used by the harness schema (section 6).

### discover-interview-synthesis
| key | criterion | what "5" requires |
|---|---|---|
| theme_evidence | Themes supported by evidence from 3+ participants | each theme cites multiple participants; frequency distinguished from one-offs |
| quotes | Quotes verbatim and attributed to participant IDs | real verbatim quotes, attributed, that illustrate the insight (not paraphrased) |
| insight_why | Insights explain "why," not just "what" | interpretation that connects an observation to an underlying need, beyond "users said X" |
| recommendations | Recommendations specific and actionable | prioritized actions, each tied to an insight, with confidence by evidence strength |
| pii_protected | Participant identities protected (no PII) | IDs / segments only, no raw names or identifying detail |
| limitations | Limitations and biases acknowledged | names sample bias, what was not learned, where more research is needed |

### discover-competitive-analysis
| key | criterion | what "5" requires |
|---|---|---|
| scope | Scope clearly defined (market, segment, use case) | names the market / segment / use-case under analysis, not generic |
| competitor_set | 3-5 competitors incl. direct and indirect | a deliberate set spanning direct, indirect, and potential disruptors |
| feature_matrix | Feature comparison on customer-relevant capabilities | a comparison grid focused on what target customers care about, with consistent ratings |
| positioning | Positioning map uses meaningful, differentiated dimensions | axes that matter to the market; identifies white space |
| recommendations | Strategic recommendations specific and actionable | where to compete head-on vs differentiate, tied to the gaps and white space |
| sources_confidence | Sources and confidence documented; competitor strengths honest | verified-vs-inferred marked; genuine competitor strengths acknowledged, no dismissiveness |

> Append-on-first-eval (not yet authored): discover-market-sizing, discover-journey-map,
> discover-stakeholder-summary.

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

A maintainer hand-scores 1-2 discovery artifacts to confirm the panel lands near a human
judgment. This slot is set up but needs human sign-off.

**Recorded anchor (2026-06-15, discover-interview-synthesis):** maintainer hand-scored the
`anchor-artifacts-20260615/discover-interview-synthesis.md` artifact at **overall 4.5**; the blind panel
scored it **4.92** (Δ **+0.42**, the closest of the 7 - this family's instrument is the best-calibrated).
The maintainer's note: strongest artifact in the set, senior-PM-level synthesis connecting evidence to
themes/insights/recommendations with the sample limitation named; not a 5 because the sample is small and
the recommendations should be split more sharply into immediate product changes vs. validation work (a
"decision implications" section: do now / do not do yet / needs validation). Panel absolutes on this
family read ~0.5 hot (see specification.md section 2 calibration); the discrimination gap is the primary signal.
