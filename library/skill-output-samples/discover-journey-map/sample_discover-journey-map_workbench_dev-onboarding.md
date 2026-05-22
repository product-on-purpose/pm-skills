---
title: "Discover Journey Map: Workbench Developer Onboarding"
description: "Workbench internal dev-experience - new engineer journey from offer to independent feature ownership."
artifact: journey-map
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: workbench
context: Workbench internal dev-experience platform - new engineer from pre-day-1 to independent contribution
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is an internal developer-experience platform. The platform team wants a journey map of the new-engineer onboarding experience to decide where to invest dev-experience effort. The persona is a newly hired engineer; the journey runs from offer acceptance to independent feature ownership. Grounded in a new-hire onboarding survey (n=22 engineers hired in the last two quarters) and 5 follow-up interviews [fictional]. The decisive moment of truth is the **first merged pull request**: it is the moment a new engineer feels both technically competent and psychologically safe. All figures and quotes are illustrative and tagged `[fictional]`.

**Source Notes:**

- Chip Heath and Dan Heath, "The Power of Moments" (Simon and Schuster, 2017) - the "first merged PR" is treated as an engineered peak moment; the Heaths' point that organizations should deliberately create defining moments rather than leave them to chance drives the recommendations.
- Abi Noda, Margaret-Anne Storey, Nicole Forsgren, Michaela Greiler, "DevEx: What Actually Drives Productivity" (ACM Queue, 2023) - the three dimensions of developer experience (feedback loops, cognitive load, flow state) frame the pain-point analysis, especially the cognitive-load cost of environment setup.
- Kate Kaplan, "Journey Mapping 101" (Nielsen Norman Group, nngroup.com) - the journey-map anatomy (stages, touchpoints, emotional curve, opportunities), applied here to an internal-employee journey rather than a customer one.

---

## Prompt

```
/journey-map

map the new-engineer onboarding journey so we can decide where to invest
dev-experience effort. persona is a newly hired software engineer.

stages: pre-day-1 (offer accepted, paperwork) -> day-1 (laptop + accounts)
-> week-1 (orientation + exploring the codebase) -> month-1 (first PR
merged) -> month-3 (owns a feature independently).

we have an onboarding survey (n=22 recent hires) + 5 interviews. the
recurring theme is tooling/access friction: env setup takes days, access
requests bounce around, docs are stale. the high point everyone remembers
is their first merged PR.

linear journey. include a mermaid timeline. recommendations should be
dev-experience investments.
```

---

## Output

# Customer Journey Map: New Engineer Onboarding - "From Offer to Ownership"

## Executive Summary

This map covers a newly hired engineer from offer acceptance to independent feature ownership (roughly a 3-month arc). It is grounded in an onboarding survey (n=22) and 5 interviews [fictional]. The dominant pain pattern is **tooling and access friction**: environment setup, account provisioning, and stale documentation consume the first week and depress early confidence. The decisive moment of truth is the **first merged pull request** - the survey shows engineers who merged a PR in week 1 reported markedly higher confidence at day 30 than those who took three weeks [fictional]. The largest opportunity is compressing time-to-first-PR by fixing the environment-setup and access bottlenecks that block it.

## Persona / Segment

Newly hired software engineer, mid-level, joining an existing team. Competent and motivated but unfamiliar with the company's tooling, codebase, and conventions. Anxious to prove themselves and reluctant to ask "obvious" questions in the first weeks. Wants to ship something real quickly to feel like a contributor rather than a cost. This matches the "New Contributor" persona from the foundation-persona artifact.

## Journey Scope

- **Journey type:** Linear
- **Included:** Offer acceptance through first independent feature ownership (roughly day -7 to day 90)
- **Excluded:** Recruiting and interview experience (upstream), long-term career growth and promotion (downstream)

## Stages

| # | Stage | Engineer goal | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | Pre-day-1 | Arrive ready, not anxious | ~1 week | Offer accepted | First day begins |
| 2 | Day-1 | Get set up and feel welcomed | 1 day | Starts | Can log in and access core systems |
| 3 | Week-1 | Understand the codebase and team | 1 week | Accounts provisioned | Environment runs locally; first task picked up |
| 4 | Month-1 | Ship a first real change | ~4 weeks | First task assigned | First PR merged |
| 5 | Month-3 | Own a feature without hand-holding | ~8 weeks | Trusted with a feature | Ships a feature independently |

