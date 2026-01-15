---
artifact: dashboard-requirements
version: "1.0"
created: 2026-01-14
status: complete
context: Product health dashboard for SaaS platform
---

# Dashboard Requirements: Product Health Dashboard

## Overview

**Dashboard Name:** Product Health Dashboard
**Requestor:** Maya Johnson, Product Manager
**Date:** January 2026
**Priority:** High
**Target Delivery:** End of Q1 2026

---

## Purpose and Questions

### Primary Questions This Dashboard Answers

1. **Are users healthy?** What is our overall user engagement and are users getting value from the product?
2. **Where do users struggle?** Which parts of the product have the highest friction or drop-off?
3. **What features drive retention?** Which features, when adopted, correlate with long-term retention?
4. **Are we trending up or down?** How do key metrics compare to previous periods?

### Decisions This Will Inform

- Prioritization of product improvements based on friction points
- Feature investment decisions based on retention correlation
- Resource allocation to high-impact areas
- Early warning on user health problems before they hit revenue

### What This Dashboard Is NOT For

- Deep-dive analysis on specific features (separate feature dashboards exist)
- Real-time operational monitoring (use DataDog for that)
- Individual user support (use admin tools)
- Financial/revenue metrics (finance owns that dashboard)

---

## Audience

| Audience | Usage Frequency | Primary Questions |
|----------|-----------------|-------------------|
| Product Team | Daily | Feature adoption, user friction |
| Leadership | Weekly | Overall health trends, KPIs |
| Engineering | Weekly | Error rates, performance impact on UX |
| Customer Success | Daily | Account health signals |

### Usage Context

**When will this be viewed?**
- Product team: Daily standup (quick KPI check) and weekly deep-dive
- Leadership: Weekly product review meeting
- CS: Before customer calls to assess account health

**What device/format?**
- Desktop browser (primary)
- Shared on TV in product team area
- Exported to PDF for monthly board reports

---

## Key Metrics

### Metric 1: Daily Active Users (DAU)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Unique users who performed any meaningful action in the product on a given day |
| **Calculation** | COUNT(DISTINCT user_id) WHERE action_type NOT IN ('login', 'logout') AND event_date = date |
| **Data Source** | events.user_actions table |
| **Granularity** | Daily |
| **Current Baseline** | 12,400 |
| **Target** | 15,000 by end of Q2 |
| **Notes** | Excludes bot accounts and internal users |

### Metric 2: DAU/MAU Ratio (Stickiness)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Ratio of daily active users to monthly active users, indicating how often users return |
| **Calculation** | DAU / MAU (rolling 30-day MAU) |
| **Data Source** | Derived from events.user_actions |
| **Granularity** | Daily |
| **Current Baseline** | 0.32 (32%) |
| **Target** | 0.40 (40%) |
| **Notes** | Industry benchmark for SaaS is 0.20-0.40 |

### Metric 3: Feature Adoption Rate

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of MAU who have used each core feature at least once in the past 30 days |
| **Calculation** | COUNT(DISTINCT users who used feature) / MAU |
| **Data Source** | events.feature_usage table |
| **Granularity** | Daily (rolling 30-day) |
| **Current Baseline** | Varies by feature (see chart) |
| **Target** | Top 5 features > 50% adoption |
| **Notes** | Breakdown by feature; shows per-feature adoption |

### Metric 4: User Retention (Cohort-based)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Percentage of users from a signup cohort who are still active after N days |
| **Calculation** | (Active users in cohort at day N) / (Total users in cohort) |
| **Data Source** | events.user_actions + users.signups |
| **Granularity** | Weekly cohorts, measured at D7, D14, D30, D60, D90 |
| **Current Baseline** | D30: 42% |
| **Target** | D30: 55% |
| **Notes** | Compare cohorts over time to see if retention is improving |

### Metric 5: Time to First Value (TTFV)

| Attribute | Value |
|-----------|-------|
| **Business Definition** | Time from signup to completing first meaningful action (creating first project) |
| **Calculation** | MEDIAN(first_project_created_at - signup_at) |
| **Data Source** | users.signups + events.project_created |
| **Granularity** | Daily (rolling 7-day average) |
| **Current Baseline** | 2.3 days |
| **Target** | < 1 day |
| **Notes** | Users who never create a project counted as NULL/excluded |

### Metrics Summary Table

