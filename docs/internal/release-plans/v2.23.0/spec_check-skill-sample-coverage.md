# Spec + Implementation Plan: `check-skill-sample-coverage`

**Status:** READY TO BUILD - folded into v2.23.0 as work item W2 (the v2.23.0 retro discovery)
**Date:** 2026-05-31
**Type:** new enforcing CI validator (bash + pwsh parity), additive
**Parent:** [`plan_v2.23.0.md`](plan_v2.23.0.md)

## Why this exists (the gap it closes)

While shipping `foundation-prioritized-action-plan` (v2.23.0), the full pre-tag validator bundle and CI passed **before the skill had any library thread samples**. The skill was authored with its own `references/EXAMPLE.md` and `examples/` but no entries under `library/skill-output-samples/`, and nothing flagged it. The gap was only caught by a human asking "what about the library thread samples?"

Root cause: companion files (`references/TEMPLATE.md`, `references/EXAMPLE.md`) live *inside* `skills/<name>/`, so `lint-skills-frontmatter` naturally iterates and enforces them. Thread samples live in a *separate tree* (`library/skill-output-samples/<name>/`) with no back-reference coupling "a skill exists" to "its samples exist." No validator joins the two trees, so sample coverage is unenforced.

This validator closes that gap: for each content skill that the library convention says must have thread samples, assert they exist.

## Policy (what is required)

Derived from `library/skill-output-samples/README_SAMPLES.md` and `THREAD_PROFILES.md`, and confirmed against the current repo state (2026-05-31):

| Skill class | Required samples | Rationale |
|---|---|---|
| Phase (`discover`/`define`/`develop`/`deliver`/`measure`/`iterate`) | One sample per thread: `storevine`, `brainshelf`, `workbench` | Canonical 3-per-thread convention |
| `foundation` | One sample per thread (3 minimum; some carry more, e.g. `foundation-persona` = 12) | Same convention |
| `tool` (sprint families + `tool-note-and-vote`) | One sample per thread | Each thread carries an end-to-end sprint arc |
| `utility` | **Exempt** from the 3-thread rule | Library convention is single-thread (storevine-only) for some, and the 4 sub-agent dispatch skills keep samples in `library/sub-agent-samples/` |

A "sample for thread T" means a file matching `library/skill-output-samples/<name>/sample_<name>_<T>_*.md` or `..._<T>.md`.

### Exemption allowlist (documented exceptions)

| Skill | Exemption | Source |
|---|---|---|
| `deliver-acceptance-criteria` | storevine-only single-thread sample | `README_SAMPLES.md` ("7 single-thread samples ... and deliver-acceptance-criteria, all storevine-only") |
| all `utility-*` | class-level exemption (single-thread or sub-agent-samples) | `README_SAMPLES.md` |

The allowlist is an explicit constant in the script. Adding a future intentional exception requires editing the script (auditable), not silent omission.

## Algorithm

1. Enumerate `skills/*/`.
2. Read each skill's `metadata.phase` or `metadata.classification` from frontmatter (first match wins, as elsewhere).
3. Skill is "in scope" if its class is a phase, `foundation`, or `tool` AND it is not in the exemption allowlist.
4. For each in-scope skill, for each of the three threads, FAIL if no matching sample file exists in `library/skill-output-samples/<name>/`.
5. Exit 1 on any FAIL; exit 0 otherwise.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Every in-scope skill has all three thread samples |
| 1 | One or more in-scope skills are missing a required thread sample |

`--strict` is accepted for calling-convention parity with the rest of the bundle; the check is enforcing by default (no advisory mode), so `--strict` is a no-op alias.

## Baseline (current repo passes)

Verified 2026-05-31: all 30 phase + 9 foundation + 15 tool skills have all three threads; `deliver-acceptance-criteria` and all `utility-*` are exempt. So wiring this into CI does not break the current build. It fails only on a *regression* (a new or edited in-scope skill that lacks a thread sample), which is exactly the foundation-prioritized-action-plan gap.

## Wiring

- `scripts/check-skill-sample-coverage.sh` + `scripts/check-skill-sample-coverage.ps1` (bash + pwsh parity) + `scripts/check-skill-sample-coverage.md` (companion doc, required by `validate-script-docs`).
- Add to `scripts/pre-tag-validate.sh` (the local enforcing bundle).
- Add a step to `.github/workflows/validation.yml`.

## Acceptance criteria

1. Passes on the current repo (baseline).
2. Fails if any phase/foundation/tool skill (outside the allowlist) is missing a `storevine`, `brainshelf`, or `workbench` sample. (Verified by a temporary rename probe during build.)
3. bash and pwsh versions agree on the same repo.
4. Companion `.md` exists, so `validate-script-docs` stays green.
5. Wired into both `pre-tag-validate.sh` and `validation.yml`.

## Implementation plan

| Step | Action | Done-when |
|---|---|---|
| 1 | Author `.sh` (bash-3.2 portable: no associative arrays/mapfile) | Runs, exit 0 on current repo |
| 2 | Author `.ps1` parity | Same verdict as `.sh` |
| 3 | Author `.md` companion doc | `validate-script-docs` green |
| 4 | Wire into `pre-tag-validate.sh` + `validation.yml` | Both reference the script |
| 5 | Negative test: temporarily move one sample, confirm FAIL, restore | FAIL observed then PASS restored |
| 6 | Update `CHANGELOG.md` (v2.23.0) + this plan; re-run full bundle | Bundle green |

## Out of scope (future)

- Enforcing the README_SAMPLES index row. A name-grep secondary check was prototyped and dropped from v1: it produced false positives for the sprint families, which `README_SAMPLES.md` documents by glob (`tool-foundation-sprint-*`) rather than by each exact skill name. The format is prose-variable; a real index check needs structured parsing.
- Enforcing per-class sample *counts* beyond "1 per thread" (e.g. persona's 4-per-thread).
- A thread-profile consistency check (`check-thread-profiles-consistency`, already deferred in `THREAD_PROFILES.md`).
