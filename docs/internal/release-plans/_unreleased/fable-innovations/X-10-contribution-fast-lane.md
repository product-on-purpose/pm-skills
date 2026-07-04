# X-10 Contribution fast lane (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision) | **Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-10) and section 6c (prioritization)
**Candidate formal ID at promotion:** provisional M-39 (unconfirmed; confirm the next-free M-ID against the GitHub issue list at filing, since M-34, the pm-skill-router, through M-36, the zero-drift generated-surfaces effort, are already claimed)
**Audit score (6c):** Bar 1 / Moat 1 / Effort(inv) 2 = 4/9

---

## Summary

The audit's plainest number is also its starkest: 440 GitHub stars, 56 forks, and zero external human commits across 746 commits. `CONTRIBUTING.md`'s own Eval Contract, deliberately steep because it makes routing and output quality measurable, names four parts a shipped-skill change must satisfy: reciprocal boundary pointers, trigger fixtures, an output scenario plus a family rubric, and a version-history bump. That contract is right for a new skill or a behavior change. It is a wall for a first-time contributor who only wants to fix a wrong word in one skill's description or add a missing "When NOT to Use" line.

X-10 builds a narrow, explicitly bounded exception lane: a "fix one skill in twenty minutes" path where the contributor touches only content, and the maintainer's own tooling, not the contributor, produces the mechanical surfaces the Eval Contract's fourth part already requires, a version bump, a HISTORY row, a manifest regeneration. The audit scores this bet the lowest of the ten (Bar 1, Moat 1) because it changes nothing about the product's defensibility. It recommends building it anyway, because it is the only lever in the entire portfolio that moves the bus-factor-1 finding (P1-4), and that finding is the risk the audit calls out as eventually invalidating every other claim if it is never addressed.

### What it looks like end to end (illustrative)

A contributor opens a WS-T6-seeded good-first-issue labeled `fast-lane`: `develop-spike-summary`'s description is one of the audit's named weak early-cohort descriptions (P2-5). They read the issue, edit one line of frontmatter in `SKILL.md`, and open a PR titled `fix: sharpen develop-spike-summary description`, with no other files touched. That is the contributor's entire twenty minutes. The maintainer then runs `scaffold-contribution.mjs` against the PR: the tool classifies the change as description-only, proposes a PATCH bump, drafts the `HISTORY.md` row, and regenerates `skill-manifest.json` plus the `AGENTS.md` block. The maintainer reviews the proposed diff, confirms the rewritten description still separates cleanly from its neighbors, commits the mechanical changes alongside the contributor's edit, and merges. The contributor never touched a manifest, a fixture, or a HISTORY file.

## Relationship to existing plans

