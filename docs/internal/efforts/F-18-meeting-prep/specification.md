# Specification: develop-meeting-prep

## Overview

A develop-phase skill that helps PMs prepare structured, effective meeting plans. Produces an agenda with clear objectives, stakeholder context, time allocations, desired outcomes, and pre-read materials. Begins with an anti-meeting check - if the objective can be met asynchronously, the skill recommends that instead. Shares a six-type meeting taxonomy with F-17 (meeting-synthesis).

## Skill Identity

| Field | Value |
|-------|-------|
| Name | develop-meeting-prep |
| Phase | develop |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers |

## Design Principles

### 1. The Anti-Meeting Gate
The most valuable meeting prep is sometimes "don't have this meeting." Before any agenda design, the skill checks whether the stated objective requires synchronous, multi-person time. If it can be an email, a Slack thread, or an async document review, the skill says so.

### 2. One Objective, One Sentence
A meeting with a clear objective stays on track. A meeting with a vague objective drifts. The skill enforces a single-sentence objective that answers: "What specific outcome will this meeting produce?"

### 3. Time Boxes Create Accountability
Every agenda item gets a time allocation. The sum of time boxes must equal the meeting duration (minus a buffer). This forces prioritization: if your agenda doesn't fit the time, cut items - don't extend the meeting.

### 4. Right People, Right Roles
Too many attendees kills decisions. Missing a decision-maker defers them. The skill uses a simplified DICO role model (Decision-maker, Informed, Contributor, Optional) to ensure the right people are in the room with clear expectations.

### 5. Success Criteria Close the Loop
Every prep document defines what success looks like. After the meeting, this criteria can be checked against the synthesis (F-17) to evaluate whether the meeting was worth holding.

---

## Shared Taxonomy: Meeting Types

This taxonomy is shared with F-17 (meeting-synthesis). Both skills use the same six types with consistent labels and definitions.

| Type | Definition | Prep Emphasis |
|------|------------|---------------|
| **Standup** | Short sync on status, blockers, and commitments | Strict time box (15 min), round-robin structure, blocker escalation path |
| **Planning** | Sprint or initiative planning; scope and commitment setting | Pre-read: backlog/priorities; agenda: capacity, scope, commitments |
| **Review** | Demo, sprint review, or progress review | Pre-read: what's being reviewed; agenda: demo, feedback, approval criteria |
| **Decision** | Meeting called to make a specific decision | Pre-read: options with trade-offs; agenda: present, discuss, decide, document |
| **Brainstorm** | Idea generation, exploration, divergent thinking | Ground rules (no criticism in diverge phase), stimulus materials, convergence method |
| **1:1** | Manager-report or peer conversation | Standing agenda items, career/growth topics, bi-directional feedback |

---

## File Architecture

```
skills/develop-meeting-prep/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── meeting-prep.md
```

### SKILL.md (~130-170 lines)

**Frontmatter:**
```yaml
name: develop-meeting-prep
description: >-
  Helps PMs prepare structured meeting plans with clear objectives,
  time-boxed agendas, stakeholder roles, and success criteria. Starts
  with an anti-meeting check to prevent unnecessary meetings. Supports
  six meeting types (standup, planning, review, decision, brainstorm,
  1:1) with type-specific agenda structures.
phase: develop
version: "1.0.0"
updated: YYYY-MM-DD
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond]
  author: product-on-purpose
```

**Sections:**

1. **When to Use** (~8 lines)
   - Before scheduling or running a meeting you own
   - When asked to "set up a meeting" and you want to ensure it's productive
   - When preparing agendas for recurring meetings that have gone stale
   - When a meeting is struggling and needs restructuring
   - Before an important decision meeting where preparation determines success

2. **When NOT to Use** (~5 lines)
   - For synthesizing meeting outcomes after the fact (use `discover-meeting-synthesis`)
   - For facilitating the meeting in real-time (facilitation is execution, not prep)
   - For calendar logistics (scheduling tools, room booking, timezone coordination)

3. **The Anti-Meeting Check** (~15 lines)
   - Before designing any agenda, answer these questions:
     1. Can this objective be achieved with an email or document? If yes, write that instead.
     2. Can this be resolved in a Slack thread or async comment cycle? If yes, start there.
     3. Does this require real-time, multi-person dialogue (debate, brainstorm, live decision)? If no, cancel the meeting.
   - If the check fails (meeting is unnecessary), produce a brief recommendation for the async alternative
   - If the check passes, proceed with agenda design

4. **Meeting Type Taxonomy** (~15 lines)
   - Table of six types with definition and prep emphasis (from shared taxonomy above)
   - Guidance: "Select the meeting type that matches your objective - it determines the agenda structure"

5. **DICO Role Model** (~12 lines)
   - **D - Decision-maker**: The person who will make or approve the decision. Every decision meeting needs exactly one. If no one has this role, the meeting will defer.
   - **I - Informed**: People who need to know the outcome but don't need to speak. Consider: should they attend, or just receive the synthesis?
   - **C - Contributor**: People whose input is needed during the meeting. They speak; they don't decide.
   - **O - Optional**: People who may benefit from attending but whose absence won't block the meeting.

