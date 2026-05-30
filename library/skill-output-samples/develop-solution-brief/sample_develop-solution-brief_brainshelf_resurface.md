---
title: "Develop Solution Brief: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface feature solution brief for team alignment."
artifact: solution-brief
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface feature solution brief for team alignment
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After the opportunity tree and JTBD canvas confirmed the re-engagement trigger gap as the highest-priority opportunity, Priya M. wrote a one-page solution brief to align the full team . including Marco S. (CEO) and the two backend engineers . on what Resurface would actually be before Sprint 8 planning began. The brief captures the minimum feature set, success metrics, explicit scope exclusions, and the key risks the team accepted going into the build.

**Source Notes:**

- Marty Cagan, "Inspired: How to Create Tech Products Customers Love" (svpg.com) . the product discovery philosophy that motivates writing a solution brief before sprint planning; Cagan's principle that the PM should communicate the problem and the solution's intent, not the implementation details, shaped the brief's focus on user outcomes over technical architecture.
- Teresa Torres, "Continuous Discovery Habits" (producttalk.org) . the opportunity solution tree methodology used to select the email digest (Solution 1A) from the opportunity tree; Torres's framework ensures the solution connects directly to a validated opportunity and a measurable outcome.
- Amplitude, "North Star Metric" (amplitude.com/blog/north-star-metric) . the framework used to select 7-day return rate as the primary success metric; the North Star Metric methodology requires that the chosen metric reflects the core value the product delivers to users, which for Brainshelf is return visits driven by content re-engagement.

---

## Prompt

```
develop-solution-brief

resurface one-pager for the team. need to get everyone on the same
page before sprint 8 starts. marco wants to see it too.

the solution: daily morning email digest that surfaces 3-5 saved items
matched to what the user has been reading recently. opt-in required.
7:30 AM local time. topic matching algorithm picks the items.

key features: email digest, topic matching, opt-in flow, one-click
read, cadence setting (daily default, can switch to 3x/week).

primary metric: 7-day return rate, 18% → 25% [fictional].
secondary: email CTR. guardrail: unsub rate ≤2%/week.

explicitly NOT doing: in-app resurfacing (deferred), push notifications
(too aggressive for first version), smart collections (too big),
annotation-based resurfacing (that's readwise's approach, we're
doing topic matching instead).
```

---

## Output

# Solution Brief: Resurface . Morning Email Digest

## Problem Recap

Brainshelf users save content enthusiastically (~47 items/month average [fictional]) but almost never return to read it: fewer than 9% of saved items are revisited within 30 days [fictional], and the 7-day return rate is 18% [fictional] . well below the Q1 retention OKR target of 25% [fictional]. The root cause identified in the January 2026 user interviews is the absence of any external trigger to return: users save, close the tab, and never think about the saved item again because nothing reminds them. The saved library has become a guilt pile rather than a reading resource.

## Proposed Solution

Resurface is a daily morning email digest that surfaces 3 - 5 saved items matched to the user's recent reading interests and delivers them to the user's inbox at 7:30 AM in their local timezone. The email contains article titles, source domains, topic tags, and estimated read times . no images, no marketing copy, no guilt-inducing item counts. Each item links directly to the saved content so the user can start reading with a single click. Resurface requires explicit opt-in (email permission + digest activation) and can be configured to deliver daily (default) or three times per week. The feature creates the external trigger that is currently missing from the Brainshelf experience, connecting the user's moment of morning availability to their most relevant saved content.

## Key Features

1. **Daily email digest:** A digest email delivered at 7:30 AM in the user's local timezone containing 3 - 5 saved items. The structured text layout (no images) is designed to feel like a personal recommendation, not a marketing newsletter, maximizing both deliverability and trust.

2. **Topic-matching algorithm:** A TF-IDF - based relevance engine that selects digest items by matching each saved item's content against the user's recent reading patterns (items read, saved, or clicked in the prior 7 days). Items are ranked by relevance score and filtered to exclude items already resurfaced in the prior 14 days to prevent repetition.

