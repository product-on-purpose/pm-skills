# discover-market-sizing - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Added a "When NOT to Use" section with four reciprocal boundary pointers, closing a gap in the cross-skill reciprocity mesh flagged by the 2026-07-04 deep audit. Also normalized the "Output format" and "Quality checklist" headings to their canon spelling (WS-T8b, no re-bump). |
| 1.0.0 | 2026-05-21 | v2.18.0 | - | baseline | Prior published version: estimates market opportunity (TAM, SAM, SOM) via multiple sizing frameworks, triangulating where they converge and diverge, producing a calibrated range with source-graded confidence labels. |

## 1.1.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found this skill had no "When NOT to Use" section at all, leaving its boundary against `define-prioritization-framework`, `discover-competitive-analysis`, and `foundation-persona` unstated.

### Changes
- Added a "When NOT to Use" section naming the internal-tool-ROI non-use case (already implied by the existing "Scope" note in Core principle) plus pointers to `define-prioritization-framework`, `discover-competitive-analysis`, and `foundation-persona`.
- Heading-normalization sweep (WS-T8b, folded into this same v2.30.0 row rather than a separate bump): "Output format" to "Output Format" and "Quality checklist" to "Quality Checklist", two of the catalog's drifted heading-spelling instances the 2026-07-04 deep audit flagged.

No change to the sizing-framework flow, refusal protocols, or output contract.

## 1.0.0 (2026-05-21)

Released in [v2.18.0](../../site/src/content/docs/releases/Release_v2.18.0.md).

Initial release: estimates market opportunity (TAM, SAM, SOM) using multiple sizing frameworks (top-down, bottom-up, comparable company, analogous market), triangulating where they converge and diverge as signal, and producing a calibrated range with source-graded confidence labels. Includes a quick-estimate mode; refuses unbounded fabrication.

### Contract established
- Scope: external market opportunity only, not internal-tool investment cases
- Every dollar figure traces to a cited source, a stated assumption, or a sensitivity range
- Output: top-down and bottom-up sizing tables, multi-framework synthesis, sensitivity analysis, confidence-labeled assumptions
