# PM-Skills v2.4.3 Release Notes

Date: 2026-02-16
Status: Shipped

## Big Idea

v2.4.3 is a documentation/tag-alignment patch so the latest tagged artifact includes post-v2.4.2 release-link updates.

## Published Artifacts

- GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.3`

## What Was Delivered

1. Latest stable release pointers rolled to `v2.4.3` in `README.md`.
2. Changelog updated with a dedicated `2.4.3` entry for traceable patch history.
3. Release docs now include explicit published-artifact links in tagged artifacts.

## Validation Performed

- Cross-repo sync guardrail remains aligned in block mode (`validate-mcp-sync` pass in paired `pm-skills-mcp` release cut).
- No PM skill inventory drift introduced.

## What This Means

- Consumers reading release docs from the latest tag now see complete published-artifact references.
- No behavior or contract differences from `v2.4.2`.

## Non-Goals for v2.4.3

- No new PM skills.
- No output/config contract behavior changes.
