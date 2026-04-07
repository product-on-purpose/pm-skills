# [F-15] Ad-Hoc Skill Chaining
Status: Backlog
Milestone: TBD
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a lightweight tool that lets users chain skills together at runtime without creating a formal workflow file. Think of it as the difference between writing a shell script (workflow) and piping commands together ad-hoc (chaining).

## Problem

The current workflow system requires:
- A pre-authored `_workflows/*.md` file
- Formal structure (metadata, steps, checklists)
- Cross-cutting file updates (AGENTS.md, commands, docs)

This is appropriate for reusable, team-wide processes. But many skill chains are one-off or exploratory:
- "Run problem-statement then hypothesis for this idea"
- "I need a quick competitive-analysis followed by a solution-brief"
- "Chain these 4 skills and pass context between them"

Users shouldn't need to author a workflow file for ad-hoc sequences.

## How It Would Work

### Option A: `/chain` Command

```
/chain "problem-statement, hypothesis, prd" "Mobile checkout redesign"
```

The command:
1. Parses the skill list
2. Validates all skills exist
3. Runs each skill in sequence
4. Passes the output of each step as context to the next
5. Produces a combined artifact with clear section breaks

### Option B: Chain Skill

A `utility-skill-chain` skill that accepts:
- A list of skills to run
- Initial context/prompt
- Optional: handoff instructions between steps

```
Use the skill-chain skill to run: interview-synthesis → problem-statement → hypothesis
Input: "5 customer interview transcripts about payment friction"
```

### Option C: MCP Workflow Executor

For MCP users, a `pm_chain_skills` tool that accepts a skill array and runs them sequentially, returning combined output.

## Design Considerations

### Context Passing
The key challenge is **how output from skill N becomes input to skill N+1**. Options:
1. **Implicit** — The AI maintains conversation context; each skill naturally sees prior outputs
2. **Explicit** — The chain tool extracts key outputs and formats them as input for the next skill
3. **Hybrid** — Implicit context + a "handoff summary" injected between steps

Recommendation: **Implicit** for v1. The AI's conversation context already handles this well. Explicit handoff summaries can be added later.

### Relationship to Workflows

| Dimension | Workflows | Skill Chains |
|-----------|-----------|-------------|
| **Persistence** | Permanent file in `_workflows/` | Ephemeral (conversation only) |
| **Structure** | Rich (metadata, tips, checklists) | Minimal (just skill sequence) |
| **Audience** | Team/org (reusable) | Individual (one-off) |
| **Handoffs** | Authored guidance per step | Implicit via conversation context |
| **Discovery** | AGENTS.md, commands, docs site | None (ad-hoc) |
| **Promotion** | N/A (already a workflow) | "Promote to workflow" if reused |

The **promotion path** is key: if a user finds themselves running the same chain repeatedly, they should be able to promote it to a formal workflow (via F-14 Workflow Builder).

### Overlap with Existing Behavior

Users can already say "run problem-statement then hypothesis" in natural language and AI agents will do it. The chain tool adds:
1. **Explicit sequencing** — guaranteed order, no drift
2. **Validation** — checks skill names exist before starting
3. **Structure** — clear step markers in output
4. **Repeatability** — a defined chain is easier to re-run than a prose instruction

## Key Decisions (to resolve)

| Decision | Options | Leaning |
|----------|---------|---------|
| Implementation form | Command / Skill / Both | Command (`/chain`) — lowest friction |
| Context passing | Implicit / Explicit / Hybrid | Implicit for v1 |
| MCP support | Yes / Later | Later — ship file-based first |
| Promotion to workflow | Built-in / Separate | Built-in suggestion ("You've run this chain 3 times — create a workflow?") |
| Validation | Strict (fail on unknown skill) / Lenient (warn) | Strict — fail fast |

## Dependencies

- No hard dependencies (skills already exist)
- Nice-to-have: F-14 (workflow builder) for the promotion path

## Artifacts Produced

- `commands/chain.md` — slash command definition
- Optionally: `skills/utility-skill-chain/SKILL.md` if implemented as a skill

## Estimated Complexity

Low-Medium — the core logic is simple (validate + sequence). The context passing question is the main design challenge.

## Open Questions

1. **Should chains support branching?** E.g., "if experiment-results show negative, run pivot-decision; if positive, run launch-checklist." This is workflow territory — probably out of scope for v1.

2. **Should chains support parallelism?** E.g., "run competitive-analysis and stakeholder-summary in parallel, then opportunity-tree." Interesting but complex — defer.

3. **Should chains be saveable?** E.g., `/chain save "my-research-flow" interview-synthesis,jtbd-canvas,problem-statement`. This blurs the line with workflows — the promotion path (F-14) is cleaner.

## PRs

TBD
