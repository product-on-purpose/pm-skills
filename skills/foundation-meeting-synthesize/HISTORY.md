# foundation-meeting-synthesize - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointer to `discover-interview-synthesis`; collision pair declared with new trigger fixtures. |
| 1.0.2 | 2026-07-04 | v2.30.0 | M-35 | patch | Heading normalized to the skeleton-canon spelling ("Quality checklist" to "Quality Checklist"). |
| 1.0.1 | 2026-04-22 | v2.11.1 | - | baseline | Prior published version: cross-meeting archaeology surfacing patterns, trajectories, and contradictions across multiple recaps. Bumped from 1.0.0 for a description YAML colon-truncation fix; no HISTORY.md was created at the time. |

## 1.1.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared `discover-interview-synthesis` as a new collision pair for this skill in `scripts/trigger-eval-roster.yaml`. The existing "When NOT to Use" bullet already named the right boundary, but the pointer was written as `/discover-interview-synthesis` with a leading slash, a form the enforcing `check-reciprocal-boundary-pointers` gate's pointer regex does not recognize. Normalized to the plain `discover-interview-synthesis` form already used by the section's other two bullets, closing the gap without adding a duplicate line. No other content change.

## 1.0.2 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

Heading-normalization sweep (WS-T8b): the 2026-07-04 deep audit found "Quality checklist" (lowercase c) as one of 11 catalog instances of the canon "Quality Checklist" heading drifting to a lowercase variant that evaded case-sensitive tooling. No content or behavior change.

## 1.0.1 (2026-04-22)

Released in [v2.11.1](../../site/src/content/docs/releases/Release_v2.11.1.md).

Initial published behavior: cross-meeting archaeology consuming multiple meeting recaps (or raw notes) over a period, surfacing patterns invisible in any single meeting - decision evolution, stakeholder position tracking, contradiction flags, and prioritized follow-ups.

### Contract established
- Plain-text timeline plus themes with confidence markers
- Consolidated decision list and contradiction flags with before/after source citations
- Output: narrative summary and prioritized follow-ups
