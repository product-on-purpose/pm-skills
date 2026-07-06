---
name: discover-interview-synthesis
description: Synthesizes user research interviews into actionable insights, patterns, and recommendations. Use after conducting user interviews, customer calls, or usability sessions to extract and communicate findings across participants. Distinct from foundation-meeting-recap, which summarizes one internal meeting for its attendees; this skill aggregates research conversations into evidence-backed findings.
license: Apache-2.0
metadata:
  phase: discover
  version: "2.2.0"
  updated: 2026-07-05
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Interview Synthesis

An interview synthesis transforms raw user research data into structured insights that drive product decisions. Rather than simply listing what participants said, a good synthesis identifies patterns across conversations, connects observations to underlying user needs, and translates findings into actionable recommendations.

## When to Use

- After completing a round of user interviews (typically 5+ participants)
- Following customer discovery calls or sales feedback sessions
- After usability testing sessions to consolidate observations
- When stakeholders need a summary of research findings
- Before ideation sessions to ground the team in user reality

## When NOT to Use

- You are summarizing one internal meeting for its attendees -> use `foundation-meeting-recap`
- You need patterns across multiple meetings over time -> use `foundation-meeting-synthesize`
- Your data is survey responses rather than interviews -> use `measure-survey-analysis`
- The findings are synthesized and you are ready to frame the problem -> use `define-problem-statement`
- You have synthesized findings and want to map them onto a customer's journey across stages and touchpoints -> use `discover-journey-map`

## Instructions

When asked to synthesize interview findings, follow these steps:

1. **Gather the Raw Material**
   Collect all interview notes, transcripts, or recordings. Ensure you have data from at least 3 participants to identify meaningful patterns. Note the research objective and methodology used.

2. **Create Participant Profiles**
   Document each participant with relevant context: their role, segment, tenure, and any notable characteristics. This helps readers assess the representativeness of findings.

3. **Identify Recurring Themes**
   Read through all notes and tag observations by topic. Look for themes that appear across multiple participants (ideally 3+). Distinguish between frequently mentioned topics and one-off comments.

4. **Extract Meaningful Quotes**
   Capture 3-5 verbatim quotes per theme that powerfully illustrate the insight. Good quotes are specific, emotional, or particularly articulate. Always attribute quotes to participant IDs.

5. **Synthesize into Insights**
   Transform themes into insight statements. An insight goes beyond observation ("users mentioned X") to interpretation ("users need Y because of Z"). Connect what you heard to why it matters.

6. **Formulate Recommendations**
   Based on the insights, propose prioritized actions. Each recommendation should tie directly to an insight. Note confidence level based on strength of evidence.

7. **Document Limitations**
   Acknowledge what you didn't learn, sample biases, or areas needing further research. Honest limitations increase credibility.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete synthesis fills every template section: Research Overview; Key Themes; Notable Quotes; Insights; Recommendations; and Appendix.

## Quality Checklist

Before finalizing, verify:

- [ ] Themes are supported by evidence from 3+ participants
- [ ] Quotes are verbatim and attributed to participant IDs
- [ ] Insights explain "why" not just "what"
- [ ] Recommendations are specific and actionable
- [ ] Participant identities are protected (no PII)
- [ ] Limitations and biases are acknowledged

## Examples

See `references/EXAMPLE.md` for a completed example.
