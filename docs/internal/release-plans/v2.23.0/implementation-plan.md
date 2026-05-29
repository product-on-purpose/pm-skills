# Implementation Plan: `prioritized-action-plan` (foundation skill)

**Status:** READY - Phase 0 (spec adversarial review) complete; build phases gated on v2.22.0 shipping
**Date:** 2026-05-27 (updated 2026-05-28)
**Parent:** [`spec_prioritized-action-plan.md`](spec_prioritized-action-plan.md) (same folder); [`strategy-brief.md`](../../skills-ideas/prioritized-action-plan/strategy-brief.md) (discovery)
**Master plan:** [`plan_v2.23.0.md`](plan_v2.23.0.md)
**Target release:** v2.23.0 (sequenced AFTER v2.22.0 ships)
**Total effort estimate:** 3-4 effort-days remaining (Phase 0 done; assumes v2.22.0 shipped and naming-stable)

This plan executes the spec. Phase 0 (Codex adversarial review) is complete; the spec is build-ready once v2.22.0 ships.

---

## Pre-flight gate

Before starting Phase 1, the following must be true:

- [ ] v2.22.0 (naming standardization) has shipped and is tagged. Why: the Recommended Prompts section of the new skill targets pm-skill names; if those names are mid-rename, every prompt is born stale.
- [ ] Strategy brief decisions are locked (already done 2026-05-27)
- [x] Spec has cleared Codex adversarial pass (Phase 0 complete 2026-05-28)
- [ ] No higher-priority work has displaced v2.23.0 from the slate
- [ ] You have ~3-4 contiguous effort-days available; the eval pass requires uninterrupted focus

If any pre-flight item is unchecked, stop and resolve before continuing.

---

## Phase 0: Spec adversarial pass (Codex) - COMPLETE 2026-05-28

**Goal:** Catch spec-level issues before they propagate into the skill body.

**Tasks:**

- [x] 0.1 Generate Codex review packet for `spec.md` using `jp-ai-review --review` (`spec_reviewed-by-codex.md`)
- [x] 0.2 Run Codex review and capture findings (1 Blocker, 12 Major, 7 Minor, 2 Note)
- [x] 0.3 Synthesize findings; resolve Blocker/Major issues by editing the spec (dispositions table at top of `spec.md`; all 4 design forks decided by maintainer)
- [x] 0.4 Second pass deferred: one pass surfaced a clear, actionable finding set; no dense unresolved cluster requiring re-run before build
- [x] 0.5 Spec status updated to "REVISED post-Codex review 2026-05-28 - design forks locked"

**Acceptance criteria:**
- [x] Codex review run has zero unresolved Blocker findings (the one Blocker, evidence positioning, accepted and fixed via Step 0 source ledger + inline Source fields)
- [x] All Major findings are resolved in the spec or explicitly accepted with documented reasoning (see dispositions table)
- [x] Spec status reflects locked state

**Outcome:** The review confirmed the core bet and forced four design improvements: cut OODA, make evidence structural, bound routing via tiers, and rewrite acceptance criteria as mechanical checks. No framing-level rework required.

**Note (optional second pass):** A second Codex pass on the REVISED spec is worthwhile but not blocking. Consider running it once v2.22.0 ships and before Phase 1, to confirm the Blocker fix reads as enforceable. Per the cross-LLM protocol, loop until findings drop below IMPORTANT.

---

## Phase 1: Skill body authoring

**Goal:** Produce `skills/prioritized-action-plan/SKILL.md` matching the spec's SKILL.md draft.

**Tasks:**

- [ ] 1.1 Copy the SKILL.md draft from `spec_prioritized-action-plan.md` into `skills/prioritized-action-plan/SKILL.md`
- [ ] 1.2 Validate frontmatter against pm-skills metadata schema (run `utility-pm-skill-validate`)
- [ ] 1.3 Resolve any frontmatter validation errors
- [ ] 1.4 Confirm description fits trigger conventions: descriptive, includes trigger phrases, under the description length ceiling
- [ ] 1.5 Verify cross-client compatibility list is complete and accurate
- [ ] 1.6 Author the rest of the SKILL.md body, ensuring word budget compliance

**Acceptance criteria:**
- SKILL.md frontmatter passes `utility-pm-skill-validate`
- Description includes at least 8 distinct trigger phrases / keywords
- Body matches the spec's section ordering and behavioral guardrails
- File contains no em-dashes or en-dashes (per CLAUDE.md style rule)
- File is under 600 lines (manageable for review)

**Estimated effort:** 0.5 effort-days
**Risks:** Description bloat (description fields tend to grow). Mitigation: hard length check at the end of the phase.

