# Codex Agent Context

> **Currency marker: v2.18.0 (2026-05-22 SHIPPED).** Required for `check-context-currency` CI; updated at each release-tag time alongside `_agent-context/claude/CONTEXT.md`. v2.18.0 adds four highest-consensus content skills (discover-market-sizing, define-prioritization-framework, discover-journey-map, measure-survey-analysis); catalog 59 to 63 (phase 26 to 30); annotated tag `daf720e`, GitHub Release Latest, tag CI green. v2.17.0 SHIPPED 2026-05-20 (annotated tag at `b6ff373`; GitHub Release published; tag CI green): native Claude Code sub-agent registration (`AGENTS/` to `_agent-context/`, `subagents/` to `agents/`) + frontmatter metadata-nested migration + bash-3.2 validator portability + check-version-references advisory wiring. v2.16.2 SHIPPED 2026-05-19 (post-v2.16.1 audit hygiene fast-patch closing F-P1-02 CONTEXT.md Status refresh + F-P2-01-half check-context-currency.sh wire into pre-tag-validate). v2.16.1 SHIPPED 2026-05-19 (plugin manifest schema patch removing invalid `agents` field; G4 P0 FULL PASS cross-platform attestation). v2.16.0 SHIPPED 2026-05-18T15:05:08Z (tag points at `b4d5172`; GitHub Release at https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0). Previous markers: v2.12.0 (2026-05-03; never updated through v2.13.0 / v2.14.0 / v2.15.x cycles) -> v2.16.0 -> v2.16.1 -> v2.16.2.

## Status

This file is intentionally minimal as of 2026-05-05 (v2.13.0 cycle, Bucket B.5). The minimal posture persisted through v2.14.x and v2.15.x; v2.16.0 retains this posture.

Codex usage in this repo is now scoped to **Phase 0 adversarial review** (the cross-LLM review loop codified in v2.11.0 and operated via the `codex:rescue` plugin in current cycles; the original `/jp-ai-review` skill is deprecated). Codex executed 4 adversarial review passes during v2.16.0 (plan-state review, ship-state review at 9cb81af, pre-tag defect pass at 19a213b, challenge review at 19a213b). Plus Codex CLI 0.128.0 self-administered the GATE B + GATE C cross-client harness at `docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md` to validate the dispatch skill mechanism. Codex is not used for primary execution work, so this file does not maintain a per-session execution snapshot.

For all current pm-skills state - active work, recent commits, decisions, validator inventory, release status - read **`_agent-context/claude/CONTEXT.md`** instead. That file is the canonical project context across both agents.

## When to update this file

Three triggers, in priority order:

1. **Codex execution scope change.** If Codex resumes primary execution work in this repo (beyond adversarial review), restore the historical structure: per-session execution snapshot + immediate next steps + reference links.
2. **Phase 0 review protocol change.** If the `/jp-ai-review` skill or the cross-LLM review loop pattern materially evolves, document the new contract here.
3. **Release tag time.** Bump the currency marker above to match the just-tagged CHANGELOG version. The marker is what `check-context-currency` validates.

## Reference

- Canonical project context: `_agent-context/claude/CONTEXT.md`
- Cross-agent decisions: `_agent-context/DECISIONS.md`
- Cross-LLM review protocol: `docs/internal/cross-llm-review-protocol.md`
- Phase 0 Adversarial Review Loop template: `docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md`
- Codex local technical decisions (if any): `_agent-context/codex/DECISIONS.md`
- Session logs (shared, model encoded in filename): `_agent-context/SESSION-LOG/` (legacy: `_agent-context/codex/SESSION-LOG/`)

## History

This file was actively maintained 2026-01 through 2026-03-22 (v2.6 - v2.7.0 era) when Codex shared primary-execution duties with Claude. It carried per-session execution snapshots, immediate next steps, and detailed handoff notes during that period. Active maintenance was deprioritized when Codex's role narrowed to Phase 0 adversarial review (v2.11.0). The file received currency-marker bumps only through v2.12.0. The 2026-05-05 vestigial-redirect rewrite (Bucket B.5 of v2.13.0) made the deprioritization explicit and removed stale execution content. Git history (`git log -- _agent-context/codex/CONTEXT.md`) preserves the full prior content if needed.
