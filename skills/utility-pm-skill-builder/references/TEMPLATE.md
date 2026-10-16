# Skill Implementation Packet: {Skill Name}

> **Created**: {date}
> **Builder version**: 1.3.0
> **Status**: Draft | Promoted | Abandoned

---

## Decision

{Recommendation: create / revise existing / workflow / command / docs-only}

{Why Gate evidence if applicable - the 2-3 specific prompts or scenarios
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

{What was found - specific overlap and differentiation}

### Why this skill is still needed

{The gap this skill fills that no existing skill covers}

---

## Exemplar Skills

| Skill | Why selected |
|-------|-------------|
| {exemplar-1} | {Same phase, similar category, closest structural match} |
| {exemplar-2} | {Additional reference for a specific pattern} |

---

## Draft Frontmatter

```yaml
---
name: {skill-name}
description: {20-100 word description on a single line - linter reads first line only}
license: Apache-2.0
metadata:
  phase: {phase}          # domain skills only - omit for foundation/utility/tool
  classification: {type}  # foundation/utility/tool only - omit for domain
  version: "1.0.0"
  updated: {date}
  category: {category}
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
```

> **Placement constraint**: the opening `---` must be the first bytes of the file, and
> `version`, `updated`, `phase` and `classification` live under `metadata:`.
> `lint-skills-frontmatter.sh` rejects any of the four at the top level. The attribution
> comment goes after the closing `---`, never before it.

> **Linter constraint**: `description:` must be a single-line value (no `>-` or `|` folding).
> The linter extracts only the first line after the key using `sed`. Multiline YAML
> would capture the literal `>-` string and fail the 20-100 word check.

---

## Draft SKILL.md

{Full draft content - not an outline. Includes:
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

{A complete, realistic example - 150-300 lines.
- Picks a specific PM scenario appropriate to the skill's domain
- Fills every TEMPLATE.md section with concrete content
- Demonstrates optional sections both filled and skipped
- Shows what "good" looks like for ambiguous sections}

---

## Draft HISTORY.md

{A version history with one baseline row, in the format of
`docs/internal/skill-versioning.md`, "Skill History (HISTORY.md)":
- Title line: `# {skill-name} - Version History`
- Summary table with the header `| Version | Date | Release | Effort | Type | Summary |`
  and one row: `1.0.0`, the date, the target release (or `-` if none is assigned),
  the effort ID (or `-`), `baseline`, and a one-sentence summary
- A `## 1.0.0 ({date})` section stating the contract this version establishes: its
  inputs, its output, and what a later change would have to break to be a major}

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

### CI Validation (must pass - enforced by linter + validators)

- [ ] `name` matches directory name
- [ ] `description` is 20-100 words (single-line, no `>-`)
- [ ] `metadata.version` present, and no top-level `version` (`lint-skills-frontmatter.sh`)
- [ ] `metadata.updated` present (ISO date format), and no top-level `updated`
- [ ] `license` present at the top level (`Apache-2.0`)
- [ ] Phase/classification consistency under `metadata:` (domain has `phase:`, foundation/utility/tool has `classification:`, never both)
- [ ] `references/TEMPLATE.md` exists with ≥3 `##` sections
- [ ] Command file references correct skill path (`validate-commands.sh`)
- [ ] AGENTS.md entry uses `#### {name}` + `**Path:**` format (`validate-agents-md.sh`)

### Quality Checks (should pass - builder-enforced, not CI-gated)

- [ ] `references/EXAMPLE.md` is a complete artifact (150-300 lines), not an outline
- [ ] `HISTORY.md` has a baseline row for the first version and a matching `## 1.0.0` section
- [ ] Output contract present in SKILL.md
- [ ] Quality checklist present in SKILL.md
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
