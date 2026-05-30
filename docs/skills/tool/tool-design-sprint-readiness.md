---
title: "Design Sprint Readiness"
description: "Pre-sprint diagnostic that determines whether a team should run a Design Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, customer recruiting plan, and pre-sprint activities. Use when a team is considering starting a Design Sprint and wants a fast yes/no diagnosis before committing five days of team time and customer recruiting cost."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - coordination
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** coordination | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-design-sprint-readiness "Your context here"`

Assess whether a Design Sprint fits the team's current situation. Design Sprint failure modes are expensive: five consecutive days of a 4-7 person team, plus customer recruiting cost (typically 5 strangers paid honoraria), plus the prototype build. A 30-45 minute readiness diagnostic catches the failure modes before that commitment is made.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills` and conforms to the family frontmatter and Decider Checkpoint requirements.

## When to Use

- A team is considering starting a Design Sprint and needs a fast diagnosis before committing five days plus customer recruiting effort.
- A team has just completed a Foundation Sprint and is deciding whether the next test should be a Design Sprint, a smaller experiment, or direct build. The Founding Hypothesis is consumed as optional input context (no separate bridge skill artifact is required).
- An existing sprint commitment is on the calendar and the team wants to validate that prerequisites (Decider, customers, prototype medium) are in place.
- Re-running a Design Sprint after an inconclusive first sprint: use to confirm the new challenge framing and customer access are ready.

## When NOT to Use

- The team has already decided to run the sprint and just needs the brief. Use `tool-design-sprint-brief` instead.
- The team has no clear challenge and is still in discovery. Run problem framing or a Foundation Sprint first; a Design Sprint depends on a sprint-worthy challenge.
- Low-stakes tweaks where five days of team time would be disproportionate. Use a lighter experiment design instead.
- No customer access for Friday testing and no realistic recruiting plan. A Design Sprint that cannot test on Friday is just a four-day workshop with no learning event.
- No Decider available and one cannot be appointed. Design Sprint requires fast decisions Wednesday and pre-test Thursday; without authority the sprint produces options without commitment.

## How to Use

Invoke the skill by name (`/pm-skills:tool-design-sprint-readiness` on Claude Code, `$tool-design-sprint-readiness` on Codex):

```
/pm-skills:tool-design-sprint-readiness "Your context here"
```

Or reference the skill file directly: `skills/tool-design-sprint-readiness/SKILL.md`

## Output Template

# Design Sprint Readiness Assessment: [Initiative or Challenge name]

<!-- One-line description of the challenge the team is considering running a Design Sprint to test. -->

## Inputs Captured

**Challenge description:**

> [The product question, opportunity, or risk the sprint would address, framed as a specific testable challenge.]

**Existing hypothesis (from Foundation Sprint or other source):**

> [The Founding Hypothesis sentence if available, plus the highest-risk assumption flagged in the FS assumption scorecard. If no FS exists, state "no prior hypothesis; sprint will form one Monday" or describe the source.]

**Customer access status:** [Recruiter named or recruiting source identified; estimated days to secure 5 target-profile customers; existing customer base accessible OR external recruiting needed.]

**Decider name and availability:** [Name; full-week availability OR specific windows confirmed; flag any gaps in Monday morning / Wednesday morning / Friday afternoon load-bearing moments.]

**Team composition draft:**

- [Name] ([role]; Decider candidate)
- [Name] ([role; e.g., design lead])
- [Name] ([role; e.g., engineering lead])
- [Name] ([role; e.g., PM or researcher])
- [Name] ([role])

**Prototype medium (proposed):** [Clickable (Figma), slideware (Keynote), service role-play, paper, physical mock, other. With 1-2 sentences on why this medium fits the challenge.]

**(Optional) Logistics constraints:** [Date windows, location, format (in-person / remote / hybrid).]

## Readiness Verdict: **[Go / Conditional Go / Wait]**

[One-sentence summary explaining the verdict.]

| Criterion | Status | Notes |
|---|---|---|
| 1. Challenge is named and sprint-worthy | [PASS / YELLOW / FAIL] | [Notes] |
| 2. Stakes are meaningful | [PASS / YELLOW / FAIL] | [Notes] |
| 3. Decider available for load-bearing moments | [PASS / YELLOW / FAIL] | [Notes] |
| 4. Team size appropriate (4-7) | [PASS / YELLOW / FAIL] | [Notes] |
| 5. Team can clear 5 consecutive days | [PASS / YELLOW / FAIL] | [Notes] |
| 6. Customer access for Friday testing secured | [PASS / YELLOW / FAIL] | [Notes] |
| 7. Prototype medium feasible in 1 day | [PASS / YELLOW / FAIL] | [Notes] |
| 8. Sprint output has a path forward | [PASS / YELLOW / FAIL] | [Notes] |

