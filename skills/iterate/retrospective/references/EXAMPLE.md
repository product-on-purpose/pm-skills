---
artifact: retrospective
version: "1.0"
created: 2026-01-14
status: complete
context: Sprint 14 retrospective after payment feature launch
---

# Retrospective: Sprint 14 — Payment Feature Launch

## Overview

**Period Covered:** January 1-14, 2026 (Sprint 14)
**Date Held:** January 14, 2026
**Facilitator:** Maya Chen, Scrum Master
**Duration:** 60 minutes
**Format Used:** Start/Stop/Continue

### Attendees

- Alex Rivera, Engineering Lead
- Jordan Kim, Senior Engineer
- Sam Patel, Engineer
- Chris Wong, Engineer
- Taylor Brooks, Product Manager
- Maya Chen, Scrum Master

### Context

Sprint 14 included the launch of our new payment processing feature, which was a company priority. The team successfully shipped on time despite a mid-sprint requirements change. We also onboarded a new team member (Chris) during this sprint. There was one production incident (P2) related to payment timeout handling that was resolved within 4 hours.

---

## Previous Retrospective Review

### Action Items from Last Retro

| Action | Owner | Status | Notes |
|--------|-------|--------|-------|
| Create PR template with checklist | Alex | Complete | Now in use, team finds it helpful |
| Add Slack integration to CI pipeline | Jordan | Complete | Notifications working |
| Schedule design sync for Sprint 14 | Taylor | Complete | Held on Jan 3, reduced back-and-forth |
| Document on-call runbook | Sam | In Progress | 70% done, will finish this sprint |

---

## What Went Well

### Team Highlights

- Shipped payment feature on time despite mid-sprint requirements change
- Zero critical bugs found in production after launch
- Team rallied together during the P2 incident—great cross-functional response
- New PR template caught several issues before merge

### Process Wins

- Design sync meeting eliminated 3+ days of async back-and-forth
- Pair programming on complex payment logic reduced bugs
- Daily standups stayed focused and under 15 minutes

### Individual Shoutouts

- Jordan: Stepped up to mentor Chris during onboarding while maintaining velocity
- Sam: On-call response to P2 was exemplary—clear communication, fast resolution
- Taylor: Requirements change was communicated with context, not just "do this"

---

## What to Improve

### Challenges Faced

- Mid-sprint requirements change caused context switching and rework
- Test environment was unstable for 2 days, blocking integration testing
- P2 incident revealed gap in timeout handling documentation
- Chris felt unsure where to find information as new team member

### Process Pain Points

- Requirements changes mid-sprint—how do we protect sprint scope better?
- Flaky tests are getting worse—5 tests failed intermittently this sprint
- On-call runbook is still incomplete—we were lucky Sam knew what to do
- Onboarding documentation is outdated

### Themes Identified

| Theme | Items | Votes |
|-------|-------|-------|
| Test reliability | Flaky tests, unstable test env | 5 |
| Documentation gaps | Runbooks incomplete, onboarding docs outdated | 4 |
| Scope protection | Mid-sprint changes, context switching | 3 |

---

## Discussion Notes

### Test Reliability (Highest Priority)

**What was discussed:**
The team is frustrated with flaky tests. We identified 5 tests that have failed intermittently in the past month. Each failure wastes ~30 minutes investigating and re-running. The test environment instability was a separate issue (AWS configuration) but compounded the frustration.

**Root cause identified:**
- 3 tests have race conditions in async code
- 2 tests depend on external services without proper mocking
- Test env issue was due to expired credentials (now fixed)

**Proposed solution:**
Dedicate 1 story point per sprint to fixing flaky tests until backlog is clear. Start with the 3 race condition tests since those are highest impact.

---

### Documentation Gaps

**What was discussed:**
Chris mentioned that onboarding was harder than it needed to be—docs pointed to systems that no longer exist or had wrong information. The P2 incident also showed that our runbooks are incomplete. If Sam hadn't been on call, resolution would have taken longer.

