# Design Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Design Sprint facilitation skills plus 1 bridge skill (`sprint-foundation-to-design`) as the second track of `sprint-skills` plugin (the Foundation Sprint track from the sibling plan ships first; this plan completes the v0.1.0 release or ships as a v0.2.0 follow-up).

**Architecture:** Same plugin as Foundation Sprint (`sprint-skills` subfolder in `pm-skills` monorepo). Same conventions (SKILL.md plus references/TEMPLATE.md plus references/EXAMPLE.md per skill, family contract enforced via validators, 3-thread library sample convention). Adds the bridge skill that converts a Founding Hypothesis from the Foundation Sprint track into a Design Sprint brief, plus 2 new workflows (`design-sprint`, `foundation-to-design`).

**Tech Stack:** Same as Foundation Sprint plan: markdown with YAML frontmatter; reuse existing Bash plus PowerShell validators (already extended for sprint-skills by Foundation Sprint plan); Apache 2.0 license.

**Cross-references:** This plan implements `design-sprint-design-spec.md` plus the shared architecture defined in `sprint-skills-architecture.md`. Foundation Sprint plan (`foundation-sprint-implementation-plan.md`) is the prerequisite; it ships shared infrastructure this plan assumes is in place.

---

## Status

Draft for review. Not yet promoted to canonical release-plan structure.

## Prerequisites

This plan assumes the Foundation Sprint plan is fully executed:

- `sprint-skills/` folder scaffolding exists (Foundation Sprint Tasks 1-4)
- `sprint-skills/.claude-plugin/plugin.json` exists
- `.claude-plugin/marketplace.json` already lists `sprint-skills` plugin
- Family contract doc exists at `sprint-skills/docs/reference/sprint-skills-family-contract.md`
- Canonical source mapping doc exists
- Validators exist: `scripts/validate-sprint-skills-family.sh` and `.ps1`
- pm-skills validators are extended to recognize `classification: sprint`
- Shared skill `sprint-note-and-vote` is shipped
- Foundation Sprint workflow and 7 skills are shipped
- AGENTS.md catalogs Foundation Sprint skills

**If shipping Design Sprint WITHOUT Foundation Sprint first** (unlikely but possible): execute Foundation Sprint Tasks 1-9 first, then this plan. This plan would not ship sprint-note-and-vote (Foundation Sprint owns it).

## Scope Note

This plan covers the Design Sprint track (7 skills) plus the bridge skill (`sprint-foundation-to-design`) plus 2 workflows. The bridge skill connects Foundation Sprint output to Design Sprint input, so it logically belongs in this plan as the "second half" of the integrated arc.

## File Structure

### Files to create (39 new files)

**Bridge skill (3 files)**
- `sprint-skills/skills/sprint-foundation-to-design/SKILL.md`
- `sprint-skills/skills/sprint-foundation-to-design/references/TEMPLATE.md`
- `sprint-skills/skills/sprint-foundation-to-design/references/EXAMPLE.md`

