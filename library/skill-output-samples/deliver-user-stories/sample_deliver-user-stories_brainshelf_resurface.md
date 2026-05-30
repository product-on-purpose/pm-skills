---
title: "Deliver User Stories: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface user stories for Sprint 8."
artifact: user-story
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface user stories for Sprint 8
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After finalizing the Resurface PRD, Priya M. wrote the Sprint 8 user stories with full acceptance criteria for the engineering team. The story set covers the five P0/P1 capabilities: digest delivery, opt-in flow, one-click read, cadence setting, and unsubscribe. Each story uses Given/When/Then acceptance criteria to make QA validation unambiguous. Priya presented the stories in the Sprint 8 planning meeting on February 3, 2026, and the team estimated the full set at 34 story points [fictional].

**Source Notes:**

- Mike Cohn, "User Stories Applied: For Agile Software Development" (mountaingoatsoftware.com) . the user story format (As a / I want / So that) and the acceptance criteria structure (Given/When/Then) used throughout this document; Cohn's guidance on writing stories that are independent, negotiable, valuable, estimable, small, and testable (INVEST) shaped the story decomposition.
- Dan North, "Introducing BDD" (dannorth.net/introducing-bdd/) . the Behavior-Driven Development methodology that informed the Given/When/Then acceptance criteria format; North's framework ensures that each criterion describes a specific observable behavior rather than an implementation detail.
- Jeff Patton, "User Story Mapping" (jpattonassociates.com/user-story-mapping/) . the story mapping approach used to sequence stories by user journey (opt-in → receive digest → click item → manage preferences → unsubscribe) and ensure the Sprint 8 scope covers the complete end-to-end flow.

---

## Prompt

```
deliver-user-stories

resurface stories for sprint 8. need the full set with acceptance
criteria.

stories:
1. receive daily digest (P0) . the core email delivery
2. opt in to digest (P0) . home screen card + settings toggle
3. click item to read (P0) . one-click from email to article
4. change cadence (P1) . daily vs 3x/week
5. unsubscribe from digest (P0) . one-click from email footer

keep them tight. alex and jess need to estimate on monday.
```

---

## Output

# User Story: Receive Daily Resurface Digest

## Story Header

| Field | Value |
|-------|-------|
| ID | US-001 |
| Title | Receive daily Resurface digest |
| Persona | Active saver (10+ items, active in last 30 days) |
| Priority | P0 |
| Epic/Feature | Resurface |
| Estimate | 13 pts [fictional] |

## User Story Statement

**As a** Brainshelf user who has opted in to the Resurface digest,

**I want** to receive a daily email at 7:30 AM my local time with 3 - 5 saved items matched to my recent reading interests,

**so that** I have an external prompt to return to my saved content and actually read something I saved.

## Context & Background

The Resurface digest is the core deliverable of the Resurface feature. It addresses the re-engagement trigger gap identified in the January 2026 user interviews: users have no external prompt to return to their saved content, so re-engagement depends entirely on self-motivation, which fails at scale. The digest creates a daily external trigger by delivering relevant saved items to the user's inbox at a time when they are likely to have reading availability (morning). The topic-matching algorithm (TF-IDF, cosine similarity) selects items based on the user's recent activity . items saved, clicked, or read in the prior 7 days . and excludes items that appeared in a previous digest within the last 14 days. See the Resurface PRD for the full feature specification.

## Acceptance Criteria

### AC-1: Digest Delivered at Correct Local Time

**Given** a user has opted in to the Resurface digest and has a stored timezone of America/New_York (UTC−5)

**When** the cron job runs at 12:30 UTC (which is 7:30 AM ET)

**Then** the user receives a digest email delivered via Resend within 5 minutes of the scheduled time

### AC-2: Digest Contains 3 - 5 Relevant Items

**Given** a user has 50+ saved items and has read 3 articles about "product management" in the past 7 days

**When** the topic-matching algorithm runs for that user

**Then** the digest contains 3 - 5 items with the highest cosine similarity to the user's recent reading centroid, all above the minimum relevance threshold of 0.15 [fictional]

### AC-3: Fewer Than 3 Items Above Threshold

**Given** a user has 15 saved items and only 2 items score above the 0.15 relevance threshold [fictional]

**When** the digest is generated

**Then** the digest contains only the 2 qualifying items (not padded with low-relevance content)

### AC-4: Zero Items Above Threshold

**Given** a user has 10 saved items and none score above the 0.15 relevance threshold [fictional] (e.g., user has had no recent reading activity)

**When** the digest generation runs

**Then** no email is sent for that day; the system logs a "digest_skipped" event with reason "no qualifying items"

### AC-5: 14-Day Exclusion Window

