# pm-skills Roadmap: From Skill Library to PM Operating Layer

Status: Proposed strategic roadmap (forward-looking; initiatives become efforts -> issues -> releases)
Date: 2026-05-31
Owner: Maintainers
Companion to: `docs/internal/audit/2026-05-31_audit-internal.md` (Section 6 is the source research), `docs/internal/restructure-plan_2026-05-31.md`, `docs/internal/backlog.md`
Source verification: the load-bearing primitives below were **confirmed against the official Claude Code docs (`code.claude.com/docs`) on 2026-05-31**: `SessionStart` / `PreToolUse` (can block) / `PostToolUse` / `Stop` hook events; `userConfig` + `${user_config.KEY}` + `CLAUDE_PLUGIN_OPTION_*`; settings.json `agent` (main-thread) + `subagentStatusLine` keys; `displayName`; `defaultEnabled`; `${CLAUDE_PLUGIN_DATA}`; `dependencies`; `monitors`; output-style `force-for-plugin` + `keep-coding-instructions`; and `argument-hint` / `allowed-tools` / `context: fork` / `agent:` / `` !`command` `` / `$ARGUMENTS`. **Two specifics still to confirm before building:** the exact auto-dispatch mechanism for 4.2 (a command hook invoking `pm-critic`, since an `agent` hook *type* was not separately verified) and whether per-skill `model` frontmatter (3.3) is supported. Version-gated items note their minimum CC version. Re-check exact keys before implementing each item.

---

## 1. The strategic frame

pm-skills has won the content race: 64 skills across the Triple Diamond, sub-agents, workflows, samples, a marketplace, cross-client (Claude + Codex) discovery. The next frontier is **not more skills**. It is the three problems every large library hits:

1. **Discovery.** With 64 skills, the user's bottleneck is *knowing which one to invoke when*. Description-matching alone does not solve this at scale.
2. **Activation.** A skill only helps if it fires at the right moment with the right context. Today the user must remember the catalog and supply context cold.
3. **Trust.** PM artifacts are judged on rigor (evidence-calibrated, no fabricated metrics, house voice). That discipline currently lives inside individual skills; it is not a guaranteed property of the plugin.

The Claude Code plugin platform now offers primitives that attack all three directly: **hooks** (turn the library from pull to push), **output styles + main-thread agents** (make every response a PM response), **`userConfig` + project-local state** (per-team and per-project context), a **bundled MCP** (queryable catalog), and **multi-plugin marketplace + community distribution** (reach and modularity).

> **The thesis in one line:** evolve pm-skills from a *catalog you search* into a *PM operating layer that routes you to the right skill, in the right context, with your team's standards already applied, and verifies its own output.* That is the "best-in-class" target, and almost none of it requires writing new skills - it requires wiring the ones we have into the platform's activation and trust primitives.

`★ Insight (for future maintainers)` Every initiative below is scored on a deliberate axis: **table-stakes** (catch up to what good plugins do), **differentiator** (something few or no PM plugins do), **moonshot** (high-ceiling, higher-cost bets). Prioritize differentiators that are also low-effort - those are the asymmetric wins. The single highest-leverage differentiator here (SessionStart phase routing) is only Medium effort because the data it needs (`scripts/build-skill-catalog.py`) already exists.

---

## 2. Horizons at a glance

| Horizon | Theme | Headline initiatives |
|---------|-------|----------------------|
| **Now** (next 1-2 releases) | Cheap wins + the flagship router | Community-marketplace submission; `displayName` + token-cost transparency; `argument-hint` on commands; PreToolUse house-rule guardrails; `${CLAUDE_PLUGIN_DATA}` cache; **SessionStart phase-routing MVP** |
| **Next** (mid) | Trust + context + customization | Output style "PM mode"; PostToolUse auto-`pm-critic`; `userConfig` house template; `.claude/pm-skills.local.md` project state; dynamic context injection; `context: fork` for heavy skills |
| **Later** (moonshots) | Queryable + modular + agentic | Bundled catalog MCP + `recommend_skill` tool; "PM Coach" main-thread agent; **plugin #2** (multi-plugin split); release-gate status lines; experiment monitors |

Effort key: S (hours-day), M (days), L (week+), XL (multi-week).

---

## 3. Now - high-impact, low-risk (target v2.24.0-v2.25.0)

