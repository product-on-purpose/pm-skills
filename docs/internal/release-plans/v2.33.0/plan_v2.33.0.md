# v2.33.0 Release Plan: SHIPPED 2026-09-01 (tag `v2.33.0` at `7a42570e`)

**Status:** **SHIPPED 2026-09-01.** Tag `v2.33.0` pushed 2026-09-01, annotated, pointing at `7a42570e`. Both tag-triggered workflows green (Release, Validate Plugin Packaging) and the GitHub Release published with its three assets. **G0 through G3 CLOSED. G4 is IN PROGRESS, not closed:** its P0 install smoke test has not run, and three section C rows are open (the `agent-plugins` re-pin, the `pm-skills-mcp` narrative ruling, and the skills.sh listing). **This distinction is deliberate.** An earlier draft of this block read "G3 and G4 closed" while the section C table in the same commit marked three rows open, which is the pre-satisfied-control defect R11-F3 and R12-F3 both caught in this cycle. Corrected on the same day it was introduced. The cut was paused at READY TO TAG from 2026-08-29 to 2026-09-01 by maintainer choice.

**G2.5 captured SHA, which is the only SHA G3 may tag:** `7a42570e6601b22e8492fb0f4c8d112eb2883d40` (`7a42570e`, `chore(v2.33.0): release-prep edits for v2.33.0`). **All five CI workflows green on it:** Validation, Validate Plugin Packaging, CodeQL, Deploy to GitHub Pages, release-please. Local verification on the same tree: pre-tag bundle exit 0 with 19 of 19 enforcing validators PASS, site build exit 0 at 421 pages, route-parity, rendered-links and root-doc-links all PASS, sample counts 213/63, fabricated-metrics advisory unchanged at its 338 baseline. **G3 tags this SHA and no other**, per the runbook invariant added after v2.13.1 shipped a tag pointing at a pre-edit HEAD.

**Gate G3 CLOSED 2026-09-01; gate G4 IN PROGRESS.** G3 tagged the G2.5-captured SHA and no other, per the invariant. **The tag-target question was ruled at G3 against the wrap log's recommendation:** the log proposed HEAD (`605edcaa`), and the evidence went the other way. Both the runbook and this plan name `7a42570e` as the only legal target; all five workflows ran green directly on `7a42570e` while `Validate Plugin Packaging` never ran on `605edcaa` (skipped by the push `paths:` filter, since that commit touches only this doc); and tagging `605edcaa` would have embedded, inside the tagged tree, a plan doc naming a different SHA as the only legal target. G4 then closed both halves of the release-plans index row, re-authored the three manifest description tails (a G2 miss: G2 moved the marketplace release pin but not the authored pitch beside it), and replaced the auto-published Release body. **What G4 has NOT done:** the P0 plugin-install smoke test against the published artifact, the `agent-plugins` re-pin, the `pm-skills-mcp` narrative ruling, and the skills.sh listing. The runbook refuses "Release complete" until the P0 either passes or is logged by the maintainer as an accepted known risk.

**Status detail:** G1 closed on maintainer attestation after twelve adversarial rounds; every GATE row due at or before G0 is checked, and the rows due at G2 and G4 are named with their stages. **The SHIPPED stamp was withheld until a tag existed**, because writing it earlier would have been the same pre-satisfied-control defect R11-F3 and R12-F3 both caught in this cycle's own checklist. It was applied 2026-09-01, after the tag. Previously **SCOPE COMMITTED 2026-08-16.** D1 through D5 all RULED (see the decisions table). Execution workstreams WS-1 through WS-9 below; build starting. History: STUB seeded 2026-08-13 during the v2.32.0 WS-8 prep; candidates accumulated through the v2.32.0 cut and its post-release audits; researched into a decision stage 2026-08-15; ruled 2026-08-16 with **D3 changed from its drafted recommendation by evidence** (see below).
**Owner:** Maintainers.
**Type:** Expected MINOR. Every candidate in the recommended scope is additive or corrective; none changes the catalog count.
**Proposed theme:** **The release users notice.** v2.32.0 was an infrastructure cycle that shipped one opt-in feature the front door never mentions, while three user-filed defects sat untracked for two weeks. This cycle proposes correcting that balance.
**Previous:** v2.32.0 SHIPPED 2026-08-14 (tag `v2.32.0` at `e8a641c3`; plan at [`../v2.32.0/plan_v2.32.0.md`](../v2.32.0/plan_v2.32.0.md)).
**Target:** PROPOSED 2026-09-05, about three weeks. v2.32.0 ran roughly two weeks from scope ruling to tag and consumed three adversarial review rounds at the gate. The target exists so the trip-wires have something to fire against, not as a commitment.

---

## Where we are

v2.32.0 shipped project memory, closed trigger-eval coverage as an accounting, and hardened the release automation. It also generated most of this candidate list: the G1 adversarial rounds produced three issues, and the post-release site hygiene pass produced two more.

That is the pattern worth naming before ruling scope. **Ten of the fourteen candidates below came from the repo inspecting itself** (audits, adversarial reviews, generators, validators). **One came from users.** That ratio is what a well-instrumented repo produces naturally, because self-inspection scales and user reports do not. It is not a defect, but it means user-reported work loses on equal footing every time, since a finding with a validator behind it always looks more actionable than a report with a person behind it.

## Candidates

Agent labels follow the assignment framework (claude / codex / human).

