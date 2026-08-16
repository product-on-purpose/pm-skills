# define-prioritization-framework - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.3.0 | 2026-08-16 | v2.33.0 | C-14 | minor | Field-reported calibration (#252): top/bottom highlight rule scales below 10 items, RICE Effort unit scales to real team capacity, Kano gains surveyed and inferred evidence tiers. |
| 1.2.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointer to `foundation-prioritized-action-plan`; collision pair declared with new trigger fixtures. |
| 1.1.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Added a "When NOT to Use" section with five reciprocal boundary pointers, including the bidirectional edge back to `define-opportunity-tree` (which already pointed here). Closes a one-way gap in the cross-skill reciprocity mesh flagged by the 2026-07-04 deep audit. Also normalized the "Output format" and "Quality checklist" headings to their canon spelling and resolved a phantom `deliver-roadmap` pointer in Cross-skill composition (both WS-T8b/f, no re-bump). |
| 1.0.0 | 2026-05-21 | v2.18.0 | - | baseline | Prior published version: runs the applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability, surfacing where rankings agree and diverge plus an executive recommendation. |

## 1.3.0 (2026-08-16)

Field-reported calibration ([#252](https://github.com/product-on-purpose/pm-skills/issues/252)), from an end-to-end run on a real 8-item backlog in a solo-maintainer context. The report was positive about the skill overall and singled out the convergence and divergence analysis as its most valuable output, so these are calibration fixes rather than defect repairs.

**Top and bottom highlight rule now scales below 10 items.** The rule read "highlight the top 5 and bottom 5"; with 8 items, 5 and 5 overlap or exhaust the list and the rule cannot be followed as written. At 10 or fewer items the skill now shows every item in rank order and describes the gap between clear tiers instead of forcing a five-and-five split.

**RICE Effort unit now scales to real team capacity.** The unit was fixed as eng-weeks or person-weeks. For a solo operator with roughly five hours a week, a notional 40-hour week makes every small item round to "under one week" and the Effort dimension stops discriminating entirely. The unit is now capacity-weeks, sized to what a week actually buys that team, with the conversion stated in the output.

**Kano gains explicit evidence tiers.** The applicability gate asked for "customer-research input" without saying whether summarized signals qualified or whether formal Kano question pairs were required. It now distinguishes a surveyed tier (functional and dysfunctional pairs per feature, classify normally) from an inferred tier (interview themes, survey means, support patterns; classify, label as inferred, and treat a Delighter or Must-Have call as a hypothesis to confirm). Refusal is reserved for having no customer research at all, since downgrading the tier and saying so is more useful than excluding the framework.

**Kano unlock suggestion no longer leaves a bare pointer** ([#253](https://github.com/product-on-purpose/pm-skills/issues/253), folded into this same unreleased version). When Kano is excluded for having no research at all, the refusal suggests `discover-interview-synthesis` or `measure-survey-analysis` to unlock it. Under a partial install neither may exist, so the refusal now names the research in plain language as a fallback: roughly 20 to 30 responses asking, per feature, how the user would feel if it were present and if it were absent.

Minor rather than patch: the Kano tiering lets the skill run a case it previously refused or fudged, and adds an optional tier label to the output, which is additive behavior under the versioning tie-breaker.

## 1.2.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared `foundation-prioritized-action-plan` as a new collision pair for this skill in `scripts/trigger-eval-roster.yaml`, but the reciprocal "When NOT to Use" pointer was never added. The enforcing `check-reciprocal-boundary-pointers` gate caught the gap. Adds one bullet distinguishing a raw, unstructured situation from a defined candidate list ready for formal framework scoring. No other content change.

## 1.1.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found this skill had no "When NOT to Use" section at all, and that `define-opportunity-tree`'s existing pointer to it was one-directional (opportunity-tree pointed here; nothing pointed back). This release adds the section and closes that edge.

### Changes
- Added a "When NOT to Use" section with pointers to `define-opportunity-tree`, `define-hypothesis`, `measure-experiment-design`, `discover-market-sizing`, `deliver-launch-checklist`, and `discover-interview-synthesis`.
- The `define-opportunity-tree` <-> `define-prioritization-framework` edge is now bidirectional (opportunity-tree required no edit; it already pointed here).
- Heading-normalization sweep (WS-T8b, folded into this same v2.30.0 row rather than a separate bump): "Output format" to "Output Format" and "Quality checklist" to "Quality Checklist", two of the catalog's drifted heading-spelling instances the 2026-07-04 deep audit flagged.
- Dedup fix (WS-T8f, folded into this same v2.30.0 row rather than a separate bump): resolved the phantom `deliver-roadmap` pointer in Cross-skill composition. `deliver-roadmap` is not a shipped skill; the backtick-wrapped reference read as a resolvable link when it was an intentional forward-reference (it remains allowlisted in `scripts/check-skill-cross-references.sh` for exactly this reason). Reworded to name a future roadmap-sequencing capability in plain prose, with no link.

No change to the framework-scoring flow, refusal protocols, or output contract.

## 1.0.0 (2026-05-21)

Released in [v2.18.0](../../site/src/content/docs/releases/Release_v2.18.0.md).

Initial release: runs all applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability and context, then produces a cross-framework comparison and an executive recommendation. Kano is gated on customer research; missing inputs produce an estimation scaffold rather than fabricated scores.

### Contract established
- Filters frameworks by applicability rather than reducing to one
- Refuses to fabricate scores; produces an estimation scaffold when input data is missing
- Output: per-framework scoring tables, cross-framework comparison, executive summary, sensitivity analysis
