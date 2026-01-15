# Session Log Format Reference

## File Naming

`YYYY-MM-DD_HH-MM_session.md`

Example: `2025-01-15_14-30_session.md`

## Template

```markdown
# Session Log: YYYY-MM-DD

**Duration:** ~X hours
**Focus:** Brief description of main work area

## Summary

2-3 sentence overview of what was accomplished this session.

## Accomplishments

- Completed task 1
- Completed task 2
- Made progress on task 3

## Decisions Made

- **Decision 1:** Brief description and rationale
- **Decision 2:** Brief description and rationale

## Issues Encountered

- Issue 1 — How it was resolved (or status if unresolved)
- Issue 2 — How it was resolved

## Next Session

Recommended starting point and priorities:

1. First priority task
2. Second priority task
3. Consider investigating X

## Next Session Prompt

A ready-to-use prompt for continuing this work:

```
Continue from session [YYYY-MM-DD]. Context: [Brief project description].

Last session accomplished:
- [Key accomplishment 1]
- [Key accomplishment 2]

Priority for this session:
1. [First priority]
2. [Second priority]

Start by reviewing AGENTS/<model>/CONTEXT.md and the previous session log.
```

## Session Highlights

Key exchanges or insights worth preserving:

### Topic Name
> Brief quote or summary of important discussion point

*Context or follow-up notes*

---

*Session logged by Claude*
```

## Guidelines

1. **Be concise** — This is a log, not a transcript
2. **Focus on outcomes** — What changed, what was decided
3. **Enable continuity** — Next session should be able to pick up smoothly
4. **Capture decisions** — Include rationale for important choices
5. **Note blockers** — Document anything that needs follow-up
