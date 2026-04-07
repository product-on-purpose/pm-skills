# Cross-LLM Review: Rename Plan — `_bundles` → `_workflows`

**Document:** `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md`
**Document type:** impl-plan
**Date:** 2026-04-06
**Requestor:** Claude Opus 4.6 | **Reviewer:** Codex (GPT-5.4) | **Human:** jprisant

---

## Reviewer Assessment

> **Reviewer — Codex (2026-04-06):** The plan is directionally strong but not execution-ready. The largest structural problem is that M-19 and F-13 scopes are blurred throughout — Section B, 6 of the 13 acceptance tests, and the Implementation Sequence all assume the combined v2.9.0 end state rather than M-19 in isolation. Two acceptance tests reference files that do not exist in the repo. The `/kickoff` alias mechanism conflicts with the command validator. Reference counts are stale.

| Severity | Count |
|----------|-------|
| Blocker  | 4     |
| Major    | 8     |
| Minor    | 1     |
| Note     | 0     |

## Requestor Analysis & Proposed Actions

> **Requestor — Claude Opus 4.6 (2026-04-06):** I agree with 12 of 13 findings and independently verified the factual claims (CI filename, validator behavior, CHANGELOG divergence, reference counts, MCP resource test). I would reclassify 2 of the 4 Blockers as Major — Findings 5 and 9 are real but resolvable with sentence-level fixes, not structural redesign. The root cause of most findings is one thing: the plan was written for v2.9.0 as a whole, not M-19 in isolation. One structural fix (split ATs into M-19-only and v2.9.0-release groups) resolves Findings 1, 5, 6, 9, 11, and partially 2. Three items require human decisions.

**Adjusted severity after requestor analysis:**

| Severity | Reviewer | Requestor | Delta |
|----------|----------|-----------|-------|
| Blocker  | 4        | 2         | -2 (Findings 5, 9 → Major) |
| Major    | 8        | 10        | +2 |
| Minor    | 1        | 1         | — |

### Recommendations

1. **Split acceptance tests into M-19-only and v2.9.0-release groups.** Rewrite AT-1/2/3/5/6/9/10 to verify the 3 renamed workflows only. Move 9-workflow, new-command, generation-script, and MCP checks to F-13 or a v2.9.0 release verification section. This resolves Findings 1, 5, 6, 9, 11. (Blocker)

2. **Specify the `/kickoff` alias mechanism.** Either keep `kickoff.md` as a full command file with its own skill references (duplicating content), or update `validate-commands.ps1` to accept command-to-command redirects. Requires human decision. (Major)

3. **Re-run the grep inventory before execution.** Record the exact command and date. Refresh the tier tables with live counts. Fix the CI filename (`validation.yml` not `validate.yml`), remove AT-9's nonexistent script reference, and correct the stale effort-directory path. (Major)

### Decisions for jprisant

| # | Question | Context | Section |
|---|----------|---------|---------|
| 1 | **`/kickoff` alias:** full duplicate command file or validator update? | `validate-commands.ps1` line 8 requires `skills/.../SKILL.md` references. A thin alias will fail validation. **Option A:** Keep `kickoff.md` as full command file with skill refs (simpler, no validator change, creates duplication). **Option B:** Update validator to accept command-to-command aliases (cleaner long-term, increases M-19 scope). | S2, Finding 3 |
| 2 | **Repo-path compatibility:** stub files or documented breaking change? | URL redirects only cover docs site. GitHub repo links to `_bundles/` in external bookmarks/blog posts will break. **Option A:** Add `_bundles/README.md` stub saying "Moved to `_workflows/`" (low effort, catches git-link visitors). **Option B:** Release notes callout only (simpler, accepts breakage). | S7, Finding 13 |
| 3 | **Terminology guard severity:** advisory or blocking post-v2.9.0? | Guard script is advisory (WARN) during transition. Post-v2.9.0, new "bundle" references are likely errors. **Option A:** Promote to FAIL after v2.9.0 ships (prevents regression, requires maintaining exception list). **Option B:** Keep advisory permanently (less maintenance, accepts some drift). | S7 |

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer. Your job is to find problems, inconsistencies, gaps, and risks in this implementation plan. You are not here to validate — you are here to pressure-test.

