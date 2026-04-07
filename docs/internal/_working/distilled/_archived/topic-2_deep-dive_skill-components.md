# Topic 2 — Deep Dive: Anatomy of Powerful AI Agent Skills

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — general learning document (not pm-skills-specific)
> **Audience**: Anyone building or evaluating AI agent skills across platforms

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [The Skill Architecture Stack](#2-the-skill-architecture-stack)
3. [Component Deep-Dives](#3-component-deep-dives)
4. [Cross-Platform Compatibility Matrix](#4-cross-platform-compatibility-matrix)
5. [Skill Design Patterns](#5-skill-design-patterns)
6. [Anti-Patterns & Common Mistakes](#6-anti-patterns--common-mistakes)
7. [Token Economy](#7-token-economy)
8. [Evaluation & Quality](#8-evaluation--quality)
9. [Distribution & Discovery](#9-distribution--discovery)
10. [Future Directions](#10-future-directions)

---

## 1. Introduction

Agent skills are the defining primitive of the post-MCP AI tooling era. Where MCP standardized *how* agents connect to external tools, the [agentskills.io specification](https://agentskills.io/specification) standardized *how* agents learn domain-specific capabilities.

As of March 2026, the agentskills.io standard has been adopted by 26+ platforms including Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot, Cursor, and VS Code. This means a single well-built skill can work across the entire AI coding ecosystem.

But "works across platforms" and "works *well* across platforms" are different. This document is a comprehensive guide to every component that makes skills powerful — not just the minimum viable SKILL.md, but the full stack of hooks, agents, output styles, memory, and orchestration that separate a great skill from a mediocre one.

---

## 2. The Skill Architecture Stack

### 2.1 The Minimal Skill

The agentskills.io spec requires exactly one file:

```
my-skill/
└── SKILL.md         # Instructions with YAML frontmatter
```

That's it. A folder with a SKILL.md. The spec is intentionally tiny — any AI platform can support this.

### 2.2 The Full Skill Stack

A maximally-featured skill on Claude Code can include:

```
my-skill/
├── SKILL.md                    # Core instructions (REQUIRED)
├── references/                  # Supporting material
│   ├── TEMPLATE.md             # Output template
│   ├── EXAMPLE.md              # Worked example
│   ├── frameworks/             # Domain frameworks
│   │   ├── swot.md
│   │   └── porter-five-forces.md
│   └── exemplars/              # Real-world examples
│       ├── good-output.md
│       └── bad-output.md
├── scripts/                     # Automation scripts
│   ├── validate.sh             # Output validation
│   └── export.sh               # Format conversion
├── meta/                        # Skill metadata (not loaded at runtime)
│   ├── DISCOVERY.md            # How this skill was designed
│   └── CREATION_NOTES.md       # Design decisions
└── tests/                       # Evaluation scenarios
    ├── minimal.md
    ├── complex.md
    └── edge-case.md
```

And at the plugin level, surrounding the skill:

```
.claude-plugin/
├── plugin.json                  # Manifest registering all components
├── commands/
│   └── my-skill.md             # Slash command shortcut
├── hooks/
│   ├── pre-skill.js            # Pre-execution validation
│   └── post-skill.js           # Post-execution processing
├── agents/
│   └── my-skill-reviewer.md    # Sub-agent for quality review
└── styles/
    └── my-skill-format.md      # Custom output rendering
```

### 2.3 Why This Stack Matters

Each layer solves a specific problem:

| Layer | Problem Solved | Without It |
|-------|---------------|------------|
| SKILL.md | "How do I do this task?" | Agent guesses, output is inconsistent |
| TEMPLATE.md | "What should the output look like?" | Output structure varies wildly |
| EXAMPLE.md | "Show me a real one" | Agent has no concrete reference |
| Frameworks | "What mental models apply?" | Agent uses generic reasoning |
| Commands | "How do I invoke this easily?" | User must describe the task verbally |
| Hooks | "Can this happen automatically?" | Every step requires manual invocation |
| Agents | "Can this run in the background?" | Everything competes for context |
| Styles | "Can the output look professional?" | Generic formatting |

---

## 3. Component Deep-Dives

### 3.1 SKILL.md — The Core Instructions

**Purpose**: Tell the AI agent *how* to perform a specific task, *what* output to produce, and *when* to use this skill.

**Critical sections**:

| Section | Purpose | Impact on Quality |
|---------|---------|------------------|
| **Frontmatter** | Machine-readable metadata (name, description, version) | Determines when skill activates |
| **Description** (in frontmatter) | The trigger — when should this skill load? | Most important field for skill relevance |
| **Purpose** | Human explanation of why this skill exists | Helps agent understand intent |
| **When to Use / Not Use** | Boundaries of applicability | Prevents misuse and over-triggering |
| **Instructions** | Step-by-step workflow | Determines output quality |
| **Output Contract** | What the output must contain | Ensures completeness |
| **Quality Criteria** | What "good" looks like | Enables self-assessment |

**The Description Field is Everything**: The `description` in frontmatter is how the AI decides whether to load a skill. A vague description ("helps with planning") triggers on everything. A precise description ("Create a Product Requirements Document with functional requirements, success metrics, and scope boundaries for a specific product feature") triggers only when relevant.

**Instruction Design Patterns**:

```markdown
## Instructions

### Step 1: Gather Context
Ask the user about...
[Questions that establish scope]

### Step 2: Analyze
Consider the following frameworks...
[Domain-specific analysis guidance]

### Step 3: Draft Output
Using the template from references/TEMPLATE.md...
[Structure-specific guidance]

### Step 4: Verify
Before finalizing, check:
- [ ] All template sections are filled
- [ ] Metrics are measurable, not vague
- [ ] Scope boundaries are explicit
- [ ] Dependencies are identified
```

**What makes instructions great**:
1. **Steps with verification** — don't just list steps, include what to check after each
2. **Decision points** — "If the user has X, do Y; otherwise do Z"
3. **Anti-patterns** — "Do NOT do X because Y"
4. **Concrete examples inline** — "A good metric looks like 'Reduce checkout abandonment from 73% to 55%', not 'Improve checkout'"

### 3.2 TEMPLATE.md — The Output Contract

**Purpose**: Define the exact structure of the skill's output. The template is both a contract (what sections must exist) and a guide (what goes in each section).

**What makes templates powerful**:

1. **Section headers with guidance comments**: Not just `## Success Metrics` but `## Success Metrics\n<!-- 2-4 measurable metrics with baselines and targets. Use the SMART format. -->`

2. **Placeholder content that shows format**: Instead of `[enter text]`, use realistic placeholder text that demonstrates the expected level of detail.

3. **Conditional sections**: Mark sections as optional with clear triggers — "Include this section if the feature involves API changes."

4. **Cross-references**: "Refer to the Problem Statement (if available) for user impact data."

### 3.3 EXAMPLE.md — The Worked Example

**Purpose**: Show a complete, realistic skill output that the agent can use as a quality reference.

**What makes examples effective**:

1. **Realistic scenario**: Not a toy example, but something that looks like real work
2. **Complete**: Every template section filled, not truncated
3. **Annotated**: Comments explaining why certain choices were made
4. **Varied**: If possible, multiple examples showing different contexts

### 3.4 Commands — User Invocation

**Purpose**: Provide a slash command shortcut so users can invoke skills explicitly.

**Command frontmatter**:
```yaml
---
name: prd
description: Create a Product Requirements Document
arguments:
  - name: feature
    description: "The feature to write a PRD for"
    required: false
---
```

**What makes commands effective**:
- **Short name**: `/prd` not `/create-product-requirements-document`
- **Arguments**: Accept context inline (`/prd mobile checkout redesign`)
- **Rich description**: Help text that explains what the command produces
- **Cross-references**: "See also: /hypothesis, /user-stories"

### 3.5 Hooks — Event-Driven Automation

**Purpose**: Run scripts automatically at specific lifecycle events without requiring user invocation.

**Available hook events** (Claude Code):

| Event | When | Common Uses |
|-------|------|------------|
| `PreToolUse` | Before any tool executes | Validate inputs, check permissions |
| `PostToolUse` | After any tool executes | Process outputs, save artifacts |
| `Stop` | When agent stops generating | Generate summaries, clean up |
| `SessionStart` | Session begins | Load context, set up environment |
| `SessionEnd` | Session ends | Save state, generate reports |
| `UserPromptSubmit` | User sends a message | Analyze intent, route to skills |
| `SubagentStop` | Sub-agent completes | Aggregate results |
| `PreCompact` | Before context compression | Preserve critical state |
| `Notification` | External notification received | React to events |

**Hook design principles**:
1. **Idempotent**: Running the hook twice should produce the same result
2. **Fast**: Hooks block the main agent — keep execution under 1 second
3. **Safe**: Never delete or overwrite user files without confirmation
4. **Silent**: Don't spam the user with notifications unless there's an action needed
5. **Configurable**: Allow users to disable individual hooks

### 3.6 Sub-Agents — Autonomous Task Workers

**Purpose**: Spawn a fresh Claude instance with a clean context window to handle a specific task, then return results.

**Agent frontmatter**:
```yaml
---
name: my-reviewer
description: Review output for quality and completeness
subagent_type: general-purpose
model: haiku  # Use cheaper model for review tasks
tools: [Read, Glob, Grep]  # Limit available tools
---
```

**When to use agents vs. inline instructions**:

| Situation | Use Agent | Use Inline |
|-----------|----------|-----------|
| Task needs fresh context (no prior bias) | ✅ | |
| Task is token-expensive (large files to process) | ✅ | |
| Task can run in parallel with user interaction | ✅ | |
| Task needs user interaction mid-flow | | ✅ |
| Task is quick (< 30 seconds) | | ✅ |
| Task needs results immediately | | ✅ |

**Agent design principles**:
1. **Single responsibility**: Each agent does one thing well
2. **Clear output contract**: Specify exactly what the agent must return
3. **Model selection**: Use cheaper models (Haiku, Sonnet) for review/analysis tasks
4. **Tool restrictions**: Only give agents the tools they need
5. **Timeout awareness**: Set expectations for how long agents take

### 3.7 Output Styles — Custom Rendering

**Purpose**: Change how Claude formats its output for different audiences or contexts.

**Style definition**:
```markdown
---
name: executive-brief
description: Concise, decision-focused formatting for leadership audiences
---

When this style is active:
1. Lead every section with a one-sentence summary
2. Use bullet points instead of paragraphs
3. Bold key metrics and dates
4. Include a "Decisions Needed" callout box
5. Limit total output to 1000 words
6. End with "Next Steps" including owners and dates
```

**When to use output styles**:
- Different audiences need different artifact formats
- The same skill produces different levels of detail
- Professional polish is needed for external-facing documents

### 3.8 MCP Servers — Programmatic Access

**Purpose**: Expose skill capabilities as typed tools and resources via the Model Context Protocol.

**MCP adds**:
- Tool invocation from any MCP-compatible client
- Resource access (templates, examples) via URI scheme
- Prompt starters for guided invocation
- Workflow orchestration via server-side logic

---

## 4. Cross-Platform Compatibility Matrix

### 4.1 Component Support by Platform

| Component | Claude Code CLI | VS Code Copilot | Codex CLI | Gemini CLI | Cursor | Claude Desktop |
|-----------|----------------|-----------------|-----------|-----------|--------|---------------|
| **SKILL.md** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Nightly | ⚠️ Manual |
| **references/** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ | ⚠️ Manual |
| **Commands** | ✅ Full | ⚠️ Partial | ❌ | ❌ | ⚠️ Partial | ❌ |
| **Hooks** | ✅ Full | ⚠️ Preview | ❌ | ❌ | ❌ | ❌ |
| **Sub-agents** | ✅ Full | ✅ (custom agents) | ✅ Cloud | ✅ | ✅ | ❌ |
| **Output styles** | ✅ Plugin | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MCP** | ✅ Full | ✅ Full | ❌ | ❌ | ✅ | ✅ |
| **Plugins** | ✅ 9000+ | ✅ Extensions | ❌ | ❌ | ❌ | ❌ |
| **Memory** | ✅ File-based | ⚠️ Limited | ❌ | ❌ | ❌ | ❌ |

### 4.2 Portability Strategy

**Maximize portability**: Keep critical content in SKILL.md + references/. These work everywhere.

**Enhance where possible**: Add commands, hooks, agents, and styles for Claude Code. These are additive — their absence doesn't break the skill.

**Never depend on non-portable features for core functionality**: A skill should produce good output even without hooks or agents. These should improve the experience, not enable it.

---

## 5. Skill Design Patterns

### 5.1 Pattern: Progressive Disclosure

Load information lazily — SKILL.md provides the workflow, references/ provide detail when needed.

```markdown
## Instructions

### Step 3: Apply Framework
Read the SWOT framework from `references/frameworks/swot.md` and apply it to...
```

The agent only loads the SWOT framework when Step 3 is reached, saving tokens.

### 5.2 Pattern: Productive Absence

Deliberately omit detail from SKILL.md that exists in references. This forces the agent to engage with the reference material rather than relying on general knowledge.

### 5.3 Pattern: Guard Rails

Include explicit constraints to prevent common failure modes:

```markdown
## What NOT to Do
- Do NOT use placeholder metrics like "improve by X%"
- Do NOT list more than 5 success criteria
- Do NOT skip the scope boundaries section
- Do NOT assume the user's technical context
```

### 5.4 Pattern: Artifact Chain

Design skills that reference each other's outputs:

```markdown
## Prerequisites
This skill works best when the following artifacts already exist:
- Problem Statement (from /problem-statement)
- Hypothesis (from /hypothesis)

If these don't exist, ask the user for the equivalent information.
```

### 5.5 Pattern: Multi-Mode Skill

Support different invocation modes within a single skill:

```markdown
## Modes

### Default Mode
Full guided workflow with all steps.

### Quick Mode (/prd --quick)
Abbreviated workflow — skip discovery questions, use defaults.

### Revision Mode (/prd --revise)
Update an existing PRD with new information.

### Audit Mode (/prd --audit)
Review an existing PRD against the template for completeness.
```

### 5.6 Pattern: Context-Aware Behavior

Adapt behavior based on what context is available:

```markdown
## Instructions

### Step 1: Assess Available Context

Check if the following are available:
- Active project with existing artifacts → use them as input
- Previous conversation context → build on it
- Neither → start from scratch with guided questions

Adjust your approach accordingly.
```

---

## 6. Anti-Patterns & Common Mistakes

### 6.1 The "Kitchen Sink" Skill

**Problem**: A skill that tries to do everything — analyze, plan, execute, verify, and reflect — all in one SKILL.md.

**Why it fails**: Token bloat, lost focus, poor output quality. The agent tries to address all instructions simultaneously and produces shallow output across all areas.

**Fix**: Split into focused skills that chain together. Each skill does one thing well.

### 6.2 The "Vague Description" Skill

**Problem**: A skill with `description: "Helps with product management tasks"`.

**Why it fails**: Triggers on everything remotely PM-related, consuming context unnecessarily. Or worse, doesn't trigger when it should because the description doesn't match the user's specific intent.

**Fix**: Be precise — `description: "Create a Product Requirements Document with functional requirements, success metrics, and scope boundaries for a specific product feature"`.

### 6.3 The "Wall of Text" Instruction

**Problem**: Instructions that read like a textbook — paragraphs of theory before any actionable steps.

**Why it fails**: Agents process instructions sequentially. If the first 2000 tokens are theory, the agent front-loads theory into its output instead of executing the workflow.

**Fix**: Lead with steps. Put theory in references. Use progressive disclosure.

### 6.4 The "Unverifiable" Output

**Problem**: No output contract or quality criteria. The skill says "create a good PRD" but doesn't define what "good" means.

**Why it fails**: Output quality is inconsistent. No way to evaluate or improve the skill over time.

**Fix**: Include an explicit Output Contract and Quality Criteria section:
```markdown
## Output Contract
The output MUST include:
- [ ] Executive summary (< 200 words)
- [ ] 3-7 functional requirements with acceptance criteria
- [ ] 2-4 measurable success metrics with baselines
- [ ] Explicit scope boundaries (in/out)
```

### 6.5 The "Platform-Locked" Skill

**Problem**: A skill that only works on one platform because it depends on platform-specific features in its core instructions.

**Why it fails**: Limits adoption and portability. The agentskills.io standard exists precisely to avoid this.

**Fix**: Keep core instructions platform-agnostic. Use hooks and agents as enhancements, not requirements.

---

## 7. Token Economy

### 7.1 Token Budget Awareness

Every token in a skill's instructions competes with the user's actual content for context window space. A 5000-token SKILL.md leaves less room for the user's PRD content.

**Budget guidelines**:

| Component | Ideal Size | Maximum |
|-----------|-----------|---------|
| SKILL.md | 1000-3000 tokens | 5000 tokens |
| TEMPLATE.md | 500-1500 tokens | 3000 tokens |
| EXAMPLE.md | 1000-3000 tokens | 5000 tokens |
| Reference files | 500-2000 tokens each | 3000 tokens each |
| Total loaded at once | < 5000 tokens | 10000 tokens |

### 7.2 Progressive Loading Strategy

```
Always loaded:  SKILL.md frontmatter description (triggers skill)   ~100 tokens
On activation:  SKILL.md full content                                ~2000 tokens
On demand:      TEMPLATE.md (when drafting output)                   ~1000 tokens
On demand:      EXAMPLE.md (when agent needs reference)              ~2000 tokens
On demand:      Reference files (when specific step needs them)      ~500-2000 each
```

### 7.3 Token-Saving Techniques

1. **Use references/ liberally** — move detail out of SKILL.md
2. **Keep SKILL.md lean** — workflow steps, not theory
3. **Compress examples** — use annotated snippets, not full documents
4. **Avoid repetition** — say it once, in the right place
5. **Use structured data** — tables are more token-efficient than paragraphs for comparisons

---

## 8. Evaluation & Quality

### 8.1 Skill Evaluation Dimensions

| Dimension | What to Measure | How |
|-----------|----------------|-----|
| **Trigger accuracy** | Does the skill activate when relevant and stay quiet when not? | Run 20 prompts, 10 relevant + 10 not |
| **Output completeness** | Does output include all required sections? | Check against Output Contract |
| **Output quality** | Is the content specific, actionable, evidence-based? | Expert review or grader agent |
| **Instruction clarity** | Does the agent follow steps in order? | Observe execution flow |
| **Token efficiency** | How many tokens does the skill consume? | Measure loaded tokens |
| **Cross-platform consistency** | Same output quality on different platforms? | Test on 3+ platforms |

### 8.2 Evaluation Approaches

**Manual review**: Read the output, check it against the template. Simple, effective, doesn't scale.

**Grader agents**: A sub-agent that reads the output and scores it against criteria. Scalable but requires careful grader design.

**A/B testing**: Run the same prompt with two skill versions, compare outputs. Useful for optimization.

**User feedback**: Ask actual users whether the output was useful. The gold standard but slow to collect.

---

## 9. Distribution & Discovery

### 9.1 Distribution Channels

| Channel | Reach | Control | Setup Effort |
|---------|-------|---------|-------------|
| GitHub repo | Global | Full | Low |
| npm package (via MCP) | Global | Full | Medium |
| Claude Code plugin | Claude Code users | Full | Medium |
| Anthropic marketplace | Claude Code + directory | Moderate (review) | High |
| agentskills.io registry | All platforms | Low | Low |
| AGENTS.md in any repo | Project-specific | Full | Trivial |

### 9.2 Discovery Mechanisms

How does an agent find and load skills?

| Platform | Discovery Method |
|----------|-----------------|
| Claude Code | Plugin manifest → skill directory scan |
| VS Code Copilot | AGENTS.md + workspace skills |
| Codex | Agent skills in repo + linked skills |
| Gemini CLI | .gemini/skills/ directory |
| Cursor | Workspace skills (nightly) |

### 9.3 The "Description" Optimization Problem

The skill `description` field is the single most important line for discovery. It determines:
1. Whether the skill loads at all
2. Whether it loads at the right time
3. Whether users can find it in skill lists

**Optimization approach**: Write the description as if it's a search query match target. Include the key verbs (create, analyze, review), the key nouns (PRD, hypothesis, retrospective), and the key context (product feature, sprint, experiment).

---

## 10. Future Directions

### 10.1 Skill Composition

Today, skills are mostly standalone. The future is composable skills that chain, branch, and merge:

```
/kickoff
  → /problem-statement (auto-feeds context to...)
    → /hypothesis (auto-feeds context to...)
      → /prd (auto-feeds context to...)
        → /user-stories
```

### 10.2 Adaptive Skills

Skills that adjust their behavior based on:
- User's expertise level (beginner vs. expert PM)
- Project phase (discovery produces different output than iteration)
- Accumulated project context (adapts to what's already been created)

### 10.3 Community Skill Ecosystems

As platforms mature, expect:
- Skill marketplaces (Anthropic's directory is early)
- Quality ratings and reviews
- Skill versioning and dependency management
- Domain-specific skill bundles (PM, UX, engineering, marketing)

### 10.4 Agent-Native Skills

Skills designed from the ground up for multi-agent execution:
- "Research agent" skills that assume web search access
- "Review agent" skills that assume fresh context
- "Orchestrator" skills that coordinate multiple agents

---

## Sources

- [agentskills.io Specification](https://agentskills.io/specification) — The open standard
- [Claude Code Plugins Documentation](https://code.claude.com/docs/en/plugins) — Full component reference
- [Claude Code Plugin Reference](https://code.claude.com/docs/en/plugins-reference) — Manifest schema
- [Anthropic Agent Skills Standard](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard) — Enterprise context
- [Claude Code Extensions Explained](https://muneebsa.medium.com/claude-code-extensions-explained-skills-mcp-hooks-subagents-agent-teams-plugins-9294907e84ff) — Component overview
- [GSD Framework](https://github.com/gsd-build/get-shit-done) — Spec-driven development reference
- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) — Copilot skills
- [Gemini CLI Agent Skills](https://geminicli.com/docs/cli/skills/) — Gemini integration
- [Cursor Agent Skills](https://cursor.com/docs/context/skills) — Cursor skills
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) — Copilot reference
- [OpenAI Codex CLI](https://developers.openai.com/codex/cli) — Codex capabilities
- [AI Agent Skills Guide 2026](https://serenitiesai.com/articles/agent-skills-guide-2026) — Cross-platform guide
