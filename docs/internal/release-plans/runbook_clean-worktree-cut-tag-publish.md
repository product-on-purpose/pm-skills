# Clean Worktree Cut/Tag/Publish Runbook

Status: Active  
Owner: Maintainers  
Last updated: 2026-08-09 (v2.32.0 WS-6: added Section 8.5 release-please phantom-minor fallback; prior: 2026-05-17 Section 10.5 external-surface sync)

This runbook defines the canonical release lane for post-`v2.5.0` cuts.

## 0) Pre-tag validator bundle (REQUIRED, added v2.15.1)

Before any of the steps below, run the full enforcing-validator bundle:

```bash
bash scripts/pre-tag-validate.sh
```

```powershell
pwsh scripts/pre-tag-validate.ps1
```

This codifies the `feedback_pre-tag-validator-bundle.md` memory rule (2026-05-16): every truly-enforcing validator (count-consistency + generated-content-untouched + family validators with --strict + the 4 v2.15.1 preventive validators) must pass before cutting a release tag. v2.15.0 surfaced two post-tag CI gaps that bundled validation would have caught pre-tag.

**Do not proceed if the bundle reports ANY failure.** Resolve every failure first, re-run the bundle, and only then continue with the tag-cut steps below.

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

## 8.5) Release-Please Shadow Interaction: The Phantom-Minor Window (added v2.32.0, WS-6)

Between the release commit landing on `main` (manifests already at `$VERSION`) and the
`v$VERSION` tag being pushed, release-please sees a manifest version with no matching tag and its
shadow Release PR can flip to proposing a spurious MINOR one step ahead. Observed 2026-07-31 on
PR #237, which proposed a phantom 2.32.0 while the manual v2.31.1 cut was mid-window; immutable
capture in `v2.31.1/plan_v2.31.1.md`, section "S1 shadow observation record".

Fallback rules:

1. **Do not chase the phantom.** The shadow PR is not a version authority; `plugin.json` plus
   this runbook's own G2 decision own the version. A phantom proposal during the window is
   expected behavior, not drift.
2. **Keep the window short.** Tag the re-verified SHA immediately after the release commit
   lands (the v2.31.0 window precedent is about 48 seconds). The longer the manifest sits ahead
   of the tag, the longer the phantom stands.
3. **After the tag pushes**, the next release-please run self-corrects or supersedes the phantom
   proposal. If it does not, close the shadow PR manually citing the v2.31.1 S1 observation
   record.

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

## 10.5) External-Surface Sync (REQUIRED for major + minor releases; OPTIONAL for patches)

Tracked-file description surfaces (README header, plugin.json, marketplace.json, docs/index.mdx, CHANGELOG, release notes, AGENTS.md, library samples README) ship with every commit. Note: the per-agent `CONTEXT.md` markers left this tracked set in v2.30.0 (WS-T12 gitignored `_agent-context/`), so the marker flip is now a local-only action, not part of any commit. **External-state surfaces do NOT**: they live in GitHub API state, external service caches, and cross-repo files. They must be synced explicitly after the tag pushes.

For **major** (X.0.0) and **minor** (X.Y.0) releases: execute all sub-checks below. The qualitative description content has typically changed; external surfaces must catch up.

For **patch** (X.Y.z) releases: skip if the description content is unchanged (verify with a quick READ pass). v2.15.1 / v2.15.2 are examples where the description was unchanged and these sub-checks were no-ops.

### 10.5.1) GitHub repo About description

```bash
gh repo edit product-on-purpose/pm-skills \
  --description "$(node scripts/gen-derived-surfaces.mjs --about)"
```

Verify:

```bash
gh api repos/product-on-purpose/pm-skills --jq '.description'
```

Expected: matches `node scripts/gen-derived-surfaces.mjs --about` exactly (the generator-owned About string, REQ-Z1.7, added v2.32.0 WS-6 addendum). The generator is the canonical source; the GitHub description is a derivative, synced manually here or automatically by release-please.yml's post-tag About-sync step once the automated flow is authoritative.

### 10.5.2) GitHub repo Topics

If the release introduces a new methodology, family, or product surface that warrants a topic tag (e.g., v2.15.0 introduced `foundation-sprint` + `design-sprint`):

```bash
gh repo edit product-on-purpose/pm-skills --add-topic <new-topic>
```

To remove a stale topic:

```bash
gh repo edit product-on-purpose/pm-skills --remove-topic <stale-topic>
```

### 10.5.3) GitHub Pages homepage URL

Verify:

```bash
gh api repos/product-on-purpose/pm-skills --jq '.homepage'
```

Expected: `https://product-on-purpose.github.io/pm-skills/`. This is stable across releases but worth confirming.

### 10.5.4) Open Graph metadata on the deployed docs site

Verify the deployed Astro Starlight site at `/pm-skills/` has the current frontmatter `description:` rendered in the `<meta property="og:description">` tag (a curl-and-grep is sufficient; the Astro build derives `og:description` from frontmatter automatically, but a manual check catches mis-builds):

```bash
curl -s https://product-on-purpose.github.io/pm-skills/ | grep -E "og:description|description"
```

Expected: contains the current `docs/index.mdx` frontmatter `description:` text.

### 10.5.5) Cross-repo pm-skills-mcp surfaces

`pm-skills-mcp` is in maintenance mode (per M-22). Catalog is frozen at v2.9.2 build. For major / minor pm-skills releases that change the catalog narrative or skill counts, the pm-skills-mcp cross-repo surfaces still need refresh:

- `pm-skills-mcp/README.md` description / catalog-count references
- `pm-skills-mcp/pm-skills-source.json` metadata (version pointer + catalog-frozen-at-vX note)

This is a separate manual step (or a parallel commit in the pm-skills-mcp worktree). Mirror the v2.14.2 cross-repo pattern.

### 10.5.6) skills.sh directory listing cache

The external skills.sh directory at https://skills.sh/product-on-purpose/pm-skills may scrape README content on a delay. Verify after a few hours that the listing reflects the new version:

```bash
curl -s https://skills.sh/product-on-purpose/pm-skills 2>&1 | head -40
```

Expected: catalog count + version match the release. If stale beyond a day, file a refresh request with skills.sh.

### Sub-check tracking

- [ ] 10.5.1 GitHub About description matches README byline
- [ ] 10.5.2 GitHub Topics current (add new methodology / family topics if applicable; remove stale ones)
- [ ] 10.5.3 GitHub homepage URL verified
- [ ] 10.5.4 Docs site og:description matches frontmatter
- [ ] 10.5.5 pm-skills-mcp cross-repo description references current (if catalog narrative changed)
- [ ] 10.5.6 skills.sh listing refreshed (verify within 24h)

**Skip rationale for patch releases**: if Section 10.5 is skipped, note "no qualitative description change; external surfaces remain accurate at vX.Y.0 baseline" in the post-cut artifact summary.

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
