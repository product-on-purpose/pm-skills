# Context Files Reference

## CONTEXT.md

Current project state for AI session continuity.

### Template

```markdown
# Project Context

## Current State

**Status:** [Active/Paused/Blocked/Complete]
**Last Updated:** YYYY-MM-DD

## Project Overview

Brief description of the project purpose and goals.

## Key Files

- `file1.py` — Description of purpose
- `file2.js` — Description of purpose

## Recent Work

Summary of recent changes and progress.

## Next Steps

1. Immediate next task
2. Following task
3. Future consideration

## Notes

Any relevant context for future sessions.
```

---

## TODO.md

Task tracking across sessions.

### Template

```markdown
# Project Tasks

## In Progress

- [ ] Current task being worked on

## To Do

- [ ] Upcoming task 1
- [ ] Upcoming task 2

## Completed

- [x] Completed task (YYYY-MM-DD)

## Blocked

- [ ] Blocked task — *Reason for block*

---

*Last updated: YYYY-MM-DD*
```

---

## DECISIONS.md

Technical decisions with rationale.

### Template

```markdown
# Technical Decisions

## YYYY-MM-DD: Decision Title

**Status:** [Proposed/Accepted/Deprecated/Superseded]

**Context:**
Why this decision was needed.

**Decision:**
What was decided.

**Alternatives Considered:**
- Option A — Why rejected
- Option B — Why rejected

**Consequences:**
- Positive outcome
- Tradeoff accepted

---
```

### Decision Statuses

| Status | Meaning |
|--------|---------|
| Proposed | Under consideration |
| Accepted | Approved and in effect |
| Deprecated | No longer recommended |
| Superseded | Replaced by newer decision |
