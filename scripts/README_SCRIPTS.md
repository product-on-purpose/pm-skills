# Scripts Guide

## Table of Contents
- [Overview](#overview)
- [Script Catalog](#script-catalog)
  - [sync-claude.sh / sync-claude.ps1](#sync-claudesh--sync-claudeps1)
  - [build-release.sh / build-release.ps1](#build-releasesh--build-releaseps1)
  - [validate-commands.sh / validate-commands.ps1](#validate-commandssh--validate-commandps1)
  - [lint-skills-frontmatter.sh / lint-skills-frontmatter.ps1](#lint-skills-frontmattersh--lint-skills-frontmatterps1)
  - [validate-agents-md.sh / validate-agents-md.ps1](#validate-agents-mdsh--validate-agents-mdps1)
  - [check-mcp-impact.sh / check-mcp-impact.ps1](#check-mcp-impactsh--check-mcp-impactps1)
  - [validate-skill-history.sh / validate-skill-history.ps1](#validate-skill-historysh--validate-skill-historyps1)
  - [validate-skills-manifest.sh / validate-skills-manifest.ps1](#validate-skills-manifestsh--validate-skills-manifestps1)
  - [validate-version-consistency.sh / validate-version-consistency.ps1](#validate-version-consistencysh--validate-version-consistencyps1)
  - [validate-gitignore-pm-skills.sh / validate-gitignore-pm-skills.ps1](#validate-gitignore-pm-skillssh--validate-gitignore-pm-skillsps1)
  - [validate-script-docs.sh / validate-script-docs.ps1](#validate-script-docssh--validate-script-docsps1)
  - [check-workflow-coverage.sh / check-workflow-coverage.ps1](#check-workflow-coveragesh--check-workflow-coverageps1)
  - [check-count-consistency.sh / check-count-consistency.ps1](#check-count-consistencysh--check-count-consistencyps1)
  - [check-generated-freshness.sh / check-generated-freshness.ps1](#check-generated-freshnesssh--check-generated-freshnessps1)
  - [check-context-currency.sh / check-context-currency.ps1](#check-context-currencysh--check-context-currencyps1)
  - [check-stale-bundle-refs.sh / check-stale-bundle-refs.ps1](#check-stale-bundle-refssh--check-stale-bundle-refsps1)
  - [check-nav-completeness.sh / check-nav-completeness.ps1](#check-nav-completenesssh--check-nav-completenessps1)
  - [check-version-references.sh / check-version-references.ps1](#check-version-referencessh--check-version-referencesps1)
- [When to use what](#when-to-use-what)
- [FAQ](#faq)
- [Tips](#tips)
- [Troubleshooting](#troubleshooting)
- [Detailed Documentation](#detailed-documentation)

---

## Overview
The `scripts/` folder contains small utilities to keep the repo consistent, reproducible, and discoverable across AI tools. They are safe to run locally; `build-release` writes to `dist/` and refreshes `.claude/` via `sync-claude`.

CI-only automation scripts live in `.github/scripts/` (for example, `validate-mcp-sync.js`).

## Script Catalog

### sync-claude.sh / sync-claude.ps1
**Purpose:** Populate `.claude/skills` and `.claude/commands` from the canonical flat `skills/` and `commands/`, with validation.

**Why:** Some tools (openskills CLI, certain Claude Code setups) auto-discover only in `.claude/`. Releases do **not** ship populated `.claude/`; this is a local convenience.

**Use when:** You need Claude Code / openskills discovery. Skip if your tool reads `skills/` directly.

**Commands:**
- Bash: `./scripts/sync-claude.sh`
- PowerShell: `./scripts/sync-claude.ps1`

**Validation:** Fails if any skill is missing `SKILL.md`, `references/TEMPLATE.md`, or `references/EXAMPLE.md`.

### build-release.sh / build-release.ps1
**Purpose:** Create `dist/pm-skills-vX.Y.Z.zip` with manifest + SHA256.

**Why:** Reproducible packaging for releases; ensures sample library content is included while populated `.claude/` and internal governance docs under `docs/internal/` are excluded from the shipped ZIP.

**Use when:** Cutting a release tag or testing the release bundle.

**Commands:**
- Bash: `./scripts/build-release.sh`
- PowerShell: `./scripts/build-release.ps1`

**Outputs:** `dist/pm-skills-vX.Y.Z.zip`, `.zip.sha256`, `manifest.txt`.

### validate-commands.sh / validate-commands.ps1
**Purpose:** Ensure each command points to an existing `skills/{phase-skill}/SKILL.md` and has `references/TEMPLATE.md` and `EXAMPLE.md`.

**Why:** Guardrail after edits/renames; lightweight lint before tagging.

**Use when:** After editing commands or skills; before release; in CI.

**Commands:**
- Bash: `./scripts/validate-commands.sh`
- PowerShell: `./scripts/validate-commands.ps1`

**Outputs:** Console pass/fail per command; exit non-zero on failure.

### lint-skills-frontmatter.sh / lint-skills-frontmatter.ps1
**Purpose:** Validate YAML frontmatter and file structure of every skill in `skills/`.

**Why:** Enforces naming conventions, required fields (`name`, `version`, `updated`, `license`), phase/classification consistency, reference file completeness, description length, and minimum template structure.

**Use when:** After editing skill frontmatter or adding a new skill; before release; in CI.

**Commands:**
- Bash: `./scripts/lint-skills-frontmatter.sh`
- PowerShell: `./scripts/lint-skills-frontmatter.ps1`

**Outputs:** Console pass/fail per skill; exit non-zero on failure.

### validate-agents-md.sh / validate-agents-md.ps1
**Purpose:** Verify that `AGENTS.md` stays in sync with actual skill directories.

**Why:** Prevents public discovery docs from drifting when skills are added, renamed, or removed.

**Use when:** After editing `AGENTS.md`; after adding, renaming, or deleting a skill; in CI.

**Commands:**
- Bash: `./scripts/validate-agents-md.sh`
- PowerShell: `./scripts/validate-agents-md.ps1`

**Outputs:** Console pass/fail for missing, orphaned, or duplicate `AGENTS.md` skill paths; exit non-zero on failure.

### check-mcp-impact.sh / check-mcp-impact.ps1
**Purpose:** Emit a non-blocking advisory when a change may require follow-up in `pm-skills-mcp`.

**Why:** New or renamed skills can require MCP pin refreshes, tool inventory updates, or sync work in the companion repo.

**Use when:** Before opening a PR that adds or renames skills; in CI on push/PR.

**Commands:**
- Bash: `./scripts/check-mcp-impact.sh`
- PowerShell: `./scripts/check-mcp-impact.ps1`

**Outputs:** Warning-only advisory for MCP-impacting skill additions or renames; always exits successfully.

### validate-skill-history.sh / validate-skill-history.ps1
**Purpose:** Validate that opt-in `HISTORY.md` files track the current `SKILL.md` version.

**Why:** Ensures skill version history stays in sync with frontmatter as skills iterate through the lifecycle.

**Use when:** After updating a skill's version or HISTORY.md; in CI (advisory).

**Commands:**
- Bash: `./scripts/validate-skill-history.sh`
- PowerShell: `./scripts/validate-skill-history.ps1`

**Outputs:** Pass/fail per HISTORY.md file; warns on missing version sections; exits 0 silently if no HISTORY.md files exist. Advisory (non-blocking in CI).

### validate-skills-manifest.sh / validate-skills-manifest.ps1
**Purpose:** Validate that `skills-manifest.yaml` entries in release folders match actual skill directories.

**Why:** Ensures release manifests stay accurate . catches orphaned skill references and version mismatches.

**Use when:** After editing release manifests or adding/removing skills; in CI (advisory).

**Commands:**
- Bash: `./scripts/validate-skills-manifest.sh`
- PowerShell: `./scripts/validate-skills-manifest.ps1`

**Outputs:** Pass/fail per manifest file; checks directory existence for non-removed entries; verifies version alignment for the latest release only. Advisory (non-blocking in CI).

### validate-version-consistency.sh / validate-version-consistency.ps1
**Purpose:** Ensure `.claude-plugin/plugin.json` and `marketplace.json` report the same version.

**Why:** Prevents version drift between the two sources. The `/update-pm-skills` skill reads version from these files . mismatches cause confusing version reports.

**Use when:** After editing either version file; before release; in CI (hard-fail).

**Commands:**
- Bash: `./scripts/validate-version-consistency.sh`
- PowerShell: `./scripts/validate-version-consistency.ps1`

**Outputs:** Pass with version number, or fail with both mismatched values. Requires Node.js.

### validate-gitignore-pm-skills.sh / validate-gitignore-pm-skills.ps1
**Purpose:** Ensure `_pm-skills/` is listed in `.gitignore`.

**Why:** The `_pm-skills/` directory holds local state (update reports, backups) that should never be committed.

**Use when:** After editing `.gitignore`; in CI (advisory).

**Commands:**
- Bash: `./scripts/validate-gitignore-pm-skills.sh`
- PowerShell: `./scripts/validate-gitignore-pm-skills.ps1`

**Outputs:** Pass/fail for presence of `_pm-skills/` in `.gitignore`.

### validate-script-docs.sh / validate-script-docs.ps1
**Purpose:** Ensure every `.sh`/`.ps1` script pair has a companion `.md` documentation file.

**Why:** Convention: every script ships with human-readable docs. This CI catches undocumented scripts before merge.

**Use when:** After adding new scripts; before release; in CI (advisory).

**Commands:**
- Bash: `./scripts/validate-script-docs.sh`
- PowerShell: `./scripts/validate-script-docs.ps1`

**Outputs:** Pass with count of documented pairs, or fail listing each undocumented script.

### check-workflow-coverage.sh / check-workflow-coverage.ps1
**Purpose:** Verify every workflow file has matching entries across the repo (docs page, AGENTS.md, mkdocs nav).

**Why:** When workflows are added, multiple files need cross-references. This catches missed entries.

**Use when:** After adding or renaming workflows; in CI (advisory).

**Commands:**
- Bash: `./scripts/check-workflow-coverage.sh`
- PowerShell: `./scripts/check-workflow-coverage.ps1`

**Outputs:** Pass/fail per workflow; lists specific missing entries.

### check-count-consistency.sh / check-count-consistency.ps1
**Purpose:** Detect stale hardcoded skill/command/workflow counts in documentation.

**Why:** Docs pages reference hardcoded counts which go stale when skills are added or removed. This detects mismatches automatically.

**Use when:** After adding skills, commands, or workflows; before release; in CI (advisory).

**Commands:**
- Bash: `./scripts/check-count-consistency.sh`
- PowerShell: `./scripts/check-count-consistency.ps1`

**Outputs:** Pass if all counts match, or fail with file path, line number, and expected vs. found count. Excludes CHANGELOG and release notes (historical counts are correct for their time).

### check-generated-freshness.sh / check-generated-freshness.ps1
**Purpose:** Verify generated workflow pages in `docs/workflows/` match their sources in `_workflows/`.

**Why:** Generated pages can drift if workflows are edited but the generator isn't re-run.

**Use when:** After editing `_workflows/` files; before release; in CI (advisory).

**Commands:**
- Bash: `./scripts/check-generated-freshness.sh`
- PowerShell: `./scripts/check-generated-freshness.ps1`

**Outputs:** Pass if all pages are fresh, or fail listing stale pages.

### check-context-currency.sh / check-context-currency.ps1
**Purpose:** Verify `AGENTS/*/CONTEXT.md` files reference the current CHANGELOG release version.

**Why:** Agent context files should reflect the latest release so agents have accurate repo context.

**Use when:** After tagging a release; in CI (advisory).

**Commands:**
- Bash: `./scripts/check-context-currency.sh`
- PowerShell: `./scripts/check-context-currency.ps1`

**Outputs:** Pass/fail per CONTEXT.md file with version comparison.

### check-stale-bundle-refs.sh / check-stale-bundle-refs.ps1
**Purpose:** Terminology guard for the bundles → workflows rename (v2.9.0).

**Why:** Catches stale "bundle" references that should now say "workflow" after the v2.9.0 rename.

**Use when:** After editing docs; in CI (advisory, `--strict` for hard-fail).

**Commands:**
- Bash: `./scripts/check-stale-bundle-refs.sh` (advisory) or `--strict` (hard-fail)
- PowerShell: `./scripts/check-stale-bundle-refs.ps1` or `-Strict`

**Outputs:** Warning-only in default mode; hard-fail in strict mode.

### check-nav-completeness.sh / check-nav-completeness.ps1
**Purpose:** Verify every `docs/**/*.md` file (excluding `docs/internal/`) is in `mkdocs.yml` `nav:` or `exclude_docs:` (or matches an `AUTO_INCLUDE_PATTERNS` entry for transitively-reachable content like release notes and templates).

**Why:** Catches silent doc orphans. v2.12.0 cycle had `docs/reference/README.md` added but not wired into nav, invisible on the site until manual review caught it. Closes that orphan-class issue.

**Use when:** After adding new docs/*.md files; when restructuring mkdocs nav; in CI (enforcing).

**Commands:**
- Bash: `./scripts/check-nav-completeness.sh`
- PowerShell: `./scripts/check-nav-completeness.ps1`

**Outputs:** Pass with file/nav counts, or fail listing each orphan or broken nav entry.

### check-version-references.sh / check-version-references.ps1
**Purpose:** Catch hardcoded version drift across tracked `.md` and `.json` files. Pairs with `validate-version-consistency` (which catches drift between manifests).

**Why:** After a release, files like README, AGENTS docs, and concept pages sometimes have stale `vX.Y.Z` references. This validator detects that drift at PR time.

**Use when:** After tagging a release; before tagging a new release; in CI (advisory in v2.13.0; promote to enforcing in v2.14.0+ once stable).

**Commands:**
- Bash: `./scripts/check-version-references.sh` (advisory) or `--strict` (hard-fail)
- PowerShell: `./scripts/check-version-references.ps1` or `-Strict`

**Outputs:** Pass if all non-excluded refs match current version, or warn/fail with file:line per drifted reference. Excludes historical paths (CHANGELOG, releases, plan archives, session logs, agent context files).

## When to use what
- **Day-to-day:** No scripts needed unless using openskills/Claude Code → run `sync-claude`.
- **After adding a skill:** `validate-commands` → `lint-skills-frontmatter` → `validate-agents-md` → `check-mcp-impact` → `check-count-consistency`.
- **After adding a workflow:** `check-workflow-coverage` → `check-count-consistency` → `check-generated-freshness`.
- **After adding a script:** `validate-script-docs` (ensure companion `.md` exists).
- **Pre-release:** All validation scripts → `validate-version-consistency` → `check-count-consistency` → `build-release`.
- **CI (hard-fail):** `validate-commands`, `lint-skills-frontmatter`, `validate-agents-md`, `validate-version-consistency`, `check-nav-completeness`.
- **CI (advisory):** `check-mcp-impact`, `validate-skill-history`, `validate-skills-manifest`, `validate-gitignore-pm-skills`, `validate-script-docs`, `check-workflow-coverage`, `check-count-consistency`, `check-generated-freshness`, `check-context-currency`, `check-stale-bundle-refs`, `check-version-references`.
- **Cross-repo drift:** `.github/workflows/validate-mcp-sync.yml` (observe first, block later).

## FAQ
**Q: Do I need `.claude/` populated?**  
A: Only if your tool requires it. Otherwise ignore; it stays gitignored.

**Q: Will build-release ship my local `.claude/`?**  
A: No. It copies only `.claude/pm-skills-for-claude.md` and explicitly removes `.claude/skills` + `.claude/commands` from the staging tree.

**Q: Can I delete `dist/`?**  
A: Yes. It’s build output and gitignored; delete anytime.

## Tips
- Keep `.claude/` untracked. Regenerate via `sync-claude` when needed.
- Run `validate-commands` after command or skill renames.
- Run `validate-agents-md` after skill inventory edits.
- Run `check-mcp-impact` when adding or renaming skills that may affect the MCP repo.
- Use `build-release` from a clean tree to avoid pulling in stray files.

## Troubleshooting
- `sync-claude` fails missing refs → ensure each skill has `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`.
- Hash mismatch after build → delete `dist/` and rebuild.
- Command not found in tool → ensure command file points to correct flat path; rerun `validate-commands`.
- Frontmatter lint failure → check `SKILL.md` has `name` matching the directory name, plus `version`, `updated`, `license` fields.
- `AGENTS.md` drift failure → rerun `validate-agents-md` and reconcile missing/orphan skill paths.
- MCP advisory appears → review whether `pm-skills-mcp` needs a matching sync or release-pin update.

## Detailed Documentation

Each script has a dedicated documentation file with full usage details, options, and behavior descriptions:

| Script Pair | Documentation |
|---|---|
| `sync-claude.sh` / `.ps1` | [sync-claude.md](sync-claude.md) |
| `build-release.sh` / `.ps1` | [build-release.md](build-release.md) |
| `validate-commands.sh` / `.ps1` | [validate-commands.md](validate-commands.md) |
| `lint-skills-frontmatter.sh` / `.ps1` | [lint-skills-frontmatter.md](lint-skills-frontmatter.md) |
| `validate-agents-md.sh` / `.ps1` | [validate-agents-md.md](validate-agents-md.md) |
| `check-mcp-impact.sh` / `.ps1` | [check-mcp-impact.md](check-mcp-impact.md) |
| `validate-skill-history.sh` / `.ps1` | [validate-skill-history.md](validate-skill-history.md) |
| `validate-skills-manifest.sh` / `.ps1` | [validate-skills-manifest.md](validate-skills-manifest.md) |
| `validate-version-consistency.sh` / `.ps1` | [validate-version-consistency.md](validate-version-consistency.md) |
| `validate-gitignore-pm-skills.sh` / `.ps1` | [validate-gitignore-pm-skills.md](validate-gitignore-pm-skills.md) |
| `validate-script-docs.sh` / `.ps1` | [validate-script-docs.md](validate-script-docs.md) |
| `check-workflow-coverage.sh` / `.ps1` | [check-workflow-coverage.md](check-workflow-coverage.md) |
| `check-count-consistency.sh` / `.ps1` | [check-count-consistency.md](check-count-consistency.md) |
| `check-generated-freshness.sh` / `.ps1` | [check-generated-freshness.md](check-generated-freshness.md) |
| `check-context-currency.sh` / `.ps1` | [check-context-currency.md](check-context-currency.md) |
| `check-stale-bundle-refs.sh` / `.ps1` | [check-stale-bundle-refs.md](check-stale-bundle-refs.md) |
| `check-nav-completeness.sh` / `.ps1` | [check-nav-completeness.md](check-nav-completeness.md) |
| `check-version-references.sh` / `.ps1` | [check-version-references.md](check-version-references.md) |
