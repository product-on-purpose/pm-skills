---
title: "Foundation meeting agenda: Brainshelf Resurface Algorithm Review"
description: "Sample output for foundation-meeting-agenda skill applied to the brainshelf thread (resurface-algo-review)."
artifact: foundation-meeting-agenda
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: brainshelf
context: resurface-algo-review
---

# Sample: foundation-meeting-agenda. Brainshelf Resurface Algorithm Review

## Scenario

Brainshelf is a consumer PKM / read-later app (post-seed, ~20 employees, ~85K registered users). The team is iterating on Resurface, a contextual morning-email digest that pulls saved items back into attention. The PM runs a 45-minute review meeting with the algo engineer and design lead to review the current algorithm's behavior, discuss two proposed changes, and decide the next sprint's direction. Brainshelf prompts tend to be rough and casual. the PM wears multiple hats and moves fast.

Source Notes:
- Brainshelf is fictional
- Readwise and Raindrop.io are real competitors
- All metrics `[fictional]`

## Prompt

```
/meeting-agenda "resurface algo review this Wed 11am PT 45 min, me + elena (algo) + mia (design), need to pick direction for next sprint between 2 options"
```

## Output

```markdown
---
artifact_type: meeting-agenda
version: 1.0
generated_at: 2026-04-20T08:30:00Z
generated_by_skill: foundation-meeting-agenda

meeting_title: "Resurface Algorithm Review"
meeting_date: 2026-04-22
meeting_start_time: "11:00 PT"
meeting_type: review
meeting_duration_minutes: 45

project: resurface
topics:
  - current-behavior
  - option-a-recency-weighted
  - option-b-topic-clustered
  - direction-decision

attendees:
  - name: priya-pm
    role: decision-maker
  - name: elena-algo
    role: contributor
  - name: mia-design
    role: contributor

desired_outcomes:
  - "Shared understanding of current Resurface algorithm's observed user behavior"
  - "Direction committed for next sprint (Option A, Option B, or hybrid)"
  - "Owner and success metrics assigned for chosen direction"

related_brief: null
input_quality: medium
confidence: medium
visibility: team
status: draft
---

# Resurface Algorithm Review

## Shareable summary

**Resurface Algorithm Review** | 2026-04-22 at 11:00 PT (45 min)
**Purpose**: Review current Resurface algorithm behavior, compare two proposed directions, pick next sprint's approach
**Topics**:
- Current behavior snapshot (10 min)
- Option A: recency-weighted (10 min)
- Option B: topic-clustered (10 min)
- Direction decision (15 min)
**Pre-reads**: [Resurface metrics this sprint](https://notion.example/resurface-metrics) (5 min)

---

## Full agenda

### Meeting details

- **Date and time**: 2026-04-22, 11:00 PT
- **Duration**: 45 min
- **Location**: Zoom (link in invite)
- **Meeting type**: review
- **Attendees**: priya-pm, elena-algo, mia-design

### Purpose

Review how the current Resurface algorithm is performing, compare two candidate directions for next sprint, and commit to one (or a hybrid).

### Desired outcomes

- Shared mental model of what users are actually doing with Resurface today
- A direction picked for next sprint, with explicit reasoning
- Success metric owned for the chosen direction so we can evaluate in 2 weeks

### Topics

#### Current behavior snapshot (10 min). elena-algo

- **Type**: Information
- **Goal**: Team aligned on what the algorithm is doing today and what metrics show
- **Pre-read**: [Resurface metrics this sprint](https://notion.example/resurface-metrics)

#### Option A: recency-weighted (10 min). elena-algo

- **Type**: Discussion
- **Goal**: Clarity on the tradeoff (higher engagement short-term vs. topic breadth)
- **Pre-read**: none

#### Option B: topic-clustered (10 min). mia-design

- **Type**: Discussion
- **Goal**: Clarity on the tradeoff (better breadth vs. implementation complexity)
- **Pre-read**: none

#### Direction decision (15 min). priya-pm

- **Type**: Decision
- **Goal**: Pick Option A, Option B, or hybrid; assign success metric + owner
- **Pre-read**: none

### Attendee prep

**Required prep** (estimated: 5 min)

- [ ] Glance at [Resurface metrics](https://notion.example/resurface-metrics) before the meeting

**Recommended context**

- [Prior Resurface iteration notes](https://notion.example/resurface-notes): skim if you want the back-story

**Come ready to**

- Share your gut read on which direction fits our user research (mia)
- Flag implementation risk honestly (elena)
- Make a call (priya)

### Parking lot

### Logistics

- **Join link**: Zoom in calendar invite
- **Materials**: [metrics doc](https://notion.example/resurface-metrics)
- **Recording**: No

---

## Sources & References

### Primary inputs

- User-provided context: casual one-liner requesting agenda for next-sprint-direction meeting
- Meeting duration: 45 min (user-specified)

### Referenced artifacts

- Prior recaps: auto-discovery attempted; prior iteration notes surfaced as recommended-context

### External references

- [Resurface metrics](https://notion.example/resurface-metrics) [fictional]

### Generation context

- **Generated**: 2026-04-20T08:30:00Z
- **Skill version**: 1.0.0
- **Input quality**: medium. casual prompt lacked specific option details; skill inferred Option A / Option B framing from "2 options" cue
- **Overall confidence**: medium. structural agenda high-confidence; topic tradeoffs are placeholder until elena/mia fill in
- **Known gaps**: Option A and Option B specifics not defined by PM in prompt; skill used generic framings (recency-weighted, topic-clustered) that presenters will replace with real tradeoffs
- **Inferences applied**: Meeting type inferred as review [confidence: high, "review" explicit]; attendee roles inferred
- **Anti-meeting check**: Ran. synchronous value: tradeoff discussion between two options with small team; sync format appropriate
```
