---
title: "Measure Dashboard Requirements: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface experiment dashboard requirements for Amplitude."
artifact: dashboard-requirements
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface experiment dashboard requirements for Amplitude
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before the A/B test began, Priya M. asked Chloe B. to build the Resurface experiment dashboard in Amplitude so the team could monitor the experiment in real time and have the results analysis ready on test completion day. The dashboard needed to serve two audiences: Priya and the product team (daily monitoring during the test) and Marco S. (weekly executive check-ins requiring a single-screen summary). Chloe documented the requirements to ensure the dashboard was built once, correctly, rather than assembled ad hoc during the test window.

**Source Notes:**

- Stephen Few, "Information Dashboard Design" (perceptualedge.com) . the dashboard design principles applied in the layout specification; Few's guidance on minimizing chart junk, using small multiples for comparison, and placing the most important metric in the top-left position informed the visualization specifications.
- Amplitude, "Dashboard Best Practices" (amplitude.com/blog/analytics-dashboards) . the Amplitude-specific guidance on chart types, cohort definitions, and filter configuration used to translate the requirements into implementable specs.
- Edward Tufte, "The Visual Display of Quantitative Information" (edwardtufte.com) . the data-ink ratio principle applied to the chart specifications; Tufte's emphasis on maximizing the data-to-ink ratio influenced the decision to use line charts over bar charts for time-series metrics and to avoid decorative chart elements.

---

## Prompt

```
/dashboard-requirements

resurface experiment dashboard for amplitude. need it ready before
the a/b test starts (mar 9).

two audiences:
1. product team (priya, chloe, alex, jordan) . daily monitoring
   during the 4-week test
2. marco (ceo) . weekly exec check-in, needs a single-screen summary

questions the dashboard should answer:
- is the treatment group returning more than control?
- are users clicking items in the digest?
- is the unsubscribe rate within the guardrail?
- what's the opt-in funnel conversion rate?
- are there segment differences (library size, cadence)?

charts i want:
1. 7-day return rate trend (treatment vs control, weekly)
2. email CTR trend (daily)
3. opt-in funnel (card viewed → opted in)
4. unsubscribe rate trend (weekly, with guardrail line)
5. segment breakdown table (library size, cadence)

filters: date range, experiment variant, library size segment.
```

---

## Output

# Dashboard Requirements: Resurface Experiment Dashboard

## Overview

**Dashboard Name:** Resurface Experiment (RSF-EXP-001)
**Requestor:** Priya M., Product Manager
**Date:** February 28, 2026
**Priority:** High
**Target Delivery:** March 7, 2026 (2 days before A/B test start)

---

## Purpose and Questions

### Primary Questions This Dashboard Answers

1. Is the treatment group's 7-day return rate meaningfully higher than control, and is the difference growing or shrinking over time?
2. Are opted-in users engaging with the digest content (clicking items), and is engagement stable or decaying over the test window?
3. Is the email unsubscribe rate within the 2%-per-week guardrail, or is it trending toward the threshold?
4. What is the opt-in funnel conversion rate (card viewed → opted in), and is it meeting the 10% minimum target?
5. Do segment differences (heavy vs. light savers, daily vs. 3x/week cadence) suggest that the treatment effect varies by user type?

### Decisions This Will Inform

- Ship/iterate/kill decision for the Resurface feature at experiment close (April 5, 2026)
- Whether to extend the experiment if results are directionally positive but not yet statistically significant
- Whether to pause the experiment if the unsubscribe guardrail is breached
- Whether to adjust the opt-in prompt if the opt-in rate is below the 10% target after week 1

### What This Dashboard Is NOT For

- Operational monitoring of the digest send pipeline (send failures, retry rates, Resend API health) . these are tracked in the Datadog operational dashboard, not Amplitude
- Individual user debugging ("why didn't user X receive their digest?") . use Amplitude's user timeline for individual-level investigation
- Post-experiment deep analysis (regression models, causal inference) . the dashboard provides descriptive metrics; post-experiment analysis will be done in a separate notebook

---

## Audience

