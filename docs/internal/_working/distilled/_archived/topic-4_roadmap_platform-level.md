# Topic 4B — Roadmap: PM-Skills Platform & Ecosystem

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — platform-level roadmap
> **Scope**: pm-skills and pm-skills-mcp as a whole (beyond individual skills)
> **Companion**: `topic-4_roadmap_individual-skills.md`

---

## Table of Contents

1. [Strategic Context](#1-strategic-context)
2. [Platform Capability Roadmap](#2-platform-capability-roadmap)
3. [Infrastructure Roadmap](#3-infrastructure-roadmap)
4. [Ecosystem Roadmap](#4-ecosystem-roadmap)
5. [Cross-Platform Roadmap](#5-cross-platform-roadmap)
6. [Prioritized Initiative Matrix](#6-prioritized-initiative-matrix)
7. [Release Timeline](#7-release-timeline)
8. [Dependencies & Critical Path](#8-dependencies--critical-path)

---

## 1. Strategic Context

### 1.1 Where pm-skills Sits Today

pm-skills is the **most comprehensive open-source PM skill library for AI agents** — 25 skills, 26 commands, 3 bundles, covering the full Triple Diamond lifecycle. It's published as a Claude Code plugin, an npm MCP server, and a plain Git repo compatible with agentskills.io.

But it's still primarily a **content library** — a collection of prompts with structure. The platform capabilities (hooks, agents, output styles, project management, automation) are largely untapped.

### 1.2 Strategic Vision

**Short-term (v2.7-v2.9)**: Transform from content library to **interactive PM workspace** — add project management, document evolution, and skill building.

**Medium-term (v3.0-v3.x)**: Become an **automated PM delivery platform** — hooks for context loading, agents for research and review, output styles for different audiences.

**Long-term (v4.0+)**: Enable a **community PM skill ecosystem** — community contributions, marketplace presence, cross-platform portability as a distribution advantage.

### 1.3 Competitive Position

| Competitor/Analog | Strength | pm-skills Advantage |
|-------------------|----------|-------------------|
| GSD Framework | Deep automation, state management | PM domain expertise, 25 curated skills |
| Notion AI PM templates | Large user base, GUI | AI-native workflow, cross-platform |
| ProductPlan/Aha! AI features | Enterprise features | Open source, extensible, no vendor lock-in |
| Generic Claude/ChatGPT prompts | Easy to start | Structured templates, quality consistency |
| Custom corporate skill libraries | Company-specific | Open standard, community-maintained |

---

## 2. Platform Capability Roadmap

### 2.1 Capability Maturity Model

```
Level 1: Content Library (Current — v2.6)
├── Skills (25 PM skills with templates + examples)
├── Commands (26 slash commands)
├── Bundles (3 workflow chains)
└── Plugin packaging (M-11 complete)

Level 2: Interactive Workspace (Target — v2.7-v2.9)
├── Project management (/project new/switch/status)
├── Document evolution (/update-doc, versioning)
├── Document linking (/link-docs, dependency graph)
├── Skill building (/pm-skill-builder)
├── CI validation pipeline
└── Release automation

Level 3: Automated PM Platform (Target — v3.0-v3.x)
├── Hooks (SessionStart, PostToolUse, Stop)
├── Sub-agents (research, review, transcript processing)
├── Output styles (executive, detailed, sprint)
├── Smart context loading (project-aware skill invocation)
├── PM delivery model (phase gates, coverage scoring)
└── Auto-save artifacts

Level 4: Community Ecosystem (Target — v4.0+)
├── Community skill contributions (issue templates, review workflow)
├── Anthropic marketplace presence
├── Codex autonomous skill creation
├── Cross-platform testing (6+ platforms)
├── Skill analytics (usage, quality metrics)
└── Enterprise features (teams, roles, compliance)
```

### 2.2 Capability Value Map

| Capability | PM Value | Technical Effort | Revenue Potential | Community Impact |
|-----------|----------|-----------------|-------------------|-----------------|
| Project management | ⭐⭐⭐⭐⭐ | ⭐⭐ | Low | Medium |
| CI validation | ⭐⭐⭐ | ⭐⭐ | None | ⭐⭐⭐⭐⭐ |
| Document evolution | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Low | Medium |
| Skill builder | ⭐⭐⭐⭐ | ⭐⭐⭐ | None | ⭐⭐⭐⭐⭐ |
| Hooks | ⭐⭐⭐⭐ | ⭐⭐ | Low | Low |
| Sub-agents | ⭐⭐⭐ | ⭐⭐⭐ | Low | Medium |
| Output styles | ⭐⭐⭐ | ⭐ | Low | Low |
| Marketplace presence | ⭐⭐ | ⭐⭐ | Medium | ⭐⭐⭐⭐⭐ |
| Enterprise features | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium |

---

## 3. Infrastructure Roadmap

### 3.1 CI/CD Pipeline Evolution

```
Current CI:
├── validation.yml (CONTEXT.md currency)
└── validate-mcp-sync.yml (cross-repo parity)

Phase 1 CI (v2.7):
├── validate-skills.yml (frontmatter, completeness, naming, AGENTS.md)
├── validation.yml (existing)
└── validate-mcp-sync.yml (existing)

Phase 2 CI (v2.8):
├── validate-skills.yml (enhanced)
├── release.yml (tag → release → release notes)
├── sync-mcp.yml (automated MCP sync on release)
├── validation.yml (existing)
└── validate-mcp-sync.yml (existing)

Phase 3 CI (v3.0):
├── validate-skills.yml (enhanced)
├── release.yml (enhanced)
├── sync-mcp.yml (automated)
├── community-review.yml (auto-label, auto-checklist for community PRs)
├── sample-library.yml (auto-generate sample outputs)
├── quality-dashboard.yml (weekly quality report)
├── validation.yml (existing)
└── validate-mcp-sync.yml (existing)
```

### 3.2 Script Infrastructure

| Script | Status | Priority |
|--------|--------|----------|
| `lint-skills-frontmatter.ps1` | ✅ Exists | N/A |
| `validate-commands.ps1` | ✅ Exists | N/A |
| `check-context-currency.ps1` | ✅ Exists | N/A |
| `validate-frontmatter.js` | ❌ Needed | P1 (v2.7) |
| `validate-completeness.js` | ❌ Needed | P1 (v2.7) |
| `validate-naming.js` | ❌ Needed | P1 (v2.7) |
| `validate-agents-md.js` | ❌ Needed | P1 (v2.7) |
| `check-mcp-impact.js` | ❌ Needed | P1 (v2.7) |
| `generate-release-notes.js` | ❌ Needed | P2 (v2.8) |
| `validate-version-match.js` | ❌ Needed | P2 (v2.8) |
| `update-sample-library.js` | ❌ Needed | P3 (v3.0) |

### 3.3 pm-skills-mcp Evolution

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| 25 `pm_*` tools | ✅ Exists | N/A | |
| Skill resources | ✅ Exists | N/A | |
| Workflow prompts | ✅ Exists | N/A | |
| Automated sync on release | ❌ Needed | P2 | Repository dispatch workflow |
| Project management tools | ❌ Planned | P3 | `pm_project_list/status/create` |
| Dashboard resources | ❌ Planned | P3 | `pm-skills://dashboard` |
| New skill tools (as library grows) | ❌ Ongoing | P2+ | Each new skill = new MCP tool |

---

## 4. Ecosystem Roadmap

### 4.1 Distribution Channel Maturity

```
Current Distribution:
├── GitHub repo (git clone)        ███████████ Complete
├── GitHub releases (ZIP)          ███████████ Complete
├── npm (pm-skills-mcp)            ███████████ Complete
├── Claude Code plugin             ██████████░ v2.6 (needs hooks/agents)
├── Anthropic marketplace          █░░░░░░░░░░ Not submitted
├── agentskills.io registry        █░░░░░░░░░░ Listed but not promoted
└── Other platform registries      ░░░░░░░░░░░ Not started

Target Distribution (v3.0):
├── GitHub repo                    ███████████ Complete
├── GitHub releases                ███████████ Complete
├── npm (pm-skills-mcp)            ███████████ Auto-synced
├── Claude Code plugin             ███████████ Full (hooks, agents, styles)
├── Anthropic marketplace          ███████████ Listed and maintained
├── agentskills.io registry        █████████░░ Featured
├── VS Code marketplace            █████░░░░░░ Listed as extension
└── Community directories          ██████░░░░░ awesome-claude-skills, etc.
```

### 4.2 Community Growth Model

```
Phase 1: Maintainer-Driven (Current)
├── 1-2 maintainers create all skills
├── No external contributions
└── Quality ensured by maintainer judgment

Phase 2: Guided Contributions (v2.7-v2.8)
├── CI validates conventions
├── Skill proposal issue template
├── pm-skill-builder guides contributors
├── Maintainer review for quality
└── 5-10 community contributors

Phase 3: Community Ecosystem (v3.0+)
├── Full CI pipeline catches convention issues
├── Codex can draft skills from proposals
├── Community reviewers (not just maintainers)
├── Skill quality metrics and badges
├── Regular community calls or discussions
└── 20-50 community contributors
```

### 4.3 Quality Assurance Evolution

| Level | Mechanism | When |
|-------|-----------|------|
| 1 | Manual maintainer review | Current |
| 2 | CI frontmatter + completeness validation | v2.7 |
| 3 | CI naming + AGENTS.md consistency | v2.7 |
| 4 | Automated sample output generation | v3.0 |
| 5 | Quality scoring agent (reviews skill content) | v3.x |
| 6 | Community skill ratings | v4.0 |

---

## 5. Cross-Platform Roadmap

### 5.1 Platform Support Matrix (Current → Target)

| Platform | Current | v2.8 Target | v3.0 Target | Notes |
|----------|---------|-------------|-------------|-------|
| **Claude Code CLI** | ✅ Full (skills, commands, plugin) | ✅ Full + hooks | ✅ Full + agents, styles | Primary platform |
| **Claude Desktop** | ⚠️ ZIP upload only | ⚠️ Same | ⚠️ Same | Limited by platform |
| **VS Code + Copilot** | ✅ AGENTS.md discovery | ✅ Skills via workspace | ✅ Skills + MCP | Growing support |
| **OpenAI Codex** | ✅ Skills load | ✅ Skills + autonomous | ✅ Skills + task templates | Codex skill creation |
| **Gemini CLI** | ✅ Skills load | ✅ Skills + .gemini/skills/ | ✅ Skills | Full agentskills.io |
| **Cursor** | ⚠️ Nightly only | ✅ Skills load | ✅ Skills + MCP | Expanding support |
| **GitHub Copilot CLI** | ✅ Skills load | ✅ Skills | ✅ Skills | New platform |

### 5.2 Cross-Platform Testing Strategy

| Phase | Scope | Effort |
|-------|-------|--------|
| Manual | Test skill loading on 3 platforms (Claude Code, Codex, Gemini CLI) | 1 day |
| Systematic | Test all skills on 3 platforms, document gaps | 3 days |
| Comprehensive | Test all skills on all 6 platforms, automated where possible | 1 week |

---

## 6. Prioritized Initiative Matrix

### 6.1 All Initiatives Ranked

| Rank | Initiative | Type | Impact | Effort | Dependencies |
|------|-----------|------|--------|--------|-------------|
| 1 | CI validation pipeline | Infrastructure | Very High | Low | None |
| 2 | `utility-pm-skill-builder` | Skill | Very High | Medium | CI pipeline |
| 3 | `utility-project-manager` | Skill | Very High | Medium | None |
| 4 | Release automation | Infrastructure | High | Medium | CI pipeline |
| 5 | `utility-doc-updater` | Skill | Very High | High | project-manager |
| 6 | SessionStart hook | Platform | High | Low | Plugin manifest |
| 7 | PostToolUse hook | Platform | High | Medium | Plugin manifest |
| 8 | MCP sync automation | Infrastructure | High | High | Release automation |
| 9 | `foundation-skill-builder` | Skill | High | Medium | pm-skill-builder |
| 10 | `pm-executive` output style | Platform | Medium | Low | Plugin manifest |
| 11 | `deliver-acceptance-criteria` | Skill | Medium | Low | None |
| 12 | `discover-market-sizing` | Skill | Medium | Medium | None |
| 13 | Transcript processing agent | Platform | Medium | High | project-manager |
| 14 | Artifact review agent | Platform | Medium | Medium | None |
| 15 | Community issue template | Ecosystem | Medium | Low | CI pipeline |
| 16 | Codex task templates | Ecosystem | Medium | Medium | pm-skill-builder |
| 17 | `measure-survey-analysis` | Skill | Medium | Medium | None |
| 18 | Convention alignment pass | Quality | Medium | Medium | pm-skill-builder |
| 19 | Anthropic marketplace submission | Ecosystem | Medium | Low | Plugin stability |
| 20 | Sprint-planning bundle | Content | Low | Low | None |
| 21 | `define-value-proposition` | Skill | Medium | Medium | None |
| 22 | Cross-platform testing | Quality | Medium | High | Skills stable |
| 23 | Skill analytics | Ecosystem | Low | High | Community usage |
| 24 | Enterprise features | Platform | Low (now) | Very High | Community scale |

### 6.2 Critical Path

```
CI Pipeline ──→ pm-skill-builder ──→ Convention alignment pass
     │                                        │
     └──→ Release automation ──→ MCP sync automation
     │
     └──→ Community issue template ──→ Codex task templates

Project Manager ──→ Doc Updater ──→ Transcript Processing

Plugin manifest ──→ SessionStart hook ──→ Smart context loading
        │
        └──→ PostToolUse hook ──→ Auto-save artifacts
        │
        └──→ Output styles
```

**The CI pipeline is the critical-path enabler.** Everything downstream — skill building, community contributions, release automation — depends on it.

---

## 7. Release Timeline

### v2.7 — Quality Foundation (Next Release)

**Theme**: Build the foundation for quality and contribution

| Deliverable | Type | Effort |
|------------|------|--------|
| CI validation pipeline (5 new scripts + workflow) | Infrastructure | 2-3 days |
| `utility-pm-skill-builder` skill | Skill | 3-5 days |
| Community skill proposal issue template | Ecosystem | 0.5 day |
| Anthropic marketplace submission | Ecosystem | 0.5 day |

**Total effort**: ~7-10 days

### v2.8 — Project Workspace

**Theme**: Multi-project support and document lifecycle

| Deliverable | Type | Effort |
|------------|------|--------|
| `utility-project-manager` skill + `/project` command | Skill | 3-5 days |
| Release automation workflow | Infrastructure | 2-3 days |
| MCP sync automation | Infrastructure | 2-3 days |
| `deliver-acceptance-criteria` skill | Skill | 2-3 days |
| SessionStart hook (load project context) | Platform | 1-2 days |

**Total effort**: ~10-16 days

### v2.9 — Document Evolution

**Theme**: Intelligent document management

| Deliverable | Type | Effort |
|------------|------|--------|
| `utility-doc-updater` skill + `/update-doc` command | Skill | 3-5 days |
| `/link-docs` command + dependency graph | Feature | 2-3 days |
| `foundation-skill-builder` skill | Skill | 3-5 days |
| PostToolUse hook (auto-save artifacts) | Platform | 2-3 days |
| `pm-executive` output style | Platform | 1 day |

**Total effort**: ~11-17 days

### v3.0 — PM Delivery Platform

**Theme**: Full automation and new domain skills

| Deliverable | Type | Effort |
|------------|------|--------|
| `discover-market-sizing` skill | Skill | 3-5 days |
| `measure-survey-analysis` skill | Skill | 3-5 days |
| Transcript processing agent | Platform | 3-5 days |
| Artifact review agent | Platform | 2-3 days |
| Convention alignment pass (all 25+ skills) | Quality | 3-5 days |
| Codex task templates | Ecosystem | 2-3 days |
| Cross-platform testing | Quality | 3-5 days |
| PM delivery model (phase gates, coverage scoring) | Platform | 3-5 days |

**Total effort**: ~22-36 days

---

## 8. Dependencies & Critical Path

### 8.1 Dependency Graph

```
Independent (can start anytime):
├── utility-project-manager
├── deliver-acceptance-criteria
├── discover-market-sizing
├── measure-survey-analysis
├── define-value-proposition
├── pm-executive output style
└── sprint-planning bundle

Sequential (must follow order):
CI Pipeline
  └──→ pm-skill-builder
        └──→ foundation-skill-builder
        └──→ convention alignment pass
  └──→ release automation
        └──→ MCP sync automation
  └──→ community issue template
        └──→ Codex task templates

Dependent (needs prior work):
project-manager
  └──→ doc-updater
        └──→ link-docs
              └──→ transcript processing
```

### 8.2 Recommended Parallel Tracks

**Track A: Infrastructure** (CI → Release → MCP Sync)
**Track B: Utility Skills** (project-manager → doc-updater → transcript processing)
**Track C: Domain Skills** (acceptance-criteria, market-sizing, survey-analysis)
**Track D: Platform** (hooks → agents → output styles)

Tracks A-D can run in parallel, with Track A informing Track B (CI validates new skills) and Track D informing Track B (hooks enhance project management).

### 8.3 Decision Points

| When | Decision | Impact |
|------|----------|--------|
| Before v2.7 | Confirm two-skill approach (pm-skill-builder + skill-builder) | Scope of v2.7 + v2.9 |
| Before v2.8 | Workspace location (~/pm-projects/ vs configurable) | Project manager design |
| Before v2.8 | Whether to modify existing skills for project awareness | Scope of v2.8 |
| Before v2.9 | Whether doc-updater is a skill or command-only | Architecture of doc evolution |
| Before v3.0 | Whether to build PM delivery model (phase gates) | Scope and identity of pm-skills |
| Before v3.0 | Enterprise features: build or defer? | Resource allocation |
| Before v3.0 | Separate pm-workspace repo: yes or no? | Multi-project architecture |
