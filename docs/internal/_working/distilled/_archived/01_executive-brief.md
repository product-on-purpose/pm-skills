# PM-Skills Strategic Brief

> **Date**: 2026-03-21 | **Author**: Claude Opus 4.6 | **Status**: Distilled from 11 exploration documents
> **Detailed source material**: `docs/internal/_working/topic-{1-4}_*.md`

---

## The One-Line Summary

pm-skills has the best PM skill content in the AI agent ecosystem — now it needs the infrastructure to become a workspace, not just a library.

---

## 1. Multi-Project Structure

### Decision: Plugin-integrated project workspace

PMs work on 3-8 projects simultaneously. pm-skills creates artifacts in isolation — no project grouping, no context persistence, no document relationships. This is the #1 gap.

**What to build**: A `/project` command + workspace directory structure, integrated into the existing pm-skills plugin. Not a separate repo.

**Architecture**:
```
~/pm-projects/                      # User's workspace (configurable path)
├── .pm-config.yaml                 # Active project + settings
├── PROJECT_INDEX.md                # All projects at a glance
├── acme-checkout/                  # One directory per project
│   ├── PROJECT.md                  # Context, phase, stakeholders (<500 tokens)
│   ├── artifacts/{phase}/          # Skill outputs organized by Triple Diamond phase
│   ├── inputs/                     # Transcripts, notes for processing
│   └── links.yaml                  # Document relationships (Phase 2)
└── beta-mobile/
    └── ...
```

**Why not a separate repo?** Adds friction (two repos to clone), splits community, complicates docs. The plugin approach means `plugin install pm-skills` gives you both skills and project management.

**Why not GSD's model?** GSD is single-project-per-repo. PMs need multi-project. But GSD's state management patterns (STATE.md, ROADMAP.md, milestone archiving) should be borrowed.

**Key risk**: Hook-based auto-save of skill output is platform-specific (Claude Code only). Design the workspace so it works without hooks — automation is a convenience layer, not a requirement.

---

## 2. Holistic Platform Value

### Decision: Layered architecture — cross-platform core + Claude Code extensions

pm-skills uses 2 of 8 available Claude Code component types (skills + commands). The expansion should add hooks, agents, and output styles — but only as an enhancement layer, not as a dependency.

**Three layers**:

| Layer | Components | Works On |
|-------|-----------|----------|
| **Core** | 25+ skills, 26+ commands, 3+ bundles | All 6+ platforms (agentskills.io) |
| **Claude Code** | Hooks, agents, output styles | Claude Code CLI only |
| **MCP** | pm-skills-mcp server | MCP-enabled platforms |

**Highest-value Claude Code extensions**:
1. **SessionStart hook** — auto-load active project context (eliminates "re-explain everything")
2. **PostToolUse hook** — auto-save artifacts to project directory (eliminates "where did my PRD go?")
3. **`pm-executive` output style** — concise, decision-focused formatting for stakeholder-facing artifacts
4. **Transcript processing agent** — sub-agent that extracts insights from meeting notes and maps them to project artifacts

**Platform comparison finding**: pm-skills works on 26+ platforms via agentskills.io. No competitor combines PM domain expertise + cross-platform portability + open source. The strategic moat is content quality, not platform lock-in.

**What NOT to build**: Agent Teams (multi-agent coordination) — cool but rarely needed. Full PM delivery framework — let the model emerge from usage. Enterprise features — premature at current community scale.

---

## 3. PM Skill Builder

### Decision: CI pipeline first, then the builder skill

Two independent value streams that are often conflated:

**Stream A: CI validation pipeline** (highest standalone value)
- GitHub Actions workflow that validates every PR touching `skills/` or `commands/`
- Checks: frontmatter schema, 3-file completeness, naming conventions, AGENTS.md consistency, MCP impact advisory
- Why first: enables community contributions, catches convention violations, foundation for everything downstream

