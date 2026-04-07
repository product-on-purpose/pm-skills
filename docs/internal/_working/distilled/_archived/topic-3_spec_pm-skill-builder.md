# Topic 3 — Specification: PM Skill Builder & Deployment Automation

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — agentic-development-optimized spec
> **Approach**: Skill + CI pipeline (80/20 value delivery)
> **Companion**: `topic-3_exploration_pm-skill-builder.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture](#2-architecture)
3. [Phase 1: CI Validation Pipeline](#3-phase-1-ci-validation-pipeline)
4. [Phase 2: pm-skill-builder Skill](#4-phase-2-pm-skill-builder-skill)
5. [Phase 3: Release & Sync Automation](#5-phase-3-release--sync-automation)
6. [Phase 4: Community & Codex Integration](#6-phase-4-community--codex-integration)
7. [File Specifications](#7-file-specifications)
8. [Execution Plan](#8-execution-plan)
9. [Acceptance Criteria](#9-acceptance-criteria)

---

## 1. Executive Summary

**Goal**: Create a pm-skill-builder skill and supporting CI/CD infrastructure that enables both maintainers and community contributors to create, validate, and deploy PM skills efficiently.

**Three independent value streams:**

| Stream | Deliverable | Standalone Value |
|--------|------------|-----------------|
| CI Pipeline | GitHub Actions validation workflow | Catches convention violations on every PR |
| Skill Builder | `utility-pm-skill-builder` skill + command | Guides contributors from idea to implementation packet |
| Automation | Release, MCP sync, sample library workflows | Reduces maintainer toil on releases |

---

## 2. Architecture

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Contributor Workflow                                             │
│                                                                 │
│  1. /pm-skill-builder                                           │
│     ├── Gap analysis (check existing 25 skills)                 │
│     ├── Why Gate (specific evidence of need)                    │
│     ├── Classification (phase, category, type)                  │
│     └── Output: Skill Implementation Packet                     │
│                                                                 │
│  2. Create files from packet                                    │
│     ├── skills/{name}/SKILL.md                                  │
│     ├── skills/{name}/references/TEMPLATE.md                    │
│     ├── skills/{name}/references/EXAMPLE.md                     │
│     └── commands/{name}.md                                      │
│                                                                 │
│  3. Open PR                                                     │
│     └── CI automatically validates ─────────────────────────┐   │
│                                                              │   │
│  4. Maintainer review                                        │   │
│     └── Merge to main                                        │   │
│                                                              │   │
│  5. Release                                                  │   │
│     ├── Tag → GitHub release                                 │   │
│     ├── Auto-generate release notes                          │   │
│     ├── Trigger MCP sync PR                                  │   │
│     └── Update sample library                                │   │
└──────────────────────────────────────────────────────────────┘   │
                                                                   │
┌──────────────────────────────────────────────────────────────────┘
│ CI Validation Pipeline
│
│  validate-skills.yml
│  ├── Frontmatter lint (all skills)
│  ├── Command validation (all commands)
│  ├── AGENTS.md consistency
│  ├── Naming convention check
│  ├── Skill completeness (3-file pattern)
│  ├── Template section check
│  └── MCP impact advisory
└──────────────────────────────────────────────────────────────────
```

---

## 3. Phase 1: CI Validation Pipeline

### 3.1 Workflow: `validate-skills.yml`

```yaml
name: Validate Skills
on:
  pull_request:
    paths:
      - 'skills/**'
      - 'commands/**'
      - 'AGENTS.md'

jobs:
  validate-frontmatter:
    name: Frontmatter Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run frontmatter validation
        run: |
          node scripts/validate-frontmatter.js
          # Checks: required fields, valid values, schema compliance

  validate-commands:
    name: Command Validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run command validation
        run: |
          node scripts/validate-commands.js
          # Checks: every skill has a command, command frontmatter valid

  validate-completeness:
    name: Skill Completeness
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check 3-file pattern
        run: |
          node scripts/validate-completeness.js
          # Checks: SKILL.md + TEMPLATE.md + EXAMPLE.md exist per skill

  validate-naming:
    name: Naming Conventions
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check naming rules
        run: |
          node scripts/validate-naming.js
          # Checks: kebab-case, phase prefix, length, directory matches frontmatter name

  validate-agents-md:
    name: AGENTS.md Consistency
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check AGENTS.md entries
        run: |
          node scripts/validate-agents-md.js
          # Checks: every skill has an AGENTS.md entry, no orphan entries

  mcp-impact:
    name: MCP Impact Advisory
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check MCP implications
        run: |
          node scripts/check-mcp-impact.js
          # Advisory: flags new/renamed skills that need pm-skills-mcp update
```

