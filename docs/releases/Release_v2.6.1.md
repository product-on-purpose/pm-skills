# PM-Skills v2.6.1 Release Notes

Date: 2026-03-04  
Status: Released (tag `v2.6.1` published)

## Summary

`v2.6.1` is a recovery-and-packaging patch release for `pm-skills`.

This lane restores and normalizes the sample-output library, captures coverage metadata in tracked release-governance artifacts, and fixes release packaging so sample outputs are actually included in shipped ZIP artifacts.

## Scope

In scope:
1. Sample library path and naming normalization
2. Sample-library standards and release-coverage metadata alignment
3. Release packaging inclusion checks for `library/skill-output-samples/`
4. Release metadata roll-forward in README/CHANGELOG

Out of scope:
1. New PM skills, slash commands, or workflow behavior changes
2. `pm-skills-mcp` deployment changes

## Added

1. Release note artifact: `docs/releases/Release_v2.6.1.md`

## Changed

1. Canonical sample-library path is now `library/skill-output-samples/`.
2. Sample standards doc is now `library/skill-output-samples/SAMPLE_CREATION.md`.
3. Sample README standards links updated to `SAMPLE_CREATION.md`.
4. Coverage manifest is tracked at `docs/internal/releases/v2.6.1/skill-output-samples_manifest.v2.6.1.json`.
5. `scripts/build-release.sh` now stages `library/` (including `library/skill-output-samples/`) and fails if canonical sample files are missing from stage.
6. `scripts/build-release.ps1` now stages `library/` (including `library/skill-output-samples/`) and fails if canonical sample files are missing from stage.
7. `.github/workflows/release.yml` generated release notes now explicitly list sample-library inclusion.
8. `README.md` and `CHANGELOG.md` updated for `v2.6.1` roll-forward.

## Validation

1. `pwsh -File scripts/validate-commands.ps1`
2. `pwsh -File scripts/lint-skills-frontmatter.ps1`
3. `pwsh -File scripts/build-release.ps1 -Version 2.6.1`
4. Verify ZIP contains `library/skill-output-samples/` sample files and `README_SAMPLES.md`
5. Verify `README_SAMPLES.md` links resolve and tracked manifest paths exist

## Canonical References

1. `CHANGELOG.md`
2. `README.md`
3. `docs/releases/Release_v2.6.1.md`
4. `.github/workflows/release.yml`
5. `scripts/build-release.sh`
6. `scripts/build-release.ps1`
7. `library/skill-output-samples/README_SAMPLES.md`
8. `library/skill-output-samples/SAMPLE_CREATION.md`
9. `docs/internal/releases/v2.6.1/README.md`
10. `docs/internal/releases/v2.6.1/skill-output-samples_manifest.v2.6.1.json`