### 3.1 Submit to the community marketplace `[table-stakes, S]`
- **Feature:** Anthropic's public community marketplace (in-app submission/review; approved plugins pinned to a SHA, synced nightly).
- **Why:** pm-skills is currently discoverable only via its self-hosted `marketplace.json` + url source. Listing puts it in the Discover tab of every Claude Code install - the single largest distribution multiplier available, with **zero change to the existing install path**.
- **Do:** run `claude plugin validate`; submit; keep the self-hosted path as-is.
- **Tracking:** candidate `M-25`. Pairs with the convergence the repo already planned for v3.0.0.

### 3.2 `displayName` + token-cost transparency `[table-stakes, S]`
- **Feature:** `displayName` in `plugin.json` (the `.codex-plugin` interface already has it; the Claude manifest does not); `claude plugin details` reports always-on vs on-invoke token cost.
- **Why:** a 64-skill plugin's always-on listing cost is non-trivial; measuring and publishing it builds trust and informs the plugin-#2 split decision.
- **Do:** add `displayName: "PM Skills"`; add a CI step that runs `claude plugin details` and records the cost.
- **Tracking:** candidate `M-26`.

### 3.3 `argument-hint` (+ `model`, `allowed-tools`) on the 10 workflow commands `[table-stakes, S]`
- **Feature:** command frontmatter `argument-hint`, `model`, `allowed-tools`.
- **Why:** the 10 workflow commands expose only `description` + `$ARGUMENTS`. Add `argument-hint` (verified; e.g. `[initiative or feature]`) so autocomplete guides input; pre-approve `Read/Write` via `allowed-tools` (verified) so multi-skill chains do not stall on permission prompts; and, if a per-skill `model` field is supported (confirm), set a heavier model for `product-strategy` and a lighter one for `sprint-planning`.
- **Tracking:** candidate `M-27`. Low effort, immediate UX gain.

### 3.4 PreToolUse house-rule guardrails `[differentiator, S]`
- **Feature:** `hooks/hooks.json` PreToolUse(Write|Edit) can block a tool call (exit code 2).
- **Why:** ship the maintainer's own editorial discipline as a *distributable* artifact: reject em-dash/en-dash on write, flag fabricated metrics and employer-specific context. **No other PM plugin ships authored-prose linting.** This packages the repo's hardest-won house rules as a feature.
- **Do:** port the existing `~/.claude/hooks/no-em-dashes.py` logic into a plugin hook; gate optional checks behind a `.local.md` flag.
- **Tracking:** candidate `F-43`. Strong differentiator at S effort - prioritize.

### 3.5 `${CLAUDE_PLUGIN_DATA}` cache `[table-stakes, S]`
- **Feature:** a per-plugin persistent dir that survives updates.
- **Why:** foundation for the router and MCP - cache the built skill catalog and cross-session project notes without polluting the user's repo.
- **Tracking:** folded into 3.6 / Later items as the storage layer.

### 3.6 SessionStart phase-routing MVP `[differentiator, M]` - the flagship
- **Feature:** `hooks/hooks.json` SessionStart hook (prompt or command type).
- **Why:** **directly attacks the #1 discovery problem.** On session start, inspect the repo/cwd (git branch, presence of a PRD/OKR/persona artifact, recent files) and inject a short nudge: "You appear to be in the Discover phase - relevant pm-skills: `define-problem-statement`, `discover-interview-synthesis`, `discover-journey-map`..." This turns 64 flat skills into a phase-routed guide so the user invokes the *right* skill without memorizing the catalog.
- **MVP scope:** start rule-based (branch-name + artifact-presence heuristics -> phase -> a curated skill shortlist from `build-skill-catalog.py`). Promote to a prompt hook (LLM-evaluated) later. Cache state in `${CLAUDE_PLUGIN_DATA}`.
- **Dependencies:** the catalog generator (exists); benefits from `.local.md` project state (3.10) but does not require it for the MVP.
- **Tracking:** candidate `F-44`. **The single highest-leverage item on this roadmap.** Lead with it.

---

## 4. Next - trust, context, customization (mid horizon)

### 4.1 Output style "PM mode" `[differentiator, M]`
- **Feature:** `output-styles/*.md` reshapes the system prompt; `force-for-plugin` applies it automatically; `keep-coding-instructions: false` drops SWE behavior.
- **Why:** the cleanest way to make *every* response feel like a PM tool, not just skill invocations - outcome-over-output framing, evidence-calibrated confidence labels, refuses fabricated metrics. Ship a non-forced variant first (opt in via `/config`) to avoid surprising users.
- **Tracking:** candidate `F-45`.

