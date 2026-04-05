---
title: Workflow Bundles
description: Multi-skill workflows that chain PM skills together for common product management processes.
---

# Workflow Bundles

Bundles chain multiple skills into end-to-end workflows. Each bundle defines a sequence of skills to run in order.

| Bundle | Skills chained | Use when |
|--------|---------------|----------|
| [Feature Kickoff](feature-kickoff.md) | Problem Statement → Hypothesis → PRD → User Stories | Starting a new feature from scratch |
| [Lean Startup](lean-startup.md) | Hypothesis → Experiment Design → Experiment Results → Pivot Decision | Running a build-measure-learn cycle |
| [Triple Diamond](triple-diamond.md) | Full Discover → Define → Develop → Deliver → Measure → Iterate flow | End-to-end product development |

## How to use a bundle

```
/kickoff "Feature name or description"
```

The `/kickoff` command runs the Feature Kickoff bundle. Other bundles are invoked by referencing their bundle file directly.
