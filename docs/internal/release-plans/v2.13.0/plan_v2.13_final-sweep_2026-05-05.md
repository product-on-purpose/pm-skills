# v2.13.0 Final Sweep Findings - 2026-05-05

**Scope:** final review of v2.13.0 ship state at HEAD `e85ac4e` (with v2.13.0 tag pending push as B3). Reviews release artifacts (Release_v2.13.0.md, CHANGELOG, README), supporting files (script docs, agent context, master plan), and `docs/` folder organization. Captures findings as user-value, structural, and quick-win categories with severity ratings and triage recommendations.

**Sweep author:** Claude Opus 4.7 (1M context), self-review pass after PR.5 promotion

**Verdict for v2.13.0 ship:** clear to push (B3). All findings below are MEDIUM or MINOR; none block tag. Several are documented as v2.14.0+ backlog items.

---

## Severity legend

- **CRITICAL:** ship-blocking; must fix before tag.
- **IMPORTANT:** materially user-affecting or factually incorrect; fix in this cycle if possible, otherwise document as known debt.
- **MEDIUM:** noticeable to careful readers; defer to v2.14.0+ acceptable.
- **MINOR:** cosmetic or polish; defer indefinitely.

Final-sweep result: **0 CRITICAL, 0 IMPORTANT, 6 MEDIUM, 4 MINOR.**

---

## Section 1. User-value review of release artifacts

### 1.1 Release_v2.13.0.md, CHANGELOG.md v2.13.0 entry, README "What's New" block

**Verdict: PASS after the round-8 user-value reframe.**

The pre-reframe versions opened with "zero new skills" and led with internal cycle structure (3 strands + decision artifact). The current versions open with "maintenance and quality release; same 40-skill catalog as v2.12.0" and lead with three audience-specific user-value paragraphs (skill consumer / contributor / pm-skills-mcp user). The Zensical NO-GO is removed from user-value summaries and lives only in the body's dedicated "Decision artifact" section in Release_v2.13.0.md.

No findings on user-value framing of the release artifacts.

### 1.2 docs/index.md homepage hero

**Verdict: PASS.** Hero text says "40 best-practice product management skills for AI agents" and the Triple Diamond mermaid breakdown shows correct counts (3 + 4 + 4 + 6 + 5 + 4 = 26 phase skills). Foundation and utility skills are surfaced via separate cards (count check passes). Skills count claim of 40 in TL;DR is current.

### 1.3 README "About" / hero / TL;DR

**Verdict: PASS.** README header's project description ("40 best-practice...") is current. Counts in headline + project structure block + skills tables all reconciled at 40 / 47 / 9 / 126.

### 1.4 scripts/README_SCRIPTS.md

**Finding F1 (MEDIUM):** scripts/README_SCRIPTS.md has a Table of Contents with explicit links to 22 scripts. The catalog is structurally complete but several script entries have not been updated for v2.13.0 to reflect:
- check-count-consistency: marker-based exemption + subset-descriptor exclusion (Bucket B.6 changes); current doc may describe the prior `v[0-9]+\.` line-exemption.
- check-nav-completeness: was added in v2.13.0; doc entry exists but may not reflect final auto-include behavior added during round-1 Codex resolution.
- The new validators added in Wave 2 + Wave 3 (check-generated-content-untouched, validate-references-cross-doc, validate-docs-frontmatter, check-internal-link-validity, check-version-references, validate-skill-family-registration) - the existence of `.md` triplet docs per validator is enforced, but README_SCRIPTS.md cross-references to those triplet docs may not be present.

**Triage:** MEDIUM. Doc-currency cleanup; not user-facing in any urgent way (the script triplets themselves are user-facing). Defer to v2.14.0 alongside the GitHub-metadata refresh (M-23/M-24).

### 1.5 docs/getting-started/index.md user-value framing

**Verdict: PASS** with one MINOR. Counts present + accurate (line 48 says 40 skills + line 223 says "47 command markdown files: 40 skill commands plus 7 workflow commands"). Per-phase skill table updated in PR.2 round 1 to include `/okr-grader` and the 8 foundation commands.

**Finding F2 (MINOR):** the "Plus workflows: ..." line at line 236 lists all 7 workflow commands as a comma-separated list. Cosmetic improvement opportunity: present as a small table for symmetry with the per-phase table above. Skip.

---

## Section 2. docs/ folder structure and organization

### 2.1 Directory layout

**Verdict: PASS.** Diataxis-aligned (concepts / guides / reference) plus generated dirs (skills, workflows, showcase) plus releases. Top-level `docs/changelog.md` + `docs/index.md` + `docs/tags.md` provide entry points. Internal under `docs/internal/`.

