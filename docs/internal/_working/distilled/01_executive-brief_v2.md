# PM-Skills Strategic Brief (v2)

> **Date**: 2026-03-22 | **Author**: Claude Opus 4.6 | **Status**: Post-separation revision
> **Supersedes**: `01_executive-brief.md` (pre-separation, 2026-03-21)
> **Canonical backlog**: `04_next-efforts.md`

---

## What Changed in v2

| Section | Change | Why |
|---------|--------|-----|
| §1 Multi-Project Structure | **Removed from pm-skills scope** | Now Knowledge OS — separate repo, separate initiative |
| §2 Holistic Platform Value | **Narrowed** — hooks, output styles, transcript processing removed | All serve the workspace layer, not the skill library |
| §3 PM Skill Builder | Minor wording cleanup | Scope unchanged |
| §4 Roadmap | **Rewritten** to match `04_next-efforts.md` | 40% scope reduction; 9 efforts, not 10 |
| Critical Path | **Simplified** | Fewer moving parts after separation |
| Open Decisions | **Reduced** — workspace/hook decisions removed | No longer pm-skills decisions |

---

## The One-Line Summary

pm-skills has the best PM skill content in the AI agent ecosystem — now it needs extended CI, a clean public release boundary, a skill-builder, and marketplace presence to become community-ready.

---

## 1. Multi-Project Structure → Moved to Knowledge OS

> **This section is historical context.** Multi-project workspace, artifact persistence, document linking, and context loading are now a separate Product on Purpose initiative (working title: Knowledge OS / Folio). See `docs/internal/_working/knowledge/` for the full exploration.

**Why it moved**: The workspace problem is universal to all knowledge workers using AI, not PM-specific. It's a Layer 2 infrastructure concern. pm-skills is Layer 3 (domain skills). Trying to build both in one repo would create scope creep and identity confusion.

**What pm-skills keeps**: Skills generate artifacts. Where those artifacts live and how they relate to each other is Knowledge OS's problem.

---

## 2. Plugin Quality & Visibility

### Decision: Ship the skill library, not a workspace

pm-skills uses 2 of 8 available Claude Code component types (skills + commands). The near-term focus is making those two excellent, visible, and community-ready — not expanding to hooks, agents, and output styles.

**Three layers** (unchanged framing, but pm-skills focuses on Core):

| Layer | Components | Works On | pm-skills Focus |
|-------|-----------|----------|-----------------|
| **Core** | 25+ skills, 26+ commands, 3+ workflows | All 26+ platforms (agentskills.io) | **Yes — this is the product** |
| **Claude Code** | Hooks, agents, output styles | Claude Code CLI only | Deferred to Knowledge OS |
| **MCP** | pm-skills-mcp server | MCP-enabled platforms | Maintain, auto-sync via release automation |

**Near-term platform investments**:
1. **Anthropic marketplace submission** — puts pm-skills in front of every Claude Code user browsing the directory
2. **CI validation pipeline** — enables community contributions at quality
3. **Release ZIP boundary fix (M-16)** — stop shipping `docs/internal/**` to end users while keeping internal governance docs tracked in-repo
4. **Release automation** — reduces maintainer toil, keeps MCP in sync
5. **Community contribution infrastructure** — issue templates, PR templates, CONTRIBUTING.md

**Platform comparison finding**: pm-skills works on 26+ platforms via agentskills.io. No competitor combines PM domain expertise + cross-platform portability + open source. The strategic moat is content quality, not platform lock-in.

**What NOT to build (in pm-skills)**:
- Hooks (SessionStart, PostToolUse) — these serve the workspace, not the skill library → Knowledge OS
- Output styles — nice polish but not core skill library value → Knowledge OS
- Transcript processing agent — artifact processing is Layer 2 → Knowledge OS
- Agent Teams — cool but rarely needed at current scale

---

## 3. PM Skill Builder

### Decision: Extend CI first, then the builder skill

Two independent value streams that are often conflated:

**Stream A: CI validation enhancement** (highest standalone value)
- CI already validates frontmatter, naming, and file completeness via `lint-skills-frontmatter.sh` + `validate-commands.sh` (cross-platform, runs on every PR)
- Gaps to close: AGENTS.md consistency, MCP impact advisory, description length, template structure
- Why first: completes the safety net for community contributions; small effort (~0.5-1 day) since ~70% already exists

**Stream B: `/skill-builder` command** (second highest value)
- Interactive skill that guides contributors from "I have an idea" to a Skill Implementation Packet
- Workflow: gap analysis → Why Gate → repo-fit assessment → classification → implementation packet
- Output: concrete draft files (SKILL.md, TEMPLATE.md, EXAMPLE.md, command) ready for PR

