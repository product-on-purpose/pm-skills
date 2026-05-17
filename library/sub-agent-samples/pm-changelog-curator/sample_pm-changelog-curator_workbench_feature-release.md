---
title: "pm-changelog-curator draft: Workbench feature release"
description: "pm-changelog-curator draft for a feature release with multi-track CHANGELOG. Demonstrates handling a larger commit range (notional 80+ commits) and a multi-track release scope (primary feature + infrastructure + hygiene), with each track contributing to different Keep-a-Changelog sections."
artifact: pm-changelog-curator-draft
version: "1.0"
repo_version: "2.17.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: workbench
context: Feature release with primary new capability + infrastructure secondary track + hygiene tertiary track
---

## Scenario

Notional v2.17.0 with 3 tracks running in parallel: primary feature track (pm-workflow-orchestrator sub-agent + AI-Native PM Pack), infrastructure secondary (hook infrastructure + portable user-settings parser), hygiene tertiary (CONTEXT.md refresh + F-XX archive). 80+ commits since v2.16.0.

## Output

# pm-changelog-curator draft: v2.17.0

## [v2.17.0] - 2026-MM-DD

### Added

- **pm-workflow-orchestrator sub-agent** (and companion `/workflow-orchestrate` slash command + dispatch skill at `skills/utility-pm-workflow-orchestrator/`): coordinates multi-skill workflows with pm-critic auto-fire at quality-gate steps. See `docs/reference/runtime-components.md`. <!-- justification: feat commits ship the v2.17 strategic sub-agent; Added section -->

- **AI-Native PM Pack:** 4 new utility skills covering AI-product PM workflows (eval-suite-spec, prompt-spec, model-card, ai-failure-mode-catalog). See `docs/concepts/ai-native-pm.md`. <!-- justification: feat commits ship the AI Pack -->

- **PostToolUse frontmatter hook** at `hooks/post-tool-use-frontmatter.json` validating skill frontmatter on every Edit/Write affecting skills/. <!-- justification: feat hook commit; user-facing per hook behavior -->

- **`.claude/pm-skills.local.md` user-settings parser:** users can configure pm-critic severity floor, auto-invoke behavior, and skip-artifact-types per-project. See `docs/guides/configuring-pm-skills.md`. <!-- justification: feat commit; user-facing -->

- **Content skill additions:** `discover-market-sizing`, `define-prioritization-framework`, `discover-journey-map`. <!-- justification: feat commits; Added section -->

### Changed

- **Tags-as-feature** doc-stack support: skills now surface their tags as sidebar facets per the Tier 2 deferral closed in v2.17. <!-- justification: feat commit; Changed because user-facing taxonomy improvement -->

- **URL slug normalization** across docs site: deprecated paths now redirect with 301. <!-- justification: chore(routing) commit affecting user-visible URLs; Changed -->

- **sync-agents-md.yml workflow** rewritten for two-layer defense + apply:true input gate. <!-- justification: ci commit; user-visible via CI behavior -->

### Fixed

- **G2.5 commit gate edge case** when working tree has staged-but-uncommitted changes from a prior aborted release. <!-- justification: fix commit -->

- **pm-skill-auditor** counter audit handled symlinked skill directories (rare on Linux contributors). <!-- justification: fix commit -->

### Security

- **Astro 6.2.x** dependency bumps for 3 alerts. <!-- justification: chore(dependabot) -->

### Removed

- **Deprecated `commands/feature-spike.md`** (orphaned; replaced by `develop-spike-summary`). <!-- justification: removal commit; Removed section per Keep-a-Changelog -->

### Known Limitations

- **pm-workflow-orchestrator dispatch skill** validated on Codex CLI + Cursor; pending on Windsurf + Gemini CLI. <!-- justification: release-state caveat -->

---

## Status Summary

Drafted v2.17.0 feature-release entries from 80 commits since v2.16.0. 5 Added, 3 Changed, 2 Fixed, 1 Security, 1 Removed, 1 Known Limitations.

Multi-track shape: the primary track (pm-workflow-orchestrator + AI-Native PM Pack) drives the Added section; the infrastructure track (hooks + user-settings) contributes additional Added items; the hygiene track contributes Changed + Removed entries.

**Recommended next action:** Maintainer reviews each track's entries, edits framing, strips justification comments. Suggest splitting commit into two for readability: one for Added entries (primary feature track) + one for Changed/Fixed/Security/Removed (infrastructure + hygiene tracks).

**Refusal triggered:** no.

## Status

```yaml
status: draft
target_version: v2.17.0
since_tag: v2.16.0
commits_processed: 80
entries_added: 5
entries_changed: 3
entries_fixed: 2
entries_removed: 1
entries_security: 1
entries_deprecated: 0
dirty_tree_warning: false
refusal_reason: null
```

---

## Notes on This Sample

The feature-release shape (multi-track) contrasts with patch-release (storevine sample, focused Fixed/Security) and minor-release (brainshelf sample, single-track Added-heavy). Notice:

- 5 Added items spanning sub-agents, content skills, hooks, parser
- Removed section present (deprecation cleanup happens during feature releases)
- Known Limitations explicit (cross-client coverage gaps documented for v2.17->v2.18 carry-forward)

For pm-changelog-curator's role: this is 3 of 3 thread-aligned samples, completing the catalog.
