---
slug: releases/Release_v2.31.0
title: Release v2.31.0
description: The zero-drift release, generation becomes the only write path for the README catalog, quickstarts, compat matrix, and manifest descriptions; release-please goes live in shadow; the two awk-hazard validators are ported to single-source Node; trigger-fixture coverage climbs to 43 of 68 skills; and SECURITY.md gains a provenance page.
---

**Released 2026-07-05.** Additive MINOR. No new skills; catalog stays 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents unchanged.

## The short version

v2.30.0 fixed every live instance of count drift the 2026-07-04 audit found. It could not fix the underlying cause: every one of those surfaces was hand-edited, so nothing stopped the next edit from drifting again. v2.31.0 removes the hand-write path itself. A new generator now owns the surfaces that used to drift, release-please stands up (in shadow, watching, not yet cutting releases), the two most fragile validator scripts in the repo are rewritten as single-source Node, trigger-eval coverage keeps climbing, and the project states its trust posture in writing for the first time.

## What changed

### Generation becomes the only write path

`scripts/gen-derived-surfaces.mjs` is the new generator (following the same pattern as `gen-skill-manifest.mjs`, which has never drifted): a `--check` mode that fails CI on any hand edit inside its markers, and every count sourced from `skill-manifest.json` so a number is wrong in exactly one place or nowhere. It now owns the README's Skill Library badges and Classification table, the shared quickstart fragment rendered onto both `QUICKSTART.md` and the site quickstart, the sub-agent compatibility matrix, the three plugin manifest description headlines, and three release-notes mirrors sourced straight from `CHANGELOG.md`.

The README keeps its full length by design (a maintainer decision, ZD-2 = A, overriding an earlier drafted recommendation to slim it): nothing is removed for length, only the count-bearing regions move inside generator-owned markers. The one deliberate content reduction is the release-history section itself: the ~250-line per-version "Recent Updates" history and a second "Quick Release History" table collapse into a single generated recent-releases mirror, because that duplication (not length) was the actual defect.

### Release-please goes live, in shadow

`release-please-config.json`, `.release-please-manifest.json`, and `.github/workflows/release-please.yml` stand up Google's release-automation tool in manifest mode. It watches every push to `main` and opens a Release PR computing what it thinks the next version and changelog should be, entirely from squash-merge PR titles. This release ships that Release PR in **shadow only**: it is observed and diffed against this manual cut, never merged. Authoritative cutover (where merging the Release PR becomes the actual release mechanism) is a deliberate later-tag decision, made only once a full shadow cycle shows the automation would have matched the manual process with zero hand-fixes. A companion PR-title lint ships advisory, because squash-PR titles become load-bearing input the moment release-please reads them.

### The two awk-hazard validators are gone

`check-count-consistency` and `validate-skill-family-registration`, the two bash-plus-PowerShell validators built on the `awk` `RSTART`/`RLENGTH` pattern that hung CI at v2.27.1, are ported to single-source Node scripts. Each was proven to agree with both retiring shells on every fixture in the v2.30.0 dual-shell test tree before the shell pairs were deleted. `scripts/validation-manifest.yaml` now tracks 23 remaining dual-shell pairs, down from 25; the standing cadence set by the audit continues at 1-2 ports per release until none remain.

### Trigger-eval coverage climbs to 43 of 68

Twelve more skills gain `evals/trigger-fixtures.json`, covering the collision-risk neighborhoods flagged by the audit: the `define-` and `discover-` clusters, the remaining `foundation-meeting-*` skills, and their nearest collision-risk siblings (`foundation-prioritized-action-plan`, `foundation-stakeholder-update`, `foundation-lean-canvas`, `measure-survey-analysis`, `utility-pm-changelog-curator`, `utility-mermaid-diagrams`). Coverage moves from 31 to 43 of 68 skills, about 63%. A new output-eval CI lane (`workflow_dispatch` plus a monthly cron, dry-run by default, a key-gated live leg) exercises the output-quality harness end to end, and a new published evals page names all three eval lanes, the environment-confound lesson that makes the controlled router eval the trustworthy instrument, and the current numbers, with no fabricated aggregate score.

### The trust posture is now written down

`SECURITY.md` (and its site mirror) expands to state plainly what the plugin ships, that skills and documentation are inert markdown with nothing executing at install time, the hook opt-in model, and the supply-chain posture (a SHA-pinned marketplace, a per-zip checksum, a scoped release-please token). A new provenance page on the site restates the same for a reader who never opens the repo.

## What this means for you

- **If you use the skills:** nothing changes. Every skill, command, and workflow behaves exactly as it did in v2.30.0.
- **If you watch the repo's automation:** you may see a `chore(main): release X.Y.Z` pull request appear after a squash-merge to `main`. That is release-please's shadow Release PR. It is not merged this cycle and does not affect the tagged release; it is being compared against the manual process before any cutover decision is made.
- **If you contribute:** new validators are single-source Node, never a new `.sh` + `.ps1` pair (a freeze that has now held for two releases). A squash-merge PR title should be a valid Conventional Commit; a lint now flags one that is not, advisory for now.

## Upgrade

```
# Update path
/plugin marketplace update
/plugin install pm-skills@product-on-purpose

# Or re-download the release ZIP if you installed that way.
```

No action required beyond updating. If you reference the catalog in your own tooling, it remains 68 skills, 6 sub-agents.

## What does NOT change in v2.31.0

- All skills' instructions, templates, and behavior are unchanged.
- Skill catalog (68), slash commands (11), and workflows (12) are unchanged.
- The manual 6-gate release runbook cuts this release, exactly as it has cut every release before it; release-please is observed, not authoritative.

## Affected areas

| Area | Change |
|---|---|
| `scripts/` | New `gen-derived-surfaces.mjs` (+ test); `check-count-consistency.mjs` and `validate-skill-family-registration.mjs` ported to single-source Node; `check-pr-title.mjs` added; the two retired validators' `.sh`/`.ps1`/`.md` files and `shell-parity-smoke.mjs` deleted. |
| `.github/workflows/` | New `release-please.yml` (shadow), `pr-title-lint.yml` (advisory), and `output-eval.yml` (dispatch + cron); `validation.yml` updated for the two ported validators. |
| `README.md` | Catalog badges/table and the release-history section converted to generated `pmskills:*` marker regions; version badge and Current-version row annotated for release-please. |
| `QUICKSTART.md` / site quickstart | Now rendered from one shared fragment. |
| Site (`site/src/content/docs/`) | New `reference/evals.md` and `reference/provenance.md`; `reference/sub-agent-compatibility.md`, `changelog.md`, and `releases/index.md` now generated. |
| `skills/` | 12 skills gain `evals/trigger-fixtures.json`. Catalog unchanged at 68. |
| `.claude-plugin/` / `.codex-plugin/` | Version 2.30.0 to 2.31.0; descriptions refreshed; marketplace `ref` pinned to `v2.31.0`. |
| `SECURITY.md` | Expanded: what ships, install-time behavior, hook opt-in model, supply-chain posture. |
