---
title: "Develop ADR: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - email sending infrastructure for Campaigns."
artifact: adr
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . email sending infrastructure for Campaigns
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine uses SendGrid for transactional emails (order confirmations, password resets) on a shared IP pool. With Campaigns . the new built-in email marketing feature . the platform will add high-volume broadcast sends and automated marketing sequences to the same infrastructure. The engineering lead and growth PM evaluated four sending providers before committing to a vendor for Campaigns v1. This ADR captures that decision and its rationale.

**Source Notes:**

- SendGrid (Twilio) public pricing and deliverability documentation describes dedicated IP plans, IP warm-up scheduling, and inbox placement testing tooling . the features that differentiate it from lower-cost transactional-only providers.
- AWS SES pricing page (aws.amazon.com/ses/pricing) shows $0.10 per 1,000 emails with no additional deliverability tooling included; IP warm-up and reputation management require custom engineering on top of the base service.
- Postmark's public documentation explicitly states the product is optimized for transactional email only and does not support bulk marketing sends; their pricing and infrastructure reflect this constraint.
- Mailgun's public pricing and documentation show dedicated IP availability comparable to SendGrid, with similar deliverability tooling . making it the closest technical alternative evaluated.

---

## Prompt

```
develop-adr

ADR for email sending infrastructure choice for Campaigns v1. We need to pick
the vendor before we start the backend build.

Context: Storevine currently sends transactional emails (order confirm, password
reset) through SendGrid on a shared IP. Campaigns will add broadcast marketing
email + 3 automated sequences (abandoned cart, welcome, re-engagement) at
projected volume of ~2M emails/month at launch [fictional], scaling to ~10M
at full merchant adoption [fictional].

Options we evaluated: SendGrid (upgrade to dedicated IP), AWS SES, Postmark,
Mailgun.

Key constraints:
- CAN-SPAM/GDPR compliance is a hard gate before launch
- Deliverability matters: one spam incident tanks merchant trust
- We have existing SendGrid integration (transactional)
- Cost matters but is secondary to deliverability reliability at this stage

Decision: SendGrid dedicated IP. Need this documented for the record.
Eng lead and growth PM are the deciders.
```

---

## Output

# ADR-007: Email Sending Infrastructure for Campaigns

## Status

Accepted

**Date:** 2026-02-20
**Deciders:** Eng Lead (Platform), Growth PM

## Context

Storevine Campaigns (v1) will add broadcast email marketing and three trigger-based automations . abandoned cart, welcome series, and re-engagement . to the platform. Projected send volume is ~2 million emails per month at launch [fictional], scaling to ~10 million per month at full merchant adoption [fictional].

Storevine currently uses SendGrid for transactional emails (order confirmations, password resets, account notifications) on a shared IP pool. Shared IPs are acceptable for transactional email, where send volume is moderate and content is expected; they are not appropriate for marketing email at scale. Marketing emails sent from a shared IP pool are more susceptible to deliverability damage from other senders on that pool, and ISPs apply stricter spam scoring to marketing content regardless of sender reputation.

Campaigns requires a sending infrastructure that satisfies four constraints:

1. **Dedicated IP support** . to isolate Storevine's sender reputation from other senders and enable controlled IP warm-up before launch.
2. **Deliverability tooling** . inbox placement testing, bounce and spam-complaint handling, and suppression list management, available without custom engineering.
3. **CAN-SPAM and GDPR compliance hooks** . unsubscribe endpoint management, bounce suppression, and consent data storage patterns must integrate cleanly with the Campaigns data model.
4. **API familiarity** . the platform team has existing SendGrid API integration; switching cost must be justified by concrete technical advantage.

Four providers were evaluated: SendGrid (Twilio), AWS SES, Postmark, and Mailgun.

## Decision

We will use SendGrid (Twilio) as the email sending infrastructure for Campaigns v1. Specifically, we will upgrade from the current shared-IP plan to a dedicated IP plan, configure a separate IP for marketing sends to isolate reputation from transactional sends, and use SendGrid's IP warm-up scheduler to ramp marketing volume over 30 - 45 days before GA launch.

