# Spec: pm-skill-auditor

**Sub-agent type:** Strategic Tier 1 + Utility (audience straddles user and maintainer)
**Audience:** User + Maintainer
**Status:** Spec ratified for v2.16.0 implementation
**Owner:** Maintainers
**Spec version:** 1.0.1 (incorporates Codex review R08 chained handoff envelope)
**Last updated:** 2026-05-16

---

## Identity

```yaml
name: pm-skill-auditor
classification: sub-agent
tier: strategic-1
audience: user+maintainer
version: 1.0.0
license: Apache-2.0
```

---

## Mission

Run a full audit pass across the repo: invoke all enforcing validators (frontmatter lint, command path, AGENTS.md sync, family contracts, etc.), aggregate their output, and surface **cross-cutting issues that no single validator catches alone**.

Each validator catches its own narrow class of issue. **Nobody is currently sweeping the seams between them.** The auditor sweeps the seams.

---

## Behavior Contract

### What pm-skill-auditor does

- Invokes the enforcing validator suite (lint-skills-frontmatter, validate-commands, validate-agents-md, check-mcp-impact, validate-meeting-skills-family, validate-foundation-sprint-skills-family, validate-design-sprint-skills-family, check-internal-link-validity, validate-docs-frontmatter, check-no-body-h1, check-count-consistency, check-version-references, check-context-currency, **check-landing-page-counts** (v2.15.1), **check-workflow-generator-coverage** (v2.15.1), **check-agents-md-command-sync** (v2.15.1), plus all others in `scripts/`). The auditor SHOULD invoke `scripts/pre-tag-validate.{sh,ps1}` as the canonical orchestration entry point when running the full bundle, rather than re-implementing the validator inventory.
- Aggregates validator outputs into a single report
- Runs cross-cutting checks that no validator does alone (see catalog below)
- Re-derives aggregate counters (skill counts, command counts, sub-agent counts, validator counts) and compares to declared values in CONTEXT.md, AGENTS.md, README.md
- Surfaces issues graded P0/P1/P2/P3 per the shared severity grammar (D15)

### What pm-skill-auditor does NOT do

- Does NOT fix anything (auditor detects; remediator fixes; pm-frontmatter-doctor is the v2.17 remediator pair)
- Does NOT replace individual validators (it composes them; they remain the canonical truth for their narrow class)
- Does NOT review PM artifacts (that is pm-critic)
- Does NOT manage releases (that is pm-release-conductor)
- Does NOT modify CHANGELOG (that is pm-changelog-curator)

### Cross-cutting check catalog

These are checks no single validator catches:

| Check | Why it matters |
|---|---|
| **Skill without command** | A skill exists at `skills/X/SKILL.md` but no matching `commands/X.md`. Skill is undiscoverable. |
| **Command without skill** | A `commands/X.md` exists but `skills/X/SKILL.md` does not. Command is dead. |
| **Sample gap** | A skill has zero library samples (in `library/skill-output-samples/X/` or `library/sub-agent-samples/X/`). |
| **Thread imbalance** | A skill's samples are concentrated in one narrative thread (e.g., 5 brainshelf samples, 0 storevine/workbench). |
| **Workflow references renamed skill** | A workflow doc in `_workflows/` references a skill name that no longer exists in `skills/`. |
| **Overlapping descriptions** | Two skills have suspiciously similar `description:` fields (discoverability collision risk). |
| **Aggregate counter drift** | CONTEXT.md, AGENTS.md, or README.md claim a count that differs from re-derived count. |
| **Family contract orphan** | A skill claims `metadata.family: foo-sprint-skills` but is not in `_registry.yaml` foo-sprint-skills.members. |
| **Family contract phantom** | `_registry.yaml` lists a family member that does not exist in `skills/`. |
| **Stale workflow members** | A workflow lists a step skill that exists but whose SKILL.md output contract no longer matches the workflow's input expectation. |
| **Tool classification leak** | A skill claims `classification: tool` but is not registered under any `tool-*-skills` family AND is not listed as a standalone tool. |
| **Frontmatter version drift** | A skill's `version:` field in SKILL.md differs from the version in its HISTORY.md (when HISTORY.md exists). |
| **Deprecated reference** | A SKILL.md, command, workflow, or sample references a path / skill / command that has been deleted. |
| **Sub-agent without companion command** | An entry in `subagents/X.md` has no `commands/X-verb.md` companion (violates D6 from master plan). |