### 4.2 PostToolUse / Stop auto-`pm-critic` `[differentiator, M]`
- **Feature:** a `PostToolUse(Write|Edit)` or `Stop` hook (both events verified) whose command dispatches the existing `pm-critic` sub-agent. (The hook events are confirmed; the exact dispatch path - command hook invoking the agent - should be confirmed before building, as a dedicated `agent` hook *type* was not separately verified.)
- **Why:** `pm-critic` already exists and is described as "use proactively," but firing relies on the model choosing to. A hook makes the adversarial-review loop **deterministic**: after a PRD/OKR/persona is written, auto-dispatch `pm-critic` to surface P0/P1 findings unprompted. Gate behind a `.local.md` `auto_review: true` flag so it is opt-in.
- **Dependencies:** the existing sub-agent + chain allowlist.
- **Tracking:** candidate `F-46`.

### 4.3 `userConfig` house template + org context `[differentiator, M]`
- **Feature:** manifest `userConfig` declares typed values prompted at enable time; substituted as `${user_config.KEY}` in skills/agents/hooks; exported as `CLAUDE_PLUGIN_OPTION_*`.
- **Why:** let a team pin house preferences at install: default PRD template path, OKR cadence (quarterly/trimester), preferred prioritization framework (RICE vs ICE), tone, a company-context file. Skills then read `${user_config.*}` so `deliver-prd`, `foundation-okr-writer`, etc. conform to team standards without per-invocation re-prompting. **Respects the employer-neutrality rule** because the value is supplied by the installing team, not baked into the artifact.
- **Tracking:** candidate `F-47`.

### 4.4 `.claude/pm-skills.local.md` project state `[differentiator, M]`
- **Feature:** the documented `.claude/<plugin>.local.md` pattern (YAML frontmatter config + markdown body, gitignored).
- **Why:** lightweight project memory without an MCP server - current Triple Diamond phase, active initiative, artifacts already produced. The SessionStart router (3.6) reads it; skills append to it as artifacts are produced. Pin a house template here too.
- **Dependencies:** synergizes with 3.6 and 4.3.
- **Tracking:** candidate `F-48`.

### 4.5 Dynamic context injection `[differentiator, M]`
- **Feature:** the `` !`<command>` `` syntax runs a shell command before skill content is sent; named `arguments` for positional substitution.
- **Why:** turn artifact skills from blank-page to context-aware where a deterministic source exists: `deliver-release-notes` pulling `` !`git log <lasttag>..HEAD` ``, `iterate-retrospective` pulling recent commit/PR activity, `foundation-okr-writer` reading an existing OKR file. Use sparingly and only where the data source is deterministic.
- **Tracking:** candidate `F-49`.

### 4.6 `context: fork` for heavy skills `[differentiator, M]`
- **Feature:** skill frontmatter `context: fork` + `agent:` runs the skill body in a forked subagent context.
- **Why:** heavy, multi-section skills (`deliver-prd`, the 7-part sprint families, `measure-survey-analysis`) bloat the main thread's window. Forking isolates their token budget and returns only the finished artifact - keeps long PM workflows from consuming the parent context.
- **Tracking:** candidate `F-50`.

---

## 5. Later - moonshots and modularity (v3.x and beyond)

### 5.1 Bundled catalog MCP + `recommend_skill` tool `[moonshot, L]`
- **Feature:** `.mcp.json` / `mcpServers` bundles an MCP server that starts with the plugin; exposes resources + tools with `${CLAUDE_PLUGIN_ROOT}` / `${CLAUDE_PLUGIN_DATA}`.
- **Why:** make catalog navigation *queryable* rather than description-matched. Expose the catalog as a structured resource (name/phase/classification/when-to-use), plus `recommend_skill(situation)` and `get_sample(skill)` tools. Works cross-client (any MCP host). `build-skill-catalog.py` is the natural data source. This is the durable, programmatic form of the 3.6 router.
- **Note:** the separate `pm-skills-mcp` is in maintenance mode (file-install recommended); this is a *light, in-plugin* server, not a revival of that project. Reconcile scope with the MCP maintenance-mode decision before building.
- **Tracking:** candidate `F-51`.

### 5.2 "PM Coach" main-thread agent `[moonshot, L]`
- **Feature:** plugin-root `settings.json` `agent` key activates one of the plugin's agents as the *main* thread when enabled (`defaultEnabled: false`).
- **Why:** with the plugin on, the default Claude persona *is* a senior PM that knows the full catalog and routes the user. The heavier sibling of the output style (4.1). Strictly opt-in.
- **Tracking:** candidate `F-52`.