| Metric | Definition | Source | Target |
|--------|------------|--------|--------|
| DAU | Unique users with meaningful action | events.user_actions | 15,000 |
| DAU/MAU | Stickiness ratio | Derived | 40% |
| Feature Adoption | % MAU using each feature | events.feature_usage | Top 5 > 50% |
| D30 Retention | Users active 30 days post-signup | events + users | 55% |
| TTFV | Time to first project creation | events + users | < 1 day |

---

## Visualization Specifications

### Chart 1: KPI Summary Cards

| Attribute | Value |
|-----------|-------|
| **Purpose** | At-a-glance health check of key metrics |
| **Chart Type** | KPI Cards (4 cards in a row) |
| **Metrics Shown** | DAU, DAU/MAU, D30 Retention, TTFV |
| **Comparison** | Show vs. previous period and vs. target |
| **Interactivity** | Click card to see trend chart |
| **Position** | Top of dashboard, most prominent |

### Chart 2: Engagement Trend

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show DAU and MAU trends over time |
| **Chart Type** | Line chart with dual axis |
| **X-Axis** | Date (daily) |
| **Y-Axis** | Left: DAU, Right: DAU/MAU ratio |
| **Series/Breakdown** | DAU line, MAU line, DAU/MAU line |
| **Interactivity** | Hover for values, zoom on date range |
| **Position** | Top-left main section |

### Chart 3: Feature Adoption Breakdown

| Attribute | Value |
|-----------|-------|
| **Purpose** | Show which features users are/aren't adopting |
| **Chart Type** | Horizontal bar chart |
| **X-Axis** | Adoption rate (%) |
| **Y-Axis** | Feature name |
| **Series/Breakdown** | Single series, sorted by adoption |
| **Interactivity** | Click bar to see feature trend over time |
| **Position** | Top-right main section |

### Chart 4: Retention Cohort Heatmap

| Attribute | Value |
|-----------|-------|
| **Purpose** | Compare retention across weekly cohorts |
| **Chart Type** | Cohort heatmap (weeks × retention periods) |
| **X-Axis** | Days since signup (D1, D7, D14, D30, D60, D90) |
| **Y-Axis** | Signup week cohort |
| **Series/Breakdown** | Color intensity = retention % |
| **Interactivity** | Hover for exact values |
| **Position** | Middle section, full width |

### Chart 5: Funnel Drop-off Analysis

| Attribute | Value |
|-----------|-------|
| **Purpose** | Identify where users struggle in key flows |
| **Chart Type** | Funnel chart |
| **X-Axis** | Funnel step |
| **Y-Axis** | Users (absolute and %) |
| **Series/Breakdown** | Steps: Signup → Onboarding Complete → First Project → Invited Team → Paid |
| **Interactivity** | Click step to see breakdown by segment |
| **Position** | Bottom-left |

### Chart 6: Detailed Metrics Table

| Attribute | Value |
|-----------|-------|
| **Purpose** | Detailed view for deep-dive analysis |
| **Chart Type** | Data table with sorting |
| **Columns** | Date, DAU, MAU, DAU/MAU, New Signups, Churned Users, Feature 1-5 adoption |
| **Interactivity** | Sort by any column, export to CSV |
| **Position** | Bottom section, collapsible |

### Dashboard Layout Sketch

```
┌─────────────────────────────────────────────────────────────────────┐
│  [DAU: 12.4K]  [Stickiness: 32%]  [D30 Ret: 42%]  [TTFV: 2.3d]    │
│     ▲ +5%          ▼ -2%              ▲ +3%           ▼ +0.2d      │
├────────────────────────────────┬────────────────────────────────────┤
│                                │                                    │
│  📈 Engagement Trend           │  📊 Feature Adoption               │
│  [Line chart: DAU/MAU]         │  [Horizontal bars by feature]     │
│                                │                                    │
├────────────────────────────────┴────────────────────────────────────┤
│                                                                     │
│  🔲 Retention Cohort Heatmap                                        │
│  [Week cohorts × D1/D7/D14/D30/D60/D90]                            │
│                                                                     │
├────────────────────────────────┬────────────────────────────────────┤
│                                │                                    │
│  ⬇️ Funnel Analysis            │  📋 Detailed Data Table            │
│  [Signup → Value funnel]       │  [Sortable metric table]          │
│                                │                                    │
└────────────────────────────────┴────────────────────────────────────┘
```

