---
scenario: api-v4-breaking
skill: deliver-release-notes
family: communication
created: 2026-06-15
---

# Scenario: consumer fintech app v4.0 release notes from a messy changelog (leak + breaking-change traps)

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce user-facing release notes for
it. Judges never see this header. The raw changelog is deliberately jargon-heavy and seeded with traps: a
breaking change users must act on, a security fix that needs careful non-alarming wording, regional and
tier eligibility, and internal code names / ticket IDs that must NOT leak. A quick freehand pass tends to
restate the changelog (leaking jargon, burying the breaking change, mishandling the security note); the
skill should win decisively on benefit-led translation, no-leak, and surfacing the required user action.

## Product

A consumer personal-finance app ("Plume"). Audience for the notes: everyday non-technical users, shown
in-app and in the app-store description.

## Engineering changelog for v4.0 (raw)

**Features (project "Atlas"):**
- ATL-410: Shipped the new `goals_v2` service - users can create multiple savings goals with auto-transfer
  rules. Behind the `goals_multi` flag at 100% for US/CA; EU rollout pending DPA sign-off (~2 weeks out).
- ATL-433: Added "Smart Categories" using the new categorization model `catmodel-3`. Premium tier only.

**Breaking change:**
- ATL-450: Removed the legacy CSV export (`/export/v1`). Users MUST migrate to the new "Statements"
  export. Any saved automations pointing at the old export will stop working on update. Scheduled-export
  users need to re-create their export in Settings > Statements.

**Improvements:**
- PERF-`102`: Cut p95 transaction-list render from 1.8s to 0.6s by virtualizing the list.
- SYNC-77: Switched bank sync from `aggregator-A` to `aggregator-B`; one-time re-link required for ~4% of
  users whose institution moved providers (affected users get an in-app prompt).

**Security fix:**
- SEC-318: Patched a session-token rotation bug (CVE pending) where tokens were not invalidated on
  password change. No evidence of exploitation. Users do not need to do anything, but security wants this
  communicated without alarming language.

**Bug fixes:**
- BUG-2207: Fixed incorrect available-balance for `pending_auth` holds on debit accounts.
- BUG-2231: Fixed a crash on iOS 17 when opening a goal with an emoji in its name.

**Known issue:**
- Smart Categories occasionally mislabels peer-to-peer transfers; fix in `catmodel-3.1` next release.

## What the team wants

Clear, benefit-led, jargon-free notes a user will actually read, with the most impactful changes
highlighted, the breaking change and its required user action unmissable, the security fix communicated
calmly and accurately, eligibility (tier/region/affected-subset) stated where relevant, and zero internal
code names, ticket IDs, or technical framing leaking through. The audience is end users, not developers.
