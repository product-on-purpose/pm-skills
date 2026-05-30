---
title: "Foundation Sprint Brief"
description: "Pre-sprint brief that locks scope, the decision the sprint must unlock, team and role assignments, logistics, inputs to bring, and success criteria before Day 1 of a Foundation Sprint. Use after the readiness verdict is Go and before the sprint begins. Produces a one-page artifact the team and Decider sign off on as the contract for the next two days."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - coordination
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** coordination | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-foundation-sprint-brief "Your context here"`

Produce the one-page brief that aligns the team on scope, decision target, participants, logistics, and success criteria before Day 1 begins. A well-built brief prevents Day 1 from opening with re-litigation of why-are-we-here; a missing or vague brief almost guarantees it.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- The readiness verdict from `tool-foundation-sprint-readiness` is Go (or Conditional Go with preconditions cleared).
- The sprint has dates blocked on calendars and you need the artifact that names what the sprint is for.
- The team has prep activities scheduled and you need a written reference for what to bring.
- A skeptical exec wants to know "what is the team doing for two days?" and you need an answer that fits on one page.

## When NOT to Use

- The sprint has already started. The brief is a prep artifact, not an in-sprint deliverable. If Day 1 is happening, run `tool-foundation-sprint-basics` instead.
- The readiness verdict is Wait. The brief cannot fix an unready team; close the preconditions first, then re-run readiness, then invoke this skill.
- The team wants a strategy document. The brief is internal prep, not a stakeholder deliverable. If a stakeholder document is needed, that is a downstream artifact.
- The brief threatens to become a multi-page strategic document. Stop and reframe: the canonical brief is one page.

## How to Use

Invoke the skill by name (`/pm-skills:tool-foundation-sprint-brief` on Claude Code, `$tool-foundation-sprint-brief` on Codex):

```
/pm-skills:tool-foundation-sprint-brief "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-brief/SKILL.md`

## Output Template

# Foundation Sprint Brief: [Initiative name]

<!-- One-page pre-sprint artifact. The team and Decider sign off on this as the contract for the next two days. -->

## Initiative Statement and Stakes

[One paragraph. Four sentences max. What is the team sprinting on? Why does the direction matter? What would a wrong direction cost?]

## Decision the Sprint Must Unlock

[Single sentence framing the open strategic question the sprint resolves. State it as a binary or bounded choice: "X vs Y," "which of [list]," "should we commit to [direction] or its alternative."]

## Sprint Logistics

| Element | Value |
|---|---|
| Dates | [Day 1 date] and [Day 2 date] |
| Hours | [start]:[end] each day |
| Location | [In-person address / Remote video / Hybrid with details] |
| Format | [Workshop with shared whiteboard / Pure remote / etc.] |
| Tools | [Whiteboard tool, video, decision log location] |
| Daily rhythm | [Standup time, lunch, day-end review] |

## Team Roster

| Attendee | Role | Day 1 AM | Day 1 PM | Day 2 AM | Day 2 PM |
|---|---|---|---|---|---|
| [Name] | Decider | required | required | required | required |
| [Name] | Facilitator | required | required | required | required |
| [Name] | [PM / Design / Engineering / Customer expert / etc.] | [required / cameo / optional] | [...] | [...] | [...] |
| [Name] | [Role] | [...] | [...] | [...] | [...] |

[Cameo experts, if any, listed separately with the specific section they attend.]

## Existing Inputs to Bring

[Bulleted list, 5 items maximum. Each item names the artifact and who owns bringing it.]

1. **[Artifact]** ([Owner]). [What it is; why it matters in the sprint.]
2. **[Artifact]** ([Owner]). [...]
3. **[Artifact]** ([Owner]). [...]
4. **[Artifact]** ([Owner]). [...]
5. **[Artifact]** ([Owner]). [...]

## Success Criteria

The sprint is **successful** if:

1. [Outcome 1, named in observable terms.]
2. [Outcome 2.]
3. [Outcome 3.]
4. [Outcome 4.]

The sprint is **unsuccessful** if [the explicit failure conditions: missing output, ratified hypothesis that is not testable, or scope drift].

## Readiness Reaffirmation

[The Go verdict from `tool-foundation-sprint-readiness` was issued on [date]. Has anything changed since?]

- [ ] Decider availability still confirmed for both days.
- [ ] Preconditions from the readiness assessment (if any) are closed.
- [ ] No new risk factors have surfaced (e.g., key team member out, scope creep).
- [ ] If Conditional Go: the named yellow flags have been addressed.

If any box is unchecked, the brief is incomplete; close the gap or postpone the sprint before proceeding to Day 1.

