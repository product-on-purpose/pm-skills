---
title: "pm-changelog-curator draft: v2.16.0 minor release (Brainshelf thread)"
description: "pm-changelog-curator draft of CHANGELOG entries for v2.16.0 against in-progress v2.16 commits. Demonstrates 6-section Keep-a-Changelog format with hidden justification comments, classification rules from CLAUDE.md hygiene, dirty-tree refusal protocol (--committed-only override path), and layered Status envelope per D26. Sample artifact for the pm-changelog-curator sub-agent."
artifact: pm-changelog-curator-draft
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: brainshelf
context: Draft of CHANGELOG entries for v2.16.0 from the in-progress commit range since v2.15.2
---

## Scenario

Priya M. is preparing v2.16.0 for tag. She runs `/draft-changelog --since-tag v2.15.2 --target-version v2.16.0` to get a draft of CHANGELOG entries for review before commit. The working tree is clean (post-Phase-5 commit; pre-tag artifact pass).

The curator reads `CLAUDE.md` hygiene rules fresh, runs `git log v2.15.2..HEAD --pretty=format:'%h %s' --name-only`, classifies each commit, and produces a draft. Hidden HTML comments capture the curator's classification reasoning so Priya can audit + adjust before committing the entry.

## Output

# pm-changelog-curator draft: v2.16.0

## [v2.16.0] - 2026-MM-DD

### Added

- **Sub-agents** (new component class): four Claude Code plugin sub-agents at `subagents/` plus matching dispatch skills at `skills/utility-pm-{role}/` for cross-client access. `pm-critic` runs adversarial review proactively after PM-artifact-producing skills; `pm-skill-auditor` runs repo-wide cross-cutting governance audits with the full enforcing validator suite plus aggregate counter checks; `pm-changelog-curator` drafts CHANGELOG entries from git log applying hygiene rules; `pm-release-conductor` walks a 6-gate guided release runbook with chain composition to auditor and curator. See `docs/reference/runtime-components.md`. <!-- justification: feat(v2.16.0-phase-{1,2,3,4,5}) commits ship 4 sub-agents + 4 dispatch skills; user-facing per classification rule "feat: -> Added"; sub-agents are a new component class -->

- **Adversarial review user guide** at `docs/guides/adversarial-review.md` documenting Phase 0 review patterns, severity grammar with worked examples (PRD, OKR, recap, persona), the skill-revise-recheck loop, cross-client paths, and three opt-out paths. <!-- justification: docs(v2.16.0-phase-2) adds user-facing concept docs; classification: docs/guides/ is user-facing surface per hygiene rule; Added section because it's net-new content -->

- **Release runbook contributor guide** at `docs/contributing/release-runbook.md` documenting the conductor's 6 gates (G0 pre-tag readiness, G1 adversarial review status, G2 version bump + CHANGELOG prep, G2.5 commit + re-verify, G3 tag + push, G4 post-tag hygiene). <!-- justification: docs(v2.16.0-phase-5) adds contributor docs; Added section -->

- **Runtime components catalog** at `docs/reference/runtime-components.md` cataloging sub-agents (4 v2.16.0 entries), hooks (empty; v2.17+ scope), output styles (empty; v2.18+ scope). Includes Cross-Client Compatibility section and Composition Patterns section. <!-- justification: docs(v2.16.0-phase-1) ships net-new reference doc; Added section -->

- **Sub-agent library samples** at `library/sub-agent-samples/{pm-critic,pm-skill-auditor,pm-changelog-curator,pm-release-conductor}/`: 12 thread-aligned samples (3 per sub-agent across brainshelf, storevine, workbench threads) demonstrating real output. <!-- justification: feat commits ship 12 sample files; Added section -->

### Changed

- **Astro 5.13.x to 6.x** doc-stack upgrade. Requires Node 22.12+. Closes 2 Dependabot alerts that were deferred from v2.14.x because Astro 6's Node requirement was out of v2.14 scope. <!-- justification: chore(dependencies) commit is dependency bump touching package.json; mixed classification per "chore: dependencies in package.json (visible in node_modules)" rule; Changed because user-visible build behavior changes; this assumes doc-stack-modernization-plan executes in v2.16 -->

