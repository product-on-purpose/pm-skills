<!-- Anchor artifact: iterate-retrospective (learning) | scenario sprint-42 | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This was the draft all three blind judges scored (anchor run wf_c1261234-93a). The scored original is preserved in git at the 2026-06-15 anchor commit; an operating layer (decisions / owners / maintainer fix-notes) was added 2026-06-15 per maintainer review. -->

---
artifact: retrospective
version: "1.0"
created: 2026-06-14
status: draft
---

# Retrospective: Sprint 42

## Overview

**Period Covered:** Sprint 42 (two-week sprint ending Friday, 2026-06-13)
**Date Held:** 2026-06-14
**Facilitator:** PM
**Duration:** 60 minutes
**Format Used:** Start/Stop/Continue

### Attendees

- PM, Product Manager
- Designer
- Priya, Engineer (frontend/fullstack)
- Marco, Engineer (fullstack)
- Lee, Engineer (backend)
- Fourth Engineer
- Sam, QA

### Context

Sprint 42 was a mixed sprint. The new payment-method UI shipped successfully and early user feedback has been positive. However, a production incident on Wednesday took checkout down for approximately 25 minutes after a config change with no clear incident owner. Mid-sprint scope additions - two tickets pulled in without compensating cuts - caused slippage across the board. A staging environment outage lasting two days slowed QA throughput. The sprint also surfaced estimation accuracy problems on the integration ticket.

---

## Previous Retrospective Review

### Action Items from Last Retro (Sprint 41)

| Action | Owner | Status | Notes |
|--------|-------|--------|-------|
| Set up a clear on-call rotation | Priya | Not Started | This action was not completed and directly contributed to the Sprint 42 incident, where no one knew who was on call during the checkout outage. |
| Add a design-review checkpoint to the start of each ticket | Designer | In Progress | Tried once during the sprint. Not yet a consistent practice; late design review was still raised as a pain point this sprint. |
| Document the staging reset procedure | Lee | Complete | Done. Noted and celebrated. |

**Accountability note:** The incomplete on-call action had real consequences this sprint. The team acknowledged this directly. It is re-prioritized as the top action item for Sprint 43.

---

## What Went Well

### Team Highlights

- The new payment-method UI shipped within the sprint and early user feedback is positive.
- Pairing on the refund bug resolved a potentially day-long blocker in under an hour.
- QA caught a currency-rounding bug before it reached production.

### Process Wins

- Same-sprint pairing as an escalation response worked fast and is worth repeating.
- Lee completing the staging reset documentation (Sprint 41 carry-over) gave the team a reference, even though the staging environment still broke - having the procedure documented likely limited the damage.

### Individual Shoutouts

- Sam (QA): caught the currency-rounding bug before release. This is exactly the kind of catch that prevents customer-facing payment errors.
- Lee: completed the staging documentation despite a quiet presence in this retro.

---

## What to Improve

### Challenges Faced

- No clear incident owner during the Wednesday checkout outage; on-call rotation was never established (carry-over from Sprint 41).
- Two tickets added mid-sprint with no corresponding scope reduction caused everything to slip.
- Design review happened after engineers had already built, requiring rework.
- The staging environment was broken for two days, slowing QA's ability to test.
- Estimates on the integration ticket were significantly off.

### Process Pain Points

- Incident response has no defined playbook or rotation, so ownership defaults to whoever speaks up first (or no one).
- The team has no gate preventing mid-sprint scope additions - if something comes in, it gets pulled in.
- The design-review checkpoint from Sprint 41 was tried once but has not become a consistent habit.
- Staging environment reliability is low and there is no shared alerting when it goes down.
- Estimation on complex integration work lacks a structured approach (e.g., spike, time-box, explicit assumption list).

### Themes Identified

| Theme | Items | Votes |
|-------|-------|-------|
| Incident readiness | No on-call rotation, no incident playbook, unclear ownership during outage | 5 |
| Scope discipline | Mid-sprint additions with no cuts, slippage across all tickets | 4 |
| Design-to-engineering handoff | Late design review, build-before-review pattern | 3 |
| Test environment reliability | Staging down for two days, no alerting, slowed QA | 3 |
| Estimation accuracy | Wildly off on integration ticket | 2 |

---

## Discussion Notes

### Production Incident and On-Call Rotation

**What was discussed:**
The Wednesday incident was the most urgent topic. Checkout was down for ~25 minutes following a config change. During that window, no one knew who owned incident response - people weren't sure who was on call because no rotation exists. The team connected this directly to the Sprint 41 action item that Priya owned but did not complete.

**Root cause identified:**
No on-call rotation has been defined or communicated. When an incident starts, ownership defaults to whoever notices first, which creates confusion and slows response time.

**Proposed solution:**
Define and publish an on-call rotation before the end of Sprint 43, Week 1. Pair it with a one-page incident-response checklist so the on-call person knows exactly what to do when something breaks. The PM will draft the rotation; Priya will validate with the engineering team and own the final publish.

---

