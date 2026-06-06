# Cross-LLM Review: v2.10.0 Release Plan . Utility & Skill Expansion

**Document:** `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md`
**Document type:** impl-plan
**Date:** 2026-04-11
**Requestor:** Claude Opus 4.6 | **Reviewer:** Codex (GPT-5.4) | **Human:** jprisant

---

## Reviewer Assessment

> **Reviewer - Codex (2026-04-11):** Reviewed the release plan, F-24 plan/specification, draft skill artifacts, current version files, local CI scripts, and adjacent MCP repo state. I found one release-boundary blocker, several major design gaps in F-24's updater safety contract, and multiple stale-count/cross-reference issues that should be resolved before treating v2.10.0 as ready for implementation.

| Severity | Count |
|----------|-------|
| Blocker  | 1     |
| Major    | 12    |
| Minor    | 11    |
| Note     | 1     |

## Requestor Analysis & Proposed Actions

> **Requestor - Claude Opus 4.6 (2026-04-11):** I agree with 23 of 25 findings. The Blocker is a genuine release-boundary inconsistency (F-16/F-19 are in the v2.9.1 tag but the plan claims them for v2.10.0). 10 of 12 Majors are valid gaps - the most impactful are the "atomic" claim (S5), the source-archive ambiguity (S5), and the file-scope underspecification (S8). Two Majors I'd reclassify as Minor: the stale counts in S1 are advisory CI findings, not blockers to the plan. One Minor I'd upgrade: the PowerShell gitignore regex (S2) is a real bug that should be fixed before relying on Windows CI.

### Decisions for jprisant

| # | Question | Context | Section |
|---|----------|---------|---------|
| 1 | **Release boundary: Is v2.10.0 just F-24 now?** The Blocker found that F-16/F-19 shipped under the v2.9.1 tag. The plan claims them for v2.10.0, but they're already released. If v2.10.0 is reframed as F-24 only, it's a much smaller release (1 new skill, not 3). **Recommendation:** Reframe v2.10.0 as F-24 + release cleanup. Move F-16/F-19 to the Shipped table under v2.9.1. | S1 Blocker | S1 |
| 2 | **Source artifact: GitHub source tarball or built release ZIP?** This gates the file scope, validation, and the entire update mechanism. **Recommendation:** Use the built release ZIP (from `build-release.sh`). It's curated - excludes `docs/internal/`, includes only what end users need. The source tarball includes everything. | S5, S8 | S5 |
| 3 | **"Atomic" claim: Downgrade to "validated-before-copy"?** Codex is right that a mid-copy failure leaves mixed state. True atomicity requires directory swap. **Recommendation:** Change wording to "validated-before-copy with backup" - honest about what it actually does. | S5 | S5 |
| 4 | **MCP for F-24: Exclude from embed?** Codex recommends excluding. The skill requires network + file writes which MCP can't provide. **Recommendation:** Exclude `utility-update-pm-skills` from MCP embed in v1. Consider a read-only `--status` exposure later. | S10 | S10 |

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer. Your job is to find problems, inconsistencies, gaps, and risks in this release plan and the F-24 feature design. You are not here to validate - you are here to pressure-test.

**Key principles:**
- Disagreement is more valuable than agreement
- If you find nothing wrong in a section, say so explicitly and explain WHY - don't skip it
- If you find nothing wrong anywhere, that's suspicious - look harder
- Rate your confidence - low-confidence concerns are still worth noting
- Cite specific evidence for every finding (section numbers, quotes, file paths)

**Source documents:**

| Document | Path | Role |
|----------|------|------|
| v2.10.0 release plan (primary) | `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md` | Document under review |
| F-24 effort brief | `docs/internal/efforts/F-24-update-pm-skills.md` | Effort-level summary |
| F-24 plan (detailed) | `docs/internal/efforts/F-24-update-pm-skills/plan_update-pm-skills.md` | Design plan with 20 acceptance criteria, CI, implementation plan |
| F-24 specification | `docs/internal/efforts/F-24-update-pm-skills/specification.md` | Technical specification (design principles, flow, contracts) |
| F-24 draft SKILL.md | `docs/internal/efforts/F-24-update-pm-skills/drafts/skills/utility-update-pm-skills/SKILL.md` | Draft skill instructions |
| F-24 draft TEMPLATE.md | `docs/internal/efforts/F-24-update-pm-skills/drafts/skills/utility-update-pm-skills/references/TEMPLATE.md` | Draft report output template |
| F-24 draft EXAMPLE.md | `docs/internal/efforts/F-24-update-pm-skills/drafts/skills/utility-update-pm-skills/references/EXAMPLE.md` | Draft worked example |
| F-24 draft command | `docs/internal/efforts/F-24-update-pm-skills/drafts/commands/update-pm-skills.md` | Draft slash command |
| F-24 web session discovery | `docs/internal/efforts/F-24-update-pm-skills/_discovery/2026-04-09_claude-web-session/` | Original web session output (reference only - plan supersedes) |
| F-16 shipped skill | `skills/utility-mermaid-diagrams/SKILL.md` | Already merged - review for cross-cutting consistency |
| F-19 shipped skill | `skills/utility-slideshow-creator/SKILL.md` | Already merged - review for cross-cutting consistency |
| CI workflows | `.github/workflows/validation.yml` | CI pipeline with 16 checks |
| CI workflows | `.github/workflows/validate-plugin.yml` | Plugin packaging validation |
| Version files | `.claude-plugin/plugin.json`, `marketplace.json` | Version sources (currently 2.9.1) |
| Skill versioning governance | `docs/internal/skill-versioning.md` | SemVer rules, skills-manifest, HISTORY.md conventions |
| Existing scripts | `scripts/README_SCRIPTS.md` | Script catalog (16 entries as of v2.9.1) |

