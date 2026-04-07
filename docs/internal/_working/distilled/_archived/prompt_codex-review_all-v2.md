# Codex Review Request: Distilled v2 Files

> **Date**: 2026-03-22
> **Requested by**: Claude Opus 4.6 (after self-review and contradiction fixes)
> **Context**: v2 revisions of files 01-03 were created to resolve the supersession problem identified in a prior Codex review (now archived at `_archived/distilled_reviewed-by-codex.md`). A self-review then caught and fixed 4 internal contradictions. This prompt asks Codex to verify the fixes and audit for remaining issues.

---

## Files to Review

| File | Role | What changed from v1 |
|------|------|---------------------|
| `01_executive-brief_v2.md` | Strategic decisions | §1 moved to Knowledge OS, §2 narrowed, §4 rewritten |
| `02_action-plan_v2.md` | Phased execution plan | Phases 2-4 reduced to Phases 2-3, Knowledge OS items removed |
| `03_notable-repos-and-tools_v2.md` | Reference catalog | Added Top References, Scope annotations, §5/§10 Knowledge OS notes |
| `04_next-efforts.md` | Canonical backlog (unchanged) | Not revised — audit it for the first time |

**Archived reference** (do not review, but available for context on what changed):
- `_archived/distilled_reviewed-by-codex.md` — prior Codex review that identified the supersession problem
- `_archived/01_executive-brief.md`, `02_action-plan.md`, `03_notable-repos-and-tools.md` — superseded v1 files

---

## Review Goals

### 1. Verify the supersession problem is resolved

The original review's primary finding was that 01 and 02 still assumed pm-skills should grow into a workspace product, while 04 explicitly removed that scope. The v2 files were written to fix this.

**Check**: Do the v2 files now consistently reflect the post-separation scope (pm-skills = skill library only, Knowledge OS = workspace layer)?

**Specific things to look for**:
- Any remaining references to hooks, output styles, transcript processing, or project workspace as pm-skills features
- Any scope that 04 removes but v2 files still include
- Any scope that v2 files remove but 04 still includes
- Whether the "What Changed in v2" tables at the top of each file accurately describe the actual differences

### 2. Audit 04_next-efforts.md for the first time

The original Codex review called 04 the "strongest document in the folder" but did not audit it. It deserves the same scrutiny as 01-03 received.

**Known issues to evaluate**:

a. **The CI pipeline is described as greenfield, but it isn't.** The repo already has:
   - `scripts/lint-skills-frontmatter.sh` (122 lines) — validates frontmatter fields, name-dir match, phase/classification validity, TEMPLATE.md/EXAMPLE.md existence
   - `scripts/lint-skills-frontmatter.ps1` — Windows equivalent
   - `scripts/validate-commands.sh` / `.ps1` — command path validation
   - `.github/workflows/validation.yml` — runs both scripts cross-platform on every PR

   Effort 1 proposes 5 new `.js` scripts and a new workflow, covering ~70% of what already exists. The effort estimate ("2-3 days") and framing ("this is the foundation") are arguably too large.

   **Question for Codex**: Should Effort 1 be reframed as "extend and enhance existing CI" rather than "create CI pipeline"? What's the realistic delta?

b. **All proposed scripts are `.js` but the repo convention is `.sh` + `.ps1` + `.md`.** The `scripts/` directory follows a clear pattern: every script ships as a shell script pair plus documentation. Switching to Node.js is defensible (richer parsing, single language) but the convention break is unacknowledged.

   **Question for Codex**: Should the new scripts follow the existing `.sh/.ps1` convention, or is switching to `.js` the right call? What are the tradeoffs?

c. **The execution timeline assumes full-time allocation.** "Week 1: Day 1-2... Week 2: Day 1-3..." reads as consecutive working days. This is a side project for a PM at Pushpay with variable time allocation.

   **Question for Codex**: Should the timeline use "working sessions" or "effort-days" instead of "Week N, Day N" to avoid implying contiguous calendar time?

d. **The Knowledge OS parallel track section** at the end of 04 slightly contradicts the separation thesis. If Knowledge OS is truly a separate initiative, should it appear in pm-skills planning at all?

