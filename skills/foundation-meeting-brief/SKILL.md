---
name: foundation-meeting-brief
description: Produces a private strategic preparation document for the user before a meeting that matters. Captures stakes, stakeholder positions and reads, ranked desired outcomes, key messages, anticipated questions with prepared responses, risks and tensions, specific asks, and success signals. Distinct from meeting-agenda because this artifact is not shared with attendees; it is the user's personal tactical prep for meetings where positioning matters.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.1"
  updated: 2026-07-04
  category: meeting
  frameworks: [meeting-skills-family]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Meeting Brief

A meeting brief is the user's private strategic preparation document for a meeting where context, stakes, or positioning matter. It captures what the user needs to know, what they want to accomplish, who they are engaging with, and how to navigate the conversation. This is strategic prep, not meeting structure, which keeps it distinct from a meeting agenda.

This skill belongs to the Meeting Skills Family. It conforms to the [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md).

## When to Use

- Walking into a stakeholder review, exec briefing, or negotiation-adjacent conversation
- First meeting with a new stakeholder where relationship calibration matters
- A meeting where the user needs something from others (capacity commitment, decision, approval)
- Any conversation where specific positioning, messaging, or risk navigation is required

## When NOT to Use

- Preparing the agenda attendees will see. Use `foundation-meeting-agenda` instead.
- Post-meeting summarization. Use `foundation-meeting-recap`.
- The meeting is low-stakes and well-trodden (recurring team sync, standup). A brief is overhead for these; the agenda alone is sufficient.

## Zero-friction execution

Per the family contract, this skill never blocks on interrogation. Default flow:

1. Read all provided inputs (topic, attendees, prior recaps, stakeholder summaries, user's primary ask)
2. Auto-discover related artifacts via `project` or `topics` frontmatter match
3. Run inference on missing values (stakeholder positions from prior recaps, primary ask from topic, top-3 goals from meeting type)
4. Present a brief inference summary and accept one-word `go` or corrections
5. Produce the brief

If invoked with `--go`, skip the inference summary. If the user provides all values upfront, no checkpoint appears.

The skill runs on inferred stakeholder positions with low-confidence flags when no stakeholder summaries are provided; it does not block on missing inputs.

## Anti-meeting check

This skill opens with the shared anti-meeting check. see [`foundation-meeting-agenda`](../foundation-meeting-agenda/SKILL.md) for the full check.

**v1.1.0**: the check requires a positive synchronous-value statement (tradeoff to discuss, conflict to resolve, co-creation, relationship-building, or blocker escalation). Brief-prep scenarios most often pass because they typically involve navigating stakeholder positions or negotiation dynamics. which qualify as "conflict to resolve" or "relationship-building." But the check still runs, and if no synchronous value is named, the skill recommends the async alternative before producing a brief.

**Load-bearing inference gates** (v1.1.0): when stakeholder positions, primary ask, or decision-maker attribution are inferred below-high confidence, flag in the go-mode summary with `⚠`. The brief's tactical guidance depends on these; silent acceptance of weak inferences creates risky advice. See family contract "Zero-friction execution" section.

## Instructions

When asked to create a meeting brief, follow these steps:

1. **Run anti-meeting check**
   Apply the trigger patterns. If matched, propose async alternative and await override.

2. **Parse and load inputs**
   Read the topic. Load any `@file` references. Auto-discover related artifacts: prior recaps on same topic (same `project`/`topics` frontmatter), stakeholder summaries from `/discover-stakeholder-summary` outputs, related project docs.

3. **Infer missing values**
   Apply these rules:

   | Value | Inferred from | Confidence |
   |-------|---------------|------------|
   | Stakeholder positions | Prior recap language, stakeholder summary content | High if recap cites direct quote; medium if position in 2+ sources; low otherwise |
   | Stakes per attendee | Role plus topic-ownership cues | Always flag inferences |
   | Top 3 goals | User's primary ask plus meeting type | Offer as ranked strawman in go-mode |
   | Anticipated questions | Stakeholder position analysis plus typical-by-role objections | Flag as inferred |
   | Risks / tensions | Conflict patterns in prior recaps | High if prior recap flagged contradiction |

4. **Present go-mode inference summary**
   Show the inferred stakeholder positions, primary ask, top-3 goals. Accept `go` or corrections.

5. **Build the background section**
   Relevant history, prior decisions, recent developments. Cross-reference prior recaps by filename when available.

6. **Do per-stakeholder analysis**
   For each key attendee: position on topic, stakes (what they win or lose), likely concerns, relationship state (strong / neutral / strained), tactical notes (how to engage).

7. **Rank desired outcomes**
   Must achieve / should achieve / nice to achieve. Force the tradeoff explicitly.

8. **Draft key messages**
   In priority order, phrased for delivery. Not bullet points to read; phrased as you would say them.

9. **Anticipate questions and responses**
   Table format: Q | prepared response. Aim for the three questions the user is most likely to get.

10. **Identify risks and tensions**
    With explicit mitigations. Flag anything that could derail the meeting.

11. **Specify asks**
    What the user needs from specific people by name. Not generic "get alignment" but "ask alex to commit eng capacity for Q2 by Thursday."

12. **Define success signals**
    How the user knows in the moment that the meeting went well. Behavioral cues, not just outcome markers.

13. **Render TEMPLATE.md and validate**
    - `visibility: private` default
    - Stakeholder list has minimum fields (name, position) when present
    - Primary ask is non-empty (use "alignment" or "information gathering" if no specific ask)

## Quality Checklist

- [ ] Anti-meeting check was applied and recorded
- [ ] `visibility: private` default applied
- [ ] Background section cross-references prior recaps when available
- [ ] Every key stakeholder has a position, stakes, concerns, relationship state entry (with confidence markers on inferred fields)
- [ ] Desired outcomes are ranked (must / should / nice), not flat
- [ ] Key messages are phrased for delivery, not for reading
- [ ] Anticipated Q&A table has 3 or more entries
- [ ] Asks are specific (named person, specific ask, by-when)
- [ ] Shareable summary suitable for trusted-advisor review only (flagged as such)
- [ ] Sources and References section includes Generation context with inferences flagged

## See also

- [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md)
- [`foundation-meeting-agenda`](../foundation-meeting-agenda/SKILL.md). shares the anti-meeting check
- [`/discover-stakeholder-summary`](../discover-stakeholder-summary/SKILL.md). upstream input source for stakeholder positions
