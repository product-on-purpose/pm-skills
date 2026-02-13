# validate-mcp-sync Guide

This guide explains the `validate-mcp-sync` guardrail that checks drift between `pm-skills` and `pm-skills-mcp`.

## Purpose

`validate-mcp-sync` is a validation-only check. It compares skill inventory across repos and reports mismatches with a manual sync checklist.

It has two modes:
- `observe` (default): reports mismatch but does not fail CI.
- `block`: reports mismatch and fails CI.

## Workflow

File: `.github/workflows/validate-mcp-sync.yml`

Trigger conditions:
- Pull requests that touch `skills/**` or `commands/**`
- Pushes to `main` that touch `skills/**` or `commands/**`
- Manual run via `workflow_dispatch`

Workflow behavior:
1. Checkout `pm-skills`
2. Checkout `pm-skills-mcp`
3. Run `pm-skills-mcp/scripts/embed-skills.js` using `pm-skills/skills` as source
4. Compare the resulting embedded skill set

## Script

File: `.github/scripts/validate-mcp-sync.js`

Environment variables:
- `PM_SKILLS_PATH` default: `.`
- `PM_SKILLS_MCP_PATH` default: `./pm-skills-mcp`
- `VALIDATE_MCP_SYNC_MODE` default: `observe`

The script checks:
1. Skills present in `pm-skills` but missing in `pm-skills-mcp`
2. Skills present in `pm-skills-mcp` but removed from `pm-skills`
3. Related warning for missing `commands/*.md` files in `pm-skills`

## Manual Sync Checklist

When drift is reported:
1. In `pm-skills-mcp`, run `npm run embed-skills`.
2. Update `pm-skills-mcp/README.md` skill tables and tool-count badge.
3. Update `pm-skills-mcp/CHANGELOG.md` under `[Unreleased] -> Added`.
4. Update `pm-skills/README.md` tables where needed.
5. Add missing `pm-skills/commands/{skill}.md` files if applicable.
6. Commit and push both repos.

## Release Sequencing

Recommended rollout:
1. Release with `observe` mode first.
2. After MCP alignment closure (`B-01`), switch to `block` mode.
