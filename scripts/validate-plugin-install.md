# validate-plugin-install.sh / validate-plugin-install.ps1

## Purpose

Validates that the Claude Code plugin install path will work end-to-end. Catches schema drift in `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` that would silently break `/plugin marketplace add` and `/plugin install` for end users.

This script is the front-door check: it asks "if a user tried to install pm-skills as a Claude Code plugin right now, would it succeed?"

## Why this script exists

Prior to v2.13.1, `marketplace.json` lived at the repo root and lacked the `owner` field that Claude Code's marketplace schema requires. The plugin install path was therefore broken for any user attempting `/plugin marketplace add product-on-purpose/pm-skills`. The bug shipped silently across multiple releases (v2.7.0 through v2.13.0) because no CI step validated the install path itself; existing CI only checked that plugin.json and marketplace.json had the same version.

This validator closes that gap. Adding it to CI prevents future schema drift from reintroducing the same bug class.

## Checks performed

### Existence

1. `.claude-plugin/plugin.json` exists at the canonical path.
2. `.claude-plugin/marketplace.json` exists at the canonical path.
3. Both files parse as valid JSON.

### Plugin manifest (`.claude-plugin/plugin.json`)

1. Required field: `name` (non-empty string).
2. Required field: `version` (non-empty string).

### Marketplace manifest (`.claude-plugin/marketplace.json`)

1. Required field: `name` (non-empty string).
2. Required field: `owner` (object with at least `name`).
3. Required field: `plugins` (non-empty array).

### Per-plugin entry (`marketplace.json` `plugins[0]`)

1. Required field: `name` (non-empty string).
2. Required field: `version` (non-empty string).
3. Required field: `source` (non-empty string or object).
4. If `author` is present, it must be an object with `name`. String form is rejected by Claude Code's schema.

### Cross-manifest consistency

1. `plugin.json` `version` matches `marketplace.json` `plugins[0].version`.
2. `plugin.json` `name` matches `marketplace.json` `plugins[0].name`.

### Source resolution (advisory WARN)

1. If `plugins[0].source` is a string-form path (e.g., `"./"` or `"."`), the resolved directory exists relative to either `.claude-plugin/` or the repo root.

## Usage

```bash
# Bash (macOS/Linux)
./scripts/validate-plugin-install.sh
```

```powershell
# PowerShell (Windows)
powershell -ExecutionPolicy Bypass -File .\scripts\validate-plugin-install.ps1
```

## Exit codes

- `0`: PASS. Plugin install path is valid.
- `1`: FAIL. One or more required schema items missing or inconsistent. Output describes each failure.
- `2`: ERROR. Bash version requires `node` or `python3` to parse JSON; neither was available.

## Output

### Pass

```
PASS: plugin install path validated
  plugin.json: pm-skills @ 2.13.1
  marketplace.json: pm-skills-marketplace (owner: product-on-purpose)
  plugin entry: pm-skills @ 2.13.1 (source: ./)
```

### Fail (example)

```
FAIL: marketplace.json missing required field: owner (must be an object with at least a 'name' field)
      Example: { "owner": { "name": "product-on-purpose" } }
```

## Tier

**Enforcing.** Plugin install path is a public-facing capability. A schema drift here means new users cannot install pm-skills as a plugin. This is the same tier as `lint-skills-frontmatter` (which enforces the byte-0 frontmatter rule) and `validate-version-consistency` (which enforces matched manifest versions).

## Relationship to other validators

- `validate-version-consistency`: checks plugin.json and marketplace.json have the SAME version. This validator extends that with full schema checks plus name consistency.
- `lint-skills-frontmatter`: checks SKILL.md files; orthogonal to plugin manifests.
- `check-version-references`: catches stale version strings in docs; complementary to this check.

## Prerequisites

- **Bash**: requires `node` or `python3` to parse JSON.
- **PowerShell**: uses built-in `ConvertFrom-Json`; no external dependencies.

## Safety

- Read-only. Does not modify any file.
- Idempotent. Running multiple times produces the same result.
- Exit code is the only side effect.

## When to update this script

- When Claude Code's marketplace schema adds new required fields (e.g., a new top-level field beyond `name`/`owner`/`plugins`).
- When pm-skills moves to a multi-plugin marketplace (currently checks `plugins[0]` only; would need to loop over all entries).
- When upstream publishes a JSON schema URL the validator could fetch and validate against directly (today's version uses inline shape checks).
