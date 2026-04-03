# v2.5.0 Checklist - Persona Skill + Foundation/Utility + Sample Library

Status: Released (`v2.5.0` published; `M-10` content-alignment gate remained closed through cut/publish)  
Release type: Minor  
Last updated: 2026-03-03 (release + publish artifacts verified; `F-03` + `F-04` remain deferred)

## 1) Scope Definition (Static)

In scope for `v2.5.0`:
1. `M-09-foundation-utility-skill-structure-expansion`.
2. `F-02-persona-skill` and stable `/persona` command.
3. `M-10-skill-sample-outputs-library` with canonical manifest policy.

Deferred from `v2.5.0` (future release pickup):
1. `F-03-persona-library-tier-0`.
2. `F-04-persona-mcp-exposure-parity`.
3. `M-08-slash-command-help-and-guide-modes`.
4. `M-11-claude-plugin-packaging`.

Included effort mirrors for active `v2.5.0` scope:
1. `docs/internal/efforts/F-02-persona-skill.md` (GitHub issue: `TBD`)
2. `docs/internal/efforts/M-09-foundation-utility-skill-structure-expansion.md` (GitHub issue: `TBD`)
3. `docs/internal/efforts/M-10-skill-sample-outputs-library.md` (GitHub issue: `TBD`)

Deferred effort mirrors (tracked, non-blocking for `v2.5.0`):
1. `docs/internal/efforts/F-03-persona-library-tier-0.md`
2. `docs/internal/efforts/F-04-persona-mcp-exposure-parity.md`

## 2) Decision Finalization (`D3-D13`)

Decision status is policy-complete:
- [x] Decision packet baseline locked for `D3-D12` and `D13`.
- [x] `B-05` reopened/superseded for foundations inclusion in `v2.5.0`.
- [x] `B-06` updated where Q5 assumptions were impacted by `M-09`.
- [x] `F-02` inclusion is fixed for `v2.5.0`, and product/marketing output template contract is locked.

## 3) Implementation Progress by Effort

Legend:
1. `done` = implemented and evidenced.
2. `partial` = materially landed, but release/hardening gate still open.
3. `deferred` = explicitly out of this release lane.

| Effort | Spec Status | Code Landed | Tests/Validation | Docs Synced | Quality Complete | Release Ready | Current Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `M-09-foundation-utility-skill-structure-expansion` | done | done | done | done | done | yes | D9 categorized drift checks and D10 embed invariants are codified and passing |
| `F-02-persona-skill` | done | done | done | done | done | yes | Inclusion fixed for `v2.5.0`; output contract locked to product/marketing templates with `buyer` alias normalization |
| `M-10-skill-sample-outputs-library` | done | done | done | done | done | yes | Structural and content-alignment checks closed with explicit review evidence |
| `F-03-persona-library-tier-0` | deferred | deferred | deferred | deferred | deferred | n/a | Deferred from `v2.5.0`; tracked for future release pickup |
| `F-04-persona-mcp-exposure-parity` | deferred | deferred | deferred | deferred | deferred | n/a | Deferred from `v2.5.0`; tracked for future release pickup |

## 4) Release-Cut Gates (Blocking)

Closed gates:
- [x] Signed governance updates exist and are reflected in tracked planning docs.
- [x] `validate-mcp-sync` passes in block mode on candidate refs.
- [x] `M-09` deterministic taxonomy/naming behavior is codified and validated.
- [x] `F-02` inclusion and output contract are locked and documented.
- [x] `library/skill-output-samples/manifest.v2.5.0.json` is finalized and structurally coverage-verified.
- [x] D12 scenario counts are locked to `f02-included` (`actualSkillCount=25`, `actualSampleCount=84`).

Blocking gates (all closed):
- [x] `M-10-skill-sample-outputs-library` content aligns with v2.4 output/config contracts and shipped behavior.

Deferred (non-blocking for this release cut):
- [ ] `F-03` future release pickup.
- [ ] `F-04` future release pickup.

