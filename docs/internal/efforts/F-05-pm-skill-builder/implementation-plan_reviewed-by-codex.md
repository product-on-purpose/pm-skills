# F-05 PM Skill Builder: Codex Implementation Plan Review

> **Date**: 2026-03-22
> **Reviewer**: Codex 5.4
> **Document under review**: `implementation-plan_pm-skill-builder.md` (same directory)
> **Design document**: `design_pm-skill-builder.md` (same directory)
> **Effort brief**: `docs/internal/efforts/F-05-pm-skill-builder.md`
> **Issue**: #113

---

## Review Instructions

Review the implementation plan at `docs/internal/efforts/F-05-pm-skill-builder/implementation-plan_pm-skill-builder.md` for completeness, correctness, and executability.

### What to evaluate

#### 1. Task completeness
- Do the 8 tasks cover everything needed to ship F-05?
- Is anything missing (e.g., files that need creation, CI steps, documentation)?
- Are there any hidden dependencies between tasks that aren't documented?

#### 2. Content accuracy
- Does the SKILL.md content in Task 2 match the reviewed design document (Section 1)?
- Does the TEMPLATE.md content in Task 3 match the reviewed design document (Section 2)?
- Does the command file in Task 5 match the reviewed design document (Section 3)?
- Are all repo conventions correctly followed (frontmatter format, AGENTS.md format, command format)?

#### 3. CI validation
- Will the described files pass all 4 validators?
  - `lint-skills-frontmatter.sh` (description word count, required fields, template headers)
  - `validate-agents-md.sh` (path sync)
  - `validate-commands.sh` (command path references)
  - `check-mcp-impact.sh` (advisory)
- Is the expected skill count correct (27 after adding the new skill)?

#### 4. EXAMPLE.md guidance (Task 4)
- Is the Thread 1 scenario (deliver-change-communication) a good choice for the example?
- Is the guidance sufficient for an agent to write a complete 150-300 line example?
- Should the plan provide more specific content guidance for the example?

#### 5. Commit strategy
- Is the 8-commit approach the right granularity?
- Would fewer, larger commits be better? Or is this the right level of atomicity?

#### 6. Executability
- Could an agent (Claude or Codex) execute this plan without needing to ask clarifying questions?
- Are there any ambiguities that would cause two agents to implement it differently?
- Are the "Content source" references precise enough (line numbers, section names)?

#### 7. What did we miss?
After the guided checks above: what problems, gaps, or improvements exist that this review prompt didn't anticipate?

### Ground Truth References

| Claim | How to verify |
|-------|--------------|
| 27 skills after implementation | `ls skills/` (26 existing + deliver-acceptance-criteria + utility-pm-skill-builder) |
| Description word count 20-100 | Count words in the proposed description string |
| Frontmatter schema | `scripts/lint-skills-frontmatter.sh` defines valid fields |
| Command format | Compare against `commands/acceptance-criteria.md` and `commands/persona.md` |
| AGENTS.md format | Read `AGENTS.md` for existing entry patterns |
| CI validators | Run all 4 scripts against current repo state to establish baseline |

### Review Format

Structure your review as:

1. **Task-by-task assessment** — for each of the 8 tasks
2. **Cross-task consistency** — any misalignment between tasks
3. **Executability assessment** — could this be built as-is?
4. **Recommended changes** — prioritized list
5. **What we missed** — anything the prompt didn't anticipate
6. **Overall verdict** — approve / approve with changes / needs revision

---

## Codex Review

### 1. Task-by-task assessment

#### Task 1: Add `_staging/` to `.gitignore`

This task is correct and executable as written.

- The referenced insertion point exists: `.gitignore:36-46` contains the "Personal notes" section and `_NOTES/`.
- The entry itself matches the approved staging design in `design_pm-skill-builder.md:17-18` and `design_pm-skill-builder.md:186-200`.

#### Task 2: Create `SKILL.md`

