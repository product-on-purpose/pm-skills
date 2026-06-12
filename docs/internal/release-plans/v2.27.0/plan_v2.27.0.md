# v2.27.0 Release Plan: Prove + reach (trigger-accuracy evals, community-marketplace submission)

**Status:** PROPOSED R1 (promoted from STUB 2026-06-12 by maintainer instruction: commit M-31 + M-25; all other stub candidates remain candidates, not committed). Spec work not started; convert each committed item via the standard pipeline (issue -> spec -> implementation plan -> review loop) before build.
**Owner:** Maintainers
**Type:** MINOR (M-31 adds a new advisory CI capability + per-skill eval fixtures; no new skills, no catalog count change; M-25 is a distribution action with no code). Re-evaluate if additional candidates join the scope.
**Theme:** After v2.26.0 closed the authoring + quality-convergence gap, v2.27.0 starts converting the repo's quality claims into verifiable properties (the first lane of the published per-skill eval standard) and fixes the cheapest distribution defect (absence from the in-app Discover tab).
**Created:** 2026-06-10 (stub at v2.26.0 G4) | **Updated:** 2026-06-12 R1 (scope partially committed)
**Effort briefs:** [M-31 trigger-accuracy evals](../../efforts/M-31-trigger-accuracy-evals.md) | [M-25 community-marketplace submission](../../efforts/M-25-community-marketplace-submission.md)

---

## Why this scope, why now

1. **Trigger accuracy is now a published, measurable standard.** The agentskills.io skill-creation guides codify trigger evals (labeled query sets, 60/40 train/validation split, trigger-rate thresholds) and per-skill output evals (`evals/evals.json`). No PM skill library currently conforms. The 2026-06-09 audit found description collisions by hand; F-12 Batch 0 (v2.26.0) fixed them; M-31 makes recurrence detectable instead of relying on the next manual audit. Sequenced AFTER F-12 by design, so fixtures test the corrected corpus.
2. **M-25 was verified open on 2026-06-09** (no issue exists; no Discover-tab listing across issues, CHANGELOG, roadmap, or audit). The community marketplace puts pm-skills in the Discover tab of every Claude Code install with zero change to existing install paths, and its SHA-pinned listing model is itself a trust signal.
3. Both items are the first two moves of the competitive roadmap's top-priority pillars (provable quality; distribution-as-product) while staying small enough to ship on the normal cadence.

## Scope - what v2.27.0 ships (committed)

| Item | Issue | One-line intent | Agent |
|---|---|---|---|
| **M-31 Trigger-accuracy eval harness, Phase 1** | TBD (file via effort template) | Per-skill trigger fixtures for the F-12 26-skill cohort in the published format; local + cost-gated CI harness; deterministic fixture-structure validator wired ADVISORY | claude (fixtures) + codex (harness/validator) |
| **M-25 Community-marketplace submission** | TBD (file via effort template) | `claude plugin validate`, submit to Anthropic's community marketplace, verify Discover-tab listing + install smoke; self-hosted path unchanged | human (submission) + claude (prep/verification) |

Standing principle (applies to both and to all future work): durable CI is core. New artifact classes ship with their validator in the same release, advisory first, promoted per-invariant after a triage pass (the M-30 ladder); anything CI cannot run (LLM-judged lanes, external listings) gets a recording rule, and the record is the gate.

## Candidate scope (recorded, NOT committed; carried from the 2026-06-10 stub)

