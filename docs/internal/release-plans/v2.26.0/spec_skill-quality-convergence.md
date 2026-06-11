# v2.26.0 Spec: Skill Quality Convergence (F-12)

**Status:** DRAFT for maintainer review (specced 2026-06-10; build does not start until approved). Revised 2026-06-10 R1 after the Codex adversarial review (Batch 0 file accounting corrected to 14; see [`review_2026-06-10_codex-adversarial.md`](review_2026-06-10_codex-adversarial.md)).
**Covers:** Skill Quality Convergence (F-12, issue #135). Re-scopes the stale effort brief ([`F-12-skill-quality-convergence.md`](../../efforts/F-12-skill-quality-convergence.md), which targets "25 domain skills" against "the v2.8 standard") to the current 65-skill catalog and current tooling, and folds in the description-layer findings of the 2026-06-09 repo audit.
**Companion:** [`plan_v2.26.0.md`](plan_v2.26.0.md) | [`implementation-plan_skill-quality-convergence.md`](implementation-plan_skill-quality-convergence.md).

---

## 0. Prerequisite resolution: M-13 is satisfied

The brief gates F-12 on M-13 (Convention Alignment). M-13 is **Complete** (verified 2026-04-04, per `docs/internal/efforts/M-13-convention-alignment.md`), and more importantly its job is now held continuously by enforcing CI rather than by a one-time pass: `lint-skills-frontmatter` (frontmatter shape, description bounds, TEMPLATE/EXAMPLE presence and structure), the family validators, and `check-skill-sample-coverage` run on every push for all 65 skills. The 2026-06-09 audit independently verified the full catalog passes the current structural tier. **The prerequisite is satisfied; no M-13 rerun is needed.** Tier-1 regressions during this effort are caught per-PR by CI.

## 1. Target cohort (re-scoped): 26 skills

The convergence gap is generational, confirmed by the audit: skills last touched in the 2026-01-26 v2.0 restructure (plus two early-2026 additions) average 33-41 body lines and ~200-char descriptions, while the 2026-05 generation ships 116-262 line bodies with entry modes, refusal contracts, "When NOT to Use" sections, and boundary-disambiguated descriptions.

**In cohort (26):** the 25 phase skills not yet at the 2026-05 standard, plus `foundation-persona`:

| Phase | Skills (count) |
|---|---|
| Define (4) | define-hypothesis, define-jtbd-canvas, define-opportunity-tree, define-problem-statement |
| Discover (3) | discover-competitive-analysis, discover-interview-synthesis, discover-stakeholder-summary |
| Develop (4) | develop-adr, develop-design-rationale, develop-solution-brief, develop-spike-summary |
| Deliver (6) | deliver-acceptance-criteria, deliver-edge-cases, deliver-launch-checklist, deliver-prd, deliver-release-notes, deliver-user-stories |
| Measure (4) | measure-dashboard-requirements, measure-experiment-design, measure-experiment-results, measure-instrumentation-spec |
| Iterate (4) | iterate-lessons-log, iterate-pivot-decision, iterate-refinement-notes, iterate-retrospective |
| Foundation (1) | foundation-persona |

**Out of cohort:** the 5 newer phase skills (define-prioritization-framework, discover-journey-map, discover-market-sizing, measure-okr-grader, measure-survey-analysis), all 2026-04+ foundation skills, the 15 tool skills, and the 11 utility skills (per the original brief's rationale; the lifecycle tools themselves set the standard). Batch 0 below touches a handful of out-of-cohort skills for targeted description fixes only.

## 2. What "convergence" means in 2026-06 (the quality bar)

The brief's Option B (fix FAILs + high-value WARNs, skip low-signal items), modernized:

1. **Description integrity (Batch 0, audit-driven):** collision pairs de-embedded, boundary sentences added, phantom references removed, dispatch-skill descriptions trimmed of execution mechanics. Normative texts in section 3.
2. **"When NOT to Use" adopted** for all 26 cohort skills (resolves the brief's open question 3 as ADOPT: it is the de facto standard of every 2026-04+ skill and the single highest-value addition for triggering accuracy). Adding a section = per-skill **minor** bump.
3. **Output-contract and checklist tightening** per `utility-pm-skill-validate` Tier-2 findings: enumerate template sections in the output contract where the skill says only "use the template"; rewrite untestable checklist items; fill thin EXAMPLE.md sections.
4. **Scar hygiene:** the audit found 16 cohort-era SKILL.md bodies (and ~37 files including references) carrying mid-sentence " . " em-dash-sweep scars in exactly the prose agents load; these are swept and the (now enforcing) scar guard's scope is extended to `skills/**` so they cannot return.
5. NOT in the bar: rewriting working instructions for style, adding entry modes or refusal contracts where the artifact does not warrant them, body-length parity with the 2026-05 generation. Convergence is a floor, not uniformity.

## 3. Batch 0: description integrity + scar hygiene (ships in v2.26.0)

This batch lands the 2026-06-09 audit's triggering-surface fixes. It is mechanical, reviewable in one PR, and independent of the deeper batches. Proposed descriptions are **verbatim and normative** (each checked: 20-100 words, no unquoted ": ", boundary pointers name real skills).

### 3.1 Collision pair rewrites (audit D1-D5)

**deliver-user-stories** (2.0.0 -> 2.0.1):
> Generates user stories in the standard persona, action, benefit story format from product requirements or feature descriptions. Use when breaking a feature into stories for sprint planning, writing tickets, or communicating scope to engineering. For testable Given/When/Then acceptance criteria on a story, use deliver-acceptance-criteria; for boundary and failure scenarios, use deliver-edge-cases.

**deliver-acceptance-criteria** (1.0.0 -> 1.0.1):
> Generates structured Given/When/Then acceptance criteria for a user story or feature slice, covering the happy path, key failure scenarios, and non-functional expectations in testable form. Use when turning requirements into verifiable scenarios for engineering handoff and QA sign-off. For a dedicated catalog of boundary conditions, error states, and recovery paths across a feature, use deliver-edge-cases; to write the stories themselves, use deliver-user-stories.

**deliver-edge-cases** (2.0.0 -> 2.0.1):
> Documents edge cases, error states, boundary conditions, and recovery paths for a feature. Use during specification to ensure comprehensive failure coverage, or during QA planning to identify test scenarios. Distinct from deliver-acceptance-criteria, which writes story-level Given/When/Then checks; this skill produces the systematic edge-case catalog for the whole feature.

**define-hypothesis** (2.0.0 -> 2.0.1):
> Defines a testable hypothesis with clear success metrics and a validation approach. Use when forming assumptions to test or aligning a team on what success looks like, before any experiment is designed. To design the A/B test or experiment that will validate the hypothesis, use measure-experiment-design.

**measure-experiment-design** (2.0.0 -> 2.0.1):
> Designs an A/B test or experiment with variants, success metrics, sample size, and duration for an existing hypothesis. Use when planning an experiment to validate a product change or test an assumption you have already framed. To articulate the hypothesis itself first, use define-hypothesis.

**discover-interview-synthesis** (2.0.0 -> 2.0.1):
> Synthesizes user research interviews into actionable insights, patterns, and recommendations. Use after conducting user interviews, customer calls, or usability sessions to extract and communicate findings across participants. Distinct from foundation-meeting-recap, which summarizes one internal meeting for its attendees; this skill aggregates research conversations into evidence-backed findings.

**foundation-meeting-recap** (1.0.0 -> 1.0.1; out-of-cohort, boundary append only). Append one sentence to the existing description:
> For synthesizing user research interviews across participants, use discover-interview-synthesis.

**iterate-lessons-log** (2.0.0 -> 2.0.1):
> Creates a structured lessons learned entry for organizational memory. Use after an incident, a completed project, or a significant learning to record knowledge for future teams and initiatives. Distinct from iterate-retrospective, which facilitates the team ceremony; this skill writes the durable lessons entry that outlives it.

**iterate-retrospective** (2.0.0 -> 2.0.1):
> Facilitates and documents a team retrospective capturing what went well, what to improve, and action items. Use at the end of a sprint, project, or milestone to reflect and improve team practices. To bank individual learnings into organizational memory afterward, use iterate-lessons-log.

The OKR pair (foundation-okr-writer vs measure-okr-grader, audit D6) is a watch item, not a Batch 0 edit: both descriptions already state the draft-time vs cycle-close boundary.

### 3.2 Phantom reference removal (audit D7)

**utility-slideshow-creator** (1.0.0 -> 1.0.1): the description promises "custom themes via utility-slideshow-themer," a skill that has never existed in git history. Replace the description with:
> Generates professional presentations from a JSON deck specification using 18 slide types with dark/light variants, content-to-layout decision logic, and calibrated character limits. Ships with a default professional theme.

Execution-time check: if `skills/utility-slideshow-creator/references/` documents a real custom-theming mechanism, append one truthful clause describing it; never re-promise a separate skill.

### 3.3 Dispatch-skill description trims (audit D8)

The four sub-agent dispatch skills spend 300+ always-loaded characters on client-routing mechanics that belong in the body. Rewrites (each: verify the body already carries the routing instructions, which it does for all four; the description change is a pure trim). `utility-pm-workflow-orchestrator` is EXCLUDED here: its rewrite is owned by the F-15 work in `spec_workflow-builder-and-chaining.md` section 1.4 to avoid a double bump.

**utility-pm-critic** (1.0.0 -> 1.0.1):
> Run adversarial review on a PM artifact via the pm-critic sub-agent. Returns findings graded P0/P1/P2/P3 with a concrete fix suggestion per finding and a machine-readable status block. Use after producing a PRD, meeting recap, OKR set, persona, or any PM artifact you want stress-tested before it ships.

**utility-pm-changelog-curator** (1.0.0 -> 1.0.1):
> Draft CHANGELOG entries from git log via the pm-changelog-curator sub-agent, applying the repo hygiene rules (describe what changed, public paths only, no attribution trailers). Returns a layered draft with a status summary for maintainer review; refuses a dirty working tree unless --committed-only is passed. Use when banking unreleased changes or preparing a release.

**utility-pm-release-conductor** (1.0.0 -> 1.0.1):
> Walk the guided 6-gate release runbook (G0 readiness, G1 adversarial review, G2 version bump and CHANGELOG, G2.5 commit and re-verify, G3 tag and push, G4 post-tag hygiene) via the pm-release-conductor sub-agent. Refuses gate bypasses and tags only the re-verified SHA. Use when cutting a pm-skills release.

**utility-pm-skill-auditor** (1.0.0 -> 1.0.1):
> Run a repo-wide cross-cutting governance audit via the pm-skill-auditor sub-agent. Aggregates the enforcing validator suite, re-derives aggregate counters, and surfaces cross-cutting issues no single validator catches, graded P0/P1/P2/P3 with a machine-readable status. Use for pre-release readiness checks or a periodic repo health audit.

### 3.4 Scar sweep + guard scope extension

- Sweep every mid-sentence " . " scar under `skills/**` (16 SKILL.md bodies, ~37 files including references; detection: `grep -rEn '[a-z] \. [a-z]' skills/ --include="*.md"`), replacing with " - " or restructuring.
- In the SAME PR, extend `scripts/check-emdash-scars.mjs` scope to include `skills/**` hand-authored prose (it is enforcing since v2.25.2 PR #182, so scope extension must land with, never before, a clean corpus). Its unit tests gain a `skills/` fixture case.

### 3.5 Batch 0 versioning decisions

- **D-1:** description rewrites are **patch** bumps (clarification class per `docs/internal/skill-versioning.md`); each bumped skill gains its first `HISTORY.md` (second-version trigger), 14 files (the 9 collision/boundary edits of 3.1 + the phantom fix of 3.2 + the 4 dispatch trims of 3.3; the orchestrator's matching changes are counted under F-15, not here).
- **D-2:** scar-only fixes (files whose only change is the sweep) ship **without** a version bump: cosmetic, no contract signal. Skills getting both a description rewrite and a sweep carry the patch bump from D-1.
- **D-3:** cohort skills touched in Batch 0 are bumped AGAIN (minor) by their content batch later; two honest HISTORY rows are accepted in exchange for landing all collision fixes inside v2.26.0 regardless of batch timing.

## 4. Batches 1-4: content convergence (validate -> iterate at scale)

First at-scale use of the `utility-pm-skill-validate` -> `utility-pm-skill-iterate` lifecycle, per the brief's intent. Per-skill loop: validate (capture report) -> iterate (apply fixes per the section 2 bar) -> minor bump + HISTORY row -> re-validate (findings resolved) -> lint + scar grep.

| Batch | Skills | Count | Vehicle |
|---|---|---|---|
| 1 (pilot) | triage 5 representative skills (deliver-prd, define-hypothesis, discover-competitive-analysis, measure-experiment-design, iterate-retrospective) to calibrate finding patterns, then converge the full Deliver cohort | 6 | **v2.26.0** |
| 2 | Define (4) + Develop (4) | 8 | v2.26.x patch |
| 3 | Discover (3) + Iterate (4) | 7 | v2.26.x patch |
| 4 | Measure (4) + foundation-persona | 5 | v2.26.x patch |

**D-4 (release vehicle split):** Batch 0 + Batch 1 ship inside v2.26.0 (the minor's "quality" theme is honest: every collision fixed, the most-installed cohort converged - deliver-acceptance-criteria is the most-installed skill on skills.sh). Batches 2-4 ride v2.26.x patches, one PR per batch, so the minor is never blocked on a long sweep. Per-skill versions are decoupled from the repo version, so nothing about this split is user-visible except earlier shipping.

> **D-4 AMENDED (2026-06-10, maintainer instruction):** with the build finishing ahead of the tag, the maintainer directed Batches 2-4 to land pre-tag, folding the entire convergence effort into v2.26.0 (PRs #194 Batch 2, #195 Batch 3, #196 Batch 4). The original split's rationale (never block the minor) no longer applied because nothing was waiting. Issue #135 closes when Batch 4 merges instead of after a v2.26.x line.

Batch 1 starts with the brief's triage step, updated: confirm `utility-pm-skill-validate`'s current check list against its SKILL.md (v1.0.0) before relying on the brief's eight-check table, which may have drifted.

## 5. Acceptance criteria

- AC-Q1: every section 3 description matches this spec verbatim (or carries a review-approved amendment); `lint-skills-frontmatter` green (word counts, no unquoted ": ").
- AC-Q2: every boundary pointer names an existing skill (grep each named skill against `skills/`).
- AC-Q3: `grep -rEn '[a-z] \. [a-z]' skills/ --include="*.md"` returns zero matches after Batch 0; `check-emdash-scars` extended to `skills/**` and green (enforcing).
- AC-Q4: each bumped skill has a HISTORY.md whose summary table carries the current `metadata.version`; `validate-skill-history` green.
- AC-Q5: after Batch 1, all 6 Deliver-cohort skills pass `utility-pm-skill-validate` with zero FAIL and zero high-value WARN, each with a "When NOT to Use" section and a minor bump.
- AC-Q6: catalog counts unchanged by this effort (no new skills); `check-count-consistency` green at every PR.
- AC-Q7: no instruction regression: per-skill EXAMPLE.md still matches its TEMPLATE.md structure after iteration (validate re-run is the check).

## 6. Out of scope

- Trigger-accuracy eval harness (the audit's strategic recommendation): deferred, v2.27.0 candidate (see `plan_v2.26.0.md` deferred section). Batch 0 is the manual fix; the harness is the systematic guard.
- Utility and tool cohort content convergence; the OKR-pair description edits (watch item only).
- Any change to skill BEHAVIOR contracts beyond the section 2 bar.