This task has two blocking problems.

1. The validation step cannot pass at this point in the sequence.
   - The plan says to run `bash scripts/lint-skills-frontmatter.sh` immediately after creating `SKILL.md` (`implementation-plan_pm-skill-builder.md:112-115`).
   - The linter requires both `references/TEMPLATE.md` and `references/EXAMPLE.md` to exist before a skill passes (`scripts/lint-skills-frontmatter.sh:119-133`).
   - So Task 2 will fail even if the frontmatter itself is correct.

2. "Transcribe Section 1 as-is" would ship stale and broken content.
   - The design text still references commands that do not exist yet:
     - `/pm-skill-validate` and `/pm-skill-iterate` at `design_pm-skill-builder.md:68`
     - `/agent-skill-builder` at `design_pm-skill-builder.md:69`
     - none of these commands exist in `commands/` today
   - The design text still says the utility table entry is "This skill (F-05, in design)" at `design_pm-skill-builder.md:271`.
   - The design text still points readers to "Section 4 of this design document" at `design_pm-skill-builder.md:313-314`, which is not an appropriate reference inside the shipped skill file.
   - The inventory note at `design_pm-skill-builder.md:227-229` is also stale/confusing; it implies `deliver-acceptance-criteria` is additive to the 25 domain skills even though it is already included in that 25-row table.

Conclusion: Task 2 should say "adapt Section 1 for the shipped artifact" rather than "transcribe as-is."

#### Task 3: Create `TEMPLATE.md`

This task is mostly correct, but the validation step has the same sequencing bug as Task 2.

- Running `bash scripts/lint-skills-frontmatter.sh` here (`implementation-plan_pm-skill-builder.md:152-155`) still fails until `references/EXAMPLE.md` exists because the linter checks both reference files (`scripts/lint-skills-frontmatter.sh:119-124`).
- The template content itself aligns with the reviewed design structure in `design_pm-skill-builder.md:330-544`.

One content caveat:
- The "Next Steps" section in the design template references `/pm-skill-iterate` at `design_pm-skill-builder.md:543`, which is not shipped yet. That may be acceptable as a future-looking note, but it should be an explicit decision, not a blind transcription.

#### Task 4: Create `EXAMPLE.md`

The scenario choice is good, but the guidance is still underspecified in a few places.

What is good:
- Thread 1 is a strong example scenario: specific, plausible, and clearly differentiated from `deliver-release-notes` and `deliver-launch-checklist` (`design_pm-skill-builder.md:591-594`).
- The requirement to fill all 13 sections and keep the example in the 150-300 line range is directionally right (`implementation-plan_pm-skill-builder.md:175-186`).

What is still ambiguous:
- "Include a complete draft SKILL.md (abbreviated but showing all sections)" (`implementation-plan_pm-skill-builder.md:182`) is internally contradictory. "Complete" and "abbreviated" leave room for different implementations.
- The plan does not explicitly lock the draft command filename/name for the example. Two agents could reasonably choose `/change-communication`, `/deliver-change-communication`, or prose-only placeholder text.
- The AGENTS entry shape is mentioned, but not the exact heading/value pair to use inside the example packet.

Recommendation: keep the scenario, but add explicit example-level expectations for:
- command filename: `change-communication.md`
- command name: `/change-communication`
- AGENTS heading: `#### change-communication`
- whether the embedded draft SKILL/TEMPLATE/command blocks should be full content or representative excerpts

#### Task 5: Create the command file

This task is correct.

- The proposed command content matches the reviewed design at `design_pm-skill-builder.md:557-576`.
- It also matches current repo command conventions:
  - `commands/acceptance-criteria.md`
  - `commands/persona.md`
  - `scripts/validate-commands.sh:7-41`

No blocker here.

#### Task 6: Add `AGENTS.md` entry

The entry format is correct, but the expected count is wrong.

