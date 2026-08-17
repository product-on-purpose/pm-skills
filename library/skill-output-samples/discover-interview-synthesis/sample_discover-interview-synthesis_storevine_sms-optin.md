---
title: "Discover Interview Synthesis: Storevine SMS Opt-In"
description: "Storevine B2B ecommerce platform - merchant interviews on SMS marketing, run with project memory enabled so the synthesis is recorded for the PRD that follows."
artifact: interview-synthesis
version: "1.0"
repo_version: "2.33.0"
skill_version: "2.3.0"
created: 2026-08-16
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - merchant SMS interviews for the Campaigns v2 opt-in scope, first half of a two-sample project-memory handoff
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine shipped Campaigns v1 (email) and deferred SMS to v2. The shipped v1 PRD records the reason precisely: SMS has high merchant demand but "requires carrier compliance, opt-in flows, and separate sending infrastructure", deferred to isolate launch risk. With v1 stable across roughly 18k active merchants [fictional], the growth PM has re-opened the SMS question and commissioned six merchant interviews to scope what an opt-in-first SMS release would have to handle.

**This run has project memory enabled**, which is what makes it the first half of a pair. The team has created `.claude/pm-skills.local.md` in the Storevine repo and ignored it in git:

```yaml
---
schema: 1
phase: discover
active_initiative: "Campaigns v2: SMS opt-in"
---
```

Nothing else is in the file yet. At the end of this run the skill offers to record its personas and findings as an `interpretation` artifact, the operator confirms, and the file gains its first `artifacts[]` entry. The companion sample, `sample_deliver-prd_storevine_sms-optin.md`, is the PRD written afterward against that recorded context. Reading the two Prompt blocks side by side is the point of the pair: this one supplies the research, and the PRD one does not have to.

**Source Notes:**

- The CTIA Messaging Principles and Best Practices (ctia.org) require express written consent before sending marketing SMS, with the consent record retained and auditable. This is the compliance obligation merchants describe as the reason they have not built SMS themselves.
- The 10DLC registration regime for application-to-person messaging in the US (documented by the major carriers and the Campaign Registry) requires brand and campaign registration before throughput is granted, which is why "separate sending infrastructure" is a scoping fact rather than a preference.
- The TCPA (47 U.S.C. 227) establishes statutory damages per message for marketing texts sent without consent, which is the specific liability that makes merchants describe SMS as higher-stakes than email.
- Nielsen Norman Group research on consent and permission UX (nngroup.com) finds that users interpret bundled consent as coercive and disengage, which bears directly on whether SMS opt-in can share a checkbox with email.

---

## Prompt

```
discover-interview-synthesis

I ran six merchant interviews about SMS marketing for Campaigns v2. Synthesize
them into themes, personas, and recommendations that can feed a PRD.

Participants (all current Storevine merchants on Campaigns v1 email):
- M1, home goods, 3 staff, currently uses a standalone SMS provider
- M2, apparel, 12 staff, no SMS, considered it twice and stopped
- M3, supplements, 6 staff, currently uses a standalone SMS provider
- M4, pet supplies, 2 staff, no SMS, actively worried about compliance
- M5, outdoor gear, 25 staff, no SMS, has legal review for marketing
- M6, cosmetics, 8 staff, tried SMS through a plugin and abandoned it

Interview notes are in the attached transcripts. Focus on what an opt-in-first
release would have to handle. We already know SMS was deferred from v1 for
carrier compliance, opt-in flows, and separate sending infrastructure; I want
to know what merchants actually need, not confirmation of that.
```

---

## Output

# Storevine SMS Opt-In: Interview Synthesis

## Research Overview

### Objective

Determine what an opt-in-first SMS release must handle for Storevine merchants, and whether the v1 deferral reasons map to real merchant blockers or only to platform-side engineering scope.

### Methodology

Six semi-structured interviews, 45 minutes each, conducted remotely over two weeks. Participants were recruited from active Campaigns v1 merchants and deliberately split between current SMS users (2), considered-and-stopped (3), and tried-and-abandoned (1). Transcripts were coded independently by two researchers before theme consolidation.

### Participant Summary

| ID | Vertical | Staff | SMS today | Recruitment basis |
|---|---|---|---|---|
| M1 | Home goods | 3 | Standalone provider | Current SMS user |
| M2 | Apparel | 12 | None | Considered twice, stopped |
| M3 | Supplements | 6 | Standalone provider | Current SMS user |
| M4 | Pet supplies | 2 | None | Compliance-blocked |
| M5 | Outdoor gear | 25 | None | Has legal review |
| M6 | Cosmetics | 8 | None | Tried a plugin, abandoned |

## Key Themes

### Theme 1: Consent Is the Product, Not a Setting

Every participant who had not adopted SMS described consent as the reason, and none described it as a feature they wanted configured. They described it as a liability they wanted absorbed. M4 and M5 both asked, unprompted, who would hold the consent record if Storevine sent the message. M5's legal review had already declined one SMS vendor over exactly that question. The merchants who did use SMS (M1, M3) had both accepted their provider's consent tooling wholesale rather than customizing it.

The distinction that matters for scope: merchants are not asking for a consent feature. They are asking for the platform to own the consent obligation and to be able to prove it later.

