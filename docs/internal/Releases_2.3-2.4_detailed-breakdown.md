# PM-Skills Releases 2.3-2.4 Detailed Breakdown

Date: 2026-02-16  
Audience: Maintainers, contributors, PMs, engineering leads, and MCP integrators  
Scope: What shipped in `v2.3.0` and `v2.4.0`, why it mattered, how it was implemented, and how to use the resulting baseline

## 1) Why This Document Exists

The `v2.3.0` and `v2.4.0` releases were not feature-count releases. They were reliability and contract releases.

They solved a harder problem than "add one more skill":
1. Make cross-repo behavior between `pm-skills` and `pm-skills-mcp` verifiable, not assumed.
2. Move release decisions from narrative confidence to evidence-backed closure.
3. Lock behavior contracts so future contributors can build on stable rules instead of implicit conventions.

This document explains that evolution in plain language and technical detail.

## 2) Executive Summary

### What changed across 2.3 -> 2.4

1. `v2.3.0` closed MCP alignment verification (`B-01`) and made sync drift checks blocking by default (`B-02` phase 2).
2. `v2.4.0` locked two foundational contracts:
   - Output behavior contract (`B-03`) for prompt/file/hybrid behavior, collision policy, write boundaries, and metadata.
   - Config contract (`B-04`) for schema format, discovery precedence, key policy, compatibility, and validation ownership.
3. Release execution matured from "we think this is aligned" to "closure state is proven against hard preconditions and determinism checks."

### Why this matters

- For non-technical stakeholders: fewer surprises, safer defaults, and clearer release truth.
- For engineers: explicit contracts, reproducible checks, and lower integration ambiguity.
- For MCP maintainers: direct version tracking baseline in `v2.4.x` and a stronger parity workflow.

## 3) Starting Point Before v2.3

By end of `v2.2.0`, the project had:
1. A drift validation workflow (`validate-mcp-sync`) introduced in observe-first mode.
2. Governance artifacts for planning persistence and backlog canonicalization.
3. A release planning structure with explicit checklists and execution plans.

What was still missing:
1. Formal closure proof that MCP runtime/docs/tests truly matched cross-repo claims (`B-01`).
2. Enforcement-level drift protection by default (`B-02` phase 2).
3. Locked contracts for output behavior and configuration semantics (`B-03`, `B-04`).

## 4) v2.3.0 Deep Dive: Alignment Closure + Blocking Guardrails

Release note: `docs/releases/Release_v2.3.md`  
Changelog entry: `CHANGELOG.md` -> `## [2.3.0] - 2026-02-13`

### 4.1 B-01: Verify and close MCP alignment end-to-end

Core artifacts:
- `_NOTES/delivery-plan/B-01a. DONE_alignment-checklist.md`
- `_NOTES/delivery-plan/B-01b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-01c. DONE_closure-decision.md`
- `_NOTES/delivery-plan/B-01d. DONE_gap-register.md`

#### What this item was

A formal verification packet to prove that `pm-skills` and `pm-skills-mcp` were aligned on runtime behavior, tests, docs, and release claims.

#### Why this was needed (simple context)

Teams were relying on statements like "MCP is aligned". Without proof, those statements can drift over time and become stale.

B-01 forced one question: "Can we prove the claim, right now, on pinned refs?"

#### Why this was needed (technical context)

Cross-repo systems fail in subtle ways:
1. Runtime logic changes but docs lag.
2. Docs change but tests do not encode behavior.
3. Tool/resource naming contracts drift.
4. URI formats drift.
5. Release notes overstate actual parity.

B-01 introduced a closure process that tied all of those surfaces together on a pinned evidence baseline.

#### How it was implemented

1. Runtime checks on MCP loader/resource/tool contracts (phase extraction, URI structure, tool naming).
2. Test verification in `pm-skills-mcp` (`76/76` tests passed at pinned baseline).
3. Cross-repo inventory parity checks (`24` skills vs `24`).
4. Documentation reconciliation so runtime contract and written contract matched.
5. Closure criteria with explicit PASS mapping in `B-01c`.

#### Benefits delivered

