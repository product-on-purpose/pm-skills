# Cross-LLM Review: v2.9.0 Release Plan — Workflows

**Document:** `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md`
**Document type:** impl-plan
**Date:** 2026-04-06
**Requestor:** Claude Opus 4.6 | **Reviewer:** Codex (GPT-5.4) | **Human:** jprisant

---

## Reviewer Assessment

> **Reviewer — Codex (2026-04-06):** The release plan is structurally sound but has two blocking contradictions: M-19 AT-10 requires release notes that only exist in Commit 2, and the MCP decision says "deferred" while the verification plan gates v2.9.0 on MCP tests. Beyond these, split-ownership files lack per-commit specificity, the dual-file baseline section reads as if M-19 already landed, and three different counts for generated docs don't agree.

| Severity | Count |
|----------|-------|
| Blocker  | 2     |
| Major    | 5     |
| Minor    | 1     |
| Note     | 0     |

## Requestor Analysis & Proposed Actions

> **Requestor — Claude Opus 4.6 (2026-04-06):** I agree with all 8 findings. Both Blockers are genuine contradictions — the fixes are straightforward (move release notes draft to Commit 1, remove MCP from v2.9.0 gate). The 5 Majors are all valid executability gaps from the plan being written incrementally. No reclassifications needed. One item requires human judgment (MCP scope).

### Recommendations

1. **Resolve the Commit 1 verification deadlock** — Create a draft `docs/releases/Release_v2.9.0.md` in Commit 1 with M-19 breaking changes (kickoff deletion, path rename). F-13 (Commit 2) expands it with expansion content. This lets AT-10 pass after Commit 1. (Blocker)

2. **Remove MCP from v2.9.0 gate** — Verification step 13 (`pm-skills-mcp npm test`) contradicts the "Deferred" decision. Remove it and track MCP cleanup in a companion release plan. (Blocker)

3. **Add per-commit deltas for split-ownership files** — For each "M-19 + F-13" row, specify what Commit 1 does (rename, 3 workflows) vs what Commit 2 does (count update, 6 new rows). This makes the checklist executable by either Claude or Codex without ambiguity. (Major)

### Decisions for jprisant

| # | Question | Context | Section |
|---|----------|---------|---------|
| 1 | **MCP scope for v2.9.0:** Should the pm-skills-mcp source refactor be tracked as a companion release, or is it small enough to include in v2.9.0's scope? | The Decisions table says "Deferred" and the MCP section says "ship after pm-skills v2.9.0." But verification step 13 gates on `npm test` passing. The dual-LLM plan (Phase 3) also includes MCP testing. Either MCP is in scope (add it to the effort list) or it's deferred (remove from all gates). It can't be both. **Recommendation:** Defer — remove from v2.9.0 gate, create a lightweight companion MCP release plan. | S4 |

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer. Your job is to find problems, inconsistencies, gaps, and risks in this release plan. You are not here to validate — you are here to pressure-test.

**Key principles:**
- Disagreement is more valuable than agreement
- If you find nothing wrong in a section, say so explicitly and explain WHY — don't skip it
- If you find nothing wrong anywhere, that's suspicious — look harder
- Rate your confidence — low-confidence concerns are still worth noting
- Cite specific evidence for every finding (section numbers, quotes, file paths)

**Source documents:**

| Document | Path | Role |
|----------|------|------|
| v2.9.0 release plan (primary) | `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` | Document under review |
| M-19 detailed plan | `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` | Rename effort — Commit 1 |
| M-19 effort brief | `docs/internal/efforts/M-19-bundles-to-workflows.md` | Effort-level summary |
| F-13 effort brief | `docs/internal/efforts/F-13-workflow-expansion.md` | Expansion effort — Commit 2 |
| F-13 draft content | `docs/internal/efforts/F-13-workflow-expansion/bundle_*.md` | 6 workflow drafts |
| Dual-LLM execution plan | `docs/internal/release-plans/v2.9.0/plan_v2.9.0-dual-llm.md` | Agent assignment and phasing |
| M-19 Codex review | `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows_reviewed-by-codex.md` | Prior review — M-19 plan already reviewed |
| mkdocs config | `mkdocs.yml` | Nav and plugin configuration |
| CI workflows | `.github/workflows/*.yml` | CI that must be updated |
| Command validator | `scripts/validate-commands.ps1` | Validates command files |

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

