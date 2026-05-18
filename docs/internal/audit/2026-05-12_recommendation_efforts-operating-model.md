---
title: Recommendation - Operating Model for pm-skills Work Tracking
description: Proposed operating model to address the drift documented in audit_efforts-folder-state_2026-05-12.md. Each recommendation is presented as a structured block with explicit Value, Cost, and Skip-cost fields so the maintainer can accept, reject, or hybrid each piece independently.
date: 2026-05-12
status: draft for maintainer decision
audience: pm-skills maintainers
companions:
  - audit_efforts-folder-state_2026-05-12.md
  - playbook_efforts-migration_2026-05-12.md
---

# Recommendation - Operating Model for pm-skills Work Tracking

**Date**: 2026-05-12
**Reads from**: `audit_efforts-folder-state_2026-05-12.md` (the verified inventory)
**Hands off to**: `playbook_efforts-migration_2026-05-12.md` (executes the accepted decisions)
**Status**: draft. None of this is committed yet. Each block below is a separate yes/no/hybrid question for you.

## How to read this doc

Every recommendation below uses the same schema. You can skim Default and Confidence rows to triage quickly; read Value / Cost / Skip-cost when a recommendation isn't obvious.

```
**Classification**:  Opinion | Inference | Derived
                     (Opinion = my synthesis. Inference = best read of evidence.
                      Derived = directly computed from the audit.)
**Confidence**:      High | Medium | Low
**Value to you**:    Specific things that become possible or faster
**Cost to adopt**:   Time, churn, link breakage if applicable
**Skip cost**:       What you keep paying if you don't adopt
**Alternatives**:    Other shapes the answer could take
**Default**:         My recommended choice
```

At the very end, §13 has a one-page decision table you can fill in.

---

## D1. Stop treating `docs/internal/efforts/` as an active-work surface

**Classification**: Inference
**Confidence**: High

**Statement**: Retire `docs/internal/efforts/` from the role of "where new work is captured and updated". Use it only as historical archive. New work lands in one of three other folders described in D2.

**Value to you**:
- The most acute pain in the audit goes away. You stop carrying the cognitive cost of "I should update that brief field" for work that has already shipped.
- Future you in 3 months can read any brief in `efforts/` and trust it as a point-in-time snapshot, not a "maybe still relevant" doc that requires verification.
- The 11 stale-shipped briefs (per audit §2.4) stop accruing more drift.

**Cost to adopt**:
- One-time sweep to mark the stale briefs as `shipped` (about 30-45 min).
- Update `efforts/README.md` to point new readers at the new homes.
- No file moves required.

**Skip cost**:
- The audit's drift table grows. By the time you have 60 briefs, the noise-to-signal ratio in this folder is dominant.
- Every effort-brief-related decision in future planning sessions costs verification time ("does this brief still mean what it says?").

**Alternatives**:
- **A (default)**: Retire as recommended. New work goes elsewhere (D2 below).
- **B**: Keep using `efforts/` but enforce maintenance with a CI validator that fails on stale `Status:` when a matching `skills/{name}/` exists. Higher per-PR friction. Restores discipline but doesn't fix the format-creep problem (audit §10 symptom 8).
- **C**: Do nothing. Folder continues to drift; readers learn to skim briefs as historical text and check `skills/` for ground truth.

**Default**: A.

---

## D2. Adopt three durable surfaces, each with one job

**Classification**: Opinion (synthesis)
**Confidence**: Medium

**Statement**: Use three folders for durable work artifacts. Each has one purpose and one lifecycle.

| Folder | One job | Lifecycle |
|--------|---------|-----------|
| `docs/internal/skills-ideas/{slug}/` | Capture a candidate skill during discovery and scoping | Until the skill ships its first version |
| `docs/internal/skills-published/{slug}/` | Capture post-ship iteration backlog for a shipped skill | Forever; backlog grows and shrinks |
| `docs/internal/initiatives/{slug}/` | Capture cross-cutting work (families, infrastructure, CI, releases) | Until the initiative ships or is cancelled |