3. **Opt-in flow:** A lightweight in-app prompt (home screen card + settings toggle) that asks users to enable the digest and confirm their email address. Opt-in is required before any email is sent. The flow is designed to be low-friction (two taps) while remaining fully compliant with email consent requirements.

4. **One-click read:** Each item in the digest links directly to the saved content URL. Clicking an item opens the article in the user's browser and records a "resurfaced read" event in Brainshelf's analytics, enabling measurement of digest-driven re-engagement without requiring the user to open the Brainshelf app.

5. **Cadence setting:** Users can choose between daily delivery (default) and three-times-per-week delivery (Monday, Wednesday, Friday). The setting is accessible from the digest email footer and the Brainshelf app settings. The default cadence is daily because the hypothesis is that daily delivery maximizes habit formation; the 3x/week option mitigates inbox fatigue risk for users who prefer less frequent email.

## Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| 7-day return rate (primary) | 18% [fictional] | 25% [fictional] | Q2 2026 |
| Resurface email CTR (secondary) | n/a | ≥15% [fictional] | 4-week A/B test (Mar 9  -  Apr 5, 2026) |
| Email unsubscribe rate (guardrail) | n/a | ≤2% per week [fictional] | Ongoing from launch |

## Trade-offs Considered

| What We're Not Doing | Why |
|---------------------|-----|
| In-app resurfacing (notification card on home screen) | Deferred to post-experiment. The in-app card only works if users open the app, which is the behavior we're trying to create . it cannot be the trigger. If the email digest succeeds, the in-app card can amplify the effect for non-email users in a future iteration |
| Push notifications | Too aggressive for the first version. Push notifications carry higher user annoyance risk than email, and the unsubscribe/opt-out path is less graceful. Email is the lower-risk channel to validate the resurfacing hypothesis |
| Smart collections / auto-categorization | Addresses the library overwhelm opportunity (Opp 3), not the trigger gap (Opp 1). Effort is large (L) and depends on auto-categorization accuracy. Deferred until the trigger gap is resolved and we can measure whether library overwhelm is an independent retention driver |
| Annotation-based resurfacing (Readwise model) | Requires users to highlight content before it can be resurfaced, which excludes the majority of Brainshelf users who save but don't annotate. Topic matching is accessible to all users regardless of annotation behavior |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Opt-in rate is below 10% [fictional], making the A/B experiment underpowered | Medium | High . experiment cannot reach statistical significance within 4 weeks if sample is too small | Monitor opt-in rate daily in week 1; if below 5% at day 7, extend enrollment window and test a revised opt-in prompt with stronger value proposition copy |
| Digest emails land in Gmail promotions tab, reducing effective delivery | Medium | High . emails in promotions are opened at ~5% rate vs. ~20% for primary inbox | Use text-only layout (no images, no marketing patterns); configure SPF, DKIM, DMARC on day 1; monitor inbox placement using seed list testing in the first week |
| Topic-matching algorithm surfaces irrelevant items, eroding user trust | Medium | Medium . irrelevant items increase unsubscribe rate and reduce CTR | Set a minimum relevance score threshold; if fewer than 3 items pass the threshold, reduce the digest to the qualifying items rather than padding with low-relevance content. Monitor item-level CTR to identify consistently ignored topic categories |
| Timezone handling error delivers digests at the wrong local time | Low | Medium . a 7:30 AM email delivered at 3:30 AM is ignored or creates a negative impression | Store timezone at opt-in; validate timezone against device locale; add integration test coverage for DST transitions and UTC offset edge cases |

## Next Steps

1. Finalize Sprint 8 stories and assign to engineers . Priya M., by Feb 2, 2026
2. Complete Resend integration and DNS configuration . Alex R. + Jess T., Sprint 8 (Feb 3 - 16, 2026)
3. Build opt-in flow and digest email template . Sam W. + Dan K., Sprint 8 (Feb 3 - 16, 2026)
4. Ship Resurface to production behind feature flag . Alex R., end of Sprint 8 (Feb 14, 2026)
5. Begin opt-in enrollment and A/B test setup . Priya M. + Chloe B., Mar 2 - 8, 2026