Current evidence baseline for `M-10` gate closure:
1. Structural completeness is proven (`library/skill-output-samples/manifest.v2.5.0.json` locked to `f02-included`; totals `25/84`).
2. Content-alignment closure is summarized in `docs/internal/release-plans/v2.5.0/M-10-closure-summary.md`.
3. Release-matrix checks are green on candidate refs with updated `2.5.0` pin metadata.

### M-10 Closure Evidence Block (2026-03-02 17:57 PT rerun)

This block captures release-matrix execution status, `M-10` review evidence, and final pin checks.
This block closes `M-10`.

1. `powershell -ExecutionPolicy Bypass -File scripts/validate-commands.ps1` -> pass.
2. `powershell -ExecutionPolicy Bypass -File scripts/lint-skills-frontmatter.ps1` -> pass.
3. `$env:VALIDATE_MCP_SYNC_MODE='block'; $env:PM_SKILLS_MCP_PATH='../pm-skills-mcp'; node .github/scripts/validate-mcp-sync.js` -> pass (`skills in pm-skills=25`, `skills in pm-skills-mcp=25`, no categorized drift findings).
4. `rg -n '"status"|"actualSkillCount"|"actualSampleCount"' library/skill-output-samples/manifest.v2.5.0.json` -> pass (`status=f02-included`, `actualSkillCount=25`, `actualSampleCount=84`).
5. In `pm-skills-mcp`:
   - `$env:PM_INCLUDE_PERSONAS='false'; node scripts/embed-skills.js ../pm-skills/skills` -> pass (`25` skills embedded, `75` files, persona embedding disabled by default).
   - `npm run build` -> pass.
   - `npm test` -> pass (`8` test files, `81` tests).
6. `M-10` content-alignment review closure evidence:
   - Structural audit command:
     - `@' ... '@ | node -` (inline corpus audit script) -> `M10_STRUCTURAL_AUDIT PASS files=84 required_keys=8`.
   - Tracked closure summary: `docs/internal/release-plans/v2.5.0/M-10-closure-summary.md`.
   - Meta-review appendix (Claude Sonnet 4.6) confirms closure verdict and classifies remaining quality/thread-fidelity observations as non-blocking for `v2.5.0`.
   - Corpus checks: `84/84` sample files present; `84/84` include valid frontmatter and `Scenario/Prompt/Output` sections in order.
   - Prompt-format normalization defects were corrected in affected Workbench samples (fenced slash-command prompts + required frontmatter).
   - Non-blocking residual: `foundation-persona` sample outputs align to the published EXAMPLE dossier structure while `TEMPLATE.md` remains a separate contract-format follow-up.
7. `pm-skills-mcp` pin/version check:
   - `package.json` version: `2.5.0`.
   - `pm-skills-source.json`: `pmSkillsVersion=2.5.0`, `outputContractVersion=2.5.0`, `configContractVersion=2.5.0`, `pmSkillsRef=5586c98c0d0ca77c763440b58d266d2029ae2719`.
   - `validate-mcp-sync` block mode confirms parity with latest release version `2.5.0`.

## 5) Readiness Verdict

Current verdict: **Released**.

All blocking gates are closed.

### Post-Cut Artifact Evidence (2026-03-03 PT)

1. `pm-skills` release published: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.0`.
2. `pm-skills` release workflow success: `https://github.com/product-on-purpose/pm-skills/actions/runs/22634316074`.
3. `pm-skills-mcp` release published: `https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.5.0`.
4. `pm-skills-mcp` publish workflow success: `https://github.com/product-on-purpose/pm-skills-mcp/actions/runs/22634768064`.
5. npm artifact verification: `npm view pm-skills-mcp version` -> `2.5.0`, `dist-tags.latest=2.5.0`.

## Canonical References

1. `docs/internal/release-plans/v2.5.0/README.md`
2. `docs/internal/release-plans/v2.5.0/execution-plan.md`
3. `docs/internal/release-plans/v2.5.0/B-05_B-06-closure-path.md`
4. `docs/internal/release-plans/v2.5.0/M-10-closure-summary.md`
5. `docs/releases/Release_v2.5.0.md`
6. `CHANGELOG.md`