| Audience | Usage Frequency | Primary Questions |
|----------|-----------------|-------------------|
| Priya M. (PM) | Daily during test | Return rate trend, CTR, unsubscribe rate |
| Chloe B. (Data) | Daily during test | All metrics; data quality checks |
| Alex R. (Engineering) | 2 - 3x/week | Send success rate, item click distribution |
| Jordan L. (Growth) | Weekly | Opt-in rate, segment differences |
| Marco S. (CEO) | Weekly (Monday exec check-in) | Single-screen summary: return rate, CTR, guardrail status |

### Usage Context

**When will this be viewed?**
Daily at 9:00 AM by Priya and Chloe (after the morning digest cycle completes). Weekly on Mondays by Marco (5-minute screen share in the exec check-in).

**What device/format?**
Desktop browser (Amplitude web app). Marco views via screen share . the dashboard must be readable at a glance on a projected screen without scrolling.

---

## Key Metrics

### Metric 1: 7-Day Return Rate (Primary Experiment Metric)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of users who had at least one session in week N and returned for at least one session in week N+1 |
| **Calculation** | (Users with ≥1 session in week N+1) / (Users with ≥1 session in week N) × 100, computed per experiment variant |
| **Data Source** | Amplitude session events (existing instrumentation) + experiment variant assignment |
| **Granularity** | Weekly (computed each Monday for the prior 7-day window) |
| **Current Baseline** | 18% [fictional] |
| **Target** | ≥23% treatment (≥5pp lift over control) [fictional] |
| **Notes** | Intent-to-treat: all treatment users are included regardless of opt-in status |

### Metric 2: Email Click-Through Rate (Secondary Metric)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of delivered digest emails where the user clicked at least one item |
| **Calculation** | (Digests with ≥1 `resurface_item_clicked` event) / (Total `resurface_digest_sent` events) × 100 |
| **Data Source** | `resurface_digest_sent` and `resurface_item_clicked` events |
| **Granularity** | Daily |
| **Current Baseline** | n/a (new metric) |
| **Target** | ≥15% [fictional] |
| **Notes** | Treatment only (control receives no email). Do NOT use open rate . Apple MPP inflates it. |

### Metric 3: Email Unsubscribe Rate (Guardrail Metric)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of opted-in treatment users who unsubscribe in a given week |
| **Calculation** | (`resurface_unsubscribe` events in week N) / (Opted-in users at start of week N) × 100 |
| **Data Source** | `resurface_unsubscribe` events + `digest_enabled` user property |
| **Granularity** | Weekly |
| **Current Baseline** | n/a (new metric) |
| **Target** | ≤2% per week [fictional] |
| **Notes** | Guardrail . breaching this threshold triggers experiment pause and review |

### Metric 4: Opt-In Rate (Diagnostic Metric)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of treatment users who enable the Resurface digest during the test window |
| **Calculation** | (Treatment users with `resurface_opt_in` event) / (Total treatment users) × 100 |
| **Data Source** | `resurface_opt_in` events + experiment variant assignment |
| **Granularity** | Cumulative (running total, updated daily) |
| **Current Baseline** | n/a |
| **Target** | ≥10% [fictional] |
| **Notes** | Also track the funnel: card_viewed → opted_in for conversion rate |

### Metrics Summary Table

| Metric | Definition | Source | Target |
|--------|------------|--------|--------|
| 7-day return rate | Weekly return rate by variant | Amplitude sessions | ≥23% treatment [fictional] |
| Email CTR | Daily click-through rate | `digest_sent` + `item_clicked` | ≥15% [fictional] |
| Unsubscribe rate | Weekly unsubscribe % of opted-in users | `unsubscribe` events | ≤2%/week [fictional] |
| Opt-in rate | Cumulative opt-in % of treatment users | `opt_in` events | ≥10% [fictional] |
| Saved item revisit rate | 30-day revisit rate by variant | Amplitude item events | Directional improvement |

---

## Visualization Specifications

### Chart 1: 7-Day Return Rate Trend (Treatment vs. Control)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Is the treatment group returning more than control, and is the gap growing? |
| **Chart Type** | Line chart (two series) |
| **X-Axis** | Week (Week 1, Week 2, Week 3, Week 4) |
| **Y-Axis** | 7-day return rate (%) |
| **Series/Breakdown** | Two lines: Control (gray) and Treatment (blue). Include 95% confidence interval shading. |
| **Interactivity** | Tooltip on hover shows exact value, sample size, and CI for each point |
| **Position** | Top-left (most prominent position . this is the primary metric) |