### Mid-Sprint Scope Additions

**What was discussed:**
Marco raised that two tickets were added mid-sprint without removing anything else, and everything slipped as a result. The team agreed this is a pattern, not a one-time event. There was discussion about whether the additions were truly urgent or whether they just felt urgent at the time.

**Root cause identified:**
No explicit process or norm exists for handling inbound requests mid-sprint. The default behavior is to add without cutting, which overloads the sprint.

**Proposed solution:**
Adopt a "one in, one out" norm starting Sprint 43: any ticket added mid-sprint requires an equivalent scope reduction or a documented exception approved by the PM. PM will propose a lightweight intake template for mid-sprint additions for the team to review at Sprint 43 planning.

---

### Design Review Timing

**What was discussed:**
The designer raised that engineers had already built before design review happened on at least one ticket this sprint. This is the second sprint in a row where the review checkpoint from Sprint 41 either did not happen or happened too late to change direction without rework.

**Root cause identified:**
The checkpoint was defined at the ticket level ("add a checkpoint to the start of each ticket") but the habit has not been operationalized - it is not visible in the workflow or the ticket template.

**Proposed solution:**
Add a "Design reviewed" checklist item directly to the ticket template in the team's project management tool so it is visible before work begins, not as an afterthought. Designer will update the template before Sprint 43 begins.

---

### Staging Environment Reliability

**What was discussed:**
Lee raised (quietly) that staging was broken for two days this sprint. The team was not fully aware of the impact on QA until it was surfaced in the retro. Sam confirmed it significantly slowed testing.

**Root cause identified:**
There is no alerting when staging goes down, and no clear owner for staging environment health. Issues surface only when someone notices manually.

**Proposed solution:**
Set up a basic uptime check on the staging environment with a notification to the team Slack channel. Lee will scope the work; the team will decide in Sprint 43 planning whether to pull it in as a ticket.

---

## Root-Cause Tightening

> Operating layer (added 2026-06-15, maintainer review). The discussion notes above label the missing
> mechanism (no rotation, no intake norm, no workflow checkpoint) as the "root cause." That is the
> SYMPTOM/gap. The table below separates symptom from the deeper root cause from the action from the
> success metric, so the team fixes the cause, not just the surface. The actions already carry owners and
> due dates in the next section; this sharpens why each is the right fix.

| Theme | Symptom (what we saw) | Stated "cause" (the gap) | Deeper root cause (why the gap persists) | Action | Success metric |
|-------|-----------------------|--------------------------|------------------------------------------|--------|----------------|
| Incident readiness | 25-min checkout outage, no one knew who owned response | "No on-call rotation defined" | Operational readiness is un-owned: the Sprint 41 rotation action had an owner but no forcing function, so it slipped with zero consequence until an incident made it visible | A1 (rotation + 15-min incident checklist) | Every engineer can state current on-call without looking; next incident has an owner within 5 min |
| Scope discipline | 2 tickets added mid-sprint, slippage across all | "No process for inbound mid-sprint requests" | The sprint commitment is not treated as a protected contract: urgency is accepted at face value with no gate-keeper enforcing a trade-off | A3 ("one in, one out" + intake template) | The norm is invoked at the first mid-sprint request; zero slippage attributable to un-traded additions |
| Design-to-eng handoff | Engineers built before design review; rework | "Checkpoint not operationalized" | The Sprint 41 fix relied on memory/informality with no workflow enforcement; a habit with no system regresses | A2 ("Design reviewed" gate in the ticket template) | Template live before kickoff; zero build-before-review tickets in Sprint 43 |

The deeper-cause read also explains the recurrence (two sprints in a row): each prior fix addressed the gap with an informal commitment rather than a system + an accountable owner. The Sprint 43 actions deliberately add the system (published rotation, ticket-template gates, a written intake norm).

### Action follow-through (between retros)

The recurring failure mode is actions reviewed only at the *next* retro - too late to course-correct, which is how the Sprint 41 on-call action slipped into the Sprint 42 incident. Closing that loop without waiting for the next retro: the PM posts a one-line status for each open action in the team channel at **sprint mid-point (Wednesday of week 2)**; any action still `Not Started` whose due date falls inside the sprint is re-owned or escalated on the spot. This is a lightweight async check, not a meeting, and it makes carry-over visible while there is still time to act. Owner: PM (the facilitator), every sprint.

## Action Items

| Priority | Action | Owner | Due Date | Status |
|----------|--------|-------|----------|--------|
| 1 | Define and publish on-call rotation + one-page incident checklist | Priya (publish) / PM (draft rotation) | End of Sprint 43 Week 1 (2026-06-20) | Not Started |
| 2 | Add "Design reviewed" checklist item to ticket template | Designer | Before Sprint 43 kickoff (2026-06-16) | Not Started |
| 3 | Adopt "one in, one out" mid-sprint scope norm; PM to draft intake template | PM | Sprint 43 planning (2026-06-16) | Not Started |
| 4 | Scope a staging uptime check with Slack alerting | Lee | Sprint 43 planning (2026-06-16) for scoping; build TBD | Not Started |

