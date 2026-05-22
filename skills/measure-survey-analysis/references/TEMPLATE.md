---
artifact: survey-analysis
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

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
