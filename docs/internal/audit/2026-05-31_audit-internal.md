# Internal Docs Audit: `docs/internal/` Information Architecture

Status: Findings (action items tracked separately, see "What comes next")
Date: 2026-05-31
Scope: The full `docs/internal/` tree, with emphasis on `efforts/`, `release-plans/`, the backlog model, and per-skill change history. Plus a forward-looking scan of plugin features pm-skills does not yet leverage (input to the roadmap).
Method: Six-investigator parallel audit (efforts, release-plans, root + minor dirs, backlog + GitHub issues, skill history, plugin-feature landscape), followed by spot-verification of every load-bearing claim against real files and live `gh`. See the Verification Log appendix.
Auditor: Claude (Opus 4.8), at maintainer request.

---

## How to read this

This audit measures **reality against the operating model the repo already wrote down**. The model is good. The drift from it is the problem. Almost nothing here is "we never decided how to do this"; most of it is "we decided, the practice diverged, and nobody swept it back."

Findings are severity-ranked:

- **P0** breaks a correctness or trust property right now.
- **P1** is active rot that misleads a reader or violates a stated rule.
- **P2** is drift that will become P1 if left.
- **P3** is cosmetic or low-stakes cleanup.

Each subsystem section ends with concrete dispositions. The consolidated ledger near the end totals them. The companion documents (restructure playbook, roadmap, backlog convention) turn these findings into an execution plan; this file is the diagnosis, not the treatment.

---

## Executive summary

The internal docs were architected well in March 2026 (`planning-persistence-policy.md`, `planning-artifact-tier-map.md`, `efforts/README.md` all date from 2026-03-15 to 2026-03-17). The repo then shipped ~15 releases and grew from 24 to 64 skills, and the practice outran the architecture. Seven headline findings:

1. **The "canonical" backlog contradicts the policy that governs it.** Three separate policy docs forbid "a second canonical backlog file" and name GitHub issues as the single owner of backlog state. A tracked file literally named `backlog-canonical.md` exists, maintains its own priority order and release mapping, and is the de-facto source of truth. It is 26 days stale and content-stale by multiple releases. **(P1)**

2. **GitHub issues are real but function as a thin intake log, not a backlog.** 113 issues exist (12 open / 101 closed, verified live). But lifecycle drifts from disk: `#118` and `#119` are OPEN though both skills ship on disk. F-17/F-18 shipped in v2.11.0 with no issue ever filed. Only 3 milestones exist, all stale shells; none maps to any release from v2.8.0 onward. Prioritization and sequencing live entirely in markdown. **(P1)**

3. **`efforts/` runs two competing conventions at once and accumulated working material it was explicitly told not to hold.** 127 tracked files: ~45 flat briefs (the intended model) collide with ~19 sibling folders holding specs/plans/drafts; an F-17 triplet and an F-18 collision; three name-based folders that break the ID convention; 30 files under `_discovery/`, `drafts/`, `_research/`, `samples/`, `_archived/` that the README assigns to gitignored `_NOTES/` (including a committed `.docx` binary and two full duplicates of a shipped skill tree). Many briefs still read "Backlog" or "In Progress" though their skills shipped. **(P1)**

4. **`release-plans/` is the mature convention the rest of the tree should adopt.** The most recent folders (v2.21.0-v2.23.0) converged on a clean, legible template: `plan_vX.Y.Z.md` + `implementation-plan.md` + `spec_<name>.md` + `spec_<name>_reviewed-by-codex.md` + `*-drafts.md`. `v2.23.0` is the reference exemplar and matches the user's stated standard almost exactly. The drift here is historical: 3 naming eras, inconsistent `_archive`/`_archived` spelling, and ~20 thin old folders redundant with git tags. **(P2/P3)**

5. **0 of 64 skills have a `HISTORY.md`.** The user wants every skill to carry a changelog. The current governance makes `HISTORY.md` opt-in and deferred to a skill's second version, so the absence is by-design. But 26 skills are already past 1.0.0 (24 at 2.0.0, 1 at 2.5.0, 1 at 1.0.1) and "qualify" even under today's rule, yet none has one. The CI validator is advisory and presence-only, so it can never enforce coverage. **(P1 vs the stated goal)**

6. **The root of `docs/internal/` is a flat dumping ground with no index.** No `README.md` or `index.md`. 12 loose files mix evergreen policy (keep) with dead dated research (archive). Two policy docs near-duplicate each other. A documented 2026-05-20 hygiene-pruning audit prescribed exact fixes that were never executed: `_working/` (10 files), `_archived/` (2), and `audit/_archived/` (2) are still tracked despite their "this is transient" prefixes, because `.gitignore` only covers `_LOCAL/`. **(P1)**

