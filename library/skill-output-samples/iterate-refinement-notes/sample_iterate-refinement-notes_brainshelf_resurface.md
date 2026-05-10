---
title: "Iterate Refinement Notes: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Sprint 9 refinement for Resurface v2 improvements."
artifact: refinement-notes
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Sprint 9 refinement for Resurface v2 improvements
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

With the Resurface A/B test validated and the ship decision approved, Priya M. facilitated the Sprint 9 refinement session to prepare the v2 improvement stories. The session covered four stories: the embedding migration from TF-IDF to OpenAI embeddings, the in-app resurfacing card, the daily vs. 3x/week cadence follow-up experiment, and the small-library handling improvement for users with fewer than 20 saved items. The embedding migration was blocked pending an OpenAI API key and budget approval from Marco.

**Source Notes:**

- Mike Cohn, "Agile Estimating and Planning" (mountaingoatsoftware.com/books/agile-estimating-and-planning) . the story point estimation methodology used in the refinement session; Cohn's modified Fibonacci scale (1, 2, 3, 5, 8, 13) and the team's practice of estimating by relative comparison to previously completed stories informed the point assignments.
- Jeff Patton, "User Story Mapping" (jpattonassociates.com/user-story-mapping/) . the story mapping approach used to sequence v2 stories by user impact; Patton's principle of organizing stories into a narrative backbone shaped the sprint priority order.
- Roman Pichler, "Strategize" (romanpichler.com/books/strategize/) . the product strategy framework that connects the v2 stories to the broader Brainshelf retention roadmap; Pichler's guidance on ensuring each sprint increment delivers measurable user value informed the story-level success criteria.

---

## Prompt

```
/refinement-notes

sprint 9 refinement for resurface v2. session was april 15, 2026.
45 minutes. priya facilitated.

stories discussed:
1. RSF-010: embedding migration (tfidf → openai text-embedding-3-small)
   . BLOCKED, waiting on openai api key + budget approval from marco
2. RSF-011: in-app resurfacing card on home screen . Ready, 5 pts [fictional]
3. RSF-012: cadence experiment (daily vs 3x/week, larger sample) .
   Ready, 3 pts [fictional]
4. RSF-013: small-library handling (users with <20 items, shorter
   exclusion window) . Needs Work, alex wants to see the data first

questions raised: should the in-app card show different items than
the email digest or the same items? what's the minimum library size
where tfidf actually produces useful results?

decision: in-app card shows different items (complementary, not
duplicate).
```

---

## Output

# Refinement Notes: April 15, 2026

## Session Info

| Attribute | Value |
|-----------|-------|
| **Date** | April 15, 2026, 2:00 PM |
| **Duration** | 45 minutes |
| **Facilitator** | Priya M. |
| **Sprint Preparing For** | Sprint 9 (April 21  -  May 2, 2026) |

### Attendees

- [x] Priya M., Product Manager
- [x] Alex R., Engineering Lead
- [x] Jess T., Backend Engineer
- [x] Sam W., Frontend Engineer
- [x] Dan K., Designer
- [x] Chloe B., Data Analyst
- [ ] Jordan L., Growth PM *(absent . at a conference)*

---

## Summary

**Stories Discussed:** 4
**Stories Refined (Ready):** 2
**Stories Needing More Work:** 1
**Stories Blocked:** 1
**Total Points Estimated:** 8 [fictional] (for Ready stories)

---

## Stories Refined

### RSF-010: Embedding Migration (TF-IDF → OpenAI text-embedding-3-small)

| Attribute | Value |
|-----------|-------|
| **Points** | 8 [fictional] |
| **Status** | Blocked |
| **Assignee** | Alex R. |

**Discussion Notes:**
- Alex presented the migration plan: replace the TF-IDF vectorization pipeline with OpenAI `text-embedding-3-small` embeddings for saved item similarity scoring. The spike showed embeddings achieve ~84% precision vs. ~72% for TF-IDF [fictional], which would address the "irrelevant items" feedback from the post-test survey.
- The migration is a backend change only . no frontend or email template changes required. Existing TF-IDF vectors would be replaced with 1536-dimensional embedding vectors stored in the same PostgreSQL JSONB column.
- The batch re-embedding of all ~460K existing saved items [fictional] is estimated at $15 - 25 one-time cost [fictional] plus ~$2 - 5/month ongoing for new saves [fictional]. Alex needs an OpenAI API key and budget approval from Marco before starting.
- Jess raised a concern about API latency: if OpenAI's embedding endpoint is slow or down, the digest generation cron job could be delayed. Alex proposed a fallback to TF-IDF if the embedding call fails, which adds complexity but ensures reliability.

