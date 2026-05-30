---
title: Project Structure
description: High-level walkthrough of the pm-skills repository layout - skills/, commands/, _workflows/, docs/, _agent-context/, .github/ - explaining which folder serves which purpose at the repo level for contributors.
---

## Table of Contents
- [Directory Overview](#directory-overview)
- [/skills/ . Skills](#skills--the-63-pm-skills-flat)
- [/commands/ . Slash Commands](#commands--slash-commands)
- [/workflows/ . Workflows](#_workflows--workflows)
- [/docs/ . Documentation](#docs--documentation)
- [/templates/ . Skill Templates](#docstemplates--skill-templates)
- [/_agent-context/ . AI Agent Context](#_agent-context--ai-agent-context)
- [/.github/ . GitHub Configuration](#github--github-configuration)
- [Root Files](#root-files)
- [File Naming Conventions](#file-naming-conventions)
- [Related Documentation](#related-documentation)

This document provides a comprehensive overview of the PM-Skills repository structure. For a quick overview, see the [README.md](https://github.com/product-on-purpose/pm-skills/blob/main/README.md#project-structure).

## Directory Overview

```
pm-skills/
├── skills/                     # Core PM skills (63 total: 30 phase + 8 foundation + 10 utility + 15 tool; flat layout)
├── commands/                   # Slash command markdown files
├── _workflows/                 # Workflows source (12 in v2.15.0)
├── agents/                     # Sub-agent definitions (v2.16.0+; auto-discovered by Claude Code's plugin runtime)
│   ├── _pairing.yaml           # Sub-agent + companion slash command pairings
│   └── _chain-permitted.yaml   # Allowlist of sub-agents permitted to use Agent tool (D14 + D21)
├── docs/                       # Documentation (incl. templates)
│   └── templates/              # Skill creation templates
├── _agent-context/             # AI agent session context (separate from agents/; coordination + session logs)
├── .github/                    # GitHub configuration
└── [root files]                # README, LICENSE, etc.
```

Note on `agents/` vs `_agent-context/`: these are distinct directories with different purposes. `agents/` holds Claude Code plugin sub-agent definitions (auto-discovered at the fixed `agents/` path); `_agent-context/` holds agent-coordination context (session logs, claude/, codex/, DECISIONS.md). The coordination directory was named `AGENTS/` through v2.16.x; v2.17.0 (W2) renamed it to `_agent-context/` so the lowercase `agents/` name no longer collides with it on case-insensitive filesystems (Windows NTFS, macOS APFS), freeing `agents/` for native sub-agent discovery.

---

## `/skills/` . The 63 PM Skills (flat)

Skills are the core of PM-Skills. Each skill teaches AI assistants how to produce a specific PM artifact with professional quality.

### Organization

Flat directories named `{phase}-{skill}` for domain skills, plus classification-driven names such as `foundation-persona` and `utility-pm-skill-builder` for non-phase skills.

Examples: `discover-competitive-analysis`, `define-hypothesis`, `deliver-prd`, `foundation-persona`, `utility-pm-skill-builder`.

### Skill Structure

Each skill follows the [Agent Skills Specification](https://agentskills.io/specification):

```
skills/{skill-name}/
├── SKILL.md              # Instructions for AI (required)
└── references/
    ├── TEMPLATE.md       # Output structure (required)
    └── EXAMPLE.md        # Real-world example (required)
```

| File | Purpose |
|------|---------|
| `SKILL.md` | Primary instruction file. Contains frontmatter metadata and step-by-step guidance for the AI. |
| `references/TEMPLATE.md` | The structure the AI should follow when generating output. |
| `references/EXAMPLE.md` | A complete, high-quality example showing expected output. |

### Skills by Phase

#### Discover Phase (3 skills)

| Skill | Purpose |
|-------|---------|
| `discover-interview-synthesis` | Turn user research into actionable insights |
| `discover-competitive-analysis` | Map market landscape and find opportunities |
| `discover-stakeholder-summary` | Understand stakeholder needs and concerns |

#### Define Phase (4 skills)

| Skill | Purpose |
|-------|---------|
| `define-problem-statement` | Crystal-clear problem framing |
| `define-hypothesis` | Testable assumptions with success metrics |
| `define-opportunity-tree` | Teresa Torres-style outcome mapping |
| `define-jtbd-canvas` | Jobs to be Done framework |

#### Develop Phase (4 skills)

| Skill | Purpose |
|-------|---------|
| `develop-solution-brief` | One-page solution pitch |
| `develop-spike-summary` | Document technical explorations |
| `develop-adr` | Architecture Decision Records (Nygard format) |
| `develop-design-rationale` | Capture design choice reasoning |

#### Deliver Phase (6 skills)

| Skill | Purpose |
|-------|---------|
| `deliver-acceptance-criteria` | Given/When/Then acceptance criteria for a story or feature slice |
| `deliver-prd` | Comprehensive product requirements document |
| `deliver-user-stories` | INVEST-compliant stories with acceptance criteria |
| `deliver-edge-cases` | Error states, boundaries, recovery paths |
| `deliver-launch-checklist` | Pre-launch verification checklist |
| `deliver-release-notes` | User-facing release communication |

#### Foundation (8 skills)

| Skill | Purpose |
|-------|---------|
| `foundation-lean-canvas` | One-page lean canvas across nine interlocking blocks |
| `foundation-meeting-agenda` | Attendee-facing pre-meeting agenda |
| `foundation-meeting-brief` | Private pre-meeting strategic preparation |
| `foundation-meeting-recap` | Post-meeting summary with decisions and actions |
| `foundation-meeting-synthesize` | Cross-meeting pattern synthesis from multiple recaps |
| `foundation-okr-writer` | Outcome-based OKR set authoring with coaching |
| `foundation-persona` | Evidence-calibrated product or marketing persona generation |
| `foundation-stakeholder-update` | Async stakeholder communication for non-attendees |

#### Utility Skills (10 utility)

| Skill | Purpose |
|-------|---------|
| `utility-mermaid-diagrams` | Generate Mermaid diagrams for PM artifacts |
| `utility-pm-skill-builder` | Guided creation of new pm-skills-compatible skills |
| `utility-pm-skill-iterate` | Targeted improvements to existing skills based on feedback |
| `utility-pm-skill-validate` | Audit skills against structural conventions and quality criteria |
| `utility-slideshow-creator` | Generate professional presentations from JSON deck specs |
| `utility-update-pm-skills` | Check for updates and update local pm-skills installation |

#### Measure Phase (5 skills)

| Skill | Purpose |
|-------|---------|
| `measure-experiment-design` | Rigorous A/B test planning |
| `measure-instrumentation-spec` | Event tracking requirements |
| `measure-dashboard-requirements` | Analytics dashboard specifications |
| `measure-experiment-results` | Document learnings from experiments |
| `measure-okr-grader` | Score OKR achievement at end-of-quarter using canonical type and indicator-class enums |

#### Iterate Phase (4 skills)

| Skill | Purpose |
|-------|---------|
| `iterate-retrospective` | Team retrospectives that drive action |
| `iterate-lessons-log` | Build organizational memory |
| `iterate-refinement-notes` | Capture backlog refinement outcomes |
| `iterate-pivot-decision` | Evidence-based pivot/persevere framework |

---

## `/commands/` . Slash Commands

Contains Claude Code slash command definitions. Each `.md` maps a `/command` to its skill (or workflow).

**Commands (73 total: 59 skill commands + 10 workflow commands + 4 sub-agent commands)**
| Command | Target skill/workflow |
| --- | --- |
| `discover-competitive-analysis` | discover-competitive-analysis |
| `discover-interview-synthesis` | discover-interview-synthesis |
| `discover-stakeholder-summary` | discover-stakeholder-summary |
| `define-problem-statement` | define-problem-statement |
| `define-hypothesis` | define-hypothesis |
| `define-opportunity-tree` | define-opportunity-tree |
| `define-jtbd-canvas` | define-jtbd-canvas |
| `develop-adr` | develop-adr |
| `develop-design-rationale` | develop-design-rationale |
| `develop-solution-brief` | develop-solution-brief |
| `develop-spike-summary` | develop-spike-summary |
| `deliver-acceptance-criteria` | deliver-acceptance-criteria |
| `deliver-prd` | deliver-prd |
| `deliver-user-stories` | deliver-user-stories |
| `deliver-edge-cases` | deliver-edge-cases |
| `deliver-launch-checklist` | deliver-launch-checklist |
| `deliver-release-notes` | deliver-release-notes |
| `measure-dashboard-requirements` | measure-dashboard-requirements |
| `measure-experiment-design` | measure-experiment-design |
| `measure-experiment-results` | measure-experiment-results |
| `measure-instrumentation-spec` | measure-instrumentation-spec |
| `measure-okr-grader` | measure-okr-grader |
| `iterate-lessons-log` | iterate-lessons-log |
| `iterate-pivot-decision` | iterate-pivot-decision |
| `iterate-refinement-notes` | iterate-refinement-notes |
| `iterate-retrospective` | iterate-retrospective |
| `foundation-lean-canvas` | foundation-lean-canvas |
| `foundation-meeting-agenda` | foundation-meeting-agenda |
| `foundation-meeting-brief` | foundation-meeting-brief |
| `foundation-meeting-recap` | foundation-meeting-recap |
| `foundation-meeting-synthesize` | foundation-meeting-synthesize |
| `foundation-okr-writer` | foundation-okr-writer |
| `foundation-persona` | foundation-persona |
| `foundation-stakeholder-update` | foundation-stakeholder-update |
| `utility-pm-skill-iterate` | utility-pm-skill-iterate |
| `utility-pm-skill-validate` | utility-pm-skill-validate |
| `utility-mermaid-diagrams` | utility-mermaid-diagrams |
| `utility-pm-skill-builder` | utility-pm-skill-builder |
| `utility-slideshow-creator` | utility-slideshow-creator |
| `utility-update-pm-skills` | utility-update-pm-skills |
| `/workflow-feature-kickoff` | feature-kickoff workflow |
| `/workflow-customer-discovery` | customer-discovery workflow |
| `/workflow-sprint-planning` | sprint-planning workflow |
| `/workflow-product-strategy` | product-strategy workflow |
| `/workflow-post-launch-learning` | post-launch-learning workflow |
| `/workflow-stakeholder-alignment` | stakeholder-alignment workflow |
| `/workflow-technical-discovery` | technical-discovery workflow |

---

## `/_workflows/` . Workflows

Workflows chain multiple skills together into guided, end-to-end sequences.

| Workflow | Purpose | Skills Included |
|----------|---------|-----------------|
| `feature-kickoff.md` | New feature development | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| `lean-startup.md` | Rapid validation cycle | hypothesis → experiment-design → experiment-results → pivot-decision |
| `triple-diamond.md` | Complete product development | All 30 phase skills across 6 phases |
| `customer-discovery.md` | Transform raw research into a validated problem | interview-synthesis → stakeholder-summary → problem-statement → hypothesis |
| `sprint-planning.md` | Prepare sprint-ready stories from a backlog | user-stories → acceptance-criteria → edge-cases |
| `product-strategy.md` | Frame a major strategic initiative | competitive-analysis → opportunity-tree → problem-statement → solution-brief |
| `post-launch-learning.md` | Measure results and capture learnings after launch | experiment-results → dashboard-requirements → lessons-log → retrospective |
| `stakeholder-alignment.md` | Build a case for leadership buy-in | stakeholder-summary → problem-statement → solution-brief → design-rationale |
| `technical-discovery.md` | Evaluate technical feasibility and architecture | spike-summary → adr → solution-brief |

---

## `/docs/` . Documentation

```
docs/
├── getting-started/          # Quick setup guides (index + quickstart)
├── guides/                   # How-to guides (using skills, creating pm-skills, mcp-integration, ...)
├── concepts/                 # Conceptual orientation (triple-diamond-delivery-process, ...)
├── reference/                # Lookup material (categories, anatomy, project-structure, ...)
├── skills/                   # Generated per-skill pages (one per skill, plus phase/category indices)
├── workflows/                # Generated workflow pages (one per workflow + index)
├── showcase/                 # Generated thread-aligned showcase (storevine, brainshelf, workbench)
└── releases/                 # Per-version release notes
```

The `docs/frameworks/` folder was retired in v2.13.0 (Bucket A.1); the canonical Triple Diamond reference now lives at `docs/concepts/triple-diamond-delivery-process.md` with a `mkdocs.yml` redirect from the old path.

| Document | Audience | Purpose |
|----------|----------|---------|
| `getting-started/index.md` | New users | Installation and first steps |
| `guides/using-skills.md` | All users | Beginner to advanced usage |
| `guides/creating-pm-skills.md` | Contributors | Skill creation guide |
| `reference/categories.md` | Contributors | Category taxonomy |
| `reference/frontmatter-schema.yaml` | Contributors | Metadata validation rules |

---

## `/docs/templates/` . Skill Templates

Starter templates for creating new skills.

```
docs/templates/
└── skill-template/
    ├── SKILL.md              # Template with placeholders
    ├── TEMPLATE.md           # Output structure template
    └── EXAMPLE.md            # Example template
```

Use these templates when contributing a new skill. See [creating-pm-skills.md](../guides/creating-pm-skills.md) for the full process.

---

## `/_agent-context/` . AI Agent Context

Session continuity for AI coding assistants. Contains context, decisions, and session logs.

```
_agent-context/
├── DECISIONS.md              # Shared cross-agent decisions
├── SESSION-LOG/              # Shared session logs (model encoded in filename:
│                             #   <date>[_<HH-MM>]_<model>_<scope>.md)
├── claude/
│   ├── CONTEXT.md            # Claude continuity state
│   ├── DECISIONS.md          # Claude-local rationale
│   ├── TODO.md               # Task tracking
│   └── PLANNING/             # Working collaboration artifacts
└── codex/
    ├── CONTEXT.md            # Codex continuity state
    ├── DECISIONS.md          # Codex-local rationale
    └── PLANNING/             # Working collaboration artifacts
```

This directory helps AI assistants maintain context across sessions. Not required for using PM-Skills.

---

## `/.github/` . GitHub Configuration

```
.github/
├── workflows/
│   ├── release.yml           # Package and publish releases
│   ├── sync-agents-md.yml    # Auto-sync AGENTS.md on changes
│   └── codeql.yml            # Code scanning
├── ISSUE_TEMPLATE/
│   ├── bug_report.yml        # Bug report template
│   ├── feature_request.yml   # Feature request template
│   └── config.yml            # Template configuration
├── PULL_REQUEST_TEMPLATE.md  # PR checklist
└── dependabot.yml            # Dependency updates
```

---

## Root Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, installation, usage |
| `AGENTS.md` | Universal agent discovery (auto-detected by Copilot, Cursor, Windsurf) |
| `CHANGELOG.md` | Version history ([Keep a Changelog](https://keepachangelog.com/) format) |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CODE_OF_CONDUCT.md` | Community standards |
| `SECURITY.md` | Vulnerability reporting |
| `LICENSE` | Apache 2.0 license |
| `CLAUDE.md` | Project-specific instructions for Claude Code |

---

## File Naming Conventions

| Pattern | Meaning |
|---------|---------|
| `UPPERCASE.md` | Root-level documentation (README, CHANGELOG, etc.) |
| `lowercase-with-dashes/` | Skill directories and feature folders |
| `SKILL.md` | Skill instruction file (always uppercase) |
| `TEMPLATE.md` | Output template (always uppercase) |
| `EXAMPLE.md` | Example output (always uppercase) |
| `_prefix/` | Underscore prefix for meta directories (e.g., `_workflows/`) |

---

## Related Documentation

- [Getting Started Guide](../getting-started/index.md)
- [Using Skills Guide](../guides/using-skills.md)
- [Creating PM Skills](../guides/creating-pm-skills.md)
- [Category Reference](categories.md)
- [Frontmatter Schema](frontmatter-schema.yaml)