**Naming decided — two distinct utility skills, both in pm-skills**:
- `/pm-skill-builder` — repo-specific, creates Skill Implementation Packets aligned with pm-skills architecture (6 phases, 3-file pattern, frontmatter conventions)
- `/agent-skill-builder` — teaches PMs to create agent skills for any context (team tools, product workflows, any platform), following agentskills.io spec without pm-skills-specific conventions

**Web/Codex feasibility**: Claude Code CLI handles the full lifecycle. Claude Code web handles scaffold + author. Codex can autonomously generate skill files from a completed spec. CI handles validation regardless of authoring platform.

**Release automation**: Tag → GitHub release → auto-generate release notes → trigger MCP sync PR in pm-skills-mcp. Replaces current manual process.

**Release packaging boundary**: The current short-term fix is M-16: exclude `docs/internal/**` from the published ZIP without moving or renaming the tracked internal docs tree. That keeps builder/release-governance artifacts out of end-user packages.

---

## 4. Roadmap

### Decision: Utility infrastructure before new domain skills

**The biggest gap isn't missing PM skills — it's missing infrastructure.** The 6 domain phases are 70-90% covered. Foundation and utility skills are 0% covered. Building infrastructure multiplies the value of every existing skill.

**Priority-ordered backlog** (aligned with `04_next-efforts.md`):

| # | What | Type | Why First |
|---|------|------|-----------|
| 0 | Anthropic marketplace submission | Quick win | Zero engineering, highest visibility-to-effort ratio |
| 1 | CI validation enhancement | Infrastructure | Close remaining gaps in existing CI |
| 2 | `deliver-acceptance-criteria` | Domain skill | Quick win, extends user-stories |
| 3 | Exclude `docs/internal/**` from release ZIP (M-16) | Infrastructure | Keeps internal governance docs out of the public artifact before `v2.7.0` ships |
| 4 | `utility-pm-skill-builder` | Skill | Enables skill creation at scale once CI and packaging boundary are in place |
| 5 | Convention alignment pass | Quality | Fix drift before community contributions |
| 6 | Release automation | Infrastructure | Reduces maintainer toil |
| 7 | Community contribution setup | Ecosystem | Issue templates, CONTRIBUTING.md |
| 8 | `discover-market-sizing` | Domain skill | Fills discovery gap |
| 9 | `measure-survey-analysis` | Domain skill | Fills measurement gap |

**Release timeline**:
- **v2.7**: CI pipeline + `deliver-acceptance-criteria` + release packaging hygiene (M-16) + pm-skill-builder + marketplace submission
- **v2.8**: Convention alignment + release automation
- **v2.9**: Community setup + new domain skills

---

## Critical Path

```
Marketplace submission (independent, do first)

CI Enhancement ──→ pm-skill-builder ──→ convention alignment
     │
     └──→ release automation ──→ MCP sync automation
     │
     └──→ community issue template ──→ CONTRIBUTING.md update
```

**The CI enhancement is the single enabler.** Everything downstream depends on a complete validation safety net. The marketplace submission is independent and should happen immediately.

---

## Open Decisions Needed

| Decision | Options | Impact |
|----------|---------|--------|
| Skill-builder v1 scope | Create mode only vs create + revise + audit | v2.7 delivery size |
| MCP sync: automated or manual? | Automated dispatch (needs PAT) vs manual trigger | Release workflow complexity |

**Decisions resolved**:
- ~~Two builder skills?~~ → **Decided**: both in pm-skills. `/pm-skill-builder` (repo-specific) and `/agent-skill-builder` (general PM capability)
- ~~Naming?~~ → **Decided**: `utility-pm-skill-builder` + `utility-agent-skill-builder`, commands `/pm-skill-builder` + `/agent-skill-builder`

**Decisions no longer needed** (moved to Knowledge OS):
- ~~Workspace location (`~/pm-projects/` vs configurable vs CWD)~~
- ~~Skill modification for project awareness (inject context vs modify skills)~~
- ~~Separate pm-workspace repo eventually?~~

---

## Sources

**Internal**: M-09 effort (foundation/utility skills), M-11 plugin spec, skill-builder approach docs, MCP architecture, effort index, all 25 skills, CI workflows
**External**: [agentskills.io](https://agentskills.io/specification), [Claude Code Plugins](https://code.claude.com/docs/en/plugins), [GSD Framework](https://github.com/gsd-build/get-shit-done)
