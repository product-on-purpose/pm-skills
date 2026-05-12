# Foundation Sprint Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Foundation Sprint facilitation skills plus 1 shared sprint skill (`sprint-note-and-vote`) as a new `classification: sprint` within pm-skills, targeting the pm-skills v2.15.0 release.

**Architecture:** Sprint skills integrate directly into the existing pm-skills directory structure. No separate plugin, no separate repo. Skills live in `skills/`, commands in `commands/`, library samples in `library/skill-output-samples/`, workflows in `_workflows/`. A new `classification: sprint` value extends the existing frontmatter classification system. A new family validator (`validate-sprint-skills-family`) enforces the sprint contract alongside the existing validator suite.

**Tech Stack:** Same as pm-skills: markdown with YAML frontmatter; Bash plus PowerShell validators following the `.sh` + `.ps1` dual-script convention; Apache 2.0 license.

**Cross-references:** Skill content is specified in `foundation-sprint-design-spec.md`. The Design Sprint track has its own integration plan (`design-sprint-integration-plan.md`); this plan ships shared infrastructure and the Foundation Sprint track first. Design Sprint plan assumes this plan is complete. v2.14.x deferral cleanup (Node 22 bump + CONTEXT.md skills inventory refresh) runs in parallel within the same v2.15.0 release: see `v2.14.x-deferrals-cleanup-plan.md`.

---

## Status

Draft. Promote to `docs/internal/release-plans/v2.15.0/` when the v2.15.0 release cycle begins.

## Prerequisites

- pm-skills v2.14.2 stable on origin/main (confirmed: shipped 2026-05-10)
- Design specs reviewed: `foundation-sprint-design-spec.md`, `design-sprint-design-spec.md`
- Decision: sprint skills integrate into pm-skills (not a separate plugin); Foundation Sprint ships before Design Sprint within the same v2.15.0 release

## Scope

This plan covers:
- Validator extensions for `classification: sprint` recognition
- New `validate-sprint-skills-family` validator pair
- `sprint-note-and-vote` shared skill (used by both Foundation Sprint and Design Sprint tracks)
- 7 Foundation Sprint skills
- Foundation Sprint workflow
- 8 slash commands (7 Foundation Sprint + 1 shared)
- 24 library samples (8 skills x 3 threads)
- Foundation Sprint user guide
- AGENTS.md additions for Foundation Sprint track

This plan does NOT cover: Design Sprint skills, bridge skill, Design Sprint workflow. Those are in `design-sprint-integration-plan.md`.

## File Structure

### Files to create (53 new files)

**Validators (2 files)**
- `scripts/validate-sprint-skills-family.sh`
- `scripts/validate-sprint-skills-family.ps1`

**Shared skill (3 files)**
- `skills/sprint-note-and-vote/SKILL.md`
- `skills/sprint-note-and-vote/references/TEMPLATE.md`
- `skills/sprint-note-and-vote/references/EXAMPLE.md`

