# Specification: utility-workflow-builder

## Overview

A utility skill that guides users through creating a new workflow file - the workflow equivalent of `utility-pm-skill-builder`. Produces a complete `_workflows/*.md` file with all required sections, a matching `commands/workflow-*.md` slash command, and a checklist of cross-cutting updates. Includes overlap analysis against existing workflows to prevent duplication.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | utility-workflow-builder |
| Classification | utility |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers, Contributors |

## Design Principles

### 1. Mirror pm-skill-builder's Proven Pattern
The skill follows the same four-step flow as `utility-pm-skill-builder`: understand, analyze overlap, design, generate. Users who have built a skill already know the rhythm.

### 2. Overlap Analysis Before Creation
With 9+ existing workflows, creating a duplicate is a real risk. The 70% overlap threshold (same as pm-skill-builder) gates workflow creation: if an existing workflow covers most of the need, the skill recommends customizing it instead.

### 3. Skill Sequencing Is the Core Value
The hardest part of workflow authoring is selecting the right skills, ordering them correctly, and defining handoff points. The skill makes this interactive - presenting candidates, suggesting order, and generating handoff guidance.

### 4. Draft for Review, Never Direct Write
Workflows are higher-stakes than individual skills (they chain multiple tools). All output goes to a staging area for human review before promotion to canonical locations.

### 5. Mermaid Flows Are Auto-Generated
A linear skill sequence trivially maps to a mermaid flowchart. The skill generates the context flow diagram automatically from the step list, eliminating manual diagramming.

---

## File Architecture

```
skills/utility-workflow-builder/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── workflow-builder.md
```

### SKILL.md (~140-180 lines)

**Frontmatter:**
```yaml
name: utility-workflow-builder
description: >-
  Guides users through creating a new workflow file for the pm-skills
  library. Runs overlap analysis against existing workflows, helps
  select and sequence skills, generates handoff guidance, and produces
  a complete draft workflow file with matching command and cross-cutting
  update checklist.
classification: utility
version: "1.0.0"
updated: YYYY-MM-DD
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
```

**Sections:**

1. **When to Use** (~7 lines)
   - When you want to create a new reusable workflow for the pm-skills library
   - When you have a recurring PM process that chains multiple skills
   - When a team wants to standardize a multi-step process
   - When promoting an ad-hoc skill chain (F-15) to a formal workflow

2. **When NOT to Use** (~5 lines)
   - For one-off or exploratory skill sequences (use `utility-skill-chain` / `/chain`)
   - For modifying an existing workflow (edit the workflow file directly)
   - For creating a new skill (use `utility-pm-skill-builder`)
   - For understanding existing workflows (see `docs/guides/workflows.md`)

3. **Instructions** (~60 lines, numbered steps)

   **Step 1: Understand the Workflow Idea** (~10 lines)
   - Accept input in either form:
     - **Process-first**: "What PM process does this workflow support? What's the end-to-end flow?"
     - **Skill-first**: "Which skills do you want to chain? In what order?"
   - Clarify: who runs this workflow? What triggers it? What artifact does the final step produce?
   - If the idea is vague, ask ONE follow-up to clarify the trigger and end artifact.

   **Step 2: Overlap Analysis** (~12 lines)
   - Check ALL existing workflows (scan `_workflows/` directory)
   - For each existing workflow, assess:
     - Does it cover the same trigger/use case?
     - Does it include similar skills in a similar order?
     - Could the user's need be met by the existing workflow + minor customization?
   - Present findings: name each overlapping workflow, explain coverage
   - **Kill gate**: if overlap is >70%, recommend customizing the existing workflow instead of creating a new one
   - If overlap is <70%, proceed and note the differentiation

   **Step 3: Skill Selection & Sequencing** (~15 lines)
   - Present the full skill library organized by phase
   - Help user select skills for each step
   - For each step, define:
     - Which skill to invoke
     - What input it needs (from prior step or from user)
     - What output it produces (for the next step)
     - Handoff guidance: what context to carry forward
   - Validate: does the sequence make logical sense? Are there gaps between steps?
   - Auto-generate mermaid context flow diagram from the step list

   **Step 4: Generate Files** (~15 lines)
   - Produce a Workflow Implementation Packet in the staging area:
     1. `_workflows/{name}.md` - Complete workflow file with: metadata table, When to Use, Steps (with handoff guidance per step), Context Flow Diagram (mermaid), Tips, Quality Checklist, See Also
     2. `commands/workflow-{name}.md` - Matching slash command
     3. Cross-cutting update checklist: AGENTS.md entry, mkdocs.yml nav, README workflow count, docs/workflows page