## Touchpoints per Stage

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| Pre-day-1 | Welcome email + pre-boarding checklist | Email | Receives logistics, sometimes hardware ships |
| Day-1 | Laptop setup + IT provisioning | Workbench / IT | Installs tooling, requests accounts |
| Day-1 | Team intro + buddy assignment | Meeting, chat | Meets the team, gets a buddy |
| Week-1 | Local environment setup | Workbench, docs | Tries to build and run the app locally |
| Week-1 | Access requests (repos, secrets, staging) | Ticketing | Requests permissions, waits for approvals |
| Week-1 | Codebase + onboarding docs | Wiki, repo | Reads docs of varying freshness |
| Month-1 | First task + code review | Workbench, PR tool | Opens a PR, gets review feedback |
| Month-1 | First merged PR | PR tool, CI/CD | Change ships to main / production |
| Month-3 | Feature design + ownership | Team process | Leads a feature end to end |

## Emotional Curve

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| Pre-day-1 | Excited, slightly anxious | Medium | 5 interviews; mix of eagerness and "will I be ready?" [fictional] |
| Day-1 | Welcomed but overwhelmed by setup | High | Survey: setup was the most-cited day-1 friction [fictional] |
| Week-1 | Frustration (tooling and access friction) | High | Survey: env setup averaged ~3 days; access waits common [fictional] |
| Month-1 | Building confidence, peaking at first merge | High | Survey: first-PR week correlated with day-30 confidence [fictional] |
| Month-3 | Competence, sense of belonging | Medium | Hypothesis from 5 interviews; not broadly measured [fictional] |

## Pain Points and Moments of Truth

| Stage | Pain / Moment of Truth | Severity (1-5) | Evidence | Implication |
|---|---|---|---|---|
| Week-1 | Environment setup takes days | 5 | Survey: ~3 days average to a running local env [fictional] | Biggest single drag on time-to-first-PR; high cognitive load (DevEx) |
| Week-1 | Access requests bounce around | 4 | Survey: multiple hand-offs, multi-day waits [fictional] | Blocks work and signals "you're not trusted yet" |
| Week-1 | Stale onboarding docs | 4 | 4 of 5 interviewees hit outdated instructions [fictional] | Erodes trust in all docs; new hires stop reading them |
| Month-1 | First merged PR | Moment of Truth (5) | Week-1 mergers far more confident at day 30 [fictional] | The defining peak; everything before it should serve getting here fast |
| Month-1 | First code review feels harsh | 3 | 2 interviewees felt early reviews were blunt [fictional] | Review tone shapes psychological safety at a fragile moment |

## Opportunities

| Stage | Opportunity | Dev-experience investment | Effort (rough) |
|---|---|---|---|
| Day-1 | Eliminate setup toil | One-command / containerized dev environment in Workbench (golden path) | Large |
| Week-1 | Remove access waits | Pre-provision a standard new-engineer access bundle on offer acceptance | Medium |
| Week-1 | Stop stale docs | A "last verified" date + a one-click "this is wrong" report on each onboarding doc | Small |
| Month-1 | Engineer the first-PR peak | Curate a "good first issue" queue so a new hire can open a real PR in week 1 | Medium |
| Month-1 | Protect psychological safety | A reviewer guideline for first-PR reviews (lead with what works, explain the why) | Small |

## Visual

```
timeline
    title New Engineer Onboarding Journey
    Pre-day-1 : Welcome email : Pre-boarding checklist
    Day-1 : Laptop setup : Account provisioning : Meet the team
    Week-1 : Local env setup : Access requests : Explore codebase
    Month-1 : First task : Code review : First PR merged (moment of truth)
    Month-3 : Owns a feature independently
```

## Research Gaps

- The Month-3 belonging emotion is Hypothesis from 5 interviews [fictional]; a 90-day check-in survey would replace it with measured signal.
- The first-PR-to-confidence correlation is self-reported [fictional]. Instrumenting time-to-first-merged-PR from Workbench and correlating with retention at 6 months would turn the central moment of truth into a hard metric.
- No signal on contractors or fully-remote hires, whose setup and access friction may differ. A segmented cut of the onboarding survey would test this.
