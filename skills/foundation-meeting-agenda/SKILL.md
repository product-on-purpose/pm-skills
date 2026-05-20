---
name: foundation-meeting-agenda
description: Produces an attendee-facing agenda that sets what will be discussed, who owns each topic, and how time will be spent. Supports ten meeting type variants (standup, planning, review, decision-making, brainstorm, 1-on-1, stakeholder-review, project-kickoff, working-session, exec-briefing). Emits a shareable summary suitable for Slack or email plus a full agenda with time-boxed topics, type tags, owners, attendee prep, and logistics.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.0"
  updated: 2026-04-17
  category: meeting
  frameworks: [meeting-skills-family]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Meeting Agenda

A meeting agenda is the attendee-facing structural document that sets expectations before a meeting. It answers "what will we discuss, who owns each topic, how will we spend the time, and what does done look like?" Distinct from a meeting brief, which is the user's private strategic prep; the agenda is shared with participants and focused on structure and flow.

This skill belongs to the Meeting Skills Family. It conforms to the [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md), which defines shared frontmatter, file naming, the go-mode behavioral pattern, and universal output requirements across all meeting skills.

## When to Use

- Running or chairing a cross-functional working session, project kickoff, stakeholder review, or decision meeting
- Any meeting with more than three attendees or more than thirty minutes
- Recurring meeting where a rolling structure (1-on-1, team sync) needs fresh framing each time
- Mid-initiative alignment moment where explicit desired outcomes prevent drift

## When NOT to Use

- The user's preparation is private and tactical (positioning, stakeholder reads, asks). Use `/meeting-brief` instead.
- The meeting has already happened. Use `/meeting-recap` for post-meeting summarization.
- The user wants to communicate outcomes to non-attendees. Use `/stakeholder-update` after the meeting.

## Zero-friction execution

Per the family contract, this skill never blocks on interrogation. Default flow:

1. Read all provided inputs (topic, any referenced files, attendee list, constraints)
2. Run inference on missing values (meeting type from topic keywords, duration default, objective from topic phrasing, attendee roles from context)
3. Present a brief inference summary and accept one-word `go` or corrections
4. Produce the agenda

If invoked with `--go`, skip the inference summary and produce output directly using defaults (duration 30 min, meeting type `other`, and so on). If the user provides all values upfront, no checkpoint appears.

Blocking questions are used only when inference confidence is actively low on a load-bearing input and no reasonable default exists. This should be rare.

## Anti-meeting check

This skill opens with an explicit question: "Does this need to be a meeting, or could it be handled async?"

**v1.1.0: the check now requires a positive synchronous-value statement.** The meeting passes the check only when at least one of these is named:

- **Tradeoff to discuss**. multiple options, uncertain preference
- **Conflict to resolve**. named stakeholders disagreeing
- **Co-creation**. shared whiteboarding or document-writing in the meeting
- **Relationship-building**. first-time stakeholder meeting, mutual calibration
- **Blocker escalation**. time-sensitive unblocking

If none apply, the skill recommends the async alternative (written update, doc review, Slack poll) and produces a short one-page "how to handle this async" framing instead of an agenda.

The v1.0.0 version of this check ("single-owner decision with no tradeoffs", "pure information broadcast", "status-only sync with >5 people") was bypassed too easily. users would stay at five attendees or add "decision" to the topic. The stricter v1.1.0 biases toward async; users can still override.

This check is shared with `/meeting-brief` and not run by the post-meeting skills (recap, synthesize, stakeholder-update).

## Instructions

When asked to create a meeting agenda, follow these steps:

1. **Run anti-meeting check**
   Apply the trigger patterns above. If the user's objective matches, propose the async alternative and ask for override. Only proceed to step 2 on explicit override.

2. **Parse and load inputs**
   Read the topic or purpose. Load all `@file` references provided. Extract any attendee list, time constraints, or linked documents.

