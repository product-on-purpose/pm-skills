---
name: measure-dashboard-requirements
description: Specifies what questions a dashboard must answer and the metrics, visualizations, filters, and data sources it needs, so data teams build something that informs decisions rather than displaying numbers. Use when requesting a dashboard or formalizing ad-hoc reporting. For the event tracking that feeds the dashboard, use measure-instrumentation-spec instead; instrument first, visualize second.
license: Apache-2.0
metadata:
  phase: measure
  version: "2.2.0"
  updated: 2026-07-04
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Dashboard Requirements

A dashboard requirements document specifies what questions a dashboard should answer, what metrics it displays, and how data should be visualized. Clear requirements help data teams build dashboards that actually inform decisions rather than just displaying numbers.

## When to Use

- When requesting a new dashboard from data/analytics teams
- To define KPI tracking for a product, feature, or team
- When formalizing ad-hoc reporting into a persistent dashboard
- Before quarterly planning to specify what visibility you need
- When onboarding stakeholders who need self-serve analytics

## When NOT to Use

- You need the event tracking that feeds dashboards -> use `measure-instrumentation-spec`; instrument first, visualize second
- You are designing an experiment readout, not a standing dashboard -> use `measure-experiment-design` and `measure-experiment-results`
- You want OKR progress scored at cycle close -> use `measure-okr-grader`
- The questions the dashboard should answer are not yet agreed -> frame outcomes first with `foundation-okr-writer` or `define-problem-statement`

## Instructions

When asked to specify dashboard requirements, follow these steps:

1. **Define the Purpose**
   Start with the questions this dashboard should answer, not the charts it should show. What decisions will this dashboard inform? A dashboard without clear purpose becomes a vanity metrics display.

2. **Identify the Audience**
   Specify who will use this dashboard, how often, and in what context. An executive weekly review has different needs than a team's daily standup board.

3. **Specify Key Metrics**
   For each metric, document: name, business definition (in plain language), calculation formula, data source, and baseline/target values. Ambiguous metrics lead to misaligned dashboards.

4. **Design Visualizations**
   Recommend chart types based on what the data should communicate. Time trends need line charts; comparisons need bar charts; compositions need pie/treemaps. Include dimension breakdowns.

5. **Define Filters and Segments**
   Specify what drill-downs users need: date ranges, user segments, product areas, geographic regions. Anticipate the "slice and dice" questions users will ask.

6. **Document Data Sources**
   Identify where data comes from and any known data quality issues. Note latency requirements.does the dashboard need real-time data or is daily refresh sufficient?

7. **Set Permissions and Access**
   Determine who can view what. Some metrics may need restricted access. Consider both security requirements and organizational politics.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete spec fills every template section: Overview; Purpose and Questions; Audience; Key Metrics; Visualization Specifications; Filters and Segments; Data Sources; Access and Permissions; Alerts and Thresholds; Acceptance Criteria; Open Questions; and Appendix.

## Quality Checklist

Before finalizing, verify:

- [ ] Purpose is framed as questions to answer, not charts to build
- [ ] All metrics have clear definitions and calculation formulas
- [ ] Data sources are identified and accessible
- [ ] Visualization choices match the type of insight needed
- [ ] Filters enable the drill-downs users will want
- [ ] Refresh frequency matches decision-making cadence

## Examples

See `references/EXAMPLE.md` for a completed example.
