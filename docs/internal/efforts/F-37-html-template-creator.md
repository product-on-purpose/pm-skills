# [F-37] Utility Skill: HTML Template Creator

Status: Discovery (strategy brief drafted)
Milestone: TBD (candidate v2.13.0+)
Issue: TBD
Agent: TBD

## Scope

Create a utility skill that produces attractive, thoughtful, scalable, self-contained HTML templates for other skills to adopt as their standard artifact output. Extends the foundation-lean-canvas precedent (single HTML file, inline CSS with custom-property tokens) to the rest of the library.

## Status

Discovery. Strategy brief at `docs/internal/efforts/F-37-html-template-creator/strategy-brief.md` explores the problem space, evaluates 4 approaches, lands an 80/20 recommendation, and enumerates open questions. No specification yet; no implementation.

## Leading direction

Approach B from the brief: a bespoke template generator skill, constrained to 3 pilot skills first (candidates: `deliver-prd`, `define-problem-statement`, `iterate-retrospective`), with a documented path to Approach D (shared base + per-skill overrides) after pilots surface real commonalities. Rationale detailed in the brief Section 5.

## Related efforts

- **F-22 prototype-creator** (backlog): HTML prototypes for feature UIs (dashboards, forms). Adjacent medium, different purpose.
- **F-23 prototype-styler** (backlog): Design system for F-22. Adjacent tooling, different audience.
- **foundation-lean-canvas** (shipped v2.11.0): n=1 proof of concept for the single-file HTML artifact pattern this effort generalizes.

## Classification (provisional)

- Type: new utility skill
- Directory: `skills/utility-html-template/` (name provisional; see brief Section 7)
- Artifacts: `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`, `commands/html-template.md`
- Plus: pilot HTML templates inside the 3 pilot skills' `references/` folders

## Next steps

1. Review the strategy brief.
2. Confirm or reshape the approach (B vs A, C, or D).
3. Decide on the 3 pilot skills.
4. Promote to a specification via `/jp-create-spec` once the approach is agreed.

## Open decisions

- Skill name (leading: `utility-html-template`; alternatives in brief Section 7).
- Milestone target. v2.12.0 backlog already holds 8 efforts; F-37 likely slots to v2.13.0 or later.
- Hand-crafted pilot first vs generator-first authoring pattern.
- Scope boundary against F-22/F-23 documented in the spec to prevent drift.

## Status transitions

- **Discovery** (current). strategy brief written, approach provisional
- **Scoped**. specification written, approach confirmed, milestone assigned
- **In Progress**. pilot implementation begins
- **Shipped**. on the milestone release tag
