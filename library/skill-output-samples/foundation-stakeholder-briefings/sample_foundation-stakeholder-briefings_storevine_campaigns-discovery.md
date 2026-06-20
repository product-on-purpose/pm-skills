---
title: "Stakeholder Briefings: Storevine Campaigns Merchant Interview Synthesis"
description: "The 8-merchant Campaigns interview synthesis projected to four lenses (UX/Design, PMM, Executive, Engineering) from one traceable master."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - 8-merchant interview synthesis fanned out to four lenses, driving the template-first scope decision
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine's Growth PM ran eight merchant interviews to understand why so many merchants run email on Klaviyo or Mailchimp instead of in-platform, and synthesized the findings. The synthesis needs to reach the teams that act on it: UX owns the design direction it implies, PMM owns whether it sharpens the story, Exec owns whether it justifies the bet, and Engineering owns what it means for scope. The PM runs `foundation-stakeholder-briefings` against the synthesis and takes the discovery proposal (UX/Design, PMM, Executive, Engineering).

**Source Notes:**

- Storevine is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @campaigns-merchant-interviews.md

Source: 8-merchant interview synthesis on email tooling. Key findings:
~68% of merchants use an external email tool and resent juggling two systems
("tool-juggling tax"); the blank-canvas setup is where merchants stall on their
first send; merchants want "good enough fast," not maximum flexibility; the data
they want for targeting (orders, customers) already lives in Storevine; switching
cost off Klaviyo (lists, history) is the main thing holding adopters back.

Audiences: take the discovery proposal (UX/Design, PMM, Executive, Engineering).
```

## Output

```markdown
# Stakeholder briefings: Campaigns merchant interview synthesis

## Master document

**What and why**

- M1: Across 8 merchant interviews [fictional], the dominant pain is the tool-juggling tax: merchants run email on Klaviyo/Mailchimp while their store, orders, and customers live in Storevine, and resent maintaining two systems.
- M2: ~68% of interviewed merchants [fictional] use an external email tool today, consistent with the broader base, confirming the addressable segment.

**Decisions** (implied by the synthesis)

- M3: The synthesis points to template-first scope: merchants want "good enough fast," not maximum flexibility, which supports a template-only v1 over a drag-and-drop builder.

**Status**

- M4: This is a discovery synthesis; it informs scope and positioning but is not yet a committed plan.

**Risks and open questions**

- M5: The first-send moment is where merchants stall; blank-canvas setup is the named friction point.
- M6: Switching cost off Klaviyo (lists, send history) is the main thing holding would-be adopters back.
- M9: A migration-aware onboarding has to support list import and suppression-list carryover so adopters can move off their external tool without rebuilding it.

**Asks**

- M7: From the team, use the synthesis to lock template-first scope and a migration-aware onboarding before build.

**Timeline**

- M8: Findings feed the upcoming Campaigns build cycle; scope decisions are needed before design and engineering commit.

## Briefings

--- BEGIN: UX/Design ---

**Draws on:** M3, M5, M6

**Primary ask:** Design a template-first first-send flow that removes the blank-canvas stall and absorbs the switching cost.

**The blank canvas is the enemy; design for "good enough fast"**

**What this means for UX/Design**

The interviews are unambiguous about where the design has to win: merchants stall at the first send, and the named culprit is the blank canvas. They are not asking for maximum flexibility, they want "good enough fast." That reframes the design goal from "powerful editor" to "shortest credible path to a sent campaign," which is exactly what template-first scope enables.

Two things the synthesis hands you. First, the empty state is the highest-leverage screen, design it as a gallery of ready-to-send templates, not a builder waiting for input. Second, switching cost off Klaviyo (lists, history) is what holds adopters back (M6), so the onboarding has to make bringing a list over feel safe and quick. Design a template-first first-send flow that kills the blank-canvas stall and makes migration painless.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M2

**Primary ask:** Sharpen the positioning around the "tool-juggling tax" as the customer-validated wedge.

**The customers named our wedge: stop paying the tool-juggling tax**

**What this means for PMM**

The synthesis gives you customer language, not just a thesis. Merchants describe running two systems, store in Storevine, email in Klaviyo or Mailchimp, as a tax they resent paying. That phrase, the tool-juggling tax, is the wedge: it is the merchant's own framing of why native re-engagement is better, and it lands harder than any feature list.

Anchor the positioning on consolidation as relief from that tax, aimed at the ~68% of merchants [fictional] currently on an external tool. This is the evidence layer under the embedded-re-engagement story. Sharpen the positioning around the tool-juggling tax as the validated wedge.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M1, M2, M3, M7

**Primary ask:** Endorse template-first scope as the discovery-validated direction before build commits.

**Discovery confirms the bet and points to a leaner v1**

**What this means for the Executive sponsor**

The merchant interviews back the Campaigns thesis and, helpfully, point to a cheaper first version. Merchants resent juggling two systems (store here, email on Klaviyo/Mailchimp), and ~68% of those interviewed [fictional] use an external tool, which confirms the segment is real. The other finding is a scope gift: merchants want "good enough fast," not maximum flexibility, which supports a template-only v1 instead of a heavier drag-and-drop build. Decision for you: endorse template-first scope as the validated direction so design and engineering commit to the leaner v1.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M3, M5, M6, M9

**Primary ask:** Plan v1 around a template engine plus list/history import, not a general-purpose editor.

**Build a template engine and an importer, not a drag-and-drop builder**

**What this means for Engineering**

Discovery narrows the build in a useful way. Merchants want "good enough fast," and the first-send stall is the blank canvas, so the implication is a template engine with a small set of ready-to-send layouts, not a flexible drag-and-drop editor. That is a smaller, more bounded surface to build and QA across email clients, which is the harder part of an email feature.

The second build implication is migration: switching cost off Klaviyo (lists, send history) is what holds adopters back (M6), so list import (and suppression-list carryover) is a first-class requirement, not a follow-up. Plan v1 around a template engine plus a reliable importer, and treat a general-purpose editor as explicitly out of scope for this cut.

--- END ---

---

## Translations applied (internal)

- "tool-juggling tax" kept as the merchant's verbatim phrase for PMM (customer language is the asset) and Executive; for Engineering it is rendered as the build implication (template engine + importer) rather than the phrase.
- "merchants want 'good enough fast,' not maximum flexibility" kept as the design principle for UX; rendered as "supports a template-only v1 / a leaner v1" for Executive and "template engine, not drag-and-drop" for Engineering.
- "switching cost off Klaviyo (lists, history)" surfaced to UX (make migration painless), Engineering (first-class import requirement); not raised to Executive (operational, below the scope decision).
- "discovery synthesis, not a committed plan" (M4) noted in the master to keep the Executive ask honest (endorse direction, not approve a finished plan).

**Flagged but kept** (may need review):

- The Decisions section is labeled "implied by the synthesis" because a discovery doc does not itself decide scope; the template-first claim (M3) is an inference the team must ratify, not a finding. Confirm the Executive reads it as a recommendation to endorse, not a decision already made.

## Sources and References

- Source artifact: campaigns-merchant-interviews.md [fictional]
- **Generated:** 2026-06-20T17:05:00Z | **Skill version:** 1.0.0 | **Audiences:** UX/Design, PMM, Executive, Engineering | **Input quality:** medium (clear qualitative findings from 8 interviews; scope claims are inferences the team must ratify, flagged in Decisions)
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M9; one Primary ask each; master reviewed as audience-neutral; inferred-decision caveat recorded.
```
