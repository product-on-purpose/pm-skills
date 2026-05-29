# Deferred: skills short-name rename (the "hard rename")

> **Status: DEFERRED on 2026-05-29.** This is a complete, executability-audited plan to rename all 63 skills to short, prefix-free names. It was deferred in favor of a much lighter path for v2.22.0 (delete the duplicate command wrappers, keep the existing skill names). The work is preserved here intact and is ready to revive as its own future release if short names are ever wanted.
>
> **Git anchors:** the audit-hardened state is committed at `c0e6e1c` and tagged `archive/short-name-rename` on branch `release/v2.22.0`. `git show archive/short-name-rename` recovers the exact snapshot.

---

## 1. What this initiative was

Every PM skill ships with a phase/classification prefix in its name (`foundation-okr-writer`, `deliver-prd`, `tool-note-and-vote`). This plan would have:

- **Renamed all 63 skills to short canonical names** (strip the leading `define-/deliver-/develop-/discover-/foundation-/iterate-/measure-/tool-/utility-` token; keep the meaningful `pm-` prefix and the `design-sprint-`/`foundation-sprint-` methodology stems). `naming-map.md` is the complete old -> new table (collision-checked, all 63 unique).
- **Deleted the ~63 hand-maintained command wrappers**, keeping only the 10 `workflow-*` orchestrator commands.
- **Added a Codex `.codex-plugin/plugin.json` manifest** so Codex discovers the skills (fixes the "No plugin skills" install bug).
- Shipped as a **repo MINOR** (`v2.22.0`) under the recorded stance that skill *invocation names* are outside the SemVer-governed surface (the install path + plugin identity are the governed contract), while **each renamed skill bumps its own `metadata.version`** (48 at `1.0+` -> next major; 15 at `0.x` -> `0.2.0`). See `implementation-plan.md` section 2a.

The goal was two things bundled: (a) remove the double-naming in the `/` menu, and (b) make the canonical names short and consistent.

## 2. The journey and the learnings (why this is being deferred)

This plan was hardened hard before it was deferred. The key learnings, in order:

1. **SemVer reconsideration.** A hard rename removes names users may have in scripts, which is "breaking" by a plain reading. The repo's own `docs/internal/skill-versioning.md` says a command-name change is a per-skill major. The resolution: the repo version stays MINOR (names declared outside the governed surface), and the per-skill versions absorb the "breaking" signal (section 2a). Defensible, but it leans on a self-declared API scope.
2. **D4 taxonomy decision (keep two metadata fields).** The original draft folded `metadata.phase` into `metadata.classification` (one 9-value field). That fold added a 30-skill frontmatter migration, a lint-enum widening, and a schema rewrite while fixing nothing the rename actually breaks. **Rejected.** The two fields stay; only the doc generators change (route by `phase` else `classification`, reading frontmatter instead of the name prefix).
3. **Executability audit (2026-05-29, 8 agents).** Verdict `executable_with_fixes`. It found real gaps three prior Codex passes missed, most importantly a **THIRD doc generator** (`scripts/generate-showcase.py`) that hardcodes all 25 prefixed skill names and is enforced by `check-generated-content-untouched.sh` - it would have hard-failed the release. Also: `generate-workflow-pages.py` routes by name-string (links to non-existent folders post-rename), a false pre-execution gate item, and a set of user-facing doc trees the checklist omitted. All findings are folded into `implementation-plan.md`.
4. **The blast-radius realization (the actual reason for deferral).** A reference scan found ~1,457 prefixed-name occurrences across ~250 files. The rename touches 63 skill dirs, ~186 sample files across 59 dirs, three doc generators, every cross-reference, and forces a full doc regeneration. **Almost all of that blast radius exists to deliver the SHORT NAMES (a preference), not to fix the duplication (the actual bug).** The duplication is fixable by simply deleting the wrappers and keeping the existing skill names - at roughly a tenth of the work and risk. The Codex discovery bug is fixed by the manifest, which is independent of the rename.

## 3. The decision

