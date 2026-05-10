# Sub-Agent Implementation Plan for pm-skills

**Status:** Draft for review. Not yet promoted to canonical structure.
**Authored:** 2026-05-10
**Source document:** `subagent-strategy_2026-05-07.md` (sibling file in this folder)
**Cross-references:** `../../agent-component-usage_2026-04-18.md` (broader runtime surface analysis)

## Purpose

Convert the May 7 sub-agent strategy doc into an actionable ship plan. The strategy doc is thorough on options (10 candidates, 4 tiers, 10 cross-cutting insights) but stops at "recommended near-term path." This plan locks the sequencing, scopes each shipping cycle, and identifies decisions the maintainer needs to make to start.

This is a planning document, not a release plan. When the maintainer commits to a specific shipping cycle (v2.14.x or v2.15.0), a release plan gets promoted from this into `docs/internal/release-plans/vX.Y.Z/`.

## Strategic shape

Three observations from the source doc shape the plan:

1. **Sub-agents formalize discipline that already exists informally.** Every Tier 1 strategic candidate codifies maintainer-or-user behavior the repo already does manually. This makes the first sub-agent low-risk: it doesn't invent new behaviors, it scales existing ones.
2. **Ship one, prove value, ship the next.** The doc explicitly warns against proliferation. The plan respects this by treating each cycle as a decision gate rather than a pre-committed slate.
3. **pm-critic is the lowest-cost, highest-leverage entry point.** Single file, 1-3 days, no companion infrastructure required, unlocks adversarial review for every PM artifact. Every multi-cycle plan starts with pm-critic as the first ship.

## Ship sequence

| Cycle | Ship | Effort | Decision gate |
|---|---|---|---|
| v2.14.x late OR v2.15.0 | pm-critic plus `/critic` command plus `docs/guides/adversarial-review.md` | 1-3 days | After 2 weeks of real use, evaluate: false positives, missed findings, scope creep |
| v2.15.1 | pm-release-conductor plus pm-changelog-curator plus pm-skill-auditor plus companion slash commands plus `docs/contributing/release-runbook.md` | 6-8 days | Conductor's release cycle observed end-to-end; auditor surfaces real cross-cutting drift |
| v2.16.0 | pm-workflow-orchestrator (scoped to Feature Kickoff only) plus pm-sample-curator (if F-34 THREAD_PROFILES.md ships first) | 3-8 days depending on scope | One full workflow run end-to-end with the orchestrator; sample-curator catches real gaps |
| v2.16.x or v2.17.0 | pm-frontmatter-doctor (if drift becomes measurable pain) plus pm-cross-llm-handoff (if the spike says yes) | 2-5 days | Each driven by real-pain signal, not anticipation |

Total slate, end to end: roughly 14-20 days of focused work spread across 3-4 release cycles. Compared to the source doc's 41-59 days for the full sprint-skills v0.1.0, this is a much lighter overall investment.

## v2.15.0 detailed plan: pm-critic first

### Goal

Ship the first plugin sub-agent for pm-skills: pm-critic, an adversarial PM-artifact reviewer that auto-invokes proactively after artifact-producing skills complete.

### Deliverables

1. `agents/pm-critic.md` (the sub-agent definition)
2. `commands/critic.md` (companion slash command for explicit invocation)
3. `docs/guides/adversarial-review.md` (user-facing guide explaining when and how to invoke)
4. AGENTS.md update listing the new component
5. README.md update mentioning sub-agents as a new component class
6. `docs/reference/runtime-components.md` (skeleton; populated more in v2.15.1 when the slate grows; Insight 6 from source doc)
7. Library samples for pm-critic output: 3 example findings reports against existing pm-skills artifacts (one PRD, one OKR set, one meeting recap)
8. CHANGELOG entry

### pm-critic agent definition (sketch)

