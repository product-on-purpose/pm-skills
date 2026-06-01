# v2.24.0 Smoke-Test Record: native `Skill`-from-sub-agent delegation

Status: RECORDED (satisfies engine spec AC #14 and plan exit criterion #10: the smoke test must be RUN and its result RECORDED before tag).
Date: 2026-06-01
Verdict: PASS (mechanism), runs INLINE. Native Claude Code path stays EXPERIMENTAL pending a full installed-plugin end-to-end pass.

## What the gate required

The engine (`agents/pm-workflow-orchestrator.md`) is the first repo agent to declare the `Skill` tool in its frontmatter (`tools: Skill, Read, Grep, Glob, Bash, Edit` - deliberately NOT `Agent`). The whole delegation design rests on one runtime fact that no prior repo agent ever exercised: a dispatched Claude Code sub-agent can invoke a *skill* through the `Skill` tool. The gate (spec section 6.1, residual question 1; AC #14; plan exit #10) required confirming, before tag:

- (a) the engine can invoke a downstream skill via `Skill`, and
- (b) whether that skill runs **inline** in the engine's context or in an **isolated** executor.

## What was run

A sub-agent was dispatched (general-purpose proxy, because the `pm-workflow-orchestrator` agent type is not registered as an invocable `subagent_type` in the local working-tree session) with a three-step probe:

1. Report whether a tool named `Skill` is present in the sub-agent's toolset, and list all available tools.
2. If present, invoke `utility-pm-skill-validate` with args `skills/foundation-persona --strict` (a read-only validator) and report whether it executed and returned.
3. Verdict: CONFIRMED / PARTIAL / UNAVAILABLE.

## Result

- (a) `Skill` tool present in the sub-agent toolset: **YES**. Full toolset reported: `Bash, Edit, Glob, Grep, PowerShell, Read, SendUserFile, Skill, ToolSearch, Write`.
- (b) Live invocation: **SUCCEEDED**. `utility-pm-skill-validate` loaded and drove a real validation pass over `foundation-persona` (read SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md).
- Verdict: **CONFIRMED**.

### The decisive finding on question (b): INLINE, not isolated

The `Skill` tool does NOT spawn a separate isolated executor. It prompt-injects the skill's instruction body into the **same** sub-agent's context, which then carries the instructions out in-process. The probe's exact note: "The skill is prompt-injected into this sub-agent's context and then carried out by this same agent. It runs in-process, not as a separate isolated executor."

This confirms the hypothesis the spec already favored (Context7: skills "add to your context window"). Consequence, already designed for: the context-budget mitigation (disk-write each step's artifact + summarize-forward, design 4.4) applies to the Claude Code native path too, exactly as it does to the inline path on other clients. The engine body and spec already describe Category-2 leaves running "inline in your own context," so no doc was overclaiming isolation: "isolated context window" in the engine refers to the engine *relative to the main chat* (a dispatched sub-agent does get its own window), while downstream skills/leaves run inline *within* that window. Both statements are simultaneously true and now empirically grounded.

## Why the native path STILL ships EXPERIMENTAL

The probe confirms the **mechanism** (Skill-from-sub-agent works; runs inline). It does NOT yet constitute a full end-to-end test of the actual `pm-workflow-orchestrator` agent, because:

- it used a general-purpose proxy sub-agent, not the registered orchestrator agent (which is not invocable as a `subagent_type` from the working tree);
- it ran against the working tree, not an installed plugin;
- it exercised a single read-only skill, not a multi-step run with checkpoints, FAILED/EMPTY rubric, and a dispatch-fan-out (Category-2) leaf.

Per AC #14, the native EXPERIMENTAL label is removed only after a recorded PASS of the real agent on an installed plugin. That pass is deferred to post-install verification. Until then `docs/reference/sub-agent-compatibility.md` and the dispatch skill's status block keep the native Claude Code cell EXPERIMENTAL, and no doc claims PRODUCTION for that path. `--dry-run` (no delegation at all) is the safe universal preview in the interim.

## Net

The architectural premise is sound: the orchestrator can delegate via `Skill`, adds zero chain depth, needs no `_chain-permitted` entry, and runs downstream skills inline (so the documented context-budget mitigation governs). Residual question 1 is resolved to INLINE. The release ships with the native path EXPERIMENTAL by design, not by uncertainty about whether the mechanism works.
