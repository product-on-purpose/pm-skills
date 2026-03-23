# v2.7.0 Internal Release Governance

Status: Ready for tag — all gating criteria met
Owner: Maintainers
Last updated: 2026-03-22

This directory is the tracked internal release-governance home for the `v2.7.0` release: CI enhancement, release packaging hygiene, a new skill, and PM Skill Builder.

## Release Contents

| Effort | Type | Description | Agent | Status | Issue |
|--------|------|-------------|-------|--------|-------|
| M-12 | Infrastructure | CI validation enhancement — extended linter, AGENTS.md sync validator, MCP impact check | Codex | **Committed** | [#112](https://github.com/product-on-purpose/pm-skills/issues/112) |
| F-06 | New skill | `deliver-acceptance-criteria` — Given/When/Then acceptance criteria skill | Codex | **Committed** | [#114](https://github.com/product-on-purpose/pm-skills/issues/114) |
| M-16 | Infrastructure | Exclude `docs/internal/**` from the published ZIP while keeping internal governance docs tracked in-repo | Codex | **Committed** (`0c2e637`) | [#123](https://github.com/product-on-purpose/pm-skills/issues/123) |
| F-05 | New skill | PM Skill Builder (`/pm-skill-builder`) — interactive utility skill for creating new PM skills | Claude | **Committed** (`3c50108`, `df794a1`, `a67f144`) | [#113](https://github.com/product-on-purpose/pm-skills/issues/113) |
| D-01 | Documentation | Create `docs/pm-skill-anatomy.md` — architecture and anatomy of a pm-skills skill (extends agentskills.io spec) | Claude | **Committed** | — |
| D-02 | Documentation | Review and update public-facing docs for v2.7.0 accuracy | Codex + Claude | **Committed** (`12a30a9`) | — |

## Release Theme

Infrastructure hardening (M-12) + release packaging hygiene (M-16) + first new skill since v2.6 (F-06) + meta-tooling for skill creation (F-05) + documentation refresh (D-01, D-02). This release makes the repo easier to extend, keeps internal governance docs out of user-facing ZIPs, adds a practical Deliver-phase skill, and ensures public docs reflect the current state.

## Gating Criteria

- [x] M-12 committed and CI green
- [x] F-06 committed and CI green (must pass M-12's enhanced validation)
- [x] M-16 committed and release ZIP excludes `docs/internal/**` while preserving public docs
- [x] F-05 design approved and implemented
- [x] F-05 committed and local validators pass (`lint-skills-frontmatter`, `validate-commands`, `validate-agents-md`)
- [x] D-01: `docs/pm-skill-anatomy.md` created
- [x] D-02: Public-facing docs reviewed and updated for the post-`a67f144` repo state
- [x] CHANGELOG.md updated with v2.7.0 section
- [x] Local enhanced validation passes for 27 skills, 28 command docs, and 27 `AGENTS.md` skill entries
- [ ] Tag `v2.7.0` pushed → release.yml fires → ZIP published

## Commit Order

1. ~~M-12 + F-06 combined commit~~ **Done** (2026-03-22, `8d2a418`)
2. ~~M-16 packaging fix commit~~ **Done** (2026-03-22, `0c2e637`)
3. ~~F-05 implementation commits~~ **Done** (2026-03-22, `3c50108`..`a67f144`)
4. D-02 follow-up docs commit (update public docs for `/pm-skill-builder`, 28 command docs, and 27 AGENTS entries)
5. D-01 anatomy doc commit
6. Release prep commit (CHANGELOG, version bumps if needed)
7. Tag and release

## Canonical Artifacts

1. `docs/internal/releases/v2.7.0/README.md` (this file)
2. `docs/releases/Release_v2.7.0.md` (public release notes — create at tag time)
3. Effort briefs: `M-12`, `M-16`, `F-05`, `F-06` in `docs/internal/efforts/`

## Documentation Tasks (D-01, D-02)

### D-01: Skill Anatomy Document

Create `docs/pm-skill-anatomy.md` — a public-facing guide explaining the architecture and anatomy of a pm-skills skill. Should cover:
- Directory structure (`skills/{phase}-{name}/SKILL.md` + `references/`)
- Frontmatter schema and field meanings
- SKILL.md section structure (Instructions, Output Contract, Quality Checklist)
- TEMPLATE.md and EXAMPLE.md roles
- Classification types (domain, foundation, utility)
- How skills relate to commands, bundles, and AGENTS.md
- The Triple Diamond phase model

This document supports F-05 (the builder references skill anatomy concepts) and helps new contributors understand what they're building.

### D-02: Public Docs Review

Review and update these files for v2.7.0 accuracy:

| File | Review focus |
|------|-------------|
| `docs/guides/*` | Do guides reflect current skill count (27), current command-doc count (28), new CI scripts, utility skills, and `/pm-skill-builder`? |
| `docs/reference/*` | Are reference docs current with frontmatter schema, classification types? |
| `docs/templates/skill-template/*` | Does the skill template match what the builder produces? |
| `docs/agent-skill-anatomy.md` | Is this the file D-01 should replace/extend? Check for overlap with planned `docs/pm-skill-anatomy.md` |
| `docs/getting-started.md` | Does it mention `/pm-skill-builder`? Are counts and AGENTS discovery notes current? |
| `scripts/README_SCRIPTS.md` | Does it document the 3 new M-12 scripts? |
| `QUICKSTART.md` | Updated for 27 skills and 28 command docs, including `/pm-skill-builder`? |
| `CHANGELOG.md` | v2.7.0 section needed at tag time |

## Notes

1. M-12 and F-06 were built by Codex 5.4, reviewed by Claude Opus 4.6.
2. F-05 design was reviewed by Codex, fixes applied by Claude, and implementation landed across `3c50108`, `df794a1`, and `a67f144`. Codex implementation review approved with one minor fix (stale 26→27 count, fixed in `b5e0a92`).
3. One workflow fix applied during review: duplicate steps removed from `validation.yml`.
4. M-16 was created from the F-05 staging/release-packaging review and landed as `0c2e637`.
5. Fresh local release verification on 2026-03-22 confirmed `docs/internal/**` is excluded from `dist/pm-skills-v2.7.0.zip` while public files like `QUICKSTART.md` remain included.
6. D-02 completed in two passes: Codex first pass (`12a30a9`), then Claude post-F-05 reconciliation patching 3 stale pre-`a67f144` references.
7. D-01 completed: `docs/pm-skill-anatomy.md` (`b478276`). Scoped to complement the spec-level `docs/agent-skill-anatomy.md`.

## Post-Tag: MCP Update Required

After tagging v2.7.0, `pm-skills-mcp` needs a corresponding update:

| Action | Detail |
|--------|--------|
| Re-embed skills | Run `scripts/embed-skills.js` against the v2.7.0 tag |
| Add F-06 tool | `deliver-acceptance-criteria` → `pm_acceptance_criteria` |
| Add F-05 tool | `utility-pm-skill-builder` → `pm_pm_skill_builder` (double `pm_` intentional — consistent with future `pm_agent_skill_builder` from F-09) |
| Update naming function | `embed-skills.js` should strip classification prefixes (`foundation-`, `utility-`) in addition to phase prefixes; no prefix deduplication |
| Note | The builder produces packet content as text; file writing is client-dependent (works in Cursor/Claude Code, not Claude Desktop) |
