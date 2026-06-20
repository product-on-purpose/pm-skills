---
title: "Stakeholder Briefings: Workbench Confluence-Fatigue Interview Synthesis"
description: "One Confluence-fatigue enterprise team-lead interview synthesis fanned out into three audience briefings (UX/Design, PMM, Executive) from a single traceable master document."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Confluence-fatigue enterprise team-lead interview synthesis projected to three lenses to align discovery on direction
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Tomás G. (Design Lead) and Rachel V. (PM) have synthesized six interviews with enterprise team leads about Confluence fatigue: the pattern is not that Confluence edits poorly, but that nothing stops teams from shipping incomplete, unapproved docs - "docs police" work falls on the team lead. The synthesis is the seed of the Blueprints thesis and has to align three audiences early - UX/Design (sets the design direction), PMM (will eventually shape positioning), and Sandra C. (Head of Product, decides whether this becomes a funded bet). Rachel runs `foundation-stakeholder-briefings` against the synthesis. The skill proposes UX/Design, PMM, Executive, and Engineering for a discovery source; Rachel drops Engineering (no feasibility decision yet at the discovery stage) and keeps UX/Design, PMM, and Executive.

**Source Notes:**

- Workbench is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @confluence-fatigue-synthesis.md

Source: synthesis of 6 enterprise team-lead interviews on Confluence fatigue
(discovery/research).

Top findings [fictional]:
- Pain is governance, not editing. 5 of 6 leads said Confluence edits fine; the
  problem is no enforcement - docs reach "done" with empty sections and no real
  approval.
- "Docs police" tax. 4 of 6 leads personally chase incomplete docs, ~3-4 hrs/wk,
  and described themselves as the human enforcement layer.
- Quantified gap: leads estimated ~60% of projects start without an approved
  kickoff doc; this causes rework and misalignment downstream.
- Approval is informal. Sign-off happens over Slack/email, leaving no record -
  a problem for the compliance-leaning teams (2 of 6 in regulated orgs).

This is discovery, not a spec - we want to align on direction, not build yet.
Audiences: drop Engineering (no feasibility decision at this stage), keep
UX/Design, PMM, Executive. Decision-maker on whether this becomes a funded bet:
Sandra C. (Head of Product). Design lead: Tomás G.
```

## Output

```markdown
# Stakeholder briefings: Confluence-fatigue interview synthesis

## Master document

**What and why**

- M1: Six enterprise team leads were interviewed about Confluence fatigue; the dominant finding is that the pain is governance, not editing - 5 of 6 said Confluence edits fine, but nothing stops docs reaching "done" with empty sections and no real approval [fictional].
- M2: The cost shows up as a "docs police" tax: 4 of 6 leads personally chase incomplete docs about 3-4 hours a week [fictional] and described themselves as the human enforcement layer.

**Decisions**

- M3: The synthesis points to a clear direction: the opportunity is enforced documentation governance (required completeness + real approval), not better editing - this is discovery framing for a direction decision, not a committed solution.

**Status**

- M4: This is discovery, not a spec; the goal is to align on direction before any build, and the thesis has interview signal but no validated solution yet.

**Risks and open questions**

- M5: Two of six leads are in regulated organizations and flagged that approval happens informally over Slack and email with no record [fictional], which is a compliance problem, not just an inconvenience - a signal the governance need may be sharper for regulated buyers.

**Asks**

- M6: Decision on whether enforced documentation governance becomes a funded bet, owned by Sandra C. (Head of Product).

**Timeline**

- M7: Synthesis is complete now; the direction decision precedes any solution scoping or design work.

## Briefings

--- BEGIN: UX/Design ---

**Draws on:** M1, M2, M3

**Primary ask:** Frame the design exploration around enforced completeness and real approval, not a better editor.

**The research says design for governance, not for editing - that reframes what we explore**

**What this means for UX/Design**

The clearest signal in the interviews is also the most counterintuitive for a design team: the problem is not the editor. Five of six leads said Confluence edits fine (M1). What is broken is that there is no enforcement - documents reach "done" while still incomplete and unapproved - and the team lead becomes the human enforcement layer, spending 3-4 hours a week as "docs police" (M2). That tells us where the design energy should go.

