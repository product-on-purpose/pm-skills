# PM-Skills v2.5.0 Release Notes

Date: 2026-03-03
Status: Released (`v2.5.0` tag + GitHub release published)

## Summary

v2.5.0 introduces the **foundation-persona skill**, expands the skill taxonomy to support foundation/utility classifications, and ships the curated sample-output library.

The new `/persona` command generates product and marketing persona documents (`buyer` is an alias for `marketing`). Agent-mode persona generation is out of scope for this release.

Deferred to a future release:
1. Persona archetype library (pre-built persona templates).
2. Persona MCP exposure parity (full MCP tool coverage for persona workflows).

## BREAKING CHANGES

This release uses the approved compatibility-signaling exception path:
1. Release labels remain aligned at `v2.5.0` across repos.
2. MCP contract-impacting changes are disclosed here and in `CHANGELOG.md`.
3. Migration guidance was completed before the release cut.

### Who Is Affected

1. **MCP consumers** that parse skill metadata or markdown list/search outputs with strict schemas.
2. **Automation/scripts** with strict tool/resource count assertions or static allowlists.
3. **Custom skill packs** that could generate derived tool-name collisions at startup.

### MCP Migration Matrix

| ID | Surface | v2.4.x Behavior | v2.5.0 Behavior | Change Type | Migration Action |
| --- | --- | --- | --- | --- | --- |
| MIG-01 | Skill metadata taxonomy | `phase` required for all skills | `classification` is explicit; `phase` may be `null` for foundation/utility skills | Breaking for strict schema consumers | Accept `phase: null` and parse `classification` (`domain`, `foundation`, `utility`) |
| MIG-02 | `pm_list_skills` output | Phase-only grouping | Phase grouping plus non-phase classification sections | Breaking for brittle markdown parsers | Parse tool IDs and metadata, not heading order alone |
| MIG-03 | `pm_search_skills` results | `Phase` always a lifecycle phase | `Phase` may be `n/a`; `Classification` always emitted | Breaking for strict regex/schema parsers | Allow `Phase: n/a`; consume `Classification` field |
| MIG-04 | Tool inventory | 36 tools (24 skills + 5 workflows + 7 utilities) | 38 tools (25 skills + 5 workflows + 8 utilities) | Additive | Update allowlists/count checks; include `pm_persona` and `pm_list_personas` |
| MIG-05 | Tool derivation/collision policy | Did not hard-fail on all namespace collisions | Namespace-aware derivation with startup hard-fail on collisions | Breaking for conflicting skill packs | Rename conflicting skills before deploy; do not rely on per-skill `toolName` override |
| MIG-06 | Persona command/tool mapping | No persona capability | Skill `foundation-persona`, command `/persona`, MCP tool `pm_persona` | Additive | Add `/persona`/`pm_persona` to docs and automation allowlists |

### Migration Steps

1. Update MCP consumer schemas to support two-axis metadata (`classification` plus nullable `phase`) per MIG-01 and MIG-03.
2. Update parser logic for `pm_list_skills`/`pm_search_skills` to tolerate classification sections and `Phase: n/a` (MIG-02, MIG-03).
3. Refresh strict inventory checks to new tool counts and include persona command/tool surfaces (MIG-04, MIG-06).
4. Validate custom skill packs for deterministic derived-tool uniqueness; rename conflicts before server startup (MIG-05).
5. Treat persona-library payload as optional in v2.5.0: `pm_list_personas` can return empty results in default builds where persona embedding is disabled.

### Verification

1. Run `powershell -ExecutionPolicy Bypass -File scripts/lint-skills-frontmatter.ps1`.
2. Run `powershell -ExecutionPolicy Bypass -File scripts/validate-commands.ps1`.
3. Run `VALIDATE_MCP_SYNC_MODE=block PM_SKILLS_MCP_PATH=../pm-skills-mcp node .github/scripts/validate-mcp-sync.js`.
4. Run `npm run embed-skills && npm run build && npm test` in `pm-skills-mcp`.
5. Confirm `library/skill-output-samples/manifest.v2.5.0.json` reports 25 shipped skills and 84 sample files.

## What's New

1. **Foundation persona skill** — new `foundation-persona` skill with stable `/persona` command (product and marketing output modes).
2. **Foundation/utility taxonomy** — skills can now be classified as `domain`, `foundation`, or `utility`, not just by lifecycle phase.
3. **Sample-output library** — curated sample outputs shipped for all 25 skills (3 samples per phase skill, 12 for foundation-persona), with a locked manifest.

## Deferred to a Future Release

1. **Persona archetype library** — pre-built persona templates for common archetypes.
2. **Persona MCP exposure parity** — full MCP tool coverage for persona-related workflows.

## Release Verification

1. All blocking release gates were closed at cut time.
2. Frontmatter lint, command validation, and cross-repo sync checks passed.
3. Sample-output manifest locked with verified coverage.

## Published Artifacts

1. GitHub release: [v2.5.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.0).
2. Cross-repo: `pm-skills-mcp` release v2.5.0 published to npm.
