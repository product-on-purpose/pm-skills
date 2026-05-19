# AI Review: v2.16.1 Release Plan

**Document:** `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md`

**Document type:** plan

**Date:** 2026-05-18

**Requestor:** claude-opus-4.7 | **Reviewer:** codex | **Human:** JP

---

## Reviewer Assessment

**Note on reviewer identity:** the codex:codex-rescue agent dispatch returned a status placeholder without filling findings (Bash-only tool surface vs. structured-edit task; root-cause: tool-surface mismatch). The maintainer elected for claude-opus-4.7 to act as adversarial reviewer in-session rather than reschedule to external Codex CLI. **Cross-LLM independence is therefore NOT preserved** for this review. The rigor of the pressure test stands; the source-LLM separation does not.

> **Reviewer - claude-opus-4.7 (2026-05-18):** The v2.16.1 patch is correctly scoped and the validator gates pass cleanly. The principal residual risk is that G4's P0 smoke test (which IS the only thing that proves v2.16.1 actually fixes what v2.16.0 broke) is procedurally hand-wavy. The patch ships value only if the `/plugin update pm-skills` install path is verified working on Claude Code post-tag; the plan does not specify exact commands, expected output, or failure handling for that verification. One Major finding to address before G3 tag.

| Severity | Count |
|----------|-------|
| Blocker  | 0     |
| Major    | 1     |
| Minor    | 4     |
| Note     | 6     |

## Requestor Analysis & Proposed Actions

[P4: requestor fills after reviewing all findings]

> **Requestor - claude-opus-4.7 (YYYY-MM-DD):** [Agreement/disagreement with reviewer. High-level summary of proposed actions. Number of items flagged for human decision.]

### Recommendations

1. **[Action]** - [What, where, why] (Severity)
2. **[Action]** - [What, where, why] (Severity)
3. **[Action]** - [What, where, why] (Severity)

### Decisions for JP

| ID | Title | Status | Final Decision | Last Updated |
|----|-------|--------|----------------|--------------|
| D1 | [Short title] | Open | - | - |

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer for a pm-skills patch release (v2.16.1). Your job is to find problems, inconsistencies, gaps, and risks. You are not here to validate. You are here to pressure-test.

**Key principles:**

- Disagreement is more valuable than agreement.
- If you find nothing wrong in a section, say so explicitly and explain WHY.
- If you find nothing wrong anywhere, that's suspicious - look harder.
- Rate your confidence on each finding (high / medium / low).
- Cite specific evidence for every finding (section numbers, quotes, file paths, diff lines).

**Context:** v2.16.0 shipped on 2026-05-17 with an invalid `agents` field in `.claude-plugin/plugin.json`. Every `/plugin update pm-skills` since v2.16.0 has been failing with `agents: Invalid input`. v2.16.1 removes that field. 3-file manifest patch. Same 59-skill catalog. Native Claude Code sub-agent registration is deferred to v2.17.0 (needs the `AGENTS/` coordination directory renamed first).

The release was driven through the conductor's 6-gate runbook. G0 (pre-tag readiness) PASSED:

- 14 enforcing validators green (lint-skills-frontmatter, validate-agents-md, validate-commands, validate-meeting-skills-family, validate-foundation-sprint-skills-family --strict, validate-design-sprint-skills-family --strict, check-internal-link-validity --strict, validate-docs-frontmatter --strict, check-no-body-h1 --strict, check-count-consistency, check-generated-content-untouched, check-landing-page-counts, check-workflow-generator-coverage, check-agents-md-command-sync)
- Em-dash sweep clean (0 occurrences across release-prep files)
- Aggregate counters match declared (59 skills + 4 sub-agents + 12 workflows + 66 commands)
- Cross-cutting audit clean (D6 sub-agent + companion command pairing OK; 3 family contracts present)

**What I want pressure-tested:**

(a) Factual errors in release notes wording or aggregate counts.
(b) Backwards-compatibility regressions I missed.
(c) Reasoning errors in the v2.17/v3.0 scoping logic.
(d) Anything that would surface as a P0/P1 finding post-tag.

**Source documents:**

| Document | Path | Role |
|----------|------|------|
| Primary | `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` | The release plan (embedded below) |
| Supporting | `docs/releases/Release_v2.16.1.md` | Public release notes (embedded below) |
| Supporting | `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` diffs | Manifest changes (embedded below) |
| Supporting | `CHANGELOG.md` v2.16.1 entry | (embedded below) |
| Reference | `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` | v2.17 / v3.0 release scoping analysis (read at path; ~250 lines) |
| Reference | `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md` | v3.0 architecture target (read at path; ~300 lines) |
| Reference | `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` | v2.17 stub the patch defers items to (read at path) |
| Reference | `docs/contributing/release-runbook.md` | The 6-gate runbook this release walked (read at path) |

