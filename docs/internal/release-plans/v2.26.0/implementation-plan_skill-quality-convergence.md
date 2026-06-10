# Skill Quality Convergence (F-12) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Spec: [`spec_skill-quality-convergence.md`](spec_skill-quality-convergence.md) - the section 3 description texts are verbatim-normative; do not paraphrase them.

**Goal:** Land Batch 0 (description integrity + scar hygiene, one PR) and Batch 1 (Deliver-cohort convergence, one PR) inside v2.26.0; stage Batches 2-4 as v2.26.x follow-ups.

**Architecture:** Pure content edits driven by the spec's verbatim texts plus the `utility-pm-skill-validate` -> `utility-pm-skill-iterate` lifecycle for the content batches. One executable change: extending `scripts/check-emdash-scars.mjs` scope to `skills/**` (TDD, lands in the same PR as the corpus sweep because the guard is enforcing).

**Tech stack:** Markdown skill files; Node test runner for the one script change; the repo's enforcing validators as the test suite.

**Repo hard rules:** no em-dash or en-dash characters; linear history (squash-merge PRs); let CI run even after a local ALL CHECKS PASSED.

**Sequencing note (from `plan_v2.26.0.md`):** Batch 0 lands BEFORE the F-14/F-15 branch. Batch 0 must NOT touch `utility-pm-workflow-orchestrator` (its description rewrite is owned by the F-15 work).

**Revision R1 (2026-06-10):** Codex adversarial review applied; trace in [`review_2026-06-10_codex-adversarial.md`](review_2026-06-10_codex-adversarial.md). In this file: Batch 0a corrected from "15 skills" to the actual 14 enumerated (CR-7), and every commit step stages explicitly because `commit -am` would drop the NEW HISTORY.md files (CR-2).

---

### Task 0: Branch

- [x] **Step 0.1:** Confirm clean main, `git pull --ff-only`, then `git switch -c chore/v2.26.0-f12-batch0`

### Task 1: Batch 0a - description rewrites (14 skills)

**Files:** Modify the `description:` line (and `metadata.version` + `metadata.updated`) in each of:
`skills/deliver-user-stories/SKILL.md`, `skills/deliver-acceptance-criteria/SKILL.md`, `skills/deliver-edge-cases/SKILL.md`, `skills/define-hypothesis/SKILL.md`, `skills/measure-experiment-design/SKILL.md`, `skills/discover-interview-synthesis/SKILL.md`, `skills/foundation-meeting-recap/SKILL.md` (append one sentence only), `skills/iterate-lessons-log/SKILL.md`, `skills/iterate-retrospective/SKILL.md`, `skills/utility-slideshow-creator/SKILL.md`, `skills/utility-pm-critic/SKILL.md`, `skills/utility-pm-changelog-curator/SKILL.md`, `skills/utility-pm-release-conductor/SKILL.md`, `skills/utility-pm-skill-auditor/SKILL.md`.
Create: `HISTORY.md` in each of those skill directories (none has one today).

- [x] **Step 1.1:** Apply the spec section 3.1-3.3 description texts VERBATIM. Patch-bump each skill's `metadata.version` (2.0.0 -> 2.0.1 for the v2.0-era cohort; 1.0.0 -> 1.0.1 for deliver-acceptance-criteria, foundation-meeting-recap, and the four dispatch + slideshow utilities) and set `metadata.updated` to the merge date.
- [x] **Step 1.2 (slideshow truth check, spec 3.2):** Read `skills/utility-slideshow-creator/references/` (`slide-types.md`, `decision-logic.md`, `platform-rules.md`). If a real custom-theming mechanism is documented, append one truthful clause to the new description; otherwise ship the spec text as-is. Record which way it went in the PR description.
- [x] **Step 1.3 (dispatch-body check, spec 3.3):** For the four dispatch skills, confirm the SKILL.md body still documents the client-routing instructions that just left the description (all four do today; if any does not, move the removed mechanics into its body under the existing runtime-detection section).
- [x] **Step 1.4:** Create each `HISTORY.md` from this shape (adjust versions per skill; date = merge date):

```markdown
# <skill-name> - History

| Version | Date | Type | Summary |
|---------|------|------|---------|
| <new> | <date> | patch | Description rewrite for trigger accuracy (boundary disambiguation; 2026-06-09 audit, v2.26.0 Batch 0) |
| <old> | <old-updated-date> | baseline | Prior published version |
```

