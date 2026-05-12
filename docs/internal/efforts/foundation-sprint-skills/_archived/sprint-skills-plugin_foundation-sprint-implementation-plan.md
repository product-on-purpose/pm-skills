# Foundation Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 7 Foundation Sprint facilitation skills plus shared infrastructure (1 shared skill, family contract, validators, workflow, samples, docs) as `sprint-skills` plugin v0.1.0 in the product-on-purpose marketplace.

**Architecture:** New plugin (`sprint-skills`) lives as a peer subfolder inside the existing `pm-skills` monorepo. Each skill is a workshop-move bundled artifact following pm-skills foundation-skill conventions plus a new `classification: sprint` and prerequisites field. Skills are SKILL.md plus references/TEMPLATE.md plus references/EXAMPLE.md. Validators reuse existing `pm-skills/scripts/` infrastructure with sprint-specific additions. Library samples follow the 3-thread convention (brainshelf, storevine, workbench).

**Tech Stack:** Markdown with YAML frontmatter; Bash plus PowerShell validators following pm-skills sh/ps1 dual-script convention; Apache 2.0 license; no runtime dependencies.

**Cross-references:** This plan implements `foundation-sprint-design-spec.md` plus the shared architecture defined in `sprint-skills-architecture.md`. The Design Sprint track has its own implementation plan (`design-sprint-implementation-plan.md`); this plan ships shared infrastructure that Design Sprint reuses.

---

## Status

Draft for review. Not yet promoted to canonical release-plan structure. Promote to `docs/internal/release-plans/sprint-skills-v0.1.0/` only when maintainer commits to a shipping cycle.

## Prerequisites

- pm-skills v2.14.0 shipped and stable on origin/main (confirmed: shipped 2026-05-10)
- Design specs reviewed and approved (`sprint-skills-architecture.md`, `foundation-sprint-design-spec.md`)
- Decision: Foundation Sprint ships first (this plan), Design Sprint ships second (via `design-sprint-implementation-plan.md`). This plan owns all shared setup; Design Sprint plan assumes setup is in place.

## Scope Note

This plan covers the Foundation Sprint track plus shared infrastructure (plugin scaffolding, validators, family contract, one shared skill). It does NOT cover Design Sprint skills, the bridge skill, or the Design Sprint workflow. Those are in the sibling Design Sprint plan.

If Foundation Sprint and Design Sprint ship in the same release cycle, execute both plans in sequence (Foundation first because it owns setup), then run integration tasks from the Design Sprint plan only once.

## File Structure

### Files to create (62 new files)

**Plugin scaffolding (3 files)**
- `sprint-skills/.claude-plugin/plugin.json`
- `sprint-skills/README.md`
- `sprint-skills/docs/reference/sprint-skills-family-contract.md`

**Shared docs (2 files)**
- `sprint-skills/docs/reference/canonical-source-mapping.md`
- `sprint-skills/docs/guides/using-foundation-sprint.md`

**Validators (2 files)**
- `scripts/validate-sprint-skills-family.sh`
- `scripts/validate-sprint-skills-family.ps1`

**Shared skill (3 files)**
- `sprint-skills/skills/sprint-note-and-vote/SKILL.md`
- `sprint-skills/skills/sprint-note-and-vote/references/TEMPLATE.md`
- `sprint-skills/skills/sprint-note-and-vote/references/EXAMPLE.md`

**Foundation Sprint skills (21 files: 7 skills times 3 files each)**
- `sprint-skills/skills/foundation-sprint-readiness/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-brief/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-basics/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-differentiation/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-approach-options/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-magic-lenses/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`
- `sprint-skills/skills/foundation-sprint-founding-hypothesis/{SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md}`

**Workflow (1 file)**
- `sprint-skills/_workflows/foundation-sprint.md`

**Slash commands (8 files)**
- `sprint-skills/commands/foundation-sprint-readiness.md`
- `sprint-skills/commands/foundation-sprint-brief.md`
- `sprint-skills/commands/foundation-sprint-basics.md`
- `sprint-skills/commands/foundation-sprint-differentiation.md`
- `sprint-skills/commands/foundation-sprint-approach-options.md`
- `sprint-skills/commands/foundation-sprint-magic-lenses.md`
- `sprint-skills/commands/foundation-sprint-founding-hypothesis.md`
- `sprint-skills/commands/sprint-note-and-vote.md`

