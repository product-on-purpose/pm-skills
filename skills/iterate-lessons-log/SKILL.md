---
name: iterate-lessons-log
description: Creates a structured lessons learned entry for organizational memory. Use after an incident, a completed project, or a significant learning to record knowledge for future teams and initiatives. Distinct from iterate-retrospective, which facilitates the team ceremony; this skill writes the durable lessons entry that outlives it.
license: Apache-2.0
metadata:
  phase: iterate
  version: "2.1.0"
  updated: 2026-06-10
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Lessons Log

A lessons log entry captures significant learning from projects, incidents, or experiences in a format that's useful to future teams who weren't there. Unlike retrospectives (which focus on team improvement), lessons logs focus on organizational knowledge that transcends individual teams.patterns, anti-patterns, and hard-won wisdom.

## When to Use

- After completing a significant project or initiative
- Following a major incident, outage, or failure
- When you realize something important that others should know
- After discovering a pattern that keeps recurring
- When experienced team members leave (capture their knowledge)
- During post-mortems to preserve learnings

## When NOT to Use

- You are facilitating the team ceremony itself -> use `iterate-retrospective`; this skill banks the durable entry that outlives it
- You are deciding whether to change direction based on results -> use `iterate-pivot-decision`
- The learning is an experiment readout -> use `measure-experiment-results` first, then bank the transferable lesson here
- You are updating stakeholders on what was learned -> use `foundation-stakeholder-update`

## Instructions

When asked to create a lessons log entry, follow these steps:

1. **Choose a Descriptive Title**
   Write a title that someone searching for this topic would find. Include keywords that describe the situation and the learning. Avoid generic titles like "Project X lessons."

2. **Provide Context**
   Explain the situation fully enough that someone who wasn't there can understand it. Include the project, timeline, team, and any relevant constraints. Future readers need this context to assess applicability.

3. **Describe What Happened**
   Write a factual account of what occurred. Be specific about actions taken, decisions made, and outcomes observed. Avoid blame.focus on events and systems.

4. **Extract the Lesson**
   Articulate what you learned clearly. The lesson should be actionable.something others can apply. Distinguish between what you observed and your interpretation of why it matters.

5. **Formulate Recommendations**
   Provide specific guidance for future teams facing similar situations. What should they do? What should they avoid? What questions should they ask?

6. **Define Applicability**
   Help readers know when this lesson applies. What situations trigger relevance? What context makes it more or less applicable?

7. **Add Tags for Searchability**
   Include keywords and categories that will help future searchers find this entry. Think about what someone would search for when facing a similar situation.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete entry fills every template section: Metadata; Summary; Context; What Happened; The Lesson; Recommendations; Applicability; Supporting Evidence; Tags and Categories; and Review and Updates.

## Quality Checklist

Before finalizing, verify:

- [ ] Title is descriptive and searchable
- [ ] Context is complete enough for someone who wasn't there
- [ ] Lesson is clearly articulated and actionable
- [ ] Recommendations are specific, not vague
- [ ] Entry stands alone (doesn't require external context)
- [ ] Tags enable future discovery

## Examples

See `references/EXAMPLE.md` for a completed example.
