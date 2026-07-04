---
name: utility-pm-skill-builder
description: Guides contributors from a PM skill idea to a complete Skill Implementation Packet aligned with pm-skills conventions. Runs gap analysis, validates through a Why Gate, classifies by type and phase, generates draft files, and writes to a staging area for review before promotion.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.2.0"
  updated: 2026-07-04
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Skill Builder

This skill creates new PM skills for the pm-skills library. It produces a
Skill Implementation Packet - a complete design document with draft files
in a staging area for review before promotion to canonical locations.

## When to Use

- When you have an idea for a new PM skill
- When you want to add a domain skill (phase-specific), foundation skill
  (cross-cutting), or utility skill (meta/tooling) to the pm-skills library
- When a contributor needs guided skill creation that follows repo conventions

## When NOT to Use

- To modify or improve an existing skill → use `utility-pm-skill-iterate`
- To audit an existing skill against conventions → use `utility-pm-skill-validate`
- To create a skill for a non-pm-skills context → use a general agent skill builder
- To create a workflow → workflows are authored directly, not via this builder

## Instructions

When asked to create a new PM skill, follow these steps:

### Step 1: Understand the Idea

Accept the idea in either form:
- **Problem-first**: "What PM problem does this skill solve? Who runs into
  this problem, and what do they currently produce (or fail to produce)?"
- **Skill-first**: "Describe the skill you want to create. What artifact
  does it produce? What PM activity does it support?"

Both entry points produce the same downstream flow. If the user provides
one form, do not ask for the other - extract what you need and proceed.

If the idea is vague, ask ONE follow-up question to clarify the artifact
type and target audience before proceeding.

### Step 2: Gap Analysis

Check ALL existing skills for overlap. Use the Current Library Reference
below (derive the live inventory from `skill-manifest.json` or `AGENTS.md`)
AND scan the `skills/` directory for the latest inventory. Include all four
families - domain, foundation, utility, and tool - the tool family is easy
to miss since it has no phase prefix pattern in common conversation.

Present findings with specificity:
- Name each overlapping skill and explain what it covers
- Identify the specific gap this new skill would fill
- If overlap is high, trigger the Why Gate (see below)

**Why Gate** (triggers when overlap is found):
Ask the user: "Name 2-3 specific prompts or scenarios where the existing
skills fail to produce what you need."

**Kill Gate**: If the user cannot articulate convincing gaps, recommend
an alternative:
- "Revise [existing skill] to cover this case"
- "Create a workflow combining [skill A] + [skill B]"
- "Add a command variant, not a new skill"
- "This is a documentation improvement, not a new skill"

Do not proceed past the kill gate without either convincing evidence of
a gap or explicit user override.

### Step 3: Scope Check

Evaluate whether the idea should be ONE skill or MULTIPLE skills.

**Splitting signals:**
- The idea produces multiple distinct artifact types
- The idea crosses Triple Diamond phases (e.g., Discover + Deliver)
- The description naturally contains "and" connecting two activities

If splitting is warranted, present the recommendation:
"This seems to cover two distinct PM activities:
  1. [Activity A] → produces [Artifact A]
  2. [Activity B] → produces [Artifact B]
These work better as separate skills that can be chained via a workflow.
Want to proceed with just [Activity A] for now?"

### Step 4: Classification + Repo-Fit

Determine the skill's classification and naming:

**Domain skills** (phase-specific PM activities):
- Phase: discover | define | develop | deliver | measure | iterate
- Directory: `{phase}-{skill-name}`
- Frontmatter: `phase: {phase}` (required), no `classification` field

**Foundation skills** (cross-cutting, used across phases):
- No phase
- Directory: `foundation-{skill-name}`
- Frontmatter: `classification: foundation` (required), no `phase` field
- Use when: the skill applies to multiple phases equally

**Utility skills** (meta-skills, repo tooling):
- No phase
- Directory: `utility-{skill-name}`
- Frontmatter: `classification: utility` (required), no `phase` field
- Use when: the skill operates on the repo, workflow, or other skills

**Exemplar selection:**
Identify 1-2 existing skills that are the closest structural match:
- Same phase > same category > similar artifact type
- Read their SKILL.md to understand section structure, instruction style,
  output contract format, and quality checklist pattern
- Name the exemplars explicitly: "Modeled after [skill] - same phase,
  [category] category"

Present the classification and exemplar selection for user confirmation.

### Step 4.5: Eval Readiness (the eval contract)

