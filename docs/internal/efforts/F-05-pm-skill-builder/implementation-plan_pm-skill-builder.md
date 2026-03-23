# F-05 PM Skill Builder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> **Revision**: v2 — incorporates all 8 Codex review findings (see `implementation-plan_reviewed-by-codex.md`)

**Goal:** Create the `utility-pm-skill-builder` skill — an interactive utility skill that guides contributors from a PM skill idea to draft files ready for PR.

**Architecture:** The skill is a set of markdown files (SKILL.md, TEMPLATE.md, EXAMPLE.md) plus a slash command and AGENTS.md entry. No code — just structured content that AI agents follow. The builder uses a 7-step adaptive workflow with kill gates and exemplar-driven drafting.

**Tech Stack:** Markdown files, YAML frontmatter, bash/PowerShell CI validation scripts.

**Design doc:** `docs/internal/efforts/F-05-pm-skill-builder/design_pm-skill-builder.md`

**Key counts:** Baseline is 26 skills. After F-05: 27 skills.

---

## Pre-Implementation: Read These First

Before writing anything, read these files to understand the exact conventions:

| File | Why |
|------|-----|
| `skills/deliver-prd/SKILL.md` | Primary exemplar — same structure pattern (Instructions, Output Format, Quality Checklist) |
| `skills/foundation-persona/SKILL.md` | Secondary exemplar — shows `classification:` frontmatter (no `phase:`) |
| `skills/deliver-acceptance-criteria/SKILL.md` | Newest skill — shows current conventions |
| `commands/persona.md` | Most complex command — shows how richer behavior is expressed in prose body |
| `commands/acceptance-criteria.md` | Simplest command — baseline format |
| `AGENTS.md` | Entry format: `#### {name}` + `**Path:**` + description + `---` |
| `scripts/lint-skills-frontmatter.sh` | CI rules: description 20-100 words, single-line, required fields, TEMPLATE.md ≥3 headers, EXAMPLE.md must exist |
| `scripts/validate-agents-md.sh` | CI rules: path sync between AGENTS.md and skill directories |
| `scripts/validate-commands.sh` | CI rules: command file path references |
| `docs/internal/efforts/F-05-pm-skill-builder/design_pm-skill-builder.md` | The complete reviewed design — adapt content for shipped artifact (do NOT transcribe blindly) |

---

## Task 1: Add `_staging/` to .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Add the gitignore entry**

Add this line to `.gitignore` in the "Personal notes" section (after `_NOTES/`):

```
# Skill builder staging area
_staging/
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add _staging/ to gitignore for pm-skill-builder drafts"
```

---

## Task 2: Create skill content (SKILL.md + TEMPLATE.md + EXAMPLE.md)

> **Important**: All three files must be created before running any validation. The linter requires `references/TEMPLATE.md` and `references/EXAMPLE.md` to exist before a skill passes.

**Files:**
- Create: `skills/utility-pm-skill-builder/SKILL.md`
- Create: `skills/utility-pm-skill-builder/references/TEMPLATE.md`
- Create: `skills/utility-pm-skill-builder/references/EXAMPLE.md`

**Step 1: Create the directory structure**

```bash
mkdir -p skills/utility-pm-skill-builder/references
```

### Step 2: Write SKILL.md

Adapt design doc Section 1 content for the shipped artifact. The design doc contains the structure and most of the content, but these specific changes MUST be made during adaptation:

**Frontmatter** (use exactly):
```yaml
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: utility-pm-skill-builder
description: Guides contributors from a PM skill idea to a complete Skill Implementation Packet aligned with pm-skills conventions. Runs gap analysis, validates through a Why Gate, classifies by type and phase, generates draft files, and writes to a staging area for review before promotion.
classification: utility
version: "1.0.0"
updated: 2026-03-22
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

**Adaptation changes** (differences from design doc Section 1):

| Design doc text | Shipped artifact text | Reason |
|----------------|----------------------|--------|
| `## When NOT to Use` references `/pm-skill-validate + /pm-skill-iterate` | Change to: "To modify an existing skill → use a future validation/iteration utility (planned)" | Commands don't exist yet |
| `## When NOT to Use` references `/agent-skill-builder` | Change to: "To create a skill for a non-pm-skills context → use a general agent skill builder (planned)" | Command doesn't exist yet |
| Utility Skills table: "This skill (F-05, in design)" | Change to: "pm-skill-builder \| coordination \| This skill" | Remove design-state language |
| `## Examples` references "Section 4 of this design document" | Change to: "See `references/EXAMPLE.md` for a completed Skill Implementation Packet demonstrating a realistic domain skill creation." | Remove design-doc internal reference |
| Inventory note: "this table reflects the current working tree (25 domain + 1 foundation + deliver-acceptance-criteria from F-06)" | Change to: "this table reflects the current skill inventory (26 skills). Also scan `skills/` directory for the latest count." | deliver-acceptance-criteria is already in the 26 count; clarify |
| Domain Skills table header says "(25)" | Change to "(26)" — the table lists 26 rows including acceptance-criteria | Count the actual table rows |

