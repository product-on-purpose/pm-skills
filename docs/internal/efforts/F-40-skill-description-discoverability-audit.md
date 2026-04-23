# [F-40] Skill Description Discoverability Audit

Status: Backlog
Milestone: v2.12.0 (candidate)
Issue: TBD
Agent: Claude Opus 4.7
Blocked by: [F-39 find-skills empirical discoverability test](F-39-find-skills-empirical-test.md)

## Scope

Audit all 38 SKILL.md descriptions in pm-skills for query-intent keyword density, driven by the gap-analysis output of F-39. Improve descriptions that fail to surface their skill when a user asks for help with that skill's topic. Preserve description accuracy and the 20-to-100 word range enforced by `lint-skills-frontmatter`. Ship as a batch patch release (likely v2.12.0) with a before-and-after discoverability comparison.

Surfaced by the 2026-04-23 skills.sh investigation which identified that:
- pm-skills meets find-skills' install-count trust threshold
- pm-skills is NOT on find-skills' trusted-author list
- find-skills' hardcoded category keywords do not include Product Management
- Delegated search via `npx skills find [query]` greps SKILL.md name + description fields
- pm-skills descriptions have never been audited for this specific discoverability lens

## Problem

SKILL.md descriptions today are written for two primary consumers:
1. Human readers scanning the repo README and docs
2. Agent context-matchers that load skills based on trigger-word adjacency

They have NOT been written for the third consumer:
3. find-skills' natural-language query parser and keyword grep, which sits between "user asks for X" and "user installs pm-skills"

This third consumer has specific behavior we can optimize for:
- It looks for high-intent keywords (verbs and nouns that PMs actually type into agents)
- It deprioritizes skills whose descriptions use insider jargon or abstract phrasing
- It ranks by install count when multiple skills match, so we compete against more-installed alternatives on tie-breaks

Example of the problem (hypothetical, to be confirmed by F-39 data):

Skill: `deliver-prd`
Current description starts with "Creates a comprehensive Product Requirements Document..."
Potential user query: "find a skill for writing a PRD"
Problem: the current description uses "Product Requirements Document" spelled out; "PRD" is mentioned but not as the leading term. A keyword-grep for "PRD" in a query might hit us, but if a competing skill has "PRD" as its first word, we rank below.

Without audit, we cannot identify these cases systematically.

## Audit approach

### Inputs

1. **F-39 gap analysis**: which skills fail their expected-match query, and what queries did not surface them
2. **Current 38 SKILL.md descriptions**: source of truth
3. **Common PM query vocabulary**: extracted from F-39's query battery plus any observed queries from install-telemetry patterns (if visible)

### Per-skill audit protocol

For each of the 38 skills:

1. **Identify the skill's expected-match query** (from F-39 query battery)
2. **Check F-39 baseline report**: did the skill surface for its expected query? At what rank?
3. **If the skill did not surface**:
   - Extract keywords from the expected query
   - Check whether those keywords appear in the current description
   - Check whether they appear prominently (first sentence, near the beginning)
   - Propose a rewrite that maintains accuracy and the 20-to-100 word rule
4. **If the skill surfaced but at a low rank**:
   - Identify the higher-ranked competitor
   - Compare competitor description phrasing to ours
   - Propose a rewrite to close the ranking gap if one can be closed while maintaining accuracy
5. **If the skill surfaced well** (top 3 for expected query):
   - Leave unchanged
   - Note what the description does well as a pattern for others

### Description-rewrite principles

- **Accuracy is non-negotiable**: descriptions must continue to accurately describe what the skill does. No keyword stuffing that misrepresents behavior.
- **Lead with high-intent verb + noun phrase matching the user query**: if the query is "write a PRD", lead with "Writes a PRD..."
- **Include common abbreviations AND full forms**: "PRD (Product Requirements Document)" hits both "PRD" queries and "Product Requirements Document" queries.
- **Keep "Use when..." trigger phrases**: these help agent context-matchers (the second consumer); moving them to the end keeps description leading with the verb-noun.
- **Preserve 20-to-100 word lint compliance**: enforced by `scripts/lint-skills-frontmatter.sh`.
- **No inline colon-space patterns** (learned from v2.11.1): preserves strict YAML compatibility.
- **No em-dashes** (per standing rule).

