# [M-12] CI Validation Enhancement
Status: Shipped (v2.7.0)
Release: v2.7.0
Issue: #112
Agent: Codex 5.4

## Scope

Extend the existing CI validation pipeline (`lint-skills-frontmatter.sh`, `validate-commands.sh`, `validation.yml`) with AGENTS.md consistency checking, MCP impact advisory, and enhanced linter rules (description length, template structure). Follows existing `.sh + .ps1 + .md` script convention.

## Key Decisions

- Extend existing scripts, not replace — existing CI already covers ~70% of validation needs.
- Follow `.sh + .ps1 + .md` convention (no `.js` scripts).
- AGENTS.md check is blocking; MCP impact advisory is non-blocking.

## Artifacts Produced

- `scripts/validate-agents-md.sh` (+ `.ps1` + `.md`)
- `scripts/check-mcp-impact.sh` (+ `.ps1` + `.md`)
- Extended `scripts/lint-skills-frontmatter.sh` (+ `.ps1`)
- Updated `.github/workflows/validation.yml`

## PRs

- TBD