7. **The plugin is under-leveraged relative to what the platform now offers.** pm-skills uses skills, commands, sub-agents, and a marketplace well. It does not yet use hooks, output styles, plugin `userConfig`, project-local settings, a bundled catalog MCP, or community-marketplace distribution, any of which would directly attack the library's hardest problem: helping a user find the right one of 64 skills at the right moment. This is the raw material for the roadmap (separate doc).

**The throughline:** the repo has strong written conventions and weak enforcement. Every P1 here is a place where a rule exists, the practice diverged, and no gate caught it. The fix is not more docs; it is (a) consolidating to one home per concern, (b) picking one authority where two compete, and (c) adding the few CI gates that make the conventions self-enforcing.

---

## Subsystem health scorecard

| Subsystem | State | Worst finding | Headline action |
|---|---|---|---|
| `release-plans/` | **Mature, codify it** | 3 naming eras, `_archive` spelling drift | Write the v2.23.0 template into the README; archive pre-v2.16 folders |
| `audit/` | **Healthy** | Its own 2026-05-20 fixes never ran | Execute the pending hygiene-pruning |
| `efforts/` | **Diverged badly** | File+folder duplication + tracked drafts | Flat-brief model only; relocate working material; reconcile statuses |
| Root + minor dirs | **Flat dumping ground** | No index; never-run cleanup | Add index; 6-folder layout; merge duplicate policies |
| Backlog / GH issues | **Policy inverted by practice** | `backlog-canonical.md` violates its own rule | Pick one authority; reconcile lifecycle; milestones per release |
| Per-skill HISTORY | **0% of stated goal** | No HISTORY files, advisory CI | Decide birth-stub vs generated view; backfill; enforce |

---

## 1. `efforts/` - the backlog graveyard

### Intended model

`efforts/README.md` (last updated 2026-03-17) defines a strict three-layer system:

1. **GitHub issue** = lifecycle (open/closed, label, milestone).
2. **One flat tracked brief** per effort, named `{ID}-{short-name}.md`, living directly in `efforts/`. Thin: scope, decisions, artifact links, PR links. Links to deeper material rather than containing it.
3. **Working space** (discovery, prep, drafts, transcripts) in gitignored `_NOTES/efforts/`.

This is a sound model. The `.gitignore` backs it (`_NOTES/` is ignored). The problem is that the model was never enforced after 2026-03-17, and reality diverged in five distinct ways.

### What reality looks like

**127 tracked files** under `efforts/`, zero of them gitignored. Roughly 45 flat briefs (conformant) plus ~14 effort folders plus 3 name-based family folders plus loose non-brief working docs at the root.

#### 1a. File + folder duplication for ~19 effort IDs (P1)

These IDs exist as **both** a flat `{ID}-{name}.md` brief **and** a sibling `{ID}-{name}/` folder: F-07, F-08, F-13, F-14, F-15, F-17, F-18, F-24, F-25, F-26, F-27, F-28, F-37, F-38, F-39, F-40, F-41, F-42, D-05. In every case the flat `.md` is the canonical brief; the folder holds spec/plan/draft material that belongs in `_NOTES/` or, for shipped work, in the release folder. F-38/39/40/41/42 folders are **pure stubs**: a single `README.md` listing "expected files" that were never authored. They add navigation noise with zero content.

#### 1b. The F-17 triplet and F-18 collision (P1)

F-17 has three artifacts: the canonical flat `F-17-meeting-synthesize.md`, a `F-17-meeting-synthesize/` spec+plan folder, and an abandoned `F-17-meeting-synthesis/` folder (the original misspelled/mis-scoped "synthesis"). The shipped skill is `foundation-meeting-synthesize`, confirming `-synthesis` is dead. F-18 has the flat `F-18-meeting-agenda.md` + folder, plus an abandoned `F-18-meeting-prep/` folder (original scope, later split into agenda + brief). The briefs' own history notes say the originals were archived to `_NOTES/archived-efforts/`, yet the dead folders still sit tracked under `efforts/`.

#### 1c. Tracked working material that violates the gitignored-`_NOTES` policy (P1)

30 files live under `_discovery/`, `drafts/`, `_research/`, `samples/`, `_archived/` inside `efforts/`. Worst offenders:

- `F-24-update-pm-skills/` ships a **full duplicated skill tree twice** (once under `drafts/skills/`, once under `_discovery/2026-04-09_claude-web-session/skills/`), even though the real skill shipped to `skills/utility-update-pm-skills/`.
- `foundation-sprint-skills/_research/Gemini_Design and Foundation Sprint Skills.docx` is a committed **binary** research file.
- `design-sprint-skills/samples/` and `foundation-sprint-skills/samples/` hold 14+ sample artifacts that duplicate the canonical home `library/skill-output-samples/`.

