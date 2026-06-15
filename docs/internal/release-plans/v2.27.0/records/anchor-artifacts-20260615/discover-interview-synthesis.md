<!-- Anchor artifact: discover-interview-synthesis (discovery) | scenario onboarding-interviews | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This was the draft all three blind judges scored (anchor run wf_c1261234-93a). The scored original is preserved in git at the 2026-06-15 anchor commit; an operating layer (decisions / owners / maintainer fix-notes) was added 2026-06-15 per maintainer review. -->

---
artifact: interview-synthesis
version: "1.0"
created: 2026-06-15
status: draft
---

# Interview Synthesis: Manager Onboarding Drop-off - Team Scheduling Tool

## Research Overview

### Objective

Understand why new manager accounts go quiet in the first two weeks after signing up for the team scheduling / shift-planning tool, so the product team and growth team can identify and address the friction points driving early abandonment.

### Methodology

- **Format:** Remote video interviews
- **Duration:** ~30 minutes each (5 sessions, ~2.5 hours total)
- **Interviewer(s):** Product research team
- **Date Range:** Participants recruited from sign-ups within the last 30 days (interviews conducted in the same window)

### Participant Summary

| ID | Role/Segment | Team Size | Activation Status | Notes |
|----|--------------|-----------|-------------------|-------|
| P1 | Cafe manager | 8 staff | Signed up, barely used | Returned to group chat after staff missed schedule |
| P2 | Retail shift lead | 22 staff | Active | Power user; bulk import was the key unlock |
| P3 | Restaurant owner | 15 staff | Churned | Lost trust when delivery confirmations were unclear |
| P4 | Gym manager | 6 staff | Active but frustrated | Completed setup despite painful staff-entry experience |
| P5 | Hotel front-desk supervisor | 30 staff | Quiet after week 1 | Mixed workforce; needs print or non-app access |

## Key Themes

### Theme 1: Staff Adoption Is the Product's Single Biggest Vulnerability

**Prevalence:** 3 of 5 participants (P1, P3, P5)

**Summary:** Managers invested time building their first schedule only to discover their staff never received or engaged with it. When the schedule does not reach the team, the tool provides no value and managers revert to prior habits. The product is effectively invisible to managers if staff cannot or do not adopt the receiving side.

**Evidence:**
- P1: "I built the first schedule and then my staff didn't see it. Turns out they never downloaded the app, so I just went back to the group chat."
- P3: "I sent a schedule and three people said they never got it, so I stopped trusting it."
- P5: "My staff are older and not all of them have smartphones, so the app-only thing didn't work for a chunk of my team."

### Theme 2: Initial Setup Is a One-Time Pain That Filters Out Valuable Customers

**Prevalence:** 3 of 5 participants (P1, P2, P4)

**Summary:** Entering staff rosters one at a time is the most commonly cited setup burden. Managers who pushed through or had access to a workaround (like the spreadsheet import) survived onboarding; those who did not had a strong reason to quit before experiencing any value. The setup cost is front-loaded and arrives before any reward is delivered.

**Evidence:**
- P2: "The import from my spreadsheet saved me. If I'd had to type 22 people in I'd have quit."
- P4: "Setup took a whole evening. Adding people one by one was painful."
- P1: "It was fiddly but fine once I got it." (spent 40 minutes on first schedule; did not know about text invite)

### Theme 3: Delivery Confidence Drives Continued Use

**Prevalence:** 3 of 5 participants (P2, P3, P4)

**Summary:** Managers need to know their schedule was seen and acknowledged by staff - not just sent. The absence of visible delivery or read confirmation causes managers to lose trust in the system, especially after early incidents of missed shifts or uncertain notifications. Confirmation is not a nice-to-have; it is core to the product's promise.

**Evidence:**
- P2: "Half the value is knowing they actually saw it. Honestly the notifications are the whole product for me."
- P3: "I couldn't tell if it was sending texts or not. I sent a schedule and three people said they never got it, so I stopped trusting it."
- P4: Loves that staff can swap shifts - indicating continued engagement hinges on active staff participation.

### Theme 4: Feature Discovery Gaps Leave Managers Without the Tools That Would Retain Them

**Prevalence:** 3 of 5 participants (P1, P3, P5)

**Summary:** Several participants struggled or churned for reasons that existing features could have addressed - text invites for P1, SMS delivery status for P3, printable schedules for P5 - but none discovered those features in time. The product has retention capabilities that new users are not reaching.

