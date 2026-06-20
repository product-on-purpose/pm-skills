---
title: "Stakeholder Briefings: Workbench Blueprints GA Enterprise Launch"
description: "One Blueprints GA enterprise launch plan fanned out into four audience briefings (PMM, Sales, CS/Support, Executive) from a single traceable master document."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Blueprints v1 GA enterprise launch plan projected to four go-to-market and leadership lenses
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Blueprints v1 is going GA to all 500 enterprise accounts [fictional] via a progressive rollout. Rachel V. (PM) owns the launch plan; the same plan has to mobilize four teams - PMM (owns the launch narrative and assets), enterprise sales led by Mei-Lin T. (works the pipeline), CS/Support (handles the customer transition and known issues), and Sandra C. (Head of Product, the launch sponsor). Rather than send each team a different email, Rachel runs `foundation-stakeholder-briefings` against the launch plan. The skill proposes PMM, Sales, CS/Support, and Executive for a GTM source; Rachel takes the proposal as-is.

**Source Notes:**

- Workbench is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @blueprints-ga-launch-plan.md --go

Source: Blueprints v1 GA enterprise launch plan (GTM/launch).

Plan [fictional]: GA to all 500 enterprise accounts via progressive rollout
(10% / 25% / 50% / 100%) over one week, starting April 28. Headline value:
governed documents - required sections + role-based approval gates + SSO.
Differentiator vs. Confluence/Notion/Coda: enforced governance, not just
co-editing. Launch assets: blog post, customer email, sales enablement deck,
in-app announcement.

Known issues going in [fictional]: (1) SSO provisioning is manual and
error-prone - flagged as a launch-week risk; (2) approval-reject button is
behind a secondary menu, so first-time approvers may not find it. Both are
documented; SSO has an admin provisioning guide.

Targets [fictional]: time-to-approved holds at <=2.5 days at scale; 60% of
accounts activated within 30 days. Sponsor / go-decision: Sandra C. (Head of
Product). Sales lead: Mei-Lin T. Audiences: take the GTM proposal (PMM, Sales,
CS/Support, Executive).
```

## Output

```markdown
# Stakeholder briefings: Blueprints v1 GA enterprise launch

## Master document

**What and why**

- M1: Blueprints v1 goes GA to all 500 enterprise accounts [fictional] via a progressive rollout (10% / 25% / 50% / 100%) over one week, starting April 28.
- M2: The headline value is governed documents: required sections, role-based approval gates, and SSO, bundled as the enterprise governance story.
- M3: The differentiator against Confluence, Notion, and Coda is enforced governance, not just co-editing - the gap the incumbents leave open.

**Decisions**

- M4: Launch assets are scoped and owned: a launch blog post, a customer email, a sales enablement deck, and an in-app announcement.
- M5: The rollout is progressive specifically so issues are caught at 10% before they reach all accounts.

**Status**

- M6: Two known issues go into launch week: SSO provisioning is manual and error-prone (a documented launch-week risk, with an admin provisioning guide), and the approval-reject button is behind a secondary menu, so first-time approvers may struggle to find it.
- M7: Both known issues are documented with workarounds; neither is a launch blocker, but both are likely to generate support volume.

**Risks and open questions**

- M8: The manual SSO provisioning step is the highest launch-week operational risk; a misconfiguration could block an account's access until corrected.

**Asks**

- M9: Confirm the GA go and the April 28 start date, owned by Sandra C. (Head of Product).

**Timeline**

- M10: Rollout April 28 to roughly May 5 (one week, four tiers); success measured over the first 30 days: time-to-approved holds at 2.5 days or less at scale [fictional], and 60% of accounts activated within 30 days [fictional].

## Briefings

--- BEGIN: PMM ---

**Draws on:** M1, M2, M3, M4

**Primary ask:** Ship the launch narrative and assets on the governed-documents frame, with the in-app announcement live by April 28.

**Lead the launch on governed documents - the category the incumbents cannot claim**

**What this means for PMM**

The story writes itself if we hold the frame: Blueprints brings governed documents to the enterprise - required sections, role-based approval, SSO (M2) - and the differentiator is enforced governance, not co-editing (M3). Confluence, Notion, and Coda already own "great collaborative docs," so the launch narrative must not compete there; it has to name the governance gap they leave open and plant Blueprints in it. Every asset should inherit that one frame.

The deliverables are scoped (M4): the launch blog post, the customer email, the sales enablement deck, and the in-app announcement, all on the governed-documents narrative. The primary ask is to ship those assets on that frame with the in-app announcement live for the April 28 start, so the moment customers first see Blueprints, the positioning is already doing the work.

--- END ---