**Key principles:**
- Disagreement is more valuable than agreement
- If you find nothing wrong in a section, say so explicitly and explain WHY — don't skip it
- If you find nothing wrong anywhere, that's suspicious — look harder
- Rate your confidence — low-confidence concerns are still worth noting
- Cite specific evidence for every finding (section numbers, quotes, file paths)

**Source documents:**

| Document | Path | Role |
|----------|------|------|
| Rename plan (primary) | `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` | Document under review |
| v2.9.0 release plan | `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` | Parent release plan — orchestrates M-19 (rename) + F-13 (expansion) |
| M-19 effort brief | `docs/internal/efforts/M-19-bundles-to-workflows.md` | Effort-level summary |
| F-13 effort brief | `docs/internal/efforts/F-13-workflow-expansion.md` | Dependent effort — 6 new workflows that land after M-19 |
| CI: validate-docs | `.github/workflows/validate-docs.yml` | CI that must have path triggers updated |
| CI: deploy-docs | `.github/workflows/deploy-docs.yml` | CI that must have path triggers updated |
| CI: sync-agents-md | `.github/workflows/sync-agents-md.yml` | CI with hardcoded bundle table generation |
| CI: validation | `.github/workflows/validation.yml` | Main validation workflow (commands, agents-md) |
| Command validator | `scripts/validate-commands.ps1` | Validates command files — relevant to `/kickoff` alias |
| MCP workflows module | `E:\Projects\product-on-purpose\pm-skills-mcp\src\workflows\index.ts` | Downstream MCP impact |
| mkdocs config | `mkdocs.yml` | Nav and plugin configuration |

**Finding format:** Use this exact format for every finding:

- [Severity | Confidence] Description with evidence woven in.
  Source says "X" (Section N) but also says "Y" (Section M). → Recommendation.

**Severity definitions:**
- **Blocker** — Must resolve before proceeding. Will cause incorrect results or structural failure.
- **Major** — Should resolve before proceeding. Significant gap that causes confusion or rework.
- **Minor** — Can defer. Real issue but won't prevent the work from succeeding.
- **Note** — Observation or suggestion. No action required but worth considering.

---

## Document Under Review

The plan is 443 lines. A summary of key claims and structure follows; the full document is at the path above.

**What this plan does:** Renames the "bundles" concept to "workflows" across the pm-skills repository (~399 references, ~106 files) and coordinates a downstream cosmetic cleanup in pm-skills-mcp (~14 files). It introduces a `/workflow-` command prefix for namespace protection and adds URL redirects for the docs site.

**Structure:**
- Decisions table (9 decisions with rationale)
- Impact Inventory: Section A (directory/file renames), Section B (new command files), Section C Tiers 1-6 (file updates by severity)
- pm-skills-mcp Impact section (files to update, what stays the same, coordination timing)
- New CI to Add (terminology guard script, updated path triggers, AGENTS.md sync workflow)
- Implementation Sequence (Option A: single atomic commit vs Option B: two-phase)
- Acceptance Tests (AT-1 through AT-13)
- What NOT to Change (6 categories of excluded files)
- Risk Assessment (7 risks with mitigations)
- URL Redirect Plan with AT-13

