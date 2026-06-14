---
scenario: search-datastore
skill: develop-adr
family: technical
created: 2026-06-14
---

# Scenario: choosing the datastore for in-app search

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an ADR for it. Judges never
see this header.

## Decision context

**System:** a B2B document-collaboration product (think shared docs + wikis) on a Postgres-backed
monolith with a small platform team (4 engineers). We need to add **full-text search across documents**
(title + body + comments), with filters by workspace, author, and date.

**Why this is coming up now:**
- Customers increasingly ask "I know I wrote it somewhere, I just can't find it." Search is the #2
  requested feature.
- The current naive `ILIKE` query against Postgres is slow on large workspaces (some have 200k+ docs)
  and cannot rank by relevance.

**Forces and constraints the team named:**
- The platform team is small and on-call already; **operational burden matters a lot**.
- Data must stay in our **EU region** (customer contracts); a managed service must offer EU hosting.
- Documents change constantly; **near-real-time index freshness** matters (stale results erode trust).
- Budget is constrained this year; a five-figure monthly search bill is a hard sell.
- The team has **deep Postgres expertise** and **little Elasticsearch operational experience**.

**Options on the table (as the team framed them):**
1. **Postgres full-text search** (tsvector/GIN) - no new infrastructure, but limited relevance tuning
   and weaker at typo tolerance and faceting.
2. **Self-hosted Elasticsearch/OpenSearch** - powerful and flexible, but a new cluster to operate,
   secure, and keep in sync; real ops cost for a 4-person team.
3. **A managed search service (e.g., Elastic Cloud or a hosted search API)** - less ops, more $$, and
   a data-residency/vendor question.

**What is being decided:** which datastore backs v1 of in-app search. The team wants the decision and
its consequences recorded so future engineers understand why.
