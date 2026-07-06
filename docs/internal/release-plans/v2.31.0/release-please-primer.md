# Release-please primer: everything to know before approving WS-Z1 (M-21, release automation, issue #136)

**Status:** Reference and teaching document. Nothing here is gated and nothing here is decided.
**Audience:** the repo maintainer, assumed to know this repo deeply and release-please not at all.
**Owner:** Maintainer (reader); drafted alongside the v2.31.0 release-plan bundle, in parallel, at the maintainer's request.
**Type:** Primer, a learning walk-through. Not a spec (no REQ-IDs owned here) and not a plan (no ZD decisions, no work-item table, no gate ledger owned here).
**Created:** 2026-07-03
**Companion docs:** [`plan_v2.31.0.md`](plan_v2.31.0.md) (scope, sequencing, decisions ZD-1 through ZD-5) and [`spec_zero-drift-program.md`](spec_zero-drift-program.md) (the testable requirements REQ-Z1.1 through REQ-Z1.11, interface sketches, the durable CI inventory). Read this primer first if release-please is new to you; read the plan and spec for what actually gets built. Where this primer and those two disagree, the plan and spec are authoritative.

---

## 1. What release-please is and is not

release-please is a tool maintained by Google's open source team (`googleapis`) that automates four mechanical release chores: computing the next version number, inserting a changelog entry, creating the git tag, and creating the GitHub Release. It reads commit history written as Conventional Commits since the last release and does the arithmetic and paperwork a human currently does by hand across G2 and G3 of this repo's 6-gate runbook (Section 8).

It ships two ways. Most teams, and the shape proposed for pm-skills in `spec_zero-drift-program.md`, run it as a GitHub Action (`googleapis/release-please-action@v4`) triggered on every push to main. A standalone CLI (the `release-please` npm package) also exists for anyone who wants to run the same logic locally or from a non-GitHub-Actions CI system. Both read the same two config files described in Section 4.

What it does not do, worth stating plainly because the name invites over-trust:

- **It does not run tests, lint, or any validator.** G0 (pre-tag readiness) and G1 (adversarial review) stay entirely human and Codex work; release-please never touches them.
- **It does not build or publish anything.** No `npm publish`, no PyPI upload, no Docker push. pm-skills does not currently publish to any package registry, so this is moot today, but worth naming for later.
- **It does not decide whether the code is ready to ship.** It has no opinion on quality. It turns already-merged commit history into a release proposal; it never judges whether that history should exist.
- **It does not write the CHANGELOG's prose.** It writes a mechanical, one-line-per-commit skeleton from commit titles. The rich, hand-authored narrative voice this repo's `CHANGELOG.md` is known for (multi-paragraph summaries, file:line citations, cross-references) is not something release-please can produce; Section 7 covers how the two coexist.

One sentence worth keeping: release-please is the release paperwork robot, not a release manager. Every judgment call the runbook makes today stays a human call after it ships; only the bookkeeping moves.

## 2. The mental model: the Release PR as an accumulator

The single idea to internalize: release-please does not cut a release on every push. It maintains one standing, ever-updating pull request that absorbs every qualifying push to main until someone merges it, and merging it is the release.

Concretely, on every push to main (in this repo, that means every squash-merge, since main is linear history):

1. release-please parses every commit made since the last tag it recognizes, reading each commit's Conventional Commits type (`feat`, `fix`, `!`, a `BREAKING CHANGE` footer, and so on; Section 3).
2. It recomputes what the next SemVer version would be if a release were cut right now.
3. If no Release PR is currently open, it opens one, titled something like `chore(main): release 2.31.0`. If one is already open, it updates that same PR in place instead of opening a second one.
4. The Release PR's diff contains the `CHANGELOG.md` insertion (a new `## [2.31.0]` section, Section 7) and every version bump configured under `extra-files` (Section 4).

Ordinary work does not change at all. PRs get reviewed and squash-merged exactly as today. The difference is that, while the Release PR sits open, every further squash-merge folds into it: the pending version can climb (a `feat:` landing after an earlier `fix:` correctly raises the pending bump from PATCH to MINOR), and the CHANGELOG section gains one more line. Nothing is released yet; the Release PR is a live proposal, not a receipt.

Merging the Release PR is the release. When the maintainer reviews it (enriching the CHANGELOG prose first, Section 7) and merges it, release-please's action notices the merge, creates the `v2.31.0` tag at that merge commit, and creates the GitHub Release from the CHANGELOG section. Nothing else triggers a tag; a tag exists only because that specific PR was merged.

