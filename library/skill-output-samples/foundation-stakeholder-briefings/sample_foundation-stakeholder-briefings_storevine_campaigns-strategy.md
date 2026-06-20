---
title: "Stakeholder Briefings: Storevine Campaigns Strategy + Q3 OKRs"
description: "The Campaigns lean canvas plus Q3 OKR set projected to four lenses (Executive, Board/Investors, PMM, Sales) with a clear Exec-vs-Board split."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - Campaigns lean canvas + Q3 OKRs fanned out to strategy audiences, contrasting internal Exec reprioritization with the Board capital narrative
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine's Growth PM has the Campaigns strategy in two artifacts: a lean canvas (the embedded re-engagement thesis) and the Q3 OKR set that operationalizes it. The same strategy needs to reach the leadership team and the board with different framings, plus PMM and Sales who turn it into a market and pipeline story. The PM runs `foundation-stakeholder-briefings` against both artifacts and takes the strategy proposal (Executive, Board, PMM, Sales). The Exec and Board briefings must not read alike: Exec owns internal funding and reprioritization, Board owns the company strategy and capital narrative.

**Source Notes:**

- Storevine is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @campaigns-lean-canvas.md @campaigns-q3-okrs.md

Source: Campaigns lean canvas (embedded re-engagement thesis: capture the ~68%
of merchants paying for an external email tool, retention + a new paid send tier)
plus the Q3 OKR set. Q3 OKRs: weekly active senders, 90-day retention lift,
first-send rate 12% -> 30%, CTR guardrail. Strategic context: persevere decision
on Campaigns showed +18% retention for merchants who adopt it.

Audiences: take the strategy proposal (Executive, Board, PMM, Sales). Make the
Exec briefing about internal funding/reprioritization and the Board briefing
about the company strategy and capital story - they should not read alike.
```

## Output

```markdown
# Stakeholder briefings: Campaigns strategy + Q3 OKRs

## Master document

**What and why**

- M1: The Campaigns thesis is embedded re-engagement: capture the ~68% of merchants [fictional] paying for an external email tool by making lifecycle messaging native to Storevine.
- M2: The business model is two-sided: Campaigns lifts retention of the core platform and opens a new paid send tier as a revenue line.
- M3: The persevere decision validated the thesis: merchants who adopt Campaigns show +18% retention [fictional] versus comparable non-adopters.
- M11: The external email tools merchants pay for today are primarily Klaviyo and Mailchimp.

**Decisions**

- M4: Q3 prioritizes Campaigns adoption over net-new feature breadth; the activation lever (first-send) gets the build investment.

**Status**

- M5: Q3 OKRs are set: grow weekly active senders, lift 90-day retention, move first-send rate from 12% to 30% [fictional], with a click-through-rate guardrail to keep send quality honest.

**Risks and open questions**

- M6: Adoption, not capability, is the binding constraint; if first-send activation stalls, the retention and revenue thesis does not compound.
- M7: A new send tier introduces deliverability and abuse exposure at scale that does not exist today.

**Asks**

- M8: From leadership, fund the Q3 activation investment and hold the line on the Campaigns-over-breadth prioritization.
- M9: From the board, endorse embedded re-engagement as a durable retention-and-monetization wedge in the company strategy.

**Timeline**

- M10: Q3 is the proof quarter; the retention and send-tier signal reads out at the Q3 close.

## Briefings

--- BEGIN: Executive ---

**Draws on:** M3, M4, M5, M8

**Primary ask:** Fund the Q3 activation investment and hold the Campaigns-over-breadth prioritization.

**Q3 trade: pour into Campaigns activation, defer net-new breadth**

**What this means for the Executive team**

This is a reprioritization call, not a new-bet call. The Campaigns thesis is already validated internally, adopters retain +18% [fictional] better than comparable non-adopters, so the leverage in Q3 is making more merchants adopt, not building the next feature. The Q3 OKRs reflect that: grow weekly active senders, lift 90-day retention, and move first-send rate from 12% to 30% [fictional], with a CTR guardrail so we do not buy sends at the cost of quality.

What I need from you is to fund the activation investment (the first-send build work) and to hold the line when other teams push for net-new breadth this quarter. The decision is whether Q3 is the activation-focus quarter for Campaigns. If yes, the prioritization holds; if no, name what Campaigns gives up.

