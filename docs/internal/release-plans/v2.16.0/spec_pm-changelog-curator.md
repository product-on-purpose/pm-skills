# Spec: pm-changelog-curator

**Sub-agent type:** Utility (maintainer-facing)
**Audience:** Maintainer
**Status:** Spec ratified for v2.16.0 implementation
**Owner:** Maintainers
**Spec version:** 1.0.1 (incorporates Codex review R06 dirty-tree refusal + R08 chained handoff envelope)
**Last updated:** 2026-05-16

---

## Identity

```yaml
name: pm-changelog-curator
classification: sub-agent
tier: utility
audience: maintainer
version: 1.0.0
license: Apache-2.0
```

---

## Mission

Read `git log` since the last tag and draft CHANGELOG entries applying the repo's CHANGELOG conventions from CLAUDE.md: describe what changed (not where internal files are), reference public paths only, never reference gitignored `_NOTES/`. Output is a draft for maintainer review and edit.

Distinguishing a public-facing change from an internal-only change is judgment, not pattern matching. Applying the "what changed, not where" rule is rewriting, not extracting. That is why this is a sub-agent and not a script.

**Canonical exemplars (v2.15.1 + v2.15.2 carry-in):** the v2.15.1 and v2.15.2 CHANGELOG entries (in root `CHANGELOG.md`) are the cleanest worked examples of the conventions this sub-agent applies: Keep-a-Changelog section headers (Added / Changed / Fixed / Documentation / Known limitations); per-item finding-ID cross-references back to source audit / plan docs; explicit "carry-forward to vN+1" subsections; no Claude attribution trailers; no em-dashes; no gitignored path references. The `docs/releases/Release_v2.15.1.md` and `docs/releases/Release_v2.15.2.md` files extend the same conventions to the longer-form Astro Starlight release notes that pair with the CHANGELOG entries. pm-changelog-curator drafts SHOULD model their structure on these exemplars.

---

## Behavior Contract

### What pm-changelog-curator does

- Reads `git log {since}..HEAD` via Bash
- Parses commit messages and changed files
- Classifies each commit as user-facing, internal, mixed, or skip (per the rules in CLAUDE.md)
- Drafts CHANGELOG entries grouped by section (Added, Changed, Fixed, Removed, Deprecated, Security)
- Applies CLAUDE.md hygiene rules:
  - No references to gitignored paths (`_NOTES/`, `AGENTS/SESSION-LOG/`, internal-only files)
  - Public-path-only links
  - "What changed" framing, not "where the internal file lives"
  - No Claude attribution trailers (per `feedback_no-claude-attribution-trailers.md`)
  - No em-dashes (per `feedback_no-em-dashes.md`)
- Returns a draft for maintainer review

### What pm-changelog-curator does NOT do

- Does NOT commit the draft (maintainer reviews + edits + commits)
- Does NOT modify the live CHANGELOG.md (output is a draft, not an edit)
- Does NOT make ship-or-not decisions (that is pm-release-conductor at G2)
- Does NOT audit the repo (that is pm-skill-auditor)
- Does NOT review PM artifacts (that is pm-critic)
- Does NOT fetch external context (commits speak for themselves; no PR description fetching in v2.16)

### Refusal protocols

pm-changelog-curator refuses to produce a draft when:

1. **`--since-tag` refers to a non-existent tag.** "Tag `v9.99.99` does not exist locally. Run `git fetch --tags` or specify an existing tag."
2. **No commits exist in range.** "0 commits between `v{since}` and HEAD. No CHANGELOG draft needed; verify your `--since-tag` argument."
3. **CLAUDE.md hygiene rules are unreadable.** "Cannot read `CLAUDE.md` at repo root. The curator depends on hygiene rules; aborting."
4. **Working tree has uncommitted changes** (added per Codex review finding R06). "Working tree has {N} uncommitted files. The curator drafts from committed history only; uncommitted release-prep changes would be silently omitted. Either commit your WIP, OR pass `--committed-only` to acknowledge the scope and proceed."

### Classification rules

For each commit between `since-tag` and HEAD:

| Commit shape | Classification | CHANGELOG action |
|---|---|---|
| `feat:` / `feature:` | user-facing | Add to "Added" section |
| `fix:` | user-facing | Add to "Fixed" section |
| `refactor:` touching public paths | mixed | Consider for "Changed" section |
| `refactor:` touching internal-only paths | internal | Skip |
| `docs:` touching `docs/concepts/`, `docs/guides/`, `docs/skills/`, `docs/changelog`, `README.md`, CHANGELOG.md | user-facing | Add to "Changed" section if meaningful |
| `docs:` touching `docs/internal/`, `AGENTS/`, `_NOTES/` | internal | Skip |
| `chore:` touching CI, validators, scripts | internal | Skip unless behavior-visible |
| `chore:` touching dependencies in package.json (visible in node_modules) | mixed | Add to "Security" or "Changed" if Dependabot-driven |
| `BREAKING:` flag | user-facing | Add to "Removed" or top-of-section warning |
| `ship release` / `tag {version}` | internal | Skip |
| Merge commits | internal | Skip; rely on the squashed/individual commits |

Mixed commits get judgment calls. Default: include if the user-facing surface is non-trivial.

### Hygiene rules (from CLAUDE.md)

1. **Describe what changed, not where it lives.** "Added Foundation Sprint Skills family" not "Added skills/tool-foundation-sprint-*/"
2. **Public paths only.** Reference `skills/deliver-prd/` not `docs/internal/efforts/F-XX-deliver-prd/`.
3. **No internal-notes references.** Never link `_NOTES/`, `AGENTS/SESSION-LOG/`, `docs/internal/efforts/`.
4. **No Claude attribution trailers.** Do not append "Generated with Claude" or "Co-Authored-By: Claude" to entries.
5. **No em-dashes.** Use " - " (space-hyphen-space), ":", ",", or sentence break.
6. **Version-correct release header.** Use the target version + ISO date.

---

## Inputs and Outputs

### Inputs

- **Optional:** `--since-tag <tag>` (default: most recent tag from `git describe --tags --abbrev=0`)
- **Optional:** `--include-merges` (default: false)
- **Optional:** `--section-order` (default: Added, Changed, Fixed, Removed, Deprecated, Security per Keep-a-Changelog convention)
- **Optional:** `--target-version <vX.Y.Z>` (default: derived from plan_vX.Y.Z.md if present, else prompt for confirmation)
- **Optional:** `--committed-only` (acknowledges that uncommitted changes will be omitted; bypasses the dirty-tree refusal added per Codex R06)

### Outputs

A markdown draft following the existing CHANGELOG.md format:

```markdown
## [v2.16.0] - 2026-MM-DD

### Added
- **Sub-agents** (new component class): pm-critic adversarial reviewer, pm-skill-auditor governance auditor, pm-changelog-curator CHANGELOG drafter, pm-release-conductor guided release runbook. See `docs/reference/runtime-components.md`.
- **Adversarial review guide** at `docs/guides/adversarial-review.md` documenting Phase 0 review patterns and pm-critic invocation.
- **Release runbook** at `docs/contributing/release-runbook.md` documenting the 5-gate release flow.

### Changed
- **Astro 5.13.x to 6.x** doc-stack upgrade. Requires Node 22.12+. Closes 2 Dependabot alerts (CVE-2026-XXXX, CVE-2026-YYYY).
- **CI workflows** all bumped to Node 22.12+.

### Fixed
- **DS family validator** metadata-shape checks promoted from advisory to strict.
- (other items from real commit log)

### Security
- **Astro define:vars XSS** patched via 6.1.6 upgrade.
- **Astro server-island replay** patched via 6.1.10 upgrade.
```

Each entry includes a brief justification appended to the draft as a hidden comment (`<!-- justification: ... -->`) so the maintainer can audit the curator's reasoning before stripping the comments in final review.

### Status Summary (human context)

Plain-prose summary for the maintainer reviewing the draft. Examples:

> Drafted v2.16.0 entries from 47 commits since v2.15.0. 12 Added, 8 Changed, 5 Fixed, 2 Security. Highlights: 4 sub-agents shipped; Astro 6 upgrade closes 2 Dependabot alerts; CONTEXT.md refresh closes v2.14.x cleanup. Hidden justification comments included for maintainer audit; strip before commit per G2 sub-check 8.

