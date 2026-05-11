---
title: Validate MCP Sync
description: How to validate that the pm-skills-mcp companion server is in sync with the file-based pm-skills repo. Covers the validate-mcp-sync.yml workflow, drift detection, and maintenance-mode posture.
---

:::caution[Reduced relevance under MCP maintenance mode (effective 2026-05-04)]
The `pm-skills-mcp` companion server is in the v2.9.x maintenance line (latest v2.9.3 as of 2026-05-05) with the catalog frozen at the v2.9.2 build. New skills added to this `pm-skills` library are NOT embedded into the MCP server. The `validate-mcp-sync` guardrail therefore reports drift by design (intentional gap), not regression.

The workflow remains valid for: detecting drift in PRs that touch the embedded-by-v2.9.2 skill set; verifying the pinned source/contract metadata; running advisory CI on the pm-skills-mcp side. It is reduced in relevance for: detecting drift on new skills added after the v2.9.2 build (those will always show as drift).

See [MCP Integration](mcp-integration.md) for the canonical maintenance-mode status.
:::

This guide explains the `validate-mcp-sync` guardrail that checks drift between `pm-skills` and `pm-skills-mcp`.

## Purpose

`validate-mcp-sync` is a validation-only check. It compares skill inventory across repos and checks pinned source/contract metadata alignment.

It has two modes:
- `observe` (default since v2.14.x V9): reports mismatch but does not fail CI.
- `block`: reports mismatch and fails CI.

The `observe` default reflects the MCP maintenance-mode posture (effective 2026-05-04): drift is intentional, not a regression, so CI surfaces drift for visibility without blocking unrelated work. The validator additionally honors a `maintenance: true` flag in `pm-skills-mcp/pm-skills-source.json`: when set, drift is downgraded to advisory output and the run remains green even under `block` mode. To re-enable strict blocking (for an MCP catalog refresh or maintenance-mode exit), remove the `maintenance` flag from `pm-skills-source.json` and dispatch the workflow with `mode: block`.

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
5. Validate `pm-skills-mcp/pm-skills-source.json` pin and contract markers

## Script

File: `.github/scripts/validate-mcp-sync.js`

Environment variables:
- `PM_SKILLS_PATH` default: `.`
- `PM_SKILLS_MCP_PATH` default: `./pm-skills-mcp`
- `VALIDATE_MCP_SYNC_MODE` default: `observe` in both script and workflow. Pass `mode: block` via `workflow_dispatch` to override.

The script checks:
1. Skills present in `pm-skills` but missing in `pm-skills-mcp`
2. Skills present in `pm-skills-mcp` but removed from `pm-skills`
3. Presence and validity of `pm-skills-mcp/pm-skills-source.json`
4. `pmSkillsVersion`/`pmSkillsRef` alignment and parity with latest released `pm-skills` version
5. `outputContractVersion` and `configContractVersion` parity with pinned `pmSkillsVersion`
6. Related warning for missing `commands/*.md` files in `pm-skills`

## Manual Sync Checklist

When drift is reported:
1. In `pm-skills-mcp`, update `pm-skills-source.json` (`pmSkillsRef`, `pmSkillsVersion`, `outputContractVersion`, `configContractVersion`).
2. In `pm-skills-mcp`, run `npm run embed-skills`.
3. Update `pm-skills-mcp/README.md` skill tables/tool-count references if needed.
4. Update `pm-skills-mcp/CHANGELOG.md` under `[Unreleased]`.
5. Update `pm-skills/README.md` tables where needed.
6. Add missing `pm-skills/commands/{skill}.md` files if applicable.
7. Commit and push both repos.

## Mode History

- `v2.3.0`: switched from `observe` default to `block` default after `B-01` MCP alignment closure (legacy rollout).
- `v2.14.x V9` (2026-05-10): reverted to `observe` default after `pm-skills-mcp` entered maintenance mode (M-22, effective 2026-05-04). The catalog is frozen at the v2.9.2 build; drift on skills added after that build is intentional and the validator now surfaces it without blocking.
- `v2.14.x B` (2026-05-10): validator script reads the `maintenance: true` flag from `pm-skills-mcp/pm-skills-source.json` and downgrades drift to advisory output. This protects the `block` mode dispatch path from firing on maintenance-mode-expected drift while still being available for an intentional catalog refresh.
