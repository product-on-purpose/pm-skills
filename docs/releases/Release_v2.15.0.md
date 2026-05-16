---
title: "Release v2.15.0. Sprint Skills Launch (Foundation Sprint + Design Sprint families)"
description: "pm-skills v2.15.0 ships 15 new skills under the new classification:tool taxonomy implementing Knapp/Zeratsky/Kowitz canonical sprint methodologies. 7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone. Skill catalog 40 to 55. Two family contracts with enforcing CI validators (each with --strict release mode). 3 new workflows including end-to-end FS-to-DS arc. 45 library samples across 3 narrative threads. Two user guides + two concept docs."
sidebar:
  order: 0
---

**Released**: 2026-05-16
**Type**: Minor release (new classification + 15 new skills + 3 new workflows)
**Skill count**: 55 (was 40 at v2.14.x; +15)
**Key theme**: Sprint Skills Launch

---

## TL;DR

v2.15.0 ships pm-skills' first `classification: tool` skills implementing two canonical Knapp/Zeratsky/Kowitz sprint methodologies. The catalog grows from 40 skills to 55 (+15: 7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone). The new `tool` classification taxonomy is added alongside `phase`, `foundation`, and `utility`.

Highlights:

- **Foundation Sprint family** (7 skills) implements the 2-day strategic-alignment workshop that produces a testable Founding Hypothesis.
- **Design Sprint family** (7 skills) implements the 5-day prototype-and-test workshop that produces a Decider's build / iterate / pivot / stop call grounded in 5 customer interviews.
- **`tool-note-and-vote`** standalone implements the canonical group-decision mechanic used at decision moments throughout both sprint families.
- **End-to-end FS-to-DS workflow** chains both families with a narrative-only handoff conversation that replaces a previously-considered "bridge skill" (canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills does not invent one).
- **Two family contracts** with enforcing CI validators. Both validators support `--strict` / `-Strict` mode for release-time enforcement.

Day-to-day usage of the existing 40 skills (`/prd`, `/hypothesis`, `/user-stories`, etc.) is unchanged.

---

## What's new

### Foundation Sprint family (7 new skills)

The 7 `tool-foundation-sprint-*` skills implement the canonical 2-day Foundation Sprint workshop from Knapp/Zeratsky's *Click: How to Make What People Want*:

| Skill | When | Output |
|---|---|---|
| `tool-foundation-sprint-readiness` | Pre-sprint | Go / Conditional Go / Wait verdict |
| `tool-foundation-sprint-brief` | Prep day | One-page scope contract |
| `tool-foundation-sprint-basics` | Day 1 AM | Target customer + important problem + team advantage + competitor map |
| `tool-foundation-sprint-differentiation` | Day 1 PM | Scored differentiators + 2x2 chart + decision principles + Mini Manifesto |
| `tool-foundation-sprint-approach-options` | Day 2 AM | 3-7 candidate approaches as one-page summaries |
| `tool-foundation-sprint-magic-lenses` | Day 2 PM | Top bet + backup with rationale |
| `tool-foundation-sprint-founding-hypothesis` | Day 2 end | Canonical hypothesis sentence + assumption scorecard + recommended next test |

Family contract: `docs/reference/skill-families/foundation-sprint-skills-contract.md` v0.3.0. Family validator: `scripts/validate-foundation-sprint-skills-family.{sh,ps1}` with `--strict`/`-Strict` flag.

### Design Sprint family (7 new skills)

The 7 `tool-design-sprint-*` skills implement the canonical 5-day Design Sprint workshop from Knapp/Zeratsky/Kowitz's *Sprint*:

| Skill | When | Output |
|---|---|---|
| `tool-design-sprint-readiness` | Pre-sprint | Go / Conditional Go / Wait verdict + customer recruiting plan |
| `tool-design-sprint-brief` | Prep week | Two-page scope contract |
| `tool-design-sprint-map-and-target` | Monday | Long-term goal + sprint questions + customer map + HMW board + target moment |
| `tool-design-sprint-sketch` | Tuesday | Lightning demos + 4 independent solution sketches per team member |
| `tool-design-sprint-decide-and-storyboard` | Wednesday | Heat map + Decider supervote + 5-15 panel storyboard |
| `tool-design-sprint-prototype-plan` | Thursday morning | 5-role plan + Five-Act interview script + trial-run checklist |
| `tool-design-sprint-test-and-score` | Friday | 5 interviews + scorecard + Decider's build/iterate/pivot/stop call |

