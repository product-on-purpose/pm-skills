# Internal Audits

This folder holds analytical audits of the pm-skills repository. Each audit is a static review producing findings, recommendations, and (where applicable) implementation specifications. Audits are durable knowledge artifacts; they outlive the cycles that consume them.

---

## Active audits (2026-05-03)

| Audit | Scope | Cycle binding |
|---|---|---|
| [`audit_repo-structure_2026-05-01.md`](audit_repo-structure_2026-05-01.md) | `docs/` structure, naming, dual-doc system, drift, refactor patterns | v2.13 input (strong) |
| [`ci-audit_2026-05-03.md`](ci-audit_2026-05-03.md) | `scripts/`, `.github/workflows/`, CI posture, validators, gaps, implementation specifications | v2.13 input (strong) |
| [`branches-pr_2026-05-03.md`](branches-pr_2026-05-03.md) | Local branches, remote branches, open PRs, branch hygiene | Tactical (weak v2.13 binding) |

## Archived audits

[`_archived/`](_archived/) holds predecessor audits superseded by current versions:

- [`_archived/2026-04-18_ci-audit_post-v2.11.0.md`](_archived/2026-04-18_ci-audit_post-v2.11.0.md) - predecessor to `ci-audit_2026-05-03.md`
- [`_archived/2026-05-01_ci-audit_addendum.md`](_archived/2026-05-01_ci-audit_addendum.md) - predecessor to `ci-audit_2026-05-03.md`

When a new audit supersedes an older one, the old version moves here with a "superseded by" banner at the top. Don't delete; preserve history.

---

## The audit + plan pair convention

For strand-level work that has both analytical depth AND cycle-scoped execution, pm-skills uses an **audit + plan pair**.

### Two doc types, two lifecycles

| Doc type | Path pattern | Contents | Lifecycle |
|---|---|---|---|
| **Audit** | `docs/internal/audit/<topic>_<date>.md` | Inventory, findings, patterns analysis, best practices, refactoring opportunities, **implementation specifications**, recommendations | **Durable.** Survives many release cycles. Updated by writing a new audit, not by editing in place. |
| **Plan** | `docs/internal/release-plans/v<X.Y.Z>/plan_v<X.Y>_<strand>.md` | Cycle scope, status tracking, sequencing, CI workflow integration, decisions journal, pre-release verification | **Ephemeral.** Active during cycle, becomes historical record after release tag. |

### Dedup rule

**Each fact lives in exactly one place; the other doc references it.**

- The audit has the spec. The plan references the audit; the plan does NOT duplicate spec content.
- The plan has the status. The audit does NOT track per-cycle status.
- The audit has the analysis. The plan references the audit's findings if relevant; the plan does NOT re-state them.
- The plan has the decisions journal (decisions made during execution). The audit captures durable insights only when promoted from a closed cycle.

### Example pair (v2.13)

- **Audit:** [`ci-audit_2026-05-03.md`](ci-audit_2026-05-03.md) - 16 sections including inventory, patterns, findings, best practices, refactoring, standardization, cross-platform analysis, plan summary, impact analysis, **implementation specifications (Section 16)**, glossary
- **Plan:** [`../release-plans/v2.13.0/plan_v2.13_ci-refactor.md`](../release-plans/v2.13.0/plan_v2.13_ci-refactor.md) - thin execution tracker with status, sequencing, CI workflow integration, decisions journal, pre-release verification

### When to use the pair

Apply the audit + plan pair convention when:

1. **Strand-level work** with multiple discrete items (e.g., 14 CI items, 14 doc-structure items)
2. **Analytical depth needed** (inventory, patterns, best practices, refactoring options)
3. **Cycle-scoped execution** (status tracking, sequencing, decisions journal)
4. **Durable knowledge value** (the audit's findings stay useful beyond the cycle)

If the work is small (<5 items) or purely tactical (no analytical depth), skip the audit and use just the release-plan-folder docs.

### When NOT to use it

- **Simple tasks:** a 1-item bugfix doesn't need an audit. Use a commit message.
- **Per-skill work:** a new skill ships via an effort doc (`docs/internal/efforts/F-XX-name.md`), not via an audit + plan pair.
- **Genuinely tactical work:** branch cleanup, dependency bumps, etc. Use a single tactical doc (e.g., `branches-pr_2026-05-03.md`) without a paired plan.

---

## File naming

Current audit folder uses mixed naming conventions across active files (`<topic>_<date>.md` and `<date>_<topic>.md`). A canonical convention is **deferred** as of 2026-05-03 pending decision; current files retained as-is to avoid churn.

When the canonical convention is decided, update this section and rename existing files in a single dedicated PR.

**Current de facto pattern:** descriptive topic first, then date suffix (`<topic>_<date>.md`). Active audits follow this. Archived audits use a mix.

---

## Related conventions in this repo

- **Release plans:** [`docs/internal/release-plans/vX.Y.Z/plan_vX.Y.Z.md`](../release-plans/) (release coordinator) plus optional strand docs (`plan_vX.Y_<strand>.md`)
- **Effort docs:** [`docs/internal/efforts/F-XX-name.md`](../efforts/) (per-effort planning surface). Reserve for genuinely complex efforts; refactor-cycle work goes in plan tables, not per-item effort docs.
- **Session logs:** [`AGENTS/claude/SESSION-LOG/`](../../../AGENTS/claude/SESSION-LOG/) and [`AGENTS/codex/SESSION-LOG/`](../../../AGENTS/codex/SESSION-LOG/) (per-session continuity)
- **Agent context:** [`AGENTS.md`](../../../AGENTS.md), [`AGENTS/claude/CONTEXT.md`](../../../AGENTS/claude/CONTEXT.md), [`AGENTS/codex/CONTEXT.md`](../../../AGENTS/codex/CONTEXT.md)

---

## Future directions (pending design)

These are convention extensions the maintainer has signaled intent to implement but hasn't yet committed to a structure:

### Architecture Decision Records (ADRs)

A future `docs/internal/decisions/` folder is intended to hold Architecture Decision Records (e.g., Nygard format ADRs) for significant technical decisions affecting system architecture, technology selection, or development patterns.

**Status:** reserved space; design pending. The pm-skills `develop-adr` skill exists for authoring ADR content, but the folder structure and integration with audits/plans is not yet specified.

**Distinction from audits:** ADRs document discrete decisions with their context and consequences. Audits document analytical state and recommendations. An audit might recommend authoring an ADR; the ADR records the decision; future audits reference the ADR.

### Per-skill decision logs

Per-skill decision logs are also under consideration. The location and structure are not yet specified.

**Possible designs** (not committed):

- `skills/<skill-name>/DECISIONS.md` - co-located with the skill, mirrors HISTORY.md pattern
- `docs/internal/decisions/skills/<skill-name>.md` - centralized in the decisions folder
- Append to existing `HISTORY.md` with a Decisions section

To be designed when adoption demand surfaces.

---

## Change log

| Date | Change |
|---|---|
| 2026-05-03 | README authored. Audit + plan pair convention codified after v2.13 CI audit + plan dedup work. ADR and per-skill-decisions future directions noted. |
