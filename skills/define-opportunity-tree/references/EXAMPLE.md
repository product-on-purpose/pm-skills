---
artifact: opportunity-tree
version: "1.0"
created: 2026-01-14
status: complete
context: SaaS productivity app focusing on user retention improvement
---

# Opportunity Solution Tree: Improve 30-Day User Retention

## Desired Outcome

**Outcome Statement:** Increase 30-day user retention rate
**Current State:** 40% of new users return after 30 days
**Target State:** 55% of new users return after 30 days
**Timeframe:** Q2 2026
**Owner:** Maya Johnson, Product Manager

### Why This Outcome Matters

User retention is our primary growth lever. Our acquisition costs are high ($45 CAC), so improving retention directly impacts unit economics. Users who make it past 30 days have 85% likelihood of converting to paid, making early retention critical to revenue growth. Leadership has identified this as our #1 product priority for the quarter.

---

## Visual Tree

```
                        [OUTCOME]
            Increase 30-day retention 40% → 55%
                           |
        ┌──────────────────┼──────────────────┐
        |                  |                  |
   [Opportunity 1]    [Opportunity 2]    [Opportunity 3]
   Users don't        Users can't find   Users forget
   understand value   features they      to come back
   in first session   need               |
        |                  |         ┌────┴────┐
    ┌───┴───┐          ┌───┴───┐     |         |
    |       |          |       |  [Email]  [Mobile
[Wizard] [Video]   [Search] [AI        Push]
    |       |          |    Assist]
[Test:   [Test:    [Test:   [Test:
Survey]  A/B]      Usage]   Prototype]
```

---

## Opportunity Branches

### Opportunity 1: Users don't understand the product's value in their first session

**Description:** New users sign up but don't experience an "aha moment" in their first session. They leave without understanding what the product can do for them.
**Impact Potential:** High
**Confidence:** High

**Evidence:**
- User Research (P3): "I signed up but wasn't sure what I was supposed to do first. I just clicked around."
- Data: 65% of churned users never completed their first task
- Support Tickets: "How do I get started?" is #2 most common question
- User Research (P7): "The product looks powerful but I didn't have time to figure it out."

#### Solutions

**Solution 1A: Interactive Onboarding Wizard**
- Description: A 3-step guided wizard that walks users through creating their first project, adding a task, and seeing the dashboard—guaranteeing they experience core value
- Effort: M
- Riskiest Assumption: Users will complete a multi-step wizard rather than skipping it
- Assumption Test: Prototype test with 5 users measuring completion rate and time-to-value

**Solution 1B: Personalized Video Walkthrough**
- Description: A 90-second contextual video (based on use case selected at signup) showing the product solving their specific problem
- Effort: M
- Riskiest Assumption: Users will watch a video rather than exploring on their own
- Assumption Test: A/B test video vs. no video, measure video completion and 7-day retention

**Solution 1C: Template Gallery with Guided Setup**
- Description: Offer pre-built templates (marketing calendar, sprint board, personal tasks) that users can clone, reducing setup friction
- Effort: S
- Riskiest Assumption: Templates match what users actually want to do
- Assumption Test: Survey 20 recent signups about their intended use case; compare to template library

---

### Opportunity 2: Users can't find the features they need when they need them

**Description:** Users come back with intent but can't locate features, get frustrated, and leave. The product has grown complex and discovery is poor.
**Impact Potential:** Medium
**Confidence:** Medium

**Evidence:**
- User Research (P2): "I know you have time tracking somewhere but I spent 10 minutes looking for it."
- Data: Search usage is low (8% of sessions) despite 50+ features
- Heatmaps: Users click on navigation items seemingly at random
- Support Tickets: "Where is X?" tickets increased 40% after last feature release

#### Solutions

**Solution 2A: Enhanced Search with Natural Language**
- Description: Upgrade search to understand natural language queries ("track time on this task") and show relevant features, not just content
- Effort: L
- Riskiest Assumption: Users will try search if we make it more prominent
- Assumption Test: Make search bar 2x larger and track usage change before investing in NLP

**Solution 2B: AI Feature Assistant**
- Description: A chatbot-style assistant that users can ask "how do I..." questions and get guided help
- Effort: XL
- Riskiest Assumption: Users will engage with a chatbot for navigation
- Assumption Test: Wizard of Oz test with 10 users—manually respond to chat queries and measure satisfaction