Family contract: `docs/reference/skill-families/design-sprint-skills-contract.md` v0.2.0. Family validator: `scripts/validate-design-sprint-skills-family.{sh,ps1}` with `--strict`/`-Strict` flag.

### Standalone tool

- **`tool-note-and-vote`**: Knapp/Zeratsky/Kowitz canonical group-decision mechanic (silent ideation + heat-map voting + Decider supervote). Used at HMW prioritization, target selection, and Wednesday sketch decision moments throughout both families. NOT a family member; standalone tool callable from any skill that needs structured group decision-making.

### 3 new workflows

- **`_workflows/foundation-sprint.md`**: chains the 7 FS skills as a 2-day arc with prep day, plus the FS-to-next-test branching (Design Sprint / customer research / focused experiment / concierge MVP / feature kickoff).
- **`_workflows/design-sprint.md`**: chains the 7 DS skills as a 5-day arc with prep week, plus the Friday-Decider-call branching (build / iterate / pivot / stop, mapped to deliver-prd / measure-experiment-design / iterate-pivot-decision / iterate-lessons-log / foundation-stakeholder-update).
- **`_workflows/foundation-to-design.md`**: the end-to-end FS+DS arc (7-8 days total across 2-3 calendar weeks accounting for recruiting). Includes the load-bearing narrative handoff conversation that replaces the dropped bridge skill: 5-step handoff conversation structure + 12-row FS-to-DS slot-mapping table + 3-question go/no-go checkpoint.

### Library samples (45 new)

45 library samples in `library/skill-output-samples/tool-{family}-{move}/` across 3 narrative threads. Each thread tells a coherent end-to-end story:

- **Brainshelf** (B2C book-tracking): personal book collection management; FS targets sub-3-sec camera-first capture; DS validates capture interaction + library comprehension with 5 readers.
- **Storevine** (B2B retail managed-intelligence): Monday brief for specialty-retail merchandisers; FS targets template-based managed-intelligence; DS (post-4-week-pilot) tests brief interface comprehension with 5 merchandisers.
- **Workbench** (SRE incident-response): real-time multi-source observability aggregator for Series B-D startups; FS targets the disorientation-phase MTTR; DS (post-design-partner-pilot) tests one-screen UX with 5 senior SREs.

Each thread has 14 samples: 7 Foundation Sprint + 7 Design Sprint. Brainshelf also has the standalone `tool-note-and-vote` sample. Total: 45 samples (21 FS + 21 DS + 3 note-and-vote).

### User guides + concept docs

**Operational guides** (2):

- **`docs/guides/using-foundation-sprint.md`** (~2,700 words; ships with the AI-era section).
- **`docs/guides/using-design-sprint.md`** (~2,100 words; includes the operational FS-to-DS handoff section as the load-bearing replacement for the dropped bridge skill).

**Methodology concept docs** (2):

- **`docs/concepts/foundation-sprint.md`** (framework reasoning, history, design decisions; 9 mermaid diagrams covering conceptual model, two-day breakdown, per-half-day timelines, Founding Hypothesis template, Magic Lenses matrix, Note-and-Vote, family map).
- **`docs/concepts/design-sprint.md`** (framework reasoning, history, design decisions; 9 mermaid diagrams covering conceptual model, five-day breakdown, per-day timelines, Wednesday voting cascade, Five-Act Interview, family map).

**Disambiguation + reference docs** (3, new in this release):

- **`docs/concepts/workshop-sprints-vs-agile-sprints.md`** explains the three methodologies sharing the word "sprint" (agile / Foundation Sprint / Design Sprint), shows a side-by-side comparison matrix, and presents the end-to-end coexistence arc with two mermaid diagrams. Codifies the naming-discipline rationale.
- **`docs/reference/sprint-methodology-glossary.md`** (~1,900 words) covers 40 terms across 3 sections: FS-specific (10), DS-specific (19), shared primitives (11). Explicitly excludes agile sprint terms with a cross-reference to `_workflows/sprint-planning.md`.
- **`docs/reference/workshop-method-comparison.md`** comparison matrix across 8 workshop methods (Foundation Sprint, Design Sprint, agile sprint planning, Lean Canvas, JTBD, Customer Discovery, Feature Kickoff, Experiment Design) plus a decision-tree mermaid for picking the right tool.

**Sprint family user guides** (8, new in this release; 4 per family):