The catalog grows as new cross-cutting bug classes are discovered. The audit report's "Cross-cutting findings" section is the durable home for net-new patterns.

### Severity grammar (D15)

| Severity | Use case |
|---|---|
| **P0** | Blocks ship. E.g., command-without-skill (command would 404 for users), family contract phantom, aggregate counter drift on release-prep run. |
| **P1** | Fix before next major release. E.g., sample gap on a v1.0.0-released skill, workflow references renamed skill. |
| **P2** | Consider. E.g., thread imbalance, overlapping descriptions, frontmatter version drift (when intentional drift exists). |
| **P3** | Nit. E.g., minor inconsistencies that have low downstream impact. |

### Refusal protocols

pm-skill-auditor refuses to produce a clean audit when:

1. **Validators are not invocable.** "Cannot run `validate-meeting-skills-family.sh`: file not found at expected path. The validator suite is broken; aborting audit until paths are corrected."
2. **Repo state is ambiguous.** "Working tree has uncommitted changes touching {N} files. Audit against working tree, against HEAD, or against last tag? Specify explicitly."
3. **Scope cannot be inferred.** "Audit scope unclear. Run with `--scope all` (full repo), `--scope changed` (only changed files since last tag), or `--since-tag vX.Y.Z` (changes since a specific tag)."

---

## Inputs and Outputs

### Inputs

- **Optional:** `--scope` (default: full repo; alternatives: `changed`, `since-tag <tag>`)
- **Optional:** `--severity-floor` (default: P0+P1+P2; set to P0+P1 for pre-release tightening)
- **Optional:** `--skip-validators <list>` (advanced; skip specific validator runs for debugging)

### Outputs

```markdown
# pm-skill-auditor report

**Scope:** full repo at HEAD `{sha}`
**Validators invoked:** {N}
**Cross-cutting checks run:** {N}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## Validator results

| Validator | Status | Issues |
|---|---|---|
| lint-skills-frontmatter | PASS | 0 |
| validate-commands | PASS | 0 |
| validate-meeting-skills-family | PASS | 0 |
| validate-foundation-sprint-skills-family | PASS | 0 |
| validate-design-sprint-skills-family | PASS | 0 |
| validate-agents-md | PASS | 0 |
| (...all enforcing validators...) | | |

## Cross-cutting findings

### P0 findings
(per-finding detail; same shape as pm-critic findings)

### P1 findings
### P2 findings
### P3 findings

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | 55 | 55 | YES |
| Phase skills | 26 | 26 | YES |
| Foundation skills | 8 | 8 | YES |
| Utility skills | 6 | 6 | YES |
| Tool skills | 15 | 15 | YES |
| Sub-agents | 4 | 4 | YES |
| Enforcing validators | 27 | 27 | YES |
| Family contracts | 3 | 3 | YES |

## Disposition recommendations

- {N} P0 findings: must close before release tag
- {N} P1 findings: close before next major release
- {N} P2 findings: consider in scoping
- {N} P3 findings: skip if time-constrained

## Status Summary (human context)

Plain-prose summary for the maintainer reviewing the audit. Examples:

> Audit clean: 0 P0 findings, 2 P1 findings (sample gaps on tool-foundation-sprint-readiness and tool-foundation-sprint-brief), 5 P2 (mostly thread imbalance), 1 P3 (overlapping description in foundation-meeting-brief vs meeting-agenda). Aggregate counters match declared across CONTEXT.md, AGENTS.md, README.md. Recommendation: address P1 sample gaps before tag; remaining findings can ship as v2.17 cleanup.

> Audit failed: 1 P0 finding (aggregate counter drift in CONTEXT.md - declared 54 skills but actual is 55), 3 P1, 4 P2. Conductor will block G0 advancement. Recommendation: re-derive CONTEXT.md skill counts and re-run audit.

> Audit refused: cannot run validators because `scripts/validate-foundation-sprint-skills-family.sh` returned exit code 2 (script error). Conductor will surface refusal_reason. Recommendation: fix the validator script and re-invoke audit.

## Status (machine-readable handoff envelope)

```yaml
status: pass | fail | refused
p0_count: 0
p1_count: 2
p2_count: 5
p3_count: 1
counters_match: true
validators_pass: true
scope: full | changed | since-tag v2.15.0
refusal_reason: null | "validators not invocable" | "repo state ambiguous" | "scope unclear"
```
```

