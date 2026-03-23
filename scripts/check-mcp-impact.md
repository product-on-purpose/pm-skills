# check-mcp-impact.sh / check-mcp-impact.ps1

## Purpose

Provide a non-blocking advisory when a pull request or push adds a new skill or renames an existing one. Those changes may require a corresponding update in the `pm-skills-mcp` repository.

## Usage

```bash
./scripts/check-mcp-impact.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-mcp-impact.ps1
```

## What It Does

1. Detects the most useful git diff range available:
   - `origin/<base>...HEAD` in pull request contexts
   - `HEAD^..HEAD` for local runs or push contexts
2. Reads changed files with git `--name-status`
3. Emits an advisory when it finds:
   - a newly added `skills/<name>/SKILL.md`
   - a renamed `skills/<old>/SKILL.md -> skills/<new>/SKILL.md`
4. Exits successfully either way so the check stays non-blocking

In GitHub Actions, advisories are emitted as workflow warnings. Locally, they are printed as `[WARN]` messages.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Script completed, with or without advisories |

## When to Use

- In CI on pull requests and pushes
- Before opening a PR that adds or renames skills
- When checking whether a repository change has downstream MCP implications

## Example Output

```
[OK] No MCP-impacting skill additions or renames detected
[WARN] New skill detected (skills/deliver-acceptance-criteria/SKILL.md). Review whether pm-skills-mcp needs a corresponding sync update.
```

## Safety

- Read-only — inspects git metadata only
- Non-blocking by design
