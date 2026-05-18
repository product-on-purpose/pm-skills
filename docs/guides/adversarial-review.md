---
title: Adversarial Review with pm-critic
description: How to invoke pm-critic, a Claude Code sub-agent that adversarially reviews PM artifacts (PRDs, OKR sets, personas, meeting recaps, etc.) and returns P0/P1/P2/P3 findings with concrete fix suggestions. Covers proactive vs explicit invocation, cross-client paths, and the opt-out path.
---

## Table of Contents

- [What Adversarial Review Is](#what-adversarial-review-is)
- [When to Invoke pm-critic](#when-to-invoke-pm-critic)
- [Severity Grading (P0 / P1 / P2 / P3)](#severity-grading-p0--p1--p2--p3)
- [Composition with Skills](#composition-with-skills)
- [Cross-Client Paths](#cross-client-paths)
- [Opt-Out Path](#opt-out-path)
- [Related Documentation](#related-documentation)

## What Adversarial Review Is

Adversarial review reads a PM artifact looking for **weaknesses, not wins**. It is the opposite of a self-review: rather than the author validating their own work, an adversarial reviewer stress-tests the artifact against the standards that produced it.

pm-skills has run the Phase 0 Adversarial Review Loop as a manual maintainer practice since v2.11.0 (the loop is codified in [`docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md)). v2.16.0 codifies the loop as a sub-agent so it runs automatically after PM-artifact-producing skills complete.

**Why adversarial framing matters.** A skill that self-reviews has a perverse incentive: the same context that produced the artifact judges whether the artifact is good. A separate sub-agent with a different system prompt (criticism, not authorship) breaks that incentive. The cost is one extra context window per artifact; the benefit is finding the issues that hand-off recipients would otherwise find later.

## When to Invoke pm-critic

pm-critic has four invocation paths.

### Path 1: Proactive (default, Claude Code)

Claude Code's intent classifier matches pm-critic's `description:` (which includes "use proactively after any PM-artifact-producing skill") and dispatches automatically. After you run `/deliver-prd`, `/foundation-okr-writer`, `/foundation-meeting-recap`, `/foundation-persona`, `/foundation-lean-canvas`, `/discover-interview-synthesis`, `/define-problem-statement`, `/define-hypothesis`, `/deliver-edge-cases`, `/deliver-user-stories`, `/deliver-acceptance-criteria`, `/iterate-retrospective`, `/iterate-lessons-log`, or any other Triple Diamond phase skill, pm-critic fires in a fresh context window, reads the artifact, consults the relevant standards docs, and returns findings.

This is the default behavior. You see the findings inline after the artifact production completes. No additional command needed.

### Path 2: Explicit slash command

```
/critic [optional artifact path]
```

Use `/critic` to:

- Review an existing artifact that wasn't produced this session (e.g., an old PRD)
- Re-review after revising an artifact (the proactive trigger only fires once per artifact production; re-reviews need an explicit invocation)
- Review an artifact produced by a tool other than a pm-skills skill (paste in a PRD draft and review it)

If `$ARGUMENTS` is empty, pm-critic reviews the most recently produced artifact in session context.

### Path 3: @-mention

```
@agent-pm-critic please review this PRD
```

Use @-mention when you want guaranteed invocation in a context where the intent classifier might not fire (e.g., a long-running session where the proactive trigger already fired but you want a second pass after edits).

### Path 4: Workflow-triggered (future, v2.17+)

Once `pm-workflow-orchestrator` ships in v2.17, workflow docs (`_workflows/feature-kickoff.md`, etc.) will explicitly call out pm-critic at quality-gate steps in a workflow chain. v2.12 workflows do not yet do this.

## Severity Grading (P0 / P1 / P2 / P3)

Every finding pm-critic produces carries a severity grade. The grammar is uniform across all pm-skills sub-agents (D15).

### P0: Blocks ship

The artifact has a defect that will cause real-world harm if shipped as-is. Must fix before next review pass.

**Example (PRD):**

> **F-01: Success metric is non-falsifiable**
>
> **Location:** Success Metrics section, line 47
> **Issue:** Metric reads "users will love the feature." No threshold, no measurement instrument, no time window.
> **Why it matters:** This is not a metric. It cannot be measured, cannot be falsified, cannot drive a "this feature succeeded vs. failed" decision after launch. Ships with no way to learn from.
> **Fix:** Rewrite as "7-day retention for users who used the feature in week 1 is >= 35% (baseline 28%, 2-point improvement target) measured via the existing user-events table." Add measurement instrument check before merging.

**Example (OKR set):**

> **F-01: Fabricated baseline**
>
> **Location:** Objective 2, Key Result 1, line 21
> **Issue:** KR reads "Increase weekly active users from 50K to 75K." There is no source cited for the 50K baseline, and the linked dashboard shows current WAU at 38K.
> **Fix:** Verify actual baseline against `analytics.weekly_active_users` table for the trailing 4 weeks. If the cited baseline is wrong, re-grade the KR's ambition. If the dashboard is wrong, fix the dashboard FIRST and re-run the OKR set against accurate data. Refuses to set targets on unverified baselines per `skills/foundation-okr-writer/SKILL.md` refusal protocols.

### P1: Fix before next major review

Significant gap that compromises utility. Fix before the artifact moves to the next workflow stage.

**Example (Meeting recap):**

> **F-04: Decision recorded without owner**
>
> **Location:** Topic 3, line 89
> **Issue:** "Decision: we will move ahead with vendor X" is recorded without an owner or due date.
> **Why it matters:** A decision without an owner cannot be tracked. Per `docs/reference/skill-families/meeting-skills-contract.md` (Meeting Skills Family rule M4), every decision in a recap has an owner.
> **Fix:** Add owner + due date inline: "**Decision** (owner: Jane Doe, due 2026-06-01): we will move ahead with vendor X."

**Example (Persona):**

> **F-02: Behavior contradicts stated motivation**
>
> **Location:** "Behaviors" section, line 34 vs. "Motivations" section, line 18
> **Issue:** Persona's stated motivation is "wants efficient workflows" but the behaviors section says "prefers to manually verify each step before continuing." These are not consistent without additional explanation (e.g., trust gap, prior-bad-experience, regulatory requirement).
> **Fix:** Add a bridging statement explaining the apparent contradiction (e.g., "Verification preference comes from a prior data-loss incident; trust grows over weeks of repeated correct behavior") OR revise one of the two sections to remove the contradiction.

### P2: Consider

Quality opportunity the author may accept or defer. Author judgment.

**Example (Lean canvas):**

> **F-06: Cost structure missing variable-cost element**
>
> **Location:** Cost Structure block
> **Issue:** Listed costs are all fixed (salaries, tooling). For a customer-acquisition-driven business model, variable acquisition cost (CAC) is typically present at this stage.
> **Why it matters:** Affects the unit-economics check downstream. If CAC is truly $0 (organic-only), call it out explicitly so the reader knows it's intentional.
> **Fix:** Add explicit "Variable: CAC = $0 (organic-only)" OR add the CAC figure if applicable.

### P3: Nit

Cosmetic or style issue with negligible substance impact. Skip if time-constrained.

**Example (PRD):**

> **F-09: Section header inconsistency**
>
> **Location:** "User Stories" vs "User stories" headers in the table of contents vs. body
> **Issue:** Capitalization inconsistent between TOC and section header.
> **Fix:** Use one form consistently.

### Every finding has a concrete fix

This is non-negotiable. "This is unclear" is NOT a finding. "Rewrite as X to address Y" IS a finding. If pm-critic returns a vague observation, ask it to be more specific or reject the output.

## Composition with Skills

The canonical pattern is the skill-revise-recheck loop.

```
1. /deliver-prd "auth feature"             # produces PRD draft
2. pm-critic auto-fires (proactive)        # produces findings
3. User reviews findings
   - If 0 P0/P1 findings: ship
   - If P0/P1 findings exist: revise
4. /deliver-prd <revised inputs>           # regenerates with fixes
5. /critic                                 # explicit re-review on revised artifact
6. Loop until P0/P1 cleared
```

The loop is intentional. pm-critic does NOT rewrite the artifact. The skill is the author; the critic is the reviewer. Keeping them separate preserves adversarial framing.

### What pm-critic does NOT do

- Does NOT rewrite the artifact (you revise with the producing skill)
- Does NOT validate (no "looks great" outputs)
- Does NOT lint frontmatter or count-consistency (that is `pm-skill-auditor`'s job)
- Does NOT enforce style (em-dash sweep is `pm-release-conductor` G0)
- Does NOT write to files (Read/Grep/Glob only)

If you want any of those, invoke the appropriate other component.

## Cross-Client Paths

Per master plan D11 (amended) + D30, sub-agents are a Claude Code plugin feature. Non-Claude clients get the same intent via dispatch skills.

### Native Claude Code (default)

If you are running Claude Code with the pm-skills plugin installed, pm-critic is available out of the box. No additional setup. The four invocation paths above all work.

### Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI)

The dispatch skill at `skills/utility-pm-critic/SKILL.md` provides the same intent on non-Claude clients. Invoke the skill:

```
/utility-pm-critic [optional path]
```

The dispatch skill detects it is running on a non-Claude client, reads `subagents/pm-critic.md` as its operating system prompt for the turn, executes the review inline, and returns findings in the same P0/P1/P2/P3 format. No native sub-agent infrastructure required.

Functional differences on non-Claude clients (acceptable per single-tool user assumption):

- **No proactive trigger.** The auto-fire after PM-artifact-producing skills is a Claude Code frontmatter feature. On non-Claude clients, invocation is explicit-only.
- **No `.claude/agents/` overrides.** The Claude Code per-user override directory has no portable equivalent. Edit the dispatch skill SKILL.md locally instead.

The dispatch mechanism was VALIDATED on Codex CLI 0.128.0 on 2026-05-17 (GATE B PASS for pm-critic dispatch; 7 findings produced against the canonical Brainshelf PRD sample matching the expected output shape). Evidence at [`docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md). Cursor, Windsurf, Copilot CLI, and Gemini CLI are untested but expected to work. If a specific client cannot reliably execute the inline pattern, fall back to the Codex-rescue path below or to reading `subagents/pm-critic.md` manually.

### Codex-rescue path (optional shortcut)

If you have BOTH Claude Code AND Codex CLI installed AND the `codex-rescue` plugin, you can route pm-critic intent through codex-rescue:

```
/codex:rescue "Run pm-critic adversarial review on docs/specs/my-prd.md"
```

This is a convenience shortcut for users with both tools. It is NOT a baseline assumption for cross-client compatibility. Codex-rescue requires both runtimes; the dispatch skill requires neither.

## Opt-Out Path

If pm-critic's proactive trigger is too noisy for your workflow:

### Option A: Severity floor (future, v2.17+)

Once `.claude/pm-skills.local.md` user-settings ships in v2.17, you will be able to configure:

```yaml
pm_critic_auto_invoke: false        # disable proactive trigger entirely
pm_critic_severity_floor: P1        # only show P0 + P1 findings, hide P2 + P3
pm_critic_skip_artifact_types: []   # exempt specific skills from proactive review
```

This is not available in v2.16.0.

### Option B: Local override (v2.16.0)

Copy the agent definition to your per-user Claude Code agent dir and edit:

```bash
mkdir -p ~/.claude/agents
cp subagents/pm-critic.md ~/.claude/agents/pm-critic.md
# Edit ~/.claude/agents/pm-critic.md to remove "use proactively after any..." from the description
```

Claude Code will use your local copy in preference to the plugin-supplied one. Updates to the plugin definition no longer reach you until you re-copy.

### Option C: Uninstall pm-critic specifically

Per Claude Code plugin convention, you can disable individual sub-agents. Refer to your Claude Code installation docs for the current procedure.

## Related Documentation

- Sub-agent definition: [`subagents/pm-critic.md`](https://github.com/product-on-purpose/pm-skills/blob/main/subagents/pm-critic.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-critic.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/spec_pm-critic.md)
- Runtime components catalog: [`docs/reference/runtime-components.md`](../reference/runtime-components.md)
- Dispatch skill (cross-client): `skills/utility-pm-critic/SKILL.md` (VALIDATED on Codex CLI 2026-05-17)
- Library samples: `library/sub-agent-samples/pm-critic/` (3 thread-aligned examples)
- Phase 0 Adversarial Review pattern (manual predecessor): [`docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md)
- Companion slash command: [`commands/critic.md`](https://github.com/product-on-purpose/pm-skills/blob/main/commands/critic.md)
