---
scenario: mobile-v3
skill: deliver-release-notes
family: communication
created: 2026-06-14
---

# Scenario: mobile app v3.2 release notes from an engineering changelog

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce user-facing release notes for
it. Judges never see this header. The input is the RAW engineering changelog (jargon, ticket IDs, and
code names on purpose); the skill's job is to translate it for users.

## Product

A consumer personal-finance mobile app ("MoneyMap"). The audience for the release notes is everyday
users (non-technical), shown in-app and in the app-store update description.

## Engineering changelog for v3.2 (raw)

**Features (project "Lighthouse"):**
- LH-204: Implemented shared budgets ("Spaces") so multiple users can co-manage a budget. Backend
  multi-tenant ACL added.
- LH-231: Added biometric unlock (FaceID/TouchID) gated behind the `secure_unlock` feature flag.
- LH-240: New "Insights" tab surfacing month-over-month category spend deltas via the new
  aggregation service.

**Improvements:**
- PERF-77: Reduced cold-start time ~40% by lazy-loading the transactions module.
- LH-256: Migrated charts from the deprecated `ChartKitV1` to `ChartKitV2`; smoother rendering.
- ACCT-12: Account-sync now retries on transient bank-API 5xx errors instead of failing silently.

**Bug fixes:**
- BUG-1187: Fixed a crash on Android 14 when opening a transaction with an emoji in the note field.
- BUG-1201: Fixed duplicate-transaction display when two devices synced within the same minute.
- BUG-1190: Fixed incorrect currency symbol for users with a GBP account but a US locale.

**Known issue:**
- Recurring-transaction detection (`recurring_v2`) is still behind a flag for ~10% of users; full
  rollout next release.

## What the team wants

Clear, benefit-led, jargon-free release notes a user will actually read, with the most impactful
changes highlighted. The audience is end users, not developers.
