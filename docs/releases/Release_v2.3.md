# PM-Skills v2.3.0 Release Notes

Date: 2026-02-13  
Status: Shipped

## Big Idea

v2.3.0 finalized cross-repo alignment verification and activated blocking sync enforcement.  
This release completed the transition from observe-first drift detection to merge-blocking drift protection.

## What Was Delivered

1. Alignment closure completed:
- Evidence-driven closure workflow completed on pinned refs.
- Final closure state recorded as aligned.

2. Blocking enforcement activated:
- `.github/workflows/validate-mcp-sync.yml` now defaults to `block` mode.
- Manual `workflow_dispatch` override remains available (`mode=observe` or `mode=block`).

3. Documentation and compatibility updates:
- `docs/guides/validate-mcp-sync.md` updated for blocking-default behavior.
- `README.md` and `docs/reference/ecosystem.md` updated to current MCP compatibility language and tool counts.

## Validation Performed

- Cross-repo sync validation (`block` mode): pass (`24` skills in `pm-skills`, `24` in `pm-skills-mcp`).
- Ecosystem alignment verification on pinned refs:
  - `pm-skills`: `3f4408acc5a113fb0605a8f9be3c052eaeda581f`
  - `pm-skills-mcp`: `55f31a40babc2d98af1c221b21d0e1763ead4091`
- `pm-skills-mcp` test suite: pass (`76/76`).

## What This Means

- `v2.3.0` establishes blocking drift guardrails for cross-repo integrity.
- `v2.4.0` remains focused on output/config contract lock.
- `v2.5.0` remains focused on foundation and persona decision closure.

## Non-Goals for v2.3.0

- No new PM skills added.
- No output/config contract finalization.
- No foundation/persona decision closure.
