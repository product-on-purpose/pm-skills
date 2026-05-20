---
title: v2.16.2 Release Notes - Post-v2.16.1 Audit Hygiene Fast-Patch
description: 'v2.16.2 closes the housekeeping subset of findings surfaced by the v2.16.1 G4 P0 dispatch-skill audit. Refreshes the AGENTS/claude/CONTEXT.md Status block to reflect v2.16.1 + v2.16.2 chain and wires the check-context-currency validator into the pre-tag-validate bundle to prevent recurrence. Same 59-skill catalog; no skill content changes.'
date: 2026-05-19
status: SHIPPED
type: patch
---

**Released:** 2026-05-19
**Type:** Patch (audit-hygiene; same 59-skill catalog as v2.16.0/v2.16.1)
**Day-to-day usage:** identical to v2.16.1 for all skills, commands, workflows, sub-agents, dispatch flows

## TL;DR

The v2.16.1 G4 P0 attestation step on 2026-05-19 ran the pm-skill-auditor via the dispatch-skill pattern (`/pm-skills:pm-audit-repo` on macOS Claude Code). The auditor PASSED, proving the cross-client dispatch pattern works in production. It also surfaced 6 new findings on shipped v2.16.1 state.

v2.16.2 closes the immediately-actionable housekeeping subset:

- Refreshes `AGENTS/claude/CONTEXT.md` Status block to reflect v2.16.1 + v2.16.2 chain (closes F-P1-02)
- Wires `check-context-currency.{sh,ps1}` into the `pre-tag-validate` bundle so this defect class can't recur (closes half of F-P2-01)

Other audit findings (README badge update, validator portability fix, CONTEXT.md Notes section refresh) are deferred per maintainer scope discipline. See Known Limitations below.

## What's fixed

### CONTEXT.md Status block refresh (closes F-P1-02)

The v2.16.1 patch shipped without a corresponding `AGENTS/claude/CONTEXT.md` Status block refresh. The doc still recorded "v2.16.0 SHIPPED" as the current state. v2.16.2 adds:

- Current Status line records v2.16.2 SHIPPED state
- Predecessor paragraph for v2.16.1 SHIPPED state including G4 P0 attestation full-pass evidence
- Earlier-predecessor paragraph preserves v2.16.0 narrative

This makes CONTEXT.md the canonical current-state reference for any future conductor invocation, audit, or session resume.

### Validator bundle expansion (closes half of F-P2-01)

Added `check-context-currency.{sh,ps1}` to the OPTIONAL_VALIDATORS array in `scripts/pre-tag-validate.{sh,ps1}`. This script existed at v2.16.0 but was not wired into the bundle. Had it been, F-P1-02 would have been caught pre-v2.16.1-tag.

The companion `check-version-references.sh` (which would catch README badge drift) intentionally remains UNWIRED in v2.16.2 because v2.16.2 explicitly defers the README badge update to a later release. Wiring it now would fail the bundle.

### What the bundle now runs (16 validators)

Bundle was 14 truly-enforcing + 3 v2.15.1 preventive (17 total slots; "optional" entries skip if script not present). v2.16.2 adds the 4th preventive slot. The bundle now runs:

| Tier | Validators |
|---|---|
| Truly enforcing | lint-skills-frontmatter, validate-agents-md, validate-commands, validate-meeting-skills-family, validate-foundation-sprint-skills-family --strict, validate-design-sprint-skills-family --strict, check-internal-link-validity --strict, validate-docs-frontmatter --strict, check-no-body-h1 --strict, check-count-consistency, check-generated-content-untouched |
| v2.15.1 preventive | check-landing-page-counts, check-workflow-generator-coverage, check-agents-md-command-sync |
| v2.16.2 preventive (NEW) | check-context-currency |

## Why it matters

The v2.16.1 patch had Known Limitations explicitly documented in its release notes. But the housekeeping that should have happened at v2.16.1 G4 P2 (CONTEXT.md refresh) was missed. v2.16.2 closes that gap and adds structural prevention (the validator wire) so the same gap can't open again.

