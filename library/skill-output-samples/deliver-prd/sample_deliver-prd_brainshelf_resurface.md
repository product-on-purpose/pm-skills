---
title: "Deliver PRD: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface feature PRD for Sprint 8 build."
artifact: prd
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface feature PRD for Sprint 8 build
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

With the solution brief approved and the spike complete, Priya M. wrote the full PRD for the Resurface feature to hand off to engineering for Sprint 8 planning. The PRD consolidates decisions from the opportunity tree (email digest as Solution 1A), the ADR (Resend as email provider), the design rationale (structured text layout), and the spike summary (TF-IDF topic matching) into a single source of truth covering scope, functional requirements, success metrics, and the rollout timeline through the A/B test.

**Source Notes:**

- Marty Cagan, "Inspired: How to Create Tech Products Customers Love" (svpg.com) . the PRD philosophy applied in this document; Cagan advocates for PRDs that focus on what the product does and why, leaving implementation details to engineering, while being precise enough about acceptance criteria that the team can build without ambiguity.
- Lenny Rachitsky's consumer app retention benchmarks (Lenny's Newsletter, 2023) . the 7-day return rate benchmarks used to validate the 25% target; Rachitsky places the median for consumer utility apps at 25–35%, making the target the minimum viable retention performance for the category.
- Nir Eyal, "Hooked: How to Build Habit-Forming Products" (nirandfar.com) . the external trigger framework that underpins the Resurface hypothesis; Eyal's model identifies a daily email as the minimum viable external trigger for products where the internal trigger (self-motivation to return) has not yet been established.

---

## Prompt

```
/prd

resurface prd for sprint 8. pulling everything together: solution brief,
adr (resend), design rationale (text layout), spike (tfidf).

building the daily email digest that surfaces 3-5 saved items matched
to recent reading. opt-in required. 7:30 AM local time. tfidf for
topic matching. resend for email. text-only layout.

target users: active savers (10+ items, active in last 30 days) .
about 9,800 users [fictional].

metrics: 7-day return rate 18%→25% [fictional], email CTR ≥15% [fictional],
unsub ≤2%/week [fictional].

scope: digest email, topic matching, opt-in flow, cadence setting,
one-click read, analytics events. NOT doing: in-app resurfacing,
push notifications, smart collections.

timeline: sprint 8 build (feb 3-16), setup week (mar 2-8),
a/b test (mar 9 - apr 5), decision (apr 11).
```

---

## Output

# PRD: Resurface . Morning Email Digest

## Overview

### Problem Statement

Brainshelf users save content at a high rate (~47 items/month average [fictional]) but almost never return to read it: fewer than 9% of saved items are revisited within 30 days [fictional]. The 7-day return rate is 18% [fictional], well below the Q1 retention OKR target of 25% [fictional]. The root cause is the absence of any external trigger to return . users save, close the tab, and the saved item disappears from their attention because nothing prompts them to come back. The saved library has become a guilt pile rather than a reading resource, actively discouraging re-engagement. See the full problem statement for additional detail.

### Solution Summary

Resurface is a daily morning email digest that delivers 3–5 saved items matched to the user's recent reading interests. The email arrives at 7:30 AM in the user's local timezone and contains article titles, source domains, topic tags, and estimated read times in a structured text layout (no images). Each item links directly to the saved content for one-click reading. The feature requires explicit opt-in and supports daily or 3x/week delivery cadence. Resurface creates the external trigger that is currently missing from the Brainshelf experience, connecting moments of morning availability to the user's most relevant saved content.

### Target Users

Active savers: Brainshelf users who have saved 10 or more items and have been active within the past 30 days (at least one save event). This segment represents approximately 9,800 users, or ~45% of Brainshelf's 22,000 MAU [fictional]. These users have demonstrated saving intent but have not formed a return-and-read habit.

## Goals & Success Metrics

### Goals

1. Increase the 7-day return rate from 18% to 25% [fictional] by creating an external trigger (email digest) that brings users back to their saved content
2. Validate the Resurface hypothesis through a 4-week A/B experiment measuring email click-through rate as the primary behavioral indicator of digest-driven re-engagement
3. Establish Brainshelf's first email channel as a foundation for future email-based features (weekly summaries, milestone notifications, onboarding sequences)

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| 7-day return rate (primary) | 18% [fictional] | 25% [fictional] | Q2 2026 |
| Resurface email CTR (secondary) | n/a | ≥15% [fictional] | 4-week A/B test |
| Email unsubscribe rate (guardrail) | n/a | ≤2% per week [fictional] | Ongoing |
| Opt-in rate (diagnostic) | n/a | ≥10% of eligible users [fictional] | First 7 days of enrollment |

### Non-Goals

- Reducing the size of the saved library . Resurface does not delete, archive, or reorganize items; it resurfaces individual items from the existing library
- Replacing the in-app reading experience . Resurface links directly to the original saved URL, not to a Brainshelf-hosted reading view
- Building a full recommendation engine . the TF-IDF topic-matching algorithm is an MVP relevance filter, not a personalized recommendation system; it selects items that are topically similar to recent activity, not items predicted to maximize engagement