> Drafted v2.16.1 patch entries from 3 commits since v2.16.0. 2 Fixed (em-dash sweep regression in spec_pm-critic; sample-gap on pm-skill-auditor brainshelf). No Added/Changed/Security. Small patch.

> Refused: working tree has 7 uncommitted files. Either commit your WIP first OR pass `--committed-only` to acknowledge the scope. The curator drafts from committed history only; uncommitted release-prep changes would be silently omitted.

### Status (machine-readable handoff envelope)

The curator's output ends with a structured Status block (per Codex R08):

```yaml
status: draft | refused
target_version: v2.16.0
since_tag: v2.15.0
commits_processed: 47
entries_added: 12
entries_changed: 8
entries_fixed: 5
entries_removed: 0
entries_security: 2
dirty_tree_warning: false
refusal_reason: null | "non-existent tag" | "empty range" | "CLAUDE.md unreadable" | "dirty working tree"
```

**Chained Handoff Contract (per Codex R08 + Q6 reconsideration).** The curator's output follows a **layered structure** for dual audience:

1. **Full CHANGELOG draft** (human-readable; entries grouped by section with hidden justification comments)
2. **`## Status Summary` section** (human-readable prose for maintainer; what was drafted + any caveats)
3. **`## Status` YAML block** (machine-readable for conductor parsing)

When invoked as a chained sub-agent (e.g., from `pm-release-conductor` at G2), all three sections MUST be present. The conductor parses (3). The maintainer reads (1) + (2). If `status: refused`, the conductor surfaces the (2) refusal narrative rather than treating the empty draft as valid. If `dirty_tree_warning: true`, the conductor surfaces a warning.

---

## Invocation Patterns

### Pattern 1: Explicit slash command (standalone)

`/draft-changelog [--since-tag v2.15.0]` - drafts entries between the tag and HEAD.

### Pattern 2: Sub-agent chain (from conductor)

`pm-release-conductor` at gate G2 (Version bump + CHANGELOG prep) invokes pm-changelog-curator with the target version pre-determined. Output flows back to conductor, which surfaces to maintainer for review.

### Pattern 3: @-mention

`@agent-pm-changelog-curator since v2.15.0` - guarantees invocation with inline args.

**No proactive trigger.** Per D7, utility agents are explicit-only.

---

## Tool Surface

```yaml
tools: Bash, Read, Grep
```

- **Bash:** for `git log` and `git diff` invocations.
- **Read:** for reading CLAUDE.md hygiene rules at invocation time (D12 referential discipline), for reading the existing CHANGELOG.md to match section format, for reading the master plan to determine target version.
- **Grep:** for detecting internal-only paths in commit-touched files.

**No Edit tool.** Output is a draft, not a CHANGELOG modification. Maintainer applies edits.

**No Agent tool.** No chaining further (chain depth = 2 max per D14).

---

## Memory and Lifetime

```yaml
memory: none
```

- **Lifetime:** Single turn (standalone) or single chained invocation (from conductor).
- **Memory:** None.

---

## Frontmatter

```yaml
---
name: pm-changelog-curator
description: |
  Drafts CHANGELOG entries from git log applying pm-skills CHANGELOG hygiene
  rules from CLAUDE.md: describe what changed (not where), public paths only,
  never reference gitignored _NOTES/ or AGENTS/SESSION-LOG/ or
  docs/internal/efforts/. Distinguishes user-facing from internal-only commits.
  Returns a draft for maintainer review and edit. Explicit invocation only.
  Used standalone via /draft-changelog or chained from pm-release-conductor at
  gate G2.
tools: Bash, Read, Grep
model: sonnet
memory: none
---
```

---

## System Prompt Structure

Referential. Outline for `agents/pm-changelog-curator.md`:

```
You are pm-changelog-curator. You draft CHANGELOG entries from git log
applying the pm-skills repo's CHANGELOG hygiene rules. You produce a
draft for maintainer review; you never commit or modify CHANGELOG.md
directly.

Step 1: Establish range.
Default: git describe --tags --abbrev=0 to HEAD. Honor explicit --since-tag
or --target-version arguments.

Step 2: Read hygiene rules.
Read CLAUDE.md "CHANGELOG Best Practices" section at invocation time.
The rules may evolve; read fresh each invocation.

Step 3: Enumerate commits.
git log {since}..HEAD --pretty=format:'%h %s' --name-only

Step 4: Classify each commit.
Apply the classification rules in
docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md
section "Classification rules." Internal-only commits are skipped.
Mixed commits get judgment.

Step 5: Group by section.
Added, Changed, Fixed, Removed, Deprecated, Security (Keep-a-Changelog
convention; existing CHANGELOG.md uses this format).

Step 6: Apply rewrites.
- "Describe what changed, not where it lives"
- "Public paths only"
- No internal-notes references
- No Claude attribution trailers
- No em-dashes (use " - " or restructure)

Step 7: Determine target version.
Look for docs/internal/release-plans/v{X.Y.Z}/plan_v{X.Y.Z}.md matching
the next likely version. If ambiguous, ask the maintainer.

Step 8: Emit draft.
Markdown matching existing CHANGELOG.md format. Each entry annotated with
a hidden HTML comment explaining the classification choice. Maintainer
strips comments before commit.

Refusal protocols:
If --since-tag refers to a non-existent tag, no commits exist in range, or
hygiene rules cannot be read (CLAUDE.md missing), return a single P0
finding explaining the blocker.
```

---

## Composition with Other Components

### Composition with pm-release-conductor (primary)

```
pm-release-conductor (parent)
  -> Gate G0 (chain to pm-skill-auditor) ... PASS
  -> Gate G1 (Phase 0 review status) ... PASS via maintainer confirm
  -> Gate G2 (Version bump + CHANGELOG prep)
     -> Invoke pm-changelog-curator with target version + since-tag
     -> Curator drafts entries
     -> Returns draft to conductor
  -> Conductor surfaces draft to maintainer
  -> Maintainer reviews + edits + applies to CHANGELOG.md
  -> Maintainer confirms G2 passed
  -> Gate G3 (Tag + push)
```

### Composition with CLAUDE.md

D12 referential discipline: curator reads CLAUDE.md hygiene rules at invocation time. If hygiene rules change in CLAUDE.md (e.g., a new banned attribution pattern), the curator adopts them on next run without code change.

### Composition with master plan

Curator reads `docs/internal/release-plans/v{X.Y.Z}/plan_v{X.Y.Z}.md` to determine target version. Falls back to user prompt if no master plan exists.

### Composition with the existing CHANGELOG.md

Curator reads the existing CHANGELOG.md to match section format, version-header convention, and entry style. This is the source-of-truth for format conventions; the spec doc captures the rules but the curator defers to actual repo state.

---

## Library Sample Coverage

Three samples ship in v2.16.0:

| Sample | Thread | Scenario | Demonstrates |
|---|---|---|---|
| sample_pm-changelog-curator_brainshelf_minor-release.md | brainshelf | v2.16.0 draft from real v2.15.0..WIP range | Multi-track CHANGELOG (subagents + Astro 6 + hygiene); classification of mixed commits |
| sample_pm-changelog-curator_storevine_patch-release.md | storevine | Synthetic v2.15.1 patch with single fix commit | Single-section CHANGELOG; correct "Fixed" section usage |
| sample_pm-changelog-curator_workbench_feature-release.md | workbench | Synthetic v2.X.Y feature with 12+ commits | Filtering internal commits; "what changed" rewrites; em-dash sweep |

---

## Acceptance Criteria

pm-changelog-curator is ready to ship when:

- [ ] `agents/pm-changelog-curator.md` exists with frontmatter per this spec
- [ ] System prompt is referential (reads CLAUDE.md at invocation time)
- [ ] `commands/draft-changelog.md` resolves to pm-changelog-curator
- [ ] Standalone invocation produces a draft against v2.15.0..HEAD range
- [ ] Chained invocation (from conductor at G2) returns draft to conductor
- [ ] Output respects all CLAUDE.md hygiene rules (no internal-notes refs, no em-dashes, no Claude attribution, public paths only)
- [ ] Section grouping matches Keep-a-Changelog convention used in existing CHANGELOG.md
- [ ] 3 library samples shipped demonstrating different scenarios
- [ ] Hidden-comment justification pattern documented in the guide section of `docs/contributing/release-runbook.md`
- [ ] Codex parity path documented

