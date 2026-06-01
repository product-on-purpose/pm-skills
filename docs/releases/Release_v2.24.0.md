---
title: Release v2.24.0
description: A governed workflow orchestrator that runs a prioritized action plan through its recommended pm-skills, plus a one-confirmation handoff from the plan skill
---

## The short version

The orchestrator promised on the public roadmap finally ships. `utility-pm-workflow-orchestrator` takes a saved `foundation-prioritized-action-plan` (or a chain of skills you name) and runs the recommended pm-skills against it in order, pausing for your go/no-go before each step and refusing to advance past a step that failed or came back empty. `foundation-prioritized-action-plan` (now v1.1.0) gains a matching `--run` handoff: once it writes your plan, it can offer to hand the runnable prompts straight to the orchestrator.

The catalog grows from 64 to 65 skills (utility 10 to 11; foundation unchanged at 9), and from 4 sub-agents to 5.

It ships EXPERIMENTAL everywhere. See "Is it ready to rely on?" below before you wire it into anything.

## What it does

The orchestrator turns a plan's recommendations into a supervised run:

- **It reads your plan and finds the runnable prompts.** A `foundation-prioritized-action-plan` ends with a Section 7 of copy/paste prompts for downstream pm-skills. The orchestrator parses those, classifies each as runnable / manual / unparseable, and queues the runnable ones in order.
- **It checkpoints by default.** Before each step it shows you what it is about to run and waits for your confirmation. Nothing fires unsupervised.
- **It refuses to advance past a bad step.** A failed step is a hard stop. An empty step is surfaced for your confirmation rather than waved through as a pass. Both rules hold in every mode.
- **It respects the plan's honesty.** The Cynefin domain the plan recorded sets a floor: genuinely uncertain situations (Complex, Chaotic) stay checkpointed and cannot be flipped to fully automatic without a deliberate flag, and even then never past a failed or empty step.
- **It keeps a paper trail.** Runs of two or more steps write each artifact to a gitignored working directory so a long run does not blow your context budget; only a short summary per step is carried forward. Single-step runs stay in chat.

And the plan skill gains the producer-side handoff:

- After it writes your plan, `foundation-prioritized-action-plan` offers (only when at least one Section 7 prompt is actually runnable) to hand the plan to the orchestrator in checkpointed mode.
- `--run` does produce-and-hand-off in one invocation, still checkpointed by default.
- A single yes is the whole handoff. The plan skill adds no gate of its own; every pause after that belongs to the orchestrator.

## What stays safe

Two design choices keep this from becoming surprise automation:

- **The plan skill still never runs work-skills itself.** It does not execute `deliver-prd`, `discover-competitive-analysis`, or any other target inline. It only ever causes execution through one explicit confirmation into the governed orchestrator, behind that orchestrator's per-step checkpoints and refusals. The original recommend-only safety intent is preserved by composition, not abandoned.
- **The orchestrator adds no new automation surface.** It delegates to skills, not to sub-agents, so it spawns nothing, adds no chain-permission entry, and adds zero chain depth. Workflow and composite steps it cannot safely nest are surfaced for you to run by hand, never auto-nested.

## Is it ready to rely on?

Honest answer: treat it as EXPERIMENTAL on every client today, including Claude Code.

- **Off Claude Code** (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI): the orchestrator runs by reading its engine logic inline and walking the loop in the client. This path can write up to three full PM artifacts and thread state between steps, which is harder than anything we have live-validated on those clients. It is EXPERIMENTAL until a maintainer runs a real multi-artifact write test on each. Run `--dry-run` first.
- **On Claude Code:** the orchestrator is the first pm-skills sub-agent to invoke other skills directly. That native path is EXPERIMENTAL until a live smoke test confirms it works as designed. Until then, prefer `--dry-run` to preview the plan, the checkpoints, and the stop-on-failure behavior without running anything consequential.

`--dry-run` is the safe way to see what it would do on any client: it parses the plan, shows the step list and the checkpoints, runs the tool-capability pre-flight, and stops without invoking any real skill.

## Do I need to do anything?

No. The orchestrator is a new, additive skill, and the plan skill's handoff is an optional mode you opt into. Everything you already use behaves exactly as before; `foundation-prioritized-action-plan` produces the same nine-section plan it always did.

To try the orchestrator, invoke `utility-pm-workflow-orchestrator` (on Claude Code, `/pm-skills:utility-pm-workflow-orchestrator`; on Codex, `$utility-pm-workflow-orchestrator`) and start with `--dry-run`. To try the handoff, run `foundation-prioritized-action-plan` with `--run`.

## FAQ

**Does it invent its own steps?** No. It runs the step list it is given (a plan's Section 7, or a chain you name) and never invents goals or routes around a failure. If a step fails, it stops; it does not re-plan.

**Does it thread one skill's output into the next?** Not automatically in plan mode. The plan's prompts are written to stand alone, so they run order-independent with no hidden handoff. If you name your own chain and declare a dependency, it will thread that one; it never infers a dependency from skill identity.

**What is the difference between this and the release conductor?** The conductor runs the release runbook by delegating to sub-agents. The orchestrator runs a plan by delegating to skills. They share the same shape (numbered steps, a fixed per-step block, a confirmation pause, refusal to advance), but the orchestrator spawns no sub-agents and adds no chain-permission entry.

**Why does the plan skill change but its description does not?** The handoff is an optional, body-documented mode, not a change to what the skill is for. The discovery surface is unchanged, so the description stayed the same; only the per-skill version moved from 1.0.0 to 1.1.0.

**Wasn't this promised for v2.17?** Yes. The v2.17 roadmap pencilled in `pm-workflow-orchestrator`; this release ships it under that name, so the old forward-references now read "shipped v2.24.0."

**Versioning:** this is a minor release. It adds one sub-agent and one skill, and makes one additive edit to an existing skill; nothing existing was removed or changed in behavior.
