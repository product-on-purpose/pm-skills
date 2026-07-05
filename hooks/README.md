# hooks/

Claude Code hooks shipped with the pm-skills plugin (added in v2.25.0). Two hooks plus a shared lib. For the user-facing "what they do / how to configure" guide, see the rendered concept page `concepts/hooks.md`; this README is the contributor-facing architecture.

## Layout

```
hooks/
  hooks.json            registers both hooks (matcher + node command via ${CLAUDE_PLUGIN_ROOT})
  guardrails.mjs        F-43 PreToolUse house-rule guardrail
  phase-router.mjs      F-44 SessionStart phase router
  lib/
    frontmatter.mjs     minimal frontmatter field reader (splitFrontmatter / getField / getList)
    local-config.mjs    reads .claude/pm-skills.local.md (readLocalConfig / isGuardrailEnabled / enabledChecks / isPhaseRouterEnabled)
    phase-map.mjs       phase -> [skillName] from skills/*/SKILL.md frontmatter
    signals.mjs         phase detection from cwd (branchPhase / artifactPhase / resolvePhase)
  fixtures/skills/      tiny SKILL.md fixtures for the phase-map / router tests
  *.test.mjs            unit tests (node --test)
```

## Design rules (do not break these)

1. **Dependency-free at runtime.** An installed plugin's hooks run via `node ${CLAUDE_PLUGIN_ROOT}/hooks/...` with **no `node_modules`**. The hooks therefore MUST NOT `import` any third-party module (no `js-yaml`, etc.). The few flat frontmatter keys they need are parsed by `lib/frontmatter.mjs`, a hand-rolled reader. (The CI eval validators under `scripts/` run in repo context and MAY use deps; the hooks may not.)

2. **Fail open / fail safe.** A hook must never block or crash a user's tool call on a bug, malformed input, or a missing file. `guardrails.mjs` returns `null` (allow) on any parse error; `phase-router.mjs` returns `null` (silent) on any signal error. Every `try` ends in an allow/silent path.

3. **Thin `main()`, pure core.** Side effects (read stdin, print stdout, `process.exit`) live only in `main()`. The testable logic is a pure exported function (`evaluateGuardrail(payloadText, config)`, `route(cwd, skillsDir)`). `main()` runs only when invoked directly, guarded by `process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href` (guard `process.argv[1]` first to avoid a `pathToFileURL(undefined)` crash).

4. **Banned characters as escapes.** `guardrails.mjs` detects em-dash (U+2014) and en-dash (U+2013) using `String.fromCharCode(0x2014)` / `String.fromCharCode(0x2013)`, never literal glyphs, so the file does not deny edits to its own source (and can be written past the `no-em-dashes` PreToolUse hook).

5. **Explicit UTF-8 stdin decode.** Read stdin as Buffers and decode UTF-8 once (`Buffer.concat(chunks).toString('utf8')`). Do not rely on the default string decode: on Windows, cp1252 mis-decodes the trailing byte of some multibyte UTF-8 glyphs into a phantom em-dash and a false positive.

## Hook contracts (confirmed from working examples)

- **PreToolUse deny:** print `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "..."}}`, exit 0.
- **PreToolUse advisory:** print `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": "..."}}`, exit 0.
- **SessionStart context:** print `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "..."}}`, exit 0. Silent path: print nothing, exit 0.
- The guardrail matcher covers `Write|Edit|MultiEdit|NotebookEdit|ExitPlanMode`; the evaluator flattens `tool_input.edits[].new_string` (so `MultiEdit` cannot bypass it) and scans `tool_input.plan` (so an em-dash cannot slip in through a plan-mode plan). Note: if Claude Code writes a plan file *before* the `ExitPlanMode` call, the deny triggers a corrected rewrite rather than un-writing the file.

## The `.claude/pm-skills.local.md` config

Gitignored, per-project. Guardrails are off unless `guardrails: true`. Keys:

- `guardrails` (bool) - master switch for the PreToolUse guardrail; off by default.
- `guardrail_checks` (list of `em-dash` | `placeholder` | `fabricated-metric`; default `[em-dash]`; quoted items are tolerated). Only `em-dash` blocks; the rest warn. `fabricated-metric` is a line-scoped heuristic: it fires only when a number shares its line with metric context (a percentage, a currency symbol, or a metric keyword such as `users` / `revenue` / `conversion` / `growth`), so a bare date (`2026-07-04`) or version (`1.2.3`) does not trip it. Suppress the advisory by writing `[fictional]` anywhere in the edit; the escape hatch is matched against the whole payload text, not a single line.
- `phase_router` (`auto` | `off` | `verbose`; default `auto`). The SessionStart phase router is ON by default. Set `phase_router: off` to disable it: `phase-router.mjs` then early-exits silently before any signal work. An unset key, `auto`, `verbose`, or any unrecognized value keeps it on (fail open to default-on); only an explicit off-switch value (`off` / `false` / `no` / `0` / `disabled`, case-insensitive) silences it.

See `concepts/hooks.md` for the full schema table.

## Adding a guardrail check

1. Add the check name to the `guardrail_checks` enum here and in `concepts/hooks.md`.
2. In `evaluateGuardrail` (`guardrails.mjs`), add a branch under the existing checks. A BLOCKING check returns a `permissionDecision: deny` object; an advisory check pushes to `notes` (returns `additionalContext`, never denies). Heuristic checks should be advisory, not blocking (a high-false-positive deny is worse than no check).
3. Add a unit test in `guardrails.test.mjs` (built `EM` via `String.fromCharCode`, never a literal).

## Phase signals

`signals.mjs` reads `.git/HEAD` directly (no git binary). It follows `gitdir:` when `.git` is a file (worktrees). `artifactPhase` only considers `.md` filenames (to avoid matching ordinary source directories) and is **ambiguity-aware**: it collects the distinct phases all recognized artifacts point to and returns one only when they agree; 0 or conflicting (>1) phases yield no signal (silent), so file-order never decides the phase. Detached HEAD (no `ref:` line) also yields no signal, which is correct.

## Testing

```
node --test hooks/lib/*.test.mjs hooks/*.test.mjs
```

These run in CI (cross-OS) via the enforcing "Test hooks + eval validators" step in `.github/workflows/validation.yml`.