### 5.3 Plugin #2 - multi-plugin split `[differentiator, L]`
- **Feature:** `marketplace.json` hosts multiple plugins; manifest `dependencies` (semver) auto-install transitively; `defaultEnabled: false`.
- **Why:** the `product-on-purpose` marketplace hosts only pm-skills today, and the project already anticipates "plugin #2" (it is the trigger for the reserved v3.0.0 convergence). Split optional/heavy capability into sibling plugins (e.g. a `pm-coach` agent plugin, or a `sprint-facilitation` plugin) with pm-skills as the **core dependency**. Users install a lean core and opt into add-ons - the natural growth path beyond one monolith, and the lever for managing the 64-skill always-on token cost (3.2).
- **Tracking:** candidate `M-28`. Gates the v3.0.0 old-path retirement.

### 5.4 Release-gate status lines + experiment monitors `[moonshot, M/L]`
- **`subagentStatusLine`:** the 4 governance agents (release-conductor walks 6 gates, auditor runs validators) surface G0->G4 progress in a status line. Pure polish on a sophisticated agent set.
- **Monitors (`monitors/monitors.json`):** a monitor tailing a metrics/experiment endpoint during a `measure-experiment-results` session. Niche for a doc-artifact library; flagged for completeness.
- **Tracking:** candidate `M-29` / `F-53`. Lowest priority.

---

## 6. Sequencing recommendation

Order by **(impact x certainty) / effort**, front-loading asymmetric wins:

1. **F-43 PreToolUse guardrails** (S, differentiator) - ships the editorial moat cheaply; reuses existing hook logic.
2. **M-25 community-marketplace submission** (S, table-stakes) - largest reach for least work.
3. **F-44 SessionStart phase-routing MVP** (M, flagship differentiator) - the strategic centerpiece; everything in Theme 1 builds on it.
4. **M-26 / M-27** displayName + token cost + `argument-hint` (S each) - quick polish, informs the plugin-#2 decision.
5. **F-45 output style + F-46 auto-critic + F-48 project state** (M each) - the trust + context layer; sequence F-48 before F-46/F-44's promotion (they read its state).
6. **F-47 userConfig** (M) - team customization; unblocks enterprise-ish adoption without breaking neutrality.
7. **Later tier** as capacity allows; **M-28 plugin #2** is the bridge to v3.0.0.

**If you do only three things:** F-43 (guardrails), M-25 (community marketplace), F-44 (phase router). They deliver trust, reach, and discovery - the three strategic problems - at S+S+M total effort.

---

## 7. How a roadmap item becomes shipped work

This roadmap is the *strategy* layer. Each initiative flows through the standard pipeline (see `backlog.md` and `restructure-plan_2026-05-31.md`):

1. **Effort brief** at `docs/internal/efforts/{ID}-{slug}.md` (assign the candidate ID above; thin: scope, decisions, links).
2. **GitHub issue** (the `effort.yml` template) - canonical lifecycle; carries Type + Agent + milestone.
3. **Release plan** at `docs/internal/release-plans/vX.Y.Z/` when scheduled - `plan_` + `spec_` + `implementation-plan.md` per the codified template.
4. **Ship** -> flip the brief to Shipped, close the issue, the skill gets its `HISTORY.md` row, the release notes go to `docs/releases/`.

The candidate IDs (`F-43`..`F-53`, `M-25`..`M-29`) are provisional. The highest **effort-brief** IDs in `efforts/` are F-42 and M-22; M-23 and M-24 are assigned only in `backlog-canonical.md` and the v2.13/v2.14 release plans (not as briefs), so the next genuinely free IDs are **F-43 / M-25**. Confirm against the GitHub issue list **and** `backlog-canonical.md` (before it is retired) rather than `efforts/` alone, since `efforts/` is not the sole ID authority.

> **Closing insight.** The roadmap's center of gravity is hooks. That is not a coincidence: hooks are the primitive that converts a *pull* library (user must know to invoke) into a *push* operating layer (the plugin surfaces the right capability and verifies output). A 64-skill library that the user has to navigate by memory will plateau; the same 64 skills wired into SessionStart routing, PostToolUse review, and PreToolUse guardrails become a system that gets *more* valuable as it grows, because the router does the remembering. Build the activation layer, and the content you already have compounds.
