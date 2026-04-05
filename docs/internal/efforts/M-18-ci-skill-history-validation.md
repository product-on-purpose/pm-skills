# [M-18] CI: Skill History and Manifest Validation
Status: Shipped (v2.8.0)
Release: v2.8.0
Phase: 1 (parallel with F-10 SKILL.md — no content dependency)
Issue: TBD
Agent: Codex / GPT-5.4

## Scope

Add two new advisory CI validation scripts that support the skill versioning governance introduced alongside v2.8.0:

1. **HISTORY.md consistency** — when a skill has a HISTORY.md, verify it includes an entry matching the current SKILL.md frontmatter `version`
2. **skills-manifest.yaml validity** — when a release folder has a `skills-manifest.yaml`, verify that listed skill names exist in `skills/` and listed versions match frontmatter

Both are advisory (`continue-on-error: true`) initially. Can be promoted to blocking once adoption is widespread.

## Key Decisions

- Follow existing `.sh` + `.ps1` + `.md` script convention (per M-12 pattern)
- Advisory, not blocking — the HISTORY.md convention is opt-in until a skill iterates
- Added to `.github/workflows/validation.yml` alongside existing validators
- Scope is limited to format/consistency checks, not content quality

## Scripts

### `scripts/validate-skill-history.sh` / `.ps1`

For each `skills/*/HISTORY.md`:
- Parse the summary table for version entries
- Read the skill's SKILL.md frontmatter `version` field
- Error if HISTORY.md exists but has no entry for the current version
- Warn if version sections are missing for table entries

### `scripts/validate-skills-manifest.sh` / `.ps1`

For each `docs/internal/release-plans/*/skills-manifest.yaml`:
- Parse skill entries
- Verify each `name` corresponds to a directory in `skills/`
- For the latest release only: verify each `version` matches current SKILL.md frontmatter
- Warn on any mismatch

## Artifacts Produced

- `scripts/validate-skill-history.sh`
- `scripts/validate-skill-history.ps1`
- `scripts/validate-skill-history.md`
- `scripts/validate-skills-manifest.sh`
- `scripts/validate-skills-manifest.ps1`
- `scripts/validate-skills-manifest.md`
- Updated `.github/workflows/validation.yml`

## Dependencies

- `docs/internal/skill-versioning.md` — defines the HISTORY.md and skills-manifest.yaml contracts
- M-12 (#112) — establishes the script convention these follow

## PRs

- TBD
