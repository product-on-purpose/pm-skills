# [D-03] PM Skill Lifecycle Guide
Status: Shipped (v2.8.0)
Release: v2.8.0
Phase: 3 (after both F-10 and F-11 SKILL.md files are committed)
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create `docs/pm-skill-lifecycle.md` — a public-facing guide explaining the Create → Validate → Iterate lifecycle for PM skills. Documents how the three utility skills (`/pm-skill-builder`, `/pm-skill-validate`, `/pm-skill-iterate`) work together as a system.

## Relationship

Depends on F-10 and F-11 being implemented first. The guide documents actual behavior, not planned behavior.

## Key Decisions

- Public doc (ships in ZIP), not internal governance
- Complements `docs/pm-skill-anatomy.md` (structure) with lifecycle (evolution)
- Includes concrete workflow patterns with command examples
- References `docs/internal/skill-versioning.md` for governance details but keeps the public guide focused on usage

## Content Outline

1. **The lifecycle model** — why three tools instead of one (single responsibility, composability)
2. **When to use each tool** — decision table
3. **Workflow patterns:**
   - New skill: builder → validate → fix → ship
   - Improve existing: validate → review → iterate with report → ship
   - Convention change: validate (batch) → triage → iterate per skill → ship
   - Feedback loop: iterate with feedback → validate → confirm → ship
4. **Versioning** — how lifecycle tools relate to skill versioning (link to internal doc for governance, summarize SemVer rules inline)
5. **CI relationship** — what CI catches vs. what validate catches (CI = structure, validate = quality)
6. **Quality standard model** — validator checks *current conventions* and surfaces the *v2.8 standard* as suggestions; the library converges over time through the lifecycle, not retroactively
7. **Examples** — at least one worked example per workflow pattern

## Artifacts Produced

- `docs/pm-skill-lifecycle.md`

## Dependencies

- F-10 (#121) — validate skill must exist to document it
- F-11 (#122) — iterate skill must exist to document it
- F-05 (#113) — builder skill (already shipped in v2.7.0)

## PRs

- TBD
