---
title: "Survey Analysis"
description: "Analyze survey results into actionable PM insights. Produces persona segmentation, hypothesis validation status, thematic clustering of open-text responses, statistical confidence labels, prioritized recommendations, and what-NOT-to-conclude warnings. Refuses to overstate statistical significance from weak samples or biased instruments."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Measure
  - research
---

:::note[Quick facts]
**Phase:** Measure | **Version:** 1.0.0 | **Category:** research | **License:** Apache-2.0
:::

**Try it:** `/survey-analysis "Your context here"`

You analyze survey results into actionable PM insights. Your job is to (a) honestly characterize what the data shows, (b) flag what it does NOT show, (c) identify themes in open-text responses, (d) connect findings to hypotheses, and (e) produce prioritized recommendations.

## How to Use

Use the `/survey-analysis` slash command:

```
/survey-analysis "Your context here"
```

Or reference the skill file directly: `skills/measure-survey-analysis/SKILL.md`

## Output Template

# Survey Analysis: [Survey Name]

## Executive Summary
<!-- 3-5 sentences: the 2-3 things the data clearly shows, a confidence label, the single most important caveat -->

[Summary]

## Survey Methodology Summary
<!-- What you were told vs. what was done. These choices bound what conclusions are possible. -->

- **Sample size (N):** [N] (response rate: [X%] if known)
- **Recruitment method:** [Panel / customer email / in-product / social]
- **Who responded vs. who was invited:** [Distribution]
- **Selection bias risks:** [Who is over/under-represented and why]
- **Question-design risks:** [Leading, double-barreled, response-option bias]

## Per-Question Analysis
<!-- Confidence is qualitative and tied to sample size. n<100 = direction only; n<30 per segment = too small. Margin-of-error brackets are approximate, not computed precision. -->

| Q# | Question | Distribution (counts / %) | Confidence | What it shows | What it does NOT show |
|---|---|---|---|---|---|
| Q1 | [Question] | [Counts] | [Direction-only / Medium / High] | [Reading] | [Caveat] |

## Persona / Segment Breakdown
<!-- Flag any segment with n<30. Identify segments that diverge from the overall pattern. -->

| Segment | n | Key difference from overall | Confidence |
|---|---|---|---|
| [Segment] | [n] | [Difference] | [Flag if n<30] |

## Open-Text Thematic Clustering
<!-- Quotes drawn ONLY from provided excerpts, never invented. Mention counts are approximate. Flag clustering as AI-assisted. -->

| Theme | Approx. mentions | Representative quotes (from provided excerpts) | Valence | Contradicts quant pattern? |
|---|---|---|---|---|
| [Theme 1] | [~N] | "[quote]" | [+/-/mixed] | [Yes/No] |

## Hypothesis Validation

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| [H1] | [SUPPORTED / CONTRADICTED / INCONCLUSIVE / NOT-TESTED] | [Question / theme] | [High/Medium/Low] |

## What the Data Does NOT Show
<!-- Be explicit and specific -->

- **Population not represented:** [Who]
- **Questions not answered:** [What]
- **Confounds:** [What could distort the reading]
- **Follow-up that would close the biggest gap:** [Research]

## Prioritized Recommendations

| # | Recommendation | Evidence | Confidence | Counter-evidence | Research that would strengthen it |
|---|---|---|---|---|---|
| 1 | [Recommendation] | [Q/theme] | [H/M/L] | [If any] | [What] |

## Next Steps

- [Next artifact: update PRD / trigger follow-up survey / commission interviews]
- [Decisions this can inform; decisions it cannot]

## Example Output

<details>
<summary>Survey Analysis: AI Notes-to-Tasks Adoption Survey</summary>

# Survey Analysis: AI Notes-to-Tasks Adoption Survey

> This is an illustrative survey analysis. All response counts, percentages, and open-text quotes are fictional `[fictional]` stand-ins for what real survey data would look like.

## Executive Summary

