---
title: "Stakeholder Briefings: Workbench Enterprise-Expansion Opportunity Tree"
description: "One enterprise-expansion opportunity tree fanned out into four audience briefings (Executive, Board/Investors, Sales, PMM) from a single traceable master document."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - enterprise-expansion opportunity tree projected to four strategy-facing lenses, with Exec-vs-Board and PMM-vs-Sales kept distinct
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Sandra C. (Head of Product) has an enterprise-expansion opportunity solution tree: the desired outcome is growing from 500 to 650 enterprise accounts in 12 months [fictional], with documentation governance identified as the priority opportunity and Blueprints as the lead bet. She needs the strategy to land with four audiences who each control a different lever: the executive team (fund and reprioritize), the board (back the thesis at the next raise), the enterprise sales team led by Mei-Lin T. (sell it now), and PMM (own the positioning). Sandra runs `foundation-stakeholder-briefings` against the tree. The skill proposes Executive, Board, PMM, and Sales for a strategy source; Sandra takes the proposal as-is.

**Source Notes:**

- Workbench is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @enterprise-expansion-tree.md --go

Source: enterprise-expansion opportunity solution tree (strategy).

Desired outcome [fictional]: grow from 500 to 650 enterprise accounts in 12
months; net revenue retention from 108% to 120%. Priority opportunity:
documentation governance (the "approved kickoff doc" gap - 60% of enterprise
projects lack one at handoff [fictional]). Lead solution bet: Blueprints
(required sections + approval gates + SSO). Secondary opportunity held back:
Confluence migration tooling. Competitive frame: Confluence/Notion/Coda do
co-editing well but governance poorly.

Audiences: take the strategy proposal (Executive, Board, PMM, Sales). Keep the
Executive and Board briefings clearly different, and keep PMM and Sales clearly
different - they are not the same memo twice. Decision-makers: Sandra C. (Head
of Product), James W. (VP Engineering), Mei-Lin T. (Enterprise Sales Lead).
```

## Output

```markdown
# Stakeholder briefings: enterprise-expansion opportunity tree

## Master document

**What and why**

- M1: The desired outcome is enterprise expansion: 500 to 650 enterprise accounts in 12 months [fictional], with net revenue retention rising from 108% to 120% [fictional].
- M2: The priority opportunity on the tree is documentation governance - the "approved kickoff doc" gap, where 60% of enterprise projects ship to execution without an approved kickoff doc [fictional].
- M3: The competitive wedge is governance, not co-editing: Confluence, Notion, and Coda all do collaborative editing well, but none enforce required sections and role-based approval, so governance is where Workbench can differentiate rather than compete head-on.

**Decisions**

- M4: Blueprints (required sections + approval gates + SSO) is the lead solution bet against the governance opportunity; it is funded and in build.
- M5: Confluence migration tooling is the secondary opportunity, deliberately held back behind Blueprints GA so the team does not split focus before the wedge is proven.

**Status**

- M6: Blueprints is in closed beta on 80 accounts [fictional] with an April GA target; the governance thesis has early signal but is not yet validated at scale.

**Risks and open questions**

- M7: The expansion outcome depends on Blueprints converting governance interest into closed enterprise deals; if governance does not differentiate in the sales motion, the 650-account target is at risk.
- M8: Holding back migration tooling (M5) is a bet that the wedge lands first; if competitors close the governance gap before GA, the sequencing advantage shrinks.

**Asks**

- M9: Confirm the documentation-governance opportunity stays the funded priority over the next two quarters (executive reprioritization decision).
- M10: Endorse the governance-wedge thesis as the enterprise growth story for the next funding conversation (board-level backing).

**Timeline**

- M11: Blueprints GA in April 2026; migration tooling scoped for the following quarter, gated on GA; the 650-account outcome measured over the trailing 12 months.

## Briefings

--- BEGIN: Executive ---

**Draws on:** M2, M4, M5, M6, M9

**Primary ask:** Confirm documentation governance stays the funded priority for the next two quarters, and approve holding migration tooling behind GA.

**Governance is the funded bet; the one tradeoff is sequencing migration behind it**

**What this means for the Executive team**

The priority opportunity is documentation governance - the approved-kickoff-doc gap that hits 60% of enterprise projects at handoff [fictional] (M2) - and Blueprints is the funded solution bet against it (M4), now in closed beta on 80 accounts [fictional] with an April GA (M6). The strategy is working as designed so far.

The decision in front of you is one of focus, not direction. The secondary opportunity, Confluence migration tooling, is deliberately held behind Blueprints GA (M5) so we prove the governance wedge before splitting the team. That is a reprioritization call: it keeps a tempting second bet on the bench. Confirm that documentation governance remains the funded priority for the next two quarters (M9) and that holding migration tooling behind GA is the right sequencing, so the team can commit without hedging.

