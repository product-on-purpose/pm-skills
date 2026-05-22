---
title: "Customer Journey Map"
description: "Produce a customer journey map covering stages, touchpoints, emotional curve, pain points, moments of truth, and opportunity annotations. Output is a markdown artifact that may include mermaid timeline / flowchart visualization. Supports both linear journey (start to end) and cyclical journey (recurring engagement loops). Refuses to fabricate emotional or behavioral data without research input."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Discover
  - research
---

:::note[Quick facts]
**Phase:** Discover | **Version:** 1.0.0 | **Category:** research | **License:** Apache-2.0
:::

**Try it:** `/journey-map "Your context here"`

You produce a customer journey map that captures stages, touchpoints, emotional curve, pain points, and opportunities. Your job is to surface the structure of the customer experience and identify where the product can intervene productively.

## How to Use

Use the `/journey-map` slash command:

```
/journey-map "Your context here"
```

Or reference the skill file directly: `skills/discover-journey-map/SKILL.md`

## Output Template

# Customer Journey Map: [Persona] - [Goal]

## Executive Summary
<!-- 3-5 sentences: who the journey is FOR, what they want to accomplish, biggest pain points and opportunities, the single most important moment of truth -->

[Summary]

## Persona / Segment
<!-- 1 paragraph. Reference an existing persona artifact if one exists, else summarize key attributes -->

[Persona summary]

## Journey Scope

- **Journey type:** [Linear | Cyclical | Multi-actor]
- **Included:** [What phase / lifecycle this map covers]
- **Excluded:** [What is deliberately out of scope]

## Stages
<!-- 3-7 stages. Use customer-language verb names: Discovers, Considers, Tries, Decides, Uses, Renews -->

| # | Stage | Customer goal | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | [Discovers] | [Goal] | [Time] | [Trigger] | [Exit] |
| 2 | [Considers] | [Goal] | [Time] | [Trigger] | [Exit] |
| 3 | [Tries] | [Goal] | [Time] | [Trigger] | [Exit] |

## Touchpoints per Stage

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| [Discovers] | [Touchpoint] | [Channel] | [Interaction] |

## Emotional Curve
<!-- Specific emotion labels, not happy/sad. Every entry needs a confidence label and a source, or is marked Hypothesis (Confidence: Low) -->

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| [Discovers] | [Emotion] | [High/Medium/Low] | [Research evidence, or "Hypothesis"] |

## Pain Points and Moments of Truth
<!-- Moments of truth = the 3-5 moments that decide continue-vs-abandon, NOT every interaction -->

| Stage | Pain / Moment of Truth | Severity (1-5) | Customer evidence | Implication |
|---|---|---|---|---|
| [Stage] | [Pain or MoT] | [1-5] | [Evidence] | [What it means] |

## Opportunities
<!-- 1-3 per stage. Each ties to a specific pain point or moment of truth above -->

| Stage | Opportunity | Product change that addresses it | Effort (rough) |
|---|---|---|---|
| [Stage] | [Opportunity] | [Change] | [Small/Medium/Large] |

## Visual

### Linear journey (mermaid timeline)
<!-- Use for start-to-end journeys -->

```
timeline
    title [Persona] Journey
    [Discovers] : [touchpoint] : [touchpoint]
    [Considers] : [touchpoint]
    [Tries] : [touchpoint]
    [Decides] : [outcome]
```

### Cyclical journey (mermaid flowchart)
<!-- Use for recurring engagement loops; show the return edge back to an earlier stage -->

```
flowchart LR
    A[Onboards] --> B[Uses]
    B --> C[Reviews / QBR]
    C --> D[Renews]
    D --> B
```

<!-- For 5+ stages, also add focused sectional diagrams to avoid crowding. -->

### Multi-actor journey (advanced)
<!-- For journeys with multiple personas (e.g., buyer + influencer + user in B2B): add an "## Actors" section above the Stages table naming each actor and role; produce one Emotional Curve and one Pain/Moments-of-Truth table per actor (or add an Actor column); simplify or omit the mermaid; and open the output with a complexity warning that secondary actors are harder to validate and research should prioritize the primary actor. -->

## Research Gaps
<!-- What the map does NOT address because data is unavailable, and what follow-up research would close the most important gaps -->

- [Gap 1 and the research that would close it]
- [Gap 2]

## Example Output

<details>
<summary>Customer Journey Map: First-Time Meal-Kit Subscriber - "From First Box to Habit"</summary>

# Customer Journey Map: First-Time Meal-Kit Subscriber - "From First Box to Habit"

> The interview counts, survey figures, emotions, and quotes below are illustrative `[fictional]`. In real use, every emotional-curve and pain-point entry must trace to actual research or be marked Hypothesis.

## Executive Summary

