---
title: "Measure Survey Analysis: Brainshelf NPS Pulse"
description: "Brainshelf B2C - NPS tracking analysis with open-text thematic clustering; NPS as a trend signal, not a feature roadmap."
artifact: survey-analysis
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: brainshelf
context: Brainshelf consumer subscription - quarterly NPS survey (N=1200) with an open-text follow-up
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf runs a quarterly NPS survey. This quarter, 1,200 subscribers responded, including an open-text "what would you change?" follow-up. The PM wants the analysis to mine open-text for roadmap signal. This demonstrates the **tracking analysis** pattern plus open-text clustering, and it models the discipline that NPS is a trend metric, not a roadmap. The survey is illustrative; invented numbers and quotes are tagged `[fictional]`.

**Source Notes:**

- Fred Reichheld, "The One Number You Need to Grow" (Harvard Business Review, 2003) - the origin of NPS and the explicit framing of it as a loyalty/growth tracking metric, which underpins the "NPS does not tell us what to build" caveat here.
- Virginia Braun and Victoria Clarke, "Using thematic analysis in psychology" (Qualitative Research in Psychology, 2006) - the thematic-clustering method applied to the open-text responses, including the discipline of grounding themes in actual response excerpts.

---

## Prompt

```
/survey-analysis

analyze our Q2 brainshelf NPS survey. 1200 subscribers responded. standard
NPS question (0-10) plus an open text "what's the one thing you'd change?"
last quarter's NPS was 18. mine the open text for what we should build next.
```

---

## Output

# Survey Analysis: Brainshelf Q2 NPS Pulse

## Executive Summary

NPS rose to 22 this quarter from 18 last quarter (+4), driven by a drop in detractors `[fictional]`. With N=1,200 the trend is reliable. But NPS tells us sentiment is improving, not what to build - that signal is in the open text, where the dominant theme is **recommendation quality consistency** (the recs are great sometimes and generic other times). Confidence: High on the trend, Medium on the roadmap implications. The most important caveat: NPS is a tracking metric; the roadmap signal comes from the open-text themes, not the score.

## Survey Methodology Summary

- **Sample size (N):** 1,200 responses (response rate ~14% of active subscribers `[fictional]`)
- **Recruitment method:** Email to all active subscribers
- **Who responded vs. who was invited:** Slight skew toward more engaged subscribers (typical for email NPS)
- **Selection bias risks:** Churned subscribers are absent; the most dissatisfied may have already left, so NPS is likely flattering
- **Question-design risks:** Standard NPS wording; the open-text "one thing you'd change" biases toward complaints over praise

These choices affect interpretation: the trend is trustworthy, but the absolute score is optimistic because churned detractors are gone.

## Per-Question Analysis

| Q# | Question | Distribution | Confidence | What it shows | What it does NOT show |
|---|---|---|---|---|---|
| Q1 | Likelihood to recommend (0-10) | Promoters 42% / Passives 38% / Detractors 20% -> NPS 22 `[fictional]` | High (N=1200) | Sentiment improving vs. last quarter (NPS 18) | Why; or what to build |
| Q2 | One thing you would change (open text) | 870 responses `[fictional]` | Medium | Roadmap themes (below) | Magnitude of each theme at full-base scale |

NPS trend: 18 -> 22 over one quarter `[fictional]`. With N=1,200 both quarters, a 4-point move is suggestive of a real shift, but NPS is only comparable when response composition is consistent quarter-over-quarter, which is hard to verify here (response rate ~14%, churned subscribers absent). Treat it as directional improvement, not a confirmed significant change.

## Persona / Segment Breakdown

| Segment | n | NPS | Note |
|---|---|---|---|
| Monthly plan | 740 `[fictional]` | 19 | Lower loyalty |
| Annual plan | 460 `[fictional]` | 27 | More committed |

Annual subscribers are meaningfully more loyal, consistent with self-selection (people who pre-commit a year are more bought-in). Both segments exceed n=30, so the split is defensible.

## Open-Text Thematic Clustering

AI-assisted clustering of 870 open-text responses; quotes are illustrative `[fictional]` stand-ins for what real excerpts would look like. Mention counts approximate.

| Theme | Approx. mentions | Representative quotes | Valence | Contradicts NPS trend? |
|---|---|---|---|---|
| Recommendation consistency | ~310 | "Some weeks are spot on, some are random" `[fictional]` | Mixed | No - explains the passives |
| Want more niche/indie picks | ~190 | "Stop recommending obvious bestsellers" `[fictional]` | Negative | No |
| Reading-format options (audiobooks) | ~150 | "I mostly listen now, give me audiobook recs" `[fictional]` | Request | No |
| Price sensitivity | ~120 | "Good but borderline too expensive" `[fictional]` | Negative | Mild |
| Love it / keep going | ~90 | "Honestly don't change anything" `[fictional]` | Positive | Reinforces |

The top theme - recommendation consistency - is the roadmap signal NPS alone would never reveal. It explains the large passive bucket (38%): people who like Brainshelf but are not promoters because the quality wobbles.

## Hypothesis Validation

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| Sentiment is improving quarter-over-quarter | SUPPORTED | NPS 18 -> 22, N=1200 both periods | High |
| We know what feature to build next | NOT TESTED BY THIS SURVEY | NPS is not diagnostic; open text gives direction, not validation | - |

## What the Data Does NOT Show

- **Population not represented:** Churned subscribers (the most dissatisfied are gone), so NPS is optimistic
- **Questions not answered:** Whether fixing consistency would actually move NPS; willingness to pay (despite the price theme)
- **Confounds:** The open-text prompt skews toward complaints
- **Follow-up that would close the biggest gap:** A targeted survey or behavioral analysis on recommendation-quality variance, and a churned-user study

## Prioritized Recommendations

| # | Recommendation | Evidence | Confidence | Counter-evidence | Research that would strengthen it |
|---|---|---|---|---|---|
| 1 | Invest in recommendation consistency | Top open-text theme; explains passives | Medium | NPS already rising without it | Variance analysis of rec ratings |
| 2 | Test audiobook recommendations | Third theme, growing format shift | Medium | Could dilute focus | A demand test on the audiobook segment |
| 3 | Hold price; monitor the price theme | Price is a minority theme | Low | Annual NPS is healthy | A pricing/willingness-to-pay survey |
| 4 | Run a churned-subscriber study | NPS misses churned detractors | Medium | None | Interviews with recent churners |

## Next Steps

- Treat NPS as a trend dashboard, not a roadmap input; act on the open-text themes
- Validate the consistency theme with behavioral rec-quality data before committing engineering
- This analysis can inform where to look next; it cannot, on its own, confirm a feature will move loyalty