**Design Sprint skills (21 files: 7 skills times 3 files each)**
- `sprint-skills/skills/design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-map-and-target/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-sketch/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-decide-and-storyboard/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-prototype-plan/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/design-sprint-test-and-score/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflows (2 files)**
- `sprint-skills/_workflows/design-sprint.md`
- `sprint-skills/_workflows/foundation-to-design.md`

**Slash commands (8 files)**
- `sprint-skills/commands/design-sprint-readiness.md`
- `sprint-skills/commands/design-sprint-brief.md`
- `sprint-skills/commands/design-sprint-map-and-target.md`
- `sprint-skills/commands/design-sprint-sketch.md`
- `sprint-skills/commands/design-sprint-decide-and-storyboard.md`
- `sprint-skills/commands/design-sprint-prototype-plan.md`
- `sprint-skills/commands/design-sprint-test-and-score.md`
- `sprint-skills/commands/sprint-foundation-to-design.md`

**Library samples (24 files: 8 skills times 3 threads each)**
- `sprint-skills/library/sprint-output-samples/brainshelf/design-sprint-{7 skills}.md`
- `sprint-skills/library/sprint-output-samples/brainshelf/sprint-foundation-to-design.md`
- (Same pattern for storevine and workbench)

**User guide (1 file)**
- `sprint-skills/docs/guides/using-design-sprint.md`

### Files to modify (3 files)

- `sprint-skills/.claude-plugin/plugin.json`: version bump if shipping in separate cycle (e.g., 0.1.0 -> 0.2.0)
- `AGENTS.md`: add Design Sprint section
- `CHANGELOG.md`: add Design Sprint track entry (separate version line if separate ship cycle, or merged into v0.1.0 if shipping together with Foundation Sprint)

---

## Tasks

### Phase 1: Bridge skill

#### Task 1: Author sprint-foundation-to-design bridge skill

**Files:**
- Create: `sprint-skills/skills/sprint-foundation-to-design/SKILL.md`
- Create: `sprint-skills/skills/sprint-foundation-to-design/references/TEMPLATE.md`
- Create: `sprint-skills/skills/sprint-foundation-to-design/references/EXAMPLE.md`

- [ ] **Step 1: Author SKILL.md**

Use contract from `design-sprint-design-spec.md` section "sprint-foundation-to-design". Frontmatter:

```yaml
---
name: sprint-foundation-to-design
description: Bridge skill converting a Founding Hypothesis plus assumption scorecard from a Foundation Sprint into a Design Sprint brief, with the highest-risk assumption becoming the Design Sprint challenge.
classification: sprint
sprint_type: bridge
sprint_move: foundation-to-design
version: "0.1.0"
updated: 2026-05-10
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

Body covers: when to use, when NOT to use, zero-friction execution flow with derivation logic (highest-risk assumption from scorecard becomes challenge), common pitfalls, Decider checkpoint protocol, hand-off to `design-sprint-brief`.

- [ ] **Step 2: Author references/TEMPLATE.md**

Skeleton with placeholders for: highest-risk assumption (extracted from scorecard), challenge statement, sprint questions mapped from scorecard rows, prototype medium recommendation rationale, customer recruiting profile derived from FS target customer, team carry-over notes, Decider Checkpoint.

- [ ] **Step 3: Author references/EXAMPLE.md**

Use Brainshelf thread context: a completed Foundation Sprint produced a Founding Hypothesis about book-tracking SaaS targeting personal-collection enthusiasts. The bridge skill identifies "Will users add 50+ books per session?" as the highest-risk assumption and converts it to a Design Sprint challenge.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add sprint-skills/skills/sprint-foundation-to-design/
git commit -m "feat(sprint-skills): add sprint-foundation-to-design bridge skill"
```

### Phase 2: Design Sprint skills

Each of Tasks 2 through 8 follows the same structure: SKILL.md plus TEMPLATE.md plus EXAMPLE.md, validator pass, commit. Content per skill is specified in `design-sprint-design-spec.md`.

#### Task 2: Author design-sprint-readiness

**Files:**
- Create: `sprint-skills/skills/design-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

- [ ] **Step 1: Author SKILL.md**

