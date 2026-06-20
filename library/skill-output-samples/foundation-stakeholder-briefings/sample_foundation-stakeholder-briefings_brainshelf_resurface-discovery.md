---
title: "Stakeholder Briefings: Brainshelf Guilt-Pile Discovery"
description: "The Resurface 'guilt pile' interview synthesis projected to UX/Design, PMM, and Executive briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - the guilt-pile interview synthesis (why users save but never return) fanned out to design, product-marketing, and executive lenses to align before scoping a solution
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Dan ran seven interviews on the "guilt pile" behavior (people save articles compulsively and almost never go back), and the synthesis surfaced a clear emotional pattern: saving feels productive, the unread pile feels like debt, and there is no moment that pulls people back. Priya wants the finding to reach three audiences before anyone scopes a build: design (so the solution is shaped by the research), PMM (so the eventual story is grounded in the real emotion), and the founder (so the strategy bet is understood). The skill builds one neutral synthesis master and projects three briefings without letting any of them overclaim what seven interviews can support.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @guilt-pile-synthesis.md

guilt pile interviews (n=7) are synthesized. want to socialize before we
scope anything. need design + pmm + marco versions. don't oversell, it's
7 people. go
```

## Output

```markdown
# Stakeholder briefings: The "guilt pile" - why users save but don't return

## Master document

**What and why**

- M1: We ran 7 user interviews [fictional] to understand why Brainshelf users save content heavily but rarely read it; the saved library has become a "guilt pile."
- M2: The behavioral backdrop: users save ~47 items/month [fictional] but revisit fewer than 9% within 30 days [fictional].

**Decisions**

- M3: No solution is decided yet; this synthesis is the input to scoping. The finding points toward an external trigger rather than better organization.

**Status**

- M4: Synthesis complete; n=7 is a qualitative signal, directional not statistically representative.

**Risks and open questions**

- M5: Pattern 1 (saving = productivity): users say the act of saving feels like progress, which is exactly why the pile grows without being read.
- M6: Pattern 2 (the pile feels like debt): the unread library produces guilt and avoidance; several users said they avoid opening Brainshelf because the backlog makes them feel behind.
- M7: Pattern 3 (no return moment): no interviewee had a habit or trigger that brought them back; they returned only by accident, when they happened to open the app to save something new.
- M8: Open question: do users want fewer-but-better saves (curation), or a reason to return to what they already saved (a trigger)? The research leans toward the trigger, but it is not conclusive at n=7.

**Asks**

- M9: Agree on the problem framing (the gap is a missing return trigger, not a missing organization feature) so the next phase scopes the right thing.

**Timeline**

- M10: Synthesis socialized this week; solution scoping in the following sprint.

## Briefings

--- BEGIN: UX/Design ---

**Draws on:** M1, M3, M4, M5, M6, M7, M8

**Primary ask:** Let the three behavioral patterns (saving-as-productivity, pile-as-debt, no-return-moment) drive the next round of solution sketches, not an organization/folders direction.

**The pile isn't a sorting problem; it's a no-one-ever-comes-back problem**

**What this means for UX/Design**

The interviews (n=7, so a strong qualitative signal, not a proof) [fictional] point at something we should design directly into the next concepts. Three patterns. One, saving feels like productivity: the act of saving is the reward, which is precisely why the pile grows and never gets read. Two, the pile feels like debt: people described real guilt about the backlog, and a few said they avoid opening Brainshelf because the unread count makes them feel behind. Three, there is no return moment: nobody had a trigger that brought them back; they returned only by accident when they came in to save something new. The design implication is that better folders, tags, or search probably will not fix this, because the problem is not "I can't find my saved stuff," it is "nothing ever brings me back to it." There is one genuine open question to hold: is the want fewer-but-better saves (curation) or a reason to come back (a trigger)? Sketch toward the trigger, but keep the curation hypothesis alive enough to test.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M2, M3, M4, M5, M6

**Primary ask:** Reserve "the guilt pile" as the emotional anchor for future messaging, but hold any external claims until a solution is validated.

**The emotional truth we can eventually sell: saving feels good, the backlog feels like debt**

**What this means for PMM**

There is a real emotional story here, and it is worth capturing now even though we have nothing to launch yet. Users save constantly because saving feels productive, then the unread pile turns into a quiet source of guilt: a backlog they feel behind on, to the point that some avoid the app rather than face it. That tension (saving feels good, not-reading feels bad) is the most resonant thing the research surfaced, and "the guilt pile" is a phrase users essentially gave us. Bank it as the emotional anchor for future positioning. The caution: this is 7 interviews and no validated solution, so do not put any of this in external copy or claims yet; treat it as messaging raw material, not a campaign. Once we ship and validate a fix, this is the story we lead with.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M2, M3, M4, M7, M9

**Primary ask:** Endorse framing the problem as a missing return trigger (not a missing organization feature) before we spend a sprint scoping.

**The retention gap is a missing trigger, not a missing feature. Agree the framing before we build**

**What this means for Marco**

The interviews confirm what the metrics implied: users save a lot (~47 items/month) and almost never come back (under 9% revisited in 30 days) [fictional]. The reason is not that they cannot organize or find their saves; it is that nothing ever brings them back to read. That reframes where we invest. The temptation is to build more organization features (folders, smart collections), but the research says the bottleneck is a missing return trigger, so building organization would be solving the wrong problem. This is a qualitative read (7 interviews), so it is a direction, not a guarantee, but it is consistent and it lines up with the data. What I need from you: endorse framing this as a trigger problem before we spend a sprint scoping, so we scope toward the right bet.

--- END ---

---

## Translations applied (internal)

- "n=7, directional not statistically representative" kept explicit in every block as a hedge so no audience overclaims the sample.
- "external trigger vs organization feature" kept as the framing in the Executive block; rendered for UX/Design as "not a sorting/folders problem" and not surfaced to PMM (not their decision).
- "the guilt pile" kept as the user-voiced phrase; flagged to PMM as bankable messaging raw material, with an explicit hold on external use.

**Flagged but kept** (may need review):

- "this is the story we lead with" (PMM block) - forward-looking, contingent on a validated solution; confirm PMM reads it as conditional, not a committed launch claim.

## Sources and References

- Source artifact: guilt-pile-synthesis.md [fictional]
- **Generated:** 2026-06-20T16:30:00Z | **Skill version:** 1.0.0 | **Audiences:** UX/Design, PMM, Executive | **Input quality:** medium (n=7 qualitative; directional signal, explicitly hedged in every block)
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M10; one Primary ask each; master reviewed as audience-neutral.
```
