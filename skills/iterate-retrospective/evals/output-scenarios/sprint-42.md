---
scenario: sprint-42
skill: iterate-retrospective
family: learning
created: 2026-06-14
---

# Scenario: Sprint 42 team retrospective

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce a retrospective artifact for
it. Judges never see this header.

## Context

**Team:** a 7-person product squad (PM, designer, 4 engineers, QA) on a payments product.
**Period:** Sprint 42, a two-week sprint that ended Friday. The sprint included a production incident.
**Attendees at the retro:** all 7. Two engineers (Priya, Marco) tend to dominate; the QA (Sam) and one
backend engineer (Lee) were quiet.

## Raw input gathered before/at the retro

**What people said went well:**
- The new payment-method UI shipped and early feedback is positive (designer, PM).
- Pairing on the refund bug "unblocked us in an hour instead of a day" (Priya).
- QA caught a currency-rounding bug before release (PM, crediting Sam).

**What people said was rough:**
- A production incident on Wednesday: a config change took checkout down for ~25 minutes. No clear
  owner during the incident; people weren't sure who was on call.
- "We pulled in two extra tickets mid-sprint and nothing got cut, so everything slipped" (Marco).
- Designer felt design review happened too late, after engineers had already built.
- Lee mentioned (quietly) that the staging environment was broken for two days and slowed testing.
- Estimates were "wildly off" on the integration ticket.

**Previous retro's action items (Sprint 41):**
1. "Set up a clear on-call rotation" - owner: Priya - status: NOT done.
2. "Add a design-review checkpoint to the start of each ticket" - owner: designer - status: partially
   done (tried once).
3. "Document the staging reset procedure" - owner: Lee - status: done.

**What the team wants from the artifact:** a documented retro a missing teammate could read, with
prioritized improvements and owned, dated action items, and a review of the prior actions. Facilitator
is the PM.