---

## Filters and Segments

### Global Filters

| Filter | Type | Default Value | Options |
|--------|------|---------------|---------|
| Date Range | Date picker | Last 30 days | Last 7/30/90 days, MTD, QTD, Custom |
| Plan Type | Multi-select | All | Free, Starter, Professional, Enterprise |
| User Segment | Multi-select | All | New (<30d), Active, At-risk, Churned |
| Platform | Dropdown | All | Web, iOS, Android |

### Chart-Specific Filters

| Chart | Filter | Type |
|-------|--------|------|
| Feature Adoption | Feature category | Dropdown (Core, Advanced, Admin) |
| Funnel | Entry point | Dropdown (Organic, Paid, Referral) |

### Segment Definitions

| Segment Name | Definition | Use Case |
|--------------|------------|----------|
| New Users | Signed up within last 30 days | Track onboarding effectiveness |
| At-Risk | No login in 14+ days but not churned | Target for re-engagement |
| Power Users | > 20 sessions per month | Understand ideal user behavior |
| Enterprise | On Enterprise plan | Compare enterprise vs. SMB health |

---

## Data Sources

### Primary Sources

| Source | Type | Owner | Latency | Quality Notes |
|--------|------|-------|---------|---------------|
| events.user_actions | Snowflake table | Data Engineering | 1 hour | 99.9% complete |
| events.feature_usage | Snowflake table | Data Engineering | 1 hour | Some features not instrumented |
| users.signups | Snowflake table | Data Engineering | Real-time | Authoritative source |
| users.subscriptions | Snowflake table | Data Engineering | Daily | Synced from Stripe |

### Data Pipeline Requirements

**Refresh Frequency:** Hourly during business hours, daily overnight
**Refresh Time:** Dashboard current as of top-of-hour; overnight refresh complete by 6am UTC
**Historical Data Needed:** Last 24 months
**Data Retention:** Aggregated data retained indefinitely; raw events 24 months

### Data Quality Considerations

- Bot traffic filtered but occasional false positives; flag if DAU spikes >20% unexpectedly
- Feature usage for "Reports" feature incomplete before Nov 2025 (instrumentation added)
- Enterprise accounts have multiple users; user_id is individual, account_id needed for account-level views

---

## Access and Permissions

### Access Levels

| Role/Group | Access Level | Restrictions |
|------------|--------------|--------------|
| Product Team | Full access | None |
| Engineering | Full access | None |
| Leadership | Full access | None |
| Customer Success | Limited | Cannot see individual user data |
| Sales | View only | Cannot export, account-level only |

### Sensitive Data

| Data Element | Sensitivity | Handling |
|--------------|-------------|----------|
| User email | PII | Not displayed; use user_id |
| Account name | Confidential | Visible to CS/Sales only |

---

## Alerts and Thresholds

| Condition | Threshold | Action | Recipients |
|-----------|-----------|--------|------------|
| DAU drops below | 10,000 | Email + Slack | Product team |
| D30 retention drops below | 35% | Email | PM + Leadership |
| TTFV exceeds | 5 days | Slack | Onboarding squad |
| Feature adoption (any) drops | >10% week-over-week | Email | Feature owner |

---

## Acceptance Criteria

- [ ] All 5 core metrics display correctly and match manual SQL verification
- [ ] Cohort retention heatmap shows at least 12 weeks of historical cohorts
- [ ] All filters work across all charts simultaneously
- [ ] Dashboard loads in under 5 seconds on standard connection
- [ ] Data refreshes correctly by 7am UTC each morning
- [ ] CS team confirms they can access account-level data
- [ ] Export to CSV works for detailed table
- [ ] Mobile-responsive for leadership checking on phones

---

## Open Questions

- Should we include revenue/MRR on this dashboard or keep it separate?
- Do we need real-time DAU or is hourly sufficient?
- Should cohorts be weekly or monthly granularity?

---

## Appendix

### Related Dashboards

- [Feature Deep-Dive: Reporting](link)
- [Onboarding Funnel Dashboard](link)
- [Finance & Revenue Dashboard](link)

### Reference Documents

- [Metric Definitions Wiki](link)
- [Data Dictionary](link)
- [Instrumentation Spec for Feature Tracking](link)

---

*Requirements version 1.0. Update as needs evolve.*
