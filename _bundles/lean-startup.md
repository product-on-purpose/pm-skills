# Lean Startup Workflow

> Build-Measure-Learn cycle for rapid validation

The Lean Startup methodology emphasizes rapid iteration through the Build-Measure-Learn feedback loop. This bundle maps PM-Skills to that cycle, enabling quick hypothesis validation and data-driven pivoting.

---

## Overview

The Lean Startup cycle focuses on minimizing time through the feedback loop:

```
              ┌─────────────┐
              │             │
              │    LEARN    │
              │             │
              └──────┬──────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       │
   ┌─────────────┐               │
   │             │               │
   │    BUILD    │───────────────┤
   │             │               │
   └─────────────┘               │
         │                       │
         ▼                       │
   ┌─────────────┐               │
   │             │               │
   │   MEASURE   │───────────────┘
   │             │
   └─────────────┘
```

---

## When to Use

Use the Lean Startup workflow when:

- **Testing new ideas or markets** — high uncertainty about product-market fit
- **Resource-constrained** — need to validate before major investment
- **Speed is critical** — competitive pressure requires rapid iteration
- **Building MVPs** — want to learn quickly with minimum viable product
- **Considering a pivot** — need data to inform strategic direction

---

## Phase 1: Build

**Goal:** Create the minimum needed to test your hypothesis

The Build phase isn't about building a complete product—it's about building just enough to learn.

### Core Skills

| Skill | Purpose |
|-------|---------|
| [`hypothesis`](../skills/define/hypothesis/SKILL.md) | Define what you believe and how to test it |
| [`solution-brief`](../skills/develop/solution-brief/SKILL.md) | Articulate the MVP approach |
| [`spike-summary`](../skills/develop/spike-summary/SKILL.md) | Time-boxed feasibility validation |

### Supporting Skills

| Skill | When to Use |
|-------|-------------|
| [`prd`](../skills/deliver/prd/SKILL.md) | Lightweight spec for MVP scope |
| [`user-stories`](../skills/deliver/user-stories/SKILL.md) | Break MVP into implementable stories |
| [`adr`](../skills/develop/adr/SKILL.md) | Document critical technical choices |

### Key Outputs

- Clear, testable hypothesis
- MVP solution brief
- Minimal feature set to test hypothesis
- Instrumentation plan (built into MVP)

### Build Phase Checklist

- [ ] Hypothesis is specific and falsifiable
- [ ] MVP scope is truly minimal
- [ ] Success metrics are defined before building
- [ ] Instrumentation is planned, not an afterthought
- [ ] Team can build this in days/weeks, not months

---

## Phase 2: Measure

**Goal:** Collect data to validate or invalidate your hypothesis

Measurement must be designed upfront, not retrofitted. The goal is to generate validated learning.

### Core Skills

| Skill | Purpose |
|-------|---------|
| [`experiment-design`](../skills/measure/experiment-design/SKILL.md) | Design rigorous experiments |
| [`instrumentation-spec`](../skills/measure/instrumentation-spec/SKILL.md) | Define what to track |
| [`dashboard-requirements`](../skills/measure/dashboard-requirements/SKILL.md) | Build visibility into metrics |

### Supporting Skills

| Skill | When to Use |
|-------|-------------|
| [`interview-synthesis`](../skills/discover/interview-synthesis/SKILL.md) | Qualitative validation alongside quantitative |
| [`edge-cases`](../skills/deliver/edge-cases/SKILL.md) | Ensure measurement isn't corrupted by edge cases |

### Key Outputs

- Experiment running with proper instrumentation
- Real-time or daily metrics visibility
- Qualitative feedback from users
- Statistical analysis of results

### Measure Phase Checklist

- [ ] Experiment has sufficient sample size
- [ ] Control and treatment groups are properly defined
- [ ] Guardrail metrics are monitored
- [ ] Collecting qualitative alongside quantitative data
- [ ] Clear success/failure criteria defined upfront

---

## Phase 3: Learn

**Goal:** Extract insights and make decisions

Learning is the unit of progress in Lean Startup. Every cycle should produce validated learning, whether positive or negative.

### Core Skills

| Skill | Purpose |
|-------|---------|
| [`experiment-results`](../skills/measure/experiment-results/SKILL.md) | Document what happened and why |
| [`pivot-decision`](../skills/iterate/pivot-decision/SKILL.md) | Framework for strategic pivots |
| [`lessons-log`](../skills/iterate/lessons-log/SKILL.md) | Capture learnings for future |

### Supporting Skills

| Skill | When to Use |
|-------|-------------|
| [`retrospective`](../skills/iterate/retrospective/SKILL.md) | Team reflection on process |
| [`problem-statement`](../skills/define/problem-statement/SKILL.md) | Reframe problem based on learnings |

### Key Outputs

- Documented experiment results
- Clear decision: pivot, persevere, or iterate
- Lessons captured for organizational memory
- Next hypothesis (if continuing)

