# v2.27.0 Release Plan: Prove + industrialize (trigger evals, derived surfaces, marketplace reach, hygiene)

**Status:** PROPOSED R2 (R1 promoted the stub and committed trigger evals + marketplace submission; R2 same day expands scope per maintainer instruction "expand with the most valuable items": derived surfaces committed, hygiene workstream + command polish added, specs + implementation plans written). Maintainer pre-authorized build start 2026-06-12; the adversarial review loop still runs before tag per G1.
**Owner:** Maintainers
**Type:** MINOR (new advisory CI capability + eval fixtures + a generated manifest + AGENTS.md generation; no new skills, no catalog count change; the marketplace submission is a distribution action with no code).
**Theme:** Prove + industrialize. After v2.26.0 closed the authoring + quality-convergence gap, v2.27.0 converts quality claims into verifiable properties (the first lane of the published per-skill eval standard), kills the hand-sync drift class before the catalog grows again (derived surfaces), and fixes the cheapest distribution defect (absence from the in-app Discover tab).
**Created:** 2026-06-10 (stub at v2.26.0 G4) | **Updated:** 2026-06-12 R2
**Companion docs (this directory):** [`spec_trigger-accuracy-evals.md`](spec_trigger-accuracy-evals.md) + [`implementation-plan_trigger-accuracy-evals.md`](implementation-plan_trigger-accuracy-evals.md) | [`spec_derived-surfaces.md`](spec_derived-surfaces.md) + [`implementation-plan_derived-surfaces.md`](implementation-plan_derived-surfaces.md)
**Effort briefs:** [M-31 trigger-accuracy evals](../../efforts/M-31-trigger-accuracy-evals.md) | [M-32 derived surfaces](../../efforts/M-32-derived-surfaces.md) | [M-25 community-marketplace submission](../../efforts/M-25-community-marketplace-submission.md)

---

## Why this scope, why now

1. **Trigger accuracy is now a published, measurable standard.** The agentskills.io skill-creation guides codify trigger evals (labeled query sets, 60/40 train/validation split, trigger-rate thresholds) and per-skill output evals (`evals/evals.json`). No PM skill library currently conforms. The 2026-06-09 audit found description collisions by hand; F-12 Batch 0 (v2.26.0) fixed them; M-31 makes recurrence detectable instead of relying on the next manual audit. Sequenced AFTER F-12 by design, so fixtures test the corrected corpus.
2. **M-25 was verified open on 2026-06-09** (no issue exists; no Discover-tab listing across issues, CHANGELOG, roadmap, or audit). The community marketplace puts pm-skills in the Discover tab of every Claude Code install with zero change to existing install paths, and its SHA-pinned listing model is itself a trust signal.
3. Both items are the first two moves of the competitive roadmap's top-priority pillars (provable quality; distribution-as-product) while staying small enough to ship on the normal cadence.

## Scope - what v2.27.0 ships (committed)

| Item | Issue | One-line intent | Agent |
|---|---|---|---|
| **Trigger-accuracy eval harness, Phase 1 (M-31)** | #200 | Trigger fixtures for the F-12 cohort + collision partners (29 files) in the published format; local + cost-gated CI harness; deterministic fixture validator wired ADVISORY (Tasks 1-2 LANDED 2026-06-12); recorded baseline | claude (fixtures) + codex (harness/validator) |
| **Derived surfaces, Phase 1 (M-32)** | #201 (closes #87, open since January, on ship) | `skill-manifest.json` generated from frontmatter + AGENTS.md catalog section generated between markers, both behind ENFORCING `--check` staleness gates; retires the disabled `sync-agents-md.yml` | codex or claude |
| **Community-marketplace submission (M-25)** | #202 | `claude plugin validate`, submit to Anthropic's community marketplace, verify Discover-tab listing + install smoke; self-hosted path unchanged | human (submission) + claude (prep/verification) |

## Workstream WS-B: release hygiene + command polish (plan rows, not effort briefs, per the v2.26.0 P-F precedent)

| ID | Work | Detail | Agent |
|---|---|---|---|
| WS-B1 | `_workflows/` scar sweep + guard scope | Sweep the spaced-period scars in `_workflows/*.md` (carried stub item) and extend the scar guard's ROOTS to cover `_workflows/` so they cannot return | codex |
| WS-B2 | validate-skill command-exists drift | Align `utility-pm-skill-validate`'s Tier-1 `command-exists` check with post-v2.22.0 conventions (carried stub item from F-12 Batch 1 triage) | claude |
| WS-B3 | Command polish: argument-hint + allowed-tools (M-27 candidate from the operating-layer roadmap) | Add `argument-hint` to the 10 `/workflow-*` commands + `/chain`; pre-approve Read/Write via `allowed-tools` where chains stall on prompts | claude |
| WS-B4 | displayName + context-cost measurement (M-26 candidate from the operating-layer roadmap) | Add `displayName` to the plugin manifest; run + record `claude plugin details` token cost (the number that later drives the plugin-split decision) | claude |

Standing principle (applies to everything above and all future work): durable CI is core. New artifact classes ship with their validator in the same release, advisory first, promoted per-invariant after a triage pass (the M-30 ladder), with deliberate, recorded exceptions for deterministic gates over brand-new artifacts (spec_derived-surfaces D-C); anything CI cannot run (LLM-judged lanes, external listings) gets a recording rule, and the record is the gate.

## Candidate scope (recorded, NOT committed; carried from the 2026-06-10 stub)

