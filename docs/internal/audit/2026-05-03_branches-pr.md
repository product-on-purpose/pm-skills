# Branches and Pull Requests Status Report

**Date:** 2026-05-03
**Scope:** All local branches in the working tree, all remote branches on `origin`, and all pull requests on the GitHub remote (open, merged, closed)
**Auditor:** Claude (Opus 4.7) at `/effort max`
**Trigger:** User asked for a status report on branches and PRs the day v2.12.0 was tagged

---

## 1. Executive Summary

The PR queue is small, healthy, and almost entirely Dependabot. The branch state is messier and the bigger source of confusion.

**Pull requests.** Three PRs are open, all from Dependabot, all with green CI on `mergeable: CLEAN`, and all 3 to 4 weeks stale (the oldest sat for 27 days, the newest for 19). None has a code review. None has a labeled blocker. They are merge-ready and represent the lowest-risk cleanup available right now.

**Local branches.** Seven branches exist locally besides `main`. Four of them (`feature/f-19-slideshow-creator`, `feature/f-16-mermaid-diagrams`, `docs/mkdocs-site`, `backup/claude-path-cutover-20260303-180752`) are strict ancestors of `origin/main` (zero unique commits). They are leftover post-merge state and safe to delete. The remaining two (`wip/local-agent-context-20260213-173425`, `v2.0-codex`) are 3-month-old snapshots with a small number of unmerged commits each (3 and 1 respectively); both predate the v2.0 baseline and have no clear path back to relevance.

**Remote branches.** Sixteen non-deleted refs on `origin`. Two are infrastructure (`main`, `gh-pages`). Three are active Dependabot proposals (matched to the open PRs). One (`docs/mkdocs-site`) is the rendered MkDocs migration branch from 2026-04-04 that has been fully merged and never deleted. The remaining nine are orphaned `claude/*` branches, each with exactly one unique commit, none with an open or ever-opened PR. Five of them carry "review" or "plan" content that was either superseded or never adopted.

**Release state.** v2.12.0 was tagged today (2026-05-03) and the tag is on `origin` (SHA `fe15cd7`). The release itself shipped per `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md`. However, the working tree still has 2 modified tracked files and 9 untracked items related to the release sequence, which need to be triaged before the next merge.

**Headline recommendations.**

1. Bulk-merge the three Dependabot PRs after a 2-minute safety scan.
2. Delete the four merged-but-undeleted local branches.
3. Decide what to do with the nine orphaned `claude/*` remote branches (likely delete after a one-pass content review of the commits that were never adopted).
4. Triage the working-tree state (commit, stash, or discard).

This audit does NOT execute any deletions or merges. It maps the current state and offers a prioritized action plan. All decisions remain with the maintainer.

---

## 2. Methodology

I ran `git fetch --all --prune` first to make remote state accurate (which incidentally pruned three already-deleted upstream refs: `claude/utility-update-pm-skills-YDWC6`, `dependabot/.../setup-node-6`, `dependabot/.../upload-artifact-7`).

For each ref I captured: SHA, last commit timestamp (absolute and relative), author, subject, ahead/behind versus `origin/main`, and tracking relationship.

For PRs I queried `gh pr list --state all --limit 50` for the recent window plus targeted `gh pr list --search head:claude` to confirm orphan status of remote `claude/*` branches.

For each open PR I pulled `gh pr checks` and `gh pr view --json mergeable,mergeStateStatus,statusCheckRollup,reviewDecision,reviews`.

I cross-referenced branches against PRs by `headRefName` to identify (a) branches with associated merged PRs that were not deleted post-merge, (b) branches with closed-not-merged PRs, and (c) branches with no PR history at all.

I read the v2.12.0 release plan to understand the working-tree context (what was uncommitted is intentional release-prep state versus drift).

---

## 3. Open Pull Requests

Three PRs are open. All are Dependabot dependency bumps for GitHub Actions versions. All are CLEAN/MERGEABLE. None has a human or bot review (`reviewDecision` is empty across the board).

