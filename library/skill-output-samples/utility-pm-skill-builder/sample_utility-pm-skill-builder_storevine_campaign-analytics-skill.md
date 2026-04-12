<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: skill-implementation-packet
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine B2B ecommerce platform — using the skill builder to create a campaign-analytics skill
---

## Scenario

A contributor runs the skill builder to create a "campaign-analytics" skill for defining email campaign measurement frameworks. The builder checks overlap with existing measure skills, confirms the gap (no skill covers funnel metrics, cohort analysis, or attribution models), and generates a Skill Implementation Packet. [fictional]

---

## Prompt

```
/pm-skill-builder

Idea: A skill for defining email campaign measurement frameworks -- funnel metrics (sent > delivered > opened > clicked > converted), cohort comparison, and revenue attribution. Existing measure skills handle dashboards and event tracking but not campaign-specific analytics frameworks.
```

---

## Output

# Skill Implementation Packet: campaign-analytics

> **Created**: 2026-04-11
> **Builder version**: 1.0.0
> **Status**: Draft

## Decision

Create new skill.

Why Gate evidence: (1) `/dashboard-requirements` produced a dashboard spec but skipped funnel definition and attribution; (2) `/instrumentation-spec` produced event schemas but not the analytical framework connecting events to outcomes; (3) `/experiment-design` assumed A/B test structure rather than ongoing measurement. [fictional]

## Classification

| Field | Value |
|-------|-------|
| Type | domain |
| Phase | measure |
| Directory | measure-campaign-analytics |
| Command | /campaign-analytics |

## Overlap Analysis

### Existing skills checked

measure-dashboard-requirements, measure-instrumentation-spec, measure-experiment-design, measure-experiment-results, deliver-acceptance-criteria, define-hypothesis

### Findings

Existing skills assume the PM already knows which metrics matter or are scoped to A/B tests. None address funnel definition, cohort segmentation, or revenue attribution. [fictional]

### Why this skill is still needed

Fills the gap between "we need to measure campaigns" and "here is the dashboard spec" -- produces the analytical foundation that feeds downstream skills. [fictional]

## Quality Forecast

| Zone | Weight | Description |
|------|--------|-------------|
| Knowledge (K) | 35 | Funnel metrics, attribution models, cohort analysis |
| Process (P) | 40 | Step-by-step framework definition |
| Constraint (C) | 15 | Vanity metric guardrails and attribution pitfalls |
| Wisdom (W) | 10 | Attribution model selection judgment |

**Dominant zone**: Process (40%). **Exemplars**: `measure-dashboard-requirements`, `measure-instrumentation-spec`.

## Draft Frontmatter

```yaml
---
name: campaign-analytics
description: Defines a measurement framework for email campaign performance covering funnel metrics, cohort analysis, KPI specification, and revenue attribution.
phase: measure
version: "1.0.0"
updated: 2026-04-11
license: Apache-2.0
metadata:
  category: specification
---
```

## Draft Files (abbreviated)

**SKILL.md**: Guides PMs through defining funnel stages, KPIs, cohort comparisons, and attribution models. 6 instruction steps, output contract, quality checklist. [fictional]

**TEMPLATE.md**: 7 sections -- Campaign Context, Funnel Definition, KPI Specification, Cohort Design, Attribution Model, Data Source Mapping, Open Questions. [fictional]

**EXAMPLE.md**: Worked example (180 lines) for a B2B SaaS onboarding email sequence. [fictional]

**Command + AGENTS.md**: Standard routing to `skills/measure-campaign-analytics/SKILL.md`. [fictional]

## Validation Checklist

All 9 CI checks pass (name, description, version, updated, license, phase consistency, TEMPLATE.md sections, command path, AGENTS.md format). All 6 quality checks pass (EXAMPLE.md 180 lines, output contract, quality checklist, dominant zone identified, gap analysis on 6 skills, Why Gate names 3 prompts). [fictional]

## Next Steps

1. Review the packet and flag changes needed.
2. Run `bash scripts/lint-skills-frontmatter.sh` after promotion.
3. Test `/campaign-analytics` with a realistic scenario, then use `/pm-skill-iterate` to refine.
