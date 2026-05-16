# Foundation Sprint Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Foundation Sprint facilitation skills (all prefixed `tool-foundation-sprint-*`) plus 1 standalone `tool-note-and-vote` skill as part of a new `classification: tool` within pm-skills, targeting the pm-skills v2.15.0 release. This plan also ships the FS family contract and family validator pair.

**Architecture:** Sprint skills integrate directly into the existing pm-skills directory structure. No separate plugin, no separate repo. Skills live in `skills/`, commands in `commands/`, library samples in `library/skill-output-samples/`, workflows in `_workflows/`. A new `classification: tool` value extends the existing frontmatter classification system to capture "named external methodology composed of multiple skills working as a system." Two families (`foundation-sprint-skills` and `design-sprint-skills`) live under `tool`; `tool-note-and-vote` is a standalone tool (not a family member). A new family validator (`validate-foundation-sprint-skills-family`) enforces the FS family contract alongside the existing validator suite. The Design Sprint plan ships its own analogous family validator.

**Tech Stack:** Same as pm-skills: markdown with YAML frontmatter; Bash plus PowerShell validators following the `.sh` + `.ps1` dual-script convention; Apache 2.0 license.

**Cross-references:** Skill content is specified in `foundation-sprint-design-spec.md`. The Design Sprint track has its own integration plan (`design-sprint-integration-plan.md`); this plan ships shared infrastructure and the Foundation Sprint track first. Design Sprint plan assumes this plan is complete. v2.14.x deferral cleanup (Node 22 bump + CONTEXT.md skills inventory refresh) runs in parallel within the same v2.15.0 release: see `v2.14.x-deferrals-cleanup-plan.md`.

---

## Status

**Execution near-complete.** 19 of 21 tasks shipped on origin/main as of 2026-05-15 (HEAD `ce2acae`). Foundation Sprint family is functionally shippable; only optional sample coverage and a final integration check remain.

### Where we are (snapshot 2026-05-15)

| Phase | Status | Closing commit(s) |
|---|---|---|
| Phase 1: Validator infrastructure (Tasks 1-5) | SHIPPED | `f4baba4`, `0829a3c`, `d1b3ba0`, `d18159b`, `44ad8d7` |
| Phase 2: tool-note-and-vote standalone (Task 6) | SHIPPED | `760d3c2` |
| Phase 3: 7 FS family skills (Tasks 7-13) | SHIPPED | `b3b6b5d`, `8e2bf67`, `b2d5254`, `04b30b5`, `5b5ac4b`, `d4ea045`, `29901fb` |
| Phase 4: Workflow + commands (Tasks 14-15) | SHIPPED | `9509a80`, `d7a6946` |
| Phase 5: Library samples (Tasks 16-18) | PARTIAL | `df53cb1` (Brainshelf, Task 16); Storevine (Task 17) + Workbench (Task 18) pending |
| Phase 6: Documentation (Tasks 19, 19a, 20) | SHIPPED | Task 19: `b04ff14` (using-foundation-sprint guide); Task 19a: absorbed by `7096bca` tool-classification refactor (verified clean); Task 20: `519e216` (AGENTS.md tool section) |
| Phase 7: Integration check (Task 21) | PENDING | - |

### What's left

- **Task 17**: Storevine library samples (8 fresh Brainshelf-style samples; ~2-3 hours; optional coverage but matches meeting-skills 3-thread precedent)
- **Task 18**: Workbench library samples (8 fresh samples; ~2-3 hours; same optionality)
- **Task 21**: Phase 7 full validation suite + smoke-test a slash command (~1 hour; closes this plan)

### Hand-off readiness for Design Sprint plan

All DS plan prerequisites are now met: `tool-note-and-vote` shipped, `lint-skills-frontmatter` and `validate-agents-md` recognize `classification: tool`, FS family validator exists as a pattern reference, FS family contract exists as a pattern reference, all 7 FS family skills shipped, AGENTS.md tool section in place.

## Prerequisites

- pm-skills v2.14.2 stable on origin/main (confirmed: shipped 2026-05-10)
- Design specs reviewed: `foundation-sprint-design-spec.md`, `design-sprint-design-spec.md`
- Decision: sprint skills integrate into pm-skills under `classification: tool` (architectural amendment 2026-05-13); Foundation Sprint ships before Design Sprint within the same v2.15.0 release; bridge skill dropped; note-and-vote standalone

## Scope