This map covers a first-time meal-kit subscriber from initial discovery through the decision to continue or cancel after the first delivery cycle. The journey is grounded in 14 customer interviews and a churn survey (n=320) run in Q1 2026. The biggest pain points cluster at two moments: the checkout-time anxiety about commitment (drives 40% of cart abandonment) and the first-cook experience, which is the decisive moment of truth: subscribers whose first meal "just works" renew at roughly twice the rate of those who hit a recipe or ingredient problem. The largest opportunity is de-risking the first cook.

## Persona / Segment

Busy dual-income household cook, 28-42, time-constrained on weeknights, cooks 3-4 times a week but tired of decision fatigue around "what's for dinner." Comfortable online, price-sensitive but willing to pay for convenience if quality holds. Not a culinary hobbyist: wants reliable, fast, low-skill meals. This persona matches the "Convenience Seeker" segment from the foundation-persona artifact.

## Journey Scope

- **Journey type:** Linear
- **Included:** Discovery through the first renew-or-cancel decision (roughly a 3-week window: discovery to end of first delivery cycle)
- **Excluded:** Long-term loyalty, win-back of churned subscribers, gifting flows. Those are separate journeys.

## Stages

| # | Stage | Customer goal | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | Discovers | Find a way to reduce weeknight dinner stress | Minutes | Sees ad / referral / press mention | Clicks through to the site |
| 2 | Considers | Decide if this is worth trying | 1-3 days | Lands on pricing / menu page | Starts checkout or leaves |
| 3 | Orders | Commit to a first box without overcommitting | 10-20 min | Begins checkout | First box order confirmed |
| 4 | First Cook | Cook and eat the first meals successfully | 3-5 days | Box arrives | First meal eaten (well or badly) |
| 5 | Decides | Judge whether to keep the subscription | 1-2 days | Approaching second-box charge | Renews or cancels |

## Touchpoints per Stage

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| Discovers | Social ad / referral link | Social, word of mouth | Sees a discounted-first-box offer |
| Considers | Menu + pricing page | Web | Scans recipes, looks for the catch in the pricing |
| Considers | FAQ / cancellation policy | Web | Checks how hard it is to cancel |
| Orders | Checkout flow | Web / app | Picks plan size, meals, delivery day |
| Orders | Confirmation + delivery ETA | Email | Gets order summary and arrival window |
| First Cook | Box unboxing | Physical | Finds ingredients, recipe cards, ice packs |
| First Cook | Recipe card / app step-by-step | Print / app | Follows cooking instructions |
| Decides | Pre-charge reminder | Email / push | Reminded the next box is about to bill |
| Decides | Account / skip-or-cancel screen | Web / app | Renews, skips, or cancels |

## Emotional Curve

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| Discovers | Curiosity, mild skepticism ("too good to be true") | Medium | 14 interviews; 9 mentioned doubt about hidden costs |
| Considers | Anxiety about commitment | High | Churn survey (n=320): 40% of abandoners cited "didn't want to be locked in" |
| Orders | Cautious optimism, relief at picking a small plan | Medium | 14 interviews; recurring "started with the smallest box" pattern |
| First Cook | Either delight or frustration (bimodal) | High | Interviews split sharply on first-cook outcome |
| Decides | Confidence (if first cook worked) or buyer's remorse (if not) | High | Renewal data correlates with self-reported first-cook success |

## Pain Points and Moments of Truth

| Stage | Pain / Moment of Truth | Severity (1-5) | Customer evidence | Implication |
|---|---|---|---|---|
| Considers | Commitment anxiety / fear of hard cancellation | 4 | 40% of abandoners | Make flexibility loud and early; surface "skip or cancel anytime" before checkout |
| Orders | Plan-size and meal-choice overwhelm | 3 | 6 of 14 interviewees hesitated here | Offer a "recommended starter box" default |
| First Cook | First meal succeeds and tastes good | Moment of Truth (5) | Renewers ~2x more likely to report a clean first cook | This is the decisive moment; protect it above all |
| First Cook | Missing or spoiled ingredient | 5 | 4 of 14 hit this; all 4 considered canceling | A single failure here can sink the whole subscription |
| Decides | Surprise second-box charge | 4 | Churn survey: "didn't realize it would auto-bill" | Pre-charge reminder must be unmissable |

## Opportunities

| Stage | Opportunity | Product change that addresses it | Effort (rough) |
|---|---|---|---|
| Considers | Defuse commitment anxiety | Add "skip or cancel anytime, no fee" banner above the checkout button | Small |
| Orders | Reduce choice overwhelm | Pre-select a "Convenience Seeker starter box" the user can edit | Medium |
| First Cook | Guarantee first-cook success | Make the first recipe the simplest on the menu by default; add a 60-second "start here" video | Medium |
| First Cook | Catch ingredient failures fast | One-tap "something's missing" button that issues an instant credit + replacement | Medium |
| Decides | Remove charge surprise | Send the pre-charge reminder 48h ahead with a one-tap skip | Small |

