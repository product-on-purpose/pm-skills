# X-09 Validator toolchain product (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision) | **Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-09) and section 6c (prioritization)
**Candidate formal ID at promotion:** no ID filed pre-trigger; on trigger, a provisional M-ID confirmed against the GitHub issue list (illustrative next-available: M-38, unconfirmed)
**Audit score (6c):** Bar 1 / Moat 3 / Effort(inv) 1 = 5/9

---

## Summary

pm-skills already carries a genuinely battle-tested CI layer: single-source Node validators for frontmatter linting, description quality, reciprocal boundary pointers, the trigger-fixture contract, and count consistency, all proven across dozens of releases against a real 68-skill catalog. The audit names the natural next move: extract that layer into a reusable package, working name `skills-ci`, that any skill repo could adopt. This operationalizes the maintainer-local June roadmap's portfolio-CI standard, cited by the audit as pillar G5, pointed outward instead of inward. If it works, pm-skills stops being just a well-run library and becomes infrastructure the ecosystem's quality layer depends on.

The audit is equally clear about the catch: this is Effort L for a Moat that is real but currently theoretical, and the honest gate is that extraction should wait for a second consumer repo to exist. Building a generalized package against zero external demand is speculative work that would also compete for the same maintainer hours the audit's bus-factor finding (P1-4, 95.6% of commits from one person, zero external contributors) already flags as the project's most acute risk. This document is therefore deliberately two-thirds readiness work and one-third staged, trigger-gated build: it defines what "extractable" means, inventories which validators qualify today, sketches the config layer real portability would need, and names the trigger precisely so the maintainer recognizes it when it appears rather than debating it retroactively.

## Relationship to existing plans

