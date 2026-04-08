# [F-17] Meeting Synthesis Skill
Status: Backlog
Milestone: v2.10.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a `discover-meeting-synthesis` skill that transforms raw meeting notes, transcripts, or recordings into structured, actionable summaries. Captures decisions made, action items with owners and dates, open questions, follow-up topics, and connections to related projects or initiatives. Parallels `discover-interview-synthesis` but targets internal meetings rather than user research interviews.

## Problem

After meetings, PMs typically:
1. Have scattered notes with no consistent structure
2. Forget to capture decisions explicitly (they're buried in discussion flow)
3. Miss action items or assign them without dates/owners
4. Lose context about how meeting outcomes connect to ongoing projects
5. Spend 15-30 minutes reformatting notes into something shareable

Meeting transcripts (from tools like Krisp, Otter, Fireflies) make raw content available but don't solve the synthesis problem — a 45-minute transcript needs structured extraction, not just a text dump.

## How It Would Work

### Input
- Raw meeting notes (bullet points, stream-of-consciousness)
- Meeting transcript (from Krisp MCP, Otter, or manual paste)
- Meeting metadata: title, date, attendees, purpose

### Process
1. **Identify meeting type** — Standup, planning, review, decision-making, brainstorming, 1:1. Different types emphasize different outputs.
2. **Extract structure** — Pull out decisions, action items, open questions, key discussion points
3. **Assign ownership** — Map action items to attendees with due dates
4. **Connect context** — Link outcomes to related projects, initiatives, or prior meetings
5. **Generate summary** — Produce a structured document following TEMPLATE.md

### Output
A structured meeting synthesis document with:
- Executive summary (2-3 sentences)
- Decisions made (numbered, with rationale if captured)
- Action items (owner, due date, description, status)
- Open questions (who needs to answer, by when)
- Key discussion points (topic, positions, outcome)
- Follow-up topics (for next meeting or async)
- Related projects/initiatives

## Key Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| **Classification** | `discover` (phase skill) | Parallels interview-synthesis — both extract structured insights from conversations |
| **Krisp integration** | Reference in skill, not require | Not all PMs use Krisp; skill should work with any input format |
| **Meeting type taxonomy** | Include in SKILL.md | Different meeting types need different emphasis (standups → blockers, planning → commitments, reviews → decisions) |
| **Multi-meeting synthesis** | Support in TEMPLATE.md | PMs often need to synthesize a week's worth of meetings or a series on the same topic |
| **Audience variants** | Include in TEMPLATE.md | Same meeting may need different summaries for team vs leadership vs stakeholders |

## Quality Forecast

| Zone | Weight | Rationale |
|------|--------|-----------|
| Process | 40 | Step-by-step extraction workflow from raw → structured |
| Knowledge | 25 | Meeting type taxonomy, synthesis best practices |
| Constraint | 20 | Action items MUST have owners/dates, decisions MUST be explicit |
| Wisdom | 15 | Judging what's a decision vs discussion, what's an action vs aspiration |

## Dependencies

- None required
- Optional: Krisp MCP integration for transcript input (user already has this configured)
- Pairs naturally with F-18 (meeting-prep) — prep defines objectives, synthesis verifies they were met

## Artifacts Produced

- `skills/discover-meeting-synthesis/SKILL.md`
- `skills/discover-meeting-synthesis/references/TEMPLATE.md`
- `skills/discover-meeting-synthesis/references/EXAMPLE.md`
- `commands/meeting-synthesis.md`
- Updated AGENTS.md, README, docs

## Estimated Complexity

Medium — similar scope to discover-interview-synthesis. The meeting type taxonomy and multi-meeting synthesis add modest complexity.

## PRs

TBD
