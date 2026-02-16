# PM‑Skills v2.0 Release Notes
Date: 2026-01-26  
Status: Shipped (tag v2.0.0). Use for support, audits, and future agent runs.

## Big Idea
We flattened the skill source to a single, predictable layout (`skills/{phase-skill}/`) and added tooling to keep discovery smooth (sync helper) and releases reproducible (build script). The goal is to make skills easier to reference, lint, package, and consume across assistants—without breaking discovery for tools that still look for `.claude/skills`.

## Scope and Goals
- One canonical flat layout for skills and commands.
- Zero stale nested paths in commands/docs/bundles.
- Reproducible release artifact with manifest + hash.
- Keep Claude Code / openskills discovery working via optional sync helper.
- Leave MCP changes for v2.1.

## What’s New & Better
- **Flat skills layout**: All 24 skills now live at `skills/{phase-skill}/`, removing nested phase folders.
- **Command alignment**: Every slash command updated to the flat paths.
- **Sync helper**: `scripts/sync-claude.(sh|ps1)` recreates `.claude/skills` and `.claude/commands` with validation—keeps openskills/Claude Code discovery working.
- **Reproducible packaging**: `scripts/build-release.(sh|ps1)` builds `pm-skills-v2.0.zip` + SHA256 manifest, excluding populated `.claude/*`.
- **Docs refresh**: README, QUICKSTART, AGENTS, bundles, guides, ecosystem/ref structure docs all match the flat layout and two-path install story.
- **Front-matter consistency**: All SKILL.md files now have `name`, `phase`, `version: 2.0.0`, `updated: 2026-01-26`.
- **Changelog entry**: 2.0.0 notes breaking change + helper scripts.
- **Issue chooser tidy**: Hidden awesome-list template; removed duplicate security contact link.

## Compatibility / Impact
- **Breaking**: Any hard-coded `skills/<phase>/<skill>/` references must change to `skills/{phase-skill}/`.
- **Commands**: No renames; all `/command` names unchanged, but paths they read are updated.
- **Discovery**: Claude Code/openskills users must run the sync helper once per checkout/zip to populate `.claude/skills` and `.claude/commands`. Other agents read `skills/` directly.
- **Bundles**: Updated to point to flat paths; no functional change.

## Breaking Changes
- Paths moved from `skills/<phase>/<skill>/` to `skills/{phase-skill}/`. Update any hard-coded paths/scripts.
- Slash commands point to new paths.
- `.claude/skills` is no longer shipped populated; generate locally with sync helper.

## Upgrade Guide
1) Pull or unzip v2.0.0.  
2) If you need `.claude/skills` discovery (openskills/Claude Code): run `./scripts/sync-claude.sh` (or `.ps1`). Keep `.claude/` out of git.  
3) Update any custom scripts or references from `skills/<phase>/<skill>/` to `skills/{phase-skill}/`.  
4) Optional: run `scripts/validate-commands.(sh|ps1)` to confirm commands map to skills after local edits.

## Highlights for Users
- Same 24 skills, easier to find and reference.
- Faster setup for Claude Code via sync helper; lighter release ZIP.
- Documentation examples now match the actual file layout.

## Known Notes
- `docs/internal/` contains draft links and remains excluded from link checks.
- No MCP code changes in this release; MCP follow-up remains planned (v2.1).

## Packaging
- Artifact: `pm-skills-v2.0.zip`
- Hash: `B89A0352404F09C2CC0A42F60B843B0E672CBC9FB11C5A63A8A3480CD59079AA` (SHA256)
- Manifest: `dist/manifest.txt` lists artifact name + hash.
- Release workflow: `.github/workflows/release.yml` builds on tag push, renames artifacts to match tag, and uploads ZIP + hash + manifest.

