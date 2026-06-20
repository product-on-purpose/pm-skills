---
title: "Stakeholder Briefings: Brainshelf Resurface A/B Results"
description: "The email-vs-in-app Resurface A/B results projected to Data/BI, Executive, and PMM briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - the email-digest-vs-in-app-card A/B experiment results fanned out to the data, executive, and product-marketing lenses after the test concluded
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Resurface A/B test compared the email digest against an in-app card, and the email arm won on click-through. Chloe wrapped the analysis and Priya needs the same result to reach three very different rooms: the data team (who owns the read and the caveats), the exec/founder room (who owns the ship/kill call), and PMM (who owns whether and how this becomes a story). The skill builds one neutral master from the results and projects three briefings so the headline number does not drift between the dashboard, the founder update, and the launch narrative.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @resurface-ab-results.md

email vs in-app a/b is done, email won on clicks. need 3 versions:
- chloe/data (the real read + caveats)
- marco (ship or not)
- pmm (is there a story here)
go
```

## Output

```markdown
# Stakeholder briefings: Resurface email-vs-in-app A/B results

## Master document

**What and why**

- M1: We ran a 4-week A/B test pitting the email morning digest against an in-app "resurface" card, to learn which trigger mechanism best brings users back to saved content.
- M2: The decision this informs is which trigger to invest in for Resurface v1: email, in-app, or both.

**Decisions**

- M3: Email is the winning arm and the one we recommend shipping; the in-app card underperformed as a standalone trigger because it only reaches users who already opened the app.

**Status**

- M4: Email digest click-through was 17.2% [fictional] vs the in-app card's 6.4% [fictional]; email drove a +15% relative lift in click-through over the in-app arm [fictional].
- M5: The email arm lifted 7-day return rate to 23.4% [fictional] vs 18.1% control [fictional], a +5.3pp gain (p = 0.008 [fictional]); the in-app arm moved return rate only +0.9pp [fictional], not significant.
- M6: All guardrails held: unsubscribe 1.3%/week [fictional], no rise in app uninstalls, no drop in save rate.

**Risks and open questions**

- M7: Open rate is unreliable because Apple Mail Privacy Protection inflates email opens, so the read leans on clicks and downstream return-visits, not opens.
- M8: The window is 4 weeks, so the return-rate lift is directionally durable (it rose week over week) but not yet proven beyond ~8-12 weeks at scale.
- M9: The in-app card is not dead as a concept; its structural weakness is that it cannot be an external trigger, which is the original reason it was deprioritized.

**Asks**

- M10: Approve shipping the email digest as the Resurface v1 trigger and greenlighting the v1.1 narrative.

**Timeline**

- M11: Decision Apr 11; phased rollout to all eligible users mid-April; public announcement targeted late April.

## Briefings

--- BEGIN: Data/BI ---

**Draws on:** M1, M4, M5, M6, M7, M8

**Primary ask:** Confirm the click-and-return read (not opens) is the official result of record before it propagates to the founder and PMM versions.

**Email beats in-app on clicks and return rate; opens excluded by design**

**What this means for the Data team**

The test cleanly separates the two triggers. Email click-through was 17.2% [fictional] against the in-app card's 6.4% [fictional], a +15% relative lift [fictional]. On the primary outcome, the email arm lifted 7-day return rate to 23.4% [fictional] vs 18.1% control [fictional] (+5.3pp, p = 0.008 [fictional]), while the in-app arm moved it only +0.9pp [fictional] and did not reach significance. Guardrails held: unsubscribe 1.3%/week [fictional], no uninstall increase, no save-rate drop. Two caveats to carry forward as the result of record. First, Apple Mail Privacy Protection inflates email opens, so we report clicks and return-visits, never opens, as the success signal. Second, the 4-week window makes the lift directional (it grew week over week) but not yet a scale-and-duration proof; an 8-12 week recheck is warranted. Please confirm this is the canonical read, because the exec and PMM briefings project from it.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M2, M3, M5, M6, M10

**Primary ask:** Approve shipping the email digest as the Resurface v1 trigger.

**Email digest wins; it moves retention and clears every guardrail. Recommend ship**

**What this means for Marco**

We tested two ways to pull users back to saved content: a morning email digest and an in-app card. Email is the clear winner. It lifted 7-day return rate by 5.3 points (to 23.4% from 18.1% control) [fictional], a statistically significant result, while the in-app card barely moved the needle. Every guardrail held: unsubscribes low, no uninstall bump, no drop in saving. This is the strongest experiment result we have had, and it directly advances the retention goal. The recommendation is to ship the email digest as the v1 trigger and roll it out to all eligible users. Decision needed from you: approve ship.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M3, M5, M10

**Primary ask:** Greenlight a "your saved articles, resurfaced" narrative for the v1.1 launch and start the messaging.

**There is a real story: the morning email that gets people back to what they saved**

**What this means for PMM**

We have a clean, defensible story to tell. We tested an email digest against an in-app card and the email won decisively, lifting 7-day return rate by 5.3 points [fictional]. The hook writes itself: the saved-article guilt pile becomes a morning reading habit, delivered to your inbox, matched to what you have been reading. That positions Resurface against Readwise, Raindrop, and Omnivore on the one thing they make you work for: actually coming back to what you saved. The narrative is "your library, resurfaced for you each morning," and the proof point is a measured retention lift, not a feature list. Greenlight the v1.1 narrative so messaging is ready for the late-April announcement; the experiment gives us the credibility line to lead with.

--- END ---

---

## Translations applied (internal)

- "+5.3pp lift, p = 0.008" kept precise for Data and Executive; softened to "lifted retention by 5.3 points" for PMM (no p-value, benefit-led) *(audience: PMM)*.
- "Apple Mail Privacy Protection inflates opens" kept precise for Data; rendered as the implicit reason the Executive and PMM blocks lead with clicks/return rate, not opens (not surfaced as jargon to either).
- "in-app arm not significant (+0.9pp)" kept for Data; collapsed to "barely moved the needle" for Executive; omitted from PMM (the loss is not part of the story).

**Flagged but kept** (may need review):

- "your saved articles, resurfaced" - draft narrative line in the PMM block; it is a positioning suggestion, not a master claim, so confirm PMM owns final wording.

## Sources and References

- Source artifact: resurface-ab-results.md [fictional]
- **Generated:** 2026-06-20T16:10:00Z | **Skill version:** 1.0.0 | **Audiences:** Data/BI, Executive, PMM | **Input quality:** high
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral.
```
