<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: lean-canvas
version: "1.0"
repo_version: "2.10.2"
skill_version: "1.0.0"
created: 2026-04-15
status: sample
thread: brainshelf
context: Brainshelf Resurface lean canvas for framing the morning email digest as a retention and referral lever in a consumer PKM app
---

## Scenario

Brainshelf is a post-seed consumer read-later and PKM app, about 20 people, with roughly 85,000 registered users. Activation is decent but the long-tail retention is flat: users save articles and never revisit them. The team is sketching Resurface, a contextual morning email digest that delivers three saved items before the user's first meeting. The PM wants a quick lean canvas to sanity-check the business shape before scoping the v1 build and pitching the next board update.

**Source Notes:**

- Readwise pricing page lists consumer PKM and read-later tier at approximately $9.99 per month, anchoring the $5 to $10 range for the category.
- RescueTime research on knowledge-worker attention patterns documents the morning as the highest-signal window for deliberate content engagement.

---

## Prompt

```text
/lean-canvas

quick lean canvas for Resurface (morning email digest of saved stuff).

context:
- brainshelf post-seed, 85k users, retention flat
- users with 3+ saves/wk have 3.4x retention and 2.1 referrals/quarter [fictional]
- hypothesis: send saved items back to them monday mornings
- competitors in the space: Readwise Reader, Raindrop, Omnivore, Pocket
- need a one-pager for board update friday and to scope v1

content mode is fine. be honest about what we don't know.
```

---

## Output

# Lean Canvas: Brainshelf Resurface

> **Created**: 2026-04-15
> **Author**: Brainshelf PM
> **Mode**: content
> **Overall confidence**: Low-Medium
> **Purpose**: New feature thesis. Pre-scope sanity check and board-update anchor.

---

## 1. Problem

- **P1**: Brainshelf users save articles with good intent and never revisit them. The save-to-read ratio is roughly 1:0.3 [fictional], meaning most saved content is functionally lost to the user.
- **P2**: Forgotten saves erode the perceived value of the app: users who do not come back to saved content eventually stop saving, stop engaging, and churn.
- **P3**: Competing PKM tools (Readwise, Raindrop) have reminder and resurfacing features, so the gap is felt by users who cross-shop.

### Existing Alternatives

- Readwise Reader's daily review emails (the most direct competitor pattern)
- Raindrop.io's "read later" section (passive list, no reminders)
- Email-to-self "save" workflows with manual inbox review
- Non-consumption: accepting forgotten saves as a cost of doing business

**Confidence**: Medium
**Rationale**: The save-to-read ratio is measurable and directional. The perceived-value erosion is inferred from churn correlation, not directly tested.

---

## 2. Customer Segments

- Active Brainshelf users (defined as 3+ saves per week) across consumer use cases.

### Early Adopters

- Knowledge-worker users with 50+ saved items who have also turned on desktop notifications. This cohort (roughly 12% of the active base) has already signaled openness to proactive nudges and has enough save volume to power a daily digest. Approximately 2,300 users [fictional].

**Confidence**: Medium
**Rationale**: Active cohort is measurable. "50+ saves + notifications-on" as the early-adopter heuristic is directional; needs a pilot to confirm it maps to actual Resurface engagement.

---

## 3. Unique Value Proposition

The article you saved last week, delivered Monday morning before your first meeting.

### High-Level Concept

Day-one reminder for your second brain.

**Confidence**: Low
**Rationale**: UVP copy is untested on the segment. "Second brain" framing resonates with Tiago Forte readers but is jargon for mainstream users. Needs A/B testing against a more concrete alternative like "the article you meant to read, finally on your radar again."

---

## 4. Solution

- **For P1 (saves never revisited)**: Daily morning email digest with three curated items, each selected for contextual relevance (recency, user behavior, topic clustering).
- **For P2 (value erosion)**: One-click "revisit" or "archive" actions directly from the email, with streak tracking for consecutive engagement.
- **For P3 (competing features)**: Contextual relevance scoring that distinguishes Resurface from Readwise Reader's simpler chronological-review pattern.

**Confidence**: Low-Medium
**Rationale**: The digest pattern is proven (Readwise Reader). Contextual relevance as a differentiator is a hypothesis; we have not built the scoring logic yet and do not know if users will distinguish it from a time-based rotation.

---

## 5. Channels

### Compounding (free, long-horizon)

- Product-led loops: users share their digest with teammates, and the share includes a "get your own Resurface" CTA.
- Content marketing on "the tool you save to vs the tool you come back to," targeted at knowledge-worker audiences on Twitter and LinkedIn.
- Integration with note-taking apps (Notion, Obsidian) as an import-export bridge that pulls users from adjacent ecosystems.

### Traction-demonstrating (paid, near-term)

- Referral program: existing users invite three peers, and both sides get 30 days free of the Curator tier.
- App Store / Play Store feature partnerships timed with the v1 launch.

**Confidence**: Low
**Rationale**: Compounding channels are standard PLG plays. The specific conversion rates are unknown for our segment. The referral program is a reasonable default but we have not tested incentive mechanics for this audience.

---

## 6. Revenue Streams