**Body sections** (from design doc, with adaptations above applied):
- `# PM Skill Builder` + intro paragraph
- `## When to Use` (3 bullets)
- `## When NOT to Use` (3 bullets — adapted)
- `## Instructions` with Steps 1-7
- `## Current Library Reference` — full skill table (adapted)
- `## Output Contract`
- `## Quality Checklist` — two-tier (CI Validation + Quality Checks)
- `## Examples`

**Critical constraints:**
- Description MUST be single-line (no `>-`)
- `classification: utility` NOT `phase:` (utility skills have no phase)
- Description word count: 37 words (verified within 20-100 range)

### Step 3: Write TEMPLATE.md

Transcribe design doc Section 2 content (the Skill Implementation Packet template). This file is a template for builder output — its content is mostly correct as-is.

**One adaptation required:**
- `## Next Steps` section references `/pm-skill-iterate`. Change to: "Use the pm-skill iteration utility (when available) to refine based on testing feedback." This is acceptable as a future-looking note since it's inside a template users will fill, not in the shipped skill instructions.

The template has 13 `##` sections (well above the ≥3 CI minimum).

### Step 4: Write EXAMPLE.md

Create a complete, realistic example of a Skill Implementation Packet using the **deliver-change-communication** scenario (Thread 1 from design doc).

**Locked specifics for the example:**
- Skill name: `deliver-change-communication`
- Directory: `deliver-change-communication`
- Phase: deliver
- Category: coordination
- Command filename: `change-communication.md`
- Command name: `/change-communication`
- AGENTS heading: `#### change-communication`
- AGENTS path: `skills/deliver-change-communication/SKILL.md`

