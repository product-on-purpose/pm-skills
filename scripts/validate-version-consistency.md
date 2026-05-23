# validate-version-consistency.sh / validate-version-consistency.ps1

## Purpose

Ensure the repo's version-CLAIM surfaces all agree: `.claude-plugin/plugin.json`
and `marketplace.json` report the same version, and the README version badge plus
the At-a-Glance "Current version" row match it. Prevents drift between version
sources that would confuse the `/update-pm-skills` skill's version detection and
mislead users about which version they have installed. (v2.19.0, FU-9: the README
surfaces were folded in here because they are version *claims*; `check-version-references`
stays advisory for version *provenance* mentions, and the badge form `version-X.Y.Z`
is not matched by that script's `vX.Y.Z` regex anyway, so it would otherwise slip
every gate.)

## Usage

```bash
./scripts/validate-version-consistency.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-version-consistency.ps1
```

## What It Does

1. Reads the `version` field from `.claude-plugin/plugin.json` (the source of truth)
2. Reads the `plugins[0].version` field from `marketplace.json`; fails on mismatch
3. Reads the README version badge (`badge/version-X.Y.Z`) and the At-a-Glance "Current version" row; fails if either is present and does not match plugin.json
4. Reports pass (all surfaces agree) or fail with the offending value

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Versions match |
| `1` | Version mismatch, or a required file is missing |

## When to Use

- In CI on every push/PR (hard-fail . mismatches should never merge)
- Before tagging a release (version bump both files together)
- After editing either `plugin.json` or `marketplace.json`

## Example Output

```
PASS: Versions consistent (2.9.0)
```

```
FAIL: Version mismatch
  .claude-plugin/plugin.json:  2.9.0
  marketplace.json: 2.8.2

  Both files must report the same version.
```

## Prerequisites

- Node.js available in PATH (used for JSON parsing)

## Safety

Read-only. Does not modify any files.
