# v2.27.0 Release Plan: STUB (staged at v2.26.0 G4)

**Status:** STUB (created 2026-06-10 at v2.26.0 post-tag hygiene). Scope NOT committed; candidates below were deferred from v2.26.0 planning and execution. Spec work has not started.
**Owner:** Maintainers
**Type:** TBD (likely MINOR if the derived-surfaces theme lands; the reserved breaking MAJOR v3.0.0 carries ONLY the marketplace old-path retirement, trigger-gated by plugin #2)

## Candidate scope (recorded, not committed)

| Candidate | Origin | One-line intent |
|---|---|---|
| **Derived-surfaces theme** | v2.26.0 plan deferred section; audit follow-up #5 + issue #87 (open since January) | Generate the hand-synced surfaces (AGENTS.md catalog section, landing cards, skill-manifest.json, static Skill Finder, optional output schemas) from the resource index instead of hand-syncing; structurally kills the WS-A1/A2 drift class. The v2.26.0 count sweeps re-confirmed the cost of hand-syncing (~20 surfaces found beyond the plan list). |
| **Trigger-accuracy eval harness** | 2026-06-09 audit strategic item; v2.26.0 plan deferred section | Per-skill positive/negative prompt fixtures scored offline; advisory lane like M-30, promoted per-invariant. Sequenced AFTER F-12 Batch 0 (done), so it tests the corrected corpus. |
| **WS-A4: skills-ref CI lane (closes #97)** | v2.26.0 WS-A row, deliberately left open (agent:codex, M-sized) | Normalize skill `metadata` typing toward the agentskills.io string-map rule, then wire `skills-ref validate` over `skills/*` as advisory CI; promote when green. |
| **Smoke-runbook CI wrapper (advisory)** | v2.26.0 agentic-smoke-runbook "why not CI" section | Optional `workflow_dispatch` lane that automates the runbook (ANTHROPIC_API_KEY secret, LLM-judged); automates the procedure, never replaces the recording rule. |
| **Orchestrator Mode A native smoke + interactive multi-checkpoint run** | v2.26.0 smoke-gate caveats | The recorded PASS covered Mode B headless; Mode A native and a single continuous interactive engine across checkpoints remain unexercised. |
| **validate-skill commands drift** | F-12 Batch 1 triage note (PR #192) | `utility-pm-skill-validate`'s Tier-1 `command-exists` check predates the v2.22.0 wrapper deletion; align the check list with current conventions. |
| **F-12 "When NOT to Use" beyond the cohort** | F-12 spec deferred item | Adopt for non-cohort skills if the convergence proves high-value in practice. |
| **_workflows/ scar sweep** | Noticed during F-14 exemplar reads | `_workflows/*.md` still carry spaced-period scars (e.g. sprint-planning.md See Also); the guard's ROOTS cover skills/ and site docs but not `_workflows/`. Sweep + extend scope. |

## Carried environment/tooling items

- Codex sandbox pwsh exit -1 diagnosis (`/codex:setup`); would restore native `/codex:review` (currently worked around via the adversarial mechanism + no-shell/no-GitHub focus).
- Engine filesystem-check hardening for the plugin-cache recursive-Glob quirk recorded in the smoke runbook.

## Notes

- This stub satisfies the release runbook's G4 sub-checks 5-6 (next-cycle stub + follow-ups logged). Convert to a real plan via the standard pipeline (plan -> specs -> implementation plans -> review loop) before any build.
