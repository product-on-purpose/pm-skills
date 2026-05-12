# v2.15.0 Sprint-Skills Pre-Execution Review

**Reviewer:** Claude (structured first-pass review)
**Date:** 2026-05-12
**Reviewed artifacts:**

- `docs/internal/release-plans/v2.15.0/foundation-sprint-integration-plan.md`
- `docs/internal/release-plans/v2.15.0/design-sprint-integration-plan.md`
- `docs/internal/efforts/foundation-sprint-skills/foundation-sprint-design-spec.md`
- `docs/internal/efforts/design-sprint-skills/design-sprint-design-spec.md`
- `docs/concepts/foundation-sprint.md` (newly authored 2026-05-11)
- `docs/concepts/design-sprint.md` (newly authored 2026-05-11)
- Cross-checked against: `docs/reference/skill-families/_registry.yaml`, `docs/reference/skill-families/meeting-skills-contract.md`, `scripts/lint-skills-frontmatter.sh`

**Scope:** Pre-execution review across six axes (plan-spec consistency, cross-track coherence, concept doc fidelity, spec completeness, execution sequencing, family contract anchoring), modeled on the Phase 0 Adversarial Review Loop codified in v2.11.0 and used through the v2.14.x cycle.

**Headline:** No P0 blockers. Two P1 findings worth addressing before Phase 1 Task 1 begins (one is a clear bug, one is an architectural anchor that prevents drift across 16 skills). Five P2 findings worth folding into early phases. Three P3 findings for awareness.

---

## Findings Summary

| Severity | Count | Recommended timing |
|---|---|---|
| P0 (blocker) | 0 | n/a |
| P1 (important) | 3 | Fix before Phase 1 Task 1; touches family-contract scaffolding |
| P2 (should fix) | 5 | Fold into the relevant phase as execution proceeds |
| P3 (note only) | 3 | Awareness; defer or accept |

---

## P1 Findings

### P1.1: FS plan Task 5 creates the family contract at the wrong path

**Where:** `foundation-sprint-integration-plan.md` Task 5
**Current:** Task 5 lists `Create: docs/reference/sprint-skills-family-contract.md`
**Should be:** `docs/reference/skill-families/sprint-skills-contract.md`

**Evidence:**

- The existing meeting-skills contract is at `docs/reference/skill-families/meeting-skills-contract.md` (Task 5 even references it as "structural reference").
- The skill-families registry comment in `docs/reference/skill-families/_registry.yaml` documents the convention: `docs/reference/skill-families/<family>-contract.md`.
- The generic `validate-skill-family-registration` script (per MEMORY.md F-36) consumes this convention and would fail if the contract is placed elsewhere.

**Fix:** Edit FS plan Task 5 file path. One-line change.

**Risk if not fixed:** Family-registration CI fails on first sprint-skills commit; team scrambles to relocate the file mid-execution.

### P1.2: Neither plan registers sprint-skills in `_registry.yaml`

**Where:** Missing from both `foundation-sprint-integration-plan.md` and `design-sprint-integration-plan.md`
**Current:** Neither plan creates an entry in `docs/reference/skill-families/_registry.yaml`.
**Should be:** Plan should add a task that appends a sprint-skills family block to `_registry.yaml`:

```yaml
sprint-skills:
  contract: docs/reference/skill-families/sprint-skills-contract.md
  members:
    - sprint-note-and-vote
    - foundation-sprint-readiness
    - foundation-sprint-brief
    - foundation-sprint-basics
    - foundation-sprint-differentiation
    - foundation-sprint-approach-options
    - foundation-sprint-magic-lenses
    - foundation-sprint-founding-hypothesis
    - sprint-foundation-to-design
    - design-sprint-readiness
    - design-sprint-brief
    - design-sprint-map-and-target
    - design-sprint-sketch
    - design-sprint-decide-and-storyboard
    - design-sprint-prototype-plan
    - design-sprint-test-and-score
```

**Fix:** Add a step to FS plan Task 5 to register the family with a Foundation Sprint-only initial list, then a step to DS plan Phase 7 Task 17 (final validation) to append the Design Sprint + bridge entries when those skills land. Or simpler: have FS plan Task 5 register all 16 members at once (the registry is a structural promise; declared-but-not-yet-built members will produce informative validator output, not silent failure).

