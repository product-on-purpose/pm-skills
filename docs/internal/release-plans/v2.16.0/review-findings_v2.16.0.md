# v2.16.0 Review Findings Catalog

**Status:** Reviews complete; 28 of 32 findings closed via plan amendments
**Created:** 2026-05-16
**Reviewers:** Claude (self-review) + Codex (adversarial review via codex:codex-rescue)
**Severity grammar:** P0 (blocking) / P1 (significant) / P2 (quality) / P3 (nit). Per D15 in `plan_v2.16.0.md`.

This document is the durable artifact of the two-checkpoint review cycle for v2.16.0. Self-review caught structural drift after authoring the initial 10-file plan set. Codex adversarial review caught what self-review missed, particularly state-transition issues that single-source authors are blind to. Both checkpoints produced findings; this file catalogs every finding with disposition status.

---

## Summary Table

| Cycle | P0 | P1 | P2 | P3 | Total | Closed | Deferred |
|---|---|---|---|---|---|---|---|
| Self-review | 1 | 7 | 6 | 4 | 18 | 14 | 4 |
| Codex review | 1 | 6 | 6 | 1 | 14 | 14 | 0 |
| **Combined** | **2** | **13** | **12** | **5** | **32** | **28** | **4** |

**Closure rate:** 28 of 32 findings closed (87.5%). All P0 and P1 findings closed. 11 of 12 P2 closed. 2 of 5 P3 closed; 3 deferred as cosmetic.

---

## Self-Review Findings (18)

Authored by Claude after completing the initial 10-file plan set, before invoking Codex. Methodology: re-read each file looking for internal inconsistencies, missing acceptance criteria, conflicting decisions, sequencing problems, scope ambiguity, estimate accuracy, risk gaps, cross-reference accuracy, style violations.

### P0 findings (self-review)

#### SR-P0-01: Validator approach contradicts itself between SI4 and CI1

**Status:** CLOSED. Resolved by master plan D19 ratifying "extend `validate-agents-md.{sh,ps1}`" (not new dedicated validator).

**Description:**
- `subagents-integration-plan.md` SI4 said: "Phase 1 extends `validate-agents-md.{sh,ps1}` to recognize `subagents/` directory. New dedicated `validate-sub-agents.{sh,ps1}` deferred to v2.17 if pattern proves out."
- `ci-plan.md` CI1 said: "DEFER decision to Phase 1 Task 1 outcome. Default lean: ship dedicated `validate-sub-agents.{sh,ps1,md}` rather than extend `validate-agents-md`."
- Opposing positions on the same decision.

**Resolution:** Added D19 to master plan ratifying the extension path. Updated SI4 to inherit D19. Updated CI1 to inherit D19. CI Phase 1 Task 1 reframed from "decide" to "confirm feasibility."

**Commits affected:** Master plan `plan_v2.16.0.md`, sub-plans `subagents-integration-plan.md` SI4, `ci-plan.md` CI1 + Task 2.

### P1 findings (self-review)

#### SR-P1-01: Master plan acceptance criteria missing docs and CI deliverables

**Status:** CLOSED. Added Docs track + CI track sections to master plan Acceptance Criteria.

#### SR-P1-02: Master plan Deliverables Overview missing docs and CI line items

**Status:** CLOSED. Added "From docs-plan (5 new docs)" subsection + "New CI validators (from ci-plan)" subsection to Deliverables Overview.

#### SR-P1-03: Em-dash allowlist scope inconsistent across 3 references

**Status:** CLOSED. Resolved by master plan D27 establishing `scripts/check-em-dashes` as canonical with allowlist file. All plans now reference the script by name.

#### SR-P1-04: Sequencing duplicate between subagents Phase 7 and docs-plan Phase 4

**Status:** CLOSED. Subagents Phase 7 narrowed to integration-plan-only doc check; broader sweep deferred to docs-plan Phase 4 Task 9.

#### SR-P1-05: Component count table doesn't include docs + CI deltas

**Status:** CLOSED. Updated component count table: concept docs +2, contributing guides +3, manifest files +2, enforcing validators 24 -> 29-30.

#### SR-P1-06: Estimated effort propagation

**Status:** CLOSED. Master plan Where We Are updated from "12-16 sessions" to "13-20 sessions" matching the sub-plan total.

#### SR-P1-07: Pairing manifest naming conflict potential

**Status:** CLOSED. Resolved by D29 designating `subagents/_pairing.yaml` (matches existing `_registry.yaml` convention; ownership clarified to subagents Phase 1 Task 1, not ci-plan).

### P2 findings (self-review)

