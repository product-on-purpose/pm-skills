# [F-11] PM Skill Iterate
Status: Design (post-Codex review)
Release: v2.8.0
Issue: #122
Agent: Claude Opus 4.6
Last updated: 2026-04-03

## Scope

Create `utility-pm-skill-iterate` — a utility skill that takes feedback, learnings, or convention changes and applies targeted improvements to an existing pm-skills skill. Reads the current skill files, proposes changes as before/after blocks grouped by file, and on confirmation writes the updates directly with a change summary and version bump suggestion.

## Relationship

Part of the PM Skill lifecycle: Create (F-05) → Validate (F-10) → **Iterate (F-11)**

## Design Decisions

### 1. Separate skill (one skill, one job)

The builder creates, the validator audits, the iterator improves. Each is independently invocable and testable.

### 2. Proposed changes preview, then direct write

No staging area. The iterator shows proposed changes as before/after blocks grouped per file, the user confirms (all-or-nothing), and changes are written directly to skill files.

**Why not staging (like the builder)?** The builder creates 4+ files from scratch — staging makes sense as a review gate before promoting new content into canonical locations. The iterator modifies 1-3 existing files with targeted edits. Git serves as the safety net: if applied changes are wrong, `git checkout -- skills/{name}/` reverts them.

**Stale-preview guard:** Before writing, the iterator must re-read each target file and compare it to the content used to generate the preview. If any target file has changed since the preview was generated (e.g., user made a manual edit), abort the write and regenerate the preview. This prevents silent overwrites of concurrent edits. Note: for an LLM skill, this is a behavioral instruction ("re-read before writing"), not a programmatic hash check.

