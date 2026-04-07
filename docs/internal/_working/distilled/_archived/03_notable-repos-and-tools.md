# Notable Repos, Tools & Resources

> **Date**: 2026-03-21 | **Author**: Claude Opus 4.6
> **Context**: Discovered during pm-skills strategic research across 4 topics
> **Purpose**: Reference catalog for learning, benchmarking, and potential integration

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
**What**: Meta-prompting, context engineering, and spec-driven development framework for AI coding agents. npm package (`get-shit-done-cc`).
**Why notable**: Closest analog to what pm-skills could become. Solves context rot via fresh-context subagent spawning. `.planning/` state management, milestone-driven lifecycle, wave-based parallel execution.
**Limitation**: Single-project-per-repo, developer-oriented (not PM).
**Learn from**: STATE.md pattern, discuss→plan→execute→verify lifecycle, milestone archiving, `seeds/` and `threads/` concepts.

### [GSD v2](https://github.com/gsd-build/gsd-2)
**What**: Evolution of GSD from prompt framework to TypeScript application.
**Why notable**: Shows the maturation trajectory from "prompt collection" to "development platform" — the same path pm-skills is on. More robust agent session control, programmatic orchestration.

### [GSD Framework Educational Course](https://ccforeveryone.com/gsd)
**What**: Free interactive lesson on GSD spec-driven development.
**Why notable**: Good reference for how to teach a framework to new users. Could inform pm-skills onboarding/getting-started content.

### [GSD Deep Analysis (DeepWiki)](https://deepwiki.com/gsd-build/get-shit-done)
**What**: Technical deep-dive into GSD architecture and patterns.
**Why notable**: Detailed breakdown of the thin-orchestrator pattern, state management, and phase verification. Useful reference for adapting GSD patterns to PM workflows.

---

## 2. Skill Building & Scaffolding

### [Claude Code Skill Factory](https://github.com/alirezarezvani/claude-code-skill-factory)
**What**: Open-source toolkit for generating production-ready Claude skills, agents, commands, and prompts at scale.
**Why notable**: Closest existing tool to the pm-skill-builder concept. Interactive Q&A workflows, YAML frontmatter generation, hook factory with 10 templates across 7 event types, multi-format output (XML, Claude, ChatGPT, Gemini).
**Limitation**: Generic (not PM-specific), not agentskills.io-aligned.

### [Lobe Hub Skill Generator](https://lobehub.com/skills/squirrelsoft-dev-claude-builder-skill-generator)
**What**: Community skill generator for Claude on the LobeHub platform.
**Why notable**: Shows a different approach to skill scaffolding — web-based UI rather than CLI.

### [Yeoman](https://yeoman.io/)
**What**: Generator-based scaffolding ecosystem. Write custom generators to scaffold any project structure.
**Why notable**: Established pattern for template-based file generation. Could inform a `pm-skill-builder` CLI tool, though the ecosystem is aging.

### [oclif — The Open CLI Framework](https://oclif.io/)
**What**: Framework for building command-line tools by Salesforce/Heroku.
**Why notable**: If pm-skills ever builds a standalone CLI (`npx pm-skill-builder init`), oclif is the best foundation.

### [Keats/kickstart](https://github.com/Keats/kickstart)
**What**: Rust-based CLI that scaffolds projects from templates with variable substitution.
**Why notable**: Lightweight alternative to Yeoman for simple scaffolding needs.

---

## 3. Plugin Ecosystem & Marketplaces

### [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
**What**: Anthropic's official plugin directory. 72+ plugins across 24 categories.
**Why notable**: This is where pm-skills should be listed. Fork-and-PR submission model. Understanding the directory structure informs how pm-skills should present itself.

### [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
**What**: Curated list of skills, hooks, commands, orchestrators, plugins, and applications for Claude Code.
**Why notable**: Community discovery hub. pm-skills should be listed here for visibility. Also a good source for finding new patterns and tools.

