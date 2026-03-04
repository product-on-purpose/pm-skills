# PM-Skills v2.5.2 Release Notes

Date: 2026-03-04  
Status: Released (`v2.5.2` tag + GitHub release published)

## Summary

`v2.5.2` is a documentation hygiene patch focused on public release communication quality.

## Changed

1. Rewrote release-facing documentation to remove internal planning shorthand and improve reader clarity.
2. Removed internal decision-ID style references from public release notes and changelog entries where they were not meaningful to end users.
3. Removed references to local-only working-note paths from public release artifacts.
4. Refreshed historical release-note language for readability while preserving historical intent and timeline.

## Impact

1. No PM skill behavior changes.
2. No command, template, or workflow behavior changes.
3. No output/config contract changes from `v2.5.0`.
4. Public release documentation is now more user-focused and easier to read without internal context.

## Validation

1. Public-doc drift scan across `README.md`, `CHANGELOG.md`, and `docs/releases/*.md` confirms no internal decision-ID shorthand remains.
2. Public-doc scan confirms no local working-note path references remain in release-facing docs.

## Published Artifacts

1. GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.2`

## Canonical References

1. `README.md`
2. `CHANGELOG.md`
3. `docs/releases/Release_v2.5.2.md`