`skills-ideas/` and `skills-published/` already exist in the repo (audit §7). `initiatives/` would be new.

**Value to you**:
- Every artifact has one home that matches its lifecycle. Today, `efforts/` is the bucket for everything not-yet-a-release-plan, which is too broad.
- A glance at the folder name tells you the lifecycle stage (idea, shipped-with-backlog, cross-cutting).
- The okr-writer model already validated `skills-ideas/` works for a real skill end-to-end.
- The meeting-skills-family pattern already validated initiative folders work.
- Removes the discovery-vs-iteration conflation that the audit's drift signals point at.

**Cost to adopt**:
- Create `initiatives/` directory (trivial).
- Decide per-effort where each new piece of work belongs. About 1-2 minutes of decision per new item.
- Light convention doc in each of the three folders' READMEs (about 30 minutes to author once).
- Migration of the existing 13 stale shipped briefs and the 3 initiative folders is in the playbook; estimate 2-3 hours.

**Skip cost**:
- `efforts/` continues to absorb all kinds of work without distinguishing them.
- The user's intuition (your "I might separate ideas vs published") never gets resolved.
- The v2.15.0-style triple-tracking (effort stub + initiative folder + release-plan integration plan) recurs every initiative.

**Alternatives**:
- **A (default)**: Three surfaces as above.
- **B**: Two surfaces only (`skills-ideas/` + `skills-published/`). No `initiatives/`. Cross-cutting work goes back to `efforts/` or directly to release-plans. Simpler, but leaves cross-cutting initiatives without a clean home. Meeting-skills-family-style work still tracked ad-hoc.
- **C**: One surface (`skills/{name}/.work/`) per skill, embedded in the skill folder itself. Co-locates work tracking with the skill but mixes user-facing skill artifacts with internal tracking. Recommend against because `skills/` ships to consumers.
- **D**: No new folders. Keep `efforts/` but adopt status-enum + components + INDEX.md (the 2026-04-18 Bundle 1). Restores discipline but doesn't fix conflation.

**Default**: A.

---

## D3. Promote GitHub Issues to the canonical workflow surface

**Classification**: Inference
**Confidence**: High

**Statement**: All active workflow state (priority, assignment, in-progress, blocked, milestone) lives in GitHub Issues. Markdown docs are durable scope. Doc frontmatter no longer attempts to mirror lifecycle state.

**Value to you**:
- The drift between brief Status and reality (audit §2.4: 24% of briefs stale) becomes structurally impossible because the brief no longer claims to track Status.
- One canonical place to check "what is open and assigned to me" via existing GH issue queries.
- The 30 `Issue: TBD` cases (audit §3) become "open an issue when work starts" instead of "fill in this field someday".
- Existing label taxonomy (audit §8.1: `effort`, `skill`, `agent:claude`, etc.) is well-formed and already wired up; reusing it is free.
- Closing an issue is the canonical "shipped" signal. No frontmatter sweep needed.

**Cost to adopt**:
- One issue per active or upcoming effort. About 1 minute per new issue.
- Backfill of issues for the 6 new-wave briefs (F-37 through F-42). About 30 min.
- Light habit: when starting work, open or update the issue. This is muscle memory you may already have for some efforts.

**Skip cost**:
- The `Issue: TBD` count grows. You continue to discover state by reading multiple markdown files.
- GH labels stay underused. The Project board (D4) becomes empty/incomplete.
- "What am I doing this week" remains a question only the maintainer's local memory can answer.

**Alternatives**:
- **A (default)**: GH Issues + light doc references.
- **B**: GH Issues for some efforts, doc-only for others. Today's hybrid, which produces the audit's drift.
- **C**: External tracker (Linear, Notion). Higher cost, lower fit (no integration with PRs, no free tier story for OSS).

**Default**: A.

---

## D4. Adopt the GitHub Project board with custom fields

**Classification**: Opinion
**Confidence**: Medium

