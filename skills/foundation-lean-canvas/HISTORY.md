# foundation-lean-canvas - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointer to `define-hypothesis`; collision pair declared with new trigger fixtures. |
| 1.0.0 | 2026-04-15 | v2.11.0 | F-26 | baseline | Prior published version: one-page business thesis across nine interlocking blocks (problem, customer, UVP, solution, channels, revenue, cost, metrics, unfair advantage) with optional HTML/SVG visual rendering. |

## 1.1.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared `define-hypothesis` as a new collision pair for this skill in `scripts/trigger-eval-roster.yaml`, but the reciprocal "When NOT to Use" pointer was never added. The enforcing `check-reciprocal-boundary-pointers` gate caught the gap. Adds one bullet pointing to `define-hypothesis` for testing one assumption in isolation rather than stress-testing the whole business model. No other content change.

## 1.0.0 (2026-04-15)

Released in [v2.11.0](../../site/src/content/docs/releases/Release_v2.11.0.md). Effort: F-26.

Initial release: produces a one-page lean canvas across nine interlocking blocks (problem, customer, UVP, solution, channels, revenue, cost, metrics, unfair advantage), with optional inline HTML and SVG visual rendering. Acts as a strategic hub that cross-links to deeper PM skills without duplicating them.

### Contract established
- Nine canonical Maurya blocks in fixed order, each with a confidence tag and rationale
- Content mode (markdown canvas) and visual mode (self-contained HTML file, no external dependencies)
- Evidence and Confidence section distinguishing Validated / Assumed / Open Questions / Governance