**Key claims to validate:**
1. The scope is ~399 references across ~106 files in pm-skills — and the tier tables in Section C should account for this total.
2. The MCP server is "90% aligned" — only internal type names (`WorkflowBundle` → `Workflow`) and comments change, with zero user-facing API impact.
3. A single atomic commit (Option A) is recommended over two-phase, described as "mechanical find-and-replace with targeted exceptions."
4. The `mkdocs-redirects` plugin will handle URL breakage for the 3 existing bundle doc-site URLs.
5. The terminology guard script (`check-stale-bundle-refs.sh`) with known exclusions will catch regression post-rename.
6. The `/kickoff` command can be "retained as alias → points to workflow-feature-kickoff" — but the plan does not specify the alias mechanism.
7. `docs/changelog.md` is described as appearing to be "a copy" of `CHANGELOG.md` (Tier 2, line 93).
8. The acceptance tests AT-1 through AT-13 are sufficient to verify the rename is complete. Several ATs reference 9 workflows (e.g., AT-1: "9 `.md` files"), but M-19 alone only renames the existing 3 — the additional 6 come from the dependent F-13 effort.
9. Historical release notes (v2.0 through v2.8.x) and archived working docs should be left unchanged.
10. Tier 4 references `docs/internal/efforts/workflows/*.md` — but these files were moved to `F-13-workflow-expansion/` during the planning session and no longer exist at that path.

---

## Findings

### 1. Plan Traceability

*Verifying that goals, requirements, and work items connect end-to-end — from the stated motivation through to every deliverable and acceptance test. If items are inventoried but not tested, the effort can appear complete while leaving stale references.*

> **Disposition:** [blank — human fills in: accept / reject / defer]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] The M-19 plan is not traceable as a standalone effort because Section B and the acceptance tests already include F-13 deliverables. Source says there are "6 new workflows + 1 rename" and `_workflows/` should contain "9 `.md` files" (Sections B and AT-1/AT-2), but the parent release plan says Commit 1 is "Pure rename — no new content" and Commit 2 adds the 6 new workflows and commands ([docs/internal/release-plans/v2.9.0/plan_v2.9.0.md](../../release-plans/v2.9.0/plan_v2.9.0.md):201-202). → Recommendation: split M-19 success criteria down to the 3 renamed existing workflows and move expansion deliverables to F-13.

- [Major | Medium] The acceptance coverage does not trace to the plan's own exclusion rules. Source says historical releases, archived working docs, issue archives, and sample-library content should remain unchanged ("What NOT to Change" and terminology-guard exclusions), but AT-8 requires a raw `grep` across `docs/` with zero `_bundles` matches (AT-8), which will also scan internal planning docs and historical release notes that the plan explicitly preserves. → Recommendation: make AT-8 reuse the same exclusion set as the terminology guard, or narrow the search scope to post-rename public surfaces only.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 1 (Blocker):** Agree. This is the root cause of most findings in this review. The plan was authored for the combined v2.9.0 end state during an incremental conversation, not designed as a standalone M-19 effort document. Section B ("6 new workflows + 1 rename") belongs entirely in F-13. The ATs that reference 9 workflows belong in a v2.9.0 release verification section. The fix is structural: rewrite Section B to cover only the 3 existing workflow renames plus the `/kickoff` → `/workflow-feature-kickoff` rename, and split the 13 ATs into two groups — "M-19 completion" (3 renamed workflows, CI triggers, redirects, terminology guard) and "v2.9.0 release verification" (9 workflows, generation script, MCP compat). See Proposed Actions #1.

**Re Finding 2 (Major):** Agree. AT-8's raw `grep -r "_bundles" docs/` will match historical release notes that the "What NOT to Change" section explicitly preserves. The AT and the exclusion policy contradict each other. Fix: AT-8 should use the same exclusion patterns as the terminology guard script, or scope the grep to only the directories that M-19 modifies. See Proposed Actions #2.

---

### 2. Work Item Completeness

*Verifying that work items are specific enough for an agent to execute without clarifying questions. Key concerns: the `/kickoff` alias mechanism is unspecified, Tier 3 changes say "Bundle references → workflow" without specifying whether this is mechanical or contextual, and the terminology guard script is pseudocode only.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Major | High] The `/kickoff` alias is underspecified, so two agents could implement materially different files and both believe they satisfied the plan. Source says "`/kickoff` (retained as alias → points to workflow-feature-kickoff)" (Decision table and Section B), but the current command validator only accepts command files that contain real `skills/.../SKILL.md` references ([scripts/validate-commands.ps1](../../../../scripts/validate-commands.ps1):5-40), and the existing [commands/kickoff.md](../../../../commands/kickoff.md) is a full multi-skill workflow doc, not a redirect stub. → Recommendation: specify the exact contents of `commands/kickoff.md` after the rename and how it continues to satisfy validation.