- **Model**: Freemium with a Curator paid tier.
- **Price**: $5 per month, or $50 per year (with annual discount). Curator tier unlocks unlimited saves, advanced relevance controls, and priority sync.
- **Volume (Year 1)**: 8% free-to-paid conversion of active base = approximately 1,600 paid users at end of Year 1 [fictional].
- **LTV**: $5 per month x 14-month average lifetime = approximately $70 per user.
- **Math**: 1,600 paid users x $60 average annual = $96k ARR at end of Year 1. Modest alone; the real bet is that Resurface lifts engagement enough to compound paid conversion over 12 to 18 months.

**Confidence**: Low
**Rationale**: 8% free-to-paid conversion is at the optimistic end of consumer-freemium benchmarks. Brainshelf has no prior paid tier, so we have no internal baseline; this is pure assumption.

---

## 7. Cost Structure

- **CAC**: Approximately $4 blended (heavy reliance on organic + referral) [fictional].
- **Fixed costs**: Small team, estimated annual burn around $450k [fictional]. Resurface adds minimal headcount pressure.
- **Variable costs**: Email sending via SES ($0.0001 per email), relevance-scoring inference ($0.002 per digest), minimal.
- **Cost driver**: Relevance-scoring inference at scale. If we use a larger model for ranking, per-user COGS can triple. Keeping the scoring lean is a design constraint, not a stretch goal.

**Confidence**: Medium
**Rationale**: Email infrastructure costs are well-known. Inference costs depend on model choice; we have directional estimates but have not benchmarked.

---

## 8. Key Metrics

- **DAU and day-1 retention of Resurface users**: Target: 40% day-1 retention, 20% day-7 [fictional].
- **Save-to-revisit ratio**: Lift from baseline 1:0.3 to 1:0.6 within 6 months post-launch [fictional].
- **Email engagement**: Open rate and click-through rate on the morning digest. Target: 35% open, 12% click.
- **Curator tier conversion rate**: Free-to-paid conversion within 30 days of first Resurface interaction. Target: 4% month 1, 8% month 12.
- **Referral rate**: Average invites sent per active user per quarter. Target: lift from current 2.1 to 3.2 [fictional].

**Confidence**: Low-Medium
**Rationale**: Metric selection is standard. Specific targets are benchmarks, not validated against our product. Day-1 retention of 40% is especially uncertain given the novelty of the morning-digest format for our users.

---

## 9. Unfair Advantage

Open question. No defensible moat yet. Candidate: our existing save-behavior data (pattern of what users save, read, and abandon) could power contextual relevance scoring better than new entrants, but only if we actually ship the scoring model. If we ship a naive chronological-digest first and iterate on relevance later, we forfeit this advantage and end up competing on email frequency, which is not defensible.

**Confidence**: Low
**Rationale**: The data-asset advantage is conditional on execution. We are naming it as an open question rather than a claim.

---

## Evidence & Confidence

### Validated

- Save-to-read ratio of roughly 1:0.3: Brainshelf internal analytics (Q1 2026).
- Users with 3+ saves per week have 3.4x retention: Brainshelf internal cohort analysis.
- Readwise Reader pricing and review-email feature pattern: Readwise public pricing page.

### Assumed

- Morning window is highest-signal for deliberate engagement. Based on RescueTime research in general knowledge work, not measured for our users specifically.
- Contextual relevance scoring will outperform chronological rotation. Pure hypothesis.
- 8% free-to-paid conversion. Consumer-freemium benchmark; not measured internally (no paid tier exists yet).
- "Knowledge worker with 50+ saves and notifications on" is the right early-adopter segment. Heuristic, not validated.

### Open Questions

- Does the Monday-morning delivery window outperform other windows (Friday afternoon, Sunday evening)? A/B test across 4 delivery windows during a two-week pilot.
- Will users distinguish contextual relevance from chronological rotation if both produce readable digests? Blind A/B on the same user cohort for 30 days.
- What is the minimum save-volume threshold below which Resurface feels repetitive? Track perceived quality by save-volume decile during the pilot.
- Can we hit 8% free-to-paid conversion, or is the ceiling closer to 3 to 4%? Can only be measured by running the paid tier.

### Governance

- **Owner**: Brainshelf PM, with input from engineering lead and the 2-person growth team.
- **Review cadence**: Bi-weekly during pilot; monthly post-launch.
- **Revision triggers**: (a) pilot save-to-revisit lift under 1.5x after 4 weeks, (b) free-to-paid conversion below 2% at month 3, (c) email open rate below 25% at month 2 (indicates the core signal is weaker than hypothesized).

---

## Visual Output

This sample ships with a companion visual-mode render at [`sample_foundation-lean-canvas_brainshelf_resurface.html`](sample_foundation-lean-canvas_brainshelf_resurface.html), generated from the same content above via the skill's `references/html-template.html` scaffold.

- **Layout**: canonical Maurya 9-block grid with per-column color accents
- **Confidence badges**: each block tagged `H`, `M`, or `L`; this canvas shows predominantly `L` (early-stage, pre-revenue thesis)
- **Self-contained**: no external fonts, stylesheets, or scripts; opens offline
- **Print-ready**: `@media print` page-size A3 landscape

Open directly in a browser or export to PDF via the browser print dialog for the Friday board update.