The release plan is 443 lines. It orchestrates two efforts (M-19 rename + F-13 expansion) into a single v2.9.0 release via a two-commit strategy. It includes a master execution checklist with ~80 line items across 12 tables.

**Important context:** The M-19 detailed plan (`plan_bundles-to-workflows.md`) has already been reviewed by Codex. That review found 4 Blockers and 8 Majors, all of which have been addressed in the updated plan. This review focuses on the **release plan itself** — whether it correctly orchestrates the two efforts, whether the checklist is complete, and whether the verification plan is sound.

**Key claims to validate:**

1. The two-commit strategy (Commit 1 = M-19 rename, Commit 2 = F-13 expansion) correctly separates concerns and has no gaps between commits.
2. The master execution checklist is comprehensive — every file that needs modification is listed, with correct effort ownership (M-19, F-13, or Release).
3. The "Cross-cutting updates" table (lines 141-164) and the master checklist tables are consistent — no file appears in one but not the other.
4. The generated docs table header says "8 files" (line 119) but the table body lists 10 files (index + 9 workflows). One of these counts is wrong.
5. The CI section (line 183) references `validate.yml` but the actual repo file is `.github/workflows/validation.yml`. This was already caught in the M-19 review but may not have been fixed here.
6. Files with "M-19 + F-13" effort assignment (e.g., README.md, AGENTS.md, mkdocs.yml) are touched in both commits. The plan doesn't specify what M-19 does vs what F-13 does for these split-ownership files.
7. The verification plan (lines 422-442) correctly maps AT references: AT-1 through AT-11 for Commit 1, AT-12 through AT-14 for Commit 2.
8. The "Explicitly Unchanged" list (lines 406-418) is complete and consistent with the M-19 plan's "What NOT to Change" section.
9. The dual-LLM execution plan (`plan_v2.9.0-dual-llm.md`) is referenced in the efforts but not linked from this release plan. Should it be?
10. The Decisions table (lines 30-38) is consistent with the decisions in the M-19 detailed plan (which was updated post-review to delete `/kickoff`, characterize MCP as "source-level refactor", etc.).

---

## Findings

### 1. Plan Traceability

*Verifying that the release plan traces end-to-end from theme → efforts → deliverables → checklist → verification. If any deliverable appears in one section but not another, the release can ship incomplete.*

> **Disposition:** [blank — human fills in: accept / reject / defer]

**Reviewer — Codex (2026-04-06):**

- [Major | High] The release plan has two competing file inventories and does not make clear which one is authoritative. Source says the "Cross-cutting updates" table lists the existing files to modify ([plan_v2.9.0.md](plan_v2.9.0.md):141-164), but the master checklist later adds files like `SECURITY.md`, `.github/workflows/release.yml`, and `scripts/build-release.md` that do not appear there ([plan_v2.9.0.md](plan_v2.9.0.md):328, 391, 396). → Recommendation: either label the early table as a non-exhaustive summary or reconcile it with the master checklist so operators are not choosing between two inventories.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re S1 Finding (Major):** Agree. The cross-cutting updates table (lines 141-164) was written first as a compact summary. The master execution checklist was added later as the comprehensive authoritative inventory. They diverge because the checklist correctly added files discovered during the Codex review of M-19 (`release.yml`, `build-release.md`, `SECURITY.md`) that were never backfilled into the earlier table. Fix: label the cross-cutting table as "Summary — see Master Execution Checklist for authoritative inventory" and add a note that the checklist is the single source of truth for execution. See Proposed Actions #1.

---

### 2. Work Item Completeness

