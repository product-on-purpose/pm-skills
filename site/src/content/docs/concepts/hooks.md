---
title: Hooks and Output-Quality Checks
description: 'The v2.25.0 activation and trust layer: opt-in PreToolUse house-rule guardrails, a confident-only SessionStart phase router, and an advisory output-quality CI tier. How each works, and how to configure the guardrails via .claude/pm-skills.local.md.'
---

## Table of Contents

- [What this is](#what-this-is)
- [House-rule guardrails (opt-in)](#house-rule-guardrails-opt-in)
- [Configuring guardrails](#configuring-guardrails)
- [Phase router (on, confident-only)](#phase-router-on-confident-only)
- [Project memory (opt-in)](#project-memory-opt-in)
- [Output-quality checks (advisory CI)](#output-quality-checks-advisory-ci)
- [FAQ](#faq)

## What this is

pm-skills ships two Claude Code **hooks** plus an advisory CI tier. They wire the skill library into the platform: guarding what gets written, surfacing the right skill for where you are, and verifying recorded output quality. Hooks are a Claude Code primitive, so the guardrails and router are Claude Code features; the portable surface across other clients remains the skills themselves.

Two principles run through the design:

- **A block needs consent.** The guardrails can deny a write, so they ship **off** and you opt in per project.
- **A nudge needs confidence.** The router only ever adds a suggestion, so it ships **on** but stays silent unless a repo signal is strong.
- **A write needs both.** Project memory writes to files in your project, so it is opt-in like the guardrails, and it proposes changes for confirmation rather than applying them.

## House-rule guardrails (opt-in)

A `PreToolUse` hook that runs the moment Claude is about to write a file. It is **inert until you opt in**. When enabled it blocks em-dash and en-dash characters (returning a substitution reminder to the model) and warns (never blocks) on unfilled placeholders and unsourced numeric metrics. It fails open: any error, missing config, or malformed input lets the write through, so a hook bug can never block your unrelated work.

```mermaid
flowchart TD
    A[Claude calls Write / Edit / MultiEdit / NotebookEdit / ExitPlanMode] --> B[PreToolUse hook]
    B --> C{payload parses?}
    C -->|no| ALLOW[allow - fail open]
    C -->|yes| D[read .claude/pm-skills.local.md]
    D --> E{guardrails true?}
    E -->|no or absent| ALLOW
    E -->|yes| F{em-dash or en-dash present?}
    F -->|yes| DENY[deny with substitution reason]
    F -->|no| G{advisory check hit?}
    G -->|placeholder or unsourced metric| WARN[allow plus a non-blocking note]
    G -->|clean| ALLOW
```

The hook fires on Claude's tool calls, not on what you type by hand, so it only ever gates writes Claude is about to make. It also scans the plan text when Claude exits plan mode (`ExitPlanMode`), so a banned character cannot slip in through a plan that is presented but not yet a normal file write.

## Configuring guardrails

Guardrails are controlled by a gitignored, per-project file, `.claude/pm-skills.local.md`, with YAML frontmatter. With no file, nothing happens. To enable them:

```yaml
---
guardrails: true
guardrail_checks: [em-dash, placeholder, fabricated-metric]
---
```

| Key | Values | Effect |
|---|---|---|
| `guardrails` | `true` / `false` (default: absent = off) | Master switch. Nothing fires unless this is `true`. |
| `guardrail_checks` | a list of: `em-dash`, `placeholder`, `fabricated-metric` (default: `[em-dash]`) | Which checks run. `em-dash` BLOCKS; the other two WARN. Quoted items (`["em-dash"]`) work too. |

Only `em-dash` ever blocks a write; `placeholder` and `fabricated-metric` emit a non-blocking note for the model to act on.

## Phase router (on, confident-only)

A `SessionStart` hook that suggests the right Triple Diamond skills for where you are. If you have opted into [project memory](#project-memory-opt-in) and recorded a `phase:` there, the router uses it and says so; a phase you wrote down is a statement, not something to guess at. Otherwise it falls back to two cheap signals: a phase-named git branch (`discover/...`, `define/...`, `develop/...`, `deliver/...`, `measure/...`, `iterate/...`), or a recognized PM artifact present in the repo. On a **strong** signal it injects a short note naming the phase and a few relevant skills (read straight from each skill's `phase:` frontmatter). With no strong signal it stays completely silent, so it never becomes noise. If recognized artifacts point to *different* phases (say a PRD and a dashboard spec in the same repo), that is treated as ambiguous and the router stays silent rather than guessing by file order; a phase-named branch still resolves it.

```mermaid
flowchart TD
    S[SessionStart hook] --> M{phase declared in project memory?}
    M -->|yes| D[use it: a declaration outranks a guess]
    M -->|no| G[gather signals: git branch, artifact presence]
    G --> B{phase-named branch?}
    B -->|yes| P[resolve Triple Diamond phase]
    B -->|no| A{recognized PM artifact present?}
    A -->|yes| P
    A -->|no| Q[no strong signal]
    Q --> SILENT[emit nothing]
    D --> L[read phase to skills map from SKILL.md frontmatter]
    P --> L
    L --> N[inject a short note naming the phase and its skills]
```

## Project memory (opt-in)

Skills normally start cold: every session you re-supply which phase you are in, what you are working on, and what you already produced. Project memory lets a project record that once, in the same gitignored `.claude/pm-skills.local.md` the guardrails and router already use, so the catalog compounds across a session instead of restarting.

**It is inert unless you create the file.** With no file, every skill and both hooks behave exactly as they did before, which is the whole trust posture: nothing reads or writes your project until you ask it to.

```yaml
---
schema: 1
phase: deliver                          # a Triple Diamond phase, or omit
active_initiative: "Self-serve onboarding"
memory_auto_append: false               # default; see below
---

## Notes
Freeform context worth carrying (constraints, open threads).

## Decisions
Durable choices, each dated and attributed to the skill or person that recorded it.
```

| Key | Values | Effect |
|---|---|---|
| `schema` | `1` | Schema version. |
| `phase` | one of `discover`, `define`, `develop`, `deliver`, `measure`, `iterate` | The router uses this instead of guessing. An unrecognized value is ignored and the router falls back to its signals, so a typo never makes it announce a phase that does not exist. |
| `active_initiative` | a short line, or `null` | What you are currently working on. Surfaced only alongside a declared phase. |
| `memory_auto_append` | `true` / `false` (default: absent = `false`) | Whether skills may append to this file without asking. |

**Writes are proposed, not applied.** By default a skill shows you the entry it wants to record and waits for confirmation. Setting `memory_auto_append: true` opts into appending directly, with an echo of what was written. The default is deliberately the cautious one: the guardrails ship off because a block needs consent, and memory writes ship as propose-then-confirm for the same reason. Note the asymmetry with the router, which ships **on** and fails open on a malformed value: the router only ever adds a suggestion, while this touches files you own.

**Skills do the file I/O, not the hooks.** A memory-aware skill carries a `## Project Memory Contract` section stating what it reads and what it appends. The hook reads only `phase` and `active_initiative`, the two keys it needs to route; everything else is read by the agent following the skill's instructions. There is no daemon, no database, and no MCP server involved.

## Output-quality checks (advisory CI)

A CI-time tier (not a hook) that checks the recorded skill-output samples for quality invariants, not just structure. Three deterministic validators run advisory (they never fail a build today): no leftover placeholder markers, exact-quote sourcing (every source-ledger quote is a verbatim substring of the sample's input), and no fabricated metrics (a percentage in the output not traceable to the input). Two are already clean on the corpus and are candidates to become enforcing; the metrics check is a heuristic that flags percentages for human review.

```mermaid
flowchart LR
    SAMPLES[recorded skill-output samples] --> V1[no placeholders]
    SAMPLES --> V2[exact-quote sourcing]
    SAMPLES --> V3[no fabricated metrics]
    V1 --> R[advisory report in CI]
    V2 --> R
    V3 --> R
    R --> P{corpus clean for this invariant?}
    P -->|yes| E[promote to enforcing later]
    P -->|no| T[triage: fix or exempt]
```

## FAQ

**Does the guardrail hook block my own typing?** No. Hooks fire on Claude's tool calls, not on what you type by hand.

**Will the router nag me every session?** No. It is silent unless a repo signal is strong (a phase-named branch or a recognized artifact).

**Do these work outside Claude Code?** Hooks are a Claude Code primitive, so the guardrails and router are Claude Code features. The portable surface across clients remains the skills.

**Where is the implementation?** In the repo's `hooks/` directory; see `hooks/README.md` for the architecture (dependency-free Node, fail-open, how to add a check).