**Finding format:**

- [Severity | Confidence] Description with evidence woven in. Source says "X" (Section N) but also says "Y" (Section M). - Recommendation.

**Severity definitions:**

- **Blocker** - Must resolve before tagging. Will cause user-visible incorrect results, broken install, or factual inaccuracy in published release notes.
- **Major** - Should resolve before tagging. Significant gap causing user confusion or rework in v2.17.0.
- **Minor** - Can defer. Real issue but won't block v2.16.1 ship.
- **Note** - Observation or suggestion. No action required but worth considering.

---

## Document Under Review

### Primary: plan_v2.16.1.md (embedded)

```markdown
# v2.16.1 Release Plan: Plugin Manifest Schema Patch

**Status**: READY TO TAG
**Owner**: Maintainers
**Type**: Patch release (3-file manifest schema correction)
**Created**: 2026-05-18
**Updated**: 2026-05-18

## Release Theme

Remove the invalid `agents` field from `.claude-plugin/plugin.json` that has blocked `/plugin update pm-skills` since v2.16.0 shipped on 2026-05-17. The 59-skill catalog is unchanged from v2.16.0; the patch is fully scoped to the plugin manifest.

## Context

v2.16.0 declared a custom sub-agent path via `"agents": ["./subagents/"]` to work around the case-insensitive-filesystem collision between the tracked `AGENTS/` coordination directory and the canonical `agents/` directory Claude Code auto-discovers (per master plan D31 amendment). The schema assumption was wrong: Claude Code's plugin schema does not include an `agents` field. Result: every `/plugin update pm-skills` against v2.16.0 has been failing with:

  Plugin pm-skills has an invalid manifest file at .claude-plugin/plugin.json.
  Validation errors: agents: Invalid input

This patch removes the offending field. The dispatch skills at `skills/utility-pm-{role}/` continue to provide cross-client compatibility via inline execution. Native Claude Code sub-agent registration is deferred to v2.17.0 pending the `AGENTS/` directory rename.

### Prerequisites

- [x] v2.16.0 tagged and pushed (done 2026-05-17)
- [x] Validation error reproduced and root-caused (Claude Code plugin schema does not include `agents`)
- [x] v2.17.0 plan stub exists with the architectural fix scoped (`AGENTS/` rename + `subagents/` to `agents/` rename)
- [x] Release scoping doc `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` captures the v2.17 vs v3.0 split

## Decisions

| Decision | Answer | Rationale |
|---|---|---|
| Version | v2.16.1 (patch) | No skill content changes. Fixes a previously-broken update path. Patch per SemVer. |
| Bundle scope | plugin.json field removal + marketplace.json version bump + description refresh + CHANGELOG entry + release notes | All four changes are coupled to the same manifest defect. Smallest releasable unit. |
| Sub-agent registration fix | DEFER to v2.17.0 | Requires renaming the tracked `AGENTS/` coordination directory (multiple coordination files, scripts, docs reference it). Too large for a patch. Carried as Known Limitation per Release_v2.16.1.md. |
| Description refresh in marketplace.json | Include in v2.16.1 | Mentions the patch context (schema fix) for users reading the marketplace listing. |
| Adversarial review | Waive for 3-file patch | Scope is mechanical: remove one field, bump two versions, document the change. No skill, command, workflow, or sub-agent behavior changes. Maintainer attestation at G1. |
| Validator strategy | Full pre-tag-validate bundle | Per `feedback_pre-tag-validator-bundle` memory: every truly-enforcing validator with --strict, not the "feels green" subset. |
| Branch | Direct on main | Patch is minimal. Worktree adds friction without isolation benefit at this scope. |
| Tag SHA | G2.5-captured commit only | Per D22: tag points at the commit containing release-prep edits, not at pre-edit HEAD. |

## Deliverables

(plan_v2.16.1.md deliverables tables: manifest fixes, documentation, release governance. All marked "Done (staged)" or "Done (untracked)". Full content at the file path above.)

## Pre-release checklist (6-gate runbook)

G0 sub-checks all PASS. G1 in progress (this review is the G1 attestation work). G2 verification pending. G2.5 commit pending. G3 tag pending. G4 post-tag verification pending.

## Known limitations carried forward to v2.17.0

Native Claude Code sub-agent registration. Sub-agents live in `subagents/` rather than `agents/`. The architectural fix (rename `AGENTS/` then rename `subagents/` to `agents/`) is too large for a patch. Tracked at `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`.

The dispatch skills at `skills/utility-pm-{role}/` continue to provide the user-visible capability on every client.

## Status block

- Status: READY TO TAG
- Target SHA at plan-write time: 0836672 (HEAD before G2.5 commit)
- Expected G2.5 commit SHA: TBD
- Expected tag SHA: equals G2.5 commit SHA per D22
```