Use contract from `design-sprint-design-spec.md` section "1. design-sprint-readiness". Frontmatter has `sprint_type: design`, `sprint_move: readiness`, no prerequisites (entry point).

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict, diagnosis, recommended preconditions, attendee list, customer recruiting plan, prep checklist, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf thread context: team is post-Foundation-Sprint and assessing whether Design Sprint fits. Realistic readiness assessment with the bridge skill's output as input.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add sprint-skills/skills/design-sprint-readiness/
git commit -m "feat(sprint-skills): add design-sprint-readiness"
```

#### Task 3: Author design-sprint-brief

Follow Task 2 pattern. Contract from spec section "2. design-sprint-brief". Prerequisites: `design-sprint-readiness` OR `sprint-foundation-to-design`. Adds the customer recruiting plan dimension (longer timebox than Foundation Sprint brief).

- [ ] Step 1-5: same lifecycle.

#### Task 4: Author design-sprint-map-and-target

Follow Task 2 pattern. Contract from spec section "3. design-sprint-map-and-target". Prerequisites: `design-sprint-brief`. Monday's bundled artifact: long-term goal + sprint questions + customer map + HMW clusters + target moment.

- [ ] Step 1-5: same lifecycle.

#### Task 5: Author design-sprint-sketch

Follow Task 2 pattern. Contract from spec section "4. design-sprint-sketch". Prerequisites: `design-sprint-map-and-target`. Tuesday's bundled artifact: lightning demos + four-step sketches + assignments. Note: this skill structures the activity but the human team produces sketches individually.

- [ ] Step 1-5: same lifecycle.

#### Task 6: Author design-sprint-decide-and-storyboard

Follow Task 2 pattern. Contract from spec section "5. design-sprint-decide-and-storyboard". Prerequisites: `design-sprint-sketch`. Wednesday's bundled artifact: heat map + critique + supervote + storyboard. Most decision-heavy day.

- [ ] Step 1-5: same lifecycle.

#### Task 7: Author design-sprint-prototype-plan

Follow Task 2 pattern. Contract from spec section "6. design-sprint-prototype-plan". Prerequisites: `design-sprint-decide-and-storyboard`. Thursday's planning artifact: role plan + interview script + trial-run checklist. Note: planning only; actual prototype build is craft work outside AI invocation surface.

- [ ] Step 1-5: same lifecycle.

#### Task 8: Author design-sprint-test-and-score

Follow Task 2 pattern. Contract from spec section "7. design-sprint-test-and-score". Prerequisites: `design-sprint-prototype-plan`. Friday's bundled artifact: interview observations + scorecard grid + decisions + hot takes + next-step memo. Sprint-closing artifact.

- [ ] Step 1-5: same lifecycle.

### Phase 3: Workflows

#### Task 9: Author design-sprint workflow

**Files:**
- Create: `sprint-skills/_workflows/design-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use the workflow block from `design-sprint-design-spec.md` section "Workflows: design-sprint" as the source. Document: prep phase (readiness, brief), Monday (map-and-target), Tuesday (sketch), Wednesday (decide-and-storyboard), Thursday (prototype-plan plus craft build), Friday (test-and-score). Include next-workflow handoffs to pm-skills downstream (deliver-prd, measure-experiment-design, iterate-pivot-decision) or follow-up sprints.

- [ ] **Step 2: Commit**

```bash
git add sprint-skills/_workflows/design-sprint.md
git commit -m "feat(sprint-skills): add design-sprint workflow"
```

#### Task 10: Author foundation-to-design workflow

**Files:**
- Create: `sprint-skills/_workflows/foundation-to-design.md`

- [ ] **Step 1: Author workflow doc**

This workflow chains foundation-sprint workflow plus bridge skill plus design-sprint workflow into one end-to-end arc. Document: invoke `foundation-sprint` workflow, then `sprint-foundation-to-design` bridge skill, then `design-sprint` workflow. Total: 8-9 days canonical (2 FS plus 1 bridge plus 5 DS plus prep).

- [ ] **Step 2: Commit**

```bash
git add sprint-skills/_workflows/foundation-to-design.md
git commit -m "feat(sprint-skills): add foundation-to-design end-to-end workflow"
```

### Phase 4: Slash commands

#### Task 11: Author Design Sprint plus bridge slash commands

**Files:**
- Create: 8 files in `sprint-skills/commands/`

- [ ] **Step 1: Author each command file**

Pattern from existing pm-skills `commands/*.md`. 8 new commands total: 7 Design Sprint skills plus 1 bridge skill.

- [ ] **Step 2: Validate command paths**

Run: `bash scripts/validate-commands.sh`
Expected: all 8 new commands resolve.

- [ ] **Step 3: Commit**

```bash
git add sprint-skills/commands/
git commit -m "feat(sprint-skills): add 8 slash commands for Design Sprint track"
```

### Phase 5: Library samples

#### Task 12: Author Brainshelf thread samples (8 samples)

