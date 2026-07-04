# define-opportunity-tree - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.2.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Rewrote the frontmatter description: named the sibling deflection to `define-prioritization-framework` that was missing, resolving a collision the 2026-07-04 deep audit flagged ("Use for ... prioritization" read as overlapping, not deflecting). |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-2 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 2) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.2.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit flagged this skill's description as one of the catalog's weakest: "Use for ... prioritization" read as overlapping `define-prioritization-framework` rather than deflecting to it, and the description named no sibling boundary at all. The skill's own "When NOT to Use" section already pointed there; the description just did not say so.

### Changes
- Rewrote the frontmatter description (Batch 5, WS-T8e) to state what the skill produces, when to use it, and the deflection to `define-prioritization-framework` for ranking an already-structured flat list.
- No edit was needed to the "When NOT to Use" section itself; the `define-opportunity-tree` <-> `define-prioritization-framework` edge was already bidirectional as of this skill's 2.1.0 (confirmed, no separate WS-T8a bump was required for this file).

No change to the Instructions, Output Format, or Quality Checklist.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 2): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
