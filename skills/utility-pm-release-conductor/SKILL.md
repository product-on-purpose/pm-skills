---
name: utility-pm-release-conductor
description: Walk the guided release runbook (6 gates G0/G1/G2/G2.5/G3/G4) via the pm-release-conductor sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-release-conductor with native chain composition to pm-skill-auditor at G0 and pm-changelog-curator at G2); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads subagents/pm-release-conductor.md and inlines auditor + curator behaviors at G0 + G2 via reference-and-execute-inline pattern (because non-Claude clients cannot natively chain to other sub-agents). Returns gate-by-gate output with explicit confirmation pauses, refuses bypass attempts, tags only the G2.5-captured SHA per master plan D22.
classification: utility
version: "1.0.0"
updated: 2026-05-17
license: Apache-2.0
metadata:
  category: release
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Release Conductor (Dispatch Skill)

Cross-client dispatch wrapper for the `pm-release-conductor` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `subagents/pm-release-conductor.md` and inlines chain composition on non-Claude clients via "reference + execute inline" pattern.

> **VALIDATED on Codex CLI 2026-05-17 per Option A.** Phase 2 GATE C sub-spike PASSED: the "reference + execute inline" pattern for chain composition (inlining auditor + curator behaviors at G0 + G2 + G2.5 instead of native sub-agent chaining) completed cleanly on Codex CLI 0.128.0 with context budget held through all 6 gates. See [`docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md`](../../docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md) for the full Codex run record. Recommended for production use on Codex CLI; additional clients (Cursor, Windsurf, Copilot, Gemini CLI) may also work but have not been independently validated yet. Maintainers wanting belt-and-suspenders confidence can re-run the harness on a second client per the [`maintainer-gate-testing-codex.md`](../../docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) before invoking live release operations.

**STATUS:** RATIFIED in v2.16.0 per master plan D30 + GATE C PASS outcome recorded 2026-05-17.

## When to Use

- You are running a pm-skills release on a non-Claude client (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI)
- You want the same 6-gate discipline that pm-release-conductor enforces on Claude Code, with auditor + curator behaviors inlined at the relevant gates
- You explicitly want skill-invocation semantics over sub-agent semantics on Claude Code (rare; the native sub-agent is preferred on Claude Code)

## When NOT to Use

- You only need to review a PM artifact -> use `utility-pm-critic`
- You only need a governance audit (not a release) -> use `utility-pm-skill-auditor`
- You only need a CHANGELOG draft (not a release) -> use `utility-pm-changelog-curator`
- You want to perform release operations WITHOUT explicit gate confirmation -> the conductor refuses bypass; manual release outside the conductor is the right path

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-release-conductor` with the user's target version + optional flags from `$ARGUMENTS`. The native sub-agent walks the 6 gates and natively chains to `pm-skill-auditor` (G0, G2.5) and `pm-changelog-curator` (G2) via the Agent tool. Return the conductor's gate-by-gate output to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `subagents/pm-release-conductor.md`
2. Read the canonical runbook at `docs/contributing/release-runbook.md` (the conductor's referential source for gate definitions)
3. Execute the system prompt body as your operating instructions
4. Walk the 6 gates inline. At gates that require chain composition:
   - **G0 (Pre-tag readiness):** instead of chaining to pm-skill-auditor, read `subagents/pm-skill-auditor.md` and execute the auditor's 4-step audit flow inline. Capture the layered output (full findings + Status Summary + Status YAML). Treat the Status YAML as your G0 sub-check 5 input.
   - **G2 (Version bump + CHANGELOG prep):** instead of chaining to pm-changelog-curator, read `subagents/pm-changelog-curator.md` and execute the curator's 8-step drafting flow inline. Capture the layered output. Treat the Status YAML as your G2 sub-check 3 input.
   - **G2.5 (Re-verify):** re-execute the inlined auditor at sub-check 5 against the new HEAD.
5. Pause at each gate boundary for explicit maintainer confirmation
6. Refuse bypass attempts; respect refusal protocols
7. Tag only the G2.5-captured SHA at G3 per D22
8. Return gate-by-gate output throughout the flow

The "reference + execute inline" pattern is what enables cross-client compatibility for chain composition. Phase 2 GATE C sub-spike validates that this pattern is reliable.

## Critical Caveats for Non-Claude Inline Execution

Because non-Claude clients cannot natively chain, the auditor and curator behaviors run in the SAME context window as the conductor on non-Claude clients. This has implications:

1. **Context budget.** The combined token budget (conductor + inlined auditor + inlined curator + their child reads) may approach context limits on long releases. Plan accordingly.
2. **Tool authorization.** The conductor's tool list includes Bash, Read, Edit, Grep, Glob, Agent. The auditor needs Bash + Read + Grep + Glob. The curator needs Bash + Read + Grep. Inline execution on non-Claude clients should have access to ALL of these (i.e., not be running in a Read-only mode).
3. **Refusal cascade.** If the inlined auditor refuses (e.g., validators not invocable), the conductor's G0 sub-check 5 fails and the gate pauses. Same for the curator at G2.

## Reference Files

- Canonical sub-agent definition: [`subagents/pm-release-conductor.md`](../../subagents/pm-release-conductor.md)
- Canonical runbook: [`docs/contributing/release-runbook.md`](../../docs/contributing/release-runbook.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md`](../../docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md)
- Chain child (inlined at G0 + G2.5): [`subagents/pm-skill-auditor.md`](../../subagents/pm-skill-auditor.md)
- Chain child (inlined at G2): [`subagents/pm-changelog-curator.md`](../../subagents/pm-changelog-curator.md)
- Pre-tag validator bundle: `scripts/pre-tag-validate.{sh,ps1}`
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Output template: `references/TEMPLATE.md`
- Worked example: `references/EXAMPLE.md`
