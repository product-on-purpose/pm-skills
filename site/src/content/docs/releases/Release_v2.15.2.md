---
slug: releases/Release_v2.15.2
title: "Release v2.15.2. v2.15.x Cycle Closeout + v2.16.0 Plan Reconciliation"
description: "pm-skills v2.15.2 is a same-cycle closeout patch successor to v2.15.1. No source-code, validator behavior, or catalog changes. Pure planning-doc hygiene that closes out the v2.15.x cycle (audit doc status, master plan continuity, issue #132 evidence) and reconciles the v2.16.0 plan slate (authored 2026-05-16 before v2.15.1 shipped) against the v2.15.1 shipped state. Catalog stays at 55 skills; truly-enforcing validators stay at 27."
sidebar:
  order: 0
---

**Released**: 2026-05-17
**Type**: Patch release (closeout hygiene + plan reconciliation; no functional change)
**Skill count**: 55 (unchanged from v2.15.0 / v2.15.1)
**Key theme**: Close out v2.15.x cycle hygienically; reconcile v2.16.0 plans against v2.15.1 reality

---

## TL;DR

v2.15.2 is a closeout patch. The 55-skill catalog and 27 truly-enforcing validators are unchanged from v2.15.1. Nothing functional changes.

What changes:

- **v2.15.x audit doc status updated** from `DRAFT (no items closed yet)` to `REMEDIATION SHIPPED in v2.15.1; v2.15.2 closeout shipped` with a finding-by-finding closure summary table.
- **v2.15.0 master plan continuity** updated: "What's next" item 2 (v2.15.1 patch cycle) flipped from `IN PROGRESS` to `DONE`; v2.15.2 closeout row added; status block flipped from `IN PROGRESS` to `POST-TAG CYCLE CLOSED`.
- **v2.16.0 plans reconciled** against v2.15.1 shipped reality: `repo-hygiene-plan.md` CONTEXT.md prereq marked DONE (v2.15.1 audit A12 closed it); `ci-plan.md` gains a "v2.15.1 carry-in reconciliation" section reducing v2.16.0 net-new validator scope from "5 new" to "2 new + 1 extension"; master plan_v2.16.0.md "Where We Are" snapshot refreshed.
- **AGENTS/claude/CONTEXT.md** updated from `v2.15.1 SHIPPED` to `v2.15.2 SHIPPED + v2.15.x cycle CLOSED`.
- **Version surfaces bumped**: README badge, plugin.json, marketplace.json, .claude/pm-skills-for-claude.md all bumped to 2.15.2.
- **Issue #132 [M-20]** received a comment documenting v2.15.1 partial close + carry-forward to v2.16.0.

Day-to-day usage is identical to v2.15.1 and v2.15.0. No skill content, no validator behavior, no installed-component change. The v2.15.2 tag exists to keep the patch chain symmetric (v2.15.0 / v2.15.1 / v2.15.2) and to give the v2.15.x audit doc a definite closure point.

---

## What changed

### 1. v2.15.x audit doc status updated

`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` had been authored 2026-05-16 ~16:30 PDT as the input to the v2.15.1 patch cycle. Its frontmatter declared `status: DRAFT (authored 2026-05-16; no items closed yet)`. After v2.15.1 closed all 18 findings, the audit's status field stayed stale.

v2.15.2 fixes this by:

- Updating frontmatter `status:` to `REMEDIATION SHIPPED in v2.15.1 (a108301 -> 6f89439); v2.15.2 closeout shipped`
- Adding a "Closure summary" section that maps every finding to the v2.15.1 commit that closed it, organized by P0/P1/P2/P3/INFO bucket
- Noting the side-effect closure: the new `check-agents-md-command-sync` validator (shipped in v2.15.1) surfaced 5 pre-v2.15.0 legacy drift items from v2.11.0 (Meeting Skills Family commands + `/stakeholder-update`); those were also added to AGENTS.md in v2.15.1

The audit doc now serves as the v2.15.x cycle's definitive closure record.

### 2. v2.15.0 master plan continuity

`docs/internal/release-plans/v2.15.0/plan_v2.15.0.md` "What's next" list had this stale state at v2.15.1 ship time:

```
1. DONE - GitHub Release UI body rewrite
2. IN PROGRESS - v2.15.1 patch cycle
3. CONTEXT.md refresh (closing in v2.15.1 per A12)
4. ACTIVE - v2.16.0 execution
```

