# build-release.sh / build-release.ps1

## Purpose

Create a reproducible release ZIP (`dist/pm-skills-vX.Y.Z.zip`) containing all distributable skill content, sample-output library content, commands, workflows, documentation, and the Claude plugin manifest.

## Usage

```bash
# Bash — explicit version
./scripts/build-release.sh 2.6.1

# Bash — version from environment
VERSION=2.6.1 ./scripts/build-release.sh

# Bash — version from latest git tag (default)
./scripts/build-release.sh
```

```powershell
# PowerShell — explicit version
powershell -ExecutionPolicy Bypass -File .\scripts\build-release.ps1 -Version 2.6.1

# PowerShell — version from latest git tag (default)
powershell -ExecutionPolicy Bypass -File .\scripts\build-release.ps1
```

## Version Resolution Order

1. CLI argument (first positional arg / `-Version` parameter)
2. `$VERSION` / `$Env:VERSION` environment variable
3. Latest git tag (`git describe --tags --abbrev=0`)
4. Fallback default: `2.0.1`

The `v` prefix is stripped automatically (`v2.6.0` becomes `2.6.0`).

## What It Does

1. **Runs `sync-claude`** to populate `.claude/skills` and `.claude/commands` from the source tree.
2. **Stages content** into `dist/stage/`:
   - `skills/`, `commands/`, `_workflows/`, `scripts/`, `docs/`
   - `library/` (including `library/skill-output-samples/`)
   - `.claude-plugin/` (plugin manifest)
   - `.claude/pm-skills-for-claude.md`
   - `README.md`, `QUICKSTART.md`, `AGENTS.md`, `CHANGELOG.md`
3. **Validates staged sample library content**:
   - Asserts `library/skill-output-samples/` exists in stage.
   - Asserts canonical sample output files are present (not only root docs).
4. **Syncs plugin manifest version** — sets `.claude-plugin/plugin.json` version to match the release version.
   - Bash: tries python, then node, then sed as fallbacks.
   - PowerShell: uses `ConvertFrom-Json` / `ConvertTo-Json`.
   - Verifies the version was written correctly (fails on mismatch).
5. **Removes `.claude/skills` and `.claude/commands`** from staging (these are local convenience, not shipped).
6. **Creates the ZIP** (`dist/pm-skills-vX.Y.Z.zip`).
   - Bash: tries `zip`, then python `zipfile` module.
   - PowerShell: uses `Compress-Archive`.
7. **Generates SHA256 checksum** (`dist/pm-skills-vX.Y.Z.zip.sha256`).
8. **Writes `dist/manifest.txt`** with version, filename, and hash.

## Outputs

| File | Description |
|---|---|
| `dist/pm-skills-vX.Y.Z.zip` | Release archive |
| `dist/pm-skills-vX.Y.Z.zip.sha256` | SHA256 checksum file |
| `dist/manifest.txt` | Release metadata (version, filename, hash) |

## Prerequisites

- **Bash**: Requires one of: `zip`, `python3`/`python`. Checksum requires `sha256sum` or `python3`/`python`.
- **PowerShell**: No external dependencies beyond standard cmdlets.
- Both require `sync-claude` to be present (called automatically).

## Safety

- Writes to `dist/` (gitignored) and refreshes `.claude/skills` + `.claude/commands` via `sync-claude`.
- Does not modify tracked skill/command source content.
- Fails fast on missing plugin manifest or version sync failure.

## Plugin Manifest Behavior

The script asserts that `.claude-plugin/plugin.json` exists in the staged content and that its `version` field matches the release version after sync. If either check fails, the build aborts. This ensures every release ZIP contains a correctly-versioned plugin manifest.
