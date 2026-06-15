---
scenario: event-streaming
skill: develop-adr
family: technical
created: 2026-06-15
---

# Scenario: event-delivery backbone for order processing (high-tension ADR)

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an Architecture Decision Record
for it. Judges never see this header. This scenario is deliberately high-tension: three genuinely viable
options with real, competing trade-offs, so a strong decision must weigh alternatives honestly and be
candid about negative consequences, not just name a winner.

## Situation

We run an e-commerce order-processing system on a Python/Postgres stack (one regional primary, read
replicas). Today, order events (created, paid, fulfilled, refunded) are propagated by services polling a
Postgres table every few seconds. This is now causing problems: downstream services (inventory, email,
analytics, a new fraud-scoring service) get events seconds-to-minutes late, the polling load is hurting
the primary, and a duplicate-charge incident last month traced back to two services both acting on the
same order row with no clear ordering guarantee.

We need to choose an event-delivery backbone for the next 18 months. The decision is contested on the
team; three options are on the table and each has a real champion.

## Forces and constraints

- **Team:** 6 engineers, all strong in Python/Postgres, none with production Kafka experience. One
  engineer ran Kafka at a previous job and is advocating for it.
- **Delivery semantics:** consumers need at-least-once delivery with a stable per-order ordering;
  the fraud service in particular must not process "paid" before "created".
- **Scale:** ~400k orders/day now, expected ~3x in 18 months. Spiky (flash sales hit 10x for an hour).
- **Multi-region:** a second region (EU) is on the 12-month roadmap; data-residency rules will require
  EU order data to stay in-region.
- **Ops capacity:** the team is already on-call for the monolith; appetite for a new always-on
  distributed system to operate is low but not zero.
- **Budget:** a mid-four-figure monthly spend is acceptable; five-figure needs VP sign-off.
- **Timeline:** the fraud service launches in 10 weeks and needs ordered events by then.

## Options on the table (each has a champion)

1. **Self-hosted Apache Kafka** - the advocate's pick; strong ordering + replay, but a new distributed
   system to operate with no in-house run experience, and multi-region adds real complexity.
2. **A managed streaming service** (e.g., a cloud provider's Kafka-compatible or pub/sub offering) -
   less ops burden, but cost at 3x scale is uncertain and EU data-residency must be verified per vendor.
3. **Postgres transactional outbox + a lightweight relay** - stay on the stack the team knows, exactly-
   once-ish via the outbox pattern and per-order ordering via the order id; but it is more code we own,
   has a throughput ceiling, and the relay is a new component to make reliable.

## What the team wants

A decision record the team can align behind: a clear decision, the context and forces, the alternatives
weighed with honest reasons each lost, and candid positive AND negative consequences (including what gets
harder and what new risks appear), readable by someone who was not in the room.
