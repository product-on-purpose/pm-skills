# Design Sprint Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Design Sprint facilitation skills (all prefixed `tool-design-sprint-*`) as part of pm-skills v2.15.0, completing the sprint tools collection alongside the Foundation Sprint track. This plan also ships the DS family contract, the DS family validator pair, and the end-to-end `foundation-to-design` workflow doc that handles the FS-to-DS transition narratively (replacing the dropped bridge skill).

**Architecture:** Same integration pattern as Foundation Sprint: skills drop directly into `skills/` with the `tool-` prefix per the `classification: tool` convention (architectural amendment 2026-05-13), commands into `commands/`, library samples into `library/skill-output-samples/`. There is NO bridge skill: the Foundation-to-Design transition lives in `_workflows/foundation-to-design.md` (authored here) and in both user guides. Two new workflows (`design-sprint`, `foundation-to-design`) extend `_workflows/`.

**Tech Stack:** Same as Foundation Sprint plan: markdown with YAML frontmatter; Bash plus PowerShell validator parity; Apache 2.0 license.

**Cross-references:** Skill content is specified in `design-sprint-design-spec.md`. This plan depends on `foundation-sprint-integration-plan.md` being fully executed first: shared `classification: tool` validator extensions, the `tool-note-and-vote` standalone skill, and `validate-agents-md` pattern extensions are owned by that plan. v2.14.x deferral cleanup (Node 22 bump + CONTEXT.md skills inventory refresh) is tracked in `v2.14.x-deferrals-cleanup-plan.md`; the CONTEXT.md refresh task should run after this plan completes so the refreshed tables reflect the final v2.15.0 tool catalog.

---

## Status

Draft. Promote to `docs/internal/release-plans/v2.15.0/` alongside the Foundation Sprint plan when the release cycle begins.

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
| 5 | Rumble support (spec leaned: defer to v0.2) | **Defer to v0.2;** v0.1.0 supports single-prototype testing only | Not authored in v0.1.0 |
| 6 | Remote vs in-person variant (spec leaned: parameter for v0.1) | **Single skill with `format: in-person \| remote \| hybrid` input parameter;** SKILL.md instructions branch on format where needed | `tool-design-sprint-brief` SKILL.md inputs section |
| 7 | Hardware or service sprint variants (spec leaned: defer; document as known variants) | **Defer to v0.2 or later;** Sprint book hardware/service variants documented as "known variants" in `docs/guides/using-design-sprint.md` | `docs/guides/using-design-sprint.md` Variants section |
| 8 | FS-to-DS bridge skill (added by 2026-05-13 architectural amendment) | **No bridge skill.** Canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills should not invent canonical-looking skills. The transition is described narratively in `_workflows/foundation-to-design.md` (this plan, Task 12) and in both user guides. | `_workflows/foundation-to-design.md` + `docs/guides/using-foundation-sprint.md` + `docs/guides/using-design-sprint.md` |

These decisions are locked. Re-litigation requires an explicit plan amendment, not in-skill drift.

## File Structure

### Files to create (43 new files)

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

- [ ] **Step 1: Read FS family validator as reference**

Read `scripts/validate-foundation-sprint-skills-family.sh` (shipped by the FS plan) for structural pattern.

- [ ] **Step 2: Author the DS validator**

Checks to implement (WARN mode initially; promote to FAIL in a follow-up once all DS skills are shipped):
- Every `skills/tool-design-sprint-*` folder has SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- SKILL.md frontmatter has required DS family fields: `name`, `description`, `classification: tool`, `version`, `updated`, `license`
- `metadata.tool` equals `design-sprint`
- `metadata.move` is present and is a valid kebab-case move identifier
- TEMPLATE.md ends with a "Decider Checkpoint" section
- Naming: directory name matches `tool-design-sprint-{metadata.move}`

- [ ] **Step 3: Test against empty state**

Run: `bash scripts/validate-design-sprint-skills-family.sh`
Expected: exits cleanly with no DS family members present yet.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-design-sprint-skills-family.sh
git commit -m "feat(scripts): validate-design-sprint-skills-family Bash validator"
```

#### Task 2: Author design-sprint-skills family validator (PowerShell)

**Files:**
- Create: `scripts/validate-design-sprint-skills-family.ps1`

Port from Bash; match parity 1:1.

- [ ] Steps 1-3 follow Task 1 pattern; commit message `feat(scripts): validate-design-sprint-skills-family PowerShell parity`

#### Task 3: Author design-sprint-skills family contract + registry registration

**Files:**
- Create: `docs/reference/skill-families/design-sprint-skills-contract.md`
- Modify: `docs/reference/skill-families/_registry.yaml` (append design-sprint-skills entry; FS family entry already present from FS plan)

- [ ] **Step 1: Author the contract**

Parallel to `foundation-sprint-skills-contract.md` (shipped by FS plan). Frontmatter, root vs metadata structure, naming convention, file anatomy, Decider Checkpoint requirement, library sample requirements, versioning policy, CI enforcement reference. Differences from FS contract: `metadata.tool` equals `design-sprint`; canonical references are Sprint book + GV Design Sprint guide + Character DS guide + Google Design Sprint Kit (not Click book).

- [ ] **Step 2: Append registry entry**

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

- [ ] **Step 3: Commit**

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
  frameworks: [design-sprint, sprint, character-note-and-vote]
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

- [ ] **Step 1: Author SKILL.md**

Spec section "1. design-sprint-readiness". `metadata.tool: design-sprint`, `metadata.move: readiness`, no prerequisites (entry point; can accept Foundation Sprint output as optional input but does not require a separate bridge skill).

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict, diagnosis, recommended preconditions, attendee list, customer recruiting plan, prep checklist, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf context: team is post-Foundation-Sprint, assessing Design Sprint fit using the FS Founding Hypothesis as input context (no bridge artifact required). Realistic readiness assessment with Go / Conditional Go verdict.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-design-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/tool-design-sprint-readiness/
git commit -m "feat(design-sprint-skills): add tool-design-sprint-readiness"
```

