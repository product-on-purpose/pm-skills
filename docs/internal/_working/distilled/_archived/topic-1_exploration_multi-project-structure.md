# Topic 1 — Exploration: Multi-Project Structure for PM-Skills

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — exploration document
> **Related efforts**: M-01 (common workspace), M-02 (update-doc), M-03 (link-docs), M-04 (project-context)

---

## Table of Contents

1. [Summary](#1-summary)
2. [Problem Deep-Dive](#2-problem-deep-dive)
3. [Pain Points & Desired Outcomes](#3-pain-points--desired-outcomes)
4. [Best Practices & Prior Art](#4-best-practices--prior-art)
5. [Existing Best-in-Class Implementations](#5-existing-best-in-class-implementations)
6. [Approaches & Tradeoffs](#6-approaches--tradeoffs)
7. [Recommendations & 80/20 Value Delivery](#7-recommendations--8020-value-delivery)
8. [Questions for Clarification](#8-questions-for-clarification)
9. [Creative Ideas & Suggestions](#9-creative-ideas--suggestions)
10. [Assumptions](#10-assumptions)
11. [Feasibility Assessment](#11-feasibility-assessment)
12. [Cautions & Gotchas](#12-cautions--gotchas)
13. [What You Might Be Missing](#13-what-you-might-be-missing)
14. [Value Evaluation](#14-value-evaluation)
15. [Next Steps](#15-next-steps)
16. [Sources](#16-sources)

---

## 1. Summary

Product Managers rarely work on a single project. They juggle 3-8 active initiatives at varying phases — one in discovery, two in development, one launching, two iterating. Each initiative produces 5-15 PM artifacts (problem statements, PRDs, user stories, retrospectives) that need to stay connected, versioned, and accessible.

**pm-skills currently solves the artifact-creation problem beautifully — but it doesn't solve the artifact-organization problem at all.** When a PM runs `/prd` today, the output floats in conversation history or gets manually saved. There's no concept of "this PRD belongs to Project X, which also has a problem statement, two user story sets, and a launch checklist." There's no way to say "update the PRD for Project X with insights from yesterday's interview synthesis."

This document explores how to architect a multi-project system that turns pm-skills from an artifact *factory* into an artifact *workspace* — where documents live together, reference each other, evolve together, and can be processed by AI agents that understand their relationships.

---

## 2. Problem Deep-Dive

### 2.1 The Artifact Sprawl Problem

A PM using pm-skills today produces artifacts in isolation. Each `/prd`, `/hypothesis`, or `/retrospective` invocation is stateless — the skill doesn't know:

- What project the artifact belongs to
- What other artifacts exist for this project
- What phase the project is in
- What decisions have been made in adjacent documents

This creates three cascading problems:

**Problem A: Document Island Syndrome**
Each artifact is self-contained but disconnected. A PRD written with `/prd` doesn't reference the problem statement from `/problem-statement`. User stories from `/user-stories` don't inherit constraints from the PRD. The PM must manually copy-paste context between invocations, which is error-prone and token-expensive.

**Problem B: No Project-Level View**
There's no place to see "all artifacts for Project X." No way to ask "what's the current state of Project X?" No way to say "I'm working on Project X" and have all skills understand that context.

**Problem C: Temporal Disconnection**
Projects evolve. A discovery interview changes the problem statement, which should ripple to the hypothesis, which should inform the PRD update. Today, these updates require manual re-invocation of every downstream skill — if the PM even remembers which documents exist.

### 2.2 The Transcript Processing Gap

PMs accumulate raw inputs — meeting transcripts, interview recordings, Slack threads, stakeholder emails. These contain insights that should update existing project documents. But today there's no mechanism to:

1. Ingest a transcript into a project context
2. Extract actionable insights relevant to specific documents
3. Suggest changes to existing artifacts based on new evidence
4. Track the provenance of changes ("this PRD update was informed by Interview #3")

### 2.3 The Scale Problem

The four deferred efforts (M-01 through M-04) were individually conceived but form a coherent system need:

| Effort | Need | Alone it solves... |
|--------|------|-------------------|
| M-01 `/common` | Shared workspace for cross-session context | "Where do my files live?" |
| M-02 `/update-doc` | Revise an existing document intelligently | "How do I update an old PRD?" |
| M-03 `/link-docs` | Create relationships between documents | "What connects to what?" |
| M-04 `/project` | Project-level context and switching | "Which project am I working on?" |

Each effort is useful alone, but the real value is the **system**: projects that contain linked documents that can be updated via intelligent commands, all persisted in a shared workspace. The critical path runs through defining the workspace architecture first (M-01/M-04), then the document operations on top (M-02/M-03).

---

## 3. Pain Points & Desired Outcomes

### Pain Points

| # | Pain Point | Severity | Frequency |
|---|-----------|----------|-----------|
| P1 | "I can't find the PRD I created last week" | High | Daily |
| P2 | "My documents don't reference each other" | High | Every session |
| P3 | "I have to re-explain project context every time I invoke a skill" | High | Every session |
| P4 | "I can't update an existing document without starting over" | Critical | Weekly |
| P5 | "Meeting notes sit in a folder and never inform my artifacts" | Medium | Weekly |
| P6 | "I work on 5 projects but pm-skills treats each invocation as greenfield" | High | Every session |
| P7 | "I don't know which artifacts are stale vs current" | Medium | Weekly |

### Desired Outcomes

| # | Outcome | Measures of Success |
|---|---------|-------------------|
| O1 | Every PM artifact belongs to a named project | No orphan documents |
| O2 | Documents within a project are visibly linked | Dependency graph or index |
| O3 | Switching between projects is a single command | `/project switch <name>` |
| O4 | Updating a document preserves history and references | Diff-based revision |
| O5 | Transcripts can be ingested and distributed to relevant documents | Automated insight extraction |
| O6 | Project state is persistent across sessions | Survives Claude Code restart |
| O7 | The system works across Claude Code, Codex, and MCP | Platform-agnostic persistence |

---

## 4. Best Practices & Prior Art

### 4.1 Spec-Driven Development (GSD Framework)

The [Get Shit Done (GSD)](https://github.com/gsd-build/get-shit-done) framework by TÂCHES offers the closest analog. GSD is a meta-prompting and spec-driven development system that uses a `.planning/` directory for project state management.

**Key patterns to learn from GSD:**

| Pattern | GSD Implementation | pm-skills Adaptation |
|---------|-------------------|---------------------|
| State persistence | `.planning/` with YAML frontmatter + markdown | `projects/<name>/` with similar structure |
| Phase-driven lifecycle | `discuss → plan → execute → verify → ship` | Maps to Triple Diamond phases |
| Context preservation | `STATE.md` tracks decisions and position | `PROJECT.md` tracks PM context |
| Fresh context spawning | Thin orchestrator spawns subagents | `/project` loads context per skill invocation |
| Milestone tracking | `ROADMAP.md` per project | Phase completion tracking per project |

**Critical GSD limitation for PM use:** GSD is one project per repo. It doesn't handle the PM reality of 3-8 concurrent projects. Its `.planning/` directory assumes a single active project context.

### 4.2 Monorepo Documentation Patterns

The monorepo pattern from software engineering offers relevant organizational insights:

- **Nx/Turborepo model**: Each "project" (package) has its own docs, config, and dependencies, with a root-level orchestrator
- **Shared conventions**: All projects follow the same structure, enabling tooling
- **Cross-project references**: Explicit dependency declarations between projects
- **Independent versioning**: Each project can be at a different lifecycle stage

### 4.3 Knowledge Management Systems

Tools like Obsidian, Notion, and Roam Research solve adjacent problems:

- **Bidirectional linking**: Documents automatically know what links *to* them
- **Graph views**: Visual representation of document relationships
- **Templates**: Standardized document creation (already solved by pm-skills)
- **Transclusion**: Embedding content from one document into another

### 4.4 Product Management Tools

Tools like Productboard, Aha!, and Linear provide project-level organization:

- **Initiative → Feature → Story hierarchy**: Natural grouping
- **Cross-initiative views**: See all work across projects
- **Status tracking**: Phase/stage awareness per initiative
- **Stakeholder views**: Different projections of the same data

---

## 5. Existing Best-in-Class Implementations

### 5.1 GSD Framework (get-shit-done)

- **Repo**: [github.com/gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
- **Model**: Single project per repo, `.planning/` directory, milestone-driven
- **Strengths**: Excellent state management, fresh-context spawning, XML-structured task plans
- **Weakness**: Single project assumption, developer-oriented (not PM-oriented), requires repo-per-project
- **What to borrow**: State file pattern, discuss-plan-execute-verify cycle, milestone archiving

### 5.2 Claude Code Plugin System

- **Reference**: [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)
- **Model**: Plugin manifest + skills/commands/hooks/agents
- **Strengths**: First-class skill discovery, namespace isolation, MCP integration
- **Weakness**: No built-in project concept beyond the working directory
- **What to borrow**: Plugin namespace for multi-project isolation, hook system for automation

### 5.3 Obsidian Vault Pattern

- **Model**: Folder-per-project, markdown files, YAML frontmatter, bidirectional links
- **Strengths**: Human-readable, version-controllable, plugin-extensible
- **Weakness**: No AI-native operations, manual linking
- **What to borrow**: Frontmatter-based metadata, `[[wikilink]]` style references, tag-based discovery

### 5.4 agentskills.io Specification

- **Reference**: [agentskills.io/specification](https://agentskills.io/specification)
- **Model**: Folder-based skills with SKILL.md + references, cross-platform portability
- **Adopted by**: 26+ platforms including Claude, Codex, Gemini CLI, Copilot, Cursor
- **What to leverage**: The skill structure itself is the right unit for *creating* artifacts; the project structure is the right unit for *organizing* them

---

## 6. Approaches & Tradeoffs

### Approach A: In-Repo Project Directories (Recommended)

```
pm-skills/                          # The skill library (unchanged)
├── skills/
├── commands/
└── ...

~/pm-projects/                      # NEW: User's project workspace
├── PROJECT_INDEX.md                 # Master index of all projects
├── acme-checkout-redesign/          # Project 1
│   ├── PROJECT.md                   # Project context, phase, stakeholders
│   ├── artifacts/
│   │   ├── problem-statement.md     # Output from /problem-statement
│   │   ├── hypothesis.md            # Output from /hypothesis
│   │   ├── prd_v1.md               # Output from /prd (versioned)
│   │   ├── prd_v2.md               # Updated via /update-doc
│   │   └── user-stories.md         # Output from /user-stories
│   ├── inputs/
│   │   ├── interview-2026-03-15.md  # Raw transcript
│   │   └── stakeholder-notes.md     # Meeting notes
│   ├── links.yaml                   # Document relationships
│   └── .history/                    # Revision history
│       └── prd_v1→v2_diff.md
├── beta-mobile-app/                 # Project 2
│   ├── PROJECT.md
│   ├── artifacts/
│   └── inputs/
└── .pm-config.yaml                  # Global settings
```

**Tradeoffs:**

| Pro | Con |
|-----|-----|
| Complete separation from pm-skills repo | Requires new repo or directory convention |
| Git-trackable project history | Another directory to manage |
| Works with any AI platform (files are just markdown) | No built-in discovery in Claude Code |
| Human-readable and editable | Must be wired into pm-skills via commands/hooks |
| Multiple projects natively supported | Initial setup complexity |
| Can be a shared team repo | Merge conflicts on shared projects |

### Approach B: pm-skills Plugin with Local Project Storage

Same file structure as Approach A, but integrated as part of the pm-skills plugin. The plugin provides commands (`/project new`, `/project switch`, `/project status`) and hooks (auto-save artifacts to project directory, auto-load project context).

```
.claude-plugin/
├── plugin.json
├── commands/
│   ├── project.md          # /project command (new, switch, list, status)
│   ├── update-doc.md       # /update-doc command
│   └── link-docs.md        # /link-docs command
├── hooks/
│   └── post-skill-save.sh  # Auto-saves skill output to active project
└── skills/
    ├── utility-project-manager/
    └── utility-doc-updater/
```

**Tradeoffs:**

| Pro | Con |
|-----|-----|
| Integrated experience via plugin commands | Coupled to Claude Code plugin system |
| Hooks can auto-organize output | Hooks must be carefully designed |
| Plugin namespace keeps things clean | Plugin update may lag pm-skills update |
| Leverages existing pm-skills install | More complex plugin packaging |

### Approach C: Separate `pm-workspace` Repository

A standalone repo purpose-built for multi-project PM work, with pm-skills as a dependency (submodule or referenced plugin).

```
pm-workspace/
├── .claude/
│   └── settings.json       # References pm-skills plugin
├── CLAUDE.md                # Workspace instructions
├── projects/
│   ├── INDEX.md
│   ├── project-a/
│   └── project-b/
├── templates/               # Project templates (lean, enterprise, sprint)
└── scripts/
    ├── init-project.sh
    └── process-transcript.sh
```

**Tradeoffs:**

| Pro | Con |
|-----|-----|
| Clean separation of concerns | Two repos to maintain |
| Purpose-built for the multi-project problem | Users must clone both repos |
| Can evolve independently of pm-skills | Sync between workspace and skill versions |
| Can have its own CI, templates, conventions | May confuse the pm-skills identity |
| Open to non-PM uses (UX, design, strategy) | Fragmented community |

### Approach D: GSD-Style Single Project with pm-skills Integration

Adapt GSD's `.planning/` pattern but with PM vocabulary. One project per working directory, use GSD's lifecycle model with PM skills replacing developer tasks.

**Tradeoffs:**

| Pro | Con |
|-----|-----|
| Proven model (GSD is battle-tested) | One project per directory/repo |
| Strong state management patterns | Doesn't solve multi-project PM need |
| Fresh-context spawning prevents rot | Over-engineered for document management |
| Familiar to GSD users | Developer-oriented vocabulary |

---

## 7. Recommendations & 80/20 Value Delivery

### Primary Recommendation: Approach B (Plugin-Integrated Project Workspace)

**Why:** The 80/20 analysis reveals that the highest-value capabilities are:

1. **Project context switching** (solves P3, P6) — worth 40% of total value
2. **Artifact persistence with project grouping** (solves P1, P2) — worth 30% of total value
3. **Document update capability** (solves P4, P7) — worth 20% of total value
4. **Transcript processing** (solves P5) — worth 10% of total value

Approach B delivers items 1-3 as plugin commands integrated into the existing pm-skills install path. Users don't need a separate repo. The workspace directory is configurable (default: `~/pm-projects/` or a path in the current working directory).

### 80/20 Minimum Viable Workspace

The smallest thing that delivers real value:

1. **`/project new <name>`** — Creates project directory with `PROJECT.md`
2. **`/project switch <name>`** — Sets active project context (stored in `.pm-config.yaml`)
3. **`/project status`** — Shows all artifacts, their dates, and phase status
4. **A hook** that auto-saves skill outputs to the active project's `artifacts/` directory

**Everything else (linking, update-doc, transcript processing, graph views) is Phase 2+.**

### Why Not Approach C (Separate Repo)?

While architecturally cleaner, a separate repo creates friction:
- Users must discover, clone, and configure a second repo
- The pm-skills plugin must reference the workspace path
- Community splits between "skill users" and "workspace users"
- Documentation becomes more complex

The plugin approach (B) keeps everything in one install: `plugin install pm-skills` gives you both skills and project management.

### Why Not Approach D (GSD-Style)?

GSD's model is excellent for software projects (code lives in one repo, one project at a time). PM work is fundamentally multi-project. Adopting GSD's single-project assumption would force PMs to create separate repos/directories for each initiative, which is the opposite of "see all my work in one place."

That said, **GSD's state management patterns should be borrowed heavily** — the `.planning/` structure, STATE.md, CONTEXT.md, and milestone archiving are excellent patterns that translate directly to PM project management.

### The Separate Repo Escape Hatch

If the multi-project workspace grows beyond what a plugin can comfortably manage (team collaboration, advanced workflow automation, CI-driven document processing), Approach C (separate `pm-workspace` repo) becomes the right evolution. Design the file format and conventions in Approach B so they can be extracted to a standalone repo without restructuring.

---

## 8. Questions for Clarification

1. **Workspace location**: Should projects default to `~/pm-projects/`, the current working directory, or a configurable path? This affects portability and team sharing.

2. **Project sharing**: Should multiple PMs be able to collaborate on the same project (shared Git repo), or is this primarily single-user?

3. **Version control**: Should project directories be Git repos themselves, or plain directories? Git enables history but adds complexity.

4. **Artifact format**: Should saved artifacts include the full skill output (with frontmatter, metadata), or a cleaned version? What about conversation context that informed the artifact?

5. **Transcript processing scope**: Should transcript processing be a skill (`/process-transcript`), a hook (auto-process when files appear in `inputs/`), or a separate tool?

6. **Relationship to pm-skills-mcp**: Should the MCP server also expose project management capabilities (list projects, get project status, get artifact by project)?

7. **Phase tracking**: Should project phase be manually set or inferred from which artifacts exist? (e.g., a project with problem-statement + hypothesis + PRD is in "Develop" phase)

8. **Cross-platform priority**: How important is it that the workspace works identically in Codex, Gemini CLI, and Cursor? This constrains the hook/command approach.

---

## 9. Creative Ideas & Suggestions

### 9.1 Artifact Dependency Graph

When a PM creates artifacts, automatically build a dependency graph:

```
problem-statement.md
    ↓ informs
hypothesis.md
    ↓ validated by
experiment-design.md
    ↓ produces
experiment-results.md
    ↓ informs
prd_v2.md (updated from v1)
    ↓ decomposed into
user-stories.md
```

This graph is stored in `links.yaml` and can be rendered as ASCII art in `/project status`.

### 9.2 Smart Context Loading

When a PM runs `/prd` while Project X is active, automatically load:
- The project's `PROJECT.md` (context, stakeholders, constraints)
- The most recent `problem-statement.md` and `hypothesis.md` (upstream artifacts)
- Any recent `inputs/` files marked as unprocessed

This eliminates P3 ("I have to re-explain context") without token overhead — load only what's relevant to the current skill.

### 9.3 Transcript Processing Pipeline

```
1. PM drops transcript into projects/acme/inputs/interview-2026-03-20.md
2. /process-transcript detects it, extracts insights
3. System identifies which artifacts are affected:
   - 3 insights relevant to problem-statement.md
   - 1 insight that changes a user-stories acceptance criterion
   - 2 insights that inform a new hypothesis
4. PM reviews suggested changes, approves/rejects each
5. Approved changes are applied via /update-doc with provenance tracking
```

### 9.4 Project Templates

Pre-built project structures for common PM scenarios:

| Template | Artifacts Included | When to Use |
|----------|-------------------|-------------|
| `lean` | problem-statement, hypothesis, experiment-design | Early discovery |
| `feature` | problem-statement, hypothesis, prd, user-stories, launch-checklist | Known feature work |
| `full-discovery` | stakeholder-summary, interview-synthesis, competitive-analysis, opportunity-tree, problem-statement | New market/segment |
| `iteration` | retrospective, refinement-notes, lessons-log | Sprint retrospectives |

### 9.5 Stale Document Detection

Track when artifacts were last updated. If a problem-statement hasn't been revised in 30 days but the PRD was updated yesterday, flag the potential staleness. This solves P7 without requiring manual tracking.

### 9.6 Cross-Project Dashboard

```
/projects status --all

Project                    Phase       Artifacts  Last Active   Health
─────────────────────────────────────────────────────────────────────────
acme-checkout-redesign     Deliver     8/8        2h ago        🟢 Current
beta-mobile-app            Define      3/5        3d ago        🟡 Stale inputs
customer-portal-v2         Discover    2/8        1w ago        🟠 Needs attention
q2-pricing-experiment      Measure     4/4        1d ago        🟢 Current
```

---

## 10. Assumptions

1. **PMs use Claude Code as their primary AI interface** — the workspace is optimized for Claude Code but should degrade gracefully in other environments (plain markdown files are universally readable).

2. **Projects are primarily single-user** — while team collaboration is desirable, the v1 design should work well for one PM managing multiple projects. Team features are Phase 2.

3. **Artifacts are markdown** — pm-skills already produce markdown output. The workspace stores and manages markdown files. Non-markdown artifacts (diagrams, spreadsheets) are referenced but not managed.

4. **Git is optional but recommended** — the workspace directory can be a Git repo for history, but the system should work without Git.

5. **The pm-skills plugin install path is the primary distribution** — users who have pm-skills installed get project management "for free" as part of the plugin.

6. **Token economy matters** — loading project context should add < 2,000 tokens to each skill invocation. This means PROJECT.md must be concise and context loading must be selective.

7. **The workspace directory is local to the user's machine** — not cloud-hosted, not in a database. This matches the file-based nature of Claude Code and the agentskills.io philosophy.

---

## 11. Feasibility Assessment

### 11.1 Technical Feasibility

| Component | Feasibility | Complexity | Notes |
|-----------|------------|------------|-------|
| Project directory structure | ✅ Trivial | Low | Just mkdir + template files |
| `/project` command | ✅ Straightforward | Low | Markdown command with frontmatter |
| Active project switching | ✅ Feasible | Medium | Needs persistent state file |
| Auto-save hook | ⚠️ Feasible with constraints | Medium | PostToolUse hook, but output capture is tricky |
| Context loading into skills | ⚠️ Requires skill modification | High | Each skill would need to read project context |
| Document linking | ✅ Feasible | Medium | YAML link registry + frontmatter cross-references |
| Document updating | ⚠️ Complex | High | Intelligent merge of new info with existing doc |
| Transcript processing | ⚠️ Complex | High | NLP extraction + multi-document routing |
| Cross-platform portability | ✅ Inherent | Low | Plain markdown + YAML = universal |

### 11.2 Integration Feasibility

The hook-based auto-save approach has a specific constraint: Claude Code hooks can run scripts but cannot easily capture the *content* of a skill's output. Two viable approaches:

1. **Skill-level integration**: Each pm-skill is modified to check for an active project and save its output to the project directory. This changes every skill but gives precise control.

2. **Post-processing approach**: A hook writes a marker file, then a separate `/project save` command is invoked by the user to save the most recent output. Less automated but simpler.

3. **MCP-mediated approach**: If pm-skills-mcp gains project awareness, the MCP server can handle artifact persistence. This centralizes the logic but requires MCP changes.

### 11.3 Effort Estimate

| Phase | Scope | Effort |
|-------|-------|--------|
| Phase 1: Minimum Viable Workspace | `/project new/switch/status` + directory structure + `PROJECT.md` template | 1-2 days |
| Phase 2: Document Operations | `/update-doc` + `/link-docs` + artifact dependency graph | 3-5 days |
| Phase 3: Automation | Auto-save hook + smart context loading + stale detection | 3-5 days |
| Phase 4: Transcript Processing | `/process-transcript` + multi-document routing | 5-8 days |

---

## 12. Cautions & Gotchas

### 12.1 State Management Complexity

The moment you add persistent state (active project, document links, revision history), you inherit state management problems:
- What happens when state gets corrupted?
- How do you handle concurrent access (multiple Claude Code sessions)?
- What's the migration path when the schema evolves?

**Mitigation**: Keep state in human-readable markdown/YAML. No binary formats. No databases. If state corrupts, a human can fix it with a text editor.

### 12.2 Token Budget Creep

Loading project context into every skill invocation eats tokens. A rich PROJECT.md (500 tokens) + upstream artifacts (2000 tokens) + link graph (200 tokens) = 2700 tokens per invocation. Across a session with 10 skill invocations, that's 27,000 tokens of overhead.

**Mitigation**: Lazy loading. Only load context that the current skill actually needs. A `/prd` invocation needs the problem-statement and hypothesis, not the launch-checklist.

### 12.3 Skill Modification Scope

If every skill needs to understand project context, that's 25 skills to modify. This is a significant maintenance burden.

**Mitigation**: Use a shared preamble or hook that injects project context *before* the skill runs, rather than modifying each skill's SKILL.md. The skill itself doesn't need to know about projects — it just receives additional context.

### 12.4 File Naming Collisions

If a PM runs `/prd` twice for the same project, what happens to `prd.md`? Overwrite? Auto-version (`prd_v1.md`, `prd_v2.md`)? Timestamp (`prd_2026-03-21.md`)?

**Mitigation**: Use versioned naming (`prd_v1.md`) with automatic increment. The old version is preserved, not overwritten. This matches how PMs actually work — PRDs evolve through numbered drafts.

### 12.5 Cross-Platform Fragility

Hooks are Claude Code-specific. If a PM switches to Cursor or Codex, the auto-save and context-loading hooks don't work. The workspace directory is still accessible (it's just files), but the automation breaks.

**Mitigation**: Design the workspace so it's *useful without automation*. The directory structure, PROJECT.md, and artifact organization should be self-explanatory. Automation is a convenience layer, not a requirement.

---

## 13. What You Might Be Missing

### 13.1 The "Team" Dimension

Most PM work is collaborative. Even if the PM is the primary author, stakeholders need to read and comment on artifacts. Consider whether the workspace should support:
- Shared project repos (multiple contributors)
- Export to Notion/Confluence/Google Docs
- Read-only views for stakeholders

### 13.2 The "Search" Problem

Once you have 5 projects × 8 artifacts = 40+ documents, you need search. Not just file search (grep), but semantic search ("find all PRDs that mention authentication" or "what did we decide about pricing across all projects?").

### 13.3 The "Archive" Problem

Projects end. Where do completed projects go? An `archived/` directory? A separate repo? Do archived projects still show in `/projects status`?

### 13.4 The "Integration" Problem

PMs don't live in Claude Code alone. They use Jira/Linear for tickets, Confluence/Notion for docs, Figma for designs, Slack for communication. The workspace is most valuable if it can:
- Export artifacts to external tools (e.g., push user stories to Linear)
- Import context from external tools (e.g., pull Jira ticket details into a sprint retro)

This is where MCP becomes critical — MCP servers for Linear, Notion, Slack, etc. can bridge the workspace to the PM's actual tool ecosystem.

### 13.5 The "Naming" Problem

What should the multi-project capability be called?
- `pm-workspace`? (clear but generic)
- `pm-projects`? (descriptive but might conflict with other tools)
- `pm-portfolio`? (captures the multi-project nature)
- Just `projects/`? (simple but ambiguous)

The name matters because it becomes a mental model. GSD chose `.planning/` — a directory that clearly signals "this is where plans live."

---

## 14. Value Evaluation

### 14.1 Value Matrix

| Capability | Value to PM | Implementation Effort | Value/Effort Ratio |
|-----------|------------|----------------------|-------------------|
| Project context switching | Very High | Low | ⭐⭐⭐⭐⭐ |
| Artifact persistence | Very High | Low | ⭐⭐⭐⭐⭐ |
| Document linking | High | Medium | ⭐⭐⭐⭐ |
| Project status dashboard | High | Low | ⭐⭐⭐⭐⭐ |
| Document updating | Very High | High | ⭐⭐⭐ |
| Stale detection | Medium | Low | ⭐⭐⭐⭐ |
| Transcript processing | High | Very High | ⭐⭐ |
| Cross-project search | Medium | High | ⭐⭐ |
| External tool integration | High | Very High | ⭐ |

### 14.2 Real Value Assessment

The real value isn't any single capability — it's the **compound effect** of having a project context that persists across sessions and skill invocations. Today, every Claude Code session starts from zero. With a project workspace:

- Session 1: Create problem statement → saved to project
- Session 2: "I'm working on acme-checkout" → Claude loads problem statement → create hypothesis with full context
- Session 3: After interviews → process transcript → update problem statement + hypothesis
- Session 4: Write PRD → automatically references problem statement, hypothesis, and interview insights

Each session builds on the last. That's the real value: **cumulative project intelligence**.

---

## 15. Next Steps

### Immediate (This Sprint)

1. **Define the project directory specification** — file structure, naming conventions, PROJECT.md schema
2. **Build `/project new` and `/project switch` commands** — minimum viable project management
3. **Design the context injection mechanism** — how skills receive project context without modification

### Near-Term (Next 2 Sprints)

4. **Build `/project status`** — multi-project dashboard
5. **Build `/update-doc`** — intelligent document revision
6. **Add auto-save hook** — save skill outputs to active project

### Medium-Term (Next Quarter)

7. **Build `/link-docs`** — document relationship management
8. **Build `/process-transcript`** — transcript ingestion and insight distribution
9. **Add MCP project endpoints** — expose project data via pm-skills-mcp

### Decision Point

Before implementation, decide:
- [ ] Workspace location convention (where do projects live?)
- [ ] Whether this is a pm-skills plugin feature or a separate tool
- [ ] Whether to modify existing skills or use a context injection layer
- [ ] Minimum artifact format specification

---

## 16. Sources

### Internal Sources
- `_NOTES/efforts/active/M-01-common-workspace/README.md` — Effort M-01 metadata
- `_NOTES/efforts/active/M-02-update-doc-command/README.md` — Effort M-02 metadata
- `_NOTES/efforts/active/M-03-link-docs-command/README.md` — Effort M-03 metadata
- `_NOTES/efforts/active/M-04-project-context-command/README.md` — Effort M-04 metadata
- `_NOTES/efforts/INDEX_EFFORTS.md` — Effort tracking index
- `_NOTES/efforts/mcp-as-built-architecture.md` — MCP architecture reference
- `_bundles/feature-kickoff.md` — Example workflow bundle
- `docs/internal/Releases_2.3-2.4_detailed-breakdown.md` — Release engineering patterns

### External Sources
- [GSD Framework (get-shit-done)](https://github.com/gsd-build/get-shit-done) — Spec-driven development system
- [GSD Framework Article](https://pasqualepillitteri.it/en/news/169/gsd-framework-claude-code-ai-development) — GSD architecture overview
- [GSD Deep Analysis](https://deepwiki.com/gsd-build/get-shit-done) — Deep technical analysis
- [agentskills.io Specification](https://agentskills.io/specification) — Open standard for agent skills
- [Claude Code Plugins Documentation](https://code.claude.com/docs/en/plugins) — Plugin system reference
- [Beating Context Rot with GSD (The New Stack)](https://thenewstack.io/beating-the-rot-and-getting-stuff-done/) — Context rot problem analysis
