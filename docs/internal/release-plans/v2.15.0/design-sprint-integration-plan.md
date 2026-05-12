# Design Sprint Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Design Sprint facilitation skills plus 1 bridge skill (`sprint-foundation-to-design`) as part of pm-skills v2.15.0, completing the sprint skills collection alongside the Foundation Sprint track.

**Architecture:** Same integration pattern as Foundation Sprint: skills drop directly into `skills/`, commands into `commands/`, library samples into `library/skill-output-samples/`. The bridge skill connects Foundation Sprint output to Design Sprint input. Two new workflows (`design-sprint`, `foundation-to-design`) extend `_workflows/`.

**Tech Stack:** Same as Foundation Sprint plan: markdown with YAML frontmatter; Bash plus PowerShell validator parity; Apache 2.0 license.

**Cross-references:** Skill content is specified in `design-sprint-design-spec.md`. This plan depends on `foundation-sprint-integration-plan.md` being fully executed first - all shared validator infrastructure, the sprint-note-and-vote skill, and validator extensions are owned by that plan. v2.14.x deferral cleanup (Node 22 bump + CONTEXT.md skills inventory refresh) is tracked in `v2.14.x-deferrals-cleanup-plan.md`; the CONTEXT.md refresh task should run after this plan completes so the refreshed tables reflect the final v2.15.0 sprint-skills catalog.

---

## Status

Draft. Promote to `docs/internal/release-plans/v2.15.0/` alongside the Foundation Sprint plan when the release cycle begins.

## Prerequisites

This plan assumes the Foundation Sprint plan is fully executed:

- `skills/sprint-note-and-vote/` exists and passes `validate-sprint-skills-family.sh`
- `scripts/validate-sprint-skills-family.sh` and `.ps1` exist
- `scripts/lint-skills-frontmatter.sh` + `.ps1` recognize `classification: sprint`
- `scripts/validate-agents-md.sh` + `.ps1` recognize sprint skill directory patterns
- `docs/reference/sprint-skills-family-contract.md` exists
- All 7 Foundation Sprint skills are shipped
- AGENTS.md Foundation Sprint section is in place

## Scope

This plan covers:
- Bridge skill (`sprint-foundation-to-design`)
- 7 Design Sprint skills
- 2 new workflows (`design-sprint`, `foundation-to-design`)
- 8 slash commands (7 Design Sprint + 1 bridge)
- 24 library samples (8 skills x 3 threads)
- Design Sprint user guide
- AGENTS.md additions for Design Sprint track

This plan does NOT re-create validator infrastructure or shared skills - those are owned by the Foundation Sprint plan.

## File Structure

### Files to create (44 new files)

**Bridge skill (3 files)**
- `skills/sprint-foundation-to-design/SKILL.md`
- `skills/sprint-foundation-to-design/references/TEMPLATE.md`
- `skills/sprint-foundation-to-design/references/EXAMPLE.md`

