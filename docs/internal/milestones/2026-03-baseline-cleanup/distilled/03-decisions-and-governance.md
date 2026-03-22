# 03 — Decisions and Governance Model (Distilled)

Date: 2026-03-22
Status: Active reference — these decisions are current until explicitly reopened
Sources: `plan_codex-gpt-5.4.md` (locked decisions), `execution_shared-claude-codex.md`, Codex review feedback

## What This Document Is

This is the distilled governance model that the March 2026 baseline cleanup established. It extracts the locked decisions and artifact placement rules from across the planning and execution documents into one reference.

These decisions were settled during the cleanup and should not be revisited casually. Reopening any of them requires explicit owner action.

## Locked Decisions

### 1. Canonical Homes

| Artifact type | Canonical home | Not canonical |
| --- | --- | --- |
| Backlog state (open/closed, priority, milestone) | GitHub issues | `_NOTES/`, `docs/internal/backlog-canonical.md` |
| Durable effort context | `docs/internal/efforts/<effort-id>-<slug>.md` | `_NOTES/efforts/` (local scratch only) |
| Internal release governance | `docs/internal/releases/vX.Y.Z/**` | `docs/internal/release-planning/`, `docs/internal/delivery-plan/` |
| Public release communication | `docs/releases/Release_vX.Y.Z.md` | n/a |
| Agent-specific continuity | `AGENTS/*/CONTEXT.md`, `AGENTS/*/DECISIONS.md` | n/a |
| Cross-agent decisions | `AGENTS/DECISIONS.md` | n/a |
| Local working material | `_NOTES/**` | Never treat as canonical in tracked files |

### 2. Agent Surface Rules

- Both `AGENTS/claude/` and `AGENTS/codex/` are first-class
- No central `AGENTS/CONTEXT.md` — each agent owns its own context
- Neither agent edits the other's `AGENTS/<agent>/CONTEXT.md` unless explicitly instructed
- Automated currency check covers all `AGENTS/*/CONTEXT.md` files

### 3. Shipped Claude-Facing Artifacts

Only two tracked files are intentionally shipped as Claude-facing:
- `.claude-plugin/plugin.json`
- `.claude/pm-skills-for-claude.md`

Broader `.claude/**` content (commands, skills under `.claude/`) is not treated as baseline truth. Changes to wrap-session or other `.claude/` workflows should go through a focused design effort.

### 4. Deferred Items (Acknowledged, Not Abandoned)

| Item | Status | Gate |
| --- | --- | --- |
| wrap-session redesign (A-5) | Deferred | Requires focused effort, not incremental patching |
| `DECISIONS.md` best-practice guide | Deferred | Low urgency; address during wrap-session redesign |
| `.claude-plugin/` removal | Deferred | Product decision, not a cleanup task |

## Artifact Placement Rules

### Where Things Go

| Stage | Where | Tier |
| --- | --- | --- |
| Research, exploration, rough drafts | `_NOTES/efforts/<effort-id>/` | Local-only |
| Durable scope, key decisions, artifact links | `docs/internal/efforts/<effort-id>-<slug>.md` | Tracked |
| Release checklists, governance artifacts | `docs/internal/releases/vX.Y.Z/` | Tracked |
| User-facing release notes | `docs/releases/Release_vX.Y.Z.md` | Tracked |
| Blocking decisions | `AGENTS/DECISIONS.md` or agent-specific `DECISIONS.md` | Tracked |
| Session scratch | `_NOTES/**`, `AGENTS/*/SESSION-LOG/` | Local-only |

### Promotion Rule

Promote from `_NOTES/**` to tracked locations when both conditions are true:
1. The content is stable enough that future collaborators should cite it
2. Collaborators without local workspace access would need it

Promotion targets: `docs/internal/efforts/**`, `docs/internal/releases/**`, `AGENTS/*/DECISIONS.md`, `AGENTS/DECISIONS.md`.

### Hard Rules

- No tracked file may call a `_NOTES/**` path canonical
- Tracked docs hold durable context; backlog state lives in GitHub issues
- Do not create a second tracked feature-planning tree alongside `docs/internal/efforts/**`
- Public-facing files (README, CHANGELOG, CONTRIBUTING) must never reference gitignored paths

## Effort Brief Convention

Standard format (established by A-11, conventions from C-2):

```markdown
# [{ID}] {Name}

Status: Active | Shipped | Cancelled
Milestone: vX.Y.Z
Issue: #{number}

## Scope
## Key Decisions
## Artifacts Produced
## PRs
```

- GitHub issue owns lifecycle state (open = in progress, closed = shipped)
- Brief owns durable context GitHub issues cannot capture
- Working material stays in `_NOTES/efforts/<effort-id>/`

## Automated Infrastructure