### Supporting: Release_v2.16.1.md (embedded)

```markdown
---
title: v2.16.1 Release Notes - Plugin Manifest Schema Patch
description: v2.16.1 ships a targeted patch that removes the invalid `agents` field from `.claude-plugin/plugin.json`. Resolves the `agents: Invalid input` validation error that blocked `/plugin update pm-skills` for all users since v2.16.0. The dispatch skills continue to operate via inline execution; native Claude Code sub-agent invocation is deferred to v2.17.0 pending the AGENTS/ directory rename.
date: 2026-05-18
status: SHIPPED
type: patch
---

Released: 2026-05-18
Type: Patch (manifest schema correction; same 59-skill catalog as v2.16.0)
Day-to-day usage: identical to v2.16.0 for all skills, commands, workflows, and dispatch flows

## TL;DR

v2.16.0 shipped with an invalid field in `.claude-plugin/plugin.json` (`"agents": ["./subagents/"]`). Claude Code's plugin schema does not include an `agents` field, and the canonical sub-agent directory is `agents/`, not a configurable custom path. The result: any user attempting `/plugin update pm-skills` against v2.16.0 sees:

  Plugin pm-skills has an invalid manifest file at .claude-plugin/plugin.json.
  Validation errors: agents: Invalid input

v2.16.1 removes the offending field. `/plugin update pm-skills` now succeeds. The same 59-skill catalog ships unchanged.

## What's fixed

### Plugin manifest validation

- Removed `"agents": ["./subagents/"]` from `.claude-plugin/plugin.json`. The field is not part of Claude Code's plugin schema (verified against [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)). Custom paths for sub-agent directories are not supported.
- Bumped plugin.json version from `2.16.0` to `2.16.1`.
- Bumped marketplace.json pm-skills entry version from `2.16.0` to `2.16.1`.

### What the user experience looks like now

| Before v2.16.1 | After v2.16.1 |
|---|---|
| `/plugin update pm-skills` fails with `agents: Invalid input` | `/plugin update pm-skills` succeeds |
| Fresh `/plugin install pm-skills@pm-skills-marketplace` rejects the manifest | Fresh install succeeds |
| 59-skill catalog (skills + commands + workflows) | 59-skill catalog (unchanged) |
| Dispatch skills at `skills/utility-pm-*/` (4 of them) | Same 4 dispatch skills, unchanged |
| Native Claude Code sub-agent registration | Not registered (carry-over from v2.16.0; see Known limitations) |

## Why it matters

The schema-violation error was a hard block on the update path. Anyone on v2.13.0 through v2.15.x trying to update to v2.16.0 was bouncing off the validation error. Any new user installing for the first time hit the same wall. v2.16.1 unblocks that path.

The dispatch skills (`utility-pm-critic`, `utility-pm-skill-auditor`, `utility-pm-changelog-curator`, `utility-pm-release-conductor`) shipped in v2.16.0 continue to function. Their canonical SKILL.md content includes inline-execution logic that reads `subagents/pm-{role}.md` and executes the sub-agent's behavior step-by-step on any client. This is the path validated for Codex CLI on 2026-05-17 (GATE B + GATE C PASS). On Claude Code, the dispatch skills run the same inline path as a workaround until native sub-agent registration is fixed in v2.17.0.

## Known limitations carried forward to v2.17.0

### Native sub-agent registration on Claude Code

The 4 sub-agent definitions (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) live in `subagents/` rather than the Claude Code-canonical `agents/` directory. Without the schema-invalid `"agents": ["./subagents/"]` mechanism v2.16.0 attempted, Claude Code does not auto-discover them as native sub-agents at install time.

The architectural fix requires renaming the existing tracked `AGENTS/` coordination directory (used for `AGENTS/DECISIONS.md`, `AGENTS/claude/CONTEXT.md`, `AGENTS/codex/CONTEXT.md`) to a name that does not collide with `agents/` on case-insensitive filesystems (Windows NTFS, macOS APFS). Once `AGENTS/` is freed up, `subagents/` can be renamed to `agents/` and Claude Code will auto-discover the sub-agents.

This rename is deferred to v2.17.0 because:

- It touches a tracked directory referenced by multiple coordination files, scripts, and docs.
- Patch releases should not introduce structural changes.
- The dispatch-skill inline-execution path already works on every client, including Claude Code, so the user-facing capability is not lost in the interim.

### What does NOT change in v2.16.1

- Skill catalog (59 skills: 26 phase + 8 foundation + 10 utility + 15 tool) is unchanged.
- Workflows (12) and slash commands (66) are unchanged.
- Dispatch skills behave the same way: they detect runtime, attempt native dispatch (Claude Code), and fall back to reading `subagents/pm-{role}.md` and executing inline (non-Claude clients, plus Claude Code while native registration is deferred).
- Doc-stack (Astro 6.3.x + Starlight 0.39.x, Node 22.12+) carried forward from v2.16.0.
- All v2.15.0 Sprint Skills, v2.12.0 OKR Skills, v2.11.0 Meeting Skills Family content unchanged.
```

