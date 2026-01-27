# Claude Code Instructions

## Documentation Rules

### Public vs Private Files

- Internal notes are gitignored — external readers cannot access those paths
- Never reference gitignored internal notes in public-facing files:
  - README.md
  - CHANGELOG.md
  - CONTRIBUTING.md
  - Any file a user cloning the repo would read
- If content from internal notes needs to be public, move it to a tracked location first
- Agent context files (`AGENTS/`) may reference internal notes for coordination

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

- **24 PM skills** across 6 Triple Diamond phases
- Follows [agentskills.io specification](https://agentskills.io/specification)
- Apache 2.0 licensed
- See `AGENTS.md` for skill discovery