- The planned entry shape matches current `AGENTS.md` structure (`AGENTS.md:11-170`) and the validator expectations in `scripts/validate-agents-md.sh:13-41`.
- However the expected total of 28 is incorrect (`implementation-plan_pm-skill-builder.md:267-268`).
- Baseline today is 26 skills:
  - confirmed by `bash scripts/validate-agents-md.sh` -> `AGENTS.md matches 26 skill paths`
- After adding `utility-pm-skill-builder`, the correct total is 27, not 28.

So the task content is fine; the verification expectation is not.

#### Task 7: Run full CI validation

This task is incomplete for the status claims it supports.

What is good:
- It includes all four relevant validators (`implementation-plan_pm-skill-builder.md:283-296`).

What is missing:
- The repo's actual validation workflow runs both bash and PowerShell validators on a matrix (`.github/workflows/validation.yml:9-46`).
- The plan only runs bash scripts, so it cannot honestly support "CI passing" language by itself.

What is too strict/inaccurate:
- The expected `check-mcp-impact.sh` output is not deterministic (`implementation-plan_pm-skill-builder.md:296`).
- The script only warns about new skills when a usable diff base exists; otherwise it exits 0 with a skip warning (`scripts/check-mcp-impact.sh:10-20`).

Recommendation: Task 7 should:
- run both bash and `pwsh` validators
- allow either "new skill detected" or "unable to determine a diff base" for MCP advisory

#### Task 8: Update effort brief status

This task is incomplete and slightly overstated.

1. It only changes status fields, but the F-05 effort brief still contains stale design-era content.
   - Staging output is still listed as `library/pm-skill-builder/{skill-name}` at `F-05-pm-skill-builder.md:31-32` and `F-05-pm-skill-builder.md:98-101`
   - Sample output library is still listed as shipped scope at `F-05-pm-skill-builder.md:73-90` and `F-05-pm-skill-builder.md:103-110`
   - Thread 2 in the brief is still the older utility scenario text, not the revised validator-oriented one
- The implementation plan does not reconcile any of that. It only flips statuses (`implementation-plan_pm-skill-builder.md:322-338`).

2. The proposed status wording overshoots what the plan actually verifies.
   - It says to change status to "Implemented, CI passing" (`implementation-plan_pm-skill-builder.md:324`)
   - But the release governance file gates on "committed and CI green" (`docs/internal/releases/v2.7.0/README.md:24-31`)
   - And Task 7 only runs bash validators, not the full cross-platform matrix

Recommendation: Task 8 should both reconcile stale F-05 brief content and use wording like "Implemented locally, verification passed" until committed.

### 2. Cross-task consistency

There are four important consistency issues across the plan.

1. Skill counts are inconsistent.
   - Review scaffold reference says "26 existing + deliver-acceptance-criteria + utility-pm-skill-builder" at `implementation-plan_reviewed-by-codex.md:58`, which double-counts `deliver-acceptance-criteria`
   - Task 2 expects 27 total (`implementation-plan_pm-skill-builder.md:114-115`) - this is correct
   - Task 6 expects 28 total (`implementation-plan_pm-skill-builder.md:267-268`) - this is incorrect

2. The plan treats the design doc as literal production content even where the design doc is still carrying review-state text.
   - This shows up in Task 2 most clearly, but it also affects Task 3's future-command reference.

3. The plan is not aligned with the current F-05 effort brief.
   - The brief still describes `library/pm-skill-builder/` and a shipped sample-output library (`F-05-pm-skill-builder.md:73-110`)
   - The implementation plan does not decide whether to implement those artifacts or remove them from scope

4. Validation order is inconsistent with validator behavior.
   - Tasks 2 and 3 ask for full linter passes before the required reference set exists

### 3. Executability assessment

Could an agent build this as-is? Not cleanly.

My answer is: no, not without either asking follow-up questions or silently correcting the plan.