A new skill must ship **eval-ready** so coverage never falls behind: routing health
and output quality are both measurable from day one. Decide the eval contract here,
then emit its assets in Step 5. Four parts:

**A. Nearest neighbors (C-2).** Name the new skill's 1-3 nearest neighbors - the
existing skills whose triggers most overlap. Derive them from the Step 2 gap analysis
plus same-phase / same-category siblings. These neighbors drive the boundary pointers
(below), the near-miss trigger fixtures (Step 5), and the collision probe (Step 7).

**B. Reciprocal boundary pointers (C-3).** The draft SKILL.md MUST include a
`## When NOT to Use` section that names each neighbor and says when to use that
neighbor instead. For every neighbor, also add the **reciprocal** pointer back: a
"When NOT to Use" bullet in the neighbor's SKILL.md pointing to the new skill. If the
overlap is strong enough to be a measured collision pair, add the pair to
`COLLISION_PAIRS` in `scripts/check-trigger-fixtures.mjs` so the reciprocity gate
(`check-reciprocal-boundary-pointers.mjs`) and the collision probe both cover it.
Reciprocal pointers are what kept the v2.26.0 rewrites collision-clean.

**C. Output-eval family (C-4).** Map the skill to an output-eval family rubric so its
artifact quality is measurable. Pick by phase/category:

| Family rubric | Covers (phase / kind) |
|---|---|
| `framing` | define-* problem/hypothesis/jtbd/opportunity/prioritization + foundation-okr-writer/persona/lean-canvas |
| `specification` | deliver-* prd/acceptance-criteria/user-stories/edge-cases/launch-checklist |
| `discovery` | discover-* interview-synthesis/competitive/market-sizing/journey/stakeholder |
| `technical` | develop-* adr/design-rationale/solution-brief/spike-summary |
| `measurement` | measure-* experiment-design/results/okr-grader/dashboard/instrumentation/survey |
| `learning` | iterate-* retrospective/lessons-log/pivot-decision/refinement-notes |
| `communication` | audience-facing: deliver-release-notes, foundation-stakeholder-update |

Family rubrics live at `docs/internal/eval-rubrics/{family}.md`. If the skill fits a
family that has a rubric, use that `family` value in the scenario frontmatter. If it
opens a NEW family (meeting/tool skills have none yet), note "no family rubric yet -
author one before the skill enters the output-eval roster" and skip the family value.

**D. Fixture + scenario plan (C-1, C-4).** Plan the two eval-asset files emitted in
Step 5: a `trigger-fixtures.json` (routing) and an `output-scenarios/<id>.md` (output
quality). Their shapes are specified in Step 5 items 13-14.

Present the neighbors + family + reciprocal-pointer plan for user confirmation before
generating the packet.

### Step 5: Generate Skill Implementation Packet

Produce the complete packet using `references/TEMPLATE.md` as the format.
The packet includes:

1. **Decision** - recommendation + Why Gate evidence (if applicable)
2. **Classification** - type, phase (if domain), category, directory name
3. **Overlap Analysis** - what was found, why this skill is still needed
4. **Exemplar Skills** - which existing skills modeled, why
5. **Draft Frontmatter** - complete, valid YAML block. The frontmatter MUST begin with `---` at byte 0 of the file (no preceding content of any kind, including HTML comments, BOM, or whitespace). Place any attribution comment AFTER the closing `---` fence, never before. Reference: `library/skill-output-samples/SAMPLE_CREATION.md` Section 5.
6. **Draft SKILL.md** - full content (not an outline), mirroring exemplar structure
7. **Draft TEMPLATE.md** - section headers with guidance comments
8. **Draft EXAMPLE.md** - complete, realistic example (150-300 lines) with a
   specific PM scenario, every section filled, optional sections demonstrated
   both filled and skipped
9. **Draft Command** - command frontmatter
10. **AGENTS.md Entry** - exact text to add
11. **Validation Checklist** - all CI rules checked against the draft
12. **Next Steps** - local CI, testing, contribution workflow
13. **Draft trigger-fixtures.json** (C-1, routing eval) - `evals/trigger-fixtures.json`:
    a JSON object `{ "schema": 1, "skill": "{name}", "runs_per_query": 3,
    "trigger_threshold": 0.5, "queries": [...] }`. The `queries` array needs **>= 16
    total**, **>= 8 with `"expect": "trigger"`** (drawn from the skill's real intents,
    NOT just artifact keywords - include intent-only asks) and **>= 8 with
    `"expect": "no-trigger"`**, of which **>= 2 are near-misses** aimed at the Step 4.5
    neighbors (mark them `"near_miss_of": "{neighbor}"`). Split each class ~60/40 across
    `"split": "train"` / `"split": "validation"`. This is the B-4 fixture contract
    (`scripts/check-trigger-fixtures.mjs`).