*Verifying that the master execution checklist has sufficient detail for each line item. Key concerns: split-ownership files (M-19 + F-13) don't specify what each commit does, the generated docs count is wrong, and some checklist rows may be missing from the cross-cutting updates table or vice versa.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Major | High] The split-ownership rows are not executable as written because they do not say what Commit 1 changes versus what Commit 2 changes inside the same file. Source marks `README.md`, `AGENTS.md`, `mkdocs.yml`, `docs/reference/commands.md`, `docs/workflows/index.md`, and `scripts/generate-skill-pages.py` as `M-19 + F-13` ([plan_v2.9.0.md](plan_v2.9.0.md):324-325, 334, 357, 359, 393), but the change descriptions are end-state descriptions like `"3 workflow bundles" → "9 workflows"` rather than commit-scoped instructions. → Recommendation: split these rows into explicit Commit 1 and Commit 2 sub-actions or add a per-commit delta column.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re S2 Finding (Major):** Agree. The split-ownership rows describe end-state transformations without specifying which commit does what. For example, `README.md` says `"3 workflow bundles" → "9 workflows"` — but Commit 1 should change `"3 workflow bundles"` → `"3 workflows"` (rename only, count stays), and Commit 2 should change `"3 workflows"` → `"9 workflows"` (count update). Without this split, an executing agent doesn't know what intermediate state to produce. Fix: add a "Commit 1 / Commit 2" sub-column or split each row into two rows. The 10 affected files are: `README.md`, `AGENTS.md`, `mkdocs.yml`, `docs/reference/project-structure.md`, `docs/reference/commands.md`, `docs/workflows/index.md`, `scripts/generate-skill-pages.py`, `.github/workflows/sync-agents-md.yml`, `AGENTS/claude/CONTEXT.md`, `CHANGELOG.md`/`docs/changelog.md`. See Proposed Actions #2.

---

### 3. Dependency/Ordering

*Verifying that the two-commit strategy has no gaps, no files that fall between the cracks, and no CI breakage between Commit 1 and Commit 2. Key concern: after Commit 1 (M-19) lands, the repo has 3 workflows with `_workflows/` paths but README/AGENTS still say "3 workflow bundles" — is this an intermediate inconsistent state?*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] The Commit 1 verification gate cannot be satisfied with the current ordering. Source says "After Commit 1" to "See M-19 plan AT-1 through AT-11" ([plan_v2.9.0.md](plan_v2.9.0.md):424-425), but M-19 AT-10 requires `docs/releases/Release_v2.9.0.md` to include the breaking-change callout ([plan_bundles-to-workflows.md](../../efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md):341-346), and this release plan creates `docs/releases/Release_v2.9.0.md` in Commit 2 / Release work ([plan_v2.9.0.md](plan_v2.9.0.md):225, 293, 369). → Recommendation: either remove release-artifact checks from the "After Commit 1" gate or create the release notes earlier and say so explicitly.

- [Major | Medium] Commit 1 would leave a broken maintainer instruction in the repo. Source says `docs/workflows/README.md` is created in M-19 ([plan_v2.9.0.md](plan_v2.9.0.md):276) and should say the files are "produced by `scripts/generate-workflow-pages.py`" ([plan_v2.9.0.md](plan_v2.9.0.md):77), but the script itself is created only in F-13 ([plan_v2.9.0.md](plan_v2.9.0.md):218, 292). → Recommendation: soften that README text in Commit 1, or move the README to F-13 alongside the script.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re S3 Finding 1 (Blocker):** Agree. M-19 AT-10 (line 346 in the M-19 plan) requires `docs/releases/Release_v2.9.0.md` to include a breaking-change callout, but the release plan creates that file in Commit 2 / Release work. This is a genuine verification deadlock — Commit 1 can't pass its own gate. Fix: create a **draft** `docs/releases/Release_v2.9.0.md` in Commit 1 containing only the M-19 breaking changes (kickoff deletion, `_bundles/` → `_workflows/` path rename). Commit 2 expands it with F-13 expansion content and finalizes. This follows the same pattern as CHANGELOG — v2.9.0 entry starts in Commit 1 and grows in Commit 2. See Proposed Actions #3.

**Re S3 Finding 2 (Major):** Agree. `docs/workflows/README.md` would reference `scripts/generate-workflow-pages.py` but that script doesn't exist until F-13. A developer reading the README between commits would be confused. Fix: soften the Commit 1 README text to: "Source of truth is `_workflows/`. These files are maintained via `scripts/generate-workflow-pages.py` (added alongside new workflow content)." This is accurate without being misleading about current state. See Proposed Actions #4.

---

### 4. Decision Log Coherence