#### 1d. Name-based folders collide with the ID convention (P1)

`design-sprint-skills/`, `foundation-sprint-skills/`, `meeting-skills-family/` break the `{ID}-{short-name}` rule entirely. The first two are **duplicated** by the ID-based stub briefs F-41 and F-42. All three families shipped (sprints in v2.15.0, meeting in v2.11.0) and have full release-plan folders, so their design-specs and samples are redundant with `release-plans/`. `foundation-sprint-skills/README.md` self-describes as "not promoted to canonical structure yet" - an honest admission that the cleanup never happened.

#### 1e. Stale statuses on shipped efforts (P2)

The folder cannot signal completion because shipped efforts still read pre-ship statuses: F-13 "Active" (all 12 workflows shipped), F-26 "In Progress" (`foundation-lean-canvas` on disk), F-17/18/25/27/28 "Backlog" (all 5 `foundation-meeting-*` on disk), F-24 "Ready for Implementation" (shipped v2.10.0).

#### 1f. Loose non-brief docs at the root (P2)

`prompt_todo_2026-03-21.md` (a raw pasted prompt), `organization-design_2026-04-18.md` + `tracking-patterns-reference_2026-04-18.md` (design essays about reorganizing `efforts/` itself - ironically un-IDed), and `launch-mkdocs.md` + `launch-mkdocs_execution.md` (a MkDocs launch plan obsoleted by the Astro Starlight migration).

> **Insight.** `organization-design_2026-04-18.md` exists *because* the README model was already breaking down a month after it was written. The repo noticed the drift, wrote an essay about how to fix it, and then did not execute the fix. That is the pattern this whole audit is about: diagnosis without follow-through. The remedy is not another essay; it is a small CI guard (one flat file per ID, no nested folders, valid `Status`) plus a one-time sweep.

### Dispositions (efforts/)

- **Keep** (~45): all conformant flat `{ID}-{name}.md` briefs.
- **Delete** (7): five stub folders (F-38/39/40/41/42), two abandoned mis-scope folders (F-17-meeting-synthesis/, F-18-meeting-prep/), plus the raw `prompt_todo_2026-03-21.md`.
- **Relocate to gitignored `_NOTES/efforts/`** (~30): all `_discovery/`, `drafts/`, `_research/`, `samples/`, `_archived/` content; the `.docx` binary.
- **Fold into the matching release folder, then delete the effort folder** (spec/plan files for shipped work): F-07/F-08 -> v2.18.0; F-13 bundles -> v2.9.0; F-17/18/25/27/28 + `meeting-skills-family/` -> v2.11.0; `design-sprint-skills/` + `foundation-sprint-skills/` -> v2.15.0; F-24 -> v2.10.0; F-26 -> v2.11.0; M-19 -> v2.9.0.
- **Move (unshipped specs)** to `_NOTES/efforts/`: D-05, F-14, F-15, F-37, M-20, M-22 spec/plan folders.
- **Flip status to Shipped** with the correct release: F-13, F-26, F-17/18/25/27/28, F-24, M-19, F-41, F-42.
- **Archive** (superseded): `launch-mkdocs*.md`, the two `organization-design`/`tracking-patterns` essays (or move to a reference home).

---

## 2. `release-plans/` - the mature convention to standardize on

### What exists

30 version folders (v2.2.0 -> v3.0.0) plus `_deferred/`, one root `runbook_clean-worktree-cut-tag-publish.md`, and a current `README.md` (updated 2026-05-29). There is a real, observable convention that drifted across **three eras**:

- **Era 1 (v2.2.0-v2.7.0):** per-folder `README.md` + `checklist.md` + ad-hoc work-item-ID decision docs. No master `plan_` file.
- **Era 2 (v2.8.0-v2.16.x):** the `plan_vX.Y.Z.md` master emerges as the spine, with a noisy `plan_v2.NN_<topic>.md` companion family. **v2.16.0 is peak sprawl: 18 mostly-unprefixed files.**
- **Era 3 (v2.21.0-v2.23.0):** converged on a tight, legible set. **This is the standard to codify.**

### The codified template (derived from Era 3 / v2.23.0)

```
docs/internal/release-plans/
  README.md                              # index + operating rules (root)
  runbook_*.md                           # cross-release ops runbooks (root)
  _deferred/
    YYYY-MM-DD_<slug>/                   # one dated subfolder per deferred initiative
      README.md                          # status banner + git anchor + reinstatement prompt (REQUIRED)
      <preserved plan/spec/impl files>
  _archive/                              # OPTIONAL root rollup for fully-redundant shipped folders
  vX.Y.Z/
    plan_vX.Y.Z.md                       # REQUIRED master plan (Status / Owner / Type / Theme / Created / Updated)
    implementation-plan.md               # phased executor checklist (when build is non-trivial)
    spec_<capability>.md                 # one per new skill/feature (0..n)
    spec_<capability>_reviewed-by-codex.md   # adversarial-review record, colocated (0..n)
    release-comms-drafts.md              # changelog / release-notes / announcement drafts (optional)
    _archive/                            # superseded originals + evidence logs ONLY (single spelling)
```

