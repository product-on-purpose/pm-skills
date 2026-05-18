---
title: Design Sprint Skills Contract
description: Canonical v0.2.0 contract for the 7 tool-design-sprint-* skills. Shared frontmatter, naming convention, file anatomy, Decider Checkpoint requirement, library samples with version-tiered coverage, naming discipline (workshop sprints vs agile sprints), and enforcement rules validated by CI.
---

**Status**: Canonical (enforced by CI)
**Version**: 0.2.0
**Applies to**: `tool-design-sprint-readiness`, `tool-design-sprint-brief`, `tool-design-sprint-map-and-target`, `tool-design-sprint-sketch`, `tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-prototype-plan`, `tool-design-sprint-test-and-score`
**Last updated**: 2026-05-16

**v0.2.0 changes from v0.1.0** (from 2026-05-16 user-clarified naming discipline):
- Added Naming Discipline section codifying the qualified-naming style rule for "Design Sprint" vs bare "sprint" (which collides with agile / Scrum sprint terminology in PM contexts). Style guidance; not validator-enforced. Mirrors foundation-sprint-skills-contract.md v0.3.0.

---

## What this document is

This is the shared behavioral and structural contract that governs all 7 skills in the pm-skills Design Sprint family. It defines what they have in common: the frontmatter they emit, the directory and file naming they use, the Decider Checkpoint pattern they all enforce, the library sample requirements they each meet, and the relationship between the family and the broader pm-skills tool classification.

Individual `SKILL.md` files implement the per-skill behavior (what they produce, how their process differs); this document defines what they share. A skill in this family is not conforming to the family unless it conforms to this contract.

**Enforcement**: the `scripts/validate-design-sprint-skills-family.sh` validator (and its PowerShell parity) runs against every PR touching `skills/tool-design-sprint-*/` and fails the build if the contract is violated.

## Why a family contract exists

The Design Sprint is a workshop methodology with a fixed five-day arc (per Knapp/Zeratsky, GV). The 7 skills implement 7 canonical moves of that arc: 2 pre-sprint plus 5 day-bounded (Monday through Friday). If each skill were implemented independently, the family would drift: the Wednesday `decide-and-storyboard` skill might omit the Decider Checkpoint, `test-and-score` might use a different frontmatter shape, `readiness` might not reference the canonical Knapp/Zeratsky and Google Design Sprint Kit sources. The family contract makes the shared surface explicit and enforceable so the skills compose cleanly across a real sprint and across the library samples that demonstrate them.

The contract also makes the family's relationship to the broader `classification: tool` taxonomy explicit. Tool skills represent named external methodologies; the design-sprint family is the second inhabitant of that lane (alongside `foundation-sprint-skills`).

---

## The 7 skills at a glance

| Skill | Move | Timebox | Day-and-section |
|---|---|---|---|
| `tool-design-sprint-readiness` | `readiness` | 30-45 min | Pre-sprint |
| `tool-design-sprint-brief` | `brief` | 60-90 min | Pre-sprint |
| `tool-design-sprint-map-and-target` | `map-and-target` | 90-120 min | Monday |
| `tool-design-sprint-sketch` | `sketch` | 150-210 min | Tuesday |
| `tool-design-sprint-decide-and-storyboard` | `decide-and-storyboard` | 180-240 min | Wednesday |
| `tool-design-sprint-prototype-plan` | `prototype-plan` | 60-120 min | Thursday |
| `tool-design-sprint-test-and-score` | `test-and-score` | 240-300 min | Friday |

All 7 are classified `tool` (the methodology-bound classification added 2026-05-13), with `metadata.tool: design-sprint`.

### How they chain

The canonical Design Sprint arc:

```
readiness  ->  brief  ->  map-and-target  ->  sketch  ->  decide-and-storyboard  ->  prototype-plan  ->  test-and-score
   (prep)     (prep)       (Monday)        (Tuesday)       (Wednesday)               (Thursday)             (Friday)
```

Each step's bundled output becomes the next step's primary input. `metadata.prerequisites` in each SKILL.md lists the upstream skills whose outputs the skill expects (advisory, not enforced by validator).

`tool-note-and-vote` is invoked at multiple decision moments throughout the week (heat-map straw poll, supervote, sketch-assignment voting). It is not a family member; it is a standalone tool referenced inline by family-member SKILL.md files.

### Cross-family note: Foundation-to-Design transition

There is no bridge skill in this family. When a Foundation Sprint's Founding Hypothesis is the input to a downstream Design Sprint, the handoff is narrative content in `_workflows/foundation-to-design.md` and in both `docs/guides/using-foundation-sprint.md` and `docs/guides/using-design-sprint.md`. Canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills does not invent one.

