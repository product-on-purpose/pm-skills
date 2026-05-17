---
title: Workflows
description: Multi-skill workflows that chain PM skills together for common product management processes.
generated: true
source: scripts/generate-workflow-pages.py
---

Workflows chain multiple skills into end-to-end sequences. Each workflow defines a sequence of skills to run in order.

> **Need help choosing?** See the [Using Workflows Guide](../guides/using-workflows.md) for a decision tree, comparison matrix, and customization patterns.

| Workflow | Skills chained | Use when |
|----------|---------------|----------|
| [Feature Kickoff](feature-kickoff.md) | Problem Statement -> Hypothesis -> PRD -> User Stories | Starting a new feature from scratch |
| [Lean Startup](lean-startup.md) | Hypothesis -> Experiment Design -> Experiment Results -> Pivot Decision | Running a build-measure-learn cycle |
| [Triple Diamond](triple-diamond.md) | Full Discover -> Define -> Develop -> Deliver -> Measure -> Iterate flow | End-to-end product development |
| [Customer Discovery](customer-discovery.md) | Interview Synthesis -> JTBD Canvas -> Opportunity Tree -> Problem Statement | Transforming raw research into a validated problem |
| [Sprint Planning (agile)](sprint-planning.md) | Refinement Notes -> User Stories -> Edge Cases | Preparing agile sprint-ready stories from a backlog (distinct from Foundation Sprint and Design Sprint) |
| [Product Strategy](product-strategy.md) | Competitive Analysis -> Stakeholder Summary -> Opportunity Tree -> Solution Brief -> ADR | Framing a major strategic initiative |
| [Post Launch Learning](post-launch-learning.md) | Instrumentation Spec -> Dashboard Requirements -> Experiment Results -> Retrospective -> Lessons Log | Setting up measurement and capturing learnings after launch |
| [Stakeholder Alignment](stakeholder-alignment.md) | Stakeholder Summary -> Problem Statement -> Solution Brief -> Launch Checklist | Getting leadership buy-in before committing resources |
| [Technical Discovery](technical-discovery.md) | Spike Summary -> ADR -> Design Rationale | Evaluating technical feasibility and architecture decisions |
| [Foundation Sprint](foundation-sprint.md) | 7 `tool-foundation-sprint-*` skills (readiness -> brief -> basics -> differentiation -> approach-options -> magic-lenses -> founding-hypothesis) | 2-day strategic-alignment workshop producing a testable Founding Hypothesis |
| [Design Sprint](design-sprint.md) | 7 `tool-design-sprint-*` skills (readiness -> brief -> map-and-target -> sketch -> decide-and-storyboard -> prototype-plan -> test-and-score) | 5-day prototype-and-test workshop producing a Decider's build / iterate / pivot / stop call |
| [Foundation to Design](foundation-to-design.md) | Foundation Sprint family (7) -> narrative handoff conversation -> Design Sprint family (7) | End-to-end FS + DS arc (7-8 working days across 2-3 calendar weeks) |

## How to use a workflow

```
/workflow-feature-kickoff "Feature name or description"
```

Each workflow has a corresponding `/workflow-{name}` slash command. You can also reference the workflow file directly.