**Given** a saved item appeared in the user's digest on March 10, 2026

**When** the digest is generated on March 20, 2026 (10 days later)

**Then** that item is excluded from the candidate pool; it becomes eligible again on March 25 (14 days after last inclusion)

## Design Notes

- Email template: structured text layout (Option B from design rationale) . article title (linked), source domain, topic tag, estimated read time per item
- Header: "Your morning reads" with subheading "3 things worth your time from your Brainshelf library" (adjust number to match actual item count)
- Footer: cadence setting link, unsubscribe link, Brainshelf wordmark
- See Figma . Resurface Email v1 / Option B for approved design

## Technical Notes

- Cron job resolves each user's timezone and dispatches at 7:30 AM local; implementation must handle DST transitions correctly (use IANA timezone database, not fixed UTC offsets)
- TF-IDF vectors are pre-computed and stored in PostgreSQL (JSONB); the cron job reads vectors at send time, not recomputing on the fly
- Resend API rate limit: 10 requests/second on Developer plan [fictional]; batch sends must be throttled accordingly
- Webhook events (delivered, opened, clicked) are consumed by the analytics pipeline and stored in the `digest_events` table

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Resend account + DNS configuration (ADR-007) | Infrastructure | Not started . Sprint 8 week 1 |
| TF-IDF batch migration for existing saved items | Data | Not started . Sprint 8 week 2 |
| Amplitude experiment SDK (variant assignment) | API | In progress (Chloe B., Sprint 7) |

## Out of Scope

- Custom send time selection (future iteration)
- In-app resurfacing card (post-experiment)
- Embedding-based topic matching (post-experiment upgrade)

## Open Questions

- [ ] Should the digest header item count ("3 things") be dynamic (reflecting actual item count) or fixed at "a few things"?
- [ ] If the cron job for a specific user fails (Resend timeout), should it retry later in the day or skip to the next day?

---

# User Story: Opt In to Resurface Digest

## Story Header

| Field | Value |
|-------|-------|
| ID | US-002 |
| Title | Opt in to Resurface digest |
| Persona | Active saver (10+ items, active in last 30 days) |
| Priority | P0 |
| Epic/Feature | Resurface |
| Estimate | 8 pts [fictional] |

## User Story Statement

**As a** Brainshelf user with 10 or more saved items,

**I want** to opt in to the Resurface email digest from my home screen,

**so that** I can start receiving daily emails with my most relevant saved content.

## Context & Background

The opt-in flow is the entry point to the Resurface experience. Because Brainshelf has never sent email before, the opt-in must be explicit (not pre-checked) to comply with email consent requirements and to establish trust with users who have no expectation of receiving email from the product. The flow must be low-friction (two taps maximum) to maximize the opt-in rate, which is a diagnostic metric . the A/B experiment requires at least 400 opted-in users in the treatment group [fictional] to reach statistical significance within the 4-week test window.

## Acceptance Criteria

### AC-1: Opt-In Card Shown to Eligible Users

**Given** a user has saved 10 or more items and has been active within the past 30 days and has not previously opted in or dismissed the prompt

**When** the user opens the Brainshelf home screen

**Then** a Resurface opt-in card is displayed at the top of the home screen with the copy "Get your best saves delivered every morning" and an "Enable Digest" button

### AC-2: Opt-In Confirmation

**Given** the opt-in card is displayed and the user's account email is priya@example.com

**When** the user taps "Enable Digest"

**Then** the system stores the user's opt-in preference (digest_enabled = true), records the user's timezone from their device settings, displays a confirmation message ("You're in! Your first digest arrives tomorrow at 7:30 AM"), and logs an "opt_in" event to Amplitude

### AC-3: Dismiss and Re-Show Logic

**Given** the opt-in card is displayed

**When** the user taps the dismiss ("X") button

**Then** the card is hidden and does not reappear for 14 days; after 14 days the card may appear once more; if dismissed a second time, the card is permanently hidden (the user can still enable the digest from Settings)

### AC-4: Settings Toggle

**Given** a user navigates to Settings > Notifications

**When** the user toggles "Resurface Digest" on

**Then** the system stores the opt-in preference and timezone, identical to the home screen opt-in flow, and displays the same confirmation message

## Design Notes

- Opt-in card: single card at the top of the home screen feed; includes one-line value proposition, "Enable Digest" button, and dismiss "X"
- Settings toggle: standard toggle in Settings > Notifications section
- See Figma . Resurface Opt-In Flow v1 for approved design

## Technical Notes