**Scope Changes:**
- Added: TF-IDF fallback for embedding API failures (not in original story)

**Acceptance Criteria Confirmed:**
- [x] All existing saved items re-embedded using text-embedding-3-small
- [x] Digest relevance scoring uses cosine similarity on embedding vectors
- [x] TF-IDF fallback activates automatically if OpenAI API returns error or timeout (>5 seconds [fictional])
- [ ] Precision benchmark: re-run the 3-library benchmark from the spike to confirm ≥80% precision with production embeddings *(needs Chloe to prepare the benchmark dataset)*

**Blocker:** OpenAI API key + budget approval. Priya to follow up with Marco by April 17.

---

### RSF-011: In-App Resurfacing Card

| Attribute | Value |
|-----------|-------|
| **Points** | 5 [fictional] |
| **Status** | Ready |
| **Assignee** | Sam W. (frontend), Jess T. (backend API) |

**Discussion Notes:**
- The in-app card displays 3 topic-matched saved items at the top of the home screen for users who are opted in to the digest. The card is a complement to the email . it extends resurfacing into the app for moments when the user opens Brainshelf outside of the email trigger.
- Key design question resolved: the card shows different items than the email digest, not the same items. This avoids the user seeing duplicate recommendations and increases the total surface area of resurfaced content. The card draws from the same candidate pool but excludes items already included in the day's email digest.
- Dan K. presented the card design: a collapsible "Continue reading" section at the top of the home screen feed. The card is shown only to opted-in users; non-opted-in users see the opt-in card instead.
- Chloe asked whether the in-app card should have its own analytics events. Decision: yes . `resurface_card_viewed` and `resurface_card_item_clicked` (separate from the email click events) to measure in-app engagement independently.

**Scope Changes:**
- Added: card items must exclude items already in today's email digest
- Added: 2 new analytics events (`resurface_card_viewed`, `resurface_card_item_clicked`)

**Acceptance Criteria Confirmed:**
- [x] Card shows 3 items at the top of the home screen for opted-in users
- [x] Items are different from the day's email digest (no duplicates)
- [x] Card is collapsible; collapsed state persists per session
- [x] `resurface_card_viewed` and `resurface_card_item_clicked` events fire correctly
- [x] Non-opted-in users see the opt-in card, not the resurfacing card

---

### RSF-012: Cadence Follow-Up Experiment (Daily vs. 3x/Week)

| Attribute | Value |
|-----------|-------|
| **Points** | 3 [fictional] |
| **Status** | Ready |
| **Assignee** | Chloe B. (experiment design), Priya M. (experiment owner) |

**Discussion Notes:**
- The original A/B test showed daily cadence users had higher CTR (18.6% [fictional]) and higher return rate (26.1% [fictional]) than 3x/week users (14.1% CTR, 19.8% return rate [fictional]), but the 3x/week sample was only 33 users [fictional] . too small for conclusive comparison.
- This follow-up experiment will randomly assign new opt-in users to daily (default) or 3x/week cadence and measure the impact on CTR and return rate over 4 weeks. The primary question: is 3x/week meaningfully worse than daily, or is the original difference just noise?
- Chloe estimated 200 users per variant for 80% power to detect a 5pp CTR difference [fictional]. At the current opt-in rate (~15 new opt-ins per day at full rollout [fictional]), the experiment would reach sample in ~27 days.
- Alex confirmed no code changes are needed: cadence assignment is a server-side configuration; the cron job already supports both cadences.

**Scope Changes:**
- None . experiment design only, no code changes

**Acceptance Criteria Confirmed:**
- [x] Experiment design document complete with sample size, duration, and success criteria
- [x] Amplitude experiment configured with cadence variants (daily vs. 3x/week)
- [x] New opt-in users randomly assigned to cadence variant at opt-in time

---

### RSF-013: Small-Library Handling

| Attribute | Value |
|-----------|-------|
| **Points** | . (not estimated) |
| **Status** | Needs Work |
| **Assignee** | Chloe B. (data analysis) |

**Discussion Notes:**
- Users with fewer than 20 saved items exhaust the candidate pool quickly under the 14-day exclusion window. After 2 weeks, all items have been resurfaced and the digest starts skipping days. The A/B test showed that light savers (10 - 49 items) had the smallest return rate lift (+3.8pp [fictional], not statistically significant), which may be partly due to pool exhaustion.
- Alex proposed shortening the exclusion window for small libraries: 7 days instead of 14 for users with <20 items, 10 days for 20 - 50 items. Priya asked Chloe to pull data on how many users are in the <20 segment and how often their digests are being skipped before committing to a specific threshold.
- The team discussed whether to reduce the digest item count for small libraries (e.g., 2 items instead of 3 - 5) but decided to defer that decision until after seeing Chloe's data.

