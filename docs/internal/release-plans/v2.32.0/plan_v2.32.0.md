# v2.32.0 Release Plan: The full-slate cycle (scope COMMITTED 2026-08-02)

**Status:** COMMITTED SCOPE (decisions D1-D8 (the scope-ruling set) all RULED by the maintainer 2026-08-02; execution workstreams WS-1..WS-8 below; build starting. History: STUB 2026-07-31 at v2.31.1 G4; DECISION STAGE same day after the 7-agent research/audit workflow, the hygiene sweep (PR #249), and a 4-lens critique panel whose 23 findings are incorporated.)
**Owner:** Maintainers
**Type:** MINOR (project memory B1+B2 is additive runtime surface; fixture and spec work is additive; no breaking change).
**Theme:** The full-slate cycle: project memory lands (F-48), the trigger-eval roster completes at 53/53 by design, the AI-product family gets its tracked Phase-0 spec, and S2 enablement readies the release-automation cutover.
**Created:** 2026-07-31 (STUB at v2.31.1 G4; decision stage the same day; scope ruled 2026-08-02).
**Target:** PROPOSED 2026-08-30 (four weeks from ruling). Observed cadence is variable, not monthly: v2.29.1 to v2.30.0 was 11 days, v2.31.0 to v2.31.1 was 25 days, May 2026 carried about 10 tags. The target exists so the trip-wires have something to fire against.
**Previous:** v2.31.1 SHIPPED 2026-07-31 (maintenance patch; tag `v2.31.1` at `32e28377`; plan at `../v2.31.1/plan_v2.31.1.md`).

---

## Where we are

v2.31.1 closed the merge-pipeline trap and drained the security queue. The 2026-07-31 research pass (workflow `v2320-research-audit`: four issue readers + three auditors) produced per-candidate findings; the hygiene sweep (PR #249, workflow `v2320-hygiene-resolve`) resolved the mechanical carried follow-ups; and a 4-lens critique panel (facts, governance, decision quality, house style) reviewed this plan's first draft, flipping one recommendation (D8) and adding two options (D2-B build shape, D6-C roster ruling) the draft had missed. What remains is a scope ruling across five candidates. Four of the five have promotion triggers with unmet legs; the trigger table below makes each leg explicit so rulings are MET / WAIVED / HONORED rather than implicit.

## Candidates

Agent labels follow the assignment framework (claude / codex / human) used by the v2.31.0 workstream table.

| # | Candidate | Tracking | Research disposition | Effort | Agent |
|---|---|---|---|---|---|
| C-1 | Memory artifact ledger (F-48 / WS-Z7) | [#223](https://github.com/product-on-purpose/pm-skills/issues/223) | Ratify parked decisions + delta spec first; build shape is D2 | M (B1 only) / L (B1+B2) | claude, decisions human |
| C-2 | Typed handoff envelope (R-23 / WS-Z8) | [#224](https://github.com/product-on-purpose/pm-skills/issues/224) | Defer; optionally make the trigger reachable by filing X-2's tracking issue | S (defer + file) | claude |
| C-3 | Coverage offense: AI-product family (R-24 / WS-Z9) | [#225](https://github.com/product-on-purpose/pm-skills/issues/225) | Phase-0 only: trigger ruling + tracked scope spec; the 5-skill family build is its own later effort | S (Phase-0) / L (build) | claude spec, human scope |
| C-4 | Eval completion tail (R-21 / WS-Z10) | [#226](https://github.com/product-on-purpose/pm-skills/issues/226) | Wave-2 on the trigger-fixture axis; roster composition is D6 | M (10 sets) / M-L (25 sets) | claude |
| C-5 | S2 enablement (M-21 / issue #136) | [#136](https://github.com/product-on-purpose/pm-skills/issues/136) | Promoted from the S2 audit; items (b) and (c) are low-risk repairs, item (a) is the real mechanism decision | M | claude |

### Promotion-trigger status (per the v2.31.0 trigger table)

| Candidate | Trigger leg | State | Proposed handling |
|---|---|---|---|
| C-1 | Orchestrator artifact-ledger interface agreed | UNMET | Satisfied by the D2 delta spec before build; otherwise WAIVED-with-reason |
| C-2 | X-2 (artifact schemas) ratified with one shipped schema family | UNMET | HONORED (defer); D4-B makes it reachable later |
| C-3 | Eval-complete-from-day-one gate live (rides the WS-Z5 contract) | PARTLY MET (see resolved fact in C-3 section) | Rule after D6; D5-A names the satisfying condition |
| C-4 | Wave-1 green (met) + output-eval lane stable for two releases | SECOND LEG UNCONFIRMED | Argue the output-eval leg does not gate a trigger-fixture-only wave; amend the WS-Z10 trigger note accordingly |
| C-5 | (New candidate; no staged trigger. Blocks on nothing.) | N/A | D7 rules inclusion |

### C-1 Memory artifact ledger (F-48)

Parked plan + spec exist and are current: `../_unreleased/project-memory/plan_project-memory.md` (B1 keystone `.claude/pm-skills.local.md` state file read by the shipped F-44 router; B2 memory-aware cohort, LOCKED 2026-08-07 at 8 skills by the WS-1 D3 = C ruling; B1 and B2 are sized M each, separately) and `spec_project-memory.md` (schema:1 YAML, 4-tag provenance model, agent-does-the-IO contract). Issue #223 ADDS ledger semantics the parked schema does not model: orchestrator execution state, artifact hashes, provenance chains across invocations. X-03 (artifact provenance and the upgrade loop; parked at `../_unreleased/fable-innovations/X-03-artifact-provenance-upgrade.md`) does not depend on B1 - its REQ-6 makes memory an enhancement, never a prerequisite; only its deferred Phase 6 waits on WS-Z7, so C-1 slipping does not block X-03.

Pre-build gates: **ALL CLOSED by WS-1 on 2026-08-07.** Parked D1 (structure-over-prose) RATIFIED as drafted, with the weak-model re-test scheduled before the next content cycle; parked D2 (write posture) was split out as decision D3 below because it is a trust-posture call, not a formality, and RULED C on 2026-08-02 (propose-then-confirm by default, opt-in auto mode); parked D3 (cohort membership) RULED C at 8 skills; F-54 (memory-aware cohort, provisional effort ID) CONFIRMED FREE against the live issue list, with the untracked maintainer-local backlog the one remaining ID authority. Risks: this train has slipped twice (v2.28.0 to v2.29.0 to parked; the v2.31.0 audit's P1-10 named the pattern); building to issue text without a delta spec invents ledger mechanics mid-implementation; opt-in posture (inert unless the file exists) must be preserved; schema coordination with C-2 if both ever ship in one cycle; and a same-cycle coupling with C-5, named under D1.

### C-2 Typed handoff envelope (R-23)

The orchestrator's `--thread` flag hands step N+1 only a raw artifact reference; R-23 proposes an optional per-skill `## Handoff` YAML block. The v2.31.0 plan staged this behind the X-2 (artifact schemas) promotion trigger, with a tracking issue as the only sanctioned pre-trigger action (filed as #224 on 2026-07-06). X-2 is PARKED pre-decision (`../_unreleased/fable-innovations/X-02-artifact-schemas.md`), has no tracking issue, no effort brief, and no schema file exists in the repo. Pulling R-23 forward means shipping X-2 first (XL combined). Authoring the Handoff shape "spec-only" ahead of X-2 would invert the dependency the staging exists to protect.

### C-3 AI-product family (R-24)

Five candidate skills per the comparison roadmap (ai-feature PRD addendum, model-eval spec, prompt spec, ai-risk-and-safety review, ai-ux patterns), to ship eval-complete-from-day-one. The scope source is maintainer-local and gitignored (`_LOCAL/pm-skill-comparison/roadmap/02-roadmap.md`, not linkable for external readers), so Phase-0 includes promoting it into a tracked spec (names, classifications, rubric plan). No AI-product eval-rubric family exists yet. This would also be the first catalog growth since the 68-freeze the generator program was hardened against, so growth handling gets its first real test.

Resolved fact (was an open question in the first draft): the eval-complete gate is NOT a merge gate today. `trigger-evals.yml` is dispatch-only, advisory and cost-gated, with the collision probe key-gated and dry-run defaulting true; what IS enforcing in CI is the fixture-structure check over rostered skills. Making eval-complete real for C-3 therefore requires either roster-adding each new skill at merge (cheap, mechanical) or promoting the collision probe out of dispatch-only (a key-budget decision). D5 asks for this choice explicitly.

### C-4 Eval completion tail (R-21)

Trigger fixtures: 43/68. The 25 uncovered skills are the 15 `tool-*` sprint-family steps plus 10 `utility-*` skills, both excluded from wave-1 by design (it targeted collision-risk clusters). Output-eval scenarios: 12/68, needing new family rubrics; the "output-eval lane stable for two releases" trigger leg has no confirming record, and this plan proposes ruling that leg inapplicable to a fixtures-only wave rather than waiving it silently. Sizing honesty: wave-1's 12 sets were ONE line item inside a release that also shipped six other workstreams; 25 sets is roughly double that measured unit. The 15 `tool-*` steps are sequential stages inside two registered sprint families normally entered through a family or workflow entry point, not free-text triggering, which is why D6 offers ruling them out of the roster by design rather than treating them as debt. New collision-pair and reciprocal When-NOT-to-Use obligations apply to whatever ships (the v2.31.0 12-edge cascade lesson).

### C-5 S2 enablement (M-21)

From the consolidated S2 audit ([#136 comment, 2026-07-31](https://github.com/product-on-purpose/pm-skills/issues/136#issuecomment-5149783578)): checklist items 3 and 5 DONE, item 1 DEMONSTRATED (v2.31.1 version+date match), items 2/4/6/7 OPEN. Three items of different kinds:

- (a) **Regen-on-release-PR mechanism** (run `gen-derived-surfaces.mjs` and commit mirrors on the release-please branch; closes checklist items 4 and 6). A new mechanism on the release branch - the only genuinely optional piece.
- (b) **Marketplace updater fix** (advance `$.plugins[0].source.ref`, stop the JSON reformat corruption; closes item 2; a plain jsonpath extra-files entry cannot write the `v`-prefixed ref). This repairs an observed defect and should ship regardless of scope.
- (c) **Phantom-minor fallback note** in the runbook (manifest ahead of tag proposes a spurious MINOR; observed on #237). A documentation repair; ships regardless.

Item 7 (ratification) stays maintainer-only and follows one release where every criterion holds simultaneously.

## Scope decisions (all OPEN for maintainer ruling)

Option letters are per-decision labels, not rankings; recommendations state the strongest argument against themselves.

| # | Decision | Options | Recommendation | Status |
|---|---|---|---|---|
| D1 | v2.32.0 composite scope | A) S2-evidence cut: C-5 (all items) + C-4 wave-2 (per D6) + C-3 Phase-0 + C-1 ratifications-and-delta-spec only (no build). B) Memory-forward: C-1 B1-only build + C-5 items (b)(c) + C-3 Phase-0; C-4 deferred or truncated. C) Composite-max: C-1 (B1+B2) + C-4 + C-5 + C-3 Phase-0. | A | **RULED C 2026-08-02** (maintainer chose the full slate over the recommendation, with the feasibility case heard; the trip-wires below are the safety net) |
| D2 | C-1 build shape (this cycle vs next) | A) Ratify parked D1/D3 + author the 1-2 page ledger delta spec this cycle; build B1 in v2.33.0 once S2 behavior is characterized (pairs with D1-A). B) Same ratifications + build B1 keystone only this cycle, B2 cohort in v2.33.0 (pairs with D1-B; converts C-1 from L to M). | A | **RULED by D1-C 2026-08-02**: ratifications + delta spec, then the FULL B1+B2 build this cycle (beyond both drafted options, which were shaped around D1-A/B) |
| D3 | C-1 write posture (parked D2, split out as a trust decision) | A) Propose-then-confirm writes (default-safe). B) Auto-append with echo. C) Propose-then-confirm with an opt-in auto mode. | A or C; not B as the default | **RULED C 2026-08-02**: propose-then-confirm by default, opt-in auto mode via `.claude/pm-skills.local.md` (the hook opt-in shape) |
| D4 | C-2 disposition | A) Defer whole; update #224's target note. B) Defer AND file X-2's tracking issue + effort brief this cycle (no build), making the trigger reachable without an XL commitment. | B | **RULED B 2026-08-02** (applied as the entailed default; WS-7) |
| D5 | C-3 Phase-0 shape | A) Rule the promotion trigger against the post-D6 state (if D6 puts every rostered skill under the enforcing fixture-structure check, name roster-add-at-merge as the eval-complete mechanism), and promote the gitignored scope into a tracked spec. B) Defer C-3 entirely. | A, ruled AFTER D6 | **RULED A 2026-08-02**: with D6-C ruled, the eval-complete mechanism is roster-add-at-merge over the 53-skill triggerable roster |
| D6 | C-4 roster composition and wave-2 scope | A) All 25 remaining sets, milestone 68/68. B) The 10 `utility-*` sets only, milestone 53/68, `tool-*` stays debt. C) Rule the 15 `tool-*` sprint steps OUT of the trigger roster by design (documented exclusion in `trigger-eval-roster.yaml`), wave-2 = the 10 `utility-*` sets, milestone 53/53 triggerable. | C | **RULED C 2026-08-02**: sprint steps are workflow-entered by design; exclusion recorded in the roster with rationale |
| D7 | C-5 item (a) inclusion (items (b) and (c) ship regardless as repairs) | A) Item (a) in scope: v2.32.0 targets an S2-ready state so the NEXT release can be the all-criteria-simultaneous cut. B) Item (a) deferred to v2.33.0. | A | **RULED A 2026-08-02** (entailed by D1-C; C-5 ships whole) |
| D8 | PR-title lint promotion (advisory to enforcing) | A) Promote in v2.32.0: wire as a required check with NO paths filter (the v2.31.1 lesson), confirm it reports on every PR including release-please's own `chore(main):` PRs, with a one-line rollback (revert to continue-on-error). B) Hold advisory for one more cycle and collect a human-authored title sample. | B | **RULED B 2026-08-02**: hold; this full-slate cycle generates the human-authored title sample the promotion evidence lacks; revisit at the v2.32.0 cut |

