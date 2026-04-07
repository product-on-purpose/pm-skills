# Topic 2 — Specification: Layered PM-Skills Platform Architecture

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — agentic-development-optimized spec
> **Approach**: Layered architecture (cross-platform core + Claude Code extensions)
> **Companion**: `topic-2_exploration_holistic-pm-skill-value.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture](#2-architecture)
3. [Layer 1: Cross-Platform Core](#3-layer-1-cross-platform-core)
4. [Layer 2: Claude Code Extensions](#4-layer-2-claude-code-extensions)
5. [Layer 3: MCP Integration](#5-layer-3-mcp-integration)
6. [PM Delivery Model Specification](#6-pm-delivery-model-specification)
7. [Execution Plan](#7-execution-plan)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Executive Summary

**Goal**: Expand pm-skills from a skill library into a layered PM platform that delivers the richest experience on Claude Code while maintaining cross-platform portability.

**Architecture**: Three layers with clear boundaries.

| Layer | Components | Platforms | Purpose |
|-------|-----------|-----------|---------|
| 1: Core | Skills, Commands, Bundles | All (6+ platforms) | PM artifact creation |
| 2: Claude Code | Hooks, Agents, Output Styles | Claude Code CLI | Automation + intelligence |
| 3: MCP | MCP Server (pm-skills-mcp) | MCP-enabled platforms | Programmatic access |

---

## 2. Architecture

### 2.1 Layered Component Model

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: MCP Integration                                        │
│   pm-skills-mcp npm package                                     │
│   ├── pm_* tools (25 skill tools)                               │
│   ├── pm_project_* tools (NEW: project management)              │
│   ├── pm-skills://resources (skill + template access)           │
│   └── pm-skills://dashboard (NEW: project status)               │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2: Claude Code Extensions                                  │
│   Plugin-specific capabilities                                   │
│   ├── hooks/                                                     │
│   │   ├── session-start.js    (load project context)            │
│   │   ├── post-skill-save.js  (auto-save artifacts)             │
│   │   └── session-end.js      (generate session log)            │
│   ├── agents/                                                    │
│   │   ├── transcript-processor.md  (insight extraction)         │
│   │   ├── artifact-reviewer.md     (quality scoring)            │
│   │   └── decompose-agent.md       (PRD → user stories)        │
│   └── styles/                                                    │
│       ├── pm-executive.md     (concise, decision-focused)       │
│       └── pm-detailed.md      (comprehensive, evidence-rich)    │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1: Cross-Platform Core (agentskills.io)                    │
│   Universal capabilities                                         │
│   ├── skills/           (25+ PM skills)                         │
│   ├── commands/         (26+ slash commands)                    │
│   ├── _bundles/         (3+ workflow chains)                    │
│   └── AGENTS.md         (discovery file)                        │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Degradation Model

When pm-skills is used on a platform that doesn't support all layers:

| Platform | Layer 1 | Layer 2 | Layer 3 | Experience |
|----------|---------|---------|---------|------------|
| Claude Code CLI | ✅ | ✅ | ✅ (if MCP configured) | Full |
| VS Code + Copilot | ✅ | ⚠️ Partial | ✅ | Good (no hooks) |
| Codex | ✅ | ❌ | ❌ | Core only |
| Gemini CLI | ✅ | ❌ | ❌ | Core only |
| Cursor | ✅ | ❌ | ✅ (if MCP configured) | Good |
| Any editor | ✅ (via AGENTS.md) | ❌ | ❌ | Basic |

---

## 3. Layer 1: Cross-Platform Core

### 3.1 Current State (No Changes Needed)

The existing 25 skills, 26 commands, and 3 bundles form the cross-platform core. These work on any platform that supports agentskills.io.

### 3.2 Enhancements (Cross-Platform Safe)

| Enhancement | What | Why |
|-------------|------|-----|
| Add `/pm-next` command | Recommends next skill based on existing artifacts | Reduces decision fatigue |
| Add `/pm-help` command | Shows available skills by phase with guidance | Improves discoverability |
| Expand bundles | Add "sprint-planning" and "measurement-cycle" bundles | More workflow coverage |
| Improve AGENTS.md | Add phase-grouped skill index with descriptions | Better discovery on all platforms |

### 3.3 `/pm-next` Command Specification

```yaml
---
name: pm-next
description: >-
  Analyze the current project's artifacts and recommend the next most
  valuable PM skill to run. Considers phase, existing artifacts, staleness,
  and standard artifact flow.