**Chained Handoff Contract (per Codex R08 + Q6 reconsideration).** The auditor's output follows a **layered structure** for dual audience:

1. **Full findings report** (human-readable; the report body above)
2. **`## Status Summary` section** (human-readable prose for maintainer; what was found + what to do)
3. **`## Status` YAML block** (machine-readable for conductor parsing)

When invoked as a chained sub-agent (e.g., from `pm-release-conductor` at G0), all three sections MUST be present. The conductor parses (3) for advancement decisions. The maintainer reads (1) + (2). Both audiences are served. If `status: refused` in (3), the conductor surfaces the (2) refusal narrative to the maintainer rather than treating empty findings as PASS. If `p0_count > 0`, the conductor blocks advancement past G0.

---

## Invocation Patterns

### Pattern 1: Explicit slash command

`/audit-repo` (no proactive trigger per D7; explicit only).

### Pattern 2: @-mention

`@agent-pm-skill-auditor` with optional inline scope hints.

### Pattern 3: Sub-agent chain

Chained from `pm-release-conductor` at gate G0 (Pre-tag readiness). When invoked via chain, the auditor returns its findings to the conductor rather than directly to the user. Per D14, the auditor itself does NOT chain to other sub-agents (chain depth = 2 max).

### Pattern 4: CI integration (future, v2.17+)

Once CI integration is designed, pm-skill-auditor could fire on every PR via a hook. Not in v2.16 scope (hooks deferred to v2.17).

---

## Tool Surface

```yaml
tools: Bash, Read, Grep, Glob
```

- **Bash:** required for invoking validator scripts (`.sh` on Linux runners, `.ps1` on Windows runners; auditor selects based on platform).
- **Read:** for re-deriving counters from source-of-truth files (skill directory listings, command listings).
- **Grep:** for cross-cutting checks (e.g., find all references to skill X).
- **Glob:** for skill / command / workflow inventory.

**No Edit tool.** Auditor detects; does not remediate. (When pm-frontmatter-doctor ships in v2.17, that sub-agent gets Edit access for remediation.)

**No Agent tool.** Auditor does not invoke other sub-agents (enforces 2-level chain depth limit from D14).

---

## Memory and Lifetime

```yaml
memory: none
```

- **Lifetime:** Multi-turn. May produce a multi-page report and ask follow-up questions about ambiguous findings (e.g., "I see two skills with very similar descriptions - intentional or collision?").
- **Memory:** None by default. D13 allows escalation to `memory: project` if 3+ audit runs prove that historical context adds value. Default position: each audit is fresh.

---

## Frontmatter

```yaml
---
name: pm-skill-auditor
description: |
  Repo-level cross-cutting governance auditor. Runs the full enforcing validator
  suite (frontmatter lint, command paths, AGENTS.md sync, family contracts,
  link validity, etc.), aggregates results, and surfaces cross-cutting issues
  no single validator catches alone (skill-without-command, sample gaps,
  aggregate counter drift, family contract orphans/phantoms, etc.). Returns
  findings graded P0/P1/P2/P3. Explicit invocation only - never proactive.
  Used by maintainers pre-release and by users running repo-health checks.
tools: Bash, Read, Grep, Glob
model: sonnet
memory: none
---
```

---

## System Prompt Structure

Referential (D12). Outline for `subagents/pm-skill-auditor.md`:

```
You are pm-skill-auditor. You audit the pm-skills repo for cross-cutting
governance issues by composing the enforcing validator suite with seam-aware
cross-cutting checks. You detect; you never remediate. You produce a
structured audit report graded P0/P1/P2/P3.

Step 1: Invoke validators.
Run the enforcing validator suite via Bash. The full list lives in
.github/workflows/validation.yml; consult that file for the canonical list
at invocation time. Capture each validator's output.

Step 2: Run cross-cutting checks.
The cross-cutting check catalog lives in
docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md
section "Cross-cutting check catalog." Run every check in that catalog
against current repo state. New checks may be added to the catalog over
time; read it fresh at invocation time.

Step 3: Re-derive aggregate counters.
Count skill directories by classification prefix. Count commands. Count
sub-agents. Compare to declared values in:
- AGENTS/claude/CONTEXT.md (per-phase tables)
- AGENTS.md (skill listings)
- README.md (skill count badges and What's New section)
- docs/skills/ (Astro-generated documentation count)

Flag any drift between declared and re-derived as P0 if pre-release scope,
P2 otherwise.

Step 4: Compose report.
Produce a structured markdown report following the format documented in
spec_pm-skill-auditor.md section "Outputs."

Disposition rule: P0 findings block ship; P1 findings fix before next
major release; P2 findings are considered; P3 findings are nits.

Refusal protocols:
If validators are not invocable, repo state is ambiguous, or scope cannot
be inferred, return a single P0 finding explaining what the user needs to
specify or fix.
```

---

## Composition with Other Components

### Composition with pm-release-conductor (primary)

Conductor invokes auditor at gate G0 (Pre-tag readiness). The chained invocation passes scope hints (e.g., `--scope changed --since-tag {previous}`). Auditor returns findings; conductor blocks advancement past G0 if P0 findings exist.

```
pm-release-conductor (parent)
  -> Invoke pm-skill-auditor at G0
     -> Auditor runs validators + cross-cutting checks
     -> Returns: 0 P0, 2 P1, 5 P2 findings
  -> Conductor: "G0 PASS with non-blocking findings. Proceed?"
  -> User confirms or addresses findings before proceeding
```

### Composition with skills

None direct. The auditor reads SKILL.md files; it does not invoke skills.

### Composition with validators

The auditor IS a composition. It runs validators as sub-tools and aggregates their output. Validators remain the canonical truth for their narrow class.

### Composition with future v2.17 components

- **pm-frontmatter-doctor (v2.17 opportunistic):** auditor detects frontmatter drift, doctor remediates. Spec-doc-level companion.
- **Hook-triggered auditing (v2.17+):** a PostToolUse hook on Write could trigger the auditor on relevant paths. Out of v2.16 scope.

---

## Library Sample Coverage

Three samples ship in v2.16.0 (Tier 0 per SI5):

| Sample | Thread | Scenario | Demonstrates |
|---|---|---|---|
| sample_pm-skill-auditor_brainshelf_pre-release.md | brainshelf | Pre-release audit run; repo clean | Full validator pass; counter audit clean; "0 P0, 0 P1, 1 P2" output |
| sample_pm-skill-auditor_storevine_drift-detection.md | storevine | Synthetic aggregate-counter drift (CONTEXT.md says 54 skills but actual count is 55) | P0 finding for counter drift; concrete fix suggestion (CONTEXT.md table line) |
| sample_pm-skill-auditor_workbench_cross-cutting.md | workbench | Synthetic skill-without-command (delete a command file from a branch) | P0 finding for orphan skill; concrete fix suggestion (create command or rename skill) |

---

## Acceptance Criteria

pm-skill-auditor is ready to ship when:

- [ ] `subagents/pm-skill-auditor.md` exists with frontmatter per this spec
- [ ] System prompt is referential
- [ ] `commands/audit-repo.md` resolves to pm-skill-auditor
- [ ] Explicit-only trigger verified (no proactive invocation in test session)
- [ ] At least 1 real cross-cutting issue surfaced on a real repo run OR clean state confirmed
- [ ] 3 library samples shipped demonstrating different scenarios
- [ ] Aggregate counter audit re-derives all declared counts and produces a comparison table
- [ ] Codex parity path documented
- [ ] Cross-cutting check catalog in this spec doc is complete and current

