---
title: "pm-changelog-curator Dispatch Example: v2.16.0 draft on Windsurf"
description: Worked example of utility-pm-changelog-curator dispatch skill execution on a non-Claude client (Windsurf). Demonstrates inline execution of the pm-changelog-curator system prompt with the 8-step drafting flow plus layered Status envelope per master plan D26.
---

# Example: pm-changelog-curator Dispatch on Windsurf

This example shows `utility-pm-changelog-curator` execution on a non-Claude client (Windsurf). The dispatch skill reads `subagents/pm-changelog-curator.md` and executes the 8-step drafting flow inline.

## Invocation

```
windsurf> /utility-pm-changelog-curator --since-tag v2.15.2 --target-version v2.16.0
```

## Skill behavior

1. **Runtime detection.** Detects Windsurf (not Claude Code with pm-skills plugin); takes non-Claude branch.
2. **Reads canonical sub-agent definition.** Loads `subagents/pm-changelog-curator.md` as operating instructions.
3. **Step 1 of agent flow: establish range.** Honors `--since-tag v2.15.2` and `--target-version v2.16.0` from arguments.
4. **Step 2: read hygiene rules.** Reads CLAUDE.md "CHANGELOG Best Practices" section.
5. **Step 3: check working tree.** Working tree clean (no uncommitted changes); proceeds.
6. **Step 4: enumerate commits.** Runs `git log v2.15.2..HEAD --pretty=format:'%h %s' --name-only`.
7. **Step 5-7: classify, group, rewrite.** Applies classification rules per CLAUDE.md hygiene.
8. **Step 8: emit draft.** Returns the three-section layered output below.

## Output (verbatim from dispatch skill execution)

# pm-changelog-curator draft

## [v2.16.0] - 2026-MM-DD

### Added

- **Sub-agents** (new component class): four Claude Code plugin sub-agents at `subagents/` plus matching dispatch skills at `skills/utility-pm-{role}/` for cross-client access. `pm-critic` runs adversarial review proactively after PM-artifact-producing skills; `pm-skill-auditor` runs repo-wide cross-cutting governance audits; `pm-changelog-curator` drafts CHANGELOG entries from git log applying hygiene rules; `pm-release-conductor` walks a 6-gate guided release runbook with chain composition. See `docs/reference/runtime-components.md`. <!-- justification: feat(v2.16.0-phase-{1,2,3,4,5}) commits; user-facing per "feat: -> Added" classification rule; sub-agents are a new component class -->

- **Adversarial review user guide** at `docs/guides/adversarial-review.md` with severity grammar examples and skill-revise-recheck loop documentation. <!-- justification: docs commit touching docs/guides/ surface; user-facing -->

- **Release runbook contributor guide** at `docs/contributing/release-runbook.md` documenting the 6-gate flow (G0, G1, G2, G2.5, G3, G4). <!-- justification: docs commit touching docs/contributing/; user-facing -->

- **Runtime components catalog** at `docs/reference/runtime-components.md` cataloging sub-agents (4 entries), hooks (empty placeholder), output styles (empty placeholder). <!-- justification: net-new reference doc; docs commit user-facing -->

- **12 sub-agent library samples** across 3 narrative threads (brainshelf, storevine, workbench). <!-- justification: feat commits adding samples; user-facing per discovery/quality demonstration -->

### Changed

- **Astro 5.13.x to 6.x** doc-stack upgrade. Requires Node 22.12+. Closes 2 Dependabot alerts deferred from v2.14.x. <!-- justification: chore(dependencies) commit; mixed classification per dependency-bump rule; Changed because user-visible build behavior changes -->

- **CI workflows** bumped to Node 22.12+ across 5 workflows. <!-- justification: ci commit; user-visible via CI status -->

### Fixed

- **Design Sprint family validator** metadata-shape checks promoted from advisory to strict. Family contract enforcement now fails CI on metadata-shape issues. <!-- justification: fix(validator) commit; user-facing per validator behavior change -->

### Security

- **Astro define:vars XSS** patched via 6.1.6 upgrade. <!-- justification: Dependabot alert closure; Security section per security-relevant dependency rule -->

- **Astro server-island replay** patched via 6.1.10 upgrade. <!-- justification: Dependabot alert closure -->

### Known Limitations

- **Cross-client dispatch skills** (4 in v2.16.0) ship PENDING maintainer verification on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI). If GATE B from Phase 2 of subagents-integration-plan fails on a specific client, manual fallback applies. <!-- justification: release-state caveat per D30; sets reader expectations -->

---

## Status Summary

Drafted v2.16.0 entries from 50 commits since v2.15.2. 5 Added, 2 Changed, 1 Fixed, 2 Security, 1 Known Limitations.

Highlights:
- 4 sub-agents shipped as the new component class (strategic milestone of v2.16.0)
- Astro 6 upgrade closes 2 Dependabot alerts deferred from v2.14.x
- DS family validator metadata-shape promoted to strict

Hidden justification comments are included after each entry for maintainer audit. Strip these comments before final commit per pm-release-conductor G2 sub-check 8.

**Recommended next action:** Maintainer reviews the draft, edits framing as needed (especially "Known Limitations" wording around GATE B status), strips justification comments, then commits.

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

dispatch:
  mode: inline-execution
  client: windsurf
```

---

## Notes on This Example

The dispatch skill on Windsurf produces output structurally identical to the Claude Code native sub-agent on the same commit range. Cross-client consistency is the validation criterion for Phase 2 GATE B.

For the example's role: this is the canonical worked example for the dispatch skill. Other examples may live in `library/skill-output-samples/utility-pm-changelog-curator/` once that directory is populated (deferred to v2.17 per audit finding F-02 from the pm-skill-auditor sample).

## Related Files

- Canonical sub-agent: [`subagents/pm-changelog-curator.md`](../../../subagents/pm-changelog-curator.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- v2.15.1 + v2.15.2 CHANGELOG entries: `CHANGELOG.md` (root, canonical exemplars)
