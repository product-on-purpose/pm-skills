# Effort Briefs

Status: Active
Owner: Maintainers
Last updated: 2026-03-17

## Purpose

Tracked, durable summaries of feature and maintenance efforts. Each brief captures scope, key decisions, shipped artifacts, and links to the corresponding GitHub issue.

## Three-Layer Effort Tracking

| Layer | What | Where |
|-------|------|-------|
| GitHub Issue | Lifecycle (open/closed), label, milestone | github.com |
| Tracked brief | Scope, decisions, artifact links, PR links | `docs/internal/efforts/` (this directory) |
| Working space | Discovery, prep, drafts, chat transcripts | `_NOTES/efforts/` (local-only, gitignored) |

## Naming Convention

`{ID}-{short-name}.md`

Examples:
- `F-02-persona-skill.md`
- `M-10-skill-sample-outputs-library.md`

## Brief Template

```markdown
# [{ID}] {Name}
Status: Active | Shipped | Cancelled
Milestone: vX.Y.Z
Issue: #{number}
Agent: Claude Opus 4.6 | Codex 5.4 | Human

## Scope
One paragraph: what this effort delivers and why.

## Key Decisions
- Decision 1

## Artifacts Produced
- Path to shipped artifact

## PRs
- #{number} -- description
```

## Agent Assignment

Each effort is assigned to the best-fit execution model based on the work type:

| Agent | Best for | GitHub label |
|-------|----------|-------------|
| **Codex 5.4** | Well-specified scripting, batch operations, pattern-following, bounded autonomous tasks | `agent:codex` |
| **Claude Opus 4.6** | Design thinking, domain expertise, interactive iteration, novel content, writing | `agent:claude` |
| **Human** | Form submissions, access-gated actions, strategic decisions | `agent:human` |

**When assigning**: If the effort has a clear spec, existing patterns to follow, and minimal ambiguity → Codex. If it requires judgment, creativity, user collaboration, or PM domain knowledge → Claude.

**For Codex issues**: Add a "Codex Execution Context" comment with:
1. **Read these files first** - file paths to understand patterns
2. **Convention to follow** - explicit style/naming rules
3. **Constraints** - what NOT to do

## Operating Rules

1. Create a brief when an effort is first planned or discovered.
2. Update the brief when scope, decisions, or status change.
3. Include `Agent:` field in the header - apply matching `agent:*` label to the GitHub issue.
4. When an effort ships, set status to `Shipped` and close the GitHub issue.
5. Do not duplicate content from `_NOTES/` -- summarize and link instead.
6. Public-facing files (README, CHANGELOG) must not reference briefs in this directory; these are internal tracking artifacts.
