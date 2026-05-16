---
title: Foundation Sprint Skills Contract
description: Canonical v0.2.0 contract for the 7 tool-foundation-sprint-* skills. Shared frontmatter, naming convention, file anatomy, Decider Checkpoint requirement, library samples with version-tiered coverage, and enforcement rules validated by CI.
---

**Status**: Canonical (enforced by CI)
**Version**: 0.2.0
**Applies to**: `tool-foundation-sprint-readiness`, `tool-foundation-sprint-brief`, `tool-foundation-sprint-basics`, `tool-foundation-sprint-differentiation`, `tool-foundation-sprint-approach-options`, `tool-foundation-sprint-magic-lenses`, `tool-foundation-sprint-founding-hypothesis`
**Last updated**: 2026-05-15

**v0.2.0 changes from v0.1.0** (all from 2026-05-15 Codex adversarial review acceptance):
- Library sample requirements made version-tiered (F32): v0.1.0 requires Brainshelf; v1.0.0 requires all 3 threads. With this v0.2.0 contract the FS family ships Brainshelf + Storevine + Workbench (24 samples).
- Frameworks metadata field clarified as subset (F13): `foundation-sprint` REQUIRED; `click` + `character-note-and-vote` present when the skill body draws on those sources. Previously the example implied a fixed 3-element list.
- CI enforcement list reorganized to separate family-level checks from per-member checks (F10); validator coverage gaps explicitly documented for future v0.3.0/v1.0.0 promotion.

---

## What this document is

This is the shared behavioral and structural contract that governs all 7 skills in the pm-skills Foundation Sprint family. It defines what they have in common: the frontmatter they emit, the directory and file naming they use, the Decider Checkpoint pattern they all enforce, the library sample requirements they each meet, and the relationship between the family and the broader pm-skills tool classification.

Individual `SKILL.md` files implement the per-skill behavior (what they produce, how their process differs); this document defines what they share. A skill in this family is not conforming to the family unless it conforms to this contract.

**Enforcement**: the `scripts/validate-foundation-sprint-skills-family.sh` validator (and its PowerShell parity) runs against every PR touching `skills/tool-foundation-sprint-*/` and fails the build if the contract is violated.

## Why a family contract exists

The Foundation Sprint is a workshop methodology with a fixed two-day arc. The 7 skills implement the 7 canonical moves of that arc. If each skill were implemented independently, the family would drift: differentiation might omit the Decider Checkpoint, founding-hypothesis might use a different frontmatter shape, readiness might not reference the canonical Knapp/Zeratsky sources. The family contract makes the shared surface explicit and enforceable so the skills compose cleanly across a real sprint and across the library samples that demonstrate them.

The contract also makes the family's relationship to the broader `classification: tool` taxonomy explicit. Tool skills represent named external methodologies; the foundation-sprint family is the first inhabitant of that lane.

---

## The 7 skills at a glance

| Skill | Move | Timebox | Day-and-section |
|---|---|---|---|
| `tool-foundation-sprint-readiness` | `readiness` | 30-45 min | Pre-sprint |
| `tool-foundation-sprint-brief` | `brief` | 45-60 min | Pre-sprint |
| `tool-foundation-sprint-basics` | `basics` | 90-120 min | Day 1 morning |
| `tool-foundation-sprint-differentiation` | `differentiation` | 120-180 min | Day 1 afternoon |
| `tool-foundation-sprint-approach-options` | `approach-options` | 60-90 min | Day 2 morning |
| `tool-foundation-sprint-magic-lenses` | `magic-lenses` | 90-120 min | Day 2 afternoon |
| `tool-foundation-sprint-founding-hypothesis` | `founding-hypothesis` | 30-45 min | Day 2 end |

All 7 are classified `tool` (the methodology-bound classification added 2026-05-13), with `metadata.tool: foundation-sprint`.

### How they chain

The canonical Foundation Sprint arc:

```
readiness  ->  brief  ->  basics  ->  differentiation  ->  approach-options  ->  magic-lenses  ->  founding-hypothesis
   (prep)     (prep)    (Day 1 AM)    (Day 1 PM)         (Day 2 AM)            (Day 2 PM)         (Day 2 end)
```

Each step's bundled output becomes the next step's primary input. `metadata.prerequisites` in each SKILL.md lists the upstream skills whose outputs the skill expects (advisory, not enforced by validator).

`tool-note-and-vote` is invoked many times throughout the arc at decision moments. It is not a family member; it is a standalone tool referenced inline by family-member SKILL.md files.

### Cross-family note: Foundation-to-Design transition

There is no bridge skill in this family. When a Foundation Sprint's Founding Hypothesis is the input to a downstream Design Sprint, the handoff is narrative content in `_workflows/foundation-to-design.md` and in `docs/guides/using-foundation-sprint.md`. Canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills does not invent one.

---

## Frontmatter contract

