---
title: "Discover Stakeholder Summary: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - internal stakeholder map for the Resurface feature."
artifact: stakeholder-summary
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . internal stakeholder map for the Resurface feature
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before committing engineering resources to the Resurface feature (morning email digest), Brainshelf's PM mapped the internal stakeholders at the ~20-person startup to understand alignment, concerns, and communication needs. The analysis identified five key stakeholders: the CEO/co-founder (strong advocate, framing Resurface as the company's retention bet), the engineering lead (supportive but concerned about A/B testing infrastructure scope), the growth lead (sees Resurface as the primary lever for the retention OKR), the product designer (focused on ensuring the digest respects user attention), and the data analyst (needs proper instrumentation to measure Resurface impact and power the A/B experiment).

**Source Notes:**

- Mendelow, A. L. (1991), "Stakeholder Mapping" . the power/interest quadrant framework used in this analysis; Mendelow's grid classifies stakeholders by their ability to influence the project outcome and their level of interest in the project's success.
- Mitchell, Agle & Wood (1997), "Toward a Theory of Stakeholder Identification and Salience," Academy of Management Review . the salience model that informed the assessment of each stakeholder's urgency and legitimacy in the Resurface feature context; applied in the risk mitigation section to identify where stakeholder concerns could become blockers.
- Teresa Torres, "Continuous Discovery Habits" (producttalk.org) . the product trio concept (PM + designer + engineer) applied in the communication plan; Torres's framework informed the decision to include the engineering lead and designer as "manage closely" stakeholders rather than treating them as downstream implementers.

---

## Prompt

```
discover-stakeholder-summary

need to map the internal stakeholders for the resurface feature before
we kick off the build. brainshelf is a ~20 person startup so this is
small-team politics, not enterprise governance.

key people:
- marco (ceo/cofounder) . big advocate, sees this as the retention bet
- alex (eng lead) . supportive but worried about A/B test infrastructure
- jordan (growth) . wants resurface as the retention lever
- dan (designer) . concerned about the digest feeling spammy
- chloe (data) . needs instrumentation for the experiment

want a proper stakeholder map with communication plan.
```

---

## Output

# Stakeholder Summary: Resurface Feature

## Overview

**Project:** Resurface . morning email digest surfacing saved content for re-engagement
**Purpose:** Map internal stakeholder alignment, concerns, and communication needs before committing to the Resurface feature build
**Date:** January 2026
**Owner:** Priya M., Product Manager

## Stakeholder Map

```
                    [High Interest]
                          |
        KEEP SATISFIED    |    MANAGE CLOSELY
                          |
                          |    Marco S. (CEO)
                          |    Alex R. (Eng Lead)
[Low Influence] ----------+---------- [High Influence]
                          |    Dan K. (Designer)
                          |
        MONITOR           |    KEEP INFORMED
                          |
                          |    Jordan L. (Growth)
                          |    Chloe B. (Data)
                    [Low Interest]
```

### Quadrant Placement

**Manage Closely (High Influence, High Interest):**
- Marco S. (CEO/Co-founder)
- Alex R. (Engineering Lead)

**Keep Satisfied (High Influence, Low Interest):**
- (none . at a 20-person startup, high-influence stakeholders are all highly interested in the flagship feature bet)

**Keep Informed (Low Influence, High Interest):**
- Dan K. (Product Designer)
- Jordan L. (Growth Lead)
- Chloe B. (Data Analyst)

**Monitor (Low Influence, Low Interest):**
- (none for this project . all identified stakeholders have material interest)

## Stakeholder Profiles

| Stakeholder | Role | Influence | Interest | Alignment | Key Need |
|-------------|------|-----------|----------|-----------|----------|
| Marco S. | CEO/Co-founder | High | High | Supportive | Resurface must move the retention metric visibly enough to include in the next investor update |
| Alex R. | Engineering Lead | High | High | Supportive with reservations | Scope must be bounded; A/B test infrastructure should not become a permanent maintenance burden |
| Dan K. | Product Designer | Medium | High | Supportive with concerns | Digest must feel like a gift, not spam; design must respect user attention and inbox fatigue |
| Jordan L. | Growth Lead (part-time) | Medium | High | Strongly supportive | Resurface is the primary retention lever for the Q1 OKR; needs data to show the funnel impact |
| Chloe B. | Data Analyst | Low | High | Supportive | Instrumentation must be in place before launch; needs clean event data to power the A/B experiment analysis |

## Detailed Stakeholder Analysis

### Marco S.

**Role:** CEO/Co-founder
**Influence Level:** High . final decision authority on resource allocation and feature priority; sets the company narrative for investors and board
**Interest Level:** High . has publicly framed Resurface as "the feature that proves Brainshelf is a daily habit, not a save-and-forget tool" in the most recent team all-hands
**Current Alignment:** Supportive

**Needs:**
- Resurface must demonstrably improve the 7-day return rate or another retention metric that can be cited in the next investor update (April 2026 [fictional])
- The experiment timeline must be short enough to produce a result before the Q2 board meeting