*Verifying that the 7 decisions in the Decisions table are consistent with the M-19 detailed plan (post-review), the F-13 effort brief, and the dual-LLM execution plan. Key concerns: the M-19 plan was updated to delete `/kickoff` and recharacterize MCP as "source-level refactor" — are these changes reflected here?*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Blocker | High] The Decisions table says MCP work is deferred, but the final release verification still gates v2.9.0 on the deferred repo. Source says "`MCP parity` | `Deferred` | Ship workflows in pm-skills first; pm-skills-mcp tool additions + cleanup in a follow-up release" ([plan_v2.9.0.md](plan_v2.9.0.md):38), and the MCP section repeats that pm-skills-mcp changes ship "after pm-skills v2.9.0" ([plan_v2.9.0.md](plan_v2.9.0.md):255), but verification step 13 requires `pm-skills-mcp npm test` after the source refactor as part of the final release gate ([plan_v2.9.0.md](plan_v2.9.0.md):433-441). → Recommendation: decide whether MCP is truly out-of-scope for v2.9.0; if it is deferred, remove step 13 from the v2.9.0 gate and track it in a companion MCP release plan.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re S4 Finding (Blocker):** Agree. This is a clear contradiction. The Decisions table (line 38) says "Deferred," the MCP section (line 255) says "ship after pm-skills v2.9.0," but verification step 13 (line 441) gates the v2.9.0 tag on `pm-skills-mcp npm test`. These can't all be true. Fix: remove step 13 from the v2.9.0 verification plan. The MCP source refactor is non-breaking (no tool names change) and should be tracked in a lightweight companion MCP release plan, not gated against pm-skills v2.9.0. The dual-LLM execution plan's Phase 3 task 3.2 (AT-14 MCP testing) should also be moved to the MCP companion plan. See Proposed Actions #5. This requires human decision — see Decisions table #1.

---

### 5. File Inventory Accuracy

*Verifying that every file in the master execution checklist actually exists in the repo (or is correctly marked as new), and that no files are missing. Key concerns: the generated docs header/body count mismatch, the stale CI filename, and whether `SECURITY.md` actually contains a bundle reference.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

- [Major | High] The baseline-state section is factually wrong today, which makes the plan read like M-19 has already landed. Source says "What exists today" is `_workflows/*.md` and `docs/workflows/*.md` ([plan_v2.9.0.md](plan_v2.9.0.md):44-49), but the live repo still has `_bundles/feature-kickoff.md`, `_bundles/lean-startup.md`, `_bundles/triple-diamond.md`, and `docs/bundles/*.md`, while `_workflows/` and `docs/workflows/` do not exist yet. → Recommendation: rewrite that section using the actual current `_bundles`/`docs/bundles` baseline, or relabel it as the post-M-19 target state.

- [Major | High] One stale CI filename remains in the release plan. Source says the main workflow is `validate.yml` in the "CI That Applies" table ([plan_v2.9.0.md](plan_v2.9.0.md):177-184), but the actual repo file is `.github/workflows/validation.yml`, and the master checklist later uses the correct filename ([plan_v2.9.0.md](plan_v2.9.0.md):392). → Recommendation: fix the CI table so the plan references one real workflow name consistently.

- [Minor | High] The generated-docs inventory is internally inconsistent. Source says "Generated docs (8 files)" ([plan_v2.9.0.md](plan_v2.9.0.md):119), but the table body lists 10 files ([plan_v2.9.0.md](plan_v2.9.0.md):123-132), and the later "Generated Files" checklist lists only 7 files, omitting `docs/workflows/feature-kickoff.md`, `docs/workflows/lean-startup.md`, and `docs/workflows/triple-diamond.md` even though the F-13 script is supposed to validate against those existing pages ([plan_v2.9.0.md](plan_v2.9.0.md):219, 308-318). → Recommendation: reconcile the counts and state explicitly whether the 3 renamed existing workflow pages become generated artifacts in F-13.

**Requestor — Claude Opus 4.6 (2026-04-06):**

**Re S5 Finding 1 (Major):** Agree. The "What exists today" table (lines 44-49) uses `_workflows/` and `docs/workflows/` as current paths, but these directories don't exist yet — they're the post-M-19 target. This section was written in "target state" voice during planning but reads as current state to an executor. Fix: relabel the section header as "Post-M-19 Target State" and add a note: "Current state: `_bundles/` and `docs/bundles/`. M-19 renames these." See Proposed Actions #6.

**Re S5 Finding 2 (Major):** Agree. Already caught in the M-19 review (Finding 4) but the fix was only applied to the M-19 plan, not propagated to this release plan. Fix: change `validate.yml` → `validation.yml` in the CI table (line 183). See Proposed Actions #7.

