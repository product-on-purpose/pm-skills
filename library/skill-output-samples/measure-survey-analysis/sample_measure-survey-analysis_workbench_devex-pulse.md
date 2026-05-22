---
title: "Measure Survey Analysis: Workbench DevEx Pulse"
description: "Workbench internal - exploratory dev-experience pulse (N=65) where the honest move is refusing to overstate a weak sample."
artifact: survey-analysis
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: workbench
context: Workbench internal dev-experience platform - exploratory pulse survey of 65 engineers, sample too small for strong inference
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Workbench platform team ran a dev-experience pulse survey and got 65 responses from engineers. They want to know what to fix. This demonstrates the **exploratory analysis** pattern with a weak sample - and the most valuable thing the analysis does is refuse to overstate it. With N=65, the data is directional only; it cannot support capital-allocation decisions. The survey is illustrative; invented data is tagged `[fictional]`.

**Source Notes:**

- Jeff Sauro and James R. Lewis, "Quantifying the User Experience" (Morgan Kaufmann) - the sample-size guidance behind the "N=65 is direction-only" stance and the refusal to imply statistical precision.
- Virginia Braun and Victoria Clarke, "Using thematic analysis in psychology" (Qualitative Research in Psychology, 2006) - the thematic-clustering method for the open-text responses, which is where a small exploratory survey delivers its real value.

---

## Prompt

```
/survey-analysis

analyze our dev-experience pulse survey. 65 engineers responded out of ~280.
mix of likert questions (rate your dev experience 1-5 across a few areas)
plus an open text "biggest friction in your day?". tell us what to prioritize.
```

---

## Output

# Survey Analysis: Workbench Dev-Experience Pulse

> Read this first: N=65 (of ~280 engineers, ~23% response). This sample is large enough to spot directional themes but too small for statistically reliable conclusions or capital-allocation decisions. Everything below is direction-only. Treat it as a signal of where to look, not as a mandate of what to fund.

## Executive Summary

Sixty-five engineers responded. The data is directional only and should not drive headcount or large investment decisions on its own. The clearest signal - consistent across the likert scores and the open text - is **slow and flaky CI** as the top friction. Local environment setup is a strong second. Confidence: Low (sample size), but the convergence of likert and open-text on the same theme raises the qualitative confidence in CI as the place to look next. The most important caveat: this is a self-selected fifth of the org.

## Survey Methodology Summary

- **Sample size (N):** 65 of ~280 engineers (~23% response `[fictional]`)
- **Recruitment method:** Slack announcement + email; voluntary
- **Who responded vs. who was invited:** Self-selected; engineers with strong feelings (especially frustrations) over-represented
- **Selection bias risks:** Voluntary response skews toward the dissatisfied; quiet-but-content engineers under-represented
- **Question-design risks:** Likert "rate your dev experience" is vague; open-text "biggest friction" prompts complaints

These choices affect interpretation: the survey is a frustration-finder, not a representative satisfaction measure.

## Per-Question Analysis

With N=65, report direction only. No margin of error is quoted because the sample and self-selection do not support implied precision.

| Q# | Question | Distribution | Confidence | What it shows | What it does NOT show |
|---|---|---|---|---|---|
| Q1 | Overall dev experience (1-5) | Mean ~2.9 `[fictional]` | Direction only | Middling sentiment | Whether it generalizes to the 215 non-respondents |
| Q2 | CI/build experience (1-5) | Mean ~2.2 `[fictional]` | Direction only | CI is the weakest area | Magnitude across the org |
| Q3 | Local env setup (1-5) | Mean ~2.5 `[fictional]` | Direction only | Second weakest | - |
| Q4 | Biggest daily friction (open text) | 58 responses `[fictional]` | Direction only | Themes below | A count that represents all engineers |

## Persona / Segment Breakdown

Segment cuts are NOT reported. Splitting 65 responses by team or tenure produces sub-segments well below n=30, which cannot support any defensible claim. If segment differences matter, they require a larger sample (see Next Steps).

## Open-Text Thematic Clustering

AI-assisted clustering of 58 open-text responses; quotes illustrative `[fictional]`. This is where a small exploratory survey earns its keep.

| Theme | Approx. mentions | Representative quotes | Valence | Note |
|---|---|---|---|---|
| Slow / flaky CI | ~30 | "I rerun CI 3 times to get a green build" `[fictional]` | Negative | Matches the low Q2 score |
| Local env setup | ~16 | "Setting up a new service eats a whole day" `[fictional]` | Negative | Matches Q3 |
| Unclear ownership / docs | ~12 | "I never know which team owns what" `[fictional]` | Negative | New theme not in likert |
| Too many tools | ~8 | "context-switching across 5 dashboards" `[fictional]` | Negative | Minor |
| Things are fine | ~5 | "honestly it's pretty good" `[fictional]` | Positive | Under-represented by design |

Convergence note: CI is both the lowest likert score (Q2) and the most-mentioned open-text theme. When two independent measures point the same way, the qualitative confidence in that direction rises even though the sample is small.

## Hypothesis Validation

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| CI is the top friction | SUPPORTED (directionally) | Lowest likert + top open-text theme converge | Low (N=65) but cross-measure consistent |
| We can rank the full friction list reliably | NOT TESTED BY THIS SURVEY | Sample too small to rank beyond the top 1-2 | - |

## What the Data Does NOT Show

- **Population not represented:** The ~215 engineers who did not respond; content engineers especially
- **Questions not answered:** How much time CI friction actually costs; whether fixing it would change retention or velocity
- **Confounds:** Voluntary response skews toward the frustrated
- **Follow-up that would close the biggest gap:** A larger, randomized or census survey, and CI telemetry (actual build times, flake rates)

## Prioritized Recommendations

| # | Recommendation | Evidence | Confidence | Counter-evidence | Research that would strengthen it |
|---|---|---|---|---|---|
| 1 | Investigate CI flakiness with telemetry before funding a fix | Convergent top theme | Low-Medium | Self-selected sample | CI build-time and flake-rate data |
| 2 | Run a larger pulse to make this decision-grade | N=65 is direction-only | High (on the method) | Costs time | A near-census of the ~280-engineer org (target n approx 200, ~70% response) |
| 3 | Do NOT reallocate headcount on this survey alone | Sample size | High | Pressure to act fast | Combine survey + telemetry |

## Next Steps

- Pull CI telemetry now (build times, flake rates) - behavioral data will confirm or deny the survey signal at far higher confidence than 65 self-reports
- Run a follow-up quarterly dev-experience survey as a near-census of the ~280-engineer org (target n approx 200, ~70% response) so segment cuts and a full friction ranking become possible
- This analysis can tell you where to look (CI); it explicitly cannot justify capital allocation or headcount on its own