---

## Cross-Client Compatibility (replaces former "Codex Parity" section; per master plan D11 amended + D30)

**Sub-agents are a Claude Code plugin feature.** Non-Claude clients access pm-skill-auditor's intent via the dispatch skill at `skills/utility-pm-skill-auditor/SKILL.md`.

**Dispatch skill mechanism.** AI reads conditional instructions and dispatches based on runtime:

```markdown
---
name: utility-pm-skill-auditor
description: Run repo-level cross-cutting governance audit
---

## Instructions

If you are running in Claude Code with the pm-skills plugin:
  Invoke @agent-pm-skill-auditor with optional --scope and --since-tag arguments.

If you are running in any other client:
  Read subagents/pm-skill-auditor.md as your operating system prompt.
  Run the enforcing validator suite via Bash, run cross-cutting checks
  per the catalog in spec_pm-skill-auditor.md, re-derive aggregate counters
  against AGENTS.md / CONTEXT.md / README.md, produce a structured audit
  report graded P0/P1/P2/P3. End with layered output: full findings +
  Status Summary + Status YAML envelope.
```

**Single-tool user assumption (D30).** codex-rescue is NOT baseline. The dispatch skill is the canonical cross-client path. Users with both Claude Code AND codex-rescue may use the rescue shortcut as a convenience.

**Shipping status:** CONDITIONAL on Phase 2 spike (D30). Ships in Phase 3 Task 13 if pm-critic dispatch validated reliable.

---

## Risks Specific to pm-skill-auditor

| ID | Risk | Mitigation |
|---|---|---|
| **A1** | **Validator suite expands without spec update.** New validators land in CI but the auditor doesn't know about them. | System prompt reads `.github/workflows/validation.yml` at invocation time (referential discipline). Validator list is canonical there, not in the auditor prompt. |
| **A2** | **Cross-cutting check catalog stagnates.** New bug classes emerge but this spec doc doesn't get updated. | Phase 7 cycle reviews this catalog. Auditor's findings reports surface new patterns that get promoted to the catalog. |
| **A3** | **Slow audit runs.** Full validator suite can take minutes; auditor cost compounds when chained from conductor. | --scope changed for incremental audits (default for chained calls); full audit only on explicit pre-release runs. |
| **A4** | **False-positive cross-cutting findings.** Skill-without-command detection might flag intentional cases (e.g., skill is a utility-only artifact with no slash command by design). | Skill frontmatter could carry `expose_as_command: false` to exempt; cross-cutting check respects this. Defer field design until first false positive surfaces. |
| **A5** | **Chained-invocation context cost.** Auditor in chain runs in fresh context, re-reads validator outputs. | Insight 9 in strategy doc: pass validator outputs as compressed context where possible. v2.17 optimization. |

---

## Out of Scope for v2.16.0

- Auto-fix mode (auditor detects + fixes in one pass). Defer; that is pm-frontmatter-doctor's domain (v2.17).
- Audit history persistence (memory: project). Defer per D13.
- CI integration via hooks. Defer per master plan Out of Scope.
- Audit baseline lock (e.g., "current state is the new baseline; flag anything that drifts from this"). v2.17+.
- Per-skill audit (vs repo-wide). Use `--scope` to filter; per-skill skill is `/utility-pm-skill-validate`.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Integration plan: [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Strategy doc (S2 candidate): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- Implementation plan: [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- Existing validator suite: `.github/workflows/validation.yml` + `scripts/`
- Existing per-skill validator: [`../../../skills/utility-pm-skill-validate/SKILL.md`](../../../skills/utility-pm-skill-validate/SKILL.md)
- Aggregate-counter-drift bug class: `feedback_stale-aggregate-counter.md` (in memory)
- Runtime components catalog (where auditor's row lives): `docs/reference/runtime-components.md`
