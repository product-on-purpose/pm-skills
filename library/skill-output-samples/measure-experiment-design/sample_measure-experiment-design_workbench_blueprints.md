---
title: "Measure Experiment Design: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints required vs. optional sections A/B test."
artifact: experiment-design
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform: Blueprints required vs. optional sections A/B test
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench shipped Blueprints to a closed beta of 80 enterprise customers [fictional] with all template sections marked as optional. Early telemetry shows that 38% of Blueprints reach the approval stage with one or more required sections empty [fictional], causing approvers to send documents back for revision. This back-and-forth is the primary driver of multi-day approval cycles, and it disproportionately affects the most senior stakeholders in the workflow (department heads and compliance leads) who serve as approvers. The product team hypothesized in the Define phase that requiring section completion before a Blueprint can be submitted for approval would reduce median time to first approval. This experiment design document formalizes that test before the change ships to the remaining 420 enterprise customers [fictional].

**Source Notes:**

- LinkedIn Engineering's blog post "Experiment Rigor at LinkedIn" (public, engineering.linkedin.com) outlines the minimum detectable effect methodology and multi-week run duration norms used for enterprise B2B tools with irregular weekly usage patterns. The approach described in that post informed this experiment's duration calculation and the decision to use a 4-week window rather than stopping at statistical significance.
- The Atlassian Confluence template documentation (support.atlassian.com) describes Confluence's template system as entirely optional, with no section enforcement mechanism. This establishes the competitive baseline this experiment is designed to improve upon and confirms that section-level enforcement is a differentiated capability in the enterprise document governance space.

---

## Prompt

```
/experiment-design

Experiment: Required vs. optional Blueprint sections
Product: Workbench Blueprints (enterprise doc templates with approval gates)
Stage: Closed beta shipped; need to A/B test before expanding to full 500-customer base [fictional]

Context:
- Blueprints allows admins to create doc templates with sections
- Currently all sections are optional -- authors can submit incomplete Blueprints for approval
- Data: 38% of Blueprints reach approval with ≥1 empty section [fictional]; most rejections are for missing content, not quality
- Hypothesis from Define phase: making sections required (must complete before submitting) reduces time to first approval
- Baseline: median time to first approved Blueprint = 4.0 days [fictional]
- Goal: reduce to ≤2.5 days [fictional]

Treatment: Required sections -- authoring UI blocks submission if any required section is empty. Show inline validation message, highlight empty sections.
Control: Current optional sections -- authors can submit with empty sections as today.

Primary metric: median time-to-first-approval (days)
Secondary: approval rejection rate, Blueprint completion rate
Guardrail: don't tank author-side NPS or increase abandonment

Audience: Project leads at enterprise customers in closed beta (excludes IT admins and approvers).
Stakeholders: Head of Product, Data Science, Engineering Lead (Blueprints)
```

---

## Output

# Experiment Design: Blueprints Required vs. Optional Sections

## Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | Blueprints: Required Sections vs. Optional Sections |
| **Owner** | Technical PM, Blueprints |
| **Start Date** | 2026-03-09 (pending instrumentation sign-off) |
| **End Date** | 2026-04-05 (4 weeks) |
| **Status** | Draft |

## Hypothesis

**We believe** requiring all Blueprint sections to be completed before an author can submit for approval

**for** project leads creating new Blueprints in Workbench enterprise accounts

**will** reduce median time from Blueprint creation to first approval decision

**as measured by** median days from `blueprint_created` event to `approval_granted` event, compared between control and treatment

## Background

Blueprints closed beta telemetry shows that 38% of submitted Blueprints reach the approval queue with at least one empty section [fictional]. Approvers are the most senior stakeholders in the workflow, typically department heads and compliance leads, and the most common approval-stage action is rejection with a comment requesting missing content. This creates a back-and-forth cycle that inflates time-to-approval. In closed-beta interviews, several approvers described the cycle as "frustrating and avoidable," noting that they would prefer to review complete documents even if those documents take longer to arrive.

The Define-phase hypothesis proposed that blocking submission until all required sections are complete would compress this cycle by ensuring Blueprints arrive at the approval queue ready for a substantive decision, not a completeness check. The risk is that enforcement creates authoring friction, causing authors to abandon Blueprints rather than complete them, which would move the bottleneck upstream rather than eliminate it. This experiment is designed to detect both the benefit and the risk.

## Variants

### Control (A)

**Description:** Current Blueprints experience with all sections optional. Authors can submit a Blueprint for approval regardless of which sections have been completed.

