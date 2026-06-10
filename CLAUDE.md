# Claude Code Instructions

## Style Rules

### No em-dash characters

**NEVER use em-dash characters (`—`, U+2014) in any output.** This is a hard rule across all generated content: prose, code comments, file names, commit messages, plan docs, internal notes, memory files, or anything authored by Claude in this repo.

When you would reach for an em-dash, use one of:
- ` - ` (space-hyphen-space) for parenthetical pauses
- `:` (colon) when introducing a clarification or list
- `,` (comma) for softer pauses
- Sentence break (`. `) when the thought completes
- Restructure the sentence to remove the need entirely

This rule was codified 2026-04-13 and re-applied through multiple em-dash sweeps. Do not author em-dashes in the first place. The cost of authoring then sweeping is much higher than the cost of internalizing the rule.

## Documentation Rules

### Public vs Private Files

- Some internal working material is gitignored (for example `_NOTES/`, `_LOCAL/`), so external readers cannot access those paths. Note that `docs/internal/` is TRACKED, not gitignored: it is visible to anyone browsing the repo, so treat it as maintainer-facing rather than private.
- Never reference gitignored internal notes in public-facing files:
  - README.md
  - CHANGELOG.md
  - CONTRIBUTING.md
  - Any file a user cloning the repo would read
- If content from internal notes needs to be public, move it to a tracked location first
- Agent context files (`_agent-context/`) may reference internal notes for coordination

### CHANGELOG Best Practices

- Describe **what changed**, not where your working files are
- Reference public paths only (e.g., `skills/deliver-prd/`)
- Link to GitHub issues/PRs for context, not internal planning docs

### File References

When referencing files in documentation:
- Use relative paths from repo root
- Only reference tracked (non-gitignored) files
- If a file is gitignored, summarize its content instead of linking

## Project Context

- **66 PM skills on main** (v2.26.0 line): 30 phase skills (across 6 Triple Diamond phases) + 9 foundation skills + 12 utility skills + 15 tool-classification entries (Foundation Sprint family of 7 + Design Sprint family of 7 + tool-note-and-vote standalone).
- Follows [agentskills.io specification](https://agentskills.io/specification)
- Apache 2.0 licensed
- See `AGENTS.md` for skill discovery