- [Major | High] The terminology-guard work item is not executable as written because it points to a workflow file that does not exist. Source says "Add as advisory check in main `validate.yml` workflow" (New CI to Add), but this repo has `.github/workflows/validation.yml` and no `.github/workflows/validate.yml`. → Recommendation: name the actual target workflow file and add the intended job/step shape, not just pseudocode.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 3 (Major):** Agree. Independently verified: `validate-commands.ps1` line 8 does `[regex]::Matches($content, "skills/[a-z0-9-]+/SKILL\.md")` and fails any file with zero matches. The existing `commands/kickoff.md` passes because it contains 4+ direct skill references. A thin "see workflow-feature-kickoff" alias will fail validation. This requires a human decision — see Decisions table #1. The plan must specify the chosen mechanism before execution. See Proposed Actions #3.

**Re Finding 4 (Major):** Agree. Verified: the repo has `.github/workflows/validation.yml`, not `validate.yml`. Simple fix. See Proposed Actions #4.

---

### 3. Dependency/Ordering

*Verifying that task dependencies are correctly identified and sequencing is sound. Key concern: the parent release plan defines M-19 as Commit 1 (rename only, 3 workflows) and F-13 as Commit 2 (6 new workflows), but many acceptance tests in this M-19 plan reference 9 workflows — blurring the boundary between the two efforts.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] The sequencing recommendation conflicts with the parent release plan. Source says Option A (single atomic commit) is "Recommended" because the rename is "mechanical" (Implementation Sequence), but the parent release plan defines a "Two-commit strategy" where Commit 1 is M-19 rename-only and Commit 2 is F-13 expansion ([docs/internal/release-plans/v2.9.0/plan_v2.9.0.md](../../release-plans/v2.9.0/plan_v2.9.0.md):197-215). → Recommendation: make M-19 explicitly follow the parent two-commit strategy or update the parent plan so the sequencing matches in one place.

- [Major | High] AT-9 is ordered against a file that does not exist in the current repo or in the parent plan's Commit 1 scope. Source says "`scripts/generate-bundle-pages.py` renamed to `scripts/generate-workflow-pages.py`" (AT-9), but the current repo has no `scripts/generate-bundle-pages.py`, and the parent release plan says Commit 2 creates `scripts/generate-workflow-pages.py` as new F-13 tooling ([docs/internal/release-plans/v2.9.0/plan_v2.9.0.md](../../release-plans/v2.9.0/plan_v2.9.0.md):217-220). → Recommendation: remove AT-9 from M-19 or rewrite it around the actual current-state file inventory.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 5 (Blocker → I'd reclassify as Major):** Agree the conflict exists, but I'd downgrade to Major. The parent plan (`plan_v2.9.0.md`) is the sequencing authority. The M-19 plan's "Option A: single atomic commit" recommendation was written before the parent plan's two-commit strategy was finalized. The fix is a sentence-level update: change the Implementation Sequence to say "M-19 ships as a single commit (Commit 1 per the release plan). The 'single atomic commit' recommendation refers to M-19's own scope — all rename work in one commit — not the entire v2.9.0 release." This is a documentation inconsistency, not a structural impossibility. See Proposed Actions #5.

**Re Finding 6 (Major):** Agree. AT-9 references `generate-bundle-pages.py` which doesn't exist in the repo and belongs to F-13's Commit 2 scope. Remove AT-9 from M-19 entirely. See Proposed Actions #6.

---

### 4. Decision Log Coherence