**Statement**: Use the existing "Product on Purpose" project board with at minimum a Status column and a Component custom field. Add Priority, Agent, and Skill-name fields if they earn their keep after 2-3 weeks of use.

**Value to you**:
- A single visual board where you see what is in flight across all open issues.
- Component grouping answers "what is the state of meeting-skills?" or "what is in flight for ci-validation?" without reading multiple files.
- Status changes ("Ready", "In Progress") are dropdown choices, not text edits in multiple places.
- This is the closest thing to a Jira/Linear experience available natively in GitHub at no cost.

**Cost to adopt**:
- About 30 min to add custom fields and configure 1-3 views.
- Backfill: drag every open issue onto the board and set its Status + Component. About 15 min for ~20 issues.
- Minor ongoing maintenance: set Status when you start work, set to Shipped when you close the issue. GH automations can do this for you.

**Skip cost**:
- "What is the state of meeting-skills" remains a question you answer by reading effort briefs, skill folders, and release plans. Existing state.
- No global view. Each query is a labels-and-issues intersection that doesn't compose well.
- The Project board (which already exists in the org) stays empty/under-used.

**Alternatives**:
- **A (default)**: Adopt Project board with custom fields as described.
- **B**: Use GH Issues + labels only, no Project board. Cheaper but no grouping by Component, no Kanban-style flow view.
- **C**: Use GH Projects but minimally (Status column only, no custom fields). Less leverage but lower setup cost.

**Default**: A or C. B is the audit's status-quo result extrapolated, which we're trying to escape.

---

## D5. Retire F-XX / M-XX / D-XX numbering for new work

**Classification**: Opinion
**Confidence**: Medium