--- END ---

--- BEGIN: Board/Investors ---

**Draws on:** M1, M2, M3, M10

**Primary ask:** Endorse the governance-wedge thesis as the enterprise growth story for the next funding conversation.

**Workbench's enterprise growth thesis: win on governance, the gap the incumbents left open**

**What this means for the Board**

The enterprise growth story has a single, defensible shape. The market is full of collaborative-editing tools - Confluence, Notion, Coda - and they are good at co-editing. None of them enforce documentation governance: required sections, role-based approval, the discipline enterprises actually need at handoff (M3). That is the wedge. We are not trying to out-edit the incumbents; we are entering through the gap they left open.

The thesis maps to the numbers that matter for the next raise: a path from 500 to 650 enterprise accounts and from 108% to 120% net revenue retention over 12 months [fictional] (M1), anchored to a quantified, recurring enterprise pain - 60% of enterprise projects ship without an approved kickoff doc [fictional] (M2). What we are asking the board for is endorsement of this governance-wedge framing as the enterprise growth narrative for the next funding conversation (M10), so the company tells one coherent story to investors.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M2, M3, M4

**Primary ask:** Own and lock the governance-vs-co-editing positioning narrative before GA messaging goes out.

**Position Blueprints on governance, the category the incumbents cannot claim**

**What this means for PMM**

The positioning is the strategy made legible to the market, and the frame is sharp: Blueprints wins on governance, not co-editing (M3). Confluence, Notion, and Coda already own "collaborative docs" in buyers' minds, so a message that competes on editing loses. The message that wins names a pain the incumbents do not solve - documents reaching handoff incomplete and unapproved, the gap that hits 60% of enterprise projects [fictional] (M2) - and frames Blueprints (required sections + approval gates) as the answer (M4).

This is a narrative job, not a deal job: define the category language, the differentiation against each incumbent, and the launch story before GA. Own and lock the governance-vs-co-editing positioning (the primary ask) so that everything downstream - sales talk tracks, the launch blog, the website - inherits one consistent frame rather than each team inventing its own.

--- END ---

--- BEGIN: Sales ---

**Draws on:** M2, M4, M7

**Primary ask:** Validate that the governance talk track converts in live enterprise deals, and report which objections recur, before GA.

**Governance is the wedge - we need to know it actually closes deals**

**What this means for Sales**

The strategy bets that governance is what differentiates Workbench in the enterprise motion: Blueprints (required sections + approval gates) against the approved-kickoff-doc gap that 60% of enterprise projects hit [fictional] (M2, M4). For your team that is a talk track, and the open question is whether it converts. The plan explicitly flags the risk: if governance does not differentiate in front of real buyers, the 650-account target is exposed (M7).

So the ask is concrete and now, not at GA. Run the governance talk track in live enterprise deals during beta and tell us what happens: which prospects lean in on required-sections-and-approval, which ask "doesn't Confluence already do this," and which objections recur often enough to need a coded response before GA. You are the validation loop on the wedge - report which objections recur (the primary ask) so PMM can sharpen the message and product can close the gaps before we commit the full motion to it.

--- END ---

---

## Translations applied (internal)

- "documentation governance opportunity" kept as the strategic term for Executive and Board; rendered as "governance, the category the incumbents cannot claim" for PMM (positioning language) and "the governance talk track" for Sales (deal language).
- "competitive wedge is governance, not co-editing" kept high-altitude for the Board (thesis framing); rendered as "governance-vs-co-editing positioning" for PMM (a concrete deliverable to own).
- "net revenue retention 108% -> 120%" surfaced only in the Board block as a thesis metric; intentionally omitted from Sales and PMM, whose decisions do not turn on NRR.
- Exec vs Board split held: the Executive block asks for an internal reprioritization/sequencing decision (M9, hold migration behind GA); the Board block asks for thesis endorsement for the raise (M10). Neither block carries the other's ask.

**Flagged but kept** (may need review):

- "the 650-account target is at risk" - kept explicit in the Sales block (M7) to make the validation ask feel weighty; for a sales audience this could read as pressure rather than partnership, so it is framed as "you are the validation loop," not "you are accountable for the number." Confirm tone lands with Mei-Lin T.

## Sources and References

- Source artifact: enterprise-expansion-tree.md [fictional]
- **Generated:** 2026-06-20T15:25:00Z | **Skill version:** 1.0.0 | **Audiences:** Executive, Board/Investors, PMM, Sales | **Input quality:** high (opportunity tree with a quantified outcome, a named priority opportunity, a funded lead bet, and a held-back secondary)
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M11; one Primary ask each; master reviewed as audience-neutral; Exec/Board and PMM/Sales each lead with distinct decisions.
```