```yaml
---
name: pm-critic
description: |
  Use proactively after any PM-artifact-producing skill completes (deliver-prd,
  foundation-meeting-recap, foundation-okr-writer, foundation-persona,
  foundation-lean-canvas, discover-interview-synthesis, etc.). Runs adversarial
  review. Finds weaknesses, not wins. Returns findings graded
  CRITICAL/IMPORTANT/MINOR/NIT with concrete fix suggestions.
tools: Read, Grep, Glob
model: sonnet
memory: none
---
```

The system prompt body draws from the source doc's "Concrete prompt scope" outline and references the canonical contracts (foundation-okr-writer SKILL.md for OKR refusal protocols, meeting-skills-contract.md for family compliance, etc.) rather than duplicating them. Per Insight 1 from the source doc, the agent reads canonical docs at invocation time so updates to standards docs flow through automatically.

### Invocation patterns enabled

- **Proactive (Pattern 4):** auto-fires after artifact-producing skills via the `use proactively` description
- **Slash command (Pattern 1):** `/critic [optional artifact path]` for explicit invocation
- **@-mention (Pattern 2):** `@agent-pm-critic review this PRD`
- **User override:** `.claude/pm-skills.local.md` can set `pm_critic_auto_invoke: false` if proactive invocation becomes noisy (this user-settings file may not exist yet; ship pm-critic with a documented intent for the override and add the settings file when it lands as part of broader runtime-leverage work)

### Codex parity

pm-critic is Claude-native. The intent (adversarial review of PM artifacts) is delivered to Codex users through `codex:codex-rescue` with a documented prompt template. Reference: `docs/guides/adversarial-review.md` documents both invocation paths.

### Out of scope for v2.15.0

- pm-skill-auditor, pm-release-conductor, and others (deferred to v2.15.1)
- Family-specific steward agents (Tier 2; likely fold into pm-critic per source doc)
- Cross-LLM handoff agent (Tier 2; spike before commit per source doc)
- User-settings file infrastructure (`.claude/pm-skills.local.md`) - design only, no implementation in v2.15.0
- A `runtime-components.md` full population (skeleton only; populated when slate grows)

### Acceptance criteria

1. pm-critic invokes correctly via all three patterns (proactive, slash, @-mention)
2. Findings report uses the documented severity scale (CRITICAL/IMPORTANT/MINOR/NIT)
3. Agent reads canonical contract docs at invocation time (verified by reading-list inspection of one real run)
4. CI passes: AGENTS.md sync validator recognizes the new component
5. Library samples demonstrate 3 distinct artifact types being reviewed
6. User-facing guide explains both Claude and Codex invocation paths

### Effort breakdown

- Agent system prompt: 0.5-1 day
- Companion slash command: 30 minutes
- 3 library samples (findings reports against real PM artifacts): 0.5-1 day
- Adversarial-review guide doc: 0.5 day
- AGENTS.md, README.md, runtime-components.md skeleton: 0.5 day
- Iteration on prompt against real artifacts: 0.5-1 day
- CI updates (AGENTS.md sync recognition of agents/ folder): 0.5 day

Total: 1-3 days as the source doc estimated, plus some doc/CI integration that bumps the realistic range to 2-4 days.

## v2.15.1 detailed plan: release-cycle slate

### Goal

Add the maintainer-facing utility sub-agents that directly improve the release process pm-critic already touched as an artifact reviewer.

### Deliverables

1. `agents/pm-release-conductor.md`
2. `agents/pm-changelog-curator.md`
3. `agents/pm-skill-auditor.md`
4. Companion slash commands: `/release`, `/draft-changelog`, `/audit-repo`
5. `docs/contributing/release-runbook.md` (the canonical runbook the conductor follows)
6. Updates to `docs/reference/runtime-components.md` to catalog the four sub-agents that now exist
7. CHANGELOG entry
8. Library samples for each (sample audit reports, sample CHANGELOG drafts, sample release runs)

### Composition design

pm-release-conductor is the parent. At its gates it invokes:

- pm-skill-auditor at the pre-tag-readiness gate
- pm-changelog-curator at the CHANGELOG-prep gate