| Candidate | Origin | One-line intent |
|---|---|---|
| **Derived-surfaces theme** | v2.26.0 plan deferred section; audit follow-up #5 + issue #87 (open since January) | Generate the hand-synced surfaces (AGENTS.md catalog section, landing cards, skill-manifest.json, static Skill Finder, optional output schemas) from the resource index instead of hand-syncing; structurally kills the WS-A1/A2 drift class (~20 surfaces found in the v2.26.0 count sweeps) |
| **WS-A4: skills-ref CI lane (closes #97)** | v2.26.0 WS-A row, deliberately left open (agent:codex, M-sized) | Normalize skill `metadata` typing toward the agentskills.io string-map rule, then wire `skills-ref validate` over `skills/*` as advisory CI; promote when green |
| **Smoke-runbook CI wrapper (advisory)** | v2.26.0 agentic-smoke-runbook "why not CI" section | Optional `workflow_dispatch` lane automating the runbook (ANTHROPIC_API_KEY secret, LLM-judged); automates the procedure, never replaces the recording rule. Note: M-31's cost-gated lane shares this mechanism; build once if both land |
| **Orchestrator Mode A native smoke + interactive multi-checkpoint run** | v2.26.0 smoke-gate caveats | Mode B headless PASS is recorded; Mode A native and a continuous interactive engine across checkpoints remain unexercised |
| **validate-skill commands drift** | F-12 Batch 1 triage note (PR #192) | Align `utility-pm-skill-validate`'s Tier-1 `command-exists` check with post-v2.22.0 conventions |
| **F-12 "When NOT to Use" beyond the cohort** | F-12 spec deferred item | Adopt for non-cohort skills if the convergence proves high-value in practice |
| **_workflows/ scar sweep** | Noticed during F-14 exemplar reads | `_workflows/*.md` spaced-period scars; sweep + extend guard ROOTS |

## Sequencing + dependencies

1. **File the two issues** (effort template: ID, Type, Agent, milestone v2.27.0) and confirm the M-31 provisional ID is free against the live issue list + `backlog-canonical.md` remnants before use.
2. **M-25 prep** (S): `claude plugin validate` against the marketplace manifest; fix anything it flags; submit. External review latency is outside our control, so start first; the listing verification is an evidence gate, not a build step.
3. **M-31 spec** (joint fixture-schema + harness spec; decide fixture location/naming relative to the future `evals/evals.json` output-eval lane so the directory layout is settled once).
4. **M-31 build:** fixture-structure validator (advisory, free, lands immediately) -> cohort fixtures -> harness -> baseline run recorded.
5. **Tag v2.27.0** via the 6-gate runbook once both evidence gates are recorded (M-31 baseline report; M-25 submission record, with the listing itself allowed to trail the tag if Anthropic review is pending: record the submission, disclose the pending state in release notes).

## Decisions (lettered for review)

| # | Decision | Rationale |
|---|---|---|
| Q-A | Trigger evals (M-31) precede output evals (`evals/evals.json`, future M-xx) | Trigger accuracy tests the surface F-12 just corrected; output evals are larger and benefit from the fixture-layout decision made here |
| Q-B | Fixtures live under each skill's `evals/` directory (exact file naming decided in spec) | Matches the published colocated-evals convention; one directory serves both lanes later |
| Q-C | Adding fixtures does NOT bump skill versions (no behavior change); record in skill-versioning doc | Keeps HISTORY.md signal about behavior, not tooling; revisit if fixtures ever alter SKILL.md content |
| Q-D | M-25 ships with the self-hosted marketplace path unchanged (dual rail) | Zero-risk addition; the v3.0.0 old-path retirement decision is untouched |
| Q-E | The LLM-run trigger lane is cost-gated `workflow_dispatch`, advisory, recording-rule-governed; only the deterministic fixture-structure validator enters `validation.yml` | Mirrors the M-30 ladder and the smoke-runbook cost decision |

## How each item ships (standard pipeline)

1. Issue filed (effort.yml template) -> 2. Spec in this directory -> 3. Implementation plan -> 4. Build per task order -> 5. 6-gate runbook cuts the tag (CHANGELOG, release notes with pinned `slug:`, recording-rule evidence attached).

## Carried environment/tooling items (unchanged from stub)

- Codex sandbox pwsh exit -1 diagnosis (`/codex:setup`); would restore native `/codex:review`.
- Engine filesystem-check hardening for the plugin-cache recursive-Glob quirk recorded in the smoke runbook.
