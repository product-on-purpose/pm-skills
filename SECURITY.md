# Security Policy

## What This Repository Ships

pm-skills distributes:

1. **Skills** (`skills/`) - markdown instruction files (`SKILL.md` plus `references/TEMPLATE.md` and `references/EXAMPLE.md`). These are prompts, not executables; an agent reads them and follows them when you invoke a skill.
2. **Sub-agent definitions** (`agents/`) - markdown system-prompt files for the 6 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor, pm-workflow-orchestrator, pm-skill-router).
3. **Slash commands** (`commands/`) and **workflows** (`_workflows/`) - markdown that points an agent at a skill or an ordered sequence of skills.
4. **Hooks** (`hooks/`) - two Claude Code hooks plus a small shared lib, all dependency-free Node. See below; these are the one part of the plugin that can act without an explicit per-invocation request.
5. **Repo tooling** (`scripts/`) - Node validators and generators that run in this repository's own CI. They do not ship as part of the code that executes automatically inside an install; see Supply Chain below for what actually reaches a user.
6. **Docs** (`docs/`, `site/`) - reference material and the published documentation site.

## Nothing Executes at Install Time

Installing pm-skills, by any path (the Claude Code plugin marketplace, `npx skills add`, `git clone`, or a release ZIP), does not run any code. Skills, sub-agent definitions, commands, and workflows are inert markdown: an agent only acts on them when you invoke a skill or command, and at that point it is the agent's own tool calls (Read, Write, Edit, and so on, each subject to your client's own permission model), not a script pm-skills shipped.

The one exception, and it is opt-in, is hooks.

## Hooks Are Opt-In, Disclosed, and Fail Open

pm-skills ships two Claude Code hooks (registered in `hooks/hooks.json` against the `PreToolUse` and `SessionStart` events). Both are **inert until you opt in**, via a gitignored, per-project file, `.claude/pm-skills.local.md`:

- **House-rule guardrails** (`hooks/guardrails.mjs`, `PreToolUse`). Off by default; a `guardrails: true` key in the local config file turns it on. When enabled, it can **deny** a `Write` / `Edit` / `MultiEdit` / `NotebookEdit` / `ExitPlanMode` call that introduces an em-dash or en-dash, and can **warn** (never deny) on an unfilled placeholder or an unsourced numeric metric.
- **Phase router** (`hooks/phase-router.mjs`, `SessionStart`). On by default, but silent by design: it only ever adds a short contextual note (which product-development phase the repo signals suggest, and which skills apply) and never blocks or modifies anything. Set `phase_router: off` in the same local config file to disable it entirely.

Both hooks **fail open**: a parse error, a missing config file, or any unexpected input allows the tool call through rather than blocking it. Neither hook makes a network call or imports a third-party dependency; both run as `node ${CLAUDE_PLUGIN_ROOT}/hooks/*.mjs` with no `node_modules` present, a design rule enforced in `hooks/README.md`. Full configuration schema: [Hooks and Output-Quality Checks](https://product-on-purpose.github.io/pm-skills/concepts/hooks/).

## Supply Chain

- **Plugin marketplace.** The recommended install path (`/plugin marketplace add product-on-purpose/agent-plugins`) resolves through the `agent-plugins` marketplace, which pins its pm-skills entry to an exact commit SHA rather than a mutable branch, re-pinned at every release. An install therefore always resolves to a specific, auditable commit, not whatever `main` happens to contain at fetch time.
- **Release ZIPs.** Every tagged release publishes `pm-skills-vX.Y.Z.zip` alongside a `pm-skills-vX.Y.Z.zip.sha256` checksum file and a plain-text `manifest.txt` recording the same hash (built by `scripts/build-release.sh`, published by `.github/workflows/release-zips.yml`). Verify a downloaded ZIP against its checksum before trusting its contents:
  ```bash
  sha256sum -c pm-skills-vX.Y.Z.zip.sha256
  ```
- **What a release ZIP excludes.** `docs/internal/` (maintainer working notes) is deliberately excluded from every packaged release; only `skills/`, `commands/`, `_workflows/`, `agents/`, `hooks/`, `library/`, `scripts/`, the plugin manifests, and the public docs ship.
- **Release automation.** The release-please automation (`.github/workflows/release-please.yml`) is configured to run with a fine-grained, repository-scoped token rather than the broad default Actions token, falling back to the default token only while that scoped token is being provisioned.

See [Provenance and Trust](https://product-on-purpose.github.io/pm-skills/reference/provenance/) for the same posture restated for readers who never open this repository.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 2.x     | ✅        |
| < 2.0   | ❌        |

## Reporting a Vulnerability

If you discover a security issue in `pm-skills`, report it privately first.

Preferred channel:
1. Use GitHub Private Vulnerability Reporting:
   - <https://github.com/product-on-purpose/pm-skills/security/advisories/new>

Fallback channel:
1. Open a GitHub issue requesting a private follow-up (do not include exploit details or secrets):
   - <https://github.com/product-on-purpose/pm-skills/issues/new>

What to include:
1. Affected file(s) or workflow(s)
2. Reproduction steps
3. Impact assessment
4. Suggested remediation (if available)

Response targets:
1. Initial acknowledgement within 2 business days
2. Ongoing status updates until resolution

## Scope

This policy covers:
1. Repository content (`skills/`, `commands/`, `_workflows/`, docs, templates)
2. Hooks (`hooks/`) and their opt-in configuration
3. Build/release tooling and GitHub Actions workflows
4. Published release artifacts

## Out of Scope

The following are generally out of scope for this repository:
1. Vulnerabilities in third-party tools or clients not maintained here
2. Security behavior of external AI platforms integrating these skills