So the design exploration should be framed around enforced completeness and real approval (M3), not a nicer writing surface. The interesting design problems are: how do you make a completeness gate feel like help rather than a wall, and how do you make approval a first-class, low-friction step instead of an informal Slack ping. The primary ask is to take that framing into early exploration - design for governance, not for editing - so we do not pour effort into the surface the research says is already fine.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M3, M5

**Primary ask:** Start shaping a governance-vs-co-editing positioning hypothesis from this research, to test as the direction firms up.

**Early positioning signal: the opening is governance, the thing the incumbents do not enforce**

**What this means for PMM**

It is early - this is discovery, not a launch - but the research already hints at a positioning opening worth shaping now. The leads are not asking for a better Confluence; they are saying the whole category edits fine but no one enforces governance (M1), which points to a differentiation story built on enforced completeness and real approval rather than collaboration features (M3). That is the kind of frame that, if it holds, gives a future launch a category to own instead of a feature war to lose.

One detail sharpens it: 2 of 6 leads are in regulated orgs where informal Slack/email sign-off leaves no record, which is a compliance exposure, not just friction (M5). That suggests the message may land hardest with regulated, documentation-heavy buyers. The ask is not to write copy yet; it is to start shaping a governance-vs-co-editing positioning hypothesis from this research (the primary ask) so that when the direction firms up, PMM has a thesis to test rather than a blank page.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M2, M3, M5, M6

**Primary ask:** Decide whether enforced documentation governance becomes a funded bet worth scoping a solution against.

**Research found a real, quantified pain with a defensible opening - worth funding to explore?**

**What this means for the Executive sponsor**

Six enterprise team-lead interviews surfaced a real and repeated pain: leads are personally acting as the enforcement layer, losing 3-4 hours a week each to chasing incomplete documents (M2), because nothing in the category enforces completeness or approval. The synthesis points to a clear direction - enforced documentation governance as the opportunity (M3) - and there is a sharper edge for regulated buyers, where informal sign-off with no record is a compliance exposure (M5), which hints at a willingness to pay.

This is a direction decision, not a build commitment (it is discovery). The ask is whether enforced documentation governance becomes a funded bet worth scoping a solution against (M6). A "yes" puts a small team on solution exploration and validation; a "no" or "not yet" parks the thesis with the evidence intact. The decision is yours - the research has done its job of finding a credible opportunity; what it cannot do is decide whether it is the one worth funding now.

--- END ---

---

## Translations applied (internal)

- "no enforcement / docs reach done incomplete and unapproved" kept as the research finding for all three; rendered for UX as a design-framing instruction ("design for governance, not editing"), for PMM as a positioning opening, and for the Executive as "a real, quantified pain."
- "docs police tax, 3-4 hrs/wk" kept as the lived-experience finding for UX and Executive; omitted from the PMM block, whose decision turns on the positioning opening, not the time cost.
- "informal Slack/email sign-off, no record, 2 of 6 regulated" kept precise; surfaced to PMM as "lands hardest with regulated buyers" (a segment signal) and to the Executive as "a willingness to pay" (a funding signal).
- "discovery, not a spec" kept across all three to prevent any block from reading as a commitment to build.

**Flagged but kept** (may need review):

- "hints at a willingness to pay" - this is an inference from the regulated-org compliance signal (M5), not a stated interview finding. Kept in the Executive block because it is decision-relevant, but flagged: the interviews showed compliance pain, not pricing intent, so do not let it harden into a revenue claim without validation.

## Sources and References

- Source artifact: confluence-fatigue-synthesis.md [fictional]
- **Generated:** 2026-06-20T16:25:00Z | **Skill version:** 1.0.0 | **Audiences:** UX/Design, PMM, Executive | **Input quality:** high (synthesis of 6 interviews with quantified findings, a clear dominant pattern, a segment signal, and a named decision-maker)
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M7; one Primary ask each; master reviewed as audience-neutral.
```
