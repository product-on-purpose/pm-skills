---
title: "PRD: Storevine SMS Opt-In (Campaigns v2)"
description: "Storevine B2B ecommerce platform - SMS opt-in PRD written against project memory, so the prompt supplies scope and constraints rather than re-pasting the research."
artifact: prd
version: "1.0"
repo_version: "2.33.0"
skill_version: "2.2.0"
created: 2026-08-16
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - Campaigns v2 SMS opt-in PRD, second half of a two-sample project-memory handoff
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Same initiative as `sample_discover-interview-synthesis_storevine_sms-optin.md`, one step later. The six merchant interviews are done and the synthesis has been recorded.

**Project memory now carries that synthesis**, which is the whole point of this sample. `.claude/pm-skills.local.md` in the Storevine repo reads:

```yaml
---
schema: 1
phase: deliver
active_initiative: "Campaigns v2: SMS opt-in"
artifacts:
  - skill: discover-interview-synthesis
    title: "Storevine SMS opt-in: merchant interview synthesis"
    path: docs/research/sms-optin-synthesis.md
    produced: 2026-08-16
    provenance: interpretation
    summary: "6 merchants; consent ownership is the blocker, bundled opt-in is a non-starter, 10DLC registration is the abandonment point, sender separation is wanted"
---
```

The operator has changed `phase` from `discover` to `deliver` and left the artifact entry alone.

**What to compare.** The v1 email PRD in this same directory, `sample_deliver-prd_storevine_campaigns.md`, opens with a 32-line prompt that re-states the platform, the merchant count, the competitive position, the discovery findings, and the personas, because the skill had no way to know any of it. The prompt below is 11 lines and contains none of that. It supplies only what memory cannot know: the scope decision, the timeline, and the constraints the PM is imposing. The Target Users section further down is populated from the recorded synthesis rather than from the prompt.

That difference is the feature. Everything else in this sample is an ordinary PRD.

**Source Notes:**

- The CTIA Messaging Principles and Best Practices (ctia.org) require express written consent for marketing SMS, retained and auditable, which is the basis for the consent-record requirements below.
- 10DLC brand and campaign registration (the Campaign Registry, and carrier documentation) is a prerequisite for application-to-person throughput in the US and can be rejected, which is why registration is modeled as a tracked multi-day state rather than a form.
- The TCPA (47 U.S.C. 227) provides statutory damages per non-consented marketing message, which is the liability that makes consent ownership a product claim rather than a setting.

---

## Prompt

```
deliver-prd

Feature: SMS opt-in for Campaigns v2.

Scope decision: opt-in and consent only this release. No campaign composer, no
automation, no segmentation. Those are v2.1.

Timeline: 10 weeks to GA.

Constraints: SMS must use a separate sender from email, and we are not shipping
a bundled email-plus-SMS consent checkbox under any circumstance.
```

---

## Output

# PRD: SMS Opt-In (Campaigns v2)

## Overview

**Problem.** Storevine deferred SMS from Campaigns v1 because it requires carrier compliance, opt-in flows, and separate sending infrastructure, and shipping it alongside email would have concentrated launch risk. Campaigns v1 is now stable, and the deferred work is the next constraint on the initiative.

**What this release does.** It ships the consent layer only: collecting SMS opt-in, proving it, and completing 10DLC registration. It does not ship the ability to send a marketing campaign. That capability lands in v2.1 on top of this foundation.

**Why consent first.** The recorded discovery is unambiguous that consent is the adoption blocker rather than a configuration step. Merchants are not asking for a consent feature; they are asking the platform to own the consent obligation and to be able to prove it under audit. Shipping a composer on top of an unowned consent record would ship the capability without moving adoption.

**Target Users.** Drawn from the recorded interview synthesis rather than re-derived here:

- **Compliance-blocked non-adopters.** Merchants who have declined SMS specifically over consent liability, including one whose legal review rejected a vendor over its consent record. This is the largest segment in the research and the one this release is scoped for.
- **Considered-and-stopped merchants.** Merchants who evaluated SMS more than once and stopped at the bundled-consent question. They are addressable without any new capability, only a credible consent story.
- **Standalone-provider switchers.** Merchants already paying for SMS elsewhere who keep it separate deliberately. Their stated switching condition is that the consent record transfers or is re-collected cleanly.

## Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Merchants complete registration rather than abandoning it | Share of merchants who start 10DLC registration and reach an approved or explicitly-rejected terminal state | 85% [fictional] |
| Consent is provable | Time for a merchant to export a full consent record for one subscriber | Under 2 minutes [fictional] |
| The bundled-consent objection is neutralized | Share of surveyed compliance-blocked merchants who say consent is no longer their blocker | 60% [fictional] |
| Email is not put at risk | Email deliverability change attributable to SMS launch | No measurable change |

The registration-completion metric is the primary decision metric. The research identified registration as the only observed abandonment point, so it is the one number that determines whether this release worked.

## User Stories