## Decider Checkpoint

**Decider sign-off required before Day 1 begins.**

- [ ] Decider confirms scope: the named Decision the sprint must unlock is the deliverable.
- [ ] Decider confirms team roster and attendance windows.
- [ ] Decider confirms success criteria.
- [ ] Decider acknowledges that the sprint will NOT preserve all directions at the end of Day 2; one becomes the top bet, the other becomes the backup or is dropped.
- [ ] Decider commits to attending the Day 2 closing session where the Founding Hypothesis is ratified.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Foundation Sprint Brief: Brainshelf</summary>

# Foundation Sprint Brief: Brainshelf

A worked brief for the Brainshelf founding team, following a Go verdict from `tool-foundation-sprint-readiness` with one yellow flag (competitor research, closed via May 12 evening prep).

## Initiative Statement and Stakes

Brainshelf is a pre-seed B2C product for readers who want a better way to track what they have read and what they want to read next. The founding team is preparing for a friends-and-family raise in Q3 2026. Wrong product direction now could mean rebuilding the core experience post-raise, burning runway, and weakening the case to seed investors. The sprint exists because the team is divided on a load-bearing strategic call (individual collectors vs social readers) and needs to commit before MVP scoping.

## Decision the Sprint Must Unlock

> Should Brainshelf optimize first for individual collectors (private library tracking, personal recall, low social friction) or for social readers (community feeds, recommendations, book clubs, public profiles)?

## Sprint Logistics

| Element | Value |
|---|---|
| Dates | Wednesday 2026-05-13 and Thursday 2026-05-14 |
| Hours | 09:00 to 17:00 each day (PT) |
| Location | Hybrid (Jamie and Sam in-person at Seattle co-working; Alex and Riley remote on Zoom and Miro) |
| Format | Workshop with structured digital whiteboard |
| Tools | Miro (board), Zoom (video), shared Notion (decision log) |
| Daily rhythm | 09:00 standup, 12:30 lunch (45 min), 16:45 day-end review |

## Team Roster

| Attendee | Role | Day 1 AM | Day 1 PM | Day 2 AM | Day 2 PM |
|---|---|---|---|---|---|
| Jamie | Decider, PM | required | required | required | required |
| Alex | Design lead | required | required | required | required |
| Sam | Engineering lead | required | required | required | required |
| Riley | Customer expert | required | required | required | required |

No cameo experts. The team is the team.

## Existing Inputs to Bring

1. **22-interview synthesis** (Riley). Themes already clustered; printed copies for Day 1 morning reference.
2. **One-page competitor cards** (Riley). Goodreads, StoryGraph, Bookly, LibraryThing, compiled May 12 evening per readiness precondition.
3. **Discord notes on reader frustrations** (Riley). Anonymized from her 12k-member book-blogger network.
4. **Pre-seed pitch deck draft** (Jamie). Context only, not for input.
5. **Brand and visual sketches** (Alex). For Day 1 PM differentiation context only.

## Success Criteria

The sprint is **successful** if:

1. By end of Day 2, the team ratifies a single Founding Hypothesis using the canonical "If we help X solve Y with Z..." template.
2. The Hypothesis is specific enough to translate into a Design Sprint challenge.
3. The Hypothesis Scorecard identifies the highest-risk assumption (the one the Design Sprint should test first).
4. The team has a documented backup plan (the runner-up approach) if the top bet invalidates.

The sprint is **unsuccessful** if any of the above is missing or if the team ratifies a hypothesis that is structurally too vague to test ("we will build a great book app for readers" is not testable).

## Readiness Reaffirmation

The Go verdict from `tool-foundation-sprint-readiness` (2026-05-12) remains in effect.

- [x] Decider availability still confirmed for both days (Jamie).
- [x] Preconditions closed: Riley completed the competitor one-pagers on the evening of May 12 as planned.
- [x] No new risk factors have surfaced.
- [x] Conditional Go yellow flag (competitor research) is now closed.

## Decider Checkpoint

**Decider sign-off required before Day 1 begins.**

- [x] Jamie confirms scope: a single Founding Hypothesis is the deliverable.
- [x] Jamie confirms team and attendance windows.
- [x] Jamie confirms success criteria (testable hypothesis ratified by end of Day 2 with scorecard and backup plan).
- [x] Jamie acknowledges that the team will NOT preserve both individual-collector and social-reader paths at the end of Day 2; one becomes the top bet, the other becomes the backup or is dropped.
- [x] Jamie commits to attending the Day 2 closing session.

**Signed:** Jamie (founder, PM), 2026-05-12 21:30 PT

</details>