| Candidate | Origin | One-line intent |
|---|---|---|
| **Derived-surfaces later phases** | Spec D-D deferrals (M-32 Phase 1 is committed above) | Landing-card + README-number generation, static Skill Finder, per-skill output schemas, `build-skill-catalog.py` consolidation onto the manifest |
| **WS-A4: skills-ref CI lane (closes #97)** | v2.26.0 WS-A row, deliberately left open (agent:codex, M-sized) | Normalize skill `metadata` typing toward the agentskills.io string-map rule, then wire `skills-ref validate` over `skills/*` as advisory CI; promote when green. If picked up in-window, sequence before M-32 Task 1 (soft preference, not a dependency) |
| **Smoke-runbook CI wrapper (advisory)** | v2.26.0 agentic-smoke-runbook "why not CI" section | Optional `workflow_dispatch` lane automating the runbook (ANTHROPIC_API_KEY secret, LLM-judged); automates the procedure, never replaces the recording rule. Note: M-31's cost-gated lane shares this mechanism; build once if both land |
| **Orchestrator Mode A native smoke + interactive multi-checkpoint run** | v2.26.0 smoke-gate caveats | Mode B headless PASS is recorded; Mode A native and a continuous interactive engine across checkpoints remain unexercised |
| **validate-skill commands drift** | F-12 Batch 1 triage note (PR #192) | Align `utility-pm-skill-validate`'s Tier-1 `command-exists` check with post-v2.22.0 conventions |
| **F-12 "When NOT to Use" beyond the cohort** | F-12 spec deferred item | Adopt for non-cohort skills if the convergence proves high-value in practice |
| **_workflows/ scar sweep** | Noticed during F-14 exemplar reads | `_workflows/*.md` spaced-period scars; sweep + extend guard ROOTS |

## Sequencing + dependencies

1. **File the three issues: DONE 2026-06-12** (#200 trigger evals / #201 derived surfaces / #202 marketplace submission; IDs verified free; `v2.27.0` milestone created as milestone 5).
2. **Marketplace submission prep (M-25)** (S): `claude plugin validate`; fix anything flagged; submit. External review latency is outside our control, so start first; listing verification is an evidence gate, not a build step.
3. **Specs: DONE 2026-06-12** (both spec + implementation-plan pairs in this directory). Build pre-authorized; G1 adversarial review still runs before tag and findings fold back into the specs.
4. **Trigger evals (M-31) build** per its implementation plan: validator + advisory wiring -> collision-batch fixtures -> remaining fixtures -> harness + dispatch lane -> recorded baseline + triage.
5. **Derived surfaces (M-32) build** per its implementation plan, in parallel with item 4 (independent): generator + manifest + gate -> AGENTS.md markers + first-generation diff triage + gate + sync-workflow retirement.
6. **WS-B hygiene + polish rows** land as small independent PRs any time in the window; WS-B1 (scar sweep) before any new `_workflows` content is authored.
7. **Tag v2.27.0** via the 6-gate runbook once the evidence gates are recorded (trigger-eval baseline report; marketplace submission record, with the listing itself allowed to trail the tag if Anthropic review is pending: record the submission, disclose in release notes). Keep this plan's scope table and the two implementation-plan task tables current as PRs land (update-plans-as-you-ship).

## Decisions (lettered for review)

| # | Decision | Rationale |
|---|---|---|
| Q-A | Trigger evals (M-31) precede output evals (`evals/evals.json`, future M-xx) | Trigger accuracy tests the surface F-12 just corrected; output evals are larger and benefit from the fixture-layout decision made here |
| Q-B | Fixtures live under each skill's `evals/` directory (exact file naming decided in spec) | Matches the published colocated-evals convention; one directory serves both lanes later |
| Q-C | Adding fixtures does NOT bump skill versions (no behavior change); record in skill-versioning doc | Keeps HISTORY.md signal about behavior, not tooling; revisit if fixtures ever alter SKILL.md content |
| Q-D | M-25 ships with the self-hosted marketplace path unchanged (dual rail) | Zero-risk addition; the v3.0.0 old-path retirement decision is untouched |
| Q-E | The LLM-run trigger lane is cost-gated `workflow_dispatch`, advisory, recording-rule-governed; only the deterministic fixture-structure validator enters `validation.yml` | Mirrors the M-30 ladder and the smoke-runbook cost decision |
| Q-F | Derived surfaces (M-32) joins committed scope, Phase 1 boundary = manifest + AGENTS.md catalog only (landing cards, Finder, schemas deferred) | Highest-value remaining candidate; must land before any catalog-growing release so growth never re-pays the hand-sync tax; boundary detail in spec D-D |
| Q-G | The marketplace submission (M-25) gets NO separate spec; its effort brief is the spec | External action, not a build; the brief already carries scope, steps, validation, and open questions |
| Q-H | Hygiene + polish items enter as WS-B plan rows, not effort briefs | The v2.26.0 P-F no-effort-doc-bloat precedent |
| Q-I | The two M-26/M-27 operating-layer candidates ride this release as WS-B3/WS-B4 plan rows under their roadmap names (command argument hints; displayName + context-cost measurement) | S-sized, immediate UX gain, and WS-B4's measured token cost is the input the plugin-split decision needs |

## How each item ships (standard pipeline)

1. Issue filed (effort.yml template) -> 2. Spec in this directory -> 3. Implementation plan -> 4. Build per task order -> 5. 6-gate runbook cuts the tag (CHANGELOG, release notes with pinned `slug:`, recording-rule evidence attached).

## Carried environment/tooling items (unchanged from stub)

- Codex sandbox pwsh exit -1 diagnosis (`/codex:setup`); would restore native `/codex:review`.
- Engine filesystem-check hardening for the plugin-cache recursive-Glob quirk recorded in the smoke runbook.
