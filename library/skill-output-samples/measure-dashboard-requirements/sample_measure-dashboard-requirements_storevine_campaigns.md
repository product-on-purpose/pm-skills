---
title: "Measure Dashboard Requirements: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns adoption and revenue analytics dashboard requirements."
artifact: dashboard-requirements
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns adoption and revenue analytics dashboard requirements
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After Campaigns GA, Storevine's growth PM defined the requirements for the Campaigns adoption and revenue dashboard that will track the primary success metrics from the hypothesis and opportunity tree. The dashboard must serve three distinct audiences . the growth PM monitoring the experiment, Merchant Success preparing support resources, and the head of product tracking the churn reduction outcome . each at a different viewing frequency and with different primary questions.

**Source Notes:**

- Recurly Research (recurly.com/resources/blog/churn-rate) . B2B SaaS churn benchmark data documents median SMB annual churn at 10 - 15%, providing the comparison context for monitoring whether Campaigns is reducing Storevine's 22% [fictional] churn toward the 14% [fictional] target.
- Amplitude documentation (amplitude.com/docs/analytics/charts) . the analytics platform used for Campaigns event tracking; its chart types and filter capabilities inform the visualization specifications in this requirements document.
- DMA (Data & Marketing Association, dma.org.uk) email marketing ROI benchmarks . establishes that attributed revenue (revenue traceable to email sends) is the standard measurement target for email marketing programs, validating the decision to surface campaign-attributed revenue as a primary dashboard metric rather than a secondary one.

---

## Prompt

```
/dashboard-requirements

Dashboard: Campaigns adoption and revenue . post-GA monitoring
Audience: Growth PM (daily), Merchant Success (weekly), Head of Product
          (monthly board prep)

Key questions to answer:
1. Are non-adopter merchants sending their first campaign?
   (primary hypothesis metric: first-send rate, 60-day window)
2. Is Campaigns driving measurable revenue for merchants?
   (7-day attributed revenue per campaign send)
3. Is the email-related churn rate declining since GA?
   (churn cohort analysis: merchants with and without Campaigns sends)

Metrics needed:
- First-send rate (60-day, non-adopter segment)
- Campaigns-attributed revenue (7-day window, rolling)
- Active Campaigns merchants (sent ≥1 campaign in last 30 days)
- Churn rate by Campaigns usage cohort
- Send failure rate and unsubscribe rate (guardrails)

Analytics platform: Amplitude (events) + Storevine order DB (revenue)

Need: full dashboard requirements doc with metric definitions,
visualizations, filters, data sources, and acceptance criteria.
```

---

## Output

# Dashboard Requirements: Campaigns Adoption and Revenue

## Overview

**Dashboard Name:** Campaigns Adoption and Revenue
**Requestor:** Growth PM, Storevine
**Date:** April 28, 2026
**Priority:** High
**Target Delivery:** May 5, 2026 (T+7 days post-GA)

---

## Purpose and Questions

### Primary Questions This Dashboard Answers

1. Are non-adopter merchants sending their first campaign within 60 days of Campaigns activation . and is this rate meeting the 30% [fictional] target that validates the primary product hypothesis?
2. Is Campaigns generating measurable attributed revenue for merchants who use it . and at what per-campaign average?
3. Is merchant churn declining in cohorts that have adopted Campaigns, relative to cohorts that have not?

### Decisions This Will Inform

- Whether the guided first-campaign flow should be shipped as default based on the A/B test results (primary metric from this dashboard)
- Whether Merchant Success needs to intervene with support resources or onboarding nudges for merchants who have not sent a first campaign after 30 days
- Whether the Q4 2026 churn reduction target (22% → 14% [fictional]) is on track by monitoring the churn cohort split between Campaigns-active and Campaigns-inactive merchants

### What This Dashboard Is NOT For

- Monitoring individual merchant behavior or merchant-specific email performance (this is a cohort and trend dashboard, not a merchant admin tool)
- Real-time campaign delivery monitoring (that belongs in the send failure rate alert in the operations monitoring dashboard)

---

## Audience

