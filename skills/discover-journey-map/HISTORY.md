# discover-journey-map - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Combined bump per skill-versioning.md's tie-breaker rule: added a "When NOT to Use" section, normalized the "Output Format" heading to canon spelling, and rewrote the frontmatter description to name a sibling deflection. All three changes landed across separate stages of this release and share one version bump (implementation plan Section 4). |
| 1.0.0 | 2026-05-21 | v2.18.0 | - | baseline | Prior published version: produces a customer journey map covering stages, touchpoints, emotional curve, pain points, moments of truth, and opportunity annotations, refusing to fabricate emotional or behavioral data without research input. |

## 1.1.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found this skill had no "When NOT to Use" section, a non-canon "Output format" heading, and a description that never named a sibling deflection despite the skill's boundaries being well understood in its body. Per the implementation plan's combined-bump mechanics, the three fixes land in separate PRs within this release but share one version bump rather than three.

### Changes
- Added a "When NOT to Use" section with pointers to a dedicated diagramming tool (service blueprints and system architecture are out of scope), `discover-interview-synthesis` / `measure-survey-analysis` (for ungrounded research signal), `define-problem-statement`, and `deliver-edge-cases`.
- Normalized "Output format" to "Output Format" (heading-canon sweep, WS-T8b).
- Rewrote the frontmatter description (Batch 5, WS-T8e) to state what the skill produces, when to use it, and the deflection to `discover-interview-synthesis` / `measure-survey-analysis` when no research signal exists yet.

No change to the Inputs, Refusal protocols, or the Output Format template itself.

## 1.0.0 (2026-05-21)

Released in [v2.18.0](../../site/src/content/docs/releases/Release_v2.18.0.md).

Initial release: produces a customer journey map covering stages, touchpoints, emotional curve, pain points, moments of truth, and opportunity annotations. Supports linear and cyclical journeys plus an optional mermaid timeline or flowchart. Refuses to fabricate emotional or behavioral data without research input.

### Contract established
- Single-turn artifact; read-only tools; markdown output with optional mermaid block
- Refuses to fabricate emotional or behavioral data without research signal
- Supports linear (default) and cyclical journey types