**Risk if not fixed:** `validate-skill-family-registration` validator runs in CI but never sees the sprint-skills family; sprint skills ship without the family integrity check, defeating the purpose of the family pattern.

### P1.3: Family contract frontmatter convention does not specify root vs metadata placement

**Where:** `foundation-sprint-integration-plan.md` Task 5
**Current:** Task 5 lists fields to cover but mixes root-level (`classification`, `sprint_type`, `sprint_move`) with metadata-nested (`prerequisites`, `inputs`, `outputs`, `timebox_minutes`, `roles`, `frameworks`) without distinguishing.

**Evidence in plan task examples:** FS plan Task 6 (sprint-note-and-vote frontmatter) and DS plan Task 1 (bridge frontmatter) BOTH put `prerequisites`, `inputs`, `outputs`, `timebox_minutes`, `roles`, `frameworks` inside `metadata:`. So the convention IS metadata-nested. But Task 5 (the contract) does not state this, which means:

1. The contract doc itself may show fields at root level, contradicting Tasks 6 and 1.
2. Skill authors reading the contract may put fields at root level.
3. The validator (Task 3) doesn't know which placement is correct.

**Fix:** Task 5 should include a worked example with explicit root vs metadata distinction, e.g.:

```yaml
# Root-level fields (required for all sprint-skills)
name: ...
description: ...
classification: sprint
sprint_type: shared | foundation | design | bridge
sprint_move: ...
version: "X.Y.Z"
updated: YYYY-MM-DD
license: Apache-2.0

# Metadata-nested fields
metadata:
  category: ...
  frameworks: [foundation-sprint | design-sprint | click | sprint | character-note-and-vote]
  timebox_minutes: N
  roles: [...]
  prerequisites: [...]    # optional; list of prerequisite skill names
  inputs: [...]
  outputs: [...]
  author: product-on-purpose
```

**Risk if not fixed:** 16 sprint skills authored with inconsistent placement, requiring a sweep later. This is exactly the v2.4.0 frontmatter-validity defect class (per MEMORY.md feedback on YAML parse-validity sweeps).

---

## P2 Findings

### P2.1: Optional vs required prerequisite convention not specified

**Where:** Both specs use language like "Frontmatter prerequisites: `foundation-sprint-readiness` (recommended) or skip if user has done equivalent" and DS plan Task 3: "Prerequisites: `design-sprint-readiness` OR `sprint-foundation-to-design`".

**Issue:** Current pm-skills `prerequisites` convention (used by meeting-skills) is a simple array of strings. There's no expression of "optional" or "either A or B". If the sprint family validator enforces prerequisites strictly, the skill won't pass validation when a user comes in via the bridge skill rather than design-sprint-readiness.

**Fix:** Family contract (Task 5) should specify how `prerequisites` handles "any of N" or "optional". Two reasonable approaches: (a) `prerequisites` is an array of any-of-these strings, with a separate `prerequisites_mode: any | all` field; or (b) prerequisites are advisory only and validator does not block on them, only the family contract enforces them in skill output content (the "Decider Checkpoint" mention).

**Risk if not fixed:** Validator either over-strict (blocks valid invocations) or silent (defeats the prerequisite signal). Forces a fix mid-execution.

### P2.2: Spec open questions are not ratified in plans

**Where:** Both specs end with "Track-specific open questions" sections (6 questions for FS, 7 for DS) with "Lean X" recommendations but no explicit decisions.

**Examples of unratified decisions:**
- FS Q1: Enforce minimum of 3 approach options? (Lean enforce)
- FS Q3: Strict hypothesis template? (Lean strict)
- DS Q3: Customer count strict at 5? (Lean 5 with warning at 3/4 or 6/7)
- DS Q5: Rumble support? (Lean defer to v0.2)
- DS Q6: Remote variant as separate skill? (Lean parameter)

**Issue:** When 16 skills are authored across multiple sessions, the "lean" recommendations may be implemented differently as the team forgets earlier decisions or re-litigates them. v2.14.x review process used a Decision Brief subsection (per MEMORY.md `feedback_decision-brief-pattern.md`) to lock decisions explicitly.

