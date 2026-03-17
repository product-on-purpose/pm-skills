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

## Scope
One paragraph: what this effort delivers and why.

## Key Decisions
- Decision 1

## Artifacts Produced
- Path to shipped artifact

## PRs
- #{number} -- description
```

## Operating Rules

1. Create a brief when an effort is first planned or discovered.
2. Update the brief when scope, decisions, or status change.
3. When an effort ships, set status to `Shipped` and close the GitHub issue.
4. Do not duplicate content from `_NOTES/` -- summarize and link instead.
5. Public-facing files (README, CHANGELOG) must not reference briefs in this directory; these are internal tracking artifacts.