- **Rides the dual-shell port, does not duplicate it.** v2.30.0's WS-T9 (dual-shell containment, [`plan_v2.30.0.md`](../../v2.30.0/plan_v2.30.0.md)) freezes new `.sh`/`.ps1` pairs and builds the equivalence-smoke fixture tree; v2.31.0's WS-Z4 (dual-shell port wave 1, [`plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md)) ports `check-count-consistency` and `validate-skill-family-registration` to single-source `.mjs`. Per the framing behind this bet, only ported validators are extractable, so X-09's realistic candidate list grows exactly as WS-Z4, and later waves, land; this document names candidates but does not re-scope the port itself.
- **Cites, does not restate, the maintainer-local June roadmap's portfolio-CI standard** (referenced by the audit as pillar G5; that roadmap document is gitignored and is not linked here).
- **No relationship to X-07 or X-08** (different properties); no relationship to the parked memory plan.

## Spec

### Scope

**In scope (all pre-trigger readiness work):**
- A precise definition of "extractable."
- A candidate inventory of today's validators against that bar, with a portability gap noted per candidate.
- A design sketch of the configuration surface a repo-agnostic version would need, since pm-skills' validators today assume fixed things: a `skills/` directory name, the phase-XOR-classification frontmatter invariant, specific field names.
- A precise, written trigger definition.

**Out of scope (staged, not built until the trigger fires):**
- Actually scaffolding, naming, licensing, or publishing a package.
- Any change to an existing validator's behavior inside pm-skills as part of this document's scope; extraction is a generalize-and-copy operation, never an in-place rewrite that could regress pm-skills' own CI.
- Committing pm-skills itself to consume the extracted package, a later, separate dogfooding step, itself staged.

### Requirements

| ID | Requirement |
|---|---|
| REQ-1 | A written "extractability bar": a validator qualifies once it is single-source `.mjs` with a `.test.mjs`, carries no shell twin, and has at least one identified configuration point, a hardcoded pm-skills assumption a generic config file could instead supply. |
| REQ-2 | A candidate inventory table, starting from the audit's own named five (frontmatter lint, description quality, reciprocity, the trigger-fixture contract, count consistency), recording per candidate: current form (dual-shell or already `.mjs`-only), whether it meets REQ-1's bar today, and its known pm-skills-specific assumptions. |
| REQ-3 | A design sketch, not an implementation, of a `skills-ci.config.{json,mjs}` surface a consuming repo would author, naming at minimum: the skills directory path, the required frontmatter fields, the classification and phase taxonomy values, and the description word-count bounds. |
| REQ-4 | A single, written trigger definition: extraction work begins only when a second repo, inside or outside the `product-on-purpose` org, is confirmed actually running at least one of these validators against its own skill directory in its own CI, not merely expressing interest. A dated log entry records if and when this fires. |
| REQ-5 | No behavior change to any shipped pm-skills validator as a side effect of this document's scope; a violation of this is a defect in execution, not a design choice. |

### Candidate inventory (illustrative, REQ-2)

Verified against the current `scripts/` tree; this is a starting point, not a locked list, and it grows as v2.31.0's WS-Z4 ports more validators to single-source `.mjs`.

| Validator (maps to the audit's named five) | Current form | Meets REQ-1 today | Known pm-skills-specific assumption |
|---|---|---|---|
| `lint-skills-frontmatter` (frontmatter lint + description quality) | dual-shell (`.sh`/`.ps1`/`.md`) | No, needs a WS-Z4-style port first | Assumes the agentskills.io field set plus pm-skills' own phase-XOR-classification invariant |
| `check-reciprocal-boundary-pointers` (reciprocity) | `.mjs`-only already | Close, needs the REQ-3 config-point audit | Assumes the exact "When NOT to Use" heading spelling and the in-code collision-pair data shape |
| `check-trigger-fixtures` (trigger-fixture contract) | `.mjs`-only already | Close, needs the REQ-3 config-point audit | Assumes the `evals/trigger-fixtures.json` schema and a roster (the roster itself is mid-externalization under v2.30.0's WS-T10) |
| `check-count-consistency` (count consistency) | dual-shell today; the named WS-Z4 port target | No until ported | Assumes the phase/foundation/utility/tool classification taxonomy by name |

### Interfaces

Config-surface sketch (illustrative only, not implemented until the trigger fires):

```json
{
  "skillsDir": "skills",
  "requiredFrontmatter": ["name", "description", "license", "metadata.version"],
  "classificationField": "metadata.classification",
  "classificationValues": ["phase", "foundation", "utility", "tool"],
  "descriptionWordBounds": [20, 100]
}
```

### Durable CI block

None shipped by this document. This is a design and readiness artifact, not an executable workstream; no new validator, generator, or CI step is introduced. Post-trigger CI implications, pm-skills switching its own invocation from a local script call to a package-consumer call, are named in Implementation plan Phase 4 as staged, not built here.

### Non-goals

Not a rewrite of any validator's logic. Not a decision on package name, license, or registry, parked as an open question below. Not a commitment that extraction ever happens; the trigger may never fire, and that is an acceptable outcome, not a failure of this document.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 0 | Confirm v2.31.0 WS-Z4 has landed, producing the first two `.mjs`-only candidates | agent:human | S | v2.31.0 WS-Z4 |
| 1 | Write the candidate-inventory and extractability-bar note (REQ-1, REQ-2) | agent:claude | S | none |
| 2 | Read-only audit pass: document config points in the ported validators without changing their behavior (REQ-3, REQ-5) | agent:codex | S | Phase 0 |
| 3 | Park; monitor for the trigger (REQ-4); record a dated log entry when checked | agent:human | S, ongoing | Phase 1, 2 |
| 4 | Staged, on trigger: scaffold the package, generalize the config surface, publish | agent:codex build, agent:human decides name, license, registry | L | REQ-4 firing |
| 5 | Staged: pm-skills itself adopts the extracted package for its own CI, retiring the in-repo copies | agent:codex | M | Phase 4 |

### Test strategy

Pre-trigger: none needed; this phase produces a design note, not code. Post-trigger, staged, named for completeness and not committed now: the extracted package carries its own per-validator test suite; pm-skills' `validation.yml` steps move from `node scripts/<check>.mjs` to a package-consumer invocation, proven equivalent against the existing fixture corpus before the in-repo copies are retired.

## Release surfaces touched

Pre-trigger: a design note under `docs/internal/`; no script, no CI change, no skill content change. Post-trigger, staged, out of this document's committed scope: a new package or sibling repo, a `package.json` devDependency in pm-skills, and a rewritten invocation form in `.github/workflows/validation.yml`.

## Risks and open questions

| # | Risk / question | Disposition |
|---|---|---|
| 1 | Extracting before a real second consumer produces speculative abstraction nobody validates | Mitigated by REQ-4's hard trigger gate; no package is built pre-trigger |
| 2 | Adding a config-abstraction layer to pm-skills' own validators for a hypothetical future consumer adds indirection today | Phase 2 is read-only documentation, not a refactor, until the trigger fires |
| 3 | Extraction work competes for the same solo-maintainer hours the audit's bus-factor finding already flags as the top risk | The trigger gate is the mitigation: this bet spends zero build hours until external demand is confirmed real |
| 4 | Package identity once triggered: A) a published scoped npm package (`@product-on-purpose/skills-ci`), B) a git-dependency-only repo with no npm publish, C) a documented template repo inside the `product-on-purpose` org | **Recommend B** initially: lowest commitment, easiest to reverse, proves adoption before investing in publish and registry maintenance; A is the natural follow-on once a second and third consumer both prove out |

## Promotion trigger and path

The single trigger is REQ-4: a second consumer repo confirmed actually running at least one validator in its own CI. On that event, file a formal effort ID, a provisional M-number confirmed against the GitHub issue list, since M-35 (the v2.30.0 trust-repair sweep) and M-36 (the v2.31.0 zero-drift generated-surfaces effort) are already claimed, and use this document's Requirements section as the spec seed for that effort.

## Notes

- DRAFT for maintainer review. Most of this document's value is the trigger definition and the extractability bar; treat the candidate inventory as a living note, not a locked list.
- Companion documents in this same batch: `X-07-context-cost-transparency.md`, `X-08-zero-drift-releases.md`, `X-10-contribution-fast-lane.md`.
- Source is the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-09) and section 6c (score).
