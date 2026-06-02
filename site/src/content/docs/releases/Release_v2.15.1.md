---
slug: releases/Release_v2.15.1
title: "Release v2.15.1. Post-Tag Audit Remediation + Preventive CI"
description: "pm-skills v2.15.1 is a same-day patch successor to v2.15.0 that ships post-tag audit remediation (docs-site homepage refresh, AGENTS.md command-table sync, sample-library README, workflow-generator bug fix, naming-discipline application to Sprint Planning) and 4 new preventive CI validators (landing-page count assertion, workflow-generator coverage, AGENTS.md command-sync, pre-tag validator bundle orchestration). The 55-skill catalog is unchanged."
sidebar:
  order: 0
---

**Released**: 2026-05-16
**Type**: Patch release (audit remediation + preventive CI; no catalog change)
**Skill count**: 55 (unchanged from v2.15.0)
**Key theme**: Close v2.15.x post-tag audit findings; ship preventive validators to reduce recurrence

---

## TL;DR

v2.15.1 is a same-day patch successor to v2.15.0 (consistent with the v2.14.0 to v2.14.1 to v2.14.2 same-day pattern). The 55-skill catalog is unchanged; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the 15 v2.15.0 sprint commands is identical.

What changes:

- **Docs-site homepage refresh.** The Astro Starlight homepage at https://product-on-purpose.github.io/pm-skills/ now matches the v2.15.0 release narrative. Tool card added to the CardGrid; "40 skills" claims swept to 55; 12 workflows reflected.
- **Skills landing page table extended** with the missing Tool row.
- **Workflow generator bug fixed.** v2.15.0 shipped 3 new sprint workflows whose individual pages generated correctly but whose index table rows were silently dropped because the generator's hardcoded dict had no entries for them. v2.15.1 fixes the immediate gap AND hardens the generator to fail loudly on future missing entries.
- **AGENTS.md command table sync.** 15 v2.15.0 tool commands added plus 5 pre-existing legacy drift items (Meeting Skills Family commands + /stakeholder-update never added to the table when v2.11.0 shipped). Table now covers every file in `commands/`.
- **Sample library README refresh.** Headline updated to "171 samples across 55 PM skills" (was stale at 126/40); v2.15.0 breakdown added.
- **Sprint Planning workflow gets `(agile)` qualifier** per the v2.15.0 naming-discipline rule, with a disambiguation callout linking to Foundation Sprint and Design Sprint.
- **4 new preventive CI validators** ship to reduce recurrence of v2.15.0-class drift: landing-page count assertion, workflow-generator coverage check, AGENTS.md command-table sync check, and a `pre-tag-validate` orchestration script that runs the full enforcing-validator bundle in one command.

Day-to-day usage of all 55 skills is unchanged. v2.15.1 is a documentation-accuracy + tooling-hardening release.

---

## What's new

### Documentation fixes (closes 6 audit P0 / P1 findings + side-effect closures)

| Audit ID | Surface | What changed |
|---|---|---|
| A01 | `docs/index.mdx` (docs-site homepage) | Frontmatter description, hero body, CardGrid (added Tool card), "Skills by Phase" intro line, "Plus" command list (added 15 tool commands), Workflows section (added 3 new sprint workflows; renamed Sprint Planning row to "Sprint Planning (agile)"). |
| A02 | `docs/skills/index.md` (skills landing page) | Added Tool row to the classification table; added introductory paragraph explaining the v2.15.0 `classification: tool` taxonomy. Table now sums to 55. |
| A03 | `scripts/generate-workflow-pages.py` + `docs/workflows/index.md` | Generator hardened (see "Bug fixes" section); index regenerated with all 12 workflows including foundation-sprint, design-sprint, foundation-to-design. |
| A04 | `AGENTS.md` command summary table | Added 15 `/tool-*` rows + 3 `/workflow-*` rows. Side-effect of new validator surfaced 5 pre-v2.15.0 drift items (Meeting Skills Family commands + `/stakeholder-update` from v2.11.0); those rows also added. Table grew from 42 to 65 rows. |
| A05 | `library/skill-output-samples/README_SAMPLES.md` | Header refreshed to "171 samples across 55 PM skills"; new v2.15.0 Sprint Skills section added (21 FS + 21 DS + 3 note-and-vote = 45 new samples); math updated. |
| A09 | `_workflows/sprint-planning.md` + generated page | Title bumped to "Sprint Planning (agile)"; disambiguation callout added linking to Foundation Sprint, Design Sprint, and `docs/concepts/workshop-sprints-vs-agile-sprints.md`. |
| A14 | `docs/releases/Release_v2.15.0.md` | Top-of-file callout added alerting readers to post-tag closures (`f03d94d` + `c8ea6d9`) and pointing at v2.15.1. |

