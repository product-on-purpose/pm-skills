---
name: utility-pm-critic
description: Run adversarial review on a PM artifact via the pm-critic sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skills:pm-critic); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-critic.md and executes the system prompt inline. Returns findings graded P0/P1/P2/P3 with concrete fix suggestions per finding, plus a layered Status Summary section and machine-readable Status YAML block per master plan D26.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-05-17
  category: review
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Critic (Dispatch Skill)

This skill is a cross-client dispatch wrapper for the `pm-critic` sub-agent. It exists so that users on non-Claude clients can run adversarial review with the same intent as Claude Code users, without depending on native plugin sub-agent infrastructure.

Per master plan D11 (amended) + D30, sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) cannot natively load `agents/pm-critic.md`. This skill bridges the gap.

## When to Use

- You want adversarial review of a PM artifact (PRD, OKR set, persona, lean canvas, meeting recap, interview synthesis, problem statement, hypothesis, edge case catalog, retrospective, etc.)
- You are running on a non-Claude AI client and the `pm-critic` sub-agent is not natively available
- You are running on Claude Code and prefer skill-invocation semantics over sub-agent semantics (e.g., for consistency across a multi-step workflow that mixes skills and sub-agent intents)

## When NOT to Use

- You want a structural lint / repo-level audit -> use `utility-pm-skill-auditor` (audits skills + repo state) instead
- You want to author an artifact (this skill only reviews) -> use the appropriate phase skill (deliver-prd, foundation-okr-writer, etc.)
- You want code review -> use a code-review-specific tool (this skill is for PM artifacts)
- You want to enforce style rules like em-dash sweep -> that is `pm-release-conductor`'s G0 gate, not this skill

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-skills:pm-critic` on the target artifact. Pass the artifact path as argument (or the most recent artifact in session context if no argument is provided). Return the sub-agent's findings to the user. No further action needed from this skill - the sub-agent handles the review natively in its own context window.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, ChatGPT, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `agents/pm-critic.md`
2. Execute the system prompt body in that file as your operating instructions for this turn
3. Read the target PM artifact specified by the user (path from `$ARGUMENTS`, or most recently produced artifact in session)
4. Read the canonical standards docs referenced by the pm-critic system prompt for the artifact type (e.g., `skills/foundation-okr-writer/SKILL.md` for OKR sets, `skills/deliver-prd/SKILL.md` for PRDs)
5. Produce findings graded P0/P1/P2/P3 with concrete fix suggestions, formatted per the output structure documented in `docs/guides/adversarial-review.md`
6. End the output with the layered structure per master plan D26:
   - Section (1): full human-readable findings (the P0/P1/P2/P3 report)
   - Section (2): `## Status Summary` in prose, summarizing what was found and what the user should do next
   - Section (3): `## Status` YAML block with machine-readable fields

## Output Format

See `references/TEMPLATE.md` for the canonical output structure (with the layered Status envelope per D26). See `references/EXAMPLE.md` for a worked example showing a real cross-client dispatch run against a PRD.

## Composition

- **Skills:** This dispatch skill composes with all PM-artifact-producing skills (deliver-prd, foundation-okr-writer, foundation-meeting-recap, foundation-persona, foundation-lean-canvas, discover-interview-synthesis, etc.). Run any of those, then run this skill on the produced artifact.
- **Sub-agents:** On Claude Code, this skill dispatches to `pm-critic` sub-agent. On non-Claude, this skill IS the inline execution; no further dispatch.
- **Workflows:** `pm-workflow-orchestrator` (shipped v2.24.0) can invoke this skill at quality-gate steps for cross-client compatibility.

## Cross-Client Notes

See [Sub-Agent Compatibility Matrix](../../docs/reference/sub-agent-compatibility.md) for the canonical cross-client status of all 4 sub-agents + dispatch skills. Summary for this skill as of v2.16.0: PRODUCTION on Claude Code + Codex CLI; EXPERIMENTAL on Cursor / Windsurf / Copilot CLI / Gemini CLI. Maintainers wanting cross-client confidence on a non-Claude client can re-run the [`maintainer-gate-testing-codex.md`](../../docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) harness on that client.

The "read and execute inline" pattern depends on the AI being able to:

1. Read a file path provided as a reference (most AI clients support this)
2. Treat that file's content as operating instructions for the current turn (most AI clients support this for SKILL.md-style instructions)
3. Read additional referenced standards docs at invocation time (all major AI clients support this)

If any of these are unreliable on a given client, that client cannot use this dispatch skill effectively.

## Reference Files

- Canonical sub-agent definition: [`agents/pm-critic.md`](../../agents/pm-critic.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-critic.md`](../../docs/internal/release-plans/v2.16.0/spec_pm-critic.md)
- User-facing guide: [`docs/guides/adversarial-review.md`](../../docs/guides/adversarial-review.md)
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Output template: `references/TEMPLATE.md`
- Worked example: `references/EXAMPLE.md`
