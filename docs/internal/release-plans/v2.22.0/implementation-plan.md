# v2.22.0 Implementation Plan - the rewrite set

> Companion to [`plan_v2.22.0.md`](plan_v2.22.0.md), [`command-skill-naming-standard.md`](command-skill-naming-standard.md), [`naming-map.md`](naming-map.md), and [`naming-impact-analysis.md`](naming-impact-analysis.md).
> Drafted 2026-05-27. Purpose: the **concrete, enumerated rewrite set** for v2.22.0 (the Phase 1 deliverable promised by the impact analysis). Every file/folder that must be touched, organized by phase + action. Not a re-explanation of the decisions; those live in the plan and standard.
> Reading order for executors: plan -> standard -> naming-map -> this impl-plan -> impact analysis (for the why and the not-touched list).

---

## 0. Pre-execution gate

Do not start Phase 2 unless ALL of these are true:

- [ ] On a feature branch (`release/v2.22.0`), not main.
- [ ] v2.21.0 SHIPPED (confirmed: tag `v2.21.0` -> `1065c3e`, GitHub Release Latest).
- [ ] Companion docs accepted: [`command-skill-naming-standard.md`](command-skill-naming-standard.md), [`naming-map.md`](naming-map.md) (with collision check PASS), [`naming-impact-analysis.md`](naming-impact-analysis.md).
- [ ] [`plan_v2.22.0.md`](plan_v2.22.0.md) `Rollback / abort` section reviewed.
- [ ] Two Codex adversarial passes on the plan + the Track-1/2 split alternative have been considered; maintainer decision recorded as "proceed bundled" (in review history).
- [ ] **The one-skill spike has passed** (see [Section 2 below](#section-2)) - this is the load-bearing premise check.
- [ ] `check-count-consistency` sub-count hardening landed (v2.21.0 backlog item), so the per-classification counts are CI-guarded through this release's churn.

---

## 1. Phase-by-phase rewrite set

### Phase 2 - Validator

**New files:**
- `scripts/validate-naming.sh`
- `scripts/validate-naming.ps1`

Implements the 6-check spec in [`command-skill-naming-standard.md` Section 8](command-skill-naming-standard.md#8-naming-validator-specification-d-v31-3--validator-only). Mirror the existing pm-skills `.sh`+`.ps1` validator pair pattern (see `scripts/validate-plugin-install.*`, `scripts/check-count-consistency.*`).

**Files to wire into:**
- `.github/workflows/validation.yml` - add the new validator to the enforcing job.
- Pre-tag bundle script (whatever currently runs the full validator set in CI / locally) - register the new validator.

**Acceptance:** runs in <2s, exits non-zero on any of the 6 checks failing; running it RIGHT NOW (before any rename) should report the 63 existing skills as non-conforming (expected; that is what Phase 3 fixes).

<a id="section-2"></a>
### Phase 3a - One-skill spike (load-bearing)

**Before any of 3b-3f.** Run as smoke test. If it fails, abort per the plan's Rollback section.

Target skill: `foundation-okr-writer` (chosen because it has the most-cited example wrapper and clear `$ARGUMENTS` usage in the current command).

Steps:
1. Rename `skills/foundation-okr-writer/` -> `skills/okr-writer/`.
2. Update `name:` in `SKILL.md` from `foundation-okr-writer` -> `okr-writer`. Verify `metadata.classification: foundation` is present (it is).
3. Add `$ARGUMENTS` handling to the `SKILL.md` body so user input flows in the way it did via the wrapper. The current wrapper line is `Context from user: $ARGUMENTS`; that line should now live inside `SKILL.md`.
4. Delete `commands/okr-writer.md`.
5. Create deprecated alias stub at `skills/foundation-okr-writer/SKILL.md` (new dir at the old name) per the [alias stub format](#alias-stub-format) below.
6. Install the plugin locally on a real Claude Code (not just static-validate). Confirm:
   - `/pm-skills:okr-writer "Q3 retention OKRs"` resolves and the skill receives the argument string.
   - `/pm-skills:foundation-okr-writer "..."` resolves to the alias and behaves identically (shows deprecation).
   - The bare `/okr-writer` command is gone (expected).
7. On Codex (or any flat-namespace runtime available): confirm `$okr-writer "..."` resolves.

**Pass criteria:** both name forms work in Claude Code; arguments flow correctly; Codex resolves the short name.

**Fail action:** abort, restore the wrapper (`git restore commands/okr-writer.md` and the SKILL.md rename), and re-evaluate D-V31-2.

### Phase 3b - Rename the 63 skill directories

Source of truth: [`naming-map.md`](naming-map.md).

Per skill (63x):
- Rename directory: `skills/<old-name>/` -> `skills/<short-name>/`.
- Update `name:` field in `SKILL.md`.
- Verify `metadata.classification:` is present (already true on all 63 per Phase 1 verification).
- Sweep the `SKILL.md` body for self-references to the old name and update.
- Sweep `references/*.md` inside the skill dir for old-name references (templates and examples often cite the skill name).

The full old-name -> short-name list (grouped by phase) is in [`naming-map.md`](naming-map.md) and is the authoritative checklist for this step. **Do not enumerate it twice.**

### Phase 3c - Create deprecated alias skills (63)

For each renamed skill, create an alias stub at the **old** path. Each stub is a thin SKILL.md that delegates to the canonical short-name skill.

<a id="alias-stub-format"></a>
**Alias stub format** (`skills/<old-name>/SKILL.md`):

```yaml
---
name: <old-name>
description: >
  DEPRECATED ALIAS for `<short-name>`. Resolves to the canonical short-name skill;
  will be removed at v3.0.0 (see docs/internal/release-plans/v3.0.0/plan_v3.0.0.md).
  Use `<short-name>` instead.
license: Apache-2.0
metadata:
  deprecated: true
  alias_of: <short-name>
  classification: <same as canonical>
  version: "1.0.0"
---

This skill is a deprecated alias. Use the canonical `<short-name>` skill.

Read `skills/<short-name>/SKILL.md` and follow its instructions.

Context from user: $ARGUMENTS
```

**Acceptance:** the new validator's Check 5 (deprecated-alias integrity) passes for all 63.

### Phase 3d - Delete 63 command wrappers, keep 10 `workflow-*`

**Files to delete** (63 in `commands/`):

All `.md` files in `commands/` EXCEPT the 10 `workflow-*` files.

The 10 to KEEP:
- `commands/workflow-customer-discovery.md`
- `commands/workflow-design-sprint.md`
- `commands/workflow-feature-kickoff.md`
- `commands/workflow-foundation-sprint.md`
- `commands/workflow-foundation-to-design.md`
- `commands/workflow-post-launch-learning.md`
- `commands/workflow-product-strategy.md`
- `commands/workflow-sprint-planning.md`
- `commands/workflow-stakeholder-alignment.md`
- `commands/workflow-technical-discovery.md`

Validation: `ls commands/*.md | grep -v workflow-` should return empty after this step.

### Phase 3e - Rewrite `workflow-*` command bodies (10)

Each `workflow-*` command names the skills it orchestrates in its body. Rewrite those references from old (`foundation-okr-writer`) to short (`okr-writer`) form. Files:

```
commands/workflow-customer-discovery.md
commands/workflow-design-sprint.md
commands/workflow-feature-kickoff.md
commands/workflow-foundation-sprint.md
commands/workflow-foundation-to-design.md
commands/workflow-post-launch-learning.md
commands/workflow-product-strategy.md
commands/workflow-sprint-planning.md
commands/workflow-stakeholder-alignment.md
commands/workflow-technical-discovery.md
```

**Acceptance:** no `define-|deliver-|develop-|discover-|foundation-|iterate-|measure-|tool-|utility-` token appears as a skill reference in any workflow command body (only as part of a workflow command name itself, which is unaffected).

### Phase 3f - Cross-reference rewrites (~50 files, the echo-miss zone)

This is the area where v2.21.0's echo-miss hazard (fix doc A, miss its mirror in doc B) bites hardest. Hit every file in every category.

#### AGENTS.md (1 file, densest single doc - 76 hits in the pre-rewrite scan)
- `AGENTS.md`

#### Workflow docs - parallel copies in two locations (24 files: 12 + 12)

`_workflows/`:
```
_workflows/customer-discovery.md
_workflows/design-sprint.md
_workflows/feature-kickoff.md
_workflows/foundation-sprint.md
_workflows/foundation-to-design.md
_workflows/lean-startup.md
_workflows/post-launch-learning.md
_workflows/product-strategy.md
_workflows/sprint-planning.md
_workflows/stakeholder-alignment.md
_workflows/technical-discovery.md
_workflows/triple-diamond.md
_workflows/README.md
```

`docs/workflows/` (mirror; same filenames + `index.md`):
```
docs/workflows/customer-discovery.md
docs/workflows/design-sprint.md
docs/workflows/feature-kickoff.md
docs/workflows/foundation-sprint.md
docs/workflows/foundation-to-design.md
docs/workflows/index.md
docs/workflows/lean-startup.md
docs/workflows/post-launch-learning.md
docs/workflows/product-strategy.md
docs/workflows/sprint-planning.md
docs/workflows/stakeholder-alignment.md
docs/workflows/technical-discovery.md
docs/workflows/triple-diamond.md
docs/workflows/README.md
```

**Critical:** edits to one MUST be mirrored in the other. The earlier scan found `triple-diamond.md` carrying 24 prefixed-name hits and `lean-startup.md` carrying 26.

#### Current-state guides + getting-started (audit all, rewrite those with old-name references)

`docs/guides/` (25 files):
```
docs/guides/adversarial-review.md
docs/guides/creating-pm-skills.md
docs/guides/design-sprint-case-studies.md
docs/guides/design-sprint-cheat-sheet.md
docs/guides/design-sprint-faq.md
docs/guides/design-sprint-recovery.md
docs/guides/foundation-sprint-case-studies.md
docs/guides/foundation-sprint-cheat-sheet.md
docs/guides/foundation-sprint-faq.md
docs/guides/foundation-sprint-recovery.md
docs/guides/index.md
docs/guides/mcp-integration.md
docs/guides/pm-skill-comparisons.md
docs/guides/pm-skill-lifecycle.md
docs/guides/prompt-gallery.md
docs/guides/README.md
docs/guides/recipes.md
docs/guides/skill-finder.md
docs/guides/updating-pm-skills.md
docs/guides/using-design-sprint.md
docs/guides/using-foundation-sprint.md
docs/guides/using-meeting-skills.md
docs/guides/using-skills.md
docs/guides/using-sub-agents.md
docs/guides/using-workflows.md
```

`docs/getting-started/` (4 files):
```
docs/getting-started/index.md
docs/getting-started/platforms.md
docs/getting-started/quickstart.md
docs/getting-started/README.md
```

`docs/` top-level (current-state docs):
```
docs/index.mdx
docs/changelog.md  (current entries only; historical entries are frozen)
```

#### Agent context (2 active files)

```
_agent-context/claude/CONTEXT.md
_agent-context/codex/CONTEXT.md
```

The `_archived/` subdirectories under both: **do NOT rewrite** (frozen coordination history).

#### Skill internal references (templates and examples)

A skill's `references/TEMPLATE.md` or `references/EXAMPLE.md` often cites the skill's own old name. Sweep each renamed skill's references directory for self-references and other-skill references.

**Pattern to grep per renamed skill dir** (after rename):
```
grep -rE '(define|deliver|develop|discover|foundation|iterate|measure|tool|utility)-[a-z]' skills/<short-name>/
```

Hits inside templates/examples should be rewritten unless they are intentionally documenting a deprecated name (rare; flag for review).

#### Tooling audit (4 files - confirm nothing keys off the prefixed name)

These four MUST be checked but may not require edits; the prefixed name might be load-bearing in a path glob or content-validation rule.

```
.github/workflows/validation.yml
src/content.config.ts
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
```

For each: search for any literal prefixed-name match or any glob/regex that depends on the prefix being present. If found, update; if not, no action.

### Phase 3g - Correct `runtime-components.md`

```
docs/reference/runtime-components.md
```

Two specific corrections (per plan acceptance criteria):
- Replace the `/skill-name` claim (commands-are-skills clarification: commands have been merged into skills in current Claude Code; the wrapper layer is being removed in this release).
- Change "12 workflows" -> "10 workflows" (the actual count of `workflow-*` commands).

### Phase 4 - Verify

Run, in order:
- [ ] New naming validator (Phase 2 deliverable) passes.
- [ ] `check-count-consistency` (totals AND sub-counts; sub-count hardening must be landed) passes.
- [ ] Other existing pre-tag validators all pass.
- [ ] `bun astro build` (or whatever the Astro doc build command is for this repo) green.
- [ ] **Live install spot-check** on Claude Code: pick three random renamed skills + their aliases; confirm both forms resolve.
- [ ] **Codex spot-check** if available: `$<short>` and `$<old-alias>` both resolve for the same three skills.
- [ ] Repo-wide grep: zero stray `define-|deliver-|develop-|discover-|foundation-|iterate-|measure-|tool-|utility-`-prefixed *new* references (existing alias-skill names and deliberately-kept names like `tool-foundation-sprint-readiness`'s skill-content discussion are fine; the canonical `name:` field never has these prefixes).

### Phase 5 - Tag + hygiene

- [ ] Update `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` version `2.21.0` -> `2.22.0`.
- [ ] Update `CHANGELOG.md`: `## [2.22.0]` with "Added" (short names + validator), "Deprecated" (old phase-prefixed names), "Removed" (63 command wrappers).
- [ ] Finalize `docs/releases/Release_v2.22.0.md` (this release's user-facing notes; the draft is created during prep, polished here).
- [ ] Tag `v2.22.0` and push.
- [ ] Update marketplace.json `pinned_commit` to the new tag SHA in `product-on-purpose/agent-plugins`.
- [ ] Flip [`plan_v2.22.0.md`](plan_v2.22.0.md) Status to SHIPPED with date + SHA.
- [ ] Update `_agent-context/claude/CONTEXT.md` + `_agent-context/codex/CONTEXT.md` to reflect new naming.
- [ ] Refresh `MEMORY.md` Project Identity line.
- [ ] Confirm `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` has the alias-removal acceptance criterion + the collision-monitoring go/no-go gate.

---

## 2. Files explicitly NOT modified (with rationale)

These categories are **out of the gating rewrite**. They are intentionally left alone:

| Category | Files / globs | Why not |
|---|---|---|
| Historical release notes | `docs/releases/Release_v2.*.md` (all but the new v2.22.0) | Frozen record; rewriting would falsify what shipped under the old names. |
| Historical CHANGELOG entries | `CHANGELOG.md` past entries | Same. Only the new `[2.22.0]` entry is added; older entries stay as-is. |
| Library skill output samples | `library/skill-output-samples/<skill>/**` | Dir names mirror old skill names; renaming is high-volume + cosmetic. Recommend a follow-up release, not gating v2.22.0. The sample *content* references old names as historical artifacts of when they were authored. |
| Library sub-agent samples | `library/sub-agent-samples/<skill>/**` | Same rationale as above. |
| Archived agent context | `_agent-context/**/_archived/**` | Frozen coordination history; archived state should not be rewritten. |
| Previous-release planning docs | `docs/internal/release-plans/v2.*.0/**` (anything older than v2.22.0) | Historical plans; the current release plan is the only one being maintained. |

> If a follow-up release wants to rename the library sample directories for catalog consistency, that is a separate (non-gating) decision tracked as an open item in [`naming-impact-analysis.md` Section 5](naming-impact-analysis.md).

---

## 3. Sequencing within Phase 3 (anti-echo-miss)

To minimize the "fix doc A, miss its mirror in doc B" failure mode that needed 6 Codex passes on v2.21.0, do Phase 3 in this order:

1. **3a (spike)** - load-bearing premise check on one skill.
2. **3b (renames) + 3c (aliases)** together, per-skill - the directory move and its alias stub land in one logical unit.
3. **3d (wrapper delete)** in one sweep - all 63 deletes at once, easier to verify with `ls commands/`.
4. **3e (workflow-* command rewrites)** - small set, do them after 3d so the surrounding state matches.
5. **3f (cross-reference rewrites)** by file category, mirrors first (`_workflows/` + `docs/workflows/` paired), then high-density single files (`AGENTS.md`), then guides, then tooling.
6. **3g (runtime-components.md)** - the public reference fix, last so it reflects the final state.

After each step, run a fast `git diff --stat` sanity check + a focused grep for stray old references in the just-touched area before moving on.

---

## 4. Per-skill conversion checklist (template for executors)

Use one of these per renamed skill (63 total). The naming-map provides the old/new pair; this checklist is the per-skill execution receipt.

```
[ ] skills/<old>/ renamed to skills/<short>/
[ ] SKILL.md `name:` field updated to <short>
[ ] SKILL.md `metadata.classification:` verified present (one of: define, deliver, develop, discover, foundation, iterate, measure, tool, utility)
[ ] SKILL.md body has $ARGUMENTS handling (carried over from the deleted wrapper)
[ ] SKILL.md body sweep: no stale self-references to <old>
[ ] references/TEMPLATE.md sweep: no stale self or cross references
[ ] references/EXAMPLE.md sweep: same
[ ] commands/<wrapper>.md deleted (if existed; `tool-*` and `utility-*` had wrappers with identical names)
[ ] Deprecated alias stub created at skills/<old>/SKILL.md per Phase 3c format
```

---

## 5. Rollback hooks

The plan's [Rollback / abort + v3.0.0 collision-monitoring criteria](plan_v2.22.0.md#rollback--abort--v300-collision-monitoring-criteria) section defines the triggers and procedures. This impl-plan adds two practical notes:

- **Per-skill abort:** if a single skill fails the validator after rename and cannot be quickly fixed, revert that skill's rename + alias commit alone; the rest of the rename can proceed.
- **Mass abort (Phase 3 in flight):** `git reset --hard <pre-Phase-3 commit>` on the feature branch is safe (the branch was created from main, all changes are local until the branch is merged). Do NOT rebase the feature branch into main if it has been aborted.

---

## 6. Open follow-ups (non-gating)

- **Library sample directory rename** (`library/skill-output-samples/<skill>/` etc.): separate decision, deferred. Track in `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` as a candidate inclusion.
- **`pm-changelog-curator` naming alignment**: the skill keeps `pm-` for sub-agent-name alignment (R-A6). If the sub-agent is ever renamed, the skill should follow.
- **Description-quality lint iteration**: D-V31-5 ships a heuristic floor; richer prose quality checks remain a follow-up.