- [x] **Step 1.5: Verify.** Run, expecting pass: `bash scripts/lint-skills-frontmatter.sh` (word counts 20-100, no unquoted ": ", all structural checks); `bash scripts/validate-skill-history.sh` (every new HISTORY.md summary table carries the current version); manual AC-Q2 check: every skill name mentioned inside a new description exists under `skills/` (`ls skills/<name>` for each pointer).
- [x] **Step 1.6: Commit.** `git add skills && git commit -m "fix(descriptions): de-collide trigger surfaces + remove phantom themer ref (F-12 Batch 0a)"` (explicit add: the 14 HISTORY.md files are NEW; `commit -am` would silently drop every one of them and break AC-Q4)

### Task 2: Batch 0b - scar sweep under skills/

**Files:** Modify every file matched by the detection grep (16 SKILL.md bodies, ~37 files including references/).

- [x] **Step 2.1:** Detect: `grep -rEn '[a-z] \. [a-z]' skills/ --include="*.md"`. For each hit, replace the mid-sentence " . " with " - " (or restructure the sentence when that reads better). Do not touch legitimate sentence-period boundaries; the pattern targets lowercase-period-lowercase only - eyeball each hit.
- [x] **Step 2.2:** Per spec D-2, files whose ONLY change is the sweep get NO version bump. Skills already bumped in Task 1 need nothing extra.
- [x] **Step 2.3: Verify.** The detection grep returns zero matches. `bash scripts/lint-skills-frontmatter.sh` still green.
- [x] **Step 2.4: Commit.** `git add skills && git commit -m "style(skills): sweep em-dash-sweep scars from skill bodies and references (F-12 Batch 0b)"`

### Task 3: Batch 0c - extend the scar guard to skills/** (TDD)

**Files:** Modify: `scripts/check-emdash-scars.mjs`, `scripts/check-emdash-scars.test.mjs`.

- [x] **Step 3.1:** Read both files first; reuse their existing temp-fixture helper and test idiom (node:test, pure builtins).
- [x] **Step 3.2: Write the failing test.** Add a case asserting that a scar inside a fixture `skills/<x>/SKILL.md` IS reported, and a clean skills file is not. Run: `node --test scripts/check-emdash-scars.test.mjs`. Expected: the new case FAILS (skills/ is outside scope today).
- [x] **Step 3.3: Implement.** Add `skills/**` hand-authored markdown to the guard's scanned scope (keeping its existing fence-awareness and multi-backtick span handling from PR #183 intact).
- [x] **Step 3.4:** Re-run the test file: all cases PASS. Then run the guard against the real tree: `node scripts/check-emdash-scars.mjs`. Expected: zero findings (Task 2 cleaned the corpus; this guard is ENFORCING in CI, so scope extension and sweep must be in the same PR).
- [x] **Step 3.5: Commit.** `git add scripts/check-emdash-scars.mjs scripts/check-emdash-scars.test.mjs && git commit -m "feat(ci): scar guard now covers skills/** (test-first; F-12 Batch 0c)"`

### Task 4: Batch 0 PR

- [x] **Step 4.1:** `CHANGELOG.md` `[Unreleased]`: Fixed - description collision pairs de-embedded with boundary pointers across 9 skills; phantom utility-slideshow-themer reference removed; dispatch-skill descriptions trimmed to triggers (mechanics stay in bodies). Changed - em-dash scar sweep across `skills/`; scar guard scope extended to `skills/**`. Public paths only; reference issue #135 and the 2026-06-09 audit by date, not by gitignored path.
- [x] **Step 4.2:** Full bundle both shells: `bash scripts/pre-tag-validate.sh` and `pwsh -File scripts/pre-tag-validate.ps1` - ALL CHECKS PASSED twice.
- [x] **Step 4.3:** Push, `gh pr create --title "fix: F-12 Batch 0 - description integrity + scar hygiene (#135)"`, verify ACTUAL CI conclusions (`gh pr checks`; never the watcher exit code), squash-merge, sync main.

### Task 5: Batch 1 - Deliver cohort convergence (in v2.26.0)

