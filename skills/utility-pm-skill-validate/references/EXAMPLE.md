# Validation Report: deliver-prd
Date: 2026-04-03
Skill version: 2.0.0
Validator version: 1.0.0
Report schema: v1
Result: WARN

## Summary

`deliver-prd` passes all structural checks. Two quality findings: the output
contract uses a generic template reference (acceptable but below v2.8
standard), and the skill lacks a "When NOT to Use" section (informational).

Errors: 0 | Warnings: 1 | Info: 1

> Tier 2 findings are heuristic quality assessments and may require human review.

## Structural Checks
- PASS | structural | name-match | frontmatter `name` matches directory
- PASS | structural | description-present | description exists
- PASS | structural | description-length | 31 words (20-100 range)
- PASS | structural | version-present | version "2.0.0"
- PASS | structural | updated-present | updated 2026-01-26
- PASS | structural | license-present | Apache-2.0
- PASS | structural | phase-classification | phase: deliver (domain skill, no classification field)
- PASS | structural | template-exists | references/TEMPLATE.md present
- PASS | structural | template-sections | 10 level-2 headers (≥3 required)
- PASS | structural | example-exists | references/EXAMPLE.md present
- PASS | structural | command-exists | commands/prd.md exists and references correct path
- PASS | structural | agents-entry | AGENTS.md entry found with matching path

## Quality Checks
- WARN | quality | output-contract-coverage | Output Format section says "Use the template in `references/TEMPLATE.md` to structure the output" but does not enumerate template sections explicitly. Accepted as valid - this is the current library convention.
- PASS | quality | checklist-verifiability | all 7 checklist items are specific and testable (e.g., "Success metrics are specific and measurable", "Document is readable in under 15 minutes")
- PASS | quality | example-completeness | EXAMPLE.md fills all 10 template sections with concrete content. No placeholder scaffolding detected. Line count: 212 (informational).
- PASS | quality | template-example-alignment | EXAMPLE.md section headers match TEMPLATE.md in order and naming
- PASS | quality | description-actionability | description includes trigger phrase: "Use when specifying features, epics, or product initiatives for engineering handoff"
- PASS | quality | instruction-clarity | 8 numbered steps with imperative verbs (Summarize, Define, Outline, Detail, Define, Address, Identify, Propose)
- PASS | quality | placeholder-leakage | no unresolved placeholders, HTML comments (except license header), or authoring notes found
- INFO | quality | when-not-to-use | no "When NOT to Use" section present (optional - present in 1/27 shipped skills)

## Recommendations
1. WARN | output-contract-coverage | Target: skills/deliver-prd/SKILL.md
   Action: Consider enumerating the template sections explicitly in the Output Format section (e.g., "The output MUST include: Problem Summary, Goals, Solution Overview..."). Current generic reference is valid but below v2.8 standard.
2. INFO | when-not-to-use | Target: skills/deliver-prd/SKILL.md
   Action: Consider adding a "When NOT to Use" section to help users pick the right skill. Example: "Not for lightweight feature briefs -> use solution-brief instead."

---

## Example Notes

This report demonstrates:
- All 12 Tier 1 structural checks passing (common for shipped skills)
- Tier 2 quality checks surfacing one WARN and one INFO against a well-established skill
- The WARN for `output-contract-coverage` illustrates the "current conventions vs. v2.8 standard" framing - the skill is valid by current standards, but the validator surfaces the higher standard as a suggestion
- The INFO for `when-not-to-use` illustrates a finding that is purely optional guidance
- Recommendations include target file paths and specific actions for each finding
- The overall Result is WARN (worst severity found), not FAIL