**Rules to codify:** exactly one `plan_vX.Y.Z.md` master per folder with the fixed Status lexicon (PLANNED | IN PROGRESS | EXECUTED | SHIPPED | RESERVED | DEFERRED); build steps in `implementation-plan.md` (unversioned name, the folder already carries the version); specs as `spec_<name>.md`, reviews colocated; drop the Era-2 `plan_v2.NN_` prefix; one spelling `_archive/`; drop per-folder `skills-manifest.yaml` (now redundant with the build-time catalog and git tags).

> **The folder-name question (P3, needs a decision).** You described the standard as `release-plans/plan_vX.Y.Z/`. Current practice is `release-plans/vX.Y.Z/` with `plan_vX.Y.Z.md` **inside**. The *contents* already match your ask exactly; only the folder token differs. Recommendation: keep `vX.Y.Z/` (avoids renaming 30 folders and rewriting 533 cross-references across 180 files, 118 of them in the public Astro site; the version token need not be repeated as a folder prefix), and state explicitly in the README that the master file is `plan_<folder>.md`. This is flagged in the design decisions, not pre-decided.

### Problems

- **`_archive` vs `_archived` spelling drift** (P2): `v2.8.0/_archived/`, `v2.9.0/_archive/`, `v2.14.0/_archive/`; two extensionless `plan_*_original` files (no `.md`).
- **Era-2 companion noise** (P2): e.g. `v2.13.0/` has 10 `plan_v2.13_*` files including `-DRAFT` suffixes.
- **v2.16.0 sprawl** (P3): 18 files, redundant with the tag.
- **~20 thin old folders redundant with git tags** (P3): archive candidates.

### Dispositions (release-plans/)

- **Keep as live exemplars:** v2.23.0 (reference), v2.22.0, v2.21.0, v2.18.0, v2.17.0, v3.0.0 (reserved stub), `_deferred/`, the runbook, the README.
- **Archive (roll up under `_archive/` or rely on git tags):** all pre-v2.16 folders plus v2.16.0/.1/.2, v2.15.x, v2.13-v2.14, and the thin single-plan folders (v2.19.0, v2.20.0 after one more cycle).
- **Normalize:** one `_archive/` spelling; add `.md` extensions to the two extensionless originals.
- **Codify** the template above into `release-plans/README.md`; lint future folders against v2.23.0.

---

## 3. Root files + minor directories - the flat dumping ground

### The core problem (P1)

There is **no `docs/internal/README.md` or `index.md`** (verified). 12 loose `.md` files (count predates these companion deliverables landing at root) sit at the same level as 12 subdirectories with no map telling a reader which are durable policy and which are dead one-offs.

### Loose root files split cleanly

**Evergreen (keep, give a durable home):** `skill-versioning.md`, `dependency-policy.md`, `planning-persistence-policy.md`, `planning-artifact-tier-map.md`, `backlog-canonical.md` (its framing, not its table), `cross-llm-review-protocol.md`, `marketplace-plugins-updates.md` (the newest root file, a live dual-home release-propagation runbook updated 2026-05-30).

**Dated one-offs superseded by shipped releases (archive):** `multi-repo-extraction-design_2026-04-19.md` + `multi-repo-patterns-reference_2026-04-19.md` (a repo split not adopted), `marketplace-multi-plugin-migration_2026-05-18.md` (planned what shipped as v2.21.0; self-declares it supersedes the 04-19 design), `release-scoping-v2.17-and-v3.0_2026-05-18.md` (resolved by shipped v2.17.0/v2.21.0/v2.22.0), `skill-library-evaluation-anthropic-guide.md` (dated 2026-02-13, asserts 24 skills, now 64).

### Two near-duplicate policy docs (P2)

`planning-persistence-policy.md` and `planning-artifact-tier-map.md` cover the same Tier 1/2/3 tracked-vs-ignored model, the same promotion checklist, and the same legacy-surface note. They should be **one** governance doc with the tier table as a section.

### Subdirectories