1. "Aligned" became a verifiable state, not an intuition.
2. Release notes became auditable against evidence artifacts.
3. Downstream blockers (`B-02`, `B-03`, `B-04`) could proceed on a stronger foundation.

#### How it is used now

- As precedent: any major contract claim should follow the same evidence and closure discipline.
- As reference packet for cross-repo truth methodology.

### 4.2 B-02: Ship validation-only sync workflow with blocking default

Core artifacts:
- `_NOTES/delivery-plan/B-02. DONE_Ship validation-only pm-skills to pm-skills-mcp sync workflow (validate-mcp-sync).md`
- `_NOTES/delivery-plan/B-02a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-02b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-02c. DONE_closure-decision.md`

Primary implementation files:
- `.github/workflows/validate-mcp-sync.yml`
- `.github/scripts/validate-mcp-sync.js`
- `docs/guides/validate-mcp-sync.md`

#### What this item was

Operationalizing drift detection as a release safety control, with `block` as default mode.

#### Why this was needed (simple context)

Without an enforcing guardrail, cross-repo drift is discovered late (or by users), when fixes are costly and confidence is low.

#### Why this was needed (technical context)

The MCP package embeds a snapshot of `pm-skills`. That introduces a synchronization requirement:
1. Inventory parity must be maintained.
2. Source pin metadata must be accurate.
3. Contract versions must remain coherent with the referenced pm-skills release.

A non-blocking check is informative; a blocking default prevents silent mismatch from being merged.

#### How it was implemented

Workflow (`.github/workflows/validate-mcp-sync.yml`):
1. Checks out both repos.
2. Embeds skills snapshot in `pm-skills-mcp` for comparison.
3. Runs validator with `VALIDATE_MCP_SYNC_MODE` defaulting to `block`.
4. Allows manual `workflow_dispatch` override (`observe` or `block`).

Validator script (`.github/scripts/validate-mcp-sync.js`) capabilities:
1. Scans skill directories recursively and normalizes names.
2. Detects missing/extra skills across repos.
3. Checks missing command files in `pm-skills/commands` as a warning surface.
4. Reads latest released version from `pm-skills/CHANGELOG.md`.
5. Validates `pm-skills-mcp/pm-skills-source.json` fields:
   - `pmSkillsRepository`
   - `pmSkillsRef`
   - `pmSkillsVersion`
   - `outputContractVersion`
   - `configContractVersion`
6. Enforces semver/ref parity rules and emits machine-actionable mismatch output.

#### Benefits delivered

1. CI now blocks known drift by default.
2. Manual observe mode still exists for staged rollouts and diagnostics.
3. The release process now includes metadata parity, not only skill-count parity.
4. Contributor UX improved through deterministic mismatch summaries and a manual sync checklist.

#### How it is leveraged now and later

Now:
1. Daily guardrail against accidental drift between repos.
2. Inputs to release readiness checks and closure packets.

Future:
1. Can be extended for deeper contract checks (for example schema checksum parity or URI/metadata policy assertions).
2. Serves as the CI backbone for direct version tracking governance from `v2.4+`.

## 5) v2.4.0 Deep Dive: Contract Lock Release