**Flow:**
1. Read current skill files
2. Normalize input into a structured list of intended changes (see Decision #5)
3. Present proposed changes as before/after blocks, grouped per file
4. User confirms → re-read targets to check for staleness → write changes
5. Change summary + version bump class suggestion presented

### 3. Suggest version bump class, don't auto-write the number

Iteration includes governance. After applying changes, the iterator classifies the change and suggests a version bump *class* using the SemVer rules from `docs/internal/skill-versioning.md`:

- Wording/example improvements → patch
- New optional section or capability → minor
- Restructured output contract or changed interaction pattern → major

**Tie-breaker rule** (from `docs/internal/skill-versioning.md`)**:** If a user must do something new to stay compliant with the skill's required contract, classify as major. If the new behavior is additive/optional, classify as minor. If the required behavior is unchanged and only clarified, classify as patch.

**What gets written when:**
- `updated` date → written immediately on apply (tracks file modification time)
- `version` number → written only on explicit user confirmation of the suggested bump

This prevents compounding bumps across multiple iterations before release. If a user runs the iterator 3 times before releasing, the version should reflect one cumulative change from the last released version, not 3 incremental bumps.

Presented as: "Suggested bump: patch (wording improvements). Current version: 2.0.0. Bump to 2.0.1? [yes / override / skip]"

### 4. Offer to update HISTORY.md (create at trigger point)

After changes are applied, the iterator produces a change summary.

**If HISTORY.md exists:** Validate its format against the contract in `skill-versioning.md` (summary table + newest-first ordering + per-version sections). If valid, offer to append: "Would you like me to add this to HISTORY.md? [yes / no]". If format is invalid (e.g., manually edited into a non-standard shape), warn and show the proposed content without writing: "HISTORY.md doesn't follow the expected format. Here's what I would add — you can paste it manually."

**If HISTORY.md does not exist AND this iteration creates the skill's second version:** Offer to *create* HISTORY.md with entries for both the original version (1.0.0) and the new version. This is the governance trigger point per `skill-versioning.md` ("created when a skill ships its second version").

**If HISTORY.md does not exist AND the skill is still on its first version:** No offer. The iterator is applying changes but the user hasn't bumped the version yet — HISTORY.md is premature.

### 5. One unified flow with input normalization (v1)

All input types enter the same flow. The iterator accepts:
- Validation report from `/pm-skill-validate` (structured, pipe-delimited per `Report schema: v1`)
- Direct user feedback ("the template is missing section X")
- Convention changes ("all skills now need a Limitations section")
- General improvement request ("make the example more realistic")

**First step: normalize input.** Regardless of input type, the iterator's first action is to extract a structured list of intended changes:

```
Intended changes:
1. Target: skills/deliver-prd/SKILL.md → Output Format section
   Change: Add explicit template section references
   Source: validation report, check output-contract-coverage
2. Target: skills/deliver-prd/references/EXAMPLE.md → Risks section
   Change: Fill placeholder with concrete risk examples
   Source: validation report, check example-completeness
```

This normalization step is what makes the unified flow work consistently. A validation report produces the list from its `## Recommendations` section. Free-text feedback produces the list from the user's description. The downstream flow (preview → confirm → write) is identical regardless of input type.

**Consuming F-10 reports:** When the input is a validation report, the iterator parses by `## Recommendations` heading, splits recommendation lines on `|` to extract check ID and target path, and uses these as the intended change list. Requires `Report schema: v1`.

No explicit modes or flags in v1. **Future consideration:** If usage patterns reveal that validation-report-driven iteration and free-text-driven iteration need meaningfully different flows, split into explicit modes in a future version.

### 6. MCP-safe behavior

Validation-report-driven iteration is the MCP-portable path — the report carries the context. For free-text iteration, file system access is required to read current skill files. In degraded environments (MCP/embedded where file system access is unavailable), require the user to provide relevant file excerpts before proposing changes. The skill instructions should include a "Degraded mode" section documenting this.

## Interaction Contract

```
User: /pm-skill-iterate deliver-prd "Output contract should cover all template sections"

Iterator:
1. Reads skills/deliver-prd/SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md
2. Normalizes input into intended changes:
   - Target: SKILL.md → Output Format section
   - Change: Add explicit template section references
3. Presents proposed changes:

   ### skills/deliver-prd/SKILL.md

   **Output Format section — before:**
   > Use the template in `references/TEMPLATE.md` to structure the output.

   **Output Format section — after:**
   > Use the template in `references/TEMPLATE.md` to structure the output.
   > The output MUST include these sections: Problem Summary, Goals,
   > Solution Overview, Requirements, Scope, Technical Considerations,
   > Dependencies, Timeline.

4. "Apply these changes? [yes / no]"
5. Re-reads SKILL.md to verify it hasn't changed since preview.
6. On yes: writes changes, updates `updated` date.
   "Suggested bump: patch (output contract clarification). Current: 2.0.0.
    Bump to 2.0.1? [yes / override / skip]"
7. On accept: updates version in frontmatter.
8. HISTORY.md exists → validates format → "Add this to HISTORY.md? [yes / no]"
```

## Dependencies

- F-05 (#113) — establishes the skill structure the iterator modifies
- F-10 (#121) — validation report is one input type; report format (`Report schema: v1`) defines what the iterator can parse

## Artifacts Produced

| Artifact | Agent | Phase |
|----------|-------|-------|
| `skills/utility-pm-skill-iterate/SKILL.md` | Claude Opus 4.6 (extended thinking) | Phase 2 |
| `skills/utility-pm-skill-iterate/references/TEMPLATE.md` | Codex / GPT-5.4 (extended thinking) | Phase 3 |
| `skills/utility-pm-skill-iterate/references/EXAMPLE.md` | Codex / GPT-5.4 (extended thinking) | Phase 3 |
| `commands/pm-skill-iterate.md` | Codex / GPT-5.4 | Phase 3 |
| AGENTS.md entry | Codex / GPT-5.4 | Phase 3 |

**Why the split:** SKILL.md encodes complex logic (stale-preview guard, version bump class suggestion, HISTORY.md creation/validation, input normalization). Extended thinking helps hold all constraints coherently. EXAMPLE.md should show a real iteration of a real skill — Codex reads the before-state, applies a change, and produces the worked example with before/after blocks.

## Codex Review

Reviewed 2026-04-02. See `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md` for full findings and evaluations. Key changes from review:
- Preview format changed from "diff" to "before/after blocks" (Finding 3.2)
- Added stale-preview guard — re-read before writing (Finding 3.3)
- Version bump changed to suggest-only — don't auto-write number (Finding 4.2)
- HISTORY.md creation allowed at second-version trigger point (Finding 4.3)
- HISTORY.md format validation before append (Finding 4.4)
- Added input normalization as explicit first step (Finding 5.2)

## PRs

- TBD
