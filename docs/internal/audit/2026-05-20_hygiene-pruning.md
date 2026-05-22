# docs/internal Hygiene and Pruning Recommendations

**Date:** 2026-05-20
**Scope:** `docs/internal/` - all tracked files
**Total tracked files in scope:** 281

---

## Summary

Three distinct hygiene issues found:

| # | Issue | Files affected | Effort |
|---|-------|---------------|--------|
| 1 | Tracked despite matching `*/_archived/*` gitignore rule | 11 files | Low - one `git rm --cached` batch |
| 2 | `_archive/` (no 'd') not matched by gitignore - should be untracked | 4 files | Low - gitignore + `git rm --cached` |
| 3 | `_working/` tracked with no gitignore coverage | 6 files | Decision needed |
| 4 | Stale mkdocs effort docs - superseded by Astro | 2 files | Move to `_archived/` |

`_LOCAL/` is correctly gitignored - confirmed not tracked. No action needed.

---

## Issue 1: `_archived/` files committed before the gitignore rule

**What happened:** `.gitignore` contains `*/_archived/*`, but these 11 files were committed before the rule was added. Git does not retroactively untrack committed files - the gitignore only prevents future additions.

**Fix:** `git rm --cached` each file. The files remain on disk; only the git index entry is removed.

```bash
git rm --cached \
  "docs/internal/_archived/mkdocs/mkdocs-config.md" \
  "docs/internal/_archived/mkdocs/site-enhancements-plan.md" \
  "docs/internal/_working/distribution/_archived/anthropic-marketplace-submission.md" \
  "docs/internal/_working/distribution/_archived/plugin-directory-submission-draft.md" \
  "docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md" \
  "docs/internal/audit/_archived/2026-05-01_ci-audit_addendum.md" \
  "docs/internal/efforts/design-sprint-skills/_archived/sprint-skills-plugin_design-sprint-implementation-plan.md" \
  "docs/internal/efforts/foundation-sprint-skills/_archived/sprint-skills-plugin_architecture.md" \
  "docs/internal/efforts/foundation-sprint-skills/_archived/sprint-skills-plugin_foundation-sprint-implementation-plan.md" \
  "docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original" \
  "docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md"
```

**Files affected:**

- `docs/internal/_archived/mkdocs/mkdocs-config.md`
- `docs/internal/_archived/mkdocs/site-enhancements-plan.md`
- `docs/internal/_working/distribution/_archived/anthropic-marketplace-submission.md`
- `docs/internal/_working/distribution/_archived/plugin-directory-submission-draft.md`
- `docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md`
- `docs/internal/audit/_archived/2026-05-01_ci-audit_addendum.md`
- `docs/internal/efforts/design-sprint-skills/_archived/sprint-skills-plugin_design-sprint-implementation-plan.md`
- `docs/internal/efforts/foundation-sprint-skills/_archived/sprint-skills-plugin_architecture.md`
- `docs/internal/efforts/foundation-sprint-skills/_archived/sprint-skills-plugin_foundation-sprint-implementation-plan.md`
- `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original`
- `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md`

---

## Issue 2: `_archive/` naming inconsistency - not covered by gitignore

**What happened:** Some directories use `_archive/` (no trailing 'd') instead of `_archived/`. The gitignore rule `*/_archived/*` does not match `_archive/`, so these 4 files are tracked when they should not be.

**Files affected:**

- `docs/internal/efforts/M-19-bundles-to-workflows/_archive/plan_bundles-to-workflows_original.md`
- `docs/internal/release-plans/v2.14.0/_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`
- `docs/internal/release-plans/v2.9.0/_archive/plan_v2.9.0-dual-llm.md`
- `docs/internal/release-plans/v2.9.0/_archive/plan_v2.9.0_original`

**Two options - pick one:**

**Option A (recommended): Normalize the naming, let gitignore handle it**

Rename the four `_archive/` dirs to `_archived/`. Git will auto-ignore them via the existing rule.

```bash
# In each parent dir, rename the subdirectory
git mv "docs/internal/efforts/M-19-bundles-to-workflows/_archive" \
       "docs/internal/efforts/M-19-bundles-to-workflows/_archived"

git mv "docs/internal/release-plans/v2.14.0/_archive" \
       "docs/internal/release-plans/v2.14.0/_archived"

git mv "docs/internal/release-plans/v2.9.0/_archive" \
       "docs/internal/release-plans/v2.9.0/_archived"
```

Then add `*/_archived/*` to gitignore if not already present (it is), and untrack the renamed files.

**Option B: Extend gitignore to cover both spellings**

Add `*/_archive/*` to `.gitignore`, then `git rm --cached` the 4 files. Leaves both conventions in play.

---

## Issue 3: `_working/` is tracked with no gitignore rule

**What it contains (6 tracked files):**

- `docs/internal/_working/agent-component-usage_2026-04-18.md`
- `docs/internal/_working/backlog-aggregated_2026-05-08_claude-sonnet.md`
- `docs/internal/_working/backlog-aggregated_2026-05-08_codex.md`
- `docs/internal/_working/distribution/distribution-channels.md`
- `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md`
- `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`
- `docs/internal/_working/subagents/subagent-implementation-plan_2026-05-10.md`
- `docs/internal/_working/subagents/subagent-strategy_2026-05-07.md`

**Decision needed:** Are these working scratch docs or durable internal references?

- If scratch: add `docs/internal/_working/` to `.gitignore`, then `git rm --cached -r docs/internal/_working/`.
- If durable: leave tracked, consider moving stable content to `docs/internal/efforts/` or promoting the roadmap files to a named effort doc.
- Middle path: keep `distribution/distribution-channels.md` and the subagent strategy docs (still relevant), gitignore the dated backlog-aggregated and roadmap files via pattern.

The `_working/` prefix signals transient, so gitignoring the whole directory is consistent with how `_LOCAL/` is handled.

---

## Issue 4: Stale mkdocs effort docs

**Files:**

- `docs/internal/efforts/launch-mkdocs.md`
- `docs/internal/efforts/launch-mkdocs_execution.md`

**Why stale:** mkdocs was evaluated and abandoned in favor of Astro Starlight (v2.14.0). These effort docs describe a path that was not taken. The spike evidence is in `docs/internal/release-plans/v2.14.0/`.

**Recommendation:** Move to `docs/internal/_archived/mkdocs/` (alongside the gitignored config files already there), then untrack.

```bash
# Move to _archived so they stay locally on disk but leave the index
git rm --cached \
  "docs/internal/efforts/launch-mkdocs.md" \
  "docs/internal/efforts/launch-mkdocs_execution.md"
```

Then move the files on disk to `docs/internal/_archived/mkdocs/` so local history is preserved.

---

## Non-issues (confirmed fine)

- **`docs/internal/_LOCAL/`** - correctly gitignored, zero tracked files. No action.
- **Old release plans v2.2.0 - v2.9.1** - compact historical record, intentionally tracked. No action needed unless disk/index size becomes a concern.
- **`docs/internal/audit/_archived/`** - two files covered by Issue 1 fix above. After that fix, the `_archived/` dir itself drops from the index.

---

## Recommended execution order

1. Issue 1 - batch `git rm --cached` (11 files). Low risk, single commit.
2. Issue 4 - move mkdocs docs on disk, then `git rm --cached` (2 files). Bundle into Issue 1 commit.
3. Issue 2 - normalize `_archive/` to `_archived/` spelling OR extend gitignore. Separate commit to keep rename visible.
4. Issue 3 - decide `_working/` fate. Separate commit after decision.

Total estimated commits: 2-3. No validator impact expected (none of these are skill, command, or doc-site files).
