---
description: Run the Feature Kickoff workflow (problem → hypothesis → PRD → stories)
---

Run the Feature Kickoff workflow to go from problem to implementation-ready user stories.

This workflow uses multiple skills in sequence. For each step, read the skill instructions and follow them to create the artifact.

## Workflow Steps

### Step 1: Problem Statement

Use the `define-problem-statement` skill from `skills/define-problem-statement/SKILL.md`.

Create a clear problem framing document that defines:
- What problem are we solving?
- Who is affected?
- What does success look like?

### Step 2: Hypothesis

Use the `define-hypothesis` skill from `skills/define-hypothesis/SKILL.md`.

Based on the problem statement, create a testable hypothesis:
- What do we believe will solve the problem?
- How will we measure success?

### Step 3: PRD

Use the `deliver-prd` skill from `skills/deliver-prd/SKILL.md`.

Create a Product Requirements Document that specifies:
- What we're building
- What's in scope and out of scope
- Success metrics
- Technical considerations

### Step 4: User Stories

Use the `deliver-user-stories` skill from `skills/deliver-user-stories/SKILL.md`.

Break the PRD into implementable user stories:
- Each story follows INVEST criteria
- Include acceptance criteria in Given/When/Then format
- Ready for sprint planning

## Output

Create all four artifacts in sequence, ensuring each builds on the previous.

Reference the Feature Kickoff bundle at `_bundles/feature-kickoff.md` for additional guidance.

Context from user: $ARGUMENTS