**Finding format:** Use this exact format for every finding:

- [Severity | Confidence] Description with evidence woven in.
  Source says "X" (Section N) but also says "Y" (Section M). → Recommendation.

**Severity definitions:**
- **Blocker** - Must resolve before proceeding. Will cause incorrect results or structural failure.
- **Major** - Should resolve before proceeding. Significant gap that causes confusion or rework.
- **Minor** - Can defer. Real issue but won't prevent the work from succeeding.
- **Note** - Observation or suggestion. No action required but worth considering.

---

## Document Under Review

The release plan is ~285 lines. It orchestrates three efforts (F-16 shipped, F-19 shipped, F-24 ready for implementation) into a v2.10.0 release. F-16 and F-19 are already merged to main; the remaining work is F-24 (promote drafts, cross-cutting updates, release artifacts) plus MCP alignment.

**Important context:**
- v2.9.1 shipped on 2026-04-10 with D-05 (workflows guide), M-20 (count consistency CI), and 6 new CI scripts. The v2.9.1 CI infrastructure (count consistency, version consistency, script docs) now applies to this release.
- F-17 (Meeting Synthesis) and F-18 (Meeting Prep) were originally planned for v2.10.0 but have been deferred to v2.11.0.
- F-24 is the only remaining implementation work. Its drafts are complete but not yet promoted to canonical skill/command locations.

### Review Scope

Review the release plan **AND** the F-24 feature design comprehensively. This is a combined release plan + feature review.

**Part 1: Release Plan Review**

Validate the release plan for orchestration correctness:

1. The three-effort structure (F-16 shipped, F-19 shipped, F-24 ready) is consistent - no gaps between shipped and pending work.
2. The prerequisites section accurately reflects current state (v2.9.1 shipped, P1 version fix done, P2 gitignore done).
3. The commit strategy is sound - F-24 prerequisites, skill content, cross-cutting updates, CI, and release artifacts are in the right order.
4. The verification plan is sufficient - every shipped and pending effort has appropriate CI and manual checks.
5. The cross-cutting updates table for F-24 is complete - no files are missing that would need count updates.
6. The MCP impact section correctly identifies the decision point (F-24 may not be suitable for MCP).
7. The open questions are actionable and correctly scoped.
8. The CHANGELOG entry (currently under `[Unreleased] - v2.10.0`) accurately reflects what shipped in earlier commits and what F-24 will add.

**Part 2: F-24 Feature Design Review**

Validate the F-24 skill design for correctness, completeness, and executability:

9. **SKILL.md draft** - Is the 6-step flow complete? Are there gaps between steps? Is the file scope table accurate? Does the output contract cover all necessary guarantees? Is the quality checklist sufficient?
10. **Flags** - The skill defines three modes (`--status`, `--report-only`, default). Are these well-differentiated? Are there edge cases where modes overlap or produce confusing behavior?
11. **Version detection** - The skill reads from the first available source (plugin.json → marketplace.json → CHANGELOG → git tags). Is this priority order correct? What happens if the first source is present but empty or malformed?
12. **Atomic update** - The download → validate → copy strategy. Is the validation (check for `skills/`, `commands/`, `AGENTS.md`, `plugin.json`) sufficient to catch a corrupted archive? What if the archive has the right structure but wrong content?
13. **TEMPLATE.md** - Does the report template have all required sections? Is the value-delta structure (headline, new skills, updated skills, opportunities) workable in practice? How does it handle multi-version jumps (e.g., v2.7.0 → v2.10.0)?
14. **EXAMPLE.md** - Is the worked example realistic? Does it demonstrate the template correctly? Does the report-only example adequately show the difference from the completion report?
15. **Acceptance criteria** - Are the 20 ACs (plan_update-pm-skills.md Section 7) testable? Are there missing scenarios? Do any ACs contradict each other or the SKILL.md?
16. **FAQ section** - Are the 6 FAQs the right questions? Are there obvious user questions missing?
17. **File scope** - The "never overwritten" list includes `docs/internal/`, `_NOTES/`, `_pm-skills/`. Is this complete? Should `.github/` be excluded? What about `library/` - it's in the "updated" list but does it actually change between releases?
18. **Degraded mode** - The no-network path provides manual instructions and stops. Is this sufficient? Should it also handle "network works but GitHub API returns an error" (rate limiting, 404, etc.)?
19. **Backup strategy** - Backups go to `_pm-skills/backups/v{version}_{date}/`. Is the naming collision-proof? What happens if the user runs the updater twice on the same day from the same version?
20. **MCP advisory** - The skill detects `../pm-skills-mcp/` and shows the embedded version. What if the MCP repo exists but has no `pm-skills-source.json`? What if the sibling directory is named differently?
21. **Command file** - Does the command correctly reference the skill and template? Does it handle all three flags?
22. **Cross-reference consistency** - Do the plan, specification, SKILL.md, TEMPLATE.md, EXAMPLE.md, and command file all agree on: flag names, step numbering, file paths, directory names, report naming convention?

