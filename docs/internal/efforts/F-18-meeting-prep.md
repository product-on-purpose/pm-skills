# [F-18] Meeting Prep Skill
Status: Backlog
Milestone: v2.10.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a `develop-meeting-prep` skill that helps PMs prepare structured, effective meeting plans. Produces an agenda with clear objectives, stakeholder context, key questions, time allocations, desired outcomes, and pre-read materials. Addresses the root cause of unproductive meetings: lack of preparation structure.

## Problem

PMs run or attend 10-20+ meetings per week. Most are under-prepared:
1. No clear objective ("Let's sync on the project" vs "Decide whether to ship v2 this sprint")
2. No agenda or a vague one ("Updates, discussion, next steps")
3. Wrong attendees invited (too many, or missing a key decision-maker)
4. No pre-read shared (everyone spends the first 10 minutes getting context)
5. No success criteria (how do you know the meeting was worth holding?)

The result: meetings that should be 15 minutes run 45, decisions that should be made get deferred, and attendees leave without clarity.

## How It Would Work

### Input
- Meeting topic or purpose (required)
- Attendees list (optional — skill helps identify who's needed)
- Context: related project, prior decisions, open questions
- Time constraint (30 min, 60 min, etc.)

### Process
1. **Clarify objective** — What specific outcome does this meeting need? Decision? Alignment? Information transfer? Brainstorm?
2. **Identify meeting type** — Decision meeting, planning session, review, brainstorm, standup, 1:1, stakeholder update. Each has a different optimal structure.
3. **Design agenda** — Time-boxed sections with owners, tied to the objective
4. **Prepare context** — Gather relevant background, prior decisions, open questions
5. **Define success criteria** — How will you know the meeting achieved its purpose?
6. **Recommend pre-reads** — What should attendees review beforehand?

### Output
A structured meeting preparation document with:
- Meeting metadata (title, date/time, duration, location/link)
- Objective (one clear sentence)
- Success criteria (how you'll know the meeting worked)
- Attendees + roles (decision-maker, contributor, informed, optional)
- Agenda (time-boxed sections with owner and purpose)
- Context/background (key facts, prior decisions, constraints)
- Key questions to address (prioritized)
- Pre-read materials (with links/references)
- Parking lot (topics explicitly deferred)

## Key Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| **Classification** | `develop` (phase skill) | Meeting prep is about preparing to communicate and align — fits the develop phase's focus on solution shaping and stakeholder communication |
| **Meeting type taxonomy** | Share with F-17 | Same taxonomy used in meeting-synthesis; consistent language across prep and synthesis |
| **RACI-style attendee roles** | Simplified to 4 roles | Decision-maker, Contributor, Informed, Optional — simpler than full RACI, practical for meeting context |
| **Anti-meeting check** | Include in SKILL.md | First step: "Does this need to be a meeting?" — if the objective can be met async, recommend that instead |
| **Calendar integration** | Out of scope | Skill produces a document, not a calendar event. Users can copy the agenda into their calendar tool. |

## Quality Forecast

| Zone | Weight | Rationale |
|------|--------|-----------|
| Process | 45 | Highly structured step-by-step preparation workflow |
| Constraint | 25 | Objective MUST be one sentence, agenda MUST have time boxes, success criteria MUST be defined |
| Wisdom | 20 | Judging meeting necessity, right attendees, appropriate duration |
| Knowledge | 10 | Meeting type taxonomy, facilitation best practices |

## Dependencies

- None required
- Pairs naturally with F-17 (meeting-synthesis) — prep defines objectives, synthesis verifies they were met
- Shared meeting type taxonomy with F-17

## Artifacts Produced

- `skills/develop-meeting-prep/SKILL.md`
- `skills/develop-meeting-prep/references/TEMPLATE.md`
- `skills/develop-meeting-prep/references/EXAMPLE.md`
- `commands/meeting-prep.md`
- Updated AGENTS.md, README, docs

## Estimated Complexity

Medium — straightforward skill structure. The anti-meeting check and meeting type taxonomy are the most nuanced parts.

## PRs

TBD
