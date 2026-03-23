# Skill Implementation Packet: {Skill Name}

> **Created**: {date}
> **Builder version**: 1.0.0
> **Status**: Draft | Promoted | Abandoned

---

## Decision

{Recommendation: create / revise existing / bundle / command / docs-only}

{Why Gate evidence if applicable — the 2-3 specific prompts or scenarios
where existing skills fail}

---

## Classification

| Field | Value |
|-------|-------|
| Type | {domain / foundation / utility} |
| Phase | {discover / define / develop / deliver / measure / iterate / n/a} |
| Category | {specification / research / coordination / validation / reflection / ideation / problem-framing} |
| Directory | {phase/classification}-{skill-name} |
| Command | /{command-name} |

---

## Overlap Analysis

### Existing skills checked

{List of skills reviewed during gap analysis}

### Findings

{What was found — specific overlap and differentiation}

### Why this skill is still needed

{The gap this skill fills that no existing skill covers}

---

## Quality Forecast

### Zone Distribution

| Zone | Weight | Description |
|------|--------|-------------|
| Knowledge (K) | {0-100} | {What domain knowledge this skill encodes} |
| Process (P) | {0-100} | {What workflow/steps this skill teaches} |
| Constraint (C) | {0-100} | {What rules/guardrails this skill enforces} |
| Wisdom (W) | {0-100} | {What judgment/reflection this skill develops} |

> **Rule**: Weights must sum to 100. Round to nearest 5. These are approximate
> guidance signals for writing style, not scored metrics.

**Dominant zone**: {zone} ({weight}%)

### Writing Guidance

{Zone-specific guidance based on the dominant zone — see Quality Forecast
Guide in SKILL.md for the mapping}

---

## Exemplar Skills

| Skill | Why selected |
|-------|-------------|
| {exemplar-1} | {Same phase, similar category, closest structural match} |
| {exemplar-2} | {Additional reference for a specific pattern} |

---

## Draft Frontmatter

```yaml
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: {skill-name}
description: {20-100 word description on a single line — linter reads first line only}
phase: {phase}          # for domain skills only — omit for foundation/utility
classification: {type}  # for foundation/utility only — omit for domain
version: "1.0.0"
updated: {date}
license: Apache-2.0
metadata:
  category: {category}
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

> **Linter constraint**: `description:` must be a single-line value (no `>-` or `|` folding).
> The linter extracts only the first line after the key using `sed`. Multiline YAML
> would capture the literal `>-` string and fail the 20-100 word check.

---

## Draft SKILL.md

{Full draft content — not an outline. Includes:
- Title and introductory paragraph
- When to Use section
- When NOT to Use section (if applicable)
- Instructions (numbered steps)
- Output Contract
- Quality Checklist
- Examples reference

Mirrors the section structure of the selected exemplar skill.}

---

## Draft TEMPLATE.md

{Section headers with guidance comments for each section.
Each section has:
- A ## header
- A brief instruction comment explaining what goes here
- Placeholder structure showing the expected format}

---

## Draft EXAMPLE.md

{A complete, realistic example — 150-300 lines.
- Picks a specific PM scenario appropriate to the skill's domain
- Fills every TEMPLATE.md section with concrete content
- Demonstrates optional sections both filled and skipped
- Shows what "good" looks like for ambiguous sections}

---

## Draft Command

```markdown
---
description: {One-line description of what the command does}
---

Use the `{skill-name}` skill to {primary action}.

Read the skill instructions from `skills/{directory-name}/SKILL.md` and follow them to {describe the task}.

Use `skills/{directory-name}/references/TEMPLATE.md` as the output format.

Context from user: $ARGUMENTS
```

> **Convention**: Command files use only `description:` in frontmatter. No `name`,
> `arguments`, or `skill_file` fields. The optional idea argument is handled via
> `$ARGUMENTS` in the prose body, matching all existing commands.

---

## AGENTS.md Entry

```markdown
#### {skill-name}
**Path:** `skills/{directory-name}/SKILL.md`

{1-2 sentence description. Imperative verb start, use-case focus.}

---
```

> **Convention**: Level-4 header (kebab-case skill name), `**Path:**` line,
> blank line, description paragraph, `---` separator. No `**Command:**` field.
> Must pass `validate-agents-md.sh` which checks path ↔ directory sync.

---

## Validation Checklist

### CI Validation (must pass — enforced by linter + validators)

- [ ] `name` matches directory name
- [ ] `description` is 20-100 words (single-line, no `>-`)
- [ ] `version` present (exactly one root-level, no `metadata.version`)
- [ ] `updated` present (ISO date format)
- [ ] `license` present (`Apache-2.0`)
- [ ] Phase/classification consistency (domain has `phase:`, foundation/utility has `classification:`)
- [ ] `references/TEMPLATE.md` exists with ≥3 `##` sections
- [ ] Command file references correct skill path (`validate-commands.sh`)
- [ ] AGENTS.md entry uses `#### {name}` + `**Path:**` format (`validate-agents-md.sh`)

### Quality Checks (should pass — builder-enforced, not CI-gated)

- [ ] `references/EXAMPLE.md` is a complete artifact (150-300 lines), not an outline
- [ ] Output contract present in SKILL.md
- [ ] Quality checklist present in SKILL.md
- [ ] Quality Forecast identifies dominant zone with writing guidance
- [ ] Gap analysis checked all existing skills (not just same-phase)
- [ ] Why Gate evidence is specific (names prompts/scenarios, not vague)

---

## Next Steps

1. **Review**: Read through the packet above. Flag any sections that need changes.
2. **Local CI**: Run `bash scripts/lint-skills-frontmatter.sh` after promotion.
3. **Test**: Try using `/{command-name}` with a realistic PM scenario.
4. **Contribute**: If submitting to pm-skills, create a GitHub issue using the
   skill-proposal template, then open a PR with the promoted files.
5. **Iterate**: Use the pm-skill iteration utility (when available) to refine based on testing feedback.
