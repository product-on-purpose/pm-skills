# CI Audit Addendum: Refresh of 2026-04-18 Findings

> **ARCHIVED 2026-05-03.** This addendum is superseded by `docs/internal/audit/ci-audit_2026-05-03.md`, which is the active full CI audit. Read this file only for historical reference. Active recommendations and gap status now live in the 2026-05-03 audit.

**Date:** 2026-05-01
**Refreshes:** docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md
**Window:** 2026-04-18 to 2026-05-01 (~2 weeks; v2.11.0 to v2.11.1)
**Author:** Claude Opus 4.7
**Status:** Archived 2026-05-03; superseded by `ci-audit_2026-05-03.md`

---

## Summary

The older audit's structural findings still hold. Inventory is unchanged at 17 validator/check scripts and 10 GitHub Actions workflows. Enforcement posture is unchanged at 5 enforcing / 10 advisory among validator scripts. None of the v2.12.0 efforts addressing G1, G2, or G3 (F-31, F-32, F-33, F-36) have shipped, so all three "P1" gaps remain open exactly as written.

What HAS changed is content inside `scripts/lint-skills-frontmatter.sh` + `.ps1`. v2.11.1 (2026-04-22, skills.sh CLI compatibility patch) added two new enforcing rules to that script for strict YAML conformance required by the open `skills` CLI. The script's enforcement footprint expanded without altering its place in the inventory. Separately, v2.11.1 used the existing `check-count-consistency` script to detect and fix 8 stale "27 skills" / "31 skills" references across 5 files. that activity partially demonstrates the recommended advisory-to-enforcing promotion path for current-state count references (G9), without yet committing the script to enforcing posture.

---

## Inventory delta

| Dimension | 2026-04-18 | 2026-05-01 | Delta |
|---|---|---|---|
| Validator/check scripts in `scripts/` | 17 | 17 | None |
| `.sh` + `.ps1` triplet completeness | 17/17 | 17/17 | None |
| GitHub Actions workflows in `.github/workflows/` | 10 | 10 | None |
| Enforcing validators (block merges) | 5 | 5 | None |
| Advisory checks | 10 | 10 | None |
| Build/tooling scripts (non-validator) | 2 | 2 | None |
| Lint rules inside `lint-skills-frontmatter` | implicit | +2 explicit | First-line `---` rule (line 33) + unquoted-description-no-inline-colon rule (line 80-81) added in v2.11.1 |
| Skills count baseline | 38 | 38 | None (post-v2.11.1 stale-count cleanup brings docs current) |
| Library samples baseline | 120 | 120 | None |

Evidence: glob of `scripts/*.sh` returns 17 items; glob of `scripts/*.ps1` returns 17 items; glob of `.github/workflows/*.yml` returns 10 items. `git log --since="2026-04-18" -- scripts/ .github/workflows/` shows only two commits touching this area (`8ab0f81` v2.11.1 release and `7b13341` builder-format chore). Neither added or removed scripts or workflows.

---

## Gap status (G1-G9)

| Gap | Title | Status as of 2026-05-01 | Evidence |
|---|---|---|---|
| **G1** | Sample-standards enforcement | **Still open.** F-33 still in backlog. | `docs/internal/efforts/F-33-check-sample-standards-ci.md` line 3: `Status: Backlog`. No `scripts/check-sample-standards.*` exists. CHANGELOG entry for `[Unreleased]` does not mention F-33 shipping. |
| **G2** | Generic family-registration validator | **Still open.** F-31 partial closer + F-36 full closer both still in backlog. | `docs/internal/efforts/F-31-pm-skill-validate-family-sample-awareness.md` line 3: `Status: Backlog`. `docs/internal/efforts/F-36-generic-family-registration-validator.md` line 3: `Status: Backlog`. No `validate-skill-family-registration.*` script exists. `validate-meeting-skills-family.sh` still hardcodes the `FAMILY_SKILLS` array. |
| **G3** | Utility-skill content currency | **Partially exercised, mechanism still advisory.** F-32 still in backlog. v2.11.1 reactively used `check-count-consistency` to find and fix 8 stale "27 skills" / "31 skills" references across 5 files (CHANGELOG line 33). The script remains advisory; F-32 (which would proactively regenerate samples) is not shipped. | `docs/internal/efforts/F-32-pm-skill-builder-sample-generation.md` line 3: `Status: Backlog`. CHANGELOG.md `[2.11.1]` Changed section documents the manual reconciliation. `validation.yml` posture for `check-count-consistency` unchanged (advisory). |
| **G4** | Link checking in docs | **Still open.** No link-check step in `validate-docs.yml`. (Section 14.6 of the new docs-structure audit at `docs/internal/audit/audit_repo-structure_2026-05-01.md` proposes the implementation.) |
| **G5** | GitHub Release auto-creation on tag | **Still open.** `release.yml` still builds artifacts only; no `gh release create` step. v2.11.1 was tagged and released manually per the existing process. |
| **G6** | Contract-validator version sync | **Still open.** `validate-meeting-skills-family.sh` still does not check the contract's declared version against its own expectations. Meeting Skills Family Contract remains at v1.1.0 so no drift has materialized; the structural gap persists. |
| **G7** | macOS matrix leg | **Still open.** `validation.yml` matrix unchanged (Ubuntu + Windows only). |
| **G8** | Post-deploy docs smoke test | **Still open.** `deploy-docs.yml` unchanged. |
| **G9** | Promoted-to-enforcing candidates | **Still open. partially exercised via v2.11.1 cleanup.** `check-count-consistency` was used by hand to find 8 current-state drift instances during the v2.11.1 skills.sh prep, validating the case for promotion to enforcing on current-state paths. No promotion committed yet. `validate-script-docs` and `check-workflow-coverage` postures unchanged. |

