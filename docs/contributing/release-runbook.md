---
title: Release Runbook
description: 'Canonical pm-skills release runbook with 6 explicit gates: G0 Pre-tag readiness, G1 Adversarial review, G2 Version bump + CHANGELOG prep, G2.5 Commit + re-verify, G3 Tag + push, G4 Post-tag hygiene. Used by the pm-release-conductor sub-agent and by maintainers running releases by hand.'
---

## Table of Contents

- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Gate Definitions](#gate-definitions)
  - [G0: Pre-Tag Readiness](#g0-pre-tag-readiness)
  - [G1: Adversarial Review Status](#g1-adversarial-review-status)
  - [G2: Version Bump + CHANGELOG Prep](#g2-version-bump--changelog-prep)
  - [G2.5: Commit Release-Prep + Re-Verify](#g25-commit-release-prep--re-verify)
  - [G3: Tag + Push](#g3-tag--push)
  - [G4: Post-Tag Hygiene](#g4-post-tag-hygiene)
- [No Bypass Policy](#no-bypass-policy)
- [Rollback Semantics](#rollback-semantics)
- [Cross-Client Notes](#cross-client-notes)
- [Related Documentation](#related-documentation)

## Purpose

pm-skills releases require strict discipline: aggregate counters must match declared values; the pre-tag validator bundle must pass; CHANGELOG entries must follow `CLAUDE.md` hygiene; the tag must point at a commit that contains release-prep edits (not a pre-edit HEAD).

Historically, the runbook lived in the maintainer's head plus partial release-plan checklists. Drift between releases produced incidents (e.g., the v2.13.1 plugin install path correction was a post-tag detection that required a fast patch ship). This runbook codifies the gates so drift is structurally impossible.

The `pm-release-conductor` sub-agent (v2.16.0+) automates the discipline. It reads this runbook at invocation time and walks each gate with the maintainer. Maintainers running releases manually follow the same gates; the conductor reduces friction.

## Prerequisites

Before invoking the runbook (manually or via `/pm-release v{X.Y.Z}`):

- [ ] Master plan exists at `docs/internal/release-plans/v{target}/plan_v{target}.md` with status block reflecting current state
- [ ] Release notes drafted at `docs/releases/Release_v{target}.md` (or scheduled for G2)
- [ ] Phase 0 Adversarial Review completed (Codex or alternate cross-LLM review run against the release-prep state)
- [ ] Current branch is `main` (or designated release branch)
- [ ] Local repo is up to date with `origin/main`

## Gate Definitions

### G0: Pre-Tag Readiness

**Goal:** Confirm the codebase is in a releasable state. All validators green; em-dash sweep clean; aggregate counters match declared values; no cross-cutting governance issues.

**Sub-checks (all must PASS):**

1. **Working tree clean** - `git status --porcelain` empty (no uncommitted changes)
2. **Pre-tag validator bundle green** - run `bash scripts/pre-tag-validate.sh` (Linux/macOS) or `pwsh scripts/pre-tag-validate.ps1` (Windows); exit 0 required. This canonical orchestration script runs the full enforcing validator inventory: lint-skills-frontmatter, validate-commands, validate-agents-md, family validators (Meeting + FS + DS) all in --strict mode, check-internal-link-validity --strict, validate-docs-frontmatter --strict, check-no-body-h1 --strict, check-count-consistency --strict, check-landing-page-counts --strict, check-workflow-generator-coverage, check-agents-md-command-sync, check-generated-content-untouched, validate-mcp-sync, check-mcp-impact. Codified per the `feedback_pre-tag-validator-bundle` memory rule established 2026-05-16.
3. **Em-dash sweep clean** - run `scripts/check-em-dashes` (canonical implementation per master plan D27); scope and allowlist owned by that script; zero non-allowlisted hits required
4. **Aggregate counters match declared** - re-derive skill count, command count, sub-agent count, validator count, family count; compare to declared values in `AGENTS/claude/CONTEXT.md`, `AGENTS.md`, `README.md`. Zero drift. Implementation EXTENDS `check-landing-page-counts` to cover internal-context surfaces per ci-plan v2.15.1 carry-in reconciliation.
5. **Cross-cutting audit clean** - chain to `pm-skill-auditor` for the full audit. Auditor returns layered output (full findings + Status Summary + Status YAML). Zero P0 findings required. P1+P2+P3 surfaced for maintainer judgment.
6. **Required files exist** - master plan at `docs/internal/release-plans/v{target}/plan_v{target}.md` exists and is marked READY TO TAG (or equivalent status); release notes draft exists or scheduled for G2

**Blocker:** any sub-check failure pauses G0. Maintainer resolves and re-runs G0.

### G1: Adversarial Review Status

**Goal:** Confirm Phase 0 Adversarial Review is complete and findings dispositioned.

**Sub-checks:**

1. **Phase 0 review complete** - maintainer attests the Codex (or alternate cross-LLM) adversarial review has been run against the release-prep state
2. **Findings dispositioned** - all P0 findings closed; P1 findings closed OR explicitly deferred to next release with rationale; P2 + P3 acknowledged
3. **Review artifact exists** (informational only) - if `_NOTES/` or `docs/internal/release-plans/v{target}/review/` contains the review record, the conductor reads it for context

**Blocker:** maintainer confirmation required. The conductor cannot auto-detect Phase 0 review status; this is a maintainer attestation gate.

### G2: Version Bump + CHANGELOG Prep

**Goal:** Apply release-state edits to public-facing surfaces (plugin manifest, marketplace manifest, CHANGELOG, doc-site changelog mirror, README badges, plan status, release notes).

**Sub-checks (conductor proposes each edit; maintainer confirms):**

1. **plugin.json version field** - edit `.claude-plugin/plugin.json` `version` to target version
2. **Marketplace manifest version** - edit `.claude-plugin/marketplace.json` (or equivalent) to match
3. **CHANGELOG.md header** - chain to `pm-changelog-curator` for a draft of entries; maintainer reviews + edits; new `## [vX.Y.Z] - YYYY-MM-DD` header at top
4. **docs/changelog mirror** - update Astro-rendered changelog mirror to match
5. **README badges** - version badges in `README.md` updated to target version
6. **Release plan status** - `plan_v{target}.md` status block updated to `SHIPPED YYYY-MM-DD`
7. **Release notes** - `docs/releases/Release_v{target}.md` exists; conductor reads it; maintainer confirms quality
8. **Hidden-comment leak check** - grep CHANGELOG.md for `<!-- justification:` (pm-changelog-curator debug comments). Fail if any remain; these are intended for maintainer audit only, not for committed CHANGELOG content.

**Blocker:** any sub-check failure pauses G2.

### G2.5: Commit Release-Prep + Re-Verify

**Goal:** Commit G2 edits and verify the new HEAD is releasable. This gate exists because G2 edits files WITHOUT committing; if G3 tagged the un-committed HEAD, the tag would point at a commit that does NOT contain release metadata. G2.5 closes that gap.

**Critical:** this gate was added per Codex review finding R01 (closed by master plan D22). Skipping G2.5 reintroduces the broken-tag class of bug that v2.13.1 surfaced.

**Sub-checks:**

1. **Working tree contains G2 edits** - `git status --porcelain` shows the expected G2-edited files; no surprise changes
2. **Stage G2 edits** - `git add` the specific files G2 edited; verify staged contents match expected
3. **Commit with release-prep message** - conventional commit message: `chore(v{target}): release-prep edits for v{target}` or maintainer-preferred form
4. **Working tree clean post-commit** - `git status --porcelain` empty
5. **Re-run G0 sub-checks against new HEAD** - validators, em-dash sweep, aggregate counter audit, cross-cutting audit (chains to pm-skill-auditor again) all run against the commit that includes release-prep edits; zero P0 findings required
6. **CI green on new HEAD** - push the new commit to the release branch on origin; verify CI runs and passes. Block on this; the tag must point at a CI-passing commit.
7. **Cross-reference commit SHA captured** - record the SHA that G3 will tag

**Blocker:** any sub-check failure pauses G2.5. The conductor refuses to advance to G3 if working tree is not clean OR if CI is not green on the new commit.

### G3: Tag + Push

**Goal:** Create the annotated tag on the SHA captured at G2.5 and push to origin.

**Sub-checks:**

1. **Tag target SHA confirmed** - G3 tags the SHA captured at G2.5 sub-check 7 (the commit containing release-prep edits and verified by CI). The conductor refuses to tag any other SHA.
2. **Tag message authored** - conductor presents a draft annotated-tag message (multi-paragraph: title + summary + headline changes)
3. **Maintainer approves message** - explicit confirmation required
4. **Tag created** - `git tag -a v{target} -m '<message>' {G2.5-captured-sha}`
5. **Push tag** - `git push origin v{target}` (requires explicit maintainer "ship it" confirmation)
6. **CI re-runs on tag** - tag push triggers a fresh CI run; the conductor monitors the run start (does NOT wait for completion at this gate; G4 handles post-tag verification)

**Blocker:** maintainer must confirm "ship it" before push. The conductor never pushes without this confirmation. The conductor also refuses to tag any SHA other than the one G2.5 captured.

### G4: Post-Tag Hygiene

**Goal:** Verify the release artifact is healthy on origin. Surface post-tag incidents with severity grading.

**Sub-checks (each produces a P0/P1/P2 incident on failure per master plan D23):**

1. **Plugin install path check (P0 on fail)** - smoke-test plugin install from the new tag. Failure = release artifact is broken; blocks "Release complete" output.
2. **Marketplace registration (P1 on fail)** - confirm marketplace listing still resolves. Failure = discoverability incident; surfaced but does not block.
3. **GitHub Pages rebuild (P1 on fail)** - confirm doc-stack rebuild was triggered. Failure = documentation incident; surfaced but does not block.
4. **GitHub Release UI body (P2 reminder)** - conductor reminds maintainer to author the GitHub Release UI body; does NOT auto-create.
5. **Next-cycle stub (P2 reminder)** - create `docs/internal/release-plans/v{next-minor}/plan_v{next-minor}.md` stub if not present.
6. **Post-tag follow-up tasks logged (P2 reminder)** - any deferred items captured in the next-cycle stub.

**Blocker (per D23):** P0 sub-check failures block the "Release complete" output. The conductor surfaces the failure as a post-tag incident and instructs the maintainer to either resolve OR explicitly log the issue as a known regression carried to v{next-patch}. The conductor refuses to emit "Release complete: v{target}" until either path is taken. P1 and P2 sub-checks are surfaced but do not block.

## No Bypass Policy

`--skip-gates` was deliberately removed from v2.16.0 per master plan D24 (closes Codex review R05).

If a maintainer needs to bypass a gate:

- **G0 sub-check failure:** the right path is almost always to fix the underlying issue. If the failure is in a validator that the maintainer believes is wrong, the right path is to fix the validator OR add an allowlist entry, then re-run G0.
- **G1 (adversarial review) for a hotfix:** if a CVE-driven fast patch needs to ship before a full Codex review can run, the maintainer manually runs `/jp-ai-review --review` against the patch state, makes a judgment call, and confirms at the G1 gate prompt. The conductor still requires the gate confirmation.
- **G2 hidden-comment leak check failure:** strip the comments via `sed -i.bak '/<!-- justification:/d' CHANGELOG.md` and re-run G2.
- **G2 dirty-tree after partial edits:** if the gate fails partway through (e.g., maintainer rejects sub-check 5 README badge edit after sub-checks 1-4 already applied), the working tree contains uncommitted release-prep changes. Two recovery paths: (a) commit the partial edits in a `wip(v{target}): partial release-prep` commit, decide on the rejected sub-check separately, then resume G2 from the failed sub-check forward; (b) discard the partial edits via `git restore` on each touched file and restart G2 from scratch. The conductor will refuse to advance to G2.5 with a dirty tree.
- **G2.5 post-push CI failure:** if G2.5 sub-check 6 fails (CI red on the release-prep commit you just pushed), the release-prep commit exists on origin but is not safe to tag. Recovery: (a) DO NOT advance to G3 (the conductor refuses anyway). (b) Fix the underlying issue. (c) Either `git commit --amend` the release-prep commit + `git push --force-with-lease` to update origin (preferred when no one has pulled the bad commit; preserves a single release-prep commit in history) OR add a `fix(v{target}): {issue}` follow-up commit + `git push` (preferred when the bad commit may have been pulled; keeps an audit trail). (d) Re-run G2.5 sub-checks 5-7 against the new HEAD: re-chain to auditor, verify clean tree, verify CI green, re-capture SHA. (e) Advance to G3 only after the new SHA is verified.
- **G4 P0 incident:** the right path is to ship a fast v{next-patch} OR explicitly log the issue as a known regression in the new cycle stub. The conductor refuses to emit "Release complete" until one of these paths is taken; it does NOT prevent you from manually marking the release complete - it just won't do it for you.

v2.17+ may reintroduce `--skip-gates` restricted to non-release dry-run mode only.

## Rollback Semantics

If a G4 P0 (plugin install path broken) cannot be resolved post-tag, the maintainer typically ships a fast v{next-patch} (e.g., v2.16.1) rather than reverting the tag. Tag reversion is destructive and not in v2.16 scope.

The conductor surfaces the v{next-patch} path as a recommendation but does NOT initiate it. Initiating a patch ship requires a fresh `/pm-release v{next-patch}` invocation with a new master plan stub.

For pre-G3 failures up through G2 (gates G0, G1, G2 only): there is nothing to roll back at the git level. The working tree may have uncommitted G2 edits; see "G2 dirty-tree after partial edits" in the No Bypass Policy section above for recovery paths.

For G2.5 failures (commit happened but CI failed OR a sub-check failed post-commit): the release-prep commit exists on the release branch on origin. The commit is NOT rolled back; it is amended forward or supplemented with a follow-up fix commit. See "G2.5 post-push CI failure" in the No Bypass Policy section above for the explicit recovery procedure. Branch reset is destructive and not recommended; the release-prep commit + any follow-up fix becomes part of the tagged history once G2.5 re-verification passes.

For G3 failures BETWEEN tag creation and push: tag exists locally only; deleting locally via `git tag -d v{target}` is safe. The conductor never reaches "Release complete" if push fails.

For G3 failures AFTER push but BEFORE G4 P0 detection: the tag exists on origin. If the maintainer detects the issue before any external consumer pulls the tag, force-deletion is technically possible (`git push origin :v{target}` + local delete) but destructive and not recommended for any pm-skills release that has been announced or marketplace-registered. Prefer the fast patch ship path.

## Cross-Client Notes

The `pm-release-conductor` sub-agent is a Claude Code plugin feature. Non-Claude clients access conductor intent via the dispatch skill at `skills/utility-pm-release-conductor/SKILL.md` (VALIDATED on Codex CLI 0.128.0 on 2026-05-17 via the "reference + execute inline" chain composition pattern; evidence at [`docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md`](../internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md)).

The conductor's chain composition (G0 chain to auditor, G2 chain to curator) requires the Agent tool, which is only available in Claude Code's plugin sub-agent runtime. On non-Claude clients, the dispatch skill uses the "reference + execute inline" pattern: instead of chaining, it inlines the auditor + curator behaviors at G0 + G2.

The maintainer running this runbook BY HAND (without any sub-agent) follows the same gate definitions. The conductor reduces friction; it does not change the runbook itself.

## Related Documentation

- Sub-agent implementation: [`subagents/pm-release-conductor.md`](https://github.com/product-on-purpose/pm-skills/blob/main/subagents/pm-release-conductor.md) (referential prompt; reads this runbook at invocation time)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md)
- Dispatch skill (cross-client): [`skills/utility-pm-release-conductor/SKILL.md`](https://github.com/product-on-purpose/pm-skills/blob/main/skills/utility-pm-release-conductor/SKILL.md) (VALIDATED on Codex CLI 2026-05-17)
- Pre-tag validator bundle: `scripts/pre-tag-validate.{sh,ps1}` (G0 + G2.5 sub-check entry point)
- Chain children: `subagents/pm-skill-auditor.md`, `subagents/pm-changelog-curator.md`
- Chain allowlist: `subagents/_chain-permitted.yaml` (lists only `pm-release-conductor`)
- Companion command: [`commands/pm-release.md`](https://github.com/product-on-purpose/pm-skills/blob/main/commands/pm-release.md)
- v2.15.1 clean-worktree runbook (predecessor for the manual maintainer flow): `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
- Adversarial review user guide (G1 context): [`docs/guides/adversarial-review.md`](../guides/adversarial-review.md)
- CHANGELOG hygiene rules (G2 context): `CLAUDE.md` (repo root)
