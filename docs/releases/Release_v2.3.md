# PM-Skills v2.3.0 Release Notes

Date: 2026-02-13
Status: Shipped

## Summary

v2.3.0 closes MCP alignment verification and activates blocking sync enforcement. This release finalizes the transition from observe-first drift detection to merge-blocking drift protection.

## What Was Delivered

### MCP alignment verified
- Evidence-driven alignment verification completed across both repositories.
- Final state: aligned and locked on pinned refs.

### Cross-repo sync guardrail upgraded to blocking
- `.github/workflows/validate-mcp-sync.yml` now defaults to `block` mode.
- Manual `workflow_dispatch` override remains available for observe-only runs.

### Documentation updates
- `docs/guides/validate-mcp-sync.md` updated for blocking-default behavior.
- `README.md` and `docs/reference/ecosystem.md` updated to current MCP compatibility language and tool counts.

## Validation Performed

- Cross-repo sync validation (`block` mode): pass (24 skills in `pm-skills`, 24 in `pm-skills-mcp`).
- `pm-skills-mcp` test suite: pass (76/76).

## What This Means

- v2.3.0: MCP alignment verified + blocking drift guardrail active.
- v2.4.0 target: output and config contract finalization.
- v2.5.0 target: foundation persona skill and taxonomy expansion.

## Non-Goals for v2.3.0

- No new PM skills added.
- No output/config contract finalization.
- No foundation/persona work.
