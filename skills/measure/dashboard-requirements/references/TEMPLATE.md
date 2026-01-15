---
artifact: dashboard-requirements
version: "1.0"
created: YYYY-MM-DD
status: draft
---

# Dashboard Requirements: [Dashboard Name]

## Overview

**Dashboard Name:** [Name]
**Requestor:** [Who requested this]
**Date:** [When requirements captured]
**Priority:** [High/Medium/Low]
**Target Delivery:** [When needed]

---

## Purpose and Questions

### Primary Questions This Dashboard Answers

<!-- Frame as questions, not metrics -->

1. [Question 1 - e.g., "Are users successfully completing onboarding?"]
2. [Question 2 - e.g., "Where do users drop off in the funnel?"]
3. [Question 3 - e.g., "Which cohorts have the best retention?"]

### Decisions This Will Inform

<!-- What actions will stakeholders take based on this dashboard -->

- [Decision 1]
- [Decision 2]
- [Decision 3]

### What This Dashboard Is NOT For

<!-- Clarify scope boundaries -->

- [Out of scope item 1]
- [Out of scope item 2]

---

## Audience

| Audience | Usage Frequency | Primary Questions |
|----------|-----------------|-------------------|
| [Role/Team 1] | [Daily/Weekly/Monthly] | [What they care about] |
| [Role/Team 2] | [Daily/Weekly/Monthly] | [What they care about] |
| [Role/Team 3] | [Daily/Weekly/Monthly] | [What they care about] |

### Usage Context

**When will this be viewed?**
[E.g., "Weekly team meeting review", "Daily morning check", "Monthly board prep"]

**What device/format?**
[E.g., "Desktop browser", "TV screen in office", "Mobile for on-the-go"]

---

## Key Metrics

### Metric 1: [Metric Name]

| Attribute | Value |
|-----------|-------|
| **Business Definition** | [Plain language explanation] |
| **Calculation** | [Formula: numerator / denominator, etc.] |
| **Data Source** | [Where data comes from] |
| **Granularity** | [Daily/Weekly/Monthly] |
| **Current Baseline** | [Current value if known] |
| **Target** | [Goal value] |
| **Notes** | [Edge cases, known issues] |

### Metric 2: [Metric Name]

| Attribute | Value |
|-----------|-------|
| **Business Definition** | [Plain language explanation] |
| **Calculation** | [Formula: numerator / denominator, etc.] |
| **Data Source** | [Where data comes from] |
| **Granularity** | [Daily/Weekly/Monthly] |
| **Current Baseline** | [Current value if known] |
| **Target** | [Goal value] |
| **Notes** | [Edge cases, known issues] |

### Metric 3: [Metric Name]

| Attribute | Value |
|-----------|-------|
| **Business Definition** | [Plain language explanation] |
| **Calculation** | [Formula: numerator / denominator, etc.] |
| **Data Source** | [Where data comes from] |
| **Granularity** | [Daily/Weekly/Monthly] |
| **Current Baseline** | [Current value if known] |
| **Target** | [Goal value] |
| **Notes** | [Edge cases, known issues] |

### Metrics Summary Table

| Metric | Definition | Source | Target |
|--------|------------|--------|--------|
| [Metric 1] | [Short definition] | [Source] | [Target] |
| [Metric 2] | [Short definition] | [Source] | [Target] |
| [Metric 3] | [Short definition] | [Source] | [Target] |
| [Metric 4] | [Short definition] | [Source] | [Target] |

---

## Visualization Specifications

### Chart 1: [Chart Title]

| Attribute | Value |
|-----------|-------|
| **Purpose** | [What question this answers] |
| **Chart Type** | [Line/Bar/Pie/Table/etc.] |
| **X-Axis** | [Dimension - e.g., Date, Category] |
| **Y-Axis** | [Metric(s)] |
| **Series/Breakdown** | [How data is grouped] |
| **Interactivity** | [Tooltips, drill-down, click actions] |
| **Position** | [Top-left, prominent, etc.] |

### Chart 2: [Chart Title]

| Attribute | Value |
|-----------|-------|
| **Purpose** | [What question this answers] |
| **Chart Type** | [Line/Bar/Pie/Table/etc.] |
| **X-Axis** | [Dimension - e.g., Date, Category] |
| **Y-Axis** | [Metric(s)] |
| **Series/Breakdown** | [How data is grouped] |
| **Interactivity** | [Tooltips, drill-down, click actions] |
| **Position** | [Top-left, prominent, etc.] |