## Diagnosis

[2-4 paragraphs explaining what is in place, what is missing or weak, and what is uncertain. Be specific about each yellow or failing criterion. If verdict is Go, this section should still surface any risks that justify the Go.]

[If verdict is Conditional Go: name each yellow flag explicitly and describe how it would block the sprint if not addressed.]

[If verdict is Wait: name each failing criterion and describe the prerequisite work the team should do before re-running the diagnostic. Special note on criterion 6 (customer access): if uncertain, default to Wait until recruiter and source are confirmed; 7-10 days of lead time is the canonical minimum.]

## Recommended Preconditions (Conditional Go or Wait only)

[Bulleted list of concrete actions to close gaps. Each precondition has an owner and a target completion date.]

1. **[Precondition]** ([Owner]; deadline: [date]). [Why this matters; what "done" looks like.]
2. **[Precondition]** ([Owner]; deadline: [date]). [Why this matters; what "done" looks like.]

## Customer Recruiting Plan (Go or Conditional Go only)

| Element | Value |
|---|---|
| Target customer profile | [Specific enough to recruit against; e.g., "B2B SaaS PMs at companies 50-500 FTE who have shipped at least one feature in the last 90 days"] |
| Source | [Customer base, panel service, professional network, intercept, paid recruiter] |
| Count needed | 5 (canonical; 6 if one buffer is available for cancellations) |
| Incentive | [Honorarium amount and currency; typical USD 75-150 per 60-minute interview for B2B; USD 25-75 for B2C] |
| Recruiter owner | [Name; responsible for scheduling Friday interview slots] |
| Recruiting deadline | [Date; canonically 7-10 days before Friday testing] |
| Friday scheduling | [Time blocks; canonical 6 customer slots Friday 09:00-15:00 with 1 buffer slot] |

[Add notes on any recruiting risks (e.g., target segment is hard to reach; channel is saturated; honorarium budget not yet approved).]

## Recommended Pre-Sprint Activities (Go or Conditional Go only)

[Bulleted list of prep tasks to complete in the days before Monday.]

1. **[Activity]** ([Owner]; deadline: [date]). [What and why.]
2. **[Activity]** ([Owner]; deadline: [date]). [What and why.]
3. **[Activity]** ([Owner]; deadline: [date]). [What and why.]
4. **[Activity]** ([Owner]; deadline: [date]). [What and why.]

## Recommended Attendees (Go or Conditional Go only)

| Attendee | Role | Required for which days |
|---|---|---|
| [Name] | Decider | At minimum: Mon AM, Wed AM, Fri PM. Ideally all 5. |
| [Name] | Facilitator | All 5 days |
| [Name] | [Design lead] | All 5 days (Tuesday and Thursday are sketch + prototype critical) |
| [Name] | [Engineering lead] | All 5 days (Thursday prototype-build critical) |
| [Name] | [PM / Researcher] | All 5 days (Friday interviews critical) |
| [Name] | [Customer expert / domain SME] | Mon (Map and Target), Fri (interview observation) |

[If cameo experts are recommended (additional domain SMEs, customer-success reps, legal, etc.), list separately with the specific session they should attend.]

## Decider Checkpoint

**Decider sign-off required before [scheduling Monday / activating customer recruiting / closing this diagnostic].**

- [ ] Decider confirms the verdict and accepts the diagnosis.
- [ ] Decider commits to attending the load-bearing windows (Mon AM, Wed AM, Fri PM) at minimum (if verdict is Go or Conditional Go).
- [ ] Decider acknowledges the documented preconditions and owns ensuring they are met before Monday (if Conditional Go).
- [ ] Decider authorizes the customer recruiting plan, including honorarium budget (if verdict is Go).
- [ ] Decider agrees the output should be a Friday scorecard plus a Decider review by 17:30 Friday with an explicit build / iterate / pivot / stop call.
- [ ] Decider acknowledges that the sprint will produce a single direction validated or invalidated; the prototype is not the product, and the team will not over-invest in the prototype as if it were.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Design Sprint Readiness Assessment: Brainshelf Camera-Capture Validation</summary>

# Design Sprint Readiness Assessment: Brainshelf Camera-Capture Validation

The Brainshelf team closed their Foundation Sprint on 2026-05-14. The Founding Hypothesis named sub-3-second camera-first capture into a private library as the top bet for 25+/year readers; the assumption scorecard flagged A1 (25+/year readers switchable from "do nothing" with sub-3-second capture) as the highest-risk assumption. The team committed to a Design Sprint the week of 2026-06-01 to test A1 plus A2 (OCR accuracy) and A3 (recall draw). Jamie invokes `tool-design-sprint-readiness` on 2026-05-15 to validate the team is actually ready to run that sprint and to lock the recruiting plan.