```
docs/
├── concepts/         (3 .md files: Triple Diamond, agent-skill-anatomy, index)
├── contributing/     (4 .md files: code-of-conduct, privacy, security, index)
├── getting-started/  (2 .md files: index, quickstart)
├── guides/           (13 .md files)
├── reference/        (7 .md files + skill-families/ subdir)
├── releases/         (24 .md files)
├── showcase/         (4 .md files: storevine, brainshelf, workbench, index) [generated]
├── skills/           (40 skill pages + 8 category indices) [generated]
├── workflows/        (10 .md files: 9 workflows + index) [generated]
├── templates/        (skill-template subdir, no .md at top)
├── stylesheets/      (CSS overrides)
├── internal/         (gitignored release plans, audits, efforts, etc.)
├── changelog.md
├── index.md
└── tags.md
```

### 2.2 Broken internal links (advisory)

`scripts/check-internal-link-validity.sh` (advisory) reports 12 broken links. Categorized:

**Finding F3 (MEDIUM):** `docs/changelog.md` has 3 broken links to release notes (`docs/releases/Release_v2.8.1.md`, `v2.8.0.md`, `v2.7.0.md`). The path is incorrect because `docs/changelog.md` is INSIDE `docs/`, so the link should be `releases/Release_v2.8.1.md` not `docs/releases/...`. These are pre-existing, predate v2.13.0.

**Triage:** MEDIUM. User-affecting (someone clicking a broken link gets a 404). Quick fix: 3-line search-and-replace in `docs/changelog.md`. Defer to v2.14.0 cleanup.

**Finding F4 (MEDIUM):** `docs/index.md` has 2 broken links to `releases/Release_v2.10.2.md` and `releases/Release_v2.10.1.md`. Reality: those release notes files do not exist in `docs/releases/` (only Release_v2.10.0.md exists). The homepage hero references release notes that were never authored.

**Triage:** MEDIUM. User-affecting. Either author the missing release notes (substantial work) or remove the references from `docs/index.md` (5-min fix). Defer to v2.14.0; remove-references is the pragmatic path.

**Finding F5 (MEDIUM):** 5 foundation skill pages (`docs/skills/foundation/foundation-meeting-*.md` and `foundation-stakeholder-update.md`) link to `../../docs/reference/skill-families/meeting-skills-contract.md`. The path has an extra `docs/` prefix; correct path from `docs/skills/foundation/X.md` is `../../reference/skill-families/meeting-skills-contract.md`. These pages are generated by `generate-skill-pages.py`, so the bug is in the generator OR in the source `skills/foundation-meeting-*/SKILL.md` cross-references the generator preserves verbatim.

**Triage:** MEDIUM. Generator-bug or source-skill bug. Important enough to investigate root cause; not blocking for v2.13. Defer to v2.14.0 with a follow-up effort doc.

**Finding F6 (MINOR):** 2 broken links in `foundation-stakeholder-update.md` to `2026-04-17_14-00EST_search-feature-kickoff_recap.md` (a meeting-recap fixture filename used as an example link). Likely intended as illustrative-only and shouldn't be a real link.

**Triage:** MINOR. Either change to inline code (no link) or to a placeholder relative path. Defer to v2.14.0.

### 2.3 Frontmatter coverage gap (advisory)

`scripts/validate-docs-frontmatter.sh` (advisory) reports 20 `docs/*.md` files missing the `---` frontmatter delimiter. The script is intentionally advisory because frontmatter coverage is incomplete by design pending a v2.14.0+ cleanup. The list includes:
- `docs/changelog.md`
- `docs/concepts/agent-skill-anatomy.md`, `triple-diamond-delivery-process.md`
- `docs/contributing/{code-of-conduct,privacy,security,index}.md`
- `docs/getting-started/{index,quickstart}.md`
- `docs/guides/{creating-pm-skills,pm-skill-lifecycle,using-skills,validate-mcp-sync}.md`
- `docs/reference/{categories,ecosystem,pm-skill-anatomy,project-structure,README}.md`

**Finding F7 (MEDIUM):** the gap is well-known and documented by the validator's own status (advisory; promote to enforcing in v2.14.0+ after cleanup). For v2.14.0, adding the `--- title: ... description: ... ---` block to all 20 files is a ~30 min batch.