These are Pattern 6 sub-agent chains. Per Insight 9 from the source doc, keep chain depth to 2 levels (conductor invokes auditor or curator, not chains of three or more).

### Codex parity

Each utility agent has a documented prompt template usable through `codex:codex-rescue`. The release runbook doc serves both: humans can follow it manually, Claude users delegate to the conductor, Codex users invoke through codex-rescue with the runbook as input.

### Acceptance criteria

1. Conductor walks the maintainer through a complete release flow with explicit gates
2. Auditor catches at least one cross-cutting issue (aggregate-counter drift class) on a test run
3. Changelog curator produces a draft that respects CLAUDE.md hygiene rules (no internal-notes references)
4. Conductor pauses for confirmation at every gate (verified by reading prompt)
5. All three utility agents are explicit-only (no proactive triggers per Insight 8)

### Effort breakdown

- pm-release-conductor: 3-4 days
- pm-changelog-curator: 1-2 days
- pm-skill-auditor: 2 days
- Companion slash commands: ~30 min each
- Release runbook doc: 1 day
- Library samples: 1 day
- Runtime-components.md expansion: 0.5 day

Total: 6-8 days.

## v2.16.0 detailed plan: workflow orchestration

### Goal

Ship the highest-strategic-value sub-agent: pm-workflow-orchestrator, scoped initially to one workflow (Feature Kickoff) to prove the pattern before generalizing.

### Deliverables

1. `agents/pm-workflow-orchestrator.md` (Feature Kickoff scope)
2. `commands/workflow-feature-kickoff.md` (or extend the existing if present)
3. Workflow doc update: `_workflows/feature-kickoff.md` now includes an "Active orchestration" section telling Claude to invoke the orchestrator
4. Library sample showing a complete Feature Kickoff run with state carried across all 5 steps
5. CHANGELOG entry

### Why Feature Kickoff first

The source doc recommends Feature Kickoff because it's the most concrete of the 9 workflows: problem statement, hypothesis, PRD, user stories. Each step has a clear input/output handoff. State carry-over is straightforward (each skill output feeds the next).

### Out of scope for v2.16.0

- Other workflows (defer until Feature Kickoff is proven)
- Per-step quality gates (pm-critic invoked at each step) - defer to v2.16.1
- Workflow customization layer (user can choose to skip steps) - defer

### Acceptance criteria

1. Orchestrator runs the full Feature Kickoff chain in one session
2. Each skill's output is carried into the next skill's input correctly
3. User can interrupt at any step and the orchestrator pauses
4. State recovers if the session is resumed (within-session memory works)

### Effort

3-5 days for Feature Kickoff scope; another 2-3 days per additional workflow if expanded.

### Pair: pm-sample-curator (conditional)

If `THREAD_PROFILES.md` (F-34) ships in v2.16.0 or earlier, pm-sample-curator becomes feasible. Otherwise defer. The curator depends on thread profiles for sample generation.

## Effort summary

| Cycle | Agents shipped | Effort |
|---|---|---|
| v2.14.x (optional) or v2.15.0 | pm-critic | 2-4 days |
| v2.15.1 | pm-release-conductor, pm-changelog-curator, pm-skill-auditor | 6-8 days |
| v2.16.0 | pm-workflow-orchestrator (Feature Kickoff), pm-sample-curator (if F-34) | 3-8 days |
| v2.16.x or v2.17.0 (opportunistic) | pm-frontmatter-doctor, pm-cross-llm-handoff | 2-5 days |
| **Total full slate** | **7 agents** | **14-25 days** |

Compared to sprint-skills v0.1.0 estimate of 30-45 days, this slate is roughly half the effort. Compared to the broader runtime-leverage work in `agent-component-usage_2026-04-18.md` (which spans hooks, MCP, settings), sub-agents are the cheapest entry point.

## Dependencies and prerequisites

### Hard prerequisites