- Timezone is captured from the device's `Intl.DateTimeFormat().resolvedOptions().timeZone` (IANA format, e.g., "America/New_York")
- Opt-in state is stored in the `user_preferences` table: `digest_enabled` (boolean), `digest_timezone` (string), `digest_opted_in_at` (timestamp)
- The opt-in card visibility logic checks: `saved_items_count >= 10 AND last_active_date >= NOW() - 30 days AND digest_enabled = false AND dismiss_count < 2 AND (last_dismiss_date IS NULL OR last_dismiss_date <= NOW() - 14 days)`

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-001 (digest delivery) | Story | Parallel . can be built independently |
| Resend account setup | Infrastructure | Not started |

## Out of Scope

- Email address change flow (if user wants to receive digest at a different email than their account email)
- Opt-in prompt in the browser extension (only in the main app for v1)

## Open Questions

- [ ] Should the opt-in card show the user's email address ("We'll send to priya@example.com") for confirmation, or is that unnecessary friction?

---

# User Story: Click Digest Item to Read

## Story Header

| Field | Value |
|-------|-------|
| ID | US-003 |
| Title | Click digest item to read |
| Persona | Digest subscriber |
| Priority | P0 |
| Epic/Feature | Resurface |
| Estimate | 3 pts [fictional] |

## User Story Statement

**As a** Resurface digest subscriber,

**I want** to click an item in the email and go directly to the article,

**so that** I can start reading immediately without navigating through the Brainshelf app.

## Context & Background

One-click read is the core interaction of the Resurface digest. The email's value proposition depends on the path from "see item in email" to "reading the article" being a single click with no intermediate steps. The click must also record an analytics event ("item_clicked") so the experiment can measure digest-driven re-engagement. The click URL is a redirect through Brainshelf's tracking endpoint that records the event and then forwards to the original saved URL.

## Acceptance Criteria

### AC-1: One-Click to Article

**Given** a digest subscriber receives an email containing an item titled "Why Product Managers Should Think in Systems" linking to https://example.com/article-123

**When** the user clicks the article title in the email

**Then** the user's browser opens https://example.com/article-123 (the original saved URL) within 2 seconds

### AC-2: Click Event Recorded

**Given** a digest subscriber clicks an item in the email

**When** the click redirect passes through the Brainshelf tracking endpoint

**Then** an "item_clicked" event is recorded in Amplitude with properties: user_id, item_id, digest_date, item_position (1 - 5), and the event is stored in the `digest_events` table

### AC-3: Multiple Clicks on Same Item

**Given** a subscriber clicks the same item twice in the same email

**When** the second click reaches the tracking endpoint

**Then** the second click is recorded as a separate event (not deduplicated); the user is redirected to the article as normal

## Design Notes

- Article title is the clickable element; the entire title text is a hyperlink
- Source domain, topic tag, and read time are display-only (not clickable)

## Technical Notes

- Click URL format: `https://brainshelf.app/r/{digest_id}/{item_id}` . the `/r/` endpoint logs the event and issues a 302 redirect to the original saved URL
- The redirect must be fast (<200ms server-side processing [fictional]) to avoid a perceptible delay between clicking and arriving at the article

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-001 (digest delivery) | Story | Must be complete . click URLs are embedded in the digest email |
| Amplitude event tracking | API | In progress (Chloe B.) |

## Out of Scope

- "Mark as read" functionality (marking the item as read in the Brainshelf library after clicking)
- In-app deep link (opening the Brainshelf app instead of the browser)

## Open Questions

- [ ] If the original saved URL is behind a paywall, should the email indicate this? (Out of scope for v1, but worth noting for future consideration)

---

# User Story: Change Digest Cadence

## Story Header

| Field | Value |
|-------|-------|
| ID | US-004 |
| Title | Change digest delivery cadence |
| Persona | Digest subscriber |
| Priority | P1 |
| Epic/Feature | Resurface |
| Estimate | 5 pts [fictional] |

## User Story Statement

**As a** Resurface digest subscriber,

**I want** to change my delivery frequency from daily to three times per week (or back),

**so that** I can control how much email I receive from Brainshelf without fully unsubscribing.

## Context & Background

The cadence setting is a retention mechanism for the digest itself. Users who find daily email too frequent should have a path to reduce volume without unsubscribing entirely, which preserves the re-engagement trigger at a lower intensity. The default cadence is daily because the Resurface hypothesis is that daily delivery maximizes habit formation; the 3x/week option exists as a safety valve for inbox-sensitive users.

## Acceptance Criteria

### AC-1: Change Cadence from Email Footer

**Given** a digest subscriber is reading a Resurface email and sees the footer link "Getting too many emails? Switch to 3x/week"

**When** the user clicks the link

**Then** the user's cadence preference is updated to 3x/week (Monday, Wednesday, Friday), a confirmation page is displayed ("Got it . you'll hear from us Monday, Wednesday, and Friday"), and a "cadence_changed" event is logged to Amplitude