**Concerns:**
- If the experiment is inconclusive or takes too long, the company loses a quarter of narrative momentum with investors
- Concerned that the engineering team is stretched and that Resurface could crowd out stability work if scope expands

**What Motivates Them:**
- Company survival and growth trajectory; Brainshelf is pre-Series A [fictional] and needs a retention story to support the next raise

**Preferred Communication:**
- Channel: Weekly 1:1 with PM (already scheduled)
- Frequency: Weekly during build phase; daily during launch week
- Style: Narrative with key metric callouts; no raw data tables

---

### Alex R.

**Role:** Engineering Lead, Backend (also Resurface feature lead)
**Influence Level:** High . owns engineering prioritization and technical architecture decisions; can block or accelerate based on feasibility assessment
**Interest Level:** High . directly responsible for building and maintaining the digest pipeline, email scheduling, and topic-matching algorithm
**Current Alignment:** Supportive with reservations

**Needs:**
- Clear, bounded scope for the v1 build . specifically, confirmation that the A/B test infrastructure (feature flags, variant assignment, experiment-specific event tracking) is a one-time investment, not a permanent engineering surface area
- Enough time to build integration tests for the notification scheduling pipeline before launch (this was a Sprint 7 retro action item that got deprioritized and directly contributed to the timezone bug scenario)

**Concerns:**
- The topic-matching algorithm could become an unbounded engineering project if the team keeps iterating on matching quality; wants a clear "good enough" threshold defined before build starts
- A/B testing infrastructure does not exist today; building it for Resurface could become a general-purpose experiment platform that the team is then expected to maintain
- Team bandwidth: the backend team is 2 engineers (Alex + Jess T. [fictional]); Resurface is the only major project they can take on this quarter without cutting stability work

**What Motivates Them:**
- Shipping quality software; takes professional pride in clean architecture and comprehensive test coverage; the timezone bug was personally frustrating

**Preferred Communication:**
- Channel: Slack DMs for quick decisions; 1:1 meeting for scope discussions
- Frequency: Twice weekly during build phase (Tuesday sync + ad hoc)
- Style: Technical and specific; appreciates written specs over verbal summaries

---

### Dan K.

**Role:** Product Designer
**Influence Level:** Medium . owns the visual and interaction design of the digest email and the opt-in flow; design decisions directly affect open rates and click-through rates
**Interest Level:** High . cares deeply about the user experience of the email; sees the digest as a design challenge with high stakes for user trust
**Current Alignment:** Supportive with concerns

**Needs:**
- The digest email must feel like a thoughtful recommendation, not an automated marketing email; design must differentiate from transactional emails and newsletter spam
- Enough time for a design iteration cycle before launch . at least one round of internal feedback on the email template before it goes to production

**Concerns:**
- "Inbox fatigue" risk: if the daily digest feels repetitive, formulaic, or irrelevant, users will unsubscribe or mentally filter it out; the unsubscribe rate is the guardrail metric he cares most about
- The 3 - 5 item format might feel too sparse or too dense depending on the content type surfaced; wants to test visual density with real content before launch

**What Motivates Them:**
- Craft and user empathy; wants Brainshelf to be a product users love, not just use; the Resurface email is a touchpoint that enters the user's personal inbox and must earn that privilege

**Preferred Communication:**
- Channel: Figma comments for design reviews; Slack for async updates
- Frequency: Design review at each milestone (wireframe, visual design, final template)
- Style: Visual . prefers seeing mockups over reading spec documents

---

### Jordan L.

**Role:** Growth Lead (part-time; splits time between growth and community)
**Influence Level:** Medium . owns the retention OKR and will report on Resurface's funnel impact to Marco; does not control engineering resources but influences priority through OKR framing
**Interest Level:** High . Resurface is the primary lever for the Q1 retention OKR (increase 7-day return rate from 18% to 25% [fictional]); without Resurface, the OKR has no credible path

**Needs:**
- The A/B experiment must produce a clean, attributable result that can be reported as an OKR outcome . not a "we think it helped" narrative but a statistically significant metric
- Access to real-time experiment dashboards during the test window so growth can monitor opt-in rates and flag any enrollment problems early

**Concerns:**
- If the experiment is underpowered (not enough opt-ins), the OKR result will be inconclusive and the quarter's retention story collapses
- Worried that the opt-in requirement will limit sample size; would prefer a larger eligible population, but understands the consent/privacy rationale

**What Motivates Them:**
- Measurable impact on user retention; growth function credibility depends on showing that product-led interventions (not just paid acquisition) can move retention metrics

**Preferred Communication:**
- Channel: Slack #growth channel for updates; email for formal reports
- Frequency: Bi-weekly during build; daily during experiment window
- Style: Metric-forward; wants numbers, confidence intervals, and funnel breakdowns

---

### Chloe B.

**Role:** Data Analyst
**Influence Level:** Low . does not own decisions or resources, but controls the instrumentation quality and analysis outputs that all other stakeholders depend on
**Interest Level:** High . Resurface is the most analytically interesting project on the roadmap; the A/B experiment gives her the opportunity to run Brainshelf's first properly powered statistical test

