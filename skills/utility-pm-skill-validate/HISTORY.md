# utility-pm-skill-validate - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.1 | 2026-07-04 | v2.30.0 | M-35 | patch | Added a pointer to the new Skeleton Canon doc (the three sanctioned dialects and their exact heading spellings) as the authoritative reference for heading and section-set conventions; noted `check-heading-canon.mjs` as the eventual deterministic backstop. No new check, no report-schema change. |
| 1.1.0 | 2026-06-15 | - | C-5 | minor | Folded the eval-asset contract into the report: new Tier 1 checks `eval-trigger-fixtures` (B-4), `eval-output-scenarios` (B-7), and `reciprocal-boundary-pointers` (C-5, can FAIL a one-directional declared collision pair). Upgraded `when-not-to-use` from INFO to WARN (now a v2.26.0 convention naming neighbors). Each check names its authoritative CI gate. |
| 1.0.0 | 2026-04-03 | - | - | baseline | Prior published version: two-tier (structural + quality) skill audit with the F-11-parseable report. |

## 1.1.1 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

Documentation-only patch: the "Quality standard framing" note now points to the new Skeleton Canon section in the skill-authoring guide (WS-T8c) as the authoritative source for dialect and heading-spelling conventions, and calls out `scripts/check-heading-canon.mjs` (advisory) as the eventual deterministic backstop. No new Tier 1/Tier 2 check, no report-format change.

## 1.1.0 (2026-06-15)

Eval-coverage integration (v2.27.0 eval program, plan item C-5 second half): the validator now reports on a skill's eval readiness alongside its structural and quality conventions.

- **Three new Tier 1 (deterministic) checks:** `eval-trigger-fixtures` (the B-4 routing-fixture contract: schema, >=16 queries, >=8/class, >=2 near-misses - INFO when absent, since not every skill is in the roster), `eval-output-scenarios` (the B-7 output-scenario contract: scenario/skill/family frontmatter mapping to an existing rubric - INFO when absent), and `reciprocal-boundary-pointers` (C-5: a declared `COLLISION_PAIRS` entry must cross-point in both skills' "When NOT to Use" - FAIL if one-directional).
- **`when-not-to-use` upgraded INFO -> WARN:** the section became a convention in the v2.26.0 rewrites and now should name the skill's neighbors; the stale "present in 1/27 shipped skills" rationale is removed.
- Each new check names its authoritative deterministic CI gate (`check-trigger-fixtures.mjs`, `check-output-eval-assets.mjs`, `check-reciprocal-boundary-pointers.mjs`) so the interactive report and CI stay consistent.

Report schema is unchanged (the new checks live under `## Structural Checks`), so the F-11 parser in `utility-pm-skill-iterate` is unaffected.

## 1.0.0 (2026-04-03)

Baseline row for the prior published version; see git history for its changes.
