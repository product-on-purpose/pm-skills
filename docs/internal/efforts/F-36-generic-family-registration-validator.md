# [F-36] Generic Skill-Family-Registration Validator

Status: Backlog
Milestone: v2.12.0 (candidate)
Issue: TBD
Agent: Claude Opus 4.7

## Scope

Create `scripts/validate-skill-family-registration.sh` + `.ps1` + `.md` — a generic validator that detects skill-family membership via a `metadata.frameworks` frontmatter marker, loads the declared family's contract path from convention, and invokes the family's per-family validator. Scales the meeting-skills family pattern to any future cross-cutting skill family without requiring per-family hardcoding.

Surfaced by the post-v2.11.0 CI audit (see `docs/internal/audit-ci/2026-04-18_ci-audit_post-v2.11.0.md`, gap G2). Complements F-31 (pm-skill-validate family-awareness).

## Problem

v2.11.0 shipped the first skill family with its own validator (`validate-meeting-skills-family.sh`). That validator hardcodes the 5 meeting skills by name in a `FAMILY_SKILLS` array and enforces meeting-family-specific checks only.

When the next family lands (e.g., Research Family, Delivery Family — both candidates in `docs/reference/skill-families/index.md`), the current pattern requires:
1. A per-family validator script (`validate-research-skills-family.sh`)
2. A per-family step in `validation.yml`
3. A per-family FAMILY_SKILLS array maintained inside the validator
4. Manual updates whenever a family member is added or removed

This scales poorly. A generic family-registration validator would:
1. Detect family membership automatically via frontmatter marker (`metadata.frameworks: [meeting-skills-family]`)
2. Load the family's contract path from a predictable location (`docs/reference/skill-families/{family}-contract.md`)
3. Invoke the family's validator OR perform cross-family generic checks (contract reference present in SKILL.md, correct artifact type prefix, etc.)
4. One script handles all current and future families

This closes audit gap G2 fully (F-31 partially closes it via pm-skill-validate's family-awareness; F-36 closes the family-registration dimension).

## How It Works

### Convention

Every family skill declares membership in its SKILL.md frontmatter:

```yaml
metadata:
  frameworks: [meeting-skills-family]
  # ... other fields
```

Every family has a contract at the predictable path:

```
docs/reference/skill-families/{family-name}-contract.md
```

Every family optionally has a dedicated per-family validator at:

```
scripts/validate-{family-name}.sh
```

### What the generic validator checks

For every skill in `skills/` with a `metadata.frameworks` entry containing a value matching `*-skills-family` pattern:

1. **Family contract exists at the predicted path** — if `metadata.frameworks: [research-skills-family]`, check `docs/reference/skill-families/research-skills-family-contract.md` exists
2. **SKILL.md references the family contract** — skill's SKILL.md must contain a link to the family contract file
3. **Per-family validator runs if present** — if `scripts/validate-{family}.sh` exists, invoke it; otherwise skip with a note
4. **Cross-family generic checks**:
   - Skill frontmatter includes `metadata.frameworks` as an array (not a string)
   - Multiple family memberships allowed (a skill could belong to multiple cross-cutting families; future-proof)
   - If multiple family memberships, all declared families must exist

### What it does NOT check

- Family-specific behavior (that's the per-family validator's job, e.g., `validate-meeting-skills-family.sh`)
- Skill-level frontmatter conformance (handled by `lint-skills-frontmatter`)
- AGENTS.md sync (handled by `validate-agents-md`)

Scope is strictly cross-family registration and discovery.

### CI integration

Added to `.github/workflows/validation.yml` as an enforcing step:

```yaml
- name: Validate skill-family registration (bash)
  if: matrix.os == 'ubuntu-latest'
  run: bash scripts/validate-skill-family-registration.sh

- name: Validate skill-family registration (pwsh)
  if: matrix.os == 'windows-latest'
  run: pwsh -File scripts/validate-skill-family-registration.ps1
```

Unlike F-33 (which starts advisory), F-36 is designed to be enforcing from day one — the conformance checks are structural and trivially satisfied by new skills that follow the convention.

## Classification

- Type: new CI script (no skill; tooling)
- Directory: `scripts/`
- Pattern: `.sh` + `.ps1` + `.md` per existing convention

## Exemplars

- `scripts/validate-meeting-skills-family.sh` — pattern for per-family validator (F-36 invokes these)
- `scripts/lint-skills-frontmatter.sh` — pattern for iterating across all skills with frontmatter parsing
- `scripts/validate-agents-md.sh` — pattern for cross-skill consistency checks
- `docs/reference/skill-families/index.md` — landing page that documents the families this validator discovers

## Deliverables

- `scripts/validate-skill-family-registration.sh` — bash implementation
- `scripts/validate-skill-family-registration.ps1` — PowerShell equivalent
- `scripts/validate-skill-family-registration.md` — documentation per `.sh + .ps1 + .md` convention
- `.github/workflows/validation.yml` — new step added (enforcing)
- `scripts/README_SCRIPTS.md` — entry describing the new script
- `docs/reference/skill-families/index.md` — minor update describing the registration convention for new family authors

## Validation

- Dry run against v2.11.0 state: should pass (5 meeting skills properly register; no other family memberships)
- Dry run against a deliberately-broken state (e.g., skill with `frameworks: [nonexistent-family]`): should fail with clear error
- End-to-end: add a skill to the meeting family or a hypothetical research family; validator should recognize membership and invoke per-family validator without manual script changes

## Open Questions

- How do we handle family membership that's declared in SKILL.md but the skill doesn't conform to the family contract? Proposal: F-36 only checks *registration* (the declaration + convention); per-family validator catches conformance.
- Should multi-family skills be allowed? Proposal: yes in the schema, but flag as unusual with advisory warning. Real-world case: a skill that belongs to both meeting-skills-family and a hypothetical research-skills-family.
- What if a family contract exists but no skills declare membership yet? Proposal: not validated — the contract alone doesn't require declared members. Prevents chicken-and-egg issues during family design.

## Dependencies

- None strictly blocking
- Benefits from F-31 (pm-skill-validate family-awareness) being aware of family membership, but F-36 is lower-level (CI script vs. utility-skill)
- Complements F-33 (sample-standards CI) as part of the v2.12.0 CI hardening pass

## Status Transitions

- **Backlog** (current)
- **In Progress** — when validator authoring begins
- **Shipped** — on v2.12.0 tag + push

## Relationship to existing per-family validator

`validate-meeting-skills-family.sh` (shipped in v2.11.0) remains the canonical per-family conformance validator. F-36 adds a generic layer that:
- Discovers which skills declare which families
- Confirms the declaration convention
- Invokes the per-family validator when present

Both run in CI; they're complementary, not overlapping:
- **F-36 answers**: "Is this skill properly registered as a family member?"
- **Family validator answers**: "Does this family's skills conform to the family contract?"

## Detailed specification

Deferred — produced during script authoring pass. Starting implementation pattern: iterate `skills/*/SKILL.md`, parse YAML frontmatter, extract `metadata.frameworks` list, for each entry matching `*-skills-family` pattern, perform the checks listed above.
