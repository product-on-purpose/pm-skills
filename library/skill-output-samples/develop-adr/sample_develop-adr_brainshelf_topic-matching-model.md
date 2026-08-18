---
title: "Develop ADR: Brainshelf Topic-Matching Model"
description: "Brainshelf consumer PKM app - embedding model decision for the Resurface topic-matching algorithm."
artifact: adr
version: "1.0"
repo_version: "2.33.0"
skill_version: "2.2.0"
created: 2026-08-18
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . embedding model decision for the Resurface topic-matching algorithm
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Resurface digest picks which saved items to surface by matching a user's recent reading against their archive. The Sprint 7 spike proved the approach worked but left the model question open . the prototype called OpenAI's embedding API because it was the fastest thing to wire up, not because anyone had compared it. With the A/B test scheduled for Sprint 9 and the cost line now visible to Priya M., Alex R. was asked to settle the model choice and write it up before the test locks the pipeline in place.

The team compared three options against retrieval quality on a hand-labelled set, per-item cost at projected archive sizes, and how much of the pipeline would need rebuilding if the model changed later. That last criterion is what pushed this into an ADR rather than a spike note: the embedding dimension propagates into the vector index schema, so the choice is not a line-item swap.

**Source Notes:**

- Michael Nygard, "Documenting Architecture Decisions" (cognitect.com/blog/2011/11/15/documenting-architecture-decisions) . the lightweight ADR format used in this document.
- OpenAI, "Embeddings" (platform.openai.com/docs/guides/embeddings) . the `text-embedding-3-small` model and its dimension-reduction parameter referenced in the evaluation.
- Nils Reimers and Iryna Gurevych, "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks" (arxiv.org/abs/1908.10084) . the sentence-transformers family considered as the self-hosted alternative.
- Massive Text Embedding Benchmark (huggingface.co/spaces/mteb/leaderboard) . the public retrieval benchmark the team used to shortlist candidates before running their own evaluation.

---

## Prompt

```
develop-adr

topic matching model for resurface. the spike used openai
text-embedding-3-small because it was quickest to get running,
never actually compared anything.

need to lock this before sprint 9 a/b test.

options:
- openai text-embedding-3-small: what we have. good enough on our
  eval set. $0.02 per 1M tokens. dimension 1536, can truncate to 512
- self-host all-MiniLM-L6-v2 on our own box: free per call but
  someone has to babysit it, and retrieval was noticeably worse on
  the long-form stuff people actually save
- cohere embed-v3: slightly better on our set than openai, roughly
  3x the price, and a second vendor to onboard

the thing marco keeps raising is what happens when we want to switch.
the vector index is built at whatever dimension we pick.

we're leaning openai but write up what the lock-in actually costs.
```

---

## Output

# ADR-011: Use OpenAI text-embedding-3-small for Resurface Topic Matching

## Status

Accepted

**Date:** 2026-08-14
**Deciders:** Alex R. (Engineering Lead), Priya M. (Product Manager), Marco L. (Backend Engineer)

## Context

Resurface selects which archived items to include in a user's morning digest by comparing embeddings of recently read content against embeddings of their saved archive. The Sprint 7 spike established that the approach produces digests users rate as relevant, but the spike used OpenAI's `text-embedding-3-small` for expedience and never evaluated alternatives.

Three constraints shape the decision. First, retrieval quality on long-form saved content . the material Brainshelf users actually archive skews toward articles and essays, not short notes, and a model that performs well on short-text benchmarks may not transfer. Second, per-item cost at projected scale: 22K MAU with a median archive of 340 saved items [fictional] means roughly 7.5M items to embed at backfill [fictional], plus ongoing embedding of new saves at approximately 95K items per week [fictional]. Third, and the reason this is an ADR rather than a spike note, the embedding dimension is written into the pgvector index schema. Changing models later is not a configuration change; it is a re-embed of the entire archive plus an index rebuild.

The team evaluated three candidates against a hand-labelled relevance set of 200 query-archive pairs drawn from internal accounts [fictional].

## Decision

We will use OpenAI's `text-embedding-3-small` for Resurface topic matching, truncated to 512 dimensions via the API's `dimensions` parameter rather than the native 1536.

