---
description: Run adversarial review on a PM artifact via the pm-critic sub-agent
argument-hint: "[optional artifact path]"
---

Run adversarial review on a PM artifact.

**On Claude Code with the pm-skills plugin:** invoke the `pm-critic` sub-agent (definition at `agents/pm-critic.md`). The sub-agent fires in its own context window with Read/Grep/Glob tools.

**On other AI clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI):** invoke the dispatch skill at `skills/utility-pm-critic/SKILL.md`. The dispatch skill reads the canonical sub-agent definition inline and produces equivalent findings.

If `$ARGUMENTS` contains a file path, review that artifact. Otherwise, review the most recent PM artifact produced in this session.

The review reads the canonical standards docs for the artifact type (per `pm-critic` referential-prompt discipline, D12) and returns findings graded P0/P1/P2/P3 with concrete fix suggestions per finding. Output follows the layered Status envelope per master plan D26 (full findings + Status Summary prose + Status YAML block).

See `docs/guides/adversarial-review.md` for severity examples and invocation paths. See `skills/utility-pm-critic/references/EXAMPLE.md` for a worked dispatch run.

Context from user: $ARGUMENTS
