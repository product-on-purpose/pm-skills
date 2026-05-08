---
title: "Measure Dashboard Requirements: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints post-launch monitoring dashboard requirements."
artifact: dashboard-requirements
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: Blueprints post-launch monitoring dashboard requirements"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Leo M. is designing the post-launch monitoring dashboard for Blueprints v1 GA (launch: April 28, 2026). The dashboard needs to serve three audiences with different cadences: Rachel V. checks daily for adoption trends and approval bottlenecks, Sandra C. reviews weekly for executive reporting on the 500-to-650-account growth target [fictional], and Karen L.'s engineering team monitors real-time for system health (merge latency, WebSocket errors, event pipeline throughput).

The dashboard draws from the instrumentation spec events (blueprint_created, section_completed, approval_requested, approval_granted, approval_rejected, blueprint_published) and system telemetry from the WebSocket provider and Yjs sync service. It consolidates four distinct data sources into a unified view, replacing the ad hoc queries that Leo M. ran manually during the A/B test and closed beta phases.

### Source Notes

- Dashboard design principles for product analytics: Amplitude "Dashboard Design Guide" (amplitude.com)
- Metric hierarchy and KPI tree design: Sean Ellis and Morgan Brown, "Hacking Growth," Currency Books, 2017
- Real-time monitoring dashboard patterns: Datadog dashboard best practices documentation (docs.datadoghq.com)

## Prompt

```
/dashboard-requirements

I need dashboard requirements for the Blueprints post-launch monitoring dashboard. Here's the context:

**Audiences:**
1. Rachel V. (PM) -- daily check: adoption trends, approval bottlenecks, template usage
2. Sandra C. (Head of Product) -- weekly review: executive summary, account growth, key health metrics
3. Karen L. (Engineering) -- real-time: system health, merge latency, error rates

**Key metrics from the PRD and experiment results:**
- Median time-to-approved (target: ≤2.5 days [fictional])
- Empty-section submission rate (target: ≤10% [fictional])
- Approval cycle count (target: ≤1.5 cycles [fictional])
- Blueprint adoption: monthly active Blueprint creators (target: 2,000 [fictional])
- Enterprise account growth (target: 500 → 650 in 12 months [fictional])

**Data sources:**
- Workbench analytics pipeline (event data from instrumentation spec)
- WebSocket provider telemetry (merge latency, connection count, error rate)
- CRM pipeline (account growth, enterprise tier)
- Support ticketing system (Blueprint-related ticket volume)

**Visualization preferences:**
- Time-to-approved: trend line over time (weekly median)
- Adoption: stacked area chart by department/template type
- Approval funnel: horizontal funnel chart
- System health: real-time gauges with alert thresholds

Please generate the full dashboard requirements including layout, filters, alerts, and acceptance criteria.
```


## Output

# Dashboard Requirements: Blueprints Post-Launch Monitor

## Overview

The Blueprints Post-Launch Monitor is the primary dashboard for tracking Blueprints v1 adoption, quality, and system health following the April 28, 2026 GA launch. It consolidates data from four sources (analytics pipeline, WebSocket telemetry, CRM, support ticketing) into a single view with audience-appropriate sections. The dashboard is built in Workbench's internal analytics platform (Looker) and is accessible to the Blueprints product team, engineering, and executive leadership.

## Purpose and Questions

### Primary Questions This Dashboard Answers

1. **Is Blueprints adoption growing?** How many accounts, authors, and Blueprints are active this week compared to last week and last month?
2. **Is required-section enforcement working at scale?** Is the time-to-approved metric holding at or below 2.5 days [fictional] across all customer segments?
3. **Where are approval bottlenecks?** Which templates or accounts have the longest approval cycles, and are approvers responding promptly?
4. **Is the system healthy?** Are merge latency, WebSocket connections, and event pipeline throughput within acceptable bounds?
5. **Are customers encountering problems?** Is Blueprint-related support ticket volume increasing or stabilizing?

### Decisions This Will Inform