*Verifying that the 9 decisions in the Decisions table are internally consistent and don't conflict with other parts of the plan. Key concerns: the `/kickoff` alias decision may conflict with the command validator, the `docs/changelog.md` characterization as "a copy" may be factually wrong, and the MCP type renames are described as non-breaking but change the TypeScript API surface.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Major | High] The MCP decision log understates the code impact and blurs "tool API" stability with TypeScript export stability. Source says the MCP rename is "almost entirely cosmetic ... just internal type names (`WorkflowBundle` → `Workflow`) and comments" with "No user-facing MCP API changes at all" (pm-skills-mcp Impact), but [pm-skills-mcp/src/workflows/index.ts](E:/Projects/product-on-purpose/pm-skills-mcp/src/workflows/index.ts) currently exports `WorkflowBundle`, `WORKFLOW_BUNDLES`, `getWorkflowBundle()`, and `listWorkflowBundles()`, and [pm-skills-mcp/src/server.ts](E:/Projects/product-on-purpose/pm-skills-mcp/src/server.ts) plus [pm-skills-mcp/tests/workflows.test.ts](E:/Projects/product-on-purpose/pm-skills-mcp/tests/workflows.test.ts) import/use those names. → Recommendation: keep the "no MCP tool-name break" claim, but describe the change as a source/API refactor inside the MCP repo rather than comment-only cleanup.

- [Minor | High] The plan's `docs/changelog.md` characterization is factually wrong. Source says `docs/changelog.md` is "Same as CHANGELOG.md (appears to be a copy)" (Tier 2), but the two files already diverge: their hashes differ, and `docs/changelog.md` includes 2.8.1/2.8.2 entries that `CHANGELOG.md` does not. → Recommendation: treat them as separate artifacts and spell out the intended v2.9.0 edit in each file.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 7 (Major):** Agree. The "cosmetic" characterization is misleading. `WorkflowBundle`, `WORKFLOW_BUNDLES`, `getWorkflowBundle()`, and `listWorkflowBundles()` are exported TypeScript symbols — changing them is a source API refactor, not a comment cleanup. However, the "no user-facing MCP tool-name break" claim remains valid: `pm_workflow_*` tool names and IDs are unchanged. Fix: update the MCP Impact section to say "source-level API refactor" not "cosmetic." See Proposed Actions #7.

**Re Finding 8 (Minor):** Agree. Independently verified: `CHANGELOG.md` is 38,480 bytes, `docs/changelog.md` is 34,683 bytes — they're separate files with divergent content. Treat as two independent update targets. See Proposed Actions #8.

---

### 5. File Inventory Accuracy

*Verifying that referenced files, paths, and structures exist in the repo as described. Key concerns: Tier 4 references a stale path (`docs/internal/efforts/workflows/`), reference counts may not sum to the claimed ~399, and some files listed may not exist (e.g., `QUICKSTART.md` at root).*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] Tier 4 and AT-1 reference a directory that does not exist. Source says internal effort files live under `docs/internal/efforts/workflows/*.md` and that `docs/internal/efforts/workflows/` should exist after M-19 (Tier 4 and AT-1), but the live repo has [docs/internal/efforts/F-13-workflow-expansion](../F-13-workflow-expansion/) and [docs/internal/efforts/M-19-bundles-to-workflows](.) while `docs/internal/efforts/workflows/` is absent. → Recommendation: update the inventory and acceptance test to the current effort-directory structure.

