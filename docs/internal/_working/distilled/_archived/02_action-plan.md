# PM-Skills Action Plan

> **Date**: 2026-03-21 | **Author**: Claude Opus 4.6 | **Status**: Distilled from 11 exploration documents
> **Companion**: `01_executive-brief.md` (decisions and rationale)

---

## How to Use This Document

Each phase is independently valuable. You can ship Phase 1 without committing to Phase 4. Each item has effort, dependencies, and acceptance criteria so it can be handed to an agent (Claude Code, Codex) or done manually.

---

## Phase 1: Quality Foundation (v2.7)

**Theme**: Build the CI pipeline and skill builder that enable everything else.
**Total effort**: ~7-10 days | **Dependencies**: None

### 1.1 CI Validation Pipeline

**Effort**: 2-3 days | **Depends on**: Nothing

**What to build**:

| Script | Checks | Priority |
|--------|--------|----------|
| `scripts/validate-frontmatter.js` | Required fields, name=dir match, valid classification, description length | Must have |
| `scripts/validate-completeness.js` | SKILL.md + TEMPLATE.md + EXAMPLE.md exist and non-empty | Must have |
| `scripts/validate-naming.js` | Kebab-case, phase prefix, 1-64 chars, no collisions | Must have |
| `scripts/validate-agents-md.js` | Every skill has AGENTS.md entry, no orphans | Must have |
| `scripts/check-mcp-impact.js` | Advisory flag if new skill needs pm-skills-mcp update | Nice to have |

**Workflow**: `.github/workflows/validate-skills.yml`
- Trigger: PR touching `skills/**`, `commands/**`, or `AGENTS.md`
- Runs all 5 scripts in parallel jobs
- Target: < 60 seconds total

**Done when**:
- [ ] All 25 existing skills pass
- [ ] CI fails on PR with invalid frontmatter
- [ ] CI fails on PR with missing TEMPLATE.md
- [ ] CI warns (advisory) on MCP-impacting changes

---

### 1.2 PM Skill Builder Skill