e. **Effort 4 (Convention alignment, "1-2 days") touches all 25 skills.** Is this realistic, even with AI-assisted batch processing?

f. **The marketplace submission URL `clau.de/plugin-directory-submission`** — is this still the correct submission path? Can it be verified?

### 3. Check the contradictions that were fixed

The self-review found and fixed 4 contradictions. Verify the fixes are clean:

| # | Issue | Fix Applied | Verify |
|---|-------|-------------|--------|
| 1 | `01_v2` §3 said "confirmed" but Open Decisions said "confirmed?" | Changed to "proposed" with note pointing to Open Decisions | Does the language now read consistently? |
| 2 | `02_v2` listed Foundation Skill Builder in both "removed" and Phase 3 | Removed from the "removed items" list since it's conditionally in Phase 3 | Is the conditional framing in §3.2 clear enough? |
| 3 | `02_v2` Phase 1.3 duplicated Phase 2.3 (community issue template) | Removed from 1.3, kept in 2.3 where it has full context | Does Phase 1 still make sense without the second quick win? |
| 4 | `02_v2` Phase 2 effort "~5-8 days" but items summed to 6.5-11 | Updated to "~8-12 days" | Does the new range match the itemized estimates? |

### 4. Check cross-document consistency

The four distilled files should tell a coherent story when read together. Specifically:

- Does 01_v2's roadmap table match 04's status table?
- Does 02_v2's phasing match 04's execution order?
- Does 03_v2's "Top References" section map to the actual efforts described in 01/02/04?
- Are skill/command naming conventions consistent across all four files?
- Is the "25 skills" count used correctly (existing count, will grow with new efforts)?

### 5. Assess whether 04 needs its own v2

Given the issues identified above (CI framing, script convention, timeline assumptions), does 04_next-efforts.md need a revision? Or are the issues minor enough to fix in-place?

### 6. Assess folder readiness

v1 files and the prior Codex review have been archived to `_archived/`. After this review, should the folder also have:
- A `00_README.md` index (recommended by the original review, not yet created)?
- Any other structural changes?

---

## Review Format

Please structure your review as:

1. **Supersession verdict** — is the primary problem from the first review resolved?
2. **04_next-efforts.md audit** — first full review of this document
3. **Contradiction fix verification** — are the 4 fixes clean?
4. **Cross-document consistency** — any remaining misalignment?
5. **Recommended actions** — prioritized list of what to do next
6. **Overall verdict** — is the folder now execution-safe?

---

## Ground Truth References

For verifying claims in the documents, these are the actual repo artifacts:

| Claim | Actual State |
|-------|-------------|
| "25 skills" | 25 directories in `skills/` (verified 2026-03-22) |
| "26 commands" | 26 files in `commands/` (verified 2026-03-22) |
| "3 bundles" | 3 files in `_bundles/` (verified 2026-03-22) |
| "plugin.json" | Located at `.claude-plugin/plugin.json`, NOT repo root |
| "No CI exists" | **Wrong** — `validation.yml` + 2 script pairs already run on PRs |
| "Scripts are .js" | **Convention is .sh + .ps1 + .md** — no .js scripts exist today |
| Existing validation | `lint-skills-frontmatter.sh` checks: frontmatter, name, version, updated, license, phase, classification, TEMPLATE.md, EXAMPLE.md |
| Existing validation | `validate-commands.sh` checks: command file paths |
| CI workflow | `.github/workflows/validation.yml` — runs on push to main + PRs, cross-platform |

---

## Author's Self-Review of This Prompt and the Primary Documents

**Date**: 2026-03-22
**Author**: Claude Opus 4.6

### Assessment of This Prompt

**What the prompt does well:**
- The Ground Truth table gives Codex verifiable facts to check against, which prevents the review from being purely document-to-document
- The contradiction fix table is specific enough that Codex can verify each fix mechanically
- The suggested review format ensures every important dimension is covered

**What the prompt gets wrong or misses:**