Blocking reasons:
- Task 2 and Task 3 validation steps fail as written
- Task 2 transcription instruction would create broken/stale shipped content
- Task 6 has an incorrect success condition
- Task 8 does not reconcile the brief it claims to close out

After those are fixed, the plan becomes executable. The overall structure is sound; the problems are in sequencing, literal-transcription assumptions, and stale cross-doc state.

### 4. Recommended changes

Priority order:

1. Fix validation sequencing.
   - Move the first `lint-skills-frontmatter.sh` run to after Task 4, or create placeholder `TEMPLATE.md` and `EXAMPLE.md` before validating in Task 2.

2. Replace "transcribe as-is" with "adapt for shipped artifact."
   - Strip references to `/pm-skill-validate`, `/pm-skill-iterate`, `/agent-skill-builder`
   - Remove "This skill (F-05, in design)"
   - Remove "See Section 4 of this design document"
   - Correct the inventory note so it reflects 26 current skills pre-F-05 and 27 after F-05

3. Fix the count references everywhere.
   - Baseline: 26 current skills
   - After F-05: 27
   - Update Task 6 and the review scaffold ground-truth note accordingly

4. Decide the sample-output-library question explicitly.
   - Either add a task for `library/skill-output-samples/utility-pm-skill-builder/`
   - Or update `docs/internal/efforts/F-05-pm-skill-builder.md` to remove it from scope

5. Expand Task 8 from "status flip" to "document reconciliation."
   - Update stale staging paths and stale artifact lists in the effort brief before marking the effort implemented

6. Make Task 7 match real CI.
   - Run bash + PowerShell validators
   - Soften the MCP advisory expectation to allow a skipped diff-base case

7. Tighten Task 4 guidance.
   - Lock the example command name/path and clarify whether embedded draft files are full or excerpted

8. Reduce commit noise.
   - Eight commits is workable, but 5 commits would likely be cleaner:
     1. `.gitignore`
     2. skill content (`SKILL.md` + `TEMPLATE.md` + `EXAMPLE.md`)
     3. command + AGENTS
     4. validation fixes
     5. effort/release docs

### 5. What we missed

A few issues were not explicitly asked about in the review prompt but matter:

- There is no end-to-end functional test of `/pm-skill-builder` with a realistic idea after implementation. Static validators alone do not prove the builder instructions actually work.
- The review scaffold itself has a stale count reference at `implementation-plan_reviewed-by-codex.md:58`.
- The design doc still contains future-skill references that are acceptable in a design review but not safe to ship blindly into production markdown.
- The effort brief and implementation plan are no longer equivalent sources of truth. Someone implementing from one without the other could produce different results.

### 6. Overall verdict

Needs revision.

The plan is close, and the overall decomposition is reasonable, but it is not executable as written. The main fixes are:
- correct the validation order
- stop treating the design doc as literal ship-ready text
- fix the skill counts
- reconcile the F-05 effort brief before marking the work implemented

---

## Claude Response

> **Date**: 2026-03-22
> **Method**: Verified each finding against the actual linter source, effort brief, and design doc

### Assessment: All 8 findings confirmed

Codex's review is accurate and well-grounded. The "Needs revision" verdict is correct. The plan structure is sound but has sequencing errors, stale-content assumptions, and missing reconciliation steps.

### Finding-by-Finding Response

#### 1. Validation sequencing — CONFIRMED, BLOCKING

**Verification**: Read `scripts/lint-skills-frontmatter.sh`. The linter iterates over `skills/*/SKILL.md` and checks for `references/TEMPLATE.md` existence and `##` header count. Running it before TEMPLATE.md and EXAMPLE.md exist will fail.

**Action**: Combine Tasks 2-4 into a single task that creates all three files, then validate once. This also aligns with Codex's commit strategy recommendation (#8).

#### 2. Design doc != shipped content — CONFIRMED, BLOCKING

