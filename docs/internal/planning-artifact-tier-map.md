# Planning Artifact Tier Map

Status: Active  
Scope: Repository-wide planning and decision artifacts  
Last updated: 2026-03-15

| Tier | Artifact Pattern | Persistence | Rationale |
| --- | --- | --- | --- |
| Tier 1 | `AGENTS/DECISIONS.md` | Tracked | Cross-agent operating decisions that should survive sessions |
| Tier 1 | `AGENTS/*/CONTEXT.md` | Tracked | Current implementation context required for handoffs |
| Tier 1 | `AGENTS/*/DECISIONS.md` | Tracked | Agent-local durable decision history |
| Tier 1 | `docs/internal/efforts/**` | Tracked | Canonical durable effort briefs and issue/context links |
| Tier 1 | `docs/internal/release-plans/**` | Tracked | Canonical internal release-governance artifacts |
| Tier 1 | `docs/releases/*.md` | Tracked | Public release communication |
| Tier 1 | `CHANGELOG.md` | Tracked | Shipped repo history summary |
| Tier 2 | `AGENTS/*/SESSION-LOG/**` | Ignored | High-volume operational transcripts |
| Tier 2 | `AGENTS/*/TODO.md` | Ignored | Personal task scratchpad |
| Tier 2 | `AGENTS/*/PLANNING/**` | Ignored | Exploratory drafts and superseded plans |
| Tier 3 | `_NOTES/**` | Ignored | Local research, prompts, scratch notes, and drafts |
| Tier 3 | `.claude/**` | Ignored | Local helper material and user-specific setup, except intentionally shipped tracked files |
| Tier 3 | `.obsidian/**` | Ignored | Local PKM workspace |

## Backlog State

GitHub issues own backlog and lifecycle state. Tracked repo docs should link to issues or summarize stable outcomes, not replace issues with a second canonical backlog file.

## Promotion Checklist

Promote Tier 2 or Tier 3 content only when all conditions are true:

1. The information affects work beyond one session.
2. The information is stable enough to cite later.
3. Collaborators without local workspace access would still need it.

Promotion target:

- `docs/internal/efforts/**`
- `docs/internal/release-plans/**`
- `AGENTS/*/DECISIONS.md`
- `AGENTS/DECISIONS.md`

## Legacy Note

`docs/internal/release-planning/**` and `docs/internal/delivery-plan/**` may remain tracked during migration, but they are legacy surfaces rather than the current canonical homes for new planning artifacts.