**Design Sprint skills (21 files: 7 skills x 3 files each)**
- `skills/design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-map-and-target/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-sketch/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-decide-and-storyboard/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-prototype-plan/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/design-sprint-test-and-score/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflows (2 files)**
- `_workflows/design-sprint.md`
- `_workflows/foundation-to-design.md`

**Slash commands (8 files)**
- `commands/sprint-foundation-to-design.md`
- `commands/design-sprint-readiness.md`
- `commands/design-sprint-brief.md`
- `commands/design-sprint-map-and-target.md`
- `commands/design-sprint-sketch.md`
- `commands/design-sprint-decide-and-storyboard.md`
- `commands/design-sprint-prototype-plan.md`
- `commands/design-sprint-test-and-score.md`

**Library samples (24 files: 8 skills x 3 threads)**
- `library/skill-output-samples/sprint-foundation-to-design/sample_sprint-foundation-to-design_{thread}_{scenario}.md` (x3)
- Same pattern for the 7 Design Sprint skills
- Thread scenarios: `brainshelf_book-catalog`, `storevine_retail-direction`, `workbench_debugging-toolchain` (same threads as Foundation Sprint for continuity)

**User guide (1 file)**
- `docs/guides/using-design-sprint.md`

### Files to modify (1 file)

- `AGENTS.md`: add Design Sprint skills section (bridge skill + 7 Design Sprint skills)

---

## Tasks

### Phase 1: Bridge skill

#### Task 1: Author sprint-foundation-to-design bridge skill

**Files:**
- Create: `skills/sprint-foundation-to-design/SKILL.md`
- Create: `skills/sprint-foundation-to-design/references/TEMPLATE.md`
- Create: `skills/sprint-foundation-to-design/references/EXAMPLE.md`

- [ ] **Step 1: Author SKILL.md**

Use spec section "sprint-foundation-to-design" from `design-sprint-design-spec.md`. Frontmatter:

```yaml
---
name: sprint-foundation-to-design
description: Bridge skill converting a Founding Hypothesis plus assumption scorecard from a Foundation Sprint into a Design Sprint brief, with the highest-risk assumption becoming the Design Sprint challenge.
classification: sprint
sprint_type: bridge
sprint_move: foundation-to-design
version: "0.1.0"
updated: 2026-05-11
license: Apache-2.0
metadata:
  category: sprint-bridge
  frameworks: [foundation-sprint, design-sprint, click]
  timebox_minutes: 35
  roles: [facilitator, pm, decider]
  prerequisites: [foundation-sprint-founding-hypothesis]
  inputs: [founding hypothesis statement, assumption scorecard, top bet, backup approach, team availability]
  outputs: [highest-risk assumption, design sprint challenge, recommended sprint questions, recommended prototype medium, customer recruiting profile, team carry-over plan]
  author: product-on-purpose
---
```

Body covers: when to use, when NOT to use, zero-friction execution flow with derivation logic (highest-risk assumption from scorecard becomes challenge), common pitfalls, Decider checkpoint protocol, handoff to `design-sprint-brief`.

- [ ] **Step 2: Author references/TEMPLATE.md**

Skeleton with placeholders: highest-risk assumption (extracted from scorecard), challenge statement, sprint questions mapped from scorecard rows, prototype medium recommendation rationale, customer recruiting profile derived from Foundation Sprint target customer, team carry-over notes, Decider Checkpoint.

- [ ] **Step 3: Author references/EXAMPLE.md**

Brainshelf book-catalog context: Foundation Sprint produced a Founding Hypothesis about book-tracking SaaS for personal-collection enthusiasts. Bridge skill identifies "Will users add 50+ books per session?" as highest-risk assumption and converts it to the Design Sprint challenge.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/sprint-foundation-to-design/
git commit -m "feat(sprint-skills): add sprint-foundation-to-design bridge skill"
```

### Phase 2: Design Sprint skills

Each of Tasks 2-8 follows the same structure: SKILL.md + TEMPLATE.md + EXAMPLE.md, validator pass, commit. Detailed content spec for each skill is in `design-sprint-design-spec.md`.

#### Task 2: Author design-sprint-readiness

**Files:**
- Create: `skills/design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

- [ ] **Step 1: Author SKILL.md**

Spec section "1. design-sprint-readiness". Frontmatter: `sprint_type: design`, `sprint_move: readiness`, no prerequisites (entry point if coming cold to Design Sprint; accepts bridge skill output as optional input).

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict, diagnosis, recommended preconditions, attendee list, customer recruiting plan, prep checklist, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf context: team is post-Foundation-Sprint, assessing Design Sprint fit using the bridge skill's output as input. Realistic readiness assessment with Go / Conditional Go verdict.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/design-sprint-readiness/
git commit -m "feat(sprint-skills): add design-sprint-readiness"
```

#### Task 3: Author design-sprint-brief

Follow Task 2 pattern. Spec section "2. design-sprint-brief". Prerequisites: `design-sprint-readiness` OR `sprint-foundation-to-design`. Includes customer recruiting plan dimension (longer timebox than Foundation Sprint brief).

- [ ] Steps 1-5: same lifecycle.

#### Task 4: Author design-sprint-map-and-target

Follow Task 2 pattern. Spec section "3. design-sprint-map-and-target". Prerequisites: `design-sprint-brief`. Monday's bundled artifact: long-term goal, sprint questions, customer map, HMW clusters, target moment.

- [ ] Steps 1-5: same lifecycle.

#### Task 5: Author design-sprint-sketch