We surveyed users to test the hypothesis that they would adopt an AI feature converting meeting notes into tasks (N=240, in-product prompt). Stated interest is high (78% said they would use it), but two things temper that: the key question is mildly leading, and the open-text reveals a strong accuracy/trust concern that the quantitative number hides. The honest verdict is **INCONCLUSIVE leaning supported**: there is real demand signal, but stated intent from a power-user-biased sample is not proof of adoption. Confidence: Medium. The most important caveat: this measures what users say, not what they will do.

## Survey Methodology Summary

- **Sample size (N):** 240 (response rate ~6% from ~4,000 in-app prompts)
- **Recruitment method:** In-product banner shown to users who opened a project in the last 7 days
- **Who responded vs. who was invited:** Active users only; dormant and churned users had no chance to respond
- **Selection bias risks:** Active/power users are over-represented; people who do not take meeting notes self-selected out, inflating interest
- **Question-design risks:** Q2 ("Would you use an AI feature that automatically turns your messy meeting notes into organized tasks?") is mildly leading - it pairs a pain ("messy") with a benefit ("organized")

These methodology choices affect what conclusions can be drawn: this is a directional read from engaged users, not a representative adoption forecast.

## Per-Question Analysis

| Q# | Question | Distribution | Confidence | What it shows | What it does NOT show |
|---|---|---|---|---|---|
| Q1 | How often do you take meeting notes in the product? | Weekly 41% / Sometimes 38% / Never 21% | Medium (N=240) | A majority take notes at least sometimes | Whether note-takers are the buyers |
| Q2 | Would you use an AI notes-to-tasks feature? | Yes 78% / Maybe 16% / No 6% | Medium, flagged Biased | Strong stated interest | Real adoption; the wording is leading |
| Q3 | What would stop you from using it? (open text) | 142 responses | Medium | Accuracy and trust concerns dominate | Magnitude of the concern at scale |
| Q4 | Plan tier (segmentation) | Free 90 / Pro 110 / Enterprise 40 | - | Enables segment cuts | - |

> Q2 is reported but flagged Biased. Based on instrument-bias patterns, leading questions of this kind typically overstate intent; treat the 78% as an optimistic ceiling, not a forecast.

## Persona / Segment Breakdown

| Segment | n | Key difference from overall | Confidence |
|---|---|---|---|
| Free | 90 | 71% "yes" on Q2; most accuracy-skeptical in open text | Medium |
| Pro | 110 | 82% "yes"; highest note-taking frequency | Medium |
| Enterprise | 40 | 80% "yes" but raised data-privacy concerns | Low (n=40) |
| Enterprise admins (sub-segment) | 12 | Privacy concern concentrated here | Too small (n<30) - directional only |

The Enterprise admin sub-segment (n=12) is below the threshold for a defensible claim; the privacy signal there is a flag to investigate, not a finding.

## Open-Text Thematic Clustering

AI-assisted clustering of the 142 Q3 responses; quotes are drawn from the provided open-text excerpts. Mention counts are approximate.

| Theme | Approx. mentions | Representative quotes | Valence | Contradicts quant pattern? |
|---|---|---|---|---|
| Accuracy / trust | ~64 | "I would not trust it to capture action items correctly"; "if it misses a task that is worse than no feature" | Negative | Yes - tempers the 78% yes |
| Editing control | ~38 | "I would want to review and edit before it creates anything" | Conditional | Partially |
| Privacy / data handling | ~22 | "where do my meeting notes get sent?" | Negative | Concentrated in Enterprise |
| Time saved | ~26 | "this would save me 20 minutes after every standup" | Positive | Reinforces |

The accuracy/trust theme is the most valuable signal: it contradicts the upbeat Q2 number and predicts that adoption hinges on perceived reliability, not on interest.

## Hypothesis Validation

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| Users would adopt an AI notes-to-tasks feature | INCONCLUSIVE (leaning supported) | Q2 stated interest high (but leading + biased sample); open-text shows adoption is gated on accuracy/trust | Medium |
| Users will pay more for it | NOT TESTED BY THIS SURVEY | No pricing or willingness-to-pay question was asked | - |

## What the Data Does NOT Show

