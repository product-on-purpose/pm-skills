# [F-44] Phase router (confident-only SessionStart hook)

Status: Planned (v2.25.0)
Milestone: v2.25.0
Issue: TBD (provisional ID; confirm against GitHub issues + backlog-canonical before promotion)
Agent: Claude Opus 4.8

## Scope

Ship the flagship discovery feature: a `SessionStart` hook (rule-based MVP, Node) that inspects cheap repo signals and, ONLY when confident, injects an `additionalContext` nudge naming the detected Triple Diamond phase and a short curated skill shortlist for that phase. No confident signal emits nothing. Default ON.

## Problem

With 65 skills, the user's bottleneck is no longer "does a skill exist" but "which one do I invoke, when." Description-matching alone does not solve discovery at this scale - the user must remember the catalog and supply context cold. The roadmap names this the #1 problem and this router the single highest-leverage item.

The failure mode to avoid: a router that fires at every session start for every installer and guesses out loud becomes noise stapled to the top of every session, and ignored context still costs tokens. So the design principle is calibrated silence - say nothing unless a strong signal makes the nudge reliably right.

The posture differs deliberately from F-43: a *block* (F-43) needs consent, so it ships opt-in; a *nudge* (F-44) only needs to be right, so it ships default-on but confident-only. Gating a discovery feature behind opt-in would hide it from the newcomers who most need it.

## How It Works

### Signals (MVP, rule-based)

1. **git branch prefix** matching a phase (`discover/`, `define/`, `develop/`, `deliver/`, `measure/`, `iterate/`).
2. **artifact presence** - a recognized PM artifact in the repo / output dir (a problem-statement / persona file -> Discover/Define; a PRD / acceptance-criteria file -> Deliver; an OKR / dashboard-spec file -> Measure).

A strong signal resolves one phase. No strong signal emits NOTHING.

### Output

When confident, inject `additionalContext` (the channel `start-stamp.py` uses) naming the phase and the top few skills for it. The phase-to-skills map is built by reading the `phase:` field from `skills/*/SKILL.md` frontmatter directly (via `js-yaml`), NOT from `build-skill-catalog.py` output - the Node hook cannot run Python at runtime, and the frontmatter is the authoritative classification (values: discover, define, develop, deliver, measure, iterate). Claude weaves it into the session; it is not a user-facing banner in the MVP.

### Fail-safe

Any git / filesystem error during signal-gathering takes the silent path, never a crash.

## Classification

- Type: plugin hook (new capability; not a skill)
- New: `hooks/phase-router.mjs` (+ test); extends `hooks/hooks.json` with the SessionStart matcher; reads the committed catalog
- No new slash command, no skill, no catalog count change

## Exemplars

- `~/.claude/hooks/start-stamp.py` - the SessionStart + additionalContext pattern
- `skills/*/SKILL.md` `phase:` frontmatter - the authoritative phase classification the router reads (the same source `build-skill-catalog.py` parses)
- `hooks/lib/local-config.mjs` (F-43) - the shared reader, reused for the optional `.local.md` override
- `docs/internal/release-plans/v2.25.0/spec_v2.25.0.md` section 3 - the full spec, mapping table, and ACs

## Deliverables

- `hooks/phase-router.mjs` + `hooks/phase-router.test.mjs`
- SessionStart entry in `hooks/hooks.json`
- A user-facing reference page (with a mermaid confidence-flow diagram) documenting signals, the phase mapping, and the silent path
- Version + CHANGELOG + release-doc surface per the v2.25.0 plan

## Validation

- Unit tests cover: confident branch signal -> phase nudge; artifact signal -> phase nudge; no signal -> silence; fabricated-skill-name guard; git-error -> silent (spec ACs 44-1..6)
- Every skill named in a nudge exists in the catalog for the claimed phase

## Open Questions

- Exact SessionStart `additionalContext` field and whether the hook receives the project root - resolved by the build-time spike.
- Whether to honor a `.local.md` `phase_router: off|verbose` override in the MVP or defer it (leaning defer; the override is additive).
- A visible (banner) mode and an LLM-judged prompt-hook promotion - future, out of v2.25.0.

## Dependencies

- Reuses the `hooks/` harness from F-43, so it builds after F-43. Reads `skills/*/SKILL.md` `phase:` frontmatter directly (no Python, no generator change).

## Status Transitions

- Planned (current, v2.25.0)
- In Progress - when the SessionStart router is authored
- Shipped - on v2.25.0 tag
