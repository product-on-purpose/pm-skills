# `docs/internal/` Restructure Playbook

Status: **Proposed - awaiting maintainer approval before any file operation**
Date: 2026-05-31
Owner: Maintainers
Companion to: `docs/internal/audit/2026-05-31_audit-internal.md` (the diagnosis this plan treats)
Related deliverables: `docs/internal/roadmap.md`, `docs/internal/backlog.md`

> **Execution gate.** Nothing in this playbook has been executed. Each phase below is a discrete, reversible commit. Do not run a phase until its predecessor is verified green. Phases marked **[independent]** can run in any order; phases marked **[ordered]** depend on an earlier one.

---

## 1. Decisions locked (and why)

| ID | Decision | Choice | Rationale |
|----|----------|--------|-----------|
| D1 | `release-plans/` folder token | **Keep `vX.Y.Z/`** (master file `plan_vX.Y.Z.md` inside) | A rename to `plan_vX.Y.Z/` forces a **533-reference sweep across 180 files** (118 in the public Astro site, more in CI link-checkers) for zero functional gain. The current folder + master already deliver the desired contents. Reversible later via one scripted commit if ever wanted. |
| D2 | Backlog authority | **GitHub issues canonical + generated `backlog-index.md`** | The drift came from hand-syncing two systems. Generation removes the sync step, preserves the at-a-glance view, honors the existing policy, keeps issues as the contributor surface. See `backlog.md`. |
| D3 | Per-skill history | **Birth-stub `HISTORY.md` for all 64 + enforcing CI** | Most direct answer to "every skill carries a changelog." Backfill from the 8 `skills-manifest.yaml` + frontmatter; then flip the validator to presence-required. |
| D4 | Archive mechanism | **Tracked `_archive/` via `git mv`** | History stays browsable in-repo, nothing is lost, fully reversible. `docs/internal/` is already excluded from the release ZIP, so tracked-archive costs users nothing. |
| D5 | `efforts/` working material | **Relocate scratch to gitignored `_NOTES/`; archive durable history to tracked `_archive/`; delete pure duplicates** | Honors the existing three-layer model. Distinguishes scratch (transcripts, the `.docx`, duplicated skill trees) from durable history (superseded plans worth keeping). |

> **Insight on D1 vs D4.** Note these two decisions point opposite directions on "keep in git vs not," and that is correct, not contradictory. D1 keeps the *live* folders where they are (renaming costs more than it returns). D4 keeps *archived* docs in git (removing them returns little and risks losing history). Both choices minimize irreversible churn. The unifying principle across all five: **prefer the option with the smallest blast radius that still fixes the root cause.**

---

## 2. Target top-level layout

```
docs/internal/
  README.md            # NEW: one-screen index. What each folder is; durable vs historical.
  governance/          # NEW: durable policy + reference, consolidated from loose root files
    planning-persistence-policy.md   # MERGED (was planning-persistence-policy + planning-artifact-tier-map)
    skill-versioning.md
    dependency-policy.md
    cross-llm-review-protocol.md
    internal-docs-structure.md       # the codified IA + release-plans template (this playbook, graduated)
    release-ops.md                   # was marketplace-plugins-updates.md (live release-propagation runbook)
  efforts/             # KEEP. Flat-brief model re-enforced; working folders removed.
  release-plans/       # KEEP. Era-3 template codified in its README.
  audit/               # KEEP. Already healthy.
  reference/           # NEW: durable external-surface refs
    distribution/skills-sh.md
    mermaid-styled-examples.md       # was diagrams/
  roadmap.md           # KEEP at root: high-visibility forward plan
  backlog.md           # KEEP at root: backlog convention + reconciled snapshot (becomes generated)
  _archive/            # NEW (tracked): historical one-offs, superseded research, retired release folders
  _NOTES/              # gitignored: scratch, drafts, transcripts (already in .gitignore; create on disk)
  _LOCAL/              # gitignored: unchanged
```

**Net change:** the 12 loose root files + 12 subdirectories (count predates these three companion deliverables landing at root) collapse to **3 evergreen homes** (`governance/`, `reference/`, `audit/`), **2 working homes** (`efforts/`, `release-plans/`), **2 visible plans** (`roadmap.md`, `backlog.md`), and **2 archive/scratch buckets** (`_archive/`, `_NOTES/`), all routed by one `README.md`.

### The `docs/internal/README.md` index (to author in Phase 1)

