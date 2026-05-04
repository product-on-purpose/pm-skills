# v2.13 CI Refactor: Execution Plan

**Status:** Plan (not yet executed)
**Cycle:** v2.13.0
**Created:** 2026-05-03 (initial); 2026-05-03 (trimmed to thin execution tracker per audit + plan pair convention)
**Spec source:** [`../../audit/ci-audit_2026-05-03.md`](../../audit/ci-audit_2026-05-03.md) Sections 10 (plan summary) and 16 (implementation specifications)
**Convention:** Per [`../../audit/README.md`](../../audit/README.md) audit + plan pair convention

> **What this is.** A thin execution tracker for v2.13.0 CI work. Implementation specifications, analysis, findings, best practices, and recommendations all live in the audit. This plan tracks WHEN, STATUS, and DECISIONS made during execution.
>
> **Dedup rule:** each fact lives in exactly one place. If you want to know HOW to build a validator, read the audit Section 16. If you want to know WHEN it ships and what its current status is, read this plan.

---

## Scope summary

v2.13.0 ships 14 items from the 2026-05-03 CI audit plan:

- **Items 1-4** (PowerShell parity bugfixes): audit Sections 5.1.1-5.1.4
- **Items 5-12** (existing-script change + 7 new validators + F-36 family validator): audit Section 16

All 14 items are in scope. Sequencing across 3 waves per audit Section 10. No items deferred from the audit's plan.

**Net surface delta:** validator inventory grows from 17 to 24. Enforcing tier grows from 5 to 11. Bash + PS1 dual-stack maintained for v2.13 (consolidation decision deferred to v2.14.0+ per audit Section 9).

---

## Status tracking

| # | Item | Audit ref | Wave | Status | PR |
|---|---|---|---|---|---|
| 1 | Fix `check-stale-bundle-refs.ps1` reserved-word bug | 5.1.1 | 1 | Not started | - |
| 2 | Fix `check-workflow-coverage.ps1` Join-Path | 5.1.2 | 1 | Not started | - |
| 3 | Fix `check-generated-freshness.ps1` Join-Path | 5.1.3 | 1 | Not started | - |
| 4 | Fix `lint-skills-frontmatter.ps1` path-detection | 5.1.4 | 1 | Not started | - |
| 5 | Tighten `check-count-consistency` regex; promote enforcing | 16.1 | 1 | Not started | - |
| 6 | New: `check-nav-completeness` | 16.2 | 1 | Not started | - |
| 7 | New: `check-generated-content-untouched` | 16.3 | 2 | Not started | - |
| 8 | New: `validate-references-cross-doc` | 16.4 | 2 | Not started | - |
| 9 | New: `validate-docs-frontmatter` | 16.5 | 3 | Not started | - |
| 10 | New: `check-internal-link-validity` | 16.6 | 3 | Not started | - |
| 11 | New: `check-version-references` | 16.7 | 3 | Not started | - |
| 12 | F-36: `validate-skill-family-registration` | 16.8 | 3 | Not started | - |

**Status legend:** Not started / In progress / Done / Blocked. Update during cycle execution.

---

## Sequencing

Three waves matching audit Section 10. Each wave is internally parallelizable; dependencies cross wave boundaries.

### Wave 1: Prerequisites (week 1-2)

**Items 1-6.** PS bug fixes + count-CI tighten + nav-completeness validator. None depend on Bucket A architectural decisions; all can run in parallel.

**Verification gate at end of Wave 1:**

- All 5 PS1 scripts pass on Windows leg of `validation.yml` (no parse errors, no false positives)
- `check-count-consistency` enforcing on current-state files passes on `main`
- `check-nav-completeness` enforcing passes on `main` (after `docs/reference/README.md` and any other unwired files are addressed; note Bucket A will reshape this set)

### Wave 2: After Bucket A architectural decisions land (week 2-3)