---

## Phase 2: TEMPLATE.md

**Goal:** Produce `skills/prioritized-action-plan/TEMPLATE.md` that scaffolds the 9-section output plus the Step 0 source ledger.

**Tasks:**

- [ ] 2.1 Author TEMPLATE.md with the Step 0 source-ledger scaffold and all 9 sections (0-8) as headings
- [ ] 2.2 For each section, include: section purpose, target word count, required content, and a 1-2 line example fragment
- [ ] 2.3 Include the embedded effort-block template (the `#### P1. [Effort name]` structure with all required fields)
- [ ] 2.4 Include the embedded prompt template (the `#### To execute P1` structure)
- [ ] 2.5 Add a brief "How to use this template" header for the user invocation

**Acceptance criteria:**
- TEMPLATE.md produces a valid output document when filled with concrete data
- All 9 sections plus the Step 0 ledger are scaffolded with target ranges; effort block includes the `Source:` field
- File matches pm-skills TEMPLATE.md conventions (see `foundation-persona/TEMPLATE.md` for shape)

**Estimated effort:** 0.25 effort-days
**Risks:** Template grows into a documentation file. Mitigation: enforce "scaffolds output, not teaches concepts" rule. Concepts live in SKILL.md.

---

## Phase 3: EXAMPLE.md (one fully worked case)

**Goal:** Produce `skills/prioritized-action-plan/EXAMPLE.md` showing one complete plan from a realistic input.

**Tasks:**

- [ ] 3.1 Pick one realistic input scenario (recommend: a half-baked PRD draft for a B2B feature with mixed signal)
- [ ] 3.2 Write the verbatim user input at the top of EXAMPLE.md
- [ ] 3.3 Write the Step 0 source ledger, then the full action plan output below it, hitting all 9 sections
- [ ] 3.4 Ensure Cynefin classification is Complicated (the most common real case), with the decision-rule reasoning shown (why Complicated and not Complex)
- [ ] 3.5 Verify every load-bearing claim cites a source-ledger ID with an exact input quote; include at least one claim correctly marked `Inferred (Low confidence)` to model the honesty mechanism

**Acceptance criteria (mechanical, per spec AC):**
- Output contains the Step 0 ledger and all 9 section headers (0-8) in order
- Every `Source:` quote is an exact substring of the input; binding constraint and P1 each cite a non-Inferred source
- TOC binding constraint names the system, goal, candidate constraints, and the P1 causal link
- All effort blocks contain all 8 fields (incl. `Source:`)
- At least 2 Recommended Prompts are filled with the user's actual context and name only Tier 1/2 skills
- Zero placeholder tokens

**Estimated effort:** 0.5 effort-days
**Risks:** Example becomes the de-facto spec for what the skill does (users mimic it). Mitigation: choose an example that exercises the median case, not an edge case.

---

## Phase 4: Additional examples (2 more for eval coverage)

**Goal:** Produce 2 more example outputs in `skills/prioritized-action-plan/examples/`.

**Tasks:**

- [ ] 4.1 `examples/02-interview-transcript.md`: a raw customer interview with no synthesis. Cynefin domain: Complex (emergent user behavior). Plan must contain safe-to-fail probes at Medium-Low confidence, no High markers.
- [ ] 4.2 `examples/03-executive-ask.md`: a vague ask like "make us more competitive in SMB" with no context. Cynefin domain: Complex (ambiguous problem space). Section 4 should dominate; the plan should be discovery-heavy with probes.
- [ ] 4.3 Each example exercises a different input shape: example 2 = research input, example 3 = strategic ambiguity. Both show the Cynefin decision-rule reasoning, not just the label.

**Acceptance criteria (mechanical):**
- Examples 2 and 3 pass the same mechanical checks as EXAMPLE.md (9 sections, exact-quote sources, all effort fields, no placeholders, no Tier 3 recommendations)
- Both Complex examples contain probe language and zero High confidence markers (automated check)
- The three shipped examples cover Complicated once and Complex twice

