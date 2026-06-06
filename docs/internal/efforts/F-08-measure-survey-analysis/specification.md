# Specification: measure-survey-analysis

## Overview

A measure-phase skill that guides PMs through structured analysis of survey results - from raw response data to segmented insights, hypothesis validation, statistical interpretation, and prioritized recommendations. Fills the gap between `measure-experiment-results` (A/B test focused) and the broader world of customer surveys, NPS studies, feature-request polls, and satisfaction benchmarks.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | measure-survey-analysis |
| Phase | measure |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Category | research |
| Audience | Product Managers |

## Design Principles

### 1. Segment Before You Summarize
Top-line averages hide the story. Every analysis must segment responses by at least one persona or cohort dimension before drawing conclusions. The skill enforces segmentation as a required step, not an optional enhancement.

### 2. Hypotheses Drive the Analysis
Surveys without pre-stated hypotheses produce trivia, not insight. The skill requires the PM to articulate what they expected to learn before diving into the data. Results are then framed as hypothesis validation (confirmed, refuted, or inconclusive) rather than undirected exploration.

### 3. Statistical Honesty
PMs are not statisticians, but they must know when a result is noise vs. signal. The skill provides accessible guidance on confidence levels, sample size adequacy, and margin of error - using plain language and decision rules rather than formulas.

### 4. Recommendations Over Reports
The output is not a data dump. Every analysis culminates in prioritized, actionable recommendations tied to specific findings. "Here's what the data says" is necessary; "here's what we should do" is the point.

---

## File Architecture

```
skills/measure-survey-analysis/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── survey-analysis.md
```

### SKILL.md (~180-220 lines)

**Frontmatter:**
```yaml
name: measure-survey-analysis
description: >-
  Analyzes survey results with persona segmentation, hypothesis validation,
  statistical significance assessment, and prioritized recommendations.
  Complements measure-experiment-results (A/B focused) with broader survey
  and research analysis for NPS, CSAT, feature polls, and discovery surveys.
phase: measure
version: "1.0.0"
updated: YYYY-MM-DD
license: Apache-2.0
metadata:
  category: research
  frameworks:
    - triple-diamond
    - lean-startup
  author: product-on-purpose
```

**Sections:**

1. **When to Use** (~10 lines)
   - Analyzing completed survey results (NPS, CSAT, feature polls, discovery surveys)
   - Validating hypotheses with quantitative + qualitative survey data
   - Segmenting responses by persona, cohort, or behavioral dimension
   - Translating survey findings into product decisions

2. **When NOT to Use** (~8 lines)
   - Designing the survey itself (out of scope - this skill analyzes results, not instruments)
   - Analyzing A/B test or experiment results (use `measure-experiment-results`)
   - Processing interview transcripts (use `discover-interview-synthesis`)
   - Statistical modeling or advanced regression (requires specialized tools)

3. **Core Concepts** (~25 lines)
   - **Hypothesis-driven analysis** - state what you expected, then compare to actuals
   - **Segmentation dimensions** - persona, tenure, plan tier, geography, behavior cohort
   - **Statistical adequacy** - sample size thresholds, confidence levels in plain language
   - **Response bias awareness** - non-response bias, self-selection, recency bias, acquiescence bias
   - **Qualitative coding** - extracting themes from open-ended responses

4. **Instructions** (~35 lines, numbered steps)
   1. State the survey context - what was asked, who was surveyed, when, response rate
   2. Declare hypotheses - 2-5 things you expected to learn or validate
   3. Assess data quality - sample size adequacy, response rate, potential biases
   4. Segment the data - break responses by at least one meaningful dimension
   5. Analyze quantitative results - distributions, cross-tabs, significance assessment
   6. Code qualitative responses - theme extraction from open-ended answers
   7. Validate hypotheses - confirmed / refuted / inconclusive for each
   8. Synthesize findings - 3-5 key insights, each grounded in specific data
   9. Prioritize recommendations - actions ranked by confidence level and expected impact
   10. Document limitations - what the survey cannot tell you

5. **Output Contract** (~10 lines)
   - References TEMPLATE.md as the deliverable format
   - Specifies required sections: context, hypotheses, data quality, segmented findings, hypothesis validation, recommendations, limitations
   - Final output: a structured survey analysis report ready for stakeholder review

6. **Quality Checklist** (~15 lines)
   - [ ] At least one segmentation dimension applied
   - [ ] Every hypothesis marked confirmed, refuted, or inconclusive with supporting data
   - [ ] Sample size and response rate documented
   - [ ] Statistical significance noted where claims are made (even if informal)
   - [ ] Open-ended responses coded into themes (not cherry-picked quotes)
   - [ ] Recommendations are prioritized and tied to specific findings
   - [ ] Limitations section acknowledges what the data cannot answer
   - [ ] No claims beyond what the sample supports