---

## Findings

### 1. Release Plan Orchestration

*Verifying that the release plan correctly orchestrates F-16 (shipped), F-19 (shipped), and F-24 (pending) with no gaps. Key concerns: prerequisites marked as "Not started" that are actually complete, stale commit history, and whether the verification plan accounts for work that already shipped in v2.9.1.*

> **Disposition:** [blank - human fills in: accept / reject / defer]

**Reviewer - Codex (2026-04-11):**

- [Blocker | High] The release boundary is internally inconsistent. `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md` says v2.9.1 shipped only D-05/M-20 and that v2.10.0 scope is F-16 + F-19 + F-24 (Context), while the local `v2.9.1` tag is at `HEAD` and `git ls-tree v2.9.1:skills` already contains `utility-mermaid-diagrams` and `utility-slideshow-creator`; `CHANGELOG.md` still lists F-16 and F-19 under `[Unreleased] -- v2.10.0`. -> Decide whether v2.9.1 really shipped F-16/F-19; if yes, reframe v2.10.0 as F-24 plus release cleanup, and move/correct the changelog. If no, investigate the tag/release artifact before proceeding.

- [Major | High] The verification/cross-cutting plan understates existing public-doc drift. The release plan says docs count consistency "Must pass" and that count consistency CI now validates the release (CI That Applies), but local `scripts/check-count-consistency.ps1` reports stale counts in `CLAUDE.md`, `README.md`, `docs/agent-skill-anatomy.md`, `skills/utility-pm-skill-builder/SKILL.md`, and its example. -> Add these files to the v2.10.0 cross-cutting/hygiene list or explicitly downgrade them as deferred advisory findings.

- [Minor | High] The F-24 design link says "15 acceptance criteria" while `plan_update-pm-skills.md` has AC-1 through AC-20. Source says "[15 acceptance criteria]" in the release plan's F-24 skill-files section, but Section 7 of the F-24 plan defines 20 ACs. -> Fix the link text so downstream reviewers know AC-16 through AC-20 are in scope.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S1 Blocker (release boundary):** Agree. This is a genuine inconsistency. The v2.9.1 tag sits at `d0839dc` which includes all commits since v2.9.0 - that means F-16 (`06af8fb`) and F-19 (`eabd78d`) are part of v2.9.1, not v2.10.0. The CHANGELOG still lists them under `[Unreleased] - v2.10.0` which is wrong. Fix: move F-16/F-19 into the v2.9.1 CHANGELOG section (they shipped there), reframe v2.10.0 as F-24 + any cleanup. This changes v2.10.0 from a 3-skill release to a 1-skill release. See Proposed Actions #1.

**Re S1 Major (stale counts):** Agree the counts are stale, but reclassify as **Minor**. These are advisory CI findings that will surface when F-24's cross-cutting updates run `check-count-consistency`. They should be on the hygiene list but don't block the plan. See Proposed Actions #2.

**Re S1 Minor (AC count):** Agree. Simple text fix - "15" should be "20". See Proposed Actions #3.

---

### 2. F-24 Prerequisites Status

*Verifying that the F-24 prerequisites (P1 version mismatch fix, P2 gitignore) are accurately reflected. The release plan says "Not started" for both, but both were completed and committed in `adae48f` (2026-04-09) and shipped in v2.9.1. The CI scripts that enforce these (validate-version-consistency, validate-gitignore-pm-skills) are also already in place.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] P1/P2 status is stale across the release plan and F-24 brief. The release plan's F-24 Prerequisites table says P1 version mismatch and P2 `_pm-skills/` gitignore are "Not started"; `docs/internal/efforts/F-24-update-pm-skills.md` repeats plugin `2.9.0` vs marketplace `2.8.2`. Current `.claude-plugin/plugin.json` and `marketplace.json` both report `2.9.1`, and `.gitignore` contains `_pm-skills/`. -> Mark P1/P2 complete where appropriate and replace old version numbers with the current `2.9.1` state.

