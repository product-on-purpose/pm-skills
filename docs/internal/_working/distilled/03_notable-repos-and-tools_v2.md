# Notable Repos, Tools & Resources (v2)

> **Date**: 2026-03-22 | **Author**: Claude Opus 4.6
> **Supersedes**: `03_notable-repos-and-tools.md` (2026-03-21)
> **Context**: Discovered during pm-skills strategic research across 4 topics
> **Purpose**: Reference catalog for learning, benchmarking, and potential integration

---

## What Changed in v2

| Change | Why |
|--------|-----|
| Added **Top References** section | Codex review noted lack of prioritization — catalog said "what exists" but not "what matters most" |
| Added **Scope** column to all entries | Post-separation, entries may be relevant to pm-skills, Knowledge OS, or both |
| Added Knowledge OS note to §5 and §10 | Most entries in these sections are Knowledge OS scope |
| Added Scope annotations throughout | Some entries are less relevant after the Knowledge OS separation |

---

## Top References for Current pm-skills Work

These are the 8 most actionable references for the near-term pm-skills backlog (Efforts 0-6 in `04_next-efforts.md`):

| # | Reference | Relevant To | Why It Matters Now |
|---|-----------|-------------|-------------------|
| 1 | [agentskills.io spec](https://agentskills.io/specification) | CI validation | The spec pm-skills validates against |
| 2 | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Marketplace submission | Where pm-skills needs to be listed |
| 3 | [release-please](https://github.com/googleapis/release-please) | Release automation | Best-fit release workflow tool |
| 4 | [Claude Code Skill Factory](https://github.com/alirezarezvani/claude-code-skill-factory) | Skill builder | Closest existing tool to pm-skill-builder |
| 5 | [hesreallyhim/claude-code-json-schema](https://github.com/hesreallyhim/claude-code-json-schema) | CI validation | JSON schemas for plugin validation |
| 6 | [dorny/paths-filter](https://github.com/dorny/paths-filter) | CI pipeline | Conditional job execution per skill |
| 7 | [softprops/action-gh-release](https://github.com/softprops/action-gh-release) | Release automation | Already in pm-skills toolchain |
| 8 | [changesets/changesets](https://github.com/changesets/changesets) | Community contributions | Explicit changeset workflow for varied commit discipline |

---

## Table of Contents

1. [PM & Skill Frameworks](#1-pm--skill-frameworks)
2. [Skill Building & Scaffolding](#2-skill-building--scaffolding)
3. [Plugin Ecosystem & Marketplaces](#3-plugin-ecosystem--marketplaces)
4. [Platform-Specific Skill Libraries](#4-platform-specific-skill-libraries)
5. [Architecture & Orchestration Patterns](#5-architecture--orchestration-patterns)
6. [CI/CD & Release Automation](#6-cicd--release-automation)
7. [Specifications & Standards](#7-specifications--standards)
8. [AI Coding Platforms (Comparison Targets)](#8-ai-coding-platforms-comparison-targets)
9. [Articles & Deep Dives](#9-articles--deep-dives)
10. [Document Processing & Knowledge Management](#10-document-processing--knowledge-management)

---

## 1. PM & Skill Frameworks

### [GSD — Get Shit Done](https://github.com/gsd-build/get-shit-done)
**Scope**: pm-skills + Knowledge OS
**What**: Meta-prompting, context engineering, and spec-driven development framework for AI coding agents. npm package (`get-shit-done-cc`).
**Why notable**: Closest analog to what pm-skills could become. Solves context rot via fresh-context subagent spawning. `.planning/` state management, milestone-driven lifecycle, wave-based parallel execution.
**Limitation**: Single-project-per-repo, developer-oriented (not PM).
**Learn from**: STATE.md pattern, discuss→plan→execute→verify lifecycle, milestone archiving, `seeds/` and `threads/` concepts.

### [GSD v2](https://github.com/gsd-build/gsd-2)
**Scope**: Knowledge OS (architecture patterns)
**What**: Evolution of GSD from prompt framework to TypeScript application.
**Why notable**: Shows the maturation trajectory from "prompt collection" to "development platform" — the same path pm-skills is on.

### [GSD Framework Educational Course](https://ccforeveryone.com/gsd)
**Scope**: pm-skills (onboarding)
**What**: Free interactive lesson on GSD spec-driven development.
**Why notable**: Good reference for how to teach a framework to new users. Could inform pm-skills onboarding/getting-started content.

### [GSD Deep Analysis (DeepWiki)](https://deepwiki.com/gsd-build/get-shit-done)
**Scope**: Knowledge OS (architecture patterns)
**What**: Technical deep-dive into GSD architecture and patterns.
**Why notable**: Detailed breakdown of the thin-orchestrator pattern, state management, and phase verification.

---

## 2. Skill Building & Scaffolding

### [Claude Code Skill Factory](https://github.com/alirezarezvani/claude-code-skill-factory)
**Scope**: pm-skills (skill builder design)
**What**: Open-source toolkit for generating production-ready Claude skills, agents, commands, and prompts at scale.
**Why notable**: Closest existing tool to the pm-skill-builder concept. Interactive Q&A workflows, YAML frontmatter generation, hook factory with 10 templates across 7 event types, multi-format output (XML, Claude, ChatGPT, Gemini).
**Limitation**: Generic (not PM-specific), not agentskills.io-aligned.

### [Lobe Hub Skill Generator](https://lobehub.com/skills/squirrelsoft-dev-claude-builder-skill-generator)
**Scope**: pm-skills (alternative approach reference)
**What**: Community skill generator for Claude on the LobeHub platform.
**Why notable**: Shows a different approach to skill scaffolding — web-based UI rather than CLI.

### [Yeoman](https://yeoman.io/)
**Scope**: pm-skills (scaffolding pattern)
**What**: Generator-based scaffolding ecosystem. Write custom generators to scaffold any project structure.
**Why notable**: Established pattern for template-based file generation. The ecosystem is aging, but the concepts are sound.

### [oclif — The Open CLI Framework](https://oclif.io/)
**Scope**: Knowledge OS (if standalone CLI needed)
**What**: Framework for building command-line tools by Salesforce/Heroku.
**Why notable**: If pm-skills ever builds a standalone CLI (`npx pm-skill-builder init`), oclif is the best foundation. Lower priority given current plugin-first approach.

### [Keats/kickstart](https://github.com/Keats/kickstart)
**Scope**: pm-skills (lightweight scaffolding)
**What**: Rust-based CLI that scaffolds projects from templates with variable substitution.
**Why notable**: Lightweight alternative to Yeoman for simple scaffolding needs.

---

## 3. Plugin Ecosystem & Marketplaces

### [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
**Scope**: pm-skills (Effort 0 — marketplace submission)
**What**: Anthropic's official plugin directory. 72+ plugins across 24 categories.
**Why notable**: **This is where pm-skills should be listed.** Fork-and-PR submission model. Understanding the directory structure informs how pm-skills should present itself.

### [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
**Scope**: pm-skills (visibility)
**What**: Curated list of skills, hooks, commands, orchestrators, plugins, and applications for Claude Code.
**Why notable**: Community discovery hub. pm-skills should be listed here for visibility.

### [hesreallyhim/claude-code-json-schema](https://github.com/hesreallyhim/claude-code-json-schema)
**Scope**: pm-skills (CI validation)
**What**: Unofficial but comprehensive JSON schemas for Claude Code config files (plugin.json, marketplace.json, settings.json, mcp.json).
**Why notable**: Could be used to build validation scripts for pm-skills plugin packaging. More rigorous than hand-written validation.

### [Kamalnrf/claude-plugins](https://github.com/Kamalnrf/claude-plugins)
**Scope**: pm-skills (discovery patterns)
**What**: Community plugin collection and marketplace tooling.
**Why notable**: Shows community marketplace patterns and plugin organization approaches.

### [Claude Plugin Hub](https://www.claudepluginhub.com/)
**Scope**: pm-skills (visibility)
**What**: Web-based directory for discovering Claude Code plugins and skills.
**Why notable**: Alternative discovery channel. Understanding listing criteria helps optimize pm-skills description and keywords.

---

## 4. Platform-Specific Skill Libraries

### [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)
**Scope**: pm-skills (benchmarking)
**What**: 205 skills organized by domain: engineering-team, product-team, marketing, C-level, project-management.
**Why notable**: Largest single-repo skill collection. Domain-based organization (vs pm-skills' phase-based). Good benchmark for skill count and coverage.

### [google-gemini/gemini-skills](https://github.com/google-gemini/gemini-skills)
**Scope**: pm-skills (cross-platform validation)
**What**: Google's official skills catalog adopting the agentskills.io open standard.
**Why notable**: Validates cross-platform portability of SKILL.md format. Their `gemini-api-dev` skill improved coding accuracy to 87% (Flash) and 96% (Pro) — demonstrates measurable skill impact.

### [github/awesome-copilot](https://github.com/github/awesome-copilot)
**Scope**: pm-skills (cross-platform distribution)
**What**: GitHub's community collection of skills, custom agents, instructions, and prompts for Copilot.
**Why notable**: Shows agentskills.io adoption from Microsoft/GitHub's side. Skills go in `.github/skills/`.

### [levnikolaevich/claude-code-skills](https://github.com/levnikolaevich/claude-code-skills)
**Scope**: Knowledge OS (orchestration patterns)
**What**: 4-level orchestrator-worker skill hierarchy: L0 meta-orchestrator → L1 lifecycle coordinators → L2 scope coordinators → L3 task workers.
**Why notable**: Sophisticated multi-level agent orchestration pattern. More relevant to Knowledge OS than to pm-skills' current scope.

### [anthropics/skills](https://github.com/anthropics/skills)
**Scope**: pm-skills (spec compliance)
**What**: Anthropic's reference implementation of the agent skills specification.
**Why notable**: The canonical source for how skills should be structured. Reference when building validation scripts.

---

## 5. Architecture & Orchestration Patterns

> **Note**: Most entries in this section are primarily relevant to Knowledge OS (workspace orchestration), not current pm-skills skill-library work. Retained as reference.

### [CloudAI-X/claude-workflow-v2](https://github.com/CloudAI-X/claude-workflow-v2)
**Scope**: Knowledge OS (plugin architecture reference)
**What**: Universal Claude Code workflow plugin with agents, skills, hooks, and commands.
**Why notable**: Complete plugin architecture pattern. Less relevant to pm-skills' current skill-library focus.

### [Claude-Workspace/claude-ws](https://github.com/Claude-Workspace/claude-ws)
**Scope**: Knowledge OS (workspace management)
**What**: Multi-workspace management tool for Claude Code.
**Why notable**: Directly relevant to Knowledge OS's multi-project problem. Not relevant to pm-skills' current scope.

### [AgentSys](https://github.com/hesreallyhim/awesome-claude-code#agent-systems)
**Scope**: Knowledge OS (workflow orchestration)
**What**: System integrating plugins, agents, and skills for task-to-production workflows.
**Why notable**: Shows end-to-end workflow orchestration pattern.

### [Claude Squad](https://github.com/hesreallyhim/awesome-claude-code#multi-agent)
**Scope**: Knowledge OS (parallel execution)
**What**: Manages multiple Claude Code instances in separate workspaces for parallelization.
**Why notable**: Relevant if Knowledge OS ever needs parallel execution across projects.

### [Claude Code PM (Ran Aroussi)](https://github.com/hesreallyhim/awesome-claude-code#project-management)
**Scope**: pm-skills + Knowledge OS (competitive analysis)
**What**: Workflow coordination through specialized agents and slash commands, specifically for project management.
**Why notable**: Another PM-oriented Claude Code project — potential overlap, collaboration, or competitive analysis target.

---

## 6. CI/CD & Release Automation

### [googleapis/release-please](https://github.com/googleapis/release-please)
**Scope**: pm-skills (Effort 5 — release automation)
**What**: Google's release automation. Maintains a release PR, auto-generates changelogs from conventional commits, auto-bumps versions, creates tags and GitHub releases.
**Why notable**: Strong option for release automation. Semi-automated (human merges the release PR) vs. fully automated (semantic-release). Supports monorepo scopes. **Note**: `04_next-efforts.md` Effort 5 chose to enhance the existing manual tag-push workflow rather than adopt Release Please — simpler and matches current flow.

### [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release)
**Scope**: pm-skills (alternative)
**What**: Fully automated versioning and package publishing based on conventional commits.
**Why notable**: Alternative to Release Please. More automated but removes human gate. Better for high-velocity repos.

### [changesets/changesets](https://github.com/changesets/changesets)
**Scope**: pm-skills (community contribution workflow)
**What**: Developer-driven release management. Contributors create explicit changeset files describing their changes.
**Why notable**: Alternative where contributors document changes explicitly. Good for community repos where commit discipline varies.

### [openai/codex-action](https://github.com/openai/codex-action)
**Scope**: pm-skills (CI enhancement)
**What**: Official GitHub Action for OpenAI Codex. Runs autonomous tasks in CI, auto-fixes failures, posts inline PR comments.
**Why notable**: Could be integrated into pm-skills CI for autonomous skill quality review.

### [dorny/paths-filter](https://github.com/dorny/paths-filter)
**Scope**: pm-skills (CI optimization)
**What**: GitHub Action for conditional job execution based on which files changed in a PR.
**Why notable**: Enables per-skill validation in CI — only validate skills that actually changed.

### [requarks/changelog-action](https://github.com/requarks/changelog-action)
**Scope**: pm-skills (simpler changelog alternative)
**What**: Auto-generate changelogs from git history with customizable templates.
**Why notable**: Simpler alternative to Release Please for changelog generation only.

### [Release Changelog Builder](https://github.com/marketplace/actions/release-changelog-builder)
**Scope**: pm-skills (monorepo changelog)
**What**: GitHub Action that builds changelogs with path-based filtering for monorepo support.
**Why notable**: Could distinguish between skill changes, command changes, and infrastructure changes.

### [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
**Scope**: pm-skills (already in toolchain)
**What**: GitHub Action for creating GitHub Releases. Already used in pm-skills' `release.yml`.
**Why notable**: Already part of the pm-skills toolchain. v2 is the current recommended version.

---

## 7. Specifications & Standards

### [agentskills.io](https://agentskills.io/specification)
**Scope**: pm-skills (foundational)
**What**: The open standard for agent skills. Published by Anthropic, adopted by 26+ platforms.
**Why notable**: pm-skills is built on this spec. Essential for CI validation scripts.

### [agentskills/agentskills (GitHub)](https://github.com/agentskills/agentskills)
**Scope**: pm-skills (spec tracking)
**What**: Source repository for the agentskills.io specification.
**Why notable**: Watch this repo for spec updates that affect pm-skills' compliance.

### [anthropics/skills/spec](https://github.com/anthropics/skills/blob/main/spec/agent-skills-spec.md)
**Scope**: pm-skills (CI validation)
**What**: The spec markdown file itself in Anthropic's reference repository.
**Why notable**: The canonical spec text. Reference when building validation scripts.

### [Claude Code Plugins Reference](https://code.claude.com/docs/en/plugins-reference)
**Scope**: pm-skills (plugin packaging)
**What**: Official documentation for plugin manifest schema, component types, and distribution.
**Why notable**: Authoritative source for plugin.json fields.

### [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
**Scope**: Knowledge OS (hooks are out of pm-skills scope)
**What**: Official documentation for all 21 hook events, handler types, and configuration patterns.
**Why notable**: Essential for Knowledge OS's Layer 2 extensions. Not needed for current pm-skills work.

---

## 8. AI Coding Platforms (Comparison Targets)

### [Claude Code](https://code.claude.com/docs/en/)
**Scope**: pm-skills (primary platform)
**What**: Anthropic's CLI agent. Primary platform for pm-skills.
**Why notable**: Most extensible platform — skills, commands, hooks, agents, agent teams, output styles, MCP, plugins, worktrees, memory.

### [OpenAI Codex CLI](https://developers.openai.com/codex/cli)
**Scope**: pm-skills (cross-platform target)
**What**: OpenAI's coding agent. Open source, built in Rust. Supports agentskills.io.
**Why notable**: Strong autonomous execution (sandboxed, network-disabled). Relevant for autonomous skill creation.

### [OpenAI Codex App](https://openai.com/codex/)
**Scope**: pm-skills (authoring platform)
**What**: Web-based interface for Codex with cloud sandboxed environments.
**Why notable**: Could be used for skill authoring without local setup.

### [Gemini CLI](https://github.com/google-gemini/gemini-cli)
**Scope**: pm-skills (cross-platform target)
**What**: Google's terminal AI agent. Supports agentskills.io, MCP, extensions.
**Why notable**: Skills in `.gemini/skills/` with lazy loading. Google Search grounding adds value for research skills.

### [Cursor](https://cursor.com/)
**Scope**: pm-skills (cross-platform target)
**What**: AI-first code editor. Agent skills support (nightly channel as of March 2026).
**Why notable**: Skills Hub with enterprise templates. Agent skills are experimental but growing.

### [Windsurf](https://docs.windsurf.com/)
**Scope**: pm-skills (cross-platform target)
**What**: AI coding IDE (VS Code fork). Cascade agent with autonomous execution.
**Why notable**: Added SKILL.md support in `.windsurf/skills/` (March 2026).

### [GitHub Copilot](https://docs.github.com/en/copilot)
**Scope**: pm-skills (cross-platform target)
**What**: Microsoft/GitHub's AI assistant.
**Why notable**: Agent skills natively supported. AGENTS.md file support added.

### [JetBrains Junie](https://junie.jetbrains.com/)
**Scope**: pm-skills (cross-platform target)
**What**: JetBrains' AI coding agent with skill support.
**Why notable**: Auto-imports skills from `.claude/skills/`, `.cursor/skills/`, `.codex/skills/`. LLM-agnostic.

---

## 9. Articles & Deep Dives

### [Beating Context Rot with GSD (The New Stack)](https://thenewstack.io/beating-the-rot-and-getting-stuff-done/)
**Scope**: Knowledge OS
**Topic**: How GSD's thin-orchestrator pattern prevents quality degradation in long AI sessions.
**Key insight**: Fresh-context subagents preserve quality.

### [Claude Code Extensions Explained (Medium)](https://muneebsa.medium.com/claude-code-extensions-explained-skills-mcp-hooks-subagents-agent-teams-plugins-9294907e84ff)
**Scope**: pm-skills + Knowledge OS
**Topic**: Comprehensive overview of all Claude Code extension types.
**Key insight**: Clear taxonomy of skills vs. hooks vs. agents vs. teams.

### [A Mental Model for Claude Code (Level Up Coding)](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05)
**Scope**: pm-skills
**Topic**: Conceptual framework for understanding how skills, subagents, and plugins relate.
**Key insight**: Skills = knowledge, Hooks = guardrails, Agents = workers, Plugins = packages.

### [Agent Skills Guide 2026 (Serenities AI)](https://serenitiesai.com/articles/agent-skills-guide-2026)
**Scope**: pm-skills (cross-platform strategy)
**Topic**: Cross-platform guide to building skills for 16+ AI tools.
**Key insight**: Practical guidance on making skills portable.

### [Anthropic Opens Agent Skills Standard (VentureBeat)](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard)
**Scope**: pm-skills (strategic context)
**Topic**: Strategic context for why Anthropic open-sourced the skills standard.
**Key insight**: Anthropic builds infrastructure, not moats. pm-skills benefits from an open standard that won't be locked down.

### [Anthropic Agent Skills Standard (Unite.AI)](https://www.unite.ai/anthropic-opens-agent-skills-standard-continuing-its-pattern-of-building-industry-infrastructure/)
**Scope**: pm-skills (network effects)
**Topic**: Industry analysis of Anthropic's infrastructure-building strategy.
**Key insight**: Open standards create network effects. pm-skills' cross-platform portability grows as more platforms adopt agentskills.io.

### [Sub-agent vs Agent Team (Medium)](https://medium.com/data-science-collective/sub-agent-vs-agent-team-in-claude-code-pick-the-right-pattern-in-60-seconds-e856e5b4e5cc)
**Scope**: Knowledge OS
**Topic**: When to use subagents vs. agent teams in Claude Code.
**Key insight**: Subagents = focused tasks. Agent teams = peers. pm-skills should use subagents for skill-level automation.

### [How to Use Claude Code Features (ProductTalk)](https://www.producttalk.org/how-to-use-claude-code-features/)
**Scope**: pm-skills (target audience perspective)
**Topic**: Practical guide to slash commands, agents, skills, and plugins.
**Key insight**: PM-oriented perspective on Claude Code capabilities.

### [Document AI Trends 2026 (Artificio)](https://artificio.ai/blog/document-ai-trends-2026-from-ocr-to-agentic-processing)
**Scope**: Knowledge OS
**Topic**: How document processing shifted from template extraction to agentic reasoning.
**Key insight**: Routing/orchestration matters more than extraction. Validates Knowledge OS architecture.

### [GSD Beginner's Guide (DEV Community)](https://dev.to/alikazmidev/the-complete-beginners-guide-to-gsd-get-shit-done-framework-for-claude-code-24h0)
**Scope**: pm-skills (onboarding reference)
**Topic**: Step-by-step introduction to GSD framework.
**Key insight**: Model for pm-skills' getting-started experience.

### [AI's New Rules for Repo Architecture (Augment Code)](https://www.augmentcode.com/learn/monorepo-vs-polyrepo-ai-s-new-rules-for-repo-architecture)
**Scope**: Knowledge OS
**Topic**: How AI agents change the monorepo vs. polyrepo calculus.
**Key insight**: AI with large context windows benefits from monorepo. Supports Knowledge OS's single-workspace approach.

### [Monorepo vs. Polyrepo Reference](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
**Scope**: Knowledge OS
**Topic**: Comprehensive comparison of monorepo and polyrepo strategies.

---

## 10. Document Processing & Knowledge Management

> **Note**: This section is primarily relevant to Knowledge OS, not current pm-skills work. Retained as reference for the Layer 2 initiative.

### [NVIDIA: AI Meeting Productivity](https://developer.nvidia.com/blog/boost-meeting-productivity-with-ai-powered-note-taking-and-summarization/)
**Scope**: Knowledge OS
**Topic**: AI-powered meeting note-taking and summarization architecture.
**Key insight**: Multi-stage pipeline (transcribe → segment → extract → summarize → route).

### [Granola for Researchers 2026](https://zackproser.com/blog/granola-for-researchers-2026)
**Scope**: Knowledge OS
**Topic**: AI meeting note tool that augments rather than replaces human notes.
**Key insight**: The best transcript tools let humans annotate alongside AI extraction.

### [Scaled Agile Framework: Product Management](https://framework.scaledagile.com/product-management)
**Scope**: Knowledge OS
**Topic**: SAFe's product management practices for portfolio-level coordination.

### [2026 PM Trends (Clarkston Consulting)](https://clarkstonconsulting.com/insights/2026-program-and-project-management-trends/)
**Scope**: Knowledge OS
**Topic**: Leading PMOs as "enterprise enablement engines" with AI agent governance.

### [40 Best Document Management Systems 2026](https://thedigitalprojectmanager.com/tools/document-management-systems/)
**Scope**: Knowledge OS
**Topic**: Landscape of document management tools.
**Key insight**: None natively understand PM document types or AI skill ontologies. This is the gap Knowledge OS fills.
