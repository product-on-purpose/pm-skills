<!-- Anchor artifact: deliver-release-notes (communication) | scenario mobile-v3 | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This was the draft all three blind judges scored (anchor run wf_c1261234-93a). The scored original is preserved in git at the 2026-06-15 anchor commit; an operating layer (decisions / owners / maintainer fix-notes) was added 2026-06-15 per maintainer review. -->

---
artifact: release-notes
version: "1.0"
created: 2026-06-15
status: draft
---

# MoneyMap 3.2

**Release Date:** June 15, 2026

## Highlights

### Budget Together with Shared Spaces

You can now invite a partner, roommate, or family member to manage a budget together. Shared Spaces let multiple people add transactions, set limits, and track spending in real time - so everyone stays on the same page without the spreadsheet back-and-forth.

### See Where Your Money Actually Goes

The new Insights tab shows you how your spending in each category compares to last month. Spot patterns, catch surprises, and make better decisions with a clear month-over-month view - no manual math required.

---

## New Features

- **Shared Spaces:** Invite others to co-manage a budget with you. Everyone can add transactions and see balances, making it easy to split household finances or plan shared expenses together. *To start, open the new Spaces tab and send an invite; the people you invite will need the MoneyMap app to join.*

- **Insights Tab:** A new tab shows your spending by category and highlights how this month compares to last. See at a glance where you spent more and where you cut back. *Your first month-over-month comparison appears once you have about a month of activity.*

- **Biometric Unlock:** Open MoneyMap faster and more securely using Face ID or Touch ID instead of a PIN. *Turn it on in Settings > Security. This is rolling out gradually, so it may appear over the coming days.*

## Improvements

- **Faster App Launch:** MoneyMap opens roughly 40% faster than before, so you spend less time waiting and more time on top of your finances.

- **Smoother Charts:** Spending charts and graphs now animate and scroll more fluidly throughout the app.

- **More Reliable Account Sync:** If your bank's connection has a brief hiccup, MoneyMap now retries automatically instead of showing a sync failure. Your balances stay up to date without any extra taps from you.

## Bug Fixes

- Fixed a crash on Android 14 that occurred when opening a transaction that included an emoji in the note field.

- Fixed an issue where the same transaction appeared twice when two devices synced at the same time.

- Fixed an issue where the wrong currency symbol displayed for accounts in British pounds when the device was set to a US locale.

## Known Issues

- Automatic recurring-transaction detection is currently available to about 10% of users while we finish testing. It will be enabled for everyone in the next update.

---

## Coming Soon

We're working on bringing recurring-transaction detection to all users, along with more ways to customize your Insights view. Stay tuned for more updates.

---

## Feedback

Have thoughts on this release? Tap the feedback button in Settings or reach out through the Help section in the app.

---

## Decisions, Owners & Open Items (INTERNAL - not published to users)

> Operating layer (added 2026-06-15, maintainer review). Release notes are user-facing, so this block is
> the internal sign-off layer for the comms decisions behind the notes above; it is not part of the
> published text. The precision the maintainer asked for (rollout caveats, eligibility, version specifics,
> user-action) is applied inline above as italic notes; the open items that need confirmation before
> publish are tracked here. Owners/dates illustrative.

| ID | Title | Final decision (summary) | Status | Owner | Due | Last updated |
|----|-------|--------------------------|--------|-------|-----|--------------|
| D-1 | Staged-rollout phrasing for flagged features | Pending - confirm wording for biometric + recurring | OPEN | PM + Comms | Before publish | 2026-06-15 |
| D-2 | Eligibility + platform/version specifics | Pending - confirm min OS + Shared-Spaces invitee requirement | OPEN | PM + Eng | Before publish | 2026-06-15 |
| D-3 | Quantify "40% faster app launch" publicly | DECIDED - keep (benefit-led, sourced to PERF-77) | DECIDED | PM | This release | 2026-06-15 |

### D-1: Staged-rollout phrasing for flagged features
Status: OPEN
**Context** - Biometric Unlock (`secure_unlock` flag) and recurring-transaction detection (`recurring_v2`, ~10%) are not yet on for everyone; users who don't see them will be confused if the notes imply otherwise. Value: avoids "the notes lied" support tickets.
**Potential solutions** - (a) omit flagged features until 100%; (b) include them with an explicit "rolling out gradually / available to some users" caveat. Recommendation: (b) - applied inline above.
**Final decision** - Pending final wording sign-off. Owner: PM + Comms; before publish.

### D-2: Eligibility + platform/version specifics
Status: OPEN
**Context** - The notes should state who can use each feature and what's required (e.g., min iOS/Android for Face ID/Touch ID; whether Shared-Spaces invitees need an account, not just the app). The changelog only confirms Android 14 for one bug; the rest needs eng confirmation. Value: accuracy; no over-promising.
**Potential solutions** - (a) ship generic copy; (b) confirm the specifics with eng and state them. Recommendation: (b).
**Final decision** - Pending eng confirmation of min-OS + invitee requirements. Owner: PM + Eng; before publish.

### D-3: Quantify the "40% faster" claim publicly
Status: DECIDED
**Context** - PERF-77 measured a ~40% cold-start reduction. Publishing a number is concrete and benefit-led but invites scrutiny.
**Potential solutions** - (a) keep "40% faster"; (b) soften to "noticeably faster." Recommendation: (a) - it is sourced and user-visible.
**Final decision** - Keep "roughly 40% faster." Owner: PM.
