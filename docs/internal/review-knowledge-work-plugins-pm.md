# Comparative Review: knowledge-work-plugins/product-management

Date: 2026-02-20
Repository compared: [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) at commit `3449ebae`
Subdirectory: `product-management/`

---

## Purpose

This document compares Anthropic's official product-management plugin (shipped in `knowledge-work-plugins` for the Cowork desktop app) against pm-skills. The goal is to identify design patterns, architectural choices, and content approaches that could strengthen pm-skills, as well as areas where pm-skills is already ahead.

---

## Repository at a glance

| Dimension | knowledge-work-plugins/product-management | pm-skills |
|---|---|---|
| Skills | 6 | 24 |
| Commands | 6 | 25 |
| Bundles / workflows | None | 3 |
| Target platform | Cowork (Anthropic desktop app), also Claude Code | 8+ platforms (Claude Code, Claude.ai, Copilot, Cursor, Windsurf, VS Code, ChatGPT, MCP) |
| Spec compliance | Cowork plugin manifest (`.claude-plugin/plugin.json`) | agentskills.io specification |
| License | Apache 2.0 | Apache 2.0 |
| Author | Anthropic | Product on Purpose |
| Tool integration | 12 MCP servers across 7 categories, preconfigured in `.mcp.json` | Tool-agnostic; separate `pm-skills-mcp` repo |
| Output examples | None | TEMPLATE.md + EXAMPLE.md per skill |
| CI / validation | None visible | Frontmatter lint, command validation, release pipeline |

---

## Architecture comparison

### How skills work

**knowledge-work-plugins** separates concerns into two layers:

1. **Skills** = deep reference knowledge (frameworks, methodologies, templates, rating scales). They teach *how to think* about a domain. Example: the `roadmap-management` skill teaches RICE, MoSCoW, ICE, and value-vs-effort frameworks, along with dependency mapping and capacity planning.

2. **Commands** = interactive workflows (100-200 lines each). They guide the agent through a multi-step conversation: gathering context, asking clarifying questions, pulling from connected tools, generating output, and offering follow-ups. Commands reference skills for deeper guidance: "See the **roadmap-management** skill for RICE, MoSCoW, ICE, and value-vs-effort frameworks."

**pm-skills** uses a different model:

1. **Skills** = self-contained units combining instructions, template, and example (SKILL.md + TEMPLATE.md + EXAMPLE.md). They include both the workflow steps *and* the domain knowledge.

2. **Commands** = thin routing wrappers (~10 lines) that point to the skill and pass user arguments.

3. **Bundles** = multi-skill workflows with sequencing, timing, and transition guidance.

### Key structural difference

In knowledge-work-plugins, the command is the main event. In pm-skills, the skill is the main event. This leads to different strengths and weaknesses explored below.

---

## Seven learnings from knowledge-work-plugins

### 1. Richer interactive workflows in commands

**The gap:** pm-skills commands are routing stubs. knowledge-work-plugins commands are rich interactive workflows with branching logic, conversational guidance, and follow-up offers.

**Their pattern (e.g., `/write-spec` command, ~120 lines):**

```
Step 1: Understand the feature
  - Accept vague input ("we should do something about onboarding drop-off")
  - Accept specific input ("SSO support for enterprise")

Step 2: Gather context conversationally
  - "Be conversational — do not dump all questions at once"
  - Ask about user problem, target users, success metrics, constraints, prior art

Step 3: Pull from connected tools (graceful degradation)
  - If ~~project tracker connected → search related tickets
  - If ~~knowledge base connected → search for prior specs
  - If tools not connected → work from user input, don't ask to connect

Step 4: Generate the PRD
  - Reference the feature-spec skill for detailed guidance

Step 5: Review and iterate
  - Ask if sections need adjustment
  - Offer follow-up artifacts (design brief, ticket breakdown, stakeholder pitch)
```

**pm-skills equivalent (`/prd` command, 11 lines):**

```
Use the deliver-prd skill. Read SKILL.md and follow instructions.
Use TEMPLATE.md as output format.
Context from user: $ARGUMENTS
```

