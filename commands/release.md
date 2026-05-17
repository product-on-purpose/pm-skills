---
description: Walk the guided release runbook (6 gates) via the pm-release-conductor sub-agent
argument-hint: "<v target version> [--dry-run] [--branch <name>]"
---

Walk the guided release runbook for a new version tag.

**On Claude Code with the pm-skills plugin:** invoke the `pm-release-conductor` sub-agent (definition at `subagents/pm-release-conductor.md`). The conductor walks 6 gates (G0 Pre-tag readiness, G1 Adversarial review, G2 Version bump + CHANGELOG prep, G2.5 Commit + re-verify, G3 Tag + push, G4 Post-tag hygiene). It chains to `pm-skill-auditor` at G0 + G2.5 and to `pm-changelog-curator` at G2. It refuses to advance past a failed gate and refuses to tag any SHA other than the one G2.5 captured (prevents broken-tag class of bug per master plan D22).

**On other AI clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI):** invoke the dispatch skill at `skills/utility-pm-release-conductor/SKILL.md`. The dispatch skill uses the reference-and-execute-inline pattern: it reads the conductor's system prompt + inlines auditor and curator behaviors at G0 and G2 (because non-Claude clients cannot natively chain to other sub-agents). Availability is CONDITIONAL on Phase 2 GATE C sub-spike outcome per master plan D30.

`$ARGUMENTS` MUST start with a semver version (`v2.16.0`). Optional `--dry-run` walks all gates without the actual tag + push. Optional `--branch <name>` overrides the default `main` branch check.

The conductor cannot be bypassed: `--skip-gates` was removed from v2.16 per D24. Maintainers who need to bypass a gate (e.g., G1 for a hotfix) must manually run that gate's verification and confirm to the conductor at the gate prompt.

See `docs/contributing/release-runbook.md` for the canonical gate definitions and sub-checks. The conductor reads that file at invocation time (referential discipline per D12).

Context from user: $ARGUMENTS