### Learn Phase Checklist

- [ ] Results honestly documented (including failures)
- [ ] Insights extracted from data, not just reported
- [ ] Clear decision made and communicated
- [ ] Learnings are searchable for future teams
- [ ] Next iteration planned based on evidence

---

## Rapid Cycle: The Minimum Loop

For maximum speed, use this minimal skill set:

```
HYPOTHESIS → BUILD MVP → EXPERIMENT → RESULTS → DECISION
    │            │            │           │          │
    ▼            ▼            ▼           ▼          ▼
hypothesis   solution-   experiment- experiment- pivot-
   .md        brief.md    design.md   results.md  decision.md
```

### 5-Skill Lean Cycle

1. **[`hypothesis`](../skills/define/hypothesis/SKILL.md)** — State what you believe
2. **[`solution-brief`](../skills/develop/solution-brief/SKILL.md)** — Define MVP approach
3. **[`experiment-design`](../skills/measure/experiment-design/SKILL.md)** — Plan measurement
4. **[`experiment-results`](../skills/measure/experiment-results/SKILL.md)** — Document learnings
5. **[`pivot-decision`](../skills/iterate/pivot-decision/SKILL.md)** — Decide next step

This core loop can run in 1-2 week cycles.

---

## Pivot Types

When experiment results suggest a change is needed, consider these pivot types:

| Pivot Type | Description | PM-Skills Support |
|------------|-------------|-------------------|
| **Zoom-in** | Single feature becomes the product | problem-statement, prd |
| **Zoom-out** | Product becomes a feature | competitive-analysis, solution-brief |
| **Customer Segment** | Same product, different customer | stakeholder-summary, interview-synthesis |
| **Customer Need** | Same customer, different problem | jtbd-canvas, opportunity-tree |
| **Platform** | Application to platform or vice versa | adr, design-rationale |
| **Value Capture** | Change monetization model | hypothesis, experiment-design |
| **Engine of Growth** | Viral ↔ Paid ↔ Sticky | instrumentation-spec, dashboard-requirements |
| **Channel** | Change distribution | competitive-analysis |
| **Technology** | New technology, same solution | spike-summary, adr |

Use [`pivot-decision`](../skills/iterate/pivot-decision/SKILL.md) to document any pivot.

---

## Metrics That Matter

### Vanity vs. Actionable Metrics

**Avoid vanity metrics:**
- Total registered users
- Page views
- Downloads

**Focus on actionable metrics:**
- Activation rate (% who complete key action)
- Retention (% who return)
- Referral rate (% who invite others)
- Revenue per user

### Innovation Accounting

Track progress through:

1. **Baseline** — Where you are today
2. **Target** — Where you need to be
3. **Learning velocity** — How fast you're moving toward target

Use [`dashboard-requirements`](../skills/measure/dashboard-requirements/SKILL.md) to specify these metrics.

---

## Example Cycle

### Week 1: Build

**Hypothesis (from `hypothesis.md`):**
> We believe that adding a 3-step onboarding wizard for new users will increase Day-7 retention from 15% to 25% because users will understand the core value faster.

**Solution Brief (from `solution-brief.md`):**
- Build simple 3-step wizard
- Focus on top 3 features
- Track step completion

### Week 2: Measure

**Experiment (from `experiment-design.md`):**
- 50/50 split test
- 1,000 users per variant
- 7-day observation window
- Primary metric: Day-7 retention

**Instrumentation (from `instrumentation-spec.md`):**
- `onboarding_started`
- `onboarding_step_completed` (step_number)
- `onboarding_completed`
- `onboarding_abandoned`

### Week 3: Learn

**Results (from `experiment-results.md`):**
- Treatment: 22% Day-7 retention
- Control: 16% Day-7 retention
- +6pp lift (p < 0.05)
- Did not hit 25% target but significant improvement

**Decision (from `pivot-decision.md`):**
- Persevere with iteration
- Next hypothesis: Adding personalization to wizard will close remaining gap
- Run next experiment in Week 4

---

## Comparison with Other Workflows

| Aspect | Lean Startup | Triple Diamond | Feature Kickoff |
|--------|--------------|----------------|-----------------|
| **Speed** | Fast (1-2 week cycles) | Comprehensive (weeks-months) | Medium (days-weeks) |
| **Uncertainty** | High | Medium-High | Low |
| **Research depth** | Minimal upfront | Extensive | None |
| **Best for** | New products, pivots | Major initiatives | Known improvements |

---

## See Also

- [Triple Diamond Bundle](triple-diamond.md) — For comprehensive product development
- [Feature Kickoff Bundle](feature-kickoff.md) — For quick-start feature development

---

## References

- Eric Ries, *The Lean Startup* (2011)
- Steve Blank, *The Four Steps to the Epiphany* (2003)
- Ash Maurya, *Running Lean* (2012)

---

*Part of [PM-Skills](../README.md) — Open source Product Management skills for AI agents*
