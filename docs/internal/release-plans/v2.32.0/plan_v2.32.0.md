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
| C-2 | X-2 (artifact schemas) ratified with one shipped schema family | UNMET | HONORED (defer); D4-B makes it reachable later (filed 2026-08-08: [M-40] [#258](https://github.com/product-on-purpose/pm-skills/issues/258)) |
| C-3 | Eval-complete-from-day-one gate live (rides the WS-Z5 contract) | PARTLY MET (see resolved fact in C-3 section) | Rule after D6; D5-A names the satisfying condition |
| C-4 | Wave-1 green (met) + output-eval lane stable for two releases | SECOND LEG UNCONFIRMED | Argue the output-eval leg does not gate a trigger-fixture-only wave; amend the WS-Z10 trigger note accordingly |
| C-5 | (New candidate; no staged trigger. Blocks on nothing.) | N/A | D7 rules inclusion |

### C-1 Memory artifact ledger (F-48)

Parked plan + spec exist and are current: `../_unreleased/project-memory/plan_project-memory.md` (B1 keystone `.claude/pm-skills.local.md` state file read by the shipped F-44 router; B2 memory-aware cohort, LOCKED 2026-08-07 at 8 skills by the WS-1 D3 = C ruling; B1 and B2 are sized M each, separately) and `spec_project-memory.md` (schema:1 YAML, 4-tag provenance model, agent-does-the-IO contract). Issue #223 ADDS ledger semantics the parked schema does not model: orchestrator execution state, artifact hashes, provenance chains across invocations. X-03 (artifact provenance and the upgrade loop; parked at `../_unreleased/fable-innovations/X-03-artifact-provenance-upgrade.md`) does not depend on B1 - its REQ-6 makes memory an enhancement, never a prerequisite; only its deferred Phase 6 waits on WS-Z7, so C-1 slipping does not block X-03.

Pre-build gates: **ALL CLOSED by WS-1 on 2026-08-07.** Parked D1 (structure-over-prose) RATIFIED as drafted, with the weak-model re-test scheduled before the next content cycle; parked D2 (write posture) was split out as decision D3 below because it is a trust-posture call, not a formality, and RULED C on 2026-08-02 (propose-then-confirm by default, opt-in auto mode); parked D3 (cohort membership) RULED C at 8 skills; F-54 (memory-aware cohort, provisional effort ID) CONFIRMED FREE against the live issue list, with the untracked maintainer-local backlog the one remaining ID authority. Risks: this train has slipped twice (v2.28.0 to v2.29.0 to parked; the v2.31.0 audit's P1-10 named the pattern); building to issue text without a delta spec invents ledger mechanics mid-implementation; opt-in posture (inert unless the file exists) must be preserved; schema coordination with C-2 if both ever ship in one cycle; and a same-cycle coupling with C-5, named under D1.

### C-2 Typed handoff envelope (R-23)

The orchestrator's `--thread` flag hands step N+1 only a raw artifact reference; R-23 proposes an optional per-skill `## Handoff` YAML block. The v2.31.0 plan staged this behind the X-2 (artifact schemas) promotion trigger, with a tracking issue as the only sanctioned pre-trigger action (filed as #224 on 2026-07-06). X-2 is PARKED pre-decision (`../_unreleased/fable-innovations/X-02-artifact-schemas.md`), has no tracking issue, no effort brief, and no schema file exists in the repo. (Update 2026-08-08, WS-7: X-2 is now FILED as [M-40] [#258](https://github.com/product-on-purpose/pm-skills/issues/258), with the thin brief at `../../efforts/M-40-artifact-schemas.md`; still no schema file, and the build stays unscheduled.) Pulling R-23 forward means shipping X-2 first (XL combined). Authoring the Handoff shape "spec-only" ahead of X-2 would invert the dependency the staging exists to protect.

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
| D8 | PR-title lint promotion (advisory to enforcing) | A) Promote in v2.32.0: wire as a required check with NO paths filter (the v2.31.1 lesson), confirm it reports on every PR including release-please's own `chore(main):` PRs, with a one-line rollback (revert to continue-on-error). B) Hold advisory for one more cycle and collect a human-authored title sample. | B | **RULED B 2026-08-02**: hold; this full-slate cycle generates the human-authored title sample the promotion evidence lacks. **Revisit RELOCATED 2026-08-13** from the v2.32.0 cut to v2.33.0 scope planning ([cut pack](./prep_cut-pack.md) section 6; carried as C-3 in [the v2.33.0 stub](../v2.33.0/plan_v2.33.0.md)). The ruling is unchanged; only the timing moves, because an unruled decision inside the tag window is the one gate shape that stalls an unattended cut. Evidence still collected this cycle |

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

## Release narrative draft (for G2; written 2026-08-08 while the material was fresh)

Drafted during the build so G2 is assembly rather than archaeology across the branch. **Not a
commitment to ship this text**: G2 still owns the actual CHANGELOG write, the version bump, and
`docs/releases/Release_v2.32.0.md`. Covers WS-1 through WS-4, WS-6 and WS-7; extend as WS-5 lands.

### The one-sentence claim

Every previous release added capability you invoke. **This one adds capability that accumulates.**
Project memory is the first thing in the catalog's history that compounds within a session instead
of resetting, and that is a materially different claim from adding N skills.

### Proposed CHANGELOG headline

> **Project memory: the catalog stops asking you to repeat yourself.** Record your Triple Diamond
> phase and current initiative once, in the gitignored `.claude/pm-skills.local.md` the guardrails
> and phase router already use, and eight skills begin reading it. The concrete moment: synthesize
> your research with `discover-interview-synthesis`, then run `deliver-prd` and it uses the personas
> you already produced instead of asking you to paste them again. Nothing happens until you opt in:
> with no file, every skill and both hooks behave exactly as before, and writes are proposed for
> your confirmation rather than applied. Alongside it, trigger-eval coverage closes: 53 skills
> measured and 15 excluded by design, accounting for all 68 with nothing unclassified. Catalog stays
> 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents unchanged. Additive MINOR.

### Keep-a-Changelog sections

**Added**
- Project memory (opt-in): `schema: 1` state file carrying `phase`, `active_initiative`, an
  `artifacts[]` ledger and a `## Decisions` section, with the four-tag provenance model.
- `## Project Memory Contract` on eight skills: `discover-interview-synthesis`, `deliver-prd`,
  `foundation-okr-writer`, `iterate-retrospective`, and the four `foundation-meeting-*` skills.
- Trigger-eval fixture packs for the 10 remaining `utility-*` skills (20 queries each).
- `scripts/check-memory-contracts.mjs` (advisory): structural validation of the memory declaration.
- Internal-doc link scanning via `check-root-doc-links.mjs --include-internal` (advisory).
- `excluded:` in `trigger-eval-roster.yaml` plus an `EXCLUDED` loader export, recording decision
  D6 = C as data with its counter-argument and reversal path.
- X-2 (artifact schemas) tracking issue filed as [M-40] (#258) with a thin effort brief, per
  decision D4 = B: nothing built, but the staged typed-handoff envelope (#224) stops being
  trigger-unreachable.
- Regen-on-release-PR (`release-please-regen.yml`): a push-triggered workflow on
  release-please's own branch regenerates every derived surface and commits the mirrors,
  closing the stale-surfaces failure that sank the bot's PR #229 and readying the
  shadow-to-authoritative cutover (S2 checklist items 4 and 6).
- `gen-derived-surfaces --about` (REQ-Z1.7): the GitHub About string becomes
  generator-derived, making the post-tag About-sync step first-fire-safe and the
  runbook's manual About step a one-liner that cannot drift from it.
- A tracked Phase-0 scope spec for the AI-product skill family, replacing a gitignored
  five-name sketch nobody outside the maintainer's machine could read. Names, phases, what
  is deliberately out, and a new build gate: a proposed skill must beat a no-skill control
  arm before it is built, not after. Nothing is built in this release.

**Changed**
- The SessionStart phase router prefers a declared phase over its branch and artifact heuristics,
  and states a declared phase rather than hedging it.
- Three collision pairs declared (22 -> 25), with reciprocal boundary pointers on
  `utility-pm-workflow-orchestrator`, `utility-pm-skill-validate`, and `utility-pm-skill-auditor`.
- Trigger-eval execution batches extended with three wave-2 batches, collision-critical first.

**Fixed**
- Two broken relative links in `docs/internal` that no guard could see, one of them long-standing.
- The HISTORY.md header template in `docs/internal/skill-versioning.md` carried an em-dash scar that
  every real HISTORY file had already moved past, so the template was manufacturing the defect it
  documented.
- A pre-existing one-sided boundary pointer between `utility-pm-workflow-builder` and
  `utility-pm-workflow-orchestrator`.
- The marketplace release pin: `plugins[0].source.ref` now advances with the version
  (v-prefixed) without re-serializing `marketplace.json`, replacing the release-please
  jsonpath entry that corrupted the file's formatting and could not write the ref at all
  (S2 checklist item 2).

### Framing notes for whoever writes the final copy

- Lead with the loop, not the schema. "The PRD skill already knows your personas" lands; "schema 1
  YAML with provenance tags" does not.
- State the opt-in posture early and plainly. It is the trust claim, and this repo has spent two
  releases earning that ground.
- The 53 + 15 = 68 accounting is a completeness claim, not a coverage percentage. Say it that way.
- Do not oversell the cohort as "memory-aware skills" generally. Eight skills, named, is honest.

## Execution workstreams (scope ruled 2026-08-02)

Dependency order: WS-1 gates WS-2 gates WS-3; WS-4 gates WS-5's trigger ruling text; WS-6 and WS-7 are independent. Agent labels per the assignment framework.

| WS | What | Depends on | Agent | Exit criteria |
|---|---|---|---|---|
| WS-1 | **DONE 2026-08-07.** C-1 ratification packet. F-54 CONFIRMED FREE (no issue claims it; F-55 = #209 closed, F-56 = #149 closed, roadmap reserves F-45..F-53; the untracked maintainer-local backlog remains the one unverified ID authority). Parked D1 (structure-over-prose) RATIFIED as drafted, weak-model re-test scheduled before the next content cycle. Parked D3 (cohort) RULED C = 8 skills. D3-C write posture recorded, superseding the parked spec's auto-append recommendation. Resume posture RULED A (record state, promise nothing). Delta spec authored at `../_unreleased/project-memory/spec_ledger-delta.md`; parked plan annotated PROMOTED, not rewritten | - | claude drafts, human ratifies | **MET** |
| WS-2 | **DONE 2026-08-08** (`bc3a8b74`). C-1 B1 keystone: `.claude/pm-skills.local.md` schema:1, the F-44 router reads a declared `phase` and outranks both heuristics with it, `active_initiative` surfaced only alongside a declared phase, `memory_auto_append` opt-in (fails closed) expressing the D3-C propose-then-confirm default, docs in `concepts/hooks.md`, opt-in posture preserved and unit-tested (absent file = pre-B1 behavior). Spec correction found in build: the delta's nested `memory.auto_append` is unparseable by the shipped flat frontmatter reader, corrected to `memory_auto_append`. The `## Project Memory Contract` declaration validator moves to WS-3, where it first has subjects | WS-1 | claude | **MET.** 380/380 tests green; `gen-derived-surfaces --check` current; router honors the file. **Trip-wire 2 (B1 by 2026-08-16) satisfied 8 days early** |
| WS-3 | **DONE 2026-08-08.** Read/write contracts on the 8 LOCKED skills (`discover-interview-synthesis`, `deliver-prd`, `foundation-okr-writer`, `iterate-retrospective`, and all four `foundation-meeting-*`) under the D3-C write posture; per-skill MINOR bumps + HISTORY rows + derived-surface regen. Within-cohort drop order is recorded in the parked plan's PROMOTED annotation; drop from the bottom up rather than re-opening the membership ruling. **Nothing dropped: all 8 shipped.** Two meeting skills are pure readers by design (the family already chains artifacts by filename; memory carries durable context instead). New advisory validator `scripts/check-memory-contracts.mjs` + 14 tests, clean at 8/8. `foundation-okr-writer` gained the HISTORY.md its 1.1.0 bump requires, with 1.0.0 backfilled | WS-2 | claude | **MET.** 394/394 tests; frontmatter, meeting-family, family-registration, reciprocity (22 pairs), cross-references, page-sections, count-phrases and derived-surfaces all green |
| WS-4 | **DONE 2026-08-08.** C-4 wave-2: D6-C exclusion recorded as DATA (`excluded:` key + `EXCLUDED` loader export, with the case against it written alongside); 10 `utility-*` fixture packs at 20 queries each; 3 collision pairs declared (22 -> 25) with all reciprocal edges closed, including a pre-existing one-sided pointer the pair forced shut. Roster growth correctly broke 3 tests: 2 pinned drift-tripwire counts and the real BATCHES-partition invariant, all fixed | - | claude | **MET, and stronger than planned.** Not just 53/53: **53 rostered + 15 excluded = 68, nothing unaccounted for**, asserted in test so it cannot drift. 394/394 tests; fixture-structure (53 files), reciprocity (25 pairs), and all other gates green |
| WS-5 | **DONE 2026-08-13.** C-3 Phase-0: the maintainer-local scope is promoted to a tracked spec at [`spec_c3-ai-product-family.md`](./spec_c3-ai-product-family.md). Decision D-C RULED A (adopt the research amendments): the roster is four new phase skills (`deliver-ai-behavior-spec`, `measure-ai-eval-spec`, `iterate-ai-incident-review`, `develop-agent-authority-plan`) plus four increments to shipped skills plus a pm-critic pointer, replacing the five-name sketch. Prompt spec dropped and AI-UX absorbed (both declined by both research passes); the governance evidence map is parked by name; risk-tier classification is rejected on employer neutrality. Three corrections found while writing rather than inherited: (1) **no new rubric family is needed** - all four skills map to shipped families and the append-on-first-eval mechanism means one section-4 table each, so the briefs' rubric-first cost is close to zero; (2) the proposed `iterate-ai-change-and-incident-review` was shortened to `iterate-ai-incident-review` because every `-and-` name in the catalog is a D6-C-excluded sprint step and the name would have been the longest non-sprint name shipped; (3) the eval-review capability collapses to one pm-critic pointer, not a new standards doc. Spec section 7 adds a build gate the repo did not have: **every new skill beats a no-skill control arm BEFORE build**, closing the gap between the skill-builder's assertion-only Why Gate and the output-eval harness's real control that only runs post-ship. Catalog-count consequence (68 to 72 at first build) recorded now, not discovered later | WS-4 (trigger text) | claude spec, human scope sign-off | **MET.** Tracked spec committed; D5 = A trigger ruling recorded in spec section 8 (roster-add-at-merge, trigger MET, evidenced by WS-4's 53 + 15 = 68 assertion); [#225 updated 2026-08-13](https://github.com/product-on-purpose/pm-skills/issues/225#issuecomment-5289114772) with the ruling, the amended roster, the three spec-time corrections, and the control-arm gate |
| WS-6 | **DONE 2026-08-09.** C-5 S2 enablement, all three items. (b) the marketplace release pin (`plugins[0].version` + `plugins[0].source.ref`, v-prefixed) is generator-owned via `evalMarketplacePin` (targeted value-literal swap, formatting preserved byte-for-byte); release-please's jsonpath entry for `marketplace.json` is removed from `release-please-config.json` (the README-badge precedent applied to the same failure class). (c) runbook Section 8.5 records the phantom-minor window fallback from the #237 observation. (a) `.github/workflows/release-please-regen.yml` regenerates surfaces on the Release PR's own branch, push-triggered there so both the bot's force-push and the maintainer's ZD-1 enrichment push re-run it, tolerating the missing-release-page pre-enrichment state with a neutral notice. The `--about` gap (REQ-Z1.7) was named at the WS-6 cut as out-of-scope, then closed same-day as a maintainer-directed addendum (2026-08-09): `renderAboutString` + the `--about` CLI mode landed with the spec's own test contract, the About-sync step is first-fire-safe, and runbook Section 10.5.1's manual path now uses the same generator string | - | claude | **MET (engineering).** Items 2/4/6 closed on #136 as shipped mechanism; the zero-hand-fix evidence leg confirms on the v2.32.0 cut cycle |
| WS-7 | **DONE 2026-08-08.** D4-B filing: X-2 (artifact schemas) filed as [M-40] ([#258](https://github.com/product-on-purpose/pm-skills/issues/258)); thin effort brief at `../../efforts/M-40-artifact-schemas.md`; parked spec annotated FILED, not rewritten. ID verified next-free: M-30..M-36 claimed (M-36 is the v2.31.0 zero-drift generator), M-37/M-38/M-39 penciled by sibling bets X-07/X-09/X-10 and honored per the WS-1 F-54 precedent, the maintainer-local backlog remaining the one unverified authority. #224's body now points its trigger at #258 and a comment records the ruling | - | claude | **MET.** Issue exists; #224 no longer trigger-unreachable |
| WS-8 | Release cut via the 6-gate runbook. **Execution material is prepared in [the cut pack](./prep_cut-pack.md)** (seeded 2026-08-13): draft CHANGELOG and release-notes copy staged for G2 approval rather than G2 authorship, the external-surface checklist with the two cross-repo items named, the S2 ratification observation sheet, and the four human moments isolated. During the cycle, collect the human-authored PR-title sample for the D8 revisit, which the cut pack relocates out of the tag window | WS-1..7 | claude runs, human gates | v2.32.0 tagged per G0-G4; S2 observation sheet filled and recorded on #136; D8 evidence collected |

### Out-of-band merges during the cycle (read this at G2)

Changes that landed on `main` inside the v2.32.0 window without a workstream row. The table above is
not a complete inventory of what this release ships, so G2's CHANGELOG assembly must read both.

| Merged | PR | What | Recorded |
|---|---|---|---|
| 2026-08-11 | [#265](https://github.com/product-on-purpose/pm-skills/pull/265) (`422dcb4d`) | Manifest description de-noise: the three generator-tracked description fields trimmed from 9,382 / 7,518 / 1,534 to 606 / 543 / 620 characters. Count headlines byte-identical; only the hand-authored narration tail changed, so v2.31.0's OQ-3 ruling stands. Origin: the maintainer-local traction campaign, item W0-2 | `## [Unreleased]` in CHANGELOG.md |
