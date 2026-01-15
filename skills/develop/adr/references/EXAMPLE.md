---
artifact: adr
version: "1.0"
created: 2026-01-14
status: complete
context: New order processing service needs a database for transactional data
---

# ADR-007: Use PostgreSQL for Order Data

## Status

Accepted

**Date:** 2026-01-14
**Deciders:** Chen Wei (Tech Lead), Sarah Park (Architect), Marcus Johnson (DBA)

## Context

We are building a new order processing service to replace our legacy monolith's order management module. This service will handle approximately 50,000 orders per day initially, with projected growth to 500,000 orders per day within two years.

The order data has the following characteristics:
- Strong consistency requirements (cannot lose or duplicate orders)
- Complex relationships (orders, line items, shipping addresses, payment records)
- Need for ACID transactions during order creation and updates
- Regulatory requirement to maintain complete audit history
- Reporting queries against order data by business analysts

Our team has experience with PostgreSQL, MongoDB, and DynamoDB. The company already runs PostgreSQL in production for other services, with established backup and monitoring infrastructure.

Timeline pressure exists: we need to launch the new service within 4 months to meet a deprecation deadline for the legacy system.

## Decision

We will use PostgreSQL as the primary database for the order processing service.

Specifically:
- PostgreSQL 16 on AWS RDS with Multi-AZ deployment
- Read replicas for reporting workloads to avoid impacting transactional performance
- Use of native JSON columns for flexible order metadata while keeping core fields relational
- Connection pooling via PgBouncer

## Consequences

### Positive

- **ACID compliance:** PostgreSQL guarantees the transaction consistency we require for financial data. Order creation spanning multiple tables will either fully succeed or fully rollback.

- **Team expertise:** Three of our four backend engineers have significant PostgreSQL experience. No ramp-up time required, reducing project risk.

- **Operational maturity:** We leverage existing PostgreSQL infrastructure, monitoring (Datadog), and backup procedures. Our DBA team is already trained.

- **Rich query capability:** Complex reporting queries are straightforward with SQL joins. Business analysts can use existing BI tools without learning new query languages.

- **Schema evolution:** PostgreSQL's migration tooling (we use Flyway) provides controlled schema evolution with rollback capability.

### Negative

- **Horizontal scaling limits:** PostgreSQL scales vertically well but horizontal sharding is complex. If we exceed 500K orders/day significantly, we may need to revisit this decision.

- **Schema rigidity:** Schema changes require migrations and potentially downtime for large tables. Adding new order attributes requires more planning than a document store.

- **Cost at scale:** RDS PostgreSQL is more expensive than DynamoDB for high-throughput simple lookups. At 500K orders/day, we estimate $3,200/month vs. $1,800/month for DynamoDB.

### Neutral

- We will need to implement our own soft-delete and audit logging (PostgreSQL doesn't provide this natively like some enterprise databases).

- Read replica lag (typically <1 second) means reporting data may be slightly behind real-time.

## Alternatives Considered

### MongoDB

MongoDB's document model would provide more flexibility for evolving order schemas. However, our need for strong consistency in a distributed write scenario made MongoDB less attractive. The eventual consistency model, while configurable, adds complexity. Additionally, none of our current engineers have production MongoDB experience.

### DynamoDB

DynamoDB would excel at high-throughput single-item lookups and offers seamless horizontal scaling. We rejected it because:
- Complex queries (e.g., "all orders for customer X in date range Y with status Z") require secondary indexes or full scans
- No native join capability means denormalizing data or making multiple queries
- The team would need to learn a new query paradigm and data modeling approach
- Cost advantage only materializes at scales we may not reach

### CockroachDB

CockroachDB offers PostgreSQL compatibility with built-in horizontal scaling. We considered it for future-proofing but rejected it due to:
- Less operational experience in our organization
- Higher complexity for a team our size
- The PostgreSQL-compatible mode has some limitations that could surprise us

## References

- Spike Summary: Database Options for Order Service (/spikes/order-db/summary.md)
- PostgreSQL 16 Release Notes (https://www.postgresql.org/docs/16/release-16.html)
- ADR-003: Use AWS RDS for managed databases (establishes RDS as our database platform)
- Order Service Capacity Planning Document (/docs/order-service/capacity-planning.md)
