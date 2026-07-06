---
title: Provenance and Trust
description: What pm-skills ships, what runs automatically at install (nothing, except opt-in hooks), the supply-chain posture behind every install path, and how to verify a release.
---

This page restates pm-skills' security and provenance posture for readers who never open the repository. The authoritative, maintained version of this content is [`SECURITY.md`](https://github.com/product-on-purpose/pm-skills/blob/main/SECURITY.md) at the repo root; if the two ever disagree, that file wins.

## What ships

pm-skills distributes markdown, not executables:

- **Skills** (`skills/`) - instruction files an agent reads and follows when you invoke them.
- **Sub-agent definitions** (`agents/`) - system-prompt files for the 6 sub-agents.
- **Slash commands** (`commands/`) and **workflows** (`_workflows/`) - pointers at a skill or an ordered sequence of skills.
- **Hooks** (`hooks/`) - the one part of the plugin that can act without an explicit per-invocation request; see below.
- **Repo tooling** (`scripts/`) - validators and generators that run in this repository's own CI, not inside an install.
- **Docs** (`docs/`, `site/`) - reference material and this documentation site.

## Nothing runs automatically at install

Installing pm-skills through any path (the Claude Code plugin marketplace, `npx skills add`, `git clone`, or a release ZIP) does not execute any code. Skills, sub-agent definitions, commands, and workflows are inert until an agent invokes them, and at that point every action is the agent's own tool call under your client's own permission model, not a script pm-skills shipped.

The one exception, and it is opt-in, is hooks.

## Hooks: opt-in, disclosed, fail-open

pm-skills ships two Claude Code hooks, both **inert until you opt in** via a gitignored, per-project `.claude/pm-skills.local.md` file:

| Hook | Event | Default | What it can do |
|---|---|---|---|
| House-rule guardrails (`hooks/guardrails.mjs`) | `PreToolUse` | **off** | When enabled, can deny a write that introduces an em-dash or en-dash; can warn (never deny) on an unfilled placeholder or an unsourced metric |
| Phase router (`hooks/phase-router.mjs`) | `SessionStart` | on, but silent unless confident | Adds a short contextual note naming the likely product-development phase and relevant skills; never blocks or modifies anything |

Both hooks **fail open**: any parse error, missing config, or unexpected input lets the tool call through rather than blocking it. Neither hook makes a network call or depends on a third-party package; both run as dependency-free Node (`node ${CLAUDE_PLUGIN_ROOT}/hooks/*.mjs`, no `node_modules`). Full configuration schema: [Hooks and Output-Quality Checks](../concepts/hooks.md).

## Supply chain: how an install is verified

- **The recommended install path is SHA-pinned, not branch-tracked.** `/plugin marketplace add product-on-purpose/agent-plugins` resolves through the `agent-plugins` marketplace, which pins its pm-skills entry to an exact commit SHA, re-pinned at every release, rather than following a mutable branch. What you install is always a specific, auditable commit.
- **Release ZIPs ship a checksum.** Every tagged release publishes `pm-skills-vX.Y.Z.zip` alongside a `pm-skills-vX.Y.Z.zip.sha256` file and a `manifest.txt` recording the same SHA-256 hash in plain text. Verify a download before trusting it:
  ```bash
  sha256sum -c pm-skills-vX.Y.Z.zip.sha256
  ```
- **Release ZIPs exclude maintainer working notes.** `docs/internal/` never ships in a packaged release; only the skill library, commands, workflows, sub-agent definitions, hooks, sample library, scripts, plugin manifests, and public docs do.
- **Release automation uses a scoped token.** The release-please automation is configured to prefer a fine-grained, repository-scoped token over the broad default Actions token, falling back to the default only while that scoped token is being provisioned.
- **Every release is a signed git tag with a public history.** `vX.Y.Z` tags and their commits are visible in the repository's own history; nothing about a release is assembled off-repo.

## Reporting a vulnerability

See [`SECURITY.md`](https://github.com/product-on-purpose/pm-skills/blob/main/SECURITY.md) (or its [site mirror](../contributing/security.md)) for the reporting channel, response targets, and scope.

## Related pages

- [How pm-skills Is Evaluated](evals.md) - the quality-trust story: how skill firing and output quality are measured, and the honest confound framing behind the numbers.
- [Security](../contributing/security.md) - the full security policy.