### Supporting: Manifest diffs (embedded)

```diff
diff --git a/.claude-plugin/plugin.json b/.claude-plugin/plugin.json
@@ -3 +3 @@
-  "version": "2.16.0",
+  "version": "2.16.1",
@@ -24,2 +24 @@
-  ],
-  "agents": ["./subagents/"]
+  ]

diff --git a/.claude-plugin/marketplace.json b/.claude-plugin/marketplace.json
@@ -11,2 +11,2 @@
-      "description": "59 PM skills [...] v2.16.0 ships Active Orchestration as the first runtime-component layer alongside the content library [...]"
-      "version": "2.16.0",
+      "description": "59 PM skills [...] v2.16.1 patches the plugin.json manifest schema (removes the invalid `agents` field that blocked `/plugin update`). Active Orchestration carries forward from v2.16.0 [...]"
+      "version": "2.16.1",
```

### Supporting: CHANGELOG.md v2.16.1 entry (embedded)

```markdown
## [2.16.1] - 2026-05-18

Plugin Manifest Schema Patch. v2.16.0 shipped with an invalid field in `.claude-plugin/plugin.json` (`"agents": ["./subagents/"]`) that caused `/plugin update pm-skills` to fail validation with `agents: Invalid input`. v2.16.1 removes the offending field. Same 59-skill catalog. Same dispatch skills. Day-to-day usage identical to v2.16.0.

### Fixed

- Removed invalid `agents` field from `.claude-plugin/plugin.json`. Claude Code's plugin schema does not include this field (verified against code.claude.com/docs/en/plugins). The v2.16.0 attempt to declare a custom sub-agent path via `"agents": ["./subagents/"]` was based on a schema assumption that does not hold. Removing the field allows the manifest to validate and `/plugin update` to succeed.
- Bumped plugin.json version from `2.16.0` to `2.16.1`.
- Bumped marketplace.json pm-skills entry version from `2.16.0` to `2.16.1` and refreshed the description to mention the patch.

### Known limitations (carried forward to v2.17.0)

- Native Claude Code sub-agent registration is not active in v2.16.1. (Same content as in Release_v2.16.1.md above.)

### Not changed

- Skill catalog count: 59 skills (26 phase + 8 foundation + 10 utility + 15 tool).
- Workflows: 12. Slash commands: 66. Sub-agent definitions: 4.
- Doc-stack: Astro 6.3.x + Starlight 0.39.x + Node 22.12+ (unchanged from v2.16.0).
- All v2.15.0 Sprint Skills, v2.12.0 OKR Skills, v2.11.0 Meeting Skills Family content unchanged.
```

**Key claims to validate:**

1. Removing the `agents` field from plugin.json is sufficient to unblock `/plugin update pm-skills`.
2. Claude Code's plugin schema does not include an `agents` field.
3. The 59-skill catalog count (26 phase + 8 foundation + 10 utility + 15 tool) is accurate.
4. Workflows count (12), commands count (66), sub-agents count (4) are accurate.
5. The dispatch skills at `skills/utility-pm-{role}/` continue to work on Claude Code via the inline-execution path even without native sub-agent registration.
6. Splitting sub-agent native registration (v2.17.0; additive; low risk) from marketplace identity rename (v3.0.0; breaking; blocked on verification) is sound SemVer.
7. The `AGENTS/` to `agents/` case-insensitive-filesystem collision is a real architectural constraint, not a workaround for an imagined problem.
8. Tagging the G2.5-captured SHA (not the pre-G2-edit HEAD) is the right discipline (per D22).

---

## Findings

### 1. Plan Traceability

