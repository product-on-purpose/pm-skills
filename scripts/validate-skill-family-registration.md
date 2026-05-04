# validate-skill-family-registration.sh / validate-skill-family-registration.ps1

## Purpose

Generic structural validator for all skill families declared in `docs/reference/skill-families/_registry.yaml`. Verifies each family has:

1. A contract document at the declared path
2. All declared member skills exist as directories in `skills/`
3. Each member's `SKILL.md` references the family contract path

Closes audit gap G2: the prior `validate-meeting-skills-family` hardcoded 5 family members in the script. Adding a new family now requires only a registry entry, not new script authoring.

## Usage

```bash
./scripts/validate-skill-family-registration.sh
```

```powershell
.\scripts\validate-skill-family-registration.ps1
```

## What It Does

1. Reads `docs/reference/skill-families/_registry.yaml`
2. For each family declared:
   - Verifies the contract file exists at the declared path
   - Verifies each declared member skill exists as a directory under `skills/`
   - Verifies each member's `SKILL.md` references the family contract path
3. Reports pass/fail per family and per member

## What It Does NOT Do

This validator handles **structural integrity only**. Family-specific contract rules - required template sections, `artifact_type` enums, filename conventions, "Zero-friction execution" section presence, and similar - remain in family-specific validators (e.g., `validate-meeting-skills-family.sh`).

The audit's longer-term direction (Section 16.8 of `ci-audit_2026-05-03.md`) is to move family-specific rules into the registry as well, making the family-specific validators thin wrappers. That refactor is deferred to v2.14.0+ to avoid bundling architectural change with v2.13's other Wave 3 work.

## Adding a New Family

1. Author the contract document at `docs/reference/skill-families/<family>-contract.md`
2. Author the member skills under `skills/<phase-or-classification>-<name>/`
3. Add an entry to `_registry.yaml`:

   ```yaml
   families:
     <existing-family>:
       contract: ...
       members: [...]

     <new-family>:
       contract: docs/reference/skill-families/<family>-contract.md
       members:
         - skill-1
         - skill-2
   ```

4. Author a family-specific validator if the family contract has rules beyond structural integrity (use `validate-meeting-skills-family.sh` as template)
5. Wire any family-specific validator into `validation.yml`

The generic validator picks up the new family automatically without code changes.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All families pass structural validation |
| `1`  | One or more families have structural integrity violations |

## Posture

**Enforcing.** Structural integrity is a hard requirement; broken family registration breaks all consumers.

## Example Output

```
=== Skill Family Registration Validation ===

--- Family: meeting-skills ---
  PASS: contract present at docs/reference/skill-families/meeting-skills-contract.md
  PASS: member 'foundation-meeting-agenda' references contract
  PASS: member 'foundation-meeting-brief' references contract
  PASS: member 'foundation-meeting-recap' references contract
  PASS: member 'foundation-meeting-synthesize' references contract
  PASS: member 'foundation-stakeholder-update' references contract
  (5 member(s) verified)

Total families validated: 1

PASS: all skill families have structural integrity.
```

## Limitations / Known Issues

- **YAML parsing is regex-based**, not a full YAML parser. Handles the current `_registry.yaml` structure (2-space indent, simple `contract:` and `members:` fields, list members with `-`). Does NOT handle:
  - Tab-based indentation
  - Block scalars (`>`, `|`) in family fields
  - Nested keys beyond `contract` and `members`
  - Anchor or alias references
- **Single-source registry only.** No support for splitting registry across multiple files.
- **Contract file existence only.** Doesn't validate the contract document's content.

## See Also

- `validate-meeting-skills-family.{sh,ps1}` (family-specific validator for meeting-skills; complements this generic structural check)
- `lint-skills-frontmatter.{sh,ps1}` (universal skill frontmatter validation)
- `docs/reference/skill-families/_registry.yaml` (the registry)
- `docs/reference/skill-families/index.md` (skill family pattern explainer)
- v2.13 CI audit: `docs/internal/audit/ci-audit_2026-05-03.md` Sections 5.4.3 and 16.8
- F-36 effort doc: `docs/internal/efforts/F-36-generic-family-registration-validator.md`

## Safety

Read-only. Does not modify any files.