**Library samples (24 files: 8 skills times 3 threads each)**
- `sprint-skills/library/sprint-output-samples/brainshelf/foundation-sprint-{readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis}.md`
- `sprint-skills/library/sprint-output-samples/brainshelf/sprint-note-and-vote.md`
- (Same pattern for storevine and workbench)

### Files to modify (3 files)

- `.claude-plugin/marketplace.json`: rename marketplace from `pm-skills-marketplace` to `product-on-purpose`; add `sprint-skills` plugin entry
- `AGENTS.md`: add Foundation Sprint skill listings under a new sprint-skills section
- `CHANGELOG.md`: add v0.1.0 entry for sprint-skills

### Files referenced (no modification)

- `pm-skills/.claude-plugin/plugin.json`: read as schema reference for sprint-skills plugin.json
- `pm-skills/scripts/lint-skills-frontmatter.sh`: extended in a follow-up task to recognize `classification: sprint`
- `pm-skills/scripts/validate-agents-md.sh`: extended to recognize sprint-skills directory

---

## Tasks

### Phase 1: Plugin scaffolding and shared infrastructure

#### Task 1: Create sprint-skills folder skeleton

**Files:**
- Create: `sprint-skills/` directory tree (folders only, no content files yet)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p sprint-skills/.claude-plugin
mkdir -p sprint-skills/skills/sprint-note-and-vote/references
mkdir -p sprint-skills/skills/foundation-sprint-readiness/references
mkdir -p sprint-skills/skills/foundation-sprint-brief/references
mkdir -p sprint-skills/skills/foundation-sprint-basics/references
mkdir -p sprint-skills/skills/foundation-sprint-differentiation/references
mkdir -p sprint-skills/skills/foundation-sprint-approach-options/references
mkdir -p sprint-skills/skills/foundation-sprint-magic-lenses/references
mkdir -p sprint-skills/skills/foundation-sprint-founding-hypothesis/references
mkdir -p sprint-skills/_workflows
mkdir -p sprint-skills/commands
mkdir -p sprint-skills/library/sprint-output-samples/brainshelf
mkdir -p sprint-skills/library/sprint-output-samples/storevine
mkdir -p sprint-skills/library/sprint-output-samples/workbench
mkdir -p sprint-skills/docs/reference
mkdir -p sprint-skills/docs/guides
```

- [ ] **Step 2: Verify structure**

Run: `find sprint-skills -type d | sort`
Expected: 18 directories printed in tree order.

- [ ] **Step 3: Commit folder scaffold via empty .gitkeep files**

```bash
find sprint-skills -type d -empty -exec touch {}/.gitkeep \;
git add sprint-skills/
git commit -m "chore(sprint-skills): scaffold plugin folder structure"
```

#### Task 2: Author sprint-skills plugin.json

**Files:**
- Create: `sprint-skills/.claude-plugin/plugin.json`

- [ ] **Step 1: Read existing pm-skills plugin manifest as schema reference**

Run: `cat pm-skills/.claude-plugin/plugin.json` (via Read tool)
Note the field shape; mirror it.

- [ ] **Step 2: Author sprint-skills plugin.json**

Content:

```json
{
  "name": "sprint-skills",
  "version": "0.1.0",
  "description": "Foundation Sprint and Design Sprint facilitation skills for AI agents",
  "author": { "name": "product-on-purpose", "url": "https://github.com/product-on-purpose" },
  "license": "Apache-2.0"
}
```

- [ ] **Step 3: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('sprint-skills/.claude-plugin/plugin.json'))"`
Expected: no output (success).

- [ ] **Step 4: Commit**

```bash
git add sprint-skills/.claude-plugin/plugin.json
git commit -m "feat(sprint-skills): add plugin manifest v0.1.0"
```

#### Task 3: Update marketplace.json

**Files:**
- Modify: `.claude-plugin/marketplace.json` (rename marketplace + add sprint-skills plugin)

- [ ] **Step 1: Read current marketplace.json**

Confirm current state matches spec assumption: `name: "pm-skills-marketplace"`, single plugin entry for pm-skills.

- [ ] **Step 2: Apply changes**

Update the `name` field from `"pm-skills-marketplace"` to `"product-on-purpose"`. Update `description` accordingly. Add second plugin entry:

```json
{
  "name": "sprint-skills",
  "description": "16 facilitation skills for Foundation Sprints (2-day strategic alignment producing a Founding Hypothesis) and Design Sprints (5-day customer validation through prototype). Based on Jake Knapp and John Zeratsky's canonical methods.",
  "version": "0.1.0",
  "source": "./sprint-skills/",
  "homepage": "https://github.com/product-on-purpose/pm-skills/tree/main/sprint-skills",
  "license": "Apache-2.0",
  "keywords": ["sprint", "foundation-sprint", "design-sprint", "facilitation", "product-strategy", "agentskills-io"]
}
```

