# Iteration Example: deliver-prd

This example shows a validation-report-driven iteration of `deliver-prd`.
The input is the WARN finding from the F-10 validation report example
(`output-contract-coverage`).

---

## Step 1: Identify the Target Skill

Target: `skills/deliver-prd/`
Resolved from user input: `utility-pm-skill-iterate deliver-prd`

## Step 2: Read Current Skill Files

Read and recorded:
- `skills/deliver-prd/SKILL.md` (72 lines)
- `skills/deliver-prd/references/TEMPLATE.md` (10 sections)
- `skills/deliver-prd/references/EXAMPLE.md` (212 lines)
- `HISTORY.md` does not exist

## Step 3: Normalize Input into Intended Changes

Input: validation report from `utility-pm-skill-validate deliver-prd`

Parsed `## Recommendations` section (Report schema: v1):

```
Intended changes:
1. Target: skills/deliver-prd/SKILL.md -> Output Format section
   Change: Enumerate template sections explicitly instead of generic reference
   Source: validation report, check output-contract-coverage
```

The INFO finding (`when-not-to-use`) was excluded from the intended changes
list because the user did not request it. INFO findings are optional and
only included if the user explicitly asks for them.

"Proceed with this change? [yes / no]"

User: yes

## Step 4: Preview Proposed Changes

### skills/deliver-prd/SKILL.md

**Output Format section -- before:**
> ## Output Format
>
> Use the template in `references/TEMPLATE.md` to structure the output.

**Output Format section -- after:**
> ## Output Format
>
> Use the template in `references/TEMPLATE.md` to structure the output.
> The output MUST include these sections:
>
> 1. Overview
> 2. Goals & Success Metrics
> 3. User Stories
> 4. Scope
> 5. Solution Design
> 6. Technical Considerations
> 7. Dependencies & Risks
> 8. Timeline & Milestones
> 9. Open Questions
> 10. Appendix

No changes to `references/TEMPLATE.md` or `references/EXAMPLE.md`.

"Apply these changes? [yes / no]"

User: yes

## Step 5: Apply Changes (with Stale-Preview Guard)

Re-read `skills/deliver-prd/SKILL.md` -- content matches Step 2 recording.
No stale-preview conflict.

Changes applied:
- `skills/deliver-prd/SKILL.md` -- expanded Output Format section with
  explicit template section enumeration
- `updated` field changed from `2026-01-26` to `2026-04-03`

## Step 6: Suggest Version Bump

The change clarifies the output contract by making implicit requirements
explicit. Users who previously followed the template were already producing
compliant output -- nothing new is required. This is a **patch** change.

```
Suggested bump: patch (output contract clarification -- makes template
section requirements explicit without adding new requirements).
Current version: 2.0.0.
Bump to 2.0.1? [yes / override / skip]
```

User: yes

Version updated: `2.0.0` -> `2.0.1` in SKILL.md frontmatter.

## Step 7: Offer HISTORY.md Update

HISTORY.md does not exist. This is the skill's second version (2.0.0 -> 2.0.1).

"This is the second version of this skill. Would you like me to create
HISTORY.md with entries for both versions? [yes / no]"

User: yes

Created `skills/deliver-prd/HISTORY.md`:

```markdown
# deliver-prd -- Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.0.1 | 2026-04-03 | TBD | -- | changed | Output contract clarification |
| 2.0.0 | 2026-01-26 | v2.0.0 | -- | added | v2.0 restructure |

## 2.0.1 (2026-04-03)

Release: TBD.

Expanded the Output Format section to explicitly enumerate all 10 template
sections instead of a generic "use the template" reference. No new
requirements -- existing compliant output remains valid.

### Changes
- Output Format section now lists all 10 TEMPLATE.md sections by name
- Clarifies which sections are required in the output

## 2.0.0 (2026-01-26)

Released in v2.0.0.

Restructured as part of the v2.0 flat-extensions migration. Established
the current skill structure with frontmatter, instructions, output contract,
and quality checklist.

### Contract established
- Command: deliver-prd
- Phase: deliver
- Output: Product Requirements Document following TEMPLATE.md structure
```

## Step 8: Report Summary

```
## Iteration Complete: deliver-prd

**Files changed:**
- skills/deliver-prd/SKILL.md -- expanded Output Format with explicit section list
- skills/deliver-prd/HISTORY.md -- created (first iteration, two-version history)

**Version:** 2.0.0 -> 2.0.1 (patch)
**HISTORY.md:** created

**Next steps:**
- Run `utility-pm-skill-validate deliver-prd` to verify the changes pass
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- If satisfied, commit the changes
```

---

## Example Notes

This example demonstrates:
- **Validation-report-driven iteration**: the input is a structured report
  from `utility-pm-skill-validate`, parsed by `## Recommendations` and pipe-delimited fields
- **INFO findings excluded by default**: the `when-not-to-use` INFO was not
  included in the intended changes because the user did not request it
- **Before/after preview**: the Output Format section shown in full before
  and after, grouped under the target file heading
- **Stale-preview guard**: Step 5 explicitly re-reads the target file and
  confirms it matches the Step 2 recording before writing
- **Patch classification**: making implicit requirements explicit is a
  clarification, not a new requirement -- users who followed the template
  were already producing compliant output
- **HISTORY.md creation at second-version trigger**: the skill moved from
  2.0.0 to 2.0.1, triggering the governance rule to create HISTORY.md
  with entries for both versions
- **The iteration did NOT modify TEMPLATE.md or EXAMPLE.md**: the change
  was confined to SKILL.md's Output Format section
