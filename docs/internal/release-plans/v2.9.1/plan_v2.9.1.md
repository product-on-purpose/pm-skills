# v2.9.1 Release Plan — Workflow Docs & CI Consistency

Status: Planning
Owner: Maintainers
Type: Patch release

## Release Theme

**Documentation quality and CI guardrails** — dedicated workflow guide, documentation count consistency CI, and cleanup from v2.9.0.

---

## Context

v2.9.0 shipped 9 workflows successfully, but manual review revealed:
- No dedicated guide for choosing and using workflows (guidance scattered across 3 files)
- Several docs pages had stale counts (3 instead of 9) because no CI catches hardcoded numbers
- These were fixed manually but the underlying problem — no automated detection — remains

This patch release adds the guide and the CI to prevent recurrence.

---

## Efforts

| ID | Name | Type | Effort Brief |
|----|------|------|-------------|
| **D-05** | [Workflows Guide](../../efforts/D-05-workflows-guide.md) | Documentation | Dedicated using-workflows.md with decision tree and comparison matrix |
| **M-20** | [Docs Count Consistency CI](../../efforts/M-20-docs-count-consistency-ci.md) | Infrastructure | 3 new validation scripts for workflow coverage, count consistency, and generated-page freshness |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | v2.9.1 (patch) | No new skills, commands, or workflows. Documentation + CI only. |
| **Scope** | D-05 + M-20 only | Keep it tight. F-12 (skill quality convergence) is a larger effort for a future minor. |

---

## Deliverables

### D-05: Workflows Guide

| File | Description |
|------|------------|
| `docs/guides/using-workflows.md` | Dedicated guide with decision tree, comparison matrix, invocation guide |
| Updated `mkdocs.yml` | New nav entry under Guides |
| Updated `docs/guides/using-skills.md` | Trim workflow section, link to dedicated guide |
| Updated `docs/workflows/index.md` | Link to guide, expand intro |

### M-20: Count Consistency CI

| File | Description |
|------|------------|
| `scripts/check-workflow-coverage.sh` + `.ps1` | Verifies workflow files have matching commands, docs, AGENTS.md entries |
| `scripts/check-count-consistency.sh` + `.ps1` | Detects stale hardcoded counts across docs |
| `scripts/check-generated-freshness.sh` + `.ps1` | Verifies docs/workflows/ matches generation script output |
| Updated `.github/workflows/validation.yml` | 3 new advisory checks |

---

## Verification Plan

1. `mkdocs build --strict` passes
2. All validation scripts pass (existing + 3 new)
3. New guide renders correctly in nav
4. Count consistency script returns 0 against current tree
5. Workflow coverage script returns 0
6. Generated freshness script returns 0

---

## Implementation Approach

Single commit. Both efforts are independent and can be developed in parallel.