- [Major | Medium] The Windows gitignore validator currently false-fails despite `_pm-skills/` being present. `.gitignore` contains `_pm-skills/`, but `pwsh -File scripts/validate-gitignore-pm-skills.ps1` returns "FAIL: _pm-skills/ is not in .gitignore"; the PowerShell regex uses `(?m)^_pm-skills(/?)$`, which does not tolerate CRLF line endings as written. -> Fix the PowerShell check, then re-run it before relying on P2 as validated on Windows CI.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S2 Major (stale P1/P2 status):** Agree. Both are complete - the plan just wasn't updated. Fix: mark P1/P2 as complete, update version references to 2.9.1. See Proposed Actions #4.

**Re S2 Major (PowerShell gitignore regex):** Agree and **upgrade to Blocker-adjacent** - if Windows CI false-fails, we can't trust the gitignore check on that platform. The regex `(?m)^_pm-skills(/?)$` doesn't handle CRLF. Fix: use `-Raw` content with a CRLF-tolerant pattern or line-by-line matching. See Proposed Actions #5.

---

### 3. F-24 Skill Design . Flow Completeness

*Verifying that the 6-step flow (pre-flight → version comparison → preview → confirmation → update → post-update) has no gaps. Key concerns: what happens between steps if the user's environment changes, whether the degraded mode paths (no network, up-to-date, user-declines) all terminate cleanly, and whether the quality checklist at the end is reachable from every flow path.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The required user-facing guide is not in the implementation task list. The release plan's F-24 skill-files table includes `docs/guides/updating-pm-skills.md` as "Not started", and AC-20 requires it to exist, be linked from SKILL.md, and be listed in mkdocs navigation; the F-24 implementation steps I1-I9 never include writing that guide. -> Add an explicit implementation task for the guide and mkdocs nav, or remove/defer AC-20.

- [Minor | Medium] Degraded mode only defines "no network", not remote/API failure with network present. The SKILL.md draft says if network access fails, provide manual instructions and stop; the plan's degraded-mode decision says "no-network path only". It does not specify behavior for GitHub API rate limiting, a missing latest release, a 404 release asset, or malformed release metadata after connectivity succeeds. -> Add a fallback path for "network reachable but latest-release fetch unusable" and decide whether to try `gh`, `git ls-remote`, or manual instructions next.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S3 Major (guide missing from implementation tasks):** Agree. AC-20 requires the guide but no I-task creates it. Fix: add I10 to the implementation plan for `docs/guides/updating-pm-skills.md`. See Proposed Actions #6.

**Re S3 Minor (degraded mode gaps):** Agree. The current degraded mode only handles total network failure. GitHub API errors (rate limiting, 404, malformed response) after connectivity succeeds are unhandled. Fix: add a fallback chain in Step 1 - try GitHub API, if it fails try `gh` CLI, if that fails try `git ls-remote`, if all three fail then enter degraded mode with manual instructions. This is already partially in the SKILL.md but not explicit enough as a fallback chain. See Proposed Actions #7.

---

### 4. F-24 Skill Design . Version Detection & Comparison

*Verifying that the version detection priority chain (plugin.json → marketplace.json → CHANGELOG → git tags) is robust. Key concerns: malformed version fields, empty files, version format inconsistencies (with/without "v" prefix), and whether semver comparison handles pre-release versions correctly.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] Version normalization and malformed-source behavior are underspecified. The F-24 plan says local version comes from plugin.json -> marketplace.json -> CHANGELOG -> git tags and "first match wins"; plugin/marketplace values are bare SemVer like `2.9.1`, while changelog and tags use `v2.9.1`. The draft SKILL.md does not say to normalize optional `v` prefixes, trim whitespace, reject empty strings, catch invalid JSON, or continue to the next source when the first source is present but malformed. -> Define a version parser contract: normalize `v?X.Y.Z`, skip invalid/empty sources with a warning, and only fall back to `0.0.0` after all sources fail.

- [Minor | Medium] The design's "first match wins, no cross-checking" rule conflicts with the post-update smoke test's stronger expectations. The local-version decision says no cross-checking, while the smoke test requires plugin.json, marketplace.json, and CHANGELOG.md to all reflect the new version; CI currently hard-fails only plugin vs marketplace. -> Keep first-match behavior for update selection if desired, but surface a non-blocking warning when lower-priority sources disagree, especially CHANGELOG or tags.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S4 Major (version normalization):** Agree. The skill says "first match wins" but doesn't specify how to handle `v` prefix, empty strings, invalid JSON, or whitespace. Fix: add a version parser contract to SKILL.md: "Normalize by stripping optional `v` prefix and trimming whitespace. If a source is present but yields an empty or non-semver string, skip it with a warning and try the next source. Fall back to `0.0.0` only after all sources fail." See Proposed Actions #8.

