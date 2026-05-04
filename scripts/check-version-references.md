# check-version-references.sh / check-version-references.ps1

## Purpose

Catch hardcoded version drift across tracked files. After a release, files like README, plugin manifests, marketplace.json, AGENTS docs, and various concept pages sometimes have stale `vX.Y.Z` references. This validator detects that drift at PR time.

Pairs with `validate-version-consistency.{sh,ps1}` (sibling enforcing check that ensures `plugin.json` and `marketplace.json` agree on a single version). Where validate-version-consistency catches drift between the two manifest files, check-version-references catches drift between the manifests and the rest of the repo's prose.

## Usage

```bash
./scripts/check-version-references.sh
./scripts/check-version-references.sh --strict   # treat drift as failure
```

```powershell
.\scripts\check-version-references.ps1
.\scripts\check-version-references.ps1 -Strict
```

## What It Does

1. Reads current version from `.claude-plugin/plugin.json` (single source of truth)
2. Greps tracked `.md` and `.json` files for `vX.Y.Z` patterns
3. Excludes paths where historical version refs are expected (CHANGELOG, release notes, release plans, session logs, agent context files, etc.)
4. Reports remaining lines that contain ANY version ref differing from current

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | No drift OR advisory mode (default; reports drift but doesn't fail) |
| `1`  | Drift found AND `--strict` (bash) or `-Strict` (pwsh) was passed |

## Posture (v2.13.0)

**Advisory.** This script ships advisory in v2.13.0 because:

- Pre-existing drift may exist that needs separate cleanup
- Some legitimate version refs may be in unexcluded paths and need triage (expand exclusions OR update the ref)

**Promotion plan:** review v2.13.0 advisory output during cycle. If false-positive rate is acceptable AND remaining drift is fixed, promote to enforcing (`--strict` in `validation.yml`) in v2.14.0+.

## Exclusions

Paths NOT scanned for drift (historical version refs are correct):

| Path | Why excluded |
|---|---|
| `CHANGELOG.md` and `docs/changelog.md` | Per-release historical entries are correct for their time |
| `docs/releases/` | Per-release notes |
| `docs/internal/release-plans/` | Per-release plan documents reference their target version |
| `docs/internal/audit/_archived/` | Archived audits reference the version they audited |
| `docs/internal/audit/<date>_*.md` (date-stamped audits) | Active audits reference the version they audited |
| `docs/internal/efforts/` | Effort planning docs reference target versions |
| `docs/internal/milestones/` | Milestone docs reference completion versions |
| `docs/internal/multi-repo-*`, `agent-component-usage_*`, `skill-versioning.md`, `cross-llm-review-protocol.md` | Design docs reference the versions they describe |
| `docs/internal/distribution/`, `docs/internal/mkdocs/` | Distribution and mkdocs migration docs reference relevant versions |
| `.github/issues-archive/`, `.github/issues-drafts/` | Historical issue content |
| `AGENTS/{claude,codex}/SESSION-LOG/` | Per-session logs reference the version active at session time |
| `AGENTS/claude/CONTEXT.md` and `AGENTS/codex/CONTEXT.md` | "Recent Work" sections list version history |
| `AGENTS/claude/DECISIONS.md` and `AGENTS/codex/DECISIONS.md` | Decision logs reference the version a decision applied to |
| `AGENTS/claude/PLANNING/` | Working artifacts reference relevant versions |
| `library/` | Sample outputs may reference any version as part of their content |
| `skills/*/HISTORY.md` | Per-skill version history |
| The script's own files | Self-reference |

## When to Use

- After a release tag (catches files that didn't get the version bump)
- Before tagging a new release (catches drift introduced during the cycle)
- In CI on push/PR (advisory in v2.13; enforcing in v2.14+)

## Example Output

```
=== Version Reference Drift Check ===

Current version (from .claude-plugin/plugin.json): 2.13.0

PASS: All non-excluded version references match current 2.13.0.
```

```
=== Version Reference Drift Check ===

Current version (from .claude-plugin/plugin.json): 2.13.0

Found 3 line(s) with version reference drift:

README.md:42:**Latest stable:** v2.12.0 [release link]
docs/concepts/skill-anatomy.md:18:Available since v2.11.0
docs/guides/mcp-integration.md:75:MCP server at v2.10.2 (frozen)

WARN: 3 version reference drift line(s) found (advisory mode).
  Triage: confirm each is intentional historical reference, OR update to current.
  Promote to enforcing (--strict in CI) in v2.14.0+ after one clean cycle.
```

The third example above is intentional historical (M-22 freeze marker for MCP). Should be excluded by expanding the path-based exclusion list, or accepted as known noise. The first example (README "Latest stable") is unintentional drift and should be fixed.

## Limitations / Known Issues

- **Path-based exclusions only.** The script doesn't try to detect "intentional historical reference" via prose context (e.g., "shipped in v2.7.0" should not flag, but the script would). Triage is manual; expand exclusions to silence known-good prose.
- **Single source-of-truth assumption.** The script reads `plugin.json`. If `marketplace.json` or other manifest disagrees (caught by `validate-version-consistency`), this script's "current" version may be stale.
- **No semver awareness.** A reference to `v2.13.1` (post-release patch) would flag as drift even if intentional. Triage required.

## See Also

- `validate-version-consistency.{sh,ps1}` (sibling enforcing check)
- v2.13 CI audit: `docs/internal/audit/ci-audit_2026-05-03.md` Section 16.7
- v2.13 CI execution plan: `docs/internal/release-plans/v2.13.0/plan_v2.13_ci-refactor.md` Wave 3 item 11

## Safety

Read-only. Does not modify any files.