4. **Workflow File Convention Reference** (~15 lines)
   - Metadata table format (Name, Purpose, Skills Used, Estimated Time, Difficulty)
   - Required sections and their order
   - Naming convention: `_workflows/{kebab-case-name}.md`
   - Command naming: `commands/workflow-{name}.md`

5. **Current Workflow Library** (~10 lines)
   - Table of existing workflows for overlap analysis reference
   - Updated at skill creation time; builder should also scan the directory live

6. **Output Contract** (~5 lines)
   - A Workflow Implementation Packet (staged, not promoted)
   - Contains: draft workflow file, draft command file, cross-cutting checklist

7. **Quality Checklist** (~8 lines)
   - [ ] Overlap analysis completed and documented
   - [ ] Every step has a named skill, defined input, and defined output
   - [ ] Handoff guidance exists between each step pair
   - [ ] Mermaid context flow diagram renders correctly
   - [ ] Workflow file follows all section conventions
   - [ ] Command file references the correct workflow
   - [ ] Cross-cutting update checklist is complete

---

### references/TEMPLATE.md (~60-80 lines)

A template for the Workflow Implementation Packet. Sections:

1. **Workflow Idea** - Problem/process description, trigger, target audience, end artifact
2. **Overlap Analysis** - Table: existing workflow, overlap %, differentiation notes
3. **Skill Sequence** - Ordered table: step number, skill name, input, output, handoff guidance
4. **Context Flow Diagram** - Mermaid code block (placeholder for auto-generation)
5. **Draft Workflow File** - Complete `_workflows/*.md` content following conventions
6. **Draft Command File** - Complete `commands/workflow-*.md` content
7. **Cross-Cutting Checklist** - Checkbox list of files to update

---

### references/EXAMPLE.md (~200-280 lines)

A worked example: **Creating a "Quarterly Business Review" workflow**.

Demonstrates:

1. **Process-first input**
   - User describes the QBR process: review metrics, analyze experiment results, update roadmap, prepare stakeholder summary
   - Shows how the builder clarifies trigger and end artifact

2. **Overlap analysis**
   - Checks against existing workflows (Feature Kickoff, Sprint Closure, etc.)
   - Finds 30% overlap with Sprint Closure (both use experiment-results) - below threshold, proceed
   - Documents the differentiation

3. **Skill selection and sequencing**
   - Selects 4 skills: `measure-experiment-results` -> `discover-competitive-analysis` -> `iterate-pivot-decision` -> `discover-stakeholder-summary`
   - Defines handoff guidance for each transition
   - Shows the auto-generated mermaid diagram

4. **Generated files**
   - Complete draft workflow file with all sections
   - Complete draft command file
   - Cross-cutting checklist with 5 items

---

### commands/workflow-builder.md

```yaml
---
name: workflow-builder
description: Create a new reusable workflow file for the pm-skills library
skill: utility-workflow-builder
---
```

Body: brief instruction to invoke the skill with the user's workflow idea.

---

## Cross-Skill Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| utility-pm-skill-builder | Structural parallel | Same 4-step flow (understand, overlap, design, generate) |
| F-15 (skill-chaining) | Promotion path | Ad-hoc chains can be promoted to formal workflows via this builder |
| All existing workflows | Overlap analysis input | Builder scans `_workflows/` for overlap detection |

## Acceptance Criteria

1. **Given** a workflow idea that overlaps 80% with an existing workflow, **when** overlap analysis runs, **then** the skill recommends customizing the existing workflow and does not proceed to generation.

2. **Given** a valid 4-skill sequence, **when** the builder generates the workflow file, **then** the output contains all required sections (metadata, steps, mermaid diagram, quality checklist, see also) following established conventions.

3. **Given** a completed skill sequence, **when** the mermaid context flow diagram is auto-generated, **then** it renders correctly and accurately represents the step order and handoff points.

4. **Given** a generated Workflow Implementation Packet, **when** the cross-cutting checklist is reviewed, **then** it lists every file that needs updating (AGENTS.md, mkdocs.yml, README, docs page).
