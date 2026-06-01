---
title: Sub-Agent + Dispatch Skill Compatibility Matrix
description: Single source of truth for cross-client compatibility of pm-skills sub-agents and dispatch skills. Read this before invoking any pm-* sub-agent on a non-Claude client.
---

This document is the canonical source of truth for the cross-client status of every pm-skills sub-agent and its dispatch skill counterpart. All other surfaces (SKILL.md files, CHANGELOG, README, runtime-components catalog, release notes) link here rather than duplicating the matrix.

When validation status changes (a new client passes; an existing client regresses; a new dispatch skill ships), update this doc first and re-verify links from all dependent surfaces.

## How to Read This Doc

**Status definitions:**

- **PRODUCTION** = validated end-to-end on this client by maintainer test or shipped use; safe for daily use
- **DRY-RUN VALIDATED** = the dispatch mechanism works for read-only / no-side-effect flows; destructive operations on this path have not been independently exercised
- **EXPERIMENTAL** = expected to work based on the agentskills.io portability claim and the dispatch-skill pattern, but no maintainer has independently confirmed on this specific client
- **UNTESTED** = no maintainer test has been run on this client; treat as EXPERIMENTAL until validated

**Client definitions:**

- **Claude Code** = the Anthropic CLI client where pm-skills was authored and where native sub-agent chaining is supported
- **Codex CLI** = OpenAI Codex command-line client; runs skills via the `skill` tool; does not natively support sub-agents
- **Cursor / Windsurf / Copilot CLI / Gemini CLI** = other AI clients that read agentskills.io-compatible skills via the `Skill` tool or equivalent

## Cross-Client Status (as of v2.16.0)

| Sub-agent | Dispatch skill | Claude Code (native) | Codex CLI | Cursor / Windsurf / Copilot CLI / Gemini CLI |
|---|---|---|---|---|
| pm-critic | utility-pm-critic | PRODUCTION | PRODUCTION | EXPERIMENTAL |
| pm-skill-auditor | utility-pm-skill-auditor | PRODUCTION | PRODUCTION | EXPERIMENTAL |
| pm-changelog-curator | utility-pm-changelog-curator | PRODUCTION | PRODUCTION | EXPERIMENTAL |
| pm-release-conductor | utility-pm-release-conductor | PRODUCTION | DRY-RUN VALIDATED (live UNTESTED) | EXPERIMENTAL |
| pm-workflow-orchestrator (added v2.24.0) | utility-pm-workflow-orchestrator | EXPERIMENTAL (native `Skill`-from-sub-agent path UNTESTED until smoke test) | EXPERIMENTAL | EXPERIMENTAL |

## What Each Status Cell Means

### Claude Code (native sub-agent path)

As of v2.17.0, the sub-agent definitions live in the fixed `agents/` directory that Claude Code's plugin runtime auto-discovers. The v2.17.0 W2 rename freed the `agents/` name by moving the coordination directory to `_agent-context/`, which structurally enables native registration: `@-mention` dispatch (`@pm-critic`, etc.) and chain composition (pm-release-conductor chains to pm-skill-auditor at G0 + G2.5 and to pm-changelog-curator at G2 via the Agent tool).

> **Verification status (v2.17.0, attested 2026-05-20):** native registration is LIVE on Claude Code. After `/plugin update` + `/reload-plugins`, all 4 sub-agents auto-discover and appear in the `@`-mention menu as `(agent)` entries with their descriptions loaded (`@pm-critic`, `@pm-skill-auditor`, `@pm-changelog-curator`, `@pm-release-conductor`). Registration and discovery are confirmed; spawn, proactive invocation, and chain composition follow from registration and use the same definitions exercised cross-client. The dispatch-skill inline-execution path remains the portable fallback for non-Claude clients.

### Codex CLI (dispatch skill + inlined chain composition)

3 of 4 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator) are PRODUCTION on Codex CLI 0.128.0. Codex executes the dispatch skill, the dispatch skill instructs Codex to read the sub-agent definition file under `agents/{name}.md` and execute the system prompt body as its operating instructions. Codex maintains the same analytical discipline, the same layered output envelope, and the same refusal protocols that the native sub-agents enforce on Claude Code.

