# PM-Skills Action Plan (v2)

> **Date**: 2026-03-22 | **Author**: Claude Opus 4.6 | **Status**: Post-separation revision
> **Supersedes**: `02_action-plan.md` (pre-separation, 2026-03-21)
> **Companion**: `01_executive-brief_v2.md` (decisions and rationale)
> **Execution detail**: `04_next-efforts.md` (agent-executable steps, human decision gates)

---

## How to Use This Document

This document owns **sequencing, phasing, and dependencies**. For detailed execution specs (scripts to create, done-when checklists, agent-executable steps), see `04_next-efforts.md`.

---

## Phase 1: Quality Foundation And Packaging Boundary (v2.7)

**Theme**: Ship the CI safety net, one new skill, the release ZIP packaging boundary, and the repo-specific skill builder.
**Total effort**: ~6-8 effort-days | **Dependencies**: None

| # | Item | Effort | Depends on | Detail in 04 |
|---|------|--------|------------|-------------|
| 0 | Marketplace submission | 30 min | Nothing | Effort 0 |
| 1.1 | CI validation enhancement | 0.5-1 day | Nothing | Effort 1 |
| 1.2 | `deliver-acceptance-criteria` | 2 days | Nothing | Effort 3 |
| 1.3 | Exclude `docs/internal/**` from release ZIP | 0.5 day | Nothing | Effort M-16 |
| 1.4 | `utility-pm-skill-builder` + `/pm-skill-builder` | 3-5 days | 1.1 | Effort 2 |

**Why this order**: CI must exist before the builder ships so the builder's output can be validated. `deliver-acceptance-criteria` is an independent quick win and now part of the `v2.7.0` release scope. M-16 closes the release-packaging leak before the final `v2.7.0` cut. Marketplace submission is still independent and can happen anytime.

---

## Phase 2: Release & Community (v2.8)

**Theme**: Release automation, community readiness, and repo-wide quality cleanup.
**Total effort**: ~6-8 effort-days | **Dependencies**: Phase 1 for CI

| # | Item | Effort | Depends on | Detail in 04 |
|---|------|--------|------------|-------------|
| 2.1 | Release automation enhancement | 2+ days | 1.1 | Effort 5 |
| 2.2 | MCP sync automation | 2-3 days | 2.1 | Effort 5 |
| 2.3 | Community contribution setup | 1 day | 1.1 | Effort 6 |
| 2.4 | Convention alignment pass | 1-2 days | 1.1 | Effort 4 |

**Why this grouping**: Release automation and community setup are both "make the repo ready for others" work. Convention alignment should happen before community contributions start. The short-term packaging boundary fix (M-16) belongs in v2.7; the deeper automation work stays here.

---

## Phase 3: Domain Expansion (v2.9)

**Theme**: New domain skills and the general agent skill builder.
**Total effort**: ~8-13 effort-days | **Dependencies**: Phase 1 for CI

| # | Item | Effort | Depends on | Detail in 04 |
|---|------|--------|------------|-------------|
| 3.1 | `discover-market-sizing` | 2-3 days | Nothing | Effort 7 |
| 3.2 | `measure-survey-analysis` | 2-3 days | Nothing | Effort 8 |
| 3.3 | `utility-agent-skill-builder` + `/agent-skill-builder` | 3-5 days | 1.2 | (new — not yet in 04) |

**Why this grouping**: Domain skills are independent and can be built in any order or in parallel. The agent skill builder depends on the pm-skill-builder proving the pattern first.

---

## Parallel Track Map

```
Track A (Infrastructure):    CI Enhancement → Release ZIP Boundary → Release Automation → MCP Sync
Track B (Builder + Quality): pm-skill-builder → convention alignment → community setup
Track C (Domain Skills):     acceptance-criteria → market-sizing → survey-analysis → agent-skill-builder
```

Tracks A-C are independent. Within each track, items are sequential.

---

## What Changed from v1

| v1 (pre-separation) | v2 (post-separation) | Why |
|---------------------|---------------------|-----|
| 4 phases, included workspace features | 3 phases, skill library only | Knowledge OS separation |
| Project manager, doc updater, hooks, output styles | Removed | Moved to Knowledge OS |
| Foundation skill builder (ambiguous naming) | `utility-agent-skill-builder` (distinct name, clear scope) | Naming decision resolved |
| CI described as greenfield | CI described as enhancement | Existing scripts already cover ~70% |
| No packaging-boundary effort | `M-16` added to v2.7 | F-05 staging/release-packaging review exposed a release artifact leak |
| Release automation from scratch | Release automation enhancement | Existing workflow already handles tag-triggered releases |
| 5 parallel tracks | 3 parallel tracks | Fewer moving parts |

---

## Decision Checklist

### Resolved
- [x] Builder naming — `/pm-skill-builder` (repo-specific, Phase 1) + `/agent-skill-builder` (general PM capability, Phase 3)
- [x] Script convention — `.sh + .ps1 + .md` (extend existing pattern)
- [x] Knowledge OS separation — workspace features are a separate initiative

### Before Phase 2
- [ ] MCP sync: automated dispatch (needs PAT secret) or manual?
- [ ] Convention alignment: fix everything CI catches, or also improve content quality?
- [ ] Accept community skill proposals via GitHub issues? Require approval before PR?

### Before Phase 3
- [ ] Which new domain skill to build first?