**Re S4 Minor (first-match vs smoke-test tension):** Agree this is a real design tension but keep as Minor. The first-match rule is for *determining what to update*, while the smoke test is for *validating the result*. They serve different purposes. Fix: add a note in SKILL.md clarifying: "Version detection uses first match. Post-update smoke test verifies all sources agree - a mismatch warning here suggests a release packaging issue, not a skill error." See Proposed Actions #9.

---

### 5. F-24 Skill Design . Atomic Update & Archive Validation

*Verifying that the download-to-temp → validate → copy strategy is sufficient. Key concerns: what constitutes a valid archive (just directory existence? file counts? content checks?), what happens if the copy step partially fails, and whether cleanup of the temp directory happens on all exit paths (success, failure, user cancellation).*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The update flow claims atomic writes, but the implementation contract is not atomic after copy begins. The specification says "File writes are all-or-nothing"; AC-8 only guarantees no writes if download or validation fails, then the SKILL.md says "Overwrite in-scope files" directly into the install root. A disk-full, permission, antivirus lock, or interrupted copy can still leave mixed old/new files. -> Either change the claim from "atomic" to "validated-before-copy plus backup", or specify a real atomic strategy such as staging to a sibling directory and swapping/renaming with recovery instructions for mid-copy failure.

- [Major | High] The source archive is ambiguous and may not contain the files the updater promises to write. The F-24 plan says "GitHub release archive download"; the repo's `scripts/build-release.*` artifact stages `skills/`, `commands/`, `_workflows/`, `library/`, `scripts/`, `.claude-plugin`, selected docs, and top-level docs, but not `marketplace.json` or `.github/`. The F-24 file scope says `marketplace.json` is updated and the smoke test checks it. -> Specify whether the updater uses GitHub's tag source archive or the built release ZIP asset; then align validation and file scope with the chosen artifact.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S5 Major (not truly atomic):** Agree. Codex is right - once the copy begins, a mid-copy failure leaves mixed state. True atomicity would require staging to a sibling directory and renaming, which adds significant complexity. Fix: change the wording from "atomic" to "validated-before-copy with backup." The backup (if accepted) provides the recovery path. Add error recovery guidance for mid-copy failure: "If the update fails during file copy, restore from backup." See Proposed Actions #10. Requires human decision #3.

**Re S5 Major (source archive ambiguity):** Agree. This is the most impactful design gap. The skill says "release archive" without specifying whether that's the GitHub source tarball (contains everything including `docs/internal/`) or the built release ZIP (curated, excludes internal docs). Fix: specify the built release ZIP as the source. It's what `build-release.sh` produces, it's what the release workflow publishes, and it matches the file scope table. The source tarball would require additional exclusion logic. See Proposed Actions #11. Requires human decision #2.

---

### 6. F-24 Skill Design . Report Template & Value Delta

*Verifying that the TEMPLATE.md is complete, the value-delta derivation is specified well enough to produce consistent results, and the EXAMPLE.md demonstrates the template faithfully. Key concerns: multi-version jumps, the "Opportunities" section requiring creative synthesis (is this reliably producible?), and whether the two-mode (completion vs report-only) structure works without confusion.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The worked example is not realistic for the current release story. `EXAMPLE.md` describes v2.9.0 -> v2.10.0 as adding only `utility-mermaid-diagrams` and `utility-slideshow-creator`, shows skill count `31 -> 33`, and references a `discover-to-present` workflow; the actual `v2.9.0` tag has 29 skills, the local `v2.9.1` tag already contains the two F-16/F-19 skills, the release plan says final v2.10.0 should be 32 skills after F-24, and no `discover-to-present` workflow exists in `_workflows/`. -> Rewrite the example around a real supported delta, preferably v2.9.1 -> v2.10.0 with only `utility-update-pm-skills` as new, or explicitly label it as fictional.

- [Minor | High] Backup and report filenames are not collision-proof. The plan says "Versioned + timestamped directory names prevent collisions", but the convention shown is `_pm-skills/backups/v{version}_{date}/` and report names use `{date}` only; running twice on the same day from the same version can collide, and report-only names omit the from-version. -> Include time or a monotonic suffix, e.g. `v{version}_{YYYY-MM-DD_HHMMSS}` or `..._{date}_{run-id}`.

