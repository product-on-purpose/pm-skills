# deliver-acceptance-criteria - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.1 | 2026-10-16 | v2.34.0 | - | patch | When NOT to Use gains a pointer for criteria stated as a rate over model output, to `deliver-prd`'s AI Behavior and Evaluation section. No change to the criteria this skill writes. |
| 1.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-1 | minor | Quality convergence: When NOT to Use section (F-12 Batch 1) |
| 1.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Description rewrite for trigger accuracy (boundary disambiguation; 2026-06-09 audit, v2.26.0 Batch 0) |
| 1.0.0 | 2026-03-22 | - | - | baseline | Prior published version |

## 1.1.1 (2026-10-16)

Released in [v2.34.0](../../site/src/content/docs/releases/Release_v2.34.0.md), under ruling R2 (distributional acceptance gets a designed-sample rule in `deliver-prd`) in its release plan.

A criterion such as "90% of answers are faithful to their sources" is a rate over model output, and a Given/When/Then scenario describes one case, not a share across many. The When NOT to Use section now routes it to `deliver-prd` 3.1.0, whose evaluation guidance says a rate can be verified only by a designed sample. Until one exists, the rate is kept with its verification marked unresolved. Boundary pointer only; the skill's output is unchanged.

## 1.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 1): added a "When NOT to Use" section with boundary pointers to neighboring skills (the Output Contract already enumerated its groupings). No template or example changes.

## 1.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): the trigger-surface description was rewritten to disambiguate collision pairs with an explicit boundary pointer to the sibling skill. No body, template, or behavior changes.

## 1.0.0 (2026-03-22)

Baseline row for the prior published version; see git history for its changes.