### [hesreallyhim/claude-code-json-schema](https://github.com/hesreallyhim/claude-code-json-schema)
**What**: Unofficial but comprehensive JSON schemas for Claude Code config files (plugin.json, marketplace.json, settings.json, mcp.json).
**Why notable**: Could be used to build validation scripts for pm-skills plugin packaging. More rigorous than hand-written validation.

### [Kamalnrf/claude-plugins](https://github.com/Kamalnrf/claude-plugins)
**What**: Community plugin collection and marketplace tooling.
**Why notable**: Shows community marketplace patterns and plugin organization approaches.

### [Claude Plugin Hub](https://www.claudepluginhub.com/)
**What**: Web-based directory for discovering Claude Code plugins and skills.
**Why notable**: Alternative discovery channel. Understanding listing criteria helps optimize pm-skills description and keywords.

---

## 4. Platform-Specific Skill Libraries

### [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)
**What**: 205 skills organized by domain: engineering-team, product-team, marketing, C-level, project-management.
**Why notable**: Largest single-repo skill collection. Domain-based organization (vs pm-skills' phase-based). Includes orchestrator-level meta-skills. Good benchmark for skill count and coverage.

### [google-gemini/gemini-skills](https://github.com/google-gemini/gemini-skills)
**What**: Google's official skills catalog adopting the agentskills.io open standard.
**Why notable**: Validates cross-platform portability of SKILL.md format. Their `gemini-api-dev` skill improved coding accuracy to 87% (Flash) and 96% (Pro) — demonstrates measurable skill impact.

### [github/awesome-copilot](https://github.com/github/awesome-copilot)
**What**: GitHub's community collection of skills, custom agents, instructions, and prompts for Copilot.
**Why notable**: Shows agentskills.io adoption from Microsoft/GitHub's side. Skills go in `.github/skills/`. Relevant for pm-skills cross-platform distribution.

### [levnikolaevich/claude-code-skills](https://github.com/levnikolaevich/claude-code-skills)
**What**: 4-level orchestrator-worker skill hierarchy: L0 meta-orchestrator → L1 lifecycle coordinators → L2 scope coordinators → L3 task workers.
**Why notable**: Sophisticated multi-level agent orchestration pattern. Maps to pm-skills' potential architecture: L0 = portfolio, L1 = per-project, L2 = per-phase, L3 = per-skill.

### [anthropics/skills](https://github.com/anthropics/skills)
**What**: Anthropic's reference implementation of the agent skills specification.
**Why notable**: The canonical source for how skills should be structured. Includes the spec markdown, reference implementations, and examples.

---

## 5. Architecture & Orchestration Patterns

### [CloudAI-X/claude-workflow-v2](https://github.com/CloudAI-X/claude-workflow-v2)
**What**: Universal Claude Code workflow plugin with agents, skills, hooks, and commands.
**Why notable**: Complete plugin architecture pattern showing how all Claude Code components (skills, hooks, agents, commands) work together in one package. Good reference for pm-skills' Layer 2 (Claude Code extensions) design.

### [Claude-Workspace/claude-ws](https://github.com/Claude-Workspace/claude-ws)
**What**: Multi-workspace management tool for Claude Code.
**Why notable**: Directly relevant to the multi-project problem. Shows one approach to workspace switching and context isolation.

### [AgentSys](https://github.com/hesreallyhim/awesome-claude-code#agent-systems)
**What**: System integrating plugins, agents, and skills for task-to-production workflows.
**Why notable**: Shows end-to-end workflow orchestration pattern — from task definition through agent execution to production output.

### [Claude Squad](https://github.com/hesreallyhim/awesome-claude-code#multi-agent)
**What**: Manages multiple Claude Code instances in separate workspaces for parallelization.
**Why notable**: Relevant if pm-skills ever needs parallel skill execution across projects (e.g., running competitive analysis on 3 projects simultaneously).

### [Claude Code PM (Ran Aroussi)](https://github.com/hesreallyhim/awesome-claude-code#project-management)
**What**: Workflow coordination through specialized agents and slash commands, specifically for project management.
**Why notable**: Another PM-oriented Claude Code project — potential overlap, collaboration, or competitive analysis target.

---

## 6. CI/CD & Release Automation

### [googleapis/release-please](https://github.com/googleapis/release-please)
**What**: Google's release automation. Maintains a release PR, auto-generates changelogs from conventional commits, auto-bumps versions, creates tags and GitHub releases.
**Why notable**: Best fit for pm-skills' release workflow. Semi-automated (human merges the release PR) vs. fully automated (semantic-release). Supports monorepo scopes.

### [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release)
**What**: Fully automated versioning and package publishing based on conventional commits.
**Why notable**: Alternative to Release Please. More automated but removes human gate. Better for high-velocity repos where every merge should potentially release.

### [changesets/changesets](https://github.com/changesets/changesets)
**What**: Developer-driven release management. Contributors create explicit changeset files describing their changes.
**Why notable**: Alternative approach where contributors document changes explicitly. Native monorepo design. Adds friction but gives fine-grained control. Good for community repos where commit discipline varies.

### [openai/codex-action](https://github.com/openai/codex-action)
**What**: Official GitHub Action for OpenAI Codex. Runs autonomous tasks in CI, auto-fixes failures, posts inline PR comments.
**Why notable**: Could be integrated into pm-skills CI for autonomous skill quality review or auto-fixing frontmatter validation failures.

### [dorny/paths-filter](https://github.com/dorny/paths-filter)
**What**: GitHub Action for conditional job execution based on which files changed in a PR.
**Why notable**: Enables per-skill validation in CI — only validate skills that actually changed. More valuable at scale (50+ skills).

### [requarks/changelog-action](https://github.com/requarks/changelog-action)
**What**: Auto-generate changelogs from git history with customizable templates.
**Why notable**: Simpler alternative to Release Please for changelog generation only (no version bumping).

### [Release Changelog Builder](https://github.com/marketplace/actions/release-changelog-builder)
**What**: GitHub Action that builds changelogs with path-based filtering for monorepo support.
**Why notable**: Could distinguish between skill changes, command changes, and infrastructure changes in the changelog automatically.

### [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
**What**: GitHub Action for creating GitHub Releases. Already used in pm-skills' `release.yml`.
**Why notable**: Already part of the pm-skills toolchain. v2 is the current recommended version.

---

## 7. Specifications & Standards

### [agentskills.io](https://agentskills.io/specification)
**What**: The open standard for agent skills. Published by Anthropic, adopted by 26+ platforms.
**Why notable**: pm-skills is built on this spec. Understanding it deeply is essential — the spec is intentionally minimal (one required file: SKILL.md with YAML frontmatter).

### [agentskills/agentskills (GitHub)](https://github.com/agentskills/agentskills)
**What**: Source repository for the agentskills.io specification.
**Why notable**: Watch this repo for spec updates. Any changes affect pm-skills' compliance.

### [anthropics/skills/spec](https://github.com/anthropics/skills/blob/main/spec/agent-skills-spec.md)
**What**: The spec markdown file itself in Anthropic's reference repository.
**Why notable**: The canonical spec text. Reference this when building validation scripts.

### [Claude Code Plugins Reference](https://code.claude.com/docs/en/plugins-reference)
**What**: Official documentation for plugin manifest schema, component types, and distribution.
**Why notable**: Authoritative source for plugin.json fields, hook events, agent configuration, and output style definitions.

### [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
**What**: Official documentation for all 21 hook events, handler types, and configuration patterns.
**Why notable**: Essential reference for building pm-skills' Layer 2 (Claude Code extensions). Documents PreToolUse, PostToolUse, SessionStart, and all other events.

---

## 8. AI Coding Platforms (Comparison Targets)

### [Claude Code](https://code.claude.com/docs/en/)
**What**: Anthropic's CLI agent. Primary platform for pm-skills.
**Why notable**: Most extensible platform — skills, commands, hooks, agents, agent teams, output styles, MCP, plugins, worktrees, memory.

### [OpenAI Codex CLI](https://developers.openai.com/codex/cli)
**What**: OpenAI's coding agent. Open source, built in Rust. Supports agentskills.io.
**Why notable**: Strong autonomous execution (sandboxed, network-disabled). GPT-5.3-Codex can run ~25 hours uninterrupted. Relevant for autonomous skill creation.

### [OpenAI Codex App](https://openai.com/codex/)
**What**: Web-based interface for Codex with cloud sandboxed environments.
**Why notable**: Each task gets its own sandbox. Could be used for skill authoring without local setup.

### [Gemini CLI](https://github.com/google-gemini/gemini-cli)
**What**: Google's terminal AI agent. Supports agentskills.io, MCP, extensions.
**Why notable**: Skills in `.gemini/skills/` with lazy loading. Google Search grounding adds value for research skills (competitive analysis, market sizing).

### [Cursor](https://cursor.com/)
**What**: AI-first code editor. Agent skills support (nightly channel as of March 2026).
**Why notable**: Skills Hub with enterprise templates. MCP integration. Marketplace with verified plugins. Agent skills are experimental but growing.

### [Windsurf](https://docs.windsurf.com/)
**What**: AI coding IDE (VS Code fork). Cascade agent with autonomous execution.
**Why notable**: Added SKILL.md support in `.windsurf/skills/` (March 2026). Cross-agent discovery via `.agents/skills/`. Shows growing agentskills.io adoption.

### [GitHub Copilot](https://docs.github.com/en/copilot)
**What**: Microsoft/GitHub's AI assistant. Works in VS Code, JetBrains, CLI, and github.com.
**Why notable**: Agent skills natively supported. AGENTS.md and CLAUDE.md file support added. Coding agent can work autonomously on GitHub issues.

### [JetBrains Junie](https://junie.jetbrains.com/)
**What**: JetBrains' AI coding agent with skill support.
**Why notable**: Auto-imports skills from `.claude/skills/`, `.cursor/skills/`, `.codex/skills/`. LLM-agnostic. Shows cross-platform skill portability in action.

---

## 9. Articles & Deep Dives

### [Beating Context Rot with GSD (The New Stack)](https://thenewstack.io/beating-the-rot-and-getting-stuff-done/)
**Topic**: How GSD's thin-orchestrator pattern prevents quality degradation in long AI sessions.
**Key insight**: Fresh-context subagents preserve quality. Directly applicable to pm-skills' multi-skill workflow chains.

### [Claude Code Extensions Explained (Medium)](https://muneebsa.medium.com/claude-code-extensions-explained-skills-mcp-hooks-subagents-agent-teams-plugins-9294907e84ff)
**Topic**: Comprehensive overview of all Claude Code extension types.
**Key insight**: Clear taxonomy of skills vs. hooks vs. agents vs. teams. Good reference for explaining pm-skills' layered architecture.

### [A Mental Model for Claude Code (Level Up Coding)](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05)
**Topic**: Conceptual framework for understanding how skills, subagents, and plugins relate.
**Key insight**: Skills = knowledge, Hooks = guardrails, Agents = workers, Plugins = packages. Simple mental model.

### [Agent Skills Guide 2026 (Serenities AI)](https://serenitiesai.com/articles/agent-skills-guide-2026)
**Topic**: Cross-platform guide to building skills for 16+ AI tools.
**Key insight**: Practical guidance on making skills portable. Useful for pm-skills' cross-platform strategy.

### [Document AI Trends 2026 (Artificio)](https://artificio.ai/blog/document-ai-trends-2026-from-ocr-to-agentic-processing)
**Topic**: How document processing shifted from template extraction to agentic reasoning.
**Key insight**: 40% of document AI projects underperform due to integration failures, not accuracy. Routing/orchestration matters more than extraction. Validates the transcript processing agent's architecture.

### [Anthropic Opens Agent Skills Standard (VentureBeat)](https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard)
**Topic**: Strategic context for why Anthropic open-sourced the skills standard.
**Key insight**: Anthropic builds infrastructure, not moats. Same strategy as MCP. pm-skills benefits from this because the standard won't be locked down.

### [Anthropic Agent Skills Standard (Unite.AI)](https://www.unite.ai/anthropic-opens-agent-skills-standard-continuing-its-pattern-of-building-industry-infrastructure/)
**Topic**: Industry analysis of Anthropic's infrastructure-building strategy.
**Key insight**: Open standards create network effects. pm-skills' cross-platform portability is a strategic advantage that grows as more platforms adopt agentskills.io.

### [Sub-agent vs Agent Team (Medium)](https://medium.com/data-science-collective/sub-agent-vs-agent-team-in-claude-code-pick-the-right-pattern-in-60-seconds-e856e5b4e5cc)
**Topic**: When to use subagents vs. agent teams in Claude Code.
**Key insight**: Subagents = focused tasks reporting to parent. Agent teams = peers who communicate. pm-skills should use subagents for skill-level automation, agent teams only for portfolio-level orchestration.

### [How to Use Claude Code Features (ProductTalk)](https://www.producttalk.org/how-to-use-claude-code-features/)
**Topic**: Practical guide to slash commands, agents, skills, and plugins.
**Key insight**: PM-oriented perspective on Claude Code capabilities. Good reference for pm-skills' target audience.

### [GSD Beginner's Guide (DEV Community)](https://dev.to/alikazmidev/the-complete-beginners-guide-to-gsd-get-shit-done-framework-for-claude-code-24h0)
**Topic**: Step-by-step introduction to GSD framework.
**Key insight**: How a framework teaches itself to new users. Model for pm-skills' getting-started experience.

### [AI's New Rules for Repo Architecture (Augment Code)](https://www.augmentcode.com/learn/monorepo-vs-polyrepo-ai-s-new-rules-for-repo-architecture)
**Topic**: How AI agents change the monorepo vs. polyrepo calculus.
**Key insight**: AI with large context windows benefits from monorepo — can see cross-project dependencies. Supports pm-skills' single-workspace approach for multi-project management.

### [Monorepo vs. Polyrepo Reference](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
**Topic**: Comprehensive comparison of monorepo and polyrepo strategies.
**Key insight**: "If components need to release together, use a monorepo." pm-skills + project docs share a lifecycle, supporting the workspace-in-one-directory approach.

---

## 10. Document Processing & Knowledge Management

### [NVIDIA: AI Meeting Productivity](https://developer.nvidia.com/blog/boost-meeting-productivity-with-ai-powered-note-taking-and-summarization/)
**Topic**: AI-powered meeting note-taking and summarization architecture.
**Key insight**: Multi-stage pipeline (transcribe → segment → extract → summarize → route). Relevant architecture for pm-skills' transcript processing agent.

### [Granola for Researchers 2026](https://zackproser.com/blog/granola-for-researchers-2026)
**Topic**: AI meeting note tool that augments rather than replaces human notes.
**Key insight**: The best transcript tools let humans annotate alongside AI extraction. pm-skills' `/process-transcript` should suggest changes, not auto-apply them.

### [Scaled Agile Framework: Product Management](https://framework.scaledagile.com/product-management)
**Topic**: SAFe's product management practices for portfolio-level coordination.
**Key insight**: Portfolio Project Management (PPM) is the established framework for multi-project PM coordination. pm-skills' project workspace is building toward a lightweight PPM.

### [2026 PM Trends (Clarkston Consulting)](https://clarkstonconsulting.com/insights/2026-program-and-project-management-trends/)
**Topic**: Leading PMOs as "enterprise enablement engines" with AI agent governance.
**Key insight**: AI agent governance is becoming a key PMO concern. pm-skills could eventually address this — not just "use AI for PM" but "govern how AI does PM."

### [40 Best Document Management Systems 2026](https://thedigitalprojectmanager.com/tools/document-management-systems/)
**Topic**: Landscape of document management tools.
**Key insight**: None natively understand PM document types or AI skill ontologies. This is the gap pm-skills fills.
