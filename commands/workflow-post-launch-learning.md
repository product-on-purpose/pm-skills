---
description: Run the Post-Launch Learning workflow (instrumentation -> dashboard -> results -> retro -> lessons)
---

Run the Post-Launch Learning workflow to set up measurement, evaluate results, and capture learnings after a feature ships.

This workflow uses multiple skills in sequence. For each step, read the skill instructions and follow them to create the artifact.

## Workflow Steps

### Step 1: Instrumentation Spec

Use the `measure-instrumentation-spec` skill from `skills/measure-instrumentation-spec/SKILL.md`.

Define event tracking and analytics instrumentation requirements for the shipped feature.

### Step 2: Dashboard Requirements

Use the `measure-dashboard-requirements` skill from `skills/measure-dashboard-requirements/SKILL.md`.

Specify the analytics dashboard including metrics, visualizations, and data sources.

### Step 3: Experiment Results

Use the `measure-experiment-results` skill from `skills/measure-experiment-results/SKILL.md`.

Document the results of the feature launch with analysis and recommendations.

### Step 4: Retrospective

Use the `iterate-retrospective` skill from `skills/iterate-retrospective/SKILL.md`.

Facilitate a team retrospective covering the full feature lifecycle.

### Step 5: Lessons Log

Use the `iterate-lessons-log` skill from `skills/iterate-lessons-log/SKILL.md`.

Distill retrospective findings into durable lessons for organizational memory.

## Output

Create all five artifacts in sequence. Steps 1-2 should happen at or before launch; Steps 3-5 after data accumulates.

Reference the Post-Launch Learning workflow at `_workflows/post-launch-learning.md` for additional guidance.

Context from user: $ARGUMENTS
