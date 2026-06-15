# Human anchor scoring sheet (P1-5) - 2026-06-15 anchor run

Status: **SCORED 2026-06-15** (maintainer hand-scores recorded; calibration complete). This was the one
step the harness cannot self-certify (`spec_output-quality-evals.md` section 1, "Human anchoring").

## Results: the panel runs ~0.5-1.0 hot (grade inflation confirmed)

The maintainer hand-scored all 7 artifacts. The Sonnet panel over-scored on every one (mean Δ +0.77;
6 of 7 over the +0.5 re-anchor threshold). A straight panel 5.00 corresponds to a human ~4.0.

| Skill | Panel overall | Human overall | Δ (panel - human) | Over +0.5? |
|---|---|---|---|---|
| foundation-okr-writer | 5.00 | 4.0 | +1.00 | yes |
| deliver-edge-cases | 5.00 | 4.0 | +1.00 | yes |
| deliver-release-notes | 4.46 | 3.5 | +0.96 | yes |
| iterate-retrospective | 4.92 | 4.0 | +0.92 | yes |
| develop-adr | 4.58 | 4.0 | +0.58 | yes |
| measure-okr-grader | 5.00 | 4.5 | +0.50 | yes (at threshold) |
| discover-interview-synthesis | 4.92 | 4.5 | +0.42 | no |

**Re-anchor decision (DECIDED 2026-06-15):** the human anchor is now the calibration reference. The
shared anchor scale (`docs/internal/eval-rubrics/specification.md` section 2) carries a calibration note
that a Sonnet panel runs ~0.5-1.0 optimistic and a straight-5.0 is almost never literally correct; panel
absolute numbers are read as "~0.5-1.0 hot," and the discrimination GAP (skill - control), not the
absolute, remains the primary signal. Each family rubric's Section 8 records its skill's human anchor.
The maintainer's per-artifact fix-notes are applied to the artifacts themselves (see `anchor-artifacts-20260615/`).

The original blank scoring form follows (the panel reference at the bottom now carries the recorded scores).

## Source
Gated Sonnet anchor run (Run ID `wf_c1261234-93a`), **G=1 / N=3 blind Sonnet judges**, one skill per
sampled family. G=1 means there is no draft averaging: the artifact you read is the EXACT draft all
three judges scored. Verbatim run output (panel scores + artifacts) is at
`output-eval-anchor-20260615.raw.json`; each artifact is also rendered under `anchor-artifacts-20260615/`.

## How to score (about 10 minutes)
1. For each skill, open its artifact (linked), read it, and give an **OVERALL 1-5** on the scale below
   (required). The per-criterion line is optional but most valuable for the 3 PRIORITY skills.
2. Score **BLIND**: do not open the "Panel reference" section at the bottom until after you score.
3. Then either edit this file with your numbers or just tell me them in chat; I record them into each
   family rubric's Section 8 and compute the panel-vs-you delta.

## The hardened anchor scale
| Score | Anchor | Test |
|---|---|---|
| **5 - Exceptional** | Nothing a senior PM would add or change. Notable rigor. Rare by design. | "I cannot improve this." |
| **4 - Solid** | Meets it well; a reviewer might suggest one minor improvement but would ship as-is. | "Ship it; one small nit." |
| **3 - Adequate** | Meets the baseline, but a real gap a reviewer would close before shipping. | "Fix one thing first." |
| **2 - Thin** | Partially addresses it. Generic or missing substance. Needs rework. | "Another pass." |
| **1 - Absent/wrong** | Unaddressed, or what is present is incorrect or misleading. | "Not there, or wrong." |

---

## 1. foundation-okr-writer (framing) - **PRIORITY (panel: straight 5.00)**

Artifact: [`anchor-artifacts-20260615/foundation-okr-writer.md`](anchor-artifacts-20260615/foundation-okr-writer.md)  |  scenario: `skills/foundation-okr-writer/evals/output-scenarios/activation-quarter.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: objective_quality __ / outcome_krs __ / kr_measurability __ / guardrails __ / no_fabrication __ / integrity_audit __ / specificity __ / completeness __

---

## 2. deliver-edge-cases (specification) - **PRIORITY (panel: straight 5.00)**

Artifact: [`anchor-artifacts-20260615/deliver-edge-cases.md`](anchor-artifacts-20260615/deliver-edge-cases.md)  |  scenario: `skills/deliver-edge-cases/evals/output-scenarios/file-upload.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: input_validation __ / boundaries __ / failures __ / messages __ / recovery __ / prioritized __ / specificity __ / completeness __

---

## 3. measure-okr-grader (measurement) - **PRIORITY (panel: straight 5.00)**