For **v2.22.0**, take the lighter path: delete the duplicate wrappers, keep the skill names, add the Codex manifest. That solves the real problems (menu duplication + Codex discovery) with ~10% of the blast radius, is trivially reversible, and (bonus) keeps the longer prefixed names, which are *safer* against the Codex flat-namespace collision risk that short names introduce (see `naming-impact-analysis.md` and the project's `reference_codex-flat-skill-namespace` note).

**The trade-off, stated plainly:** the lighter path keeps the long prefixed names as canonical. Reviving THIS initiative is how you would get the short, clean names - at the cost of the large blast radius and the need to re-run the load-bearing spike. At the repo's current early-adoption stage, the polish was judged not worth the risk now.

## 4. What is preserved in this folder

| File | What it is |
|---|---|
| `plan_short-name-rename.md` | The release plan (was `plan_v2.22.0.md`): decision briefs (D-V31-1..6 + D4), acceptance criteria, rollback. |
| `implementation-plan.md` | The executor's checklist, **fully audit-hardened**: phased steps, the exhaustive file checklist (section 2), per-skill version policy (section 2a), the pending-decision register (D1-D4), and the Codex-review remediation (section 7). |
| `command-skill-naming-standard.md` | The naming rule + validator spec (the no-prefix rule, exemptions, the validator design). |
| `naming-map.md` | The complete 63 old -> short name table, collision-checked. The migration source of truth. |
| `naming-impact-analysis.md` | The blast-radius sizing (churn classes, what must NOT be touched). |
| `release-comms-drafts.md` | Changelog entry + community post + README change-spec drafts. |
| `release-notes-draft.md` | The public release notes draft (was `docs/releases/Release_v2.22.0.md`): migration table + FAQ. |

## 5. Readiness if revived

- The plan is **executable-grade**: Approach 1 (D4) locked, every confirmed audit gap folded in.
- **One load-bearing gate was never run on a live install:** the Phase 1.5 one-skill spike. Note that on 2026-05-29 the underlying question (OQ-1: does a directly-invoked skill receive trailing arguments?) was largely resolved from the Claude Code docs: **skills support `$ARGUMENTS`, and commands have been merged into skills** (both create `/name` and behave the same). So the spike is now closer to a confirmation than an open risk, but it has not been executed end-to-end.
- The five open rulings recorded in the plan (Codex manifest URL form + required fields, `skills-manifest.yaml` schema, showcase sweep scope, `PHASE_FLOWS` boilerplate) are still open and small.

## 6. Reinstatement prompt (copy-paste to revive)

```
Revive the deferred pm-skills short-name rename initiative.

CONTEXT: On 2026-05-29 we deferred the full hard-rename of all 63 skills to short
names in favor of a lighter v2.22.0 (we deleted the duplicate command wrappers and
kept the existing skill names). The complete, executability-audited rename plan is
preserved at docs/internal/release-plans/_deferred/2026-05-29_skills-short-rename/
(also at git tag archive/short-name-rename). Read its README.md first, then
plan_short-name-rename.md and implementation-plan.md.

WHAT YOU ARE REVIVING: rename 63 skills to short prefix-free names (naming-map.md is
the old->new table), delete the ~63 non-workflow command wrappers, keep the 10
workflow-* commands, add the .codex-plugin manifest. Ships as a repo MINOR with
per-skill metadata.version bumps (impl-plan section 2a). Taxonomy stays two fields
(D4: metadata.phase XOR metadata.classification, NO fold); only the generators change.

LOCKED, DO NOT REOPEN: D4 keep-two-fields; per-skill version policy (48 at 1.0+ ->
next major, 15 at 0.x -> 0.2.0); the audit punch-list is already folded into
implementation-plan.md (THREE generators incl. generate-showcase.py; generators route
by frontmatter not name; Section 3 freeze denominator for the Phase 4 grep).

FIRST MOVES:
1. Renumber this from v2.22.0 to the next available version (v2.22.0 shipped the
   lighter wrapper-deletion path; check the latest tag and pick the next free number).
   Move this folder back to docs/internal/release-plans/<new-version>/ and update the
   plan title + acceptance.
2. Run the Phase 1.5 one-skill spike on a REAL Claude Code install (rename one skill,
   delete its wrapper, confirm /pm-skills:<short> resolves and receives arguments).
   The docs say skills support $ARGUMENTS, but confirm end-to-end before the mass rename.
3. Resolve the five open rulings listed in the plan.
4. Then execute Phase 2 -> 5 per implementation-plan.md, in the audit's recommended
   execution order (Step 1 patch is already applied; start at the CI/generator build).

CAUTION: this is high-blast-radius (~250 files, 3 generators, 186 samples, full doc
regen). The staged sequencing + validators are the safety net. Branch is local-only;
push and registry re-pin are separate decisions.
```