**Root cause identified:**
- No owner for documentation maintenance
- Docs aren't part of our definition of done
- Runbooks were started but never finished

**Proposed solution:**
1. Sam will finish the on-call runbook this sprint (carryover)
2. Chris will update onboarding docs while experience is fresh
3. Consider adding "docs updated" to PR checklist for relevant changes

---

### Scope Protection

**What was discussed:**
The mid-sprint requirements change (adding Apple Pay support) was justified from a business perspective, but the team felt it was handled poorly. The change added 3 story points mid-sprint without removing anything.

**Root cause identified:**
- No clear escalation path for mid-sprint changes
- PM felt pressure to say yes without consulting team on impact
- We don't have a "scope change" process

**Proposed solution:**
Create a lightweight process: any mid-sprint addition requires (1) PM-Eng discussion of impact, (2) something of equal size removed or explicit scope increase acknowledgment, (3) documented reason. Taylor and Alex will draft this.

---

## Action Items

| Priority | Action | Owner | Due Date | Status |
|----------|--------|-------|----------|--------|
| 1 | Fix 3 race condition tests identified in CI | Jordan | Jan 21 | Not Started |
| 2 | Complete on-call runbook (carryover) | Sam | Jan 21 | In Progress |
| 3 | Update onboarding documentation | Chris | Jan 28 | Not Started |
| 4 | Draft scope change process | Taylor + Alex | Jan 17 | Not Started |

### Action Item Details

**Action 1: Fix race condition tests**
- What: Fix the 3 tests identified as having race conditions (test_async_payment, test_webhook_handler, test_batch_process)
- Why: Test reliability theme—reducing CI failures and investigation time
- Success criteria: Tests pass 50 consecutive times in CI

**Action 2: Complete on-call runbook**
- What: Finish documenting P1/P2 response procedures, escalation paths, and common issues
- Why: Documentation gaps theme—P2 incident showed risk
- Success criteria: Runbook reviewed by Alex and used in next on-call rotation

**Action 3: Update onboarding documentation**
- What: Review and update new developer onboarding guide, remove references to deprecated systems
- Why: Chris's experience showed docs are outdated; best to fix while fresh
- Success criteria: New hire (future) can set up environment using only docs

**Action 4: Draft scope change process**
- What: Create 1-page process for handling mid-sprint scope changes
- Why: Scope protection theme—prevent future frustration from unplanned changes
- Success criteria: Team agrees to trial process in Sprint 15

---

## Parking Lot

- **Tech debt backlog review:** We have 47 items in tech debt backlog. Should schedule a grooming session, but not urgent. Defer to Sprint 16 planning.
- **Pair programming formalization:** Team liked pairing on payment feature but want to discuss how to make it more regular. Add to Sprint 16 retro agenda.

---

## Metrics and Trends

### Team Health Indicators

| Indicator | This Retro | Last Retro | Trend |
|-----------|------------|------------|-------|
| Team morale (1-5) | 4.0 | 3.5 | ↑ |
| Process satisfaction (1-5) | 3.5 | 3.5 | → |
| Collaboration (1-5) | 4.5 | 4.0 | ↑ |

### Recurring Themes

- **Test reliability** has appeared in 3 of last 5 retros. This sprint we're committing to fixing the top issues.
- **Documentation** has appeared in 2 of last 5 retros. We now have 2 specific actions to address it.

---

## Facilitator Notes

- Start/Stop/Continue worked well for this team—consider alternating with 4Ls next time for variety
- Should timebox discussion sections more strictly—we ran 5 min over
- Anonymous input submission before meeting helped quieter team members contribute equally

---

## Next Retrospective

**Scheduled:** January 28, 2026
**Focus areas:** Check in on scope change process trial, test reliability progress

---

*Retrospective documented by Maya Chen on January 14, 2026.*