**Details:**
- Submit button is always enabled regardless of section completion state.
- No inline validation prompts on empty sections.
- Approvers see the Blueprint as submitted, including empty sections.

**Screenshot/Mockup:** [Figma: Blueprints Authoring, Current State]

### Treatment (B)

**Description:** Required sections enforced. The Submit for Approval button is disabled until all sections marked as required by the Blueprint template admin are completed. Incomplete sections are highlighted inline with visual indicators.

**Details:**
- Submit button disabled and shows tooltip: "Complete all required sections to submit."
- Required sections with empty content display an amber border and inline label: "Required."
- Authors can save a Blueprint as Draft at any time regardless of completion state; enforcement applies only at submission.
- Template admins designate which sections are required at the template level; this designation applies to all Blueprints created from that template.
- The enforcement check is a non-whitespace content check, meaning a section must contain at least one non-whitespace character to be considered complete. More sophisticated quality checks (minimum word count, content analysis) are out of scope for this experiment.

**Screenshot/Mockup:** [Figma: Blueprints Authoring, Required Sections Treatment]

## Metrics

### Primary Metric

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|------------|------------------|---------------------------|
| Median time to first approval (days) | Days from `blueprint_created` to `approval_granted`; Blueprints that do not reach approval within 30 days are excluded as abandoned | 4.0 days [fictional] | 1.0 day (25% relative reduction to 3.0 days) [fictional] |

### Secondary Metrics

| Metric | Definition | Purpose |
|--------|------------|---------|
| Approval rejection rate | % of submitted Blueprints that receive a `approval_rejected` event before eventual approval | Confirm that treatment reduces incomplete-submission rejections |
| Blueprint completion rate | % of `blueprint_created` events that reach `blueprint_submitted` within 14 days | Detect whether required sections cause upstream abandonment |
| Approval cycle count | Median number of submit, reject, revise, and resubmit cycles per approved Blueprint | Leading indicator of approval queue efficiency |

### Guardrail Metrics

| Metric | Definition | Threshold |
|--------|------------|-----------|
| Author-side Blueprint abandonment | % of `blueprint_created` events with no subsequent events within 7 days | Must not increase by more than 10pp relative to control |
| Author NPS (in-product prompt, 30-day post-enrollment) | Author rating of the Blueprints creation experience (0-10) | Must not decrease by more than 1.0 point relative to control [fictional] |

## Sample Size & Duration

### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| **Baseline median time-to-approval** | 4.0 days [fictional] |
| **Minimum detectable effect (MDE)** | 25% relative reduction (1.0 day absolute, to 3.0 days) [fictional] |
| **Statistical significance (alpha)** | 0.05 (two-tailed) |
| **Statistical power (1-beta)** | 0.80 |
| **Test type** | Mann-Whitney U test on time-to-approval distribution |
| **Blueprints per variant** | 250 [fictional] |
| **Total Blueprints needed** | 500 [fictional] |

*Note: Time-to-approval is right-skewed (most Blueprints approved in 1-2 days; a long tail runs to 10+ days). The Mann-Whitney U test is used over a t-test because it does not assume normality and is more appropriate for this distribution. Sample size was estimated using a simulation-based power analysis against the observed closed-beta distribution. Leo M. ran 10,000 simulated experiments to confirm that 250 Blueprints per variant provides 80% power at the specified MDE.*

### Duration Estimate

| Parameter | Value |
|-----------|-------|
| **New Blueprints created per week in closed beta** | ~300 [fictional] |
| **Traffic allocation to experiment** | 100% of eligible new Blueprints (closed beta; no holdout needed) |
| **Blueprints per variant per week** | ~150 (50/50 split) [fictional] |
| **Weeks to reach sample size** | ~2 weeks for sample; 4 weeks recommended |
| **Recommended duration** | 4 weeks (ends 2026-04-05) |

*Four weeks is recommended despite reaching sample size in approximately 2 weeks. Enterprise tools exhibit strong weekly patterns (Monday kickoff docs, Friday approval delays, month-end compliance pushes); a 4-week window captures two full business cycles and reduces the risk of a week-specific anomaly driving the result. Additionally, the longer window provides a more robust read on guardrail metrics like abandonment, which may take days to manifest after initial exposure to the treatment.*

## Audience Targeting

### Inclusion Criteria

- Project leads and document authors in Workbench enterprise accounts in the closed beta cohort (80 accounts [fictional])
- New Blueprints created after experiment start date (2026-03-09); no retroactive assignment to Blueprints in progress
- Blueprints created from templates that have at least one section designated as required by the template admin

### Exclusion Criteria