### Chart 2: Email CTR Trend (Daily)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Are users engaging with the digest content, and is engagement stable? |
| **Chart Type** | Line chart (single series) |
| **X-Axis** | Date (daily) |
| **Y-Axis** | Email CTR (%) |
| **Series/Breakdown** | Single line: treatment opted-in users. Include a horizontal reference line at 15% (target). |
| **Interactivity** | Tooltip shows CTR, total digests sent, total clicks, for each day |
| **Position** | Top-right |

### Chart 3: Opt-In Funnel

| Attribute | Value |
|-----------|-------|
| **Purpose** | What is the opt-in conversion rate from card viewed to opted in? |
| **Chart Type** | Funnel chart (horizontal) |
| **X-Axis** | Funnel steps: Treatment Users → Card Viewed → Opted In |
| **Y-Axis** | Count and conversion rate (%) |
| **Series/Breakdown** | Single funnel; show absolute count and % conversion at each step |
| **Interactivity** | Click on a step to see the user list for debugging |
| **Position** | Middle-left |

### Chart 4: Unsubscribe Rate Trend (Weekly)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Is the unsubscribe rate within the guardrail, or trending toward the threshold? |
| **Chart Type** | Bar chart (weekly) with horizontal guardrail reference line |
| **X-Axis** | Week (Week 1, Week 2, Week 3, Week 4) |
| **Y-Axis** | Unsubscribe rate (%) |
| **Series/Breakdown** | Single series: weekly unsubscribe rate. Red horizontal line at 2% (guardrail threshold). |
| **Interactivity** | Tooltip shows unsubscribe count, opted-in base, and rate |
| **Position** | Middle-right |

### Chart 5: Segment Breakdown Table

| Attribute | Value |
|-----------|-------|
| **Purpose** | Does the treatment effect vary by library size or cadence? |
| **Chart Type** | Table |
| **X-Axis** | n/a (table) |
| **Y-Axis** | n/a (table) |
| **Series/Breakdown** | Rows: Heavy savers (100+), Medium savers (50 - 99), Light savers (10 - 49), Daily cadence, 3x/week cadence. Columns: Control return rate, Treatment return rate, Delta, p-value, CTR (treatment only). |
| **Interactivity** | Sortable columns |
| **Position** | Bottom (full width) |

### Dashboard Layout Sketch