Confirmation status: G1, G2, G3, G4, G5, G6, G7, G8, G9 all confirmed against current state. 9 of 9 gaps validated.

---

## New findings (post-2026-04-18)

These are facts the older audit could not have known:

- **Two new enforcing lint rules in `lint-skills-frontmatter`** (added 2026-04-22 in commit `8ab0f81`):
  - First line of every SKILL.md must be `---` (no preamble, HTML comments, or attribution headers above the YAML delimiter). Visible at `scripts/lint-skills-frontmatter.sh` line 33 and `scripts/lint-skills-frontmatter.ps1` line 45.
  - Unquoted `description` field must not contain inline `": "` (colon-space) which strict YAML parsers interpret as a nested key. Visible at `scripts/lint-skills-frontmatter.sh` lines 80-81 and `scripts/lint-skills-frontmatter.ps1` line 96.
  - Both rules exist because the open `skills` CLI (skills.sh directory) uses a strict YAML parser. Without them, six foundation SKILL.md files (`foundation-lean-canvas`, `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update`) were silently dropped at install time.
  - These rules were not in scope for the older audit because the skills.sh distribution path was opened post-v2.11.0.

- **New external-distribution dependency in CI thinking.** v2.11.1 introduced a "dry-run against live skills CLI" recommendation for any future release that touches SKILL.md frontmatter. Documented in `docs/internal/distribution/2026-04-22_skills-sh.md` (Phase 3). Not yet codified as a CI step. could become a candidate gap in a future audit.

- **Stale-count cleanup pattern proven effective.** v2.11.1 used `check-count-consistency` output to fix 8 references across 5 files (`docs/agent-skill-anatomy.md`, `docs/skills/utility/utility-pm-skill-builder.md`, `scripts/README_SCRIPTS.md`, `skills/utility-pm-skill-builder/SKILL.md`, `skills/utility-pm-skill-builder/references/EXAMPLE.md`). This is direct evidence that the advisory script is useful when run intentionally; the older audit's case for promoting current-state paths to enforcing (G9) gains a real datapoint.

- **v2.11.1 made no new scripts and no new workflows.** Despite shipping a CLI-compatibility release, the only CI change was inside an existing script. The 17/10 inventory has been stable for two weeks.

- **The post-v2.11.1 reorganization on 2026-05-01 (commit `7b13341`)** removed legacy effort-doc folders (F-05, F-16, F-19, F-20, F-21, F-22, F-23) but did not touch any CI scripts or workflows. CI surface unaffected.

- **A separate docs-structure audit** at `docs/internal/audit/audit_repo-structure_2026-05-01.md` proposes 8 *new* CI scripts (Sections 14.1 through 14.8) targeting docs-frontmatter, nav-completeness, generated-content protection, link validity, version references, and cross-doc references. None of those proposals overlap G1-G9. They are net-new gap candidates and should be tracked separately.

---

## Obsolete findings

The following items in the older audit are now partially or fully outdated:

- **Recommendation table item: "These are the bare-minimum correctness gates" (line 136).** Still accurate, but the *content* of `lint-skills-frontmatter` widened in v2.11.1. It now enforces strict-YAML conformance, not just structural presence of fields. The bare-minimum scope grew to include skills.sh CLI compatibility.

- **G3 framing: "27 skills" example (line 46).** The specific example phrase "27 skills" no longer appears anywhere in current-state docs after the v2.11.1 cleanup. The pattern (utility-skill content drift) is still real and F-32 is still the planned proactive fix; the example is just historical. Replace with the current pattern of the day in the next audit.

- **Line 153: "should probably be enforcing (e.g., `check-count-consistency` would have caught the 109/120 drift discovered in v2.11.0 Round 2 review)."** The 109/120 anecdote remains valid evidence; v2.11.1 added a second datapoint (8 stale references) that strengthens the case. The recommendation itself is unchanged but the evidence base is now broader.

- **Line 270: "Worth confirming this is set to `observe` post-v2.11.0" (re: `validate-mcp-sync.yml` mode toggle).** Two weeks have passed without an MCP unfreeze decision; the M-22 freeze still holds per CLAUDE.md memory. Confirmation outstanding becomes "still outstanding" rather than "to be done shortly."

- **Line 460: "Next audit recommended: post-v2.12.0 tag."** v2.12.0 has not shipped yet. The recommendation stands; today's addendum is a refresh, not the post-v2.12.0 audit it referenced.

No findings are fully obsolete. Every gap and recommendation maps to a current-state condition that still applies.

---

## Validation summary

The older audit is approximately **95% current**. All 9 gaps confirmed against current state with citable evidence. The 5% drift comes from (a) the older audit's specific stale-count example ("27 skills") having been remediated, and (b) the addition of two new enforcing rules inside `lint-skills-frontmatter` that broaden enforcement scope without changing the script's place in the inventory or the enforcement-tier counts. None of the substantive recommendations (G1-G9, P1-P3 prioritization, advisory-to-enforcing promotion candidates) are stale. The natural next audit point remains post-v2.12.0 tag, when F-31, F-32, F-33, and F-36 should be evaluated against G1, G2, G3, and the family-registration dimension.