This is the same pattern as v2.14.1 + v2.14.2 + v2.13.1: fast-patch for post-tag housekeeping that should have happened in the parent release.

## Known limitations carried forward

### To next release that touches README

- **F-P1-01 (README badge stuck at v2.16.0)**: deferred to whatever release ships the active maintainer README refactor. The badge will be refreshed naturally as part of that refactor.
- **F-P2-01 partial (`check-version-references.sh` wire)**: deferred to the same release. Wiring this validator while the README badge is stale would fail the bundle.

### To v2.17.0

- **F-P0-01 (validator portability on macOS bash 3.2 + non-git working tree)**: 6 of 14 validators in `pre-tag-validate.sh` use bash 4 features (`mapfile`, `declare -A`) or assume a git working tree; they syntax-error on macOS default bash 3.2.57. The dispatch skill `/pm-skills:pm-audit-repo` invocation that surfaced this finding ran the audit from `~/.claude/plugins/cache/pm-skills-marketplace/pm-skills/2.16.1/` on macOS - exactly the cross-platform scenario v2.16.0 introduced. Rewriting the affected validators for bash-3.2 compat + non-git fallback is scoped as v2.17.0 W3 (1-2 day effort). See `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` for details.
- **F-P2-02 (CONTEXT.md Notes section stale v2.13.0-era counts)**: pairs naturally with the v2.17.0 AGENTS rename work which already touches CONTEXT.md.
- **F-P2-03 (enforcing-validator count framing)**: same pairing as F-P2-02.

### Native Claude Code sub-agent registration

Unchanged from v2.16.1. Native sub-agent registration on Claude Code defers to v2.17.0 pending the `AGENTS/` to `_AGENTS/` rename + `subagents/` to `agents/` rename. Dispatch skills at `skills/utility-pm-{role}/` continue to provide the user-visible capability on every client (Codex CLI validated; Claude Code via the inline-execution path; Cursor/Windsurf/Copilot/Gemini CLI carried forward from v2.16.0).

## What does NOT change in v2.16.2

- Skill catalog (59 skills: 26 phase + 8 foundation + 10 utility + 15 tool) is unchanged.
- Workflows (12) and slash commands (66) are unchanged.
- 4 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor) are unchanged.
- 4 dispatch skills (utility-pm-*) are unchanged.
- Doc-stack (Astro 6.3.x + Starlight 0.39.x, Node 22.12+) carried forward from v2.16.0.
- README.md is untouched (active maintainer refactor preserved).
- All v2.15.0 Sprint Skills, v2.12.0 OKR Skills, v2.11.0 Meeting Skills Family content unchanged.

## Affected files

| File | Change |
|---|---|
| `.claude-plugin/plugin.json` | Version 2.16.1 to 2.16.2; description refresh |
| `.claude-plugin/marketplace.json` | Plugin version 2.16.1 to 2.16.2; description refresh |
| `CHANGELOG.md` | New 2.16.2 section |
| `docs/releases/Release_v2.16.2.md` | This file |
| `AGENTS/claude/CONTEXT.md` | Status block + Last Updated refresh (v2.16.1 + v2.16.2 paragraphs added) |
| `scripts/pre-tag-validate.sh` | Wire check-context-currency.sh into OPTIONAL_VALIDATORS |
| `scripts/pre-tag-validate.ps1` | PowerShell parity |
| `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` | G4 status flipped to FULL PASS - SHIPPED |
| `docs/internal/release-plans/v2.16.2/plan_v2.16.2.md` | Master plan + scope reduction note |
| `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` | Absorbed audit findings F-P0-01 + F-P2-02 + F-P2-03 |

No skill content, command content, workflow content, sub-agent definition content, docs site content (beyond CONTEXT.md), or CI workflow files changed in v2.16.2.