- As a compliance-anxious merchant, I want to see who holds the SMS consent record and how I export it, so that I can answer my own legal review before I enable anything.
- As a merchant with an existing email list, I want SMS consent collected separately from email consent, so that I am not relying on a bundled checkbox I believe is unlawful.
- As a merchant starting 10DLC registration, I want to see what stage it is at and how long it typically takes, so that silence does not read as failure.
- As a merchant whose registration is rejected, I want to know why and what to change, so that rejection is a step rather than an ending.
- As a merchant already using a standalone SMS provider, I want to import or cleanly re-collect my consent records, so that switching does not mean losing my list.
- As a merchant who has spent effort on email deliverability, I want SMS to send from separate infrastructure, so that a new channel cannot damage the sender reputation I built.

## Scope

**In scope.** SMS consent collection as a standalone opt-in, consent record storage with retention and export, 10DLC brand and campaign registration as a tracked workflow with status and a rejection path, separate SMS sending infrastructure provisioned and isolated from email, and a consent-record import path for merchants switching from a standalone provider.

**Out of scope, deliberately.** Campaign composition, scheduling, automation, segmentation, templates, and analytics. All are v2.1. Also out: non-US jurisdictions, since the recorded research covers 10DLC and TCPA obligations only and no participant operated outside the US.

**Explicitly rejected.** A bundled email-plus-SMS consent checkbox. Four of six research participants raised bundled consent unprompted as disqualifying, and one abandoned a competing plugin over exactly that pattern. Offering it as an option would deter the segment this release targets.

## Solution Design

**Consent as an owned record.** Each SMS opt-in produces an immutable consent record capturing the phone number, the timestamp, the collection surface, the exact consent language shown, and the merchant it belongs to. Records are retained for the statutory period and exportable per subscriber or in bulk. The product states plainly, in the merchant-facing UI, that Storevine holds and retains this record.

**Separate opt-in surface.** SMS consent is collected on its own control with its own language, never as an additional checkbox on an existing email form. Where both are offered on one page, they are visibly distinct controls with independent state, and neither pre-checks the other.

**Registration as a tracked workflow.** 10DLC brand and campaign registration is modeled as a multi-day state machine with five states: not started, submitted, under review, approved, rejected. Each state shows expected duration. Rejection shows the carrier reason and the specific field to change, and resubmission is a first-class action rather than a restart.

**Sender isolation.** SMS provisioning uses separate infrastructure and separate credentials from email, with no shared reputation surface. This is surfaced to merchants as a stated property, not left as an implementation detail, because the research found merchants actively want the separation preserved.

**Switcher import.** Merchants can upload consent records from a standalone provider with the same required fields. Records missing any required field are rejected at import with the reason, rather than accepted and treated as consented.

## Technical Considerations

Registration status is externally controlled and asynchronous, so the workflow must tolerate multi-day latency, out-of-order webhooks, and silence. Polling is required as a fallback rather than relying on carrier callbacks alone.

Consent records are legal evidence, so they are append-only. Corrections create a superseding record rather than mutating the original, and the export must show the full chain.

The separate sender means a second set of provider credentials, rate limits, and error surfaces. Error handling cannot be shared with the email path.

## Dependencies & Risks

| Item | Type | Note |
|---|---|---|
| 10DLC registration approval times | Dependency | Externally controlled, varies, and can reject. The workflow design assumes this rather than treating it as an edge case |
| SMS provider selection | Dependency | Blocks sender provisioning. Must be settled by week 2 |
| Statutory retention period per jurisdiction | Risk | Scoped to US only this release; expanding scope later may change retention requirements |
| Merchants importing unusable consent records | Risk | Mitigated by rejecting at import rather than accepting silently, at the cost of a harder import experience |

## Timeline & Milestones

| Week | Milestone |
|---|---|
| 1-2 | Provider selection settled; consent record schema fixed |
| 3-5 | Consent collection surface and record storage |
| 6-7 | 10DLC registration workflow including the rejection path |
| 8 | Switcher import |
| 9 | Consent export and audit view |
| 10 | GA |

## Open Questions

- Should consent export be self-serve from day one, or is a support-mediated export acceptable for GA? The research says merchants need to be able to answer legal review, which may not require self-serve.
- Do we surface expected registration duration as a range or a single figure? A single figure that proves wrong is worse than a range.
- For switchers, do we require re-consent when an imported record lacks the exact consent language, or accept the record with a flag? This is a legal question, not a product one.

## Appendix

### How this PRD used project memory

The prompt above supplied the scope decision, the timeline, and two constraints. It did not supply the platform, the merchant count, the competitive position, the research findings, or the personas. Those came from the recorded `interpretation` artifact, which is why the Target Users section names three segments the prompt never mentions.

The comparison worth making is with `sample_deliver-prd_storevine_campaigns.md` in this same directory. That PRD covers the email half of the same initiative, and its prompt runs 32 lines because everything the skill needed had to be pasted in. This one runs 11.

### Limitations of this sample

This is a written worked example in the same style as the rest of the corpus, not a transcript of an executed run. It demonstrates the handoff as designed. It does not by itself prove that the propose-then-confirm write mechanic fires correctly at runtime, which is a separate thing to verify.
