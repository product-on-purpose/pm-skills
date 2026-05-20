---
name: utility-pm-changelog-curator
description: Draft CHANGELOG entries from git log via the pm-changelog-curator sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-changelog-curator); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-changelog-curator.md and executes the system prompt inline. Applies CLAUDE.md hygiene rules (no internal-notes references, no em-dashes, no Claude attribution trailers, public paths only). Returns a layered draft (full CHANGELOG draft + Status Summary prose + Status YAML envelope per master plan D26) with hidden justification comments for maintainer audit. Refuses on dirty working tree unless --committed-only is passed.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-05-17
  category: release
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Changelog Curator (Dispatch Skill)

Cross-client dispatch wrapper for the `pm-changelog-curator` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-changelog-curator.md` and executes inline on non-Claude clients.

## When to Use

- You are preparing a release and want a CHANGELOG draft from git log between two tags
- You are running on a non-Claude AI client without native pm-changelog-curator sub-agent support
- You want a draft that respects pm-skills CHANGELOG hygiene rules (no internal-notes references, no em-dashes, public paths only) without manually applying them

## When NOT to Use

- You want to commit CHANGELOG entries directly (this skill produces a draft for review, not a commit)
- You want to review a PM artifact -> use `utility-pm-critic` instead
- You want a repo-wide governance audit -> use `utility-pm-skill-auditor`
- You want a full guided release flow -> use `utility-pm-release-conductor` (which chains to this skill at gate G2)

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-changelog-curator` with the user's arguments. Pass `--since-tag`, `--target-version`, `--committed-only` from `$ARGUMENTS` if present. Return the sub-agent's draft to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `agents/pm-changelog-curator.md`
2. Execute the system prompt body in that file as your operating instructions
3. Run the 8-step drafting flow documented in the sub-agent definition (establish range -> read hygiene rules -> check working tree -> enumerate commits -> classify -> group -> rewrite -> determine target version -> emit draft)
4. Apply `--since-tag`, `--target-version`, and `--committed-only` arguments from `$ARGUMENTS`
5. Return the layered output per master plan D26 (full CHANGELOG draft + Status Summary + Status YAML)

## Cross-Client Notes

The dispatch skill requires the AI client to:

1. Execute Bash for `git log`, `git describe`, and `git status` invocations
2. Read CLAUDE.md hygiene rules and existing CHANGELOG.md format reference
3. Read the canonical sub-agent definition file
4. Treat the agent body as operating instructions

See [Sub-Agent Compatibility Matrix](../../docs/reference/sub-agent-compatibility.md) for the canonical cross-client status. Summary for this skill as of v2.16.0: PRODUCTION on Claude Code + Codex CLI (Codex CLI successfully ran git log + read CLAUDE.md hygiene rules + drafted clean CHANGELOG entries + correct dirty-tree refusal); EXPERIMENTAL on Cursor / Windsurf / Copilot CLI / Gemini CLI. If a client is unreliable, fall back to manual `git log` + manual drafting using CLAUDE.md as the hygiene reference.

## Reference Files

- Canonical sub-agent definition: [`agents/pm-changelog-curator.md`](../../agents/pm-changelog-curator.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md`](../../docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md)
- CHANGELOG hygiene rules source: `CLAUDE.md` (repo root)
- Existing CHANGELOG.md format: `CHANGELOG.md` (root); v2.15.1 + v2.15.2 entries are canonical exemplars
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Output template: `references/TEMPLATE.md`
- Worked example: `references/EXAMPLE.md`
