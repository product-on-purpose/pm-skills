---
title: "Discover Journey Map: Brainshelf First Subscription"
description: "Brainshelf B2C book-curation app - first-time reader journey from referral to weekly habit and referral."
artifact: journey-map
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: brainshelf
context: Brainshelf AI book-curation subscription - avid reader from discovery to subscribe to weekly habit
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf is a consumer subscription that uses AI to curate personalized book recommendations for avid readers who are frustrated with generic Amazon and Goodreads suggestions. The PM wants a journey map for the first-time-subscriber experience to understand where to invest in activation and retention. Eight user interviews were run with target readers; the map below grounds each emotional entry in that signal where it exists and labels the rest as Hypothesis. All numbers and quotes are illustrative and tagged `[fictional]`.

The journey is primarily linear (Discovers through Decides) with a cyclical engagement loop once subscribed (Engages, which recurs weekly, feeding Recommends).

**Source Notes:**

- Kate Kaplan, "Journey Mapping 101" (Nielsen Norman Group, nngroup.com) - the structure of stages, touchpoints, an emotional curve, and opportunity annotations follows NN/g's canonical journey-map anatomy.
- Jim Kalbach, "Mapping Experiences" (O'Reilly, 2016) - the distinction between front-stage touchpoints and the reader's internal experience, and the practice of annotating opportunities directly on the map.
- Daniel Kahneman and Barbara Fredrickson, the "peak-end rule" - the emotional-curve reading that a subscriber's renewal decision weights the peak moment (the first great recommendation) and the most recent experience more heavily than the average experience.

---

## Prompt

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

## Output

# Customer Journey Map: Brainshelf First-Time Subscriber - "From Skeptic to Evangelist"

## Executive Summary

This map covers an avid reader from first hearing about Brainshelf through subscribing, building a weekly reading habit, and referring others. It is grounded in 8 user interviews [fictional]; emotional entries without interview support are marked Hypothesis. The decisive moment of truth is the **first non-obvious great recommendation** - the moment a reader gets a book they love that they would never have found themselves. Readers who hit that moment in week 1 describe Brainshelf in completely different terms than those who got obvious or generic picks. The second moment of truth is the **week 3-4 quality test**, where early enthusiasm either compounds into a habit or collapses into churn. The biggest opportunity is engineering the first great recommendation deliberately rather than leaving it to chance.

## Persona / Segment

Avid reader, 30-50, reads 2-4 books per month [fictional], active on Goodreads but frustrated that its recommendations are obvious (bestsellers they have already seen) or off (genre matches that miss on taste). Willing to pay for genuinely better curation but deeply skeptical that "another algorithm" can read their taste. Time-rich on reading, time-poor on discovery: does not want to spend an hour hunting for the next book. This matches the "Discerning Reader" segment from the foundation-persona artifact.

## Journey Scope

- **Journey type:** Linear discovery-to-subscribe, then a cyclical weekly-engagement loop
- **Included:** First exposure through the first referral (roughly a 6-week arc)
- **Excluded:** Long-term retention beyond the first quarter, win-back of churned readers, gift subscriptions

## Stages

| # | Stage | Customer goal | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | Discovers | Find a better way to choose books | Minutes | Friend's referral or a reading-newsletter mention | Visits the site |
| 2 | Considers | Decide whether to trust the curation | 1-5 days | Lands on the how-it-works page | Starts the free taste quiz or leaves |
| 3 | Tries | Test whether the recs are actually good | 10-15 min | Completes the taste quiz | Receives first free recommendations |
| 4 | Decides | Judge whether to pay | 1-3 days | Hits the paywall after free recs | Subscribes or abandons |
| 5 | Engages (loop) | Get a great book each week | Weekly, ongoing | Weekly recommendation email | Reads, rates, returns next week |
| 6 | Recommends | Share a tool that works | Spontaneous | A standout recommendation | Refers a friend |

## Touchpoints per Stage

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| Discovers | Referral link / newsletter mention | Word of mouth, email | Hears Brainshelf "actually gets your taste" |
| Considers | How-it-works page | Web | Learns the curation is AI + editorial, not pure algorithm |
| Considers | Sample recommendations | Web | Sees example picks for a taste profile |
| Tries | Taste quiz | Web / app | Answers questions about recent reads and what they liked |
| Tries | First free recommendations | Web / email | Gets 3 picks with reasons |
| Decides | Paywall + plan options | Web | Chooses monthly or annual, or leaves |
| Engages | Weekly recommendation email | Email | Receives the week's curated pick(s) |
| Engages | Rate / refine controls | App | Thumbs the pick, nudges the model |
| Recommends | Share / gift link | App, social | Sends a friend a referral with a free taste quiz |

## Emotional Curve

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| Discovers | Hopeful but guarded | Medium | 8 interviews; 6 expressed "I'll believe it when I see it" skepticism [fictional] |
| Considers | Skepticism ("another algorithm") | High | Interviews: skepticism was the single most common reaction [fictional] |
| Tries | Surprise, then either delight or deflation | High | Bimodal in interviews; depended entirely on rec quality [fictional] |
| Decides | Conviction (if a pick landed) or polite indifference | Medium | Interviews; renewal intent tracked rec quality [fictional] |
| Engages | Anticipation, mild ritual pleasure | Medium | Hypothesis from 3 long-term users; not yet broadly validated [fictional] |
| Recommends | Pride in sharing a "secret weapon" | Low | Hypothesis; observed in 2 interviewees, needs validation |

## Pain Points and Moments of Truth

| Stage | Pain / Moment of Truth | Severity (1-5) | Customer evidence | Implication |
|---|---|---|---|---|
| Considers | "Why is this better than free Goodreads?" | 4 | 5 of 8 asked this unprompted [fictional] | The value prop must beat free, fast and concretely |
| Tries | The first non-obvious great recommendation | Moment of Truth (5) | Readers who got a "wow" pick described the product completely differently [fictional] | Engineer this moment; do not leave it to chance |
| Tries | Obvious or generic first picks | 5 | 3 of 8 got picks they had already seen [fictional] | A weak first rec wastes the only first impression |
| Engages | Week 3-4 quality test (does quality hold past the honeymoon?) | Moment of Truth (4) | Several said they would churn fast if recs got generic [fictional] | Sustained quality compounds into a habit; a slump collapses the subscription |
| Decides | Paywall arrives before trust is built | 3 | 2 interviewees felt rushed [fictional] | Time the paywall to fire after the "wow", not before |

## Opportunities

| Stage | Opportunity | Product change that addresses it | Effort (rough) |
|---|---|---|---|
| Considers | Beat "free Goodreads" objection | Side-by-side "what Goodreads suggests vs. what Brainshelf suggests" on the how-it-works page | Small |
| Tries | Guarantee a non-obvious first win | Bias the first free rec set toward high-confidence, lesser-known picks the reader is unlikely to have seen | Medium |
| Tries | Explain the "why" behind each pick | Add a one-line rationale per recommendation that demonstrates taste understanding | Small |
| Decides | Time the paywall to the peak | Trigger the subscribe prompt right after a reader rates a free pick highly, not on a fixed timer | Medium |
| Engages | Defend against the quality slump | Reserve a known-strong pick for week 3 to sustain confidence through the honeymoon dip | Medium |

## Visual

```
timeline
    title Brainshelf First-Time Subscriber Journey
    Discovers : Referral or newsletter mention
    Considers : How-it-works : Sample recs
    Tries : Taste quiz : First free recs (moment of truth)
    Decides : Paywall : Subscribe
    Engages : Weekly pick : Rate and refine (recurring)
    Recommends : Shares referral link
```

Engagement loop (cyclical, once subscribed):

```
flowchart LR
    A[Weekly pick email] --> B[Reads the book]
    B --> C[Rates / refines]
    C --> A
    C --> D[Refers a friend]
```

## Research Gaps

- The Engages and Recommends emotions are largely Hypothesis: only 2-3 long-term users were interviewed [fictional]. A cohort study of subscribers past 60 days would replace these with evidence.
- No signal on readers who took the taste quiz but did not subscribe; instrumenting quiz-completion-to-paywall drop-off would reveal whether the issue is rec quality or paywall timing.
- The "first great recommendation" moment of truth is inferred from interviews, not measured. An in-app rating on the first free rec set would let the team confirm the correlation between first-rec rating and subscription.
