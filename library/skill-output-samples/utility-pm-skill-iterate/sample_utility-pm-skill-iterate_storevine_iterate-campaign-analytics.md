<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: iteration-change-summary
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine B2B ecommerce platform — iterating on campaign-analytics skill after validation findings
---

## Scenario

After running `/pm-skill-validate` on the campaign-analytics skill, the contributor received two warnings: (1) EXAMPLE.md is 142 lines, below the 150-line recommendation, and (2) SKILL.md is missing a "When NOT to Use" section. The contributor uses `/pm-skill-iterate` to apply both fixes based on the validation report. [fictional]

---

## Prompt

```
/pm-skill-iterate

Skill: campaign-analytics
Path: skills/measure-campaign-analytics/

Apply fixes from validation report:
1. Q-01: Expand EXAMPLE.md Attribution Model section to reach 150+ lines
2. Q-04: Add "When NOT to Use" section to SKILL.md
```

---

## Output

# Iteration Change Summary: campaign-analytics

## Intended Changes

1. Target: `skills/measure-campaign-analytics/references/EXAMPLE.md` -> Attribution Model
   Change: Expand section with a worked first-touch vs. multi-touch attribution comparison using fictional campaign data
   Source: validation report Q-01

2. Target: `skills/measure-campaign-analytics/SKILL.md` -> When NOT to Use
   Change: Add new section after "When to Use" listing three scenarios where other skills are more appropriate
   Source: validation report Q-04

## Proposed Changes

### skills/measure-campaign-analytics/references/EXAMPLE.md

**Attribution Model -- before:**
> ## Attribution Model
>
> **Model**: First-touch attribution
> **Rationale**: For Storevine's initial Campaigns launch, first-touch is sufficient because each merchant typically runs one campaign at a time. Multi-touch attribution will be revisited when automated drip sequences ship in Q3. [fictional]

**Attribution Model -- after:**
> ## Attribution Model
>
> **Model**: First-touch attribution (with multi-touch comparison)
> **Rationale**: For Storevine's initial Campaigns launch, first-touch is the primary model because each merchant typically runs one campaign at a time. A multi-touch comparison is included below to establish the baseline for when automated drip sequences ship in Q3. [fictional]
>
> ### First-Touch Example
>
> | Campaign | Sends | Revenue (first-touch) |
> |----------|-------|-----------------------|
> | Spring Sale | 4,200 | $18,400 [fictional] |
> | New Arrivals | 2,800 | $9,200 [fictional] |
> | Win-Back | 1,500 | $6,100 [fictional] |
>
> ### Multi-Touch Comparison
>
> | Campaign | First-Touch Revenue | Multi-Touch Revenue | Delta |
> |----------|--------------------|--------------------|-------|
> | Spring Sale | $18,400 | $14,200 | -$4,200 [fictional] |
> | New Arrivals | $9,200 | $11,800 | +$2,600 [fictional] |
> | Win-Back | $6,100 | $7,700 | +$1,600 [fictional] |
>
> **Insight**: First-touch over-credits the Spring Sale campaign because many of those buyers also received the New Arrivals email before converting. Multi-touch redistributes $4,200 of attributed revenue to downstream touchpoints. This gap will widen as drip sequences add more touchpoints per buyer journey. [fictional]

### skills/measure-campaign-analytics/SKILL.md

**When NOT to Use -- before:**
> (Section did not exist)

**When NOT to Use -- after:**
> ## When NOT to Use
>
> - **A/B test design**: If you need to design a controlled experiment comparing two campaign variants, use `/experiment-design` instead. This skill defines the measurement framework, not the experimental protocol.
> - **Event tracking schemas**: If you need to specify the exact event payloads and tracking implementation for engineering, use `/instrumentation-spec`. This skill defines what to measure, not how to instrument it.
> - **Dashboard layout**: If you already know your KPIs and need to specify the dashboard UI, use `/dashboard-requirements`. This skill produces the analytical inputs that feed into a dashboard spec.

## Applied Changes

| File | Change |
|------|--------|
| `skills/measure-campaign-analytics/references/EXAMPLE.md` | Expanded Attribution Model with first-touch vs. multi-touch worked comparison (+22 lines, now 164 lines total) [fictional] |
| `skills/measure-campaign-analytics/SKILL.md` | Added "When NOT to Use" section with three differentiation scenarios |

## Version

Current: 1.0.0
Suggested bump: patch (documentation improvement, no output contract change)
New version: 1.0.1 [fictional]

## HISTORY.md

Created

```markdown
# campaign-analytics Change History

## 1.0.1 (2026-04-11)

- Expanded EXAMPLE.md Attribution Model section with multi-touch comparison
- Added "When NOT to Use" section to SKILL.md for clearer skill selection
```