- `audit/` - **healthy**, the model for the rest: own README, `_archived/` for superseded audits, date-prefixed files. (Its own `2026-05-20_hygiene-pruning.md` is the spec for this cleanup.)
- `_working/` (10 tracked), `_archived/` (2 tracked), `audit/_archived/` (2 tracked) - **tracked despite their prefixes** because `.gitignore` only covers `_LOCAL/` (P1, see below).
- `distribution/` - keep `skills-sh.md` (evergreen); archive the dated `2026-04-22_skills-sh.md` and nested `skills-sh/current-status_2026-04-23.md` (stale status surfaces).
- `skills-ideas/` - all briefed skills shipped; a post-ship graveyard.
- `milestones/` - one Complete milestone; distinct lifecycle from `release-plans/`; archive.
- `readme/` - one stray file (raw README-feedback scratch, not a structure doc); archive + delete folder.
- `diagrams/` - one durable file (`mermaid-styled-examples.md`, the README-diagram source); move to a reference home.
- `contribution-pr-reviews/` - one shipped-PR review; archive.
- `skills-published/` - **empty**; delete.

### The never-executed hygiene fix (P1)

`audit/2026-05-20_hygiene-pruning.md` prescribed exact `git rm --cached` commands and a `.gitignore` extension. None ran. The `_working`/`_archived` naming convention does not actually keep those paths out of git, so the prefixes lie. This is a documented, low-risk chore that has sat undone for 11 days.

### Proposed top-level layout (6 folders + index)

```
docs/internal/
  README.md            # one-screen index: what each folder is, what is durable vs historical
  governance/          # durable policy + reference (skill-versioning, dependency-policy,
                       #   merged planning-persistence, cross-llm-review, release-ops runbook)
  efforts/             # keep (flat-brief model, enforced)
  release-plans/       # keep (codified template)
  audit/               # keep (already healthy)
  reference/           # durable external-surface refs (distribution/skills-sh, mermaid diagrams)
  _archive/            # gitignored historical one-offs (dated research, completed milestone, mkdocs)
```

---

## 4. Backlog + GitHub issues - policy inverted by practice

### The contradiction (P1)

All three policy files state the rule and `backlog-canonical.md` breaks it:

- `planning-persistence-policy.md` Hard Rule 4: "Tracked docs should link to GitHub issues for backlog state instead of replacing them with a second canonical backlog file."
- `planning-artifact-tier-map.md` "Backlog State": "GitHub issues own backlog and lifecycle state ... not replace issues with a second canonical backlog file."
- `backlog-canonical.md` line 7: "GitHub issues are the canonical system for backlog and lifecycle state."

Yet `backlog-canonical.md` is a tracked file, named "canonical," that maintains its own Priority 1-18 ordering, its own Shipped/Active sections, and its own per-row Status and Release columns. It is precisely the artifact the policy prohibits, and it asserts the prohibition on its own first content line.

### What the issues actually look like (verified live)

`gh` (authenticated) against `product-on-purpose/pm-skills`: **113 issues, 12 open / 101 closed.** Observed reality:

- **Lifecycle drift:** `#118` (F-07 discover-market-sizing) and `#119` (F-08 measure-survey-analysis) are OPEN, but both skills ship on disk. They were never closed when the work shipped. (Verified: both `"state":"OPEN"`.)
- **Missing issues:** F-17 and F-18 - the top two "priority" rows in the markdown backlog - have no GitHub issue at all, though both skills shipped in v2.11.0.
- **Bare intake:** of 12 open issues, `#149`, `#148`, `#127` carry zero labels.
- **Stale milestones:** only 3 exist - `v0.2.0` and `v0.3.0` (pre-2.x; both still OPEN but with zero remaining open issues, so de-facto shells) and `v2.7.0` (OPEN, holding `#109`/F-03), though the current tag is v2.23.0. **No milestone maps to any release from v2.8.0 onward**, so the markdown Release column, not GitHub, carries release association.

### The diagnosis

Practice has **inverted** policy. The markdown file is the real source of truth for prioritization, sequencing, and release mapping; issues are a partial, drifting subset that captures the M-12..M-21 / F-05..F-15 generation reasonably but lost the thread for newer work. Staleness compounds it: `backlog-canonical.md` (updated 2026-05-05) still lists F-17/F-18/M-22 as "Backlog (v2.11.0)" though the meeting family shipped in v2.11.0.

> **Insight.** This is not "stop using markdown, use issues." A markdown view has real value: it shows priority order and release mapping at a glance, which a flat issue list does not. The defensible model is **issues as the system of record for lifecycle, a generated read-only markdown index for the human view, and milestones tied 1:1 to release folders so the Release column is derived, not hand-typed.** The failure mode to kill is a *hand-edited* file named "canonical" that competes with issues for authority. The fix is to make the markdown a generated mirror, or move its unique data into issues and delete it. (This is a design decision, presented separately.)

### Recommendations