**Impact:** The thin command model means all conversational orchestration burden falls on the agent interpreting the skill. knowledge-work-plugins makes the interaction pattern explicit, which produces more consistent user experiences across different agent runtimes.

**Recommendation:** Enrich high-traffic commands (prd, competitive-analysis, stakeholder-summary, experiment-design) with interactive workflow guidance. Keep skills as the domain knowledge layer, but let commands own the conversation flow.

**Effort:** Medium. Priority: High.

---

### 2. Tool-agnostic connector pattern (`~~category` placeholders)

**The pattern:** knowledge-work-plugins uses `~~category` placeholders throughout commands:

```markdown
If **~~project tracker** is connected:
- Search for related tickets, epics, or features
- Pull in any existing requirements or acceptance criteria

If **~~knowledge base** is connected:
- Search for related research documents, prior specs
```

A `CONNECTORS.md` file documents 7 categories (Chat, Project tracker, Knowledge base, Design, Product analytics, User feedback, Meeting transcription) with included servers and alternatives. An `.mcp.json` preconfigures 12 MCP servers.

**Why it works:** Skills gracefully degrade — they work with zero tools but get richer with integrations. The agent never asks users to connect tools; it just uses what's available.

**pm-skills today:** No equivalent pattern. Skills are designed to work with manual user input. The separate `pm-skills-mcp` repo provides MCP integration but skills themselves don't reference tool categories.

**Recommendation:** Design a connector placeholder convention for pm-skills. This would let skills say "if a project tracker is available, pull context from it" without coupling to specific tools. This is especially valuable for discover-phase skills (competitive-analysis, interview-synthesis, stakeholder-summary) and deliver-phase skills (prd, launch-checklist) that benefit from pulling existing context.

**Effort:** Medium. Priority: Medium.

---

### 3. Conversational UX guidance

**The pattern:** knowledge-work-plugins commands include explicit directives for *how* the agent should interact:

- "Be conversational — do not dump all questions at once. Ask the most important ones first and fill in gaps as you go."
- "Accept any of: a feature name, a problem statement, a user request, a vague idea"
- "Do not ask the user to connect tools — just proceed with available information."
- "After generating: ask if sections need adjustment, offer to expand, offer follow-up artifacts"

**pm-skills today:** Instructions are prescriptive ("follow these 8 steps") but don't coach the agent on interaction style. This means the agent's conversational behavior varies by runtime and model.

**Recommendation:** Add interaction guidance to skill instructions or commands. Key patterns to encode:
- How to handle vague vs. specific input
- When to ask clarifying questions vs. make reasonable assumptions
- What follow-up artifacts to offer after generation
- How to handle partial information gracefully

**Effort:** Low. Priority: High.

---

### 4. Cross-skill referencing

**The pattern:** knowledge-work-plugins commands explicitly reference skills for deeper guidance:

- `/write-spec`: "See the **feature-spec** skill for detailed guidance on user stories, requirements categorization, acceptance criteria, and success metrics."
- `/roadmap-update`: "See the **roadmap-management** skill for RICE, MoSCoW, ICE, and value-vs-effort frameworks"
- `/stakeholder-update`: "See the **stakeholder-comms** skill for detailed templates, G/Y/R status definitions, and the ROAM risk communication framework."
- `/metrics-review`: "Structure the review using the metrics hierarchy from the **metrics-tracking** skill"

**pm-skills today:** Skills are self-contained. Bundles chain skills sequentially, but individual skills don't cross-reference each other for supplementary knowledge. A user running `/prd` doesn't get pointed to `define-problem-statement` for better problem framing.

**Recommendation:** Add "Related Skills" references within skill instructions. Natural pairings:
- `deliver-prd` → references `define-problem-statement`, `deliver-user-stories`
- `discover-competitive-analysis` → references `define-hypothesis` (for strategic hypotheses)
- `measure-experiment-design` → references `define-hypothesis`, `measure-instrumentation-spec`
- `iterate-pivot-decision` → references `measure-experiment-results`, `define-hypothesis`

This could use a new optional frontmatter field (`related_skills`) or inline references in instructions.

**Effort:** Low. Priority: Medium.

---

### 5. Audience-aware output tailoring