*Does the v2.16.1 patch trace cleanly from the problem (v2.16.0 plugin update failures) to the fix (one field removal + version bumps) to the post-tag verification (G4 plugin install path smoke test)?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> Problem-to-fix traceability is clean: the Context section names the failing path (`/plugin update pm-skills` returning `agents: Invalid input`), the Decisions table picks the smallest fix (remove the field), and the Deliverables table lists the 3 staged + 4 untracked files that constitute the patch. End-to-end trace exists.
>
> - [Minor | High] The fix has no explicit proof condition. The plan's G4 P0 sub-check reads "Plugin install path smoke test against v2.16.1 (P0 - this IS the fix; must succeed)" but does not state what "succeed" means operationally. A reader of this plan a year from now cannot reconstruct what was tested. Source says "must succeed" (plan G4 sub-check) but does not define succeed in terms of (a) which client (Claude Code vs. Codex CLI), (b) which command sequence (`/plugin marketplace update` then `/plugin update pm-skills`?), (c) which output indicates pass (absence of `agents: Invalid input`?). Recommendation: replace "P0: Plugin install path smoke test against v2.16.1" with an explicit sub-checklist (5-7 lines). See finding in Section 7 for proposed text.
>
> - [Note | Medium] G2.5 sub-check 6 ("CI green on the new commit") does not specify which CI workflows. The repo runs validation.yml, deploy-pages.yml, codeql.yml, validate-plugin.yml on push events. Source says "Verify CI green on the new commit" (plan G2.5 checklist). Recommendation: list the 4 workflows by name and mark which are blocking (probably validation.yml + validate-plugin.yml; deploy-pages and codeql are advisory).

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 2. File Inventory Accuracy

*Do all referenced file paths in the plan and release notes exist? Are the line-number references and quoted strings accurate? Specifically: does `subagents/_pairing.yaml` exist, does `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` exist as claimed, do the validator script paths resolve?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> All referenced file paths verified against filesystem:
> - `subagents/_pairing.yaml` EXISTS (verified; lists 4 pairings)
> - `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` EXISTS (60+ lines; carries v2.16 deferrals)
> - `scripts/pre-tag-validate.{sh,ps1,md}` all exist (verified)
> - `docs/contributing/release-runbook.md` exists (211 lines)
> - `subagents/pm-{critic,skill-auditor,changelog-curator,release-conductor}.md` all exist
> - `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` EXISTS (currently untracked; will commit at G2.5)
> - `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md` EXISTS (currently untracked; will commit at G2.5)
>
> - [Note | High] Plan Status block reads "READY TO TAG" but 4 of 6 listed deliverables (Release_v2.16.1.md; this plan; scoping doc; migration doc) are untracked at plan-write time. This is normal mid-G2 state where the runbook stages edits before G2.5 commits them, but the "READY TO TAG" framing slightly oversells the readiness. Source says "Status: READY TO TAG" (plan top + plan bottom). Recommendation: either change to "READY FOR G2.5 COMMIT + TAG" or accept the framing as referring to readiness state once G2.5 commits.
>
> - [Note | Medium] The migration doc references `docs/internal/multi-repo-extraction-design_2026-04-19.md` and `docs/internal/multi-repo-patterns-reference_2026-04-19.md` as related historical docs. I did not verify these exist. If they don't, the migration doc has dangling links. Recommendation: glob-check before committing the migration doc, or run `check-internal-link-validity --strict` against it specifically (the validator covers `docs/` recursively; should already have flagged any broken links).

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 3. Decision Log Coherence

*Are the 8 decisions in the plan's Decisions table internally consistent? Is the "Waive adversarial review for 3-file patch" decision sound given the patch removes a load-bearing field that the maintainer originally intended to keep? Does "DEFER sub-agent registration to v2.17.0" with no specified target date introduce drift risk?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> Decisions 1, 2, 4, 6, 7, 8 are sound. Decisions 3 and 5 surface real findings:
>
> - [Minor | High] Decision row "Adversarial review: Waive for 3-file patch" is directly contradicted by the maintainer's actual G1 attestation choice in this session (the maintainer ran a Codex review attempt, then this Claude review). Post-tag audit reading the plan in isolation would see "review waived" when it actually wasn't. Source says "Adversarial review: Waive for 3-file patch ... Maintainer attestation at G1" (plan Decisions table row 5). Recommendation: update the row to "Adversarial review: Run lightweight review at G1 attestation. Findings captured at `docs/internal/release-plans/v2.16.1/plan_v2.16.1_reviewed-by-claude.md`. Reviewer is Claude (codex:codex-rescue dispatch failed with tool-surface mismatch; documented in review file)." This also corrects the reviewer-LLM attribution since cross-LLM independence was not achieved.
>
> - [Minor | Medium] Decision row "Tag SHA: G2.5-captured commit only | Per D22" does not surface in the G3 sub-checks themselves. The G3 checklist (lines for tag message, tag creation, push) implies the SHA reference but does not explicitly assert "refuse to tag any SHA other than G2.5 captured." Source: plan Decisions table row 8 vs. plan G3 sub-checks. Recommendation: add "Verify tag target SHA = G2.5 captured SHA per D22" as the FIRST G3 sub-check, making the invariant explicit at the gate (matches conductor system prompt at `subagents/pm-release-conductor.md` lines 56-58 which marks this as load-bearing).
>
> - [Note | Medium] Decision row "DEFER sub-agent registration to v2.17.0" with no specified target date introduces schedule drift risk. v2.17.0 has a stub plan but no commitment date. Source says "DEFER to v2.17.0 ... Carried as Known Limitation per Release_v2.16.1.md" (plan Decisions row 3). Recommendation: surface this as a tracked v2.17.0 work item with a target window (e.g., "v2.17.0 ships within 2-4 weeks of v2.16.1"). Pure deferrals to undated future releases often slide.

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 4. Backwards Compatibility & Rollback (CUSTOM, addresses user ask (b))

