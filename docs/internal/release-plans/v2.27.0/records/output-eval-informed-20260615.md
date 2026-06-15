# Informed-control + VOID re-look run (2026-06-15)

Three-arm output-quality eval (run `wf_488ca001-61d`, **G=3 / N=3 Sonnet judges**, the re-anchored
scale): **skill** (real SKILL.md instructions + template + scenario) vs **informed** (template only) vs
**freehand** (scenario only). This closes codex adversarial review finding 2 (the informed control) and
re-looks the 3 VOID instruments from the 2026-06-14 batch on stronger scenarios (Step 2 + Step 3). 32
agents, ~0.96M subscription tokens, ~6.5 min. Raw output: `output-eval-informed-20260615.raw.json`.

## Headline

| Skill | Scenario | Verdict | Skill | vs Freehand (gap) | vs Informed (gap) | Agree | Pref |
|---|---|---|---|---|---|---|---|
| foundation-okr-writer | activation-quarter | **pass-structural** | 4.54 | 2.38 (**+2.17** PASS) | 4.50 (**+0.04** fail) | 0.29 | 2/3 |
| develop-adr | event-streaming (new) | **pass-structural** | 4.50 | 3.21 (**+1.29** PASS) | 4.54 (**-0.04** fail) | 0.18 | 1/3 |
| measure-experiment-design | paywall-pricing (new) | **pass-structural** | 4.42 | 3.21 (**+1.21** PASS) | 4.58 (**-0.17** fail) | 0.41 | 1/3 |
| deliver-release-notes | api-v4-breaking (new) | **void** | 4.17 | 3.71 (**+0.46** fail) | 4.08 (**+0.08** fail) | 0.16 | 2/3 |

`pass-structural` = beats the freehand control but the rigor premium over the template-only informed
control is below 0.5 (`gateVerdict3`). `void` = does not even clear the freehand gate.

## The headline finding: the skills' measured value is STRUCTURE, not added RIGOR

In all four cases the **informed control (template only, no skill instructions) tied or beat the full
skill** (gaps +0.04, -0.04, -0.17, +0.08). The per-criterion deltas are within single-judge noise (mostly
+/-0.3 = one judge moving one point), with one telling exception:
- **measure-experiment-design `sample_size`: skill 3.7 vs informed 5.0** (informed better by 1.3), and
  `guardrails` 4.3 vs 5.0. On the exact rigor dimensions where the skill should dominate, the template-only
  control matched or beat it - and the skill's sample-size math was the *weaker* of the two (consistent
  with the 2026-06-14 note that the skill arm's sample-size draw is noisy).

So for these PM artifact types, under a capable generation model, the skill's **template (the section
structure) carries essentially all the measured artifact-quality value; the prose instructions add little
or nothing on top.** Hand a competent PM the template and they produce work the panel cannot distinguish
from the full-skill output. This is the sharper question the freehand control could not answer: a PASS
vs freehand was real but coarse (it bundled structure + rigor); the informed control separates them and
shows the value is structural.

### Caveats (this is a finding about the instrument and the artifact types, not a verdict that the skills are worthless)

1. **The template IS the skill's distilled methodology.** The informed control reading the template gets
   the skill's structural thinking - the section contract is where much of the skill's value was always
   meant to live. "Template carries the value" largely means "the skill's value is in its template," which
   is a legitimate place for it to be, not a defect.
2. **Rubric circularity.** The rubric criteria are transcribed from each skill's own Quality Checklist /
   Output Format, so the rubric rewards template-conformance - which the informed control gets for free.
   A rubric that measures "did you fill the right sections" will rate template-only work highly by
   construction. This bounds how much the informed-control gap can ever open for a well-templated skill.
3. **What the artifact-quality eval does NOT measure:** triggering (does the right skill fire), boundaries
   (when NOT to use), robustness on messy/edge input, and coaching - all real skill value this single-shot
   artifact eval ignores. The trigger evals (M-31) cover routing; nothing yet covers the rest.
4. **Model strength.** Sonnet fills a template well freehand. A weaker model might lean on the prose
   instructions more, so the "template is enough" result is conditioned on a capable generation model.

**Net:** the defensible quality claim is "**using a pm-skill produces materially better artifacts than
freehand** (the freehand gaps are +1.2 to +2.2 where the scenario discriminates), **and that value is
primarily the skill's structure**." It is NOT supported to claim the prose instructions add rigor a good
template alone would not, for these artifact types under a strong model.

## Step 3: the VOID re-look (stronger scenarios)

The 2026-06-14 batch VOIDed three skills on a sub-1.0 freehand gap and called them instrument findings
(weak scenario, not skill failure). The stronger scenarios test that:
- **develop-adr** (event-streaming: 3 high-tension options + honest negative consequences): freehand gap
  **0.92 -> 1.29**. Confirmed - a harder scenario makes the skill clearly beat a freehand control. The
  original VOID was a weak-scenario instrument finding.
- **measure-experiment-design** (paywall-pricing: low-base-rate sample-size + guardrail trap): freehand gap
  **0.21 -> 1.21**, a large jump. Confirmed - the original VOID was overwhelmingly a weak-scenario finding.
  (The skill still ties the informed control and is weaker on the sample-size math; see above.)
- **deliver-release-notes** (api-v4-breaking: breaking change + security fix + eligibility + leak traps):
  freehand gap **0.83 -> 0.46**, still VOID. Even a deliberately harder scenario did not open the gap - a
  strong model writes decent release notes freehand, so this artifact type has genuinely low marginal skill
  value. This is a real instrument/artifact-type limit, not fixed by a harder scenario.

## Re-anchoring confirmation (Step 1 follow-through)

This run used the re-anchored scale (the judge is now told a straight-5.0 across all criteria is almost
always wrong; default solid work to 4). Effect on the ceiling: **foundation-okr-writer fell from a straight
5.00 (2026-06-14 + the 2026-06-15 anchor run) to 4.54** here - the judges spread their scores and stopped
ceilinging. That is much closer to the maintainer's hand-score of **4.0** (residual +0.54 vs the +1.00
before re-anchoring). The re-anchoring measurably reduced grade inflation; a small residual remains.

## Status and implications

- **Step 2 (informed control): DONE.** Implemented + run; the finding above is recorded.
- **Step 3 (VOID re-look): DONE.** develop-adr and measure-experiment-design were weak-scenario instrument
  findings (now beat freehand on stronger scenarios); deliver-release-notes is a genuine low-marginal-value
  artifact type (stays VOID even on a harder scenario).
- **Program implication:** the output-eval quality claim should be stated as structure-primarily, with the
  rubric-circularity + model-strength caveats. This does not block the v2.27.0 tag (the user-facing release
  content is the trigger/collision/reciprocity/asset GATES + the instruments; the eval RESULTS stay
  internal evidence), but it is the most important thing the program has learned and should shape how the
  skills are described and where future skill investment goes (templates + triggers + boundaries over
  longer prose instructions, for artifact types like these).