A one-screen table: folder, purpose, "is it durable or historical," and the operating rule. This is the single artifact whose absence caused the "which of these is alive?" problem. It is the cheapest, highest-leverage item in the whole plan.

---

## 3. Codified `release-plans/` version-folder template

To be written into `release-plans/README.md` (Phase 4). Derived from the Era-3 convergence (v2.21.0-v2.23.0); `v2.23.0` is the reference exemplar.

```
docs/internal/release-plans/
  README.md                              # index + operating rules + THIS template
  runbook_*.md                           # cross-release ops runbooks (root)
  _deferred/
    YYYY-MM-DD_<slug>/
      README.md                          # status banner + git anchor + reinstatement prompt (REQUIRED)
      <preserved plan/spec/impl files>
  _archive/                              # retired, fully-redundant shipped folders (rolled up)
  vX.Y.Z/
    plan_vX.Y.Z.md                       # REQUIRED. Master plan.
    implementation-plan.md               # phased executor checklist (when build is non-trivial)
    spec_<capability>.md                 # one per new skill/feature (0..n)
    spec_<capability>_reviewed-by-codex.md   # adversarial-review record, colocated (0..n)
    release-comms-drafts.md              # changelog / release-notes / announcement drafts (optional)
    _archive/                            # superseded originals + evidence logs ONLY (single spelling)
```

**Master plan header (fixed):**
```
Status:  PLANNED | IN PROGRESS | EXECUTED | SHIPPED | RESERVED | DEFERRED
Owner:   Maintainers
Type:    MAJOR | MINOR | PATCH
Theme:   <one line>
Created: YYYY-MM-DD
Updated: YYYY-MM-DD
```

**Rules to codify:**
1. Exactly one `plan_vX.Y.Z.md` master per folder, with the header above.
2. Build steps live in `implementation-plan.md` (unversioned name; the folder carries the version).
3. New-capability specs use `spec_<name>.md`; their reviews use `spec_<name>_reviewed-by-codex.md`, colocated.
4. Drop the Era-2 `plan_v2.NN_<topic>.md` companion prefix; the folder already scopes companions. Use plain topic names or the `spec_` / `*-drafts.md` families.
5. One spelling: `_archive/` (not `_archived`). Superseded originals and evidence logs only.
6. Drop per-folder `skills-manifest.yaml` from the template (now redundant with the build-time catalog + git tags). Existing ones archive with their folders.
7. `_deferred/<date>_<slug>/` with a REQUIRED `README.md` (status + git anchor + reinstatement prompt) is the parked-initiative standard. The existing `_deferred/2026-05-29_skills-short-rename/` is the exemplar.

---

## 4. Per-skill `HISTORY.md` convention (D3 = birth-stub for all 64)

**Trigger change.** Today: `HISTORY.md` is created on a skill's *second* version. New rule: **created at birth, one row per shipped version.**

**Format** (unchanged from `skill-versioning.md`): a summary table + per-version sections. First-row semantics for the 15 pre-1.0 tool-sprint skills: seed at their real `0.1.0`, not a fictional `1.0.0`.

**Backfill source.** The 8 `release-plans/*/skills-manifest.yaml` files already encode `name / version / previous_version / change_type / effort` per skill per release - exactly the HISTORY summary-table schema. Plus `SKILL.md` `metadata.version` + `updated`, plus git log scoped by conventional-commit skill name.

**Mechanism (Phase 6):**
1. Write `scripts/generate-skill-history.{py,ps1,sh}` that reads the manifests + frontmatter and emits a stub `skills/<name>/HISTORY.md` for every skill missing one.
2. Human spot-checks the 26 multi-version skills (24 at 2.0.0, 1 at 2.5.0, 1 at 1.0.1) so their prior versions are represented accurately, not collapsed to one row.
3. Update `utility-pm-skill-builder` to scaffold a birth `HISTORY.md` so new skills are born compliant.
4. Update `utility-pm-skill-iterate` Step 7: drop the "MUST NOT create for first version" clause; it now appends a row instead.
5. Extend `scripts/validate-skill-history.{sh,ps1}` to **require presence** (fail when a skill lacks `HISTORY.md`) and assert the top table row matches current `metadata.version`.
6. Flip the CI step off `continue-on-error: true` only after the backfill lands and is green locally.
7. Update `docs/internal/skill-versioning.md` and `docs/reference/pm-skill-versioning.md` in lockstep.

