---
title: "PM Changelog Curator (Dispatch Skill)"
description: "Draft CHANGELOG entries from git log via the pm-changelog-curator sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skills:pm-changelog-curator); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-changelog-curator.md and executes the system prompt inline. Applies CLAUDE.md hygiene rules (no internal-notes references, no em-dashes, no Claude attribution trailers, public paths only). Returns a layered draft (full CHANGELOG draft + Status Summary prose + Status YAML envelope per master plan D26) with hidden justification comments for maintainer audit. Refuses on dirty working tree unless --committed-only is passed."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Utility
  - release
---

:::note[Quick facts]
**Classification:** Utility | **Version:** 1.0.0 | **Category:** release | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:utility-pm-changelog-curator "Your context here"`

Cross-client dispatch wrapper for the `pm-changelog-curator` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-changelog-curator.md` and executes inline on non-Claude clients.

## When to Use

- You are preparing a release and want a CHANGELOG draft from git log between two tags
- You are running on a non-Claude AI client without native pm-changelog-curator sub-agent support
- You want a draft that respects pm-skills CHANGELOG hygiene rules (no internal-notes references, no em-dashes, public paths only) without manually applying them

## When NOT to Use

- You want to commit CHANGELOG entries directly (this skill produces a draft for review, not a commit)
- You want to review a PM artifact -> use `utility-pm-critic` instead
- You want a repo-wide governance audit -> use `utility-pm-skill-auditor`
- You want a full guided release flow -> use `utility-pm-release-conductor` (which chains to this skill at gate G2)

## How to Use

Invoke the skill by name (`/pm-skills:utility-pm-changelog-curator` on Claude Code, `$utility-pm-changelog-curator` on Codex):

```
/pm-skills:utility-pm-changelog-curator "Your context here"
```

Or reference the skill file directly: `skills/utility-pm-changelog-curator/SKILL.md`

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-skills:pm-changelog-curator` with the user's arguments. Pass `--since-tag`, `--target-version`, `--committed-only` from `$ARGUMENTS` if present. Return the sub-agent's draft to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `agents/pm-changelog-curator.md`
2. Execute the system prompt body in that file as your operating instructions
3. Run the 8-step drafting flow documented in the sub-agent definition (establish range -> read hygiene rules -> check working tree -> enumerate commits -> classify -> group -> rewrite -> determine target version -> emit draft)
4. Apply `--since-tag`, `--target-version`, and `--committed-only` arguments from `$ARGUMENTS`
5. Return the layered output per master plan D26 (full CHANGELOG draft + Status Summary + Status YAML)

## Output Template

# Output Template

`utility-pm-changelog-curator` produces a three-section layered output per master plan D26.

## Section 1: Full CHANGELOG Draft

````markdown
## [v{X.Y.Z}] - {YYYY-MM-DD}

### Added
- **{Item title}** description in plain English per hygiene rule 1 (what changed, not where it lives). References per hygiene rule 2 (public paths only). <!-- justification: {commit refs and classification reasoning} -->

### Changed
- **{Item title}** description. <!-- justification: ... -->

### Deprecated
- (omit section if empty)

### Removed
- (omit section if empty)

### Fixed
- **{Item title}** description. <!-- justification: ... -->

### Security
- **{Item title}** description with CVE / Dependabot alert reference. <!-- justification: ... -->

### Known Limitations
- (release-state caveats; e.g., GATE B pending status, deferred items)
````

Section ordering follows Keep-a-Changelog convention. Empty sections are omitted from the draft.

## Section 2: Status Summary (Prose, for Human Readers)

```markdown
## Status Summary

Drafted v{X.Y.Z} entries from {N} commits since v{prev}. {A} Added, {B} Changed, {C} Fixed, {S} Security{, {D} Deprecated, {R} Removed if non-zero}.

Highlights:
- {Top 2-3 user-facing items by impact}

Hidden justification comments are included after each entry for maintainer audit. Strip these comments before final commit per pm-release-conductor G2 sub-check 8 (the conductor does this automatically when chained).