#### SR-P2-01: Docs-plan DC2 leaves pm-skill-auditor and pm-changelog-curator without dedicated usage docs

**Status:** CLOSED. Added "Maintainer Operations" subsection to `using-sub-agents.md` outline in docs-plan Task 3.

#### SR-P2-02: Spec doc cross-references to public docs assume Phase 1+ ordering

**Status:** CLOSED. Forward-reference note added to `spec_pm-critic.md`. (Same note may be added to other 3 specs in a future cleanup; lower priority since the convention is now documented.)

#### SR-P2-03: Synthetic-failure tests are manual; no test framework

**Status:** CLOSED (acknowledged). CI plan documents these as manual one-time verifications recorded in each validator's `.md` companion. No test framework introduced.

#### SR-P2-04: Library sample directory convention is new

**Status:** DEFERRED. Low-impact note about parallel naming (`library/sub-agent-samples/` vs `library/skill-output-samples/`). Documented for awareness; one-line update to `SAMPLE_CREATION.md` deferred to Phase 6 final audit.

#### SR-P2-05: Master plan "What's next" doesn't reflect parallel-track sequencing

**Status:** CLOSED. Rewrote "What's next" with parallel-track priorities (8 priority items reflecting interleaved tracks).

#### SR-P2-06: Risk register doesn't include docs/CI-specific risks

**Status:** CLOSED. Added R9 (documentation surface drift), R10 (CI runtime budget), R11 (G2.5 chain cost compound), R12 (chained handoff envelope drift) to master plan Risk Register.

### P3 findings (self-review)

#### SR-P3-01: 4 em-dash instances in v2.16.0 files documenting the em-dash sweep

**Status:** CLOSED. Resolved by ci-plan Task 5 pre-populating `scripts/check-em-dashes.allowlist` with the 4 known intentional instances plus `library/skill-output-samples/**` blanket exclusion.

#### SR-P3-02: Date placeholders `2026-MM-DD` remain in master plan

**Status:** DEFERRED (expected). Placeholders fill in at tag time.

#### SR-P3-03: Some sub-plans use "Phase N Task M" notation; others use bare "Task N"

**Status:** DEFERRED (cosmetic). Standardization is lower priority than execution.

#### SR-P3-04: Spec doc internal cross-references use varying patterns

**Status:** DEFERRED (cosmetic). Markdown link standardization is lower priority than execution.

---

## Codex Adversarial Review Findings (14)

Generated 2026-05-16 via `codex:codex-rescue` adversarial review of the v2.16.0 plan set. Codex read all 10 files independently and produced findings graded P0/P1/P2/P3 per the documented severity grammar. The output is preserved verbatim below to maintain review artifact integrity.

### P0 findings (Codex)

#### R01: The conductor can tag a release without committing the G2 version-bump and release-prep edits

**Severity:** P0
**Status:** CLOSED. Resolved by master plan D22 (added new gate G2.5) + spec_pm-release-conductor.md updates.

**Codex evidence:** "G2 edits `plugin.json`, marketplace manifest, CHANGELOG, docs mirror, README, plan status, and release notes; G3 then tags 'HEAD of the release branch,' with no commit, clean-tree check, or CI rerun between G2 and G3."

**Codex risk:** "The pushed tag can point at a commit that does not contain the release metadata, corrupting the release artifact."

**Codex recommendation:** "Add a required G2 'commit release-prep edits + re-run G0/CI on that commit' sub-check before G3 can create the tag."

**Resolution applied:** New gate G2.5 inserted between G2 and G3 in pm-release-conductor. G2.5 commits the release-prep edits, verifies clean working tree, re-runs G0 sub-checks against the new HEAD, and pushes to origin to trigger fresh CI before G3 tags the new commit. G3 sub-check 1 now refuses to tag any SHA other than the one G2.5 captured.

### P1 findings (Codex)

#### R02: Node 22.12 workflow bumps sequenced after the Astro 6 branch is required to have green CI

**Severity:** P1
**Status:** CLOSED. doc-stack-modernization-plan.md Phase 1 Task 1a added; Phase 3 Task 7 vacated.

**Codex evidence:** "DM6 says all 5 workflows move to Node 22.12+ 'in the same merge,' Phase 2 Task 5 requires spike-branch CI green before merge, but Phase 3 Task 7 bumps workflow Node versions after the merge."

**Codex risk:** "Astro 6 can fail CI under old Node, or main can temporarily carry incompatible package/workflow state."

