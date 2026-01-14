---
artifact: user-stories
version: "1.0"
created: 2026-01-14
status: complete
context: User stories for the Recurring Tasks feature in TaskFlow
---

# User Stories: Recurring Tasks Feature

This document contains the user stories for the Recurring Tasks feature. See the [Recurring Tasks PRD](#) for full context.

---

## Story 1: Create Recurring Task

### Story Header

| Field | Value |
|-------|-------|
| ID | US-101 |
| Title | Create Recurring Task |
| Persona | Team Lead |
| Priority | P0 |
| Epic/Feature | Recurring Tasks |
| Estimate | 5 points |

### User Story Statement

**As a** team lead,

**I want** to create a task that repeats on a schedule,

**so that** I don't have to manually recreate recurring work items each week.

### Context & Background

Team leads manage ongoing operational tasks like weekly status reports, monthly reviews, and recurring team meetings. Currently, they manually duplicate these tasks, which is time-consuming and error-prone. This story enables basic recurring task creation with standard patterns.

### Acceptance Criteria

#### AC-1: Recurrence Toggle Available

**Given** I am creating a new task

**When** I view the task creation form

**Then** I see a "Make Recurring" toggle option

#### AC-2: Pattern Selection

**Given** I have enabled the "Make Recurring" toggle

**When** I view the recurrence options

**Then** I can select from Daily, Weekly, or Monthly patterns

#### AC-3: Weekly Day Selection

**Given** I have selected "Weekly" recurrence

**When** I configure the pattern

**Then** I can select which days of the week the task should recur (multi-select)

#### AC-4: Monthly Date Selection

**Given** I have selected "Monthly" recurrence

**When** I configure the pattern

**Then** I can choose either a specific date (1-31) or a relative day (e.g., "First Monday")

#### AC-5: First Instance Created

**Given** I have configured a recurrence pattern and saved the task

**When** the task is created

**Then** the first instance appears in my task list with a recurring indicator icon

### Design Notes

- Recurrence panel expands below task details when toggle is enabled
- Use calendar-style day picker for weekly selection
- Show preview text: "Repeats every Monday and Wednesday"
- See [Figma: Recurring Task Creation](#) for mockups

### Technical Notes

- Store pattern as RRULE format for future calendar sync compatibility
- Generate instances on-demand, not all at once
- First instance due date = task due date; subsequent follow pattern

### Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| None | — | Ready |

### Out of Scope

- Custom patterns (e.g., "every 2 weeks")
- End date configuration (covered in US-105)

---

## Story 2: Edit Single Instance

### Story Header

| Field | Value |
|-------|-------|
| ID | US-102 |
| Title | Edit Single Instance |
| Persona | Individual Contributor |
| Priority | P0 |
| Epic/Feature | Recurring Tasks |
| Estimate | 3 points |

### User Story Statement

**As an** individual contributor,

**I want** to edit a single occurrence of a recurring task without changing the entire series,

**so that** I can handle exceptions like rescheduling one meeting without affecting future occurrences.

### Context & Background

Recurring tasks often need instance-level modifications — a weekly report might have a different deadline one week due to a holiday, or a recurring meeting might have different agenda items. Users need flexibility to modify individual instances without disrupting the overall pattern.

### Acceptance Criteria

#### AC-1: Edit Scope Prompt

**Given** I am editing a task that is part of a recurring series

**When** I modify any field and attempt to save

**Then** I am prompted to choose "Edit this instance only" or "Edit all future instances"

#### AC-2: Instance-Only Edit

**Given** I have selected "Edit this instance only"

**When** I save my changes

**Then** only the current instance is updated, and future instances retain original values

#### AC-3: Instance Visual Indicator

**Given** I have edited a single instance

**When** I view that instance in my task list

**Then** it displays an indicator showing it differs from the series pattern

#### AC-4: Series Unaffected

**Given** I have edited a single instance

**When** I view other instances of the same series

**Then** they retain the original values from the series template

### Design Notes

- Modal dialog for edit scope selection
- Modified instances show "edited" badge
- See [Figma: Instance Edit Flow](#) for interaction details

### Technical Notes

- Instance modifications stored as overrides, not new records
- Preserve link to parent series for reporting purposes

### Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-101 | Story | Ready |

### Out of Scope

- Editing the recurrence pattern itself (covered in US-103)
- Bulk editing multiple instances

---

## Story 3: View Upcoming Instances

### Story Header

| Field | Value |
|-------|-------|
| ID | US-103 |
| Title | View Upcoming Instances |
| Persona | Team Lead |
| Priority | P0 |
| Epic/Feature | Recurring Tasks |
| Estimate | 3 points |

### User Story Statement

**As a** team lead,

**I want** to see upcoming instances of my recurring tasks,

**so that** I can plan my workload and anticipate upcoming deadlines.

### Context & Background

Visibility into future recurring instances helps users plan their time effectively. Without this, users would only see the current instance and might be surprised by upcoming work. This story ensures recurring tasks are visible in planning views.

### Acceptance Criteria

#### AC-1: Future Instances in Task List

**Given** I have a recurring task with future instances

**When** I view my task list with "Show upcoming" enabled

**Then** I see the next 4 weeks of instances for that recurring task

#### AC-2: Instances in Calendar View

**Given** I have a recurring task with future instances

**When** I view the calendar

**Then** I see recurring task instances on their scheduled dates

#### AC-3: Instance Count Display

**Given** I am viewing an instance of a recurring task

**When** I look at the task details

**Then** I see which instance this is (e.g., "#3 of series")

#### AC-4: Series Overview

**Given** I am viewing any instance of a recurring series

**When** I click "View Series"

**Then** I see a list of all past and upcoming instances with their status (completed, pending, overdue)

### Design Notes

- Upcoming instances shown with lighter styling than current tasks
- "View Series" link in task detail panel
- Calendar shows recurring icon on recurring task dates

### Technical Notes

- Instances generated lazily (on view, not on creation)
- Maximum 4 weeks forward generation to limit database growth
- Consider pagination for series overview if >20 instances

### Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-101 | Story | Ready |
| Calendar View Refactor | Team | In Progress |

### Out of Scope

- Filtering task list by recurring vs. one-time
- Exporting series to external calendars

---

## Story 4: Pause Recurring Series

### Story Header

| Field | Value |
|-------|-------|
| ID | US-104 |
| Title | Pause Recurring Series |
| Persona | Team Lead |
| Priority | P1 |
| Epic/Feature | Recurring Tasks |
| Estimate | 2 points |

### User Story Statement

**As a** team lead,

**I want** to pause a recurring task series temporarily,

**so that** I can stop generating new instances during holidays or project pauses without deleting the series.

### Context & Background

Teams often need to temporarily halt recurring tasks — during holiday periods, team transitions, or project pauses. Deleting and recreating the series is cumbersome. A pause mechanism preserves the configuration while stopping new instance generation.

### Acceptance Criteria

#### AC-1: Pause Action Available

**Given** I am viewing a recurring task instance

**When** I open the task actions menu

**Then** I see a "Pause Series" option

#### AC-2: Pause Confirmation

**Given** I click "Pause Series"

**When** the confirmation dialog appears

**Then** I see a message explaining that no new instances will be generated until resumed

#### AC-3: Paused Visual State

**Given** I have paused a recurring series

**When** I view any instance of that series

**Then** it displays a "Paused" indicator with muted styling

#### AC-4: Resume Functionality

**Given** I have a paused recurring series

**When** I click "Resume Series"

**Then** the series resumes generating instances from the next scheduled date

### Design Notes

- Pause/Resume toggle in task action menu
- Paused tasks show pause icon and grayed styling
- Resume calculates next instance from today, not from pause date

### Technical Notes

- Add `paused_at` timestamp to series record
- Paused series excluded from instance generation job
- Existing instances remain visible but no new ones created

### Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-101 | Story | Ready |

### Out of Scope

- Scheduled pause (pause until specific date)
- Auto-resume after X days

---

## INVEST Checklist Summary

| Story | Independent | Negotiable | Valuable | Estimable | Small | Testable |
|-------|------------|------------|----------|-----------|-------|----------|
| US-101 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-102 | Yes (depends on 101) | Yes | Yes | Yes | Yes | Yes |
| US-103 | Yes (depends on 101) | Yes | Yes | Yes | Yes | Yes |
| US-104 | Yes (depends on 101) | Yes | Yes | Yes | Yes | Yes |