The 4th sub-agent (pm-release-conductor) is DRY-RUN VALIDATED only on Codex CLI. The dispatch-mechanism portion works: GATE C of the maintainer test harness exercised all 6 gates (G0/G1/G2/G2.5/G3/G4) with auditor inlined at G0 + G2.5 and curator inlined at G2; the context budget held; the no-bypass + only-tag-G2.5-captured-SHA invariants worked; the dry-run G3 correctly skipped actual git operations. **What was NOT exercised:** an actual `git tag` + `git push` operation on Codex CLI; that path has only been exercised on Claude Code.

For live release on Codex CLI, the maintainer should either run on Claude Code (the validated path) or, if Codex CLI is required, re-run the harness at [`maintainer-gate-testing-codex.md`](../internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) in `--no-dry-run` mode first and document the result. The conductor's no-bypass discipline applies regardless, so the worst case is the same as on Claude Code.

### Cursor / Windsurf / Copilot CLI / Gemini CLI

All 4 sub-agents are EXPERIMENTAL on these clients. The dispatch skill mechanism is expected to work based on agentskills.io portability claims, but no maintainer has independently confirmed on these clients as of v2.16.0 ship. Two practical paths for users on these clients:

1. **Trust the agentskills.io portability claim and try.** The dispatch skill is read by the client, the sub-agent definition file is read, and the system prompt is executed inline. The pattern is the same as the validated Codex CLI path. Risks are limited to client-specific instruction-following quirks (e.g., a client that aggressively truncates context could lose the inlined chain composition).
2. **Wait for v2.17+ validation.** v2.17 plans to expand the validated client matrix; see [`docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`](../internal/release-plans/v2.17.0/plan_v2.17.0.md).

For any high-stakes operation on an EXPERIMENTAL client (e.g., a live release conducted by pm-release-conductor on Windsurf), strongly consider running on Claude Code or Codex CLI dry-run first as a parallel sanity check.

### pm-workflow-orchestrator (added v2.24.0): EXPERIMENTAL on every client

`pm-workflow-orchestrator` ships EXPERIMENTAL on ALL clients, including the native Claude Code path. It is the first repo sub-agent to declare the `Skill` tool, so the native sub-agent-to-skill delegation path has no prior validated use to inherit from; it stays EXPERIMENTAL until a live smoke test confirms both that the engine can invoke a downstream skill via `Skill` in the installed plugin and whether that skill runs inline or isolated in the engine's context. The non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI) ship EXPERIMENTAL too, not "DRY-RUN VALIDATED by inheritance," because the orchestrator writes multiple full PM artifacts and may thread state, which is strictly harder than the conductor's inline path and has never been live-validated off Claude Code. On any client, run `--dry-run` first: it walks the step list (parse, checkpoint, stop-on-fail, tool-capability pre-flight) without invoking consequential skills. Moving any client from EXPERIMENTAL to PRODUCTION requires a dedicated maintainer-gate test exercising a real multi-artifact inline WRITE run.

This is a present-tense status added at v2.24.0; it does NOT amend the v2.16.0-attested GATE prose below, which describes a test that exercised the four v2.16.0 sub-agents only.

## Safe-Usage Matrix (Quick Reference)

| Operation | Claude Code | Codex CLI | Other clients |
|---|---|---|---|
| Review a PRD with pm-critic | Production | Production | Experimental |
| Audit repo with pm-skill-auditor | Production | Production | Experimental |
| Draft CHANGELOG with pm-changelog-curator | Production | Production | Experimental |
| Walk release runbook dry-run with pm-release-conductor | Production | Production | Experimental |
| Walk release runbook with actual tag + push | Production | Use with caution (run dry-run first) | Strongly recommend running on Claude Code |
| Run a plan through pm-workflow-orchestrator | Experimental (run `--dry-run` first) | Experimental (run `--dry-run` first) | Experimental (run `--dry-run` first) |

