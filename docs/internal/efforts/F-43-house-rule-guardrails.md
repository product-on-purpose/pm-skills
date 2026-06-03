# [F-43] House-rule guardrails (opt-in PreToolUse hook)

Status: Planned (v2.25.0)
Milestone: v2.25.0
Issue: TBD (provisional ID; confirm against GitHub issues + backlog-canonical before promotion)
Agent: Claude Opus 4.8

## Scope

Ship the maintainer's editorial discipline (the `~/.claude/hooks/no-em-dashes.py` logic) as a *distributable, opt-in* `PreToolUse(Write|Edit|NotebookEdit)` hook inside the plugin, authored in Node for portability. The hook is inert until a project sets `guardrails: true` in `.claude/pm-skills.local.md`. em-dash / en-dash is the one blocking check; placeholder and fabricated-metric checks ship advisory (warn, never deny).

This is the plugin's FIRST hook. It stands up the `hooks/` directory, the shared `hooks/lib/local-config.mjs` reader, and the Node hook harness that F-44 reuses.

## Problem

The repo's hardest-won house rules (no em-dash, no fabricated metrics, no leftover placeholders) currently live as persuasion: a `CLAUDE.md` rule and a maintainer-only local hook. Persuasion is not enforcement - a model slip or pasted text can still land a banned character in a shipped artifact, and no other PM plugin ships authored-prose linting as a distributable feature. The gap: there is no way for a pm-skills user (or the maintainers, on a machine without their personal hook) to switch on the same write-time guarantee.

The product-risk that makes this non-trivial: a plugin hook fires for EVERY user who enables pm-skills, on EVERY Claude Write/Edit, in EVERY repo - not just PM artifacts. A default-on em-dash blocker would impose the maintainer's prose aesthetic on strangers' unrelated work. So the feature is not "port the hook" - it is "port the hook PLUS an opt-in consent layer it never needed as a personal tool."

## How It Works

### Posture: opt-in via `.local.md`

The hook ships registered but inert. Its first action reads `.claude/pm-skills.local.md`; if absent or `guardrails` is not `true`, it exits 0 and allows the write. Installing pm-skills changes nothing about Claude's writing until a maintainer opts in per project.

### Checks

- **em-dash / en-dash (BLOCK):** deterministic U+2014 / U+2013 match, ported from `no-em-dashes.py` including its explicit UTF-8 stdin decode (so Windows cp1252 does not mis-decode a multibyte glyph into a phantom em-dash). On a hit, returns `permissionDecision: deny` with the ` - ` substitution reminder.
- **placeholder (WARN):** `[Placeholder]`, `[Feature Name]`, `TODO`, unfilled `<...>`. Emits a non-blocking note.
- **fabricated-metric (WARN):** a number/percentage not marked `[fictional]` and absent from context. Heuristic; advisory only.
- **employer-context:** NOT a hook check. Deferred to `pm-critic`.

### Fail-open

Any parse error, missing file, or hook exception allows the write. A distributed hook must never block a stranger's unrelated work on a bug.

## Classification

- Type: plugin hook (new capability; not a skill)
- New: `hooks/hooks.json`, `hooks/guardrails.mjs`, `hooks/lib/local-config.mjs` (+ tests)
- No new slash command, no skill, no catalog count change

## Exemplars

- `~/.claude/hooks/no-em-dashes.py` - the logic and the fail-open + UTF-8-decode patterns to port
- `scripts/check-rendered-links.mjs` + `.test.mjs` - the repo's `.mjs` + unit-test convention
- `docs/internal/release-plans/v2.25.0/spec_v2.25.0.md` section 2 - the full spec and ACs

## Deliverables

- `hooks/hooks.json` - registers the PreToolUse matcher
- `hooks/guardrails.mjs` + `hooks/guardrails.test.mjs`
- `hooks/lib/local-config.mjs` + test (the shared `.local.md` reader)
- A user-facing reference page (with a mermaid decision-flow diagram) documenting the hook and the `.local.md` schema
- Version + CHANGELOG + release-doc surface per the v2.25.0 plan

## Validation

- Unit tests cover: inert-by-default, em-dash deny when opted in, placeholder warn, malformed-config fail-open (spec ACs 43-1..7)
- `validate-plugin-install` green with `hooks/` present
- Em-dash / en-dash sweep over the new files (the source uses escape sequences so it does not self-block)

## Open Questions

- Exact plugin-hook registration (auto-discovery from `hooks/hooks.json` vs declaration in `plugin.json`) - resolved by the build-time spike.
- The precise non-blocking advisory output field for PreToolUse - confirmed in the spike.
- Per-project vs a future global enable - MVP is per-project; global is post-MVP.

## Dependencies

- None hard. Establishes the `hooks/` harness that F-44 reuses, so it builds first.

## Status Transitions

- Planned (current, v2.25.0)
- In Progress - when the hooks directory + guardrail hook are authored
- Shipped - on v2.25.0 tag
