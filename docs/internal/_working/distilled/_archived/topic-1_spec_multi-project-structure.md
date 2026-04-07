# Topic 1 — Specification: Multi-Project Workspace for PM-Skills

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — agentic-development-optimized spec
> **Approach**: 80/20 best-value (Plugin-Integrated Project Workspace)
> **Companion**: `topic-1_exploration_multi-project-structure.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture](#2-architecture)
3. [Phase 1 Specification: Minimum Viable Workspace](#3-phase-1-specification-minimum-viable-workspace)
4. [Phase 2 Specification: Document Operations](#4-phase-2-specification-document-operations)
5. [Phase 3 Specification: Automation & Intelligence](#5-phase-3-specification-automation--intelligence)
6. [File Specifications](#6-file-specifications)
7. [Execution Plan](#7-execution-plan)
8. [Acceptance Criteria](#8-acceptance-criteria)
9. [Risk Register](#9-risk-register)

---

## 1. Executive Summary

**Goal**: Add multi-project workspace capabilities to pm-skills, enabling PMs to group artifacts by project, switch context between projects, and build on previous work across sessions.

**Approach**: Plugin-integrated commands (`/project`, `/update-doc`, `/link-docs`) that manage a local directory structure. Skills themselves are not modified — project context is injected via a shared preamble loaded by commands.

**Delivery**: Three phases, each independently valuable.

| Phase | Scope | Effort | Value |
|-------|-------|--------|-------|
| 1 | `/project new/switch/list/status` + directory spec | 1-2 days | Project context persistence |
| 2 | `/update-doc` + `/link-docs` + dependency graph | 3-5 days | Document evolution + relationships |
| 3 | Auto-save hook + smart context loading + transcript processing | 5-8 days | Automation + intelligence |

---

## 2. Architecture

### 2.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│ pm-skills plugin (installed via plugin install)          │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ PM Skills│  │ Commands │  │  Hooks   │              │
│  │ (25+)    │  │ (26+)    │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ NEW: Project Management Layer                     │   │
│  │                                                   │   │
│  │  /project new|switch|list|status|archive          │   │
│  │  /update-doc <artifact> [--with <source>]         │   │
│  │  /link-docs <from> <to> [--type <relation>]       │   │
│  │                                                   │   │
│  │  Hook: post-skill-save (auto-persist artifacts)   │   │
│  │  Skill: utility-project-manager                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────┬───────────────────────────────────┘
                      │ reads/writes
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Project Workspace (local filesystem)                     │
│                                                         │
│  ~/pm-projects/  (or configured path)                   │
│  ├── .pm-config.yaml        # Active project, settings  │
│  ├── PROJECT_INDEX.md       # Master project list        │
│  ├── acme-checkout/                                      │
│  │   ├── PROJECT.md         # Context, phase, team       │
│  │   ├── artifacts/         # Skill outputs              │
│  │   ├── inputs/            # Transcripts, notes         │
│  │   ├── links.yaml         # Document relationships     │
│  │   └── .history/          # Revision diffs             │
│  └── beta-mobile/                                        │
│      └── ...                                             │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Storage location | Configurable, default `~/pm-projects/` | Survives repo changes, shareable via Git |
| File format | Markdown + YAML frontmatter | Human-readable, universal, Git-friendly |
| State management | `.pm-config.yaml` at workspace root | Simple, parseable, no database |
| Skill modification | None — context injection via commands | Keeps 25 skills untouched |
| Version control | Optional Git per workspace | Users choose their persistence model |
| Platform portability | Files are plain markdown | Works in any AI tool, editor, or viewer |

### 2.3 Context Injection Pattern

Instead of modifying every skill, project context is provided through the command preamble:

```markdown
<!-- /prd command, with project context injection -->
---
name: prd
description: Create a Product Requirements Document
---