Artifact: [`anchor-artifacts-20260615/measure-okr-grader.md`](anchor-artifacts-20260615/measure-okr-grader.md)  |  scenario: `skills/measure-okr-grader/evals/output-scenarios/activation-q3-close.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: type_aware_scoring __ / evidence_quality __ / guardrail_separation __ / no_retro_adjust __ / learning_synthesis __ / next_cycle __ / specificity __ / completeness __

---

## 4. discover-interview-synthesis (discovery)

Artifact: [`anchor-artifacts-20260615/discover-interview-synthesis.md`](anchor-artifacts-20260615/discover-interview-synthesis.md)  |  scenario: `skills/discover-interview-synthesis/evals/output-scenarios/onboarding-interviews.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: theme_evidence __ / quotes __ / insight_why __ / recommendations __ / pii_protected __ / limitations __ / specificity __ / completeness __

---

## 5. develop-adr (technical) - (panel VOID, gap < 1.0)

Artifact: [`anchor-artifacts-20260615/develop-adr.md`](anchor-artifacts-20260615/develop-adr.md)  |  scenario: `skills/develop-adr/evals/output-scenarios/search-datastore.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: title_status __ / context __ / decision __ / consequences __ / alternatives __ / standalone __ / specificity __ / completeness __

---

## 6. iterate-retrospective (learning)

Artifact: [`anchor-artifacts-20260615/iterate-retrospective.md`](anchor-artifacts-20260615/iterate-retrospective.md)  |  scenario: `skills/iterate-retrospective/evals/output-scenarios/sprint-42.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: balanced __ / action_items __ / prioritized __ / prev_actions __ / inclusive __ / standalone __ / specificity __ / completeness __

---

## 7. deliver-release-notes (communication) - (panel VOID, gap < 1.0)

Artifact: [`anchor-artifacts-20260615/deliver-release-notes.md`](anchor-artifacts-20260615/deliver-release-notes.md)  |  scenario: `skills/deliver-release-notes/evals/output-scenarios/mobile-v3.md`

Your score:

- **OVERALL (1-5): ____**
- One-line note: ____
- (optional) per-criterion: highlights __ / benefit_led __ / accessible __ / concise __ / bugfix_problem __ / no_leak __ / specificity __ / completeness __

---

## Panel reference (REVEAL ONLY AFTER YOU SCORE)

<details>
<summary>Click to reveal the blind panel's scores (do not peek until you have scored above)</summary>

| # | Skill | Panel overall | Control | Gap | Agreement | Blind pref | Verdict | Your overall | Delta (panel - you) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | foundation-okr-writer | **5.00** | 2.42 | 2.58 | 0.00 | 3/3 | pass | 4.0 | +1.00 |
| 2 | deliver-edge-cases | **5.00** | 2.75 | 2.25 | 0.00 | 3/3 | pass | 4.0 | +1.00 |
| 3 | measure-okr-grader | **5.00** | 3.38 | 1.63 | 0.00 | 3/3 | pass | 4.5 | +0.50 |
| 4 | discover-interview-synthesis | **4.92** | 3.33 | 1.58 | 0.06 | 3/3 | pass | 4.5 | +0.42 |
| 5 | develop-adr | **4.58** | 4.13 | 0.46 | 0.12 | 3/3 | void-inconclusive | 4.0 | +0.58 |
| 6 | iterate-retrospective | **4.92** | 3.67 | 1.25 | 0.06 | 3/3 | pass | 4.0 | +0.92 |
| 7 | deliver-release-notes | **4.46** | 3.92 | 0.54 | 0.26 | 3/3 | void-inconclusive | 3.5 | +0.96 |

Per-criterion panel scores (skill arm):

- **foundation-okr-writer**: objective_quality 5.00, outcome_krs 5.00, kr_measurability 5.00, guardrails 5.00, no_fabrication 5.00, integrity_audit 5.00, specificity 5.00, completeness 5.00
- **deliver-edge-cases**: input_validation 5.00, boundaries 5.00, failures 5.00, messages 5.00, recovery 5.00, prioritized 5.00, specificity 5.00, completeness 5.00
- **measure-okr-grader**: type_aware_scoring 5.00, evidence_quality 5.00, guardrail_separation 5.00, no_retro_adjust 5.00, learning_synthesis 5.00, next_cycle 5.00, specificity 5.00, completeness 5.00
- **discover-interview-synthesis**: theme_evidence 4.33, quotes 5.00, insight_why 5.00, recommendations 5.00, pii_protected 5.00, limitations 5.00, specificity 5.00, completeness 5.00
- **develop-adr**: title_status 4.33, context 4.33, decision 5.00, consequences 4.67, alternatives 3.67, standalone 5.00, specificity 5.00, completeness 4.67
- **iterate-retrospective**: balanced 5.00, action_items 5.00, prioritized 4.33, prev_actions 5.00, inclusive 5.00, standalone 5.00, specificity 5.00, completeness 5.00
- **deliver-release-notes**: highlights 4.00, benefit_led 4.33, accessible 4.33, concise 3.67, bugfix_problem 4.67, no_leak 5.00, specificity 4.67, completeness 5.00

</details>