*v2.16.1 ships 1 day after v2.16.0. Anyone who pulled v2.16.0 has a broken update path. Are there any users who currently rely on the `"agents": ["./subagents/"]` field as documented? Could ANY consumer (Cursor / Windsurf / Copilot / direct file-copy installers / forks) have wired into that field and break when it's removed? Is the rollback story (ship v2.16.2 if v2.16.1 itself breaks) adequately set up? Has the maintainer considered that some installs may be cached against v2.16.0 manifest and may not auto-update?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> Backwards-compat risk is genuinely low because v2.16.0's manifest fails Claude Code validation - no Claude Code user successfully installed v2.16.0. Other clients (Cursor / Windsurf / Copilot / Gemini CLI) do not read Claude Code's `plugin.json` schema; they use their own configurations. The sync-helper path at `.claude/pm-skills-for-claude.md` copies skill/command files directly and does not parse plugin.json. Risk inventory of "consumers wired into the `agents` field" is essentially zero.
>
> - [Note | High] Plan + release notes framing "unblocks the update path for users on v2.16.0" slightly mis-frames the problem. Because v2.16.0's manifest fails validation, NO Claude Code user successfully updated TO v2.16.0. The actual stuck state is: users on v2.13.0 through v2.15.x whose `/plugin update` was failing silently or with the `agents: Invalid input` error since 2026-05-17. v2.16.1 is what they can finally update to, jumping from v2.15.x directly. Source: plan Context section "every `/plugin update pm-skills` against v2.16.0 has been failing" (plan line 13) is accurate but the release notes "Before v2.16.1 / After v2.16.1" table at Release_v2.16.1.md line 36-42 reads as if users HAD v2.16.0 successfully. Recommendation: clarify in release notes that v2.16.0 was effectively un-installable and v2.16.1 is the first usable v2.16.x release. Minor wording tweak; not blocking.
>
> - [Note | Medium] Plan claims dispatch skills "continue to provide the user-visible capability on every client" including Claude Code via inline path. This was VALIDATED on Codex CLI 2026-05-17 per the v2.16.0 release notes but has NOT been explicitly re-verified on Claude Code in the v2.16.1 cycle. The Codex CLI validation generalizes well but is not a Claude Code test. Source: plan Known Limitations section + Release_v2.16.1.md Why-it-matters section. Recommendation: G4 P0 smoke test should additionally execute one dispatch slash command on Claude Code (e.g., `/pm-audit-repo`) and verify it runs the inline path correctly. See Section 7 for explicit checklist.
>
> - [Note | Low] No explicit rollback plan if v2.16.1 ITSELF ships with a defect. Plan inherits the runbook's "Tag reversion is destructive; ship v2.16.2 instead" stance, but does not name what fast-patch path would look like if the marketplace.json description refresh (the only non-mechanical change in v2.16.1) accidentally violates schema. Source: plan does not address; runbook Rollback Semantics section covers it generically. Recommendation: one line in plan stating "If v2.16.1 G4 P0 detects a defect, ship v2.16.2 via the same runbook; do not revert v2.16.1 tag."

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 5. Counter & Factual Accuracy (CUSTOM, addresses user ask (a))