The `tool-design-sprint-readiness` and `tool-design-sprint-brief` skills accept a Founding Hypothesis as optional input context but do not require a separate bridge artifact. When a Design Sprint runs standalone (no prior Foundation Sprint), the team supplies equivalent strategic context directly to `readiness`.

---

## Frontmatter contract

Every family-member SKILL.md MUST emit the following frontmatter shape. The split between root-level fields and metadata-nested fields is intentional and enforced.

### Root-level fields (required)

```yaml
name: tool-design-sprint-<move>
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
  tool: design-sprint
  move: <kebab-case move identifier; see "The 7 skills at a glance" table>
  category: <see docs/reference/categories.md>
  frameworks: <subset of [design-sprint, sprint, character-note-and-vote]; design-sprint REQUIRED; sprint present when the skill draws on Knapp/Zeratsky Sprint book content; character-note-and-vote present when the skill body uses the note-and-vote mechanic>
  timebox_minutes: <integer; per spec timebox>
  roles: <array of: facilitator, decider, pm, design, engineering, researcher, customer-expert, interviewer, whole-team>
  prerequisites: <array of skill names; optional; semantics defined below>
  inputs: <array of input artifacts the skill consumes>
  outputs: <array of output artifacts the skill produces>
  author: product-on-purpose
```

### Prerequisite semantics

The `metadata.prerequisites` array lists recommended-but-not-required upstream skills. The family validator does NOT block invocation when prerequisites are missing. The skill body documents what happens when a prerequisite output is absent (typically: skill prompts the user to confirm equivalent context). Multi-prerequisite cases (e.g., `readiness` OR equivalent context, or a Foundation Sprint Founding Hypothesis as an OR-equivalent of an in-flight design challenge) are captured as an array of all valid upstream skill names; the skill body explains the OR logic in its "When to use" section.

---

## Naming discipline (workshop sprints vs agile sprints)

The word "sprint" is overloaded in product management contexts. Most readers will assume "sprint" = agile / Scrum iteration cycle first; Foundation Sprint and Design Sprint are different methodologies (workshop sprints from Knapp/Zeratsky/Kowitz) that happen to share the word. To prevent reader confusion, this family contract codifies the following naming discipline for all pm-skills documentation that touches Design Sprint content:

1. **Always include the full method name on first reference per document.** "Design Sprint" on first mention; "the Design Sprint" or "your Design Sprint week" thereafter is acceptable but qualified forms are preferred.
2. **Prefer qualified terms over bare "sprint" in body prose.** "The Design Sprint week" beats "the sprint week"; "your Friday scorecard from the Design Sprint" beats "your scorecard from the sprint".
3. **Reserve bare "sprint" for agile / Scrum iteration context only.** When discussing agile sprints in pm-skills documentation, prefer "agile sprint" or "Scrum sprint" if there is any chance the surrounding context could be confused with workshop sprints.
4. **Cross-link to the disambiguation reference when reader confusion is likely.** Link to [`docs/concepts/workshop-sprints-vs-agile-sprints.md`](../../concepts/workshop-sprints-vs-agile-sprints.md) at the top of any doc that introduces Design Sprint to readers who may carry agile-sprint assumptions.

Rationale: pm-skills audience is PMs who work in agile environments AND use Knapp methodology. The word "sprint" is overloaded in their mental model. The naming discipline prevents readers from carrying agile-sprint assumptions into workshop-methodology content.

This rule is style guidance, NOT validator-enforced. Reviewers should flag bare "sprint" usage in PRs when context is ambiguous. The same discipline applies to the parallel [`foundation-sprint-skills-contract.md`](foundation-sprint-skills-contract.md) v0.3.0+.

---

## Naming convention

| Layer | Pattern |
|---|---|
| Directory | `skills/tool-design-sprint-{move}/` |
| SKILL `name` field | Matches directory name |
| Slash command | `/tool-design-sprint-{move}` |
| Library sample directory | `library/skill-output-samples/tool-design-sprint-{move}/` |
| Library sample filename | `sample_tool-design-sprint-{move}_{thread}_{scenario}.md` |

The `{move}` token always matches `metadata.move` exactly. The validator enforces this.

---

## File anatomy

Every family-member skill directory MUST contain three files:

```
skills/tool-design-sprint-<move>/
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

The Decider Checkpoint section captures the explicit sign-off that closes that day's contribution to the sprint. Without it, the team can complete the day's activities without committing to the output, and the sprint loses the decision discipline that distinguishes the Design Sprint from an open-ended workshop.

Recommended Decider Checkpoint structure:

```markdown
## Decider Checkpoint

**Decider sign-off required before [next move].**

