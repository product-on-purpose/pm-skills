---
artifact: experiment-design
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# Experiment Design: [Experiment Name]

## Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | [Short descriptive name] |
| **Owner** | [Name, role] |
| **Start Date** | [Planned start date] |
| **End Date** | [Planned end date] |
| **Status** | Draft / Ready / Running / Completed |

## Hypothesis

<!-- Format: We believe [change] for [users] will [outcome] as measured by [metric] -->

**We believe** [proposed change]

**for** [target user segment]

**will** [expected outcome]

**as measured by** [primary metric]

## Background

<!-- Why are we running this experiment? What's the context? -->

[Context explaining why this experiment matters and what led to the hypothesis]

## Variants

### Control (A)

**Description:** [What users currently experience]

**Details:**
- [Specific element 1]
- [Specific element 2]

**Screenshot/Mockup:** [Link or embed]

### Treatment (B)

**Description:** [What users will experience in the new variant]

**Details:**
- [Specific change 1]
- [Specific change 2]

**Screenshot/Mockup:** [Link or embed]

## Metrics

### Primary Metric

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|------------|------------------|---------------------------|
| [Metric name] | [How it's calculated] | [Current value] | [Smallest change we want to detect] |

### Secondary Metrics

| Metric | Definition | Purpose |
|--------|------------|---------|
| [Metric 1] | [Definition] | [Why we're tracking this] |
| [Metric 2] | [Definition] | [Why we're tracking this] |

### Guardrail Metrics

<!-- Metrics that should NOT decrease -->

| Metric | Definition | Threshold |
|--------|------------|-----------|
| [Metric 1] | [Definition] | [Must not decrease by more than X%] |
| [Metric 2] | [Definition] | [Must not decrease by more than X%] |

## Sample Size & Duration

### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| **Baseline conversion rate** | [X%] |
| **Minimum detectable effect (MDE)** | [X% relative / X pp absolute] |
| **Statistical significance (alpha)** | [0.05 typical] |
| **Statistical power (1-beta)** | [0.80 typical] |
| **Users per variant** | [Calculated number] |
| **Total users needed** | [Sum across variants] |

### Duration Estimate

| Parameter | Value |
|-----------|-------|
| **Daily eligible traffic** | [X users/day] |
| **Traffic allocation** | [X% to experiment] |
| **Users per day in experiment** | [Calculated] |
| **Minimum duration** | [X days to reach sample size] |
| **Recommended duration** | [X days, accounting for weekly patterns] |

## Audience Targeting

### Inclusion Criteria

- [Criterion 1: e.g., "All logged-in users"]
- [Criterion 2: e.g., "Users in US and Canada"]
- [Criterion 3: e.g., "Users on mobile web"]

### Exclusion Criteria

- [Exclusion 1: e.g., "Employees and internal testers"]
- [Exclusion 2: e.g., "Users in active experiments that may conflict"]

### Traffic Allocation

| Variant | Allocation |
|---------|------------|
| Control (A) | [X%] |
| Treatment (B) | [X%] |

## Success Criteria

<!-- Define BEFORE the experiment starts what each outcome means -->

### Win (Ship Treatment)

[Conditions that constitute a clear win for the treatment, e.g., "Primary metric improves by >= MDE with p < 0.05, and no guardrail metrics regress beyond threshold"]

### Loss (Keep Control)

[Conditions that indicate treatment is worse, e.g., "Primary metric decreases with p < 0.05, OR any guardrail metric regresses beyond threshold"]

### Inconclusive (More Data Needed)

[Conditions that require further investigation, e.g., "Primary metric change is not statistically significant after full duration"]

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How we'll address it] |
| [Risk 2] | High/Med/Low | High/Med/Low | [How we'll address it] |

### Monitoring Plan

- [What we'll monitor during the experiment]
- [Alert thresholds that would trigger early review]
- [Rollback criteria]

## Implementation Notes

<!-- Technical details for engineering -->

- [Feature flag name/ID]
- [Instrumentation requirements]
- [Any technical considerations]

## References

- [Link to related hypothesis document]
- [Link to design mockups]
- [Link to previous related experiments]