- [Note | Medium] The value-delta template is workable, but "Opportunities" should distinguish sourced facts from reviewer inference. TEMPLATE.md asks for 2-3 actionable suggestions, which is useful, but those suggestions will often be synthesis from release notes rather than direct facts. -> Add a short instruction to ground opportunities in detected skills/workflows and label speculative pairings as suggestions.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S6 Major (unrealistic example):** Agree. The example describes a v2.9.0→v2.10.0 delta that doesn't match reality - F-16/F-19 are already in v2.9.1, the skill count is wrong, and `discover-to-present` doesn't exist. Fix: rewrite EXAMPLE.md to reflect the actual v2.9.1→v2.10.0 delta (F-24 only, 31→32 skills). Or label it explicitly as "fictional scenario for illustration." See Proposed Actions #12.

**Re S6 Minor (filename collisions):** Agree. Running twice same day from same version produces `_pm-skills/backups/v2.9.1_2026-04-11/` both times. Fix: add timestamp with time component: `v{version}_{YYYY-MM-DD_HHMMSS}`. See Proposed Actions #13.

**Re S6 Note (Opportunities grounding):** Agree. Good suggestion - add an instruction to ground opportunities in detected skills/workflows and label speculative pairings. See Proposed Actions #14.

---

### 7. F-24 Acceptance Criteria Sufficiency

*Verifying that the 20 ACs in plan_update-pm-skills.md Section 7 cover all scenarios, are testable, and don't contradict each other or the SKILL.md. Key concerns: missing negative test cases (what if the archive URL is wrong? what if disk space is insufficient?), whether ACs for --status flag are adequate, and whether the FAQ AC (AC-19) is verifiable.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The AC suite misses failure modes that matter for a file-writing updater. AC-8 covers download/validation failures, but not copy failure after writes begin, disk-space exhaustion, permission denial, missing or ambiguous release assets, malformed version files, malformed JSON, corrupted archives with correct top-level directories, or a failed temp cleanup. -> Add negative ACs for copy-phase failure and version/archive parse failure, and define expected report/recovery behavior for each.

- [Minor | Medium] AC-19 is structurally verifiable but not behaviorally strong. It says the FAQ must address six topics, which can be checked by heading/content scan, but it does not require the answers to align with the file scope, backup collision behavior, or the "no rollback" contract. -> Add a second clause requiring FAQ answers to be consistent with the File Scope and recovery sections, or cover that through the proposed template/skill validation.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S7 Major (missing failure-mode ACs):** Agree. The AC suite covers happy paths and pre-copy failures but not mid-copy failures, permission errors, malformed JSON, or corrupted archives that pass structural checks. Fix: add AC-21 (copy-phase failure → warn + backup reminder), AC-22 (malformed version source → skip with warning), AC-23 (archive passes structure check but has wrong content → rely on smoke test). See Proposed Actions #15.

**Re S7 Minor (AC-19 behavioral weakness):** Agree but keep as Minor. The FAQ AC is structural by nature - ensuring FAQ answers are consistent with other sections is better handled by the cross-reference consistency check (S9) than by strengthening AC-19 itself. No action needed beyond what S9 already addresses.

---

### 8. F-24 File Scope & Exclusion Accuracy

*Verifying that the file scope table (what gets updated vs what's excluded) is correct and complete. Key concerns: whether `.github/` should be in the exclusion list, whether `library/` actually changes between releases, whether `CONTRIBUTING.md` and `LICENSE` are covered, and whether the "never delete local files" rule is enforceable.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The file scope table is incomplete until the source artifact is chosen. The updater includes `library/`, `scripts/`, `mkdocs.yml`, `marketplace.json`, and public `docs/`, but omits `.github/`, `.claude/pm-skills-for-claude.md`, `CONTRIBUTING.md`, `LICENSE`, `requirements-docs.txt`, `overrides/`, and other top-level release-support files that may change between versions. -> Decide whether the updater is for end-user plugin content only or repo clone parity; then list explicit include/exclude paths from the release package contract, not from intuition.

- [Major | High] "`docs/` public only" is not operationalized. The file scope says `docs/` is updated except `docs/internal/`, while the update step says copy in-scope files from the extracted archive to the install root. A naive recursive copy of `docs/` from a source archive will overwrite `docs/internal/`; a built release ZIP may not contain `docs/internal/` at all. -> Specify the copy algorithm as include/exclude rules, e.g. copy `docs/**` except `docs/internal/**`, and add an AC or CI fixture that proves internal docs are preserved.

- [Minor | Medium] The `library/` rationale is inaccurate. The plan calls `library/` "Skill library metadata", but the repo's `library/` currently holds `skill-output-samples/`, not just metadata. -> Update the rationale to "sample library / skill output samples" and decide whether user-local sample additions under `library/` are protected or overwritten.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S8 Major (file scope incomplete):** Agree. The file scope table was written from intuition about what "pm-skills content" means, not from the actual release ZIP contents. Fix: derive the file scope from the `build-release.sh` output - whatever the release ZIP contains is what gets updated. Add `.github/`, `CONTRIBUTING.md`, `LICENSE`, `requirements-docs.txt`, `overrides/` to the exclusion list (or inclusion list if they're in the ZIP). This is blocked on human decision #2 (source artifact). See Proposed Actions #16.

