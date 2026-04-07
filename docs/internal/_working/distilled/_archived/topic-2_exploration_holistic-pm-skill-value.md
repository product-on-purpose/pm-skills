# Topic 2 — Exploration: Holistic PM-Skill Value Expansion

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — exploration document
> **Scope**: How pm-skills can leverage full Claude Code capabilities and compare across platforms

---

## Table of Contents

1. [Summary](#1-summary)
2. [Problem Deep-Dive](#2-problem-deep-dive)
3. [Claude Code Component Capabilities](#3-claude-code-component-capabilities)
4. [Platform Comparison Matrix](#4-platform-comparison-matrix)
5. [Approaches & Tradeoffs](#5-approaches--tradeoffs)
6. [Toward a PM Delivery Model](#6-toward-a-pm-delivery-model)
7. [Recommendations & 80/20 Value](#7-recommendations--8020-value)
8. [Questions for Clarification](#8-questions-for-clarification)
9. [Creative Ideas](#9-creative-ideas)
10. [Assumptions](#10-assumptions)
11. [Feasibility](#11-feasibility)
12. [Cautions & Gotchas](#12-cautions--gotchas)
13. [What You Might Be Missing](#13-what-you-might-be-missing)
14. [Value Evaluation](#14-value-evaluation)
15. [Next Steps](#15-next-steps)
16. [Sources](#16-sources)

---

## 1. Summary

pm-skills currently uses **one component type** of the Claude Code extensibility system: **skills** (with associated **commands**). But Claude Code's plugin architecture offers at least **eight distinct component types** that could dramatically expand what pm-skills delivers. This document explores each component, how it could enhance PM workflows, and how the expanded capabilities compare across AI coding platforms.

The key insight: **pm-skills is positioned at a unique intersection** — it's a domain-specific skill library (PM/UX) built on a universal skill specification (agentskills.io) that runs on the most extensible AI coding platform (Claude Code). No other PM tool has this combination. The opportunity is to leverage the full platform without losing the cross-platform portability that makes pm-skills valuable.

---

## 2. Problem Deep-Dive

### 2.1 Current Utilization Gap

pm-skills today uses:
- **Skills** (25 SKILL.md files) — the core PM content
- **Commands** (26 command files) — slash command shortcuts
- **Bundles** (3 workflow chains) — multi-skill sequences

pm-skills does NOT use:
- **Hooks** — event-driven automation (auto-validate, auto-save, auto-link)
- **Agents** (sub-agents) — autonomous multi-step workflows
- **Output Styles** — custom rendering for PM artifacts
- **MCP Servers** — direct integration (exists in pm-skills-mcp but not in plugin)
- **Plugin Manifest** — full plugin packaging (partially done in v2.6.0)
- **Agent Teams** — coordinated multi-agent workflows
- **Memory/Context** — persistent project state

### 2.2 The Platform Evolution Context

Since pm-skills was first created, the AI landscape has shifted significantly:

1. **agentskills.io became an open standard** (Dec 2025) — adopted by 26+ platforms
2. **Claude Code added plugins** — full component model with hooks, agents, MCP
3. **Agent Teams launched** (Feb 2026) — multi-agent coordination
4. **OpenAI Codex** gained autonomous task execution in sandboxed environments
5. **Gemini CLI** adopted the agentskills.io standard with native skill support
6. **Cursor** added experimental agent skills support
7. **GitHub Copilot** added AGENTS.md, custom agents, and skills support

This means pm-skills' competitive advantage has shifted from "the only AI PM toolkit" to "the most comprehensive AI PM toolkit that works across platforms." The expansion question is: how to deepen the Claude Code experience while maintaining cross-platform portability.

---

## 3. Claude Code Component Capabilities

### 3.1 Skills (Currently Used)

**What they are**: Markdown files with frontmatter that provide domain-specific instructions. Loaded lazily when Claude determines they're relevant.

**Current pm-skills usage**: 25 skills across 6 phases + 1 foundation. Each follows the 3-file pattern (SKILL.md + TEMPLATE.md + EXAMPLE.md).

**Expansion opportunities**:
- More granular skill triggering via improved descriptions
- Foundation and utility skills for workflow automation
- Meta-skills (skill-builder, project-manager)
- Reference-heavy skills with multiple supporting files

### 3.2 Commands (Currently Used)

**What they are**: Markdown files that define slash commands for user invocation. Simpler than skills — they're direct instruction sets.

**Current pm-skills usage**: 26 commands, one per skill plus `/kickoff`.

**Expansion opportunities**:
- Workflow commands (`/project`, `/update-doc`, `/link-docs`)
- Utility commands (`/pm-status`, `/pm-help`)
- Arguments and sub-commands (`/project new <name>`)

### 3.3 Hooks (NOT Currently Used)

**What they are**: Event handlers that fire at specific lifecycle points in Claude Code. Configured in plugin.json, they run scripts or commands deterministically.

**Available hook events**:
| Event | When It Fires | PM Use Case |
|-------|--------------|-------------|
| `PreToolUse` | Before a tool executes | Validate artifact naming before write |
| `PostToolUse` | After a tool executes | Auto-save artifact to project directory |
| `Stop` | When Claude stops generating | Generate session summary |
| `SessionStart` | When a session begins | Load active project context |
| `SessionEnd` | When a session ends | Save session artifacts |
| `UserPromptSubmit` | When user sends a message | Detect project-related intent |
| `SubagentStop` | When a subagent completes | Aggregate subagent outputs |
| `PreCompact` | Before context compression | Preserve project state |

**Highest-value PM hooks**:

1. **SessionStart → Load Project Context**: When a PM opens Claude Code, automatically detect and load the active project's context. No need for `/project switch` every time.

2. **PostToolUse (Write) → Auto-Save Artifact**: When a skill writes an artifact, automatically copy it to the active project's directory. Solves the "where did my PRD go?" problem.

3. **Stop → Session Summary**: When a session ends, generate a brief log of what was created/updated and save it to the project's `.history/` directory.

### 3.4 Sub-Agents (NOT Currently Used)

**What they are**: Autonomous Claude instances spawned by the main agent to handle specific tasks. Each gets a fresh context window.

**PM use cases**:

| Agent | Purpose | Trigger |
|-------|---------|---------|
| `research-agent` | Conduct competitive analysis using web search | `/competitive-analysis` with auto-research |
| `review-agent` | Review a PRD for completeness and consistency | `/review-prd` or automatic post-PRD |
| `decompose-agent` | Break a PRD into user stories autonomously | `/user-stories --from-prd` |
| `transcript-agent` | Process meeting transcripts and extract insights | `/process-transcript` |
| `audit-agent` | Check all project artifacts for consistency | `/project audit` |

**Key advantage**: Sub-agents get fresh 200K-token contexts. A transcript processing agent can load the entire transcript without competing for context with the PM's active conversation.

### 3.5 Output Styles (NOT Currently Used)

**What they are**: Custom rendering styles defined in the plugin that change how Claude formats its output.

**PM use cases**:

| Style | Purpose | When Active |
|-------|---------|-------------|
| `pm-executive` | Concise, decision-focused output | Stakeholder-facing artifacts |
| `pm-detailed` | Comprehensive, evidence-rich output | Discovery and analysis artifacts |
| `pm-sprint` | Action-oriented, story-format output | Delivery phase artifacts |
| `pm-review` | Comparison and evaluation format | Review and iteration artifacts |

**Example**: A `pm-executive` output style would instruct Claude to lead with decisions and recommendations, use bullet points over paragraphs, include one-line summaries before sections, and limit output to 2 pages equivalent.

### 3.6 MCP Servers (Exists Separately in pm-skills-mcp)

**What they are**: Model Context Protocol servers that expose tools, resources, and prompts to Claude.

**Current state**: pm-skills-mcp exists as a separate npm package with 25 `pm_*` tools and skill resources.

**Expansion**: The plugin could bundle a lightweight MCP server that provides:
- Project management tools (`pm_project_list`, `pm_project_status`)
- Artifact retrieval (`pm_get_artifact`)
- Cross-platform skill invocation

### 3.7 Agent Teams (NOT Currently Used, Advanced)

**What they are**: Multiple independent Claude sessions that coordinate, message each other, and divide work in parallel. Launched February 2026.

**PM use cases** (advanced, Phase 3+):
- **Parallel Discovery**: One agent synthesizes interviews while another conducts competitive analysis
- **PRD Review Panel**: Three agents review a PRD from engineering, design, and business perspectives simultaneously
- **Sprint Planning**: One agent breaks down stories while another estimates complexity

### 3.8 Plugin Manifest (Partially Implemented)

**Current state**: `.claude-plugin/plugin.json` exists (shipped in v2.6.0) with skills and commands registered.

**Expansion needed**: Add hooks, agents, output styles, and MCP server registration to the plugin manifest.

---

## 4. Platform Comparison Matrix

### 4.1 Platform Capabilities

| Capability | Claude Code CLI | Claude Desktop | VS Code (Copilot) | Codex | Gemini CLI | Cursor |
|-----------|----------------|---------------|-------------------|-------|-----------|--------|
| **Skills (agentskills.io)** | ✅ Native | ⚠️ Via project files | ✅ Native | ✅ Native | ✅ Native | ✅ Nightly |
| **Custom commands** | ✅ Full | ❌ | ⚠️ Limited | ❌ | ❌ | ⚠️ Limited |
| **Hooks/events** | ✅ Full lifecycle | ❌ | ⚠️ Preview | ❌ | ❌ | ❌ |
| **Sub-agents** | ✅ Full | ❌ | ✅ | ✅ Cloud | ✅ | ✅ |
| **Agent teams** | ✅ Native | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Output styles** | ✅ Plugin-defined | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MCP integration** | ✅ Full | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Plugin system** | ✅ Full (9000+) | ❌ | ✅ Extensions | ❌ | ❌ | ❌ |
| **Persistent memory** | ✅ File-based | ❌ | ⚠️ Limited | ❌ | ❌ | ❌ |
| **Autonomous execution** | ✅ Full auto mode | ❌ | ✅ | ✅ Sandboxed | ✅ | ✅ |
| **Context window** | 200K | 200K | Varies | 200K | Varies | Varies |

### 4.2 pm-skills Compatibility by Platform

| Platform | Skills Load? | Commands Work? | Hooks Work? | Agents Work? | Best Use Case |
|----------|-------------|---------------|-------------|--------------|---------------|
| **Claude Code CLI** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | Primary: full PM workflow |
| **Claude Desktop** | ⚠️ Via upload | ❌ | ❌ | ❌ | Reference: read skills manually |
| **VS Code (Copilot)** | ✅ Via AGENTS.md | ⚠️ Partial | ⚠️ Preview | ✅ | Secondary: in-IDE PM work |
| **Codex** | ✅ Via agent-skills | ❌ | ❌ | ✅ Cloud | Batch: autonomous artifact generation |
| **Gemini CLI** | ✅ Via .gemini/skills/ | ❌ | ❌ | ✅ | Portable: cross-platform PM work |
| **Cursor** | ✅ Nightly | ⚠️ Partial | ❌ | ✅ | Portable: cross-platform PM work |

### 4.3 Competitive Landscape Analysis

| Dimension | pm-skills Advantage | pm-skills Gap |
|-----------|-------------------|---------------|
| **Breadth of skills** | 25 curated PM skills — most comprehensive | No UX-specific skills yet |
| **Workflow chains** | 3 bundles (kickoff, triple-diamond, lean-startup) | No automated workflow execution |
| **Cross-platform** | Works on 6+ platforms via agentskills.io | Platform-specific features lost |
| **Template quality** | Every skill has TEMPLATE.md + EXAMPLE.md | No variant templates per context |
| **Community** | Open source, Apache 2.0 | Small community, no marketplace presence |
| **Automation** | None currently | GSD has hooks, state management, auto-verification |
| **Multi-project** | None currently | GSD has project-level state |

**Key finding**: pm-skills has the broadest PM skill coverage but the shallowest platform integration. GSD has the deepest platform integration but zero PM domain knowledge. The opportunity is to combine pm-skills' PM depth with GSD-level platform integration.

---

## 5. Approaches & Tradeoffs

### Approach A: Deep Claude Code Integration (Platform-First)

Maximize Claude Code-specific features: hooks, agents, output styles, agent teams. Accept that some capabilities won't work on other platforms.

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Richest possible PM experience | Platform lock-in on advanced features |
| Hooks enable true automation | Divergence from cross-platform portability |
| Agent teams enable parallel PM workflows | Higher maintenance burden |
| Output styles create polished artifacts | Features unused on Codex, Gemini, Cursor |

### Approach B: Layered Architecture (Cross-Platform Core + Platform Extensions)

Keep skills and commands as the cross-platform core. Add Claude Code-specific capabilities as an optional enhancement layer.

```
Layer 1 (Universal): skills/ + commands/ + _bundles/
  → Works everywhere agentskills.io is supported

Layer 2 (Claude Code): hooks/ + agents/ + styles/
  → Works only in Claude Code CLI

Layer 3 (MCP): pm-skills-mcp
  → Works anywhere MCP is supported
```

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Best experience on Claude Code, good experience everywhere | Two layers to maintain |
| Graceful degradation on other platforms | Must define clear boundaries |
| Early adopters get hooks + agents, everyone gets skills | May be confusing which features work where |
| Future-proof as platforms add capabilities | Testing matrix grows |

### Approach C: PM Delivery Platform (Build a Full Framework)

Go beyond skills and build a complete PM delivery framework — like GSD but for PM work. Include project management, workflow orchestration, team collaboration, and CI/CD for PM artifacts.

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Unique market position | Massive scope increase |
| Could become the "GSD for PMs" | Risk of over-engineering |
| Attracts enterprise users | Requires dedicated team |
| Revenue potential (premium features) | Diverges from open-source identity |

---

## 6. Toward a PM Delivery Model

### 6.1 What a PM Delivery Model Looks Like

GSD created a "spec-driven development" model for engineering. An analogous "artifact-driven delivery" model for PM would include:

```
PM Delivery Model (artifact-driven)

Phase 1: DISCOVER
  Input:  Market signals, user feedback, stakeholder requests
  Process: research → interview → synthesize → compete
  Output: Stakeholder Summary, Interview Synthesis, Competitive Analysis
  Gate:   Problem space understood, opportunity identified

Phase 2: DEFINE
  Input:  Discovery outputs
  Process: frame → hypothesize → map-opportunities → canvas
  Output: Problem Statement, Hypothesis, Opportunity Tree, JTBD Canvas
  Gate:   Problem validated, hypothesis testable

Phase 3: DEVELOP
  Input:  Definition outputs
  Process: specify → design → decide → spike
  Output: PRD, Solution Brief, Design Rationale, ADR, Spike Summary
  Gate:   Solution specified, architecture decided

Phase 4: DELIVER
  Input:  Development outputs
  Process: decompose → edge-case → checklist
  Output: User Stories, Edge Cases, Launch Checklist
  Gate:   Sprint-ready backlog, launch criteria defined

Phase 5: MEASURE
  Input:  Launched feature
  Process: instrument → experiment → analyze
  Output: Instrumentation Spec, Experiment Design, Experiment Results, Dashboard Req
  Gate:   Evidence collected, hypothesis validated/invalidated

Phase 6: ITERATE
  Input:  Measurement outputs + team reflection
  Process: reflect → learn → refine → decide
  Output: Retrospective, Lessons Log, Refinement Notes, Pivot Decision
  Gate:   Learning captured, next iteration scoped
```

### 6.2 How This Differs from GSD

| Dimension | GSD | PM Delivery Model |
|-----------|-----|------------------|
| Primary audience | Software engineers | Product managers |
| Unit of work | Code changes | PM artifacts |
| Lifecycle | discuss → plan → execute → verify | discover → define → develop → deliver → measure → iterate |
| State management | `.planning/` | `projects/<name>/` |
| Automation | Subagent spawning for code tasks | Subagent spawning for artifact creation |
| Verification | Tests pass, code works | Artifacts complete, gates met |
| Output | Working software | PM decision documents |

### 6.3 What "Standardization" Means

Standardizing pm-skills into a PM delivery model would mean:
1. **Defined phase gates** — clear criteria for when each phase is "done"
2. **Prescribed artifact flow** — which artifacts feed which downstream skills
3. **State tracking** — persistent awareness of where a project is in the lifecycle
4. **Automation** — hooks and agents that enforce the model (auto-create next artifact, flag skipped phases)
5. **Metrics** — track coverage (how many artifacts exist per phase) and velocity (time per phase)

---

## 7. Recommendations & 80/20 Value

### Primary Recommendation: Approach B (Layered Architecture)

The highest-value investment is **Approach B** — maintaining the cross-platform skill core while adding Claude Code-specific automation.

### 80/20 Implementation Priorities

| Priority | Component | Value | Effort | Platform |
|----------|-----------|-------|--------|----------|
| 1 | **SessionStart hook** — load project context | Very High | Low | Claude Code |
| 2 | **PostToolUse hook** — auto-save artifacts | Very High | Medium | Claude Code |
| 3 | **Output style: pm-executive** | High | Low | Claude Code |
| 4 | **Transcript processing agent** | High | Medium | Claude Code |
| 5 | **PRD review agent** | Medium | Medium | Claude Code |
| 6 | **Project management commands** | Very High | Medium | Cross-platform |
| 7 | **Workflow orchestration via bundles** | Medium | Low | Cross-platform |
| 8 | **Agent teams for parallel discovery** | Medium | High | Claude Code |
| 9 | **MCP project endpoints** | Medium | High | MCP-enabled platforms |

### The "Never Do" List

- Don't build a full PM delivery framework — let the model emerge from usage
- Don't sacrifice cross-platform portability for Claude Code-specific features
- Don't add hooks that silently modify user files without confirmation
- Don't build agent teams until the single-agent workflow is solid

---

## 8. Questions for Clarification

1. **Platform priority**: Is Claude Code CLI the primary platform, or is cross-platform portability equally important?
2. **Automation appetite**: How much should happen automatically (hooks) vs. explicitly (commands)?
3. **GSD relationship**: Should pm-skills integrate with GSD, compete with GSD, or ignore GSD?
4. **Enterprise ambitions**: Is there interest in enterprise features (team collaboration, access control, audit trails)?
5. **Output format**: Should pm-skills produce markdown only, or also PDF, DOCX, PPTX for stakeholder delivery?
6. **Codex use case**: What specific PM tasks would you want Codex to handle autonomously?

---

## 9. Creative Ideas

### 9.1 PM Copilot Mode

An output style + hook combination that creates a persistent PM assistant:
- SessionStart loads project context
- Every user message is analyzed for PM intent
- Relevant skills are suggested proactively
- Artifacts are auto-saved to the project
- Session ends with a summary logged to project history

### 9.2 Artifact Quality Scoring

A review agent that scores PM artifacts on:
- Completeness (all template sections filled)
- Specificity (measurable metrics, not vague goals)
- Consistency (aligns with upstream artifacts)
- Actionability (clear next steps, assigned owners)

### 9.3 PM Dashboard via MCP

An MCP resource that exposes a cross-project dashboard:
```
pm-skills://dashboard/active-projects
pm-skills://dashboard/stale-artifacts
pm-skills://dashboard/phase-coverage
```

### 9.4 "What Should I Do Next?" Command

A `/pm-next` command that analyzes the active project's state and recommends the next most valuable skill to run, based on:
- Current phase
- Existing artifacts
- Missing artifacts
- Stale artifacts
- Time since last activity

---

## 10. Assumptions

1. Claude Code CLI remains the primary platform for pm-skills power users
2. Cross-platform portability via agentskills.io is a strategic priority
3. The pm-skills plugin packaging (M-11) is the distribution foundation
4. Automation should enhance, not replace, PM judgment
5. The PM using these tools has some PM experience (not a complete beginner)

---

## 11. Feasibility

| Component | Technical Feasibility | Effort | Dependencies |
|-----------|---------------------|--------|-------------|
| Hooks (SessionStart, PostToolUse) | ✅ Straightforward | Low | Plugin manifest |
| Output styles | ✅ Simple (directory of .md files) | Low | Plugin manifest |
| Sub-agents | ✅ Proven pattern | Medium | Agent frontmatter |
| Agent teams | ⚠️ New feature, less documented | High | Agent teams API |
| MCP project endpoints | ✅ Proven in pm-skills-mcp | High | pm-skills-mcp changes |
| Workflow orchestration | ⚠️ Complex state machine | High | Project workspace |
| Cross-platform testing | ⚠️ 6 platforms to test | Very High | Platform access |

---

## 12. Cautions & Gotchas

1. **Feature bloat risk**: Adding hooks, agents, output styles, and MCP endpoints could turn pm-skills from a focused skill library into a bloated platform. Each addition must earn its place.

2. **Hook safety**: Hooks that auto-write files can surprise users. Always prefer opt-in over opt-out for automation.

3. **Agent token cost**: Each sub-agent spawns a fresh context, consuming tokens. A "PRD review panel" with 3 agents costs 3x the tokens.

4. **Platform fragmentation**: As Claude Code adds features, the gap between "pm-skills on Claude Code" and "pm-skills on Gemini CLI" widens. Document which features work where.

5. **GSD overlap**: GSD already has hooks, state management, and project lifecycle. If a PM installs both GSD and pm-skills, how do they interact? Potential for conflicts.

---

## 13. What You Might Be Missing

1. **The "PM who isn't a developer" user**: Claude Code CLI requires terminal comfort. Many PMs prefer GUI tools. Claude Desktop and web interfaces may be more important for adoption than CLI features.

2. **Compliance and audit**: Enterprise PMs may need artifact versioning for compliance (SOX, SOC2). The revision history system in Topic 1 becomes compliance infrastructure.

3. **Localization**: PM artifacts may need to support non-English languages. Skills should be language-aware.

4. **Integration with PM tools**: The real competition isn't other AI tools — it's Jira, Linear, Notion, Confluence. The highest-value integration may be exporting pm-skills artifacts to these tools.

---

## 14. Value Evaluation

### What's Actually Valuable vs. What's Cool

| Feature | Cool Factor | Actual PM Value | Verdict |
|---------|------------|----------------|---------|
| Agent teams for parallel discovery | High | Medium | Defer — fancy but rarely needed |
| Auto-save hooks | Low | Very High | Build now — solves daily pain |
| Output styles | Medium | High | Build soon — polishes deliverables |
| Transcript processing agent | High | High | Build — solves real weekly pain |
| MCP dashboard | High | Medium | Defer — nice-to-have |
| PM Copilot mode | Very High | Medium | Defer — complex, unproven |
| "/pm-next" command | Medium | High | Build — reduces decision fatigue |
| Cross-project search | Low | High | Build eventually — needed at scale |

---

## 15. Next Steps

1. **Implement Phase 1 hooks** — SessionStart (load project) + PostToolUse (auto-save)
2. **Create one output style** — `pm-executive` as proof of concept
3. **Build one sub-agent** — transcript processing as the highest-value agent
4. **Update plugin.json** — register new components
5. **Document platform compatibility** — which features work where
6. **Test on Codex and Gemini CLI** — validate cross-platform skill loading

---

## 16. Sources

### Internal Sources
- `.claude-plugin/plugin.json` — Current plugin manifest
- `_NOTES/efforts/active/M-11-claude-plugin-packaging/` — Plugin packaging effort
- `_NOTES/efforts/mcp-as-built-architecture.md` — MCP architecture reference
- `_bundles/feature-kickoff.md` — Workflow chain example
- `docs/internal/Releases_2.3-2.4_detailed-breakdown.md` — Release engineering patterns

### External Sources
- [Claude Code Plugins Documentation](https://code.claude.com/docs/en/plugins) — Component types and plugin system
- [Claude Code Extensions Explained](https://muneebsa.medium.com/claude-code-extensions-explained-skills-mcp-hooks-subagents-agent-teams-plugins-9294907e84ff) — Skills, MCP, Hooks, Subagents, Agent Teams
- [A Mental Model for Claude Code](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) — Skills, Subagents, and Plugins
- [GSD Framework](https://github.com/gsd-build/get-shit-done) — Spec-driven development reference
- [agentskills.io Specification](https://agentskills.io/specification) — Open standard
- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) — Copilot skills
- [Gemini CLI Agent Skills](https://geminicli.com/docs/cli/skills/) — Gemini integration
- [Cursor Agent Skills](https://cursor.com/docs/context/skills) — Cursor integration
- [OpenAI Codex CLI](https://developers.openai.com/codex/cli) — Codex capabilities
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) — Copilot agent skills
- [Anthropic Agent Skills Open Standard](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard) — Enterprise context