- **Progressive rollout pacing:** Should we accelerate or slow the 10%, 25%, 50%, 100% rollout based on adoption and system health?
- **V1.1 prioritization:** Which features (version history, approval delegation, Jira sync) should be prioritized based on usage patterns and support themes?
- **Enterprise sales enablement:** Is the 500 to 650 account growth trajectory on track? Are Blueprints metrics strong enough to support sales conversations?
- **Operational scaling:** Does the WebSocket provider need additional capacity before the next rollout tier?

### What This Dashboard Is NOT For

- Individual Blueprint content review (no document content is displayed)
- Real-time incident response (the engineering team uses Datadog for alerting; this dashboard provides context, not pager-level alerts)
- Billing or revenue reporting (handled by the finance dashboard)
- Individual user activity tracking (aggregated metrics only; no user-level drill-down to protect privacy)

## Audience

| Audience | Primary use | Cadence | Key sections |
|---|---|---|---|
| Rachel V. (PM) | Adoption trends, approval bottlenecks, template usage | Daily | Adoption, Quality, Approval Funnel |
| Sandra C. (Head of Product) | Executive summary, account growth, health check | Weekly | Executive Summary, Account Growth |
| Karen L. (Engineering) | System health, merge latency, error rates | Real-time during launch week; daily after | System Health |
| Leo M. (Data Analyst) | Data quality, event pipeline health, metric validation | Daily during launch week | System Health, Data Pipeline |
| Mei-Lin T. (Enterprise Sales) | Account adoption for sales conversations | Weekly | Account Growth, Adoption by Account |

### Usage Context

- **Launch week (Apr 28 through May 5):** All audiences check the dashboard multiple times per day. The System Health section is the primary focus, as the progressive rollout moves from 10% to 25% during this window.
- **Post-launch steady state (May 6+):** Rachel checks daily, Sandra checks weekly (Monday morning), Karen checks as-needed (triggered by alerts).
- **Quarterly reviews:** Sandra and Rachel use the dashboard for executive presentations and board reporting. Leo M. prepares a snapshot export for each quarterly review.

## Key Metrics

### Metric 1: Median Time-to-Approved

| Field | Detail |
|---|---|
| Definition | Median hours from `blueprint_created` timestamp to final `approval_granted` timestamp (where `is_final_approval` = true), converted to days |
| Source event | `blueprint_published` property: `time_to_approved_hours` |
| Baseline | 4.0 days [fictional] (A/B test control group) |
| Target | ≤2.5 days [fictional] |
| Alert threshold | > 3.0 days [fictional] (7-day rolling median) |
| Granularity | Daily and weekly; segmentable by account, template, company size |

### Metric 2: Empty-Section Submission Rate

| Field | Detail |
|---|---|
| Definition | Percentage of `approval_requested` events where `required_sections_complete` < `required_sections_total` |
| Source event | `approval_requested` properties: `required_sections_complete`, `required_sections_total` |
| Baseline | 37% [fictional] (A/B test control group) |
| Target | ≤10% [fictional] |
| Alert threshold | > 15% [fictional] (7-day rolling average) |
| Granularity | Daily; segmentable by account, template |

### Metric 3: Monthly Active Blueprint Creators

| Field | Detail |
|---|---|
| Definition | Count of distinct `user_id` values on `blueprint_created` events in a rolling 30-day window |
| Source event | `blueprint_created` property: `user_id` |
| Baseline | ~1,200 [fictional] (closed beta) |
| Target | 2,000 [fictional] within 6 months of GA |
| Alert threshold | < 1,000 [fictional] (30-day rolling count drops below beta level) |
| Granularity | Daily snapshot; segmentable by account, creation_method |

### Metrics Summary Table