- **FAQ** (`{foundation,design}-sprint-faq.md`): when-to-use, who-attends, comparison to agile sprints and adjacent methods, recovery from common failures, AI-era deltas from canonical Knapp/Zeratsky/Kowitz. Each FAQ ships with a decision-tree mermaid mirroring the readiness-skill canonical signals.
- **Cheat sheet** (`{foundation,design}-sprint-cheat-sheet.md`): printable one-pager with day-by-day timeboxes and a mermaid day-arc.
- **Case studies** (`{foundation,design}-sprint-case-studies.md`): three end-to-end narratives (Brainshelf, Storevine, Workbench) threading the FS-to-DS arc using the library samples.
- **Recovery playbook** (`{foundation,design}-sprint-recovery.md`): PRE-1 through POST-2 failure-mode scenarios with named remediations.

**Canonical primitive enhancement**:

- **`skills/tool-note-and-vote/SKILL.md`** gains a 5-step protocol mermaid diagram showing silent vs spoken phase coloring, three legal supervote outcomes (top vote / Decider override / re-vote), and the re-vote loopback path back to silent ideation.

### CI workflow extension

`.github/workflows/validation.yml` now runs both Foundation Sprint and Design Sprint family validators with `--strict` / `-Strict` on every PR (Ubuntu + Windows runners). This closes a previously-undetected gap where neither family-specific validator was wired into CI (only the structural `validate-skill-family-registration` was).

---

## Architectural decisions

### `classification: tool` taxonomy

The new classification represents skills that implement named external methodologies composed of multiple skills working as a system. Distinguishing characteristics:

- A tool family represents a single canonical methodology with established sources (book, official guide).
- Family members compose into a workflow that is recognizable as the methodology (not just a loose collection of related skills).
- The skill set has a fixed canonical sequence with named decision moments and outputs.

The first two tool families (Foundation Sprint and Design Sprint) inhabit this lane. Future candidates: JTBD process, Double Diamond, Shape Up, OKR cadence-process variants. The classification is intentionally narrow; not every "useful method" warrants a tool family.

### No bridge skill between Foundation Sprint and Design Sprint

Canonical Knapp/Zeratsky methodology has no formal handoff move between Foundation Sprint and Design Sprint. The original v2.15.0 plan considered a `sprint-foundation-to-design` bridge skill; the architectural amendment dropped it after recognizing that inventing a canonical-looking skill that has no canonical source would create future maintenance debt.

The handoff lives in three places:
- A 5-step narrative conversation structure in `_workflows/foundation-to-design.md`
- A 12-row slot-mapping table mapping FS outputs to DS inputs across the DS arc
- A 3-question go/no-go checkpoint the Decider answers before launching the DS

This documentation-only handoff replaces what a SKILL.md would have provided.

### Two family contracts with `--strict` mode

Each family contract is a separate document with its own validator. The validators support a `--strict` (Bash) / `-Strict` (PowerShell) flag that elevates partial-family state from WARN to FAIL; CI invokes `--strict` at PR time so a PR that only partially populates a family is detectable. Default behavior (no flag) remains permissive for incremental authoring during development.

### Library samples version-tiered (per FS family contract; v0.2.0 then v0.3.0)

The Foundation Sprint family contract was bumped from v0.1.0 to v0.2.0 (during the Phase 2 adversarial review) to clarify that library samples are version-tiered:

- **v0.1.0**: Brainshelf thread REQUIRED for all family members. Storevine and Workbench threads RECOMMENDED.
- **v1.0.0** (future): All 3 threads REQUIRED.

At v2.15.0 ship, all 3 threads are populated for both FS and DS families (45 samples total), exceeding the v0.1.0 contract requirement for both families. The contract version-tier framing is preserved for future families that may ship incrementally.

### Workshop-sprint vs agile-sprint naming discipline (FS v0.3.0; DS v0.2.0)

A late v2.15.0 design pass surfaced that bare "sprint" causes cognitive collision because the agile / Scrum sprint is the default PM mental model for that word. Both family contracts were bumped to add a Naming Discipline section (FS v0.2.0 to v0.3.0; DS v0.1.0 to v0.2.0):

- Always include the full method name on first reference per document.
- Prefer qualified terms ("the Foundation Sprint week", "your Design Sprint output") over bare "sprint" thereafter.
- Reserve bare "sprint" for agile / Scrum iteration context only, with explicit "(agile)" or "(Scrum)" qualifier when both methodologies could be confused in surrounding context.

The discipline was applied across all v2.15.0 documentation in the same pass: top-of-doc disambiguation callouts added to the two user guides + two concept docs + three workflow files. A new top-level disambiguation doc (`docs/concepts/workshop-sprints-vs-agile-sprints.md`) sits at the head of the v2.15.0 docs surface for readers arriving with the agile-sprint mental model.

---

## Adversarial review

