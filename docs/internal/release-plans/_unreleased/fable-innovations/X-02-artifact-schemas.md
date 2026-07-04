# X-02 Artifact schemas: machine-readable output contracts (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-2 (machine-readable artifact contracts)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 2 / 3 / 1 = 6 of 9. Audit's note: "foundation for orchestration and spec leadership."
**Companion docs:** [`docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md) (WS-Z8, the staged typed-handoff workstream this bet unblocks) and [`docs/internal/release-plans/v2.27.0/records/output-eval-informed-20260615.md`](../../v2.27.0/records/output-eval-informed-20260615.md) (the structure-first finding this bet extends)

---

## Summary and why it wins

Today every skill's output contract is prose plus a `TEMPLATE.md`. Add a JSON Schema, or an equivalent structured contract, per artifact type, starting with three families: a PRD schema (for `deliver-prd`), an OKR-set schema (for `foundation-okr-writer`), and an experiment-design schema (for `measure-experiment-design`). These three are chosen because a PRD is the highest-traffic artifact in the catalog, an OKR set has the clearest enumerable structure (objectives, key results, a scoring convention), and an experiment design has the strongest typed numeric fields, a hypothesis, a metric, a sample size, that benefit most from schema validation rather than prose review alone.

Three payoffs follow directly, named in the audit itself. First, a deterministic artifact linter, `pm-lint`, can validate any produced artifact against its schema, something no prose checklist can do. Second, the schema becomes a typed edge for the workflow orchestrator: the optional `## Handoff` block staged in the parallel [`v2.31.0` plan](../../v2.31.0/plan_v2.31.0.md) (workstream WS-Z8) stops being a convention and becomes a checkable interface once a schema exists to check it against. Third, publishing the schema convention as a proposed extension to the agentskills.io specification converts "pm-skills follows the spec" into "pm-skills co-authors the spec," a credible upstream contribution rather than a private convention.

Why it wins: structure-first is already the library's proven value. The v2.27.0 informed-control output-quality study found that a template-only arm tied or beat the full skill (instructions plus template) in all four tested cases, meaning the measured value for these PM artifact types sits in the section template, not the added prose rigor. A machine-checkable schema is the most literal possible expression of "the template is where the value lives," so this bet compounds an already-validated finding rather than opening a new one.

The audit's own framing bears repeating precisely, because it sets this bet's ceiling: pm-skills already treats structure as a spec-conformant asset (the agentskills.io frontmatter contract, the phase-XOR-classification invariant, the per-skill SemVer). A JSON Schema per artifact type is the same discipline applied one level deeper, from "the skill definition is structured" to "the skill's OUTPUT is structured and checkable." Nothing else in the field's competitive landscape has attempted this, per the audit's own scan; it is a genuinely open lane, not a race already underway.

## Relationship to existing plans

No item in `docs/internal/roadmap.md` (F-43 through F-53, M-25 through M-29) proposes schemas. The nearest adjacent roadmap item is F-47 (`userConfig` house template, unshipped), which personalizes artifact VALUES, house terminology, team defaults; the audit's own X-4 write-up (org overlay packs, out of scope here) draws the distinction that overlays personalize STRUCTURE where `userConfig` personalizes values. X-02 is the substrate a future overlay mechanism would eventually validate against, not a duplicate of F-47's scope.

The load-bearing relationship is with the parallel [`v2.31.0` plan](../../v2.31.0/plan_v2.31.0.md). Its staged workstream WS-Z8 (typed handoff envelope, R-23) names its OWN promotion trigger as: the X-2 artifact-schema direction is ratified, meaning a schema exists for at least one family. That makes X-02 upstream of WS-Z8, not downstream of it. WS-Z8 cannot promote until this bet ships at least one real schema. This is the single most important sequencing fact in this document: if the maintainer wants the typed-handoff workstream to land on its targeted v2.32.0-plus horizon, this bet's Phase 2 (below) needs to ship first, which changes this bet's priority calculus from "someday" to "on WS-Z8's critical path."

v2.30.0 (trust repair) has no direct relationship to this bet. The parked `docs/internal/release-plans/_unreleased/project-memory/` plan's B2 cohort carries loosely-typed provenance tags (observation, interpretation, hypothesis, decision) on memory entries, a precedent for structured metadata, but it is not a schema and does not overlap this bet's scope; X-03 (artifact provenance, the sibling document in this same set) integrates with memory more directly than X-02 does.

## Spec

### Scope in

- JSON Schema (a current draft such as 2020-12, matching common tooling) for exactly three artifact types at v1: PRD, OKR set, experiment design.
- A `pm-lint` CLI validator that checks a produced artifact against its matching schema.
- A schema-authoring convention: where schemas live (`skills/<name>/references/output.schema.json`) and how a skill declares which schema governs it, a new, optional frontmatter field.
- A candidate agentskills.io spec-extension write-up, an output-contract proposal, offered upstream, not a unilateral change.

### Scope out

- Retrofitting all 68 skills with schemas in one pass; start with three, expand family by family, per the audit's own suggested later-horizon sequencing.
- Enforcing schema conformance as a blocking gate at generation time; an LLM writing Markdown prose cannot be forced to emit schema-valid output without restructuring how skills produce artifacts, so v1 lints AFTER the fact, on a saved artifact, opt-in.
- Rewriting existing `TEMPLATE.md` files to become the schema; the schema is a companion contract, not a replacement for the prose template and worked example.

### Requirements

- **REQ-1.** Each in-scope artifact type has a JSON Schema co-located with its owning skill, covering the artifact's required sections and fields as enumerable, typed constraints; prose-quality judgment stays the skill's own Quality Checklist, never re-litigated in the schema.
- **REQ-2.** The schema must be derivable directly from the skill's existing `TEMPLATE.md` section order, documenting the template rather than inventing new structure.
- **REQ-3.** `pm-lint` runs against a produced artifact file and reports pass or fail per required field or section with a line-referenced diagnostic, mirroring how `lint-skills-frontmatter` reports per-file findings today.
- **REQ-4.** `pm-lint` runs standalone, a user validating their own saved artifact, and as an optional eval step, where a schema-valid check can join M-33's discrimination gap and inter-judge agreement as a fourth, deterministic validity signal.
- **REQ-5.** The schema format is written up as a candidate agentskills.io extension proposal, an output-contract addition, not kept as a private pm-skills-only convention, consistent with the audit's framing of co-authoring the spec rather than only following it.
- **REQ-6.** Adding a schema to a skill is an additive change, a new `references/` file plus a frontmatter pointer field, taking the standard MINOR bump and a `HISTORY.md` row per `docs/internal/skill-versioning.md`; it must never retroactively invalidate an artifact produced before the schema existed.
- **REQ-7.** Each v1 schema validates against at least one real existing library sample for its family, drawn from `library/skill-output-samples/`, proving the schema does not reject the library's own reference output.
- **REQ-8.** The schema file carries its own `schema_version` field, independent of the owning skill's `metadata.version`, so a structural change to the skill's template (rare, and itself a MAJOR-shaped event under `docs/internal/skill-versioning.md`'s own compatibility test) is distinguishable from a MINOR schema clarification that does not change the skill's contract. This keeps a future provenance stamp (see X-03, the sibling document in this set) able to record exactly which schema version validated a given artifact, not just which skill version produced it.

### Interfaces and contracts

Schema location: `skills/<name>/references/output.schema.json`. A skill opts in via an additive frontmatter field, for example:

```yaml
metadata:
  output_schema: output.schema.json
```

Absent means no schema is declared; not all skills need one at once. Illustrative schema fragment for `deliver-prd` (trimmed, not the final schema):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "pm-skills PRD output contract",
  "schema_version": "1.0.0",
  "type": "object",
  "required": ["problem_statement", "success_metrics", "scope"],
  "properties": {
    "problem_statement": { "type": "string", "minLength": 1 },
    "success_metrics": { "type": "array", "minItems": 1, "items": { "type": "string" } },
    "scope": {
      "type": "object",
      "required": ["in", "out"],
      "properties": {
        "in": { "type": "array", "items": { "type": "string" } },
        "out": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

`pm-lint` CLI shape: `node scripts/pm-lint.mjs --skill=deliver-prd --artifact=<path>`. Orchestrator-facing: this is explicitly the substrate for WS-Z8's future `## Handoff` block; a handoff field can reference `output_schema` to type-check what it hands off, once WS-Z8 itself promotes.

### Durable CI block

`scripts/pm-lint.mjs` plus `scripts/pm-lint.test.mjs`: single-source Node, unit-tested against fixture artifacts, a valid PRD and a deliberately broken one missing a required section. Deterministic, no model calls, a clean CI candidate from day one. A second check, `check-schema-validity.mjs` (plus test), validates that the schema FILES themselves are well-formed JSON Schema, not that artifacts conform to them; this one starts advisory and promotes to enforcing once a fourth family adopts a schema, proof the convention generalizes, with a dated rationale per the repo's advisory-then-enforcing convention.

Both new checks are pure Node with no shell counterpart. Per `scripts/validation-manifest.yaml`'s own stated scope (the 26 dual-shell pairs), they follow today's Node-only pattern: a step in `.github/workflows/validation.yml`, no manifest entry, unless the v2.31.0 zero-drift generator work has by then extended the manifest's remit to Node validators generally. Confirm scope at build time. Both-legs wiring is a step inside the existing `matrix.os: [ubuntu-latest, windows-latest]` job, which already runs every step on both legs with no OS-specific variant required, though the repo's awk-fragility lesson argues for actually proving cross-OS behavior rather than assuming pure Node is automatically safe.

### Non-goals

Not a runtime type system for LLM generation; the model still writes prose, the schema checks the saved artifact afterward. Not a rewrite of the catalog's `TEMPLATE.md` files. Not a unilateral change to agentskills.io; a proposal, not a merge.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Schema-authoring convention doc; frontmatter field; pick JSON Schema draft + validation library | agent:claude | S | none |
| 2 | Author the 3 v1 schemas against each skill's TEMPLATE.md; validate against a real sample per REQ-7 | agent:claude + agent:codex | M | Phase 1 |
| 3 | Build `pm-lint.mjs` + tests + the schema-validity check; wire into `validation.yml` | agent:codex | M | Phase 2 |
| 4 | Write the agentskills.io spec-extension proposal doc | agent:claude | S | Phase 2 |
| 5 | Decide whether and when to open the upstream proposal | agent:human | S | Phase 4 |

Phase 2 is the priority phase for sequencing: it is the one WS-Z8 (v2.31.0, staged) is waiting on, so if the maintainer wants that workstream to land on schedule, Phase 2 cannot slip behind Phases 3 and 4, which can proceed in parallel or after.

Test and eval strategy: unit tests for `pm-lint` run against fixture artifacts, one valid, one deliberately broken, and are CI-blocking. An output-eval scenario in the M-33 lane gains an optional fourth validity gate, "schema-valid," for the three covered families, recorded as informational, not a hard release blocker, mirroring how the discrimination and agreement gates already behave.

Dependency note: this bet has no blocking dependency on v2.30.0 or v2.31.0 and can start independently. The dependency runs the other direction: WS-Z8 depends on this bet's Phase 2 output.

## Release surfaces touched (G2 delta)

At PARKED status: none. At promotion, the delta is additive only: three new `references/output.schema.json` files plus three frontmatter fields, MINOR bumps and `HISTORY.md` rows on `deliver-prd`, `foundation-okr-writer`, `measure-experiment-design`, two new scripts with tests, an optional new site page for the spec-extension proposal, and an automatic `docs/RESOURCES.md` regen that picks up the new files.

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | Schema strictness | B, lenient at v1 | OPEN |
| OQ-2 | Where `pm-lint` sits in the release gate | A, advisory in the eval lane | OPEN |
| OQ-3 | Schema currency when `TEMPLATE.md` changes | A, same-PR update required | OPEN |

**OQ-1 (schema strictness).** A) strict: reject any artifact missing any declared field. B) lenient: check only the required top-level sections, allow free-form subsections. **Recommend B** for v1: the point is to support the skill's prose-first nature, not fight it; tighten later, family by family, once the convention has proven itself.

**OQ-2 (release-gate placement).** A) `pm-lint` becomes a full pre-tag validator like any other, blocking. B) it stays an advisory step in the eval lane only. **Recommend B** initially: forcing all roughly 230 existing library samples to pass schema validation on day one risks a big-bang failure across the whole corpus; ramp family by family as REQ-4 already implies.

**OQ-3 (schema currency).** A skill's `TEMPLATE.md` can gain a MINOR section after its schema already shipped. A) require the schema update to land in the SAME pull request as the template change, enforced by a lightweight file-touch correlation check (a CI step that flags a `TEMPLATE.md` diff with no matching `output.schema.json` diff in the same PR). B) allow the schema to lag; `check-schema-validity.mjs` only checks the schema file's own well-formedness, never its currency against the template. **Recommend A**: a stale schema is worse than no schema, because it silently validates artifacts against a contract the skill has already moved past.

Additional risks: schema drift from the template it was derived from is mitigated by REQ-2 (derive, don't invent) plus OQ-3's recommended file-touch correlation check. If agentskills.io does not accept the extension, the schema convention remains useful internally regardless; the proposal is framed as a bonus outcome, not a dependency of this bet's own value.

## What changes if this ships

An artifact stops being "prose the skill wrote" and becomes "prose the skill wrote, plus a machine-checkable proof it has the right shape." A user, a CI pipeline, or another skill can ask "is this a valid PRD" and get a deterministic yes or no, not a re-read. The workflow orchestrator gains its first real typed interface (via WS-Z8) instead of a documented convention nobody can check. And the project gains a genuine, citable claim to spec leadership: "pm-skills proposed the agentskills.io output-contract extension," which reads very differently from "pm-skills follows the agentskills.io specification."

## Promotion trigger and path

A GitHub issue can open independent of any other train, since this bet has no blocking dependency. The issue becomes an effort brief, a candidate M-3x ID given its tooling and validator shape, in the lineage of the eval-program M-IDs, though an F-series ID is also defensible given the roadmap-adjacent, spec-leadership framing; confirm the free number and the right series against the GitHub issue list and `backlog-canonical.md` per the ID rule at `docs/internal/roadmap.md` section 7 at filing time. The effort brief slots into a release plan sequenced before WS-Z8's own promotion if the maintainer wants the typed-handoff workstream to land on its targeted horizon.
