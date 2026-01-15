---
artifact: refinement-notes
version: "1.0"
created: 2026-01-14
status: complete
context: Weekly refinement session preparing for Sprint 15
---

# Refinement Notes: January 14, 2026

## Session Info

| Attribute | Value |
|-----------|-------|
| **Date** | January 14, 2026, 2:00 PM EST |
| **Duration** | 45 minutes |
| **Facilitator** | Maya Chen (Scrum Master) |
| **Sprint Preparing For** | Sprint 15 (Jan 20 - Feb 2) |

### Attendees

- [x] Alex Rivera, Engineering Lead
- [x] Jordan Kim, Senior Engineer
- [x] Sam Patel, Engineer
- [x] Taylor Brooks, Product Manager
- [x] Maya Chen, Scrum Master
- [ ] Chris Wong, Engineer *(on PTO)*

---

## Summary

**Stories Discussed:** 5
**Stories Refined (Ready):** 3
**Stories Needing More Work:** 1
**Blocked Stories:** 1
**Total Points Estimated:** 13

---

## Stories Refined

### USER-342: Add CSV Export to Reports Dashboard

| Attribute | Value |
|-----------|-------|
| **Points** | 3 |
| **Status** | Ready |
| **Assignee** | Jordan |

**Discussion Notes:**
- Export should include all visible columns, respecting current filters
- Max export size: 10,000 rows (show warning, not error, at limit)
- File naming convention: `report-{report-name}-{date}.csv`
- Team agreed to use existing CSV library (PapaParse) for consistency

**Scope Changes:**
- Originally included Excel export—moved to separate story for future sprint

**Acceptance Criteria Confirmed:**
- [x] Export button visible on reports dashboard
- [x] CSV includes all visible columns with headers
- [x] Current filters applied to export
- [x] Large export shows warning but completes
- [x] Filename follows naming convention

---

### USER-345: Implement Password Reset Rate Limiting

| Attribute | Value |
|-----------|-------|
| **Points** | 5 |
| **Status** | Ready |
| **Assignee** | Sam |

**Discussion Notes:**
- Limit: 5 reset requests per email per hour
- After limit hit: show generic "check your email" message (no indication of limiting for security)
- Rate limit data stored in Redis with 1-hour TTL
- Security team reviewed and approved approach

**Scope Changes:**
- None

**Acceptance Criteria Confirmed:**
- [x] Max 5 reset requests per email per hour
- [x] User sees same message whether limited or not (security)
- [x] Rate limit resets after 1 hour
- [x] Admin dashboard shows rate limit events for monitoring

---

### USER-347: Profile Page Loading Performance

| Attribute | Value |
|-----------|-------|
| **Points** | 5 |
| **Status** | Ready |
| **Assignee** | Alex |

**Discussion Notes:**
- Current load time: 3.2 seconds average
- Target: Under 1 second for 90th percentile
- Main issue: N+1 query for user's projects
- Solution: Eager loading + pagination (show first 10 projects, load more on scroll)
- Jordan suggested we add performance test to prevent regression

**Scope Changes:**
- Added acceptance criterion for performance test

**Acceptance Criteria Confirmed:**
- [x] Profile page loads in <1 second (p90)
- [x] Initial load shows first 10 projects
- [x] Additional projects load on scroll (infinite scroll)
- [x] Performance test added to CI pipeline

---

### USER-348: User Settings Redesign

| Attribute | Value |
|-----------|-------|
| **Points** | — |
| **Status** | Needs Work |
| **Assignee** | TBD |

**Discussion Notes:**
- Story is too large—team estimated 13+ points
- Decision: Split into 3 smaller stories
  - USER-348a: Settings navigation restructure (3 pts)
  - USER-348b: Notification preferences panel (5 pts)
  - USER-348c: Privacy settings panel (3 pts)
- Taylor will create the split stories with UX guidance

**Scope Changes:**
- Entire story being split

