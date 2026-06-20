---
title: "Stakeholder Briefings: Storevine Campaigns GA Launch"
description: "A Campaigns GA launch checklist projected to five lenses (PMM, Sales, CS/Support, Executive, and an inferred Agency-partners custom lens) from one master."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - Campaigns GA launch checklist fanned out to GTM audiences, demonstrating Custom-lens inference for agency partners
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Campaigns is cleared for GA and Storevine's Growth PM has the launch checklist ready. The same launch needs to reach the GTM functions, each with a different action: PMM owns the narrative, Sales owns the talk track, CS owns merchant change. The PM runs `foundation-stakeholder-briefings` against the checklist; the skill proposes PMM, Sales, CS/Support, and Executive for a GTM source. The PM also asks for an "agency partners" audience, which is outside the nine first-class lenses, so the skill infers a Custom lens and confirms it before generating.

**Source Notes:**

- Storevine is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @campaigns-launch-checklist.md

Source: Campaigns GA launch checklist. GA 2026-07-20. Built-in email/SMS
re-engagement, replaces external tools (Klaviyo/Mailchimp) for the ~68% of
merchants on an outside tool. v1 template-only. SendGrid dedicated-IP warm-up
complete. CAN-SPAM/GDPR signed off. Activation lever: guided template flow
(first-send target 12% -> 30%). Paid tier above the free send cap.

Audiences: GTM proposal, plus a custom audience: agency partners (the studios
that build and run Storevine stores for merchant clients).
```

> The skill confirmed the inferred Custom lens before generating: **Agency partners** - decision owned: which client stores to roll Campaigns onto and how to bill the service; cares about client retainer/upsell impact, migration effort off external tools, white-label/multi-store fit; jargon posture: plain partner-business language; length/tone: practical, margin-aware. The PM confirmed `go`.

## Output

```markdown
# Stakeholder briefings: Campaigns GA launch

## Master document

**What and why**

- M1: Campaigns goes GA on 2026-07-20 as Storevine's native email/SMS re-engagement, so merchants can run lifecycle messaging in-platform instead of on Klaviyo or Mailchimp.
- M2: The headline audience is the ~68% of merchants [fictional] paying for an external email tool today; the activation goal is to move first-send rate from 12% to 30% [fictional].

**Decisions**

- M3: v1 is template-only (no drag-and-drop); the guided template flow is the first-send activation lever.
- M4: A paid tier sits above a free monthly send cap; sending over the cap requires an upgrade.
- M5: SMS is gated behind email GA and is not part of the launch message.

**Status**

- M6: Launch gates are green: SendGrid dedicated-IP warm-up is complete and CAN-SPAM/GDPR are signed off.
- M7: Migration support for merchants moving off an external tool (list import, suppression-list carryover) is in place for GA.

**Risks and open questions**

- M8: Deliverability on newly active merchant domains is the residual risk even after warm-up; first-week send volume is being watched.
- M9: Merchants on Klaviyo/Mailchimp may resist switching mid-flight; the migration path and the cost story have to be clear.

**Asks**

- M10: Hold the GA date and the launch-week support staffing at the 2026-07-18 launch-readiness review.

**Timeline**

- M11: GA 2026-07-20; launch-week monitoring window 2026-07-20 to 2026-07-27.

## Briefings

--- BEGIN: PMM ---

**Draws on:** M1, M2, M3, M5
**Primary ask:** Approve the "stop paying for a second tool" launch narrative and lock the GA messaging.

**One platform, not two tools: the consolidation story is the launch**

**What this means for PMM**

The launch narrative writes itself off the core fact: merchants no longer need Klaviyo or Mailchimp bolted onto Storevine. The story is consolidation, run your re-engagement where your store, orders, and customers already live, aimed squarely at the ~68% of merchants [fictional] who pay for an outside tool today.

Two guardrails for the messaging. First, lead with the guided template flow as the "send your first campaign in minutes" proof point, since template-only v1 is a deliberate simplicity play, not a missing feature. Second, do not message SMS at GA; it is gated behind email and over-promising it will erode trust. Lock the GA messaging on the consolidation narrative.

--- END ---

--- BEGIN: Sales ---

**Draws on:** M1, M2, M4, M9
**Primary ask:** Equip the field with the Campaigns talk track and the Klaviyo/Mailchimp objection handling for GA week.

**Sellable now: a consolidation pitch with a clear cost story**

**What this means for Sales**