### 3.2 Validation Script Specifications

#### `validate-frontmatter.js`

**Input**: All `skills/*/SKILL.md` files
**Checks**:
- Required fields: `name`, `description`, `classification`, `version`, `updated`, `license`, `metadata`
- `name` matches directory name
- `classification` is one of: `domain`, `foundation`, `utility`
- `version` is valid semver
- `updated` is valid ISO date
- `license` is `Apache-2.0`
- `metadata.category` is valid
- `metadata.frameworks` is array
- `description` is > 20 words and < 100 words
**Output**: Pass/fail per skill, with specific error messages

#### `validate-completeness.js`

**Input**: All `skills/*/` directories
**Checks**:
- `SKILL.md` exists and is non-empty
- `references/TEMPLATE.md` exists and is non-empty
- `references/EXAMPLE.md` exists and is non-empty
- Template has `## ` headers (structured output)
- Example fills all template sections
**Output**: Pass/fail per skill, with specific missing-file errors

#### `validate-naming.js`

**Input**: All `skills/*/` directory names
**Checks**:
- Kebab-case format
- Starts with valid phase prefix (`discover-`, `define-`, `develop-`, `deliver-`, `measure-`, `iterate-`, `foundation-`, `utility-`)
- Length 1-64 characters
- No underscores, no uppercase, no spaces
- Frontmatter `name` matches directory name
**Output**: Pass/fail per skill

#### `validate-agents-md.js`

**Input**: `AGENTS.md` + all `skills/*/SKILL.md`
**Checks**:
- Every skill directory has a corresponding entry in AGENTS.md
- No orphan entries in AGENTS.md (entries without matching skill directories)
- Skill descriptions in AGENTS.md are current (match frontmatter)
**Output**: Pass/fail with specific mismatches

---

## 4. Phase 2: pm-skill-builder Skill

### 4.1 Skill Structure

```
skills/utility-pm-skill-builder/
├── SKILL.md
└── references/
    ├── TEMPLATE.md          # Skill Implementation Packet template
    └── EXAMPLE.md           # Completed packet for a hypothetical skill
```

### 4.2 SKILL.md Specification

```yaml
---
name: utility-pm-skill-builder
description: >-
  Evaluate whether pm-skills needs a new skill or revision, classify it
  correctly, and produce a repo-compatible Skill Implementation Packet.
  Use when considering adding a new PM skill, revising an existing skill,
  or assessing whether a gap is better served by a bundle, command, or
  documentation update.
classification: utility
version: "1.0.0"
updated: 2026-03-21
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

### 4.3 Workflow Steps

```
Step 1: Gap Analysis
├── List all 25 existing skills by phase
├── Ask: "What PM workflow or artifact gap are you seeing?"
├── Check for overlap with existing skills
└── If overlap found → suggest revision instead of new skill

Step 2: Why Gate
├── "Name 2-3 specific prompts where existing skills fall short"
├── "What does the user currently get vs. what they need?"
├── If can't name specific gaps → redirect to existing skill
└── If gaps are real → proceed

Step 3: Repo-Fit Assessment
├── Should this be: new skill / revise existing / bundle / command / docs?
├── Decision tree:
│   ├── Produces a distinct artifact? → New skill
│   ├── Improves existing artifact? → Revise existing skill
│   ├── Chains existing skills? → Bundle
│   ├── Shortcut for existing workflow? → Command
│   └── Reference material only? → Docs
└── If not a new skill → provide specific guidance

Step 4: Classification
├── Type: domain / foundation / utility
├── Phase: discover / define / develop / deliver / measure / iterate / n/a
├── Category: research / problem-framing / ideation / specification /
│            validation / reflection / coordination
├── Name: {phase}-{skill-name} (or {type}-{skill-name} for non-domain)
└── Validate against naming rules

Step 5: Implementation Packet
├── Generate SKILL.md draft (instructions, output contract, quality criteria)
├── Generate TEMPLATE.md draft (artifact template with guidance comments)
├── Generate EXAMPLE.md draft (realistic completed example)
├── Generate command.md draft (slash command with frontmatter)
├── Generate AGENTS.md entry
├── Generate frontmatter block
└── Include repo update checklist

Step 6: Writing Lens (Optional)
├── Assess skill type: primarily process / knowledge / constraint / wisdom?
├── Point to exemplar skills for reference:
│   ├── Process → deliver-prd
│   ├── Knowledge → discover-competitive-analysis
│   ├── Reflection → iterate-retrospective
│   └── Foundation → foundation-persona
└── Provide writing guidance based on type

