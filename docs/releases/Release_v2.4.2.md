# PM-Skills v2.4.2 Release Notes

Date: 2026-02-16
Status: Shipped

## Big Idea

v2.4.2 is a governance-hygiene patch that clarifies canonical tracked release artifacts versus local working notes, while preserving v2.4 contract-lock behavior.

## Published Artifacts

- GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2`

## What Was Delivered

1. Canonical delivery-plan policy and migration baseline added:
- `docs/internal/delivery-plan/README.md`
- `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`

2. v2.5 continuity kickoff artifacts for B-05/B-06 added in tracked docs:
- `docs/internal/delivery-plan/v2.5/B-05-foundation-phase-decision.md`
- `docs/internal/delivery-plan/v2.5/B-06-persona-q1-q7-decision-record.md`
- `docs/internal/delivery-plan/v2.5/B-05_B-06-closure-path.md`

3. Release-planning and release docs updated to reference tracked canonical delivery-plan artifacts.

4. Legacy internal repo-submission planning docs were moved out of tracked `docs/internal/` and into local `_NOTES/repo-submission/_archive`.

## Validation Performed

- Cross-repo sync guardrail remained aligned in block mode (`validate-mcp-sync` pass).
- No PM skill inventory drift introduced.

## What This Means

- `docs/internal/delivery-plan/` now carries minimal durable release-governance truth.
- `_NOTES/` remains local/high-churn working evidence and scratch context.
- v2.5 B-05/B-06 continuity now has explicit tracked kickoff artifacts.

## Non-Goals for v2.4.2

- No new PM skills shipped.
- No output/config contract behavior changes beyond v2.4.0 baseline.