| PR | Title | Author | Created | Age | Files | +/- | CI | Mergeable | Notes |
|----|-------|--------|---------|-----|-------|-----|-----|-----------|-------|
| #139 | ci(deps): bump softprops/action-gh-release from 2 to 3 | dependabot[bot] | 2026-04-14 | 19d | 2 | +2/-2 | All 5 checks pass (Analyze, CodeQL, validate ubuntu, validate windows, validate-plugin) | CLEAN | Used by `release-zips.yml` |
| #130 | ci(deps): bump actions/cache from 4 to 5 | dependabot[bot] | 2026-04-07 | 26d | 2 | +2/-2 | All 4 checks pass (Analyze, CodeQL, validate ubuntu, validate windows) | CLEAN | Used by `validate-docs.yml` and others |
| #129 | ci(deps): bump actions/setup-python from 5 to 6 | dependabot[bot] | 2026-04-07 | 26d | 2 | +2/-2 | All 4 checks pass | CLEAN | Used by `deploy-docs.yml` and `validate-docs.yml` |

### 3.1 Risk per PR

Each is a single-major-version bump on a heavily-used GitHub Action. Major-version bumps occasionally introduce breaking changes (input renames, output format shifts, behavior changes). The migration notes are short and the actions are popular enough that breakage would be flagged in their release notes.

- **#139 (action-gh-release v2 to v3)**: only consumed by `release-zips.yml`, which runs on tag push. A break here would surface on the next release tag (v2.13.0). Worth a quick review of the v2-to-v3 changelog before merging.
- **#130 (cache v4 to v5)**: cache misses are recoverable; the worst case is slower CI runs, not failures. Lowest risk.
- **#129 (setup-python v5 to v6)**: used by docs build and validators. Pyenv default may have changed. Lowest cost to verify; `mkdocs build --strict` either runs or it does not.

### 3.2 Recommendation

**Approve and merge in this order:** #129, #130, #139. Each merge will re-trigger CI on the next, so allow 5 to 10 minutes between merges for the CI surface to clear. Total time: under 30 minutes including a quick changelog skim per action.

If any merge breaks CI, the failure is contained to a single Action and can be reverted with one click.

---

## 4. Local Branches

Seven branches exist locally besides `main`, sorted by recency.

### 4.1 Branch table

| Branch | SHA | Last commit | Age | Author | Tracks remote? | Ahead / behind main | Status |
|--------|-----|-------------|-----|--------|----------------|----------------------|--------|
| `main` | 098771a | 2026-05-03 | 2h | jprisant | yes | 0 / 0 | Current. Working tree dirty (Section 7). |
| `feature/f-19-slideshow-creator` | eabd78d | 2026-04-08 | 4w | jprisant | no (never pushed) | 0 / 50 | Strict ancestor of main; F-19 shipped via direct-to-main commit |
| `feature/f-16-mermaid-diagrams` | 06af8fb | 2026-04-07 | 4w | jprisant | no (never pushed) | 0 / 55 | Strict ancestor of main; F-16 shipped via direct-to-main commit |
| `docs/mkdocs-site` | 7b87ab2 | 2026-04-04 | 4w | jprisant | yes (origin/docs/mkdocs-site) | 0 / 86 | Fully merged. The MkDocs migration that landed in v2.10.0 |
| `backup/claude-path-cutover-20260303-180752` | b2d89ce | 2026-03-03 | 9w | jprisant | no | 0 / 152 | Snapshot before claude-path cutover; fully behind main |
| `wip/local-agent-context-20260213-173425` | 1d38890 | 2026-02-13 | 3mo | jprisant | no | 3 / 170 | Diverged from main; 3 unique commits never merged |
| `v2.0-codex` | bf2238d | 2026-01-26 | 3mo | jprisant | no | 1 / 186 | Pre-v2.0.0 release prep snapshot; 1 unique commit |