**Files:** `skills/{deliver-prd,deliver-user-stories,deliver-acceptance-criteria,deliver-edge-cases,deliver-launch-checklist,deliver-release-notes}/` (SKILL.md, references/TEMPLATE.md, references/EXAMPLE.md, HISTORY.md as needed). Branch: `chore/v2.26.0-f12-batch1`.

- [x] **Step 5.1 (triage calibration):** Run `utility-pm-skill-validate` on the five spec-named representative skills (deliver-prd, define-hypothesis, discover-competitive-analysis, measure-experiment-design, iterate-retrospective). First confirm the validate skill's CURRENT check list from its own SKILL.md (the brief's eight-check table may have drifted). Produce the triage table: per finding type, fix / skip / defer per the spec section 2 bar. Save the table into the PR description (not committed as a file).
- [x] **Step 5.2 (the per-skill loop, run for each of the 6 Deliver skills):**
  1. `utility-pm-skill-validate <skill>` - capture findings.
  2. `utility-pm-skill-iterate <skill>` with the report - apply only section-2-bar fixes: add `## When NOT to Use` (with real boundary content, not boilerplate), enumerate template sections in the output contract, rewrite untestable checklist items, fill thin EXAMPLE sections.
  3. Bump `metadata.version` MINOR (2.0.1 -> 2.1.0 for Batch 0-touched skills; 2.0.0 -> 2.1.0 otherwise; deliver-acceptance-criteria 1.0.1 -> 1.1.0) + `metadata.updated`; add the HISTORY.md row (`minor | Quality convergence: When NOT to Use + output-contract tightening (F-12 Batch 1)`).
  4. Re-run `utility-pm-skill-validate <skill>` - zero FAIL, zero high-value WARN (AC-Q5).
- [x] **Step 5.3: Verify batch-wide.** `bash scripts/lint-skills-frontmatter.sh`; `bash scripts/validate-skill-history.sh`; `node scripts/check-emdash-scars.mjs`; `bash scripts/check-skill-cross-references.sh`; `bash scripts/check-count-consistency.sh` (counts unchanged, AC-Q6).
- [x] **Step 5.4:** CHANGELOG `[Unreleased]` entry (per-skill minor bumps named); push; PR `"feat: F-12 Batch 1 - Deliver cohort quality convergence (#135)"`; CI actual-conclusions check; squash-merge.

### Tasks 6-8: Batches 2-4 (v2.26.x, after the v2.26.0 tag)

Same per-skill loop and verification as Task 5, one branch + PR each:

- [ ] **Task 6 / Batch 2:** define-hypothesis, define-jtbd-canvas, define-opportunity-tree, define-problem-statement, develop-adr, develop-design-rationale, develop-solution-brief, develop-spike-summary (8).
- [ ] **Task 7 / Batch 3:** discover-competitive-analysis, discover-interview-synthesis, discover-stakeholder-summary, iterate-lessons-log, iterate-pivot-decision, iterate-refinement-notes, iterate-retrospective (7).
- [ ] **Task 8 / Batch 4:** measure-dashboard-requirements, measure-experiment-design, measure-experiment-results, measure-instrumentation-spec, foundation-persona (5).
- [ ] **Step 8.x (close-out):** when Batch 4 merges, update issue #135 with the final convergence table (26/26), flip the effort brief and `plan_v2.26.0.md` rows to SHIPPED, and decide whether the v2.26.x patch in flight tags immediately or banks.

---

## Self-review notes (writing-plans checklist applied)

- Spec coverage: section 3 texts -> Task 1; 3.4 -> Tasks 2-3; D-1/D-2/D-3 encoded in Steps 1.1/2.2 and the Task 5 version line; section 4 batches -> Tasks 5-8; every AC-Q has a verifying step (AC-Q1/Q2 in 1.5, Q3 in 2.3 + 3.4, Q4 in 1.5/5.3, Q5 in 5.2.4, Q6 in 5.3, Q7 via the re-validate in 5.2.4).
- Placeholder scan: all description texts are verbatim in the spec (single source); the one code change is test-first with exact commands; no "handle appropriately" steps remain.
- Consistency: version arithmetic (2.0.0 -> 2.0.1 -> 2.1.0; the 1.0.0-base exceptions) matches the spec's D-1/D-3 exactly.
- R1 review pass: Batch 0a count corrected to 14 (the orchestrator's exclusion had left a stale 15); all commit steps stage explicitly so the new HISTORY.md files and script edits cannot be dropped by `-a` staging.