Every family-member SKILL.md MUST emit the following frontmatter shape. The split between root-level fields and metadata-nested fields is intentional and enforced.

### Root-level fields (required)

```yaml
name: tool-foundation-sprint-<move>
description: <one-line description with Use-when triggers; 20-100 words>
classification: tool
version: "X.Y.Z"
updated: YYYY-MM-DD
license: Apache-2.0
```

Root-level fields are universal pm-skills frontmatter. `phase` is NOT permitted on tool-classified skills (mirrors foundation/utility behavior).

### Metadata-nested fields (required unless otherwise noted)

```yaml
metadata:
  tool: foundation-sprint
  move: <kebab-case move identifier; see "The 7 skills at a glance" table>
  category: <see docs/reference/categories.md>
  frameworks: <subset of [foundation-sprint, click, character-note-and-vote]; foundation-sprint REQUIRED; click present when the skill draws on Click book content; character-note-and-vote present when the skill body uses the note-and-vote mechanic>
  timebox_minutes: <integer; per spec timebox>
  roles: <array of: facilitator, decider, pm, design, engineering, researcher, customer-expert, whole-team>
  prerequisites: <array of skill names; optional; semantics defined below>
  inputs: <array of input artifacts the skill consumes>
  outputs: <array of output artifacts the skill produces>
  author: product-on-purpose
```

### Prerequisite semantics

The `metadata.prerequisites` array lists recommended-but-not-required upstream skills. The family validator does NOT block invocation when prerequisites are missing. The skill body documents what happens when a prerequisite output is absent (typically: skill prompts the user to confirm equivalent context). Multi-prerequisite cases (e.g., readiness OR equivalent context) are captured as an array of all valid upstream skill names; the skill body explains the OR logic in its "When to use" section.

---

## Naming convention

| Layer | Pattern |
|---|---|
| Directory | `skills/tool-foundation-sprint-{move}/` |
| SKILL `name` field | Matches directory name |
| Slash command | `/tool-foundation-sprint-{move}` |
| Library sample directory | `library/skill-output-samples/tool-foundation-sprint-{move}/` |
| Library sample filename | `sample_tool-foundation-sprint-{move}_{thread}_{scenario}.md` |

The `{move}` token always matches `metadata.move` exactly. The validator enforces this.

---

## File anatomy

Every family-member skill directory MUST contain three files:

```
skills/tool-foundation-sprint-<move>/
  SKILL.md
  references/
    TEMPLATE.md
    EXAMPLE.md
```

- **SKILL.md** contains the skill body: when to use, when NOT to use, zero-friction execution flow, common pitfalls, Decider role guidance, references to canonical sources.
- **TEMPLATE.md** contains the skeleton of the bundled output the skill produces. Every TEMPLATE.md MUST end with a `## Decider Checkpoint` section (see below).
- **EXAMPLE.md** contains a single fully-filled instance of the template. Use the Brainshelf, Storevine, or Workbench thread from the library samples; pick the strongest match per skill.

---

## Decider Checkpoint requirement

Every TEMPLATE.md in this family MUST end with a `## Decider Checkpoint` section. The validator enforces:

1. The literal heading `## Decider Checkpoint` (any level 1-6 hash count) is present.
2. The section appears in the last 25% of TEMPLATE.md (positionally near the end).

The Decider Checkpoint section captures the explicit sign-off that closes that move's contribution to the sprint. Without it, the team can complete the move's activities without committing to the output, and the sprint loses decision discipline.

Recommended Decider Checkpoint structure:

```markdown
## Decider Checkpoint

**Decider sign-off required before [next move].**

- [ ] [First explicit confirmation, e.g., "Decider confirms target customer is specific enough to design for"]
- [ ] [Second explicit confirmation]
- [ ] [Third explicit confirmation]
- [ ] [Acknowledgement of constraints or what is being chosen against]

**Signed:** [Decider name and role], [ISO date and local time]
```

SKILL.md must reference the Decider Checkpoint at appropriate decision points in its instructions.

---

## Library sample requirements

Each family-member skill ships library samples in `library/skill-output-samples/tool-foundation-sprint-{move}/` following the canonical 3-thread structure:

| Thread | Scenario | Sample filename |
|---|---|---|
| Brainshelf | `book-catalog` | `sample_tool-foundation-sprint-{move}_brainshelf_book-catalog.md` |
| Storevine | `retail-direction` | `sample_tool-foundation-sprint-{move}_storevine_retail-direction.md` |
| Workbench | `debugging-toolchain` | `sample_tool-foundation-sprint-{move}_workbench_debugging-toolchain.md` |

**Coverage requirements by contract version:**

- **v0.1.0 (current; v2.15.0 ship target):** Brainshelf thread REQUIRED for all 7 family members. Storevine and Workbench threads RECOMMENDED. This matches the v2.11.0 meeting-skills-family precedent where the 3-thread arc was introduced incrementally; "functionally shippable" means the canonical Brainshelf arc exists end-to-end.
- **v1.0.0 (future):** All 3 threads REQUIRED for all family members. Promote when both Storevine and Workbench arcs are authored and the family validator can enforce the 3-thread check.

