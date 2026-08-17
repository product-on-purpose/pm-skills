# v2.33.0 Release Plan: DECISION STAGE (scope proposed 2026-08-15, not yet ruled)

**Status:** **SCOPE COMMITTED 2026-08-16.** D1 through D5 all RULED (see the decisions table). Execution workstreams WS-1 through WS-9 below; build starting. History: STUB seeded 2026-08-13 during the v2.32.0 WS-8 prep; candidates accumulated through the v2.32.0 cut and its post-release audits; researched into a decision stage 2026-08-15; ruled 2026-08-16 with **D3 changed from its drafted recommendation by evidence** (see below).
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
| C-8 | Memory artifact ledger disposition | [#223](https://github.com/product-on-purpose/pm-skills/issues/223) | Ready to rule; [#268](https://github.com/product-on-purpose/pm-skills/issues/268) is half-resolved | Decision only | human |
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
| WS-5 | Worked memory example | WS-4 | claude | A sample on one of the three canonical threads demonstrating the synthesize-to-PRD handoff end to end |
| WS-6 | **DONE 2026-08-16.** Standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md), copied into this plan as a filled section above. **The gating question dissolved rather than being decided** (D6): the canonical runbook's G0 sub-check 6 already requires the plan marked READY TO TAG and blocks on any sub-check failure, so a checklist inside the plan gates the tag with zero runbook edits, satisfying both [#269](https://github.com/product-on-purpose/pm-skills/issues/269)'s "not in the runbook" and this row's "gates the tag". Carries the claim-verification rule with the two real v2.32.0 precedents, the external and cross-repo surfaces including the agent-plugins re-pin that no workstream row had ever carried, a measurement warning drawn from four wrong-on-first-pass counts, and five meta-rules including a three-cycle removal candidacy so it cannot silently become ceremony | - | claude | **MET.** Its first live instance was found before it existed: the release-plans index was stale two days after the v2.32.0 tag, fixed at `1cf6c6e4`, and is now a checklist row |
| WS-7 | **DONE 2026-08-16.** Four increments across three skills, all additive minors, plus the C-2 re-test run and recorded. `deliver-prd` 2.3.0 gains two conditional sections (`AI Behavior and Evaluation`, pairing each behavior requirement with the evidence it holds and giving refusal and abstention their own `AB-n` rows; `Agent Execution Contract`, declaring authoritative sources, do-not-touch, an `FR-n` verification map and stop-and-escalate). `measure-instrumentation-spec` 2.3.0 gains a conditional `Model Trace Capture` subsection under the existing privacy heading. `develop-adr` 2.2.0 gains a conditional `Model Choice` subsection inside Consequences. **Every one is conditional and structure-bearing**, which is not decoration: unconditional sections would have redefined "complete" for existing artifacts, invalidated thread samples, and made these skill-majors under the versioning tie-breaker. **C-2 returned VOID (R3)** against a rule pre-registered and committed at `f4d50837` before the run; record at [`records/output-eval-weak-model-20260816.md`](./records/output-eval-weak-model-20260816.md). **`develop-adr` was deliberately held** until that record existed, because it is one of C-2's four eval pairs. `skill-manifest.json` regenerated, the CI-red omission the build spec carried | D1 | claude | **MET.** Four increments shipped as additive minors; re-test run and recorded |
| WS-8 | Decisions block, per D5 | D5 | human | C-3 and C-8 ruled and recorded |
| WS-9 | Release cut via the 6-gate runbook | WS-1..8 | claude runs, human gates | v2.33.0 tagged; the WS-6 checklist used for the first time and its gaps recorded |

## Release hygiene checklist

Copied from the standing source at [`../checklist_doc-update-and-hygiene.md`](../checklist_doc-update-and-hygiene.md) and filled as this cycle runs. **This plan may not be marked READY TO TAG while any GATE row is unchecked**, which is how it gates via the canonical runbook's G0 sub-check 6 without any runbook edit.

### A. Quantitative claim verification (GATE)

For every quantitative claim in release copy, name the artifact that would fail if it were false.