- [ ] **Step 3: Validate JSON parses**

Run: `node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'))"`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add .claude-plugin/marketplace.json
git commit -m "feat(marketplace): rename to product-on-purpose; add sprint-skills entry"
```

#### Task 4: Author sprint-skills README

**Files:**
- Create: `sprint-skills/README.md`

- [ ] **Step 1: Draft README**

Cover: what sprint-skills is, beta status, the two tracks (Foundation Sprint and Design Sprint), how to install, where canonical sources come from, license.

- [ ] **Step 2: Commit**

```bash
git add sprint-skills/README.md
git commit -m "docs(sprint-skills): add plugin README"
```

#### Task 5: Author family contract and canonical-source-mapping docs

**Files:**
- Create: `sprint-skills/docs/reference/sprint-skills-family-contract.md`
- Create: `sprint-skills/docs/reference/canonical-source-mapping.md`

- [ ] **Step 1: Author family contract**

Model on `pm-skills/docs/reference/skill-families/meeting-skills-contract.md`. Cover:
- Shared frontmatter fields (per `sprint-skills-architecture.md`)
- Naming convention
- File anatomy
- Output universality (TEMPLATE plus Decider Checkpoint)
- Behavior (zero-friction with Decider Checkpoint non-skippable)
- CI enforcement reference
- Versioning policy
- Library-sample requirements

- [ ] **Step 2: Author canonical-source-mapping**

Document the source attribution for each skill: which Character guide section, Click chapter (if known), Lenny's article. Provides traceability for method fidelity.

- [ ] **Step 3: Commit**

```bash
git add sprint-skills/docs/reference/
git commit -m "docs(sprint-skills): family contract + canonical-source-mapping"
```

### Phase 2: Validators

#### Task 6: Author sprint-skills family validator (Bash)

**Files:**
- Create: `scripts/validate-sprint-skills-family.sh`

- [ ] **Step 1: Read existing meeting-skills validator as reference**

Run: read `scripts/validate-meeting-skills-family.sh`.

- [ ] **Step 2: Author the new validator**

Checks to implement (WARN mode for v0.1.0):
- Every sprint-skills skill folder has SKILL.md plus references/TEMPLATE.md plus references/EXAMPLE.md
- SKILL.md frontmatter has required fields: name, description, classification, sprint_type, sprint_move, version, updated, license
- `sprint_type` value is one of: shared, foundation, design, bridge
- `prerequisites` field (if present) references skills that actually exist
- TEMPLATE.md ends with a "Decider Checkpoint" section (non-skippable enforcement)
- Naming convention: `{sprint_type}-sprint-{move}` for track skills, `sprint-{move}` for shared, `sprint-foundation-to-design` for bridge

- [ ] **Step 3: Test against the skill folders that exist (currently sprint-note-and-vote will exist by Task 8)**

For Phase 2 of execution, run the validator with an empty skill set to confirm it doesn't crash. Iterate as real skills land.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-sprint-skills-family.sh
git commit -m "feat(scripts): validate-sprint-skills-family Bash validator"
```

#### Task 7: Author sprint-skills family validator (PowerShell)

**Files:**
- Create: `scripts/validate-sprint-skills-family.ps1`

- [ ] **Step 1: Port the Bash validator to PowerShell**

Match check parity 1:1 with `validate-sprint-skills-family.sh`.

- [ ] **Step 2: Test on Windows shell**

