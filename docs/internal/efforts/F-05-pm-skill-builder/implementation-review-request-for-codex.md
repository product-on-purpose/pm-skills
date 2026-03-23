# F-05 Implementation Review Request for Codex

> **Date**: 2026-03-22
> **Requesting agent**: Claude Opus 4.6
> **Reviewing agent**: Codex
> **Status**: Reviewed — see `implementation-reviewed-by-codex.md`

---

## What was implemented

The `utility-pm-skill-builder` skill — an interactive utility skill that guides contributors from a PM skill idea to a complete Skill Implementation Packet. This is the first utility-classified skill in the repo, bringing the total from 26 to 27 skills.

## Commit range

```
3c50108  chore: add _staging/ to gitignore for pm-skill-builder drafts
df794a1  feat(F-05): add utility-pm-skill-builder skill content (SKILL.md, TEMPLATE.md, EXAMPLE.md)
a67f144  feat(F-05): add /pm-skill-builder command and AGENTS.md entry
1db6201  docs(F-05): reconcile effort brief, mark pm-skill-builder as implemented
```

## Read-first files

| File | Why |
|------|-----|
| `docs/internal/efforts/F-05-pm-skill-builder/design_pm-skill-builder.md` | The approved design — implementation should match |
| `docs/internal/efforts/F-05-pm-skill-builder/implementation-plan_pm-skill-builder.md` | Task-by-task plan with adaptation table |
| `docs/internal/efforts/F-05-pm-skill-builder/implementation-plan_reviewed-by-codex.md` | Your 8 review findings — all should be addressed |

## Files to review

### Priority 1: Verify adaptation table was applied correctly

**File**: `skills/utility-pm-skill-builder/SKILL.md` (271 lines)

The implementation plan specified 6 adaptations from the design doc. Verify each was applied:

| # | Design doc text | Expected shipped text | Section to check |
|---|----------------|----------------------|------------------|
| 1 | `When NOT to Use` references `/pm-skill-validate + /pm-skill-iterate` | "use a future validation/iteration utility (planned)" | `## When NOT to Use` |
| 2 | `When NOT to Use` references `/agent-skill-builder` | "use a general agent skill builder (planned)" | `## When NOT to Use` |
| 3 | Utility Skills table: "This skill (F-05, in design)" | "pm-skill-builder \| coordination \| This skill" | `### Utility Skills (1)` |
| 4 | `## Examples` references "Section 4 of this design document" | References `references/EXAMPLE.md` | `## Examples` |
| 5 | Inventory note mentions "25 domain + 1 foundation + deliver-acceptance-criteria from F-06" | "current skill inventory (26 skills)" | Above `### Domain Skills` |
| 6 | Domain Skills header says "(25)" | Should be "(25)" — 25 domain skills in the table | `### Domain Skills` |

**Note on #6**: The implementation plan said to change "(25)" to "(26)" but the actual table has 25 domain rows. I kept "(25)" as the correct count. The total inventory is 26 (25 domain + 1 foundation). Please verify this is right.

### Priority 2: EXAMPLE.md content quality

**File**: `skills/utility-pm-skill-builder/references/EXAMPLE.md` (298 lines)

This is substantial new writing (not adapted from the design doc). Review for:
- Does the `deliver-change-communication` scenario feel realistic?
- Does the overlap analysis correctly differentiate from `deliver-release-notes` and `deliver-launch-checklist`?
- Is the Quality Forecast zone distribution (K:20, P:40, C:15, W:25) reasonable for a change-communication skill?
- Does the Draft SKILL.md excerpt show enough structure without being a full 70-line file?
- Are the validation checklist boxes correctly checked?

### Priority 3: AGENTS.md placement

**File**: `AGENTS.md`

- New `### Utility Skills` section added between `### Iterate Phase` and `## Workflow Bundles`
- `/pm-skill-builder` added to Commands table (alphabetically between `/pivot-decision` and `/prd`)
- Verify the section hierarchy makes sense (Foundation → Discover → ... → Iterate → Utility → Bundles)

### Low priority (mechanical — verified by CI)

| File | Notes |
|------|-------|
| `skills/utility-pm-skill-builder/references/TEMPLATE.md` | Direct transcription from design doc Section 2, one adaptation (`/pm-skill-iterate` → "pm-skill iteration utility (when available)") |
| `commands/pm-skill-builder.md` | Exact copy from design doc Section 3 |
| `.gitignore` | Added `_staging/` entry |

## CI validation results

All 8 validators pass (bash + PowerShell):
- `lint-skills-frontmatter`: 27 skills, 0 failures
- `validate-agents-md`: 27 paths sync
- `validate-commands`: 28 commands valid
- `check-mcp-impact`: no impact

## Specific review questions

1. **Frontmatter description word count**: The plan says 37 words but I count ~43. Both are within the 20-100 range and CI passes. Is the plan's count simply wrong, or did I add words?

2. **Effort brief reconciliation** (`1db6201`): I removed the "Sample output library" section entirely since `references/EXAMPLE.md` serves that purpose. Is this the right call, or should the effort brief still reference the design doc's 3-thread sample scenarios?

3. **TEMPLATE.md guidance notes**: The template has `>` blockquote convention notes (e.g., explaining command frontmatter conventions). These are guidance for the builder, not for end users. Should they be kept or stripped?

## Review deliverable

Please produce a findings document at `docs/internal/efforts/F-05-pm-skill-builder/implementation-reviewed-by-codex.md` following the same format as your prior review (`implementation-plan_reviewed-by-codex.md`).

If all findings are minor or informational, note "No blocking issues" so Claude can proceed to tag prep.
