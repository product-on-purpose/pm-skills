---
title: "Develop Design Rationale: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns audience selection UX design decision."
artifact: design-rationale
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns audience selection UX design decision
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

During the Campaigns pre-sprint design review, the design team and growth PM debated three approaches to the audience selection experience . the step where a merchant defines who receives a campaign. The decision is consequential: it is the step that most commonly causes abandonment in competing tools and the one where Campaigns has the clearest opportunity to differentiate on simplicity for non-adopter merchants.

**Source Notes:**

- Nielsen Norman Group, "Progressive Disclosure" (nngroup.com/articles/progressive-disclosure/) . establishes that presenting simpler options by default while keeping advanced functionality accessible on demand reduces task abandonment without limiting power users, the core design principle applied in the selected option.
- Mailchimp Help Center, "Create a Segment" (mailchimp.com/help/create-and-send-to-a-segment/) . documents Mailchimp's hybrid audience selection approach (pre-built conditions alongside a custom filter builder), confirming that the named-segment-plus-custom-filter model is validated in the email marketing product category.
- Baymard Institute e-commerce UX research (baymard.com) . documents that the number of required configuration steps before task completion is the leading driver of form abandonment in commerce workflows, validating the decision to minimize required fields in the default audience selection path.

---

## Prompt

```
develop-design-rationale

Project: Campaigns . native email marketing for Storevine merchants
Decision: Audience selection UX for the campaign creation flow
Stage: Pre-sprint design review . finalizing Figma specs before engineering

Decision I need to document:
- We debated 3 audience selection approaches before the design review:
  A. Custom filter builder (SQL-like nested conditions, matches Klaviyo)
  B. Pre-built named segments only (curated list, no customization)
  C. Pre-built segments as default + custom filter as secondary option
- We chose Option C after design review with PM, design lead, and eng lead

Context:
- Primary target segment: non-adopter merchants (no current email tool)
- Interview data: 3 of 8 merchants cited setup complexity as the barrier
- Figma link: [internal . Campaigns audience selection v3 spec]

Need: full design rationale document for the engineering handoff package.
Decision makers: Design Lead, Growth PM, Engineering Lead.
```

---

## Output

# Design Rationale: Campaigns Audience Selection UX

## Decision Summary

**Decision:** Use pre-built named segments as the primary audience selection UI for Campaigns v1, with a custom filter builder accessible as a secondary path for merchants who need it, rather than building a full custom filter interface as the default or restricting the product to pre-built segments with no customization.
**Date:** February 14, 2026
**Decision Makers:** Design Lead, Growth PM, Engineering Lead
**Status:** Accepted

---

## Context

### Problem Statement

Audience selection . choosing which customers receive a campaign . is the step in email marketing workflows where non-expert users most commonly abandon. In merchant interviews, P3, P6, and P8 all described email marketing as "overwhelming" or impossible to start; competitive analysis confirmed that Klaviyo's segment builder, while powerful, is one of the primary barriers to adoption for merchants who are not data analysts. The Campaigns v1 audience selection UX must serve the non-adopter merchant (primary v1 target) without excluding merchants who need more control than a pre-built list provides.

### User Need

Non-adopter merchants need to identify a reasonable audience for their first email campaign without needing to understand database-style filtering logic or export and reimport customer data. The key user need is: "I want to send this campaign to the right people . customers who bought recently, or who haven't bought in a while . without needing to define what 'recently' means in a filter interface I've never seen before." At the same time, merchants with existing email programs who are evaluating Campaigns as a Mailchimp alternative need the ability to build custom segments for their specific use cases.

### Constraints

| Constraint Type | Description |
|-----------------|-------------|
| Technical | The custom filter builder requires a query builder component that Engineering Lead estimated at L effort [fictional] standalone; building it as a secondary option in the same sprint is feasible only if the primary path (named segments) carries the majority of the implementation |
| Business | v1 GA timeline is April 28, 2026; scope that exceeds Q2 squad capacity must be deferred |
| Timeline | Sprint planning is March 3; Figma specs must be finalized by February 27 for engineering handoff |
| Resources | Two product squads [fictional]; design has one designer allocated to Campaigns |
| Brand/Platform | Storevine admin design system uses disclosure patterns consistently; showing advanced options in a secondary panel is an established convention |

### Design Principles Applied

- **Designed for the first send, not the hundredth:** The default experience optimizes for a merchant who has never sent an email campaign; power features are available but never mandatory.
- **Power is always accessible, never forced:** Advanced functionality is one interaction away, not buried or removed . merchants who need it can find it without the default experience being cluttered by it.

---

## Options Considered

### Option A: Custom Filter Builder (Primary)

