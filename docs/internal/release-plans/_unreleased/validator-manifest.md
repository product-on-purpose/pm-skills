# Validator-Inventory Manifest (audit Spec A)

**Status:** SHIPPED to branch `chore/spec-a-validator-manifest` (PR pending); banked for the next maintenance tag. Untagged maintenance, no consumable-surface change (catalog stays 65 skills / 5 sub-agents).
**Created:** 2026-06-09
**Owner:** Maintainers
**Type:** infrastructure (release-gate integrity)
**Origin:** the 2026-06-06 Codex audit, Spec A (closes P0-02). The last open audit follow-up; P0-01 shipped in v2.25.1 and P1-01..P1-03 in PR #178.

---

## 1. The problem

The release gate had three hand-maintained shell-validator inventories: `scripts/pre-tag-validate.sh`, `scripts/pre-tag-validate.ps1`, and `.github/workflows/validation.yml`. They drifted before (P0-01: the ps1 bundle referenced two retired validators and omitted one; P0-02: the three ran materially different sets). PR #174 reconciled bash to ps1 by hand but bound nothing to CI, so they could drift again, and had: `validate-skill-family-registration` and `validate-plugin-install` were enforcing in CI yet absent from both local bundles, so a local "ALL CHECKS PASSED" could still meet a red CI leg.

## 2. What shipped

- `scripts/validation-manifest.yaml`: the single source of truth. Each shell validator is declared once with its `pre_tag` tier (required / optional / advisory, or omitted for CI-only), `ci` level (enforcing / advisory), and per-shell args.
- `scripts/check-validator-parity.mjs` (+ `check-validator-parity.test.mjs`, 11 tests): the referee. Parses the manifest plus both bundles plus `validation.yml` and fails on any drift (tier-set, flag, CI presence, or enforcing-level). Pure Node builtins plus `js-yaml`; runs enforcing in CI on both OS legs.
- Reconciliation: added the two drifted validators to the required tier of both bundles, and pointed each bundle's inventory comment at the manifest.

## 3. Decisions

- **Drift-gate, not codegen.** Keep the hand-tuned shell runners (color, `--skip`, advisory verdict extraction) and add a referee, rather than generating the bundles from the manifest. Matches the repo's existing drift-gate idiom (`check-route-parity.mjs`, `gen-resource-index.mjs --check`); lower risk than rewriting two working shell scripts.
- **Manifest scope is shell validators only.** Node (`.mjs`) checks, the Astro build, and unit-test steps run once cross-platform with no two-shell duplication, so they sit outside the two-shell-parity remit and remain in `validation.yml` only.
- **Surfaces, not a flat list.** The audit's "all three identical" framing was refined: CI legitimately runs build and Node checks the pure-shell bundle omits, so each validator declares a surface (pre-tag tier vs CI-only) and the referee compares per-surface.

## 4. Acceptance (all met, verified locally)

- [x] PowerShell pre-tag passes (`ALL CHECKS PASSED`, exit 0; both new validators PASS).
- [x] Bash pre-tag passes (`ALL CHECKS PASSED`, exit 0).
- [x] Both bundles list the same required validator IDs (referee-enforced; 16 required / 4 optional / 1 advisory).
- [x] CI cannot add a shell validator without updating the manifest (referee checks manifest-to-CI and CI-to-manifest; wired into `validation.yml`).

## 5. Links

- Source of truth: `scripts/validation-manifest.yaml`; referee: `scripts/check-validator-parity.mjs` (+ test).
- Audit: `docs/internal/audit/2026-06-06_codex.md` (Spec A, P0-02) and its review `docs/internal/audit/2026-06-06_codex_review.md` (follow-up 6).
