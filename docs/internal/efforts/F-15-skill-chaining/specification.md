# Specification: utility-skill-chain

## Overview

A lightweight utility skill (with a primary `/chain` command interface) that lets users chain skills together at runtime without creating a formal workflow file. Think shell pipes: the output of skill N becomes context for skill N+1, with validation, step markers, and a promotion path to formal workflows. Complements the workflow system the way ad-hoc commands complement shell scripts.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | utility-skill-chain |
| Classification | utility |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers |

## Design Principles

### 1. Lowest Friction Wins
The primary interface is a one-liner: `/chain "skill-a, skill-b, skill-c" "context"`. No file authoring, no metadata, no cross-cutting updates. If it takes more than 10 seconds to set up, it's too complex.

### 2. Validate Before Running
Fail fast: before executing any skill, validate that all skill names in the chain exist. A typo in skill 3 of 5 shouldn't waste the output of skills 1 and 2.

### 3. Implicit Context, Explicit Boundaries
Context passes between skills via the conversation's natural memory. The chain tool adds explicit step markers (`--- Step 2: hypothesis ---`) so the output is navigable, but doesn't force explicit handoff schemas for v1.

### 4. Promotion, Not Duplication
If a user runs the same chain 3+ times, the skill suggests promoting it to a formal workflow via F-14 (workflow-builder). Chains are ephemeral by design; workflows are persistent.

### 5. Linear Only for v1
No branching ("if X then skill-A else skill-B") and no parallelism ("run A and B, then C"). These are workflow-territory features. v1 supports sequential chains only.

---

## Relationship to Workflows

| Dimension | Workflows | Skill Chains |
|-----------|-----------|-------------|
| **Persistence** | Permanent file in `_workflows/` | Ephemeral (conversation only) |
| **Structure** | Rich (metadata, tips, checklists) | Minimal (skill list + context) |
| **Audience** | Team/org (reusable) | Individual (one-off / exploratory) |
| **Handoffs** | Authored guidance per step | Implicit via conversation context |
| **Discovery** | AGENTS.md, commands, docs | None (ad-hoc invocation) |
| **Promotion** | N/A (already a workflow) | "Promote to workflow" via F-14 |

---

## File Architecture

```
skills/utility-skill-chain/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── chain.md
```

### SKILL.md (~100-130 lines)