**Description:** The default audience selection experience presents a filter builder interface where merchants define their audience by combining conditions (e.g., "Customer > purchased > in the last > 90 days"). Conditions can be nested with AND/OR logic. This mirrors the primary segment interface in Klaviyo and Mailchimp.

**Pros:**
- Maximum flexibility . any segment a merchant can express in purchase history, order count, or engagement can be built
- Familiar to merchants who have used Klaviyo and are evaluating Campaigns as a replacement
- No opinionated curation required . design and product do not need to decide which named segments are "right"

**Cons:**
- Highest complexity for first-time users . requires understanding of AND/OR logic and filter condition syntax before sending a single campaign
- Engineering effort is highest of the three options: query builder component, validation, and UI is L effort [fictional] standalone
- Contradicts the core v1 design principle of serving non-adopters who cited setup complexity as their barrier to email marketing

---

### Option B: Pre-Built Named Segments Only

**Description:** The audience selection step presents a fixed list of curated, named segments: "All customers," "Customers who purchased in the last 90 days," "Customers who haven't ordered in 6 months," "First-time buyers," and "VIP customers (5+ orders)" [fictional]. Merchants cannot modify these definitions or create custom segments.

**Pros:**
- Minimum complexity . the merchant makes one selection from a short list and moves on
- Fastest to build and design; no query builder component required
- Best match for the non-adopter use case: the most common first-campaign audiences are covered by the curated list

**Cons:**
- No flexibility for merchants with specific segment needs: a merchant who wants "customers who bought Product X but not Product Y" cannot build that segment
- Any segment not on the curated list is inaccessible until v2, which limits Campaigns' usefulness for merchants with even moderate sophistication
- Positions Campaigns below Mailchimp's segmentation capability, which offers basic custom conditions on all paid tiers

---

### Option C: Pre-Built Named Segments + Custom Filter (Selected)

**Description:** The default audience selection experience presents the curated named segment list (same as Option B). Below the segment list, a "Build a custom segment" disclosure link opens a lightweight custom filter panel where merchants can combine up to 3 purchase-behavior conditions using AND logic. The custom filter panel uses simpler language than a full query builder ("Customers who [purchased / haven't purchased] [in the last X days / more than X days ago]") and does not support OR conditions or nested logic in v1.

**Pros:**
- Serves the primary use case (non-adopters) with the same simplicity as Option B
- Gives merchants who need more control a path to custom segments without requiring the full query builder complexity of Option A
- Progressive disclosure pattern: the custom filter is accessible but not visible in the default flow . non-adopters who do not need it will never see it
- Engineering effort is lower than Option A because the custom filter panel uses limited AND-only conditions, not a full query builder component

**Cons:**
- More complex to design than Option B; the disclosure pattern requires a second UI state that must be tested on mobile viewports
- The simplified custom filter (AND-only, no nested conditions) will not satisfy merchants who need the full expressive power of Klaviyo's segment builder . those merchants are not the v1 target, but they may still evaluate and reject Campaigns on this basis

---

## Evaluation

### Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Non-adopter usability | High | How easily can a merchant with no email marketing experience complete audience selection on their first campaign? |
| Flexibility for moderate users | Med | Can merchants with basic segment needs (time-based, purchase-based) build what they need without the curated list? |
| Engineering effort | Med | How much development work is required to implement and ship within Q2 squad capacity? |
| Competitive adequacy | Low | Does the implementation meet the minimum bar for merchants evaluating Campaigns against Mailchimp? |

### Comparison Matrix

| Criterion | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Non-adopter usability | Low | High | High |
| Flexibility for moderate users | High | Low | Med |
| Engineering effort | High | Low | Med |
| Competitive adequacy | High | Low | Med |

### User Research Input

- Interview data: 3 of 8 merchant participants (P3, P6, P8) abandoned email marketing due to setup complexity; none of these participants described needing custom segment logic . they simply could not get started with a blank filter interface.
- Competitive analysis: Mailchimp's hybrid approach (named conditions + custom filters) is the documented standard in the SMB email category; Campaigns Option C is consistent with this approach and does not position Campaigns below Mailchimp's baseline capability.

---

## Decision Rationale

### Why Option C?

Option C is the only choice that serves the non-adopter primary target at full quality without foreclosing the secondary use case of moderate-sophistication merchants who need a segment the curated list does not cover. Option B would have been acceptable if Campaigns were solely targeting merchants who have never sent an email . but the merchant interview cohort includes merchants like P2 (Mailchimp user considering a switch) who have specific segment needs, and a product that cannot accommodate a time-based custom segment will lose these evaluators at the audience selection step.

