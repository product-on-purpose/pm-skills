# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-07-06

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/release-plans/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/release-plans/v2.27.1/` (**SHIPPED 2026-06-16**, tag `v2.27.1` at `10685b2d`; maintenance PATCH - the classification sub-count drift gate in `check-count-consistency` plus the doc-currency fixes it surfaced. Plan: `plan_v2.27.1.md`; spec: `spec_subcount-policing.md`.) `docs/internal/release-plans/v2.28.0/` (**SHIPPED 2026-06-20**, tag `v2.28.0` at `4fb0d703`; new `foundation-stakeholder-briefings` foundation skill - the 1-to-N audience fan-out, additive MINOR; catalog 66 -> 67, foundation 9 -> 10; plan `plan_v2.28.0.md`, spec `spec_stakeholder-briefings.md`). The memory / "Remember" train was subsequently parked to `_unreleased/project-memory/` (2026-06-22), and v2.29.0 shipped as the pre-build risk gate instead (see item 3). **SHIPPED 2026-07-05:** `docs/internal/release-plans/v2.30.0/` (trust repair + hygiene, effort M-35, tracking issue #216; tag `v2.30.0` at `87e423c5`, squash-merge PR #220; all decisions ruled 2026-07-04; built as 15 thematic commits on one branch; G1 via a four-lens adversarial panel, 19 findings resolved at `23620779`; `plan_v2.30.0.md` + `spec_trust-repair.md` + `implementation-plan_trust-repair.md`). **SHIPPED 2026-07-06:** `docs/internal/release-plans/v2.31.0/` (zero-drift releases + the improvement program, effort M-21 - release-please integration, issue #136 - plus M-36 zero-drift generated surfaces; tag `v2.31.0` at `fa0111e8`, squash-merge PR #227; G1 via a four-lens adversarial panel, 16 findings fixed at `12abceb3` + 12 reciprocity edges closed at `ce1fc657`; release-please stood up in shadow, S1: its first Release-PR run failed before opening a PR, blocked by the repo's Actions-cannot-create-PRs policy ahead of the ZD-5 PAT, observed directly from its proposal branch instead; plan + `spec_zero-drift-program.md` + `implementation-plan_zero-drift-program.md` + the learning doc `release-please-primer.md`), drafted 2026-07-03 from the 2026-07-04 deep audit (maintainer-local, gitignored); the audit's ten innovation bets are parked at `_unreleased/fable-innovations/`.
3. Latest shipped: **v2.31.0** (2026-07-06, tag `v2.31.0` at `fa0111e8`; zero-drift releases + the improvement program MINOR - generation becomes the only write path for the README catalog/badges, both quickstarts, the sub-agent compatibility matrix, and the three manifest descriptions; release-please stands up in shadow (S1: its first Release-PR run observed, not yet authoritative); trigger-fixture coverage reaches 43/68; a dry-run-default output-eval CI lane + published evals page; SECURITY.md expansion + a provenance page; catalog stays 68 / 6). Previous: **v2.30.0** (2026-07-05, tag `v2.30.0` at `87e423c5`; trust repair + hygiene MINOR - count-truth sweep + enforcing `check-count-phrases`, release-zip packaging fix, cross-client doc truth, hook opt-out, WNTU/canon/heading/description content mesh, dual-shell freeze + trigger-eval roster, tool family to 1.0.0, CI ergonomics, internal-docs relocation, marketplace tag pin; catalog stays 68 / 6). Earlier: **v2.29.1** (2026-06-24, tag `v2.29.1` at `9d06ff4e`; maintenance PATCH - skill docs pages no longer drop sections, plus the `check-skill-page-sections` completeness gate), **v2.29.0** (2026-06-23, tag `v2.29.0` at `76f793b8`; new `foundation-build-risk-review` pre-build gate + the key-free `pm-skill-router` sub-agent; catalog 67 -> 68, foundation 10 -> 11, sub-agents 5 -> 6), **v2.28.0** (2026-06-20; `foundation-stakeholder-briefings`, catalog 66 -> 67), **v2.27.1** (2026-06-16; the classification sub-count drift gate), **v2.27.0** (2026-06-15; the provable-quality eval-program release), v2.26.0 (authoring + quality), v2.25.x (activation layer + audit closeouts), v2.24.0 (workflow orchestrator). See git tags + `docs/releases/**` for shipped context.
4. `docs/internal/release-plans/v2.22.0/plan_v2.22.0.md` (SHIPPED 2026-05-30, tag `v2.22.0` at `be1e400`; deleted the 63 command/skill wrappers + added the Codex manifest, MINOR; skill names UNCHANGED).
5. `docs/internal/release-plans/v2.23.0/plan_v2.23.0.md` (SHIPPED 2026-05-31, tag `v2.23.0` at `b54cef0`; new `prioritized-action-plan` foundation skill, additive MINOR).
6. `docs/internal/release-plans/v2.21.0/plan_v2.21.0.md` (SHIPPED; marketplace launch, additive MINOR).
7. `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` (RESERVED; convergence MAJOR - retire old marketplace path; trigger-gated by plugin #2)
8. `docs/internal/release-plans/v2.20.0/` and earlier (archived release context; see git tags for the latest shipped release)
9. `docs/internal/release-plans/_deferred/2026-05-29_skills-short-rename/` (DEFERRED; the fully-planned, audit-hardened hard rename of all 63 skills to short names; parked 2026-05-29 in favor of the lighter v2.22.0; revivable - see its `README.md`, git tag `archive/short-name-rename`)

> **Version-line note (2026-05-25):** the marketplace launch and the naming standardization are both **additive minors** (v2.21.0, v2.22.0). The single breaking **major** is reserved as v3.0.0 (the convergence: old-path retirement), triggered by the second plugin. The former `v3.0.0/` (marketplace) and `v3.1.0/` (naming) folders were renumbered accordingly.
>
> **Update (2026-05-29):** v2.22.0 was reframed from the short-name rename to the lighter **wrapper-deletion** (the rename's large blast radius served a naming preference more than the duplication fix). The audit-hardened rename is preserved and revivable at `_deferred/2026-05-29_skills-short-rename/`. v3.0.0 remains the marketplace old-path retirement only; neither path creates name aliases, so there is no alias-removal work anywhere.

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Migration History

Legacy directories `docs/internal/release-planning/` and `docs/internal/delivery-plan/` were fully migrated to this structure on 2026-03-22. All files were distributed into versioned release folders. Originals archived to `_NOTES/_archived-internal/` (gitignored).
