---
title: Workflows
description: Multi-skill workflows that chain PM skills together for common product management processes.
---

# Workflows

Workflows chain multiple skills into end-to-end sequences. Each workflow defines a sequence of skills to run in order.

| Workflow | Skills chained | Use when |
|----------|---------------|----------|
| [Feature Kickoff](feature-kickoff.md) | Problem Statement → Hypothesis → PRD → User Stories | Starting a new feature from scratch |
| [Lean Startup](lean-startup.md) | Hypothesis → Experiment Design → Experiment Results → Pivot Decision | Running a build-measure-learn cycle |
| [Triple Diamond](triple-diamond.md) | Full Discover → Define → Develop → Deliver → Measure → Iterate flow | End-to-end product development |

## How to use a workflow

```
/workflow-feature-kickoff "Feature name or description"
```

The `/workflow-feature-kickoff` command runs the Feature Kickoff workflow. Other workflows are invoked by referencing their workflow file directly.