#### Task 5: Author tool-design-sprint-brief

Follow Task 4 pattern. Spec section "2. design-sprint-brief". `metadata.move: brief`. Prerequisites: `tool-design-sprint-readiness`. Includes customer recruiting plan dimension (longer timebox than Foundation Sprint brief). Accepts a Founding Hypothesis as input when coming from a prior Foundation Sprint, but does not require a separate bridge skill artifact.

- [ ] Steps 1-5: same lifecycle.

#### Task 6: Author tool-design-sprint-map-and-target

Follow Task 4 pattern. Spec section "3. design-sprint-map-and-target". `metadata.move: map-and-target`. Prerequisites: `tool-design-sprint-brief`. Monday's bundled artifact: long-term goal, sprint questions, customer map, HMW clusters, target moment.

- [ ] Steps 1-5: same lifecycle.

#### Task 7: Author tool-design-sprint-sketch

Follow Task 4 pattern. Spec section "4. design-sprint-sketch". `metadata.move: sketch`. Prerequisites: `tool-design-sprint-map-and-target`. Tuesday's artifact: lightning demos, four-step sketches, assignments. Note: this skill structures the activity; the human team produces sketches individually.

- [ ] Steps 1-5: same lifecycle.

#### Task 8: Author tool-design-sprint-decide-and-storyboard

Follow Task 4 pattern. Spec section "5. design-sprint-decide-and-storyboard". `metadata.move: decide-and-storyboard`. Prerequisites: `tool-design-sprint-sketch`. Wednesday's artifact: heat map, critique, supervote, storyboard. Most decision-heavy day.

- [ ] Steps 1-5: same lifecycle.

#### Task 9: Author tool-design-sprint-prototype-plan

Follow Task 4 pattern. Spec section "6. design-sprint-prototype-plan". `metadata.move: prototype-plan`. Prerequisites: `tool-design-sprint-decide-and-storyboard`. Thursday's artifact: role plan, interview script, trial-run checklist. Planning only; prototype build is craft work outside AI invocation surface.

- [ ] Steps 1-5: same lifecycle.

#### Task 10: Author tool-design-sprint-test-and-score

Follow Task 4 pattern. Spec section "7. design-sprint-test-and-score". `metadata.move: test-and-score`. Prerequisites: `tool-design-sprint-prototype-plan`. Friday's artifact: interview observations, scorecard grid, decisions, hot takes, next-step memo. Sprint-closing artifact.

- [ ] Steps 1-5: same lifecycle.

### Phase 3: Workflows

#### Task 11: Author design-sprint workflow

**Files:**
- Create: `_workflows/design-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use spec section "Workflows: design-sprint". Document: prep phase (`tool-design-sprint-readiness`, `tool-design-sprint-brief`), Monday (`tool-design-sprint-map-and-target`), Tuesday (`tool-design-sprint-sketch`), Wednesday (`tool-design-sprint-decide-and-storyboard`), Thursday (`tool-design-sprint-prototype-plan` + craft build), Friday (`tool-design-sprint-test-and-score`). Include next-workflow handoffs to pm-skills downstream (deliver-prd, measure-experiment-design, iterate-pivot-decision) or follow-up sprints.

- [ ] **Step 2: Commit**

```bash
git add _workflows/design-sprint.md
git commit -m "feat(design-sprint-skills): add design-sprint workflow"
```

#### Task 12: Author foundation-to-design workflow

**Files:**
- Create: `_workflows/foundation-to-design.md`

- [ ] **Step 1: Author workflow doc**

End-to-end arc: invoke `foundation-sprint` workflow, then a narrative transition section (no bridge skill artifact), then `design-sprint` workflow. Total canonical duration: 7-8 days (2 FS + 5 DS + 1 prep day; the FS-to-DS handoff is described as a brief planning conversation rather than a workshop step).

The transition section is the load-bearing replacement for the dropped bridge skill. It describes:
- Which Founding Hypothesis elements map to Design Sprint inputs (target customer to recruiting profile; important problem to challenge framing; top bet to prototype direction; assumption scorecard to sprint questions)
- The go/no-go checkpoint between sprints (Decider confirms the hypothesis is testable through a prototype before starting the Design Sprint)
- Team continuity considerations (which FS roles continue into the DS; which expand)
- Timing recommendations (run DS within 1-2 weeks of FS so context is fresh)

This is documentation, not a skill invocation. Users read it, apply it, and move into `tool-design-sprint-readiness` with the FS outputs as context inputs.

- [ ] **Step 2: Commit**

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

Continue from the Brainshelf Foundation Sprint samples. The FS trace identified "Will users add 50+ books per session?" as the highest-risk assumption (this analysis is documented in the FS `tool-foundation-sprint-founding-hypothesis` sample's scorecard plus the `using-foundation-sprint.md` handoff narrative; no bridge sample). The Design Sprint trace validates this assumption through prototype testing with 5 target customers.

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