## Validation Results (performed pre-tag)
- **Structure/front-matter**: All `skills/*/SKILL.md` have `name`, `phase`, `version`, `updated` matching dir name.
- **Path lint**: No remaining `skills/<phase>/` references in public docs/commands/bundles.
- **Command mapping**: `scripts/validate-commands.(sh|ps1)` pass (ensures SKILL + TEMPLATE + EXAMPLE exist for each command).
- **Sync helper run**: Pass; populated `.claude/skills` and `.claude/commands` locally.
- **Release build**: `scripts/build-release.(sh|ps1)` produced ZIP + SHA256; verified exclusion of populated `.claude/*`.
- Logs stored locally (see `_NOTES/logs/` on dev machine; not shipped).

## How to Consume (by environment)
- **Claude Code / openskills**: Clone or unzip → run sync helper → use slash commands.
- **Copilot/Cursor/Windsurf**: Clone; AGENTS.md points to flat skills; no helper needed.
- **ChatGPT/Other LLMs**: Copy `SKILL.md` + `references/` from `skills/{phase-skill}/`.
- **ZIP users**: Download release ZIP, extract, optionally run sync helper if your tool expects `.claude/`.

## For Maintainers
- Keep `.claude/skills` and `.claude/commands` untracked; regenerate via sync helper as needed.
- Run `scripts/validate-commands.(sh|ps1)` and the path lint before future tags.
- If adding community skills later, extend validators (front-matter + path rules) and wire into CI.

---

## Technical Details (for agentic coding sessions)

### Repository layout (v2.0)
- Skills: `skills/{phase-skill}/SKILL.md` + `references/TEMPLATE.md`, `EXAMPLE.md`
- Commands: `commands/*.md` (each points to flat skills)
- Bundles: `_bundles/{feature-kickoff|lean-startup|triple-diamond}.md`
- Helpers: `scripts/sync-claude.(sh|ps1)`, `scripts/build-release.(sh|ps1)`, `scripts/validate-commands.(sh|ps1)`
- Discovery note: `.claude/pm-skills-for-claude.md` (only file shipped in .claude)

### Validation scripts/checks
- **Structure/front-matter**: already run; all `skills/*/SKILL.md` have `name`, `phase`, `version`, `updated` matching dir name.
- **Command mapping**: `scripts/validate-commands.sh` or `.ps1` (new)  
  - Verifies each command references an existing `skills/{phase-skill}/SKILL.md` and that `references/TEMPLATE.md` and `EXAMPLE.md` exist.
- **Path lint**: `rg "skills/(discover|define|develop|deliver|measure|iterate)/" --glob '*.md'` (should return none in public docs/commands).
- **Link check (with exclusions)**: exclude `.claude/`, `dist/`, `AGENTS/`, `docs/internal/`.

### Sync helper usage
```
./scripts/sync-claude.sh   # macOS/Linux
./scripts/sync-claude.ps1  # Windows
```
Outputs validated `.claude/skills/*` and `.claude/commands/*`; fails if SKILL/TEMPLATE/EXAMPLE missing.

### Release build
```
./scripts/build-release.sh    # or build-release.ps1
# Produces dist/pm-skills-v2.0.zip + pm-skills-v2.0.zip.sha256
# Excludes populated .claude/skills and .claude/commands
```

Expected ZIP contents:
- `skills/`, `commands/`, `_bundles/`, `scripts/`
- `.claude/pm-skills-for-claude.md` (instructions only)
- Key docs: README.md, QUICKSTART.md, AGENTS.md, CHANGELOG.md, docs/*

### Issue templates
- Awesome List template hidden (renamed to `.github/ISSUE_TEMPLATE/awesome-list-submission.md.disabled`).
- `config.yml` contact links now only Discussions; security link comes from `SECURITY.md`.

### Versions/metadata
- SKILL front matter: `version: "2.0.0"`, `updated: 2026-01-26`
- README badge: 2.0.0
- CHANGELOG: [2.0.0] entry; Unreleased is empty

### Next (post-release / v2.1 targets)
- MCP loader update for flat paths (metadata-derived phase).
- Optional lints: integrate `scripts/validate-commands.*` + front-matter check into CI.
- Consider community-skill linter once contributions open.
