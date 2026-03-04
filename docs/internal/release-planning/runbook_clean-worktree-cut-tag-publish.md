# Clean Worktree Cut/Tag/Publish Runbook

Status: Active  
Owner: Maintainers  
Last updated: 2026-03-04

This runbook defines the canonical release lane for post-`v2.5.0` cuts.

## 1) Current Baseline

1. `v2.5.0` is already published in both repositories.
2. `AGENTS/claude` canonicalization landed after `v2.5.0`:
   - `pm-skills`: `84bda26`
   - `pm-skills-mcp`: `d2dc3c9`
3. Do not retag `v2.5.0`.
4. If shipping these commits, cut the next patch version (for example `v2.5.1`).

## 2) Variables

Set once per session:

```powershell
$VERSION = "2.5.1"
$ROOT_PS = "E:\Projects\product-on-purpose\pm-skills"
$ROOT_MCP = "E:\Projects\product-on-purpose\pm-skills-mcp"
$WT_ROOT = "E:\Projects\product-on-purpose\_worktrees\release-$VERSION"
$WT_PS = "$WT_ROOT\pm-skills"
$WT_MCP = "$WT_ROOT\pm-skills-mcp"
```

## 3) Preflight (Main Worktrees)

Run in current roots before creating release worktrees:

```powershell
git -C $ROOT_PS status --short --branch
git -C $ROOT_MCP status --short --branch
git -C $ROOT_PS fetch --tags --prune
git -C $ROOT_MCP fetch --tags --prune
```

Expected:
1. Both repos are clean.
2. Both repos are on `main...origin/main`.
3. Target tag `v$VERSION` does not exist.

## 4) Create Clean Release Lane

```powershell
New-Item -ItemType Directory -Force -Path $WT_ROOT | Out-Null
git -C $ROOT_PS worktree add $WT_PS main
git -C $ROOT_MCP worktree add $WT_MCP main
```

## 5) Prepare Release Commit (`pm-skills`)

In `$WT_PS`:

1. Update `CHANGELOG.md` with `## [$VERSION] - <YYYY-MM-DD>` patch entry.
2. Add `docs/releases/Release_v$VERSION.md`.
3. Keep scope release-hygiene only.
4. Commit:

```powershell
git -C $WT_PS add CHANGELOG.md docs/releases/Release_v$VERSION.md
git -C $WT_PS commit -m "docs(release): cut v$VERSION patch notes for AGENTS/claude canonicalization"
```

## 6) Prepare Release Commit (`pm-skills-mcp`)

In `$WT_MCP`:

1. Bump package version:

```powershell
npm --prefix $WT_MCP version $VERSION --no-git-tag-version
```

2. Update:
   - `CHANGELOG.md`
   - `docs/releases/Release_v$VERSION.md`
   - `pm-skills-source.json` if pin/version contract requires roll-forward.
3. Commit:

```powershell
git -C $WT_MCP add package.json package-lock.json CHANGELOG.md docs/releases/Release_v$VERSION.md pm-skills-source.json
git -C $WT_MCP commit -m "chore(release): cut v$VERSION"
```

## 7) Validation Matrix (Release Lane)

Run before tagging:

`pm-skills`:

```powershell
powershell -ExecutionPolicy Bypass -File "$WT_PS\scripts\validate-commands.ps1"
powershell -ExecutionPolicy Bypass -File "$WT_PS\scripts\lint-skills-frontmatter.ps1"
$env:VALIDATE_MCP_SYNC_MODE='block'; $env:PM_SKILLS_PATH=$WT_PS; $env:PM_SKILLS_MCP_PATH="$WT_MCP"; node "$WT_PS\.github\scripts\validate-mcp-sync.js"
```

`pm-skills-mcp`:

```powershell
npm --prefix $WT_MCP run lint
npm --prefix $WT_MCP test
npm --prefix $WT_MCP run build
```

## 8) Tag and Push

`pm-skills`:

```powershell
git -C $WT_PS tag -a "v$VERSION" -m "pm-skills v$VERSION"
git -C $WT_PS push origin main
git -C $WT_PS push origin "v$VERSION"
```

`pm-skills-mcp`:

```powershell
git -C $WT_MCP tag -a "v$VERSION" -m "pm-skills-mcp v$VERSION"
git -C $WT_MCP push origin main
git -C $WT_MCP push origin "v$VERSION"
```

## 9) Publish and Release Objects

1. Create GitHub release entries for `v$VERSION` in both repos.
2. Confirm release workflows succeed.
3. For `pm-skills-mcp`, confirm npm publish success for `v$VERSION`.

## 10) Post-Cut Artifact Checklist

Use this checklist immediately after cut:

- [ ] `git -C $ROOT_PS rev-parse v$VERSION` resolves and equals `origin/main` release commit.
- [ ] `git -C $ROOT_MCP rev-parse v$VERSION` resolves and equals `origin/main` release commit.
- [ ] `https://github.com/product-on-purpose/pm-skills/releases/tag/v$VERSION` exists.
- [ ] `https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v$VERSION` exists.
- [ ] `pm-skills` release workflow run URL captured in release notes.
- [ ] `pm-skills-mcp` publish workflow run URL captured in release notes.
- [ ] `npm view pm-skills-mcp version` returns `$VERSION`.
- [ ] `npm view pm-skills-mcp dist-tags --json` shows `"latest": "$VERSION"`.
- [ ] `docs/releases/Release_v$VERSION.md` exists in both repos with final artifact links.

## 11) Cleanup

After successful cut:

```powershell
git -C $ROOT_PS worktree remove $WT_PS
git -C $ROOT_MCP worktree remove $WT_MCP
```

Optionally remove the parent lane folder:

```powershell
Remove-Item -Recurse -Force $WT_ROOT
```