| # | Candidate | Tracking | Research disposition | Effort | Agent |
|---|---|---|---|---|---|
| C-14 | **Field-reported skill defects** (3) | [#251](https://github.com/product-on-purpose/pm-skills/issues/251), [#252](https://github.com/product-on-purpose/pm-skills/issues/252), [#253](https://github.com/product-on-purpose/pm-skills/issues/253) | All three verified against the tree; two need a shape ruling (D2, D3) | S / S-M / S-to-L depending on D3 | claude, shapes human |
| C-4 | Front door + a worked memory example | Raised in three session wraps, never ruled | Baseline re-measured: four surfaces, not two | S-M | claude |
| C-1 | AI-product family Track 1: four increments | [v2.32.0 C-3 spec](../v2.32.0/spec_c3-ai-product-family.md) section 9 | Ready; no new skills, no count change | S-M | claude |
| C-2 | Structure-over-prose weak-model re-test | v2.32.0 WS-1 ratification | Falls due the moment C-1 starts | S | claude |
| C-11 | Runbook reconciliation + standing hygiene checklist | [#269](https://github.com/product-on-purpose/pm-skills/issues/269) | Splits cleanly into a process half and a cleanup half (D4) | S-M (checklist) / M (full) | claude |
| C-3 | Decision D8: PR-title lint promotion | [cut pack](../v2.32.0/prep_cut-pack.md) section 6 | Evidence collected during the v2.32.0 cycle; ready to rule | Decision only | human |
| C-8 | Memory artifact ledger disposition | [#223](https://github.com/product-on-purpose/pm-skills/issues/223) | **RULED A 2026-08-17 and executed** (D10): #223 closed as shipped, [#268](https://github.com/product-on-purpose/pm-skills/issues/268) carries the residual | Decision only | human |
| C-12 | Doc-stack migration leftovers | [#269](https://github.com/product-on-purpose/pm-skills/issues/269), and a 2026-06-06 audit never closed | Same root as C-11; mechanical once C-11 lands | S-M | claude |
| C-13 | `contributing/ci-overview.md` is stale | 2026-08-14 site hygiene pass | Mechanical | S | claude |
| C-9 | Promote output-eval asset presence to enforcing | `reference/evals.md` states the condition | **Blocked on design:** would fail CI for 56 skills as written | S-M after design | claude |
| C-10 | Router-eval baseline refresh to the full roster | v2.32.0 G1 adversarial review | Pairs with C-9; real API cost | M | claude |
| C-6 | S2 authoritative cutover ratification | [#136](https://github.com/product-on-purpose/pm-skills/issues/136) item 7 | **Blocked** by [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | Decision + config | human only |
| C-5 | Aggregated-roadmap decisions D-A, D-B, D-D, D-E, D-F | `_LOCAL/audit/2026-08-05_ai-skills_roadmap-aggregated.md` section 6 | Recommendations already written | Decisions only | human |
| C-7 | Dual-shell validator ports | v2.30.0 audit standing cadence | 23 pairs remain; 1-2 per release | S per port | claude |

### C-14 research: the three field reports

Filed 2026-08-01 from an end-to-end run on a real product. All three arrive with reproduction steps and a suggested fix, which is unusually good evidence.

**[#251](https://github.com/product-on-purpose/pm-skills/issues/251), `foundation-persona` example contradicts its own template. VERIFIED.** `TEMPLATE.md` mandates a `Persona Card` plus numbered sections 1 through 11; `EXAMPLE.md` ships a "Layer 1: Narrative Persona Dossier / Layer 2: Operational Appendix" with sections (`Opening scene`, `What they say vs what they mean`) that appear nowhere in the template. An agent loading both references gets two canonical formats and no signal which wins. The reporter's own run resolved it correctly by following SKILL.md's pointer, and they name the real risk plainly: a weaker model could ship the Layer 1/Layer 2 format and silently violate the contract downstream skills consume. Shape ruling is **D2**.

**[#252](https://github.com/product-on-purpose/pm-skills/issues/252), `define-prioritization-framework` field friction.** Three concrete points from a real 8-item backlog in a solo context: a top-5/bottom-5 rule that degenerates below 10 items, a RICE effort unit that assumes a team, and an ambiguous Kano gate. The report is positive about the skill overall and singles out the convergence/divergence analysis as its most valuable output, which makes this calibration evidence rather than a complaint. No shape ruling needed; it is a content edit plus a version bump.

**[#253](https://github.com/product-on-purpose/pm-skills/issues/253), partial-install dead pointers. VERIFIED, and the surface is larger than the issue states.** Measured across the catalog:

| Measure | Count |
|---|---|
| Skills naming at least one sibling skill | 66 of 68 |
| Total sibling-reference edges | 291 |
| Skills whose references are **boundary pointers only** (inside `When NOT to Use`) | 31 |
| **Skills naming a sibling OUTSIDE the boundary section** | **35** |

The 31 boundary-only skills are harmless under partial install: "use X instead" degrades to the user simply not using X. The **35** are the real surface, because their references sit in output guidance and next-step routing, so the artifact ships with instructions the user cannot execute. No skill handles the missing-sibling case today; `README.md` does not mention partial install at all.

**Second measurement, taken because it decides the cost of D3.** Of those 35, only some issue an *imperative* near the sibling name (run, route, hand off, invoke, feed, next step); the rest merely mention one.

| Sub-surface | Count |
|---|---|
| **Mandates a handoff** (imperative adjacent to a sibling name) | **14** |
| Mentions a sibling with no imperative | 21 |

A mention is not an instruction the user cannot execute, so the 21 do not ship a broken artifact. The 14 do. That is what turns the per-skill option from L into M. The 14: `define-prioritization-framework`, `discover-market-sizing`, `foundation-build-risk-review`, `foundation-meeting-agenda`, `foundation-prioritized-action-plan`, `measure-okr-grader`, six `tool-*` sprint steps, `utility-pm-skill-iterate`, and `utility-pm-workflow-orchestrator` (which already handles a missing skill and is the prior art to copy).

**Decisive finding, which overturned this decision's drafted recommendation.** `docs/internal/distribution/skills-sh.md` records what the install CLI actually does: it "clones the repo fresh, scans for SKILL.md files" and "copies or symlinks (per flag) valid skills into the user's agent skills directory." **Only `skills/<name>/` ships.** No `README.md`, no `AGENTS.md`, no `CONTRIBUTING.md`, nothing at the repo root ever reaches an installed agent. So option C, documenting the convention once somewhere agents read, has no such place to live, and option A reaches only people browsing the repo, never the agent holding the broken artifact. `SKILL.md` is the sole carrier.

### C-4 research: the front door, re-measured

Measured 2026-08-14 after the release, correcting an earlier claim drawn from a truncated grep:

| Surface | Project-memory coverage |
|---|---|
| `QUICKSTART.md` | **Zero mentions** |
| `site/src/content/docs/getting-started/quickstart.md` | **Zero mentions** |
| `README.md` | Incidental only: a repo-tree comment, a parenthetical in a link description, and one generated release-history row that exists solely because the v2.32.0 CHANGELOG entry mirrors into it |
| `site/src/content/docs/index.mdx` | Incidental only: a v2.25.0 release-history row |

Four surfaces, and the release that shipped memory as its headline is invisible on all four. Folded in from the same audit: **no worked example of the memory loop exists** in `library/` or `docs/templates/`, so the central claim, that the PRD skill already knows your personas, has no artifact demonstrating it. That is why the example and the front-door text are one candidate: a sample built on one of the three canonical threads is the strongest version of what the front door is missing.

### C-11 research: the split

[#269](https://github.com/product-on-purpose/pm-skills/issues/269) contains two different kinds of work.

**The cleanup half:** two runbooks disagree about which is authoritative, the internal one is pinned at a v2.5.0 baseline and carries a parallel `pm-skills-mcp` release track that has contradicted maintenance mode since 2026-05-04, and it references a retired `docs/index.mdx`. Real, mechanical, and not urgent.

**The process half:** no release plan has ever carried a doc-update-and-hygiene checklist. Each cycle rebuilds one from the runbook and inherits whatever rot the runbook accumulated. That is precisely how a dead MCP publish track reached the maintainer as an open decision during the v2.32.0 cut. This half has compounding return: land it and C-12 and C-13 become mechanical next cycle instead of being rediscovered a fourth time. Ruling is **D4**.

### Blocked or design-gated, recorded so they are not mistaken for ready

- **C-6** cannot be ratified until [#267](https://github.com/product-on-purpose/pm-skills/issues/267) is fixed. The About-sync step would 403 *after* the tag and Release exist, leaving a partial release. Ratifying a cutover whose post-release step is known broken is not defensible.
- **C-9** as written would fail CI for 56 skills: only 12 of 68 carry output-scenario assets. It needs the gate scoped to rostered-and-scenario-bearing skills before it can be promoted.
- **C-10** is M-sized with real API cost and pairs naturally with C-9, since both concern how much of the roster is genuinely measured.

## Scope decisions (all OPEN)

Option letters are per-decision labels, not rankings. Each recommendation states the strongest argument against itself.

| # | Decision | Options | Recommendation | Status |
|---|---|---|---|---|
| D1 | v2.33.0 composite scope | **A) User-facing cut:** C-14 + C-4 + C-1/C-2 + C-11's process half, plus a decisions block (C-3, C-8). **B) Debt-payoff cut:** C-11 whole + C-12 + C-13 + C-9/C-10, with C-14 only. **C) Full slate:** everything except C-6, mirroring the v2.32.0 D1-C ruling. | A | **RULED A 2026-08-16** |
| D2 | [#251](https://github.com/product-on-purpose/pm-skills/issues/251) persona example shape | **A) Regenerate `EXAMPLE.md`** as a filled-in instance of the current TEMPLATE, matching how every other skill's example works. **B) Keep it and mark it** an explicitly non-normative narrative rendering that does not supersede the contract. | A | **RULED A 2026-08-16** |
| D3 | [#253](https://github.com/product-on-purpose/pm-skills/issues/253) partial-install shape | **A) Front-door note only.** **B) Convention in the affected skills.** **C) Document the convention once** where agents already read it, with no per-skill edits. | ~~C~~ **B-scoped + A** | **RULED B-SCOPED + A 2026-08-16, against the drafted recommendation.** C was ruled OUT by evidence, not preference: the install CLI copies only `skills/<name>/`, so no repo-root file ever reaches an installed agent and C has nowhere to live. A alone reaches only repo browsers, never the agent holding the broken artifact. Scoped to the **14 skills that mandate a handoff**, not all 35, since a mention is not an unexecutable instruction. A's front-door note ships alongside for repo readers. Size M, not L |
| D4 | C-11 scope | **A) Process half only:** add a doc-update-and-hygiene checklist to the release-plan template and leave the runbook reconciliation to v2.34.0. **B) Whole thing** this cycle. | A | **RULED A 2026-08-16** |
| D5 | Does the decisions block ride this cycle? | **A) Yes:** rule C-3 (D8 PR-title lint) and C-8 ([#223](https://github.com/product-on-purpose/pm-skills/issues/223) ledger disposition) inside this cycle; they cost a session, not a workstream. **B) No:** hold both for v2.34.0. | A | **RULED A 2026-08-16** |

### Build-shape decisions, ruled 2026-08-16 after a research and adversarial-verification pass

A three-agent research pass with per-spec opus challengers ran over WS-5, WS-6 and WS-7 before any build. It produced 23 corrections that override the specs. **Its single most valuable output was catching its own fabrication:** the WS-5 research agent invented a quote from the Storevine PRD sample ("per-message costs that need a different pricing model than email") inside a prompt that explicitly forbade unverified claims, and built a proposed persona and prompt constraint on top of it. The real text is "requires carrier compliance, opt-in flows, and separate sending infrastructure . deferred to isolate launch risk", verified first-hand. Instructions constrained intent and did not constrain output; a second agent opening the cited file did.

| # | Decision | Ruling |
|---|---|---|
| D6 | [#269](https://github.com/product-on-purpose/pm-skills/issues/269) placement conflict: the checklist must live in the plan "not the runbook" yet WS-6's exit criteria says it "gates the tag" | **NOT A DECISION, resolved by fact.** The canonical runbook's G0 sub-check 6 already requires the plan to be "marked READY TO TAG (or equivalent status)", and "any sub-check failure pauses G0". A checklist inside the release plan therefore gates the tag through existing plan-status semantics, with zero canonical-runbook edits. Both constraints hold simultaneously |
| D7 | WS-5 shape: written corpus artifact or live executed run | **RULED A:** a written sample pair plus a walkthrough, matching the other 210 samples. Stated limit, recorded rather than implied: this demonstrates the loop as designed, not as executed, and does not prove the propose-then-confirm mechanic fires at runtime |
| D8-a | How the memory state is carried, given `parseSampleSections()` in `gen-site.mjs` returns only `{context, thread, scenario, prompt, output}` so a fourth H2 is silently dropped from both the per-skill pages and the showcase | **RULED A: fold it into `## Scenario`.** Not a compromise: a Scenario section exists to describe the situation a skill is invoked in, and "the memory file already carries these personas from the prior run" is that situation. Renders natively everywhere, needs no generator change on the two most-viewed surfaces, and needs no documented exception in `SAMPLE_CREATION.md` |
| D8-b | Storevine merchant count: the samples say `~18k active merchants [fictional]`, `THREAD_PROFILES.md` line 65 says `15K merchants` | **RULED: 18k**, for corpus continuity. THREAD_PROFILES calls itself the contract tooling reads, so reconciling it has blast radius beyond this pair and is out of scope here |

**Decision rationales, including the case against each recommendation:**

- **D1-A** treats the imbalance named in "Where we are" as the thing worth correcting: the only user-reported work on the list waited two weeks while the repo shipped a feature its own front door does not mention. **The case against:** [#269](https://github.com/product-on-purpose/pm-skills/issues/269) contains an instance open since a 2026-06-06 audit that recorded it "bit LIVE during the v2.25.1 release", and debt that gets rediscovered is compounding. If the maintainer weighs that heavier, D1-B is the defensible counter, and D4-A is the hedge that keeps A honest by taking the one piece of debt with compounding return. D1-C is available and is what v2.32.0 chose, but that cycle ran two weeks and needed three review rounds at the gate; repeating it should be a deliberate choice, not a default.
- **D2-A** makes the example consistent with every other skill in the catalog and removes the ambiguity at its source. **The case against:** the existing EXAMPLE is genuinely richer than a filled-in template, and regenerating it discards authored work. B preserves it at the cost of leaving two formats in the same directory, which is the condition the reporter flagged.
- **D3: the drafted recommendation was C, and verifying its own precondition killed it.** C was attractive because it avoided per-skill version bumps and HISTORY rows. Its stated precondition was that the convention must actually be read under a partial install. Checking `docs/internal/distribution/skills-sh.md` settled it: the CLI copies only skill directories into the user's agent, so there is no repo-root file for C to live in. C is not a cheaper way to fix this; it is a way to not fix it. A has the same defect for the same reason, and survives only as a note for people reading the repo. **B is the only option that reaches the agent**, because `SKILL.md` is the only thing that ships. **The case against B, and why it is scoped:** applying it to all 35 costs 35 bumps plus 35 HISTORY rows for skills that merely mention a sibling and ship nothing unexecutable. Scoping to the 14 that issue an imperative keeps the fix where the defect is. The residual risk is that the 14/21 split rests on a regex for imperative verbs near a skill name, so a borderline skill could be misfiled; WS-3 re-reads the 21 by hand before closing, and any that turn out to mandate a handoff join the 14.
- **D4-A** takes the half with compounding return and defers the cleanup. **The case against:** splitting an issue risks the remainder never landing, which is exactly what happened to the 2026-06-06 audit finding. Mitigated by C-12 and C-13 staying on the v2.34.0 list with the checklist as their entry criterion.
- **D5-A** costs a session and unblocks later cycles. **The case against:** decisions made alongside a build tend to get the leftover attention, and D8 in particular was deliberately relocated out of the v2.32.0 tag window precisely so it could be read calmly.

## Trip-wires and drop order (apply if D1-A is ruled)

Dates assume the 2026-09-05 target; re-derive if the target moves.

1. If [#251](https://github.com/product-on-purpose/pm-skills/issues/251) and [#252](https://github.com/product-on-purpose/pm-skills/issues/252) are not both closed by 2026-08-22, the cycle has failed its own theme; stop adding scope and finish C-14 before anything else.
2. If D3 is not ruled by 2026-08-22, [#253](https://github.com/product-on-purpose/pm-skills/issues/253) drops to option A (front-door note only) and the fuller fix carries to v2.34.0.
3. If C-4's worked memory example is not drafted by 2026-08-29, it drops and the front-door text ships alone.
4. ~~If C-1 has not started by 2026-08-29, C-1 and C-2 both drop to v2.34.0 together, since C-2 is only due because C-1 is a content cycle.~~ **DISCHARGED 2026-08-16:** both landed, thirteen days inside the wire.
5. **C-14 never drops.** If a user-reported defect falls out of the release scoped to address user-reported defects, the cycle has failed at its own theme and should be re-scoped rather than shipped.

**Drop order, in order:** C-1 and C-2 first, then C-4's worked example (keeping the front-door text), then the D5 decisions block moves to v2.34.0. C-11's checklist and C-14 are the floor.

## Execution workstreams (proposed, contingent on D1)

| WS | What | Depends on | Agent | Exit criteria |
|---|---|---|---|---|
| WS-1 | **DONE 2026-08-16** ([#270](https://github.com/product-on-purpose/pm-skills/pull/270), `45172926`). `foundation-persona` 2.6.1: `EXAMPLE.md` regenerated as a filled-in instance of the Product Persona Template, verified structurally (13 of 13 template sections, 0 added, 0 leaked authoring blockquotes, 0 unfilled placeholders) rather than by eye. The Rhea Patel persona was **re-rendered, not replaced**, which answers the objection recorded against D2-A that regenerating discards authored work. Also gained the YAML frontmatter every other example carries and this one lacked, a second undetected deviation. Patch not minor, per the versioning table's "examples improved" row | D2 | claude | **MET.** [#251](https://github.com/product-on-purpose/pm-skills/issues/251) closed |
| WS-2 | **DONE 2026-08-16** ([#270](https://github.com/product-on-purpose/pm-skills/pull/270), `45172926`). `define-prioritization-framework` 1.3.0: all three friction points fixed at the reporter's suggested shape. The top/bottom rule scales at 10 or fewer items; the RICE Effort unit becomes capacity-weeks scaled to real team capacity with the conversion stated; Kano gains surveyed and inferred evidence tiers, with refusal reserved for having no research at all. Minor not patch, because the tiering runs a case the skill previously refused | - | claude | **MET.** [#252](https://github.com/product-on-purpose/pm-skills/issues/252) closed |
| WS-3 | **DONE 2026-08-16** ([#272](https://github.com/product-on-purpose/pm-skills/pull/272), `95288753`). **Scope narrowed from 14 to 4 by measurement during execution**, and the 14 turned out to be regex noise exactly as the recorded residual risk predicted: "shared with `foundation-meeting-brief`" and "produced by `foundation-okr-writer`" are not handoffs. The precise signal is a sibling named inside an output, routing, or refusal section, which yields 7, of which two are Project Memory Contract hits about reading memory and one (`foundation-prioritized-action-plan`) already carries the discipline. **The final four include both skills the reporter named**, which is the corroboration that the measurement converged rather than drifted. `foundation-build-risk-review` 1.1.0 gains a per-skill not-installed fallback table; `discover-journey-map` 1.3.0, `measure-survey-analysis` 1.3.0 and the Kano unlock path in `define-prioritization-framework` gain plain-language fallbacks in their refusal messages. Front-door note added via `scripts/data/quickstart-fragment.md`, since QUICKSTART is generator-owned end to end. **Prior-art correction:** an earlier claim that `utility-pm-workflow-orchestrator` handles a missing skill was wrong (it handles missing tools); the real prior art is `foundation-prioritized-action-plan`'s name-safety rule | D3 | claude | **MET.** [#253](https://github.com/product-on-purpose/pm-skills/issues/253) closed |
| WS-4 | **DONE 2026-08-16** ([#273](https://github.com/product-on-purpose/pm-skills/pull/273), `d553dc79`). **Scope grew during execution, correctly:** auditing the destination before writing pointers found the deep documentation was not usable either, so pointing four surfaces at it would have routed people to a dead end. **A real defect surfaced:** the docs called the state file "gitignored" twice, which is a property of THIS repo's `.gitignore` (`.claude/*`), not of the file. No document told a user to ignore it in their own project, so anyone following the docs would commit a file holding their initiative, decisions, and artifact paths while the docs assured them it was ignored. Corrected in both places, and every entry point now says to gitignore it first. Three usability gaps closed in `concepts/hooks.md`: the eight participating skills are now named in a table with what each reads and writes (previously "eight skills" with none named), a four-step getting-started sequence ending at the payoff rather than the schema, and the central claim demonstrated rather than described. Four surfaces landed: README and `index.mdx` directly, QUICKSTART and the site quickstart via `scripts/data/quickstart-fragment.md` since both are generator-owned end to end | - | claude | **MET.** All four surfaces carry a runnable setup, and the destination they point at is now sufficient |
| WS-5 | **DONE 2026-08-16** (shape ruled at D7). A published sample **pair** on the Storevine thread: [`sample_discover-interview-synthesis_storevine_sms-optin.md`](../../../../library/skill-output-samples/discover-interview-synthesis/sample_discover-interview-synthesis_storevine_sms-optin.md) and its consuming [`sample_deliver-prd_storevine_sms-optin.md`](../../../../library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_sms-optin.md), plus the walkthrough in `site/src/content/docs/concepts/hooks.md`. **Stated limit, recorded rather than implied** (D7): this demonstrates the loop as designed, not as executed, and does not prove the propose-then-confirm write path at runtime. **This row was found stale at G2 on 2026-08-29**, still carrying its proposed wording after the work had shipped, which is the same class as the pre-satisfied checkboxes R11-F3 and R12-F3 caught: a plan row that disagrees with the tree | WS-4 | claude | **MET.** Both samples published and the walkthrough landed |
| WS-6 | **DONE 2026-08-16.** Standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md), copied into this plan as a filled section above. **The gating question dissolved rather than being decided** (D6): the canonical runbook's G0 sub-check 6 already requires the plan marked READY TO TAG and blocks on any sub-check failure, so a checklist inside the plan gates the tag with zero runbook edits, satisfying both [#269](https://github.com/product-on-purpose/pm-skills/issues/269)'s "not in the runbook" and this row's "gates the tag". Carries the claim-verification rule with the two real v2.32.0 precedents, the external and cross-repo surfaces including the agent-plugins re-pin that no workstream row had ever carried, a measurement warning drawn from four wrong-on-first-pass counts, and five meta-rules including a three-cycle removal candidacy so it cannot silently become ceremony | - | claude | **MET.** Its first live instance was found before it existed: the release-plans index was stale two days after the v2.32.0 tag, fixed at `1cf6c6e4`, and is now a checklist row |
| WS-7 | **DONE 2026-08-16.** Four increments across three skills, ~~all additive minors~~ **three of them skill-MAJORs after the D11 retype of 2026-08-21**, plus the C-2 re-test run and recorded. `deliver-prd` **3.0.0** (drafted 2.3.0) gains two conditional sections (`AI Behavior and Evaluation`, pairing each behavior requirement with the evidence it holds and giving refusal and abstention their own `AB-n` rows; `Agent Execution Contract`, declaring authoritative sources, do-not-touch, an `FR-n` verification map and stop-and-escalate). `measure-instrumentation-spec` **3.0.0** (drafted 2.3.0) gains a conditional `Model Trace Capture` subsection under the existing privacy heading. `develop-adr` **3.0.0** (drafted 2.2.0) gains a conditional `Model Choice` subsection inside Consequences. ~~**Every one is conditional and structure-bearing**, which is not decoration: unconditional sections would have redefined "complete" for existing artifacts, invalidated thread samples, and made these skill-majors under the versioning tie-breaker.~~ **Overturned 2026-08-21 by G1 adversarial finding 1 and ruled at D11.** They are conditional and structure-bearing, and they *are* skill-majors anyway: conditionality narrows who is affected without changing what happens to them, and the tie-breaker asks whether existing usage breaks. It did. The two published `orbit` PRD samples describe an AI-generated summary feature and carried no `AI Behavior and Evaluation` section, so both were non-compliant with the skill that produced them; both were retrofitted at D11. **C-2 returned VOID (R3)** against a rule pre-registered and committed at `f4d50837` before the run; record at [`records/output-eval-weak-model-20260816.md`](./records/output-eval-weak-model-20260816.md). **`develop-adr` was deliberately held** until that record existed, because it is one of C-2's four eval pairs. `skill-manifest.json` regenerated, the CI-red omission the build spec carried | D1 | claude | **MET.** Four increments shipped and the re-test was run and recorded. The exit criterion said "shipped as additive minors"; three shipped as skill-MAJORs instead, per D11. The criterion's substance (four increments, re-test recorded) is met; its version-type wording was a prediction that the G1 review falsified |
| WS-8 | **DONE 2026-08-19. D10 (C-8) RULED A 2026-08-17 and executed; D9 (C-3) RULED C 2026-08-19, with the build targeting v2.34.0 before C-6 is ratified.** Brief prepared 2026-08-16; both items are maintainer-only, so this workstream stopped at a decision-ready brief: see [WS-8 decision brief](#ws-8-decision-brief-prepared-2026-08-16-d10-ruled-2026-08-17-d9-ruled-2026-08-19) below, carrying D9 (C-3) and D10 (C-8) with context, options, a recommendation, the case against each recommendation, and a `Final decision` line (both now filled). **C-3's shape changed on evidence collected after it was scoped:** the failure it was meant to prevent *passed* the existing lint, so promotion alone would not have caught it. **C-8's premise changed too:** [#223](https://github.com/product-on-purpose/pm-skills/issues/223)'s substance shipped in v2.32.0, making this a disposition rather than a build call | D5 | human | **MET.** C-3 and C-8 ruled and recorded. The criterion is *ruled*, not implemented, so C-3's v2.34.0 build carries forward without holding this release |
| WS-9 | Release cut via the 6-gate runbook | WS-1..8 | claude runs, human gates | v2.33.0 tagged; the WS-6 checklist used for the first time and its gaps recorded |

## WS-8 decision brief (prepared 2026-08-16; D10 ruled 2026-08-17, D9 ruled 2026-08-19)

Both items are maintainer-only per the agent-assignment framework. Prepared here with the evidence and a recommendation so each can be ruled in one pass. **D10 was ruled 2026-08-17** and **D9 was ruled 2026-08-19**; both Final decision lines are filled below.

| # | Decision | Options | Recommendation | Status |
|---|---|---|---|---|
| D9 | C-3: what to do about the PR-title lint, given that the demonstrated failure passed it | **A)** Promote the existing lint to required. **B)** Keep advisory, add a type-versus-change check. **C)** Both. **D)** Neither; rely on the shadow-PR observation step | **C**, with B as the load-bearing half | **RULED C 2026-08-19** (build targets v2.34.0) |
| D10 | C-8: disposition of [#223](https://github.com/product-on-purpose/pm-skills/issues/223), whose substance has shipped | **A)** Close as shipped. **B)** Keep open, rewrite the body to the residual. **C)** Keep open as-is and retarget | **A**, plus a cleanup the issue does not mention | **RULED A 2026-08-17** |
| D11 | G1 finding 1: the four conditional sections were typed as skill-MINORs; the adversarial review says the repo's own tie-breaker makes them MAJORs | **A)** Retype to MAJOR and fix the invalidated samples. **B)** Reword so the sections do not determine completeness. **C)** Keep MINOR with a documented exception | **A** | **RULED A 2026-08-21** |
| D12 | G1 round 2, F2 (evaluation-set sizing): the risk-based floor that replaced saturation stopping carries no derivation rule, so two competent PMs given the same feature do not arrive at the same N | **A)** Require a preregistered sizing calculation from acceptable failure rate plus confidence. **B)** Keep the coverage-floor framing, add a worked derivation and grade the reasoning in the checklist. **C)** Accept as-is, record the limitation, defer to v2.34.0 | ~~**B**~~ | ~~**RULED B 2026-08-25**~~ **EXECUTION OVERTURNED same day by G1 round 3; see D15.** The ruling was sound on its reasoning and wrong in what it licensed: the worked derivation it asked for was authored under gate pressure and overstated protection by roughly 3.5x |
| D13 | G1 round 2, F3 (release manifest scope): the reviewer's recommended fix would pre-empt open issue 279 (skills-manifest: restore the convention or retire it), which is scheduled for v2.34.0 scoping | **A)** Minimal correction of the header's false claims; enforcement rides with the 279 ruling. **B)** Build the enforcing reconciliation now and treat that as ruling 279 = restore. **C)** Drop the manifest from this release | **A** | **RULED A 2026-08-25** |
| D14 | G1 round 2, F5 (sample provenance): the retyped orbit samples encode an impossible `repo_version` / `skill_version` / `created` tuple, and correcting it is a library-wide schema choice affecting all 213 samples | **A)** Revert `skill_version` to its authored value and let the body note carry the maintenance story. **B)** Add a `maintained_against` field to the 8-field contract. **C)** Redefine both fields to mean the current contract | **A** | **RULED A 2026-08-25** |
| D15 | G1 round 3, R3-F2 (evaluation-set sizing, again): the derivation added under D12 computes its bound from the full slice while the same template holds 25% back from tuning, so it overstates protection by roughly 3.5x. The remedy the reviewer asks for is preregistered statistical methodology inside a PM template | **A)** Honest-minimal rewrite: strip every rate-bound claim, label floors as coverage judgments, defer rate methodology to a scoped v2.34.0 effort. **B)** Pull the AI conditional sections from v2.33.0 entirely. **C)** Author the full methodology now (p_max, alpha, sampling frame, independence) | **A** | **RULED A 2026-08-25** |
| D16 | G1 round 3, the validator gap behind five findings across two rounds: prose that asserts a countable fact has no gate, so `check-sample-counts.mjs` stays green while three other numbers on the same page contradict its headline | **A)** Carry the whole gap to v2.34.0; fix this round's instances by hand under the derive-by-command rule. **B)** Extend `check-sample-counts.mjs` to derive the per-thread distribution now (about 20 lines on a 73-line script), carry the general gate to v2.34.0. **C)** Build the general prose-asserts-a-fact gate in this cycle | **B** | **RULED B 2026-08-25** |
| D17 | The convergence standard for round 4, which must be fixed **before** the round runs: the canonical runbook's G1 sub-check 2 is disposition-based (P1 closed **or** explicitly deferred with rationale), while the standing cross-LLM protocol rule says re-run until findings fall below IMPORTANT. Under D15 = A the expected residual is "rate methodology deferred", which the first standard disposes of and the second blocks on | **A)** Pre-register the runbook standard: a deferred-with-rationale residual is dispositionable, so round 4 can clear the gate. **B)** Pre-register the stricter protocol standard: round 4 must return nothing at IMPORTANT or above. **C)** Rule it after round 4 returns | **A** | **RULED A 2026-08-25, before round 4 ran** |
| D18 | G1 round 6 path: the round splits 3 fix-pass findings (clause 5 requires closure) and 3 pre-existing findings unrelated to this release (clause 2 permits deferral) | **A)** Close the three, defer the three with rationale, run round 7. **B)** Revert the claim-adding fixes rather than correcting them. **C)** Stop at six rounds and defer all six. **D)** Pause the release and audit the library for the quantitative-claim pattern first | **A** | **RULED A 2026-08-26** |
| D19 | G1 round 6, R6-F2: how deep the storage-failure remedy goes in a PM-authored template | **A)** Name the terminal disposition and verify it, without enumerating queue mechanics. **B)** Full retry-horizon and dead-letter assertions as recommended. **C)** Defer the retry gap with the limitation recorded | **A** | **RULED A 2026-08-26** |
| D20 | G1 round 8: the trace-capture test block has produced six findings across five consecutive review rounds, every one an assertion added to one boundary and never mirrored to the other. A sixth targeted patch has a 0-for-5 record | **A)** Rewrite both boundaries symmetrically so asymmetry is visible on the page. **B)** Cut the test choreography and keep only the policy rows. **C)** Patch the named finding only, as before | ~~**A**~~ | ~~**RULED A 2026-08-26**~~ **PREDICTION FALSIFIED by round 9 and superseded by D22.** The ruling was sound on its reasoning and wrong in what it predicted: structural symmetry did not stop the churn, because the defect was representational rather than structural |
| D21 | G1 round 8, R8-F3: `deliver-prd`'s canonical EXAMPLE presents ~11 invented quantities as established research with zero fictional markers, pre-existing since v2.0.0 and part of the already-deferred fabricated-metrics validator gap, but sitting in this release's flagship skill | **A)** Fix now, matching how the identical `foundation-persona` instance was handled at round 5. **B)** Defer with the validator gap. **C)** Add the notice now, defer the per-metric sweep | **A** | **RULED A 2026-08-26** |
| D22 | G1 round 9 overturns D20 on evidence: the symmetric rewrite achieved symmetry of shape without equivalence of strength, and whole-class sentinels cannot represent value-level masking, which is the commoner real configuration | **A)** Delete the test choreography, keep every policy row, and require a QA-owned test per row recorded in a table. **B)** Patch the two named findings in place. **C)** Cut the trace subsection from v2.33.0 | **A** | **RULED A 2026-08-27** |