(In the ahead/behind columns, "ahead" means commits in `origin/main` not in the branch; "behind" means commits in the branch not in `origin/main`. A branch with `0 / N` is N commits behind main but contains no work main does not have.)

### 4.2 Classification

**Already-merged-not-deleted (4 branches).** `feature/f-19-slideshow-creator`, `feature/f-16-mermaid-diagrams`, `docs/mkdocs-site`, `backup/claude-path-cutover-20260303-180752` are all strict ancestors of `origin/main`. Their content is in main; they exist purely as historical refs. The two `feature/*` branches were the local working state for F-16 (utility-mermaid-diagrams) and F-19 (utility-slideshow-creator), both of which shipped in v2.10.0 (early April). The `docs/mkdocs-site` branch was the parallel migration branch consumed by commit `ba15cb9` "docs(mkdocs): Phase 1 content migration" and the followup. The `backup/` branch is an explicit safety snapshot before a path cutover that completed successfully.

**Stale-and-diverged (2 branches).** `wip/local-agent-context-20260213-173425` (3 unique commits) and `v2.0-codex` (1 unique commit) both predate v2.0.0. Their content has either been superseded or, in the case of `wip/`, was never intended to merge. The "v2.0-codex" branch's HEAD subject is `chore: prepare v2.0.0 release` which is the same content that landed via PR #96 on 2026-01-27.

**Active (1 branch).** Only `main`.

### 4.3 What to do with each

| Branch | Action | Reason |
|--------|--------|--------|
| `main` | Keep | Active branch |
| `feature/f-19-slideshow-creator` | Delete | Fully merged, work shipped in v2.10.0 |
| `feature/f-16-mermaid-diagrams` | Delete | Fully merged, work shipped in v2.10.0 |
| `docs/mkdocs-site` (local) | Delete | Fully merged via squash; remote also stale (Section 5) |
| `backup/claude-path-cutover-20260303-180752` | Delete or rename to a tag | If the safety value has elapsed (cutover happened 2 months ago without rollback), delete. Otherwise keep but the timestamp suffix already serves the same purpose as a tag |
| `wip/local-agent-context-20260213-173425` | Inspect 3 unique commits then delete | The 3 unique commits are 3 months old and described as a snapshot. Before deletion, run `git log origin/main..wip/local-agent-context-20260213-173425` and decide if any commit content should be cherry-picked or memorialized in `_NOTES/` |
| `v2.0-codex` | Inspect 1 unique commit then delete | Likely overlap with the merged v2.0.0 content. Worth a one-line diff check |

### 4.4 Suggested commands (do not execute without review)

```bash
# Verify everything we are about to delete is fully merged
for b in feature/f-19-slideshow-creator feature/f-16-mermaid-diagrams docs/mkdocs-site backup/claude-path-cutover-20260303-180752; do
  echo "=== $b ==="
  git rev-list origin/main..$b  # Should output nothing for fully-merged branches
done

# After verification, delete
git branch -d feature/f-19-slideshow-creator feature/f-16-mermaid-diagrams docs/mkdocs-site backup/claude-path-cutover-20260303-180752
# (-d refuses if not fully merged; use -D only after manual review)

# For the diverged ones, inspect first
git log --oneline origin/main..wip/local-agent-context-20260213-173425
git log --oneline origin/main..v2.0-codex
```

---

## 5. Remote Branches

Sixteen non-`HEAD` refs under `origin/`. Two are infrastructure, three are active Dependabot proposals, and the remaining eleven are stale or orphaned.

### 5.1 Branch table