**Files:**
- Create: 8 sample files in `sprint-skills/library/sprint-output-samples/brainshelf/`

- [ ] **Step 1: Plan a coherent Brainshelf Design Sprint trace**

Continue the Brainshelf thread from Foundation Sprint. The Founding Hypothesis was about book-tracking SaaS; the bridge skill identified the highest-risk assumption; this Design Sprint validates it through prototype testing.

- [ ] **Step 2: Author 8 samples**

One per skill plus bridge: readiness, brief, map-and-target, sketch (showing 3-4 sketches), decide-and-storyboard, prototype-plan, test-and-score (with 5 customer interview observations), plus foundation-to-design bridge.

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS for Brainshelf thread.

- [ ] **Step 4: Commit**

```bash
git add sprint-skills/library/sprint-output-samples/brainshelf/
git commit -m "docs(sprint-skills): brainshelf thread Design Sprint samples (8)"
```

#### Task 13: Author Storevine thread samples (8 samples)

Follow Task 12 pattern. Storevine context: B2B retail analytics, continuing from Storevine Foundation Sprint trace.

- [ ] Step 1-4: same lifecycle.

#### Task 14: Author Workbench thread samples (8 samples)

Follow Task 12 pattern. Workbench context: developer tooling, continuing from Workbench Foundation Sprint trace.

- [ ] Step 1-4: same lifecycle.

### Phase 6: User-facing documentation

#### Task 15: Author using-design-sprint guide

**Files:**
- Create: `sprint-skills/docs/guides/using-design-sprint.md`

- [ ] **Step 1: Author guide**

Cover: when to run a Design Sprint, how to use the 7 skills in sequence (plus when to start from foundation-to-design bridge), common pitfalls, hand-off to pm-skills downstream. Length target: 1,500-2,000 words. Include 2-3 mermaid diagrams (the 5-day flow, the foundation-to-design bridge, the Friday scorecard structure).

- [ ] **Step 2: Commit**

```bash
git add sprint-skills/docs/guides/using-design-sprint.md
git commit -m "docs(sprint-skills): user guide for Design Sprint"
```

#### Task 16: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add Design Sprint section**

Append to existing sprint-skills section (added by Foundation Sprint plan). List the 7 Design Sprint skills plus bridge skill with brief descriptions.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md catalogs sprint-skills Design Sprint track"
```

### Phase 7: Integration and ship

#### Task 17: Update plugin manifest version (if shipping in a new cycle)

**Files:**
- Modify: `sprint-skills/.claude-plugin/plugin.json`

If Foundation Sprint already shipped as v0.1.0 and Design Sprint is a follow-up cycle:

- [ ] **Step 1: Bump version**

Update `version` field from `"0.1.0"` to `"0.2.0"`. Update description if relevant.

- [ ] **Step 2: Update marketplace.json**

In `.claude-plugin/marketplace.json`, bump the sprint-skills `version` field to match.

- [ ] **Step 3: Commit**

```bash
git add sprint-skills/.claude-plugin/plugin.json .claude-plugin/marketplace.json
git commit -m "chore(sprint-skills): version bump to 0.2.0 for Design Sprint track"
```

If Foundation Sprint and Design Sprint ship in the same cycle (as a unified v0.1.0), skip this task.

#### Task 18: Update CHANGELOG.md

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Author the entry**

If shipping as v0.2.0: header `## sprint-skills v0.2.0 (2026-05-XX, beta)`. Body covers: 7 Design Sprint skills, 1 bridge skill, 2 new workflows (design-sprint, foundation-to-design), 8 new commands, 24 new library samples, design-sprint user guide.

If shipping as part of v0.1.0: merge Design Sprint content into the existing v0.1.0 entry.

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: CHANGELOG entry for sprint-skills Design Sprint track"
```

#### Task 19: Run full validation suite

- [ ] **Step 1: Run all validators**

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-commands.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-meeting-skills-family.sh
bash scripts/validate-sprint-skills-family.sh
bash scripts/check-frontmatter-yaml.mjs
```

Expected: all pass.

- [ ] **Step 2: Smoke-test end-to-end workflow**

