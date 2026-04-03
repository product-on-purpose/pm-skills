# pm-skills Baseline Cleanup: Technical Reference

**Engineering breakdown of the March 2026 repo hygiene effort**

Period: March 11-20, 2026
Agents: Claude Opus 4.6 (interactive, terminal) + Codex GPT-5.4 (cloud worktree)
Status: Complete. All tasks merged to main. A-5 intentionally deferred.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Scope and Constraints](#2-scope-and-constraints)
3. [Coordination Model](#3-coordination-model)
4. [Dependency Chain](#4-dependency-chain)
5. [Claude Lane: Task Breakdown](#5-claude-lane-task-breakdown)
   - [A-1: Commit .claude/settings.json deletion](#a-1-commit-claudesettingsjson-deletion)
   - [A-2: Fix CHANGELOG.md _NOTES/ reference](#a-2-fix-changelogmd-_notes-reference)
   - [A-3: Remove stale skill-template.md stub](#a-3-remove-stale-skill-templatemd-stub)
   - [A-4: Update AGENTS/claude/CONTEXT.md to v2.6.1](#a-4-update-agentsclaudecontextmd-to-v261)
   - [A-8: Add context-currency scripts](#a-8-add-context-currency-scripts)
   - [A-9: Add advisory CI step to validation.yml](#a-9-add-advisory-ci-step-to-validationyml)
   - [A-11: Establish effort tracking infrastructure](#a-11-establish-effort-tracking-infrastructure)
   - [A-5: (Deferred) Add currency check to wrap-session](#a-5-deferred-add-currency-check-to-wrap-session)
6. [Codex Lane: Task Breakdown](#6-codex-lane-task-breakdown)
   - [C-1: Rewrite active policy docs](#c-1-rewrite-active-policy-docs)
   - [C-2: Consolidate release governance and normalize effort entry points](#c-2-consolidate-release-governance-and-normalize-effort-entry-points)
   - [C-3: Refresh Codex continuity and shared decision capture](#c-3-refresh-codex-continuity-and-shared-decision-capture)
   - [C-4: Align contributor schema and authoring docs](#c-4-align-contributor-schema-and-authoring-docs)
   - [C-5: Align public/reference docs and remove speculative surfaces](#c-5-align-publicreference-docs-and-remove-speculative-surfaces)
   - [C-6: Clean remaining release/sample docs](#c-6-clean-remaining-releasesample-docs)
7. [Key Design Decisions](#7-key-design-decisions)
8. [Infrastructure Established](#8-infrastructure-established)
9. [Files Changed: Full Inventory](#9-files-changed-full-inventory)
10. [Quick Reference: All Tasks](#10-quick-reference-all-tasks)

---

## 1. Problem Statement

By early March 2026, four categories of drift had accumulated in the pm-skills repository:

**Context staleness.** `AGENTS/claude/CONTEXT.md` described v2.3.0. The repo was at v2.6.1. Seven releases (v2.4.0 through v2.6.1), infrastructure additions (the sample library, plugin manifest, 25th skill), and structural changes (the `library/` and `.claude-plugin/` directories) were absent from the file that every Claude session reads first.

**CLAUDE.md rule violation.** `CHANGELOG.md` contained a reference to `_NOTES/delivery-plan/releases/v2.6.1/artifacts/skill-output-samples_manifest.v2.6.1.json`. That path is gitignored. `CLAUDE.md` explicitly prohibits referencing gitignored paths in public-facing files.

**Dirty git state.** `.claude/settings.json` had been deleted from the working directory but not committed. `git status` perpetually showed a pending deletion.

**Governance model mismatch.** Internal policy docs, release notes, effort briefs, and contributor guides described two different canonical models: a previous model (split between `_NOTES/`, `docs/internal/release-planning/`, and `docs/internal/delivery-plan/`) and the accepted model (`docs/internal/release-plans/**` for release governance, `docs/internal/efforts/**` for effort briefs, GitHub issues for backlog state). The accepted model was decided but not propagated.

---

## 2. Scope and Constraints

**In scope:**
- Fix all four problem categories above
- Establish automated detection for context staleness
- Normalize internal governance documentation to the accepted model
- Align contributor documentation to the current shipped frontmatter schema
- Align public/reference documentation to current repo state

**Out of scope:**
- Archive cleanup or deletion of historical content
- New features or skill additions
- Refactoring of the skills themselves
- wrap-session workflow redesign (deferred as A-5)
- Changes to pm-skills-mcp

**Governing constraints:**
- Prefer narrow migrations; do not expand scope
- Do not reopen policy questions already settled
- Keep both `AGENTS/claude/` and `AGENTS/codex/` first-class
- Only `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md` are intentionally shipped Claude-facing tracked artifacts

---

## 3. Coordination Model

Two agents operated from separate execution plans with a shared coordinator document, now preserved in this milestone folder at `planning-execution/execution_shared-claude-codex.md`. During live execution, that coordinator originally lived under `_NOTES/baseline-standards/`.

**Ownership model:** Each task had exactly one owner. No shared ownership. This eliminated conflict on overlapping files.

**State persistence:** The shared coordinator document was the source of truth for task status, dependencies, and handoff notes. Neither agent relied on session memory for cross-agent state.

**Dependency protocol:** Agents read the coordinator before starting each task batch. If a dependency had not landed, the task was held.

**File boundary rule:** Neither agent edited the other's `AGENTS/<agent>/CONTEXT.md` unless explicitly instructed. This prevented each agent from overwriting the other's session continuity state.

**Cross-agent reading rule:** If one agent changed a canonical path or policy document, the other was required to re-read that file before continuing any dependent work.

**Critical sequencing decision:** C-3 (Codex continuity refresh) was required before A-8 (context-currency scripts) to ensure the currency check started in a passing state on main. Running A-8 before C-3 would have embedded a known stale-CONTEXT.md failure into the initial CI run.

---

## 4. Dependency Chain

Tasks with no dependencies ran independently or in parallel. The critical path ran through the policy foundation into governance structure into agent continuity into automated detection.

```
A-1  (git state)            .............. independent, run first
A-2  (CHANGELOG ref)        .............. independent, run first
A-3  (stub removal)         .............. independent, run first
A-4  (Claude context)       .............. independent, run first

C-1  (policy docs)
  |
  +-- C-2  (canonical homes established)
        |
        +-- A-11  (effort tracking: now has a tracked home)
        |
        +-- C-3  (Codex context current: prerequisite for currency check)
              |
              +-- A-8  (currency scripts: require both contexts current)
              |     |
              |     +-- A-9  (CI step: requires scripts to exist)
              |
              +-- C-4  (contributor docs: stable model to teach)
                    |
                    +-- C-5  (public docs: stable model to reflect)
                          |
                          +-- C-6  (release/sample cleanup: closes the loop)
```

A-5 is independent but deferred; it has no downstream dependencies in this lane.

---

## 5. Claude Lane: Task Breakdown

---

### A-1: Commit .claude/settings.json deletion

**Commit:** `b4d0043` | **Landed:** 2026-03-11

**Problem:** `.claude/settings.json` was deleted from the working directory but the deletion had never been staged or committed. The file contained `{ "permissions": { "allow": ["Bash(gh issue list:*)"] } }` -- a machine-specific permission that belongs in `settings.local.json` (gitignored), not in tracked configuration.

**Change:** `git rm .claude/settings.json` staged and committed. No file content was modified.

**Why it was tracked to begin with:** Likely added during an early setup session before the distinction between `settings.json` (tracked, shared) and `settings.local.json` (local, gitignored) was fully established.

**Files changed:** `.claude/settings.json` (deleted)

---

### A-2: Fix CHANGELOG.md _NOTES/ reference

**Commit:** `067b684` | **Landed:** 2026-03-11

**Problem:** Lines 24-25 of `CHANGELOG.md` referenced `_NOTES/delivery-plan/releases/v2.6.1/artifacts/skill-output-samples_manifest.v2.6.1.json`. That path is inside the gitignored `_NOTES/` tree. The `CLAUDE.md` documentation rule states: "Never reference gitignored internal notes in public-facing files."

**Change:** The two-line reference was replaced with the single line: `- Sample coverage manifest moved to release-planning artifacts (internal)`. A post-edit grep for `_NOTES/` across the full file confirmed no remaining occurrences.

**Files changed:** `CHANGELOG.md`

---

### A-3: Remove stale docs/templates/skill-template.md stub

**Commit:** `b7046db` | **Landed:** 2026-03-11

**Problem:** A zero-byte file existed at `docs/templates/skill-template.md` alongside a canonical skill template directory at `docs/templates/skill-template/` (containing `SKILL.md`, `references/TEMPLATE.md`, and `references/EXAMPLE.md`). The stub was a leftover from an earlier navigation approach.

**Change:** `git rm docs/templates/skill-template.md`. The directory was verified untouched after removal.

**Note:** The plan predicted a 1-3 line stub. The file was actually 0 bytes. Outcome was identical.

**Files changed:** `docs/templates/skill-template.md` (deleted)

---

### A-4: Update AGENTS/claude/CONTEXT.md to v2.6.1

**Commit:** `22d9643` | **Landed:** 2026-03-11

**Problem:** `AGENTS/claude/CONTEXT.md` was the most impactful stale file in the repo. It described v2.3.0. The gap: v2.4.0, v2.4.1, v2.4.2, v2.4.3, v2.5.0, v2.5.1, v2.5.2, v2.6.0, v2.6.1 were all absent from Recent Work. Infrastructure facts were stale: skill count (was 24, now 25), command count (was 24, now 26), sample library was absent, plugin manifest was absent.

**Changes made:**
- Status line: `v2.3.0` to `v2.6.1 shipped`
- Last Updated: to `2026-03-11`
- Recent Work: backfilled all 7 releases; v2.4.x condensed into a grouped entry
- Architecture tree: added `library/` and `.claude-plugin/` entries; verified `scripts/` entry list
- Infrastructure section: updated counts (25 skills, 26 commands, 95 sample outputs)
- Next Steps: replaced stale priorities with (1) baseline hygiene execution, (2) v2.7.0 persona library, (3) awesome-list campaign
- Skills Inventory: added Foundation section for `foundation-persona` (classification: foundation, v2.5.0)
- Removed two stale `_NOTES/` path references from older Recent Work entries

**Files changed:** `AGENTS/claude/CONTEXT.md` (+88/-52 lines)

---

### A-8: Add context-currency scripts

**Commit:** `770737f` | **Landed:** 2026-03-18

**Problem:** A-4 fixed the current staleness. Nothing prevented the same drift from accumulating again.

**Scripts created:**
- `scripts/check-context-currency.sh` (bash, CI/Ubuntu/macOS)
- `scripts/check-context-currency.ps1` (PowerShell, Windows)

**Logic:**

1. Extract the latest release version from `CHANGELOG.md` using the pattern `## \[[0-9]+\.[0-9]+\.[0-9]+\]` (skipping `[Unreleased]`); normalize to `v`-prefixed form
2. For each `AGENTS/*/CONTEXT.md`: extract the first `v[0-9]+\.[0-9]+\.[0-9]+` match in the file
3. Compare; report mismatches; exit 1 on any stale file, exit 0 if all current

**Output format (bash):**
```
✓ AGENTS/claude/CONTEXT.md : v2.6.1
✗ AGENTS/codex/CONTEXT.md : shows v2.4.3 but CHANGELOG is at v2.6.1
```

**Output format (PowerShell):**
```
[OK] AGENTS/claude/CONTEXT.md : v2.6.1
[STALE] AGENTS/codex/CONTEXT.md : shows v2.4.3 but CHANGELOG is at v2.6.1
```

**Design notes:**

- Detection only; no auto-fix. Exit codes are CI-compatible.
- Version detection uses the first `vX.Y.Z` match in each CONTEXT.md. This works because both agent context files place the current version near the top. Future maintainers should maintain this invariant: do not put historical version references before the current-version declaration in a CONTEXT.md.
- The CHANGELOG uses the format `## [2.6.1]` (no `v` prefix); the normalization step prepends `v` before comparison.
- Code style follows existing `scripts/validate-commands.sh` and `scripts/lint-skills-frontmatter.sh` conventions: `set -euo pipefail`, ROOT from `BASH_SOURCE[0]`, `✓`/`✗` symbols in bash; `$ErrorActionPreference = "Stop"`, `[OK]`/`[FAIL]` bracket tags in PowerShell.

**Test run at commit time:**
```
✓ AGENTS/claude/CONTEXT.md : v2.6.1
✗ AGENTS/codex/CONTEXT.md : shows v2.4.3 but CHANGELOG is at v2.6.1
exit: 1
```
Claude's context was current (A-4 already landed). Codex's context was stale (C-3 not yet landed on main). Correct.

**Files changed:** `scripts/check-context-currency.sh` (new, 49 lines), `scripts/check-context-currency.ps1` (new, 50 lines)

---

### A-9: Add advisory CI step to validation.yml

**Commit:** `de7c3bd` | **Landed:** 2026-03-18

**Prerequisite verification:** Before adding the CI step, the currency check was run against current main to confirm it would start in a passing state (both C-3 and A-4 were already landed):
```
✓ AGENTS/claude/CONTEXT.md : v2.6.1
✓ AGENTS/codex/CONTEXT.md : v2.6.1
exit: 0
```

**Change:** Two steps added to `.github/workflows/validation.yml`, following the existing bash/PowerShell pair pattern used by `validate-commands` and `lint-skills-frontmatter`:

```yaml
- name: Check CONTEXT.md currency (bash)
  if: matrix.os == 'ubuntu-latest'
  run: bash scripts/check-context-currency.sh
  continue-on-error: true

- name: Check CONTEXT.md currency (pwsh)
  if: matrix.os == 'windows-latest'
  run: pwsh -File scripts/check-context-currency.ps1
  continue-on-error: true
```

**Placement:** After the existing lint/validate steps, as the last two steps in the job.

**`continue-on-error: true` rationale:** Context staleness is a maintenance concern, not a correctness failure. PRs should never be blocked by an unrelated CONTEXT.md update. The warning is visible in the Checks tab but does not gate merges.

**Files changed:** `.github/workflows/validation.yml` (+11 lines)

---

### A-11: Establish effort tracking infrastructure

**Commits:** `a99d0f5`, `bba31ed` | **Landed:** 2026-03-17

**Problem:** Effort context existed only in `_NOTES/efforts/` (local-only, gitignored). Cloud agents (Codex) had no access to it. GitHub issues existed but had no linked durable context. There was no standard format for capturing "what did this effort deliver and why."

**Three-layer model established:**

| Layer | What | Where |
|-------|------|-------|
| GitHub Issue | Lifecycle state (open/closed), label, milestone | github.com |
| Effort brief | Spec, scope, decisions, artifact paths, PR links | `docs/internal/efforts/` |
| Working space | Discovery, prep, drafts | `_NOTES/efforts/` (unchanged) |

**Brief template structure:**
```markdown
# [{ID}] {Name}
Status: Active | Shipped | Cancelled
Milestone: vX.Y.Z
Issue: #{number}

## Scope
## Key Decisions
## Artifacts Produced
## PRs
```

**Briefs created:**

- `F-02-persona-skill.md` (Status: Shipped, Milestone: v2.5.0, Issue: #108, closed)
  Created from `_NOTES/efforts/active/F-02-persona-skill/` and CHANGELOG v2.5.0 entries.

- `F-03-persona-library-tier0.md` (Status: Active, Milestone: v2.7.0, Issue: #109, open)
  Confirmed Active; CHANGELOG v2.5.0 records persona archetype library shipment as deferred.

- `M-10-skill-sample-outputs-library.md` (Status: Shipped, Milestone: v2.6.1, Issue: #110, closed)
  Rewritten from prior governance-heavy format to standardized template.

**GitHub infrastructure created:**
- Label: `effort` (color `#0E8A16`)
- Milestone: `v2.7.0` (milestone #3, open)
- Issues: #108 (F-02, closed "Shipped in v2.5.0"), #109 (F-03, open, assigned to v2.7.0), #110 (M-10, closed "Shipped in v2.6.1")

**`docs/internal/efforts/README.md`** was created by C-2 (Codex) before A-11 executed; A-11 added the three brief files to the existing directory.

**Note for C-6:** The M-10 brief had already been present from C-2 in an older governance-heavy format. A-11 replaced it with the standardized template. C-6 was instructed to re-read M-10 before editing, which it did.

**Files changed:** `docs/internal/efforts/F-02-persona-skill.md` (new), `docs/internal/efforts/F-03-persona-library-tier0.md` (new), `docs/internal/efforts/M-10-skill-sample-outputs-library.md` (rewritten), `docs/internal/efforts/README.md` (updated)

---

### A-5: (Deferred) Add currency check to wrap-session

**Status:** Deferred. Do not execute in this baseline lane.

**What it would do:** Add a step to the wrap-session workflow that compares `AGENTS/*/CONTEXT.md` against the latest version in `CHANGELOG.md` at session end and prompts an update if they diverge.

**Why deferred:** The wrap-session workflow is a cross-cutting, shared workflow that benefits from a focused redesign effort rather than an additive patch. A-8 and A-9 address the detection and CI visibility requirement. A-5 adds a proactive human-loop reminder layer. The marginal urgency does not justify the risk of an underdesigned change to a shared workflow.

**Blocked by:** Nothing technical. Deferred by explicit decision.

---

## 6. Codex Lane: Task Breakdown

---

### C-1: Rewrite active policy docs

**Landed:** 2026-03-15

**Problem:** `docs/internal/planning-persistence-policy.md` and `docs/internal/planning-artifact-tier-map.md` described a split canonical model across `_NOTES/`, `docs/internal/release-planning/`, and `docs/internal/delivery-plan/`. The accepted model had moved to `docs/internal/release-plans/**` and `docs/internal/efforts/**`, but the policy files had not been updated.

**Changes:** Both files rewritten to reflect:
- `docs/internal/release-plans/**`: tracked release governance home
- `docs/internal/efforts/**`: tracked effort brief home
- `_NOTES/**`: local-only, never canonical
- `docs/internal/release-planning/**` and `docs/internal/delivery-plan/**`: legacy/historical, not current canonical

**Why this ran first:** Policy docs are the foundation. Downstream docs inherit their model. Correcting the policy layer first meant all subsequent Codex work could reference the correct model without contradiction.

**Files changed:** `docs/internal/planning-persistence-policy.md`, `docs/internal/planning-artifact-tier-map.md`

---

### C-2: Consolidate release governance and normalize effort entry points

**Landed:** 2026-03-16

**Problem:** `docs/internal/release-plans/` did not exist as a canonical home with a README. Backlog canonical pointed to a gitignored path. `docs/internal/efforts/` had no README. The M-10 effort brief referenced `_NOTES/` paths.

**Changes:**
- Created `docs/internal/release-plans/README.md` (canonical home declaration, operating rules)
- Created `docs/internal/efforts/README.md` (effort brief conventions and three-layer model)
- Rewrote `docs/internal/backlog-canonical.md` as a short policy/index: backlog state lives in GitHub issues; effort context in `docs/internal/efforts/**`
- Updated `docs/internal/release-planning/README.md` and `docs/internal/delivery-plan/README.md` as legacy/redirect surfaces
- Updated M-10 brief to remove `_NOTES/` references (later replaced wholesale by A-11)

**What this unblocked:** A-11 (effort tracking: now has a tracked `docs/internal/efforts/` home with a README convention to follow).

**Files changed:** `docs/internal/release-plans/README.md` (new), `docs/internal/efforts/README.md` (new), `docs/internal/backlog-canonical.md` (rewritten), `docs/internal/release-planning/README.md` (updated), `docs/internal/delivery-plan/README.md` (updated), `docs/internal/efforts/M-10-skill-sample-outputs-library.md` (updated, later superseded by A-11)

---

### C-3: Refresh Codex continuity and shared decision capture

**Commit:** `ad6deb8` | **Landed:** 2026-03-17 (worktree), merged 2026-03-18

**Problem:** `AGENTS/codex/CONTEXT.md` described v2.4.3 (the release baseline when Codex last updated it). The file still referenced the deleted `.claude/settings.json`. The Immediate Next Steps section described priorities from February. `AGENTS/DECISIONS.md` had two entries from February with no entries capturing the baseline cleanup decisions.

**Changes to AGENTS/codex/CONTEXT.md:**
- Status updated to v2.6.1 baseline
- Project snapshot updated (25 skills, current paths, accepted baseline model)
- Operational playbook updated
- Immediate Next Steps rewritten to reflect current cleanup state
- Stale `.claude/settings.json` reference removed

**Changes to AGENTS/DECISIONS.md:**
- Existing February entries preserved
- New entries added capturing baseline cleanup operating decisions (canonical homes, agent boundary rules, continuity rules)

**Why the sequencing was critical:** C-3 had to land before A-8. Once A-8 was committed and A-9 added the CI step, every PR would run the currency check. If C-3 was not yet on main, the check would fail on Codex's stale context, creating CI noise from the first run. The decision to sequence C-3 before A-8 was an explicit coordination point between the two agents.

**Worktree note:** C-3 was executed in the `codex-baseline-refresh` worktree branch, then landed onto main as `ad6deb8`. Claude's A-8 and A-9 ran against main after this merge.

**Files changed:** `AGENTS/codex/CONTEXT.md` (rewritten), `AGENTS/DECISIONS.md` (entries added)

---

### C-4: Align contributor schema and authoring docs

**Commit:** `22d96e5` | **Landed:** 2026-03-20

**Problem:** Multiple contributor-facing docs still taught the old frontmatter model:
- `metadata.version` (removed in favor of root `version`)
- No `updated` field
- No `classification` field
- `name` described as a short alias (e.g., `prd`) rather than the full directory-matching name (e.g., `deliver-prd`)

**Files changed and key updates:**

`docs/reference/frontmatter-schema.yaml`: Rewritten from 598 lines to 239 lines. Version bumped to 2.6.1. Header updated to "reflects rules currently enforced by `lint-skills-frontmatter.sh/.ps1`." All 8 validation rules preserved. Two complete examples added (domain skill: `deliver-prd`; foundation skill: `foundation-persona`). Three common-mistakes entries document the critical failure modes.

`docs/guides/authoring-pm-skills.md`: Updated throughout. Phase selection section expanded to "Classification and Phase" with a table covering `domain`, `foundation`, and `utility`. Frontmatter examples updated to show root `version`, root `updated`, and `phase`/`classification`. Submission template checklist updated.

`docs/agent-skill-anatomy.md`: Frontmatter example blocks updated. Phase and classification documented as discrete concepts. Two-axis naming model (phase-prefixed for domain, classification-driven for non-phase) documented. Three missed count references (24 to 25) corrected by Claude during review.

`docs/templates/skill-template/SKILL.md`: `metadata.version` replaced with root `version`. `updated` field added. `phase`/`classification` model shown with inline comment.

---

### C-5: Align public/reference docs and remove speculative surfaces

**Commit:** `22d96e5` | **Landed:** 2026-03-20

**Problem:** Multiple public-facing and reference docs had stale counts, referenced non-existent helper commands, and hardcoded external system counts that had become inaccurate.

**Specific issues fixed:**

Skill count: "24 skills" corrected to "25 skills" across README.md, QUICKSTART.md, `docs/reference/project-structure.md`, `docs/reference/ecosystem.md`.

Command count: "25 commands" corrected to "26 commands" in `docs/reference/ecosystem.md`.

Speculative surfaces removed from README.md: `/common`, `/update-doc`, `/link-docs` were listed as "In Progress" features that were never built. Replaced with accurate current work description.

MCP counts: `docs/reference/ecosystem.md` previously hardcoded "36 tools," "72 resources," "3 prompts" for pm-skills-mcp. These belong to pm-skills-mcp, which has its own independent release cadence. Replaced with "Release-specific" language to decouple the two projects' documentation.

README navigation anchor: `#the-24-skills` updated to `#the-skills` (was a broken anchor after prior heading changes).

AGENTS tree: `docs/reference/project-structure.md` updated from showing only `claude/` under `AGENTS/` to showing both `claude/` and `codex/` with full subdirectory structure.

`/persona` command: Added to the command table in `docs/reference/project-structure.md` (was missing).

QUICKSTART.md: Stale "Maintainer Notes (v2.2.0)" section removed (described observe-mode rollout planning from v2.2.0, superseded by blocking mode in v2.3.0).

**Files changed:** `README.md`, `QUICKSTART.md`, `docs/reference/project-structure.md`, `docs/reference/ecosystem.md`, `docs/guides/mcp-integration.md`, `docs/guides/using-skills.md`

---

### C-6: Clean remaining release/sample docs

**Commit:** `22d96e5` | **Landed:** 2026-03-20

**Problem:** Four specific artifacts still had concrete stale references after the broader structural work.

**Changes:**

`.claude-plugin/plugin.json`: Version corrected from `"2.6.0"` to `"2.6.1"`. The plugin manifest had been created in v2.6.0 and not bumped when v2.6.1 shipped.

`docs/releases/Release_v2.6.1.md`: Status updated from `"Release-ready (tag/publish pending explicit approval)"` to `"Released (tag v2.6.1 published)"`. Reference in item 4 of the Canonical Changes list updated from `_NOTES/delivery-plan/releases/v2.6.1/artifacts/skill-output-samples_manifest.v2.6.1.json` to `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json`. Same fix in Canonical References item 9. Item 10 added: `docs/internal/release-plans/v2.6.1/README.md`.

`library/skill-output-samples/SAMPLE_CREATION.md`: Section 6 "Release-Coverage Metadata" updated. `_NOTES/` path replaced with `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json`. Description updated from "release-planning artifact" to "tracked internal release-governance artifact."

`docs/internal/efforts/M-10-skill-sample-outputs-library.md`: Two lines added to Key Decisions and Artifacts Produced sections to reference the new tracked governance home and manifest path.

`docs/internal/release-plans/v2.6.1/` (new directory):
- `README.md`: Status, owner, canonical artifact list, operating notes
- `skill-output-samples_manifest.v2.6.1.json`: The coverage manifest that previously existed only in `_NOTES/`; now tracked

`docs/internal/release-plans/README.md`: Entry points updated to add `v2.6.1/README.md` as item #2; last-updated date bumped.

**Files changed:** `.claude-plugin/plugin.json`, `docs/releases/Release_v2.6.1.md`, `library/skill-output-samples/SAMPLE_CREATION.md`, `docs/internal/efforts/M-10-skill-sample-outputs-library.md`, `docs/internal/release-plans/README.md`, `docs/internal/release-plans/v2.6.1/README.md` (new), `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json` (new)

---

## 7. Key Design Decisions

**context-currency version detection strategy**

The scripts detect context version using the first `vX.Y.Z` match in each CONTEXT.md file. An alternative would have been to require a specific "Status:" line format and parse only that line. The first-match approach was chosen because the two CONTEXT.md files have different structures: Claude's uses `**Status:** v2.6.1 shipped` while Codex's uses `- Latest published release baseline: \`v2.6.1\``. A line-specific parser would require per-file configuration. The first-match approach is format-agnostic and worked correctly for both files.

The invariant this requires: the current version reference must appear before any historical version references in the CONTEXT.md. Both files satisfy this naturally (current state section appears before Recent Work history).

**`continue-on-error: true` for the CI step**

The currency check exits 1 on stale files. In CI, this would normally fail the build. Using `continue-on-error: true` downgrades this to a non-blocking annotation. The rationale: context staleness is a maintenance concern, not a build correctness issue. Any PR (adding a skill, fixing a bug, updating docs) should be mergeable regardless of CONTEXT.md staleness. The warning is visible and persistent; it will appear on every subsequent PR until resolved.

**Decouple pm-skills-mcp counts from pm-skills docs**

`docs/reference/ecosystem.md` previously hardcoded pm-skills-mcp tool and resource counts (36 tools, 72 resources). These numbers belong to an independently versioned project. When pm-skills-mcp ships new tools, pm-skills documentation would become inaccurate without a corresponding update. The decision was to replace specific counts with "Release-specific" language. This accepts slightly less specificity in exchange for documents that remain accurate without cross-repo coordination.

**Effort brief format: minimal by design**

The effort brief template is intentionally narrow: status, milestone, issue number, scope paragraph, key decisions, artifacts, PRs. More fields were considered (timeline, team, references) but rejected to keep the format low-friction enough to actually maintain. The GitHub issue provides the authoritative lifecycle state; the brief provides only what GitHub is not designed to capture.

**A-11 ordering relative to C-2**

C-2 established `docs/internal/efforts/README.md` and updated M-10 to a preliminary format. A-11 then added the three brief files and replaced M-10 with the standardized template. This ordering meant A-11 could build on an existing directory with conventions in place rather than creating the structure from scratch. C-6 was explicitly instructed to re-read M-10 before touching it, which it did.

---

## 8. Infrastructure Established

### Automated context-currency check

- `scripts/check-context-currency.sh` + `.ps1`
- Runs in CI on every push and PR via `validation.yml`
- Non-blocking (`continue-on-error: true`) but visible in Checks tab
- Covers all `AGENTS/*/CONTEXT.md` files; extensible to new agent contexts by adding a new directory

### Three-tier effort tracking model

- GitHub issues: lifecycle state (open/closed), labels, milestones
- `docs/internal/efforts/*.md`: durable brief format; cross-session, cross-agent accessible
- `_NOTES/efforts/`: local scratch (unchanged)
- Conventions documented in `docs/internal/efforts/README.md`

### Versioned internal release governance

- `docs/internal/release-plans/README.md`: canonical home declaration
- `docs/internal/release-plans/vX.Y.Z/`: per-release directory
- First concrete instance: `docs/internal/release-plans/v2.6.1/` with README and manifest
- Pattern: future releases create a directory here with governance artifacts

### Current agent context parity

- Both `AGENTS/claude/CONTEXT.md` and `AGENTS/codex/CONTEXT.md` at v2.6.1
- Both covered by the automated currency check
- `AGENTS/DECISIONS.md` populated with cross-agent operating decisions
- Pattern: first-class treatment for both agent workspaces going forward

---

## 9. Files Changed: Full Inventory

| File | Change type | Task(s) |
|------|------------|---------|
| `.claude/settings.json` | Deleted | A-1 |
| `.claude-plugin/plugin.json` | Updated | C-6 |
| `.github/workflows/validation.yml` | Updated | A-9 |
| `AGENTS/DECISIONS.md` | Updated | C-3 |
| `AGENTS/claude/CONTEXT.md` | Rewritten | A-4 |
| `AGENTS/codex/CONTEXT.md` | Rewritten | C-3 |
| `CHANGELOG.md` | Updated | A-2 |
| `QUICKSTART.md` | Updated | C-5 |
| `README.md` | Updated | C-5 |
| `docs/agent-skill-anatomy.md` | Updated | C-4 (+ 3 count fixes by Claude review) |
| `docs/guides/authoring-pm-skills.md` | Updated | C-4 |
| `docs/guides/mcp-integration.md` | Updated | C-5 |
| `docs/guides/using-skills.md` | Updated | C-5 |
| `docs/internal/backlog-canonical.md` | Rewritten | C-2 |
| `docs/internal/delivery-plan/README.md` | Updated | C-2 |
| `docs/internal/efforts/F-02-persona-skill.md` | Created | A-11 |
| `docs/internal/efforts/F-03-persona-library-tier0.md` | Created | A-11 |
| `docs/internal/efforts/M-10-skill-sample-outputs-library.md` | Rewritten | A-11, updated C-6 |
| `docs/internal/efforts/README.md` | Created | C-2 |
| `docs/internal/planning-artifact-tier-map.md` | Rewritten | C-1 |
| `docs/internal/planning-persistence-policy.md` | Rewritten | C-1 |
| `docs/internal/release-planning/README.md` | Updated | C-2 |
| `docs/internal/release-plans/README.md` | Created, updated | C-2, C-6 |
| `docs/internal/release-plans/v2.6.1/README.md` | Created | C-6 |
| `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json` | Created | C-6 |
| `docs/reference/ecosystem.md` | Updated | C-5 |
| `docs/reference/frontmatter-schema.yaml` | Rewritten | C-4 |
| `docs/reference/project-structure.md` | Updated | C-5 |
| `docs/releases/Release_v2.6.1.md` | Updated | C-6 |
| `docs/templates/skill-template.md` | Deleted | A-3 |
| `docs/templates/skill-template/SKILL.md` | Updated | C-4 |
| `library/skill-output-samples/SAMPLE_CREATION.md` | Updated | C-6 |
| `scripts/check-context-currency.ps1` | Created | A-8 |
| `scripts/check-context-currency.sh` | Created | A-8 |

**Total:** 34 files (4 deleted or created as new, 30 modified or created)

---

## 10. Quick Reference: All Tasks

| ID | Owner | Description | Commit | Date |
|----|-------|-------------|--------|------|
| A-1 | Claude | Commit `.claude/settings.json` deletion | `b4d0043` | 2026-03-11 |
| A-2 | Claude | Remove `_NOTES/` reference from CHANGELOG.md | `067b684` | 2026-03-11 |
| A-3 | Claude | Remove stale `docs/templates/skill-template.md` stub | `b7046db` | 2026-03-11 |
| A-4 | Claude | Update `AGENTS/claude/CONTEXT.md` to v2.6.1 | `22d9643` | 2026-03-11 |
| A-11 | Claude | Establish effort tracking: briefs + GitHub issues | `a99d0f5`, `bba31ed` | 2026-03-17 |
| A-8 | Claude | Add `check-context-currency.sh` and `.ps1` | `770737f` | 2026-03-18 |
| A-9 | Claude | Add advisory CI step to `validation.yml` | `de7c3bd` | 2026-03-18 |
| A-5 | Claude | Add currency check to wrap-session | deferred | n/a |
| C-1 | Codex | Rewrite active policy docs | (C-1 batch) | 2026-03-15 |
| C-2 | Codex | Consolidate release governance + effort entry points | (C-2 batch) | 2026-03-16 |
| C-3 | Codex | Refresh Codex continuity + shared decisions | `ad6deb8` | 2026-03-17 |
| C-4 | Codex | Align contributor schema and authoring docs | `22d96e5` | 2026-03-20 |
| C-5 | Codex | Align public/reference docs | `22d96e5` | 2026-03-20 |
| C-6 | Codex | Clean release/sample docs | `22d96e5` | 2026-03-20 |

**Total:** 13 tasks completed, 1 deferred. 9 days, 2 agents.
