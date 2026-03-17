# [M-10] Skill Sample Outputs Library
Status: Shipped
Milestone: v2.6.1
Issue: #TBD

## Scope

Add a tracked sample-output collection for all shipped skills at `library/skill-output-samples/`. Each skill gets exactly 3 canonical sample outputs demonstrating expected generation quality. Includes a manifest for coverage validation and a sample creation standards guide. Initially gated on v2.5.0 for coverage validation; final path normalization and release-packaging inclusion shipped in v2.6.1.

## Key Decisions

- Exactly 3 samples per shipped skill (D12 policy).
- Canonical location: `library/skill-output-samples/<skill-name>/`.
- Manifest validates coverage at release time.
- Sample creation standards documented in `library/skill-output-samples/SAMPLE_CREATION.md`.
- Release packaging (`build-release.sh`, `build-release.ps1`) includes sample-library content as of v2.6.1.

## Artifacts Produced

- `library/skill-output-samples/` -- sample outputs for all 25 skills
- `library/skill-output-samples/SAMPLE_CREATION.md` -- creation standards
- `docs/releases/Release_v2.6.1.md` -- release notes covering normalization

## PRs

- Shipped as direct commits to main across v2.5.0 and v2.6.1 release cycles.