> **Sequencing caution.** Steps 5-6 (enforcing CI) must come *after* step 1-2 (backfill), or the very next PR fails on the 64 missing files. Backfill, verify all 64 present and correct, then enforce. This mirrors the M-18 plan's own "advisory until adoption is widespread, then promote to blocking."

---

## 5. Migration plan (phased, commit-by-commit)

Each phase is one logical commit (or a small ordered set). Verification is mandatory before the next phase. Phases 1-3 are low-risk and independent; 4-5 are the bulk file moves; 6-7 are the per-skill and CI work; 8 is enforcement.

### Phase 0 - Prep [independent, safe]
- Create `_NOTES/` on disk and confirm `.gitignore` already ignores it. Extend `.gitignore` to cover `docs/internal/_archive/`? **No** - D4 keeps `_archive/` tracked. Instead, fix the *broken* ignore: the existing `*/_archived/*` rule does not match the tracked `_working/`, `_archived/`, `audit/_archived/` files. Decide per D4/D5: `_working/` content is scratch -> gitignored `_NOTES/`; `_archived/` content is history -> tracked `_archive/`.
- **Verify:** `git check-ignore` behaves as intended for `_NOTES/` (ignored) and `_archive/` (tracked).

### Phase 1 - Add the index + governance scaffold [independent, safe, highest leverage]
- Create `docs/internal/README.md` (the routing index).
- Create `governance/` and `reference/` empty homes with a one-line README each.
- **Verify:** links in the new README resolve; CI link-check green. **No content moved yet**, so this phase is pure addition and trivially reversible.

### Phase 2 - Consolidate governance policy [ordered after 1]
- `git mv` into `governance/`: `skill-versioning.md`, `dependency-policy.md`, `cross-llm-review-protocol.md`, `marketplace-plugins-updates.md` (-> `release-ops.md`).
- **Merge** `planning-persistence-policy.md` + `planning-artifact-tier-map.md` -> `governance/planning-persistence-policy.md` (tier table becomes a section); leave a one-line redirect stub at the old path for one release, or update referrers directly.
- Update the ~handful of referrers (these docs are cited far less than `release-plans/`; sweep with grep).
- **Verify:** grep for old paths returns only intended redirects; CI link-check green.

### Phase 3 - Reference + retire single-occupant folders [ordered after 1]
- `git mv diagrams/mermaid-styled-examples.md reference/`; remove empty `diagrams/`.
- `git mv distribution/skills-sh.md reference/distribution/`; `git mv` dated `distribution/2026-04-22_skills-sh.md` + `distribution/skills-sh/current-status_2026-04-23.md` -> `_archive/distribution/`.
- `git mv` (archive): `contribution-pr-reviews/PR-141*` -> `_archive/`; `readme/structure.md` -> `_archive/`; remove empty `readme/`.
- **Delete** empty `skills-published/`.
- **Verify:** CI link-check green; no dangling references.

### Phase 4 - `release-plans/` codify + archive old folders [ordered after 1; independent of 2-3]
- Write the codified template (Section 3) into `release-plans/README.md`.
- Normalize `_archive` spelling; add `.md` to the two extensionless `plan_*_original` files.
- `git mv` retired folders into `release-plans/_archive/`: all pre-v2.16 + v2.16.0/.1/.2 + v2.15.x + v2.13-v2.14 + thin single-plan folders. **Keep live:** v2.17.0, v2.18.0, v2.21.0, v2.22.0, v2.23.0, v3.0.0, `_deferred/`, the runbook, README.
- **Caution:** this moves ~20 folders that hold many of the 533 `release-plans/v...` references. Most referrers are *inside* the archived folders themselves (self-references that move together) or in historical release notes. Run the link-check; fix only the cross-references that break (live docs pointing into archived folders). This is the single highest-link-churn phase - do it as its own commit and lean on CI.
- **Verify:** CI link-check green; `release-plans/` active set is the 6 live folders + archive + deferred + runbook + README.

