# CI Plan

> **For agentic workers:** Use superpowers:executing-plans. Tasks here interlock with `subagents-integration-plan.md` Task 4 (initial validate-agents-md decision) and `doc-stack-modernization-plan.md` Phase 1 Task 4 (validator suite re-run on Astro 6 spike).

**Goal:** Extend CI to recognize the new `subagents/` directory and the sub-agent component class. Decide between extending `validate-agents-md` or shipping a dedicated `validate-sub-agents` validator pair. Add CI checks for sub-agent invariants: companion command pairing, frontmatter shape, runtime-components.md sync, chain depth limit. Document every new or modified script per the existing `.md` companion convention.

**Architecture:** pm-skills CI ships validators as triplets: `scripts/{name}.sh` (Linux runners) + `scripts/{name}.ps1` (Windows runners) + `scripts/{name}.md` (human-facing documentation). Validators are invoked via `.github/workflows/validation.yml`. New validators land alongside existing 24+ validators; no new framework needed.

**Cross-references:** Master plan at `plan_v2.16.0.md`. Subagents integration plan ships the actual agent files; this plan ships the CI that enforces invariants on them. Doc-stack modernization plan handles the Astro 6 / Node 22.12+ workflow updates; this plan does NOT duplicate that work.

---

## Status

**Plan ACTIVE.** Not yet started. 10 tasks across 4 phases.

### Where we are

| Phase | Status |
|---|---|
| Phase 1: Validator decision (extend vs new) | PENDING |
| Phase 2: Ship validators | PENDING |
| Phase 3: Workflow integration | PENDING |
| Phase 4: Documentation + cross-cutting | PENDING |

### Estimated remaining

1-2 sessions. Most of the work is shipping `.sh` + `.ps1` + `.md` triplets following the established convention.

---

## Prerequisites

