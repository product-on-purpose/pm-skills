---
name: utility-pm-skill-validate
description: Audits an existing pm-skills skill against structural conventions and quality criteria. Produces a structured validation report with pass/fail checks, severity-graded findings, and actionable recommendations. Use when checking whether a skill meets repo standards before shipping or after making changes.
classification: utility
version: "1.0.0"
updated: 2026-04-03
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
# PM Skill Validate

This skill audits an existing pm-skills skill against the repo's structural
conventions and quality criteria. It produces a validation report that a
human can scan and that `/pm-skill-iterate` can consume as input.

The validator checks two tiers:
- **Tier 1 (Structural)** — deterministic checks that mirror CI: frontmatter,
  naming, file presence, description word count.
- **Tier 2 (Quality)** — LLM-assessed coherence checks: does the output
  contract reference the template? Is the example complete? Are checklist
  items testable?

## When to Use

- After creating a skill with `/pm-skill-builder`, before shipping
- After manually editing a skill, to confirm it still passes conventions
- Before running `/pm-skill-iterate`, to identify what needs improvement
- When a convention changes, to audit which skills need updating (batch mode)
- When reviewing a contributed skill for quality and completeness

## When NOT to Use

- To create a new skill from scratch -> use `/pm-skill-builder`
- To fix or improve a skill -> use `/pm-skill-iterate` (feed it this report)
- To run CI checks in a pipeline -> use `scripts/lint-skills-frontmatter.sh`
  (this skill is for interactive, deeper-than-CI validation)

## Instructions

When asked to validate a skill, follow these steps:

### Step 1: Identify the Target

Accept the skill name in any form:
- Directory name: `deliver-prd`
- Full path: `skills/deliver-prd/SKILL.md`
- Slash command: `/prd`

Resolve to the canonical directory path: `skills/{name}/`.

If the skill directory does not exist, report immediately:

```
# Validation Report: {input}
Result: FAIL
Skill directory `skills/{input}/` does not exist.
```

**Batch mode:** If the input is `--all`, run Tier 1 structural checks
across all skills and produce a summary table (see Step 5). Do not run
Tier 2 in batch mode.

### Step 2: Read Skill Files

Read all files in the skill directory:

| File | Required | Purpose |
|------|----------|---------|
| `SKILL.md` | yes | Frontmatter + instructions |
| `references/TEMPLATE.md` | yes | Output template |
| `references/EXAMPLE.md` | yes | Worked example |
| `HISTORY.md` | no | Version history (if present) |

Also read:
- The corresponding command file: `commands/{command-name}.md`
- The AGENTS.md entry for this skill

If reading files is not possible (MCP/embedded environment), ask the user
to paste the content of each file before proceeding (see Degraded Mode).

### Step 3: Run Tier 1 — Structural Checks

Run these deterministic checks. Each produces a `PASS` or `FAIL` line.

| Check ID | What to check | Pass condition |
|----------|--------------|----------------|
| `name-match` | Frontmatter `name` matches directory name | Exact string match |
| `description-present` | Frontmatter `description` exists | Non-empty value |
| `description-length` | Description word count | 20-100 words |
| `version-present` | Frontmatter `version` exists | Non-empty, valid SemVer |
| `updated-present` | Frontmatter `updated` exists | Non-empty, ISO date |
| `license-present` | Frontmatter `license` exists | Non-empty value |
| `phase-classification` | Phase/classification consistency | Domain has `phase:`, foundation/utility has `classification:`, not both |
| `template-exists` | `references/TEMPLATE.md` exists | File present |
| `template-sections` | TEMPLATE.md has sufficient structure | ≥3 `##` level-2 headers |
| `example-exists` | `references/EXAMPLE.md` exists | File present |
| `command-exists` | Command file exists in `commands/` | File present and references correct skill path |
| `agents-entry` | AGENTS.md has an entry for this skill | Entry exists with matching `**Path:**` |

### Step 4: Run Tier 2 — Quality Checks

Run these LLM-assessed checks. Each produces a `PASS`, `WARN`, or `INFO`
line. Tier 2 findings are capped at `WARN` unless objectively grounded
(placeholder leakage is the exception — it can `FAIL`).

| Check ID | What to assess | How to assess | Max severity |
|----------|---------------|---------------|-------------|
| `output-contract-coverage` | SKILL.md references the template | Check for explicit reference to `references/TEMPLATE.md` or "use the template" in an Output section. Accept either pattern as valid. WARN only if template is not referenced at all. | WARN |
| `checklist-verifiability` | Quality checklist items are testable | Read each checklist item. Flag items that are vague ("is good quality") vs. specific ("metrics are measurable"). WARN if ≥2 items are vague. | WARN |
| `example-completeness` | EXAMPLE.md fills all template sections | Compare `##` headers in TEMPLATE.md against `##` headers in EXAMPLE.md. WARN if EXAMPLE.md is missing sections that appear in the template. Also check for unresolved placeholders. Line count is informational only — report it but do not gate on it. | WARN |
| `template-example-alignment` | EXAMPLE.md follows TEMPLATE.md structure | Compare section header ordering. WARN if EXAMPLE.md has sections in a different order or uses different header names than TEMPLATE.md. | WARN |
| `description-actionability` | Description tells *when* to use the skill | Check for a trigger phrase like "Use when..." or "Use for..." in the frontmatter description. WARN if the description only says *what* the skill does without indicating *when* to use it. | WARN |
| `instruction-clarity` | Instructions are numbered and imperative | Check for `### Step` headings or a numbered list pattern in the Instructions section. WARN if instructions are prose paragraphs without clear step structure. | WARN |
| `placeholder-leakage` | No leftover scaffolding in any shipped file | Scan SKILL.md, TEMPLATE.md, and EXAMPLE.md for: `[Placeholder]` or `[Feature Name]` patterns, `<!-- ... -->` HTML comments (except the license header), template guidance blockquotes that should have been removed, and authoring notes like "TODO" or "FIXME". FAIL if any are found — this is objectively grounded. | FAIL |
| `when-not-to-use` | "When NOT to Use" section present in SKILL.md | Check for a section with "When NOT to Use" or similar heading. INFO only — this is present in 1/27 shipped skills and is not yet a convention. | INFO |

