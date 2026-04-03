# validate-skills-manifest.sh / validate-skills-manifest.ps1

## Purpose

Validate release-plan `skills-manifest.yaml` files against the current skill library.

## Usage

```bash
./scripts/validate-skills-manifest.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skills-manifest.ps1
```

## What It Checks

For each `docs/internal/release-plans/*/skills-manifest.yaml`:

1. Parses each skill entry from the `skills:` list.
2. Verifies `name` maps to a directory in `skills/`.
3. Exempts `change_type: removed` entries from that directory-existence check.
4. Finds the latest release folder by semantic version.
5. For that latest manifest only, compares each listed `version` against the current `SKILL.md` frontmatter version.

Version mismatches in the latest manifest are warning-only so draft release plans can evolve without blocking CI. Missing skill directories still fail validation unless the entry is explicitly marked `removed`.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | All manifest skill names are valid, or only warning-only latest-version mismatches were found |
| `1` | One or more manifest entries point to non-existent skills, or required current skill metadata could not be read |

## Example Output

```text
✓ docs/internal/release-plans/v2.7.0/skills-manifest.yaml
✗ docs/internal/release-plans/v2.8.0/skills-manifest.yaml : skill 'utility-pm-skill-iterate' not found in skills/
✗ docs/internal/release-plans/v2.8.0/skills-manifest.yaml : skill 'utility-pm-skill-builder' lists version 1.1.0 but current SKILL.md is 1.0.0 (warning only)
```

## When to Use

- After editing a release-plan `skills-manifest.yaml`
- After adding, removing, or renaming skills referenced by a release plan
- During release prep to catch stale manifest entries
- In CI as an advisory governance check

## Safety

- Read-only — does not modify files
- Inspects only `docs/internal/release-plans/*/skills-manifest.yaml` and `skills/*/SKILL.md`