**Re S8 Major (docs/ public-only not operationalized):** Agree. A naive recursive copy of `docs/` would overwrite `docs/internal/`. Fix: if using the built release ZIP, `docs/internal/` is already excluded from the ZIP (by `build-release.sh`). State this explicitly: "The updater copies from the release ZIP, which does not contain `docs/internal/`. No exclusion logic needed at copy time - the source artifact is already curated." See Proposed Actions #17.

**Re S8 Minor (library/ rationale):** Agree, minor text fix. `library/` holds `skill-output-samples/`, not "metadata." Fix the rationale. User-added samples under `library/` would be overwritten - this should be noted. See Proposed Actions #18.

---

### 9. Cross-Reference Consistency

*Verifying that the plan, specification, SKILL.md, TEMPLATE.md, EXAMPLE.md, and command file all agree on: flag names (--status, --report-only), step numbering (6 steps), file paths (_pm-skills/updates/, _pm-skills/backups/), directory names, report naming convention (update-report_v{from}-to-v{to}_{date}.md), and the quality checklist item count.*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Minor | High] The quality checklist item count is inconsistent. The effort brief and plan say the quality checklist has 12 items; the specification lists 13 bullets, and the draft SKILL.md also has 13 bullets including "Summary line displayed". -> Standardize on 13 or remove/merge one item, then update all references.

- [Minor | High] `--status` is not represented consistently across planning sections. The F-24 invocation block lists only default and `--report-only`, while the draft SKILL.md and command file support `--status`; implementation step I4 says "Slash command with `--report-only` support" and omits `--status`. -> Add `--status` to the invocation examples and implementation task wording.

- [Minor | Medium] The report-only banner text varies across plan/spec/AC/template. The specification uses "Report only -- update not applied" in one place, AC-5 uses "Report only -- update was not applied", and TEMPLATE.md uses "Report only -- update was not applied." -> Pick one exact ASCII/Unicode string and use it everywhere so validation can check it reliably.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S9 Minor (quality checklist count):** Agree. The SKILL.md has 13 items (including "Summary line displayed"). Fix: update all references from "12" to "13". See Proposed Actions #19.

**Re S9 Minor (--status inconsistency):** Agree. `--status` was added after the initial plan was written. Fix: add `--status` to the invocation examples in the plan and I4 task description. See Proposed Actions #20.

**Re S9 Minor (banner text variation):** Agree. Pick one canonical string and use it everywhere. Fix: standardize on `"Report only - update was not applied."` (em-dash, period) across plan, spec, ACs, TEMPLATE.md, SKILL.md. See Proposed Actions #21.

---

### 10. MCP Impact & Open Questions

*Verifying that the MCP section is actionable and the open questions have clear decision paths. Key concern: the plan says F-24 "may not be suitable for MCP" but doesn't make a firm recommendation. Should the Codex review force a decision here?*

> **Disposition:** [blank]

**Reviewer - Codex (2026-04-11):**

- [Major | High] The MCP section should make a decision for F-24, not leave the release scope at "2-3 tools". The release plan says new MCP tools are `pm_mermaid_diagrams`, `pm_slideshow_creator`, and maybe `pm_update_pm_skills`; the F-24 skill requires network access and local file writes, which are poor fits for an MCP tool exposed as a normal skill call. -> Recommend explicitly excluding `utility-update-pm-skills` from MCP v1 embed/tool generation, or define a constrained MCP-safe read-only `--status`/`--report-only` exposure.

- [Minor | Medium] The MCP current-state counts appear stale. The release plan says pm-skills-mcp has 28 embedded skills, but the sibling `../pm-skills-mcp/skills` directory has 29 skill directories and `pm-skills-source.json` points to v2.8.0; `src/config.ts` still says "27 product management skills". -> Refresh the MCP gap statement from the actual sibling repo before using it to size the alignment work.

- [Minor | Medium] The F-24 MCP advisory has no fallback for partial detection. The draft SKILL.md says if `../pm-skills-mcp/` exists, read `pm-skills-source.json`; AC-13 only covers the case where both directory and file exist. -> Add behavior for "directory exists but source file is missing or malformed" and consider allowing the user to provide a different MCP repo path.

**Requestor - Claude Opus 4.6 (2026-04-11):**

**Re S10 Major (MCP decision for F-24):** Agree. The plan should make a firm recommendation. Fix: exclude `utility-update-pm-skills` from MCP v1 embed. The skill requires network access and local file writes - neither is available in MCP tool contexts. A future version could expose a read-only `--status` MCP tool. See Proposed Actions #22. Requires human decision #4.

