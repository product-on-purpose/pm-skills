# validate-skill-history.sh / validate-skill-history.ps1

## Purpose

Validate opt-in `skills/*/HISTORY.md` files against the current skill contract version in `SKILL.md`.

## Usage

```bash
./scripts/validate-skill-history.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-skill-history.ps1
```

## What It Checks

For each `skills/*/HISTORY.md` that exists:

1. Reads the sibling `SKILL.md` frontmatter `version`.
2. Parses version entries from the HISTORY summary table.
3. Fails if the current skill version is missing from that table.
4. Warns if a summary-table version has no matching `## X.Y.Z` section below.

`HISTORY.md` remains opt-in. If no skill history files exist, the scripts exit cleanly without reporting a failure.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | All existing `HISTORY.md` files include the current skill version, or only warning-only section gaps were found |
| `1` | One or more history files are missing the current version entry, or required sibling metadata could not be read |

## Example Output

```text
✓ skills/foundation-persona/HISTORY.md : current version 2.5.0 found in the summary table
✗ skills/foundation-persona/HISTORY.md : summary table version 2.0.0 has no corresponding '## 2.0.0' section (warning only)
✗ skills/deliver-prd/HISTORY.md : current version 2.0.0 is missing from the summary table
```

## When to Use

- After bumping a skill `version` in `SKILL.md`
- After adding or editing a skill `HISTORY.md`
- During release prep to catch missing history bookkeeping
- In CI as an advisory governance check

## Safety

- Read-only — does not modify files
- Inspects only `skills/*/SKILL.md` and `skills/*/HISTORY.md`
