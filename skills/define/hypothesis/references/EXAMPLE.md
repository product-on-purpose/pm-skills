---
artifact: hypothesis
version: "1.0"
created: 2026-01-14
status: complete
context: SaaS product with low onboarding completion rates testing simplified flow
---

# Hypothesis: Simplified Onboarding Flow

## Hypothesis Statement

**We believe that** reducing the onboarding flow from 7 steps to 3 essential steps

**for** new users signing up for a free trial

**will** increase onboarding completion rate

**as measured by** percentage of users who complete all onboarding steps within their first session

## Background & Rationale

### Problem Context

Our SaaS product has a 34% onboarding completion rate — meaning 66% of new signups never finish setup and experience the core value proposition. User research indicates the current 7-step onboarding feels overwhelming, with significant drop-off occurring at steps 4 and 5 (team invitation and integration setup). Users who don't complete onboarding are 4x more likely to churn within 14 days.

### Supporting Evidence

- Session recordings show users hesitating and abandoning at the team invitation step
- Support tickets frequently ask "Can I skip some of these steps?"
- Competitor analysis shows market leaders use 3-4 step onboarding flows
- Exit survey data: 42% of churned users cite "too complicated to get started"
- Hotjar heatmaps show users scrolling to find a "skip" button that doesn't exist

### Alternative Hypotheses Considered

- **Progress indicators:** Adding a progress bar might reduce anxiety without changing steps — rejected because underlying issue is step count, not visibility
- **Tooltips/guidance:** More help content might reduce confusion — rejected because it adds more cognitive load
- **Optional steps:** Making steps skippable might work — considered as fallback if simplification fails

## Target User Segment

### Definition

New users who:
- Sign up for a free trial (not paid conversion from trial)
- Are the first user from their organization (not invited team members)
- Access the product via web (not mobile app)

### Segment Size

- 12,400 new trial signups per month meeting these criteria
- 8,200 (66%) currently fail to complete onboarding

### Current Behavior

- Average time to complete current onboarding: 18 minutes
- Step 1-3 completion: 78%
- Step 4 (team invitation) completion: 52%
- Step 5 (integration) completion: 41%
- Full completion (all 7 steps): 34%
- Users who complete onboarding activate core feature within 24h: 89%

## Success Metrics

### Primary Metric

| Metric | Current Baseline | Target | Minimum Detectable Effect |
|--------|-----------------|--------|--------------------------|
| Onboarding completion rate | 34% | 50% | 10% relative lift |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
|--------|-----------------|-------------------|
| Time to complete onboarding | 18 min | Decrease to <8 min |
| Day-1 core feature activation | 30% | Increase |
| Support tickets (first 24h) | 8.2% of users | Decrease |
| User satisfaction (post-onboarding) | 3.2/5 | Increase |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
|--------|--------------|------------------|
| 14-day trial-to-paid conversion | 12% | No decrease >5% relative |
| Team invitation rate (within 7 days) | 23% | No decrease >10% relative |
| Integration connection rate (within 7 days) | 31% | No decrease >10% relative |

## Validation Approach

### Method

A/B test with 50/50 traffic split between:
- **Control:** Current 7-step onboarding flow
- **Treatment:** New 3-step onboarding (account basics, workspace setup, first task creation)

Deferred steps (team invitation, integrations) will be prompted via in-app messaging after initial activation.

### Sample Size & Duration

- Sample size: 3,000 users per variant (6,000 total)
- Duration: 14 days of enrollment + 7 days observation window
- Traffic allocation: 50% control / 50% treatment
- Statistical significance: 95% confidence level
- Statistical power: 80%

### Pass/Fail Criteria

- **Validated if:** Onboarding completion increases by ≥10% relative (34% → 37.4%+) with 95% confidence AND guardrail metrics stay within acceptable range
- **Invalidated if:** Onboarding completion shows no significant change or decreases, OR guardrail metrics breach acceptable range
- **Inconclusive if:** Results don't reach statistical significance within test window — extend test or increase sample

## Risks & Assumptions

### Key Assumptions

- Users who complete a shorter onboarding will still discover team/integration features later
- The 3 essential steps are sufficient to demonstrate core product value
- In-app prompts can effectively drive deferred actions
- Onboarding completion is a leading indicator of retention (not just correlated)

### Risks

- **Feature discovery risk:** Users might never set up teams/integrations if not prompted during onboarding
- **Segment spillover:** Results might not generalize to invited users or mobile signups
- **Novelty effect:** Initial lift might fade as users become accustomed to flow
- **Selection bias:** Users who would have completed 7-step flow might be different from marginal completers

## Timeline

| Phase | Dates | Duration |
|-------|-------|----------|
| Setup & instrumentation | Jan 15-17, 2026 | 3 days |
| Test running | Jan 18-31, 2026 | 14 days |
| Observation window | Feb 1-7, 2026 | 7 days |
| Analysis | Feb 8-10, 2026 | 3 days |
| Decision | Feb 11, 2026 | — |