| Metric | Baseline | Target | Alert threshold | Source |
|---|---|---|---|---|
| Median time-to-approved | 4.0 days [fictional] | ≤2.5 days [fictional] | > 3.0 days [fictional] | Analytics pipeline |
| Empty-section submission rate | 37% [fictional] | ≤10% [fictional] | > 15% [fictional] | Analytics pipeline |
| Approval cycle count (mean) | 2.3 [fictional] | ≤1.5 [fictional] | > 2.0 [fictional] | Analytics pipeline |
| Monthly active Blueprint creators | 1,200 [fictional] | 2,000 [fictional] | < 1,000 [fictional] | Analytics pipeline |
| Enterprise accounts (Blueprints-active) | 80 [fictional] | 650 in 12 months [fictional] | n/a | CRM |
| Merge latency (p95) | 45ms [fictional] | ≤100ms [fictional] | > 150ms [fictional] | WebSocket telemetry |
| WebSocket error rate | n/a | ≤1% [fictional] | > 2% [fictional] | WebSocket telemetry |
| Blueprint support tickets (weekly) | n/a | Decreasing trend | > 50/week [fictional] | Support system |

## Visualization Specifications

### Chart 1: Time-to-Approved Trend

| Field | Detail |
|---|---|
| Chart type | Line chart |
| X-axis | Week (ISO week number) |
| Y-axis | Median time-to-approved (days) |
| Series | Single line (all accounts), with a dashed horizontal line at the 2.5-day target [fictional] |
| Comparison | Optional toggle: overlay A/B test baseline (4.0 days [fictional]) as a grey reference line |
| Interaction | Hover shows weekly median, count of Blueprints, and 25th/75th percentiles |

### Chart 2: Blueprint Adoption (Stacked Area)

| Field | Detail |
|---|---|
| Chart type | Stacked area chart |
| X-axis | Week |
| Y-axis | Blueprints created (count) |
| Series | Stacked by template type (project kickoff, process documentation, meeting notes, other) |
| Interaction | Hover shows count per template type; click drills to template-level table |

### Chart 3: Approval Funnel

| Field | Detail |
|---|---|
| Chart type | Horizontal funnel chart |
| Stages | Blueprint created, All sections started, Submitted for approval, Approved (first cycle), Published |
| Values | Count and percentage of previous stage |
| Comparison | Optional toggle: show last week vs. this week side-by-side |
| Interaction | Click on any stage to see the list of Blueprints that dropped off at that stage (aggregated by template, not individual) |

### Chart 4: System Health Gauges

| Field | Detail |
|---|---|
| Chart type | Four gauge/dial charts in a single row |
| Gauges | Merge latency (p95, ms), WebSocket connections (current count), WebSocket error rate (%), Event pipeline lag (seconds) |
| Thresholds | Green (normal), yellow (warning), red (alert) per metric thresholds defined in Alerts section |
| Refresh rate | Every 60 seconds |

### Chart 5: Account Growth Tracker

| Field | Detail |
|---|---|
| Chart type | Line chart with milestone markers |
| X-axis | Month |
| Y-axis | Cumulative enterprise accounts with at least one Blueprint |
| Series | Actual (solid line) vs. target trajectory (dashed line: 80 to 650 over 12 months [fictional]) |
| Milestones | GA launch (Apr 28), 100 accounts, 250 accounts, 500 accounts, 650 target |

### Dashboard Layout Sketch

The dashboard is divided into four horizontal sections, top to bottom:

**Row 1, Executive Summary (visible to all):** Four KPI cards in a row showing: (1) Time-to-approved (current week median), (2) Empty-section rate (current week), (3) Monthly active creators, (4) Enterprise accounts active. Each card shows the current value, the target, and a directional arrow (up/down vs. prior week).

**Row 2, Adoption and Quality:** Two charts side-by-side. Left: Blueprint Adoption stacked area (Chart 2). Right: Approval Funnel (Chart 3).

**Row 3, Trends and Growth:** Two charts side-by-side. Left: Time-to-Approved Trend (Chart 1). Right: Account Growth Tracker (Chart 5).

**Row 4, System Health:** System Health Gauges (Chart 4) spanning the full width. Visible to all but primarily for the engineering audience.

## Filters and Segments

### Global Filters

