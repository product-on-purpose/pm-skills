# [M-21] Explore release-please Integration
Status: Backlog
Milestone: TBD
Issue: TBD
Agent: Claude or Codex

## Scope

Evaluate [release-please](https://github.com/googleapis/release-please) (Google's automated release management tool) for the pm-skills and pm-skills-mcp repositories. Determine whether it fits the project's release workflow, what it would replace, and what trade-offs exist.

## Problem

The current release process is manual and error-prone:
1. **CHANGELOG entries** — hand-written in both `CHANGELOG.md` and `docs/changelog.md`
2. **Version bumps** — manual edits to `.claude-plugin/plugin.json`, `package.json` (MCP), README badges, "Latest stable" refs
3. **Release notes** — manually authored `docs/releases/Release_vX.Y.Z.md`
4. **Git tags** — manual `git tag vX.Y.Z`
5. **GitHub releases** — created by `.github/workflows/release.yml` on tag push, but the tag itself is manual
6. **Cross-repo coordination** — pm-skills and pm-skills-mcp versions must align

v2.9.0 touched 5+ files just for version references. Every release risks stale version numbers, inconsistent changelogs, or forgotten tags.

## What release-please Does

release-please automates:
- Parses [Conventional Commits](https://www.conventionalcommits.org/) to determine version bump type (major/minor/patch)
- Generates CHANGELOG entries from commit messages
- Creates a "Release PR" with version bumps and changelog updates
- On merge, creates the git tag and GitHub release

### How It Works

```
Developer pushes conventional commits to main
  → release-please GitHub Action runs
  → Creates/updates a "Release PR" with:
     - CHANGELOG.md updates
     - Version bumps in configured files
     - Release notes draft
  → Developer reviews and merges the Release PR
  → release-please creates git tag + GitHub release
```

## Evaluation Questions

### Fit Assessment

| Question | Current State | release-please Approach | Concern |
|----------|--------------|------------------------|---------|
| **Changelog format** | Hand-written Keep a Changelog format with editorial control | Auto-generated from commit messages | Loss of editorial voice? Can we customize the output? |
| **Dual changelog** | `CHANGELOG.md` + `docs/changelog.md` (separate files, different content) | Typically manages one file | Can it manage two? Or do we generate one from the other? |
| **Version files** | `.claude-plugin/plugin.json`, README badge, "Latest stable" refs | Configurable via `extra-files` or `release-please-config.json` | Can it handle all 5+ files with version refs? |
| **Release notes** | `docs/releases/Release_vX.Y.Z.md` — rich, hand-authored | Auto-generated from commits | These are valuable hand-written docs. Would we lose quality? |
| **Cross-repo** | pm-skills + pm-skills-mcp released in coordination | release-please supports monorepo or linked repos | Our repos are separate. How does cross-repo versioning work? |
| **Conventional commits** | Not currently enforced | Required for release-please | Need commitlint or similar. Breaking change for contributors. |
| **Effort-based workflow** | Commits reference effort IDs (M-19, F-13) | Commits reference conventional types (feat, fix, chore) | Can these coexist? `feat(F-13): expand workflows` |
| **Breaking changes** | Documented in release notes with migration guides | `BREAKING CHANGE:` footer triggers major bump | Does the automation add value or just noise for our scale? |

### Architecture Questions

1. **Single repo vs. both repos?** Start with pm-skills only, or both simultaneously?
2. **Conventional commit enforcement** — commitlint as pre-commit hook? GitHub Action? Advisory only?
3. **Release branch strategy** — release-please works best with trunk-based development. We're already on `main` only.
4. **Manifest mode** — release-please supports `release-please-config.json` for complex setups. Needed for our dual-changelog?
5. **Custom changelog sections** — Can we maintain the `### Added`, `### Changed`, `### Fixed` structure from Keep a Changelog?

### What We'd Keep vs. Replace

| Current Artifact | Keep | Replace | Hybrid |
|-----------------|------|---------|--------|
| `CHANGELOG.md` | | | Hybrid — auto-generate base, hand-edit for editorial quality |
| `docs/changelog.md` | | | Generate from `CHANGELOG.md` via script |
| `docs/releases/Release_vX.Y.Z.md` | Keep — too valuable to auto-generate | | |
| `.claude-plugin/plugin.json` version | | Replace — pure version bump | |
| README version badge | | Replace — pure version bump | |
| Git tags | | Replace — automated | |
| GitHub releases | | Replace — automated | |
| Release notes template in `release.yml` | | Replace — release-please creates these | |

## Spike Deliverables

1. **Evaluation document** — answers to all questions above with evidence from testing
2. **Prototype branch** — release-please configured on a test branch, with:
   - `.github/workflows/release-please.yml`
   - `release-please-config.json`
   - `.release-please-manifest.json`
   - Conventional commit examples
3. **Decision recommendation** — adopt / adopt-with-modifications / defer
4. **If adopting:** migration plan, conventional commit guide for contributors, updated CONTRIBUTING.md

## Relationship to M-14

[M-14 (Release Automation Enhancement)](https://github.com/product-on-purpose/pm-skills/issues/116) is the broader effort for release workflow improvement. M-21 is a focused spike to evaluate release-please as M-14's implementation vehicle. If the evaluation is positive, M-14 becomes the implementation effort using release-please. If negative, M-14 explores alternatives.

## Estimated Complexity

Low — this is a time-boxed exploration (spike), not an implementation. 2-4 hours for evaluation + prototype.

## References

- [release-please GitHub](https://github.com/googleapis/release-please)
- [release-please-action](https://github.com/googleapis/release-please-action)
- [Conventional Commits spec](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/) (current format)
- M-14 issue: [#116](https://github.com/product-on-purpose/pm-skills/issues/116)

## PRs

TBD