### Key Differentiators

Option A was eliminated primarily on the non-adopter usability criterion . the evidence from merchant interviews is clear that a filter builder as the first thing a non-adopter sees in the audience selection step will reproduce the same abandonment pattern that Klaviyo and Mailchimp create. Option B was eliminated on the flexibility criterion . the curated segment list covers 80% [fictional] of common v1 use cases but leaves a visible gap for merchants with moderate needs, and naming that gap in the competitive evaluation would be a liability. Option C accepts the incremental engineering and design cost (Med vs. Low) in exchange for serving both populations without compromise.

### Dissenting Opinions

The Engineering Lead's initial preference was Option B on the grounds that the simpler implementation reduces build risk in a sprint that already carries the attribution webhook integration as a medium-effort item. This preference was noted and addressed by reducing the custom filter panel scope . AND-only conditions, no nested logic, no OR operators . to bring the engineering effort below the original estimate for a full query builder. The simplified custom filter panel was re-estimated at S effort [fictional] and the Engineering Lead accepted the updated scope in the design review.

---

## Trade-offs Accepted

### What We Gave Up

| Trade-off | Impact | Why Acceptable |
|-----------|--------|----------------|
| Full segment expressiveness (OR logic, nested conditions) | Merchants who need complex segments (e.g., "bought X OR bought Y but not Z") cannot build them in v1 | These merchants are predominantly Klaviyo power users who are not the v1 target; the custom filter meets the moderate-sophistication use case, and OR/nested conditions are a clear v2 scope item |
| Merchant-defined segment naming and saving | Merchants cannot save custom segments for reuse in v1; each campaign requires re-building the custom filter | Acceptable for v1 use volume; segment saving is a v2 roadmap item contingent on measuring how often merchants rebuild the same custom filter |

### Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Disclosure pattern not discovered by non-adopters who could benefit from custom segments | Low | The disclosure link copy will be tested in usability testing before GA; if discovery rates are low, the link can be promoted to a visible secondary button without a schema change |
| Custom filter panel creates support ticket volume from merchants trying to reproduce Klaviyo-style segments | Low | Support FAQ will document the AND-only limitation clearly; the named segment library covers the most common Klaviyo segment patterns used by merchants in the interview cohort |

---

## Reversibility

**Is this decision reversible?** Yes, with effort

**Cost to reverse:** Promoting the custom filter panel to a full query builder with OR logic and nested conditions would require redesigning the filter UI and re-implementing the query builder component . estimated M-L engineering effort [fictional]. The named segment list is easy to extend; removing it and replacing it with a custom filter default would require user communication and onboarding copy updates.

**Conditions that would warrant reverting:**
- Post-GA data shows that fewer than 10% [fictional] of merchants use named segments and that the majority of segment-related support tickets are from merchants who cannot build what they need with the current options . indicating the named segment model is not matching actual merchant use cases
- A Klaviyo downmarket push introduces a full-featured free-tier segment builder that makes Campaigns' simplified approach a visible competitive disadvantage before v2 ships

---

## Follow-up Considerations

### Metrics to Monitor

- Named segment selection rate vs. custom filter panel open rate: tells us the actual split between the two audience paths; if custom filter use is near zero, the named segment list may be covering all real merchant needs
- Audience selection abandonment rate: if merchants are exiting at this step at a high rate despite Option C, the named segment list may not be covering the right use cases

### Future Decisions Required

- V2: Should the custom filter builder be promoted to a full query builder with OR and nested conditions? Requires post-v1 data on merchant segment complexity needs.
- V2: Should merchants be able to save and name custom segments for reuse across campaigns? Requires measuring the frequency of repeated custom filter construction.

### Revisit Triggers

- If post-launch usability testing (T+2 weeks) shows a >20% [fictional] abandonment rate at the audience selection step, revisit the named segment list contents before the next sprint
- If a significant Klaviyo pricing change causes rapid mid-market merchant evaluation of Campaigns (indicating a more sophisticated evaluator pool), reassess the custom filter scope

---

## Supporting Materials

- Figma: Campaigns audience selection v3 spec (internal . Figma workspace)
- Merchant interview synthesis (January 2026): interview findings on setup complexity
- Competitive analysis (February 2026): Mailchimp and Klaviyo audience selection UX comparison

---

## Decision History

| Date | Change | Author |
|------|--------|--------|
| Feb 11, 2026 | Option A proposed as default in initial design review | Design Lead |
| Feb 14, 2026 | Decision revised to Option C after PM + Engineering Lead review; custom filter panel scoped to AND-only conditions | Growth PM |

---

*This rationale documents the reasoning at the time of decision. Context may change.*
