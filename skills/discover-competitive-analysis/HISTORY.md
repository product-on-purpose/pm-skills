# discover-competitive-analysis - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.3.0 | 2026-10-30 | Unreleased | - | minor | Gather Intelligence (step 2) gains an optional path for pricing and feature pages that load their plans with JavaScript: use Firecrawl /scrape when it is available, otherwise the built-in web tools or a page the user pastes. |
| 2.2.1 | 2026-07-31 | v2.32.0 | issue-248 | patch | Fixed three fused sentence boundaries in the Instructions (competitors.direct, competitors.respect, reliability.be), external report issue #248. Prose only; no behavior change. |
| 2.2.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Rewrote the frontmatter description: added output specifics (competitor count, 2x2 map) and the sibling deflection to `discover-market-sizing` already present in the body. One of the four additional Batch 5 skills selected for this release alongside the spec's four named examples (see the trust-repair spec's WS-T8e "~4 more early-cohort descriptions"). |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-3 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 3) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.3.0 (2026-10-30)

Pricing and feature pages are the main source for the Feature Comparison Matrix and the Pricing Comparison, and many of them load their plans with JavaScript. A plain text fetch of such a page can return only the page title, with no plan names or prices, so those competitors' prices cannot be verified through that tool.

**Why this is a MINOR.** It adds an optional capability. Without Firecrawl the skill behaves as before, and no output section, template field, or checklist item changes.

### Changes
- Step 2 (Gather Intelligence): one added paragraph. If Firecrawl is available, read JavaScript-rendered pricing and feature pages with Firecrawl /scrape; otherwise use the built-in web tools, or ask the user to paste the page.
- No change to the frontmatter description, Output Format, Quality Checklist, template, or example.

## 2.2.1 (2026-07-31)

Released in [v2.32.0](../../site/src/content/docs/releases/Release_v2.32.0.md). Effort: issue-248 (external report).

An external reader reported three fused sentence boundaries in the Instructions, where a missing space or terminator ran two sentences together. Prose defect only; the guidance itself was already correct.

### Changes
- Repaired the fused boundaries at `competitors.direct`, `competitors.respect`, and `reliability.be` in the Instructions section.

No change to the frontmatter description, Output Format, Quality Checklist, template, or example. No behavior change, which is why this is a patch rather than a minor.

## 2.2.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit named the catalog's ~8 weakest early-cohort descriptions for rewrite (Batch 5), naming four skills explicitly and leaving roughly four more to selection; this skill was picked for its short, generic description and its unstated boundary against `discover-market-sizing`, a real neighbor already tested by this skill's trigger fixtures.

### Changes
- Rewrote the frontmatter description (Batch 5, WS-T8e) to name what the analysis compares (features, pricing, positioning), its typical scope (3-5 competitors, a 2x2 map), and the `discover-market-sizing` deflection already present in the "When NOT to Use" section.

No change to the Instructions, Output Format, or Quality Checklist.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 3): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