v2.15.2 updates this to:

```
1. DONE - GitHub Release UI body rewrite
2. DONE - v2.15.1 patch cycle (shipped 2026-05-17 at tag 6f89439)
3. DONE - v2.15.2 closeout patch (shipped 2026-05-17)
4. ACTIVE - v2.16.0 execution
```

Plus the status-block header updates from `TAGGED + POST-TAG REGEN SHIPPED + v2.15.x AUDIT REMEDIATION IN PROGRESS` to `TAGGED + POST-TAG CYCLE CLOSED`.

### 3. v2.16.0 plan reconciliation

The v2.16.0 plan slate was authored 2026-05-16 between the v2.15.0 tag and the v2.15.1 patch. It captures `agents/` directory work, sub-agent specs, doc-stack modernization, CI extensions, repo hygiene. Three of its planned items are now stale because v2.15.1 closed them:

**`repo-hygiene-plan.md` Prerequisites:**

Before:
```
- [ ] v2.14.x cleanup plan Task 2 (CONTEXT.md refresh) - this plan absorbs it as Phase 1
```

After:
```
- [x] v2.14.x cleanup plan Task 2 (CONTEXT.md refresh) - CLOSED in v2.15.1 audit A12 at tag 6f89439. Phase 1 of this plan is therefore no-op for the carry-forward; remaining Phase 1 scope is "re-refresh CONTEXT.md after all other v2.16.0 tracks land" per Codex R13.
- [x] v2.15.1 patch shipped (HEAD 6f89439, 2026-05-17): 4 new CI validators + workflow-generator bug fix + audit-finding remediation across 18 items
- [x] v2.15.2 closeout shipped: v2.16.0 plan reconciliation + audit-doc status update
```

**`ci-plan.md` carry-in reconciliation section** (new):

Three validators shipped in v2.15.1 overlap with v2.16.0 planned tasks:

| v2.15.1 validator | v2.16.0 task | Reconciliation |
|---|---|---|
| `check-landing-page-counts.{sh,ps1,md}` | Task 6 `check-aggregate-counters` | EXTEND, do not duplicate. v2.15.1 validator handles 4 user-visible landing pages with flexible regex; v2.16.0 work adds 3 internal-context surfaces (AGENTS.md, CONTEXT.md, README.md) with strict regex. Combine via `--mode=user|internal|all` flag. |
| `check-workflow-generator-coverage.{sh,ps1,md}` | Not in v2.16.0 ci-plan | No action; already enforcing in CI. |
| `check-agents-md-command-sync.{sh,ps1,md}` | Not in v2.16.0 ci-plan | No action; already enforcing for commands/ dir. v2.16.0 Task 2 extends validate-agents-md for sub-agents, operating alongside this validator. |

Plus `scripts/pre-tag-validate.{sh,ps1,md}` orchestration script (v2.15.1) gets noted as the required Section 0 of the release runbook; v2.16.0 new validators should be added to its arrays as they land.

Net v2.16.0 ci-plan scope reduction: "5 new validators" to "2 new + 1 extension."

**`plan_v2.16.0.md` master plan "Where We Are"** snapshot refreshed from `2026-05-16, HEAD a108301` to `2026-05-17, post-v2.15.2 closeout`. Validator inventory bumped 24 to 27 truly-enforcing. v2.15.1 carry-ins enumerated.

### 4. CONTEXT.md update

`AGENTS/claude/CONTEXT.md` "Current State" block updated from v2.15.1 SHIPPED state to v2.15.2 SHIPPED + cycle closed; cross-reference to v2.16.0 active planning added. Older v2.14.x content preserved below as historical context.

### 5. Version surfaces

Bumped to 2.15.2:

- `.claude-plugin/plugin.json` (`version: 2.15.2`)
- `.claude-plugin/marketplace.json` (`version: 2.15.2`)
- `README.md` (shields.io badge URL)
- `.claude/pm-skills-for-claude.md` ("as of v2.15.2" narrative)

The plugin description and marketplace description strings are otherwise unchanged from v2.15.1.

### 6. Issue #132 [M-20] comment

GitHub issue #132 received a comment documenting:

