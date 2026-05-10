---
title: Release v2.6.0
sidebar:
  order: 14
---

Date: 2026-03-04  
Status: Release-ready (tag/publish pending explicit approval)

## Summary

`v2.6.0` is a plugin-packaging minor release for `pm-skills`.

This lane adds a Claude plugin manifest to shipped artifacts and hardens release validation so plugin metadata stays aligned with release tags.

## Scope

In scope:
1. Claude plugin packaging (`.claude-plugin/plugin.json`) in release artifacts
2. Plugin validation and release guardrails in CI
3. Documentation updates for plugin install and release metadata

Out of scope:
1. New PM skills, command behavior, or workflow behavior changes
2. `pm-skills-mcp` deployment changes

## Added

1. Claude plugin manifest: `.claude-plugin/plugin.json`
2. Plugin validation workflow: `.github/workflows/validate-plugin.yml`

## Changed

1. `scripts/build-release.sh` now stages `.claude-plugin/` and enforces staged plugin-manifest version parity with release version.
2. `scripts/build-release.ps1` now stages `.claude-plugin/` and enforces staged plugin-manifest version parity with release version.
3. `.github/workflows/release.yml` release-note template now includes plugin-manifest install guidance.
4. `README.md` includes:
   - `Install as Claude Code Plugin` section
   - explicit setup notes for GitHub Copilot and OpenCode
   - rolled-forward latest-release metadata references
5. `SECURITY.md` updated to production-ready reporting guidance (private advisory path + issue fallback).

## Validation

1. `pwsh -File scripts/validate-commands.ps1`
2. `pwsh -File scripts/lint-skills-frontmatter.ps1`
3. `VALIDATE_MCP_SYNC_MODE=observe PM_SKILLS_MCP_PATH=../pm-skills-mcp node .github/scripts/validate-mcp-sync.js`  
   - Expected for this lane: skill inventory stays aligned; pin/version drift remains until a future `pm-skills-mcp` release.
4. `pwsh -File scripts/build-release.ps1 -Version 2.6.0`
5. Verify ZIP contains `.claude-plugin/plugin.json` and manifest version is `2.6.0`

## Canonical References

1. `CHANGELOG.md`
2. `README.md`
3. `SECURITY.md`
4. `.github/workflows/release.yml`
5. `.github/workflows/validate-plugin.yml`
6. `scripts/build-release.sh`
7. `scripts/build-release.ps1`
