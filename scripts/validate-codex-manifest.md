# validate-codex-manifest

Asserts that `.codex-plugin/plugin.json` is a valid Codex plugin manifest.

Added in v2.22.0 alongside the Codex manifest. Codex reads `.codex-plugin/plugin.json` (not `.claude-plugin/`), so this validator guards the load-bearing identity fields that determine whether Codex can ingest the plugin and surface its skills.

## Checks (load-bearing identity only, per the v2.22.0 plan D4)

- The file exists and parses as JSON.
- `name` equals `"pm-skills"`.
- `version` is valid SemVer (`X.Y.Z`).
- `skills` begins with `./` and resolves to an existing directory (`skills/`).
- `interface` is an object.

Cosmetic fields (`brandColor`, `screenshots`, `defaultPrompt`, `logo`, `composerIcon`, `capabilities`, `category`) are intentionally NOT asserted; real first-party Codex plugins vary (`latex` ships no `composerIcon`).

Version *equality* across the four version surfaces (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`, README badge) is owned by `validate-version-consistency`, not this validator.

## Usage

```bash
bash scripts/validate-codex-manifest.sh
pwsh -File scripts/validate-codex-manifest.ps1
```

## Exit codes

- `0` - manifest valid
- `1` - manifest missing or invalid