| Audience | Usage Frequency | Primary Questions |
|----------|-----------------|-------------------|
| Growth PM | Daily | Is the first-send rate on track for the A/B test? Are there funnel drop-off patterns to investigate? |
| Merchant Success Lead | Weekly | Which merchant segments are underperforming on first-send rate? Where should support focus outreach? |
| Head of Product | Monthly | Is Campaigns contributing to churn reduction? Are adoption trends heading in the right direction for Q4 OKRs? |

### Usage Context

**When will this be viewed?** Growth PM reviews daily as part of the morning metrics check; Merchant Success Lead reviews weekly ahead of the team sync; Head of Product reviews monthly for OKR tracking and board preparation.

**What device/format?** Desktop browser (Amplitude dashboard); Head of Product review exported as a PDF for monthly board deck.

---

## Key Metrics

### Metric 1: First Campaign Send Rate (60-Day Cohort)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | The percentage of eligible non-adopter merchants who send at least one Campaigns email within 60 days of their Campaigns account activation date |
| **Calculation** | (Merchants with at least one `campaign_sent` event within 60 days of activation) / (Total eligible non-adopter merchants activated in the same cohort period) |
| **Data Source** | Amplitude . `first_send_completed` event, filtered to `email_tool_status = "none"` at activation |
| **Granularity** | Weekly cohort (merchants who activated in the same 7-day window) |
| **Current Baseline** | 12% [fictional] (pre-GA baseline from legacy Storevine email tools) |
| **Target** | 30% [fictional] within 60 days of activation |
| **Notes** | Cohort-based . each cohort is tracked independently for 60 days from activation; do not report as a point-in-time snapshot of all merchants |

### Metric 2: Campaigns-Attributed Revenue (7-Day Window)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Total purchase revenue generated by customers who clicked on a Campaigns email and made a purchase within 7 days, aggregated by campaign send |
| **Calculation** | SUM(`order_value`) for all `attribution_recorded` events where `days_to_purchase <= 7`, grouped by `campaign_id`, rolling 30 days |
| **Data Source** | Amplitude . `attribution_recorded` event (order_value property) joined to campaign_sent for campaign-level aggregation |
| **Granularity** | Per campaign (bar chart); daily aggregate (trend line) |
| **Current Baseline** | $0 [fictional] (new metric . no prior attribution data) |
| **Target** | Average attributed revenue per campaign send > $240 [fictional] by Q3 2026 |
| **Notes** | Revenue is attributed on click only (not open), per the attribution spec decision; this is a conservative attribution model |

### Metric 3: Active Campaigns Merchants

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Number of distinct merchants who have sent at least one campaign in the last 30 days |
| **Calculation** | COUNT(DISTINCT `merchant_id`) where `campaign_sent` event fired in the last 30 calendar days |
| **Data Source** | Amplitude . `campaign_sent` event |
| **Granularity** | Daily (rolling 30-day window) |
| **Current Baseline** | 0 [fictional] (at GA) |
| **Target** | 2,000 active merchants [fictional] by end of Q2 2026 |
| **Notes** | "Active" means at least one send in 30 days . does not require weekly or monthly cadence |

### Metrics Summary Table

| Metric | Definition | Source | Target |
|--------|------------|--------|--------|
| First-send rate (60-day cohort) | % of non-adopters who send within 60 days | Amplitude: first_send_completed | 30% [fictional] |
| Campaigns-attributed revenue (rolling 30 days) | Revenue from email-attributed purchases | Amplitude: attribution_recorded | >$240/send average [fictional] |
| Active Campaigns merchants | Distinct merchants with ≥1 send in last 30 days | Amplitude: campaign_sent | 2,000 [fictional] by Q2 end |
| Churn rate by Campaigns usage | Annual churn rate for Campaigns-active vs. Campaigns-inactive cohorts | Storevine order DB + churn model | Campaigns-active < 12% [fictional] |
| Send failure rate | % of campaign sends that fail (non-202 response) | Amplitude: campaign_sent error events | Below 2% [fictional] |
| Unsubscribe rate | % of campaign recipients who unsubscribe | Amplitude: attribution_recorded (unsubscribe) | Below 2.0% |

---

## Visualization Specifications