6. **Instructions** (~35 lines, numbered steps)
   1. **State the objective** - Write one sentence: "By the end of this meeting, we will have [specific outcome]."
   2. **Run the anti-meeting check** - If the objective doesn't require synchronous multi-person time, recommend an async alternative and stop.
   3. **Select meeting type** - Classify using the taxonomy.
   4. **Assign attendee roles** - Map each person to DICO. Ensure at least one D for decision meetings.
   5. **Design the agenda** - Create time-boxed sections. Each section has: topic, owner, duration, purpose (inform / discuss / decide).
   6. **Define success criteria** - 1-3 statements describing what a successful meeting produces.
   7. **Prepare context materials** - Identify pre-reads, background docs, or data needed. Specify what each attendee should review.
   8. **List key questions** - The questions this meeting must answer, prioritized.
   9. **Set up parking lot** - Explicitly note topics that are out of scope for this meeting.
   10. **Review and send** - Check: does the agenda fit the time? Are the right people invited? Is the pre-read ready?

7. **Output Contract** (~5 lines)
   - References TEMPLATE.md as the output artifact
   - Two modes: full prep document (for important meetings) and lightweight agenda (for standups/recurring)

8. **Quality Checklist** (~10 lines)
   - [ ] Objective is one clear sentence with a specific outcome
   - [ ] Anti-meeting check was run (and passed)
   - [ ] Every agenda item has a time box; total time equals meeting duration
   - [ ] At least one Decision-maker is identified (for decision meetings)
   - [ ] Pre-read materials are identified and accessible
   - [ ] Success criteria are defined and measurable after the meeting
   - [ ] Parking lot exists for deferred topics

---

### references/TEMPLATE.md (~70-90 lines)

A reusable meeting preparation template. Sections:

1. **Frontmatter** - artifact name, version, created date, status
2. **Meeting Metadata** - Title, date/time, duration, location/link, meeting type (from taxonomy)
3. **Objective** - One sentence: "By the end of this meeting, we will have [outcome]."
4. **Anti-Meeting Check** - Checkbox: "This objective requires synchronous, multi-person dialogue because: [reason]"
5. **Success Criteria** - 1-3 bullet points defining what a successful meeting produces
6. **Attendees & Roles** - Table: name, DICO role, what they should prepare
7. **Agenda** - Table: time, topic, owner, purpose (inform/discuss/decide), notes
8. **Context & Background** - Key facts, prior decisions, constraints, relevant links
9. **Key Questions** - Prioritized list of questions this meeting must answer
10. **Pre-Read Materials** - What to review beforehand, with links and expected prep time
11. **Parking Lot** - Topics explicitly deferred from this meeting

---

### references/EXAMPLE.md (~180-250 lines)

A worked example: **PM preparing a decision meeting on feature prioritization**.

Demonstrates:

1. **Anti-meeting check (passed)**
   - Objective: "Decide which 3 features from the backlog to commit to for Q3"
   - Check: requires real-time debate among engineering, design, and product leads - async won't resolve competing priorities
   - Shows the reasoning for why this passes the gate

2. **Full prep document (Decision type)**
   - Complete filled TEMPLATE with:
     - 5 attendees mapped to DICO roles (VP Product as Decision-maker, 3 Contributors, 1 Informed)
     - 60-minute time-boxed agenda (5 min context, 15 min each for 3 candidate features, 10 min decision, 5 min next steps)
     - Pre-read: one-pagers for each candidate feature, Q2 retrospective data
     - Key questions prioritized
     - Success criteria: "We leave with 3 committed features and owners for each"

3. **Anti-meeting check (failed) - async alternative**
   - Objective: "Share the Q2 metrics dashboard with the team"
   - Check fails: this is information transfer, not dialogue
   - Shows the recommended async alternative (email with dashboard link + optional 15-min Q&A office hours)

4. **Lightweight agenda (Standup type)**
   - Shows the abbreviated format for a recurring 15-minute standup
   - Demonstrates how the template scales down for low-ceremony meetings

---

### commands/meeting-prep.md

```yaml
---
name: meeting-prep
description: Prepare a structured meeting plan with objectives, agenda, and attendee roles
skill: develop-meeting-prep
---
```

Body: brief instruction to invoke the skill with the user's meeting topic, attendees, and context.

---

## Cross-Skill Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| F-17 (meeting-synthesis) | Shared taxonomy | Same six meeting types; prep defines objectives, synthesis verifies they were met |
| F-17 (meeting-synthesis) | Feedback loop | Success criteria from prep can be evaluated against the synthesis |

## Acceptance Criteria

1. **Given** a meeting objective that can be achieved via email, **when** the anti-meeting check is run, **then** the skill recommends an async alternative and does not produce an agenda.

2. **Given** a decision meeting with 6 attendees, **when** the skill assigns DICO roles, **then** exactly one attendee is marked as Decision-maker and the output warns if no D is assigned.

3. **Given** a 60-minute meeting with 5 agenda items, **when** the agenda is created, **then** the sum of time boxes equals 60 minutes (or 55 with a 5-minute buffer).

4. **Given** a recurring standup that has gone stale, **when** the skill is invoked, **then** it produces a lightweight agenda with strict 15-minute time box and round-robin structure.

5. **Given** a completed prep document, **when** the quality checklist is applied, **then** every required field (objective, success criteria, attendee roles, time boxes) is populated.