**Decision rationales, including the case against each recommendation:**

- **D1-A** treats v2.32.0 as the cut that produces S2 evidence with low skill-surface churn, then lands memory next cycle. The case against: the memory train slips a THIRD time, exactly the P1-10 pattern the v2.31.0 audit flagged; if the maintainer weighs that pattern heavier than S2 momentum, D1-B is the defensible counter. The C-1/C-5 coupling argues for A: B2-style skill churn (8 MINOR bumps + HISTORY + derived regen, per the 8-skill cohort ruled by WS-1 on 2026-08-07) while C-5 item (a) is changing where and when the generator runs on release branches puts two moving parts on the same plumbing in one cycle.
- **D1 trip-wires (adapted 2026-08-02 for the ruled C composite; drop order, in order):** (1) if the WS-1 ratification packet (parked D1/D3 + delta spec) is not done by 2026-08-09, the C-1 build drops to delta-spec-only and the memory build moves to v2.33.0; (2) if B1 has not landed by 2026-08-16, B2 (the cohort) drops to v2.33.0 and B1 ships alone; (3) if wave-2 is below 5 of its 10 sets by 2026-08-16, it truncates to what is done and the remainder carries; (4) C-5 item (a) drops to v2.33.0 only if it is blocking the cut itself; (5) C-3 Phase-0 drops LAST (S-sized, independent); (6) C-5 items (b)(c) and WS-7 never drop (repairs and a filing). Dates assume the 2026-08-30 target; re-derive if the target moves.
- **D2-A vs B:** B exists because the critique found B1-only conversion makes a memory build fit a composite cycle. Not recommended together with D1-A only because A sequences memory behind S2 characterization; under D1-B, D2-B is the natural pair. "Rewrite the parked plan wholesale" is NOT an option: the v2.31.0 staging instruction rules it out (extend, never re-author).
- **D3** is split from the ratification bundle because skills writing files in a user's project is a trust-posture decision in a repo that just spent two releases on trust (v2.30.0 trust repair, v2.31.0 SECURITY/provenance pages, hook opt-in precedent). D1 is NOT conditioned on D3 resolving quickly.
- **D4-B** costs a tracking issue and an effort brief. The case against: another open issue to maintain; but leaving the C-2 trigger unreachable makes #224 a permanent zombie.
- **D6-C** reflects that sprint-family steps are entered through the family workflow, not free-text routing. The case against: users may still free-text a sprint step (e.g. "run the magic lenses exercise"), and fixtures also guard collisions; if the maintainer believes free-text entry is real, D6-A is the answer and the sizing note applies (25 sets is about 2x wave-1's measured unit).
- **D8-B** is the honest flip from this plan's first draft, which the critique refuted: the 2026-07-30/31 "clean sample" was bot-dominated (about 12 of 17 merges were Dependabot/`ci(deps)` titles, conventional by construction), and the one observed discipline leak (`04ce8b6e`, a `fix:`-typed housekeeping commit) went DIRECT to main, which a PR-title lint structurally cannot see - that class is addressed only by the runbook typing rule C-5 item (c) carries. The workflow's own promotion criterion ("a full shadow cycle shows clean titles land without a manual nudge") has no evidence on the no-nudge leg yet. Promote only after a cycle with a real human-authored title sample.

## Carried follow-ups: status after the 2026-07-31 hygiene sweep

- Runbook doc fixes (retired CONTEXT.md path, phantom `check-em-dashes` reference, wrong validator attribution on sub-check 4): **DONE** (PR #249).
- `lint-skills-frontmatter.sh` pipefail class: **DONE**, including the higher-risk command-substitution sites the adversarial review surfaced (PR #249).
- Dependabot `groups:` for all three ecosystems: **DONE** (PR #249).
- External surfaces: agent-plugins re-pin to v2.31.1 **MERGED 2026-08-02** ([agent-plugins#62](https://github.com/product-on-purpose/agent-plugins/pull/62); registry 1.47.0 serves pm-skills 2.31.1 at `32e28377`, with a `[1.47.0]` CHANGELOG entry per that repo's re-pin convention; observed there: registry versions 1.42-1.46 (the four writing-style-catalog re-pins #58-#61) have no changelog entries, pre-existing debt in that repo, not addressed here); v2.31.1 Release body enriched; #136 S2 state comment posted. Issue #248 fused-sentence fix shipped as discover-competitive-analysis 2.2.1 (PR #249).
- PR-title lint promotion: **now decision D8 above** (recommendation flipped to hold by the critique).
- S2 phantom-minor fallback note: recorded in `../v2.31.1/plan_v2.31.1.md`; moves into the runbook via C-5 item (c).
- Deferred observation (P3, from the audit): `_agent-context/*/PLANNING/` trees have had no entries since 2026-05-17 while SESSION-LOG stays current; maintainer to confirm whether that is by design. `_agent-context/claude/TODO.md` itself was refreshed 2026-07-31 (gitignored).

## Execution workstreams (scope ruled 2026-08-02)

Dependency order: WS-1 gates WS-2 gates WS-3; WS-4 gates WS-5's trigger ruling text; WS-6 and WS-7 are independent. Agent labels per the assignment framework.

| WS | What | Depends on | Agent | Exit criteria |
|---|---|---|---|---|
| WS-1 | **DONE 2026-08-07.** C-1 ratification packet. F-54 CONFIRMED FREE (no issue claims it; F-55 = #209 closed, F-56 = #149 closed, roadmap reserves F-45..F-53; the untracked maintainer-local backlog remains the one unverified ID authority). Parked D1 (structure-over-prose) RATIFIED as drafted, weak-model re-test scheduled before the next content cycle. Parked D3 (cohort) RULED C = 8 skills. D3-C write posture recorded, superseding the parked spec's auto-append recommendation. Resume posture RULED A (record state, promise nothing). Delta spec authored at `../_unreleased/project-memory/spec_ledger-delta.md`; parked plan annotated PROMOTED, not rewritten | - | claude drafts, human ratifies | **MET** |
| WS-2 | **DONE 2026-08-08** (`bc3a8b74`). C-1 B1 keystone: `.claude/pm-skills.local.md` schema:1, the F-44 router reads a declared `phase` and outranks both heuristics with it, `active_initiative` surfaced only alongside a declared phase, `memory_auto_append` opt-in (fails closed) expressing the D3-C propose-then-confirm default, docs in `concepts/hooks.md`, opt-in posture preserved and unit-tested (absent file = pre-B1 behavior). Spec correction found in build: the delta's nested `memory.auto_append` is unparseable by the shipped flat frontmatter reader, corrected to `memory_auto_append`. The `## Project Memory Contract` declaration validator moves to WS-3, where it first has subjects | WS-1 | claude | **MET.** 380/380 tests green; `gen-derived-surfaces --check` current; router honors the file. **Trip-wire 2 (B1 by 2026-08-16) satisfied 8 days early** |
| WS-3 | C-1 B2 cohort: read/write contracts on the 8 LOCKED skills (`discover-interview-synthesis`, `deliver-prd`, `foundation-okr-writer`, `iterate-retrospective`, and all four `foundation-meeting-*`) under the D3-C write posture; per-skill MINOR bumps + HISTORY rows + derived-surface regen. Within-cohort drop order is recorded in the parked plan's PROMOTED annotation; drop from the bottom up rather than re-opening the membership ruling | WS-2 | claude | Cohort skills read/write memory; all gates green |
| WS-4 | C-4 wave-2: record the D6-C exclusion (15 `tool-*` sprint steps out by design, rationale in `trigger-eval-roster.yaml`); author the 10 `utility-*` fixture packs with collision pairs + reciprocal When-NOT-to-Use edges | - | claude | Roster reads 53/53 triggerable; fixture-structure + reciprocity gates green |
| WS-5 | C-3 Phase-0: promote the maintainer-local scope into a tracked spec (5 skill names, classifications, rubric plan); rule the eval-complete trigger MET via roster-add-at-merge over the post-D6 roster | WS-4 (trigger text) | claude spec, human scope sign-off | Tracked spec committed; #225 updated with the trigger ruling |
| WS-6 | C-5 S2 enablement: (b) marketplace updater ref-advance + reformat fix, (c) phantom-minor fallback note into the runbook, (a) regen-on-release-PR mechanism | - | claude | S2 checklist items 2/4/6 closed on #136 |
| WS-7 | D4-B filing: X-2 (artifact schemas) tracking issue + effort brief; update #224's target note | - | claude | Issue exists; #224 no longer trigger-unreachable |
| WS-8 | Release cut via the 6-gate runbook; during the cycle, collect the human-authored PR-title sample for the D8 revisit | WS-1..7 | claude runs, human gates | v2.32.0 tagged per G0-G4; D8 evidence recorded |