---
```

**Logic**:
```
1. List existing artifacts in active project
2. Determine current phase from artifact coverage
3. Check for missing artifacts in current phase
4. Check for stale artifacts (>14 days)
5. Recommend next action:
   - If current phase incomplete → suggest missing artifact skill
   - If current phase complete → suggest first skill of next phase
   - If stale artifacts exist → suggest update-doc for stale ones
```

---

## 4. Layer 2: Claude Code Extensions

### 4.1 Hooks Specification

#### Hook: `session-start.js`

**Event**: `SessionStart`
**Purpose**: Load active project context at session start
**Behavior**:
```
1. Check for .pm-config.yaml in workspace
2. If active_project is set:
   a. Read PROJECT.md (< 500 tokens)
   b. Build artifact inventory (names + dates)
   c. Inject as system context:
      "Active PM project: {name}, Phase: {phase}, Artifacts: {list}"
3. If no active project:
   a. Check if any projects exist
   b. If yes: suggest /project switch
   c. If no: silently continue
```

**plugin.json registration**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/session-start.js"
      }
    ]
  }
}
```

#### Hook: `post-skill-save.js`

**Event**: `PostToolUse`
**Purpose**: Auto-save PM artifacts to active project directory
**Behavior**:
```
1. Check if the tool was Write
2. Check if the written file matches a PM artifact pattern
3. Check if a project is active
4. If all true:
   a. Determine artifact type from filename/content
   b. Determine phase subdirectory
   c. Copy to projects/{active}/artifacts/{phase}/{artifact}.md
   d. Update PROJECT_INDEX.md artifact count
   e. Log to .history/
```

**Matcher**:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "node ${CLAUDE_PLUGIN_ROOT}/hooks/post-skill-save.js"
      }
    ]
  }
}
```

### 4.2 Agents Specification

#### Agent: `transcript-processor`

```yaml
---
name: transcript-processor
description: >-
  Process meeting transcripts and extract insights relevant to PM artifacts.
  Maps extracted insights to existing project documents and suggests updates.
subagent_type: general-purpose
model: sonnet
tools: [Read, Write, Grep, Glob, WebSearch]
---
```

**System prompt** (in agent .md file):
```markdown
You are a transcript processing agent for PM projects.

Input: A transcript file path and the active project directory path.

Your job:
1. Read the transcript
2. Read all existing artifacts in the project
3. Extract key insights from the transcript, categorized as:
   - Problem/need statements
   - Feature requests or requirements
   - Constraints or risks
   - Decisions made
   - Action items
4. Map each insight to the most relevant existing artifact
5. Produce an Insight Report (see template)
6. Write the report to the project's inputs/ directory

Be specific. Quote the transcript. Include line numbers.
Do NOT modify existing artifacts — only recommend changes.
```

#### Agent: `artifact-reviewer`

```yaml
---
name: artifact-reviewer
description: >-
  Review a PM artifact for completeness, specificity, consistency with
  upstream artifacts, and actionability. Produce a quality score and
  improvement suggestions.
subagent_type: general-purpose
model: haiku
tools: [Read, Glob]
---
```

### 4.3 Output Styles Specification

#### Style: `pm-executive`

```markdown
---
name: pm-executive
description: Concise, decision-focused output for stakeholder-facing artifacts
---

# PM Executive Output Style

When this style is active:

1. Lead every section with a 1-sentence summary
2. Use bullet points, not paragraphs
3. Include a "Decisions Needed" section at the top
4. Limit total output to ~1000 words
5. Use tables for comparisons
6. Bold key metrics and dates
7. End with clear "Next Steps" with owners and dates
8. Omit methodology details — focus on outcomes
```

#### Style: `pm-detailed`

```markdown
---
name: pm-detailed
description: Comprehensive, evidence-rich output for discovery and analysis
---

# PM Detailed Output Style

When this style is active:

1. Include evidence and citations for all claims
2. Use headers for clear section navigation
3. Include methodology descriptions
4. Provide both summary and detail for each finding
5. Include appendices for raw data
6. Cross-reference related artifacts
7. Use footnotes for sources
8. No hard word limit — completeness over brevity
```

---

## 5. Layer 3: MCP Integration

### 5.1 New MCP Endpoints (pm-skills-mcp Changes)

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `pm_project_list` | List all projects | None | Project name, phase, status, artifact count |
| `pm_project_status` | Get project details | project_slug | Full PROJECT.md content + artifact inventory |
| `pm_project_artifact` | Get specific artifact | project_slug, artifact_name | Artifact content |
| `pm_project_create` | Create new project | name, objective, phase | Confirmation + PROJECT.md |

### 5.2 New MCP Resources

| URI | Purpose |
|-----|---------|
| `pm-skills://projects` | List all projects |
| `pm-skills://projects/{slug}` | Project details |
| `pm-skills://projects/{slug}/artifacts` | Project artifact inventory |
| `pm-skills://dashboard` | Cross-project dashboard |