**Foundation Sprint skills (21 files: 7 skills x 3 files each)**
- `skills/foundation-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-basics/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-differentiation/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-approach-options/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-magic-lenses/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/foundation-sprint-founding-hypothesis/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflow (1 file)**
- `_workflows/foundation-sprint.md`

**Slash commands (8 files)**
- `commands/foundation-sprint-readiness.md`
- `commands/foundation-sprint-brief.md`
- `commands/foundation-sprint-basics.md`
- `commands/foundation-sprint-differentiation.md`
- `commands/foundation-sprint-approach-options.md`
- `commands/foundation-sprint-magic-lenses.md`
- `commands/foundation-sprint-founding-hypothesis.md`
- `commands/sprint-note-and-vote.md`

**Library samples (24 files: 8 skills x 3 threads)**
- `library/skill-output-samples/foundation-sprint-readiness/sample_foundation-sprint-readiness_{thread}_{scenario}.md` (x3)
- Same pattern for: foundation-sprint-brief, foundation-sprint-basics, foundation-sprint-differentiation, foundation-sprint-approach-options, foundation-sprint-magic-lenses, foundation-sprint-founding-hypothesis, sprint-note-and-vote
- Thread scenarios: `brainshelf_book-catalog`, `storevine_retail-direction`, `workbench_debugging-toolchain`

**User guide (1 file)**
- `docs/guides/using-foundation-sprint.md`

**Sprint family contract (1 file)**
- `docs/reference/sprint-skills-family-contract.md`

### Files to modify (5 files)

- `scripts/lint-skills-frontmatter.sh`: add `sprint` to allowed `classification` values
- `scripts/lint-skills-frontmatter.ps1`: same, PowerShell parity
- `scripts/validate-agents-md.sh`: extend to recognize `skills/foundation-sprint-*` and `skills/sprint-note-and-vote` directories
- `scripts/validate-agents-md.ps1`: same, PowerShell parity
- `AGENTS.md`: add Foundation Sprint skills section

---

## Tasks

### Phase 1: Validator infrastructure

#### Task 1: Extend lint-skills-frontmatter to allow `classification: sprint`

**Files:**
- Modify: `scripts/lint-skills-frontmatter.sh`
- Modify: `scripts/lint-skills-frontmatter.ps1`

- [ ] **Step 1: Read current allowed classification values**

Read `scripts/lint-skills-frontmatter.sh` and identify the classification enum check.

- [ ] **Step 2: Add `sprint` to the allowed set**

Patch both `.sh` and `.ps1` to include `sprint` alongside existing values (phase, foundation, utility).

- [ ] **Step 3: Verify no regressions**

Run: `bash scripts/lint-skills-frontmatter.sh`
Expected: PASS on all existing skills; sprint classification now accepted without warning.

- [ ] **Step 4: Commit**

```bash
git add scripts/lint-skills-frontmatter.sh scripts/lint-skills-frontmatter.ps1
git commit -m "chore(scripts): allow classification: sprint in frontmatter linter"
```

#### Task 2: Extend validate-agents-md to recognize sprint skills

**Files:**
- Modify: `scripts/validate-agents-md.sh`
- Modify: `scripts/validate-agents-md.ps1`

- [ ] **Step 1: Read current directory scope in validate-agents-md**

Identify where the validator enumerates skill directories. Confirm it currently only scans phase/foundation/utility directories.

- [ ] **Step 2: Add sprint skill directory pattern**

Extend the scanned pattern to include `skills/foundation-sprint-*`, `skills/design-sprint-*`, and `skills/sprint-*` directories.

- [ ] **Step 3: Run validator against current state**

Expected: PASS (no sprint skills exist yet, so no new warnings generated).

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-agents-md.sh scripts/validate-agents-md.ps1
git commit -m "chore(scripts): extend agents-md validator to recognize sprint skills"
```

#### Task 3: Author sprint-skills family validator (Bash)

**Files:**
- Create: `scripts/validate-sprint-skills-family.sh`

- [ ] **Step 1: Read meeting-skills validator as reference**

Read `scripts/validate-meeting-skills-family.sh` for structural pattern.

- [ ] **Step 2: Author the validator**

Checks to implement (WARN mode initially; promote to FAIL in a follow-up once all skills are shipped):
- Every `skills/foundation-sprint-*`, `skills/design-sprint-*`, and `skills/sprint-*` folder has SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- SKILL.md frontmatter has required sprint fields: `name`, `description`, `classification: sprint`, `sprint_type`, `sprint_move`, `version`, `updated`, `license`
- `sprint_type` is one of: `shared`, `foundation`, `design`, `bridge`
- TEMPLATE.md ends with a "Decider Checkpoint" section
- Naming: `foundation-sprint-{move}` for foundation track; `design-sprint-{move}` for design track; `sprint-{move}` for shared; `sprint-foundation-to-design` for bridge

- [ ] **Step 3: Test against empty state**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: exits cleanly with no sprint skills present yet.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-sprint-skills-family.sh
git commit -m "feat(scripts): validate-sprint-skills-family Bash validator"
```

#### Task 4: Author sprint-skills family validator (PowerShell)

**Files:**
- Create: `scripts/validate-sprint-skills-family.ps1`

- [ ] **Step 1: Port Bash validator to PowerShell**

Match check parity 1:1 with `validate-sprint-skills-family.sh`. Use `validate-meeting-skills-family.ps1` as structural reference.

- [ ] **Step 2: Test**

Run: `pwsh -File scripts/validate-sprint-skills-family.ps1`
Expected: PASS with no sprint skills present.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-sprint-skills-family.ps1
git commit -m "feat(scripts): validate-sprint-skills-family PowerShell parity"
```

