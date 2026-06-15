<!-- Anchor artifact: develop-adr (technical) | scenario search-datastore | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This was the draft all three blind judges scored (anchor run wf_c1261234-93a). The scored original is preserved in git at the 2026-06-15 anchor commit; an operating layer (decisions / owners / maintainer fix-notes) was added 2026-06-15 per maintainer review. -->

---
artifact: adr
version: "1.0"
created: 2026-06-15
status: draft
---

# ADR-001: Use Postgres Full-Text Search for v1 In-App Search

## Status

Proposed

**Date:** 2026-06-15
**Deciders:** Platform team (4 engineers), engineering lead

## Context

Our B2B document-collaboration product (shared docs and wikis) runs on a Postgres-backed monolith. Search is the second most requested feature from customers: the recurring complaint is "I know I wrote it somewhere, I just can't find it."

The current implementation relies on `ILIKE` queries against the documents table. This approach breaks down in large workspaces - some customers have 200k+ documents - where query latency is unacceptable and results are returned in no meaningful rank order. We need full-text search across document titles, body text, and comments, with filters by workspace, author, and date.

Three forces dominate the decision:

1. **Operational burden.** The platform team is four engineers, already on-call for the monolith. Adding a net-new infrastructure component (a search cluster) requires engineering capacity we do not have to spare this year.
2. **Data residency.** Customer contracts require all data to remain in the EU region. Any external service must offer a certified EU hosting option.
3. **Budget.** A five-figure monthly bill for a managed search service is a hard sell under this year's constraints.

A secondary force is team expertise: the team has deep Postgres knowledge and little operational experience with Elasticsearch or OpenSearch.

## Decision

We will implement v1 of in-app search using Postgres full-text search (tsvector columns with GIN indexes). Specifically:

- We will add a `tsvector` column to the documents table (and a separate index on comments) using `to_tsvector('english', ...)` over title, body, and comment text.
- We will maintain the `tsvector` columns via Postgres triggers so the index stays current without an external sync pipeline.
- We will expose workspace, author, and date as standard SQL filter predicates alongside the full-text predicate.
- We will use `ts_rank` for relevance ordering in result sets.
- We will not introduce a separate search cluster, search service, or change sync infrastructure for v1.

This decision covers the v1 search datastore only. It does not preclude migrating to a dedicated search engine in a future release if usage patterns or product requirements outgrow what Postgres can support.

## Consequences

### Positive

- No new infrastructure to provision, secure, monitor, or on-call-cover. The team operates Postgres today and knows it well.
- Data never leaves the Postgres instance, so EU-residency compliance requires no additional controls or vendor review.
- Index freshness is maintained by database triggers in the same transaction path as writes; there is no sync lag or replication pipeline to break.
- Implementation can ship faster: no cluster setup, no data pipeline, no credential management for an external service.
- Zero incremental infrastructure cost beyond existing Postgres hosting.

### Negative

- Relevance ranking with `ts_rank` is simpler than what a dedicated engine provides. Boosting, BM25-style scoring, and field-weight tuning are limited.
- Typo tolerance (fuzzy matching) is not supported natively. Users who misspell a word will get no results unless we add pg_trgm alongside tsvector, which adds complexity.
- Faceted search (aggregated filter counts, e.g., "how many results per author") requires separate aggregate queries and will be slower than a dedicated engine's facet API.
- At extreme scale (well beyond 200k documents per workspace, or very high query concurrency), full-text queries may create read pressure on the primary Postgres instance. We may need to route search queries to a replica.
- The decision creates some technical debt: if we later migrate to a dedicated engine, we will need to build a sync pipeline and run the two systems in parallel during cutover.

### Neutral

- The `pg_trgm` extension can be added later to layer trigram-based fuzzy matching on top of tsvector without a datastore change.
- Multilingual document bodies will require explicit language configuration (passing the correct language to `to_tsvector`); English is the safe default for v1.
- Search relevance improvements are bounded by what Postgres exposes. If customers request significantly better ranking, that becomes a concrete signal to reconsider the datastore choice.

