# PM-Skills v2.5.0 Release Notes

Date: 2026-03-03  
Status: Released (`v2.5.0` tag + GitHub release published)

## Summary

`v2.5.0` is the persona-skill + foundation/utility + sample-library lane.
Scope includes persona capability, taxonomy updates, and sample-library closure.

Persona capability inclusion decision for this release lane: **in** (`foundation-persona` is included).
Persona output contract is **locked** for this lane to the final `product` and `marketing` templates.
Generated `/persona` output modes in current `v2.5.0` guidance are `product` and `marketing` (`buyer` alias maps to `marketing`).
Generated `/persona agent` mode is out of scope.
Release-cut scenario lock: **persona included** (manifest currently reports `25` shipped skills and `84` sample files).

Deferred from `v2.5.0`:
1. Persona archetype library shipment.
2. Full persona MCP exposure parity shipment.

## BREAKING CHANGES

`v2.5.0` uses an explicit compatibility-signaling approach:
1. Release labels remain aligned at `v2.5.0` across repos.
2. MCP contract-impacting changes are explicitly disclosed here and in `CHANGELOG.md`.
3. Migration guidance was completed before release cut and is part of the published release baseline.

### Who Is Affected

1. MCP consumers that parse skill metadata or markdown list/search outputs with strict schemas.
2. Automation/scripts with strict tool/resource count assertions or static allowlists.
3. Custom skill packs that would generate derived tool-name collisions at startup.

### MCP Migration Matrix

| ID | Surface | `v2.4.x` | `v2.5.0` | Change Type | Migration Action | Alias/Removal | Automation Impact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `MIG-01` | Skill metadata taxonomy | `phase` effectively treated as required for all skills | `classification` is explicit; `phase` may be `null` for `foundation`/`utility` skills | Breaking for strict schema consumers | Accept `phase: null` and parse `classification` (`domain \| foundation \| utility`) | No alias layer | Update typed clients/validators for nullable phase |
| `MIG-02` | `pm_list_skills` output shape | Phase-only grouping | Phase grouping plus non-phase classification sections | Breaking for brittle markdown parsers | Parse tool IDs and metadata, not heading order alone | No alias layer | Update snapshot/string-matching tests |
| `MIG-03` | `pm_search_skills` result metadata | `Phase` always expected to be a lifecycle phase | `Phase` may be `n/a`; `Classification` is always emitted | Breaking for strict regex/schema parsers | Allow `Phase: n/a`; consume `Classification` field | No alias layer | Update extraction/parsing rules |
| `MIG-04` | Tool inventory | 36 tools (24 skills + 5 workflows + 7 utilities) | 38 tools (25 skills + 5 workflows + 8 utilities) | Additive | Update allowlists/count checks; include `pm_persona` and retained `pm_list_personas` compatibility utility | No deprecated IDs removed | Refresh tooling that asserts fixed counts |
| `MIG-05` | Tool derivation/collision policy | Derivation behavior did not hard-fail on all namespace collision scenarios | Namespace-aware derivation (`phase` + `classification`) with startup hard-fail on collisions | Breaking for custom conflicting skill packs | Rename conflicting skills before deploy; do not rely on per-skill `toolName` override | No override mechanism introduced | CI/runtime now fails fast on collisions |
| `MIG-06` | Persona command/tool mapping | No persona capability | Internal skill `foundation-persona`, command `/persona`, MCP tool `pm_persona` | Additive | Add `/persona`/`pm_persona` to docs and automation allowlists | No alias/removal needed | Update command/tool inventory checks |

### Migration Steps

1. Update MCP consumer schemas to support two-axis metadata (`classification` plus nullable `phase`) per `MIG-01` and `MIG-03`.
2. Update parser logic for `pm_list_skills`/`pm_search_skills` to tolerate classification sections and `Phase: n/a` (`MIG-02`, `MIG-03`).
3. Refresh strict inventory checks to new tool counts and include persona command/tool surfaces (`MIG-04`, `MIG-06`).
4. Validate custom skill packs for deterministic derived-tool uniqueness; rename conflicts before server startup (`MIG-05`).
5. Treat persona-library payload as optional in `v2.5.0`: `pm_list_personas` can return empty results in default builds where persona embedding is disabled.

### Verification

1. Run `powershell -ExecutionPolicy Bypass -File scripts/lint-skills-frontmatter.ps1`.
2. Run `powershell -ExecutionPolicy Bypass -File scripts/validate-commands.ps1`.
3. Run `VALIDATE_MCP_SYNC_MODE=block PM_SKILLS_MCP_PATH=../pm-skills-mcp node .github/scripts/validate-mcp-sync.js`.
4. Run `npm run embed-skills && npm run build && npm test` in `pm-skills-mcp`.
5. Confirm `library/skill-output-samples/manifest.v2.5.0.json` is locked to the persona-included scenario with current `25/84` counts.

## Delivered Scope

1. Persona skill and stable `/persona` command behavior (product/marketing output modes in canonical guidance).
2. Foundation/utility taxonomy architecture behavior.
3. Sample outputs library lane with canonical manifest policy (`3` per phase skill; expanded `12` for `foundation-persona`).

## Deferred Scope (Future Release)

1. Persona archetype library content shipment.
2. Persona MCP exposure parity shipment.

## Release Gates

1. Decision and governance baseline locked before cut.
2. Persona inclusion gate is fixed to `in` and reflected in release artifacts with a locked template contract.
3. Canonical tracked docs for `/persona` mode guidance are consistent on product/marketing-only generated output scope.
4. `library/skill-output-samples/manifest.v2.5.0.json` is locked to the persona-included scenario (`25/84`) and coverage-verified per manifest policy.
5. `BREAKING CHANGES` and migration matrix sections are completed before tagging.
6. Cross-repo validation matrix is green on candidate refs.
7. Sample-library content-alignment gate is closed with explicit evidence in `docs/internal/release-planning/checklist_v2.5.0.md`.

Current readiness verdict:
1. **Released** (all blocking gates were closed at cut time).

## Published Artifacts

1. GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.0`.
2. Release workflow: `https://github.com/product-on-purpose/pm-skills/actions/runs/22634316074` (success).
3. Cross-repo publish evidence: `pm-skills-mcp` release `v2.5.0` published to npm (`latest=2.5.0`).

Evidence commands for gate truth:
1. `rg -n "Blocking gates \\(all closed\\)|Current verdict|sample-library" docs/internal/release-planning/checklist_v2.5.0.md`
2. `rg -n '"status"|"actualSkillCount"|"actualSampleCount"' library/skill-output-samples/manifest.v2.5.0.json`
3. `powershell -ExecutionPolicy Bypass -File scripts/lint-skills-frontmatter.ps1`
4. `powershell -ExecutionPolicy Bypass -File scripts/validate-commands.ps1`

## Canonical References

1. `docs/internal/release-planning/checklist_v2.5.0.md`
2. `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
3. `docs/internal/delivery-plan/v2.5/v2.5-persona-builder-library-implementation-spec.md`
4. `library/skill-output-samples/manifest.v2.5.0.json`