#### Task 5: Author sprint-skills family contract doc

**Files:**
- Create: `docs/reference/sprint-skills-family-contract.md`

- [ ] **Step 1: Read meeting-skills contract as reference**

Read `docs/reference/skill-families/meeting-skills-contract.md` for structure and depth.

- [ ] **Step 2: Author the sprint contract**

Cover:
- Shared frontmatter fields (`classification`, `sprint_type`, `sprint_move`, `prerequisites`, `inputs`, `outputs`, `timebox_minutes`, `roles`, `frameworks`)
- Naming convention (foundation-sprint-*, design-sprint-*, sprint-*, bridge)
- File anatomy (SKILL.md + TEMPLATE.md + EXAMPLE.md)
- Non-negotiable output elements (Decider Checkpoint in every TEMPLATE.md)
- Zero-friction execution behavior
- CI enforcement reference
- Library sample requirements (3 threads: brainshelf-book-catalog, storevine-retail-direction, workbench-debugging-toolchain)
- Versioning policy

- [ ] **Step 3: Commit**

```bash
git add docs/reference/sprint-skills-family-contract.md
git commit -m "docs(sprint-skills): sprint-skills family contract"
```

### Phase 2: Shared skill

#### Task 6: Author sprint-note-and-vote

**Files:**
- Create: `skills/sprint-note-and-vote/SKILL.md`
- Create: `skills/sprint-note-and-vote/references/TEMPLATE.md`
- Create: `skills/sprint-note-and-vote/references/EXAMPLE.md`

- [ ] **Step 1: Author SKILL.md**

Frontmatter:

```yaml
---
name: sprint-note-and-vote
description: Universal decision mechanic used throughout Foundation Sprint and Design Sprint. Captures silent ideation, vote summaries, and decision records.
classification: sprint
sprint_type: shared
sprint_move: note-and-vote
version: "0.1.0"
updated: 2026-05-11
license: Apache-2.0
metadata:
  category: sprint-decision
  frameworks: [foundation-sprint, design-sprint, character-note-and-vote]
  timebox_minutes: 25
  roles: [facilitator, decider, whole-team]
  inputs: [decision question, time allocation, voting method, optional silent-write prompt]
  outputs: [silent ideation board, vote summary, discussion notes, decision record]
  author: product-on-purpose
---
```

Body covers: when to use, when NOT to use, zero-friction execution flow, bundled output structure, common pitfalls, Decider Checkpoint protocol.

- [ ] **Step 2: Author references/TEMPLATE.md**

Skeleton with placeholders: decision question, silent contributions list, vote results table, discussion notes, decision record with Decider sign-off. End with Decider Checkpoint section.

- [ ] **Step 3: Author references/EXAMPLE.md**

Use Brainshelf book-catalog sprint context: a sprint decision about which target customer to prioritize. Realistic 3-option vote with Decider supervote.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS for sprint-note-and-vote.

- [ ] **Step 5: Commit**

```bash
git add skills/sprint-note-and-vote/
git commit -m "feat(sprint-skills): add sprint-note-and-vote (shared decision mechanic)"
```

### Phase 3: Foundation Sprint skills

Each of Tasks 7-13 follows the same structure: SKILL.md + TEMPLATE.md + EXAMPLE.md, validator pass, commit. Detailed content spec for each skill is in `foundation-sprint-design-spec.md`.

#### Task 7: Author foundation-sprint-readiness

**Files:**
- Create: `skills/foundation-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

- [ ] **Step 1: Author SKILL.md**

Use spec section "1. foundation-sprint-readiness". Frontmatter: `sprint_type: foundation`, `sprint_move: readiness`, no prerequisites (entry point).

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict (Go / Conditional Go / Wait), diagnosis section, recommended preconditions, attendee list, prep activities, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf book-catalog sprint context: PM evaluating whether a Foundation Sprint is the right tool to clarify their consumer book-tracking product direction.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/foundation-sprint-readiness/
git commit -m "feat(sprint-skills): add foundation-sprint-readiness"
```

#### Task 8: Author foundation-sprint-brief

Follow Task 7 pattern. Spec section "2. foundation-sprint-brief". Prerequisites: `foundation-sprint-readiness`.

