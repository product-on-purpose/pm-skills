---
title: Runtime Components
description: Catalog of pm-skills runtime components (sub-agents, hooks, output styles) that extend the skills library with active orchestration behaviors. Sub-agents are Claude Code plugin features; dispatch skills make their intent portable to non-Claude clients.
---

## Table of Contents

- [What Runtime Components Are](#what-runtime-components-are)
- [Sub-Agents Catalog](#sub-agents-catalog)
- [Hooks Catalog](#hooks-catalog)
- [Output Styles Catalog](#output-styles-catalog)
- [How to Discover and Invoke](#how-to-discover-and-invoke)
- [Cross-Client Compatibility](#cross-client-compatibility)
- [Composition Patterns](#composition-patterns)

## What Runtime Components Are

pm-skills ships two layers of capability:

**Content library (the bulk of the repo):** 68 skills, 11 slash commands, 12 workflows, 27 enforcing CI validators. Skills are content - reference material an AI reads at invocation time. They do not execute logic on their own.

**Runtime components (this catalog):** Plugin features that take action. Sub-agents are dispatched by Claude Code's intent classifier and run in their own context window. Hooks fire on lifecycle events (PreToolUse, PostToolUse, Stop). Output styles transform how Claude formats responses.

The distinction matters because skills are portable across clients (any client that supports the agentskills.io specification can read SKILL.md files), but runtime components are Claude Code plugin-specific. pm-skills delivers sub-agent intent to non-Claude clients via dispatch skills (see [Cross-Client Compatibility](#cross-client-compatibility)) so users on Codex CLI, Cursor, Windsurf, Copilot, or Gemini CLI lose no functional access.

| Layer | What it is | How AI uses it | Cross-client portable? |
|---|---|---|---|
| Skills (68) | Reference content with frontmatter, templates, examples | AI reads SKILL.md at invocation time | Yes (per agentskills.io spec) |
| Commands (11) | The `/workflow-*` orchestrators plus the `/chain` ad-hoc runner | User types `/workflow-name` or `/chain`, AI walks the skill sequence | Claude Code native |
| Workflows (12) | Multi-skill chains for full lifecycle moments | AI walks ordered skill invocations | Native; portable conceptually |
| Sub-agents (6; the v2.16 slate of 4 plus `pm-workflow-orchestrator` added v2.24.0 and `pm-skill-router` added v2.29.0) | Plugin components matched via `description:` and run in isolated context, or explicitly dispatched for maintainer tooling | Claude Code's intent classifier delegates; OR user invokes the dispatch skill (`/pm-skills:utility-pm-{role}`) or @-mentions `@agent-pm-skills:pm-{role}`; `pm-skill-router` is explicit-only, maintainer-run | Claude Code only; dispatch skills provide cross-client parity (5 of 6; `pm-skill-router` has none) |
| Hooks (0; v2.17+ scope) | Lifecycle event handlers (PreToolUse, PostToolUse, Stop, etc.) | Claude Code fires automatically on configured events | Claude Code only |
| Output styles (0; v2.18+ scope) | Response formatting transforms | Claude applies when style is active | Claude Code only |

## Sub-Agents Catalog

v2.16.0 introduces sub-agents as the first runtime-component class. 4 sub-agents ship in this release. v2.24.0 adds a fifth, `pm-workflow-orchestrator`, and v2.29.0 adds a sixth, `pm-skill-router` (an internal tooling instrument, not a user-facing PM sub-agent), so the catalog below now lists 6 sub-agents. Each definition lives at `agents/{name}.md`, the fixed path Claude Code's plugin runtime auto-discovers (the directory was named `subagents/` through v2.16.x and renamed to `agents/` in v2.17.0 W2; see [project structure](./project-structure.md)).

| Sub-agent | Audience | Trigger | Lifetime | Tool Surface | Composition | Dispatch Skill |
|---|---|---|---|---|---|---|
| `pm-critic` | User (PM authoring artifacts) | Proactive after PM-artifact-producing skills (Claude Code) + explicit `utility-pm-critic` | Single turn | Read, Grep, Glob (no write; no Bash) | Skill-revise-recheck loop with deliver-prd, foundation-okr-writer, foundation-meeting-recap, foundation-persona, foundation-lean-canvas, discover-interview-synthesis, etc. | `skills/utility-pm-critic/` |
| `pm-skill-auditor` | User + Maintainer (audience straddles) | Explicit only: `utility-pm-skill-auditor` or `@agent-pm-skills:pm-skill-auditor`; chained from `pm-release-conductor` at gate G0 | Multi-turn (may ask follow-up questions) | Bash, Read, Grep, Glob (no Edit; no Agent; detection-only) | Composes the enforcing validator suite via `scripts/pre-tag-validate.{sh,ps1}`; runs cross-cutting checks; re-derives aggregate counters | `skills/utility-pm-skill-auditor/` |
| `pm-changelog-curator` | Maintainer | Explicit only: `utility-pm-changelog-curator` or `@agent-pm-skills:pm-changelog-curator`; chained from `pm-release-conductor` at gate G2 | Single turn (standalone or chained) | Bash, Read, Grep (no Edit; no Agent) | Composes with git log + CLAUDE.md hygiene rules; chained from conductor at G2 | `skills/utility-pm-changelog-curator/` |
| `pm-release-conductor` | Maintainer | Explicit only: `/pm-skills:utility-pm-release-conductor v{X.Y.Z}` or `@agent-pm-skills:pm-release-conductor` (not proactive; safety from the 6 gates, not the invocation path) | Full release flow (often 30+ minutes) | Bash, Read, Edit, Grep, Glob, **Agent** (chain-permitted per `_chain-permitted.yaml`) | Chains to `pm-skill-auditor` at G0 + G2.5 and to `pm-changelog-curator` at G2; reads `docs/contributing/release-runbook.md` for gate definitions | `skills/utility-pm-release-conductor/` |
| `pm-workflow-orchestrator` | User + Maintainer | Explicit only: `/pm-skills:utility-pm-workflow-orchestrator` or `@agent-pm-skills:pm-workflow-orchestrator` (not proactive; safety from the per-step checkpoints, not the invocation path) | Multi-step run (pauses at each step for go/no-go) | **Skill**, Read, Grep, Glob, Bash, Edit (NO Agent; delegates to skills, not sub-agents; not chain-permitted) | Runs an ordered sequence of pm-skills against a saved `foundation-prioritized-action-plan` (Mode A) or a user-named chain (Mode B); inlines `pm-critic`'s leaf agent rather than nesting its dispatch skill | `skills/utility-pm-workflow-orchestrator/` |
| `pm-skill-router` | Maintainer (internal tooling instrument, not user-facing; AGENTS.md states this explicitly) | Explicit only: key-free `--emit-tasks` dispatch via the `Agent` tool (Haiku-pinned by default) from a maintainer session, or a direct Messages API call (`--model=<id>`, requires `ANTHROPIC_API_KEY`) | Single turn (one query in, one skill name or `none` out) | Read (no Write; no Bash) | Judges a query against the catalog by `description:` match only; the routing engine behind the enforcing `scripts/check-new-skill-collision.mjs` gate and the `scripts/run-router-evals.mjs` trigger-eval baseline, both maintainer-run repo-governance tools | None (no dispatch skill; see the [Sub-Agent Compatibility Matrix](./sub-agent-compatibility.md)) |

For per-sub-agent cross-client status (Claude Code / Codex CLI / Cursor / Windsurf / Copilot CLI / Gemini CLI), see the canonical [Sub-Agent Compatibility Matrix](./sub-agent-compatibility.md). Rows fill in as each sub-agent ships in its respective phase of [`subagents-integration-plan.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/subagents-integration-plan.md). Behavioral contracts live in the corresponding `spec_pm-{name}.md` files alongside the integration plan.

### Sub-agent invariants

These invariants hold for every sub-agent in this catalog (enforced by `scripts/validate-agents-md.{sh,ps1}` extended per master plan D19):

- Definition file at `agents/{name}.md` with YAML frontmatter declaring `name`, `description`, `tools`, `model`, `memory`
- Dispatch skill at `skills/utility-pm-{role}/` for cross-client access (the v2.16 companion-command pairing was retired in v2.22.0); `pm-skill-router` is the sole exception, an internal tooling instrument with no dispatch skill (see above)
- `tools:` frontmatter is a comma-separated scalar (per D20), e.g. `tools: Read, Grep, Glob`
- `Agent` in `tools:` requires entry in `agents/_chain-permitted.yaml` per D21 (HARD FAIL otherwise)
- Chain depth capped at 2 levels (D14)
- Severity grammar P0 / P1 / P2 / P3 across all findings output (D15)
- System prompt is referential, not duplicative (D12)
- Default `memory: none` unless escalation is justified (D13)

## Hooks Catalog

No hooks ship in v2.16.0. The roadmap's PostToolUse frontmatter hook (R-24) is deferred to v2.17 once sub-agents are battle-tested; the hook-triggered sub-agent invocation pattern (R-65) depends on the v2.16 sub-agent slate landing first.

| Hook | Event | Status |
|---|---|---|
| _(none in v2.16.0)_ | _(none)_ | _v2.17+ scope_ |

## Output Styles Catalog

No output styles ship in v2.16.0. The roadmap's PM Voice output style (R-45) is deferred to v2.18+.

| Style | Purpose | Status |
|---|---|---|
| _(none in v2.16.0)_ | _(none)_ | _v2.18+ scope_ |

## How to Discover and Invoke

### Native Claude Code path

Sub-agents are discovered automatically when the pm-skills plugin is installed. Two invocation paths exist:

**Proactive (Claude Code matches `description:` and dispatches):**

```
User: "Here's the PRD draft for review."
Claude Code: [intent classifier matches pm-critic's `use proactively` description]
             [dispatches to pm-critic in fresh context window]
             [pm-critic reads PRD, produces P0-P3 findings, returns to main context]
Claude: "I've reviewed your PRD. Three P1 findings to address..."
```

Only `pm-critic` ships with a proactive trigger in v2.16.0 per master plan D7. The 3 utility sub-agents (pm-skill-auditor, pm-changelog-curator, pm-release-conductor) are explicit-only.

**Explicit (user invokes the dispatch skill):**

```
User: utility-pm-critic docs/specs/my-prd.md
Claude Code: [invokes pm-critic with the artifact path as $ARGUMENTS]
```

Dispatch skills (one per sub-agent):

- `utility-pm-critic [artifact path]` invokes `pm-critic`
- `utility-pm-skill-auditor` invokes `pm-skill-auditor`
- `utility-pm-changelog-curator [since-tag]` invokes `pm-changelog-curator`
- `utility-pm-release-conductor [version]` invokes `pm-release-conductor`
- `utility-pm-workflow-orchestrator [plan path] [--auto] [--force-auto] [--dry-run]` invokes `pm-workflow-orchestrator` (added v2.24.0)

The orchestrator's explicit @-mention form, mirroring the others:

```
User: @agent-pm-skills:pm-workflow-orchestrator _pm-skills/plans/storevine-q3.md
Claude Code: [invokes pm-workflow-orchestrator with the plan path as $ARGUMENTS]
             [parses Section 7 runnable blocks, runs them one at a time]
             [pauses for go/no-go before each step; stops on a failed or empty step]
```

### Dispatch skill path (non-Claude clients)

On non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI), sub-agents are not natively available. Users invoke the dispatch skill at `skills/utility-pm-{role}/` which provides the same intent. The dispatch skill SKILL.md detects runtime and either:

1. (Claude Code path) invokes the native sub-agent via `@agent-pm-skills:pm-{role}` syntax, OR
2. (Non-Claude path) reads `agents/pm-{role}.md` and executes its system prompt inline

See [Cross-Client Compatibility](#cross-client-compatibility) for details. Dispatch skill availability is conditional on Phase 2 spike outcomes; see the integration plan.

## Cross-Client Compatibility

Per master plan D11 (amended) + D30:

**Single-tool user assumption.** pm-skills does NOT assume users run multiple AI tools simultaneously. Users typically pick ONE primary AI tool (Claude Code, Codex CLI, Cursor, Windsurf, Copilot, or Gemini CLI) for a given workflow. pm-skills delivers full value to all clients, but the SHAPE of the access differs:

| Client | Skills access | Sub-agent access |
|---|---|---|
| Claude Code | Native plugin install; auto-discovery | Native plugin sub-agent at `agents/{name}.md` |
| Codex CLI | Sync to `~/.codex/skills/` per agentskills.io | Dispatch skill at `skills/utility-pm-{role}/` reads `agents/{name}.md` inline |
| Cursor | Sync to `.cursor/skills/` | Same dispatch pattern |
| Windsurf | Sync to `.windsurf/skills/` | Same dispatch pattern |
| Copilot | Sync to `.copilot/skills/` | Same dispatch pattern |
| Gemini CLI | Sync to `.gemini/skills/` | Same dispatch pattern |

**Dispatch skill mechanism.** Each dispatch skill is a thin pm-skills utility skill (~50 lines of SKILL.md) that contains conditional instructions:

> If you are running in Claude Code with the pm-skills plugin: invoke `@agent-pm-skills:pm-critic` (or equivalent) on the target.
> If you are running in any other client: read the canonical agent definition at `agents/pm-{name}.md` and execute the system prompt body as your operating instructions for this turn.

The dispatch skill is portable per agentskills.io. The sub-agent definition file (`agents/{name}.md`) is portable as plain markdown - any AI that can read a file can execute its prompt body inline. There is no drift risk: the canonical system prompt lives in ONE place (the sub-agent definition), and the dispatch skill references it.

**codex-rescue is NOT a baseline.** Prior framing (pre-amendment) assumed users had Claude Code AND Codex CLI AND the codex-rescue plugin. None of these are universal. codex-rescue is an optional shortcut for the minority of users running both Claude Code and Codex CLI; it is not part of the dispatch path.

**Functional gaps on non-Claude clients (acceptable per single-tool user assumption):**

- Proactive triggering (pm-critic's auto-fire after PM-artifact-producing skills) is a Claude Code frontmatter feature. On non-Claude clients, sub-agent invocation is explicit-only.
- User-level overrides via `.claude/agents/` (Claude Code's per-user agent dir) have no portable equivalent. Non-Claude users edit the dispatch skill SKILL.md locally instead.
- Plugin-level settings via `.claude/pm-skills.local.md` (deferred to v2.17+) are Claude-Code-specific.

These gaps are documented but not blocking; they reflect the platform differences, not pm-skills design choices.

## Composition Patterns

pm-skills sub-agents compose with each other and with the skills library in specific patterns. The strategy doc at `docs/internal/_working/subagents/subagent-strategy_2026-05-07.md` catalogs all patterns; this section summarizes the v2.16.0 active ones.

### Pattern 1: Skill -> sub-agent (proactive review loop)

A PM-artifact-producing skill (deliver-prd, foundation-okr-writer, foundation-meeting-recap, foundation-persona, foundation-lean-canvas, discover-interview-synthesis) emits its artifact. pm-critic's proactive trigger fires, runs adversarial review, returns P0-P3 findings. The user iterates on the artifact based on findings.

### Pattern 2: Slash command -> sub-agent (explicit invocation)

User runs `utility-pm-critic`, `utility-pm-skill-auditor`, `utility-pm-changelog-curator`, or `utility-pm-release-conductor`. The command invokes the paired sub-agent. Single-turn lifetime for critic and curator; multi-turn for auditor and conductor.

### Pattern 3: Sub-agent -> sub-agent (chain composition, 2 levels max)

pm-release-conductor chains to children at specific gates:

- G0 (pre-tag readiness): chains to pm-skill-auditor; receives audit findings via layered Status envelope per D26
- G2 (CHANGELOG prep): chains to pm-changelog-curator; receives draft via layered Status envelope per D26
- G2.5 (commit + re-verify): re-runs G0 chain after committing release-prep edits per D22

Neither child (auditor, curator) chains further. Chain depth = 2 is enforced via `agents/_chain-permitted.yaml` allowlist + `validate-agents-md` (D21 HARD FAIL).

### Pattern 4: Dispatch skill -> sub-agent or inline execution (cross-client)

Dispatch skill detects runtime and either invokes native sub-agent (Claude Code path) or reads + executes the agent definition inline (non-Claude path). The "reference + execute inline" pattern enables non-Claude clients to consume sub-agent intent without losing functional access.

For pm-release-conductor specifically (most complex sub-agent), the dispatch skill uses an expanded "reference + execute inline" pattern that inlines auditor + curator behaviors at G0 + G2 on non-Claude clients (instead of chaining; chain composition is Claude Code only). This pattern is validated by Phase 2 GATE C sub-spike before shipping the conductor dispatch skill.

### Pattern 5: /chain -> orchestrator Mode B -> builder (ad-hoc to durable, v2.26.0)

`/chain` is a thin front door to `pm-workflow-orchestrator` Mode B: it parses only the separator-driven chain-expression boundary (grammar in `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md`, Mode B Chain Expression Contract) and hands the steps, flags, and context to the engine, which validates every name pre-flight and owns all run rules. A completed 2+ step chain's terminal output suggests promotion; `utility-pm-workflow-builder` turns the chain expression into a staged Workflow Implementation Packet (draft `_workflows/` file, draft command, cross-cutting checklist) that a human reviews and promotes. The loop: try a sequence ad hoc, discover it is reusable, make it durable, and from then on run the curated `workflow-*` command.

Who runs what, pinned (the orchestrator boundary table):

| Surface | Persistence | Who executes | Validation source |
|---|---|---|---|
| `/chain` | Ephemeral; nothing committed | `pm-workflow-orchestrator` Mode B (native sub-agent on Claude Code; dispatch skill inline branch elsewhere) | Chain-expression contract in PARSE-CONTRACT.md |
| `utility-pm-workflow-orchestrator` Mode B direct | Ephemeral | Same engine | Same contract |
| `workflow-*` commands | Durable, curated, hand-authored | Main agent reads each skill inline (NOT the orchestrator) | Author judgment + repo validators |
| `utility-pm-workflow-builder` | Authors durable files via `_staging/` | Not an executor; writes a packet only | Same contract, applied at authoring time |

The boundary rules carried over unchanged from v2.24.0: the orchestrator never nests a workflow (Category 3 steps surface as MANUAL), never spawns a sub-agent (leaf-inlining for Category 2; no `Agent` tool; no `_chain-permitted.yaml` entry), and Mode A / Mode B threading semantics are unchanged apart from the now-named `--thread` flag for user-declared linear dependency.

## Cross-References

- Master plan: [`docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/plan_v2.16.0.md) (D11, D14, D19, D20, D21, D26, D30, D31)
- Subagents integration plan: [`docs/internal/release-plans/v2.16.0/subagents-integration-plan.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/subagents-integration-plan.md)
- Adversarial review user guide: `docs/guides/adversarial-review.md` (ships in Phase 2)
- Release runbook contributor guide: `docs/contributing/release-runbook.md` (ships in Phase 5)
- Chain allowlist: [`agents/_chain-permitted.yaml`](https://github.com/product-on-purpose/pm-skills/blob/main/agents/_chain-permitted.yaml)
- Strategy source: `docs/internal/_working/subagents/subagent-strategy_2026-05-07.md`