1. **Anchoring risk.** The prompt pre-identifies 6 known issues (§2a-f) and 4 contradiction fixes (§3). This is thorough but may cause Codex to confirm known issues rather than discover new ones. There is no open-ended "what else did we miss?" prompt. **Suggestion for Codex**: After working through the guided checks, do one pass asking only "what problems exist that this prompt didn't anticipate?"

2. **No product context for the reviewer.** The prompt assumes Codex already knows what pm-skills is, what Knowledge OS is, and why the separation happened. A cold reviewer would be lost. **Missing context**: pm-skills is a library of 25 open-source PM skills for AI agents following the agentskills.io spec. Knowledge OS is a separate Product on Purpose initiative for Layer 2 artifact management (project workspace, document linking, context persistence). The separation decision happened mid-conversation on 2026-03-21 when the maintainer recognized workspace features are universal, not PM-specific.

3. **Strategy is treated as settled.** The prompt only asks about document quality and consistency — not whether the strategic decisions (CI-first priority, marketplace submission as #0, two-skill-builder approach, Knowledge OS separation) are actually correct. The original Codex review had the same gap. **Suggestion for Codex**: Briefly note whether any strategic call seems wrong on its merits, not just whether it's documented consistently.

4. **The CI-already-exists issue is flagged but not fixed.** The prompt tells Codex that the CI framing is wrong in 04 (and inherited by 01_v2 and 02_v2), but the documents themselves haven't been corrected. Codex will review documents containing a known error and confirm it. This is less efficient than fixing first and verifying second.

5. **No audience definition.** Who reads these documents? Just the maintainer (a single PM)? Future contributors? AI agents executing the plan? The right level of detail depends on the answer. Currently the documents are detailed enough for agent execution but verbose for human scanning.

### How Each Document Should Be Updated

#### `01_executive-brief_v2.md` — 3 changes recommended

**Change A: Remove §1 as a numbered section.** It's a 3-paragraph stub that says "this moved to Knowledge OS." That's metadata, not a strategic section. Move the separation note to a callout in the header or the "What Changed" table. This removes a section that wastes the reader's attention and makes the document read as three real sections (plugin quality, skill builder, roadmap) instead of one vestigial stub followed by three real sections.

**Change B: Fix CI framing.** The one-line summary says pm-skills needs "CI" — it already has CI. The brief should say "CI enhancement" or "extended CI." §3 should mention that validation already runs on PRs and the work is additive (AGENTS.md checks, MCP impact advisory, description length). This is a factual correction, not a reframe.

**Change C: Trim or cut the Sources section.** Three external links in a "Sources" section adds little. Either expand it to be genuinely useful (with the specific source for each decision) or remove it — the companion docs have the references.

#### `02_action-plan_v2.md` — 4 changes recommended

**Change A: Rewrite Phase 1.1 to acknowledge existing CI.** This is the most important change. The section should:
1. Inventory what already exists (`lint-skills-frontmatter.sh` covers frontmatter fields, name-dir match, phase/classification, TEMPLATE.md/EXAMPLE.md; `validate-commands.sh` covers command paths; `validation.yml` runs both cross-platform)
2. Identify the actual gaps: AGENTS.md validation, MCP impact advisory, description length enforcement, naming convention checks beyond what the linter does
3. Decide: extend existing `.sh/.ps1` scripts or migrate to `.js` (and say why)
4. Reduce effort estimate from "2-3 days" to ~1 day, since ~70% of the validation already exists

**Change B: Resolve the 01/02/04 role overlap.** The "How to Use" section says 04 has the "most detailed execution specs" — but 02 itself contains file trees, done-when checklists, and step-by-step breakdowns that duplicate 04. Currently 02 is neither a clean sequencing view nor a clean execution spec — it's a partial copy of 04 with phasing added. Either:
- Strip 02 down to sequencing + dependencies + effort totals (let 04 own the detail), or
- Promote 02 as the execution doc and demote 04 to a status tracker

Both are defensible, but the current overlap means updates must be made in two places.

**Change C: Fix "Quick Win" (singular).** After removing the duplicate community template, Phase 1.3 has one item. Either rename to "1.3 Quick Win: Marketplace Submission" or absorb it into the Phase 1 header as a standalone bullet.

**Change D: Note the `.js` convention break.** If the plan proposes `.js` scripts, it should acknowledge the existing `.sh + .ps1 + .md` convention and state why the switch is justified (e.g., "richer YAML parsing, single runtime, Node available in CI") or follow the existing convention.

#### `03_notable-repos-and-tools_v2.md` — 2 changes recommended

**Change A: Consolidate related entries.** Four GSD entries (GSD, GSD v2, GSD Educational Course, GSD Deep Analysis) could be one entry with sub-bullets. Same for the 3 agentskills.io spec entries (agentskills.io, agentskills/agentskills GitHub, anthropics/skills/spec). This would cut ~30 lines without losing information.

**Change B: Consider moving the full catalog out of `distilled/`.** This document is ~400 lines in a folder called "distilled." The Top References section (8 entries) is distilled. The remaining 42 entries are a research catalog. Options:
- Keep as-is (the Scope annotations make it navigable enough)
- Move to `docs/internal/_working/references/` and keep only the Top References table in `distilled/`
- Add a header note: "The Top References section is the distilled view. Sections 1-10 below are the full research catalog, retained for completeness."

The third option is the lightest touch.

#### `04_next-efforts.md` — 5 changes recommended (strongest case for a v2)

**Change A: Restructure Effort 1 around the existing CI.** This is the most important correction across all four documents. Reframe from "create CI validation pipeline" to "extend existing CI validation." Add an inventory of what `lint-skills-frontmatter.sh` and `validate-commands.sh` already check. Reduce the scope to the genuine delta:
- AGENTS.md consistency check (new)
- MCP impact advisory (new)
- Description length enforcement (gap in existing linter)
- Any naming checks beyond what the linter does (gap analysis needed)
Reduce estimate from "2-3 days" to "0.5-1 day."

**Change B: Decide the script convention.** State explicitly: "New validation scripts will follow the existing `.sh + .ps1 + .md` pattern" OR "New validation scripts will use Node.js (`.js`) because [reason], breaking the existing convention." The current documents propose `.js` without acknowledging the convention.

**Change C: Use effort-days, not calendar-weeks.** Replace "Week 1: Day 1-2..." with "Effort-days 1-2..." or a simple ordered list. The current framing implies contiguous full-time work, which doesn't match a side project with variable allocation.

**Change D: Fix `plugin.json` path.** Effort 5 says "ensures git tag matches plugin.json version" — the actual path is `.claude-plugin/plugin.json`. A small error but one that would waste time during execution.

**Change E: Compress or remove the Knowledge OS parallel track.** The section is 7 lines about a separate initiative. If Knowledge OS is truly separate, a single sentence referencing `docs/internal/_working/knowledge/` is enough. The current section gives scheduling advice ("Start it when you want a change of pace") that belongs in Knowledge OS's own planning, not here.

### Priority Order for Updates

| Priority | Document | Change | Why |
|----------|----------|--------|-----|
| 1 | `04_next-efforts.md` | Restructure Effort 1 around existing CI | Factual error with execution impact — someone running this plan would duplicate existing work |
| 2 | `02_action-plan_v2.md` | Rewrite Phase 1.1 to match | Inherits the same error from 04 |
| 3 | `04_next-efforts.md` | Decide script convention (.sh/.ps1 vs .js) | Blocks execution of Effort 1 |
| 4 | `04_next-efforts.md` | Fix plugin.json path, timeline framing | Small factual fixes |
| 5 | `01_executive-brief_v2.md` | Fix CI framing in summary and §3 | Consistency with corrected 04 |
| 6 | `02_action-plan_v2.md` | Resolve role overlap with 04 | Structural improvement, not blocking |
| 7 | `03_notable-repos-and-tools_v2.md` | Consolidate entries, add catalog note | Polish, not blocking |
| 8 | `01_executive-brief_v2.md` | Remove §1 stub, trim Sources | Polish, not blocking |

**Bottom line**: The documents' strategic judgment is sound. The problems are factual (CI already exists), structural (02 and 04 overlap), and presentational (stub sections, convention gaps). Priority 1-3 are worth doing before Codex reviews. Priorities 4-8 can be flagged for Codex to verify after the review.