| Filter | Type | Default | Options |
|---|---|---|---|
| Date range | Date picker | Last 30 days | Custom range, Last 7/30/90 days, This month, This quarter |
| Account | Multi-select dropdown | All accounts | Individual account selection |
| Template type | Multi-select dropdown | All types | Project kickoff, Process documentation, Meeting notes, Other |
| Rollout tier | Single-select | All tiers | Tier 1 (10%), Tier 2 (25%), Tier 3 (50%), Tier 4 (100%) |

### Chart-Specific Filters

| Chart | Filter | Purpose |
|---|---|---|
| Time-to-Approved Trend | Company size (small/mid/large) | Segment by enterprise size to match A/B test segments |
| Blueprint Adoption | Creation method (wizard/canvas) | Track wizard vs. canvas adoption over time |
| Approval Funnel | Approval chain type (sequential/parallel) | Compare funnel shape by approval mode |
| Account Growth Tracker | Account tier (enterprise/mid-market) | Focus on enterprise growth target |

### Segment Definitions

| Segment | Definition |
|---|---|
| Large enterprise | Accounts with 200+ employees (per CRM) |
| Mid-market | Accounts with 50-199 employees |
| Small business | Accounts with 10-49 employees |
| High-volume accounts | Accounts creating 10 or more Blueprints per week [fictional] |
| New accounts (post-GA) | Accounts that activated Blueprints after April 28, 2026 |
| Migrating accounts | Accounts flagged as Confluence migration in CRM |

## Data Sources

### Primary Sources

| Source | Data | Refresh rate | Connection |
|---|---|---|---|
| Workbench analytics pipeline | All 7 Blueprint lifecycle events | Near real-time (< 5 min lag) | Direct warehouse query (Looker) |
| WebSocket provider telemetry | Merge latency, connection count, error rate | Real-time (60-second intervals) | API integration |
| CRM (Salesforce) | Account count, tier, employee count, pipeline stage | Daily sync (overnight batch) | Salesforce connector |
| Support ticketing (Zendesk) | Blueprint-tagged ticket count and categories | Hourly sync | Zendesk API |

### Data Pipeline Requirements

- Analytics events must flow from the server-side collector to the Looker warehouse within 5 minutes of the event timestamp.
- The `blueprint_published` event's `time_to_approved_hours` property must be pre-computed server-side (not calculated in Looker) to avoid join complexity.
- WebSocket telemetry must be aggregated to 1-minute buckets before ingestion to manage data volume.
- CRM data requires a nightly ETL job that maps `account_id` (analytics) to Salesforce Account ID. Leo M. will validate the mapping completeness before launch.

### Data Quality Considerations

- **Event deduplication:** The analytics pipeline uses `blueprint_id` + `event_name` + `timestamp` as a composite key to deduplicate events that may be replayed from the client-side queue after offline recovery.
- **Missing events:** If the event pipeline lag exceeds 30 minutes, the dashboard should display a warning banner: "Data may be delayed. Last event received: [timestamp]."
- **CRM sync lag:** Account growth metrics may lag by up to 24 hours due to the nightly batch sync. The dashboard should display "Last CRM sync: [date]" in the Account Growth chart footer.

## Access and Permissions

### Access Levels

| Level | Users | Access |
|---|---|---|
| Full access | Rachel V., Leo M. | All sections, all filters, export capability |
| Executive view | Sandra C., James W. | Executive Summary row + Trends and Growth row; no system health detail |
| Engineering view | Karen L., Nate P. | All sections, with emphasis on System Health; no CRM data |
| Sales view | Mei-Lin T., Derek H. | Account Growth Tracker + Adoption charts; no system health or support data |
| Read-only | Broader product team | Executive Summary row only; no filter changes |

### Sensitive Data

- No PII is displayed on the dashboard (all metrics are aggregated; no user names, emails, or document content).
- Account-level drill-downs show `account_id` (UUID) by default; the account name is resolved via a CRM lookup that is access-controlled.
- Support ticket details are aggregated to category counts; individual ticket content is not displayed.

## Alerts and Thresholds

