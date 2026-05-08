---
title: "Deliver Launch Checklist: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface feature launch checklist for Sprint 8 ship."
artifact: launch-checklist
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface feature launch checklist for Sprint 8 ship
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

As Sprint 8 approached its final days, Priya M. created the Resurface launch checklist to coordinate the ship across engineering, design, growth, and data. The checklist was especially important because this was Brainshelf's first email feature . DNS configuration, deliverability validation, and email compliance were all new operational territory for the team. The checklist was reviewed at the T-2 go/no-go meeting on February 12, 2026, and all blockers were cleared by February 14.

**Source Notes:**

- Atul Gawande, "The Checklist Manifesto" (atulgawande.com/book/the-checklist-manifesto/) . the checklist methodology applied in this document; Gawande's research on the effectiveness of pre-launch checklists in reducing errors in complex, multi-stakeholder processes directly motivated the structured format.
- Intercom, "Shipping Is Your Company's Heartbeat" (intercom.com/blog/shipping-is-your-companys-heartbeat/) . the product launch philosophy that informed the checklist's scope; Intercom's guidance on coordinating cross-functional readiness (engineering, design, marketing, support) rather than treating launch as an engineering-only event shaped the section structure.
- M3AAWG, "Best Practices for Senders" (m3aawg.org/published-documents) . the email deliverability best practices referenced in the Legal & Compliance and Operations sections; the SPF/DKIM/DMARC configuration requirements and sender reputation guidelines are drawn from M3AAWG's sender guidelines.

---

## Prompt

```
/launch-checklist

resurface launch checklist. shipping at end of sprint 8 (feb 14-16).
this is our first email feature so dns, deliverability, and compliance
are all new for us. need the full checklist.

key stakeholders: priya (pm/launch owner), alex (eng), jess (eng),
dan (design), sam (frontend), chloe (data), jordan (growth),
marco (ceo, go/no-go).

go/no-go meeting: feb 12. launch window: feb 14-16 behind feature flag.
opt-in enrollment starts mar 2. a/b test starts mar 9.
```

---

## Output

# Launch Checklist: Resurface . Morning Email Digest

## Launch Overview