Mock-run the `foundation-to-design` workflow: produce a fake Founding Hypothesis, invoke bridge skill, confirm Design Sprint brief output is well-formed.

- [ ] **Step 3: Verify marketplace install**

If versions bumped: test that the marketplace shows the updated sprint-skills version.

#### Task 20: Tag and announce

- [ ] **Step 1: Tag**

If shipping as v0.2.0:

```bash
git tag sprint-skills-v0.2.0
git push origin sprint-skills-v0.2.0
```

If shipping unified v0.1.0 with Foundation Sprint, the tag is already created by that plan.

- [ ] **Step 2: Author release notes on GitHub Releases**

Use the CHANGELOG entry. Highlight: complete sprint-skills coverage (Foundation plus Design plus bridge), the foundation-to-design end-to-end workflow as the headline capability.

- [ ] **Step 3: Update CONTEXT.md and MEMORY.md** to reflect Design Sprint track completion.

---

## Self-Review Notes

Coverage of `design-sprint-design-spec.md`:

- All 7 Design Sprint skill contracts covered by Tasks 2-8.
- Bridge skill `sprint-foundation-to-design` covered by Task 1.
- 2 workflows (`design-sprint`, `foundation-to-design`) covered by Tasks 9-10.
- 8 slash commands covered by Task 11.
- Library samples plan (21 Design Sprint + 3 bridge = 24 samples per spec) covered by Tasks 12-14.
- User guide covered by Task 15.
- Open questions from the spec are NOT resolved by this plan; they surface to the maintainer during implementation.

Placeholder check:

- All steps have specific content references (to design-spec sections or canonical sources).
- No "implement later" or "fill in details" steps.
- Versioning step (Task 17) is conditional based on ship-cycle decision, which is a maintainer judgment, not a placeholder.

Type/name consistency:

- All Design Sprint skill slugs match between Tasks 2-8, Task 11 (commands), and Tasks 12-14 (samples).
- Frontmatter field names consistent with `sprint-skills-architecture.md` and the Foundation Sprint plan.
- Bridge skill name (`sprint-foundation-to-design`) consistent across all references.

## Effort Estimate

| Phase | Tasks | Estimated days |
|---|---|---|
| Phase 1: Bridge skill | 1 | 0.5-1.0 |
| Phase 2: Design Sprint skills | 7 | 5.0-7.0 (0.7-1.0 days per skill; Day-3 through Day-7 skills are slightly heavier due to multi-day output structure) |
| Phase 3: Workflows | 2 | 1.0-1.5 |
| Phase 4: Slash commands | 1 | 0.5 |
| Phase 5: Library samples | 3 | 3.5-4.5 (slightly higher than Foundation Sprint per-thread because Design Sprint samples include sketches, storyboard, scorecard structures that are more visually-shaped) |
| Phase 6: User docs | 2 | 1.5-2.0 |
| Phase 7: Integration | 4 | 1.5-2.0 |
| **Total** |  | **13.5-18.5 days** |

Combined Foundation Sprint plus Design Sprint plus shared infrastructure: roughly **28.5-39.5 days**, in the same range as the source-doc estimate of 30-45 days for the full sprint-skills v0.1.0 collection.

## Decision Point

Two ship-cycle options for the maintainer:

1. **Unified ship (single cycle)**: execute Foundation Sprint plan then Design Sprint plan in one ~30-day cycle. Tag once as `sprint-skills-v0.1.0`. Maximum coherence; longest cycle.
2. **Phased ship (two cycles)**: Foundation Sprint as v0.1.0 (15-21 days), then Design Sprint as v0.2.0 (13.5-18.5 days). Two release tags, more frequent shipping milestones, easier dogfooding between cycles. Recommended for first-time sprint-skills.

Either approach is supported by these two plans. The Design Sprint plan's Task 17 handles the version-bump branching.

## Execution Note

Same as Foundation Sprint plan: use superpowers:subagent-driven-development or superpowers:executing-plans for implementation. Each task should end with a commit; frequent-commits discipline is intentional.
