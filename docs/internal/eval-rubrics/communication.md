# Output-eval rubric: the `communication` family

Status: v1 (2026-06-14). Family rubric for M-33 output-quality evals (see
`release-plans/v2.27.0/spec_output-quality-evals.md`). Sibling of `specification.md`; it
reuses that rubric's anchor scale, universal criteria, negative control, judge protocol, and
validity gates verbatim, and differs only in the per-skill criteria (section 4).

This family covers the audience-facing communication artifacts: `deliver-release-notes`
and, in a later wave, `foundation-stakeholder-update`.

> A communication artifact's defining trait is **audience translation**: it leads with the
> reader's benefit, not the internal change, stays jargon-free and scannable, and never lets
> internal detail (ticket IDs, code names, technical framing) leak to the reader. The
> freehand control tends to restate the changelog in technical terms; the skill should win on
> benefit-led framing and audience fit.

Per the sample-then-regression-trigger scope (spec section 8), this rubric ships with
per-skill criteria for the sampled skill first; the others are appended when first evaled.

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
  the actual features and user benefits from the input; a 2 is reskinnable filler.
- **completeness**: fills every section the skill's Output Format / Quality Checklist
  requires, with no required area left as a stub.

---

## 4. Per-skill criteria

Each list is transcribed from that skill's own Quality Checklist. The judge scores each
criterion 1-5 on the section 2 scale, plus the two universals. The `key` is the machine name
used by the harness schema (section 6).

### deliver-release-notes
| key | criterion | what "5" requires |
|---|---|---|
| highlights | Highlights feature the 1-3 most impactful changes | leads with what users will notice and care about most |
| benefit_led | Each item leads with user benefit, not the technical change | "you can now ..." framing, not "added X to the Y service" |
| accessible | Jargon-free, accessible language | a non-technical user understands every line |
| concise | Items concise (1-2 sentences each) | scannable; no bloated entries |
| bugfix_problem | Bug fixes name the problem that was solved | the user-visible problem, not "fixed a bug" |
| no_leak | No internal jargon, ticket IDs, or code names | every line reads as customer-facing; nothing internal leaks through |

> Append-on-first-eval (not yet authored): foundation-stakeholder-update (later wave).

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

A maintainer hand-scores 1-2 communication artifacts to confirm the panel lands near a human
judgment. This slot is set up but needs human sign-off.

**Recorded anchor (2026-06-15, deliver-release-notes):** maintainer hand-scored the
`anchor-artifacts-20260615/deliver-release-notes.md` artifact at **overall 3.5** (the lowest of the 7);
the blind panel scored it **4.46** (Δ **+0.96**). The maintainer's note: clean, readable, well-organized
user-facing comms (highlights, features, improvements, fixes, known issues, coming soon, feedback), but
generic and less operationally precise than the rest - it needs rollout caveats, eligibility,
platform/version specifics, and explicit user-action-needed where relevant. The panel over-credited by
nearly a point on a familiar artifact type. Panel absolutes on this family read ~0.5-1.0 hot (see
specification.md section 2 calibration); the discrimination gap is the primary signal.