**Quality standard framing:** These checks validate against current library
conventions — what the shipped library actually does today. Findings graded
WARN or INFO represent the v2.8 quality standard that newer skills (built
with `/pm-skill-builder`) meet. Older skills may legitimately receive these
findings until iterated through the lifecycle.

### Step 5: Produce the Validation Report

Assemble the report using this exact structure. F-11 (`/pm-skill-iterate`)
parses this report by section headings and pipe-delimited fields.

```
# Validation Report: {skill-name}
Date: {YYYY-MM-DD}
Skill version: {version from frontmatter}
Validator version: 1.0.0
Report schema: v1
Result: {PASS | WARN | FAIL}

## Summary
{1-2 sentence overall assessment.}
Errors: {n} | Warnings: {n} | Info: {n}

> Tier 2 findings are heuristic quality assessments and may require human review.

## Structural Checks
- {STATUS} | structural | {check-id} | {message}
- {STATUS} | structural | {check-id} | {message}
...

## Quality Checks
- {STATUS} | quality | {check-id} | {message}
- {STATUS} | quality | {check-id} | {message}
...

## Recommendations
1. {STATUS} | {check-id} | Target: {file-path}
   Action: {what to do}
2. {STATUS} | {check-id} | Target: {file-path}
   Action: {what to do}
...
```

**Report rules:**

- **Result** = worst severity found: any FAIL → `FAIL`, else any WARN → `WARN`, else `PASS`.
- **Structural Checks**: one line per Tier 1 check. STATUS is `PASS` or `FAIL`.
- **Quality Checks**: one line per Tier 2 check. STATUS is `PASS`, `WARN`, or `INFO`.
- **Recommendations**: only include checks that did NOT pass. Each recommendation
  includes the check ID, the target file path, and a specific action.
- If all checks pass, the Recommendations section should say: "No issues found."
- Omit passing checks from Recommendations — only list findings that need action.

**Batch mode output** (when input is `--all`):

Run Tier 1 structural checks only across all skills. Produce a summary table:

```
# Batch Validation Summary
Date: {YYYY-MM-DD}
Validator version: 1.0.0
Report schema: v1
Skills checked: {n}

| Skill | Result | Errors | Warnings |
|-------|--------|--------|----------|
| deliver-prd | PASS | 0 | 0 |
| define-hypothesis | WARN | 0 | 1 |
| foundation-persona | FAIL | 1 | 0 |
...

Skills passing: {n}/{total}
Run `/pm-skill-validate {skill}` for a detailed report.
```

## Degraded Mode

If you cannot read skill files directly (e.g., running via MCP or in an
embedded environment without file system access):

1. Ask the user to provide the content of each required file:
   - `skills/{name}/SKILL.md`
   - `skills/{name}/references/TEMPLATE.md`
   - `skills/{name}/references/EXAMPLE.md`
2. Run all checks against the provided content.
3. Note in the report: "Validated from user-provided content (file system not available)."
4. Batch mode is not available in degraded mode — single skill only.

## Output Contract

The validator MUST produce a validation report following the format in Step 5.

The report:
- Uses the exact section headings: `## Summary`, `## Structural Checks`,
  `## Quality Checks`, `## Recommendations`
- Uses pipe-delimited check lines: `STATUS | TIER | CHECK-ID | message`
- Uses pipe-delimited recommendations: `STATUS | CHECK-ID | Target: path`
  followed by `Action: description` on the next line
- Includes `Report schema: v1` in the header for F-11 compatibility
- Includes the Tier 2 caveat line in the Summary section

## Quality Checklist

Before delivering the report, verify:

- [ ] All Tier 1 structural checks were run (not skipped)
- [ ] All Tier 2 quality checks were run (not skipped) — single skill mode only
- [ ] Report follows the exact section and line format from Step 5
- [ ] Every non-passing check appears in Recommendations with a target file path
- [ ] Result field reflects the worst severity found
- [ ] Tier 2 findings are capped at WARN (except placeholder-leakage which can FAIL)
- [ ] No Tier 2 check was marked FAIL unless objectively grounded

## Examples

See `references/EXAMPLE.md` for a completed validation report demonstrating
both Tier 1 and Tier 2 checks against a real shipped skill.
