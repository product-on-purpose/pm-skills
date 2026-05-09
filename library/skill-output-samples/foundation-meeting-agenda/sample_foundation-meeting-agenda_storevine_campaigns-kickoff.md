---
title: "Foundation meeting agenda: Storevine Campaigns Kickoff"
description: "Sample output for foundation-meeting-agenda skill applied to the storevine thread (campaigns-kickoff)."
artifact: foundation-meeting-agenda
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: storevine
context: campaigns-kickoff
---

# Sample: foundation-meeting-agenda. Storevine Campaigns Kickoff

## Scenario

Storevine is a B2B all-in-one ecommerce platform (Series A, ~70 employees, ~15K merchants). The product team is launching Campaigns, a built-in email and SMS re-engagement feature that competes with separate-tool stacks like Klaviyo or Mailchimp. The PM is running a cross-functional kickoff to commit scope, engineering capacity, and a launch target. Four attendees: jonathan (PM), maria (eng lead), alex (marketing lead), sam (data analyst). Sixty minutes. The PM has a prior research doc and a capacity model ready.

Source Notes:
- Storevine, Brainshelf, and Workbench are fictional products used consistently across this sample library
- Klaviyo and Mailchimp are real competitors; public pricing and positioning used for context
- All metrics are `[fictional]`

## Prompt

```
/meeting-agenda "Campaigns feature launch kickoff; Thursday 2pm EST; 60 min; scope, capacity, launch target. Attendees: jonathan (PM), maria (eng lead), alex (marketing lead), sam (data analyst). Pre-read: scope doc and capacity model."
```

## Output

```markdown
---
artifact_type: meeting-agenda
version: 1.0
generated_at: 2026-04-17T13:00:00Z
generated_by_skill: foundation-meeting-agenda

meeting_title: "Campaigns Feature Launch Kickoff"
meeting_date: 2026-04-17
meeting_start_time: "14:00 EST"
meeting_type: project-kickoff
meeting_duration_minutes: 60

project: campaigns
topics:
  - scope
  - capacity
  - launch-target

attendees:
  - name: jonathan
    role: decision-maker
  - name: maria
    role: contributor
  - name: alex
    role: contributor
  - name: sam
    role: contributor

desired_outcomes:
  - "Scope committed: feature set in/out for v1 launch"
  - "Engineering capacity confirmed for Q2 (sprint-weeks committed)"
  - "Launch-target date set with explicit dependencies"

related_brief: null
input_quality: high
confidence: high
visibility: team
status: draft
---

# Campaigns Feature Launch Kickoff

## Shareable summary

**Campaigns Feature Launch Kickoff** | 2026-04-17 at 14:00 EST (60 min)
**Purpose**: Commit scope, Q2 engineering capacity, and launch target for the Campaigns feature
**Topics**:
- Scope review (20 min)
- Engineering capacity (20 min)
- Launch-target commit (15 min)
**Pre-reads**: [Campaigns scope draft](https://notion.example/campaigns-scope) (8 min), [Q2 capacity model](https://sheets.example/q2-capacity) (3 min)

---

## Full agenda

### Meeting details

- **Date and time**: 2026-04-17, 14:00 EST
- **Duration**: 60 min
- **Location**: https://meet.example/campaigns-kickoff
- **Meeting type**: project-kickoff
- **Attendees**: jonathan (PM, facilitating), maria (eng lead), alex (marketing lead), sam (data analyst)

### Purpose

Commit to v1 MVP scope, confirm engineering capacity for Q2, and set a launch target the team can plan around. Downstream stakeholder communication and marketing planning are blocked until these three are committed.

### Desired outcomes

- In/out scope list agreed and written into the kickoff doc
- Engineering capacity commitment logged with named sprint-weeks
- Launch-target date on the team calendar with dependencies called out

### Topics

#### Scope review (20 min). jonathan

- **Type**: Decision
- **Goal**: Each item in the scope draft marked in, out, or deferred to v2
- **Pre-read**: [Campaigns scope draft](https://notion.example/campaigns-scope)

#### Engineering capacity (20 min). maria

- **Type**: Decision
- **Goal**: Eng capacity agreed in sprint-weeks for Q2; staffing plan and backfill noted
- **Pre-read**: [Q2 capacity model](https://sheets.example/q2-capacity)

#### Launch-target commit (15 min). jonathan

- **Type**: Decision
- **Goal**: Launch date committed; marketing and data-instrumentation dependencies named
- **Pre-read**: none

#### Next steps (5 min). jonathan

- **Type**: Working
- **Goal**: Follow-up owners assigned; next sync scheduled
- **Pre-read**: none

### Attendee prep

**Required prep** (estimated: 11 min)

- [ ] Read [Campaigns scope draft](https://notion.example/campaigns-scope), mark in/out views
- [ ] Review [Q2 capacity model](https://sheets.example/q2-capacity)

**Recommended context**

- [Klaviyo / Mailchimp competitive teardown](https://notion.example/campaigns-competitive): skim key findings on SMB switching triggers

**Come ready to**

- Share your team's existing Q2 commitments (maria)
- Weigh in on the scope tradeoff between email-first vs. email+SMS for v1 (everyone)
- Flag data-instrumentation dependencies (sam)

### Parking lot

### Logistics

- **Join link**: https://meet.example/campaigns-kickoff
- **Materials**: [scope draft](https://notion.example/campaigns-scope), [capacity model](https://sheets.example/q2-capacity)
- **Recording**: Yes, owner: jonathan

---

## Sources & References

### Primary inputs

- User-provided context: Campaigns kickoff request with duration, attendees, topics
- Meeting duration: 60 min (user-specified)

### Referenced artifacts

- Prior recaps on this topic: none (this is the kickoff)

### External references

- [Campaigns scope draft](https://notion.example/campaigns-scope) [fictional]
- [Q2 capacity model](https://sheets.example/q2-capacity) [fictional]
- [Klaviyo pricing](https://www.klaviyo.com/pricing)

### Generation context

- **Generated**: 2026-04-17T13:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: high
- **Overall confidence**: high
- **Known gaps**: None identified
- **Inferences applied**: Meeting type inferred as project-kickoff [confidence: high, "kickoff" explicit in request]; attendee roles inferred from team-lead descriptors
- **Anti-meeting check**: Ran. synchronous value: co-creation of scope/capacity commitments + tradeoff discussion; sync format appropriate
```