**Items 7-8.** Generated-content protection and cross-doc reference validation. Both depend on the file set stabilizing post-Bucket A (duplicate file deletion, `docs/frameworks/` retirement).

**Pairs with Bucket A:** item 7 pairs with Pattern 5C frontmatter flag (Bucket A item F-46). Item 8 needs accurate file set.

### Wave 3: Durable improvements (week 3-5)

**Items 9-12.** Independent improvements; can run in any order.

---

## CI workflow integration

After v2.13 ships, `validation.yml` grows by 7 new validator jobs. Per existing convention, each validator follows the `.sh` + `.ps1` + `.md` triplet pattern and is enforced via the `validate-script-docs.sh` meta-validator.

**New jobs in `validation.yml`** (added under existing `enforcing` and `advisory` sections):

```yaml
# Enforcing
- name: Check nav completeness
  run: bash scripts/check-nav-completeness.sh
- name: Check generated content untouched
  run: bash scripts/check-generated-content-untouched.sh
- name: Validate cross-doc references
  run: bash scripts/validate-references-cross-doc.sh
- name: Validate docs frontmatter
  run: bash scripts/validate-docs-frontmatter.sh
- name: Check internal link validity
  run: bash scripts/check-internal-link-validity.sh
- name: Validate skill family registration
  run: bash scripts/validate-skill-family-registration.sh

# Advisory
- name: Check version references
  run: bash scripts/check-version-references.sh
  continue-on-error: true
```

**Posture changes for existing scripts:**

```yaml
# check-count-consistency: was advisory, now enforcing for current-state
- name: Check count consistency (current-state)
  run: bash scripts/check-count-consistency.sh --current-state
- name: Check count consistency (historical, advisory)
  run: bash scripts/check-count-consistency.sh --historical
  continue-on-error: true
```

Windows leg of matrix mirrors the same job set with `pwsh` invocations.

---

## Pre-release verification gates

Before v2.13.0 tag, verify CI cleanliness:

- [ ] All 5 PS parity bugfixes land and PS1 versions match bash output on current main
- [ ] `check-count-consistency` tightened regex passes against current state (no pre-existing violations introduced)
- [ ] All 7 new validators pass against current state (any pre-existing violations addressed in their respective Bucket A/B fixes)
- [ ] `validation.yml` updated with new job entries; both Ubuntu and Windows legs green
- [ ] `validate-script-docs.sh` confirms all 24 validators have triplet completeness
- [ ] At least one Codex round of adversarial review on the new validators themselves (logic correctness, false-positive risk)

---

## Decisions journal

Decisions made during execution (not pre-locked in the audit). Append-only log.

| Date | Decision | Context | Audit impact |
|---|---|---|---|
| 2026-05-03 | Audit + plan split executed; spec lives in audit Section 16, status here. | Codified at `docs/internal/audit/README.md`. | None (organizational, not analytical) |

---

## Open questions (execution-time)

For analytical questions (lychee vs alternatives, family-registry path, count-CI MinThreshold), see audit Section 12. Those questions are answered in the audit; this section captures only execution-time questions that emerge during the cycle.

(empty at start of cycle)

---

## Related

- **Spec source:** [`../../audit/ci-audit_2026-05-03.md`](../../audit/ci-audit_2026-05-03.md) Sections 10 + 16
- **Convention:** [`../../audit/README.md`](../../audit/README.md)
- **Release plan:** [`./plan_v2.13.0.md`](plan_v2.13.0.md) Bucket C
- **v2.11.0 codified Phase 0 Adversarial Review Loop pattern:** [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- **Existing F-36 effort:** `docs/internal/efforts/F-36-generic-family-registration-validator.md`

---

## Change log

| Date | Change |
|---|---|
| 2026-05-03 | Initial CI refactor plan authored. 14 items across 3 waves. |
| 2026-05-03 | Trimmed to thin execution tracker per audit + plan pair convention. Implementation specifications migrated to audit Section 16. Status tracking, sequencing, CI integration, pre-release gates, and decisions journal retained here. |
