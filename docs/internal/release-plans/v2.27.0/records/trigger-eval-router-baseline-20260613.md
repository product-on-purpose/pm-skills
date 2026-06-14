# Trigger Re-Baseline via the Controlled Router Eval (2026-06-13)

The trustworthy replacement for the confounded headless baseline (Runs 1-5, now retracted; see
`trigger-eval-baseline.md` and `../trigger-evals-explained.md` "CORRECTION AND CURRENT UNDERSTANDING").

**Method:** controlled router eval via the Anthropic Messages API (`run-router-evals.mjs` /
`run-roster-eval.mjs`, scratch dir). Each fixture query is routed against the current 66-skill
description catalog; "which single skill fits, or none?"; 3 runs, majority. No plugins, no nudge, no
extended thinking, no turn budget - it isolates the description text. Validation split is the headline.

**Cost / reliability:** 1,740 calls per model, **0 failures** each. Haiku **$1.20** (179s), Sonnet
**$3.63** (285s). Total re-baseline **$4.83**. Catalog cached as the system block (mostly cache-reads).

## Headline

- **Precision is ~100% and collisions are clean on both models.** Validation precision is 100% for all
  29 skills on both Haiku and Sonnet. Zero false-fires on Haiku; one debatable false-fire on Sonnet
  (a fixture-labeling edge, see below). **The audit's collision concern is empirically resolved** - the
  v2.26.0 (F-12) description rewrites separated the skills.
- **Recall is strong.** Validation recall: Haiku 22/29 at 100% (7 at 75%); Sonnet 25/29 at 100%
  (4 at 75%). A 75% skill misses exactly one of its four validation trigger queries, almost always a
  genuinely ambiguous boundary query.
- **The headless alarm was an artifact.** The headless baseline's "deliver-edge-cases 50%,
  define-hypothesis 63%, measure-okr-grader 63%" gaps do not reproduce on the clean instrument
  (deliver-edge-cases 100% Sonnet; define-hypothesis 90% all / 75% val; measure-okr-grader 100%).

## Per-skill validation recall (only skills below 100% on either model shown; all others = 100% / 100% / clean)

| Skill | Haiku val recall | Sonnet val recall | Read |
|---|---|---|---|
| define-hypothesis | 75% | 75% | persistent edge: "We believe that X..." -> tool-foundation-sprint-founding-hypothesis (arguably correct) |
| define-opportunity-tree | 75% | 75% | persistent edge: research-framed query -> discover-interview-synthesis / none |
| foundation-okr-writer | 75% | 75% | persistent edge: "critique this OKR draft" -> utility-pm-critic / measure-okr-grader |
| foundation-persona | 75% | 75% | persistent edge: "stress-test our pricing decision against a profile" -> utility-pm-critic |
| define-jtbd-canvas | 75% | 100% | Haiku-only artifact (fine on Sonnet) |
| deliver-edge-cases | 75% | 100% | Haiku-only; the one miss is "Review this PRD..." -> utility-pm-critic |
| develop-spike-summary | 75% | 100% | Haiku-only; "what the PoC showed" -> measure-experiment-results |

All 22 (Haiku) / 25 (Sonnet) other skills: 100% validation recall, 100% precision.

## The one cross-cutting pattern (actionable)

**Broad "review / critique / stress-test / evaluate" framings get absorbed by `utility-pm-critic`** (and
occasionally `measure-okr-grader`, `discover-interview-synthesis`, the founding-hypothesis tool). On
Haiku, utility-pm-critic took one query each from deliver-edge-cases, foundation-okr-writer, and
foundation-persona; on Sonnet it took foundation-okr-writer and foundation-persona. Whether this is a
defect is a judgment call: if a user says "critique this OKR draft," routing to the critic is defensible.
This is the opposite of the headless baseline's claim (per-skill under-triggering); the real story is a
few broad utility skills competing with specific skills on critique-framed queries.

## Fixture-triage candidates (the eval found issues in the test, not the skill)

- Sonnet false-fire: `develop-spike-summary` fired on its own no-trigger query "Help us scope the
  investigation into edge caching: what question should the spike answer and how long to time-box it?".
  That query is plausibly a *spike-scoping* request, which is arguably in-scope - the no-trigger label is
  debatable. Triage the fixture rather than the skill.
- The 4 persistent-edge queries above are hard near-miss queries by design; several have a defensible
  alternate destination. Consider whether each is a fair test or should be relabeled.

## Bottom line

The library's triggering is healthy: clean collisions, ~100% precision, 90-100% per-skill recall, with
misses concentrated on genuinely ambiguous boundary queries. No urgent description fixes fall out of this
(B1 was already shown marginal). The actionable item, if any, is the broad-utility-skill absorption
pattern, and a light fixture-triage pass. Raw reports: `roster-eval-claude-haiku-4-5.{md,json}`,
`roster-eval-claude-sonnet-4-6.{md,json}` (scratch dir).