**Needs:**
- Instrumentation must be defined and reviewed before engineering implementation begins; the event schema needs to capture experiment-critical properties (variant assignment, email delivery status, click timestamps, read duration) without gaps
- Access to Amplitude (or equivalent) with experiment-specific dashboards configured before the test starts

**Concerns:**
- If instrumentation is treated as an afterthought (shipped late, with missing properties), the experiment analysis will have gaps that weaken the result and require manual data cleanup
- Apple Mail Privacy Protection will inflate open rate metrics for iOS/macOS users; the primary metric must be click-through rate, not open rate . this needs to be agreed before instrumentation is finalized

**What Motivates Them:**
- Analytical rigor; wants the experiment to be a model for how Brainshelf runs product experiments going forward; sees this as an opportunity to establish a standard for experiment analysis at the company

**Preferred Communication:**
- Channel: Slack #data for async; 1:1 with PM for experiment design review
- Frequency: At instrumentation spec review and at experiment analysis
- Style: Detail-oriented; wants to see the full event schema and analysis plan, not summaries

## Key Relationships

### Dependencies
| From | To | Dependency Type |
|------|-----|-----------------|
| Priya M. (PM) | Marco S. (CEO) | Approval . go/no-go on Resurface build commitment |
| Priya M. (PM) | Alex R. (Eng Lead) | Resources . backend engineering capacity for the build sprint |
| Chloe B. (Data) | Alex R. (Eng Lead) | Information . instrumentation spec must be reviewed and agreed before implementation |
| Jordan L. (Growth) | Chloe B. (Data) | Information . experiment dashboards and analysis outputs for OKR reporting |

### Alliances
- **Product trio (Priya + Dan + Alex):** Aligned on the Resurface vision; the core decision-making group for scope, design, and architecture choices. Alex's scope concerns and Dan's spam concerns are complementary constraints, not conflicts.
- **Growth + Data (Jordan + Chloe):** Aligned on the experiment producing a clean, attributable result; both need the same instrumentation quality and dashboard access.

### Potential Conflicts
| Parties | Conflict Area | Risk Level |
|---------|---------------|------------|
| Alex R. vs. Jordan L. | A/B test infrastructure scope: Alex wants minimal, one-time infrastructure; Jordan wants a reusable experiment platform for future tests | Medium |
| Dan K. vs. Jordan L. | Digest frequency: Dan worries daily is too aggressive for user attention; Jordan wants daily for maximum retention impact and statistical power | Low (resolved by testing daily first with unsubscribe guardrail) |

## Communication Plan

| Stakeholder | Frequency | Channel | Content | Owner |
|-------------|-----------|---------|---------|-------|
| Marco S. | Weekly | 1:1 meeting | Progress against timeline; key metric previews; risk flags | Priya M. |
| Alex R. | Twice weekly | Tuesday sync + Slack | Scope decisions; technical blockers; test coverage status | Priya M. |
| Dan K. | At milestones | Figma + Slack | Design reviews (wireframe, visual, final); user feedback on templates | Priya M. |
| Jordan L. | Bi-weekly (daily during experiment) | Slack #growth + email | Experiment enrollment rate; opt-in funnel; OKR progress | Priya M. |
| Chloe B. | At spec review + analysis | 1:1 + Slack #data | Instrumentation spec review; experiment analysis plan; dashboard setup | Priya M. |

## Risk Mitigation

### Resistant Stakeholders

| Stakeholder | Concern | Mitigation Strategy | Owner |
|-------------|---------|---------------------|-------|
| Alex R. | A/B test infrastructure becomes permanent maintenance burden | Scope the experiment infrastructure as a lightweight feature flag + event property approach (not a general experiment platform); document that the infrastructure is experiment-specific and will not be extended without a separate decision | Priya M. |
| Dan K. | Daily digest feels spammy and damages user trust | Include the unsubscribe rate as a hard guardrail metric (≤2%/week); if breached, pause the experiment and redesign the email format before continuing | Priya M. + Dan K. |

### Political Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Marco over-commits Resurface results in investor narrative before experiment concludes | Creates internal pressure to interpret ambiguous results as positive; could lead to shipping a feature that data does not support | Priya M. to brief Marco on the experiment timeline and agree on "we'll know by April 11" messaging for investors; no result claims before analysis is complete |
| Jordan's retention OKR depends entirely on Resurface | If experiment is inconclusive, growth function has no Q1 result; Jordan may push to extend or re-interpret the experiment | Set clear pass/fail criteria in the experiment design document and agree with Jordan before the test starts that inconclusive = inconclusive, not a partial win |

## Action Items

- [ ] Share this stakeholder summary with the product trio (Priya, Dan, Alex) for feedback
- [ ] Schedule instrumentation spec review meeting with Chloe before the build sprint begins
- [ ] Confirm with Marco that no Resurface results will be referenced in investor communications before the experiment analysis is complete (April 11 target)
- [ ] Resolve the A/B test infrastructure scope question with Alex: lightweight (feature flag + event properties) vs. reusable platform . document the decision in an ADR

## Document History

| Date | Change | Author |
|------|--------|--------|
| Jan 2026 | Initial creation | Priya M. |

---

*Review and update this document when stakeholder dynamics change or at major project milestones.*