**Recommended next action:** {explicit recommendation - review and edit; strip comments and commit; refuse and address; etc.}

**Refusal triggered:** {yes/no with reason if yes}.
```

## Section 3: Status YAML (Machine-Parseable, for Parent Sub-Agent or Tooling)

````markdown
## Status

```yaml
status: draft | refused
target_version: v{X.Y.Z}
since_tag: v{prev}
commits_processed: {integer}
entries_added: {integer}
entries_changed: {integer}
entries_fixed: {integer}
entries_removed: {integer}
entries_security: {integer}
entries_deprecated: {integer}
dirty_tree_warning: true | false
refusal_reason: null | "non-existent tag" | "empty range" | "CLAUDE.md unreadable" | "dirty working tree"

dispatch:
  mode: native-subagent | inline-execution
  client: claude-code | codex-cli | cursor | windsurf | copilot | gemini-cli | other
```
````

## Hygiene Rule Checklist (Applied by Sub-Agent / Dispatch Skill)

Every drafted entry MUST comply with CLAUDE.md hygiene rules:

1. **No em-dashes.** Use " - ", ":", ",", or sentence break
2. **No Claude attribution trailers.** No "Generated with Claude" or "Co-Authored-By: Claude" footers
3. **No internal-notes references.** No `_NOTES/`, no `AGENTS/SESSION-LOG/`, no `docs/internal/efforts/`, no `docs/internal/release-plans/`
4. **Public-path framing.** Describe what changed; do not reference internal-only file paths
5. **Keep-a-Changelog section headers.** Added / Changed / Deprecated / Removed / Fixed / Security
6. **ISO date format.** YYYY-MM-DD in release header
7. **Hidden justification comments** for maintainer audit; stripped before final commit

## Chained Handoff Notes

When invoked from `pm-release-conductor` at gate G2 (Version bump + CHANGELOG prep):

- All three sections MUST be present
- The conductor parses Section 3 YAML for advancement decisions
- The maintainer reads Sections 1 + 2 to review the draft
- If `status: refused`, conductor surfaces Section 2 refusal narrative
- If `dirty_tree_warning: true`, conductor surfaces a warning to the maintainer (not necessarily blocking, but the maintainer should know)

## Related Files

- Canonical sub-agent: [`agents/pm-changelog-curator.md`](../../../agents/pm-changelog-curator.md)
- Worked example: `EXAMPLE.md`
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md`](../../../docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md)

## Example Output

<details>
<summary>Example: pm-changelog-curator Dispatch on Windsurf</summary>

# Example: pm-changelog-curator Dispatch on Windsurf

This example shows `utility-pm-changelog-curator` execution on a non-Claude client (Windsurf). The dispatch skill reads `agents/pm-changelog-curator.md` and executes the 8-step drafting flow inline.

## Invocation

```
windsurf> /utility-pm-changelog-curator --since-tag v2.15.2 --target-version v2.16.0
```

## Skill behavior

1. **Runtime detection.** Detects Windsurf (not Claude Code with pm-skills plugin); takes non-Claude branch.
2. **Reads canonical sub-agent definition.** Loads `agents/pm-changelog-curator.md` as operating instructions.
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

- **Sub-agents** (new component class): four Claude Code plugin sub-agents at `agents/` plus matching dispatch skills at `skills/utility-pm-{role}/` for cross-client access. `pm-critic` runs adversarial review proactively after PM-artifact-producing skills; `pm-skill-auditor` runs repo-wide cross-cutting governance audits; `pm-changelog-curator` drafts CHANGELOG entries from git log applying hygiene rules; `pm-release-conductor` walks a 6-gate guided release runbook with chain composition. See `docs/reference/runtime-components.md`. <!-- justification: feat(v2.16.0-phase-{1,2,3,4,5}) commits; user-facing per "feat: -> Added" classification rule; sub-agents are a new component class -->

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

- Canonical sub-agent: [`agents/pm-changelog-curator.md`](../../../agents/pm-changelog-curator.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- v2.15.1 + v2.15.2 CHANGELOG entries: `CHANGELOG.md` (root, canonical exemplars)

</details>