### D9: C-3, the PR-title lint

**Context, and the one fact that reshapes the decision.** C-3 was framed as "promote `lint-pr-title` from advisory to required." The evidence this cycle collected says that framing is wrong. **PR [#270](https://github.com/product-on-purpose/pm-skills/pull/270)'s title was valid conventional form.** It read `fix(skills): two field-reported defects ...` and `lint-pr-title` passed it. Promotion to required would not have prevented the miss, because the lint was never going to object.

What actually failed is type-versus-change: a `feat` commit squashed under a `fix` title, and release-please reads only the squash title. That mechanism is now **confirmed rather than inferred** (see section F): [#276](https://github.com/product-on-purpose/pm-skills/pull/276) merged under a `feat:` title and shadow PR [#271](https://github.com/product-on-purpose/pm-skills/pull/271) flipped from 2.32.1 to 2.33.0 in about forty seconds, with a falsification condition recorded in advance that did not fire.

**The existing lint's own promotion criterion is met** ("a full shadow cycle shows clean titles land without a manual nudge": six PRs this cycle, all green, no nudges). It is just that meeting it turns out to prove less than it sounded like.

**What a type-versus-change check would be, concretely.** The high-value case is machine-detectable without heuristics: compare `metadata.version` in every changed `skills/*/SKILL.md` against the base ref. If any skill MINOR or MAJOR bump is present and the PR title type is not `feat`, fail. That is a narrow rule over a deterministic signal, not a semantic judgement, so false positives should be near zero.

**The case against C, recorded.** Neither option closes the gap that `31f38ed4` demonstrates: a human-authored, non-conventional title pushed **directly to `main`**, which no PR-title lint can structurally see. Anyone reading a promotion as "the version-typing problem is now handled" would be wrong. The honest claim is narrower: it closes the PR-merge path and leaves the direct-push path open.

**Timing, which is the part most likely to be missed.** **C-3's value is conditional on C-6.** Today a wrong shadow proposal is observed and discarded, which is exactly what happened. After the authoritative cutover, merging that PR ships the wrong version. C-6 is blocked on [#267](https://github.com/product-on-purpose/pm-skills/issues/267), so there is runway, but **C-3 should land before C-6 is ratified**, not alongside it.

**Recommendation: C, both**, sequenced so B ships first and A rides along. A alone is cheap and nearly worthless against the demonstrated failure; B is the fix; A is worth having anyway now that its criterion is met and the marginal cost is one line of workflow config.

**Final decision:** **C, ruled 2026-08-19 by the maintainer** (approval in session of the prepared recommendation). **The implementation targets v2.34.0, not this release.** WS-8's exit criterion is "C-3 and C-8 ruled and recorded", not implemented, so recording this ruling satisfies the workstream and unblocks WS-9. The sequencing constraint from the timing paragraph above governs the build: C-3 must land **before C-6 is ratified**, not alongside it, and C-6 is blocked on [#267](https://github.com/product-on-purpose/pm-skills/issues/267), so there is runway. Until then a wrong shadow proposal remains observable-and-discardable rather than shippable, which is the state this cycle actually exercised.

**Build notes carried to v2.34.0, so they are not rediscovered:**

- **B first, A alongside.** B is `metadata.version` in every changed `skills/*/SKILL.md` compared against the base ref: if any skill MINOR or MAJOR bump is present and the PR title type is not `feat`, fail. Deterministic signal, no heuristics, so false positives should be near zero.
- **A's promotion criterion is already met** and is not re-litigated by this ruling: six PRs this cycle, all green, no manual nudges.
- **The claim stays narrow in any public copy.** This closes the PR-merge path only. The direct-push path that `31f38ed4` demonstrates remains structurally invisible to any PR-title lint, and release copy must not imply otherwise.
- **External-contributor failure mode, surfaced at ruling time.** B introduces a red check a fork contributor can hit by bumping a skill version under a `docs:` or `chore:` title, and the check name will not explain why. The failure message must name the offending skill, the version delta, and the required title type. Filed as an implementation requirement, not a reason to narrow the rule.

### D10: C-8, the [#223](https://github.com/product-on-purpose/pm-skills/issues/223) ledger disposition

**Context.** [#223](https://github.com/product-on-purpose/pm-skills/issues/223) asks to "revive the parked plan at `docs/internal/release-plans/_unreleased/project-memory/plan_project-memory.md` as its own release" and integrate an orchestrator artifact-ledger interface. **Its substance shipped in v2.32.0.** That plan's line 144 records the delivered surface as an `artifacts[]` ledger plus a `## Decisions` section under the four-tag provenance model, and D2 was ruled to build B1 and B2 in full that cycle rather than deferring.

So the issue's body now misdescribes reality: it asks to revive a plan that already shipped. Leaving a stale body open is precisely the rot pattern [#269](https://github.com/product-on-purpose/pm-skills/issues/269) documents.

**The orchestrator-interface leg was satisfied, not waived, and this was checked rather than assumed.** The v2.32.0 trip-wire read "Orchestrator artifact-ledger interface agreed | UNMET | Satisfied by the D2 delta spec before build; otherwise WAIVED-with-reason", which states a criterion and not an outcome. Verified: `spec_ledger-delta.md` has exactly one commit, `54744ceb`, the v2.32.0 shipping commit itself. The delta spec was authored, so the satisfying branch fired and there is no waiver residual hiding behind that wire. Had it ended WAIVED, [#223](https://github.com/product-on-purpose/pm-skills/issues/223) would carry a second live residual and option B would gain real weight.

**So the residual is singular, and already tracked elsewhere.** [#268](https://github.com/product-on-purpose/pm-skills/issues/268), "optimistic-concurrency write discipline is specified but not shipped", is open and is the one substantive thing v2.32.0 declared rather than enforced. It does not need [#223](https://github.com/product-on-purpose/pm-skills/issues/223) to stay open alongside it.

**A cleanup [#223](https://github.com/product-on-purpose/pm-skills/issues/223) does not mention, surfaced while checking its premise.** `docs/internal/release-plans/_unreleased/project-memory/` still holds three documents totalling about 38KB. Their histories differ and so should their handling. `plan_project-memory.md` and `spec_project-memory.md` trace back through v2.29.0 to v2.28.0 and describe work that shipped three days ago, so they are spent: a parked plan under `_unreleased/` for delivered work is live doc rot and the next reader has no way to tell. **`spec_ledger-delta.md` is different**: born in the v2.32.0 shipping commit and standing as the agreed orchestrator interface, it may be a living document rather than history, in which case `_unreleased/` is simply the wrong shelf for it. The recommendation is therefore **re-home, not archive**, and the three should be considered separately.

**Recommendation: A, close as shipped**, with the cleanup above done in the same pass and [#268](https://github.com/product-on-purpose/pm-skills/issues/268) named in the closing comment as the surviving residual. **The case against:** closing loses the thread for anyone who follows [#223](https://github.com/product-on-purpose/pm-skills/issues/223) as the ledger's home, which is the argument for B. B is defensible; C is not, because it leaves a body that describes shipped work as pending.

**Final decision:** **A, ruled 2026-08-17 by the maintainer** (approval in session of the prepared recommendation, during an open-issue review). Executed the same day: [#223 (memory artifact ledger)](https://github.com/product-on-purpose/pm-skills/issues/223) closed as shipped, with [#268 (write-discipline enforcement)](https://github.com/product-on-purpose/pm-skills/issues/268) named in the closing comment as the surviving residual and retitled to the residual scope. The cleanup executed with it: the three project-memory docs re-homed from `_unreleased/project-memory/` into [`../v2.32.0/`](../v2.32.0/plan_project-memory.md) - plan and spec as shipped history, `spec_ledger-delta.md` annotated as the standing interface of record - with every live in-repo reference retargeted and the internal-link backlog count verified not to grow.


### D11: the conditional sections are MAJORs, not MINORs

**Raised by G1, not by planning.** The v2.33.0 Codex adversarial pass returned this as its first
finding, at high severity, with the instruction to block the tag. It was not a candidate in this
plan's scope; it is a correction to work WS-7 had already marked DONE.

**The finding.** WS-7 typed four conditional sections across three skills as additive minors, on the
reasoning that a conditional block cannot break existing usage. The review held that this misreads
the repo's own rule. [`skill-versioning.md`](../../skill-versioning.md) says: *"If a user must do
something new to stay compliant with the skill's required contract, classify as major"*, and lists
*"'You must now include section X' -> major"* and *"New required checklist item added -> major"* as
worked cases. For a PRD whose output comes from a model, `AI Behavior and Evaluation` is now required
for completeness and two checklist items must pass. The population is narrower; the breakage is not.

**Verified before ruling, not taken on the reviewer's word.** The policy quotations were checked
against `skill-versioning.md` lines 85, 88, 98 and 99 and are accurate. The invalidation was checked
against the tree: `sample_deliver-prd_orbit_ideal.md` and `sample_deliver-prd_orbit_reality.md` both
describe an AI-generated summary feature and both carried zero instances of the new section.

**What made A affordable.** The review did not surface it, but `skill-versioning.md` versions the repo
independently of skills: *"A repo minor release might contain a new skill at 1.0.0 and an existing
skill bumped to 1.1.0. The version numbers are unrelated."* So three skill-MAJORs cost sample updates,
not a repo major, and **the reserved v3.0.0 marketplace-migration slot is untouched**. Had the two been
coupled, B would have been the stronger option.

**The case against A, recorded.** B is cheaper and was genuinely available. It was rejected because a
section that does not determine completeness is a section readers skip, which is the decoration failure
mode the C-3 spec's control-arm gate exists to catch. C was rejected outright: an undocumented
exception to a written rule is the drift pattern [#269](https://github.com/product-on-purpose/pm-skills/issues/269)
already tracks.

**A discovery that changed the execution.** The plan of record was to retrofit `orbit_ideal` and leave
`orbit_reality` with a contract-vintage note, on the assumption that the reality variant's value is its
imperfection. That assumption was wrong. `orbit_reality`'s own header states the two files carry the
*same* output and that *"the output quality is identical, which is the point"*: the variable in that pair
is the prompt, not the output. Their Output sections were confirmed byte-identical at `HEAD` before any
edit. Both were therefore retrofitted with the same block, and the byte-identity was re-verified after.
The rule now stated in both files is that orbit calibration samples track the skill's **current**
contract.

**Final decision:** **A, ruled 2026-08-21 by the maintainer.** Executed the same day: `deliver-prd`
2.2.0 -> 3.0.0, `develop-adr` 2.1.0 -> 3.0.0, `measure-instrumentation-spec` 2.2.0 -> 3.0.0, with the
drafted 2.3.0 / 2.2.0 versions retyped in place because v2.33.0 had not shipped and they were never
published. Both `orbit` samples retrofitted, `skill-manifest.json` regenerated, and the four remaining
G1 findings resolved in the same pass.

## G1 adversarial review: round 2 (2026-08-24) and the round-3 requirement

**Full record:** [`review/g1-round2-20260824.md`](./review/g1-round2-20260824.md), which is also the
runbook's G1 sub-check 3 artifact.

**Round 2 returned needs-attention / no-ship: 2 high, 4 medium.** The protocol re-runs until
findings fall below IMPORTANT, so the gate did not clear and WS-9 stayed blocked. The substantive
result was not the count. It was that the reviewer judged **round-1 findings 2, 3, 4 and 5
materially incomplete rather than resolved**, and that **two findings were new damage introduced by
the round-1 fix pass itself** (the orbit provenance tuple at F5, the half-updated sample arithmetic
at F6). Every checkable claim was verified against the tree before anything was recorded or fixed,
which is the same result round 1 produced.

**A note on why the round-2 result arrived three days late.** A round-2 pass was launched on
2026-08-21 and the session ended before it returned. The Codex companion's job store is
session-scoped, so that run was lost rather than pending: `codex-companion.mjs status --all`
reported no jobs recorded for this repository. The gate sat open for three days for no reason other
than a discarded job record. Either finish an adversarial round in-session or expect to re-run it.

**Dispositions.** Three findings were mechanical and were fixed on the reviewer's recommendation
(F1 trace-privacy boundaries, F4 Cohere retrieval configuration, F6 sample arithmetic). Three
required maintainer rulings because each decided something beyond the defect in front of it, and
were ruled 2026-08-25 as D12 (evaluation-set sizing derivation) = B, D13 (release-manifest scope) =
A, and D14 (sample-provenance schema) = A. D13 in particular exists because the reviewer's
recommended fix would have silently ruled open issue 279.

**One root cause ran deeper than reported.** F3 flagged the manifest header naming v2.8.0 as the
most recent prior manifest. The correct answer is v2.15.0, and the wrong one is reproducible: plain
`sort` orders `v2.8.0` after `v2.15.0` character by character, silently skipping five folders. The
header now records the trap so the next re-derivation uses `sort -V`.

**The fix window was free because the gate was closed.** All three retyped skills sat at 3.0.0
unreleased, so hardening their templates cost no further version bump. The same repairs after the
tag would have cost a patch or minor across three skills plus a sample sweep.

**Round 3 is required** and must converge before the maintainer can attest G1. The reviewing agent
does not attest its own review; per the runbook, "the conductor cannot auto-detect Phase 0 review
status; this is a maintainer attestation gate."

## G1 adversarial review: round 3 (2026-08-25) and the decision to stop patching

**Full record:** [`review/g1-round3-20260825.md`](./review/g1-round3-20260825.md).

**Round 3 returned needs-attention / no-ship with 8 findings (2 high, 6 medium).** Round 1 returned
5, round 2 returned 6. **The count is diverging.** All eight were verified true against the tree.

**The pattern is now the finding.** Three fix passes have each introduced fresh defects at roughly
the rate they closed old ones, and the enforcing validators were green after every one. Both of
round 3's highs were created by the pass that was meant to close round 2's two highs. The shared
defect class is **hand-maintained prose asserting a countable fact that no validator checks**:
cohort arithmetic, per-thread distributions, manifest header counts, HISTORY narrative claims,
sample frontmatter tuples. Two illustrations from this round: a correction to a lexical-sort
miscount itself miscounted (five skipped manifest folders listed where six exist, v2.13.0 omitted),
and the sample-decomposition repair fixed `README_SAMPLES.md` while leaving the **published site
index** still summing to 212.

**Seven of the eight findings need no ruling.** R3-F1 (trace failure policy), R3-F3 (the three
unattributed samples are the v2.26.0 workflow-builder cohort), R3-F4 (site thread distribution:
Brainshelf is 65, not 64), R3-F5 (orbit `skill_version` should be `2.0.0`, the authored value,
which is a correction *within* D14 rather than a reopening of it), R3-F6 (manifest skip list and
residual overclaim), R3-F7 (the X-03 walkthrough), and R3-F8 (the HISTORY self-contradiction) all
have single correct answers determined by facts already verified.

**R3-F2 is the one real decision, carried as D15 above.** The D12 remedy of 2026-08-25 is what
produced it: adding a derivation meant authoring statistical content under gate pressure, and the
result claimed roughly 3.5x more protection than the design supports. The remedy round 3 asks for
(preregistered `p_max`, confidence `alpha`, sampling frame, independence assumptions) is novel
methodology, not a patch, and this repo's standing rule is that a framework is tested against a
no-framework control arm before it is built, precisely so its author does not grade their own
homework. That rule killed the AI opportunity-shaping work in August. Recommendation is **A**, the
honest-minimal rewrite, which claims nothing false and is available inside the reviewer's own
recommendation ("label non-random curated slices as coverage judgments rather than population-rate
bounds").

**Two rules bind the next fix pass**, because the three that failed share one property, that they
added hand-typed claims:

1. **Every number in the diff is derived by a command, not typed** (counted from disk, ordered with
   `sort -V`, read via `git show`), and when a number appears on more than one surface, every
   surface is checked. R3-F4 escaped precisely because only one of two surfaces was inspected.
2. **Every edit is claim-reducing or claim-correcting, never claim-adding.** Where a hand-maintained
   decomposition can be deleted rather than repaired, deleting is the safer fix.

**On what convergence has to mean here.** The canonical runbook's G1 sub-check 2 is
disposition-based: P1 findings closed **or explicitly deferred with rationale**, P2 and P3
acknowledged. The stricter "re-run until findings fall below IMPORTANT" bar is a standing
cross-LLM-protocol rule the maintainer owns. Under D15 = A a round-4 residual of "rate-claim
methodology deferred to a scoped effort" is legitimately dispositionable at the gate rather than a
blocker, but that reconciliation is the maintainer's to make, not the reviewing agent's.

### The seven round-3 findings that need no ruling

Established pattern: an item earns a decision only when it needs a future call. These seven have
single correct answers determined by facts already verified against the tree, and are fixed in the
round-4 fix pass.

| Finding | Disposition |
|---|---|
| R3-F1 trace failure policy | Remove "send it raw" from the egress failure options, add the missing storage-failure decision row, and extend the sentinel test to the durable store as well as the collector. Aligns the template with this skill's own Quality Checklist, which already required both boundaries |
| R3-F3 the three unattributed samples | They are the v2.26.0 `utility-pm-workflow-builder` cohort (storevine, brainshelf, workbench). Add the cohort so the decomposition reaches 213 and delete the "predate this breakdown" claim |
| R3-F4 site thread distribution | Brainshelf is **65**, not 64. Counted from frontmatter. Broke at [#281](https://github.com/product-on-purpose/pm-skills/pull/281), which added a brainshelf sample without updating the line. **The only round-3 finding not caused by the round-2 fix pass, and the only one on a published surface** |
| R3-F5 orbit `skill_version` | Set `"2.0.0"`, the value `deliver-prd` actually declared at repo v2.5.0 (`git show v2.5.0:skills/deliver-prd/SKILL.md`). This is a correction **within** D14, not a reopening: D14 ruled "restore the authored value" and the fix restored the authored *literal*, which was itself wrong |
| R3-F6 manifest header | Include v2.13.0 in the skipped set (six, not five), narrow the validator description to the directory-existence check it actually performs, and reconcile the denominator against this plan's carry row |
| R3-F7 X-03 walkthrough | Rewrite using the real 2.1.0 / 2.2.0 / 3.0.0 history and make both format examples stamp the same version. The round-2 fix replaced two literals without reading the surrounding narrative |
| R3-F8 HISTORY self-contradiction | `measure-instrumentation-spec/HISTORY.md` line 22 says the Testing Checklist gained a block, line 65 still says it is unchanged. Update the Changes section |

**Three of these are one bug wearing three costumes: two surfaces, one fact, no reconciliation.**
R3-F4 is the site index versus `README_SAMPLES.md`. R3-F8 is one file contradicting itself. R3-F6 is
the manifest header contradicting **this plan's own carry row, which already said v2.15.0 and
already said 29 folders**. The correct value was in the repository the whole time, two directories
away. The failure was not ignorance; it was authoring a fact in isolation while the repo already
asserted it somewhere else. That is what D16 exists to gate.

### D15: the evaluation-sizing block, after three attempts

**What happened.** This block has now been rewritten twice under adversarial pressure and found
wanting three times: saturation stopping (round 1), an underived risk floor (round 2), and a
quantified overstatement (round 3). The D12 remedy is what produced the current defect. It derived a
coverage bound from full slice size while the same template holds 25 percent back from tuning, so
the untouched sets are 10 and 20 rather than 40 and 80. Claimed protection 7.5 and 3.75 percent;
actual one-sided 95 percent bounds 25.9 and 13.9 percent. **A wrong number carries more authority
than an obviously vague one**, so round 3's defect is worse than the two it replaced.

**Two measurements bound this decision, both taken 2026-08-25.**

*Provenance.* Seven of round 3's eight findings sit in files the round-2 fix pass touched. Exactly
one, R3-F4, is independent, and it traces to [#281](https://github.com/product-on-purpose/pm-skills/pull/281)
rather than to this cycle's build. **The release content is close to clean; the instability is the
fix passes.** The 5 to 6 to 8 progression reads as divergence only if provenance is ignored.

*Concentration.* Quantified-claim tokens (percentages, `3/n`, "bound", "confidence", "rate") per new
AI section: **evaluation sizing block 11; Agent Execution Contract 0; Model Choice 0; Model Trace
Capture 0** (its three regex hits were the word "generated" and one line of cautionary prose). The
other three sections are structural and qualitative. None asserts a number that can be
arithmetically wrong. **The contamination is one comment block, not the AI work.**

**Options and what each costs.**

- **A) Honest-minimal rewrite.** Delete the `3/n` derivation, the worked example and every number in
  it, and the "licenses exactly one claim" phrasing, in the template and both orbit samples. The D12
  checklist item is reworded, since "naming the smallest failure rate that slice must catch" is
  rate-language that would contradict the rewrite. **What survives is most of the block**: the
  anti-saturation argument (round 1's actual finding, never challenged and still correct), name the
  slices first, floor per slice, held-out cases, slices scored separately. `If a rate is claimed`
  becomes an explicit refusal. About five files, and every edit is a deletion. **Impact:** claims
  nothing quantitative, so no arithmetic remains to be wrong. The exit is inside the reviewer's own
  recommendation ("label non-random curated slices as coverage judgments rather than population-rate
  bounds"). **Case against:** round 2's charge that an underived floor is unreproducible between PMs
  may return. The answer is that an undefended coverage judgment claims nothing while a wrong bound
  claims something false, but that is a defensible position rather than a guaranteed-clean round.
- **B) Pull the AI conditional sections from v2.33.0.** 871 insertions across 14 files, including the
  `storevine_sms-optin` sample (170 lines) and the `brainshelf_topic-matching-model` ADR sample (127
  lines). Unwinds D11 and D14, both already ruled and executed, plus three skill MAJOR retypes and
  the orbit retrofits. **Impact:** removes three measurably clean sections to fix one dirty one, and
  strands the [#281](https://github.com/product-on-purpose/pm-skills/pull/281) community
  contribution after it was merged and thanked. The removal is itself a large hand-edited pass
  carrying the same new-damage risk that produced this decision.
- **C) Author the full methodology now.** Preregistered `p_max`, confidence `alpha`, sampling frame,
  independence assumptions, `ceil(log(alpha)/log(1-p_max))` sizing. **Impact:** most rigorous on the
  merits; the objection is process. It would be authored in one pass, under gate pressure, with no
  control arm, which is the exact setup that produced R3-F2. The standing control-arm rule killed
  the AI opportunity-shaping work in August at 0 of 3 judges. This would be the third attempt at the
  same move inside one cycle.

**Recommendation: A.** The provenance and concentration measurements both point at it: the defect is
confined to one block, and the option that removes claims cannot introduce the class of defect that
has now recurred three times.

**Final decision:** **A, ruled 2026-08-25 by the maintainer.** The rate-claim methodology carries to
v2.34.0 gated on a control arm, recorded in section D. **This overturns D12's execution**: the
worked derivation D12 licensed is deleted, and D12's Quality Checklist item is reworded because
"naming the smallest failure rate that slice must catch" is rate-language that would contradict the
rewrite.

### D16: the validator gap behind five findings

**The gap.** `check-sample-counts.mjs` is 73 lines and validates the headline total against disk.
Nothing gates the surrounding prose, so the headline can be right while the cohort decomposition,
the itemized arithmetic and the published per-thread distribution all disagree with it, and CI stays
green. That is what happened: round 2's F6 and round 3's R3-F3, R3-F4 and R3-F6 are all this gap,
and R3-F4 is live on the site now.

**Options and what each costs.**

- **A) Carry the whole gap to v2.34.0.** Fix this round's instances by hand under the
  derive-by-command rule. Cheapest now. **Impact:** the class stays open through the tag, and the
  next hand-repair is free to reintroduce it, which is the pattern this cycle demonstrated three
  times.
- **B) Extend `check-sample-counts.mjs` to derive the per-thread distribution now**, and carry the
  general gate to v2.34.0. About 20 lines on a 73-line script. **Impact:** closes the only
  published-surface instance permanently and makes R3-F4 unreintroducible. No tension with
  [#279](https://github.com/product-on-purpose/pm-skills/issues/279), which concerns the skills
  manifest rather than sample counts. Note this is **enforcement code, not prose**: the
  claim-reducing rule binding the fix pass governs hand-authored assertions, and a derived check is
  the opposite of an assertion.
- **C) Build the general prose-asserts-a-fact gate this cycle.** **Impact:** breaks the pattern
  outright rather than patching another instance, at the cost of pushing the tag out and expanding
  scope inside a release cut already over budget on scope.

**Recommendation: B.** It is the smallest change that converts the only user-visible instance from a
recurring hand-repair into a gate, and it is derived rather than typed.

**Final decision:** **B, ruled 2026-08-25 by the maintainer.** The per-thread distribution becomes a
derived check in this cycle; the general prose-asserts-a-fact gate carries to v2.34.0 in section D.

### D17: pre-register the convergence standard before round 4 runs

**Why this is a decision and why it cannot wait.** Two standards are live and they disagree. The
canonical runbook's G1 sub-check 2 is disposition-based: P0 closed, **P1 closed or explicitly
deferred to the next release with rationale**, P2 and P3 acknowledged. The standing cross-LLM
protocol rule is stricter: re-run until findings fall below IMPORTANT. Under D15 = A, round 4's
expected residual is "rate-claim methodology deferred to a scoped effort with a control arm", which
the runbook disposes of and the protocol rule blocks on.

**The reason to fix it first is this repo's own precedent.** C-2 was ruled VOID against a rule
committed at `f4d50837` **before** the run, specifically so the verdict could not be attacked as
moved goalposts. Choosing the standard after round 4 returns invites exactly that objection against
whichever way the result lands.

- **A) Pre-register the runbook standard.** A deferred-with-rationale residual is dispositionable, so
  round 4 can clear G1 with the sizing methodology explicitly carried. **Impact:** makes the gate
  reachable this cycle; requires accepting that "deferred with rationale" is a real disposition
  rather than a dodge, which is what the runbook already says.
- **B) Pre-register the stricter protocol standard.** Round 4 must return nothing at IMPORTANT or
  above. **Impact:** highest confidence in the shipped artifact; on current evidence it likely means
  a round 5, since a reviewer instructed to find problems in a template that declines to make a rate
  claim can still argue the decline is itself a gap.
- **C) Rule it after round 4 returns.** **Impact:** the goalpost objection, in whichever direction
  the result lands.

**Recommendation: A**, with the deferral written into the carry table so the rationale is a record
rather than a promise.

**Final decision:** **A, ruled 2026-08-25 by the maintainer, and committed before round 4 was
launched.**

### The pre-registered round-4 standard

Fixed here so it cannot be adjusted after the evidence arrives. Round 4 clears G1 when:

1. **No P0 finding stands.** Any P0 blocks outright.
2. **Every P1 finding is either closed or explicitly deferred to v2.34.0 with a written rationale in
   section D.** A deferral is a real disposition under the canonical runbook's G1 sub-check 2, not a
   dodge, and it must name what is deferred and why the deferral is safe to ship.
3. **P2 and P3 findings are acknowledged in the record.** They do not block.
4. **One exception is pre-declared:** a finding that the evaluation-sizing block declines to license
   a rate claim is **expected and dispositioned in advance** by this ruling and the D15 = A carry.
   Re-raising the deferred methodology is not a new finding. A finding that the block still *makes*
   a quantitative claim it cannot support **is** a new finding and blocks.
5. **Any finding that is new damage introduced by the round-4 fix pass is treated as P1 regardless of
   the reviewer's severity label.** Three consecutive passes introduced fresh defects; this cycle
   does not get to ship a fourth on a technicality.

The stricter standing cross-LLM rule ("re-run until findings fall below IMPORTANT") is **explicitly
set aside for round 4 only**, on the maintainer's authority as its owner, and remains in force for
future cycles.

## G1 adversarial review: rounds 4 and 5 (2026-08-25)

**Records:** [`review/g1-round4-20260825.md`](./review/g1-round4-20260825.md),
[`review/g1-round5-20260825.md`](./review/g1-round5-20260825.md).

**Count across the gate: 5, 6, 8, 6, 6.** Round 4 returned 1 high and 4 medium and 1 low; round 5
returned 3 high and 3 medium. Every finding in both rounds was verified true against the tree and
**closed rather than deferred**.

### What the derive-by-command rule bought

Round 4's reviewer summary volunteered, unprompted, that **"the 213/63 sample headline, 73/65/64/11
distribution, Orbit 2.0.0 versions, and 9-of-44 manifest count reconcile."** Zero count findings in
round 4 and zero in round 5, after five across rounds 2 and 3. The rule worked, and the one number
now behind a derived validator (D16 = B) cannot come back at all. The residual defect class moved
from arithmetic to prose consistency and test logic.

### The round-3 conclusion was wrong, and round 5 falsified it

The round-3 section above concludes that **"the release content is close to clean; the instability
is the fix passes"**, on provenance evidence that 7 of 8 round-3 findings sat in files the previous
fix pass had touched. ~~That conclusion~~ **OVERTURNED 2026-08-25 by round 5.** Three of round 5's
six findings are **pre-existing content defects that four prior rounds missed**, and one of them,
R5-F2, contradicts the stated basis for three MAJOR version bumps. The provenance measurement was
accurate; the inference drawn from it was not, because it treated "what this round found" as if it
were "what is there".

**The method finding underneath it.** Rounds 3, 4 and 5 all led their focus text with "new damage
from the fix pass itself". That instruction was correct and productive each time, and it also
**shaped what got looked at**. Only by round 5, with fix-pass damage thinning, did the review have
budget to range over untouched territory. The prompt is part of the instrument, and this one delayed
discovery of pre-existing defects by roughly two rounds. **The counter-frame is equally true:** five
genuinely pre-existing defects surfaced across five rounds, several serious, which is the gate
working rather than the release rotting.

### The two findings worth remembering

**R5-F2 (high, pre-existing): three templates labelled a required section OPTIONAL.** D11 retyped
three skills to MAJOR precisely because a conditional section is *required* for the population its
condition selects. `deliver-prd` said `OPTIONAL` twice and `develop-adr` once, while
`measure-instrumentation-spec` already said `CONDITIONAL`, which is what made the inconsistency
visible at all. The shipped artifact contradicted the stated rationale for its own version
classification. All three corrected.

**R5-F3 (high, pre-existing): `foundation-persona`'s `EXAMPLE.md` invented research provenance and
labelled the conclusions validated.** Five interviews, 312 tickets, four tenants, three recorded
sessions, zero `[fictional]` markers in a file whose skill exists to calibrate evidence claims. The
structural cause is a **validator scope gap that is the em-dash gap's twin**:
`check-sample-no-fabricated-metrics.mjs` globs `library/skill-output-samples/**/sample_*.md` only,
so `skills/*/references/EXAMPLE.md` is invisible to it, and it runs `continue-on-error: true`
besides. The validator built for this exact defect cannot see the file the defect is in. Carried to
v2.34.0 in section D.

### Self-check on the round-5 fix pass

The round-5 fixes were unavoidably claim-adding (markings, relabellings, new fallback rows), which
is the mode that has failed before, so the pass was audited against its own rules before round 6.
Two defects were found and fixed without waiting to be told: the persona marking was **partial**
(its comment said "every count below" while two claims sat above it, which is R4-F4's lesson
repeating), and three template comments carried **version-stamped rationale** ("that is why 3.0.0 is
a major"), which is X-03's rot class since a template outlives the version that produced it.

### What round 6 must clear

**The bar is a fully dispositioned round, not a zero-finding round.** Zero was never the
pre-registered standard, and five rounds of evidence suggest it may not exist on a 65-file diff
under adversarial review. Round 6 clears when no P0 stands, nothing is new damage from the round-5
fix pass, and any fresh **pre-existing** P1 is either closed or deferred to v2.34.0 with written
rationale. That deferral clause is what stops discoveries in untouched territory from extending the
loop without end, and using it is the maintainer's call on the round-6 record.

## G1 adversarial review: round 6 (2026-08-26) and the first use of the deferral clause

**Record:** [`review/g1-round6-20260826.md`](./review/g1-round6-20260826.md). An earlier attempt on
2026-08-25 aborted on a Codex usage limit and is **not counted as a round**; its transcript prints
"No material findings" as an artifact of the failed turn, which is a trap worth knowing about.

**6 findings, 5 high and 1 medium.** Trend 5, 6, 8, 6, 6, 6 by count, with severity climbing three
rounds running. All six verified true. **The composition, not the count, is the finding**, and it
splits exactly along the standard pre-registered at `e32a117d`.

### Closed, because clause 5 requires it (fix-pass damage)

| Finding | What was wrong, and what closed it |
|---|---|
| **R6-F3** (high) | The market-sizing fallback added at `76059476` multiplied reachable accounts by attach rate and called the result a bottom-up market estimate. That is a **customer count**; `discover-market-sizing` produces TAM, SAM and SOM, and its own input list names a revenue-per-customer assumption. **A fallback that teaches the wrong calculation is worse than the bare pointer it replaced.** Now requires all three factors, with each labelled sourced or assumed |
| **R6-F1** (high) | The Kano fix at `4f5d79ed` asserted that a small sample lands in the **inferred** tier, while the tier table defines tiers by **collection method** alone, so a small formal instrument stayed "surveyed" with categories "directly measured". Two independent dimensions had been conflated. Method now sets the tier; sample adequacy separately gates the claim, and "directly measured" appears only where it is prohibited |
| **R6-F2** (high) | The forced storage-failure test asserted absence at a point in time, which is also what a buffered trace looks like before replay. Closed at the depth ruled in D19 |

### Deferred to v2.34.0 with rationale, because clause 2 exists for exactly this

All three are pre-existing, none was introduced or touched by this release's work, and one is not in
the release diff at all. Carried in section D rather than fixed here.

| Finding | Why deferred |
|---|---|
| **R6-F4** (high) | `measure-survey-analysis` has told agents since **v2.18.0** (`c763bc3c`) that a leading question is "likely overstated by 20-40 percentage points based on instrument-bias research". No source, population or derivation. **The skill whose contract is refusing fabricated numbers has shipped one in its own refusal text for five releases.** In this diff only because C-14 bumped the file for unrelated reasons |
| **R6-F5** (high) | `define-opportunity-tree`'s example treats 4 of 5 participants and a 20-person survey as pass/fail gates. **The file is not in `v2.32.0..HEAD` at all** |
| **R6-F6** (medium) | The C3 design-of-record spec still labels four increments MINOR and one Optional, against D11's retype and R5-F2's correction |

### What the split means

Two things are now established by evidence rather than assertion. **Every fix pass introduces new
high-severity defects**, at roughly half of each round's findings, six times running. And **the
review has moved past this release's content**: two findings predate v2.33.0 by multiple releases,
one is outside the diff, and the reviewer is now usefully auditing the library rather than the
release.

R6-F4 in particular reframes something. The unsupported-quantitative-claim pattern that D15 treated
as a v2.33.0 defect is **library-wide and predates this release considerably**: it now spans
`deliver-prd`'s sizing block (fixed), `define-prioritization-framework`'s Kano fallback (fixed),
`measure-survey-analysis`'s bias range (v2.18.0, deferred), and `define-opportunity-tree`'s example
gates (out of diff, deferred). That is a library audit, not a release gate, and it is carried as one.

### D18: the round-6 path

**Options.** **A)** Close the three fix-pass findings, defer the three pre-existing ones with
rationale, run round 7. **B)** Revert the two claim-adding fixes rather than correcting them, which
reopens R5-F6 and the original Kano contradiction as knowingly shipped. **C)** Stop at six rounds,
defer all six, attest on the round-6 record, which means knowingly shipping three defects introduced
this week and is what clause 5 was written to prevent. **D)** Pause the release and audit the
library for the quantitative-claim pattern first.

**Final decision:** **A, ruled 2026-08-26 by the maintainer.** The deferral clause is doing the work
it was designed for, and clause 5 still binds the damage.

### D19: how deep the R6-F2 remedy goes

**Context.** The reviewer's recommendation was to exercise fault recovery and replay, drain or
advance all retry paths, and assert absence from queues, dead-letter stores and final sinks through
a defined retry horizon. That is correct engineering and a real question about what a **PM-authored**
artifact should carry.

**Options.** **A)** Name the terminal disposition as a required decision and verify that, without
enumerating queue mechanics. **B)** Full retry semantics as recommended. **C)** Defer the retry gap
with the limitation recorded.

**Final decision:** **A, ruled 2026-08-26 by the maintainer.** The template gains a
`Terminal disposition of a failed trace` row that forces the spec to say whether a failed trace is
dropped or held, and states that any buffer, replay or dead-letter path **is** a durable sink so the
rest of the contract applies to it. This closes the hole at a depth a PM can author and verify,
without asking an instrumentation spec to carry distributed-systems test design.

**Partially superseded by D22 on 2026-08-27.** The `Terminal disposition of a failed trace` row
survives and is load-bearing. The accompanying test assertion this ruling added, clearing the fault
and re-checking the sentinel, was deleted with the rest of the choreography, and the requirement it
carried now lives in the per-row failure-coverage rule instead. **D19's principle was not
overturned; D22 extended it.** D19 said a PM template names the contract rather than enumerating
queue mechanics, and D22 applied that same reasoning to the remaining test steps that D19 had left
standing.

## G1 adversarial review: rounds 7, 8 and 9, and what the nine rounds actually measured

**Records:** [`review/g1-round7-20260826.md`](./review/g1-round7-20260826.md),
[`review/g1-round8-20260826.md`](./review/g1-round8-20260826.md),
[`review/g1-round9-20260826.md`](./review/g1-round9-20260826.md).

**Counts: 5, 6, 8, 6, 6, 6, 4, 4, 5.** Fifty findings across nine rounds, every one verified against
the tree before it was acted on, and none taken on the reviewer's word.

### The one measurement that explains the cycle

Splitting the findings by **which fix mode produced the surface** separates them cleanly, and the
split is not the one this plan assumed at round 9, which was instance-versus-class:

| Surface | Findings | Rounds | Fix mode used |
|---|---|---|---|
| Trace-capture test block | **10** | 2, 3, 4, 5, 6, 7 (x2), 8, 9 (x2) | authored test choreography, **including a ground-up symmetric rewrite at D20** |
| Kano evidence tiers | **4** | 6, 7, 8, 9 (consecutive) | authored measurement methodology |
| Evaluation-sizing block | 3, then **zero** | 1, 2, 3 | **D15 deleted the methodology** |
| `EXAMPLE.md` research claims | 0 after the sweep | - | swept by class, markings only |

**Every fix that removed a claim converged. Every fix that authored methodology churned.** The
sizing block has produced nothing across six consecutive rounds since D15 deleted its derivation.
The trace block survived a full rewrite and produced two more highs immediately.

This is D15's lesson, relearned on two further surfaces without being recognised as the same lesson
until round 9. **The instance-versus-class diagnosis recorded in the round-9 record is real but
secondary**: the trace block was fixed by class at D20 and still churned, because the problem was
never the breadth of the fix. It was that a PRD-time template cannot author correct
distributed-systems test design, and an adversarial reviewer will keep proving it.

### D22: the trace block, overturning D20 on evidence

D20 chose a symmetric rewrite on the prediction that structural symmetry would stop the churn.
**Round 9 falsified that prediction directly.** R9-F1 showed the rewrite achieved symmetry of shape
without equivalence of strength: its shared control only exercised the egress path, so the durable
writer was never proven live and a fail-open storage minimizer passed. R9-F2 was worse and is the
finding that settles it: sentinels defined around **wholly forbidden classes** cannot express
**value-level masking within a permitted class**, which is the commoner real configuration, so the
common case routed straight to "Not applicable" and a broken masker passed by construction. That is
a representational misfit, and no amount of added test detail repairs a wrong abstraction.

Overturning a ruled decision on new evidence is this repo's own pattern, most recently D12 to D15 on
the same day for the same reason.

**Final decision:** **A, ruled 2026-08-27 by the maintainer.** Every policy row survives, D19's
terminal disposition included: data classes, minimization at both boundaries, failure behavior at
both, terminal disposition, read logging, retention, sampling, opt-out. What is deleted is the test
choreography, replaced by a named requirement that each policy row carry a QA-owned test which could
fail, proven on the normal path and under forced failure, plus a table recording where each test
lives and who owns it, with untested rows listed as untested rather than omitted.

**The case against, recorded.** Deleting tests reads as weakening a privacy guarantee. It would, if
the tests worked. They passed vacuously in three distinct ways across rounds 5, 8 and 9, and R9-F2
showed the common configuration skipped them entirely. **A test that cannot fail is worse than a
named requirement, because it converts an open question into a checked box.**

### Kano, given the same shape without a new ruling

The output contract is now **representationally complete**: `Ambiguous` in the category enum, and
per-feature response distribution and evidence-tier-plus-claim-strength as their own columns, since
round 9 showed an agent could follow the declared contract and have nowhere to record the outcome the
adequacy rule demanded. Both requirements are mirrored into the quality checklist.

**The skill explicitly declines to define "clearly leads" as a number**, and says so in the text
rather than leaving it unstated. A house cutoff would be the same move as a house sample size: a
number with nothing behind it, carrying more authority than the judgment it displaced. The reader
sees the distribution and makes the call, and `Ambiguous` exists for when they cannot.

### Class discipline, applied by command rather than by eye

Round 9's two sweep findings were closed by enumerating class membership with a script and recording
the enumeration, so a later round checks a table instead of re-deriving one.

- **The PRD example** was classified number by number into observations and decisions. Exactly one
  unmarked observation survived the round-8 sweep, the claim that standard patterns cover 85 percent
  of use cases, which is a scope justification wearing a design constant's clothes. It is marked, and
  the notice now states the **test** (does the number claim the world is a certain way?) rather than
  illustrating it with two examples.
- **The in-diff sample set** was swept for asserted methodology. The interview-synthesis sample
  invents a 45-minute session length, a two-week field period and two-researcher independent coding,
  none of which its prompt supplies, while the six participants and their split are grounded. Those
  three are marked with a note on why unmarked methodology is what makes an invented synthesis read
  as corroborated. Its companion PRD was checked for inherited claims and carries none: its only
  research-sourced figure is the six merchants, which is grounded.

## G1 adversarial review: rounds 10, 11 and 12, the stopping condition, and what twelve rounds measured

**Records:** [`review/g1-round10-20260827.md`](./review/g1-round10-20260827.md),
[`review/g1-round11-20260827.md`](./review/g1-round11-20260827.md).

**Counts: 5, 6, 8, 6, 6, 6, 4, 4, 5, 5, 3.** Round 11 is the lowest of the gate; fifty-three findings
across eleven rounds. The full synthesis of these two rounds is **deliberately deferred** until the
gate's disposition is known, so it can be written once rather than twice. D23 below is the only part
that cannot wait, for the same reason D17 could not: a stopping condition chosen after the evidence
arrives is a moved goalpost.

Round 10 was the first round run with pre-declared scope boundaries on the record, and the reviewer
respected both. Round 11 returned three findings, two of them fix-pass damage and one from untouched
governance territory, and closed all three.

**The state this section exists to record: `51d5bec6` is an unreviewed fix pass.** Round 11 reviewed
`e6e53ba7`. **Maintainer attestation has not been given on any round of this gate.**

### D23: the stopping condition, pre-registered before the recheck runs

**Why this is a decision and why it cannot wait.** No committed rule says when this gate ends. The
pre-registered round-4 standard at `e32a117d` governs how findings are *dispositioned*; it never says
how many rounds are enough. Eleven rounds have run without one. C-2 was ruled VOID against a rule
committed at `f4d50837` **before** the run, and D17 was ruled and committed before round 4 launched,
both so the verdict could not be attacked as a moved goalpost. The same exposure applies here in both
directions: clear the gate on an unruled standard and the clearance is arguable; block on one and so
is the block.

**Two measurements taken 2026-08-28, before this decision was framed, because the obvious stopping
conditions turn on them.**

**Measurement 1: fix-pass damage is near-universal and is not decaying.** Rounds 7 through 11 produced
21 findings, and **17 came from the immediately preceding fix pass**: 3 of 4, 3 of 4, 4 of 5, 5 of 5,
2 of 3. Every round. **Measurement 2: the fix passes are not shrinking.** Diff sizes for the round-6
through round-11 fixes run 91, 128, 51, 141, 95, 86 lines changed, flat rather than tapering.

**Together these falsify any rule of the form "recheck until a recheck comes back clean."** Each fix
pass is the same size as the last and carries the same damage rate, so the expected number of further
rounds under an open-ended rule is unbounded. **A gate needs a terminator that does not depend on a
clean round arriving.** This is the same lesson the round-9 analysis reached from the other
direction: fixes that *delete* a claim converged, fixes that *author* methodology churned, and D22's
authored replacement then churned twice more (R10-F1, R11-F1).

**Measurement 3, correcting an earlier draft of this brief.** Untouched-territory findings across
rounds 6 through 11 run **3, 0, 1, 0, 0, 1**: three of six rounds, declining. An earlier draft of
this section claimed four of six and used it as the case against option B. That was wrong and is
recorded here rather than quietly removed, because the corrected number weakens an argument this
brief was making for its own recommendation.

**Two distinct damage classes, which the option set has to cover.** The records separate them, and
they need different instruments:

| Class | What it is | Seen in | Caught by |
|---|---|---|---|
| **Execution fidelity** | The fix did not do everything the finding named | R9, R10-F3, **R11-F2** (third recurrence) | Re-reading the finding against the result; mechanical |
| **Fresh design damage** | The fix's *replacement* has a new hole | R9-F1/F2 (D20), R10-F1 (D22), **R11-F1** (D22) | Adversarial review only |

`51d5bec6` contains one change of each class: the trace row split is a design change, and the
quote-editing marker is an execution-fidelity fix. **Any stopping condition that covers only one
class leaves the other unexamined in the newest diff.**

- **A) One scoped recheck, pre-registered as the last adversarial round of this gate.** Re-review only
  the surfaces `51d5bec6` changed: the split trace rows (`Who can read a trace` and the new
  `Whether a read is logged`), the quote-editing and de-identification markers in the
  interview-synthesis sample, and the reset post-tag index row. Then, **regardless of what it
  returns**: findings on those surfaces are closed, findings on untouched territory are dispositioned
  under clause 2 (deferral to v2.34.0 with rationale), **the resulting fix pass is verified by a
  recorded finding-versus-result table rather than by another adversarial round**, and the gate is
  attested. **Impact:** terminates by construction rather than by hoping for a clean round, which
  measurements 1 and 2 say will not arrive. Covers both damage classes: the round covers design, the
  verification table covers fidelity. Costs one round and one verification pass.
  **Instruments, named here so the round cannot be re-litigated on method.** The Codex companion
  `adversarial-review` is the **instrument of record**, matching all eleven prior rounds and the
  standing cross-LLM protocol. A multi-lens Claude panel runs alongside it as a **corroborating**
  instrument, its lenses mapped to the two damage classes plus a governance class-check.
  Corroboration **adds** findings to the round and never subtracts them: a Codex finding stands
  whether or not the panel reproduces it, and a panel finding is dispositioned on its own merits.
  Adding an instrument strengthens the round rather than moving its goalposts, which is why it is
  recorded before the round runs rather than after its result is known.
