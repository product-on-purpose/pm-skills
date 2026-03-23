# Skill Implementation Packet: Change Communication

> **Created**: 2026-03-22
> **Builder version**: 1.0.0
> **Status**: Draft

---

## Decision

**Recommendation**: Create new skill.

A mid-stage SaaS company needs a repeatable way to produce change management
communications when shipping features that alter user workflows. Existing skills
cover adjacent concerns (release notes for external announcements, launch
checklists for cross-functional readiness) but nothing guides the actual
writing of internal adoption-focused communications that help users understand
what changed, why it matters, and what they need to do differently.

---

## Classification

| Field | Value |
|-------|-------|
| Type | domain |
| Phase | deliver |
| Category | coordination |
| Directory | deliver-change-communication |
| Command | /change-communication |

---

## Overlap Analysis

### Existing skills checked

All 26 skills reviewed. Closest matches:

- `deliver-release-notes` — produces external-facing release announcements
- `deliver-launch-checklist` — tracks cross-functional launch readiness
- `deliver-user-stories` — defines implementation requirements
- `discover-stakeholder-summary` — maps stakeholder needs and influence

### Findings

**deliver-release-notes**: Covers what shipped and why users should care, but
targets external audiences (changelog readers, update-notification subscribers).
Change communications target internal users, support teams, and account managers
who need to understand workflow impact and guide adoption.

**deliver-launch-checklist**: Includes "communications sent" as a line item but
does not guide what those communications should contain, how to structure them
for different audiences, or how to sequence rollout messaging.

### Why this skill is still needed

No existing skill produces the actual communication artifact — the email, Slack
message, or internal knowledge-base update that tells affected users what
changed, what they need to do differently, and where to get help. This is a
distinct coordination artifact in the Deliver phase.

---

## Quality Forecast

### Zone Distribution

| Zone | Weight | Description |
|------|--------|-------------|
| Knowledge (K) | 20 | Change management principles, communication best practices |
| Process (P) | 40 | Step-by-step workflow from feature context to drafted communications |
| Constraint (C) | 15 | Audience segmentation rules, required sections, tone guidelines |
| Wisdom (W) | 25 | Judgment on what level of detail each audience needs, when to escalate |

**Dominant zone**: Process (40%)

### Writing Guidance

Process-heavy skill: use numbered steps with clear inputs and outputs at each
stage. Be prescriptive about the workflow order (identify audiences → assess
impact → draft per-audience messages → review). Include decision points where
the PM must choose between communication approaches based on change severity.

---

## Exemplar Skills

| Skill | Why selected |
|-------|-------------|
| deliver-release-notes | Same phase (deliver), same category (coordination), closest artifact type — both produce written communications about product changes |
| deliver-launch-checklist | Same phase (deliver), different category — shows how to structure a multi-audience coordination artifact with checkpoints |

---

## Draft Frontmatter

```yaml
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: deliver-change-communication
description: Creates targeted change management communications for feature launches that alter user workflows. Guides audience segmentation, impact assessment, message drafting, and rollout sequencing to drive adoption and reduce support burden for SaaS product changes.
phase: deliver
version: "1.0.0"
updated: 2026-03-22
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

---

## Draft SKILL.md

> Representative excerpt showing all section headers with sample content.
> A full implementation would expand each section to 5-15 lines.

```markdown
# Change Communication

Change communication bridges the gap between shipping a feature and ensuring
affected users successfully adopt the new workflow.

## When to Use

- When a feature launch changes existing user workflows
- When multiple audience segments need different levels of detail
- When support teams need advance preparation for user questions

## Instructions

### Step 1: Identify the Change and Affected Audiences
Gather the feature context and segment audiences by impact level.

### Step 2: Assess Workflow Impact
Map before/after workflows for each audience segment.

### Step 3: Draft Per-Audience Messages
Write targeted communications using the template structure.

### Step 4: Plan Rollout Sequence
Determine timing and channels for each audience segment.

### Step 5: Review and Finalize
Verify completeness, tone, and accuracy with stakeholders.

## Output Contract

Use `references/TEMPLATE.md` to structure the output.

## Quality Checklist

