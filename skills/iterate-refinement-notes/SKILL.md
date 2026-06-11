---
name: iterate-refinement-notes
description: Documents backlog refinement session outcomes including stories refined, estimates, questions raised, and decisions made. Use during or after refinement to capture the results and share with absent team members.
license: Apache-2.0
metadata:
  phase: iterate
  version: "2.1.0"
  updated: 2026-06-10
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Refinement Notes

Refinement notes capture the outcomes of backlog refinement (grooming) sessions.what was discussed, what was estimated, and what decisions were made. They serve as a quick reference for team members who missed the session and a historical record of how stories evolved from idea to ready-for-sprint.

## When to Use

- During refinement sessions to capture decisions in real-time
- After refinement to share outcomes with absent team members
- When onboarding new team members to explain backlog context
- Before sprint planning to review what's been refined
- When stories need re-refinement due to time elapsed

## When NOT to Use

- You need the stories themselves written -> use `deliver-user-stories`
- You need a general meeting summary, not a backlog-refinement record -> use `foundation-meeting-recap`
- You are running the retrospective ceremony -> use `iterate-retrospective`
- Refined stories need their failure scenarios enumerated -> use `deliver-edge-cases`

## Instructions

When asked to document refinement notes, follow these steps:

1. **Record Session Metadata**
   Note the date, attendees, and duration. This helps track who was part of decisions and when discussions happened.

2. **List Stories Discussed**
   For each story, capture the outcome: estimated points, refined status, key discussion points, and any modifications made to the original scope.

3. **Document Questions Raised**
   Questions that couldn't be answered in the session need owners and due dates. Don't let them disappear.they often block sprint planning.

4. **Capture Decisions Made**
   Record any scope decisions, technical approaches agreed upon, or priority changes. These decisions are valuable context that gets lost without documentation.

5. **Note Action Items**
   Any follow-up work needed before stories are sprint-ready: mockups to create, technical spikes to run, stakeholders to consult.

6. **Flag Blocked Stories**
   Clearly identify stories that can't proceed until blockers are resolved. Include what the blocker is and who owns resolution.

7. **Plan Next Session**
   Note what should be refined next and any preparation needed.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. Complete notes fill every template section: Session Info; Summary; Stories Refined; Stories Summary Table; Questions Raised; Decisions Made; Action Items; Blocked Stories; Parking Lot; and Next Session.

## Quality Checklist

Before finalizing, verify:

- [ ] All discussed stories have outcomes recorded
- [ ] Open questions have owners assigned
- [ ] Decisions are captured with enough context
- [ ] Blocked stories are clearly flagged
- [ ] A reader who missed the session can tell each story's outcome and what happens next without asking

## Examples

See `references/EXAMPLE.md` for a completed example.