| Claim | Artifact that goes red if false | Verified |
|---|---|---|
| "212 samples across 63 skills" | `scripts/check-sample-counts.mjs`, enforcing in CI | [x] Green at 212/63 |
| ~~Six~~ **Eight skill version bumps this cycle** (nine bump *events*) | **Neither named artifact can verify this claim.** `scripts/validate-skill-history.sh` and `gen-skill-manifest.mjs --check` are both enforcing, but they verify *per-skill* consistency between a `SKILL.md` version and its HISTORY row. Neither computes a total, so both stay green at any count | [x] **Re-derived 2026-08-16** from `git diff v2.32.0..HEAD -- 'skills/*/SKILL.md'`: eight skills bumped (`define-prioritization-framework`, `deliver-prd`, `develop-adr`, `discover-journey-map`, `foundation-build-risk-review`, `foundation-persona`, `measure-instrumentation-spec`, `measure-survey-analysis`). "Six" was wrong before WS-7 touched anything: five skills had bumped, across six bump events, because `define-prioritization-framework` was bumped once and credited to both WS-2 and WS-3 |
| "the PRD prompt is 11 lines against 32" (WS-5 sample copy) | Nothing. Prose in a sample, not gated. **Counted by hand against both files** and the first count was off by one before `sed` corrected it | [x] Verified manually |
| Remaining CHANGELOG figures | To fill at G2 | [ ] |

### B. Gate-owned checks (pointer only)

- [ ] G0 through G4 per `site/src/content/docs/contributing/release-runbook.md`. Not restated here.

### C. External and cross-repo surfaces (GATE)

| Surface | Condition | Done |
|---|---|---|
| GitHub About description | Every release; compare against `gen-derived-surfaces --about` before editing | [ ] |
| GitHub Release body | Every release; the workflow ships a generic template | [ ] |
| `agent-plugins` re-pin | Every release. Complete that repo's Section 7 checklist in the PR body | [ ] |
| `docs/internal/release-plans/README.md` | Every release | [x] Updated 2026-08-16 (`1cf6c6e4`), after being found stale two days post-v2.32.0 |
| `pm-skills-mcp` surfaces | Only if the release changes the catalog narrative or skill counts | [ ] Catalog holds at 68; narrative half to answer at G4 |
| Topics, Pages, Open Graph | Every release | [ ] |
| skills.sh listing | Advisory, after a delay | [ ] |

### D. Decisions carried out of this cycle

