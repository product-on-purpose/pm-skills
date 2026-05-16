# Tooling and Process Audit: Stack, Habits, and Candidate Tools

**Date:** 2026-05-03
**Scope:** Current Claude Code stack (11 plugins + MCP servers + settings), observed workflow patterns from project memory and session activity, and an evaluation of 13 named third-party tools plus 12 adjacent candidates organized by family
**Auditor:** Claude (Opus 4.7) at `/effort max`
**Trigger:** User asked which third-party tools would best level up process, stack, habits, effectiveness, and efficiency, with explicit names to evaluate
**Format:** Strategy-brief 7-section structure adapted to audit-document conventions

---

## 1. What I Heard (Input Mirror)

The ask is open-ended. Two implicit threads:

1. **Evaluate the 13 named candidates** (get-shit-done, claude-mem, memsearch, serena, claude-context, clawmem, backlog.md, caveman, token-savior, claude-task-viewer, mission-control, open-brain, beads) and tell me which actually fit my workflow.
2. **Expand beyond the named list.** Surface tools I do not know about that would level up process, habits, effectiveness.

The implicit grounding (read between the lines from the rest of the session and from memory):

- The user already runs 11 plugins. They are aware adding more is not free. They want signal, not a long list.
- They are mid-release (v2.12.0 just tagged today), with 11 uncommitted items in the working tree and 9 orphaned `claude/*` branches surfaced by the branches audit one message earlier. Process pain is fresh.
- The recently saved feedback memory (`feedback_no-effort-doc-bloat.md`, 2026-05-03) flagged that 21 proposed F-XX effort docs were too much for refactor cycles. This signals the effort-tracking surface itself is over-stressed.
- They have a custom plugin (`jp-library` v1.1.0) which already covers parts of the workflow surface (spec creation, AI review, strategy brief, session wrap, project init, skill builder, guide creation). Recommendations have to respect that.

The audit avoids: tool lists for their own sake, generic productivity advice, and recommendations that duplicate what jp-library already does.

---

## 2. Workflow Context and Pain Points

### 2.1 Who is operating

A solo Product Manager building an open-source PM skills library on the side, while learning the Claude Code + Codex + MCP ecosystem by building with it (per `user_pm-role-and-motivation.md`). The work is dual-purpose: (a) ship a useful library, (b) build personally transferable AI+PM capability. There is no team, no junior dev, no CI/CD operator. Every minute spent on tool friction is a minute not spent on either goal.

### 2.2 Output cadence and complexity

Twelve repo-level releases shipped in roughly four months (v2.0 to v2.12, January through May 2026). Each release ships skills, samples, docs, and CI updates across 30 to 100+ files. Recent releases have introduced cross-cutting families (Meeting Skills v2.11.0, OKR pair v2.12.0) requiring contract documents and enforcing CI scripts. There are 130+ session directories under `~/.claude/projects/E--Projects-product-on-purpose-pm-skills/`, each representing a working conversation. The volume is high.

### 2.3 Pain points observed in this session and recent memory

Five distinct pain themes, ranked by recency and severity:

**P1. Release-prep mechanical reconciliation.** v2.12.0 status (per its plan) shows 26 files updated for stale-count drift in commit `92cfbcf`, plus four Codex adversarial review rounds catching 9 MEDIUM findings across rendered docs, frontmatter, dates, anchors, and audit-trail accuracy. The structure audit (2026-05-01) found `check-count-consistency.sh` had a regex gap that let "38 AI agent skills" pass while flagging "38 skills". The pattern is: mechanical drift accumulates faster than CI catches it, and Codex catches it on the way out the door.

**P2. Effort-doc bloat on refactor cycles.** Just-saved feedback memory (today): "this may have gotten away from me. I just want to get this done. I think I need to remove the primary documents." The proposal of 21 F-XX effort docs for audit-derived items was too much for the refactor surface. The fix was inline rows in release plans, but the underlying signal is that the markdown-effort-doc surface is taking too much time relative to the value it provides.

**P3. Branch lifecycle has no automation.** The audit immediately preceding this one found 9 orphaned `claude/*` remote branches (no PR ever opened), 4 fully-merged-not-deleted local branches, and 1 closed-PR-survivor. The pattern dates from January through early April 2026. No tool or hook prevents the orphan-without-PR pattern.

**P4. Working-tree drift across many parallel threads.** Right now (mid-session): 2 modified tracked files plus 9 untracked items, all related to v2.12.0 release prep, several audit docs, several effort docs, a v2.13.0 plan stub, and a skills-ideas folder. The release plan's status table itself is stale on the "Pending push" row. Multiple in-flight strands without a single source of truth for "what is committable now."

**P5. Cross-LLM review is manual.** The Phase 0 Adversarial Review Loop produces strong outcomes (4 rounds on v2.12.0 caught real defects below IMPORTANT severity), but the protocol is hand-driven through Codex with structured prompts. A `cross-llm-review` skill is in the backlog but not built. The friction surface is real and recurring.

### 2.4 Implicit constraints

- Solo operator. Tools that assume a team-of-N are over-shaped.
- Open-source repo with employer-neutrality requirement (`feedback_pmskills-employer-neutrality.md`). No tool that pulls in proprietary context belongs.
- Hard rule: no em-dashes anywhere (`feedback_no-em-dashes.md`). Tool selection is unaffected, but any tool that auto-generates content needs configurable output style.
- Windows 11 / PowerShell primary, with Bash available. Tools must work cross-platform or have Windows binaries.
- Heavy reliance on auto-accept (`defaultMode: acceptEdits`) plus `skipDangerousModePermissionPrompt: true`. This means the user is comfortable with autonomous operation, which tilts toward agent-driven tools rather than approval-heavy ones.

---

## 3. Analysis

### 3.1 Current stack inventory

Eleven plugins enabled (per `installed_plugins.json`):

| Plugin | Version | Installed | Role | Notes |
|--------|---------|-----------|------|-------|
| `code-simplifier` (official) | 1.0.0 | 2026-03-06 | Code refactor | Used ad hoc |
| `commit-commands` (official) | unknown | 2026-03-06 | Git commit + PR helpers | Active |
| `claude-md-management` (official) | 1.0.0 | 2026-03-06 | CLAUDE.md upkeep | Active |
| `plugin-dev` (official) | unknown | 2026-03-06 | Plugin/skill scaffolding | Active |
| `skill-creator` (official) | unknown | 2026-03-06 | Skill creation/eval | Active |
| `claude-mem` (thedotmack) | 10.5.2 | 2026-03-06 | Persistent session memory | Heavily used, MCP server visible |
| `superpowers` (obra) | 4.3.1 | 2026-03-06 | Process skills (TDD, debugging, brainstorming, plans) | Active |
| `codex` (openai) | 1.0.2 | 2026-04-02 | Codex rescue/review | Phase 0 review loop's executor |
| `jp-library` (custom) | 1.1.0 | 2026-04-14 | Custom workflow library | Authoritative for spec/plan/review/wrap/init/skill-builder/guide |
| `memsearch` (zilliz) | 0.4.1 | 2026-05-01 | Cross-session memory recall | Recently added |
| `frontend-design` (official) | unknown | 2026-05-01 | Frontend code generation | Recently added, probably untested |

Plus MCP servers (visible from deferred-tool list): ClickUp, Gmail, Google Calendar, Google Drive, Krisp, Notion, context7, Playwright, vibe_kanban, plus claude-mem's own MCP (`mcp__plugin_claude-mem_mcp-search`).

### 3.2 Five core lenses

