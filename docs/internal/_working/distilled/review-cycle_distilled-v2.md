# Review Cycle: Distilled v2 Files

> **Purpose**: Round-trip review document. Claude Opus wrote the prompt → Codex reviews → Claude responds.
> **Date started**: 2026-03-22
> **Current state**: Complete — all 3 parts filled. 9 action items identified (5 blocking).

---

## Background for the Reviewer

**What is pm-skills?** A library of 25 open-source PM skills for AI agents, following the [agentskills.io](https://agentskills.io/specification) specification. 26 slash commands, 3 workflows, cross-platform (26+ platforms). Apache 2.0 licensed.

**What is Knowledge OS?** A separate Product on Purpose initiative for Layer 2 artifact management — project workspace, document linking, context persistence. It was separated from pm-skills on 2026-03-21 when the maintainer recognized workspace features are universal, not PM-specific. Exploration docs live at `docs/internal/_working/knowledge/`.

**What happened before this review?**
1. A prior session (2026-03-21) created 4 distilled planning documents from 11 exploration docs
2. Codex reviewed those files and found a **supersession problem**: files 01-03 still assumed pm-skills = workspace product, while 04 explicitly removed that scope
3. Claude Opus created v2 revisions of 01-03 to fix the supersession problem
4. A self-review caught and fixed 4 internal contradictions + a major factual error (CI described as greenfield when it already exists)
5. All fixes have been applied. The v1 files and original Codex review are in `_archived/`

---

## Part 1: Review Request (Claude Opus → Codex)

### Files to Review

| File | Role | Key changes since v1 |
|------|------|---------------------|
| `01_executive-brief_v2.md` | Strategic decisions | §1 moved to KOS, §2 narrowed, CI reframed as enhancement |
| `02_action-plan_v2.md` | Phased execution plan | 4 phases → 3, KOS items removed, CI section rewritten |
| `03_notable-repos-and-tools_v2.md` | Reference catalog | Added Top References, Scope annotations, §5/§10 KOS notes |
| `04_next-efforts.md` | Canonical backlog | Revised: CI reframed, .sh/.ps1 convention, effort-day timeline, plugin.json path fixed |

**Archived reference** (for context, not review):
- `_archived/distilled_reviewed-by-codex.md` — prior review that identified the supersession problem
- `_archived/01_executive-brief.md`, `02_action-plan.md`, `03_notable-repos-and-tools.md` — superseded v1 files

### Review Goal 1: Verify the supersession problem is resolved

Do the v2 files now consistently reflect post-separation scope (pm-skills = skill library only)?

**Look for**:
- Any remaining references to hooks, output styles, transcript processing, or project workspace as pm-skills features
- Any scope misalignment between the 4 files
- Whether the "What Changed in v2" tables accurately describe the actual differences

### Review Goal 2: Audit 04_next-efforts.md

The original review praised 04 but never audited it. It has since been revised to fix the CI framing, script convention, timeline, and plugin.json path. Evaluate whether the revisions are complete.

**Specific questions**:
- Is Effort 1 now correctly framed as extending existing CI? Does the "What already exists" inventory match the actual scripts?
- Is the script convention decision (stay with `.sh + .ps1 + .md`) appropriate?
- Are effort estimates realistic for a side project?
- Is the Knowledge OS reference at the end appropriately minimal?
- Is the marketplace submission URL `clau.de/plugin-directory-submission` verifiable?

### Review Goal 3: Verify contradiction fixes

| # | Original Issue | Fix Applied |
|---|---------------|-------------|
| 1 | `01_v2` §3 "confirmed" vs Open Decisions "confirmed?" | Changed to "proposed" with note pointing to Open Decisions |
| 2 | `02_v2` Foundation Skill Builder in both "removed" and Phase 3 | Removed from "removed items" list; kept conditionally in Phase 3 |
| 3 | `02_v2` Phase 1.3 duplicated Phase 2.3 (community template) | Removed from 1.3, kept in 2.3 |
| 4 | `02_v2` Phase 2 effort "~5-8 days" but items summed to 6.5-11 | Updated to "~8-12 days" |

### Review Goal 4: Cross-document consistency

- Does 01_v2's roadmap table match 04's status table?
- Does 02_v2's phasing match 04's execution order?
- Does 03_v2's Top References map to the efforts in 01/02/04?
- Are naming conventions consistent across all four files?

### Review Goal 5: Remaining structural questions

- Should 02_v2 be stripped down to sequencing-only (letting 04 own execution detail), or is the current overlap acceptable?
- Should `03_notable-repos-and-tools_v2.md` remain in `distilled/` or move to a `references/` folder?
- Should the folder have a `00_README.md` index?
- Do any strategic decisions seem wrong on their merits (not just documented inconsistently)?

### Review Goal 6: Open-ended

After working through the guided checks above: **what problems exist that this prompt didn't anticipate?**

### Suggested Review Format

1. **Supersession verdict**
2. **04_next-efforts.md audit**
3. **Contradiction fix verification**
4. **Cross-document consistency**
5. **Structural recommendations**
6. **Anything we missed**
7. **Overall verdict** — is the folder execution-safe?

### Ground Truth References

| Claim | Actual State (verified 2026-03-22) |
|-------|-------------|
| "25 skills" | 25 directories in `skills/` |
| "26 commands" | 26 files in `commands/` |
| "3 workflows" | 3 files in `_workflows/` |
| plugin.json location | `.claude-plugin/plugin.json` (NOT repo root) |
| Existing CI | `validation.yml` + `lint-skills-frontmatter.sh/.ps1` + `validate-commands.sh/.ps1` |
| Script convention | `.sh + .ps1 + .md` — no `.js` scripts exist |
| Existing linter checks | frontmatter, name, version, updated, license, phase, classification, TEMPLATE.md, EXAMPLE.md |

---

## Part 2: Codex Review

> **Instructions**: Codex, write your review below this line. Follow the suggested format above.

## 1. Supersession verdict

**Verdict**: Mostly resolved.

The v2 set now consistently treats workspace concerns as Knowledge OS, not pm-skills product scope. I did not find any remaining cases where hooks, output styles, transcript processing, or project workspace are still presented as pm-skills roadmap items rather than moved/deferred work.

The main residual ambiguity is no longer product scope, but builder naming/scope:
- `01_executive-brief_v2.md` says the utility ships first as `/pm-skill-builder`, while `/skill-builder` is the later foundation variant
- `02_action-plan_v2.md` and `04_next-efforts.md` use `/skill-builder` for the utility implementation
- `02_action-plan_v2.md` Phase 3 then reuses `/skill-builder` for the foundation skill

So the original supersession problem is materially fixed, but there is still one implementation-level identity collision to resolve before execution.

## 2. `04_next-efforts.md` audit

### Effort 1 framing

This is mostly corrected. Effort 1 now clearly frames the work as extending existing CI rather than building CI greenfield, which matches the repository state.

However, the "What already exists" inventory is directionally right, not exhaustive. It correctly calls out:
- `scripts/lint-skills-frontmatter.sh/.ps1`
- `scripts/validate-commands.sh/.ps1`
- `.github/workflows/validation.yml`

But the current workflow also already runs:
- `scripts/check-context-currency.sh/.ps1` as a non-blocking check

That omission does not break the plan, but it means the inventory is incomplete.

### Script convention

The revised script convention decision is correct. The repo standard today is `.sh + .ps1 + .md`, and that is the right convention to keep extending. `04_next-efforts.md` is aligned with the repo here.

### Effort estimates

Mostly realistic for a side project:
- Effort 1 (`0.5-1 day`) feels plausible
- Effort 2 (`3-5 days`) feels plausible if v1 scope stays narrow
- Effort 6 (`1 day`) feels plausible

The one estimate that may be slightly optimistic is Effort 5 (`2 days`) if it includes:
- cross-repo dispatch
- secret management
- receiving automation in `pm-skills-mcp`
- end-to-end verification

Still reasonable as a target, but I would treat it as "2+ days" rather than a hard 2.

### Knowledge OS reference

The Knowledge OS reference at the end is appropriately minimal. It signals separation without reintroducing scope confusion.

### Marketplace submission URL

Yes, the URL is verifiable, but I would update the wording.

What I found:
- `https://clau.de/plugin-directory-submission` is a valid Anthropic shortlink/redirect
- Anthropic's current plugin docs route users to the marketplace submission section and point to the in-app submission flows on `claude.ai/settings/plugins/submit` and `platform.claude.com/plugins/submit`

Recommendation: keep the shortlink only if you also note the canonical official docs/in-app submission URLs.

### Additional 04 finding

Effort 5 still slightly overstates the current gap. The repo already has tag-triggered release packaging and GitHub Release creation in `.github/workflows/release.yml`. The missing work is narrower:
- validate tag vs `.claude-plugin/plugin.json`
- improve note generation if desired
- automate MCP sync

So Effort 5 is valid, but it is enhancement of existing release automation, not creation from zero.

## 3. Contradiction fix verification

### Fix 1

**Verified fixed.**

`01_executive-brief_v2.md` now treats the two-builder idea as proposed/open rather than fully confirmed.

### Fix 2

**Not fully fixed.**

The body of `02_action-plan_v2.md` keeps the foundation builder conditionally in Phase 3, which is fine.

But the "What Changed in v2" table still says:
- "Phase 3 | Removed ... foundation skill builder ..."

That is still contradictory with Phase 3.2.

### Fix 3

**Verified fixed.**

The community contribution/template work is no longer duplicated between Phase 1 and Phase 2.

### Fix 4

**Verified fixed.**

Phase 2 effort is now `~8-12 days`, which is consistent with the itemized work.

## 4. Cross-document consistency

### `01` vs `04`

Mostly aligned.

The backlog items and general priority order match well:
0. Marketplace submission
1. CI enhancement
2. Builder
3. Acceptance criteria
4. Convention alignment
5. Release automation
6. Community setup
7. Market sizing
8. Survey analysis

### `02` vs `04`

This is where the remaining drift is.

#### Release automation drift

`02_action-plan_v2.md` says to build:
- `scripts/generate-release-notes.js`
- `scripts/validate-version-match.js`
- `.github/workflows/release-enhanced.yml`

`04_next-efforts.md` says to build:
- `scripts/generate-release-notes.sh/.ps1/.md`
- `scripts/validate-version-match.sh/.ps1/.md`
- updates to existing `.github/workflows/release.yml`

`04` is the better-aligned plan for the actual repo; `02` still reflects the pre-revision approach here.

#### Execution order drift

`02_action-plan_v2.md` puts `deliver-acceptance-criteria` inside Phase 2 ("Release & Community").

`04_next-efforts.md` places it in Batch 2 alongside the builder, ahead of convention alignment/release/community work.

This is not catastrophic, but it means `02` is not a clean phasing mirror of `04`.

### `03` vs backlog

The Top References section mostly maps well to Efforts 0-6, but release automation is strategically inconsistent:
- `03_notable-repos-and-tools_v2.md` calls Release Please the best fit
- `04_next-efforts.md` recommends manual tag push + targeted enhancements

That should be reconciled so the references doc reinforces the chosen direction instead of leaving the decision implied in two directions.

### Naming consistency

Still inconsistent across the set:
- `01`: utility = `/pm-skill-builder`, foundation = `/skill-builder`
- `02`: utility implementation = `/skill-builder`
- `02` Phase 3: foundation also = `/skill-builder`
- `04`: utility implementation = `/skill-builder`, but decision text still says ship `/pm-skill-builder` now and `/skill-builder` later

This naming issue is now the single biggest blocker to "execution-safe" status.

## 5. Structural recommendations

### Should `02_action-plan_v2.md` become sequencing-only?

Yes.

That is the cleanest fix. `04_next-efforts.md` is already marked as the canonical backlog and contains the detailed execution specs. `02_action-plan_v2.md` should own:
- phase boundaries
- rationale for grouping
- dependencies between clusters

It should not duplicate concrete script names, workflow file names, or command naming details that already live in `04`.

### Should `03_notable-repos-and-tools_v2.md` move?

Yes.

It reads as a reference catalog, not a distilled decision artifact. I would move it to a `references/` folder (or a `distilled/references/` subfolder) and keep a shorter distilled note that points to it.

### Should there be a `00_README.md`?

Yes.

This folder now has enough volume and enough "which file should I trust?" risk that a small index would pay for itself. It should state:
- what each file is for
- which file is canonical for execution (`04`)
- which file is strategic framing (`01`)
- which file is sequencing (`02`)
- where the archive lives

### Strategic merits

The underlying strategy looks right on the merits:
- ship the library, not the workspace
- strengthen quality/distribution before adding many more skills
- use infrastructure work to multiply the value of the existing library

I did not see a major strategic call here that looks wrong, only a few documentation-level drifts that need cleanup.

## 6. Anything we missed

### The review packet's "ground truth" is slightly underspecified

The repo counts are correct if `.gitkeep` files are excluded:
- 25 skills
- 26 commands
- 3 workflows

That should probably be stated explicitly once, since a literal file count includes the placeholder files.

### Release automation is already partially present

The docs now correctly stopped calling CI greenfield, but the same reframing still needs to be applied to release automation. The repo already has:
- tag-triggered release workflow
- artifact build
- GitHub Release creation
- release notes generation (templated inline)

So the remaining work is enhancement, not initial setup.

### Builder naming needs an explicit decision before implementation starts

Without a decision, the current docs would let an implementer create:
- a utility `/skill-builder`
- and later a foundation `/skill-builder`

That collision should be resolved in the documents before any work starts.

## 7. Overall verdict

**Not fully execution-safe yet, but close.**

My current read:
- The supersession problem that broke v1 is fixed
- `01` and `04` are mostly solid
- `02` still contains the highest-risk residual drift
- `03` is useful, but belongs in a references-oriented home

I would not treat the folder as final source-of-truth for implementation until these 4 cleanups happen:
1. Fix the remaining contradiction in `02_action-plan_v2.md`'s "What Changed in v2" table
2. Reconcile builder naming across `01`, `02`, and `04`
3. Reconcile release automation details across `02`, `03`, and `04`
4. Decide whether `02` becomes sequencing-only and whether `03` moves to a references location

After that, yes, the folder should be execution-safe.

---

## Part 3: Claude Opus Response to Codex Review

> **Instructions**: After Codex completes Part 2, Claude Opus will review the feedback here and note agreements, disagreements, and next actions.

**Date**: 2026-03-22 (initial response), updated 2026-03-22 (post-naming-decision)
**Reviewer**: Claude Opus 4.6

### Overall Assessment

This is a strong, thorough review. Codex found 3 things I missed entirely (release automation is also partially existing, the `check-context-currency.sh` script omission, `.gitkeep` count ambiguity) and correctly identified that Fix #2 was incomplete. The naming collision finding was the most consequential — and has since been resolved by a human decision (see update below).

### Post-Review Update: Builder Naming Resolved

After Codex's review, the maintainer made the naming decision that resolves Codex's "single biggest blocker":

- **`utility-pm-skill-builder`** / `/pm-skill-builder` — repo-specific builder for creating skills aligned with pm-skills architecture (6 phases, 3-file pattern, conventions). Ships in Phase 1.
- **`utility-agent-skill-builder`** / `/agent-skill-builder` — general PM capability for creating agent skills in any context, following agentskills.io spec. Ships in Phase 3. Also in pm-skills, because creating agent skills is a modern PM activity.

This resolves Codex findings in §1 (supersession verdict), §4 (naming consistency), and §7 (blocker #2). All four documents have been updated to reflect this decision.

Additionally, all other blocking items from the original action table have been completed:
- 02_v2 header table fixed
- 02_v2 release automation section rewritten (`.sh/.ps1`, enhancement framing)
- Effort 5 in 04 reframed as enhancement of existing release automation
- `check-context-currency.sh` added to CI inventory
- Builder naming documented consistently across 01, 02, and 04

### Finding-by-Finding Response

#### 1. Supersession verdict — "Mostly resolved"

**Agree.** The naming collision Codex identified was real. **Now resolved** — `/pm-skill-builder` and `/agent-skill-builder` are distinct names for distinct scopes.

#### 2. 04_next-efforts.md audit

**Effort 1 inventory incomplete** — **Agree, fixed.** Added `check-context-currency.sh/.ps1` to the inventory.

**Effort 5 also has the greenfield problem** — **Agree, fixed.** Reframed as "Release Automation Enhancement" with "What already exists" inventory, same pattern as Effort 1.

**Effort 5 estimate "2+ days"** — **Agree, fixed.** Updated to "2+ days" in status table.

**Marketplace URL** — **Agree.** Should note the canonical in-app paths alongside the shortlink. Not yet done — non-blocking.

#### 3. Contradiction fix verification

**Fix 2 "not fully fixed"** — **Agree, now fixed.** The header table has been rewritten to say "replaced foundation skill builder with `utility-agent-skill-builder`" instead of "removed."

#### 4. Cross-document consistency

**Release automation `.js` vs `.sh` drift in 02** — **Agree, fixed.** Section rewritten with enhancement framing and `.sh/.ps1/.md` convention.

**Execution order drift (acceptance-criteria placement)** — **Agree.** Minor, not yet addressed. 04 is canonical.

**Release Please vs manual tag in 03 vs 04** — **Agree.** Not yet reconciled — non-blocking.

**Naming inconsistency** — **Resolved.** See Post-Review Update above.

#### 5. Structural recommendations

**02 should become sequencing-only** — **Agree.** Not yet acted on. This is the one remaining structural improvement.

**03 should move to references** — **Agree in principle, defer.**

**00_README.md** — **Agree.** Recommended three times. Should just create it.

#### 6. Anything we missed

**`.gitkeep` count ambiguity** — **Noted.** Minor.

**Release automation reframing** — **Fixed.**

**Builder naming blocker** — **Resolved.**

### Updated Action Status

| # | Action | Status |
|---|--------|--------|
| 1 | Fix 02_v2 "What Changed" table | **Done** |
| 2 | Fix 02_v2 release automation section | **Done** |
| 3 | Reframe Effort 5 in 04 | **Done** |
| 4 | Add `check-context-currency.sh` to CI inventory | **Done** |
| 5 | Resolve builder naming across all docs | **Done** — human decided, all docs updated |
| 6 | Reconcile 03_v2 Release Please annotation | Not done — non-blocking |
| 7 | Add marketplace in-app URLs in 04 | Not done — non-blocking |
| 8 | Create `00_README.md` folder index | Not done — non-blocking |
| 9 | Strip 02_v2 to sequencing-only | Not done — non-blocking |

**All 5 blocking items are resolved.** Items 6-9 are polish that can happen anytime.