- [ ] Steps 1-5: same lifecycle.

#### Task 9: Author foundation-sprint-basics

Follow Task 7 pattern. Spec section "3. foundation-sprint-basics". Prerequisites: `foundation-sprint-brief`. Bundled artifact has 4 sub-parts.

- [ ] Steps 1-5: same lifecycle.

#### Task 10: Author foundation-sprint-differentiation

Follow Task 7 pattern. Spec section "4. foundation-sprint-differentiation". Prerequisites: `foundation-sprint-basics`. Includes 2x2 chart and mini-manifesto.

- [ ] Steps 1-5: same lifecycle.

#### Task 11: Author foundation-sprint-approach-options

Follow Task 7 pattern. Spec section "5. foundation-sprint-approach-options". Prerequisites: `foundation-sprint-differentiation`.

- [ ] Steps 1-5: same lifecycle.

#### Task 12: Author foundation-sprint-magic-lenses

Follow Task 7 pattern. Spec section "6. foundation-sprint-magic-lenses". Prerequisites: `foundation-sprint-approach-options`.

- [ ] Steps 1-5: same lifecycle.

#### Task 13: Author foundation-sprint-founding-hypothesis

Follow Task 7 pattern. Spec section "7. foundation-sprint-founding-hypothesis". Prerequisites: `foundation-sprint-magic-lenses`. Final Foundation Sprint output - produces the Founding Hypothesis that feeds into Design Sprint.

- [ ] Steps 1-5: same lifecycle.

### Phase 4: Workflow and commands

#### Task 14: Author foundation-sprint workflow

**Files:**
- Create: `_workflows/foundation-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use the workflow block from `foundation-sprint-design-spec.md` section "Workflow: foundation-sprint". Document: prep phase (readiness, brief), Day 1 morning (basics), Day 1 afternoon (differentiation), Day 2 morning (approach-options), Day 2 afternoon (magic-lenses), Day 2 closing (founding-hypothesis). Include handoff to `design-sprint` workflow (via `sprint-foundation-to-design` bridge skill).

- [ ] **Step 2: Commit**

```bash
git add _workflows/foundation-sprint.md
git commit -m "feat(sprint-skills): add foundation-sprint workflow"
```

#### Task 15: Author slash commands

**Files:**
- Create: 8 files in `commands/` (one per skill)

- [ ] **Step 1: Author each command file**

Pattern from existing `commands/*.md` files. Command body invokes the underlying skill. 8 new commands: 7 Foundation Sprint skills + sprint-note-and-vote.

- [ ] **Step 2: Validate commands**

Run: `bash scripts/validate-commands.sh`
Expected: all 8 new commands resolve.

- [ ] **Step 3: Commit**

```bash
git add commands/foundation-sprint-readiness.md commands/foundation-sprint-brief.md commands/foundation-sprint-basics.md commands/foundation-sprint-differentiation.md commands/foundation-sprint-approach-options.md commands/foundation-sprint-magic-lenses.md commands/foundation-sprint-founding-hypothesis.md commands/sprint-note-and-vote.md
git commit -m "feat(sprint-skills): add 8 slash commands for Foundation Sprint track"
```

### Phase 5: Library samples

Sample naming convention: `sample_{skill-name}_{thread}_{scenario}.md`

Thread scenarios for sprint skills:
- Brainshelf: `brainshelf_book-catalog` (Foundation Sprint to validate book-tracking SaaS direction)
- Storevine: `storevine_retail-direction` (Foundation Sprint to define retail analytics product direction)
- Workbench: `workbench_debugging-toolchain` (Foundation Sprint to validate dev tooling direction)

Each thread must tell a coherent story across all 8 skills - basics output feeds differentiation, differentiation feeds approach-options, and so on through to founding-hypothesis.

#### Task 16: Author Brainshelf thread samples (8 samples)

**Files:**
- Create: 8 files in `library/skill-output-samples/{skill-name}/sample_{skill-name}_brainshelf_book-catalog.md`

- [ ] **Step 1: Plan a coherent Brainshelf Foundation Sprint trace**

Draft a narrative: Brainshelf runs a 2-day Foundation Sprint to decide whether to prioritize individual collectors or social readers. Each sample is one workshop-move output.

- [ ] **Step 2: Author 8 samples**

One per skill: readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis, plus a note-and-vote sample from a key decision moment (e.g., choosing the target customer).

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS for all Brainshelf samples.

- [ ] **Step 4: Commit**

```bash
git add library/skill-output-samples/foundation-sprint-*/sample_*_brainshelf_book-catalog.md library/skill-output-samples/sprint-note-and-vote/sample_sprint-note-and-vote_brainshelf_book-catalog.md
git commit -m "docs(sprint-skills): brainshelf Foundation Sprint samples (8)"
```

#### Task 17: Author Storevine thread samples (8 samples)

Follow Task 16 pattern. Storevine context: B2B retail analytics startup running Foundation Sprint to decide between self-serve analytics vs. managed intelligence service direction.

- [ ] Steps 1-4: same lifecycle.

#### Task 18: Author Workbench thread samples (8 samples)

Follow Task 16 pattern. Workbench context: developer tooling team running Foundation Sprint to validate whether to build a distributed-systems debugging product or a general observability platform.

- [ ] Steps 1-4: same lifecycle.

### Phase 6: Documentation

#### Task 19: Author using-foundation-sprint guide

**Files:**
- Create: `docs/guides/using-foundation-sprint.md`

- [ ] **Step 1: Author guide**

Cover: what a Foundation Sprint is and when to run one, how to use the 7 skills in sequence, the role of sprint-note-and-vote, common pitfalls, handoff to Design Sprint. Length target: 1,200-1,800 words. Include 1-2 mermaid diagrams (2-day flow, output-to-next-skill handoff chain).

- [ ] **Step 2: Commit**

```bash
git add docs/guides/using-foundation-sprint.md
git commit -m "docs(sprint-skills): user guide for Foundation Sprint"
```

#### Task 20: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add sprint-skills Foundation Sprint section**

Add a new section (after existing pm-skills sections) listing sprint-note-and-vote plus 7 Foundation Sprint skills with brief descriptions.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md adds Foundation Sprint track skills"
```