- [Major | High] Several concrete file counts/targets in the inventory are already stale, which weakens confidence in the claimed "~399 references across ~106 files." Source says `validate-docs.yml` and `deploy-docs.yml` each have 2 `_bundles` refs and the new guard belongs in `validate.yml` (Tier 1 / New CI to Add), but the live files each have 1 `_bundles/**` trigger and the actual workflow file is `.github/workflows/validation.yml`; AT-9 also targets nonexistent `scripts/generate-bundle-pages.py`. → Recommendation: rerun the inventory from the live tree and refresh the tables before anyone executes the plan mechanically.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 9 (Blocker → I'd reclassify as Major):** Agree the path is stale and AT-1 is impossible as written. Already partially fixed during the planning session (we moved files from `efforts/bundles/` to `F-13-workflow-expansion/`), but residual references remain in Tier 4 and AT-1. However, I'd downgrade from Blocker to Major: this is a stale reference that makes one acceptance check fail, not a structural design flaw. The fix is mechanical — update the path to `F-13-workflow-expansion/` or remove from M-19 scope entirely (since those draft files belong to F-13). See Proposed Actions #9.

**Re Finding 10 (Major):** Agree. Independently verified: `validate-docs.yml` has 1 `_bundles` reference (plan said 2), `deploy-docs.yml` has 1 (plan said 2), `README.md` has 33 case-insensitive matches (plan said 29). The ~399 headline total was an approximate from an agent grep at session start; the plan has been edited multiple times since. Fix: add a caveat that counts are approximate and must be re-verified from live tree before execution. See Proposed Actions #10.

---

### 6. Success Criteria

*Verifying that the 13 acceptance tests (AT-1 through AT-13) are measurable, unambiguous, sufficient, and scoped to M-19 (not accidentally testing F-13). Key concerns: AT-9 references a script that doesn't exist yet, AT-10 tests MCP which is a different repo, and AT-8's grep directory list may be incomplete.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] The acceptance tests are scoped to the post-F-13 world, not to M-19. Source says AT-1/AT-2/AT-3/AT-5/AT-6 require 9 workflows, 6 new `workflow-*` commands, and README/AGENTS state that says "9 workflows" (Acceptance Tests), but the parent plan says M-19 Commit 1 is rename-only, F-13 Commit 2 adds the 6 workflows, and MCP parity is "Deferred" to a follow-up release ([docs/internal/release-plans/v2.9.0/plan_v2.9.0.md](../../release-plans/v2.9.0/plan_v2.9.0.md):38, 201-202). → Recommendation: rewrite M-19 acceptance tests around renamed existing assets only, and move 9-workflow/MCP-expansion checks to F-13 or the downstream MCP release plan.

- [Major | High] AT-10 contains a specific false requirement for pm-skills-mcp resources. Source says `tests/resources.test.ts` should update `pm-skills://bundles/` → `pm-skills://workflows/` (pm-skills-mcp Impact), but the same section also says resource URIs stay `pm-skills://skills/*` because "workflows aren't exposed as resources," and the current [pm-skills-mcp/tests/resources.test.ts](E:/Projects/product-on-purpose/pm-skills-mcp/tests/resources.test.ts) assertion is that `pm-skills://bundles/feature-kickoff` returns `null`. → Recommendation: remove this test rewrite from the plan and keep resource-URI behavior unchanged.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 11 (Blocker):** Agree. Same root cause as Finding 1. The ATs were written for v2.9.0 end state, not M-19 completion. AT-1/2/3/5/6 all reference 9 workflows, 6 new commands, etc. Fix: split into "M-19 completion" (3 renamed workflows, CI triggers updated, redirects working, alias working, terminology guard passing) and "v2.9.0 release verification" (9 workflows, generation script, full nav, MCP). See Proposed Actions #1.

**Re Finding 12 (Major):** Agree. Verified: `tests/resources.test.ts` line 92 asserts that `pm-skills://bundles/feature-kickoff` returns null — it's testing *rejection* of an unsupported URI scheme, not support for it. The plan's suggestion to change this to `pm-skills://workflows/` would create a new unsupported-URI test but lose the regression test for the old one. Since workflows aren't exposed as resources (confirmed in the plan's own "What Does NOT Change" section), neither URI should work. Keep the existing test as-is. See Proposed Actions #11.

---

### 7. Scope Risks