### Chart 1: First-Send Rate by Weekly Cohort

| Attribute | Value |
|-----------|-------|
| **Purpose** | Track whether each new cohort of non-adopter merchants is meeting the 30% [fictional] first-send rate target at 60 days |
| **Chart Type** | Line chart with reference line at 30% [fictional] |
| **X-Axis** | Days since activation (0 - 60) |
| **Y-Axis** | Cumulative first-send rate (%) |
| **Series/Breakdown** | One line per weekly merchant cohort (by activation week); most recent 4 cohorts visible |
| **Interactivity** | Hover tooltip shows cohort size and current cumulative rate; click cohort label to isolate one cohort |
| **Position** | Top-left, full-width chart . primary metric, most prominent placement |

### Chart 2: Campaigns-Attributed Revenue per Send

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show whether campaigns are generating meaningful attributed revenue, and identify high-performing campaigns by segment |
| **Chart Type** | Bar chart (individual campaigns); trend line overlay for rolling daily total |
| **X-Axis** | Campaign send date (last 30 days) |
| **Y-Axis** | Attributed revenue (USD, 7-day window) |
| **Series/Breakdown** | Bars colored by merchant product category (fashion/home, beauty, food, other) |
| **Interactivity** | Hover shows campaign_id, merchant category, recipient count, and attributed revenue; click to open campaign detail |
| **Position** | Top-right, full-width chart |

### Chart 3: Active Merchants and Send Volume Trend

| Attribute | Value |
|-----------|-------|
| **Purpose** | Track platform-level Campaigns adoption: how many merchants are active, and at what total send volume |
| **Chart Type** | Dual-axis line chart |
| **X-Axis** | Date (daily, last 90 days) |
| **Y-Axis (left)** | Active Campaigns merchants (rolling 30-day count) |
| **Y-Axis (right)** | Total campaign sends per day |
| **Series/Breakdown** | Two lines: active merchant count and daily send volume |
| **Interactivity** | Hover tooltip shows both values for any given day |
| **Position** | Bottom-left |

### Dashboard Layout Sketch