3. **Infer missing values**
   Apply these inference rules:

   | Value | Inferred from | Default |
   |-------|---------------|---------|
   | Meeting type | Topic keywords, attendee seniority mix | `other` (low confidence) |
   | Duration | Explicit in topic doc (rare); meeting-type-specific default when type is inferred at medium+ confidence | v1.1.0: type-specific (see family contract). 30 min only for `other`, `1-on-1`, `exec-briefing`, `customer-call`. Kickoff = 60, working-session = 60, decision-making = 45, etc. |
   | Objective | Topic phrasing | Infer; surface in summary |
   | Attendee RACI | Seniority, topic ownership cues | Flag all inferences |
   | Desired outcomes | Objective plus meeting type heuristics | Offer strawman |

   **Load-bearing inference gates** (v1.1.0): when attendee RACI or desired outcomes are inferred below-high confidence, flag in the go-mode summary with `⚠`. See family contract "Zero-friction execution" section.

4. **Present go-mode inference summary**
   Show the inferred values with confidence markers. Accept `go` to proceed, or corrections to revise. Re-run inference after any correction and present the summary again.

5. **Design the time-boxed topic list**
   Apply the meeting-type variant (see below). Size topic times so their sum equals the meeting duration. If the topic list overflows the available time, flag it explicitly and ask for reconciliation (do not silently trim).

   Each topic must have:
   - Type tag: `Discussion | Decision | Information | Working`
   - Owner (name or team)
   - Goal (what done looks like)
   - Time allocation
   - Pre-read link if any

6. **Specify attendee prep**
   List required prep with links and estimated prep time. Add recommended context for attendees who want deeper background. Add "come ready to" expectations that force clarity on what each attendee contributes.

7. **Add parking lot and logistics placeholders**
   Parking lot is a placeholder for off-topic items raised during the meeting. Logistics covers join link, materials needed, recording ownership.

8. **Render the TEMPLATE.md with filled values**
   Remove all guidance blockquotes from the final artifact.

9. **Validate output**
   - Frontmatter shape conforms to the family contract's universal base fields plus agenda-specific fields (`meeting_duration_minutes`, `desired_outcomes`)
   - Sum of topic times equals meeting duration (+/- 2 min tolerance)
   - At least one desired outcome is listed
   - Anti-meeting check result is recorded in `Generation context`

## Meeting-type variants

Applied in step 5. Each variant reshapes the topic list to match the meeting's purpose.

- **1-on-1**: Rolling structure. Last time's items, this time's topics, growth or development, blockers. Default 30 min.
- **standup**: Status round-robin, escalations, decisions needed. Default 15 min.
- **planning**: Commitments focus, capacity check, dependencies. Default 60 min.
- **review**: Presentation-first, heavy pre-read, explicit feedback-capture mechanism. Default 60 min.
- **decision-making**: Options upfront, decision criteria, explicit decision ask. Pre-read with proposal required. Default 45 min.
- **brainstorm**: Minimal agenda, generative prompts, no decision pressure. Default 45 min.
- **stakeholder-review**: TL;DR first, business-impact framing, explicit asks upfront. Default 45 min.
- **project-kickoff**: Scope, roles, success criteria, risks, communication plan. Default 60 min.
- **working-session**: Minimal agenda, pre-work required, explicit deliverable. Default 60 to 90 min.
- **exec-briefing**: TL;DR first, supporting detail after. Default 30 min.
- **other**: Generic topic structure, default 30 min.

## Quality checklist

Before delivering the agenda, verify:

- [ ] Anti-meeting check was applied and recorded
- [ ] Meeting type is set (or explicitly `other` with low-confidence flag)
- [ ] Duration is set (default 30 min if not provided, flagged as default)
- [ ] Desired outcomes are concrete and verifiable (not "discuss X" but "decide whether to ship X")
- [ ] Every topic has type tag, owner, goal, time
- [ ] Topic times sum to meeting duration
- [ ] Pre-read prep time is listed (attendees skip prep when duration is not stated)
- [ ] Logistics section has join link and materials references
- [ ] Shareable summary is 5-6 lines, Slack-paste-ready
- [ ] Sources and References section includes Generation context with defaults applied and inferences made

## See also

- [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md). shared behavioral and structural requirements
- [`/meeting-brief`](../foundation-meeting-brief/SKILL.md). user's private prep (shares anti-meeting check)
- [`/meeting-recap`](../foundation-meeting-recap/SKILL.md). downstream: recap auto-populates from this agenda's topic list
- [`/stakeholder-update`](../foundation-stakeholder-update/SKILL.md). downstream: translates meeting outcomes to non-attendees
