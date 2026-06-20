---
title: "Stakeholder Briefings: Brainshelf Resurface Pivot"
description: "The Resurface pivot decision (time-based digest to extension-triggered contextual) projected to Executive, Engineering, and Board/Investors briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - the Resurface trigger-model pivot fanned out to executive, engineering, and board lenses, deliberately splitting the operational go-call (Exec) from the strategy/capital narrative (Board)
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Resurface shipped as a fixed-time morning email digest, and it worked, but the data showed the highest-engagement opens came when people were already in their browser reading, not at a fixed 7:30 AM. Priya and Alex are recommending a pivot from time-based delivery to a browser-extension-triggered contextual resurface (surface a related saved item when you finish reading something on the same topic). This is a real pivot, so it needs both the internal go-call (the founder/exec room) and the strategy narrative (the next board update), and those two must read very differently: one is operational, one is thesis. The skill builds one neutral pivot master and projects Executive, Engineering, and Board/Investors so the exec block owns the reprioritize call and the board block owns the strategy story without duplicating each other.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @resurface-pivot-decision.md

pivoting resurface from time-based digest to extension-triggered
contextual (surface a related saved item when you finish reading
something). need:
- exec/marco: the actual go call
- alex/eng: what it takes to build
- board: the strategy version (make this clearly NOT the same as the exec one)
go
```

## Output

```markdown
# Stakeholder briefings: Resurface pivot - time-based digest to extension-triggered contextual

## Master document

**What and why**

- M1: We are recommending a pivot in how Resurface triggers: from a fixed-time morning email digest to a browser-extension-triggered contextual resurface that shows a related saved item the moment you finish reading something on the same topic.
- M2: The reason: the email digest validated the concept (it lifted 7-day return rate +5.3pp [fictional]), but the data shows the strongest engagement comes when the user is already reading in the browser, not at a fixed clock time.
- M10: Owning a browser extension is a new surface that puts Brainshelf into the user's daily reading path, expanding daily touchpoints beyond the app; this is the strategic upside of the pivot, distinct from its execution cost.

**Decisions**

- M3: Keep the email digest running; add the extension as the new primary contextual trigger and shift investment toward it. This is a trigger-model pivot, not abandoning Resurface.

**Status**

- M4: Email digest is live and healthy (17.2% click-through, 1.3%/week unsubscribe [fictional]); extension trigger is a proposal, not yet built.

**Risks and open questions**

- M5: A browser extension is a new platform surface with its own distribution: users must install it, and each browser (Chrome, Safari, Firefox) is a separate build and review process.
- M6: Contextual matching has to fire at the right moment without being annoying; bad timing or paywall-detection misses (surfacing items on a page that is itself paywalled) would erode trust fast.
- M7: This deepens Brainshelf's differentiation versus Readwise, Raindrop, and Omnivore by moving from "another inbox" to "resurfacing inside your actual reading flow," but it raises execution cost and adoption depends on extension install rate.

**Asks**

- M8: Approve reprioritizing the next two sprints toward the extension trigger while keeping the email digest in maintenance.

**Timeline**

- M9: If approved, extension spike + Chrome build over the next two sprints; Safari/Firefox follow; email digest stays live throughout.

## Briefings

--- BEGIN: Executive ---

**Draws on:** M1, M2, M3, M5, M7, M8, M9

**Primary ask:** Approve reprioritizing the next two sprints to the extension trigger, keeping the email digest in maintenance.

**Keep the email, build the better trigger: contextual resurface in the browser. Need a reprioritize**

**What this means for Marco**

Resurface works (the email digest lifted retention +5.3pp [fictional]), but the data tells us why it works: people engage most when they are already reading in the browser, not at a fixed time of day. So the recommendation is to pivot the trigger, not the feature: keep the email digest running in maintenance, and put the next two sprints into a browser extension that resurfaces a related saved item right when you finish reading something on the same topic. This is an internal reprioritization call, not a strategy reset; the email keeps earning its keep while we build the stronger trigger. The trade-off is real: an extension is a new surface users have to install and a separate build per browser, so it costs more and adoption is not guaranteed. What I need: approve shifting the next two sprints to the extension while email stays maintained.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M1, M3, M5, M6, M9

**Primary ask:** Confirm a one-sprint extension spike (Chrome first) to de-risk contextual matching and paywall detection before committing the full build.

**New surface: browser extension, per-browser builds, and the hard part is firing at the right moment**

**What this means for Engineering**

The pivot keeps the existing email pipeline (it stays live in maintenance) and adds a browser extension as the new contextual trigger: when a user finishes reading an article, the extension surfaces a related saved item on the same topic. Two things make this materially different from the email work. First, distribution and platform: this is a new surface with its own lifecycle, and Chrome, Safari, and Firefox are three separate builds and review processes, so we sequence Chrome first. Second, the genuinely hard part is the moment of firing: contextual matching has to detect the page topic, match it against the user's saved library, and surface at a non-annoying time, and it has to handle paywall detection so we never surface a resurface card on top of (or pointing into) a paywalled page. Recommend we confirm a one-sprint spike on Chrome to de-risk the matching trigger and paywall detection before committing the full multi-browser build.

--- END ---

--- BEGIN: Board/Investors ---

**Draws on:** M2, M3, M7, M10

**Primary ask:** Endorse the strategic shift from "saved-content inbox" to "resurfacing inside the reading flow" as the engagement-and-retention thesis for the next phase.

**From another inbox to inside the reading flow: deepening the retention moat**

**What this means for the Board**

The retention thesis is playing out. Our first re-engagement bet (the morning email digest) validated that resurfacing saved content drives users back, and now the data points to a sharper version of the same thesis. The next move is to resurface content inside the user's actual reading flow via a browser extension, rather than as one more email in a crowded inbox. Strategically this matters for two reasons. It deepens differentiation: the read-later category (Readwise, Raindrop, Omnivore) competes on saving and on inboxes, while resurfacing in-context, at the moment of relevance, is a harder-to-copy engagement loop and a stronger retention moat. And it owns a new surface: a browser extension puts Brainshelf in the user's daily reading path, expanding daily touchpoints beyond the app. This is an additive evolution of the strategy, not a reset; the validated channel keeps running while we build the differentiated one. The endorsement we are seeking is for the direction, treating in-context resurfacing as the engagement-and-retention thesis for this phase.

--- END ---

---

## Translations applied (internal)

- Exec vs Board split made explicit: the Executive block owns the operational reprioritize-the-sprints call (M8); the Board block owns the strategy/moat narrative (M7) and never asks for a sprint decision. Both draw on M2/M3 but lead with different decisions.
- "+5.3pp retention lift / 17.2% click-through" kept precise in the master; rendered as "lifted retention +5.3pp" for Exec, and as "validated that resurfacing drives users back" (no numbers) for the Board.
- "paywall detection / contextual matching / per-browser builds" kept precise for Engineering; collapsed to "costs more, separate build per browser" for Exec; omitted from the Board block (execution detail, not thesis).

**Flagged but kept** (may need review):

- "retention moat" (Board block) - investor-register framing of M7's differentiation claim; confirm it does not overstate defensibility beyond what the differentiation point supports.

## Sources and References

- Source artifact: resurface-pivot-decision.md [fictional]
- **Generated:** 2026-06-20T16:40:00Z | **Skill version:** 1.0.0 | **Audiences:** Executive, Engineering, Board/Investors | **Input quality:** high
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M10; one Primary ask each; master reviewed as audience-neutral; Exec and Board verified to lead with different decisions.
```