**Evidence:**
- P1: "Didn't know there was a way to send a text invite to staff." (noted by interviewer)
- P3: "Too many toggles I didn't understand." (couldn't navigate to delivery confirmation settings)
- P5: "I needed a printable version and couldn't find one fast."

## Notable Quotes

> "I built the first schedule and then my staff didn't see it. Turns out they never downloaded the app, so I just went back to the group chat." - P1, cafe manager (8 staff; reverted to prior tools after first delivery failure)

> "The import from my spreadsheet saved me. If I'd had to type 22 people in I'd have quit." - P2, retail shift lead (22 staff; the import feature was the difference between activation and churn)

> "I couldn't tell if it was sending texts or not. I sent a schedule and three people said they never got it, so I stopped trusting it." - P3, restaurant owner (15 staff; churned after delivery uncertainty)

> "Setup took a whole evening. Adding people one by one was painful. Once it's set up it's great, but getting there is the problem." - P4, gym manager (6 staff; completed setup but described it as a barrier)

> "My staff are older and not all of them have smartphones, so the app-only thing didn't work for a chunk of my team." - P5, hotel front-desk supervisor (30 staff; non-smartphone workforce excluded from the delivery channel)

> "Half the value is knowing they actually saw it. Honestly the notifications are the whole product for me." - P2, retail shift lead (articulates that the value proposition is confirmation, not just scheduling)

> "The best one I've tried." - P5, on the schedule builder itself (positive signal: the core tool earns goodwill even from disengaged users)

## Insights

### Insight 1: The Manager's First Week Succeeds or Fails on Staff-Side Activation, Not Manager-Side Features

Managers evaluate the product based on whether their team actually received and acted on the schedule - not on the quality of the scheduling interface itself. P1 had a functional first schedule but abandoned the product when staff never saw it. P3 sent a schedule in good faith and lost confidence when staff reported not receiving it. P5 found the builder "the best one I've tried" but went quiet because the delivery channel excluded part of her team. The product's onboarding treats staff invitation as an afterthought after the schedule is built, but staff activation is the prerequisite for the tool delivering any value at all. Managers will not persist through a second week if the first delivery fails.

**Implication:** Staff invitation and confirmation of receipt should be surfaced as the first success milestone in onboarding, not a follow-on step. The product should not let a manager complete and "send" their first schedule without resolving how staff will receive it.

### Insight 2: A Single High-Friction Setup Moment (Roster Entry) Is Filtering Out Potentially High-Value Customers Before They Experience Value

P2 (22 staff, active power user) explicitly credited the spreadsheet import with preventing her churn. P4 (6 staff) survived the same one-by-one entry process but described it as "a whole evening" - a cost that with different circumstances could have ended the trial. The managers most likely to commit to a scheduling tool are those managing the most staff, but they face the highest setup burden. The import feature exists and demonstrably changes outcomes, but it is not surfaced prominently enough to reach users before they hit the friction point.

**Implication:** The spreadsheet import (and bulk-invite alternatives) must be the first path offered at roster setup, not a discoverable workaround. For managers above a certain team-size threshold, the import should be proactively recommended or defaulted.

### Insight 3: Delivery Uncertainty Is a Trust Killer That Spreads from a Single Incident

Managers are operationally responsible for their shifts. When a schedule is sent and later disputed ("three people said they never got it"), the manager absorbs the blame even if the tool was technically functional. This is an asymmetric risk: one missed-delivery incident is enough to invalidate the product in the manager's mind. P3 churned entirely on this basis. P2 - who stayed - did so in part because she had delivery confirmation that rebuilt her trust. The absence of a clear "sent, delivered, seen" status creates an accountability gap that managers cannot tolerate professionally.

**Implication:** Delivery status should be transparent, per-recipient, and displayed by default on any sent schedule - not buried in settings. Shift-confirmation from staff (P2's "half the value") should be a prominent first-week moment that demonstrates the product is working.

### Insight 4: The Product Has Retention Features That New Users Cannot Find Under Pressure

Text invites (P1), delivery settings (P3), and printable schedules (P5) are features that could have changed each participant's outcome. None found them in time. The settings UI was described as having "too many toggles I didn't understand" (P3). The product appears to contain the solutions to its own onboarding failures, but those solutions are buried behind a general settings experience rather than surfaced contextually at the moment of need.

**Implication:** Critical onboarding features should be triggered contextually - when staff don't download the app, prompt the text invite; when a schedule is sent, surface delivery status automatically; when a large team is detected or a non-smartphone context is raised, surface print/export. The path to value should not require users to discover features through exploration.

## Recommendations

| Priority | Recommendation | Related Insight | Confidence |
|----------|---------------|-----------------|------------|
| 1 | Make staff invitation and delivery confirmation a required first-schedule step | Insight 1 | High |
| 2 | Surface the spreadsheet import (and SMS invite) as the primary roster-entry method for managers with 5+ staff | Insight 2 | High |
| 3 | Add per-recipient delivery and read status visible by default on every sent schedule | Insight 3 | High |
| 4 | Build contextual feature prompts that trigger on known failure signals during the first two weeks | Insight 4 | Medium |
| 5 | Investigate and add a printable / non-app schedule delivery option | Insight 1, Insight 4 | Medium |

### Recommendation Details

**1. Require Staff Activation Before the Manager Considers Onboarding "Done"**

Redesign the first-schedule flow so that after building a schedule, the manager is guided to invite their staff before the schedule is sent. The confirmation step - "your staff have been invited and can now see this schedule" - should be the moment the product declares onboarding complete. Proactively surface the text invite option (which P1 never found) as the default invitation path for staff who have not downloaded the app. Success metric: percentage of managers whose staff have at least one accepted invitation within 48 hours of account creation.

**2. Default Roster Entry to Bulk Import for Larger Teams**

For managers entering more than 5-10 staff members one by one, proactively interrupt and offer the spreadsheet import path. Make the import prominently visible at the start of the staff-entry step - not discoverable only after the user is already frustrated. Consider adding a CSV template pre-formatted for common payroll or scheduling spreadsheet formats. The goal is that the first person to add 22 staff to the product does not have to stumble on the import feature by accident. Success metric: reduction in time-to-first-schedule-sent for managers with 10+ staff.

**3. Add Transparent Per-Recipient Delivery and Read Status**

After any schedule is sent, show the manager a delivery dashboard with per-staff status: invited, delivered, opened, confirmed. This eliminates the trust-breaking ambiguity that caused P3 to churn. Make shift confirmation by staff a celebrated "first confirmation" moment - frame it as proof the product is working, not just a feature. Tie the first staff confirmation to a manager-facing notification that validates their investment in setup. Success metric: percentage of managers who see at least one staff read/confirmation within the first week.

**4. Trigger Contextual Help at Observed Failure Signals**

Instrument the first two weeks for known failure patterns and respond with targeted interventions: if staff have not joined after 48 hours, prompt the manager to use SMS invite; if a schedule shows no delivery confirmations after 24 hours, surface a "check your delivery settings" prompt; if team size exceeds a threshold for diverse device access, proactively mention print/export options. These prompts should be specific and action-oriented, not generic help-center links. Success metric: reduction in manager accounts with zero staff engagement at day 7.

**5. Add a Printable / Non-App Delivery Path**

P5's situation (older workforce, not all with smartphones) represents a real workforce segment in hospitality and retail. An app-only delivery channel is a structural barrier for this segment. A printable schedule export - ideally formatted for a standard A4 or letter sheet with shift details - would serve this segment and prevent drop-off among managers whose staff composition makes app adoption unlikely. This can be positioned as a transitional tool while staff uptake grows, not as an alternative to the app. Success metric: adoption rate among managers with 15+ staff in hospitality/hotel segments.

## Decision Implications, Owners & Open Items

> Operating layer (added 2026-06-15, maintainer review). The recommendations above are strong but mix
> immediate product changes with work that should be validated first; n=5 surfaces themes, it does not
> establish prevalence. This section splits them by readiness and assigns owners. Owners/dates illustrative.

**Do now (high confidence, low regret - the evidence is clear and the change is reversible):**
- Make staff invitation + delivery confirmation the first-schedule success milestone (Rec 1).
- Default roster entry to bulk import / SMS invite for managers with 5+ staff (Rec 2).
- Show per-recipient delivery + read status by default on every sent schedule (Rec 3).

**Not yet (do not build at scale until validated):**
- The printable / non-app delivery path as a full feature (Rec 5) - validate the affected segment's size first; a lightweight export is fine to prototype, a roadmap commitment is not.
- Any larger onboarding re-architecture beyond the three "do now" changes - the sample cannot justify it.

**Needs validation before committing (the n=5 caveat):**
- Prevalence of each drop-off point at scale (quant activation-funnel analysis).
- Staff-side adoption barriers (interview shift workers, not just managers).
- The size of the non-smartphone / print-need segment by vertical and team size.
- Contextual failure-signal prompts (Rec 4) - confirm the failure signals are real and frequent before building the triggers.

| ID | Title | Final decision (summary) | Status | Owner | Due | Last updated |
|----|-------|--------------------------|--------|-------|-----|--------------|
| D-1 | Staff-activation-first onboarding (Rec 1-3) | Proceed - high-confidence "do now" set | DECIDED | Product + Growth | Next sprint | 2026-06-15 |
| D-2 | Validation cohort (quant funnel + staff interviews) | Pending - stand up before major roadmap bets | GATED | PM + Research | Before Q+1 roadmap lock | 2026-06-15 |
| D-3 | Printable / non-app path | Pending - validate segment size first | GATED | PM | After D-2 segment read | 2026-06-15 |

### D-1: Ship the high-confidence onboarding set (Rec 1-3)
Status: DECIDED
**Context** - Staff-side activation, bulk import, and delivery status are each High-confidence, multiply-evidenced, and low-regret. Value: directly attacks the first-week drop-off the research was commissioned to explain.
**Potential solutions** - (a) wait for the validation cohort; (b) ship the three now, validate the rest in parallel. Recommendation: (b) - these are reversible UX changes, not architecture bets.
**Final decision** - Ship the three changes next sprint **as reversible UX experiments** - each behind a flag or otherwise easily revertible, instrumented against its success metric, with a pre-agreed rollback if it regresses activation or raises support load. This keeps an n=5-driven decision low-risk: we act on the strong signal now but can undo cheaply. Owner: Product + Growth.

### D-2: Stand up the validation cohort
Status: GATED follow-up (owned; gate below)
**Context** - n=5 is theme-surfacing, not prevalence-confirming; major roadmap bets need quant + staff-side evidence. Value: prevents over-fitting the roadmap to five interviews.
**Potential solutions** - (a) act on n=5 alone; (b) run a funnel-quant + staff-side interview pass before locking the next roadmap. Recommendation: (b).
**Final decision** - Pending. Owner: PM + Research; before the next roadmap lock.

### D-3: Printable / non-app delivery path
Status: GATED follow-up (owned; gate below)
**Context** - P5's non-smartphone workforce is real but its breadth is unknown from one interview. Value: serve a structurally-excluded segment without over-investing.
**Potential solutions** - (a) build the full print path now; (b) prototype a lightweight export, size the segment via D-2, then decide. Recommendation: (b).
**Final decision** - Pending on the D-2 segment read. Owner: PM.

## Appendix

### Methodology Notes

Interviews were conducted remotely, each approximately 30 minutes. Participants were recruited from manager accounts that signed up within the last 30 days. Notes represent interviewer summaries of key observations and direct quotes; full transcripts were not provided for this synthesis. The selection of five participants spans a range of team sizes (6-30 staff), industry verticals (cafe, retail, restaurant, gym, hotel), and activation states (active, quiet, churned).

### Limitations

- **Small sample (n=5):** Five participants is sufficient to surface themes but not to establish prevalence with confidence. Patterns should be validated with a larger cohort before committing to major roadmap changes.
- **No truly active-and-satisfied comparison group:** P2 and P4 are active but both surface frustrations. The synthesis lacks a participant who had a frictionless onboarding experience, which would help isolate what works.
- **Recall bias:** Participants were recalling events from the past 30 days; exact timelines and emotional context may be compressed or distorted.
- **Self-selection in recruitment:** Managers who agreed to a 30-minute research call may not represent the silent majority who churned without engagement.
- **Single interviewer perspective:** Notes were filtered through one interviewer's summaries; no inter-rater reliability check was performed on theme coding.
- **Areas for further research:** (1) Quantitative analysis of activation funnel to confirm which drop-off points are most common at scale. (2) Interviews with staff-side users (shift workers) to understand barriers to app adoption from their perspective. (3) Segment analysis by industry vertical and team size to determine whether the print/non-app need is concentrated or broad.

### Raw Notes

Raw notes provided as structured interview summaries per participant (P1-P5) in the research brief. No transcript-level source files were available for this synthesis. Interview recordings, if retained, should be stored in the research repository alongside this document.