- **Population not represented:** Dormant and churned users (only active users were prompted); non-note-takers self-selected out
- **Questions not answered:** Willingness to pay; whether stated intent converts to actual usage
- **Confounds:** Q2 wording inflates intent; in-product recruitment inflates the engaged-user signal
- **Follow-up that would close the biggest gap:** A prototype with real usage measurement (does stated 78% interest convert to actual use?), and a neutrally-worded re-ask of Q2

## Prioritized Recommendations

| # | Recommendation | Evidence | Confidence | Counter-evidence | Research that would strengthen it |
|---|---|---|---|---|---|
| 1 | Prototype and measure actual usage before full build | Stated intent is high but unproven; trust theme | Medium | The 78% could be real demand | A behavioral pilot with usage telemetry |
| 2 | Make accuracy and edit-before-commit the headline design constraint | Accuracy/trust is the top open-text theme | High | None | Usability test of an editable draft flow |
| 3 | Address Enterprise data handling explicitly | Privacy theme concentrated in Enterprise | Low (small n) | n=40, sub-segment n=12 | Targeted Enterprise-admin interviews |
| 4 | Re-ask the adoption question with neutral wording | Q2 is leading | Medium | - | A/B the question wording in the next pulse |

## Next Steps

- Build a prototype and instrument actual usage; do not commit the full feature on stated intent
- Commission 5-8 interviews to deepen the accuracy/trust theme (skill: `discover-interview-synthesis`)
- This analysis can inform whether to prototype; it cannot, on its own, justify a full build or a pricing decision

</details>

## Real-World Examples

See this skill applied to three different product contexts:

<details>
<summary>Storevine (B2B): Storevine B2B forecasting platform - feature-prioritization survey of 180 customer admins, segmented by company size</summary>

**Prompt:**

```
/survey-analysis

analyze our storevine feature-prioritization survey. 180 customer admins
responded. we asked them to rate 5 candidate features by importance and pick
their #1.

our hypotheses going in:
- H1: multi-warehouse support is the top ask
- H2: seasonal-adjustment accuracy is a close second

segment by company size (we captured it). tell us what to build next.
```

---

**Output:**

# Survey Analysis: Storevine Next-Feature Validation

</details>

<details>
<summary>Brainshelf (Consumer): Brainshelf consumer subscription - quarterly NPS survey (N=1200) with an open-text follow-up</summary>

**Prompt:**

```
/survey-analysis

analyze our Q2 brainshelf NPS survey. 1200 subscribers responded. standard
NPS question (0-10) plus an open text "what's the one thing you'd change?"
last quarter's NPS was 18. mine the open text for what we should build next.
```

---

**Output:**

# Survey Analysis: Brainshelf Q2 NPS Pulse

</details>

<details>
<summary>Workbench (Enterprise): Workbench internal dev-experience platform - exploratory pulse survey of 65 engineers, sample too small for strong inference</summary>

**Prompt:**

```
/survey-analysis

analyze our dev-experience pulse survey. 65 engineers responded out of ~280.
mix of likert questions (rate your dev experience 1-5 across a few areas)
plus an open text "biggest friction in your day?". tell us what to prioritize.
```

---

**Output:**

# Survey Analysis: Workbench Dev-Experience Pulse

> Read this first: N=65 (of ~280 engineers, ~23% response). This sample is large enough to spot directional themes but too small for statistically reliable conclusions or capital-allocation decisions. Everything below is direction-only. Treat it as a signal of where to look, not as a mandate of what to fund.

</details>

## Quality Checklist

Before finalizing, verify:

- [ ] Methodology summary audits sample size, recruitment, and question-design risks
- [ ] Every confidence label is qualitative and tied to sample size (no implied computed precision)
- [ ] Segment claims with n < 30 are flagged as too small
- [ ] Open-text quotes are drawn only from provided excerpts, never invented
- [ ] Each hypothesis gets a status, including "Not tested by this survey" where applicable
- [ ] A "what the data does NOT show" section is present and specific
- [ ] No causal claim is made from cross-sectional data
- [ ] Recommendations carry confidence labels and counter-evidence