**Scope Changes:**
- Story not yet scoped . waiting on data analysis

**Acceptance Criteria Confirmed:**
- [ ] Needs data analysis from Chloe before criteria can be set

---

## Stories Summary Table

| Story | Title | Points | Status | Notes |
|-------|-------|--------|--------|-------|
| RSF-010 | Embedding migration (TF-IDF → OpenAI) | 8 [fictional] | Blocked | Waiting on API key + budget approval |
| RSF-011 | In-app resurfacing card | 5 [fictional] | Ready | Card shows different items than email; 2 new events |
| RSF-012 | Cadence follow-up experiment | 3 [fictional] | Ready | Experiment design only; no code changes |
| RSF-013 | Small-library handling | . | Needs Work | Waiting on Chloe's data analysis |

---

## Questions Raised

| Question | Raised By | Owner | Due Date | Status |
|----------|-----------|-------|----------|--------|
| Should the in-app card show the same items as the email or different items? | Dan K. | Priya M. | Apr 15 | Resolved (different items) |
| What's the minimum library size where TF-IDF produces useful relevance results? | Alex R. | Chloe B. | Apr 21 | Open |
| How many users have <20 saved items, and how often are their digests skipped? | Priya M. | Chloe B. | Apr 21 | Open |

### Question Details

**Q: What's the minimum library size where TF-IDF produces useful relevance results?**
- Context: Users with very small libraries (10 - 15 items) may receive digests where the "most relevant" items are barely above the threshold. If TF-IDF precision drops below a useful level for small libraries, the team should either exclude these users from the digest or apply a different selection strategy.
- Impact: RSF-013 (small-library handling) is blocked until this is answered.
- Notes: Chloe will re-run the spike benchmark for a simulated 15-item library to measure precision at small scale.

---

## Decisions Made

| Decision | Context | Made By |
|----------|---------|---------|
| In-app card shows different items than the email digest | Avoids duplicate recommendations; increases total resurfaced content surface | Priya M. + Dan K. |
| Add TF-IDF fallback to the embedding migration story | Ensures digest reliability if OpenAI API is slow or down | Alex R. + Priya M. |
| Cadence experiment uses new opt-ins only (not existing users) | Changing cadence for existing daily users would contaminate the experiment | Chloe B. |

---

## Action Items

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| Follow up with Marco on OpenAI API key + budget approval | Priya M. | Apr 17 | Not Started |
| Pull data on small-library user segment and digest skip rate | Chloe B. | Apr 21 | Not Started |
| Re-run spike benchmark for 15-item library to test TF-IDF precision at small scale | Chloe B. | Apr 21 | Not Started |
| Write cadence experiment design document | Chloe B. | Apr 18 | Not Started |
| Design the in-app resurfacing card for all screen sizes | Dan K. | Apr 18 | In Progress |

---

## Blocked Stories

| Story | Blocker | Owner | Expected Resolution |
|-------|---------|-------|---------------------|
| RSF-010: Embedding migration | OpenAI API key + budget approval from Marco | Priya M. | Apr 17 (follow-up scheduled) |

---

## Parking Lot

- **Weekly summary email:** Jordan L. (absent) had previously suggested a weekly digest variant that summarizes the week's reading activity and surfaces 5 - 7 items. Deferred to Sprint 10 or later; the cadence experiment (RSF-012) should complete first to inform whether lower frequency is viable.
- **"Not interested" feedback loop:** Allowing users to mark a resurfaced item as "not interested" to improve future relevance. Deferred because it requires a new interaction in the email and in the app; prioritize after embedding migration improves baseline relevance.

---

## Next Session

**Date:** April 22, 2026 (Sprint 9 mid-sprint)
**Stories to Prepare:**
- RSF-013: Small-library handling (pending Chloe's data analysis)
- RSF-014: "Not interested" feedback loop (if time permits; may defer to Sprint 10)

**Preparation Needed:**
- Chloe: complete small-library data analysis and TF-IDF precision benchmark by April 21
- Priya: confirm OpenAI budget approval status; if approved, unblock RSF-010 for Sprint 9

---

*Notes captured by Priya M. on April 15, 2026.*