14. **Draft output-scenario** (C-4, output-quality eval) - `evals/output-scenarios/{id}.md`:
    frontmatter `scenario: {id}` / `skill: {name}` / `family: {family from Step 4.5}` /
    `created: {date}`, then a realistic input brief (>= 100 chars of body) that gives the
    skill arm and a freehand control the same raw material. This is the B-7 asset contract
    (`scripts/check-output-eval-assets.mjs`). Omit `family` only if Step 4.5 found no
    rubric yet.

### Step 6: Write to Staging Area

Write all generated files to the staging area:

```
_staging/pm-skill-builder/{skill-name}/
├── SKILL.md               ← draft skill file
├── references/
│   ├── TEMPLATE.md        ← draft template
│   └── EXAMPLE.md         ← draft example
├── evals/
│   ├── trigger-fixtures.json        ← draft routing fixtures (C-1)
│   └── output-scenarios/{id}.md     ← draft output-quality scenario (C-4)
└── command.md             ← draft command
```

> **Note**: `_staging/` is gitignored - draft artifacts never ship in releases.
> The staging folder is discarded after promotion.

Report what was written and where.

### Step 7: Promote (on confirmation)

Ask: "Review the packet above. When ready, I'll promote the files to
their canonical locations. Proceed? [yes/no]"

If yes, promote by copying each file from staging to its canonical path:

| Staging file | Canonical location |
|--------------|--------------------|
| `_staging/pm-skill-builder/{skill-name}/SKILL.md` | `skills/{dir-name}/SKILL.md` |
| `_staging/pm-skill-builder/{skill-name}/references/TEMPLATE.md` | `skills/{dir-name}/references/TEMPLATE.md` |
| `_staging/pm-skill-builder/{skill-name}/references/EXAMPLE.md` | `skills/{dir-name}/references/EXAMPLE.md` |
| `_staging/pm-skill-builder/{skill-name}/evals/trigger-fixtures.json` | `skills/{dir-name}/evals/trigger-fixtures.json` |
| `_staging/pm-skill-builder/{skill-name}/evals/output-scenarios/{id}.md` | `skills/{dir-name}/evals/output-scenarios/{id}.md` |
| `_staging/pm-skill-builder/{skill-name}/command.md` | `commands/{command-name}.md` |

Where `{dir-name}` is the classification-prefixed directory (e.g., `deliver-change-communication`).