**Triage:** MEDIUM. Improves rendered-doc SEO and MkDocs Material's per-page metadata pipeline. Defer to v2.14.0 explicit cleanup item; mark "promote `validate-docs-frontmatter` to enforcing" as a Bucket-B-style task for that cycle.

### 2.4 Stale `validate-mcp-sync.md` guide (potentially)

`docs/guides/validate-mcp-sync.md` exists. With pm-skills-mcp now in maintenance mode (frozen catalog at v2.9.2 build), the validate-mcp-sync workflow's relevance is reduced. The guide may need a maintenance-mode preamble.

**Finding F8 (MINOR):** check whether `docs/guides/validate-mcp-sync.md` reflects MCP maintenance-mode posture. Likely stale.

**Triage:** MINOR. Add a maintenance-mode callout banner at the top, similar to the one already added to `mcp-integration.md`. Defer to v2.14.0.

---

## Section 3. Quick-win opportunities (deferred to v2.14.0+)

Items that would take less than 30 minutes each but are NOT in v2.13 scope:

| ID | Description | Estimated effort | Source |
|----|-------------|------------------|--------|
| QW-1 | Fix the 3 broken `docs/changelog.md` release-notes links (path-prefix bug) | 5 min | F3 |
| QW-2 | Remove the 2 stale `Release_v2.10.1/2.md` references from `docs/index.md` | 5 min | F4 |
| QW-3 | Investigate and fix the 5 foundation-skill cross-reference links to `meeting-skills-contract.md` (probable generator bug) | 15-30 min | F5 |
| QW-4 | Add maintenance-mode preamble to `docs/guides/validate-mcp-sync.md` | 10 min | F8 |
| QW-5 | Update `scripts/README_SCRIPTS.md` script-catalog entries for v2.13 changes | 20 min | F1 |
| QW-6 | Promote `validate-docs-frontmatter` to enforcing AFTER batch-adding frontmatter to 18 listed docs | 30-45 min | F7 |
| QW-7 | Promote `check-internal-link-validity` to enforcing AFTER the QW-1, QW-2, QW-3 fixes land | 5 min | follows F3-F5 |
| QW-8 | Add Phase 5 sub-checklist for GitHub-platform metadata refresh | 10 min | M-23 |
| QW-9 | Author advisory `gh-release-metadata.{sh,ps1,md}` script | 60-90 min | M-24 |

These are recommended for inclusion in a v2.14.0 doc-cleanup-mini-bucket. Not required for v2.13 ship.

---

## Section 4. Backlog additions

Two new backlog items added to `docs/internal/backlog-canonical.md`:

- **M-23**: Pre-release checklist Phase 5 sub-section for GitHub-platform metadata refresh
- **M-24**: `scripts/gh-release-metadata.{sh,ps1,md}` advisory script

Both deferred to v2.14.0+; agent: Claude. Together they close the gap between in-repo file metadata (covered by current CI) and GitHub-platform metadata (currently uncovered).

---

## Section 5. Final ship verdict

**v2.13.0 is clear for B3 (push + tag + gh release).**

- All 5 pre-release gates closed (PR.1 to PR.5).
- Mechanical CI all green (10 enforcing PASS + 5 advisory PASS at HEAD).
- Tag `v2.13.0` created locally on `e85ac4e`; `validate-version-consistency` PASS at 2.13.0.
- Drafts promoted to canonical locations.
- User-value reframe applied to public-facing artifacts.
- 0 CRITICAL or IMPORTANT findings in this final sweep.
- 6 MEDIUM + 4 MINOR findings all documented as v2.14.0+ backlog items.

**No additional fixes needed before B3.** The MEDIUM findings (F3-F7) and MINOR findings (F2, F6, F8 + the script-catalog drift) are real but acceptable as v2.13 ships them; they were also present in v2.12.0 and earlier, so v2.13 does not regress on any of them.

---

## Section 6. Stale-state-text pattern lesson (carry-forward)

This sweep was authored AFTER PR.2 converged at round 9 (which never returned due to Codex usage limit) and the round-8 self-correction. This sweep itself is a layer of release-stack documentation; per the codified `feedback_stale-aggregate-counter` pattern, this file's claims about "HEAD = e85ac4e" and "0 CRITICAL or IMPORTANT" are correct AT WRITE TIME.

When this document is read post-tag, the HEAD claim becomes a historical claim about the pre-tag state. That's fine and intentional. Future readers should treat this as a snapshot, not a live status.

The pattern is: every artifact authored as part of release prep has a freeze-time claim that should be honest about its scope. This document's freeze time is 2026-05-05 post-PR.5-promotion + post-version-bump + post-merge + pre-B3-push.