This plan covers:
- Validator extensions for `classification: tool` recognition
- New `validate-foundation-sprint-skills-family` validator pair (FS family contract enforcement)
- `tool-note-and-vote` standalone tool skill (used by both Foundation Sprint and Design Sprint tracks, but not a family member of either)
- 7 Foundation Sprint skills (all `tool-foundation-sprint-*`)
- Foundation Sprint workflow
- 8 slash commands (7 Foundation Sprint + 1 standalone tool)
- 24 library samples (8 skills x 3 threads)
- Foundation Sprint user guide
- Foundation Sprint concept doc (already shipped in commit `5b9e590`; tool-classification refactor pending)
- AGENTS.md additions for Foundation Sprint track + standalone tool

This plan does NOT cover: Design Sprint skills, Design Sprint workflow, Design Sprint family contract or validator, foundation-to-design end-to-end workflow doc. Those are in `design-sprint-integration-plan.md`. The Foundation-to-Design transition has no dedicated bridge skill (canonical Knapp/Zeratsky has no formal handoff step); the transition lives in the `foundation-to-design` workflow doc and in the two user guides.

## Ratified Decisions

The Foundation Sprint design spec (`foundation-sprint-design-spec.md`) ends with 6 open questions, each carrying a "Lean X" recommendation but no explicit decision. The pre-execution review flagged this as P2.2 (risk of cross-skill inconsistency if open questions are re-litigated mid-execution). The following decisions are ratified before Phase 1 Task 1 begins:

| # | Open question | Ratified decision | Authored into |
|---|---|---|---|
| 1 | Approach option count enforcement (spec leaned: enforce min 3) | **Enforce minimum 3 approaches; warn at 4-7; reject at 8 or more** with a clear message pointing to the Decider's role to narrow before progressing | `tool-foundation-sprint-approach-options` SKILL.md instructions step 3 |
| 2 | Custom lens count in Magic Lenses (spec leaned: prompt for at least 1 custom lens) | **Require at least 1 custom lens in addition to the 4 classic lenses (customer, pragmatic, growth, money)** | `tool-foundation-sprint-magic-lenses` SKILL.md instructions step 3 |
| 3 | Hypothesis template strictness (spec leaned: strict for v0.1) | **Strict canonical template:** "If we help [target customer] solve [important problem] with [approach], they will choose it over [competitors or alternatives] because our solution is [differentiators]." Paraphrase is not accepted in v0.1.0 | `tool-foundation-sprint-founding-hypothesis` TEMPLATE.md |
| 4 | Assumption scorecard "right size" (5-7 assumptions per Lenny's recommendation) | **Recommend 5-7 assumptions; accept 3-10 with no validator warning;** scorecard is a strategic tool, not a checklist enforcer | `tool-foundation-sprint-founding-hypothesis` SKILL.md instructions step 4 |
| 5 | Compressed 1-day variant (spec leaned: defer to v0.2) | **Defer to v0.2;** v0.1.0 ships only the canonical 2-day arc | Not authored in v0.1.0 |
| 6 | AI-era guidance placement (spec leaned: separate guide) | **Separate guide section within `docs/guides/using-foundation-sprint.md`** rather than scattered across SKILL.md files | `docs/guides/using-foundation-sprint.md` AI-era section (Task 19) |

These decisions are locked. Re-litigation requires an explicit plan amendment, not in-skill drift.

## File Structure

### Files to create (53 new files)

**Validators (2 files)**
- `scripts/validate-foundation-sprint-skills-family.sh`
- `scripts/validate-foundation-sprint-skills-family.ps1`

**Standalone tool skill (3 files)**
- `skills/tool-note-and-vote/SKILL.md`
- `skills/tool-note-and-vote/references/TEMPLATE.md`
- `skills/tool-note-and-vote/references/EXAMPLE.md`

**Foundation Sprint skills (21 files: 7 skills x 3 files each)**
- `skills/tool-foundation-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-basics/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-differentiation/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-approach-options/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-magic-lenses/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `skills/tool-foundation-sprint-founding-hypothesis/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflow (1 file)**
- `_workflows/foundation-sprint.md`

**Slash commands (8 files)**
- `commands/tool-foundation-sprint-readiness.md`
- `commands/tool-foundation-sprint-brief.md`
- `commands/tool-foundation-sprint-basics.md`
- `commands/tool-foundation-sprint-differentiation.md`
- `commands/tool-foundation-sprint-approach-options.md`
- `commands/tool-foundation-sprint-magic-lenses.md`
- `commands/tool-foundation-sprint-founding-hypothesis.md`
- `commands/tool-note-and-vote.md`

**Library samples (24 files: 8 skills x 3 threads)**
- `library/skill-output-samples/tool-foundation-sprint-readiness/sample_tool-foundation-sprint-readiness_{thread}_{scenario}.md` (x3)
- Same pattern for: tool-foundation-sprint-brief, tool-foundation-sprint-basics, tool-foundation-sprint-differentiation, tool-foundation-sprint-approach-options, tool-foundation-sprint-magic-lenses, tool-foundation-sprint-founding-hypothesis, tool-note-and-vote
- Thread scenarios: `brainshelf_book-catalog`, `storevine_retail-direction`, `workbench_debugging-toolchain`

**User guide (1 file)**
- `docs/guides/using-foundation-sprint.md`

**Family contract (1 file)**
- `docs/reference/skill-families/foundation-sprint-skills-contract.md`

### Files to modify (6 files)

- `scripts/lint-skills-frontmatter.sh`: add `tool` to allowed `classification` values
- `scripts/lint-skills-frontmatter.ps1`: same, PowerShell parity
- `scripts/validate-agents-md.sh`: extend to recognize `skills/tool-*` directories
- `scripts/validate-agents-md.ps1`: same, PowerShell parity
- `docs/reference/skill-families/_registry.yaml`: register the foundation-sprint-skills family with its 7 members (Task 5 Step 3); design-sprint-skills family is registered by the Design Sprint plan
- `AGENTS.md`: add Foundation Sprint skills section + tool-note-and-vote

---

## Tasks

### Phase 1: Validator infrastructure

#### Task 1: Extend lint-skills-frontmatter to allow `classification: tool`

**Files:**
- Modify: `scripts/lint-skills-frontmatter.sh`
- Modify: `scripts/lint-skills-frontmatter.ps1`

- [ ] **Step 1: Read current allowed classification values**

Read `scripts/lint-skills-frontmatter.sh` and identify the classification enum check (currently `domain | foundation | utility`).

- [ ] **Step 2: Add `tool` to the allowed set**

Patch both `.sh` and `.ps1` to include `tool` alongside existing values (`domain`, `foundation`, `utility`). Apply the same root vs phase rule as `foundation` and `utility`: when `classification: tool`, `phase` must be omitted.

- [ ] **Step 3: Verify no regressions**

Run: `bash scripts/lint-skills-frontmatter.sh`
Expected: PASS on all existing skills; tool classification now accepted without warning.

- [ ] **Step 4: Commit**

```bash
git add scripts/lint-skills-frontmatter.sh scripts/lint-skills-frontmatter.ps1
git commit -m "chore(scripts): allow classification: tool in frontmatter linter"
```

#### Task 2: Extend validate-agents-md to recognize tool skills

**Files:**
- Modify: `scripts/validate-agents-md.sh`
- Modify: `scripts/validate-agents-md.ps1`

- [ ] **Step 1: Read current directory scope in validate-agents-md**

Identify where the validator enumerates skill directories. Confirm it currently only scans domain (phase-prefixed), foundation, and utility directories.

- [ ] **Step 2: Add tool skill directory pattern**

Extend the scanned pattern to include `skills/tool-*` directories. One glob covers all sprint skills (`tool-foundation-sprint-*`, `tool-design-sprint-*`) and standalone tool skills (`tool-note-and-vote`).

- [ ] **Step 3: Run validator against current state**

Expected: PASS (no tool skills exist yet, so no new warnings generated).

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-agents-md.sh scripts/validate-agents-md.ps1
git commit -m "chore(scripts): extend agents-md validator to recognize tool skills"
```

#### Task 3: Author foundation-sprint-skills family validator (Bash)

**Files:**
- Create: `scripts/validate-foundation-sprint-skills-family.sh`

- [ ] **Step 1: Read meeting-skills validator as reference**

Read `scripts/validate-meeting-skills-family.sh` for structural pattern.

- [ ] **Step 2: Author the validator**

Checks to implement (WARN mode initially; promote to FAIL in a follow-up once all skills are shipped):
- Every `skills/tool-foundation-sprint-*` folder has SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- SKILL.md frontmatter has required FS family fields: `name`, `description`, `classification: tool`, `version`, `updated`, `license`
- `metadata.tool` equals `foundation-sprint`
- `metadata.move` is present and is a valid kebab-case move identifier (e.g., `readiness`, `basics`, `founding-hypothesis`)
- TEMPLATE.md ends with a "Decider Checkpoint" section
- Naming: directory name matches `tool-foundation-sprint-{metadata.move}`

The DS family validator (shipped by the Design Sprint plan) handles `skills/tool-design-sprint-*` with parallel checks. `tool-note-and-vote` is NOT a family member; it is validated by the generic frontmatter linter and structural checks only.

- [ ] **Step 3: Test against empty state**

Run: `bash scripts/validate-foundation-sprint-skills-family.sh`
Expected: exits cleanly with no foundation-sprint family members present yet.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-foundation-sprint-skills-family.sh
git commit -m "feat(scripts): validate-foundation-sprint-skills-family Bash validator"
```

#### Task 4: Author foundation-sprint-skills family validator (PowerShell)

**Files:**
- Create: `scripts/validate-foundation-sprint-skills-family.ps1`

- [ ] **Step 1: Port Bash validator to PowerShell**

Match check parity 1:1 with `validate-foundation-sprint-skills-family.sh`. Use `validate-meeting-skills-family.ps1` as structural reference.

- [ ] **Step 2: Test**

Run: `pwsh -File scripts/validate-foundation-sprint-skills-family.ps1`
Expected: PASS with no foundation-sprint family members present.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-foundation-sprint-skills-family.ps1
git commit -m "feat(scripts): validate-foundation-sprint-skills-family PowerShell parity"
```

#### Task 5: Author foundation-sprint-skills family contract doc and register the family

**Files:**
- Create: `docs/reference/skill-families/foundation-sprint-skills-contract.md` (per existing skill-families/ convention; matches `meeting-skills-contract.md` precedent)
- Modify: `docs/reference/skill-families/_registry.yaml` (register the foundation-sprint-skills family with its 7 members)

Note: the `design-sprint-skills` family contract and its registry entry are owned by the Design Sprint plan, not this one. `tool-note-and-vote` is NOT registered as a family member of either family; it is a standalone tool, validated by the generic frontmatter linter only.

- [ ] **Step 1: Read meeting-skills contract as reference**

Read `docs/reference/skill-families/meeting-skills-contract.md` for structure and depth. Read `docs/reference/skill-families/_registry.yaml` to understand the registration schema.

- [ ] **Step 2: Author the foundation-sprint-skills contract**

Cover, with explicit root vs metadata-nested distinction:

**Root-level frontmatter fields** (required for every foundation-sprint-skills family member):

```yaml
name: tool-foundation-sprint-<move>
description: <one-line description with Use-when triggers>
classification: tool
version: "X.Y.Z"
updated: YYYY-MM-DD
license: Apache-2.0
```

**Metadata-nested fields** (required unless otherwise noted):

```yaml
metadata:
  tool: foundation-sprint
  move: <short-kebab move identifier; e.g., readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis>
  category: <see category taxonomy in docs/reference/categories.md>
  frameworks: <subset of: foundation-sprint, click, character-note-and-vote>
  timebox_minutes: <integer; per spec timebox>
  roles: <array of: facilitator, decider, pm, design, engineering, researcher, customer-expert, whole-team>
  prerequisites: <array of skill names; optional; semantics defined below>
  inputs: <array of input artifacts the skill consumes>
  outputs: <array of output artifacts the skill produces>
  author: product-on-purpose
```

**Prerequisite semantics:** The `metadata.prerequisites` array lists recommended-but-not-required upstream skills. The family validator does not block invocation when prerequisites are missing; the skill body documents what happens when a prerequisite output is absent (typically: skill prompts the user to confirm equivalent context). Multi-prerequisite cases (e.g., readiness skill OR equivalent context) are captured as an array of all valid upstream skill names; the skill body explains the OR logic in its "When to use" section.

Other content to cover in the contract doc:

- Naming convention: directory name is `tool-foundation-sprint-{metadata.move}`; skill `name` field matches directory name
- File anatomy: SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- Non-negotiable output elements: every TEMPLATE.md ends with a `## Decider Checkpoint` section; every SKILL.md instructions step references the Decider role at appropriate decision points
- Zero-friction execution behavior: skill produces a bundled artifact in a single invocation; no multi-turn back-and-forth required
- Library sample requirements: 3 threads (brainshelf-book-catalog, storevine-retail-direction, workbench-debugging-toolchain); samples carry continuity across the FS sequence
- Cross-family note: the Foundation-to-Design transition has no bridge skill; the `_workflows/foundation-to-design.md` doc and the two user guides describe the handoff narratively
- Versioning policy: each member skill follows pm-skills SemVer (root `version:` field); family contract has its own version tracked in this doc's frontmatter
- CI enforcement reference: link to `scripts/validate-foundation-sprint-skills-family.sh` and `scripts/validate-foundation-sprint-skills-family.ps1`, plus the generic `validate-skill-family-registration` script

- [ ] **Step 3: Register the family in `_registry.yaml`**

Append a foundation-sprint-skills entry to `docs/reference/skill-families/_registry.yaml`:

```yaml
  foundation-sprint-skills:
    contract: docs/reference/skill-families/foundation-sprint-skills-contract.md
    members:
      - tool-foundation-sprint-readiness
      - tool-foundation-sprint-brief
      - tool-foundation-sprint-basics
      - tool-foundation-sprint-differentiation
      - tool-foundation-sprint-approach-options
      - tool-foundation-sprint-magic-lenses
      - tool-foundation-sprint-founding-hypothesis
```

Note: registers all 7 FS family members up front. The `design-sprint-skills` family is registered by the Design Sprint plan; `tool-note-and-vote` is NOT a family member of either family (standalone tool).

- [ ] **Step 4: Commit**

```bash
git add docs/reference/skill-families/foundation-sprint-skills-contract.md docs/reference/skill-families/_registry.yaml
git commit -m "docs(foundation-sprint-skills): family contract and registry entry"
```

### Phase 2: Standalone tool skill

#### Task 6: Author tool-note-and-vote

**Files:**
- Create: `skills/tool-note-and-vote/SKILL.md`
- Create: `skills/tool-note-and-vote/references/TEMPLATE.md`
- Create: `skills/tool-note-and-vote/references/EXAMPLE.md`

Note: `tool-note-and-vote` is a standalone tool, NOT a member of either sprint family. The note-and-vote technique is a generic facilitation primitive that predates and outlives sprints; it can be invoked in any participatory decision context. The FS family validator does not enforce its presence; the DS plan does not re-author it.

- [ ] **Step 1: Author SKILL.md**

Frontmatter:

```yaml
---
name: tool-note-and-vote
description: Structured decision mechanic for groups. Captures silent ideation, vote summaries, and decision records. Used throughout Foundation Sprint and Design Sprint, and applicable to any participatory decision moment.
classification: tool
version: "0.1.0"
updated: 2026-05-13
license: Apache-2.0
metadata:
  category: <see categories.md>
  frameworks: [character-note-and-vote]
  timebox_minutes: 25
  roles: [facilitator, decider, whole-team]
  inputs: [decision question, time allocation, voting method, optional silent-write prompt]
  outputs: [silent ideation board, vote summary, discussion notes, decision record]
  author: product-on-purpose
---
```

Note: no `metadata.tool` field (this is not a sprint-family tool, it's a standalone tool). No `metadata.move` either.

Body covers: when to use (any group decision requiring divergent-then-convergent input), when NOT to use (single-decider calls; uncontested choices), zero-friction execution flow, bundled output structure, common pitfalls, Decider Checkpoint protocol.

- [ ] **Step 2: Author references/TEMPLATE.md**

Skeleton with placeholders: decision question, silent contributions list, vote results table, discussion notes, decision record with Decider sign-off. End with Decider Checkpoint section.

- [ ] **Step 3: Author references/EXAMPLE.md**

Use Brainshelf book-catalog sprint context: a sprint decision about which target customer to prioritize. Realistic 3-option vote with Decider supervote.

- [ ] **Step 4: Validate**

Run: `bash scripts/lint-skills-frontmatter.sh`
Expected: PASS for tool-note-and-vote (no family validator applies; this skill is standalone).

- [ ] **Step 5: Commit**

```bash
git add skills/tool-note-and-vote/
git commit -m "feat(tool): add tool-note-and-vote (standalone decision mechanic)"
```

### Phase 3: Foundation Sprint skills

Each of Tasks 7-13 follows the same structure: SKILL.md + TEMPLATE.md + EXAMPLE.md, family validator pass, commit. Detailed content spec for each skill is in `foundation-sprint-design-spec.md`.

All skills in this phase use this frontmatter shape:

```yaml
---
name: tool-foundation-sprint-<move>
description: <one-liner with Use-when triggers>
classification: tool
version: "0.1.0"
updated: 2026-05-13
license: Apache-2.0
metadata:
  tool: foundation-sprint
  move: <move>
  category: <see categories.md>
  frameworks: [foundation-sprint, click, character-note-and-vote]
  timebox_minutes: <integer>
  roles: [...]
  prerequisites: [...]    # array of tool-foundation-sprint-* skill names; optional
  inputs: [...]
  outputs: [...]
  author: product-on-purpose
---
```

#### Task 7: Author tool-foundation-sprint-readiness

**Files:**
- Create: `skills/tool-foundation-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

- [ ] **Step 1: Author SKILL.md**

Use spec section "1. foundation-sprint-readiness". Frontmatter: `metadata.tool: foundation-sprint`, `metadata.move: readiness`, no prerequisites (entry point).

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict (Go / Conditional Go / Wait), diagnosis section, recommended preconditions, attendee list, prep activities, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf book-catalog sprint context: PM evaluating whether a Foundation Sprint is the right tool to clarify their consumer book-tracking product direction.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-foundation-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/tool-foundation-sprint-readiness/
git commit -m "feat(foundation-sprint-skills): add tool-foundation-sprint-readiness"
```

#### Task 8: Author tool-foundation-sprint-brief

Follow Task 7 pattern. Spec section "2. foundation-sprint-brief". `metadata.move: brief`. Prerequisites: `tool-foundation-sprint-readiness`.

- [ ] Steps 1-5: same lifecycle.

#### Task 9: Author tool-foundation-sprint-basics

Follow Task 7 pattern. Spec section "3. foundation-sprint-basics". `metadata.move: basics`. Prerequisites: `tool-foundation-sprint-brief`. Bundled artifact has 4 sub-parts.

- [ ] Steps 1-5: same lifecycle.

#### Task 10: Author tool-foundation-sprint-differentiation

Follow Task 7 pattern. Spec section "4. foundation-sprint-differentiation". `metadata.move: differentiation`. Prerequisites: `tool-foundation-sprint-basics`. Includes 2x2 chart and mini-manifesto.

- [ ] Steps 1-5: same lifecycle.

#### Task 11: Author tool-foundation-sprint-approach-options

Follow Task 7 pattern. Spec section "5. foundation-sprint-approach-options". `metadata.move: approach-options`. Prerequisites: `tool-foundation-sprint-differentiation`.

- [ ] Steps 1-5: same lifecycle.

#### Task 12: Author tool-foundation-sprint-magic-lenses

Follow Task 7 pattern. Spec section "6. foundation-sprint-magic-lenses". `metadata.move: magic-lenses`. Prerequisites: `tool-foundation-sprint-approach-options`.

- [ ] Steps 1-5: same lifecycle.

#### Task 13: Author tool-foundation-sprint-founding-hypothesis

Follow Task 7 pattern. Spec section "7. foundation-sprint-founding-hypothesis". `metadata.move: founding-hypothesis`. Prerequisites: `tool-foundation-sprint-magic-lenses`. Final Foundation Sprint output - produces the Founding Hypothesis that becomes the input to a Design Sprint via the narrative handoff in `_workflows/foundation-to-design.md` (no separate bridge skill).

- [ ] Steps 1-5: same lifecycle.

### Phase 4: Workflow and commands

#### Task 14: Author foundation-sprint workflow

**Files:**
- Create: `_workflows/foundation-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use the workflow block from `foundation-sprint-design-spec.md` section "Workflow: foundation-sprint". Document: prep phase (readiness, brief), Day 1 morning (basics), Day 1 afternoon (differentiation), Day 2 morning (approach-options), Day 2 afternoon (magic-lenses), Day 2 closing (founding-hypothesis). Skill names are `tool-foundation-sprint-{move}` throughout.

Handoff section at the end: describes the transition to a Design Sprint narratively (the Founding Hypothesis becomes the strategic context for a Design Sprint Map and Target Monday). Note that there is NO separate bridge skill; the full FS-to-DS arc lives in `_workflows/foundation-to-design.md` (authored by the Design Sprint plan).

- [ ] **Step 2: Commit**

```bash
git add _workflows/foundation-sprint.md
git commit -m "feat(foundation-sprint-skills): add foundation-sprint workflow"
```

#### Task 15: Author slash commands

**Files:**
- Create: 8 files in `commands/` (one per skill)

- [ ] **Step 1: Author each command file**

Pattern from existing `commands/*.md` files. Command body invokes the underlying skill. 8 new commands: 7 Foundation Sprint skills + tool-note-and-vote.

- [ ] **Step 2: Validate commands**

Run: `bash scripts/validate-commands.sh`
Expected: all 8 new commands resolve.

- [ ] **Step 3: Commit**

```bash
git add commands/tool-foundation-sprint-readiness.md commands/tool-foundation-sprint-brief.md commands/tool-foundation-sprint-basics.md commands/tool-foundation-sprint-differentiation.md commands/tool-foundation-sprint-approach-options.md commands/tool-foundation-sprint-magic-lenses.md commands/tool-foundation-sprint-founding-hypothesis.md commands/tool-note-and-vote.md
git commit -m "feat(foundation-sprint-skills): add 8 slash commands for Foundation Sprint track + tool-note-and-vote"
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

One per skill: readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis, plus a tool-note-and-vote sample from a key decision moment (e.g., choosing the target customer).

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-foundation-sprint-skills-family.sh`
Expected: PASS for all Brainshelf samples.

- [ ] **Step 4: Commit**

```bash
git add library/skill-output-samples/tool-foundation-sprint-*/sample_*_brainshelf_book-catalog.md library/skill-output-samples/tool-note-and-vote/sample_tool-note-and-vote_brainshelf_book-catalog.md
git commit -m "docs(foundation-sprint-skills): brainshelf Foundation Sprint samples (8)"
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

Cover: what a Foundation Sprint is and when to run one, how to use the 7 `tool-foundation-sprint-*` skills in sequence, the role of `tool-note-and-vote` (used at multiple decision moments), common pitfalls, and the handoff to a Design Sprint. The handoff section is the load-bearing replacement for the dropped bridge skill: it describes how the Founding Hypothesis output becomes the strategic context Day 1 of a Design Sprint needs (long-term goal framing, sprint questions, scorecard targets). Length target: 1,400-2,000 words (longer than originally estimated because the handoff section is now part of this guide rather than a separate bridge artifact). Include 1-2 mermaid diagrams (2-day flow, output-to-next-skill handoff chain, transition to Design Sprint).

- [ ] **Step 2: Commit**

```bash
git add docs/guides/using-foundation-sprint.md
git commit -m "docs(sprint-skills): user guide for Foundation Sprint"
```

#### Task 19a: Refresh docs/concepts/foundation-sprint.md for tool classification

**Files:**
- Modify: `docs/concepts/foundation-sprint.md` (already shipped in commit `5b9e590`; refresh skill-name references and classification language)
- Modify: `docs/concepts/index.md` (Foundation Sprint row already present; verify accuracy)

Note: This file already exists on `origin/main`. The refresh updates skill-name references in the mermaid skill family map (from `foundation-sprint-*` to `tool-foundation-sprint-*`), removes the now-dropped bridge skill node (`sprint-foundation-to-design`), updates the standalone tool name (`sprint-note-and-vote` to `tool-note-and-vote`), and amends the "How Foundation Sprint Connects to pm-skills" prose to reference `classification: tool` (not `classification: sprint`) plus the new family contract path.

**Rationale:** The `docs/concepts/` section holds conceptual explainers (Agent Skill Anatomy, Triple Diamond Delivery Process). Foundation Sprint warrants the same treatment so users encountering the skill family understand the underlying framework before invoking any individual skill. Distinct from the `docs/guides/using-foundation-sprint.md` operational guide: the concepts doc explains the framework's reasoning, history, and design decisions; the guide explains how to use the pm-skills implementation.

- [ ] **Step 1: Author concept doc**

Mirror the structure of `docs/concepts/triple-diamond-delivery-process.md`: executive summary; origins and canonical sources; conceptual model with one or more mermaid diagrams; two-day breakdown with per-block diagrams; core concepts (Founding Hypothesis, Mini Manifesto, Magic Lenses, Note-and-Vote); Foundation Sprint vs Design Sprint comparison; practical applications; variants (enterprise, startup, AI-era); common failure modes; how Foundation Sprint connects to pm-skills (skill family map); references and further reading.

Required source citations (in References section):
- Knapp, Jake; Zeratsky, John. *Click: How to Make What People Want* (Simon & Schuster, expected). https://www.theclickbook.com/
- Character Capital. "Foundation Sprint guide." https://www.character.vc/guide/foundation-sprint
- Knapp, Jake; Zeratsky, John. "Introducing the Foundation Sprint." Lenny's Newsletter. https://www.lennysnewsletter.com/p/introducing-the-foundation-sprint
- Design Sprint Academy. "What is the Foundation Sprint?" https://www.designsprint.academy/blog/what-is-the-foundation-sprint
- Character Capital. "Note and Vote guide." https://www.character.vc/guide/note-and-vote

Source spec for content authoring: `docs/internal/efforts/foundation-sprint-skills/foundation-sprint-detailed-guide-pm-skills.md` (the synthesized guide with confidence-tagged claims).

- [ ] **Step 2: Add row to docs/concepts/index.md**

Append a row to the topic table for `[Foundation Sprint](foundation-sprint.md)` with a one-line description.

- [ ] **Step 3: Commit**

```bash
git add docs/concepts/foundation-sprint.md docs/concepts/index.md
git commit -m "docs(concepts): Foundation Sprint framework explainer"
```

#### Task 20: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add tool-classification section**

Add a new section (after existing pm-skills domain/foundation/utility sections) titled "Tool" or "Tools (sprint methodologies + standalone)". List `tool-note-and-vote` plus 7 Foundation Sprint skills with brief descriptions. The DS plan extends this section in its Task 16 to add the 7 DS skills.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md adds tool classification and Foundation Sprint family"
```

### Phase 7: Integration check

#### Task 21: Run full validation suite

- [ ] **Step 1: Run all validators**

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-commands.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-meeting-skills-family.sh
bash scripts/validate-foundation-sprint-skills-family.sh
bash scripts/validate-docs-frontmatter.sh
node scripts/check-frontmatter-yaml.mjs
```

Expected: all pass.

- [ ] **Step 2: Smoke-test a slash command**

Invoke `/tool-foundation-sprint-readiness` in Claude Code with a test context. Confirm it resolves and produces output matching the TEMPLATE structure.

- [ ] **Step 3: Hand off to Design Sprint plan**

Confirm all prerequisites for `design-sprint-integration-plan.md` are in place:
- `skills/tool-foundation-sprint-*` and `skills/tool-note-and-vote/` directories exist
- `scripts/validate-foundation-sprint-skills-family.sh` + `.ps1` exist and pass
- `scripts/lint-skills-frontmatter.sh|.ps1` accepts `classification: tool`
- `scripts/validate-agents-md.sh|.ps1` scans `skills/tool-*` directories
- `docs/reference/skill-families/foundation-sprint-skills-contract.md` exists
- `docs/reference/skill-families/_registry.yaml` has the foundation-sprint-skills entry
- `tool-note-and-vote` is shipped
- AGENTS.md tool section lists Foundation Sprint family + standalone tool

---

## Effort Estimate

| Phase | Tasks | Estimated sessions |
|---|---|---|
| Phase 1: Validator infrastructure | 5 | 1 session |
| Phase 2: Standalone tool skill | 1 | 0.5 session |
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
- File paths are directly in `skills/`, `commands/`, `library/`, `_workflows/`, `docs/` - no `sprint-skills/` plugin prefix
- Validator extension (Tasks 1-2) replaces the plugin plan's separate validator bootstrap
- Family contract goes into `docs/reference/skill-families/` alongside the meeting-skills contract
- Version bump is pm-skills v2.15.0, not a separate plugin tag

Differences from the original `classification: sprint` design (per 2026-05-13 architectural amendment):
- `classification: tool` replaces `classification: sprint` (Decision: provides a long-term home for any named external methodology)
- All skills get `tool-` prefix: `tool-foundation-sprint-*` and `tool-note-and-vote`
- Skill metadata adds `tool: foundation-sprint` and `move: <move>` fields nested under `metadata`; root `sprint_type` and `sprint_move` fields are dropped
- Family is `foundation-sprint-skills` (single methodology family), not `sprint-skills` (multi-methodology umbrella). The DS plan ships an analogous `design-sprint-skills` family. Note-and-vote is standalone (not a family member).
- Bridge skill (`sprint-foundation-to-design`) is DROPPED; the handoff is described in the workflow doc and user guide
- Validator name is `validate-foundation-sprint-skills-family` (one family validator per family, mirroring meeting-skills precedent)

Content coverage of `foundation-sprint-design-spec.md`:
- All 7 Foundation Sprint skill contracts covered by Tasks 7-13
- Standalone `tool-note-and-vote` covered by Task 6
- Workflow covered by Task 14
- Library samples (24: 8 skills x 3 threads) covered by Tasks 16-18
- User guide covered by Task 19 (handoff section absorbs the dropped bridge skill's intent)
- Open questions from the spec are ratified in the Ratified Decisions table above
