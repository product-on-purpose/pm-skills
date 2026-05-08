---
title: "Define Opportunity Tree: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - opportunity tree for saved content re-engagement."
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . opportunity tree for saved content re-engagement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf's PM built an opportunity solution tree mapping three user-facing opportunities against the Q1 2026 retention OKR (increase 7-day return rate from 18% to 25% [fictional] by end of Q2 2026). The three opportunity branches . re-engagement trigger gap, content relevance decay, and library overwhelm . were derived from the January 2026 user interviews and behavioral data analysis. The PM prioritized the re-engagement trigger gap as the highest-impact, highest-confidence opportunity and selected the morning email digest (Solution 1A) as the first experiment, informed by the competitive analysis showing Readwise as the only competitor with a proven resurfacing mechanic in the category.

**Source Notes:**

- Teresa Torres, "Continuous Discovery Habits" (producttalk.org) . the opportunity solution tree framework applied in this document; Torres's methodology structures product discovery around a measurable outcome, user-derived opportunities, solution options, and assumption tests, ensuring that solution selection is evidence-driven rather than opinion-driven.
- Lenny Rachitsky's consumer app retention benchmarks (Lenny's Newsletter, 2023) . 7-day return rate benchmarks for consumer utility apps; placed Brainshelf's 18% baseline [fictional] below the 25–35% median range and informed the 25% [fictional] target as the minimum viable improvement.
- Amplitude, "North Star Metric" (amplitude.com/blog/north-star-metric) . the framework used to select 7-day return rate as the North Star metric for the tree; return rate measures the specific behavior (coming back to read) that the Resurface feature is designed to create, making it more actionable than DAU or MAU for this outcome.

---

## Prompt

```
/opportunity-tree

outcome: increase 7-day return rate from 18% to 25% [fictional]
by end of Q2 2026.

three opportunities from interviews + data:
1. re-engagement trigger gap . users have no external prompt to return
2. content relevance decay . old saves lose timeliness, making the
   library feel stale
3. library overwhelm . 400-item undifferentiated list creates avoidance

solutions I'm considering:
- opp 1: morning email digest (resurface), in-app notification card
- opp 2: freshness scoring, auto-archive stale items
- opp 3: intent tagging at save time, smart collections

want to prioritize opp 1 / email digest based on competitive analysis
(readwise is the only proof point for email resurfacing).
```

---

## Output

# Opportunity Solution Tree: Increase 7-Day Return Rate

## Desired Outcome

**Outcome Statement:** Increase the 7-day return rate (% of weekly active users who return the following week) from 18% to 25% [fictional]
**Current State:** 18% 7-day return rate [fictional]
**Target State:** 25% 7-day return rate [fictional]
**Timeframe:** End of Q2 2026 (June 30, 2026)
**Owner:** Priya M., Product Manager

### Why This Outcome Matters

The 7-day return rate is the strongest leading indicator of long-term retention for Brainshelf. Users who return within 7 days of their last session are 3.2x more likely to retain at 90 days compared to users who do not [fictional]. The current 18% rate [fictional] places Brainshelf below the 25–35% median for consumer utility apps. Improving return rate is the Q1 retention OKR and the primary metric the CEO has identified for the next investor update (Q2 2026 [fictional]). Without a product intervention that moves this metric, the retention trajectory does not support the planned fundraise.

---

## Visual Tree

```
                    [OUTCOME]
            Increase 7-day return
            rate: 18% → 25% [f]
                      |
      ┌───────────────┼───────────────┐
      |               |               |
 [OPP 1]         [OPP 2]         [OPP 3]
 Re-engagement    Content          Library
 trigger gap      relevance        overwhelm
      |           decay                |
  ┌───┴───┐       ┌───┴───┐       ┌───┴───┐
  |       |       |       |       |       |
[1A]    [1B]    [2A]    [2B]    [3A]    [3B]
Email   In-app  Fresh-  Auto-   Intent  Smart
digest  notif.  ness    archive tagging collect.
  |       |       |       |       |       |
[A/B]  [Later] [Later] [Later] [Later] [Later]
```

---

## Opportunity Branches

### Opportunity 1: Re-Engagement Trigger Gap

**Description:** Users have no external prompt to return to their saved content. Revisiting is entirely self-initiated, which means it almost never happens. All 7 interview participants described the absence of a trigger as the primary reason they don't return; behavioral data confirms that save-only sessions (save event with no read event) represent 72% of all sessions [fictional].
**Impact Potential:** High
**Confidence:** High . supported by both qualitative (7/7 interviews) and quantitative (72% save-only sessions [fictional]) evidence