| Remote branch | SHA | Last commit | Age | Author | Ahead / behind main | Has PR? |
|---------------|-----|-------------|-----|--------|----------------------|---------|
| `origin/main` | 098771a | 2026-05-03 | 2h | jprisant | 0 / 0 | n/a |
| `origin/gh-pages` | e78710b | 2026-05-03 | 23min | github-actions[bot] | n/a (separate root) | Auto-deployed by `deploy-docs.yml` |
| `origin/dependabot/github_actions/softprops/action-gh-release-3` | 6f45926 | 2026-04-14 | 3w | dependabot[bot] | 1 / 29 | PR #139 (open) |
| `origin/dependabot/github_actions/actions/cache-5` | 407414b | 2026-04-07 | 4w | dependabot[bot] | 1 / 66 | PR #130 (open) |
| `origin/dependabot/github_actions/actions/setup-python-6` | 9bbb1c0 | 2026-04-07 | 4w | dependabot[bot] | 1 / 66 | PR #129 (open) |
| `origin/claude/update-readme-changelog-LFR2Y` | 6ef46ff | 2026-04-05 | 4w | Claude | 1 / 67 | NONE |
| `origin/docs/mkdocs-site` | 7b87ab2 | 2026-04-04 | 4w | jprisant | 0 / 86 | (Merged via direct push or squash; no PR found) |
| `origin/claude/review-pr-resubmit-3QUqd` | be7b21e | 2026-03-27 | 5w | Claude | 1 / 105 | NONE |
| `origin/claude/add-mermaid-diagram-builder-NUiH1` | 6965644 | 2026-03-23 | 6w | Claude | 1 / 106 | NONE |
| `origin/claude/update-internal-docs-T2Zfj` | e2d00b5 | 2026-03-22 | 6w | Claude | 6 / 130 | NONE (HEAD is a `Revert` commit) |
| `origin/claude/web-claude-skill-releases-laLnI` | 3262800 | 2026-03-21 | 6w | Claude | 1 / 140 | NONE |
| `origin/claude/improve-release-notes-GI0AZ` | 5d8de48 | 2026-03-04 | 9w | Claude | 1 / 152 | NONE |
| `origin/claude/review-pm-plugins-rXWyF` | 2fcd5e2 | 2026-02-20 | 2mo | Claude | 1 / 159 | NONE |
| `origin/claude/review-releases-2.3-2.4-XYfH3` | 65f555b | 2026-02-17 | 3mo | Claude | 1 / 160 | PR #105 (CLOSED, not merged) |
| `origin/claude/automate-skill-publishing-xyVsK` | 03d96a7 | 2026-01-30 | 3mo | Claude | 1 / 179 | NONE |
| `origin/claude/fantasy-company-examples-qqluC` | c5f4c04 | 2026-01-29 | 3mo | Claude | 1 / 179 | NONE |

### 5.2 Classification

**Infrastructure (2).** `origin/main` and `origin/gh-pages`. Keep.

**Active proposals (3).** All three Dependabot branches are matched to open PRs (Section 3). Keep until PR resolution.

**Merged-not-deleted (1).** `origin/docs/mkdocs-site` is a strict ancestor of `origin/main`. The work landed but the branch was never pruned post-merge.

**Closed PR not deleted (1).** `origin/claude/review-releases-2.3-2.4-XYfH3` was the head of PR #105, which was closed without merging on 2026-03-28. The branch was orphaned at that moment.

**Orphaned with no PR (8).** The remaining `claude/*` branches each carry exactly one commit on top of an ancestor of main and have no PR history (verified via `gh pr list --search head:claude --state all --limit 100`). Their content is largely planning docs, internal review notes, or proposal sketches that were either superseded or quietly abandoned.

### 5.3 Content of the orphaned `claude/*` branches

A 1-line summary of each based on the HEAD subject. Confirming whether the content is truly redundant requires a quick `git show` per branch.

