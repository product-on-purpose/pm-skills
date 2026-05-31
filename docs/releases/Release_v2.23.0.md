---
title: Release v2.23.0
description: One new foundation skill that turns any PM input into a prioritized action plan
---

## The short version

One new skill, nothing else changes. `foundation-prioritized-action-plan` takes anything you have - rough notes, a meeting transcript, a half-baked PRD, a vague executive ask - and produces one saveable document: what to do first, why, how, and what to do after, with honest confidence levels and copy/paste prompts for the next pm-skill.

The catalog grows from 63 to 64 skills. No existing skill changes.

## What it does

You paste in your situation. The skill produces a single prioritized action plan with nine sections:

- An **executive summary** you can skim in 20 seconds.
- A **mirror** of what you said, so you can confirm it understood you.
- A **situation classification** (Cynefin): is this Clear, Complicated, Complex, or Chaotic? That decides how confident the plan is allowed to be.
- The **binding constraint** (Theory of Constraints): the one thing limiting progress right now, which becomes your critical next effort.
- **Prioritized questions and open decisions** that block higher-confidence planning.
- The **action plan**: 3 to 5 ranked efforts, each with why, what, how, confidence, source, expected outcome, effort, and dependencies.
- A **pre-mortem**: assume it failed; what went wrong.
- **Copy/paste prompts** for the next pm-skills, with your context already filled in.
- An **evidence map** tying every claim back to an exact quote from your input.

## What makes it honest

Two design choices keep it from producing confident-sounding slop:

- **It cites or it doesn't claim.** Before writing anything, it builds a ledger of exact quotes from your input. Every load-bearing claim points to one. If it can't cite your words, it marks the claim as inferred and low-confidence, and inferred claims are not allowed to drive the critical effort.
- **It refuses false confidence.** If your situation is genuinely uncertain (Complex or Chaotic in Cynefin terms), it will not hand you a confident multi-step plan. Complex situations get safe-to-fail probes; a crisis gets stabilization first. No High-confidence marker appears on an uncertain situation.

## Do I need to do anything?

No. It is a new, additive skill. Everything you already use is unchanged. To try the new one, invoke `foundation-prioritized-action-plan` (on Claude Code, `/pm-skills:foundation-prioritized-action-plan`; on Codex, `$foundation-prioritized-action-plan`) and paste in a situation you are trying to make progress on.

## FAQ

**Is it an orchestrator that runs other skills for me?** No. It recommends a bounded, tiered set of downstream pm-skills and gives you ready-to-run prompts, but it never invokes them itself. The plan is the deliverable; the prompts are an enabler. Cross-skill auto-execution is intentionally out of scope.

**Why is it named `foundation-prioritized-action-plan` and not something shorter?** It follows the same `foundation-` prefix convention as every other foundation skill. A shorter, prefix-free naming scheme was considered for the whole library and deferred, so this skill matches what ships today.

**Versioning:** this is a minor release. It adds one skill; nothing existing changed.
