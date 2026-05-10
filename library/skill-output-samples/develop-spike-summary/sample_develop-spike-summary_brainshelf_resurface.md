---
title: "Develop Spike Summary: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - topic-matching algorithm spike for the Resurface digest."
artifact: spike-summary
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . topic-matching algorithm spike for the Resurface digest
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before Sprint 8 planning, Priya M. asked Alex R. to run a 3-day spike to determine whether the team could build a topic-matching algorithm that surfaces saved items relevant to the user's recent reading interests with sufficient accuracy to power the Resurface digest. The spike evaluated three approaches . tag-based metadata matching, TF-IDF on extracted article text, and OpenAI embedding similarity . against a manually curated relevance benchmark built from three real user libraries (anonymized, with consent). Alex recommended TF-IDF as the MVP approach after it met the 70% relevance threshold without introducing an external API dependency.

**Source Notes:**

- Scikit-learn, "TF-IDF Vectorizer Documentation" (scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html) . the TF-IDF implementation used in the spike's proof-of-concept; scikit-learn's vectorizer was used for the Python prototype, with the production implementation planned in TypeScript using a port of the same algorithm.
- OpenAI, "Embeddings Guide" (platform.openai.com/docs/guides/embeddings) . the embedding API evaluated as the high-accuracy alternative; the `text-embedding-3-small` model was tested during the spike for its cost-to-accuracy trade-off.
- Christopher Manning, Prabhakar Raghavan, and Hinrich Schütze, "Introduction to Information Retrieval" (nlp.stanford.edu/IR-book/) . the foundational text on TF-IDF and cosine similarity that Alex R. referenced when designing the relevance scoring approach; Chapter 6 (scoring, term weighting, and the vector space model) directly informed the algorithm design.

---

## Prompt

```
/spike-summary

topic matching spike for resurface. alex spent 3 days on it last
week. question: can we build something that picks saved items relevant
to what the user has been reading recently, accurate enough to not
annoy people?

three approaches tested:
1. tag-based . use OG tags, domain, URL patterns. simplest, no ML.
2. tfidf . extract article text, vectorize, cosine similarity. no
   external api. medium complexity.
3. openai embeddings . text-embedding-3-small. highest accuracy but
   adds external dependency and per-call cost.

benchmark: 3 real user libraries (anonymized), 50 items each,
manually rated as "relevant" or "not relevant" to recent reading.

results: tags = ~55% [fictional], tfidf = ~72% [fictional],
embeddings = ~84% [fictional].

recommendation: go with tfidf for mvp. meets the 70% bar we set,
no external dependency. plan to migrate to embeddings later if the
feature sticks.
```

---

## Output

# Spike Summary: Topic-Matching Algorithm for Resurface Digest

## Overview

| Field | Value |
|-------|-------|
| **Question to Answer** | Can the team build a topic-matching algorithm that surfaces saved items relevant to the user's recent reading interests with ≥70% precision, without adding an external API dependency? |
| **Time-Box** | 3 days |
| **Actual Time Spent** | 2.5 days |
| **Spike Lead** | Alex R., Engineering Lead |
| **Date Completed** | 2026-01-24 |

## Background

The Resurface feature requires a mechanism to select 3 - 5 saved items for each user's daily digest email. The items must be relevant to the user's recent reading interests . not random, not chronological, and not repetitive. The January 2026 user interviews identified irrelevant suggestions as one of the primary reasons users ignore recommendation-style features ("If it showed me random stuff I saved six months ago, I'd unsubscribe immediately" . P3 [fictional]). The team set a 70% precision target as the minimum acceptable accuracy: at least 7 out of 10 surfaced items should be rated "relevant" by the user, meaning the algorithm must do meaningfully better than random selection but does not need to achieve the precision of a full recommendation engine. The spike was scoped to answer whether this target is achievable within the team's current capabilities and infrastructure constraints (no ML infrastructure, no GPU, pre-Series A budget).

## Approach

### What We Tried

1. **Tag-based metadata matching:** Extract Open Graph tags, domain name, and URL path patterns from each saved item and compare them to the metadata of items the user has interacted with (saved, clicked, or read) in the prior 7 days. Match items that share at least two metadata attributes (e.g., same domain + overlapping OG tags). This approach requires no text extraction, no vectorization, and no external API . it operates entirely on metadata already available in the Brainshelf database.

