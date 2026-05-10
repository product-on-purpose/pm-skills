---
title: "Deliver Release Notes: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface feature release notes for users."
artifact: release-notes
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface feature release notes for users
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

When the Resurface feature shipped behind a feature flag on February 16, 2026, Jordan L. drafted the user-facing release notes for the in-app changelog and the Brainshelf blog. The notes were written to explain the feature in plain language, emphasize the user benefit (rediscovering saved content), and set expectations about the opt-in process and email frequency. The notes were published to the in-app changelog when the opt-in enrollment began on March 2, 2026.

**Source Notes:**

- Intercom, "How to Write Release Notes Your Users Will Actually Read" (intercom.com/blog/how-to-write-release-notes-your-users-will-actually-read/) . the release notes writing guidelines applied in this document; Intercom's emphasis on leading with the benefit (not the feature name) and writing in the user's language shaped the tone and structure.
- Stripe, "Stripe Changelog" (stripe.com/docs/changelog) . the changelog format referenced as a model for concise, benefit-first release communication; Stripe's practice of separating highlights from detailed changes informed the document structure.
- Apple, "App Store Connect: Writing Great Release Notes" (developer.apple.com/help/app-store-connect/manage-app-information/write-great-release-notes/) . Apple's guidance on focusing release notes on what users can do now that they couldn't before, not on technical implementation details.

---

## Prompt

```
/release-notes

resurface release notes. feature shipped feb 16 behind flag. opt-in
enrollment starts mar 2. writing for the in-app changelog and blog.

tone: friendly, plain language. not techy. our users are knowledge
workers who save articles . talk to them about reading, not about
algorithms.

highlights: daily email digest with your most relevant saved content,
delivered every morning. opt-in from home screen. one-click to read.
change frequency or unsubscribe anytime.

also: fixed the timezone bug from sprint 8 that sent early-morning
digests to UK/EU users. and improved text extraction for paywalled
articles (better fallback to article metadata).
```

---

## Output

# Brainshelf 2.8.0

**Release Date:** March 2, 2026

## Highlights

### Resurface: Your Morning Reading Digest

You save great content to Brainshelf every week . now Brainshelf brings the best of it back to you. Resurface is a daily morning email that delivers 3 - 5 of your most relevant saved items, matched to what you've been reading recently. It arrives at 7:30 AM your time, ready for your morning coffee or commute. No more guilt pile . just the articles that are actually worth your time, resurfaced when you're ready to read them.

### One-Click Reading, Zero Effort

Every item in the digest links directly to the original article. Tap it, and you're reading . no app to open, no library to browse. If daily is too much, switch to three times a week from the email itself. And if you change your mind, unsubscribe with a single click.

---

## New Features

- **Resurface digest email:** A daily morning email with 3 - 5 saved items matched to your recent reading interests. Delivered at 7:30 AM in your timezone. Enable it from the card on your home screen or from Settings > Notifications.

- **Opt-in flow:** Look for the Resurface card at the top of your home screen. Tap "Enable Digest" and your first email arrives the next morning. We'll never send you email without your explicit permission.

- **Cadence setting:** Choose between daily delivery (the default) or three times per week (Monday, Wednesday, Friday). Change anytime from the email footer or from Settings.

- **One-click unsubscribe:** Every digest email includes an unsubscribe link in the footer. One tap and you're done . no account settings to navigate, no confirmation hoops.

## Improvements

- **Timezone accuracy:** Fixed an issue where digest emails were delivered using UTC instead of the user's local timezone for users in UK and EU timezones. Digests now arrive at 7:30 AM local time for all timezones, including those with half-hour offsets (e.g., IST, ACST).

- **Article text extraction:** Improved the fallback behavior for articles behind paywalls or JavaScript-rendered pages. When full text extraction isn't possible, we now use the article's title and description metadata to match it against your reading interests, so fewer items are excluded from your digest.

## Bug Fixes

- Fixed an issue where the opt-in card could reappear immediately after being dismissed instead of waiting 14 days

- Fixed an issue where the digest item count in the email header ("3 things worth your time") did not update to match the actual number of items when fewer than 3 items qualified

## Known Issues

- The digest does not yet check whether a saved URL is still live before including it. If a website takes down an article after you saved it, the link in your digest will lead to the site's error page. We're working on URL health checking for a future update.

---

## Coming Soon

We're exploring ways to bring resurfacing into the Brainshelf app itself . not just email . so you can rediscover saved content wherever you prefer. We're also looking at smarter ways to organize your library so the guilt pile feels a little less guilty. Stay tuned.

---

## Feedback

Have thoughts on Resurface? We'd love to hear from you. Tap "Send Feedback" in Settings or email us at feedback@brainshelf.app.
