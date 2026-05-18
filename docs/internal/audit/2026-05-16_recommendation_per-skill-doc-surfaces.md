---
title: Recommendation - Per-Skill Documentation Surfaces (skills-ideas vs skills-published vs public docs)
description: Clarifies the role of each per-skill surface in the repo, resolves the contradiction in prior recommendations about whether skills-published should exist, locks in a minimal baseline (one job per surface, lazy creation), and provides a phased breakdown of the work to bring the repo to that baseline.
date: 2026-05-16
status: draft for maintainer decision
audience: pm-skills maintainers
type: recommendation + migration playbook (combined)
predecessor: 2026-05-12_recommendation_efforts-operating-model.md (revises D11; supersedes Phase 6 of the playbook)
companions:
  - 2026-05-16_audit_efforts-folder-reaudit.md
  - 2026-05-12_audit_efforts-folder-state.md
---

# Recommendation - Per-Skill Documentation Surfaces

**Date**: 2026-05-16
**Reads from**: the 2026-05-16 reaudit findings (15 new shipped skills, 0 new effort briefs, 3 stale `skills-ideas/` folders)
**Resolves**: the contradiction across my 2026-05-16 responses about whether `skills-published/` should exist
**Locks**: a single, minimal baseline for per-skill internal docs
**Includes**: detailed migration plan to bring the repo to that baseline (§5)

## 1. Resolution: what `skills-published/` is for

In two earlier responses I gave conflicting recommendations:
- First: "skills-published is mostly redundant with GH issues + HISTORY.md"
- Then: "lazy backlog.md per skill, created when there is at least one item"

Both were partly right. The clean position is:

**`skills-published/{name}/backlog.md` exists as a maintainer's pre-issue notebook. It is the only artifact in the folder. Most skills will never have one. It is created the first time you have a bullet to record for that skill, not before.**

What this is NOT:
- Not a changelog. HISTORY.md (public, per-skill) covers that.
- Not a place for design rationale. Release plans and audits cover cross-cycle rationale; HISTORY entries cover per-version rationale.
- Not a parallel to GH issues. Issues are for committed work; the notebook is for pre-commitment thoughts.
- Not pre-scaffolded. Empty folders are an anti-pattern (see §2).

**One artifact, one purpose**: the unstructured pre-issue bullet list. That is the entire reason this folder exists.

## 2. Why lazy creation is the load-bearing rule

The single rule that prevents `skills-published/` from becoming the next drift signal:

> A `skills-published/{name}/` folder exists if and only if the skill has at least one backlog item recorded. Empty folders are never created.

This rule mirrors the existing convention for `skills/{name}/HISTORY.md`: HISTORY does not exist for a skill until the skill ships its second version. The folder follows the same lazy-creation principle.

What this prevents:
- 55 mostly-empty folders that produce visual noise
- Pre-creation forcing the maintainer to invent backlog items to justify the folder
- A `ls docs/internal/skills-published/` that looks identical for "active iteration thinking" and "I made this folder for some reason"

What it implies:
- After 6 months, `ls docs/internal/skills-published/` shows 5-15 folders for skills with real iteration thinking. The other 40+ skills have nothing here. That ratio is honest.
- A reader can trust that an existing folder means content exists and a missing folder means no thinking is captured.

## 3. The three per-skill surfaces, fully separated

[Definitive table; supersedes any conflicting table in prior recommendation docs]

