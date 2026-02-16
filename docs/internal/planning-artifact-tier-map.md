# Planning Artifact Tier Map

Status: Active  

Scope: Repository-wide planning and decision artifacts  

Last updated: 2026-02-13

| Tier   | Artifact Pattern          | Persistence | Rationale                                            |
| ------ | ------------------------- | ----------- | ---------------------------------------------------- |
| Tier 1 | `AGENTS/DECISIONS.md`     | Tracked     | Cross-agent decision source of truth                 |
| Tier 1 | `AGENTS/*/CONTEXT.md`     | Tracked     | Current implementation context required for handoffs |
| Tier 1 | `AGENTS/*/DECISIONS.md`   | Tracked     | Agent-level durable decision history                 |
| Tier 1 | `docs/releases/*.md`      | Tracked     | Shipped release notes and post-ship reviews          |
| Tier 1 | `docs/internal/release-planning/*.md` | Tracked | Forward release execution plans and checklists |
| Tier 1 | `docs/internal/delivery-plan/**` | Tracked | Canonical blocker decisions and closure-path artifacts |
| Tier 2 | `AGENTS/*/SESSION-LOG/**` | Ignored     | High-volume, low-signal operational transcripts      |
| Tier 2 | `AGENTS/*/TODO.md`        | Ignored     | Personal task scratchpad, frequently stale           |
| Tier 2 | `AGENTS/*/PLANNING/**`    | Ignored     | Exploratory drafts, superseded quickly               |
| Tier 3 | `_NOTES/**`               | Ignored     | Local analysis, prompts, and scratch notes           |
| Tier 3 | `.claude/**`              | Ignored     | Local tool cache and user-specific setup             |
| Tier 3 | `.obsidian/**`            | Ignored     | Local PKM workspace                                  |

## Promotion Checklist

Promote Tier 2 content when all conditions are true:

1. Decision affects behavior beyond one session.
2. Decision affects release scope, compatibility, or contracts.
3. Decision has an owner and date.

Promotion target:

- `AGENTS/*/DECISIONS.md` and, if cross-agent, `AGENTS/DECISIONS.md`.