### Theme 2: Bundled Consent Is a Non-Starter, and Merchants Know It

Four participants raised, without being asked, that they did not want SMS consent bundled into the existing email signup. M2 had considered SMS twice and stopped both times at this question, describing a bundled checkbox as "the thing that gets you sued." M6 abandoned a plugin specifically because it added phone collection to the existing email form with one shared checkbox.

This is a stronger signal than it appears. Merchants are declining a shortcut the platform could easily have shipped, which means the constraint is externally imposed and stable rather than a preference the product could argue them out of.

### Theme 3: The Second Sender Is a Reputation Risk, Not Just Infrastructure

M1, M3 and M5 each independently connected SMS to the email deliverability work they had already done. M1 described spending eight months rebuilding sender reputation after a bad list import and said flatly that they would not put that at risk again. M3 kept SMS on a separate provider deliberately, describing it as "not worth mixing." M5 framed it as a governance question: different channel, different consent basis, different audit trail.

This reframes the v1 deferral note. "Separate sending infrastructure" was recorded as a platform engineering cost. Merchants experience the same separation as a desirable property they want preserved.

### Theme 4: Abandonment Happens at Setup, Not at Send

M6 is the only participant who started and stopped. The abandonment point was not sending, cost, or results. It was the registration step: the plugin surfaced 10DLC brand registration as a form with no explanation of what it was, how long it took, or what happened if it was rejected. M6 filled it in, waited, heard nothing, and stopped. Neither M2 nor M4 had reached that step, but both anticipated it as the likely stopping point.

## Notable Quotes

- "I do not want to configure consent. I want to not be the one holding it." (M4)
- "The bundled checkbox is the thing that gets you sued." (M2)
- "I spent eight months getting our email reputation back. I am not putting that near a new channel." (M1)
- "Legal did not say no to SMS. They said no to that vendor's consent record." (M5)
- "I filled in the registration, waited, and never heard anything. So I stopped." (M6)
- "We keep SMS separate on purpose. Not worth mixing." (M3)

## Insights

### Insight 1: The Deferral Reasons Were Right, for the Wrong Reason

The v1 PRD deferred SMS for carrier compliance, opt-in flows, and separate sending infrastructure, framed as launch risk to Storevine. The interviews confirm all three matter, but as merchant-side blockers rather than platform-side cost. Compliance is a liability merchants want absorbed, opt-in is a legal exposure they will not bundle, and separate infrastructure is a property they want preserved. A v2 that solves these as engineering problems without addressing the ownership question would ship the capability and not move adoption.

### Insight 2: Registration Is the Real Funnel, and It Is Currently Invisible

The only observed abandonment happened at 10DLC registration, and the two non-adopters furthest along both named it as their expected stopping point. Registration is asynchronous, externally controlled, and can be rejected, which is a shape no other part of Campaigns has. Treating it as a form is what lost M6. It needs status, expected duration, and a rejection path.

### Insight 3: The Existing SMS Users Are a Switching Opportunity, Not a Retention Risk

M1 and M3 both pay a standalone provider and both described the separation as deliberate rather than satisfying. Neither had evaluated switching, because neither knew Storevine intended to offer it. Their stated switching condition was identical: the consent record must transfer or be re-collected cleanly, because losing it means losing the list.

## Recommendations

### Recommendation Details

1. **Make consent ownership an explicit product claim, not an implied one.** State in the product who holds the consent record, how it is retained, and how a merchant exports it under audit. This is the single most repeated ask and it is currently unaddressed.
2. **Ship SMS consent as a separate opt-in from email, and do not offer a bundled option.** Four of six raised this unprompted, and offering the bundle would actively deter the compliance-sensitive segment.
3. **Treat 10DLC registration as a tracked, multi-day workflow with visible status and a rejection path.** It is the only observed abandonment point and the anticipated one for two more participants.
4. **Preserve sender separation between email and SMS, and say so.** Merchants read a shared sender as a risk to work they have already done. The engineering separation the v1 PRD treated as a cost is a feature to name.
5. **Scope a consent-record import path for switchers.** M1 and M3 are addressable, and both named the consent record as the switching condition.

## Appendix

### Methodology Notes

Participants were compensated. Two researchers coded independently, with themes retained only where both coded the same passage. Quotes are lightly edited for length and de-identified by merchant vertical rather than name.

### Limitations

Six participants across one platform is directional, not representative. The sample deliberately over-weights non-adopters (four of six), which is appropriate for a scoping question but means it under-samples the operational experience of running SMS at volume. No participant operated outside the US, so the findings speak to 10DLC and TCPA obligations only and do not cover jurisdictions with separate consent regimes.

### Project memory entry recorded

At the end of this run the skill proposed the following entry, and the operator confirmed it. This is what the companion PRD sample reads instead of re-collecting the research.

```yaml
artifacts:
  - skill: discover-interview-synthesis
    title: "Storevine SMS opt-in: merchant interview synthesis"
    path: docs/research/sms-optin-synthesis.md
    produced: 2026-08-16
    provenance: interpretation
    summary: "6 merchants; consent ownership is the blocker, bundled opt-in is a non-starter, 10DLC registration is the abandonment point, sender separation is wanted"
```