**Resolution applied:** Node 22.12+ workflow bumps moved from Phase 3 Task 7 to Phase 1 Task 1a. They now land BEFORE the Astro 6 spike-branch CI-green gate (Phase 1 Task 4). DM6 updated.

#### R03: CI says chain-depth invariants are enforcing, but the planned validator only warns when an agent has the `Agent` tool

**Severity:** P1
**Status:** CLOSED. Resolved by master plan D21 + ci-plan Task 2 rewrite.

**Codex evidence:** "CI3 says all new sub-agent validators are enforcing; Task 2 says `Agent` in `tools:` is 'informational; not failure'; D14 says only the conductor may chain and children must not chain further."

**Codex risk:** "`pm-skill-auditor` or `pm-changelog-curator` could accidentally gain `Agent` and CI would still pass."

**Resolution applied:** D21 added making Agent tool hard-fail outside `subagents/_chain-permitted.yaml` allowlist. ci-plan Task 2 rewritten with hard-fail semantics + allowlist enforcement.

#### R04: The validator expects `tools:` to be a YAML list, while every spec defines it as a comma-separated scalar

**Severity:** P1
**Status:** CLOSED. Resolved by master plan D20 ratifying comma-separated scalar.

**Codex evidence:** "CI Task 2 says 'Validates `tools:` is a list'; specs use forms like `tools: Read, Grep, Glob`."

**Codex risk:** "Correctly implemented agent files will fail CI, or authors will change the frontmatter shape inconsistently."

**Resolution applied:** D20 added ratifying comma-separated scalar form (matches Claude Code documented sub-agent frontmatter convention). ci-plan Task 2 updated to validate scalar, not list.

#### R05: `--skip-gates` contradicts the conductor's no-bypass release-safety contract

**Severity:** P1
**Status:** CLOSED. Resolved by master plan D24 + spec_pm-release-conductor.md Inputs section update.

**Codex evidence:** "The spec says the conductor 'Does NOT skip gates' and 'maintainer cannot bypass via prompt,' but Inputs define `--skip-gates <list>` with warning logging."

**Codex risk:** "A real release can bypass G0/G1/G2 checks while still appearing conductor-managed."

**Resolution applied:** `--skip-gates` removed from Inputs section. "Does NOT skip gates - NO BYPASS POSSIBLE" added to conductor's behavior contract. D24 documents the removal + v2.17 deferral path (non-release dry-run only).

#### R06: The changelog curator does not refuse or warn on dirty working trees

**Severity:** P1
**Status:** CLOSED. Resolved by master plan D25 + spec_pm-changelog-curator.md Refusal Protocols section addition.

**Codex evidence:** "Curator reads `git log {since}..HEAD` and refuses only for missing tag, empty range, or unreadable CLAUDE.md; auditor refuses when repo state has uncommitted changes and asks what scope to audit."

**Codex risk:** "`/pm-draft-changelog` can silently omit uncommitted release-prep or WIP changes."

**Resolution applied:** Added dirty-tree refusal as 4th refusal protocol. New `--committed-only` argument acknowledges the scope and bypasses the refusal.

#### R07: G4 can declare release completion even when post-tag verification fails

**Severity:** P1
**Status:** CLOSED. Resolved by master plan D23 + spec_pm-release-conductor.md G4 update.

**Codex evidence:** "G4 checks plugin install, marketplace registration, Pages rebuild, and release UI body, but says 'Blocker: none' and exits cleanly after reminders."

**Codex risk:** "A broken install path or failed docs deploy can be treated as a successful release."

**Resolution applied:** G4 sub-checks now produce P0/P1/P2 incidents on failure. P0 (plugin install broken) blocks "Release complete" output. P1 (marketplace, Pages) surface but don't block. P2 are reminders. Rollback note added explaining v{patch} fast-follow path.

### P2 findings (Codex)

#### R08: The chained auditor and curator handoffs lack a machine-readable status envelope

**Severity:** P2
**Status:** CLOSED. Resolved by master plan D26 + Status YAML blocks added to spec_pm-skill-auditor.md + spec_pm-changelog-curator.md.

**Codex evidence:** "Conductor blocks on auditor P0 count and consumes curator drafts, but both child specs define human Markdown outputs without required `status`, `p0_count`, `refusal`, `range`, or `handoff_summary` fields."

**Codex recommendation:** "Add a 'Chained Handoff Contract' block to both child specs and have conductor parse only that block."

**Resolution applied:** Status YAML block added at end of auditor output (`status`, `p0_count`, `p1_count`, etc.). Status YAML block added at end of curator output (`status`, `target_version`, `since_tag`, `dirty_tree_warning`, etc.). Conductor's composition sections updated to parse Status block at G0 (auditor) and G2 (curator).

