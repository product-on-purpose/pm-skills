# PM-Skills v2.4.2 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

v2.4.2 is a governance-hygiene patch that clarifies durable release artifacts in tracked docs while preserving the v2.4 behavior-contract baseline.

## Published Artifacts

- GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2`

## What Was Delivered

1. Canonical delivery-plan policy and migration baseline added:
- `docs/internal/delivery-plan/README.md`
- `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`

2. v2.5 continuity kickoff artifacts added in tracked docs:
- `docs/internal/delivery-plan/v2.5/`

3. Release-planning and release docs updated to reference tracked canonical delivery-plan artifacts.

4. Legacy repo-submission planning drafts were moved out of tracked `docs/internal/` into local working space (not part of published artifacts).

## Validation Performed

- Cross-repo sync guardrail remained aligned in block mode (`validate-mcp-sync` pass).
- No PM skill inventory drift introduced.

## What This Means

- `docs/internal/delivery-plan/` now holds durable release-governance records.
- v2.5 continuity has explicit kickoff artifacts in tracked documentation.
- No user-facing skill behavior changed from v2.4.0.

## Non-Goals for v2.4.2

- No new PM skills shipped.
- No output/config contract behavior changes beyond the v2.4.0 baseline.