## User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-001 | As an active saver, I want to receive a daily email with my most relevant saved items so that I have a reason to return and read | P0 |
| US-002 | As a Brainshelf user, I want to opt in to the Resurface digest so that I control whether I receive email from Brainshelf | P0 |
| US-003 | As a digest subscriber, I want to click an item in the email and go directly to the article so that I can start reading immediately | P0 |
| US-004 | As a digest subscriber, I want to change my delivery frequency so that I can reduce email volume if daily is too much | P1 |
| US-005 | As a digest subscriber, I want to unsubscribe from the digest from the email itself so that I can stop receiving email without opening the app | P0 |

See the detailed user stories document for full acceptance criteria.

## Scope

### In Scope

- Daily email digest delivery at 7:30 AM user local time via Resend API
- TF-IDF–based topic-matching algorithm to select 3–5 items per digest
- In-app opt-in flow (home screen card + settings toggle) with email confirmation
- Structured text email template (React Email) with article title, source, topic tag, read time
- Cadence setting: daily (default) or 3x/week (Monday, Wednesday, Friday)
- One-click unsubscribe from email footer
- Analytics event instrumentation: opt-in, email sent, email opened, item clicked, unsubscribe
- A/B experiment infrastructure: feature flag, 50/50 split, variant assignment

### Out of Scope

- In-app resurfacing (notification card on home screen) . deferred to post-experiment
- Push notifications . too aggressive for first version
- Smart collections / auto-categorization . addresses a different opportunity (library overwhelm), not the trigger gap
- Annotation-based resurfacing . requires highlighting, which most Brainshelf users do not do
- Custom send time . the default is 7:30 AM local; custom time selection is a future iteration

### Future Considerations

- Custom send time selection . if user feedback indicates 7:30 AM is not optimal for a meaningful segment, add a time picker in settings; deferred because the extra UI complexity is not justified until we know the feature works
- In-app resurfacing card . if the email digest validates the resurfacing hypothesis, an in-app card can extend the trigger to users who do not opt in to email; deferred to avoid splitting engineering effort across two surfaces before validating either
- Embedding-based topic matching . the spike showed embeddings achieve ~84% relevance [fictional] vs. ~72% for TF-IDF [fictional]; migration to embeddings is planned if the feature ships and the precision gap becomes the binding constraint

## Solution Design

### Functional Requirements

#### Email Delivery

- FR-1: The system shall send a digest email to each opted-in user at 7:30 AM in their stored timezone
- FR-2: Each digest shall contain 3–5 saved items selected by the topic-matching algorithm; if fewer than 3 items pass the minimum relevance threshold, the digest shall contain only the qualifying items (minimum 1)
- FR-3: If zero items pass the relevance threshold, no digest shall be sent for that day; the system shall not send empty or low-relevance digests
- FR-4: The system shall not resurface the same item within a 14-day window; items included in a previous digest are excluded for 14 days from the send date
- FR-5: The system shall use Resend API for email delivery, with SPF, DKIM, and DMARC configured on the brainshelf.app domain

#### Topic Matching

- FR-6: The topic-matching algorithm shall use TF-IDF vectorization with cosine similarity to rank saved items by relevance to the user's recent activity (items saved, clicked, or read in the prior 7 days)
- FR-7: Items shall be ranked by cosine similarity score; the top 5 items above the minimum threshold (0.15 [fictional]) shall be selected for the digest
- FR-8: For saved URLs where text extraction fails (~11% of URLs [fictional]), the system shall use the page's Open Graph title and description as a fallback for vectorization

#### Opt-In Flow

- FR-9: The opt-in prompt shall appear as a card on the Brainshelf home screen for eligible users (active savers with 10+ items) who have not yet opted in or dismissed the prompt
- FR-10: The opt-in flow shall require the user to confirm their email address and tap "Enable Digest" . two interactions maximum
- FR-11: Users who dismiss the prompt shall not see it again for 14 days; after 14 days the prompt may reappear once
- FR-12: Opt-in state shall be stored as a user preference and accessible from the Settings screen

#### Cadence and Preferences

- FR-13: The default delivery cadence shall be daily; users may switch to 3x/week (Monday, Wednesday, Friday) from the email footer or the Settings screen
- FR-14: Users shall be able to unsubscribe from the digest via a one-click unsubscribe link in the email footer (compliant with CAN-SPAM and GDPR requirements)

### User Experience

The email template follows the structured text layout selected in the design rationale (Option B). Each item displays: article title (hyperlinked to the saved URL), source domain, topic tag, and estimated read time. Items are separated by horizontal rules. The email header reads "Your morning reads" with a single-line subheading: "3 things worth your time from your Brainshelf library." The footer contains the cadence setting link, the unsubscribe link, and the Brainshelf wordmark. See Figma . Resurface Email v1 / Option B for the approved design.

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| User has fewer than 10 saved items | Opt-in prompt is not shown; user is not eligible for the digest until they reach 10 items |
| All items in the user's library have been resurfaced within the 14-day exclusion window | No digest is sent for that day; the user receives no email rather than repeated content |
| User changes timezone in device settings | Timezone is updated on next app open; digest delivery shifts to the new timezone the following day |
| Saved URL returns a 404 when the user clicks from the email | The link opens in the browser and shows the site's 404 page; Brainshelf does not intercept broken links in this version |
| Resend API is down during the scheduled send window | The send job retries 3 times with exponential backoff (1 min, 5 min, 15 min); if all retries fail, the digest is skipped for that day and an alert is sent to the on-call engineer |