Follow Task 2 pattern. Spec section "4. design-sprint-sketch". Prerequisites: `design-sprint-map-and-target`. Tuesday's artifact: lightning demos, four-step sketches, assignments. Note: this skill structures the activity; the human team produces sketches individually.

- [ ] Steps 1-5: same lifecycle.

#### Task 6: Author design-sprint-decide-and-storyboard

Follow Task 2 pattern. Spec section "5. design-sprint-decide-and-storyboard". Prerequisites: `design-sprint-sketch`. Wednesday's artifact: heat map, critique, supervote, storyboard. Most decision-heavy day.

- [ ] Steps 1-5: same lifecycle.

#### Task 7: Author design-sprint-prototype-plan

Follow Task 2 pattern. Spec section "6. design-sprint-prototype-plan". Prerequisites: `design-sprint-decide-and-storyboard`. Thursday's artifact: role plan, interview script, trial-run checklist. Planning only; prototype build is craft work outside AI invocation surface.

- [ ] Steps 1-5: same lifecycle.

#### Task 8: Author design-sprint-test-and-score

Follow Task 2 pattern. Spec section "7. design-sprint-test-and-score". Prerequisites: `design-sprint-prototype-plan`. Friday's artifact: interview observations, scorecard grid, decisions, hot takes, next-step memo. Sprint-closing artifact.

- [ ] Steps 1-5: same lifecycle.

### Phase 3: Workflows

#### Task 9: Author design-sprint workflow