Run: `pwsh -File scripts/validate-sprint-skills-family.ps1`
Expected: same WARN/PASS pattern as Bash version.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-sprint-skills-family.ps1
git commit -m "feat(scripts): validate-sprint-skills-family PowerShell parity"
```

#### Task 8: Extend existing pm-skills validators

**Files:**
- Modify: `scripts/lint-skills-frontmatter.sh` and `.ps1` (add `classification: sprint` recognition)
- Modify: `scripts/validate-agents-md.sh` and `.ps1` (recognize sprint-skills directory)

- [ ] **Step 1: Add `sprint` to allowed `classification` enum in lint-skills-frontmatter**

Patch the validator's enum check.

- [ ] **Step 2: Add `sprint-skills/skills/` to the scanned-directories list in validate-agents-md**

Patch the validator's directory walk.

- [ ] **Step 3: Run both updated validators against current state**

Expected: no regressions on existing pm-skills skills; sprint-skills skills not yet present so no new warnings.

- [ ] **Step 4: Commit**

```bash
git add scripts/lint-skills-frontmatter.sh scripts/lint-skills-frontmatter.ps1 scripts/validate-agents-md.sh scripts/validate-agents-md.ps1
git commit -m "chore(scripts): extend pm-skills validators for sprint-skills recognition"
```

### Phase 3: Shared skill (sprint-note-and-vote)

#### Task 9: Author sprint-note-and-vote skill

**Files:**
- Create: `sprint-skills/skills/sprint-note-and-vote/SKILL.md`
- Create: `sprint-skills/skills/sprint-note-and-vote/references/TEMPLATE.md`
- Create: `sprint-skills/skills/sprint-note-and-vote/references/EXAMPLE.md`

- [ ] **Step 1: Author SKILL.md per contract**

Frontmatter:

```yaml
---
name: sprint-note-and-vote
description: Universal decision mechanic used throughout Foundation Sprint and Design Sprint. Captures silent ideation, vote summaries, and decision records.
classification: sprint
sprint_type: shared
sprint_move: note-and-vote
version: "0.1.0"
updated: 2026-05-10
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

Body covers: when to use, when NOT to use, zero-friction execution flow, the bundled output structure, common pitfalls, Decider checkpoint protocol.

- [ ] **Step 2: Author references/TEMPLATE.md**

Skeleton with placeholders for: decision question, silent contributions list, vote results table, discussion notes, decision record with Decider sign-off, and the universal "Decider Checkpoint" section.

- [ ] **Step 3: Author references/EXAMPLE.md**

Use Brainshelf thread context: a sprint decision about which target customer to pick. Realistic 3-option vote, Decider supervote.

- [ ] **Step 4: Run validators**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS for sprint-note-and-vote.

- [ ] **Step 5: Commit**

```bash
git add sprint-skills/skills/sprint-note-and-vote/
git commit -m "feat(sprint-skills): add sprint-note-and-vote (shared decision mechanic)"
```

### Phase 4: Foundation Sprint skills

Each of Tasks 10 through 16 follows the same structure: SKILL.md + TEMPLATE.md + EXAMPLE.md, validator pass, commit. Content per skill is specified in `foundation-sprint-design-spec.md`.

#### Task 10: Author foundation-sprint-readiness

**Files:**
- Create: `sprint-skills/skills/foundation-sprint-readiness/SKILL.md`
- Create: `sprint-skills/skills/foundation-sprint-readiness/references/TEMPLATE.md`
- Create: `sprint-skills/skills/foundation-sprint-readiness/references/EXAMPLE.md`

- [ ] **Step 1: Author SKILL.md**

Use the contract from `foundation-sprint-design-spec.md` section "1. foundation-sprint-readiness". Frontmatter has `sprint_type: foundation`, `sprint_move: readiness`, no prerequisites.

- [ ] **Step 2: Author TEMPLATE.md**

Output skeleton: readiness verdict (Go/Conditional Go/Wait), diagnosis section, recommended preconditions, attendee list, prep activities, Decider Checkpoint.

- [ ] **Step 3: Author EXAMPLE.md**

Brainshelf thread context: PM considering Foundation Sprint to clarify the consumer book-tracking product. Realistic readiness assessment.

