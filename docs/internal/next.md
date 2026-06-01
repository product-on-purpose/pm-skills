# Next: docs/internal Restructure

Status: Docs landed on `main` (2026-05-31, `804353d`); **execution pending maintainer review**
Owner: Maintainers
Full session detail: `_agent-context/SESSION-LOG/2026-05-31_22-45_claude_internal-docs-restructure.md` (local, gitignored)

## What happened (succinct)

A full `docs/internal/` information-architecture audit + restructure design produced four interlocking docs (all on `main`). The diagnosis: strong written conventions, weak enforcement - `efforts/` runs two competing schemes, `backlog-canonical.md` violates the repo's own "no second canonical backlog" rule, 0 of 64 skills have a `HISTORY.md`, and the root has no index. The design fixes each by consolidating to one home per concern, naming one authority where two compete, and adding a few CI gates. **No file operations were executed; the playbook is a proposal.**

Decisions locked (rationale in `restructure-plan_2026-05-31.md` Section 1):

- **D1** keep `release-plans/vX.Y.Z/` (a rename is a verified 533-ref / 180-file sweep for zero gain)
- **D2** GitHub issues canonical + a generated read-only `backlog-index.md`
- **D3** birth-stub `HISTORY.md` for all 64 skills + enforcing CI
- **D4** tracked `_archive/` via `git mv`
- **D5** efforts scratch -> gitignored `_NOTES/`, durable history -> `_archive/`, duplicates deleted

## Documents to review

| # | Document | Read it to... | Focus on | Length |
|---|----------|---------------|----------|--------|
| 1 | `docs/internal/restructure-plan_2026-05-31.md` | **Decide and act.** This is the one that proposes file operations. | Section 1 decisions table, Section 2 target layout, Section 5 phases, Section 6 "recommended first move" | Medium |
| 2 | `docs/internal/audit/2026-05-31_audit-internal.md` | **Understand why.** The evidence base behind every recommendation. | Executive summary (7 findings) + the scorecard table; skim the per-subsystem detail | Long |
| 3 | `docs/internal/backlog.md` | **Approve the GH-issues reform.** Only if D2 (issues-canonical + generated index) matters to you now. | Sections 2-3 (model + issue template), Section 5 reconciled snapshot, Section 7 checklist | Medium |
| 4 | `docs/internal/roadmap.md` | **Set forward direction.** Least urgent - strategy, not cleanup. | Section 1 thesis, Section 2 horizons table, Section 6 sequencing ("if you do only three things") | Medium |

**Ten-minute path:** read just Section 1 (decisions) and Section 6 (first move) of the restructure plan.

## Recommended first step

**Phase 1 only** - add `docs/internal/README.md` (the routing index whose absence is the single worst finding) plus the `governance/`/`reference/` scaffold. Pure addition, no moves, risk-free, independent of everything else.

## To confirm before building roadmap items

- The `pm-critic` auto-dispatch mechanism (a command hook invoking the sub-agent).
- Whether per-skill `model` frontmatter is supported.

(All other plugin primitives in the roadmap were verified against `code.claude.com/docs` on 2026-05-31.)