Campaigns is sellable as of GA on the consolidation angle: prospects and existing merchants can drop their separate email bill and run it inside Storevine. The strongest pipeline play is the ~68% of merchants [fictional] already paying for an external tool, where the conversation is about replacing a known cost.

Two objections will come up immediately. "I already use Klaviyo and it works" is real for high-volume senders, so position Campaigns as the right fit for merchants who want one platform and a simpler stack, not as a feature-for-feature Klaviyo replacement. "What does it cost me" is the close: there is a free monthly send cap with a paid tier above it, so the talk track is "free to start, you only pay when you outgrow the cap." Get the talk track and objection card to the field before GA week.

--- END ---

--- BEGIN: CS/Support ---

**Draws on:** M1, M3, M7, M8, M10
**Primary ask:** Confirm launch-week support staffing and the first-send + migration playbook are ready for GA.

**Two ticket waves to expect: first-send help and migration questions**

**What this means for CS/Support**

Two predictable support waves hit at GA. First, merchants trying their first campaign through the guided template flow will ask basic "how do I send" and "why did this land in spam" questions; template-only v1 keeps this simpler than a full builder, but it is still net-new behavior for most merchants. Second, merchants migrating off Klaviyo or Mailchimp will ask about importing lists and carrying over their unsubscribe/suppression list, which is supported at GA.

Deliverability on newly active domains is the residual risk even after warm-up, so first-week send issues are the likeliest escalations; have the deliverability talking points and the migration steps ready as canned responses. Confirm launch-week staffing and the first-send + migration playbook at the 2026-07-18 readiness review.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M1, M2, M6, M10, M11

**Primary ask:** Hold the GA date and approve launch-week support staffing at the 2026-07-18 readiness review.

**Campaigns is GA-ready for 2026-07-20; gates are green**

**What this means for the Executive sponsor**

Campaigns goes GA on 2026-07-20 as native email/SMS, targeting the ~68% of merchants [fictional] who pay for an outside tool, with the goal of roughly tripling first-send activation [fictional]. The launch gates are green: deliverability warm-up is complete and the compliance review is signed off. The remaining call is operational, not technical: hold the date and resource launch week so the first-send and migration waves are covered. Decision needed from you at the 2026-07-18 readiness review.

--- END ---

--- BEGIN: Agency partners (custom) ---

**Draws on:** M1, M3, M4, M7, M9

**Primary ask:** Decide which managed client stores to enable Campaigns on first and how to price the service.

**A new managed service line: run client re-engagement inside Storevine**

**What this means for agency partners**

Campaigns gives the studios who build and run Storevine stores a new service to offer clients: managed email/SMS re-engagement, run inside the same platform you already operate for them, instead of standing up and billing a separate Klaviyo or Mailchimp seat per client. v1 is template-only, which lowers the production effort to launch a client's first campaign and makes it realistic to run across a portfolio of stores.

The commercial angle is the retainer: there is a free send cap with a paid tier above it, so for higher-volume clients you can fold sending into a managed-marketing retainer rather than passing through a third-party bill. The migration path matters for your existing book, list import and suppression-list carryover are supported, so moving a client off their current tool is a contained project, not a rebuild. Some clients on a working Klaviyo setup will resist switching, so start where the value is clearest. Decide which managed stores to enable first and how you will price the service.

--- END ---

---

## Translations applied (internal)

- "first-send rate 12% -> 30%" kept as-is for PMM context; rendered as "roughly tripling first-send activation" for Executive.
- "free send cap + paid tier above it" -> "free to start, you only pay when you outgrow the cap" *(audience: Sales, as a close-friendly cost story)*
- "suppression-list carryover" kept precise for CS/Support and Agency partners; not surfaced to Executive (operational detail below their decision).
- Custom lens inference: "agency partners" -> decision owned = which client stores to enable + how to bill; cares about retainer/upsell, migration effort, multi-store fit *(confirmed with the user before generating)*.

**Flagged but kept** (may need review):

- "do not message SMS at GA" - a PMM-internal guardrail (M5); correct to keep out of the customer-facing narrative, but verify Sales does not lead with SMS either.

## Sources and References

- Source artifact: campaigns-launch-checklist.md [fictional]
- **Generated:** 2026-06-20T16:45:00Z | **Skill version:** 1.0.0 | **Audiences:** PMM, Sales, CS/Support, Executive, Agency partners (custom) | **Input quality:** high (GA checklist with gates, timeline, pricing, and migration scope)
- **Invariant self-check:** 5 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral; one Custom lens inferred and confirmed.
```