1. Resolve the naming/policy contradiction: either delete `backlog-canonical.md` and move its unique data into GitHub, or rename it `backlog-index.md` with a "generated, do not edit" banner.
2. Reconcile lifecycle now: close `#118`/`#119`; create-then-close issues for the F-17/F-18 work that shipped issue-less; run a one-time "every skill on disk has exactly one issue whose state matches shipped" audit.
3. Make milestones canonical: one milestone per release (v2.8.0 .. next), retire the 3 stale shells, require every effort issue to carry the milestone matching its `release-plans/vX.Y.Z/` folder.
4. Adopt a `.github/ISSUE_TEMPLATE/effort.yml` capturing the three-layer model: required Effort ID, link to the release plan folder, link to the effort brief + spec, link to the target skill path, milestone, and `agent:` label.
5. Enforce labeling on intake (pre-filled template defaults + a periodic check flagging zero-label / no-milestone open issues).
6. Add a pre-release governance check that re-derives backlog state from `gh` and diffs it against any tracked mirror, so the markdown can never silently drift again.

---

## 5. Per-skill change history - 0 of 64

### Current state

The repo versions at two levels: a repo release version (git tags, `CHANGELOG.md`, `plugin.json`) and a per-skill contract version (SemVer in each `SKILL.md` `metadata.version`). Governance is in `skill-versioning.md` (internal) and `docs/reference/pm-skill-versioning.md` (public). It defines a per-skill `HISTORY.md`, but makes it **opt-in and deferred to a skill's second version** ("A skill at 1.0.0 with no iteration history doesn't need one"). Release-level change tracking lives instead in `release-plans/*/skills-manifest.yaml` (8 of them) plus git log scoped by conventional-commit skill name.

### The gap (P1 vs the stated goal)

- **0 of 64 skills have a `HISTORY.md`** (verified: Glob returns "No files found").
- **26 of 64 are already past 1.0.0** and "qualify" even under today's opt-in rule: version distribution is 15x `0.1.0` (the tool-sprint family), 23x `1.0.0`, 1x `1.0.1` (foundation-meeting-synthesize), 24x `2.0.0`, 1x `2.5.0` (foundation-persona). The 2.0.0 lift's history exists only in `skills-manifest.yaml` and git log, never surfaced per-skill.
- **CI can never enforce coverage:** `validate-skill-history` is `continue-on-error: true` and exits 0 when no `HISTORY.md` exists. It only checks that an *existing* file contains the current version row.

### Two ways to satisfy "every skill has a changelog" (design decision)

- **Option A - Birth-stub `HISTORY.md` for all 64.** Flip the governance trigger from "second version" to "created at birth, one row per shipped version." Backfill programmatically from the 8 `skills-manifest.yaml` files + frontmatter (the manifest schema already encodes `previous_version`/`change_type`/`effort`/`release`, which is exactly the HISTORY summary-table schema). Decide the 0.1.0 cohort's first-row semantics (seed at 0.1.0, not 1.0.0). Then promote the CI validator to enforcing + presence-required, and update `utility-pm-skill-builder` to scaffold a birth stub so new skills are born compliant. Cost: 64 new tracked files + a new gate.
- **Option B - Generated per-skill changelog view.** Keep `skills-manifest.yaml` + git log as the system of record; generate a per-skill changelog *page* on the Astro docs site (and/or via `scripts/build-skill-catalog.py`). Satisfies "each skill has a changelog" for readers without 64 new tracked files. Cost: a generator; the changelog is read-only and lives on the site, not next to the skill.

