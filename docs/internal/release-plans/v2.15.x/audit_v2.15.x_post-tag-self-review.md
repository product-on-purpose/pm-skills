---
title: v2.15.x Post-Tag Self-Review Audit
description: Prioritized audit of v2.15.0 ship hygiene covering documentation drift, CI gaps, continuity issues, consistency regressions, and bug discoveries. Recommends a v2.15.1 / v2.15.2 patch phasing plus inputs to v2.16.0.
type: audit / release plan
status: DRAFT (authored 2026-05-16; no items closed yet)
owner: Maintainers
created: 2026-05-16
updated: 2026-05-16
---

# v2.15.x Post-Tag Self-Review Audit

**Status:** DRAFT. Authored 2026-05-16 ~16:30 PDT after the v2.15.0 tag at `a108301` and the post-tag CI-gap closures at `f03d94d` + `c8ea6d9`. No remediation has been applied yet; every finding below is open.

**Goal:** Surface every meaningful drift, gap, or follow-up the v2.15.0 release pipeline did not close before tag, prioritized by user impact and effort. Output is a phased remediation plan that maps to v2.15.1 / v2.15.2 same-day patches (per the v2.14.x precedent) plus inputs to v2.16.0.

**Scope:** Documentation accuracy, CI / validator coverage, plan continuity, cross-doc consistency, bug discoveries, deferral cleanup. Does NOT include new feature ideation or product roadmap; those belong in `plan_v2.16.0.md` or backlog. Includes the user's spot-check that prompted this audit ("the release description and top of the readme were not updated with the correct skill counts").

**Methodology:** Manual surface sweep across the 22 highest-visibility files plus full validator runs. Coverage:

- README.md (all sections; 1225 lines)
- CHANGELOG.md + docs/changelog.md (mirror)
- AGENTS.md (TOC, Tools section, command table at line 374+)
- docs/index.mdx (Starlight homepage)
- docs/skills/index.md (skills landing page)
- docs/workflows/index.md (workflows landing page) + the 12 generator-output files
- docs/releases/Release_v2.15.0.md + docs/releases/index.md
- .claude/pm-skills-for-claude.md
- .claude-plugin/plugin.json + marketplace.json
- CONTRIBUTING.md (v2.15.0 references)
- library/skill-output-samples/README_SAMPLES.md
- docs/reference/categories.md, commands.md
- docs/concepts/foundation-sprint.md + design-sprint.md + workshop-sprints-vs-agile-sprints.md
- docs/reference/sprint-methodology-glossary.md + workshop-method-comparison.md
- docs/guides/using-foundation-sprint.md + using-design-sprint.md + 8 family guides
- All 10 enforcing CI validators (count-consistency, link-validity, frontmatter, no-body-h1, agents-md, commands, generated-content-untouched, FS family, DS family, meeting family)
- Open GitHub issues (10 most recent)
- Open Dependabot alerts (2 remaining)
- Recent CI run history (last 6)
- v2.15.0 commit arc (7 commits across 2 days)

**One-line summary:** The release is solid at the source-of-truth layer (all 10 enforcing validators PASS; skill counts on disk match v2.15.0 claims) but **the docs-site landing pages (`docs/index.mdx`, `docs/skills/index.md`, `docs/workflows/index.md`) never made it through the post-tag sweep**, and a previously-undetected generator bug silently drops new workflows from the workflow index. Same defect class as the v2.12.0 release-state derived-number drift the user has called out before.

---

## Headline numbers

| Metric | At v2.15.0 tag | Audit observation |
|---|---|---|
| Source-of-truth skill count | 55 (26 phase + 8 foundation + 6 utility + 15 tool) | Matches `skills/` directory exactly |
| Source-of-truth command count | 62 | Matches `commands/` directory exactly |
| Source-of-truth workflow count | 12 | Matches `_workflows/` directory exactly |
| Library sample count | 174 (claim: 171 = 126 + 45) | Source claim under-counts by 3 |
| Enforcing validators all green | YES on main HEAD | Confirmed by local re-runs |
| Open Dependabot alerts | 2 (Astro 6.x deferrals) | Tracked in `plan_v2.16.0.md` DI3 |
| Open GitHub issues | 10 (most recent) | Issue #132 [M-20] is directly relevant to this audit |
| Stale skill-count surfaces found | 4 user-visible pages | All listed under P0 / P1 below |
| Stale historical references | 0 (all framed as historical) | Acceptable; preserved as accurate records |

---

## Findings index

