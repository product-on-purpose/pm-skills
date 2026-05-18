---
title: Using Sub-Agents
description: User-facing overview for invoking pm-skills sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor). Covers Claude Code native invocation, dispatch skill invocation on non-Claude clients (Codex, Cursor, Windsurf, Copilot, Gemini), and maintainer operations.
---

## Table of Contents

- [Quick Reference](#quick-reference)
- [4 Native Invocation Patterns (Claude Code)](#4-native-invocation-patterns-claude-code)
- [Cross-Client Invocation via Dispatch Skills](#cross-client-invocation-via-dispatch-skills)
- [Maintainer Operations](#maintainer-operations)
- [Common Workflows](#common-workflows)
- [Troubleshooting](#troubleshooting)
- [Related Documentation](#related-documentation)

## Quick Reference

| Sub-agent | Slash command | When to use |
|---|---|---|
| `pm-critic` | `/pm-critic [optional path]` | After producing a PM artifact (PRD, OKR set, persona, etc.) - get adversarial review with P0/P1/P2/P3 findings |
| `pm-skill-auditor` | `/pm-audit-repo [--scope] [--severity-floor]` | Pre-release governance audit or repo-health check |
| `pm-changelog-curator` | `/pm-draft-changelog [--since-tag] [--target-version]` | Release prep: draft CHANGELOG from git log |
| `pm-release-conductor` | `/pm-release v{X.Y.Z} [--dry-run]` | Walk the full 6-gate release runbook |

All four are documented in [`docs/reference/runtime-components.md`](../reference/runtime-components.md) catalog with full metadata.

## 4 Native Invocation Patterns (Claude Code)

### Pattern 1: Proactive auto-delegation (pm-critic only)

`pm-critic` has `description: use proactively...` in its frontmatter. Claude Code's intent classifier matches it after PM-artifact-producing skills complete:

```
You: /deliver-prd "auth feature"
Claude: [produces PRD draft]
        [pm-critic auto-fires in fresh context]
        I have reviewed your PRD. 3 P1 findings to address:
        F-01: Success metric is non-falsifiable...
```

The proactive trigger fires after: deliver-prd, foundation-meeting-recap, foundation-okr-writer, foundation-persona, foundation-lean-canvas, discover-interview-synthesis, define-problem-statement, define-hypothesis, deliver-edge-cases, deliver-user-stories, deliver-acceptance-criteria, iterate-retrospective, iterate-lessons-log, and other Triple Diamond phase skills.

### Pattern 2: Explicit slash command (all 4 sub-agents)

Each sub-agent has a companion slash command:

```
/pm-critic                            # Reviews the most recent artifact in session context
/pm-critic docs/specs/my-prd.md       # Reviews the specified artifact
/pm-audit-repo                        # Runs the full repo audit
/pm-audit-repo --scope changed        # Audit only working-tree-changed files
/pm-draft-changelog                   # Drafts entries since the most recent tag
/pm-draft-changelog --since-tag v2.15.0 --target-version v2.16.0
/pm-release v2.16.0 --dry-run         # Rehearse the release flow
/pm-release v2.16.0                   # Live release
```

### Pattern 3: @-mention (3 sub-agents; not conductor)

@-mention guarantees invocation:

```
@agent-pm-critic please review this PRD
@agent-pm-skill-auditor audit since v2.15.0
@agent-pm-changelog-curator draft since v2.15.0
```

The conductor (`pm-release-conductor`) does NOT support @-mention because release operations are too consequential for ambient spawning. Explicit `/pm-release v{X.Y.Z}` is required.

### Pattern 4: Sub-agent chain (conductor -> auditor + curator)

The conductor automatically chains to children at specific gates:

- **G0 (Pre-tag readiness)** -> `pm-skill-auditor`
- **G2 (Version bump + CHANGELOG prep)** -> `pm-changelog-curator`
- **G2.5 (Re-verify)** -> `pm-skill-auditor` again on the new HEAD

Chain depth caps at 2 levels (per master plan D14). Auditor and curator do not chain further.

## Cross-Client Invocation via Dispatch Skills

On non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI), invoke the dispatch skill instead of the native sub-agent:

```
/utility-pm-critic [optional path]
/utility-pm-skill-auditor
/utility-pm-changelog-curator
/utility-pm-release-conductor v{X.Y.Z}
```

The dispatch skill detects runtime:

- **Claude Code:** dispatches to the native sub-agent via `@agent-pm-{role}` syntax
- **Non-Claude clients:** reads `subagents/pm-{role}.md` and executes the system prompt inline

Output is structurally identical (layered output per master plan D26: full findings/draft + Status Summary prose + Status YAML block).

**Functional gaps on non-Claude clients (acceptable per single-tool user assumption from D30):**

- **No proactive trigger.** The auto-fire after PM-artifact-producing skills is a Claude Code frontmatter feature. On non-Claude clients, invocation is explicit-only.
- **No `.claude/agents/` override.** Per-user agent dir is Claude-Code-specific. Edit the dispatch skill SKILL.md locally instead.

The dispatch mechanism was VALIDATED on Codex CLI 0.128.0 on 2026-05-17 (GATE B + C PASS per [master plan D30](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/plan_v2.16.0.md); evidence at [`gate-test-results_2026-05-17_codex.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md)). Cursor, Windsurf, Copilot CLI, and Gemini CLI are untested but expected to work; the [`maintainer-gate-testing-codex.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) harness is re-runnable on any client for cross-client verification. If a specific client cannot reliably execute the inline pattern, fall back to either codex-rescue (for Claude Code + Codex CLI users) or manual reading of `subagents/{name}.md`.

## Maintainer Operations

Three sub-agents are maintainer-focused:

### `pm-skill-auditor` standalone

Run pre-release for a governance check, or anytime for repo health:

```
/pm-audit-repo
```

Output: full findings report + aggregate counter audit + Status Summary + Status YAML. P0 findings are release-blockers; P1+ are surfaced for judgment. The audit invokes the full validator suite via `scripts/pre-tag-validate.{sh,ps1}` plus the 14-check cross-cutting catalog.

### `pm-changelog-curator` standalone

Run during release prep to draft CHANGELOG entries:

```
/pm-draft-changelog --since-tag v2.15.0 --target-version v2.16.0
```

Refuses on dirty working tree unless `--committed-only` is passed (acknowledges uncommitted release-prep changes will be silently omitted). Output: layered CHANGELOG draft with hidden justification comments for maintainer audit.

### `pm-release-conductor` standalone

The conductor IS the release flow; standalone invocation is the only path:

```
/pm-release v2.16.0           # Live
/pm-release v2.16.0 --dry-run # Rehearse without tag + push
```

Walks 6 gates with chain composition. Refuses bypass attempts. Refuses to tag any SHA other than the one G2.5 captured (prevents broken-tag class of bug per master plan D22).

## Common Workflows

### Workflow 1: PRD authoring with adversarial review

```
You: /deliver-prd "auth feature for B2B users"
Claude: [produces PRD]
Claude: [pm-critic auto-fires; returns P0/P1/P2/P3 findings]
You: [review findings; decide to revise]
You: /deliver-prd <revised inputs based on findings>
Claude: [produces revised PRD]
Claude: [pm-critic auto-fires again]
[Loop until P0/P1 cleared]
```

### Workflow 2: Pre-release governance audit

```
You: /pm-audit-repo --severity-floor P1
Claude: [pm-skill-auditor runs full audit]
        [returns layered output with findings + aggregate counter audit]
You: [resolve any P0 findings; defer P1/P2/P3 as appropriate]
You: /pm-audit-repo --severity-floor P1
[Re-run until clean]
```

### Workflow 3: Full release with chain composition

```
You: /pm-release v2.16.0
Claude: [pm-release-conductor starts G0]
        [chains to pm-skill-auditor; returns audit Status YAML]
        [G0 PASS - proceed?]
You: yes
[Each gate prompts for confirmation]
[G2 chains to pm-changelog-curator for draft]
[G2.5 commits + re-chains to auditor]
[G3 tags G2.5-captured SHA on maintainer confirmation]
[G4 post-tag hygiene; P0 sub-checks block "Release complete" if failed]
Claude: Release complete: v2.16.0
```

### Workflow 4: Dry-run release rehearsal

```
You: /pm-release v2.16.0 --dry-run
Claude: [walks all 6 gates without actual tag + push at G3]
Claude: NOT RELEASABLE - dry run
        All 6 gates would PASS in live mode.
```

## Troubleshooting

### Problem: pm-critic is too noisy (fires too often)

**Solutions:**

- **Severity floor (future, v2.17+):** when `.claude/pm-skills.local.md` ships, configure `pm_critic_severity_floor: P1` to hide P2 + P3 findings.
- **Local override (v2.16.0):** copy `subagents/pm-critic.md` to `~/.claude/agents/pm-critic.md` and remove "use proactively" from the description.
- **Uninstall:** disable the pm-critic sub-agent specifically via your Claude Code installation's plugin management UI.

### Problem: pm-skill-auditor fails on validator-not-found

**Solutions:**

- Verify `scripts/pre-tag-validate.sh` exists (or `.ps1` on Windows). Run it manually: `bash scripts/pre-tag-validate.sh`.
- If a specific validator is missing, the auditor refuses and returns a P0 with the missing-validator name.

### Problem: pm-changelog-curator refuses on dirty tree

**Solution:** either commit your WIP first, OR pass `--committed-only` to acknowledge the scope:

```
/pm-draft-changelog --committed-only --since-tag v2.15.0
```

### Problem: pm-release-conductor fails G0

**Solution:** fix the underlying issue and re-invoke `/pm-release`. The conductor refuses bypass; G0 is idempotent (re-runs from scratch on each invocation).

### Problem: pm-release-conductor refuses to tag a different SHA

**Behavior:** the conductor refuses to tag any SHA other than the one G2.5 captured. This is intentional per master plan D22 (prevents broken-tag class). If you need to tag a different SHA, run the conductor again from G0 starting from your desired commit.

## Related Documentation

- Concept: [`docs/concepts/sub-agents.md`](../concepts/sub-agents.md), [`docs/concepts/active-orchestration.md`](../concepts/active-orchestration.md)
- Reference: [`docs/reference/runtime-components.md`](../reference/runtime-components.md)
- Adversarial review deep dive (pm-critic): [`docs/guides/adversarial-review.md`](./adversarial-review.md)
- Release runbook (pm-release-conductor): [`docs/contributing/release-runbook.md`](../contributing/release-runbook.md)
- Authoring new sub-agents: [`docs/contributing/authoring-sub-agents.md`](../contributing/authoring-sub-agents.md)
- Sub-agent design patterns: [`docs/contributing/sub-agent-design-patterns.md`](../contributing/sub-agent-design-patterns.md)
- Library samples: [`library/sub-agent-samples/README.md`](https://github.com/product-on-purpose/pm-skills/blob/main/library/sub-agent-samples/README.md)
