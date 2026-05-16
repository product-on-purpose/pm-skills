# Design Sprint Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Design Sprint facilitation skills (all prefixed `tool-design-sprint-*`) as part of pm-skills v2.15.0, completing the sprint tools collection alongside the Foundation Sprint track. This plan also ships the DS family contract, the DS family validator pair, and the end-to-end `foundation-to-design` workflow doc that handles the FS-to-DS transition narratively (replacing the dropped bridge skill).

**Architecture:** Same integration pattern as Foundation Sprint: skills drop directly into `skills/` with the `tool-` prefix per the `classification: tool` convention (architectural amendment 2026-05-13), commands into `commands/`, library samples into `library/skill-output-samples/`. There is NO bridge skill: the Foundation-to-Design transition lives in `_workflows/foundation-to-design.md` (authored here) and in both user guides. Two new workflows (`design-sprint`, `foundation-to-design`) extend `_workflows/`.

**Tech Stack:** Same as Foundation Sprint plan: markdown with YAML frontmatter; Bash plus PowerShell validator parity; Apache 2.0 license.

**Cross-references:** Skill content is specified in `design-sprint-design-spec.md`. This plan depends on `foundation-sprint-integration-plan.md` being fully executed first: shared `classification: tool` validator extensions, the `tool-note-and-vote` standalone skill, and `validate-agents-md` pattern extensions are owned by that plan. v2.14.x deferral cleanup (Node 22 bump + CONTEXT.md skills inventory refresh) is tracked in `v2.14.x-deferrals-cleanup-plan.md`; the CONTEXT.md refresh task should run after this plan completes so the refreshed tables reflect the final v2.15.0 tool catalog.

---

## Status

**Phases 1 + 2 + 3 COMPLETE. Phase 4 ready to execute.** All prerequisites met as of 2026-05-15. 12 of 21 tasks shipped (Phase 1 contract+validators+registry + Phase 2 all 7 DS family skills + Phase 3 both workflows). 9 tasks across 4 remaining phases pending (commands, library samples, docs incl Task 17a concept-doc refresh, integration).

### Where we are (snapshot 2026-05-15 evening)

| Phase | Status |
|---|---|
| Phase 1: DS family contract + validator pair | COMPLETE (Tasks 1-3 shipped; both validators PASS in scaffolding state; FS family validator still 7/7 PASS, no regression; lint + agents-md both PASS at 48 skills) |
| Phase 2: 7 DS family skills | COMPLETE (7 of 7 shipped: readiness, brief, map-and-target, sketch, decide-and-storyboard, prototype-plan, test-and-score; DS family validator 7/7 enforcing with --strict PASS; AGENTS.md at 55 paths; full Brainshelf 7-skill arc demonstrates end-to-end coherence) |
| Phase 3: Workflow (`design-sprint.md`) + `foundation-to-design.md` end-to-end workflow | COMPLETE (Tasks 11 + 12 shipped; both workflow docs live; FS workflow forward-references updated to live links; AGENTS.md DS Family section workflow-pending labels removed) |
| Phase 4: 7 slash commands | NOT STARTED |
| Phase 5: Library samples (21; 7 skills x 3 threads) | NOT STARTED |
| Phase 6: Documentation (using-design-sprint guide + concept doc verification + AGENTS.md DS section) | NOT STARTED |
| Phase 7: Integration check | NOT STARTED |

### Prerequisites status (all met)

- [x] `skills/tool-note-and-vote/` exists and passes `lint-skills-frontmatter` (shipped in FS plan commit `760d3c2`)
- [x] `scripts/lint-skills-frontmatter.sh` + `.ps1` recognize `classification: tool` (shipped `f4baba4`)
- [x] `scripts/validate-agents-md.sh` + `.ps1` recognize `skills/tool-*` directory patterns (already classification-agnostic; documented `0829a3c`)
- [x] `scripts/validate-foundation-sprint-skills-family.sh` + `.ps1` exist as pattern reference (shipped `d1b3ba0`, `d18159b`)
- [x] `docs/reference/skill-families/foundation-sprint-skills-contract.md` exists as pattern reference (shipped `44ad8d7`)
- [x] All 7 Foundation Sprint skills (`tool-foundation-sprint-*`) shipped (commits `b3b6b5d` through `29901fb`)
- [x] AGENTS.md tool section in place with FS family + tool-note-and-vote (shipped `519e216`)

### Immediate next action

Phase 4 Task 13: author 7 slash commands in `commands/tool-design-sprint-*.md`. Pattern from existing FS commands (`commands/tool-foundation-sprint-*.md`). Quick work; estimated ~0.5 session. Then Phase 5 (21 library samples; biggest remaining lift; 2-3 sessions). Then Phase 6 (using-design-sprint guide ~1500-2000 words including FS-to-DS handoff section + concept doc verification + AGENTS.md any final tweaks; ~1 session). Then Phase 7 (full validation suite + smoke tests). Total remaining: ~5-7 sessions to v2.15.0 ship.

## Prerequisites

This plan assumes the Foundation Sprint plan is fully executed:

- `skills/tool-note-and-vote/` exists and passes `lint-skills-frontmatter`
- `scripts/lint-skills-frontmatter.sh` + `.ps1` recognize `classification: tool`
- `scripts/validate-agents-md.sh` + `.ps1` recognize `skills/tool-*` directory patterns
- `scripts/validate-foundation-sprint-skills-family.sh` + `.ps1` exist (DS plan ships analogous validators)
- `docs/reference/skill-families/foundation-sprint-skills-contract.md` exists (DS plan ships its own `design-sprint-skills-contract.md`)
- All 7 Foundation Sprint skills (`tool-foundation-sprint-*`) are shipped
- AGENTS.md tool section is in place with FS family + tool-note-and-vote

## Scope

This plan covers:
- 7 Design Sprint skills (all `tool-design-sprint-*`)
- New `validate-design-sprint-skills-family` validator pair (DS family contract enforcement)
- `design-sprint-skills` family contract
- 2 new workflows (`design-sprint`, `foundation-to-design`)
- 7 slash commands (7 Design Sprint; no bridge command)
- 21 library samples (7 skills x 3 threads)
- Design Sprint user guide
- Design Sprint concept doc refresh (already shipped in commit `5b9e590`; tool-classification refresh pending)
- AGENTS.md additions for Design Sprint family

