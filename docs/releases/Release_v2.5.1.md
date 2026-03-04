# PM-Skills v2.5.1 Release Notes

Date: 2026-03-04  
Status: Released (`v2.5.1` tag + GitHub release published)

## Summary

`v2.5.1` is a patch release for workspace naming consistency and release-lane hygiene.

## Changed

1. Canonicalized Claude continuity workspace to `AGENTS/claude/` and retired active `AGENTS/claude-opus*` paths.
2. Updated tracked `.claude` scaffolding templates so init/wrap flows emit `AGENTS/claude`.
3. Added clean-worktree release runbook:
   - `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`

## Impact

1. No PM skill behavior changes.
2. No output/config contract changes from `v2.5.0`.
3. Historical release artifacts remain preserved as historical records.

## Published Artifacts

1. GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.1`

## Canonical References

1. `CHANGELOG.md`
2. `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`