*The plan and release notes assert: 59 skills (26 phase + 8 foundation + 10 utility + 15 tool); 4 sub-agents; 12 workflows; 66 commands. Pre-tag validators confirmed these match declared values. Are the descriptions in CHANGELOG / release notes / marketplace.json description otherwise accurate? Specifically: is the claim "Doc-stack runs on Astro 6.3.x + Starlight 0.39.x" still true at HEAD, or has Astro shifted? Is "VALIDATED on Codex CLI 2026-05-17" the right phrasing given the validation was specifically for the dispatch skills, not native registration?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> Counter re-derivation from filesystem confirms declared values:
> - Skills: 59 total (4 define + 6 deliver + 4 develop + 3 discover + 8 foundation + 4 iterate + 5 measure + 15 tool + 10 utility = 59). Phase subset (define + deliver + develop + discover + iterate + measure) = 4+6+4+3+4+5 = 26.
> - Sub-agents: 4 (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)
> - Workflows: 12 (after excluding `_workflows/README.md` which is a meta file)
> - Commands: 66
> All match the declared counts in plan + release notes + CHANGELOG + marketplace.json description.
>
> - [Minor | High] `.claude-plugin/plugin.json` description field reads "v2.16.0 introduces Active Orchestration..." but the version field is now `2.16.1`. The marketplace.json description was updated for v2.16.1 framing; plugin.json description was not. Internal inconsistency between version field (`2.16.1`) and description text ("v2.16.0 introduces..."). Source: plugin.json line 3 (version) vs. line 4 (description). Recommendation: update plugin.json description to either match marketplace.json's v2.16.1 framing OR use forward-compatible phrasing ("Recent: Active Orchestration..." or "v2.16.x introduces Active Orchestration..."). Cleaner: match marketplace.json. Code-side cost: edit one description string.
>
> - [Note | High] The claim "VALIDATED on Codex CLI 2026-05-17" appears in 3 places (plugin.json description, marketplace.json description, plan Context) and refers specifically to the v2.16.0 G2 GATE B + GATE C dispatch skill validation. It does NOT refer to native sub-agent registration validation (which has never been validated because the field was schema-invalid). The current phrasing is accurate but ambiguous for a reader who reads the description out of context. Source: plan + descriptions. Recommendation: optional clarification - "(VALIDATED on Codex CLI 2026-05-17 for dispatch skill inline-execution path)" makes the scope of the validation explicit.
>
> - [Note | Medium] Doc-stack claim "Astro 6.3.x + Starlight 0.39.x" was not re-verified at HEAD in this review. The G0 validator bundle does not check installed package versions; it runs against rendered output. The doc-stack version claim is informational only, not a release artifact, so even if drifted it would not affect the tag. Source: plan + release notes + descriptions. Recommendation: skip; not worth verifying for a manifest patch. Flag in v2.17.0 pre-tag checklist instead since v2.17 will likely touch the doc-stack via the AGENTS/ rename.

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 6. v2.17 / v3.0 Scoping Logic (CUSTOM, addresses user ask (c))

*Read `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` and `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md` for context. The scoping doc argues for splitting: v2.17 carries the sub-agent native registration fix (additive, low risk); v3.0 carries the marketplace identity rename (breaking, blocked on verification). Is the SemVer reasoning sound? Is the "marketplace rename has unknown Claude Code behavior" assertion in V1 a real blocker, or could it be tested in v2.17? Does the recommended scoping create a v3.0 deferral that may never close (premature versioning)? Should any items be re-shuffled between the two releases?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> SemVer reasoning is sound. Sub-agent native registration is additive from the user's perspective (existing dispatch skills continue to work; native invocation is a new affordance). Marketplace identity rename is breaking from the user's perspective (install command changes). Splitting them across v2.17 (minor) and v3.0 (major) is the textbook SemVer call.
>
> The "marketplace rename Claude Code behavior is unknown" V1 blocker is genuine: Claude Code's marketplace cache keying behavior on a `name` field change is undocumented at code.claude.com. Three sub-cases (silent auto-update / documented migration / silent stale) have materially different user-disruption levels. Test cost is real (~2-4 hours; spin up test marketplace, change name, observe behavior on fresh + existing installs).
>
> - [Note | High] The two reference docs disagree on whether the v2.17 vs v3.0 split is decided. The scoping doc (`release-scoping-v2.17-and-v3.0_2026-05-18.md`) closes the question with a recommended split. The migration doc (`marketplace-multi-plugin-migration_2026-05-18.md`) Open Question 4 still reads "pm-skills v2.16.0 to v3.0.0 (recommended for breaking marketplace rename) or v2.17.0 (treating it as additive)?" as TBD pending Phase 0. The migration doc is also dated 2026-05-18; both docs were authored same-day; they should agree by EOD. Source: scoping doc Recommended Scoping section vs. migration doc Open Question 4. Recommendation: edit migration doc Open Question 4 to read "Resolved per `release-scoping-v2.17-and-v3.0_2026-05-18.md`: v3.0.0 for the marketplace rename." Or alternately, mark the scoping doc as "pending OQ4 closure in migration doc" if you want the migration doc to remain canonical.
>
> - [Note | Medium] V1 (marketplace-rename behavior test) is well-scoped but unestimated. Real cost: 2-4 hours including teardown. The scoping doc says "Stand up a sacrificial test marketplace" without naming what that takes. Source: scoping doc V1 section. Recommendation: add effort estimate to V1; consider whether the test can run in parallel with v2.17 work or must precede v3.0 scheduling.
>
> - [Note | Low] The v3.0.0 plan is currently a 250-line scoping doc + a 484-line architecture doc. There is no `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` yet. The scoping doc Next Steps section calls for one. Source: both docs Next Steps + migration doc Phase 0 Done state. Recommendation: do not block v2.16.1; create the v3.0.0 plan stub as part of v2.17 cycle scheduling.
>
> The "premature versioning" concern is muted. v3.0 has concrete deliverables (rename marketplace, optional repo rename, multi-plugin support), not a vague aspiration. The risk that "v3.0 never closes" is small because v2.17's sub-agent rename also touches `AGENTS/` which surfaces the same case-insensitivity concern that the marketplace work has to reckon with. Schedule pressure naturally drives both forward.

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

