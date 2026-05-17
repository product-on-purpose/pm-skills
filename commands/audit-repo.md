---
description: Run a repo-wide cross-cutting governance audit via the pm-skill-auditor sub-agent
argument-hint: "[--scope all|changed|since-tag <tag>] [--severity-floor P0|P1|P2|P3]"
---

Run a repo-wide cross-cutting governance audit.

**On Claude Code with the pm-skills plugin:** invoke the `pm-skill-auditor` sub-agent (definition at `subagents/pm-skill-auditor.md`). The sub-agent runs Bash to invoke the enforcing validator suite (via `scripts/pre-tag-validate.{sh,ps1}` as the canonical orchestration entry point), aggregates output, runs cross-cutting checks no single validator catches alone, re-derives aggregate counters across CONTEXT.md + AGENTS.md + README.md, and returns a layered findings report (full findings + Status Summary prose + Status YAML envelope per master plan D26).

**On other AI clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI):** invoke the dispatch skill at `skills/utility-pm-skill-auditor/SKILL.md`. The dispatch skill reads the canonical sub-agent definition inline and produces equivalent audit output.

Scope defaults to full repo. Use `--scope changed` for working-tree-only or `--since-tag vX.Y.Z` for delta since a specific tag. Use `--severity-floor P1` for pre-release tightening (hides P2 + P3 findings from the report).

The audit is **detection-only**. It does not fix issues. Remediation belongs to maintainer judgment (or to `pm-frontmatter-doctor` in v2.17 once that sub-agent ships).

See `docs/contributing/release-runbook.md` for the canonical audit-report shape (used by the conductor at gate G0).

Context from user: $ARGUMENTS