2. **TF-IDF on extracted article text:** Use a web scraping library (Cheerio) to extract the main content text from each saved URL, strip HTML, and compute TF-IDF vectors using a custom TypeScript implementation. Calculate cosine similarity between each saved item's vector and the centroid vector of items the user interacted with in the prior 7 days. Rank by similarity score and select the top 5 above a minimum threshold. The prototype was built in Python using scikit-learn's TfidfVectorizer for speed; production implementation would be in TypeScript.

3. **OpenAI embedding similarity:** Send extracted article text to the OpenAI `text-embedding-3-small` model to generate 1536-dimensional embedding vectors, then compute cosine similarity between each saved item's embedding and the centroid embedding of recent interactions. This approach requires an external API call for every new saved item and for the centroid recomputation on each digest generation.

### Technologies/Tools Evaluated

- Cheerio (cheerio.js) . server-side HTML parsing for article text extraction; used in approaches 2 and 3
- scikit-learn TfidfVectorizer . Python prototype for TF-IDF vectorization and cosine similarity computation
- OpenAI API (`text-embedding-3-small`) . embedding generation for approach 3
- PostgreSQL pg_trgm extension . evaluated for trigram-based text similarity as a potential database-native alternative to TF-IDF; discarded early because trigram similarity does not capture topic-level semantics

## Findings

### Finding 1: Tag-Based Matching Achieves ~55% Precision . Below the 70% Threshold

Tag-based matching correctly identified relevant items approximately 55% of the time [fictional] across the three benchmark libraries. The primary failure mode was false negatives: items that were topically relevant but had different domains and non-overlapping OG tags were missed entirely. For example, a user who recently read a TechCrunch article about AI regulation and had a saved Substack post about EU tech policy would not see the Substack post because the two items share no metadata attributes. Tag-based matching works well when users save heavily from a small number of domains (high domain overlap) but fails when reading interests span diverse sources, which is the common pattern in the Brainshelf user base.

**Evidence:**
- Benchmark precision: 54%, 57%, 53% across the three libraries (mean: 54.7% [fictional])
- False negative rate: 38% of items rated "relevant" in the benchmark were not surfaced by the tag-based approach [fictional]
- The approach performed best on Library 2 (57% [fictional]), which had the highest domain concentration (62% of items from 4 domains [fictional])

### Finding 2: TF-IDF Achieves ~72% Precision . Meets the 70% Threshold

TF-IDF vectorization with cosine similarity correctly identified relevant items approximately 72% of the time [fictional] across the three benchmark libraries. The approach captures topic-level similarity regardless of domain or metadata, which resolves the primary failure mode of tag-based matching. The main weakness is vocabulary mismatch: items that discuss the same topic using different terminology (e.g., "machine learning" vs. "AI" vs. "neural networks") receive lower similarity scores than expected. Stop word removal and stemming improved precision by approximately 4 percentage points [fictional] over the raw vectorization baseline.

**Evidence:**
- Benchmark precision: 70%, 74%, 71% across the three libraries (mean: 71.7% [fictional])
- False negative rate: 19% [fictional] . significantly lower than tag-based matching
- Computation time: ~120ms per user library of 300 items on Alex's development machine (M2 MacBook) [fictional]; acceptable for a cron-scheduled batch process that runs once per user per day
- Text extraction success rate: 89% of saved URLs yielded usable article text via Cheerio [fictional]; the remaining 11% were paywalled, dynamically rendered (JS-only), or non-article pages (videos, interactive tools)

### Finding 3: OpenAI Embeddings Achieve ~84% Precision . Highest Accuracy but Adds External Dependency

Embedding similarity using `text-embedding-3-small` achieved approximately 84% precision [fictional], meaningfully outperforming TF-IDF. The embedding approach handles vocabulary mismatch well (the "machine learning" / "AI" / "neural networks" problem) because embeddings encode semantic meaning rather than lexical overlap. However, the approach introduces three new constraints: (1) an external API dependency . if the OpenAI API is down, digest generation fails; (2) a per-call cost of approximately $0.02 per 1M tokens, which at Brainshelf's scale would be roughly $15 - 25/month for initial embedding generation plus $2 - 5/month for ongoing new-save embeddings [fictional]; and (3) a latency overhead of ~200ms per API call for embedding generation [fictional], which is acceptable for batch processing but adds complexity to the save-time pipeline if embeddings are generated synchronously.

