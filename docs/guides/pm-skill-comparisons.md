---
title: Skill Comparisons
description: Side-by-side comparisons for commonly confused PM skill pairs.
tags:
  - Guides
---

# Skill Comparisons

Some skills produce similar-sounding artifacts. These comparisons help you pick the right one.

## PRD vs Solution Brief

The two most common "spec" documents . but they serve different purposes at different times.

| | PRD | Solution Brief |
|---|---|---|
| **When** | After solution alignment, before engineering starts | During ideation, before committing to an approach |
| **Audience** | Engineering, QA, stakeholders who need to approve scope | Leadership, cross-functional team, anyone evaluating options |
| **Depth** | Comprehensive . requirements, scope, technical considerations, timeline | High-level . problem, approach, key metrics, risks |
| **Length** | 3-8 pages | 1 page |
| **Includes** | Functional requirements, scope boundaries, dependencies, milestones | Value proposition, key features, success metrics, trade-offs |
| **Produces** | An engineering-ready specification | A stakeholder alignment document |

**Rule of thumb:** If engineering could start building from it, it's a PRD. If you're still deciding *what* to build, it's a solution brief.

**Flow:** `/solution-brief` → align → `/prd` → build

---

## Hypothesis vs Problem Statement

Both frame the "why" . but one is testable and one is descriptive.

| | Hypothesis | Problem Statement |
|---|---|---|
| **Purpose** | State a testable assumption with pass/fail criteria | Articulate the problem and why it matters |
| **Structure** | "If [action], then [outcome], measured by [metric]" | "Users face [problem] because [cause], resulting in [impact]" |
| **Testable?** | Yes . has explicit success metrics and a validation plan | No . it describes, it doesn't predict |
| **When** | After understanding the problem, before designing the solution | During discovery, before committing to a direction |
| **Output** | Specific metric targets, experiment design, pass/fail criteria | Problem scope, affected users, business impact, success criteria |

**Rule of thumb:** A problem statement says "this is broken." A hypothesis says "I bet this specific fix will move this specific number."

**Flow:** `/problem-statement` → `/hypothesis` → `/experiment-design`

---

## Competitive Analysis vs Stakeholder Summary

Both involve mapping external entities . but different ones.

| | Competitive Analysis | Stakeholder Summary |
|---|---|---|
| **Maps** | Competitors and their products | People and teams who influence your product |
| **Purpose** | Understand market positioning and feature gaps | Understand who cares, what they need, and how to align them |
| **Output** | Feature matrix, positioning map, gap analysis | Influence/interest map, profiles, communication plan |
| **When** | Early discovery . before defining the problem | Before or during any cross-functional initiative |
| **Audience** | Product team, marketing, leadership | PM, project lead, anyone managing stakeholder alignment |

**Rule of thumb:** Competitive analysis looks *outward* (market). Stakeholder summary looks *inward* (organization).

---

## Edge Cases vs Acceptance Criteria

Both define expected behavior . but at different levels.

| | Edge Cases | Acceptance Criteria |
|---|---|---|
| **Focus** | What could go wrong . failure modes, boundary conditions | What "done" looks like . expected behavior for the happy path and key scenarios |
| **Format** | Categorized list of scenarios with expected system behavior | Given/When/Then structured scenarios |
| **Covers** | Error states, empty states, concurrent access, data limits | Functional requirements, user-facing behavior |
| **When** | After the PRD, during engineering planning | During story writing, before sprint planning |
| **Consumer** | Engineering (defensive coding), QA (test cases) | QA (verification), engineering (implementation target) |

**Rule of thumb:** Acceptance criteria say "the feature works when..." Edge cases say "the feature doesn't break when..."

**Flow:** `/user-stories` → `/acceptance-criteria` → `/edge-cases`

---

## Experiment Design vs Instrumentation Spec

Both involve measurement . but at different levels.

| | Experiment Design | Instrumentation Spec |
|---|---|---|
| **Purpose** | Design the test . what to measure, how to split, when to call it | Define the tracking . what events to fire, what properties to capture |
| **Level** | Strategic . hypothesis, variants, sample size, success criteria | Tactical . event names, schemas, triggers, PII handling |
| **Output** | Experiment plan ready for review | Implementation spec ready for engineering |
| **When** | Before building the experiment | Before implementing tracking code |
| **Consumer** | PM, data science, stakeholders | Engineering, analytics platform |

**Rule of thumb:** Experiment design answers "what are we testing?" Instrumentation spec answers "how do we capture the data?"

**Flow:** `/experiment-design` → `/instrumentation-spec` → build → `/experiment-results`

---

## Lessons Log vs Retrospective

Both capture learnings . but different scopes.

| | Lessons Log | Retrospective |
|---|---|---|
| **Scope** | One specific lesson or incident | An entire sprint, project, or milestone |
| **Depth** | Deep . root cause, impact, recommendations, applicability | Broad . wins, improvements, action items across the whole period |
| **When** | After a specific event worth documenting | At the end of a sprint or project |
| **Output** | Structured lesson with root cause and follow-up | Team discussion summary with prioritized actions |
| **Audience** | Future teams facing similar situations | The current team |

**Rule of thumb:** A retrospective asks "how did the sprint go?" A lessons log asks "what did we learn from *this specific thing*?"
