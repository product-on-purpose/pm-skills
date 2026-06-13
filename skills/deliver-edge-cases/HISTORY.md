# deliver-edge-cases - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.1.1 | 2026-06-13 | - | M-31-B1 | patch | Trigger-recall fix: added intent-synonyms (failure modes, what can go wrong, race conditions, boundary/limit scenarios) to the description and When to Use; boundary pointers unchanged |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-1 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 1) |
| 2.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Description rewrite for trigger accuracy (boundary disambiguation; 2026-06-09 audit, v2.26.0 Batch 0) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.1.1 (2026-06-13)

Trigger-recall patch (M-31 finding B1): the trigger-eval baseline confirmed under-triggering on intent-only phrasings (no literal "edge case" keyword) on both Haiku (50% validation) and Sonnet (63% validation). The description and the "When to Use" section now name the common synonyms explicitly - failure modes, what can go wrong, race conditions, timeouts, and boundary or limit scenarios - so the router recognizes the domain when expressed in user language. Boundary pointers to deliver-acceptance-criteria, deliver-prd, iterate-lessons-log, and deliver-launch-checklist are unchanged. No body, template, or example changes beyond the one added "When to Use" bullet.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 1): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): the trigger-surface description was rewritten to disambiguate collision pairs with an explicit boundary pointer to the sibling skill. No body, template, or behavior changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
