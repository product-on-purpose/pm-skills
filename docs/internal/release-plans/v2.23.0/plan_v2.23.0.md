# v2.23.0 Release Plan: `prioritized-action-plan` (new foundation skill, additive)

**Status:** IN PROGRESS - entrance gate cleared (v2.22.0 SHIPPED 2026-05-30). Phase 1 (SKILL.md) authored 2026-05-31 in the live foundation convention. Spec + implementation plan Codex-reviewed (2 rounds, 0 unresolved Blocker/Major) and reconciled to post-v2.22.0 reality (skill renamed `foundation-prioritized-action-plan`; see the spec's reconciliation note).
**Owner:** Maintainers
**Type:** **MINOR** (additive: one new skill, no behavior change to existing skills)
**Theme:** Ship one new foundation skill, `prioritized-action-plan`, that turns any PM input into an evidence-grounded, prioritized action plan: the critical next effort, why, what, how, with confidence markers and copy/paste prompts for the next downstream skills.
**Created:** 2026-05-28
**Updated:** 2026-05-31

---

## Where we are

The idea originated from a maintainer request for a skill (or family) that "analyzes everything a user provides and suggests next steps across all the skills to provide the greatest value." Discovery (the strategy brief) reframed it from an orchestrator into an analysis-first skill whose plan section happens to recommend downstream skills. Design decisions were locked, a full spec and 11-phase implementation plan were written, and the spec cleared a two-round Codex adversarial review.

This release ships that one skill. It deliberately does NOT open any broader orchestration or cross-skill-invocation initiative (deferred as "Approach C" in the brief).

**See companion docs:**

- Discovery: [`../../skills-ideas/prioritized-action-plan/strategy-brief.md`](../../skills-ideas/prioritized-action-plan/strategy-brief.md)
- Spec (full SKILL.md draft + mechanical acceptance criteria): [`spec_prioritized-action-plan.md`](spec_prioritized-action-plan.md)
- Build plan (11 phases): [`implementation-plan.md`](implementation-plan.md)
- Codex review record (2 rounds): [`spec_prioritized-action-plan_reviewed-by-codex.md`](spec_prioritized-action-plan_reviewed-by-codex.md)
- Predecessor plan: [`../v2.22.0/plan_v2.22.0.md`](../v2.22.0/plan_v2.22.0.md)

---

## Entrance criteria (HARD gate)

This release cannot begin build work until ALL of the following hold. **All three are now satisfied: the gate cleared 2026-05-30 when v2.22.0 shipped, and build is in progress.**

1. **[v2.22.0](../v2.22.0/plan_v2.22.0.md) (naming standardization) is SHIPPED and tagged.** This is a hard gate, not a courtesy. The skill's Section 7 recommends downstream skills by exact name and ships a build-time skill catalog; both must target the final post-v2.22.0 names, or every recommended prompt and the embedded fallback list are born stale.
2. Spec design forks locked (DONE 2026-05-28).
3. Spec cleared Codex adversarial review with no unresolved Blocker/Major (DONE 2026-05-28, 2 rounds).

Criterion 1 was met when v2.22.0 shipped on 2026-05-30. Build is now in progress (Phase 1 done).

---

## Scope

### Primary work item (committed to v2.23.0)

| ID | Item | Type | Classification | Category | Effort | Spec |
|---|---|---|---|---|---|---|
| W1 | `foundation-prioritized-action-plan` | NEW SKILL | foundation | planning | 3-4 d (Phase 0 + 1 done) | [`spec_prioritized-action-plan.md`](spec_prioritized-action-plan.md) |
| W2 | `check-skill-sample-coverage` validator | NEW CI GATE | tooling | release-hygiene | 0.5 d (DONE 2026-05-31) | [`spec_check-skill-sample-coverage.md`](spec_check-skill-sample-coverage.md) |

**Total v2.23.0 effort: 3-4 effort-days of remaining build work** (Phase 0 spec review already complete).

### What the skill is (one paragraph)

A foundation skill that accepts any PM input (notes, transcripts, a draft PRD, an executive ask, a Slack thread) and produces one saveable, decision-ready document: executive summary, input mirror, Cynefin situation classification, the binding constraint (Theory of Constraints), prioritized questions and open decisions, the action plan (P1-P5 efforts each with why/what/how/confidence/source/expected-outcome/effort/dependencies), risks and pre-mortem, copy/paste prompts for a bounded tier of downstream pm-skills, and an evidence map. Evidence is structural: a source ledger is built before analysis and every load-bearing claim cites an exact input quote. The skill refuses to manufacture High-confidence plans for Complex or Chaotic situations.

### Design summary (decided + reviewed)

- **Engine:** Theory of Constraints (prioritization) + Cynefin (confidence calibration). OODA was considered and cut.
- **Output:** 9 mandatory sections (0-8); completeness over brevity, with the executive summary as the fast-skim layer and a hard word backstop (1,500 / 2,200 / 3,000 by complexity) to prevent runaway.
- **Honesty mechanism:** Step 0 source ledger before analysis; inline `Source:` fields; exact-substring quote checking; inferred-only evidence banned for the binding constraint and P1.
- **Routing:** a 3-tier recommendable model (Tier 1 always, Tier 2 conditional, Tier 3 = library machinery never recommended) with hybrid breadth and a name-safe fallback (never name a skill not in the catalog or the embedded exact-name list).
- **Classification:** foundation (a saved, reusable working-document).
- **Name:** `foundation-prioritized-action-plan` (maintainer decision 2026-05-31). The earlier bare-name rationale assumed v2.22.0 would strip the phase/classification prefixes; it did not (the short-name rename was deferred), so the skill takes the kept `foundation-` prefix to stay consistent with the other 8 foundation skills and to keep the lower Codex flat-namespace collision risk of a longer name.

### What the skill ships with

- `skills/foundation-prioritized-action-plan/SKILL.md` (DONE Phase 1: live-convention behavioral body + numbered Steps + `references/TEMPLATE.md` reference)
- `skills/foundation-prioritized-action-plan/references/TEMPLATE.md` (Step 0 ledger + 9-section scaffold + effort/prompt blocks)
- `skills/foundation-prioritized-action-plan/references/EXAMPLE.md` (one fully worked case, Complicated domain)
- `skills/foundation-prioritized-action-plan/examples/` (02 interview transcript = Complex; 03 executive ask = Complex)
- `skills/foundation-prioritized-action-plan/references/frameworks.md` (TOC + Cynefin primer; no OODA)
- `skills/foundation-prioritized-action-plan/references/recommendable-tiers.md` (the Tier 1/2/3 exact-name lists + routing rules)
- `skills/foundation-prioritized-action-plan/references/skill-catalog.md` (regenerated at build time, Tier-filtered)
- `skills/foundation-prioritized-action-plan/eval/fixtures/` (labeled Cynefin fixture set for the discrimination AC)
- No command wrapper. Per the v2.22.0 wrapper-deletion decision, new skills are invoked directly (`/pm-skills:foundation-prioritized-action-plan` on Claude Code, `$foundation-prioritized-action-plan` on Codex); no per-skill `commands/` file is created. (This supersedes the original plan, written before the v2.22.0 reframe.)
- No `HISTORY.md` at launch. Per `docs/internal/skill-versioning.md`, a skill's `HISTORY.md` is created on its first iteration (1.0.0 -> 1.0.1+), not at birth; all current skills follow this, so a new 1.0.0 skill ships without one.
- One build-time script: `scripts/build-skill-catalog.py` (reads `skills/*/SKILL.md` frontmatter, emits the Tier-filtered catalog)

### Explicitly out of scope

- Cross-skill invocation / orchestration (Approach C)
- Auto-execution of recommended prompts
- Memory across invocations
- Multi-file or multi-paste inputs (single-paste primary; file refs only on file-access clients)
- Recommendations outside pm-skills (jp-library, etc.)
- A sub-agent variant (defer until usage shows value)

---

## Execution phases

The full 11-phase build is in [`implementation-plan.md`](implementation-plan.md). Summary:

| Phase | What | Status |
|---|---|---|
| 0 | Spec adversarial review (Codex, 2 rounds) | COMPLETE 2026-05-28 |
| 1 | SKILL.md authoring | DONE 2026-05-31 |
| 2 | TEMPLATE.md (`references/`) | DONE 2026-05-31 |
| 3 | EXAMPLE.md (`references/`, Complicated) | DONE 2026-05-31 |
| 4 | 2 more examples (`examples/`, Complex x2) | DONE 2026-05-31 |
| 5 | References (frameworks, tiers), catalog script + generated catalog, Cynefin fixtures | DONE 2026-05-31 |
| 6 | Slash command | N/A - no per-skill commands post-v2.22.0 (wrapper deletion) |
| 7 | Local eval pass (mechanical AC + fixture scoring) | PARTIAL - structural/mechanical checks green; runtime fixture scoring not yet executed |
| 8 | Cross-client smoke test (Claude Code + Codex CLI) | PENDING - needs live run |
| 9 | Pre-tag validator bundle (`--strict`) | PARTIAL - count-consistency + structural validators green; full bundle pending |
| 10 | Release prep (changelog, counts, release notes, manifests) | DONE 2026-05-31 |
| 11 | Tag and ship | PENDING - awaiting maintainer go |

---

## Count impact (audit before tagging)

This release takes the catalog from **63 to 64 skills**, and specifically **foundation from 8 to 9**:

- Before: 30 phase + 8 foundation + 10 utility + 15 tool = 63
- After: 30 phase + **9 foundation** + 10 utility + 15 tool = **64**

Per the stale-aggregate-counter rule, the ship commit MUST re-derive every counter that states a total or breakdown: `CLAUDE.md`, `MEMORY.md`, `AGENTS.md`, `README.md`, `QUICKSTART.md`, `docs/internal/project-structure.md`, and any docs-site page that cites the count. The `check-count-consistency` validator (Phase 9.2) is the backstop.

Note: v2.22.0 renames the existing skills but does not change the count or the classification breakdown, so the 63 baseline holds at the v2.23.0 entrance.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Built before v2.22.0 ships, so recommended skill names are stale | Low | High | Hard entrance gate; do not start Phase 1 until v2.22.0 is tagged |
| Skill produces fluent-but-shallow plans (missing/fabricated evidence) | Medium | High | Structural evidence (Step 0 ledger + inline Source + exact-substring AC #4); Phase 7.7 fabrication probe |
| Cynefin collapses to Complicated for everything | Medium | High | Decision-rule block in Section 2; labeled fixture set (AC #8) distinct from shipped examples |
| Routing names a hallucinated or stale skill | Low-Medium | Medium | Name-safety rule + AC #7 (every Section 7 name exists in catalog/embedded list) |
| Completeness-first invites bloat | Medium | Medium | Hard word backstop (AC #10) + Section 7 capped at top 3 prompts |
| Count breakdowns left stale at ship | Medium | Low | Count-impact section above + `check-count-consistency` in Phase 9 |
| Codex flat-namespace collision on `prioritized-action-plan` | Low | Low | Distinctive name; Phase 8.2 collision check |

---

## Exit criteria (definition of done)

1. All 13 mechanical acceptance criteria in the spec pass.
2. The skill ships with all companion files listed above.
3. Pre-tag validator bundle passes `--strict`; count breakdowns updated to 64 / foundation 9.
4. Cross-client smoke test passes on Claude Code and Codex CLI.
5. v2.23.0 tagged, GitHub Release published and marked Latest, marketplace install pulls the new version.
6. The skill has been run on at least one real input and produced a coherent, evidence-grounded plan.
7. This plan flipped to SHIPPED with the release date; `CONTEXT.md` currency marker updated.

---

## Decisions locked (2026-05-28)

| ID | Decision | Value |
|---|---|---|
| D1 | Name | `foundation-prioritized-action-plan` (reconciled 2026-05-31; bare name assumed the deferred short-name rename) |
| D2 | Shape | Single skill (not a family) |
| D3 | Classification | foundation, category `planning` |
| D4 | Engine | TOC + Cynefin (OODA cut) |
| D5 | Output weight | 9 sections, completeness-first, hard word backstop |
| D6 | Evidence | structural: source ledger + inline Source + exact-quote check |
| D7 | Routing | 3-tier recommendable model, hybrid breadth, name-safe fallback |
| D8 | Timing | v2.23.0, hard-gated on v2.22.0 shipping |
| D9 | Cross-skill invocation | deferred (out of scope) |

Full rationale: the strategy brief (discovery) and the spec dispositions table (post-review). This master plan is the execution-level authority for v2.23.0.
