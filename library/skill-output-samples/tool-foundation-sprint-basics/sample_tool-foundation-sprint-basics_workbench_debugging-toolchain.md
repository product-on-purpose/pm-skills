---
title: "Foundation Sprint Basics: Workbench Debugging Toolchain"
description: "Workbench Day 1 morning bundled artifact: target customer, important problem, team advantage, competitor + alternatives map."
artifact: foundation-sprint-basics
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-21
status: sample
thread: workbench
context: "Workbench Day 1 AM (10:00-12:30 PT 2026-05-21); Basics block bundled artifact"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Target Customer

**Statement:** Senior site reliability engineers (SREs) and infrastructure-platform engineers at growth-stage US startups (Series B-D, 100-500 engineers, $100M-$1B ARR), with significant distributed-systems complexity (5+ services owned by 3+ teams, polyglot microservices, hybrid cloud or multi-region deployments). The SRE is typically a band-level engineer or a tech-lead who carries pager duty and has authority to recommend tooling purchases under $50k/year.

**Specificity test:** the team rejected three less-specific framings during Basics: "all backend engineers" (too broad; observability use case differs), "DevOps at any company" (too broad on company size; Series B-D has different SRE patterns than series A or enterprise), and "engineers debugging production" (too broad on phase; this is an SRE workflow, not a general engineering workflow).

**Not the target customer (v0.1):**

- Application developers debugging their own services (different workflow; uses different tools)
- Series A startups under 50 engineers (don't yet have distributed-systems complexity)
- Enterprise SRE teams (5000+ engineers; different procurement, different scale, different competitors)
- Platform team builders (different scope; they build infrastructure, don't debug production incidents)
- Solo developers and consultants (different scale entirely)

## Important Problem

**Statement:** When a production incident hits a distributed system at a Series B-D growth-stage startup, the SRE on call faces 5-20 minutes of "what is actually happening" disorientation: which service is failing, which version is deployed where, which dependency is causing it, what state preceded the failure. Existing tools (Datadog, Honeycomb, Sentry) excel at always-on observability but force the SRE to manually correlate across dashboards during the worst possible cognitive moment. The MTTR (mean time to recovery) penalty is dominated by this disorientation phase, not by the fix itself once the cause is known.

**Concrete examples from the 19 SRE interviews:**

- An SRE at a Series C fintech took 14 minutes to discover that an upstream dependency had silently retried-then-circuit-broken during a partial outage; the trace existed but was buried under 3 levels of correlation in Datadog
- A platform-team lead at a Series D logistics startup said their last 4 incidents had MTTR > 30 min where 80% of the time was "figuring out what was happening, not fixing it"
- A senior SRE at a Series B SaaS specifically said "I have 6 tools open during an incident; I want 1"

**Why this problem matters now:** Service-mesh adoption + Kubernetes operator complexity + AI/ML inference services creating new failure modes has compounded distributed-systems complexity at the Series B-D band specifically. Pre-Kubernetes, MTTR was dominated by fix time. Now MTTR is dominated by understanding time.

## Team Advantage

**Statement:** The Workbench team combines three capabilities rare in combination: (1) deep observability-platform product expertise (Priya was Datadog senior PM for tracing and dashboarding), (2) distributed-tracing engineering pedigree (Marcus shipped Splunk's distributed-tracing infrastructure end to end), (3) current target-customer empathy (Jin is actively on-call as a Series C SRE every week).

**Why us, why now:**

- Priya knows the observability category's commercial structure (pricing, sales motion, churn drivers) from the inside
- Marcus knows the production realities of distributed-tracing at scale; he knows where Datadog and competitors hit the wall
- Jin gives weekly customer-side reality checks: when product proposals would not actually help during an on-call shift, Jin flags it
- Ari's Plaid background includes payments-network debugging experience: a different but adjacent SRE-shaped problem space

**What the team is NOT:**

- We are not deeply enterprise; the Series B-D band is intentional and we won't have credible enterprise references for 12-18 months
- We are not a security team; SIEM and SecOps tooling is adjacent but not in scope
- We don't have AWS or GCP partnership relationships (yet); GTM is direct sales to SRE leaders

## Competitors and Alternatives

| Category | Specific competitors | Strengths | Why customers leave / never start |
|---|---|---|---|
| Full observability platforms | Datadog, New Relic, Dynatrace | Comprehensive; widely deployed | Expensive at scale; UX optimized for always-on, not for incident-time |
| Tracing specialists | Honeycomb, Lightstep, Sentry | Strong on traces; good UX | Tracing is one piece; SREs need state + dependency view during incidents |
| Open-source stack | Grafana + Prometheus + Loki + Tempo + Jaeger | Free; flexible | Significant setup; teams under 5 SRE often can't maintain it |
| Logs-first tools | Splunk, Sumo Logic | Strong on search; mature | Logs alone don't reconstruct distributed call paths fast enough |
| SRE platform suites | PagerDuty, Incident.io, Rootly | Strong on incident workflow | Don't help with "what is actually happening"; they help orchestrate response |
| Doing nothing / multi-tool juggle | (status quo: 5-7 dashboards during incident) | Familiar | The 14-minute MTTR penalty per interviews |
| Internal homegrown tools | Custom Grafana dashboards, internal trace viewers | Tailored | Bus-factor risk, no investment in UX, drift over time |

**Critical alternative often missed: multi-tool juggling is the status quo.** Most Series B-D SREs operate during incidents by switching between 5-7 tools open in browser tabs. This is the dominant competitor, not Datadog as a single product.

## Decider Checkpoint

**Priya sign-off required to proceed to Differentiation (Day 1 PM).**

- [x] Priya confirms the target customer statement and the five "not the target" exclusions.
- [x] Priya confirms the important problem statement focuses on the disorientation phase of MTTR, not the fix phase.
- [x] Priya confirms the team advantage statement is honest, not flattering.
- [x] Priya confirms the competitor map including multi-tool-juggling as the dominant status quo.
- [x] Priya accepts that this framing positions Workbench as incident-time-focused, leaning toward the specialized direction.

**Signed:** Priya, 2026-05-21 12:35 PT