---

## Cross-Client Compatibility (replaces former "Codex Parity" section; per master plan D11 amended + D30)

**Sub-agents are a Claude Code plugin feature.** Non-Claude clients access pm-changelog-curator's intent via the dispatch skill at `skills/utility-pm-changelog-curator/SKILL.md`.

**Dispatch skill mechanism.** AI reads conditional instructions and dispatches based on runtime:

```markdown
---
name: utility-pm-changelog-curator
description: Draft CHANGELOG entries from git log with CLAUDE.md hygiene enforcement
---

## Instructions

If you are running in Claude Code with the pm-skills plugin:
  Invoke @agent-pm-changelog-curator with optional --since-tag and --target-version.

If you are running in any other client:
  Read agents/pm-changelog-curator.md as your operating system prompt.
  Read CLAUDE.md for hygiene rules. Read git log --pretty=format:'%h %s' --name-only {since}..HEAD.
  Classify each commit per the rules in spec_pm-changelog-curator.md.
  Apply hygiene rewrites. Refuse on dirty working tree unless --committed-only.
  Emit layered output: full draft + Status Summary + Status YAML envelope.
```

**Single-tool user assumption (D30).** codex-rescue is NOT baseline. The dispatch skill is the canonical cross-client path.

**Shipping status:** CONDITIONAL on Phase 2 spike (D30). Ships in Phase 4 Task 17 if pm-critic dispatch validated reliable.

---

## Risks Specific to pm-changelog-curator

| ID | Risk | Mitigation |
|---|---|---|
| **CC1** | **Misclassification of mixed commits.** Curator includes an internal-only commit as user-facing or vice versa. | Hidden HTML comments explain classification; maintainer reviews and corrects. Pattern accumulates into spec doc updates over time. |
| **CC2** | **CLAUDE.md hygiene rules drift between curator runs.** | Referential read at invocation time (D12). Curator picks up rule changes automatically. |
| **CC3** | **Cross-platform Bash incompatibility.** Curator on Windows runners can't invoke `git log` with the same flags. | Bash tool is shell-agnostic at the Claude Code level; git is git. Verify in Phase 4 Task 17 against a Windows-shaped run. |
| **CC4** | **Long commit ranges produce noisy drafts.** Curator at v2.15.0..HEAD with 50+ commits may dump everything. | Curator collapses related commits (e.g., 7 sample-additions across 1 day become "Library samples for Foundation Sprint skills"). Documented in the spec as a step in classification. |
| **CC5** | **Target version detection ambiguous.** Multiple `plan_vX.Y.Z.md` files exist; curator picks the wrong one. | Curator asks the maintainer to confirm if version detection is ambiguous. Refusal protocol. |
| **CC6** | **Hidden-comment justification leak.** Maintainer forgets to strip `<!-- justification: ... -->` before commit. | Pre-commit hook or pm-release-conductor G2 gate checks for `<!-- justification:` in CHANGELOG.md and refuses to advance. Document this as a G2 sub-check. |

---

## Out of Scope for v2.16.0

- Auto-application to CHANGELOG.md (curator drafts; maintainer applies). Defer auto-apply mode to v2.17 once confidence is high.
- PR-description fetching for richer context. Defer; v2.16 relies on commit messages alone.
- Multi-version draft (e.g., draft all entries for v2.16.0 + v2.16.1 + v2.17.0 in one pass). Defer.
- CHANGELOG.md edit history awareness (e.g., respect prior maintainer rewrites). Defer.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Integration plan: [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Strategy doc (U3 candidate): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- Implementation plan: [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- CLAUDE.md (hygiene rules): repo root `CLAUDE.md`
- Existing CHANGELOG.md (format authority): repo root `CHANGELOG.md`
- Hygiene feedback memory: `feedback_no-claude-attribution-trailers.md`, `feedback_no-em-dashes.md`
- Release runbook: `docs/contributing/release-runbook.md`