### Action Item Details

**Action 1: On-call rotation and incident checklist**
- What: PM drafts a rotation covering all engineers for the next 6 sprints. Priya reviews with the team and publishes it in the shared team wiki. Separately, Priya creates a one-page incident-response checklist (who does what in the first 15 minutes of an outage).
- Why: Directly addresses the Wednesday checkout incident and the Sprint 41 carry-over. No on-call rotation means every incident starts with ownership confusion.
- Success criteria: Rotation is published and visible to the whole team before end of Sprint 43 Week 1. All engineers can state who is on call for the current week without looking it up.

**Action 2: Design-reviewed ticket checklist item**
- What: Designer updates the ticket template in the project management tool to include a mandatory "Design reviewed" checkbox that must be checked before engineering begins. Template applies to all feature and UI tickets going forward.
- Why: The Sprint 41 action ("add a design-review checkpoint") was too informal to stick. Making it visible in the ticket workflow closes the gap.
- Success criteria: Updated template is live before Sprint 43 kicks off. At least one ticket in Sprint 43 uses it with the checkbox checked before build starts.

**Action 3: Mid-sprint scope intake norm**
- What: PM drafts a one-paragraph "one in, one out" norm and a lightweight intake form (3-5 fields: what, why now, what comes out) to be reviewed at Sprint 43 planning. Team agrees on the norm or amends it; PM records the decision.
- Why: Recurring mid-sprint scope creep without compensating cuts causes slippage every sprint.
- Success criteria: Norm is agreed upon at Sprint 43 planning and referenced the first time a mid-sprint addition request comes in.

**Action 4: Staging uptime check scoping**
- What: Lee scopes a basic uptime check (e.g., HTTP health endpoint pinging every 5 minutes) with a Slack notification when staging goes down. Brings a ticket estimate to Sprint 43 planning for the team to decide whether to pull it in.
- Why: Staging was down for two days with no alert. QA cannot test efficiently against a broken environment and the team did not know the scope of the problem until the retro.
- Success criteria: Lee presents a scoped ticket at Sprint 43 planning. Team makes an informed pull-in/defer decision.

---

## Parking Lot

- **Estimation improvement process:** The integration ticket estimates were "wildly off" but the team did not have time to go deep on root cause or technique. Suggested for a dedicated discussion in Sprint 43 or as a standalone working session - consider spike time-boxes and assumption documentation as starting points.
- **Quiet voices in the retro:** Lee and Sam both had important observations (staging outage, QA currency-rounding catch) that almost did not surface. Facilitator to try a written silent input round (e.g., sticky notes or async tool) before the next retro to give quieter contributors more space before verbal discussion begins.

---

## Metrics and Trends

### Team Health Indicators

| Indicator | This Retro | Last Retro | Trend |
|-----------|------------|------------|-------|
| Team morale (1-5) | 3 | 3 | -> |
| Process satisfaction (1-5) | 2 | 3 | down |
| Collaboration (1-5) | 3 | 3 | -> |

*Scores are PM's facilitated read based on room energy and discussion tone, not a formal vote. Consider adding a dot-vote at the start of Sprint 43 to calibrate.*

### Recurring Themes

- **On-call / incident ownership:** surfaced in Sprint 41 (action not completed) and Sprint 42 (incident with no clear owner). Two sprints in a row. This must close in Sprint 43.
- **Design-to-engineering sequencing:** surfaced in Sprint 41 (action partially done) and Sprint 42 (late review still happened). Two sprints in a row. Ticket template change is intended to operationalize what the informal agreement could not.
- **Scope creep mid-sprint:** mentioned in prior sprints informally; named explicitly by Marco in Sprint 42 for the first time as a systemic issue.

---

## Facilitator Notes

- Priya and Marco dominated verbal discussion, as expected. Lee's staging observation was surfaced only because the PM explicitly asked quieter members to add anything before closing the "What was rough" round. Sam's QA catch came up when the PM credited Sam by name in the "What went well" section. Both interventions were necessary.
- Next retro: try a silent written round (async or sticky notes at the start) before open verbal discussion. This will likely surface Lee and Sam's observations without requiring a direct prompt.
- The incomplete Sprint 41 on-call action had a direct consequence this sprint. Acknowledge carry-over items briefly at the start of each retro (not just at the end) so accountability is front of mind when the team is most engaged.
- The parking-lot estimation topic deserves its own session - it is too nuanced for retro time but also too important to let sit. PM to follow up with a calendar invite for a 45-minute estimation working session in Sprint 43.

---

## Next Retrospective

**Scheduled:** End of Sprint 43 (approximately 2026-06-28)
**Focus areas:**
- Review Sprint 43 action items (on-call rotation live? ticket template working? scope norm tested?)
- Check estimation working session outcome if held
- Formal team health dot-vote to calibrate morale/satisfaction scores

---

*Retrospective documented by PM on 2026-06-14.*