| Surface | Lifecycle stage | Public? | Lazy? | Lives at |
|---------|-----------------|---------|-------|----------|
| `docs/internal/skills-ideas/{slug}/` | Discovery and scoping, pre-ship | Internal | Yes | One folder per active discovery |
| `docs/internal/skills-published/{name}/backlog.md` | Post-ship maintainer notebook | Internal | Yes | One file per skill with content |
| `skills/{name}/` plus public docs | Shipped skill | Public | n/a (skill exists or it doesn't) | The canonical skill |

### 3.1 `docs/internal/skills-ideas/{slug}/`

**One job**: capture discovery work for a skill that does not yet exist.

**Contents**:
- `idea.md` (tracked): short scope sketch. Frontmatter: name, slug, status, last-updated. Body: Problem, Proposed scope, Open questions, Links. Target 50-150 lines.
- `_LOCAL/` (gitignored): discovery research, deep-research outputs, approach drafts, working notes. No size limit.
- Optional `spec.md` (tracked) when scope locks but before the skill ships, IF the spec is durable enough to outlive the release plan.

**Lifecycle**: the folder exists while the skill is in discovery or scoping. When the skill ships:
- Either move the folder to `skills-ideas/_archive/{slug}/` (the SKILL.md captures everything that matters)
- Or migrate any durable rationale to `skills-published/{name}/backlog.md` and then archive the discovery folder

**The current state is wrong**: all 3 folders (okr-writer, foundation-sprint, design-sprint) contain shipped skills. They should have been archived at ship. Migration in §5.

### 3.2 `docs/internal/skills-published/{name}/backlog.md`

**One job**: capture pre-issue thoughts for a shipped skill.

**Contents**: a single `backlog.md`. Flat bullet list. No frontmatter. No schema. No other files in the folder.

**Format**:

```markdown
# foundation-lean-canvas - backlog

- A3 portrait support for HTML template. Someone asked. Not sure if worth it.
- Mode hint for stress-testing existing canvas vs proposing new one. Maybe v1.2.
- Block-level confidence color treatment could be more discoverable.
- Bug seen once: visual mode crashed when product name had a slash. Cannot reproduce.
```

**Lifecycle**:
- File created the first time you have a bullet to record for that skill
- Bullets added during use
- Bullets promoted to GH issues when ready to be real work (then deleted from backlog.md)
- Bullets pruned when no longer relevant
- File deleted when no bullets remain after a cleanup (the empty parent folder is also deleted)

**What this is NOT**:
- Not a changelog (HISTORY.md is, public)
- Not a place for committed work (GH issues are)
- Not a place for design rationale of large decisions (release plans / audits are)

### 3.3 `skills/{name}/` plus public docs

**One job**: be the source of truth for the skill. Anything that can be public should be here.

**Per-skill public contents**:

| File | Purpose |
|------|---------|
| `skills/{name}/SKILL.md` | Canonical instructions (frontmatter + body) |
| `skills/{name}/references/TEMPLATE.md` | Output contract |
| `skills/{name}/references/EXAMPLE.md` | Worked example |
| `skills/{name}/HISTORY.md` | Per-skill version log (exists once skill is at v1.1+) |
| `skills/{name}/references/*` | Any additional reference files (e.g., html-template.html) |
| `commands/{name}.md` | Slash command file |
| `docs/skills/{phase}/{name}.md` | Auto-generated Starlight site page |
| `library/skill-output-samples/{name}/sample_*.md` | 2-3 samples across threads |
| `docs/reference/skill-families/{family}-contract.md` | Family contract (for family members only) |
| `docs/guides/using-{name}.md` | End-user how-to (for skills warranting one) |
| `docs/concepts/{topic}.md` | Methodology background (for family-anchor concepts) |

**Rule**: if content can fit one of these public surfaces, it goes there. Internal surfaces only exist for content that has no public home.

## 4. What goes where: the decision matrix

When you have a thought, observation, or piece of content for or about a specific skill, this table tells you where it belongs. The same table reveals which content does NOT need a new home (it has one already).

| Content | Lives at | Why |
|---------|----------|-----|
| What does this skill do? | `skills/{name}/SKILL.md` | Canonical public spec |
| What does the output look like? | `skills/{name}/references/EXAMPLE.md` + `library/skill-output-samples/{name}/` | Public worked artifacts |
| What is the output contract? | `skills/{name}/references/TEMPLATE.md` | Public contract |
| What shipped in v1.2.0? | `skills/{name}/HISTORY.md` | Public per-skill changelog |
| What is currently being worked on for next version? | GH issue with `Skill name` field, on the Project board | Canonical work surface |
| Bug report from a user | GH issue with `bug` label | Public issue tracker |
| Vague idea for a future version | `skills-published/{name}/backlog.md` bullet | Pre-issue notebook, lazy file |
| "Someone asked, not sure if worth" | `skills-published/{name}/backlog.md` bullet | Same |
| "Bug seen once, cannot reproduce" | `skills-published/{name}/backlog.md` bullet | Same; promote to GH issue if reproduced |
| Architectural rationale for a large decision in this version | `skills/{name}/HISTORY.md` entry (1-2 sentences) plus the release plan if cycle-bound | Public version log + release plan |
| Architectural rationale that spans multiple skills | An audit doc or release plan | Cross-skill artifacts |
| Pre-ship research (Gemini deep research, books, URLs) | `skills-ideas/{slug}/_LOCAL/` (gitignored) | Internal discovery; archive after ship |
| Pre-ship scope sketch | `skills-ideas/{slug}/idea.md` | Internal scope until ship; archive after ship |
| Pre-ship spec (durable beyond release plan) | `skills-ideas/{slug}/spec.md` (optional) | Internal spec; move to release plan if release-bound |
| Cycle-bound execution plan | `docs/internal/release-plans/vX.Y.Z/...` | Existing release-plan convention |
| Family contract | `docs/reference/skill-families/{family}-contract.md` | Public family spec |
| User-facing how-to | `docs/guides/using-{name}.md` | Public guide |
| Methodology / concept background | `docs/concepts/{topic}.md` | Public concept doc |

**Single rule extracted from the table**: every content type has exactly one canonical home. None of them are `docs/internal/efforts/F-XX-*.md` for new work.

## 5. Detailed breakdown: bringing the repo to this baseline

What follows is a phased plan. Each phase is independent and the repo is in a coherent state after any one of them. Total estimated effort: 2-3 hours over 1-2 sessions.

### Phase 1: Lock the convention in writing (30 minutes)

**Prerequisite**: maintainer agreement on §3 and §4 above.

**Tasks**:

1. Write `docs/internal/skills-ideas/README.md` (about 30 lines):
   - Purpose of the folder
   - When to create a `{slug}/` subfolder
   - What goes in `idea.md` (template; reference §3.1)
   - What goes in `_LOCAL/` (gitignored)
   - When to archive (skill ships)

2. Write `docs/internal/skills-published/README.md` (about 30 lines):
   - Purpose of the folder
   - The lazy-creation rule (the load-bearing one)
   - What `backlog.md` looks like (point at the format in §3.2)
   - Promotion rule (when bullet becomes GH issue)
   - Deletion rule (when bullet is gone, when file is gone)

3. Update `docs/internal/efforts/README.md` (about 5 lines added):
   - Banner at top: "This folder is historical archive. New per-skill work goes to `skills-ideas/`, `skills-published/`, or GH issues. See `docs/internal/audit/2026-05-16_recommendation_per-skill-doc-surfaces.md`."

4. Update `docs/internal/audit/README.md` (about 5 lines edited, line 65 and line 71-77):
   - Line 65 statement that "per-skill work uses an effort doc" is no longer true; replace with the new convention pointing at `skills-ideas/` and `skills-published/`.
   - Lines 71-77 about deferred naming convention; canonicalize date-first prefix per `9006905` rename.

**After-state check**: a fresh reader can read the 4 READMEs and know exactly where any per-skill content belongs.

**Rollback**: `git revert` the commit. Pure text changes.

### Phase 2: Archive the 3 stale skills-ideas folders (15 minutes)

**Prerequisite**: Phase 1 done so the convention is locked.

**Tasks**:

1. Create `docs/internal/skills-ideas/_archive/` directory.
2. Move `docs/internal/skills-ideas/okr-writer/` to `docs/internal/skills-ideas/_archive/okr-writer/`. The skill shipped in v2.12.0; the discovery folder is now archive.
3. Move `docs/internal/skills-ideas/foundation-sprint/` to `docs/internal/skills-ideas/_archive/foundation-sprint/`. Skills shipped in v2.15.0.
4. Move `docs/internal/skills-ideas/design-sprint/` to `docs/internal/skills-ideas/_archive/design-sprint/`. Skills shipped in v2.15.0.
5. Add a short note inside each archived folder (or update the existing `jpnotes.md`) pointing at the shipped skills: e.g., `_archive/foundation-sprint/README.md` says "Shipped as tool-foundation-sprint-* family in v2.15.0. See skills/tool-foundation-sprint-{readiness,basics,brief,...}/ for canonical."
6. Single commit: `chore(skills-ideas): archive 3 folders for skills that have shipped`.

**After-state check**: `ls docs/internal/skills-ideas/` shows only `_archive/` and `README.md` (no active discovery in flight). When a new discovery starts, the folder reappears.

**Rollback**: `git revert`. Folders move back. No data loss.

### Phase 3: Sweep stale effort briefs (30 minutes)

**Prerequisite**: independent of Phases 1-2; can be done at any time.

**Tasks**: per `2026-05-12_playbook_efforts-migration.md` Phase 2, with the addition of F-41 and F-42 which transitioned to stale-shipped on 2026-05-16.

Stale briefs to sweep (15 total):
- 13 from the predecessor audit: F-13, F-17, F-18, F-24, F-25, F-26, F-27, F-28, M-13, M-19, M-20, M-22, D-05
- 2 new since predecessor: F-41 (design-sprint-skills), F-42 (foundation-sprint-skills)

For each:
1. Edit frontmatter: `Status:` to `shipped`, set `Release:` to the actual shipped version
2. Append a one-line `## Migration note (2026-05-16)` pointing at the canonical post-ship surface

Single commit: `chore(efforts): one-time status-sweep on 15 stale shipped briefs`.

**After-state check**: `grep -l "^Status: Backlog\|^Status: In Progress\|^Status: Active\|^Status: Ready" docs/internal/efforts/*.md` returns only items that are genuinely open backlog (F-07, F-08, F-09, F-12, F-14, F-15, F-37, F-38, F-39, F-40, M-14, M-15, M-21, F-03).

**Rollback**: `git revert`.

### Phase 4: GH Issues + Project board minimum viable setup (45 minutes)

**Prerequisite**: independent. This is where D3 + D4 from the 2026-05-12 recommendation get adopted.

**Tasks**:

1. On the "Product on Purpose" GitHub Project, add custom fields:
   - `Status` (single-select): `Idea`, `Scoped`, `Ready`, `In Progress`, `In Review`, `Shipped`, `Cancelled`
   - `Skill name` (text): so issues for iteration on a shipped skill can be filtered by skill
   - `Component` (single-select): `meeting-skills`, `sprint-skills`, `sample-automation`, `lifecycle-tools`, `discoverability`, `mcp`, `ci-validation`, `release-tooling`, `governance`
   - `Priority` (single-select): `P0`, `P1`, `P2`, `P3`

2. Add views:
   - Kanban by Status (all open)
   - By Component (all)
   - By Skill name (all open with non-empty Skill name)

3. Backfill: every currently open issue gets added to the board with Status and Component filled. About 20 issues, ~1 min each.

4. Create milestones on GitHub for any in-flight release (v2.16.0). Attach v2.16-targeted issues.

5. Close the stale v2.7.0 milestone after retargeting or closing issue #109.

**After-state check**: opening the Project board shows every active piece of work in one view. Filtering by Skill name returns the iteration backlog for that skill (initially small or empty, grows over time).

**Rollback**: Project custom fields can be removed; issue field values are dropped. Issues themselves are unaffected.

### Phase 5: Initialize skills-published for skills with known iteration thinking (30 minutes, optional)

**Prerequisite**: Phase 1 done; convention is locked.

**Tasks**: scan your own memory: which of the 55 shipped skills have at least one backlog thought you would lose if you do not write it down now? Probably 3-8 skills.

For each:
1. Create `docs/internal/skills-published/{name}/backlog.md`.
2. Write the bullets. Each bullet should follow the format in §3.2.
3. Single commit: `docs(skills-published): seed backlogs for {N} skills with known iteration thinking`.

**Do not create folders for skills with no current backlog.** Wait for the next "I just thought of something" moment.

**After-state check**: `ls docs/internal/skills-published/` shows folders only for the skills you actually have thoughts about. The other 47+ skills have no folder, which is correct.

**Rollback**: delete the folders. The bullets you wrote are lost unless you preserve them.

### Phase 6: Verify and document the baseline (15 minutes)

**Prerequisite**: Phases 1-5 (or whatever subset you adopted).

**Tasks**:

1. Run a verification:
   - `ls docs/internal/skills-ideas/` shows `_archive/`, `README.md`, and any actively-in-discovery folders (likely none today).
   - `ls docs/internal/skills-published/` shows the small number of folders for skills with known backlog (likely 3-8).
   - `grep -l "^Status: Backlog\|^Status: In Progress\|^Status: Active\|^Status: Ready" docs/internal/efforts/*.md` returns only genuinely open backlog items.
   - The Project board is populated.
   - All 4 READMEs (skills-ideas, skills-published, efforts, audit) reflect the new convention.

2. Add a one-line note to `MEMORY.md` capturing the baseline: "Per-skill internal docs: `skills-ideas/{slug}/` for active discovery (archive after ship); `skills-published/{name}/backlog.md` lazy per-skill backlog (pre-issue notebook only)."

3. Decide whether to write a short blog-style note in `AGENTS/DECISIONS.md` recording the convention adoption (optional, useful if pm-skills ever gains a co-maintainer).

**After-state check**: a maintainer 3 months from now reading the audit folder + the 4 READMEs can answer "where does X go?" for any per-skill content in one minute.

**Rollback**: text changes; `git revert`.

## 6. Effort summary

| Phase | Time | Required? | Independent? |
|-------|------|-----------|---------------|
| Phase 1: Convention READMEs | 30 min | Yes | Yes (foundation for the rest) |
| Phase 2: Archive 3 stale ideas folders | 15 min | Yes | After Phase 1 |
| Phase 3: Stale-brief sweep in efforts/ | 30 min | Yes | Yes |
| Phase 4: GH Project board setup | 45 min | Yes (to make GH usable as the workflow surface) | Yes |
| Phase 5: Seed skills-published with current thinking | 30 min | Optional | After Phase 1 |
| Phase 6: Verify and document baseline | 15 min | Yes | After all others |
| **Total upfront** | **~2.5 to 3 hours** | | |

Can be done in 1-2 sessions.

## 7. After-baseline operating model (so you know what you are committing to)

Once the migration above is complete, the daily / weekly operating model becomes:

**Daily, while working**:
- Idea for a new skill → start `docs/internal/skills-ideas/{slug}/idea.md` and `_LOCAL/`
- Thought for an existing skill → add a bullet to `docs/internal/skills-published/{name}/backlog.md` (create file if first)
- Real work, committed to a release → open a GH issue, add to Project board with Skill name and Component

**Weekly, before a release cut**:
- Scan `skills-published/{name}/backlog.md` for skills you are touching this release
- Promote bullets that are ready → GH issue
- Prune bullets that are no longer relevant
- Update the release plan in `release-plans/vX.Y.Z/` per existing convention

**Per-ship**:
- Skill ships → update HISTORY.md (public)
- If the skill was in `skills-ideas/{slug}/`, archive that folder to `_archive/`
- If the skill has notable iteration thoughts during the cycle, capture them in `skills-published/{name}/backlog.md`
- Close GH issues; update Project board cards to Shipped

**Per-quarter or as needed**:
- Sweep `skills-published/` folders. Files with no remaining bullets → delete (and remove the empty parent folder).
- Sweep `skills-ideas/_archive/` if it grows large. Archived folders with no historical value → delete.

## 8. What is NOT in scope for this recommendation

- Effort briefs in `efforts/`: kept as historical archive after Phase 3 sweep. No restructuring. No `_archive/` subfolder beyond the existing duplicate-ID legacy folders.
- An `initiatives/` folder: deferred. The 2026-05-12 recommendation proposed this for cross-cutting work, but the current release-plans + audit folder convention already absorbs it. Revisit only if a real need surfaces.
- A custom INDEX generator: deferred per the 2026-05-12 anti-recommendation A1. Project board views replace it.
- CI validators for any of the new conventions: deferred per A2. Add later if drift recurs.
- Numbering (F-XX, M-XX) for new work: retired per the 2026-05-12 D5.

## 9. Open questions for maintainer decision

| # | Question | Default | Rationale |
|---|----------|---------|-----------|
| Q1 | Adopt §3 three-surface model with the new clean separation? | Yes | Resolves the contradiction and gives one home per content type |
| Q2 | Archive 3 stale `skills-ideas/` folders (Phase 2)? | Yes | They contain shipped skills; the folder is misnamed |
| Q3 | Sweep stale efforts/ briefs (Phase 3)? | Yes | 15 briefs are demonstrably stale; sweep is mechanical |
| Q4 | Set up Project board with custom fields (Phase 4)? | Yes | Required for GH to be the canonical workflow surface |
| Q5 | Seed `skills-published/` with current thinking (Phase 5)? | Optional | Only if you have thoughts now that would be lost |
| Q6 | Update `audit/README.md` and `efforts/README.md` to reflect new conventions (Phase 1)? | Yes | Closes the doc/practice gap |
| Q7 | Canonicalize date-first naming for audit docs in audit/README? | Yes | Already de facto after commit `9006905` |

## 10. What was wrong in my earlier recommendations

For transparency, since this is the second revision of advice:

1. **In the 2026-05-12 recommendation doc (D11)**, I described `skills-published/{name}/backlog.md` with severity tags (P0/P1/P2), target-version annotations, and GH issue links. That format edges into "structured tracker" territory and competes with GH issues. The simpler bullet format in §3.2 above is better.

2. **In my 2026-05-16 response (first one)**, I said "no backlog.md, GH issues do that." This was too strong. GH issues are the right surface for committed work; a markdown notebook is the right surface for pre-commitment thoughts. Both have a place.

3. **In my 2026-05-12 recommendation doc (D2)**, I listed `decisions.md`, `notes_{date}.md` etc. as possible artifacts in `skills-published/{name}/`. That bloats the surface. The clean answer is one file (`backlog.md`) and one purpose.

4. **In the 2026-05-12 playbook Phase 6**, I described "lazy `skills-published/` scaffolding" but the rule was loose. The strict version of the rule (§2 above) is: never pre-create an empty folder, ever.

The convention in this doc supersedes those. The 2026-05-12 audit doc (factual inventory) remains unchanged.

End of recommendation.
