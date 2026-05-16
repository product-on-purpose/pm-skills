---
title: "Design Sprint Brief: Brainshelf Camera-Capture Validation"
description: "Brainshelf brief locking sprint questions, customer recruiting plan (USD 600 authorized), Figma clickable prototype medium, remote moderated interview format, and Friday Decider review window before sprint Monday."
artifact: design-sprint-brief
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-16
status: sample
thread: brainshelf
context: "Brainshelf pre-seed B2C SaaS for personal book collection management; Design Sprint week of 2026-06-01 testing Foundation Sprint assumption A1 (sub-3-sec camera-first capture switchability)"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Following the readiness Go verdict on 2026-05-15, Riley activated recruiting and confirmed 6 customer slots by 2026-05-27 (2 days ahead of the 2026-05-29 deadline). Jamie invokes `tool-design-sprint-brief` on Friday 2026-05-29 to lock the remaining decisions before sprint Monday 2026-06-01.

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