When a sample is authored, it MUST tell a coherent story across the 7-skill arc for its thread. The Brainshelf basics sample's customer becomes the Brainshelf differentiation sample's input; that differentiation becomes the Brainshelf magic-lenses input; and so on through the Founding Hypothesis. The same is true for Storevine and Workbench when those threads are completed.

---

## Zero-friction execution behavior

Every family-member skill is a single-invocation skill. When invoked, it reads whatever input is provided, runs the move's activities (potentially with inline `tool-note-and-vote` invocations), produces the bundled output described in its TEMPLATE.md, and ends with the Decider Checkpoint section requiring explicit sign-off.

The skill does NOT block on multi-turn interrogation. It does NOT require all inputs upfront. It does run an inference pass on missing context and surfaces inferences in the output so the Decider can correct them at checkpoint time.

---

## Versioning policy

Each family-member skill version is independent and follows pm-skills SemVer (`version:` in root frontmatter). The family contract itself has its own version (declared at the top of this document) and follows the same SemVer rules:

- **Patch** (0.1.0 to 0.1.1): clarifications, typo fixes, error message wording changes that do not alter validator behavior.
- **Minor** (0.1.0 to 0.2.0): new optional frontmatter fields, new optional checks, new family member added.
- **Major** (0.1.0 to 1.0.0): breaking frontmatter changes, removed required fields, changed enforcement of an existing check.

Validator behavior changes that affect ship-readiness are major-bumps.

---

## CI enforcement

| Validator | Scope |
|---|---|
| `scripts/validate-foundation-sprint-skills-family.sh` | Bash; runs on every PR touching `skills/tool-foundation-sprint-*/` |
| `scripts/validate-foundation-sprint-skills-family.ps1` | PowerShell parity; runs on every PR on Windows runners |
| `scripts/lint-skills-frontmatter.sh` and `.ps1` | Universal frontmatter checks (classification, version, license, etc.) |
| `scripts/validate-agents-md.sh` and `.ps1` | AGENTS.md sync (enumerates `skills/tool-*` directories automatically) |

The family validator enforces these checks once any skill is authored:

**Family-level (1 check):**
0. Canonical contract document (this file) exists at `docs/reference/skill-families/foundation-sprint-skills-contract.md`

**Per family member (6 checks):**
1. Directory contains SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md
2. SKILL.md classification is `tool`
3. SKILL.md `metadata.tool` is `foundation-sprint`
4. SKILL.md `metadata.move` matches the expected kebab-case identifier for the skill slug
5. SKILL.md references the canonical contract path (this document)
6. TEMPLATE.md contains a `Decider Checkpoint` section in the last 25% of the file

In scaffolding state (zero family skills authored), the validator exits 0 with notices. This permits the family contract to land before the first skill ships, mirroring the meeting-skills precedent.

**Validator coverage gap (v0.1.0):** the contract specifies additional clauses that the v0.1.0 validator does not enforce: full root-field and metadata-field shape checks (F1/F2 from the 2026-05-15 adversarial review), library-sample 3-thread coverage (F4; gated on the v0.1.0 -> v1.0.0 promotion), and prerequisite-fallback content shape (F6/F15). The universal `lint-skills-frontmatter` provides the floor for root-field shape; the gap is documented and scheduled for v2.16 validator expansion.

---

## Relationship to other families

| Family | Classification | Relationship |
|---|---|---|
| `foundation-sprint-skills` (this contract) | `tool` | Foundation Sprint methodology (7 skills) |
| `design-sprint-skills` | `tool` | Design Sprint methodology (7 skills); narrative handoff from this family |
| `meeting-skills` | `foundation` | Cross-cutting meeting artifacts (5 skills) |

The Foundation Sprint family produces a single coherent strategic artifact (the Founding Hypothesis). It does NOT compose with meeting-skills directly (a sprint is not a meeting). It does compose with the design-sprint-skills family via the narrative handoff documented in `_workflows/foundation-to-design.md`.

Future tool families (JTBD process, Double Diamond, Shape Up, etc.) would follow this contract's pattern: one classification value (`tool`), one family per named methodology, one validator pair per family, one contract per family.

---

## Change log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-05-14 | Initial contract authored alongside Foundation Sprint family scaffolding |
| 0.2.0 | 2026-05-15 | Codex adversarial review acceptance: library samples version-tiered (F32; v0.1.0 Brainshelf REQUIRED + Storevine/Workbench RECOMMENDED; v1.0.0 all 3 threads REQUIRED); `metadata.frameworks` clarified as subset semantics with `foundation-sprint` required (F13); CI enforcement list reorganized into family-level + per-member splits with explicit validator-coverage gap documentation (F10) |