## Alternatives Considered

### Self-hosted Elasticsearch or OpenSearch

Elasticsearch and OpenSearch offer superior relevance tuning, native fuzzy matching, and faceting. However, operating a search cluster is a significant ongoing commitment: version upgrades, disk sizing, JVM heap tuning, backup, security patching, and on-call coverage. For a four-engineer team already running a monolith, adding this surface area in v1 is high risk. Keeping data in the EU region requires careful cluster deployment, adding more setup work. This option was deferred, not ruled out permanently - it becomes the natural candidate if Postgres search proves insufficient.

### Managed Search Service (e.g., Elastic Cloud, Algolia, or Typesense Cloud)

A managed service would reduce operational burden relative to self-hosting, but introduces two blockers for v1. First, EU data-residency must be verified for any chosen vendor, which requires legal and security review time we do not have on the current timeline. Second, the cost profile of managed search at production scale could exceed budget, and the team lacks baseline usage data to size costs accurately. A managed service remains a viable path for v2 if Postgres search is insufficient and the team has time to evaluate vendors properly.

## Decisions, Owners & Review

> Operating layer (added 2026-06-15, maintainer review). Converts this ADR from a decision record into
> an operating artifact: explicit owner, review date, and revisit guardrails so the v1 choice does not
> become silent technical debt. Owners/dates are illustrative for this scenario.

| ID | Title | Final decision (summary) | Status | Owner | Review / due | Last updated |
|----|-------|--------------------------|--------|-------|--------------|--------------|
| D-1 | v1 search datastore | Postgres FTS (tsvector + GIN), no separate cluster | DECIDED | Platform lead | v1 + 1 quarter | 2026-06-15 |
| D-2 | When to migrate to a dedicated engine | Pending - revisit when a guardrail trips | OPEN | Platform lead | At first trigger | 2026-06-15 |

### D-1: v1 search datastore
Status: DECIDED

**Context** - Search is the #2 customer request. The constraints: a 4-engineer team already on-call for the monolith, EU data-residency, a tight budget, and deep Postgres (vs. little Elasticsearch) expertise. The simplified question: build search on what we already operate, or take on new infrastructure now?

**Potential solutions** - (a) Postgres full-text search (tsvector + GIN), no new infra; (b) self-hosted Elasticsearch/OpenSearch (superior relevance/fuzzy/faceting, but high ops burden + EU-deployment work); (c) managed search service (less ops, but unverified EU residency + uncertain cost at scale). Recommendation: (a) for v1 - it clears the constraints and ships fastest.

**Final decision** - Use Postgres FTS for v1. Owner: Platform lead. Review at v1 + 1 quarter.

### D-2: When to migrate to a dedicated search engine
Status: OPEN

**Context** - Postgres FTS has known ceilings (simpler ranking, no native fuzzy match, slower faceting, primary read-pressure at scale). Without explicit revisit triggers, "v1 for now" silently hardens into permanent debt. The desired outcome: a pre-agreed, measurable signal that flips us to evaluating a dedicated engine before users feel the limits.

**Potential solutions** - (a) revisit on a fixed calendar cadence (simple, but ignores actual load); (b) revisit on measurable thresholds (recommended - tied to real signals). Recommendation: (b).

**Final decision** - Pending. Revisit when ANY guardrail trips: p95 search latency exceeds the agreed budget at production scale, search read-load exceeds the agreed share of primary DB capacity, or there are 2+ high-priority relevance/fuzzy-match complaints in a quarter. Owner: Platform lead. Re-evaluate at the first trigger (set the concrete thresholds with the data scientist before v1 ships).

## References

- Postgres documentation: Full-Text Search (Chapter 12)
- Postgres documentation: `pg_trgm` module (for potential fuzzy-match extension)
- Customer feedback log: search requests represent the #2 feature request by vote count
- Platform team on-call runbook (internal): current infrastructure surface and escalation policy