This plan does NOT re-create classification-tool validator extensions or the standalone tool skill - those are owned by the Foundation Sprint plan. It does NOT author a bridge skill: the FS-to-DS transition lives narratively in `_workflows/foundation-to-design.md` (Task 10) and in both user guides.

## Ratified Decisions

The Design Sprint design spec (`design-sprint-design-spec.md`) ends with 7 open questions, each carrying a "Lean X" recommendation but no explicit decision. The pre-execution review flagged this as P2.2 (risk of cross-skill inconsistency if open questions are re-litigated mid-execution). The following decisions are ratified before Phase 1 Task 1 begins:

| # | Open question | Ratified decision | Authored into |
|---|---|---|---|
| 1 | Prototype build inside or outside skill scope | **Outside skill scope.** `tool-design-sprint-prototype-plan` produces role plan + script + trial-run checklist; the prototype build itself is craft activity outside the AI invocation surface | `tool-design-sprint-prototype-plan` SKILL.md "When NOT to use" section |
| 2 | Five-Act Interview script generation (spec leaned: canonical structure for v0.1) | **Canonical Five-Act structure (Welcome / Context / Intro / Tasks / Debrief)** with team-supplied task wording; the act sequence is fixed | `tool-design-sprint-prototype-plan` TEMPLATE.md interview-script section |
| 3 | Scorecard customer count (spec leaned: 5 with warning at 3/4 or 6/7) | **5 customers is canonical; validator warns at 3-4 or 6-7; rejects below 3 or above 7** with a message recommending the canonical count | `tool-design-sprint-test-and-score` SKILL.md instructions step 1 |
| 4 | Friday synthesis depth (exec memo or stakeholder-update?) | **Leave executive memo authoring to `foundation-stakeholder-update`** (existing pm-skills foundation skill); Friday skill produces Decider summary only | `tool-design-sprint-test-and-score` outputs explicitly excludes exec memo |
| 5 | Rumble support (spec leaned: defer to v0.2) | **v0.1.0 supports the rumble *decision* (Decider's call between rumble and all-in-one; default is all-in-one) but NOT dual-prototype execution.** Dual-prototype build orchestration and dual-track Friday testing defer to v0.2. Amended 2026-05-16 (DS06 Codex finding) to reflect that the decide-and-storyboard skill body and template already contain the decision section coherently, and removing it would leave Wednesday with no rumble-vs-all-in-one conversation. | `tool-design-sprint-decide-and-storyboard` SKILL.md + TEMPLATE.md (decision section); EXAMPLE shows Jamie picking all-in-one with explicit rationale |
| 6 | Remote vs in-person variant (spec leaned: parameter for v0.1) | **Single skill with `format: in-person \| remote \| hybrid` input parameter;** SKILL.md instructions branch on format where needed | `tool-design-sprint-brief` SKILL.md inputs section |
| 7 | Hardware or service sprint variants (spec leaned: defer; document as known variants) | **Defer to v0.2 or later;** Sprint book hardware/service variants documented as "known variants" in `docs/guides/using-design-sprint.md` | `docs/guides/using-design-sprint.md` Variants section |
| 8 | FS-to-DS bridge skill (added by 2026-05-13 architectural amendment) | **No bridge skill.** Canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills should not invent canonical-looking skills. The transition is described narratively in `_workflows/foundation-to-design.md` (this plan, Task 12) and in both user guides. | `_workflows/foundation-to-design.md` + `docs/guides/using-foundation-sprint.md` + `docs/guides/using-design-sprint.md` |

These decisions are locked. Re-litigation requires an explicit plan amendment, not in-skill drift.

## File Structure

### Files to create (55 new files)

**Validators (2 files)**
- `scripts/validate-design-sprint-skills-family.sh`
- `scripts/validate-design-sprint-skills-family.ps1`

**Design Sprint skills (21 files: 7 skills x 3 files each)**
- `skills/tool-design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-map-and-target/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-sketch/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-decide-and-storyboard/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-prototype-plan/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-design-sprint-test-and-score/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflows (2 files)**
- `_workflows/design-sprint.md`
- `_workflows/foundation-to-design.md`

**Family contract (1 file)**
- `docs/reference/skill-families/design-sprint-skills-contract.md`

**Slash commands (7 files)**
- `commands/tool-design-sprint-readiness.md`
- `commands/tool-design-sprint-brief.md`
- `commands/tool-design-sprint-map-and-target.md`
- `commands/tool-design-sprint-sketch.md`
- `commands/tool-design-sprint-decide-and-storyboard.md`
- `commands/tool-design-sprint-prototype-plan.md`
- `commands/tool-design-sprint-test-and-score.md`

**Library samples (21 files: 7 skills x 3 threads)**
- `library/skill-output-samples/tool-design-sprint-readiness/sample_tool-design-sprint-readiness_{thread}_{scenario}.md` (x3)
- Same pattern for the 6 other Design Sprint skills
- Thread scenarios: `brainshelf_book-catalog`, `storevine_retail-direction`, `workbench_debugging-toolchain` (same threads as Foundation Sprint for continuity)

**User guide (1 file)**
- `docs/guides/using-design-sprint.md`

### Files to modify (2 files)

- `docs/reference/skill-families/_registry.yaml`: register `design-sprint-skills` family with its 7 members (parallel to the FS family entry added by the Foundation Sprint plan)
- `AGENTS.md`: add Design Sprint family entries (extends the tool section created by the FS plan)

---

## Tasks

### Phase 1: DS validator infrastructure and family contract

#### Task 1: Author design-sprint-skills family validator (Bash)

**Files:**
- Create: `scripts/validate-design-sprint-skills-family.sh`

- [x] **Step 1: Read FS family validator as reference**

Read `scripts/validate-foundation-sprint-skills-family.sh` (shipped by the FS plan) for structural pattern.

- [x] **Step 2: Author the DS validator**

Checks to implement (WARN mode initially; promote to FAIL in a follow-up once all DS skills are shipped):
- Every `skills/tool-design-sprint-*` folder has SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- SKILL.md frontmatter has required DS family fields: `name`, `description`, `classification: tool`, `version`, `updated`, `license`
- `metadata.tool` equals `design-sprint`
- `metadata.move` is present and is a valid kebab-case move identifier
- TEMPLATE.md ends with a "Decider Checkpoint" section
- Naming: directory name matches `tool-design-sprint-{metadata.move}`

Implementation note (2026-05-15): the validator went beyond the WARN baseline and inherited the `--strict` flag pattern from the FS family validator (v0.2.0). Default behavior emits WARN on partial state; `--strict` elevates to FAIL for release-time CI. All 6 per-member checks plus the family-level contract presence check are enforcing once any skill is authored.

- [x] **Step 3: Test against empty state**

Run: `bash scripts/validate-design-sprint-skills-family.sh`
Expected: exits cleanly with no DS family members present yet.

Result (2026-05-15): 3 NOTICE lines, exit 0. PASS.

- [x] **Step 4: Commit**

```bash
git add scripts/validate-design-sprint-skills-family.sh
git commit -m "feat(scripts): validate-design-sprint-skills-family Bash validator"
```

#### Task 2: Author design-sprint-skills family validator (PowerShell)

**Files:**
- Create: `scripts/validate-design-sprint-skills-family.ps1`

Port from Bash; match parity 1:1.

- [x] Steps 1-3 follow Task 1 pattern; commit message `feat(scripts): validate-design-sprint-skills-family PowerShell parity`

Result (2026-05-15): PowerShell validator inherits the `-Strict` switch (parity with the Bash `--strict` flag). Smoke-tested via `pwsh -NoProfile -File scripts/validate-design-sprint-skills-family.ps1` and returned the same 3 NOTICE lines + exit 0 as the Bash version. PASS.

#### Task 3: Author design-sprint-skills family contract + registry registration

**Files:**
- Create: `docs/reference/skill-families/design-sprint-skills-contract.md`
- Modify: `docs/reference/skill-families/_registry.yaml` (append design-sprint-skills entry; FS family entry already present from FS plan)

- [x] **Step 1: Author the contract**

Parallel to `foundation-sprint-skills-contract.md` (shipped by FS plan). Frontmatter, root vs metadata structure, naming convention, file anatomy, Decider Checkpoint requirement, library sample requirements, versioning policy, CI enforcement reference. Differences from FS contract: `metadata.tool` equals `design-sprint`; canonical references are Sprint book + GV Design Sprint guide + Character DS guide + Google Design Sprint Kit (not Click book).

Result (2026-05-15): contract authored at v0.1.0 mirroring FS v0.2.0 structure. Includes version-tiered sample coverage clause (Brainshelf REQUIRED for v0.1.0; all 3 threads for v1.0.0) and frameworks subset semantics (`design-sprint` REQUIRED; `sprint` and `character-note-and-vote` present-as-needed). The DS contract starts at v0.1.0 because there is no prior version to amend; the FS v0.2.0 lessons are pre-baked into v0.1.0 rather than requiring a same-week minor bump.

- [x] **Step 2: Append registry entry**

```yaml
  design-sprint-skills:
    contract: docs/reference/skill-families/design-sprint-skills-contract.md
    members:
      - tool-design-sprint-readiness
      - tool-design-sprint-brief
      - tool-design-sprint-map-and-target
      - tool-design-sprint-sketch
      - tool-design-sprint-decide-and-storyboard
      - tool-design-sprint-prototype-plan
      - tool-design-sprint-test-and-score
```

- [x] **Step 3: Commit**

```bash
git add docs/reference/skill-families/design-sprint-skills-contract.md docs/reference/skill-families/_registry.yaml
git commit -m "docs(design-sprint-skills): family contract and registry entry"
```

### Phase 2: Design Sprint skills

Each of Tasks 4-10 follows the same structure: SKILL.md + TEMPLATE.md + EXAMPLE.md, family validator pass, commit. Detailed content spec for each skill is in `design-sprint-design-spec.md`.

All skills in this phase use this frontmatter shape:

```yaml
---
name: tool-design-sprint-<move>
description: <one-liner with Use-when triggers>
classification: tool
version: "0.1.0"
updated: 2026-05-13
license: Apache-2.0
metadata:
  tool: design-sprint
  move: <move>
  category: <see categories.md>
  frameworks: <subset of [design-sprint, sprint, character-note-and-vote]; design-sprint REQUIRED; sprint present when skill body cites Sprint book; character-note-and-vote present when skill body uses the note-and-vote mechanic>
  timebox_minutes: <integer>
  roles: [...]
  prerequisites: [...]    # array of tool-design-sprint-* skill names; optional
  inputs: [...]
  outputs: [...]
  author: product-on-purpose
---
```

#### Task 4: Author tool-design-sprint-readiness

**Files:**
- Create: `skills/tool-design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

- [x] **Step 1: Author SKILL.md**

Spec section "1. design-sprint-readiness". `metadata.tool: design-sprint`, `metadata.move: readiness`, no prerequisites (entry point; can accept Foundation Sprint output as optional input but does not require a separate bridge skill).

Result (2026-05-15): SKILL.md authored at v0.1.0. 8 canonical readiness checks synthesized from Sprint book Ch 2 + GV "Is Your Idea Sprint-Worthy?" + Character "When to Sprint" (DS-specific deltas from the FS 8-check pattern: customer access for Friday, prototype medium feasibility, 5-day clearable for all attendees). Frameworks: design-sprint + sprint + character-note-and-vote. References family contract path.

- [x] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict, diagnosis, recommended preconditions, attendee list, customer recruiting plan, prep checklist, Decider Checkpoint.

Result (2026-05-15): TEMPLATE.md authored with 6 output sections. Customer Recruiting Plan section is the unique-to-DS section (FS readiness template doesn't have it). Decider Checkpoint at line 97 of 108 (89.8% through file; well past 75% threshold).

- [x] **Step 3: Author EXAMPLE.md**

Brainshelf context: team is post-Foundation-Sprint, assessing Design Sprint fit using the FS Founding Hypothesis as input context (no bridge artifact required). Realistic readiness assessment with Go / Conditional Go verdict.

Result (2026-05-15): EXAMPLE.md authored with full FS-to-DS narrative continuity. Picks up from the Brainshelf FS founding-hypothesis sample (top bet sub-3-second camera-first capture; highest-risk assumption A1; DS scheduled May 26). Go verdict; customer recruiting plan locks Riley as recruiter with 7-day lead to 2026-05-23 deadline; honorarium USD 100 per slot; 6 slots target.

- [x] **Step 4: Validate**

Run: `bash scripts/validate-design-sprint-skills-family.sh`
Expected: PASS.

Result (2026-05-15): DS family validator PASS (1 of 7 enforcing; all 6 per-member checks OK; WARN on partial state as designed). `--strict` correctly FAILs on partial state (exit 1). FS family validator still 7/7 PASS (no regression). lint-skills-frontmatter PASS at 49 skills. validate-agents-md PASS at 49 paths after AGENTS.md updated with Design Sprint Family section + readiness entry.

- [x] **Step 5: Commit**

```bash
git add skills/tool-design-sprint-readiness/ AGENTS.md
git commit -m "feat(design-sprint-skills): add tool-design-sprint-readiness"
```

Note: AGENTS.md update is in-commit with the new skill (discovery during execution: `validate-agents-md.sh` is strict and would FAIL CI if AGENTS.md weren't updated in same commit as the skill directory; this contradicts the original plan which deferred AGENTS.md updates to Phase 6 Task 18). DS plan Phase 6 Task 18 should be re-scoped to "extend existing AGENTS.md DS section with the remaining 6 skills" rather than "add the DS section from scratch."

#### Task 5: Author tool-design-sprint-brief

Follow Task 4 pattern. Spec section "2. design-sprint-brief". `metadata.move: brief`. Prerequisites: `tool-design-sprint-readiness`. Includes customer recruiting plan dimension (longer timebox than Foundation Sprint brief). Accepts a Founding Hypothesis as input when coming from a prior Foundation Sprint, but does not require a separate bridge skill artifact.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 9 output sections (vs FS brief's 6): challenge statement, sprint questions, decider windows, team roster, customer recruiting plan, prototype medium decision, interview format, logistics, success criteria. Timebox 75 min (FS brief 60). Frameworks subset: design-sprint + sprint (no character-note-and-vote; brief doesn't use the mechanic). TEMPLATE.md two-page-discipline; Decider Checkpoint at line 100 of 112 (89.3%). EXAMPLE.md continues Brainshelf narrative: brief locked 2026-05-22, recruiting closed early 2026-05-21 (6 slots; USD 600 authorized; 2 channels), Figma clickable medium, remote moderated interviews with Riley, sprint locked for week of 2026-05-26. DS family validator 2/7 enforcing. AGENTS.md updated in-commit (50 paths PASS). lint + FS family no regression.

#### Task 6: Author tool-design-sprint-map-and-target

Follow Task 4 pattern. Spec section "3. design-sprint-map-and-target". `metadata.move: map-and-target`. Prerequisites: `tool-design-sprint-brief`. Monday's bundled artifact: long-term goal, sprint questions, customer map, HMW clusters, target moment.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 6 output sections (long-term goal, sprint questions, customer or system map, expert interview notes, HMW cluster board, target moment). Timebox 105 min for facilitated sections; Monday workshop time structure section documents the 7-hour day arc and what runs in parallel. Frameworks subset: design-sprint + sprint + character-note-and-vote (uses note-and-vote for HMW heat-map voting and optional target-moment supervote). Roles expand to 7 incl researcher and customer-expert (Monday brings cameo experts). TEMPLATE.md ASCII map skeleton plus HMW cluster table; Decider Checkpoint at line 92 of 103 (89.3%). EXAMPLE.md continues Brainshelf Monday 2026-05-26: 6 sprint questions (4 from brief + 2 added morning), full ASCII customer-system map showing capture-or-not + recall-pain arcs, 3 expert interviews (UX researcher, indie bookstore owner, mobile OCR engineer), 67 HMWs clustered to 6 themes, C1 (capture confirmation) wins heat-map vote, Jamie selects capture-plus-confirmation as target moment over recall-only with explicit rationale tying back to FS assumption A1. In-execution discovery: lint-skills-frontmatter caught a YAML parse error in the description (unquoted colon-space pattern); fixed by rewriting "artifact: long-term goal" to "artifact containing long-term goal" before commit (per feedback_yaml-parse-validity-in-sweeps.md rule). AGENTS.md updated in-commit (51 paths PASS). DS family validator 3/7 enforcing.

#### Task 7: Author tool-design-sprint-sketch

Follow Task 4 pattern. Spec section "4. design-sprint-sketch". `metadata.move: sketch`. Prerequisites: `tool-design-sprint-map-and-target`. Tuesday's artifact: lightning demos, four-step sketches, assignments. Note: this skill structures the activity; the human team produces sketches individually.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 4 output sections (lightning demo board, sketch assignment plan, four-step sketches from each team member, recruiting tracker update). Timebox 180 min for Facilitator-led portions. Tuesday Time Structure section documents the day arc. Frameworks subset: design-sprint + sprint (NO note-and-vote; Tuesday has no voting). Roles 7 (whole team sketches independently). TEMPLATE.md sketch-description format avoids reproducing actual sketches; each sketcher gets a textual description section. Decider Checkpoint at line 72 of 82 (87.8%); Tuesday's checkpoint is logistics-only (sketch collection + attribution stripping + Wednesday attendance). EXAMPLE.md continues Brainshelf Tuesday 2026-05-27: 12 lightning demos with patterns extracted, swarm assignment, 4 textually-described sketches showing distinct design philosophies (Jamie undo countdown + geolocation; Alex polaroid stack + minimal capture; Sam explicit two-step + tabular library; Riley journal entry + captured-contexts library), recruiting tracker shows 1 cancellation absorbed by buffer activation. DS family validator 4/7 enforcing.

#### Task 8: Author tool-design-sprint-decide-and-storyboard

Follow Task 4 pattern. Spec section "5. design-sprint-decide-and-storyboard". `metadata.move: decide-and-storyboard`. Prerequisites: `tool-design-sprint-sketch`. Wednesday's artifact: heat map, critique, supervote, storyboard. Most decision-heavy day.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 7 output sections (art museum layout, heat map, speed critique notes, straw poll results, supervote, rumble-vs-all-in-one decision, storyboard). Timebox 210 min. Wednesday Time Structure section documents the 7-hour day arc with morning decision-heavy (heat map through supervote) and afternoon storyboard build. Frameworks subset: design-sprint + sprint + character-note-and-vote (note-and-vote invoked twice: heat-map and straw poll; supervote is Decider's direct call). TEMPLATE.md 9-table storyboard with What sees / What does / System response / Notes-for-builders columns. Decider Checkpoint at line 109 of 119 (91.6%). EXAMPLE.md continues Brainshelf Wednesday 2026-05-28: 4 sketches dot-mapped (A=4, B=4, C=1, D=3 of 12 total dots), 4 speed critiques with explicit "what would worry me" lists, straw poll Jamie+Sam picked B / Alex picked D / Riley picked A, Jamie supervotes Sketch B all-in-one with reasoning tied to Q1 lead question, 9-panel storyboard from "tap Brainshelf icon" through "recall a passage months later"; open questions for builders are visual polish only (interaction logic storyboard-locked). DS family validator 5/7 enforcing.

#### Task 9: Author tool-design-sprint-prototype-plan

Follow Task 4 pattern. Spec section "6. design-sprint-prototype-plan". `metadata.move: prototype-plan`. Prerequisites: `tool-design-sprint-decide-and-storyboard`. Thursday's artifact: role plan, interview script, trial-run checklist. Planning only; prototype build is craft work outside AI invocation surface.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 5 output sections (prototype role plan with 5 canonical roles, prototype brief, Five-Act interview script, trial-run checklist, participant confirmation tracker). Timebox 90 min. Frameworks subset: design-sprint + sprint (NO note-and-vote; Thursday morning planning is Facilitator-led with Decider sign-off). Roles: facilitator + design + engineering + researcher + pm (Decider sign-off happens at end but Decider is not a Thursday-morning role). Honors Ratified Decisions 1 (prototype build is craft, outside skill scope) and 2 (Five-Act canonical structure with team-supplied Tasks act wording). TEMPLATE.md includes the full 5-Act script structure with canonical wording in Welcome/Context/Intro/Debrief and team-supplied wording in Tasks. Decider Checkpoint at line 92 of 103 (89.3%). EXAMPLE.md continues Brainshelf Thursday morning 2026-05-29: 5 canonical roles assigned (Alex=Maker+Stitcher; Jamie=Writer; Sam+Riley=Asset Collector split; Riley=Interviewer), fidelity bar lock for 9 panels (Panels 1-5 full-fidelity; Panels 6-9 frame-with-linear-advance), full Five-Act script with 3 Tasks (capture-The-Overstory, find-it-1-week-later, recall-old-growth-forests-6-months-later) plus probing notes for Riley, trial-run checklist scheduled 15:30-17:00 PT with Sam playing fake customer, all 5 participants confirmed Thursday morning, backup-of-backup identified. DS family validator 6/7 enforcing.

#### Task 10: Author tool-design-sprint-test-and-score

Follow Task 4 pattern. Spec section "7. design-sprint-test-and-score". `metadata.move: test-and-score`. Prerequisites: `tool-design-sprint-prototype-plan`. Friday's artifact: interview observations, scorecard grid, decisions, hot takes, next-step memo. Sprint-closing artifact.

- [x] Steps 1-5: same lifecycle.

Result (2026-05-15): SKILL.md authored at v0.1.0 with 6 output sections (per-customer interview observation notes, best quotes, scorecard grid, observed patterns in 4 buckets, hot takes per team member, Decider summary). Timebox 270 min for synthesis sections; interview time runs in parallel. Friday Time Structure section documents the day arc. Scorecard mechanic section documents the day-end decision rules (Validated/Invalidated/Inconclusive per N-of-5 thresholds). Frameworks subset: design-sprint + sprint (no note-and-vote; Friday has no voting). Honors Ratified Decision 3 (5 customers canonical; warn 3-4 or 6-7; reject below 3 or above 7) and Ratified Decision 4 (exec memo delegated to foundation-stakeholder-update; this skill produces Decider summary only). TEMPLATE.md is the largest in the family (5 customer observation sections + 6+ scorecard rows + 4 observed-pattern buckets + per-team-member hot takes + Decider summary). Decider Checkpoint at line 124 of 137 (90.5%). EXAMPLE.md continues Brainshelf Friday 2026-05-30 with all 5 customer interviews (4 from primary roster + Discord-4 from buffer), 6-row scorecard with Q1 validated 4-of-5 / Q3 pricing validated above USD 4 / Q5 capture-to-library understanding validated 5-of-5, 10 best quotes, observed patterns including the unexpected 3-of-5 unprompted notes ask, hot takes from all 4 team members showing distinct reads on the same evidence, Jamie's Decider call (Build with notes added to v0.1 scope; 6-week MVP becomes 7-8 weeks; PRD via deliver-prd by 2026-06-06). **DS family validator now PASSES 7 of 7 enforcing; --strict mode PASSES exit 0 (release-time CI gate passes).** Phase 2 complete.

### Phase 3: Workflows

#### Task 11: Author design-sprint workflow

**Files:**
- Create: `_workflows/design-sprint.md`

- [x] **Step 1: Author workflow doc**

Use spec section "Workflows: design-sprint". Document: prep phase (`tool-design-sprint-readiness`, `tool-design-sprint-brief`), Monday (`tool-design-sprint-map-and-target`), Tuesday (`tool-design-sprint-sketch`), Wednesday (`tool-design-sprint-decide-and-storyboard`), Thursday (`tool-design-sprint-prototype-plan` + craft build), Friday (`tool-design-sprint-test-and-score`). Include next-workflow handoffs to pm-skills downstream (deliver-prd, measure-experiment-design, iterate-pivot-decision) or follow-up sprints.

Result (2026-05-16): `_workflows/design-sprint.md` authored mirroring FS workflow structure. Metadata table, ASCII overview + mermaid diagram, When-to-Use + When-NOT, 8-step Core Sequence (readiness + brief + Mon map-and-target + Tue sketch + Wed decide-and-storyboard + Thu morning prototype-plan + Thu craft build + Fri test-and-score), Other Next Steps table mapping Decider call to downstream skill (build to deliver-prd; iterate to measure-experiment-design; pivot to iterate-pivot-decision; stop to iterate-lessons-log; stakeholder comms to foundation-stakeholder-update), canonical sources, related workflows.

- [x] **Step 2: Commit**

```bash
git add _workflows/design-sprint.md
git commit -m "feat(design-sprint-skills): add design-sprint workflow"
```

#### Task 12: Author foundation-to-design workflow

**Files:**
- Create: `_workflows/foundation-to-design.md`

- [x] **Step 1: Author workflow doc**

End-to-end arc: invoke `foundation-sprint` workflow, then a narrative transition section (no bridge skill artifact), then `design-sprint` workflow. Total canonical duration: 7-8 days (2 FS + 5 DS + 1 prep day; the FS-to-DS handoff is described as a brief planning conversation rather than a workshop step).

The transition section is the load-bearing replacement for the dropped bridge skill. It describes:
- Which Founding Hypothesis elements map to Design Sprint inputs (target customer to recruiting profile; important problem to challenge framing; top bet to prototype direction; assumption scorecard to sprint questions)
- The go/no-go checkpoint between sprints (Decider confirms the hypothesis is testable through a prototype before starting the Design Sprint)
- Team continuity considerations (which FS roles continue into the DS; which expand)
- Timing recommendations (run DS within 1-2 weeks of FS so context is fresh)

This is documentation, not a skill invocation. Users read it, apply it, and move into `tool-design-sprint-readiness` with the FS outputs as context inputs.

Result (2026-05-16): `_workflows/foundation-to-design.md` authored as the canonical end-to-end arc. Metadata table, ASCII overview + mermaid diagram showing 2-3 calendar-week spread, When-to-Use + When-NOT, Part 1 (Foundation Sprint outputs that become DS inputs - 11 items enumerated), Part 2 (Narrative Handoff: 5-step conversation structure + 12-row slot mapping table covering all FS outputs to DS inputs + 3-question go/no-go checkpoint), Part 3 (Design Sprint with notes on what changes between standalone DS and FS-to-DS for each step), canonical sources, related workflows. Closes the bridge-skill replacement narrative load-bearing for v2.15.0 ship. Two existing forward-references in `_workflows/foundation-sprint.md` (transition section + related workflows) updated to live links.

- [x] **Step 2: Commit**

```bash
git add _workflows/foundation-to-design.md
git commit -m "feat(design-sprint-skills): add foundation-to-design end-to-end workflow"
```

### Phase 4: Slash commands

#### Task 13: Author Design Sprint slash commands

**Files:**
- Create: 7 files in `commands/`

- [ ] **Step 1: Author each command file**

Pattern from existing `commands/*.md` files. 7 commands: 7 Design Sprint skills. No bridge command (bridge skill was dropped per 2026-05-13 architectural amendment).

- [ ] **Step 2: Validate commands**

Run: `bash scripts/validate-commands.sh`
Expected: all 7 new commands resolve.

- [ ] **Step 3: Commit**

```bash
git add commands/tool-design-sprint-readiness.md commands/tool-design-sprint-brief.md commands/tool-design-sprint-map-and-target.md commands/tool-design-sprint-sketch.md commands/tool-design-sprint-decide-and-storyboard.md commands/tool-design-sprint-prototype-plan.md commands/tool-design-sprint-test-and-score.md
git commit -m "feat(design-sprint-skills): add 7 slash commands for Design Sprint track"
```

### Phase 5: Library samples

Thread scenarios carry over from the Foundation Sprint samples - the Design Sprint traces continue the same company context, making the library tell a complete FS-to-DS story (without a separate bridge artifact).

- Brainshelf: `brainshelf_book-catalog` (Design Sprint to validate book-adding flow hypothesis from Foundation Sprint)
- Storevine: `storevine_retail-direction` (Design Sprint to validate the managed-intelligence hypothesis)
- Workbench: `workbench_debugging-toolchain` (Design Sprint to validate the debugging product hypothesis)

#### Task 14: Author Brainshelf thread samples (7 samples)

**Files:**
- Create: 7 sample files in `library/skill-output-samples/tool-design-sprint-{move}/sample_tool-design-sprint-{move}_brainshelf_book-catalog.md`

- [ ] **Step 1: Plan the Brainshelf Design Sprint trace**

Continue from the Brainshelf Foundation Sprint samples. The FS trace identified A1 ("25+/year readers are switchable from 'do nothing' with sub-3-second camera-first capture") as the highest-risk assumption (this analysis is documented in the FS `tool-foundation-sprint-founding-hypothesis` sample's scorecard plus the `using-foundation-sprint.md` handoff narrative; no bridge sample). The Design Sprint trace validates A1 through prototype testing with 5 target customers, alongside directional evidence on A2 (OCR accuracy), A3 (recall draw), A5 (pricing), and A6 ("did I already read this?" pain frequency).

- [ ] **Step 2: Author 7 samples**

One per skill: readiness, brief, map-and-target, sketch (showing 3-4 sketches described textually), decide-and-storyboard, prototype-plan, test-and-score (with 5 customer interview observations and scorecard).

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-design-sprint-skills-family.sh`
Expected: PASS for all Brainshelf Design Sprint samples.

- [ ] **Step 4: Commit**

```bash
git add library/skill-output-samples/tool-design-sprint-*/sample_*_brainshelf_book-catalog.md
git commit -m "docs(design-sprint-skills): brainshelf Design Sprint samples (7)"
```

#### Task 15: Author Storevine thread samples (7 samples)

Follow Task 14 pattern. Storevine context: B2B retail analytics continuing from the Foundation Sprint trace. Founding Hypothesis about managed intelligence service; Design Sprint validates self-serve vs. managed model with enterprise retail buyers.

- [ ] Steps 1-4: same lifecycle.

#### Task 16: Author Workbench thread samples (7 samples)

Follow Task 14 pattern. Workbench context: developer tooling continuing from Foundation Sprint trace. Founding Hypothesis about distributed-systems debugging product; Design Sprint validates the core workflow with senior SREs.

- [ ] Steps 1-4: same lifecycle.

### Phase 6: Documentation

#### Task 17: Author using-design-sprint guide

**Files:**
- Create: `docs/guides/using-design-sprint.md`

- [ ] **Step 1: Author guide**

Cover: what a Design Sprint is and when to run one, how to use the 7 `tool-design-sprint-*` skills in sequence, when and how to start from a Foundation Sprint output (the "Coming from a Foundation Sprint" section is the load-bearing replacement for the dropped bridge skill; it describes how to feed Founding Hypothesis content into Day 1 prep), the role of `tool-note-and-vote` within Design Sprint days, common pitfalls, handoff to pm-skills downstream (PRD, experiment design, pivot decision). Length target: 1,700-2,200 words (longer than original estimate because the handoff section is part of this guide rather than a separate bridge artifact). Include 2-3 mermaid diagrams (5-day flow, FS-to-DS handoff narrative, Friday scorecard structure).

- [ ] **Step 2: Commit**

```bash
git add docs/guides/using-design-sprint.md
git commit -m "docs(design-sprint-skills): user guide for Design Sprint"
```

#### Task 17a: Refresh docs/concepts/design-sprint.md for tool classification

**Files:**
- Modify: `docs/concepts/design-sprint.md` (already shipped in commit `5b9e590`; refresh skill-name references and classification language)
- Modify: `docs/concepts/index.md` (Design Sprint row already present; verify accuracy)

Note: This file already exists on `origin/main`. The refresh updates skill-name references in the mermaid skill family map (from `design-sprint-*` to `tool-design-sprint-*`), removes the now-dropped bridge skill node (`sprint-foundation-to-design`), updates the standalone tool name (`sprint-note-and-vote` to `tool-note-and-vote`), and amends the "How Design Sprint Connects to pm-skills" prose to reference `classification: tool` (not `classification: sprint`) plus the new family contract path.

- [ ] **Step 1: Apply refresh edits** (string replacements per the note above)

- [ ] **Step 2: Commit**

```bash
git add docs/concepts/design-sprint.md
git commit -m "docs(concepts): refresh design-sprint concept doc for tool classification"
```

#### Task 18: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add Design Sprint family entries**

Extend the tool section created by the FS plan (Task 20 in FS plan) with 7 Design Sprint family skills.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md adds Design Sprint family skills"
```

### Phase 7: Integration and v2.15.0 ship

#### Task 19: Run full validation suite

- [ ] **Step 1: Run all validators**

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-commands.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-meeting-skills-family.sh
bash scripts/validate-foundation-sprint-skills-family.sh
bash scripts/validate-design-sprint-skills-family.sh
bash scripts/validate-docs-frontmatter.sh
node scripts/check-frontmatter-yaml.mjs
```

Expected: all pass.

- [ ] **Step 2: Smoke-test end-to-end workflow**

Mock-read the `foundation-to-design` workflow doc: confirm the narrative handoff section reads cleanly and tells a user how to take Founding Hypothesis output into Day 1 of a Design Sprint without referencing a non-existent bridge skill.

- [ ] **Step 3: Smoke-test a Design Sprint slash command**

Invoke `/tool-design-sprint-readiness` in Claude Code with a test context. Confirm it resolves and produces output matching TEMPLATE.

#### Task 20: Version bump and CHANGELOG

**Files:**
- Modify: `CHANGELOG.md`
- Follow pm-skills v2.15.0 release plan for version bump in `package.json` / manifest (per release runbook)

- [ ] **Step 1: Author CHANGELOG entry for tool skills**

Under the v2.15.0 heading, add a tool-classification subsection covering: new `classification: tool`; 15 new skills (7 Foundation Sprint + 7 Design Sprint + 1 standalone tool-note-and-vote); 3 new workflows; 15 new commands; 45 new library samples; 2 user guides; 2 family contracts (foundation-sprint-skills + design-sprint-skills); 2 family validator pairs; bridge skill explicitly excluded (canonical Knapp/Zeratsky has no formal handoff move).

- [ ] **Step 2: Commit as part of v2.15.0 release commit**

Follow the standard pm-skills release commit process.

---

## Effort Estimate

| Phase | Tasks | Estimated sessions |
|---|---|---|
| Phase 1: DS validator infrastructure + family contract | 3 | 1 session |
| Phase 2: Design Sprint skills | 7 | 3-4 sessions (2 skills per session) |
| Phase 3: Workflows | 2 | 0.5 session |
| Phase 4: Slash commands | 1 | 0.5 session |
| Phase 5: Library samples | 3 | 2-3 sessions (1 thread per session) |
| Phase 6: Docs | 3 | 1 session |
| Phase 7: Integration | 2 | 0.5 session |
| **Total** | | **8-10 sessions** |

**Combined Foundation Sprint + Design Sprint: 16-20 sessions total for v2.15.0.**

## Self-Review Notes

Differences from the archived plugin-based plan:
- No plugin version bump task (version bump is handled by pm-skills v2.15.0 release process)
- File paths are directly in `skills/`, `commands/`, `_workflows/`, `library/`, `docs/` - no `sprint-skills/` plugin prefix
- CHANGELOG entry merges Foundation Sprint + Design Sprint into one v2.15.0 block rather than separate plugin version headers
- No marketplace.json changes needed

Differences from the original `classification: sprint` design (per 2026-05-13 architectural amendment):
- `classification: tool` replaces `classification: sprint`
- All DS skills get `tool-` prefix: `tool-design-sprint-*`
- Skill metadata adds `tool: design-sprint` and `move: <move>` fields nested under `metadata`; root `sprint_type` and `sprint_move` fields are dropped
- This plan now ships its own family contract (`design-sprint-skills-contract.md`) and family validator pair (`validate-design-sprint-skills-family.{sh,ps1}`); the FS plan no longer owns these for DS
- Bridge skill (`sprint-foundation-to-design`) is DROPPED; the handoff is described narratively in `_workflows/foundation-to-design.md` (Task 12) and in both user guides
- 7 commands instead of 8 (no bridge command); 21 samples instead of 24 (7 skills x 3 threads, no bridge samples)

Content coverage of `design-sprint-design-spec.md`:
- All 7 Design Sprint skill contracts covered by Tasks 4-10
- Workflows (`design-sprint`, `foundation-to-design`) covered by Tasks 11-12
- 7 slash commands covered by Task 13
- Library samples (21: 7 skills x 3 threads) covered by Tasks 14-16
- User guide covered by Task 17 (handoff section absorbs the dropped bridge skill's intent)
- Bridge skill spec section in the design spec is now historical context (see spec amendment)
- Open questions from the spec are ratified in the Ratified Decisions table above

## Adversarial Review (2026-05-16)

Post-Phase 2 closure adversarial review using the FS family precedent: my own self-audit (DSC01-DSC20) plus a Codex adversarial review (DS01-DS13). Combined surface: 33 raw findings; after dedup and triage: ~21 unique items.

### Triage outcomes

| Bucket | Codex | Claude self-audit | Combined unique | Resolved this batch |
|---|---|---|---|---|
| P1 critical | 6 (DS01, DS02, DS03, DS06, DS11, DS12) | 0 | 6 | 6 |
| P2 important | 6 (DS04, DS05, DS07, DS08, DS09, DS13) | 7 (DSC01, DSC02, DSC03, DSC07, DSC09, DSC12, DSC17, DSC19) | 12 | 11 (DS13 deferred to v2.16) |
| P3 minor | 1 (DS10) | 1 (DSC04) | 2 | 2 |
| Reject (no action) | 0 | 8 (DSC08, DSC10, DSC11, DSC13, DSC15, DSC16, DSC18, DSC20) | 8 | n/a |

### Highest-leverage findings (Codex P1 set)

1. **DS01 calendar mapping** - Brainshelf sprint week labeled 2026-05-26 (Tue) through 2026-05-30 (Sat) as Monday-Friday across 5 EXAMPLE files plus the upstream FS founding-hypothesis sample. Cascaded to 2026-06-01 (Mon) through 2026-06-05 (Fri); 8 files updated; all prep/build/PRD dates re-derived (recruiting deadline 2026-05-29; brief signed 2026-05-29; PRD target 2026-06-12; MVP build start 2026-06-08; investor reconfirm 2026-06-08; OCR spike week of 2026-06-15).
2. **DS02 sub-3-second validated by 29-42 sec task timings** - separated "discrete capture interaction" (sub-3-sec per Panel 1 tap to Panel 4 toast; median 2.5s) from "full Task 1 completion" (35s incl. script-read + chip selection). Scorecard cells now show both numbers; validation claim correctly references capture-interaction timing.
3. **DS03 5-sec Q5 threshold marked Y for 12s/8s/18s** - threshold revised to 15 sec across 3 files (map-and-target sprint questions list, map-and-target sprint-tests note, test-and-score scorecard); C3 18s noted as just-over-threshold borderline.
4. **DS06 Rumble deferred but authored** - Ratified Decision 5 amended: v0.1 supports the rumble *decision* (Decider's call between rumble and all-in-one; default all-in-one) but NOT dual-prototype execution. Decide-and-storyboard skill body + template + EXAMPLE retain coherence.
5. **DS11 CI workflow missing DS family validator** - added 4 steps to `.github/workflows/validation.yml` (FS + DS family validators on Ubuntu and Windows runners, with --strict / -Strict elevation). Discovery during review: the FS family validator was also missing from CI; both now run on every PR.
6. **DS12 Brainshelf library sample requirement** - contract amended: Brainshelf samples are a release-gate requirement (must exist in `library/skill-output-samples/` before v2.15.0 tag; ships Phase 5), not a Phase 2 conformance failure. In-skill `references/EXAMPLE.md` files satisfy the structural family-validator check; library-thread coverage is satisfied by Phase 5 sample authoring.

### Implemented fixes (P2/P3 batch)

- DS04 Friday schedule overlap - SKILL.md Friday Time Structure rewritten (09:00-16:30 interviews; 16:30-16:45 wrap; 16:45-17:00 hot takes; 17:00-17:30 Decider review; 17:30-18:00 summary capture); cascaded Decider window to 14:00-18:00 PT and "by 17:30 Friday" call timing across brief + readiness + decide-and-storyboard + prototype-plan + test-and-score files (both EXAMPLE + TEMPLATE files updated for shared structural patterns).
- DS05 TODO allowance removed from prototype-plan EXAMPLE fidelity bar + trial-run checklist.
- DS07 Phase 5 Brainshelf assumption rewritten from "50+ books per session" to canonical A1 ("25+/year readers switchable from 'do nothing' with sub-3-second capture") with A2/A3/A5/A6 directional-evidence note added.
- DS08 plan frontmatter snippet updated from fixed-list to subset semantics matching the contract.
- DS09 brief inputs gained explicit `format` parameter (per Ratified Decision 6); brief body Inference Inputs table gained a `Format` row documenting how format branches body authoring.
- DS10 plan task count corrected 20 to 21 (Task 17a was missing from the rollup); file count corrected 43 to 55 (matches the actual listed creates).
- DSC02 supervote 1-sticker vs 3-dots aligned: EXAMPLE now reads "Jamie placed all 3 supervote dots on Sketch B (Sprint book canonical 3-dot supervote)".
- DSC04 4-cohort rule gained no-N qualifier: "4 Y is Validated; 3 Y with no N is directional."
- DSC07 anonymization headers reworked: removed misleading "Sketcher N (attribution removed)" phrasing; sketches now headed by their letter with the attribution-timing footnote.
- DSC09 Nielsen "Why You Only Need to Test with 5 Users" (2000) citation added to test-and-score Canonical Sources.
- DSC12 readiness body cross-skill reference corrected from `tool-design-sprint-map-and-target` to `tool-design-sprint-brief` (the brief locks sprint questions; map-and-target refines).
- DSC17 "Bookshop and Other Books" renamed to "Twig and Cover Books" across 4 EXAMPLE files (clearly fictional; eliminates real-bookstore risk).
- DSC19 brief Decider Checkpoint authorization wording clarified: "Jamie re-confirms customer recruiting plan ... (originally authorized 2026-05-15 at readiness sign-off; recruiting closed 2026-05-27)".

### Deferred to v2.16

- **DS13 metadata/frontmatter shape coverage gap** - validator currently checks only classification/tool/move plus contract path and Decider Checkpoint; full root-field and metadata-field enforcement (category enum, frameworks subset, timebox_minutes integer, roles enum, prerequisites array, inputs/outputs presence, author field) defer to v2.16. Documented in contract CI Enforcement coverage-gap section.

### Validator state after batch

- DS family validator: 7/7 enforcing PASS in `--strict` mode (release-gate green)
- FS family validator: 7/7 enforcing PASS in `--strict` mode; zero regression from this batch
- lint-skills-frontmatter: 55 skills PASS
- validate-agents-md: 55 paths matched PASS
- validate-meeting-skills-family: PASS
- CI workflow `.github/workflows/validation.yml` now runs both FS and DS family validators with --strict on every PR (Ubuntu + Windows)