- **B) Scoped recheck, any high-severity finding reopens the gate.** **Impact:** rejected on
  measurements 1 and 2, not on untouched-territory frequency. Its fix pass would itself be an
  unreviewed fix pass at the same damage rate, so B is the open-ended rule the measurements falsify,
  with the added cost of reopening classes this cycle has already agreed to defer.
- **C) Attest on round 11 as it stands, no recheck.** **Impact:** fastest to tag, and defensible on
  the argument that round 11's only untouched-territory finding was governance rather than content.
  Against it: it leaves the fresh-design-damage class unexamined in `51d5bec6` precisely where that
  class lives, the trace row split, on a gate where that class has appeared in three consecutive
  rounds.
- **D) Direct verification of the three round-11 fixes, no adversarial round.** Re-read each of
  R11-F1, R11-F2 and R11-F3 against what the fix actually did, and record the result. **Impact:**
  cheap, and it targets R11-F2's stated root cause exactly. **Rejected:** it covers execution
  fidelity only. The row split is fresh design damage, which is the class that produced R10-F1 and
  R11-F1 and which a finding-versus-result re-read cannot see, because the replacement can be a
  faithful implementation of the finding and still carry a new hole. D is not discarded: it is
  **absorbed into A** as the verification instrument for A's own fix pass, where the remaining risk
  really is fidelity-only.

