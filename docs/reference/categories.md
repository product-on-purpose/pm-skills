# Category Taxonomy

Categories represent **framework-agnostic PM activities**. They enable skills to be mapped to any methodology (Triple Diamond, Lean Startup, Design Thinking, etc.) through a common vocabulary.

## Table of Contents

- [Overview](#overview)
- [Categories](#categories)
  - [research](#research)
  - [problem-framing](#problem-framing)
  - [ideation](#ideation)
  - [specification](#specification)
  - [validation](#validation)
  - [reflection](#reflection)
  - [coordination](#coordination)
- [Framework Mapping](#framework-mapping)
- [Category Selection Guide](#category-selection-guide)
- [Category Distribution](#category-distribution)

---

## Overview

### Why Categories?

Product management methodologies use different terminology for similar activities:
- Triple Diamond calls it "Discover" → we call it `research`
- Lean Startup calls it "Customer Development" → we call it `research`
- Design Thinking calls it "Empathize" → we call it `research`

Categories provide a **neutral abstraction layer** that lets skills work across methodologies without being tied to any specific framework's vocabulary.

### How Categories Work

```
┌─────────────────────────────────────────────────────────────┐
│                     PM Methodologies                        │
├─────────────────┬─────────────────┬─────────────────────────┤
│ Triple Diamond  │  Lean Startup   │    Design Thinking      │
│    Discover     │  Customer Dev   │      Empathize          │
└────────┬────────┴────────┬────────┴────────────┬────────────┘
         │                 │                     │
         └─────────────────┼─────────────────────┘
                           ▼
                 ┌─────────────────┐
                 │    research     │  ← Category (neutral)
                 └─────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌─────────────────┬─────────────────┬─────────────────┐
│ interview-      │ competitive-    │ stakeholder-    │
│ synthesis       │ analysis        │ summary         │
└─────────────────┴─────────────────┴─────────────────┘
                        Skills
```

### Category Properties

Each category has:
- **Name**: Lowercase identifier used in frontmatter (`metadata.category`)
- **Description**: What type of PM work this represents
- **Activities**: Common tasks that fall under this category
- **Skills**: The pm-skills that belong to this category

---

## Categories

### research

> Understanding users, market, and context

**Purpose:** Gather insights about users, competitors, and stakeholders to inform product decisions. Research activities help teams understand the landscape before making strategic choices.

**Activities:**
- User interviews and synthesis
- Market and competitive analysis
- Stakeholder mapping and alignment
- Customer discovery conversations
- Usability research

**Skills (3):**

| Skill | Description |
|-------|-------------|
| `interview-synthesis` | Synthesizes user research interviews into actionable insights, patterns, and recommendations |
| `competitive-analysis` | Creates structured competitive analysis comparing features, positioning, and strategy |
| `stakeholder-summary` | Documents stakeholder needs, concerns, and influence for a project or initiative |

**When to use research skills:**
- Starting a new initiative and need to understand the problem space
- Evaluating market opportunities or competitive threats
- Onboarding to a new product area
- Building alignment with stakeholders before major decisions

**Common workflow:**
```
stakeholder-summary → interview-synthesis → competitive-analysis
     (who)               (users)              (market)
```

---

### problem-framing

> Defining what problem to solve

**Purpose:** Articulate the problem clearly before jumping to solutions. Problem-framing activities ensure teams invest in solving the right problem and can communicate why it matters.

**Activities:**
- Problem definition and scoping
- Opportunity identification and prioritization
- Jobs-to-be-done analysis
- Success criteria definition
- Constraint mapping

**Skills (3):**

| Skill | Description |
|-------|-------------|
| `problem-statement` | Creates a clear problem framing document with user impact, business context, and success criteria |
| `opportunity-tree` | Creates an opportunity solution tree mapping desired outcomes to opportunities and potential solutions |
| `jtbd-canvas` | Creates a Jobs to be Done canvas capturing the functional, emotional, and social dimensions of a customer job |

**When to use problem-framing skills:**
- Starting a new initiative to establish shared understanding
- Realigning a drifted project back to its original intent
- Communicating priorities to leadership
- Deciding between multiple potential opportunities

**Common workflow:**
```
jtbd-canvas → problem-statement → opportunity-tree
  (why)          (what)            (where)
```

---

### ideation

> Generating and evaluating solutions

**Purpose:** Explore potential solutions and form testable hypotheses. Ideation bridges problem understanding and detailed specification by proposing approaches without over-committing.

**Activities:**
- Solution brainstorming and exploration
- Hypothesis formation
- Concept development
- Trade-off analysis
- Approach pitching

**Skills (2):**

| Skill | Description |
|-------|-------------|
| `hypothesis` | Defines a testable hypothesis with clear success metrics and validation approach |
| `solution-brief` | Creates a concise one-page solution overview that communicates the proposed approach, key decisions, and trade-offs |

**When to use ideation skills:**
- After problem framing, before committing to a solution
- When multiple valid approaches exist
- Pitching a solution approach to stakeholders
- Designing experiments to test assumptions

**Common workflow:**
```
hypothesis → solution-brief
  (if/then)    (how)
```

---

### specification

> Detailing what to build

**Purpose:** Translate solution concepts into detailed requirements that engineering can implement. Specification activities define the "what" clearly enough that teams can estimate, build, and test.

**Activities:**
- Requirements documentation
- User story writing
- Technical decision records
- Edge case analysis
- Design rationale documentation

**Skills (5):**

| Skill | Description |
|-------|-------------|
| `prd` | Creates a comprehensive Product Requirements Document for engineering handoff |
| `user-stories` | Generates user stories with clear acceptance criteria from product requirements |
| `edge-cases` | Documents edge cases, error states, boundary conditions, and recovery paths |
| `adr` | Creates an Architecture Decision Record documenting significant technical decisions |
| `design-rationale` | Documents the reasoning behind design decisions including alternatives considered |

**When to use specification skills:**
- After solution alignment, before engineering begins
- When breaking down features for sprint planning
- Making significant technical or design decisions
- Ensuring comprehensive test coverage

**Common workflow:**
```
prd → user-stories → edge-cases
       ↓
      adr (if technical decisions needed)
       ↓
   design-rationale (if UX decisions needed)
```

---

### validation

> Testing assumptions with data

**Purpose:** Design and instrument experiments to validate hypotheses with real data. Validation activities ensure teams measure what matters and can draw valid conclusions.

**Activities:**
- Experiment design (A/B tests)
- Analytics instrumentation
- Dashboard specification
- Measurement planning
- Sample size calculation

**Skills (3):**

| Skill | Description |
|-------|-------------|
| `experiment-design` | Designs an A/B test or experiment with clear hypothesis, variants, success metrics, and duration |
| `instrumentation-spec` | Specifies event tracking and analytics instrumentation requirements for a feature |
| `dashboard-requirements` | Specifies requirements for an analytics dashboard including metrics, visualizations, and data sources |

**When to use validation skills:**
- Before launching an A/B test
- When implementing new features that need tracking
- Requesting dashboards from data teams
- Planning measurement for success criteria

**Common workflow:**
```
instrumentation-spec → experiment-design → dashboard-requirements
    (track)              (test)              (monitor)
```

---

### reflection

> Learning and improving

**Purpose:** Capture learnings from experiments, projects, and incidents to improve future work. Reflection activities turn experience into organizational knowledge.

**Activities:**
- Experiment result analysis
- Retrospectives
- Lessons learned documentation
- Pivot/persevere decisions
- Knowledge capture

**Skills (4):**

| Skill | Description |
|-------|-------------|
| `experiment-results` | Documents the results of a completed experiment with statistical analysis and recommendations |
| `retrospective` | Facilitates and documents a team retrospective capturing what went well, what to improve, and action items |
| `lessons-log` | Creates a structured lessons learned entry for organizational memory |
| `pivot-decision` | Documents a strategic pivot or persevere decision with evidence, analysis, and rationale |

**When to use reflection skills:**
- After experiments conclude (success or failure)
- At the end of sprints, projects, or milestones
- Following incidents or significant learnings
- When evaluating whether to change strategic direction

**Common workflow:**
```
experiment-results → pivot-decision (if needed)
        ↓
  retrospective → lessons-log
```

---

### coordination

> Aligning teams and stakeholders

**Purpose:** Coordinate across teams and communicate with stakeholders. Coordination activities happen throughout the product lifecycle to keep everyone aligned.

**Activities:**
- Launch preparation and checklists
- Release communication
- Spike/exploration synthesis
- Backlog refinement documentation
- Cross-functional alignment

**Skills (4):**

| Skill | Description |
|-------|-------------|
| `launch-checklist` | Creates a comprehensive pre-launch checklist covering all functions |
| `release-notes` | Creates user-facing release notes that communicate changes in benefit-focused language |
| `spike-summary` | Documents the results of a time-boxed technical or design exploration |
| `refinement-notes` | Documents backlog refinement session outcomes including stories refined and decisions made |

**When to use coordination skills:**
- Before significant launches (1-2 weeks out)
- After completing technical explorations
- During or after refinement sessions
- When shipping updates to communicate changes

**Common workflow:**
```
spike-summary → refinement-notes → launch-checklist → release-notes
  (explore)       (plan)            (prepare)         (communicate)
```

---

## Framework Mapping

### Quick Reference

| Category | Triple Diamond | Lean Startup | Design Thinking |
|----------|---------------|--------------|-----------------|
| research | Discover | Customer Development | Empathize |
| problem-framing | Define | — | Define |
| ideation | Define/Develop | Build (hypothesis) | Ideate |
| specification | Deliver | Build | Prototype |
| validation | Measure | Measure | Test |
| reflection | Iterate | Learn | — |
| coordination | All phases | All phases | All phases |

### Detailed Mapping

#### Triple Diamond (6 phases)

```
Discover    → research
Define      → problem-framing, ideation
Develop     → ideation, specification
Deliver     → specification, coordination
Measure     → validation
Iterate     → reflection
```

#### Lean Startup (Build-Measure-Learn)

```
Customer Development → research
Build               → problem-framing, ideation, specification
Measure             → validation
Learn               → reflection
```

#### Design Thinking (5 stages)

```
Empathize   → research
Define      → problem-framing
Ideate      → ideation
Prototype   → specification
Test        → validation
```

---

## Category Selection Guide

Use this decision tree to select the right category:

```
What type of PM work are you doing?
│
├─ Understanding the landscape?
│  └─ research
│
├─ Clarifying the problem?
│  └─ problem-framing
│
├─ Exploring solutions?
│  └─ ideation
│
├─ Defining requirements?
│  └─ specification
│
├─ Testing with data?
│  └─ validation
│
├─ Learning from outcomes?
│  └─ reflection
│
└─ Coordinating people?
   └─ coordination
```

---

## Category Distribution

Summary of skills across categories:

| Category | Skill Count | Skills |
|----------|-------------|--------|
| research | 3 | interview-synthesis, competitive-analysis, stakeholder-summary |
| problem-framing | 3 | problem-statement, opportunity-tree, jtbd-canvas |
| ideation | 2 | hypothesis, solution-brief |
| specification | 5 | prd, user-stories, edge-cases, adr, design-rationale |
| validation | 3 | experiment-design, instrumentation-spec, dashboard-requirements |
| reflection | 4 | experiment-results, retrospective, lessons-log, pivot-decision |
| coordination | 4 | launch-checklist, release-notes, spike-summary, refinement-notes |
| **Total** | **24** | |

---

## See Also

- [Frontmatter Schema](./frontmatter-schema.yaml) — How to specify categories in skill metadata
- [Triple Diamond Framework](../frameworks/triple-diamond-delivery-process.md) — The primary framework organizing pm-skills