| Branch | HEAD subject | Likely status |
|--------|--------------|---------------|
| `claude/update-readme-changelog-LFR2Y` | "Update README to reflect v2.8.0 to v2.8.2 changelog entries" | Superseded; v2.8.x is now historical and README has been updated through v2.12.0 |
| `claude/review-pr-resubmit-3QUqd` | "feat: add runnable PM agent app for awesome-llm-apps resubmission" | Specific external-submission artifact; if the submission landed elsewhere, this is dead |
| `claude/add-mermaid-diagram-builder-NUiH1` | "docs: add F-12 Mermaid Diagram Builder effort to backlog" | Likely superseded by the actual mermaid-diagrams skill (F-16) shipped in v2.10.0 |
| `claude/update-internal-docs-T2Zfj` | `Revert "docs(milestones): add distilled baseline cleanup summaries..."` | A revert that was never merged; the original probably never landed either, so the revert has no target. Inspect the 6 unique commits before deciding |
| `claude/web-claude-skill-releases-laLnI` | "docs(internal): add web Claude Code release workflow plan" | Internal workflow plan; check whether it was adopted under another name |
| `claude/improve-release-notes-GI0AZ` | "docs: remove internal labels and rewrite release notes for human readability" | Could still be useful as a content draft if release-notes style is being polished; otherwise dead |
| `claude/review-pm-plugins-rXWyF` | "docs(internal): add comparative review of Anthropic's knowledge-work-plugins PM plugin" | Internal review artifact; may be worth memorializing in `_NOTES/` if not already |
| `claude/automate-skill-publishing-xyVsK` | "docs: add implementation plan for automated skill publishing" | 3 months old planning doc; check whether this overlaps with `utility-update-pm-skills` (shipped 2026-04-09) |
| `claude/fantasy-company-examples-qqluC` | "docs: add fantasy-themed PM skills examples" | Likely subsumed by the storevine/brainshelf/workbench thread samples now used across all skills |

### 5.4 Recommendation for remote cleanup

For each orphaned `claude/*` branch, do one of:

- **Salvage**: copy the unique commit content into `_NOTES/orphaned-branches/<branch-name>.md` with a 1-line preamble noting the branch and date. Then delete the remote branch.
- **Delete outright**: if the content is clearly superseded.
- **Reopen as PR**: if anything is still load-bearing, open a fresh PR with current main as base.

The fastest practical approach: a single PowerShell or bash one-liner per branch that calls `git show $branch` and pipes to a per-branch markdown file in `_NOTES/orphaned-branches/`, then the deletes happen as a batch. Total time: 30 to 60 minutes for all 9 (including the closed-PR `review-releases-2.3-2.4-XYfH3`).

Suggested deletion command (only after content review):

```bash
git push origin --delete \
  claude/update-readme-changelog-LFR2Y \
  claude/review-pr-resubmit-3QUqd \
  claude/add-mermaid-diagram-builder-NUiH1 \
  claude/update-internal-docs-T2Zfj \
  claude/web-claude-skill-releases-laLnI \
  claude/improve-release-notes-GI0AZ \
  claude/review-pm-plugins-rXWyF \
  claude/review-releases-2.3-2.4-XYfH3 \
  claude/automate-skill-publishing-xyVsK \
  claude/fantasy-company-examples-qqluC \
  docs/mkdocs-site
```

---

## 6. Branch:PR Cross-Reference

Mapping branches to PRs reveals four patterns worth flagging.

### 6.1 The clean post-merge state

PRs that landed and had their branches properly deleted (no longer in the remote ref list):

- PR #138 `claude/utility-update-pm-skills-YDWC6` (merged 2026-04-09; remote ref pruned during this audit's `git fetch --prune`)
- PR #137 `claude/add-release-history-m4Z1y` (merged 2026-04-07; pruned previously)
- PR #124 `claude/resubmit-plugin-KdbuU` (merged 2026-03-25)
- PR #104 `claude/add-discovery-skill-samples-ymq4L` (merged 2026-02-17)
- PR #102 `claude/review-codex-2.2-XN8C3` (merged 2026-02-13)
- All older Dependabot bumps that merged

This is the desired pattern. Most recent merges (April onward) seem to use it consistently.

### 6.2 The merged-but-undeleted state

