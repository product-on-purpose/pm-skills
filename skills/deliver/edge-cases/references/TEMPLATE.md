---
artifact: edge-cases
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# Edge Cases: [Feature Name]

## Feature Overview

<!-- Brief description of the feature being analyzed -->

[Feature description]

**Related Documents:**
- [PRD or User Story link]
- [Design specs link]

## Edge Case Categories

### Input Validation

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| [Input field] is empty | [What happens] | P1/P2/P3 | [Additional context] |
| [Input field] exceeds max length | [What happens] | P1/P2/P3 | [Max: X characters] |
| [Input field] contains special characters | [What happens] | P1/P2/P3 | [Which characters] |
| [Input field] wrong format | [What happens] | P1/P2/P3 | [Expected format] |

### Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| [Value] at minimum | [What happens] | P1/P2/P3 | [Min value: X] |
| [Value] at maximum | [What happens] | P1/P2/P3 | [Max value: X] |
| [Value] below minimum | [What happens] | P1/P2/P3 | [Error handling] |
| [Value] above maximum | [What happens] | P1/P2/P3 | [Error handling] |

### Error States

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Network failure during [action] | [What happens] | P1/P2/P3 | [Retry behavior] |
| [Resource] not found | [What happens] | P1/P2/P3 | [404 handling] |
| Permission denied | [What happens] | P1/P2/P3 | [Auth flow] |
| Session expired | [What happens] | P1/P2/P3 | [Re-auth flow] |
| Server error (5xx) | [What happens] | P1/P2/P3 | [Fallback behavior] |

### Concurrency

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User double-clicks submit | [What happens] | P1/P2/P3 | [Debounce/disable] |
| Two users edit same [resource] | [What happens] | P1/P2/P3 | [Conflict resolution] |
| Data changes after page load | [What happens] | P1/P2/P3 | [Stale data handling] |

### Integration Failures

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| [External service] unavailable | [What happens] | P1/P2/P3 | [Fallback/retry] |
| [External service] returns error | [What happens] | P1/P2/P3 | [Error mapping] |
| [External service] timeout | [What happens] | P1/P2/P3 | [Timeout value: Xs] |

## Error Messages

<!-- User-facing copy for each error state -->

| Error State | User Message | Additional Action |
|-------------|--------------|-------------------|
| [Error 1] | "[Message shown to user]" | [Button/link if any] |
| [Error 2] | "[Message shown to user]" | [Button/link if any] |
| [Error 3] | "[Message shown to user]" | [Button/link if any] |

## Recovery Paths

<!-- How users recover from each error -->

### [Error State 1]

**User sees:** [Error message or UI state]

**Recovery options:**
1. [Primary recovery action]
2. [Alternative recovery action]

**Data preservation:** [What data is saved/lost]

### [Error State 2]

**User sees:** [Error message or UI state]

**Recovery options:**
1. [Primary recovery action]
2. [Alternative recovery action]

**Data preservation:** [What data is saved/lost]

## Test Scenarios

<!-- QA checklist derived from edge cases -->

### Must Test (P1)

- [ ] [Test scenario 1]
- [ ] [Test scenario 2]
- [ ] [Test scenario 3]

### Should Test (P2)

- [ ] [Test scenario 4]
- [ ] [Test scenario 5]

### Nice to Test (P3)

- [ ] [Test scenario 6]
- [ ] [Test scenario 7]