| Field | Value |
|-------|-------|
| What | Resurface: daily email digest surfacing 3–5 saved items matched to recent reading interests |
| Launch Date | February 14–16, 2026 (behind feature flag) |
| Launch Type | Major Feature (Brainshelf's first email feature) |
| Launch Owner | Priya M. |
| Go/No-Go Decision Maker | Marco S. (CEO) |

### Key Stakeholders

| Role | Name | Contact |
|------|------|---------|
| Product | Priya M. | #resurface Slack channel |
| Engineering (Backend) | Alex R. | #resurface Slack channel |
| Engineering (Backend) | Jess T. | #resurface Slack channel |
| Design | Dan K. | #resurface Slack channel |
| Frontend | Sam W. | #resurface Slack channel |
| Data / Analytics | Chloe B. | #resurface Slack channel |
| Growth | Jordan L. | #resurface Slack channel |

## Engineering Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Resend account created and API key stored in secrets manager | Alex R. | Feb 4 | | Developer plan ($20/mo) [fictional] |
| [ ] DNS records configured: SPF, DKIM, DMARC for brainshelf.app | Jess T. | Feb 5 | | Verify propagation with MXToolbox before proceeding |
| [ ] TF-IDF topic-matching algorithm implemented in TypeScript | Alex R. | Feb 7 | | Port from Python spike prototype |
| [ ] Text extraction pipeline (Cheerio + OG fallback) complete | Jess T. | Feb 7 | | ~11% URL failure rate expected [fictional] |
| [ ] Cron-based digest send pipeline implemented with timezone support | Alex R. | Feb 10 | | IANA timezone database; test DST transitions |
| [ ] TF-IDF batch migration for existing saved items complete | Alex R. | Feb 12 | | ~460K items across 9,800 users [fictional] |
| [ ] Opt-in flow backend (preferences API, dismiss logic) complete | Jess T. | Feb 10 | | |
| [ ] Click redirect endpoint (`/r/{digest_id}/{item_id}`) implemented | Jess T. | Feb 10 | | Must respond in <200ms [fictional] |
| [ ] Feature flag configured in Amplitude (resurface_enabled) | Chloe B. | Feb 12 | | 50/50 split for A/B test |
| [ ] Code review approved for all Resurface PRs | Alex R. | Feb 13 | | |

## QA & Testing

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Unit tests for TF-IDF scoring and item selection logic | Alex R. | Feb 10 | | Cover: threshold filtering, 14-day exclusion, empty centroid fallback |
| [ ] Integration tests for digest send pipeline (end-to-end) | Jess T. | Feb 12 | | Include timezone edge cases: UTC+5:30, UTC+12, DST transition |
| [ ] Integration tests for Resend API (send, webhook receipt) | Jess T. | Feb 12 | | Use Resend test mode; verify delivered/bounced/clicked webhook payloads |
| [ ] Email rendering tested across Gmail, Apple Mail, Outlook, Yahoo | Sam W. | Feb 13 | | Use Litmus or Email on Acid for cross-client validation |
| [ ] Mobile email rendering tested (iOS Mail, Gmail app, Android) | Sam W. | Feb 13 | | Text-only layout; primary concern is link tap target size |
| [ ] Opt-in flow tested (home screen card + settings toggle) | Sam W. | Feb 12 | | Test: show/dismiss/re-show after 14 days, settings toggle sync |
| [ ] Edge case test plan executed (from edge cases document) | Jess T. | Feb 13 | | All P1 scenarios must pass; P2 should pass |
| [ ] Load test: simulate 1,000 concurrent digest sends [fictional] | Alex R. | Feb 12 | | Verify Resend rate limit handling (10 req/s) [fictional] |

## Design & UX

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Digest email template (React Email) approved by Dan K. | Dan K. | Feb 10 | | Option B: structured text with metadata |
| [ ] Opt-in card design approved and implemented | Dan K. | Feb 7 | | Home screen card + settings toggle |
| [ ] Unsubscribe confirmation page designed | Dan K. | Feb 10 | | Simple branded page with re-enable link |
| [ ] Cadence change confirmation page designed | Dan K. | Feb 10 | | Two variants: daily and 3x/week copy |
| [ ] Error state copy finalized (bounce notification, opt-in errors) | Dan K. | Feb 12 | | See edge cases document for full copy |
| [ ] Dark mode email rendering verified | Sam W. | Feb 13 | | Text-only layout; verify link color contrast |

## Marketing & Communications

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Opt-in prompt copy finalized ("Get your best saves delivered every morning") | Jordan L. | Feb 7 | | A/B test the opt-in copy is out of scope for v1; use the approved copy |
| [ ] In-app changelog entry drafted for Resurface | Jordan L. | Feb 12 | | Published when feature flag is enabled for treatment group |
| [ ] Twitter/X announcement drafted | Jordan L. | Mar 9 | | Tied to A/B test start, not code ship |
| [ ] App store listing updated (if digest is mentioned) | Jordan L. | Mar 9 | | Deferred to A/B test start |

## Customer Support

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] FAQ drafted: "What is the Resurface digest?" | Priya M. | Feb 12 | | Cover: what it is, how to opt in, how to change cadence, how to unsubscribe |
| [ ] Support team briefed on Resurface feature | Priya M. | Feb 13 | | 15-minute walkthrough for the 2-person support team |
| [ ] Canned responses prepared for common digest questions | Priya M. | Feb 13 | | "I'm not receiving my digest" / "How do I change the time?" / "How do I unsubscribe?" |
| [ ] Escalation path defined (support → Priya → Alex for technical issues) | Priya M. | Feb 12 | | |

## Legal & Compliance

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Email opt-in flow is explicit (not pre-checked) . CAN-SPAM and GDPR compliant | Priya M. | Feb 7 | | Opt-in requires affirmative user action |
| [ ] List-Unsubscribe and List-Unsubscribe-Post headers included in all digest emails | Jess T. | Feb 10 | | RFC 8058 compliance for one-click unsubscribe |
| [ ] Unsubscribe link present and functional in every digest email footer | Sam W. | Feb 12 | | One-click, no confirmation dialogs |
| [ ] Privacy policy reviewed for email data processing disclosure | Priya M. | Feb 10 | | Confirm existing privacy policy covers transactional email; update if needed |
| [ ] DMARC policy set to at least p=none for initial monitoring | Jess T. | Feb 5 | | Move to p=quarantine after 30 days of clean sending |