**Note:** The shipped examples are NOT the Cynefin discrimination test. That lives in a separate labeled fixture set authored in Phase 5.5 (per spec AC #7), so the skill is not graded on inputs it was taught on.

**Estimated effort:** 0.5 effort-days
**Risks:** Examples drift from the spec or from each other. Mitigation: author all three in one sitting.

---

## Phase 5: References

**Goal:** Produce `references/frameworks.md`, `references/recommendable-tiers.md`, the tier-filtered skill-catalog regen script, and the Cynefin fixture set.

**Tasks:**

- [ ] 5.1 Write `references/frameworks.md`: a 300-500 word one-pager covering Theory of Constraints (five focusing steps) and Cynefin (the four+1 domains, with the decision rules that distinguish them). Cite original sources. NO OODA (cut post-review).
- [ ] 5.2 Write `references/recommendable-tiers.md`: the Tier 1 / Tier 2 / Tier 3 lists and the routing rules (Tier 1 always, Tier 2 conditional, Tier 3 never; families recommend the entry point; this skill is never self-recommended).
- [ ] 5.3 Build `scripts/build-skill-catalog.py` that reads `skills/*/SKILL.md` frontmatter and emits `references/skill-catalog.md` with name, classification, phase, and a one-line description excerpt. The script applies the tier filter: emit Tier 1 and Tier 2 (with a conditional flag), OMIT Tier 3 and this skill. Skip any skill whose frontmatter fails to parse and emit a warning rather than crashing.
- [ ] 5.4 Run the script and commit the generated catalog; confirm Tier 3 names are absent
- [ ] 5.5 Author the Cynefin fixture set under `eval/fixtures/`: >= 6 inputs with pre-assigned expected domains (mix of Clear / Complicated / Complex / Chaotic), DISTINCT from the shipped examples, plus the discrimination rubric (scores cause/effect evidence, reversibility, novelty, and presence of probes/stabilization). This backs spec AC #7.
- [ ] 5.6 Add a Make target or npm script to regenerate the catalog at release time

**Acceptance criteria:**
- `references/frameworks.md` covers TOC + Cynefin only (no OODA), cites primary sources
- `references/recommendable-tiers.md` lists all three tiers and the routing rules
- `references/skill-catalog.md` is current as of build time and contains zero Tier 3 entries
- The regen script runs cleanly on a fresh clone and degrades gracefully on unparseable frontmatter
- `eval/fixtures/` contains >= 6 labeled fixtures plus the rubric
- The regen is added to the v2.23.0 pre-tag checklist

**Estimated effort:** 0.75 effort-days (added tiers reference + fixture set)
**Risks:** The regen script becomes a maintenance burden. Mitigation: keep it under 120 lines; it is read-filter-emit, not transformation.

---

## Phase 6: Slash command

**Goal:** Produce `commands/prioritized-action-plan.md` for Claude Code invocation.

**Tasks:**

- [ ] 6.1 Author the slash command per existing conventions (see `commands/foundation-persona.md`)
- [ ] 6.2 Confirm the command frontmatter includes correct argument hints
- [ ] 6.3 Confirm the command body correctly invokes the skill

**Acceptance criteria:**
- Command file matches the pm-skills command convention
- Invocation works in Claude Code (smoke-tested in Phase 8)

**Estimated effort:** 0.1 effort-days
**Risks:** Minimal.

---

## Phase 7: Local eval pass

**Goal:** Run the skill on the 3 example inputs and verify the outputs match the spec.

**Tasks:**

- [ ] 7.1 Run the skill on example 1 input. Compare output to EXAMPLE.md. Diff and triage.
- [ ] 7.2 Run on example 2 input (interview transcript). Verify Complex classification, probe-based plan, no High markers.
- [ ] 7.3 Run on example 3 input (executive ask). Verify Section 4 dominates and the plan is discovery-heavy.
- [ ] 7.4 Run the labeled Cynefin fixture set (Phase 5.5). Score domain-match (target >= 5 of 6) and verify probes-for-Complex / stabilization-for-Chaotic per the rubric. This is the real discrimination test, separate from the shipped examples.
- [ ] 7.5 Run on a 4th adversarial input: a deliberately off-topic message (e.g., "help me plan my vacation"). Verify the refusal protocol fires.
- [ ] 7.6 Run on a 5th adversarial input: ~30 words of vague PM input. Verify the "ask ONE clarifying question" protocol fires.
- [ ] 7.7 Run a fabrication probe: an input with sparse evidence; verify the skill marks thin claims `Inferred (Low confidence)` and does NOT invent source quotes (every Source quote is an exact substring).
- [ ] 7.8 Document deltas in `eval-results.md` (this folder, gitignored)

**Acceptance criteria (mechanical, per spec AC):**
- Output for examples 1-3 passes the spec's mechanical checks (9 sections present, effort fields complete, every Source quote an exact substring, no placeholders, no Tier 3 recommendations)
- Cynefin fixture set scores >= 5 of 6 domain-match with correct posture (probes/stabilization)
- Confidence ceiling respected (no High marker on a Complex/Chaotic output)
- Refusal protocols fire for the off-topic and thin-input adversarial cases
- No unresolved Blocker or Major deltas; any unresolved Minor deltas are documented with a fix plan (severity normalized to Blocker/Major/Minor/Note across this plan; the skill output itself uses Low/Medium/High confidence per spec D-S6)

**Estimated effort:** 0.5 effort-days
**Risks:** Skill produces fluent-but-shallow plans (cites missing, constraint generic). Mitigation: this phase is the catch-net; treat any "this reads plausible but the cite is missing" finding as a P0.

---

## Phase 8: Cross-client smoke test

**Goal:** Verify the skill triggers and produces coherent output across at least 3 LLM clients.

**Tasks:**

- [ ] 8.1 Claude Code: invoke via `/prioritized-action-plan` slash command and via natural-language description-match
- [ ] 8.2 Codex CLI: invoke via `$prioritized-action-plan` (flat namespace; check for collisions per `reference_codex-flat-skill-namespace`)
- [ ] 8.3 Cursor: invoke via skill trigger
- [ ] 8.4 Document any client-specific quirks in `eval-results.md`

**Acceptance criteria:**
- Skill triggers correctly on at least Claude Code and Codex CLI
- Output is coherent on each client (some formatting variance is acceptable)
- No skill-name collisions on Codex

**Estimated effort:** 0.25 effort-days
**Risks:** Codex flat-namespace collision with a similarly named skill in jp-library or another plugin. Mitigation: a quick `Get-ChildItem` across plugin caches before tagging.

---

## Phase 9: Pre-tag validator bundle

**Goal:** Run the full validator bundle with --strict (per `feedback_pre-tag-validator-bundle.md`).

**Tasks:**

- [ ] 9.1 Run `utility-pm-skill-validate --strict` across the whole `skills/` directory
- [ ] 9.2 Run `check-count-consistency` to verify the skill counts in CLAUDE.md, MEMORY.md, QUICKSTART.md, project-structure.md all update consistently
- [ ] 9.3 Run any link checker over the new docs
- [ ] 9.4 Run `validate-plugin-install` against the local marketplace path to catch install-time issues
- [ ] 9.5 Resolve any validator findings

**Acceptance criteria:**
- All validators pass with --strict
- Count consistency check passes (likely 64 total skills after this ships: 30 phase + 9 foundation + 10 utility + 15 tool, assuming the meeting-* family stays at 5 and `prioritized-action-plan` is foundation #9)
- No install-time regressions

**Estimated effort:** 0.25 effort-days
**Risks:** Stale aggregate counters in docs (per `feedback_stale-aggregate-counter.md`). Mitigation: this phase explicitly audits counters before tagging.

---

## Phase 10: Release prep

**Goal:** Update release docs, version manifests, and prepare the v2.23.0 release plan.

**Tasks:**

- [ ] 10.1 Add the skill to `docs/internal/release-plans/v2.23.0/plan_v2.23.0.md` (create the folder if it does not exist)
- [ ] 10.2 Update `CHANGELOG.md` with a v2.23.0 entry describing the new foundation skill
- [ ] 10.3 Bump versions in `plugin.json`, `marketplace.json`, and any other manifest
- [ ] 10.4 Update count breakdowns in `CLAUDE.md`, `MEMORY.md`, `QUICKSTART.md`, `docs/internal/project-structure.md`, and `docs/skills/creating-pm-skills.md` if needed
- [ ] 10.5 Author release notes for the GitHub Release (plain-language description of what users get)
- [ ] 10.6 Update the skill's `HISTORY.md` initial entry per `docs/internal/skill-versioning.md`

**Acceptance criteria:**
- All release manifests carry consistent v2.23.0 version numbers
- CHANGELOG.md entry is descriptive and accurate
- Count breakdowns are updated in all referenced files
- Release notes are ready for the GitHub Release UI

**Estimated effort:** 0.25 effort-days
**Risks:** Forgetting to update one of the count breakdown files (this has happened before, see memory observation 6393). Mitigation: Phase 9.2 count consistency check catches this; double-check during Phase 10.

---

## Phase 11: Tag and ship

**Goal:** Tag v2.23.0, push, create GitHub Release, verify marketplace install.

**Tasks:**

- [ ] 11.1 Verify all phases 0-10 are complete and acceptance criteria met
- [ ] 11.2 Create commit with full release diff
- [ ] 11.3 Tag v2.23.0
- [ ] 11.4 Push tag and main branch
- [ ] 11.5 Create GitHub Release with release notes, marked as Latest
- [ ] 11.6 Verify marketplace install pulls the new version
- [ ] 11.7 Run smoke tests S1-S8 per the marketplace launch pattern (see v2.21.0 plan)
- [ ] 11.8 Flip plan status from "READY FOR EXECUTION" to "SHIPPED"
- [ ] 11.9 Update CONTEXT.md currency marker to v2.23.0

**Acceptance criteria:**
- v2.23.0 tag exists at the expected commit
- GitHub Release is published and marked Latest
- Marketplace install pulls v2.23.0 successfully
- Smoke tests pass

**Estimated effort:** 0.25 effort-days
**Risks:** Marketplace install-path regression (per memory observation 6556). Mitigation: smoke tests catch this; if they fail, do a v2.23.1 hotfix rather than yanking v2.23.0.

---

## Total effort summary

| Phase | Description | Effort (effort-days) |
|---|---|---|
| 0 | Spec adversarial pass | 0.5 (COMPLETE) |
| 1 | Skill body authoring | 0.5 |
| 2 | TEMPLATE.md | 0.25 |
| 3 | EXAMPLE.md | 0.5 |
| 4 | Additional examples | 0.5 |
| 5 | References + tiers + catalog + fixtures | 0.75 |
| 6 | Slash command | 0.1 |
| 7 | Local eval pass | 0.5 |
| 8 | Cross-client smoke test | 0.25 |
| 9 | Pre-tag validator bundle | 0.25 |
| 10 | Release prep | 0.25 |
| 11 | Tag and ship | 0.25 |
| **Total** | | **~4.6 effort-days** (Phase 0 of which is done) |

Plan-on-plan note: this is a top-end estimate. With focus and no unexpected validator regressions, 3.0-3.5 effort-days of remaining work is realistic.

---

## Cross-cutting risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Spec needs material rework after Codex pass | Resolved | - | Phase 0 complete 2026-05-28: no framing-level rework needed; four design forks decided and folded into the spec. An optional second pass on the revised spec is available but non-blocking. |
| Example outputs read shallow / generic | Medium | High (kills first-impression value) | Phase 3 + 4 mechanical AC enforce exact-quote cites and constraint-naming; review against EXAMPLE.md of `foundation-persona` for quality bar |
| Cynefin discrimination fails in practice | Medium | High (the honesty mechanism is the differentiator) | Phase 7.4 runs a labeled fixture set (not the shipped examples) with a discrimination rubric; if the model collapses to Complicated, strengthen the Section 2 decision-rule block in SKILL.md |
| Evidence rule is gamed (fabricated quotes) | Medium | High (defeats the Blocker fix) | Phase 7.7 fabrication probe + AC #4 exact-substring check; EXAMPLE.md models a correct `Inferred (Low confidence)` admission |
| Cross-LLM trigger fails | Low | Medium | Description has 8+ trigger phrases; description-match should fire reliably |
| Skill name collision on Codex | Low | Medium | Phase 8.2 explicitly checks; `prioritized-action-plan` is distinctive enough that collision is unlikely |
| Catalog regen script breaks under unusual SKILL.md frontmatter | Low | Low | Skip skills that fail to parse; emit a warning rather than crash |

---

## Dependencies

**Hard dependencies (must be done before starting):**

- v2.22.0 (naming standardization) shipped and tagged
- Strategy brief decisions locked (done)
- Spec adversarial pass complete (Phase 0)

**Soft dependencies (helpful but not blocking):**

- Codex CLI installed locally for Phase 0 and Phase 8.2
- Cursor installed for Phase 8.3 (optional; Claude Code + Codex is the minimum)
- A second machine or browser session for cross-client testing (avoids state contamination)

---

## Out of scope (do NOT include in v2.23.0)

- Approach C: cross-skill invocation via the Skill tool
- Auto-execution of recommended prompts
- Memory of past invocations across sessions
- Multi-file or multi-paste inputs
- Recommendations beyond pm-skills (jp-library, etc.)
- Sub-agent variant on Claude Code (defer until usage shows value)
- An adversarial-review chaser (`utility-pm-critic` integration) inline in the skill

These are tracked for future iterations but explicitly out of scope here. Resist scope creep.

---

## Definition of done

The skill is "done" when:

1. All 11 phases have completed and acceptance criteria met
2. v2.23.0 is tagged, released, and pinned in the marketplace
3. Smoke tests S1-S8 pass
4. The skill has been used at least once on a real input (yours or a teammate's) and produced a coherent plan
5. The implementation plan status header is updated from "DRAFT" to "SHIPPED" with the release date

Anything short of this is "shipped-but-not-validated" and earns a follow-up validation step.
