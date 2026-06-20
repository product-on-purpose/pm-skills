---
slug: releases/Release_v2.28.0
title: Release v2.28.0
description: A new foundation skill, stakeholder-briefings, that fans any source artifact into one canonical master document plus a set of audience-tailored briefings, one per stakeholder lens, each a traceable projection of the master so the versions never disagree.
---

**Released 2026-06-20.** Additive MINOR. One new foundation skill; catalog grows 66 to 67 (foundation 9 to 10). 5 sub-agents, 11 commands, 12 workflows unchanged.

## The short version

PMs routinely take one piece of work - a spec, a research synthesis, a launch plan, an experiment result - and rewrite it three to five times, once per audience, because engineering, the exec sponsor, sales, and legal each need a different framing. `foundation-stakeholder-briefings` does that fan-out in one pass, and it does it without the versions drifting apart.

The skill is built around one idea: **master-first, then project.** It writes a single canonical, audience-neutral master document, numbers each claim, and then renders one briefing per audience as a projection of that master. A briefing may omit, reorder, and translate, but it may not assert anything the master does not. That invariant is what stops the exec version and the engineering version from quietly contradicting each other.

## What changed

**New skill: `foundation-stakeholder-briefings`.** Input is any source artifact (spec/PRD, discovery or research, GTM/launch, strategy, experiment/metrics, incident/retro, compliance, or raw notes). Output is one saveable file: a master document plus a set of send-ready, audience-tailored briefing blocks.

**Nine first-class audience lenses, plus Custom.** Executive/Leadership, Board/Investors, Engineering, UX/Design, PMM, Sales, CS/Support, Legal/Compliance/Privacy, and Data/Analytics/BI, each defined by the decision it owns, with "not this lens when" boundaries and an overlap matrix (Exec vs Board, PMM vs Sales, Engineering vs Data, Legal vs Exec). A Custom slot infers a lens for any other audience and shows it for confirmation.

**Source-aware proposal.** The skill detects the source type and proposes the audiences that artifact usually needs (a spec proposes Engineering, UX, Data, Exec; a GTM plan proposes PMM, Sales, CS, Exec). You accept, edit, or take all nine. N=1 is supported - the fan-out is the signature use, not a floor.

**A mechanized invariant.** Each briefing block carries a `Draws on:` line (the master claim IDs it projects) and exactly one `Primary ask:`. The advisory `scripts/check-briefings-trace.mjs` verifies every `Draws on:` ID resolves to a real master claim and that each block has exactly one ask - so the master-projection contract is checkable, not aspirational.

**18 library samples.** Six per Storevine / Brainshelf / Workbench thread, covering all eight source types plus a Custom lens, a raw/ambiguous source, and a standalone compliance review.

## When to use it (and when not)

Use it when one piece of work must reach several audiences who each need a different framing. For one async update of **meeting** outcomes, use `foundation-stakeholder-update` (it is meeting-bound). To **map** stakeholders rather than communicate to them, use `discover-stakeholder-summary`. For a **persona** to design or market against, use `foundation-persona`.

## Install or upgrade

```bash
# Claude Code (marketplace)
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose

# any agent, via the open skills CLI
npx skills add product-on-purpose/pm-skills
```

Existing installs update in place; nothing else changed.