- pm-critic v2.15.0: none. Single file, no companion infrastructure needed.
- pm-release-conductor v2.15.1: none beyond pm-critic's existence (conductor invokes pm-critic at quality gates).
- pm-skill-auditor v2.15.1: existing validators (frontmatter, AGENTS.md sync, family contract, command path). All currently shipped.
- pm-changelog-curator v2.15.1: existing CHANGELOG conventions in CLAUDE.md. Currently shipped.
- pm-workflow-orchestrator v2.16.0: existing workflow docs in `_workflows/`. Currently shipped.
- pm-sample-curator v2.16.0: F-34 THREAD_PROFILES.md must ship first.

### Soft prerequisites (recommended but not blocking)

- User-settings infrastructure (`.claude/pm-skills.local.md`): enables proactive-trigger opt-outs for pm-critic. If not present, document the intent and ship the override path when settings work lands.
- Hook infrastructure: enables event-driven sub-agent triggers (Pattern 8). Not blocking for any v2.15.x agent; relevant for v2.17.0+ designs.
- pm-skills-mcp unfreeze (M-22): enables Pattern 4.6 (sub-agent + MCP). Not blocking; deferred per current decision.

### Conventions that get codified by this slate

- Wrapper slash command discipline (Insight 7): ship the slash command alongside every sub-agent
- Two-rubric distinction (Insight 10): strategic agents may be proactive, utility agents are explicit-only
- Sub-agent chain depth limit (Insight 9): two levels of chaining max
- Referential system prompts (Insight 1 + drift risk in source doc): sub-agents read canonical docs at invocation time, not at definition time

## Risks

1. **Sub-agent proliferation.** Source doc warned. Mitigation: each cycle is a decision gate, not a pre-committed slate. Ship pm-critic, observe, then commit to v2.15.1.
2. **Auto-invocation noise.** pm-critic's proactive trigger could fire too often. Mitigation: document the off-switch from day one; iterate the trigger pattern based on 2 weeks of real use.
3. **Drift between sub-agent and standards docs.** Mitigation already designed in: referential system prompts read canonical docs at invocation time.
4. **Codex-side gap.** Mitigation: every sub-agent ships with a documented `codex:codex-rescue` prompt template equivalent. Same dual-path discipline as Meeting Skills Family CI.
5. **Plugin sub-agent self-restriction.** Sub-agents cannot self-define hooks, mcpServers, or permissionMode. Mitigation: design within the ceiling; document the user-copy escape hatch for power users.
6. **Competing with v2.14.x scope.** Starlight migration is the dominant v2.14 scope. Mitigation: defer sub-agent work to v2.15.0 unless v2.14.x ships early and has clean back-half capacity.

## Open decision points (for maintainer)

1. **Cycle assignment for pm-critic.** v2.14.x late (if migration ships early) or v2.15.0 (default)?
2. **Agents directory location.** Top-level `agents/` (matches Claude Code docs) or namespaced `agents/pm-skills/` (cleaner if directory grows past 6)?
3. **Co-shipping pattern for v2.15.1.** Ship all three (release-conductor + changelog-curator + skill-auditor) in one cycle, or split into v2.15.1 (conductor + curator) and v2.15.2 (auditor)?
4. **Family-steward decision.** Wait until a second family ships (recommended in source doc) or design it into pm-critic from day one as a `family:` mode?
5. **User-settings infrastructure timing.** Design `.claude/pm-skills.local.md` for v2.15.0 or defer to v2.16.0 once sub-agents prove the need is real?
6. **AGENTS.md scope question.** Should AGENTS.md (which currently catalogs skills) be extended to catalog sub-agents too, or should sub-agents live in a new `docs/reference/runtime-components.md`? Recommendation: runtime-components.md.

## What this plan does NOT cover

- Comparison with sprint-skills work (covered in the chat exchange that prompted this plan)
- Detailed system-prompt drafts for each agent (covered in the source doc's "Concrete prompt scope" snippets; will be authored at implementation time)
- v2.15.0 release plan promotion (this stays in `_working/` until a maintainer commits to a specific cycle)
- The broader runtime-leverage roadmap (hooks, MCP, settings) covered in `agent-component-usage_2026-04-18.md`
