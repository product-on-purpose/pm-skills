---
name: utility-pm-skill-iterate
description: Applies targeted improvements to an existing pm-skills skill based on feedback, validation reports, or convention changes. Reads current files, previews proposed changes, writes on confirmation, and suggests a version bump. Use when improving a skill after validation or feedback.
classification: utility
version: "1.0.0"
updated: 2026-04-03
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
# PM Skill Iterate

This skill improves an existing pm-skills skill by applying targeted changes
based on input you provide. It reads the current skill files, proposes
changes as before/after previews grouped by file, and writes them on your
confirmation. After applying changes, it suggests a version bump class and
offers to update HISTORY.md.

The iterator accepts any of these as input:
- A validation report from `/pm-skill-validate`
- Direct feedback ("the template is missing section X")
- A convention change ("all skills now need a Limitations section")
- A general improvement request ("make the example more realistic")

## When to Use

- After running `/pm-skill-validate` and getting a report with findings
- When you have specific feedback on a skill and want to apply it
- When a repo convention changes and a skill needs to conform
- When a skill's example, template, or instructions need improvement
- When iterating on a skill before a release

## When NOT to Use

- To create a new skill from scratch -> use `/pm-skill-builder`
- To audit a skill before making changes -> use `/pm-skill-validate` first
- To make bulk convention changes across many skills -> run `/pm-skill-validate --all` first to triage, then iterate one skill at a time

## Instructions

When asked to iterate on a skill, follow these steps:

### Step 1: Identify the Target Skill

Accept the skill name in any form:
- Directory name: `deliver-prd`
- Full path: `skills/deliver-prd/SKILL.md`
- Slash command: `/prd`

Resolve to the canonical directory path: `skills/{name}/`.

If the skill directory does not exist, stop and report: "Skill directory
`skills/{name}/` does not exist. Use `/pm-skill-builder` to create it."

### Step 2: Read Current Skill Files

Read all files in the skill directory:

| File | Required | Purpose |
|------|----------|---------|
| `SKILL.md` | yes | Frontmatter + instructions (the primary edit target) |
| `references/TEMPLATE.md` | yes | Output template |
| `references/EXAMPLE.md` | yes | Worked example |
| `HISTORY.md` | no | Version history (needed for Step 7) |

Record the exact content of each file at this point. You will compare
against this content before writing in Step 5 (stale-preview guard).

If reading files is not possible (MCP/embedded environment), ask the user
to paste the relevant file contents before proceeding (see Degraded Mode).

### Step 3: Normalize Input into Intended Changes

Regardless of input type, extract a structured list of intended changes
before generating any edits. This normalization step is what makes the
unified flow work consistently across all input types.

**If the input is a validation report** (from `/pm-skill-validate`):
- Check for `Report schema: v1` in the header. If absent or a different
  schema version, warn: "This report uses an unrecognized schema. I'll
  do my best but may miss structured fields."
- Parse the `## Recommendations` section.
- Split each recommendation line on `|` to extract:
  - Position 1: severity (FAIL, WARN, INFO)
  - Position 2: check ID
  - After `Target:`: file path
  - After `Action:` (next line): what to change
- Build the intended changes list from these fields.

**If the input is free text** (feedback, convention change, improvement request):
- Read the input and identify what needs to change.
- Map each change to a specific target file and section.
- If the input is vague, ask ONE clarifying question before proceeding.

Present the normalized list for user confirmation:

```
Intended changes:
1. Target: skills/{name}/SKILL.md -> {section}
   Change: {what will change}
   Source: {validation report check ID | user feedback | convention change}
2. Target: skills/{name}/references/EXAMPLE.md -> {section}
   Change: {what will change}
   Source: {source}
```

If the user wants to modify the list (add, remove, or change items),
adjust and re-present before proceeding.

### Step 4: Preview Proposed Changes

For each intended change, generate the proposed edit and present it as
a before/after block grouped by file:

```
### skills/{name}/SKILL.md

**{Section name} -- before:**
> {exact current content of the section being changed}

**{Section name} -- after:**
> {proposed new content for this section}

### skills/{name}/references/EXAMPLE.md

**{Section name} -- before:**
> {exact current content}

**{Section name} -- after:**
> {proposed new content}
```

**Preview rules:**
- Group all changes by file. Show each file once, with all its changes.
- Show enough surrounding context for the user to understand the change.
- For small edits (a few lines), show the full section before and after.
- For large edits (rewriting most of a section), show the section header
  and the first/last few lines of before, then the full after.
- Do NOT show files that are not being changed.

Ask: "Apply these changes? [yes / no]"

If the user says no, ask what to adjust and return to Step 3 or Step 4.

### Step 5: Apply Changes (with Stale-Preview Guard)

**Before writing any file**, re-read each target file and compare its
content to what you recorded in Step 2.

**If any target file has changed since Step 2:**
- Do NOT write any files.
- Report: "File `{path}` has changed since the preview was generated.
  Regenerating preview with current content."
- Return to Step 2 with the same intended changes list.

