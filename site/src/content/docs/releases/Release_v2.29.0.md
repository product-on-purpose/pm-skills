---
slug: releases/Release_v2.29.0
title: Release v2.29.0
description: A new foundation skill, build-risk-review, that names the one assumption most likely to make a build fail and returns a verdict before you commit, plus pm-skill-router, a key-free router that makes the collision gate runnable on the subscription.
---

**Released 2026-06-23.** Additive MINOR. One new foundation skill and one new sub-agent; catalog grows 67 to 68 (foundation 10 to 11), sub-agents 5 to 6. 11 commands, 12 workflows unchanged.

## The short version

"Should we build this?" is one of the most common product decisions, and nothing in the catalog returned a fast verdict on it. `foundation-build-risk-review` does: given a product idea, a feature request, or a scope change, it names the single assumption most likely to make the work fail, grades the evidence behind it, and returns one of four verdicts - build small, validate first, pivot first, or don't build yet - with a concrete no-code validation step. Then it routes you to the skill that does the next piece of work. It is a gate, not a report.

Shipped alongside it is `pm-skill-router`, an internal instrument that makes the repo's own new-skill collision gate runnable on the subscription with no API key.

## What changed

**New skill: `foundation-build-risk-review`.** A foundation skill that triages a build decision and dispatches into the library. Two modes: pre-build (a new idea or MVP) and feature-change (a feature request or scope expansion, placed on an L0-L4 demand hierarchy). It produces a Build Risk Review: the single biggest risk (tagged from a taxonomy mapped to the lean-canvas blocks), a graded evidence ledger (likes and waitlists are not demand; payment and switching are), a verdict, a no-code next step, and a routing target. Adapted from the open-source `bin1874/before-you-build-skill` (Apache-2.0) and repositioned PM-neutral; the external case-memory call is removed. For a launched product's pivot-or-persevere call, it routes to `iterate-pivot-decision`.

**New sub-agent: `pm-skill-router` (key-free router).** The new-skill collision gate and the trigger router-eval are powered by a router that, given the catalog and a query, returns the one skill that would fire. Previously that router called the Anthropic Messages API and needed `ANTHROPIC_API_KEY`. Now `check-new-skill-collision.mjs --emit-tasks` emits the probe tasks for the `pm-skill-router` sub-agent to route on the subscription (Haiku-pinned by default, the conservative gate tier). The Messages-API path stays for unattended CI. The router's verdict logic is unchanged, so baselines stay comparable.

**The showcase self-heals.** The documentation-site showcase (`/showcase/`) listed skills from a hardcoded table that had silently drifted about fifteen skills stale (it showed one of ten foundation skills). It now derives its skill set from the sample files on disk, so every skill with a thread sample appears automatically and the list can no longer rot.

**3 library samples** for the new skill (one per Storevine / Brainshelf / Workbench thread), covering both modes and all four verdicts.

## When to use it (and when not)

Use `foundation-build-risk-review` before committing build effort - a new idea, a feature request, or a scope change - when you want a fast verdict and the single biggest risk. For a launched product where the question is whether to change direction on real usage data, use `iterate-pivot-decision`. To frame a confirmed problem, use `define-problem-statement`. For the full nine-block business model, use `foundation-lean-canvas`. To rank many requests against each other, use `define-prioritization-framework`.

## Upgrade

No action required. Additive release; existing skills, commands, and behavior are unchanged.