**Effort**: 3-5 days | **Depends on**: 1.1 (CI validates the builder's own output)

**Files to create**:
```
skills/utility-pm-skill-builder/
├── SKILL.md                           # Gap analysis → Why Gate → classify → packet
└── references/
    ├── TEMPLATE.md                    # Skill Implementation Packet template
    └── EXAMPLE.md                     # Completed packet for hypothetical skill

commands/skill-builder.md              # /skill-builder slash command
```

**Workflow the skill teaches**:
1. Gap analysis — check against 25 existing skills
2. Why Gate — name 2-3 specific prompts where existing skills fail
3. Repo-fit — new skill / revise existing / bundle / command / docs-only
4. Classification — domain/foundation/utility + phase + category
5. Implementation Packet — draft all files + frontmatter + checklist
6. Validation checklist — what to check before PR

**Done when**:
- [ ] `/skill-builder` produces a complete Skill Implementation Packet
- [ ] Packet includes draft SKILL.md, TEMPLATE.md, EXAMPLE.md, command, AGENTS.md entry
- [ ] Gap analysis correctly identifies overlap with existing skills
- [ ] Files created from the packet pass CI validation (1.1)

---

### 1.3 Quick Wins

**Effort**: 0.5 day each

- [ ] **Anthropic marketplace submission** — Submit pm-skills to the official plugin directory. Plugin is already compliant (M-11 verified). Just fill the form at clau.de/plugin-directory-submission.
- [ ] **Community skill proposal issue template** — `.github/ISSUE_TEMPLATE/skill-proposal.yml` with fields for name, phase, problem, evidence, artifact, overlap.

---

## Phase 2: Project Workspace (v2.8)

**Theme**: Multi-project support and release automation.
**Total effort**: ~10-16 days | **Dependencies**: Phase 1 for CI

### 2.1 Project Manager Skill + Command

**Effort**: 3-5 days | **Depends on**: Nothing (can start in parallel with Phase 1)

**Files to create**:
```
skills/utility-project-manager/
├── SKILL.md
└── references/
    ├── TEMPLATE.md                    # PROJECT.md template
    └── EXAMPLE.md                     # Example project setup

commands/project.md                    # /project new|switch|list|status|context|archive
```

**Key design specs**:
- Workspace default: `~/pm-projects/` (configurable via `.pm-config.yaml`)
- PROJECT.md: < 500 tokens, includes objective, phase, stakeholders, constraints
- Artifacts organized by phase: `artifacts/{discover,define,develop,deliver,measure,iterate}/`
- `/project status` shows artifact inventory + phase progress + stale alerts

**Done when**:
- [ ] `/project new acme-checkout` creates directory with PROJECT.md
- [ ] `/project switch acme-checkout` sets active project
- [ ] `/project list` shows all projects with phase and status
- [ ] `/project status` shows artifact inventory
- [ ] `/project context` outputs < 2000 tokens of project context

---

### 2.2 Release Automation

**Effort**: 2-3 days | **Depends on**: 1.1 (CI pipeline)

**What to build**:
- `scripts/generate-release-notes.js` — builds notes from conventional commits
- `scripts/validate-version-match.js` — ensures tag matches plugin.json
- `.github/workflows/release-enhanced.yml` — tag push → validate → release → trigger MCP sync

**Done when**:
- [ ] Git tag push creates GitHub release with auto-generated notes
- [ ] Version mismatch between tag and plugin.json is caught and blocked
- [ ] MCP sync dispatch is triggered (creates PR in pm-skills-mcp)

---

### 2.3 MCP Sync Automation

**Effort**: 2-3 days | **Depends on**: 2.2 (release workflow)

**What to build**: Repository dispatch from pm-skills release workflow to pm-skills-mcp, which auto-runs `embed-skills.js`, tests, and opens a sync PR.

**Done when**:
- [ ] pm-skills release triggers auto-sync PR in pm-skills-mcp
- [ ] Sync PR passes pm-skills-mcp CI
- [ ] Manual merge remains required (human gate)

---

### 2.4 SessionStart Hook

**Effort**: 1-2 days | **Depends on**: 2.1 (project manager creates the context to load)

**What to build**: `hooks/session-start.js` — reads `.pm-config.yaml`, loads active project's PROJECT.md, presents brief status.

**Done when**:
- [ ] Opening Claude Code with an active project shows project name + phase + artifact count
- [ ] No active project = silent (no noise)

---

### 2.5 Quick Win: Acceptance Criteria Skill

**Effort**: 2-3 days | **Depends on**: Nothing

New domain skill: `deliver-acceptance-criteria`. Extends user-stories with detailed Given/When/Then acceptance criteria. Quick community-visible win.

---

## Phase 3: Document Evolution (v2.9)

**Theme**: Intelligent document management and PM-oriented skill design.
**Total effort**: ~11-17 days | **Dependencies**: Phase 2 for project workspace

### 3.1 Doc Updater Skill + Command

**Effort**: 3-5 days | **Depends on**: 2.1 (project manager provides artifact context)

**What to build**: `/update-doc` command that intelligently merges new information into an existing artifact while preserving structure and creating version history.

**Key behavior**:
- Read current artifact + new info source (conversation, file, or transcript)
- Integrate at appropriate locations (section-aware merge)
- Save as new version (`prd_v2.md`), preserve old version
- Log change in `.history/` with provenance

**Done when**:
- [ ] `/update-doc prd` creates versioned update of active project's PRD
- [ ] Original version preserved
- [ ] Change log records what changed and why

---

### 3.2 Link-Docs Command

**Effort**: 2-3 days | **Depends on**: 2.1

**What to build**: `/link-docs` command that creates typed relationships between artifacts in `links.yaml`. Types: informs, validates, decomposes, constrains, supersedes.

**Done when**:
- [ ] `/link-docs problem-statement hypothesis --type informs` creates link
- [ ] `/project status` shows dependency graph
- [ ] Stale documents flagged when upstream docs are newer

---

### 3.3 Foundation Skill Builder

**Effort**: 3-5 days | **Depends on**: 1.2 (pm-skill-builder proves the pattern)

**What to build**: `/skill-builder` as a foundation skill — PM-oriented skill design for any context (not repo-specific). Produces a Skill Design Brief, not an implementation packet.

**Done when**:
- [ ] `/skill-builder` helps PMs design skills for personal libraries, team repos, etc.
- [ ] Handoff to `/pm-skill-builder` works when the skill is for pm-skills repo

---

### 3.4 PostToolUse Hook + Output Style

**Effort**: 2-3 days combined

- `hooks/post-skill-save.js` — auto-saves artifacts to active project directory
- `styles/pm-executive.md` — concise, decision-focused output formatting

---

## Phase 4: Full Platform (v3.0)

**Theme**: New domain skills, automation agents, and quality at scale.
**Total effort**: ~22-36 days | **Dependencies**: Phases 1-3

### 4.1 New Domain Skills (can be built in parallel)

| Skill | Phase | Effort |
|-------|-------|--------|
| `discover-market-sizing` | Discover | 3-5 days |
| `measure-survey-analysis` | Measure | 3-5 days |
| `define-value-proposition` | Define | 3-5 days |

### 4.2 Transcript Processing Agent

**Effort**: 3-5 days | **Depends on**: 2.1 + 3.1

Sub-agent that processes meeting transcripts, extracts PM-relevant insights, maps them to existing project artifacts, and produces an Insight Report with suggested updates.

### 4.3 Convention Alignment Pass

**Effort**: 3-5 days | **Depends on**: 1.2 (use `/skill-builder audit` mode)

Audit all 25+ skills against current conventions. Fix frontmatter gaps, add guidance comments to templates, tighten descriptions, add output contracts where missing.

### 4.4 Codex Task Templates + Cross-Platform Testing

**Effort**: 3-5 days combined

- Codex task template for autonomous skill creation from a Skill Implementation Packet
- Test skill loading on Claude Code, Codex, and Gemini CLI (minimum 3 platforms)

---

## Parallel Track Map

These tracks can run simultaneously:

```
Track A (Infrastructure):  CI Pipeline → Release Automation → MCP Sync
Track B (Utility Skills):  Project Manager → Doc Updater → Transcript Agent
Track C (Builder):         pm-skill-builder → foundation-skill-builder → convention pass
Track D (Platform):        Hooks → Output Styles → Cross-platform testing
Track E (Domain Skills):   acceptance-criteria → market-sizing → survey-analysis
```

Tracks A-E are independent. Within each track, items are sequential.

---

## Decision Checklist

Before starting each phase, resolve these:

### Before Phase 1
- [ ] Confirm naming: `utility-pm-skill-builder` for the directory?
- [ ] Confirm `/skill-builder` as the slash command name?

### Before Phase 2
- [ ] Workspace location: `~/pm-projects/` or configurable?
- [ ] Context injection: command preamble (no skill changes) or modify skills?
- [ ] MCP sync: automated dispatch (needs PAT secret) or manual?

### Before Phase 3
- [ ] Two builder skills confirmed? (`/pm-skill-builder` + `/skill-builder`)
- [ ] Doc updater: skill + command, or command-only?

### Before Phase 4
- [ ] PM delivery model (phase gates): build formally or let it emerge?
- [ ] Separate pm-workspace repo: yes or no?
- [ ] Enterprise features: build or defer indefinitely?
