---
title: "Foundation meeting recap: Brainshelf Resurface Scope Cut"
description: "Sample output for foundation-meeting-recap skill applied to the brainshelf thread (resurface-scope-cut)."
artifact: foundation-meeting-recap
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: brainshelf
context: resurface-scope-cut
---

# Sample: foundation-meeting-recap. Brainshelf Resurface Scope Cut

## Scenario

Brainshelf's Resurface team had a quick 30-minute decision meeting on 2026-04-15 to cut scope for the next sprint after a key engineer (elena-algo) flagged that a planned feature wouldn't fit Q2 capacity. Three attendees: priya-pm, elena-algo, mia-design. Small team, casual notes only (no transcript). The PM runs the recap skill with only her bullet-point notes.

Source Notes:
- Brainshelf is fictional
- All metrics `[fictional]`

## Prompt

```
foundation-meeting-recap @priya-notes.md
```

## Output

```markdown
---
artifact_type: meeting-recap
version: 1.0
generated_at: 2026-04-15T21:45:00Z
generated_by_skill: foundation-meeting-recap

meeting_title: "Resurface Sprint Scope Cut"
meeting_date: 2026-04-15
meeting_start_time: "13:00 PT"
meeting_type: decision-making

project: resurface
topics:
  - scope-cut-decision
  - kept-scope-confirmation

attendees:
  - name: priya-pm
    role: decision-maker
  - name: elena-algo
    role: contributor
  - name: mia-design
    role: contributor
attendees_absent: []

related_agenda: null
related_brief: null

agenda_reconciliation:
  topics_planned: []
  topics_hit: [scope-cut-decision, kept-scope-confirmation]
  topics_skipped: []
  topics_emerged: []

meeting_quality:
  outcomes_achieved: "no agenda outcomes to reconcile"
  started_on_time: null
  ended_on_time: null
  key_attendees_present: true

meeting_type_source: inferred
unassigned_action_ratio: 0.0

input_quality: medium
confidence: medium
visibility: team
status: draft
---

# Meeting recap: Resurface Sprint Scope Cut

## Shareable summary

**Resurface Sprint Scope Cut** | 2026-04-15
Cut topic-clustered algorithm from this sprint (capacity); held recency-weighted (ships as planned).
Top actions: elena-algo: move topic-clustered to next-sprint backlog (Apr 16); mia-design: update design spec to recency-weighted only (Apr 17); priya-pm: note cut in sprint planning doc (Apr 16).
Full recap linked below.

---

## Full recap

### Meeting details

- **Date**: 2026-04-15
- **Actual duration**: [fictional] ~30 min (not timestamped)
- **Attendees present**: priya-pm, elena-algo, mia-design
- **Recording**: none (bullet notes only)

### Overall summary

Elena flagged earlier in the day that fitting both algorithm options into this sprint would overrun by 2 eng-days. Meeting decided to cut topic-clustered option to next sprint; ship recency-weighted this sprint. Short, focused decision meeting with no emergent topics.

### Agenda reconciliation

No prior agenda loaded (small-team ad-hoc meeting). Topic list derived from priya's notes.

### Topics

#### Scope-cut decision

*Type: Decision (inferred from discussion)*

**Discussion**

Elena walked through the capacity math: [fictional] ~3 eng-days for topic-clustered vs. 2 eng-days budget remaining in sprint. Mia confirmed design for recency-weighted is complete and ready; topic-clustered design would need one more pass. Priya weighed: shipping both this sprint risks quality; shipping only recency-weighted keeps the sprint on track.

**Decisions made**

- **Cut topic-clustered algorithm from this sprint; move to next sprint**. rationale: capacity math doesn't fit; design for topic-clustered needs one more pass anyway
- **Hold recency-weighted for this sprint; ship as planned**. rationale: design complete, capacity fits

**Actions**

- [ ] elena-algo: move topic-clustered to next sprint's backlog with full spec | Due: 2026-04-16 | Dependencies: none
- [ ] priya-pm: note the cut + reasoning in sprint planning doc | Due: 2026-04-16

**Open questions**

- None

---

#### Kept-scope confirmation

*Type: Information (inferred)*

**Discussion**

Quick confirmation that remaining scope (recency-weighted + related UI) is on track. Mia flagged a small UX refinement on the notification copy she wants to land before ship.

**Decisions made**

- None (confirmation of existing plan)

**Actions**

- [ ] mia-design: update design spec to reflect recency-weighted only + notification copy refinement | Due: 2026-04-17

**Open questions**

- None

---

### All actions (consolidated by owner)

#### elena-algo

- [ ] Move topic-clustered to next sprint's backlog with full spec | Due: 2026-04-16

#### mia-design

- [ ] Update design spec to reflect recency-weighted only + notification copy refinement | Due: 2026-04-17

#### priya-pm

- [ ] Note the cut + reasoning in sprint planning doc | Due: 2026-04-16

### Meeting quality signals

- **Outcomes achieved**: no agenda outcomes to reconcile (ad-hoc meeting)
- **Time management**: not timestamped; estimated ~30 min
- **Key attendee presence**: all three attendees present

### Next steps

- **When we reconvene**: no formal reconvene; next sprint planning on 2026-04-22
- **What needs to happen first**: elena completes backlog move; mia updates design spec

---

## Sources & References

### Primary inputs

- priya-notes.md (bullet-point notes, partial attribution)

### Referenced artifacts

- Agenda: none (ad-hoc meeting)
- Prior recaps: auto-discovery attempted; none matched

### External references

- None

### Generation context

- **Generated**: 2026-04-15T14:45:00Z
- **Skill version**: 1.0.0
- **Input quality**: medium. bullet notes only; no transcript; attribution required inference
- **Overall confidence**: medium. decisions clearly stated in notes; topic segmentation inferred from discussion order
- **Known gaps**: exact meeting duration not recorded; start/end-on-time signals not available
- **Inferences applied**: meeting type inferred as decision-making [confidence: medium, scope-cut framing cue]; topic structure inferred from notes order
- **Fabrication check**: all action owners (elena-algo, mia-design, priya-pm) in attendees list; 0 unassigned actions
```