**Evidence:**
- Benchmark precision: 82%, 86%, 83% across the three libraries (mean: 83.7% [fictional])
- False negative rate: 11% [fictional] . the lowest of the three approaches
- Cost estimate: ~$15 - 25 one-time for embedding 150K existing saved items [fictional]; ~$2 - 5/month ongoing for new saves [fictional]
- API latency: ~200ms per embedding call [fictional]; batch generation of a 300-item library takes ~60 seconds [fictional]

## Recommendation

**Decision:** Proceed with TF-IDF for the MVP

TF-IDF meets the 70% precision threshold (71.7% mean [fictional]) without introducing an external API dependency, an ongoing cost, or a new infrastructure component. For a pre-Series A team with two backend engineers, operational simplicity matters as much as accuracy . the team cannot afford an on-call rotation for an external API dependency during the A/B test window. TF-IDF also has the advantage of being fully deterministic and inspectable: when a surfaced item seems irrelevant, the team can examine the term vectors to understand why, which is harder with opaque embedding representations.

The 12-point precision gap between TF-IDF (72% [fictional]) and embeddings (84% [fictional]) is real and worth closing in a future iteration. The recommendation is to ship the A/B test with TF-IDF, measure whether the Resurface feature moves the 7-day return rate, and then invest in an embedding migration only if the feature is validated and the precision gap becomes the binding constraint on user satisfaction.

### If Proceeding

- Port the TF-IDF prototype from Python (scikit-learn) to TypeScript for integration into the Brainshelf Node.js backend; Alex R. estimates 3 days of implementation work during Sprint 8
- Build the text extraction pipeline using Cheerio; add a fallback for the ~11% of URLs where text extraction fails [fictional] . use the page's Open Graph description and title as a low-fidelity proxy
- Pre-compute TF-IDF vectors for all existing saved items in a batch migration before the A/B test begins; store vectors in PostgreSQL as JSONB columns alongside the saved item records
- Set the minimum relevance score threshold at 0.15 (cosine similarity) [fictional] based on the spike's benchmark analysis; items below this threshold are excluded from the digest even if the user has fewer than 5 qualifying items

### If Not Proceeding

- n/a . the recommendation is to proceed

## Artifacts

| Artifact | Location | Description |
|----------|----------|-------------|
| Python prototype | `spike/topic-matching/prototype.py` (internal repo) | Scikit-learn TF-IDF prototype with benchmark evaluation harness |
| Benchmark dataset | `spike/topic-matching/benchmark/` (internal repo) | 3 anonymized user libraries (50 items each) with manual relevance ratings |
| Results spreadsheet | Google Sheets . "Topic Matching Spike Results" (internal) | Precision, false negative rate, and computation time for all 3 approaches |
| Architecture sketch | Figma . "Resurface: Topic Matching Data Flow" (internal) | Diagram showing text extraction → vectorization → scoring → digest selection pipeline |

## Open Questions

- [ ] What is the right fallback behavior when text extraction fails for a saved URL? Using OG description + title as a proxy is low-fidelity . should those items be excluded from the digest entirely, or included with a lower confidence weight?
- [ ] Should the TF-IDF vocabulary be global (across all users) or per-user? A global vocabulary captures broader topic similarity but may be diluted by the diversity of the user base; a per-user vocabulary is more precise but computationally expensive to maintain
- [ ] How should the algorithm handle items the user has already seen in a previous digest? The current plan is a 14-day exclusion window, but the right window length depends on the user's library size . a user with 50 items will exhaust the pool faster than a user with 500

## Follow-up Items

| Action | Owner | Timeline |
|--------|-------|----------|
| Port TF-IDF prototype from Python to TypeScript | Alex R. | Sprint 8, week 1 (Feb 3 - 7, 2026) |
| Build text extraction pipeline with Cheerio + OG fallback | Jess T. | Sprint 8, week 1 (Feb 3 - 7, 2026) |
| Run batch migration to pre-compute vectors for existing saved items | Alex R. | Sprint 8, week 2 (Feb 10 - 14, 2026) |
| Define relevance score threshold and digest selection rules | Priya M. + Alex R. | Sprint 8, week 1 (Feb 3 - 7, 2026) |
| Evaluate embedding migration as a v2 improvement if Resurface A/B test succeeds | Alex R. | Post-experiment (April 2026) |