Release note: `docs/releases/Release_v2.4.md`  
Checklist: `docs/internal/release-planning/checklist_v2.4.0.md` (Status: `Shipped`)  
Execution plan: `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### 5.1 B-03: Canonical output behavior contract lock

Core artifacts (DONE packet):
- `_NOTES/delivery-plan/B-03. DONE_Lock canonical output behavior contract (prompt-file-hybrid, overwrite-collision rules).md`
- `_NOTES/delivery-plan/B-03a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-03b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-03c. DONE_closure-decision.md`
- `_NOTES/delivery-plan/B-03d. DONE_gap-register.md`

#### What this item was

A formal contract for how artifact output behaves under normal, ambiguous, and risky conditions.

#### Why this was needed (simple context)

Users need predictability:
1. Where will files be written?
2. What happens if a file exists?
3. Will existing work be overwritten?

Without contract-level answers, trust drops and teams spend time manually policing behavior.

#### Why this was needed (technical context)

Agent output behavior spans multiple dimensions that often get mixed together:
1. Mode selection (prompt vs file vs hybrid).
2. Target selection (in-place vs versioned artifact).
3. Collision action (abort, overwrite, merge, new-file).
4. Path safety boundaries.
5. Metadata consistency.

B-03 separated these concerns and locked deterministic precedence.

#### Decision set and implementation significance

D-03-01: Hybrid default with intent guardrails.
- Simple meaning: response remains readable while artifact-producing work persists predictably.
- Technical meaning: intent classification precedes mode selection; destructive updates remain confirmation-gated.

D-03-02: Safe collision matrix.
- Simple meaning: no silent clobbering.
- Technical meaning: fixed legal action set with guarded overwrite and constrained merge behavior.

D-03-03: Path resolution and write boundaries.
- Simple meaning: fewer "where did my file go?" problems.
- Technical meaning: normalized path handling, traversal rejection, canonical default root (`_NOTES/generated`) with documented fallback.

D-03-04: Target-selection before collision handling.
- Simple meaning: decide whether to update in-place or create a versioned copy before file-exists logic.
- Technical meaning: artifact class policy makes update behavior testable and non-ambiguous.

D-03-05: Required metadata baseline.
- Simple meaning: generated artifacts can be traced later.
- Technical meaning: required provenance keys and sidecar strategy for non-Markdown outputs.

D-03-06: Determinism gate required for closure.
- Simple meaning: closure must be proven.
- Technical meaning: hard preconditions force `closed-with-gaps` if any mandatory check fails.

#### Benefits delivered

1. Output behavior is now a governed interface, not an implementation guess.
2. Safety defaults reduce accidental data loss risk.
3. Evidence expectations improve reproducibility and code-review quality.
4. Maintainers can explain behavior using one policy set across docs and release artifacts.

#### UX impact

For users:
1. Pre-write plan transparency before mutation.
2. Safer defaults in non-interactive contexts.
3. More consistent output location behavior.

For maintainers:
1. Fewer ambiguous bug reports.
2. Better triage because behavior is contract-scoped.

### 5.2 B-04: Canonical config contract and schema lock

Core artifacts (DONE packet):
- `_NOTES/delivery-plan/B-04. DONE_Lock one canonical config schema and format (output, projects, commonReferences).md`
- `_NOTES/delivery-plan/B-04a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-04b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-04c. DONE_closure-decision.md`
- `_NOTES/delivery-plan/B-04d. DONE_gap-register.md`

Proof artifacts:
- `_NOTES/delivery-plan/config-schema-v1.json`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.py`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.ps1`
- `_NOTES/delivery-plan/evidence/config/*.yaml`

#### What this item was

A locked contract for configuration shape, format, validation behavior, compatibility, and ownership.

#### Why this was needed (simple context)

If config is interpreted differently by different tools, users lose confidence and automation breaks in surprising ways.

#### Why this was needed (technical context)

Configuration is where hidden drift accumulates:
1. Format drift (YAML vs JSON handling differences).
2. Discovery/path precedence ambiguity.
3. Unknown-key policy inconsistency across local and CI contexts.
4. Versioning/deprecation ambiguity.
5. Multi-repo validator divergence.

B-04 set one contract to stop that drift early.

#### Decision set and implementation significance

D-04-01: YAML-only authoring in v2.4 with canonical internal model.
- Simple meaning: one obvious format for users.
- Technical meaning: parser normalizes to one model, reducing parser-branch drift.

D-04-02: Strict discovery precedence.
- Locked order:
  1. `./pm-skills.config.yaml`
  2. `./.pm-skills/config.yaml`
  3. `~/.pm-skills/config.yaml`
- Outcome: deterministic source selection.

D-04-03: Unknown-key warn locally, strict fail in CI.
- Simple meaning: local guidance without over-friction; hard correctness in automation.
- Technical meaning: execution-surface-aware severity model.

D-04-04: One-version deprecation grace.
- Simple meaning: upgrades remain practical.
- Technical meaning: bounded compatibility lifecycle (`active` -> `deprecated` -> `removed`).

D-04-05: Shared validation ownership across both repos.
- Simple meaning: one truth for validity.
- Technical meaning: validator contract and evidence expectations are cross-repo, not siloed.

D-04-06: Determinism gate required for closure.
- Same closure discipline pattern as B-03.

#### Validator and schema implementation details

Schema (`config-schema-v1.json`):
1. `configContractVersion` required and locked to `2.4.0`.
2. Strict `additionalProperties: false` policy at root and nested objects.
3. Constrained enums for `output.defaultMode` and `output.collision.nonInteractiveDefault`.
4. Typed structures for `projects` and `commonReferences`.

Python validator (`validate-config-contract-v2.4.py`):
1. Supports `warn` and `strict` modes.
2. Unknown-key handling switches behavior by mode.
3. Enforces required keys, enum correctness, and non-empty value constraints.
4. Emits deterministic output with warning/error counts and explicit result codes (`PASS`, `PASS_WITH_WARNINGS`, `FAIL`).

PowerShell wrapper (`validate-config-contract-v2.4.ps1`):
1. Standard invocation surface for Windows.
2. Defers rule logic to the Python validator to avoid implementation split.

#### Benefits delivered

1. Config behavior is now explicit and machine-checkable.
2. Cross-repo parity risk is lower because validator behavior is shared and evidenced.
3. CI/local policy differences are intentional and documented.
4. Future schema expansion can be managed through explicit versioned change control.

#### UX impact

1. Better feedback quality on config mistakes.
2. Lower ambiguity on which config file is active.
3. Reduced onboarding friction through deterministic defaults.

### 5.3 Determinism gates as a release quality mechanism

A major evolution in `v2.4.0` is not only the content of B-03/B-04 decisions, but closure rigor:
1. Hard preconditions explicitly listed in closure docs.
2. PASS/FAIL mapping tied to evidence reports.
3. Supersession hygiene checks for conflicting drafts.
4. Cross-repo ref/version markers included in closure criteria.

This creates a practical release discipline:
- If preconditions fail, closure state cannot be promoted.
- If evidence is incomplete, release claims stay constrained.

## 6) Cross-Release Evolution Pattern (2.3 -> 2.4)

### Maturity progression

1. `v2.3`: enforce parity and truth checks for cross-repo synchronization.
2. `v2.4`: lock core behavioral contracts that parity depends on.

In engineering terms:
1. First secure the integration boundary (`validate-mcp-sync`).
2. Then stabilize core semantics (output/config contracts).

### Why this sequence was correct

Trying to lock contracts before cross-repo drift controls would have allowed unmanaged divergence to invalidate contracts quickly.

By sequencing `B-01` and `B-02` before `B-03` and `B-04`, the project created a tighter feedback loop:
1. Detect mismatch early.
2. Prevent mismatch from merging by default.
3. Lock behavior contracts on top of that guardrail.

## 7) MCP Development Implications

From `v2.4.x` onward, direct version tracking alignment is the expected operating model:
1. `pm-skills v2.4.x` aligns with `pm-skills-mcp v2.4.x`.
2. `pm-skills-source.json` becomes a key operational truth source.
3. `validate-mcp-sync` checks now include contract-version parity (`outputContractVersion`, `configContractVersion`) in addition to inventory parity.

Practical consequences:
1. MCP release updates should be treated as contract and metadata updates, not only embedded-skill refreshes.
2. Documentation updates in both repos are part of closure quality, not post-release cleanup.
3. CI becomes the first line of contract governance for ecosystem trust.

## 8) CI and Developer Experience Impact

### CI improvements

1. Blocking default on drift mismatch for higher confidence merges.
2. Deterministic validator outputs for faster diagnosis.
3. Release evidence that can be replayed and audited.

### Developer experience improvements

1. Clear sync checklist when mismatches happen.
2. Fewer hidden assumptions across repos.
3. Explicit policy for config validation strictness by environment.
4. Better debugging because contracts define expected behavior before implementation details.

## 9) How To Use This Baseline Going Forward

### For maintainers preparing `v2.5+`

1. Keep `validate-mcp-sync` passing in block mode for all relevant changes.
2. Treat contract version markers as release-critical metadata.
3. Re-run determinism checks whenever contract artifacts or references change.
4. Keep closure packet hygiene (`implementation-checklist`, `evidence-report`, `closure-decision`, optional `gap-register`) for new blockers.

### For contributors

1. Assume output/config behavior must conform to B-03/B-04 contracts unless superseded by explicit signed decisions.
2. Update command/docs surfaces when adding skills to avoid command parity warnings.
3. Include evidence for behavior claims in PR notes and artifacts.

### For PM/non-technical reviewers

Use this rule of thumb:
1. If a claim changes system behavior, ask for the contract section and evidence row.
2. If a release claim says "closed-aligned", verify the closure decision artifact references hard preconditions and PASS evidence.

## 10) Engineering Lessons (Learning Section)

### Lesson 1: Contracts are interfaces, not documentation decoration

A contract is useful only when:
1. It defines behavior in testable terms.
2. It includes failure mode behavior.
3. It has closure rules that reject incomplete proof.

### Lesson 2: Safety defaults reduce both user risk and maintenance cost

Examples from 2.4:
1. Non-interactive collision fallback to `new-file`.
2. Strict unknown-key fail in CI.
3. Path boundary enforcement and traversal rejection.

These choices reduce incident burden and ambiguity-driven support load.

### Lesson 3: Separate concerns before encoding policy

B-03 showed the value of separating:
1. Intent classification
2. Target selection
3. Collision handling
4. Metadata requirements

This reduces accidental policy coupling and makes behavior easier to reason about.

### Lesson 4: Evidence quality is part of product quality

If release evidence is weak, release confidence is weak.  
The 2.3-2.4 process treats evidence artifacts as first-class delivery outputs.

### Lesson 5: Governance is an enabler when kept concrete

Governance helped because it was operationalized:
1. CI workflow checks.
2. Explicit checklist states.
3. Shipped release notes tied to closure packets.
4. Supersession mapping for conflict cleanup.

## 11) Limits and Explicit Non-Goals at 2.4

Still intentionally not completed in this release range:
1. Full automation wrapper for all determinism gate commands.
2. Broad merge support across many file formats.
3. Foundation/persona decision closures (`B-05`, `B-06`) which remain next-release scope.

Calling these out prevents false assumptions and keeps roadmap truth clear.

## 12) Artifact Map (2.3-2.4)

### Release notes
- `docs/releases/Release_v2.3.md`
- `docs/releases/Release_v2.4.md`

### Release planning controls
- `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
- `docs/internal/release-planning/checklist_v2.3.0.md`
- `docs/internal/release-planning/checklist_v2.4.0.md`

### v2.3 closure packets
- `_NOTES/delivery-plan/B-01a. DONE_alignment-checklist.md`
- `_NOTES/delivery-plan/B-01b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-01c. DONE_closure-decision.md`
- `_NOTES/delivery-plan/B-02a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-02b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-02c. DONE_closure-decision.md`

### v2.4 closure packets
- `_NOTES/delivery-plan/B-03. DONE_Lock canonical output behavior contract (prompt-file-hybrid, overwrite-collision rules).md`
- `_NOTES/delivery-plan/B-03a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-03b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-03c. DONE_closure-decision.md`
- `_NOTES/delivery-plan/B-04. DONE_Lock one canonical config schema and format (output, projects, commonReferences).md`
- `_NOTES/delivery-plan/B-04a. DONE_implementation-checklist.md`
- `_NOTES/delivery-plan/B-04b. DONE_evidence-report.md`
- `_NOTES/delivery-plan/B-04c. DONE_closure-decision.md`

### Guardrail and validator implementations
- `.github/workflows/validate-mcp-sync.yml`
- `.github/scripts/validate-mcp-sync.js`
- `_NOTES/delivery-plan/config-schema-v1.json`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.py`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.ps1`

## 13) Closing Perspective

The key accomplishment in 2.3-2.4 is system maturity.

The project moved from:
- "we have docs and scripts"
to:
- "we have enforceable contracts, cross-repo parity controls, closure evidence, and release truth discipline."

That foundation is what allows future feature velocity without sacrificing trust.