| Tool | What it does | Where |
| --- | --- | --- |
| `scripts/check-context-currency.sh/.ps1` | Compares `AGENTS/*/CONTEXT.md` versions against CHANGELOG | Runs in CI on every PR |
| `validation.yml` advisory step | Surfaces staleness warnings in Checks tab | Non-blocking (`continue-on-error: true`) |

**Invariant to maintain:** The current version reference must appear before any historical version references in each CONTEXT.md file. The detection script uses the first `vX.Y.Z` match.

## Codex Review Feedback — What Held Up

The Codex review of Claude's execution plan made several assessments. With the benefit of execution hindsight:

| Codex assessment | Outcome | Note |
| --- | --- | --- |
| A-1 through A-4 safe to execute immediately | Correct | All four ran without issues on day one |
| A-5 blocked on `.claude` baseline decision | Correct | Deferred for the right reasons |
| A-8/A-9 are second-wave, not first-wave | Correct | Running before C-3 would have created CI noise |
| A-11 should wait for effort-placement sign-off | Correct in spirit | Ran after C-2, which established the convention |
| "No cross-dependencies" claim too strong | Correct | The shared coordinator addressed this gap |
| `.claude/**` is an unresolved policy question | Partially correct | OQ1 was closed: only plugin.json and pm-skills-for-claude.md are baseline. The broader `.claude/` content remains deferred, not resolved. |

## Differences from Originals and Reasoning

This document consolidates governance content that was distributed across `plan_codex-gpt-5.4.md` (locked decisions, artifact placement rules, recommended baseline), `execution_shared-claude-codex.md` (locked decisions list), `plan_claude-opus-4.6.md` (tier system, feature workflow placement), and `readme_technical.md` (infrastructure established, effort brief format).

### Structural changes

| Change | Reasoning |
| --- | --- |
| **Extracted governance into a standalone document.** In the originals, governance content was embedded in plan documents and the shared coordinator alongside planning rationale and execution status. | Governance decisions need to be findable on their own. A reader asking "where does X go?" should not have to read a 294-line plan document to find the artifact placement table. Separation also makes it clear which content is durable (governance) versus historical (planning rationale). |
| **Added "Not canonical" column to the canonical homes table.** The Codex plan listed canonical homes but did not explicitly name what was being superseded. | Making the negative space explicit prevents future confusion. A reader who encounters `docs/internal/release-planning/` needs to know it is legacy, not just that `docs/internal/releases/` is the new home. |
| **Consolidated promotion rules and hard rules from both plans.** The Claude plan had a "Promotion Rules" subsection. The Codex plan had a "Promotion Rule" section with "Hard rules." Both said essentially the same thing with slightly different wording. | One canonical set of rules, not two versions with minor wording differences. The distilled version preserves all constraints from both sources. |

### Content changes

| Change | Reasoning |
| --- | --- |
| **Added Agent Surface Rules section.** Agent boundary rules were scattered: the coordinator had a file-boundary rule and a cross-agent reading rule; the Codex plan had OQ3 resolution (no central AGENTS/CONTEXT.md); the technical readme mentioned the invariant the currency check requires. | Consolidating agent rules makes them findable. These rules directly affect how Claude and Codex operate day-to-day. |
| **Added Shipped Claude-Facing Artifacts section.** This was the OQ1 resolution, buried in the Codex plan's Decision Closure Summary table. | The `.claude/` baseline decision has direct implications for wrap-session design and any future `.claude/` changes. Giving it its own section makes the decision visible and its scope clear. |
| **Added effort brief convention with template.** The template was in the technical readme's A-11 section. The conventions were in `docs/internal/efforts/README.md` (created by C-2). | Having the template in the governance document alongside the placement rules creates a self-contained reference. The canonical convention source remains `docs/internal/efforts/README.md`; this is a convenience copy for readers already in the distilled documents. |
| **Added automated infrastructure section.** The currency check details were in the technical readme under A-8 and A-9. | Infrastructure that enforces governance belongs in the governance document. The invariant requirement (current version before historical versions) is a maintenance rule, not an execution detail. |
| **Added Codex review retrospective table.** No original governance document assessed the Codex review's accuracy. | The Codex review influenced the governance model through its sequencing recommendations. Documenting which assessments held up makes the provenance of the governance decisions transparent. |
| **Removed the "What's Working Well" inventory.** The Claude plan had a section confirming skills, commands, bundles, scripts, and docs were all structurally sound. | Positive findings about the product surface are context for planning, not governance. The distilled governance document focuses on rules and decisions, not the state of the codebase. |

## Relationship to Other Documents

- `01-baseline-plan.md` — What was planned and why
- `02-execution-summary.md` — What was done and how
- **This document** — What was decided and what the rules are
- `04-next-steps.md` — What comes next
