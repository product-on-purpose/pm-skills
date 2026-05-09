---
title: "Foundation meeting recap: Storevine Campaigns Pricing Decision"
description: "Sample output for foundation-meeting-recap skill applied to the storevine thread (campaigns-pricing-decision)."
artifact: foundation-meeting-recap
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: storevine
context: campaigns-pricing-decision
---

# Sample: foundation-meeting-recap. Storevine Campaigns Pricing Decision

## Scenario

Storevine's Campaigns team held a 45-minute decision meeting on 2026-04-24 to commit pricing tier for Campaigns v1. Four attendees: jonathan-pm, maria-eng, alex-marketing, sam-data. Meeting had an agenda (auto-discoverable), a transcript from Otter, and live notes. PM jonathan runs the recap skill after the meeting to produce a topic-segmented summary with decisions highlighted.

Source Notes:
- Storevine is fictional
- Otter is a real transcription service
- Klaviyo pricing referenced is publicly available
- All metrics `[fictional]`

## Prompt

```
/meeting-recap @campaigns-pricing-decision-transcript.txt @jonathan-live-notes.md
```

## Output

```markdown
---
artifact_type: meeting-recap
version: 1.0
generated_at: 2026-04-24T19:30:00Z
generated_by_skill: foundation-meeting-recap

meeting_title: "Campaigns Pricing Decision"
meeting_date: 2026-04-24
meeting_start_time: "13:00 EST"
meeting_type: decision-making

project: campaigns
topics:
  - tier-structure
  - grandfathering
  - rollout-date

attendees:
  - name: jonathan-pm
    role: decision-maker
  - name: maria-eng
    role: contributor
  - name: alex-marketing
    role: contributor
  - name: sam-data
    role: contributor
attendees_absent: []

related_agenda: 2026-04-24_13-00EST_campaigns-pricing-decision_agenda.md
related_brief: null

agenda_reconciliation:
  topics_planned: [tier-structure, grandfathering, rollout-date]
  topics_hit: [tier-structure, grandfathering, rollout-date]
  topics_skipped: []
  topics_emerged: [comms-plan-ownership]

meeting_quality:
  outcomes_achieved: "3/3"
  started_on_time: true
  ended_on_time: false
  key_attendees_present: true

meeting_type_source: explicit
unassigned_action_ratio: 0.0

input_quality: high
confidence: high
visibility: team
status: draft
---

# Meeting recap: Campaigns Pricing Decision

## Shareable summary

**Campaigns Pricing Decision** | 2026-04-24
Two-tier structure committed (Starter $19/mo [fictional], Pro $49/mo [fictional]); 12-month grandfathering for beta users; rollout 2026-06-10. All 3 agenda topics decided + comms-plan ownership assigned.
Top actions: alex-marketing: draft customer-comms sequence (May 1); maria-eng: billing-system tickets (Apr 29); sam-data: tier-conversion telemetry (May 8).
Full recap linked below.

---

## Full recap

### Meeting details

- **Date**: 2026-04-24
- **Actual duration**: 50 min (ran 5 over)
- **Attendees present**: jonathan-pm, maria-eng, alex-marketing, sam-data
- **Recording**: https://meet.example/campaigns-pricing-recording

### Overall summary

All three planned decisions landed: two-tier structure ($19 / $49), 12-month grandfathering for beta users, and 2026-06-10 rollout. An emergent question on comms-plan ownership was resolved (alex-marketing owns). Meeting ran 5 minutes over due to the comms-plan discussion.

### Agenda reconciliation

- **Planned topics**: tier-structure, grandfathering, rollout-date
- **Topics addressed**: tier-structure, grandfathering, rollout-date (3 of 3)
- **Topics emerged**: comms-plan-ownership. arose from discussion of rollout-date transition communication

### Topics

#### Tier structure

*Type: Decision (from agenda)*

**Discussion**

Reviewed three options from the pricing proposal: single-tier, two-tier, and three-tier. Competitive reference: Klaviyo's pricing structure (real). Sam's data showed [fictional] 68% of current Campaigns beta users correlate with Storevine merchants earning $10K-$100K/mo GMV, supporting a two-tier model matching merchant revenue bands.

**Decisions made**

- **Two-tier structure: Campaigns Starter at $19/mo [fictional], Campaigns Pro at $49/mo [fictional]**. rationale: matches merchant-revenue distribution; simpler to communicate than three-tier; leaves room for future Enterprise tier without promising it now

**Actions**

- [ ] maria-eng: ticket billing-system changes for two-tier support | Due: 2026-04-29 | Dependencies: none

**Open questions**

- None on tier structure itself

---

#### Grandfathering

*Type: Decision (from agenda)*

**Discussion**

Beta users currently pay a promotional $9/mo [fictional]. Options discussed: no grandfathering (migration on launch), 6-month grandfathering, 12-month grandfathering. Alex flagged that abrupt migration would generate support volume and damage trust; sam flagged that [fictional] 12-month grandfathering costs ~$18K in foregone revenue but preserves ~340 accounts.

**Decisions made**

- **12-month grandfathering at current beta pricing ($9/mo) for existing Campaigns beta users**. rationale: preserves trust; cost is bounded; standard pm-skills pattern for paid-tier migration

**Actions**

- [ ] alex-marketing: include grandfathering in customer-comms email sequence | Due: 2026-05-01

**Open questions**

- None

---

#### Rollout date

*Type: Decision (from agenda)*

**Discussion**

Engineering timeline from maria's capacity model supports 2026-06-10 launch. Alex requested 2 weeks prior for marketing preparation. Sam confirmed telemetry setup fits the timeline.

**Decisions made**

- **Rollout date: 2026-06-10 for new customers; existing users grandfathered 2026-06-10 to 2027-06-10**. rationale: fits eng timeline, gives marketing enough runway, grandfathering end aligned to 12-month decision

**Actions**

- [ ] sam-data: set up tier-conversion telemetry in analytics | Due: 2026-05-08

**Open questions**

- None

---

#### Comms-plan ownership (emergent)

*Type: Decision (emergent. not on agenda)*

**Discussion**

Alex raised the question of who owns the customer-comms rollout sequence. Consensus: alex-marketing owns drafting; jonathan-pm owns review; sam-data provides segment lists.

**Decisions made**

- **alex-marketing owns customer-comms drafting; jonathan-pm reviews; sam-data provides segment lists**. rationale: alex has the comms background; separating drafting from review preserves bandwidth

**Actions**

- [ ] alex-marketing: draft customer-comms email sequence | Due: 2026-05-01

**Open questions**

- None

---

### All actions (consolidated by owner)

#### alex-marketing

- [ ] Draft customer-comms email sequence | Due: 2026-05-01 | Topic: comms-plan-ownership
- [ ] Include grandfathering in customer-comms email sequence | Due: 2026-05-01 | Topic: grandfathering

#### maria-eng

- [ ] Ticket billing-system changes for two-tier support | Due: 2026-04-29 | Topic: tier-structure

#### sam-data

- [ ] Set up tier-conversion telemetry | Due: 2026-05-08 | Topic: rollout-date

### Meeting quality signals

- **Outcomes achieved**: 3 of 3 stated outcomes met
- **Time management**: on time start; 5 min over due to emergent comms-plan topic
- **Key attendee presence**: all decision-makers present

### Next steps

- **When we reconvene**: no formal reconvene; rollout-status check at 2026-05-22 regular product review
- **What needs to happen first**: maria completes billing-system tickets; alex completes comms draft

---

## Sources & References

### Primary inputs

- Transcript: otter-recording-2026-04-24 (50 min, speaker-attributed)
- jonathan-live-notes.md (supplementary for action-item context)

### Referenced artifacts

- Agenda: 2026-04-24_13-00EST_campaigns-pricing-decision_agenda.md. used for topic skeleton + outcome reconciliation
- Prior recaps: 2026-04-17_14-00EST_campaigns-feature-launch-kickoff_recap.md (consulted for kickoff decisions)

### External references

- [Pricing proposal doc](https://notion.example/campaigns-pricing-proposal) [fictional]
- [Klaviyo pricing](https://www.klaviyo.com/pricing) (competitive reference)

### Generation context

- **Generated**: 2026-04-24T16:30:00Z
- **Skill version**: 1.0.0
- **Input quality**: high. transcript + notes; all speakers identifiable
- **Overall confidence**: high. decisions and actions directly supported
- **Known gaps**: None identified
- **Inferences applied**: none required. all fields explicitly captured
- **Fabrication check**: all action owners (alex-marketing, maria-eng, sam-data, jonathan-pm) in attendees list; 0 unassigned actions
```