- **Is the on-ramp for v2.30.0's WS-T6 (governance guardrails).** The "Trust repair" plan ([`plan_v2.30.0.md`](../../v2.30.0/plan_v2.30.0.md)) seeds 3-5 good-first-issues under WS-T6, drawn from heading normalization, HISTORY stubs, orphan cleanup, and site link fixes. WS-T6 creates the issues; X-10 is the lane and the tooling that lets a first-time contributor actually close one without hitting the full Eval Contract. Neither document restates the other's scope.
- **Distinct from v2.31.0's WS-Z5 (eval industrialization).** The "Zero-drift releases" plan's WS-Z5 workstream ([`plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md)) is the maintainer backfilling trigger-fixture coverage for uncovered skills, a different actor and a different goal than X-10's aim of not requiring a first-time contributor to author eval assets for a content-only change.
- **Leaves the Eval Contract in `CONTRIBUTING.md` unchanged for its intended cases** (new skills, behavior changes). X-10 adds a second, narrower path alongside it; it does not relax the first.
- **No relationship to X-07, X-08, or X-09.**

## Spec

### Scope

**In scope:**
- A new CONTRIBUTING.md section naming exactly which change types qualify for the fast lane and which do not.
- A maintainer-invoked scaffold script that produces the mechanical Eval-Contract surfaces (version-bump class, HISTORY row, manifest regeneration, a reciprocal-edge draft stub) from a fast-lane-labeled PR's diff.
- A GitHub label and a PR-template pointer connecting the lane to the WS-T6-seeded good-first-issues.

**Out of scope:**
- Any relaxation of the Eval Contract for new skills or behavior-changing edits.
- Auto-merge or bot-driven merging; a human maintainer reviews and merges every fast-lane PR exactly as today.
- A bot that runs the scaffold script automatically on PR open; v1 is a maintainer-invoked local tool, matching the existing `gen-skill-manifest.mjs` pattern. Auto-triggering is a named, explicitly deferred v2 hardening step.

### Requirements

| ID | Requirement |
|---|---|
| REQ-1 | `CONTRIBUTING.md` gains a "Fast lane" section, placed near the existing Quality Criteria and Skill Structure sections, naming the qualifying change types by explicit example (a description wording fix, a `When NOT to Use` addition pointing at an existing neighbor, a craft-note or `EXAMPLE.md` clarification, a heading-spelling normalization) and the version-bump class each implies per `docs/internal/skill-versioning.md`. |
| REQ-2 | The same section states, equally explicitly, what disqualifies a change from the lane: anything touching a new skill, anything that could change routing or collision behavior, anything requiring new trigger fixtures, anything changing the contract's structure. |
| REQ-3 | `scripts/scaffold-contribution.mjs` (+ `.test.mjs`): given a fast-lane PR's changed files, classifies the change against the REQ-1 taxonomy, computes the resulting version-bump class, drafts a `HISTORY.md` row, and runs the existing regeneration chain (`gen-skill-manifest.mjs`, then `gen-skill-manifest.mjs --agents`). It outputs a diff for the maintainer to review; it never commits on its own. |
| REQ-4 | If the classified change touches a boundary pointer, a `When NOT to Use` addition, the script drafts the reciprocal edge as a clearly marked stub in the named neighbor's SKILL.md for the maintainer to complete or discard, never silently applied. |
| REQ-5 | A `fast-lane` GitHub label and a one-line pointer in the PR template directing a contributor to the REQ-1 section; the WS-T6-seeded good-first-issues from v2.30.0 are labeled `fast-lane` where they qualify. |
| REQ-6 | The script never authors SKILL.md prose content; it produces only mechanical surfaces, a version bump, a HISTORY row, a manifest regen, a boundary-pointer stub. Content judgment stays with the contributor and the reviewing maintainer. |

### Interfaces

`scaffold-contribution.mjs` usage (illustrative):

```
node scripts/scaffold-contribution.mjs --pr <number>
# -> prints the classified change type + bump class
# -> writes a draft HISTORY.md row and regenerated manifest to a review diff
# -> if a boundary pointer is touched, drafts a stub in the neighbor skill
```

Drafted `HISTORY.md` row (illustrative output, not auto-committed):

```
## 1.4.1 (2026-07-10)
- Sharpened the trigger description for clearer routing (fast-lane contribution, PR #212).
```

### Durable CI block

None. `scaffold-contribution.mjs` is a maintainer-invoked local tool in the same family as `gen-skill-manifest.mjs`, not a CI gate; it is not wired into `.github/workflows/validation.yml`. A CI-side check that a `fast-lane`-labeled PR's changed files stay inside the declared taxonomy is a plausible v2 hardening step, explicitly not built now.

### Non-goals

Not a general contribution-automation platform. Not a relaxation of the Eval Contract's requirements for new skills. Not a fix for governance succession or bus factor beyond the narrow content-only lane; the deeper bus-factor question, a true second maintainer, is unaddressed by this document, matching the audit's own framing of this bet as a hedge, not a solution.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Write the `CONTRIBUTING.md` fast-lane section and taxonomy (REQ-1, REQ-2) | agent:claude | S | none |
| 2 | Build `scaffold-contribution.mjs` + `.test.mjs` (REQ-3, REQ-4, REQ-6) | agent:codex | M | Phase 1 |
| 3 | Create the `fast-lane` label; add the PR-template pointer (REQ-5) | agent:human (label) + agent:claude (template copy) | S | Phase 1 |
| 4 | Label the WS-T6-seeded good-first-issues `fast-lane` where eligible | agent:human | S | v2.30.0 WS-T6 issues seeded |
| 5 | Dry-run the script against one real historical content-only commit, confirming its output matches what a human produced by hand | agent:codex | S | Phase 2 |
| 6 | Staged: a CI bot auto-running the scaffold on `fast-lane`-labeled PR open | agent:human decides whether to promote | S | 3+ real external contributions processed cleanly via the manual flow |

### Test strategy

`scaffold-contribution.test.mjs` maps fixture diffs to expected taxonomy buckets and bump classes; a fixture PR diff asserts the drafted HISTORY row and regenerated manifest output match hand-verified expected content. No CI wiring; the tool runs in the existing local `node --test` suite only.

## Release surfaces touched

`CONTRIBUTING.md` (new section), `scripts/scaffold-contribution.mjs` + test (new, not CI-wired), a new GitHub label, the PR template, the WS-T6-seeded good-first-issues (labels only; that plan is not reopened).

## Risks and open questions

| # | Risk / question | Disposition |
|---|---|---|
| 1 | A fast-lane PR that looks content-only actually touches routing, a `When NOT to Use` addition can shift collision behavior | REQ-2 explicitly excludes anything touching routing; `CONTRIBUTING.md` instructs re-running `check-new-skill-collision.mjs` before merge regardless of lane |
| 2 | The scaffold script misjudges PATCH vs MINOR | REQ-3: the script only proposes a diff; a human always reviews and commits |
| 3 | How wide should the initial taxonomy be: A) only the four named types (description, WNTU, craft-note, heading), B) also small `TEMPLATE.md`/`EXAMPLE.md` wording clarifications, C) also sample-library additions | **Recommend A** for the first release of the lane; expand to B once a few PRs have run cleanly through it; C stays out permanently for now, samples carry their own manifest and coverage gate, a heavier weight than a fast lane implies |
| 4 | Does a maintainer-invoked, not auto-triggered, script meaningfully help, since the maintainer still runs it by hand | Yes, for this bet's actual target: the barrier removed is the contributor's need to touch manifest and HISTORY machinery, not the maintainer's per-PR review time, which the audit's own scoring, Moat: none, already accepts as the tradeoff |
| 5 | The lane itself competes for the same solo-maintainer review hours the bus-factor finding names as the underlying risk | Accepted as the honest cost of this bet; the scaffold script (REQ-3) is sized specifically to keep that per-PR review small, a diff to confirm, not a build to do |

## Promotion trigger and path

No external trigger gate; buildable directly once prioritized. The natural home is alongside, or immediately following, v2.30.0's WS-T6 good-first-issue seeding, so the issues and the lane that makes them tractable ship close together. Promote by ratifying the taxonomy-width decision above (recommend option A), filing the confirmed M-ID, and drafting a one-page spec seeded from this document's Requirements section.

## Notes

- DRAFT for maintainer review. The taxonomy-width decision (open question 3) is the one choice worth ratifying before Phase 1 starts; everything else is buildable as written.
- Companion documents in this same batch: `X-07-context-cost-transparency.md`, `X-08-zero-drift-releases.md`, `X-09-validator-toolchain-product.md`.
- Source is the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-10) and section 6c (score).
