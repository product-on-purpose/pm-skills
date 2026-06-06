# [M-14] Release Automation Enhancement
Status: Planned
Milestone: TBD
Issue: #116
Agent: Codex 5.4

## Scope

Extend the existing release workflow (`.github/workflows/release.yml`) with tag-vs-plugin.json version validation, improved release notes generation, and automated MCP sync dispatch to pm-skills-mcp. Follows existing `.sh + .ps1 + .md` script convention.

## Key Decisions

- Enhance existing `release.yml`, not replace - tag-triggered release packaging and GitHub Release creation already work.
- Manual tag push + enhancement chosen over Release Please (simpler, matches current flow).
- MCP sync dispatch needs PAT secret for cross-repo workflow dispatch (human decision pending).
- `plugin.json` located at `.claude-plugin/plugin.json`.

## Artifacts Produced

- `scripts/validate-version-match.sh` (+ `.ps1` + `.md`)
- Enhanced release notes generation
- Updated `.github/workflows/release.yml`
- Receiving workflow in pm-skills-mcp (if access available)

## PRs

- TBD