### Version bump implications

Description changes are user-observable (they change agent trigger-matching behavior AND find-skills recommendation-matching behavior). Per `docs/internal/skill-versioning.md`, that's a patch bump.

- 38 skills audited
- Estimated: 15 to 25 skills will have description improvements (assumption based on lack of prior audit)
- Each improved skill gets a patch bump (1.x.Y to 1.x.Y+1 or similar)
- All bumps listed in the v2.12.0 skills-manifest.yaml

## Deliverables

- `docs/internal/efforts/F-40-skill-description-discoverability-audit/audit-report.md`: per-skill audit findings with current description, expected-match query from F-39, gap analysis, and proposed rewrite
- `docs/internal/efforts/F-40-skill-description-discoverability-audit/before-after-diff.md`: side-by-side description changes for review
- Updated `skills/*/SKILL.md` files for affected skills (description + version + updated fields)
- `docs/internal/release-plans/v2.12.0/skills-manifest.yaml`: lists every skill that got a patch bump
- Update to `docs/internal/distribution/skills-sh.md`: add a note in the Discoverability layer section that F-40 was run and the audit methodology is now codified

## Validation

### Pre-ship validation

- All 38 SKILL.md files still pass `scripts/lint-skills-frontmatter.sh`
- All 38 still pass the two post-v2.11.1 rules (first-line `---`, no inline `: ` in unquoted descriptions)
- `npx skills add <local> -l` still discovers all 38
- No em-dashes introduced

### Post-ship validation (measures lift)

- Re-run F-39 with the same query battery
- Compare post-audit ranking to baseline
- Target: 50% or greater of previously-failing queries now surface pm-skills in top 3
- Target: no regression (previously-working queries must still work)

If post-ship validation shows no lift or regression, the audit approach is wrong and the work needs rethinking before additional iterations.

## Open Questions

- **How to handle skills whose description is already optimal**: leave unchanged? version-bump anyway to keep the manifest clean? Proposal: leave unchanged, do not bump, do not list in manifest.
- **What if F-39 reveals find-skills rarely delegates to `npx skills find`** and instead relies heavily on hardcoded categories? Then the audit approach (optimizing description keywords) has limited ceiling. Surfacing a "pm" or "product-management" category hint via `metadata.category` might matter more. This becomes an escape-hatch finding that reshapes F-40 scope.
- **What if competing skills' descriptions match our vocabulary AND they have 10x our install count?** We lose on tie-breaks. In that case, description work alone cannot close the gap; Phase 5 soft-launch to grow install count becomes the real lever.
- **Should the audit include the 5 most-installed pm-skills (init-project, wrap-session, etc.)?** No: those were removed in v2.11.1. They're not pm-skills anymore.

## Dependencies

- **Blocked by F-39** (we need the gap data before we can audit)
- Complements F-38 (`/release` utility skill): the audit's description-improvement patterns could be encoded into a `/release` pre-check that flags obvious keyword gaps in new skills

## Inspiration / Evidence

The need for this audit became clear during the 2026-04-23 skills.sh investigation. The skill descriptions have evolved organically across 38 skills over many releases, written by different session contexts with different intent. Some are query-matched well; others are not. Without an audit, we cannot tell which is which.

Additional motivation from the 2026-04-23 `/insights` report's observation that pm-skills content is markdown-heavy (474 markdown edits vs. other languages); high surface-area, low discoverability audit exposure.

## Status Transitions

- **Backlog** (current, 2026-04-23)
- **In Progress** when F-39 baseline report is committed and audit authoring begins
- **Shipped** when improved descriptions land in a v2.12.x release and post-ship re-run of F-39 shows measurable lift

## Non-goals

- **Complete description rewrites**: most skills' descriptions are close to right. This is a targeted keyword-density lens, not a from-scratch rewrite.
- **Changing SKILL.md content beyond frontmatter description**: the body content is for agent execution, not discovery. Out of scope.
- **Cross-skill consistency for its own sake**: each skill has its own domain and should be described in its own terms. We're not homogenizing voice.

## Detailed specification

Deferred to `F-40-skill-description-discoverability-audit/audit-methodology.md` during authoring pass. Requires F-39 baseline report as a prerequisite input.
