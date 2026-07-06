# discover-interview-synthesis - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.2.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointer to `discover-journey-map`; collision pair declared with new trigger fixtures. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-3 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 3) |
| 2.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Description rewrite for trigger accuracy (boundary disambiguation; 2026-06-09 audit, v2.26.0 Batch 0) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.2.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared `discover-journey-map` as a new collision pair for this skill in `scripts/trigger-eval-roster.yaml`, but the reciprocal "When NOT to Use" pointer was never added. The enforcing `check-reciprocal-boundary-pointers` gate caught the gap. Adds one bullet pointing to `discover-journey-map` for the case where synthesized findings are being mapped onto a customer journey. No other content change.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 3): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): the trigger-surface description was rewritten to disambiguate collision pairs with an explicit boundary pointer to the sibling skill. No body, template, or behavior changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
