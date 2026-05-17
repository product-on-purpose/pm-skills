---
title: "pm-changelog-curator Dispatch Output Template"
description: Output structure for utility-pm-changelog-curator dispatch skill, including the layered Status envelope per master plan D26 (full CHANGELOG draft with hidden justification comments + Status Summary prose + Status YAML block).
---

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

- Canonical sub-agent: [`subagents/pm-changelog-curator.md`](../../../subagents/pm-changelog-curator.md)
- Worked example: [`EXAMPLE.md`](./EXAMPLE.md)
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md`](../../../docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md)