#### R09: Enforcing-validator counts are inconsistent across the release set

**Severity:** P2
**Status:** CLOSED. Master plan validator count formula updated to "24 + 1 DS strict promotion + 4-5 new validators = 29-30" with exact count finalized at CI Phase 1 Task 1.

#### R10: The em-dash gate has four different scopes

**Severity:** P2
**Status:** CLOSED (combined with SR-P1-03). Resolved by D27 establishing `scripts/check-em-dashes` as canonical. All plans now reference the script by name; scope and allowlist owned by the script.

#### R11: The roadmap archive disposition conflicts between master and hygiene plan

**Severity:** P2
**Status:** CLOSED. Resolved by master plan D28: roadmap STAYS in `_working/` per hygiene plan HG3.

**Codex evidence:** "Master says '3 subagent docs + 2 backlog aggregates + 1 roadmap moved'; Hygiene Task 3 says `roadmap_opus-4.7-max_2026-05-14.md` is active and should 'KEEP in `_working/`.'"

**Resolution applied:** Master plan corrected to "3 subagent docs + 2 backlog aggregates moved" (roadmap stays active).

#### R12: `subagents/_pairing.yaml` is required by CI but not owned by the integration plan

**Severity:** P2
**Status:** CLOSED. Resolved by master plan D29: pairing manifest is a subagents-integration-plan Phase 1 Task 1 deliverable (NOT ci-plan).

**Resolution applied:** Subagents Phase 1 Task 1 expanded to ship `subagents/_pairing.yaml` + `subagents/_chain-permitted.yaml` alongside the directory scaffold. ci-plan Phase 2 Task 4 reads the manifests but does not author them.

#### R13: CONTEXT.md refresh sequencing is contradictory

**Severity:** P2
**Status:** CLOSED. Hygiene plan Phase 1 Task 1 explicit prerequisite added: "all other phases of all sub-plans report COMPLETE." Architecture section updated.

### P3 findings (Codex)

#### R14: Public documentation counts are inconsistent

**Severity:** P3
**Status:** CLOSED. docs-plan intro updated to "5 new files + 3 from integration plan = 8 total public docs."

---

## Pattern Summary (from Codex review)

Codex's pattern-level diagnosis at the end of its review:

> "The missed issues cluster around two systemic problems. First, release orchestration contracts are described at the gate level but not at the state-transition level: G2 edits can exist uncommitted when G3 fires, G4 checks have no blocking power, child sub-agent outputs have no machine-readable envelope, and `--skip-gates` undermines the very safety contract the conductor is meant to enforce. Second, counter and scope drift: validator counts, em-dash glob scope, roadmap disposition, and docs counts each have multiple conflicting sources of truth across the 10 plan files, creating a category of release-day surprise where CI, the conductor, and the release notes all read from different values."

**Both diagnoses applied to future planning work:**

- **Pattern 1 (state transitions):** authored plans should explicitly verify the state transition between each step, not just the steps. Applied to v2.16 via G2.5 commit gate, G4 incident gating, Status envelope contract, removal of bypass mechanisms. Pattern carried forward to v2.17+ planning conventions.
- **Pattern 2 (counter and scope drift):** single source of truth per cross-cutting concern. Applied to v2.16 via `check-em-dashes` canonical script (D27), validator-count formula (D9 + R09 resolution), `_pairing.yaml` single-owner (D29). Pattern carried forward to v2.17+ planning conventions.

---

## Findings Disposition Summary

| Severity | Count | Closed | Deferred | Closure rate |
|---|---|---|---|---|
| P0 | 2 | 2 | 0 | 100% |
| P1 | 13 | 13 | 0 | 100% |
| P2 | 12 | 11 | 1 (SR-P2-04 library sample doc note; low impact) | 91.7% |
| P3 | 5 | 2 (SR-P3-01, R14) | 3 (SR-P3-02 placeholders expected, SR-P3-03 + SR-P3-04 cosmetic) | 40% |
| **Total** | **32** | **28** | **4** | **87.5%** |

**4 deferred findings (all cosmetic or expected):**

- SR-P2-04: Library sample directory parallel naming. One-line note to `SAMPLE_CREATION.md`; deferred to subagents Phase 6 final audit.
- SR-P3-02: Date placeholders fill in at tag time; expected, not a defect.
- SR-P3-03: Phase/Task notation consistency; cosmetic.
- SR-P3-04: Spec doc internal cross-reference patterns; cosmetic.

---

## Closure Map: Findings -> Plan Updates