### Chart 3: [Chart Title]

| Attribute | Value |
|-----------|-------|
| **Purpose** | [What question this answers] |
| **Chart Type** | [Line/Bar/Pie/Table/etc.] |
| **X-Axis** | [Dimension - e.g., Date, Category] |
| **Y-Axis** | [Metric(s)] |
| **Series/Breakdown** | [How data is grouped] |
| **Interactivity** | [Tooltips, drill-down, click actions] |
| **Position** | [Top-left, prominent, etc.] |

### Dashboard Layout Sketch

<!-- ASCII layout or link to mockup -->

```
┌─────────────────────────────────────────────────┐
│  [KPI Card 1]  [KPI Card 2]  [KPI Card 3]      │
├────────────────────────┬────────────────────────┤
│                        │                        │
│   [Chart 1: Trend]     │   [Chart 2: Funnel]   │
│                        │                        │
├────────────────────────┴────────────────────────┤
│                                                 │
│            [Chart 3: Detailed Table]            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Filters and Segments

### Global Filters

<!-- Filters that apply to entire dashboard -->

| Filter | Type | Default Value | Options |
|--------|------|---------------|---------|
| Date Range | Date picker | Last 30 days | Custom, presets |
| [Filter 2] | [Dropdown/Multi-select] | [Default] | [Options] |
| [Filter 3] | [Dropdown/Multi-select] | [Default] | [Options] |

### Chart-Specific Filters

<!-- Filters for individual charts -->

| Chart | Filter | Type |
|-------|--------|------|
| [Chart 1] | [Filter] | [Type] |
| [Chart 2] | [Filter] | [Type] |

### Segment Definitions

<!-- Pre-defined segments for analysis -->

| Segment Name | Definition | Use Case |
|--------------|------------|----------|
| [Segment 1] | [Criteria] | [When to use] |
| [Segment 2] | [Criteria] | [When to use] |

---

## Data Sources

### Primary Sources

| Source | Type | Owner | Latency | Quality Notes |
|--------|------|-------|---------|---------------|
| [Source 1] | [Database/API/File] | [Team] | [Real-time/Daily/etc.] | [Known issues] |
| [Source 2] | [Database/API/File] | [Team] | [Real-time/Daily/etc.] | [Known issues] |

### Data Pipeline Requirements

**Refresh Frequency:** [Real-time / Hourly / Daily / Weekly]
**Refresh Time:** [When refresh should complete, e.g., "by 6am UTC"]
**Historical Data Needed:** [How far back, e.g., "Last 12 months"]
**Data Retention:** [How long to keep, e.g., "Rolling 2 years"]

### Data Quality Considerations

- [Known data quality issue 1 and how to handle]
- [Known data quality issue 2 and how to handle]

---

## Access and Permissions

### Access Levels

| Role/Group | Access Level | Restrictions |
|------------|--------------|--------------|
| [Group 1] | Full access | None |
| [Group 2] | View only | Cannot export |
| [Group 3] | Limited | Only sees [section] |

### Sensitive Data

| Data Element | Sensitivity | Handling |
|--------------|-------------|----------|
| [Element 1] | [PII/Confidential/etc.] | [Mask/Aggregate/Restrict] |

---

## Alerts and Thresholds

<!-- Optional: automated notifications -->

| Condition | Threshold | Action | Recipients |
|-----------|-----------|--------|------------|
| [Metric 1] drops below | [Value] | Send email | [Who] |
| [Metric 2] exceeds | [Value] | Slack alert | [Channel] |

---

## Acceptance Criteria

<!-- How do we know the dashboard is complete and correct -->

- [ ] All metrics match definitions when spot-checked
- [ ] Filters work correctly across all charts
- [ ] Dashboard loads in under [X] seconds
- [ ] All users can access with correct permissions
- [ ] Data refreshes by [time] each day

---

## Open Questions

- [Question 1 for data team]
- [Question 2 needing clarification]

---

## Appendix

### Related Dashboards

- [Link to related dashboard 1]
- [Link to related dashboard 2]

### Reference Documents

- [Link to metric definitions]
- [Link to data dictionary]

---

*Requirements version 1.0. Update as needs evolve.*