| Alert | Condition | Severity | Channel | Recipients |
|---|---|---|---|---|
| Time-to-approved regression | 7-day rolling median > 3.0 days [fictional] | Warning | Slack #blueprints-alerts | Rachel V., Leo M. |
| Empty-section rate spike | 7-day rolling average > 15% [fictional] | Warning | Slack #blueprints-alerts | Rachel V., Leo M. |
| Creator count drop | 30-day rolling count < 1,000 [fictional] | Warning | Slack #blueprints-alerts, email | Rachel V., Sandra C. |
| Merge latency degradation | p95 merge latency > 150ms [fictional] for 10+ minutes | Critical | Slack #blueprints-eng, PagerDuty | Karen L., Nate P. |
| WebSocket error rate | Error rate > 2% [fictional] for 5+ minutes | Critical | Slack #blueprints-eng, PagerDuty | Karen L., Nate P. |
| Event pipeline lag | Lag > 30 minutes | Warning | Slack #blueprints-eng | Leo M., Karen L. |
| Support ticket spike | Blueprint tickets > 50/week [fictional] | Warning | Slack #blueprints-alerts | Rachel V., Support Lead |

## Acceptance Criteria

- [ ] Dashboard loads within 5 seconds for the default view (last 30 days, all accounts)
- [ ] All four KPI cards in the Executive Summary row display current values, targets, and directional arrows
- [ ] Time-to-Approved Trend chart shows weekly medians with the 2.5-day target line [fictional]
- [ ] Blueprint Adoption chart stacks correctly by template type with accurate weekly counts
- [ ] Approval Funnel shows all five stages with correct count and percentage calculations
- [ ] System Health gauges refresh every 60 seconds with correct threshold coloring
- [ ] Account Growth Tracker shows actual vs. target trajectory with milestone markers
- [ ] All global filters (date range, account, template type, rollout tier) update all charts when changed
- [ ] Alert thresholds trigger correctly when test data exceeds the defined conditions
- [ ] Access permissions are enforced: executive view users cannot see System Health detail; sales view users cannot see support data
- [ ] Dashboard displays a data-freshness indicator showing the timestamp of the most recent event processed
- [ ] Export to CSV is available for all charts (accessible to Full access users only)
- [ ] Dashboard renders correctly at 1920x1080 and 1440x900 screen resolutions

## Open Questions

1. **Real-time vs. near-real-time refresh for adoption charts:** Should the adoption and quality charts refresh in real-time (60-second intervals) during launch week, then switch to hourly refresh in steady state? Recommendation: yes, to manage Looker query costs.
2. **Account-level drill-down:** Should the dashboard support drilling into individual account metrics (e.g., "Account X has a 5.0-day median time-to-approved")? Recommendation: yes, but only for Full access users, and display account_id by default with an optional CRM name lookup.
3. **Historical comparison:** Should charts support a "compare to prior period" overlay (e.g., this week vs. last week)? Recommendation: add this as a Phase 2 enhancement after the dashboard is stable.
4. **Mobile responsiveness:** Should the dashboard render on mobile devices? Recommendation: no for v1; the dashboard is designed for desktop Looker access. Mobile access is a nice-to-have for executives.

## Appendix

### Related Dashboards

- **Workbench Platform Health Dashboard:** Overall platform uptime, API latency, error rates (managed by the platform team). The Blueprints System Health section is a subset of this.
- **Enterprise Sales Pipeline Dashboard:** Account pipeline, revenue metrics, churn tracking (managed by the sales ops team). The Account Growth Tracker feeds into this dashboard's "product adoption" widget.
- **A/B Test Analysis Dashboard:** Historical experiment results (managed by Leo M.). The Blueprints experiment results are archived here after the ship decision.

### Reference Documents

- Instrumentation spec: Defines all 7 Blueprint lifecycle events and their properties
- Experiment results: A/B test analysis confirming the required-section enforcement hypothesis
- PRD: Blueprints v1 success metrics and target thresholds
- Launch checklist: Defines the progressive rollout schedule (10%, 25%, 50%, 100%)
