---
description: Run the end-to-end Foundation Sprint + Design Sprint workflow with narrative handoff
---

Run the end-to-end arc that pairs a Foundation Sprint (2 days of strategic alignment) with a Design Sprint (5 days of prototype validation) as one connected 7-8 day flow.

There is no bridge skill: canonical Knapp/Zeratsky methodology has no formal handoff move between the two sprints, and pm-skills does not invent one. The Founding Hypothesis from the Foundation Sprint is consumed directly as input context by the Design Sprint readiness and brief steps; the handoff is narrative only.

## Workflow Steps

### Step 1: Foundation Sprint (Days 1-2)

Run the full Foundation Sprint using the `/workflow-foundation-sprint` command (or follow `skills/tool-foundation-sprint-readiness/SKILL.md` through `skills/tool-foundation-sprint-founding-hypothesis/SKILL.md` in sequence). Output: a canonical Founding Hypothesis sentence plus an assumption scorecard.

### Step 2: Narrative handoff

Carry the Founding Hypothesis and its highest-risk assumptions forward as the framing context for the Design Sprint. No intermediate artifact is required: the riskiest assumption on the scorecard typically becomes the Design Sprint's challenge and sprint questions. See `docs/guides/using-foundation-sprint.md` and `docs/guides/using-design-sprint.md` for the handoff narrative.

### Step 3: Design Sprint (Days 3-8)

Run the full Design Sprint using the `/workflow-design-sprint` command (or follow `skills/tool-design-sprint-readiness/SKILL.md` through `skills/tool-design-sprint-test-and-score/SKILL.md` in sequence), seeding the readiness and brief steps with the Founding Hypothesis from Step 1. Output: the Decider's build / iterate / pivot / stop call grounded in five customer interviews.

## Output

A strategic frame (Founding Hypothesis) validated or invalidated end-to-end by a tested prototype and a Decider's call, in one connected arc.

Reference the end-to-end workflow at `_workflows/foundation-to-design.md` for the full narrative, including the handoff guidance.

Context from user: $ARGUMENTS