Then:
1. Create the target directories: `skills/{dir-name}/references/` and `skills/{dir-name}/evals/output-scenarios/`
2. Copy each file to its canonical location
3. Append the AGENTS.md entry from the packet; if Step 4.5 declared a collision pair, add it to `COLLISION_PAIRS` in `scripts/check-trigger-fixtures.mjs` and add the reciprocal "When NOT to Use" bullet to each neighbor's SKILL.md
4. Run CI validation: `bash scripts/lint-skills-frontmatter.sh && bash scripts/validate-agents-md.sh && bash scripts/validate-commands.sh`, then the eval-asset gates `node scripts/check-trigger-fixtures.mjs`, `node scripts/check-output-eval-assets.mjs`, `node scripts/check-reciprocal-boundary-pointers.mjs`, and the collision probe `node scripts/check-new-skill-collision.mjs --skill={name}` (C-2 - confirms the new skill recalls its own triggers and steals none of a neighbor's). Regenerate the catalog surfaces: `node scripts/gen-skill-manifest.mjs && node scripts/gen-skill-manifest.mjs --agents`
5. If validation passes, delete the staging folder: `_staging/pm-skill-builder/{skill-name}/`
6. If validation fails, report the error and keep staging intact for fixes

Design rationale lives in the GitHub issue, PR, or effort brief - not
in a permanent packet file.

Provide post-promotion guidance:
- "Run CI locally: `bash scripts/lint-skills-frontmatter.sh`"
- "Test the skill: try `/{command-name}` with a realistic scenario"
- "If contributing: create a GitHub issue with the skill-proposal template,
  then open a PR"

## Current Library Reference

**Do not hand-maintain a skill inventory in this file.** A static table here
has drifted from the real catalog before (most recently: an entire family
untracked, plus a missing row in another) because every new or removed skill
would require a hand edit here too. Instead, derive the live inventory at
run time, every time, from one of:

- **`skill-manifest.json`** (repo root) - generated, machine-readable; every
  skill's name, classification, phase (if any), category, and description.
- **`AGENTS.md`** - generated, human-browsable; the same catalog grouped by
  family with a short description per skill.

Both are regenerated by `node scripts/gen-skill-manifest.mjs` (and
`--agents`) whenever a skill is added, changed, or removed, so they track
`skills/` on disk exactly - unlike a hand-written table, they cannot drift.

The families, for orientation (no counts kept here on purpose - read the
manifest for the current total):

| Family | Phase-scoped? | Directory prefix | Covers |
|--------|---------------|-------------------|--------|
| Domain | Yes (discover/define/develop/deliver/measure/iterate) | `{phase}-` | PM activities scoped to one Triple Diamond phase |
| Foundation | No | `foundation-` | Cross-cutting artifacts used across phases (canvases, personas, OKRs, meeting artifacts, stakeholder communication, pre-build risk review) |
| Utility | No | `utility-` | Meta/tooling skills that operate on the repo, workflow, or other skills (this skill is one) |
| Tool | No | `tool-` | Workshop facilitation formats (Foundation Sprint family, Design Sprint family, standalone facilitation formats) |

For gap analysis (Step 2), read `skill-manifest.json` or `AGENTS.md` in
full - all four families, not just domain and foundation - before judging
overlap. The tool family is the easiest to miss because none of its skills
share a phase name with the idea being pitched.

## Output Contract

The builder MUST produce draft files for the new skill:
- `SKILL.md` - full skill instructions (including a `When NOT to Use` section naming neighbors, C-3)
- `references/TEMPLATE.md` - output template with guidance comments
- `references/EXAMPLE.md` - complete worked example (150-300 lines)
- `evals/trigger-fixtures.json` - routing eval fixtures (C-1; B-4 contract)
- `evals/output-scenarios/{id}.md` - output-quality scenario + family rubric (C-4; B-7 contract)
- `command.md` - slash command file

All drafts are written to `_staging/pm-skill-builder/{skill-name}/` (gitignored).

On promotion, files are copied to canonical locations, AGENTS.md is
updated, and the staging folder is discarded.

## Quality Checklist

Before finalizing the packet, verify all items in both tiers:

### CI Validation (must pass)
- [ ] `name` matches directory name
- [ ] Description is 20-100 words (single-line, no multiline YAML)
- [ ] `version`, `updated`, `license` all present
- [ ] Classification correct (domain → `phase:`, foundation/utility → `classification:`)
- [ ] Directory name follows convention: `{phase/classification}-{skill-name}`
- [ ] TEMPLATE.md has ≥3 `##` sections
- [ ] Command file references correct skill path
- [ ] AGENTS.md entry uses `####` + `**Path:**` format

### Quality Checks (should pass)
- [ ] Gap analysis checked all existing skills (not just same-phase)
- [ ] Why Gate evidence is specific (names prompts/scenarios, not vague)
- [ ] EXAMPLE.md is a complete artifact (150-300 lines), not an outline
- [ ] Output contract is present in draft SKILL.md
- [ ] Quality checklist is present in draft SKILL.md

### Eval contract (C-1..C-4; ship eval-ready)
- [ ] Nearest neighbors named (C-2); `When NOT to Use` section points to each
- [ ] Reciprocal "When NOT to Use" pointer added back from each neighbor (C-3); collision pair added to `COLLISION_PAIRS` if strong overlap
- [ ] `evals/trigger-fixtures.json` present and meets the B-4 contract (>=16 queries, >=8/class, >=2 near-misses, train/validation split)
- [ ] `evals/output-scenarios/{id}.md` present with `scenario`/`skill`/`family` frontmatter mapping to an existing rubric (or family deferred with a noted reason)
- [ ] Collision probe run, key-free: `check-new-skill-collision.mjs --skill={name} --emit-tasks`, then dispatch the `pm-skill-router` sub-agent (Haiku) over the emitted queries and apply the verdict; the new skill recalls its triggers and steals none of a neighbor's. (Unattended CI may instead use the Messages-API path with `ANTHROPIC_API_KEY`.)

## Examples

See `references/EXAMPLE.md` for a completed Skill Implementation Packet
demonstrating a realistic domain skill creation.