## Inputs Captured

**Challenge description:**

> Design and test a sub-3-second camera-first book-capture flow for 25+/year readers to determine whether they will switch from "do nothing" (paper journal, memory, or no system at all) to using Brainshelf to capture and recall books they have read or want to read next. Test through a clickable Figma prototype with 5 target-profile readers on Friday 2026-06-05.

**Existing hypothesis (from Foundation Sprint or other source):**

> Founding Hypothesis (2026-05-14): "If we help people who read 25 or more books a year and treat their personal library as memory rather than identity solve 'I can't remember what I've read or what I want to read next' with sub-3-second camera-first capture into a private library, they will choose it over Goodreads, StoryGraph, paper journals, and doing nothing because our solution is the fastest way to capture a book and the most useful way to recall what they have read." Highest-risk assumption (per FS scorecard): A1, "25+/year readers are switchable from 'do nothing' with sub-3-second capture."

**Customer access status:** Riley owns recruiting; pulling from her 12k-follower book-blogger Discord plus a UserInterviews paid panel for non-Discord 25+/year readers. Estimated 7 days to confirm 5 customers (target 6 including 1 buffer). Honorarium budget USD 100 per 60-minute interview confirmed with Jamie.

**Decider name and availability:** Jamie, full-week availability for 2026-06-01 through 2026-06-05; no calendar conflicts in load-bearing windows (Mon AM, Wed AM, Fri PM).

**Team composition draft:**

- Jamie (founder, PM; Decider)
- Alex (design lead)
- Sam (engineering lead; will own Thursday prototype build)
- Riley (customer expert; will own recruiting and Friday interview moderation)

**Prototype medium (proposed):** Clickable Figma prototype. Rationale: the team needs to test the camera-capture interaction sequence and the immediate post-capture recall surface; Figma can fake the camera and OCR resolution flow convincingly enough for a 30-minute task-based interview. A true working OCR build is out of scope for one Thursday.

**Logistics constraints:** Hybrid sprint (Jamie and Sam in-person at Seattle co-working; Alex and Riley remote on Zoom and Miro). Friday interviews remote via Zoom with Figma screen-share.

## Readiness Verdict: **Go**

The team meets all eight canonical readiness criteria. Recruiting is the only watch item: it must start within days to hit the 2026-05-29 recruiting deadline (Friday before sprint week).

| Criterion | Status | Notes |
|---|---|---|
| 1. Challenge is named and sprint-worthy | PASS | Concrete, bounded, fits one week; tests load-bearing FS assumption |
| 2. Stakes are meaningful | PASS | If A1 invalidates, the entire Founding Hypothesis pivots to the backup (Red Bookstore Mode) |
| 3. Decider available for load-bearing moments | PASS | Jamie full-week confirmed |
| 4. Team size appropriate (4-7) | PASS | 4 people, all 4 have load-bearing roles |
| 5. Team can clear 5 consecutive days | PASS | Confirmed; calendars blocked; backup coverage arranged for non-sprint duties |
| 6. Customer access for Friday testing secured | PASS | Riley owns; UserInterviews panel + Discord; 7-day path to 5 confirmed; honorarium budget approved |
| 7. Prototype medium feasible in 1 day | PASS | Figma clickable; Alex has built 3 Figma prototypes of comparable scope in the last 6 months |
| 8. Sprint output has a path forward | PASS | Decider review by 17:30 Friday; build (6-week MVP starting Monday 2026-06-08), iterate (re-sprint), or pivot to Red Bookstore Mode |

## Diagnosis

The team meets all eight canonical readiness criteria cleanly. The transition from Foundation Sprint to Design Sprint is unusually smooth here because the FS Founding Hypothesis was specific and the highest-risk assumption (A1) was named explicitly in the assumption scorecard; the Design Sprint's purpose is therefore unambiguous (test A1 on Friday) rather than the more common "we'll figure out what to test on Monday" situation.

The single watch item is recruiting. Riley needs to start recruiting within 24 hours (by 2026-05-16 EOD) to have comfortable lead time before 2026-05-29 (last day to confirm Friday slots; 7 days before Friday testing 2026-06-05). A UserInterviews panel is the safety net if the Discord channel underdelivers; Riley has used the panel before with a 65% confirm-to-show rate, meaning the team should target 6 confirmed slots (1 buffer) to land 5 actual customers Friday.

