# define-prioritization-framework - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Added a "When NOT to Use" section with five reciprocal boundary pointers, including the bidirectional edge back to `define-opportunity-tree` (which already pointed here). Closes a one-way gap in the cross-skill reciprocity mesh flagged by the 2026-07-04 deep audit. Also normalized the "Output format" and "Quality checklist" headings to their canon spelling (WS-T8b, no re-bump). |
| 1.0.0 | 2026-05-21 | v2.18.0 | - | baseline | Prior published version: runs the applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability, surfacing where rankings agree and diverge plus an executive recommendation. |

## 1.1.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found this skill had no "When NOT to Use" section at all, and that `define-opportunity-tree`'s existing pointer to it was one-directional (opportunity-tree pointed here; nothing pointed back). This release adds the section and closes that edge.

### Changes
- Added a "When NOT to Use" section with pointers to `define-opportunity-tree`, `define-hypothesis`, `measure-experiment-design`, `discover-market-sizing`, `deliver-launch-checklist`, and `discover-interview-synthesis`.
- The `define-opportunity-tree` <-> `define-prioritization-framework` edge is now bidirectional (opportunity-tree required no edit; it already pointed here).
- Heading-normalization sweep (WS-T8b, folded into this same v2.30.0 row rather than a separate bump): "Output format" to "Output Format" and "Quality checklist" to "Quality Checklist", two of the catalog's drifted heading-spelling instances the 2026-07-04 deep audit flagged.

No change to the framework-scoring flow, refusal protocols, or output contract.

## 1.0.0 (2026-05-21)

Released in [v2.18.0](../../site/src/content/docs/releases/Release_v2.18.0.md).

Initial release: runs all applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability and context, then produces a cross-framework comparison and an executive recommendation. Kano is gated on customer research; missing inputs produce an estimation scaffold rather than fabricated scores.

### Contract established
- Filters frameworks by applicability rather than reducing to one
- Refuses to fabricate scores; produces an estimation scaffold when input data is missing
- Output: per-framework scoring tables, cross-framework comparison, executive summary, sensitivity analysis
