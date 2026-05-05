# check-count-consistency.sh / check-count-consistency.ps1

## Purpose

Detect stale hardcoded counts in documentation files. When skills, commands,
or workflows are added or removed, references like "31 skills" or "38 commands"
scattered across docs can become outdated. This script finds those mismatches.

## Usage

```bash
./scripts/check-count-consistency.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-count-consistency.ps1
```

## What It Does

1. Counts actual resources on disk:
   - Skills: directories in `skills/`
   - Commands: `.md` files in `commands/`
   - Workflows: `.md` files in `_workflows/` (excluding `README.md`)
2. Scans all tracked `.md` and `.json` files (including `plugin.json` and `marketplace.json`) for patterns like `{N} skills`, `{N} commands`, `{N} workflows` with up to 3 alpha-word interstitials (e.g., `{N} AI agent skills`, `{N} best-practice product management skills`)
3. Compares found numbers against actual counts
4. Reports mismatches with file path and line number

**Regex behavior (v2.13.0 update):** the historical 3-token interstitial allowance (`[0-9]+ ([a-zA-Z][a-zA-Z-]*[ ]+){0,3}skills`) is retained, but two additional layers of exemption now apply:

1. **Subset-descriptor exclusion.** Phrases that describe a *subset* of the total (e.g., "26 phase skills", "8 foundation skills", "40 skill commands") are no longer flagged. The validator detects subset descriptors when the digit is immediately followed by a known subset word (`phase`, `foundation`, `utility`, `domain`, `shipped`, `embedded`, `test`, `sample`, `library`, `lines?` for skills; `skill`, `workflow` for commands) and excludes that occurrence from the stale-count check. This replaces the prior `v[0-9]+\.` substring exemption, which was too broad (skipped any line with a version mention).

2. **Section-aware exemption via HTML markers.** Files can mark sections as historical or illustrative with paired markers:

   ```html
   <!-- count-exempt:start -->
   ... historical content (e.g., README "What's New" release entries) ...
   <!-- count-exempt:end -->
   ```

   The validator pre-scans every checked file for marker pairs, then skips any line in the resulting ranges. This is the canonical mechanism for explicit exemption (point-in-time release entries, illustrative example output, sample-output catalogs that contain dated counts) and is what every new historical content section should use. It gives auditable, file-scoped exemption rather than the implicit prior workaround.

Per-phase counts (Discover 3, Foundation 8) below the `MinThreshold = 10` filter are still skipped to avoid false-positive on legitimate per-phase prose. Codifying per-phase awareness is a v2.14.0+ enhancement.

Exclusions (not flagged as stale):
- `CHANGELOG.md` . historical entries are correct for their time
- `docs/releases/` . same reason
- `docs/internal/` . planning docs may reference future counts
- `.github/.created-issues.json` and `.github/scripts/` . tooling state and npm manifests, not docs
- `AGENTS/claude/CONTEXT.md`, `AGENTS/claude/DECISIONS.md`, `AGENTS/claude/SESSION-LOG/` . agent-internal context that legitimately references historical states
- Lines inside `<!-- count-exempt:start --> ... <!-- count-exempt:end -->` blocks
- Lines whose digit is followed by a subset descriptor (see above)

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All counts are consistent |
| `1`  | Stale counts detected |

## When to Use

- After adding or removing skills, commands, or workflows
- Before tagging a release
- In CI to catch outdated documentation

## Example Output

```
=== Count Consistency Check ===

Actual counts:
  Skills:    31
  Commands:  38
  Workflows: 9

PASS: No stale counts found in tracked .md files.
```

```
=== Count Consistency Check ===

Actual counts:
  Skills:    32
  Commands:  39
  Workflows: 10

Stale counts found:

  README.md:5: found '31 skills' (actual: 32)
  docs/guides/getting-started.md:12: found '38 commands' (actual: 39)

FAIL: One or more hardcoded counts are stale.
```

## Safety

Read-only. Does not modify any files.
