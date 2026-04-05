# [M-16] Exclude docs/internal from Release ZIP
Status: Shipped (v2.7.0)
Release: v2.7.0
Issue: #123
Agent: Codex 5.4

## Scope

Adjust release packaging so published pm-skills ZIPs exclude `docs/internal/**` while continuing to ship public docs. Keep internal governance material tracked in-repo, but stop distributing it to end users in release artifacts.

## Key Decisions

- Fix this in packaging, not by moving or renaming `docs/internal/`.
- Keep `docs/internal/` tracked for maintainers; exclude it only from distributed artifacts.
- Preserve public documentation surfaces in the ZIP, including `docs/releases/**` and user-facing guides/reference docs.
- Land before the final `v2.7.0` tag so internal builder/release-governance artifacts do not leak into the release bundle.

## Artifacts Produced

- Updated `scripts/build-release.sh`
- Updated `scripts/build-release.ps1`
- Any matching release workflow or release-governance doc adjustments needed to reflect the public-doc packaging boundary

## Verification

- `bash scripts/build-release.sh 9.9.9-m16-green-bash`
- `pwsh -File scripts/build-release.ps1 -Version 9.9.9-m16-green-ps1`
- Verified staged artifacts and ZIP contents exclude `docs/internal/**` and retain public docs including `docs/releases/**`

## PRs

- TBD