Every closed finding maps to a specific plan amendment. Audit trail:

| Finding | Resolution location | Decision ID |
|---|---|---|
| SR-P0-01 | master plan D19 + SI4 update + CI1 update | D19 |
| R01 | spec_pm-release-conductor.md G2.5 + D22 | D22 |
| SR-P1-01 | master plan Acceptance Criteria additions | (no D needed) |
| SR-P1-02 | master plan Deliverables Overview additions | (no D needed) |
| SR-P1-03 | master plan D27 + plans reference script | D27 |
| SR-P1-04 | subagents Phase 7 narrowed | (no D needed) |
| SR-P1-05 | master plan Component Count table update | (no D needed) |
| SR-P1-06 | master plan Where We Are session estimate | (no D needed) |
| SR-P1-07 | master plan D29 + subagents Phase 1 Task 1 | D29 |
| R02 | doc-stack Phase 1 Task 1a relocation | (no D needed; sequencing fix) |
| R03 | master plan D21 + ci-plan Task 2 hard-fail | D21 |
| R04 | master plan D20 + ci-plan scalar validation | D20 |
| R05 | master plan D24 + spec conductor Inputs update | D24 |
| R06 | master plan D25 + spec curator Refusal addition | D25 |
| R07 | master plan D23 + spec conductor G4 update | D23 |
| R08 | master plan D26 + Status blocks in 2 spec docs | D26 |
| R09 | master plan validator count update + ci acceptance | (no D needed) |
| R10 | master plan D27 (combined with SR-P1-03) | D27 |
| R11 | master plan D28 | D28 |
| R12 | master plan D29 (combined with SR-P1-07) | D29 |
| R13 | hygiene plan Phase 1 Task 1 prerequisite | (no D needed) |
| R14 | docs-plan intro doc-count update | (no D needed) |
| SR-P2-01 | docs-plan Task 3 Maintainer Operations subsection | (no D needed) |
| SR-P2-02 | forward-reference note in spec_pm-critic.md | (no D needed) |
| SR-P2-03 | ci-plan documents manual verification convention | (no D needed) |
| SR-P2-05 | master plan What's next rewrite | (no D needed) |
| SR-P2-06 | master plan R9-R12 risk additions | (no D needed) |
| SR-P3-01 | ci-plan Task 5 allowlist pre-population | (no D needed) |

11 of the 28 closed findings resulted in new ratified decisions (D19-D29). The remainder were mechanical fixes that did not require an architectural decision.

---

## Review Methodology Notes

For future v2.X.Y cycles. Pattern proven by this two-checkpoint review:

1. **Self-review catches structural drift after authoring.** Most useful when re-reading from scratch after the initial pass completes, treating each file as if you didn't author it.
2. **Codex adversarial review catches state-transition and cross-file drift.** Single-author plans tend to be locally coherent but globally inconsistent. A second LLM with no authorship attachment finds gaps mechanically.
3. **The Decision Brief pattern (`feedback_decision-brief-pattern.md`)** is the right pattern for high-stakes decisions that need maintainer review. Compact decision tables (used in master plan Ratified Decisions for low-stakes items) hide alternatives.
4. **The Phase 0 Adversarial Review Loop** (codified 2026-04-18) wants a Phase 1 re-run after major plan amendments. This v2.16 plan set has had one full Codex review cycle; a second cycle should run post-execution-of-Phase-2 (after pm-critic ships) to validate the slate against observed reality.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md) (Ratified Decisions D1-D29)
- Open questions: [`open-questions_v2.16.0.md`](./open-questions_v2.16.0.md) (6 high-stakes decisions + graceful-degradation question awaiting maintainer review)
- Sub-plans: [`subagents-integration-plan.md`](./subagents-integration-plan.md), [`docs-plan.md`](./docs-plan.md), [`ci-plan.md`](./ci-plan.md), [`doc-stack-modernization-plan.md`](./doc-stack-modernization-plan.md), [`repo-hygiene-plan.md`](./repo-hygiene-plan.md)
- Spec docs: [`spec_pm-critic.md`](./spec_pm-critic.md), [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md), [`spec_pm-changelog-curator.md`](./spec_pm-changelog-curator.md), [`spec_pm-release-conductor.md`](./spec_pm-release-conductor.md)
- Phase 0 Adversarial Review pattern: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- Decision Brief pattern: `feedback_decision-brief-pattern.md` (in memory)
- Codex review invocation: 2026-05-16 via `codex:codex-rescue` subagent; session ID `f0f1086c-3b37-4579-b912-5a2d6938a275`