- [ ] All affected audience segments are identified
- [ ] Before/after workflow changes are explicit
- [ ] Each message includes what changed, why, and what to do next
- [ ] Support enablement section is complete
- [ ] Rollout timing accounts for audience dependencies

## Examples

See `references/EXAMPLE.md` for a completed example.
```

---

## Draft TEMPLATE.md

> Representative excerpt with section headers and guidance comments.

```markdown
# Change Communication: {Feature Name}

## Change Summary

> Describe the feature change in 2-3 sentences. Focus on what users will
> experience differently, not technical implementation details.

## Affected Audiences

> List each audience segment with their relationship to the change.

| Audience | Impact Level | Primary Channel |
|----------|-------------|-----------------|
| {segment} | High / Medium / Low | {email / Slack / in-app / KB article} |

## Workflow Impact Assessment

> For each audience, describe the before and after states.

### {Audience Segment}

**Before**: {current workflow}
**After**: {new workflow}
**Action required**: {what they need to do differently}

## Communications

### {Audience Segment} Message

> Draft the actual message content for this audience.

**Subject**: {email subject or message headline}
**Body**: {complete message text}

## Support Enablement

> What does the support team need to know to handle questions?

## Rollout Schedule

> When does each communication go out, relative to the launch?

| Audience | Timing | Channel | Owner |
|----------|--------|---------|-------|
| {segment} | {T-N days / launch day / T+N days} | {channel} | {person} |
```

---

## Draft EXAMPLE.md

A complete example would demonstrate a change communication package for a
realistic SaaS scenario — such as migrating a dashboard reporting interface
from a legacy layout to a new design system. It would fill every template
section with concrete content: three audience segments (power users, casual
viewers, account administrators), before/after workflow descriptions, drafted
messages per audience, a support FAQ, and a rollout timeline spanning T-5
through T+3 days. Target length: 150-300 lines.

---

## Draft Command

```markdown
---
description: Create change management communications for a feature launch
---

Use the `deliver-change-communication` skill to create targeted change communications.

Read the skill instructions from `skills/deliver-change-communication/SKILL.md` and follow them to guide the user through audience segmentation, impact assessment, and message drafting.

Use `skills/deliver-change-communication/references/TEMPLATE.md` as the output format.

Context from user: $ARGUMENTS
```

---

## AGENTS.md Entry

```markdown
#### change-communication
**Path:** `skills/deliver-change-communication/SKILL.md`

Creates targeted change management communications for feature launches that alter user workflows. Use when multiple audiences need different messages about what changed, why, and what to do next.

---
```

---

## Validation Checklist

### CI Validation

- [x] `name` matches directory name (`deliver-change-communication`)
- [x] `description` is 20-100 words (single-line) — 33 words
- [x] `version` present (`"1.0.0"`)
- [x] `updated` present (`2026-03-22`)
- [x] `license` present (`Apache-2.0`)
- [x] Phase/classification: domain skill has `phase: deliver`, no `classification:` field
- [x] `references/TEMPLATE.md` has ≥3 `##` sections (6 sections)
- [x] Command file references correct path (`skills/deliver-change-communication/SKILL.md`)
- [x] AGENTS.md entry uses `#### change-communication` + `**Path:**` format

### Quality Checks

- [x] `references/EXAMPLE.md` will be a complete artifact (150-300 lines)
- [x] Output contract present in draft SKILL.md
- [x] Quality checklist present in draft SKILL.md
- [x] Quality Forecast identifies Process (40%) as dominant zone with writing guidance
- [x] Gap analysis checked all 26 existing skills
- [x] Why Gate not triggered (no high overlap — release-notes and launch-checklist serve different purposes)

---

## Next Steps

1. **Review**: Read through the packet above. Flag any sections that need changes.
2. **Local CI**: Run `bash scripts/lint-skills-frontmatter.sh` after promotion.
3. **Test**: Try using `/change-communication` with a realistic feature launch scenario.
4. **Contribute**: If submitting to pm-skills, create a GitHub issue using the
   skill-proposal template, then open a PR with the promoted files.
5. **Iterate**: Use the pm-skill iteration utility (when available) to refine based on testing feedback.
