# F-05 PM Skill Builder: Codex Implementation Review

> **Date**: 2026-03-22
> **Reviewer**: Codex 5.4
> **Review request**: `implementation-review-request-for-codex.md` (same directory)
> **Commits reviewed**:
> - `3c50108` `chore: add _staging/ to gitignore for pm-skill-builder drafts`
> - `df794a1` `feat(F-05): add utility-pm-skill-builder skill content (SKILL.md, TEMPLATE.md, EXAMPLE.md)`
> - `a67f144` `feat(F-05): add /pm-skill-builder command and AGENTS.md entry`
> - `1db6201` `docs(F-05): reconcile effort brief, mark pm-skill-builder as implemented`
> **Issue**: #113

---

## Scope Note

The review request is partially stale relative to the current repo state.

- It asks me to verify a shipped inventory note of `26 skills`, but after F-05 landed the live repo state is `27` skills.
- It cites `SKILL.md` as `271` lines and `EXAMPLE.md` as `298` lines; current files are `212` and `202` lines respectively.

Findings below are based on the current shipped files and current repo state, not the earlier expected counts embedded in the request.

---

## Validation Evidence

| Check | Command | Result | Notes |
| --- | --- | --- | --- |
| Skill validator | `./scripts/lint-skills-frontmatter.ps1` | `pass` | all 27 skills green |
| Command validator | `./scripts/validate-commands.ps1` | `pass` | includes `pm-skill-builder.md` |
| AGENTS validator | `./scripts/validate-agents-md.ps1` | `pass` | `AGENTS.md matches 27 skill paths` |
| Current skill count | `Get-ChildItem skills -Directory \| Measure-Object` | `pass` | `27` |
| Current command-doc count | `Get-ChildItem commands -File | Where-Object { $_.Name -ne '.gitkeep' } | Measure-Object` | `pass` | `28` |
| Frontmatter description count | PowerShell regex word count on `SKILL.md` description line | `pass` | `43` words |

---

## Findings

### 1. Minor: inventory counts in the shipped builder artifacts are stale after F-05 landed

This is the only substantive issue I found.

The current shipped builder skill says:
- `skills/utility-pm-skill-builder/SKILL.md:188-189` → `current skill inventory (26 skills)`

But the same file also contains:
- `25` domain skills
- `1` foundation skill
- `1` utility skill (`pm-skill-builder`)

That is `27`, not `26`.

The example packet carries the same stale count:
- `skills/utility-pm-skill-builder/references/EXAMPLE.md:38` → `All 26 skills reviewed`
- `skills/utility-pm-skill-builder/references/EXAMPLE.md:286` → `Gap analysis checked all 26 existing skills`

Why this is minor rather than blocking:
- the skill also tells the agent to scan `skills/` for the latest count
- all validators pass
- the count issue does not break the builder workflow or file structure

Recommended fix:
- update those count references to `27`, or
- clarify them as `26 other skills plus this builder` if you want to exclude self-reference from the overlap narrative

### 2. Informational: requested adaptation checks #1-4 and #6 are satisfied

The specific adaptation points called out in the request are implemented correctly apart from the stale count issue above.

Verified:
- `## When NOT to Use` no longer references `/pm-skill-validate`, `/pm-skill-iterate`, or `/agent-skill-builder`
- the utility table no longer says `This skill (F-05, in design)`
- `## Examples` points to `references/EXAMPLE.md`
- the domain header remains `### Domain Skills (25)`, which is correct because the table has 25 domain rows

### 3. Informational: EXAMPLE.md quality is good and has no blocking content problems

The example scenario is credible and well differentiated.

Checks:
- `deliver-change-communication` is a realistic deliver/coordination skill concept
- the overlap analysis against `deliver-release-notes` and `deliver-launch-checklist` is technically sound
- the K/P/C/W split of `20 / 40 / 15 / 25` is reasonable for a workflow-heavy coordination skill
- the representative `Draft SKILL.md` excerpt is enough to show structure without bloating the packet
- line count is `202`, which stays within the requested `150-300` range

One nuance:
- the validation checklist inside the packet is only slightly overstated because the packet uses representative excerpts rather than fully expanded draft files
- in practice this is acceptable for the packet example and not a blocker

### 4. Informational: AGENTS.md placement and command-table insertion are fine

The new section placement is coherent:
- `AGENTS.md:143-176` puts `### Utility Skills` after `### Iterate Phase` and before `## Workflow Bundles`
- `/pm-skill-builder` is present in the commands table at `AGENTS.md:210`

This hierarchy makes sense. The only asymmetry is that the top section is named `Foundation Classification` while the new section is `Utility Skills`, but that naming inconsistency predates this change and is not an F-05 regression.

### 5. Informational: the request document itself now contains stale expectations

Two examples:
- it asks me to verify `current skill inventory (26 skills)` as the expected shipped text
- it cites file lengths that no longer match the reviewed files

This does not invalidate the implementation. It just means the request should not be treated as the source of truth when it conflicts with the live repo state.

---

## Responses To Specific Questions

### 1. Frontmatter description word count

The implementation plan's `37 words` note is wrong.

The current shipped description in `skills/utility-pm-skill-builder/SKILL.md:4` is `43` words by direct count. That is still within the required `20-100` range, and the validator passes. No implementation issue here.

### 2. Effort brief reconciliation (`1db6201`)

Removing the separate sample-output-library section was the right call.

Reasoning:
- the shipped skill already includes `references/EXAMPLE.md` as its demonstration artifact
- duplicating that with a separate sample-output-library commitment would add maintenance cost without adding much value
- the current effort brief now correctly treats `references/EXAMPLE.md` as the demonstration mechanism and keeps the staging workflow centered on `_staging/pm-skill-builder/`

If you still want to preserve the original thread ideas, the design doc is the right place. They do not need to stay in shipped scope.

### 3. TEMPLATE.md guidance notes

Keep them.

The blockquote notes in `skills/utility-pm-skill-builder/references/TEMPLATE.md` are builder-facing convention guidance, not accidental user leakage. This template is an internal packet format for contributors, not a user-facing PM artifact template. The convention notes are part of the builder contract and should stay unless the builder is intentionally redesigned to strip authoring guidance before display.

---

## Overall Verdict

Approve with minor changes.

**No blocking issues.**

Recommended follow-up before tag prep:
1. Fix the stale `26` count references in `skills/utility-pm-skill-builder/SKILL.md`.
2. Fix the matching stale `26` count references in `skills/utility-pm-skill-builder/references/EXAMPLE.md`.
3. Optionally update `implementation-review-request-for-codex.md` status from `Awaiting review` now that this review exists.
