---
title: Authoring Sub-Agents
description: Contributor guide for authoring pm-skills sub-agents. Covers directory layout, frontmatter convention, referential discipline, severity grammar (P0/P1/P2/P3), companion command pairing, chain authorization, and the cross-client dispatch skill pattern.
---

## Table of Contents

- [Prerequisites](#prerequisites)
- [File Structure](#file-structure)
- [Frontmatter Convention](#frontmatter-convention)
- [Referential Discipline](#referential-discipline)
- [Severity Grammar](#severity-grammar)
- [Companion Command Pairing](#companion-command-pairing)
- [Chain Composition (Advanced)](#chain-composition-advanced)
- [Dispatch Skill (for Cross-Client Access)](#dispatch-skill-for-cross-client-access)
- [Library Samples (3 per Sub-Agent)](#library-samples-3-per-sub-agent)
- [Behavioral Spec Doc](#behavioral-spec-doc)
- [Validation Checklist](#validation-checklist)
- [Related Documentation](#related-documentation)

## Prerequisites

Before authoring a new sub-agent:

- [ ] Read [`docs/concepts/sub-agents.md`](../concepts/sub-agents.md) for the component-class mental model
- [ ] Read [`docs/contributing/sub-agent-design-patterns.md`](./sub-agent-design-patterns.md) for the 4 invocation patterns + composition patterns
- [ ] Confirm your proposed sub-agent fits the "isolated context + action-taking" use case; if the work is content-production, a skill is the right fit
- [ ] Have a clear behavioral spec ready (audience, mission, refusal protocols, severity grammar - same shape as the 4 spec docs in `docs/internal/release-plans/v2.16.0/spec_pm-*.md`)

## File Structure

```
pm-skills/
+-- .claude-plugin/
|   +-- plugin.json                       # Declares "agents": ["./subagents/"] per D31
+-- subagents/
|   +-- _pairing.yaml                      # Sub-agent + companion command pairings
|   +-- _chain-permitted.yaml              # Allowlist for agents that may use Agent tool
|   +-- pm-your-new-agent.md               # NEW: your sub-agent definition
+-- commands/
|   +-- your-verb.md                       # NEW: companion slash command (verb-shaped)
+-- skills/
|   +-- utility-pm-your-new-agent/         # NEW: dispatch skill (conditional on cross-client support)
|       +-- SKILL.md
|       +-- references/
|           +-- TEMPLATE.md
|           +-- EXAMPLE.md
+-- library/
|   +-- sub-agent-samples/
|       +-- pm-your-new-agent/             # NEW: 3 thread-aligned samples
|           +-- sample_pm-your-new-agent_brainshelf_*.md
|           +-- sample_pm-your-new-agent_storevine_*.md
|           +-- sample_pm-your-new-agent_workbench_*.md
+-- docs/
|   +-- reference/
|   |   +-- runtime-components.md          # ADD: new row in sub-agents catalog
|   +-- guides/                            # (optional) per-agent user guide
|   +-- contributing/                      # (optional) per-agent contributor guide
+-- AGENTS.md                              # ADD: utility-pm-your-new-agent dispatch skill entry
```

The lowercase `subagents/` directory name (not the Claude Code default `agents/`) was chosen per master plan D31 to avoid Windows NTFS / macOS APFS case-insensitivity collision with the existing tracked `AGENTS/` directory at repo root. The path is declared via plugin.json's custom `agents` field.

## Frontmatter Convention

Required fields per Claude Code plugin spec:

```yaml
---
name: pm-your-new-agent
description: |
  Multi-line description that Claude Code's intent classifier matches on.
  Include "use proactively" if the agent should auto-fire (only for user-facing
  reviewers like pm-critic; explicit-only for utility agents).
  Be specific about what artifacts / contexts trigger invocation.
tools: Read, Grep, Glob
model: sonnet
memory: none
---
```

**Field discipline:**

- `name:` must match the filename (`subagents/pm-your-new-agent.md` -> `name: pm-your-new-agent`)
- `description:` is the intent-classifier match surface; write for discoverability
- `tools:` is a comma-separated scalar (D20). Common: `Read`, `Grep`, `Glob`, `Bash`, `Edit`, `Agent` (chain composition only)
- `model:` typically `sonnet`; use `opus` for high-reasoning critical paths if justified
- `memory:` default `none`; escalate to `project` only with 3+ runs of evidence

**Tools restriction:** if you include `Agent` in `tools:` (for chain composition), you MUST add your sub-agent name to `subagents/_chain-permitted.yaml` per master plan D21. Otherwise validate-agents-md fails CI with HARD FAIL.

## Referential Discipline

**Do not embed canonical standards content in the system prompt.** Per master plan D12, sub-agents read canonical contract docs at INVOCATION TIME, not at AUTHORING TIME.

Wrong (embeds standards content; drift risk):

```markdown
You are pm-critic. When reviewing OKR sets, apply these refusal protocols:
- Fabricated baselines must refuse
- Comp coupling must refuse
- Feature-delivery KRs must refuse
... [200 lines of embedded OKR refusal rules]
```

Right (referential):

```markdown
You are pm-critic. When reviewing OKR sets, read
`skills/foundation-okr-writer/SKILL.md` at invocation time for the
canonical refusal protocols. Apply those protocols.
```

The referential pattern means:

- Standards docs are the single source of truth
- Sub-agent goes stale only if it can no longer find the doc; never goes stale because it has out-of-sync embedded content
- New standards added to the canonical doc apply automatically without re-authoring the sub-agent

Phase 8 integration check verifies no embedded duplication.

## Severity Grammar

All sub-agents producing findings use **P0 / P1 / P2 / P3** uniformly (master plan D15):

| Severity | Meaning | Action expected |
|---|---|---|
| **P0** | Blocks ship. Will cause real-world harm if shipped as-is. | Must fix. |
| **P1** | Fix before next major review. Significant gap. | Fix before workflow stage advances. |
| **P2** | Consider. Quality opportunity. | Author judgment. |
| **P3** | Nit. Cosmetic or style. | Skip if time-constrained. |

Every finding MUST include a concrete fix suggestion. "This is unclear" is NOT a finding; "Rewrite as X to address Y" IS a finding.

## Companion Command Pairing

Per master plan D6, every sub-agent ships with a companion slash command in `commands/`. Convention:

- Sub-agent name: `pm-{role}` (e.g., `pm-critic`)
- Command name: verb-shaped (e.g., `/critic`, `/audit-repo`, `/draft-changelog`, `/release`)
- Declare the pairing in `subagents/_pairing.yaml`

Command body (`commands/your-verb.md`) follows the standard pm-skills command convention:

```markdown
---
description: One-line description of what the command does
argument-hint: "[optional argument shape]"
---

Use the `pm-{role}` sub-agent to {do the thing}.

If `$ARGUMENTS` contains a {specific input shape}, use that. Otherwise {fallback behavior}.

[Brief explanation of what the sub-agent does and where the canonical docs live]

Context from user: $ARGUMENTS
```

The command body MUST reference a `skills/[a-z0-9-]+/SKILL.md` path for `scripts/validate-commands.sh` to pass. Reference the dispatch skill path (`skills/utility-pm-{role}/SKILL.md`).

## Chain Composition (Advanced)

If your sub-agent needs to invoke another sub-agent (Pattern 3 from `docs/contributing/sub-agent-design-patterns.md`):

1. Include `Agent` in `tools:` frontmatter
2. Add your sub-agent name to `subagents/_chain-permitted.yaml`
3. Verify chain depth stays at 2 max (per D14): if your child can also chain, you would have a 3-level chain; remove `Agent` from the child's tools

The only chain-permitted sub-agent in v2.16.0 is `pm-release-conductor`. Adding a new chain-permitted agent is security-relevant and requires maintainer review.

## Dispatch Skill (for Cross-Client Access)

Per master plan D30, sub-agents are Claude Code plugin features. To deliver the same intent to non-Claude clients, ship a dispatch skill at `skills/utility-pm-{role}/`.

Dispatch skill SKILL.md structure (~50-100 lines):

```markdown
---
name: utility-pm-{role}
description: {one-line description; reference dispatch mechanism}
classification: utility
version: "1.0.0"
updated: 2026-MM-DD
license: Apache-2.0
metadata:
  category: {category}
  frameworks: [triple-diamond]
  author: product-on-purpose
---

# {Role} (Dispatch Skill)

[Conditional instructions for Claude Code vs other clients]

## Instructions

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-{role}` on the target with `$ARGUMENTS`. Return findings.

### If you are running in any other AI client

1. Read the canonical sub-agent definition at `subagents/pm-{role}.md`
2. Execute the system prompt body as your operating instructions
3. {agent-specific steps}
4. Return the layered output per master plan D26 (full findings + Status Summary + Status YAML)
```

Then `references/TEMPLATE.md` documents the output format and `references/EXAMPLE.md` shows a worked example on a specific non-Claude client.

## Library Samples (3 per Sub-Agent)

Per master plan SI5, sub-agents ship Tier 0 (one per sub-agent) for the v2.16 release, expanding to 3 thread-aligned samples per sub-agent in Phase 6 of subagents-integration-plan.

The 3 thread conventions:

- **Brainshelf:** consumer PKM app (e.g., reading-list, save-and-return)
- **Storevine:** B2B campaign analytics (e.g., dashboards, OKRs, optimization)
- **Workbench:** internal platform tooling (e.g., DX, infra, platform-team meetings)

Sample shape: scenario + output + notes. Frontmatter includes `artifact:`, `thread:`, `agent_version:`, `repo_version:`, `status: sample`.

## Behavioral Spec Doc

Before authoring the sub-agent file itself, write a spec doc at `docs/internal/release-plans/v{X.Y.Z}/spec_pm-{role}.md` covering:

- Identity (name, classification, tier, audience, version, license)
- Mission (one paragraph; what the sub-agent does at its core)
- Behavior Contract (what it does; what it does NOT do; refusal protocols)
- Severity grammar (default P0/P1/P2/P3; deviations require justification)
- Inputs and Outputs (signature; output format)
- Invocation Patterns (which of the 4 patterns this sub-agent uses)
- Tool Surface (rationale for each tool)
- Memory and Lifetime
- Frontmatter (canonical for the sub-agent file)
- System Prompt Structure (referential outline)
- Composition with Other Components
- Cross-Client Compatibility (dispatch skill plan)
- Library Sample Coverage (3 thread-aligned)
- Acceptance Criteria (checklist for "ready to ship")
- Risks Specific to This Sub-Agent
- Out of Scope for This Release
- Cross-References

The 4 v2.16 spec docs at `docs/internal/release-plans/v2.16.0/spec_pm-{critic,skill-auditor,changelog-curator,release-conductor}.md` are canonical examples.

## Validation Checklist

Before merging a new sub-agent:

- [ ] `subagents/pm-{role}.md` exists with valid frontmatter
- [ ] `commands/{verb}.md` exists and references the dispatch skill path
- [ ] `subagents/_pairing.yaml` lists the new pair
- [ ] If `Agent` is in tools, `subagents/_chain-permitted.yaml` lists the new agent
- [ ] `skills/utility-pm-{role}/` exists with SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md (or rationale documented for skipping if intentional)
- [ ] `docs/reference/runtime-components.md` has the new row populated
- [ ] `AGENTS.md` has the new dispatch skill entry in Utility Skills section
- [ ] `library/sub-agent-samples/pm-{role}/` has at least 1 sample for ship-day (3 by end of cycle)
- [ ] Spec doc exists at `docs/internal/release-plans/v{version}/spec_pm-{role}.md`
- [ ] System prompt is referential (no embedded standards content)
- [ ] Severity grammar uses P0/P1/P2/P3 uniformly
- [ ] `validate-agents-md.sh` passes
- [ ] `validate-commands.sh` passes for the new command
- [ ] `lint-skills-frontmatter.sh` passes for the dispatch skill
- [ ] Em-dash sweep clean across all new files

## Related Documentation

- Sub-Agents concept: [`docs/concepts/sub-agents.md`](../concepts/sub-agents.md)
- Active Orchestration: [`docs/concepts/active-orchestration.md`](../concepts/active-orchestration.md)
- Sub-Agent Design Patterns: [`./sub-agent-design-patterns.md`](./sub-agent-design-patterns.md)
- Using Sub-Agents (user-facing): [`docs/guides/using-sub-agents.md`](../guides/using-sub-agents.md)
- Runtime Components Catalog: [`docs/reference/runtime-components.md`](../reference/runtime-components.md)
- v2.16.0 master plan + D-rules: [`docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/plan_v2.16.0.md)
- Canonical example sub-agents (4 in v2.16): [`subagents/`](https://github.com/product-on-purpose/pm-skills/tree/main/subagents)
- Canonical example spec docs: [`docs/internal/release-plans/v2.16.0/spec_pm-*.md`](https://github.com/product-on-purpose/pm-skills/tree/main/docs/internal/release-plans/v2.16.0)
