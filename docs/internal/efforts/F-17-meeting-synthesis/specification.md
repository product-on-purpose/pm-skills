# Specification: discover-meeting-synthesis

## Overview

A discover-phase skill that transforms raw meeting notes, transcripts, or recordings into structured, actionable summaries. Captures decisions, action items with owners and dates, open questions, and connections to related projects. Supports a six-type meeting taxonomy and multi-meeting synthesis. Parallels `discover-interview-synthesis` but targets internal meetings rather than user research interviews.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | discover-meeting-synthesis |
| Phase | discover |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers |

## Design Principles

### 1. Decisions Are First-Class Citizens
The single most valuable thing a meeting synthesis captures is **what was decided**. Decisions must always be extracted explicitly, even when they were made implicitly during discussion. If a meeting produced no decisions, the synthesis should say so clearly.

### 2. Meeting Type Drives Output Emphasis
A standup synthesis emphasizes blockers and status changes. A decision meeting emphasizes the decision, rationale, and dissenting views. A brainstorm emphasizes ideas generated and next-step filters. The six-type taxonomy shapes which sections are mandatory vs. optional.

### 3. Action Items Are Incomplete Without Owners and Dates
An action item without an owner is a wish. An action item without a date is an aspiration. The skill enforces owner + due date on every action item, flagging gaps for the PM to resolve.

### 4. Multi-Meeting Synthesis Reveals Drift
When synthesizing a series of meetings on the same topic, the skill surfaces what changed between sessions: decisions reversed, action items still open, scope creep, and recurring unresolved questions.

### 5. Audience-Aware Summaries
The same meeting may need different summaries for the team (detailed), leadership (decisions + risks), and stakeholders (outcomes + timeline). The template supports audience variants without duplicating the full synthesis.

---

## Shared Taxonomy: Meeting Types

This taxonomy is shared with F-18 (meeting-prep). Both skills use the same six types with consistent labels and definitions.

| Type | Definition | Synthesis Emphasis |
|------|------------|--------------------|
| **Standup** | Short sync on status, blockers, and commitments | Blockers, status changes, escalations |
| **Planning** | Sprint or initiative planning; scope and commitment setting | Commitments made, scope decisions, capacity gaps |
| **Review** | Demo, sprint review, or progress review | Feedback received, approval status, revision requests |
| **Decision** | Meeting called to make a specific decision | Decision made, rationale, dissent, alternatives rejected |
| **Brainstorm** | Idea generation, exploration, divergent thinking | Ideas generated, clusters, next-step filters |
| **1:1** | Manager-report or peer conversation | Feedback given/received, career items, follow-ups |

---

## File Architecture

```
skills/discover-meeting-synthesis/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── meeting-synthesis.md
```

### SKILL.md (~120-160 lines)

**Frontmatter:**
```yaml
name: discover-meeting-synthesis
description: >-
  Transforms raw meeting notes, transcripts, or recordings into structured
  summaries with explicit decisions, owned action items, open questions,
  and cross-project connections. Supports six meeting types (standup,
  planning, review, decision, brainstorm, 1:1) and multi-meeting synthesis.
phase: discover
version: "1.0.0"
updated: YYYY-MM-DD
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond]
  author: product-on-purpose
```

**Sections:**

1. **When to Use** (~8 lines)
   - After any meeting where decisions, action items, or context need to be captured
   - When synthesizing a transcript from Krisp, Otter, Fireflies, or similar tools
   - When preparing a summary for people who missed the meeting
   - When consolidating a week's or series' worth of meetings on the same topic
   - Before a follow-up meeting to establish what was previously agreed

2. **When NOT to Use** (~5 lines)
   - For user research interviews (use `discover-interview-synthesis`)
   - For meeting preparation and agenda design (use `develop-meeting-prep`)
   - For creating meeting minutes as a formal governance record (legal/compliance scope)

3. **Meeting Type Taxonomy** (~20 lines)
   - Table of six types with definition and synthesis emphasis (from shared taxonomy above)
   - Guidance: "Identify the meeting type first - it determines which output sections are mandatory"

4. **Instructions** (~40 lines, numbered steps)
   1. **Collect raw input** - Gather notes, transcript, or recording. Note meeting metadata (title, date, attendees, duration, stated purpose).
   2. **Identify meeting type** - Classify using the taxonomy. Mixed-type meetings use the dominant type's emphasis.
   3. **Extract decisions** - Pull out every decision, explicit or implicit. Document rationale and any dissent.
   4. **Extract action items** - Every action item gets: description, owner, due date, status. Flag items missing owner or date.
   5. **Capture open questions** - Questions raised but not resolved. Note who needs to answer and by when.
   6. **Summarize key discussion points** - Major topics discussed, positions taken, outcomes reached.
   7. **Identify follow-ups** - Topics deferred to next meeting or async channels.
   8. **Connect to context** - Link outcomes to related projects, initiatives, prior meetings, or OKRs.
   9. **Write executive summary** - 2-3 sentences capturing the meeting's most important outcomes.
   10. **Generate audience variants** (optional) - If needed, produce abbreviated summaries for leadership or stakeholders.