**Re S5 Finding 3 (Minor):** Agree. Three conflicting counts: header says "8 files", table body has 10 (index + 9 workflows), checklist has 7 (omits the 3 existing workflows). The 3 existing workflow doc pages (`feature-kickoff`, `lean-startup`, `triple-diamond`) are currently manual copies but become generated artifacts once `generate-workflow-pages.py` exists in F-13. All 10 should be listed. Fix: change header to "10 files", and add the 3 existing workflows to the Generated Files checklist with a note that they transition from manual to generated in F-13. See Proposed Actions #8.

---

### 6. Success Criteria

*Verifying that the verification plan (14 checks) is sufficient, correctly attributed to the right commit, and measurable. Key concern: the verification plan references "M-19 plan AT-1 through AT-11" — are these AT numbers still correct after the M-19 plan was rewritten post-review?*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

No additional findings beyond the sequencing and scope-gating issues above. Once the Commit 1 gate, MCP gate, and generated-file inventory are corrected, the verification plan is measurable.

**Requestor — Claude Opus 4.6 (2026-04-06):**

Agree — no additional findings. Once the Commit 1 gate deadlock (S3), MCP scope contradiction (S4), and generated-file count (S5) are resolved, the verification plan is measurable and correctly attributed.

---

### 7. Scope Risks

*Identifying what could expand beyond the two-commit plan and whether containment strategies exist. Key concerns: the MCP "deferred" decision has no timeline or trigger, the `mkdocs-redirects` plugin is a permanent new dependency, and the release doesn't account for the pm-skills-mcp companion release.*

> **Disposition:** [blank]

**Reviewer — Codex (2026-04-06):**

No additional findings beyond the deferred-MCP boundary and the intermediate broken README instruction already noted. The release plan already acknowledges the main external-link and redirect risks; the remaining problem is scope discipline rather than a missing risk category.

**Requestor — Claude Opus 4.6 (2026-04-06):**

Agree — no additional findings. The plan already covers the main risks (external links, redirects, terminology guard). The remaining issue is scope discipline (MCP), which is addressed in S4.

---

## Proposed Actions

> *To be filled by Claude Opus 4.6 after reviewing findings.*

| # | Action | Target | Change | Triggered By |
|---|--------|--------|--------|-------------|
| 1 | Update | plan_v2.9.0.md: Cross-cutting updates table | Add header note: "Summary — see Master Execution Checklist for authoritative inventory" | S1 (Major) |
| 2 | Update | plan_v2.9.0.md: Master checklist split-ownership rows | Split each "M-19 + F-13" row into two sub-rows with per-commit change descriptions. E.g., README: Commit 1 = rename terminology, keep count at 3; Commit 2 = update count to 9, add 6 table rows. | S2 (Major) |
| 3 | Update | plan_v2.9.0.md + M-19 plan | Move `docs/releases/Release_v2.9.0.md` creation to Commit 1 as a draft (M-19 breaking changes only). Commit 2 expands with F-13 content. Update M-19 AT-10 to reference draft release notes. | S3-F1 (Blocker) |
| 4 | Update | plan_v2.9.0.md: Directory READMEs section | Soften `docs/workflows/README.md` text for Commit 1: "Source of truth is `_workflows/`. These files are maintained via `scripts/generate-workflow-pages.py` (added alongside new workflow content)." | S3-F2 (Major) |
| 5 | Update | plan_v2.9.0.md: Verification Plan + Decisions table | Remove step 13 (MCP npm test) from v2.9.0 gate. Add note: "MCP source refactor tracked in companion release plan." Update dual-LLM plan AT-14 accordingly. Pending human decision on MCP scope. | S4 (Blocker) |
| 6 | Update | plan_v2.9.0.md: Dual-file pattern section | Relabel "What exists today" as "Post-M-19 Target State". Add note: "Current state: `_bundles/` and `docs/bundles/`. M-19 (Commit 1) renames these." | S5-F1 (Major) |
| 7 | Update | plan_v2.9.0.md: CI That Applies table | Change `validate.yml` → `validation.yml` (line 183) | S5-F2 (Major) |
| 8 | Update | plan_v2.9.0.md: Generated docs section + checklist | Change header "8 files" → "10 files". Add `feature-kickoff.md`, `lean-startup.md`, `triple-diamond.md` to Generated Files checklist with note "transitions from manual to generated in F-13". | S5-F3 (Minor) |
| 9 | Defer | backlog | Create lightweight companion MCP release plan for pm-skills-mcp source refactor + 6 new workflow tools. | S4 (Blocker) |