`origin/docs/mkdocs-site` is the only remote branch in this state. It is fully merged into main but the branch was never deleted. Probably because the merge happened via direct push or squash from another machine, where the auto-delete-branch-on-merge GitHub setting did not fire.

### 6.3 The closed-without-merge state

PR #105 (`claude/review-releases-2.3-2.4-XYfH3`) was closed on 2026-03-28 without being merged. The branch still exists on the remote. PR #67 and PR #63 (older copilot PRs) follow the same pattern but their branches do not appear in the current remote list, suggesting they were deleted at PR-close time.

PR #105 is the lone closed-but-branch-survives example today.

### 6.4 The pushed-without-PR state

The eight orphaned `claude/*` branches were pushed but never had a PR opened. This is unusual; it suggests they were created from a tooling flow (possibly Claude Code or Web Claude) that pushes branches eagerly and expects the user to open the PR manually if the work is worth it.

The age distribution (1 from late January, 3 from February, 4 from March, 1 from early April) suggests this was the dominant pattern for several weeks before stabilizing into the cleaner direct-push or PR-and-merge flow visible in April onward.

---

## 7. Working-Tree State on `main`

The working tree is dirty as of audit time. This is consistent with v2.12.0 having shipped today and post-release housekeeping not yet committed.

### 7.1 Modified tracked files

```
 M AGENTS/claude/CONTEXT.md
 M AGENTS/claude/DECISIONS.md
```

These are agent-context files that were almost certainly edited during the v2.12.0 release flow. The release plan's status snapshot mentions an `AGENTS/claude/CONTEXT.md refresh` as Done, but the file is shown as still-modified, which indicates either (a) the refresh content was committed and a subsequent unrelated edit dirtied it again, or (b) the refresh was made but never staged.

### 7.2 Untracked items

```
?? docs/internal/audit/2026-05-01_ci-audit_addendum.md
?? docs/internal/audit/audit_repo-structure_2026-05-01.md
?? docs/internal/efforts/F-37-html-template-creator.md
?? docs/internal/efforts/F-37-html-template-creator/
?? docs/internal/efforts/organization-design_2026-04-18.md
?? docs/internal/efforts/tracking-patterns-reference_2026-04-18.md
?? docs/internal/multi-repo-extraction-design_2026-04-19.md
?? docs/internal/multi-repo-patterns-reference_2026-04-19.md
?? docs/internal/release-plans/v2.13.0/
?? docs/internal/skills-ideas/
```

All untracked items live under `docs/internal/`, which is gitignored from the public release per the documentation rules in `CLAUDE.md`. These are working artifacts and can be either committed (recommended for the audit and effort docs) or left untracked indefinitely (acceptable for `_LOCAL/` style scratch).

### 7.3 Recommended triage

| Path | Action |
|------|--------|
| `AGENTS/claude/CONTEXT.md` (modified) | `git diff` to see what changed; commit if intentional |
| `AGENTS/claude/DECISIONS.md` (modified) | Same |
| `docs/internal/audit/2026-05-01_ci-audit_addendum.md` | Commit. This is the refreshed CI audit referenced from the structure audit |
| `docs/internal/audit/audit_repo-structure_2026-05-01.md` | Commit. The structure audit produced 2 days ago |
| `docs/internal/efforts/F-37-*` | Commit. New effort spec |
| `docs/internal/efforts/organization-design_*.md` | Commit. Internal design doc |
| `docs/internal/efforts/tracking-patterns-reference_*.md` | Commit |
| `docs/internal/multi-repo-extraction-design_*.md` | Commit |
| `docs/internal/multi-repo-patterns-reference_*.md` | Commit |
| `docs/internal/release-plans/v2.13.0/` | Commit. Next release plan stub |
| `docs/internal/skills-ideas/` | Inspect first; may contain `_LOCAL/` subfolders that should stay untracked |

This audit file (`docs/internal/audit/branches-pr_2026-05-03.md`) will join the same uncommitted set when written.

---

## 8. v2.12.0 Tag State

