---
title: Sprint Skills Overview
description: Cross-family entry point introducing both the Foundation Sprint family and the Design Sprint family, the end-to-end FS-to-DS arc, the standalone tool-note-and-vote mechanic, and where each family fits in the product lifecycle. Read this first if you are arriving cold at the v2.15.0 sprint lane.
sidebar:
  order: 1
---

PM-Skills v2.15.0 introduced 15 tool skills under a new `classification: tool` taxonomy that implements two canonical Knapp / Zeratsky / Kowitz sprint methodologies plus one shared decision mechanic. This page is the front door to all of them: it explains what each piece is, when to reach for it, and how the pieces compose.

## What "tool" classification means

The four pm-skills classifications are:

| Classification | What it captures | Example |
|---|---|---|
| `phase` | Single artifact tied to a Triple Diamond phase | `define-problem-statement`, `deliver-prd` |
| `foundation` | Cross-cutting capability that supports many phases | `foundation-persona`, `foundation-okr-writer` |
| `utility` | Skill lifecycle tooling (build / validate / iterate) | `utility-pm-skill-builder` |
| `tool` (v2.15.0+) | Named external methodology composed of multiple skills working as a system | Foundation Sprint family, Design Sprint family |

A `tool` family has a fixed canonical sequence, named decision moments, an established external source (book / official guide), and skills that compose into a workflow recognizable as the methodology. The Foundation Sprint and Design Sprint families are the first inhabitants.

## The three pieces of v2.15.0

### Foundation Sprint family (7 skills)

A 2-day strategic-alignment workshop that produces a testable Founding Hypothesis. Source: Knapp + Zeratsky, *Click: How to Make What People Want* (sequel to *Sprint*).

| Skill | When | Output |
|---|---|---|
| `tool-foundation-sprint-readiness` | Pre-sprint | Go / Conditional Go / Wait verdict |
| `tool-foundation-sprint-brief` | Prep day | One-page scope contract |
| `tool-foundation-sprint-basics` | Day 1 AM | Target customer + important problem + team advantage + competitor map |
| `tool-foundation-sprint-differentiation` | Day 1 PM | Scored differentiators + 2x2 chart + decision principles + Mini Manifesto |
| `tool-foundation-sprint-approach-options` | Day 2 AM | 3-7 candidate approaches as one-page summaries |
| `tool-foundation-sprint-magic-lenses` | Day 2 PM | Top bet + backup with rationale |
| `tool-foundation-sprint-founding-hypothesis` | Day 2 end | Canonical hypothesis sentence + assumption scorecard + next test |

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../reference/skill-families/foundation-sprint-skills-contract.md). User guide: [`docs/guides/using-foundation-sprint.md`](../guides/using-foundation-sprint.md). Concept doc: [`docs/concepts/foundation-sprint.md`](foundation-sprint.md).

### Design Sprint family (7 skills)

A 5-day prototype-and-test workshop that produces a Decider's build / iterate / pivot / stop call grounded in 5 customer interviews. Source: Knapp + Zeratsky + Kowitz, *Sprint*.

| Skill | When | Output |
|---|---|---|
| `tool-design-sprint-readiness` | Pre-sprint | Go / Conditional Go / Wait verdict + customer recruiting plan |
| `tool-design-sprint-brief` | Prep week | Two-page scope contract |
| `tool-design-sprint-map-and-target` | Monday | Long-term goal + sprint questions + customer map + HMW board + target moment |
| `tool-design-sprint-sketch` | Tuesday | Lightning demos + 4 independent solution sketches per team member |
| `tool-design-sprint-decide-and-storyboard` | Wednesday | Heat map + Decider supervote + 5-15 panel storyboard |
| `tool-design-sprint-prototype-plan` | Thursday AM | 5-role plan + Five-Act interview script + trial-run checklist |
| `tool-design-sprint-test-and-score` | Friday | 5 interviews + scorecard + Decider's build / iterate / pivot / stop call |

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../reference/skill-families/design-sprint-skills-contract.md). User guide: [`docs/guides/using-design-sprint.md`](../guides/using-design-sprint.md). Concept doc: [`docs/concepts/design-sprint.md`](design-sprint.md).

### tool-note-and-vote (standalone)

A structured group-decision mechanic (silent ideation + heat-map voting + Decider supervote) used at decision moments across both sprint families and in any participatory decision context. NOT a family member; callable from any skill that needs structured group decision-making.