**Files:**
- Create: `_workflows/design-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use spec section "Workflows: design-sprint". Document: prep phase (readiness, brief), Monday (map-and-target), Tuesday (sketch), Wednesday (decide-and-storyboard), Thursday (prototype-plan + craft build), Friday (test-and-score). Include next-workflow handoffs to pm-skills downstream (deliver-prd, measure-experiment-design, iterate-pivot-decision) or follow-up sprints.

- [ ] **Step 2: Commit**

```bash
git add _workflows/design-sprint.md
git commit -m "feat(sprint-skills): add design-sprint workflow"
```

#### Task 10: Author foundation-to-design workflow

**Files:**
- Create: `_workflows/foundation-to-design.md`

- [ ] **Step 1: Author workflow doc**

End-to-end arc: invoke `foundation-sprint` workflow, then `sprint-foundation-to-design` bridge skill, then `design-sprint` workflow. Total canonical duration: 8-9 days (2 FS + 1 bridge + 5 DS + prep day). Document handoffs between each stage and the go/no-go checkpoint at the bridge step (Decider must sign off before Design Sprint begins).

- [ ] **Step 2: Commit**

```bash
git add _workflows/foundation-to-design.md
git commit -m "feat(sprint-skills): add foundation-to-design end-to-end workflow"
```

### Phase 4: Slash commands

#### Task 11: Author Design Sprint plus bridge slash commands

**Files:**
- Create: 8 files in `commands/`

- [ ] **Step 1: Author each command file**

Pattern from existing `commands/*.md` files. 8 commands: 7 Design Sprint skills + bridge skill.

- [ ] **Step 2: Validate commands**

Run: `bash scripts/validate-commands.sh`
Expected: all 8 new commands resolve.

- [ ] **Step 3: Commit**

```bash
git add commands/sprint-foundation-to-design.md commands/design-sprint-readiness.md commands/design-sprint-brief.md commands/design-sprint-map-and-target.md commands/design-sprint-sketch.md commands/design-sprint-decide-and-storyboard.md commands/design-sprint-prototype-plan.md commands/design-sprint-test-and-score.md
git commit -m "feat(sprint-skills): add 8 slash commands for Design Sprint track"
```

### Phase 5: Library samples

Thread scenarios carry over from the Foundation Sprint samples - the Design Sprint traces continue the same company context, making the library tell a complete sprint-to-sprint story.

- Brainshelf: `brainshelf_book-catalog` (Design Sprint to validate book-adding flow hypothesis from Foundation Sprint)
- Storevine: `storevine_retail-direction` (Design Sprint to validate the managed-intelligence hypothesis)
- Workbench: `workbench_debugging-toolchain` (Design Sprint to validate the debugging product hypothesis)

#### Task 12: Author Brainshelf thread samples (8 samples)

**Files:**
- Create: 8 sample files in `library/skill-output-samples/{skill-name}/sample_{skill-name}_brainshelf_book-catalog.md`

- [ ] **Step 1: Plan the Brainshelf Design Sprint trace**

Continue from the Brainshelf Foundation Sprint samples. Founding Hypothesis already established; bridge skill identified "Will users add 50+ books per session?" as highest-risk assumption. Design Sprint validates this through prototype testing with 5 target customers.

- [ ] **Step 2: Author 8 samples**

One per skill + bridge: foundation-to-design bridge, readiness, brief, map-and-target, sketch (showing 3-4 sketches described textually), decide-and-storyboard, prototype-plan, test-and-score (with 5 customer interview observations and scorecard).

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS for all Brainshelf Design Sprint samples.

- [ ] **Step 4: Commit**

```bash
git add library/skill-output-samples/sprint-foundation-to-design/sample_*_brainshelf_book-catalog.md library/skill-output-samples/design-sprint-*/sample_*_brainshelf_book-catalog.md
git commit -m "docs(sprint-skills): brainshelf Design Sprint samples (8)"
```

#### Task 13: Author Storevine thread samples (8 samples)

Follow Task 12 pattern. Storevine context: B2B retail analytics continuing from the Foundation Sprint trace. Founding Hypothesis about managed intelligence service; Design Sprint validates self-serve vs. managed model with enterprise retail buyers.

- [ ] Steps 1-4: same lifecycle.

#### Task 14: Author Workbench thread samples (8 samples)

Follow Task 12 pattern. Workbench context: developer tooling continuing from Foundation Sprint trace. Founding Hypothesis about distributed-systems debugging product; Design Sprint validates the core workflow with senior SREs.

- [ ] Steps 1-4: same lifecycle.

### Phase 6: Documentation

#### Task 15: Author using-design-sprint guide

**Files:**
- Create: `docs/guides/using-design-sprint.md`

- [ ] **Step 1: Author guide**

Cover: what a Design Sprint is and when to run one, how to use the 7 skills in sequence (plus when to start from the foundation-to-design bridge), the role of sprint-note-and-vote within Design Sprint days, common pitfalls, handoff to pm-skills downstream (PRD, experiment design, pivot decision). Length target: 1,500-2,000 words. Include 2-3 mermaid diagrams (5-day flow, foundation-to-design bridge connection, Friday scorecard structure).

- [ ] **Step 2: Commit**

```bash
git add docs/guides/using-design-sprint.md
git commit -m "docs(sprint-skills): user guide for Design Sprint"
```

#### Task 15a: Author docs/concepts/design-sprint.md

**Files:**
- Create: `docs/concepts/design-sprint.md`
- Modify: `docs/concepts/index.md` (add Design Sprint row to the topic table)

**Rationale:** The `docs/concepts/` section holds conceptual explainers. Design Sprint warrants the same treatment as Foundation Sprint (Task 19a in `foundation-sprint-integration-plan.md`) so users encountering the skill family understand the underlying framework before invoking any individual skill. Distinct from the `docs/guides/using-design-sprint.md` operational guide: the concepts doc explains the framework's reasoning, history, and design decisions; the guide explains how to use the pm-skills implementation.

- [ ] **Step 1: Author concept doc**

Mirror the structure of `docs/concepts/triple-diamond-delivery-process.md` and the sibling `docs/concepts/foundation-sprint.md`: executive summary; origins (Sprint book + GV + Character Capital); conceptual model with mermaid diagrams; five-day breakdown with per-day diagrams; core concepts (How Might We notes, Lightning Demos, Crazy 8s, Heat Map, Supervote, Storyboard, Five-Act Interview, Scorecard); Foundation Sprint to Design Sprint handoff; variants (remote, Rumble, follow-up, hardware/service); common failure modes; how Design Sprint connects to pm-skills (skill family map); references and further reading.

Required source citations (in References section):
- Knapp, Jake; Zeratsky, John; Kowitz, Braden. *Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days* (Simon & Schuster, 2016). https://www.thesprintbook.com/
- Google Ventures. "The Design Sprint." https://www.gv.com/sprint/
- Character Capital. "Design Sprint guide." https://www.character.vc/guide/design-sprint
- Google. "Design Sprint Kit: Methodology overview." https://designsprintkit.withgoogle.com/methodology/overview
- Character Capital. "Note and Vote guide." https://www.character.vc/guide/note-and-vote

Source spec for content authoring: `docs/internal/efforts/design-sprint-skills/design-sprint-detailed-guide-pm-skills.md` (the synthesized guide with confidence-tagged claims).

- [ ] **Step 2: Add row to docs/concepts/index.md**

Append a row to the topic table for `[Design Sprint](design-sprint.md)` with a one-line description.

- [ ] **Step 3: Commit**

```bash
git add docs/concepts/design-sprint.md docs/concepts/index.md
git commit -m "docs(concepts): Design Sprint framework explainer"
```

#### Task 16: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add Design Sprint section**

Append to the existing sprint-skills section (added by Foundation Sprint plan). List bridge skill + 7 Design Sprint skills with brief descriptions.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md adds Design Sprint track skills"
```