**Acceptance Criteria Confirmed:**
- [ ] Pending split into smaller stories

---

### USER-350: Dark Mode Toggle

| Attribute | Value |
|-----------|-------|
| **Points** | — |
| **Status** | Blocked |
| **Assignee** | TBD |

**Discussion Notes:**
- Design team hasn't provided dark mode color palette yet
- Can't estimate until we know scope of color changes
- Some components may need redesign (charts, badges with colored backgrounds)

**Blocker:**
- Missing design specs—blocked on design team

---

## Stories Summary Table

| Story | Title | Points | Status | Notes |
|-------|-------|--------|--------|-------|
| USER-342 | CSV Export for Reports | 3 | Ready | Excel export moved to future |
| USER-345 | Password Reset Rate Limiting | 5 | Ready | Security team approved |
| USER-347 | Profile Page Performance | 5 | Ready | Added perf test criterion |
| USER-348 | User Settings Redesign | — | Needs Work | Splitting into 3 stories |
| USER-350 | Dark Mode Toggle | — | Blocked | Waiting on design specs |

---

## Questions Raised

| Question | Raised By | Owner | Due Date | Status |
|----------|-----------|-------|----------|--------|
| Should CSV export include hidden columns? | Jordan | Taylor | Jan 15 | Open |
| What's the plan for internationalization of exported dates? | Sam | Taylor | Jan 15 | Open |
| Can we get design specs for dark mode by Thursday? | Maya | Design Lead | Jan 16 | Open |

### Question Details

**Q: Should CSV export include hidden columns?**
- Context: Users can hide columns in the report view. Should hidden columns appear in export?
- Impact: Minor—doesn't block story, but affects implementation detail
- Notes: Taylor leaning toward "export matches what you see" but will confirm with customers

**Q: What's the plan for internationalization of exported dates?**
- Context: We have users in multiple locales. Dates in CSV might be ambiguous.
- Impact: Could affect USER-342 scope
- Notes: Options: ISO 8601 dates (unambiguous) or locale-specific with locale in filename

---

## Decisions Made

| Decision | Context | Made By |
|----------|---------|---------|
| Use ISO 8601 dates for CSV exports | Locale-specific dates too confusing; ISO is unambiguous | Team consensus |
| Split USER-348 into 3 stories | Original story too large (13+ points) | Team consensus |
| Add performance test to USER-347 | Prevent regression after optimization | Jordan's suggestion, team agreed |

---

## Action Items

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| Create split stories for USER-348 | Taylor | Jan 15 | Not Started |
| Answer CSV hidden columns question | Taylor | Jan 15 | Not Started |
| Follow up with design on dark mode specs | Maya | Jan 16 | Not Started |
| Update USER-342 with ISO 8601 date decision | Jordan | Jan 14 | Not Started |

---

## Blocked Stories

| Story | Blocker | Owner | Expected Resolution |
|-------|---------|-------|---------------------|
| USER-350 | Missing dark mode design specs | Design Lead | Jan 16 (Maya to follow up) |

---

## Parking Lot

- **Mobile responsive settings:** Jordan raised that settings page isn't mobile-friendly. Agreed to create a separate story rather than expand USER-348 scope. Taylor to add to backlog.
- **Export to Google Sheets:** Customer request came in during session. Taylor will assess priority and create story if warranted.

---

## Next Session

**Date:** January 21, 2026, 2:00 PM EST
**Stories to Prepare:**
- USER-348a, 348b, 348c: Split settings stories (after Taylor creates them)
- USER-350: Dark mode (if design specs received)
- USER-352: Bulk user invite (Taylor to write story by Thursday)

**Preparation Needed:**
- Taylor: Create split stories for USER-348 by Thursday
- Maya: Confirm design specs timeline for dark mode
- Chris: Review notes and raise any concerns async (returning from PTO)

---

*Notes captured by Maya Chen on January 14, 2026.*
