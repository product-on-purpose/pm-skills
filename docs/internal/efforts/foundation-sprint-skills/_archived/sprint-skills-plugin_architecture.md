# Sprint Skills Plugin: Shared Architecture

**Status:** Draft for review. Not yet promoted to canonical structure.
**Authored:** 2026-05-10
**Location:** `docs/internal/_working/design-and-foundation-sprints/sprint-skills-design/`
**Cross-references:** `foundation-sprint-design-spec.md`, `design-sprint-design-spec.md`

## Purpose of this document

Shared architecture spec for the proposed `sprint-skills` plugin. Captures decisions that apply to BOTH the Foundation Sprint and Design Sprint tracks. Each per-track design spec references this document for shared concerns and focuses on track-specific skills, workflows, and samples.

This is one of three working documents in this folder:

1. `sprint-skills-architecture.md` (this file): shared architecture, packaging, governance
2. `foundation-sprint-design-spec.md`: 7 Foundation Sprint skills, workflow, samples, open questions
3. `design-sprint-design-spec.md`: 7 Design Sprint skills plus 2 cross-track skills, workflows, samples, open questions

## Strategic decisions (locked in via brainstorming)

These were resolved with the user before drafting. They constrain the rest of the architecture.

### Decision A: separate plugin in the same marketplace

The 16 sprint skills ship as a new plugin (`sprint-skills`) in the existing marketplace, not as additions to the `pm-skills` plugin.

**Rationale:** sprint skills are facilitation-oriented (multi-day workshops, Decider checkpoints, role plans, board states), distinct from pm-skills' artifact-oriented identity (PRDs, OKRs, JTBD canvases). Adding 16+ skills to pm-skills would grow the catalog by about 40% in one cycle and dilute its identity. A separate plugin lets each evolve at its own cadence and lets users install only what they need.

**Cross-skill handoffs:** sprint skills hand off to existing pm-skills via plugin-qualified names (e.g., `pm-skills:deliver-prd`, `pm-skills:measure-experiment-design`). Claude Code marketplaces support cross-plugin skill discovery.

### Decision B: monorepo, sprint-skills as a peer-level subfolder

`sprint-skills/` becomes a sibling of `skills/` inside the existing `pm-skills` repo. Both plugins ship from one repo for v0.1.0.

**Rationale:** shared conventions and validators between the two plugins during early development save real effort. Graduation path (split to its own repo at v1.0.0 or when independent contribution cadence emerges) is a mechanical `git mv` later.

**Why not separate repo from day one:** would require duplicating CI tooling, frontmatter linters, AGENTS.md sync, library-sample validation, and release scripts already proven in pm-skills. Premature optimization.

### Decision C: workshop-move granularity (16 skills)

Each skill represents one workshop move (a discrete facilitated activity with one Decider checkpoint), not one atomic artifact.

Skill count:

- 7 Foundation Sprint skills (readiness, brief, basics, differentiation, approach-options, magic-lenses, founding-hypothesis)
- 7 Design Sprint skills (readiness, brief, map-and-target, sketch, decide-and-storyboard, prototype-plan, test-and-score)
- 1 shared skill: `sprint-note-and-vote` (universal decision mechanic)
- 1 bridge skill: `sprint-foundation-to-design` (converts Founding Hypothesis to Design Sprint brief)

**Rationale:** matches canonical sprint structure (Sprint book, Click, Character guide describe sprints in terms of moves). Matches existing pm-skills foundation-skill convention (foundation-meeting-recap covers multi-part recap in one skill). Reduces catalog from about 37 (atomic approach) to 16 without losing fidelity. Workflows chain skills for end-to-end orchestration.

## Repo layout

```
product-on-purpose/pm-skills/
  .claude-plugin/
    marketplace.json                    # renamed: pm-skills-marketplace to product-on-purpose
    plugin.json                         # existing pm-skills manifest, unchanged
  skills/                               # pm-skills skills, unchanged
  _workflows/                           # pm-skills workflows, unchanged
  commands/                             # pm-skills commands, unchanged
  library/                              # pm-skills samples, unchanged
  docs/                                 # pm-skills docs, unchanged
  sprint-skills/                        # NEW: sprint-skills plugin root
    .claude-plugin/
      plugin.json                       # sprint-skills plugin manifest
    skills/
      sprint-note-and-vote/
      sprint-foundation-to-design/
      foundation-sprint-readiness/
      foundation-sprint-brief/
      foundation-sprint-basics/
      foundation-sprint-differentiation/
      foundation-sprint-approach-options/
      foundation-sprint-magic-lenses/
      foundation-sprint-founding-hypothesis/
      design-sprint-readiness/
      design-sprint-brief/
      design-sprint-map-and-target/
      design-sprint-sketch/
      design-sprint-decide-and-storyboard/
      design-sprint-prototype-plan/
      design-sprint-test-and-score/
    _workflows/
      foundation-sprint.md
      design-sprint.md
      foundation-to-design.md
    commands/                           # 16 slash commands, one per skill
    library/
      sprint-output-samples/
        brainshelf/                     # consumer SaaS sample client
        storevine/                      # B2B retail analytics sample client
        workbench/                      # developer tooling sample client
    docs/
      reference/
        sprint-skills-family-contract.md
        canonical-source-mapping.md
      guides/
        using-foundation-sprint.md
        using-design-sprint.md
    README.md
  scripts/                              # shared validators
    validate-sprint-skills-family.sh
    validate-sprint-skills-family.ps1
```