### New cross-family overview doc (closes audit A11)

`docs/concepts/sprint-skills-overview.md` (new) is a single front-door entry point for the v2.15.0 sprint lane. It explains the `classification: tool` taxonomy, introduces both families with output tables, presents an end-to-end FS-to-DS arc as a mermaid flowchart, explains when to reach for which family, and reiterates the naming-discipline rule. Routes readers to the per-family guides, concept docs, FAQs, glossary, and comparison reference.

### Plan continuity (closes audit A08 + A12)

- v2.15.0 master plan, FS integration plan, and DS integration plan status blocks all updated with post-tag SHA + v2.15.1 audit-remediation cross-reference (audit A08).
- `AGENTS/claude/CONTEXT.md` "Current State" block refreshed from v2.14.0 SHIPPED to v2.15.1 SHIPPED with sprint family inventory + v2.15.x audit reference. Closes the v2.14.x cleanup plan Task 2 deferral (audit A12).

### Pre-tag validator bundle (closes audit A13)

`scripts/pre-tag-validate.{sh,ps1,md}` (new) codifies the `feedback_pre-tag-validator-bundle.md` memory rule (2026-05-16). One command runs every truly-enforcing validator (11 base + 3 new v2.15.1 preventive = 14 total) before cutting a release tag. The runbook at `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` gains a "Section 0: Pre-tag validator bundle (REQUIRED)" step at the top.

---

## Bug fixes

### Workflow generator silent drop (audit A03)

**Symptom.** v2.15.0 added 3 new workflows (`foundation-sprint.md`, `design-sprint.md`, `foundation-to-design.md`). Individual page outputs in `docs/workflows/` were generated correctly. But the table at the top of `docs/workflows/index.md` only listed the 9 pre-v2.15.0 workflows. The `check-generated-content-untouched` validator passed anyway because the generator and the file were aligned at being incomplete.

**Root cause.** `scripts/generate-workflow-pages.py` had a hardcoded `workflow_info` dict and `order` list with exactly the 9 pre-v2.15.0 entries. The `generate_index()` function iterated `order` and emitted rows for each; any workflow not in `order` was silently skipped from the index, even though its individual page was written.

**Fix.** Three-layer:

1. Added explicit `workflow_info` entries for `foundation-sprint`, `design-sprint`, `foundation-to-design` with curated display names + skills chain + use-when descriptions.
2. Added a `display` field to the dict format and used it as an override (enables "Sprint Planning (agile)" without renaming the file or slash command).
3. Added a safety net that raises `SystemExit` when (a) any source workflow file lacks a `workflow_info` entry, or (b) any `workflow_info` entry is missing from the `order` list. Future workflow additions now fail the generator loudly until the dict is updated. The new `check-workflow-generator-coverage` validator is the CI-side fence.

---

## New preventive CI validators

The audit surfaced that v2.15.0's drift was structurally invisible to the existing validator suite: the `check-count-consistency` regex did not match descriptive phrases ("40 AI agent skills"), and `check-generated-content-untouched` could not catch generator output that omitted rows because the file and the generator were both wrong. v2.15.1 ships 4 new validators that close these structural blind spots.

### 1. `check-landing-page-counts` (new; enforcing in CI with `--strict`)

Asserts that every count claim of the form `<N> skills`, `<N> AI agent skills`, `<N>-skill`, etc. on:
- `docs/index.mdx` (Starlight homepage)
- `docs/skills/index.md` (skills landing page)
- `docs/workflows/index.md` (workflows landing page)
- `library/skill-output-samples/README_SAMPLES.md` (samples library README)

...either matches the source-of-truth filesystem count OR appears alongside the source-of-truth count in the same file. Allows 0-4 adjective tokens between the number and the resource word (e.g., "55 production-ready PM skills" matches). The historical-context allowance prevents false positives on pages that legitimately reference older counts alongside the current count.

### 2. `check-workflow-generator-coverage` (new; enforcing in CI)

Asserts every `_workflows/*.md` source file has both:
- An individual generated page in `docs/workflows/`
- A row referencing it in `docs/workflows/index.md`

And the three counts (source workflows, generated pages, index rows) all match. CI-side fence for the workflow generator hardening above.

### 3. `check-agents-md-command-sync` (new; enforcing in CI)