**Recommendation: A.**

**The standing cross-LLM rule is set aside for this gate's closure**, on the maintainer's authority as
its owner, mirroring the D17 move for round 4. That rule ("re-run until findings fall below
IMPORTANT") is an open-ended rule, and measurements 1 and 2 are the evidence that it cannot close this
gate. It remains in force for future cycles, where a fix-pass damage rate this high is not the
baseline expectation. **This set-aside is the load-bearing clause: without it the budget in A
contradicts a rule still in force and the pre-registration is incoherent.**

**Operating notes carried into the recheck, from the round-11 environment.** The MSYS fork-storm that
wedged Bash mid-round-11 clears on session restart and has cleared. A Codex companion review is
session-scoped, so the recheck must be launched with time to complete rather than near a boundary. An
exit 1 plus "Turn failed" prints "No material findings" as an artifact of the aborted turn: that is a
re-run, not a clean round, and it is not counted.

**Final decision:** **A, ruled 2026-08-28 by the maintainer**, on in-session approval of the
recommendation above ("continue based on your best recommendations"). Ruled and committed
**before round 12 launched**, per the C-2 and D17 precedent, so neither a clearance nor a block
can be attacked as a moved goalpost. The standing cross-LLM rule is set aside for this gate's
closure as stated above, and remains in force for future cycles.


## G1 CLOSED: round 12, and what twelve rounds actually measured

**Record:** [`review/g1-round12-20260828.md`](./review/g1-round12-20260828.md). **Maintainer
attestation GIVEN 2026-08-29**, the first and only one sought in this gate.

**Final trend: 5, 6, 8, 6, 6, 6, 4, 4, 5, 5, 3, 3.** Fifty-six findings across twelve rounds, every
one verified against the tree before it was acted on, none taken on the reviewer's word.

### The one measurement that should outlive this release

Splitting all fifty-six findings by **what the fix that produced the surface did** separates them
completely, and the split held for the whole gate:

| Fix mode | What happened |
|---|---|
| **Deleted a claim** | Converged, every time. The evaluation-sizing block produced three findings in rounds 1-3 and **zero across the nine rounds after D15 deleted its derivation** |
| **Authored methodology or structure** | Churned, every time. The trace block survived a symmetric rewrite (D20), a choreography deletion with an authored replacement (D22), and a row split (the R11-F1 fix), **and produced a fresh high-severity finding after each one** |

**R12-F1 is the cleanest single instance in the whole gate.** The R11-F1 fix split a row in order to
assert that a row must carry exactly one claim. The row it authored to demonstrate that rule carries
two. The principle was right and the act of authoring a replacement to embody it reintroduced the
defect one level down. That is why R12-F1's own fix does not split again: the template now states
that a row is a heading rather than a promise of atomicity, that a coverage entry proves one claim,
and that decomposition belongs to the QA owner. **It removes a claim rather than authoring
structure**, which is the only fix mode this gate ever observed converging.

Codex's recommendation for R12-F1 was a six-row atomization. It is recorded and declined in the round
record, with the case against the decline stated. **Declining a reviewer recommendation on twelve
rounds of measured evidence is the point of measuring.**

### What the fix-pass damage rate implies for the next cycle

Rounds 7 through 11 produced 21 findings and **17 came from the immediately preceding fix pass**, at
diff sizes that stayed flat rather than tapering. That pair of measurements is what made D23
necessary: it falsifies "re-run until a round comes back clean" as a stopping condition, because
nothing in the data predicts a clean round ever arriving.

**The next cycle should not inherit twelve rounds as a norm.** The gate ran long because it was
fixing by authoring, and the reviewer kept being right. A cycle that fixes by deleting or marking
should converge in the two-to-three rounds v2.32.0 took.

### The root cause the last round finally named

Four separate rounds (9, 10, 11, 12) each found an incomplete sweep of invented methodology markers,
and each was treated as a sweep failure. It was not. **The rule being enforced was never written
down.** [`library/skill-output-samples/README_SAMPLES.md`](../../../library/skill-output-samples/README_SAMPLES.md)
defines the `[fictional]` convention entirely in terms of numbers, and
`check-sample-no-fabricated-metrics.mjs` is percentage-scoped to match, which is why it held at
exactly 338 across a fix pass that added seven markers and could never have caught `eight months`.
Four sweeps re-derived their own scope and each drew the boundary differently. Carried to v2.34.0 in
section D as the item that should **lead** the library audit rather than follow it.

### Round 12's method note, worth keeping

Two instruments ran, both named in D23 before the round so neither could be a post-hoc addition.
**All three Codex findings were independently reproduced by the corroborating Claude panel**, and the
panel's own raw output was cut by a third (9 of 27 candidates killed) by three perspective-diverse
refuters defaulting to refuted. Two lessons: independent convergence is the answer to "is the
reviewer inventing work", and **a corroborating instrument is not a substitute for the instrument of
record**. Codex named one unmarked claim that neither panel lens found; building the fix from the
panel would have produced a fifth recurrence inside a fix pass no round would review.


## Release hygiene checklist

Copied from the standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md) and filled as this cycle runs. **This plan may not be marked READY TO TAG while any GATE row due at or before G0 is unchecked**, which is how it gates via the canonical runbook's G0 sub-check 6 without any runbook edit. **GATE rows due at G2 or G4 do not block the mark**; they block the cycle closing and are checked as their own gate runs.

