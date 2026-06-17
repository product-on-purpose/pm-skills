# v2.28.0 Release Plan (stub)

**Status:** STUB (created 2026-06-15 at v2.27.0 G4). Not scoped; a holding place for candidates carried out of v2.27.0. Promote to PROPOSED when a cycle is chosen.
**Owner:** Maintainers
**Type:** TBD (likely MINOR).
**Previous:** v2.27.0 SHIPPED 2026-06-15 (the provable-quality release; tag `ee7ff9d5`).

## Candidate scope (recorded, NOT committed)

Carried from the v2.27.0 eval program (`docs/internal/release-plans/v2.27.0/`):

| Candidate | Origin | One-line intent |
|---|---|---|
| Output-eval "structural value" follow-through | M-33 informed-control finding (`records/output-eval-informed-20260615.md`) | The informed control showed the skills' measured value is primarily their TEMPLATE, not the prose instructions, for these artifact types under a strong model. Decide what this means for skill design (invest in templates + triggers + boundaries over long prose) and whether to re-test on a weaker generation model where instructions may matter more. |
| B-5 + B-7 body-change reminders | M-31/M-33 deferred halves | The trigger description-change reminder (B-5) and the output-eval body-change reminder (B-7 second half) - both need PR-diff context (advisory flag when a roster skill's description/body changes without a recorded eval re-run). |
| 3 VOID instruments residual | M-33 batch + re-look | `deliver-release-notes` stays VOID even on a harder scenario (genuine low-marginal-value artifact type); `measure-experiment-design` skill-arm sample-size math is weaker than a template-only control (worth a clean G>=3 look). Not skill-body fixes; instrument/scenario follow-ups. |
| utility-pm-critic fixture relabeling | Live trigger-lane finding (`records/router-eval-live-20260615.md`); re-examined during v2.27.1 scoping | `utility-pm-critic` attracts critique-framed prompts the domain-skill fixtures label as TRIGGER (e.g. foundation-okr-writer's "Critique this OKR draft..." via its Audit-Only mode; deliver-edge-cases' "Review this PRD and enumerate the boundary and failure scenarios..."). **Sharpened problem (v2.27.1):** this is not a mechanical relabel but a TAXONOMY decision - does artifact-specific critique belong to a domain skill's audit/review mode or to the general `utility-pm-critic`? Compounding factor: `utility-pm-critic` has **no `evals/trigger-fixtures.json` of its own**, so colliding prompts have no "correct" home in the roster. **Why deferred from v2.27.1:** the recall effect is only provable by a live router re-run (Messages API key required; the prior key was burned), and a blind relabel into an eval-integrity patch would violate "evidence gates over assertions." **v2.28.0 work:** (1) decide the audit-vs-critic boundary; (2) author `utility-pm-critic` trigger fixtures; (3) relabel the colliding domain-skill prompts accordingly; (4) re-run B-3 collision probe live to confirm. |
| Router-eval drift-threshold tuning | M-31 B-2, 2nd data point recorded | "any validation drop = regression" is too tight for ~4-query validation sets (25% quantization); tune after a few more baseline runs. |
| check-count-consistency: police classification sub-counts | v2.27.0 doc-currency audit | The validator only checks top-line totals, not `<Word> Skills (N)` sub-counts (it skips them), so a published page drifted (26/8/6) while CI stayed green. Extend it. |
| Derived surfaces, later phases (M-32 Phase 2) | spec_derived-surfaces D-D | Landing-card + README-number generation, a static Skill Finder, per-skill output schemas, build-skill-catalog.py consolidation onto the manifest. |
| WS-A4 skills-ref CI lane (#97) | v2.26.0/v2.27.0 carry | Normalize skill metadata typing toward the agentskills.io string-map rule; wire `skills-ref validate` over `skills/*` advisory, promote when green. |
| Promote B-7 asset gate to enforcing | M-33 | Once the output-eval roster is pinned, flip `check-output-eval-assets` advisory -> enforcing (like B-4). |
| Community-marketplace resubmit (M-25) | v2.27.0 best-effort | Still BEST-EFFORT; resubmit with a recorded payload/date/response. Never a tag gate. See `docs/internal/efforts/M-25-community-marketplace-submission.md`. |

## Sequencing

Not yet sequenced. When a cycle is chosen, promote the relevant rows to a committed Scope table and write companion specs as needed.
