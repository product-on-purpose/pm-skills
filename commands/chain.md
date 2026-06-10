---
description: Run an ad-hoc ordered chain of pm-skills with shared context (ephemeral; routes to the pm-workflow-orchestrator)
---

Run an ad-hoc chain of pm-skills in the order given, passing the shared context to every step.

## Parse the input

`$ARGUMENTS` carries a chain expression followed by free-form context.

1. Extract flags first, wherever they appear: `--auto`, `--force-auto`, `--dry-run`, `--thread`.
2. The chain expression is exactly the leading separator-joined list of skill names (`,` and `->` equivalent; mixing allowed). It ends after the first name that is NOT followed by a separator; everything after that is the context, even when the context words look like skill names. A trailing separator with nothing after it is an error to surface, not to guess around.
3. Everything after the chain expression is the context. This command parses the BOUNDARY only; all skill-name validation belongs to the engine.

Examples: `/chain define-problem-statement -> define-hypothesis --thread Mobile checkout drop-off` runs two steps with `--thread`, context "Mobile checkout drop-off". Lowercase context is fine: `/chain deliver-prd, deliver-user-stories mobile checkout redesign` is two steps with context "mobile checkout redesign" (the boundary is the missing separator after `deliver-user-stories`, not the letter case).

## Confirm and dispatch

1. Restate in one line: the parsed steps in order, the flags, and the context.
2. Invoke the `utility-pm-workflow-orchestrator` skill from `skills/utility-pm-workflow-orchestrator/SKILL.md` with that chain, context, and flags (a Mode B run). The engine validates every name pre-flight and owns all run rules; this command adds none. The grammar lives in `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (Mode B Chain Expression Contract).
3. Relay the engine's per-step blocks and terminal output, including the promotion suggestion for reusable chains.

Nothing is persisted beyond the engine's own gitignored run artifacts. To make a chain durable, follow the completion suggestion to `utility-pm-workflow-builder`. While the native engine path is EXPERIMENTAL, recommend `--dry-run` first.

Context from user: $ARGUMENTS
