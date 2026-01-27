# Project Structure

This document provides a comprehensive overview of the PM-Skills repository structure. For a quick overview, see the [README.md](../../README.md#project-structure).

## Directory Overview

```
pm-skills/
├── skills/                   # Core PM skills (24 total, flat)
├── commands/                 # Claude Code slash commands
├── _bundles/                 # Workflow bundles
├── docs/                     # Documentation
├── templates/                # Skill creation templates
├── AGENTS/                   # AI agent session context
├── .github/                  # GitHub configuration
└── [root files]              # README, LICENSE, etc.
```

---

## `/skills/` — The 24 PM Skills (flat)

Skills are the core of PM-Skills. Each skill teaches AI assistants how to produce a specific PM artifact with professional quality.

### Organization

Flat directories named `{phase}-{skill}` (hyphen-only, lowercase). Phase is captured in front matter.

Examples: `discover-competitive-analysis`, `define-hypothesis`, `deliver-prd`, `measure-experiment-results`.

### Skill Structure

Each skill follows the [Agent Skills Specification](https://agentskills.io/specification):

```
skills/{phase}-{skill-name}/
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

#### Deliver Phase (5 skills)

| Skill | Purpose |
|-------|---------|
| `deliver-prd` | Comprehensive product requirements document |
| `deliver-user-stories` | INVEST-compliant stories with acceptance criteria |
| `deliver-edge-cases` | Error states, boundaries, recovery paths |
| `deliver-launch-checklist` | Pre-launch verification checklist |
| `deliver-release-notes` | User-facing release communication |

#### Measure Phase (4 skills)

| Skill | Purpose |
|-------|---------|
| `measure-experiment-design` | Rigorous A/B test planning |
| `measure-instrumentation-spec` | Event tracking requirements |
| `measure-dashboard-requirements` | Analytics dashboard specifications |
| `measure-experiment-results` | Document learnings from experiments |

#### Iterate Phase (4 skills)

| Skill | Purpose |
|-------|---------|
| `iterate-retrospective` | Team retrospectives that drive action |
| `iterate-lessons-log` | Build organizational memory |
| `iterate-refinement-notes` | Capture backlog refinement outcomes |
| `iterate-pivot-decision` | Evidence-based pivot/persevere framework |

---

## `/commands/` — Slash Commands

Contains Claude Code slash command definitions. Each `.md` file maps a `/command` to its corresponding skill.

```
commands/
├── prd.md                    # /prd → skills/deliver-prd
├── hypothesis.md             # /hypothesis → skills/define-hypothesis
├── user-stories.md           # /user-stories → skills/deliver-user-stories
├── kickoff.md                # /kickoff → _bundles/feature-kickoff
└── ... (25 total)
```

**Total commands:** 25 (24 skill commands + 1 bundle command)

---

## `/_bundles/` — Workflow Bundles

Bundles chain multiple skills together into guided, end-to-end workflows.

| Bundle | Purpose | Skills Included |
|--------|---------|-----------------|
| `feature-kickoff.md` | New feature development | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| `lean-startup.md` | Rapid validation cycle | hypothesis → experiment-design → experiment-results → pivot-decision |
| `triple-diamond.md` | Complete product development | All 24 skills across 6 phases |

---

## `/docs/` — Documentation

```
docs/
├── getting-started.md        # Quick setup guide
├── guides/
│   ├── using-skills.md       # How to use skills effectively
│   └── authoring-pm-skills.md # How to create new skills
├── reference/
│   ├── categories.md         # Skill categorization system
│   ├── frontmatter-schema.yaml # Metadata specification
│   └── project-structure.md  # This file
└── frameworks/
    └── triple-diamond-delivery-process.md
```

| Document | Audience | Purpose |
|----------|----------|---------|
| `getting-started.md` | New users | Installation and first steps |
| `guides/using-skills.md` | All users | Beginner to advanced usage |
| `guides/authoring-pm-skills.md` | Contributors | Skill creation guide |
| `reference/categories.md` | Contributors | Category taxonomy |
| `reference/frontmatter-schema.yaml` | Contributors | Metadata validation rules |

---

## `/templates/` — Skill Templates

Starter templates for creating new skills.

```
templates/
└── skill-template/
    ├── SKILL.md              # Template with placeholders
    ├── TEMPLATE.md           # Output structure template
    └── EXAMPLE.md            # Example template
```

Use these templates when contributing a new skill. See [authoring-pm-skills.md](../guides/authoring-pm-skills.md) for the full process.

---

## `/AGENTS/` — AI Agent Context

Session continuity for AI coding assistants. Contains context, decisions, and session logs.

```
AGENTS/
└── claude-opus-4.5/
    ├── CONTEXT.md            # Current project state
    ├── DECISIONS.md          # Technical decisions (ADR format)
    ├── TODO.md               # Task tracking
    ├── SESSION-LOG/          # Session summaries
    └── PLANNING/             # Working collaboration artifacts
```

This directory helps AI assistants maintain context across sessions. Not required for using PM-Skills.

---

## `/.github/` — GitHub Configuration

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
| `_prefix/` | Underscore prefix for meta directories (e.g., `_bundles/`) |

---

## Related Documentation

- [Getting Started Guide](../getting-started.md)
- [Using Skills Guide](../guides/using-skills.md)
- [Authoring PM Skills](../guides/authoring-pm-skills.md)
- [Category Reference](categories.md)
- [Frontmatter Schema](frontmatter-schema.yaml)