**The due-stage qualifier was added 2026-08-19, on this checklist's first live use, because the rule as written was circular.** Section C is G4 post-tag work by definition (a Release body cannot be checked before a release exists; the `agent-plugins` re-pin points at a tag that does not yet exist) and section A's CHANGELOG row is marked "to fill at G2", so a G0 requirement depended on rows only G2 and G4 could fill and the tag was unreachable. Corrected in the standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md) so the next cycle inherits the fix, and logged in section D below. This is WS-9's "checklist used for the first time and its gaps recorded" criterion producing its first result.

### A. Quantitative claim verification (GATE; rows due G0 except where a row says G2)

For every quantitative claim in release copy, name the artifact that would fail if it were false.

| Claim | Artifact that goes red if false | Verified |
|---|---|---|
| ~~"212 samples across 63 skills"~~ **"213 samples across 63 skills"** | `scripts/check-sample-counts.mjs`, enforcing in CI | [x] **Re-derived 2026-08-21 at 213/63** after external PR [#281](https://github.com/product-on-purpose/pm-skills/pull/281) merged at `922d3303`, adding the first sample to exercise a conditional section this release ships (`develop-adr` -> `Model Choice`). Merged **before** the tag deliberately: shipping four new conditional sections with no sample demonstrating any of them was the worse option, and this row is cheap to re-derive because the script is enforcing and cannot drift silently |
| ~~Six~~ **Eight skill version bumps this cycle** (nine bump *events*), **3 major / 4 minor / 1 patch after D11** | **Neither named artifact can verify this claim.** `scripts/validate-skill-history.sh` and `gen-skill-manifest.mjs --check` are both enforcing, but they verify *per-skill* consistency between a `SKILL.md` version and its HISTORY row. Neither computes a total, so both stay green at any count | [x] **Re-derived 2026-08-16, and re-verified at HEAD 2026-08-28** because the original stamp predated ten G1 rounds of skill edits and the D11 retype the claim's major/minor split depends on. The re-derivation holds exactly: eight skills, **3 major** (`deliver-prd` 2.2.0 to 3.0.0, `develop-adr` 2.1.0 to 3.0.0, `measure-instrumentation-spec` 2.2.0 to 3.0.0), **4 minor**, **1 patch** (`foundation-persona` 2.6.0 to 2.6.1). From `git diff v2.32.0..HEAD -- 'skills/*/SKILL.md'`: eight skills bumped (`define-prioritization-framework`, `deliver-prd`, `develop-adr`, `discover-journey-map`, `foundation-build-risk-review`, `foundation-persona`, `measure-instrumentation-spec`, `measure-survey-analysis`). "Six" was wrong before WS-7 touched anything: five skills had bumped, across six bump events, because `define-prioritization-framework` was bumped once and credited to both WS-2 and WS-3 |
| "the PRD prompt is 11 lines against 32" (WS-5 sample copy) | Nothing. Prose in a sample, not gated. **Counted by hand against both files** and the first count was off by one before `sed` corrected it | [x] Verified manually |
| Remaining CHANGELOG figures | Named per claim below | [x] **Filled and verified at G2, 2026-08-29.** The v2.33.0 entry asserts five quantitative claims and each was checked against the artifact that would go red: **213 samples across 63 skills** by `scripts/check-sample-counts.mjs` (enforcing, returns 213/63); **68 skills split 30 phase / 11 foundation / 12 utility / 15 tool** by `check-count-consistency` (enforcing, PASS) and `check-landing-page-counts -Strict` (PASS); **6 sub-agents** unchanged, by `check-agents-md-command-sync` (PASS); **eight skill bumps, 3 major / 4 minor / 1 patch**, re-derived at HEAD from `git diff v2.32.0..HEAD -- 'skills/*/SKILL.md'` because no artifact computes a total, per this section's own second row; and the three named skill versions (`deliver-prd` 3.0.0, `measure-instrumentation-spec` 3.0.0, `develop-adr` 3.0.0) read directly from frontmatter. **`foundation-persona` 2.6.1 and `define-prioritization-framework` 1.3.0** likewise read from frontmatter |

### B. Gate-owned checks (pointer only)

- [ ] G0 through G4 per `site/src/content/docs/contributing/release-runbook.md`. Not restated here. READY TO TAG requires only the GATE rows due at or before G0.

### C. External and cross-repo surfaces (GATE; due G4, post-tag - these do not block READY TO TAG)

| Surface | Condition | Done |
|---|---|---|
| GitHub About description | Every release; compare against `gen-derived-surfaces --about` before editing | [x] **2026-09-01.** Verified current against the live repo rather than edited: the About text already reads 68 / 30 / 11 / 12 / 15 and 6 sub-agents, none of which this release changes. No edit owed |
| GitHub Release body | Every release; the workflow ships a generic template | [x] **2026-09-01.** The `Release` workflow auto-published its generic what-is-in-the-zip template on tag push; replaced with an authored plain-English announcement covering the three reported defects, the AI-product family, the project-memory front door, the skill-MAJOR upgrade implication, and the one known gap shipping |
| `agent-plugins` re-pin | Every release. Complete that repo's Section 7 checklist in the PR body | [ ] **OPEN 2026-09-01. This is the release's DELIVERY PATH, not post-release tidying.** The earlier note here read "cross-repo, nothing blocks it", which was literally true and wrong in effect: nothing blocks *doing* it, but until it is done **no user can receive the release**. Users install pm-skills from the `product-on-purpose` marketplace, which is the `agent-plugins` repo, and that registry pins by commit SHA independently of anything in this repo. It still pins `e8a641c3` (v2.32.0), so `claude plugin update` correctly returns 2.32.0 on every machine. `pm-skills`'s own `marketplace.json` reading v2.33.0 is irrelevant to those users. **Found from a field report, not from any check here**, which is the real defect: G4 can declare a release complete while it is undeliverable. Prepared at agent-plugins issue [#94](https://github.com/product-on-purpose/agent-plugins/issues/94) and branch `repin/pm-skills`; design to invert the default at agent-plugins [#95](https://github.com/product-on-purpose/agent-plugins/pull/95) |
| `docs/internal/release-plans/README.md` | Every release | [x] **BOTH HALVES DONE 2026-09-01 (G4).** (1) `Latest shipped` now names v2.33.0 with v2.32.0 demoted to `Previous`. (2) The v2.33.0 entry now reads `SHIPPED 2026-09-01` with the tag and SHA. Original criterion below, kept for the record: **(due: G4, post-tag)** **Both halves, per the standing source's "Update 'Latest shipped' and the version's own entry".** (1) The `Latest shipped` line must name v2.33.0. (2) The v2.33.0 entry itself must stop reading `SCOPE COMMITTED`. **Reset to unchecked 2026-08-27**: it had been marked complete on the strength of the v2.32.0 repair at `1cf6c6e4`, which is this control's *origin story*, not its completion for this cycle. **Second half added 2026-08-28 (R12-F4)**: the reset named only `Latest shipped`, but the v2.32.0 incident this control was built from had both surfaces stale at once, so a criterion covering half of it could be satisfied while the entry still read `SCOPE COMMITTED` |
| `pm-skills-mcp` surfaces | Only if the release changes the catalog narrative or skill counts | [ ] **OPEN 2026-09-01.** Counts half is N/A: catalog holds at 68 / 6. Narrative half needs a ruling rather than an edit, since the AI-product family is genuinely new narrative but that repo is in maintenance mode |
| Topics, Pages, Open Graph | Every release | [x] **2026-09-01.** All twelve topics verified current and unchanged by this release. Pages rebuilt and live: `/releases/` and `/releases/Release_v2.33.0/` both return 200 |
| skills.sh listing | Advisory, after a delay | [ ] **Deferred by the row's own condition**, which says after a delay |

### D. Decisions carried out of this cycle

| Decision or finding | Where it landed | Carried to |
|---|---|---|
| C-2 returned VOID (R3), not a pass or a fail | [`records/output-eval-weak-model-20260816.md`](./records/output-eval-weak-model-20260816.md). WS-7's exit criterion was "run and recorded", not "passed", so this satisfies it. Not a skill finding: every arm cleared `absolute_pass` with no criterion floored | Closed |
| **The C-2 design can be voided by construction** under the condition it tests, because the primary outcome was filtered by the freehand discrimination gate and a weak generator moves that gate | Recorded as a lesson for the *next* pre-registration: when the manipulated variable plausibly moves a validity gate, that gate cannot also filter the primary outcome. Deliberately **not** used to reinterpret this run | v2.34.0 if anyone re-runs it |
| The section A bump-count claim was verified against artifacts that cannot verify it | Corrected in section A with a re-derived count. A count claim needs a counting artifact, not a per-item consistency check | Checklist rule candidate |
| **`skills-manifest.yaml` is required by documentation and absent in practice.** [`docs/internal/skill-versioning.md`](../../skill-versioning.md) says "every release governance folder should include a `skills-manifest.yaml`" and lists it in its release checklist. Measured: **8 of 44 release folders have one, most recently v2.15.0**, so the requirement has gone unobserved for 29 folders including every release that shipped new skills since | Not resolved here. WS-7 deliberately did not create one: reviving a convention dead for 29 folders inside a build workstream is a governance decision wearing a build disguise, and no validator enforces its existence (`validate-skills-manifest.sh` only checks manifests that exist). Either restore it or retire it from `skill-versioning.md`; leaving a documented requirement that nothing observes is the worse third option. **Surfaced by consuming the WS-7 research synthesis**, which recommended creating one because it read the documented rule rather than the practice | v2.34.0; tracked since 2026-08-18 at [#279](https://github.com/product-on-purpose/pm-skills/issues/279) |
| **The checklist's own gating rule was circular on first use.** "May not be marked READY TO TAG while any GATE row is unchecked" made a G0 requirement depend on section C, which is G4 post-tag work by definition, and on section A's CHANGELOG row marked "to fill at G2". The tag was unreachable by construction | Corrected in the standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md) and in this copy: the rule now reads "any GATE row **due at or before G0**", every GATE row carries a due stage, and rows with no stage default to G0. Found by running G0 against this plan on 2026-08-19 | Closed. **This is WS-9's "checklist used for the first time and its gaps recorded" criterion producing its first result** |
| D6: the [#269](https://github.com/product-on-purpose/pm-skills/issues/269) placement conflict | Dissolved on G0 sub-check 6; no runbook edit needed | Closed |
| D7, D8-a, D8-b: WS-5 build shape | Ruled in this plan | Closed |
| Sample filename sort hazard (`-` before `.` displaces the canonical sample) | Documented in `THREAD_PROFILES.md` | Closed |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267), [#268](https://github.com/product-on-purpose/pm-skills/issues/268), [#269](https://github.com/product-on-purpose/pm-skills/issues/269) | Open issues | v2.34.0 |
| **The em-dash rule's enforcement has a hole, and the hole did the damage, not the rule.** Measured 2026-08-19 after the maintainer asked whether the rule costs enough to be worth removing. **Context cost is about 529 tokens per session** (roughly 331 in the global agent instructions, 198 in this repo's `CLAUDE.md`); **output cost is zero**, since `" - "` and an em-dash are a wash on tokens. So cost is not a reason to drop it. The real cost is elsewhere: **1,009 spaced-period scars across 68 sample files** (of 212 at the 2026-08-19 measurement). **The pattern is actively spreading, not merely historical:** [#281](https://github.com/product-on-purpose/pm-skills/pull/281), merged 2026-08-21, arrived with **9 fresh scars** because an external contributor reasonably matched the surrounding house style. That is the strongest argument for fixing the validator scope before the repair: while `library/` stays unwatched, every new sample inherits the defect from its neighbours, reading like "the prototype called the API . it was fastest to wire up". Those are not the rule's substitute. The rule specifies `" - "` (space hyphen space); some sweep replaced em-dashes with `"."` instead, so the scars are a **violation of the rule, not a consequence of it** | **Recommendation: keep the rule, fix the enforcement.** Three parts. (1) `scripts/check-emdash-scars.mjs` sets `ROOTS = ['CHANGELOG.md', 'README.md', 'CONTRIBUTING.md', 'site/src/content/docs', 'skills']`; **`library/` is absent**, so the one validator built to catch this pattern is structurally blind to the corpus that carries it, and reports clean while the published samples are full of it. Add `library`. (2) Repair the 1,009 scars driven by that validator's own detection logic, **not a blind `sed`** - `" . "` before a lowercase letter is a strong signal but not a certain one, and a human should read a sample of the diff before it runs wide. (3) Leave the rule text alone; it was correct and was enforced badly once. **The counter-argument, recorded because it is the maintainer's call and not a cost question:** the rule exists because em-dashes read as a tell of LLM-authored prose. If that signal no longer matters, the benefit is zero, even 529 tokens is waste, and it should come out of both the global agent instructions and the Codex mirror that copies them. That is a judgment about authorial voice | v2.34.0 |
| **G0 sub-check 5 governance audit residuals (3 x P3).** The zero-P0 bar passed and the P1 plus both P2s were fixed in this cycle at `c4ef3af7`. Three P3s were left | (a) `skills/utility-pm-critic/SKILL.md:67` describes the compatibility matrix as covering "all 4 sub-agents"; that page now documents 6. (b) **The auditor's own operating spec is stale**: `agents/pm-skill-auditor.md` and `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md` both instruct comparing declared counts against `AGENTS/claude/CONTEXT.md`, a file that exists nowhere in the tracked tree post-restructure. The audit was valid only because the dispatch brief named the current surfaces instead. (c) The pre-Astro `docs/...` link class is a known near-miss, already mitigated by the tested Pattern S alias in `scripts/check-root-doc-links.mjs`; no action, recorded so the next auditor does not re-raise it as P1 | v2.34.0 |
| C-12, C-13 (doc-stack leftovers, stale CI overview) | Candidates in this plan, not in scope | v2.34.0 |
| **Unsupported quantitative claims are a library-wide pattern, not a v2.33.0 defect** (G1 round 6, R6-F4 and R6-F5, deferred under D18) | Four instances now: `deliver-prd`'s sizing block (fixed at D15), `define-prioritization-framework`'s Kano fallback (fixed), **`measure-survey-analysis:144`, which has told agents since v2.18.0 (`c763bc3c`) that a leading question is "likely overstated by 20-40 percentage points based on instrument-bias research" with no source, population or derivation**, and `define-opportunity-tree`'s example treating 4 of 5 participants and a 20-person survey as pass/fail gates. The third is the sharpest: **the skill whose contract is refusing fabricated numbers ships one inside its own refusal text**, and has for five releases. The fourth is **not in this release's diff at all**. Deferred because this is a library audit rather than a release gate, and because a sweep authored under gate pressure is how D12 produced a 3.5x overstatement. Sequence the audit before any sweep | v2.34.0 |
| **The C3 design of record contradicts the contracts that shipped** (G1 round 6, R6-F6, deferred under D18) | [`v2.32.0/spec_c3-ai-product-family.md`](../v2.32.0/spec_c3-ai-product-family.md) lines 55-60 still label four increments MINOR and the Agent Execution Contract Optional, against D11's retype to three skill-MAJORs and R5-F2's correction of those sections to CONDITIONAL. It remains the standing design of record for the AI-product family, so **a future build pass following it re-seeds the exact contract error round 5 fixed**. Cheap to fix and deliberately not fixed here: it is a spec amendment with no effect on shipped artifacts, and this cycle has demonstrated six times that an extra edit under gate pressure carries its own defect risk | v2.34.0 |
| **`check-sample-no-fabricated-metrics.mjs` is blind to the files that most need it** (raised by G1 round 5, R5-F3) | The validator globs `library/skill-output-samples/**/sample_*.md` only, so every `skills/*/references/EXAMPLE.md` is outside its scope, and it runs `continue-on-error: true` in `validation.yml` so it cannot fail a build either way. `foundation-persona`'s EXAMPLE asserted five interviews, 312 tickets, four tenants and three recorded sessions with zero `[fictional]` markers, in the skill whose whole purpose is calibrating evidence claims, and four adversarial rounds walked past it. **This is structurally identical to the em-dash gap carried above**: the validator built for the defect cannot see the surface the defect lives on. Fix is two parts, scope and enforcement, and the scope half should land before any sweep so new EXAMPLEs stop inheriting the pattern. **Measured 2026-08-26, so the carry has a number rather than a description: nine `EXAMPLE.md` files assert research-style findings. Two were in this release's diff and are fixed (`foundation-persona` at round 5, `deliver-prd` at D21); the other seven are `define-hypothesis`, `define-jtbd-canvas`, `develop-design-rationale`, `develop-solution-brief`, `measure-experiment-design`, `tool-design-sprint-decide-and-storyboard` and `tool-design-sprint-sketch`, none of which is in `v2.32.0..HEAD`.** They are deliberately not swept here: a seven-file claim-adding pass under gate pressure is the failure mode this cycle demonstrated repeatedly, and the sweep should follow the widened validator rather than precede it | v2.34.0 |
| **No lint prevents a required conditional section from being labelled optional** (raised by G1 round 5, R5-F2, recommendation half not built) | Codex recommended both correcting the three labels and adding a check that prevents recurrence. The labels are corrected; the check is not built, and is recorded here rather than left silent so a later round does not re-raise it as new. The check would compare each template's section-level `OPTIONAL` / `CONDITIONAL` comment against whether `SKILL.md` names that section in its completeness contract. Worth building because the failure mode is invisible to every existing validator and it contradicted the stated rationale for three MAJOR bumps for four rounds | v2.34.0 |
| **Evaluation-set rate-claim methodology** (D15 = A, ruled 2026-08-25) | The `deliver-prd` sizing block will decline to license a rate claim rather than license one it cannot support. Deriving a defensible sizing method (preregistered acceptable failure rate, confidence, sampling frame, independence) is a scoped effort, not a patch, and under the standing control-arm rule it must be tested against a no-framework arm before it is built. Three attempts inside this cycle produced saturation stopping, an underived floor, and a 3.5x overstatement, which is the evidence that gate pressure is the wrong context for it | v2.34.0, gated on a control arm |
| **Prose that asserts a countable fact has no gate** (general case; D16 = B ruled 2026-08-25 takes only the per-thread slice now) | Five findings across rounds 2 and 3 are this one gap: `check-sample-counts.mjs` validates the headline against disk and stays green while the cohort decomposition, the itemized arithmetic and the published per-thread distribution contradict it. The same shape appears outside sample counts, in manifest header counts and HISTORY narrative claims. **The manifest header's wrong values were already stated correctly in this plan's own carry row two directories away**, so the general fix is reconciliation across surfaces, not better authoring | v2.34.0 |

| **The trace policy table's rows are not its claim set** (G1 round 12, R12-F1 remainder, deferred under D23 clause 2) | R12-F1 (the read-logging row conjoined two claims) was closed by removing the template's implicit promise that a row is atomic: the coverage rule now requires one entry per **claim** and names decomposition as the QA owner's job. The rows Codex identified as carrying the same defect are **not** split here: retention bundles expiry with deletion, sampling bundles capture rate with selection method, and terminal disposition bundles the disposition answer with an inherited sub-contract for any buffer. **Retention additionally drops the evaluation-set copy question that `SKILL.md` itself requires**, and that one is a content gap rather than a decomposition gap, so the new rule does not mitigate it. Deferred because closing them means **authoring** a new row decomposition, and this gate measured across twelve rounds that fixes which author methodology churn while fixes which remove a claim converge: D22's authored replacement produced R11-F1, whose authored replacement produced R12-F1. Codex's recommendation of a six-row atomization is recorded and declined on that evidence | v2.34.0, sequenced with the library audit |
| **The opt-out row asks about users, but the captured text often belongs to someone else** (G1 round 12, corroborating panel) | `measure-instrumentation-spec`'s opt-out row asks only whether users can decline capture, while the section's own trigger rationale says the captured text frequently belongs to a third party who is not the user of the feature. Pre-existing, untouched by this cycle, and a genuine question about the template's subject model rather than damage introduced here | v2.34.0 |
| **`SKILL.md` did not follow the template through the access split** (G1 round 12, corroborating panel; same drift class as R10-F5) | Three surfaces in `skills/measure-instrumentation-spec/SKILL.md` still describe the pre-split world: its decide-and-record list fuses access and read logging into one bullet, its conditional quality checklist enumerates six concern groups against a table that now carries twelve rows, and nothing in it names the grant-removal requirement the split added. Outside the three surfaces D23 scoped round 12 to, so deferred rather than swept. **This is the same shape as R10-F5**, where `HISTORY.md` still specified choreography the template had deleted: when the template moves, the documents that enumerate it go stale silently, and no validator sees it | v2.34.0 |
| **The `[fictional]` convention is written number-scoped, which is why the marking class recurred four times** (G1 round 12, corroborating panel; root cause of R9, R10-F3, R11-F2 and R12-F5) | [`library/skill-output-samples/README_SAMPLES.md`](../../../library/skill-output-samples/README_SAMPLES.md) defines the convention entirely in terms of numbers: "every invented metric", "every invented number", "any specific number that cannot be verified". **The methodology-prose marking rule that four consecutive G1 rounds enforced is written down nowhere**, so each sweep re-derived its own scope and each one drew the boundary differently. `check-sample-no-fabricated-metrics.mjs` is percentage-scoped for the same reason, which is why it held at exactly 338 across a fix pass that added seven markers and could never have caught `eight months`. **This is the most valuable finding of round 12** and the one most likely to prevent a recurrence: it explains a four-round pattern as a missing standard rather than four independent sweep failures. Fix is three parts, in order: write the convention to cover asserted methodology and not only numbers, widen the validator to match, then sweep. Codex's "add a non-numeric methodology-provenance check" is the second part | v2.34.0, and it should lead the library audit rather than follow it |
| **Sibling interview-synthesis samples carry the same unmarked invented methodology** (G1 round 12, R12-F2 items 6 and 7) | Codex named the Workbench sample (consent, transcription and affinity-mapping claims) and the Storevine Campaigns sample (recruitment, consent and quote-editing claims); the corroborating panel found the pattern more broadly. Outside the in-scope surface, and part of the library-wide audit carried since round 6 rather than a release gate. **Sequence it after the convention above is written**, or the sweep re-derives its own scope for a fifth time | v2.34.0, gated on the convention |

| **The canonical runbook's G2 manifest list is incomplete: it names two manifests and the repo has three** (found at G2, 2026-08-29) | [`site/src/content/docs/contributing/release-runbook.md`](../../../site/src/content/docs/contributing/release-runbook.md) G2 sub-checks 1 and 2 name `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` "(or equivalent)". **`.codex-plugin/plugin.json` also carries a version field and is not named.** Following the runbook literally bumped two of three and left the Codex manifest at 2.32.0. **Caught by `validate-version-consistency`, so the gate held and nothing shipped wrong**, which is the system working: the validator is the backstop for an incomplete procedure. But a runbook a maintainer follows by hand should not depend on a validator to be complete. Fix is one line in the runbook naming the third manifest, or better, a sentence saying "every manifest reporting a version", since `validate-version-consistency` already enumerates them and a list in prose will drift again | v2.34.0, folded into [#269](https://github.com/product-on-purpose/pm-skills/issues/269) runbook reconciliation |

### E. Documentation consistency sweep

- [ ] Version-bearing surfaces agree at G2.
- [ ] No `[Unreleased]` section orphaned below the new release heading.
- [x] **New** conventions enforced by CI are written where humans read them. **Audited and closed with current-cycle evidence at G2, 2026-08-29, and the audit found a real gap.** This cycle's enforcing changes in `v2.32.0..HEAD` are exactly three files: `.github/workflows/codeql.yml` (a Dependabot version bump, no convention), `scripts/data/quickstart-fragment.md` (generator input, no convention), and **`scripts/check-sample-counts.mjs`, which added a genuine new contributor-facing rule**. It now derives the per-thread sample distribution from each sample's `thread:` frontmatter field and gates the site samples landing page on it, so a sample with a missing or unrecognized `thread:` counts as outside the trio, silently moves the remainder, and fails CI. **That rule was written nowhere a sample author reads.** `SAMPLE_CREATION.md` documented the field as required and described the count reconciliation as covering only the headline total and sampled-skill count, which was true before this cycle and stale after it; `CONTRIBUTING.md` and `README_SAMPLES.md` said nothing. Fixed in `library/skill-output-samples/SAMPLE_CREATION.md` with the rule, the consequence of omitting the field, and the reason the check exists. **This row was checked on v2.32.0 evidence until R12-F3 reset it, and the reset is what surfaced the gap**, which is the clearest payoff in this cycle for treating a pre-satisfied control as a defect. Previously: **Reset to unchecked 2026-08-28 (R12-F3).** It had been checked citing "CONTRIBUTING gained the roster rule and the memory contract **in v2.32.0**", which is prior-cycle evidence for a per-release control: the identical shape as R11-F3 one section below the row that finding reset. The plan copy had also dropped the word **New** that the standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md) opens the row with, and that word is what scopes it to the cycle in hand. Restored. Due G2, and it is v2.33.0's own enforcing changes that must be audited, the expanded sample-count enforcement included.
- [ ] Docs this release made stale are updated.

### F. Shadow-automation observation

- [ ] Copy the S2 criteria table from [#136](https://github.com/product-on-purpose/pm-skills/issues/136) and fill it during the cut, not afterward.

**Observed 2026-08-16, before the cut, and it is a version divergence.** The shadow Release PR [#271](https://github.com/product-on-purpose/pm-skills/pull/271) proposes **2.32.1**, a PATCH. This release is planned as a MINOR.

The shadow is not wrong; it is reading what it was given. Of the commits on `main` since the `v2.32.0` tag, 15 are `docs`, 2 are `fix`, 1 is `chore`, and **none is `feat`**. Yet this cycle bumped `define-prioritization-framework` from 1.2.0 to 1.3.0, a skill MINOR, in a commit typed `feat(define-prioritization-framework)`. That commit was squash-merged under PR [#270](https://github.com/product-on-purpose/pm-skills/pull/270)'s title, `fix(skills): two field-reported defects ...`, and **the squash title is what release-please reads**. The `feat` never reached `main` as a type.

Three things follow, all of which belong in front of the maintainer rather than in a footnote:

1. **This is the D8 evidence, arriving on its own.** Decision C-3 (the PR-title lint promotion) was relocated to this cycle to be decided calmly with a real sample. The sample is now concrete: a squash title mistyped relative to its contents produces a wrong version proposal, and no gate catches it because the lint checks conventional *form*, not whether the type matches the change.
2. **Skill SemVer and repo SemVer are separate lines** (`docs/internal/skill-versioning.md` distinguishes a skill's contract from "a tagged collection of changes"), so a skill minor does not automatically force a repo minor. The divergence here is nonetheless real, because the release is *intended* as a MINOR and the shadow cannot know that.
3. **At the cut, expect the shadow to propose 2.32.1 and record it as a criterion-1 miss** rather than a surprise. If the authoritative cutover had already happened, merging that PR would have shipped the wrong version.

### CONFIRMED 2026-08-16: the prediction held, and D8's diagnosis is proven rather than inferred

WS-7 merged as [#276](https://github.com/product-on-purpose/pm-skills/pull/276) at `b17f554b` under the squash title `feat(skills): four AI-family increments ...`. **Shadow PR [#271](https://github.com/product-on-purpose/pm-skills/pull/271) flipped from `chore(main): release 2.32.1` to `chore(main): release 2.33.0` within about forty seconds**, on the release-please run at 05:36:01Z.

Nothing changed except the type on one squash title. That is the mechanism isolated:

- **The squash title is the whole input.** The `feat` in `feat(define-prioritization-framework)` never reached `main` because PR [#270](https://github.com/product-on-purpose/pm-skills/pull/270) squashed under a `fix:` title. The identical situation resolved correctly the moment a squash title carried the right type.
- **`lint-pr-title` passed on [#276](https://github.com/product-on-purpose/pm-skills/pull/276), and that tells us nothing.** It checks conventional *form*. `#276`'s title was both correct form and correct type, and `#270`'s was correct form with the wrong type. The check cannot distinguish them, which is precisely the gap C-3 proposes to close.
- **The failure was silent and the correction was silent.** No gate fired in either direction. The only reason the original miss was caught is that a human read the shadow PR title during a hygiene sweep.

This is the live sample D5-A relocated C-3 into this cycle to obtain. It is now collected, and the prediction was recorded at `89eccac6` **before** it could be checked, with an explicit failure condition stated ("if it does not flip, D8's diagnosis is wrong and C-3 should be re-argued"). That condition did not fire.

**Prediction recorded 2026-08-16, before it can be checked.** The observation above was made when **no `feat` commit had reached `main`**. WS-7 changes that: its branch carries two, and its PR is titled `feat(skills):` deliberately, precisely so the squash title release-please reads matches the change. **So the shadow should flip from 2.32.1 to 2.33.0 within minutes of that merge.** Written down in advance for two reasons. First, so the next reader does not treat the flip as a surprise or keep waiting for a 2.32.1 that no longer arrives. Second, because it is the first observable test of the D8 hypothesis: if the shadow flips on a correctly-typed squash title, that confirms the squash title is the whole mechanism and a title lint that checks type-against-change would have caught the original miss. **If it does not flip, D8's diagnosis is wrong** and C-3 should be re-argued before any lint is promoted.

## Not carried in

- The AI-product family keystones (`measure-ai-eval-spec`, `deliver-ai-behavior-spec`) stay staged for v2.34.0, and each must pass the control-arm gate in the [C-3 spec](../v2.32.0/spec_c3-ai-product-family.md) section 7 before any build begins.
- The ten speculative bets at `../_unreleased/fable-innovations/` remain unscheduled.
- Traction and marketing work is maintainer-local and does not appear in release plans.