### Phase 7: Integration check

#### Task 21: Run full validation suite

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

- [ ] **Step 2: Smoke-test a slash command**

Invoke `/foundation-sprint-readiness` in Claude Code with a test context. Confirm it resolves and produces output matching the TEMPLATE structure.

- [ ] **Step 3: Hand off to Design Sprint plan**

Confirm all prerequisites for `design-sprint-integration-plan.md` are in place:
- `sprint-skills/skills/` folder exists at `skills/` level (confirmed by skill directories)
- `validate-sprint-skills-family.sh` + `.ps1` exist and pass
- `sprint-note-and-vote` is shipped
- AGENTS.md catalogs Foundation Sprint skills

---

## Effort Estimate

| Phase | Tasks | Estimated sessions |
|---|---|---|
| Phase 1: Validator infrastructure | 5 | 1 session |
| Phase 2: Shared skill | 1 | 0.5 session |
| Phase 3: Foundation Sprint skills | 7 | 3-4 sessions (2 skills per session) |
| Phase 4: Workflow + commands | 2 | 0.5 session |
| Phase 5: Library samples | 3 | 2-3 sessions (1 thread per session) |
| Phase 6: Docs | 2 | 1 session |
| Phase 7: Integration | 1 | 0.5 session |
| **Total** | | **8-10 sessions** |

## Self-Review Notes

Differences from the archived plugin-based plan:
- No plugin scaffolding tasks (Tasks 1-4 in the plugin plan are removed entirely)
- No marketplace.json changes
- File paths are directly in `skills/`, `commands/`, `library/`, `_workflows/`, `docs/` - no `sprint-skills/` prefix
- Validator extension (Tasks 1-2) replaces the plugin plan's separate validator bootstrap
- Family contract goes into `docs/reference/` alongside the meeting-skills contract
- Version bump is pm-skills v2.15.0, not a separate plugin tag

Content coverage of `foundation-sprint-design-spec.md`:
- All 7 Foundation Sprint skill contracts covered by Tasks 7-13
- Shared `sprint-note-and-vote` covered by Task 6
- Workflow covered by Task 14
- Library samples (24: 8 skills x 3 threads) covered by Tasks 16-18
- User guide covered by Task 19
- Open questions from the spec surface to the maintainer during authoring; this plan does not resolve them