The v2.12.0 tag exists locally and on the remote at the same SHA, confirming the release was published.

```
v2.12.0 -> fe15cd7db046aa998ccc9524cdac9f96522eba86 (local and origin)
v2.11.1 -> 91eb7b2b052922b128ae3b860685cc394727e659 (local and origin)
```

The release plan's last status row reads `Tag and push | Pending (final step after round-3 confirmation result lands)`. The tag is on origin so this row is now stale and can be marked Done when the plan is next touched.

The most recent commit on `main` (`098771a docs: round-4 codex resolution + Phase 0 loop termination`) appears to be a post-tag commit. `git tag --contains 098771a` would confirm whether v2.12.0 is at this commit or one before. Based on the release plan referencing 4 review rounds and the commit subject naming round 4, the tag is likely at the prior commit (`67f0239 docs: v2.12.0 release-doc audit + round-3 codex resolution`).

If the tag is at `67f0239`, then `098771a` is a post-tag follow-up that should ship in a v2.12.1 patch or be amended into v2.12.0 with a force-tag (the latter being undesirable on a published tag). Worth verifying.

---

## 9. Recommendations, Prioritized

### Tier 1: High value, low risk (do these first)

1. **Merge the three Dependabot PRs** (#129, #130, #139) in that order, with a 5 to 10 minute gap between merges to let CI clear. Total time: under 30 minutes.
2. **Delete the four merged-not-deleted local branches**: `feature/f-19-slideshow-creator`, `feature/f-16-mermaid-diagrams`, `docs/mkdocs-site` (local), `backup/claude-path-cutover-20260303-180752`. Use `git branch -d` so git refuses if any are not actually fully merged.
3. **Delete `origin/docs/mkdocs-site`** along with the same. The remote and local are at the same SHA and both fully merged.
4. **Verify v2.12.0 tag location** with `git tag --contains <sha>` and decide whether `098771a` belongs in the v2.12.0 tag (force-update is risky; a v2.12.1 patch is safer).

### Tier 2: Medium effort, hygiene benefit

5. **Triage and commit the working-tree state** per Section 7.3. Most items are commits-worth on first pass; the `docs/internal/skills-ideas/` folder needs a peek inside to confirm no `_LOCAL/` paths slip in.
6. **Salvage-then-delete the orphaned `claude/*` branches** per Section 5.4. Either copy the unique commits to `_NOTES/orphaned-branches/<branch>.md` or confirm they are superseded and delete outright. Time: 30 to 60 minutes.
7. **Inspect and decide the two diverged local branches** (`wip/local-agent-context-20260213-173425`, `v2.0-codex`). Both are 3 months old; their unique commits are 3 and 1 respectively, easy to diff and decide.

### Tier 3: Durable improvements

8. **Enable GitHub auto-delete branches on merge** if not already set. The April onward merges look clean; the older orphan pattern suggests the setting was added later or only applies to the `merge` button (not direct push). Confirm in repo Settings > General > Pull Requests.
9. **Add a `branch-cleanup` workflow** that runs weekly and lists branches with no PR, no recent commit, and merged-into-main status. Could be advisory-only at first. This catches the orphan pattern before it accumulates.
10. **Add a Dependabot grouping config** (`open-pull-requests-limit` and `groups:` in `.github/dependabot.yml`) so multiple GitHub Actions bumps land in a single PR rather than three. Reduces queue noise.

### Tier 4: Aspirational

11. **Move `_NOTES/orphaned-branches/`** under a structured `docs/internal/orphans/` if salvage is adopted. Today there is no such folder; making one signals that "we deleted the branch but kept the content."
12. **Annotate the three remaining special branches** (`v2.0-codex`, `wip/local-agent-context-*`, `backup/claude-path-cutover-*`). If kept, give them a one-line README in their commit message or in a top-level `BRANCHES.md` so future contributors know why they exist.

---

## 10. Open Questions for the Maintainer

1. **Auto-delete on merge.** Is the GitHub repo setting `Automatically delete head branches` enabled? If yes, how did the orphan `claude/*` branches escape (suggests they were pushed without PRs, which the setting cannot help with). If no, enabling it would prevent future merged-not-deleted state.
2. **Orphaned `claude/*` provenance.** What tool or workflow created the `claude/*` branches? They appear to be from a Web Claude or Claude Code flow that pushes eagerly. Knowing the source helps decide whether to (a) tighten the workflow so PRs get opened automatically, (b) accept ephemeral branches and rely on a cleanup job, or (c) point the flow at a non-default base ref so the orphans live somewhere intentionally short-lived.
3. **The diverged WIP branch.** `wip/local-agent-context-20260213-173425` has 3 unique commits from before v2.0.0. Are any of those snapshots load-bearing for any current investigation, or can they be discarded?
4. **The closed-not-merged PR #105.** The branch `claude/review-releases-2.3-2.4-XYfH3` and PR #105 (a v2.3.x to v2.4.x release review) were both closed without merging. The content may still be useful as historical context. Did the review get filed somewhere else, or does it need rescuing into `docs/internal/`?
5. **Dependabot grouping appetite.** Three open Action-bump PRs is small enough to merge by hand, but if the cadence picks up (the next bump cycle could land 4 to 6 at once), grouping them into a single PR via `.github/dependabot.yml` config would reduce queue size. Is this preferred, or does the current 1-PR-per-bump granularity have value?
6. **v2.12.0 tag and post-tag commit.** Commit `098771a docs: round-4 codex resolution + Phase 0 loop termination` was authored 2026-05-03 (today). If it lands in v2.12.0, was the tag re-pointed (force update on origin)? If the tag is at the prior commit, this content needs a v2.12.1 patch tag or to be carried into v2.13.0 release notes.

---

## 11. Confidence Notes

- **High confidence:** PR state, CI status, branch ahead/behind counts, branch authorship, remote ref list. All sourced directly from `git` and `gh` at audit time.
- **Medium confidence:** Tag-versus-commit alignment for v2.12.0. I observed the tag SHA on both local and remote but did not run `git tag --contains` on each post-tag commit to confirm the exact tag pointer. Section 8 recommendation is to verify before acting.
- **Lower confidence:** The "likely status" column for orphaned `claude/*` branches in Section 5.3. These are inferences from HEAD subjects, not from full diff inspection. A 30-second `git show <branch>` per branch would upgrade these to high confidence and is recommended before any deletion.

---

## 12. Adjacency: Related Work Already in Flight

For context, the following items are visible in the working tree and may interact with this audit's recommendations:

- `docs/internal/release-plans/v2.13.0/` (untracked) is the next release plan stub. Branch hygiene is not on the v2.13.0 critical path per the v2.12.0 plan's deferral table, but Tier 1 cleanup here would shrink the surface the v2.13.0 release work has to navigate.
- `docs/internal/efforts/F-37-html-template-creator.md` (untracked) is a new effort spec. Not branch-related.
- `docs/internal/audit/2026-05-01_ci-audit_addendum.md` (untracked) refreshes the CI audit and proposes (per the prior audit's Section 14) several new validation scripts. None of those are about branch lifecycle. A `branch-cleanup-advisory.sh` script would be a natural new addition under that surface (Tier 3 recommendation 9 above).

The repo-structure audit (`docs/internal/audit/audit_repo-structure_2026-05-01.md`) is the most recent peer artifact to this report. That audit found 14 follow-up items grouped into 4 phases. None of its recommendations conflict with this audit's; the surfaces are fully orthogonal.

---

*Audit produced 2026-05-03 by Claude (Opus 4.7) at /effort max. Data captured from `git` and `gh` at audit time after a `git fetch --all --prune`. No branches were deleted, no PRs were merged, and the working tree was not modified by this audit (the audit file itself is the only addition). All deletion and merge commands shown are suggestions for the maintainer to execute or adapt.*