**If all target files match:**
- Write the changes to each target file.
- Update the `updated` field in SKILL.md frontmatter to today's date.
  (The `updated` field tracks when the file was last modified, regardless
  of whether a version bump is accepted.)
- Report what was written: list each file and a one-line summary of
  what changed.

### Step 6: Suggest Version Bump

After changes are applied, classify the overall change and suggest a
version bump class. Do NOT auto-write the version number.

**Classification rules** (from `docs/internal/skill-versioning.md`):

| Change type | Bump class | Examples |
|------------|------------|---------|
| Wording clarified, examples improved, typos fixed | **patch** | Reworded checklist item, better example scenario, description expanded |
| New optional capability or section added | **minor** | New optional output section, handles more scenarios, new quality check |
| Required contract changed, interaction pattern breaks | **major** | Command renamed, required section removed, "done" definition narrowed |

**Tie-breaker:** If a user must do something new to stay compliant with
the skill's required contract, classify as major. If the new behavior is
additive or optional, classify as minor. If the required behavior is
unchanged and only clarified, classify as patch.

Present the suggestion:

```
Suggested bump: {class} ({reason}).
Current version: {current}.
Bump to {suggested}? [yes / override / skip]
```

- **yes**: Write the new version to SKILL.md frontmatter.
- **override**: Ask for the desired version, validate it's valid SemVer
  and higher than current, then write it.
- **skip**: Leave the version unchanged. The user may bump it later
  during release prep.

### Step 7: Offer HISTORY.md Update

After the version decision, produce a change summary and handle
HISTORY.md based on the current state:

**If HISTORY.md exists and version was bumped:**
1. Read HISTORY.md and validate its format:
   - Has a summary table with `| Version | Date | Release | ...` header
   - Versions are newest-first in the table
   - Each table version has a corresponding `## X.Y.Z` section below
2. **If format is valid**: offer to append.
   "Would you like me to add this version to HISTORY.md? [yes / no]"
   On yes: add a new row to the summary table (newest-first) and a new
   `## X.Y.Z` section with the change summary.
3. **If format is invalid**: warn and show the proposed content without
   writing. "HISTORY.md doesn't follow the expected format. Here's what
   I would add -- you can paste it manually:"
   Then show the proposed table row and version section.

**If HISTORY.md does not exist and this is the skill's second version:**
Offer to create it. "This is the second version of this skill. Would you
like me to create HISTORY.md with entries for both versions? [yes / no]"
On yes: create HISTORY.md with the format from `docs/internal/skill-versioning.md`,
including entries for both the original version (from release history or
effort brief) and the new version.

**If HISTORY.md does not exist and version was not bumped:**
No offer. HISTORY.md is premature until the skill has shipped a second version.

**If HISTORY.md exists but version was not bumped (skip):**
No offer. The change summary is available in the conversation for the user
to use at their discretion.

### Step 8: Report Summary

Present a final summary:

```
## Iteration Complete: {skill-name}

**Files changed:**
- skills/{name}/SKILL.md -- {summary}
- skills/{name}/references/EXAMPLE.md -- {summary}

**Version:** {current} -> {new} ({class}) | or: unchanged (skipped)
**HISTORY.md:** updated | created | skipped | not applicable

**Next steps:**
- Run `/pm-skill-validate {name}` to verify the changes pass
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- If satisfied, commit the changes
```

## Degraded Mode

If you cannot read skill files directly (e.g., running via MCP or in an
embedded environment without file system access):

1. **Validation-report-driven iteration** is preferred in this mode.
   The report carries the context (check IDs, target paths, actions).
2. For free-text iteration, ask the user to paste the content of each
   relevant file before proposing changes.
3. The stale-preview guard (Step 5) cannot run -- note in the summary:
   "Applied without stale-preview check (file system not available)."
4. HISTORY.md operations require the user to paste the current file
   content or confirm it does not exist.

## Output Contract

The iterator MUST:
- Normalize input into a structured intended-changes list before editing
- Present all proposed changes as before/after previews grouped by file
- Require explicit user confirmation before writing any file
- Re-read target files before writing to guard against stale previews
- Update the `updated` frontmatter field on every apply
- Suggest a version bump class without auto-writing the version number
- Handle HISTORY.md according to the rules in Step 7

The iterator MUST NOT:
- Write files without showing a preview first
- Write files without user confirmation
- Auto-increment the version number without explicit confirmation
- Create HISTORY.md for a skill still on its first version
- Append to HISTORY.md without validating its format first

## Quality Checklist

Before completing the iteration, verify:

- [ ] Input was normalized into an intended-changes list before editing
- [ ] All proposed changes were shown as before/after previews
- [ ] User confirmed before any files were written
- [ ] Stale-preview guard ran before writing (or noted as unavailable)
- [ ] `updated` date was set to today in SKILL.md frontmatter
- [ ] Version bump class was suggested with correct reasoning
- [ ] Version was only written after explicit user confirmation
- [ ] HISTORY.md was handled correctly per Step 7 rules
- [ ] Final summary was presented with next steps

## Examples

See `references/EXAMPLE.md` for a completed iteration demonstrating
a validation-report-driven improvement to a real shipped skill.
