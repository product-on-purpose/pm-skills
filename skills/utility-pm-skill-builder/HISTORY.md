# utility-pm-skill-builder - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.2.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Replaced the hand-maintained "Current Library Reference" tables (a 10-row foundation table under an "(11)" header, and no tool-family table at all) with an instruction to derive the live inventory from `skill-manifest.json` or `AGENTS.md` at run time, plus a thin no-counts families overview. Gap analysis (Step 2) can now reach all 68 skills, including all 15 tool-family skills, without a future skill addition requiring a hand edit here. Step 4's exemplar selection now picks a dialect from the new Skeleton Canon doc BEFORE choosing an exemplar, replacing the circular "mirror exemplar structure" instruction that let a fourth, unsanctioned dialect emerge in `foundation-build-risk-review`. |
| 1.1.2 | 2026-06-23 | v2.29.0 | M-34 | patch | Collision-probe checklist now points to the key-free `pm-skill-router` path (`--emit-tasks` + the sub-agent); the Messages-API path is the unattended-CI alternative. No flow change. |
| 1.1.1 | 2026-06-20 | v2.28.0 | - | patch | Doc-currency: added `foundation-stakeholder-briefings` to the Current Library Reference foundation table (foundation 9 to 10) so gap analysis sees the full v2.28.0 inventory. No flow change. |
| 1.1.0 | 2026-06-15 | - | C-1..C-4 | minor | New skills ship eval-ready: added a Step 4.5 "Eval Readiness" (neighbors + reciprocal boundary pointers + output-eval family rubric), scaffolded `evals/trigger-fixtures.json` (C-1) and `evals/output-scenarios/{id}.md` (C-4) into the packet/staging/promotion, a Step 7 collision probe (C-2), and the eval contract in the Output Contract + Quality Checklist. Refreshed the stale "When NOT to Use" pointers (pm-skill-iterate/validate now exist). |
| 1.0.0 | 2026-03-22 | - | - | baseline | Prior published version: guided skill creation (gap analysis, Why Gate, classification, staged packet, promotion). |

## 1.2.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found the "Current Library Reference" section blind to 22% of the catalog: the "Foundation Skills (11)" header sat over a 10-row table missing `foundation-build-risk-review` (shipped v2.29.0), and the 15 tool skills had no table at all, so a gap-analysis pass could not see any of them. The root cause is structural, not a missed edit: any hand-written table drifts the moment a skill is added or removed. This release removes the hand-maintained tables entirely.

### Changes
- Removed the "Domain Skills (30)", "Foundation Skills (11)", and "Utility Skills (12)" tables.
- Added an instruction to derive the live inventory at run time from `skill-manifest.json` or `AGENTS.md`, both generated and never hand-edited, so they cannot drift from `skills/` on disk.
- Added a thin families overview (domain, foundation, utility, tool: phase-scoping, directory prefix, what each covers) that carries no hard counts on purpose.
- Step 2 (Gap Analysis) now explicitly names all four families and flags the tool family as the easiest to miss.
- Step 4's "Exemplar selection" (renamed "Dialect and exemplar selection") now points to [Skeleton Canon: The Three Sanctioned Dialects](../../site/src/content/docs/guides/creating-pm-skills.md#skeleton-canon-the-three-sanctioned-dialects) and requires picking a dialect (classic, contract-shaped, tool-family) BEFORE choosing an exemplar, so a drifted exemplar is no longer mirrored forward into a new skill. Step 5 item 6 updated to match.

No change to the core create-a-skill flow (Steps 1-7); this is a gap-analysis and dialect-selection input fix.

## 1.1.1 (2026-06-20)

Doc-currency patch for the v2.28.0 release (new foundation skill `foundation-stakeholder-briefings`): added its row to the "Current Library Reference" foundation table and bumped the count 9 to 10, so the builder's gap analysis sees the full inventory. No change to the create-a-skill flow.

## 1.1.0 (2026-06-15)

Eval-contract integration (v2.27.0 eval program, plan items C-1 through C-4): the builder now produces eval-ready skills so routing and output-quality coverage never falls behind the catalog.

- **Step 4.5 Eval Readiness (new):** name nearest neighbors (C-2), require reciprocal "When NOT to Use" boundary pointers and a `COLLISION_PAIRS` entry for strong overlaps (C-3), and assign an output-eval family rubric via a phase/category mapping table (C-4).
- **Packet + staging + promotion:** added `evals/trigger-fixtures.json` (the B-4 routing-fixture contract: >=16 queries, >=8/class, >=2 neighbor near-misses, train/validation split) and `evals/output-scenarios/{id}.md` (the B-7 output-scenario contract: scenario/skill/family frontmatter + a >=100-char brief). Promotion now runs the eval-asset gates + the `check-new-skill-collision.mjs` probe (C-2) and regenerates the catalog surfaces.
- **Output Contract + Quality Checklist:** the eval assets are now required outputs with a dedicated checklist tier.
- Refreshed the stale "When NOT to Use" section (the planned validate/iterate utilities now exist as `utility-pm-skill-validate` / `utility-pm-skill-iterate`).
- Refreshed the "Current Library Reference" table to the live catalog (domain 30 / foundation 9 / utility 12; added the 11 missing rows) per the 2026-06-15 doc-currency audit, so gap analysis sees the full inventory.

No change to the core create-a-skill flow (Steps 1-4, 5-7); the eval contract is additive.

## 1.0.0 (2026-03-22)

Baseline row for the prior published version; see git history for its changes.
