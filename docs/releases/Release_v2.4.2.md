# PM-Skills v2.4.2 Release Notes

Date: 2026-02-16
Status: Shipped

## Summary

v2.4.2 is a governance-hygiene patch that clarifies canonical tracked release artifacts versus local working notes, while preserving v2.4 contract-lock behavior.

## Published Artifacts

- GitHub release: [v2.4.2](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2)

## What Was Delivered

1. **Delivery-plan policy** — canonical governance docs organized into a tracked `docs/internal/delivery-plan/` structure.
2. **v2.5 kickoff artifacts** — decision records for the foundation phase and persona skill scope added as tracked docs, establishing continuity for the next release.
3. **Artifact cleanup** — legacy internal planning docs (repo-submission, PR references) archived out of tracked files.

## Validation Performed

- Cross-repo sync guardrail passed in block mode.
- No PM skill inventory drift introduced.

## What This Means

- Internal governance docs are now cleanly organized in tracked locations.
- Local working notes remain in untracked scratch space.
- v2.5 planning has explicit tracked kickoff artifacts.

## Non-Goals for v2.4.2

- No new PM skills shipped.
- No output/config contract behavior changes beyond v2.4.0 baseline.
