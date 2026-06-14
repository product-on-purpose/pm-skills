---
scenario: onboarding-checklist
skill: measure-experiment-design
family: measurement
created: 2026-06-14
---

# Scenario: A/B test a new onboarding checklist

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an experiment-design artifact
for it. Judges never see this header.

## Context

**Product:** a B2C habit-tracking mobile app. **Hypothesis the team holds:** showing a 3-step guided
onboarding checklist (set a goal, schedule a reminder, log day one) right after signup will get more
new users to form an early habit, measured by **day-7 retention**.

**What we know (use these numbers for the design):**
- New signups: **~12,000 per week**, split roughly evenly across iOS and Android.
- Current **day-7 retention** for new users: **34%**.
- The team would consider a **3 percentage-point** lift (34% -> 37%) a meaningful win worth shipping.
- Current first-session completion (any logged action): **58%**.
- Average revenue per retained user matters but monetization is downstream (subscription at day 14+).
- Past experiments at this app used a **0.05 significance level** and **80% power** by convention.

**Things the team is unsure about / wants the design to address:**
- How many users per arm and how long to run, given the weekly traffic and clear weekday/weekend
  behavior differences.
- What the single primary metric should be, and what secondary/guardrail metrics to watch (they worry
  the checklist could feel like friction and depress first-session completion or increase day-1
  uninstalls).
- What exactly counts as a win vs an inconclusive result, decided before launch.

**Audience for the artifact:** the growth PM and the data scientist who will run the test.