**Evidence:**
- Interviews (Jan 2026): "Nothing reminds me. I save something, close the tab, and it's just... gone from my brain." . P2 [fictional]
- Behavioral data: 72% of sessions are save-only [fictional]; only 28% include a read event on a saved item
- Competitive analysis: Readwise's core value proposition is the daily review email . the only proven trigger mechanism in the PKM category

#### Solutions

**Solution 1A: Morning Email Digest (Resurface)**
- Description: Daily morning email at 7:30 AM local time surfacing 3–5 saved items matched to the user's recent reading topics. Requires email opt-in. Items selected by topic similarity to content saved in the prior 7 days.
- Effort: M (email infrastructure + topic-matching algorithm + opt-in flow; 4-week build sprint [fictional])
- Riskiest Assumption: Users will opt in to a daily email from Brainshelf at a rate sufficient to power a 4-week A/B experiment (≥10% opt-in [fictional])
- Assumption Test: Track opt-in rate in the first 7 days after the prompt goes live; if below 10% [fictional], extend the enrollment window or test a less frequent cadence (3x/week)

**Solution 1B: In-App Notification Card**
- Description: A card shown at the top of the Brainshelf home screen when the user opens the app, surfacing 1–3 saved items. No email required; trigger depends on the user opening the app.
- Effort: S (simpler implementation; no email infrastructure needed)
- Riskiest Assumption: Users open the app frequently enough for the card to be seen; if users only open the app to save (which is the current behavior), the card will not reach them at the moment of reading availability
- Assumption Test: Measure how many of the target segment open the Brainshelf home screen at least once per week without a save event triggering the visit; if fewer than 20% [fictional], the in-app card cannot reach most of the target

---

### Opportunity 2: Content Relevance Decay

**Description:** Saved items lose timeliness as they age. A news article saved 3 months ago may be outdated; a research paper may still be relevant but the user has no way to distinguish freshness without manually reviewing each item. Over time, the library feels stale . users assume that most of what they saved is no longer worth reading, which reduces the motivation to browse.
**Impact Potential:** Medium
**Confidence:** Medium . directionally supported by interview data (3/7 mentioned timeliness), but not as universally cited as the trigger gap

**Evidence:**
- Interviews: "Half the stuff I saved is probably outdated by now. I saved it months ago." . P6 [fictional]
- Behavioral data: revisit rate drops sharply after 14 days . items saved within 7 days have a 16% revisit rate [fictional] vs. 4% for items saved 30+ days ago [fictional]
- Competitive analysis: no competitor addresses freshness scoring; Readwise resurfaces based on annotation date, not content timeliness

#### Solutions

**Solution 2A: Freshness Scoring**
- Description: A visible freshness indicator on each saved item (green/yellow/red or numeric score) based on content type, publication date, and URL freshness. News articles older than 30 days scored low; evergreen content (tutorials, research) scored neutral.
- Effort: M (content classification + scoring algorithm + UI integration)
- Riskiest Assumption: Users will engage with freshness indicators and use them to filter their reading choices; if users don't understand or notice the indicators, the feature has no behavioral impact
- Assumption Test: Prototype test with 5 users (show annotated library with freshness scores) to see if users use the scores to make reading decisions

**Solution 2B: Auto-Archive Stale Items**
- Description: Automatically move items older than 90 days to an "Archive" section, keeping the main library focused on recent saves. Users can access the archive anytime but the default view shows only recent content.
- Effort: S (library UI change + archive logic; no algorithmic complexity)
- Riskiest Assumption: Users will not feel that their content is being "taken away"; the archive action must feel like organization, not deletion
- Assumption Test: User interviews (n=3) showing a prototype with auto-archived items; check for negative emotional reaction

---

### Opportunity 3: Library Overwhelm

**Description:** The saved library is an undifferentiated list of hundreds of items sorted by date. There is no structure, no categorization by intent, and no way to distinguish "to read" items from "reference" items from "aspirational" saves. The volume creates decision paralysis . users open the library, scroll briefly, feel overwhelmed, and close it. This avoidance behavior is the mechanism through which the guilt pile converts into disengagement.
**Impact Potential:** Medium
**Confidence:** Medium . 5/7 interview participants described the library in negative terms, but the negativity may be a symptom of the trigger gap (Opportunity 1) rather than an independent cause