*Identifying what's likely to expand beyond the current plan and whether containment strategies exist. Key concerns: mechanical find-and-replace may not work for all "bundle" occurrences (e.g., "bundled with"), the advisory-only terminology guard may be too weak, the `mkdocs-redirects` dependency has no deprecation plan, and external consumers referencing `_bundles/` repo paths are not covered by URL redirects.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Major | Medium] The redirect mitigation is incomplete for repo-path breakage. Source says `mkdocs-redirects` will protect old `bundles/*` URLs (URL Redirect Plan), but that only covers the docs site; it does nothing for GitHub repo links to `_bundles/*.md`, which are embedded today in public files like [README.md](../../../../README.md), [AGENTS.md](../../../../AGENTS.md), and [commands/kickoff.md](../../../../commands/kickoff.md), and may already exist in external bookmarks or blog posts. → Recommendation: add an explicit repo-link compatibility strategy, such as temporary stub files in `_bundles/`, a breaking-change note in release notes, or a migration notice in README/AGENTS.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re Finding 13 (Major):** Agree. `mkdocs-redirects` only covers the docs site (`product-on-purpose.github.io/pm-skills/bundles/...`). External consumers who link directly to GitHub repo paths (`github.com/product-on-purpose/pm-skills/blob/main/_bundles/feature-kickoff.md`) will get 404s. This is a real concern for an open-source project. Requires human decision — see Decisions table #2. Minimum: add a breaking-change callout in the v2.9.0 release notes. Low-effort insurance: leave a `_bundles/README.md` stub saying "This directory was renamed to `_workflows/` in v2.9.0." See Proposed Actions #12.

---

## Proposed Actions

> *To be filled by Claude Opus 4.6 after reviewing findings.*

| # | Action | Target | Change | Triggered By |
|---|--------|--------|--------|-------------|
| 1 | Update | plan_bundles-to-workflows.md: Section B + ATs | Split into "M-19 completion" (3 renamed workflows) and "v2.9.0 release verification" (9 workflows). Remove F-13 deliverables from Section B. | S1-F1 (Blocker), S3-F5, S6-F11 |
| 2 | Update | plan_bundles-to-workflows.md: AT-8 | Align grep exclusions with terminology guard script, or scope grep to modified directories only | S1-F2 (Major) |
| 3 | Update | plan_bundles-to-workflows.md: Section B + Decisions | Specify `/kickoff` alias mechanism after human decision (full duplicate or validator update) | S2-F3 (Major) |
| 4 | Update | plan_bundles-to-workflows.md: New CI to Add | Replace `validate.yml` with `validation.yml` | S2-F4 (Major) |
| 5 | Update | plan_bundles-to-workflows.md: Implementation Sequence | Clarify "single atomic commit" means M-19 scope only (Commit 1 per parent plan), not combined v2.9.0 | S3-F5 (Blocker→Major) |
| 6 | Update | plan_bundles-to-workflows.md: AT-9 | Remove from M-19; move to F-13 effort or v2.9.0 release verification. Change "renamed" to "created." | S3-F6 (Major) |
| 7 | Update | plan_bundles-to-workflows.md: pm-skills-mcp Impact | Change "cosmetic" to "source-level API refactor." Keep "no user-facing MCP tool-name break." | S4-F7 (Major) |
| 8 | Update | plan_bundles-to-workflows.md: Tier 2 | Remove "appears to be a copy" characterization. Treat `docs/changelog.md` and `CHANGELOG.md` as separate files. | S4-F8 (Minor) |
| 9 | Update | plan_bundles-to-workflows.md: Tier 4 + AT-1 | Replace stale `docs/internal/efforts/workflows/` with `F-13-workflow-expansion/` or remove from M-19 scope | S5-F9 (Blocker→Major) |
| 10 | Update | plan_bundles-to-workflows.md: Context section | Add caveat: reference counts are approximate, must re-verify from live tree before execution. Record grep command/date at execution time. | S5-F10 (Major) |
| 11 | Update | plan_bundles-to-workflows.md: AT-10 | Remove `tests/resources.test.ts` rewrite. Keep existing `pm-skills://bundles/` rejection test as-is. | S6-F12 (Major) |
| 12 | Update | plan_v2.9.0.md: Release notes section | Add breaking-change callout for `_bundles/` → `_workflows/` repo-path rename. Pending human decision on stub files. | S7-F13 (Major) |
| 13 | Defer | backlog | Investigate `docs/changelog.md` vs `CHANGELOG.md` sync/generation — should one derive from the other? Not M-19 scope. | S4-F8 (Minor) |