```
┌──────────────────────────────────────────────────────────────────────┐
│  [KPI: First-Send Rate]  [KPI: Attributed Revenue]  [KPI: Active]   │
├──────────────────────────────────┬───────────────────────────────────┤
│                                  │                                   │
│  Chart 1: First-Send Rate        │  Chart 2: Revenue per Send        │
│  by Weekly Cohort (Line)         │  by Campaign (Bar + Trend)        │
│                                  │                                   │
├──────────────────────────────────┴───────────────────────────────────┤
│                                                                      │
│  Chart 3: Active Merchants and Send Volume Trend (Dual-Axis Line)    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Table: Churn Rate by Campaigns Usage Cohort (monthly snapshot)      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Filters and Segments

### Global Filters

| Filter | Type | Default Value | Options |
|--------|------|---------------|---------|
| Date Range | Date picker | Last 30 days | Last 7 / 30 / 60 / 90 days; custom |
| Merchant Segment | Dropdown | All merchants | Non-adopter, Klaviyo-migrated, Mailchimp-migrated |
| Product Category | Multi-select | All | Fashion/Home, Beauty, Food, Outdoor, Other |

### Chart-Specific Filters

| Chart | Filter | Type |
|-------|--------|------|
| Chart 1 (First-Send Rate) | Cohort week | Dropdown (select specific activation week) |
| Chart 2 (Revenue per Send) | Minimum recipient count | Number input (filter out very small sends) |

### Segment Definitions

| Segment Name | Definition | Use Case |
|--------------|------------|----------|
| Non-adopter | Merchants with `email_tool_status = "none"` at activation . the primary target segment | First-send rate tracking and A/B test monitoring |
| Campaigns-active | Merchants with at least one `campaign_sent` event in the last 30 days | Churn cohort comparison |
| Campaigns-inactive | Merchants who have activated Campaigns but have not sent in 30 days | Identify re-engagement opportunity |

---

## Data Sources

### Primary Sources

| Source | Type | Owner | Latency | Quality Notes |
|--------|------|-------|---------|---------------|
| Amplitude Campaigns events | Analytics event stream | Backend Engineer | Near real-time (60s batch) | `attribution_recorded` events may arrive up to 60 seconds after the webhook is received |
| Storevine order database | PostgreSQL (direct query) | Platform Squad | Daily snapshot | Used for revenue attribution join and churn cohort analysis; daily ETL to Amplitude |

### Data Pipeline Requirements

**Refresh Frequency:** Daily for churn cohort table; near real-time (60-second batch) for all Amplitude-sourced charts
**Refresh Time:** Daily snapshot ready by 6:00 AM UTC
**Historical Data Needed:** Last 12 months for churn cohort analysis; last 90 days for all other charts
**Data Retention:** 24 months in Amplitude; 36 months in the attribution events table

### Data Quality Considerations

- Attribution events recorded before the attribution webhook receiver was fully stable (first 72 hours of GA) may be incomplete; exclude this window from revenue attribution trend analysis until a reprocessing job runs against the SendGrid event log
- `merchant_customer_count_bucket` is updated monthly; cohort analyses that span a bucket-change month may show a single merchant in two buckets . filter by the bucket value at activation, not the current value

---

## Access and Permissions

### Access Levels

| Role/Group | Access Level | Restrictions |
|------------|--------------|--------------|
| Growth PM | Full access | None |
| Merchant Success team | View only | Cannot export raw event data; can export chart images |
| Head of Product | View only | Monthly scheduled export delivered automatically |
| Engineering Lead | Full access | For debugging and data quality investigation |

### Sensitive Data

| Data Element | Sensitivity | Handling |
|--------------|-------------|----------|
| Individual campaign attributed revenue | Internal financial | Aggregated by category in the merchant-facing view; raw per-campaign values visible to Growth PM and Engineering Lead only |

---

## Alerts and Thresholds

| Condition | Threshold | Action | Recipients |
|-----------|-----------|--------|------------|
| Send failure rate exceeds 2% [fictional] | >2% of sends return non-202 in any 15-minute window | Slack alert to #campaigns-build | Engineering Lead, Growth PM |
| First-send rate (60-day cohort) drops below 20% [fictional] | Latest cohort's 60-day rate < 20% | Email alert | Growth PM |
| Unsubscribe rate exceeds 1.5% [fictional] in any 7-day window | Rolling 7-day unsubscribe rate > 1.5% | Slack alert to #campaigns-build | Growth PM, Engineering Lead |

---

## Acceptance Criteria

- [ ] All metrics match definitions when spot-checked against the Storevine order database and Amplitude event log for a sample of 10 merchants [fictional]
- [ ] Global date range filter applies correctly to all charts including the cohort chart (which should filter by activation date, not event date)
- [ ] Dashboard loads in under 5 seconds in the Amplitude interface
- [ ] All access levels are verified: Merchant Success team cannot export raw event data; Head of Product receives the monthly scheduled export
- [ ] Daily data refresh is confirmed by 7:00 AM UTC on the first three post-GA mornings

---

## Open Questions

- Should the churn cohort table be powered by Amplitude (using `merchant_id` survival curves) or by a scheduled SQL query against the Storevine subscription database? The SQL query gives cleaner churn definitions but adds a 24-hour latency; the Amplitude approach is real-time but requires a proxy event for churn (cancellation event) that may not yet be instrumented.
- What is the right denominator for the first-send rate cohort chart . all non-adopter merchants who have activated Campaigns, or only those who have entered the Campaigns flow at least once? The hypothesis measures from "activation" but the meaningful measurement may be from "first flow entry" to avoid inflating the denominator with merchants who were assigned to Campaigns but never opened it.

---

## Appendix

### Related Dashboards

- Storevine Platform Operations Dashboard (send failure rate, infrastructure metrics)
- Merchant Retention Dashboard (overall churn by cohort, pre-Campaigns baseline)

### Reference Documents

- Instrumentation spec: Campaigns Send Flow and First-Campaign Flow Events
- Experiment design: Campaigns Guided First-Campaign Flow A/B Test
- Opportunity tree: Reduce Annual Merchant Churn (desired outcome tree)

---

*Requirements version 1.0. Update as needs evolve.*