**Evidence:**
- Interviews: "I'd open it, scroll for a minute, feel overwhelmed, and close it. Eventually I just stopped opening it." . P7 [fictional]
- Interviews: "Half the things I save are design inspiration . I don't want to read those, I want to look at them when I need ideas. But they're mixed in with everything else." . P4 [fictional]
- Behavioral data: average library size in the target segment is 310 items [fictional]; users with 500+ items [fictional] have a 7-day return rate of only 11% [fictional] vs. 22% for users with fewer than 100 items [fictional]

#### Solutions

**Solution 3A: Intent Tagging at Save Time**
- Description: When a user saves an item, show a lightweight intent picker: "Read later," "Reference," or "Inspiration." Use the tag to filter the library and to inform which items should be resurfaced.
- Effort: M (save flow UX change + tag data model + library filter UI)
- Riskiest Assumption: Users will choose an intent tag at save time; if the tag picker adds friction to the save flow (which is currently one-click), save rate could decline
- Assumption Test: A/B test the tag picker on the save flow; measure save completion rate in control (no picker) vs. treatment (picker); abandon if save rate drops more than 5% [fictional]

**Solution 3B: Smart Collections (Auto-Categorization)**
- Description: Use content-type heuristics and topic clustering to automatically group saved items into collections (e.g., "Tech Articles," "Design Inspiration," "Research Papers") without requiring user input at save time.
- Effort: L (auto-categorization algorithm + collection UI + topic clustering infrastructure)
- Riskiest Assumption: The auto-categorization will be accurate enough to feel useful; if categories are wrong or confusing, users will lose trust in the feature
- Assumption Test: Manually categorize 100 saved items from 3 real user libraries and compare against the algorithm's output; target ≥80% accuracy before launching [fictional]

---

## Prioritization

### Current Focus

**Priority Opportunity:** Opportunity 1 . Re-Engagement Trigger Gap
**Priority Solution:** Solution 1A . Morning Email Digest (Resurface)
**Rationale:** The trigger gap is the highest-confidence opportunity (7/7 interviews, 72% save-only sessions [fictional]) and the only opportunity with a proven competitive proof point (Readwise's daily review email). The email digest addresses the core behavioral barrier (no external trigger to return) directly. Opportunities 2 and 3 may resolve naturally if the email digest creates a return habit . stale content is less of an issue if users are reading regularly, and library overwhelm is less of an issue if users are engaging with individual items rather than browsing the full list.

### Opportunity Ranking

| Rank | Opportunity | Impact | Confidence | Effort | Score |
|------|-------------|--------|------------|--------|-------|
| 1 | Re-engagement trigger gap | High | High | M | Strong |
| 2 | Library overwhelm | Medium | Medium | M–L | Moderate |
| 3 | Content relevance decay | Medium | Medium | M | Moderate |

### Parking Lot

- **Solution 1B (in-app notification card):** Deferred to test after the email digest experiment. If the email digest works, the in-app card can amplify the effect for users who don't opt in to email. If the email fails, the in-app card is the next mechanism to test.
- **Solution 3B (smart collections):** Effort is large and depends on auto-categorization accuracy; defer until the trigger gap is resolved and we can measure whether library overwhelm is an independent retention driver or a symptom.

---

## Experiments Backlog

| Solution | Assumption | Test Method | Success Criteria | Status |
|----------|------------|-------------|------------------|--------|
| 1A: Morning email digest | Users opt in at ≥10% rate [fictional]; click-through rate ≥8pp [fictional] above control | Randomized A/B test, 50/50 split, 4 weeks, opt-in cohort | CTR ≥8pp, p < 0.05; unsubscribe ≤2%/week | Planned |
| 1B: In-app notification card | ≥20% of target segment opens home screen without a save trigger per week [fictional] | Behavioral data analysis (no build required) | ≥20% weekly non-save home opens [fictional] | Planned |
| 3A: Intent tagging at save time | Tag picker does not reduce save completion rate by more than 5% [fictional] | A/B test on save flow; measure save completion rate | Save rate delta ≤5% [fictional] | Not scheduled |

---

## Learning Log

| Date | Experiment | Result | Learning | Impact on Tree |
|------|------------|--------|----------|----------------|
| . | . | . | . | . |

*(No experiments have run yet. This log will be updated as experiments complete.)*

---

## Next Steps

- [ ] Formalize the Resurface hypothesis document based on the Opportunity 1 / Solution 1A path
- [ ] Design the A/B experiment for the morning email digest (sample size, duration, primary/secondary metrics, guardrails)
- [ ] Run the Solution 1B feasibility check (behavioral data analysis: how many target-segment users open the home screen without a save trigger) to inform whether the in-app card is a viable second experiment

---

*This is a living document. Update as you learn from experiments and customer feedback.*