--- END ---

--- BEGIN: Board/Investors ---

**Draws on:** M1, M2, M3, M9, M11

**Primary ask:** Endorse embedded re-engagement as a durable retention-and-monetization wedge in the company strategy.

**Campaigns turns a retention problem into a monetization wedge**

**What this means for the Board**

The strategic logic of Campaigns is that it does double duty. It defends the core platform by pulling lifecycle messaging in-house, the work the ~68% of merchants [fictional] currently pay Klaviyo or Mailchimp to do, and it opens a usage-based send tier, so the same feature both lowers churn and adds a revenue line. That is a retention-and-monetization wedge, not a single-purpose feature.

The early evidence supports treating it as a durable wedge rather than an experiment: adopting merchants retain materially better than comparable non-adopters [fictional], which is the signal that this compounds into net revenue retention over time. The ask at the company-strategy level is your endorsement that embedded re-engagement is a wedge worth concentrating behind, so the operating plan can keep weighting toward it across quarters, not just this one.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M2, M5

**Primary ask:** Build the Q3 positioning around embedded re-engagement and the "run it where your store lives" wedge.

**Position Campaigns as the wedge, not a feature: re-engagement, built in**

**What this means for PMM**

The strategy gives you a sharper position than "we have email now." The thesis is embedded re-engagement: the reason to run lifecycle messaging inside Storevine is that your store, orders, and customers already live here, so the targeting and the data are native instead of synced. That is the differentiated message against standalone tools, and it is what justifies a paid send tier as value rather than a tax.

Anchor the Q3 positioning on that wedge and on the proof that it is working, growing weekly active senders and moving first-send rate from 12% to 30% [fictional]. Build the Q3 positioning and messaging around embedded re-engagement so the market story and the OKRs point the same direction.

--- END ---

--- BEGIN: Sales ---

**Draws on:** M1, M2, M3, M11

**Primary ask:** Lead Q3 conversations with the retention + cost-consolidation story for merchants on an external tool.

**Sellable wedge: better retention and one less bill**

**What this means for Sales**

The strategy hands you a two-part pitch that is true today. First, consolidation: merchants paying for Klaviyo or Mailchimp can run re-engagement inside Storevine and drop the separate bill, which is the natural opener for the ~68% of merchants [fictional] on an outside tool. Second, the value proof: merchants who adopt Campaigns retain better than those who do not [fictional], so this is not just a cost-cut, it is a stickier account.

Combine them into one talk track, less tool sprawl, better retention, native to the store, and aim it at the external-tool segment where the cost story lands hardest. Lead Q3 conversations with that retention-plus-consolidation story.

--- END ---

---

## Translations applied (internal)

- "+18% retention for adopters vs comparable non-adopters" kept precise for Executive; rendered as "retains materially better / compounds into net revenue retention" for the Board (capital-narrative framing) and as "stickier account" for Sales.
- "embedded re-engagement thesis" kept as the strategy term for Board and PMM; rendered for Sales as "native to the store / one less bill" (deal language).
- "new paid send tier" -> "usage-based send tier / a revenue line" for the Board; -> "value rather than a tax" for PMM positioning.
- Exec-vs-Board split made explicit: Exec block leads with the internal Q3 reprioritization decision (fund activation, defer breadth); Board block leads with the company-level wedge endorsement and capital narrative. No shared Primary ask.

**Flagged but kept** (may need review):

- "adoption is the binding constraint" (M6) and "deliverability/abuse exposure at scale" (M7) - kept in the master but not surfaced in the Board block to keep it at the strategy altitude; confirm leadership owns those risks in the Exec channel so they are not invisible to the board entirely.

## Sources and References

- Source artifact: campaigns-lean-canvas.md + campaigns-q3-okrs.md [fictional]
- **Generated:** 2026-06-20T16:55:00Z | **Skill version:** 1.0.0 | **Audiences:** Executive, Board/Investors, PMM, Sales | **Input quality:** high (lean canvas thesis plus a quantified OKR set and a validated persevere signal)
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral; Exec and Board confirmed distinct (internal reprioritization vs company-strategy endorsement).
```