### 7. Success Criteria & Post-Tag Verification (addresses user ask (d))

*G4's P0 sub-check is the plugin install smoke test (THE critical test for this release - the patch IS the fix). The plan does not specify HOW the smoke test is run (which client, which environment, which install command sequence). Is this a gap? What other post-tag detection paths exist if v2.16.1 itself has a defect (e.g., the description-refresh in marketplace.json introduces a different schema violation)? Are CI workflows on tag push sufficient or is manual verification required?*

**Reviewer - claude-opus-4.7 (2026-05-18):**

> This is the Major finding for the review. G4 P0 is THE only sub-check that proves v2.16.1 delivers value (the fix unblocks `/plugin update pm-skills`). If G4 P0 passes by accident or under loose criteria, the release ships unverified. If it fails because the criteria are too strict, the release is blocked from "Release complete" status.
>
> - [Major | High] G4 P0 sub-check "Plugin install path smoke test against v2.16.1 (P0 - this IS the fix; must succeed)" is procedurally under-specified. Source: plan G4 checklist. The smoke test should be procedurally written so a reader 6 months from now can run the exact verification. Recommendation: replace the single line with this checklist before tag:
>
>   ```
>   G4 P0 sub-check: Plugin install path smoke test (Claude Code)
>
>   1. On a Claude Code instance with pm-skills currently installed at v2.15.x or v2.16.0 (failing state):
>      a. Run /plugin marketplace update
>      b. Expected: no schema validation errors; the marketplace fetch succeeds
>      c. Run /plugin update pm-skills
>      d. Expected: update succeeds (no "agents: Invalid input" error); plugin version reports 2.16.1
>
>   2. On a Claude Code instance with NO pm-skills installed (fresh install):
>      a. Run /plugin marketplace add product-on-purpose/pm-skills
>      b. Run /plugin install pm-skills@pm-skills-marketplace
>      c. Expected: both succeed; plugin available; version 2.16.1
>
>   3. On the updated/installed Claude Code instance:
>      a. Run /pm-audit-repo (dispatch slash command from utility-pm-skill-auditor)
>      b. Expected: command resolves; dispatch skill executes inline path (sub-agent not natively registered, see Known Limitations)
>
>   Pass: all 3 scenarios succeed.
>   Fail: any scenario errors. Resolution path = ship v2.16.2 with the specific fix; do not revert v2.16.1 tag (destructive per runbook Rollback Semantics).
>   ```
>
> - [Minor | Medium] G4 P1 sub-check "Marketplace registration resolves" is also under-specified. Recommendation: collapse into sub-check above (scenarios 1 and 2 already cover marketplace fetch). Reduces G4 from 6 sub-checks to 5 and removes redundancy.
>
> - [Note | Medium] G4 has no scheduled timing for post-tag verification. The plan does not say "verify within 30 minutes of tag push" or "verify within 24 hours." For a patch this size, fast turnaround is feasible. Recommendation: maintainer should run G4 P0 immediately post-G3-push (within the same session). Long delay between tag and smoke test means users are pulling an unverified release.
>
> - [Note | Low] G4 has no rollback exit. If G4 P0 fails, the runbook says "ship v2.16.2 fast patch" but the plan does not include a v2.16.2 scaffold pre-authored. Recommendation: not blocking; create v2.16.2 plan stub only if G4 P0 actually fails.

**Requestor - claude-opus-4.7 (YYYY-MM-DD):**

> *Response goes here.* [P4]

---

## Proposed Actions

[P4: single table consolidating all changes and deferred items]

| # | Action | Target | Change | Triggered By |
|---|--------|--------|--------|-------------|
| 1 | Update | [section/file] | [Specific change] | [Section, Severity] |
| 2 | Defer  | backlog | [Item for later] | [Section, Severity] |