### AC-2: Change Cadence from Settings

**Given** a digest subscriber navigates to Settings > Notifications > Resurface Digest

**When** the user selects "3x/week" from the cadence options

**Then** the preference is saved and the next digest is delivered on the next scheduled day (Monday, Wednesday, or Friday)

### AC-3: Revert to Daily

**Given** a subscriber is currently on 3x/week cadence

**When** the subscriber changes to daily cadence (from Settings or from the email footer link "Want daily? Switch back")

**Then** the preference is saved and the next digest is delivered the following morning at 7:30 AM local time

## Design Notes

- Email footer: single text link; changes based on current cadence ("Switch to 3x/week" or "Switch to daily")
- Settings: radio buttons (Daily / 3x per week) under Resurface Digest section

## Technical Notes

- Cadence is stored in `user_preferences.digest_cadence` (enum: "daily" | "3x_week")
- The cron job checks cadence at send time: if cadence is "3x_week" and today is not Monday/Wednesday/Friday, skip

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-001 (digest delivery) | Story | Must be complete . cadence logic is part of the send pipeline |
| US-002 (opt-in flow) | Story | Must be complete . cadence setting is stored alongside opt-in preference |

## Out of Scope

- Weekly cadence option (weekly summary format would require a different email template)
- Custom day selection (e.g., "only on weekdays" or "Tuesday and Thursday")

## Open Questions

- [ ] Should the cadence change take effect immediately (next scheduled day) or at the start of the following week?

---

# User Story: Unsubscribe from Resurface Digest

## Story Header

| Field | Value |
|-------|-------|
| ID | US-005 |
| Title | Unsubscribe from Resurface digest |
| Persona | Digest subscriber |
| Priority | P0 |
| Epic/Feature | Resurface |
| Estimate | 5 pts [fictional] |

## User Story Statement

**As a** Resurface digest subscriber,

**I want** to unsubscribe from the digest directly from the email,

**so that** I can stop receiving email from Brainshelf without opening the app.

## Context & Background

One-click unsubscribe is a P0 requirement for both legal compliance (CAN-SPAM, GDPR) and user trust. The unsubscribe rate is the A/B experiment's guardrail metric (≤2% per week [fictional]); a rising unsubscribe rate signals that the digest is creating negative value rather than positive value. The unsubscribe flow must be frictionless . a single click from the email footer with no confirmation dialogs or "are you sure?" steps.

## Acceptance Criteria

### AC-1: One-Click Unsubscribe from Email

**Given** a digest subscriber is reading a Resurface email

**When** the user clicks the "Unsubscribe" link in the email footer

**Then** the user's digest is immediately disabled (`digest_enabled = false`), a confirmation page is displayed ("You've been unsubscribed. You can re-enable the digest anytime from Brainshelf Settings."), an "unsubscribe" event is logged to Amplitude, and no further digest emails are sent

### AC-2: List-Unsubscribe Header

**Given** a digest email is delivered to the user's inbox

**When** the email client (e.g., Gmail) reads the email headers

**Then** the email includes a `List-Unsubscribe` header with a mailto and HTTPS URL, enabling the email client's native unsubscribe button

### AC-3: Re-Subscribe from Settings

**Given** a user has previously unsubscribed from the digest

**When** the user navigates to Settings > Notifications and toggles "Resurface Digest" on

**Then** the digest is re-enabled with the user's previously stored timezone and cadence preferences; the next digest is delivered the following morning

## Design Notes

- Email footer: "Unsubscribe" text link, visually distinct from the cadence link
- Confirmation page: simple branded page with the unsubscribe confirmation message and a link to Brainshelf Settings

## Technical Notes

- Unsubscribe URL: `https://brainshelf.app/digest/unsubscribe/{user_token}` . token-based URL that does not require login
- The `List-Unsubscribe` header must include both `mailto:` and `https:` options per RFC 8058 for one-click unsubscribe support in Gmail and other major clients
- Unsubscribe events must be processed synchronously . the user must not receive another digest after clicking unsubscribe, even if the next day's cron job has already been scheduled

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| US-001 (digest delivery) | Story | Must be complete . unsubscribe link is embedded in the digest email |
| Resend webhook integration | Infrastructure | Not started . needed to reconcile Resend-side unsubscribes with Brainshelf state |

## Out of Scope

- Unsubscribe reason survey ("Why are you leaving?")
- Pause option ("Pause for 2 weeks" instead of full unsubscribe)

## Open Questions

- [ ] Should Resend's built-in suppression list be the source of truth for unsubscribe state, or should the Brainshelf database be authoritative with Resend synced via webhook?
