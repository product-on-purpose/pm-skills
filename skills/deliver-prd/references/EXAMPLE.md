---
artifact: prd
version: "1.0"
created: 2026-01-14
status: complete
context: Project management tool adding recurring tasks feature
---

# PRD: Recurring Tasks

## Overview

### Problem Statement

Users of TaskFlow spend significant time manually recreating repetitive tasks that occur on predictable schedules. Our research shows that 34% of all tasks created are duplicates of previous tasks, and power users report spending 2+ hours per week on this manual work. This friction reduces productivity and causes users to miss recurring deadlines when they forget to recreate tasks.

### Solution Summary

Add recurring task functionality that allows users to create tasks that automatically regenerate on defined schedules. Users can set weekly, monthly, or custom recurrence patterns, and the system will create new task instances automatically while preserving the connection to the original recurring series.

### Target Users

- **Primary:** Team leads and project managers who manage ongoing operational tasks (weekly reports, monthly reviews, recurring meetings)
- **Secondary:** Individual contributors who have personal recurring responsibilities (timesheets, 1:1 prep, status updates)

## Goals & Success Metrics

### Goals

1. Reduce time spent on manual task recreation by 80%
2. Decrease missed recurring deadlines by 50%
3. Increase weekly active usage among power users

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Duplicate task creation rate | 34% | 15% | 90 days post-launch |
| Missed recurring deadlines | 12 per user/month | 6 per user/month | 90 days post-launch |
| Power user WAU | 67% | 75% | 90 days post-launch |
| Feature adoption (% using recurring) | 0% | 40% | 90 days post-launch |

### Non-Goals

- Task dependencies or predecessor relationships
- Automated task assignment rotation (e.g., round-robin)
- Integration with external calendar systems (deferred to v2)

## User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-1 | As a team lead, I want to create a task that repeats weekly so that I don't have to manually recreate it | P0 |
| US-2 | As a user, I want to edit a single instance without affecting the series so that I can handle exceptions | P0 |
| US-3 | As a user, I want to see upcoming instances of recurring tasks so that I can plan my workload | P0 |
| US-4 | As a user, I want to pause and resume a recurring series so that I can handle temporary schedule changes | P1 |
| US-5 | As a team lead, I want to edit the entire series at once so that I can make bulk changes efficiently | P1 |
| US-6 | As a user, I want to set an end date for recurrence so that temporary projects don't create tasks forever | P1 |