7. **Companion Skills** (~5 lines)
   - `measure-experiment-results` - for controlled A/B tests
   - `discover-interview-synthesis` - for qualitative interview data
   - `foundation-persona` - for persona-based segmentation dimensions
   - `measure-dashboard-requirements` - for ongoing metric tracking from survey insights

---

### references/TEMPLATE.md (~60-80 lines)

A structured survey analysis report template. Sections:

1. **Survey Context** - Survey name, objective, audience, distribution method, date range, total responses, response rate
2. **Hypotheses** - Numbered list of pre-stated expectations (H1, H2, ...) with rationale
3. **Data Quality Assessment** - Sample size adequacy table (segment / n / adequate?), response rate evaluation, identified biases
4. **Segmented Findings** - For each segment: key metrics, notable distributions, cross-tabulations. Table format preferred.
5. **Qualitative Theme Analysis** - Themes extracted from open-ended responses with frequency counts and representative quotes
6. **Hypothesis Validation** - Table: hypothesis / verdict (confirmed/refuted/inconclusive) / supporting evidence / confidence level
7. **Key Insights** - 3-5 synthesized insights, each with: the insight statement, supporting data points, affected segments
8. **Prioritized Recommendations** - Ranked list: recommendation / confidence / expected impact / effort / linked insight
9. **Limitations & Open Questions** - What the survey cannot answer, suggested follow-up research

---

### references/EXAMPLE.md (~250-350 lines)

A worked example: **PM analyzing a post-launch NPS survey for a B2B SaaS feature release**.

Demonstrates the full TEMPLATE workflow:

1. **Context** - NPS survey sent to 2,000 active users 30 days after a dashboard redesign launch; 412 responses (20.6% response rate)
2. **Hypotheses** - H1: NPS will increase vs. pre-launch baseline; H2: Power users (daily login) will rate higher than casual users; H3: Mobile users will report lower satisfaction due to known responsive issues
3. **Data Quality** - Adequate sample overall, but mobile segment (n=47) is underpowered for standalone conclusions
4. **Segmented Findings** - Breaks results by usage frequency (daily/weekly/monthly), platform (desktop/mobile), and plan tier (free/pro/enterprise). Shows cross-tab tables.
5. **Qualitative Themes** - Codes 89 open-ended responses into 5 themes: navigation improvement (34%), missing feature complaints (22%), performance praise (19%), onboarding confusion (15%), other (10%)
6. **Hypothesis Validation** - H1 confirmed (NPS +8), H2 confirmed (power users +12 vs casual +3), H3 inconclusive (small sample)
7. **Recommendations** - Prioritized: (1) Invest in onboarding flow for new dashboard, (2) Address top 3 missing feature complaints, (3) Expand mobile sample for follow-up survey
8. **Limitations** - Self-selection bias in respondents, mobile segment underpowered, no pre-launch qualitative baseline

Each section shows the filled template with realistic data and explains the analytical reasoning.

---

### commands/survey-analysis.md

```yaml
---
name: survey-analysis
description: Analyze survey results with segmentation, hypothesis validation, and prioritized recommendations
skill: measure-survey-analysis
---
```

Body: brief instruction to invoke the skill with context about the survey to analyze.

---

## Differentiation Notes

This skill complements `measure-experiment-results` without overlapping:
- **experiment-results** assumes controlled variants (A vs B), statistical test selection, and causal inference
- **survey-analysis** handles uncontrolled observational data, multi-question instruments, open-ended coding, and persona segmentation
- Both share the hypothesis validation pattern but apply it differently

## Acceptance Criteria

1. **Given** a PM has survey results with 100+ responses, **when** they follow the SKILL.md instructions, **then** the output includes at least one segmentation dimension, hypothesis validation verdicts, and prioritized recommendations.

2. **Given** a survey with open-ended responses, **when** the qualitative coding step is applied, **then** responses are grouped into themes with frequency counts rather than presented as cherry-picked quotes.

3. **Given** a segment with fewer than 30 responses, **when** statistical claims are made about that segment, **then** the analysis flags the sample as underpowered and marks conclusions as inconclusive.

4. **Given** a PM has no pre-stated hypotheses, **when** they begin the analysis, **then** the skill prompts them to articulate at least two hypotheses before proceeding to data analysis.

5. **Given** a completed analysis, **when** a stakeholder reads the recommendations section, **then** each recommendation links to a specific finding and includes a confidence level.
