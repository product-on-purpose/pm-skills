# foundation-meeting-recap - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointers to `foundation-meeting-agenda` and `foundation-meeting-brief`; collision pairs declared with new trigger fixtures. |
| 1.0.3 | 2026-07-04 | v2.30.0 | M-35 | patch | Heading normalized to the skeleton-canon spelling ("Quality checklist" to "Quality Checklist"). |
| 1.0.2 | 2026-06-14 | - | C-5 | patch | Added reciprocal "When NOT to Use" body bullet pointing to discover-interview-synthesis (closes the C-5 reciprocity gap; 1.0.1 added only the description sentence) |
| 1.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Boundary sentence appended pointing to discover-interview-synthesis (2026-06-09 audit, v2.26.0 Batch 0) |
| 1.0.0 | 2026-04-17 | - | - | baseline | Prior published version |

## 1.1.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared both `foundation-meeting-agenda` and `foundation-meeting-brief` as new collision pairs for this skill in `scripts/trigger-eval-roster.yaml`, but neither reciprocal "When NOT to Use" pointer was added. The enforcing `check-reciprocal-boundary-pointers` gate caught both gaps. Adds one bullet pointing to `foundation-meeting-agenda` (pre-meeting structure) and one bullet pointing to `foundation-meeting-brief` (pre-meeting private prep), both distinguishing this skill's post-meeting scope. No other content change.

## 1.0.3 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

Heading-normalization sweep (WS-T8b): the 2026-07-04 deep audit found "Quality checklist" (lowercase c) as one of 11 catalog instances of the canon "Quality Checklist" heading drifting to a lowercase variant that evaded case-sensitive tooling. No content or behavior change.

## 1.0.2 (2026-06-14)

Reciprocity patch (C-5): added a "When NOT to Use" body bullet pointing to discover-interview-synthesis, the reciprocal of that skill's existing back-pointer. The 1.0.1 patch added only the description sentence; the C-5 reciprocal-boundary-pointer validator reads the body section, so the body bullet was still missing. Closing it lets the C-5 gate promote advisory -> enforcing. No template or behavior changes.

## 1.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): one boundary sentence appended, pointing cross-participant research synthesis to discover-interview-synthesis. No body, template, or behavior changes.

## 1.0.0 (2026-04-17)

Baseline row for the prior published version; see git history for its changes.
