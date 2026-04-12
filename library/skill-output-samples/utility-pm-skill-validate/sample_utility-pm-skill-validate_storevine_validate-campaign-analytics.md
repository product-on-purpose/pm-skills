<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: validation-report
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine B2B ecommerce platform — validating the campaign-analytics skill from skill builder output
---

## Scenario

After generating the campaign-analytics skill with `/pm-skill-builder`, the contributor runs validation to check whether the skill meets pm-skills structural conventions and quality criteria before opening a PR. The validator finds two warnings: the EXAMPLE.md is slightly under the recommended line count and the SKILL.md is missing a "When NOT to Use" section. All structural (Tier 1) checks pass. [fictional]

---

## Prompt

```
/pm-skill-validate

Skill: campaign-analytics
Path: skills/measure-campaign-analytics/
```

---

## Output

# Validation Report: campaign-analytics
Date: 2026-04-11
Skill version: 1.0.0
Validator version: 1.0.0
Report schema: v1
Result: WARN

## Summary

The campaign-analytics skill passes all structural checks and most quality checks. Two warnings identified: the EXAMPLE.md is 142 lines (below the 150-line recommendation) and the SKILL.md omits the optional "When NOT to Use" section. No blockers for contribution. [fictional]

Errors: 0 | Warnings: 2 | Info: 1

> Tier 2 findings are heuristic quality assessments and may require human review.

## Structural Checks

- PASS | structural | S-01 | `name` field matches directory name (campaign-analytics)
- PASS | structural | S-02 | `description` is 34 words, single-line (within 20-100 range)
- PASS | structural | S-03 | `version` field present (1.0.0)
- PASS | structural | S-04 | `updated` field present (2026-04-11, valid ISO date)
- PASS | structural | S-05 | `license` field present (Apache-2.0)
- PASS | structural | S-06 | Phase/classification consistent (domain skill has `phase: measure`)
- PASS | structural | S-07 | `references/TEMPLATE.md` exists with 7 `##` sections (minimum 3)
- PASS | structural | S-08 | Command file references correct path (`skills/measure-campaign-analytics/SKILL.md`)
- PASS | structural | S-09 | AGENTS.md entry uses `#### campaign-analytics` + `**Path:**` format
- PASS | structural | S-10 | No duplicate `version` key in frontmatter (single root-level only)

## Quality Checks

- WARN | quality | Q-01 | EXAMPLE.md is 142 lines (recommendation: 150-300 lines)
- PASS | quality | Q-02 | Output contract section present in SKILL.md
- PASS | quality | Q-03 | Quality checklist section present in SKILL.md
- WARN | quality | Q-04 | SKILL.md missing "When NOT to Use" section (recommended for all skills)
- PASS | quality | Q-05 | Funnel Definition section in TEMPLATE.md has guidance comments
- PASS | quality | Q-06 | No unresolved placeholders found (no TBD, TODO, or angle-bracket placeholders)
- INFO | quality | Q-07 | No HISTORY.md present (expected for v1.0.0 -- HISTORY.md is created at second version)
- PASS | quality | Q-08 | All TEMPLATE.md sections appear in EXAMPLE.md in matching order

## Recommendations

1. WARN | Q-01 | Target: `skills/measure-campaign-analytics/references/EXAMPLE.md`
   Action: Expand the Attribution Model section with a worked calculation showing first-touch vs. multi-touch comparison. This would add approximately 20 lines and bring the example above the 150-line minimum. [fictional]

2. WARN | Q-04 | Target: `skills/measure-campaign-analytics/SKILL.md`
   Action: Add a "When NOT to Use" section clarifying that this skill is not for A/B test design (use `/experiment-design`) or event schema definition (use `/instrumentation-spec`). This helps users select the right skill and reduces overlap confusion. [fictional]