## Technical Considerations

### Constraints

- Backend team is 2 engineers (Alex R., Jess T.); Sprint 8 must deliver the complete digest pipeline, opt-in flow backend, and topic-matching algorithm within 10 business days
- No existing email infrastructure; DNS configuration (SPF, DKIM, DMARC) must be completed before any email can be sent from the brainshelf.app domain
- TF-IDF vectors must be pre-computed for all existing saved items (~460K items across 9,800 eligible users [fictional]) in a batch migration before the A/B test begins

### Integration Points

- Resend API: email sending, delivery/open/click webhooks
- Cheerio: server-side HTML parsing for article text extraction
- Amplitude: experiment event tracking (opt-in, email_sent, email_opened, item_clicked, unsubscribe)
- PostgreSQL: TF-IDF vector storage (JSONB), opt-in preferences, digest send log, 14-day exclusion tracking

### Data Requirements

User email addresses are already stored in the Brainshelf user table (required for account creation). No additional PII collection is needed. The opt-in flow confirms the existing email address rather than collecting a new one. Email delivery logs (send time, click events, unsubscribe events) will be stored in a new `digest_events` table with a 90-day retention policy. TF-IDF vectors are derived data and can be recomputed from source URLs if needed.

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|------------|-------|--------|-------------------|
| Resend account setup + DNS configuration | Alex R. | Not started | Blocks all email sending; must be completed in Sprint 8 week 1 |
| TF-IDF batch migration for existing saved items | Alex R. | Not started | Blocks digest generation for existing users; can run in parallel with other Sprint 8 work |
| Amplitude experiment SDK integration | Chloe B. | In progress | Blocks A/B test variant assignment; Chloe is integrating during Sprint 7 |
| React Email template implementation | Sam W. | Not started | Blocks email rendering; depends on Dan K.'s approved design (complete) |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Opt-in rate below 10% [fictional] . experiment underpowered | Medium | High | Monitor daily in week 1 of enrollment; if below 5% at day 7, revise opt-in prompt copy and extend enrollment window |
| Digest emails classified as promotions by Gmail | Medium | High | Text-only layout, proper DNS config, seed list testing in week 1; monitor inbox placement via Resend dashboard |
| Timezone handling error . wrong delivery time | Low | Medium | Store timezone at opt-in; validate against device locale; integration tests for DST transitions |
| Text extraction fails for >15% of URLs | Low | Medium | OG title/description fallback; exclude items with no extractable text from the digest pool |

## Timeline & Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Sprint 8 start | Engineering begins Resurface build | Feb 3, 2026 |
| DNS + Resend integration complete | Email can be sent from brainshelf.app | Feb 7, 2026 |
| Topic matching + email template complete | End-to-end digest generation working in staging | Feb 14, 2026 |
| Sprint 8 ship | Resurface deployed to production behind feature flag | Feb 16, 2026 |
| Setup week | Opt-in enrollment begins; A/B experiment configured in Amplitude | Mar 2–8, 2026 |
| A/B test start | Feature flag enabled for treatment group; first digests sent | Mar 9, 2026 |
| A/B test end | 4-week test window closes | Apr 5, 2026 |
| Analysis + decision | Experiment results analyzed; ship/iterate/kill decision | Apr 6–11, 2026 |

## Open Questions

- [ ] What opt-in rate should trigger the "extend enrollment window" contingency? Current threshold is 5% at day 7 . is this too conservative? . Owner: Priya M.
- [ ] Should the digest exclude items the user saved with "reference" intent (if intent tagging is built later), or should all saved items be eligible regardless of save intent? . Owner: Priya M.
- [ ] How should the 14-day exclusion window interact with users who have very small libraries (<20 items)? Should the window be shortened for small libraries to avoid running out of content? . Owner: Alex R.

## Appendix

### Related Documents

- Problem Statement . Saved Content Re-Engagement Gap (Define phase)
- Hypothesis . Resurface Morning Digest (Define phase)
- JTBD Canvas . Rediscover Saved Content Worth My Time (Define phase)
- Opportunity Tree . Increase 7-Day Return Rate (Define phase)
- ADR-007 . Use Resend as Email Sending Provider (Develop phase)
- Design Rationale . Digest Email Layout (Develop phase)
- Solution Brief . Resurface Morning Email Digest (Develop phase)
- Spike Summary . Topic-Matching Algorithm (Develop phase)

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 1, 2026 | Priya M. | Initial draft |
| 1.1 | Feb 2, 2026 | Alex R. | Added technical considerations and integration points |