**Frontmatter:**
```yaml
name: utility-skill-chain
description: >-
  Chains multiple PM skills together at runtime without creating a
  formal workflow file. Validates skill names, executes sequentially
  with step markers, passes context implicitly, and suggests promotion
  to a formal workflow for repeated chains.
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
   - When you want to run 2+ skills in sequence on the same topic
   - For exploratory analysis where you don't know the ideal skill order yet
   - For one-off processes that don't justify a formal workflow file
   - When testing a potential workflow before committing to authoring it

2. **When NOT to Use** (~5 lines)
   - For reusable, team-wide processes (create a workflow via `utility-workflow-builder`)
   - When you need branching logic or conditional paths (author a workflow)
   - When you need persistent documentation of the process (author a workflow)
   - For a single skill invocation (just use the skill directly)

3. **Usage** (~15 lines)
   - **Primary syntax**: `/chain "skill-a, skill-b, skill-c" "initial context"`
   - **Alternative syntax**: `/chain skill-a skill-b skill-c --context "initial context"`
   - **Natural language**: "Chain problem-statement then hypothesis then prd for mobile checkout redesign"
   - Skill names use the command name (without phase prefix): `problem-statement`, `hypothesis`, `prd`
   - Initial context is passed to the first skill; subsequent skills receive conversation context

4. **Instructions** (~25 lines, numbered steps)
   1. **Parse the chain** - Extract the ordered list of skill names and the initial context.
   2. **Validate all skills** - Check every skill name against the skill library. If any name is unrecognized, fail immediately with suggestions for similar names.
   3. **Display the execution plan** - Show the user: "I will run: 1. problem-statement -> 2. hypothesis -> 3. prd. Context: [initial context]. Proceed?"
   4. **Execute sequentially** - For each skill:
      - Print a step marker: `--- Step N of M: {skill-name} ---`
      - Invoke the skill with accumulated context
      - Capture the output as context for the next step
   5. **Present combined output** - All step outputs with clear boundaries and a summary header.
   6. **Suggest promotion** - If this chain (or a similar one) has been run before, suggest: "You've run this chain before. Consider creating a workflow: `/workflow-builder`"

5. **Context Passing** (~10 lines)
   - **v1 approach**: Implicit - the AI's conversation context naturally carries output forward
   - Each step's output is visible to subsequent steps via the conversation
   - Step markers ensure the AI can distinguish between step outputs
   - No explicit schema or structured handoff in v1 (future enhancement)

6. **Output Contract** (~5 lines)
   - A combined document with:
     - Chain summary header (skills run, initial context)
     - Step-by-step outputs with markers
     - No separate artifact file - output lives in the conversation

7. **Quality Checklist** (~6 lines)
   - [ ] All skill names validated before execution
   - [ ] Execution plan shown to user before running
   - [ ] Each step has a clear marker in the output
   - [ ] Context flows logically from step to step
   - [ ] Promotion suggestion offered for repeated chains

---

### references/TEMPLATE.md (~30-40 lines)

A lightweight template for the chain output format (used internally by the skill, not filled by the user). Sections:

1. **Chain Summary** - Skills in order, initial context, total steps
2. **Step Output Block** (repeated per step) - Step marker, skill name, output content
3. **Chain Complete** - Summary of what was produced, promotion suggestion if applicable

---

### references/EXAMPLE.md (~150-200 lines)

A worked example: **PM exploring a new feature idea through a 3-skill chain**.

Demonstrates:

1. **Invocation**
   - `/chain "problem-statement, hypothesis, prd" "Mobile checkout abandonment is 68% - users cite too many steps"`
   - Shows the validation step (all 3 skills recognized)
   - Shows the execution plan confirmation

2. **Step-by-step execution**
   - **Step 1: problem-statement** - Produces a problem framing document focused on checkout friction
   - **Step 2: hypothesis** - Takes the problem statement as context, produces a testable hypothesis about reducing steps
   - **Step 3: prd** - Takes both prior outputs as context, produces a PRD for a streamlined checkout flow
   - Each step shows the marker, abbreviated output, and how context carried forward

3. **Promotion suggestion**
   - Shows the end-of-chain message: "This chain covers a common discovery-to-spec flow. Consider creating a workflow with `/workflow-builder` if you'll use it again."

4. **Validation failure example**
   - `/chain "problem-statement, hypothessis, prd" "..."` (typo in "hypothesis")
   - Shows the immediate failure with suggestion: "Did you mean 'hypothesis'?"

---

### commands/chain.md

```yaml
---
name: chain
description: Chain multiple PM skills together in sequence without creating a workflow file
skill: utility-skill-chain
---
```

Body: brief instruction showing the primary syntax and 2-3 common chain examples.

---

## Cross-Skill Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| F-14 (workflow-builder) | Promotion path | Repeated chains can be promoted to formal workflows |
| All skills in library | Runtime dependency | Chain can invoke any skill; validates names against library |

## Acceptance Criteria

1. **Given** a chain of 3 valid skill names, **when** `/chain` is invoked, **then** the execution plan is displayed for confirmation before any skill runs.

2. **Given** a chain containing an invalid skill name, **when** validation runs, **then** execution fails immediately with an error message and suggested corrections.

3. **Given** a chain of 3 skills, **when** execution completes, **then** each step's output is separated by a clear step marker and the combined output is navigable.

4. **Given** a user has run the same 3-skill chain in a prior conversation, **when** the chain completes, **then** the skill suggests promoting the chain to a formal workflow.

5. **Given** a chain with initial context provided, **when** step 1 executes, **then** the initial context is used as input, and step 2 receives step 1's output as accumulated context.
