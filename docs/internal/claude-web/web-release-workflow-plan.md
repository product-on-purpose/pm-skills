# Plan: Web Claude Code Skill Release Automation

## Context

Currently, releasing new skills requires a multi-step manual process across two repos (`pm-skills` and `pm-skills-mcp`), involving git worktrees, PowerShell scripts, tag creation, and a post-cut artifact checklist (see `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`). This can't be done from web-based Claude Code today.

**Goal**: Build a `/release-skill` slash command (and supporting automation) so that web Claude Code can take a new skill from authoring through to a **tag-ready PR** — including MCP sync preparation — that triggers the existing release pipeline when merged.

**User-confirmed scope**: Up to tag-ready PR (not manual tag push). MCP sync should also be automated.

---

## What Already Works

| Capability | Status |
|---|---|
| Skill file structure + templates | `docs/templates/skill-template/` |
| Frontmatter linting | `scripts/lint-skills-frontmatter.sh` |
| Command validation | `scripts/validate-commands.sh` |
| Release ZIP build | `scripts/build-release.sh` |
| GitHub Actions: validation on PR | `.github/workflows/validation.yml` |
| GitHub Actions: release on tag push | `.github/workflows/release.yml` |
| MCP sync validation | `.github/workflows/validate-mcp-sync.yml` |
| CHANGELOG format | Keep a Changelog v1.1.0 |
| Release notes template | `docs/releases/Release_vX.Y.Z.md` pattern |

## Gaps to Fill

### Gap 1: No auto-tag on merge (release bottleneck)
Today tags are created manually and pushed. Web Claude Code can create a PR but can't push tags to `main`. Need a GitHub Action that auto-creates a tag when a release PR merges.

### Gap 2: No `/release-skill` orchestration command
No single command ties together: skill creation → validation → CHANGELOG update → version bump → release notes → PR creation.

### Gap 3: MCP sync requires manual cross-repo work
The existing `validate-mcp-sync.yml` workflow **detects** drift between the two repos (and can block PRs), but it does **not fix** the drift. The actual sync still requires manual work in `pm-skills-mcp`: update `pm-skills-source.json`, run `embed-skills.js`, bump `package.json`, update CHANGELOG, commit, and push. Web Claude Code only has access to `pm-skills`.

### Gap 4: Version determination is manual
No script to compute the next version (patch/minor/major) from current state.

---

## Deliverables

### 1. Auto-tag workflow: `.github/workflows/auto-tag-release.yml`

**Purpose**: When a PR with a `release` label merges to `main`, automatically create and push the version tag, triggering the existing `release.yml`.

**How it works**:
- Trigger: `pull_request` closed + merged to `main` + has label `release`
- Read version from `.claude-plugin/plugin.json`
- Create annotated tag `v{version}` and push it
- This triggers the existing `release.yml` → GitHub Release with ZIP artifacts

**Why**: This is the key missing piece. Web Claude Code can create PRs and push branches, but can't push tags to `main`. This workflow bridges that gap.

### 2. MCP sync dispatch workflow: `.github/workflows/dispatch-mcp-sync.yml`

**Purpose**: After a release tag is created in `pm-skills`, automatically trigger a sync PR in `pm-skills-mcp`.

**How it works**:
- Trigger: After `auto-tag-release.yml` completes (or on tag push)
- Use `repository_dispatch` or `workflow_dispatch` to trigger a workflow in `pm-skills-mcp`
- Pass the new version and skill inventory as payload
- Requires a GitHub token with cross-repo access (fine-grained PAT or GitHub App)

**pm-skills-mcp side** (new workflow): `create-sync-pr.yml`
- Receives dispatch event with version info
- Runs `embed-skills.js` against latest pm-skills
- Updates `pm-skills-source.json` with new version/ref
- Bumps `package.json` version
- Updates CHANGELOG
- Creates a PR in pm-skills-mcp for maintainer review

**Note**: This requires a GitHub secret with cross-repo permissions. The user will need to set up either:
- A fine-grained PAT with `contents: write` + `pull_requests: write` on `pm-skills-mcp`
- Or a GitHub App with appropriate permissions

### 3. Release skill/command: `commands/release-skill.md` + `.claude/skills/release-skill/`

**Purpose**: A slash command `/release-skill` that orchestrates the full release workflow from web Claude Code.

**Steps the command instructs Claude to perform**:

1. **Validate skill readiness**
   - Run `scripts/lint-skills-frontmatter.sh`
   - Run `scripts/validate-commands.sh`
   - Verify skill has SKILL.md, TEMPLATE.md, EXAMPLE.md
   - Check for sample output in `library/skill-output-samples/`

2. **Determine next version**
   - Read current version from `.claude-plugin/plugin.json`
   - Ask user: patch, minor, or major bump
   - Compute new version string

3. **Update versioned files**
   - Update `.claude-plugin/plugin.json` with new version
   - Add entry to `CHANGELOG.md` under new version heading
   - Create `docs/releases/Release_v{VERSION}.md` from pattern
   - Update `README.md` skill count/tables if new skill added
   - Run `sync-agents-md` logic (or just let the workflow handle it)

4. **Run local validation**
   - Re-run `lint-skills-frontmatter.sh` and `validate-commands.sh`
   - Verify CHANGELOG has new version entry
   - Verify plugin manifest version matches

5. **Create release PR**
   - Commit all changes to current branch
   - Push branch
   - Create PR targeting `main` with `release` label
   - PR description includes: version, skill changes, CHANGELOG excerpt

6. **Report status**
   - Show PR URL
   - Explain that merging will auto-tag and trigger release
   - Note that MCP sync PR will be auto-created after release

### 4. Version helper script: `scripts/next-version.sh`

**Purpose**: Compute next semver version given bump type.

```bash
# Usage: ./scripts/next-version.sh [patch|minor|major]
# Reads current version from .claude-plugin/plugin.json
# Outputs new version to stdout
```

### 5. Session-start hook for release readiness (optional)

Add to `.claude/settings.json` a `SessionStart` hook that runs validation scripts on startup, so Claude Code sessions begin with awareness of any broken skills.

---

## Files to Create/Modify

| File | Action | Purpose |
|---|---|---|
| `.github/workflows/auto-tag-release.yml` | **Create** | Auto-tag on release PR merge |
| `.github/workflows/dispatch-mcp-sync.yml` | **Create** | Trigger MCP sync after release |
| `commands/release-skill.md` | **Create** | `/release-skill` slash command |
| `.claude/skills/release-skill/SKILL.md` | **Create** | Full release orchestration instructions |
| `scripts/next-version.sh` | **Create** | Semver version calculator |
| `scripts/next-version.ps1` | **Create** | Windows equivalent |
| `.github/PULL_REQUEST_TEMPLATE/release.md` | **Create** | PR template for release PRs |
| `docs/guides/web-release-workflow.md` | **Create** | Documents the new workflow |
| `.claude-plugin/plugin.json` | Modify | (during release execution, not now) |

---

## What Remains Manual

1. **Merging the release PR** — Maintainer reviews and merges (intentional human gate)
2. **Setting up cross-repo GitHub secret** — One-time setup for MCP dispatch
3. **Reviewing MCP sync PR** — Maintainer reviews auto-created PR in pm-skills-mcp
4. **npm publish** — Triggered by pm-skills-mcp's existing release workflow after its PR merges
5. **Post-release verification** — Spot-checking release artifacts (could be partially automated later)

---

## Verification Plan

1. **Unit test the version script**: Run `scripts/next-version.sh patch` against current `plugin.json` and verify output
2. **Dry-run validation**: Run `lint-skills-frontmatter.sh` and `validate-commands.sh` to confirm they pass
3. **Test the slash command**: Invoke `/release-skill` in a web Claude Code session, verify it produces correct file changes
4. **Test auto-tag workflow**: Create a test PR with `release` label, merge it, verify tag is created and `release.yml` triggers
5. **Test MCP dispatch**: Verify `dispatch-mcp-sync.yml` triggers the pm-skills-mcp workflow (requires cross-repo secret)

---

## Implementation Order

1. `scripts/next-version.sh` + `scripts/next-version.ps1` — foundation utility
2. `.github/workflows/auto-tag-release.yml` — enables tag-free releases
3. `.claude/skills/release-skill/SKILL.md` + `commands/release-skill.md` — the orchestration command
4. `.github/workflows/dispatch-mcp-sync.yml` — cross-repo automation
5. `docs/guides/web-release-workflow.md` — documentation
6. `.github/PULL_REQUEST_TEMPLATE/release.md` — PR template (optional polish)
