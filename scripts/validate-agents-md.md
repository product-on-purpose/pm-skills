# validate-agents-md.sh / validate-agents-md.ps1

## Purpose

Verify that `AGENTS.md` stays in sync with the actual skill library. This prevents new skills, renames, or removals from leaving the repository guide out of date.

## Usage

```bash
./scripts/validate-agents-md.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-agents-md.ps1
```

## What It Does

Compares the set of skill paths found in `skills/*/SKILL.md` with the set of skill paths referenced in `AGENTS.md`.

Checks performed:

1. Every skill directory has a matching `AGENTS.md` entry.
2. Every `AGENTS.md` skill path resolves to an existing `SKILL.md`.
3. No skill path appears more than once in `AGENTS.md`.

The script compares repo-relative skill paths such as `skills/deliver-prd/SKILL.md`. This matches the existing `AGENTS.md` convention, where the visible heading may be a short alias while the path points to the canonical skill directory.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | `AGENTS.md` matches the skill library |
| `1` | One or more sync issues were found |

## When to Use

- After adding, renaming, or deleting a skill directory
- After editing `AGENTS.md`
- In CI to block stale repo metadata from merging

## Example Output

```
[OK] AGENTS.md matches 25 skill paths
[FAIL] AGENTS.md : missing entry for skills/deliver-acceptance-criteria/SKILL.md
[FAIL] AGENTS.md : orphan entry skills/deliver-old-skill/SKILL.md
```

## Safety

- Read-only — does not modify files
- Inspects only `AGENTS.md` and `skills/`