Asserts every file in `commands/` has a matching `| \`/<command>\` |` row in the AGENTS.md command summary table. Recognizes `/workflow-*` slash-command aliases into `_workflows/`. Detects both missing rows (`commands/file` exists but no row) and orphaned rows (row exists but `commands/file` is gone, e.g., renamed or deleted command).

### 4. `pre-tag-validate` orchestration script (new; manual + runbook)

Single command that runs every truly-enforcing validator before cutting a tag:

```bash
bash scripts/pre-tag-validate.sh
```

```powershell
pwsh scripts/pre-tag-validate.ps1
```

Codifies the `feedback_pre-tag-validator-bundle.md` memory rule (2026-05-16). The pre-release runbook at `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` now references this as Section 0.

### CI workflow

`.github/workflows/validation.yml` extended with 6 new step pairs (Ubuntu + Windows matrix entries for each of the 3 new validators). The 3 new validators are wired as enforcing, with `--strict` / `-Strict` where applicable.

### Validator inventory delta

| Tier | At v2.15.0 | At v2.15.1 | Delta |
|---|---|---|---|
| Truly enforcing | 11 | 14 | +3 (landing-page-counts, workflow-generator-coverage, agents-md-command-sync) |
| Advisory | ~13 | ~13 | unchanged |
| Total | ~24 | ~27 | +3 |

Plus 1 orchestration script (`pre-tag-validate`) that runs all 14 in sequence.

---

## Verification

Pre-tag validator bundle run on the v2.15.1 candidate HEAD:

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

All 14 validators green on local HEAD before tag.

---

## Migration notes

### For existing pm-skills users

Nothing to do. The 55-skill catalog and 62-command surface are unchanged. Day-to-day usage is identical.

### For contributors

When adding a new workflow to `_workflows/`, the generator will now fail loudly if you forget to add a `workflow_info` entry. The error message tells you exactly what to add and where.

When adding a new command to `commands/`, the new `check-agents-md-command-sync` validator will fail CI until you add a matching row to the AGENTS.md command summary table.

Before cutting a release tag, run `bash scripts/pre-tag-validate.sh` (or pwsh equivalent). The runbook references this as required Section 0.

---

## What's NOT in v2.15.1

- No new skills.
- No changes to the 55 existing skill outputs or templates.
- No changes to the 15 v2.15.0 sprint commands.
- No changes to the family contracts (FS v0.3.0, DS v0.2.0 unchanged).
- No changes to Astro Starlight build pipeline (still on Astro 5.x; Astro 6.x deferred to v2.16).
- No changes to pm-skills-mcp (still in maintenance mode; catalog frozen at v2.9.2 build).
- `check-count-consistency` regex tightening / consolidation with `check-landing-page-counts` is deferred to v2.16.0 per issue #132 [M-20].

---

## Files

- 1 new docs file: `docs/concepts/sprint-skills-overview.md` (cross-family overview; A11)
- 4 new validator triplets (sh + ps1 + md): `check-landing-page-counts`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`, `pre-tag-validate` = 12 new files
- 1 new audit doc: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` (authored at the start of the v2.15.1 cycle)
- Edits to: `docs/index.mdx`, `docs/skills/index.md`, `AGENTS.md`, `library/skill-output-samples/README_SAMPLES.md`, `_workflows/sprint-planning.md`, `docs/workflows/index.md` (regenerated), `scripts/generate-workflow-pages.py`, `docs/releases/Release_v2.15.0.md`, `docs/internal/release-plans/v2.15.0/plan_v2.15.0.md`, `docs/internal/release-plans/v2.15.0/foundation-sprint-integration-plan.md`, `docs/internal/release-plans/v2.15.0/design-sprint-integration-plan.md`, `AGENTS/claude/CONTEXT.md`, `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`, `CHANGELOG.md`, `docs/changelog.md`, `docs/releases/index.md`, `README.md`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.claude/pm-skills-for-claude.md`, `.github/workflows/validation.yml`

---

## Cross-links

- Root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2151---2026-05-16)
- v2.15.x audit: [`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`](../internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md)
- v2.15.0 release notes (with post-tag closures): [`Release_v2.15.0.md`](Release_v2.15.0.md)
- Sprint Skills overview (new): [`docs/concepts/sprint-skills-overview.md`](../concepts/sprint-skills-overview.md)
- Pre-tag validator bundle: [`scripts/pre-tag-validate.md`](https://github.com/product-on-purpose/pm-skills/blob/main/scripts/pre-tag-validate.md)