Step 7: Validation Checklist
├── [ ] Name matches directory
├── [ ] All required frontmatter fields
├── [ ] 3-file pattern complete
├── [ ] Command file created
├── [ ] AGENTS.md entry added
├── [ ] README skill count updated
├── [ ] No naming collisions
├── [ ] MCP tool naming checked (pm_{skill})
└── [ ] 4 test scenarios identified
```

### 4.4 Command Specification

```yaml
---
name: skill-builder
description: >-
  Create or revise a PM skill for the pm-skills library. Guides you through
  gap analysis, classification, and produces a complete Skill Implementation
  Packet ready for PR.
arguments:
  - name: mode
    description: "create (default) | revise <skill-name> | audit <skill-name>"
    required: false
---
```

---

## 5. Phase 3: Release & Sync Automation

### 5.1 Release Workflow: `release.yml`

```yaml
name: Release
on:
  push:
    tags: ['v*.*.*']

jobs:
  validate-release:
    name: Pre-release Validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check version consistency
        run: |
          TAG_VERSION="${GITHUB_REF#refs/tags/v}"
          PLUGIN_VERSION=$(node -e "console.log(require('./.claude-plugin/plugin.json').version)")
          if [ "$TAG_VERSION" != "$PLUGIN_VERSION" ]; then
            echo "::error::Tag version ($TAG_VERSION) != plugin.json ($PLUGIN_VERSION)"
            exit 1
          fi

  create-release:
    name: Create GitHub Release
    needs: validate-release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Generate release notes
        run: node scripts/generate-release-notes.js > release-notes.md
      - name: Create release
        run: gh release create ${{ github.ref_name }} --notes-file release-notes.md
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  trigger-mcp-sync:
    name: Trigger MCP Sync
    needs: create-release
    runs-on: ubuntu-latest
    steps:
      - name: Dispatch to pm-skills-mcp
        run: |
          gh api repos/product-on-purpose/pm-skills-mcp/dispatches \
            -f event_type=pm-skills-release \
            -f client_payload='{"version":"${{ github.ref_name }}"}'
        env:
          GH_TOKEN: ${{ secrets.MCP_SYNC_TOKEN }}
```

### 5.2 MCP Sync Workflow (in pm-skills-mcp repo)

```yaml
name: Sync from pm-skills
on:
  repository_dispatch:
    types: [pm-skills-release]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/checkout@v4
        with:
          repository: product-on-purpose/pm-skills
          ref: ${{ github.event.client_payload.version }}
          path: pm-skills-source
      - run: npm run embed-skills ./pm-skills-source/skills
      - run: npm test
      - name: Create sync PR
        run: |
          git checkout -b sync/${{ github.event.client_payload.version }}
          git add -A
          git commit -m "Sync with pm-skills ${{ github.event.client_payload.version }}"
          gh pr create \
            --title "Sync: pm-skills ${{ github.event.client_payload.version }}" \
            --body "Automated sync from pm-skills release"
```

---

## 6. Phase 4: Community & Codex Integration

### 6.1 GitHub Issue Template: Skill Proposal

File: `.github/ISSUE_TEMPLATE/skill-proposal.yml`

```yaml
name: Skill Proposal
description: Propose a new PM skill for the library
labels: ["skill-proposal"]
body:
  - type: input
    id: skill-name
    attributes:
      label: Proposed Skill Name
      placeholder: "e.g., define-okr-framework"
    validations:
      required: true
  - type: dropdown
    id: phase
    attributes:
      label: Triple Diamond Phase
      options: [discover, define, develop, deliver, measure, iterate, foundation, utility]
    validations:
      required: true
  - type: textarea
    id: problem
    attributes:
      label: What PM task is poorly served today?
      placeholder: "Describe the gap in current pm-skills coverage"
    validations:
      required: true
  - type: textarea
    id: evidence
    attributes:
      label: Evidence of Need
      placeholder: "Name 2-3 specific prompts where existing skills fall short"
    validations:
      required: true
  - type: textarea
    id: artifact
    attributes:
      label: What artifact would this skill produce?
      placeholder: "Describe the output document/artifact"
    validations:
      required: true
  - type: textarea
    id: overlap
    attributes:
      label: Closest existing skills and how this differs
      placeholder: "Which existing skills are closest? Why isn't that sufficient?"
```

### 6.2 Codex Task Template

For autonomous skill creation via Codex:

```markdown
## Task: Create PM Skill from Specification

### Input
A completed Skill Implementation Packet (attached or inline).

### Instructions
1. Read the Skill Implementation Packet carefully
2. Create the following files:
   - `skills/{name}/SKILL.md` — from the packet's SKILL.md draft
   - `skills/{name}/references/TEMPLATE.md` — from the packet's TEMPLATE.md draft
   - `skills/{name}/references/EXAMPLE.md` — from the packet's EXAMPLE.md draft
   - `commands/{name}.md` — from the packet's command draft