> **Recommendation:** Option A is the more direct answer to your ask and pairs naturally with the version-bump discipline CI already enforces, but it is the heavier commitment. Option B is lighter and reuses existing data. A hybrid is viable: birth-stub `HISTORY.md` (Option A) *and* surface it as a generated site page (Option B's discoverability). Flagged in the design decisions.

---

## 6. Plugin-feature landscape - what pm-skills does not yet leverage

This section is forward-looking input to the roadmap (separate doc); it is included here so the audit captures the full opportunity surface in one place. Sources are the official Claude Code docs (`code.claude.com/docs`) and the repo manifests; each item should be re-verified against current docs before implementation.

**Already used well:** 64 skills with `references/` progressive disclosure; 10 workflow slash-commands; 4 native sub-agents with rich frontmatter + `@`-mention; a sub-agent chain allowlist (`agents/_chain-permitted.yaml`); self-hosted marketplace; `plugin.json` with explicit versioning; the `.codex-plugin` manifest for cross-client discovery; `$ARGUMENTS`.

**Not yet leveraged (opportunity, tiered):**

| Feature | Opportunity for pm-skills | Tier | Effort |
|---|---|---|---|
| SessionStart hook | Phase-aware skill surfacing: inspect cwd/branch/artifacts and nudge the right skills. Directly attacks the 64-skill discovery problem. | Differentiator | M |
| PostToolUse / Stop hook | Auto-dispatch `pm-critic` after a PM artifact is written, making the adversarial-review loop deterministic. | Differentiator | M |
| PreToolUse hook | Ship the house rules as guardrails (em-dash/en-dash rejection, fabrication + employer-neutrality flags). No other PM plugin ships prose linting. | Differentiator | S |
| Output style ("PM mode") | Reshape Claude into a PM voice (outcome-over-output, evidence-calibrated confidence, refuses fabricated metrics). | Differentiator | M |
| `userConfig` enable-time prompts | Let a team pin house template, OKR cadence, preferred prioritization framework, company-context file. Respects employer-neutrality (team supplies the value). | Differentiator | M |
| `.claude/pm-skills.local.md` | Per-project PM state (current phase, active initiative, artifacts produced); drives phase routing without an MCP server. | Differentiator | M |
| Bundled catalog MCP | Expose the skill catalog as a queryable resource + `recommend_skill(situation)` tool; cross-client. | Moonshot | L |
| `argument-hint` / `allowed-tools` / `model` on commands | Autocomplete hints, per-workflow model, pre-approved tools so chains don't stall on prompts. | Table-stakes | S |
| Dynamic context injection (`` !`cmd` ``) | `deliver-release-notes` pulling `git log`, `iterate-retrospective` pulling recent activity. | Differentiator | M |
| Skill subagent execution (`context: fork`) | Run heavy skills (deliver-prd, sprint families) in a forked context to protect the main thread's window. | Differentiator | M |
| Multi-plugin marketplace + dependencies | The "plugin #2" path: split optional capability into sibling plugins with pm-skills as core dependency. | Differentiator | L |
| Submit to community marketplace | Put pm-skills in the Discover tab of every Claude Code install. Distribution multiplier, zero change to existing install path. | Table-stakes | S |
| `displayName` / `defaultEnabled` / token-cost transparency | Add `displayName`; publish the always-on token cost of 64 skills + 4 agents in CI for trust. | Table-stakes | S |
| `${CLAUDE_PLUGIN_DATA}` | Cache the built catalog / cross-session notes that survive plugin updates. | Table-stakes | S |
| Background monitors, `subagentStatusLine` | Niche polish (metrics monitor during measure sessions; release-gate progress in a status line). | Moonshot | M/L |

---

## Cross-cutting themes

1. **Strong conventions, weak enforcement.** Every P1 is a written rule the practice diverged from with no gate to catch it. The highest-leverage fix is a handful of CI guards: one-flat-file-per-effort-ID, milestone-per-release, HISTORY presence, and a backlog/issues drift check at tag time.

2. **Two systems competing for one authority.** Backlog (markdown vs issues) and per-skill history (manifest vs HISTORY) both have this shape. Resolve each by naming **one** system of record and making the other a generated, clearly-labeled view.

3. **Working material leaked into tracked space.** `efforts/` subfolders, `_working/`, `_archived/` are all tracked because `.gitignore` does not match the prefixes the docs assume. Fix the gitignore first, then `git rm --cached`, so the conventions become real.

4. **Date-stamped one-offs accumulate at live roots.** Both `efforts/` and `docs/internal/` root collect dated design/research docs that read as current but describe decided or abandoned questions. A single gitignored `_archive/` plus an "archive when superseded" habit prevents the pile.

5. **The good model already exists in-tree.** `release-plans/` (Era 3) and `audit/` are both well-run. The restructure is largely "make the rest of the tree look like these two," not "invent something new."

---

## Consolidated disposition ledger

Approximate counts across the tree (exact file lists live in each subsystem section and the workflow output):

| Disposition | Count (approx) | Examples |
|---|---|---|
| **Keep** | ~50 | conformant effort briefs; v2.21.0+ release folders; `audit/`; evergreen policy docs |
| **Archive** (to gitignored `_archive/`) | ~25 | dated root research; MkDocs docs; completed milestone; pre-v2.16 release folders; stale scorecard |
| **Relocate to `_NOTES/`** (gitignored) | ~35 | efforts `_discovery/`/`drafts/`/`_research/`/`samples/`; `.docx` binary; unshipped specs |
| **Fold into release folder** then delete source | ~20 | shipped-effort specs/plans (v2.9-v2.18 families) |
| **Merge** | 3 | two planning policies -> one; backlog framing -> governance |
| **Delete** | ~9 | 5 stub folders; 2 abandoned mis-scope folders; empty `skills-published/`; raw prompt file |
| **Create** | ~5 | `docs/internal/README.md`; `governance/`; `reference/`; issue template; (decision) `HISTORY.md` set |

> Counts are deliberately approximate. Treat the per-subsystem dispositions as authoritative; the ledger is for scale, not bookkeeping. The restructure playbook (separate doc) sequences these into safe, verifiable commits.

---

## What comes next

This audit is the diagnosis. Three companion documents (delivered alongside it) turn it into action:

1. **`docs/internal/restructure-plan_2026-05-31.md`** (restructure playbook): the target 6-folder layout, the codified `release-plans/` template, the per-skill HISTORY convention, and a phased, commit-by-commit migration plan with a verification step per phase. (This playbook graduates into `governance/internal-docs-structure.md` once Phase 1-2 create the `governance/` home.)
2. **`docs/internal/roadmap.md`** (plugin-leveraged roadmap): the tiered opportunity surface from Section 6, sequenced into near/mid/long horizons with effort sizing and the "plugin #2" growth path.
3. **`docs/internal/backlog.md`** (backlog + GH-issue convention): the issue template, label/milestone scheme, the generated-index model, and the lifecycle-reconciliation checklist. Deliberately kept at root, not under `governance/`.

### Decisions (resolved 2026-05-31; rationale in `restructure-plan_2026-05-31.md` Section 1)

- **D1.** `release-plans/` folder token: **keep `vX.Y.Z/`** (a rename to `plan_vX.Y.Z/` is a 533-reference / 180-file sweep for zero functional gain; the contents already match the standard).
- **D2.** Backlog authority: **GitHub issues canonical + a generated read-only `backlog-index.md`** (drift came from hand-syncing; generation removes the sync step).
- **D3.** Per-skill history: **Option A - birth-stub `HISTORY.md` for all 64 + enforcing CI** (backfilled from the 8 `skills-manifest.yaml`).
- **D4.** Archive mechanism: **tracked `_archive/` via `git mv`** (history stays browsable; `docs/internal/` is excluded from the release ZIP, so tracked-archive costs users nothing).
- **D5.** `efforts/` relocation: **scratch to gitignored `_NOTES/`, durable history to tracked `_archive/`, pure duplicates deleted** (`_NOTES/` is created in Phase 0).

---

## Appendix: Verification log

Claims independently re-checked against real files / live tooling before publishing (per the "verify before asserting" discipline):

- `skills/**/HISTORY.md` -> **0 files** (Glob "No files found"). `skills/*/SKILL.md` -> **64 files**.
- `gh issue list --state open` -> **12 open** (#149, #148, #136, #135, #134, #133, #127, #119, #118, #109, #97, #87); #149/#148/#127 carry zero labels; #109 on the stale `v2.7.0` milestone.
- `gh issue view 118` / `119` -> both `"state":"OPEN"`; `skills/discover-market-sizing/` and `skills/measure-survey-analysis/` both present on disk.
- `docs/internal/README.md` and `docs/internal/index.md` -> **neither exists.**
- `backlog-canonical.md` line 7 "GitHub issues are the canonical system" read directly; F-17/F-18 rows confirmed "Backlog (v2.11.0)."
- `efforts/` file+folder pairs and the F-17 triplet confirmed in the directory listing.
- **Rename blast radius (drives D1):** `grep "release-plans/v[0-9]"` repo-wide -> **533 occurrences across 180 files**; restricted to public `docs/` (excluding `docs/internal/`) -> **118 occurrences across 31 files**.
- **F-17 / F-18 issue absence:** `gh issue list --state all --search "F-17 in:title"` and `"F-18 in:title"` -> both `[]` (no issue in any state), confirming the meeting-synthesize/agenda work shipped issue-less.
- **Version-folder count:** `ls -d release-plans/v*/` -> **30** (corrects an earlier "35").
- **Milestone states:** `v0.2.0` / `v0.3.0` are `state:OPEN` with 0 open issues each (de-facto shells); `v2.7.0` OPEN with `#109`.
- **Plugin features (roadmap input):** SessionStart / PreToolUse(can block) / PostToolUse / Stop hooks, `userConfig` + `${user_config.*}` + `CLAUDE_PLUGIN_OPTION_*`, settings.json `agent` + `subagentStatusLine`, `displayName`, `defaultEnabled`, `${CLAUDE_PLUGIN_DATA}`, `dependencies`, `monitors`, output-style `force-for-plugin` + `keep-coding-instructions`, `argument-hint` / `allowed-tools` / `context: fork` / `agent:` / `` !`command` `` / `$ARGUMENTS` - all confirmed against `code.claude.com/docs` on 2026-05-31.

Findings whose evidence is the workflow investigators' own file reads (counts like "127 tracked files," "30 policy-violating files," the version distribution 15/23/1/24/1) are attributed to that pass and are consistent with the spot-checks above, but were not each independently re-counted line-by-line.
