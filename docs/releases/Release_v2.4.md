# PM-Skills v2.4.0 Release Notes

Date: 2026-02-16
Status: Shipped

## Summary

v2.4.0 is the **contract-lock release** for output behavior and config behavior. It finalizes how skills produce outputs and how configuration is authored, discovered, and validated.

## What Was Delivered

### Output behavior contract
- Hybrid output defaults with intent guardrails.
- Collision safety matrix (`abort`, `overwrite`, `merge`, `new-file`) with safe non-interactive fallback.
- Path safety, target-selection, and required output metadata expectations locked down.

### Config contract
- YAML-only canonical authoring with one canonical internal model.
- Strict config discovery precedence across approved paths.
- Unknown/deprecated key policy: `warn` locally, strict `fail` in CI mode, one-version grace period.

### Ecosystem updates
- Expanded `validate-mcp-sync` checks to include `pm-skills-mcp` pin metadata and contract-version parity.
- Corrected MCP integration guide utility-tool inventory to 7 tools.
- Updated MCP compatibility references to direct version tracking (`pm-skills v2.4.x` <> `pm-skills-mcp v2.4.x`).

## Validation Performed

- Output behavior and config contract preconditions recorded PASS.
- Determinism gate evidence recorded PASS.
- Config validator confirms strict/warn behavior and expected failures for invalid fixtures.

## What This Means

- v2.4.0 is now the baseline contract for output behavior and config behavior.
- v2.5.0 focuses on the foundation persona skill and taxonomy expansion.

## Non-Goals for v2.4.0

- No new PM skills were added.
- No foundation/persona work was shipped in this release.
