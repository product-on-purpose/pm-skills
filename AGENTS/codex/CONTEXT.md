# Codex Agent Context

> **Currency marker: v2.12.0 (2026-05-03).** Required for `check-context-currency` CI; updated at each release-tag time alongside `AGENTS/claude/CONTEXT.md`.

## Status

This file is intentionally minimal as of 2026-05-05 (v2.13.0 cycle, Bucket B.5).

Codex usage in this repo is now scoped to **Phase 0 adversarial review** (the cross-LLM review loop codified in v2.11.0 and operated via the `/jp-ai-review` skill). It is no longer used for primary execution work, so this file does not maintain a per-session execution snapshot.

For all current pm-skills state - active work, recent commits, decisions, validator inventory, release status - read **`AGENTS/claude/CONTEXT.md`** instead. That file is the canonical project context across both agents.

## When to update this file

Three triggers, in priority order:

1. **Codex execution scope change.** If Codex resumes primary execution work in this repo (beyond adversarial review), restore the historical structure: per-session execution snapshot + immediate next steps + reference links.
2. **Phase 0 review protocol change.** If the `/jp-ai-review` skill or the cross-LLM review loop pattern materially evolves, document the new contract here.
3. **Release tag time.** Bump the currency marker above to match the just-tagged CHANGELOG version. The marker is what `check-context-currency` validates.

## Reference

- Canonical project context: `AGENTS/claude/CONTEXT.md`
- Cross-agent decisions: `AGENTS/DECISIONS.md`
- Cross-LLM review protocol: `docs/internal/cross-llm-review-protocol.md`
- Phase 0 Adversarial Review Loop template: `docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md`
- Codex local technical decisions (if any): `AGENTS/codex/DECISIONS.md`
- Codex session logs (if any): `AGENTS/codex/SESSION-LOG/`

## History

This file was actively maintained 2026-01 through 2026-03-22 (v2.6 - v2.7.0 era) when Codex shared primary-execution duties with Claude. It carried per-session execution snapshots, immediate next steps, and detailed handoff notes during that period. Active maintenance was deprioritized when Codex's role narrowed to Phase 0 adversarial review (v2.11.0). The file received currency-marker bumps only through v2.12.0. The 2026-05-05 vestigial-redirect rewrite (Bucket B.5 of v2.13.0) made the deprioritization explicit and removed stale execution content. Git history (`git log -- AGENTS/codex/CONTEXT.md`) preserves the full prior content if needed.