**Fix:** Before Phase 1 Task 1, add a "Ratified Decisions" section to each integration plan listing each spec open question with a one-line locked answer. Alternatively, fold the lean recommendations into the spec text directly (turn open questions into decisions).

**Risk if not fixed:** Cross-skill inconsistency in enforcement strictness, error messaging, and contract surface area.

### P2.3: Workflow timeboxes do not account for non-skill craft time

**Where:** Both workflow specs (FS spec workflow block; DS spec workflow block including foundation-to-design)

**Issue:** Several days have skill-output time + significant craft time that the workflow doc must surface for facilitators to plan:
- **Tuesday (DS):** `design-sprint-sketch` skill produces lightning demo board and assignment plan; humans then sketch independently for 2-3 hours.
- **Thursday (DS):** `design-sprint-prototype-plan` skill produces role plan + script; team then BUILDS for 4-6 hours.
- **Pre-sprint (FS and DS):** customer recruiting for DS Friday takes calendar days, not minutes.

The workflow doc tasks (FS Task 14, DS Task 9, DS Task 10) need to explicitly note these non-skill activities and their typical durations so the workflow remains a faithful map of the actual sprint week rather than just a skill-invocation chain.

**Fix:** When authoring workflow docs, include "(craft activity outside AI invocation surface)" stub blocks for each non-skill stretch with realistic time estimates.

**Risk if not fixed:** Facilitators reading the workflow doc underestimate the week's duration; sprint dates slip.

### P2.4: Sample count attribution differs between plans and specs (total matches)

**Where:** FS plan File Structure says "Library samples (24 files: 8 skills x 3 threads)"; FS spec says "7 skills times 3 clients = 21 samples for this track". DS plan: same 24-per-track count; DS spec: 27 samples (21 DS + 6 cross-track).

**Math:** Plans allocate the sprint-note-and-vote sample to the FS plan and the bridge sample to the DS plan, so each plan has 8 sample-files per thread x 3 threads = 24. Specs allocate both cross-track samples to the DS spec, so FS spec is 21 and DS spec is 27. Total across both is 48 in both views.

**Issue:** Total is correct but the per-track breakdown disagrees. A reviewer reconciling the two views gets confused. Worse: when Tasks 16-18 in FS plan execute, the author needs to know "do I include sprint-note-and-vote samples?" The plan says yes; the spec says no.

**Fix:** Align on one allocation. The plans' allocation is more sensible (each plan ships the samples for the skills it ships). Update the specs' sample-plan sections to match.

**Risk if not fixed:** Authoring time loss as authors re-derive the breakdown.

### P2.5: `metadata.category` sprint-specific values not documented

**Where:** FS plan Task 6 (sprint-note-and-vote frontmatter) uses `metadata.category: sprint-decision`. DS plan Task 1 (bridge) uses `metadata.category: sprint-bridge`. Plus sprint-foundation, sprint-design, etc. across the 16 skills.

**Issue:** `lint-skills-frontmatter.sh` does NOT enforce a `metadata.category` enum (verified by audit), so the new values won't fail CI. But:

- `docs/concepts/agent-skill-anatomy.md` and `docs/reference/categories.md` document a canonical 7-category enum (research, problem-framing, ideation, specification, validation, reflection, coordination).
- Adding new categories without updating those references creates discoverability drift.

**Fix:** Either (a) extend the canonical category taxonomy to include sprint-* values and update `docs/reference/categories.md` + `docs/concepts/agent-skill-anatomy.md`, or (b) map sprint skills to existing categories (sprint-readiness → research, sprint-founding-hypothesis → problem-framing, sprint-test-and-score → validation, etc.) rather than introducing new ones.

**Risk if not fixed:** Documentation drift; users browsing categories don't find sprint skills under any of the 7 canonical buckets.

---

## P3 Findings

### P3.1: Library sample effort may be underestimated

**Where:** Both plans allocate 2-3 sessions per track for samples (so 4-6 sessions for 48 samples total).