**Re S10 Minor (stale MCP counts):** Agree. The MCP gap statement was written from memory, not from checking the actual sibling repo. Fix: refresh the counts from `../pm-skills-mcp/` before sizing alignment work. See Proposed Actions #23.

**Re S10 Minor (MCP advisory partial detection):** Agree. The skill assumes `pm-skills-source.json` exists if the directory exists. Fix: add a fallback - if directory exists but file is missing/malformed, show: "pm-skills-mcp detected but pm-skills-source.json not found. Check the MCP repo manually." See Proposed Actions #24.

---

## Proposed Actions

> *To be filled by Claude Opus 4.6 after reviewing findings.*

| # | Action | Target | Change | Triggered By |
|---|--------|--------|--------|-------------|
| 1 | Update | CHANGELOG.md + plan_v2.10.0.md | Move F-16/F-19 to v2.9.1 section; reframe v2.10.0 as F-24 only. Fix CHANGELOG `[Unreleased]` section. | S1 Blocker |
| 2 | Update | plan_v2.10.0.md | Add stale-count files to cross-cutting hygiene list (CLAUDE.md, README.md, docs/agent-skill-anatomy.md, pm-skill-builder SKILL.md/EXAMPLE.md) | S1 Major (reclassified Minor) |
| 3 | Update | plan_v2.10.0.md | Fix AC count: "15" → "20" | S1 Minor |
| 4 | Update | plan_v2.10.0.md + F-24 effort brief | Mark P1/P2 complete. Update version references 2.9.0 → 2.9.1. | S2 Major |
| 5 | Fix | scripts/validate-gitignore-pm-skills.ps1 | Fix CRLF-incompatible regex. Use line-by-line matching or `-replace "`r"` before regex. | S2 Major |
| 6 | Update | plan_update-pm-skills.md (implementation plan) | Add I10: write `docs/guides/updating-pm-skills.md` + mkdocs nav entry. | S3 Major |
| 7 | Update | SKILL.md draft | Make the degraded-mode fallback chain explicit: GitHub API → `gh` CLI → `git ls-remote` → degraded mode with manual instructions. | S3 Minor |
| 8 | Update | SKILL.md draft | Add version parser contract: strip `v` prefix, trim whitespace, skip invalid/empty sources with warning, 0.0.0 only after all fail. | S4 Major |
| 9 | Update | SKILL.md draft | Add clarifying note: version detection uses first match; smoke test verifies all sources agree. | S4 Minor |
| 10 | Update | Specification + SKILL.md + plan | Change "atomic" to "validated-before-copy with backup." Add mid-copy failure recovery guidance. | S5 Major |
| 11 | Update | Specification + SKILL.md + plan | Specify built release ZIP as source artifact. Align validation + file scope with ZIP contents. | S5 Major |
| 12 | Rewrite | EXAMPLE.md draft | Rewrite around actual v2.9.1→v2.10.0 delta (F-24 only, 31→32 skills) or label as fictional. | S6 Major |
| 13 | Update | Plan + SKILL.md + TEMPLATE.md | Change backup/report naming to include time: `v{version}_{YYYY-MM-DD_HHMMSS}`. | S6 Minor |
| 14 | Update | TEMPLATE.md draft | Add instruction to Opportunities: ground suggestions in detected skills/workflows, label speculative pairings. | S6 Note |
| 15 | Update | plan_update-pm-skills.md | Add AC-21 (copy-phase failure), AC-22 (malformed version source), AC-23 (content mismatch caught by smoke test). | S7 Major |
| 16 | Update | Specification + SKILL.md | Derive file scope from `build-release.sh` output. Add explicit include/exclude lists. | S8 Major |
| 17 | Update | Specification + SKILL.md | State: "Release ZIP excludes docs/internal/ - no exclusion logic needed at copy time." | S8 Major |
| 18 | Update | SKILL.md file scope table | Fix `library/` rationale: "sample library / skill output samples." Note user additions may be overwritten. | S8 Minor |
| 19 | Update | All docs | Fix quality checklist count: 12 → 13 everywhere. | S9 Minor |
| 20 | Update | plan_v2.10.0.md + plan_update-pm-skills.md | Add `--status` to invocation examples and I4 task description. | S9 Minor |
| 21 | Update | All docs | Standardize report-only banner: "Report only - update was not applied." (em-dash, period). | S9 Minor |
| 22 | Update | plan_v2.10.0.md + specification | Exclude `utility-update-pm-skills` from MCP embed. Note: read-only `--status` MCP tool is a future option. | S10 Major |
| 23 | Update | plan_v2.10.0.md MCP section | Refresh MCP counts from actual sibling repo state. | S10 Minor |
| 24 | Update | SKILL.md draft | Add fallback for MCP advisory when directory exists but `pm-skills-source.json` is missing/malformed. | S10 Minor |