**Strengths.** The current stack is unusually well-curated for a solo operator. The `jp-library` covers significant custom workflow ground (spec, plan, review, wrap, init, skill-builder, guide, strategy-brief). claude-mem + memsearch addresses cross-session memory two ways. codex + the Phase 0 protocol gives adversarial review on releases. superpowers gives process discipline. There is genuine complementarity, not just plugin-collecting.

**Weaknesses.** The stack is memory-heavy and task-tracking-light. Tasks are tracked through markdown F-XX docs that the user just admitted are bloating. There is no first-class issue tracker integrated with sessions. There is no semantic code search (38 skills + ~130 docs are read whole when scanned). There is no token-budget visibility (no Token Optimizer or Token Savior installed; the user does not know which plugins/MCPs are eating context). There is no branch hygiene automation. The Linear plugin is not installed but the user is exposed to similar tracking surfaces in their job, so the gap is felt.

**Risks.** Each additional plugin adds context baseline (per the 2026 plugin best-practices articles, the consensus is "two to three active plugins maximum"). The user is at 11 plus 10+ MCP servers. Adding more without removing anything risks degrading Claude's context-window efficiency. Several adjacent tools (Token Savior, Cognee, ClawMem, Claude Context) overlap with claude-mem at the storage layer; running two persistent-memory plugins in parallel is a known footgun. The Phase 0 protocol depends on the codex plugin remaining maintained (it is at v1.0.2 with a SHA from early April; check the upstream maintenance signal).

**Open questions.** Three questions are load-bearing for the recommendation:
- Q1: Is the user ready to move task tracking out of markdown F-XX files into a dedicated tracker (Beads, Backlog.md), or is the markdown-native effort-doc system load-bearing for the audit/decision-record culture?
- Q2: Does the user want output-token reduction (Caveman) at the cost of voice/style, or is the existing terse profile already sufficient?
- Q3: Are sub-agent and multi-session orchestration (Mission Control, Agent Teams) actually relevant given a solo workflow that mostly runs one session at a time?