### Phase 7: Integration and v2.15.0 ship

#### Task 17: Run full validation suite

- [ ] **Step 1: Run all validators**

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-commands.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-meeting-skills-family.sh
bash scripts/validate-sprint-skills-family.sh
bash scripts/validate-docs-frontmatter.sh
node scripts/check-frontmatter-yaml.mjs
```

Expected: all pass.

- [ ] **Step 2: Smoke-test end-to-end workflow**

Mock-run the `foundation-to-design` workflow: start from a Founding Hypothesis, invoke bridge skill, confirm Design Sprint brief is well-formed.

- [ ] **Step 3: Smoke-test a Design Sprint slash command**

Invoke `/design-sprint-readiness` in Claude Code with a test context. Confirm it resolves and produces output matching TEMPLATE.

#### Task 18: Version bump and CHANGELOG

**Files:**
- Modify: `CHANGELOG.md`
- Follow pm-skills v2.15.0 release plan for version bump in `package.json` / manifest (per release runbook)

- [ ] **Step 1: Author CHANGELOG entry for sprint skills**

Under the v2.15.0 heading, add a sprint skills subsection covering: 16 new skills (7 Foundation Sprint + 7 Design Sprint + 1 bridge + 1 shared), 3 new workflows, 16 new commands, 48 new library samples, 2 user guides, sprint-skills family contract, new validator pair.

- [ ] **Step 2: Commit as part of v2.15.0 release commit**

Follow the standard pm-skills release commit process.

---

## Effort Estimate

| Phase | Tasks | Estimated sessions |
|---|---|---|
| Phase 1: Bridge skill | 1 | 0.5 session |
| Phase 2: Design Sprint skills | 7 | 3-4 sessions (2 skills per session) |
| Phase 3: Workflows | 2 | 0.5 session |
| Phase 4: Slash commands | 1 | 0.5 session |
| Phase 5: Library samples | 3 | 2-3 sessions (1 thread per session) |
| Phase 6: Docs | 2 | 1 session |
| Phase 7: Integration | 2 | 0.5 session |
| **Total** | | **8-10 sessions** |

**Combined Foundation Sprint + Design Sprint: 16-20 sessions total for v2.15.0.**

## Self-Review Notes

Differences from the archived plugin-based plan:
- No plugin version bump task (Task 17 in plugin plan removed; version bump is handled by pm-skills v2.15.0 release process)
- File paths are directly in `skills/`, `commands/`, `_workflows/`, `library/`, `docs/` - no `sprint-skills/` prefix
- CHANGELOG entry merges Foundation Sprint + Design Sprint into one v2.15.0 block rather than separate plugin version headers
- No marketplace.json changes needed

Content coverage of `design-sprint-design-spec.md`:
- All 7 Design Sprint skill contracts covered by Tasks 2-8
- Bridge skill `sprint-foundation-to-design` covered by Task 1
- 2 workflows (`design-sprint`, `foundation-to-design`) covered by Tasks 9-10
- 8 slash commands covered by Task 11
- Library samples (24: 8 skills x 3 threads) covered by Tasks 12-14
- User guide covered by Task 15
- Open questions from the spec surface to the maintainer during authoring