--- BEGIN: Sales ---

**Draws on:** M2, M3, M10

**Primary ask:** Prioritize the governance-led talk track in open enterprise deals timed to the April 28 GA, and prime accounts in pipeline.

**Governance is now sellable and shipping April 28 - this is the talk track to lead with**

**What this means for Sales**

What was a beta promise is now a GA reality starting April 28 (M10), and it gives your team a differentiated talk track: Blueprints does enforced governance - required sections, role-based approval, SSO (M2) - which is exactly the thing Confluence, Notion, and Coda do not (M3). For a regulated or documentation-heavy enterprise buyer, that is the wedge that turns "another collaboration tool" into "the one that enforces our process."

The ask is timing and pipeline, not narrative (that is PMM's): prioritize the governance-led talk track in open enterprise deals and prime accounts already in pipeline so the GA lands as a reason to advance, not just a feature note. The 30-day activation target (60% of accounts [fictional], M10) is the company's signal that the motion is working, so deals you can time to the launch window matter. Lead with governance, prime the pipeline (the primary ask), and route any "is it HIPAA-ready / can we put regulated data in it" questions to the right owner rather than promising on the call.

--- END ---

--- BEGIN: CS/Support ---

**Draws on:** M5, M6, M7, M8

**Primary ask:** Pre-stage support macros and the SSO admin guide for the two known issues, and watch the 10% tier closely for SSO tickets.

**Two known issues will drive launch-week tickets - here is what to pre-stage**

**What this means for CS/Support**

You can see the two most likely sources of launch-week volume in advance (M6), which means you can get ahead of them. First, SSO provisioning is manual and error-prone and is the top operational risk (M8): a misconfiguration can block an account's access entirely until it is fixed. Second, the approval-reject button is behind a secondary menu, so first-time approvers may not find "reject" and will open tickets asking how to send a Blueprint back. Both are documented, neither is a blocker, but both will generate contacts (M7).

The ask is to pre-stage rather than react: have a support macro ready for the "where is the reject button" question, keep the SSO admin provisioning guide one click away for the access-blocked cases, and watch the first 10% rollout tier closely (M6/M8) - because the progressive rollout means SSO problems will show up there first, and catching them at 10% keeps them from repeating across the remaining 90% of accounts.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M1, M3, M5, M8, M9

**Primary ask:** Confirm the GA go and the April 28 progressive-rollout start.

**Blueprints GA is ready; the rollout is designed to contain the one real launch risk**

**What this means for the Executive sponsor**

Blueprints v1 is ready to go GA to all 500 enterprise accounts [fictional] starting April 28 (M1), shipping the enterprise governance differentiator that sets Workbench apart from Confluence, Notion, and Coda (M3). The plan is built to de-risk itself: the rollout is progressive (10% to 100% over a week) precisely so the one real operational risk - manual SSO provisioning, which could block an account until corrected (M8) - surfaces at 10% and is fixed before it can hit the full base.

The decision needed from you is the GA go and the April 28 start date (M9). The team has the assets, the rollout plan, and the known-issue workarounds in place; what they need is the green light to start. Confirm the go so launch week runs on a decision, not an assumption.

--- END ---

---

## Translations applied (internal)

- "enforced governance, not just co-editing" kept as the differentiator for PMM and Sales; rendered for the Executive as "the differentiator that sets Workbench apart" (audience: Executive, outcome over mechanism).
- "manual SSO provisioning is error-prone" kept as an operational known-issue for CS/Support; rendered for the Executive as "the one real launch risk the rollout is designed to contain" to frame it as managed rather than alarming.
- "approval-reject button behind a secondary menu" kept concrete only for CS/Support (they field the tickets); omitted from PMM, Sales, and Executive blocks as below their decision altitude.
- PMM vs Sales split held: PMM owns shipping the narrative and assets (M4); Sales owns timing the talk track to pipeline (M10). Neither block carries the other's ask.

**Flagged but kept** (may need review):

- "route HIPAA / regulated-data questions to the right owner" - added to the Sales block as a guardrail; the launch plan does not name a HIPAA owner, so confirm Sales knows who that is (Legal) before GA, or this instruction has no destination.

## Sources and References

- Source artifact: blueprints-ga-launch-plan.md [fictional]
- **Generated:** 2026-06-20T16:10:00Z | **Skill version:** 1.0.0 | **Audiences:** PMM, Sales, CS/Support, Executive | **Input quality:** high (launch plan with rollout sequence, scoped assets, named known issues, success targets, and a named go-decision owner)
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M10; one Primary ask each; master reviewed as audience-neutral; PMM/Sales lead with distinct decisions.
```
