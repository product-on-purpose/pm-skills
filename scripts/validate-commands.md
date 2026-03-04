# validate-commands.sh / validate-commands.ps1

## Purpose

Verify that every command file in `commands/` references a valid skill and that all referenced skills have complete supporting files. This is the primary guardrail against broken command-to-skill links after renames or edits.

## Usage

```bash
./scripts/validate-commands.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-commands.ps1
```

## What It Does

For each `commands/*.md` file:

1. **Extracts skill paths** — scans the file content for patterns matching `skills/<name>/SKILL.md`.
2. **Checks the referenced SKILL.md exists** at the extracted path.
3. **Checks supporting files exist** — verifies `references/TEMPLATE.md` and `references/EXAMPLE.md` in the same skill directory.
4. **Reports results** per command:
   - Pass: `[OK] prd.md -> skills/deliver-prd/SKILL.md`
   - Fail: `[FAIL] prd.md : referenced SKILL missing (skills/deliver-prd/SKILL.md)`
5. **Handles multi-skill commands** — if a command references multiple skills (e.g., the kickoff workflow), all are checked.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | All commands validated successfully |
| `1` | One or more validation failures |

## When to Use

- **After editing or renaming** any command or skill directory.
- **Before tagging a release** — catches broken links before they ship.
- **In CI** — add as a lint step to prevent regressions.

## Example Output

```
[OK] prd.md -> skills/deliver-prd/SKILL.md
[OK] hypothesis.md -> skills/define-hypothesis/SKILL.md
[FAIL] kickoff.md : missing TEMPLATE.md in skills/deliver-prd/references/
[OK] retrospective.md -> skills/iterate-retrospective/SKILL.md
```

## Safety

- Read-only — does not modify any files.
- Inspects only `commands/` and `skills/` directories.