**Concerns.** Two specific worries:
- The recent feedback memory shows the user pushing back when a process gets too heavy. Adding tools that themselves have a learning curve and ongoing maintenance overhead is the wrong direction. Recommendations must include an honest "what to remove" alongside "what to add."
- The user is using pm-skills as a learning vehicle for AI+PM intersection. Adopting an opinionated tool (e.g., get-shit-done's full meta-prompting harness) could distort the learning by hiding what was being learned. The bias should favor smaller, composable tools over monolithic harnesses.

### 3.3 Two situational lenses

**Lens: solo operator economics.** A solo operator's time is the binding constraint, not throughput, not coordination, not parallelism. Tools that add 2 hours of setup to save 30 minutes per week pay back in 4 weeks if the savings are real. Tools that add 2 hours of setup to save 15 minutes per week never pay back. The math here is brutal and most tool adoption fails this test.

**Lens: open-source library maintainer.** As a library author, the user is also a publisher. Tools that improve outbound-quality (linters, validators, drift-detection, samples-aware CI) compound. Tools that improve inbound-comprehension (semantic code search, knowledge-graph navigation) help on cross-cutting refactors but are less critical than for closed-source product work where surface area is hidden behind interfaces.

---

## 4. Approaches: Tool Families and Candidates

Organized into seven families. Within each, the named candidates are evaluated and adjacent candidates are surfaced. Each family closes with a verdict (Adopt, Skip, Defer).

### 4.1 Family A: Persistent Memory and Session Continuity

**Status: largely covered.** The user runs claude-mem (10.5.2) and memsearch (0.4.1), both active.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **claude-mem** (have) | Auto-captures sessions, AI-compresses, injects context next session. SQLite + ChromaDB. 65k+ stars. | Already installed | Generates the daily timeline summaries seen in SessionStart context |
| **memsearch** (have) | Cross-session semantic recall via Zilliz | Already installed | Adds to claude-mem rather than replacing it |
| **ClawMem** (yoloshii) | On-device memory + RAG, hooks + MCP, OpenClaw native. SQLite vault. | OVERLAP | Architecturally similar to claude-mem; running both would conflict on the same context-engine slot |
| **Token Savior** (Mibayy) | Persistent memory with Bayesian validity ranking, contradictions detected at save, TTL decay. Plus structural code nav. 77% token reduction claimed. | OVERLAP | The memory side overlaps claude-mem; the code-nav side belongs in Family B |
| **Cognee** (topoteretes) | Knowledge graph as memory layer, 6 lines of code | OVERLAP | KG approach distinct from FTS/vector but adds another storage |
| **Remember.md** | Second brain for OpenClaw + Claude Code, Obsidian backend | OVERLAP | Different backend (Obsidian vault) but same role |
| **mcp-knowledge-graph** (shaneholloman) | KG-based MCP for persistent memory | OVERLAP | Same role |

**Verdict: Skip the family additions.** The user's two-tool stack (claude-mem + memsearch) already covers session capture and cross-session recall. Adding another memory layer creates context-baseline overhead and storage-layer competition. The honest move would be to evaluate whether memsearch (added 2 days ago) is actually pulling its weight versus claude-mem alone, and demote one if not.

### 4.2 Family B: Semantic Code and Doc Retrieval

**Status: missing entirely.** The current stack has no semantic retrieval over the 38 skills + ~200 docs. Reads are whole-file via the Read tool. This is a real gap on cross-cutting refactor work, especially given the recent count-drift saga.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **Serena** (oraios) | LSP-based symbol-level retrieval, 30+ languages, find_symbol, find_referencing_symbols, insert_after_symbol | STRONG FIT | Designed exactly for "navigate without whole-file reads." Markdown coverage is via the LSP backend; some mileage may vary on docs vs code |
| **Claude Context** (zilliztech) | Hybrid BM25+vector search, Merkle-tree incremental indexing, AST-aware chunking, multiple embedding providers | STRONG FIT | Built for "entire codebase as context". Requires vector DB (Zilliz Cloud free tier or local Milvus) |
| **Token Savior** (Mibayy) | Symbol/import/call-graph indexing, 97% character reduction in injected context | STRONG FIT | Strongest token-reduction claim (with caveats; verify on this repo) |
| **code-review-graph** (tirth8205) | Local KG of codebase, 6.8x fewer tokens on reviews, 49x on daily tasks | STRONG FIT | Narrower than Serena but has measured numbers |
| **Understand-Anything** (Lum1104) | Multi-agent KG builder + interactive dashboard | INTERESTING | Heavier to set up; not a great solo-operator first move |

**Verdict: Adopt one, probably Serena.** This is the single most defensible new addition. The repo has 38 skill folders (each with SKILL.md + TEMPLATE.md + EXAMPLE.md), ~200 docs in `docs/`, ~17 scripts, plus generated mirrors. Whole-file reads dominate the audits (the structure audit cited reading "every top-level file"). LSP-based symbol navigation collapses that. Serena is the most mature option with the cleanest Claude Code integration. Claude Context is the alternative if vector-DB-as-context is preferred. Run for two weeks, measure, then decide.

### 4.3 Family C: Task and Issue Tracking

**Status: critical gap.** Current tracking lives in:
- `docs/internal/efforts/F-XX-*.md` (the markdown effort docs the user just complained about)
- `docs/internal/release-plans/vX.Y.Z/` (per-release plan documents)
- `docs/internal/backlog-canonical.md` (priority-ordered backlog)
- ad-hoc inline checklists in plans

This is markdown-native, git-versioned, and AI-readable, but it has no query layer, no dependency graph, no cross-session sync, and (per just-saved feedback) is bloating fast.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **Beads** (yegge / gastownhall) | Git-backed JSONL + SQLite cache, distributed/conflict-free, semantic memory decay summarizes old closed tasks, designed for AI agent context recovery, 17+ AI tool integrations | VERY STRONG FIT | Solves three of the user's pain points at once: (a) eliminates F-XX bloat by giving structured task storage with the markdown ergonomics preserved, (b) cross-session continuity when claude-mem alone is not enough, (c) dependency tracking that audit-derived item lists need. v0.59.0 March 2026 |
| **Backlog.md** (MrLesk) | Markdown-native tasks in `backlog/` directory, terminal Kanban, web UI, MCP server, AI-readable | STRONG FIT | More aligned with the existing markdown-native culture but less powerful than Beads on dependencies and decay |
| **Claude Task Viewer** (L1AD) | Web Kanban for Claude Code Tasks at `~/.claude/tasks/`, real-time, cross-session sync | COMPLEMENT | Visualizes the *built-in* Tasks system that Anthropic shipped with Opus 4.5. Useful regardless of the above |
| **tasc** (dmissoh) | Terminal UI for Claude Code Tasks | COMPLEMENT | Same role, terminal flavor |
| **claude-task-master** (eyaltoledano) | Cross-tool task management (Cursor, Lovable, Windsurf, Roo) | INTERESTING | Less compelling for Claude Code primary user |
| **Linear plugin** | Linear issue tracker integration | OVERKILL | Solo OSS project does not need a hosted tracker |

**Verdict: Adopt Beads.** This addresses the loudest-and-most-recent pain (F-XX effort doc bloat) by giving structured task storage that matches the user's git-backed, markdown-friendly culture without requiring a SaaS account. The semantic memory decay aligns with the audit-archive pattern already in use (`docs/internal/audit/_archived/`). Backlog.md is the more conservative second-place if Beads' dependencies-and-decay surface is too much.

Also: install **claude-task-viewer or tasc** as a passive viewer on `~/.claude/tasks/`. The built-in Anthropic Tasks system (since Opus 4.5, January 2026) is being created automatically by the agent; visualizing it costs nothing and surfaces useful telemetry.

### 4.4 Family D: Token and Context Budget Optimization

**Status: blind spot.** No tool currently surfaces what is eating context budget. Given 11 plugins + 10+ MCP servers, the baseline is meaningful but invisible.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **Caveman** (JuliusBrussee) | Cuts ~65 to 75% of *output* tokens via terse-mode rules, multiple intensity levels, sub-agents emit ~60% fewer tokens | DEFER | Output already trends terse under user feedback. Risk: voice change. Could try the lite mode for sub-agent outputs only |
| **Token Optimizer** (alexgreensh) | Visibility tool: where every token went, per-turn cost, which skills/MCPs fired vs sat idle | STRONG FIT | Pure observability. Low risk, high signal. Best first step before pruning the plugin set |
| **Token Savior** (Mibayy) | Code nav + memory; secondary token reduction effect | (See Family B) | Already evaluated above |
| **claude-token-efficient** (drona23) | Drop-in CLAUDE.md keeping responses terse | OVERLAP | Already covered by user's existing CLAUDE.md style and global no-em-dashes rule |
| **Context-mode** | Routes tool outputs into sandbox knowledge base | INTERESTING | Niche; useful when MCPs return huge JSON dumps |
| **claude-view** (recca0120) | Real-time cost tracking dashboard per session | STRONG FIT | Sister to Token Optimizer; gives the spend-per-session view |

**Verdict: Adopt Token Optimizer (or claude-view) for visibility, defer Caveman.** Before pruning anything (Family A overlap question, Frontend Design plugin sitting unused), it is worth knowing what is actually expensive. Token Optimizer is observation-only, so it can run for a week and inform the next round of decisions.

### 4.5 Family E: Spec-Driven and Agentic Workflow Harness

**Status: largely covered by jp-library.** The `jp-library` plugin already provides /jp-create-spec, /jp-create-plan implicit, /jp-strategy-brief, /jp-ai-review, /jp-init-project, /jp-skill-builder, /jp-create-guide, /jp-wrap-session. This is a coherent custom harness.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **get-shit-done** (gsd-build) | Meta-prompting + spec-driven dev system, 100+ commands/agents, git-bisect-enabled task execution, PreCompact/SessionStart hooks for handoff. Trusted by Amazon/Google/Shopify/Webflow engineers | RISKY OVERLAP | Comprehensive. Would partially supplant jp-library's role. Adopting it means replacing custom work with a community tool. Hidden cost: the custom jp-library is itself a learning artifact |
| **shinpr/claude-code-workflows** | Specialized AI agents for production workflows | OVERLAP | Similar concern |
| **Ralph loop** | Autonomous coding loop | NICHE | Not aligned with PM-skills work |

**Verdict: Skip get-shit-done unless willing to deprecate jp-library overlap.** The honest path is: if get-shit-done would replace 60%+ of jp-library, evaluate it on a side project first. If it would only replace 20%, stay custom. The user's `feedback_no-effort-doc-bloat` and the related custom evolution suggest jp-library is being shaped to fit pm-skills specifically, which is more valuable than a generic harness.

A useful middle path: **read get-shit-done's CLAUDE.md and command list, harvest specific patterns** (e.g., the PreCompact handoff hook, the SessionStart resume-work auto-invoke) into jp-library or settings.json hooks. Pattern-borrow without plugin-adopt.

### 4.6 Family F: Multi-Session Orchestration and Mission Control

**Status: probably not relevant yet.** The 130+ session directory count looks like sequential serial sessions, not parallel multi-agent fleets. The user is mostly running one session at a time.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **Mission Control** (builderz-labs) | Self-hosted dashboard for AI agent fleets, dispatches tasks, tracks costs, multi-agent workflows. SQLite, zero external deps | DEFER | Powerful for teams. Solo operator does not have agent fleets to monitor |
| **claude-view** | Live monitoring + cost tracking for all sessions | (See Family D) | More useful as a cost-visibility tool than as orchestration |
| **Anthropic Agent Teams** | Built-in team-lead + teammates pattern (since Opus 4.5) | EXPLORE | Built-in, free. Worth experimenting with for one cross-cutting refactor |
| **Conductor / Multiclaude / Gas Town / Ruflo / Shipyard** | Various multi-agent orchestration platforms | DEFER | Same scale concern |
| **Paperclip** | "Human control plane for AI labor" | DEFER | Team-scale |

**Verdict: Defer the family. Consider claude-view from Family D for cost visibility instead of orchestration.** If the user starts running a worktree-per-effort pattern (the worktrees folder exists at `pm-skills_worktrees/` but the branch audit found no active worktrees), reopen the Mission Control question then.

### 4.7 Family G: Cross-LLM Adversarial Review

**Status: largely covered, with codified pattern.** The Phase 0 Adversarial Review Loop is a workflow asset. The codex plugin v1.0.2 is the executor. The cross-llm-review skill is in backlog but not built.

| Candidate | What it does | Fit | Notes |
|-----------|--------------|-----|-------|
| **codex plugin** (have, openai/codex-plugin-cc) | /codex:rescue, /codex:setup | Already integrated | The Phase 0 backbone |
| **Custom cross-llm-review skill** (planned) | Formalize the manual three-party protocol | BUILD | The user's own backlog item; tooling does not replace this |
| **Other LLM bridges** (Gemini, GPT-5.4 outside Codex) | Direct cross-model review | DEFER | Codex covers GPT-5.4 already |

**Verdict: Build the cross-llm-review skill rather than adopt a tool.** Per `reference_cross-llm-review-protocol.md`, the manual three-party protocol produces better output than raw `/codex:rescue` dispatch. Formalizing as a jp-library skill closes the loop the user already designed.

---

## 5. The 80/20 Recommendation

> **REVISED in Section 9 after benchmark verification.** Token Optimizer (alexgreensh) was NOT in the top performers in the ComputingForGeeks independent benchmark; Token Savior, claude-token-efficient (drona23), and Caveman all scored higher on actual measured token savings. See Section 9.2 for the corrected 80/20 picks. The Beads and Serena recommendations stand and are strengthened by verification.

The strongest single-action (initial draft, superseded): **install Beads + Serena + Token Optimizer (or claude-view), in that order, over the next week**. Skip everything else from the named list.

Reasoning per pick:

**Beads (Family C, highest leverage).** Solves the loudest pain (F-XX effort doc bloat from earlier today) with the least workflow disruption (markdown-friendly, git-backed, no SaaS required). The semantic memory decay aligns with the audit-archive culture already in place. Cross-session task continuity addresses the working-tree-drift pain seen right now (11 uncommitted items, multiple parallel strands). Stealth mode (`bd init --stealth`) means it can run inside pm-skills without committing the JSONL files if the user wants to evaluate before committing to the pattern.

**Serena (Family B, second-highest leverage).** The repo has 38 skills + 200+ docs + 17 scripts. Cross-cutting work (count reconciliation, frontmatter sweeps, em-dash sweeps, family-contract enforcement) currently runs on whole-file reads. LSP-based symbol-level navigation collapses that token surface. Pays back fastest on the next big refactor cycle.

**Token Optimizer or claude-view (Family D, observability).** The user does not currently see which of the 11 plugins + 10+ MCP servers + N skills is eating budget. Without that visibility, every "should I add or remove a tool?" question is answered by feel. One week of running Token Optimizer surfaces the actual cost map.

### 5.1 Concrete next actions

1. **This week (highest priority):** Install Beads via the plugin route (`claudepluginhub.com/plugins/dbmcco-beads`) or directly. Run `bd init` in pm-skills (decide stealth or committed). Migrate the F-37 effort and the next 3 to 5 v2.13.0 work items into Beads tasks rather than authoring new F-XX docs. Compare the experience against the markdown-effort-doc baseline after one week.
2. **Next week:** Install Serena per `https://github.com/oraios/serena`. Configure for the pm-skills repo. Use it on the next cross-cutting work (likely the v2.13.0 sample-automation slate per the deferred-efforts list). Measure token usage versus the pre-Serena baseline.
3. **Concurrently:** Install Token Optimizer or claude-view. No new behavior; just observe for a week and report findings into the v2.13.0 plan.

### 5.2 What to explicitly defer

- **Caveman.** Do not change the output style. The current voice profile is already shaped by user feedback.
- **get-shit-done.** Do not adopt as a plugin; harvest specific patterns (PreCompact handoff hook, SessionStart resume-work) into settings.json hooks if useful.
- **Mission Control / Agent Teams / multi-agent platforms.** Solo workflow does not justify the infrastructure. Revisit if the worktree pattern becomes load-bearing.
- **ClawMem / Token Savior memory side / Cognee.** All overlap claude-mem. One persistent-memory plugin is enough.
- **Claude Context.** Strong tool but redundant with Serena for the immediate problem. Adopt only if Serena's LSP coverage on docs is insufficient.

### 5.3 What to remove or evaluate-and-remove

- **Frontend Design plugin** (installed 2026-05-01, version `unknown`). The repo is documentation-and-skill-heavy, not frontend code. Confirm whether this has been used since installation; if not, remove.
- **memsearch** (installed 2026-05-01). Two days old. Worth running Token Optimizer for a week to confirm it is providing recall the claude-mem MCP does not. If not, demote to claude-mem alone.

### 5.4 Confidence and reasoning

**Confidence: high** on Beads as the single highest-value addition. Direct match to a just-saved feedback memory pain point. Architecture aligned with existing markdown/git culture. Can be evaluated in stealth mode without irreversible commitments.

**Confidence: medium-high** on Serena. The token-saving claim is well-attested across multiple 2026 reviews and the LSP integration is solid. Variance: how well it handles markdown-heavy retrieval (the repo has more prose than typical code projects).

**Confidence: medium** on Token Optimizer / claude-view choice. Both work; the difference is dashboard style. claude-view's cost tracking is more actionable; Token Optimizer's per-skill firing data is more diagnostic. Pick by preference.

**Confidence: high** on the *defer* list. Each of those tools is fine in its own context; none fits the user's situation right now.

---

## 6. Evidence and Source Map

### 6.1 Internal sources (project memory and current session)

- `MEMORY.md` (auto-memory index, 92 lines)
- `feedback_no-em-dashes.md` (rule, 2026-04-13)
- `feedback_pmskills-employer-neutrality.md` (rule, 2026-04-30)
- `feedback_no-effort-doc-bloat.md` (rule, 2026-05-03, today)
- `feedback_agent-assignment-framework.md` (framework)
- `reference_cross-llm-review-protocol.md` (protocol)
- `user_pm-role-and-motivation.md` (user context)
- `project_meeting-skills-family.md` (active project state)
- `C:\Users\jpris\.claude\settings.json` (11 plugins, MCP servers, permissions)
- `C:\Users\jpris\.claude\plugins\installed_plugins.json` (versions and install dates)
- `C:\Users\jpris\.claude\CLAUDE.md` (global no-em-dashes rule)
- `E:\Projects\product-on-purpose\pm-skills\CLAUDE.md` (project rules)
- `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md` (recent release context)
- `docs/internal/audit/branches-pr_2026-05-03.md` (just-completed branches audit)
- `docs/internal/audit/audit_repo-structure_2026-05-01.md` (recent structure audit)
- Session activity: 130+ session directories under the project memory tree

### 6.2 External sources (web research, 2026)

Family A (memory):
- [claude-mem GitHub](https://github.com/thedotmack/claude-mem) - 65k+ stars, AGPLv3
- [ClawMem GitHub](https://github.com/yoloshii/ClawMem) - on-device memory layer
- [Token Savior GitHub](https://github.com/mibayy/token-savior) - Bayesian validity, 77% reduction
- [Cognee GitHub](https://github.com/topoteretes/cognee) - knowledge graph memory

Family B (semantic retrieval):
- [Serena GitHub](https://github.com/oraios/serena) - LSP-based, 30+ languages
- [Serena Review 2026 (vibecodinghub)](https://vibecodinghub.org/tools/serena)
- [Claude Context GitHub (Zilliz)](https://github.com/zilliztech/claude-context) - hybrid BM25+vector
- [code-review-graph GitHub](https://github.com/tirth8205/code-review-graph) - 6.8x token reduction
- [Understand-Anything GitHub](https://github.com/Lum1104/Understand-Anything)

Family C (task tracking):
- [Beads GitHub (Steve Yegge)](https://github.com/steveyegge/beads) - git-backed JSONL + SQLite, semantic memory decay, v0.59.0 March 2026
- [Beads PLUGIN.md](https://github.com/steveyegge/beads/blob/main/docs/PLUGIN.md)
- [Backlog.md GitHub (MrLesk)](https://github.com/MrLesk/Backlog.md) - markdown-native task manager
- [Claude Task Viewer (L1AD)](https://github.com/L1AD/claude-task-viewer)
- [tasc (dmissoh)](https://github.com/dmissoh/tasc) - terminal UI

Family D (token/context):
- [Caveman GitHub (Brussee)](https://github.com/JuliusBrussee/caveman) - 65-75% output reduction
- [Token Optimizer (alexgreensh)](https://github.com/alexgreensh/token-optimizer) - ghost-token diagnosis
- [claude-view (recca0120)](https://recca0120.github.io/en/2026/04/07/claude-view-mission-control/) - cost dashboard
- [Reduce Claude Code tokens (computingforgeeks)](https://computingforgeeks.com/reduce-claude-code-token-usage-tools/)

Family E (spec-driven):
- [get-shit-done GitHub](https://github.com/gsd-build/get-shit-done) - meta-prompting + spec-driven
- [GSD Plugin (jnuyens)](https://github.com/jnuyens/gsd-plugin) - performance-optimized version
- [shinpr claude-code-workflows](https://github.com/shinpr/claude-code-workflows)

Family F (orchestration):
- [Mission Control (builderz-labs)](https://github.com/builderz-labs/mission-control)
- [Anthropic Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [Shipyard 2026 multi-agent guide](https://shipyard.build/blog/claude-code-multi-agent/)
- [wshobson/agents](https://github.com/wshobson/agents) - intelligent automation

Family G (review):
- (Internal: Phase 0 protocol at `docs/internal/release-plans/v2.11.0/plan_v2.11_pre-release-checklist.md`)

Plugin-selection meta-guidance:
- [Top 10 Claude Code Plugins 2026 (firecrawl)](https://www.firecrawl.dev/blog/best-claude-code-plugins)
- [Best plugins tested review (buildtolaunch)](https://buildtolaunch.substack.com/p/best-claude-code-plugins-tested-review) - "10 tested, 4 worth keeping"
- [10 top Claude Code plugins (Composio)](https://composio.dev/content/top-claude-code-plugins) - "two to three active plugins maximum"

### 6.3 Evidence gaps

- **Beads' Windows compatibility.** The README mentions cross-platform but the Go binary distribution and SQLite path handling on Windows is worth verifying before commitment.
- **Serena on markdown-heavy repos.** All the success stories cite code-language-server backends (Python, TypeScript, Go, Rust). The pm-skills repo is mostly markdown with bash/python scripts. Coverage may be partial for the docs surface.
- **Real measured token savings on this repo.** Every tool's "X% reduction" claim is benchmark-specific. The recommendations assume the reductions transfer; a one-week measurement after install is the only way to confirm.
- **Plugin baseline cost.** No data on what the current 11-plugin + 10-MCP baseline actually adds to context. Token Optimizer's first run will quantify this.

---

## 7. Uncertainties and Open Items

### 7.1 What I am unsure about

- **Beads vs Backlog.md.** Both could solve the F-XX bloat pain. Beads has stronger AI-context features (semantic decay, dependency graph), Backlog.md is conceptually closer to the existing markdown-native pattern. The right choice depends on whether the user wants to add structure (Beads) or formalize what already exists (Backlog.md). Confidence: medium. Worth a 1-week pilot of one before deciding.
- **Whether Serena handles the docs surface well.** Confidence: medium-high on the code/script side, medium on the markdown side. Recommendation stands but verify on first cross-cutting refactor.
- **Whether to remove memsearch or Frontend Design.** No usage data yet. Token Optimizer would tell us in a week.
- **The right token-optimization tool to choose.** Token Optimizer (diagnosis) and claude-view (cost dashboard) are both useful. They serve slightly different questions. If forced to one, claude-view because monetary cost is more actionable than diagnostic counts.

### 7.2 What requires human judgment

- **Whether jp-library should evolve toward harvesting get-shit-done patterns or stay deliberately custom.** Tool selection cannot answer this; it depends on whether the user wants jp-library to be a learning artifact (custom is better) or a reusable framework (harvesting community patterns is better).
- **Whether to enable Anthropic Agent Teams.** Experimental and potentially powerful for cross-cutting refactors. The decision is more about appetite for experimentation than about correctness.
- **Whether to retire any current plugin.** Frontend Design is the most obvious candidate but the user may have a planned use case. memsearch is the second candidate but the install date is too recent to judge.
- **Build-vs-buy on the cross-llm-review skill.** The skill is in the user's backlog but adopting a community tool here was rejected for good reasons in the audit. Whether to prioritize building the skill is a planning question.

### 7.3 What would benefit from additional research

- **Read the Beads PLUGIN.md and Steve Yegge's blog post on Beads' design philosophy** before committing. The "memory decay" pattern in particular has architectural implications for how the user thinks about audit archives.
- **Spike Serena on a single day's worth of cross-cutting work** (e.g., the next stale-count reconciliation pass). Compare token usage and time-to-completion versus the existing whole-file pattern.
- **Read the get-shit-done CLAUDE.md and command list** purely to harvest pattern ideas (PreCompact hook, SessionStart auto-resume) without adopting the plugin.
- **Audit the MCP server list in settings.json against actual usage.** ClickUp, Gmail, Calendar, Drive, Notion, Krisp, Playwright, vibe_kanban, context7, claude-mem MCP all consume context baseline. Some may be unused for pm-skills work specifically.

### 7.4 Suggested follow-up artifacts

If the recommendations move forward, three follow-up documents would close the loop:

1. **Spike summary after 1 week of Beads + Serena + Token Optimizer** at `docs/internal/audit/tooling-spike_2026-05-XX.md`. Captures actual token measurements, friction points, and stay/remove decisions.
2. **Updated `_NOTES/` or backlog item** for the cross-llm-review skill, formalizing the manual three-party protocol per `reference_cross-llm-review-protocol.md`.
3. **Plugin set decision record** (MADR or ADR style) that documents which plugins are active, why, and the trim list. Could live at `docs/internal/decisions/M-XX-plugin-stack-2026-05.md`.

---

## 8. Quick Reference: Verdicts on the 13 Named Tools

For scanning. Detailed reasoning is in Section 4.

| # | Tool | Family | Verdict | Reason |
|---|------|--------|---------|--------|
| 1 | get-shit-done | E (workflow) | **Skip** (harvest patterns) | Overlaps custom jp-library; learning value lost |
| 2 | claude-mem | A (memory) | **Already installed** | Active, working |
| 3 | memsearch | A (memory) | **Evaluate-and-keep-or-remove** | 2 days old, no usage data yet |
| 4 | serena | B (retrieval) | **Adopt (week 2)** | Highest token-leverage gap |
| 5 | claude-context | B (retrieval) | **Defer** | Redundant with Serena for the immediate need |
| 6 | clawmem | A (memory) | **Skip** | Overlaps claude-mem |
| 7 | backlog.md | C (tracking) | **Adopt as alt to Beads** | If Beads structure feels heavy |
| 8 | caveman | D (tokens) | **Defer** | Output style already terse; risk of voice change |
| 9 | token-savior | A+B (memory+nav) | **Defer** | Memory side overlaps; nav side covered by Serena |
| 10 | claude-task-viewer | C (tracking) | **Adopt (passive)** | Visualizes built-in Tasks at zero cost |
| 11 | mission-control | F (orchestration) | **Defer** | Solo workflow; revisit if worktree pattern grows |
| 12 | open-brain | A (memory) | **Skip** | (Likely Remember.md or similar; overlaps memory layer) |
| 13 | beads | C (tracking) | **Adopt (week 1)** | Highest workflow leverage; matches just-saved feedback pain |

Plus three additions from outside the named list:

| # | Tool | Family | Verdict | Reason |
|---|------|--------|---------|--------|
| 14 | Token Optimizer (alexgreensh) | D (observability) | **Adopt (concurrent)** | Visibility before pruning; informs everything else |
| 15 | claude-view (recca0120) | D + F | **Adopt (alt to #14)** | Cost dashboard alternative |
| 16 | Anthropic Agent Teams | F (orchestration) | **Explore (built-in)** | Free, experimental, low commitment |

---

## 9. Round 2: Verified Evidence and Revised Recommendations

This section was added after the user requested that recommendations be backed by verified or validated claims about the tools. I went back, fetched the actual GitHub repos for several candidates, found one independent benchmark with measured numbers, and made corrections where Round 1 was wrong or thin.

### 9.1 The independent benchmark that changes things

**Source:** [ComputingForGeeks - Reduce Claude Code Token Usage Tools](https://computingforgeeks.com/reduce-claude-code-token-usage-tools/)

**Methodology (verified):** Ubuntu 24.04 VM, Claude Code 2.1.116 with Sonnet 4.5, single task ("propose 3 improvements to the ky repository, 52 TypeScript files, 17,461 LOC"). Baseline: 284,473 tokens, $0.27. The author explicitly reports tools that did NOT help.

**Top performers (by measured token savings):**

| Rank | Tool | Savings | Method | My Round 1 verdict |
|------|------|---------|--------|---------------------|
| 1 | [Mibayy/token-savior](https://github.com/mibayy/token-savior) | **43%** | Symbol-level file navigation via MCP | "Defer (overlap)" - WRONG |
| 2 | [drona23/claude-token-efficient](https://github.com/drona23/claude-token-efficient) | **40%** | A 619-byte CLAUDE.md ruleset | "Overlap" - SUBSTANTIALLY WRONG |
| 3 | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | **38%** | Output prose reduction | "Defer" - PARTIALLY WRONG |
| 4 | [ooples/token-optimizer-mcp](https://github.com/ooples/token-optimizer-mcp) | **23%** | Cached tool output via SQLite | Different tool than Round 1 mentioned |

**Tools the author explicitly did NOT recommend:**
- [alexgreensh/token-optimizer](https://github.com/alexgreensh/token-optimizer) - 703 stars, claims 8-30% savings on read deduplication. Not in top performers; the official numbers (8 to 30%) are weaker than the alternatives. **My Round 1 recommendation to install this was incorrect.**
- [nadimtuhin/claude-token-optimizer](https://github.com/nadimtuhin/claude-token-optimizer) - "stale, skip" (no commits since November 2025).
- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) - Only 5% savings on small repos. The 6.8x to 49x reduction claim is monorepo-specific. Not appropriate for pm-skills.

**Author's recommended stacks (the actionable output of the benchmark):**
- **Solo developers**: Claude Code Router + drona23 CLAUDE.md + `MAX_THINKING_TOKENS=8000`
- **Heavy agentic workflows**: Token Savior (core profile) + drona23 CLAUDE.md + subagent pattern
- **Monorepos (10K+ files)**: Code Review Graph + Claude Context + claude-mem

The user is closer to "heavy agentic workflows" than "monorepo" but not yet hitting the monorepo threshold (pm-skills has ~38 skills + 200+ docs but they are markdown not LOC). Solo developers stack is the closest match.

### 9.2 Revised 80/20 (verified)

The strongest single-action, with each pick now grounded in verified evidence: **install Beads + Serena + drona23/claude-token-efficient + AgentLint**, plus enable Anthropic's official Code Review plugin.

| Pick | Family | Verified evidence |
|------|--------|-------------------|
| **Beads** | C (tracking) | v1.0.3 released 2026-04-24, 23.1k stars, 89 releases, dedicated Windows 11 install docs (verified via direct repo fetch) |
| **Serena** | B (retrieval) | 40+ languages including Markdown via marksman LSP (requires `--language markdown` flag at project init). Verified via repo file `docs/01-about/020_programming-languages.md` and PR `f881f1e` adding marksman support |
| **drona23/claude-token-efficient** | D (tokens) | 40% measured token savings in the ComputingForGeeks benchmark. 619-byte drop-in CLAUDE.md addendum. Pairs with the user's existing CLAUDE.md no-em-dashes rule cleanly |
| **AgentLint** | New: H (quality/lint) | 58 deterministic checks (51 core + 7 opt-in extended) across 6 dimensions, evidence base from 265 versions of Anthropic's Claude Code system prompt. Lints AGENTS.md, .cursor/rules, .github/copilot-instructions.md, all of which are part of the user's pm-skills surface |
| **Anthropic Code Review** (official, enable existing) | G (review) | Multi-agent (5 reviewers), 84% find rate on PRs >1000 LOC averaging 7.5 issues, ~20-min review. Confidence scoring (default 80) filters false positives. Verified at [Anthropic blog](https://claude.com/blog/code-review) |

**Tier 2 (verified, but conditional on Tier 1 results):**

| Pick | Why Tier 2 | Trigger to promote |
|------|-----------|--------------------|
| **CCPM** ([automazeio/ccpm](https://github.com/automazeio/ccpm)) | PM-specific workflow: PRDs → epics → GitHub issues → code with traceability. Uses GitHub Issues + Git worktrees for parallel agent execution. Worktrees folder already exists at `pm-skills_worktrees/` so the architectural pieces line up | Adopt if Beads' issue/dependency model feels too generic for the PM-specific PRD-to-epic-to-issue chain |
| **Token Savior** ([mibayy/token-savior](https://github.com/mibayy/token-savior)) | Top performer at 43% measured. Symbol-level MCP navigation. Memory side overlaps claude-mem | Adopt if Serena coverage proves insufficient OR if drona23 CLAUDE.md alone does not move the needle after 1 week |
| **claudekit** ([carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit)) | Mature hooks toolkit: file-guard hook, performance monitoring, thinking-level hook, session-based hook control. Cross-platform | Adopt if hand-rolling hooks proves too tedious |
| **The Code Kit ContextRecoveryHook** | Backup every 10K tokens via PreCompact + SessionStart pattern. Three-file architecture (backup-core module, statusline monitor, PreCompact handler) | Adopt if context-loss-on-compaction becomes painful |

**Defer (verified weaker than alternatives):**

| Tool | Verified reason to defer |
|------|--------------------------|
| Token Optimizer (alexgreensh) | Failed to make the benchmark top performers list. 703 stars vs. higher-traffic alternatives. Read deduplication 8-30% vs Token Savior's 43% on the same surface |
| claude-view | No independent benchmark data found. ccusage is the safer cost-visibility pick (see 9.3) |
| Caveman | 38% measured savings is real, but the voice-change risk is real too. Adopt only after the lower-risk picks are exhausted |

### 9.3 Cost and usage observability (corrected pick)

Round 1 recommended Token Optimizer for "visibility before pruning." Better verified pick: **[ccusage by ryoppippi](https://github.com/ryoppippi/ccusage)** for usage analytics. CLI tool, analyzes JSONL files locally (zero context cost), produces daily/monthly/per-session reports. Pairs with [ccmonitor by shinagaki](https://github.com/shinagaki/ccmonitor) for hourly + 5-hour rolling reports if subscription-limit visibility matters, or [Claude-Code-Usage-Monitor by Maciek-roboblog](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor) for real-time token consumption with predictions.

The Anthropic-shipped `/usage` slash command covers session-spend and plan-limit visibility built-in (per the [Claude Code What's New](https://code.claude.com/docs/en/whats-new) page). For most solo workflows, `/usage` + ccusage covers the observability surface without adding a context-baseline plugin.

### 9.4 Verified facts about the named tools (Round 2)

**Beads (full verification):**
- Stars: 23.1k (verified via direct repo fetch). Round 1 said 19.5k; the higher number is current.
- Latest release: v1.0.3 (2026-04-24). Round 1 cited v0.59.0 (March 2026); the project moved to a 1.x stable line.
- Total releases: 89. Active maintenance signal is strong.
- Platform support: macOS, Linux, Windows, FreeBSD. Windows 11 has dedicated install docs in the repo. **My Round 1 evidence-gap concern about Windows compatibility is resolved.**
- Architecture: Dolt-powered, embedded mode default (no external server), server mode optional for multi-writer.
- Known regression: v0.56 server-mode change was flagged as a regression for standalone users (Issue #2050). v1.0.3 has presumably addressed or worked around this; verify before adopting if running multiple sessions/agents against the same DB.

**Serena (full verification):**
- 40+ languages (verified via `docs/01-about/020_programming-languages.md`): AL, Ansible, Bash, C#, C/C++, Clojure, Crystal, Dart, Elixir, Elm, Erlang, Fortran, F#, GLSL, Go, Groovy, Haskell, Haxe, HLSL, Java, JavaScript, JSON, Julia, Kotlin, Lean 4, Lua, Luau, **Markdown**, MATLAB, mSL, Nix, OCaml, Perl, PHP, **PowerShell**, Python, R, Ruby, Rust, Scala, Solidity, Swift, TOML, TypeScript, WGSL, YAML, Zig.
- Markdown is supported via the marksman LSP backend, but **must be explicitly specified via `--language markdown` when generating project config**. Pm-skills is markdown-heavy so this flag is required. **My Round 1 evidence gap on markdown coverage is resolved.**
- PowerShell support is also confirmed, which matches the user's primary shell (Windows 11 / PowerShell).

**Anthropic Code Review (verified):**
- Official Anthropic feature, multi-agent (5 independent reviewers each looking at a different class of issue: CLAUDE.md compliance, bug detection, git history, previous PR comments, code comment verification).
- Confidence scoring on 0-100 scale; default threshold 80 to filter false positives.
- Performance metrics (cited from Anthropic blog): on PRs >1000 lines, 84% have findings averaging 7.5 issues; on PRs <50 lines, 31% have findings averaging 0.5 issues. Average review takes ~20 minutes.
- Available as a plugin and as a GitHub Action.

**caveman (verified):**
- Independent benchmark: 38% measured token savings on the ComputingForGeeks ky-repo task.
- Project's own claims: "65% to 75% of output tokens" with sub-agents emitting "60% fewer tokens than vanilla Explore/reviewer agents."
- Discrepancy between project claim and benchmark is a normal "variance by task" gap. The 38% benchmark number is more credible than the README's headline.

---

## 10. Newly Discovered Tools (Round 2 Expansion)

The user explicitly asked to expand beyond the 13 named tools. Round 1 added 3 (Token Optimizer, claude-view, Anthropic Agent Teams). Round 2 adds another 14 plus 4 discovery resources.

### 10.1 Family C expansion (tracking)

- **[CCPM (automazeio)](https://github.com/automazeio/ccpm)** - Project management skill system for Agents. Maps PRDs to epics to GitHub issues to production code with full traceability. Uses Git worktrees for parallel agent execution (the user's `pm-skills_worktrees/` already exists). Compatible with Claude Code, Codex, OpenCode, Factory, Amp, Cursor. **This is the single most PM-workflow-specific plugin in the ecosystem and merits direct evaluation against Beads** for the user's specific workflow.

### 10.2 Family D expansion (token / cost / usage)

- **[ccusage (ryoppippi)](https://github.com/ryoppippi/ccusage)** - Local JSONL analysis CLI. Daily/monthly/session reports. Most popular ccusage tool by downloads.
- **[ccmonitor (shinagaki)](https://github.com/shinagaki/ccmonitor)** - Hourly + 5-hour rolling reports.
- **[Claude-Code-Usage-Monitor (Maciek-roboblog)](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor)** - Real-time token consumption + predictions.
- **[Claude Code Router (musistudio)](https://github.com/musistudio/claude-code-router)** - 26.4k stars. Routes Claude Code to other model providers (DeepSeek, Gemini, OpenRouter, etc.) for 50-99% API cost savings depending on routing strategy. Relevant if the user wants to control API spend by sending background/lower-stakes tasks to cheaper models.
- **[drona23/claude-token-efficient](https://github.com/drona23/claude-token-efficient)** - 40% benchmarked savings from a 619-byte CLAUDE.md drop-in. Highest ROI per byte of any tool found.

### 10.3 Family E expansion (workflow / hooks)

- **[claudekit (carlrannaberg)](https://github.com/carlrannaberg/claudekit)** - Toolkit of custom commands, hooks, and utilities. Hooks include file-guard (sensitive file protection), performance monitoring (>5s alerts), thinking-level (auto-adds thinking prompts), session-based hook control (temporarily disable specific hooks). Cross-platform.
- **The Code Kit** - Ships 5 pre-configured hooks: skill activation, auto-formatting, context recovery, permission automation, code validation. The ContextRecoveryHook backs up every 10K tokens via PreCompact + SessionStart hooks with a three-file architecture.
- **[anthropics/skills](https://github.com/anthropics/skills)** - Official Anthropic skills repository. Includes document manipulation (DOCX, PDF, PPTX, XLSX), Brand Guidelines, Internal Communications. Less directly relevant to pm-skills (which IS a skills library) but worth scanning for patterns.

### 10.4 Family G expansion (review)

- **[Anthropic Code Review (official)](https://claude.com/plugins/code-review)** - Already covered in 9.4. Available via plugin marketplace and GitHub Action.
- **[HAMY's 9-parallel-reviewers setup](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents)** - DIY pattern using 9 sub-agents in parallel. Pre-dates Anthropic's official offering; useful as inspiration.

### 10.5 New family: H (Quality / Linting / Standards)

- **[AgentLint](https://github.com/marketplace/actions/agentlint)** - 58 deterministic checks across 6 dimensions, evidence base from 265 versions of Anthropic's system prompt. Lints AGENTS.md, .cursor/rules, .github/copilot-instructions.md. **Specifically relevant to pm-skills because AGENTS.md is the project's skill-discovery manifest** for Copilot/Cursor/Windsurf agents (per CLAUDE.md). The 33 evidence-backed checks (mentioned in earlier searches; AgentLint's own page cites 58 total) cover hard limits like Claude Code's 40,000-character entry-file truncation and 256 KB unreadable-file limit.

### 10.6 New family: I (Documentation Tooling specific to mkdocs-material)

The user's docs site uses MkDocs Material (per `docs/internal/audit/audit_repo-structure_2026-05-01.md` Section 3). Two relevant skills:

- **MkDocs Specialist** ([mcpmarket](https://mcpmarket.com/tools/skills/mkdocs-specialist)) - Domain-specific knowledge for building/maintaining MkDocs sites. Exhaustive references for `mkdocs.yml`, CLI parameters, Material theme settings.
- **MkDocs Documentation Manager** ([mcpmarket](https://mcpmarket.com/tools/skills/mkdocs-documentation-manager)) - Sister skill focused on navigation hierarchies and plugin integration.

These are skills (markdown instructions), not plugins, so they add minimal context overhead. Worth installing if Material/MkDocs work appears in any v2.13.0 effort.

### 10.7 Discovery resources (where to find more)

For ongoing tool evaluation:

- **[hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** - Curated list of skills, hooks, slash-commands, agent orchestrators, applications, plugins.
- **[ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins)** - Curated list of slash commands, subagents, MCP servers, hooks.
- **[ComposioHQ/awesome-claude-plugins](https://github.com/ComposioHQ/awesome-claude-plugins)** - Production-ready plugins.
- **[rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit)** - Comprehensive: 135 agents, 35 skills (+400k via SkillKit), 42 commands, 176+ plugins, 20 hooks, 15 rules, 7 templates, 14 MCP configs, 26 companion apps.
- **[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)** - 1000+ agent skills compatible with Claude Code, Codex, Gemini CLI, Cursor.
- **[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)** - Official Anthropic-managed marketplace.
- **[Claude Plugin Hub](https://www.claudepluginhub.com)** - Web directory with install metadata.

### 10.8 Verified-but-skip list

Tools I researched but should NOT recommend, with the verified reason:

| Tool | Verified reason to skip |
|------|------------------------|
| nadimtuhin/claude-token-optimizer | Stale (no commits since Nov 2025) per benchmark author |
| code-review-graph (small repo case) | 5% savings on small repos; pm-skills is small (~38 skill folders) so the ROI is wrong |
| rtk-ai/rtk | "0% on bash task" per benchmark; better on noisy MCP outputs but pm-skills doesn't have noisy MCP outputs |
| Cognee, mcp-knowledge-graph, ClawMem, Remember.md | All overlap claude-mem at the storage layer; running two persistent-memory tools is a known footgun |
| Mission Control / Ruflo / Conductor / Multiclaude / Gas Town | All team-scale orchestration; solo workflow does not justify |
| Linear plugin | SaaS account requirement for tracking; CCPM uses GitHub Issues which the user already has |

---

## 11. Round-2 Revised Quick Reference

Updates to Section 8. The deltas are listed; entries not shown are unchanged.

| # | Tool | Round 1 verdict | Round 2 verdict | Reason for change |
|---|------|-----------------|-----------------|-------------------|
| 4 | serena | Adopt (week 2) | **Adopt (week 2)**, with `--language markdown` flag | Verified Markdown support |
| 8 | caveman | Defer | **Conditional adopt** | Benchmarked at 38%; risk-managed |
| 9 | token-savior | Defer | **Tier 2 adopt** | #1 in benchmark at 43% |
| 13 | beads | Adopt (week 1) | **Adopt (week 1)**, v1.0.3+ | Verified mature; Windows 11 support confirmed |
| 14 | Token Optimizer (alexgreensh) | Adopt (concurrent) | **Skip** | Not in benchmark top performers |
| 15 | claude-view | Adopt alt | **Defer** | No independent benchmark; ccusage is safer pick |

| New # | Tool | Family | Round 2 verdict | Reason |
|-------|------|--------|-----------------|--------|
| 17 | drona23/claude-token-efficient | D (tokens) | **Adopt (week 1)** | 40% benchmarked, 619-byte file |
| 18 | AgentLint | H (quality) | **Adopt (week 1)** | Validates AGENTS.md surface unique to pm-skills |
| 19 | CCPM (automazeio) | C (tracking) | **Tier 2 adopt** | PM-specific PRD-to-issue workflow |
| 20 | Anthropic Code Review | G (review) | **Enable** | Already free in plugin marketplace; verified metrics |
| 21 | ccusage (ryoppippi) | D (observability) | **Adopt (concurrent)** | Replaces Token Optimizer as observability pick |
| 22 | claudekit (carlrannaberg) | E (workflow) | **Tier 2** | Mature hooks toolkit |
| 23 | The Code Kit (ContextRecoveryHook) | E (workflow) | **Tier 2** | If compaction-loss becomes painful |
| 24 | Token Savior (Mibayy) | B + A | **Tier 2 promotion** | #1 in benchmark; promote if drona23 CLAUDE.md alone insufficient |
| 25 | MkDocs Specialist skill | I (docs) | **Adopt (low cost)** | Skill format = minimal context overhead |
| 26 | Claude Code Router | D (cost) | **Conditional** | If API cost matters; routes to cheaper models |
| 27 | ccmonitor | D (observability) | Conditional | Subscription-limit visibility |
| 28 | Claude-Code-Usage-Monitor | D (observability) | Alt to ccusage | Real-time predictions |
| 29 | HAMY 9-reviewers pattern | G (review) | Inspiration only | Anthropic Code Review supersedes |
| 30 | anthropics/skills repo | E (workflow) | Reference | Pattern source, not adopt |

---

## 12. Final Revised Action Plan

For the maintainer's actual next moves, in execution order:

**This week:**
1. Drop in [drona23/claude-token-efficient](https://github.com/drona23/claude-token-efficient) (619-byte CLAUDE.md addition). 40% benchmarked savings, no real risk.
2. Install [Beads v1.0.3](https://github.com/gastownhall/beads) in stealth mode. Migrate F-37 plus next 3 v2.13.0 items.
3. Install [AgentLint](https://github.com/marketplace/actions/agentlint) and run it on AGENTS.md, CLAUDE.md, and the docs surface. Capture findings as a v2.13.0 effort row.
4. Enable Anthropic's [Code Review](https://claude.com/plugins/code-review) plugin. Free, multi-agent, validated 84% find rate on large PRs.

**Next week:**
5. Install [Serena](https://github.com/oraios/serena) with `--language markdown` flag. Use on the next cross-cutting refactor (likely v2.13.0 sample-automation slate).
6. Install [ccusage](https://github.com/ryoppippi/ccusage) for usage analytics. Run for one week and report into the v2.13.0 plan.

**Conditional / week 3:**
7. If F-XX-effort-doc-bloat returns even with Beads, evaluate [CCPM (automazeio)](https://github.com/automazeio/ccpm) which is purpose-built for the PM-workflow shape (PRDs → epics → issues → code).
8. If drona23 CLAUDE.md alone does not move the token needle, layer [Token Savior](https://github.com/mibayy/token-savior) for symbol-level navigation.

**Defer or skip:**
- Token Optimizer (alexgreensh) - verified not a top performer
- Mission Control / Caveman / get-shit-done / ClawMem / Cognee / Remember.md / Token Savior memory side / Linear / claude-view

---

## 13. What This Audit Did Not Cover

- **Non-Claude-Code tooling** (Obsidian setup, terminal multiplexers, IDE choice, AI subscription bundling). Out of scope for "Claude Code stack." Worth a separate audit if the question expands.
- **MCP server pruning** (ClickUp, Gmail, Calendar, etc.). Each is enabled in settings; whether each is actually used in pm-skills sessions specifically requires telemetry that does not yet exist (Token Optimizer would surface this).
- **Internal jp-library evolution roadmap.** The plugin is custom; how it should evolve is a planning question, not a tool-selection one.
- **Workflow process improvements that are not tools** (e.g., should the user adopt a fixed weekly release cadence rather than ad-hoc release prep cycles). Out of scope but related.

---

*Audit produced 2026-05-03 by Claude (Opus 4.7) at /effort max. Sources: 8 memory files, 2 settings files, 1 plugin manifest, 2 prior audit documents, the v2.12.0 release plan, 9 web searches across the 2026 Claude Code plugin ecosystem. The recommendations are scoped to a solo open-source library maintainer's workflow as observed in this session and current memory; they are not a generic "best plugins" list. The 80/20 picks (Beads + Serena + Token Optimizer) represent the audit's strongest opinion; everything else is signal-rich context for the maintainer's own judgment. No tools were installed by this audit; no settings were modified; the working tree state observed in the prior branches audit is unchanged.*