| ID | Priority | Category | Title |
|---|---|---|---|
| A01 | P0 | Documentation | `docs/index.mdx` Starlight homepage still claims "40 skills" |
| A02 | P0 | Documentation | `docs/skills/index.md` table omits the Tool row (sums to 40) |
| A03 | P0 | CI / Bug | Workflow generator silently drops new workflows from index table |
| A04 | P1 | Documentation | `AGENTS.md` command table at L374+ missing the 15 new tool commands |
| A05 | P1 | Documentation | `library/skill-output-samples/README_SAMPLES.md` says "126 samples across 40 skills" (actual 174 + 55) |
| A06 | P1 | CI / Consistency | `check-count-consistency` regex misses descriptive patterns ("40 AI agent skills") |
| A07 | P2 | CI / Continuity | Open issue #132 [M-20] Docs Count Consistency CI is the load-bearing fix; not yet in v2.15.x |
| A08 | P2 | Continuity | v2.15.0 master plan + integration plans need post-tag final-status block update |
| A09 | P2 | Consistency | Sprint Planning workflow row needs `(agile)` qualifier per new naming-discipline rule |
| A10 | P2 | Continuity | Sample-count discrepancy: 174 on disk vs 126+45=171 claimed (off by 3) |
| A11 | P3 | Documentation | Sprint Skills landing page (cross-family overview) recommended in S1269 was deferred |
| A12 | P3 | Documentation | CONTEXT.md per-phase tables refresh still queued (Task 2 of v2.14.x cleanup plan) |
| A13 | P3 | Process | Pre-Tag Validator Bundle memory (2026-05-16) needs codification in the pre-release runbook |
| A14 | P3 | Documentation | CHANGELOG / Release_v2.15.0.md "Post-tag closures" section could be promoted higher |
| A15 | P3 | Documentation | AGENTS.md TOC does not list the new Tools section explicitly |
| A16 | INFO | Bug | CI failure on `f03d94d` (recovered on `c8ea6d9`) is a process learning, not an open defect |
| A17 | INFO | Reference | Dependabot #10 + #16 remain open by design (Astro 6.x; v2.16 closure) |
| A18 | INFO | Consistency | All 10 enforcing validators PASS on local HEAD; no source-of-truth defect |

---

## Findings detail (by priority)

### P0 - User-visible breakage / discovery defect

#### A01. `docs/index.mdx` Starlight homepage still claims "40 skills"

**What:** The Astro Starlight homepage at https://product-on-purpose.github.io/pm-skills/ (sourced from `docs/index.mdx`) still presents pm-skills as a 40-skill library. Specific lines:

- L3 (frontmatter description): `description: 40 AI agent skills for product managers ...`
- L10 (hero body): `**40 best-practice product management skills for AI agents.**`
- L50-99 (CardGrid): 8 cards (Discover 3, Define 4, Develop 4, Deliver 6, Measure 5, Iterate 4, Foundation 8, Utility 6) summing to 40, **with no Tool card**
- L102: `26 domain skills across 6 phases, plus foundation and utility:` (no mention of tool)
- L164 ("Plus:" command list): missing all 15 `/tool-foundation-sprint-*` and `/tool-design-sprint-*` and `/tool-note-and-vote`

**Why this is P0:** This is the page a first-time visitor lands on. The README header on GitHub is correct at 55; the live docs site is not. The discrepancy contradicts the v2.15.0 release narrative and erodes trust in the rest of the documentation. The user spotted this in their hand-check ("release description and top of the readme were not updated") and was correct that something at the top of the user-facing surface was stale, even though the README badges + line 8 are fine.

**Why missed:** The pre-tag sweep covered README.md badges and line 8 explicitly but did not include `docs/index.mdx` in the count-fix batch. `check-count-consistency` did not flag it because the regex pattern (`<N>\s+skills`) does not match `40 AI agent skills` (intervening "AI agent" tokens).