**Content requirements:**
- Fill every one of the 13 TEMPLATE.md sections with concrete content
- 150-300 lines total
- Realistic PM scenario: "Creating change management communications for SaaS feature launches that alter user workflows"
- Overlap analysis: check against `deliver-release-notes` (different purpose — release notes are external-facing, change comms are internal/adoption-focused) and `deliver-launch-checklist` (checklist includes comms as a line item but doesn't guide the writing)
- Quality Forecast: weights summing to 100, rounded to nearest 5
- Exemplar skills: `deliver-release-notes` (same phase, coordination category) and `deliver-launch-checklist` (same phase, different artifact type)
- Draft Frontmatter: valid YAML matching repo conventions
- Draft SKILL.md section: **representative excerpt** showing all section headers with 1-2 lines of content each (not a full 70-line skill file — the example demonstrates packet structure)
- Draft TEMPLATE.md section: **representative excerpt** with ≥3 `##` headers and guidance comments
- Draft EXAMPLE.md section: brief note explaining what a complete example would contain
- Draft Command: complete command file matching repo convention
- AGENTS.md Entry: complete entry matching repo convention
- Validation Checklist: all CI boxes checked, all quality boxes checked
- Next Steps: standard 5-item guidance list

### Step 5: Validate all three files

Run: `bash scripts/lint-skills-frontmatter.sh`
Expected: `utility-pm-skill-builder` passes all checks (27 skills total, 0 failures)

If on Windows, also run: `pwsh -File scripts/lint-skills-frontmatter.ps1`

### Step 6: Commit

```bash
git add skills/utility-pm-skill-builder/
git commit -m "feat(F-05): add utility-pm-skill-builder skill content (SKILL.md, TEMPLATE.md, EXAMPLE.md)"
```

---

## Task 3: Create command file + AGENTS.md entry

**Files:**
- Create: `commands/pm-skill-builder.md`
- Modify: `AGENTS.md`

### Step 1: Write the command file

Exact content from design doc Section 3:

```markdown
---
description: Create a new PM skill for the pm-skills library with gap analysis, classification, and a complete Skill Implementation Packet
---

Use the `utility-pm-skill-builder` skill to create a new PM skill.

Read the skill instructions from `skills/utility-pm-skill-builder/SKILL.md` and follow them to guide the contributor through the full builder workflow.

Use `skills/utility-pm-skill-builder/references/TEMPLATE.md` as the packet output format.

If the user provides a skill idea, begin with Step 1 (Understand the Idea) using the provided context. If no idea is provided, prompt the user to describe their skill idea or the PM problem it solves.

Context from user: $ARGUMENTS
```

### Step 2: Add AGENTS.md entry

Check how the existing AGENTS.md is structured. If it uses phase headers (Discover, Define, etc.) and a Foundation section, add a new `### Utility Skills` section after Foundation:

```markdown
### Utility Skills

#### pm-skill-builder
**Path:** `skills/utility-pm-skill-builder/SKILL.md`

Guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, classification, and draft files. Use when creating new domain, foundation, or utility skills for the pm-skills library.

---
```

### Step 3: Validate

Run both validators:
```bash
bash scripts/validate-commands.sh
bash scripts/validate-agents-md.sh
```

Expected:
- `validate-commands.sh`: All commands pass including `pm-skill-builder`
- `validate-agents-md.sh`: All 27 skills sync (26 existing + 1 new)

If on Windows, also run:
```powershell
pwsh -File scripts/validate-commands.ps1
pwsh -File scripts/validate-agents-md.ps1
```

### Step 4: Commit

```bash
git add commands/pm-skill-builder.md AGENTS.md
git commit -m "feat(F-05): add /pm-skill-builder command and AGENTS.md entry"
```

---

## Task 4: Run full CI validation

**Files:** None (validation only)

### Step 1: Run all validators (bash)

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-commands.sh
bash scripts/check-mcp-impact.sh
```

Expected:
- `lint-skills-frontmatter.sh`: 27 skills pass, 0 failures
- `validate-agents-md.sh`: All 27 paths sync, 0 orphans, 0 missing
- `validate-commands.sh`: All commands valid including `pm-skill-builder`
- `check-mcp-impact.sh`: Either "new skill detected" advisory OR "unable to determine diff base" (both are acceptable — the script requires a git diff base)

### Step 2: Run all validators (PowerShell)

```powershell
pwsh -File scripts/lint-skills-frontmatter.ps1
pwsh -File scripts/validate-agents-md.ps1
pwsh -File scripts/validate-commands.ps1
pwsh -File scripts/check-mcp-impact.ps1
```

Expected: Same results as bash equivalents.

### Step 3: If any failure, fix and re-validate

Common issues:
- Description word count outside 20-100 → adjust wording
- AGENTS.md path doesn't match directory → check spelling
- TEMPLATE.md has fewer than 3 `##` sections → add sections
- Command references wrong skill path → fix path

### Step 4: Commit fixes (if needed)

```bash
git add -A
git commit -m "fix(F-05): address CI validation findings"
```

---

## Task 5: Functional test — run `/pm-skill-builder` with a realistic idea

**Files:** None (testing only — any generated files go to `_staging/` which is gitignored)

### Step 1: Test the builder

Run `/pm-skill-builder "A skill for creating stakeholder update emails that summarize sprint progress for non-technical executives"`

### Step 2: Verify the builder workflow

Check that the builder:
- Accepts the idea and extracts the artifact type + audience
- Runs gap analysis against all 27 skills (should find overlap with `discover-stakeholder-summary` but identify a gap: stakeholder-summary maps stakeholders, this skill writes communication artifacts)
- Triggers the Why Gate (overlap found) and asks for specific scenarios
- Classifies correctly (deliver phase, coordination category)
- Selects appropriate exemplars
- Generates draft content that mirrors the exemplar structure
- Writes to `_staging/pm-skill-builder/deliver-stakeholder-update/`
- Offers promotion

### Step 3: Verify generated files pass CI (if promoted)

If you promote the test skill, run validators to confirm the builder produces CI-compliant output. Then remove the test skill files (this was just a functional test).

---

## Task 6: Reconcile effort brief and update status

**Files:**
- Modify: `docs/internal/efforts/F-05-pm-skill-builder.md`
- Modify: `docs/internal/backlog-canonical.md`
- Modify: `docs/internal/releases/v2.7.0/README.md`

### Step 1: Reconcile effort brief stale content

The F-05 effort brief has several stale references that must be updated:

| Stale content | Fix |
|---------------|-----|
| Staging listed as `library/pm-skill-builder/{skill-name}` | → `_staging/pm-skill-builder/{skill-name}/` (gitignored, discarded after promotion) |
| Sample output library listed as in-scope | Remove from scope — `references/EXAMPLE.md` serves the demonstration purpose |
| Thread 2 description uses older meeting-synthesis scenario | Update to validator-oriented scenario matching design doc revision |
| Any remaining `library/pm-skill-builder/` references | → `_staging/pm-skill-builder/` |

### Step 2: Update effort brief status

Change status to: "Implemented locally, verification passed"

### Step 3: Update backlog

Change F-05 status from "Design reviewed, implementation pending" to "Implemented, verification passed"

### Step 4: Update release gating

Check off the F-05 gating criteria in the v2.7.0 README:
- [x] F-05 design approved and implemented
- [x] F-05 committed and CI green

### Step 5: Commit

```bash
git add docs/internal/efforts/F-05-pm-skill-builder.md docs/internal/backlog-canonical.md docs/internal/releases/v2.7.0/README.md
git commit -m "docs(F-05): reconcile effort brief, mark pm-skill-builder as implemented"
```

---

## File Summary

| File | Action | Lines (est.) |
|------|--------|-------------|
| `.gitignore` | Modify | +2 |
| `skills/utility-pm-skill-builder/SKILL.md` | Create | ~280 |
| `skills/utility-pm-skill-builder/references/TEMPLATE.md` | Create | ~210 |
| `skills/utility-pm-skill-builder/references/EXAMPLE.md` | Create | ~200 |
| `commands/pm-skill-builder.md` | Create | ~13 |
| `AGENTS.md` | Modify | +8 |
| `docs/internal/efforts/F-05-pm-skill-builder.md` | Modify | ~10 lines |
| `docs/internal/backlog-canonical.md` | Modify | ~1 line |
| `docs/internal/releases/v2.7.0/README.md` | Modify | ~2 lines |

Total: ~710 new lines across 6 new/modified files, 5 commits (+ 1 optional fix commit).

---

## Commit Strategy (5 commits)

| # | Scope | Message |
|---|-------|---------|
| 1 | `.gitignore` | `chore: add _staging/ to gitignore for pm-skill-builder drafts` |
| 2 | Skill content (SKILL.md + TEMPLATE.md + EXAMPLE.md) | `feat(F-05): add utility-pm-skill-builder skill content` |
| 3 | Command + AGENTS | `feat(F-05): add /pm-skill-builder command and AGENTS.md entry` |
| 4 | Validation fixes (if needed) | `fix(F-05): address CI validation findings` |
| 5 | Effort/release docs | `docs(F-05): reconcile effort brief, mark pm-skill-builder as implemented` |

---

## Validation Commands Reference

```bash
# Frontmatter + template structure (bash)
bash scripts/lint-skills-frontmatter.sh

# AGENTS.md ↔ skill directory sync (bash)
bash scripts/validate-agents-md.sh

# Command file path references (bash)
bash scripts/validate-commands.sh

# MCP impact advisory — non-blocking (bash)
bash scripts/check-mcp-impact.sh

# PowerShell equivalents
pwsh -File scripts/lint-skills-frontmatter.ps1
pwsh -File scripts/validate-agents-md.ps1
pwsh -File scripts/validate-commands.ps1
pwsh -File scripts/check-mcp-impact.ps1
```

---

## Content Sources

All content for Tasks 2-3 comes from the reviewed design document, **adapted for the shipped artifact** (not transcribed blindly). Key adaptations are listed in the Task 2 table.

EXAMPLE.md (Task 2, Step 4) requires substantial new writing — everything else is adaptation from the design doc with specific changes documented.

Task 5 (functional test) is new — validates that the builder instructions actually work end-to-end, not just that CI passes.