- [ ] **Step 4: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add sprint-skills/skills/foundation-sprint-readiness/
git commit -m "feat(sprint-skills): add foundation-sprint-readiness"
```

#### Task 11: Author foundation-sprint-brief

Follow Task 10 pattern. Contract from spec section "2. foundation-sprint-brief". Prerequisites: `foundation-sprint-readiness`.

- [ ] Step 1-5: same lifecycle (draft, validate, commit).

#### Task 12: Author foundation-sprint-basics

Follow Task 10 pattern. Contract from spec section "3. foundation-sprint-basics". Prerequisites: `foundation-sprint-brief`. Bundled artifact has 4 sub-parts.

- [ ] Step 1-5: same lifecycle.

#### Task 13: Author foundation-sprint-differentiation

Follow Task 10 pattern. Contract from spec section "4. foundation-sprint-differentiation". Prerequisites: `foundation-sprint-basics`. Bundled artifact includes 2x2 chart and mini-manifesto.

- [ ] Step 1-5: same lifecycle.

#### Task 14: Author foundation-sprint-approach-options

Follow Task 10 pattern. Contract from spec section "5. foundation-sprint-approach-options". Prerequisites: `foundation-sprint-differentiation`.

- [ ] Step 1-5: same lifecycle.

#### Task 15: Author foundation-sprint-magic-lenses

Follow Task 10 pattern. Contract from spec section "6. foundation-sprint-magic-lenses". Prerequisites: `foundation-sprint-approach-options`.

- [ ] Step 1-5: same lifecycle.

#### Task 16: Author foundation-sprint-founding-hypothesis

Follow Task 10 pattern. Contract from spec section "7. foundation-sprint-founding-hypothesis". Prerequisites: `foundation-sprint-magic-lenses`. This is the final Foundation Sprint output.

- [ ] Step 1-5: same lifecycle.

### Phase 5: Workflow and commands

#### Task 17: Author foundation-sprint workflow

**Files:**
- Create: `sprint-skills/_workflows/foundation-sprint.md`

- [ ] **Step 1: Author workflow doc**

Use the workflow block from `foundation-sprint-design-spec.md` section "Workflow: foundation-sprint" as the source. Document: prep phase (readiness, brief), Day 1 morning (basics), Day 1 afternoon (differentiation), Day 2 morning (approach-options), Day 2 afternoon (magic-lenses), Day 2 end (founding-hypothesis). Include next-workflow handoffs.

- [ ] **Step 2: Validate**

Run: `bash scripts/check-sprint-workflow-coherence.sh` (TODO: this validator may need to be authored as part of Task 6; if not present, skip the workflow-coherence check and rely on manual review).

- [ ] **Step 3: Commit**

```bash
git add sprint-skills/_workflows/foundation-sprint.md
git commit -m "feat(sprint-skills): add foundation-sprint workflow"
```

#### Task 18: Author slash commands for Foundation Sprint plus sprint-note-and-vote

**Files:**
- Create: 8 files in `sprint-skills/commands/` (one per skill)

- [ ] **Step 1: Author each command file**

Each command is ~10 lines: frontmatter + description + body that invokes the underlying skill. Pattern from existing pm-skills `commands/*.md` files.

- [ ] **Step 2: Validate command paths**

Run: `bash scripts/validate-commands.sh`
Expected: all 8 new commands resolve to existing skills.

- [ ] **Step 3: Commit**

```bash
git add sprint-skills/commands/
git commit -m "feat(sprint-skills): add 8 slash commands"
```

### Phase 6: Library samples

#### Task 19: Author Brainshelf thread samples (8 samples)

**Files:**
- Create: 8 sample files in `sprint-skills/library/sprint-output-samples/brainshelf/`

- [ ] **Step 1: Plan a coherent Brainshelf Foundation Sprint trace**

Imagine the Brainshelf team running an actual Foundation Sprint. Each sample is one workshop move's output. The trace must hang together (basics output feeds differentiation, etc.).

- [ ] **Step 2: Author 8 samples**

One per skill: readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis, plus a note-and-vote sample from one decision moment.

- [ ] **Step 3: Validate**

Run: `bash scripts/validate-sprint-skills-family.sh` (samples-coverage check)
Expected: PASS for Brainshelf thread.

- [ ] **Step 4: Commit**

```bash
git add sprint-skills/library/sprint-output-samples/brainshelf/
git commit -m "docs(sprint-skills): brainshelf thread Foundation Sprint samples (8)"
```

#### Task 20: Author Storevine thread samples (8 samples)

Follow Task 19 pattern. Storevine context: B2B retail analytics. Different target customer, different differentiation, different approach.

- [ ] Step 1-4: same lifecycle.

#### Task 21: Author Workbench thread samples (8 samples)

Follow Task 19 pattern. Workbench context: developer tooling for distributed-systems debugging.

- [ ] Step 1-4: same lifecycle.

### Phase 7: User-facing documentation

#### Task 22: Author using-foundation-sprint guide

**Files:**
- Create: `sprint-skills/docs/guides/using-foundation-sprint.md`

- [ ] **Step 1: Author guide**

Cover: when to run a Foundation Sprint, how to use the 7 skills in sequence, common pitfalls, hand-off to Design Sprint. Length target: 1,200-1,800 words. Include 1-2 mermaid diagrams for visual learners.

- [ ] **Step 2: Commit**

```bash
git add sprint-skills/docs/guides/using-foundation-sprint.md
git commit -m "docs(sprint-skills): user guide for Foundation Sprint"
```

#### Task 23: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add sprint-skills section**

After existing pm-skills section, add a new sprint-skills section listing the 7 Foundation Sprint skills plus sprint-note-and-vote, with brief descriptions.

- [ ] **Step 2: Validate AGENTS.md sync**

Run: `bash scripts/validate-agents-md.sh`
Expected: PASS (all sprint-skills/ skills appear in AGENTS.md).

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: AGENTS.md catalogs sprint-skills v0.1.0 Foundation Sprint skills"
```

### Phase 8: Integration and ship

#### Task 24: Update CHANGELOG.md

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Author v0.1.0 entry**

Header: `## sprint-skills v0.1.0 (2026-05-XX, beta)`. Body covers: new plugin shipped, 7 Foundation Sprint skills, 1 shared skill, 1 workflow, 8 commands, 24 library samples, family contract, validators. Note Design Sprint track ships separately.

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: CHANGELOG entry for sprint-skills v0.1.0 (Foundation Sprint track)"
```

#### Task 25: Run full validation suite

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

- [ ] **Step 2: Run a manual smoke test**

Invoke 1-2 sprint-skills slash commands in Claude Code to confirm they resolve and produce output matching TEMPLATE.

- [ ] **Step 3: Verify marketplace install**

Test a fresh install from the marketplace to confirm sprint-skills shows as installable alongside pm-skills.

#### Task 26: Tag and announce

- [ ] **Step 1: Final clean-state check**

Run: `git status`
Expected: clean working tree.

- [ ] **Step 2: Tag sprint-skills v0.1.0**

Note: tag convention is plugin-prefixed since the repo now contains two plugins. Recommended: `sprint-skills-v0.1.0`.

```bash
git tag sprint-skills-v0.1.0
git push origin sprint-skills-v0.1.0
```

- [ ] **Step 3: Author release notes on GitHub Releases**

Use the CHANGELOG entry as the basis.

- [ ] **Step 4: Update CONTEXT.md and MEMORY.md** to reflect the new shipped plugin and its beta status.

---

## Self-Review Notes

Coverage of `foundation-sprint-design-spec.md`:

- All 7 Foundation Sprint skill contracts are covered by Tasks 10-16.
- Cross-track sprint-note-and-vote covered by Task 9.
- Workflow covered by Task 17.
- Library samples plan (21 samples per spec, plus 3 for note-and-vote = 24 samples) covered by Tasks 19-21.
- Architecture decisions from `sprint-skills-architecture.md` covered by Tasks 1-5 (folder, manifests, marketplace, family contract, source mapping).
- Validators covered by Tasks 6-8.
- Open questions from the spec are NOT resolved by this plan; they remain open and surface to the maintainer during implementation.

Placeholder check:

- Task 17 has a TODO note about whether `check-sprint-workflow-coherence` validator is authored as part of Task 6. Acceptable because it's a flagged uncertainty, not a content placeholder.
- No "implement later" or "fill in details" steps.

Type/name consistency:

- All skill slugs match between Tasks 10-16, Phase 5 commands (Task 18), and Phase 6 samples (Tasks 19-21).
- Frontmatter field names match between Task 9 (note-and-vote) and Tasks 10-16 (Foundation Sprint skills).
- The validator script names (`validate-sprint-skills-family.sh` and `.ps1`) are used consistently in Tasks 6, 7, 25.

## Effort Estimate

| Phase | Tasks | Estimated days |
|---|---|---|
| Phase 1: Scaffolding | 5 | 1.5-2.0 |
| Phase 2: Validators | 3 | 1.5-2.0 |
| Phase 3: Shared skill | 1 | 0.5-1.0 |
| Phase 4: Foundation Sprint skills | 7 | 5.0-7.0 (0.7-1.0 days per skill) |
| Phase 5: Workflow + commands | 2 | 1.0-1.5 |
| Phase 6: Library samples | 3 | 3.0-4.0 (1.0-1.3 days per thread) |
| Phase 7: User docs | 2 | 1.5-2.0 |
| Phase 8: Integration | 3 | 1.0-1.5 |
| **Total** |  | **15.0-21.0 days** |

This is roughly half of the original Foundation Sprint track effort estimated in `foundation-sprint-design-spec.md` because that estimate covered the full plugin (Foundation plus Design plus shared plus bridge). This plan covers Foundation plus shared only; Design Sprint is a parallel plan.

## Execution Note

For implementation by an agent or contributor: use the superpowers:subagent-driven-development skill for fresh-subagent-per-task execution with review between tasks, OR use superpowers:executing-plans for inline batch execution with checkpoints. Either way, each task should end with a commit; the plan's frequent-commits discipline is intentional.