- v2.15.1 partial close of the docs-count-consistency drift via the new `check-landing-page-counts.{sh,ps1}` validator (closes the 4 user-visible landing pages: `docs/index.mdx`, `docs/skills/index.md`, `docs/workflows/index.md`, `library/skill-output-samples/README_SAMPLES.md`)
- Carry-forward to v2.16.0: full M-20 implementation consolidates `check-aggregate-counters` (v2.16.0 ci-plan Task 6) with `check-landing-page-counts` (v2.15.1) to also cover the 3 internal-context surfaces (AGENTS.md, CONTEXT.md, README.md) with strict regex

---

## What's NOT in v2.15.2

- No skill content changes; catalog stays at 55.
- No validator behavior changes; 27 truly-enforcing validators unchanged from v2.15.1.
- No CI workflow changes (`.github/workflows/validation.yml` unchanged).
- No template / EXAMPLE / SKILL.md changes.
- No new sample additions; library stays at 171 samples across 55 skills.
- No `agents/` directory work (that ships in v2.16.0).
- No Astro 6.x upgrade (v2.16.0 doc-stack-modernization-plan).
- No new sub-agents (v2.16.0).

---

## Verification

Pre-tag validator bundle (`scripts/pre-tag-validate.sh`) run on the v2.15.2 candidate HEAD with all 14 enforcing validators reporting PASS:

```
=== pm-skills pre-tag validator bundle ===
RUN  lint-skills-frontmatter ... PASS
RUN  validate-agents-md ... PASS
RUN  validate-commands ... PASS
RUN  validate-meeting-skills-family ... PASS
RUN  validate-foundation-sprint-skills-family --strict ... PASS
RUN  validate-design-sprint-skills-family --strict ... PASS
RUN  check-internal-link-validity --strict ... PASS
RUN  validate-docs-frontmatter --strict ... PASS
RUN  check-no-body-h1 --strict ... PASS
RUN  check-count-consistency ... PASS
RUN  check-generated-content-untouched ... PASS

--- v2.15.1+ preventive validators ---
RUN  check-landing-page-counts ... PASS
RUN  check-workflow-generator-coverage ... PASS
RUN  check-agents-md-command-sync ... PASS

=== ALL CHECKS PASSED ===
Safe to cut the release tag.
```

---

## Migration notes

### For existing pm-skills users

Nothing to do. v2.15.2 is documentation hygiene only. `git pull` if you want the updated planning docs; otherwise stay on v2.15.1.

### For contributors

The `feedback_pre-tag-validator-bundle` memory rule and the codified `scripts/pre-tag-validate.{sh,ps1}` orchestration script remain the canonical pre-tag check.

When you start the v2.16.0 cycle, read the reconciliation notes in `docs/internal/release-plans/v2.16.0/ci-plan.md` and `docs/internal/release-plans/v2.16.0/repo-hygiene-plan.md` BEFORE executing those plans. They explicitly mark items that v2.15.1 already closed (so you skip them) and items where v2.15.1 work should be extended rather than duplicated.

---

## Files

- 6 modified planning docs: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`, `docs/internal/release-plans/v2.15.0/plan_v2.15.0.md`, `docs/internal/release-plans/v2.16.0/repo-hygiene-plan.md`, `docs/internal/release-plans/v2.16.0/ci-plan.md`, `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`, `AGENTS/claude/CONTEXT.md`
- 4 version surfaces: `README.md`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.claude/pm-skills-for-claude.md`
- 4 release artifacts: `CHANGELOG.md` (v2.15.2 entry), `docs/changelog.md` (mirror), `docs/releases/Release_v2.15.2.md` (this file), `docs/releases/index.md` (v2.15.2 row), `docs/index.mdx` (Recent Releases row)
- 0 new validators
- 0 new tests
- 0 new sample files

---

## Cross-links

- Root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2152---2026-05-17)
- v2.15.x audit: [`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`](../internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md)
- v2.15.1 release notes: [`Release_v2.15.1.md`](Release_v2.15.1.md)
- v2.15.0 release notes: [`Release_v2.15.0.md`](Release_v2.15.0.md)
- v2.16.0 master plan: [`docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/plan_v2.16.0.md)
- Pre-tag validator bundle: [`scripts/pre-tag-validate.md`](https://github.com/product-on-purpose/pm-skills/blob/main/scripts/pre-tag-validate.md)
