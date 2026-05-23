# validate-design-sprint-skills-family.sh / validate-design-sprint-skills-family.ps1

## Purpose

Validate conformance of the 7 `tool-design-sprint-*` skills to the Design Sprint Skills Family Contract at `docs/reference/skill-families/design-sprint-skills-contract.md`. Complements (does not duplicate) `lint-skills-frontmatter`, which handles universal per-skill frontmatter checks. This script validates the **family-specific** structural and reference requirements shared across the Design Sprint family (introduced v2.15.0 under the `tool` classification).

## Usage

```bash
./scripts/validate-design-sprint-skills-family.sh
./scripts/validate-design-sprint-skills-family.sh --strict
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-design-sprint-skills-family.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\validate-design-sprint-skills-family.ps1 -Strict
```

## Scope

Runs against these 7 skills:

- `tool-design-sprint-readiness`
- `tool-design-sprint-brief`
- `tool-design-sprint-map-and-target`
- `tool-design-sprint-sketch`
- `tool-design-sprint-decide-and-storyboard`
- `tool-design-sprint-prototype-plan`
- `tool-design-sprint-test-and-score`

## What It Checks

### Family-level

- Canonical contract exists at `docs/reference/skill-families/design-sprint-skills-contract.md`

### Per skill (applies to all 7)

| Check | Rule |
|-------|------|
| Required files present | `SKILL.md`, `references/TEMPLATE.md`, and `references/EXAMPLE.md` all exist |
| `metadata.classification` | Equals `tool` (read from the nested `metadata:` block per the v2.17.0 metadata-nested frontmatter structure) |
| `metadata.tool` | Equals `design-sprint` |
| `metadata.move` | Matches the skill's expected move slug (e.g., `tool-design-sprint-map-and-target` -> `map-and-target`, `tool-design-sprint-test-and-score` -> `test-and-score`) |
| SKILL.md references contract | `SKILL.md` contains the family-contract path `docs/reference/skill-families/design-sprint-skills-contract.md` |
| Decider Checkpoint at end | `TEMPLATE.md` contains a `Decider Checkpoint` heading, positioned in the last 25% of the file (the family contract requires the checkpoint to close the template) |

## What It Does NOT Check

Deliberately out of scope; other scripts or manual review handle these:

- Universal skill frontmatter (name, description word count, version, updated, license) - handled by `lint-skills-frontmatter`
- Commands referencing the correct SKILL.md path - handled by `validate-commands`
- AGENTS.md listing all skills - handled by `validate-agents-md`
- Content quality or semantic correctness of the sprint method

## Posture

**Enforcing** (run with `--strict` / `-Strict` in CI). Violations fail the CI job and block merges.

## Graceful behavior during scaffolding and partial state

- **Scaffolding (0 of 7 authored):** the script emits `[NOTICE]` lines and exits 0, so the contract + validator can land before the skills do.
- **Partial state (1-6 of 7 authored):** non-strict runs emit `[WARN]`; `--strict` (the release-time CI invocation) elevates partial state to `[FAIL]`. All 7 are live as of v2.15.0, so partial state should not recur.

## Exit codes

- `0` - all checks passed (or scaffolding state)
- `1` - one or more checks failed

## When to update this script

- **Contract MAJOR/MINOR bump:** update the required sections, field names, or enum values to match the contract; the contract and validator versions should track together.
- **New skill added to the family:** add it to `FAMILY_SKILLS` (both `.sh` and `.ps1`) and to the `expected_move_for` mapping.

## Related

- Canonical contract: `docs/reference/skill-families/design-sprint-skills-contract.md`
- Family registry: `docs/reference/skill-families/_registry.yaml`
- Sibling validator: `validate-foundation-sprint-skills-family` (parallel structure for the Foundation Sprint family)
- Companion validators: `lint-skills-frontmatter`, `validate-commands`, `validate-agents-md`
