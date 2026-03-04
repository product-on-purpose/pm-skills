# PM-Skills v2.2.0 Release Notes

Date: 2026-02-13
Status: Shipped

## Summary

v2.2.0 is a guardrails-and-governance release. It does not add new PM skills. It improves trust, drift detection, and execution clarity across `pm-skills` and `pm-skills-mcp`.

## What Was Delivered

### Cross-repo drift validation (observe mode)
- `.github/workflows/validate-mcp-sync.yml` — CI workflow for detecting skill inventory drift between repos.
- `.github/scripts/validate-mcp-sync.js` — validation script (no external dependencies).
- `docs/guides/validate-mcp-sync.md` — usage guide for contributors and maintainers.

### Planning persistence governance
- Three-tier artifact classification policy (tracked decisions, local working notes, scratch).
- `.gitignore` alignment to enforce the policy.

### Canonical backlog governance
- Single-source backlog reference document with supersession pointers.

### Release sequencing documentation
- Execution plan covering the v2.2 through v2.5 release sequence.
- Per-release checklists for gate tracking.

## What This Means

- v2.2.0 establishes drift visibility and governance baselines.
- v2.3.0 target: MCP alignment verification and sync check set to blocking mode.
- v2.4.0 target: output and config contract finalization.
- v2.5.0 target: foundation persona skill and taxonomy expansion.

## Validation Performed

- `validate-mcp-sync` script run in local observe and block modes (pass).
- Existing repo checks passed: `validate-commands.ps1`, `lint-skills-frontmatter.ps1`.

## Non-Goals for v2.2.0

- No new PM skills added.
- No output/config contract finalization.
- No foundation/persona work.