- IT admins and workspace admins, whose Blueprint interactions are configuration actions rather than authoring sessions, representing a fundamentally different behavioral profile
- Blueprints created from templates with zero required sections (treatment has no effect surface; including them dilutes signal)
- Employees and internal Workbench test accounts
- Accounts that have not created a Blueprint in the prior 30 days (inactive accounts introduced in closed beta but not yet engaged)

### Traffic Allocation

| Variant | Allocation |
|---------|------------|
| Control (A), optional sections | 50% |
| Treatment (B), required sections enforced | 50% |

*Randomization is at the account level (all authors within an account see the same variant) to prevent contamination from authors comparing experiences in the same workspace. This means some authors within a single organization may discuss the feature, and if they all see the same variant, there is no risk of one author seeing enforcement while a colleague does not.*

## Success Criteria

### Win (Ship Treatment)

Primary metric (median time-to-approval) decreases by at least 1.0 day in treatment vs. control with p < 0.05, AND Blueprint abandonment guardrail does not exceed the +10pp threshold. If both conditions are met, proceed to roll out required sections to all 500 enterprise customers [fictional].

### Loss (Keep Control)

Primary metric does not improve in treatment (no statistically significant reduction), OR Blueprint abandonment increases by more than 10pp, OR author NPS decreases by more than 1.0 point. In this case, investigate whether required sections can be made less intrusive (for example, advisory warnings at submission rather than hard blocking) before re-testing.

### Inconclusive (More Data Needed)

Primary metric shows a positive direction but effect size is below MDE (< 1.0 day improvement) after 4 weeks. Extend the experiment by 2 additional weeks within the closed beta cohort, then make a final call. Do not ship the treatment based on an underpowered positive result, as the practical benefit may not justify the authoring friction.

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Required sections cause author abandonment rather than completion | Medium | High | Abandonment is a primary guardrail metric; monitored daily. If abandonment spikes in week 1, pause and investigate before continuing. |
| Template admins mark all sections as required, eliminating flexibility and inflating abandonment artificially | Low | Medium | Audit template configuration at experiment start; if > 20% of templates have all sections required [fictional], contact admins to recalibrate before launch. |
| Enterprise approval cycles have natural variance from quarterly planning cycles (e.g., March is high-activity) | Low | Medium | 4-week duration spans mid-quarter; not aligned with a month-end spike. Flag if an anomalous approval surge occurs during the run. |
| Account-level randomization creates imbalanced variants if the cohort is small | Low | Low | Verify variant balance at day 3: account count and Blueprint creation rate should be within 10% between variants. |

### Monitoring Plan

- Daily dashboard: Blueprint creation rate, submission rate, and abandonment rate by variant, reviewed each morning by Rachel V. (Technical PM).
- Week 1 check-in (2026-03-16): Confirm variant balance and early abandonment signal. If treatment abandonment exceeds control by 15pp at week 1, pause experiment and convene review with Karen L. (Engineering Lead).
- Approval latency trend: reviewed weekly; alert if median time-to-approval in treatment is trending worse than control at week 2.
- Rollback criteria: if treatment Blueprint abandonment rate exceeds 40% absolute [fictional] at any point during the run, disable required-section enforcement in treatment and revert all treatment accounts to control. This is a one-way door from an author trust perspective, as reverting and re-enabling enforcement later would confuse users who had adapted to either experience.

## Implementation Notes

- Feature flag name: `blueprints_required_sections_enforcement` (boolean; default `false`)
- Instrumentation: confirm `blueprint_submitted` and `approval_granted` events are firing with `blueprint_id` and `account_id` before experiment start; the `blueprint_created` event already fires per telemetry review.
- Required sections are designated at the template level by the template admin; the `is_required` boolean field on `blueprint_section` table is already in the schema (added in sprint 6) but the enforcement gate in the submission flow is gated behind the feature flag.
- Author-side NPS in-product prompt: schedule for day 30 of experiment enrollment; routed through the existing feedback widget with `experiment=blueprints_required_sections` tag for segmentation.
- Karen L.'s engineering team estimates 3 days to implement the submission-gate enforcement and inline validation, with an additional day for the feature flag integration and QA verification.

## References

- [Hypothesis: Blueprint Required Sections Reduce Time-to-Approval](#) (Define-phase hypothesis document)
- [Figma: Blueprints Authoring, Current State and Treatment Mockups](#)
- [Blueprints Closed Beta Telemetry Summary, Sprint 8](#) (baseline approval data and abandonment rates)
- LinkedIn Engineering: "Experiment Rigor at LinkedIn" (MDE methodology and enterprise experiment duration guidance)
