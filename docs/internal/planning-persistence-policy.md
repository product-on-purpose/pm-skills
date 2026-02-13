# Planning Persistence Policy

Status: Active  
Owner: Maintainers  
Last updated: 2026-02-13

## Purpose

Define which planning artifacts are durable (tracked in git) versus local/ephemeral (ignored), so collaborators share decision-critical context without bloating repo history.

## Policy Summary

### Tier 1: Required and durable (tracked)
- `AGENTS/DECISIONS.md`
- `AGENTS/*/CONTEXT.md`
- `AGENTS/*/DECISIONS.md`
- `docs/releases/*.md`
- `CHANGELOG.md`

### Tier 2: Working-state local artifacts (ignored)
- `AGENTS/*/SESSION-LOG/**`
- `AGENTS/*/TODO.md`
- `AGENTS/*/PLANNING/**`
- `AGENTS/codex-5.2/**` (temporary historical workspace exception)

### Tier 3: Local notes and scratch (ignored)
- `_NOTES/**`
- `.claude/**` (except shared defaults already tracked)
- `.obsidian/**`

## Promotion Rule

If a Tier 2 planning artifact contains a decision that affects release behavior, copy a concise summary into:
1. `AGENTS/*/DECISIONS.md` (agent-local decision log), and
2. `AGENTS/DECISIONS.md` (cross-agent decision index), when relevant.

Do not promote raw working notes; promote only finalized decision outcomes.

## Governance Checks

Before release:
1. Confirm decision-impacting items are in tracked decision files.
2. Confirm `.gitignore` reflects Tier 2 and Tier 3 rules.
3. Confirm release docs link to tracked decision records.
