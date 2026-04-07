# PM-Skills Bundle Expansion Plan

> **6 New Workflow Bundles for [pm-skills](https://github.com/product-on-purpose/pm-skills)**
> Prepared: April 5, 2026

---

## Executive Summary

This plan adds six new workflow bundles to pm-skills, expanding from 3 bundles (Feature Kickoff, Lean Startup, Triple Diamond) to 9. Each bundle chains existing skills into a guided, end-to-end workflow with clear handoff points and context flow between steps.

**Priority order (recommended):**

| Priority | Bundle | Primary Use Case | Skills Chained | Est. Complexity |
|----------|--------|-----------------|----------------|-----------------|
| 1 | Customer Discovery | Research-to-insight pipeline | 4 skills | Low |
| 2 | Sprint Planning | Recurring sprint ceremony | 3 skills | Low |
| 3 | Product Strategy | Strategic initiative framing | 5 skills | Medium |
| 4 | Post-Launch Learning | Ship-to-learn feedback loop | 5 skills | Medium |
| 5 | Stakeholder Alignment | Get buy-in from leadership | 4 skills | Low |
| 6 | Technical Discovery | Spike-to-decision pipeline | 3 skills | Low |

---

## Implementation Approach

### Bundle File Convention

Each bundle lives at `_bundles/{bundle-name}.md` and follows the established pattern from the existing three bundles. Each file includes:

- **Header block** with bundle metadata (name, description, skills list, estimated duration)
- **When to Use** section describing ideal scenarios
- **Workflow Steps** with sequential skill invocations and handoff guidance
- **Context Flow** showing how outputs from one skill feed into the next
- **Tips and Variations** for adapting the bundle

### Slash Command Convention

Each bundle gets a corresponding slash command in `commands/`:
- `/discover-customers` (or `/customer-discovery`)
- `/sprint-plan`
- `/strategy`
- `/post-launch`
- `/align-stakeholders`
- `/tech-discovery`

### Rollout Plan

**Phase 1 (immediate):** Ship bundles 1-2 (Customer Discovery, Sprint Planning)
- Lowest complexity, highest frequency of use
- Validates the bundle expansion pattern before scaling

**Phase 2 (fast follow):** Ship bundles 3-4 (Product Strategy, Post-Launch Learning)
- Medium complexity, fills strategic and measurement gaps

**Phase 3 (complete):** Ship bundles 5-6 (Stakeholder Alignment, Technical Discovery)
- Rounds out the collection with niche but valuable workflows

### Testing Checklist (per bundle)

- [ ] All referenced skills exist at correct paths (`skills/{phase-skill}/`)
- [ ] Slash command file created in `commands/`
- [ ] `validate-commands` script passes
- [ ] Bundle exercised end-to-end with a realistic scenario
- [ ] README bundle table updated
- [ ] CHANGELOG entry added
- [ ] AGENTS.md updated with new bundle references

---

## Bundle Summaries

### 1. Customer Discovery

**Path:** `_bundles/customer-discovery.md`
**Command:** `/customer-discovery`
**Skills:** interview-synthesis -> jtbd-canvas -> opportunity-tree -> problem-statement
**Duration:** 2-4 hours
**Use when:** You have raw research (interviews, surveys, support tickets) and need to distill it into a clear problem worth solving.

### 2. Sprint Planning

**Path:** `_bundles/sprint-planning.md`
**Command:** `/sprint-plan`
**Skills:** refinement-notes -> user-stories -> edge-cases
**Duration:** 1-2 hours
**Use when:** You have a prioritized backlog or PRD and need sprint-ready stories with edge case coverage.

### 3. Product Strategy

**Path:** `_bundles/product-strategy.md`
**Command:** `/strategy`
**Skills:** competitive-analysis -> stakeholder-summary -> opportunity-tree -> solution-brief -> adr
**Duration:** 4-8 hours
**Use when:** You are framing a major initiative that needs competitive context, stakeholder alignment, and documented decisions before going to PRD.

### 4. Post-Launch Learning

**Path:** `_bundles/post-launch-learning.md`
**Command:** `/post-launch`
**Skills:** instrumentation-spec -> dashboard-requirements -> experiment-results -> retrospective -> lessons-log
**Duration:** 3-6 hours
**Use when:** A feature has shipped and you need to set up measurement, evaluate results, and capture learnings.

### 5. Stakeholder Alignment

**Path:** `_bundles/stakeholder-alignment.md`
**Command:** `/align-stakeholders`
**Skills:** stakeholder-summary -> problem-statement -> solution-brief -> launch-checklist
**Duration:** 2-4 hours
**Use when:** You need leadership buy-in before committing resources. The audience is executives, not the dev team.

### 6. Technical Discovery

**Path:** `_bundles/technical-discovery.md`
**Command:** `/tech-discovery`
**Skills:** spike-summary -> adr -> design-rationale
**Duration:** 1-3 hours
**Use when:** The question is "should we build this, and how?" rather than "what should we build?" Focused on technical feasibility and architecture decisions.

---

## Overlap and Differentiation Matrix

| Bundle | Overlapping Skills with Existing Bundles | Differentiator |
|--------|----------------------------------------|----------------|
| Customer Discovery | opportunity-tree (Triple Diamond) | Research-first; no solution skills |
| Sprint Planning | user-stories (Feature Kickoff) | Ceremony-focused; includes edge cases |
| Product Strategy | competitive-analysis (Triple Diamond) | Strategy-tier; bridges to ADR |
| Post-Launch Learning | experiment-results (Lean Startup) | Post-ship focus; adds retro + lessons |
| Stakeholder Alignment | problem-statement (Feature Kickoff) | Audience = leadership, not dev team |
| Technical Discovery | adr (Triple Diamond) | Engineering-audience; spike-driven |

---

## Open Questions

1. **Command naming:** Should bundle commands use short names (`/strategy`) or descriptive names (`/product-strategy`)? Existing bundles use both patterns (`/kickoff` vs full name in docs).
2. **Bundle versioning:** Should bundles carry their own version independent of the repo version?
3. **MCP parity:** pm-skills-mcp v2.x will need corresponding tool definitions for each new bundle. Ship bundles first or coordinate?
4. **Acceptance criteria skill:** The new `pm-skill-validate` utility could be used to validate bundle files. Worth adding a bundle-specific validation rule?

---

## File Deliverables

| File | Description |
|------|-------------|
| `_bundles/customer-discovery.md` | Customer Discovery bundle |
| `_bundles/sprint-planning.md` | Sprint Planning bundle |
| `_bundles/product-strategy.md` | Product Strategy bundle |
| `_bundles/post-launch-learning.md` | Post-Launch Learning bundle |
| `_bundles/stakeholder-alignment.md` | Stakeholder Alignment bundle |
| `_bundles/technical-discovery.md` | Technical Discovery bundle |
| `commands/customer-discovery.md` | Slash command (to be created separately) |
| `commands/sprint-plan.md` | Slash command (to be created separately) |
| `commands/strategy.md` | Slash command (to be created separately) |
| `commands/post-launch.md` | Slash command (to be created separately) |
| `commands/align-stakeholders.md` | Slash command (to be created separately) |
| `commands/tech-discovery.md` | Slash command (to be created separately) |