5. **Multi-Meeting Synthesis** (~15 lines)
   - When synthesizing 2+ meetings on the same topic:
     - Surface decisions that changed between sessions
     - Highlight action items still open from prior meetings
     - Note scope changes and recurring unresolved questions
     - Produce a cumulative action item tracker

6. **Output Contract** (~5 lines)
   - References TEMPLATE.md as the output artifact
   - Single-meeting and multi-meeting variants described

7. **Quality Checklist** (~10 lines)
   - [ ] Every decision is explicitly stated with rationale
   - [ ] Every action item has an owner and due date (or is flagged as incomplete)
   - [ ] Open questions identify who needs to answer
   - [ ] Executive summary captures outcomes, not just topics
   - [ ] Meeting type is identified and emphasis matches
   - [ ] Audience variants (if produced) contain no confidential content inappropriate for that audience

---

### references/TEMPLATE.md (~80-100 lines)

A reusable meeting synthesis template. Sections:

1. **Frontmatter** - artifact name, version, created date, status
2. **Meeting Metadata** - Title, date, duration, location/link, attendees (name + role), meeting type (from taxonomy), stated purpose
3. **Executive Summary** - 2-3 sentences (the "if you read nothing else" section)
4. **Decisions Made** - Numbered list; each with: decision statement, rationale, dissenting views (if any)
5. **Action Items** - Table: description, owner, due date, status, notes
6. **Open Questions** - Table: question, who needs to answer, target date, context
7. **Key Discussion Points** - Per topic: topic title, summary of discussion, positions taken, outcome
8. **Follow-Up Topics** - Items deferred; note where they'll be addressed (next meeting, async, specific channel)
9. **Related Context** - Links to projects, initiatives, prior meeting syntheses, OKRs
10. **Multi-Meeting Tracker** (optional) - Cumulative view across a meeting series: decision log, action item status, scope evolution
11. **Audience Variant: Leadership** (optional) - Abbreviated version: decisions + risks + timeline only
12. **Audience Variant: Stakeholders** (optional) - Abbreviated version: outcomes + next steps only

---

### references/EXAMPLE.md (~200-280 lines)

A worked example: **PM synthesizing a sprint planning meeting**.

Demonstrates:

1. **Single-meeting synthesis (Decision type)**
   - Raw input: bullet-point notes from a 60-minute sprint planning meeting
   - Walks through each step: type identification, decision extraction, action items, open questions
   - Complete filled TEMPLATE showing all sections
   - Shows how implicit decisions ("we all agreed to...") are made explicit

2. **Multi-meeting synthesis (3 standups)**
   - Raw input: three consecutive daily standups
   - Demonstrates cumulative action item tracking
   - Surfaces a recurring blocker that escalated across the series
   - Shows the multi-meeting tracker section

3. **Audience variant**
   - Takes the sprint planning synthesis and produces a leadership variant
   - Shows what gets cut and what gets elevated

---

### commands/meeting-synthesis.md

```yaml
---
name: meeting-synthesis
description: Synthesize meeting notes or transcripts into a structured summary with decisions and action items
skill: discover-meeting-synthesis
---
```

Body: brief instruction to invoke the skill with the user's meeting notes, transcript, or recording context.

---

## Cross-Skill Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| F-18 (meeting-prep) | Shared taxonomy | Same six meeting types; prep defines objectives, synthesis verifies they were met |
| discover-interview-synthesis | Structural parallel | Similar extraction pattern; meeting-synthesis targets internal meetings, not user research |

## Acceptance Criteria

1. **Given** raw bullet-point notes from a decision meeting, **when** the skill is invoked, **then** the output contains at least one explicitly stated decision with rationale, even if the notes only implied the decision.

2. **Given** a meeting transcript with action items scattered throughout, **when** the skill extracts action items, **then** every action item has an owner and due date, or is flagged as incomplete.

3. **Given** three standup notes from the same week, **when** multi-meeting synthesis is requested, **then** the output includes a cumulative action item tracker showing status changes across the series.

4. **Given** a completed single-meeting synthesis, **when** a leadership audience variant is requested, **then** the variant contains only decisions, risks, and timeline - no discussion detail.

5. **Given** meeting notes with no stated purpose, **when** the skill classifies the meeting type, **then** it infers the type from content patterns and explains the inference.
