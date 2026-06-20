---
title: "Stakeholder Briefings: Brainshelf Resurface Launch"
description: "The Resurface App Store launch plan projected to PMM, CS/Support, and Executive briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - the Resurface App Store launch plan fanned out to product-marketing, customer-support, and executive lenses ahead of release
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Resurface is shipping with the next App Store release, bundled into a versioned app update with new store screenshots and a "What's New" entry. Priya owns the launch and needs three teams aligned before submission: PMM (the store listing and announcement story), CS/Support (what users will ask and how to answer), and the founder (the launch-day go/no-go). The skill builds one neutral launch master and projects three briefings so the store copy, the support macros, and the exec summary all describe the same feature and the same risks.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @resurface-launch-plan.md

resurface ships in the next app store update. need:
- pmm: store listing + announce
- support: what people will ask
- marco: launch day go/no-go
casual is fine. go
```

## Output

```markdown
# Stakeholder briefings: Resurface App Store launch

## Master document

**What and why**

- M1: Resurface ships in the next App Store update (v3.1): a daily morning email digest of 3-5 saved items matched to recent reading, turning the saved-but-never-read library into a reading habit.
- M2: It is the headline feature of the release and our first email channel; it is opt-in and free for all eligible users (10+ saves, active in last 30 days), ~9,800 users [fictional].

**Decisions**

- M3: Launch is a phased rollout: 25% of eligible users day 1, 50% day 2, 100% day 3, gated on deliverability and unsubscribe staying healthy.
- M4: The store listing leads with "Resurface: your morning reading, rediscovered"; the in-app prompt drives opt-in; the announcement (blog + social) follows at 100% rollout.
- M11: The digest sends at 7:30 AM in the user's device timezone; a stale or recently-changed device timezone can shift the timing until it self-corrects on next app open.

**Status**

- M5: Build, A/B test, and DNS/email auth are complete; the digest validated in test with a 17.2% click-through [fictional] and a +5.3pp 7-day return-rate lift [fictional]; App Store submission is pending final sign-off.

**Risks and open questions**

- M6: Top risk is email deliverability at scale: going from ~12K to ~290K emails/month [fictional] can hurt sender reputation; first-week inbox placement is watched daily.
- M7: Two known issues users may hit: paywalled saved articles open to a paywall when clicked (we link to the original URL, we do not bypass paywalls), and quiet-hours timing can feel off if the user's device timezone is stale.
- M8: Apple Mail Privacy Protection inflates email opens, so we do not quote open rate to users or internally; clicks and returns are the real measure.

**Asks**

- M9: Approve the launch-day go/no-go and the phased-rollout gate criteria.

**Timeline**

- M10: App Store submission this week; phased rollout over 3 days post-approval; public announcement at 100% rollout, targeted late April.

## Briefings

--- BEGIN: PMM ---

**Draws on:** M1, M2, M4, M5, M10

**Primary ask:** Lock the store listing copy and screenshots, and stage the blog/social announcement to fire at 100% rollout.

**"Your morning reading, rediscovered" - lead the listing with the habit, prove it with the lift**

**What this means for PMM**

Resurface is the headline of the v3.1 release and it is our first email channel, so the store listing and the announcement carry the story. Lead with the benefit: the saved-articles guilt pile becomes a morning reading habit, a digest of a few things worth your time, matched to what you have been reading. The store listing headline is "Resurface: your morning reading, rediscovered," with screenshots showing the digest and the opt-in. The proof point is real: in testing it drove a measured retention lift [fictional], so the announcement can claim "people actually came back to what they saved," not just "new feature." Hold the blog and social announcement until we hit 100% rollout so we are not promoting a feature most users cannot see yet. Lock the listing copy and screenshots for submission this week.

--- END ---

--- BEGIN: CS/Support ---

**Draws on:** M2, M3, M7, M8, M11

**Primary ask:** Publish support macros for the three predictable tickets (opt-in/why-no-email, paywalled links, wrong send time) before the rollout starts.

**Three predictable tickets: where's my email, paywalls, and wrong send time**

**What this means for CS/Support**

Resurface is opt-in and rolling out in phases (25% / 50% / 100% over three days), so expect a wave of predictable questions and have macros ready before day 1. Three to prepare for. One: "I don't get the email / where is it." Answer: it is opt-in, only eligible users (10+ saves, active recently) see the prompt, and the phased rollout means some users get it a day or two later than others. Two: "the article in my digest is behind a paywall." Answer: Resurface links to the original article URL and does not bypass paywalls, so paywalled sources will show their paywall, same as opening the link anywhere. Three: "the email arrives at the wrong time." Answer: it sends at 7:30 AM in the device's timezone, and a stale or recently-changed timezone can throw it off by a day; it self-corrects on next app open. One internal note: do not quote "open rate" to users as proof they got it, because Apple Mail Privacy Protection makes that number meaningless; point to the email itself or the click history instead. Publish these three macros before rollout.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M1, M3, M5, M6, M9

**Primary ask:** Approve the launch-day go/no-go and the phased-rollout gate criteria.

**Resurface ships in v3.1; phased rollout gated on deliverability. Need go/no-go**

**What this means for Marco**

Resurface, the morning digest, ships as the headline of the next App Store update. It is validated (it moved retention and cleared its guardrails in test [fictional]) and the build and email infrastructure are done. We are launching it as a phased rollout: 25% of eligible users on day 1, 50% day 2, 100% day 3, with each step gated on email deliverability and unsubscribe rate staying healthy. The one risk worth your attention is deliverability at scale: our email volume jumps from roughly 12K to 290K messages a month [fictional], which can dent sender reputation, so we watch inbox placement daily in week one and the gate lets us pause if it slips. Decision needed from you: approve the launch-day go/no-go and the gate criteria for advancing the rollout.

--- END ---

---

## Translations applied (internal)

- "deliverability / sender reputation / inbox placement" kept plain for the Executive block as a single "deliverability risk"; surfaced to CS/Support only as the reason for phased rollout, not as a metric.
- "Apple Mail Privacy Protection inflates opens" kept as an internal note in CS/Support ("do not quote open rate to users"); not surfaced to PMM (not part of the story) or Executive (already settled on clicks/returns).
- "+5.3pp 7-day return-rate lift / 17.2% click-through" kept precise in the master; rendered as "a measured retention lift" / "people actually came back" for PMM and "moved retention and cleared its guardrails" for Executive.

**Flagged but kept** (may need review):

- "Resurface: your morning reading, rediscovered" - proposed store headline in the PMM block; positioning suggestion, not a master claim, so PMM owns final wording.

## Sources and References

- Source artifact: resurface-launch-plan.md [fictional]
- **Generated:** 2026-06-20T16:20:00Z | **Skill version:** 1.0.0 | **Audiences:** PMM, CS/Support, Executive | **Input quality:** high
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral.
```
