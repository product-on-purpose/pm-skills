# v2.9.1 Release Plan . Workflow Docs & CI Consistency

Status: Planning
Owner: Maintainers
Type: Patch release

## Release Theme

**Documentation quality and CI guardrails** - dedicated workflow guide, documentation count consistency CI, script documentation enforcement, and cleanup from v2.9.0.

---

## Context

v2.9.0 shipped 9 workflows successfully, but manual review revealed:
- No dedicated guide for choosing and using workflows (guidance scattered across 3 files)
- Several docs pages had stale counts (3 instead of 9) because no CI catches hardcoded numbers
- These were fixed manually but the underlying problem - no automated detection - remains

This patch release adds the guide, the count CI, and a new script-docs
enforcement CI that ensures every script ships with documentation.

---

## Efforts

| ID | Name | Type | Effort Brief | Specification |
|----|------|------|-------------|---------------|
| **D-05** | [Workflows Guide](../../efforts/D-05-workflows-guide.md) | Documentation | [brief](../../efforts/D-05-workflows-guide.md) | [spec](../../efforts/D-05-workflows-guide/specification.md) |
| **M-20** | [Docs Count Consistency CI](../../efforts/M-20-docs-count-consistency-ci.md) | Infrastructure | [brief](../../efforts/M-20-docs-count-consistency-ci.md) | [spec](../../efforts/M-20-docs-count-consistency-ci/specification.md) |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | v2.9.1 (patch) | No new skills, commands, or workflows. Documentation + CI only. |
| **Scope** | D-05 + M-20 + script-docs CI | Keep it tight. |
| **Script docs enforcement** | New CI: `validate-script-docs.sh/.ps1` | Ensures every `.sh`/`.ps1` pair has a companion `.md`. Catches this class of issue permanently. |

---

## Deliverables

### D-05: Workflows Guide

| File | Description | Status |
|------|------------|--------|
| `docs/guides/using-workflows.md` | Dedicated guide: decision tree, comparison matrix, invocation, customization | Not started |
| Updated `mkdocs.yml` | New nav entry under Guides | Not started |
| Updated `docs/guides/using-skills.md` | Trim workflow section, link to dedicated guide | Not started |
| Updated `docs/workflows/index.md` | Link to guide, expand intro | Not started |

### M-20: Count Consistency CI

| File | Description | Status |
|------|------------|--------|
| `scripts/check-workflow-coverage.sh` + `.ps1` | Verify workflow files have matching entries across repo | Not started |
| `scripts/check-workflow-coverage.md` | Companion documentation | Not started |
| `scripts/check-count-consistency.sh` + `.ps1` | Detect stale hardcoded counts in docs | Not started |
| `scripts/check-count-consistency.md` | Companion documentation | Not started |
| `scripts/check-generated-freshness.sh` + `.ps1` | Verify generated workflow pages match source | Not started |
| `scripts/check-generated-freshness.md` | Companion documentation | Not started |
| Updated `.github/workflows/validation.yml` | 3 new advisory checks | Not started |
| Updated `scripts/README_SCRIPTS.md` | Document new scripts in catalog and detailed docs table | Not started |

### Script Documentation Enforcement CI (new, added to this release)

| File | Description | Status |
|------|------------|--------|
| `scripts/validate-script-docs.sh` + `.ps1` | CI: every `.sh`/`.ps1` pair must have a companion `.md` | Not started |
| `scripts/validate-script-docs.md` | Companion documentation (self-referential: this script enforces what it also follows) | Not started |
| Updated `.github/workflows/validation.yml` | New check | Not started |
| Updated `scripts/README_SCRIPTS.md` | Add entry for validate-script-docs | Not started |

### Release Artifacts

| File | Description | Status |
|------|------------|--------|
| `CHANGELOG.md` | v2.9.1 entry under `### Added` (guide) and `### Changed` (CI) | Not started |
| `README.md` | No count changes expected (patch release, no new skills) | Verify only |
| `docs/releases/Release_v2.9.1.md` | Release notes document | Not started |
| `docs/releases/index.md` | Add v2.9.1 row to version table | Not started |
| `.claude-plugin/plugin.json` | Version bump to 2.9.1 | At tag time only |
| `marketplace.json` | Version bump to 2.9.1 | At tag time only |

---

## CI That Applies

| Workflow | Checks | Notes |
|----------|--------|-------|
| `lint-skills-frontmatter` | No new skills - existing check still runs | Must pass |
| `validate-commands` | No new commands - existing check still runs | Must pass |
| `validate-agents-md` | No new skills - existing check still runs | Must pass |
| `validate-version-consistency` | plugin.json == marketplace.json | Must pass |
| `validate-gitignore-pm-skills` | `_pm-skills/` in `.gitignore` | Advisory |
| `validate-script-docs` (new) | Every script pair has companion `.md` | Advisory initially |
| `check-workflow-coverage` (new, M-20) | Workflow cross-reference coverage | Advisory |
| `check-count-consistency` (new, M-20) | Stale hardcoded counts | Advisory |
| `check-generated-freshness` (new, M-20) | Generated page drift | Advisory |

---

## Verification Plan

Before tagging:
- [ ] `mkdocs build --strict` passes with zero warnings
- [ ] All existing validation scripts pass
- [ ] New M-20 scripts pass against current tree (no false positives)
- [ ] `validate-script-docs` passes (all scripts have companion docs)
- [ ] `validate-version-consistency` passes
- [ ] CHANGELOG entry written
- [ ] `docs/releases/Release_v2.9.1.md` written
- [ ] `docs/releases/index.md` updated
- [ ] `scripts/README_SCRIPTS.md` updated with new script entries
- [ ] Using-workflows guide renders correctly in nav
- [ ] No references to `docs/internal/` in shipped content

---

## Implementation Approach

### Commit strategy

| # | Commit scope | Contents |
|---|-------------|----------|
| 1 | D-05 workflows guide | `using-workflows.md`, mkdocs.yml, update using-skills.md, update workflows/index.md |
| 2 | M-20 CI scripts + docs | 6 scripts (3 pairs), 3 companion .md files, validation.yml updates |
| 3 | Script-docs CI | `validate-script-docs.sh/.ps1/.md`, validation.yml, README_SCRIPTS.md |
| 4 | Release artifacts | CHANGELOG, Release_v2.9.1.md, releases/index.md |
| 5 | Release | Version bumps in plugin.json + marketplace.json, tag v2.9.1 |

### Execution order

```
D-05 (guide) ──────────────┐
M-20 (CI scripts) ─────────┤
Script-docs CI ─────────────┤
                            ├── README_SCRIPTS.md update (depends on all scripts existing)
                            ├── Run all CI locally to verify
                            └── Release artifacts → version bump → tag
```

D-05, M-20, and script-docs CI are independent and can be done in parallel.

---

## Open Questions

1. **Should `validate-script-docs` be advisory or hard-fail?** Recommendation:
   advisory in v2.9.1, promote to hard-fail in v2.10.0 after one cycle.
2. **Should `check-count-consistency` check README.md counts?** README has
   many count references - could be noisy. May need an exclusion pattern for
   counts inside badges or historical context.