**Verification**: Checked design doc lines 68-69, 271, 313-314, 227-229. All contain design-time references that don't belong in shipped SKILL.md:
- `/pm-skill-validate`, `/pm-skill-iterate`, `/agent-skill-builder` → commands don't exist
- "This skill (F-05, in design)" → stale status
- "See Section 4 of this design document" → internal cross-reference
- Inventory note → confusing phrasing

**Action**: Plan now says "adapt for shipped artifact" with explicit list of changes to make during transcription. Future-command references in "When NOT to Use" will use descriptive text ("future utility skill") instead of command names.

#### 3. Skill counts — CONFIRMED, BLOCKING

**Verification**: `ls skills/ | wc -l` returns 26 directories. After F-05: 27.

**Action**: Fixed Task 6 (28 → 27). Fixed review scaffold ground-truth note. All count references now consistent.

#### 4. EXAMPLE.md ambiguity — CONFIRMED, NON-BLOCKING

**Action**: Locked example specifics:
- Command filename: `change-communication.md`
- Command name: `/change-communication`
- AGENTS heading: `#### change-communication`
- Embedded drafts: representative excerpts (not full files — the example demonstrates the packet structure, not a second complete skill)

#### 5. Task 5 (command file) — CONFIRMED CORRECT

No changes needed.

#### 6. Task 6 count — CONFIRMED (subset of #3)

Fixed: 28 → 27.

#### 7. Task 7 cross-platform — CONFIRMED, NON-BLOCKING

**Action**: Added PowerShell validators alongside bash. Softened MCP advisory expectation to allow "no diff base available" output.

#### 8. Task 8 brief reconciliation — CONFIRMED, BLOCKING

**Verification**: Read `F-05-pm-skill-builder.md`. Lines 31-32 still say `library/pm-skill-builder/`. Lines 73-110 still list sample output library as in-scope. Thread 2 description is stale.

**Action**: Task 8 now includes brief reconciliation:
- Remove `library/pm-skill-builder/` references → `_staging/` (gitignored, discarded)
- Remove sample-output-library from scope (decision: not shipping sample outputs for the builder itself — the EXAMPLE.md in the skill references directory serves that purpose)
- Update Thread 2 to match revised validator-oriented scenario
- Status wording: "Implemented locally, verification passed" (not "CI passing")

#### On sample-output-library (cross-task finding #3)

**Decision**: Remove from scope. The builder's own `references/EXAMPLE.md` demonstrates what a completed packet looks like. Separate sample outputs in `library/skill-output-samples/` would duplicate that purpose. If sample outputs are wanted later, they can be added as a follow-up.

#### On end-to-end functional test (What we missed #1)

**Action**: Added Task 6 (new numbering) — a manual functional test of `/pm-skill-builder` with a realistic idea after all files are in place. This validates that the instructions actually work, not just that CI passes.

#### On commit strategy (#8)

**Action**: Adopted Codex's 5-commit recommendation:
1. `.gitignore`
2. Skill content (SKILL.md + TEMPLATE.md + EXAMPLE.md)
3. Command + AGENTS
4. Validation fixes (if needed)
5. Effort/release docs

### Action Summary

| # | Finding | Action | Blocking? |
|---|---------|--------|-----------|
| 1 | Validation sequencing | Combine Tasks 2-4, validate once after all three files exist | Yes |
| 2 | Stale design-doc content | "Adapt for shipped artifact" with explicit change list | Yes |
| 3 | Skill counts | 28 → 27 everywhere | Yes |
| 4 | EXAMPLE.md ambiguity | Lock command name, AGENTS heading, excerpt vs full | No |
| 5 | Command file | No change needed | — |
| 6 | Count in Task 6 | Fixed (subset of #3) | Yes |
| 7 | Cross-platform validation | Add PowerShell, soften MCP expectation | No |
| 8 | Brief reconciliation | Expand Task 8 to include stale content cleanup | Yes |

### Verdict Response

Agree with "Needs revision." All blocking issues are concrete and fixable. Plan updated with all 8 fixes applied.