**The pattern:** knowledge-work-plugins' `/stakeholder-update` command tailors output by audience:

- **Executives**: TL;DR, G/Y/R status, progress tied to goals, risks with mitigation. Under 300 words.
- **Engineering**: What shipped (with links), what's in progress (with owners), blockers, decisions needed (with options and recommendation).
- **Cross-functional partners**: What affects them, what you need from them (with deadlines).
- **Customers**: Benefits-focused, clear timelines, no internal jargon.

Their `/competitive-brief` similarly offers derivative formats: one-page exec summary, sales battle cards, "how to win" guides.

**pm-skills today:** Templates produce a single output format regardless of audience.

**Recommendation:** For skills where audience matters (stakeholder-summary, release-notes, competitive-analysis), add audience-awareness to instructions. This could be:
- A "Tailor for Audience" optional step in instructions
- Audience-specific guidance in the quality checklist
- A follow-up offer to reformat for different audiences

**Effort:** Medium. Priority: Low-Medium.

---

### 6. Opinionated "Tips" sections with PM practitioner wisdom

**The pattern:** Every knowledge-work-plugins command ends with sharp, opinionated advice from PM experience:

From `/write-spec`:
> "Be opinionated about scope. It is better to have a tight, well-defined spec than an expansive vague one."
> "If the user's idea is too big for one spec, suggest breaking it into phases and spec the first phase."

From `/roadmap-update`:
> "A roadmap is a communication tool, not a project plan. Keep it at the right altitude — themes and outcomes, not tasks."
> "If the user asks to add something, always ask what comes off or moves. Roadmaps are zero-sum against capacity."

From `/competitive-brief`:
> "Be honest about competitor strengths. Dismissing competitors makes the analysis useless."
> "Job postings are underrated competitive intelligence. A competitor hiring ML engineers signals a strategic direction."

From `/metrics-review`:
> "Segment analysis often reveals that an aggregate metric masks important differences. A flat overall number might hide one segment growing and another shrinking."

**pm-skills today:** Skills have quality checklists (verification criteria), but lack this kind of opinionated practitioner wisdom. Checklists verify structure; tips encode judgment.

**Recommendation:** Add a "Tips" or "Common Pitfalls" section to skill instructions. Place it after the quality checklist. Focus on judgment calls that distinguish good PM artifacts from mediocre ones. Keep tips sharp and specific, not generic.

**Effort:** Low. Priority: Medium.

---

### 7. Deeper framework reference knowledge

**The pattern:** knowledge-work-plugins skills go deep on specific frameworks:

- **metrics-tracking**: Full North Star → L1 (acquisition, activation, engagement, retention, monetization, satisfaction) → L2 diagnostic hierarchy. Common product metrics definitions (DAU/WAU/MAU, retention curves, conversion funnels). Dashboard design principles and anti-patterns. Review cadences (weekly, monthly, quarterly).

- **roadmap-management**: Four roadmap formats (Now/Next/Later, Quarterly Themes, OKR-Aligned, Timeline/Gantt). Four prioritization frameworks with scoring formulas (RICE with calculation example, MoSCoW, ICE, Value vs Effort). Capacity planning with 70/20/10 rule.

- **stakeholder-comms**: G/Y/R status definitions with explicit criteria for each color. ROAM risk framework (Resolved, Owned, Accepted, Mitigated). ADR (Architecture Decision Record) format. Meeting facilitation templates for 5 meeting types.

- **competitive-analysis**: Competitive set taxonomy (direct, indirect, adjacent, substitute). Positioning statement analysis framework. Win/loss interview question bank. Market trend analysis with signal-vs-noise separation.

**pm-skills today:** Skills focus on workflow steps and output structure. Framework depth is shallower because skills balance being both a reference and a workflow. For example, pm-skills' competitive analysis teaches a solid 7-step process but doesn't go as deep on positioning analysis frameworks or win/loss methodology as knowledge-work-plugins does.

**Recommendation:** This is the most architecturally complex change. Options:
1. **Lightweight**: Add framework summaries inline in skill instructions where relevant
2. **Medium**: Create a `docs/frameworks/` reference library that skills can point to
3. **Heavy**: Separate skills into "workflow" and "reference" layers (fundamentally changes the architecture)