See [User Stories Document](#) for full acceptance criteria.

## Scope

### In Scope

- Create recurring tasks with daily, weekly, monthly patterns
- Edit single instance vs. entire series
- View upcoming instances (next 4 weeks)
- Pause/resume recurring series
- Set recurrence end date or occurrence count
- Delete single instance vs. entire series
- Recurring tasks visible in list view, calendar view, and board view

### Out of Scope

- Custom recurrence patterns (e.g., "every 3rd Tuesday") — v2
- Calendar sync (Google Calendar, Outlook) — v2
- Task assignment rotation — future consideration
- Recurring subtasks — future consideration
- Bulk operations on multiple recurring series

### Future Considerations

- **Custom patterns (v2):** Complex scheduling like "first Monday of each month" or "every 2 weeks" — deferred due to UI complexity; standard patterns cover 85% of use cases
- **Calendar sync (v2):** Two-way sync with external calendars — deferred due to integration complexity and scope
- **Assignment rotation:** Auto-rotate assignee for team tasks — requires additional UX research to understand use cases

## Solution Design

### Functional Requirements

#### Task Creation

- FR-1: Users can mark any new task as recurring during creation
- FR-2: Recurrence options include: Daily, Weekly (select days), Monthly (select date or day-of-week)
- FR-3: Users can set recurrence to end after X occurrences or on a specific date
- FR-4: Default recurrence end is "never" with system limit of 52 weeks forward generation

#### Instance Management

- FR-5: Each recurring task generates instances up to 4 weeks in advance
- FR-6: Completing an instance marks only that instance complete and triggers next instance generation
- FR-7: Editing an instance shows option: "Edit this instance only" or "Edit all future instances"
- FR-8: Deleting an instance shows option: "Delete this instance only" or "Delete entire series"

#### Series Management

- FR-9: Users can pause a recurring series, stopping new instance generation
- FR-10: Paused series display visual indicator and can be resumed
- FR-11: Users can view and edit the recurrence pattern from any instance

### User Experience

**Creation Flow:**
1. User clicks "Add Task"
2. User enters task details
3. User clicks "Make Recurring" toggle
4. Recurrence panel expands with pattern options
5. User selects pattern and confirms
6. First instance created immediately, future instances generated

**Visual Indicators:**
- Recurring tasks show refresh icon in list/board views
- Instance number displayed (e.g., "#3 of series")
- Paused series show pause indicator with muted styling

See [Figma Design Specs](#) for detailed mockups.

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| User deletes instance that's in progress | Prompt: "This task has logged time. Delete anyway?" |
| Series created with past start date | Create instance for next valid date, not retroactively |
| Monthly recurrence on 31st | Use last day of month for shorter months |
| User changes recurrence pattern | Apply to future instances only, preserve completed instances |
| User completes instance early | Next instance still generates on schedule |

## Technical Considerations

### Constraints

- Maximum 52 weeks of forward instance generation (prevent database bloat)
- Recurrence calculations must handle timezone correctly (user's local time)
- Instance generation must be idempotent (safe to re-run)

### Integration Points

- **Notification Service:** Recurring task reminders use existing notification infrastructure
- **Activity Feed:** Instance completion logs to activity feed as normal task completion
- **Reporting:** Recurring tasks aggregate into existing productivity reports

### Data Requirements

- New `recurring_series` table linking instances to parent series
- `recurrence_pattern` stored as RRULE-compatible format for future calendar sync
- Soft delete for series to preserve historical data
- Migration: No data migration required (new feature)

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|------------|-------|--------|-------------------|
| Calendar view refactor | Frontend Team | In Progress | Cannot show recurring instances in calendar |
| Background job infrastructure | Platform Team | Complete | None |
| Design specs finalized | Design Team | In Review | Delays development start |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| User confusion about instance vs. series editing | Medium | Medium | Clear UI copy, confirmation dialogs, user testing |
| Performance impact of instance generation | Low | High | Lazy generation, batch processing, monitoring |
| Feature complexity delays launch | Medium | Medium | MVP scope locked, defer edge cases to v1.1 |
| Low adoption if UX isn't intuitive | Medium | High | User testing before launch, in-app education |

## Timeline & Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Design Complete | Final mockups approved | Jan 24, 2026 |
| Backend Complete | API and data model ready | Feb 7, 2026 |
| Frontend Complete | UI implementation done | Feb 21, 2026 |
| QA Complete | Testing and bug fixes | Feb 28, 2026 |
| Beta Launch | 10% rollout | Mar 3, 2026 |
| GA Launch | 100% rollout | Mar 10, 2026 |

## Open Questions

- [x] Should we support "business days only" recurrence? — **Decision: No, defer to v2**
- [ ] How do we handle recurring tasks when user loses access to project? — Owner: Product
- [ ] Should paused series auto-resume after X time? — Owner: Product
- [ ] What's the right default reminder time for recurring tasks? — Owner: Design

## Appendix

### Related Documents

- [Problem Statement: Task Recreation Friction](#)
- [User Research: Recurring Task Needs](#)
- [Figma: Recurring Tasks Design](#)
- [Technical Design: Recurrence Engine](#)

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | Jan 10, 2026 | Sarah Chen | Initial draft |
| 0.2 | Jan 12, 2026 | Sarah Chen | Added edge cases, updated scope |
| 1.0 | Jan 14, 2026 | Sarah Chen | Final review, approved by stakeholders |