## Operations & Infrastructure

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Resend sending domain verified and DNS propagated | Jess T. | Feb 6 | | Verify with MXToolbox; allow 24–48 hours for propagation |
| [ ] Cron job deployed and scheduled in production (disabled until feature flag on) | Alex R. | Feb 14 | | Runs once per minute; processes users whose 7:30 AM local is within the current UTC minute |
| [ ] Resend webhook endpoint deployed and receiving test events | Jess T. | Feb 12 | | Test with Resend's webhook testing tool |
| [ ] On-call rotation confirmed for launch window (Feb 14–16) | Alex R. | Feb 12 | | Alex R. primary, Jess T. secondary |
| [ ] Alerting configured: digest send failure rate >5% [fictional] triggers PagerDuty | Chloe B. | Feb 12 | | Based on Resend webhook delivery events |
| [ ] Seed list test: send 10 test digests to team members across Gmail, Outlook, Apple Mail | Sam W. | Feb 13 | | Verify inbox placement (not promotions tab) |

## Analytics & Monitoring

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Amplitude events instrumented: opt_in, digest_sent, digest_opened, item_clicked, unsubscribe, cadence_changed, digest_skipped | Chloe B. | Feb 12 | | See instrumentation spec |
| [ ] Resurface experiment dashboard created in Amplitude | Chloe B. | Feb 12 | | Primary: CTR; secondary: 7-day return rate; guardrail: unsubscribe rate |
| [ ] Baseline metrics captured before A/B test start | Chloe B. | Mar 2 | | 7-day return rate = 18% [fictional]; capture 2-week pre-test baseline |
| [ ] Logging in place for digest pipeline: send success/failure, retry attempts, skip reasons | Alex R. | Feb 12 | | Structured JSON logs; queryable in Datadog |
| [ ] Daily digest health report (automated): sends attempted, sends succeeded, sends failed, items served | Chloe B. | Feb 14 | | Slack notification to #resurface channel at 10:00 AM UTC |

## Go/No-Go Criteria

### Must Have (Blockers)

- [ ] DNS records (SPF, DKIM, DMARC) verified and propagated
- [ ] Digest send pipeline passes end-to-end integration tests (send → deliver → click → event recorded)
- [ ] All P1 edge case test scenarios pass
- [ ] Email renders correctly in Gmail (web + mobile), Apple Mail, and Outlook
- [ ] Unsubscribe flow works end-to-end (one-click from email → digest disabled → confirmation page)
- [ ] Amplitude experiment events are firing correctly in staging
- [ ] On-call rotation confirmed for launch window

### Should Have

- [ ] Seed list test confirms inbox placement (not promotions tab) for Gmail
- [ ] Load test confirms system handles 1,000 concurrent sends [fictional] without errors
- [ ] Dark mode rendering verified across major clients

### Nice to Have

- [ ] FAQ and canned support responses published before launch
- [ ] Twitter/X announcement copy approved

## Rollback Plan

### Trigger Conditions

- Digest send failure rate exceeds 10% for 2 consecutive hours [fictional]
- Unsubscribe rate exceeds 5% per day [fictional] (2.5x the weekly guardrail)
- User reports of digest emails landing in spam (confirmed by 3+ independent reports)
- Critical bug discovered in the click redirect that prevents users from reaching articles

### Rollback Steps

1. Disable the `resurface_enabled` feature flag in Amplitude (stops all digest sends immediately)
2. Post a message in #resurface Slack channel: "Resurface paused . [reason]. Investigating."
3. If the issue is Resend-related, check Resend status page and open a support ticket
4. If the issue is code-related, identify the failing component and deploy a hotfix or revert the relevant PR
5. Re-enable the feature flag only after the root cause is resolved and the fix is verified in staging

### Rollback Owner

Alex R. . #resurface Slack channel, PagerDuty on-call

### Rollback Time Estimate

Feature flag disable: <1 minute. Hotfix deployment: ~30 minutes [fictional] (PR → review → merge → deploy).

## Check-in Schedule

| Checkpoint | Date | Attendees |
|------------|------|-----------|
| Sprint 8 mid-sprint check | Feb 7, 2026 | Priya, Alex, Jess, Sam, Dan |
| T-2 go/no-go meeting | Feb 12, 2026 | All stakeholders + Marco (CEO) |
| Launch day deploy | Feb 14, 2026 | Alex, Jess (deploying); Priya (monitoring) |
| T+1 launch health review | Feb 17, 2026 | Priya, Alex, Chloe |
| A/B test kickoff | Mar 9, 2026 | All stakeholders |

## Open Issues

| Issue | Owner | Status | Impact |
|-------|-------|--------|--------|
| Amplitude experiment SDK integration not yet complete | Chloe B. | In progress (Sprint 7) | Risk . if delayed, A/B variant assignment must be handled manually |
| Privacy policy may need update for email data processing | Priya M. | Under review | Risk . must be resolved before opt-in enrollment (Mar 2) |