## Marketplace manifest changes

`.claude-plugin/marketplace.json` becomes:

```json
{
  "name": "product-on-purpose",
  "owner": { "name": "product-on-purpose", "url": "https://github.com/product-on-purpose" },
  "description": "Product management plugins for AI agents: opinionated, agent-skill-spec compliant",
  "plugins": [
    {
      "name": "pm-skills",
      "description": "[existing pm-skills description, unchanged]",
      "version": "2.14.0",
      "source": "./",
      "homepage": "https://github.com/product-on-purpose/pm-skills",
      "license": "Apache-2.0",
      "keywords": ["product-management", "pm", "prd", "user-stories", "okrs", "agent-skills", "agentskills-io"]
    },
    {
      "name": "sprint-skills",
      "description": "16 facilitation skills for Foundation Sprints (2-day strategic alignment producing a Founding Hypothesis) and Design Sprints (5-day customer validation through prototype). Based on Jake Knapp and John Zeratsky's canonical methods.",
      "version": "0.1.0",
      "source": "./sprint-skills/",
      "homepage": "https://github.com/product-on-purpose/pm-skills/tree/main/sprint-skills",
      "license": "Apache-2.0",
      "keywords": ["sprint", "foundation-sprint", "design-sprint", "facilitation", "product-strategy", "agentskills-io"]
    }
  ]
}
```

**Migration impact:** existing pm-skills users see no change to their installed plugin. The marketplace rename is purely catalog-level metadata. Users who explicitly subscribed to the marketplace by name may need to re-link, but the plugin slug (`pm-skills`) is unchanged.

## Sprint-skills plugin manifest

`sprint-skills/.claude-plugin/plugin.json`:

```json
{
  "name": "sprint-skills",
  "version": "0.1.0",
  "description": "Foundation Sprint and Design Sprint facilitation skills for AI agents",
  "author": { "name": "product-on-purpose", "url": "https://github.com/product-on-purpose" },
  "license": "Apache-2.0"
}
```

(Exact field set verified against the existing `pm-skills/.claude-plugin/plugin.json` schema before implementation.)

## Frontmatter contract for sprint skills

All sprint skills use richer frontmatter than current pm-skills foundation skills. The additions support workshop semantics: prerequisites, inputs/outputs, timebox, roles.

```yaml
---
name: foundation-sprint-founding-hypothesis
description: Produces a Founding Hypothesis statement plus assumption scorecard at the end of a Foundation Sprint, ready to test via a Design Sprint or other validation method.
classification: sprint
sprint_type: foundation
sprint_move: founding-hypothesis
version: "0.1.0"
updated: 2026-05-10
license: Apache-2.0
metadata:
  category: sprint-strategy
  frameworks: [foundation-sprint, click]
  timebox_minutes: 45
  roles: [facilitator, decider, pm]
  prerequisites:
    - foundation-sprint-basics
    - foundation-sprint-differentiation
    - foundation-sprint-approach-options
    - foundation-sprint-magic-lenses
  inputs:
    - basics bundled artifact
    - differentiation bundled artifact
    - top bet
    - backup approach
  outputs:
    - founding hypothesis statement
    - assumption scorecard
    - recommended next test
  author: product-on-purpose
---
```

`sprint_type` accepts one of: `shared`, `foundation`, `design`, `bridge`.

**New fields beyond current pm-skills foundation contract:**

- `sprint_type` and `sprint_move` for catalog organization and workflow ordering
- `prerequisites`: which OTHER sprint skills must run before this one (used by family validator)
- `inputs` and `outputs`: data shapes (used by workflow composition)
- `timebox_minutes`: explicit timebox, drives agenda generation in workflows
- `roles`: explicit role assignment (facilitator, decider, etc.)

### Why prerequisites belong in frontmatter

pm-skills foundation skills don't need prerequisites because each artifact stands alone. A meeting agenda doesn't depend on a meeting brief; an OKR set doesn't depend on a previous OKR set. Sprint skills are different: you cannot write a Founding Hypothesis without having done Magic Lenses first. Encoding this in frontmatter:

- Lets the family-contract validator catch invalid orderings
- Lets workflows auto-generate the correct chain
- Makes the dependency graph machine-readable for agent invocation
- Documents the workshop arc inside the skill catalog

## File anatomy per skill

Identical to pm-skills foundation skills:

```
{skill-name}/
  SKILL.md                              # main skill instructions
  references/
    TEMPLATE.md                         # output template
    EXAMPLE.md                          # filled example using sample client
```

The "Decider Checkpoint" section appears at the bottom of every TEMPLATE.md. It is non-skippable per the family contract.

## Family contract

A new `sprint-skills/docs/reference/sprint-skills-family-contract.md` modeled on `pm-skills/docs/reference/skill-families/meeting-skills-contract.md`. Covers:

- Shared frontmatter fields and types (above)
- Naming convention: `{sprint_type}-sprint-{move}` for track skills, `sprint-{move}` for shared, `sprint-foundation-to-design` for the bridge
- File anatomy: SKILL.md plus references/TEMPLATE.md plus references/EXAMPLE.md
- Output universality: every skill emits markdown matching its TEMPLATE plus a "Decider Checkpoint" section
- Behavior: zero-friction execution with inference and go-mode (matches meeting-skills pattern), but Decider Checkpoint is non-skippable
- CI enforcement: `validate-sprint-skills-family.sh` / `.ps1`
- Versioning: per-skill SemVer within the v0.1.0 plugin version; skill HISTORY.md created on second skill version
- Library-sample requirements: every skill must have at least 3 thread-aligned samples (brainshelf, storevine, workbench) before stable promotion

## Validators

New scripts in `pm-skills/scripts/`:

- `validate-sprint-skills-family.sh` / `.ps1`: enforces frontmatter shape, prerequisites validity, TEMPLATE/EXAMPLE/SKILL coherence, naming convention
- `check-sprint-workflow-coherence.sh` / `.ps1`: validates that workflow steps form a valid DAG using prerequisites field

Reused validators (extended to recognize sprint-skills):

- `lint-skills-frontmatter.sh` / `.ps1`: extended with `classification: sprint` recognition
- `validate-agents-md.sh` / `.ps1`: AGENTS.md must list sprint-skills' skill directory
- `validate-commands.sh` / `.ps1`: command path validation
- `check-frontmatter-yaml.mjs`: parse-validity check, applied to sprint-skills too

## Versioning and release strategy

### v0.1.0 (initial release)

- All 16 skills shipped at SKILL version `0.1.0`, plugin version `0.1.0`
- Plugin tagged as **beta** in description
- 3 workflows shipped (foundation-sprint, design-sprint, foundation-to-design)
- 48 library samples (16 skills times 3 thread-aligned samples)
- 16 slash commands
- Family contract document
- Canonical source mapping document
- 2 using-* guides

### v0.2.0 (post-dogfood)

After one real Foundation Sprint and one real Design Sprint have been run end-to-end:

- Skill content refinements based on real-use friction
- Library samples updated with real anonymized traces (optional)
- Beta tag removed if quality threshold met

### v1.0.0 (mature)

- At least 3 real sprints completed end-to-end across distinct teams
- All 16 skills at SKILL version `1.0.0` minimum
- Graduate to separate repo (see graduation criteria)

## Graduation criteria: monorepo to separate repo

Sprint-skills lives in the pm-skills monorepo until ALL of these are true:

1. **Independent contribution cadence:** sprint-skills receives external PRs separate from pm-skills, OR maintainers want sprint-skills releases on a different cadence than pm-skills
2. **Stable v1.0.0:** sprint-skills has tagged a stable v1.0.0 release with at least 3 real-world sprint usages documented
3. **Issue volume:** enough sprint-specific issues exist that filtering becomes friction
4. **Conventions diverged:** sprint-skills wants frontmatter, validator, or anatomy changes that pm-skills doesn't want

At that point, `git mv sprint-skills/ ../sprint-skills/` followed by `git filter-repo --path sprint-skills/ --to-subdirectory-filter .` produces a clean per-repo split. Marketplace.json updates `source` URLs to point to the new repo.

## Open questions

1. **Plugin manifest location.** Does Claude Code require each plugin to have its own `.claude-plugin/` folder, or can `marketplace.json` reference subfolder plugins by `source: "./sprint-skills/"` alone? Verify against Claude Code plugin spec; may require keeping `sprint-skills/.claude-plugin/plugin.json` as drafted.
2. **Cross-plugin skill discovery.** How do skill invocations from sprint-skills resolve `pm-skills:deliver-prd`? Plugin-qualified skill names appear to work in Claude Code marketplaces but require verification.
3. **AGENTS.md scope.** Should AGENTS.md at the repo root list ALL skills from both plugins, or should each plugin have its own AGENTS.md? Convention TBD.
4. **Slash command naming.** Sprint commands could conflict with pm-skills commands if both use plugin-unqualified names. Decide: namespace as `/sprint:foundation-readiness` or keep flat as `/foundation-sprint-readiness`?
5. **Marketplace rename impact.** Do existing pm-skills installs depend on the marketplace name `pm-skills-marketplace` for re-resolution? If so, rename is breaking; if not, it's metadata-only. Verify with one test install before merging.
6. **Family contract enforcement maturity.** Should v0.1.0 ship with the validator in WARN mode (logs violations) or FAIL mode (blocks merge)? Lean WARN for v0.1.0, FAIL by v1.0.0.
7. **Whether to ship a `sprint-skills-mcp` server.** pm-skills has a companion MCP server (in maintenance mode). Sprint-skills could follow eventually, but out of scope for v0.1.0.

## What this document does NOT cover

Per-track skill contracts (see `foundation-sprint-design-spec.md` and `design-sprint-design-spec.md`). Per-track workflows. Per-track library sample contents. Per-track open questions.
