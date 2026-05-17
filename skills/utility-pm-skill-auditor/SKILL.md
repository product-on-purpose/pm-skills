---
name: utility-pm-skill-auditor
description: Run a repo-wide cross-cutting governance audit via the pm-skill-auditor sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skill-auditor); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads subagents/pm-skill-auditor.md and executes the system prompt inline. Returns a layered audit report (full findings + Status Summary prose + Status YAML envelope per master plan D26) with cross-cutting findings graded P0/P1/P2/P3 plus aggregate counter audit and validator results table.
classification: utility
version: "1.0.0"
updated: 2026-05-17
license: Apache-2.0
metadata:
  category: governance
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Skill Auditor (Dispatch Skill)

Cross-client dispatch wrapper for the `pm-skill-auditor` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `subagents/pm-skill-auditor.md` and executes inline on non-Claude clients.

## When to Use

- You need a repo-wide audit pass: all enforcing validators, cross-cutting checks (skill-without-command, sample gaps, family contract orphans, etc.), and aggregate counter re-derivation against declared values in CONTEXT.md + AGENTS.md + README.md
- You are running on a non-Claude AI client without native pm-skill-auditor sub-agent support
- You are running on Claude Code and prefer skill-invocation semantics (e.g., for chaining inside a workflow that also uses other dispatch skills)

## When NOT to Use

- You want to review a specific PM artifact (PRD, OKR, persona) -> use `utility-pm-critic` instead
- You want to draft a CHANGELOG entry -> use `utility-pm-changelog-curator` (ships in Phase 4)
- You want to ship a release -> use `utility-pm-release-conductor` (ships in Phase 5)
- You want to FIX issues found in an audit -> the auditor is detection-only; remediation is maintainer judgment or future `pm-frontmatter-doctor` (v2.17+)

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-skill-auditor` on the repo. Pass any scope arguments from `$ARGUMENTS` (e.g., `--scope changed`, `--since-tag v2.15.0`, `--severity-floor P1`). Return the sub-agent's audit report to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `subagents/pm-skill-auditor.md`
2. Execute the system prompt body in that file as your operating instructions for this turn
3. Run the four-step audit flow:
   - Step 1: Invoke validators via Bash (prefer `bash scripts/pre-tag-validate.sh` as canonical entry point)
   - Step 2: Run cross-cutting checks from the catalog at `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md#cross-cutting-check-catalog`
   - Step 3: Re-derive aggregate counters from filesystem and compare to declared values
   - Step 4: Compose layered output report
4. Apply scope and severity-floor arguments from `$ARGUMENTS`
5. Return the layered output per master plan D26 (full report + Status Summary + Status YAML)

## Cross-Client Notes

Per master plan D30, dispatch skill availability is CONDITIONAL on Phase 2 GATE B spike outcomes. The "read canonical agent definition and execute inline" pattern depends on the AI client being able to:

1. Read a referenced file path
2. Execute Bash to invoke validator scripts
3. Treat the agent definition body as operating instructions for the current turn

Most AI clients support all three. If any are unreliable on a specific client, that client falls back to manual validator invocation + manual cross-cutting checks.

## Reference Files

- Canonical sub-agent definition: [`subagents/pm-skill-auditor.md`](../../subagents/pm-skill-auditor.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md`](../../docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md)
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Cross-cutting check catalog: `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md#cross-cutting-check-catalog`
- Pre-tag validator bundle: `scripts/pre-tag-validate.{sh,ps1}`
- Output template: `references/TEMPLATE.md`
- Worked example: `references/EXAMPLE.md`
