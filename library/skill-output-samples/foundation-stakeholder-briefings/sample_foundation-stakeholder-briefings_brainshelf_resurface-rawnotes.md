---
title: "Stakeholder Briefings: Brainshelf Resurface Slack Brain-Dump"
description: "A messy founder Slack-thread brain-dump about Resurface, classified as ambiguous and projected to the safe-default Executive, Engineering, and PMM briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - an unstructured founder Slack thread (the raw/ambiguous source type) that the skill classifies as ambiguous, then projects to the safe-default audience set with input quality flagged low
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Marco fired off a stream-of-consciousness Slack thread late at night with a tangle of Resurface ideas, half-decisions, and worries, and asked Priya to "make this make sense for the team." There is no structure, no clear source type, and a few things that read as decisions but were really musings. The skill classifies the source as raw/ambiguous, says so, and proposes the safe default audience set (Executive, Engineering, PMM) rather than guessing a richer fan-out; it sets input quality low, names the gaps, and is careful not to harden Marco's musings into master claims they are not.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings

ok brain dump from marco, make this make sense for the team:

resurface is fine but idk it feels like we're underusing it?? everyone
keeps asking for the digest to be smarter. chloe said clicks are way up
on weekends weird. maybe we do a weekly "best of your shelf" thing too.
also alex is worried mercury parser keeps choking on substack + paywalls.
jordan wants to put resurface front and center in onboarding, thinks it's
our actual hook not search. should we just lead with it everywhere??
budget is tight tho. and the apple mail open rate thing makes me not
trust any of our numbers honestly. anyway lots here. who needs to know what
```

## Output

```markdown
# Stakeholder briefings: Resurface direction - founder brain-dump (raw notes)

> Source classified as raw/ambiguous (an unstructured Slack thread, no single source type). Proposing the safe-default audience set: Executive, Engineering, PMM. All nine lenses remain available. Input quality is low: several items are musings, not decisions, and are flagged as open, not asserted.

## Master document

**What and why**

- M1: Resurface (the morning digest) is working but the founder feels it is underused and wants a view on whether to invest more in it.
- M2: Recurring signal from the team: users keep asking for the digest to be "smarter" (more relevant matching).

**Decisions**

- M3: No decisions are locked in this thread. Everything below is an open option or a concern, not a commitment.

**Status**

- M4: Resurface is live. One observed data point: click-through appears higher on weekends [fictional]; this is unexplained and not yet validated.

**Risks and open questions**

- M5: Open option: add a weekly "best of your shelf" digest alongside the daily one (raised, not decided).
- M6: Engineering concern: Mercury Parser extraction is failing on Substack and paywalled pages, hurting digest quality (raised by alex).
- M7: Open option: make Resurface the lead of onboarding, treating it as the product's real hook instead of search (raised by jordan).
- M8: Constraint: budget is tight, so any expansion competes against other work.
- M9: Trust concern: Apple Mail Privacy Protection inflates email open rate, which is making the founder distrust the metrics; the team should anchor on clicks, not opens.

**Asks**

- M10: Get the relevant teams to react to these open options and concerns so the next planning cycle can turn the strongest ones into actual decisions.

**Timeline**

- M11: No dates set in the source; this is a pre-planning prompt, not a committed plan.

## Briefings

--- BEGIN: Executive ---

**Draws on:** M1, M3, M5, M7, M8

**Primary ask:** Decide which one of "smarter matching," "weekly best-of," or "Resurface-led onboarding" gets prioritized next, given the budget constraint.

**Resurface is working; three ideas on the table and budget for roughly one. Pick the bet**

**What this means for Marco**

This is the structured version of your thread, and the honest headline is that nothing here is decided yet, which is fine, it is a pre-planning prompt. Resurface is live and working, and the open question is whether to lean into it harder. Three ideas surfaced: make the matching smarter (the most-requested thing), add a weekly "best of your shelf" alongside the daily digest, and make Resurface the lead of onboarding instead of search. With budget tight, these compete; realistically we fund about one next. The useful move is to pick which bet to pursue so the team can scope it properly, rather than carry three half-ideas. Decision needed from you: which one is the priority.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M2, M6, M9

**Primary ask:** Scope a fix or fallback for Mercury Parser failures on Substack and paywalled pages, since that is the concrete blocker behind "make the digest smarter."

**The "make it smarter" ask is partly an extraction problem: Mercury is choking on Substack and paywalls**

**What this means for Engineering**

Two related things from the founder thread land on you. The team keeps asking for the digest to be "smarter," and a chunk of that is not algorithm quality, it is extraction quality: alex flagged that Mercury Parser keeps failing on Substack and paywalled pages, which means those items either get dropped or matched on thin metadata, which feels like "dumb" matching to users. So the concrete, scopeable piece of "make it smarter" is improving extraction or a better fallback for those sources. Separately, a measurement note: do not lean on email open rate for any of this, because Apple Mail Privacy Protection inflates it; use clicks. Recommend you scope the Mercury Substack/paywall fix or fallback so the relevance ask has a real engineering target instead of a vibe.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M4, M7

**Primary ask:** Take a position on whether Resurface (not search) should be the product's lead hook, since that decision drives onboarding and positioning.

**Is Resurface the hook? Jordan thinks so; that is a positioning call before it is an onboarding change**

**What this means for PMM**

There is a positioning question buried in the founder's thread that is yours to weigh in on: jordan thinks Resurface, not search, is Brainshelf's real hook and wants it front and center in onboarding. That is a positioning decision before it is an onboarding mechanic, because leading with Resurface reframes what Brainshelf is "for" in the user's first minutes (a tool that brings your reading back to you, versus a place to save and search). There is a supporting hint in the data (click-through looks higher on weekends [fictional]), though it is unexplained and thin, so do not build a story on it yet. What would help: take a position on whether Resurface should be the lead hook, because that drives both the onboarding flow and how we describe the product.

--- END ---

---

## Translations applied (internal)

- Source classified raw/ambiguous; safe-default audience set (Executive, Engineering, PMM) proposed per the raw-notes rule; the proposal and the "all nine remain available" note are stated at the top of the master.
- Musings vs decisions: every option from the thread (weekly best-of, onboarding-led, smarter matching) is rendered as an open option (M5, M7, M2), and M3 explicitly states nothing is decided, so no briefing hardens a musing into a commitment.
- "Mercury Parser choking on Substack + paywalls" kept precise for Engineering as the concrete blocker; surfaced to Executive only folded into "smarter matching" as an option, not as a build detail.
- "Apple Mail open rate thing" interpreted as Apple Mail Privacy Protection inflating opens; rendered as "anchor on clicks, not opens" for Engineering; kept out of the PMM and Executive blocks as a measurement detail.

**Flagged but kept** (may need review):

- "click-through higher on weekends" - a single unexplained data point from the thread; kept in the master (M4) and the PMM block but explicitly labeled unvalidated so it is not used as evidence.
- Input quality is low: the source is one unstructured thread with no dates, no committed decisions, and one unexplained metric; confirm the read of "musings, not decisions" matches the founder's intent before any of this is scoped.

## Sources and References

- Source artifact: Slack thread (founder brain-dump, #product) [fictional]
- **Generated:** 2026-06-20T16:50:00Z | **Skill version:** 1.0.0 | **Audiences:** Executive, Engineering, PMM | **Input quality:** low (one unstructured Slack thread; no committed decisions or dates; musings flagged as open, not asserted)
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral; ambiguous source classified and safe-default audience set proposed.
```