| Decision or finding | Where it landed | Carried to |
|---|---|---|
| C-2 returned VOID (R3), not a pass or a fail | [`records/output-eval-weak-model-20260816.md`](./records/output-eval-weak-model-20260816.md). WS-7's exit criterion was "run and recorded", not "passed", so this satisfies it. Not a skill finding: every arm cleared `absolute_pass` with no criterion floored | Closed |
| **The C-2 design can be voided by construction** under the condition it tests, because the primary outcome was filtered by the freehand discrimination gate and a weak generator moves that gate | Recorded as a lesson for the *next* pre-registration: when the manipulated variable plausibly moves a validity gate, that gate cannot also filter the primary outcome. Deliberately **not** used to reinterpret this run | v2.34.0 if anyone re-runs it |
| The section A bump-count claim was verified against artifacts that cannot verify it | Corrected in section A with a re-derived count. A count claim needs a counting artifact, not a per-item consistency check | Checklist rule candidate |
| **`skills-manifest.yaml` is required by documentation and absent in practice.** [`docs/internal/skill-versioning.md`](../../skill-versioning.md) says "every release governance folder should include a `skills-manifest.yaml`" and lists it in its release checklist. Measured: **8 of 44 release folders have one, most recently v2.15.0**, so the requirement has gone unobserved for 29 folders including every release that shipped new skills since | Not resolved here. WS-7 deliberately did not create one: reviving a convention dead for 29 folders inside a build workstream is a governance decision wearing a build disguise, and no validator enforces its existence (`validate-skills-manifest.sh` only checks manifests that exist). Either restore it or retire it from `skill-versioning.md`; leaving a documented requirement that nothing observes is the worse third option. **Surfaced by consuming the WS-7 research synthesis**, which recommended creating one because it read the documented rule rather than the practice | v2.34.0 |
| D6: the [#269](https://github.com/product-on-purpose/pm-skills/issues/269) placement conflict | Dissolved on G0 sub-check 6; no runbook edit needed | Closed |
| D7, D8-a, D8-b: WS-5 build shape | Ruled in this plan | Closed |
| Sample filename sort hazard (`-` before `.` displaces the canonical sample) | Documented in `THREAD_PROFILES.md` | Closed |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267), [#268](https://github.com/product-on-purpose/pm-skills/issues/268), [#269](https://github.com/product-on-purpose/pm-skills/issues/269) | Open issues | v2.34.0 |
| C-12, C-13 (doc-stack leftovers, stale CI overview) | Candidates in this plan, not in scope | v2.34.0 |

### E. Documentation consistency sweep

- [ ] Version-bearing surfaces agree at G2.
- [ ] No `[Unreleased]` section orphaned below the new release heading.
- [x] Conventions enforced by CI are written where humans read them (CONTRIBUTING gained the roster rule and the memory contract in v2.32.0).
- [ ] Docs this release made stale are updated.

### F. Shadow-automation observation

- [ ] Copy the S2 criteria table from [#136](https://github.com/product-on-purpose/pm-skills/issues/136) and fill it during the cut, not afterward.

**Observed 2026-08-16, before the cut, and it is a version divergence.** The shadow Release PR [#271](https://github.com/product-on-purpose/pm-skills/pull/271) proposes **2.32.1**, a PATCH. This release is planned as a MINOR.

The shadow is not wrong; it is reading what it was given. Of the commits on `main` since the `v2.32.0` tag, 15 are `docs`, 2 are `fix`, 1 is `chore`, and **none is `feat`**. Yet this cycle bumped `define-prioritization-framework` from 1.2.0 to 1.3.0, a skill MINOR, in a commit typed `feat(define-prioritization-framework)`. That commit was squash-merged under PR [#270](https://github.com/product-on-purpose/pm-skills/pull/270)'s title, `fix(skills): two field-reported defects ...`, and **the squash title is what release-please reads**. The `feat` never reached `main` as a type.

Three things follow, all of which belong in front of the maintainer rather than in a footnote:

1. **This is the D8 evidence, arriving on its own.** Decision C-3 (the PR-title lint promotion) was relocated to this cycle to be decided calmly with a real sample. The sample is now concrete: a squash title mistyped relative to its contents produces a wrong version proposal, and no gate catches it because the lint checks conventional *form*, not whether the type matches the change.
2. **Skill SemVer and repo SemVer are separate lines** (`docs/internal/skill-versioning.md` distinguishes a skill's contract from "a tagged collection of changes"), so a skill minor does not automatically force a repo minor. The divergence here is nonetheless real, because the release is *intended* as a MINOR and the shadow cannot know that.
3. **At the cut, expect the shadow to propose 2.32.1 and record it as a criterion-1 miss** rather than a surprise. If the authoritative cutover had already happened, merging that PR would have shipped the wrong version.

**Prediction recorded 2026-08-16, before it can be checked.** The observation above was made when **no `feat` commit had reached `main`**. WS-7 changes that: its branch carries two, and its PR is titled `feat(skills):` deliberately, precisely so the squash title release-please reads matches the change. **So the shadow should flip from 2.32.1 to 2.33.0 within minutes of that merge.** Written down in advance for two reasons. First, so the next reader does not treat the flip as a surprise or keep waiting for a 2.32.1 that no longer arrives. Second, because it is the first observable test of the D8 hypothesis: if the shadow flips on a correctly-typed squash title, that confirms the squash title is the whole mechanism and a title lint that checks type-against-change would have caught the original miss. **If it does not flip, D8's diagnosis is wrong** and C-3 should be re-argued before any lint is promoted.

## Not carried in

- The AI-product family keystones (`measure-ai-eval-spec`, `deliver-ai-behavior-spec`) stay staged for v2.34.0, and each must pass the control-arm gate in the [C-3 spec](../v2.32.0/spec_c3-ai-product-family.md) section 7 before any build begins.
- The ten speculative bets at `../_unreleased/fable-innovations/` remain unscheduled.
- Traction and marketing work is maintainer-local and does not appear in release plans.