3. Update `AGENTS.md` — add the entry from the packet
4. Run validation: `node scripts/validate-frontmatter.js && node scripts/validate-completeness.js`
5. Fix any validation errors
6. Create a PR with the title: "Add skill: {skill-name}"

### Quality checks
- All files pass frontmatter lint
- 3-file pattern complete
- Command frontmatter valid
- AGENTS.md entry added
- No naming collisions with existing skills
```

---

## 7. File Specifications

### New Files Summary

| Phase | File | Purpose |
|-------|------|---------|
| 1 | `.github/workflows/validate-skills.yml` | CI validation |
| 1 | `scripts/validate-frontmatter.js` | Frontmatter checks |
| 1 | `scripts/validate-completeness.js` | 3-file pattern checks |
| 1 | `scripts/validate-naming.js` | Naming convention checks |
| 1 | `scripts/validate-agents-md.js` | AGENTS.md consistency |
| 1 | `scripts/check-mcp-impact.js` | MCP impact advisory |
| 2 | `skills/utility-pm-skill-builder/SKILL.md` | Builder skill |
| 2 | `skills/utility-pm-skill-builder/references/TEMPLATE.md` | Implementation Packet template |
| 2 | `skills/utility-pm-skill-builder/references/EXAMPLE.md` | Completed packet example |
| 2 | `commands/skill-builder.md` | `/skill-builder` command |
| 3 | `.github/workflows/release.yml` | Release automation |
| 3 | `scripts/generate-release-notes.js` | Release note generation |
| 4 | `.github/ISSUE_TEMPLATE/skill-proposal.yml` | Community proposals |

---

## 8. Execution Plan

### Phase 1: CI Pipeline (2-3 days)

```
Day 1:
├── Write validate-frontmatter.js
├── Write validate-completeness.js
├── Write validate-naming.js
└── Write validate-agents-md.js

Day 2:
├── Write check-mcp-impact.js
├── Write validate-skills.yml workflow
├── Test on existing 25 skills (should all pass)
└── Fix any false positives

Day 3:
├── Open PR for CI pipeline
├── Verify workflow runs on PR
└── Merge
```

### Phase 2: pm-skill-builder Skill (3-5 days)

```
Day 1:
├── Write SKILL.md (instructions, workflow, output contract)
└── Write skill-builder.md command

Day 2:
├── Write TEMPLATE.md (Skill Implementation Packet template)
└── Write EXAMPLE.md (completed packet for hypothetical skill)

Day 3:
├── Test: create a new skill using the builder
├── Validate: output passes CI
└── Iterate on instructions based on test results

Day 4-5:
├── Add revision mode (if v1 scope)
├── Update AGENTS.md
├── Update README skill count
└── Open PR
```

### Phase 3: Release Automation (2-3 days)

```
Day 1:
├── Write generate-release-notes.js
└── Write release.yml workflow

Day 2:
├── Write MCP sync dispatch logic
├── Test release workflow with dry-run tag
└── Merge

Day 3:
├── Test full cycle: tag → release → MCP sync PR
└── Document release process
```

### Phase 4: Community & Codex (2-3 days)

```
Day 1:
├── Write skill-proposal issue template
└── Write community contribution guide section in CONTRIBUTING.md

Day 2:
├── Write Codex task template
├── Test Codex autonomous skill creation
└── Document Codex workflow

Day 3:
├── Add review-checklist auto-comment workflow
└── Test full community contribution flow
```

---

## 9. Acceptance Criteria

### Phase 1
- [ ] All 25 existing skills pass CI validation
- [ ] CI fails on PR with invalid frontmatter
- [ ] CI fails on PR with missing TEMPLATE.md
- [ ] CI warns on PR that affects MCP-synced skills
- [ ] CI runs in < 60 seconds

### Phase 2
- [ ] `/skill-builder` produces a complete Skill Implementation Packet
- [ ] Packet includes all required files + frontmatter + checklist
- [ ] Gap analysis correctly identifies overlap with existing skills
- [ ] Classification follows naming conventions
- [ ] Output passes CI validation when files are created from packet

### Phase 3
- [ ] Git tag push creates GitHub release with generated notes
- [ ] Release triggers MCP sync PR in pm-skills-mcp
- [ ] Version mismatch between tag and plugin.json is caught

### Phase 4
- [ ] Skill proposal issue template captures all required information
- [ ] Codex can create skill files from a Skill Implementation Packet
- [ ] Community PR auto-generates review checklist comment