The existing SendGrid account, API integration, and bounce/unsubscribe webhook infrastructure will be extended for Campaigns. No new vendor relationship or API integration is introduced.

## Consequences

### Positive

- Existing API integration reduces backend implementation time for the Campaigns sending layer; the team does not need to learn a new SDK or authentication model.
- SendGrid's dedicated IP warm-up tooling is purpose-built for this use case: scheduled volume ramping, deliverability dashboard, and inbox placement testing (via Twilio SendGrid's inbox providers report) are available without custom engineering.
- Unsubscribe and bounce webhook infrastructure is already partially implemented for transactional email; extending it for marketing sends is incremental work rather than a greenfield build.
- Single vendor relationship simplifies billing, compliance documentation, and support escalation for email-related incidents.

### Negative

- SendGrid's cost per email is meaningfully higher than AWS SES at large volumes; at the projected 10M emails/month [fictional] steady-state, the cost differential is significant and will need to be priced into the Campaigns paid tier.
- A dedicated IP requires a 30 - 45 day warm-up period before Storevine can safely send full GA volume; this is a hard constraint on the launch timeline and must be factored into the beta and GA schedule.
- Vendor dependency on a Twilio-owned service introduces a layer of acquisition and roadmap risk; Twilio has restructured multiple product lines since the SendGrid acquisition in 2019. This is low-probability but worth monitoring.

### Neutral

- Separating marketing and transactional IPs is the recommended practice regardless of provider; this separation would have been required with any of the evaluated alternatives.
- Bounce and spam-complaint webhooks from SendGrid will be ingested and logged in v1 but not surfaced in the merchant-facing analytics UI until v2; this is a scope decision, not an infrastructure limitation.

## Alternatives Considered

### AWS SES

AWS SES charges $0.10 per 1,000 emails, making it the lowest-cost option by a significant margin at scale. However, SES provides minimal built-in deliverability tooling . dedicated IP management, IP warm-up scheduling, and inbox placement testing all require custom engineering on top of the base service. Given that the Campaigns team does not have a dedicated email deliverability engineer and is launching on an aggressive timeline, choosing SES would shift deliverability risk management responsibility onto the product team without the tooling to manage it. SES is the right choice for a team with dedicated deliverability infrastructure; it is not the right choice for Storevine at this stage.

### Postmark

Postmark has an excellent reputation for transactional email deliverability and a clean developer experience. However, Postmark's product is explicitly optimized for transactional sends only; their documentation states the service is not intended for bulk marketing or broadcast email. Selecting Postmark for Campaigns would mean running two separate email providers (Postmark for transactional, another vendor for marketing), adding integration complexity and split analytics. Postmark is a strong choice for the transactional use case but is out of scope for Campaigns.

### Mailgun

Mailgun offers dedicated IP support and deliverability tooling comparable to SendGrid, making it the closest technical alternative. It was not selected because (1) Storevine has no existing Mailgun relationship or API integration, creating a switching cost that is not justified by a clear technical advantage over SendGrid, and (2) the team assessed the two providers as roughly equivalent on deliverability; given equivalent capability, the lower-switching-cost option is the correct choice. Mailgun remains a viable fallback if SendGrid pricing becomes uncompetitive at scale.

## References

- [Storevine Campaigns PRD v1.0](#) . scope, CAN-SPAM/GDPR compliance requirements, launch timeline
- [Email Deliverability Spike Summary](#) . evaluation notes from SendGrid vs. SES vs. Postmark vs. Mailgun comparison, including cost modeling at 2M and 10M sends/month
- [SendGrid IP Warm-Up Documentation](https://docs.sendgrid.com/ui/sending-email/ip-warmup-overview) . warm-up schedule and volume ramp guidance
- [CAN-SPAM Act Compliance Reference . FTC](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