- [x] v2.15.0 tagged (HEAD `a108301`)
- [x] v2.15.1 shipped (HEAD `6f89439`, 2026-05-17): adds 3 enforcing validators (`check-landing-page-counts`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`) plus 1 orchestration script (`pre-tag-validate`); validator inventory grew from 24 to 27 enforcing
- [x] `scripts/validate-agents-md.{sh,ps1,md}` exists and is the closest analogue for the extend-vs-new decision
- [ ] `subagents/` directory exists (subagents Phase 1 Task 1)
- [ ] Per-agent frontmatter spec ratified (in each `spec_pm-*.md`)

## v2.15.1 carry-in reconciliation (added in v2.15.2 closeout)

Three validators shipped in v2.15.1 reduce the v2.16.0 ci-plan scope below:

| v2.15.1 validator | Overlaps with v2.16.0 plan task | Reconciliation |
|---|---|---|
| `check-landing-page-counts.{sh,ps1,md}` (--strict) | Task 6 `check-aggregate-counters` | v2.16.0 plan needs decision: EXTEND v2.15.1 validator (add AGENTS.md / CONTEXT.md / README.md exact-count assertion to existing landing-page coverage) OR ship parallel stricter validator. Recommendation: EXTEND. The v2.15.1 validator already handles the 4 user-visible landing pages with flexible regex; the v2.16.0 work adds 3 internal-context surfaces with strict regex. Combine into one script with a `--mode=user|internal|all` flag. |
| `check-workflow-generator-coverage.{sh,ps1,md}` | Not in v2.16.0 ci-plan; covers a different concern | Already enforcing in CI. No v2.16.0 action. |
| `check-agents-md-command-sync.{sh,ps1,md}` | Not in v2.16.0 ci-plan; covers a different concern (commands/) | Already enforcing in CI. v2.16.0 Task 2 (extend validate-agents-md for sub-agents) will operate ALONGSIDE this validator, not replace it. |

Plus the `scripts/pre-tag-validate.{sh,ps1,md}` orchestration script ships in v2.15.1. v2.16.0 new validators should be added to its `VALIDATORS` and `$Validators` arrays as they land, per the `pre-tag-validate.md` "Adding new validators to the bundle" section.

**Net new v2.16.0 ci-plan scope:** 2 new validators (`check-em-dashes`, `check-aggregate-counters` as an extension of v2.15.1's `check-landing-page-counts`) + 1 extension of `validate-agents-md` for sub-agents + possible new dispatch-skill validators per D30. Down from the original "5 new validators" framing.

---

## Scope

This plan covers:

- Decision: extend `validate-agents-md` per D19 (Phase 1 confirms feasibility)
- Extension to `validate-agents-md.{sh,ps1}`: subagents/ scan + frontmatter checks + chain-permitted allowlist enforcement (D21)
- `check-runtime-components-sync.{sh,ps1,md}` (new; verifies `subagents/` entries match `runtime-components.md` rows)
- `check-sub-agent-command-pair.{sh,ps1,md}` (new; every agent has a companion command per `subagents/_pairing.yaml`)
- `check-em-dashes.{sh,ps1,md}` (new; codifies the canonical em-dash sweep per D27)
- `check-aggregate-counters.{sh,ps1,md}` (new; codifies aggregate-counter re-derivation)
- `validation.yml` workflow updates (Phase 3): add new validators in CI5 order
- `docs/contributing/ci-conventions.md` updates (Phase 4): document the new validators + their conventions
- **NEW per D30 / Q7:** dispatch skills at `skills/utility-pm-{role}/` are validated by EXISTING validators (`lint-skills-frontmatter`, `validate-commands`, `validate-agents-md`). No new dedicated dispatch-skill validator in v2.16. The pairing relationship between dispatch skill and sub-agent is documented as convention; CI enforcement deferred to v2.17 if drift becomes measurable.

This plan does NOT cover:

- Astro 6 / Node 22.12+ workflow Node bumps (covered in `doc-stack-modernization-plan.md` Phase 3)
- DS family validator metadata-shape strict promotion (covered in `repo-hygiene-plan.md` Phase 3 Task 4)
- pm-skills-mcp CI (M-22 blocked; out of scope)
- Hook validators (no hooks shipping in v2.16)
- CodeQL changes
- PostToolUse / Stop hooks for inline validation (deferred to v2.17)

---

## Ratified Decisions

| # | Decision area | Choice |
|---|---|---|
| **CI1** | **Validator approach** | **RESOLVED per master plan D19: EXTEND `validate-agents-md.{sh,ps1}`** to recognize `subagents/` directory and verify sub-agent invariants. Dedicated `validate-sub-agents.{sh,ps1,md}` DEFERRED to v2.17 if invariant set grows past comfortable scope. CI Phase 1 Task 1 now confirms feasibility (does not re-decide); if validate-agents-md cannot absorb the new checks without bloat, escalate to maintainer to amend D19. |
| **CI2** | **Validator triplet convention** | Every new validator ships `.sh` + `.ps1` + `.md`. The `.md` documents purpose, usage, exit codes, and examples per existing convention. |
| **CI3** | **Enforcing vs advisory** | All new sub-agent validators ship as ENFORCING (fail-on-issue) from day one. No advisory grace period. Reasoning: the spec docs ratified the invariants; CI enforces them. |
| **CI4** | **Strict mode flag** | New validators support `--strict` for the strictest interpretation; default behavior IS strict (CI3). The `--strict` flag exists for future-proofing only. |
| **CI5** | **CI invocation order** | New sub-agent validators run AFTER the existing `validate-agents-md` and BEFORE `check-internal-link-validity`. Order matters because runtime-components.md sync depends on subagents/ existing and on AGENTS.md being valid. |
| **CI6** | **`check-em-dashes` scope** | All tracked text files: `*.md`, `*.mdx`, `*.txt`, `*.yml`, `*.yaml`. NOT `*.json` (legitimate unicode in JSON strings). NOT `*.js`/`*.mjs`/`*.sh`/`*.ps1` (legitimate unicode in code comments handled by language-specific lints). Allowlist for documenting the rule itself (the 3 known instances in v2.16.0 specs). |
| **CI7** | **`check-aggregate-counters` source-of-truth files** | AGENTS/claude/CONTEXT.md, AGENTS.md, README.md. Compares re-derived counts to declared counts in each. P0 finding if any divergence pre-release. |
| **CI8** | **CI runtime budget** | New validators add < 30 seconds to the CI validation job. Measured in Phase 3. If exceeded, optimize via parallelization or skip cross-cutting checks in incremental scope. |
| **CI9** | **Failure verbosity** | New validators print human-readable failure messages with file:line and fix suggestion. No raw shell error spew. Pattern established by `lint-skills-frontmatter`. |

---

## File Structure

### Files to create (potential new validators - Phase 1 finalizes scope)

**Triplets (each is .sh + .ps1 + .md):**
- `scripts/validate-sub-agents.{sh,ps1,md}` (if CI1 dedicated route)
- `scripts/check-runtime-components-sync.{sh,ps1,md}`
- `scripts/check-sub-agent-command-pair.{sh,ps1,md}`
- `scripts/check-em-dashes.{sh,ps1,md}`
- `scripts/check-aggregate-counters.{sh,ps1,md}`

**Net new files if all 5 ship:** 15 files (5 validators x 3 files each)
**Net new files if Phase 1 chooses extend route:** 12 files (skip validate-sub-agents triplet)

### Files to modify

- `scripts/validate-agents-md.sh` + `.ps1` (extension OR companion route per Phase 1)
- `.github/workflows/validation.yml` (add new validator invocations)
- `docs/contributing/ci-conventions.md` (document new validators) OR equivalent existing CI doc
- `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` (status updates as phases complete)
- `docs/internal/backlog-canonical.md` (mark CI work as in-progress, then closed)

---

## Phase 1: Validator Decision (1 task)

**Goal:** Lock the extend-vs-new decision before any code is written. Inspect existing `validate-agents-md` and decide.

### Task 1: Decide extend vs new

- [ ] Read `scripts/validate-agents-md.sh` + `.ps1` + `.md` to understand current scope
- [ ] Inventory what validate-agents-md currently does:
  - Scans `skills/` and verifies each entry has a row in AGENTS.md
  - Scans `commands/` similarly
  - Scans `_workflows/` similarly
- [ ] Estimate cost of extension:
  - Add `subagents/` scan and AGENTS.md sub-agent section verification
  - Add per-agent frontmatter validation (name, description, tools, model, memory fields)
  - Add chain depth heuristic (does the agent have Agent tool? if so, warn)
- [ ] Estimate cost of new validator:
  - New `validate-sub-agents.{sh,ps1,md}` triplet
  - Sub-agent-specific invariants in one place
  - validate-agents-md left unchanged
- [ ] **Decision rule:** if extension would more than double `validate-agents-md` script length, ship new validator. Otherwise extend.
- [ ] Document the decision in this plan's status block (replace Phase 1 PENDING with chosen route)

**Done when:** decision recorded; rationale captured; Phase 2 scope locked.

---

## Phase 2: Ship Validators (5 tasks; scope depends on Phase 1)

**Goal:** Ship the validator triplets per Phase 1 decision. Each triplet is a tightly-scoped invariant check.

### Task 2: Extend validate-agents-md to validate sub-agent invariants

Per master plan D19, this task EXTENDS `validate-agents-md`. The Route A (dedicated validator) option is removed.

- [ ] Add `subagents/` scan to `scripts/validate-agents-md.sh`:
  - Iterate `subagents/*.md` files (excluding `subagents/_pairing.yaml`, `subagents/_chain-permitted.yaml`, README placeholders)
  - For each agent file:
    - Validate frontmatter has required fields: `name`, `description`, `tools`, `model`, `memory`
    - Validate `name:` matches filename (`pm-critic.md` requires `name: pm-critic`)
    - Validate `tools:` is **comma-separated scalar** form (per master plan D20): `tools: Read, Grep, Glob`. NOT a YAML list. NOT empty unless explicitly intentional.
    - Validate `model:` is one of `sonnet|opus|haiku` (warn if other string)
    - Validate `memory:` is one of `none|project|user`
    - Validate `description:` is non-empty
    - **Chain depth enforcement (HARD FAIL per master plan D21 + Codex R03):** if `Agent` appears in the `tools:` scalar AND the agent name is not present in `subagents/_chain-permitted.yaml`, FAIL with message "Agent tool present in {name}.md but {name} is not in subagents/_chain-permitted.yaml. This violates D21 chain-depth enforcement. Add to allowlist OR remove Agent from tools."
- [ ] Add sub-agent-section verification to AGENTS.md scan:
  - AGENTS.md has a Sub-Agents section
  - Each `subagents/*.md` file has a corresponding row in the AGENTS.md sub-agents table
  - Each row in AGENTS.md sub-agents table has a corresponding agent file
- [ ] Mirror all extensions in `scripts/validate-agents-md.ps1`
- [ ] Update `scripts/validate-agents-md.md` companion documenting:
  - Sub-agent scan added in v2.16.0
  - Chain-permitted allowlist enforcement
  - Tools syntax (comma-separated scalar)
  - Exit codes (unchanged: 0 success, 1 failure, 2 script error)
- [ ] Run validator against current `subagents/*.md` files; expect all 4 to pass with current frontmatter

**Done when:** validate-agents-md extension shipped; runs green against all 4 sub-agent files; chain-permitted allowlist enforced (verified by deliberately adding `Agent` to pm-skill-auditor and confirming hard fail).

### Task 3: Ship check-runtime-components-sync.{sh,ps1,md}

- [ ] Author `scripts/check-runtime-components-sync.sh`
  - Iterates `subagents/*.md` and extracts agent names
  - Reads `docs/reference/runtime-components.md` and parses the sub-agents table
  - Verifies every agent file has a corresponding row in runtime-components.md
  - Verifies every row in runtime-components.md has a corresponding agent file
  - Exit codes: 0 success, 1 failure
  - Failure format: list of agents missing rows OR rows missing agents
- [ ] Mirror in `.ps1`
- [ ] Author `.md` companion

**Done when:** validator runs green; catches both orphan agents and phantom rows in synthetic test.

### Task 4: Ship check-sub-agent-command-pair.{sh,ps1,md}

- [ ] Author `scripts/check-sub-agent-command-pair.sh`
  - Iterates `subagents/*.md` files
  - For each agent `pm-{role}`, expects a `commands/{verb}.md` file based on the mapping defined in this plan's CI2 (or in a manifest file `subagents/_pairing.yaml` for future extensibility)
  - Verifies the command exists
  - Verifies the command body references the agent name
  - Exit codes: 0 success, 1 failure
- [ ] Pairing manifest format (proposal): `subagents/_pairing.yaml` lists each agent and its companion command(s):
  ```yaml
  pairings:
    pm-critic:
      commands: [critic]
    pm-skill-auditor:
      commands: [audit-repo]
    pm-changelog-curator:
      commands: [draft-changelog]
    pm-release-conductor:
      commands: [release]
  ```
- [ ] Mirror in `.ps1`
- [ ] Author `.md` companion

**Done when:** validator runs green; pairing manifest ratified; catches synthetic missing command.

### Task 5: Ship check-em-dashes.{sh,ps1,md}

- [ ] Author `scripts/check-em-dashes.sh`
  - Runs `grep -rn -- "—\|–"` across tracked text files per CI6 scope
  - Reads allowlist from `scripts/check-em-dashes.allowlist` (path + line pattern)
  - Exits 0 if zero non-allowlisted hits; 1 otherwise
  - Failure format: file:line:context for each hit
- [ ] Author `scripts/check-em-dashes.allowlist` with the 4 known intentional instances from v2.16 plan files (deliberately documenting the em-dash character inside backticks):
  - `docs/internal/release-plans/v2.16.0/ci-plan.md` (line approximately 203 in the canonical version; the literal `grep` pattern reference)
  - `docs/internal/release-plans/v2.16.0/repo-hygiene-plan.md` (the legacy ad-hoc grep example, prior to D27 canonicalization)
  - `docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md` (2 instances: G0 sub-check description + acceptance criteria test instruction)
  - Plus blanket exclusion `library/skill-output-samples/**` for artifact samples that may quote em-dashes from source material
- [ ] Mirror in `.ps1`
- [ ] Author `.md` companion documenting allowlist convention

**Done when:** validator runs green on origin/main; catches synthetic em-dash insertion.

### Task 6: Ship check-aggregate-counters.{sh,ps1,md}

- [ ] Author `scripts/check-aggregate-counters.sh`
  - Re-derives skill counts: glob `skills/discover-* skills/define-* skills/develop-* skills/deliver-* skills/measure-* skills/iterate-*` for phase count; `skills/foundation-*` for foundation count; `skills/utility-*` for utility count; `skills/tool-*` for tool count; total = sum
  - Re-derives command count: glob `commands/*.md` (subtract any non-skill commands per allowlist)
  - Re-derives sub-agent count: glob `subagents/*.md`
  - Reads declared counts from AGENTS.md, AGENTS/claude/CONTEXT.md, README.md
  - Compares; fails if any divergence
  - Exit codes: 0 success, 1 failure with file + declared vs derived mismatch
- [ ] Mirror in `.ps1`
- [ ] Author `.md` companion

**Done when:** validator runs green; catches synthetic drift (modify CONTEXT.md count and confirm validator fails).

---

## Phase 3: Workflow Integration (2 tasks)

**Goal:** Wire the new validators into `validation.yml` per CI5 order. Verify CI runtime budget per CI8.

### Task 7: Update validation.yml

- [ ] Edit `.github/workflows/validation.yml` to add new validator invocations:
  - After `validate-agents-md` step: invoke `validate-sub-agents` (or skip if Phase 1 chose extend)
  - After `validate-sub-agents`: invoke `check-runtime-components-sync`
  - After: invoke `check-sub-agent-command-pair`
  - After: invoke `check-em-dashes`
  - After: invoke `check-aggregate-counters`
  - Before `check-internal-link-validity` (CI5)
- [ ] Use the same shell convention as existing steps (bash on Linux runners; PowerShell on Windows where applicable)
- [ ] Each new step gets `name:` and `run:` per existing pattern
- [ ] Verify YAML syntax

**Done when:** validation.yml has 5 new validator steps in correct order; YAML valid.

### Task 8: Measure CI runtime + verify all validators green

- [ ] Push the validation.yml update on a feature branch
- [ ] CI runs; capture total validation job duration
- [ ] Compare to v2.15.0 baseline duration
- [ ] Verify increment is < 30 seconds (CI8)
- [ ] If increment > 30 seconds, identify the slowest new validator and optimize:
  - Parallelize if possible
  - Reduce file scope for incremental scenarios
  - Cache outputs where deterministic
- [ ] Verify all new validators green on the feature branch
- [ ] Merge to main

**Done when:** validators on main; CI runtime within budget; all green.

---

## Phase 4: Documentation + Cross-Cutting (2 tasks)

**Goal:** Document the new validators per CI2 convention. Cross-link from existing CI conventions doc.

### Task 9: Author or update docs/contributing/ci-conventions.md

- [ ] If `docs/contributing/ci-conventions.md` does not exist, create it covering:
  - The triplet convention (`.sh` + `.ps1` + `.md`)
  - The enforcing vs advisory distinction
  - The strict mode flag pattern
  - The exit code convention (0/1/2)
  - The failure verbosity pattern
- [ ] Add a "Sub-Agent CI" section documenting the 5 new validators:
  - validate-sub-agents (or note about validate-agents-md extension)
  - check-runtime-components-sync
  - check-sub-agent-command-pair (with pairing manifest)
  - check-em-dashes (with allowlist convention)
  - check-aggregate-counters
- [ ] Cross-link each validator's `.md` companion
- [ ] Add to Starlight sidebar

**Done when:** ci-conventions.md exists or is updated; new validators documented; sidebar entry present.

### Task 10: Final CI audit

- [ ] Run all 24+ existing enforcing validators + the 5 new validators against origin/main; all green
- [ ] Verify validation.yml step order matches CI5
- [ ] Verify each validator's `.md` companion is up to date with the `.sh` and `.ps1` behavior
- [ ] Verify all new validators are listed in the `validate-agents-md`-style enforcing-validators inventory (wherever that lives, likely a section in this doc or in ci-conventions.md)
- [ ] Update master plan "Where we are" snapshot with CI track marked COMPLETE
- [ ] Update this plan's status block to COMPLETE

**Done when:** final audit clean; master plan reflects track completion.

---

## Acceptance Criteria

This plan closes when:

- [ ] Phase 1 decision recorded (extend vs new for validate-sub-agents)
- [ ] 5 new validators OR 4 new + 1 extension shipped per Phase 1 decision
- [ ] All new validators ship as triplets (.sh + .ps1 + .md)
- [ ] validation.yml invokes all new validators in CI5 order
- [ ] CI runtime increment < 30 seconds (CI8)
- [ ] All 29+ enforcing validators green on origin/main
- [ ] `subagents/_pairing.yaml` exists with all 4 sub-agent pairings
- [ ] `scripts/check-em-dashes.allowlist` exists with 3 known intentional instances
- [ ] `docs/contributing/ci-conventions.md` exists or is updated with new validators documented
- [ ] All new validators support `--help` flag returning usage (existing convention)
- [ ] Synthetic-failure tests pass for each new validator (verified by deliberately introducing the failure mode)

---

## Risks

| ID | Risk | Mitigation |
|---|---|---|
| **CI-R1** | **Phase 1 decision is wrong; we ship dedicated when extension was cheaper or vice versa.** | Phase 1 Task 1 measures cost both ways before deciding. If wrong direction is taken, refactor in v2.17. |
| **CI-R2** | **CI runtime budget exceeded.** | CI8 explicit budget; Task 8 measures; optimization steps listed. |
| **CI-R3** | **Em-dash allowlist becomes a graveyard.** Legitimate exceptions accumulate; rule becomes toothless. | Allowlist entries require commit-message justification at landing; periodic audit in hygiene cycles. |
| **CI-R4** | **Pairing manifest becomes a maintenance burden.** Every new agent requires manifest update. | Documented in authoring-sub-agents.md; manifest update is part of "ship a new sub-agent" checklist. |
| **CI-R5** | **check-aggregate-counters false positives on legitimate count differences.** E.g., README says "55+ skills" intentionally fuzzy vs CONTEXT.md says "55" exact. | Validator parses for exact count tokens only. Fuzzy phrasings ("55+") are tolerated by regex. Documented in `.md` companion. |
| **CI-R6** | **PowerShell parity drift.** `.sh` evolves; `.ps1` doesn't get updated; cross-platform CI passes on Linux but fails on Windows. | Both files updated in same commit (existing convention); CI runs both. |
| **CI-R7** | **Astro 6 upgrade changes file structure; validators break.** E.g., output build path changes; check-internal-link-validity reads from a now-stale location. | Doc-stack modernization plan Phase 1 Task 4 runs validator suite against Astro 6 spike branch. Any breakage caught and fixed before merge. |
| **CI-R8** | **New validators not invoked locally; only run in CI.** Devs land breaking changes that fail CI but were never visible locally. | `.md` companion documents how to run each validator locally. README or CONTRIBUTING.md links the validator inventory. |

---

## Out of scope for this plan

- Astro 6 / Node 22.12+ workflow Node bumps (doc-stack-modernization-plan.md)
- DS family validator metadata-shape strict (repo-hygiene-plan.md)
- New CodeQL configurations
- PostToolUse / Stop hooks
- Pre-commit hooks (git-side; separate concern from CI)
- pm-skills-mcp CI parity
- Performance benchmarking
- Test coverage measurement (no test framework in pm-skills)
- Dependabot configuration changes (covered by Astro 6 plan + closes alerts)
- Workflow caching strategies

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Sibling plans: [`subagents-integration-plan.md`](./subagents-integration-plan.md), [`docs-plan.md`](./docs-plan.md), [`doc-stack-modernization-plan.md`](./doc-stack-modernization-plan.md), [`repo-hygiene-plan.md`](./repo-hygiene-plan.md)
- Spec docs (define the invariants CI enforces): [`spec_pm-critic.md`](./spec_pm-critic.md), [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md), [`spec_pm-changelog-curator.md`](./spec_pm-changelog-curator.md), [`spec_pm-release-conductor.md`](./spec_pm-release-conductor.md)
- Existing validator inventory: `.github/workflows/validation.yml` + `scripts/*.md` companions
- Existing AGENTS.md sync validator: `scripts/validate-agents-md.{sh,ps1,md}`
- Existing frontmatter validator: `scripts/lint-skills-frontmatter.{sh,ps1,md}`
- Aggregate-counter audit discipline: `feedback_stale-aggregate-counter.md` (in memory)
- Em-dash rule: `CLAUDE.md` + `feedback_no-em-dashes.md`
