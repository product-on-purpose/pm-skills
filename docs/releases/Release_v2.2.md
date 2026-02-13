# PM-Skills v2.2.0 Release Notes

Date: 2026-02-13  
Status: Shipped

## Big Idea

v2.2.0 is a guardrails-and-governance release.  
It does not add new PM skills. It improves trust, drift detection, and execution clarity across `pm-skills` and `pm-skills-mcp`.

## What Was Delivered

1. Observe-first cross-repo drift validation:
- `.github/workflows/validate-mcp-sync.yml`
- `.github/scripts/validate-mcp-sync.js`
- `docs/guides/validate-mcp-sync.md`

2. Planning persistence governance:
- `docs/internal/planning-persistence-policy.md`
- `docs/internal/planning-artifact-tier-map.md`
- `.gitignore` alignment to the policy

3. Canonical backlog governance:
- `docs/internal/backlog-canonical.md`
- supersession pointers in local backlog notes (`_NOTES/**`)

4. Release sequencing documentation:
- `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
- `docs/internal/release-planning/checklist_v2.2.0.md` to `docs/internal/release-planning/checklist_v2.5.0.md`

## What This Means

- `v2.2.0`: drift visibility and governance baseline
- `v2.3.0` target: MCP truth closure (`B-01`) and sync check flips to blocking mode
- `v2.4.0` target: output/config contract lock
- `v2.5.0` target: foundation/persona decision closure

## Validation Performed

- `validate-mcp-sync` script run in local observe and block modes (pass in local parity simulation).
- Existing repo checks passed:
  - `scripts/validate-commands.ps1`
  - `scripts/lint-skills-frontmatter.ps1`

## Non-Goals for v2.2.0

- No new PM skills added.
- No output/config contract finalization.
- No foundation/persona decision closure.