```
┌─────────────────────────────────────────────────────────┐
│  [KPI: Return Rate]  [KPI: CTR]  [KPI: Unsub Rate]     │
├────────────────────────────┬────────────────────────────┤
│                            │                            │
│  Chart 1: Return Rate      │  Chart 2: Email CTR        │
│  Trend (weekly, by variant)│  Trend (daily)             │
│                            │                            │
├────────────────────────────┬────────────────────────────┤
│                            │                            │
│  Chart 3: Opt-In Funnel    │  Chart 4: Unsubscribe      │
│  (treatment only)          │  Rate (weekly + guardrail)  │
│                            │                            │
├────────────────────────────┴────────────────────────────┤
│                                                         │
│        Chart 5: Segment Breakdown Table                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Filters and Segments

### Global Filters

| Filter | Type | Default Value | Options |
|--------|------|---------------|---------|
| Date Range | Date picker | Full experiment window (Mar 9  -  Apr 5, 2026) | Custom range, last 7 days, last 14 days |
| Experiment Variant | Dropdown | All (both variants) | All, Control, Treatment |
| Library Size Segment | Dropdown | All | All, Heavy (100+), Medium (50 - 99), Light (10 - 49) |

### Chart-Specific Filters

| Chart | Filter | Type |
|-------|--------|------|
| Chart 2 (Email CTR) | Cadence | Dropdown: All, Daily, 3x/week |
| Chart 5 (Segment Table) | Metric toggle | Dropdown: Return Rate, CTR, Opt-In Rate |

### Segment Definitions

| Segment Name | Definition | Use Case |
|--------------|------------|----------|
| Heavy savers | Users with 100+ saved items at experiment start | Analyze whether larger libraries produce stronger treatment effects |
| Medium savers | Users with 50 - 99 saved items at experiment start | Middle segment for comparison |
| Light savers | Users with 10 - 49 saved items at experiment start | Analyze whether small libraries limit topic-matching effectiveness |
| Daily cadence | Opted-in treatment users on daily delivery | Compare engagement by cadence |
| 3x/week cadence | Opted-in treatment users on 3x/week delivery | Compare engagement by cadence |

---

## Data Sources

### Primary Sources

| Source | Type | Owner | Latency | Quality Notes |
|--------|------|-------|---------|---------------|
| Amplitude events (client-side) | Event stream | Chloe B. | Near real-time (~30 seconds) | Standard Amplitude SDK; no known quality issues |
| Amplitude events (server-side) | Event stream | Chloe B. | Near real-time (~30 seconds) | Fired by cron job and redirect endpoint; depends on server availability |
| Amplitude Experiment (variant assignment) | Feature flag | Chloe B. | Instant (cached client-side) | Consistent bucketing by user_id |

### Data Pipeline Requirements

**Refresh Frequency:** Near real-time (Amplitude default)
**Refresh Time:** No batch processing required; all events stream to Amplitude in real time
**Historical Data Needed:** Experiment window only (March 9  -  April 5, 2026); 2-week pre-experiment baseline for return rate comparison
**Data Retention:** 12 months (standard Amplitude retention)

### Data Quality Considerations

- Apple Mail Privacy Protection inflates `resurface_digest_opened` events; the dashboard does NOT include an open rate metric for this reason
- The `item_position` property on `resurface_item_clicked` events should be validated: values must be 1 - 5; any values outside this range indicate an instrumentation bug
- Server-side events (`digest_sent`, `digest_skipped`) are dependent on the cron job's availability; if the cron job fails, these events will not fire, creating a data gap that must be reconciled with the Resend delivery logs

---

## Access and Permissions

### Access Levels

| Role/Group | Access Level | Restrictions |
|------------|--------------|--------------|
| Product team (Priya, Chloe, Alex, Jordan, Dan) | Full access | None |
| Marco S. (CEO) | View only | Cannot modify charts or filters |
| Engineering (Jess, Sam) | Full access | None |

### Sensitive Data

| Data Element | Sensitivity | Handling |
|--------------|-------------|----------|
| user_id | Internal identifier | Visible in Amplitude user timelines; not exposed in dashboard aggregations |
| destination_url | Potentially PII | Query parameters stripped at instrumentation time; URLs visible only in individual event detail views |

---

## Alerts and Thresholds

| Condition | Threshold | Action | Recipients |
|-----------|-----------|--------|------------|
| Weekly unsubscribe rate exceeds guardrail | >2% in any single week [fictional] | Slack alert to #resurface | Priya M., Chloe B. |
| Daily email CTR drops below 5% [fictional] for 3 consecutive days | <5% CTR for 3 days | Slack alert to #resurface | Priya M., Chloe B. |
| Opt-in rate below 5% at day 7 | <5% cumulative opt-in after 7 days [fictional] | Slack alert; trigger contingency plan review | Priya M., Jordan L. |

---

## Acceptance Criteria

- [ ] All 5 charts render correctly with test data before the experiment starts (Mar 7 deadline)
- [ ] KPI cards at the top show current return rate (by variant), current CTR, and current unsubscribe rate
- [ ] Global filters (date range, variant, library size) apply correctly to all charts
- [ ] Dashboard loads in under 5 seconds on desktop
- [ ] Marco can access the dashboard in view-only mode
- [ ] Alerts fire correctly when test thresholds are breached (validated with test events)
- [ ] 2-week pre-experiment baseline for return rate is visible in Chart 1 (as a reference period before the treatment line begins)

---

## Open Questions

- [ ] Should the dashboard include a "days remaining" countdown or "experiment progress" indicator for the 4-week test window?
- [ ] Should Chart 1 (return rate trend) show daily or weekly granularity? Weekly is more stable but daily provides earlier signal. Current spec: weekly.

---

## Appendix

### Related Dashboards

- Brainshelf Product Health Dashboard (existing) . overall MAU, retention, save rate
- Resend Delivery Dashboard (Datadog) . email send success rate, bounce rate, API latency

### Reference Documents

- Resurface experiment design (Measure phase)
- Resurface instrumentation spec (Measure phase)
- Resurface hypothesis document (Define phase)

---

*Requirements version 1.0. Update as needs evolve.*