**Stream B: `/skill-builder` command** (second highest value)
- Interactive skill that guides contributors from "I have an idea" to a Skill Implementation Packet
- Workflow: gap analysis → Why Gate → repo-fit assessment → classification → implementation packet
- Output: concrete draft files (SKILL.md, TEMPLATE.md, EXAMPLE.md, command) ready for PR

**Two skills confirmed** (from prior Opus/GPT-5.4 convergence):
- `/pm-skill-builder` (utility) — repo-specific, ships first
- `/skill-builder` (foundation) — PM-oriented skill design for any context, ships second

**Web/Codex feasibility**: Claude Code CLI handles the full lifecycle. Claude Code web handles scaffold + author. Codex can autonomously generate skill files from a completed spec. CI handles validation regardless of authoring platform.

**Release automation**: Tag → GitHub release → auto-generate release notes → trigger MCP sync PR in pm-skills-mcp. Replaces current manual process.

---

## 4. Roadmap

### Decision: Utility infrastructure before new domain skills

**The biggest gap isn't missing PM skills — it's missing infrastructure.** The 6 domain phases are 70-90% covered. Foundation and utility skills are 0% covered. Building infrastructure multiplies the value of every existing skill.

**Priority-ordered backlog**:

| # | What | Type | Why First |
|---|------|------|-----------|
| 1 | CI validation pipeline | Infrastructure | Foundation for quality + community |
| 2 | `utility-pm-skill-builder` | Skill | Enables skill creation at scale |
| 3 | `utility-project-manager` | Skill | Solves #1 daily pain point |
| 4 | Release automation | Infrastructure | Reduces maintainer toil |
| 5 | `utility-doc-updater` | Skill | Solves "start over" problem |
| 6 | SessionStart + PostToolUse hooks | Platform | Automates context + artifact saving |
| 7 | `foundation-skill-builder` | Skill | Helps PMs create skills for any context |
| 8 | `deliver-acceptance-criteria` | Domain skill | Quick win, extends user-stories |
| 9 | `discover-market-sizing` | Domain skill | Fills discovery gap |
| 10 | `measure-survey-analysis` | Domain skill | Fills measurement gap |

**Release timeline**:
- **v2.7**: CI pipeline + pm-skill-builder + marketplace submission
- **v2.8**: Project manager + release automation + hooks
- **v2.9**: Doc updater + link-docs + foundation-skill-builder + output styles
- **v3.0**: New domain skills + transcript processing + convention alignment + full platform integration

---

## Critical Path

```
CI Pipeline ──→ pm-skill-builder ──→ convention alignment
     │
     └──→ release automation ──→ MCP sync automation
     │
     └──→ community issue template ──→ Codex task templates

Project Manager ──→ Doc Updater ──→ Transcript Processing

Plugin manifest ──→ Hooks ──→ Output styles
```

**The CI pipeline is the single enabler.** Everything downstream depends on it.

---

## Open Decisions Needed

| Decision | Options | Impact |
|----------|---------|--------|
| Workspace location | `~/pm-projects/` vs configurable vs CWD | Project manager design |
| Skill modification for project awareness | Inject context via command preamble vs modify skills | 25 skills affected or 0 |
| Two builder skills confirmed? | Yes (Approach A) vs just pm-skill-builder (Approach D) | Scope of v2.7 + v2.9 |
| MCP sync: automated or manual? | Automated dispatch vs manual trigger | Release workflow complexity |
| Separate pm-workspace repo eventually? | Yes (at scale) vs no (keep in plugin) | Long-term architecture |

---

## Sources

**Internal**: M-01 through M-04 efforts, M-11 plugin spec, skill-builder approach docs, MCP architecture, effort index, all 25 skills, CI workflows
**External**: [GSD Framework](https://github.com/gsd-build/get-shit-done), [agentskills.io](https://agentskills.io/specification), [Claude Code Plugins](https://code.claude.com/docs/en/plugins), [OpenAI Codex](https://developers.openai.com/codex/cli), [Gemini CLI Skills](https://geminicli.com/docs/cli/skills/), [Cursor Skills](https://cursor.com/docs/context/skills), [GitHub Copilot Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