**Statement**: New artifacts under `skills-ideas/`, `skills-published/`, `initiatives/` use slug-based folder and file names. F-XX / M-XX / D-XX numbering is preserved on existing briefs in `efforts/` (don't rename history) but is not assigned to new work.

**Value to you**:
- Slugs are self-describing. `skills-ideas/release/idea.md` tells you what it is without a lookup; `F-38-release-skill.md` requires you to remember what F-38 was.
- No numbering counter to maintain.
- File paths stay stable across renames because they encode meaning, not arbitrary IDs.
- GitHub issue numbers already provide global monotonic IDs for cross-reference where one is needed.

**Cost to adopt**:
- None at the moment of the decision. New artifacts simply skip the numbering convention.
- A note in the new READMEs documenting the convention.

**Skip cost**:
- Continue assigning F-43, F-44, M-25 etc. on top of work that may not need an ID.
- Two parallel naming conventions persist (numbered legacy + slug new).
- New efforts continue to need a "what number should this be" decision before they get a file.

**Alternatives**:
- **A (default)**: Slug-based for new work; preserve numbering on legacy.
- **B**: Continue numbering but switch to per-surface counters (sprint-skills-001, ci-validation-003 etc.). Avoids global counter but adds per-surface tracking burden.
- **C**: Keep global F-XX numbering for new work too. Status quo. Loses nothing but gains nothing.

**Default**: A.

---

## D6. Status enum: minimal, advisory, not CI-enforced (yet)

**Classification**: Opinion
**Confidence**: Medium

**Statement**: Document a 5-value status enum for documents that still carry a Status field (mostly idea.md and initiative READMEs). Do not add CI enforcement. Treat the enum as advisory.

| Value | Meaning |
|-------|---------|
| `draft` | Doc exists but content is provisional |
| `active` | Work is in flight (GH issue is open and in In Progress) |
| `shipped` | Work has shipped to main (GH issue is closed) |
| `cancelled` | Will not ship |
| `superseded` | Replaced by a different idea or initiative |

**Value to you**:
- 5 values cover every state in your repo today (audit §4 listed 12 in use). Closes the drift.
- "Advisory not enforced" means you don't have to backfill correctness on legacy efforts to land the change.
- A reader knows what to look for.

**Cost to adopt**:
- One line in each new doc's frontmatter.
- README documentation of the values.

**Skip cost**:
- Status field continues to use the 12-value sprawl. No structural problem; minor reader friction.

**Alternatives**:
- **A (default)**: Adopt advisory enum; document it; don't enforce.
- **B**: Add CI enforcement via a validator. Higher confidence in correctness; higher friction.
- **C**: Drop the Status field entirely from new docs. Rely on GH issue state instead. Simpler. Loses the "what does this doc itself think it represents" hint.

**Default**: A. Reconsider B if drift recurs after 3+ months of advisory.

---

## D7. Component taxonomy: 8 components, applied as a Project custom field

**Classification**: Opinion (the specific list)
**Confidence**: Medium

**Statement**: Define 8 components as values for the Project board's Component custom field. Tag every issue with one (or, rarely, two) components.

| Component | Scope |
|-----------|-------|
| `meeting-skills` | Foundation meeting family + workflow + adoption |
| `sprint-skills` | Foundation Sprint and Design Sprint families |
| `sample-automation` | Sample generation, standards, validation, regeneration |
| `lifecycle-tools` | utility-pm-skill-builder / validate / iterate / update |
| `discoverability` | find-skills audit, description optimization, skills.sh |
| `mcp` | pm-skills-mcp work |
| `ci-validation` | CI scripts and validators |
| `release-tooling` | /pm-release skill, release-please, automation |

**Value to you**:
- One filter answers "what's the state of meeting-skills?".
- Components persist across efforts and across releases, unlike milestones (which are release-bound).
- The Project board's "By Component" view becomes useful immediately.

**Cost to adopt**:
- 5 min to add the field.
- 15 min to tag existing open issues.

**Skip cost**:
- "What's the state of X" remains a multi-file question.

**Alternatives**:
- **A (default)**: 8 components as listed.
- **B**: Fewer components (4-5) with broader scope. Easier to tag but less useful for queries.
- **C**: More components (12-15) with narrower scope. More queryable but proliferation risk.
- **D**: Use the existing Triple Diamond phases (`discover`, `define`, etc.) as components. Mismatch: phase is a per-skill classification, not a per-effort grouping.

**Default**: A. List is a proposal, not a committed taxonomy; treat names as editable.

---

## D8. How to handle the 13 stale shipped briefs

**Classification**: Derived (from audit §2.4)
**Confidence**: High (that something must happen; medium on the specific approach)

**Statement**: One-time sweep that does two things to each stale brief: (1) update `Status:` to `shipped`, (2) append a 1-line `Migration note:` pointing readers at the new home (skill folder, initiative folder, or HISTORY.md).

**Value to you**:
- Folder listing accurately reflects state after the sweep.
- Inbound URLs (release plans linking to briefs) still work because no files move.
- Future readers know not to bother with the brief; they see the migration pointer.

**Cost to adopt**:
- About 20 min of mechanical edits (13 files, 2 edits each).
- No CI changes.

**Skip cost**:
- The 11+ stale briefs continue to mislead readers.
- Future cleanups become harder as more stale briefs accumulate.

**Alternatives**:
- **A (default)**: Status sweep + migration note as described.
- **B**: Move stale briefs to `efforts/_archived/` subfolder. Cleaner folder root but breaks inbound URLs from release plans.
- **C**: Delete stale briefs. Strongest decluttering but loses historical record.

**Default**: A. URL stability matters more than folder hygiene.

---

## D9. How to handle the v2.15.0 triple-tracking

**Classification**: Derived (from audit §5.3, §10 symptom 10)
**Confidence**: High

**Statement**: Pick one home for v2.15.0 sprint work. The release-plans/v2.15.0/ integration plans are where execution is actively happening (per MEMORY.md "active work" notes). Make those canonical for execution. Move the design specs from `efforts/foundation-sprint-skills/` and `efforts/design-sprint-skills/` to `initiatives/sprint-skills/{foundation,design}/`. Mark F-41 and F-42 brief stubs as superseded with pointers to both new homes.

**Value to you**:
- Stops the 3-place tracking immediately.
- Architectural decisions (specs, concept docs) live in `initiatives/sprint-skills/` and outlive any single release.
- Execution lives in release-plans, scoped to a release.
- Brief stubs (F-41, F-42) carry a one-line breadcrumb for anyone who searches by ID.

**Cost to adopt**:
- About 20 min to move the two design-spec docs and update internal links.
- No release-plan changes needed.

**Skip cost**:
- Triple-tracking continues for v2.15.0. The next initiative repeats the pattern.

**Alternatives**:
- **A (default)**: Move specs to `initiatives/sprint-skills/`; release-plans owns execution; briefs become breadcrumbs.
- **B**: Leave everything where it is. Three homes per initiative becomes the norm.
- **C**: Collapse everything into release-plans. Loses durable architectural specs that should outlive the v2.15.0 tag.

**Default**: A.

---

## D10. What goes in `skills-ideas/{slug}/idea.md`

**Classification**: Opinion
**Confidence**: Medium

**Statement**: Keep idea briefs short. Target 50-150 lines. The body needs Problem, Proposed scope, Open questions, Links. The frontmatter needs name, slug, status, last-updated. No How It Works section; no Validation section; no Deliverables list. Those are spec / plan concerns and live in `spec.md` or `plan.md` next to the idea when scope is locked.

**Value to you**:
- Stops the brief-format-creep observed in the audit (briefs grew from 30 lines to 200+ lines because they absorbed spec content).
- Each artifact in the idea folder has one job.
- An idea you discover and pause on can fit on one screen for future re-reads.

**Cost to adopt**:
- Light template at `skills-ideas/_TEMPLATE.md` (about 20 min to author).

**Skip cost**:
- New idea briefs grow into spec-shaped docs again. The audit's symptom 8 (subfolder pattern drift) recurs.

**Alternatives**:
- **A (default)**: Short idea brief; separate spec.md / plan.md when scoped.
- **B**: Single big idea brief that grows as scoping progresses. Today's pattern (F-38 to F-42). Reader has to scan a 200-line doc to find current state.

**Default**: A.

---

## D11. What goes in `skills-published/{slug}/backlog.md`

**Classification**: Opinion
**Confidence**: Medium

**Statement**: A flat bullet list of candidate post-ship changes. No frontmatter. No status field. Each bullet has: severity (P0/P1/P2), one-line description, optional target-version, optional GH issue link. Lightweight on purpose.

```
- P1: HTML template doesn't print clean on A3 portrait. v1.1.0 candidate.
- P2: Add "remote sprint" mode hint. No version assigned. Issue: #198
- P3: Consider Storybook-style demo page. Discussion. Issue: none.
```

**Value to you**:
- Captures "this could be better" thoughts at the moment they occur, without forcing them into a heavy effort-brief format.
- Maintainer can scan in 30 seconds and pull the next item.
- Items either turn into GH issues when ready or get pruned during occasional cleanups.

**Cost to adopt**:
- One file per shipped skill, created lazily when there is something to record.
- No CI, no validators, no schema.

**Skip cost**:
- Post-ship iteration items continue to live in your head or in scattered session-log notes. They get lost.
- HISTORY.md exists but is the wrong place for "what's next"; it records what shipped.

**Alternatives**:
- **A (default)**: Flat bullet list per skill.
- **B**: Per-skill GH milestone (e.g., "foundation-lean-canvas v1.1.0"). Heavier. Better for skills with active iteration; overkill for skills with no backlog.
- **C**: Single repo-level `backlog-canonical.md` (today's pattern). Doesn't compose at scale; the audit shows it has already broken.

**Default**: A. Promote a P0/P1 to a GH issue when you actually intend to ship it.

---

## D12. What goes in `initiatives/{slug}/README.md`

**Classification**: Opinion
**Confidence**: Medium

**Statement**: Initiative README has: scope, member skills (links to `skills/`), member initiatives / efforts (links), state ("active" / "shipped" / "paused"), related release plans, related GH issues. Optionally a `spec.md` or `family-contract.md` alongside for durable architectural detail.

**Value to you**:
- One file answers "what is the meeting-skills initiative right now?".
- Durable home for family contracts and cross-skill architectural decisions.
- Doesn't compete with release-plans (which scope to a release); the initiative outlives any release.

**Cost to adopt**:
- One file per initiative when created.
- Template at `initiatives/_TEMPLATE.md` (about 20 min).

**Skip cost**:
- Cross-cutting work continues to be tracked ad-hoc.
- The meeting-skills-family/ pattern (which works) is not generalized; the next family reinvents tracking.

**Alternatives**:
- **A (default)**: Initiative folder with README + optional spec/contract.
- **B**: Initiative as a `_TOPIC.md` at folder root. Lighter; loses room for multiple artifacts.

**Default**: A.

---

## A1. Anti-recommendation: do NOT build a custom INDEX.md generator yet

**Classification**: Opinion
**Confidence**: High (on the timing; medium on whether to ever build it)

**Why this is an anti-recommendation**: The 2026-04-18 design doc proposed a generated INDEX.md scanning frontmatter and rendering tables. It is tempting because it would surface the audit's drift signals automatically. But:

- Adoption of D2-D4 already gives you most of the visibility (GH Project board + Component grouping).
- Building the generator is a 2-3 hour project that becomes load-bearing infrastructure.
- If the new model fails to take hold, the generator is dead code.

**Defer until**: 3 months of using D2-D4 has passed and you have observed a specific class of query that the Project board cannot answer.

---

## A2. Anti-recommendation: do NOT add CI validators for status enum or doc-pairing yet

**Classification**: Opinion
**Confidence**: High

**Why this is an anti-recommendation**: Validators are forcing functions for behavior you want to enforce. The audit shows the existing system has no enforcement and produces drift. The natural inclination is "add more enforcement." But:

- The validators only help if the model they enforce is right. We are proposing a new model. Validate after the model is proven to work.
- Validators raise per-PR friction, which is more annoying when you are also adopting new conventions.
- The new model uses GH issues as the primary state, which is self-validating (open or closed).

**Defer until**: D2-D4 have been in use long enough to know which classes of drift actually recur. Then build the targeted validator.

---

## A3. Anti-recommendation: do NOT move existing files (preserve URLs)

**Classification**: Derived (from audit observations about cross-doc linking)
**Confidence**: High

**Why this is an anti-recommendation**: Tempting to move all 11 stale briefs to `efforts/_archived/`, or migrate them to `skills-published/`. Tempting but:

- Release plans link to briefs by path.
- Session logs and CHANGELOG entries link to briefs by path.
- Inbound links from external readers (GH search, bookmarks) link to briefs by path.

Per D8, the sweep should update frontmatter in place; not move files.

**Exception**: the two duplicate-ID folders (`F-17-meeting-synthesis/`, `F-18-meeting-prep/`) are clear archive candidates because the rename is already documented in the current brief headers. Move those to `efforts/_archived_renamed/` or similar.

---

## A4. Anti-recommendation: do NOT migrate to Linear, Jira, Notion, or another external tracker

**Classification**: Opinion
**Confidence**: High

**Why this is an anti-recommendation**: External trackers solve coordination problems for teams. pm-skills has one maintainer. The cost of an external tracker (subscription, integration, context-switching, lock-in) exceeds the value at this scale. GH Issues + Projects covers the same use cases with zero cost and tight integration to the repo.

**Reconsider if**: pm-skills gains 2+ regular maintainers OR a corporate sponsor brings their own tracker as a constraint.

---

## A5. Anti-recommendation: do NOT add per-version subfolders inside `skills-published/{name}/`

**Classification**: Opinion
**Confidence**: Medium

**Why this is an anti-recommendation**: The user's original sketch mentioned versioned subfolders (`skills-published/{name}/v1.0/`, `v1.1/`). Tempting but:

- Per-skill version history already lives in `skills/{name}/HISTORY.md`.
- A flat `backlog.md` is easier to scan than a tree of empty per-version folders.
- Most v1.1, v1.2 backlogs are short bullet lists, not folders worth of artifacts.

**If a specific upgrade gets large** (e.g., foundation-lean-canvas v2.0 with a major rework), promote it to an `initiatives/{name}-v2.0/` folder rather than a subfolder of `skills-published/`.

---

## 13. Decision summary table

Use this to triage. Each row is one yes/no/hybrid decision.

| # | Decision | Default | Your call |
|---|----------|---------|-----------|
| D1 | Retire `efforts/` as active-work surface | Yes | _____ |
| D2 | Adopt three-surface model (`skills-ideas/`, `skills-published/`, `initiatives/`) | Yes | _____ |
| D3 | GitHub Issues = canonical workflow state | Yes | _____ |
| D4 | Adopt Project board with custom fields | Yes (or C: minimal) | _____ |
| D5 | Retire F-XX numbering for new work | Yes | _____ |
| D6 | 5-value advisory status enum | Yes | _____ |
| D7 | Component taxonomy (8 components proposed) | Edit list, then yes | _____ |
| D8 | Stale-brief sweep: in-place status fix + migration note | Yes | _____ |
| D9 | Collapse v2.15.0 triple-tracking to one home | Yes | _____ |
| D10 | Short `idea.md` (50-150 lines) per ideas folder | Yes | _____ |
| D11 | Lightweight `backlog.md` per published skill | Yes | _____ |
| D12 | Initiative folder with README + optional contract/spec | Yes | _____ |
| A1 | NOT build INDEX generator yet | Yes (defer) | _____ |
| A2 | NOT add CI validators yet | Yes (defer) | _____ |
| A3 | NOT move existing files | Yes (preserve URLs) | _____ |
| A4 | NOT adopt external tracker | Yes | _____ |
| A5 | NOT add per-version subfolders | Yes | _____ |

Mark each row Y / N / H (hybrid) plus any notes. The playbook in `playbook_efforts-migration_2026-05-12.md` executes whatever you approve.

## 14. What is opinion vs derived (transparency)

For the maintainer's calibration:

**Strongly derived from audit (high confidence)**:
- D1 (retire efforts/ as active surface): the audit shows 24% staleness, 65% Issue:TBD, format creep, and that the maintainer has already stopped using the model for v2.15.0. Direction is clear.
- D8 (stale-brief sweep): mechanical cleanup of identified drift.
- D9 (collapse v2.15.0 triple-tracking): directly addresses audit §5.3 finding.

**Inferred from audit (medium confidence)**:
- D3 (GH Issues as canonical): the 30/46 `Issue: TBD` ratio shows the handshake is broken; adopting GH Issues fixes the source.
- D7 (8 components): component count is a judgment call; the principle is supported by industry references (tracking-patterns doc §4.6).

**Opinion / synthesis (variable confidence)**:
- D2 (three-surface model): builds on observed `skills-ideas/` pattern but generalizes. Could be wrong.
- D4 (Project board adoption): the org has the board, but I haven't seen evidence the maintainer wants it. Defaults to "adopt minimally and see".
- D5 (retire F-XX numbering): pure preference. Slugs vs IDs is a tradeoff.
- D6 (5-value enum): smaller than the 2026-04-18 8-value proposal because most projects only need active/shipped/cancelled.
- D10, D11, D12 (per-surface conventions): one of many plausible shapes.

**Anti-recommendations (timing opinion, high confidence on direction)**:
- A1-A5: each is "don't do this YET" or "don't do this AT ALL" framed to prevent over-engineering during adoption.

## 15. What this doc does NOT contain

- The migration steps (in `playbook_efforts-migration_2026-05-12.md`).
- The factual audit (in `audit_efforts-folder-state_2026-05-12.md`).
- Industry pattern references (in `tracking-patterns-reference_2026-04-18.md`).
- Any commitment to a specific dated execution plan. Adopt when ready.

End of recommendation.
