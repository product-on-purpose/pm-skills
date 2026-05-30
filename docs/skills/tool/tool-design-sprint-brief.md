---
title: "Design Sprint Brief"
description: "Pre-sprint brief that locks challenge, sprint questions, team and role assignments, customer recruiting plan, prototype medium, interview format, logistics, and success criteria before Monday of a Design Sprint. Use after the readiness verdict is Go and before Monday begins. Produces a two-page artifact the team and Decider sign off on as the contract for the next five days."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - coordination
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** coordination | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-design-sprint-brief "Your context here"`

Produce the brief that aligns the team on challenge, sprint questions, participants, customer recruiting, prototype medium, interview format, logistics, and success criteria before Monday begins. A well-built brief prevents Monday morning from opening with re-litigation of "what are we testing this week?"; a missing or vague brief almost guarantees it.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- The readiness verdict from `tool-design-sprint-readiness` is Go (or Conditional Go with preconditions cleared).
- The sprint has dates blocked on calendars and you need the artifact that names what the sprint is for.
- The team has customer recruiting active and you need to commit a recruiting plan, honorarium budget, and Friday schedule before recruiting closes.
- A skeptical exec wants to know "what is the team doing for five days plus customer cost?" and you need an answer that fits on two pages.

## When NOT to Use

- The sprint has already started. The brief is a prep artifact, not an in-sprint deliverable. If Monday is happening, run `tool-design-sprint-map-and-target` instead.
- The readiness verdict is Wait. The brief cannot fix an unready team; close the preconditions first, then re-run readiness, then invoke this skill.
- The team wants a stakeholder strategy document. The brief is internal prep, not an external deliverable. If a stakeholder document is needed, that is a downstream artifact (the Friday scorecard or the next-step memo).
- Customer recruiting has not started. The brief locks the recruiting plan but cannot replace the recruiter. If no recruiter is named, go back to readiness Wait verdict.

## How to Use

Invoke the skill by name (`/pm-skills:tool-design-sprint-brief` on Claude Code, `$tool-design-sprint-brief` on Codex):

```
/pm-skills:tool-design-sprint-brief "Your context here"
```

Or reference the skill file directly: `skills/tool-design-sprint-brief/SKILL.md`

## Output Template

# Design Sprint Brief: [Initiative or Challenge name]

<!-- Two-page pre-sprint artifact. The team and Decider sign off on this as the contract for the next five days and the authorization for customer-recruiting spend. -->

## Challenge Statement and Why-Now

[One paragraph. Four sentences max. What is the team testing this week? Why does the answer matter? What would invalidation tell the team? Why this week vs. later (urgency, dependency on a downstream decision, market timing)?]

## Sprint Questions

[2-4 specific questions the Friday testing answers. If a Foundation Sprint preceded this sprint, the highest-risk assumption from the FS scorecard becomes Question 1.]

1. [Question 1; canonical lead question; one sentence; answerable from 5 Friday interviews]
2. [Question 2]
3. [Question 3]
4. [Question 4]

## Decider Attendance Windows

| Window | Day(s) | Required for |
|---|---|---|
| Mon AM | [date] 09:00-12:30 | Map and Target; long-term goal, sprint questions, target moment |
| Wed AM | [date] 09:00-12:30 | Heat map, critique, supervote |
| Fri PM | [date] 14:00-18:00 | Decider observes interview slots 4-5 from breakout room; Decider review of Friday scorecard begins after last interview wraps 16:30; build/iterate/pivot/stop call by 17:30 |
| (Ideal) Full week | [date range] | All 5 days |

**[Decider name]'s confirmed availability:** [state which windows are committed and any gaps]

## Team Roster

| Attendee | Role | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|---|
| [Name] | Decider | required | optional | required AM | optional | required PM |
| [Name] | Facilitator | required | required | required | required | required |
| [Name] | Design lead | required | required (sketch) | required | required (prototype build) | required (observation) |
| [Name] | Engineering lead | required | required | required | required (prototype build) | required (observation) |
| [Name] | PM or Researcher | required | required | required | optional | required (interview moderation) |
| [Name] | Customer expert / domain SME | required | optional | optional | optional | optional |

[Cameo experts, if any, listed separately with the specific session they attend.]

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target customer profile | [Specific enough to recruit against; cross-checked against readiness profile] |
| Source | [Primary and secondary channels] |
| Count needed | 5 (canonical; 6 confirmed for 1-buffer) |
| Incentive | [Honorarium amount; budget authorized] |
| Recruiter owner | [Name; responsible for scheduling Friday slots] |
| Recruiting deadline | [Date; canonically 7-10 days before Friday testing; must be past by brief sign-off] |
| Friday schedule | [Time blocks; canonical 6 slots Fri 09:00-15:00 with 1 buffer at 17:00] |
| Recording and consent | [Consent form template; recording policy; participant data retention] |

## Prototype Medium Decision

**Medium:** [Clickable (Figma), slideware (Keynote), service role-play, paper, physical mock, other]

**Rationale:** [One paragraph: why this medium fits the challenge, who on the team has proven capability in it, how it constrains the sketch and storyboard work upstream, and what the medium does NOT need to do (the prototype is not the product).]

**Build owners:** [2 people from team; canonically Design + Engineering or Design + PM]

**Build day:** Thursday [date], target completion 17:00 [timezone] for Friday dry-run.

## Interview Format

**Format:** [Live in-person / Remote moderated / Remote unmoderated / Hybrid]

**Moderator:** [Name; canonically the Researcher or PM]

**Observer setup:** [Observation-room arrangement; Zoom waiting-room or breakout-room observers; sticky-note synthesis tool]

**Script structure:** Five-Act Interview (Welcome / Context / Intro / Tasks / Debrief). Tasks Act customized to the prototype; other Acts canonical.

**Recording and consent:** [Recording yes/no; consent form sent at recruiting time; data retention policy; redaction posture]

## Sprint Logistics

| Element | Value |
|---|---|
| Sprint week | [Mon date] through [Fri date] |
| Hours | [start]:[end] each day |
| Location | [In-person address / Remote video / Hybrid with details] |
| Format | [Workshop with shared whiteboard / Pure remote / etc.] |
| Tools | [Whiteboard tool, video, decision log location, prototype tool, recording tool] |
| Daily rhythm | [Standup time, lunch, day-end review] |
| Non-sprint coverage | [On-call, Slack rerouting, calendar gating] |

## Success Criteria

The sprint is **successful** if:

1. [Friday produces a clear validation or invalidation of Sprint Question 1, with evidence from 5 customer interviews.]
2. [Decider makes an explicit build / iterate / pivot / stop call by 17:30 Friday.]
3. [Sprint Questions 2-4 have at least directional evidence from Friday.]
4. [The team's confidence in the underlying hypothesis or direction has measurably changed (up or down) from Monday morning.]

The sprint is **unsuccessful** if [the explicit failure conditions: Friday interviews do not complete due to recruiting failure, prototype is not testable on Friday, Decider call slips past Monday next-week, or scope drift forces the sprint to extend].

## Decider Checkpoint

**Decider sign-off required before Monday begins (and before customer recruiting closes).**

- [ ] Decider confirms challenge and sprint questions; questions are answerable from 5 Friday interviews.
- [ ] Decider confirms team roster and attendance windows.
- [ ] Decider authorizes customer recruiting plan, including honorarium budget.
- [ ] Decider confirms prototype medium and acknowledges the team will not over-invest in the prototype as if it were the product.
- [ ] Decider confirms interview format, recording, and consent posture.
- [ ] Decider confirms success criteria and acknowledges the sprint will produce a single build/iterate/pivot/stop call by 17:30 Friday.
- [ ] Decider acknowledges that recruiting cancellation or insufficient prototype scope must trigger a postpone decision rather than a slipped sprint.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Design Sprint Brief: Brainshelf Camera-Capture Validation</summary>

# Design Sprint Brief: Brainshelf Camera-Capture Validation

Locked Friday 2026-05-29 (3 days before sprint start). The Brainshelf team's `tool-design-sprint-readiness` verdict was Go on 2026-05-15; Riley activated recruiting on 2026-05-16 and confirmed 6 customer slots by 2026-05-27 (two days ahead of the 2026-05-29 deadline). This brief locks the remaining decisions (sprint questions, prototype medium, interview format, success criteria) and authorizes the USD 600 customer-recruiting spend.

## Challenge Statement and Why-Now

Design and test a sub-3-second camera-first book-capture flow for 25+/year readers to determine whether they will switch from "do nothing" (paper journal, memory, or no system) to Brainshelf. The Founding Hypothesis from the 2026-05-14 Foundation Sprint depends on this assumption (A1 in the FS scorecard); if A1 invalidates Friday, the entire camera-first direction pivots to the Red Bookstore Mode backup. The team needs the answer this week to commit (or not) to a June 2 MVP build cycle that has a hard launch target of Q3 for a Brainshelf seed-round pitch.

## Sprint Questions

1. **Will 25+/year readers complete sub-3-second camera capture without abandoning, and is the resulting library something they describe as valuable for personal recall?** (Tests FS assumption A1; lead question.)
2. **Does OCR + cover-recognition accuracy in the Figma prototype feel acceptable, or do mis-resolutions break trust?** (Tests FS assumption A2 indirectly; full OCR test is post-sprint.)
3. **When asked "what would you pay for this and how often?", do customers self-describe a sustainable price point above USD 4 per month?** (Tests FS assumption A5; Friday Five-Act Interview Act 5 debrief.)
4. **Do customers describe "did I already read this?" as a frequent, painful problem?** (Tests FS assumption A6; Friday Act 2 context question.)

## Decider Attendance Windows

| Window | Day(s) | Required for |
|---|---|---|
| Mon AM | 2026-06-01 09:00-12:30 PT | Map and Target; long-term goal, sprint questions, target moment |
| Wed AM | 2026-06-03 09:00-12:30 PT | Heat map, critique, supervote |
| Fri PM | 2026-06-05 14:00-18:00 PT | Decider observes interview slots 4-5 from breakout room; Decider review of Friday scorecard begins after last interview wraps 16:30; build/iterate/pivot/stop call by 17:30 PT |
| Full week (ideal) | 2026-06-01 through 2026-06-05 | All 5 days, full attendance committed |

**Jamie's confirmed availability:** all 5 days, full attendance, no calendar conflicts; backup investor calls rescheduled to 2026-06-08 afternoon.

## Team Roster

| Attendee | Role | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|---|
| Jamie | Decider, PM | required | required | required | required | required |
| Alex | Design lead | required | required (sketch lead) | required | required (prototype build co-owner) | required (observation) |
| Sam | Engineering lead | required | required | required | required (prototype build co-owner) | required (observation) |
| Riley | Customer expert + interviewer | required | required | required | optional (Riley is on call for prototype copy + customer-language polish) | required (Friday interview moderator) |

No cameo experts required. Riley acts as both customer expert (week-long context) and Friday interview moderator (her Discord-community familiarity gets the conversations going faster than a colder interviewer).

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target customer profile | Adults 25-55 who read 25+ books per year, treat personal library as memory rather than identity, currently use no system or paper journals; English-speaking; mix of US and international |
| Source | Primary: Riley's book-blogger Discord (12k followers; warm intro). Secondary: UserInterviews paid panel filtered to "reads 25+ books per year." |
| Count needed | 5 (6 confirmed for 1-buffer) |
| Incentive | USD 100 per 60-minute interview; budget USD 600 total (6 slots); authorized by Jamie 2026-05-15 |
| Recruiter owner | Riley |
| Recruiting deadline | 2026-05-29 (CLOSED; 6 confirmed slots locked 2026-05-27) |
| Friday schedule | 6 slots: 09:00 / 10:30 / 12:00 / 14:00 / 15:30 / 17:00 PT. Buffer slot 17:00 used only on earlier no-show. |
| Recording and consent | Zoom recording with audio + video; consent form sent at confirmation; 90-day retention; raw video deleted post-synthesis; quotes anonymized in any external sharing. |

**Confirmed customer mix:** 4 from Riley's Discord (2 US, 1 UK, 1 Canada), 2 from UserInterviews panel (1 US, 1 Australia). All 6 self-identified as "25+/year reader who treats library as memory" via pre-screen DM.

## Prototype Medium Decision

**Medium:** Clickable Figma prototype.

**Rationale:** The team needs to test the camera-capture interaction sequence (point camera, see recognition, confirm or correct, see book added) and the immediate post-capture personal-recall surface (search, browse "books I've read about X"). Figma can fake the camera surface and OCR resolution flow convincingly enough for a 30-minute task-based interview; a true OCR build is out of scope for one Thursday. The prototype is NOT the product: it tests interaction and recall framing, not engineering feasibility. Alex has built 3 Figma prototypes of comparable scope in the last 6 months; the medium is proven team capability.

**Build owners:** Alex (design lead) and Sam (engineering lead). Sam's role on Thursday is to keep Alex unblocked on Figma constraints (component patterns, interaction logic) so the prototype completes by 17:00 PT for the Friday dry-run.

**Build day:** Thursday 2026-06-04, target completion 17:00 PT for Friday dry-run.

## Interview Format

**Format:** Remote moderated via Zoom + Figma screen-share.

**Moderator:** Riley.

**Observer setup:** Zoom breakout room for Jamie + Alex + Sam observing live; Miro sticky-note board for real-time observation synthesis; one observer designated note-taker per slot on rotation.

**Script structure:** Five-Act Interview (Welcome / Context / Intro / Tasks / Debrief). Tasks Act customized to the camera-capture flow and recall surface; other Acts canonical from Sprint book Chapter 17. Estimated 50 minutes per slot with 10 minute buffer for technical recovery.

**Recording and consent:** Zoom audio + video recording; consent form sent with calendar invite (DocuSign template based on Google Design Sprint Kit's consent form); 90-day retention; raw video deleted post-synthesis Monday 2026-06-08; quotes anonymized in any external sharing or fundraising deck use.

## Sprint Logistics

| Element | Value |
|---|---|
| Sprint week | 2026-06-01 (Mon) through 2026-06-05 (Fri) |
| Hours | 09:00 - 17:00 PT each day with 12:30-13:30 lunch |
| Location | Hybrid: Jamie + Sam in-person at Capitol Hill Coworking (Seattle); Alex + Riley remote on Zoom + Miro |
| Format | In-room whiteboard + shared Miro board mirroring the whiteboard; daily standup recapped in Miro for remote attendees |
| Tools | Miro (whiteboard), Zoom (video), Figma (prototype Thursday), GitHub Project board (decision log), Otter (interview transcripts) |
| Daily rhythm | 09:00 standup (15 min); 12:30 lunch; 16:30 day-end review (15 min); Slack silenced 09:00-17:00 |
| Non-sprint coverage | Sam: on-call coverage delegated to part-time contractor week of 2026-06-01. Jamie: investor pings async-only until Monday 2026-06-08. Alex + Riley: customer-success rerouted to no-coverage-needed auto-responses. |

## Success Criteria

The sprint is **successful** if:

1. Friday produces a clear validation or invalidation of Sprint Question 1 (the lead A1 question), with evidence from at least 4 of the 5 customer interviews (1-customer no-show tolerance).
2. Jamie makes an explicit build / iterate / pivot to Red Bookstore Mode / stop call by 17:30 Friday 2026-06-05.
3. Sprint Questions 2-4 have at least directional evidence from Friday (full validation deferred to post-sprint testing).
4. Team's collective confidence in the Founding Hypothesis (measured on a 1-10 scale Monday morning vs. Friday close) has moved at least 2 points in either direction (validation or invalidation; "no change" indicates the sprint did not actually test).

The sprint is **unsuccessful** if Friday interviews do not complete due to recruiting failure (more than 2 no-shows; buffer slot insufficient), if the Figma prototype is not testable on Friday (Thursday build slips past 18:00 PT and Friday dry-run cannot occur), if Jamie's call slips past Monday 2026-06-08, or if scope drift forces the sprint to add a Saturday or extend into the following week.

## Decider Checkpoint

**Decider sign-off required before Monday 2026-06-01 begins.**

- [x] Jamie confirms the challenge and sprint questions; questions are answerable from the 5 Friday interviews (6 confirmed slots; 1 buffer).
- [x] Jamie confirms the team roster and attendance windows; all 4 attendees committed all 5 days.
- [x] Jamie re-confirms customer recruiting plan and the USD 600 honorarium budget (originally authorized 2026-05-15 at readiness sign-off; recruiting closed 2026-05-27).
- [x] Jamie confirms prototype medium (Figma clickable) and acknowledges the team will not over-invest in the Figma prototype; the prototype tests interaction and recall framing, not engineering feasibility.
- [x] Jamie confirms interview format (remote moderated; Zoom + Figma screen-share; Riley moderator; Five-Act Interview script), recording (audio + video; 90-day retention), and consent posture (DocuSign at recruiting time).
- [x] Jamie confirms success criteria and acknowledges the sprint will produce a single build / iterate / pivot to Red Bookstore Mode / stop call by 17:30 Friday 2026-06-05.
- [x] Jamie acknowledges that recruiting cancellation cascade (more than 2 no-shows) or prototype slip past Thursday 18:00 PT triggers postpone, not slip-into-next-week.

**Signed:** Jamie (founder, PM), 2026-05-29 16:45 PT.

**Brief locked. Sprint begins Monday 2026-06-01 09:00 PT.**

</details>