{{#if active_project}}
## Active Project Context

Project: {{active_project.name}}
Phase: {{active_project.phase}}
{{include active_project.artifacts.problem-statement}}
{{include active_project.artifacts.hypothesis}}
{{/if}}

## Instructions
[existing /prd instructions unchanged]
```

This pattern means: when a project is active, the command template loads relevant upstream artifacts as additional context. The skill itself doesn't change.

**Alternative (simpler v1)**: Just instruct the user to run `/project context` before running a skill. This outputs the project's current state to the conversation, which the skill then uses naturally.

---

## 3. Phase 1 Specification: Minimum Viable Workspace

### 3.1 `/project` Command

**File**: `commands/project.md`

```yaml
---
name: project
description: >-
  Manage PM project workspaces. Create, switch between, list, and view status
  of projects. Each project groups related PM artifacts (PRDs, hypotheses,
  user stories, etc.) in a persistent directory.
arguments:
  - name: action
    description: "new | switch | list | status | context | archive"
    required: true
  - name: name
    description: "Project name (kebab-case, used as directory name)"
    required: false
---
```

**Command behaviors:**

| Subcommand | Input | Output | Side Effects |
|-----------|-------|--------|--------------|
| `new <name>` | Project name + guided questions | Confirmation + PROJECT.md | Creates project directory |
| `switch <name>` | Project name | Confirmation + brief status | Updates `.pm-config.yaml` |
| `list` | None | Table of all projects | None |
| `status` | None (uses active project) | Artifact inventory + phase + health | None |
| `context` | None (uses active project) | Full project context for copy-paste | None |
| `archive <name>` | Project name | Confirmation | Moves to `_archived/` |

### 3.2 Project Directory Specification

```
<project-name>/
├── PROJECT.md              # REQUIRED — project metadata and context
├── artifacts/              # REQUIRED — skill outputs organized here
│   ├── define/             # Phase-organized subdirectories
│   │   ├── problem-statement.md
│   │   ├── hypothesis.md
│   │   └── jtbd-canvas.md
│   ├── develop/
│   │   ├── prd_v1.md
│   │   └── solution-brief.md
│   ├── deliver/
│   │   ├── user-stories.md
│   │   └── launch-checklist.md
│   ├── discover/
│   ├── measure/
│   └── iterate/
├── inputs/                 # OPTIONAL — raw inputs (transcripts, notes)
│   └── interview-2026-03-15.md
├── links.yaml              # Phase 2 — document relationships
└── .history/               # Phase 2 — revision tracking
```

### 3.3 PROJECT.md Schema

```markdown
---
name: Acme Checkout Redesign
slug: acme-checkout-redesign
phase: develop
created: 2026-03-21
updated: 2026-03-21
status: active
stakeholders:
  - name: Sarah Chen
    role: Engineering Lead
  - name: Mike Torres
    role: Design Lead
tags: [checkout, mobile, conversion]
---

# Acme Checkout Redesign

## Objective
Reduce mobile checkout abandonment from 73% to under 55% by simplifying
the checkout flow for returning users.

## Key Constraints
- Must not break existing payment integrations
- Mobile-first design requirement
- Q2 2026 launch target

## Current State
- Problem statement defined (2026-03-15)
- Hypothesis validated via user interviews
- PRD v1 in review with engineering

## Open Questions
- Should guest checkout be in scope for v1?
- Payment provider migration timeline
```

### 3.4 `.pm-config.yaml` Schema

```yaml
# Workspace configuration
workspace:
  version: "1.0"
  created: 2026-03-21

# Active project (set by /project switch)
active_project: acme-checkout-redesign

# Settings
settings:
  auto_save: false          # Phase 3 feature
  artifact_versioning: true  # Auto-version on update
  phase_subdirectories: true # Organize artifacts by phase
```

### 3.5 `PROJECT_INDEX.md` Schema

```markdown
# PM Projects

| Project | Phase | Status | Artifacts | Last Active |
|---------|-------|--------|-----------|-------------|
| [acme-checkout-redesign](acme-checkout-redesign/PROJECT.md) | develop | active | 5 | 2026-03-21 |
| [beta-mobile-app](beta-mobile-app/PROJECT.md) | discover | active | 2 | 2026-03-18 |
| [q2-pricing](q2-pricing/PROJECT.md) | measure | active | 4 | 2026-03-20 |
```

---

## 4. Phase 2 Specification: Document Operations

### 4.1 `/update-doc` Command

**File**: `commands/update-doc.md`

**Purpose**: Intelligently update an existing PM artifact with new information while preserving the document's structure, voice, and version history.

**Workflow**:

```
1. Identify the target artifact (by name or path)
2. Read the current artifact content
3. Accept new information source:
   - Free text from user
   - Another artifact (e.g., "update PRD based on latest interview synthesis")
   - A file in inputs/ (e.g., transcript)
4. Produce an updated version:
   - Preserve document structure (sections, headers)
   - Integrate new information at appropriate locations
   - Flag conflicts or contradictions
   - Maintain frontmatter metadata
5. Save as new version (artifact_v{N+1}.md)
6. Log the change in .history/ with provenance
```

**Key capability**: The update is *intelligent*, not a blind append. It understands the artifact's template structure (because pm-skills templates are standardized) and inserts information in the right sections.

### 4.2 `/link-docs` Command

**File**: `commands/link-docs.md`

**Purpose**: Create and manage relationships between PM artifacts within a project.

**Link types**:

| Type | Meaning | Example |
|------|---------|---------|
| `informs` | Content from A should be reflected in B | problem-statement → hypothesis |
| `validates` | B provides evidence for/against A | experiment-results → hypothesis |
| `decomposes` | B is a breakdown of A | prd → user-stories |
| `constrains` | A places limits on B | stakeholder-summary → prd |
| `supersedes` | B replaces A | prd_v2 → prd_v1 |

**`links.yaml` schema**:

```yaml
links:
  - from: define/problem-statement.md
    to: define/hypothesis.md
    type: informs
    created: 2026-03-21

  - from: define/hypothesis.md
    to: develop/prd_v1.md
    type: informs
    created: 2026-03-22

  - from: develop/prd_v1.md
    to: deliver/user-stories.md
    type: decomposes
    created: 2026-03-23
```

---

## 5. Phase 3 Specification: Automation & Intelligence

### 5.1 Auto-Save Hook

A PostToolUse hook that detects when a pm-skill produces output and saves it to the active project:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "node ${CLAUDE_PLUGIN_ROOT}/scripts/auto-save-artifact.js"
      }
    ]
  }
}
```

The script checks if:
1. A project is active (reads `.pm-config.yaml`)
2. The written file matches a pm-skills artifact pattern
3. If both true, copies the artifact to the project's `artifacts/` directory

### 5.2 Smart Context Loading

A SessionStart hook or command preamble that loads project context:

```
On session start:
1. Check for .pm-config.yaml in workspace
2. If active_project is set:
   a. Load PROJECT.md (always < 500 tokens)
   b. Build artifact inventory (names + dates, not content)
   c. Present brief status to user
3. User proceeds with project context loaded
```

### 5.3 Transcript Processing Skill

**File**: `skills/utility-process-transcript/SKILL.md`

**Workflow**:

```
Input: Raw transcript file (in inputs/)
Output: Insight extraction report + suggested artifact updates

1. Parse transcript (meeting notes, interview, stakeholder conversation)
2. Extract key insights categorized by:
   - Problem/need statements
   - Feature requests / requirements
   - Constraints / risks
   - Decisions made
   - Action items
3. Match insights against existing project artifacts:
   - Which artifacts should be updated?
   - What specific sections are affected?
   - What new artifacts should be created?
4. Generate an Insight Report with:
   - Summarized insights with source quotes
   - Recommended artifact updates (with diffs)
   - Suggested new artifacts
5. User reviews and approves changes
6. Approved changes applied via /update-doc
```

---

## 6. File Specifications

### 6.1 New Files (Phase 1)

| File | Purpose | Location |
|------|---------|----------|
| `commands/project.md` | `/project` slash command | pm-skills repo |
| `skills/utility-project-manager/SKILL.md` | Project management skill | pm-skills repo |
| `skills/utility-project-manager/references/TEMPLATE.md` | PROJECT.md template | pm-skills repo |
| `skills/utility-project-manager/references/EXAMPLE.md` | Example project setup | pm-skills repo |
| `scripts/init-workspace.sh` | Workspace initialization script | pm-skills repo |

### 6.2 New Files (Phase 2)

| File | Purpose | Location |
|------|---------|----------|
| `commands/update-doc.md` | `/update-doc` slash command | pm-skills repo |
| `commands/link-docs.md` | `/link-docs` slash command | pm-skills repo |
| `skills/utility-doc-updater/SKILL.md` | Intelligent document update skill | pm-skills repo |
| `skills/utility-doc-updater/references/TEMPLATE.md` | Update report template | pm-skills repo |
| `skills/utility-doc-updater/references/EXAMPLE.md` | Example update scenario | pm-skills repo |

### 6.3 New Files (Phase 3)

| File | Purpose | Location |
|------|---------|----------|
| `hooks/post-skill-save.js` | Auto-save hook | pm-skills repo |
| `skills/utility-process-transcript/SKILL.md` | Transcript processing skill | pm-skills repo |
| `skills/utility-process-transcript/references/TEMPLATE.md` | Insight report template | pm-skills repo |
| `skills/utility-process-transcript/references/EXAMPLE.md` | Example transcript processing | pm-skills repo |

### 6.4 Modified Files

| File | Change | Phase |
|------|--------|-------|
| `.claude-plugin/plugin.json` | Add new commands + skills + hooks | 1, 2, 3 |
| `AGENTS.md` | Add new skill entries | 1, 2, 3 |
| `README.md` | Document project management capabilities | 1 |
| `CHANGELOG.md` | Document changes | All |

---

## 7. Execution Plan

### 7.1 Phase 1: Minimum Viable Workspace (1-2 days)

```
Step 1: Define project directory specification
├── Write PROJECT.md schema
├── Write .pm-config.yaml schema
├── Write PROJECT_INDEX.md schema
└── Document file naming conventions

Step 2: Build /project command
├── Write commands/project.md with all subcommands
├── Implement new, switch, list, status, context, archive
└── Test each subcommand end-to-end

Step 3: Build utility-project-manager skill
├── Write SKILL.md (project creation guidance)
├── Write TEMPLATE.md (PROJECT.md template)
├── Write EXAMPLE.md (completed project setup)
└── Validate frontmatter against pm-skills schema

Step 4: Build workspace initialization
├── Write scripts/init-workspace.sh
├── Handle first-run experience (no workspace exists)
└── Handle existing workspace (add project)

Step 5: Integration
├── Update plugin.json
├── Update AGENTS.md
├── Run frontmatter lint
├── Run command validation
└── Test full flow: new → switch → status → context
```

### 7.2 Phase 2: Document Operations (3-5 days)

```
Step 1: Build /update-doc command and skill
├── Write command with argument handling
├── Implement version detection and increment
├── Implement intelligent merge logic
├── Build .history/ diff generation
└── Test: update PRD with new interview data

Step 2: Build /link-docs command
├── Write command with link type argument
├── Implement links.yaml management
├── Implement link validation (target exists)
├── Build link graph visualization (ASCII)
└── Test: link problem-statement → hypothesis → prd

Step 3: Enhance /project status
├── Add link graph to status output
├── Add stale document detection
├── Add phase progression suggestions
└── Test: status with rich project
```

### 7.3 Phase 3: Automation & Intelligence (5-8 days)

```
Step 1: Build auto-save hook
├── Write PostToolUse hook script
├── Implement artifact detection logic
├── Handle naming and versioning
├── Test: run /prd → artifact auto-saved

Step 2: Build smart context loading
├── Implement context selection algorithm
├── Build token-budget-aware loading
├── Test: /prd loads only relevant upstream artifacts

Step 3: Build transcript processing skill
├── Write SKILL.md with extraction workflow
├── Write TEMPLATE.md (Insight Report)
├── Write EXAMPLE.md (sample transcript → insights)
├── Implement multi-document routing logic
├── Test: transcript → insight report → suggested updates
```

---

## 8. Acceptance Criteria

### Phase 1

- [ ] `/project new acme-checkout` creates directory with PROJECT.md
- [ ] `/project switch acme-checkout` sets active project in .pm-config.yaml
- [ ] `/project list` shows all projects with phase and status
- [ ] `/project status` shows artifact inventory for active project
- [ ] `/project context` outputs project context suitable for pasting
- [ ] `/project archive acme-checkout` moves project to `_archived/`
- [ ] Workspace works without Git installed
- [ ] PROJECT.md is < 500 tokens when loaded
- [ ] All files pass frontmatter lint and command validation

### Phase 2

- [ ] `/update-doc problem-statement` creates versioned update with provenance
- [ ] `/link-docs problem-statement hypothesis --type informs` creates link
- [ ] `/project status` shows document dependency graph
- [ ] Stale documents are flagged in status output
- [ ] .history/ contains readable diffs between versions

### Phase 3

- [ ] Auto-save hook persists skill output to active project
- [ ] Smart context loading stays under 2000 tokens
- [ ] Transcript processing extracts insights and maps to artifacts
- [ ] Full workflow: transcript → insights → update suggestions → applied updates

---

## 9. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Hook-based auto-save can't capture skill output content | Phase 3 blocked | Medium | Alternative: user runs `/project save` manually |
| Token budget exceeded by project context | Performance degradation | Medium | Implement strict token budget with selective loading |
| Users confused by workspace + repo distinction | Adoption friction | Low | Clear documentation, first-run guide |
| Cross-platform hooks don't work in Codex/Gemini CLI | Reduced value on other platforms | High | Core functionality works without hooks (manual save) |
| State corruption in .pm-config.yaml | Lost active project | Low | Human-readable YAML, easy manual fix |
| Naming conflicts with other pm-skills efforts | Coordination overhead | Low | Check AGENTS.md and effort index before naming |
