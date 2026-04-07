# [F-12] Skill Quality Convergence
Status: Draft
Release: TBD
Issue: TBD
Agent: Claude Opus 4.6 + Human (judgment calls)

## Scope

Bring all 25 domain skills and the foundation-persona skill toward the v2.8 quality standard using the lifecycle tools (`/pm-skill-validate` → `/pm-skill-iterate`). This is the first real-world use of the Create → Validate → Iterate lifecycle, and doubles as the deferred end-to-end test from v2.8.0.

The 3 utility skills (builder, validate, iterate) are excluded — they were built to the v2.8 standard and already pass.

## Relationship

- **M-13 (Convention Alignment)** — structural CI compliance. M-13 should run first to ensure all skills pass Tier 1 before this effort runs Tier 2. M-13 is a prerequisite.
- **F-10 / F-11** — this effort is the first consumer of the lifecycle tools at scale.
- **Skill versioning governance** (`docs/internal/skill-versioning.md`) — this effort creates the first HISTORY.md files and the first skill version bumps since v2.0.

## Why This Matters

The v2.8 standard (what `/pm-skill-builder` produces) is higher than what most existing skills meet. The validator surfaces the gap as WARNs and INFOs. Without a deliberate convergence effort, the library stays split: new skills are polished, old skills are functional but inconsistent. This effort closes that gap incrementally.

It also proves the lifecycle tools work end-to-end on real skills — not just on the synthetic examples in EXAMPLE.md files.

## What the Validator Checks (Tier 2)

For reference, these are the quality checks each skill will face:

| Check | What it means | Expected findings across 26 skills |
|-------|--------------|-----------------------------------|
| `output-contract-coverage` | Does SKILL.md reference the template? | Most use "use the template" (WARN — valid but below v2.8 standard) |
| `checklist-verifiability` | Are checklist items testable? | Some vague items expected |
| `example-completeness` | Does EXAMPLE.md fill all template sections? | Varies — some examples are thin |
| `template-example-alignment` | Does EXAMPLE.md follow TEMPLATE.md structure? | Generally good |
| `description-actionability` | Does description say *when* to use it? | Most include trigger phrases (PASS expected) |
| `instruction-clarity` | Are instructions numbered and imperative? | All use numbered steps (PASS expected) |
| `placeholder-leakage` | Any leftover scaffolding? | Should be clean (PASS expected) |
| `when-not-to-use` | Has a "When NOT to Use" section? | 1/27 currently has this (INFO — optional) |

## Approach

### Phase 1: Triage (1 session)

Run `/pm-skill-validate --all` (batch mode, Tier 1 structural only) to confirm M-13 is done. Then run `/pm-skill-validate` individually on 5 representative skills across different phases to understand the Tier 2 finding patterns:

- `deliver-prd` (Deliver, specification — the most-referenced skill)
- `define-hypothesis` (Define, ideation)
- `discover-competitive-analysis` (Discover, research)
- `measure-experiment-design` (Measure, validation)
- `iterate-retrospective` (Iterate, reflection)

**Deliverable:** Triage table showing all 26 skills with their expected Tier 2 findings and a recommended action (fix / skip / defer) for each finding type.

### Phase 2: Decision — What "convergence" means

Before iterating, decide the quality bar for this effort:

**Option A: Fix all WARNs**
Every skill gets iterated until it passes Tier 2 with zero WARNs. Most thorough, but also the most work (~26 skills x 1-3 findings each). Creates 26 version bumps and potentially 26 HISTORY.md files.

**Option B: Fix FAILs + high-value WARNs only**
Fix any FAIL (placeholder leakage) and the WARNs most likely to confuse users (output contract coverage, checklist verifiability). Leave INFOs (When NOT to Use) and low-signal WARNs (template-example alignment for minor ordering differences). Creates fewer version bumps.

**Option C: Fix by priority tier**
Tier the skills by usage/importance. Fix the top 10 most-used skills thoroughly, leave the rest for future passes. Delivers the highest-value convergence with the least effort.

**Recommendation:** Option B. Fix FAILs and high-value WARNs. Leave INFOs alone. This brings the library to a consistent baseline without over-iterating skills that work fine.

### Phase 3: Iterate (2-3 sessions)

For each skill that needs work:

1. Run `/pm-skill-validate {skill}` — get the detailed report
2. Run `/pm-skill-iterate {skill}` with the report — apply fixes
3. Accept the version bump (patch for all expected changes)
4. Accept HISTORY.md creation (first iteration = second version = trigger)
5. Run `/pm-skill-validate {skill}` again — confirm findings resolved

**Batch strategy:** Group skills by finding type. Fix all `output-contract-coverage` WARNs in one pass, then all `checklist-verifiability` WARNs, etc. This is more efficient than iterating each skill individually because the fix pattern is the same.

### Phase 4: Document and release

- Update `docs/internal/release-plans/` with the release plan
- Create `skills-manifest.yaml` listing all bumped skills
- CHANGELOG entry
- Consider whether this warrants a minor release (v2.9.0 — "quality convergence across the library") or a patch (v2.8.2)

## Version Bump Expectations

All changes in this effort are expected to be **patch** bumps:

| Change type | Why patch |
|-------------|----------|
| Expanding output contract to enumerate template sections | Clarification — existing outputs still comply |
| Rewriting vague checklist items for testability | Same requirements, clearer phrasing |
| Expanding thin EXAMPLE.md files | Reference material improved, no contract change |
| Fixing template-example section alignment | Structural consistency, no behavior change |

If any skill requires a new required section or a changed interaction pattern, that's a **minor** bump and should be evaluated individually.

## HISTORY.md Impact

Every skill that gets a version bump in this effort will be on its second version (most are at 2.0.0 from the v2.0 restructure). Per `skill-versioning.md`, this triggers HISTORY.md creation with entries for both versions.

This means this effort will create up to **26 HISTORY.md files** — the first in the repo. The iterator offers to create them automatically at the trigger point.

## Dependencies

- **M-13** — must complete first (all skills pass Tier 1 structural checks)
- **F-10 / F-11** — lifecycle tools must be working (shipped in v2.8.0)
- **Human decisions** — Phase 2 quality bar decision, individual judgment on edge cases

## Artifacts Produced

- Validation reports for all 26 skills (conversation artifacts, not committed)
- Updated SKILL.md files (patched output contracts, checklists, examples)
- Up to 26 HISTORY.md files (first in the repo)
- `skills-manifest.yaml` for the release
- CHANGELOG entry

## Open Questions

1. **Should M-13 be a prerequisite or can they run in parallel?** M-13 fixes structural issues; this effort fixes quality issues. They touch different aspects of the same files. Running M-13 first avoids merge conflicts and ensures a clean Tier 1 baseline before Tier 2 assessment.

2. **Release vehicle?** Is this v2.8.2 (patch — no new skills), v2.9.0 (minor — significant quality improvement across the library), or combined with new skill work?

3. **"When NOT to Use" — adopt or defer?** Currently INFO only (1/27 skills have it). Should this effort add it to all skills, or leave it as an aspirational convention? Adding it to all skills would be a minor bump (new section in the contract).

## PRs

- TBD