## Visual

```
timeline
    title First-Time Meal-Kit Subscriber Journey
    Discovers : Sees ad : Clicks offer
    Considers : Scans menu : Checks cancellation policy
    Orders : Picks starter box : Confirms first delivery
    First Cook : Unboxes : Cooks first meal (moment of truth)
    Decides : Pre-charge reminder : Renews or cancels
```

## Research Gaps

- The map is grounded in subscribers who completed at least the first order; it has no signal on people who abandoned at the ad click. A top-of-funnel study would close this.
- First-cook success is self-reported in interviews. Instrumenting an in-app "how did it go?" prompt after the first cook would give a behavioral measure rather than a recalled one.
- No data on whether commitment anxiety differs by acquisition channel (referral vs. paid ad). A segmented follow-up survey would test this.

</details>

## Real-World Examples

See this skill applied to three different product contexts:

<details>
<summary>Storevine (B2B): Storevine B2B inventory-forecasting platform - mid-market e-commerce buying group from vendor research to annual renewal</summary>

**Prompt:**

```
/journey-map

map the full procure-to-renew journey for storevine (B2B AI inventory
forecasting, sold to mid-market e-commerce, 200-2000 employees).

it's a buying group, not one buyer:
- Ops manager = champion, lives in the forecasting pain daily
- Finance = approves the budget, cares about ROI and contract terms
- IT = owns the data integration and security review, can veto

stages: discovers -> evaluates (RFP + demo) -> pilots -> decides
(contract) -> onboards (data integration) -> uses (monthly forecast
cycle, recurring) -> renews (annual review, recurring).

the scary transition is pilot -> onboarding: the pilot uses clean sample
data and looks great, then real data integration is messy and the
accuracy people were promised wobbles. that's where trust is won or lost.

multi-actor, so use parallel tables per actor. the usage + renewal stages
are cyclical.
```

---

**Output:**

# Customer Journey Map: Storevine Procure-to-Renew - Multi-Actor Buying Group

> Multi-actor journey. Primary actor: Ops manager (well-researched). Secondary actors: Finance and IT (lighter signal, more Hypothesis entries). Validate the secondary tracks before acting on them.

</details>

<details>
<summary>Brainshelf (Consumer): Brainshelf AI book-curation subscription - avid reader from discovery to subscribe to weekly habit</summary>

**Prompt:**

```
/journey-map

map the first-time subscriber journey for brainshelf. it's an AI book
recommendation subscription for serious readers who hate generic amazon/
goodreads recs. persona is an avid reader (30-50, reads 2-4 books/month)
who's tired of bad recommendations.

we did 8 interviews with target readers. key signals:
- people are skeptical that "another algorithm" will do better
- the moment that hooks them is the first rec that's genuinely great and
  not obvious - something they'd never have found themselves
- a few said they'd churn fast if week 2-3 recs got generic
- the readers who stuck around started recommending it to friends unprompted

scope it discovery -> subscribe -> weekly habit -> referral. linear, but
the weekly-use part is a recurring loop. include a mermaid timeline.
```

---

**Output:**

# Customer Journey Map: Brainshelf First-Time Subscriber - "From Skeptic to Evangelist"

</details>

<details>
<summary>Workbench (Enterprise): Workbench internal dev-experience platform - new engineer from pre-day-1 to independent contribution</summary>

**Prompt:**

```
/journey-map

map the new-engineer onboarding journey so we can decide where to invest
dev-experience effort. persona is a newly hired software engineer.

stages: pre-day-1 (offer accepted, paperwork) -> day-1 (laptop + accounts)
-> week-1 (orientation + exploring the codebase) -> month-1 (first PR
merged) -> month-3 (owns a feature independently).

we have an onboarding survey (n=22 recent hires) + 5 interviews. the
recurring theme is tooling/access friction: env setup takes days, access
requests bounce around, docs are stale. the high point everyone remembers
is their first merged PR.

linear journey. include a mermaid timeline. recommendations should be
dev-experience investments.
```

---

**Output:**

# Customer Journey Map: New Engineer Onboarding - "From Offer to Ownership"

</details>

## Quality Checklist

Before finalizing, verify:

- [ ] Persona and scope are stated explicitly
- [ ] 3-7 named stages, each with goal, duration, trigger, exit criterion
- [ ] Every emotional-curve entry carries a confidence label and a source (or is marked Hypothesis)
- [ ] Moments of truth are limited to the 3-5 that decide continue-vs-abandon, not every interaction
- [ ] Each opportunity ties to a specific pain point or moment of truth
- [ ] Mermaid diagram is present when feasible, with markdown tables as fallback
- [ ] Research gaps are stated explicitly