The truncation is deliberate. On the evaluation set, 512 dimensions cost 1.2 percentage points of top-10 recall against full-dimension output [fictional] while reducing the pgvector index size by roughly two thirds [fictional], which keeps the index in memory on the current database instance. Marco L. will implement the embedding pipeline behind an internal `EmbeddingProvider` interface so that the call site does not name a vendor.

## Consequences

### Positive

- Highest retrieval quality of the three candidates on long-form content: top-10 recall of 0.81 against 0.74 for the self-hosted baseline [fictional]
- No inference infrastructure to operate; the team of two backend engineers has no ML-ops capacity and the Sprint 9 test date does not allow for building it
- Backfill cost of approximately $38 one-off [fictional] and ongoing cost of roughly $6 per month at current save volume [fictional] are small enough that cost is not a factor in the A/B test decision

### Negative

- A vendor outage stops new saves from being embedded. Digests still send from previously embedded content, so the failure is degraded relevance rather than a blank email, but it is silent and we will not notice without an explicit alert
- Sending saved-content text to a third-party API is a new data-flow commitment that did not exist before, and one we will have to describe plainly in the privacy policy before the A/B test opens to external users
- The team gains no in-house understanding of retrieval quality; when relevance complaints arrive we can tune prompts and thresholds but cannot inspect or adjust the model

### Neutral

- The `EmbeddingProvider` interface keeps the call site vendor-neutral, but as the Model Choice table records, the interface is not where the real coupling lives

### Model Choice

| Consequence | This decision |
|-------------|---------------|
| **Build, buy, or prompt** | Buy: call OpenAI's embedding API. Self-hosting `all-MiniLM-L6-v2` was ruled out on retrieval quality for long-form content (0.74 top-10 recall against 0.81 [fictional]) and on having no one to operate it. Cohere `embed-v3` scored marginally higher (0.83 [fictional]) but at roughly 3x cost and a second vendor relationship, which did not clear the bar for 2 points of recall |
| **What is now coupled to it** | The pgvector index is built at 512 dimensions, so the schema is tied to this choice. Also coupled: the 0.62 similarity threshold that decides digest inclusion, tuned against this model's score distribution, and the 200-pair evaluation set, which is comparable only across models scored the same way. The `EmbeddingProvider` interface abstracts the call, not the index |
| **Operating cost accepted** | About $38 for the initial backfill and $6 per month ongoing at 95K new saves per week [fictional]. This stops being negligible if archive growth outpaces MAU growth . at roughly 10x current save volume the monthly line reaches a point where the self-hosted option is worth re-costing |
| **Reversal cost** | Re-embedding 7.5M items and rebuilding the pgvector index: approximately 6 engineer-days plus one maintenance window [fictional], during which Resurface digests degrade to the previous day's selections. The similarity threshold must also be re-tuned, which means re-running the labelled evaluation. The interface makes the code change trivial; the data migration is the cost |
| **What would reopen this** | Two observations. Digest relevance ratings dropping below 3.5 of 5 [fictional] while prompt and threshold tuning are exhausted, which would mean the model is the ceiling. Or OpenAI deprecating `text-embedding-3-small`, which forces the re-embed regardless and makes it the moment to reconsider the other two |

## Alternatives Considered

### Self-hosted all-MiniLM-L6-v2

Free per call and keeps saved content on our own infrastructure, which is the stronger privacy position. Rejected on two grounds: top-10 recall of 0.74 against 0.81 [fictional] on the evaluation set, with the gap concentrated in exactly the long-form articles that dominate real archives; and no one on a two-engineer backend team to own inference uptime before Sprint 9. Worth revisiting if save volume grows enough to make the cost line material, since the privacy argument survives the quality argument.

### Cohere embed-v3

Best retrieval score of the three at 0.83 top-10 recall [fictional]. Rejected because 2 percentage points of recall did not justify roughly 3x the per-token cost and onboarding a second vendor, including a new data-processing agreement. The margin is small enough to sit inside the noise of a 200-pair evaluation set, so the quality advantage is not firmly established.

## References

- Sprint 7 spike summary: topic-matching algorithm feasibility
- Resurface A/B test design (Sprint 9)
- Brainshelf privacy policy . third-party data processor section, pending update
