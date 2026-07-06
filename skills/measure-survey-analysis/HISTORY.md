# measure-survey-analysis - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.2.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointers to `discover-journey-map` and `measure-experiment-results`; collision pairs declared with new trigger fixtures. |
| 1.1.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Added a "When NOT to Use" section with a reciprocal pointer back to `discover-interview-synthesis`, which already deflected here without a return edge. Closes a one-way gap in the cross-skill reciprocity mesh flagged by the 2026-07-04 deep audit. Also normalized the "Output format" and "Quality checklist" headings to their canon spelling (WS-T8b, no re-bump). |
| 1.0.0 | 2026-05-21 | v2.18.0 | - | baseline | Prior published version: analyzes survey results into persona segmentation, hypothesis validation, open-text thematic clustering, qualitative confidence labels, and prioritized recommendations, with explicit what-the-data-does-NOT-show warnings. |

## 1.2.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared both `discover-journey-map` and `measure-experiment-results` as new collision pairs for this skill in `scripts/trigger-eval-roster.yaml`, but neither reciprocal "When NOT to Use" pointer was added. The enforcing `check-reciprocal-boundary-pointers` gate caught both gaps. Adds one bullet pointing to `discover-journey-map` (mapping findings onto a customer journey rather than analyzing the survey) and one bullet pointing to `measure-experiment-results` (a completed controlled experiment rather than a survey instrument). No other content change.

## 1.1.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found `discover-interview-synthesis` deflecting to this skill ("Your data is survey responses rather than interviews -> use `measure-survey-analysis`") with no pointer back, a one-directional edge the reciprocity gate could not see because the pair was never a declared collision pair.

### Changes
- Added a "When NOT to Use" section, first bullet pointing back to `discover-interview-synthesis`, closing the reciprocal edge.
- Additional pointers to `measure-experiment-design` (causal inference), `measure-okr-grader` (objective grading vs. standalone survey analysis), and `define-prioritization-framework` (ranking vs. analysis).
- Heading-normalization sweep (WS-T8b, folded into this same v2.30.0 row rather than a separate bump): "Output format" to "Output Format" and "Quality checklist" to "Quality Checklist", two of the catalog's drifted heading-spelling instances the 2026-07-04 deep audit flagged.

No change to the methodology-audit flow, refusal protocols, or output contract.

## 1.0.0 (2026-05-21)

Released in [v2.18.0](../../site/src/content/docs/releases/Release_v2.18.0.md).

Initial release: analyzes survey results into actionable PM insights - persona segmentation, hypothesis validation status, thematic clustering of open-text responses, statistical confidence labels, and prioritized recommendations. Refuses to overstate statistical significance from weak samples or biased instruments.

### Contract established
- Refuses to overstate statistical significance from small samples or biased instruments
- Every hypothesis gets a status, including "Not tested by this survey"
- Output: methodology audit, per-question analysis, thematic clustering, hypothesis validation, prioritized recommendations