- **CI workflows** bumped from Node 22 to Node 22.12+ across 5 workflows (Validation, Deploy to Pages, CodeQL, Validate Plugin, sync-agents-md) to satisfy Astro 6 engine requirement. <!-- justification: ci(workflows) commit visible in CI behavior; Changed section -->

### Fixed

- **DS family validator metadata-shape checks** promoted from advisory to strict. Family contract enforcement now fails CI on metadata-shape issues rather than emitting advisory warnings only. <!-- justification: fix(validator) commit promoting advisory to strict; user-facing per classification rule "fix: -> Fixed" -->

### Security

- **Astro define:vars XSS** patched via 6.1.6 upgrade (CVE pending Dependabot alert #10 disclosure). <!-- justification: chore(dependabot) commit closing alert #10; Security section per classification rule for security-relevant dependency bumps -->

- **Astro server-island replay** patched via 6.1.10 upgrade (Dependabot alert #16). <!-- justification: chore(dependabot) commit closing alert #16; Security section -->

### Known Limitations

- **Cross-client dispatch skills are CONDITIONAL on Phase 2 GATE B spike outcomes.** The 4 dispatch skills at `skills/utility-pm-{role}/` ship in v2.16.0 PENDING maintainer verification on a non-Claude client (Codex CLI, Cursor, Windsurf, Copilot, or Gemini CLI). If GATE B fails on a specific client, that client falls back to manual reading of `subagents/{name}.md`. v2.17 will close GATE B with documented test results. <!-- justification: this is a release-state caveat documented in release plan D30; classification: doc-state, captured in CHANGELOG to set expectations -->

- **Hooks and output styles are catalogued in `runtime-components.md` as empty placeholders.** Hook infrastructure (PostToolUse frontmatter hook R-24, hook-triggered sub-agent invocation R-65) deferred to v2.17. PM Voice output style (R-45) deferred to v2.18+. <!-- justification: scope documentation; sets reader expectation for what shipped -->

---

## Status Summary

Drafted v2.16.0 entries from ~50 commits since v2.15.2. 5 Added, 2 Changed, 1 Fixed, 2 Security, 2 Known Limitations.

Highlights:
- 4 sub-agents shipped as the new component class (the strategic milestone of v2.16.0)
- Astro 6 upgrade closes 2 Dependabot alerts deferred from v2.14.x
- DS family validator promoted to strict mode

Hidden justification comments are included after each entry for maintainer audit. Strip these comments before final commit per `pm-release-conductor` G2 sub-check 8 (the conductor does this automatically when chained).

**Recommended next action:** Maintainer reviews the draft, edits as needed (especially the "Known Limitations" framing of GATE B status), strips justification comments, and commits as `docs(v2.16.0): CHANGELOG entries for v2.16.0 release`.

**Refusal triggered:** no.

## Status

```yaml
status: draft
target_version: v2.16.0
since_tag: v2.15.2
commits_processed: 50
entries_added: 5
entries_changed: 2
entries_fixed: 1
entries_removed: 0
entries_security: 2
entries_deprecated: 0
dirty_tree_warning: false
refusal_reason: null
```

---

## Notes on This Sample

This sample illustrates a realistic mid-cycle CHANGELOG draft. The commit counts (~50 commits) and section distributions are estimates appropriate to the planned v2.16.0 scope; the actual draft would reflect actual git log output.

The sample demonstrates several discipline points:

1. **Hidden justification comments** (`<!-- justification: ... -->`) capture the curator's reasoning per classification rule. The maintainer audits before stripping.
2. **No em-dashes** anywhere in the output (per CLAUDE.md hygiene rule + `feedback_no-em-dashes` memory).
3. **No internal-notes references.** No `docs/internal/release-plans/v2.16.0/*` references; no `AGENTS/SESSION-LOG/*` references; only `docs/reference/`, `docs/guides/`, `docs/contributing/`, and skill/sub-agent paths.
4. **No Claude attribution trailers.** No "Generated with Claude" or "Co-Authored-By" trailers.
5. **Public-path framing.** Entries describe what changed (e.g., "Sub-agents ... See `docs/reference/runtime-components.md`") not where internal files live.
6. **Known Limitations section** captures release-state caveats (dispatch skill GATE B pending) so users have correct expectations.

For the sample's role in v2.16.0: this is 1 of 3 thread-aligned samples for pm-changelog-curator. The other 2 (storevine patch-release, workbench feature-release) ship in Phase 6 Task 25.