## How the pieces compose

The end-to-end arc chains both families with a narrative handoff. The handoff is documentation, not a skill: canonical Knapp / Zeratsky methodology has no formal handoff move and pm-skills does not invent one.

```mermaid
flowchart LR
    FSR[FS Readiness] --> FSB[FS Brief]
    FSB --> FS1[Day 1: Basics + Differentiation]
    FS1 --> FS2[Day 2: Approach Options + Magic Lenses + Founding Hypothesis]
    FS2 --> HO{Handoff conversation}
    HO --> DSR[DS Readiness + recruit customers]
    DSR --> DSB[DS Brief]
    DSB --> DS1[Monday: Map + Target]
    DS1 --> DS2[Tuesday: Sketch]
    DS2 --> DS3[Wednesday: Decide + Storyboard]
    DS3 --> DS4[Thursday: Prototype Plan]
    DS4 --> DS5[Friday: Test + Score]
    DS5 --> DEC{Decider's call}
    DEC -->|Build| PRD[deliver-prd]
    DEC -->|Iterate| EXP[/measure-experiment-design]
    DEC -->|Pivot| PIV[/iterate-pivot-decision]
    DEC -->|Stop| LL[/iterate-lessons-log]
```

End-to-end workflow file: [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md). The 12-row slot-mapping table and 3-question go/no-go checkpoint in that workflow do the work a bridge skill would have done.

## When to reach for which

| Situation | Reach for |
|---|---|
| Strategy is unclear; team disagrees on direction; cannot yet write a falsifiable hypothesis | Foundation Sprint |
| Strategy is clear; you have a Founding Hypothesis; you need to know if customers will actually adopt the solution | Design Sprint |
| Strategy is clear AND you have time for 2-3 calendar weeks of end-to-end work | Foundation Sprint, then Design Sprint |
| Group decision moment in any workshop or meeting (HMW prioritization, target selection, sketch decision) | tool-note-and-vote |
| Agile sprint planning for a backlog | `/workflow-sprint-planning` (NOT a Foundation Sprint or Design Sprint; see naming-discipline note below) |

## Naming-discipline note

Three distinct things share the word "sprint":

| Term | What it is | Cadence |
|---|---|---|
| Foundation Sprint | 2-day strategic-alignment workshop | One-shot per strategy decision |
| Design Sprint | 5-day prototype-and-test workshop | One-shot per validation cycle |
| Agile sprint | Recurring iteration in Scrum / agile | 1-4 weeks, ongoing |

v2.15.0 codified naming discipline rules (Foundation Sprint family contract v0.3.0; Design Sprint family contract v0.2.0):

- Always include the full method name on first reference per document.
- Prefer qualified terms ("the Foundation Sprint week", "your Design Sprint output") over bare "sprint" thereafter.
- Reserve bare "sprint" for agile / Scrum iteration context only, with explicit "(agile)" or "(Scrum)" qualifier when both methodologies could be confused in surrounding context.

See [`docs/concepts/workshop-sprints-vs-agile-sprints.md`](workshop-sprints-vs-agile-sprints.md) for the full comparison matrix and end-to-end coexistence arc.

## Where to go next

- New to Foundation Sprint? [Using Foundation Sprint](../guides/using-foundation-sprint.md) (operational guide).
- New to Design Sprint? [Using Design Sprint](../guides/using-design-sprint.md) (operational guide).
- Planning a sprint? Start with the per-family FAQ and readiness skill: [`tool-foundation-sprint-readiness`](../skills/tool/tool-foundation-sprint-readiness.md) or [`tool-design-sprint-readiness`](../skills/tool/tool-design-sprint-readiness.md).
- Looking for end-to-end examples? [Foundation Sprint case studies](../guides/foundation-sprint-case-studies.md) and [Design Sprint case studies](../guides/design-sprint-case-studies.md) walk through the Brainshelf, Storevine, and Workbench narrative threads.
- Need a glossary? [Sprint methodology glossary](../reference/sprint-methodology-glossary.md) covers 40 FS-specific + DS-specific + shared terms.
- Comparing workshop methods? [Workshop method comparison](../reference/workshop-method-comparison.md) puts Foundation Sprint and Design Sprint alongside 6 other workshop formats.