Option 1 is recommended as a starting point. The existing three-layer model works well — enriching the instruction layer with key framework details is lower-risk than structural changes.

**Effort:** Medium-High. Priority: Low.

---

## What pm-skills already does better

These are areas where pm-skills is ahead and should be preserved:

### Three-layer output model (SKILL + TEMPLATE + EXAMPLE)

knowledge-work-plugins ships no templates or examples. Every skill in pm-skills has a structured TEMPLATE.md with section headers and placeholder guidance, plus a complete EXAMPLE.md showing a real artifact. This is a significant quality advantage — it produces more consistent outputs and sets clear expectations.

### Breadth and phase coverage

24 skills across 6 Triple Diamond phases vs. 6 skills. pm-skills covers the full PM lifecycle including areas knowledge-work-plugins doesn't touch: hypothesis formulation, JTBD canvas, opportunity trees, ADRs, design rationale, spike summaries, edge cases, launch checklists, instrumentation specs, experiment design/results, pivot decisions, retrospectives, lessons logs, and refinement notes.

### Workflow bundles

Feature Kickoff, Lean Startup, and Triple Diamond bundles compose skills into opinionated workflows with sequencing, timing estimates, transition criteria, and optional extensions. knowledge-work-plugins has no equivalent.

### Platform portability

agentskills.io compliance means pm-skills works across 8+ platforms out of the box. knowledge-work-plugins is Cowork-first with Claude Code as secondary.

### Production operations

Frontmatter linting, command validation scripts, release packaging pipeline, semantic versioning per skill, governance documentation, agent coordination via AGENTS/ directory. knowledge-work-plugins has none of this infrastructure.

### Quality checklists

Every skill ends with a verification checklist. knowledge-work-plugins has tips but no structured quality gates.

---

## Priority action matrix

| # | Learning | What to do | Effort | Priority |
|---|---|---|---|---|
| 1 | Rich interactive commands | Enrich top commands with conversational workflow, branching, follow-ups | Medium | High |
| 3 | Conversational UX guidance | Add interaction style directives to skills/commands | Low | High |
| 6 | PM practitioner tips | Add "Tips / Common Pitfalls" sections to skills | Low | Medium |
| 4 | Cross-skill references | Add "Related Skills" links within instructions | Low | Medium |
| 2 | Tool connector placeholders | Design `~~category` convention for optional tool integration | Medium | Medium |
| 5 | Audience-aware output | Add audience tailoring to key skills | Medium | Low-Medium |
| 7 | Deeper framework knowledge | Enrich instruction sections with key framework details | Medium-High | Low |

---

## Appendix: File inventory of knowledge-work-plugins/product-management

```
product-management/
├── .claude-plugin/plugin.json          # Plugin manifest for Cowork
├── .mcp.json                           # 12 preconfigured MCP servers
├── CONNECTORS.md                       # Tool category mapping (7 categories)
├── LICENSE                             # Apache 2.0
├── README.md                           # Installation, commands, skills, examples
├── commands/
│   ├── competitive-brief.md            # ~115 lines
│   ├── metrics-review.md               # ~130 lines
│   ├── roadmap-update.md               # ~120 lines
│   ├── stakeholder-update.md           # ~100 lines
│   ├── synthesize-research.md          # ~135 lines
│   └── write-spec.md                   # ~95 lines
└── skills/
    ├── competitive-analysis/SKILL.md   # Landscape mapping, feature matrices, positioning, win/loss
    ├── feature-spec/SKILL.md           # PRD structure, user stories, MoSCoW, acceptance criteria
    ├── metrics-tracking/SKILL.md       # North Star/L1/L2 hierarchy, OKRs, dashboards, cadences
    ├── roadmap-management/SKILL.md     # RICE/MoSCoW/ICE/Value-Effort, formats, dependencies
    ├── stakeholder-comms/SKILL.md      # Audience templates, G/Y/R, ROAM, ADRs, meeting types
    └── user-research-synthesis/SKILL.md # Thematic analysis, affinity mapping, personas, opportunity sizing
```

15 files total. ~2,500 lines of content across commands and skills.