**Issue:** 48 samples at ~10-15 minutes each is the implied pace. Sprint samples need to "tell a coherent story across the sprint" (per both plans' sample-task descriptions), which is more than fill-in-template work. The Brainshelf sample, for example, requires that the Foundation Sprint output flows into the bridge skill, which flows into the Design Sprint, which is consistent with the original customer assumptions. Cross-sample coherence is real authoring work.

**Recommendation:** Track sample-authoring time during the first thread (Brainshelf). If the first thread takes more than 1 session, re-estimate the remaining two threads upward.

### P3.2: Foundation Sprint concept doc contains interpretive editorial commentary

**Where:** `docs/concepts/foundation-sprint.md` Magic Lenses section: "an option that wins on Money but loses on Customer is asking the team to bet that they can shift customer perception over time."

**Issue:** This is interpretive commentary, not from canonical sources. It's consistent with the explanatory style of `triple-diamond-delivery-process.md`, but if pm-skills wants concept docs to be strictly attributable to canonical sources, this kind of editorial reading needs to be either sourced or marked as commentary.

**Recommendation:** Either leave as-is (consistent with the existing concept doc style) or add a "Commentary" subsection callout. Probably leave.

### P3.3: Validator Task 3 includes a redundant naming-convention case

**Where:** FS plan Task 3 lists naming patterns: `foundation-sprint-{move}` (foundation), `design-sprint-{move}` (design), `sprint-{move}` (shared), `sprint-foundation-to-design` (bridge).

**Issue:** `sprint-foundation-to-design` already matches the `sprint-{move}` pattern (where move is `foundation-to-design`). The bridge is structurally a shared skill with a hyphenated move name. The special-case enumeration is redundant.

**Recommendation:** Simplify Task 3's naming-convention list to three patterns (foundation-sprint-*, design-sprint-*, sprint-*) without the bridge special case. Smaller validator, easier to reason about.

---

## What's Right

To balance the findings, the following aspects of the plans/specs are well-structured and should NOT change:

- **Plan-spec content alignment is strong.** Each plan task maps to a spec section by number, and the skill catalog matches between the two views.
- **Cross-track coherence is well-handled.** FS plan owns shared infrastructure (validators, family contract, note-and-vote shared skill). DS plan consumes those outputs cleanly. Cross-references between plans are accurate.
- **Naming conventions are consistent.** Both plans use `sprint-note-and-vote`, `sprint-foundation-to-design`, and the foundation-sprint-* / design-sprint-* prefixes uniformly.
- **Decider Checkpoint pattern is consistent across all 16 skills.** Every skill ends with a Decider sign-off step, which is the central insight of the Knapp/Zeratsky methodology and the right invariant to enforce in the family contract.
- **Library-sample thread continuity is well-conceived.** Three threads (Brainshelf, Storevine, Workbench) carry from Foundation Sprint through bridge through Design Sprint, telling the same customer story across both methodologies.
- **Effort estimates are internally consistent.** 8-10 sessions per track, 16-20 combined, matches the v2.11.0 pattern (Meeting Skills Family, also 8 new skills, shipped in ~8-10 sessions).
- **Concept docs faithfully represent the spec/plan content.** Skill counts, mechanics, day structure, and source attribution all match.
- **Pre-execution review itself is happening.** The Phase 0 Adversarial Review Loop is being followed; this document is its output.

---

## Recommended Sequencing for Fixes

Before Phase 1 Task 1 of FS plan begins:

1. **Fix P1.1** (one-line edit to FS plan Task 5 file path)
2. **Fix P1.2** (add `_registry.yaml` registration step to FS plan Task 5 with all 16 members)
3. **Fix P1.3** (expand FS plan Task 5 with worked frontmatter example showing root vs metadata placement)
4. **Address P2.1** (decide on optional/multi-prerequisite convention; document in family contract or family validator design)
5. **Address P2.2** (author "Ratified Decisions" section in each integration plan ratifying spec open questions)

Fold into early phases:

6. **P2.3** (workflow craft-time notes) goes into FS Task 14, DS Tasks 9 and 10
7. **P2.4** (sample attribution) goes into FS Task 16 prep
8. **P2.5** (category taxonomy) is a Phase 6 (docs) task; defer until after skills are written so the impact is concrete

Accept or defer:

9. **P3.1, P3.2, P3.3** are awareness items; no immediate action

---

## Next Step

User decides which findings to act on now vs. accept. After fixes land, execution can begin from FS plan Phase 1 Task 1 against a clean review baseline.
