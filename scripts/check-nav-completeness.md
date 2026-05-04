# check-nav-completeness.sh / check-nav-completeness.ps1

## Purpose

Verify every `docs/**/*.md` file (excluding `docs/internal/`) is either in
`mkdocs.yml` `nav:` (rendered on the site) or in `exclude_docs:` (intentionally
hidden). Catches silent orphans introduced when contributors add a docs file
without wiring it into mkdocs.yml.

Closes the v2.12.0 `docs/reference/README.md` orphan-class issue: a new file
was added but not in nav, so it was invisible on the site until manual review
caught it during release prep.

## Usage

```bash
./scripts/check-nav-completeness.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-nav-completeness.ps1
```

## What It Does

1. Parses `mkdocs.yml` to extract:
   - All `.md` paths referenced in `nav:` (recursive walk through nested lists)
   - All entries in `exclude_docs:` (multi-line literal block scalar)
2. Walks the filesystem for `docs/**/*.md` excluding `docs/internal/`
3. Forward check: every filesystem file must be in nav, in `exclude_docs`, or matched by an auto-include pattern (see below)
4. Reverse check: every nav entry must reference an existing file

## Auto-include patterns

Some files are transitively reachable via index pages and are intentionally NOT in nav (because adding 21+ entries individually would clutter the navigation). The script accepts these via `AUTO_INCLUDE_PATTERNS`:

| Pattern | Reason |
|---|---|
| `releases/Release_v*.md` | Each release note is linked from `docs/releases/index.md` table; explicit nav entries would clutter the Releases section |
| `templates/*` | Template files (`SKILL.md`, `TEMPLATE.md`, `EXAMPLE.md` under `docs/templates/skill-template/`) are reference content linked from `creating-skills.md` and `agent-skill-anatomy.md`; they are not navigation targets |

To add new auto-include patterns, edit the `AUTO_INCLUDE_PATTERNS` array at the top of both `.sh` and `.ps1`.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All docs files accounted for; all nav entries resolve |
| `1`  | One or more nav-completeness violations |

## When to Use

- After adding a new `docs/**/*.md` file
- When restructuring mkdocs.yml nav
- In CI (enforcing) to catch orphans at PR time

## Example Output

```
=== Nav Completeness Check ===

Filesystem files (excluding docs/internal/): 132
Nav entries:                                  98

PASS: All docs files are in nav, excluded, or auto-included; all nav entries resolve.
```

```
=== Nav Completeness Check ===

[FAIL] docs/reference/orphan.md not in mkdocs.yml nav or exclude_docs

Filesystem files (excluding docs/internal/): 133
Nav entries:                                  98

FAIL: 1 nav-completeness violation(s).
```

## Limitations / Known Issues

- YAML parsing is regex-based, not a full YAML parser. Handles the current `mkdocs.yml` structure but may miss edge cases:
  - Commented-out nav entries with unusual indentation
  - Inline comments on nav lines (e.g., `- index.md  # home page` would still extract `index.md` correctly, but a commented-out entry like `# - removed.md` would also extract `removed.md` as if it were active). The script currently does NOT strip YAML comments before regex extraction. A future enhancement (v2.14) would strip comments first or use a full YAML parser. Not actively breaking on the current `mkdocs.yml` (no commented entries).
  - Multiline string concatenation
- The forward check handles directory exclusions ending with `/` (e.g., `internal/`) and exact-file exclusions. Glob patterns in `exclude_docs` (if mkdocs ever supports them in a future version) are NOT handled by this script's exclusion check, but ARE handled via the script's separate `AUTO_INCLUDE_PATTERNS` array.
- The reverse check only verifies file existence, not link validity within rendered content. Use `check-internal-link-validity` (Wave 3) for cross-link validation.

## See Also

- mkdocs.yml `nav:` and `exclude_docs:` documentation
- `validate-docs.yml` workflow: catches build-time errors via `mkdocs build --strict`
- `check-internal-link-validity.sh` (Wave 3 of v2.13 CI refactor): catches broken internal links
- v2.13 CI audit: `docs/internal/audit/ci-audit_2026-05-03.md` Section 16.2

## Safety

Read-only. Does not modify any files.