---

## 6. PM Delivery Model Specification

### 6.1 Phase Gate Definitions

| Phase | Entry Criteria | Exit Criteria | Required Artifacts | Optional Artifacts |
|-------|---------------|---------------|-------------------|-------------------|
| Discover | Business signal or user feedback | Problem space understood | stakeholder-summary | competitive-analysis, interview-synthesis |
| Define | Discovery complete | Testable hypothesis formed | problem-statement, hypothesis | jtbd-canvas, opportunity-tree |
| Develop | Problem defined | Solution specified | prd | solution-brief, design-rationale, adr, spike-summary |
| Deliver | Solution specified | Sprint-ready backlog | user-stories | edge-cases, launch-checklist |
| Measure | Feature launched | Evidence collected | experiment-design | instrumentation-spec, dashboard-requirements, experiment-results |
| Iterate | Evidence analyzed | Next iteration scoped | retrospective | lessons-log, refinement-notes, pivot-decision |

### 6.2 Artifact Flow Diagram

```
DISCOVER                    DEFINE                  DEVELOP
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ stakeholder-     │──→│ problem-         │──→│ prd              │
│ summary          │   │ statement        │   │                  │
│                  │   │                  │   │ solution-brief   │
│ interview-       │──→│ hypothesis       │   │                  │
│ synthesis        │   │                  │   │ design-rationale │
│                  │   │ jtbd-canvas      │   │                  │
│ competitive-     │──→│                  │   │ adr              │
│ analysis         │   │ opportunity-tree │   │                  │
└─────────────────┘   └──────────────────┘   │ spike-summary    │
                                              └────────┬─────────┘
                                                       │
         ITERATE                 MEASURE               │  DELIVER
┌─────────────────┐   ┌──────────────────┐   ┌────────▼─────────┐
│ retrospective    │←──│ experiment-      │←──│ user-stories     │
│                  │   │ results          │   │                  │
│ lessons-log      │   │                  │   │ edge-cases       │
│                  │   │ experiment-      │   │                  │
│ refinement-notes │   │ design           │   │ launch-checklist │
│                  │   │                  │   │                  │
│ pivot-decision   │   │ instrumentation- │   │ release-notes    │
│                  │   │ spec             │   │                  │
└─────────────────┘   └──────────────────┘   └──────────────────┘
```

### 6.3 Workflow Automation Rules

When the PM delivery model is active (opt-in via settings):

1. **Phase completion detection**: When all required artifacts exist, suggest advancing to next phase
2. **Dependency enforcement**: Warn if starting a skill whose upstream artifacts don't exist
3. **Stale detection**: Flag artifacts not updated in 14+ days
4. **Coverage scoring**: Report artifact completeness per phase (0-100%)
5. **Velocity tracking**: Log dates of artifact creation for timeline awareness

---

## 7. Execution Plan

### Phase 1: Foundation (Week 1-2)

```
1. Create hooks/ directory with session-start.js and post-skill-save.js
2. Create styles/ directory with pm-executive.md and pm-detailed.md
3. Create /pm-next command
4. Update plugin.json with new components
5. Test hooks locally
6. Document which features work on which platforms
```

### Phase 2: Intelligence (Week 3-4)

```
1. Create transcript-processor agent
2. Create artifact-reviewer agent
3. Build artifact quality scoring system
4. Test agents with real PM scenarios
5. Document agent usage in README
```

### Phase 3: Integration (Week 5-6)

```
1. Add project management endpoints to pm-skills-mcp
2. Build PM delivery model phase gate logic
3. Add /pm-next with project awareness
4. Create sprint-planning and measurement-cycle bundles
5. Full cross-platform testing
```

---

## 8. Acceptance Criteria

### Phase 1
- [ ] SessionStart hook loads active project context
- [ ] PostToolUse hook auto-saves artifacts to project directory
- [ ] pm-executive output style produces concise, decision-focused output
- [ ] `/pm-next` recommends appropriate next skill
- [ ] Plugin.json includes all new component registrations
- [ ] Skills continue to work unchanged on non-Claude-Code platforms

### Phase 2
- [ ] Transcript processing agent extracts insights and maps to artifacts
- [ ] Artifact reviewer produces quality scores with specific feedback
- [ ] Agents complete in < 60 seconds for typical inputs

### Phase 3
- [ ] MCP project endpoints return correct data
- [ ] PM delivery model phase gates are enforced (advisory, not blocking)
- [ ] Sprint-planning and measurement-cycle bundles work end-to-end