```
   squash-merge lands on main (the PR title is the entire commit message)
                        |
                        v
       release-please parses every commit since the last recognized tag
                        |
                        v
     no Release PR open?  ---------->  open "chore(main): release 2.31.0"
     Release PR already open?  ----->  update it in place
                        |                 (bump may rise: fix -> feat lifts
                        |                  PATCH to MINOR; CHANGELOG gains
                        |                  one more generated line)
                        v
     ...ordinary work keeps merging to main; every merge folds into
     the SAME open Release PR, exactly as above...
                        v
     maintainer reviews the open Release PR, enriches the CHANGELOG
     prose by hand (Section 7), then merges it
                        v
     release-please tags v2.31.0 at that merge commit and opens
     the GitHub Release from the CHANGELOG section
```

## 3. Conventional commits in this repo

Because main is linear history via squash merges (one work chunk, one PR, one commit), the PR title becomes the entire commit message release-please ever reads. GitHub's squash-merge defaults to using the PR title as the commit subject; whatever messy WIP commits existed inside the PR disappear at merge time. This makes the PR title load-bearing the moment release-please goes live, in a way it never was before: today a wrong or vague title is a cosmetic annoyance, under release-please it silently changes the computed version.

The bump rules are the Conventional Commits spec itself, not a release-please invention:

| Prefix (already used in this repo's git log) | Meaning | Bump |
|---|---|---|
| `fix:` | a bug fix | PATCH |
| `feat:` | a new capability | MINOR |
| `feat!:` or a `BREAKING CHANGE:` footer | an incompatible change | MAJOR |
| `docs:` | documentation only | no bump |
| `chore:` | maintenance, tooling, dependency bumps | no bump |
| `refactor:`, `test:`, `style:`, `ci:`, `build:`, `perf:` (all present in this repo's history) | no new behavior | no bump by default; whether each shows up in the generated changelog at all is configurable per type via `changelog-sections` (Section 4) |
| `record:` (a house-invented type, not part of the Conventional Commits spec, used in this repo for eval-run logging) | ad hoc | unrecognized: no bump, hidden from the generated changelog unless explicitly mapped |

Five plausible pm-skills PR titles and the bump each would cause:

1. `fix(scripts): correct the off-by-one in check-count-consistency's phase tally` -> **PATCH**.
2. `feat(skills): add foundation-org-overlay-pack skill` -> **MINOR**.
3. `feat(release)!: drop the legacy in-repo marketplace path`, with a `BREAKING CHANGE: installs via the old marketplace.json source no longer resolve; use agent-plugins.` footer -> **MAJOR**. That footer has to survive the squash: GitHub's squash-merge confirmation box lets you edit the commit body, not just the title, so a maintainer deliberately shipping a breaking change adds the footer there.
4. `docs(readme): slim the front door under 400 lines` -> **no bump**.
5. `chore(deps): bump astro to 6.5.0` -> **no bump**.

Two real findings from this repo's own git log worth naming, because they show the gap between today's convention and what release-please needs:

- Several merged commits carry no recognized prefix at all. `v2.29.0: foundation-build-risk-review (pre-build gate) + pm-skill-router (key-free probe) (#212)`, the exact commit that shipped the `foundation-build-risk-review` skill, is one of them. Under release-please, that commit would contribute nothing to the version bump or the generated CHANGELOG section: not an error, just invisible. This is exactly the risk the parallel plan's ZD-3 (PR-title lint) decision exists to catch before it matters.
- The `record(M-31):` commits (eval-run logs) are a real, already-shipped example of a non-standard type. They will need an explicit decision at implementation time: leave them unrecognized (the default), or add a custom `changelog-sections` entry so they get a section of their own.

## 4. Config anatomy

release-please's manifest mode uses two files at repo root:

- **`release-please-config.json`**, behavior: what counts as a package, which files get updated, how the changelog is sectioned.
- **`.release-please-manifest.json`**, state: the current released version for each configured path, so release-please knows what "since the last release" means without re-deriving it from tags every time.

The manifest is bootstrapped at whatever the actual latest shipped tag is at go-live, not at a fixed value written here. As of this primer's drafting the latest tag is v2.29.1; the parallel spec leaves the exact seed as an open question (OQ-1, resolved at go-live depending on whether v2.30.0 has shipped first). Whatever it is, the manifest reads `{ "." : "<that version>" }`.

A complete starter config for pm-skills, tailored to the real files in this repo:

*STARTER config, to be validated in the shadow phase (Section 9).*

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "bootstrap-sha": "<the commit SHA immediately before release-please goes live>",
  "packages": {
    ".": {
      "release-type": "simple",
      "changelog-path": "CHANGELOG.md",
      "changelog-sections": [
        { "type": "feat", "section": "Added" },
        { "type": "fix", "section": "Fixed" },
        { "type": "docs", "section": "Changed", "hidden": true },
        { "type": "chore", "section": "Changed", "hidden": true }
      ],
      "extra-files": [
        { "type": "json", "path": ".claude-plugin/plugin.json", "jsonpath": "$.version" },
        { "type": "json", "path": ".codex-plugin/plugin.json", "jsonpath": "$.version" },
        { "type": "json", "path": ".claude-plugin/marketplace.json", "jsonpath": "$.plugins[0].version" },
        "README.md"
      ]
    }
  }
}
```

*STARTER config, to be validated in the shadow phase (Section 9).*

```json
{
  ".": "2.29.1"
}
```

What each piece does:

- **`$schema`**: purely an editor convenience (autocomplete, validation in VS Code and similar); zero runtime effect.
- **`bootstrap-sha`**: bounds how far back the very first run scans when computing "everything since the last release." Without it, a repo with hundreds of pre-release-please commits could get scanned in full on day one. Set it to the commit right before the workflow goes live.
- **`packages["."]`**: manifest mode supports multiple packages or paths in one repo (useful for multi-package monorepos). pm-skills is a single package rooted at the repo root, so there is exactly one entry, keyed `"."`.
- **`release-type: "simple"`**: tells release-please there is no language-specific version file to bump on its own (no Node-style `package.json`-driven release, no Python `__version__`). This repo's actual `package.json` stays pinned at the deliberately inert `0.0.0`; `simple` mode leaves it alone.
- **`changelog-path`**: already `CHANGELOG.md` at repo root; no change needed.
- **`changelog-sections`**: remaps commit types to the section headers that appear in the generated entry, operationalizing the hybrid strategy explained in Section 7. Tailored here to land on this repo's existing Keep a Changelog vocabulary (`Added`, `Fixed`, `Changed`) instead of release-please's own defaults (`Features`, `Bug Fixes`), and marks `docs`/`chore` hidden so routine commits do not clutter the skeleton the maintainer is about to enrich. Verify the exact default section list against the current release-please docs at implementation time before finalizing this block.
- **`extra-files`**: every file, besides the changelog, that gets the new version string written into it. The three JSON entries use `jsonpath` to target one exact field, confirmed against the real files (`plugin.json` and `.codex-plugin/plugin.json` both carry a top-level `"version"`; `marketplace.json` carries it at `plugins[0].version`, since the marketplace lists exactly one plugin entry). **Update, post-S1:** a fourth entry, a bare `"README.md"` string invoking the Generic updater, used to sit here too; it is gone. Section 5 explains why.

## 5. The annotation system for non-JSON files

JSON files get a precise `jsonpath`; a file like `README.md` has no equivalent structure for release-please to target, so it relies on inline annotations instead. Two forms:

- **Single line: `x-release-please-version`.** Placed as an HTML comment on the same line as a version-shaped token. release-please finds the nearest semver-looking string on that line and replaces it, leaving everything else on the line untouched.
- **Block: `x-release-please-start-version` / `x-release-please-end`.** A paired start and end comment; every version-shaped token found anywhere between the two markers gets replaced. Useful when a version number appears inside content that genuinely spans multiple lines.

**Update, post-S1 (issue #136): README no longer uses either form.** At the time this primer was written and at the v2.31.0 S1 shadow observation, this repo's two real README lines carried these annotations, shown below for their teaching value. The shadow run then surfaced a real bug in the single-line form: `x-release-please-version` finds "the nearest semver-looking string" on its line, and the badge URL's `2.31.0-blue` parses as a valid SemVer version plus a `-blue` prerelease tag, so release-please replaced the whole match and silently dropped `-blue.svg` from the shields.io URL. The fix moves both lines to generator ownership instead (`scripts/gen-derived-surfaces.mjs`, the `pmskills:version-badge` and `pmskills:version-row` markers, sourced from `.claude-plugin/plugin.json`) and removes README.md from `release-please-config.json`'s `extra-files` entirely. The annotation mechanism described below remains accurate as a general release-please capability; README is simply no longer the example that uses it.

Applied (at the time of the v2.31.0 S1 shadow observation) to the two real README lines this repo had then:

```md
<img src="https://img.shields.io/badge/version-2.29.1-blue.svg?style=flat-square" alt="Version"> <!-- x-release-please-version -->
```

```md
| **Current version** | [v2.29.1](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.29.1)           | <!-- x-release-please-version -->
```

Both lines keep their exact surrounding markdown (the `<img>` tag, the table pipes) untouched; only the `2.29.1` token updates. Prefer the single-line form wherever possible, since its blast radius is one line; reach for the block form only for content that genuinely spans multiple lines. (Or, per the update above, prefer generator ownership when a `jsonpath`-addressable source of truth already exists, which is what README moved to.)

One naming collision worth flagging so the two are never confused: `spec_zero-drift-program.md` proposes a different marker family, `pmskills:catalog:start` / `:end` and similar, owned by a new generator (`gen-derived-surfaces.mjs`), which regenerates whole blocks of prose from `skill-manifest.json`. Both look like HTML-comment start and end pairs; they are unrelated tools solving unrelated problems. release-please's `x-release-please-*` annotations only ever touch a version token. The generator's `pmskills:*` markers regenerate entire catalog tables, badges, and quickstart text. Do not let one gate route through the other. (Post-S1, this is no longer a collision to guard against in README specifically, since the generator now owns the version lines too; the distinction still matters for any other file that might one day carry both.)

## 6. The workflow file

*STARTER config, to be validated in the shadow phase (Section 9).*

```yaml
name: release-please

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
```

The `id: release` lets a later step branch on `steps.release.outputs.release_created` (used by a post-tag step the parallel plan's WS-Z2 adds to sync the GitHub About text; out of scope for this primer, see `spec_zero-drift-program.md` REQ-Z1.7).

**The number one gotcha, worth reading twice: a Release PR opened with the default `GITHUB_TOKEN` shows no CI checks at all.**

GitHub deliberately suppresses further workflow triggers when a workflow run's own automatic token is what created a PR or pushed a commit; this stops infinite trigger loops. The consequence here: if `release-please.yml` is left without a real `token:` input (or it is explicitly pointed at `${{ secrets.GITHUB_TOKEN }}`), the Release PR it opens never triggers `validation.yml`. Not a red X, not a warning, no checks at all, as if CI does not exist for that one PR. On a repo whose merges are meant to gate on CI, that is exactly backwards: the one PR that ships a release is the one PR CI never touches.

The fix, tracked as ZD-5 (token/PAT for the action) in the parallel plan and still Open there:

- **A fine-grained personal access token**, scoped to this repository only, with: Contents (read and write), Pull requests (read and write), Issues (read and write, matching the `issues: write` job permission above), and Metadata (read-only, the mandatory baseline every fine-grained PAT carries). Stored as a repository secret and passed as the `token:` input.
- **A GitHub App** installed on the repo with the same effective permissions, whose installation token is generated at job start. More setup, more auditable on a public repo (the app has its own identity in the audit log rather than a personal account).

Verify the exact minimum required scopes against the current `release-please-action` documentation at implementation time; the set above is the commonly documented one, not independently re-confirmed for this primer.

## 7. CHANGELOG interaction

release-please inserts a generated `## [X.Y.Z]` section built mechanically from commit titles, roughly one bullet per `feat:`/`fix:` commit under a `changelog-sections`-mapped header. This repo's actual `CHANGELOG.md` entries are nothing like that: multi-paragraph opening summaries, specific file and line citations, cross-references to skills and validators by name. Handing the file entirely to the generated skeleton would be a visible regression in the project's own voice.

The hybrid strategy, ZD-1 (CHANGELOG strategy under release-please) option A in the parallel plan, resolves this by leaning on a fact many newcomers to release-please miss: the Release PR is not a bot-only artifact. It is an ordinary, fully editable pull request on a real branch. Anyone with write access can push further commits to it, including a hand-edit to `CHANGELOG.md`, before it is merged. So the workflow becomes:

1. release-please opens or updates the Release PR with its mechanical skeleton section, same as always.
2. Before merging, the maintainer checks out that branch (or edits directly in the GitHub web UI) and rewrites the terse, commit-derived bullets into the house's rich prose voice, the same enrichment work already done by hand today, just starting from a nonzero draft instead of a blank page.
3. That edit is pushed to the Release PR's branch like any other commit.
4. The maintainer merges. The GitHub Release body and the tagged CHANGELOG section reflect the enriched text, not the original mechanical draft.

One nuance to verify empirically rather than assume: if another, unrelated squash-merge lands on main while the Release PR is still open (a routine occurrence given this program's expected cadence), does release-please's next resync preserve the maintainer's hand-edit, or does it regenerate the section from scratch and lose it? release-please is designed to respect manual edits to the Release PR, but the exact behavior across every version and every kind of concurrent edit is the sort of detail worth confirming against the current docs and by direct observation during the shadow phase (Section 9), rather than asserting here.

**What happens to `[Unreleased]`.** release-please computes its diff from commit history and tags directly; it never reads a `[Unreleased]` section in the file. This repo's `CHANGELOG.md` currently carries an empty `## [Unreleased]` heading (nothing recorded under it right now). Whether to keep that heading as a place for pre-release manual notes, or retire it entirely since release-please makes it redundant, is an open question for the maintainer to decide, not something this primer resolves.

## 8. Mapping to the 6-gate runbook

The runbook's six gates (defined in `skills/utility-pm-release-conductor/SKILL.md` and walked step by step in [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md)) do not disappear under release-please. Two shrink to almost nothing, one becomes fully automatic, three are untouched.

| Gate | Today (manual) | Under release-please |
|---|---|---|
| G0, pre-tag readiness audit | full validator bundle + pm-skill-auditor | unchanged |
| G1, Codex adversarial review | review of the actual content and code changes | unchanged |
| G2, version bump + CHANGELOG prep | hand-edit 3 manifests + README + write the notes | the 3 manifests move via `extra-files` (Section 4); README's version badge and Current-version row move via `gen-derived-surfaces.mjs` instead, post-S1 (Section 5 update); CHANGELOG gets a mechanical skeleton for free (Section 7) |
| G2.5, re-verify | commit release-prep edits, capture the SHA, re-audit | re-audit the Release PR's branch; the SHA that matters is its merge commit |
| G3, tag and publish | `git tag`, push, `gh release create` | automatic on merging the Release PR |
| G4, post-tag hygiene | CONTEXT markers, plan flipped to SHIPPED | unchanged, still manual, still after the tag exists |

The two gates worth a second look. **G2** does not vanish; its remaining work becomes "open the Release PR, enrich the CHANGELOG prose, and check anything not yet wired into a generator" (see `spec_zero-drift-program.md`'s WS-Z2 and WS-Z3 for the surfaces still needing a human at this stage this release). **G2.5**'s "capture the SHA" instruction still applies; it is simply the Release PR's merge commit on main rather than a manual release-prep commit the maintainer creates themselves.

## 9. Rollout

**Shadow mode first.** The workflow runs on every push to main and opens or updates its Release PR exactly as designed, but nobody merges it. The maintainer keeps cutting the actual release through the existing manual runbook. This is not a partial rollout, it is a full dry run: the point is watching, release after release, whether the shadow Release PR's computed version and generated notes would have matched what the manual process actually produced, with zero hand-fixes needed.

**Cutover criteria.** Per ZD-4 (release-please authority cutover criteria) in the parallel plan, cutover happens once at least one shadow release has matched the manual cut with zero hand-fixes. Only then does merging the Release PR become the actual release mechanism, rather than a parallel exercise running alongside the real one.

**Rollback, at any point.** Nothing here is a one-way door:

- Closing the open Release PR is always safe. The next qualifying push simply reopens it from current state; nothing else on main is affected.
- A mis-cut tag or GitHub Release is deleted the same way any tag is deleted today (`git tag -d` locally, `git push --delete origin vX.Y.Z`, removing the GitHub Release), then the manual runbook finishes the job. This is a recovery path, not a new capability the automation introduces.
- The manual runbook is never deleted. It stays the documented fallback for a release-please outage, an expired token, or a bump the automation gets visibly wrong, indefinitely, even after cutover (see OQ-8 in `spec_zero-drift-program.md`).

**Bounding the first run.** The first time the workflow executes, release-please must decide how far back "since the last release" reaches. Left unbounded on a repo with dozens of tags and hundreds of commits, that first scan is slow and unnecessary. Setting `bootstrap-sha` (Section 4) to the commit right before go-live, together with seeding `.release-please-manifest.json` at the current version, bounds that first scan to exactly the commits that matter.

## 10. FAQ

**What if a PR title wasn't conventional?** It is silently ignored for versioning and changelog purposes, not an error. Section 3 names a real example already in this repo's history. The response is always forward: main is append-only here, so a missed title gets fixed with a follow-up conventional commit or a manual edit to the still-open Release PR, never a rewrite of merged history.

**Can I force a specific version?** Yes. A `Release-As: X.Y.Z` footer in a commit message overrides the computed bump for that package, useful for a deliberate version jump or for correcting a bump the automation got wrong before the Release PR merges.

**Does it support prereleases (rc, beta)?** release-please has configuration for prerelease channels, but pm-skills has never shipped a prerelease tag, so this is unexercised territory for this repo. Verify the current option names against the release-please docs at implementation time if a prerelease need ever comes up; out of scope for WS-Z1.

**How do hotfix patches work?** The same as today's manual patches (v2.27.1 and v2.29.1 are both real examples already in this repo's history), just automated: a `fix:` squash-merge on top of the last tag computes a PATCH bump and the Release PR reflects it. Nothing about how a hotfix is authored changes.

**What happens on a force-push to main?** Not a live concern here. Main is linear history via squash merges with no force-push in normal operation, already a house rule independent of release-please. release-please reads tags and commit history; if main were ever force-pushed, the next run would simply recompute from whatever history exists at that point, but avoiding that scenario is already the existing convention, not a new dependency this program adds.

**Can it manage per-skill SKILL.md versions?** No, and it should not be asked to. `metadata.version` inside a skill's frontmatter is a deliberately separate axis from the repo release version; `docs/internal/skill-versioning.md` documents the decoupling explicitly (a repo release packages many skills, a skill iterates across many releases). release-please only ever touches the repo-level version in the three manifests and the README; skill versioning stays on its own HISTORY.md convention.

**Two PRs merge back to back before anyone looks at the Release PR. Is that a problem?** No, that is the normal case, not an edge case. Both fold into the same still-open Release PR; if a `feat:` lands after an earlier `fix:`, the pending bump correctly rises from PATCH to MINOR without anyone doing anything.

**Does merging the Release PR run the same validators as any other PR?** Only once the token gotcha in Section 6 is actually fixed. With a real PAT or App token in place, the Release PR is an ordinary PR from CI's point of view and `validation.yml` runs on it like any other. Without that fix, it shows no checks at all, which is exactly why Section 6 calls this out loudly.

**What if I want to reword the generated CHANGELOG section before it ships?** That is the entire point of the hybrid strategy in Section 7. Push a rewrite to the Release PR's branch, or edit it in the GitHub web UI, before merging.

**Does this replace the 6-gate runbook?** No. Per Section 8, it automates G2's mechanical parts and all of G3; G0, G1, and G4 stay human judgment calls, and the manual runbook remains the documented fallback per ZD-4, not something this retires.

---

## Notes

- Everything labeled STARTER in this primer (the config, the manifest, the workflow) is illustrative, tailored to this repo's real files but not yet built or run. Validating it is the shadow phase's job (Section 9), not this document's.
- A short list of things this primer flagged as needing a direct check against current release-please documentation, or against direct observation during the shadow phase, rather than being asserted here: the exact default `changelog-sections` visibility (Section 4); the minimum fine-grained PAT scopes (Section 6); whether a manual CHANGELOG edit to an open Release PR survives a concurrent unrelated merge (Section 7); prerelease option names, if ever needed (Section 10); and confirming release-please produces plain `v<version>` tags (not a bare `<version>`) under manifest mode with a `"."` package, matching this repo's existing tag format (also OQ-7 in `spec_zero-drift-program.md`).
- This document does not own any decision. ZD-1 through ZD-5 are decided in `plan_v2.31.0.md`; REQ-Z1.1 through REQ-Z1.11 are the buildable contract in `spec_zero-drift-program.md`. Read those two for what ships; read this one for why release-please behaves the way it does.
- The audit behind this whole program is the 2026-07-04 deep audit (maintainer-local, gitignored); this primer does not restate its findings.
- **Post-S1 amendment (issue #136):** the v2.31.0 S1 shadow observation found that release-please's Generic README updater corrupts the version badge URL (Section 5's SemVer-prerelease parsing bug). The fix, landed after v2.31.0 shipped and ahead of any S2 cutover ruling, moves the README version badge and Current-version row to `gen-derived-surfaces.mjs` ownership and drops README.md from `release-please-config.json`'s `extra-files`. Sections 4, 5, and 8 above are updated in place to describe the new, generator-owned state rather than the annotation-based design this primer originally taught; the original annotation examples are kept, framed as historical (what this repo's README looked like at the time of the S1 observation), since the annotation mechanism itself is still accurate release-please behavior for any file that does use it.