- [ ] [First explicit confirmation, e.g., "Decider confirms the target moment is the right place to focus prototyping"]
- [ ] [Second explicit confirmation]
- [ ] [Third explicit confirmation]
- [ ] [Acknowledgement of constraints or what is being chosen against]

**Signed:** [Decider name and role], [ISO date and local time]
```

SKILL.md must reference the Decider Checkpoint at appropriate decision points in its instructions.

---

## Library sample requirements

Each family-member skill ships library samples in `library/skill-output-samples/tool-design-sprint-{move}/` following the canonical 3-thread structure:

| Thread | Scenario | Sample filename |
|---|---|---|
| Brainshelf | `book-catalog` | `sample_tool-design-sprint-{move}_brainshelf_book-catalog.md` |
| Storevine | `retail-direction` | `sample_tool-design-sprint-{move}_storevine_retail-direction.md` |
| Workbench | `debugging-toolchain` | `sample_tool-design-sprint-{move}_workbench_debugging-toolchain.md` |

**Coverage requirements by contract version:**

- **v0.1.0 (current; SHIPPED in v2.15.0):** Brainshelf thread REQUIRED for all 7 family members **as a release-gate requirement** (must exist in `library/skill-output-samples/` before the v2.15.0 tag was cut; shipped in Phase 5 of the integration plan). In-skill `references/EXAMPLE.md` files satisfy the per-skill family-validator check (which is structural, not coverage-based); the library-thread requirement is satisfied by Phase 5 sample authoring. Storevine and Workbench threads RECOMMENDED at v0.1.0 (full 3-thread coverage was authored in Phase 5 alongside Brainshelf during v2.15.0 execution to match FS family precedent). This matches the v2.11.0 meeting-skills-family and v0.1.0 foundation-sprint-skills-family precedents where the 3-thread arc was introduced incrementally; "functionally shippable" means the canonical Brainshelf arc exists end-to-end.
- **v1.0.0 (future):** All 3 threads REQUIRED for all family members AND the family validator enforces 3-thread coverage (currently a known coverage gap; see CI Enforcement section). Promote when both Storevine and Workbench arcs are authored and the family validator can enforce the 3-thread check.

When a sample is authored, it MUST tell a coherent story across the 7-skill arc for its thread. The Brainshelf readiness sample's challenge becomes the Brainshelf brief's input; that brief's recruiting profile becomes the cohort that shows up Friday in `test-and-score`; the Monday map's target moment becomes the prototype focus for Thursday's plan; and so on. The same is true for Storevine and Workbench when those threads are completed.

The samples ALSO continue the same company contexts used in the corresponding `tool-foundation-sprint-*` samples for each thread. This makes the library tell a complete FS-to-DS arc (without a separate bridge artifact) per company: Brainshelf's FS Founding Hypothesis feeds Brainshelf's DS readiness; Storevine continues; Workbench continues.

---

## Zero-friction execution behavior

Every family-member skill is a single-invocation skill. When invoked, it reads whatever input is provided, runs the day's activities (potentially with inline `tool-note-and-vote` invocations and inline references to craft activities done by the human team), produces the bundled output described in its TEMPLATE.md, and ends with the Decider Checkpoint section requiring explicit sign-off.

The skill does NOT block on multi-turn interrogation. It does NOT require all inputs upfront. It does run an inference pass on missing context and surfaces inferences in the output so the Decider can correct them at checkpoint time.

A note on the boundary between AI-mediated and craft activity: Tuesday's `sketch` skill structures the activity (lightning demos, four-step sketch protocol, individual silent sketching) but the sketches themselves are produced by individual humans. Thursday's `prototype-plan` skill plans the prototype build but does NOT build the prototype (build is craft work outside the skill's scope; this is decision 1 in the ratified-decisions table in the integration plan). Skill body content makes these boundaries explicit so the Decider knows what the skill ships versus what the team owns.

---

## Versioning policy

Each family-member skill version is independent and follows pm-skills SemVer (`version:` in root frontmatter). The family contract itself has its own version (declared at the top of this document) and follows the same SemVer rules:

- **Patch** (0.1.0 to 0.1.1): clarifications, typo fixes, error message wording changes that do not alter validator behavior.
- **Minor** (0.1.0 to 0.2.0): new optional frontmatter fields, new optional checks, new family member added, sample coverage tier promoted.
- **Major** (0.1.0 to 1.0.0): breaking frontmatter changes, removed required fields, changed enforcement of an existing check.

Validator behavior changes that affect ship-readiness are major-bumps.

---

## CI enforcement

| Validator | Scope |
|---|---|
| `scripts/validate-design-sprint-skills-family.sh` | Bash; runs on every PR touching `skills/tool-design-sprint-*/` |
| `scripts/validate-design-sprint-skills-family.ps1` | PowerShell parity; runs on every PR on Windows runners |
| `scripts/lint-skills-frontmatter.sh` and `.ps1` | Universal frontmatter checks (classification, version, license, etc.) |
| `scripts/validate-agents-md.sh` and `.ps1` | AGENTS.md sync (enumerates `skills/tool-*` directories automatically) |

The family validator enforces these checks once any skill is authored:

**Family-level (1 check):**
0. Canonical contract document (this file) exists at `docs/reference/skill-families/design-sprint-skills-contract.md`

**Per family member (6 checks):**
1. Directory contains SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md
2. SKILL.md classification is `tool`
3. SKILL.md `metadata.tool` is `design-sprint`
4. SKILL.md `metadata.move` matches the expected kebab-case identifier for the skill slug
5. SKILL.md references the canonical contract path (this document)
6. TEMPLATE.md contains a `Decider Checkpoint` section in the last 25% of the file

In scaffolding state (zero family skills authored), the validator exits 0 with notices. This permits the family contract to land before the first skill ships, mirroring the meeting-skills and foundation-sprint-skills precedents.

In partial state (between 1 and 6 of 7 skills authored), the validator emits a WARN by default and exits 0; passing `--strict` (Bash) or `-Strict` (PowerShell) elevates partial state to FAIL. CI invokes the validator with `--strict` at release tag time.

**Validator coverage gap (v0.1.0):** the contract specifies additional clauses that the v0.1.0 validator does not enforce: full root-field and metadata-field shape checks beyond classification (parallel to FS family's F1/F2 deferrals), library-sample 3-thread coverage (gated on the v0.1.0 to v1.0.0 promotion when Storevine and Workbench threads ship), and prerequisite-fallback content shape. The universal `lint-skills-frontmatter` provides the floor for root-field shape; the gap is documented and scheduled for v2.16 validator expansion (parallel to the FS family timeline).

---

## Relationship to other families

| Family | Classification | Relationship |
|---|---|---|
| `design-sprint-skills` (this contract) | `tool` | Design Sprint methodology (7 skills) |
| `foundation-sprint-skills` | `tool` | Foundation Sprint methodology (7 skills); narrative handoff to this family |
| `meeting-skills` | `foundation` | Cross-cutting meeting artifacts (5 skills) |

The Design Sprint family produces a single coherent validation artifact (the Friday scorecard plus the Decider's next-step memo) by running a five-day workshop against a sharply-framed challenge. It does NOT compose with meeting-skills directly (a sprint is not a meeting). It does compose with the foundation-sprint-skills family via the narrative handoff documented in `_workflows/foundation-to-design.md`.

Future tool families (JTBD process, Double Diamond, Shape Up, etc.) would follow this contract's pattern: one classification value (`tool`), one family per named methodology, one validator pair per family, one contract per family.

---

## Canonical sources

The Design Sprint family is built against the following canonical sources:

- Knapp, Jake; Zeratsky, John; and Kowitz, Braden. **Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days** (Simon and Schuster, 2016). The foundational book that defines the 5-day arc.
- **GV Design Sprint Guide** (developer.google.com/design-sprint). The continuously-updated process reference maintained by the methodology's authors.
- **Character Capital Design Sprint Guide** (character.vc). Workshop facilitation patterns from the team that succeeded the original GV practice.
- **Google Design Sprint Kit** (designsprintkit.withgoogle.com). Templates and facilitator artifacts.

Skill body content references these sources when explaining methodology choices. The `metadata.frameworks` field lists the subset of canonical sources each skill draws on: `design-sprint` is always present (this is the methodology umbrella); `sprint` is present when the skill body cites the Sprint book directly; `character-note-and-vote` is present when the skill body uses the note-and-vote mechanic.

---

## Change log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-05-15 | Initial contract authored alongside Design Sprint family scaffolding (Phase 1 of v2.15.0 DS integration plan). Mirrors `foundation-sprint-skills-contract.md` v0.2.0 structure with DS-specific deltas: 7 DS moves (readiness, brief, map-and-target, sketch, decide-and-storyboard, prototype-plan, test-and-score); 5-day arc framing; canonical sources Sprint book plus GV Design Sprint guide plus Character DS guide plus Google Design Sprint Kit; `metadata.tool: design-sprint`; `frameworks` subset values updated for the Sprint book lineage. |
| 0.2.0 | 2026-05-16 | Naming Discipline section added (workshop sprints vs agile sprints): codifies the qualified-naming style rule for "Design Sprint" vs bare "sprint" with explicit rationale tied to the agile-sprint cognitive collision. Style guidance only; not validator-enforced. Mirrored in foundation-sprint-skills-contract.md v0.3.0. |
