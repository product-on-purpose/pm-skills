# PM-Skills v2.3.0 Release Notes

Date: 2026-02-13  
Status: Shipped

## Big Idea

v2.3.0 closes MCP alignment verification and activates blocking sync enforcement.  
This release finalizes the transition from observe-first drift detection to merge-blocking drift protection.

## What Was Delivered

1. B-01 alignment closure:
- Evidence-driven closure workflow completed in local delivery artifacts (`B-01a`/`B-01b`/`B-01c`).
- Final closure state: `closed-aligned` on pinned refs.

2. B-02 phase 2 enforcement:
- `.github/workflows/validate-mcp-sync.yml` now defaults to `block` mode.
- Manual `workflow_dispatch` override remains available (`mode=observe` or `mode=block`).

3. Documentation and compatibility truth updates:
- `docs/guides/validate-mcp-sync.md` updated for blocking-default behavior.
- `README.md` and `docs/reference/ecosystem.md` updated to current MCP compatibility language/tool counts.

## Validation Performed

- Cross-repo sync validation (`block` mode): pass (`24` skills in `pm-skills`, `24` in `pm-skills-mcp`).
- Ecosystem alignment verification pinned refs:
  - `pm-skills`: `3f4408acc5a113fb0605a8f9be3c052eaeda581f`
  - `pm-skills-mcp`: `55f31a40babc2d98af1c221b21d0e1763ead4091`
- `pm-skills-mcp` test suite: pass (`76/76`).

## What This Means

- `v2.3.0`: MCP alignment closure + blocking drift guardrail active.
- `v2.4.0` target remains: output/config contract lock (`B-03`, `B-04`).
- `v2.5.0` target remains: foundation/persona decision closure (`B-05`, `B-06`).

## Non-Goals for v2.3.0

- No new PM skills added.
- No output/config contract finalization.
- No foundation/persona decision closure.