## What Was Validated for v2.16.0 Ship

### Cross-LLM adversarial review

Three Codex adversarial review passes against the v2.16.0 release-prep state. The third pass (challenge review at HEAD `19a213b`) surfaced the Codex P0 finding that drove the Codex-scoped reframing: "proving the dispatch mechanism works on Codex CLI is not the same as proving it works on Cursor, Windsurf, Copilot, or Gemini CLI." This doc + the v2.16.0 CHANGELOG Known Limitations + the conductor SKILL.md framing reflect that scoping correction.

### Maintainer gate testing on Codex CLI 0.128.0

GATE A: pm-critic behavior validated via 3 thread-aligned canonical samples produced from Claude Code (Brainshelf PRD, Storevine OKR set, Workbench meeting recap).

GATE B: 3 dispatch skills (pm-critic, pm-skill-auditor, pm-changelog-curator) self-administered on Codex CLI 0.128.0 via the harness at [`maintainer-gate-testing-codex.md`](../internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md). All 3 PASSED. Evidence at [`gate-test-results_2026-05-17_codex.md`](../internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md).

GATE C: pm-release-conductor dispatch sub-spike on Codex CLI 0.128.0 in dry-run mode. PASSED with all 6 gates walked, chain composition working, refusal protocols working.

### What was NOT validated for v2.16.0 ship

- Actual `git tag` + `git push` operations via the conductor dispatch on Codex CLI (DRY-RUN only)
- Any operation on Cursor, Windsurf, Copilot CLI, or Gemini CLI (UNTESTED)
- Multi-tool concurrent conductor runs (single-maintainer assumption; flagged in Codex P1)

## What Will Be Validated for v2.17.0+

Tentative expansion targets (see v2.17 stub for entrance criteria):

- Codex CLI live release path (no `--dry-run`); promotes pm-release-conductor on Codex CLI from DRY-RUN VALIDATED to PRODUCTION
- At least one additional client (Cursor likely, Windsurf possible) added to the maintainer test matrix; promotes 3 dispatch skills on that client from EXPERIMENTAL to PRODUCTION
- Single-conductor-at-a-time advisory + lock convention; closes the multi-tool concurrent-conductor P1 finding from Codex challenge review
- Validator regex anchoring fixes (FN-04 from v2.16 ship review); closes the workaround at the count-consistency layer

## How to Validate a New Client

If you are a maintainer or downstream user testing on a not-yet-validated client (e.g., Cursor) and want to upgrade its status from EXPERIMENTAL to PRODUCTION:

1. Open [`maintainer-gate-testing-codex.md`](../internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md). This harness was written for Codex CLI but the test structure transfers.
2. Adapt the invocation syntax to the client under test (e.g., Cursor reads skills via its own `Skill`-equivalent mechanism; map accordingly).
3. Run all 4 tests (GATE A pm-critic, GATE B 3 dispatch skills, GATE C conductor dry-run).
4. File evidence at `docs/internal/release-plans/v{next-version}/gate-test-results_{date}_{client}.md`.
5. Open a PR updating this doc's matrix + the dependent surfaces.

## Reference Links

- Canonical sub-agent definitions: [`agents/`](../../agents/)
- Dispatch skill definitions: [`skills/utility-pm-{role}/`](../../skills/)
- Runbook: [`docs/contributing/release-runbook.md`](../contributing/release-runbook.md)
- Runtime components catalog: [`docs/reference/runtime-components.md`](./runtime-components.md)
- v2.16.0 test summary: [`docs/internal/release-plans/v2.16.0/testing-summary_v2.16.0.md`](../internal/release-plans/v2.16.0/testing-summary_v2.16.0.md)
- v2.17.0 expansion plan: [`docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`](../internal/release-plans/v2.17.0/plan_v2.17.0.md)
- agentskills.io specification: [agentskills.io/specification](https://agentskills.io/specification)

## Versioning

| Doc version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-05-17 | Initial publication; consolidates the cross-client compatibility surfaces previously inline in 7+ files into this canonical reference. Captures v2.16.0 ship-state status. |
