# v2.27.0 Implementation Plan: Derived Surfaces, Phase 1 (M-32)

**Status:** READY (follows [`spec_derived-surfaces.md`](spec_derived-surfaces.md); update task statuses in place as work lands).
**Agents:** codex or claude throughout (deterministic generator work); maintainer review on the Task 3 first-generation diff is the one human gate.

| Task | Status |
|---|---|
| 1. Generator + manifest | DONE (2026-06-12: `gen-skill-manifest.mjs` + 10-case test; manifest counts match the count validators exactly: 66/30/9/12/15, 5 agents, 11 commands, 12 workflows) |
| 2. Manifest staleness gate | DONE (2026-06-12: enforcing step after the resource-index check; unit test in the enforcing `node --test` list) |
| 3. AGENTS.md markers + first generation | DONE (2026-06-12: markers inserted; first generation 81 ins / 113 del, idempotent; diff classes observed = (a) stale descriptions resynced to frontmatter incl. F-12 boundary pointers AGENTS.md never received and dispatch-wrapper texts replaced by the trimmed canonical descriptions, (c) normalization = entry separators removed, foundation entries alphabetized; no out-of-marker content touched; maintainer diff review = the commit itself, flagged in session report) |
| 4. AGENTS.md staleness gate + workflow retirement | DONE (2026-06-12: enforcing `--agents --check` step; `sync-agents-md.yml` deleted; living-doc grep showed only historical audit/effort docs which stay as records) |
| 5. Docs + hygiene sync | PARTIAL (2026-06-12: CHANGELOG done; CONTRIBUTING.md PR-process step 5 now carries the regeneration commands + marker rule; remaining = close #87 on ship) |

---

## Task 1: Generator + manifest (M)

Files: `scripts/gen-skill-manifest.mjs`, `scripts/gen-skill-manifest.test.mjs`, `skill-manifest.json`.

- Walk `skills/*/SKILL.md`; parse frontmatter with the same YAML approach the existing Node validators use (match `lint-skills-frontmatter`'s tolerances; fail loudly with the offending path on any parse or shape error, spec section 7).
- First subtask: survey the live frontmatter shapes for group/family/tool keys across all 66 skills and record the exact mapping in the script header comment (spec section 2 leaves this to here).
- Emit the spec-shape manifest: sorted entries, derived `catalog` counts, no timestamps, byte-stable.
- `--check`: regenerate to a temp buffer, byte-compare with the committed file, exit 1 with a "run `node scripts/gen-skill-manifest.mjs`" hint on drift.
- `.test.mjs` (Node built-in runner, fixture skill dirs under a temp tree): shape, sorting, stability (two runs byte-identical), count derivation, `--check` pass and fail directions, loud failure on malformed frontmatter.
- Validation: tests green; generated `skill-manifest.json` committed; its counts match `check-count-consistency`'s filesystem numbers.

## Task 2: Manifest staleness gate (S)

File: `.github/workflows/validation.yml`.

- Add enforcing step "Check skill manifest is current" (`node scripts/gen-skill-manifest.mjs --check`) near the existing "Check resource index is current" step; add the `.test.mjs` to the enforcing `node --test` list.
- No shell-bundle or parity-manifest changes (Node checks are CI-only by design).
- Validation: CI green; a scratch-branch probe with an edited description and stale manifest fails the step.

## Task 3: AGENTS.md markers + first generation (M, the careful one)

Files: `AGENTS.md`, generator `--agents` mode + tests.

- Insert the spec's marker pair around the current skill-catalog section; implement `--agents` to rewrite only the block from the manifest, matching current formatting as closely as practical (spec section 3).
- Run the first generation; produce the diff for maintainer triage. Expectation: every diff line is either (a) a stale hand-authored description corrected to frontmatter, (b) a missing/extra entry, or (c) deliberate formatting normalization; anything else is a generator bug.
- Unit tests: marker replacement idempotence; refusal (non-zero, no write) when markers are missing or malformed; out-of-marker content untouched byte-for-byte.
- Validation: `validate-agents-md.sh`, `check-agents-md-command-sync.sh`, count gates, and root link gates all green over the generated file; maintainer sign-off on the diff recorded in the PR description.

## Task 4: AGENTS.md staleness gate + workflow retirement (S)

Files: `.github/workflows/validation.yml`, delete `.github/workflows/sync-agents-md.yml`.

- Add enforcing step "Check AGENTS.md catalog is current" (`--agents --check`).
- Delete the disabled sync workflow in the same PR (spec D-E); grep docs for references to it (the v2.14.x release notes mention it historically: leave history intact, update only living docs that present it as current).
- Validation: CI green; drift probe (edit one frontmatter description, no regen) fails BOTH gates from Tasks 2 and 4.

## Task 5: Docs + hygiene sync (S)

- Contributor flow: add the regeneration command to the add-a-skill checklist (CONTRIBUTING.md and/or the skill-builder packet checklist; pick the surfaces where authors actually look, keep it to the one command).
- CHANGELOG `[Unreleased]`; effort brief flip; plan task table here kept current; on ship, close #87 (auto-generated AGENTS.md, open since January) with a comment pointing at the generator and gates.
- Validation: full local bundle + CI green, including the two new gates.

## Sequencing

1 -> 2 in one PR (manifest + its gate). 3 -> 4 in a second PR (AGENTS.md + its gate + retirement). 5 rides PR 2 or lands with the second. Independent of trigger-accuracy evals (M-31); can run in parallel with it. If WS-A4 (skills-ref metadata normalization, #97) is picked up in-window, prefer landing it before Task 1's frontmatter survey; otherwise proceed (not a hard dependency).
