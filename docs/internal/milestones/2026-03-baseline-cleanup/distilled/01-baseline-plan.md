# 01 — Baseline Plan (Distilled)

Date: 2026-03-22
Status: Post-hoc distillation of the accepted baseline plan
Sources: `plan_codex-gpt-5.4.md`, `plan_claude-opus-4.6.md`, Codex review feedback

## What This Document Is

This is the distilled, final-state version of the baseline plan that drove the March 2026 cleanup. It merges the Claude and Codex plans into a single coherent reference, incorporates the Codex review feedback that proved valid during execution, and removes the open-question framing that was resolved before work began.

For the original planning artifacts, see `planning-execution/`.

## The Problem

By early March 2026, four categories of drift had accumulated:

1. **Context staleness** — `AGENTS/claude/CONTEXT.md` described v2.3.0 while the repo was at v2.6.1. Seven releases of context were invisible to every new session.
2. **Documentation rule violation** — `CHANGELOG.md` referenced a gitignored `_NOTES/` path, violating CLAUDE.md rules.
3. **Governance model mismatch** — Internal policy docs described two different canonical models. The accepted model (efforts + releases + GitHub issues) was decided but not propagated.
4. **Contributor doc staleness** — Schema docs taught `metadata.version` instead of root `version`; skill counts were wrong; speculative helper commands were listed as in-progress.

The product surface (skills, commands, bundles, scripts) was sound. The problem was entirely in the maintenance layer.

## The Accepted Model

These decisions were locked before execution began:

| Decision | Resolution |
| --- | --- |
| Backlog state | GitHub issues |
| Durable effort context | `docs/internal/efforts/<effort-id>-<slug>.md` |
| Local working material | `_NOTES/**` (never canonical) |
| Internal release governance | `docs/internal/releases/vX.Y.Z/**` |
| Agent surfaces | Both `AGENTS/claude/` and `AGENTS/codex/` first-class |
| Shipped Claude artifacts | Only `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md` |
| wrap-session | Deferred — later focused effort, not this pass |

## Priority Sequence

The plan established six sequential outcomes. Codex review feedback refined the sequencing by correctly identifying that:

- Policy docs must be corrected first (downstream docs inherit the model)
- Agent continuity refresh must precede automated currency checks (to avoid CI noise)
- Effort tracking should build on established conventions, not create structure from scratch

Final accepted sequence:

| Seq | Outcome | Why this order |
| --- | --- | --- |
| 1 | Rewrite policy docs | Foundation — everything else inherits from these |
| 2 | Consolidate release governance + effort entry points | Creates the canonical homes downstream work needs |
| 3 | Refresh agent continuity + shared decisions | Prerequisite for automated detection |
| 4 | Align contributor docs to shipped schema | Stable model to teach |
| 5 | Align public/reference docs | Stable model to reflect |
| 6 | Clean remaining release/sample artifacts | Closes the loop |

## Scope Boundaries

**In scope:** Fix drift, establish automation, normalize governance, align docs.

**Out of scope:** Archive cleanup, new features, wrap-session redesign, pm-skills-mcp changes, cross-project abstractions.

## Codex Review Integration

The Codex review of Claude's execution plan (`execution_claude-opus-4.6_reviewed-by-codex.md`) made several calls that proved correct in practice:

- **A-5 deferral was right.** The wrap-session workflow lives under `.claude/` with no canonical tracked equivalent. Patching it during baseline cleanup would have hardened the wrong model. Deferred correctly.
- **A-8/A-9 as second-wave was right.** Running the currency scripts before agent contexts were current would have created false CI failures from day one. The sequencing through C-3 first was the critical coordination point.
- **A-11 gating on C-2 was right.** Having the effort directory and README conventions established before creating brief files meant A-11 built on a pattern rather than inventing one.
- **Cross-dependency acknowledgment was valid.** The claim of "no cross-dependencies" between Claude and Codex workstreams was too strong. The shared coordinator document addressed this by making dependencies explicit.

See `03-decisions-and-governance.md` for the governance model that emerged. See `04-next-steps.md` for what this baseline enables.
