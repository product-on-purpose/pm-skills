---
title: Recipes
description: End-to-end workflows for common PM tasks, showing which skills to chain and in what order.
tags:
  - Guides
  - Workflows
---

Recipes are concrete, step-by-step workflows that chain multiple skills together for common PM tasks. Each recipe shows the skills to use, the order to use them, and what each step produces.

## Pitch a Feature

Go from "I have an idea" to a stakeholder-ready package.

```mermaid
flowchart LR
    A["define-problem-statement"] --> B["define-hypothesis"]
    B --> C["develop-solution-brief"]
    C --> D["deliver-prd"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:define-problem-statement` | Clear articulation of the problem and why it matters now |
| 2 | `/pm-skills:define-hypothesis` | Testable assumption with success metrics |
| 3 | `/pm-skills:develop-solution-brief` | One-page overview for stakeholder alignment |
| 4 | `/pm-skills:deliver-prd` | Full requirements document for engineering handoff |

**When to use:** You've identified an opportunity and need to build the case before committing engineering resources.

---

## Run an Experiment

Design, instrument, execute, and decide.

```mermaid
flowchart LR
    A["define-hypothesis"] --> B["measure-experiment-design"]
    B --> C["measure-instrumentation-spec"]
    C --> D["measure-experiment-results"]
    D --> E["iterate-pivot-decision"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:define-hypothesis` | The assumption you're testing |
| 2 | `/pm-skills:measure-experiment-design` | A/B test design with variants, metrics, and sample size |
| 3 | `/pm-skills:measure-instrumentation-spec` | Event tracking spec for your analytics platform |
| 4 | `/pm-skills:measure-experiment-results` | Statistical analysis with segments and learnings |
| 5 | `/pm-skills:iterate-pivot-decision` | Ship, iterate, or kill . with evidence |

**When to use:** You want to validate an assumption with data before building the full feature.

---

## Launch a Feature

From acceptance criteria to release notes.

```mermaid
flowchart LR
    A["deliver-acceptance-criteria"] --> B["deliver-edge-cases"]
    B --> C["deliver-launch-checklist"]
    C --> D["deliver-release-notes"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:deliver-acceptance-criteria` | Given/When/Then criteria for QA |
| 2 | `/pm-skills:deliver-edge-cases` | Failure modes and error states |
| 3 | `/pm-skills:deliver-launch-checklist` | Pre-launch readiness across engineering, QA, marketing, legal |
| 4 | `/pm-skills:deliver-release-notes` | User-facing announcement |

**When to use:** The feature is built and you're preparing to ship.

---

## Discover and Frame a Problem

Go from "we should look into this" to a well-framed problem.

```mermaid
flowchart LR
    A["discover-competitive-analysis"] --> B["discover-interview-synthesis"]
    B --> C["discover-stakeholder-summary"]
    C --> D["define-problem-statement"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:discover-competitive-analysis` | Market landscape and positioning gaps |
| 2 | `/pm-skills:discover-interview-synthesis` | Themes and insights from user research |
| 3 | `/pm-skills:discover-stakeholder-summary` | Who cares, what they need, how to align them |
| 4 | `/pm-skills:define-problem-statement` | Clear problem with success criteria |

**When to use:** You're in early discovery and need to build understanding before defining solutions.

---

## Define the Opportunity Space

Map the problem to solutions to testable assumptions.

```mermaid
flowchart LR
    A["define-problem-statement"] --> B["define-jtbd-canvas"]
    B --> C["define-opportunity-tree"]
    C --> D["define-hypothesis"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:define-problem-statement` | The problem you're solving |
| 2 | `/pm-skills:define-jtbd-canvas` | Jobs customers are hiring your product to do |
| 3 | `/pm-skills:define-opportunity-tree` | Outcome-driven tree mapping opportunities to solutions |
| 4 | `/pm-skills:define-hypothesis` | Testable assumptions for the most promising solutions |

**When to use:** You have a validated problem and want to systematically explore the solution space.

---

## Sprint Retrospective and Refinement

Close the loop on a sprint and plan the next one.

```mermaid
flowchart LR
    A["iterate-retrospective"] --> B["iterate-lessons-log"]
    B --> C["iterate-refinement-notes"]
```

| Step | Skill | What you get |
|------|-------|-------------|
| 1 | `/pm-skills:iterate-retrospective` | What went well, what to improve, action items |
| 2 | `/pm-skills:iterate-lessons-log` | Structured lesson with root cause and recommendations |
| 3 | `/pm-skills:iterate-refinement-notes` | Next sprint's stories, decisions, and blockers |

**When to use:** End of a sprint or milestone . reflect, learn, and plan.

---

## Full Lifecycle (Kitchen Sink)

Use the `/workflow-feature-kickoff` workflow to start, then extend through all 6 phases.

```
/workflow-feature-kickoff "Feature name"
```

This runs: Problem Statement → Hypothesis → PRD → User Stories.

Then extend with:

- **Develop:** `/pm-skills:develop-solution-brief`, `/pm-skills:develop-adr`, `/pm-skills:develop-design-rationale`
- **Deliver:** `/pm-skills:deliver-acceptance-criteria`, `/pm-skills:deliver-edge-cases`, `/pm-skills:deliver-launch-checklist`, `/pm-skills:deliver-release-notes`
- **Measure:** `/pm-skills:measure-experiment-design`, `/pm-skills:measure-instrumentation-spec`, `/pm-skills:measure-dashboard-requirements`, `/pm-skills:measure-experiment-results`
- **Iterate:** `/pm-skills:iterate-retrospective`, `/pm-skills:iterate-lessons-log`, `/pm-skills:iterate-refinement-notes`, `/pm-skills:iterate-pivot-decision`

Or see a complete lifecycle in action: [Follow the Product showcase](../showcase/).
