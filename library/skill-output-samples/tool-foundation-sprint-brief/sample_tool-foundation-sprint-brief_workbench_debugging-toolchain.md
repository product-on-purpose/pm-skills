---
title: "Foundation Sprint Brief: Workbench Debugging Toolchain"
description: "Workbench pre-sprint scope contract locking team, dates, Decider, and success criteria for the specialized-debugger vs general-observability decision."
artifact: foundation-sprint-brief
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-20
status: sample
thread: workbench
context: "Workbench pre-seed developer tooling; brief authored after Go readiness verdict"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Initiative

**Name:** Workbench Foundation Sprint
**Purpose:** Resolve specialized-debugger vs general-observability strategic direction in 2 days, ending with a ratified Founding Hypothesis to guide design-partner pilot conversations and the 8-12 week v0.1 build plan.

**Why a Foundation Sprint:** Stakes are meaningful (8-12 months of build before market signal). Priya and Marcus have credible but opposing starting beliefs. Team has existing SRE knowledge but is split on direction. Readiness verdict is Go with awareness on validation path (covered separately by Priya's design-partner conversion track).

## Team

| Role | Member | Capacity confirmation |
|---|---|---|
| Decider | Priya (founder, PM) | Confirmed: full both days |
| Engineering | Marcus (engineering lead, ex-Splunk) | Confirmed: full both days |
| Design | Ari (design lead, ex-Plaid) | Confirmed: full both days |
| Customer expert | Jin (advisor; current Series C SRE) | Confirmed: full both days |
| Facilitator | Ari (Days 1 + 2 AM); Priya (Day 2 PM Magic Lenses) | Confirmed |

Team size: 4 people including Decider. Within canonical 3-5 range.

## Logistics

**Dates:** 2026-05-21 (Day 1) + 2026-05-22 (Day 2)
**Hours:** 10:00-18:00 PT both days, with 1-hour lunch
**Location:** Workbench Oakland office, "Bay 7" conference room; FigJam board for asynchronous capture
**Pre-sprint comms:** Priya sends brief + 19-interview synthesis to team 2 days before (2026-05-19 EOD)
**During-sprint comms:** No Slack, no email, phones in basket at door (Jin gets exception via SMS for active production incidents at his employer)

## Success Criteria

The sprint succeeds when all four are true at end of Day 2:

1. **A single Founding Hypothesis exists** matching the strict canonical template, ratified by Priya at Day 2 end Decider Checkpoint.
2. **A top bet AND a backup plan exist** for the v0.1 build direction. Top bet enters design-partner conversion + 8-12 week build; backup is documented for explicit pivot.
3. **An assumption scorecard exists** with 5-7 named assumptions, ranked by risk, with the highest-risk assumption identified as the primary validation target.
4. **Priya is willing to commit Workbench to the chosen direction publicly** to design-partner candidates and to the seed-round investors she's beginning conversations with.

Counter-criteria (the sprint did NOT succeed if):

- The team leaves with both directions preserved ("we'll build both modules").
- The Founding Hypothesis is paraphrased away from the strict canonical template structure.
- The chosen top bet relies on capability the team has not seen evidence of.

## Scope

**In scope:**

- Target customer specificity within SRE-at-growth-stage-startups
- Important problem in the incident lifecycle (incident-time vs always-on)
- Team advantage relative to Datadog, Honeycomb, New Relic, Sentry, Lightstep
- Differentiation principles + Mini Manifesto
- 3-7 approach options for "how we build value"
- Magic Lenses (4 classic + at least 1 custom)
- Founding Hypothesis + assumption scorecard

**Out of scope:**

- Pricing model decisions (downstream of top bet)
- Specific feature lists within chosen approach (Design Sprint territory)
- Hiring plan
- Open-source vs proprietary licensing (downstream of top bet)
- AWS vs GCP vs multi-cloud pilot architecture decisions

## Risks

| Risk | Mitigation |
|---|---|
| Priya and Marcus have opposing starting beliefs (specialized vs general) | Use `tool-note-and-vote` whenever conversation stalls; Decider supervote binding |
| Jin's lived experience is one-company-specific | Jin's voice in Basics is heavy but team explicitly cross-checks with the broader 19-interview synthesis |
| Team tempted to ship "specialized debugger that grows into observability platform" (combined fantasy) | Mini Manifesto negative-positioning paragraph explicitly forbids the combination in v0.1 |
| Marcus has Splunk muscle memory that bends toward general-observability shape | Priya monitors and surfaces if it shows up; not an issue, just an awareness item |

## Output Path

The Founding Hypothesis enters two parallel tracks:

1. **Design-partner conversion** (Priya, 2-3 weeks): close at least one pilot to validate the highest-risk assumption.
2. **Seed-round investor conversations** (Priya, 4-8 weeks): the Founding Hypothesis is the strategic frame for fundraising; needs to be defensible.

If the design-partner track reveals A1 (highest-risk assumption) is wrong, the team uses the backup plan and re-opens the hypothesis. If A1 holds, the team commits to v0.1 build.

## Decider Checkpoint

**Priya sign-off required to start Day 1.**

- [x] Priya confirms team composition, dates, location, and logistics.
- [x] Priya agrees to the success criteria as stated.
- [x] Priya agrees to the counter-criteria (sprint did NOT succeed if).
- [x] Priya commits to publicly committing Workbench to the chosen direction post-sprint (design-partner candidates + investor conversations).
- [x] Priya commits to closing at least one design-partner pilot within 2 weeks of sprint output.

**Signed:** Priya, 2026-05-20 18:00 PT
