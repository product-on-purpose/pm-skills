---
title: "Develop ADR: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - email sending infrastructure decision for the Resurface digest."
artifact: adr
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . email sending infrastructure decision for the Resurface digest
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

When the Resurface feature moved from hypothesis to build planning, the team realized Brainshelf had no transactional email infrastructure . all existing user communication was in-app or via Firebase push notifications. Priya M. asked Alex R. to evaluate email API providers against three criteria: deliverability for daily digests, timezone-aware send scheduling, and total cost within the pre-Series A budget constraint. The team evaluated three providers and recorded the decision as ADR-007 before Sprint 8 began.

**Source Notes:**

- Michael Nygard, "Documenting Architecture Decisions" (cognitydq.com/blog/documenting-architecture-decisions) . the lightweight ADR format used in this document; Nygard's template captures context, decision, and consequences in a single page, making it practical for small teams that need traceability without ceremony.
- Resend, "Email API for Developers" (resend.com/docs) . the email API selected in this ADR; Resend's documentation describes the scheduling, webhook, and React Email integration capabilities referenced in the evaluation.
- Litmus, "The State of Email Deliverability" (litmus.com/resources/state-of-email-deliverability) . industry benchmarks for inbox placement rates and SPF/DKIM/DMARC compliance requirements; the deliverability standards cited in the evaluation criteria are drawn from Litmus's annual report.

---

## Prompt

```
/adr

email sending infra for resurface. we don't have any email sending
today . everything is in-app or firebase push. need to pick a provider
for the daily digest.

options we looked at:
- sendgrid (twilio): mature, everyone uses it, but their free tier
  shrank and the dashboard is confusing
- postmark: great deliverability reputation, simple api, but
  transactional only . no batch/digest support without workarounds
- resend: new, developer-first, react email templates, free tier
  covers our a/b test volume

alex ran a quick eval last week. we're leaning resend. need the ADR
written up before sprint 8 starts.
```

---

## Output

# ADR-007: Use Resend as the Email Sending Provider for the Resurface Digest

## Status

Accepted

**Date:** 2026-01-28
**Deciders:** Alex R. (Engineering Lead), Priya M. (Product Manager), Jess T. (Backend Engineer)

## Context

Brainshelf's Resurface feature requires sending a daily email digest to opted-in users at 7:30 AM in their local timezone. Brainshelf currently has no transactional email infrastructure . all user-facing communication is delivered through in-app notifications or Firebase Cloud Messaging push notifications. Building Resurface requires selecting an email API provider, configuring DNS records (SPF, DKIM, DMARC) for the brainshelf.app domain, and integrating the provider's API into the backend send pipeline.

The selection must satisfy four constraints. First, the provider must support timezone-aware scheduled sends or provide an API that the backend can call on a per-user cron schedule without rate-limit friction. Second, deliverability must be high enough that digest emails consistently reach the primary inbox, not the promotions tab or spam folder . the entire Resurface hypothesis depends on the email being seen. Third, the cost must be manageable within the pre-Series A budget: the A/B test population is approximately 400 opted-in users in the treatment group [fictional], generating roughly 12,000 emails over the 4-week test window [fictional], and post-ship volume at a 10% opt-in rate across 9,800 eligible users would be approximately 29,400 emails per month [fictional]. Fourth, integration complexity must be low enough for a two-engineer backend team to complete within Sprint 8 (two weeks) alongside the topic-matching algorithm and opt-in flow work.

## Decision

We will use Resend as the email sending provider for the Resurface digest. Alex R. will integrate the Resend API using their Node.js SDK, and Jess T. will configure DNS records and build the send scheduling layer. Email templates will be authored using React Email, which Resend supports natively, allowing Dan K. to collaborate on template design using the same component model as the Brainshelf frontend.

The backend will call the Resend API on a per-user schedule managed by a cron job that resolves each user's local timezone and dispatches the digest at the configured send time (default 7:30 AM local). Resend's webhook system will feed delivery, open, and click events back to the Brainshelf analytics pipeline for experiment measurement.

## Consequences

### Positive

- Resend's free tier (3,000 emails per month [fictional]) covers the entire development and QA phase; the Developer plan ($20/month, 50,000 emails [fictional]) covers the full A/B test volume and post-ship scale at current opt-in projections with significant headroom
- React Email template support means Dan K. can build and preview digest templates locally using JSX components, reducing the design-to-implementation handoff cycle from days to hours
- The Node.js SDK integrates directly into the existing Express backend with no additional runtime dependencies; Alex R. estimated 2 days for core integration during the evaluation spike
- Resend's webhook delivery for bounce, open, and click events is reliable and well-documented, simplifying the analytics pipeline integration that Chloe B. needs for experiment measurement

### Negative

- Resend is a younger company (founded 2023) with less operational track record than SendGrid or Postmark; if Resend experiences downtime or deliverability issues, the digest fails silently and users receive no email
- The team has no prior production experience with Resend; debugging deliverability issues (e.g., emails landing in promotions tab) will require learning Resend's tooling from scratch
- Resend does not offer a built-in suppression list management UI as mature as SendGrid's; unsubscribe handling must be implemented in the Brainshelf backend using Resend's API rather than relying on a provider-managed preference center

### Neutral

- Migrating to a different email provider in the future would require swapping the SDK integration and reconfiguring DNS records but would not affect the template layer (React Email templates are provider-agnostic) or the scheduling logic (which lives in the Brainshelf backend, not the provider)

## Alternatives Considered

### SendGrid (Twilio)

SendGrid is the most widely adopted transactional email provider and offers a mature feature set including built-in suppression list management, a visual template editor, and extensive deliverability analytics. However, SendGrid's free tier was reduced to 100 emails per day in 2024, which would constrain development testing and require an immediate paid plan upgrade. The Essentials plan ($19.95/month for 50,000 emails) is comparable in cost to Resend's Developer plan, but the API integration is more complex . SendGrid's Node.js SDK requires more boilerplate for scheduled sends, and the template system uses a proprietary markup language rather than React components. Alex R. estimated 4–5 days for core integration versus 2 days for Resend, which would consume most of Sprint 8's backend capacity. SendGrid was not selected because of the higher integration effort and the lack of React Email support.

### Postmark

Postmark has the strongest deliverability reputation among the three providers and the simplest API surface. Postmark's design philosophy emphasizes transactional email (password resets, receipts, notifications) and explicitly discourages bulk or marketing email. While a daily digest is technically transactional (it is triggered by user opt-in, not a marketing campaign), Postmark's terms of service require that each email be triggered by a specific user action, which is a gray area for a cron-scheduled daily digest. Additionally, Postmark does not support scheduled sends natively . the backend would need to manage all send timing independently, which is also true for Resend but is a stated limitation in Postmark's documentation rather than an architectural choice. Postmark was not selected because of the terms-of-service ambiguity for daily digests and the absence of React Email template support.

## References

- Resurface hypothesis document (Define phase)
- Spike summary: Topic-matching algorithm evaluation (Develop phase)
- Resend documentation: Node.js SDK, React Email, Webhooks (resend.com/docs)
- Brainshelf DNS configuration guide (internal, to be created during Sprint 8)