### Phase 5 - `efforts/` cleanup [ordered after 1; the largest single cleanup]
- **Delete:** 5 stub folders (F-38/39/40/41/42), 2 abandoned mis-scope folders (F-17-meeting-synthesis/, F-18-meeting-prep/), `prompt_todo_2026-03-21.md`.
- **Relocate to gitignored `_NOTES/efforts/`:** all `_discovery/`, `drafts/`, `_research/` content; the `.docx`; the two duplicated F-24 skill trees; Codex review-artifact copies.
- **Relocate `samples/`** content: confirm it is duplicated in `library/skill-output-samples/`; if so, delete; if any is unique, move to the library.
- **Fold + delete:** for shipped efforts, move the `specification.md` / `plan_*.md` into the matching `release-plans/vX.Y.Z/` (per the audit's mapping) then delete the effort folder, leaving the flat brief.
- **Archive to tracked `_archive/efforts/`:** `launch-mkdocs*.md`, the `organization-design` + `tracking-patterns` essays.
- **Flip statuses to Shipped** with the correct release: F-13, F-26, F-17/18/25/27/28, F-24, M-19, F-41, F-42.
- Update `efforts/README.md` Last-updated and add an `INDEX.md` (ID -> name -> status -> release -> issue).
- **Verify:** every `efforts/` entry is a flat `{ID}-{name}.md` (no nested folders); statuses match disk; CI link-check green.

### Phase 6 - Per-skill `HISTORY.md` backfill [independent of 1-5]
- Author `scripts/generate-skill-history.*`; generate 64 stubs; human spot-check the 26 multi-version skills.
- Update `utility-pm-skill-builder` (scaffold birth stub) and `utility-pm-skill-iterate` Step 7 (append, not gate).
- Update `skill-versioning.md` + `docs/reference/pm-skill-versioning.md`.
- **Verify:** 64 `HISTORY.md` exist; top row matches `metadata.version` for each; spot-checked skills show full history.

### Phase 7 - Backlog + issues reconciliation [independent of 1-6; see backlog.md]
- Close `#118`/`#119`; create-then-close issues for the F-17/F-18 work shipped issue-less; reconcile the efforts that already have issues (F-09 #120, M-14 #116, M-15 #117, D-05 #131); sweep effort-brief statuses.
- Create one milestone per release v2.8.0..v2.23.0 (closed) plus the next planned release (open); retire the 3 stale shells.
- Add `.github/ISSUE_TEMPLATE/effort.yml` + `skill-request.yml`.
- **Migrate M-23 / M-24 (defined only in `backlog-canonical.md`) into issues + briefs first**, then author `scripts/build-backlog-index.py`; generate `backlog.md` (banner: generated, do not edit); retire `backlog-canonical.md`.
- **Verify:** every skill on disk has exactly one issue whose state matches shipped/not-shipped.

### Phase 8 - Make conventions self-enforcing [ordered after 5, 6, 7]
- Flip `validate-skill-history` to enforcing + presence-required (after Phase 6 green).
- Add a CI guard: `efforts/` has no nested folders and every brief has a valid `Status`.
- Add a tag-time check: re-derive backlog from `gh` and diff against `backlog.md`.
- Add a CI guard: open issues with zero labels or no milestone are flagged.
- **Verify:** all new gates pass on the cleaned tree; intentionally break one to confirm it fails.

---

## 6. Risk, reversibility, and what to do first

**Reversibility.** Every phase is `git mv` / additive, so `git revert` restores any phase. Nothing is `git rm` except: 5 stub folders (content is a back-pointer), 2 abandoned mis-scope spec folders (originals already archived in `_NOTES`), one empty folder, one raw prompt file, and confirmed-duplicate `samples/`. All deletions are recoverable from git history.

**Highest-risk phase:** Phase 4 (release-plans archive) and Phase 5 (efforts cleanup) carry the most link churn. Mitigation: each is its own commit, run after the link-check CI is confirmed working, and verified green before proceeding.

**Recommended first move:** **Phase 1 alone.** Adding `docs/internal/README.md` + the `governance/`/`reference/` scaffold is pure addition, fixes the single worst finding (no index), and is risk-free. It can ship today, independent of every decision still in flight. Everything else can follow at the maintainer's pace.

**Order recommendation:** 1 -> 2 -> 3 -> 4 -> 5 (the IA cleanup), then 6 (HISTORY) and 7 (backlog) in parallel, then 8 (enforcement) last. Or cherry-pick: Phase 1 + Phase 7 (backlog reconciliation) deliver the most visible value fastest.

---

## 7. What this does NOT change

- Public `docs/` (the Astro site), `skills/` content, `library/` samples, `CHANGELOG.md`, `_agent-context/` - untouched except the `HISTORY.md` additions and the few governance-doc referrer updates.
- The `release-plans/` per-folder *contents* and the `vX.Y.Z/` folder names (D1).
- Any shipped release. This is internal-docs hygiene; it touches nothing users install.
