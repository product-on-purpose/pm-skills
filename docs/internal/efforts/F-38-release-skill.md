# [F-38] `/pm-release` Utility Skill

Status: Backlog
Milestone: v2.12.0 (candidate)
Issue: TBD
Agent: Claude Opus 4.7

## Scope

Create `skills/utility-release/` with command `/pm-release` that encodes the end-to-end release workflow currently executed manually each version. One invocation runs: pre-flight audits, em-dash sweep, stale-count reconciliation, mkdocs regeneration, CI validation, CHANGELOG + release notes + skills-manifest authoring, commit, tag, push, GitHub Release verification.

Surfaced by the 2026-04-23 `/insights` report which flagged the release workflow as repeated three times (v2.11.0, v2.11.1, jp-ai-review v1.1.0) with nearly identical steps, each time rediscovered from scratch.

## Problem

Every pm-skills release cycle in the v2.10+ era has followed the same multi-phase pattern:

1. Pre-flight audits (em-dash sweep, stale skill-count reconciliation, broken-link checks)
2. Generator reruns (`scripts/generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) to sync docs/ with sources
3. CI validation suite (`lint-skills-frontmatter`, `validate-agents-md`, `validate-meeting-skills-family`, `check-count-consistency`)
4. Dry-run against live skills CLI to confirm 38 skills discoverable
5. Release artifact authoring: plan doc, skills-manifest.yaml, CHANGELOG entry, release notes, release-index row
6. Version bumps: README badge, `.claude-plugin/plugin.json`, `marketplace.json`
7. Commit, tag, push, GitHub Release polish

Today this is roughly 2 to 4 hours of work that an agent re-derives from context each version. Evidence:

- v2.11.0 release cycle took multiple sessions with Codex adversarial review loops
- v2.11.1 (2026-04-22) repeated the same steps top-to-bottom, including a review pass that discovered pre-push gaps (missing What's New entry, "5 vs 8 references" wording)
- Cross-session friction: the agent starts each release by re-learning the release plan template, re-reading CHANGELOG conventions, re-checking which files need version bumps

A `/pm-release` skill would turn this into: the agent already knows the template, the checklist, the order, the exemplar commit messages, the CI sequence.

## How It Works

### Invocation modes

Three subcommand variants covering the typical slice of work:

- `/pm-release prep <version>` runs the audit + generator + CI phases, authoring the release plan + skills-manifest but not committing anything. Agent presents a review checkpoint before the user approves proceeding to ship.
- `/pm-release ship <version>` assumes prep is done and approved. Runs CHANGELOG + release notes authoring, version bumps, final CI, staged commit, tag, push. Pauses before push for user confirmation.
- `/pm-release verify <version>` runs post-push validation: `gh release view`, live CLI dry-run from clean env, GitHub Release body check (strips frontmatter if present), docs-site link check.

### Inputs

Minimal required:
- Target version (e.g., `v2.11.2`)
- Release type (patch, minor, major) to guide copy in CHANGELOG + release notes
- Release theme (one-liner for CHANGELOG section header)

Optionally:
- Override path to release-plan template
- Skip phases (e.g., `--skip-mkdocs-regen` when no skill content changed)

### Default behavior

Sensible defaults drawn from the v2.11.1 release as the gold-standard exemplar:
- Em-dash sweep runs whenever any `.md` file has changed since last tag
- Stale-count reconciliation runs unconditionally (cheap; high value)
- Generator reruns run when `skills/` or `_workflows/` or `library/skill-output-samples/` have changed since last tag
- CI suite runs all validators; any failure blocks ship phase
- Commit boundaries: one commit per logical unit (em-dash sweep, release artifacts, mkdocs polish) unless user passes `--single-commit`
- Tag is never moved once pushed; polish commits land on main after the tag

### Guardrails

- Never uses `git push --force` without explicit confirmation
- Blocks push if CI fails
- Blocks push if `--follow-tags` would move an already-pushed tag
- Detects and warns on em-dashes in any staged file before commit
- Detects and warns on unquoted descriptions with inline `": "` (the YAML-parser gotcha caught during v2.11.1 skills.sh work)

## Classification

- Type: utility skill (automates repo-level workflow, not domain/phase work)
- Directory: `skills/utility-release/`
- Command: `/pm-release` (with subcommands `prep`, `ship`, `verify`)
- SKILL.md pattern: mirror of other utility skills (`utility-pm-skill-builder`, `utility-pm-skill-validate`, `utility-pm-skill-iterate`, `utility-update-pm-skills`)

## Exemplars

- `docs/internal/release-plans/v2.11.1/plan_v2.11.1.md` is the gold-standard template. the skill should produce plans of this shape
- `docs/internal/release-plans/v2.11.1/skills-manifest.yaml` is the canonical manifest schema
- `docs/releases/Release_v2.11.1.md` shows the user-facing release notes structure
- `CHANGELOG.md` entries for v2.11.0 and v2.11.1 show the Keep-A-Changelog style in use here
- `skills/utility-pm-skill-builder/SKILL.md` is the closest structural exemplar for a multi-phase utility skill with subcommand-style invocation

## Deliverables

- `skills/utility-release/SKILL.md`
- `skills/utility-release/references/TEMPLATE.md` (release-plan template, pre-filled sections)
- `skills/utility-release/references/EXAMPLE.md` (worked example reproducing the v2.11.1 release)
- `skills/utility-release/references/CHECKLIST.md` (phase-by-phase checklist that the skill walks through)
- `commands/pm-release.md` (Claude Code slash command entry)
- `AGENTS.md` (new entry for the skill)
- `mkdocs.yml` (new nav entry)
- `docs/skills/utility/utility-release.md` (auto-generated on first `generate-skill-pages.py` run after landing)
- `docs/internal/release-plans/v2.12.0/skills-manifest.yaml` (lists `utility-release` 1.0.0 as added)
- `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md` (update to include F-38)

## Validation

### Dry-run test plan

1. **Prep phase dry-run**: run `/pm-release prep v2.11.2` against the current repo state. Expected: agent audits em-dashes (0 expected), runs generators (no changes expected since 2026-04-23), CI passes, authors draft plan in `docs/internal/release-plans/v2.11.2/`. Zero files committed. Agent presents checkpoint.
2. **Ship phase dry-run**: decline the ship-phase checkpoint. Expected: no commits, no tag, no push. Clean abort.
3. **End-to-end test**: intentionally create v2.11.2 for a trivial fix (e.g., typo correction). Run `/pm-release prep v2.11.2`, approve, `/pm-release ship v2.11.2`, `/pm-release verify v2.11.2`. Expected: full cycle in under 15 minutes with minimal user interaction beyond the two approval checkpoints.

### Regression guards

- Skill must not regress the v2.11.1 shipping pattern
- Skill must preserve commit-tag-immutability (no force-moving published tags)
- Skill must produce CHANGELOG entries that satisfy `lint-skills-frontmatter` style adjacencies (no em-dashes, no stale counts)

## Open Questions

- **Skill scope: single repo or multi-repo?** pm-skills-mcp has its own release cycle. Should `/pm-release` handle both via a configurable target, or is this pm-skills-only for v1.0.0? Proposal: pm-skills-only for v1.0.0; generalize in a later version once the pattern is proven.
- **How much of the release plan should the skill author vs. leave as user-input?** Proposal: skill generates 80% mechanical content (CI results, file lists, version bumps) and asks user for the 20% substantive content (release theme, decisions rationale, non-goals). The v2.11.1 plan's "Decisions" table and "Non-goals" section are examples of what should stay user-authored.
- **Should this skill author the GitHub Release body?** Proposal: yes. strip frontmatter from the `Release_vX.Y.Z.md` file automatically (learned the hard way during v2.11.1). Use `gh release edit` not `gh release create` if a GitHub Action already auto-created the Release on tag push.
- **Does this skill coexist with a pre-commit hook for em-dashes?** Proposal: yes, orthogonal. Hook blocks at edit-time; skill sweeps at release-time. The skill still runs a sweep as defense-in-depth in case hook is bypassed or a file slipped through.
- **How to handle the observer-agent framework during /pm-release?** Proposal: skill explicitly suppresses observer firing during the mechanical phases to reduce noise; re-enables at checkpoints.

## Dependencies

- None strictly blocking
- Benefits from F-33 (sample-standards CI) and F-36 (generic family-registration validator) being in place so the full CI suite is comprehensive
- Complements (does not replace) the existing `./scripts/` CI scripts. the skill orchestrates them, it does not duplicate them

## Inspiration / Evidence

The 2026-04-23 `/insights` report surfaced this as a top-3 suggestion with copyable prompt:

> "You've shipped v2.11.0, v2.11.1, and jp-ai-review v1.1.0 with nearly identical steps. Encode this as a /pm-release skill plus hooks."

Session data backs this up: 29 commits across 46 analyzed sessions, a consistent release pattern, and 2 friction classes (em-dash leakage, stale-count drift) that reappear each cycle because the workflow is re-derived rather than codified.

## Status Transitions

- **Backlog** (current, 2026-04-23)
- **In Progress** when skill authoring begins
- **Shipped** on first repo-tag that uses `/pm-release` for its own release (self-hosting proof)

## Detailed specification

Deferred to `F-38-release-skill/specification.md` during authoring pass. Starting implementation guidance:

- Walk through the v2.11.1 release transcript line-by-line; extract every distinct decision point
- Distinguish mechanical steps (can be automated fully) from judgment calls (require user input)
- Group mechanical steps into the three subcommands (prep, ship, verify)
- Draft the SKILL.md as a phase-by-phase walkthrough with go-mode-style checkpoints at the two human-in-the-loop boundaries (after prep, before push)
- Build TEMPLATE.md from the v2.11.1 plan structure; pre-fill all mechanical fields; leave placeholders for user-authored content