Two adversarial-review cycles were conducted before tag:

### Foundation Sprint track (2026-05-15)

35 findings returned by Codex; triaged 14 accept / 14 defer to v2.16 / 7 reject with reasoning. All 14 accept-fix-now items shipped pre-tag: 7 guide content errors (focus to money, canonical hypothesis template, partial-attendance contradiction, timing mismatches, Mini Manifesto length, recovery path), 4 skill frontmatter fixes (Founding Hypothesis prereqs, Approach Options decider role + Basics prereq, frameworks subset clarification), validator --strict flag, contract enumerated-checks list, library sample requirements amendment to version-tiered (FS contract v0.1.0 to v0.2.0), dead workflow link removal, handoff table expansion, and 3 plan-doc consistency fixes.

### Design Sprint track (2026-05-16)

13 Codex findings + 20 Claude self-audit findings; after dedup, 21 unique items triaged 19 accept-fix-now / 1 defer to v2.16 / 1 investigate-then-decide. All 19 accept-fix-now items shipped pre-tag including:

- **DS01 calendar mapping**: Brainshelf sprint week labeled 2026-05-26 (actually Tuesday) through 2026-05-30 (actually Saturday) as Monday-Friday across 5 EXAMPLE files plus the upstream FS founding-hypothesis sample. Cascaded to 2026-06-01 (real Monday) through 2026-06-05 (real Friday) with all 9 prep/build/PRD/investor dates re-derived.
- **DS02 + DS03 scorecard logic**: sub-3-sec capture timing claim separated from full-task completion timing (median 2.5s capture vs 35s full task); Q5 threshold revised from 5 sec to 15 sec to match actual measurements.
- **DS06 Rumble Ratified Decision amendment**: v0.1 supports the rumble decision (Decider's call between rumble and all-in-one) but NOT dual-prototype execution.
- **DS11 CI gap closure**: FS + DS family validators now run in CI on every PR (Ubuntu + Windows) with --strict mode.
- **DS12 Brainshelf library sample release-gate semantics**: contract amended to clarify library samples are a release-gate requirement before tag, not Phase 2 conformance.

Full triage documented in `docs/internal/release-plans/v2.15.0/design-sprint-integration-plan.md` "Adversarial Review (2026-05-16)" section.

---

## Verification

| Validator | Status |
|---|---|
| `validate-design-sprint-skills-family.sh --strict` | PASS (7/7 family members; all per-member checks green) |
| `validate-foundation-sprint-skills-family.sh --strict` | PASS (7/7 family members; zero regression from v2.14.2) |
| `lint-skills-frontmatter` | PASS (55 skills; all YAML parses cleanly) |
| `validate-agents-md` | PASS (55 paths matched) |
| `validate-commands` | PASS (15 new commands resolve) |
| `validate-meeting-skills-family` | PASS (zero regression) |
| `check-internal-link-validity --strict` | PASS (146 files checked; 0 broken links) |
| `validate-skill-family-registration` | PASS (both new families registered; both contract paths valid) |
| `validate-docs-frontmatter --strict` | PASS (54 docs checked including new concept docs + 8 user guides + disambiguation + glossary + comparison) |
| `check-no-body-h1 --strict` | PASS |

CI workflow now runs both family validators with `--strict` / `-Strict` on every PR (Ubuntu + Windows).

---

## Migration notes

### For existing pm-skills users

Existing 40 skills (`/prd`, `/hypothesis`, `/user-stories`, etc.) are unchanged. Day-to-day usage is identical. No breaking changes.

### For new users

The new sprint tools are slash-command-callable via `/tool-foundation-sprint-readiness`, `/tool-design-sprint-readiness`, etc. The user guides at `docs/guides/using-foundation-sprint.md` and `docs/guides/using-design-sprint.md` walk through first-use end-to-end.

### For pm-skills-mcp users

The pm-skills-mcp server remains in maintenance mode (per the 2026-05-04 decision). The 15 new tool skills do NOT embed in the MCP server build. pm-skills-mcp catalog stays frozen at the v2.9.2 build (40 skills). File-based install is the recommended path for new users.

---

## Known limitations (deferred to v2.16+)

- **DS family validator coverage gap**: `--strict` enforces structural conformance (file presence, classification, metadata.tool, metadata.move, contract reference, Decider Checkpoint position) but does NOT yet enforce the full metadata-shape contract (category enum, frameworks subset values, timebox_minutes integer, roles enum, prerequisites array, inputs/outputs presence, author field). Universal `lint-skills-frontmatter` provides the floor for root-field shape. Full per-family metadata enforcement deferred to v2.16.
- **pm-skills-mcp catalog frozen at v2.9.2 build**; the 15 new tool skills are not embedded in MCP. File-based install is the recommended path.
- **2 Dependabot alerts remain open** requiring Astro 6.x upgrade; deferred to v2.16 per `plan_v2.16.0.md` DI3 (Astro 6 + Node 22.12+ upgrade).
- **Slow-degradation Design Sprint variant** not scaffolded; the v0.1 DS family covers the canonical 5-day sudden-incident / new-feature pattern. Multi-week observation sprints documented as a known variant in `docs/guides/using-design-sprint.md` "Variants and adaptations" section.

---

## What's deferred to v2.15.x or later

Same intent as v2.14.0's deferred-table pattern: items intentionally NOT shipped in v2.15.0 because they require separate scoping cycles.

| Item | Why deferred | Disposition |
|---|---|---|
| Full DS validator metadata-shape coverage | Validator complexity warrants separate spec | v2.16 (DS13) |
| Astro 6.x upgrade | Breaking change requires migration spike | v2.16 DI3 |
| Node 22.12+ upgrade | Required for Astro 6.x | v2.16 DI3 |
| pm-skills-mcp tool-skill embed | Maintenance-mode decision; resume criteria TBD | Post-v2.15 mode reassessment |
| 4-day Design Sprint variant | Variant not common enough to warrant v0.1 scaffolding | Documented as known variant; v2.x if demand emerges |
| Hardware / service Design Sprint variants | Per Ratified Decision 7 | Documented as known variants; v2.x if demand emerges |

---

## What's NOT in v2.15.0

- No changes to the 40 existing skills.
- No changes to the existing CI workflows beyond the 4 added family-validator steps (Ubuntu + Windows for FS + DS).
- No changes to the Astro Starlight build pipeline (still on Astro 5.x; Astro 6.x deferred to v2.16).
- No changes to the pm-skills-mcp server (still in maintenance mode).
- No changes to the `_workflows/feature-kickoff.md`, `_workflows/customer-discovery.md`, or other pre-existing workflow docs.

---

## Files

- 15 new SKILL.md + 15 references/TEMPLATE.md + 15 references/EXAMPLE.md = 45 skill files
- 15 new commands/tool-*.md = 15 command files
- 3 new _workflows/*.md = 3 workflow files
- 2 new docs/reference/skill-families/*-contract.md = 2 contract files (both bumped post-tag-prep: FS to v0.3.0, DS to v0.2.0 for Naming Discipline section)
- 2 new docs/guides/using-*-sprint.md = 2 operational guide files
- 2 new docs/concepts/*-sprint.md = 2 concept files
- 1 new docs/concepts/workshop-sprints-vs-agile-sprints.md = 1 disambiguation file
- 2 new docs/reference/{sprint-methodology-glossary, workshop-method-comparison}.md = 2 reference files
- 8 new docs/guides/{foundation,design}-sprint-{faq,cheat-sheet,case-studies,recovery}.md = 8 sprint user-guide files
- 45 new library/skill-output-samples/tool-*/sample_*.md = 45 sample files
- 4 new validator scripts (2 Bash + 2 PowerShell) = 4 script files

Plus updates to: AGENTS.md (Tools section), CHANGELOG.md (this entry), docs/changelog.md (mirror entry), README.md (badges + What's New + version pointers), .claude/pm-skills-for-claude.md (version pointer), .claude-plugin/plugin.json + marketplace.json (version + description), docs/reference/categories.md (taxonomy reference), .github/workflows/validation.yml (4 added family-validator steps), and a doc-only mermaid addition to `skills/tool-note-and-vote/SKILL.md` (canonical 5-step protocol diagram).

---

## Cross-links

- Root [`CHANGELOG.md`](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md#2150---2026-05-16) for the full Keep-a-Changelog entry.
- [Foundation Sprint user guide](../guides/using-foundation-sprint.md)
- [Design Sprint user guide](../guides/using-design-sprint.md)
- [Foundation Sprint workflow](../../_workflows/foundation-sprint.md)
- [Design Sprint workflow](../../_workflows/design-sprint.md)
- [Foundation-to-Design end-to-end workflow](../../_workflows/foundation-to-design.md)
- [Foundation Sprint concept doc](../concepts/foundation-sprint.md)
- [Design Sprint concept doc](../concepts/design-sprint.md)
- [Foundation Sprint skills contract](../reference/skill-families/foundation-sprint-skills-contract.md)
- [Design Sprint skills contract](../reference/skill-families/design-sprint-skills-contract.md)