**Decision Brief:**
- **What:** Edit `docs/index.mdx` to (a) update both 40-skill claims to 55, (b) add a Tool card to the CardGrid (or restructure to "55 skills across 4 classifications"), (c) extend the "Skills by Phase" intro to mention the tool classification, (d) add tool commands to the "Plus:" command list or move to a tool-specific section.
- **Why:** First-impression accuracy; aligns docs site with the v2.15.0 release narrative.
- **Outcomes:** Visitors see 55 skills with the Foundation Sprint + Design Sprint methodology framing; no more cross-surface drift between GitHub README and Starlight site.
- **Alternatives considered:** (1) Author a NEW landing-page section for Sprint Skills with its own CardGrid (more invasive; defer to A11). (2) Treat the homepage as a "marketing surface" intentionally lighter than the README and only update the numbers without adding the Tool card (less editorial work but reads as if the release didn't add a major new lane).
- **Recommendation:** Minimal-edit path: update the two count claims to 55, add the Tool card, extend the breakdown line. Reserve a richer Sprint Skills hero block for v2.15.2 or v2.16.0 if A11 is taken on.
- **Maintainer slot:** Maintainers (default).

#### A02. `docs/skills/index.md` table omits the Tool row entirely

**What:** `docs/skills/index.md` describes the catalog as "55 production-ready skills" (frontmatter L3 and body L6 both say 55) but the breakdown table at L8-17 only lists 8 classifications totaling 40:

```
| Phase | Skills | Focus |
|-------|--------|-------|
| Discover | 3 | ... |
| Define | 4 | ... |
| Develop | 4 | ... |
| Deliver | 6 | ... |
| Measure | 5 | ... |
| Iterate | 4 | ... |
| Foundation | 8 | ... |
| Utility | 6 | ... |
```

(3 + 4 + 4 + 6 + 5 + 4 + 8 + 6 = 40)

**Missing:** `| Tool | 15 | ... |` row. The page also lacks any introductory paragraph explaining what the Tool classification is or pointing at the FS / DS family contracts.

**Why this is P0:** This is the dedicated skills landing page. A reader who lands here cannot find the 15 new sprint skills via this table. The directory `docs/skills/tool/` exists with all 16 generated pages (15 skill pages + index.md), but the table that should link them is broken.

**Why missed:** `docs/skills/index.md` appears to be hand-authored (not in any generator's output list), so the post-tag generator regen could not have fixed it. No validator looks for "table row count matches classification count."

**Decision Brief:**
- **What:** Add the Tool row to the table; extend the introductory paragraph to mention the tool classification + Foundation Sprint and Design Sprint families.
- **Why:** Discovery accuracy for the new lane.
- **Outcomes:** Visitors landing on `/skills/` see the full 55-skill catalog reflected in the breakdown table and can click into `/skills/tool/`.
- **Alternatives considered:** Add a parallel "Tool families" section below the table instead of a row (richer but more invasive). Or auto-generate this index from `skills-manifest.yaml` (better long-term, but out of scope here; tracks to A07 / v2.16.0).
- **Recommendation:** Minimal-edit path now (add row + intro line); promote auto-generation as part of A07.
- **Maintainer slot:** Maintainers.

#### A03. Workflow generator silently drops new workflows from index table

**What:** `scripts/generate-workflow-pages.py` has a **hardcoded `workflow_info` dictionary** with exactly the 9 pre-v2.15.0 workflows (lines ~170-200). When new workflows are added to `_workflows/`, the generator:

1. Correctly writes the individual workflow page outputs (foundation-sprint.md, design-sprint.md, foundation-to-design.md all exist in `docs/workflows/`).
2. Calls `generate_index(workflow_files)` with all 12 entries.
3. The function only renders rows for workflows whose stem exists in the hardcoded `workflow_info` dict.
4. The 3 new sprint workflows are silently skipped from the table.
5. The script's stdout claims "Generated 12 workflow pages + index" (technically true for the page count; misleading for the index coverage).

**Evidence:**

- `_workflows/` contains 12 files (verified).
- `docs/workflows/` contains 12 individual workflow files (verified).
- `docs/workflows/index.md` table has 9 rows (verified by `grep -c '^| \[' = 9`).
- Re-running the generator on a clean tree produces zero diff against the current `index.md` (verified) - meaning the generator and the file are aligned at being incomplete.
- `check-generated-content-untouched` passes for the same reason (both sides match each other; neither matches the source-of-truth in `_workflows/`).

**Why this is P0:** This is a real software bug, not just stale content. Every future workflow addition will hit the same problem. The validator that should catch generator drift cannot catch this class of bug because the validator compares generator output to file content (consistency), not generator output to source-of-truth (correctness). Same defect class as count-consistency missing descriptive patterns (A06).

**Why missed:** The generator dict was hand-curated to control display order and use-when phrasing; the trade-off was never documented as "you must update this dict when adding a workflow." No test asserts coverage.

**Decision Brief:**
- **What:** Refactor `generate_index()` to handle workflows NOT in `workflow_info` by either (a) reading their frontmatter `description:` + a new `use_when:` field for the table cells, or (b) raising a hard error so missing dict entries fail CI loudly.
- **Why:** Prevent silent drops on every future workflow add; close the validator blind spot.
- **Outcomes:** Adding a new workflow to `_workflows/` propagates into `docs/workflows/index.md` automatically (or fails loudly enough to force the dict update).
- **Alternatives considered:** (1) Just add the 3 missing entries to the dict and move on (fixes today's gap but does not prevent the next miss). (2) Generate from a manifest file like `_workflows/_manifest.yaml` (cleaner but adds a new convention to maintain).
- **Recommendation:** Two-step: (i) ship the 3 dict entries NOW as A03a to unblock the user-visible page; (ii) refactor to frontmatter-driven OR error-loudly in v2.15.2 as A03b. Same pattern as the v2.14.x V15 fix (immediate sweep + forward enforcement).
- **Maintainer slot:** Maintainers.

---

### P1 - Important drift / hidden discovery defects

#### A04. AGENTS.md command table at L374+ missing 15 new tool commands

**What:** AGENTS.md was updated for v2.15.0 with a new top-of-doc Tools section (L257+) covering tool-note-and-vote, the FS family of 7, and the DS family of 7 with their canonical paths. However, the command summary table at L374+ (the "Commands" section) has 42 rows and **zero `/tool-*` entries**. The 15 new commands exist on disk (verified: `commands/tool-*.md` = 15 files) and resolve correctly via `validate-commands` (PASS).

**Why this is P1:** Readers using AGENTS.md as the canonical agent-discovery doc will find the tool skills in the upper Tools section but will see an incomplete command table at the bottom. AI assistants that scrape the table to enumerate available commands will report 42 instead of 57. This is a partial-update artifact.

**Decision Brief:**
- **What:** Add the 15 `/tool-*` command rows to the AGENTS.md command summary table at L374+. Group them visually (Foundation Sprint family + Design Sprint family + standalone) consistent with the upper Tools section.
- **Why:** Close the partial-update gap; restore AGENTS.md as a complete reference.
- **Outcomes:** Table count grows from 42 to 57 rows; all v2.15.0 commands enumerable from the bottom of AGENTS.md.
- **Alternatives considered:** Auto-generate the AGENTS.md command table from `commands/` directory (tracks to A07; longer-term).
- **Recommendation:** Hand-edit now; auto-generate later under A07.
- **Maintainer slot:** Maintainers.

#### A05. library/skill-output-samples/README_SAMPLES.md stale at "126 samples across 40 skills"

**What:** `library/skill-output-samples/README_SAMPLES.md` line 3 reads: "126 sample outputs across 40 PM skills, organized into three narrative threads ...". Actual on-disk: 174 sample files across 55 skill directories (verified by `find library/skill-output-samples -name '*.md' -type f | wc -l = 174`).

The v2.15.0 release added 45 samples (per the release notes' "45 library samples" claim: 21 FS + 21 DS + 3 note-and-vote). 126 + 45 = 171. Actual 174 is 3 more than claimed. The delta might be markdown helper files (SAMPLE_CREATION.md + THREAD_PROFILES.md + README_SAMPLES.md) counting as samples in the find query, or actual content samples not accounted for in the release-notes phrasing. See A10 for the count reconciliation finding.

**Why this is P1:** The samples README is the only navigable index of the sample library. A "126" claim against a "174 actually on disk" reality undermines the library's discoverability. Many readers will skim the index and miss the 45 new sprint samples entirely.

**Why missed:** Same gap as A04: hand-authored doc; no validator enforces sample-count consistency. The release-prep checklist did not include this file.

**Decision Brief:**
- **What:** Update README_SAMPLES.md: (i) header count to "174 samples across 55 PM skills" (or whatever count is correct after A10 reconciliation), (ii) extend "Browse by Skill" table to include the 15 new sprint skills with 3 samples each, (iii) extend per-thread "Browse by Company" tables to include the new sprint samples, (iv) update footer version to v2.15.0.
- **Why:** Restore sample-library navigability post-v2.15.0.
- **Outcomes:** Sample-library users can find the 45 new sprint samples through the canonical index.
- **Alternatives considered:** Auto-generate via a new script (consistent with A07). Defer to v2.15.2 if effort is large.
- **Recommendation:** Hand-edit now in v2.15.1 since this is the user-facing nav doc; track auto-gen as a v2.16 enhancement.
- **Maintainer slot:** Maintainers.

#### A06. `check-count-consistency` regex misses descriptive patterns

**What:** The `check-count-consistency.sh` validator scans tracked files for stale `<N>\s+skills?` patterns and flags them. It passes on local HEAD because `docs/index.mdx` says `40 AI agent skills` (with "AI agent" between the number and "skills"), which the regex does not match. Similarly: `40 best-practice product management skills` has "best-practice product management" between 40 and skills.

**Why this is P1:** The validator's premise is "we will catch stale counts" but its regex is too narrow to catch the most common stale-count patterns in marketing-style descriptions ("40 great PM skills", "55 production-ready skills", etc.). Issue #132 [M-20] tracks the broader version of this work; this finding documents the specific gap surfaced by A01.

**Decision Brief:**
- **What:** Either (a) extend the count-consistency regex to allow N-token gaps between the number and the noun ("skills"), with a curated wordlist of legal interjected adjectives, OR (b) treat A01 / A05 as part of the issue #132 implementation scope.
- **Why:** Close the validator blind spot that allowed A01 to slip through.
- **Outcomes:** Future stale "40 X Y Z skills" patterns get caught at PR time.
- **Alternatives considered:** Move count assertions into frontmatter and validate from there (cleaner but requires re-authoring all hero descriptions).
- **Recommendation:** Bundle with issue #132 [M-20] resolution; do not ship as a v2.15.1 patch (validator changes have ripple risk; better to scope carefully).
- **Maintainer slot:** Issue #132 owner.

---

### P2 - Quality / process / structural

#### A07. Open issue #132 [M-20] Docs Count Consistency CI is the load-bearing fix

**What:** GitHub issue #132 titled `[M-20] Docs Count Consistency CI` is open in the infrastructure label set. This is the canonical work item for tightening the count-consistency validator. The v2.15.0 release exposed exactly the gap this issue describes (A01 + A05 + A06).

**Why this is P2:** The release surfaces the cost of leaving this issue open. Promoting it from backlog to scheduled work for v2.16.0 (or v2.15.2 if scope is small) closes a recurring drift class.

**Decision Brief:**
- **What:** Re-prioritize #132 with the audit evidence; scope the validator extension (descriptive-pattern regex + landing-page coverage); schedule for v2.16.0 if it requires a meaningful authoring pass, v2.15.2 if it is a tight regex change.
- **Why:** Issue is precisely the missing fence that would have caught v2.15.0's docs-site drift.
- **Outcomes:** A class of drift becomes detectable at PR time instead of post-tag.
- **Alternatives considered:** Close issue as "won't fix; rely on manual sweep" (rejected: manual sweep already failed).
- **Recommendation:** Schedule for v2.16.0; add the evidence from this audit to the issue body.
- **Maintainer slot:** Issue #132 owner.

#### A08. v2.15.0 master plan + integration plans need post-tag final-status block update

**What:** The master plan (`plan_v2.15.0.md`) currently says `Status: TAGGED + POST-TAG REGEN SHIPPED` and lists "What's next" as 4 items (Release UI rewrite, optional v2.15.1, CONTEXT.md refresh, v2.16.0 kickoff). The Release UI rewrite is DONE (verified by `gh release view v2.15.0`); the master plan does not reflect that. Foundation-sprint-integration-plan.md and design-sprint-integration-plan.md still say "Plan COMPLETE" but neither has a final post-tag status line declaring "v2.15.0 TAGGED at `a108301`, no further plan work expected."

**Why this is P2:** Per the `feedback_update-plans-as-you-ship.md` memory (codified 2026-05-15), shipping work without updating the plan rots the plan as a reference. The next maintainer reading these plans cannot tell whether the work is done or still in progress.

**Decision Brief:**
- **What:** Add a single status-block line to each of the three plan files marking final v2.15.0 state with tag SHA, then prune the "What's next" list to items genuinely remaining.
- **Why:** Plan-update hygiene per the established memory rule.
- **Outcomes:** Plans reflect ship-completion accurately; future audits can read final state without spelunking commit history.
- **Alternatives considered:** Archive the plans to a "shipped" subfolder (more invasive; lose discoverability).
- **Recommendation:** In-place status block update; cheap, fast, aligns with memory rule.
- **Maintainer slot:** Maintainers.

#### A09. Sprint Planning workflow row needs `(agile)` qualifier per new naming-discipline rule

**What:** `docs/workflows/index.md` line 18 reads: `| [Sprint Planning](sprint-planning.md) | ... | Preparing sprint-ready stories from a backlog |`. The new Naming Discipline section in both family contracts (FS v0.3.0 + DS v0.2.0) explicitly requires: "Reserve bare 'sprint' for agile / Scrum iteration context only, with explicit '(agile)' or '(Scrum)' qualifier when both methodologies could be confused in surrounding context."

The workflow index now sits next to Foundation Sprint and Design Sprint pages and is a prime confusion site. "Sprint Planning" without qualifier becomes ambiguous: it currently refers to agile sprint planning, but in v2.15.0's vocabulary it could read as "planning for a Foundation Sprint or Design Sprint." The same applies to `_workflows/sprint-planning.md` content + the `workflow-sprint-planning` slash command name.

**Why this is P2:** Surface follows from a rule that was added in the same release that introduced the confusion lane. Caught explicitly by the naming-discipline pass intent. Not user-breaking but it violates the rule the release codified.

**Decision Brief:**
- **What:** Rename the workflow-index display label to "Sprint Planning (agile)"; same for the workflow page title (frontmatter only; not the filename or slash command, to preserve continuity). Add a disambiguation callout to `_workflows/sprint-planning.md` content pointing at the Foundation Sprint + Design Sprint workflows.
- **Why:** Apply the v2.15.0 naming-discipline rule uniformly to existing surfaces.
- **Outcomes:** Reader scanning the workflow index sees clear separation between agile sprint planning and workshop sprints.
- **Alternatives considered:** (1) Leave alone and accept ambiguity (rejected: contradicts the rule). (2) Rename slash command + file (rejected: breaks backward compatibility; high blast radius for a low-stakes label change).
- **Recommendation:** Frontmatter / display-label change only. Ship in v2.15.1 alongside A01-A03 since it is a single-file edit.
- **Maintainer slot:** Maintainers.

#### A10. Sample-count discrepancy: 174 on disk vs 171 claimed

**What:** Release notes claim 45 new samples in v2.15.0. Pre-v2.15.0 baseline was 126 (per `library/skill-output-samples/README_SAMPLES.md` and CHANGELOG v2.12.0 entry). Expected post-tag: 171. Actual on disk: 174. Off by 3.

Possible explanations: (i) the find query counts SAMPLE_CREATION.md, THREAD_PROFILES.md, README_SAMPLES.md, AGENTS.md helper files as samples (3 of them, fits the gap), (ii) 3 extra samples were added that did not make the release-notes count, (iii) some thread coverage went deeper than the canonical 3-per-skill pattern. Requires investigation.

**Why this is P2:** Sample-count claims appear in release notes, README_SAMPLES.md, CHANGELOG.md, docs/changelog.md, and per-release historical entries. Drift here propagates the same defect class as A06 across the entire historical archive. A reconciliation pass would also catch (ii) or (iii) if they are real, surfacing samples that exist but are undocumented.

**Decision Brief:**
- **What:** Run a reconciliation pass: enumerate all sample files; classify as content vs helper; produce a one-page audit table; correct the headline number in README_SAMPLES.md per A05 with the reconciled figure.
- **Why:** Fix the headline number with confidence; surface any orphan samples.
- **Outcomes:** Trustworthy sample count; documented methodology for the next release.
- **Alternatives considered:** Just hand-write "171" or "~174" without reconciliation (rejected: same defect class as A06).
- **Recommendation:** Reconciliation pass as a v2.15.2 task; ship A05 in v2.15.1 with a conservative "~170 samples" phrasing in the interim if A10 has not closed.
- **Maintainer slot:** Maintainers.

---

### P3 - Polish / nice-to-have / process improvements

#### A11. Sprint Skills landing page (cross-family overview) was deferred

**What:** The recent observation S1269 (2026-05-16 12:45 PM) identified three high-leverage authoring opportunities that were not taken on before tag:

1. Sprint Skills Overview landing page (a `/sprint-skills/` or `/concepts/sprint-skills/` entry doc that introduces both families together)
2. Sprint Glossary covering ~25 specialized terms (the existing `docs/reference/sprint-methodology-glossary.md` covers 40 terms; this overlaps but the user observation framed a different lens)
3. Sprint FAQ (cross-family; the existing 2 per-family FAQs each cover their family)

**Why this is P3:** Not blocking; the per-family docs are complete. But a cross-family entry point reduces cognitive load for someone arriving cold to the sprint lane.

**Decision Brief:**
- **What:** Decide whether to author 0, 1, or all 3 cross-family docs as part of v2.15.2.
- **Why:** Improve first-touch UX for sprint methodology readers.
- **Outcomes:** A single landing page that explains the sprint lane and routes to the right family.
- **Alternatives considered:** Ship per-family pages only (current state); cross-family overview as a docs/concepts/ entry vs a Starlight landing page.
- **Recommendation:** Defer to v2.15.2 or v2.16.0 based on bandwidth. Lower priority than A01-A10. If taken, prioritize the cross-family Overview (highest leverage) over the Glossary (likely subsumed by the existing one).
- **Maintainer slot:** Maintainers; decide at v2.15.2 scoping.

#### A12. CONTEXT.md per-phase tables refresh still queued

**What:** Task 2 of `docs/internal/release-plans/v2.15.0/v2.14.x-deferrals-cleanup-plan.md` (`AGENTS/claude/CONTEXT.md` per-phase tables refresh) was sequenced for post-tag. It tracks against an internal context file used by Claude when reasoning about the project. ~1.5 hours of focused work per the plan.

**Why this is P3:** Internal-context only; does not affect external users. But the plan-update-as-you-ship memory rule applies here too.

**Decision Brief:**
- **What:** Execute the task as previously scoped; close the v2.14.x cleanup plan.
- **Why:** Final closure of the v2.14.x deferrals; restores CONTEXT.md as a useful Claude reference.
- **Outcomes:** Future Claude sessions reason from accurate per-phase tables.
- **Alternatives considered:** Skip (rejected: leaves the plan permanently open).
- **Recommendation:** Bundle into v2.15.2 alongside A08.
- **Maintainer slot:** Maintainers.

#### A13. Pre-Tag Validator Bundle memory needs codification in the pre-release runbook

**What:** Memory `feedback_pre-tag-validator-bundle.md` (codified 2026-05-16) says: "before cutting a release tag, run every truly-enforcing validator including count-consistency + generated-content-untouched + family validators with --strict, not just the 4-validator subset that 'feels green'." The memory exists; the pre-release runbook at `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` has not been updated to reflect this rule.

**Why this is P3:** Future-tag-cutting will reference the runbook; the memory may not be read in time. Codification closes the loop.

**Decision Brief:**
- **What:** Edit `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` to add a "Pre-tag validator bundle" subsection that enumerates every truly-enforcing validator with the exact bash + pwsh invocation.
- **Why:** Convert tacit memory rule into explicit runbook step.
- **Outcomes:** The next release tag-cut runs the full bundle by default.
- **Alternatives considered:** Wrap the bundle into a single `scripts/pre-tag-validate.sh` orchestration script (richer; also closes a scripting gap).
- **Recommendation:** Author the script as the v2.15.2 / v2.16.0 task; reference it from the runbook. Two-for-one.
- **Maintainer slot:** Maintainers.

#### A14. CHANGELOG / Release_v2.15.0.md "Post-tag closures" section could be promoted higher

**What:** Both CHANGELOG.md (L43) and docs/releases/Release_v2.15.0.md have a "Post-tag closures" section, but they sit deep in the document. A reader who reads only the top-of-file summary may miss that f03d94d + c8ea6d9 closed two CI gaps that ship on the deployed site.

**Why this is P3:** Editorial quality, not correctness. The information is present.

**Decision Brief:**
- **What:** Add a one-line callout near the top of the v2.15.0 release notes: "Note: 2 post-tag CI gap closures landed on main HEAD (`f03d94d` and `c8ea6d9`) and ship via the deployed docs site without a tag move. See 'Post-tag closures' below."
- **Why:** Make the post-tag closures visible to readers who scan only the top.
- **Outcomes:** No reader misses the post-tag fix narrative.
- **Alternatives considered:** Cut a v2.15.1 patch tag that captures the post-tag state (v2.14.0 to v2.14.1 to v2.14.2 precedent). Higher overhead; the master plan currently marks this as optional.
- **Recommendation:** Editorial callout in v2.15.2; defer the patch-tag question to its own decision.
- **Maintainer slot:** Maintainers.

#### A15. AGENTS.md TOC does not list the new Tools section explicitly

**What:** AGENTS.md TOC at the top covers `# Skills`, `### Foundation Classification`, `### Discover Phase`, etc. A reader scanning the TOC for "Tools" or "Sprint" finds nothing until they reach the actual Tools section at L255+ in the body.

**Why this is P3:** Discoverability through the TOC is friction. Per A04, the bottom command table is also missing tool entries.

**Decision Brief:**
- **What:** Add Tools (with subentries: `tool-note-and-vote`, Foundation Sprint Family, Design Sprint Family) to the AGENTS.md TOC near the top of the file.
- **Why:** TOC-level navigation for the new lane.
- **Outcomes:** Sprint skills are findable from the TOC, not only from full-text scan.
- **Alternatives considered:** Auto-generate AGENTS.md TOC (consistent with A07; deferred).
- **Recommendation:** Hand-edit alongside A04.
- **Maintainer slot:** Maintainers.

---

### INFO - For the record (no action needed)

#### A16. CI failure on `f03d94d` recovered on `c8ea6d9`

**What:** The post-tag closure batch landed in two commits. `f03d94d` (the F-batch) added the missing tool skill pages + workflow pages + patched count-consistency. The Validation CI run on `f03d94d` returned `failure`. `c8ea6d9` (the G-batch) shipped immediately after with a workflow-generator fix and additional artifact sweep; CI returned `success` on it.

This is documented behavior, not a defect. The release narrative covers the closures. Noted here as a process learning: the post-tag closure cycle SHOULD have produced a green CI before the F-batch landed, or the F+G-batch should have shipped as one commit. The pre-tag validator bundle rule (A13) addresses the root cause going forward.

#### A17. Dependabot #10 + #16 remain open by design

Both alerts require Astro 6.x upgrade. Tracked in `plan_v2.16.0.md` DI3. No v2.15.x action.

#### A18. All 10 enforcing validators PASS on local HEAD

Confirmed by local re-runs of: count-consistency, link-validity --strict, frontmatter (skills + docs), no-body-h1, agents-md, commands, generated-content-untouched, FS family --strict, DS family --strict, meeting family. The release-state is good at the validator boundary; drift sits outside the validator coverage.

---

## Cross-cut category view

### Documentation drift (5 findings)

A01 (docs/index.mdx), A02 (docs/skills/index.md), A04 (AGENTS.md command table), A05 (samples README), A09 (Sprint Planning naming), A14 (release-notes callout), A15 (AGENTS.md TOC). **All P0-P3, none INFO. Highest-leverage category.**

### CI / validator gaps (3 findings)

A03 (workflow generator bug), A06 (count-consistency regex), A07 (issue #132). **Cluster: each validator gap explains one or more of the documentation drift findings.**

### Continuity / plan-update (3 findings)

A08 (v2.15.0 plans status), A12 (CONTEXT.md refresh), A13 (runbook codification). **Reinforces the existing `feedback_update-plans-as-you-ship.md` and `feedback_pre-tag-validator-bundle.md` rules.**

### Consistency / cross-doc (2 findings + spillover)

A09 (naming-discipline application), A10 (sample-count reconciliation). **Most consistency issues already covered under documentation drift.**

### Bug discoveries (1 finding)

A03 is the only true software bug. Everything else is content drift or process gap.

### Issue-resolution candidates

A07 (issue #132 [M-20]) is directly relevant. Other open issues (#131, #132, #133, #134, #135, #136) are independent feature / infrastructure work; this audit does not change their priority.

---

## Recommended phasing

### v2.15.1 (suggested patch, same-day or next-day)

Goal: close the user-visible drift in 1 commit pass. Mirrors the v2.14.0 to v2.14.1 same-day-patch pattern.

| ID | Title | Effort |
|---|---|---|
| A01 | Update docs/index.mdx homepage (counts + Tool card + breakdown line) | ~30 min |
| A02 | Add Tool row + intro to docs/skills/index.md | ~10 min |
| A03a | Add 3 missing workflow_info dict entries to workflow generator; regen index | ~15 min |
| A04 | Add 15 tool command rows to AGENTS.md table | ~15 min |
| A05 | Refresh library samples README headline + tables | ~30 min |
| A09 | Sprint Planning (agile) label + disambiguation callout | ~10 min |
| A15 | AGENTS.md TOC entries for Tools section | ~5 min |

**Estimated total: 2 hours.** Single commit batch with cumulative validator re-run. Optional v2.15.1 patch-tag if symmetry with v2.14.x is desired; otherwise main HEAD pushes through deployed docs site.

### v2.15.2 (suggested follow-up, this week or next)

Goal: structural improvements + plan closure.

| ID | Title | Effort |
|---|---|---|
| A03b | Refactor workflow generator to handle dict-missing entries (frontmatter-driven OR error-loudly) | ~1 hr |
| A08 | Update v2.15.0 master plan + 2 integration plans with post-tag final-status block | ~20 min |
| A10 | Sample-count reconciliation (174 vs 171); correct README_SAMPLES.md if A05 used conservative phrasing | ~30 min |
| A12 | AGENTS/claude/CONTEXT.md per-phase tables refresh (close v2.14.x Task 2) | ~1.5 hr |
| A13 | Pre-tag validator bundle script + runbook reference | ~1.5 hr |
| A14 | Top-of-file callout in v2.15.0 release notes for post-tag closures | ~10 min |

**Estimated total: 5 hours.** May or may not warrant a v2.15.2 patch tag depending on bundling preference.

### Inputs to v2.16.0

| ID | Title | Track |
|---|---|---|
| A06 + A07 | Extend count-consistency validator regex; close issue #132 [M-20] | M-20 / DI track |
| A11 | Sprint Skills cross-family overview / FAQ landing pages (decide scope) | Feature track |

### Decision points

- **Cut a v2.15.1 patch tag?** Same-day-patch precedent says yes (v2.14.0 -> v2.14.1 -> v2.14.2). The audit findings warrant it because A01-A05 are user-visible. Recommendation: YES, cut v2.15.1 after the v2.15.1 batch lands.
- **Cut a v2.15.2 patch tag?** Marginal. The v2.15.2 items mostly polish internal/process state. Recommendation: bundle into v2.16.0 unless A11 (Sprint Skills overview) ships, in which case v2.15.2 makes sense.
- **Author A11 (cross-family overview)?** Depends on bandwidth. The audit recommends it but not as urgent.

---

## Open questions for the maintainer

1. **v2.15.1 patch-tag decision:** ship as same-day patch (consistent with v2.14.x cadence) or main-HEAD-only (faster; lower release-overhead)?
2. **Audit scope expansion:** This audit covers public-facing surfaces + CI. Should a follow-up cover internal AGENTS/ files (CONTEXT.md, DECISIONS.md, session logs) for similar drift?
3. **A11 cross-family Sprint Skills overview:** worth authoring now or defer to v2.16.0 alongside any sprint-related improvements?
4. **A03b workflow-generator refactor:** prefer frontmatter-driven extraction (cleaner) or error-loudly-on-missing-dict (smaller change)?
5. **A06 + A07 count-consistency extension:** scope tightly (regex change only) or broadly (move count assertions into frontmatter machinery)?

---

## Audit metadata

- **Authored by:** Claude (opus 4.7), 2026-05-16 16:30 PDT
- **Audit duration:** ~1 hour of surface sweep + validator runs
- **Files read for evidence:** ~22 high-visibility surfaces + 10 validator outputs + 7 generator scripts + plan files
- **Cross-references:**
  - Master plan: `../v2.15.0/plan_v2.15.0.md`
  - FS plan: `../v2.15.0/foundation-sprint-integration-plan.md`
  - DS plan: `../v2.15.0/design-sprint-integration-plan.md`
  - v2.14.x cleanup: `../v2.15.0/v2.14.x-deferrals-cleanup-plan.md`
  - v2.16.0 plan stub: `../v2.16.0/plan_v2.16.0.md`
  - Pre-release runbook: `../runbook_clean-worktree-cut-tag-publish.md`
  - Open issue: https://github.com/product-on-purpose/pm-skills/issues/132
  - Memory: `feedback_update-plans-as-you-ship`, `feedback_pre-tag-validator-bundle`, `feedback_stale-aggregate-counter`

**Status:** DRAFT for maintainer review. No remediation has been applied. The "Recommended phasing" section is the proposed action plan; maintainer decisions on the 5 open questions above shape the final scope.