No other risks found. The team is small, has FS context, has a clear Decider, has a chosen prototype medium with proven team capability, and has explicit downstream commitment to either build or pivot based on Friday outcome.

## Recommended Preconditions

None. Verdict is Go without preconditions. The "recommended pre-sprint activities" below cover the prep work, not gap-closing.

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target customer profile | Adults aged 25-55 who read 25+ books per year, treat their personal library as memory rather than identity, currently use no system or use paper journals; mix of male and female; mix of US and international (English-speaking) |
| Source | Primary: Riley's book-blogger Discord (~12k followers; warm intro). Secondary: UserInterviews paid panel filtered to "reads 25+ books per year." |
| Count needed | 5 (target 6 confirmed slots for 1-buffer) |
| Incentive | USD 100 per 60-minute interview (paid via UserInterviews for panel customers; Amazon gift card for Discord customers; honorarium budget approved by Jamie) |
| Recruiter owner | Riley |
| Recruiting deadline | 2026-05-29 (Friday before sprint week; confirm all 5+1 customers and send calendar invites) |
| Friday scheduling | 6 customer slots: 09:00 / 10:30 / 12:00 / 14:00 / 15:30 / 17:00 PT. Buffer slot at 17:00 used only if a no-show occurs earlier. |

Risk notes: Riley's Discord skews younger and more social-reader than the target; expect 2-3 of the 5 to come from UserInterviews panel where the "treats library as memory" framing is harder to filter on. Riley will pre-screen for the framing in initial DM outreach.

## Recommended Pre-Sprint Activities

1. **Activate recruiting** (Riley owns; deadline: 2026-05-16 EOD). Post Discord outreach plus open UserInterviews panel. Confirm 6 slots by 2026-05-29.
2. **Pre-load Miro board with Design Sprint week template** (Alex owns; deadline: 2026-05-29 EOD Friday). Use the canonical AJ and Smart 5-day Miro template; pre-fill Brainshelf challenge text and FS context in the Day 1 frame.
3. **Print the Founding Hypothesis plus assumption scorecard** (Jamie owns; deadline: 2026-05-31 EOD Sunday). For wall reference Monday morning during Map and Target.
4. **Block calendars and arrange non-sprint coverage** (whole team owns; deadline: 2026-05-29 EOD Friday). No Slack, no email during sprint hours (09:00-17:00 PT) all 5 days. Sam arranges on-call coverage; Jamie reroutes investor pings to async-only.
5. **Confirm Figma file shape** (Alex owns; deadline: 2026-05-31 EOD Sunday). Empty Figma file in Brainshelf workspace, named "DS-2026-06-01-prototype", shared with all 4 team members in edit mode.
6. **Final Friday logistics dry-run** (Riley owns; deadline: 2026-06-04 EOD Thursday). Test Zoom + Figma screen-share with one team-member acting as customer; confirm prototype-record settings; confirm interview script will be loaded.

## Recommended Attendees

| Attendee | Role | Required for which days |
|---|---|---|
| Jamie | Decider, PM | All 5 days; specifically owns Wed AM supervote and Fri PM Decider review |
| Alex | Design lead | All 5 days; owns Tue sketches and Thu prototype build (paired with Sam) |
| Sam | Engineering lead | All 5 days; co-owns Thu prototype build; feasibility-checks all sketches |
| Riley | Customer expert + interviewer | All 5 days; owns recruiting through 2026-05-29 and Fri interview moderation |

No cameo experts required. The team is intentionally small and self-sufficient for this sprint; cameo support (e.g., book-industry SME) would be valuable for a future Design Sprint testing a different assumption (e.g., publisher integrations) but is not load-bearing for the camera-capture test.

## Decider Checkpoint

**Decider sign-off required before activating customer recruiting and closing this diagnostic.**

- [x] Jamie confirms the Go verdict and accepts the diagnosis (no preconditions; recruiting is the only watch item).
- [x] Jamie commits to attending all 5 days as Decider, including the load-bearing windows (Mon AM Map and Target, Wed AM heat map plus supervote, Fri PM Decider review by 16:30).
- [x] Jamie authorizes the customer recruiting plan including the USD 600 honorarium budget (6 slots x USD 100).
- [x] Jamie agrees the output should be a Friday scorecard plus a Decider call by 17:30 Friday with an explicit build / iterate / pivot to Red Bookstore Mode / stop decision.
- [x] Jamie acknowledges that if A1 invalidates Friday, the team will commit to the Red Bookstore Mode pivot rather than re-running the same Design Sprint with adjusted prototype.

**Signed:** Jamie (founder, PM), 2026-05-15 14:20 PT.

**Recruiting authorized; sprint locked for 2026-06-01 through 2026-06-05.**

</details>
