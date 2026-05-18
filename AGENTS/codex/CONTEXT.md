# Codex Agent Context

> **Currency marker: v2.16.0 (2026-05-18 SHIPPED).** Required for `check-context-currency` CI; updated at each release-tag time alongside `AGENTS/claude/CONTEXT.md`. v2.16.0 TAGGED + SHIPPED 2026-05-18T15:05:08Z (tag points at main HEAD `b4d5172`); GitHub Release published at https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0. Previous markers: v2.12.0 (2026-05-03; never updated through v2.13.0 / v2.14.0 / v2.15.x cycles) -> v2.16.0 (this update; pre-tag ready state on 2026-05-17; tag-shipped state on 2026-05-18).

## Status

This file is intentionally minimal as of 2026-05-05 (v2.13.0 cycle, Bucket B.5). The minimal posture persisted through v2.14.x and v2.15.x; v2.16.0 retains this posture.

Codex usage in this repo is now scoped to **Phase 0 adversarial review** (the cross-LLM review loop codified in v2.11.0 and operated via the `codex:rescue` plugin in current cycles; the original `/jp-ai-review` skill is deprecated). Codex executed 4 adversarial review passes during v2.16.0 (plan-state review, ship-state review at 9cb81af, pre-tag defect pass at 19a213b, challenge review at 19a213b). Plus Codex CLI 0.128.0 self-administered the GATE B + GATE C cross-client harness at `docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md` to validate the dispatch skill mechanism. Codex is not used for primary execution work, so this file does not maintain a per-session execution snapshot.

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
- Session logs (shared, model encoded in filename): `AGENTS/SESSION-LOG/` (legacy: `AGENTS/codex/SESSION-LOG/`)

## History

This file was actively maintained 2026-01 through 2026-03-22 (v2.6 - v2.7.0 era) when Codex shared primary-execution duties with Claude. It carried per-session execution snapshots, immediate next steps, and detailed handoff notes during that period. Active maintenance was deprioritized when Codex's role narrowed to Phase 0 adversarial review (v2.11.0). The file received currency-marker bumps only through v2.12.0. The 2026-05-05 vestigial-redirect rewrite (Bucket B.5 of v2.13.0) made the deprioritization explicit and removed stale execution content. Git history (`git log -- AGENTS/codex/CONTEXT.md`) preserves the full prior content if needed.