**Solution 2C: Contextual Feature Tips**
- Description: Surface relevant features based on what the user is doing (e.g., if editing a task, suggest time tracking)
- Effort: M
- Riskiest Assumption: Contextual tips won't feel intrusive or annoying
- Assumption Test: A/B test tips on/off for one feature area; monitor dismissal rate and feature adoption

---

### Opportunity 3: Users forget to come back—nothing prompts their return

**Description:** Users have initial intent but without habits formed or external triggers, they simply forget the product exists until they need it again (if ever).
**Impact Potential:** High
**Confidence:** High

**Evidence:**
- Data: 70% of churned users never returned after day 3
- User Research (P5): "It's a good product, I just forgot about it. I have a lot going on."
- Cohort Analysis: Users who engage within 72 hours have 3x retention
- Benchmark: Competitors send 4-5 emails in first week; we send 1

**Evidence:**

#### Solutions

**Solution 3A: Email Re-engagement Sequence**
- Description: A 5-email sequence over 14 days that highlights unused features and incomplete tasks, bringing users back with specific reasons
- Effort: S
- Riskiest Assumption: Users will open and act on emails rather than ignore or unsubscribe
- Assumption Test: A/B test new sequence vs. current single email; measure open rate, click rate, and return rate

**Solution 3B: Mobile Push Notifications**
- Description: Smart push notifications for task deadlines, team activity, and usage prompts
- Effort: M
- Riskiest Assumption: Users have mobile app installed and notifications enabled
- Assumption Test: Check current mobile app install rate (currently 23%); if low, this opportunity is capped

**Solution 3C: Weekly Digest Email**
- Description: A personalized weekly summary showing what happened in their workspace and what needs attention
- Effort: S
- Riskiest Assumption: Users have enough activity to make digest interesting
- Assumption Test: Mock up digest for 10 real users and assess if there's enough content to be useful

---

## Prioritization

### Current Focus

**Priority Opportunity:** Opportunity 1 - Users don't understand value in first session
**Priority Solution:** Solution 1A - Interactive Onboarding Wizard
**Rationale:** Highest confidence (strong evidence), addresses earliest stage of user journey (biggest impact window), medium effort (achievable this quarter). If users never understand value, no amount of re-engagement will save them.

### Opportunity Ranking

| Rank | Opportunity | Impact | Confidence | Effort | Score |
|------|-------------|--------|------------|--------|-------|
| 1 | First session value clarity | High | High | Medium | 8/10 |
| 2 | Users forget to return | High | High | Small | 7/10 |
| 3 | Feature discoverability | Medium | Medium | Large | 5/10 |

### Parking Lot

- **Gamification elements:** Interesting but unproven in B2B; needs more research before prioritizing
- **Community features:** High effort, unclear impact; revisit after core retention improves
- **Slack integration reminders:** Good idea but requires Slack app rebuild; defer to Q3

---

## Experiments Backlog

| Solution | Assumption | Test Method | Success Criteria | Status |
|----------|------------|-------------|------------------|--------|
| Onboarding Wizard | Users will complete wizard | Prototype test (5 users) | >70% completion | Planned |
| Onboarding Wizard | Wizard improves time-to-value | A/B test (2 weeks) | >20% reduction in time to first task | Planned |
| Email Sequence | Users open/click emails | A/B test (2 weeks) | >25% open rate, >5% click rate | Planned |
| Template Gallery | Templates match use cases | Survey (20 users) | >60% match rate | Planned |

---

## Learning Log

| Date | Experiment | Result | Learning | Impact on Tree |
|------|------------|--------|----------|----------------|
| TBD | Wizard prototype | TBD | TBD | TBD |

---

## Next Steps

- [ ] Design onboarding wizard prototype (Design, this week)
- [ ] Schedule 5 usability tests for wizard (Research, next week)
- [ ] Draft email re-engagement sequence copy (Marketing, this week)
- [ ] Pull data on mobile app install rate to size Opp 3B (Data, this week)
- [ ] Review tree with engineering to validate effort estimates (PM, this week)

---

*This is a living document. Update as you learn from experiments and customer feedback.*
