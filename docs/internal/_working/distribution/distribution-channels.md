# pm-skills Distribution Channels

> **Status:** Active planning document
> **Last updated:** 2026-03-22
> **Owner:** Human (submissions) + Claude/Codex (PR drafting)

---

## Table of Contents

- [Status Summary](#status-summary)
- [Channel Details](#channel-details)
  - [Official Anthropic Channels](#1-official-anthropic-channels)
  - [Community Claude Directories](#2-community-claude-directories)
  - [Cross-Platform Agent Registries](#3-cross-platform-agent-registries)
  - [MCP Server Directories](#4-mcp-server-directories)
  - [Package Registries](#5-package-registries)
  - [Self-Hosted Marketplace](#6-self-hosted-marketplace)
- [Competitive Landscape](#competitive-landscape)
- [Recommended Submission Order](#recommended-submission-order)
- [Submission Content Templates](#submission-content-templates)
- [Risks and Considerations](#risks-and-considerations)

---

## Status Summary

| # | Channel | Type | Stars/Size | pm-skills Listed? | pm-skills-mcp Listed? | Priority | Action |
|---|---------|------|-----------|-------------------|----------------------|----------|--------|
| 1 | [Claude Plugin Directory](#anthropicsclaude-plugins-official) | Official | 14K stars | No | . | **P0** | Submit via form |
| 2 | [anthropics/skills](#anthropicsskills) | Official | 100K stars | No | . | **P1** | Open PR (low merge rate) |
| 3 | [Official MCP Registry](#official-mcp-registry) | Official | 6.5K stars | . | No | **P1** | Publish via mcp-publisher CLI |
| 4 | [ComposioHQ/awesome-claude-skills](#composiohqawesome-claude-skills) | Community | 47K stars | No (PR #62 closed) | . | **P2** | Resubmit PR |
| 5 | [hesreallyhim/awesome-claude-code](#hesreallyhimawesome-claude-code) | Community | 30K stars | No | . | **P2** | Open PR |
| 6 | [github/awesome-copilot](#githubawesome-copilot) | Community | 27K stars | No | . | **P2** | Open PR |
| 7 | [PulseMCP](#pulsemcp) | MCP directory | 12K+ servers | . | No | **P2** | Submit via form |
| 8 | [skills.sh (Vercel)](#skillssh-vercel) | Registry | 11K stars | Partial (3/27 skills) | . | **P3** | Investigate indexing gap |
| 9 | [travisvn/awesome-claude-skills](#travisvnawesome-claude-skills) | Community | 9.5K stars | No | . | **P3** | Open PR |
| 10 | [numman-ali/openskills](#openskills) | CLI tool | 9K stars | No | . | **P3** | Submit to n-skills |
| 11 | [numman-ali/n-skills](#n-skills) | Marketplace | 941 stars | No (Issue #6 open) | . | **P3** | Follow up on issue |
| 12 | [Smithery.ai](#smitheryai) | MCP directory | 6K+ servers | . | No | **P3** | Submit |
| 13 | [Glama.ai](#glamaai) | MCP directory | Thousands | . | No | **P3** | Submit |
| 14 | [Self-hosted marketplace](#6-self-hosted-marketplace) | Own | . | Not created | . | **P3** | Add marketplace.json |
| 15 | [npm](#npm) | Package | . | . | Yes (v2.7.0) | **Done** | Keep current |

**Current presence: 2 of 15 channels** (npm published, skills.sh auto-indexed with gaps).

---

## Channel Details

### 1. Official Anthropic Channels

#### anthropics/claude-plugins-official

The curated first-party plugin directory. Highest visibility . top plugins have 100K+ installs.

| Field | Value |
|-------|-------|
| URL | https://github.com/anthropics/claude-plugins-official |
| Stars | 14,157 |
| External plugins | 15 (Asana, Context7, Discord, Firebase, GitHub, GitLab, Greptile, Laravel Boost, Linear, Playwright, Serena, Slack, Supabase, Telegram, Fakechat) |
| Submission | https://clau.de/plugin-directory-submission |
| Review | Automated first, then manual for "Anthropic Verified" badge |
| User install | `/plugin install pm-skills` (from Discover browser) |

**What you need:**
- `.claude-plugin/plugin.json` . already exists, updated to v2.7.0
- Repository URL: `https://github.com/product-on-purpose/pm-skills`
- Fill out the submission form

**Next step:** Submit via the form. No PR needed . Anthropic handles listing.

---

#### anthropics/skills

Anthropic's official skills repository. The largest repo in this space (100K+ stars). Functions as both a reference implementation and a Claude Code plugin marketplace.

| Field | Value |
|-------|-------|
| URL | https://github.com/anthropics/skills |
| Stars | 100,231 |
| Skills | 17 Anthropic-authored |
| Community PRs | ~30 open, very few merging (bot-authored syncs only) |
| User install | `/plugin marketplace add anthropics/skills` |

**Risk:** Community PRs appear to have a very low acceptance rate. The repo primarily merges bot-generated sync PRs, not community submissions. Worth submitting for visibility but don't expect quick results.

**What you need:** A PR adding pm-skills as an external skill or marketplace entry. Could also submit individual high-value skills (e.g., deliver-prd, foundation-persona) as standalone contributions.

**Next step:** Open a PR. Accept that it may sit open indefinitely.

---

### 2. Community Claude Directories

#### ComposioHQ/awesome-claude-skills

The largest community-curated list of Claude skills.

| Field | Value |
|-------|-------|
| URL | https://github.com/ComposioHQ/awesome-claude-skills |
| Stars | 46,997 |
| Previous submission | PR #62 . closed without merge (2026-02-16, no reviewer comments) |
| Current merge rate | Low . recent closed PRs show "not merged" pattern |

**What happened to PR #62:** Closed without merge or comments on 2026-02-16. Likely a bulk close or stale-bot cleanup. The PR described 24 skills (now 27).

**Next step:** Open a new PR with updated content (27 skills, v2.7.0, utility classification, MCP companion).

---

#### hesreallyhim/awesome-claude-code

Curated list of skills, hooks, slash-commands, agent orchestrators, applications, and plugins.

| Field | Value |
|-------|-------|
| URL | https://github.com/hesreallyhim/awesome-claude-code |
| Stars | 30,319 |
| Last updated | 2026-03-23 (active) |

**Next step:** Open a PR adding pm-skills to the skills section.

---

#### travisvn/awesome-claude-skills

Second-largest awesome-claude-skills list.

| Field | Value |
|-------|-------|
| URL | https://github.com/travisvn/awesome-claude-skills |
| Stars | 9,530 |

**Next step:** Open a PR.

---

#### Other Community Directories

| Repo | Stars | Notes |
|------|-------|-------|
| davepoon/buildwithclaude | 2,625 | Hub for Claude Skills, Agents, Commands, Hooks, Plugins |
| obra/superpowers-marketplace | 711 | Curated Claude Code plugin marketplace |
| jeremylongshore/claude-code-plugins-plus-skills | 1,689 | 340 plugins + 1,367 agent skills |
| ccplugins/awesome-claude-code-plugins | 643 | Curated list of slash commands, subagents, MCP servers, hooks |

**Next step:** Batch PR submissions to all active repos. Low effort, broad coverage.

---

### 3. Cross-Platform Agent Registries

#### skills.sh (Vercel)

Vercel's cross-platform skills directory. Auto-indexes GitHub repos with agentskills.io-format SKILL.md files.

| Field | Value |
|-------|-------|
| URL | https://skills.sh |
| GitHub | https://github.com/vercel-labs/skills (11,358 stars) |
| pm-skills listing | https://skills.sh/product-on-purpose/pm-skills |
| Skills indexed | **3 of 27** (init-project: 28 installs, init-project-jpkb: 26, wrap-session: 25) |
| Install | `npx skills add product-on-purpose/pm-skills` |

**Problem:** Only 3 skills are indexed despite 27 existing. The indexer may only find skills in specific locations or may have run before the full library was in place.

**Next step:** Investigate why 24 skills aren't indexed. May need to trigger a re-index or check if the indexer has specific path expectations.

---

#### github/awesome-copilot

GitHub's official community collection for Copilot customizations. pm-skills follows agentskills.io which Copilot supports.

| Field | Value |
|-------|-------|
| URL | https://github.com/github/awesome-copilot |
| Stars | 26,528 |

**Next step:** Open a PR adding pm-skills to the skills section.

---

#### agentskill.sh

Large cross-platform directory with 106,000+ skills indexed.

| Field | Value |
|-------|-------|
| URL | https://agentskill.sh |
| Size | 106,000+ skills |
| PM category | 8,202 items in "Project & Program Management" |

**Next step:** Investigate listing process. pm-skills may need a named submission to appear as a collection rather than individual indexed files.

---

#### Cursor Marketplace

| Field | Value |
|-------|-------|
| URL | https://cursor.com/marketplace |
| Current state | Partner-focused (Amplitude, AWS, Figma, Linear, Stripe, etc.) |

**Next step:** Monitor. Community submissions may not be accepted yet. pm-skills works in Cursor via AGENTS.md already.

---

### 4. MCP Server Directories

These are relevant to **pm-skills-mcp** (the npm package), not the skill library directly.

#### Official MCP Registry

| Field | Value |
|-------|-------|
| URL | https://registry.modelcontextprotocol.io |
| GitHub | https://github.com/modelcontextprotocol/registry (6,579 stars) |
| Submission | Use `mcp-publisher` CLI tool (do NOT submit PRs) |

**Next step:** Install `mcp-publisher` and publish pm-skills-mcp.

---

#### PulseMCP

| Field | Value |
|-------|-------|
| URL | https://www.pulsemcp.com/servers |
| Size | 12,370+ servers |
| Submission | https://www.pulsemcp.com/use-cases/submit or hello@pulsemcp.com |

**Next step:** Submit via form. Simple, free.

---

#### Smithery.ai

| Field | Value |
|-------|-------|
| URL | https://smithery.ai |
| Size | 6,000-7,300+ servers |

**Next step:** Submit pm-skills-mcp.

---

#### Glama.ai

| Field | Value |
|-------|-------|
| URL | https://glama.ai/mcp/servers |

**Next step:** Submit pm-skills-mcp.

---

#### Other MCP Directories

| Directory | URL |
|-----------|-----|
| mcp.so | https://mcp.so |
| mcpservers.org | https://mcpservers.org |
| mcpservers.com | https://mcpservers.com |
| mcpserverfinder.com | https://www.mcpserverfinder.com |
| mcpserverdirectory.org | https://mcpserverdirectory.org |
| Portkey | https://portkey.ai/mcp-servers |

**Next step:** Batch submit pm-skills-mcp to all directories. Most have simple submission forms.

---

### 5. Package Registries

#### npm

| Field | Value |
|-------|-------|
| Package | `pm-skills-mcp` |
| URL | https://www.npmjs.com/package/pm-skills-mcp |
| Version | 2.7.0 (11 versions published) |
| Status | **Published and current** |

No action needed. Keep in sync with releases.

---

### 6. Self-Hosted Marketplace

You can make the pm-skills repo itself a Claude Code marketplace by adding a `marketplace.json`:

```json
{
  "name": "pm-skills-marketplace",
  "description": "Product Management skills for AI agents",
  "plugins": [
    {
      "name": "pm-skills",
      "description": "27 PM skills covering the full product lifecycle with templates, examples, and workflows",
      "version": "2.7.0",
      "source": ".",
      "author": "product-on-purpose",
      "license": "Apache-2.0",
      "keywords": ["product-management", "pm", "agent-skills"]
    }
  ]
}
```

Users install with:
```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills
```

**Next step:** Create `marketplace.json` in repo root. Zero approval needed, works immediately.

---

## Competitive Landscape

| Competitor | Stars | Skills | Overlap |
|-----------|-------|--------|---------|
| **phuryn/pm-skills** | 7,961 | "100+ agentic skills" | **Same name, same space.** Different project but occupies identical namespace. |
| **@mondaydotcomorg/product-hub** | . (npm) | PM skills for Claude Code + Cursor | monday.com's PM skills . discovery, strategy, execution, UX research |
| **nautilus-kit** | . (npm) | Hypothesis-driven discovery | Narrow overlap (hypothesis, PRD creation) |

**Key risk:** `phuryn/pm-skills` uses the exact same repo name with 8K stars. In directory listings, name collision could cause confusion. The `product-on-purpose` org name differentiates, but worth monitoring.

---

## Recommended Submission Order

### Tier 1 . High Impact, Submit This Week

| # | Channel | Action | Effort |
|---|---------|--------|--------|
| 1 | Claude Plugin Directory | Fill out submission form | 10 min |
| 2 | Official MCP Registry | Run `mcp-publisher` CLI | 15 min |
| 3 | PulseMCP | Submit form at pulsemcp.com | 5 min |
| 4 | Self-hosted marketplace | Create `marketplace.json` | 5 min |

### Tier 2 . Community Visibility, Submit This Week

| # | Channel | Action | Effort |
|---|---------|--------|--------|
| 5 | awesome-claude-skills (Composio) | Open new PR (replaces closed #62) | 20 min |
| 6 | awesome-claude-code (hesreallyhim) | Open PR | 15 min |
| 7 | awesome-copilot (GitHub) | Open PR | 15 min |
| 8 | anthropics/skills | Open PR (expect slow merge) | 20 min |

### Tier 3 . Broad Coverage, When Time Permits

| # | Channel | Action | Effort |
|---|---------|--------|--------|
| 9 | skills.sh | Investigate 3/27 indexing gap | 30 min |
| 10 | n-skills Issue #6 | Comment with v2.7.0 update | 5 min |
| 11 | Smithery.ai, Glama.ai, mcp.so | Submit pm-skills-mcp | 15 min each |
| 12 | Other awesome-* repos | Batch PRs | 10 min each |

**Estimated total effort:** ~3 hours for all tiers.

---

## Submission Content Templates

### Short Description (1 line)
27 open-source product management skills for AI agents . PRDs, user stories, acceptance criteria, experiments, retrospectives, and more. Follows the agentskills.io specification.

### Medium Description (paragraph)
PM-Skills is an open-source collection of 27 product management skills for AI agents, organized by the Triple Diamond framework. Each skill includes structured instructions (SKILL.md), an output template (TEMPLATE.md), and a real-world example (EXAMPLE.md). Covers the full PM lifecycle: discovery, definition, development, delivery, measurement, and iteration. Includes 3 workflows, 28 slash commands, an interactive skill builder, and a companion MCP server. Apache 2.0 licensed.

### PR Body Template

```markdown
## Adding pm-skills . 27 Product Management Skills

**Repository:** https://github.com/product-on-purpose/pm-skills
**License:** Apache-2.0
**Skills:** 27 (25 phase + 1 foundation + 1 utility)
**Spec:** [agentskills.io](https://agentskills.io/specification)

### What it does
Professional PM skills for AI agents covering the complete product lifecycle:
- **Discover:** interview synthesis, competitive analysis, stakeholder mapping
- **Define:** problem statements, hypotheses, opportunity trees, JTBD
- **Develop:** solution briefs, ADRs, design rationale, spikes
- **Deliver:** PRDs, user stories, acceptance criteria, edge cases, launch checklists, release notes
- **Measure:** experiment design, instrumentation, dashboards, results
- **Iterate:** retrospectives, lessons, refinement, pivot decisions
- **Foundation:** evidence-calibrated personas
- **Utility:** interactive skill builder with gap analysis

### Also available as
- **MCP server:** `npm install -g pm-skills-mcp` ([npm](https://www.npmjs.com/package/pm-skills-mcp))
- **Claude Code plugin:** `.claude-plugin/plugin.json` included

### Works with
Claude Code, Claude Desktop (via MCP), GitHub Copilot, Cursor, Windsurf, VS Code, and any AGENTS.md-compatible tool.
```

---

## Risks and Considerations

1. **Name collision with phuryn/pm-skills** (7.9K stars). Same repo name, different org. Could cause confusion in directory listings. Mitigate by emphasizing `product-on-purpose` authorship and `agentskills.io` spec compliance.

2. **Community PRs may not merge.** Both awesome-claude-skills and anthropics/skills show low community merge rates. File PRs for visibility but don't depend on them for distribution.

3. **skills.sh indexing gap.** Only 3/27 skills indexed. May be a path structure issue or stale index. Investigate before assuming it's a viable channel.

4. **MCP directory fragmentation.** 10+ MCP directories exist. Submit to the top 3-4 for coverage; the rest provide diminishing returns.

5. **Plugin version drift.** `.claude-plugin/plugin.json` version must stay in sync with releases. Consider adding a CI check (the existing `validate-plugin.yml` may already handle this).
